# Learner read (learner-anxious-nonhardware): the two homework-to-simulator pointers

Reviewed as the student who cannot reach their board tonight, against the
proposal (now `reviews/day8-9-hw-sim-proposed-prose.md`), `subsec-day8-homework`,
`subsec-day8-code`, `subsec-day9-next` and `subsec-day9-code`. The agent had no
write tool; its report is recorded here verbatim in substance.

## Findings

- **MAJOR**: the Day 9 sentence never tells the student to put their own code
  in the window. It only explains B1. The window at `subsec-day9-code` opens
  with the in-class `counterResetButtonInt.c` skeleton, with its TODOs unfilled
  by design. A student who follows the link, presses B1 as told, and sees
  nothing happen cannot tell whether that is their own PC13 code, a blank in
  the skeleton, or the simulator. Fix: a paste step parallel to Day 8's.

- **MINOR**: Day 8's "paste in your ADCPot.c" is the first time the book tells a
  student to put a different file into a simulator that is already showing
  code. Not a stall, but a moment of "do I clear it first or paste over it".
  Fix: say "in place of" what is there.

- **OK**: everything else is reachable through the link. Day 9's D5 button step
  is in the paragraph above that subsection's `<sim>`
  (`ch-gpio-interrupts.ptx:1338-1349`), so the new text is right not to repeat
  it. Both linked subsections say nothing is saved and give the download and
  bookmark path. Both sentences offer the simulator as the board's equal, which
  answers the "I can't get to my board" fear rather than treating it as lesser.

## Noted, out of scope

The "LED not blinking?" ladder for Day 8 (`sl-day8-ladder`) is a `<slide>`, so a
homework-only reader never sees it. Pre-existing, not raised against this text.
