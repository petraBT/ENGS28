# Day 11x — Writing the PWM Code (lesson plan)

**Day 11x is a Wednesday x-hour: 50 minutes.** The rule, from `CLAUDE.md`'s
standing facts: Day N with N odd is a Tuesday, 110 min; Day N**x** is a Wednesday
x-hour, **50 min**; Day N with N even is a Thursday, 110 min. Day 11's plan was
built to ~66 minutes against a real 110, and that one wrong premise thinned every
Part in the chapter. Fifty minutes is genuinely short: **the budget decides the
scope here, not the other way round.**

**The Parts are budgeted to 46 minutes, not 50.** The remaining four are settling,
pulling up the reference manual, table-group formation, and the four inter-Part
transitions. Gate 1 found the first revision of this plan summing to exactly 50
with none of that named, which put the room inside Part 4 when the hour ended and
silently dropped Part 5.

**There is no pre-class reading for this day** (Petra, 2026-08-18), so this plan
covers the in-class section only. **This day involves no wiring** — every Part is
the manual, figures and code-reading. Chapter `source/ch-motors.ptx`, a new section
at the placeholder near the end. Day 11 is passed — do not touch it.

Ground truth: `plans/day11x-ground-truth.md`. Gate 1 review applied:
`reviews/day11x-gate1.md`. Her deck: `assets/ClassSlidesOLD/Day11x-Motors(2).pptx`,
21 slides. Driver: `assets/starters/TTmotor_ramp.c`. Downstream: **Lab 6**.

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
   its parts become `motor_init()`, `motor_mode()` and `motor_speed()`, and which
   of them is main-loop policy that stays out of the driver.
5. State that once the channel is configured, changing the motor's speed touches
   **`TIM14_CCR1` and nothing else** while the motor is running.

## THE CRUCIAL STEP (P-2), one sentence

By the end of class every student can point at any line of `tim14_pa7_pwm_init()`
and say which register it writes and what that register does — and can say that
once that function has run, changing the speed touches `TIM14_CCR1` and **nothing
else**.

*(The second half is deliberately not "the speed register is CCR1", which
`sl-day11-counter-compare` already told them a week ago. What is new is the
**closure** — that no other register is touched again while the motor runs.)*

*(Scaffolded to the slowest student: Part 2's reveal is complete and covers every
row regardless of what a table found, so a student who finds nothing still leaves
with the whole mapping written down. Part 4 reads code already in the repo —
nothing to type, nothing to build, so no student is locked out by a toolchain.
**Note the limit:** this protects Objective 5, not Objective 3 — a student who
loses the thread at the bit-fields has no equivalent reveal to fall back into.)*

## THE STRETCH (P-3)

`act-day11x-stretch`, for students who finish Part 4 early. **Write the body of
`motor_mode()`** — the Lab 6 function whose signature the handout already prints:

```c
void motor_mode(uint8_t mode);   // FWD, REV, BRAKE, STOP
```

working from Day 11's `fig-tb6612-truth-table`. The point is the fourth case:
`TTmotor_ramp.c` produces only three of the four modes — CW, CCW and short brake —
and **never STOP**, so the driver in front of them is not a complete answer. That
pulls Day 11's brake-versus-stop distinction forward into the place where it is
graded.

*(Gate 1 killed the previous stretch, "sketch its signature": Lab 6 p. 2 prints the
signature, so that was a lookup, not work — P-17.)*

Second stretch, for the arithmetic-minded: the commented-out pair of `#define`s
beneath the active ones is the 50 Hz alternative Day 11's stretch asked them to
predict and Lab 6 offers as its optional experiment. Work out what prescaler and
reload actually give 50 Hz from a 12 MHz clock, and check the two commented lines
against your own arithmetic. **It is a real defect** — as written they give 500 Hz
(the `#define` says 12 where its own comment says 120; ground truth §1a). A student
who does the arithmetic finds it. Pending Petra's answer on whether the file gets
corrected; written to survive either answer, and it must not tell students the file
is right.

## Datasheet / reference-manual moments (P-11)

- **Part 2:** students navigate to **RM0490 §17.4, *TIM14 registers*** (RM PDF page
  482) themselves. The activity **gives the navigation path** — link, section name,
  page — the way `act-day3-ref-manual` does, because that is the only prior
  manual-navigation exercise this course has run and it handed over the section
  number. **§17.3.8, *PWM mode*** (page 479) is where `0110` and `0111` are defined.
- **Part 2 reveal:** her slide 7's **Williams, Chapter 10, pp 199–206**, start of
  chapter to "Initializing Timers" — her only pointer to the textbook, and it
  belongs on the reveal where she put it.
- **Part 3:** **RM0490 Figure 176** (*Capture/compare channel 1 main circuit*) and
  **Figure 177** (*Output stage of capture/compare channel (channel 1)*), both RM
  PDF page 476, both inside the TIM14 chapter.
