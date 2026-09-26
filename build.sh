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

# A short URL for the decks. The player is external/class.html, because PreTeXt
# copies everything in assets/ to external/ and there is no way to place a file
# at the site root from source. So write one here, after the build: `pretext
# build` only overwrites the files it generates and never empties the output
# directory (only `pretext clean` does that), and `pretext deploy` ships this
# directory verbatim -- so a file written here reaches the published site and
# survives later rebuilds.
#
#   https://engs28book.thayer.dartmouth.edu/slides.html
#   https://engs28book.thayer.dartmouth.edu/slides.html?deck=day1
#
# The script runs first and carries the query string and fragment across, so a
# link to a particular deck still lands on that deck. The meta refresh is the
# no-JavaScript fallback and cannot carry them, so it lands on the deck list
# rather than failing. Both are relative, so this works on any host.
cat > output/web/slides.html <<'REDIRECT'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ENGS 28 — Class Slides</title>
<script>location.replace('external/class.html' + location.search + location.hash)</script>
<meta http-equiv="refresh" content="0; url=external/class.html">
<link rel="canonical" href="external/class.html">
</head>
<body style="font-family: system-ui, sans-serif; margin: 3em auto; max-width: 32em">
<p>Taking you to the <a href="external/class.html">ENGS 28 class slides</a>.</p>
</body>
</html>
REDIRECT

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
