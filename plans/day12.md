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

**Sixty-six of the 110 minutes are taught or structured; 35 are the students' own
build, with a floor of 25; five are a protected close.** That split is deliberate
and it is hers: her Day 12 deck is **ten slides**, of which two are dividers and
two duplicate Day 11x, and it ends on *Complete Lab 6 setup* with no slide after
it. A thin deck for a 110-minute Thursday is not a defect here — it is a build
day, and the build is named as a Part rather than left as silent slack. The size
of that block is **inferred from the shape of her deck rather than evidenced**,
which is Question 6.

Chapter `source/ch-motors.ptx`, at the placeholder after `sec-motors-day11x`.
**Day 11 and Day 11x are passed — do not touch them.**

Ground truth: `plans/day12-ground-truth.md`. Gate 1 review and its consolidated
change list: `reviews/day12-gate1.md` — **applied in this revision**. Her decks:
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
3. Say why the sensor's output needs a pull-up resistor, and why pulling an
   open-collector output up to 3.3 V gives the STM32C031C6 a signal it can read
   **regardless of the sensor's own supply**.
4. Wire the photointerrupter, observe its output on the oscilloscope while the
   motor ramps, and read the pulse rate off the trace.
5. Choose between a GPIO interrupt and a polling loop for counting the pulses, and
   defend the choice against the pulse rate they measured and the other work the
   loop has to do.
6. Structure a main loop that does three things at three different rates using
   `milliseconds()`, without `delay_ms()` anywhere in it.
7. State what a single-channel pulse train cannot tell you — which way the shaft is
   turning — and what a quadrature encoder adds.

*(Objective 3 was rewritten at Gate 1. It said "a 5 V-powered sensor's output",
which asserted the exact premise the Risks section calls unresolved. **Nothing in
this day says 5 V about anything on the logic side until Questions 2 and 3 are
answered.**)*

## THE CRUCIAL STEP (P-2), one sentence

By the end of class every student has the photointerrupter wired and its pulse
train on the oscilloscope, and can write down — for their own wheel, having
counted its slots — the arithmetic that turns a measured pulse rate into rpm.

*(Both halves are reachable by the slowest student. The wiring is three wires and
one resistor, it is the first thing the class does, the whole room does it at once,
and Part 2 now carries a stated expected result and a symptom-to-cause list so a
table that gets nothing knows where to look. The arithmetic is derived in the
pre-class reading and then **projected in Part 3's reveal**, on `sl-day12-rpm`,
evaluated against two numbers the students themselves produced — the slot count
they counted and the pulse rate they measured.)*

*(What is deliberately **not** in the crucial step: the interrupt. Choosing and
writing the pulse counter is Part 4 and the build, and a student who does not
finish it in class leaves with a working sensor, a trace, and the arithmetic —
which is what Lab 6 needs them to have.)*

## THE STRETCH (P-3)

Three, in the order a fast group will reach them.

1. **Direction from one channel — what it costs.** The sensor gives one pulse per
   slot and nothing else, so nothing in the pulse train says which way the shaft
   turns. Lab 6 wants **negative** rpm for reverse. Where does the sign come from
   in a program that only ever counts pulses? *(It comes from what the program
   commanded, not from what it measured — worth saying out loud, because it means
   the display is trusting the motor to be doing what it was told. What would have
   to change for the measurement itself to carry the sign?)*
2. **Quadrature.** Her slide 21's aside: a second sensor a quarter-slot away gives
   two pulse trains in quadrature, and an up-down counter reads direction as well
   as speed. Sketch the two waveforms for clockwise and counter-clockwise rotation
   and say what distinguishes them.
3. **The measurement's own resolution.** Counting whole pulses in a one-second
   window quantizes the answer: one pulse of miscount is 60 × 1 / 20 = **3 rpm** on
   a 20-slot wheel, so at 30 rpm that is a **10 %** error. What could you change to
   do better, and what does each change cost?
   - A **longer window** costs response time.
   - **Counting both edges** doubles the count — *and the formula then needs
     N → 2N, or the answer comes out at twice the true speed.*
   - **Timing the interval between pulses** instead of counting them inverts the
     trade, and the crossover is the content: at 3 rpm the interval is about
     1000 ms, and `milliseconds()`'s 1 ms tick gives about 0.1 % error, against a
     counting method that sees a single pulse in its whole window; at 180 rpm the
     interval is about 16.7 ms and the same tick gives about 6 %, which is worse
     than counting's 1.7 %.

