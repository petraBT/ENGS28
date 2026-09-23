# Day 9 simulator — scoped committee gate, synthesis

Three reports on the EXTI work and the text that comes with it:
`day9-sim-technical.md` (BLOCKER), `day9-sim-voice.md` (MAJOR),
`day9-sim-learner.md` (MAJOR, learner-weak-circuits). The proposed prose is in
`day9-sim-proposed-prose.md`.

**Integrated.** `<sim starter="counterResetButtonInt" coolterm="yes" height="740"/>` is in Part 6, after the bounce paragraph and before the stretch slide, with the gated paragraphs above it.

## The blocker, and what it says about the model

**A press was lost whenever the NVIC switch was the one left out.** With
`EXTICR`, `FTSR1` and `IMR1` all set and `NVIC_EnableIRQ` omitted, a press
during `delay_ms` left `FPR1` reading 0. On the board it reads 0x10: the
pending latch is gated by `IMR1` alone (RM0490 §12.3.1, and Table 45 in
§12.4), and the NVIC has nothing to do with it.

This contradicted the chapter's own central argument — that the four switches
are independent, and that with three of four closed the edge *is* recorded and
simply never reaches the CPU — in the exact place task 1c of "Give the Counter a Button It Cannot Miss" sends a
student to look. The cause was an optimisation: the engine skipped the whole
interrupt path when no NVIC line was enabled, which also skipped sampling the
pins.

Sampling is now driven by a line being armed and unmasked, never by the NVIC's
enable mask, and `check-ui.mjs` guard 9 is the regression test: three switches
closed, a press and release entirely inside the delay, and `FPR1` must still
report it.

Fixing that exposed a second defect. With an armed line, every `delay_ms` is
cut into 10 ms slices, and counting slices down rather than steering by a
deadline made `delay_ms(1000)` take about 1.4 seconds — which is the printed
cadence of Day 9's counter. `delay_ms` now holds to a deadline; the guard
measures it at 18 ms of a second.

## Also applied

**From the technical checker**

- **Pin existence is now per pin, not per port letter.** The model accepted
  "PC4" and refused PD0. Neither is right: the STM32C031C6 has no PC4, and
  PD0-PD3 exist and reach the Nucleo's CN7. The table is transcribed from the
  datasheet's LQFP48 pinout — port C has only PC6, PC7, PC13, PC14, PC15;
  ports D and F stop at 3 — and the message now says which of the two reasons
  applies: the chip has no such pin, or the simulator models A, B and C only.
- `EXTICR` keeps three bits per field on a write. That follows CMSIS and the
  nb_ioport note rather than any sentence in the manual, so it is flagged as a
  judgment in the code. See the note at the end.
- The masked-line claim is re-cited to §12.3.1 and Table 45, which settle it,
  rather than to §12.3, which only implies it.
- `EXTI_PF` is dropped: ES28.h defines PA through PD only, so it would have
  compiled here and failed on the board.
- The 10 ms sample is no longer justified by the debounce time. `ch-switches`
  gives ~4 ms for the 0.1 µF cap, which is *shorter* than the sample. The
  conclusion survives on the other leg (a press lasts tens of milliseconds);
  the reason was the wrong way round.
- **Part 7's race cannot happen here** and now says so, on the same footing as
  the `volatile` caution: interrupts are taken between C statements, so the
  half-finished read-modify-write that Part 7, "Changing Data in an ISR, and
  GPIOx_BSRR", is built on does not exist in this window and has to be
  reasoned about rather than tried.
- **A drift guard**, because the three copies of a starter had already drifted
  once inside this session. `scripts/check-starters.mjs` asserts that a sim
  starter's code is byte-identical to Petra's below the header, and that a
  dropdown entry naming a sim starter *is* that file. It caught live drift on
  its first run.

**From the learner** — the click now says what it stands in for (the Day 3
switch, PB4 to GND behind the internal pull-up) and what it does not (the
Day 3x capacitor; nothing here bounces). "Component bay" is glossed. And the
prose gives the diagnostic the panel was hiding: a press that sets `FPR1` while
the counter still does not reset proves the EXTI half is working and the fault
is past it.

