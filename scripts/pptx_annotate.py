#!/usr/bin/env python3
"""Rebuild the annotated figures from an old ENGS 28 lecture deck.

The teaching annotations in assets/ClassSlidesOLD/ -- the callouts naming which
pin each CHSELR bit selects, the labelled blocks on the SAR diagram, the arrows
onto a scope trace -- are PowerPoint *shapes layered over* the picture.  Plain
media extraction pulls out only the picture underneath, which is why the images
in the rough chapters are worse than the originals (AUTHORING-book.md, P-12).

This script transplants the shape layer back on: it reads the geometry, fills,
and text straight out of the slide XML and re-composites them over the picture as
SVG, cropped to the figure.  Output is a single self-contained .svg (the bitmap is
embedded), so it drops straight into PreTeXt.

    # what's on the slide, and which pictures carry annotations
    python3 scripts/pptx_annotate.py <deck> --slide 17 --list

    # rebuild (largest picture on the slide, plus everything overlapping it)
    python3 scripts/pptx_annotate.py <deck> --slide 17 -o assets/images/Day07-ADC/chselr.svg

    # a specific picture, when the slide has several
    python3 scripts/pptx_annotate.py <deck> --slide 33 --pic 2 -o out.svg

If a figure comes out wrong, fall back to a LibreOffice render of the whole slide:
    soffice --headless --convert-to pdf <deck> && pdftoppm -r 200 -png <pdf>
"""

import argparse
import base64
import math
import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET
from xml.sax.saxutils import escape

A = "http://schemas.openxmlformats.org/drawingml/2006/main"
P = "http://schemas.openxmlformats.org/presentationml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS = {"a": A, "p": P, "r": R}

EMU_PER_INCH = 914400.0

# Google Slides / Office theme colours we are likely to meet in these decks.
SCHEME_FALLBACK = {
    "dk1": "000000", "tx1": "000000", "dk2": "44546A", "tx2": "44546A",
    "lt1": "FFFFFF", "bg1": "FFFFFF", "lt2": "E7E6E6", "bg2": "E7E6E6",
    "accent1": "4472C4", "accent2": "ED7D31", "accent3": "A5A5A5",
    "accent4": "FFC000", "accent5": "5B9BD5", "accent6": "70AD47",
    "hlink": "0563C1", "folHlink": "954F72",
}


def emu(v):
    return int(v) / EMU_PER_INCH


class Box:
    __slots__ = ("x", "y", "w", "h", "rot")

    def __init__(self, x, y, w, h, rot=0.0):
        self.x, self.y, self.w, self.h, self.rot = x, y, w, h, rot

    @property
    def area(self):
        return max(self.w, 0) * max(self.h, 0)

    def intersect_area(self, o):
        dx = min(self.x + self.w, o.x + o.w) - max(self.x, o.x)
        dy = min(self.y + self.h, o.y + o.h) - max(self.y, o.y)
        return dx * dy if dx > 0 and dy > 0 else 0.0


def get_xfrm(el):
    x = el.find(".//a:xfrm", NS)
    if x is None:
        return None
    off, ext = x.find("a:off", NS), x.find("a:ext", NS)
    if off is None or ext is None:
        return None
    rot = float(x.get("rot", 0)) / 60000.0
    return Box(emu(off.get("x")), emu(off.get("y")),
               emu(ext.get("cx")), emu(ext.get("cy")), rot)


def colour_of(el):
    """(hex, alpha) from a fill/line container, or (None, 1.0)."""
    if el is None:
        return None, 1.0
    if el.find("a:noFill", NS) is not None:
        return None, 1.0
    srgb = el.find(".//a:srgbClr", NS)
    scheme = el.find(".//a:schemeClr", NS)
    node = srgb if srgb is not None else scheme
    if node is None:
        return None, 1.0
    if node is srgb:
        val = node.get("val")
    else:
        val = SCHEME_FALLBACK.get(node.get("val"), "888888")
    alpha = 1.0
    a = node.find("a:alpha", NS)
    if a is not None:
        alpha = int(a.get("val")) / 100000.0
    return "#" + val, alpha


def shape_fill(sp):
    # spPr lives in the presentationml namespace even though its children are drawingml.
    if sp.find("p:spPr/a:noFill", NS) is not None:
        return None, 1.0
    el = sp.find("p:spPr/a:solidFill", NS)
    if el is not None:
        return colour_of(el)
    return None, 1.0


