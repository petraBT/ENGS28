# Day 7 — Analog-to-Digital Conversion

Chapter: `source/ch-adc.ptx` · Old deck: `assets/ClassSlidesOLD/Day07-ADC.pptx`
(35 slides) · Downstream: **Lab 4** (`assets/Labs/Lab4_ES28.pdf`)

**Revision 2** — rebuilt after Gate 1. See "What Gate 1 changed" at the end.

## Objectives

By the end of class a student can:

1. Explain what an ADC count *means* — convert between counts and volts in both
   directions, with units.
2. Use **Datasheet Table 12** to determine whether a pin supports analog input and
   which ADC channel it maps to — and know that the three numbers (Arduino label,
   port pin, ADC channel) are generally *not* the same.
3. Wire a potentiometer as an adjustable voltage divider and predict the wiper
   voltage.
4. Configure the ADC at the register level and **take and read an on-demand
   sample** — start, wait, read.
5. Explain why a status register uses write-1-to-clear, and what `&= ~mask` would
   destroy.
6. Trace a successive-approximation conversion bit by bit.

## The CRUCIAL step

> **Every student leaves class with a potentiometer on PA0 and their own
> `ADCpot.c` printing a count that changes as they turn the knob — and can say
> what that count means in volts.**

Scaffolding to guarantee it (P-2):

- Every register the skeleton needs is worked **before** Part 4, one at a time,
  each on a *different* pin or channel than the skeleton needs — so filling the
  blanks is transfer, not transcription.
- Five labelled `// TODO` clusters, not four: pin mode, ADC clock, channel,
  enable, **and the read path**.
- The read path is explicitly framed as the Day 5 UART polling idiom reused
  (`while (!(USART2->ISR & ...)) {}` → `while (!(ADC1->ISR & ADC_ISR_EOC)) {}`),
  so it is a continuation, not a sixth new concept.
- Wiring is a photograph, and pots come **pre-seated** on the breadboards.
- A "nothing printed?" diagnostic ladder stays **persistently on screen** for the
  whole of Part 4 (and as a half-sheet handout), so a stuck student self-rescues.

## The STRETCH

For students who finish early (P-3). Two sizes, because the gap is usually 3–5
minutes, not 15.

**Small (2 min, no rewiring):** turn the pot to each mechanical end stop. Do you
read exactly 0 and exactly 4095? Why not?

**Large — the translation chain (homework for most):**

> **Move the pot from A0 to A3.** Work out which port pin A3 actually is, then
> which ADC channel that pin maps to, then change *everything* that follows from
> it. Do not assume any of the three numbers match.

Do not state the answer in the text — discovering that A3 is **not** channel 3 is
the entire exercise. (It is PB1 → `ADC_IN18`, which also means a different GPIO
port, so `RCC->IOPENR` and `GPIOB->MODER` change too. The rebuilt CHSELR figure
carries the full A0–A5 map, so keep that figure off the stretch slide.)

**Second large stretch:** set the pot to 1.000 V on the DMM, record the count,
then change `RES` in `ADC_CFGR1` to 10-bit and **predict** the new count before
running it. Explain the factor of 4.

## Activity sequence (65 min, including setup)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling: laptops, boards, USB, IDE open | — | 3 |
| 0 | Announcements; the `malloc()` aside | tell | 3 |
| 1 | Signal chain; predict the count for 1.65 V *(reading already did the math)* | predict | 5 |
| 2 | **Datasheet Table 12**: does PA0 do analog, and which channel? | do | 9 |
| 3 | Wire the pot (pre-seated); predict three wiper voltages, then measure | predict→do | 10 |
| 4a | The four registers, worked one at a time, on other pins/channels | explain | 6 |
| 4b | **Skeleton → fill five clusters → run → see it change** | do | 20 |
| 5 | "Wait: WHAT?" `ADC1->ISR = ADC_ISR_ADRDY;` → write-1-to-clear | observe→explain | 7 |
| 6 | Successive approximation: the guessing game | do | 4 |
| 7 | Recap; homework → Lab 4 | tell | 2 |

**Compressible material is now early.** Part 1 is 5 minutes because the pre-class
reading already establishes counts↔volts; if the room is quick it can be 3.

**If running long, cut in this order:** Part 6's guessing game runs to 2 min as a
whole-class call-and-response; then Part 1 to 3 min; then Part 5 **whole** —
never truncate it, because an unanswered "how did that clear the bit?" is worse
than never raising it. Never cut Part 4.

The SAR **block diagram and the 14-cycle timing move to the chapter's Reference
section** (B-10) rather than being taught in class — the reading already gives the
mechanism, so re-showing the block diagram in class is duplication (B-8).

**Equipment:** 10 kΩ breadboard-mount trim pot, **pre-seated on the breadboard
before class** — this is the single highest-leverage time saving in the day.
One DMM per student (confirm 30 are simultaneously available; if they are shared
per bench, Part 3 doubles). Note the failure mode: a pot wired with 3.3 V and GND
on the wiper plus one outer leg is a near-short at one end of travel, and the
symptom (ST-LINK drops out) looks nothing like a wiring error.

## The datasheet moment (P-11)

Part 2, and it is the spine of the day. Students open the **STM32C031C6 datasheet,
Table 12, "Pin assignment and description"**, find the PA0 row, and read the
Additional functions column: `ADC_IN0, WKUP1`. Then **RM0490 §14.12.9** (CHSELR)
confirms that bit *n* selects channel *n*.

This continues a thread rather than restarting it: Day 2 looked up D4 in the Nucleo
pinout; Day 5 used **Table 13**, the alternate-function map, for USART2; Day 5x
built the Passport method on component datasheets. Table 12 sits beside Table 13 —
say so explicitly, so students see the same document answering a new question.

