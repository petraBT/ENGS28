# Day 12 — Measuring the Motor's Speed (lesson plan)

**Day 12 is a Thursday: 110 minutes.** The rule, from `CLAUDE.md`'s standing
facts: Day N with N odd is a Tuesday, 110 min; Day N**x** is a Wednesday x-hour,
50 min; Day N with N **even** is a **Thursday, 110 min**. Written out because the
65-minute error has been made three times in this course, and on Day 11 that one
wrong premise thinned every Part in the chapter.

**This day has a pre-class reading.** Lab 6 p. 5 sources `RPM = 60 × PPS / 20`
from *"the reading quiz"*, and Day 11x has no reading, so the derivation would
otherwise be stranded. Day 11x's own hand-off comment in `source/ch-motors.ptx`
says so, and the Lab 6 PDF confirms it.

**The taught arc is 57 minutes and the open build is 45**, with 8 for settling and
transitions. That split is deliberate and it is hers: her Day 12 deck is **ten
slides**, of which two are dividers and two duplicate Day 11x. A thin deck for a
110-minute Thursday is not a defect here — it is a build day, and the build is
named as a Part rather than left as silent slack.

Chapter `source/ch-motors.ptx`, at the placeholder after `sec-motors-day11x`.
**Day 11 and Day 11x are passed — do not touch them.**

Ground truth: `plans/day12-ground-truth.md`. Her decks:
`assets/ClassSlidesOLD/Day12-Motors(3).pptx` (10 slides) and
`Day11x-Motors(2).pptx` slides **20–21**, moved here at Day 11x's Gate 1.
Downstream: **Lab 6**, due Tuesday 17 February 2026.

---

## Objectives — after Day 12 a student can

1. Explain how a slotted wheel and a photointerrupter turn shaft rotation into a
   train of pulses, and why the **rate** of those pulses — not their shape or
   height — is what carries the speed.
2. Derive revolutions per minute from pulses per second for a wheel of any slot
   count, and evaluate it for the 20-slot wheel in their kit:
   `RPM = 60 × PPS / 20`.
3. Say why the sensor's output needs a pull-up resistor, and why pulling a
   5 V-powered sensor's output up to 3.3 V puts a signal the STM32C031C6 can read
   on the pin.
4. Wire the photointerrupter, observe its output on the oscilloscope while the
   motor ramps, and read the pulse rate off the trace.
5. Choose between a GPIO interrupt and a polling loop for counting the pulses, and
   defend the choice with the pulse rate and the other work the loop has to do.
6. Structure a main loop that does three things at three different rates using
   `milliseconds()`, without `delay_ms()` anywhere in it.
7. State what a single-channel pulse train cannot tell you — which way the shaft is
   turning — and what a quadrature encoder adds.

## THE CRUCIAL STEP (P-2), one sentence

By the end of class every student has the photointerrupter wired and its pulse
train on the oscilloscope, and can write down — for their own wheel, having
counted its slots — the arithmetic that turns a measured pulse rate into rpm.

*(Both halves are reachable by the slowest student. The wiring is three wires and
one resistor and it is the first thing the class does, with the whole room doing it
at once. The arithmetic was derived in the pre-class reading, so a student who did
the reading arrives with it; the Part 3 reveal restates it in full regardless of
what any table found, and the number they put into it is one they counted
themselves rather than one they had to remember.)*

*(What is deliberately **not** in the crucial step: the interrupt. Choosing and
writing the pulse counter is Part 4 and the build, and a student who does not
finish it in class has a working sensor, a trace, and the arithmetic — which is
what Lab 6 needs them to leave with.)*

## THE STRETCH (P-3)

Three, in the order a fast group will reach them.

1. **Direction from one channel — what it costs.** The sensor gives one pulse per
   slot and nothing else, so nothing in the pulse train says which way the shaft
   turns. Lab 6 wants **negative** rpm for reverse. Where does the sign come from
   in a program that only ever counts pulses? *(It comes from what the program
   commanded, not from what it measured — and that is worth saying out loud,
   because it means the display is trusting the motor to be doing what it was
   told. What would have to change for the measurement itself to carry the sign?)*
2. **Quadrature.** Her slide 21's aside: a second sensor a quarter-slot away gives
   two pulse trains in quadrature, and an up-down counter reads direction as well
   as speed. Sketch the two waveforms for clockwise and counter-clockwise rotation
   and say what distinguishes them.
