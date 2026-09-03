# Day 15 — Servomotors

**Tuesday, 110 minutes** (Day N with N odd is a Tuesday — the day-parity rule
in `CLAUDE.md`). Chapter: `source/ch-servos.ptx` (placeholder — nothing in it
is trusted, ground truth §7). Old deck: `Day15-Servos.pptx` (31 slides).
Ground truth: `plans/week8-ground-truth.md`. Downstream: Lab 8 §3, which
"repeats the class activity from Day 15".

## Objectives

By the end of class a student can:

1. Explain what is inside a servomotor (a DC motor, a gear train, a
   potentiometer on the output shaft, a control circuit with an H-bridge), why
   the gears are there (power is conserved, so a fast low-torque motor becomes
   a slow high-torque shaft), and how the built-in feedback loop drives the
   position error to zero and resists a disturbance.
2. State how a hobby servo is commanded: a pulse repeated every 20 ms whose
   width, 1 ms to 2 ms, is the position, held only as long as the pulses keep
   coming — and say why that is a different use of PWM from the motor's.
3. Design TIM14 for a 50 Hz pulse: from a 12 MHz clock, choose a prescaler and
   auto-reload value that fit the 16-bit ARR, compute the pulse-width
   resolution T0 = 20 ms/(ARR+1) and the angular step, and choose against the
   servo's dead band.
4. Compute the compare values for 1 ms, 1.5 ms and 2 ms, map a 12-bit ADC
   reading onto that range in integer arithmetic, and say why the value is
   bounded before it reaches CCR1.
5. Build the program from the template, `tim.c` and their own `adc.c`, and
   verify the pulse train on the AD2 — width, period and its response to the
   knob.
6. State the power rule for the servo and its reason (current draw, the
   Nucleo's brown-out), and where the 5 V comes from (the regulator board from
   Day 11, its 5V pin, common ground).

## The CRUCIAL step

> **Every student's board, running their own completed
> `Day15_servo_template.c`, produces a 50 Hz pulse train on PA7 whose width
> sweeps from 1 ms to 2 ms as they turn the potentiometer, verified with the
> AD2.**

Scaffolding (P-2):

- The template is given whole except four `#define`s and one expression (her
  slides 24–25); `tim.c` is given whole; the ADC code is their own from Day 7
  (already in `mylib` for most). The four numbers are derived together in
  Part 3 before anyone opens the IDE, and the map expression is derived in
  Part 4 as a predict-then-reveal with the arithmetic on the board.
- The verification is a Day 3 skill: CH1 (orange) on PA7, rising-edge
  trigger, and the "what time base?" question is asked before the capture (a
  5 ms/div base shows one full period — her captures are the reference).
- **Checkpoint at minute 75** (mid Part 5): a board with no pulse at all is
  a wiring or build problem (the ladder: PA7 is D11; the AD2 ground; did the
  build pick up `tim.c` and `adc.c`); a pulse of the wrong width is a
  `#define` problem; a pulse that does not move is the ADC or the map. Priority
  triage, no spare-hardware talk in student text (S-25).
