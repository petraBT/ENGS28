# Day 8 — Timers and Interrupts

Chapter: `source/ch-timers-interrupts.ptx` (Day 8 portion; Day 9 = EXTI, authored
separately) · Old deck: `assets/ClassSlidesOLD/Day08-Interrupts.pptx` (52 slides)
· Downstream: **Lab 5** (`assets/Labs/Lab5_ES28.pdf`), Day 9, then motors/servos
(TIM14 PWM).

**Revision 2** — rebuilt after Gate 1 (3 BLOCKER, 4 PASS WITH CHANGES). See
"What Gate 1 changed" at the end.

## Objectives

By the end of class a student can:

1. Choose PSC and ARR to make TIM14 mark off a desired period from the 12 MHz
   clock — including both −1 offsets, the 16-bit ceiling on each register, and
   the fact that many (PSC, ARR) pairs work.
2. Initialize TIM14 for periodic timing (clock enable → PSC → ARR → clear CNT →
   CEN) and check UIF in the main loop with a non-blocking `if` — and say how
   that differs from the blocking `while` waits of Days 5 and 7.
3. Read an access type (`rc_w0`, `rc_w1`) from the reference manual and decide
   how to clear *any* status flag correctly — and say why `&= ~mask` is the
   wrong habit even when it happens to work.
4. Convert the polled timer into an interrupt-driven one: enable UIE in
   TIM14_DIER, enable TIM14 in the NVIC, and write an ISR under its exact
   vector-table name — knowing where all three names come from.
5. Share state between an ISR and `main()` with a `volatile` flag, and state
   the two ISR rules: get in and out fast; never block.

## The CRUCIAL step

> **Every student leaves with `blinkyTimerInt.c` running: TIM14 fires an update
> interrupt every 500 ms, their ISR clears UIF and sets a `volatile` flag, and
> the main loop toggles the LED when it sees the flag.**

Scaffolding to guarantee it (P-2):

- The interrupt version is built **on top of code that is already running**:
  students run the complete `blinkyTimerPolled.c` first (given, not written),
  so the timer configuration is verified before any interrupt machinery is
  added. **Part 4 ends with an explicit checkpoint** (below), so nobody enters
  Parts 5–7 silently carrying a broken build.
- The skeleton `blinkyTimerInt.c` has four labelled `// TODO` clusters. Be
  honest about where each is scaffolded (the Day 7 lesson): **TODOs 1 and 2**
  (enable the update interrupt in DIER; enable TIM14 in the NVIC) are *taught
  fresh* in Part 6b. **TODO 3** (the ISR body: clear UIF, set the flag) is
  taught in Part 6b, and the skeleton's comment restates the clear idiom in
  one line as a callback to Part 5, so a student who lost Part 5 still has
  the line. **TODO 4** (declare the flag `volatile`, consume it in `main`) is
  *resurfaced from the reading* in Part 6c — a 90-second beat, not a claim
  that the reading suffices. The init lines around the TODOs are the same
  five lines they just ran; `__disable_irq()`/`__enable_irq()` are **given**
  in the skeleton, not TODOs.
- The ISR's name is not guessable and not memorized: Part 6b's datasheet
  moment has students find TIM14 in the vector table and the handler name in
  the startup file, so TODO 3's name comes from a lookup they did themselves —
  and all **three** names for the one interrupt channel are traced (below).
- A "LED not blinking?" diagnostic ladder stays on screen for all of Part 7:
  (1) build clean? right `.c` included in the build? (2) does the *polled*
  version still blink? (then your timer is fine — the problem is in the
  interrupt path) (3) is the ISR name **exactly** `TIM14_IRQHandler` — copied,
  not typed? (4) did you enable *both* UIE in DIER *and* the NVIC line?
- Safety framing, said once, early: **nothing today can damage the board.**
  No wiring, no new hardware; the worst outcome is a program that freezes or
  an LED that stays dark, and either is fixed by reset and re-flash.

## The STRETCH

**Small (1–2 min, mental; hand to fast finishers inside Part 7):** make the LED
toggle every 250 ms *without touching PSC*; then back to 500 ms and again
*without touching ARR*. Then check both against a 48 MHz clock: **neither
survives** — why not, and what single number fixes either one? (Gate 2 fixed
the original wording, which presupposed an asymmetry that doesn't exist: the
period depends only on the product (PSC+1)(ARR+1). Instructor solution is
`sl-day8-stretch-solution`.)

