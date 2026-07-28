# Day 7x — Gate 1 reviews (lesson plan, revision 1)

Reviewed: `plans/day7x.md` revision 1 (2026-07-28).
Panel: expert-class-logistics, expert-active-learning, expert-cognitive-load,
expert-continuity-auditor, learner-anxious-nonhardware.
Verdicts: 1 BLOCKER (logistics), 4 PROCEED-WITH-CHANGES.

---

## expert-class-logistics — BLOCKER

Realistic clock: Part 3 ends ~0:43–0:48, not 0:40; Part 4 as scripted never
happens; Part 5 lost by default.

1. **[BLOCKER] P-2** — Part 3's 20 min is not double-budgeted for a first-time
   tool. Launch alone eats 6–10 (plan's own number), leaving ~12–14 for three
   content moves; Day 7/8 calibration puts a single comparable observe-explain
   set-piece at 7–8 min in *longer* classes. Fix: explicit launch sub-budget +
   content sub-budget, or cut one Part-3 move.
2. **[BLOCKER] S-8** — the cut list cannot reach the bottleneck: available cuts
   total ~8 min against a Part-3 overrun of 5–15+; no in-Part-3 checkpoint
   (contrast Day 8's minute-32 rescue). Fix: hard checkpoint inside Part 3.
3. **[BLOCKER] P-2/S-8** — Part 4 (7 min: terminate session, second stale
   project, second launch, CoolTerm, breakpoint, keypress) is not achievable
   for 30 students, and collides with the documented "didn't terminate the
   previous session" failure mode. Fix: author Part 4 as a demo from the
   outset; fold any hands-on into the already-open project.
4. **[BLOCKER] P-2/P-14** — no rescue for a blinky project that no longer
   builds: no fallback file, no redistribution point, no ladder. Fix:
   pre-stage a known-good blinky and name the handout minute.
5. **[PWC] B-11c/S-8** — settling doesn't name the project-reopen task. Fix:
   "while we talk, get Blinky open and rebuilding" in Part 1/2 presenterNote.
6. **[PWC] B-11c** — NRST/VDD is live given Lab-4 wiring on the bench. Fix:
   proactive "check your power leg lands on 3V3, not NRST" before launch.

## expert-active-learning — PROCEED-WITH-CHANGES

1. **[PWC] P-5/P-6/P-7** — Part 2 is the only all-passive block (10 min, three
   mechanisms, zero predict); with Part 1 + settling, 40% of class is watching
   before touching the debugger. Fix: two predict-then-reveal cycles at zero
   time cost — (a) real compiler transcript, students mark the root-error line
   before the reveal; (b) "nothing printed?" symptom, students write where the
   one printf goes before the reached?/reasonable?/expected-vs-got reveal.
2. **[PWC] P-6** — the cut order demotes the hands-on Part 4 before trimming
   lecture. Fix: reverse — compress Parts 1–2 first; hands-on cut last.
3. **[NIT] P-6/S-2** — Part 4 lacks a predict: have students write the decimal
   value `key` will hold (Day 5 ASCII table) before the keypress.
4. **[NIT] P-2** — Objective 1's "name the practices" is never practiced. Fix:
   60-second write-and-share — which practice would have caught your bug?

Strengths to preserve: IOPENR predict-then-step is P-2-solid and early in
Part 3; the MODER moment is a clean P-5/P-11 sequence; no forward references.

## expert-cognitive-load — PROCEED-WITH-CHANGES

1. **[PWC] P-6** — Part 2 all-passive before the highest-load segment; same fix
   as active-learning #1.
2. **[PWC] P-11/P-3/B-8** — the MODER decode appears as both required datasheet
   moment AND "small stretch" — contradictory status; an instructor may skip
   the chapter's only P-11 lookup. Fix: make it required with its own Part 3
   row; delete it from the stretch section.
3. **[PWC] P-4/B-8/P-12** — a live RM-PDF hunt mid-walkthrough is split
   attention at the worst moment. Fix: crop the RM §6.4.1 reset-value lines
   into a walkthrough figure.
4. **[NIT] P-2/P-9** — cutting Part 4 to an instructor demo collapses the
   guided→independent fade. Fix: keep the demo student-driven (a student at
   the keyboard).
5. **[NIT] P-7** — breakpoints appear mid-list without a motivating bridge.
   Fix: "stepping every line is slow — here's the alternative."
6. **[NIT] P-7** — the hardware-checklist pointer doesn't belong in Part 2.
   Fix: move to Part 5 / Reference.

## expert-continuity-auditor — PROCEED-WITH-CHANGES

1. **[BLOCKER] P-11/L-6** — `ch-intro-blinky.ptx:629` labels `00` as "Input
   (reset default)"; ch-adc teaches the true default is `11` (analog). Day 7x's
   "watch it be true" payoff would contradict Day 1's own table.
   **FIXED 2026-07-28** (table cell + "Why two lines?" aside).
2. **[BLOCKER] P-11/P-5** — ch-switches teaches "00 by default → no MODER write
   needed" in three places (reveal slide 746, Reference 926-927, walkthrough
   965-966) plus the Day 4 FSM listing (1604) — contradicting the RM lookup
   its own activity assigns, and functionally broken (analog mode disconnects
   the input buffer; the chapter's complete drivers all clear the bits).
   **FIXED 2026-07-28** (all four sites now clear MODER explicitly and state
   the analog reset default; Reference cites RM0490 §6.4.1 with both reset
   values).

Confirmed clean: blinky line-by-line claim; keyboard counter structure (RXNE
poll, no uart2_read); act-day3-ref-manual's RM question; ADCPot.c naming and
ladder; BSRR still unspent; Day 8 does not assume the debugger; Lab 4 premise
supports the stretch without P-13 collapse.

## learner-anxious-nonhardware — PROCEED-WITH-CHANGES

Opener lands as normalizing (instructor's hand up too); stretch reads as
invitation; but:

1. **[BLOCKER] P-14/P-2** — troubleshooting box covers 2 of the 4 named launch
   failure categories; a student whose failure is "stale project" or "board not
   enumerated" has no stated next move. Fix: name a diagnostic action for all
   four + who else helps ("hand up, I'll come by").
2. **[BLOCKER] P-2/B-4** — no re-entry path for a student who never launches:
   "no homework" + nothing reopens Part 3. Fix: one hand-off sentence — redo
   the walkthrough self-paced (the chapter carries every screenshot) in open
   lab hours before Day 8.
3. **[PWC] P-14** — normalize-error framing dropped exactly at Part 3. Fix:
   presenter script "a good number of these won't launch first try — normal."
4. **[PWC] P-14** — NRST failure needs the explicit reassurance that it does
   NOT damage the board. (Also flags: no damage-safety rule ID exists in
   AUTHORING-book.md — for Petra.)
5. **[NIT] B-11c** — no TA/second-helper named for the x-hour; if one exists,
   say so.

---

## Synthesis applied to revision 2

- Part 3 split into sub-budgeted 3a–3d with a named minute-32 checkpoint;
  MODER moment promoted to its own required row (3c), deleted from stretch.
- Part 4 authored as a student-driven front demo with a class-wide written
  ASCII prediction; hands-on transfer happens in the stretch on the
  already-open Lab 4 code.
- Part 2 rebuilt as two predict-then-reveal cycles; hardware checklist moved
  to Part 5/Reference.
- Cut order reversed: lecture compresses before any hands-on demotes.
- Settling instruction: open + rebuild Blinky during Parts 1–2.
- Troubleshooting ladder covers all four failure categories + no-damage
  reassurance + re-entry path via open lab hours.
- RM §6.4.1 reset-value lines cropped into a figure
  (`rm_moder_reset_value.png`) — no live PDF hunt mid-walkthrough.
- Cross-chapter MODER-default fixes applied to ch-intro-blinky and
  ch-switches (see continuity findings).
- **For Petra:** pre-stage a known-good Blinky project (zip or Canvas) — the
  repo has no starter blinky (`assets/starters/` holds only ADCPot.c); confirm
  whether a TA attends the x-hour; consider a damage-safety rule ID.
