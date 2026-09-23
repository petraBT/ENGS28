# Day 9 simulator — technical gate

Scope: `scratchpad/day9-sim-prose-draft.md`, plus the EXTI/NVIC implementation in
`~/repos/ENGS28-board-sim`. Every register fact below was checked against RM0490
(`assets/stm32c031_rm.pdf`), the real CMSIS header
(`~/Documents/ENGS28Code/ES28W25/Library/chipheaders/Device/stm32c031xx.h`), the real
startup file, the STM32C031 datasheet and the Nucleo user manual. Nothing was taken
from the draft's own assertion.

## Verdict: BLOCKER

---

## Answers to the four questions asked

**Q1 — offsets, reset values, bits, port codes, IRQ numbers, EXTICR field width.**
All correct. RTSR1 0x000 / FTSR1 0x004 / SWIER1 0x008 / RPR1 0x00C / FPR1 0x010 /
EXTICR 0x060+4(x-1) / IMR1 0x080 / EMR1 0x084, reset 0 except IMR1 = 0xFFF8 0000
(RM0490 §12.5.1-12.5.8). RPR1/FPR1 are `rc_w1`, RTSR1/FTSR1/IMR1/EMR1/EXTICR `rw`.
Port codes 0x00 PA, 0x01 PB, 0x02 PC, 0x03 PD, 0x04 reserved, 0x05 PF, other reserved
(§12.5.6). EXTI base 0x4002 1800, 1 KB (memory map, PDF p.42). Vector positions 5/6/7
(Table 40, PDF p.215), matching `IRQn_Type` in the header. Handler names match
`startup_stm32c031c6tx.s` lines 150-152 exactly.

**The EXTICR width: CMSIS's 3 bits is right, and the manual is not in conflict.**
The manual draws `EXTIm[7:0]` because that is the field's *address footprint*, and says
in the same breath "EXTIm fields contain only the number of bits in line with the
nb_ioport configuration". Five ports need three bits, and CMSIS accordingly defines
`EXTI_EXTICR2_EXTI4_Msk = 0x7`. Using 0x7 for the decode and for the clear-then-set
idiom is correct. See MINOR-1 for the one place the 8-bit footprint still leaks.

**Q2 — does a MASKED line leave a pending flag?** No, and the model is right — but it
is sourced from the weakest sentence available. §12.3's "When the associated CPU
interrupt is unmasked, the corresponding RPIFn ... bit is/are set" is a *sufficient*
reading only. The decisive statements are two others, both stronger and both
unambiguous:

- §12.3.1 (PDF p.220): **"The pending register is only set for an unmasked interrupt."**
- Table 45, §12.4 (PDF p.222): with `EXTI_IMR.IMn` = 0 the `EXTI_RPR/FPR` column reads
  "No"; with IMn = 1 it reads "Status latched".

So the modeling claim stands. Re-cite it (see MINOR-3).

**Q3 — do the generated `EXTI_*` symbols match the real header?** Yes, exactly. All 694
constants in `DEVICE_CONSTANTS` were dumped and compared symbol-by-symbol against the
values parsed out of `stm32c031xx.h`: **0 mismatches**, including
`EXTI_EXTICR2_EXTI4_Pos` = 0 / `_Msk` = 0x7 and `EXTI_EXTICR4_EXTI13_Pos` = 8 /
`_Msk` = 0x700. The only sim symbols absent from the header are the `_IRQn` values
(which live in the `IRQn_Type` enum, verified = 5, 6, 7, 19) and the `EXTI_P*` port
codes (ES28.h — see MINOR-4).

**Q4 — can the sampling model give a wrong answer?** Yes, twice. See BLOCKER-3
(a press with the NVIC switch left out is *not* latched, where the hardware latches it)
and MAJOR-3 (Part 7's read-modify-write race cannot occur at all).

---

## BLOCKER

**B-1. "parts bay" names a control that does not exist.**
`assets/sim-starters/counterResetButtonInt.c:12` and
`ENGS28-board-sim/src/examples.ts:477` now read "Click + Button in the parts bay on the
right". The on-screen label is **Component bay** (`index.html:37`,
`<span class="bay-title">Component bay</span>`). It is also inconsistent with the two
sim-starters already shipped — `assets/sim-starters/ADCPot.c:5` and
`toggleLEDstart.c:5` both say "component bay" — and with the draft's own section A.
Correction: "component bay" everywhere. ("on the right" is accurate: the bay sits inside
`<section id="right">`.)

