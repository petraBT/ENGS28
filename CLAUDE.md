# ENGS 28 Textbook — Context for Claude

**Course**: ENGS 28: Embedded Systems, Thayer School of Engineering, Dartmouth College
**Author**: Petra Bonfert-Taylor
**Platform**: PreTeXt (XML → HTML/PDF)
**Hardware**: STM32 Nucleo-C031C6 board (STM32C031C6 MCU), Analog Discovery 2
**Language**: C, direct register-level programming (no HAL)

---

## Read these before writing anything

This file is orientation only — the repo layout, the build, and the hardware
facts. **The rules and the process live elsewhere, and they are authoritative
over anything here.**

| For | Read |
| --- | --- |
| **What to write** — every rule, with an ID | `AUTHORING-book.md` (P-n, B-n, S-n, L-n) |
| **How a chapter gets written** — steps and gates | `CHAPTER_PROCESS.md` |
| **Starting a chapter in a fresh session** | `plans/CHAPTER-GENERATION-PROMPT.md` |
| **Slide markup and deck mechanics** | `AUTHORING-slides.md` |
| **How a slide should LOOK** — type sizes, figures, captions, layout | `AUTHORING-visual.md` |
| **Build, git, deploy** | `AUTHORING.md` |
| **The review committee** | `.claude/agents/README.md` |

**The unit is delivered twice**: the book (pre-class reading, in-class sections,
reference material, figures) goes to Petra first, and the deck is condensed only
from the text she has passed. A committee gate runs before each delivery. Never
generate slides from prose she has not passed.

---

## Build

```bash
./build.sh                  # the reading book (web)
./scripts/build-all.sh      # every target — web, web-edit, web-deck, both instructor builds
```

`./preview-edit.sh` builds and serves the authoring preview: alt-clicking a
paragraph opens it in an editor at the right file and line, alt-shift-clicking
edits it in place. The student book is on :8931, the instructor book on :8932.
`./preview-slides.sh` does the same for the deck player. Useful for finding the
source of something you can see rendered.

Both build scripts first run `scripts/image_ratios.py`, which regenerates a
marked block of per-image `aspect-ratio` rules in `assets/book.css` — every
HTML target loads that file. Without it a page's figures reserve no space and
it reflows by hundreds of pixels as they load, which is what made a review
comment's pixel `bbox` fail to replay. **Commit `assets/book.css` when you add
or resize a figure**; `python3 scripts/image_ratios.py --check` says whether it
is stale.

Before every commit:

```bash
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

---

## Repository structure

```
source/            PreTeXt XML source, one file per chapter
assets/
  ClassSlidesOLD/  Petra's original PowerPoint decks — the ground truth for the
                   in-class arc and for driver code. Mine with scripts/pptx_mine.py;
                   rebuild annotated figures with scripts/pptx_annotate.py
  ClassSlidesNEW/  Decks as rebuilt for the book
  images/DayNN-*/  Figures, one folder per day
  decks/           Deck playlists (<id>.json) + index.json
  starters/        Real driver and starter .c files handed to students
  sim-starters/    Per-exercise starter .c files loaded by <sim starter="…"/>
  datasheets/      Component datasheets, linked as external/datasheets/<name>.pdf.
                   Day 5X worksheet: TMP235, DRV5053, DS3231, LIS3DH, Si7021.
                   Day 12: ee-sx67 (the Omron photointerrupter — NPN open collector,
                   supply 5-24 VDC, which is why its power is 5 V and its pull-up 3.3 V).
                   Day 6 transistor tables: KSC2073, TIP41A (covers TIP42),
                   PZT3904, PZT3906, IRFZ24N, IRF9Z24N, BS107P, BS250P
  Labs/            Lab PDFs — the downstream constraint on each chapter
  board-sim/       BUILT output of the board simulator — do not edit by hand;
                   refresh with scripts/sync-board-sim.sh
  *.pdf            Hosted reference documents (linked as external/…)
