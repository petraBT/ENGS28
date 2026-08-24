#!/bin/bash
set -e

# Builds "web-edit" and serves it locally for authoring, so that small changes
# can start from the rendered page instead of from hunting through source/:
#
#   alt-click       a paragraph -> opens it in your text editor
#   alt-shift-click a paragraph -> edit the text in place, cmd-enter to save
#
# It also builds "web-instructor" and serves it on the NEXT port, so the book
# you are writing and the book with the solutions in it are both one click
# away and always the same save:
#
#   :8931  student book    web-edit        Alt-click editing
#   :8932  instructor book web-instructor  every <instructor> block, boxed
#
# Two ports rather than one server because they are two output directories and
# `python3 -m http.server` serves exactly one. Keeping them physically separate
# is also the point: nothing under output/web-edit can serve a solution even by
# accident. The instructor book has no ptx-edit.js, so editing happens on :8931
# — but a save rebuilds both, so :8932 is never behind.
#
# One command for the whole setup: it starts scripts/edit-server.py - which
# finds and rewrites the source behind those clicks - as well as the page
# server, and Ctrl-C stops both. See scripts/README-editing.md.
#
# Ported from the C-Programming book, minus the parts that book needs for its
# in-browser coding windows (applets, CMeCodeDir, COOP/COEP headers, the
# starting-points tool). This book has none, so a plain file server will do.
#
# Local only: doesn't publish anywhere and doesn't touch git. web-edit is
# deliberately absent from build.sh, because it is the one target carrying a
# script that talks to a server able to rewrite source files.
#
# Usage: ./preview-edit.sh [port] [--no-watch]   (port defaults to 8931)
#
# The instructor book is served on port+1, so a custom port moves both.
#
# --no-watch skips the rebuild-on-save watcher, for when you want the preview
# held still at a known build.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT=8931
WATCH=yes
for arg in "$@"; do
  case "$arg" in
    --no-watch) WATCH=no ;;
    *) PORT="$arg" ;;
  esac
done
INSTRUCTOR_PORT=$((PORT + 1))

# Builds web-edit AND web-instructor (and does the macOS external/ permission
# workaround for each). Same script the Launchpad's Rebuild button runs, so the
# two cannot drift apart.
./scripts/build-edit.sh

# Everything this script starts goes in here and is torn down together.
STARTED=()
cleanup() {
  [ ${#STARTED[@]} -gt 0 ] && kill "${STARTED[@]}" 2>/dev/null
  return 0
}
# INT and TERM as well as EXIT, and the page server backgrounded under "wait"
# below rather than run in the foreground: bash defers traps while waiting on a
# foreground child, so with EXIT alone the edit server would be orphaned on its
# port whenever this shell got the signal on its own rather than as part of the
# foreground process group.
trap 'cleanup; exit 130' INT TERM
trap cleanup EXIT

echo ""
echo "Helpers:"
# -sTCP:LISTEN matters: without it this also matches a browser tab's open client
# connection to the port, so a stale tab would block a server that isn't running
# any more. A port already taken is reported rather than silently failing - the
# preview is still worth serving without the helper.
if lsof -ti tcp:8927 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "  ! edit server: port 8927 is already in use - not starting another."
  echo "    (If an earlier ./preview-edit.sh is still running, use that one.)"
else
  python3 scripts/edit-server.py &
  STARTED+=($!)
  echo "  - edit server on port 8927"
fi

# Book review comments (circle + comment on a page -> reviews/
# slide-comments.jsonl, drained by a Claude session: "check my review
# comments"). Same server the slides preview starts; same one-per-port rule.
if lsof -ti tcp:8928 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "  ! review server: port 8928 is already in use - not starting another."
else
  python3 scripts/review-server.py &
  STARTED+=($!)
  echo "  - review server on port 8928 (◎ Review / R in the book -> comments for Claude)"
fi

# Rebuilds on every .ptx save, so an edit made in your editor - or in place in
# the preview - shows up after a refresh instead of needing a manual build.
#
# --command, not a target name: watch.py takes ONE positional target, so
# `watch.py web-edit web-instructor` would silently watch only the first and
# the instructor book would sit at the build from when this started. The script
# builds both, and is what Rebuild runs too.
if [ "$WATCH" = "yes" ]; then
  python3 watch.py --command ./scripts/build-edit.sh &
  STARTED+=($!)
  echo "  - file watcher (rebuilds both books on save)"
else
  echo "  - file watcher off (--no-watch); rebuild with ./preview-edit.sh"
fi

# The instructor book. Same lsof guard as the edit server above: this port is
# only ever ours, so anything on it is an orphan from a previous run - say so
# rather than letting python fail into the log and leave the link dead.
if lsof -ti tcp:"$INSTRUCTOR_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "  ! instructor book: port $INSTRUCTOR_PORT is already in use - not starting another."
  echo "    (Orphan from an earlier run? lsof -ti tcp:$INSTRUCTOR_PORT | xargs kill)"
else
  python3 scripts/serve-no-cache.py "$INSTRUCTOR_PORT" output/web-instructor &
  STARTED+=($!)
  echo "  - instructor book on port $INSTRUCTOR_PORT"
fi

echo ""
echo "Book:        http://localhost:$PORT/   <- open this one"
echo "  alt-click a paragraph       -> opens it in your editor"
echo "  alt-shift-click a paragraph -> edit in place, cmd-enter to save"
echo ""
echo "Instructor:  http://localhost:$INSTRUCTOR_PORT/   <- same book, solutions rendered"
echo "  read-only (no Alt-click); never deploy output/web-instructor"
echo ""
echo "Ctrl-C stops everything."
echo ""

python3 scripts/serve-no-cache.py "$PORT" output/web-edit &
STARTED+=($!)
wait