def shape_line(sp):
    ln = sp.find("p:spPr/a:ln", NS)
    if ln is None:
        return None, 1.0, 1.0
    if ln.find("a:noFill", NS) is not None:
        return None, 1.0, 0.0
    col, alpha = colour_of(ln.find("a:solidFill", NS))
    w = float(ln.get("w", 12700)) / EMU_PER_INCH  # inches
    return col, alpha, w


def line_ends(sp):
    ln = sp.find("p:spPr/a:ln", NS)
    if ln is None:
        return False, False
    head = ln.find("a:headEnd", NS)
    tail = ln.find("a:tailEnd", NS)
    def arrow(e):
        return e is not None and e.get("type") not in (None, "none")
    return arrow(head), arrow(tail)


def paragraphs(sp):
    """[(text, size_pt, colour, bold, align)] -- one entry per non-empty paragraph."""
    out = []
    for para in sp.findall(".//a:p", NS):
        runs = para.findall(".//a:r", NS)
        text = "".join("".join(t.text or "" for t in r.findall("a:t", NS)) for r in runs)
        if not text.strip():
            continue
        size, colour, bold = 18.0, "#000000", False
        pr = para.find("a:pPr", NS)
        align = (pr.get("algn") if pr is not None else None) or "ctr"
        if runs:
            rpr = runs[0].find("a:rPr", NS)
            if rpr is not None:
                if rpr.get("sz"):
                    size = int(rpr.get("sz")) / 100.0
                bold = rpr.get("b") == "1"
                c, _ = colour_of(rpr.find("a:solidFill", NS))
                if c:
                    colour = c
        out.append((text, size, colour, bold, align))
    return out


def media_for(z, slide_no, embed_id):
    rels = f"ppt/slides/_rels/slide{slide_no}.xml.rels"
    root = ET.fromstring(z.read(rels))
    for rel in root:
        if rel.get("Id") == embed_id:
            target = rel.get("Target").replace("../", "ppt/")
            return target
    return None


def src_rect(pic):
    sr = pic.find("p:blipFill/a:srcRect", NS)
    if sr is None:
        return 0.0, 0.0, 0.0, 0.0
    def frac(k):
        return int(sr.get(k, 0)) / 100000.0
    return frac("l"), frac("t"), frac("r"), frac("b")


def png_size(data):
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big")
    if data[:2] == b"\xff\xd8":  # JPEG
        i = 2
        while i < len(data) - 9:
            if data[i] != 0xFF:
                i += 1
                continue
            marker = data[i + 1]
            if marker in (0xC0, 0xC1, 0xC2, 0xC3):
                return (int.from_bytes(data[i + 7:i + 9], "big"),
                        int.from_bytes(data[i + 5:i + 7], "big"))
            i += 2 + int.from_bytes(data[i + 2:i + 4], "big")
    return None


def collect(z, slide_no):
    root = ET.fromstring(z.read(f"ppt/slides/slide{slide_no}.xml"))
    pics, shapes = [], []
    for pic in root.findall(".//p:pic", NS):
        box = get_xfrm(pic)
        blip = pic.find(".//a:blip", NS)
        if box is None or blip is None:
            continue
        target = media_for(z, slide_no, blip.get(f"{{{R}}}embed"))
        if target:
            pics.append((box, target, src_rect(pic)))
    for sp in root.findall(".//p:sp", NS):
        box = get_xfrm(sp)
        if box:
            shapes.append(("sp", box, sp))
    for cx in root.findall(".//p:cxnSp", NS):
        box = get_xfrm(cx)
        if box:
            shapes.append(("cxn", box, cx))
    return pics, shapes


