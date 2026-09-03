#!/bin/bash
# Copy instructor-only/ content into an instructor target's built output.
#
# PreTeXt copies assets/ into every target's external/, deployable ones
# included, so the board simulator's instructor examples are kept outside
# assets/ and installed here instead - after the build, and only for the
# targets that should have them. See instructor-only/README.md.
#
#   ./scripts/install-instructor-sim.sh web-instructor web-deck-instructor
#
# Refuses to touch a target that is not an instructor build, and warns rather
# than failing if the file has never been synced: a missing side-car degrades
# to the student dropdown, which is the safe direction.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

SRC="instructor-only/sim-examples.json"

if [ $# -eq 0 ]; then
    echo "usage: $0 <instructor-target> [more targets...]" >&2
    exit 2
fi

if [ ! -f "$SRC" ]; then
    echo "install-instructor-sim: $SRC is missing - run ./scripts/sync-board-sim.sh" >&2
    echo "                        (the instructor book will show the student examples)" >&2
    exit 0
fi

for target in "$@"; do
    case "$target" in
        *instructor*) ;;
        *)
            echo "install-instructor-sim: refusing to install into '$target'," >&2
            echo "                        which is not an instructor target." >&2
            exit 1
            ;;
    esac

    dest="output/$target/external"
    if [ ! -d "$dest" ]; then
        echo "install-instructor-sim: no $dest yet - build $target first." >&2
        continue
    fi
    cp "$SRC" "$dest/sim-examples-instructor.json"
    echo "  instructor sim examples -> $dest/sim-examples-instructor.json"
done