- **Part 4:** the CCMR1 / CCER / CR1 bit-field tables in §17.4.

---

## What students already have — the recall boundary, corrected

Gate 1's largest finding: the first revision of this plan said two of her slide 5's
ten questions were recall. **It is seven.** Verified against source, not memory:

| Her question | Answer | Already taught |
| --- | --- | --- |
| Which reference? | Reference Manual | — (genuinely open) |
| Clock to the pin | `RCC_IOPENR` | Day 11 `inst-day11-pwm`; named in Day 8 |
| Pin to PWM mode | `GPIOA_MODER`, `GPIOA_AFR[0]` | Day 11 — students **wrote** these (`task-day11-pwm-config`) |
| Clock to TIM14 | `RCC_APBENR2` | **Day 8**, `ch-timers-interrupts.ptx:731–848`, for TIM14 by name |
| Prescaler | `TIM14_PSC` | **Day 8**, same passage |
| Auto-reload | `TIM14_ARR` | **Day 8**, same passage; and `sl-day11-counter-compare` by mnemonic |
| **PWM mode, HIGH→LOW on compare match** | **`TIM14_CCMR1`** | **NEW** |
| **Enable CH1 output** | **`TIM14_CCER`** | **NEW** |
| Enable the timer | `TIM14_CR1` | **Day 8**, same passage |
| What controls the speed | `TIM14_CCR1` | `sl-day11-counter-compare` by mnemonic |

Also already taught, and easy to re-derive by mistake: **`TIM14->EGR |= TIM_EGR_UG`
was covered on Day 10** (`ch-i2c.ptx:1663–1673`) with the same reasoning and an
`<xref>` to Day 8's buffered register. The *bit* is not new. The *question* — why
the update event must precede `CEN` — has never been asked of students; Day 10
delivered it as an aside in an AI-review debrief.

**Terminology:** use **"buffered"**, the term Day 8 and Day 10 already use
(`ch-timers-interrupts.ptx:648`, `ch-i2c.ptx:1666`). RM0490 says "shadow register"
for the same mechanism; say so once rather than introducing a second name for one
idea. "Shadow register" appears nowhere in `source/`.

---

## Why Lab 6 sets this day's shape (P-13)

Lab 6 p. 2 prints the driver's prototypes, and *"the mode and speed (PWM) controls
are separated for flexibility"*:

```c
void motor_init(void);                 // Set ports for PWM, IN1, IN2
void motor_mode(uint8_t mode);         // FWD, REV, BRAKE, STOP
void motor_speed(uint16_t pwm_value);  // interacts with TIM14
```

So `TTmotor_ramp.c` is the source material for their lab driver, and **the seam
matters — the first revision of this plan got it wrong.** Correctly:

| Lab 6 function | Comes from |
| --- | --- |
| `motor_init()` | `tim14_pa7_pwm_init()`, **merged with** the PA5/PA6 output setup that currently sits in `main()` (driver lines 51–57) — and including `TIM14->CCR1 = 0;`, the one safety line in the init |
| `motor_speed()` | `tim14_pwm_set()`, almost unchanged |
| `motor_mode()` | **Day 11's truth table** (`fig-tb6612-truth-table`) — a four-mode wrapper |

**What does *not* become `motor_mode()`:** the inline direction logic in `main()`
(driver lines 87–104). That is the *ramp's* brake-before-reverse decision — main-loop
policy, not a driver concern, and it produces only three of the four modes. A
student who sketches `motor_mode()` from that block copies ramp-specific state
logic into their driver.

**That is the teaching point, and it is better than the one it replaces:** the
driver exposes mechanism; `main()` holds policy.

Lab 6 also has them test the PWM on Waveforms **before connecting the motor** — a
habit worth naming in Part 4 — and its Deliverable 1 screenshots have to resolve
the duty cycle, which is what makes Part 5's T₀ concrete.

**This day is not only Lab 6 prep.** `ch-servos.ptx:369–407` (Day 15) and
`ch-photosensors.ptx:401` (Day 16) both reuse `TIM14->CCMR1`/`CCER`/`EGR`/`UG` on
PA7/CH1 **without re-teaching it**, and `ch-timers-interrupts.ptx:1965–1970`
promises *"input filtering, capture/compare, and output control… all of it returns
in the motor chapters."* Day 11x is where that promise is paid.

---

## The scoping decision — recorded, and confirmed at Gate 1

Her 21 slides do not fit 50 minutes. **Decision, confirmed by
`checker-arc-fidelity` against three independent lines of evidence:**

- **Slides 20 and 21 move wholly to Day 12.** Her own slide-21 speaker note is a
  Day 12 lesson plan (*"Tomorrow in class…"*); Lab 6 p. 5 sources
  `RPM = 60 × PPS / 20` from **the reading quiz**, so the arithmetic is not
  stranded; Day 12 is a 110-minute Thursday that needs a front end.
