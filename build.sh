#!/bin/bash
# Build the ENGS 28 PreTeXt book.
# Fixes the macOS permission issue where shutil.copy2 can't overwrite
# files it previously created in output/web/external/.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Reserve layout space for every figure: without an aspect-ratio the image
# boxes are ~22px until each image loads, so pages reflow by hundreds of pixels
# as they settle. Regenerated here so the block in assets/book.css cannot go
# stale. See scripts/image_ratios.py.
python3 scripts/image_ratios.py

# Delete the external output folder so PreTeXt recreates it fresh.
# (shutil.copy2 preserves source permissions, which can make copies read-only;
# deleting avoids the "Permission denied" error on subsequent builds.)
rm -rf output/web/external/

pretext build web "$@"

# The reading book carries a copy of assets/decks/ too, and PreTeXt copies it
# verbatim -- so the deck lists beside the STUDENT pages still name every
# instructor slide, titles and all ("Solution -- blinkyTimerInt.c").  The pages
# have the answers stripped; the deck list is a separate pipeline and does not.
# Same fix the student deck build already uses.
python3 scripts/filter_student_decks.py output/web

# LAST LINE OF DEFENCE for the one target that gets published. `pretext deploy`
# ships output/web, and two kinds of instructor material could reach it by
# accident: the board simulator's instructor examples (kept out of assets/ for
# exactly this reason, see instructor-only/README.md) and an instructor build
# of the simulator itself. Neither is linked from a student page, but a file
# sitting in external/ is served whether a page links it or not, so check
# rather than trust. Fail loudly: a published answer cannot be unpublished.
if grep -rlq "engs28-sim-instructor-examples" output/web 2>/dev/null; then
    echo "" >&2
    echo "error: output/web contains the board simulator's INSTRUCTOR examples." >&2
    echo "       That is the target pretext deploy publishes, so this build is" >&2
    echo "       not safe to ship. Offending file(s):" >&2
    grep -rl "engs28-sim-instructor-examples" output/web 2>/dev/null | sed 's/^/         /' >&2
    echo "       Instructor-only files belong in instructor-only/, not assets/." >&2
    exit 1
fi
