#!/usr/bin/env python3
"""Refuse source material that would be published if it sat under assets/.

PreTeXt copies everything under assets/ into every target's external/, the
deployed "web" target included.  A file there is served whether or not any page
links it, so "nothing points at it" is not protection.

This is not hypothetical.  Petra's original PowerPoint decks lived at
assets/ClassSlidesOLD/ (28 files, 123 MB) and assets/ClassSlidesNEW/ (6 files),
git-ignored in main -- which hid them from `git status` but not from the
deploy, because `pretext deploy` copies the WORKING TREE's assets/.  All 34
were public on gh-pages until 2026-09-23.  They now live at the repo root.

Sibling check: check_instructor_only.py looks for instructor-only PAYLOADS
under assets/ by content marker.  This one looks for whole CATEGORIES of
authoring source by extension, which is the cheaper and blunter test.

    python3 scripts/check_not_published.py
"""

import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Directories PreTeXt copies verbatim into every built target.
PUBLISHED_DIRS = ("assets",)

# Authoring source, never book content.  A deck, a slide original or a working
# document under assets/ is a mistake -- mined material belongs at the repo
# root (ClassSlidesOLD/, ClassSlidesNEW/), where no build reaches it.
#
# NOT listed, deliberately: .pdf.  The book genuinely publishes PDFs -- the
# reference manual, the datasheets, the lab handouts -- so extension alone
# cannot tell a published one from a private one.
FORBIDDEN_EXTENSIONS = (".pptx", ".ppt", ".key", ".docx", ".doc", ".pages")


def main() -> int:
    problems = []
    for top in PUBLISHED_DIRS:
        root_dir = os.path.join(REPO, top)
        for dirpath, _dirnames, filenames in os.walk(root_dir):
            for name in filenames:
                if name.lower().endswith(FORBIDDEN_EXTENSIONS):
                    path = os.path.join(dirpath, name)
                    problems.append(os.path.relpath(path, REPO))

    if problems:
        print(
            f"Authoring source found under {'/, '.join(PUBLISHED_DIRS)}/, which "
            "every build copies\ninto external/ and `pretext deploy` publishes:\n"
        )
        for path in sorted(problems):
            print(f"  {path}")
        print(
            "\nMove it to the repo root (ClassSlidesOLD/ and ClassSlidesNEW/ are"
            "\nthere for exactly this reason) and update any path that names it."
            "\nSee the deploying section of AUTHORING.md."
        )
        return 1

    print("check_not_published: no authoring source under assets/.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
