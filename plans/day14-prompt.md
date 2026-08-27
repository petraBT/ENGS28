# Day 14 — session prompt (Week 7 session 4: build the day, and decide the Reference section)

Paste this into a fresh session in `~/repos/ENGS28`. Read first, in order:

1. `CLAUDE.md`; `plans/CHAPTER-GENERATION-PROMPT.md` ("Continuing or
   reworking an existing unit").
2. `plans/week7-ground-truth.md` (§1 Day 14, §2 + §2a, §4 Lab 7, and the §9
   question list — check which have been answered), `plans/week7.md`,
   `plans/day14.md` (through Gate 1, list applied — `reviews/week7-gate1.md`).
3. The Day 13 and Day 13x handovers, and **the state of Petra's passes**:
   any day whose slides she has passed can get its in-class prose this
   session (from the passed slides, against Day 11's ~24-paragraph budget,
   Gate 3′ with the length briefing, `<!-- DELIVERY 2: prose -->` markers
   naming what the prose owes).
4. `AUTHORING-book.md`, `AUTHORING-slides.md`, `AUTHORING-visual.md`.

**Voice references:** Day 11's passed prose, Day 12's post-redo prose, the
frozen specimens. Mine her deck
(`python3 scripts/pptx_mine.py "assets/ClassSlidesOLD/Day14-Accelerometer(2).pptx"`).

## Both former gating checks are resolved (2026-08-27)

1. **`lsm303agr_partial.c` is in `assets/starters/` and verified**: the
   skeleton matches the plan's Part 4 exactly (RegisterWrite body blank;
   AccelInit whole except the two register values; `uint8_t` 0/1 return with
   the WHOAMI check given). No re-timing needed; the provisional markers are
   already retired from `plans/day14.md`. Register the book's listings
   against the real files in `check_starters.py`.
2. **HiTA is dropped — Petra's call.** The Day 14 table in `plans/day14.md`
   is final.

## The ordering for this session

1. **Day 14's Before Class reading**, full prose: the datasheet scavenger
   hunt (CTRL_REG1/4 bit fields; lookup questions in the reading quiz; the
   *answers* 0x77/0x00 stay out of the reading) — plus the short
   stationary-reading subsection (±1000 mg and why), **in her decks' framing
   (Q8 closed; no proper-acceleration/free-fall hook)**. Table citations are
   verified (ground truth §3): CTRL_REG1_A is §8.6 Tables 33–35 (p. 47),
   CTRL_REG4_A is §8.9 Tables 41–42 (p. 49) of
   `assets/datasheets/lsm303agr.pdf` — paste from there, never from memory
   (P-11).
2. **Gate 1.5** on the reading's first subsection.
3. **The in-class skeleton**: Parts 2–10 per the plan
   (3+2+10+8+17+18+6+12+11+13+5+5 = 110, checkpoint minute 58), figures
   settled, activities with `<instructor>` answers, no connecting prose.
4. **`<slide>` blocks + `assets/decks/day14.json`**; fit-measure; look at
   every figure slide.
5. **Gate 2′** (same panel and length briefing as the Day 13 prompt; reports
   to `reviews/day14-gate2.md`), apply, verify item by item, **stop for
   Petra's pass**.
6. **The chapter's Reference section — decide and, if time allows, write it**
   (see below). It has nothing derived from it, so it can ship in this
   delivery without blocking anything (B-10).

## What is already decided (do not re-derive)

- **The settings reveal**: CTRL_REG1_A = 0b01110111 (ODR 0b0111 = 400 Hz,
  LPen 0, all axes on), CTRL_REG4_A = 0b00000000 (±2 g, HR 0 → normal
  10-bit) — verified against her own Table 14/35 images at Gate 1, with the
  reconciling clause "the table rounds our derived 3.9 to 4 mg/digit". The
  bit tables go on screen for sixty seconds *before* the commit.
- **Part 4's shape**: silent attempt (2) → reveal (4) for `RegisterWrite`
  (one `i2c1_memWrite`, datasheet Table 20); `AccelInit` (9) with the
  fallback above. The given/blank split is confirmed from her Day 13x
  slide-13 note; only the skeleton's insides need the file.
