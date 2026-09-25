# Day 8 and Day 9 homework pointers to the simulator: scoped gate, synthesis

Two short paragraphs, no new `<sim>`. Each points the Part 8 homework at the
embed already in its chapter, `subsec-day8-code` and `subsec-day9-code`.
Reports: `day8-9-hw-sim-voice.md` (MAJOR, then PASS on the final wording),
`day8-9-hw-sim-technical.md` (MINOR only), `day8-9-hw-sim-learner.md` (MAJOR,
learner-anxious-nonhardware). The proposal and evidence are in
`day8-9-hw-sim-proposed-prose.md`.

## Verified before writing, in the built book's embeds

Both finished homeworks were run in the production embeds, driven over CDP in
headless Chrome, with the buttons pressed by pointer events.

- **Day 9**, `counterTwoButtons.c` assembled from her solution slides: D5 and
  B1 both reach `EXTI4_15_IRQHandler`. B1 reverses the count and D5 resets
  it, and the count wraps both ways. PA5 changes through `GPIOA->BSRR` within
  30 ms of each B1 press and does not change on D5.
- **Day 8**, ADCPot with the 4000 by 1000 timer blink: the LED toggles every
  333 ms on average, while `main()` prints the pot reading once a second.

## Applied

- **Voice.** The pot step now reads "then click the Arduino header pin
  labeled A0", which is the book's wording in five places; the draft had
  compressed it. "Component bay" is glossed, because the Day 8 embed's
  paragraphs never name it. The Day 9 compound sentence is split, and
  "already on the simulated Nucleo" says there is no second button to add.
  Correction to the proposal: the ch-adc precedent is prose she passed, not
  wording she wrote.
- **Learner.** The Day 9 text never said to put your own code in a window
  that opens with the unfilled in-class skeleton. Both paragraphs now say
  "Paste in your own program in place of the one in the window", worded the
  same in each and naming no file, so neither restates its homework.
- **Technical.** Nothing to change. Both minors were considered: the
  EXTICR[3] row is feedback after an attempt, and A0 is what the file the
  homework names reads.

## Beyond "one sentence"

The brief asked for one sentence each. Both paragraphs are longer, because
each embed is missing one thing the homework needs: on Day 8 the pot, which
the embed's paragraphs never mention ("nothing is wired today"), and on Day 9
the fact that B1 is clickable. Each also needs the paste step. All three
reviewers judged these necessary, and none of them restates a task.

## Open, for Petra

1. Both links land at the top of a "Writing …" subsection, about 190 lines
   (Day 8) and 260 lines (Day 9) above the simulator. The ch-adc precedent
   does the same. A link straight to the embed would need `xml:id` support
   on `<sim>` in `xsl/engs28-html.xsl`, which it does not have today.