3. **The measurement's own resolution.** Counting whole pulses in a one-second
   window quantizes the answer: one pulse of miscount is 3 rpm on a 20-slot wheel.
   At 30 rpm that is a 10 % error. What could you change to do better, and what
   does each change cost? *(A longer window costs response time; counting edges
   both ways doubles the count; timing the interval between pulses instead of
   counting them inverts the trade.)*

*(Stretch 3 is the one that generalizes the day's idea rather than adding to it,
which is what P-3 asks for. It also pays back Day 11x's resolution Part in a second
setting — there it was the resolution of what we could **command**, here it is the
resolution of what we can **measure**.)*

## Datasheet / reference-manual moments (P-11)

- **Part 2:** **UM2953**, the Nucleo-C031C6 user manual
  (`external/nucleo_user_manual.pdf`), **Table 11, *ARDUINO® connector pinout***,
  p. 20. Students find for themselves which STM32C031C6 pin is behind header pin
  **D7**. The answer is **PA15**, and it is the pin the sensor's output goes to.
  This is the day's own lookup and it is short enough to do in the room.
- **Part 4:** **RM0490 §12.5.9, Table 47, *EXTI controller register map***
  (PDF p. 229) — `EXTI_EXTICR4` at offset 0x06C, top byte `EXTI15[7:0]`. Cited so
  that students configuring line 15 in the lab can find it, not walked through:
  Day 9 already taught the five registers on line 4.
- **Reading:** Lab 6 §2.5 as the source of the 20 in `RPM = 60 × PPS / 20`, with
  the count verified against their own wheel in Part 3.

*(If Petra adds the **EE-SX672** datasheet to the repo — Question 3 — the pull-up
argument in Part 2 gains a real lookup: find the output stage in the datasheet and
say what it can and cannot drive. Written to work either way.)*

---

## Coverage table — every slide of both decks, and where it lands (B-8a)

| Deck | Slide | What | Lands in |
| --- | --- | --- | --- |
| Day12 | 1 | Title | deck `title` glue |
| Day12 | 2 | *Review: Basic DC motor control* | deck `section` glue, Part 1 |
| Day12 | **3** | *Discuss At Your Table* — how does `TTmotor_ramp.c` work, what questions do you have | **Part 1**, `act-day12-driver-questions` |
| Day12 | 4 | *Motor speed sensing* | deck `section` glue, Part 2 |
| Day12 | 5 | *We will use an optical incremental sensor* | **DROPPED as a slide — duplicate.** `sl-day11x-next` delivered these bullets on Wednesday and `fig-encoder-wheel` is already in the book. Its two *new* photos (the EE-SX672 body, the slotted wheels) and its construction sentence move to the **pre-class reading** |
| Day12 | **6** | **Exercise #1** — wire it, scope it, run the ramp | **Part 2**, `act-day12-wire-and-scope` + the rebuilt wiring figure |
| Day12 | **7** | *Wiring the Fancy Photointerrupter* — the cabled variant, wire colours | **Part 2**, second figure + a four-row wire table |
| Day12 | 8 | The 30 → 180 rpm scope video | **DROPPED — projected twice.** `fig-photointerrupter-video` is in the book and Day 11x's deck plays it. Part 2 has students capture their own |
| Day12 | **9** | **Exercise #2: Photointerrupter → RPM (on paper)** — detect / count / convert | **Part 3**, `act-day12-pulses-to-rpm`, **merged with Day11x slide 20** |
| Day12 | **10** | *Complete Lab 6 setup* — hardware and firmware checklist | **Part 5** + the build-block opener |
| Day11x | **20** | *With your table group, discuss* — edges / rpm / direction | **Part 3**, merged into `act-day12-pulses-to-rpm` (P-16: no task twice in a day) |
| Day11x | **21** | *Decoding shaft position from sensor output* — Δθ = 2π/#slots, position vs. speed, quadrature, sensors that decode in hardware | **Split.** The rpm derivation is the **pre-class reading** (Lab 6 sources it from the quiz). The generalization — the same count read as angular **position**, and the quadrature aside — is **Part 3's reveal**, where it is new rather than repeated |

**Nothing of hers is dropped without a reason on this table.** Two drops (5 and 8)
are duplicates of material Day 11x already delivered; two (2 and 4) are dividers
the deck's own glue provides.

**What Day 12 adds that is not on either deck**, flagged rather than slipped in:

