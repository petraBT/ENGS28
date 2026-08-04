# Week 5 — Day 9 (GPIO Interrupts), Day 9x and Day 10 (I2C)

Three days, **two chapters**: `source/ch-gpio-interrupts.ptx` (Day 9) and
`source/ch-i2c.ptx` (Days 9x and 10 — Day 13 moves to
`ch-accelerometers.ptx`, decided before Step 2).  Old decks:
`Day09-Interrupts(2).pptx` (60 slides), `Day09X-I2C.pptx` (32),
`Day10-I2C(2).pptx` (56).  Ground truth: `plans/week5-ground-truth.md`.
Downstream: **Lab 5**, due Tue 10 Feb 2026.

**Revision 1** — for Gate 1.

---

## The shape of the week

| | Day 9 | Day 9x | Day 10 |
|---|---|---|---|
| Topic | GPIO interrupts (EXTI) | I2C: the protocol and the peripheral | The HT16K33 and its device driver |
| New machinery | 4 EXTI registers + BSRR | a whole protocol + a whole peripheral | one device's datasheet |
| What students *build* | an interrupt-driven counter | nothing — they wire, flash given code, and **look** | their first device driver |
| Load lands on | registers, and one subtle race | concepts | production |
| Inherits from | Day 8, almost entirely | Day 5 (UART), loosely | Day 9x, entirely |

The week has **one hard pivot and one smooth hand-off**.  Day 9 → Day 9x
shares no machinery at all; Day 9x → Day 10 shares everything.  The design
consequence is stated under *Where the load lands*, below, and it is why
Day 9x's hands-on work is deliberately mechanical.

---

# Day 9 — GPIO Interrupts

Chapter: `source/ch-gpio-interrupts.ptx`.

## Objectives

By the end of class a student can:

1. Say why a GPIO pin's interrupt goes through the EXTI before the NVIC —
   16 lines, one port each, sharing three vectors — and find which vector a
   given pin lands on.
2. Configure an external interrupt on PB4: select port B on line EXTI4
   (`EXTI_EXTICR2`), choose the falling edge (`EXTI_FTSR1`), unmask the line
   (`EXTI_IMR1`), enable it in the NVIC — and say what each of the four does
   and what breaks if it is missing.
3. Write `EXTI4_15_IRQHandler`: check `EXTI_FPR1` to find out *which* line
   fired, clear it by writing a 1, set a `volatile` flag — deriving the
   write-1-to-clear from the access type, as on Day 8.
4. Explain why changing shared **data** in an ISR can silently lose an
   update, and why setting a **flag** cannot — in terms of the
   read-modify-write the compiler emits.
5. Use `GPIOx->BSRR` to set or clear a pin with a single write, and say when
   that is required rather than merely tidier.

## The CRUCIAL step

> **Every student leaves with `counterResetButtonInt.c` running on their own
> board: pressing the button on PB4 resets the counter immediately, including
> during the one-second wait that the polled version slept through.**

Scaffolding to guarantee it (P-2), reusing Day 8's shape because it worked:

- The interrupt version is built **on top of code that is already running**:
  Part 2 has students run the complete `counterResetButtonPolled.c` (given,
  not written) and *observe the defect* — a short tap during the wait is
  missed, a tap-and-hold is caught.  The wiring is PB4 with pull-up and the
  debounce capacitor, which they have had since Day 3.
- **Part 2 ends with a checkpoint.**  A student whose polled build never ran
  is identified before Part 3 and given the verified-good file, not left to
  discover it at minute 45.  Parts 3–5 are whole-class off the projector, so
  a rescued student is fully in the room.
- The skeleton `counterResetButtonInt.c` has **three** `// TODO` clusters,
  and the plan is honest about where each is taught: TODO 1 (the four EXTI
  lines of `pb4_exti_init`) is taught fresh in Part 4, register by register,
  with the running checklist on screen.  TODO 2 (the ISR body) is taught
  fresh in Part 5.  TODO 3 (declare the flag `volatile`, consume it in
  `main`) is **resurfaced from Day 8**, not re-taught — a 60-second beat,
  because it is the identical pattern with a different flag name.
- The handler name is not guessable and not memorized: Part 4's second
  datasheet moment has students find `EXTI4_15` in RM0490 §11.3 Table 40
  themselves, exactly as they found TIM14 on Day 8, and the ISR name follows
  from the startup file by the same rule.
