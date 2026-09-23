# Day 9 simulator: new student-facing text, for review

Context: the board simulator now models EXTI, so Day 9
(`source/ch-gpio-interrupts.ptx`) can be worked in the browser. Nothing has
been inserted into the chapter. This file collects every piece of new text a
student will read.

Day 9 builds on the Day 8 pass that has already been gated
(`reviews/day8-sim-gate.md`). The volatile caution and the re-entry message are
carried over from it unchanged except for the register names.

---

## A. Proposed chapter paragraph, to sit immediately before a new `<sim>`

Proposed placement (revised after the gate): Part 6 (`subsec-day9-code`),
after the activity `act-gpio-interrupt` and before the slides, around
`source/ch-gpio-interrupts.ptx:1337`. That is the Day 7 order, prose paragraph
then `<sim>` then slides, rather than after `sl-day9-ladder`, which in reading
order sits later than the draft assumed.

Draft:

> Here is the same exercise in the simulator, for working on it away from your
> Nucleo. Click *+ Button* in the component bay, the parts list to the right
> of the board, then click the Arduino header pin labeled `D5`, which is PB4,
> and hold it down to press it. That one click closes the same switch you
> wired on Day 3: PB4 to GND, with the pull-up inside the chip holding the pin
> HIGH until the button connects it. The debouncing capacitor you added on
> Day 3x is not modeled, so nothing here bounces.
>
> All four switches are in the register panel, `EXTI->EXTICR[1]`,
> `EXTI->FTSR1`, `EXTI->IMR1` and `NVIC->ISER`, beside `EXTI->FPR1`, as soon
> as your program touches the EXTI. `EXTI->IMR1` resets to 0xFFF8 0000, so
> look at bit 4 rather than at the whole word. When a press sets `FPR1`'s bit
> and the counter still does not reset, the EXTI half of the chain is working
> and the fault is past it: the NVIC line, or the handler's name.
>
> Run `counterResetButtonPolled.c` from the examples list first. A short tap
> sometimes resets the counter and sometimes does not, and a press-and-hold
> always does, for the same reason as on your board: the loop reads the pin
> once a second and spends the rest of the time inside `delay_ms()`. Then run
> your own version and tap it the same way.
>
> Two words of caution. This simulator does not optimize your code, so a flag
> shared between the interrupt handler and `main()` works here whether or not
> its declaration carries `volatile`. TODO 3 asks which keyword that
> declaration must carry, and a counter that resets in this window is not
> evidence that you have it right. And an interrupt here is taken between two
> C statements, never part way through one, so the half-finished
> read-modify-write of <xref ref="subsec-day9-race"/> cannot happen in this
> window: that one has to be reasoned about rather than tried.
>
> Nothing here is saved for you, so use the download button (the downward
> arrow) to keep a copy of your work. *Full screen* opens the program in a new
> tab, and your code is part of that tab's web address, so a bookmark of that
> tab brings it back as it was when you pressed the button.

(The last paragraph is lifted from the Day 7 `<sim>` prose in `ch-adc.ptx`,
deliberately unchanged.)

---

## B. The starter's header comment

`assets/sim-starters/counterResetButtonInt.c`. The code body is byte-identical
to `assets/starters/counterResetButtonInt.c`; only the header is rewritten
narrow. The same file is what the examples dropdown serves, and
`scripts/check-starters.mjs` now enforces both of those. As shipped:

