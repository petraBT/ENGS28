# Day 11 — Gate 3 committee (the deck)

Reviewing `assets/decks/day11.json` (43 slides) and the `<slide xml:id="sl-day11-…">`
blocks in `source/ch-motors.ptx` (`sec-motors-day11`), against the prose they condense.
Run 2026-08-17, after Petra's passes 1 and 2 on the book.

Panel: `expert-class-logistics`, `learner-visual`, `expert-cognitive-load`,
`checker-voice`, `learner-in-the-room`, `checker-figure-claims`.

**Standing judgment for this gate: Petra has hand-passed this prose twice. Where a
reviewer asks to cut or reword a sentence she wrote, her wording wins and the fix is
applied to my text instead.**

---

## expert-class-logistics — BLOCKER

- **[BLOCKER] P-2/P-14** The plan's student-facing pin checklist never shipped into
  `act-day11-direction`; one instructor gating ~15 groups' first external-supply build
  serializes 10–20 min. *(Judgment: `task-day11-dir-wire` is Petra's own rewritten
  sentence and already carries the full wiring spec. Do not duplicate it with a
  checklist — narrow the instructor check instead, plan-level, and raise the
  student-facing checklist with her.)*
- **[MAJOR] S-8, VERIFIED** The defer order in `plans/day11.md` names four task IDs
  that do not exist after Petra's pass 2: `task-day11-pwm-quantitative`,
  `task-day11-pwm-lowduty`, `task-day11-pwm-brakephase`, `task-day11-dir-stretch`
  (each 0 hits in source, 1 in the plan). The defer order is not executable. Rewrite
  against the real IDs — `task-day11-pwm-config` and `task-day11-pwm-timing` are the
  paper work that can go to homework; keep `task-day11-pwm-pin` in class.
- **[MAJOR]** True overage is larger than the recorded ~20 min once the intro and the
  Part 4 check queue are counted, and it lands on Parts 4 and 6, both protected.
- **[MINOR] S-8** Intro budgeted 3 min against five hardware items per kit; rebudget
  to 6–7 and give it back from Part 2's shoot-through ("cultural enrichment").
- **[MINOR] P-3** Part 4's spread is queue position, not skill; fixed by the above.
- **[MINOR]** Part 6 has no defer lever of its own; name one.

## learner-visual — MAJOR

- **[MAJOR] B-11a, VERIFIED and FIXED** `fig-pwm-scope` still pointed at
  `slide29_ab2c785e.jpg` (320×180 thumbnail) while Petra's sharp `fig-pwm-scope.png`
  (1205×754) sat unused in the folder. Swapped, width 85%.
- **[MAJOR] S-4, VERIFIED and FIXED** `sl-day11-regulator` used `stack="yes"` on a
  524×1142 portrait image; S-4 says a portrait image takes two-column, never stacked.
  `stack` removed.
- **[MAJOR] B-11a** The two wiring Fritzings give ~half the frame to the Nucleo and a
  text panel; the TB6612's pin names (VM vs VCC, the pins the exercise turns on) are
  under a fifth of the canvas and will not read projected. Crop tighter to the
  breadboard/breakout/regulator, or add a cropped inset of the pin row. **Needs Petra —
  they are her exports.**
- **[MAJOR] P-4** Part 1 teaches the motor physics as bare symbols with no picture of
  what is being modeled. Wants one labeled loop: V, R_a, back-EMF source, current
  arrow, reused on both physics slides.
- **[MINOR]** The two `<sidebyside>` pairs were checked and are fine at projection size.

## expert-cognitive-load — MAJOR (repetition census)

