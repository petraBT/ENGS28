# Day 8 / Day 9 homework simulator pointers: technical check

Scope: the two proposed `<p>` elements in
`scratchpad/hw-sim-pointers.md`, for `subsec-day8-homework`
(ch-timers-interrupts.ptx) and `subsec-day9-next` (ch-gpio-interrupts.ptx).
Neither is in the source yet (git clean), so the check is against the proposal text.

## Verdict: OK. No BLOCKER and no MAJOR findings. Two MINOR notes, both optional.

## Verified

- **xref targets exist and hold the implied embed.**
  `subsec-day8-code` is ch-timers-interrupts.ptx:1348, and it holds `<sim starter="blinkyTimerInt" height="740"/>` at :1535.
  `subsec-day9-code` is ch-gpio-interrupts.ptx:1125, and it holds `<sim starter="counterResetButtonInt" coolterm="yes" height="740"/>` at :1389.
- **Day 8 input is A0.** The homework (ch-timers-interrupts.ptx:1678) starts from "your ADCPot.c from Day 7". Both `assets/starters/ADCPot.c:12` and `assets/sim-starters/ADCPot.c:11` use PA0, header A0, channel 0. The solution slide `sl-day8-hw-solution` keeps `pa0_adc_init()`. In the simulator, `pinmap.ts:43` maps A0 to port A bit 0, and `board-view.ts:204` draws the pin label.
- **UI wording.** The bay button reads `+ Pot` (index.html:40). Clicking it enters a place mode whose status line is "Click a header pin with an ADC channel (A0-A5, ...)" (board-view.ts:81-82). So "click + Pot ... and the header pin labeled A0" is the real two-click sequence.
- **Day 8 terminal.** The embed URL has no coolterm parameter (built `subsec-day8-code.html`: `?embed=1&src=../sim-starters/blinkyTimerInt.c`). The XSL emits `coolterm=1` only for `coolterm="yes"` and never emits `coolterm=0` (engs28-html.xsl:339-377). `autoRevealTerm` defaults to true and is turned off only by `coolterm=0` (main.ts:49, 56, 524). The first printf therefore opens the terminal.
- **Day 8 timing.** PSC 3999 and ARR 999 give 4000 × 1000 / 12 MHz = 0.3333 s. The recorded mean edge interval of 333 ms matches this. The sim-starter ADCPot main loop is `delay_ms(1000)` with printf, so a print about once a second is the expected behaviour.
- **Day 9 label and press.** board-view.ts:162 has `'B1 (PC13)'`, and style.css:481 fills it blue (#1e6bd6). The press runs on pointerdown and the release on pointerup or pointerleave (board-view.ts:467-469), so "hold it down to press it" is accurate. B1 rests high through its modeled external pull-up (board-view.ts:65, 480-485).
- **Day 9 recorded register values.** I recomputed each one:
  - EXTICR[1] = 0x1: PB is code 1 in the EXTI4 field, bits 7:0.
  - EXTICR[3] = 0x200: PC is code 2 in the EXTI13 field, bits 15:8.
  - FTSR1 = IMR1 low bits = 0x2010: lines 13 and 4.
  - ISER = 0x80: IRQ 7 is EXTI4_15.
- **Published bundle is current.** `assets/board-sim/BUILD-INFO.txt` shows commit 6c750a6, which is HEAD of ENGS28-board-sim, and that repo has no uncommitted changes. Both label strings are in `main-C-CTFAra.js`.
- **No pre-emption from the examples dropdown or messages.**
  - The student dropdown (src/examples.ts) holds only starters and given programs. The Day 7 entry is the 5-TODO starter, and the Day 8 entries are blinkyTimerPolled and the blinkyTimerInt starter. Neither Day 8 entry uses 4000/1000.
  - The only PC13 program is the instructor demo in `examples-instructor.ts:49`. It is gated behind `INCLUDES_INSTRUCTOR_EXAMPLES` (examples.ts:775), and its label is absent from the published bundle.
  - No EXTI code path produces a terminal note. Only adc.ts and usart.ts call `note()`.
  - The TIM14 rows show raw register values only. No computed period or frequency is displayed.
- **The B1 label gives nothing away.** The homework already names PC13 (ch-gpio-interrupts.ptx:1915), so the label adds nothing the student is asked to work out.
- `check_rules.py` on both files: 0 errors, 0 warnings, run before insertion. Re-run it once the paragraphs are in.

## Findings

- [MINOR] Day 9, register-panel.ts:312-324. The EXTICR row gate is "written OR a selected line is armed in RTSR1/FTSR1". The recorded evidence claims the panel "does not show the answer ... before the student's code does". That holds as far as it goes, but there is a case to know about. Suppose a student arms FTSR1 bit 13 and writes the wrong word, say EXTICR[2]. The panel then shows an `EXTI->EXTICR[3]` row at 0x0 beside the wrong one, which names the right register. This happens only after the student has made an attempt, so it works as diagnostic feedback and does not pre-empt a first attempt. The source comment says this is intended. The proposed sentence makes no claim about it, so no text change is needed. It is flagged so nobody later describes the panel as never revealing the register.
- [MINOR] Day 8, proposed "paste in your ADCPot.c ... the header pin labeled A0". This is correct for the file the homework names. It depends on the student having followed Day 7's "change it back before you make the next one" (ch-adc.ptx:1556) after the A3 exercise, since A3 is PB1 on ADC_IN18. If the wording should cover that case, "the header pin your ADCPot.c reads, A0" would do it. This is optional.

## Part B

- B1 (rules against the chapter's own examples): neither sentence states a rule. Nothing to test.
- B2 (arithmetic): the only arithmetic is the evidence's 1/3 s period, and it is correct (above).
- B3 (self-contradiction): I checked each sentence against its target subsection.
  - Day 8's "nothing is wired today" (ch-timers-interrupts.ptx:1504) describes the class exercise. The new sentence covers the homework's pot, so the two do not conflict.
  - Day 9's "hold it down to press it" matches :1343.
  - No contradictions found.
- B4 (against the rest of the book): the sentences follow the ch-adc.ptx:1561-1563 precedent, and the `+ Pot`/`A0` wording matches ch-adc.ptx:1248-1249. No conflicts.

## Unverified

- None needed for these claims. I did not re-run the simulator. The recorded runs are consistent with the source in every respect I checked, so I had no reason to doubt them.
