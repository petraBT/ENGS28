# Rewrite `ch-i2c.ptx` — Day 9x (I2C) and Day 10 (I2C + the 7-segment display)

Work in `~/repos/ENGS28`. This continues a week-long rewrite whose first
chapter is finished; **Step 0 and Gate 1 are already done for these two days**,
so this session starts at Step 3.

## What you are writing

One chapter, `source/ch-i2c.ptx`, covering two class days:

| Day | Topic | Old deck |
|---|---|---|
| 9x | I2C: the protocol and the peripheral | `assets/ClassSlidesOLD/Day09X-I2C.pptx` (32 slides) |
| 10 | The HT16K33 and its device driver | `assets/ClassSlidesOLD/Day10-I2C(2).pptx` (56 slides) |

**Day 13 is not yours.** It was moved to `ch-accelerometers.ptx` by Petra's
decision — `ch-i2c.ptx` keeps only the generic I2C register-read/write transfer
diagram (currently `fig-i2c-transfer-pattern`, from Day 13 slide 29) in its
Reference section, and drops `fig-firmware-layers-accel`, which duplicates
Day 10's own layers figure. `CHAPTER_PROCESS.md`'s status table already
reflects this.

## Read these first, in this order

1. **`plans/week5.md`** — the lesson plan, Revision 2, already through Gate 1.
   The Day 9x and Day 10 sections are your spec: objectives, crucial step,
   stretch, minute-by-minute activity sequence, datasheet moments, writing
   room, hand-offs. **Do not redesign the arc.** It survived a seven-reviewer
   Gate 1 that returned three BLOCKERs, and the fixes are in it.
2. **`plans/week5-ground-truth.md`** — Step 0. Every driver listing
   transcribed from the old decks with slide numbers so you can re-check, and
   every RM0490 section number read out of `assets/stm32c031_rm.pdf` rather
   than assumed. §1 has `i2c1_init()`, `i2c1_byteWrite/byteRead`,
   `pingDisplay.c`, `writeFirstDigit.c`, and Petra's own `SevenSeg_*`
   solutions, all complete.
3. **`CHAPTER_PROCESS.md`** — the workflow, the gates, the definition of done,
   and "What Day 9's Gate 2 taught us", which is the most important thing on
   this page for you.
4. **`AUTHORING-book.md`** — the rule catalogue (P-, B-, S-, L-).
5. **`AUTHORING-slides.md`** — slide markup, layouts, and the fit check.
6. **`plans/day8-voice-reference.diff`** — Petra's own hand rewrite, the
   specification for the voice. Rules S-11…S-19 summarize it; the diff *is*
   it. Read it before writing a word.
7. **`source/ch-gpio-interrupts.ptx`** — the chapter finished last session, and
   the model for what "done" looks like now. Also `reviews/day9-gate2.md` for
   what a committee finds when you get it wrong.

## The single most important lesson from Day 9

Day 9's Gate 2 returned three BLOCKERs. All three were **explanatory prose
around correct code** — the code, the register names, the offsets and the
figures were all right. The worst:

> The chapter taught, in four student-facing places, that a masked EXTI line
> still records edges in `FPR1` so software can poll it. RM0490 §12.3.1 says
> the pending register is set **only** for an unmasked interrupt. The claim
> came from Petra's own speaker note, was copied into the Step 0 ground truth
> as fact, and passed Gate 1 and all four linters.

**The old decks are authoritative for the arc and for the code. They are not
authoritative for hardware explanations.** Day 9x's decks contain several
speaker notes that explain *why* I2C hardware behaves as it does — open-drain
and arbitration, clock stretching, why the address is shifted, what the
TIMINGR fields mean. Treat every one of those as a claim to verify against
RM0490 §23 or the I2C spec before it becomes prose. The ground-truth file
records what the deck *says*; it does not certify it.

Two of the other blockers were earlier chapters' set-pieces restated
backwards. Day 9x has the same exposure: the library's `I2C1->CR2 = ...` is
commented *"use `=` to ensure all other bits are cleared"*, which is Day 8's
moral, and Day 10's HT16K33 command bytes are a bit-field derivation like Day
9's EXTICR. Get those right by checking the chapter that taught them, not from
memory.

## What is decided, so you do not re-litigate it

- **Day 13 moves** (above).
- **`SevenSeg_write()` takes `uint8_t *`** over `uint8_t[2*HT16K33_NBUF]`, per
  the deck and Petra's own solution — **not** Lab 5 §3.3's `uint16_t *` over
  `HT16K33_NBUF`. The lab handout is stale and is on the flag list; the
  chapter says nothing about it.
- **The rebalance.** The plan moves the "ping the display and capture it on the
  AD2" block from old Day 10 (slides 14–30) back to Day 9x. This is the largest
  divergence from the old decks in the week. It gives Day 9x a crucial step it
  otherwise lacks — the old 9x deck has *nothing* for students to do — and gives
  Day 10 a full hour for the driver that Lab 5 is built on. Gate 1 endorsed it
  and named its cost: Day 10 now depends on the display staying wired between
  class days, which Day 10's Part 2 pays for with a three-minute verification
  beat. Keep that beat; it is not optional.
- **`main()` returns `return 1;`** per B-14, even though the Day 10 deck writes
  `return 0;`. Same call as Day 9. On the flag list.
- **`uart2_init()`**, never `uart2_rxtx_init()` — the latter appears on deck
  slide 55 and nowhere else in the course.