**Large — Blinky with T_on ≠ T_off (200 ms on, 800 ms off):** the timer fires at
two different intervals, so the ISR/main must *reprogram ARR on the fly* and
track a two-state machine. From old-deck slides 51–52; provided solution becomes
the instructor-only slide. Genuinely additional: state machine + run-time
reconfiguration, no part of the crucial step withheld. Framed as "just for fun,
nothing to submit."

## Activity sequence (65 min, including setup)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling: laptops, boards, IDE open | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | Why a background timer: `delay_ms()` holds the CPU captive for the whole wait (the Lab 2 button-race false-start window was exactly this); a hardware timer counts in parallel and frees the CPU — sampling, timestamps, and next week, motors | tell | 4 |
| 2 | Design the 500 ms timer: 90-second refresher of the reading's period formula and its worked 1 s example, then **predict which of four candidate (PSC, ARR) pairs work** (`room="yes"`), then reveal | predict→reveal | 8 |
| 3 | The five init lines, one register at a time (APBENR2 → PSC → ARR → CNT → CR1), against the register map | explain | 6 |
| 4 | **Run `blinkyTimerPolled.c`** (given): Canvas download, click-path slide, first build of the day. Note the `if`, not `while` — the loop never blocks. **Ends with the checkpoint** | do | 9 |
| 5 | "Wait — is `&= ~` okay here?" The polled code cleared UIF with `&= ~mask` and it worked; Day 7 called that a bug on the ADC. **Look up the access type in RM0490** → rc_w0 vs rc_w1 moral | observe→explain | 8 |
| 6 | Programming an interrupt, three beats: (a) 90-s mechanism resurfacing + naming what changed from Arduino; (b) DIER → NVIC → the vector-table lookup (predict, then verify) and the three names; (c) the flag pattern + `volatile`, resurfaced | explain/do | 8 |
| 7 | **`blinkyTimerInt.c` skeleton → fill four TODO clusters → build-swap → run** | do | 15 |
| 8 | One-sentence recap; homework slide is fully self-serve | tell | 2 |

**Part 4 is the day's tooling bottleneck** — the Canvas download and the first
build of the day, for 30 students, is at least as failure-prone as the Part 7
build-swap, and it sits *before* every cut. So it gets 9 minutes, its own
click-path slide, its own two-rung ladder (right project? file in `Src/`? one
`main()` in the build — a stale `main` from another day's project is the
classic), and a hard checkpoint: **if the room is not mostly blinking by
minute 32, distribute the verified-good file location and move on** — nobody
debugs a Canvas download while the class waits. Part 5 is written to work as a
whole-class demonstration off the projected code, so a student whose own board
never blinked is still fully in the room; their diagnosis resumes in Part 7,
whose ladder starts at "does the polled version blink?"

**If running long, cut in this order:** Part 1 to 2 min (the reading covers
it); Part 2's refresher to a show of hands if the prediction lands; Part 6a to
30 s if the reading landed (check hands). **Entering Part 7 with fewer than 12
minutes:** do TODOs 1–2 on the projector — they are two lines — and let
students fill TODOs 3–4, which are the day's heart. Never cut Part 5 short of
its moral — an unanswered "so was the polled code wrong?" is worse than not
raising it. Never cut Part 7.

**Equipment:** none beyond the Nucleo — the on-board LED (PA5) only. No
breadboard, no wiring.

## The datasheet moments (P-11)

Two, both load-bearing:

1. **Part 5:** students open **RM0490 §17.4.3, "TIM14 status register
   (TIM14_SR)"**, and read the access type printed under UIF: `rc_w0`. Then
   **§1.2, "List of abbreviations for registers"**, which defines it: *cleared
   by writing 0; writing 1 has no effect* — the mirror image of the ADC's
   `rc_w1` from Day 7. The answer to the set-piece comes off the page, not off
   a slide.
2. **Part 6b:** predict-then-verify on **RM0490 §11.3, Table 40, "Vector
   table"** — guess roughly where TIM14 sits, then find it at **position 19**.
   Then trace all **three names** for that one channel: the table row
   (position 19), the CMSIS constant `TIM14_IRQn` that
   `NVIC_EnableIRQ()` takes (the device header's enum mirrors Table 40's
   position column — handed to you, not looked up), and the handler name
   `TIM14_IRQHandler` in the startup file. The startup file gets a one-clause
   introduction plus a project-tree screenshot: *the file that runs before
   `main()` and lists every interrupt's official name — you will read it,
   never edit it.*

## Observe → explain (P-5)