*(Stretch 3 generalizes the day's idea rather than adding to it, which is what P-3
asks. It also pays back Day 11x's resolution Part in a second setting — there it
was the resolution of what we could **command**, here it is the resolution of what
we can **measure**.)*

## Datasheet / reference-manual moments (P-11)

- **Part 5:** **UM2953**, the Nucleo-C031C6 user manual
  (`external/nucleo_user_manual.pdf`), **Table 11, *ARDUINO® connector pinout***,
  p. 20. Students find for themselves which STM32C031C6 pin is behind header pin
  **D7**. The answer is **PA15**, and it is the pin the sensor's output goes to in
  the lab. *(Moved here from Part 2 at Gate 1: its answer is not used today, her own
  arc puts PA15 on the slide 10 lab checklist, and Part 2 is the Part most likely
  to run long. Keep the framing strictly about **which pin**, not which register
  set, so it does not foreshadow Part 4.)*
- **Part 4:** **RM0490 §12.5.9, Table 47, *EXTI controller register map***
  (PDF p. 229) — `EXTI_EXTICR4` at offset 0x06C, top byte `EXTI15[7:0]`. Cited so
  that students configuring line 15 in the lab can find it, not walked through:
  Day 9 already taught the five registers on line 4.
- **Reading:** Lab 6 §2.5 as the source of the 20 in `RPM = 60 × PPS / 20`, with
  the count verified against their own wheel in Part 3.

*(If Petra adds the **EE-SX672** datasheet to the repo — Question 3 — the pull-up
argument in Part 2 gains a real lookup, and the highest-consequence claim in the
day stops being an assumption. Written to work either way.)*

---

## Coverage table — every slide of both decks, and where it lands (B-8a)

| Deck | Slide | What | Lands in |
| --- | --- | --- | --- |
| Day12 | 1 | Title | deck `title` glue |
| Day12 | 2 | *Review: Basic DC motor control* | deck `section` glue, Part 1 |
| Day12 | **3** | *Discuss At Your Table* — how does `TTmotor_ramp.c` work, what questions do you have | **Part 1**, `act-day12-driver-questions` |
| Day12 | 4 | *Motor speed sensing* | deck `section` glue, Part 2 |
| Day12 | 5 | *We will use an optical incremental sensor* | **DROPPED as a slide — duplicate**, verified at Gate 1 against `sl-day11x-next` (`ch-motors.ptx:2231`) and `fig-encoder-wheel` (:2212). Its two *new* photos (the EE-SX672 body, the slotted wheels) and its construction sentence move to the **pre-class reading**; its note *"really important that you get this working before you leave today"* is the crucial step |
| Day12 | **6** | **Exercise #1** — wire it, scope it, run the ramp | **Part 2**, `act-day12-wire-and-scope` + the wiring figure. Its speaker note also supplies the starting configuration and the wire colour (item 14) |
| Day12 | **7** | *Wiring the Fancy Photointerrupter* — the cabled variant, wire colours | **Part 2**, photo kept raw + a four-row wire table |
| Day12 | 8 | The 30 → 180 rpm scope video | **DROPPED — projected Wednesday**, verified at Gate 1: `fig-photointerrupter-video` (:2220) is the same `VH0-zO2LpDc` and `sl-day11x-scope-video` plays it. Part 2 has students capture their own |
| Day12 | **9** | **Exercise #2: Photointerrupter → RPM (on paper)** — detect / count / convert | **Part 3**, `act-day12-pulses-to-rpm`, **merged with Day11x slide 20** |
| Day12 | **10** | *Complete Lab 6 setup* — hardware and firmware checklist | **Part 5**, including *"(internal or external pullup)"* and both of its last two firmware steps + the build-block opener |
| Day11x | **20** | *With your table group, discuss* — edges / rpm / direction | **Part 3**, merged into `act-day12-pulses-to-rpm` (P-16: no task twice in a day) |
| Day11x | **21** | *Decoding shaft position from sensor output* | **Split.** The rpm derivation is the **pre-class reading**. Its **framing sentence**, the angular generalization and the quadrature aside are **Part 3's reveal**, in that order |