## Gaps you cannot close yourself

- **`SevenSegPartial.h` is not in the repo.** The `HT16K33_*` `#define`
  *values* and `numbertable[]` cannot be quoted (B-6). The plan turns this into
  an advantage — Day 10 Part 4 has students *derive* the command bytes from the
  datasheet — but the chapter must not print the header block. Ask, don't
  reconstruct.
- **`ES28.h` and `stm32c031xx.h` are still absent** (open since Day 8). Names
  are used and never quoted, which is sufficient. Do not invent values.
- **`i2c1_memWrite()`'s body appears in no deck.** Students are given the
  library and only ever call it. Do not pretend to show it. (`i2c1_memRead()`'s
  body *is* recoverable, on Day 13 slides 12 and 17, if you need the shape.)
- **Day 9x is the week's first power wiring** and nothing verified is known
  about swapping +V and GND on the display breakout. The plan's safety slide
  says only what is checkable until Petra answers flag 8.

## The process

Follow `CHAPTER_PROCESS.md` Steps 3 → 4 → 5 → 5b → Gate 2, for the whole
chapter (both days together — it is one file).

**Step 1 is partly done.** Sixteen annotated figures are already rebuilt and
committed under `assets/images/Day09X-I2C/` and `assets/images/Day10-I2C(2)/`
— including the scope captures with Petra's SCL/SDA/Start/Ack callouts, the
`I2C_CR2` register with each library-written field boxed in its own colour, and
the firmware-layers diagram with all four layer labels. **Look at every one
before you caption it.** On Day 9 this caught three figures composited from the
wrong picture, and one that had 13 stray shapes from an unrelated diagram
layered over it. Technique that works: extract the embedded base bitmap from
the SVG and read it as an image, and separately list the SVG's `<text>`
elements to see what is drawn on top. `scripts/pptx_annotate.py --list` shows
what is on a slide before you composite.

**Step 5b is not optional.** Any fix to prose must be checked against the
`<slide>` blocks that condense it, *and* against the deck's glue slides —
Day 9's recap glue slide carried a claim the chapter had already corrected.

## Traps that have actually bitten, in this book

- **An activity ref strips its code.** `assets/class.html` removes
  `pre.program` from any deck ref resolving to an `<activity>`. A code activity
  you want projected *with* its code must be a self-contained `<slide>`.
- **Check the fit, with the current check** (`AUTHORING-slides.md`). It catches
  suspended layout, image-dominant slides, and code clipped *inside* a `<pre>`,
  which scrolls within itself and reports no overflow. **Wait ~300 ms after
  setting `location.hash`** or it reports phantom overflows — that false
  positive was added to the docs after Day 9.
- **`qlmanage -t` lies about SVGs.** It renders onto a square canvas at native
  scale and clips wide figures, reporting damage that is not there. Check the
  built page, or the content bounding box against the viewBox.
- **The book has four build targets in four directories.** `./scripts/build-all.sh`
  rebuilds them all; `check_deck.py` resolves refs against `output/web-deck`,
  so build before running it.
- **`room="compressed"`** tightens prose spacing, not code.
- **Never invent code, register detail, or classroom facts** (B-6, B-11c).
  There are no lab benches — students carry portable kits and work on laptops.

## Before every commit

```bash
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

`git status` first — Petra edits these repos while you work. Commit only files
you changed, never `git checkout` a directory to tidy up, and never revert a
change you did not make. Commit per meaningful unit, with a message that says
*why*.

New starter files to write and register in `check_starters.py`'s `STARTERS`
list: `pingDisplay.c`, `writeFirstDigit.c`, `SevenSegPartial.c`. All are
recovered complete or near-complete in ground truth §1. Remember B-13 — the
handout carries fuller commentary than the book; the *code* must match line for
line, which is what the checker enforces.

## Gate 2 panel for this chapter

Standing core of 7, plus rotators the chapter's character calls for. Day 9's
useful rotators were `learner-arduino-veteran` (this chapter replaces
`Wire.h` and `Adafruit_LEDBackpack.h` — the plan already has beats for both),
`expert-embedded-industry` (datasheet fluency; this chapter has three named
lookups), and `learner-ai-reliant` (a codeable deliverable). Consider
`learner-weak-circuits` too — unlike Day 9, this chapter asks students to wire
something new and to read a scope trace.

Write every report to `reviews/day9x-day10-gate2.md` **before** running
`committee-synthesizer`; it reads that file and cannot consolidate reports that
exist only in a transcript. Give the visual reviewer rendered figures, not
paths.

## Open flags for Petra

Carried from `plans/week5.md`; check that list for the current state before
adding to it. The ones that touch this chapter:

- **[CONFIRM]** Day 9x's +V/GND safety statement (flag 8) — blocks one slide.
- **[LAB 5]** §3.3's `SevenSeg_write()` prototype is stale; the PDF is outside
  this repo and needs her hands (flag 3).
- **[FILES]** `SevenSegPartial.h`, `ES28.h` (flag 4).
- **[MINOR]** `return 0;` → `return 1;` (flags 6 and 13), and
  `uart2_rxtx_init()` → `uart2_init()` (flag 12).

## State of the repo at handover

`ch-gpio-interrupts.ptx` is through Gate 2 and awaiting Petra only.
`assets/decks/day9.json` is 55 slides, 40 refs, 4 instructor-only; all 55 fit
at 1280×720 in both views. All four checks pass across the whole book. HEAD is
`db17479`.
