# Day 15 — Servomotors

**Tuesday, 110 minutes** (Day N with N odd is a Tuesday — the day-parity rule
in `CLAUDE.md`). Chapter: `source/ch-servos.ptx` (placeholder — nothing in it
is trusted, ground truth §7). Old deck: `Day15-Servos.pptx` (31 slides).
Ground truth: `plans/week8-ground-truth.md`. Gate 1 applied:
`reviews/week8-gate1.md`. Downstream: Lab 8 §3, which "repeats the class
activity from Day 15".

## Objectives

By the end of class a student can:

1. Explain what is inside a servomotor (a DC motor, a gear train, a
   potentiometer on the output shaft, a control circuit with an H-bridge), why
   the gears are there (power is, except for friction, conserved, so a fast
   low-torque motor becomes a slow high-torque shaft), and how the built-in
   feedback loop drives the position error to zero and resists a disturbance.
2. State how a hobby servo is commanded: a pulse repeated every 20 ms whose
   width, 1 ms to 2 ms, is the position, held only as long as the pulses keep
   coming — and say why that is a different use of PWM from the motor's.
3. Design TIM14 for a 50 Hz pulse as a second design of a search the class
   ran once on Day 11x: from a 12 MHz clock, choose a prescaler and
   auto-reload value that fit the 16-bit ARR, compute the pulse-width
   resolution T0 = 20 ms/(ARR+1) and the angular step, and choose against
   what the servo can actually resolve.
4. Compute the compare values for 1 ms, 1.5 ms and 2 ms, map a 12-bit ADC
   reading onto that range in integer arithmetic (multiply before you divide),
   and say why the value is bounded before it reaches CCR1.