Part 5 is the day's set-piece, and it is the **payoff of a plant from Day 7**
(`ch-adc.ptx`, the ADC_ISR slide: "Both are `rc_w1` — read, cleared by writing
1. Remember that; we come back to it."). Sequence: the polled code everyone
just ran (projected, so this works even for a student whose board didn't
cooperate) clears UIF with `TIM14->SR &= ~TIM_SR_UIF;` — and on Day 7 students
were told, emphatically, that `&=` on the ADC's status register is a bug.
Commit to an answer before the reveal: *was the code you just ran wrong — yes
or no?* Then the RM lookup: UIF is `rc_w0`, ADRDY is `rc_w1`. Writing 1 to an
rc_w0 bit does nothing, so the read-modify-write is harmless to the *other*
flags here — it works, but only by the grace of the access type. The moral
(old-deck slide 23): status registers are cleared by **writing a mask with a
plain assignment** — `TIM14->SR = ~TIM_SR_UIF;` for rc_w0,
`ADC1->ISR = ADC_ISR_ADRDY;` for rc_w1 — and the access type in the RM is how
you know which. The interrupt version's ISR uses the correct idiom.

**Ground truth settling the `&=`:** the mined deck's slide 25 ("The whole
thing") is the real `blinkyTimerPolled.c` pasted as text, and it uses
`&= ~TIM_SR_UIF`; slide 18 teaches `=` and asks whether `&=` is "also okay";
the ISR in `blinkyTimerInt.c` (slides 42/47) uses `=`. So the polled driver
ships with `&=` **verbatim** (B-6), and the set-piece asks about it.

**Nothing before Part 5 may explain rc_w0 or compare the two clears.** This
binds the *reading* too: the reading says only "UIF is set by hardware; your
job is to clear it." The rough chapter's `fig-timer-sr` caption currently
names both access types and makes the comparison — **that caption must be
neutralized in Step 3** or the puzzle is pre-empted for every student who did
the reading.

**Bound the explanation:** the race-condition tail of the argument ("an
interrupt could land mid-read-modify-write") gets *one sentence* as a preview
of Day 9, no more — the felt version of that problem, and BSRR as its fix, is
Day 9's reserved material.

## Part 6 in three beats (P-7)

Eight minutes, three separated beats, so the crucial step's concepts don't
arrive as one compressed block:

- **6a (≈2 min) — what changed, and what it's called.** Resurface the
  reading's interrupt figure (save state → vector → ISR → restore) for 90
  seconds. Then two naming sentences, said explicitly: (i) *this* ISR is an
  **Interrupt Service Routine** — a function you write — not the
  Interrupt-and-Status **Register** (`USART2->ISR`, `ADC1->ISR`) of Days 5
  and 7; same letters, different thing. (ii) For Arduino veterans: there is
  no `attachInterrupt()` here to register any function you like — DIER + NVIC
  + the exact vector-table name is you doing by hand what `attachInterrupt()`
  did invisibly.
- **6b (≈4 min) — what the timer needs.** DIER's UIE bit (annotated register
  map), `NVIC_EnableIRQ(TIM14_IRQn)`, then the vector-table
  predict-and-verify and the three-names trace (datasheet moment 2).
- **6c (≈2 min) — how the ISR talks to main.** The flag pattern (ISR sets it;
  `main` checks and clears it) and *why the flag must be `volatile`* — the
  compiler otherwise assumes nothing outside the loop changes it. Resurfaced
  from the reading, one worked slide, not re-taught from scratch.

## Writing room (S-2)

Three moments require a committed answer before the reveal: Part 2's
(PSC, ARR) prediction, Part 5's "was the code we just ran wrong — yes or no?",
and Part 6b's vector-table position guess. All get `room="yes"` (or the
prompt-slide equivalent). These carry the day's P-14 hook: an AI hands over
"PSC = 12000, ARR = 500" instantly, but it cannot supply the student's own
committed wrong guess meeting the reveal.

## Hand-offs