- **Slides 17–19 collapse to one closing motivation slide.** Keeping all three
  costs two minutes out of Part 4, the day's most over-packed block.
- **Slides 3 and 4 shrink to a recall sentence** with a `refPage` to
  `fig-tb6612-wiring-2` and no slide of their own. Verified: `subsec-day11-direction`
  teaches the regulator board, VM at 5 V vs VCC at 3.3 V, the shared ground and
  "every 5 V wire stays on the motor side" — the whole of her slide 4 including its
  speaker note.

**What has no room, stated plainly:** her slides 20 and 21. **Why:** they are the
front of Day 12's 110 minutes, and keeping them costs Part 2 or Part 4 — the two
Parts Lab 6 depends on. Arc fidelity was asked whether it would have cut something
else instead and said no: the only other candidate, her slide 12, must stay,
because `CC1E` and `UG` are the two bits students cannot get from any previous day.

**Recorded for Day 12's Gate 0:** the `RPM = 60 × PPS / 20` derivation must live in
Day 12's Before-Class section, since Day 11x has no reading and Lab 6 sources it
from a quiz.

---

## The Part sequence

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| **1** | 4 | do → reveal | **The timer as a real peripheral.** RM0490 Figure 165, her Day 11 slide 25 — dropped from Day 11 without a decision, and this is that decision. Joins Day 11's counter-and-compare picture to the hardware the day configures. Slides 2–4 become one recall sentence, no slide |
| **2** | 14 | **do → reveal** | **Which register does each job.** Her slides 5–7, rebuilt: the seven recall rows pre-filled with the day each came from, then three real discoveries. The day's crucial step |
| **3** | 8 | predict → explain | **Where those registers sit.** Figures 176 and 177, and her annotated register map |
| **4** | 15 | **do → explain → do** | **The code.** Bit-fields decoded by students *before* the walkthrough, then `TTmotor_ramp.c`, closing on an individual checkpoint and the Lab 6 seam |
| **5** | 5 | predict → explain | **Resolution, and Thursday.** T₀ as a *time*, and the one motivation slide |
| — | **4** | — | **Settling, manual open, group formation, four transitions** |

Total **50 minutes**, of which **46 are taught**.

**The pressure valve is her slide 13** — the annotated register map — whose unique
content is only the prescaler → counting-rate link, since Figure 176 already
annotates ARR → T_PERIOD and CCR1 → T_HIGH. Not Part 3 wholesale: Part 4's
bit-fields are built on Part 3's figures, so cutting Part 3 does not recover time,
it pushes the overrun downstream. **What must never absorb an overrun is Figure
177's `CC1E`** — that is the "my pin is silent" bug Lab 6 students hit at 11 pm.

Second valve, if the clock reads past minute 42: brake-before-reverse and `abs()`
get named, not walked line by line. They are lower-stakes than the `CCR1` closure.

---

## The outline — Part titles and what each teaches

**Part 1: The Timer Behind the Waveform** *(4 min, do → reveal)*
- One sentence of recall for her slides 2–4, with a `refPage` to
  `fig-tb6612-wiring-2`. No slide of its own — Day 11 covers it in full.
- Meet the peripheral: RM0490 Figure 165, her annotation — the prescaler, the
  counter, the auto-reload register, the capture/compare channel.
- Students locate, on the projected figure, the three things Day 11 gave them
  numbers for. Show of hands, not group work.
- **P-15 condition: project her annotation and add nothing.** Labelling the
  "Output control" block with CCER, or the compare block with CCMR1, would answer
  Part 2 inside a figure. Leave a source comment saying the omission is deliberate,
  because the next pass will helpfully fill it in.

**Part 2: Which Register Does Each Job** *(14 min, the crucial step)*
- Opens with the navigation path, in the shape `act-day3-ref-manual` uses: the
  `<url>` link, §17.4 *TIM14 registers*, page 482 — before the first question.
- Says out loud, at the start, that the reveal covers every row regardless of what
  a table finds.
- **The recall pre-fill, ~2 min:** her slide 5 with seven rows already answered and
  labelled with the day each came from. *You already know eight lines of this
  driver.*
- **Three discoveries, ~8 min**, in table groups, with the manual open:
  1. §17.3.8 defines `0110` and `0111`. Which one holds the pin HIGH up to the
     compare value and then drops it — and what would the scope trace look like if
     you chose the other? *(CCMR1)*
  2. Find `CC1E` in CCER. What does PA7 do if that one line is deleted from the
     init? *(CCER)*
  3. The driver writes one register none of the rows asked about. Find it in §17.4,
     and say why it is written **before** the counter is enabled. *(EGR/UG — recall
     from Day 10, but the question has never been asked; the reveal deepens rather
     than introduces)*