**Nothing of hers is dropped without a reason on this table**, and both drops were
verified against `source/ch-motors.ptx` at Gate 1 rather than accepted. Two drops
(5 and 8) are duplicates of material Day 11x already delivered; two (2 and 4) are
dividers the deck's own glue provides.

**What Day 12 adds that is not on either deck**, flagged rather than slipped in:

| Addition | Why |
| --- | --- |
| **Part 4 — `milliseconds()` and a main loop that does three things at three rates** | `milliseconds()` appears in no chapter of this book — verified independently at Gate 1 by grep — and Lab 6 requires it twice and forbids `delay_ms()` for timing. Her Day 12 deck has **no code slides at all**, so this displaces nothing of hers; it fills the space her deck leaves between the paper exercise and the build |
| The **pull-up** as a taught point rather than a wiring instruction | **Not an addition** — it is her slide 6 speaker note (*"the phototransistor doesn't make any current"*) promoted from an aside |
| The **symptom-to-cause list** in Part 2, and the **pass criteria** in Part 5 | Engineering content, not classroom management — the kind `ch-debugging.ptx` is a whole chapter of. Ruled on at Gate 1: **S-25 does not bar it** |

---

## The design decision — DECIDED at Gate 1: converge on the interrupt

Every reviewer who spoke to it said converge, and the evidence is settled:

- **The chapter's own objective list already says so** — `ch-motors.ptx:18`,
  written before this session: *"Measure motor speed using a photointerrupter and
  GPIO interrupt."*
- Her Day 11x slide 20 opens *"Remember how to detect falling/rising edge of the
  pulse?"* — leaving the question open would leave her own callback unanswered.
- **PA15 is EXTI line 15 and lands in the same `EXTI4_15_IRQHandler` they wrote on
  Day 9.** `expert-continuity-auditor` verified the transfer is exact:
  `subsec-day9-ftsr-imr-nvic` states that *"the bit number **is** the line number,
  in all three EXTI registers"*, and Day 9 already has two lines sharing that one
  handler.

**But the argument for it must be stated at the right strength (S-19).** Sampling
frequency alone does not decide whether a poll misses a digital pulse. The
condition is

> **T_poll < the shorter of the pulse's high time and its low time**

and that is set by the wheel's **duty cycle**, not by the pulse rate. At the top of
her ramp, 20 slots at 180 rpm is 60 pulses per second, and at a roughly even duty
the high time is about 8 ms against Lab 6's 10 ms ADC beat — so a naive poll misses
pulses. **The duty cycle is an assumption pending a source** (Question 3), and the
numbers are fragile in the direction that matters: at 120 rpm the high time would be
about 12.5 ms and a naive poll would be arguably safe.

**So the numbers are a demonstration, not a proof, and the real argument is the one
that does not depend on them: the interrupt removes the dependence on the top speed
altogether.** Polling is described honestly rather than dismissed — a loop that reads
the pin every pass, with only the scheduling done off `milliseconds()`, catches every
edge, and what it costs is a standing promise that nothing in the loop ever blocks.