| Addition | Why |
| --- | --- |
| **Part 4 — `milliseconds()` and a main loop that does three things at three rates** | `milliseconds()` appears in no chapter of this book, and Lab 6 requires it twice and forbids `delay_ms()` for timing. It is a real hole between book and lab, and by elimination this is the day |
| The **pull-up** argument as a taught point rather than a wiring instruction | It is in her slide-6 speaker note (*"the phototransistor doesn't make any current"*), and it is the second encounter of Day 10's open-drain |
| The **D7 → PA15 lookup** as student work | Her slide 10 simply states PA15. Making it a lookup costs two minutes and is the day's P-11 moment |

---

## The design decision this day makes and teaches — interrupt or poll

Recorded in `plans/day12-ground-truth.md` §9 with the full evidence. In short:

- **The chapter's own objective list already says interrupt** —
  `ch-motors.ptx:18`, written before this session.
- **The arithmetic makes the case.** Twenty slots at 180 rpm is 3 rev/s × 20 =
  **60 pulses per second**, and Lab 6 §2.2 has the ADC sampled at **100 Hz**. Read
  the pin inside the 100 Hz beat and pulses go missing — which is Day 9 Part 2,
  *"The Press the Polled Counter Misses"*, in a second setting.
- **Polling is not wrong**, and the class says so: a loop that reads the pin every
  pass, with only the *scheduling* done off `milliseconds()`, catches every edge at
  60 Hz comfortably. What it costs is that every other thing the loop does must
  stay short forever.
- **Her slide 9 poses it as an open question**, so nothing before Part 3's reveal
  may answer it (P-6). Part 4 is where the two answers are compared.

**Gate 1 is asked to confirm this**, and specifically whether Part 4 should
converge on the interrupt or leave both open for the lab.

---

## Why Lab 6 sets the shape of the second half (P-13)

Lab 6 is due five days later and this is the last class before it. Its build order
is the build order of Part 6:

| Lab 6 | Already have | Today |
| --- | --- | --- |
| §2.1 `tb6612.c` driver | **Day 11x** delivered the seam (`sl-day11x-lab6-seam`) | write it |
| §2.2 pot → ADC → PWM at 100 Hz | **Day 7** (`ADCPot.c`), **Day 11x** (`motor_speed()`) | Part 4 supplies the loop structure |
| §2.3 regulator | **Day 11** | wire it |
| §2.4 motor driver + motor | **Day 11** | wire it |
| §2.5 RPM indicator | **today** | Parts 2, 3, 4 |
| §3 ±RPM on the display | **Day 10** — `SevenSeg_number()`, and the signed counter with its minus sign was the Day 10 homework | **handed off, not retaught**: point at `subsec-i2c-ref-ht16k33`, the HT16K33 Quick Reference |

**The seven-segment display is a hand-off.** Recorded as a decision because the
Day 12 prompt asked for it: Day 10 built the driver, the Day 10 homework wrote the
signed counter and the minus sign (`act-i2c-homework` task 2), and there is
nothing left to teach. Part 5 says so and cites where the lookup is.

---

## The Part sequence

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| **1** | 10 | discuss | **Questions about `TTmotor_ramp.c`.** Her slide 3, unchanged: the Day 11x homework, at your table, then to the room |
| **2** | 20 | **do** | **Wire the sensor and look at what it says.** Three wires, one pull-up, the AD2 on the output, `TTmotor_ramp.c` running. The signal does not reach the Nucleo yet. Includes the D7/PA15 lookup |
| **3** | 15 | **do → reveal** | **From a pulse train to a number.** Her slide 9 merged with her Day 11x slide 20: detect, count, convert, and can you get direction. Reveal is her slide 21's generalization |
| **4** | 12 | predict → explain | **A loop that does three things at three rates.** `milliseconds()`; why the 100 Hz ADC beat cannot also be the pulse beat; interrupt versus poll |
| **5** | 5 | explain | **The whole build.** Her slide 10 — what is wired where, what is already written, what is left |
| **6** | 45 | **build** | **Open build time.** The Lab 6 system, incrementally, with instructors circulating |
| — | **8** | — | Settling, the two transitions into and out of the build, wrap |

**Total 110 minutes**, of which **62 are taught or structured** and **45 are the
students' own build**.

**The pressure valve is Part 4**, and it is named here so the choice is not made
under time pressure at minute 60. If Part 2's wiring runs long — and it is the
Part most likely to, because it is the only one gated on twenty benchless setups
working at once — Part 4 drops from 12 minutes to 6: the `milliseconds()` idiom and
the 60-versus-100 Hz argument are kept, and the interrupt-versus-poll comparison
moves into the build, where instructors are circulating anyway.