- **Checkpoint at ~minute 7:** confirm every group is actually in §17.4 before the
  rest of the activity depends on it.
- **Fast groups get forward motion**, not idle time: predict what `CCR1` holds
  after `tim14_pwm_set(625)`, and what duty cycle that is.
- **Reveal, ~4 min:** her slide 6 layout exactly — same rows, same geometry,
  answers added in place. Not a two-column question/answer table; the row-for-row
  identity is what makes it readable from the wall. Williams pp 199–206 goes here.

**Part 3: Where Those Registers Sit in the Hardware** *(8 min, predict → explain)*
- **Opens with a prediction**, not an explanation: recall the scope trace from
  `fig-pwm-scope` — the HIGH width changing while the period stays fixed. Which of
  `CCR1` / `ARR` is the ramp rewriting every two seconds?
- Figure 176: the compare **buffered** register against the counter, and why that
  makes `CCR1` the HIGH time and `ARR` the period. V_avg = V_M × T_HIGH / T_PERIOD.
  Name RM0490's "shadow register" as its word for Day 8's buffered register.
- Figure 177: the output stage, and why `CCER`'s `CC1E` is the difference between a
  configured channel and a silent pin.
- Her register map (slide 13), annotations in place — the compressible item.
- `refPage` Figure 165 again at the head of this Part: Fig 176 is the expansion of
  its "Capture/compare 1 register" block, Fig 177 of its "Output control" block. No
  new figure, no new minutes, and twenty minutes will have passed since Part 1.
- The `TIM1_CCER` mislabel is a **caption note**, not a spoken aside — Part 3 is
  already carrying two dense figures.

**Part 4: Reading the Driver** *(15 min, do → explain → do)*
- **Decode first, walkthrough second** (P-6 — the first revision explained the
  bit-fields before asking students to check one, which answers the activity ahead
  of itself). Students are given the bit-field tables, already open from Part 2, and
  the bare driver lines, and work out **in writing** what lands in `OC1M`, what
  `CC1E` sets, what `CEN` sets — before any narration.
- Then `tim14_pa7_pwm_init()` in the order it runs, one beat per field — the
  structure `TTmotor_ramp.c` already has, a comment above each block. Not five field
  names in one sentence.
- `UG`/`EGR` flagged as **Day 10 recall**, tied back to the buffered register, so it
  is not re-derived.
- `TIM14->CCR1 = 0;` named: the one line of the init that is safety rather than
  configuration, and Lab 6's `motor_init()` needs it.
- `tim14_pwm_set()`: the clamp, and the single assignment to `CCR1`. Instructor note
  — the `value < 0` branch is unreachable on a `uint16_t`; a student reading
  carefully will ask.
- The ramp's two asides (her slides 14, 15): **point at** the brake-before-reverse
  code and recall the why from Day 11 rather than re-deriving it; `abs()` on a
  bipolar ramp.
- **Individual checkpoint, 90 seconds:** a stripped, uncommented copy of
  `tim14_pa7_pwm_init()`; write the register name beside each line from memory; then
  reveal against the driver. This is the actual test of the crucial step, and it is
  the first moment in the day a student produces the mapping unaided.
- **The Lab 6 seam**, per the table above — including what does *not* become
  `motor_mode()`.

**Part 5: Resolution, and Thursday** *(5 min, predict → explain)*
- **T₀ as a time, which Day 11 never gave.** T₀ = T_p / `PWM_TIMER_MAX` =
  625 µs / 1250 = **500 ns**. Predict-then-reveal, 30 seconds.
- Tie it to the 4 mV they already have from `inst-day11-stretch` — **do not
  re-derive the 4 mV**, which Day 11's solution slide already projects. One count of
  `CCR1` = 500 ns of pulse width = 4 mV of average voltage, and that is the
  resolution a Deliverable 1 screenshot has to show.
- One motivation slide: a slotted wheel, a photointerrupter, a scope trace whose
  pulses crowd as the motor speeds up. Must carry her slide 18's note that **the
  sensor is already built into their motor setup**, or students will not look before
  Thursday.

---

## Risks

- **Part 2 overruns.** It is the crucial step. Mitigation: the reveal is complete
  and can be cut short without loss; the minute-7 checkpoint catches a lost group
  before the activity's back half depends on it.
- **Part 4 is still the densest block** even after the EGR item moved to Part 2 and
  the bit-field decode became student work. Its named valve is the brake/`abs()`
  walkthrough past minute 42.
- **The 50 Hz defect** (ground truth §1a) is unresolved. Written to survive either
  answer; must not assert the file is correct.
- **Objective 3 has no safety net.** Part 2's reveal protects Objective 5; a student
  who loses the thread at the bit-fields has nothing equivalent to fall back into.
  Named here rather than left implicit.
