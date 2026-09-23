# Session prompt: the simulator for Day 6's macro rewrite

Paste this into a fresh session. Smaller than the Day 4 job.

---

Put the board simulator into the macro-rewrite activity in
`source/ch-transistors.ptx`, "Rewriting with Macros" (`act-macros-rewrite`).

**Read `plans/sim-embed-context.md` first** for the repos, the commands, the
committee gate and the traps.

## Why this one

It is the activity in the book whose answer a student **cannot check by
looking**, which is the activity's own stated point: raw bit shifts and CMSIS
macros are supposed to produce identical hardware behaviour, and the student
has no way to confirm they got the rewrite right. The simulator closes that
loop exactly — run it, and the LED either lights or it does not, with `MODER`
and `ODR` on the register panel showing the same bits either way.

Nothing needs building. Every name the activity asks for is already in the
simulator's device header and is the real CMSIS value: `GPIO_MODER_MODE5_Msk`,
`GPIO_MODER_MODE5_Pos`, `GPIO_OUTPUT`, `RCC_IOPENR_GPIOBEN`, `GPIO_ODR_OD5`.
Verify that rather than trusting this paragraph.

**PB5 is header pin D6**, so a bay LED on D6 makes the result visible. Confirm
against `src/board/pinmap.ts` before writing it into prose.

## What to watch

- The activity gives the raw-constant version in its own `<introduction>`.
  That is what the embed should seed with, unchanged, so the student does the
  rewrite in the window. It is already student-facing text, so it needs no
  gate of its own; the new paragraph around the `<sim>` does.
- **Do not let the window hand over the rewrite.** No dropdown entry, no
  starter header, and no runtime message may show the macro form. The
  instructor solution, if you add one, goes in `examples-instructor.ts`
  labelled `Solution: …`.
- There is a real teaching point available and worth one sentence: the two
  versions compile to the *same bits*, so the register panel looks identical.
  That is the confirmation the student cannot get on paper, and it is the
  reason the embed is here at all.
- The activity's third task asks what happens if the clock line is left out.
  The simulator already answers that well: writes are discarded and
  `RCC->IOPENR` sits on the panel with bit 1 clear. Check the task text and
  make sure the prose does not pre-empt the answer.

## Scope

One `<sim>`, the paragraph above it, a dropdown entry if one helps, and a
guard if you change anything in the simulator. Prose through the gate:
`checker-voice`, `checker-technical-accuracy`, and one learner —
`learner-python-intro` or `learner-c-fluent` suits a macro/bit-twiddling
activity. Verify from the built book.
