# Day 7 (ADC) — Gate 2, second pass

Run against `source/ch-adc.ptx` + `assets/decks/day7.json` + `plans/day7.md` after
the first Gate 2 pass and its corrections.

**Panel:** the eight retuned reviewers. The other ten reviewed the previous
revision and their findings were applied; they were not re-run.

Retuning applied since the last pass: reading→class handoff emphasis on
`learner-arduino-veteran`, `learner-visual`, `learner-python-intro`,
`learner-anxious-nonhardware`; UDL + severity 4/5 + budget 8 on
`expert-active-learning`; severity 4/5 + budget 8 on `expert-rigor-hawk`;
readings-introduce-only emphasis on `expert-cognitive-load`; severity 5/5 +
hardware-parity emphasis on `checker-technical-accuracy`.

---

## Author's verification of the two BLOCKER figure claims

Checked before synthesis, because both were dramatic and one turned out to be wrong.

- **`fig-adc-core-hw` — CONFIRMED.** Rendered: the crop shows only CONVERSION
  LOGIC, the DAC box, SAMPLE & HOLD COMPARATOR and a stray "ADC MULTIPLEXER
  OUTPUT" line, over ~40% empty white. The caption names three pieces — reference
  voltage, input multiplexer, SAR converter — and **two of them are not in the
  frame**. The "12 BIT DAC" label is confirmed as an overprint: slide 33's shape
  layer in the original deck carries a `rect` with that text, sitting over the
  underlying raster. `pptx_annotate.py` reproduced the original deck faithfully;
  the problem is upstream, in the source slide.