- The running **"what we need to do to program a pushbutton interrupt"**
  checklist — Petra's own device, deck slides 22/28/30/32, the same five
  items with one more check-mark each time — stays on screen for Parts 4–6.
  It is the day's map and it costs nothing.
- Safety framing, said once: nothing today can damage anything.  The button
  and capacitor are already wired from Day 3; the worst outcome is a counter
  that ignores the button.

## The STRETCH

**Small (inside Part 6, for fast finishers):** add the Nucleo's blue user
button on **PC13** so that pressing it reverses the counting direction (deck
slides 42–48).  Genuinely additional and genuinely harder, because PC13 is
also on lines 4–15: it shares `EXTI4_15_IRQHandler` with PB4, so the ISR now
has to *discriminate* on `FPIF4` vs `FPIF13` — the thing the single-button
version never forced them to understand.  Instructor solution from slide 43.

**Large (homework, nothing to submit):** modularize.  Move
`pb4_exti_init()` and `pc13_exti_init()` into `exti.c`/`exti.h` with an
include guard, `.h` into `Inc` and `.c` into `Src`, and watch `main.c` shrink
to its actual logic (deck slide 49).  This is the habit Lab 5 grades under
"Modularity" and the shape every remaining lab uses.

## Activity sequence (65 min)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | **Homework review**: `ADCPot` with a timer-interrupt blink. Compare with your table. One projected solution, one minute on why the ISR toggles the LED directly and gets away with it *here* — planted, collected in Part 7 | do/tell | 5 |
| 2 | **Run `counterResetButtonPolled.c`** (given): short tap vs tap-and-hold, on Coolterm. **What did the program miss, and where was it when it missed it?** Ends with the checkpoint | do → observe | 9 |
| 3 | Why the EXTI exists: the NVIC has no room for 16 more lines per port, so the EXTI multiplexes. 16 lines, one port each, **three** shared vectors — and PB4 therefore lands on `EXTI4_15` with eleven other pins | explain | 6 |
| 4 | The four registers, one at a time, against the running checklist: EXTICR2 (**datasheet moment 2**) → FTSR1 → IMR1 → NVIC | explain/do | 10 |
| 5 | The ISR: `FPR1` says *which* line; its access type says *how to clear it* (predict from Day 8, then verify); then the `volatile` flag, resurfaced | predict → explain | 6 |
| 6 | **Fill the three TODOs → build-swap → run.** CRUCIAL. Fast finishers get PC13 | do | 14 |
| 7 | **The cautionary tale, and BSRR** — see below | predict → explain → fix | 8 |
| 8 | Homework; one sentence on Thursday's pivot | tell | 2 |

**Part 2 is the day's tooling bottleneck**, as Part 4 was on Day 8: a Canvas
download, a project copy, and the first build of the day, before anything
teachable happens.  Nine minutes, its own click-path slide, and a hard
checkpoint at **minute 22**: if the room is not mostly counting, distribute
the verified-good file and move on.  Nobody debugs a download while the class
waits.

**If running long, cut in this order:** Part 1 to 2 minutes (project one
solution, skip the table discussion); Part 3's "other interrupt sources" list
(deck slide 13) — it is reading material; Part 5's `volatile` beat to a show
of hands if Day 8 landed.  **Entering Part 6 with fewer than 11 minutes:** do
TODO 1 on the projector — it is four lines they have just seen four times —
and let students write TODOs 2 and 3, which are the day's heart.
**Never cut Part 7 short of its fix.**  An unanswered "so the shorter
solution is broken?" is worse than not raising it (this is the Day 8 Part 5
lesson).  If Part 7 must shrink, drop the *disassembly* slide and keep the
two-solutions prediction and BSRR: the prediction is what makes it land and
BSRR is the deferred topic this chapter exists to spend.

**Equipment:** Nucleo, the PB4 button and debounce capacitor already wired
since Day 3, and Coolterm.  No new components.

## Part 7 — the race, and BSRR (P-5, and the deferred topic)

This is the beat `CHAPTER_PROCESS.md` reserved BSRR for, and it is designed
here rather than left to Step 3.  **BSRR appears in no old deck** — it is new
material.  What the old deck *does* have is the same race one level up, on a
software variable (slides 54–58, "A cautionary tale about interrupts"), and
that is the staging BSRR needs.  Four beats, in order:

