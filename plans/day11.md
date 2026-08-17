# Day 11 — DC Motors, the H-Bridge, and PWM (lesson plan)

One Tuesday class, **110 minutes** (see the budget section — the first revision of
this plan wrongly said 65). Chapter `source/ch-motors.ptx`. Pre-class reading +
in-class Parts 1–6. Days 11x and 12 are separate sessions; Day 11 hands off to
11x with the PWM code understood conceptually and set as homework to study.

Ground truth: `plans/day11-ground-truth.md`. Gate 1 review applied:
`reviews/day11-gate1.md`. Downstream: Lab 6.

---

## Objectives — after Day 11 a student can

1. Explain how a DC permanent-magnet motor turns current into torque and voltage
   into speed, and how reversing terminal polarity reverses direction.
2. Read the TB6612 truth table and choose IN1/IN2 for clockwise, counter-clockwise,
   and brake; explain why a driver IC (not a GPIO pin) drives the motor, and what
   shoot-through is.
3. Explain why speed control needs PWM (the STM32C031C6 has no linear DAC) and how
   duty cycle sets the average voltage the motor sees.
4. Wire the TB6612 breakout with external motor power and run the PWM demo,
   reading the duty cycle off the oscilloscope trace.

## THE CRUCIAL STEP (P-2), one sentence

By the end of class every student has the TT motor running under `TTmotor_ramp.c`
and, from a prediction they wrote down before running it, can state — confirmed by
the ramp they watch and the trace on the oscilloscope — that the PWM duty cycle
sets the motor's average voltage and therefore its speed.

*(Scaffolded to the slowest student: the concept is reachable from the written
prediction plus the observed ramp even if an individual scope trace is fiddly; the
second exercise continues from the first exercise's wiring, so a student is not
locked out by a fresh build.)*

## THE STRETCH (P-3)

`act-day11-stretch`, for students who finish the Part 6 measurements: work out the
smallest change in average motor voltage the program can ask for, given 1250 counter
steps on a 5 V supply, then work out what a 100-step counter would have done to both
the PWM frequency and that voltage step, and state the trade-off. Then predict what
changes if the same motor is driven at 50 Hz instead of 1.6 kHz — the optional
experiment Lab 6 suggests — reasoning from the period of each and from the truth
table's fact that the driver brakes during the LOW part of every cycle.

Both generalize the day's idea rather than withholding any part of the crucial step,
and neither needs anything the class has not already measured. Part 4's early-finisher
work is `act-day11-direction-more`, an activity of its own, since Part 4 has the widest
completion spread of the day.

## Datasheet moments (P-11)

- **Part 3:** students extract IN1/IN2 for each mode from the **TB6612FNG "H-SW
  Control Function" table (datasheet p. 4)**
  (`external/datasheets/TB6612FNG_datasheet_en_20141001.pdf`).
- **Part 5:** students self-look-up **PA7 → TIM14_CH1 in the datasheet, Table 12
  (Pin assignment and description)** — a 30-second lookup, not a stated fact.
- **Homework:** **RM0490 §17.3.8 (PWM mode)** and **§17.4 (TIM14 registers)** —
  the lookup students do to understand the demo before Day 11x.

## Activity sequence (Part 1..6) and time budget

**The class length, stated once, because the first revision of this plan had it
wrong.** Day N with N odd is a **Tuesday and runs 110 minutes**; Day Nx is a
Wednesday x-hour and runs **50**; Day N with N even is a Thursday and runs **110**
(`plans/week5.md`, which states the same rule for the same reason — every day of
week 5 had first been budgeted to 65). **Day 11 is a Tuesday: 110 minutes.**

The first revision of this plan budgeted 65, and the Gate 1 and Gate 2
`expert-class-logistics` reviews were briefed with that number. Their timing
findings — a BLOCKER at Gate 2, "no slack, the crucial step is not reached" — are
therefore **void as timing findings**; they were answering a question posed with the
wrong premise. Their non-timing findings stand and are applied (the missing
regulator wiring figure, the missing early-finisher task).

Budget below is against the reworked parts, after Petra's pass 1 restored the motor
physics and replaced every activity she called too simple:

| Part | Title | Mode | ~min |
| --- | --- | --- | --- |
| 1 | The actuator chain, and what sets the speed | explain + derive + predict | 19 |
| 2 | The H-bridge reverses the motor | explain + predict (3 tasks) | 22 |
| 3 | The TB6612 driver and its truth table | explain + datasheet reading (3 tasks) | 13 |
| 4 | First exercise — direction by hand | **do** (wire, predict, verify, measure, time the brake) | 30 |
| 5 | PWM sets the speed | explain + prepare for the coding (3 tasks) | 17 |
| 6 | Second exercise — ramping the motor with PWM | **do** (run, measure period and duty, explain the reversal) | 23 |

