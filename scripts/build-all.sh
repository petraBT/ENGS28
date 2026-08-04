#!/bin/bash
# Rebuild EVERY target of the book, so no preview can be left stale.
#
# The book has four of them and they are separate output directories:
#
#   web       reading book              ./build.sh              :8353
#   web-edit  authoring preview         ./scripts/build-edit.sh :8931
#   web-deck  the classroom deck player ./preview-slides.sh     :8351 / :8352
#   print     the PDF
#
# Building one does not touch the others, which is the trap: edit a figure,
# rebuild the target you are not reading, and conclude the change did not take.
# Run this when you want certainty rather than speed.
#
#   ./scripts/build-all.sh              # web, web-edit, web-deck
#   ./scripts/build-all.sh --with-print # ... and the PDF (slow)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

TARGETS=(web web-edit web-deck)
if [ "$1" = "--with-print" ]; then
    TARGETS+=(print)
fi

for t in "${TARGETS[@]}"; do
    echo ""
    echo "─── building $t ─────────────────────────────────────────"
    # See build.sh: stale external/ copies can be read-only and break the copy.
    rm -rf "output/$t/external/"
    pretext build "$t"
done

echo ""
echo "Rebuilt: ${TARGETS[*]}"
