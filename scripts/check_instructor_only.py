#!/usr/bin/env python3
"""Check that instructor-only files are not sitting where a build would publish them.

PreTeXt copies everything under assets/ into every target's external/, the
deployed "web" target included.  So a file whose whole point is that students
must not have it -- the board simulator's instructor examples -- cannot live
there, however carefully no page links to it: external/ is served whether or
not anything points at it.  Such files live in instructor-only/ and are copied
into an instructor target's output after the build, by
scripts/install-instructor-sim.sh.

build.sh already refuses to finish the deployable target if this content turns
up in output/web.  This script checks the SOURCE tree instead, which is what
`pretext deploy` builds from -- deploy does its own build and never runs
build.sh, so a misplaced file would otherwise reach gh-pages with nothing in
the way.  Run it with the other checks before committing:

    python3 scripts/check_instructor_only.py
"""

import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Strings that identify instructor-only payloads.  The simulator stamps the
# first into its instructor examples file and its instructor bundle.
MARKERS = ("engs28-sim-instructor-examples",)

# Directories PreTeXt copies verbatim into every built target.
PUBLISHED_DIRS = ("assets",)

# Binary and generated trees not worth scanning (and never authored by hand).
SKIP_DIRS = {"ClassSlidesOLD", "ClassSlidesNEW", "board-sim"}


def main() -> int:
    problems = []
    for top in PUBLISHED_DIRS:
        root_dir = os.path.join(REPO, top)
        for dirpath, dirnames, filenames in os.walk(root_dir):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            for name in filenames:
                path = os.path.join(dirpath, name)
                try:
                    with open(path, "rb") as fh:
                        blob = fh.read()
                except OSError:
                    continue
                for marker in MARKERS:
                    if marker.encode() in blob:
                        problems.append((os.path.relpath(path, REPO), marker))

    # assets/board-sim/ is the STUDENT build of the simulator, skipped above so
    # a 260 kB bundle is not scanned byte by byte on every run -- but it is
    # exactly where an instructor build would land by mistake, so check the one
    # thing that would betray one.
    sim_dir = os.path.join(REPO, "assets", "board-sim")
    for dirpath, _dirnames, filenames in os.walk(sim_dir):
        for name in filenames:
            if not name.endswith((".js", ".json", ".html")):
                continue
            path = os.path.join(dirpath, name)
            with open(path, "rb") as fh:
                blob = fh.read()
            for marker in MARKERS:
                if marker.encode() in blob:
                    problems.append((os.path.relpath(path, REPO), marker))

    if problems:
        print("Instructor-only content found where every build would copy it:\n")
        for path, marker in problems:
            print(f"  {path}")
            print(f"      contains {marker!r}")
        print(
            "\nMove it to instructor-only/ and install it after the build with"
            "\nscripts/install-instructor-sim.sh. See instructor-only/README.md."
        )
        return 1

    print("check_instructor_only: no instructor-only content under assets/.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
