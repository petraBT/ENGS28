# Week 5 — Day 9 (GPIO Interrupts), Day 9x and Day 10 (I2C)

Three days, **two chapters**: `source/ch-gpio-interrupts.ptx` (Day 9) and
`source/ch-i2c.ptx` (Days 9x and 10 — Day 13 moves to
`ch-accelerometers.ptx`, decided before Step 2).  Old decks:
`Day09-Interrupts(2).pptx` (60 slides), `Day09X-I2C.pptx` (32),
`Day10-I2C(2).pptx` (56).  Ground truth: `plans/week5-ground-truth.md`.
Downstream: **Lab 5**, due Tue 10 Feb 2026.

**Revision 2** — rebuilt after Gate 1 (3 BLOCKER, 4 PASS WITH CHANGES).
Reports in `reviews/week5-gate1.md`; "What Gate 1 changed" is at the end.

---

## The shape of the week

| | Day 9 | Day 9x | Day 10 |
|---|---|---|---|
| Topic | GPIO interrupts (EXTI) | I2C: the protocol and the peripheral | The HT16K33 and its device driver |
| New machinery | 4 EXTI registers + BSRR | a whole protocol + a whole peripheral | one device's datasheet |
| What students *build* | an interrupt-driven counter | nothing — they wire, flash given code, and **look** | their first device driver |
| Load lands on | registers, and one subtle race | concepts | production |
| Inherits from | Day 8, almost entirely | Day 5 (UART), loosely | Day 9x, entirely |
| The Arduino call it replaces | `attachInterrupt()` | `Wire.h` | `Adafruit_LEDBackpack.h` |

The week has **one hard pivot and one smooth hand-off**.  Day 9 → Day 9x
shares no machinery at all; Day 9x → Day 10 shares everything.

**The last row is not decoration.**  Every day this week replaces a one-line
Arduino call with a page of register work, and a student who has written that
one line before will read the register work as ceremony unless the plan says
what the one line was doing.  Day 8 built this defusing and placed it early
(day8.md Part 6a, `attachInterrupt()`); this week is where it actually bites,
three times.  Each day carries a named beat for it — Day 9 Part 3, Day 9x Part
6, Day 10 Part 7 — and none of them is cuttable.

## Standing rules for all three days

Two things Gate 1 found missing on every day at once, so they are stated here
rather than repeated three times.

**Wiring is verified before it is depended on.**  Day 9's button was wired on
Day 3; Day 10's display was wired on Day 9x and went home in a kit in between.
Neither is a safe assumption (B-11c), and a rescue that hands over a
known-good `.c` file does nothing for a disconnected wire.  So each day that
depends on carried-over wiring opens with a short verification beat that runs
a program known to have worked, and each rescue distinguishes the two cases:

> **Hardware or software?**  Run the program that worked last time, unchanged.
> If it still works, the wiring is fine and the fault is in today's code.  If
> it does not, re-seat the wires against the photo before touching any code.

**Safety is stated once per day, plainly, before the wiring happens.**  Day 9:
nothing today can damage anything.  Day 9x: what happens if +V and GND are
swapped on the display breakout — **to be confirmed with Petra, flag 8**;
until then the slide says only what is verified.  Day 10: unchanged from
Day 9x.

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
   (`EXTI_IMR1`), enable it in the NVIC — and say what each of the four does,
   what breaks if it is missing, and which of them `attachInterrupt()` was
   doing on your behalf.
3. Write `EXTI4_15_IRQHandler`: check `EXTI_FPR1` to find out *which* line
   fired, clear it by writing a 1, set a `volatile` flag — deriving the
   write-1-to-clear from the access type, as on Day 8.
4. Explain why changing shared **data** in an ISR can silently lose an
   update, and why setting a **flag** cannot — in terms of the
   read-modify-write the compiler emits.
5. **Write** a `GPIOx->BSRR` line that sets or clears a pin without a read,
   and say when that is required rather than merely tidier.

## The CRUCIAL step

> **Every student leaves with `counterResetButtonInt.c` running on their own
> board: pressing the button on PB4 resets the counter immediately, including
> during the one-second wait that the polled version slept through.**

Scaffolding to guarantee it (P-2), reusing Day 8's shape because it worked:

- The interrupt version is built **on top of code that is already running**:
  Part 2 has students run the complete `counterResetButtonPolled.c` (given,
  not written) and *observe the defect* — a short tap during the wait is
  missed, a tap-and-hold is caught.
- **Part 2 opens with the wiring check** (standing rule above).  PB4's button and
  pull-up were wired on **Day 3** and its debounce capacitor on **Day 3x**,
  eight class meetings and six chapters ago, on a breadboard that has since carried a transistor
  circuit and a potentiometer.  Nobody is asked to assume it survived.
- **Part 2 ends with a checkpoint at minute 18.**  If the room is not mostly
  counting, distribute the verified-good file and move on.  Parts 3–5 are
  whole-class off the projector, so a rescued student is fully in the room.
- The skeleton `counterResetButtonInt.c` has **three** `// TODO` clusters, and
  the plan is honest about where each is taught.  TODO 1 (the four EXTI lines
  of `pb4_exti_init`) is taught fresh in Parts 4a–4b, register by register.
  TODO 2 (the ISR body) is taught fresh in Part 5.  TODO 3 (declare the flag
  `volatile`, consume it in `main`) is **resurfaced from Day 8** — but see the
  note below on what "resurfaced" may and may not assume.
- The handler name is not guessable and not memorized: Part 3's thirty-second
  lookup has students find `EXTI4_15` in RM0490 §11.3 Table 40 themselves,
  exactly as they found TIM14 on Day 8.
- The running **"what we need to do to program a pushbutton interrupt"**
  checklist — Petra's own device, deck slides 22/28/30/32, the same five items
  with one more check-mark each time — stays on screen for Parts 4a–6.
- **A diagnostic ladder stays on screen for all of Part 6**, in Day 8's shape,
  because a dead button has four distinguishable causes and a student should
  not have to guess which: (1) does the *polled* version still count and
  respond? — if yes the wiring is fine and the fault is in the interrupt path;
  (2) is `EXTI->EXTICR[1]` set to `EXTI_PB`, and is it `EXTICR[1]` and not
  `EXTICR[2]`? (3) is the handler named exactly `EXTI4_15_IRQHandler`, copied
  from the startup file? (4) are *all four* enables present — EXTICR, FTSR1,
  IMR1, NVIC?
- Safety framing, said once, early: **nothing today can damage anything.**

**On "resurfaced" (Gate 1, firstgen).** TODO 3's `volatile` gets 60 seconds
because B-8 forbids re-teaching it — but sixty seconds of the same explanation
does nothing for a student who copied the pattern on Day 8 without absorbing
it.  So the beat is not a repeat: it is the *same rule from the other end* —
"nothing in `main()` writes this flag; write it down and see whether the
compiler could tell" — and the written version, with `fig-compiler-view`, is
one click away in Day 8's Reference section, which the slide names.

## The STRETCH

**Small (inside Part 6, for fast finishers):** add the Nucleo's blue user
button on **PC13** so that pressing it reverses the counting direction (deck
slides 42–48).  Genuinely additional and genuinely harder, because PC13 is
also on lines 4–15: it shares `EXTI4_15_IRQHandler` with PB4, so the ISR now
has to *discriminate* on `FPIF4` vs `FPIF13` — the thing the single-button
version never forced them to understand.  Instructor solution from slide 43.

**Large (homework, nothing to submit):** modularize.  Move `pb4_exti_init()`
and `pc13_exti_init()` into `exti.c`/`exti.h` with an include guard, `.h` into
`Inc` and `.c` into `Src`, and watch `main.c` shrink to its actual logic (deck
slide 49).  This is the habit Lab 5 grades under "Modularity".

