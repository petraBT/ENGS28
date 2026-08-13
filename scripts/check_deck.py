#!/usr/bin/env python3
"""Verify a built deck: every ref resolves, and every slide's @ref target is
reachable from the page the deck names.

The second check is the one that matters. PreTeXt chunks each subsection to its
own page, and the player resolves a <slide>'s @ref *within that page only* — so a
slide block authored next to Part 6 cannot reference a figure that lives in the
pre-class reading. Nothing in the source flags this: the build is clean, the
xml:ids all exist, and the slide simply renders blank in class.

    python3 scripts/check_deck.py assets/decks/day7.json
"""
import glob, json, os, re, subprocess, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The INSTRUCTOR deck build, because it is the only one with every slide in it.
# Resolving against plain web-deck would report each instructor-only slide as a
# missing id — that build strips them on purpose.
BUILD = os.path.join(REPO, "output", "web-deck-instructor")


def source_instructor_ids():
    """Every id the SOURCE marks instructor-only: <slide instructor="yes"> and
    <instructor xml:id="...">, which a deck may ref directly instead of copying
    the answer into a slide beside it."""
    ids = set()
    for path in glob.glob(os.path.join(REPO, "source", "*.ptx")):
        src = open(path, encoding="utf-8").read()
        for tag in re.finditer(r"<slide\b([^>]*)>", src):
            attrs = tag.group(1)
            xml_id = re.search(r'xml:id="([^"]+)"', attrs)
            if xml_id and re.search(r'instructor="yes"', attrs):
                ids.add(xml_id.group(1))
        for tag in re.finditer(r"<instructor\b([^>]*)>", src):
            xml_id = re.search(r'xml:id="([^"]+)"', tag.group(1))
            if xml_id:
                ids.add(xml_id.group(1))
    return ids


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: check_deck.py <deck.json> [more.json ...]")
    bad = 0
    marked = source_instructor_ids()
    for deck_path in sys.argv[1:]:
        # index.json is the contents page's deck list, not a deck. It is in this
        # directory (and so in a *.json glob), but has no slides to check —
        # instead, check that it still agrees with the decks beside it.
        if os.path.basename(deck_path) == "index.json":
            if subprocess.call([sys.executable,
                                os.path.join(REPO, "scripts", "make_deck_index.py"),
                                "--check"]) != 0:
                bad += 1
            continue
        deck = json.load(open(deck_path, encoding="utf-8"))
        refs = [s for s in deck["slides"] if s.get("type") == "ref"]
        print(f"\n{os.path.basename(deck_path)} — {len(deck['slides'])} slides, {len(refs)} refs")
        for s in refs:
            # The deck JSON and the source must agree about instructor-only.
            # They drive different halves: the JSON decides the player's badge
            # and whether ?student drops the slide, the source attribute decides
            # whether the slide is in the student BUILD at all. Disagree one way
            # and the student deck lists a slide whose markup was stripped;
            # disagree the other and it ships an answer the player then hides.
            flagged, in_source = bool(s.get("instructor")), s["slide"] in marked
            if flagged and not in_source:
                print(f"  NOT STRIPPED  {s['slide']} is \"instructor\": true here, but its source"
                      f" is not marked")
                print(f"                (add instructor=\"yes\" to the <slide>, or ref an"
                      f" <instructor> block by its xml:id)")
                bad += 1
            elif in_source and not flagged:
                print(f"  NOT FLAGGED   {s['slide']} is instructor-only in the source, but this"
                      f" deck entry has no \"instructor\": true")
                print(f"                (the student build drops the slide; this deck would"
                      f" still list it)")
                bad += 1
            page = os.path.join(BUILD, s["page"])
            if not os.path.exists(page):
                print(f"  MISSING PAGE  {s['page']}  ({s['slide']})"); bad += 1; continue
            html = open(page, encoding="utf-8").read()
            m = re.search(r'id="%s"([^>]*)' % re.escape(s["slide"]), html)
            if not m:
                print(f"  MISSING ID    {s['slide']}  on {s['page']}"); bad += 1; continue
            # If the slide block delegates to a figure/table, that target must be
            # on this same page or the slide renders empty -- unless the deck entry
            # names the page it lives on with "refPage", which the player fetches
            # separately so a figure can be reused without duplicating it.
            ref = re.search(r'data-deck-ref="([^"]+)"', m.group(1))
            if ref and not re.search(r'id="%s"' % re.escape(ref.group(1)), html):
                ref_page = s.get("refPage")
                if not ref_page:
                    print(f"  OFF-PAGE REF  {s['slide']} -> {ref.group(1)} is not on {s['page']}")
                    print(f"                (author the <slide> block in that target's own subsection,")
                    print(f"                 or add \"refPage\" naming the page the target is on)")
                    bad += 1
                else:
                    rp = os.path.join(BUILD, ref_page)
                    if not os.path.exists(rp):
                        print(f"  MISSING PAGE  refPage {ref_page}  ({s['slide']})"); bad += 1
                    elif not re.search(r'id="%s"' % re.escape(ref.group(1)),
                                       open(rp, encoding="utf-8").read()):
                        print(f"  OFF-PAGE REF  {s['slide']} -> {ref.group(1)} is not on its"
                              f" refPage {ref_page} either")
                        bad += 1
            elif ref and s.get("refPage"):
                print(f"  STALE refPage {s['slide']}: {ref.group(1)} is already on {s['page']}")
                bad += 1
    bad += check_every_solution_is_projected(marked)
    print(f"\n{bad} problem(s)")
    sys.exit(1 if bad else 0)


def check_every_solution_is_projected(marked):
    """P-10: a solution the class never sees is not a reveal.

    Petra, 2026-08-13: solutions to activities are instructor slides, so they
    show up only in the instructor deck.  The half check_deck already does is
    that a projected slide's flag agrees with its source marker.  This is the
    other half -- an <instructor> block or instructor="yes" slide that no deck
    refs at all is invisible in class, and nothing else would say so.

    Repo-wide by construction: an id counts as projected if ANY deck refs it, so
    this scans assets/decks/ rather than only the decks named on the command
    line, and reports once at the end.
    """
    projected = set()
    for path in glob.glob(os.path.join(REPO, "assets", "decks", "*.json")):
        if os.path.basename(path) == "index.json":
            continue
        for s in json.load(open(path, encoding="utf-8"))["slides"]:
            if s.get("slide"):
                projected.add(s["slide"])
    orphans = sorted(marked - projected)
    if orphans:
        print(f"\nsolutions no deck projects — {len(orphans)}:")
        for o in orphans:
            print(f"  NOT PROJECTED {o} is instructor-only in the source, but no deck refs it")
        print("                (add a deck entry with \"instructor\": true, or delete the block)")
    return len(orphans)


if __name__ == "__main__":
    main()