def svg_shape(kind, box, sp, ox, oy, s, max_text):
    """Render one shape to SVG fragment(s)."""
    out = []
    x, y = (box.x - ox) * s, (box.y - oy) * s
    w, h = box.w * s, box.h * s
    geom = sp.find(".//a:prstGeom", NS)
    prst = geom.get("prst") if geom is not None else "rect"
    fill, falpha = shape_fill(sp)
    stroke, salpha, sw = shape_line(sp)
    swpx = max(sw * s, 1.0) if stroke else 0

    xf = ""
    if abs(box.rot) > 0.01:
        xf = f' transform="rotate({box.rot:.2f} {x + w / 2:.1f} {y + h / 2:.1f})"'

    def paint():
        p = f'fill="{fill}"' if fill else 'fill="none"'
        if fill and falpha < 1:
            p += f' fill-opacity="{falpha:.2f}"'
        if stroke:
            p += f' stroke="{stroke}" stroke-width="{swpx:.1f}"'
            if salpha < 1:
                p += f' stroke-opacity="{salpha:.2f}"'
        return p

    if kind == "cxn" or prst in ("line", "straightConnector1", "bentConnector2",
                                 "bentConnector3", "curvedConnector3"):
        if stroke:
            # flipH/flipV (and the equivalent rot=180) swap which end the
            # arrowhead sits on -- honor them instead of emitting a transform.
            xfrm = sp.find(".//a:xfrm", NS)
            fh = xfrm is not None and xfrm.get("flipH") == "1"
            fv = xfrm is not None and xfrm.get("flipV") == "1"
            if abs(box.rot - 180.0) < 0.01:
                fh, fv = not fh, not fv
                xf = ""
            head, tail = line_ends(sp)
            m = ""
            if tail:
                m += ' marker-end="url(#arrow)"'
            if head:
                m += ' marker-start="url(#arrow)"'
            x1, y1, x2, y2 = x, y, x + w, y + h
            if fh:
                x1, x2 = x2, x1
            if fv:
                y1, y2 = y2, y1
            out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
                       f'stroke="{stroke}" stroke-width="{swpx:.1f}"{m}{xf}/>')
    elif prst in ("ellipse", "circle"):
        out.append(f'<ellipse cx="{x + w / 2:.1f}" cy="{y + h / 2:.1f}" '
                   f'rx="{w / 2:.1f}" ry="{h / 2:.1f}" {paint()}{xf}/>')
    elif prst == "roundRect":
        r = min(w, h) * 0.25
        out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" '
                   f'rx="{r:.1f}" {paint()}{xf}/>')
    elif prst == "arc":
        if stroke:
            out.append(f'<path d="M {x:.1f} {y + h:.1f} A {w:.1f} {h:.1f} 0 0 1 '
                       f'{x + w:.1f} {y:.1f}" fill="none" stroke="{stroke}" '
                       f'stroke-width="{swpx:.1f}"{xf}/>')
    elif fill or stroke:
        out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" '
                   f'{paint()}{xf}/>')

    paras = paragraphs(sp)
    total = sum(len(t) for t, *_ in paras)
    if paras and total <= max_text:
        line_h = max((p[1] for p in paras), default=12) * s / 72.0 * 1.25
        start = y + h / 2 - (len(paras) - 1) * line_h / 2 + line_h * 0.32
        for i, (text, size, colour, bold, align) in enumerate(paras):
            anchor = {"l": "start", "r": "end", "ctr": "middle", "just": "start"}.get(align, "middle")
            tx = {"start": x + w * 0.02, "end": x + w * 0.98, "middle": x + w / 2}[anchor]
            fs = size * s / 72.0
            out.append(
                f'<text x="{tx:.1f}" y="{start + i * line_h:.1f}" font-size="{fs:.1f}" '
                f'fill="{colour}" text-anchor="{anchor}" '
                f'font-family="Helvetica, Arial, sans-serif"'
                f'{" font-weight=\"bold\"" if bold else ""}{xf}>{escape(text)}</text>')
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pptx")
    ap.add_argument("--slide", type=int, required=True)
    ap.add_argument("--pic", type=int, default=0,
                    help="1-based picture index; default = largest on the slide")
    ap.add_argument("--list", action="store_true", help="describe the slide and exit")
    ap.add_argument("-o", "--out", help="output .svg")
    ap.add_argument("--pad", type=float, default=0.06, help="crop padding, inches")
    ap.add_argument("--overlap", type=float, default=0.5,
                    help="fraction of a shape that must sit over the picture to count")
    ap.add_argument("--max-text", type=int, default=60,
                    help="skip shapes whose text is longer than this (slide body prose)")
    ap.add_argument("--dpi", type=float, default=0, help="force output scale")
    args = ap.parse_args()

    if not os.path.exists(args.pptx):
        sys.exit(f"no such deck: {args.pptx}")

    with zipfile.ZipFile(args.pptx) as z:
        name = f"ppt/slides/slide{args.slide}.xml"
        if name not in z.namelist():
            sys.exit(f"slide {args.slide} not in {os.path.basename(args.pptx)}")
        pics, shapes = collect(z, args.slide)

        if not pics:
            sys.exit(f"slide {args.slide} has no pictures")

        if args.list:
            print(f"slide {args.slide}: {len(pics)} picture(s), {len(shapes)} shape(s)\n")
            for i, (b, t, _) in enumerate(pics, 1):
                over = [s for s in shapes
                        if s[1].area and s[1].intersect_area(b) / s[1].area >= args.overlap]
                print(f"  pic {i}: {b.w:.2f}x{b.h:.2f}in at ({b.x:.2f},{b.y:.2f})  "
                      f"{os.path.basename(t)}  <- {len(over)} overlapping shape(s)")
                for _, sb, sp in over:
                    txt = " ".join(p[0] for p in paragraphs(sp))[:40]
                    g = sp.find(".//a:prstGeom", NS)
                    print(f"        [{g.get('prst') if g is not None else 'cxn'}] {txt!r}")
            return

        if args.pic:
            if not 1 <= args.pic <= len(pics):
                sys.exit(f"--pic {args.pic} out of range (1..{len(pics)})")
            box, target, sr = pics[args.pic - 1]
        else:
            box, target, sr = max(pics, key=lambda p: p[0].area)

        keep = [s for s in shapes
                if s[1].area and s[1].intersect_area(box) / s[1].area >= args.overlap]

        # Crop to the picture plus whatever hangs off its edge.
        x0 = min([box.x] + [s[1].x for s in keep]) - args.pad
        y0 = min([box.y] + [s[1].y for s in keep]) - args.pad
        x1 = max([box.x + box.w] + [s[1].x + s[1].w for s in keep]) + args.pad
        y1 = max([box.y + box.h] + [s[1].y + s[1].h for s in keep]) + args.pad

        data = z.read(target)
        native = png_size(data)
        if args.dpi:
            scale = args.dpi
        elif native:
            visible_w = box.w / max(1.0 - sr[0] - sr[2], 1e-6)
            scale = min(max(native[0] / visible_w, 96.0), 300.0)
        else:
            scale = 150.0

        W, H = (x1 - x0) * scale, (y1 - y0) * scale
        l, t, r, b = sr
        full_w = box.w / max(1.0 - l - r, 1e-6)
        full_h = box.h / max(1.0 - t - b, 1e-6)
        ix = (box.x - l * full_w - x0) * scale
        iy = (box.y - t * full_h - y0) * scale

        mime = "image/jpeg" if target.lower().endswith((".jpg", ".jpeg")) else "image/png"
        b64 = base64.b64encode(data).decode("ascii")

        parts = [
            f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}">',
            '<defs>',
            '<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" '
            'markerHeight="6" orient="auto-start-reverse">'
            '<path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke"/></marker>',
            f'<clipPath id="picclip"><rect x="{(box.x - x0) * scale:.1f}" '
            f'y="{(box.y - y0) * scale:.1f}" width="{box.w * scale:.1f}" '
            f'height="{box.h * scale:.1f}"/></clipPath>',
            '</defs>',
            '<rect width="100%" height="100%" fill="#ffffff"/>',
            f'<image clip-path="url(#picclip)" x="{ix:.1f}" y="{iy:.1f}" '
            f'width="{full_w * scale:.1f}" height="{full_h * scale:.1f}" '
            f'xlink:href="data:{mime};base64,{b64}"/>',
        ]
        for kind, sb, sp in keep:
            parts += svg_shape(kind, sb, sp, x0, y0, scale, args.max_text)
        parts.append("</svg>")
        svg = "\n".join(parts)

        if args.out:
            os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
            with open(args.out, "w") as f:
                f.write(svg)
            kb = len(svg.encode()) / 1024
            print(f"wrote {args.out}  ({W:.0f}x{H:.0f}px, {len(keep)} annotation(s), {kb:.0f} KB)")
            for _, sb, sp in keep:
                txt = " ".join(p[0] for p in paragraphs(sp))[:48]
                if txt:
                    print(f"    - {txt!r}")
        else:
            sys.stdout.write(svg)


if __name__ == "__main__":
    main()