- **Part 5 opens by reading `accel_test.c`** — the CTRL readbacks and the
  scaling line (`>>16` where the formula said ÷2¹⁶). The declared types of
  `accel_x/y/z` come from the real file (presumably `int32_t`; do not
  invent).
- **The checkpoint handoff is one-to-one, not announced**, and the rescued
  student still runs their own board through Parts 5–7's tests — put this in
  the instructor notes.
- **Part 8 carries the mechanism**, not the verdict: Aₓ = g sin θ flattens
  as θ→90° (slope g cos θ → 0), which is why one axis fails there; two axes
  → the arctangent of ax/ay → `atan2()`. **The stretch is atan2(ax, ay)**
  ("hold the board upright, like a phone") — never az; Gate 1 caught that
  error once already.
- **Part 9's beat order**: data-format recap first (the integer
  before-picture); the BRR truncation recall *before* the cast commit; the
  answer landed explicitly — `(float)raw * 4 / 65536`; `round()` + the `%f`
  caveat **as a delta on Day 5's rule** (ch-uart already teaches no-`%f` —
  cite it, B-8), marked `allow L-2`; FPU expanded on first use ("no
  dedicated hardware circuit for float math").
- The exclude-from-build beat keeps its displayed self-rescue line
  (`multiple definition of 'main'` → the menu path).

## The Reference section (B-10 — the sibling shape is `sec-i2c-reference`)

Opens with the "nothing here is new" framing sentence, then lookup-form
subsections. The manifest, assembled from the week's decisions (week7.md's
L-2 section and Gate 1 items 5, 18):

- The LSM303AGR register map / full `lsm303agr.h` (when the real file
  arrives — B-6 until then).
- The data-format arithmetic in full: all three modes, the collapse, and the
  worked negative example.
- **The signed-shift note**: `>>` on a signed value is an arithmetic (floor)
  shift, not interchangeable with `/` — `accel_test.c` multiplies by 4000
  before shifting 16, so a hand check of a negative reading can land 1 mg
  off CoolTerm's.
- IEEE 754 layout, and precision-vs-range said precisely: `int32_t` exact
  over ±2³¹; `float` ~24 significant bits of relative precision with ~10³⁸
  of exponent range — traded against the same 32 bits, not two free lunches.
  (**Not** code size — that is in-class Part 9 and Lab 7 D4 grades it.)
- AN-1057 depth: the three-angle full orientation (Lab 7's optional Going
  Further), quadrant handling.
- Zero-g offset calibration (flat + flipped, average) — the Day 13x stretch,
  written down.
- The C1/C2 differential-capacitance detail displaced from Day 13x Part 1.

This is the Day 12 lesson applied in advance: depth the committee wants
lands **here**, not in class prose.

## Figures (manifest, ground truth §6)

14/6 (CTRL bit tables + "Setting:" callouts — rebuild; instructor-only
candidates), 14/9 (Table 20 write transfer — reuse Day 13's figure if built),
14/13 (CoolTerm chart setup — keep; verify the menu path, Q7), 14/15
(plotter shot — keep), 14/17 (AN-1057 geometry — rebuild with formula
callouts). Commit `assets/book.css` with figure changes.

## Open questions that touch this day

Q1, Q2, Q4, Q8 — closed (answers folded into the plan and ground truth).
Still live: **Q5's file** — Petra approved hosting AN-1057 but analog.com
blocks downloads from this network, so check whether
`assets/datasheets/an-1057.pdf` has appeared before writing Part 8's link
(if not, link the citation as a marked TODO and note it in the handover);
**Q7** — students run the newest CoolTerm; her slide's screenshot is the
authority for the chart-view path, confirm the menu wording against the
current build when writing Part 7's beat; and **Q3** — at her pace; check
`assets/starters/i2c.c`'s git log in case she has switched to a
NACK-reporting variant.

## Standing traps

- Day 14 is a **Thursday, 110 minutes**. The table's total and checkpoint
  were wrong once already (Gate 1's four-reviewer BLOCKER) — re-add the
  minutes after any change, by hand.
- Servers/PIDs/:8928, the four pre-commit checks, `git status` first, her
  wording wins — as in the Day 13 prompt.
- Units Unicode; American spelling; no Arduino (B-11e); L-13/L-14; no cutesy
  language; never say what the day does not involve. The AD2 is the
  instrument of last resort in the ladder — DIO0/DIO1, never "yellow".