plans/             Lesson plans, ground truth, voice specimens; archive/ is superseded
reviews/           Committee reports, dayNN-gateN.md
scripts/           Authoring and checking tooling
xsl/               engs28-html.xsl, engs28-latex.xsl — the custom elements
output/            Built targets (git-ignored)
```

**Custom elements** — three that are this book's own, taught to PreTeXt in
`xsl/engs28-html.xsl` (with print behaviour in `xsl/engs28-latex.xsl`):

- `<slide>` — the condensed in-class form of the surrounding content, rendered
  only in the deck builds. See `AUTHORING-slides.md`.
- `<instructor>` — a worked answer. **Stripped**, not hidden, from the reading
  book, the student deck, the PDF and the search index. A strip-by-default
  element needs templates in three places; see `AUTHORING-book.md`.
- `<sim starter="name"/>` — the embedded board simulator, seeded with
  `assets/sim-starters/name.c`. Source repo: `~/repos/ENGS28-board-sim`.

**Hosted reference PDFs** (in `assets/`, linked as `external/filename.pdf`):
`stm32c031_rm.pdf`, `stm32c031_datasheet.pdf`, `nucleo_user_manual.pdf`,
`nucleo_schematic.pdf`, `nucleo_pinout.pdf`. Component datasheets live in
`assets/datasheets/` and link as `external/datasheets/<name>.pdf`.

---

## Chapter map

| # | File | Title | Days |
|---|------|-------|------|
| 1 | ch-intro-blinky.ptx | GPIO and Blinky: Your First Embedded Program | 1, 1x, 2 |
| 2 | ch-switches.ptx | Digital Inputs: Switches and Debouncing | 3, 3x, 4 |
| 3 | ch-uart.ptx | Serial Communication: UART | 5 |
| 4 | ch-io-datasheets.ptx | Reading Component Datasheets | 5x |
| 5 | ch-transistors.ptx | Transistors: BJTs and MOSFETs | 6 |
| 6 | ch-adc.ptx | Analog-to-Digital Conversion | 7 |
| 7 | ch-debugging.ptx | Debugging Embedded Programs | 7x |
| 8 | ch-timers-interrupts.ptx | Timers and Interrupts | 8 |
| 9 | ch-gpio-interrupts.ptx | GPIO Interrupts | 9 |
| 10 | ch-i2c.ptx | I2C: A Two-Wire Bus, and a Display Driver | 9x, 10 |
| 11 | ch-motors.ptx | DC Motors and PWM | 11, 11x, 12 |
| 12 | ch-accelerometers.ptx | Accelerometers | 13, 13x, 14 |
| 13 | ch-servos.ptx | Servomotors | 15, 15x |
| 14 | ch-photosensors.ptx | Photosensors and the Solar Tracker | 16 |
| 15 | ch-ble.ptx | Bluetooth Low Energy | 17 |
| 16 | ch-power.ptx | Power Management | 17x |

Order is `source/main.ptx`; titles are the chapters' own. Day 13 lives in
ch-accelerometers, not ch-i2c — Petra's call.

**Which chapters are finished is tracked in one place** — the chapter status
table in `CHAPTER_PROCESS.md`. Do not keep a second copy here.

---

## PreTeXt conventions and gotchas

### Activity structure
Bare `<p>` directly inside `<activity>` before `<task>` elements is silently
dropped by PreTeXt. Always wrap introductory paragraphs in `<introduction>`:

```xml
<activity xml:id="...">
    <title>...</title>
    <introduction>
        <p>...</p>
    </introduction>
    <task>...</task>
