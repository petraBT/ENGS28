# learner-weak-circuits — Day 9 simulator text (scoped gate)

Draft reviewed: the Day 9 `<sim>` prose, starter header, runtime messages and
dropdown labels (now `reviews/day9-sim-proposed-prose.md`).

(Transcribed from the agent's findings; the agent ran without a Write tool.)

### Verdict: MAJOR

### Findings

**[MAJOR] The click never rehearses the wiring it stands in for.** The draft
said only "Click *+ Button* in the component bay, then click the Arduino header
pin labeled `D5`, which is PB4, and hold it down to press it." It never said
that the click stands in for the switch wired on Day 3: one leg to PB4, one to
GND, the pull-up already inside the chip, the debounce cap added on Day 3x
(`fig-rc-debounce-circuit`, referenced in Part 2 and never mentioned here). A
student who did the whole exercise in the window would come out *less* ready to
check their breadboard, having practiced "click and it works" with no rehearsal
of which leg goes where or why a floating pin misbehaves. The pin-name pairing
("`D5`, which is PB4") is the one thing that does transfer, and follows the
give-both convention.

**[MAJOR] Silence is real, and the text under-taught how to break the tie.**
The chapter's four gates are `EXTICR`, `FTSR1`, `IMR1` and `NVIC_EnableIRQ()`
(`sl-day9-four-switches`). The panel the draft described listed four EXTI
registers and **no NVIC register at all**. Forget switch 4 and the three
registers you were told to watch all look correct, and the panel is silent on
the one that is actually missing. That is not a fear, it is "four ways to be
stuck with no idea which", confirmed by the text itself. "IMR1's reset value is
not zero, so read that one carefully" resolves exactly one gate and does not say
what carefully would show — bits 19, 23, 25 and 31 are set at reset and bit 4 is
not, so "not zero" alone does not tell you whether *your* bit is right. And
there is a real diagnostic in the same panel the draft did not use: `FPR1` sets
on an unmasked edge independently of the NVIC, so a press that sets `FPR1` while
the counter still does not reset proves the EXTI half is configured and points
past it.

**[MINOR] The two runtime messages do not catch the likeliest mistake.** They
fire for `EXTICR` pointing at port D or at a reserved code, but simply never
writing `EXTICR` leaves it at its reset value, port A — a legal, unflagged code,
and the slip a nervous student is most likely to actually make.

**[MINOR] The compile-first experience is fair, but only if the header is seen
before Run.** The header says twice that the file does not compile as given, and
this matches the real starter exactly, so the simulator introduces no new
hazard — a build error is a low-stakes software event, nothing like the fear of
damaging a board. Whether the header is visible before the first click is a
question for the player, not the prose.

**[MINOR] "Component bay" is used with no gloss.**

## What was done

All five are addressed, three of them in the simulator rather than the prose:

- The prose now says the click closes the same switch wired on Day 3, PB4 to
  GND behind the internal pull-up, and that the Day 3x capacitor is not
  modeled so nothing here bounces. The starter header says the same.
- **`NVIC->ISER` is now a real mapped register and is on the panel.**
  `NVIC_EnableIRQ()` is compiled to what CMSIS actually does, one store to
  `ISER[0]` at 0xE000E100, so switch 4 has a register like the other three, and
  the bit index is the IRQ number. The row appears whenever the program goes
  near a peripheral that can interrupt, so the student who forgot the call sees
  it clear rather than absent.
- **An `EXTICR` word is now shown when a line it selects has been armed**, not
  only when the program has written it — so leaving it at port A shows up as a
  visible zero instead of no row at all.
- The prose gives the `FPR1` diagnostic explicitly, and names bit 4 of `IMR1`
  rather than "not zero".
- "Component bay" is glossed as the parts list to the right of the board.

`scripts/check-ui.mjs` guard 8 runs the program with each of the four switches
left out in turn and asserts all four registers are on the panel every time.
