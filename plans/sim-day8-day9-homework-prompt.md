# Session prompt: point the Day 8 and Day 9 homeworks at the simulator

Paste this into a fresh session. This is the small one — an hour, probably
less. Good to fold into another session rather than run alone.

---

Both chapters already carry a working `<sim>` a few subsections above their
homework, and both homeworks run in the simulator today. Neither needs a new
embed; each needs a sentence saying the window is there.

**Read `plans/sim-embed-context.md` first.**

## Day 8 — `source/ch-timers-interrupts.ptx`, Part 8, "Before Next Class"

The homework is ADCPot with a timer-interrupt blink (`act-timer-homework`).
Everything it needs works: the ADC with a pot in the bay from Day 7, TIM14 and
its update interrupt from Day 8, and the two together — a timer ISR keeps time
while `main()` sleeps inside `delay_ms`, which is guarded in `check-ui.mjs`.

## Day 9 — `source/ch-gpio-interrupts.ptx`, Part 8, "Before Next Class"

`counterTwoButtons.c` (`act-gpio-homework`): add the blue user button on PC13
so it reverses the counting direction, with one handler serving both buttons.
This is the book's single best fit for a student working away from their
board, and all of it is modelled:

- PC13 is line 13, so `EXTICR[3]`, against PB4's line 4 in `EXTICR[1]`. Both
  arrive on `EXTI4_15_IRQHandler`, so the "which line fired" test is real.
- The on-board B1 is already in the board view and already drives PC13.
- Task 2 wants the LED driven from `GPIOA->BSRR` inside the handler. `BSRR`
  works (writing it lands in `ODR`).

Worth checking before you promise it: run the finished two-button program in
the window yourself and confirm both buttons reach the one handler and the
direction reverses. Do not assert it from this file.

## What to write

One sentence in each Part 8, in Petra's voice, pointing back at the `<sim>`
already in that chapter rather than adding another. Something of the shape
"the simulator in <xref .../> runs this too, if you are away from your board"
— but find her own wording for that idea first; she has written something like
it before and reusing it beats inventing it.

Do not restate what the homework is. Do not add a second `<sim>` to either
chapter; the existing embeds carry the starter and a student can paste into
them or use Full screen.

## Scope and gate

Two sentences is still student-facing prose, so it still goes through
`checker-voice` and `checker-technical-accuracy`, scoped tightly. A learner
agent is optional at this size; `learner-anxious-nonhardware` is the right one
if you run it, since the audience for these sentences is the student who
cannot get to their board.

Rebuild every target and run the four book checks. Verify the `<xref>` you add
resolves in the built page.
