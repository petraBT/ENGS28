# Day 12 — session prompt

Read `plans/CHAPTER-GENERATION-PROMPT.md` first — in particular its section
**"Continuing or reworking an existing unit"**, because that section governs this
day: `source/ch-motors.ptx` already holds Day 11 (done, passed) and Day 11x (Gate
3 applied, awaiting Petra's pass 2). Then read this file.

---

## The ordering for this session — a deliberate hybrid, not the standard flow

Petra's instruction: build the lesson plan, run it through committee, and come out
with **the pre-class reading (if it's needed) and the slides**. **Do not write the
in-class connecting prose yet** — she wants to review the slide skeleton first,
the same way Day 11x's pilot ordering worked, before the paragraphs that expand it
get written. So:

1. Step 0 (ground truth) → Step 1 (mine) → Step 2 (`plans/day12.md` + outline) →
   **Gate 1**.
2. **Before Class reading** (if Gate 0/1 confirm one is needed — see below):
   write it in full prose, as normal Step 3 work. It is not part of "the
   in-class portion" she is deferring.
3. **In-class skeleton only**: subsections, figures, `<activity>` blocks with
   their `<instructor>` answers, **no connecting prose between them**.
4. **`<slide>` blocks + `assets/decks/day12.json`**, condensing the skeleton —
   built now, alongside the skeleton, not after a book pass (this is the Day
   11x pilot move: Steps 3′/4′ in `CHAPTER_PROCESS.md`).
5. **Gate 1.5** on the reading's first subsection, as soon as it exists.
   **Gate 2′**: the book core + the slide-facing panel together, reviewing the
   reading, the skeleton, and the slides as one draft.
6. Apply the list. **Stop here.** Petra reviews the reading and the slides.
7. The in-class connecting prose, and the chapter's end-of-chapter Reference
   section, are a **follow-up session** — see the last section of this file for
   what to hand off.

This means Gate 3 (the deck committee) does **not** run in this session — there
is no passed prose yet for a deck to be checked against. What runs here is Gate
2′ over the reading + skeleton + slides together, mirroring Day 11x's Gate 2′.

## Step 0 — ground truth: mostly already written, verify rather than re-collect

Per the continuation rule, **read before re-deriving**:

- `plans/day11x-ground-truth.md` — read in full, especially §3 (RM citations),
  §7 (the scoping decision that moved her *old* Day 11x deck's slides 20–21 to
  Day 12), §8 (Lab 6, already read once) and §9 (open questions to Petra).
- `plans/day11x-handover.md` — the "Still open with her, not blocking" section
  lists three items that touch Day 12 territory; carry them forward rather than
  re-discovering them (see "Open questions" below).
- `source/ch-motors.ptx`, lines ~2175–2264 (`subsec-day11x-resolution` through
  the end-of-chapter comment). **Read this whole block before anything else** —
  it is Day 11x's own hand-off to this day, written by the previous session
  specifically so this one would not have to re-derive the split:

  > *"Day 12 continues motor speed sensing (counting the photointerrupter's
  > pulses, converting to rpm, the seven-segment display and the potentiometer
  > as a throttle) and the full Lab 6 build. Her Day 11x slides 20 and 21 (the
  > table discussion, and decoding shaft position, dtheta = 2\*pi/#slots) were
  > moved here whole at Day 11x's Gate 1... REQUIRED at Day 12's Gate 0: Lab 6
  > p.5 says students derive RPM = 60 x PPS / 20 'in the reading quiz'. Day 11x
  > has no pre-class reading, so that derivation has to live in Day 12's Before
  > Class section or it is stranded."*

  That comment is load-bearing: it settles (a) that a pre-class reading **is**
  needed this day (Petra's "if any" is answered — yes, because the RPM
  derivation has nowhere else to live and Lab 6 calls it a reading-quiz item),
  and (b) the topics list for Day 12: pulse counting, the PPS→RPM conversion,
  the seven-segment RPM display, and the potentiometer-as-throttle.

- `assets/starters/TTmotor_ramp.c` — already fully mined for Day 11x; it is
  PWM-only and has no pulse-counting/RPM/ADC code, so **there is no existing
  driver file for this day's new material** (the pulse counter, the RPM
  conversion, the potentiometer read, the display write). Check whether Petra
  has since added one (e.g. a `tb6612.c`/`.h` or an RPM-related starter) before
  assuming it's greenfield — grep `assets/starters/` fresh rather than trusting
  this file's memory of it.
- `assets/Labs/Lab6_ES28.pdf` — read again with an eye specifically on §2.2
  (potentiometer), §2.5 (RPM indicator, the pullup requirement, the
  `milliseconds()`-timed one-second counting window), and §3 (the seven-segment
  RPM display, positive and negative). Lab 6 never mandates interrupts for pulse
  detection — it says "detect pulses... count them for one second... use
  `milliseconds()`" — which reads as compatible with a polling loop, the same
  idiom the course already uses for 100 Hz ADC sampling. **This is a real design
  decision Day 12 has to make and teach, not one Lab 6 answers for you**: does
  this day build on Day 9's GPIO interrupts (`ch-gpio-interrupts.ptx`) for
  edge-triggered pulse counting, or teach a polling loop, or leave the choice to
  the student the way her old deck's slide 9 poses it as an open discussion
  question ("how do you detect the pulses on the microcontroller?")? Decide this
  at Gate 1 and record the reasoning — it is exactly the kind of scoping call
  `checker-arc-fidelity` and `expert-continuity-auditor` should weigh in on,
  since an interrupt-based answer is a continuity payoff from Day 9 and a
  polling answer is a continuity payoff from Day 7/the ADC chapter.

**Verify, do not carry over unverified:**

- Her `Day12-Motors(3).pptx` slide 10 says "wire photointerrupter OUT to PA15."
  No driver file or ground-truth document in this repo confirms PA15 for this
  course's wiring. **Do not write this pin into any book prose or figure until
  it is verified** against a real driver file or against Petra (B-6, B-11c) —
  treat it exactly like the Day 5X datasheet-worksheet parts list that turned
  out to be invented.
- Her deck's slide 6 speaker notes say "Arduino" three times and "Scopy" once —
  both stale (this course uses the Nucleo/STM32C031C6 and Waveforms, never
  either of those; B-11e says cut Arduino comparisons entirely, not soften
  them). Mine that note only for the *teaching* (a pullup is needed because the
  phototransistor sources no current; scope the signal before wiring it to the
  MCU) and drop every Arduino/Scopy word.

## Step 1 — mine both of her decks, not just one

Two source decks feed Day 12, and neither alone has the whole day:

1. **`assets/ClassSlidesOLD/Day12-Motors(3).pptx`** (10 slides) — the review
   discussion of `TTmotor_ramp.c`, the photointerrupter wiring and its scope
   trace, the "on paper" RPM-conversion exercise, and the full Lab 6 hardware/
   firmware checklist. Thin (this deck alone is maybe 30–40 minutes of taught
   content against a 110-minute Thursday) — **that is expected, not a defect**:
   Petra has said students get substantial independent lab-build time this day
   (wiring the pot, the regulator, the driver, the RPM code, the display), so
   budget the Part-by-part time honestly with real open build/lab time as one
   of the Parts, the way a chapter names its crucial step and still leaves room
   (P-2/P-3), rather than padding the taught arc to fill 110 minutes.
2. **`assets/ClassSlidesOLD/Day11x-Motors(2).pptx`, slides 20–21** — the table
   discussion (detect pulses → count them → convert to rpm → can you get
   direction from them?) and the shaft-position decoding arithmetic, Δθ = 2π /
   #slots. These were explicitly moved to Day 12 at Day 11x's Gate 1 (see the
   ground-truth §7 excerpt above) — mine them from *that* deck, not Day 12's own
   (Day 12's own deck poses the same discussion as "Exercise #2" without the
   Δθ arithmetic, which only exists in the Day 11x deck's slides).

Rebuild any figure worth keeping with `pptx_annotate.py` (P-12) and record every
image from both source decks in `plans/day12-ground-truth.md` §6, the same figure
manifest format Day 11x used — a figure not in the manifest has not been
considered.

## Step 2 — the outline, and the Reference-section decision

Write `plans/day12.md`: class length (**Day 12 is even, so Thursday, 110
minutes** — `CLAUDE.md`'s day-parity rule, not the 65-minute error made three
times already this course), the coverage table against both mined decks, the
crucial step, the stretch, Part 1..k with honest time budgets that include the
open lab-build time as a named Part rather than silent slack, the datasheet
moment (there almost certainly is one — the photointerrupter/encoder wheel
datasheet, or the RM0490 GPIO/EXTI section if the interrupt route is chosen), and
the hand-offs (to Lab 6, and to whatever accelerometer/servo chapters come next).

**Decide the chapter's `Reference:` section here, and record the decision — you
do not have to write the section this session.** `ch-motors.ptx` has none yet; a
comment in the source (line ~2248) explicitly defers it to "a separate session,"
and this is that decision point. Three sibling chapters show the shape it should
take (B-10): `ch-i2c.ptx`'s `sec-i2c-reference`, `ch-adc.ptx`'s
`sec-adc-reference`, `ch-timers-interrupts.ptx`'s `sec-timers-reference` — each
opens with an explicit "nothing here is new" framing sentence, then reorganizes
already-taught facts into lookup form (a register table, a datasheet-lookup
table). Candidates for this chapter, once Day 12 is written: a TIM14 PWM
register table (material is already taught across Day 11/11x, so this could be
written now if you want, independent of Day 12's own content), a TB6612/H-bridge
truth-table reference (Day 11), and possibly a pulse-rate/RPM reference
subsection once Day 12's own content is locked. If you decide to defer writing it
entirely, say so in `plans/day12.md` and hand it to the follow-up session
explicitly — do not let it go silently missing the way Day 11's motor equations
did (B-8a).

## Gate 1

Standard panel: `checker-arc-fidelity` first (it is the reviewer that can see a
*hole* — what she taught that is not in the draft — which is exactly how Day 11
lost four slides' worth of content for four gates), then
`expert-active-learning, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-firstgen-novice, learner-anxious-nonhardware`.
Add `expert-rigor-hawk` as a rotator given the RPM math and PWM-resolution
callback, and `learner-weak-circuits` given Lab 6's regulator/pullup wiring is
now squarely in scope.

Bring to Gate 1 explicitly, for it to weigh in on rather than have decided for
it:

- the polling-vs-interrupt pulse-counting decision (above);
- how much of the 110 minutes is taught arc vs. open lab-build time;
- whether the seven-segment RPM display is retaught from scratch or handed off
  as "you already have this driver, apply it here" (continuity from
  `ch-i2c.ptx`'s `HT16K33 Quick Reference` — likely the latter, but say so and
  cite the reference material rather than silently assuming it).

## Gate 2′ — reviews the reading, the skeleton, and the slides together

Standing Gate 2 core, plus the Gate 3 deck-facing reviewers early since there is
a deck in this draft: `checker-arc-fidelity, checker-technical-accuracy,
checker-voice, checker-figure-claims, expert-cognitive-load,
expert-continuity-auditor, expert-class-logistics, learner-visual,
learner-firstgen-novice, learner-anxious-nonhardware, learner-in-the-room` +
`committee-synthesizer`. `checker-technical-accuracy` should check the PA15 claim
and the polling/interrupt code against whatever driver exists, not against the
old deck.

## Open questions to carry into this session, not re-discover

From `plans/day11x-handover.md`, "Still open with her, not blocking" — none of
these block Day 12, but the driver-filename one is worth resolving before Day
12 writes sixteen more references to the same file:

1. **`TTmotor_ramp.c` vs `TTMotor_Ramp.c`.** She wrote it capitalized twice in
   review; the book and `check_starters.py` use the lowercase form, which
   matches the actual file on disk. Ask before Day 12 adds more references.
2. Confirm the "30 → 180 rpm" claim in `fig-photointerrupter-video`'s caption —
   still unverified (a video renders black in a still).
3. The commented-out 50 Hz `#define` pair in `TTmotor_ramp.c` may have a bug
   (`PSC_FACTOR 12` where the comment says `120`, giving 500 Hz not 50 Hz) —
   relevant now because Lab 6's optional "Going Further" section is exactly the
   50 Hz exercise. Low priority; do not block on it, but flag it again if it is
   still unresolved when you read `TTmotor_ramp.c`.

## Standing reminders

- Her wording wins over any reviewer's and over anything in this file.
- **Stop the preview servers before `build-all`** — a running `http.server`
  holds `output/` and the build fails.
- Read `AUTHORING-visual.md` before laying out any slide with a figure,
  formula, table, or legend.
- The sibling days (Day 11, Day 11x) are the voice reference for this
  chapter, ahead of the three frozen specimens — read their prose before
  writing any of this day's.
- Do not touch the Day 11 or Day 11x sections in `source/ch-motors.ptx`.
