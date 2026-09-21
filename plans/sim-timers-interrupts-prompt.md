# Session prompt: timers and interrupts in the board simulator

Paste the block below into a fresh session. Written 2026-09-21, after the ADC
and potentiometer went in, so it carries the things that went wrong there.

---

Add timer and GPIO interrupts to the ENGS 28 board simulator, so Day 8
(`ch-timers-interrupts.ptx`) and Day 9 (`ch-gpio-interrupts.ptx`) can be worked
in the browser the way Day 7's ADC now can.

**Do Day 8 first and stop there.** Day 9's EXTI needs the interrupt dispatch and
NVIC that Day 8 establishes, and it is the fiddlier half. Deliver Day 8, let
Petra look at it, then do Day 9 in its own session.

## The decision that is already made

**`volatile` does not work in the simulator, and the book will say so.** The
parser accepts `volatile` and ignores it, and there is no optimizer, so a shared
flag declared without it behaves perfectly here and can genuinely break on the
real board at optimization. Day 8's starter `blinkyTimerInt.c` TODO 4a asks the
student which keyword the flag must carry and why, so this matters.

Do NOT try to simulate the miss. Do not invent a behavior the hardware only
sometimes has. Instead:

- Say it in the simulator's own README, in the chapter prose beside the `<sim>`,
  and in the `assets/sim-starters/` copy of the starter.
- The wording is Petra's call, so draft it and put it through the voice check
  rather than deciding it yourself.

## What to build (Day 8)

| Piece | Notes |
|---|---|
| Interrupt dispatch | The interpreter already yields one `{kind:'step'}` event per statement, which is exactly where a real core takes an interrupt. At that yield, if something is pending and enabled, `yield* this.callFunction(handler, [])`. Generator recursion returns to the interrupted point for free. No nesting, no priorities, no saved context. |
| ISR lookup by name | `TIM14_IRQHandler`. Match the student's function by name, which is what CMSIS weak symbols do anyway. Day 9 adds `EXTI4_15_IRQHandler`. |
| NVIC | Just an enable mask keyed by IRQ number, plus the intrinsics `NVIC_EnableIRQ()`, `__disable_irq()`, `__enable_irq()`. None of the three exists today. `TIM14_IRQn` and `EXTI4_15_IRQn` are the two the course uses. |
| TIM14 | `PSC`, `ARR`, `CNT`, `CR1`, `SR`, `DIER`. One timer is all Day 8 uses. Clock gate is `RCC->APBENR2` bit for `TIM14EN`. |
| Time base | Wall clock, the same basis `delay_ms` already uses, so `PSC`/`ARR` arithmetic is verifiable against a stopwatch. Day 8 Part 2 ("Designing the 500 ms Timer") is exactly that arithmetic: `PSC = 12000-1`, `ARR = 500-1` from a 12 MHz clock gives 500 ms. |
| Register panel | TIM14's rows must appear as soon as the program touches the timer, clock or no clock — same rule as the ADC, and for the same reason. The panel's header comment states it. |

Day 9 afterwards: `EXTI` (`IMR1`, `FTSR1`, `RTSR1`, `FPR1`, `EXTICR[]`), edge
detection off the bay button, and `EXTICR[3]` too since the Day 9 homework
`counterTwoButtons.c` uses a second pin.

## Where the facts come from

Every register offset, bit position and reset value comes out of
`assets/stm32c031_rm.pdf` (RM0490) — not from memory and not from plausibility.
PyMuPDF is available and reads it; that is how the ADC's map was built. Verify
before writing: TIM14's base and register offsets, the `SR`/`DIER` bit layouts
and their access types (Day 8 Part 5 is specifically about `rc_w0` vs plain
writes), the `APBENR2` bit for `TIM14EN`, and the NVIC IRQ numbers.

## What is already true, so do not rebuild it

- **Day 9's central observation already works.** `counterResetButtonPolled.c`
  misses a press because of `delay_ms(1000)` in its loop, and `delay_ms` already
  blocks on real wall time, so clicking the bay button between prints already
  fails to reset the counter. Adding EXTI completes the before/after in one tool.
- The bay button already drives its pin through `GpioPort.driveInput`, so Day 9
  needs an edge detector on top of it, not a new component.
- `volatile` already parses (and is ignored).

## How this repo works

Two repos. The simulator is `~/repos/ENGS28-board-sim`; the book is
`~/repos/ENGS28` and carries a **built copy** at `assets/board-sim/`. Read the
simulator's `README.md` first — it is current and explains the student/instructor
split, the URL params, and the checks.

```sh
npm run check                      # in board-sim: the numbers, then the UI guards
cd ~/repos/ENGS28 && ./scripts/sync-board-sim.sh
./scripts/build-all.sh             # NOT ./build.sh, which refreshes one target
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
python3 scripts/check_instructor_only.py
```

`scripts/check-adc.mjs` is the model for asserting numbers the book prints —
write the timer equivalent, because Day 8 prints `PSC`/`ARR` values and a 500 ms
period. `scripts/check-ui.mjs` is the model for anything on screen, and it
drives headless Chrome for a reason: **the editor's Browser pane suspends layout
when hidden and will report a clipped label as fine, and a working element as
invisible.** Both mistakes happened during the ADC work. Measure in headless
Chrome.

## Four things that cost time last session

1. **Do not let the simulator hand over a homework answer.** The pot's attach
   message named the ADC channel, which is the thing Day 7's homework exists to
   make the student derive from a datasheet table. Check every message a new
   peripheral emits against what the chapter asks students to work out.
2. **Re-measure after any change to size.** A voltage readout was moved and
   later had its font enlarged for legibility; the enlargement pushed it off the
   SVG viewBox, an SVG clips there silently, and the reading lost its first
   character and a half. The check that had passed was run before the font
   change.
3. **Show the register the program forgot.** Gating a peripheral's rows on its
   clock being enabled hides the diagnosis from precisely the student who needs
   it. Show the rows as soon as the program touches the peripheral; zeroes beside
   an empty clock register are the answer.
4. **Prose goes through the committee before Petra sees it.** `.claude/agents/`
   and `CHAPTER_PROCESS.md`. For a small change, `checker-voice` plus
   `checker-technical-accuracy` scoped to the new text, plus one learner, and
   write the reports to `reviews/`. `checker-technical-accuracy` caught two
   blockers on two paragraphs last time, and `checker-voice` caught three
   phrasings Petra had already written that had been reinvented.

## Scope boundary

Build the simulator side and the `assets/sim-starters/` copy of the Day 8
starter. Do **not** insert a `<sim>` into `ch-timers-interrupts.ptx` until the
`volatile` wording has been drafted and gated — that sentence is the reason the
embed is safe to place at all. Propose the placement and let Petra approve it.