**B-2. The port-D/port-F runtime message states a hardware fact that is false.**
`src/peripherals/exti.ts:107-110` emits
"...points it at port D, which this board does not bring out to a pin."
Checked against the STM32C031 datasheet Figure 7 (LQFP48 pinout, PDF p.29) and the
Nucleo user manual (Table 11 / Figure 7, PDF pp.19, 22-23):

- **PD0-PD3 and PF0-PF3 exist on the STM32C031C6** (pins 38-41 and 4, 8, 9, 10) and
  **are brought out**, to the ST morpho connectors CN7/CN10. The sentence is simply
  wrong for lines 0-3.
- For line 4 — the only line Day 9 uses — the true statement is sharper and different:
  **the STM32C031C6 has no PD4 and no PF4 pin at all.** Port D stops at PD3 and port F
  at PF3.

Correction, per line: for lines 4-15, "the STM32C031C6 has no PD*n* pin — port D stops
at PD3" (and PF3 for port F). For lines 0-3, the honest reason is the simulator's, not
the chip's: it models ports A, B and C only.

**B-3. A press is lost when the NVIC switch is the one left out, where the hardware
latches it.**
Reproduced directly against `Exti`: with EXTICR, FTSR1 and IMR1 all set and nothing
asking the peripheral anything, a press-and-release leaves `FPR1 = 0`. On the Nucleo
`FPIF4` would be set — the pending latch is gated by `EXTI_IMR1` alone (Table 45), never
by the NVIC.

The path: `interpreter.ts:333` returns from `serviceInterrupts` before touching the EXTI
when `!nvic.anyEnabled`; `nvic.ts:88` returns `Infinity` from `msToNext()` for the same
reason; so `doDelay` (`interpreter.ts:747`) takes the whole `delay_ms(1000)` as one
unsliced wall-clock wait and `Exti.sample()` is never called during it. `Exti.sample()`
compares levels rather than latching, so a press that has already been released by the
next sample is invisible.

This matters because it contradicts the chapter's central argument at
`source/ch-gpio-interrupts.ptx:900-908`: the four switches are independent, and with
three of four closed the edge *is* recorded, it just never reaches the CPU. A student
who omits `NVIC_EnableIRQ` and prints `EXTI->FPR1` to find out how far the press got —
exactly the diagnosis `act-gpio-int-t1c` invites — gets 0 here and non-zero on the
board. The same loss occurs with PRIMASK set.

Fix: drive the 10 ms sample from "any line is armed and unmasked", independent of
`Nvic.enabled`, rather than from `msToNext()`.

---

## MAJOR

