Put the board simulator into the macro-rewrite activity in
`source/ch-transistors.ptx`, "Rewriting with Macros" (`act-macros-rewrite`).

READ THESE FIRST, IN THIS ORDER, BEFORE WRITING ANYTHING:

1. `plans/sim-embed-context.md` — the repos, the sync-then-build-all sequence,
   where facts come from, the committee gate, the house rules, the traps.
2. `AUTHORING-book.md` — every writing rule, with its ID.
3. `CHAPTER_PROCESS.md` — the gates.
4. `~/repos/ENGS28-board-sim/README.md`, especially "What works today".
5. `.claude/agents/README.md` — the review committee.
6. `reviews/day9-sim-gate.md` — the most recent embed and what its gate
   caught.
7. `source/ch-transistors.ptx`, the whole activity and the prose around it.

WHY THIS ONE. It is the activity in the book whose answer a student cannot
check by looking, which is the activity's own stated point: raw bit shifts and
CMSIS macros are supposed to produce identical hardware behavior, and a
student has no way to confirm the rewrite is right. The simulator closes that
loop. Run it and the LED either lights or it does not, with `MODER` and `ODR`
on the register panel showing the same bits either way.

Nothing needs building. Every name the activity asks for is already in the
simulator's device header with the real CMSIS value: `GPIO_MODER_MODE5_Msk`,
`GPIO_MODER_MODE5_Pos`, `GPIO_OUTPUT`, `RCC_IOPENR_GPIOBEN`, `GPIO_ODR_OD5`.
Verify that rather than trusting this paragraph, and check PB5 against
`src/board/pinmap.ts` before writing a header pin into prose.

WHAT TO WATCH:

- The activity already gives the raw-constant version in its
  `<introduction>`. That is what the embed should seed with, unchanged, so the
  student does the rewrite in the window. It is already student-facing text,
  so it needs no gate of its own; the new paragraph around the `<sim>` does.
- Do not let the window hand over the rewrite. No dropdown entry, no starter
  header and no runtime message may show the macro form. An instructor
  solution, if you add one, goes in `examples-instructor.ts` labeled
  `Solution: …`.
- There is a real teaching point worth one sentence: the two versions produce
  the same bits, so the register panel looks identical either way. That is the
  confirmation a student cannot get on paper, and it is the reason the embed
  is here at all.
- The activity's later task asks what happens if the clock line is left out.
  The simulator already answers that well, discarding the writes and showing
  `RCC->IOPENR` with bit 1 clear. Read the task text and make sure the prose
  does not pre-empt the answer.

SCOPE. One `<sim>`, the paragraph above it, a dropdown entry if it helps, and
a guard for anything you change in the simulator. Prose through the gate:
`checker-voice`, `checker-technical-accuracy`, and one learner —
`learner-python-intro` or `learner-c-fluent` suits a macro and bit-twiddling
activity.

Verify the embed from the BUILT book, not just that the XML compiled. Then run
every check in `plans/sim-embed-context.md` and commit both repos.
