#!/bin/bash
# Refresh the copy of the ENGS 28 board simulator that ships with the book.
#
# The simulator's SOURCE lives in its own repo (~/repos/ENGS28-board-sim). This
# script builds it there and copies the built, self-contained output into
# assets/board-sim/, which PreTeXt then copies to output/<target>/external/
# board-sim/ on every build - so the simulator is present in the local
# authoring preview, in the deck build, and on the deployed GitHub Pages site,
# with no extra deploy step. `pretext deploy` publishes book and simulator
# together, and the published copy doubles as the standalone URL you can link
# from Canvas:
#
#   https://engs20book.thayer.dartmouth.edu/ENGS28/external/board-sim/index.html
#
# assets/board-sim/ is BUILT OUTPUT and is committed deliberately, only by
# running this script - never edit it by hand. Fix the simulator in its own
# repo, then re-run this and commit the result.
#
#   ./scripts/sync-board-sim.sh                 # default sim repo location
#   BOARD_SIM_REPO=/path/to/repo ./scripts/...  # somewhere else

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BOOK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SIM_REPO="${BOARD_SIM_REPO:-$HOME/repos/ENGS28-board-sim}"
DEST="$BOOK_DIR/assets/board-sim"

if [ ! -f "$SIM_REPO/package.json" ]; then
    echo "error: no simulator repo at $SIM_REPO" >&2
    echo "       clone it, or set BOARD_SIM_REPO to where it lives." >&2
    exit 1
fi

echo "Building the simulator in $SIM_REPO ..."
cd "$SIM_REPO"
[ -d node_modules ] || npm install
# `npm run build` is the STUDENT build: its examples dropdown lists only code
# the students have been given. The simulator also has an instructor build
# (`npm run build:instructor`, into dist-instructor/) whose dropdown adds the
# solution programs. That one is local only - preview it from the Launchpad -
# and it must never be what the book carries, since assets/ is copied into
# every target's external/, including the one that gets deployed.
npm run build

# Belt and braces: the instructor examples live in a module the student build
# drops entirely, and this is where a mis-set VITE_SIM_AUDIENCE would surface.
# Fail loudly rather than sync answers into the book.
if grep -rq "engs28-sim-instructor-examples" dist/; then
    echo "error: dist/ contains the INSTRUCTOR examples (solution programs)." >&2
    echo "       That is the instructor build, not the student one. Run" >&2
    echo "       'npm run build' in $SIM_REPO with VITE_SIM_AUDIENCE unset," >&2
    echo "       then sync again." >&2
    exit 1
fi

# The instructor examples (solutions and demos) travel as a small JSON
# side-car rather than a second bundle. It goes to instructor-only/, NOT to
# assets/, because assets/ is copied into every target including the deployed
# one; scripts/install-instructor-sim.sh puts it into the instructor targets
# after they build. See instructor-only/README.md.
echo "Building the instructor examples side-car ..."
npm run build:instructor >/dev/null
cp dist-instructor/instructor-examples.json "$BOOK_DIR/instructor-only/sim-examples.json"

# --delete so the previous build's content-hashed assets/*.js don't pile up.
echo "Copying dist/ -> assets/board-sim/ ..."
mkdir -p "$DEST"
rsync -a --delete "$SIM_REPO/dist/" "$DEST/"

# Record which commit of the simulator this copy came from, so a stale embed is
# diagnosable from the book repo alone.
SIM_REV="$(git -C "$SIM_REPO" rev-parse --short HEAD 2>/dev/null || echo unknown)"
SIM_DIRTY=""
git -C "$SIM_REPO" diff --quiet 2>/dev/null || SIM_DIRTY=" (with uncommitted changes)"
cat > "$DEST/BUILD-INFO.txt" <<EOF
Built output of the ENGS 28 board simulator - DO NOT EDIT HERE.
Source: $SIM_REPO
Commit: $SIM_REV$SIM_DIRTY
Synced: $(date -u +%Y-%m-%dT%H:%M:%SZ) by scripts/sync-board-sim.sh
EOF

echo
echo "Done. Simulator at commit $SIM_REV$SIM_DIRTY is now in assets/board-sim/."
echo "Rebuild the book (./build.sh) to see it, then commit assets/board-sim/."