1. **Two solutions, both working — commit before the reveal** (slide 55,
   `room="yes"`).  Both reset a counter on a button press.  One zeroes
   `counter` *inside the ISR* and is six lines shorter.  The other sets a
   flag and lets `main()` zero it.  Petra's slide asks "Shorter is better,
   right?"; the activity asks students to *commit* to one and say why, before
   anything is revealed.
2. **The disassembly** (slide 56).  `counter++` is five instructions:
   load the address, load the value, add one, load the address again, store.
   If the interrupt lands after the load, the ISR's `counter = 0` is
   overwritten by the write-back of the stale value plus one — **the reset is
   silently lost, and nothing reports it.**  Slide 57 shows why the flag
   version cannot fail: the ISR writes a variable nothing else is mid-way
   through.  Her moral, slide 58: distinguish data from control signals.
3. **The same shape, one level down — and now they have already done it.**
   Day 8's homework had the ISR toggle the LED directly with
   `GPIOA->ODR ^= LED`, and Petra's own speaker note on Day 9 slide 10 says
   *"don't change any data in the ISR (will discuss this later).  Toggling an
   LED is okay though."*  It is okay **there** only because nothing else
   touches `ODR`.  `ODR ^= LED` is read-modify-write on a *register*: exactly
   `counter++`, with the same failure.  The moment a second pin on the same
   port is driven from `main()` — Day 9's own two-button stretch, and **Lab
   5's Additional Feature 1**, where a red LED is flashed by a timer ISR
   while a green one is driven by the main loop — the write-back reverts the
   other side's pin, and the LED just... doesn't.
4. **The fix, from a page they already know** (datasheet moment 1).  Send
   them back to `GPIOx_ODR`, RM0490 §6.4.6 — the page they have been reading
   since Day 1 — and have them read the note at the bottom: *"For atomic bit
   set/reset, the OD bits can be individually set and/or reset by writing to
   the GPIOx_BSRR register."*  Then §6.4.7: `BSy` in bits [15:0] sets,
   `BRy` in [31:16] resets, **both write-only, a read always returns 0**.
   There is no read, so there is nothing to lose.

   ```c
   GPIOA->BSRR = GPIO_BSRR_BS5;   // PA5 high  -- one write, no read
   GPIOA->BSRR = GPIO_BSRR_BR5;   // PA5 low
   ```

   **And say what it does not do** (S-19).  BSRR has no toggle.  An ISR that
   wants to *invert* a pin still has to read something, so BSRR does not
   rescue `ODR ^= LED` — it rescues the *set* and the *clear*.  Keeping the
   pin's state in a variable one side owns, and driving the pin with BSRR, is
   what makes the toggle safe.  Which is beat 1's moral arriving a second
   time, in hardware: control signals, not data.

   Two honest footnotes, one line each: writing 0 to a BSRR bit does nothing,
   so one write can set some pins and clear others and disturb no third pin;
   and if a `BSy` and its `BRy` are both 1, the manual says set wins.
   `GPIOx_BRR` (§6.4.11) also exists and duplicates BSRR's upper half.

**Bound it.** Part 7 does not attempt `__disable_irq()`-as-critical-section
theory, priority, or nesting.  Day 8 already framed `__disable_irq()` in the
ISR as course practice with nesting named and not used; Part 7 adds nothing
to that, and the chapter's Reference section carries the written version.

## The datasheet moments (P-11)

Two, both load-bearing, and neither is "look it up because I said so":

1. **Part 7 — RM0490 §6.4.6 → §6.4.7.**  The answer to the race is a note at
   the bottom of a page they have used since Day 1 and never read to the end
   of.  That is the lesson, as much as BSRR is.
2. **Part 4 — RM0490 §12.5.6, `EXTI_EXTICRx`.**  The register is at
   `0x060 + 0x4*(x−1)` and holds four 8-bit fields, `EXTIm[7:0]` with
   `m = 4*(x−1)`.  Students derive that EXTI4 is therefore **EXTICR2, bits
   [7:0]** — the deck's own `4 = 4(2−1)+0` — then read the port code for B
   (`0x01`) off the same page, and then meet the C: `EXTI_EXTICR1..4` are
   `EXTI->EXTICR[0..3]`, because array indices start at 0.  Two things get
   found rather than told, and the array-index slip is met head-on instead of
   being a bug they hit at minute 50.

   Bonus lookup, thirty seconds inside Part 3, using Day 8's own habit:
   RM0490 §11.3 Table 40, position **7**, `EXTI4_15`, priority 14 — twelve
   pins, one vector, which is *why* the ISR has to check `FPR1`.

