#!/bin/bash
# Rebuild EVERY target of the book, so no preview can be left stale.
#
# The book has four of them and they are separate output directories:
#
#   web       reading book              ./build.sh              :8353
#   web-edit  authoring preview         ./scripts/build-edit.sh :8931
#   web-instructor  the same book WITH solutions, for you only  :8932
#             built and served alongside web-edit by preview-edit.sh
#   web-deck-instructor  the deck you TEACH from  ./preview-slides.sh  :8352
#   web-deck  the STUDENT deck: same player, instructor slides stripped at
#             build time (not just hidden). The one you would publish.
#   print     the PDF
#
# Building one does not touch the others, which is the trap: edit a figure,
# rebuild the target you are not reading, and conclude the change did not take.
# Run this when you want certainty rather than speed.
#
#   ./scripts/build-all.sh              # web, web-edit, web-deck, web-instructor
#   ./scripts/build-all.sh --with-print # ... and the PDF (slow)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

# assets/book.css carries a generated block of per-image aspect ratios, and
# every target loads that file via html.css.extra. Regenerate once, before any
# target is built, so none of them ships a stale copy.
python3 scripts/image_ratios.py

TARGETS=(web web-edit web-deck web-deck-instructor web-instructor)
if [ "$1" = "--with-print" ]; then
    TARGETS+=(print)
fi

for t in "${TARGETS[@]}"; do
    echo ""
    echo "─── building $t ─────────────────────────────────────────"
    # web-deck is the STUDENT deck, and building it is two steps, not one — the
    # deck list has to be filtered to match the stripped pages. build-deck.sh
    # owns that pairing so it cannot be half-done here.
    if [ "$t" = "web-deck" ]; then
        ./scripts/build-deck.sh
        continue
    fi
    # The reading book ships a copy of the deck lists as well, and they name
    # every instructor slide unless filtered. build.sh owns that pairing.
    if [ "$t" = "web" ]; then
        ./build.sh
        continue
    fi
    # See build.sh: stale external/ copies can be read-only and break the copy.
    rm -rf "output/$t/external/"
    pretext build "$t"
    # Instructor targets get the board simulator's instructor examples, which
    # deliberately do not live under assets/ (see instructor-only/README.md).
    case "$t" in
        *instructor*) ./scripts/install-instructor-sim.sh "$t" ;;
    esac
done

echo ""
echo "Rebuilt: ${TARGETS[*]}"
