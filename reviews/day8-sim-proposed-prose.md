# Day 8 simulator: new student-facing text, for review

Context: the board simulator now models TIM14 and interrupts, so Day 8
(`source/ch-timers-interrupts.ptx`) can be worked in the browser the way Day 7's
ADC can. Nothing has been inserted into the chapter yet. This file collects
every piece of new text a student will read, for a scoped gate.

---

## A. Proposed chapter paragraph, to sit immediately before a new `<sim>`

Proposed placement (revised after the gate): in Part 7 (`subsec-day8-code`),
immediately after the "LED not blinking?" diagnostic list and before the
skeleton slides. That mirrors the Day 7 analogue exactly, which sits after the
troubleshooting list and immediately before its `<sim>`, and it keeps the
diagnostic steps attached to the exercise.

Draft:

> Here is the same exercise in the simulator, for working on it away from your
> Nucleo. The LED is PA5 and it is already on the Nucleo board, so nothing is
> wired today. The register panel shows all six TIM14 registers this chapter
> uses, `CR1`, `DIER`, `SR`, `CNT`, `PSC` and `ARR`, as soon as your program
> touches the timer, so you can watch the counter run from 0 to 499 and wrap,
> and the update interrupt flag UIF come up when it does. The counter runs on real time here, so a 500 ms period really
> does take 500 ms. A count too large for the 16 bits of `TIM14->ARR` is
> truncated here exactly as it is on the board, and the blink comes out at the
> wrong rate.
>
> One word of caution: this simulator does not optimize your code, so a flag
> shared between the interrupt handler and `main()` works here whether or not
> its declaration carries `volatile`. TODO 4 asks which keyword that
> declaration must carry, and a blink in this window is not evidence that you
> have it right. The prescaler is one more place the window is simpler than the
> chip: a new value takes effect here as soon as it is written, rather than
> waiting for the next update event the way <xref ref="fig-prescaler-timing"/>
> shows.
>
> Nothing here is saved for you, so use the download button (the downward
> arrow) to keep a copy of your work. *Full screen* opens the program in a new
> tab, and your code is part of that tab's web address, so a bookmark of that
> tab brings it back as it was when you pressed the button.

(The last paragraph is lifted from the Day 7 `<sim>` prose in `ch-adc.ptx`,
deliberately unchanged.)

---

## B. The starter's header comment

`assets/sim-starters/blinkyTimerInt.c` — the simulator copy of Day 8's starter.
The code body is byte-identical to `assets/starters/blinkyTimerInt.c`; only the
header comment is rewritten narrow, the same way `assets/sim-starters/ADCPot.c`
rewrites Day 7's. As shipped after the gate:

> The LED is PA5, already on the Nucleo board, so there is nothing to wire
> today.

> All six TIM14 registers this chapter uses appear in the register panel as soon
> as your program touches the timer, so a forgotten clock line shows up as an
> empty RCC->APBENR2 beside a block of zeros.

> One word of caution: this simulator does not optimize your code, so a flag
> shared between the ISR (interrupt service routine) and main() runs here
> whether or not its declaration carries volatile. TODO 4 asks which keyword
> that declaration must carry, and a blink in this window is not evidence that
> you have it right.

---

## C. Runtime messages the simulator can emit

These appear in the panel under the editor while a program runs. Messages 1 and
2 are emitted once per reason per run; 3 can repeat if the fault is
intermittent; 4 ends the program.

1. Timer clock off, on any write to a TIM14 register:

> TIM14's clock is off, so this write did nothing. Set RCC_APBENR2_TIM14EN in
> RCC->APBENR2 first.

2. A write to TIM14's capture/compare registers (a Day 11 program pasted in
early):

> This simulator models TIM14's counter and its update event. It does not model
> the capture/compare output stage, so TIM14->CCMR1, TIM14->CCER and
> TIM14->CCR1 are accepted and stored, but no waveform appears on a pin.

3. A handler that returns without clearing the flag that raised it, so the
interrupt is raised again at once — the symptom of clearing an `rc_w0` flag the
ADC's way. Emitted after the third consecutive re-entry:

> The interrupt handler returned without clearing the flag that raised the
> interrupt, so the request is still pending and the handler is entered again
> the moment it returns. In this window the main loop still gets one statement
> in between, so the blink runs far too fast. On the Nucleo the processor goes
> straight back into the handler without returning at all, and the board looks
> dead. Check which write actually clears this flag: the access type in RM0490
> says whether a 0 or a 1 does the clearing.

4. An interrupt raised with no function carrying that vector's handler name:

> An interrupt was raised and the processor fetched the handler's address from
> the vector table, but no function in this program has that entry's handler
> name. The entry therefore still holds the startup file's weak default,
> Default_Handler, which is an infinite loop, and nothing else in your program
> will run. Press Reset.

---

## D. Examples-dropdown labels

- Student build: `Day 8 — blinkyTimerPolled.c (given, complete)`, with the hint
  "It blinks the on-board LED, so there is nothing to attach. Watch TIM14->CNT
  in the register panel."
- Instructor build only: `Solution: Day 8 blinkyTimerInt.c (TIM14 update
  interrupt)`, with the hint "Nothing to attach. The main loop never touches a
  timer register."

---

## What the gate is for

Two questions above all.

1. **Does anything here hand over work the chapter asks the student to do?**
   Day 8's four TODOs are: UIE in `TIM14->DIER`; `NVIC_EnableIRQ(TIM14_IRQn)`;
   the handler's exact name, copied from the startup file; and the `volatile`
   keyword on the shared flag. Part 5 separately asks students to look up
   `rc_w0` in the reference manual and work out why `TIM14->SR = ~TIM_SR_UIF`
   is the clearing idiom. Nothing the simulator says may answer any of these.
   (Message 3 above is the closest call: does "the access type in the reference
   manual decides whether a 0 or a 1 does the clearing" tell a student too
   much, given Part 5 has already taught exactly that?)

2. **Is the `volatile` statement both true and correctly bounded?** The
   decision is settled and not up for reopening: the simulator will not
   simulate the miss, because the hardware only has it sometimes and an
   invented version would teach a rule about the simulator rather than about
   the compiler. What is in scope is whether the wording is accurate, whether
   it sounds like Petra, and whether a student reads it and draws the right
   conclusion rather than "volatile does not matter".