**M-1. The draft's register list omits the fourth switch and substitutes a register
that is not a switch.**
Draft section A: "The register panel shows `EXTI->EXTICR[1]`, `EXTI->FTSR1`,
`EXTI->IMR1` and `EXTI->FPR1` ... so a switch you left out shows up as a register still
holding its reset value."
`FPR1` is not one of the four switches; the fourth is the NVIC, and `NVIC->ISER` **is**
on the panel (`src/board/register-panel.ts:338-342`, and it is in
`check-ui.mjs`'s `WANT_ROWS`). This is the defect Guard 8 in `check-ui.mjs` was written
to prevent — its own comment records that "a learner review found that the fourth
switch, the NVIC enable, had no register on screen at all" — reintroduced in the book
prose. The current starter file already states it correctly ("EXTI->EXTICR[1],
EXTI->FTSR1, EXTI->IMR1 and NVIC->ISER, beside EXTI->FPR1"); section A has fallen behind
it. The panel also shows `RTSR1` and `RPR1`, so the enumeration is short in that
direction too.

**M-2. "the RC debounce is longer" is false against the book's own number.**
Draft line 134 and `src/machine.ts:38` both justify the 10 ms sample interval with "far
shorter than the RC debounce on the board". `source/ch-switches.ptx:964` says
"With a 0.1 µF capacitor the pin takes ~4 ms to reach HIGH", and 40 kΩ × 0.15 µF = 6 ms
for the larger kit part. **4 ms and 6 ms are both shorter than 10 ms.** The conclusion
(nothing in the course can see the sampling) survives on the other leg — a press lasts
tens of milliseconds — but the stated reason is the wrong way round and should be cut.
A right answer reached by a wrong step.

**M-3. Part 7's race cannot occur in the simulator, and nothing says so.**
`interpreter.ts:433-436` dispatches interrupts at statement boundaries only, so
`counter++` is atomic here. Part 7's left-hand program
(`source/ch-gpio-interrupts.ptx:1452-1472`) — `while(1){counter++;}` with `counter = 0;`
in the ISR — is the chapter's set-piece for a lost update, and it will run correctly in
this window forever. The draft's caution paragraph discloses only the `volatile` limit,
which is the smaller of the two. The draft's own gate question 3 raises races and then
asks only about sampling. One sentence is needed, on the same footing as the `volatile`
one: interrupts here are taken between C statements, so the read-modify-write window
Part 7 is about does not exist in this window.

**M-4. Pin existence is modeled by port letter, not by (port, pin).**
`exti.ts:111` returns `{ port: 'C', pin: line }` for any line 0-15, so line 4 can be
pointed at "PC4" and pressed. **PC4 does not exist on the STM32C031C6** — LQFP48 brings
out only PC6, PC7, PC13, PC14 and PC15 (datasheet Figure 7). So the check refuses pins
that exist (PD0-PD3) and accepts pins that do not (PC0-PC5, PC8-PC12). The same error is
in the file's own header comment, `exti.ts:10-11`: "Line 4 can listen to PA4, PB4, PC4 or
PD4" — of those four, only PA4 and PB4 exist on this part.

The chapter inherits it: `source/ch-gpio-interrupts.ptx:516-517` says "PA4, PB4, PC4 and
PD4 all compete for EXTI4", and the caption at 524-525 says "PB4 and PC4 cannot both
interrupt through EXTI4". Two of the four named pins do not exist on the STM32C031C6.
The multiplexer argument is unaffected — the *lines* are shared regardless — but the
example should use pins the part has.

**M-5. Draft section B quotes a file that has changed under it.**
The claim "the code body is byte-identical to `assets/starters/counterResetButtonInt.c`;
only the header is rewritten narrow" is **true** — diffed from `#include <stdio.h>`
down, zero differences. But the header text quoted in section B is no longer what is in
`assets/sim-starters/counterResetButtonInt.c`; the file was rewritten during this review
(it now explains the pull-up and the falling edge, and names `NVIC->ISER`). Re-derive
section B from the file.

The related claim "the same file is what the examples dropdown serves, so there is one
text, not two" currently holds — `src/examples.ts` was updated in lockstep — but nothing
enforces it. `scripts/check_starters.py` covers `assets/starters/` only, not
`assets/sim-starters/`. Worth a guard, since this pair has already drifted once within
one session.

---

## MINOR

**MINOR-1. EXTICR reads back bits the hardware does not implement.**
`exti.ts:237` stores the written word whole and `read32`/`exticrValue` return it, so
writing 0xFF into `EXTICR[1]` reads back 0xFF and the panel displays 0xFF. RM0490 §12.5.6
implements only the `nb_ioport` bits; the hardware would read 0x07. The *decode* is
correct (masked to 0x7, and the reserved-code note fires), so only the panel display
diverges. Mask on write.

**MINOR-2. The chapter says the EXTICR field is eight bits wide; CMSIS says three.**
`sl-day9-exticr-code` (`ch-gpio-interrupts.ptx:790-792`) tells students "`_Msk` ... name
the field's bits" and, two lines later, "the field is eight bits wide". The code
immediately above clears with `EXTI_EXTICR2_EXTI4_Msk`, which is **0x7** — three bits.
Rephrase to the truth: the field occupies a byte of the register, of which three bits
are implemented, and `_Msk` names the implemented three.

**MINOR-3. Cite the sentence that actually settles the masked-line question.**
`exti.ts:18-21` and `check-exti.mjs` both cite "RM0490 12.3". Use §12.3.1 ("The pending
register is only set for an unmasked interrupt") and Table 45 in §12.4. Same conclusion,
a source that cannot be argued with.

**MINOR-4. `EXTI_PF` is invented.**
`device-header.ts` defines `EXTI_PF = 5`. ES28.h defines `EXTI_PA` through `EXTI_PD`
only — checked in all three of ES28W25, ES28W26 and ES28W27. A student who writes
`EXTI_PF` compiles here and fails to compile on the board. Drop it, or accept it
knowingly.

**MINOR-5. `delay_ms` fidelity under slicing.** With an armed line, a `delay_ms(1000)`
becomes 100 chained `setTimeout(10)`, each of which overshoots. The printed cadence will
be measurably longer than one second. Nothing in the draft claims a cadence, so this is
informational. UNVERIFIED as to magnitude — it needs a measurement in the browser.

**MINOR-6. A press shorter than 10 ms is invisible.** `exti.ts:38-40` claims the sampler
"cannot miss a button press, which lasts many thousands of statements" — true while code
is executing, but during a sliced delay the guarantee is the 10 ms interval, not the
statement count. A human mouse click is 50 ms and up, so this is unreachable in class;
a scripted press is not. Say 10 ms in the comment rather than "statements".

**MINOR-7. Day 8's `<sim>` is not in the book.** The draft justifies its placement as
"mirroring where Day 7's and Day 8's `<sim>` sit". `grep '<sim '` over `source/*.ptx`
finds ch-adc, ch-intro-blinky (×2), ch-switches and ch-uart only —
`ch-timers-interrupts.ptx` has none. The Day 8 pass is gated but unmerged, so the
parallel is to a proposal. UNVERIFIED as stated; the Day 7 half is correct.

**MINOR-8. "the 48 pins our processor has"** (`sl-day9-exti-mux`) counts package pins,
three of which are VDD/VSS/VREF+, and the part has fewer than 48 GPIOs. Pre-existing;
not a simulator matter.

---

## Verified correct, explicitly

- Every EXTI offset, reset value, access type, port code and IRQ number (above).
- All 694 device-header constants against `stm32c031xx.h`: zero mismatches.
- Handler names against `startup_stm32c031c6tx.s`.
- `rc_w1` modeled exactly: `EXTI->FPR1 = ~FPIF4` does **not** clear, `= FPIF4` does.
  Part 5's prediction activity (`act-gpio-fpr-predict`) survives contact with the window,
  and nothing the simulator prints pre-empts it.
- `IMR1` comes up at 0xFFF8 0000 and the panel shows it.
- `SWIER1` reads 0 and sets RPIF irrespective of RTSR1 (§12.5.3).
- Re-pointing a line at an already-low pin is not an edge; arming a line that is already
  low is not an edge. Both match the asynchronous edge detector.
- "As given, this file does not compile: the test in TODO 3c is empty" — true. The parser
  reports `Line 88: Unexpected ')'`.
- The `volatile` caution: `volatile` parses and is ignored (`parser.ts:30,140`), so the
  claim is accurate as written.
- The closing paragraph is verbatim from `ch-adc.ptx:1260-1264`, as the draft says.
- `D5` → PB4 (`pinmap.ts:36`), matching the chapter and the Nucleo.
- Dropdown labels and hints match `examples.ts:413,462` and
  `examples-instructor.ts:308`; the Day 9 solution is present in the instructor build
  (P-10 satisfied, also `sl-day9-solution`).
- `check_rules.py` clean on `ch-gpio-interrupts.ptx`; `check_starters.py`,
  `check_instructor_only.py` and `scripts/check-exti.mjs` all pass.

## On the draft's own three questions

1. *Does anything hand over work the chapter asks for?* No. The two runtime messages
   concern `EXTICR` port codes the chapter never uses; neither names the falling edge,
   the mask, the vector or the clear polarity.
2. *Is the four-switches claim honest here?* Yes for all four — no note fires for any of
   the three EXTI omissions, confirmed by `check-exti.mjs`. The two `EXTICR` messages
   fire only for port codes 3-7, which no correct or plausible-slip Day 9 program
   produces (the likely slip is leaving it at 0, i.e. port A, which is silent, as the
   chapter promises). Keep them, once B-2 is fixed.
3. *Should the prose say the line is sampled?* Given B-3 and M-3, yes — but the sentence
   to write is about interrupt *timing granularity*, not about the 10 ms pin sample,
   which no one in the course can observe.
