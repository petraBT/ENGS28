#!/bin/bash
set -e

# Builds "web-deck" and serves the classroom deck player locally FOR AUTHORING,
# so a slide can be fixed from the projector view instead of by hunting through
# source/ and decks/:
#
#   alt-click       a slide -> opens its source in your editor
#   alt-shift-click a slide -> edit it here; cmd-enter to save
#
# Where an edit lands depends on what the slide is, and holding Alt shows you
# before you click:
#
#   green solid outline   slide-owned text. A bullet, a <caption> or a <note>
#                         in a <slide> block writes to source/*.ptx; a glue
#                         slide's fields (and a ref slide's title) write to
#                         assets/decks/<deck>.json through a form.
#   amber dashed outline  real book content behind a direct ref (an <activity>
#                         or <task> a deck refs by its own xml:id). Alt-click
#                         opens it; editing it here is REFUSED, because it
#                         would change the reading students do tonight, not
#                         just the slide.
#
# Add ?notes to the URL to show presenter notes (a <slide>'s <note> and a glue
# slide's presenterNote). They are never projected otherwise, and never appear
# in the student view — but they have to be on screen to be clickable, so this
# is also how you edit them.
#
# One command for the whole setup: it starts scripts/edit-server.py - which
# finds and rewrites the source behind those clicks - as well as the page
# server, and Ctrl-C stops both. See scripts/README-editing.md.
#
# Local only: doesn't publish anywhere and doesn't touch git. The editing half
# of assets/class.html refuses to wire itself up unless it is served from
# localhost AND the edit server answers, so the deployed deck on gh-pages is
# the same file with none of this reachable.
#
# Usage: ./preview-slides.sh [port] [--no-watch]   (port defaults to 8352)
#
# --no-watch skips the rebuild-on-save watcher, for when you want the preview
# held still at a known build.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT=8352
WATCH=yes
for arg in "$@"; do
  case "$arg" in
    --no-watch) WATCH=no ;;
    *) PORT="$arg" ;;
  esac
done

# The contents page (class.html with no ?deck) reads this; a static host can't
# list a directory, so the deck list has to be a file. Regenerated before the
# build so a deck added since last time shows up without being asked for.
python3 scripts/make_deck_index.py

# Same macOS permission workaround as build.sh: shutil.copy2 preserves source
# permissions, which can leave the copies read-only and break the next build.
rm -rf output/web-deck/external/
pretext build web-deck

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
  echo "    (If ./preview-edit.sh is running, stop it: the two share this port.)"
else
  python3 scripts/edit-server.py &
  STARTED+=($!)
  echo "  - edit server on port 8927"
fi

# Rebuilds on every .ptx save, so an edit made in your editor - or in place on
# a slide - shows up after a refresh instead of needing a manual build.
if [ "$WATCH" = "yes" ]; then
  python3 watch.py web-deck &
  STARTED+=($!)
  echo "  - file watcher (rebuilds on save)"
else
  echo "  - file watcher off (--no-watch); rebuild with ./preview-slides.sh"
fi

echo ""
echo "Slides:  http://localhost:$PORT/external/class.html?deck=day1"
echo "  add &notes    to show presenter notes (and make them editable)"
echo "  add &student  to check the student view (editing stays available)"
echo ""
echo "  Hold Alt: green = editable here, amber dashed = book content (opens only)"
echo "  alt-click a slide       -> opens its source"
echo "  alt-shift-click a slide -> edit in place / open its form, cmd-enter saves"
echo ""
echo "Ctrl-C stops everything."
echo ""

python3 -m http.server "$PORT" --directory output/web-deck &
STARTED+=($!)
wait
