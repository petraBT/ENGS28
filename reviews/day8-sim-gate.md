# Day 8 simulator — scoped committee gate, synthesis

Three reports, all on the new student-facing text that comes with TIM14 and
interrupts in the board simulator: `day8-sim-voice.md` (MAJOR),
`day8-sim-technical.md` (BLOCKER), `day8-sim-learner.md` (MAJOR, learner-c-fluent).
The proposed prose, as it now stands, is in `day8-sim-proposed-prose.md`.

**Integrated.** `<sim starter="blinkyTimerInt" height="740"/>` is in Part 7, after the "LED not blinking?" ladder and before the skeleton slides, with the gated paragraphs above it.

## Applied

**From the technical checker**

- **BLOCKER.** The re-entry message claimed the board's symptom is "far too
  fast rather than not at all". On a Cortex-M0+ an exception return taken with
  the request still asserted tail-chains straight back into the handler, so
  Thread mode gets no instructions and the board looks dead — which is the
  dead-board case the Part 7 ladder teaches. The message now separates the two:
  one statement of `main()` in this window, nothing at all on the Nucleo.
- **MAJOR.** `TIM14->ARR` reset to 0 in the model; RM0490 §17.4.10 says
  `0xFFFF`. Fixed, with a check: an untouched ARR now gives a 5.46 ms period
  rather than a one-tick one, and the panel prints 65535 where the board does.
- **MINOR.** The prose named three TIM14 registers where the panel shows six;
  it now names all six. The 16-bit-overflow example was a prescaler where the
  chapter's own impossible pair is a count; now ARR. One vacuous assertion in
  `check-timer.mjs` (`JSON.stringify(Infinity)` is `"null"`) compares against
  the number.

**From checker-voice** — the sentence fragment used as a sentence; the
count-as-lead armature; two openings on an absence; "still standing" to "still
pending"; the `->CCER` shorthand; "no waveform comes out of a pin" to "appears
on a pin"; UIF expanded at first use; and four places where wording she has
already written was reinvented rather than reused (the LED-is-PA5 sentence from
her own starter header, the "fires again the moment the ISR returns" clause at
`:402`, "no error and no warning" from `sl-day8-flag`, and the weak-symbol
wording from `sl-day8-isr-name`).

**From the learner** — "TODO 4a" to "TODO 4"; and the volatile caveat no longer
carries the "compiled with optimization on" qualifier, which invited exactly the
reading it was meant to prevent. See the open question below for why it now says
less rather than more.

**Also fixed, pre-existing:** `ch-timers-interrupts.ptx:1191` said TIM14's
priority is 24. Table 40 says 26, and so does the boxed row in the figure the
caption describes. Corrected.

**All three reviewers agree nothing hands over a TODO.** UIE, `NVIC_EnableIRQ`
and `TIM14_IRQHandler` are named in no message; the re-entry message points at
the access type, which Part 5 already teaches in prose and TODO 3's own comment
already spells out.

## Two blockers closed with evidence that was not in the repo

**`Default_Handler` is an infinite loop.** Open since Gate 1, flagged again at
Gate 2 as a BLOCKER, never closed because `startup_stm32c031c6tx.s` is not in
this repo. It is on this machine, in the student workspace. Verbatim:

```
Default_Handler:
Infinite_Loop:
  b Infinite_Loop
...
  .weak  TIM14_IRQHandler
  .thumb_set TIM14_IRQHandler,Default_Handler
```

So the slide `sl-day8-handler-misspelled` is right and the hedges are not. The
simulator now states it without qualification. Still hedged in the chapter:
`:1225-1229` ("Depending on what that default handler does, the board may also
stop responding entirely") and the `rq-volatile` distractor feedback at `:470`
("never runs at all"). Both can now be made definite. Petra's prose, not
changed here.

**The students' Debug build is `-O0`.** `ES28W26/workspace/TemplateProject`
leaves Debug at the IDE default and sets Release to `-Os`; the generated Debug
makefile in the W25 Blinky project carries `-O0` explicitly. Compiling the
Day 8 flag loop with the bundled `arm-none-eabi-gcc` 14.3 for cortex-m0plus:

```
-O0   .L3:  ldr r3,[r3] / cmp r3,#0 / beq .L3      reloads every pass, works
-Os         ldr r2,[r3] / cmp r2,#0 / bne .L2
      .L3:  b .L3                                  read once, then hangs
```

The failure is real and worse than "the blink doesn't happen" — at `-Os` the
program locks in `b .L3`. But it does not reproduce on the build students run.
That makes the chapter's unconditional claim (`:1257-1260`, `sl-day8-flag`,
`rq-volatile`) something they cannot observe on their own boards.

Because of that the simulator's caveat now says only what is certainly true —
this window does not optimize, so a blink here is not evidence — and says
nothing about what the Nucleo will do. Making it say more would either repeat a
claim students can falsify on their own hardware, or contradict the chapter.

## Open, for Petra

1. ~~The `<sim>` placement and its paragraph.~~ DONE, as proposed.
2. **The `-O0` finding**, above. The simulator's own sentence says only what
   is certain and is settled; what remains is whether the chapter's three
   unconditional statements should be qualified. It affects three places in the chapter and the
   reading question, and it changes what a student can be told to go and see.
3. ~~The prescaler buffer.~~ DECIDED: keep the one-sentence disclosure, which
   is now in the book. Original question kept below for the record.

   **The prescaler buffer.** RM0490 §17.3.2 and `fig-prescaler-timing`: a new
   PSC waits for the next update event. The model applies it on write, so the
   window gives the opposite answer to the four figures Part 2 spends on it.
   Modelling it faithfully has a visible cost: with PSC buffered, the first
   period after CEN runs at the reset prescaler, so `blinkyTimerPolled.c` gets
   one extra update about 42 µs in — which is what the board does, and why ST's
   own init code writes `TIM_EGR_UG` (as `tim.c` does and this chapter's init
   does not). Model it, or keep the one-sentence disclosure now in the draft.
4. **`:1495`, "The complete file is at the end of this part."** It is only
   `<slide instructor="yes">`, which renders in no book target, so no student
   page has it. Reword to point at Canvas, or give it a home the reading book
   renders.

## After the gate — from Petra's own testing

**The re-entry message accused a handler that had done nothing wrong.** Stepping
through `blinkyTimerInt`, a 500 ms period elapses between two clicks, so the
handler clears UIF and is entered again immediately because the timer raised it
afresh. From outside, that is indistinguishable from a handler that never
cleared the flag: the line is asserted on return either way. The simulator
called it the second one.

Fixed by counting rising edges rather than looking at the level. `GpTimer`
counts UIF's clear-to-set transitions and `IrqSource.raisedCount()` exposes it;
the interpreter samples it on entry and compares on return, so the message now
fires only when the flag never went down. `check-timer.mjs` pins the two cases
apart and `check-ui.mjs` guard 6 reproduces her scenario (sixty Step clicks at
human speed) and asserts the accusation never appears.

**The underlying behaviour is faithful and now says so.** RM0490 §17.3.12: with
the core halted in debug mode, TIM14 either keeps counting or stops depending on
`DBG_TIM14_STOP` (§26.9.2, bit 15, reset 0 — so it keeps counting). A debugger
on the board does exactly what the window does. The simulator now says this
once, the first time an interrupt is taken while stepping, and points at Run.
