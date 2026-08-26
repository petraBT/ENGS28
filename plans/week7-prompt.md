# Week 7 — session prompt (Days 13, 13x, 14: the accelerometer)

Paste this into a fresh session in `~/repos/ENGS28`. It is the prompt for
**session 1 of four**. One session cannot design three days — Week 6 proved it —
so this session builds the week's arc and the three lesson plans, gets them
through Gate 1 **once, together**, and writes the prompt for each build session.
It writes no book prose and no slides.

Read first, in this order:

1. `CLAUDE.md` — orientation, hardware facts, the review-comments workflow.
2. `plans/CHAPTER-GENERATION-PROMPT.md` — the gates. Its "Continuing or
   reworking an existing unit" section applies: `ch-accelerometers.ptx` exists
   (447 lines, **rough** — assume nothing in it is correct until checked
   against ground truth).
3. `CHAPTER_PROCESS.md` — the workflow, and "What Day 11 taught us".
4. `plans/day12-redo-prompt.md` — **the most expensive lesson of Week 6**, read
   it even though it is about another day. Its final section ("A committee
   change list needs a length budget") governs every gate this week.
5. `plans/week5-map.md` and `plans/week5.md` — the precedent for a week-level
   arc document. Week 7 gets the same pair.

---

## Why the process below looks the way it does — Week 6's bill

Week 6 (Days 11, 11x, 12) took five of Petra's review rounds, ~60 slide
comments, one full prose rewrite, and more of her time than any unit so far.
The post-mortem, so this week does not repeat it:

- **The pilot ordering worked; keep it.** Slides/skeleton first, her pass, then
  prose written *from the slides she passed*. On Day 11x, zero of her round-1
  notes said "this isn't how I teach this hour" — the arc was right before any
  prose existed. That ordering is now the default for every build session below.
- **The committee inflated the prose past her register.** Day 12's Gate 3′
  reviewers were each individually right, and together produced 42 body
  paragraphs where the passed sibling day has 24, plus a 209-word caption. She
  stopped reading at Part 2: *"The style in this in-class section is entirely
  different from other chapters."* Every gate this week gets the length-budget
  briefing: a fix that adds words must say what it displaces, and the section is
  measured against a **passed** day's paragraph count before the list is applied.
- **Her language keeps failing, and the fix is reuse, not imitation.** The
  wording that survives her review is wording that was already hers: mined from
  her decks' slide text and speaker notes (P-12), or edited by her hand in a
  previous pass. Write from her sentences; do not paraphrase them into something
  "cleaner". Her register rules earned this week are in `AUTHORING-book.md` —
  note especially **L-13** (a document does not act on a student), **L-14** (say
  Reference Manual when the section is RM0490's), no cutesy language (*"We are
  talking with adults. Don't infantilize them"* — her words, Day 12), and never
  telling students what a day does *not* involve.
- **The voice reference is the nearest passed prose, not just the frozen
  specimens.** For this chapter: Day 11's passed prose, then Day 12's
  post-redo prose, then the three frozen hand passes.
- **She edits the repo while you work.** `git status` before every commit; her
  wording wins over any reviewer's and over anything in this file.

## The week, as her decks teach it

Three decks: `assets/ClassSlidesOLD/Day13-I2C(3).pptx` (32 slides),
`Day13x-Accelerometer.pptx` (19), `Day14-Accelerometer(2).pptx` (21). The
sensor is the **LSM303AGR** on a STEMMA breakout — *not* the LIS3DH
(`assets/datasheets/lis3dh.pdf` is Day 5X worksheet material; do not cite it
for this week).

Her arc, off the slide titles — **verify by mining, do not trust this table**:

| | Day 13 (Tue, **110 min**) | Day 13x (Wed, **50 min**) | Day 14 (Thu, **110 min**) |
|---|---|---|---|
| Core | The LSM303AGR as an I2C device: wiring, `whoami_test.c`, AD2 logic-analyzer debugging, start of the device driver | What a MEMS accelerometer *is*: proof mass, capacitive sensing, applications; register settings; the 16-bit left-justified two's-complement data format | Complete and test the driver; plot accelerations; **tilt** — the trig, and floating point; hand off to Lab 7 |
| Inherits | Day 9x/10 (I2C, the driver pattern, `i2c.c`) | Day 13 | Day 13x, and Day 10's driver discipline |
| Pre-class reading | yes | **none — x-day** | yes (expected; confirm at Gate 0) |

Note the ordering is hers and is deliberate: the class *uses* the device on
Tuesday and only learns *how it works inside* on Wednesday. A topic-logical
rewrite that puts the MEMS physics first is exactly the arc destruction
`checker-arc-fidelity` exists to catch. Day 13's deck is titled "I2C(3)"
because it is the third I2C day — it lives in `ch-accelerometers.ptx` by
Petra's explicit call (see the chapter status table).

## Session 1 — what this session does

**Step 0, for all three days at once.** Ground truth into
`plans/week7-ground-truth.md`:

- Mine all three decks (`pptx_mine.py`, `--max-text 200`; check `--list` for
  dropped annotation text). Speaker notes are the richest source. Watch for the
  known reuse traps: **Williams citations** (drop, course no longer cites it)
  and **Arduino/Scopy references** (drop entirely, B-11e).
- **The driver code.** No accelerometer starter exists in `assets/starters/`
  — `whoami_test.c`, `accel_test.c`, `lsm303agr.h` and the driver prototypes
  live as text on her code slides. Mine them, but **never reconstruct a driver
  from memory (B-6)**: what the slides don't carry verbatim goes on the
  questions list for Petra as a request for the real files.
- **Lab 7** (`assets/Labs/Lab7_ES28.pdf`) — the downstream constraint. It names
  LSM303A\* explicitly. The lab is a constraint, not the goal (P-13).
- **The datasheet.** `assets/datasheets/` has **no LSM303AGR datasheet** — ask
  Petra for the PDF (the P-11 datasheet moments this week need it: WHO_AM_I,
  CTRL registers, the data format). Also ask which I2C address and which
  breakout (her slide 8 says STEMMA).
- Continuity: what Days 9x/10 already taught (I2C transactions, `i2c.c`, the
  driver-layers figure — Day 13's slide 27 reuses it), what Day 7 taught that
  Day 14's plotting assumes, and the deferred-topics list in
  `CHAPTER_PROCESS.md`.
- Flag for Gate 1: Day 14 slide 3 is an "In-class HiTA Activity" (water-bottle
  filling station) — ask Petra what this is and whether it stays. Day 14
  slide 20 is **floating point** — the course rule is L-2 (no `%f`; Lab 4
  Appendix A enables it); tilt needs real arithmetic, so decide deliberately
  where the caveat is taught and mark it `check-rules: allow L-2`.

**Then ask Petra the questions as one short list** (files, datasheet, HiTA,
anything B-11c that plausibility cannot recover) and keep working on what does
not depend on the answers.

**Step 2, at week level.** Write `plans/week7.md` — the arc: what each day
owes the next, the crucial step and stretch of each, the hand-offs to Lab 7 —
plus one-page `plans/day13.md`, `plans/day13x.md`, `plans/day14.md` with honest
per-Part time budgets (110/50/110; `check_deck.py` now reconciles a Part's
budget against its own beats, so budget in beats from the start).

**Gate 1, once, over the whole week.** `checker-arc-fidelity` first, against
all three decks; then `expert-active-learning, expert-cognitive-load,
expert-continuity-auditor, expert-class-logistics, learner-firstgen-novice,
learner-anxious-nonhardware`, with `expert-rigor-hawk` for the data-format and
trig material and `learner-python-intro` for two's complement and the float
question. Brief every reviewer with the length budget rule. Bring to the gate
explicitly: the reading split (what goes in Day 13's and Day 14's pre-class
readings vs. in class), where the driver-writing work lands across 13/14, and
the L-2 floating-point decision.

**Apply the list, then write the three build prompts** —
`plans/day13-prompt.md`, `plans/day13x-prompt.md`, `plans/day14-prompt.md` —
each in the shape of `plans/day12-prompt.md` (the best of Week 6's prompts):
what to read, what is already decided, the pilot ordering (reading if the day
has one → in-class skeleton with activities and instructor answers → `<slide>`
blocks + deck JSON → Gate 2′ over all of it → **stop for Petra's pass**), the
day's open questions, and the standing traps. The prose of each day is written
only after her pass, from the slides she passed, against the paragraph-count
budget of the nearest passed day — and Gate 3′ runs with the length briefing.

**Commit and push at each milestone.** End by updating the chapter status row
in `CHAPTER_PROCESS.md` and writing `plans/week7-handover.md` saying exactly
where things stand and which session runs next.

## Sessions 2–4 (for orientation; each gets its own prompt from session 1)

- **Session 2**: build Day 13 (reading + skeleton + deck, Gate 2′, stop).
- **Session 3**: build Day 13x (no reading — x-day; skeleton + deck, Gate 2′,
  stop). May also carry Day 13's prose if Petra's pass has come back.
- **Session 4**: build Day 14, same shape; then the chapter's Reference-section
  decision (the sibling-chapter shape is B-10; `ch-i2c.ptx`'s
  `sec-i2c-reference` is the model — and the data-format/trig depth the
  committee will want to add to prose belongs *there*, which is the Day 12
  lesson applied in advance).
- Prose for any day follows that day's pass, possibly folded into the next
  session, exactly as Day 12 did it — including `<!-- DELIVERY 2: prose. -->`
  markers that **name what the prose owes** (now a rule in
  `AUTHORING-book.md`).

## Standing traps — every one of these cost something in Week 6

- Class lengths: Day 13 **Tue 110**, Day 13x **Wed x-hour 50**, Day 14 **Thu
  110** (the day-parity rule; the 65-minute error has been made three times).
- x-days have **no pre-class reading**.
- **Stop the preview servers before `./scripts/build-all.sh`** (a running
  `http.server` holds `output/`), restart them after, and **never kill the
  review server on :8928** — it is a child of `preview-slides.sh`, so kill the
  8352/8931/8932 listeners by PID, not by script name.
- Fit-measure at 1600×900, crossfade killed, ~900 ms settle, **without
  `?notes`** (presenter notes measure as body and report false overflow).
- Before every commit: `build-all`, `check_rules.py --quiet`, `check_deck.py`,
  `check_starters.py` — and `git status` first, because Petra edits while you
  work.
- Read `AUTHORING-visual.md` before laying out any slide with a figure,
  formula, or table. Declared column widths on slide tables: every column or
  none, summing to 100%.
- Units in prose are Unicode (µs, kΩ); American spelling (L-7); "on Day N".
- The AD2's channels are **orange (CH1) and blue (CH2)** — Day 13's logic-
  analyzer work will tempt "yellow". There are no benches; students carry kits.
- If a review comment seems missing from the queue, her browser buffers
  comments while :8928 is down — bring the server up and have her reload.
