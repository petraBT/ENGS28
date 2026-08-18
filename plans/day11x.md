# Day 11x — Writing the PWM Code (lesson plan)

**Day 11x is a Wednesday x-hour: 50 minutes.** The rule, from `CLAUDE.md`'s
standing facts: Day N with N odd is a Tuesday, 110 min; Day N**x** is a Wednesday
x-hour, **50 min**; Day N with N even is a Thursday, 110 min. Day 11's plan was
built to ~66 minutes against a real 110, and that one wrong premise thinned every
Part in the chapter. Fifty minutes is genuinely short: **the budget decides the
scope here, not the other way round.**

**There is no pre-class reading for this day** (Petra, 2026-08-18), so this plan
covers the in-class section only. Chapter `source/ch-motors.ptx`, a new section at
the placeholder near the end. Day 11 is passed — do not touch it.

Ground truth: `plans/day11x-ground-truth.md`. Her deck:
`assets/ClassSlidesOLD/Day11x-Motors(2).pptx`, 21 slides. Driver:
`assets/starters/TTmotor_ramp.c`. Downstream: **Lab 6**.

---

## Objectives — after Day 11x a student can

1. Name, for each configuration step of a PWM channel, which STM32C031C6 register
   does that job, and find it in RM0490 §17.4 rather than recalling it.
2. Explain from RM0490 Figure 176 why `TIM14_CCR1` sets the HIGH time and
   `TIM14_ARR` sets the period, and from Figure 177 why `TIM14_CCER` is what
   actually lets the waveform reach PA7.
3. Turn a register name into a register value: read a bit-field diagram, and check
   that a line of C puts the bits where the manual says they go.
4. Read `TTmotor_ramp.c` as the model for the Lab 6 `tb6612.c` driver — which of
   its parts become the initialization, mode-select and speed-select functions.
5. State which single register a running program writes to change the motor's
   speed, and why nothing else has to be touched.

## THE CRUCIAL STEP (P-2), one sentence

By the end of class every student can point at any line of `tim14_pa7_pwm_init()`
and say which register it writes and what that register does — and can say, without
looking, that the one register their Lab 6 speed-select function writes while the
motor is running is **`TIM14_CCR1`**.

*(Scaffolded to the slowest student: the Part 2 activity is a paper lookup with the
manual open and is answered in full on the reveal slide, so a student who finds
none of the ten registers still leaves with the mapping written down. Part 4 reads
code that is already in the repo — nothing to type, nothing to build, so no student
is locked out by a toolchain.)*

## THE STRETCH (P-3)

`act-day11x-stretch`, for students who finish Part 4 early: the commented-out pair
of `#define`s directly beneath the active ones in `TTmotor_ramp.c` is the 50 Hz
alternative that Day 11's stretch asked them to *predict* — and that Lab 6 offers
as its optional experiment. Work out what prescaler and reload actually give 50 Hz
from a 12 MHz clock, and check the two commented lines against your own arithmetic.

This is the day's best stretch because **it is a real defect**: as written the two
lines give 500 Hz, not 50 Hz (the `#define` says 12 where its own comment says
120 — see ground truth §1a). A student who does the arithmetic finds it. Pending
Petra's answer on whether the file gets corrected; if it does, the stretch becomes
"predict, then change the two lines and listen", which is better still.

Second stretch, for the Lab 6 seam: `TTmotor_ramp.c` has an initialization
function and a speed function, but its *direction* logic sits inline in `main()`.
Lab 6 asks for a mode-select function. Sketch its signature.

## Datasheet / reference-manual moments (P-11)

- **Part 2:** students find each register themselves in **RM0490 §17.4, *TIM14
  registers*** (RM PDF page 482). Her references slide also cites **Williams,
  Chapter 10, pp 199–206**, start of chapter to "Initializing Timers".
- **Part 3:** **RM0490 Figure 176** (*Capture/compare channel 1 main circuit*) and
  **Figure 177** (*Output stage of capture/compare channel (channel 1)*), both RM
  PDF page 476, both inside the TIM14 chapter. **§17.3.8, *PWM mode***, page 479,
  is where `0110` = PWM mode 1 is stated.
- **Part 4:** the CCMR1 / CCER / CR1 bit-field tables in §17.4 — the lookup that
  turns `TIM_OC1_PWM1 << TIM_CCMR1_OC1M_Pos` from an incantation into something
  checkable.

## What Day 11 already did — and how this day starts from it