- **`fig-adc-system-view` — NOT CONFIRMED.** The checker reported the artwork
  reads `D_out = 4095*V_in/3.3`. Rendered, it plainly reads
  `Dout = floor[4096*Vin/3.3]`, which matches the caption. The checker misread the
  embedded raster. No action. (The y-axis does top out at 4095, which is correct
  and already addressed by the caption's limiting clause.)

---

## learner-arduino-veteran — MAJOR

- **[MAJOR] [P-1, P-5]** ch:14-21, 749-753 — the chapter never names the actual
  collision: that `analogRead(A0)` did the pin mode, clock, channel, start and wait
  invisibly. "Arduino" appears only as a header-label name. Part 4a reads as an
  arbitrary new burden rather than a revealed abstraction. Fix: one sentence at the
  top of Part 4a naming the five steps the library used to do silently.
- **[MAJOR] [P-1, P-7]** ch:195-206 — the R_AIN / sampling-time aside forward-
  references sample-and-hold (not covered until two subsections later), introduces
  two undefined terms, and is never picked up again. Cut it or give it a payoff.
- **[MINOR] [P-5]** ch:749-753 — Part 4a's motivation is descriptive; no concrete
  payoff named for doing it the hard way.
- **[MINOR] [B-9]** ch:830 — "it is exactly what the code below does" has no code
  below it; the referenced code is in Part 4b.

## learner-visual — BLOCKER

- **[BLOCKER] [P-4, B-11, P-12]** `fig-adc-signal-chain` — image and caption
  describe different pictures. The caption promises a four-box chain
  (Sensor → AFE → ADC → MCU); the file is a raw un-rebuilt extraction showing a
  single ADC box with a waveform in and a staircase out. No sensor, AFE or MCU box
  exists in the image. This is the chapter's first figure.
- **[MAJOR] [P-4, S-4]** Part 1 / `sl-adc-meaning` — bullets only, no image. The
  picture the reading built the arithmetic around (`fig-adc-system-view`) never
  reappears in class.
- **[MAJOR] [P-12, B-11]** `fig-adc-test-circuit` — bare raster, zero text
  elements; no way to tell which line is PA0/3.3 V/GND. Also referenced by no
  `<slide>`, so it never reaches the projector during the wiring activity.
- **[MINOR] [P-4, B-8]** `fig-adc-divider` — the R1/R2 schematic is never re-shown
  in class, though Part 3's prediction depends on that reasoning.

## learner-python-intro — MAJOR

- **[MAJOR] [P-1, B-8]** TODO 4/5 — the literal idiom students must write
  (`while (!(ADC1->ISR & ADC_ISR_EOC)) {}`) appears nowhere in the book prose, only
  inside the `sl-adc-polling` slide block, whose own note admits "TODO 4 needs it".
  This is also the first time in the whole book a student *produces* this idiom
  rather than reading it. Put the literal line in Part 4a prose.
- **[MAJOR] [B-6]** `uint16_t` and `return (uint16_t) ADC1->DR;` used throughout and
  never explained — why 16 not 32, and why the narrowing is safe here.
- **[MINOR] [P-8]** TODO 1 asks for three lines in one blank, with two macro
  suffixes to change and one line to leave alone; nothing flags that.
- **[MINOR] [P-4]** The write-1-to-clear set-piece has no bit-grid worked example,
  unlike the Blinky mask figures.

## learner-anxious-nonhardware — MAJOR

- **[MAJOR] [P-2, B-4]** ch:508-514 + deck slides 4-7 — the first academic act of
  the day is a bare assertion ("the reading established the arithmetic"), with no
  worked example and no `<xref>` back to `subsec-adc-quantization`. If the reading
  didn't land there is no way to self-rescue in the room.
- **[MAJOR] [P-2]** day7.json:37 — the Part 1 presenterNote authorises cutting the
  only refresher first ("compress to 3 if the room is quick"), with no counter-signal
  for a room that looks lost.
- **[MINOR] [P-2, B-4]** Nothing tells a student that stalling in Part 1 doesn't
  strand them; Part 2 does not actually depend on it.
- **[MINOR] [P-14]** The Part 1 debrief gives the answer but holds the off-by-one
  reasoning in `presenterNote` rather than on the student-facing slide.

## expert-active-learning — BLOCKER

- **[BLOCKER] [P-5, P-6]** Deck Part 1 plays `sl-adc-meaning` (which states the
  formula) **before** `act-adc-predict-count`. The book has activity first, slide
  second — the deck inverted it, turning a prediction into copying a formula off the
  wall.
- **[BLOCKER] [P-9]** `sl-adc-reg-clock` and `sl-adc-polling` print the literal,
  exact code for TODOs 2, 4 and 5 before the fill-in. Unlike TODOs 1 and 3 (shown on
  a different pin/channel), these have no pin dependence, so there is nothing to
  transfer — it is transcription. Contradicts the plan's own "transfer, not
  transcription" claim for 3 of 5 blanks.
- **[MAJOR] [P-6]** Part 4b — the crucial step — has **no debrief slide**, though
  every other part has one and the plan specifies its wording.
- **[MAJOR] [UDL]** Colour is the sole channel carrying meaning on four slides
  (`sl-adc-three-names`, `sl-adc-rc-w1`, `sl-adc-why-not-rmw`, `sl-adc-hw-solution`).
  Unreadable for a colourblind student or a B/W handout, exactly where the day's key
  distinction is taught.
- **[MINOR] [P-6]** `sl-adc-pot` states the Part 3 conclusion before the activity,
  duplicating the debrief.
- **[MINOR] [S-2]** `act-adc-homework` carries no `room` flag though the plan names
  its predicted 10-bit count as one of three committed-prediction moments.

## expert-rigor-hawk — MAJOR

- **[MAJOR] [B-6, L-6]** ch:197-206 — the R_AIN justification doesn't follow from
  its premise. Settling happens *within* the fixed sampling window; sampling once a
  second gives the capacitor no more time on any individual conversion. As written a
  student could conclude "sample slower and source impedance stops mattering", which
  is false. Replace with an error-magnitude argument.
- **[MAJOR] [B-6, L-6, P-2]** ch:828-834 — "exactly three steps" is asserted as the
  complete RM enable sequence, but Lab 4 inserts ADVREGEN/delay/ADCAL before ADEN.
  If the regulator gates ADRDY, the in-class code hangs and the crucial step is
  unreachable. Confirm against silicon/RM before press.
- **[MAJOR] [B-6, L-6]** ch:142-145 — "a real trade-off, not a formality" is a
  vanishing quantity: 12-bit → 10-bit saves 2 ADC clocks, ~167 ns. Give the number or
  soften the language.
- **[MAJOR] [B-6, L-6]** `fig-adc-chselr` caption lists `VDDA`/`VSSA` as internal
  channels — flagged as possibly invented; the usual fourth is `VBAT`.
  *(The accuracy checker independently confirmed VSENSE/VREFINT/VDDA/VSSA against
  RM Figure 33 — this rigor-hawk finding is superseded.)*
- **[MINOR] [B-6]** `fig-adc-timing` — 14/12 MHz = 1.17 µs, not "about 1.2 µs";
  the chapter carries 3 s.f. elsewhere.
- **[MINOR] [P-4]** The R_AIN idea is prose-only in a chapter that gives every other
  abstract idea a figure.

## expert-cognitive-load — BLOCKER

- **[BLOCKER] [P-7, P-2]** The **entire SAR mechanism** (DAC, comparator, SAR,
  sample-and-hold, block diagram) is explained once, in the reading, and never again.
  Part 6 explicitly skips explaining it. A student who skipped the reading gets a
  guessing game with no mechanism ever taught in class. Move the explanation into
  Part 6; cut the reading to motivation.
- **[BLOCKER] [P-7, P-2]** Same for quantization: the reading carries the LSB
  derivation, the floor function, the off-by-one and two worked conversions; Part 1
  is pure retrieval and `sl-adc-meaning` restates only the formula. The technical
  learning never gets a classroom explain beat.
- **[MAJOR] [P-4, B-8]** Part 3 asks only for endpoint predictions (0 / 1.65 / 3.3 V),
  which are geometrically obvious and exercise none of the R1/R2 reasoning the
  reading built. Add a non-endpoint position.
- **[MAJOR] [P-11, B-10]** The R_AIN digression is technical weight parked in the
  reading with no classroom or Reference payoff. Move it to `sec-adc-reference`.
- **[MINOR] [P-4]** `fig-adc-sar-block` never reappears after the reading; it should
  move with the explanation.
- **[MINOR] [S-2, B-7]** `sl-adc-meaning` omits the floor/off-by-one point that the
  reading spends a paragraph on and `rq-adc-lsb` tests.

## checker-technical-accuracy — BLOCKER

Re-verified all seven prior corrections as now correct (GPIO_ANALOG=3, RCC->IOPENR,
the reversed RMW explanation, R_AIN sourcing, "asynchronous to the APB bus clock",
diagnostic item 3's analog reset state, `rs`, EOC write-1-to-clear).

- **[BLOCKER] [B-11, L-6]** `fig-adc-core-hw` — the embedded raster is an
  **Atmel/AVR ADC block diagram**, not the STM32C031C6: it contains AVCC, AREF,
  INTERNAL 1.1V REFERENCE, ADC0–ADC7 (eight channels) and a **10-BIT DAC** which the
  SVG whites out and overprints with "12 BIT DAC". The clip also removes the left 42%
  and bottom 32%, so the reference voltage and multiplexer named in the caption are
  not in the figure. **AUTHOR-CONFIRMED** (see verification above).
- **[BLOCKER] [B-7]** `fig-adc-system-view` — claimed the artwork reads
  `4095*V_in/3.3`. **AUTHOR-CHECKED AND REJECTED** — it reads
  `floor[4096*Vin/3.3]`, matching the caption.
- **[MAJOR] [B-3]** Diagnostic item 4 ("value always 0 → check TODOs 2, 3, 4") is
  wrong for all three causes: each of those omissions produces the *hang* of item 5,
  not zeros. Items 4 and 5 give contradictory advice for the same causes.
- **[MAJOR] [B-7, P-12]** `adc-cr-annotated.svg` and `adc-isr-annotated.svg` each
  contain exactly one highlight rectangle, both on bit 0. `ADSTART` and `EOC` — the
  bits Part 4b turns on — are unmarked, though both captions name them.
- **[MAJOR] [B-11]** `fig-adc-datasheet-table12` — the clip and the annotation
  rectangles disagree: the top ~38% is blank white with two red rectangles hanging in
  empty space, and the crop starts mid-table with no header row.
- **[MAJOR] [B-7]** `fig-adc-pot-photo` — caption says "as wired on the breadboard,
  with the three terminals labelled"; the image is an unconnected pot on graph paper
  and the single text run sits *below* the photo, not on the terminals.
- **[MAJOR] [P-10]** `act-adc-hw-t2` (switch to 10-bit) omits that RM0490 §14.12.4
  allows programming ADC_CFGR1 **only when ADEN is cleared**; the instructor slide
  gives the predicted number but no code and no placement constraint.
- **[MAJOR] [B-9, P-13]** ch:141-145 — "Lab 4 will ask you to measure it" is false;
  Lab 4's timing deliverables time float vs. integer arithmetic, never conversion
  time.
- **[MAJOR] [hardware]** ADVREGEN/ADCAL are mentioned nowhere, yet the "finished
  early" stretch asks exactly the question they answer (why not exactly 0 and 4095),
  and provides no instructor answer.
- **[MAJOR] [B-6]** "exactly what the code below does" — the code below does steps 1
  and 2; step 3 is TODO 4, in a different function, run on every conversion.
- **[MINOR]** `while(!(X & Y))` vs the driver's `== 0` form (deliberate, undocumented);
  "Part 4a: The Four Registers" works six; `SMP` should be `SMP1[2:0]`;
  bit-n-selects-channel-n holds only with `CHSELRMOD=0`; the homework's `|=` on
  CHSELR leaves CHSEL0 set, making a two-channel sequence; ADSTART clears at EOS not
  EOC (coincide here, but EOS is never named, and the figure never shows ADSTART
  falling); Table 55 is indexed at 35 MHz, not the course's 12 MHz; 1.17 µs not
  1.2 µs; "Every sensor… reports a voltage" is false (accelerometers are I²C);
  `fig-adc-chselr` leaks PB1→ADC_IN18, half the homework chain; Part 3 and the
  homework lack `room`; `ADCpot.c` vs Lab 4's `ADCPot.c`; third-party marks
  ("analogcircuitdesign.com", the fritzing logo) uncredited; `fig-adc-sar-block`'s
  caption says "12-bit DAC" but the figure is drawn generically.

**Unverified:** `ADC_CHSELR_CHSEL18` and the other CMSIS macro spellings are invented
by the chapter and absent from the ground-truth driver — `ADC_CHSELR_CHSEL18` is
genuinely at risk since the STM32G0 header stops at CHSEL17. Needs `stm32c031xx.h`.
Also unverified: whether the classroom code reaches ADRDY without ADVREGEN; that
`ES28.h` really defines `GPIO_ANALOG` as 3; the pot photo's terminal orientation.
