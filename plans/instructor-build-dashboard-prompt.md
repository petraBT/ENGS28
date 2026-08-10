# Prompt: wire the instructor book into the Launchpad

Paste everything below the line into a fresh session. Working dirs:
`~/repos/ENGS28` (the book) and `~/repos/Launchpad` (the dashboard).

---

The ENGS 28 book gained a fourth build target, **`web-instructor`**, and it needs
wiring into the Launchpad dashboard. Two repos: `~/repos/ENGS28` and
`~/repos/Launchpad` (node `server.js`, serves on :7788; tiles are defined in
`tools.js`, UI in `public/index.html`).

## What `web-instructor` is, and why it exists

The book has a custom `<instructor>` element for anything that hands over work a
student or a lab is meant to do — a filled-in driver function, a completed
program, an activity's worked answer. `xsl/engs28-html.xsl` **strips** it from
every student-facing target (`web`, `web-edit`, `web-deck`, `print`) — stripped,
not CSS-hidden, so it is not in the page source — and renders it, boxed and
labelled, only when `book.solutions=render`. That is the `web-instructor` target
in `project.ptx`.

**`output/web-instructor` must never be deployed beside the student book.** It is
for Petra's own screen. Full background is at the end of `AUTHORING-book.md`
under *Instructor-only content in the book*.

Already done, do not redo: the target in `project.ptx`, the XSL templates
(including four that keep both `<instructor>` and `<slide>` out of the student
search index), the box styling in `assets/book.css`, and
`scripts/build-all.sh`, whose `TARGETS` array already includes `web-instructor`.

## What to build

**1. "Rebuild ALL book targets" already builds it — the tile's note lies.**
`tools.js`, tile id `engs28-build-all` (~line 349). `build-all.sh` now builds
four targets; the note still says "Rebuilds web, web-edit AND web-deck". Fix the
note, and say plainly that the fourth one is the instructor copy and is not for
students.

**2. A second Open button on the authoring tile.** `tools.js`, tile id
`engs28-edit` (~line 188), currently:

```js
opens: [
  { label: "Open book ↗", url: "http://localhost:8931/" },
  { label: "Open Day 1 chapter ↗", url: "http://localhost:8931/ch-intro-blinky.html" },
],
```

Petra wants "Open student book" and "Open instructor book" side by side. Rename
the first so the pair reads clearly.

**The obstacle to solve first:** `preview-edit.sh` serves *one* directory —
`python3 -m http.server "$PORT" --directory output/web-edit` — so there is
currently nothing serving `output/web-instructor`. Pick an approach and say why
you picked it:

- a second `http.server` on a new port inside `preview-edit.sh` (simplest; costs
  a port), or
- one server rooted higher with both under it (changes every existing URL — probably not), or
- a tiny router that maps a path prefix to the second directory.

**Port collisions are real here.** 8931 and 8927 are shared with the ENGS 20
authoring preview — the tile carries `conflictsWith: ["cprog-edit",
"engs28-slides-edit"]` for exactly that reason. Whatever port you add, check it
against every `port:` in `tools.js` first, and add it to the tile's note the way
the existing ports are listed.

**3. Rebuild should refresh both.** The tile's `rebuild:` is
`./scripts/build-edit.sh`, which builds `web-edit` only. Make Rebuild refresh
`web-edit` *and* `web-instructor` — either by extending `build-edit.sh` or by
giving the tile a compound command. Keep it noticeably faster than
`build-all.sh`, which is the whole reason this tile has its own rebuild.

**4. The watcher too.** `preview-edit.sh` runs `python3 watch.py web-edit` in the
background, and there is a separate Launchpad tile `engs28-watch` running
`python3 watch.py`. Both should rebuild the instructor copy as well, so an
`<instructor>` block edited during authoring shows up without a manual rebuild.
Check whether `watch.py` takes multiple targets before assuming it does.

## How to verify — do this, do not just build

The point of the whole mechanism is that solutions do not leak. After wiring it
up, prove both directions:

```bash
cd ~/repos/ENGS28 && ./scripts/build-all.sh
# absent from the student book AND its search index:
grep -c 'HT16K33_ADDR_PTR, 2\*HT16K33_NBUF' output/web/subsec-day10-driver.html
grep -c 'The three functions, complete' output/web/lunr-pretext-search-index.js
# present in the instructor build:
grep -c 'HT16K33_ADDR_PTR, 2\*HT16K33_NBUF' output/web-instructor/subsec-day10-driver.html
```

Expect `0`, `0`, `1`. **The search index is the one that bites** — PreTeXt builds
it in separate XSL modes that walk the source tree rather than the rendered
HTML, so a leak there is invisible on the page. If you add any new
strip-by-default element later it needs the same four templates.

Then start the tile from the Launchpad and confirm both Open buttons land on
their own book, and that Rebuild and a save-triggered watch rebuild both.

## House rules

`~/repos/ENGS28`: run `./scripts/build-all.sh`, `python3 scripts/check_rules.py
--quiet source/*.ptx`, `python3 scripts/check_deck.py assets/decks/*.json` and
`python3 scripts/check_starters.py` before every commit. Small commits, pushed as
you go. `git status` first — Petra edits both repos while you work; commit only
files you changed.