5. Build the program from the template, `tim.c` and their own `adc.c`/`adc.h`
   (each student's own, built in Lab 5 and kept in `mylib`),
   and verify the pulse train on the AD2 against their own prediction —
   width, period and its response to the knob.
6. State the power rule for the servo and its reason (current draw, the
   Nucleo's brown-out), and where the 5 V comes from (the regulator board from
   Day 11, its 5V pin, common ground).

## The CRUCIAL step

> **Every student's board, running their own completed
> `Day15_servo_template.c`, produces a 50 Hz pulse train on PA7 whose width
> sweeps from 1 ms to 2 ms as they turn the potentiometer, verified with the
> AD2.**

Scaffolding (P-2):

- The template is given whole except four `#define`s and one expression
  (`assets/starters/Day15_servo_template.c`); `tim.c` is given whole; the
  ADC library is their own (`adc.c`/`adc.h` in `mylib`, built in Lab 5 —
  Petra, 2026-09-03), with her one-clause fallback for a
  student who does not have it. The four numbers are derived together in
  Part 3 before anyone opens the IDE, and the map expression is derived in
  Part 4 from a round-number example first.
- The verification is a Day 3 skill: CH1 (orange) on PA7, rising-edge
  trigger, and the "what time base?" question is asked before the capture (a
  5 ms/div base shows one full period — her captures are the time-base
  reference). Each student writes their own predicted printout at the two
  knob ends and the middle before capturing, and compares against their own
  trace.
- **The pulse is verified on the screen with no servo attached, on purpose:**
  a wrong number shows up on the scope, not in the gear train. Said once, in
  Part 5.
- **Checkpoint at minute 78** (mid Part 5), a ladder, not prose: no pulse at
  all → wiring or build (PA7 is D11; the AD2's ground; did the build pick up
  `tim.c` and `adc.c`); a pulse of the wrong width → a `#define`; a pulse that
  does not move with the knob → the ADC or the map. Priority triage; no
  spare-hardware talk in student text (S-25).
- **The x-hour is the overflow by design** (her note: "This exercise takes
  students a LONG time"), and Day 15x budgets for it (its Part 2 opens on
  finishing Tuesday). Nothing in Part 6 is lost if the room is still in
  Part 5 at minute 100: the wiring itself is Wednesday's.

## The STRETCH

Two tiers, both additional (P-3):

1. **Replace the TIM16 tick with `milliseconds()`** (Day 12): rewrite the
   loop so the sampling interval is a `#define` and no interrupt is needed —
   which is what Lab 8 §4 asks for ("use the millisecond timer we have
   provided to keep track of your value for T"). Nothing else changes.
2. **Is finer worth it?** Recompute the table for a prescaler of 6 (0.5 µs,
   0.09°) and say, against a plastic gear train and whatever the servo's
   electronics can resolve, what that resolution buys — and what a prescaler
   of 1 would need from ARR, and why the register cannot hold it.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 1, 4 (title, divider) | deck glue |
| 2 (agenda, Williams; "you will need today" list) | deck glue; Williams dropped (course rule); the equipment list is a presenter note in the Day 15 close for Wednesday |
| 3 (survey) | dropped — course admin |
| 5 (DC motor review) | Part 1, one recall slide by `refPage` to Day 11's physics |
| 6 (what is a servo) | reading (the inventory: motor, gears, pot, control circuit) + Part 1's commit and reveal ("why the gears?" — her power-conservation note, in class, not in the reading) |
| 7 (applications) | reading, one list |
| 8 (feedback) | reading (the idea: it goes to the commanded position and holds it; her figure) + Part 1's push-the-arm predict (the reasoning, in class) |
| 9 (our servo, specs) | reading's datasheet paragraph (question 1 for dead band/current) |
| 10 (commanding with pulses) | reading (her figure; the 1–2 ms / 20 ms fact) + Part 2's commit ("between pulses / when pulses stop" — her note's answer, in class) |
| 11–12 (prescaler table, blank/filled) | Part 3, commit → reveal, table as text |
| 13 (Figure 165 review) | Part 4, `refPage` to `fig-tim14-block-full` — never redefined |
| 14 (Nucleo PWM pins, Table 12) | Part 2 datasheet moment |
| 15 (resolution table, dead band) | Part 3 second commit → reveal |
| 16–18 (registers, register map) | Part 4 recall by `refPage` to Day 11x's figures; not re-taught (B-8) |
| 19 (choose ARR and CCR1, fill-in) | Part 3 third commit; answers `<instructor>` |
| 20–21 (design exercise Part 1) | Part 5 |
| 22–23 (her captures) | Part 5 time-base reference images (the values are the student's own prediction first) |
| 24–25 (template blank/complete) | Part 4 (read it) and Part 5 (complete it); completed version `<instructor>` |
| 26 (`tim.c`) | Part 4: "what changed since Wednesday's driver" — the parameters and the moved limit; the file now follows Day 11x's ARR/CCR1 convention (fixed 2026-09-03 at her request) |
| 27 (servo wiring) | Part 6 |
| 28–29 (how to power) | Part 6: her *why* (brown-out) plus xref to `fig-tb6612-regulator`; **her export `towerProPowering.png` is the wiring figure** (the servo's power lead to the regulator's 5V pin, the rail is the Nucleo's 3.3 V and ground); battery/9 V/7805 dropped per her rulings |
| 30 (design exercise Part 2) | Day 15x Part 2 in full (Gate 1 moved the wiring start off Tuesday); figure: her `towerProPot.png` re-exported with the pot on A0 (follow-up 3b) |
| 31 (x-hour attendance) | dropped — presenter note at most; the scheduling it implies is Day 15x Part 2's own first beat |

**No ordering change from her deck.** The one structural difference is that
slides 5–10 become the reading's ideas, with their reasoning kept for
Parts 1–2's reveals (Gate 1 ruling 1).

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 10 | predict → explain | **A motor with a loop inside it.** One recall slide: the DC motor, torque ∝ current — "key fact we need going forward" (2). The cutaway (her slide 6): commit, `room="yes"`: *the motor turns fast and the arm turns slowly — why put gears in the way?* Reveal in her words: power is (except for friction) conserved, so speed goes down and torque goes up (4). The feedback figure (her slide 8): what the pot measures, what the controller does with the error; commit: *if you push on the arm, what happens?* Reveal from her note: the pot senses it, the controller counteracts it, the servo strongly resists; never take it all the way around. You will see this on Wednesday with the servo in your hand (4) |
| 2 | 8 | predict → tell | **How we command it.** Her slide 10 figure: 1 ms, 1.5 ms, 2 ms, every 20 ms; all we supply is this pulse, and today's work is making it. Commit, `room="yes"`: *what does the servo do between two pulses, and what happens if the pulses stop?* Reveal from her note: it holds as long as the pulses keep coming; no signal, no power on the motor. This is PWM used as a message, not as an average voltage — and the servo's electronics have a dead band: the smallest change in pulse width they will act on (5). **Datasheet moment 1**: which pins can TIM14 drive? Table 12: PA4, PA7, PB1 — and PA7 is D11, where the motor's PWM already was (3) |
| 3 | 20 | do → reveal, ×3 | **Design the timer, a second time.** You did this search once, as the Day 11x going-further: 12 MHz into 50 Hz is 240,000 counts, and you split them into a prescaler and a count. Same search, new constraint: the servo's 1–2 ms window and its dead band. Recall: TIM14 counts up to its auto-reload value ARR, a 16-bit register, so the largest count it holds is 65,535 (2). Commit 1, `room="yes"`, individually: fill her table — prescaler 1, 2, 6, 60, 240 → timer clock → auto-reload; *which rows are usable?* Reveal: 240,000 and 120,000 do not fit in ARR (5). Commit 2: for the three usable rows, T0 = 20 ms/(ARR+1), the number of steps between 1 and 2 ms, the angular step; *which one do you like best?* Reveal, the chosen row first: prescaler 60 → 200 kHz → T0 = 20 ms/4000 = 5 µs; 1000 µs of range ÷ 5 µs = 200 steps; 180°/200 = 0.9° per step. Then why not finer: her own argument — this thing is made out of plastic, and 0.09° is finer than a plastic gear train can hold or the servo's dead band can act on (the 1 µs figure as confirmation, question 1); and why not coarser: 20 µs is 3.6° (7). Commit 3, her slide 19 fill-in: the clock, the prescaled clock, ARR+1 = `PWM_TIMER_MAX`, CCR1 for 1 / 1.5 / 2 ms = `SERVO_MIN` / `SERVO_MID` / `SERVO_MAX` — and then open `tim.c`: *what number actually reaches CCR1 for `SERVO_MID`?* (question 2). Reveal `<instructor>`: 60 / 4000 / 200 / 300 / 400 — "you HAVE to stay between those" (6) |
| 4 | 10 | explain → predict | **The program, read before it is built.** `tim14_pa7_pwm_init(prescaleFactor, timerMax)`: Wednesday's driver with the two numbers as parameters — every register the same, Day 11x's figures by `refPage`; and the one design change: the limit moved out of `tim14_pwm_set()` into `updateServo()` — the driver knows the timer, the program knows the servo, and the servo's safe range is narrower than the timer's (3). `tim16_ms_interrupt_init(500)`: Day 8's recipe on a second timer, because TIM14 is busy making the pulse; the ISR raises `timerFlag`, the loop lowers it (1). The map, mechanic first: map 0–10 onto 100–200 — value = 100 + x·100/10 — and why the multiplication comes before the division in integer arithmetic (divide first and every step is zero) (2). Commit, `room="yes"`: *the pot reads 0 to 4095; write the expression that maps it onto `SERVO_MIN`…`SERVO_MAX`* — reveal her line, with the two arithmetic notes (int promotion; the top value is 399) and why `updateServo()` bounds the value first (4) |
| 5 | 45 | do | **Design exercise, Part 1 — CRUCIAL.** Copy `TemplateProject` → `Servo`; `Day15_servo_template.c` and `tim.c` into `Src`, `tim.h` into `Inc`; your own `adc.c`/`adc.h` are already in `mylib` from Lab 5 (if not, copy them into `Src` and `Inc` — her fallback) (5). Complete the four `#define`s and the map; adjust the ADC calls to your own names (10). Wire the pot to A0 as on Day 7 (Petra, 2026-09-03 — the lab moves it to A3 later, as the students' own work: the book never shows that); AD2 CH1 (orange) to PA7 (D11) and ground. Commit before capturing, individually: *what time base shows one period? what trigger? and what will `pwm_value` print at each end of the knob and in the middle?* (5). Build, run, capture: the width sweeps 1 to 2 ms, the period is 20 ms — against your own predicted numbers; her two captures on screen for the time base. This is why the pulse is verified on the screen before any servo is connected: a wrong number shows up here, not in the gear train. Note the knob position that gives 1.5 ms and re-seat the knob at its midpoint (20). Checkpoint minute 78; the ladder above (5) |
| 6 | 7 | explain | **Powering the servo.** Her slide 28's reason: it draws a lot of current, more when stalled, and a servo on the Nucleo's supply can starve the Nucleo into a brown-out. So it runs from the regulator board (Day 11, `fig-tb6612-regulator` by xref), and her drawing `towerProPowering.png` shows it: the servo's power lead to the board's 5V pin, its ground to the shared ground rail, never Vin (4). The leads, brown / red / yellow on the kit's SG92R (Petra, 2026-09-03): red, the center lead, is power; brown is ground; yellow is the signal, to PA7 (D11) — and Lab 8's rule for any servo: center is power, the darker outer lead is ground, the other is the signal. Unplug everything before wiring; USB first, then the adapter (Day 11's order). The wiring itself is tomorrow (3) |
| — | 5 | tell | **Close.** Tomorrow: the servo on 5 V. Thursday's reading is the photocell. No homework (Petra, 2026-09-03). Presenter note: bring the servo, the regulator board and its adapter, and your multimeter tomorrow |

Total: 3+2+10+8+20+10+45+7+5 = **110**.

**If a part overruns, cut in this order:** Part 6 to its first beat (the
*why* and the regulator; Wednesday recalls the leads) → Part 1's push-the-arm
beat to one sentence → Part 4's TIM16 beat to "Day 8's recipe on TIM16, read
it tonight". **Never cut** Part 3 (the day's idea) or Part 5's verification (a
servo wired to an unverified pulse on Wednesday is the failure the whole
design exists to prevent).

## Datasheet moments (P-11)

1. **Part 2**: STM32C031 datasheet **Table 12, "Pin assignment and
   description"** — the three pins that carry `TIM14_CH1` (PA4, PA7, PB1),
   read the way Day 7 and Day 11 read it.
2. **The reading**: the SG92R datasheet
   (`external/datasheets/C17481_SG92R_datasheet.pdf`) — dead band 1 µs, stall
   torque 2.5 kg/cm at 4.8 V, 0.1 s/60°, POM and carbon-fiber gears — and the
   SG90 sheet (`external/datasheets/Servosg90_datasheet.pdf`) for the wiring
   figure (orange/red/brown), the 1–2 ms / 20 ms timing figure and the ±90°
   convention. The current figure is hers (follow-up 1b); Part 3's reveal
   rests on the gear train and the sourced dead band.
3. **Part 4**: RM0490 §18 exists (TIM16/TIM17, p. 493) — named, not walked; the
   registers used are the ones Day 8 used on TIM14.

## Writing room (S-2) — individually written, then compared

- Part 1: *why the gears?* and *what happens if you push the arm?*
- Part 2: *what happens between pulses, and when they stop?*
- Part 3: the three commits — the table, the resolution row, the fill-in.
- Part 4: *the map expression.*
- Part 5: *time base, trigger, and the three predicted printouts.*

## Hand-offs

**Pre-class reading (B-2, ideas only):** what a servo contains (her slide 6's
inventory: motor, gear train, potentiometer on the output shaft, control
circuit with an H-bridge); what it does (goes to a commanded position and
holds it — the feedback idea, her slide 8 figure); applications; our servo
and its datasheet; the command is a pulse of 1–2 ms every 20 ms (her slide
10 figure); the power rule with its reason and an xref to the regulator.
**Must not contain:** the prescaler table, any PSC/ARR/CCR number, the map
expression, TIM16, the resolution argument — **and none of Parts 1–2's
reasoning**: why the gears trade speed for torque, what a push against the
loop does, what happens between pulses and when they stop (Gate 1 ruling 1).

**Reading questions (B-3):** grounded in her notes and the datasheet — which
quantity carries the command (width, not duty cycle); what the datasheet's
wiring figure says each lead is; why the servo's power is not the Nucleo's; a
datasheet lookup (speed, torque, voltage) that is not Lab 8's; what the
feedback figure's error signal is a difference of.

**Homework:** none (Petra, 2026-09-03). Wednesday continues the exercise.

**Day 15x needs from here:** a verified pulse on PA7 (or, for a student
still in Part 5, the ladder to get there), `SERVO_MIN`/`SERVO_MAX` understood
as the safety bounds, the knob centered, the wiring rule heard once.