**What must never absorb an overrun is Part 2's pull-up.** A student who leaves
without it has a sensor that reads as noise, and that is the failure Lab 6 warns
about in a box.

**Nothing in the taught arc depends on Part 6 finishing.** The build is genuinely
open: students who finish the RPM display early go to the stretch, and students who
do not have every piece they need to continue on their own.

---

## The outline — Part titles and what each teaches

### Before Class: Counting Pulses to Measure Speed *(the reading)*

*Not a Part — it is read before the hour, and it generates no slides (B-1).*

- **Opens from Wednesday, not from scratch.** Day 11x's Part 5 already showed the
  slotted wheel, the photointerrupter and the pulse train crowding together as the
  motor speeds up. The reading's job is to turn that picture into a number.
- **How the sensor works**, in her slide-5 words: a U-shaped body with an LED on
  one side and a phototransistor on the other, wrapped around the wheel, so each
  slot lets the beam through and each spoke blocks it. A hand-drawn figure of the
  beam, the slot and the resulting square wave.
- **The arithmetic, derived rather than stated** — the Lab 6 reading-quiz item.
  One revolution is one full turn of the wheel; a wheel with *N* slots gives *N*
  pulses per revolution; so revolutions per second is PPS / *N*, and revolutions
  per **minute** is 60 × PPS / *N*. For the kit's 20-slot wheel,
  **RPM = 60 × PPS / 20**. Then the same count read as an **angle**:
  Δθ = 2π / *N* radians, 360 / *N* degrees, 1 / *N* revolutions, so
  pulse_count × Δθ is angular position and pulse_count / time × Δθ is average
  angular speed. *(Her slide 21, verbatim in structure.)*
- **Why the output needs a pull-up**, in her words and Day 10's: the phototransistor
  can pull the line down but cannot drive it up, which is the open-drain output of
  `subsec-day10-pins` seen again. With nothing pulling up, the pin floats.
- **What the pulse train does not carry** — direction. Named here so Part 3's
  question is a real one and the reading has not answered it: the reading says the
  pulses are identical whichever way the shaft turns, and stops there.
- **Reading questions** (B-3, grounded in the real hardware): the derivation
  evaluated at a stated pulse count; what happens with no pull-up; and which of
  four quantities on the trace carries the speed.

*(B-2 check: no registers, no register map, no multi-stage mechanism figure.
Readable at a desk with no hardware and no IDE. One figure, one derivation, one
callback.)*

### Part 1: Questions About `TTmotor_ramp.c` *(10 min, discuss)*

- Her slide 3, unchanged, as a table-group activity: how does the program work, do
  you understand every register bit it sets, what questions do you have.
- Day 11x's homework was to read the driver with RM0490 §17.3.8 and §17.4 open, so
  this is where that lands.
- Then to the room. **No reveal slide** — the answers are Day 11x's, already in the
  book and already projected on Wednesday, and a slide restating them is S-10.
- *(This Part has no new content and does not need any. It is the one hinge between
  a 50-minute x-hour spent reading code and a Thursday spent building.)*

### Part 2: Wire the Sensor and Look at What It Says *(20 min, do)*

- **Opens on the pin.** The sensor's output has to go somewhere eventually, and
  the Nucleo's header calls that place **D7**. Which STM32C031C6 pin is behind it?
  UM2953 Table 11, in the room, ~2 minutes. The answer is **PA15**, and it is
  needed for the lab, not for today.
- **Then the wiring.** Her slide 6, rebuilt: sensor power and ground, output to a
  breadboard row, a 10 kΩ resistor from that row to 3.3 V, the AD2 on the row.
  **The output does not go to the Nucleo today** — her own instruction, and the
  reason is that a signal you have not looked at is a signal you cannot debug.
- **The pull-up is the teaching, not a step.** Before the resistor goes in, ask what
  the trace will look like without it. It is Day 10's open-drain output with a
  different consequence: the phototransistor pulls down only, so whatever the
  resistor is tied to sets the HIGH level — which is how a sensor running on 5 V
  hands a 3.3 V-safe signal to PA15.
- Her slide 7 for the cabled variant, as a small table of wire colours.
- **Run `TTmotor_ramp.c` and watch.** Students see the pulses crowd as the ramp
  speeds up and spread as it slows — their own version of the video Day 11x played.
  Then measure: what is the pulse rate at the top of the ramp?
- *(P-15 condition: the wiring figure must not label the pull-up with a value the
  activity asks students to reason about, and must not carry an "OUT → PA15" arrow.
  Leave a source comment saying the omission is deliberate.)*