## Activity sequence (~65 min built, 110 available)

**The class length, stated once, because the earlier revisions of this plan had
it wrong.**  Day N with N odd is a Tuesday and runs **110 minutes**; Day Nx is a
Wednesday x-hour and runs **50**; Day N with N even is a Thursday and runs
**110**.  Day 9 is therefore a 110-minute class, and the table below sums to 65
— about **45 minutes of slack**.  Nothing on Day 9 has to be cut for time.  The
cut order below is kept because it is still the right order to shed material in
if a part overruns, not because the day is over budget.

(For contrast, and not acted on here: **Day 9x is the overcommitted day of the
week** — 50 minutes available against roughly 64 built.  Its own section still
says 65 min.)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | **Homework review**: `ADCPot` with a timer-interrupt blink. Compare with your table; one projected solution. **Note, without explaining, that this ISR writes `GPIOA->ODR` directly** — planted, collected in Part 7 | do/tell | 4 |
| 2 | **Wiring check, then run `counterResetButtonPolled.c`** (given): short tap vs tap-and-hold, on Coolterm. **What did the program miss, and where was it when it missed it?** Checkpoint at minute 18 | do → observe | 9 |
| 3 | Why the EXTI exists: no room in the NVIC for 16 more lines per port, so the EXTI multiplexes. 16 lines, one port each, **three** shared vectors → PB4 lands on `EXTI4_15` with eleven other pins (30-s Table 40 lookup). **Then: what `attachInterrupt(digitalPinToInterrupt(4), isr, FALLING)` was doing for you**, argument by argument | explain | 6 |
| 4a | `EXTI_EXTICR2`: which register, which byte, which port code — **datasheet moment 2**, derived not told, plus the `EXTICR[1]` array-index catch | do → explain | 6 |
| 4b | `EXTI_FTSR1` → `EXTI_IMR1` → NVIC. Framed as Day 8's two-enable pattern, now four switches: the timer needed DIER + NVIC; a pin needs a port selected, an edge chosen, a mask lifted, and the NVIC | explain | 4 |
| 5 | The ISR: `FPR1` says *which* line; **predict its access type from Day 8, then verify**; clear it; then the `volatile` flag, resurfaced from the other end | predict → explain | 5 |
| 6 | **Fill the three TODOs → build-swap → run.** CRUCIAL. Ladder on screen. Fast finishers get PC13. Closes with the bounce note | do | 13 |
| 7 | **The cautionary tale, and BSRR** — five beats, below | predict → explain → fix | 11 |
| 8 | Homework; one sentence on Thursday's pivot | tell | 2 |

**Part 2 is the day's tooling bottleneck**, as Part 4 was on Day 8: a wiring
check, a Canvas download, a project copy, and the first build of the day,
before anything teachable happens.  Nine minutes and a hard checkpoint at
**minute 18** (3 settling + 2 announcements + 4 + 9).  Two rescues, because
there are two failures: a bad download or build gets the verified-good file; a
dead button gets re-seated against the Day 3x photo.  Nobody debugs either one
while the class waits.

**If a part overruns — the day itself has slack, so this is about pace, not
about the clock running out — cut in this order:** Part 1 to 2 minutes (project one
solution, skip the table discussion); Part 3's "other interrupt sources" list
(deck slide 13) — it is reading material; Part 5's `volatile` beat to a show
of hands if Day 8 landed.  **Entering Part 6 with fewer than 10 minutes:** do
TODO 1 on the projector — four lines they have just seen four times — and let
students write TODOs 2 and 3, which are the day's heart.  **Never cut Part 7
short of its fix**, and never cut the `attachInterrupt()` beat: an unanswered
"so the shorter solution is broken?" is worse than not raising it (the Day 8
Part 5 lesson), and a student who leaves believing four registers were
ceremony has learned the wrong thing.  If Part 7 must shrink, drop the
*disassembly* slide and keep beats 1, 3, 4 and 5.

**Equipment:** Nucleo, the PB4 button and debounce capacitor (wired on Day 3 —
**verified, not assumed**, in Part 2), and Coolterm.  No new components.

## Part 7 — the race, and BSRR (P-5, and the deferred topic)

This is the beat `CHAPTER_PROCESS.md` reserved BSRR for, and it is designed
here rather than left to Step 3.  **BSRR appears in no old deck** — it is new
material.  What the old deck *does* have is the same race one level up, on a
software variable (slides 54–58, "A cautionary tale about interrupts"), and
that is the staging BSRR needs.  Five beats:

1. **Two solutions, both working — commit before the reveal** (slide 55,
   `room="yes"`).  Both reset a counter on a button press.  One zeroes
   `counter` *inside the ISR* and is six lines shorter.  The other sets a flag
   and lets `main()` zero it.  Petra's slide asks "Shorter is better, right?";
   the activity asks students to *commit* to one and say why.  **Framed so a
   wrong guess is the expected outcome** (S-17): there is no right answer yet —
   you are about to find out why the obvious one fails.
2. **The disassembly** (slide 56).  `counter++` is five instructions: load the
   address, load the value, add one, load the address again, store.  If the
   interrupt lands after the load, the ISR's `counter = 0` is overwritten by
   the write-back of the stale value plus one — **the reset is silently lost,
   and nothing reports it.**  Slide 57 shows why the flag version cannot fail.
   Her moral, slide 58: distinguish data from control signals.
   *This beat gets its own pause for questions before beat 3 starts.  A student
   with no assembly background can follow the argument but cannot check it, and
   the plan should not pretend that takes zero time.*
3. **The same shape, one level down — and they have already written it.**
   Day 8's homework had the ISR toggle the LED with `GPIOA->ODR ^= LED`, and
   Part 1 pointed at that line this morning without saying why.  Petra's own
   speaker note on Day 9 slide 10 says *"don't change any data in the ISR (will
   discuss this later).  Toggling an LED is okay though."*  It is okay **there**
   only because nothing else touches `ODR`.  `ODR ^= LED` is read-modify-write
   on a *register*: exactly `counter++`, with the same failure.
   **Where this stops being hypothetical is Lab 5's Additional Feature 1** — a
   red LED flashed at 1 Hz by a timer ISR while a green LED is driven from the
   main loop, both on GPIOA.  (Gate 1 caught Revision 1 citing the two-button
   stretch here as well.  That was wrong: `pc13_exti_init()` and the shared
   handler only set a direction variable — no code in that stretch writes `ODR`
   from `main()` at all.  Lab 5 AF1 is the real case, and the chapter shows a
   two-line example authored for the purpose, labelled as such.)
4. **Predict the fix, then read it off the page** (datasheet moment 1,
   `room="yes"`).  Send them back to `GPIOx_ODR`, RM0490 §6.4.6 — the page they
   have been reading since Day 1 — and have them read the note at the bottom:
   *"For atomic bit set/reset, the OD bits can be individually set and/or reset
   by writing to the GPIOx_BSRR register."*  Then §6.4.7: `BSy` in bits [15:0]
   sets, `BRy` in [31:16] resets, **both write-only, a read always returns 0**.
   Give them the two names — `GPIO_BSRR_BS5`, `GPIO_BSRR_BR5` — and have them
   **write the line that turns PA5 on** before it is shown:

   ```c
   GPIOA->BSRR = GPIO_BSRR_BS5;   // PA5 high  -- one write, no read
   GPIOA->BSRR = GPIO_BSRR_BR5;   // PA5 low
   ```

   There is no read, so there is nothing to lose.