Intro/agenda **~7** (five items come out of each kit — Nucleo, TB6612 breakout, TT
motor, regulator board and wall adapter, AD2 — and there are no benches, so this is
not a three-minute start), homework hand-off ~3. **Total ~134 against 110 available.**

**The day is over budget by roughly 25 minutes, and Gate 3 argues it is worse than
that** once the Part 4 wiring-check queue is counted: one instructor giving a
pre-power look at every build serializes the room, and that is the single largest
uncosted item in the hour. The defer order below is written against the task IDs as
they actually exist after Petra's pass 2 — an earlier version of this list named four
tasks that no longer exist, which made it unusable on the day.

1. **Move Part 5's paper work to the homework** (~9 min). `task-day11-pwm-config`
   (write the MODER and AFR operations for PA7) and `task-day11-pwm-timing` (derive
   the prescaler and auto-reload for 1.6 kHz) need no hardware, and the homework is
   already "work through `TTmotor_ramp.c` against RM0490 §17.3.8 and §17.4" — these
   are the same work, done before rather than after reading the driver. Keep
   `task-day11-pwm-pin` in class: it is a thirty-second datasheet lookup and it names
   the pin the next exercise uses.
2. **`act-day11-direction-more` is already optional** (~8 min) — the two measurement
   tasks, terminal voltages against the truth table and brake against coast, are their
   own activity precisely so they can be skipped by anyone still wiring. Say so out
   loud rather than letting the room assume it is required.
3. **Shorten Part 2's shoot-through** (~3 min). Petra's own deck marks it *cultural
   enrichment*; state it against the figure rather than developing it, and give the
   time to the start of class.
4. **If Part 6 is still tight**, take `task-day11-demo-reversal` — the two reasons the
   driver brakes before reversing — into the instructor debrief instead of asking each
   group to work it out. It is the most valuable question of the day, so it is the last
   thing to go, but Part 6 needs a lever of its own and this is it.

**Not compressible: Part 4's build and Part 6's run**, the two halves of the crucial
step. Part 6 is already eased by continuing from Part 4's wiring rather than being a
fresh build.

**Instructor-facing, and deliberately not in the book (S-25):** narrow the pre-power
check to the two things that can do damage — the regulator's 5V (not Vin) reaching VM,
and the motor leads — rather than the whole build. The AIN1/AIN2 jumpers move between
3.3 V and ground and are self-diagnosable from the truth table, so they do not need a
queue. Gate 3 asked for a student-facing pin checklist as well; that is not written,
because `task-day11-dir-wire` is Petra's own sentence and already specifies every
connection, and a checklist beside it would be the same content twice (B-8). Raise it
with her rather than duplicating her text.

## Hand-offs

- **Pre-class reading must establish (ideas only, B-2):** how a motor works —
  torque ∝ current, speed ∝ voltage, **back-EMF**, direction = polarity (all in the
  embedded video); why a motor needs a driver IC and a way to reverse polarity;
  that a GPIO pin can only be fully on or off, so speed control needs PWM; the
  duty-cycle idea. It does **not** build the TIM14 register machinery, and it
  contains no register maps or code.
- **Homework (bridge to 11x):** work through `TTmotor_ramp.c` with RM0490 §17.3.8 /
  §17.4 to understand how the TIM14 PWM is programmed.
- **Day 11x picks up:** writing the PWM code (CCMR1/CCER/CCR1), then motor speed
  sensing with the photointerrupter. **Day 11 does not touch speed sensing.**
- **Lab 6 (downstream constraint, P-13):** a modular `tb6612.c` driver, a pot →
  ADC → PWM speed control with a dead band, and an RPM display. Day 11 supplies the
  H-bridge + PWM half; the ADC and RPM halves come later.
- **Step 3 file surgery (continuity finding):** before drafting Parts 1–6,
  **relocate `sec-motor-speed`** (photointerrupter/RPM) and the **register-level
  PWM code** out of the Day 11 boundary — they are 11x/12 material and are
  currently live in `ch-motors.ptx`. Do not leave them and hope the outline avoids
  them.

---

## Outline — the sections (for the record; Gate 1 applied)

**Before Class (reading, ships in delivery 1, generates no slides):** DC motors
and speed control — how a motor works including **back-EMF** (with the embedded
video), why it needs a driver IC and polarity reversal, and why speed control
needs PWM. Reading questions grounded in real behavior (B-3). No register maps, no
code.

