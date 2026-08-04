# Gate 1 — Week 5 (Day 9 / Day 9x / Day 10) lesson plan

Artifact reviewed: `plans/week5.md` **Revision 1**, with `plans/week5-ground-truth.md`.

| Reviewer | Verdict |
| --- | --- |
| expert-active-learning | PASS WITH CHANGES |
| expert-cognitive-load | PASS WITH CHANGES |
| expert-continuity-auditor | PASS WITH CHANGES |
| expert-class-logistics | **BLOCKER** |
| learner-firstgen-novice | PASS WITH CHANGES |
| learner-arduino-veteran | **BLOCKER** |
| learner-anxious-nonhardware | **BLOCKER** |

---

## expert-active-learning — PASS WITH CHANGES

No finding breaks a day's arc beyond repair — every fix is a resequencing or a
sentence-level clarification. Nothing is a BLOCKER, but three findings sit at
the boundary because they touch the crucial step or the reserved topic.

**Direct answers to the questions asked.** Day 9x's "deliberately mechanical"
doing is legitimate as a design principle (P-2 sanctions a worked example
before the real thing), but Part 4's execution converts "find it in your own
trace" into "find it in a trace structurally identical to the one you just
watched dissected" — watching, not doing. Day 9 Part 7's beat 1 is well built
— a genuine structured commit before any reveal — but the problem is upstream:
Part 1 explains the "why" beat 1 is meant to diagnose. Day 10 Part 1's
AI-critique idea is sound and P-14-compliant, but with no individual
commitment, one student judges while three watch.

- **[MAJOR] P-9, P-2, Definition of Done — Day 9, Objective 5 / Part 7: BSRR is
  explained and shown, never written by a student.** Objective 5 says a student
  "can use `GPIOx->BSRR` to set or clear a pin." Part 7 beat 4 is entirely
  narrative — the code is given complete, as illustration. No TODO, no
  skeleton, no fill-in exists for BSRR anywhere in Day 9: not in Part 7, not in
  the PC13 stretch (which exercises EXTI discrimination), not in the homework
  (which uses a timer interrupt). The first time a student would ever *write*
  `GPIOx->BSRR` is Lab 5's Additional Feature 1, downstream and ungated. For
  the topic the whole chapter exists to spend, students only ever watch it
  happen. **Fix (no new time):** convert beat 4 into predict-then-reveal,
  matching the discipline beat 1 already uses. After the ODR generalization,
  ask students to write the one-line fix themselves — even "which write goes on
  PA5, set or clear?" with the two `#define` names given — then reveal Petra's
  line.