`act-day11-pwm` is passed and already covers **PA7 → `TIM14_CH1`, AF4** (datasheet
Table 12, p. 30), the **`MODER`/`AFR`** operations, and the **prescaler and
auto-reload arithmetic** for 1.6 kHz in 1250 steps. Day 11's homework was to work
through `TTmotor_ramp.c` with §17.3.8 and §17.4 open.

So two of the ten questions in her slide 5 are recall, not new work. The activity
says so out loud, and the room spends its minutes on the clock-enable pair,
`CCMR1`, `CCER`, `CR1`, and the punchline `CCR1` — the register-level walkthrough
Day 11 deliberately deferred.

---

## The scoping decision — recorded, not allowed to happen silently

**Her 21 slides do not fit in 50 minutes.** Slides 2–16 are the PWM code; slides
17–21 begin motor speed sensing, which is a second topic and is where Day 12
starts. Her own slide-21 speaker note describes that material as *"Tomorrow in
class."* Day 12 is a Thursday, 110 minutes.

**Decision taken to Gate 1:**

- **Slides 20 and 21 move wholly to Day 12** — the table discussion (detect edges →
  rpm → can you get direction?) and the decoding arithmetic Δθ = 2π/#slots. Lab 6
  confirms this is safe: it says students derive `RPM = 60 × PPS / 20` **in the
  reading quiz**, so the arithmetic is not stranded by moving it.
- **Slides 17–19 collapse to one closing motivation slide** — the slotted wheel and
  the photointerrupter trace, about two minutes, buying the hand-off her note asks
  for without opening the topic.
- **Slides 3 and 4 shrink to a recall paragraph.** Day 11 teaches the H-bridge and
  the TB6612 wiring in full and already has `fig-tb6612-wiring-2`.

**What has no room, stated plainly:** her slides 20 and 21. **Why:** they are the
front of Day 12's 110 minutes, and keeping them here would cost Part 2 or Part 4 —
the two Parts Lab 6 actually depends on.

Everything else survives. Slides 8 and 9 both stay: 8 is where `CCR1` and `ARR`
live, 9 is where `CCER` lets the waveform out, and Part 2's activity names both.

---

## Why Lab 6 sets this day's shape (P-13)

Lab 6's first deliverable is a **modular `tb6612.c` device driver** with an
initialization function, a mode-select function, and a speed-select function, and
it specifies *"configure Timer 14, Channel 1 as a 1.6 KHz PWM generator"* with
*"1250 discrete PWM values"* — exactly the driver's `PSC_FACTOR 6` /
`PWM_TIMER_MAX 1250`.

So `TTmotor_ramp.c` is not just an example to read: **it is the source material for
their lab driver**, and the seam matters. Its `tim14_pa7_pwm_init()` is their
initialization function and `tim14_pwm_set()` is their speed-select function, but
its *direction* logic is inline in `main()` and has no function around it. Part 4
makes that seam visible, because the lab asks them to build the function that is
missing.

Lab 6 also has them test the PWM on Waveforms **before connecting the motor** —
a habit worth naming in Part 4.

---

## The Part sequence, with time budgets

| Part | Minutes | Mode | What |
| --- | --- | --- | --- |
| **1** | 5 | reveal | **The timer as a real peripheral.** RM0490 Figure 165, the TIM14 block diagram — her Day 11 slide 25, dropped from Day 11 without a decision, and this is that decision. Joins Day 11's abstract counter-and-compare picture (`fig-pwm-counter-compare`) to the hardware the rest of the day configures. One-paragraph recall of Day 11 stands in for her slides 2–4 |
| **2** | 15 | **do → reveal** | **Which register does each job.** Her slides 5–7, the day's central activity, with the manual open. Ten questions, ending on *what register controls the speed?* The reveal is her slide 6 verbatim |
| **3** | 9 | explain | **Where those registers sit.** RM Figure 176 — `CCR1` determines T_HIGH, `ARR` determines T_PERIOD — and Figure 177, where `CCER` lets the waveform reach the pin. Her annotated register map (slide 13) ties CNT / PSC / ARR / CCR1 together. Names ST's own `TIM1_CCER` mislabel rather than hiding it |
| **4** | 16 | do → explain | **The code.** `tim14_pa7_pwm_init()` and `tim14_pwm_set()` from `TTmotor_ramp.c`, the CCMR1 / CCER / CR1 bit-fields behind them, brake-before-reverse, and `abs()` on the bipolar ramp. Short verification activity: check one line of C against the bit-field table. Closes on the Lab 6 seam |
| **5** | 5 | explain | **Resolution, and what Thursday is.** Minimum pulse width T₀ = T_p / `PWM_TIMER_MAX` (her slide 16), which answers Day 11's optional stretch for everybody. Then the one motivation slide for speed sensing |

