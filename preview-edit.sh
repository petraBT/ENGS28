#!/bin/bash
set -e

# Builds "web-edit" and serves it locally for authoring, so that small changes
# can start from the rendered page instead of from hunting through source/:
#
#   alt-click       a paragraph -> opens it in your text editor
#   alt-shift-click a paragraph -> edit the text in place, cmd-enter to save
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
# Usage: ./preview-edit.sh [port]   (defaults to 8931)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${1:-8931}"

# Same macOS permission workaround as build.sh: shutil.copy2 preserves source
# permissions, which can leave the copies read-only and break the next build.
rm -rf output/web-edit/external/
pretext build web-edit

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

echo ""
echo "Book:  http://localhost:$PORT/   <- open this one"
echo "  alt-click a paragraph       -> opens it in your editor"
echo "  alt-shift-click a paragraph -> edit in place, cmd-enter to save"
echo ""
echo "Ctrl-C stops everything."
echo ""

python3 -m http.server "$PORT" --directory output/web-edit &
STARTED+=($!)
wait
