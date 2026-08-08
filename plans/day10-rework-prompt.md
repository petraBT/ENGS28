# Handover: finish Day 10 (I2C, the display driver)

Paste everything below the line into a fresh session in `~/repos/ENGS28`.

This is a **continuation**, not a new chapter. Read
`plans/CHAPTER-GENERATION-PROMPT.md` first — all of it, and its
*"Continuing or reworking an existing unit"* section especially. This file is
only what that prompt cannot know: the state Day 10 is actually in.

---

You are finishing **Day 10** of ENGS 28 — I2C and the seven-segment display
driver. It is `<section xml:id="sec-i2c-day10">` in `source/ch-i2c.ptx`, lines
~1495–3600, with `assets/decks/day10.json` (67 slides, 14 part dividers).

**Follow `plans/CHAPTER-GENERATION-PROMPT.md`.** Everything below assumes it.

## Do not start clean

Day 10 is not a chapter. It is a section of `ch-i2c.ptx`, sharing the Reference
section, the figures and the voice of Day 9x. The committee praised specific
things in it — the four lookups students genuinely *derive* (PRESC, the AF6 pin,
the command bytes), the honesty about `i2c1_byteWrite()`'s NACKF hole, and Part
7's layering argument. Ground truth is already collected **and verified** in
`plans/week5-ground-truth.md` and `plans/week5-revision-9x-10.md`.

**Day 9x, in the same file, is your voice reference**, ahead of the frozen
specimens. It has been through Petra's hand and a full sweep as of 2026-08-08.
Read `sec-i2c-day9x` before writing a sentence of Day 10.

## The committee report is stale — but its findings are not

`reviews/day9x-day10-gate2.md` was written **5 Aug**. Commit `1621633` (**6 Aug**)
moved open-drain, `I2C_TIMINGR`, the five library operations and
`i2c1_byteWrite()` out of Day 9x and into Day 10 as Parts 6a/6b/7a/7b.

So: **every load, timing and sequencing finding in that review was computed
against a 50-minute day and does not carry to a 110-minute one.** Its *factual*
findings do. Go through it and mark each finding live / fixed / void before
doing anything else. Verified status as of 2026-08-08:

| Finding | Status |
| --- | --- |
| BLOCKER — `Wire.h` mapping contradicts the chapter's own hang | **void** — the Arduino material was cut on 8 Aug, so there is nothing left to contradict |
| BLOCKER — `act-i2c-ai-review` is the AI design `learner-ai-reliant` already falsified twice | **LIVE**, and so is `act-i2c-five-operations` |
| MAJOR — `SevenSeg.c` vs `SevenSegPartial.c` | **LIVE** — 5 mentions against 13, and no sentence tells the student to rename or move anything, so they end the day without the file Lab 5 wants. Highest-value fix in the day |
| MAJOR — open-drain has no figure | **fixed** — `fig-open-drain` exists |
| MAJOR — the pull-up value is asserted, not explained | check; the range argument was partly written |
| MAJOR — Part 6 is eight-plus new things in explain-only mode | **re-judge**, do not apply — it was a 7-minute budget on the short day |

## Rewrite scars to clear

Invisible to every linter, and all from the 6 Aug move:

- Four Day 10 subsections still carry **Day 9x ids**: `subsec-day9x-pins`,
  `subsec-day9x-timingr`, `subsec-day9x-library`, `subsec-day9x-bytewrite`.
  Fourteen deck entries key their `page` field to those four filenames. Renaming
  is a coordinated change across `source/ch-i2c.ptx`, `assets/decks/day10.json`
  and any `xref` to them — `check_deck.py` and `check_rules.py` will both catch a
  half-done job, so do it in one commit and run them.
- The Part 1 presenter note budgets **111 minutes** against a structure that has
  since lost four slides to the Arduino cut. Re-time the day; the note says so.
- Slide ids beginning `sl-day9x-` inside Day 10, same cause.

## What was already done on 8 Aug — do not redo

- **The Arduino material is cut** (B-11e says cut, not compress). Three prose
  passages and four slides. What survives is deliberate: every *"Arduino header"*
  and *"Arduino-standard I2C pins"* (the connector's name — Petra's own hand pass
  added it), and **one clause** in Part 8a naming `Adafruit_LEDBackpack.h` over
  `Wire`. Do not add more, and do not remove those.
- Day 9x's prose and slides are swept and in her voice. Day 10 is not.
- The player now scales slide figures to their box instead of cropping them, and
  applies `<col width>` on slide tables. Both are fixed in `assets/class.html`;
  the old "silently cropped figure" trap is gone from `AUTHORING-slides.md`.

## The order I would work in

1. Mark the old review live / fixed / void, as above.
2. Apply what is live — `SevenSeg` naming first, it costs students Lab 5.
3. Redesign the two AI activities. `learner-ai-reliant` has falsified this same
   design **three times now** (Day 9, Day 9x, Day 10); the fix is to anchor a
   task to something only the student's own board can supply.
4. Clear the rewrite scars, in one commit.
5. Voice sweep against Day 9x — S-20 (no weekday as actor) and S-21 (no
   "N, and it is the one that…") are new since the last pass and have never been
   run over Day 10.
6. Re-time the day, then Gate 2 with the standing core, then Petra.

## Open questions for her — do not guess

- Is `SevenSegPartial.c`/`.h` renamed to `SevenSeg.c`/`.h` by the student, or
  supplied under both names? The chapter needs one answer and currently has none.
- Day 10's 110 minutes: after the Arduino cut, is there room for the Part 6
  register work to slow down, or should some move to Reference?
- **Thursday vs tomorrow** is still undecided across the whole chapter — 12
  student-facing "Thursday" against 7 "tomorrow" in `ch-i2c.ptx`, while the decks
  say "tomorrow" throughout. One pass either way, but it is her call.