- **The x-hour is the overflow by design** (her note: "This exercise takes
  students a LONG time"). Nothing in Part 6 is lost if the room is still in
  Part 5 at minute 100: the wiring explanation is Part 6's slide, and the
  wiring itself is Wednesday's.

## The STRETCH

Two tiers, both additional (P-3):

1. **Replace the TIM16 tick with `milliseconds()`** (Day 12): rewrite the
   loop so the sampling interval is a `#define` and no interrupt is needed —
   which is what Lab 8 §4 asks for ("use the millisecond timer we have
   provided to keep track of your value for T"). Nothing else changes.
2. **Is finer worth it?** Recompute the table for a prescaler of 6 (0.5 µs,
   0.09°) and say, against the dead band and a plastic gear train, what that
   resolution buys — and what a prescaler of 1 would need from ARR, and why
   the register cannot hold it.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 2 (agenda, Williams) | deck glue; Williams dropped (course rule) |
| 3 (survey) | dropped — course admin |
| 5 (DC motor review) | Part 1, one recall slide by `refPage` to Day 11's physics |
| 6 (what is a servo) | reading (her note near verbatim) + Part 1's commit ("why the gears?") |
| 7 (applications) | reading, one list |
| 8 (feedback) | reading (her text and figure) + Part 1's push-the-horn beat |
| 9 (our servo, specs) | reading's datasheet paragraph (question 1 for dead band/current) |
| 10 (commanding with pulses) | reading (her figure, her words) + Part 2 recall and the "what does the servo do between pulses / when pulses stop" commit |
| 11–12 (prescaler table, blank/filled) | Part 3, commit → reveal, table as text |
| 13 (Figure 165 review) | Part 4, `refPage` to `fig-tim14-block-full` — never redefined |
| 14 (Nucleo PWM pins, Table 12) | Part 2 datasheet moment |
| 15 (resolution table, dead band) | Part 3 second commit → reveal |
| 16–18 (registers, register map) | Part 4 recall by `refPage` to Day 11x's figures; not re-taught (B-8) |
| 19 (choose ARR and CCR1, fill-in) | Part 3 third commit; answers `<instructor>` |
| 20–21 (design exercise Part 1) | Part 5 |
| 22–23 (her captures) | Part 5 reference images |
| 24–25 (template blank/complete) | Part 4 (read it) and Part 5 (complete it); completed version `<instructor>` |
| 26 (`tim.c`) | Part 4: "what changed since Wednesday's driver" |
| 27 (servo wiring) | Part 6 |
| 28–29 (how to power) | Part 6: her *why* (brown-out) plus xref to `fig-tb6612-regulator`; battery/9 V/7805 dropped per her rulings |
| 30 (design exercise Part 2) | Part 6 start; Day 15x Part 2 in full |
| 31 (x-hour attendance) | dropped — presenter note at most |

**No ordering change from her deck.** The one structural difference is that
slides 5–10 become the reading, so Parts 1–2 are recall plus three commits
rather than first teaching.

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 10 | predict → explain | **A motor with a loop inside it.** One recall slide: the DC motor, torque ∝ current — "key fact we need going forward" (2). The cutaway (her slide 6): commit, `room="yes"`: *the motor turns fast and the arm turns slowly — why put gears in the way?* Reveal in her words: power is conserved, so speed goes down and torque goes up (4). The feedback figure (her slide 8): what the pot measures, what the controller does with the error; *if you push on the arm, what happens?* — the loop corrects; never take it all the way around (4) |
| 2 | 8 | predict → tell | **How we command it.** Her slide 10 figure: 1 ms, 1.5 ms, 2 ms, every 20 ms. Commit, `room="yes"`: *what does the servo do between two pulses, and what happens if the pulses stop?* Reveal from her note: it holds as long as the pulses keep coming; no signal, no power on the motor. Then: this is PWM used as a message, not as an average voltage — the width carries the position (5). **Datasheet moment 1**: which pins can TIM14 drive? Table 12: PA4, PA7, PB1 — and PA7 is D11, where the motor's PWM already was (3) |
| 3 | 15 | do → reveal, ×3 | **Design the timer.** *We need 20 ms per period from a 12 MHz clock.* Commit 1, `room="yes"`: fill her table — prescaler 1, 2, 6, 60, 240 → timer clock → auto-reload; *which rows are usable?* Reveal: ARR is 16 bits, so 240,000 and 120,000 are out (5). Commit 2: for the three usable rows, T0 = 20 ms/(ARR+1), the number of steps between 1 and 2 ms, the angular step; *which one do you like best?* Reveal with the dead band: 0.5 µs is finer than the servo can notice, 20 µs is 3.6° — 60 is the one (5). Commit 3, her slide 19 fill-in: the clock, the prescaled clock, ARR+1 = `PWM_TIMER_MAX`, CCR1 for 1 / 1.5 / 2 ms = `SERVO_MIN` / `SERVO_MID` / `SERVO_MAX`. Reveal `<instructor>`: 60 / 4000 / 200 / 300 / 400 — "you HAVE to stay between those" (5) |
| 4 | 10 | explain → predict | **The program, read before it is built.** `tim14_pa7_pwm_init(prescaleFactor, timerMax)`: Wednesday's driver with the two numbers as parameters — every register the same, Day 11x's figures by `refPage`; what else changed (the limit moved out of `tim14_pwm_set()`, and the off-by-one — per question 2) (3). `tim16_ms_interrupt_init(500)`: Day 8's recipe on a second timer, because TIM14 is busy making the pulse; the ISR raises `timerFlag`, the loop lowers it (2). Commit, `room="yes"`: *the pot reads 0 to 4095; write the expression that maps it onto `SERVO_MIN`…`SERVO_MAX`* — reveal her line, with the two arithmetic notes (int promotion; the top value is 399) and why `updateServo()` bounds the value first (5) |
| 5 | 45 | do | **Design exercise, Part 1 — CRUCIAL.** Copy `TemplateProject` → `Servo`; `Day15_servo_template.c` and `tim.c` into `Src`, `tim.h` into `Inc`; your `adc.c`/`adc.h` from `mylib` (5). Complete the four `#define`s and the map; adjust the ADC calls to your own names (10). Wire the pot to A0 as on Day 7; AD2 CH1 (orange) to PA7 (D11) and ground. Commit before capturing: *what time base shows one period? what trigger?* (5). Build, run, capture: the width sweeps 1 to 2 ms, the period is 20 ms — her two captures on screen as the reference. Note the knob position that gives 1.5 ms and re-seat the knob at its midpoint (20). Checkpoint minute 75; the ladder above (5) |
| 6 | 12 | explain → do | **Powering the servo.** Her slide 28's reason: it draws a lot of current, more when stalled, and a servo on the Nucleo's supply can starve the Nucleo into a brown-out. So it runs from the regulator board (Day 11, `fig-tb6612-regulator` by xref): 5V pin to the servo's center lead, GND shared, never Vin (4). The leads: center is power, the darker outer lead is ground, the other is the signal — brown/red/orange on ours (question 6); the signal lead goes to PA7 (3). Unplug everything before wiring; USB first, then the adapter (Day 11's order). Start wiring if there is time — the servo moves tomorrow (5) |
| — | 5 | tell | **Close.** Tomorrow: the servo on 5 V, and two ADC channels. Thursday's reading is the photocell. (Homework: question 8) |

Total: 3+2+10+8+15+10+45+12+5 = **110**.

**If a part overruns, cut in this order:** Part 6's wiring start (Wednesday
has it) → Part 1's push-the-horn beat to one sentence → Part 4's TIM16 beat
to "Day 8's recipe on TIM16, read it tonight". **Never cut** Part 3 (the day's
idea) or Part 5's verification (a servo wired to an unverified pulse on
Wednesday is the failure the whole design exists to prevent).