**Debrief for Part 2:** the Arduino label, the port pin, and the ADC channel are
three different numbers that happen to coincide for A0 — and generally don't.
That single sentence is what makes the stretch and Lab 4 Deliverable 1 possible.

## Observe → explain (P-5)

Part 5 is the day's set-piece (old deck slides 21–24). Sequence: students have
already **typed** `ADC1->ISR = ADC_ISR_ADRDY;` and it worked → the slide asks how
that could possibly *clear* a bit, when Blinky cleared bits with `&= ~mask` → let
them be puzzled → then explain.

**That line is pre-filled in the skeleton, and `ADC_ISR` is shown in Part 4a as a
bit map only.** Nothing before Part 5 may explain how writing a 1 clears a bit, or
the puzzle is pre-empted and the set-piece becomes a lecture.

**Bound the explanation to the status-register case** (continuity): `&= ~mask` is
read-modify-write, and writing the whole register back writes 0s over *every other
flag bit* — destroying any flag the hardware set in between. Do **not** talk about
interrupts landing mid-sequence, ISRs sharing a port, or atomic set/clear: none of
that is teachable yet (interrupts arrive Day 8), and the general race is the
reserved motivation for **BSRR** in `ch-timers-interrupts.ptx`. Spending it here
leaves Day 8/9 with a fix and no felt problem.

## Debriefs

Every part lands on one sentence:

- **P1** — 1.65 V is 2048 counts, not 2047; one count is worth about 0.81 mV.
- **P2** — see above; the three numbers generally differ.
- **P3** — a pot is a voltage divider you turn; the wiper is a *source*, not a control.
- **P4** — configure once, then start / wait / read every time you want a sample.
- **P5** — on status registers, writing 1 clears and writing 0 does nothing, so a
  plain assignment is safe and `&= ~mask` is not.
- **P6** — one comparison per bit is why 12 bits costs ~14 cycles.

## Writing room (S-2)

Three moments require a committed answer before the reveal: Part 1's predicted
count, Part 3's three predicted wiper voltages, and the resolution stretch's
predicted 10-bit count. All get `room="yes"`. These are also the day's P-14 hook —
an AI hands over "2048" instantly, but it cannot supply the student's own DMM
reading beside their own written prediction.

## Hand-offs

**Pre-class reading must establish:** analog vs. digital and why conversion is
needed; quantization, resolution, LSB size, counts↔volts; **the potentiometer as
an adjustable voltage divider** (new — it appears nowhere in Days 1–6, and Part 3
depends on it); and the *idea* of successive approximation as a binary search.
Reading questions on LSB arithmetic and on why the result must be waited for.

**Class deepens, does not repeat** (B-8): the reading carries the SAR mechanism and
the block diagram; class does only the guessing game, which is enactment rather
than restatement. The block diagram and timing live in Reference.

**Homework:** the two large stretches, plus one item Lab 4 does *not* grade — a
counts↔volts calculation for a voltage the student picks and measures — so the
homework has a learning goal of its own rather than retiring the lab's first three
deliverables in advance.

**Lab 4 additionally needs** (this chapter need not teach it — P-13): float vs.
integer range conversion and their timing, and the internal temperature sensor.
Two structural obligations, though:

- Students must know internal channels **exist**. RM0490 Figure 33 (ADC
  connectivity) shows `VSENSE` and `VREFINT`; the rebuilt CHSELR figure is that
  figure, so this is free.
- Lab 4 tells students to insert the calibration sequence (`ADC_CR_ADVREGEN`,
  `delay_ms(2)`, `ADC_CR_ADCAL`) **immediately after the access to
  `RCC->APBENR2`**. The in-class `pa0_adc_init()` must therefore contain that
  exact register access, in that position — but must **not** perform calibration,
  which is the lab's to add.

## Notes from the old deck worth keeping

- Slide 2's instructor notes record two real failure modes for the diagnostic
  ladder: power rail wired to **NRST instead of 3.3 V** (symptom: libusb error at
  debugger connect) and a corrupted project silently building Blinky (symptom: no
  printouts).
- The `malloc()` aside is ES 20 continuity, not ADC content. Keep it short.
- **Naming discrepancy to confirm with Petra:** the old deck's code slide titles the
  program `ADCpot.c`; its homework slide writes `ADC_pot.c`; Lab 4 uses `ADCPot.c`.
  This plan and the chapter use **`ADCpot.c`** throughout.

## What Gate 1 changed

Reviewed by `expert-active-learning`, `expert-cognitive-load`,
`expert-continuity-auditor`, `expert-class-logistics`. Revision 1 was a BLOCKER on
three counts:

1. **The read path was missing entirely.** `ADSTART`, `EOC`, and `ADC_DR` appeared
   nowhere, so a student completing every scaffolded blank would have printed
   nothing — the crucial step was unreachable by construction. Raised independently
   by three reviewers.
2. **The scaffolding claim was fictional.** Three of the four register clusters were
   first encountered *inside* the fill-in. Now taught in Part 4a, on different
   pins/channels so the fill-in is transfer.
3. **Timing was 77 minutes in a 65-minute class with no setup time**, and the cut
   list sat entirely behind the bottleneck so it could never fire. Rebudgeted to 65
   with settling; compressible material moved early; pots pre-seated.

Also corrected: "change to channel 3" stated an answer that is both wrong (A3 is
PB1 → channel 18) and the point of the exercise; the potentiometer was assumed
taught since Day 2 when it appears nowhere in Days 1–6; Part 5 was about to spend
BSRR's reserved motivation and forward-reference interrupts; Lab 4's calibration
insert point imposes a constraint on the in-class init.
