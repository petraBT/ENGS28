# Day 12 — ground truth

Gate 0 for Day 12. Chapter `source/ch-motors.ptx`, at the placeholder comment
after `sec-motors-day11x`. **Day 11 and Day 11x are finished — do not touch
them.**

**Day 12 is a Thursday: 110 minutes.** (`CLAUDE.md`: Day N with N even = Thursday,
110 min. Written out because the 65-minute error has now been made three times in
this course, and Day 11's whole chapter was thinned by it.)

Per the continuation rule in `plans/CHAPTER-GENERATION-PROMPT.md`, this is
**verification, not collection**: `plans/day11x-ground-truth.md` and
`plans/day11x-handover.md` were read in full first, and what follows either
confirms, corrects or adds to them.

---

## 1. What Day 11x handed over, confirmed

The end-of-chapter comment in `source/ch-motors.ptx` (line ~2248) is load-bearing
and it is correct on both counts:

- **Day 12 needs a pre-class reading.** Lab 6 p. 5 says students derived
  `RPM = 60 × PPS / 20` *"in the reading quiz"*. Day 11x has no reading, so the
  derivation has nowhere else to live. **Confirmed against the Lab 6 PDF, §2.5.**
  Petra's "if any" is therefore answered: **yes, there is one.**
- **Her Day 11x slides 20 and 21 belong here**, moved whole at Day 11x's Gate 1.

Day 11x already delivered, at the end of its Part 5, the *motivation* for speed
sensing: `fig-encoder-wheel`, `fig-photointerrupter-video`, `sl-day11x-next` and
`sl-day11x-scope-video`. **So Day 12 does not introduce the optical incremental
sensor — it opens from it** (B-8: each concept taught once). Her Day 12 slide 5
is a repeat of her Day 11x slide 18 almost word for word; see §5.

## 2. The driver — there is none for this day, and that is her arc

`assets/starters/` re-listed fresh (2026-08-24). No `tb6612.c`, no RPM file, no
new motor starter since Day 11x:

```
ADCPot.c  ES28.h  SevenSegPartial.c  SevenSegPartialORIGINAL.c/.h
TTmotor_ramp.c  blinky.c  blinkyTimerInt.c  blinkyTimerPolled.c
counterResetButtonInt.c  counterResetButtonPolled.c  helloDisplay.c
i2c.c  i2c.h  sysinit.c  writeFirstDigit.c
```

**Her own Day 12 deck contains no code slides at all** — ten slides of review
discussion, wiring, oscilloscope, an on-paper conversion exercise and the Lab 6
checklist. So the absence of a driver is not a gap: **Day 12 is the build day.**
The code students write this day is Lab 6's own.

**B-6 consequence:** no listing in this chapter's Day 12 material may contain
invented driver code. The four real files it may quote are `TTmotor_ramp.c`
(Day 11x already quotes it), `ADCPot.c`, `counterResetButtonInt.c` and
`sysinit.c`. Anything else is a worked answer inside `<instructor>`, which P-10
permits for a design activity.

### 2a. `milliseconds()` is real, is required by Lab 6, and is taught nowhere

`assets/starters/sysinit.c` defines it: SysTick reloads at `12000 - 1` from the
12 MHz processor clock, so `SysTick_Handler()` runs at 1 kHz and increments
`currentMilliseconds`; `milliseconds()` returns that counter, and `delay_ms()` is
built on it. The prototype is in `ES28.h`.

**Grepped `source/*.ptx`: `milliseconds()` the function appears in no chapter.**
Only the English word "milliseconds" does. `delay_ms()` is taught on Day 2
(`ch-intro-blinky.ptx:1447`) and used everywhere.

Lab 6 requires it **twice**, and forbids the alternative:

- §2.2: *"In your main loop, use the value returned by `milliseconds()` to sample
  your ADC at a 100Hz rate. Later, you will add other functionality that runs at a
  different frequency, so you may not use `delay_ms()` for timing."*
- §2.5: *"count them for one second... Use the `milliseconds()` function again to
  time your RPM calculation."*

This is a genuine hole between the book and the lab, it is this day's material by
elimination, and it is **new content Day 12 adds beyond her deck** — flagged as
such for Gate 1 rather than slipped in.

## 3. Her decks, mined — both of them

### 3a. `assets/ClassSlidesOLD/Day12-Motors(3).pptx`, 10 slides

| # | Title | Notes |
| --- | --- | --- |
| 1 | Title | — |
| 2 | *Review: Basic DC motor control* | divider |
| **3** | **Discuss At Your Table** | *"How does `TTmotor_ramp.c` work? Do you understand all of the register bits that are set? What questions do you have about the code?"* — the Day 11x homework review |
| 4 | *Motor speed sensing* | divider |
| 5 | *We will use an optical incremental sensor* | 3 photos + speaker note. **Duplicates her Day 11x slide 18**, which Day 11x already delivered |
| **6** | **Exercise #1** | wire the photointerrupter, put the AD2 on its output, run `TTmotor_ramp.c` and watch. 3 annotations + a Fritzing diagram |
| **7** | *Wiring the Fancy Photointerrupter* | the cabled variant: brown = 5 V, pink = LED (optional) to 5 V, black = output, blue = ground. *"Some of you have a photointerrupter with a long cable on it"* |
| 8 | scope video, 30 → 180 rpm | **the same video Day 11x already projects** (`VH0-zO2LpDc`) |
| **9** | **Exercise #2: Photointerrupter → RPM (on paper)** | *"How do you detect the pulses on the microcontroller? How do you count the pulses? How do you convert the count to an rpm?"* |
| **10** | *Complete Lab 6 setup* | hardware + firmware checklist, and the Fritzing diagram of the whole build |

**Slide 5's speaker note, mined for teaching and stripped of stale words:**
*"It's the U-shaped object that's wrapped around the slotted wheel. It has an LED
on one side and a photosensor on the other side."* — and *"Really important that
you get this working before you leave today."* That last sentence is classroom
management (S-25, L-1) and does not go in student-facing text; it is a presenter
note.

**Slide 6's speaker note is stale and must be mined, not copied.** It says
"Arduino" three times and "Scopy" once. Both are wrong for this course (B-11e cuts
Arduino comparisons entirely; the course uses Waveforms). What survives is the
*teaching*, and it is good:

> *"You'll need a pullup resistor on the orange wire since the phototransistor
> doesn't make any current."*

and *"Don't wire the signal wire into the Nucleo yet. For now, just wire power and
ground... We'll observe the signal with [the oscilloscope]."* and *"When you build
this in Lab 6 you'll wire this into the [Nucleo] and so you can just enable the
pullup on that pin."*

That first sentence is her own statement of an **open-collector output**, and it
is the day's best continuity payoff — see §7.

### 3b. `assets/ClassSlidesOLD/Day11x-Motors(2).pptx`, slides 20–21

Moved here whole at Day 11x's Gate 1.

**Slide 20 — *With your table group, discuss:***
- *"Remember how to detect falling/rising edge of the pulse?"*
- *"Once you can detect those, how do you use that signal to find the speed of the
  motor (in rpm)?"*
- *"Is it possible to tell the direction in which the motor turns from the signal?"*

**Slide 21 — *Decoding shaft position from sensor output***, verbatim:
- *"Regardless of technology (mechanical, optical, magnetic), must translate pulse
  train into position / velocity information."*
- *"Decode by counting pulses (rising or falling edges):"*
  - `pulse_count × Δθ` = angular position (relative to zero)
  - `pulse_count / time × Δθ` = avg angular speed over interval of length *time*
  - `Δθ = 2π / #slots` (radians), `360 / #slots` (degrees), `1 / #slots` (revolutions)
- *"With a quadrature encoder (we are not using one), you can count with an up-down
  counter, can get direction as well as position or speed."*
- *"Some sensors do the decoding in hardware, present a result, e.g., via I2C."*

Its speaker note is a Day 12 lesson plan (*"Tomorrow in class…"*) and ends:
*"How do you get the number into the PWM to determine speed? Use potentiometer to
drive the motor. Now you have a throttle! And a sensor that tells you how fast
it's going."*

### 3c. Her slide 20 and her slide 9 are the same activity

Slide 20 asks detect / convert-to-rpm / direction. Slide 9 asks detect / count /
convert-to-rpm. **P-16's corollary forbids the same task twice in one day**, so
they merge into a single activity whose four questions are the union: detect,
count, convert, and can you get direction. Recorded here so the merge is a
decision and not an omission (B-8a).

## 4. Verified hardware facts — and two that contradict each other

### 4a. PA15 is confirmed, from two independent sources that are not her deck

Her slide 10 says *"Wire photointerrupter OUT to PA15."* The Day 12 prompt flagged
this as unverified. **It verifies.**

| Source | What it says |
| --- | --- |
| **UM2953 (`assets/nucleo_user_manual.pdf`) Table 11, *ARDUINO® connector pinout*, p. 20** | CN9 pin 8: **D7 · ARD_D7 · PA15 · I/O** |
| **UM2953 Table 12, *NUCLEO-C031C6 board I/O assignment*, p. 22** | pin 37: **PA15 · ARD_D7** |
| **Lab 6 Figure 1 schematic (p. 3)** | net `ENC_OUT` runs from the photodetector connector to J4 pin 1, labelled **7** |
| **Her slide 10 Fritzing diagram** | the sensor's OUT wire lands on the header pin silkscreened **D7** |

So the pin is **D7 (PA15)**, written with both names per `CLAUDE.md`. This is also
a real datasheet moment (P-11): the lookup is UM2953 Table 11, and it is a lookup
students can do themselves.

**EXTI consequence, verified against RM0490 by extraction (P-11), not memory:**

| Fact | Source |
| --- | --- |
| `EXTI_EXTICR4` is at offset **0x06C**, and its top byte is **`EXTI15[7:0]`** | RM0490 §12.5.9, Table 47, *EXTI controller register map* (PDF p. 229) |
| Lines 4–15 share vector position 7, `EXTI4_15` | already in the book, `subsec-gpio-ref-registers`, from RM0490 §11.3 Table 40 |
| In CMSIS, `EXTI_EXTICR4` is `EXTI->EXTICR[3]` | the off-by-one trap `counterResetButtonInt.c` states twice |

So a falling-edge interrupt on PA15 is Day 9's five moves with 15 for 4 and
`EXTI_PA` for `EXTI_PB`, **and it lands in the same handler Day 9 wrote**,
`EXTI4_15_IRQHandler`.

### 4b. The other pins of the Lab 6 build, read off her schematic

Lab 6 Figure 1 (p. 3), rotated and read at 4800 px:

| Net | Nucleo header | STM32C031C6 pin | Agrees with |
| --- | --- | --- | --- |
| `AIN1` | D13 | PA5 | `TTmotor_ramp.c` header comment |
| `AIN2` | D12 | PA6 | `TTmotor_ramp.c` header comment |
| `PWMA` | D11 | PA7 (TIM14_CH1) | Day 11 / Day 11x |
| `ENC_OUT` | **D7** | **PA15** | §4a |
| `TARGET_SPEED` (pot wiper) | **A0** | **PA0** | `ADCPot.c` |
| `SCL` / `SDA` | D15 / D14 | PB8 / PB9 | Day 10 |

### 4c. Two contradictions in her own sources — do not resolve them by guessing

**(i) The potentiometer's top rail.** Lab 6's *schematic* wires the 10 kΩ pot's
terminal 1 to the **+5V** net and its wiper to **A0 (PA0)**. Lab 6's *prose* (§2.2)
describes the pot as spanning **0 V → 1.65 V → 3.3 V**, which is only true on a
3.3 V rail. And Lab 6 §2.3 warns in a box: *"DO NOT connect the 5V output to your
power rail on the breadboard. You will damage the Nucleo."* Five volts on PA0 is
outside the analog input's range on a 3.3 V part.

The schematic is dated **2022-11-29** and predates this version of the course, so
the `+5V` label there is most likely legacy. **Question 1 to Petra.** Nothing is
written into the book about the pot's rail until she answers; the reading and the
skeleton say **3.3 V**, which is what her own prose and `ADCPot.c` both require,
and the source carries a comment saying why.

**(ii) The photointerrupter's supply.** Her slide 6 annotation says *"The
photointerrupter needs a 5V voltage supply."* Lab 6's schematic agrees: the
"Motor and Photo Dectector" connector takes **+5V** on pin 1 (red or brown wire),
GND on pin 4 (black or blue), and `ENC_OUT` on pin 3 (white or black). Her
slide 7 gives the cabled variant the same way (brown = 5 V, blue = ground).

**CORRECTED AT GATE 2′ — I traced this wrong, and the correction matters.** The
first version of this section said her Fritzing wires VCC to the 3.3 V rail and
therefore contradicts her annotation. Re-traced at 8× on pad centres after two
reviewers disagreed with each other:

| wire | lands on | node |
| --- | --- | --- |
| red, short | the **Vcc** pad's column | the `+` rail, fed by the Nucleo's 3V3 — logic power |
| light-blue jumper, row J | left end on the **VM** pad's column, right end at col ≈61 | motor power |
| long blue, row I, from the sensor | col ≈61 — the same column as the jumper's right end | therefore **VM** |

**The sensor's VCC goes to the TB6612's `VM` pin — the motor supply.** So her
drawing, her *"needs a 5V voltage supply"* annotation and Lab 6's schematic all say
the same thing, **there was never a contradiction on that slide**, and the
open-collector level translation the day teaches is now *sourced* rather than
assumed.

Two things follow. Her slide 6 **does not draw the regulator**, so `VM` is unpowered
in that picture — which is why `fig-day12-wiring`'s caption now says the 9 V adapter
and the regulator are still connected but not drawn. And her speaker note says *"just
wire power and ground to **logic** power and ground"*, which is the one thing still
genuinely open: see Question 2, narrowed.

Lab 6 §2.5 is unambiguous about the half that matters for the chip: *"pull the OUT
terminal up with an internal pullup resistor or a 10 kΩ resistor to **3.3 V**."*
The book teaches only that, and says nothing about the sensor's own supply.

### 4d. The part, and the slot count

The photointerrupter is an **Omron EE-SX672** — read off the body in her slide 5
photo at 3× zoom (`EE-SX672`, and `OUT` silkscreened beside the pins). Adafruit
sells it as product 3985; the encoder wheels are Adafruit 3782.

**There is no EE-SX672 datasheet in `assets/datasheets/`** (checked: the folder
holds TB6612FNG and the Day 5X/Day 6 parts only). So no numeric claim about the
sensor — supply range, output current, response time — may be written from
plausibility (B-11c). **Question 3 to Petra: may we add it to the repo?** Without
it the day's datasheet moment is UM2953 Table 11, which is in the repo and is a
better lookup anyway.

**Twenty slots.** Lab 6 §2.5 prints `RPM = 60 × PPS / 20`, which fixes the count at
20. Her wheel photo is consistent with 20 but a photograph is not a source. The
reading derives the general form and then substitutes 20 **citing Lab 6**, and the
in-class activity asks students to count the slots on their own wheel — which is
both the honest way to get the number and a real task (P-17).

## 5. What Day 11x already delivered — do not deliver it twice

Checked against `source/ch-motors.ptx` lines 2175–2264:

| Already in the book, Day 11x Part 5 | Day 12 must not repeat |
| --- | --- |
| `fig-encoder-wheel` — the slotted wheel and photointerrupter photo, 222 rpm on the display | her Day 12 slide 5's third photo |
| `fig-photointerrupter-video` — the 30 → 180 rpm scope capture (`VH0-zO2LpDc`) | her Day 12 slide 8 is the same video |
| `sl-day11x-next` — *optical incremental sensor* defined as a term, the wheel, the beam, *"the rate those pulses arrive at is proportional to how fast the shaft is turning"*, and *"this is already built into your motor setup"* | her Day 12 slide 5's bullets |
| `sl-day11x-scope-video` — *"On Thursday we'll count them, turn them into rpm, and put the number on the seven-segment display"* | — |

**So her Day 12 slides 5 and 8 are dropped as duplicates**, and Day 12 opens from
what Wednesday left standing. This is a recorded decision, not an absence (B-8a).

The one thing worth carrying from slide 5 that Day 11x did **not** say is the
sensor's *construction* in her words — LED on one side, photosensor on the other,
U-shaped and wrapped around the wheel — which belongs in the pre-class reading
where the sensor is being explained rather than pointed at.

## 6. What the rest of the book already taught — the recall boundary

Verified against source, not memory. This is what Day 12 may lean on and must not
re-derive.

| Day 12 needs | Already taught | Where |
| --- | --- | --- |
| Falling-edge detection on a pin: EXTICR, FTSR1, IMR1, NVIC, FPR1, the handler | **Day 9**, in full, and students wrote it | `subsec-day9-exticr`, `subsec-day9-ftsr-imr-nvic`, `subsec-day9-isr`, `subsec-day9-code`; `counterResetButtonInt.c` |
| That a polled loop misses events while it is blocked | **Day 9 Part 2**, as a live demonstration | `subsec-day9-polled`, *"The Press the Polled Counter Misses"* |
| `volatile` on a flag shared with an ISR | **Day 9 Part 7** | `subsec-day9-race` |
| An open-drain output, and why it needs a pull-up | **Day 10 Part 6** | `subsec-day10-pins`, `fig-open-drain` |
| Internal pull-ups via `PUPDR` | **Day 3**, and again in `counterResetButtonInt.c` | `ch-switches.ptx` |
| Reading a pot with the ADC on PA0, and `ADC1->DR` | **Day 7** | `subsec-adc-day7-code`, `ADCPot.c` |
| Driving the four-digit display: `SevenSeg_init/write/number`, the buffer, the colon, a minus sign | **Day 10**, and the homework wrote the signed counter | `subsec-day10-first-digit`, `subsec-day10-driver`, `act-i2c-homework` t2, `subsec-i2c-ref-ht16k33` |
| The TB6612 truth table, the 5 V regulator, the shared ground | **Day 11** | `subsec-day11-tb6612`, `subsec-day11-direction` |
| TIM14 as a PWM channel, and that speed is `CCR1` and nothing else | **Day 11x** | `sec-motors-day11x` |
| **`milliseconds()` and non-blocking main-loop scheduling** | **nowhere** | §2a |

**Consequence for the seven-segment display:** it is *handed off*, not retaught —
*"you already have `SevenSeg_number()` and you already wrote the minus sign for the
signed counter"* — with the lookup pointed at `subsec-i2c-ref-ht16k33`, the
HT16K33 Quick Reference. Recorded here because the Day 12 prompt asked for the
decision to be stated rather than assumed.

## 7. The teaching point this day is built on, and it is hers

Her slide 6 note: *"You'll need a pullup resistor on the orange wire since the
phototransistor doesn't make any current."*

That is an **open-collector output**, and it behaves the same way as the
open-drain outputs Day 10 spent a whole Part on (`subsec-day10-pins`,
`fig-open-drain`: *"the transistor to 3.3 V is gone"*, so *"the only route from
3.3 V is through the pull-up resistor"*). Second encounter, different consequence:

- on Day 10 the point was that open-drain is what lets several devices share one
  wire without fighting;
- here the point is that an output which can only pull **down** takes its HIGH
  level from whatever the pull-up is tied to — so the sensor can hand a 3.3 V-safe
  signal to PA15 **whatever its own supply is**, and the pull-up is what makes that
  true.

**Two corrections from Gate 1, and both go into the prose.**

**(a) Say it is the same behavior, not the same mechanism.** Day 10 taught
open-drain as a specific GPIO configuration — a bit in `OTYPER`. This is a
discrete BJT's collector and **there is no `OTYPER` bit on the sensor**. One
clause, so that a student who goes looking for the register does not come up
empty (`expert-continuity-auditor`, `learner-firstgen-novice`).

**(b) The safety claim has a condition, and it is the highest-consequence claim in
the day.** "It cannot pull the line above the pull-up's rail" is true **only if the
sensor's output stage has no internal pull-up to its own supply**. Plenty of
phototransistor modules ship with one; where that is the case, the external 3.3 V
pull-up fights it through a divider and the HIGH level lands somewhere between
3.3 V and 5 V — the very failure the argument exists to prevent. **Nothing in the
repo settles this**, which is what makes Question 3 (the EE-SX672 datasheet) worth
asking: with it, the day's central safety argument becomes a lookup instead of an
assumption (`expert-rigor-hawk`).

It also explains the failure mode Lab 6 warns about in a box (*"The photo
interrupter requires a pullup on the output to function correctly"*): with no
pull-up the pin floats and the trace is noise, which is exactly what a student
sees at 11 pm and cannot explain.

## 8. Downstream — Lab 6, re-read with §2.2, §2.5 and §3 in focus

Constraint, not goal (P-13). Read from `assets/Labs/Lab6_ES28.pdf`, due
**Tuesday 17 February 2026**.

- **§2.1 the driver** — `motor_init()` / `motor_mode()` / `motor_speed()`, TIM14
  CH1 at 1.6 kHz with 1250 discrete values. **Day 11x already delivered this seam**
  (`sl-day11x-lab6-seam`), so Day 12 does not re-teach it.
- **§2.2 the potentiometer** — 0 V full counter-clockwise, 1.65 V stopped with a
  dead band, 3.3 V full clockwise, direction following the knob. Sampled at
  **100 Hz off `milliseconds()`**, and *"you may not use `delay_ms()` for timing."*
  Tested on Waveforms with the motor disconnected.
- **§2.3 the regulator** — the barrel-jack board, 9 V in, 5 V out, **motor power
  only**, never onto the breadboard's power rail. Day 11 taught this
  (`subsec-day11-direction`).
- **§2.5 the RPM indicator** — pull OUT up internally or with 10 kΩ to 3.3 V;
  confirm a square wave on Waveforms whose frequency tracks speed; then *"detect
  pulses, count them for one second, convert to RPM, and display on your computer
  screen. Use negative RPM to indicate the motor is running in reverse. Use the
  `milliseconds()` function again to time your RPM calculation."*
  `RPM = 60 × PPS / 20` is sourced from **the reading quiz**.
- **§3 Final Touches** — the same ±RPM on the seven-segment display.
- **§4 Going Further (optional)** — run the PWM at 50 Hz and compare low-speed
  behavior. Day 11x's `task-day11x-stretch-50hz` already covers the arithmetic.
- **Deliverables** — 1 motor driver + screenshots (8), 2 final design (8),
  3 demonstration (4), 4 RPM display (2).

**Lab 6 never mandates interrupts for pulse detection.** §1.2 lists *"Increase
proficiency with device drivers, timers, and interrupts"* as an objective, and
§2.5 says only "detect pulses". The choice is genuinely open, and §9 is where it
gets made.

## 9. The design decision this day has to make and teach

**Does pulse counting use a GPIO interrupt (Day 9) or a polling loop (Day 7's
idiom)?** Recorded here with the evidence, and taken to Gate 1 as a
recommendation rather than a decision already made.

**For the interrupt:**
1. **The chapter's own objective list already says so** —
   `source/ch-motors.ptx:18`: *"Measure motor speed using a photointerrupter and
   GPIO interrupt."* Written before this session.
2. Her Day 11x slide 20 opens *"Remember how to detect falling/rising edge of the
   pulse?"* — a direct call back to Day 9.
3. Lab 6 §1.2's objective names interrupts.
4. PA15 is EXTI line 15 and shares Day 9's handler, so the transfer is exact
   (§4a).
5. **The arithmetic forces it if the loop is naive.** The wheel has 20 slots, so at
   the 180 rpm of her own scope video the pulse rate is 3 rev/s × 20 = **60
   pulses per second**. Lab 6 §2.2 has the ADC sampled at **100 Hz**. A student who
   puts the pin read inside the 100 Hz beat is sampling a 60 Hz signal at 100 Hz
   and will miss pulses — and Day 9 Part 2 already showed the room a polled counter
   missing a press.

**For polling:**
6. Lab 6 does not require interrupts, and 60 pulses per second is slow. A
   free-running loop that reads the pin every pass — with only the *scheduling*
   done off `milliseconds()` — catches every edge comfortably.
7. **Her slide 9 poses it as an open question**: *"How do you detect the pulses on
   the microcontroller?"* Answering it in the prose ahead of the activity is a P-6
   violation.

**DECIDED AT GATE 1 — converge on the interrupt.** Unanimous among the reviewers
who spoke to it. Her slide 9's question stays open and the room answers it; the
reveal converges on the interrupt; the polled alternative is described honestly
rather than dismissed (S-19). That honors her wording, satisfies P-5/P-6, pays off
Day 9, and lands on the objective the chapter already states.

**But point 5's argument was wrong as stated, and the plan now states it
correctly.** Sampling frequency alone does not decide whether a poll misses a
digital pulse. The condition is **T_poll < the shorter of the pulse's high time and
its low time**, and that is set by the wheel's **duty cycle**, not by the rate. At a
roughly even duty and 60 PPS the high time is about 8 ms against a 10 ms beat, so a
naive poll misses pulses — but the duty cycle is an assumption pending a source, and
the numbers are fragile in the direction that matters: at **120 rpm** the high time
would be about 12.5 ms and a naive poll would be arguably safe.

So the numbers are a **demonstration, not a proof**, and the argument that does not
depend on them is the real one: **the interrupt removes the dependence on the top
speed altogether.** If Question 5 comes back near 120 rpm, Part 4 is rebuilt on that
line and the numbers demoted to an illustration — **not patched with a bigger
number** (`expert-rigor-hawk`, recorded as dissent in `reviews/day12-gate1.md`).

**A second condition, on the arithmetic itself.** `RPM = 60 × PPS / N` assumes **one
counted edge per slot**. Her own slide 21 says *"rising **or** falling edges"*, and
Day 9 handed students `FTSR1` **and** `RTSR1` — so a student who wires any-edge
detection, a completely natural extension of Day 9, gets 2N transitions per
revolution and reports **twice the true rpm** with a formula that never told them
why. The condition is stated on `sl-day12-rpm`, in Stretch 3, and in the Reference
section — and **not in the reading**, where there is no detection mechanism yet and
stating it would leak toward Part 3's second question.

## 10. Figure manifest (P-12)

Composites rebuilt with `pptx_annotate.py --max-text 200` and rendered at the
declared `viewBox` size in headless Chrome before being judged
(`AUTHORING-visual.md` Rule 5). Aspect ratios checked.

| Her slide | Image | Decision |
| --- | --- | --- |
| Day12 s1 | title art | **Drop** — deck furniture |
| Day12 s2, s4 | section dividers, no image | **Drop** — the deck JSON's `section` glue does this |
| Day12 s3 | none | **Keep as an activity**, no figure |
| Day12 s5 | 3 photos: EE-SX672 body, two encoder wheels, the 222-rpm assembly | **Third photo already in the book** as `fig-encoder-wheel` — do not duplicate. **First two are new and wanted**: the sensor body and the slotted wheel belong in the pre-class reading, where the sensor's construction is explained. Rebuild as one `<sidebyside>` figure |
| **Day12 s6** | **Fritzing: the Exercise 1 wiring**, plus a second picture (the barrel-jack regulator board, already in the book as `fig-tb6612-regulator`) and six text shapes | **`fig-day12-wiring`.** Slide-XML geometry, read directly: "~10 KΩ pullup" is at (0.66, 3.42) and "Don't wire the signal wire into the Nucleo yet" at (0.14, 3.96), both **left of** the picture, which starts at 2.69 in. They are **slide text pointing into the drawing by an arrow**, not artwork — so they become slide bullets, exactly as she had them, and **no original is needed**. The **resistor symbol itself is present** in the Fritzing artwork, at breadboard column ~15, so nothing is missing from the drawing. Her "5V voltage supply" box is held out pending Question 2, since it contradicts the drawing it sits on (§4c(ii)). **Gate 1's cheaper route, adopted:** her slide 6 *is* the book's `fig-tb6612-wiring-2` (`images/Day11-Motors/tb6612-wiring-exercise2.png`, `ch-motors.ptx:1166`) with the sensor, one resistor and two wires added — so annotate that drawing and let the caption say what hers says silently, *changed from Wednesday only by the sensor and one resistor*. P-15: no pull-up **value** on the figure, no `OUT → PA15` arrow, and a source comment saying the omission is deliberate |
| Day12 s6, second picture | the barrel-jack regulator board | **Do not duplicate** — it is already `fig-tb6612-regulator` (`ch-motors.ptx:875`), projected on Day 11 as `sl-day11-regulator`. `<xref>` it |
| **Day12 s7** | *Wiring the Fancy Photointerrupter* — the cabled EE-SX672 photo | **Keep raw** — a photograph with no annotation shapes. The wire-colour list is slide text, not artwork, and becomes a small table |
| Day12 s9 | none | **Keep as an activity**, `act-day12-pulses-to-rpm`, merged with Day11x s20 |
| Day12 s8 | the scope video still | **Drop** — `fig-photointerrupter-video` already carries the video, Day 11x projects it, and Rule 8 says do not project a figure twice. Part 2's activity has students produce their own trace |
| **Day12 s10** | **Fritzing: the complete Lab 6 build** — Nucleo, breadboard, seven-segment, pot, TB6612, regulator, motor, sensor. 2048 × 1908, one shape | **Rebuild and keep — the anchor figure of the build block.** It is the only picture in the course showing the whole system at once. Legibility at projection size is the risk: the header silkscreen is ~0.5 % of slide height, which is the defect `wiring-2` has carried for three rounds. **Mitigation: the slide's job is the block layout, and the pin names are given as text beside it, not read off the picture** |
| Day11x s20 | none | **Keep as an activity**, merged with Day12 s9 (§3c) |
| Day11x s21 | none | text only — becomes a figure? **No.** The three relations are one-line `<m>` each and the player flattens them correctly since 2026-08-18 (S-6). Δθ = 2π / #slots has no fraction bar in the flattened form that matters; **checked at Gate 2′ by looking, not by assuming** |
| — | **`fig-photointerrupter-beam`** — LED, slot, phototransistor, and the resulting square wave | **Does not exist and is wanted, for the reading.** Hand-authored SVG, because no photo shows the beam. **Mechanical only** — no transistor symbol, no pull-up, no node levels; those are Part 2's. B-11a: declare both `width` and `height` matching the `viewBox` |
| — | **`fig-photointerrupter-states`** — two panels: slot open → beam reaches the phototransistor → it conducts → the node is LOW; spoke blocking → transistor off → the 10 kΩ pull-up holds the node at 3.3 V | **Does not exist and is wanted, for Part 2.** Added at Gate 1. It replaces the `<xref>` to Day 10's `fig-open-drain`, which is a **two-device bus-arbitration** diagram and not this case at all — *"whatever the pull-up is tied to sets the HIGH level"* is currently asserted rather than shown. Keep it separate from the beam figure: the boundary between them is the B-8 line between motivation and machinery |

**Figures needed from Petra: none, as of the slide-XML check above.** Both of the
callouts that looked missing turned out to be slide text rather than artwork, and
the one genuinely doubtful annotation — "needs a 5V voltage supply" — is doubtful
because it disagrees with her own drawing, which a higher-resolution export would
not fix. Question 2 is what settles it.

## 11. Structural convention — checked against the siblings, not assumed

**A second `Before Class` section inside one chapter is established.**
`ch-i2c.ptx` has `sec-i2c-day9x` (in-class, Day 9x) followed by
`sec-display-before-class` (*"Before Class: The Display, and the Bus You Have
Used"*, Day 10's reading) and then `sec-i2c-day10`. So Day 12's reading goes
**after** `sec-motors-day11x`, not up beside Day 11's.

Naming, following Day 11 and Day 11x in this file:

```
<section xml:id="sec-speed-before-class">   Before Class: …
    <subsection xml:id="subsec-speed-*">
    <reading-questions xml:id="rq-speed-sensing">
<section xml:id="sec-motors-day12">         Day 12 In-Class: …
    <subsection xml:id="subsec-day12-*">
    <activity   xml:id="act-day12-*">   <task xml:id="task-day12-*">
    <instructor xml:id="inst-day12-*">
    <slide      xml:id="sl-day12-*">
```

Deck: `assets/decks/day12.json`, and `python3 scripts/make_deck_index.py` after.

## 12. Open questions carried forward from Day 11x — status

From `plans/day11x-handover.md`, *"Still open with her, not blocking"*:

1. **`TTmotor_ramp.c` vs `TTMotor_Ramp.c`** — still open. **Asked again** (Question
   4), because Day 12 adds more references to it. The book, `check_starters.py`,
   the file on disk and both her own decks all use `TTmotor_ramp.c`; she wrote it
   capitalized twice in review.
2. **The "30 → 180 rpm" caption claim** on `fig-photointerrupter-video` — still
   unverified, and Day 12 now *depends* on the number, because §9's arithmetic uses
   180 rpm to get 60 pulses per second. **Asked again** (Question 5). The reading
   is written so that the argument survives any speed in that range.
3. **The 50 Hz `#define` pair** — **resolved.** Petra corrected `TTmotor_ramp.c` on
   2026-08-19; `plans/day11x.md` records it. Nothing to carry.

## 13. Questions for Petra

Sent 2026-08-24. Everything that does not depend on an answer is proceeding.

1. **The potentiometer's rail.** Lab 6's schematic wires the pot to **+5 V** and
   its wiper to **A0**, but the lab text describes 0 V / 1.65 V / 3.3 V and warns
   that 5 V on the breadboard rail will damage the Nucleo. Is the schematic's
   `+5V` a leftover from the older version of the course, and should students wire
   the pot across **3.3 V and ground**? (Writing 3.3 V until you say otherwise.)
2. **The photointerrupter's supply — narrowed at Gate 2′.** Three of the four
   sources agree once the Fritzing is traced properly (§4c(ii)): your slide 6 says
   5 V, the drawing takes the sensor's VCC to the driver's `VM` pin, and Lab 6's
   schematic puts it on +5 V. **What is left is one thing:** your speaker note for
   that slide says *"just wire power and ground to **logic** power and ground"*.
   In Exercise 1 the regulator is not wired yet — Lab 6 connects it at §2.3, after
   the potentiometer — so which do students wire on the day? And is it right to
   teach that the pullup goes to **3.3 V** either way, as Lab 6 §2.5 says?
3. **The EE-SX672 datasheet.** It is not in the repo. May we add it to
   `assets/datasheets/`? It is worth more than a nice-to-have: the day's central
   safety claim — that pulling this output up to 3.3 V is safe because it can only
   pull down — is true **only if the output has no internal pull-up to its own
   supply**, and nothing in the repo settles that. With the datasheet it becomes a
   lookup students do; without it, it stays an assumption we have to state as one.
   If the answer is no, the day's P-11 moment is UM2953 Table 11 — finding for
   yourself that D7 is PA15.
4. **`TTmotor_ramp.c` or `TTMotor_Ramp.c`?** Still open from Day 11x, and Day 12
   is about to add more references. One pass either way.
5. **The 30 → 180 rpm claim** in `fig-photointerrupter-video`'s caption. Day 12's
   argument for interrupting rather than polling uses that top speed (20 slots ×
   3 rev/s = 60 pulses per second, against a 100 Hz ADC beat), so it would be good
   to have it confirmed. Is 180 rpm about right for the top of the ramp?
6. **How much of the 110 minutes is open build time?** After Gate 1 the plan
   budgets **35 minutes** of it as a named Part rather than as slack, with a floor
   of 25, plus a protected 5-minute close — inferred from the shape of your deck
   (ten slides, ending on *Complete Lab 6 setup* with nothing after it) rather than
   from anything that states it. Does that match how you actually run this Thursday?
   If the real number is 45, the ten minutes come out of Parts 1 and 5, not out of
   the sensor wiring and not out of the close.