**From checker-voice** — my prose said the polled tap "is missed". Her own
slide, "The press the counter never saw", says a short tap *sometimes* resets the counter and sometimes
does not, and a hold always does. That is correct and mine was not; both the
paragraph and the dropdown hint now use her wording. The dropdown hint also
personified the hardware ("watch the counter ignore you"). Her falling-edge and
pull-up explanation, which I had cut to fit the narrow column, is restored.

**Placement corrected** to prose → `<sim>` → slides in Part 6, "Writing
counterResetButtonInt.c", after the activity and before the skeleton slides,
which is the Day 7 order. My first proposal put it after the diagnostic
ladder, which sits later in reading order than I assumed.

## Open, for Petra

1. ~~The `<sim>` placement and its paragraph.~~ DONE, as proposed. One
   wording change on insertion: the paragraph said "the same switch you wired
   on Day 3" and "the capacitor you added on Day 3x", which `check_rules.py`
   rejects under L-11 (a day used as the name of a topic). It now says what
   they are rather than when they happened, and cross-references the debounce
   figure.
2. **DONE — Chapter 9, Part 3, "Why the EXTI Sits Between the Pin and the
   NVIC".** Petra chose to move the example to line 13 and put the caption on
   PA4 and PB4. Four places carried pins this part has not got, and all four
   are changed, the slide alongside the book:
   - the paragraph now reads "PA13, PB13 and PC13 all compete for EXTI13";
   - the figure caption now reads "PA4 and PB4 cannot both interrupt through
     EXTI4";
   - the matching bullet on the slide "Sixteen lines, one per pin number" says
     the same;
   - that slide's own caption said "notice PA4, PC4 and PD4 queueing for the
     same output" and now says "notice which other ports are queueing for the
     same output".

   `exti_mux.svg` itself labels ports (PA, PB, PC, PD, PF) rather than
   individual pins, so the artwork needed no change: it draws the multiplexer
   generically, which is architecturally right.

3. **Chapter 9, Part 4a, slide "Selecting port B for EXTI4 therefore looks
   like this in code"** — WITHDRAWN. The slide says "the field is eight bits
   wide", and I flagged it as inconsistent with the three-bit `_Msk` in the
   code above it. Petra is right and the flag was wrong: RM0490 12.5.6 draws
   each port-selection field as a full byte, `EXTIm[7:0]`, marked `rw`, and
   the "reserved" in that section is about the port CODES (4, 6, 7 and up),
   not about bits 7:3. The slide is correct as written, and clearing the whole
   byte before setting is a good habit whichever way the silicon implements
   it. See the note below.

4. **Chapter 9, Part 3, slide "Sixteen lines, one per pin number"**
   (`sl-day9-exti-mux`) says "the 48 pins our processor has". That counts
   package pins, three of which are power and reference. Pre-existing and
   minor.

## A note on the EXTICR field width, since it came up

The field is eight bits. RM0490 12.5.6 draws `EXTIm[7:0]` and marks the whole
byte `rw`; "Other: reserved" in the bit description lists the port codes that
mean nothing (4, 6, 7 and above), not bits that must be left alone. Clearing
all eight before setting is correct and is the more portable habit.

What the same section also says is that "EXTIm fields contain only the number
of bits in line with the nb_ioport configuration" — five ports need three bits
— and CMSIS accordingly defines `EXTI_EXTICR2_EXTI4_Msk` as `0x7`. So on this
part three bits are implemented, the CMSIS mask clears exactly those three,
and clearing all eight clears three real bits and five that are not there.
Both work, and nothing in the course can tell them apart.

The simulator keeps three bits on a write, so an `EXTICR` byte written with
`0xFF` reads back `0x07`. That follows CMSIS and the nb_ioport note rather
than any sentence in the manual, and it is flagged as a judgment in
`exti.ts`. It only diverges from an eight-bit implementation for a program
that writes a value above 7 into the field, which no correct program does.