## Datasheet moments (P-11)

1. **Part 2**: STM32C031 datasheet **Table 12, "Pin assignment and
   description"** — the three pins that carry `TIM14_CH1` (PA4, PA7, PB1),
   read the way Day 7 and Day 11 read it.
2. **The reading**: the servo datasheet (`external/datasheets/Servosg90_datasheet.pdf`)
   — its specification table (speed, torque in kg-cm, voltage), the wiring
   figure (orange/red/brown), the 1–2 ms / 20 ms timing figure and the
   ±90° convention. The dead band and current figures are hers (question 1).
3. **Part 4**: RM0490 §18 exists (TIM16/TIM17, p. 493) — named, not walked; the
   registers used are the ones Day 8 used on TIM14.

## Writing room (S-2)

- Part 1: *why the gears?*
- Part 2: *what happens between pulses, and when they stop?*
- Part 3: the three commits — the table, the resolution row, the fill-in.
- Part 4: *the map expression.*
- Part 5: *time base and trigger.*

## Hand-offs

**Pre-class reading (B-2, ideas only):** the servo inside and out (her slide 6
note), the feedback loop (her slide 8), applications, our servo and its
datasheet, the pulse-width command (her slide 10), the power rule with its
reason and an xref to the regulator. **Must not contain:** the prescaler
table, any PSC/ARR/CCR number, the map expression, TIM16, the resolution
argument.

**Reading questions (B-3):** grounded in her notes and the datasheet — what
holds the servo in place (the pulses, repeated); pulse width vs duty cycle
(which quantity carries the command); what the internal loop does to a push;
why the servo's power is not the Nucleo's; the datasheet's own numbers (a
lookup that is not Lab 8's).

**Homework:** none set in her deck (question 8). Wednesday continues the
exercise.

**Day 15x needs from here:** a verified pulse on PA7, `SERVO_MIN`/`SERVO_MAX`
understood as the safety bounds, the knob centered, the wiring rule heard once.