5. **What it does not do** (S-19).  BSRR has no toggle.  An ISR that wants to
   *invert* a pin still has to read something, so BSRR does not rescue
   `ODR ^= LED` — it rescues the *set* and the *clear*.  Keeping the pin's
   state in a variable one side owns, and driving the pin with BSRR, is what
   makes the toggle safe.  Which is beat 1's moral arriving a second time, in
   hardware: control signals, not data.

   Two honest footnotes, one line each: writing 0 to a BSRR bit does nothing,
   so one write can set some pins and clear others and disturb no third pin;
   and if a `BSy` and its `BRy` are both 1, the manual says set wins.
   `GPIOx_BRR` (§6.4.11) also exists and duplicates BSRR's upper half.

**BSRR is written, not only watched** (Gate 1, active-learning).  Beat 4 has
students write the line; **the homework requires it** (below); and the
chapter's Reference section carries the register table.  Objective 5 is
practiced, not just stated.

**Bound it.** Part 7 does not attempt `__disable_irq()`-as-critical-section
theory, priority, or nesting.  Day 8 already framed `__disable_irq()` in the
ISR as course practice with nesting named and not used.

## Contact bounce, now that the button interrupts (Part 6 close)

Carried from ground truth §4 and dropped in Revision 1; Gate 1 caught it.
Polling read a *level* that had already settled, so bounce was invisible to
`counterResetButtonPolled.c`.  An edge-triggered interrupt is not reading a
level — it fires on every falling edge, and a bouncing contact can produce
several.  The debounce capacitor wired on Day 3 is what keeps this from
showing up today, which is worth one sentence at the close of Part 6 ("if your
counter jumps by more than one, look at the capacitor before the code") plus a
Reference paragraph.  It is not a Part of its own: the hardware fix is already
on the board and Day 3x taught it.

## The datasheet moments (P-11)

Two, both load-bearing, and neither is "look it up because I said so":

1. **Part 7 beat 4 — RM0490 §6.4.6 → §6.4.7.**  The answer to the race is a
   note at the bottom of a page they have used since Day 1 and never read to
   the end of.  That is the lesson, as much as BSRR is.
2. **Part 4a — RM0490 §12.5.6, `EXTI_EXTICRx`.**  The register is at
   `0x060 + 0x4*(x−1)` and holds four 8-bit fields, `EXTIm[7:0]` with
   `m = 4*(x−1)`.  Students derive that EXTI4 is therefore **EXTICR2, bits
   [7:0]** — the deck's own `4 = 4(2−1)+0` — then read the port code for B
   (`0x01`) off the same page, and then meet the C: `EXTI_EXTICR1..4` are
   `EXTI->EXTICR[0..3]`, because array indices start at 0.  Two things found
   rather than told, and the array-index slip met head-on instead of being a
   bug they hit at minute 50.

   Plus a thirty-second lookup inside Part 3, using Day 8's own habit: RM0490
   §11.3 Table 40, position **7**, `EXTI4_15`, priority 14 — twelve pins, one
   vector, which is *why* the ISR has to check `FPR1`.

## Writing room (S-2)

Four committed answers before a reveal, all `room="yes"`:

- Part 2: *what did the program miss, and where was it when it missed it?*
- Part 5: *`TIM14->SR` cleared with a 0 and `ADC1->ISR` with a 1. Predict
  `EXTI_FPR1` — and say what you'd look up to check.*  (It is `rc_w1`.  Day 8's
  set-piece paying out: the point is not the answer, it is that they now know
  the question.)
- Part 7 beat 1: *which of these two working solutions would you ship?*
- Part 7 beat 4: *write the line that turns PA5 on without reading anything.*

These carry the day's P-14 hook — but not where Revision 2 claimed.  Gate 2's
`learner-ai-reliant` tested the claim that Part 7 "is the activity an AI answer
does not survive" and falsified it: presenting two complete solutions side by
side and asking which to ship is exactly the comparative task an AI is best at,
and "an ISR that read-modify-writes shared data races" is the canonical warning
in every ARM tutorial.  Part 7's value is the student's own committed wrong
guess, not AI-resistance.  **The actual AI gate is Part 6's new
`act-gpio-int-t1c`**: predict which single one of the four switches you could
omit and still get a program that builds, links and never interrupts.  That has
no answer key in the starter header, and it lands on the crucial step.

## Hand-offs

**Pre-class: reading only, no video** (B-2).  Day 9 is a *variation* on Day 8,
not a new mechanism, so there is nothing that needs a video the way the
interrupt mechanism did.

*The reading establishes (ideas only):* the Lab 2 button-race false start —
the same motivation Petra used on slide 12, and one students felt — as the
thing polling cannot fix; that a pin, not just a timer, can be an interrupt
source, and a one-paragraph list of what else on this chip can be (slide 13);
that the pins go through *something* called the EXTI before the NVIC, and
**why** — no room for 16 lines per port — with no registers named.

*The reading must not establish:* `EXTICR`, `FTSR1`, `IMR1` or `FPR1`;
`attachInterrupt()`'s mapping; and **nothing about BSRR or the race** —
Part 7's commit moment dies if the reading gives it away.  Note that the
current `ch-gpio-interrupts.ptx` has no Before-Class/in-class split at all and
puts all four registers plus `FPR1`'s polarity in one undifferentiated
section, so Step 3 builds the split from scratch rather than lightly editing.

**Class deepens, does not repeat** (B-8).  The reading says a pin can
interrupt; class programs it.  The reading says the EXTI multiplexes; class
derives which register and which byte.

**Homework (due Thursday):** the deck's Coding Challenge 1 —
`counterResetButtonIntTimer.c`: replace `delay_ms()` in
`counterResetButtonInt.c` with a 1-second timer interrupt, so the program has
**two** interrupt sources and no blocking wait anywhere.  Deck slide 52 is the
solution.  **Plus one line that exercises BSRR:** drive a
counting-is-alive LED from `main()` with `GPIOA->BSRR` rather than `ODR`, and
say in one sentence what that buys you once something else starts writing the
same port.  Optional and nothing to submit: the modularization stretch and the
deck's Coding Challenge 2 (`ADCPot` on a timer), a head start on Lab 5 which
Day 10 opens by reviewing.

**Lab 5 needs (P-13 — checked, not taught):** Lab 5 does not require GPIO
interrupts at all.  What it takes from Day 9 is the *timer*-interrupt homework
and — for Additional Feature 1 — BSRR.  Day 9's own material is in-class and
homework learning in its own right; its downstream consumers are Lab 6's
tachometer and general fluency.

---

# Days 9x and 10 — I2C

Chapter: `source/ch-i2c.ptx`.  One chapter, two in-class sections.

## The rebalance, stated up front