**Pre-class reading must establish:** what a hardware timer is (counter + PSC +
ARR + update event, with the block diagram and the RM's prescaler timing
figure); the counting arithmetic with a worked example at a *different* period
(1 s: PSC = 12 000, ARR = 1000, so Part 2's 500 ms is transfer, not recall);
that UIF is set by hardware and must be cleared by you (**not** how the clear
works, and no rc_w0/rc_w1 — see above); the interrupt mechanism (the
function-call stack save/restore from Day 1's reference material, then the
interrupt as a hardware-invoked call, vector table, NVIC); the ISR rules
(short, no blocking, no args/return); and `volatile` — what the compiler
assumes without it and why the flag pattern needs it. Gloss the vocabulary
once: Blinky's delay was named a **busy-wait loop** in Days 1–2 — "spin loop"
is the same thing; use busy-wait consistently. Reading questions: the ARR
off-by-one (ARR = 499 → 500 µs), busy-wait clock-dependence, why ISRs stay
short, and the not-`volatile` failure mode. **The misnamed-ISR reading
question's feedback must not assert a symptom until the default-handler
behavior is verified** (flag 1 below).

**Class deepens, does not repeat** (B-8): the reading carries the interrupt
mechanism; class resurfaces its figure for ninety seconds inside Part 6a and
spends its time on the *programming*. The reading works 1 s; class designs
500 ms under constraints.

**Homework (due next class):** modify `ADCPot.c` so the LED blinks ⅓ s on,
⅓ s off from a timer interrupt while the ADC keeps printing — the direct
rehearsal for Lab 5's "ADC with timer interrupt." Hint from the old deck:
toggle the LED directly in the ISR. (12 MHz / 3 = 4,000,000 cycles: PSC = 4000,
ARR = 1000 is exact — the instructor solution should show the divisor search,
not just the answer.) The homework slide is **fully self-serve** — task, hint,
and due date all on it — so losing Part 8 to the clock costs nothing. Plus the
T_on ≠ T_off challenge, optional, nothing to submit.

**Lab 5 needs** (P-13 — checked, not taught): a modular ADC driver, the
seven-segment driver (Day 10), and "enable the ADC with a timer interrupt
rather than `delay_ms()`" — the homework covers the technique. Nothing in Lab 5
requires more timer surface than UIE-driven update interrupts.

**Day 9 needs:** NVIC/ISR/`volatile`/flag fluency (all crucial-step material
here); the EXTI machinery is Day 9's own. **Do not spend BSRR or the
ISR-shares-GPIO race** — Day 8's homework (ISR toggling ODR while main prints)
is deliberately race-free and plants the situation Day 9 detonates.

## Notes from the old deck worth keeping

- The email analogy for polling vs. interrupts (slides 27–28) — reading
  material, with its "which strategy is more efficient?" as a reading
  question.
- Slide 44's honesty about `__disable_irq()` inside the ISR: the driver does
  it, the chip tracks nested interrupts so it is not strictly required, and
  the book should say both things rather than presenting it as load-bearing.
- Slide 7's speaker notes seed *next week*: "hold a pin high for a set time
  with no CPU" → motors/PWM; "time how long an input is asserted" → the
  tachometer. One forward-pointing sentence in the recap, no more.
- The five timers (TIM1, TIM3, TIM14, TIM16, TIM17) and "TIM14 is the
  simplest" — reading, one paragraph, with "the others return with motors."

## Flags for Petra (post-Gate 2)

1. **[BENCH RUN]** Flash a build with a deliberately misspelled handler
   (`TIM14_IRQHandlr`), UIE and NVIC both enabled, and report the symptom:
   completely dead (no LED, no serial), or running with a dark LED? The
   draft now uses symptom-neutral wording ("the board may also stop
   responding entirely") that your one observation collapses to a single
   sentence. Also confirm the startup file's exact name — chapter and old
   deck say `startup_stm32c031ctx.s`; CubeIDE normally emits
   `startup_stm32c031c6tx.s` — and supply a Project Explorer screenshot
   (startup file's folder circled, `fig-exclude-from-build` house style) +
   a crop showing the `TIM14_IRQHandler` line, for the pending
   `fig-startup-file`.
2. **[FILES]** Supply `assets/starters/blinkyTimerPolled.c` (complete, with
   `&= ~TIM_SR_UIF` verbatim — the set-piece depends on it) and
   `assets/starters/blinkyTimerInt.c` (the four-TODO skeleton). Day 7 set
   the precedent with ADCPot.c. `ES28.h` alongside would close the last
   unverifiable items (TIM14_IRQn value; delay_ms implementation).
3. **[YOUR CALL]** ch-adc's Day 7 insight box already defines `rc_w0`
   generically, which softens Day 8's Part 5 surprise for careful readers.
   Committee recommendation: leave Day 7 alone — the commit moment ("was
   the code wrong?") survives; the real work is applying the label to a new
   register.
4. **[CONFIRM]** The minute-32 rescue mechanism now written into the
   checkpoint note: instructor screen-share + pre-loaded USB stick, never
   Canvas (the failing channel). Confirm or replace.
5. **[CONFIRM]** Homework due line now says "the start of Tuesday's class"
   (old deck's framing). Confirm the weekday.
6. The old slide-35 NVIC diagram's CSDN watermark is **cropped out** of
   `nvic_block_diagram.png` (checker confirms clean); the image is still
   third-party in origin if provenance matters for publication.
7. Deck-order and scope divergences from the old deck (run-then-puzzle;
   skeleton instead of complete handout) — endorsed by both gates.

**Ration re-scope (supersedes "one forward-pointing sentence in the recap"):**
the motors/tachometer pointer appears once in Part 1 (motivation), once in
the recap (the planned one), and in the Reference family subsection (B-10
lookup material, not a teaser). That distribution is deliberate.

## What Gate 1 changed

Reviewed by `expert-active-learning`, `expert-cognitive-load`,
`expert-continuity-auditor`, `expert-class-logistics`,
`learner-firstgen-novice`, `learner-arduino-veteran`,
`learner-anxious-nonhardware`. Three BLOCKERs, all structural:

1. **The cut list sat behind the real bottleneck** (logistics; the Day 7
   rev-1 failure repeated). Part 4 — Canvas download plus the first build of
   the day — was budgeted 6 min as if "run given code" were free. Now 9 min,
   its own click-path slide and two-rung ladder, and a minute-32 checkpoint
   with a verified-good-file rescue so the failure never silently propagates.
2. **No way back in between Parts 4 and 7** (anxious): a student whose polled
   build failed carried it unnamed through the set-piece. Now: the Part 4
   checkpoint, Part 5 written to run off the projected code, and the safety
   sentence ("nothing today can damage the board").
3. **The reading gave away the set-piece** (arduino-veteran, continuity): the
   rough chapter's `fig-timer-sr` caption names rc_w0/rc_w1 and makes the
   comparison. Step 3 must neutralize it; the constraint is now written into
   Hand-offs.

## What Gate 2 changed

Full panel: the standing core of 7 plus rotators expert-rigor-hawk,
expert-embedded-industry, learner-arduino-veteran, learner-python-intro.
Reports in `reviews/day8-gate2.md`; synthesis applied. Verdicts: 10 PASS
WITH CHANGES, 1 BLOCKER (checker).

The checker's blockers, all fixed: TIM3's clock enable is in APBENR1, not
APBENR2 (prose corrected); the read-modify-write mechanism was described
backwards — on `rc_w0` the write-back sends the *clear* command (0) to
every flag that read clear, so `&= ~` is safe only while nothing else in
the register moves — corrected in Part 5 prose, its slide, and the
Reference rule that had generalized the error; the prescaler-timing SVG
had two opaque white rectangles (slide-shape artifacts) hiding the UEV
pulse, the wrap to 00, and the slowed CK_CNT — stripped, artwork restored;
fig-tim14-block's caption inverted CK_PSC/CK_CNT and misreported the
colors — rewritten, and ARR recolored orange so blue means only the clock
path. Also fixed: the fast-finisher stretch had no correct answer as posed
(both variants share the product (PSC+1)(ARR+1)) — reworded to the question
the algebra rewards, with a new instructor solution; the misnamed-ISR
symptom wording is now verification-independent pending Petra's bench run;
the vector-table figure gained its header row; fig-tim14-sr gained the
UIF/rc_w0 callout treatment; "Resource Configurations → Exclude from
Build" restored as the IDE term everywhere; Part 5 rewritten state-neutral
("the code on the screen") so a student rescued in Part 4 isn't told they
ran something they didn't; the startup file got its own beat, slide, and
pending screenshot figure; volatile gained the compiler-rewrite scaffold
and a new fig-compiler-view; the T_on≠T_off solution gained the missing
`tim14_ms_interrupt_init()` body and the chapter's MODER idiom; plus the
UIE/UIF defusing, the millis() callout, the __disable_irq bounding, the
8-word "What Gets Stacked" Reference box, the 2^16 derivation, priority-0
default, rs-row correction, reserved-bits footnote, HSI48 tolerance note,
recap presenterNote, out-of-time promise after the Part 7 ladder, and the
visible safety line on the agenda.

Majors from Gate 1, all applied: the "each TODO taught in Part 6" claim was fictional for
TODOs 3–4 (three reviewers independently) — Part 6 restructured into three
beats with the `volatile`/flag resurfacing explicit and the crucial-step
section now honest about taught-fresh vs. resurfaced; Part 6 was five new
items in 8 minutes — button-race motivation moved to Part 1, email analogy to
the reading, vocabulary defusings added (ISR the register vs. ISR the
function; `attachInterrupt()`; busy-wait vs. spin loop); `TIM14_IRQn` was a
third un-traced name — folded into datasheet moment 2; Part 2 prediction had
no S-2 writing room — Writing-room section added; no refresher existed for
students who bounced off the reading — 90 s at the top of Part 2; the
motivation now targets `delay_ms()`'s CPU captivity (what students actually
use) rather than Day 1's raw loop; timing table now sums to exactly 65.