- **[MAJOR] B-8** The 5 V/3.3 V rail separation appears 4× in Part 4's first three
  units: `sl-day11-regulator` bullet + its caption, `sl-day11-wiring-1`'s note, and
  `task-day11-dir-wire`. *(Trim my caption and note; leave Petra's task sentence.)*
- **[MAJOR] B-8** The IN1/IN2 → mode mapping is derived in full twice —
  `inst-day11-truth-table` then `inst-day11-direction`. The second should confirm in
  one line and keep only the CW/CCW physical-wiring ambiguity.
- **[MAJOR] B-8** The diagonal current path and "read the mode off the table, not the
  drawing" recur across `inst-day11-diagonal` → `sl-day11-diagonals` caption →
  `sl-day11-truth-table` caption. Captions should say what the picture adds.
- **[MINOR] B-8** `sl-day11-brake-vs-stop`'s caption re-derives the back-EMF braking
  mechanism given one slide earlier; make it wayfinding.
- **[MINOR] P-7** `inst-day11-demo` re-runs the 1.6 kHz chain cold; lead with "this
  matches your Part 5 number". The derive→verify arc itself is correct, keep it.
- **[MINOR] P-7** `sl-day11-tb6612-inside` carries channel B, which is unused this term.
- **Held up:** the closing recap compresses rather than restates (avoids the Day 10
  failure), and no instructor slide is a bare S-10 restatement.

## learner-in-the-room — BLOCKER (highest-value report of the gate)

Deck spine sound: six parts, six dividers and the agenda agree; Parts 1–3 build in order.

- **[BLOCKER] slide 24 `act-day11-direction`, VERIFIED and FIXED.** (a) The activity said
  "keep the truth table, shown again just above" — but the re-shown image is a bare
  `<image>` that no deck entry projected, so it was never on the wall. *I created this
  with the overflow fix that moved it out of the activity.* Fixed by adding
  `sl-day11-truth-table-again` (a slide that refs the figure with `refPage`) immediately
  before the activity, and rewording the prose. (b) Task 3 says to plug in USB while
  slide 23's figure says in large type "Leave USB disconnected" — the figure is the
  while-wiring state. Fixed by putting the sequence in slide 23's caption, matching
  Petra's own slide 19: after the check, USB first, then the wall adapter.
- **[MAJOR] FIXED** `sl-day11-wiring-1` had the rail-separation rule in a `<note>`, which
  never projects, though the book calls it crucial. Promoted to the caption.
- **[MAJOR] FIXED** `sl-day11-scope` projected a 320×180 thumbnail (see learner-visual)
  *and* sat after the students had measured the trace themselves (S-10). Now points at
  Petra's sharp capture and is projected **before** `act-day11-demo`, as a target and a
  fallback for anyone whose scope will not trigger.
- **[MAJOR] FIXED** `sl-day11-motor-relations` put four constants on the wall with none
  named — the condensation had cut exactly the naming clauses the book has (S-9: thinned
  instead of split). Legend extended to K_i, b, K_e, R_a.
- **[MAJOR] FIXED** `sl-day11-counter-compare` printed CNT, CCR1 and ARR unglossed, and
  the book's TIM14 sentence was on no slide at all. Both added.
- **[MINOR] FIXED** `task-day11-pwm-pin` said "the datasheet's Table 12" when the only
  datasheet the room had seen was the TB6612's. Now names the STM32C031C6 datasheet.
- **[MAJOR] OPEN — needs Petra.** `sl-day11-in1-in2` gives away its own activity (P-6):
  her CCW figure traces the conducting path and prints "IN1=LOW, IN2=HIGH", and the next
  slide asks students to work out which combinations conduct and trace the path. Wants an
  unannotated bridge for the setup slide, or the activity moved before the figure.
- **[MAJOR] OPEN — needs Petra, and ties to her stop-figure question.** `hbridge-stop.png`
  is in a different drawing language from every other bridge in the deck: O1/O2 where the
  room has learned OUT1/OUT2, PGND where it has learned GND, no motor symbol, and nothing
  marked — so the panel whose point is "all four off" is indistinguishable from a blank
  bridge, and `task-day11-tt-brake-stop` asks students to match rows to it.
- **[MINOR] OPEN** Projected `<xref>`s render as "Figure 11.2.12", a book number that
  means nothing from the wall. The book needs the xref; the slide does not. Unresolved.
- **[MINOR] OPEN** Both wiring PNGs show a sliver of cut-off text along the top edge.
- Smaller, deferred: slide 36's scope bullet repeats slide 37's; slide 4's "the two boxes
  in green" is near-white on a projector; slide 13's caption should name which panel is
  which; recap items 2 and 4 say one thing twice; the closing recap assumes Part 5 ran
  when Part 5 is the designated cut.

## checker-voice — re-running (first run died mid-response when the machine slept)
## checker-figure-claims — pending