## Writing room (S-2)

Three committed answers before a reveal, all `room="yes"`:

- Part 2: *what did the program miss, and where was it when it missed it?*
- Part 5: *`TIM14->SR` cleared with a 0 and `ADC1->ISR` with a 1. Predict
  `EXTI_FPR1` — and say what you'd look up to check.*  (It is `rc_w1`.  This
  is Day 8's set-piece paying out: the point is not the answer, it is that
  they now know the question.)
- Part 7: *which of these two working solutions would you ship?*

These carry the day's P-14 hook.  An AI will hand over a complete
`pb4_exti_init()` in one shot — and it will also, in the same shot, cheerfully
hand over the version that zeroes the counter in the ISR, because that
version *works* in every test a student would run.  Part 7 is the activity an
AI answer does not survive: it asks which of two working programs is right,
and why.

## Hand-offs

**Pre-class: reading only, no video** (B-2).  Day 9 is a *variation* on Day 8,
not a new mechanism, so there is nothing that needs a video the way the
interrupt mechanism did.  The reading motivates and introduces; it does not
build machinery.

*The reading establishes (ideas only):* the Lab 2 button-race false start —
the same motivation Petra used on slide 12, and one students felt — as the
thing polling cannot fix; that a pin, not just a timer, can be an interrupt
source, and a one-paragraph list of what else on this chip can be (slide 13:
watchdog, USART/SPI/I2C, ADC, DMA); that the pins go through *something*
called the EXTI before the NVIC, and **why** — no room for 16 lines per port
— with no registers named.  Nothing about EXTICR, FTSR1, IMR1 or FPR1, and
**nothing about BSRR or the race**: Part 7's commit moment dies if the
reading gives it away.

**Class deepens, does not repeat** (B-8).  The reading says a pin can
interrupt; class programs it.  The reading says the EXTI multiplexes; class
derives which register and which byte.

**Homework (due Thursday):** the deck's Coding Challenge 1 —
`counterResetButtonIntTimer.c`: replace `delay_ms()` in
`counterResetButtonInt.c` with a 1-second timer interrupt, so the program has
**two** interrupt sources and no blocking wait anywhere.  Deck slide 52 is
the solution.  Plus, optional and nothing to submit, the modularization
stretch and the deck's Coding Challenge 2 (`ADCPot` on a timer), which is a
head start on Lab 5 and which Day 10 opens by reviewing.

**Lab 5 needs (P-13 — checked, not taught):** Lab 5 does not require GPIO
interrupts at all.  What it takes from Day 9 is the *timer*-interrupt
homework and — for Additional Feature 1 — BSRR.  Day 9's own material is
in-class and homework learning in its own right; its downstream consumers are
Lab 6's tachometer and general fluency.

**Day 9x needs nothing from Day 9.**  See the pivot note below.

---

# Days 9x and 10 — I2C

Chapter: `source/ch-i2c.ptx`.  One chapter, two in-class sections.

## The rebalance, stated up front

