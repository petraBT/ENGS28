# Day 4 simulator: scoped committee gate, synthesis

Three reports on the Day 4 embed and the text that comes with it:
`day4-sim-technical.md` (MAJOR, no blocker), `day4-sim-voice.md` (MINOR),
`day4-sim-learner.md` (MAJOR, learner-ai-reliant, chosen because the risk on
this day is a window that lets the state design be skipped). A short voice
recheck of the final text came back clean. The final text is in
`day4-sim-proposed-prose.md`.

**Integrated.** `<sim starter="toggleLEDfsm"/>` is in Part 4
(`subsec-day4-fsm-code`), after `act-day4-fsm-implement` and before
`inst-day4-fsm-code`, with three paragraphs above it.

**The seed is Petra's choice (2026-09-24):** the Part 2 `typedef enum` +
`switch` toggle listing, which the student book already prints. A working
`blinkyCNT` counter was rejected because that program is `sl-day3-cnt-solution`,
instructor-only and Lab 1's graded BlinkCNT deliverable.

**All three reviewers agree the no-answer rule holds.** Nothing student-facing
names the pause/resume states, their number, the held-button twins or the
sliced delay.

## Applied

**From the technical checker**

- **MAJOR.** "The register panel shows `GPIOB->IDR` while the button is
  attached" was wrong: a released bay button drives nothing, so IDR appears
  because the program reads it, not because a button is attached. The sentence
  is gone (replaced by the learner's test, below). The same mistake in the
  comment at the head of `register-panel.ts` is corrected.
- **MAJOR.** The runner fix could still lose a frame when `setTimeout`
  truncated a fractional wait and fired before the program clock. The wait is
  now rounded up, and the loop runs up to a millisecond ahead.
- **MAJOR (delivery).** Synced: the simulator is committed and in
  `assets/board-sim/`, all five targets rebuilt.
- **MINOR.** The warning tied the lack of bounce to the third task only; it now
  says a clean press in this window is no evidence for the first task's test
  either (the voice rewrite covers this).
- **MINOR.** Busy-wait pacing is now guarded: Day 1's Blinky toggles every
  333 ms, measured identical under the old runner and the new one.

**From checker-voice** — the capacitor sentence is her Day 9 one with its
figure cross-reference; the S-19 "is not evidence" clause from her Day 8 and 9
embeds; the header's task line reuses her Day 4 deck, slide 13 ("begin with
blinkyCNT.c, adapt LED-toggling state machine"); "and again for" became "and do
the same for"; the header and the prose now agree on "Nucleo and the AD2" and on
what is checked (the transitions, not the capacitor); the dropdown label uses its
siblings' parenthesis form; the instructor hint now names all three LEDs, like
the student one.

**From the learner** — the prose and the header now say "try a quick tap as
well as a press held down", in place of the register-panel sentence. The
simulator reproduces the blocking-`delay_ms(500)` failure exactly (guard 12),
and nothing else in the window would make a student meet it. The learner also
asked to cut the header's task paragraph as a paste-ready AI prompt; not done,
because it restates the activity (equally pasteable) and the handout is read
without the book (B-13). Petra's call.

## Verified from the built book

`output/web/subsec-day4-fsm-code.html`, served and driven in headless Chrome:
one embed, visible, 660 px; the editor holds `toggleLEDfsm.c`; the dropdown
names it; no `Solution:` entry in the student bundle; a button on D5 and LEDs on
D13, D12, D11 all attach; three presses toggle PA5 (ODR 0x20, 0, 0x20);
`GPIOB->IDR` is on the panel. The instructor JSON carries the three solutions,
and `RUN_HELD` appears in the instructor page and not the student one.

## Open, for Petra

1. **"A press held down" is a hint.** It points at the case the held states
   exist for, without naming them. Keep, or cut to "try a quick tap"?
2. **The header's task paragraph** (the learner's AI-prompt objection above).
3. **The seed's idiom differs from the solution's.** The Part 2 listing uses
   `int btn = !(GPIOB->IDR & (1U << 4))` and bare shifts; her slide 12 and
   `inst-day4-fsm-code` use `buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0)`
   with `#define`s. A student who adapts the seed ends up in a different idiom
   from the solution projected afterwards.
4. **Every simulator dropdown label** uses "Day N — …" with an em dash. Student
   facing; the convention predates this embed.
