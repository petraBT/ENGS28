#!/bin/bash
# Build note-taking PDFs of the class slides — one landscape 16:9 page per
# slide, one PDF per deck, STUDENT VIEW ONLY.
#
#   ./make-slide-pdfs.sh                 # every deck
#   ./make-slide-pdfs.sh day1 day3 day6  # just these
#   ./make-slide-pdfs.sh --no-build      # reuse the last web-deck build (faster)
#
# Output: output/slide-pdfs/<deck>.pdf
#
# Run it whenever. It rebuilds the student deck from source first, so a slide
# edited a minute ago is in the PDF; there is no staleness to remember. That
# is also the whole point of it being one command — the decks change up to the
# last minute, and a handout built from yesterday's source is worse than no
# handout.
#
# It uses its own port (8362) and its own build directory, so it does NOT
# disturb ./preview-slides.sh, the review server on 8928, or anything else you
# have open. Safe to run mid-review.
#
# Everything instructor-only is absent three times over: the web-deck build
# strips those slides from the HTML, filter_student_decks.py drops them from
# the deck JSON, and the player is driven with &student. See scripts/deck_pdf.mjs.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT=8362
OUTDIR="output/slide-pdfs"
BUILD=yes

DECKS=()
for a in "$@"; do
    case "$a" in
        --no-build) BUILD=no ;;
        -h|--help)  sed -n '2,28p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
        -*)         echo "unknown option: $a" >&2; exit 2 ;;
        *)          DECKS+=("$a") ;;
    esac
done

command -v node >/dev/null || { echo "error: node is not on PATH" >&2; exit 1; }
python3 -c "import fitz" 2>/dev/null || {
    echo "error: python package 'pymupdf' is missing (scripts/pdf_concat.py needs it)" >&2
    echo "       pip install pymupdf" >&2; exit 1; }
[ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] || {
    echo "error: Google Chrome not found — deck_pdf.mjs drives it headless" >&2; exit 1; }

if [ "$BUILD" = yes ]; then
    echo "─── building the student deck (web-deck) ──────────────────"
    # Always via build-deck.sh, never a bare `pretext build web-deck`: the deck
    # JSON beside the stripped pages has to be filtered to match, and that
    # script owns the pairing. A bare build would leave every instructor slide
    # named in the list the PDF walks.
    ./scripts/build-deck.sh
else
    [ -f "output/web-deck/external/class.html" ] || {
        echo "error: --no-build, but output/web-deck has no build to reuse" >&2; exit 1; }
    echo "reusing the existing output/web-deck build (--no-build)"
fi

# Which decks? Default to every one in the index, in teaching order.
if [ ${#DECKS[@]} -eq 0 ]; then
    while IFS= read -r d; do DECKS+=("$d"); done < <(
        python3 -c "
import json
for x in json.load(open('output/web-deck/external/decks/index.json'))['decks']:
    print(x['id'])"
    )
fi

# Serve the student build on our own port. Killed on any exit, including Ctrl-C,
# so a failed run does not leave a server holding the port.
python3 scripts/serve-no-cache.py "$PORT" output/web-deck > /dev/null 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT INT TERM

for _ in $(seq 1 40); do
    curl -sf -o /dev/null "http://127.0.0.1:$PORT/external/class.html" && break
    sleep 0.25
done
curl -sf -o /dev/null "http://127.0.0.1:$PORT/external/class.html" || {
    echo "error: the deck player never came up on port $PORT" >&2; exit 1; }

mkdir -p "$OUTDIR"
echo ""
echo "─── printing ${#DECKS[@]} deck(s) to $OUTDIR ──────────────────"

failed=()
for d in "${DECKS[@]}"; do
    node scripts/deck_pdf.mjs "$d" "$PORT" --out="$OUTDIR" || failed+=("$d")
done

echo ""
if [ ${#failed[@]} -gt 0 ]; then
    echo "FAILED: ${failed[*]}" >&2
    exit 1
fi
echo "Done. ${#DECKS[@]} PDF(s) in $OUTDIR/"
ls -la "$OUTDIR"