```
/* counterResetButtonInt.c
 * ENGS 28 - Day 9 in-class
 *
 * The same counter as
 * counterResetButtonPolled.c, but the
 * button is no longer read in the loop.
 * A falling edge on PB4 raises an
 * interrupt; the handler records the
 * press in a shared flag, and main()
 * acts on it next time round.
 *
 * Click + Button in the component bay,
 * the parts list to the right of the
 * board, then header pin D5, which is
 * PB4, and hold it down to press it.
 * The internal pull-up holds PB4 HIGH
 * while the button is open, and pressing
 * it connects the pin to GND. A press is
 * therefore a falling edge, which is the
 * edge this program asks for. The
 * debouncing capacitor from Day 3x is
 * not modeled, so nothing here bounces.
 *
 * The point of the exercise is what
 * disappears: GPIOB->IDR is not read
 * anywhere in main(), and a press during
 * the one-second delay is still noticed.
 *
 * Three blocks to fill in:
 *
 *   TODO 1  the four EXTI/NVIC switches
 *   TODO 2  the handler, exact name
 *   TODO 3  the shared flag
 *
 * All four switches are in the register
 * panel: EXTI->EXTICR[1], EXTI->FTSR1,
 * EXTI->IMR1 and NVIC->ISER, beside
 * EXTI->FPR1. A switch you left out
 * shows up as a register still holding
 * its reset value, and EXTI->IMR1 resets
 * to 0xFFF8 0000, so look at bit 4
 * rather than at the whole word.
 *
 * As given, this file does not compile:
 * the test in TODO 3c is empty. That is
 * the first thing to fill in.
 *
 * Two words of caution. This simulator
 * does not optimize your code, so a flag
 * shared between the ISR (interrupt
 * service routine) and main() runs here
 * whether or not its declaration carries
 * volatile. TODO 3 asks which keyword
 * that declaration must carry, and a
 * working counter in this window is not
 * evidence that you have it right.
 *
 * And an interrupt here is taken between
 * two C statements, never part way
 * through one. The half-finished
 * read-modify-write that Part 7 is about
 * cannot happen in this window, so that
 * one has to be reasoned about rather
 * than tried.
 */
```

---

## C. New runtime messages

Only two are new for Day 9; the re-entry message and the `Default_Handler`
message are the Day 8 ones, unchanged, and now cover the EXTI vectors too.

1. `EXTICR` naming a port this board does not bring out:

> Line 4 will not fire: EXTI->EXTICR points it at port D, which this board
> does not bring out to a pin. Point it at the port your button is on.

2. `EXTICR` naming a code the manual reserves:

> Line 4 will not fire: EXTI->EXTICR selects port code 6 for it, which
> RM0490 §12.5.6 lists as reserved. Select one of the ports this board has.

---

## D. Examples-dropdown labels

- `Day 9 — counterResetButtonPolled.c (given, complete)`, hinted "Add a button
  to header pin D5. Try a short tap and a press held down, and see which one
  resets the counter." Its header comment in the dropdown is her own from
  `assets/starters/counterResetButtonPolled.c`, quoted rather than rewritten.
- `Day 9 — counterResetButtonInt.c starter (3 TODOs)`, hinted "Add a button to
  header pin D5. As given the file does not compile: the test in TODO 3c is
  empty."
- Instructor build only: `Solution: Day 9 counterResetButtonInt.c (PB4
  falling-edge EXTI)`, hinted "Add a button to header pin D5, then tap it
  between two prints."

---

## What the gate is for

1. **Does anything hand over work the chapter asks for?** Day 9's TODOs are:
   the four EXTI/NVIC switches; the handler's exact name from Table 40; and
   the `volatile` flag. Part 5 separately has students PREDICT whether the
   pending bit is cleared by writing 0 or 1 (`act-gpio-fpr-predict`) before
   looking it up — and Day 8 has just taught them the opposite polarity, which
   is the whole point of the activity. Nothing the simulator says may
   pre-empt that prediction.

2. **Is the four-switches claim honest here?** The chapter says forgetting any
   one of the four gives "no error, no warning, and no interrupt". The
   simulator is silent for all four, which matches — but it does emit the two
   messages in section C for an `EXTICR` port the board has no pin for. Is
   that a helpful diagnosis or a hint the chapter does not intend?

3. **One modelling limit worth a decision.** A pin press cannot be given a
   time, so while a program sleeps in `delay_ms` the host samples an armed
   line every 10 ms rather than watching it continuously. A press is tens of
   milliseconds at minimum and the RC debounce is longer, so nothing in the
   course can see the difference — but it is a sample, and Day 9 Part 7 is
   about races. Should the prose say so?