The old decks are lopsided: Day 9x is 32 slides of pure exposition with
**nothing for students to do**, and Day 10 is 56 slides that Petra's own
speaker note concedes will not finish (*"If you get this done today you are
doing really well.  Most likely you won't get any further"* — slide 53).

**The plan moves the ping-and-capture block (old Day 10 slides 14–30) back to
Day 9x.**  It is the natural payoff of Day 9x's protocol material, and it
de-loads Day 10 so the display, its datasheet, and the device driver get a full
hour, which is what Lab 5 depends on.

**The cost, named** (Gate 1, logistics): this creates a wiring dependency
across a class boundary.  Day 10 now needs the display still wired.  That cost
is paid by Day 10's Part 2 — a three-minute verification beat running Day 9x's
own `pingDisplay.c` — and it is a good trade, because a three-minute check at
the top of Day 10 is cheaper than fifteen minutes of first-time wiring in the
middle of it.

## Where the load lands (the pivot)

Day 9 → Day 9x shares **no machinery**: no NVIC, no ISR, no flags, no EXTI.
The only carry-overs are habits — assign a mask rather than compound-assign
(the library's `I2C1->CR2 = ...` is commented *"use `=` to ensure all other
bits are cleared"*, Day 8's moral verbatim) — and going to the reference manual
for a number rather than guessing it.  **Day 9x opens by saying so**, in one
sentence: none of today's registers are ones you have configured before, and
nothing from Tuesday is a prerequisite.

The week's cognitive peaks are deliberately different in *kind*:

- **Day 9 is a register day.** Four new registers, but every surrounding
  concept is Day 8's. Load is high, transfer is high.
- **Day 9x is the conceptual peak** — a whole protocol and a whole peripheral,
  with almost no transfer available.
- **Day 10 is the production peak** — the most code students write all week,
  on a protocol that is by then twenty-four hours old and visible.

Gate 1 correctly refused Revision 1's claim that Day 9x's load is "carried by
looking rather than by writing code": that was true of the protocol half
(Parts 1–5) and false of the peripheral half, which was 20 minutes of
undifferentiated telling with the reading forbidden from pre-loading any of it.
Revision 2 splits the peripheral half into four short beats, gives the
addressing trap an exercise instead of a monologue, and relabels the timing
lookup as the student activity it actually is.

**Week-level cut order** (also referenced from each day's own section):
Day 9's PC13 stretch → Day 9x's Waveforms *decode* setup, which moves to
Day 10's opening or to homework → Day 9x's field-by-field walk of `I2C_CR2`,
which moves to Reference → Day 10's Coding Challenges 2 and 3, which are
homework and Lab 5 anyway → Day 10's `SevenSeg_number()`, which Lab 5 does not
require.  **Not cuttable:** Day 9x's capture, Day 10's `SevenSeg_write()`, and
the three Arduino-defusing beats.

---

# Day 9x — I2C: the protocol and the peripheral

## Objectives

By the end of class a student can:

1. Identify, on a real captured trace, the START, the seven address bits, the
   R/W bit, the ACK, a data byte, and the STOP — and say which SDA edges are
   legal where.
2. Say what makes I2C synchronous and why that removes the baud-rate
   agreement UART needs, and what it costs.
3. Name the five operations an I2C library has to provide, say why those five,
   and say which `Wire.h` call corresponds to each.
4. Read the `I2C_TIMINGR` settings for a 12 MHz clock out of RM0490 §23.4.10
   and say what PRESC is for.
5. Given a datasheet that states a device address ambiguously, work out what
   to pass to `i2c1_byteWrite()`.

## The CRUCIAL step

> **Every student captures a real I2C transaction from their own board on the
> AD2 and marks the START, the address bits, the R/W bit, the ACK from the
> display, and the STOP on it.**

Scaffolding (P-2):

- The code is **given and five lines long** (`pingDisplay.c`, deck slide 16).
  Students are not writing I2C on the day they learn I2C.
- The wiring is **four wires** — +V, GND, SDA, SCL — into a breakout that
  carries its own pull-ups (deck slide 17), with a wiring photo on screen for
  the whole part and the safety line before anyone connects anything.
- The AD2 in oscilloscope mode is Day 3 equipment used the Day 3 way; the only
  new step is a single sweep.
- **Students mark their own trace first** (Gate 1, active-learning).  The
  worked example projected beforehand is the **wrong-address (0x60) capture**
  from the stretch material, so what students then have to find in their own —
  a *successful* transaction with an ACK — is visibly different from what they
  watched.  Projecting the identical correct-address trace first, as Revision 1
  did, would have made "find it in your own" into copying: every student's
  capture is byte-identical because `pingDisplay.c` hardcodes `0x70`.
- **The decode view is offered to everyone, not gated to the stretch.**  Once a
  student has attempted the raw trace, "if it is hard to read, switch Waveforms
  to Logic mode and check yourself" is a second route in, not a reward for
  speed.  Reading the raw trace stays the required skill.
- A student whose display never ACKs still has a trace — the address bits and
  the NACK are both there — so the activity does not fail closed.

## The STRETCH

Petra's own, deck slides 21–25, already written as a two-tier task: **ping the
wrong address** (change `0x70` to `0x60`), capture, and find the NACK and the
STOP the controller issues in response; then **change the data byte** and read
the new bit pattern off the trace.

For students who are also fast through the back half of the day, Part 8's
address exercise has a second tier: given a device whose datasheet lists
`0xE0`, work out both what to `#define` and what the trace will show.

## Activity sequence (65 min)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | **The pivot, in one sentence** — nothing from Tuesday is a prerequisite. Then: 34 LEDs in a four-digit display; how many pins? (deck slide 3, a real count) → two wires and a backpack | predict → tell | 4 |
| 2 | Serial we already know: UART's baud-rate agreement (Day 5) → what a **shared clock** buys and costs. Controller/target, one bus, an address per device — **and the address goes onto the wire shifted left with R/W appended, so what you will see is not `0x70`** | explain | 6 |
| 3 | The protocol resurfaced from the reading in one figure: START / address+R/W / ACK / data / STOP, and the "SDA changes only while SCL is low" rule. **The worked example is the wrong-address trace** | explain | 5 |
| 4 | **Safety line, wire it, flash `pingDisplay.c`, single sweep — mark your own trace.** CRUCIAL. Checkpoint at minute 32 | do | 15 |
| 5 | Debrief the successful trace together; stretch tier (wrong address → NACK; different data byte); decode view offered to all | do → explain | 7 |
| 6 | The five operations a library needs — derived by the class from the protocol, individually committed, then revealed — **and `Wire.h` is that library, precompiled**: which call is which | predict → reveal | 7 |
| 7a | The pins: PB8/PB9, AF6, **open-drain and why it is not optional here** — what `Wire.begin()` did silently | explain | 5 |
| 7b | `I2C_TIMINGR`: find our clock's row and read the five fields off it — **datasheet moment** | do → explain | 5 |
| 8 | Addressing: the 7-bit/8-bit trap, **exercised** on a datasheet excerpt that states `0xE0` | do → explain | 4 |
| 9 | Recap; Thursday is the display | tell | 2 |

**Part 4 is the bottleneck**, and a different kind from Day 9's: four wires per
student and an instrument, not a download.  Fifteen minutes, running from
minute 20 to minute 35, with a **hard checkpoint at minute 32**: if the room is
not mostly holding a trace, switch to the projected capture and have students
mark *that* instead of their own.  Nobody's day ends because a sweep would not
trigger.

**Three failures, three different fixes**, and they are indistinguishable from
where a stuck student is sitting, so the ladder names them: *no trace at all* →
the AD2 did not trigger (check the trigger, not the wiring); *a trace but no
ACK* → the display is not answering, which is the activity's own taught case
and is interesting rather than broken; *nothing on either channel* → wiring,
re-seat the four wires against the photo.

**Day 9x cut order** (the week-level list, restated locally so an instructor
flipping to this section finds one): the Waveforms decode setup → Part 7b's
field-by-field detail, keeping the row lookup → Part 8's second tier.  **Not
cuttable:** Part 4, and Part 6's `Wire.h` beat.

## Observe → explain (P-5)

The day is built the right way round, which the old deck was not.  Part 4 puts
a real transaction on a screen **before** Part 6 opens a single register.  The
ACK in particular is much easier to believe once you have watched the
controller let go of SDA and something else pull it down.  Petra's speaker note
on slide 19 is the explanation to have ready: the controller keeps clocking
through the ninth pulse, releases the line, and the target grabs it during the
low phase so the value is stable when the clock next rises.

## The datasheet moment (P-11)

**RM0490 §23.4.10, "I2C_TIMINGR register configuration examples."**  Find the
row for our clock and read off `PRESC = 0x2`, `SCLL = 0x13`, `SCLH = 0xF`,
`SDADEL = 0x2`, `SCLDEL = 0x4`.  The *reason* is the point and it is worth the
extra minute (S-14): every row in that table divides its clock down to **4 MHz**
— 8 MHz with PRESC 0x1, 16 MHz with 0x3, 48 MHz with 0xB, and our 12 MHz with
0x2 — so PRESC is not a magic constant per board, it is `clock / 4 MHz − 1`,
and a student who changes the system clock knows which number to change.  (This
is Petra's own instructor note on slide 21, marked SKIP.  It should not be
skipped; it is the only thing that makes the table make sense.)

## Writing room (S-2)

- Part 1: *how many pins would one LED per pin need?*  (Committed before the
  count is done together — the answer, 34, is the day's motivation.)
- Part 4: *mark the START, the address bits, the R/W bit, the ACK and the STOP
  on your own capture* — the crucial step's own recorded answer.
- Part 6: *before we look: what five things does a library have to be able to
  do?*  Individually, then the group, then the reveal.
- Part 8: *this datasheet says the address is `0xE0`. What do you `#define`?*

## Hand-offs

**Pre-class: reading only.**  `ch-i2c.ptx`'s existing `sec-i2c-how-it-works` is
already close to right for this and is the one part of the rough chapter worth
keeping — Gate 1 verified it is clean of STM32 registers and captured-trace
description.  It needs voice work and its `fig-i2c-frame-diagram` caption
checked, not rewriting.  Its three reading questions are sound.

*The reading must not establish:* any STM32 register, the timing values, or
what a captured trace looks like.  Part 4's "find the START" needs students who
have read the definition and never seen one.

**Homework (due Thursday):** none new — Day 9's timer homework is due, and Day
10 opens by reviewing it.  Deliberate: Day 9x is the heaviest *conceptual* day
of the week and the lightest homework night.

**Day 10 needs from here:** the five library functions by name, the shifted
address, the AD2 as the instrument you reach for when a device does not answer,
and **the display left wired** — which Day 10 verifies rather than assumes.

---

# Day 10 — The HT16K33 and its device driver

## Objectives

By the end of class a student can:

1. Explain why a four-digit display needs 14 wires and time-division
   multiplexing, and what the backpack does with them.
2. Read the HT16K33's command table out of its datasheet and construct the
   three initialization bytes.
3. Describe the display RAM's layout — two bytes per digit, segments in the
   first, always 0 in the second, and *why* the second must still be written —
   and write a byte pattern that produces a chosen character.
4. Write a device-driver function that talks to hardware **only** through the
   I2C library, and say what `Adafruit_LEDBackpack.h` was doing instead.
5. Write the whole display in one transaction with `i2c1_memWrite()`.

## The CRUCIAL step

> **Every student's own four-digit display shows `ES.28`, written from a
> ten-byte buffer through their own `SevenSeg_write()`.**

**One function, not three** (Gate 1, active-learning — Revision 1 was
internally inconsistent about this).  `SevenSeg_write()` alone produces `ES.28`
and alone carries the RAM-map understanding Parts 4–5 build.
`SevenSeg_blink()` and `SevenSeg_dim()` are a two-minute warm-up at the top of
Part 8: they rehearse the one-line `i2c1_byteWrite()` pattern already
established, every student reaches them, and neither gates "did you get there".

Scaffolding (P-2):

- The path is staged: **one digit first** (`writeFirstDigit.c`, given, one line
  changed) → then the buffer → then the driver function that writes all of it.
  A student who stalls still has a lit digit.
- `SevenSeg_write()` is **one call** to `i2c1_memWrite()` once the RAM map is
  understood, so the crucial step's difficulty is the *understanding*, which
  Parts 4–5 build, not the typing.
- Part 5's "make a pattern" activity (deck slide 37) has students construct
  segment bytes **on paper** before any of it is code, so the buffer is not
  simultaneously a new idea and a debugging surface.
- The instructor solution for all three driver functions is Petra's own, deck
  slide 52.

## The STRETCH

Deck Coding Challenge 2 (slides 54–55): `ES.28` steady → wait 1 s → blink at
1 Hz → wait 5 s → back to steady at lower brightness — a sequence, exercising
the warm-up functions in combination rather than singly.  Further, Challenge 3:
the counters — 16-bit unsigned, 8-bit signed with a minus sign, and a `MM:SS`
clock using the colon.  Petra's note is explicit that Challenge 3 *is* the setup
for Lab 5, so it is stretch here and homework for everyone.

## Activity sequence (65 min)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling | — | 3 |
| 0 | Announcements | tell | 2 |
| 1 | **Homework review + the AI critique.** Petra's own: she asked ChatGPT and Gemini to do the counter-with-timer-reset assignment. **Each student writes their own answer to "would you revise it, and why?" first**, then groups compare (deck slides 4–8). **A working reference copy is available to anyone who wants one, handed out before groups form** | do | 9 |
| 2 | **Verify your display wiring**: flash Thursday's `pingDisplay.c` unchanged. Lights on the display, or a trace — either proves the bus. Re-seat before anyone writes code | do | 3 |
| 3 | 60-second refresher of the reading, then how the display is actually built: common cathode, four digits sharing seven anodes, 34 LEDs on 14 wires, multiplexed fast enough to fool the eye → therefore a backpack | explain | 6 |
| 4 | The HT16K33's commands, **derived from its datasheet**: oscillator on, display on/blink, brightness | do → explain | 7 |
| 5 | The display RAM: two bytes per digit, segments in the first, 0 in the second — **and why the zero must still be sent: the device's internal pointer only advances when a byte arrives**. Digits at 0/2/4/6/8. **Make a pattern** (paper) → reveal | predict → reveal | 8 |
| 6 | **Write one digit** (`writeFirstDigit.c`, given): change the digit, change the character | do | 6 |
| 7 | Firmware layers: main → device driver → I2C library → registers, and the rule that a driver never touches machine registers — **and what `Adafruit_LEDBackpack.h` was doing for you, and what writing this yourself buys** | explain | 4 |
| 8 | Warm-up: `SevenSeg_blink()`, `SevenSeg_dim()` (2 min). Then **`SevenSeg_write()`; run it; show `ES.28`.** CRUCIAL | do | 13 |
| 9 | Challenges 2 and 3 as homework; what Lab 5 asks for | tell | 4 |

**Part 1 is not padding.**  It is the week's P-14 beat and it is Petra's design:
students who have just written the program read two AI versions and are asked
to judge them.  Two changes from Revision 1, both from Gate 1: the individual
written answer comes before the group discussion, so ten minutes buy thirty
students' engagement rather than eight presenters and twenty-two passengers;
and **a reference copy is offered to the whole room before groups form**, so a
student whose homework did not run has something to compare against and never
has to say so out loud.  It is the first thing to compress (to 6) if Part 8
looks threatened — but not to cut.

**Part 2 is the cost of the rebalance**, paid deliberately.  Three minutes,
Day 9x's own program, unchanged.  It also gives a student whose display was
never working on Thursday a second chance at it with the whole hour still
ahead, instead of discovering it at minute 48.

**If Part 8 has fewer than 11 minutes:** do the `dim()` warm-up on the projector
and go straight to `write()`.  The warm-up is rehearsal; `write()` is the day.

**Equipment:** the display breakout wired to PB8/PB9 with +V and GND, carried
from Day 9x — **verified in Part 2, not assumed**.  Anyone whose wiring did not
survive re-seats it there.  The AD2 is optional today; it is the debugging
instrument if a write does not land.

## The datasheet moment (P-11)

**HT16K33 datasheet, pp. 24–25** — the command table.  Students derive `0x21`,
`0x81` and `0xEF` rather than being handed them: system setup is `0b0010000S`
with S the oscillator bit, so oscillator-on is `0x20 | 0x01`; display setup is
a command plus blink-rate options, so on-and-not-blinking is `0x80 | 0x01`;
dimming is a command plus a four-bit brightness, so full is `0xE0 | 0x0F`.
Then **p. 22** for the page-write operation that lets ten bytes go out in one
transaction.

This is also where the `#define` names come from — `HT16K33_SYSTEM_CMD`,
`HT16K33_OSC_ON`, `HT16K33_DISPLAY_CMD`, `HT16K33_BRIGHT_CMD` — which is
Petra's own "nice way to structure writing a device driver" (slide 49): the
datasheet's structure becomes the header file's structure.

## Writing room (S-2)

- Part 1: *would you revise your solution, having seen this one — and why?*
  Individually, in writing, before the group talks.
- Part 4: *the datasheet says system setup is `0b0010000S`. What byte turns the
  oscillator on?*
- Part 5: *how would you fill the ten bytes to display this pattern?*  On
  paper, before the reveal.

## Hand-offs

**Pre-class: reading only**, and short.  The display hardware (common cathode,
multiplexing, why 14 wires) is concrete enough to read about, and the HT16K33's
role — a chip whose whole job is to do the multiplexing and speak I2C — is one
paragraph.  **The reading must not give the RAM map**: Part 5's pattern activity
needs it fresh.  Part 3 opens with a 60-second refresher anyway, for students
who bounced off it.

**Homework (due Tuesday, before Lab 5 is due):** deck Challenges 2 and 3.
Challenge 3's counters are, in Petra's words, the setup for Lab 5.

**Lab 5 needs (P-13 — checked, not taught):** `SevenSeg_init/blink/dim/write`
as a modular pair of files in `Library`.  The chapter teaches all four.
**Note the conflict resolved in ground truth §4:** the chapter follows the
deck's `void SevenSeg_write(uint8_t *display_buffer)` over
`uint8_t[2*HT16K33_NBUF]`; **Lab 5 §3.3's prototype block still says
`uint16_t *` over `HT16K33_NBUF`, and needs updating by hand.**

**Day 13 needs from here:** the firmware-layer discipline and the I2C library,
both of which it replays as review before the accelerometer.  Day 13 is
authored later, in `ch-accelerometers.ptx`.

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
  messed it up."* Keep it; it is the only war story in the week and it is about
  reading a datasheet carefully. It is also now Part 8's exercise.
- **Day 9x slide 19's speaker notes** — open-drain's three reasons
  (multi-controller safety, arbitration, clock stretching). Part 7a takes the
  first; the rest is Reference.
- **Day 10 slide 32's speaker notes** — the worked "how do you turn on the 'a'
  segment in digit 2?" walk-through. The clearest explanation of the
  common-cathode scheme anywhere in the decks.
- **Day 10 slide 35's speaker notes** — *"If you don't write the zeros, the
  pointer won't advance."* Now part of Part 5's explanation rather than a
  footnote, because without it "always 0" is a rule to memorize.

## Gaps that must be closed before or during Step 3

Full detail in `plans/week5-ground-truth.md` §5 and §7.

1. **`SevenSegPartial.h` is not in the repo**, so the `HT16K33_*` `#define`
   *values* and `numbertable[]` cannot be quoted (B-6). The plan turns this
   into an advantage — Part 4 has students derive the command bytes from the
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
   ~~`counterResetButtonPolled.c`, `counterResetButtonInt.c`~~ — **DONE**, both
   in `assets/starters/` and checked against the chapter's listings. Still to
   write for Days 9x/10: `pingDisplay.c`, `writeFirstDigit.c`,
   `SevenSegPartial.c`. All recovered in ground truth §1.
5. **Figures are rebuilt** (Step 1, commit `958a07c`) — twenty-six annotated
   SVGs across the three decks' image directories. They still have to be
   *looked at* in the built book before Gate 2. Note `qlmanage -t` renders SVG
   onto a square canvas and clips wide figures, reporting damage that is not
   there; check the built page instead.
6. **Do not reuse `ch-i2c.ptx`'s `fig-i2c-pins` caption**, which says PB8/PB9
   use **AF1**. It is AF6 — contradicted by the code slide directly below it in
   the same file (Gate 1, continuity).

## Flags for Petra

1. **[REBALANCE]** Ping-and-capture moves from Day 10 to Day 9x, so that 9x has
   hands-on work and Day 10 has room for the driver. Biggest divergence from
   the old decks this week. Gate 1 endorsed it and named its cost — Day 10 now
   depends on the display staying wired — which Day 10's Part 2 pays for.
2. **[BSRR]** The whole Part 7 design is new material with no deck precedent,
   staged on your own slides 54–58. In particular: the chapter will say plainly
   that BSRR has no atomic *toggle*, so `ODR ^= LED` in an ISR is not fixed by
   it. Please check that is the framing you want.
3. **[LAB 5]** §3.3's prototype block declares
   `void SevenSeg_write(uint16_t *display_buffer)` over `HT16K33_NBUF`, but
   your Day 10 solution uses `uint8_t *` over `2*HT16K33_NBUF`. The chapter
   follows the deck (your decision); the lab PDF needs the matching edit.
4. **[FILES]** `SevenSegPartial.h` and `ES28.h`.
5. **[MINOR]** `counterResetButtonPolled.c` `#define`s `WAIT` and never uses it;
   the polled version waits with `delay_ms(1000)` and the interrupt version
   with `for (int i=0; i<WAIT; i++){}`. Which should ship?
6. **[MINOR]** Day 10 slide 55's `main()` ends `return 0;` where the course
   convention (B-14) is `return 1;`. Normalizing to `return 1;` unless you say
   otherwise.
7. **[CONFIRM]** Day 9's pre-class package is **reading only** — no video. Day 9
   varies Day 8's mechanism rather than introducing one.
8. **[CONFIRM — blocks a slide]** Day 9x is the week's first *power* wiring, and
   Gate 1 flagged that the plan says nothing about getting +V and GND backwards
   on the display breakout. What actually happens — is the header keyed, does
   the breakout survive it, does the Nucleo? One sentence from you and the
   slide is written; until then it says only what is verified.
10. **[CONFIRM]** Day 9's homework gains one BSRR line (drive a
   counting-is-alive LED from `main()` with `GPIOA->BSRR`), so that Objective 5
   is practiced and not only watched. Reasonable addition, or does the homework
   have enough in it already?

## What Gate 1 changed

Reviewed by `expert-active-learning`, `expert-cognitive-load`,
`expert-continuity-auditor`, `expert-class-logistics`,
`learner-firstgen-novice`, `learner-arduino-veteran`,
`learner-anxious-nonhardware`. Reports in `reviews/week5-gate1.md`.
**Three BLOCKERs, four PASS WITH CHANGES.**

**The three blockers:**

1. **Hardware persistence was asserted, never verified** (logistics BLOCKER;
   anxious and firstgen independently). Day 9 assumed the Day 3 button
   survived five class meetings; Day 10 assumed the Day 9x display wiring
   survived a trip home in a kit — a dependency the rebalance *created* and
   then did not pay for. Both existing rescues handed over a known-good `.c`
   file, which cannot fix a wire. Now: a standing rule at the top of the plan,
   a verification beat on Day 9 (Part 2) and Day 10 (Part 2, three minutes,
   costed into the table), a hardware-vs-software split in every rescue, and a
   four-rung diagnostic ladder on Day 9's crucial step in Day 8's shape.
2. **No Arduino defusing anywhere in the week** (arduino-veteran BLOCKER).
   Day 8 built this and placed it early; this week is where it bites three
   times — `attachInterrupt()` collapses all four EXTI registers into one line,
   `Wire.h` *is* the five-function library, `Adafruit_LEDBackpack.h` is Day 10's
   crucial step already written. The plan contained the word "Arduino" zero
   times. Now: a named, uncuttable beat on each day, and a row in the
   week-shape table so it cannot quietly fall out again.
3. **Day 10's AI critique had no way in for a student without working
   homework** (anxious BLOCKER; firstgen and active-learning on the same
   activity). It ran ten minutes, at a table, comparing AI code against "yours",
   and explicitly replaced the solution slide. Now: a reference copy offered to
   the whole room before groups form, and an individual written answer before
   the group talks — which also fixes the passengers problem active-learning
   raised.

**And the majors:**

- **BSRR was explained and never written** (active-learning). Objective 5 said
  "can use `GPIOx->BSRR`" and no student ever typed it — not in Part 7, not in
  the stretch, not in the homework; the first write would have been in Lab 5,
  ungated. Beat 4 is now predict-then-reveal, and the homework requires one
  BSRR line.
- **The two-button stretch does not demonstrate the ODR race** (continuity —
  a factual error, verified against the recovered driver). `pc13_exti_init()`
  and the shared handler only set a direction variable; nothing in that stretch
  writes `ODR` from `main()`. Citation removed; Lab 5's Additional Feature 1 is
  the real downstream case, and the in-class demonstration is an example
  authored for the purpose and labelled as such.
- **Bounce was dropped between Step 0 and Step 2** (continuity). Ground truth
  §4 flagged that an edge-triggered interrupt fires once per bounce where
  polling read a settled level; Revision 1 lost it entirely. Now a closing
  sentence on Part 6 plus a Reference paragraph.
- **Day 9 Part 4 repeated the exact chunking mistake Gate 1 fixed on Day 8**
  (cognitive-load): three registers plus a full datasheet derivation in one
  undifferentiated 10-minute row. Split into 4a and 4b.
- **Day 9x's back half contradicted the plan's own load claim** (cognitive-load;
  firstgen and arduino on the same 20 minutes): Parts 6–8 taught the whole
  peripheral in `tell` mode with the reading forbidden from pre-loading any of
  it. Part 7 split into 7a/7b, 7b relabelled `do → explain` to match what it
  actually asks, Part 8's addressing trap given an exercise instead of a
  monologue, and the pivot given an explicit orientation sentence at the top of
  the day.
- **Day 9x's bottleneck had no checkpoint and no local cut list** (logistics;
  anxious), where Days 9 and 10 had both. Now a checkpoint at minute 32, a
  three-way failure ladder (no trace / trace but no ACK / nothing on either
  channel), and the cut order restated inside the day's own section.
- **Day 9's checkpoint minute was arithmetically wrong** (logistics): the table
  said 19, the prose said 22 — the same class of error Gate 1 caught on Day 8
  while this plan was citing that precedent. It is minute 18 in Revision 2,
  after Part 1 was trimmed.
- **Day 9x's crucial step was copying, not finding** (active-learning): every
  student's capture is byte-identical because `pingDisplay.c` hardcodes `0x70`,
  so walking the identical trace on the projector first left nothing to
  discover. Students now mark their own first, and the projected model is the
  wrong-address capture.
- **Day 10's crucial step was ambiguously one function or three**
  (active-learning), with the STRETCH section, the activity table and the cut
  list all disagreeing. Narrowed to `SevenSeg_write()`; `blink`/`dim` are a
  two-minute warm-up.
- **Day 9 Part 1 gave away Part 7's punchline** (active-learning): it explained
  *why* the ISR gets away with touching `ODR`, which is what beat 1 exists to
  make students discover. Trimmed to a bare label, matching Day 8's precedent
  plant.
- **The 7-bit/8-bit trap arrived four Parts after students needed it to read
  the trace** (arduino), and was then told once and never exercised. The
  sentence moves to Part 2; the exercise is Part 8.
- **Day 9x and Day 10 had no Writing room section** (active-learning), which
  Day 9 had. Both now have one.
- **Day 9 Part 7 was four beats in eight protected minutes** (firstgen). Now
  five beats in eleven, with an explicit pause after the disassembly, paid for
  by trimming Part 1 and Part 6.
- Smaller, all applied: the "always 0" byte now arrives with its reason
  (cognitive-load); Day 10 Part 3 opens with a 60-second reading refresher
  (anxious); Part 7 beat 1 is framed so a wrong guess is the expected outcome
  (firstgen, S-17); the Waveforms decode view is offered to everyone rather
  than gated to the stretch (active-learning, UDL); "resurfaced" no longer
  assumes Day 8 landed (firstgen); and the `AF1`/`AF6` caption error already
  sitting in `ch-i2c.ptx` is flagged so Step 3 does not inherit it (continuity).

**Kept deliberately, because Gate 1 asked for it to survive Step 3:** Day 9's
"nothing today can damage anything"; the named checkpoint minutes; Day 9x's
"a student whose display never ACKs still has a trace"; the explicit "Day 9x
needs nothing from Day 9"; and the restraint on Lab 5 — every mention is a
plain date with no manufactured urgency (S-15, L-8).

---

## Day 9 status (Steps 3–5 complete, 2026-08-04)

`source/ch-gpio-interrupts.ptx` rewritten from scratch — the rough version had
no Before-Class/in-class split and its two main listings were invented.
Chapter, 31 `<slide>` blocks, and `assets/decks/day9.json` (51 slides, 3
instructor-only, 37 refs) all build clean; `check_rules`, `check_deck` and
`check_starters` pass; every slide fits at 1280×720 in both the instructor and
student views.

**Things that came up during Steps 3–5, for Petra:**

11. **[MINOR]** Three figures were rebuilt from the wrong picture and are now
    named for what they actually show. Slide 21's "button with pull-up" is
    drawn in PowerPoint shapes over an unrelated bitmap, so there is no
    button schematic to recover from that deck — Day 3's `fig-rc-schematic`
    is xref'd instead. What the slide's two bitmaps really were: RM0490's
    GPIO input-driver diagram (now `fig-gpio-input-driver`, used for BSRR's
    second write port, which it shows explicitly) and a clean-edge scope
    capture (now `fig-pb4-clean-edge`, in the bounce section).
12. **[MINOR]** Deck slide 55's right-hand program calls
    `uart2_rxtx_init()`, which exists nowhere else in the course — the
    library's name is `uart2_init()`, used 23 times in the book. Normalized
    to `uart2_init()`. Confirm that is right.
13. **[MINOR]** `return 0;` vs `return 1;`: all four Day 9 deck programs end
    `return 0;`, but B-14 states the course convention is `return 1;` and the
    book uses it 20 times against 9. Normalized to `return 1;` — this is the
    same question as flag 6 and one answer covers both.
14. **[NOTE]** The two-solutions slide's listings are abridged (no
    `uart2_init()`, no `printf`, `buttonPushed` initialized in its
    declaration) so that both fit side by side and legibly. The book carries
    the full versions. Said so in the slide's presenter note.

---

## Gate 2 outcome (2026-08-04)

Eleven reviewers — the standing core of 7 plus `learner-arduino-veteran`,
`expert-embedded-industry`, `learner-ai-reliant` and `expert-rigor-hawk`.
**3 BLOCKER, 8 PASS WITH CHANGES.** Reports and the synthesized change list are
in `reviews/day9-gate2.md`; everything on it is applied. The deck is 55 slides,
4 instructor-only, 41 refs; all 55 fit; all four linters pass.

**What Gate 2 caught that Gate 1 and the linters could not.** Every check
passed on the draft the committee reviewed, so none of the three blockers was
machine-catchable. The worst was a hardware claim contradicted by RM0490 —
that a masked EXTI line still records edges in `FPR1` — which I had taken from
your slide-19 speaker note and carried into the ground truth without checking
it against the manual. Two more were earlier chapters' set-pieces restated
backwards on the day they pay out (the `rc_w1` read-modify-write hazard, and
Day 8's minus-one rule). The lesson for the process: **the old decks are
authoritative for the arc and the code, and not for hardware explanations** —
those need the manual every time.

**Four new flags for you**, added to the list above:

15. **[CONFIRM — your note is wrong]** Day 9 slide 19's speaker note says the
    `IMR1`/`FTSR1` split exists so events can be polled without interrupting.
    RM0490 §12.3.1 and §12.4 and Table 45 all say the pending bit is set only
    for an unmasked line. The chapter now gives the three defensible reasons
    instead and says plainly that masked-line polling does not work. You should
    see this going rather than find it gone.
16. **[CONFIRM]** Part 7 is the densest eleven minutes of the day even after
    moving three ideas to Reference. The synthesizer recommends **Part 1 → 3
    min and Part 7 → 12**; Part 1's only in-class job is planting the
    `ODR ^= LED` line without explaining it, and the table discussion is the
    first thing the cut list drops anyway. Not applied — it is your clock.
    *(Cheaper to say yes to than it looks: the class is 110 minutes, not 65, so
    Part 7 can have its extra minute without taking one from Part 1.)*
17. **[FILES]** `GPIO_BSRR_BS5` / `GPIO_BSRR_BR5` appear in **no** deck and are
    confirmed only against the RM's bit names and the STM32G0/C0 CMSIS
    convention — and `act-gpio-bsrr-t4` now asks students to write exactly
    those two lines. One look at `stm32c031xx.h` settles it.
18. **[CONFIRM]** Slide 57's *"This will ALWAYS work. Trust me."* The chapter
    now states the residual coalescing window instead of repeating that. Happy
    for the chapter to be more qualified than the slide was?

---

## Days 9x and 10 status (Steps 3–5 and Gate 2 complete, 2026-08-05)

`source/ch-i2c.ptx` rewritten from scratch — the rough version's `i2c1_init()`
was invented and wrong in five ways and its `fig-i2c-pins` caption said AF1
where the datasheet says AF6.  The chapter now carries two readings, Day 9x's
nine parts (Part 6 split into 6a and 6b at Gate 2), Day 10's nine parts, and a
Reference section.  Decks: `day9x.json` (51 slides, 34 refs) and `day10.json`
(42 slides, 28 refs, 4 instructor-only).  Three new starters —
`pingDisplay.c`, `writeFirstDigit.c`, `SevenSegPartial.c` — registered in
`check_starters.py`.  All four checks pass and every slide fits at 1280×720 in
both the instructor and student views.

Gate 2 ran eleven reviewers — the standing core of seven plus
`learner-arduino-veteran`, `expert-embedded-industry`, `learner-ai-reliant` and
`learner-weak-circuits`.  **Three BLOCKER, eight PASS WITH CHANGES.**  Reports
and the synthesized change list are in `reviews/day9x-day10-gate2.md`; the whole
list is applied.

**What Gate 2 caught, and it is Day 9's lesson again.**  Every linter passed and
every slide fitted on the draft the committee reviewed, so none of it was
machine-catchable — and five separate *hardware* claims were wrong.  The worst
was Day 10's opening verification beat telling a correctly wired room that a
dark display means a power fault, when a cold HT16K33 is dark by definition
(system setup defaults to oscillator off) — contradicted by the chapter's own
Part 6 seven hundred lines later.  The others: 5.0 + 4.0 µs was written as
10 µs (the manual's own footnote explains the missing microsecond); "5 V on a
signal pin is outside what the chip is rated for" is false for exactly PB8 and
PB9, which the datasheet lists as 5 V tolerant; "two of those pins are already
the UART" is false because PA2/PA3 are not on the Arduino headers at all; and
`fig-segment-map` had lost its E and F labels to a crop.

## New flags for Petra (Days 9x and 10)

11. **[CONFIRM — blocks nothing now, but the wording is provisional]** Flag 8 is
    still open, and the chapter now says plainly *"what happens if `+` and `−`
    are swapped is not something this course has characterized — treat it as a
    mistake to avoid rather than a test to run."*  One sentence from you
    replaces it with the real answer.

12. **[FILES]** `SevenSegPartial.h` is still missing, so the `HT16K33_*` values
    and `numbertable[]` are used by name and never quoted.  The shipped
    `SevenSegPartial.c` skeleton is therefore **authored, not recovered**: its
    four signatures are your slide 50's, its bodies are TODOs I wrote.  One look
    at the real file settles it — and settles the Reference note claiming
    `SevenSeg_dim()`'s `HT16K33_DISPLAY_CMD` term adds nothing.

13. **[CONFIRM]** Does the kit's display backpack arrive with its pin header
    already soldered?  `fig-backpack-pins` is a product photo of a bare board —
    four plated holes, no header — and the chapter's caption now asserts that
    yours has one fitted and sits in the breadboard.  Nothing in the repo
    establishes that, and a reviewer raised it as a blocker on the grounds that
    a student cannot start the physical task otherwise.

14. **[CONFIRM]** Do you keep spare or known-good display backpacks in the room?
    All four diagnostic ladders now end with *"flag it — there is known-good
    hardware in the room and we will get you onto it"*, because every one of them
    previously dead-ended at "re-seat the wires."  If there are no spares the
    wording has to become "we will pair you up," which is a weaker rescue.

15. **[CONFIRM]** Do students take their kits home between Day 9x and Day 10?
    Day 10's Part 2 exists entirely to pay for the rebalance, and the chapter
    says *"the wiring went home in a kit and came back."*  Nothing in the repo
    supports that, and your old Day 10 deck wires the display fresh.

16. **[SOURCE]** The HT16K33 datasheet is not in the repo, so its page numbers —
    pp. 24–25 for the command table, p. 22 for the page write — are sourced only
    through your deck.  Worth adding the PDF to `assets/` alongside the others.

17. **[CONFIRM — your clock]** Day 9x Part 4 stacks four first-time activities
    into fifteen minutes: new wiring, a project copy and build, a new AD2 mode,
    and reading a trace.  The synthesizer's recommendation is to ship
    `SevenSegI2CFirstSteps` ready-made on Canvas for Day 9x only — the
    copy-and-rename skill is still taught at Day 10 Part 6, where there is room —
    buying four or five minutes on the day's bottleneck at no homework cost.
    Not applied.

18. **[CONFIRM — your clock]** Day 10 sums to exactly 65 with one named
    compression lever (Part 1, 9 → 6).  The recommendation is to name Part 3
    (6 → 4) as a second, since the reading already covers common cathode and
    multiplexing and Part 3 opens with a refresher of it.  That would fund a
    written wrong-answer diagnostic before TODO 4 — the one thing that would test
    the RAM-map understanding in class rather than in the homework.  Not applied.

19. **[MINOR]** Day 9's homework also *required* an LED driven through
    `GPIOA->BSRR`.  Day 10's homework review never mentions it and neither AI
    listing contains it, so that half of Tuesday's assignment goes undiscussed.