### Part 3: From a Pulse Train to a Number *(15 min, do → reveal)*

- **The activity is her slide 9 merged with her Day 11x slide 20**, four questions,
  at your table, on paper:
  1. **Count the slots on your own wheel.** How many pulses is one revolution?
  2. How could the STM32C031C6 detect each pulse? *(Deliberately open — this is the
     question Part 4 answers, and nothing before it may pre-empt it, P-6.)*
  3. Given a way to count them, how do you turn a count into rpm? *(They derived
     this in the reading; here they apply it to the rate they measured in Part 2
     and check it against the number the ramp was commanding.)*
  4. Can you tell which way the shaft is turning from this signal alone?
- **The reveal is her slide 21's generalization**, and it is new content rather than
  a debrief: the same count read as an **angle** (Δθ = 2π / *N*), position versus
  average speed over an interval, and the quadrature aside — a second sensor a
  quarter-slot away, an up-down counter, direction for free. Plus her closing note
  that some sensors do this decoding in hardware and hand you the answer over I2C,
  which is the bus they already have.
- **Question 4's answer is no**, and it matters: Lab 6 wants negative rpm for
  reverse, so the sign has to come from what the program **commanded**. That is the
  first stretch.

### Part 4: A Loop That Does Three Things at Three Rates *(12 min, predict → explain)*

- **Opens on the problem, not the function.** By the end of the lab the program has
  to sample the pot at 100 Hz, count pulses as they arrive, and refresh the display
  — three jobs at three rates, and `delay_ms()` can only do one of them at a time.
  Lab 6 says so outright: *"you may not use `delay_ms()` for timing."*
- **`milliseconds()`**, from `assets/starters/sysinit.c` — real code, quoted, not
  invented. SysTick reloads at 12000 − 1 from the 12 MHz clock, so the handler runs
  once a millisecond and increments a counter; `milliseconds()` returns it, and
  `delay_ms()` has been built on it since Day 2. **This is the first time the book
  names it**, and it is the last piece of course scaffolding that has been in
  every program all term without being opened.
- **Predict:** here is a loop that reads the pin and samples the ADC in the same
  100 Hz beat. At the top of the ramp the wheel gives 60 pulses per second. What
  does the counter report? *(Fewer than 60, unpredictably — the same failure Day 9
  Part 2 demonstrated with a button.)*
- **Then the two answers, honestly.** A free-running loop that reads the pin every
  pass and schedules everything else off `milliseconds()` works, and costs a
  standing promise that nothing in the loop ever blocks. A falling-edge interrupt on
  PA15 works and does not care what the loop is doing — and it is Day 9's five
  registers with 15 substituted for 4, landing in the same `EXTI4_15_IRQHandler`
  they already wrote. `EXTI_EXTICR4` is RM0490 Table 47, offset 0x06C, top byte
  `EXTI15[7:0]`.
- **The activity is design, not typing:** sketch the main loop. What does it do
  every pass, what every 10 ms, what every 1000 ms, and where does the pulse count
  get zeroed? `<instructor>` carries a worked answer (P-10), written as a worked
  example rather than as a driver, because there is no Day 12 driver file.
- *(Gate 1 is asked whether this Part should converge on the interrupt or leave
  both open. See the design-decision section above.)*

### Part 5: The Whole Build *(5 min, explain)*

- Her slide 10, rebuilt: the complete Lab 6 system in one picture — Nucleo,
  breadboard, seven-segment display, potentiometer, TB6612, regulator, motor,
  sensor.
- **What is already written**, said out loud so nobody starts from nothing: the I2C
  library and the seven-segment driver from Day 10, `SevenSeg_number()` and the
  minus sign from the Day 10 homework, the ADC read from Day 7, and the two TIM14
  functions from Day 11x that become `motor_init()` and `motor_speed()`.
- **What is left**: `motor_mode()` from the truth table, the pot-to-speed mapping
  with its dead band, the pulse counter, and the one-second window.
- **The order to build in**, which is Lab 6's own: driver first and test it on
  Waveforms with no motor connected; then the pot; then the regulator; then the
  motor; then the sensor.
- *(Rule 9: the figure's job is the block layout. The Nucleo header silkscreen in
  it is far below 2 % of slide height and cannot be read from the room, so every
  pin name the room needs is text beside the picture, never read off it.)*

### Part 6: Build *(45 min)*

