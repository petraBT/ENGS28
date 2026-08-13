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
2. **Run the two early reviewers** — see the schedule below. They inform the
   rework rather than judging it, so they come before you edit, not after.
3. Apply what is live — `SevenSeg` naming first, it costs students Lab 5.
4. Redesign the two AI activities. `learner-ai-reliant` has falsified this same
   design **three times now** (Day 9, Day 9x, Day 10); the fix is to anchor a
   task to something only the student's own board can supply.
5. Clear the rewrite scars, in one commit.
6. Voice sweep against Day 9x — S-20 (no weekday as actor) and S-21 (no
   "N, and it is the one that…") are new since the last pass and have never been
   run over Day 10.
7. Re-time the day, then **Gate 2**, then Petra.

## The committee: roster and schedule

Day 10 is the first unit the rebuilt committee gets to prove itself on. The
roster and the cost table are in `.claude/agents/README.md`; this is what is
specific to this day.

**Do not run the full committee on the file as it stands.** It would spend its
budget rediscovering a change list you already have. Split it around the rework.

### Before you edit — two reviewers, because they inform the work

| Run | On | Why now |
| --- | --- | --- |
| `checker-voice` | **one Part only** (Gate 1.5) | If the register is wrong it is wrong in all fourteen parts. Find that out before you sweep them, not after. |
| `learner-in-the-room` | the whole deck | Its slide walk tells you which slides to merge or cut *while* you are in there — and the Arduino cut just removed four, so the deck has holes to close. |

`checker-voice` is the highest-yield single run in the day. Day 10 is the only
unswept part of `ch-i2c.ptx`: Day 9x went through Petra's hand and a full sweep
on 2026-08-08 and Day 10 did not, so this is exactly the half-hers split the
agent exists to find — with the sibling sitting in the same file as the
reference.

### After the rework — Gate 2

Standing core of 10, plus these rotators, chosen for this day:

```
expert-rigor-hawk         I2C_TIMINGR, PRESC, pull-up values, clock arithmetic
learner-ai-reliant        NOT optional -- it has falsified this design 3 weeks running
learner-weak-circuits     open-drain is the one genuinely new circuit idea
expert-embedded-industry  datasheets and register contracts -- weight DOWN per B-11e
```

**Scoping is not optional here.** Day 10 is 2,216 lines against Day 9x's 1,028,
and `checker-technical-accuracy` cost ~115k tokens on a *scoped* Day 9x section.
Run it per `Part N`. One exception: give its **B3 self-contradiction read the
whole chapter** — Day 9x, the Before Class reading and Day 10 together. That is
where this chapter's contradictions have actually lived; it already shipped one
across the day boundary ("a powered display lights up" against "an uninitialized
HT16K33 drives nothing").

Give `checker-figure-claims` the rendered figures. Two reasons it matters more
than usual this time: the figures moved days along with their parts, and the
player's figure rendering changed on 2026-08-08 — every slide figure now scales
to its box instead of being cropped, so what projects is genuinely different
from what anyone last looked at.

### Two things to distrust

**The old review's load findings, not its facts.** Its Part 6 verdict —
"eight-plus new named things in explain-only mode, budgeted 7 minutes, 8 slides,
under a minute per slide" — was computed against the 50-minute day. On 110
minutes it may be fine. Re-judge it; do not apply it.

**`expert-cognitive-load`'s repetition census is the weakest-validated agent in
the committee**, and the reason is that it was regression-tested against *this
chapter's own instances*, which its brief names as its calibration example — so
that run tested recall as much as detection. Day 10 is material the brief does
not describe, which makes this the clean re-test the suite needs. Treat its
output as a finding **and** as a test of the agent: if the census comes back
thin, that is information about the agent, not a verdict on Day 10. Record which
it was in `reviews/day10-gate2.md`, and update the regression table in
`.claude/agents/README.md` either way.

Write every reviewer's report to `reviews/day10-gate2.md` before running
`committee-synthesizer` — it reads that file and will refuse to invent reports
that exist only in a transcript.

## Open questions for her — do not guess

- Is `SevenSegPartial.c`/`.h` renamed to `SevenSeg.c`/`.h` by the student, or
  supplied under both names? The chapter needs one answer and currently has none.
- Day 10's 110 minutes: after the Arduino cut, is there room for the Part 6
  register work to slow down, or should some move to Reference?
- **Thursday vs tomorrow** is still undecided across the whole chapter — 12
  student-facing "Thursday" against 7 "tomorrow" in `ch-i2c.ptx`, while the decks
  say "tomorrow" throughout. One pass either way, but it is her call.
