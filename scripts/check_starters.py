#!/usr/bin/env python3
"""Check that each starter file's CODE matches the book listing it comes from.

The handout and the book are deliberately different documents.  A student who
opens the .c file alone gets Petra's fuller commentary -- the reason behind
each constant, a label on every step -- while the book's listing stays
compressed enough to read on a page and condense onto a slide (B-2, S-9).

What must NEVER differ is the code.  A student comparing their download
against the book should find the same program, line for line.  This script
strips comments and blank lines from both and compares what is left, so the
commentary can grow freely and a real edit to one side cannot drift silently.

    python3 scripts/check_starters.py

Add a pair by listing it in STARTERS: the starter file, the chapter, and a
snippet that appears in the matching <program> block (and nowhere earlier).
"""

import re
import sys
import os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (starter file, chapter, a marker unique to the intended <program> block)
STARTERS = [
    ("assets/starters/blinkyTimerPolled.c", "source/ch-timers-interrupts.ptx",
     "// Could do other stuff here, like poll a button."),
    ("assets/starters/blinkyTimerInt.c", "source/ch-timers-interrupts.ptx",
     "TODO 4a"),
    ("assets/starters/ADCPot.c", "source/ch-adc.ptx",
     "TODO 5 -- wait until the conversion has finished"),
    ("assets/starters/counterResetButtonPolled.c", "source/ch-gpio-interrupts.ptx",
     "    int buttonPushed;"),
    ("assets/starters/counterResetButtonInt.c", "source/ch-gpio-interrupts.ptx",
     "TODO 1a"),
]


def code_only(text):
    """The executable skeleton: no comments, no blank lines, no indentation."""
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)   # block comments
    text = re.sub(r"//[^\n]*", "", text)                # line comments
    return [ln.strip() for ln in text.split("\n") if ln.strip()]


def listing(chapter_text, marker):
    blocks = re.findall(
        r"<program language=\"c\"><code><!\[CDATA\[(.*?)\]\]></code></program>",
        chapter_text, flags=re.S)
    hits = [b for b in blocks if marker in b]
    if not hits:
        return None
    return hits[0]


def main():
    problems = 0
    for rel_starter, rel_chapter, marker in STARTERS:
        starter = os.path.join(REPO, rel_starter)
        chapter = os.path.join(REPO, rel_chapter)
        if not os.path.exists(starter):
            print(f"  MISSING  {rel_starter}")
            problems += 1
            continue
        block = listing(open(chapter).read(), marker)
        if block is None:
            print(f"  NO LISTING  {rel_starter}: no <program> in "
                  f"{rel_chapter} contains {marker!r}")
            problems += 1
            continue

        want, got = code_only(block), code_only(open(starter).read())
        if want == got:
            print(f"  ok  {rel_starter}  ({len(got)} code lines match "
                  f"{os.path.basename(rel_chapter)})")
            continue

        problems += 1
        print(f"  DRIFT  {rel_starter} vs {rel_chapter}")
        import difflib
        for line in difflib.unified_diff(want, got, "book", "starter",
                                         lineterm="", n=1):
            if line.startswith(("+", "-")) and not line.startswith(("+++", "---")):
                print(f"        {line}")

    print(f"\n{problems} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