- Not a lecture block. Students build the Lab 6 system in the order Part 5 named,
  testing each stage before adding the next.
- The three stretches are on a slide the room can see, so a group that gets to the
  RPM display has somewhere to go.
- *(S-25: nothing about who to ask, what to do if your build failed, or what is
  available if yours does not work goes into student-facing text. It is a presenter
  note.)*

---

## The chapter's `Reference:` section — decided, and deferred to the follow-up

`ch-motors.ptx` has no `Reference:` section, and the comment at its end defers it
to a separate session. **This is that decision point, and the decision is: it is
written in the follow-up session, alongside the in-class prose, and its shape is
fixed here so it cannot go silently missing the way Day 11's motor equations did
(B-8a).**

Shape, following the three siblings (`sec-i2c-reference`, `sec-adc-reference`,
`sec-timers-reference`), each of which opens with an explicit "nothing here is new"
sentence and then reorganizes taught facts into lookup form:

```
<section xml:id="sec-motors-reference">
  Reference: PWM on TIM14, the TB6612, and Counting Pulses
```

| Subsection | Contents | Source of every fact |
| --- | --- | --- |
| `subsec-motors-ref-tim14` | **Register summary table** — `RCC_APBENR2`, `TIM14_PSC`, `TIM14_ARR`, `TIM14_CCMR1` (OC1M, CC1S), `TIM14_CCER` (CC1E), `TIM14_EGR` (UG), `TIM14_CR1` (CEN), `TIM14_CCR1`, with offsets, bits used, purpose, and RM0490 section | Day 11x, already taught and verified. **Writable now, independent of Day 12** |
| `subsec-motors-ref-timing` | The PWM arithmetic in lookup form: 12 MHz ÷ `PSC_FACTOR` ÷ `PWM_TIMER_MAX`; the 1.6 kHz / 1250-step setting and the 50 Hz / 2000-step alternative; resolution as T₀ and as millivolts | Day 11, Day 11x |
| `subsec-motors-ref-tb6612` | The truth table as a lookup, the pin map (AIN1 → PA5/D13, AIN2 → PA6/D12, PWMA → PA7/D11), brake versus stop in one line each, and the supply split — VM from the regulator, VCC from the Nucleo's 3.3 V | Day 11 |
| `subsec-motors-ref-speed` | **New with Day 12:** `RPM = 60 × PPS / N` and Δθ = 2π / *N*; the measurement's own resolution (one pulse in a one-second window is 60/*N* rpm); the EXTI row for line 15 — `EXTI_EXTICR4` offset 0x06C, `EXTI15[7:0]`, vector `EXTI4_15` — and a pointer to Day 9's fuller EXTI reference rather than a second copy of it | Day 12 |
| `subsec-motors-ref-lookups` | **The datasheet-lookup table** (the shape `ch-adc.ptx` uses): what to look up, in which document, where. RM0490 §17.3.8 and §17.4; RM0490 §12.5.9 Table 47; TB6612FNG datasheet p. 4; UM2953 Table 11; and the EE-SX672 datasheet if it arrives | all verified |

**Handed to the follow-up session explicitly**, not left implicit. If that session
runs short, `subsec-motors-ref-tim14` is the one that must exist: it is the table
students will have open while writing `tb6612.c`.

---

## Risks

- **Part 2 is the one that can eat the hour.** Twenty setups wiring a sensor and
  getting a trace is the only Part gated on hardware working for everybody at once,
  and Lab 6's own pull-up warning says what happens when it does not. Its named
  valve is Part 4, dropping 12 minutes to 6. The pull-up itself never gets cut.
- **Two unresolved supply questions** (ground truth §4c, Questions 1 and 2). The
  reading and the skeleton are written so that either answer fits: they say the
  pull-up goes to 3.3 V, which every source agrees on, and they do not assert what
  the sensor's own VCC is wired to. **Nothing may say 5 V about anything on the
  logic side until she answers.**
- **Part 4 is new content beyond her deck.** It is justified — `milliseconds()` is
  a real book-to-lab hole — but it is the Part a reviewer should challenge hardest,
  and it is the one most likely to be over-built relative to what a build day needs.
- **The 45-minute build is a judgment about how she runs this class** (Question 6).
  If it is wrong in either direction the Part table is wrong, and this is the
  cheapest moment to find that out.
- **`fig-day12-wiring` may need her original** (ground truth §10): the "~10 KΩ
  pullup" callout is on a second picture that the composite does not pick up, and
  the "5V supply" annotation contradicts the drawing it sits on.