- **[MAJOR] P-2/P-3 — Day 10's crucial step and STRETCH contradict each other
  on what the crucial step requires.** The CRUCIAL section implies `write()` is
  the crucial function ("one call to `i2c1_memWrite()` once the RAM map is
  understood"). The STRETCH section says Challenge 2 "exercises
  `SevenSeg_blink()` and `SevenSeg_dim()`, **which the crucial step does
  not**." But Part 7's table row bundles all three as the crucial 14-minute
  block, and the cut-list treats `blink()` as non-negotiable under time
  pressure. A plan this internally inconsistent cannot tell an instructor what
  to protect, and it fails the "genuinely ONE thing" test. **Fix:** narrow the
  crucial step to `SevenSeg_write()`; reframe `blink`/`dim` as a two-minute
  warm-up rehearsal of the one-line `i2c1_byteWrite()` pattern; make the table
  row and cut-list agree with the (currently correct) STRETCH sentence.
- **[MAJOR] P-5, P-6 — Day 9 Part 1 explains the reasoning Part 7 is designed
  to make students discover.** Part 1: "one minute on why the ISR toggles the
  LED directly and gets away with it here — planted, collected in Part 7."
  Part 7 beat 3's payoff: "It is okay *there* only because nothing else
  touches `ODR`." The core intuition has been said once before beat 1's commit
  moment. This is a weaker reveal than the plan's own cited precedent: Day 8's
  plant only *labels* a fact ("Both are `rc_w1`… Remember that; we come back to
  it") and never explains why it will matter. The plan is careful about this
  elsewhere — "Part 7's commit moment dies if the reading gives it away" — but
  does not apply the same discipline to the in-class homework review.
  **Fix:** trim Part 1 to a bare label. One sentence removed, zero time cost.
- **[MAJOR] P-5, P-6, P-2 — Day 9x Part 4's trace is identical for every
  student, so the projector walk first turns "find it in your own" into
  copying.** `pingDisplay.c` is given and hardcodes `0x70`, so every capture
  has the same START, the same seven address bits, the same ACK, the same
  all-zero data byte, the same STOP — differing only in noise. Having just
  watched the instructor locate exactly these features, finding them again is
  confirmation, not pattern recognition. **Fix:** students attempt and mark
  their own capture first (`room="yes"`), using only the reading's protocol
  figure; the projector walk becomes the debrief. If a model is needed first,
  project the *wrong-address* (0x60, NACK) trace from Part 5's stretch material
  — the pattern is taught, but what students must find in their own is visibly
  different from what they watched.
- **[MAJOR] S-2 — Day 9x and Day 10 have no stated writing-room commitments.**
  Day 9 carries a dedicated "Writing room (S-2)" section naming three moments;
  the other two days have no equivalent. At least two Day 9x moments need one:
  Part 1's "how many pins?" prediction, and Part 6, where the five functions
  are "derived by the class" — whole-group discussion with no individual
  commitment, exactly the pattern this review exists to catch.
- **[MINOR/MAJOR — UDL] Day 9x's crucial step offers one representation and
  gates the more legible one to stretch.** The trace is read off a raw analog
  capture; the Waveforms decoder — "the tool they will actually reach for in
  Lab 5" — is listed under STRETCH, i.e. withheld from exactly the students
  most likely to need an easier-to-read view. **Fix:** offer the decode view as
  an optional check available to everyone *after* their own attempt at the raw
  trace, preserving raw-trace reading as the required skill.
- **[MINOR] P-11 — Day 9x Part 7's mode label undersells its own datasheet
  moment.** The description instructs in the imperative ("Find the row for our
  clock and read off PRESC = 0x2…") — a student lookup — but the table says
  "explain". Day 10's analogous Part 3 is correctly "do → explain". Relabel.
- **[MINOR] S-2, P-14 — Day 10 Part 1's AI critique has no individual
  accountability**, which is what determines whether it earns ten minutes.
  **Fix:** each student individually writes at least "would you revise it, and
  why?" before the group discusses.

---

## expert-cognitive-load — PASS WITH CHANGES

Day-level chunking is sound and no crucial step is unreachable by construction
— the ADC-pilot failure mode does not recur. But the plan's own central claim,
"Where the load lands", does not survive a Part-by-Part check, and Day 9
repeats a chunking mistake this process already caught and fixed on Day 8.

- **[MAJOR] P-6, P-7 — Day 9x: the "mitigated by mechanical doing" claim holds
  only for Parts 1–5.** Parts 6–8 (~20 of 65 minutes) teach the *peripheral* —
  the five library functions, PB8/PB9 in AF6, why open-drain is not optional,
  the five-field `I2C_TIMINGR`, and the 7-/8-bit addressing trap — entirely in
  `explain`/`tell` mode, with no `do` and no writing room. By the plan's own
  hand-off rule the reading is *forbidden* from carrying any of it ("must not
  establish: any STM32 register, the timing values"), so none of it is
  pre-loaded either. That leaves 5–7 genuinely new elements (Objectives 3 and 4
  of 5) arriving in a single 8-minute dense block, which is the opposite of
  what the plan promises. **Fix:** split Part 7 into two beats (pins/open-drain;
  `TIMINGR`), matching Day 8's post-Gate-1 6a/6b/6c pattern, and give Part 8's
  addressing trap a predict-then-reveal instead of `tell`.
- **[MAJOR] P-7 — Day 9 Part 4 is the identical failure Gate 1 already fixed on
  Day 8.** day8.md records: "Part 6 was five new items in 8 minutes…
  restructured into three beats." Day 9 Part 4 crams three new registers plus a
  full datasheet derivation (the `4=4(2-1)+0` offset math, the port-code lookup,
  the array-index off-by-one) into one undifferentiated 10-minute row, with no
  internal beat breakdown. The datasheet derivation alone is comparable in
  length to Day 8's whole Part 6b, which got 4 minutes to itself. **Fix:** split
  into 4a (EXTICR2 + the datasheet moment, ~5–6 min) and 4b (FTSR1 + IMR1 +
  NVIC, ~4 min, framed as "the same two-enable pattern from Day 8, now three
  switches instead of one").
- **[MODERATE] P-1, P-2 — the pivot is documented in prose but the activity
  sequence does no bridging work.** The only forward pointer is "one sentence
  on Thursday's pivot" at the very end of Day 9, 24+ hours before Day 9x opens
  cold. The plan *names* the pivot without designing an orientation beat for
  it. **Fix:** a 30-second explicit beat at the top of Day 9x — "unlike Tuesday,
  none of today's registers are ones you've configured before" — costs nothing
  and gives students a frame before Parts 6–8's density.
- **[MODERATE] S-14, P-2 — Day 10's "second byte always 0" arrives without its
  reason.** The reason is filed under "Notes from the old decks worth keeping"
  as a bug-avoidance tip ("If you don't write the zeros, the pointer won't
  advance") rather than being part of Part 4's explanation. Without it, the
  rule reads as arbitrary — extraneous load that S-14 exists to prevent.
  **Fix:** fold that sentence into Part 4 itself.
- **[MINOR] P-7 — Day 9x Part 7 is internally two first-encounter topics** (pin
  configuration; the timing register with five sub-fields and the
  `clock/4MHz − 1` derivation) sharing one 8-minute `explain` block with no
  separating beat and no predict step.

Time-budget check: all three tables sum to exactly 65 — no finding needed.

---

## expert-continuity-auditor — PASS WITH CHANGES

The arc is sound and the hardest continuity risk — BSRR and the ISR/ODR race —
is handled correctly. Verified by direct grep of the shipped Day 8 chapter, not
the plan's summary of it: `ch-timers-interrupts.ptx` contains **no BSRR mention
and no framing of the race**, and Day 8's homework listing toggles
`GPIOA->ODR ^= LED` inside `TIM14_IRQHandler` with no competing writer, exactly
as Day 9's Part 7 requires. The `rc_w0`/`rc_w1` prediction is fair: Day 8's
Reference table explicitly states "the label in the reference manual is the
only way to know which polarity you have," and `EXTI_FPR1`'s polarity appears
nowhere in Day 8. Day 13's removal orphans nothing — Days 9x/10 use only
`i2c1_byteWrite/Read` and `i2c1_memWrite`, never `i2c1_memRead` (whose body
lives only on Day 13 slides). No forward references into Day 5 or Days 3–4
material were found.

- **[MAJOR] P-1 — a Step 0 requirement was dropped between Step 0 and Step 2.**
  `week5-ground-truth.md` states explicitly: "Day 9 needs no new wiring theory —
  but **bounce now produces multiple interrupts**, which the old deck never
  addresses and the chapter should." This is genuine new material (polling
  ignores repeat bounces by re-reading a settled level; an edge-triggered
  interrupt can fire once per bounce) and it touches the crucial step's own
  reliability. `week5.md` never mentions it — `grep bounce` returns only the
  unrelated "debounce capacitor already wired since Day 3" equipment note.
  Either give it a beat (even a one-sentence Reference note) or say why it is
  out of scope.
- **[MAJOR] Technical accuracy that will propagate into Step 3 — the two-button
  stretch does not demonstrate the ODR race.** Part 7 beat 3 says: "The moment a
  second pin on the same port is driven from `main()` — **Day 9's own
  two-button stretch**, and Lab 5's Additional Feature 1 … — the write-back
  reverts the other side's pin." Checked against the recovered driver:
  `pc13_exti_init()` and the shared `if/else if` only set a direction variable
  and discriminate which line fired — **no code in the two-button stretch
  writes `ODR` from `main()` at all**, so it cannot exhibit the race being
  illustrated. Lab 5's Additional Feature 1 (confirmed in the PDF: a red LED
  flashed at 1 Hz by a timer while a green LED is driven separately) is the one
  real example. Citing the two-button stretch is either a factual error about
  the course's own code (B-6 / B-11d risk once it becomes prose) or shorthand
  for a different, unstated scenario. Fix or remove before Step 3.
- **[MINOR] L-6 naming drift already in the source Step 3 will rewrite.**
  `ch-i2c.ptx`'s `fig-i2c-pins` caption says PB8/PB9 "connect to I2C1 with
  **AF1**", contradicting the ground-truth-verified AF6 used everywhere else —
  including the code slide directly below it in the same file. Flag so it is
  not accidentally reused.
- **[INFO for Step 3] The reading-exclusion constraints are not satisfiable by
  light editing.** `ch-gpio-interrupts.ptx` has no Before-Class/in-class split
  at all — `EXTICR2`, `FTSR1`, `IMR1` and `FPR1` (including the write-1-to-clear
  polarity) all sit in one undifferentiated section that reads like reading
  material. Step 3 must build the split from scratch. By contrast `ch-i2c.ptx`'s
  `sec-i2c-how-it-works` **is** already reading-compliant — verified clean of
  STM32 registers and captured-trace description.

---

## expert-class-logistics — BLOCKER

**Running clock, Day 9** (table sums to 65): Settling 0–3 → Ann 3–5 → P1 5–10 →
P2 10–19 → P3 19–25 → P4 25–35 → P5 35–41 → P6 41–55 → P7 55–63 → P8 63–65.
**The plan's prose says the Part 2 checkpoint lands at "minute 22"; the table
puts it at 19.**

**Day 9x** (sums to 65): P4 runs 21–36. Predicted actual: this is the first time
the class wires this display and takes an I2C capture; by the "budget double"
heuristic and the 3× completion spread, the slow third will not have a legible
trace before ~minute 45–48. With **no numbered checkpoint and no per-day cut
list**, that overrun silently eats Parts 6–7, including the chapter's one
required P-11 lookup.

**Day 10** (sums to 65): P5 36–43, P7 47–61. If the display wiring did not
survive from Day 9x, Part 5 fails for reasons no cut list addresses, and Part 7
— the week's terminal crucial step, feeding Lab 5 — inherits that failure with
no rescue that does not require re-wiring.

- **[BLOCKER] B-11c, P-2 — hardware persistence across days is asserted, not
  verified, and has no hardware-failure rescue.** Day 9's "the PB4 button and
  debounce capacitor already wired since Day 3 … No new components" spans
  roughly nine class days and several intervening chapters that plausibly reuse
  the same breadboard real estate. Day 10 inherits an equivalent claim one step
  further: the rebalance moves ping-and-capture into Day 9x, so Day 10's Parts
  5 and 7 now depend on **display wiring done in the previous class surviving a
  trip home in a student's kit**. Neither day budgets time to re-seat or verify
  wiring, and neither rescue covers it — Day 9's checkpoint hands out a
  verified-good `.c` file, which does nothing for a disconnected PB4 wire; Day
  10 has no checkpoint at all. **Fix:** a 1–2 minute "verify your wiring" beat at
  the top of Day 9 (Part 2) and Day 10 (before Part 5), with an explicit
  two-step diagnostic, and rescue language that distinguishes a software rescue
  from a hardware one.
- **[MAJOR] S-8, P-2 — Day 9x names Part 4 as the bottleneck but gives it no
  numbered checkpoint and no per-day cut list**, unlike Days 9 and 10 — missing
  exactly where it matters most, since Part 4 is explicitly not cuttable.
  Fifteen minutes is optimistic by the plan's own standard; realistic is ~20
  for the middle of the room and 25+ for the slow third. With no checkpoint
  minute written down, an instructor has no pre-agreed point to say "stop, show
  the projected trace, move on" — the discipline that saved Day 8's Part 4 and
  Day 9's Part 2. **Fix:** a hard checkpoint after 12 of the 15 minutes, with the
  rescue "move to the projected trace and let students annotate it instead of
  their own," plus a Day 9x-local cut order.
- **[MAJOR] S-8 — Day 9's stated checkpoint minute is arithmetically wrong.**
  3+2+5+9 = **19**, but the prose says "minute 22". This is precisely the class
  of error Gate 1 caught and fixed on Day 8 (whose minute-32 checkpoint is
  exact), and this plan invokes that precedent while getting its own copy wrong
  by three minutes.
- **[MAJOR] S-8, B-11c — "Day 10 has no named bottleneck" is not quite true.**
  Day 10's build/flash events are adequately budgeted by direct precedent
  (Day 8 P7 = 15 min, Day 9 P6 = 14, Day 10 P7 = 14, all comparable). The actual
  unaddressed risk is the wiring-carryover dependency the rebalance creates — a
  genuine bottleneck hiding behind the claim that nothing new needs naming, and
  the direct cost of moving ping-and-capture out of Day 10 without moving any
  of its verification overhead along with it.
- **[MINOR] P-14, P-2 — Day 9 has no diagnostic ladder for its own crucial
  step.** Day 8's stays on screen for all of Part 7 ("(1) build clean? (2) does
  polled still blink? (3) exact handler name? (4) both enables set?"). A Day 9
  student whose button does nothing has no on-screen path distinguishing wiring
  from a wrong EXTICR port code from a forgotten `NVIC_EnableIRQ`. Given the
  wiring risk above makes that ambiguity likely, this compounds it.
- **[MINOR] S-8 — the week-level cut list is well-ordered** and correctly keeps
  both crucial-step items out of the cut order (the right defense against the
  Day 7 rev-1 failure mode), but it lives only in the shared I2C preamble with
  no back-reference from inside Day 9x's own section.

---

## learner-firstgen-novice — PASS WITH CHANGES

- **[MAJOR] P-2, B-5, P-14 — Day 10 Part 1 presupposes I have a working
  "yours".** Ten minutes of groupwork comparing AI solutions against my own
  homework, and the plan says it *substitutes for* the solution slide ("it
  reviews the homework without a solution slide"). If my Day 9 homework didn't
  run, I have nothing to compare. Every other crucial step this week has a named
  rescue; this one doesn't. Ten minutes into Day 10, in front of a group, I am
  the person with nothing to say — the moment this persona goes quiet and never
  comes back. **Fix:** hand strugglers the Day 9 solution before groups start,
  the way the other checkpoints do, or reframe the questions so the first one
  doesn't require a working baseline.
- **[MAJOR] P-7, P-2 — Day 9 Part 7 is four new ideas in eight protected
  minutes**, on the same day I already spent Parts 3–6 learning four other new
  registers: commit to shipping one of two programs; follow a five-instruction
  Thumb disassembly; generalize it to `GPIOA->ODR ^= LED`; absorb a write-only
  register with two named subfields and two footnotes about what it doesn't do.
  The sentence where I'd stop following is "the ISR's `counter = 0` is
  overwritten by the write-back of the stale value plus one." I don't have an
  assembly background to check that myself, so I either take it on faith or get
  stuck — and there's no time built in for getting stuck. **Fix:** more minutes,
  or split beat 2 into its own mini-arc with a pause before beat 4.
- **[MAJOR] B-11c, P-2 — "which they have had since Day 3" is a five-class
  gap.** Nothing verifies the breadboard still has that wiring, or tells me what
  to do if it doesn't — and I am not the student who can eyeball a breadboard
  and know what's wrong. Part 2's checkpoint catches "didn't compile" and
  "never downloaded", not "my button isn't there anymore because I needed the
  space." **Fix:** name it as a Part 2 troubleshooting branch.
- **[MINOR] P-2, P-7 — "resurfaced, not re-taught — a 60-second beat" is being
  asked to do double duty.** I got the timer blinking on Day 8 but I copied the
  `volatile` pattern without understanding it. Sixty seconds gives me no new
  angle on an explanation I already didn't absorb. B-8 is right that it
  shouldn't be re-taught; the plan just never distinguishes "solid on Day 8"
  from "shaky on Day 8" anywhere in the week.
- **[MINOR] P-6, S-17 — Day 9 Part 7 beat 1 needs one framing line.** I don't
  object to guessing before the reveal — Day 8 did it and it worked. But
  nothing says guessing wrong here is expected. Writing something down that's
  about to be shown wrong, in a room I already feel behind in, is a small thing
  that adds up. "There's no right answer yet — you're about to find out why the
  obvious one is wrong" would cost nothing.
- **[MINOR] Day 9x Parts 6–9 are 22 minutes of back-to-back explain/tell**
  after the one hands-on stretch of the day — five library functions, PB8/PB9 +
  AF6 + open-drain, the `TIMINGR`/`PRESC` derivation, then the addressing trap.
  The second-most-likely-to-lose-me stretch of the week, after Day 9 Part 7.

---

## learner-arduino-veteran — BLOCKER

- **[BLOCKER] P-1, P-5 — Day 9 never mentions `attachInterrupt()`.** The
  Arduino model I would wrongly apply is
  `attachInterrupt(digitalPinToInterrupt(4), isr, FALLING)` — one line that
  collapses all four EXTI registers plus the NVIC plus edge selection. Day 8
  already built exactly this defusing and placed it deliberately early
  (day8.md Part 6a: "there is no `attachInterrupt()` here … DIER + NVIC + the
  exact vector-table name is you doing by hand what `attachInterrupt()` did
  invisibly"). **Day 9 is the day where that is not a courtesy but the whole
  point**, and `week5.md` never says it — verified, zero occurrences of
  "Arduino" or "attachInterrupt" in the file. Without it, Part 4 reads as pure
  ceremony, and Objective 2 has no answer to the unstated "why not just call the
  function." **Fix:** a beat in Part 3 or the opening of Part 4 mirroring Day 8
  Part 6a — name the call, then say what each of its three arguments was doing
  on my behalf (pin→line lookup, edge select, ISR registration) and which
  register that maps to.
- **[MAJOR] P-5, P-1 — Day 9x never mentions `Wire.h`.** Same problem, bigger:
  `Wire.beginTransmission(0x70); Wire.write(0x21); Wire.endTransmission();` is
  three lines, and Day 9x spends most of an hour on `i2c1_init()` and
  `I2C_TIMINGR`. Part 6's "five functions derived by the class" is close, but
  it is answerable in the abstract without landing the blow that **`Wire.h`
  already *is* that five-function library**, just compiled somewhere I never had
  to open. "Wire" appears nowhere in the ground truth either. **Fix:** in Part
  6's reveal, name `Wire.h`'s five calls against the five derived operations,
  then say what `i2c1_init()` and `TIMINGR` do that `Wire.begin()` did silently
  — clock config, alternate-function/open-drain GPIO setup, bus timing.
- **[MAJOR] P-5 — Day 10 never mentions `Adafruit_LEDBackpack.h`.**
  `matrix.begin(0x70); matrix.print(1234); matrix.writeDisplay();` is four
  lines, and Day 10's crucial step re-implements it. Part 6 teaches the layering
  but never names the library it replaces, so the exercise can read as
  reinventing a solved problem. **Fix:** one sentence naming it and stating what
  today's driver buys — visibility into the RAM layout, no external dependency,
  and the pattern Labs 5 and 6 reuse on parts with no Arduino library at all.
- **[MAJOR] P-1 — Day 9x's 7-bit/8-bit trap arrives four Parts after I need
  it.** Part 4's crucial step asks Petra's own question on a live trace — "what
  address is being sent?" — using only Part 3's protocol figure, which gives no
  bit count. As someone who has only ever typed the bare `0x70` into `Wire`, I
  will expect `0x70` on the wire and see a shifted pattern. The explanation is
  deferred to Part 8. **Fix:** move the note into Part 3, or work the shift live
  in Part 4's trace walk.
- **[MAJOR] P-2 — Day 9x Part 8's trap is told once, applied nowhere, and never
  checked.** Four minutes of pure `tell`, no writing room, and nothing
  downstream requires anyone to perform the shift — Day 10 only ever calls
  `i2c1_byteWrite(HT16K33_ADDR, …)` with the constant already `#define`d. For a
  student who coasts, a fact told once and never exercised is a fact never
  taught. **Fix:** hand out a fictitious datasheet excerpt stating the address as
  `0xE0` (already shifted) and ask what to pass to `i2c1_byteWrite()`.
- **[MINOR] P-3 — Day 9x's stretch runs out early.** Parts 6–9 are ~21 minutes
  of explain/tell immediately after the Part 4–5 crucial step and stretch; for
  someone fast through Part 5's two tiers there is nothing here beyond
  listening. The one stretch of the week that doesn't last the class.

---

## learner-anxious-nonhardware — BLOCKER

Two findings are the same failure mode Day 8's Gate 1 caught as a BLOCKER — a
student carrying something broken or missing silently into the middle of class
with no stated way back in — made worse here because one of them is public at
the table level. This is not a request to make the material easier; it is a
request for the rescue mechanism Day 9 already has for itself.

- **[BLOCKER] P-2, B-4, S-17 — Day 10 Part 1 requires my own artifact for its
  full duration**, and the plan says so: "It also reviews the homework without a
  solution slide." Unlike Day 9's Part 1 five rows up, which projects a
  solution, there is no fallback. This is Day 8's BLOCKER shape exactly, except
  now it happens in front of my table in the first ten minutes of the day.
  **Fix:** hand a reference solution to anyone who needs it before groups start,
  framed as "here's a copy to work from," not "here's the one you were supposed
  to have," so "advantages over yours" never requires admitting out loud that
  yours doesn't exist.
- **[BLOCKER] P-1 — Day 9x adds the week's first *power* wiring and says
  nothing about safety.** Day 9 gets an explicit line — "nothing today can
  damage anything". Day 9x has me connect "+V, GND, SDA, SCL" into a breakout I
  did not build, and never says whether getting +V and GND backwards can hurt
  the display, the Nucleo, or nothing at all. This is the single most
  anxiety-triggering silence in the week for this persona. **Fix:** one
  sentence, as plain as Day 9's.
- **[MAJOR] P-14, P-2 — Day 9x Part 4 stacks three places to be the person
  whose thing doesn't work** — wiring, driving the AD2, reading the trace — and
  its rescue is one sentence with no minute attached, where Day 9's has a hard
  minute and a named artifact. It also doesn't distinguish two failures that
  feel identical from where I sit but have different fixes: *my wiring is wrong*
  vs. *the AD2 didn't trigger* (a scope-setup problem). Without that
  distinction I have no way to know whose fault it is — the question this
  persona asks before deciding whether to keep trying. Part 5 is also
  double-booked as both the stretch tier and the stated debug destination,
  without saying how those coexist.
- **[MAJOR] P-2, B-11c — Day 10 has no equipment-continuity statement.** Days 9
  and 9x both carry one. Day 10 silently assumes the Day 9x display wiring is
  still connected when Part 7 — 14 minutes, the week's biggest code-writing load
  — begins. Kits get packed up between class days; whether we are expected to
  leave it wired or re-verify is never said. If mine didn't survive and nobody
  told me to check, I find out during the crucial step with the least time left
  to fix it.
- **[MINOR] B-2 — Day 10 Part 2 has no refresher beat.** Day 9x models this well
  (Part 3 is explicitly "resurfaced from the reading"), and Day 8's Gate 1
  mandated "90 s at the top of Part 2" for students who bounced off the reading.
  Day 10 Part 2 teaches content the reading was assigned to cover, with no
  restated-first opening.
- **[OK — keep this]** Several things are the kind of design that should survive
  Step 3 unchanged: Day 9's "nothing today can damage anything"; Day 9's named
  checkpoint minute; Day 9x's "a student whose display never ACKs still has a
  trace … does not fail closed"; the explicit "Day 9x needs nothing from Day 9",
  which directly answers "if I fall behind Tuesday, can I still do Thursday?";
  and the plan's restraint on Lab 5 — every mention is a plain date with no
  manufactured urgency, exactly what S-15 and L-8 ask for. Do not "improve"
  that into anything more dramatic.
