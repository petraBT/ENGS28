Point the Day 8 and Day 9 homeworks at the simulator embeds those chapters
already carry. This is a small job, an hour at most, and it adds no new
`<sim>`: one sentence in each Part 8, "Before Next Class".

READ THESE FIRST, BEFORE WRITING ANYTHING:

1. `plans/sim-embed-context.md` — the repos, the sync-then-build-all sequence,
   the committee gate, the house rules, the traps.
2. `AUTHORING-book.md` — every writing rule, with its ID. L-11 in particular:
   never name a day as the name of a topic in student-facing text.
3. `reviews/day8-sim-gate.md` and `reviews/day9-sim-gate.md` — what the two
   embeds say and where they sit.
4. `source/ch-timers-interrupts.ptx` Part 8 (`act-timer-homework`) and
   `source/ch-gpio-interrupts.ptx` Part 8 (`act-gpio-homework`).

WHY NO NEW EMBED. Both chapters already have a working `<sim>` a few
subsections above their homework, and both homeworks run in the simulator
today. A student can work in the embed that is already there, paste into it,
or use Full screen. A second embed per chapter would be noise.

DAY 8's homework is ADCPot with a timer-interrupt blink. Everything it needs
works: the ADC with a pot in the bay, TIM14 and its update interrupt, and the
two together, since a timer ISR keeps time while `main()` sleeps inside
`delay_ms`. That last one is guarded in `scripts/check-ui.mjs`.

DAY 9's homework is `counterTwoButtons.c`: add the blue user button on PC13 so
it reverses the counting direction, with one handler serving both buttons.
This is the book's best fit for a student working away from their board, and
all of it is modeled. PC13 is line 13, so `EXTICR[3]`, against PB4's line 4 in
`EXTICR[1]`, and both arrive on `EXTI4_15_IRQHandler`, so the "which line
fired" test is real. The on-board B1 already drives PC13 in the board view.
Task 2 wants the LED driven from `GPIOA->BSRR` inside the handler, and `BSRR`
works.

Before promising any of that, run the finished two-button program in the
window yourself and confirm both buttons reach the one handler and the
direction reverses. Do not assert it from this file.

WHAT TO WRITE. One sentence in each Part 8, in Petra's voice, pointing back at
the `<sim>` already in that chapter with an `<xref>`. Search her existing
prose for how she has said this before and reuse it; she has written something
close, and reusing beats inventing. Do not restate what the homework is.

SCOPE AND GATE. Two sentences is still student-facing prose, so it still goes
through `checker-voice` and `checker-technical-accuracy`, scoped tightly. A
learner agent is optional at this size; `learner-anxious-nonhardware` is the
right one if you run it, since the audience for these sentences is the student
who cannot get to their board.

Rebuild every target, run every check in `plans/sim-embed-context.md`, confirm
the `<xref>` resolves in the built page, and commit.