Total **50 minutes**.

## Hand-offs

- **From Day 11:** the pin and the timing arithmetic are done; the demo has been
  watched and the scope trace measured; `TTmotor_ramp.c` was set as reading.
- **To Day 12:** motor speed sensing — the photointerrupter, counting pulses,
  converting to rpm, the 7-segment display, and the potentiometer as a throttle.
  Her slides 17–21 are the seed, with 20 and 21 arriving whole.
- **To Lab 6:** the three-function `tb6612.c` driver, and the habit of testing the
  PWM on Waveforms before the motor is connected.

---

## The outline — Part titles and what each teaches

**Part 1: The Timer Behind the Waveform** *(5 min)*
- Recall from Day 11: a counter runs to a top value, a comparator flips the output
  partway up, and the duty cycle sets the average voltage at the motor.
- Meet the peripheral that actually does it: RM0490 Figure 165, the TIM14 block
  diagram — the prescaler, the counter, the auto-reload register, the
  capture/compare channel.
- What students do: locate, on the block diagram, the three things Day 11 gave
  them numbers for.

**Part 2: Which Register Does Each Job** *(15 min — the crucial step)*
- With RM0490 §17.4 open, in table groups: which reference do we even need, and
  then which register enables the pin's clock, puts the pin in PWM mode, enables
  the timer's clock, sets the prescaler, sets the top value, selects PWM mode with
  the output going HIGH→LOW on compare match, enables the channel output, and
  starts the timer.
- The last question is the one the whole day turns on: **once all of that is in
  place, which register controls the speed?**
- Two of these are Day 11 recall and are marked as such, so the group's time goes
  to the six that are new.
- Reveal: her answer slide, unchanged.

**Part 3: Where Those Registers Sit in the Hardware** *(9 min)*
- Figure 176: the compare shadow register against the counter, and why that makes
  `CCR1` the HIGH time and `ARR` the period. V_avg = V_M × T_HIGH / T_PERIOD.
- Figure 177: the output stage, and why `CCER`'s `CC1E` bit is the difference
  between a correctly configured channel and a pin that stays quiet.
- The register map, annotated: prescaler sets the counting rate, ARR the period,
  CCR1 the HIGH time.
- Named out loud: RM0490 prints `TIM1_CCER` on Figure 177 even though the figure
  is in the TIM14 chapter. The manual is inconsistent; the code is not.

**Part 4: Reading the Driver** *(16 min)*
- `tim14_pa7_pwm_init()`, in the order it runs, each line against the register the
  group named in Part 2.
- From name to value: the CCMR1 bit-fields in output-compare mode, `CC1S` for
  output, `CC1E` in CCER, `UG` in EGR and why an update event is generated before
  the timer starts, `CEN` in CR1.
- Short verification activity: does `TIM_OC1_PWM1 << TIM_CCMR1_OC1M_Pos` really
  land `0110` in the OC1M field the manual shows?
- `tim14_pwm_set()`: the clamp, and the single assignment to `CCR1`.
- The ramp's two remaining puzzles, from her slides 14 and 15: forcing a brake
  before a direction change, and why `abs()` is needed on a bipolar ramp.
- The Lab 6 seam: these two functions are the lab's initialization and speed-select;
  the direction logic in `main()` is the mode-select function the lab asks them to
  write.

**Part 5: Resolution, and Thursday** *(5 min)*
- The smallest step the program can ask for: T₀ = T_p / `PWM_TIMER_MAX`, and what
  that is in volts on this motor — the answer to the Day 11 stretch that only some
  students reached.
- One slide of motivation: a slotted wheel, a photointerrupter, and a scope trace
  whose pulses crowd together as the motor speeds up. Thursday we count them.

---

## Risks

- **Part 2 overruns.** It is the crucial step and the most likely to eat Part 3.
  Mitigation: the reveal slide is complete, so it can be cut short without loss;
  Part 3 is the compressible one, not Part 4.
- **Part 4 is dense** — five slides of register bit-fields in sixteen minutes. The
  verification activity is the pressure valve: it can be a 60-second show of hands
  rather than group work.
- **The 50 Hz defect** (ground truth §1a) is unresolved. If Petra corrects the file
  the stretch improves; if not, the stretch must not tell students the file is
  right. Written to survive either answer.