**Part 1 — The actuator signal chain and the DC motor.** Teaches: the actuator
chain (MCU → DAC/PWM → driver → actuator) as the mirror of the Day 7 sensor chain;
a fast recap of torque ∝ current, speed ∝ voltage, direction = polarity, back-EMF.
Students do: one recall check — predict how a listed parameter change moves the
equilibrium speed (deck slide 8's table) — which surfaces an unprepared student's
gap here, before Part 2 leans on it.

**Part 2 — The H-bridge: reversing direction.** Teaches: four switches reverse the
polarity across the motor — **each leg is the N-channel low-side / P-channel
high-side switch pair from Day 6** (N-channel/P-channel, not nMOS/pMOS); a third
mode brakes by **shorting the two motor terminals**, so the spinning motor's own
generated voltage resists rotation (this is where back-EMF pays off, described
mechanically). Students do: **predict which switch combination gives clockwise**
before anything reveals it. No IN1/IN2 mapping yet — that is Part 3's discovery.

**Part 3 — The TB6612 controller IC and its truth table.** Teaches: a GPIO pin
can't source the current or reverse the polarity, so a driver IC sits between MCU
and motor; **shoot-through** in one "cultural enrichment" sentence (both switches
on one side = a supply-to-ground short; the TB6612 staggers switching to prevent
it — do not re-derive it); the IC's four logic inputs (IN1/IN2/PWM/STBY). Students
do: read the **TB6612 truth table** and state IN1/IN2 for CW, CCW, and brake
(datasheet moment). The truth-table image is re-shown in Part 4's activity, not
recalled from here (P-8).

**Part 4 — First exercise: manual direction control** *(PROTECTED)*. Teaches
nothing new; consolidates Parts 2–3 by hand, and is where the **5 V motor rail vs
3.3 V logic rail** distinction is introduced — beside the wiring, where it is used.
Plain factual boundary (B-12): **VM (motor, 5 V) is a separate rail from VCC
(Nucleo logic, 3.3 V), so a motor-side wiring mistake cannot reach the board.**
Students do: from a **labeled wiring figure**, wire the breakout, TT motor, and
**the external motor supply — barrel connector → L7805 regulator (with its 0.22 µF
and 0.1 µF caps) → 5 V → VM** (confirmed student-wired, as Petra's deck slide 17;
the caps are plain labeled components, NOT a capacitor-code recall). PWM is tied
HIGH and AIN1/AIN2 left loose; **predict each jumper combination's result from the
truth table, written down**, then jumper AIN1/AIN2 to the +/− rails in all four
combinations and verify CW / CCW / brake. No Nucleo code yet. **This is a genuine
first-time external-power build — it is the reason Part 4 is protected and Part 5
is the cut.**
- *Plan-level, not student-facing (S-25):* give a pin checklist (VM vs VCC vs GND
  vs AIN1/AIN2/PWMA, motor-lead polarity) so most students self-clear before the
  wiring check, reserving the instructor gate for genuine faults. Diagnostic
  fallback if a combination doesn't match the prediction after the check: re-check
  against the written prediction, then a continuity check on the suspect jumper.
- *Early-finisher lead-in (P-3):* re-derive the PWM frequency arithmetic that Part
  5/6 will use, or predict brake-mode behavior before it is demoed.

**Part 5 — PWM: controlling speed by switching** *(the live cut)*. Teaches: the
STM32C031C6 has **no linear DAC** (a DAC — digital-to-analog converter, the
reverse of Day 7's ADC), so average voltage is set by switching fast between 0 V
and the rail; duty cycle → average voltage (recall Day 10's 7-seg dimming); motor
inertia averages the pulses; the **counter-compare PWM mechanism** at a high level
(counter < compare → output HIGH); PA7/TIM14 as the Nucleo PWM output (students
self-look-up Table 12). Students do: **write down predicted relative motor speed at
~25 % / 50 % / 75 % duty cycle** — the artifact Part 6 checks.

**Part 6 — Second exercise: run the PWM demo.** Teaches: how the pieces combine.
Students do: **continuing from Part 4's wiring**, move three jumpers to the Nucleo
(AIN1→PA5, AIN2→PA6, PWM→PA7); copy `TemplateProject` → `DCmotor`, add
`TTmotor_ramp.c`, compile and run; watch the motor ramp up and reverse; put the AD2
**CH1 (orange) on PA7** and observe the PWM waveform; **check the ramp against the
Part 5 predictions**. Stretch: measure the period, reconcile with PSC/ARR, find the
CCR1 for 30 % duty. Hand-off: study the code with RM0490 §17.3.8/§17.4 for Day 11x.
The register-level walkthrough of the code is **not** taught here — that is Day 11x.