The old decks are lopsided: Day 9x is 32 slides of pure exposition with
**nothing for students to do**, and Day 10 is 56 slides that Petra's own
speaker note concedes will not finish (*"If you get this done today you are
doing really well.  Most likely you won't get any further"* — slide 53).

**The plan moves the ping-and-capture block (old Day 10 slides 14–30) back to
Day 9x.**  It is the natural payoff of Day 9x's protocol material — you have
just learned START, address, ACK, STOP; now go find them on a wire with your
own board — and it de-loads Day 10 so that the display, its datasheet, and
the device driver get a full hour, which is what Lab 5 depends on.

This is the largest structural divergence from the old decks in the week, and
Gate 1 should test it specifically.

## Where the load lands (the pivot)

Day 9 → Day 9x shares **no machinery**: no NVIC, no ISR, no flags, no EXTI.
The only carry-overs are habits — assign a mask rather than compound-assign
(the I2C library's `I2C1->CR2 = ...` is commented *"use `=` to ensure all
other bits are cleared"*, which is Day 8's moral verbatim), and go to the
reference manual for a number rather than guessing it.

So the week's cognitive peaks are deliberately different in *kind*, and that
is the mitigation:

- **Day 9 is a register day.** Four new registers, but every surrounding
  concept is Day 8's. Load is high, transfer is high.
- **Day 9x is the conceptual peak** — a whole protocol and a whole
  peripheral, with almost no transfer available. So its *doing* is
  deliberately mechanical: four wires, given code, and an oscilloscope. The
  new load is carried by the pre-class reading and by looking at a trace, not
  by writing code while also learning the protocol.
- **Day 10 is the production peak** — the most code students write all week,
  but on a protocol that is by then twenty-four hours old and visible.

**If the week runs long, this is the cut order across all three days:**
Day 9's PC13 stretch (it is already a stretch) → Day 9x's Waveforms
logic-analyzer *decode* setup, which moves to Day 10's opening or to homework
→ Day 9x's field-by-field walk of `I2C_CR2`, which moves to Reference → Day
10's Coding Challenges 2 and 3, which are homework and Lab 5 anyway → Day
10's `SevenSeg_number()`, which Lab 5 does not require.  **Not cuttable:**
Day 9x's capture (it is the crucial step) and Day 10's `SevenSeg_write()`
(Lab 5 is built on it).

---

# Day 9x — I2C: the protocol and the peripheral

## Objectives

By the end of class a student can:

1. Identify, on a real captured trace, the START, the seven address bits, the
   R/W bit, the ACK, a data byte, and the STOP — and say which SDA edges are
   legal where.
2. Say what makes I2C synchronous and why that removes the baud-rate
   agreement UART needs, and what it costs.
3. Name the five operations an I2C library has to provide, and say why those
   five and not others.
4. Read the `I2C_TIMINGR` settings for a 12 MHz clock out of RM0490 §23.4.10
   and say what PRESC is for.
5. Recognize a NACK on a trace and name its three usual causes.

## The CRUCIAL step

> **Every student captures a real I2C transaction from their own board on the
> AD2 and points to the START, the address bits, the R/W bit, the ACK from
> the display, and the STOP.**

Scaffolding (P-2):

- The code is **given and five lines long** (`pingDisplay.c`, deck slide 16).
  Students are not writing I2C on the day they learn I2C.
- The wiring is **four wires** — +V, GND, SDA, SCL — into a breakout that
  carries its own pull-ups (deck slide 17).
- The AD2 in oscilloscope mode is Day 3 equipment used the Day 3 way; the
  only new step is a single sweep.
- The trace is walked **on the projector first**, with Petra's own two
  questions (slide 19: *can you find the start condition, and how do you
  know?*  *What address is being sent?*), before students are asked to find
  the same things in their own.
- A student whose display never ACKs still has a trace — the address bits and
  the NACK are both there — so the activity does not fail closed.

## The STRETCH

Petra's own, deck slides 21–25, already written as a two-tier task: **ping
the wrong address** (change `0x70` to `0x60`), capture, and find the NACK and
the STOP the controller issues in response; then **change the data byte** and
read the new bit pattern off the trace.  Further: set Waveforms to Logic mode
and add an I2C decoder (slides 26–28), which turns the trace into text and is
the tool they will actually reach for in Lab 5.

## Activity sequence (65 min)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | **The problem**: 34 LEDs in a four-digit display; how many pins? (deck slide 3, a real count, not rhetorical) → the answer is two wires and a backpack | predict → tell | 5 |
| 2 | Serial we already know: UART's baud-rate agreement (Day 5) → what a **shared clock** buys and costs. Controller/target, one bus, an address per device | explain | 6 |
| 3 | The protocol, resurfaced from the reading in one figure: START / address+R/W / ACK / data / STOP, and the "SDA changes only while SCL is low" rule that makes START and STOP unmistakable | explain | 5 |
| 4 | **Wire it, flash `pingDisplay.c`, take a single sweep.** CRUCIAL. Walk one trace on the projector, then their own | do | 15 |
| 5 | Stretch tier, for the room: wrong address → find the NACK; different data byte → read the bits | do | 7 |
| 6 | Now the chip end: the I2C peripheral's registers, and the **five functions** a library needs — derived by the class from the protocol before the list is shown | predict → reveal | 8 |
| 7 | `i2c1_init()`: the pins (PB8/PB9, AF6, **open-drain**, and why open-drain is not optional here), then the timing register (**datasheet moment**) | explain | 8 |
| 8 | Addressing, and the trap: 7-bit vs 8-bit addresses in datasheets | tell | 4 |
| 9 | Recap; Thursday is the display | tell | 2 |

**Part 4 is the bottleneck** and it is a different kind from Day 9's: four
wires per student and an instrument, not a download.  Fifteen minutes, a
wiring photo on screen for the whole part, and the same rule — a student
whose board will not ping moves on with a partner's trace and debugs in Part
5.

## Observe → explain (P-5)

The day is built the right way round, which the old deck was not.  Part 4
puts a real transaction on a screen **before** Part 6 opens a single
register.  The ACK in particular is much easier to believe once you have
watched the controller let go of SDA and something else pull it down.  Petra's
speaker note on slide 19 is the explanation to have ready, and it is a good
one: the controller keeps clocking through the ninth pulse, releases the line,
and the target grabs it during the low phase so the value is stable when the
clock next rises.

## The datasheet moment (P-11)

**RM0490 §23.4.10, "I2C_TIMINGR register configuration examples."**  Find the
row for our clock and read off `PRESC = 0x2`, `SCLL = 0x13`, `SCLH = 0xF`,
`SDADEL = 0x2`, `SCLDEL = 0x4`.  The *reason* is the point and it is worth
the extra minute (S-14): every row in that table divides its clock down to
**4 MHz** — 8 MHz with PRESC 0x1, 16 MHz with 0x3, 48 MHz with 0xB, and our
12 MHz with 0x2 — so PRESC is not a magic constant per board, it is
`clock / 4 MHz − 1`, and a student who changes the system clock now knows
which number to change.  (This is Petra's own instructor note on slide 21,
marked SKIP.  It should not be skipped; it is the only thing that makes the
table make sense.)

## Hand-offs

**Pre-class: reading only.**  The rough chapter's `sec-i2c-how-it-works` is
already close to right for this and is the one part of `ch-i2c.ptx` worth
keeping: two wires and a shared bus, open-drain, addressing and ACK/NACK,
START/STOP framing, synchronous vs asynchronous.  It needs voice work and its
`fig-i2c-frame-diagram` caption checked, not rewriting.  Its three reading
questions are sound.

*The reading must not establish:* any STM32 register, the timing values, or
what a captured trace looks like.  Part 4's "can you find the START?" needs
students who have read the definition and never seen one.

**Homework (due Thursday):** none new — Day 9's timer homework is due, and
Day 10 opens by reviewing it.  This is deliberate: Day 9x is the heaviest
*conceptual* day of the week and the lightest homework night.

**Day 10 needs from here:** the five library functions by name, the 7-bit
address and the fact that the hardware shifts it left and appends R/W, and
the AD2 as the instrument you reach for when a device does not answer.

---

# Day 10 — The HT16K33 and its device driver

## Objectives

By the end of class a student can:

1. Explain why a four-digit display needs 14 wires and time-division
   multiplexing, and what the backpack does with them.
2. Read the HT16K33's command table out of its datasheet and construct the
   three initialization bytes.
3. Describe the display RAM's layout — two bytes per digit, segments in the
   first, always 0 in the second — and write a byte pattern that produces a
   chosen character.
4. Write a device-driver function that talks to hardware **only** through the
   I2C library, and say why the layering matters.
5. Write the whole display in one transaction with `i2c1_memWrite()`.

## The CRUCIAL step

> **Every student's own four-digit display shows `ES.28`, written from a
> ten-byte buffer through their own `SevenSeg_write()`.**

Scaffolding (P-2):

- The path is staged: **one digit first** (`writeFirstDigit.c`, given, one
  line changed) → then the buffer → then the driver function that writes all
  of it.  A student who stalls still has a lit digit.
- `SevenSeg_write()` is **one call** to `i2c1_memWrite()` once the RAM map is
  understood, so the crucial step's difficulty is the *understanding*, which
  Parts 3–4 build, not the typing.
- Part 4's "make a pattern" activity (deck slide 37) has students construct
  segment bytes **on paper** before any of it is code, so the buffer is not
  simultaneously a new idea and a debugging surface.
- The instructor solution for all three driver functions is Petra's own, deck
  slide 52.

## The STRETCH

Deck Coding Challenge 2 (slides 54–55): `ES.28` steady → wait 1 s → blink at
1 Hz → wait 5 s → back to steady at lower brightness.  This exercises
`SevenSeg_blink()` and `SevenSeg_dim()`, which the crucial step does not.
Further, Challenge 3: the counters — 16-bit unsigned, 8-bit signed with a
minus sign, and a `MM:SS` clock using the colon.  Petra's note is explicit
that Challenge 3 *is* the setup for Lab 5, so it is stretch here and homework
for everyone.

## Activity sequence (65 min)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | **Homework review + the AI critique.** Petra's own: she asked ChatGPT and Gemini to do the counter-with-timer-reset assignment. Groups pick one generated solution and answer three questions — advantages over yours, problems in it, would you revise? (deck slides 4–8) | do | 10 |
| 2 | How the display is actually built: common cathode, four digits sharing seven anodes, 34 LEDs on 14 wires, multiplexed fast enough to fool the eye → therefore a backpack | explain | 6 |
| 3 | The HT16K33's commands, **from its datasheet** (datasheet moment): oscillator on, display on/blink, brightness | do → explain | 7 |
| 4 | The display RAM: two bytes per digit, segments in the first, 0 in the second, digits at 0/2/4/6/8. **Make a pattern** (paper) → reveal | predict → reveal | 8 |
| 5 | **Write one digit** (`writeFirstDigit.c`, given): change the digit, change the character | do | 7 |
| 6 | Firmware layers: main → device driver → I2C library → registers, and the rule that a driver never touches machine registers | explain | 4 |
| 7 | **Complete `SevenSeg_blink()`, `SevenSeg_dim()`, `SevenSeg_write()`; run it; show `ES.28`.** CRUCIAL | do | 14 |
| 8 | Challenges 2 and 3 as homework; what Lab 5 asks for | tell | 4 |

**Part 1 is not padding.**  It is the week's P-14 beat and it is Petra's
design: students who have just written the program read two AI versions of it
and are asked to judge them.  It also reviews the homework without a
solution slide.  Ten minutes, and it is the first thing to compress (to 6)
if Part 7 looks threatened — but not to cut, because Part 7 is where students
first write code they will be graded on for reuse.

**If Part 7 has fewer than 11 minutes:** do `SevenSeg_dim()` on the
projector (it is one line and the same shape as `blink`) and let students
write `blink` and `write`.

## The datasheet moment (P-11)

**HT16K33 datasheet, pp. 24–25** — the command table.  Students derive
`0x21`, `0x81`, and `0xEF` rather than being handed them: the system-setup
command is `0b0010000S` with S the oscillator bit, so oscillator-on is
`0x20 | 0x01`; display setup is a command plus blink-rate options, so
on-and-not-blinking is `0x80 | 0x01`; dimming is a command plus a
four-bit brightness, so full is `0xE0 | 0x0F`.  Then **p. 22** for the
page-write operation that lets ten bytes go out in one transaction.

This is also where the `#define` names come from — `HT16K33_SYSTEM_CMD`,
`HT16K33_OSC_ON`, `HT16K33_DISPLAY_CMD`, `HT16K33_BRIGHT_CMD` — which is
Petra's own "nice way to structure writing a device driver" (slide 49): the
datasheet's structure becomes the header file's structure.

## Hand-offs

**Pre-class: reading only**, and short.  The display hardware (common
cathode, multiplexing, why 14 wires) is concrete enough to read about, and
the HT16K33's role — a chip whose whole job is to do the multiplexing and
speak I2C — is one paragraph.  **The reading must not give the RAM map**:
Part 4's pattern activity needs it fresh.

**Homework (due Tuesday, before Lab 5 is due):** deck Challenges 2 and 3.
Challenge 3's counters are, in Petra's words, the setup for Lab 5.

**Lab 5 needs (P-13 — checked, not taught):** `SevenSeg_init/blink/dim/write`
as a modular pair of files in `Library`.  The chapter teaches all four.
**Note the conflict resolved in ground truth §4:** the chapter follows the
deck's `void SevenSeg_write(uint8_t *display_buffer)` over
`uint8_t[2*HT16K33_NBUF]`; **Lab 5 §3.3's prototype block still says
`uint16_t *` over `HT16K33_NBUF`, and needs updating by hand.**  This is on
the flag list.

**Day 13 needs from here:** the firmware-layer discipline and the I2C
library, both of which it replays as review before the accelerometer.  Day 13
is authored later, in `ch-accelerometers.ptx`.

---

## Notes from the old decks worth keeping

- **Day 9 slide 12** — the Lab 2 button-race false start as the motivation.
  Students *felt* this one; it is worth more than a hypothetical.
- **Day 9 slide 19's speaker notes** — why `IMR1` is separate from `FTSR1`:
  detection and interrupt generation are deliberately decoupled, so an event
  can be detected and polled via the pending register without ever
  interrupting, which matters for low power. Reference material, one
  paragraph, not a slide.
- **Day 9 slide 38's speaker note** — Petra correcting her own comment: "check
  that EXTI4 interrupted" should read "check that a falling-edge event
  happened on EXTI4." Use the corrected wording in the chapter's listing.
- **Day 9x slide 27's speaker notes** — the 7-bit/8-bit address confusion,
  with the course's own story: *"This actually happened to us and we totally
  messed it up."* Keep it; it is the only war story in the week and it is
  about reading a datasheet carefully.
- **Day 9x slide 19's speaker notes** — open-drain's three reasons
  (multi-controller safety, arbitration, clock stretching). The reading takes
  the first; the rest is Reference.
- **Day 10 slide 32's speaker notes** — the worked "how do you turn on the
  'a' segment in digit 2?" walk-through. It is the clearest explanation of
  the common-cathode scheme anywhere in the decks.
- **Day 10 slide 35's speaker notes** — *"If you don't write the zeros, the
  pointer won't advance."* That single sentence prevents the day's most
  likely silent bug.

## Gaps that must be closed before or during Step 3

Full detail in `plans/week5-ground-truth.md` §5 and §7.

1. **`SevenSegPartial.h` is not in the repo**, so the `HT16K33_*` `#define`
   *values* and `numbertable[]` cannot be quoted (B-6). The plan turns this
   into an advantage — Part 3 has students derive the command bytes from the
   datasheet — but the chapter cannot print the header block until Petra
   supplies the file.
2. **`ES28.h` is still missing** (open since Day 8): `EXTI_PB`, `EXTI_PC`,
   `GPIO_INPUT`, `GPIO_PULLUP`, `GPIO_ALTERNATE`, `GPIO_AF6`, `delay_ms()`.
   Names are used throughout; no value is quoted anywhere, so this does not
   block.
3. **`i2c1_memWrite()`'s body is in no deck.** Not a blocker — students are
   given the library and only call it — but the chapter should not pretend to
   show it.
4. **Starter files to be written and registered in `check_starters.py`:**
   `counterResetButtonPolled.c`, `counterResetButtonInt.c` (three-TODO
   skeleton), `pingDisplay.c`, `writeFirstDigit.c`, `SevenSegPartial.c`.
   All are recovered complete or near-complete in ground truth §1.
5. **Every figure in both rough chapters is unannotated raw extraction** and
   must be rebuilt with `pptx_annotate.py` and *looked at* (P-12, and the ADC
   pilot's hardest-won lesson).

## Flags for Petra

1. **[REBALANCE]** Ping-and-capture moves from Day 10 to Day 9x, so that 9x
   has hands-on work and Day 10 has room for the driver. Biggest divergence
   from the old decks this week — see *The rebalance*, above.
2. **[BSRR]** The whole Part 7 design is new material with no deck
   precedent, staged on your own slides 54–58. In particular: the chapter
   will say plainly that BSRR has no atomic *toggle*, so `ODR ^= LED` in an
   ISR is not fixed by it. Please check that is the framing you want.
3. **[LAB 5]** §3.3's prototype block declares
   `void SevenSeg_write(uint16_t *display_buffer)` over `HT16K33_NBUF`, but
   your Day 10 solution uses `uint8_t *` over `2*HT16K33_NBUF`. The chapter
   follows the deck (your decision); the lab PDF needs the matching edit.
4. **[FILES]** `SevenSegPartial.h` and `ES28.h` (§5 above).
5. **[MINOR]** `counterResetButtonPolled.c` `#define`s `WAIT` and never uses
   it; the polled version waits with `delay_ms(1000)` and the interrupt
   version with `for (int i=0; i<WAIT; i++){}`. Which should ship?
6. **[MINOR]** Day 10 slide 55's `main()` ends `return 0;` where the course
   convention (B-14) is `return 1;`. Normalizing to `return 1;` unless you
   say otherwise.
7. **[CONFIRM]** Day 9's pre-class package is **reading only** — no video.
   Day 9 varies Day 8's mechanism rather than introducing one, so nothing
   here needs the treatment `volatile` and the vector table needed.