*(If Question 5 comes back with a top speed near 120 rpm rather than 180, Part 4's
argument is rebuilt on the speed-independence line and the numbers demoted to an
illustration — **not patched with a bigger number**. Recorded at Gate 1 as
`expert-rigor-hawk`'s dissent.)*

---

## Why Lab 6 sets the shape of the second half (P-13)

Lab 6 is due five days later and this is the last class before it. Its build order
is the build order of Parts 5 and 6:

| Lab 6 | Already have | Today |
| --- | --- | --- |
| §2.1 `tb6612.c` driver | **Day 11x** delivered the seam (`sl-day11x-lab6-seam`) | write it |
| §2.2 pot → ADC → PWM at 100 Hz | **Day 7** (`ADCPot.c`), **Day 11x** (`motor_speed()`) | Part 4 supplies the loop structure; Part 5 works the dead band |
| §2.3 regulator | **Day 11** (`subsec-day11-direction`) | wire it |
| §2.4 motor driver + motor | **Day 11** | wire it |
| §2.5 RPM indicator | **today** | Parts 2, 3, 4 |
| §3 ±RPM on the display | **Day 10** — `SevenSeg_number()`, and the signed counter with its minus sign was the Day 10 homework | **handed off, not retaught** — with one caveat, below |

**The seven-segment display is a hand-off**, and `expert-continuity-auditor`
verified it is complete: `SevenSegPartial.c` defines `SevenSeg_init/blink/dim/write`,
and `SevenSeg_number()` plus the signed case are `act-i2c-homework` tasks 1 and 2,
with the reference solution in an `<instructor>` block. Lab 6 §3 needs those two
composed, which is reasonable lab work.

**The caveat, added at Gate 1:** the signed counter and its minus sign were
*homework, never reviewed in class*, and they are now load-bearing for a graded
deliverable. Part 5 points at `subsec-i2c-ref-ht16k33`, the HT16K33 Quick Reference,
rather than assuming silently.

---

## The Part sequence

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 4 | — | Settling, and the two transitions |
| **1** | 10 | discuss | **Questions about `TTmotor_ramp.c`.** Her slide 3, with an individual commit added |
| **2** | **26** | **do** | **Wire the sensor and look at what it says.** Three wires, one pull-up, the AD2 on the output, `TTmotor_ramp.c` running. The signal does not reach the Nucleo yet |
| **3** | 15 | do → reveal | **From a pulse train to a number.** Her slide 9 merged with her Day 11x slide 20; the reveal is her slide 21, **opening on the rpm formula** |
| **4** | 10 | predict → **commit** → explain | **A loop that does three things at three rates.** `milliseconds()`, the predict-then-fail, an individual commit, then the two answers |
| **5** | 5 | explain | **The whole build.** Her slide 10 — the D7/PA15 lookup, what is wired where, pass criteria, and the hazards |
| **6** | **35** | **build** | **Open build time**, opening on the main-loop sketch. **Floor: 25** |
| **close** | **5** | — | **Protected and announced**: stop, and everyone says where they are and what is left |

**Total 110 minutes**, of which **66 are taught or structured**, **35 are the
students' own build**, and **5 are the close**.

### The valves, in the order they are spent

1. **Part 6 down to its 25-minute floor.**
2. **Part 4's poll-versus-interrupt comparison moves into Part 6's opener**, taking
   Part 4 to 6 minutes. The `milliseconds()` mechanic, the predict-then-fail and the
   two-minute commit are **never** cut.
3. **Part 3's reveal drops the quadrature and decode-in-hardware asides**, which
   survive as Stretch 2 and as a line in the chapter's Reference section.

### What never absorbs an overrun

- **Part 2's pull-up.** A student who leaves without it has a sensor that reads as
  noise, and that is the failure Lab 6 warns about in a box.
- **`sl-day12-rpm`.** It is the second half of the crucial step, and putting it on
  a wall is the whole fix for the Gate 1 finding that it reached the room nowhere.
- **The five-minute close.** It is the only consolidation the day has.

---

## The outline — Part titles and what each teaches

### Before Class: Counting Pulses to Measure Speed *(the reading)*

*Not a Part — it is read before the hour, and it generates no slides (B-1). It
carries **exactly three** elements, cut back at Gate 1 from five.*

- **Opens from Wednesday, not from scratch.** Day 11x's Part 5 already showed the
  slotted wheel, the photointerrupter and the pulse train crowding together as the
  motor speeds up. The reading's job is to turn that picture into a number.
- **How the sensor works**, in her slide-5 words: a U-shaped body with an LED on
  one side and a phototransistor on the other, wrapped around the wheel, so each
  slot lets the beam through and each spoke blocks it. Figure:
  **`fig-photointerrupter-beam`**, mechanical only.
- **The arithmetic, derived rather than stated** — the Lab 6 reading-quiz item, and
  the reading's whole reason for existing. One revolution is one full turn of the
  wheel; a wheel with *N* slots gives *N* pulses per revolution; so revolutions per
  second is PPS / *N*, and revolutions per **minute** is 60 × PPS / *N*. For the
  kit's 20-slot wheel, **RPM = 60 × PPS / 20**. **PPS is expanded to *pulses per
  second* here, at first use** (B-9a).
- **One bare fact about the pull-up**, and no more: the sensor's output needs a
  pull-up resistor. **No open-drain reasoning** — that is Part 2's to discover.
- **Direction is posed, not answered.** *Does anything about these pulses change if
  the wheel turns the other way?* The reading stops there, because Part 3 Q4 asks
  exactly this (P-15).
- **Reading questions** (B-3, grounded in the real hardware): the derivation
  evaluated at a stated pulse count; what happens with no pull-up; and which
  quantity on the trace carries the speed.

**Cut from the reading at Gate 1, and where each went:**

| Cut | Now lives in | Why |
| --- | --- | --- |
| Δθ = 2π/N, angular position, average angular speed | **Part 3's reveal** | It cannot be "new content" in both places, and the reveal is where the activity has earned it (B-8) |
| The open-drain mechanism behind the pull-up | **Part 2** | It is Part 2's predict-then-explain, and giving it away leaves the room nothing to reason out (P-6) |
| *"The pulses are identical whichever way the shaft turns"* | **Part 3 Q4** as a question | A discovery must not be answered ahead of itself, including hours ahead in a reading (P-15) |

*(B-2 check: no registers, no register map, no multi-stage mechanism figure.
Readable at a desk with no hardware and no IDE. Three elements, one figure, one
derivation.)*

### Part 1: Questions About `TTmotor_ramp.c` *(10 min, discuss)*

- Her slide 3, as a table-group activity: how does the program work, do you
  understand every register bit it sets, what questions do you have.
- Day 11x's homework was to read the driver with RM0490 §17.3.8 and §17.4 open, so
  this is where that lands.
- **An individual commit first**, before the table talk: *write down one line of
  `TTmotor_ramp.c` you can now explain, and one you cannot.* Ten minutes of open
  discussion is otherwise ten minutes a quiet student can coast through, and a
  student who did not manage the homework leaves it with nothing resolved.
- **Where the answers are**, in one line: the driver is worked through in full in
  `sec-motors-day11x`. A student who is behind can go and read it.
- Then to the room. **No reveal slide** — the answers are Day 11x's, already in the
  book and already projected on Wednesday, and a slide restating them is S-10.

### Part 2: Wire the Sensor and Look at What It Says *(26 min, do)*

- **Starting configuration**, in a presenter `<note>` rather than student text
  (S-25): Wednesday left probes on the PWM node, and her own note says *"take down
  the oscilloscope, multimeter, etc. Back to the barebones circuit."*
- **The wiring**, from her slide 6: the sensor's power and ground, its output to a
  breadboard row, and the AD2 on that row. **The output does not go to the Nucleo
  today** — her own instruction, and the reason is that a signal you have not looked
  at is a signal you cannot debug. The signal wire is **orange in the drawing and
  white on the part they hold** — her note, and worth one line beside the figure.
- **The predict question comes before the resistor is named**, inside the wiring
  bullet, not after it: *with the sensor powered and its output on the scope and
  nothing else, what will the trace look like?* Then the 10 kΩ resistor from that row
  to 3.3 V. *(Drafting-order fix from Gate 1: written the other way round, the
  drafter writes the resistor into the build steps and the prediction has nothing
  left to predict.)*
- **The pull-up is the teaching, not a step**, and Part 2 states the mechanism in
  its **own** text rather than by cross-reference: *the phototransistor can only pull
  the line down, so whatever the pull-up is tied to sets the HIGH level.* Figure:
  **`fig-photointerrupter-states`**, two panels. That is how a sensor hands a
  3.3 V-safe signal to the pin **whatever its own supply is** — the claim carries
  that condition, and says nothing about 5 V, until Questions 2 and 3 come back.
  - **The same behavior on a different kind of transistor.** Day 10 taught
    open-drain as a specific `OTYPER` configuration; this is a discrete BJT's
    collector, and **there is no `OTYPER` bit on the sensor**. One clause, so nobody
    goes hunting for a register that does not exist.
  - **Why 10 kΩ**, in one line of trade-off: too low wastes current and loads the
    transistor harder when it pulls down; too high is slow against stray capacitance
    and picks up more noise.
- **Run `TTmotor_ramp.c` and watch.** The pulses crowd as the ramp speeds up and
  spread as it slows — their own version of the video Day 11x played. Then measure:
  what is the pulse rate at the top of the ramp?
- **The expected result, as the checkpoint** — student-facing, because a pass
  criterion is content: **turn the wheel by hand, and the trace toggles between 0 V
  and 3.3 V once per slot.** The minute mark for it is a presenter `<note>`, because
  S-25 does bar telling a student how long a step takes.
- **Symptom to cause**, grounded in the open-drain teaching this Part just did:
  - noise wandering around mid-rail → nothing is pulling the line up; the pin is
    floating;
  - flat at 3.3 V and never moving → the beam is never being blocked, or the LED side
    has no power;
  - flat at 0 V → power and ground are swapped at the sensor;
  - a clean square wave that does not change with the ramp → the probe is on the
    wrong node.
- **Closing sentence: the internal pull-up**, which is her Lab 6 answer — *external
  today, because you are putting a scope probe on that node; internal in the lab,
  `PUPDR` on PA15, as on Day 3 and in `counterResetButtonInt.c`.*
- Her slide 7 for the cabled variant, as a small table of wire colours.
- *(P-15 condition on `fig-day12-wiring`: it must not label the pull-up with a value
  the activity asks students to reason about, and must not carry an "OUT → PA15"
  arrow. Leave a source comment saying the omission is deliberate.)*
- *(S-25 flag, the same one Part 6 carries: no "ask your table", no "raise your
  hand", no spare-hardware sentence, and nothing saying what the day does not
  involve.)*

### Part 3: From a Pulse Train to a Number *(15 min, do → reveal)*

- **The activity is her slide 9 merged with her Day 11x slide 20**, four questions,
  at your table, on paper:
  1. **Count the slots on your own wheel.** How many pulses is one revolution?
  2. How could the STM32C031C6 detect each pulse? *(Deliberately open — this is the
     question Part 4 answers, and nothing before it may pre-empt it, P-6.)*
  3. Given a way to count them, how do you turn a count into rpm? *(They derived
     this in the reading; here they apply it to the rate they measured in Part 2 and
     check it against the number the ramp was commanding.)*
  4. Can you tell which way the shaft is turning from this signal alone?
- **The reveal, in this order** — and the order is the fix for Gate 1's largest
  finding:
  1. **Her Day 11x slide 21's framing sentence, verbatim**: *"Regardless of
     technology (mechanical, optical, magnetic), you must translate a pulse train
     into position / velocity information."* It is what makes the reveal a
     generalization rather than a second lap around this one sensor.
  2. **`sl-day12-rpm`** — `RPM = 60 × PPS / N`, evaluated at **the slot count they
     just counted** against **the rate they just measured**. This is not a P-6
     restatement of the reading, because both numbers going into it are theirs. It is
     also where the edge condition is stated: **count one edge per slot; triggering
     on both doubles the apparent PPS, and the formula then needs N → 2N.** Her own
     slide 21 says *"rising **or** falling edges"*, and Day 9 handed students
     `FTSR1` **and** `RTSR1`, so a natural extension of Day 9 otherwise reports twice
     the true speed with nothing to say why.
  3. The same count read as an **angle**: Δθ = 2π/*N* radians, 360/*N* degrees,
     1/*N* revolutions — so pulse_count × Δθ is angular position and
     pulse_count / time × Δθ is average angular speed over that interval.
  4. **The asides** — quadrature (a second sensor a quarter-slot away, an up-down
     counter, direction for free) and her closing note that some sensors do this
     decoding in hardware and hand you the answer over I2C, which is the bus they
     already have. *(These are valve 3: they survive as Stretch 2 and a Reference
     line if the clock is against us.)*
- **Question 4's answer is no**, and it matters: Lab 6 wants negative rpm for
  reverse, so the sign has to come from what the program **commanded**. That is the
  first stretch.

### Part 4: A Loop That Does Three Things at Three Rates *(10 min, predict → commit → explain)*

- **Opens on the problem, not the function.** By the end of the lab the program has
  to sample the pot at 100 Hz, count pulses as they arrive, and refresh the display —
  three jobs at three rates, and `delay_ms()` can only do one of them at a time. Lab 6
  says so outright: *"you may not use `delay_ms()` for timing."*
- **`milliseconds()`**, from `assets/starters/sysinit.c` — real code, quoted, not
  invented. SysTick reloads at 12000 − 1 from the 12 MHz clock, so the handler runs
  once a millisecond and increments a counter; `milliseconds()` returns it, and
  `delay_ms()` has been built on it since Day 2. **This is the first time the book
  names it**, and it is the last piece of course scaffolding that has been in every
  program all term without being opened.
- **Predict:** here is a loop that reads the pin and samples the ADC in the same
  100 Hz beat. At the top of the ramp the wheel gives about 60 pulses per second.
  What does the counter report? *(Fewer than 60, unpredictably — the same failure
  Day 9 Part 2 demonstrated with a button.)*
- **Then a two-minute commit, individually and then to the room, before either
  answer is given:** *given the pulse rate you measured in Part 2, will your loop
  poll or interrupt — and why?* This is the only task in the day that asks a student
  to make the decision Objective 5 names. **It is not a valve.**
- **Then the two answers, honestly**, at the strength the evidence supports (see the
  design-decision section above): the real condition is **T_poll < the shorter of the
  high time and the low time**, set by the duty cycle rather than the rate; the ~50 %
  duty is an assumption pending a source; and **the interrupt's real advantage is
  that it removes the dependence on the top speed altogether**. A falling-edge
  interrupt on PA15 is Day 9's five registers with 15 substituted for 4, landing in
  the same `EXTI4_15_IRQHandler` they already wrote. `EXTI_EXTICR4` is RM0490
  Table 47, offset 0x06C, top byte `EXTI15[7:0]`.
  *(This comparison is valve 2 — it moves into Part 6's opener if the clock is
  against us.)*

### Part 5: The Whole Build *(5 min, explain)*

- **The D7 → PA15 lookup**, UM2953 Table 11 — about two minutes, and it opens the
  Part because this is where the pin is needed. Strictly *which pin*, not which
  register set.
- Her slide 10, rebuilt: the complete Lab 6 system in one picture.
- **What is already written**, said out loud so nobody starts from nothing: the I2C
  library and the seven-segment driver from Day 10, `SevenSeg_number()` and the minus
  sign from the Day 10 homework — *with the pointer to `subsec-i2c-ref-ht16k33` for
  the pattern, since that piece was homework and was never reviewed in class* — the
  ADC read from Day 7, and the two TIM14 functions from Day 11x that become
  `motor_init()` and `motor_speed()`.
- **What is left**: `motor_mode()` from the truth table; the pot-to-speed mapping
  with its dead band; the pull-up on PA15, **internal or external**; the pulse
  counter; and the one-second window.
- **The dead band, worked rather than named.** One pass, ADC count → volts →
  direction → PWM value, at three counts: full counter-clockwise, inside the band,
  full clockwise. Lab 6 wants 0 V full reverse, 1.65 V stopped, 3.3 V full forward,
  and the word appears twice in this day and is defined nowhere else.
- **The order to build in, with a pass criterion for each stage** — her own slide
  10's firmware order, and Lab 6's hardware order:

  | Stage | It works when |
  | --- | --- |
  | the driver alone, on Waveforms, no motor connected | a square wave whose duty follows the speed you commanded |
  | the pot alone | `ADC1->DR` sweeps end to end as the knob turns |
  | the regulator alone | 5 V at its output with nothing else connected |
  | the motor added | it turns both ways, from the truth table |
  | the sensor added | the trace toggles once per slot |
  | **rpm to the screen** | the number tracks the ramp |
  | **the seven-segment display** | the same number, with its sign |

  The last two are her slide 10's firmware bullets 2 and 3, and they matter: a
  35-minute build with no milestone that is independent of the display working tends
  to end mid-I2C.
- **The hazards, plainly, once, before the build opens** — which wire, which rail,
  why (B-12 permits a physical claim; what it bans is drama and reassurance):
  - **The potentiometer's outer legs go to 3.3 V and ground, never to the 5 V rail.**
    Its wiper feeds PA0, which is an analog input on a 3.3 V part. This holds
    regardless of how Question 1 resolves, and it is the riskiest single wire in the
    day.
  - **The regulator's 5 V is motor power only** and never touches the breadboard's
    power rail — Lab 6 §2.3's own warning, and Day 11 taught the split.
  - **The 9 V adapter, the Nucleo and the regulator now share one ground**, and every
    ground on the board must be that ground. Day 11's rule, restated for the third
    supply.

### Part 6: Build *(35 min, floor 25)*

- **Opens on the main-loop sketch**, moved here from Part 4 so it gets unhurried
  thinking time with instructors already circulating: what does the loop do every
  pass, what every 10 ms, what every 1000 ms, and where does the pulse count get
  zeroed? `<instructor>` carries a worked answer (P-10), written as a worked example
  rather than as a driver, because there is no Day 12 driver file.
- **`counterResetButtonInt.c` is named explicitly as the starting point** for the
  pulse counter. Otherwise the day's newest technical piece goes from a demo of the
  broken version straight to independent build with only a projected example as a net
  (P-9).
- Then students build the Lab 6 system in the order Part 5 named, testing each stage
  against its pass criterion before adding the next.
- The three stretches are on a slide the room can see, so a group that reaches the
  RPM display has somewhere to go.
- *(S-25: nothing about who to ask, what to do if your build failed, or what is
  available if yours does not work goes into student-facing text. It is a presenter
  note.)*

### The close *(5 min, protected and announced)*

- Stop the build with five minutes left and have every group say where they are and
  what is left. It is the day's only consolidation, and it is the moment the crucial
  step gets checked out loud rather than assumed.
- *(S-8's arc ends in a recap or a look ahead. Gate 1 found there was none anywhere,
  because "wrap" was sharing a bucket with settling and two transitions and would
  have been the first thing to vanish.)*

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
| `subsec-motors-ref-speed` | **New with Day 12:** `RPM = 60 × PPS / N` **with its one-edge-per-slot condition**; Δθ = 2π/*N*; the measurement's own resolution (one pulse in a one-second window is 60/*N* rpm); the quadrature and decode-in-hardware asides if Part 3's valve was spent; and the EXTI row for line 15 — `EXTI_EXTICR4` offset 0x06C, `EXTI15[7:0]`, vector `EXTI4_15` — pointing at Day 9's fuller EXTI reference rather than copying it | Day 12 |
| `subsec-motors-ref-lookups` | **The datasheet-lookup table** (the shape `ch-adc.ptx` uses): what to look up, in which document, where. RM0490 §17.3.8 and §17.4; RM0490 §12.5.9 Table 47; TB6612FNG datasheet p. 4; UM2953 Table 11; and the EE-SX672 datasheet if it arrives | all verified |

**Handed to the follow-up session explicitly**, not left implicit. If that session
runs short, `subsec-motors-ref-tim14` is the one that must exist: it is the table
students will have open while writing `tb6612.c`.

---

## Risks

- **Part 2 is still the Part that can eat the hour**, even at 26 minutes.
  `expert-class-logistics` puts a realistic full-room number at 28–32; the six
  minutes it gained plus the two the D7 lookup returned are the difference, and 26 is
  stated as a floor of effort rather than an optimism. Its valves are named above and
  the pull-up is never one of them.
- **Two unresolved supply questions** (ground truth §4c, Questions 1 and 2), and one
  that decides whether the day's central safety claim is a lookup or an assumption
  (Question 3). The reading and the skeleton are written so that any answer fits: they
  say the pull-up goes to 3.3 V, which every source agrees on, and they assert nothing
  about the sensor's own VCC. **Nothing may say 5 V about anything on the logic side
  until she answers.**
  *If Question 2 has not come back by Gate 2′, it becomes the blocker on drafting
  Part 2 at all, rather than a held question — a wiring figure is the instruction for
  a student who has never wired a breadboard, and guessing at it is worse than
  waiting.*
- **Part 4 is new content beyond her deck.** It is justified — `milliseconds()` is a
  verified book-to-lab hole — but it is the Part a reviewer should challenge hardest,
  and `expert-cognitive-load` wanted its design activity moved out entirely. It has
  been, to Part 6; only the two-minute commit stayed, because Objective 5 otherwise
  has no task that asks a student to make the decision it names. **If Part 4 runs
  over on the day, the load argument was right and the commit is the first thing to
  go — but then Objective 5 has to be rewritten to stop claiming a choice the day
  never asks for.**
- **The 35-minute build is a judgment about how she runs this class** (Question 6),
  inferred from the shape of her deck rather than evidenced. If the real number is 45,
  the ten minutes come from Parts 1 and 5 — **not from Part 2 and not from the close**.
- **Gate 1 had no `checker-voice`, `checker-technical-accuracy` or
  `checker-figure-claims`.** The register pass and the fact-check on the drafted prose
  are still owed at Gate 2′ and must not be assumed clean because Gate 1 was quiet
  about them.
