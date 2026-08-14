# Day 11 — DC Motors, the H-Bridge, and PWM (lesson plan)

One in-class hour (~65 min). Chapter `source/ch-motors.ptx`. Pre-class reading +
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

For students who finish the run exercise early: measure the PWM period on the AD2
and reconcile it with the driver's constants — 12 MHz / (PSC+1 = 6) = 2 MHz,
2 MHz / (ARR+1 = 1250) = 1.6 kHz — then work out which CCR1 value gives a 30 %
duty cycle and confirm it on the scope. Generalizes duty cycle → average voltage
into the register arithmetic Day 11x will build, withholding no part of the
crucial step. (An early-finisher lead-in also exists for the first exercise — see
Part 4.)

## Datasheet moments (P-11)

- **Part 3:** students extract IN1/IN2 for each mode from the **TB6612FNG "H-SW
  Control Function" table (datasheet p. 4)**
  (`external/datasheets/TB6612FNG_datasheet_en_20141001.pdf`).
- **Part 5:** students self-look-up **PA7 → TIM14_CH1 in the datasheet, Table 12
  (Pin assignment and description)** — a 30-second lookup, not a stated fact.
- **Homework:** **RM0490 §17.3.8 (PWM mode)** and **§17.4 (TIM14 registers)** —
  the lookup students do to understand the demo before Day 11x.

## Activity sequence (Part 1..6) and time budget

| Part | Title | Mode | ~min | Note |
| --- | --- | --- | --- | --- |
| 1 | The actuator signal chain and the DC motor | explain + predict (recap of reading/video) | 6 | |
| 2 | The H-bridge: reversing direction | explain + predict | 8 | |
| 3 | The TB6612 controller IC and its truth table | explain + read the table | 8 | datasheet moment |
| 4 | First exercise — manual direction control | **do** (predict from the table, then wire and verify) | 20 | **PROTECTED — do not compress** |
| 5 | PWM: controlling speed by switching | explain + predict | 8 | **the live cut — compress to ~5 if behind** |
| 6 | Second exercise — run the PWM demo | **do** (run `TTmotor_ramp.c`, read the scope) | 12 | continues from Part 4 wiring |

Intro/agenda ~2, homework hand-off ~2. Total ~66. **Recovery rule (for the
instructor, not the book):** if Part 4 overruns, Part 5 is the compressible part —
its concept is carried by the pre-class reading (B-2). Part 4 and Part 6 (the two
halves of the crucial step) are protected. Part 6 is eased because it is **not a
fresh build**: it moves three jumpers from the manual rails to PA5/PA6/PA7.

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
