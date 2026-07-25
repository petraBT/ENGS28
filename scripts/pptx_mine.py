#!/usr/bin/env python3
"""Mine an old ENGS 28 lecture deck for its arc, speaker notes, and code.

Step 1 of CHAPTER_PROCESS.md.  The old decks in assets/ClassSlidesOLD/ are the
authority for the intended in-class arc, and their speaker notes are frequently
the richest source of teaching material in the whole repository -- explanations,
analogies, and live demonstrations that exist nowhere else.

    python3 scripts/pptx_mine.py assets/ClassSlidesOLD/Day07-ADC.pptx
    python3 scripts/pptx_mine.py <deck> --slides 13,15,26   # just these
    python3 scripts/pptx_mine.py <deck> --code              # only code-ish slides

Code slides matter: full driver listings are often pasted into the deck as text,
which means the real driver is recoverable without having to ask for the .c file.
"""

import argparse
import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

A = "http://schemas.openxmlformats.org/drawingml/2006/main"
P = "http://schemas.openxmlformats.org/presentationml/2006/main"
NS = {"a": A, "p": P}

CODE_HINTS = (
    "#include", "void ", "int main", "->", "uint", "while(", "while (",
    "/*", "//", "#define", "return ",
)


def shape_paragraphs(sp):
    """Text of a shape, one string per paragraph (preserves code line breaks)."""
    out = []
    for para in sp.findall(".//a:p", NS):
        line = "".join(t.text or "" for t in para.findall(".//a:t", NS))
        out.append(line)
    while out and not out[-1].strip():
        out.pop()
    return out


def slide_numbers(z):
    nums = []
    for name in z.namelist():
        m = re.fullmatch(r"ppt/slides/slide(\d+)\.xml", name)
        if m:
            nums.append(int(m.group(1)))
    return sorted(nums)


def notes_for(z, n):
    name = f"ppt/notesSlides/notesSlide{n}.xml"
    if name not in z.namelist():
        return ""
    root = ET.fromstring(z.read(name))
    paras = []
    for para in root.findall(".//a:p", NS):
        line = "".join(t.text or "" for t in para.findall(".//a:t", NS)).strip()
        if line:
            paras.append(line)
    text = "\n".join(paras).strip()
    # The slide-number placeholder leaks in as a bare integer.
    if text.isdigit():
        return ""
    return text


def looks_like_code(blocks):
    joined = "\n".join("\n".join(b) for b in blocks)
    return sum(h in joined for h in CODE_HINTS) >= 2


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pptx")
    ap.add_argument("--slides", help="comma-separated slide numbers")
    ap.add_argument("--code", action="store_true", help="only slides that look like code")
    ap.add_argument("--arc", action="store_true", help="titles only, one line each")
    args = ap.parse_args()

    if not os.path.exists(args.pptx):
        sys.exit(f"no such deck: {args.pptx}")

    want = None
    if args.slides:
        want = {int(s) for s in args.slides.replace(" ", "").split(",") if s}

    with zipfile.ZipFile(args.pptx) as z:
        for n in slide_numbers(z):
            if want is not None and n not in want:
                continue
            root = ET.fromstring(z.read(f"ppt/slides/slide{n}.xml"))

            blocks = []
            for sp in root.findall(".//p:sp", NS):
                paras = shape_paragraphs(sp)
                if any(p.strip() for p in paras):
                    blocks.append(paras)

            title = next((p.strip() for b in blocks for p in b if p.strip()), "")
            is_code = looks_like_code(blocks)
            if args.code and not is_code:
                continue

            n_pics = len(root.findall(".//p:pic", NS))

            if args.arc:
                flags = []
                if is_code:
                    flags.append("code")
                if n_pics:
                    flags.append(f"{n_pics} img")
                if notes_for(z, n):
                    flags.append("notes")
                tag = f"  [{', '.join(flags)}]" if flags else ""
                print(f"{n:3d}. {title[:70]}{tag}")
                continue

            print(f"\n{'=' * 72}\nSLIDE {n}   {title}")
            if n_pics:
                print(f"({n_pics} image{'s' if n_pics != 1 else ''})")
            print("=" * 72)
            for b in blocks:
                body = "\n".join(b).rstrip()
                if body.strip():
                    print(body)
                    print("  --")
            note = notes_for(z, n)
            if note:
                print("\n### SPEAKER NOTES")
                print(note)


if __name__ == "__main__":
    main()