</activity>
```

Use `<url href="...">` inside `<introduction>`, never bare in `<activity>`.

### Figure placement
Place each `<figure xml:id="...">` at its **first point of use** in the reading
flow — which is nearly always an in-class section. Reference sections `<xref>`
back to it. Never define the same `xml:id` twice.

### Image sizing
- `<image width="X%"/>` inside a standalone `<figure>` = X% of text width. ✓
- `<image width="X%"/>` inside a `<sidebyside>` panel is **ignored** — the panel
  width controls the image. Use `widths="X% Y%"` on `<sidebyside>` instead.
- A hand-authored `.svg` needs **both** `width` and `height` matching its
  `viewBox`, or the browser gives it 300×150 and it projects tiny. `check_rules.py`
  errors on this (B-11a).

### Table width
`<col width>` only sizes columns relative to the table, not to the page. To
constrain a wide table, wrap it in `<sidebyside widths="X%" margins="Y%">`.
On a **slide**, declared column widths do carry through — declare one on every
column, summing to 100%, or leave them all off.

### External assets
Files in `assets/` are copied to `output/web/external/` at build time; reference
them as `<url href="external/filename.pdf">`. `build.sh` deletes
`output/web/external/` first, to avoid a macOS permission error (`shutil.copy2`
preserves read-only source permissions).

---

## Course and hardware facts

These are the ones that get written wrong from plausibility.

- MCU: **STM32C031C6** on the Nucleo-C031C6. Name it; never "the target MCU" (L-5).
- GPIO pins are referenced by **both** names — "D5 (PB4)" — always give both.
- Blue user button: PC13, active-low. On-board LED: PA5.
- **Active-low convention**: pressed = 0, released = 1. Explain it whenever
  buttons are introduced.
- Internal pull-ups: ~40 kΩ.
- Clock: 12 MHz default, which is what all in-class code assumes. 48 MHz needs
  explicit PLL configuration.
- The Nucleo supplies **3.3 V**. Never say 5 V — it could damage the chip.
- **AD2 oscilloscope**: CH1 is orange, CH2 is blue; minus leads have white
  stripes. Never say "yellow".
- **Class lengths, by day number.** Day N with N **odd** is a **Tuesday, 110
  minutes**; Day N**x** is a **Wednesday x-hour, 50 minutes**; Day N with N
  **even** is a **Thursday, 110 minutes**. Every day of week 5 was first budgeted
  to 65 minutes, and so was Day 11 — the error has now been made three times, so
  take the length from this line rather than assuming an hour.
- **The course uses its own readings.** It no longer assigns or cites **Williams**.
  Her older decks still carry Williams page references — Day 11x's slide 7 does —
  so mining an old deck will resurface them (P-12 reuse). Drop them; do not carry
  a citation into the book because her slide had one.
- **There are no lab benches.** Each student carries a portable kit and works on
  their own laptop. Never write "bench".
- `TemplateProject` is the starting point for every student project: copy it,
  rename it, add the starter `.c` to `Src/`.
- Units in prose are Unicode, not LaTeX: µs, ms, kΩ, µF.
- American spelling throughout (L-7).

## Review comments — slides and book ("check my review comments")

Petra reviews by **circling a region and typing a comment** — on SLIDES in the
deck player (◎ Review / `R` / `?review` in `assets/class.html`) and on BOOK
pages in the web-edit preview (◎ Review button / `R` / `?review`, injected by
`assets/ptx-review.js` via ptx-edit.js; sticky across page turns per tab).
Localhost only, both invisible unless `scripts/review-server.py` (port 8928,
started by `./preview-slides.sh`, or standalone) answers. Every comment is one
JSON line appended to **`reviews/slide-comments.jsonl`**:

- **Slide comments**: deck, slide (runtime index), `jsonIndex` (index in the
  deck FILE — locates the entry in `assets/decks/<deck>.json`), title,
  stage-normalized `bbox` + `stroke`, her `text`, and the `url` to reopen it.
- **Book comments** (`kind: "book"`): `page`, `url`, `viewportWidth`,
  `bbox`/`stroke` in DOCUMENT pixels, `anchors` (the circled PreTeXt blocks:
  id + tag + text excerpt), and — when the edit server was up at capture —
  `source: {file, line}` pointing straight into `source/*.ptx`.

**The workflow is BATCH by default.** Comments accumulate; when Petra says
**"check my review comments"** (or "…slide…"/"…book…" — same thing): read the
file, sort by `ts`, group by deck/page and source file, apply ALL edits,
rebuild affected targets **once**, and report per comment what changed. As
each is handled (or judged moot — say why), MOVE its line to
`reviews/slide-comments-archive.jsonl`; nothing is ever just deleted.

To SEE what she circled: render the comment's `url` in headless Chrome
(puppeteer-core) and crop. Slides: 1600×900 viewport, clip = bbox × stage
size. Book: viewport width = `viewportWidth`, clip = the document-pixel bbox
(padded) — and for the fix itself, prefer `source.file:line` or the anchors'
ids/excerpts over pixels.

**"Watch my review comments"** is the opt-in LIVE mode: ensure the server
(`curl -s 127.0.0.1:8928/health`, else start it), then Monitor the queue file
and act per comment.

Two rules that keep her reviewing while you correct:
- **Never kill the review server (:8928) during corrections.** It is
  standalone on purpose; restarting page/edit servers or rebuilding must not
  take it down.
- Her open tabs **buffer comments in a browser-local outbox** when the server
  is unreachable and flush automatically once it answers (15s retry, and on
  reload). A comment she made that is "missing" from the file is sitting in
  her browser: bring the stack up and wait a retry or have her reload.
