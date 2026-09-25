# checker-voice: Day 8 / Day 9 homework simulator pointers (scoped)

Scope: the two new `<p>` in `subsec-day8-homework` (ch-timers-interrupts.ptx) and
`subsec-day9-next` (ch-gpio-interrupts.ptx), proposed in `hw-sim-pointers.md`.

### Verdict: MAJOR

### Register: is this her?
Mostly, yes. Both sentences open with the same pointer as the Day 7 homework
("can both be done in the simulator (xref) as well as on your board"), and they are
plain, specific and in the second person where the student is doing the work. What
is wrong is in the tails. Day 8 compresses the pot step, which every other embed
states the same way, and drops "Arduino" on the way. Day 9 packs three clauses into
one sentence with "and" and a colon.

### Rewrites
- [MAJOR] ch-timers-interrupts.ptx, subsec-day8-homework. Specimen: Day 10, "the header" -> "the **Arduino** header".
    draft:   "...as well as on your board: paste in your <c>ADCPot.c</c>, then click <em>+ Pot</em> in the component bay and the header pin labeled <c>A0</c>."
    hers:    "The homework can be done in the simulator (<xref ref="subsec-day8-code"/>) as well as on your board.  Paste in your <c>ADCPot.c</c>, click <em>+ Pot</em> in the component bay to the right of the board, then click the Arduino header pin labeled <c>A0</c>."
    because: The proposal says this reuses ch-adc.ptx:1248-1249, but it does not. The
             source reads "Click + Pot in the component bay, then click the Arduino
             header pin labeled A0". The same "..., then click the Arduino header pin"
             appears in five places (ch-adc 1248, ch-switches 1040 and 2202,
             ch-transistors 557, ch-gpio 1341). The draft turns it into "click X and
             the header pin", which drops both the second "click" and "Arduino".
             Petra added "Arduino" to "the header" by hand in the Day 10 pass. "To the
             right of the board" comes from ch-gpio:1341 ("the component bay, the
             parts list to the right of the board"). The Day 8 embed paragraph never
             mentions the bay ("nothing is wired today"), so this is the first time
             the chapter uses the name.

- [MINOR] ch-gpio-interrupts.ptx, subsec-day9-next. Plain declaratives, S-12/S-22 register.
    draft:   "The homework can be done in the simulator (<xref ref="subsec-day9-code"/>) as well as on your board, and the blue user button is the one labeled B1 (PC13) on the simulated Nucleo: hold it down to press it."
    hers:    "The homework can be done in the simulator (<xref ref="subsec-day9-code"/>) as well as on your board.  The blue user button is already on the simulated Nucleo, labeled B1 (PC13).  Hold it down to press it."
    because: "and" joins two unrelated statements, and a colon then adds an
             imperative. Petra's Day 10 replacements break a sentence like that into
             plain sentences, and they are allowed to get longer. "Already on" says
             the one thing a student needs after reading the D5 paragraph where the
             link lands (ch-gpio:1339-1344, "Click + Button in the component bay"):
             there is no second button to add from the bay. That matches her slide
             `sl-day9-stretch` ("The blue button is wired on the Nucleo already, so
             there is nothing to add"). "Hold it down to press it" is still the exact
             wording from ch-gpio:1343. The label is correct: the board view prints
             `B1 (PC13)` (board-sim `board-view.ts:162`).

### Content, per the one-sentence, pointer-only brief
- **Day 8 pot clause: keep it.** It does not restate the homework. It is the one
  setup step the landing paragraphs leave out, since they say "nothing is wired
  today". Without the pot, A0 has nothing connected.
- **Day 9 B1 clause: keep it.** The landing paragraphs cover only the bay button on
  D5. Neither sentence repeats a task statement.
- Nothing is missing. The Day 9 embed paragraph already gives the D5 setup.

### Reuse check
- The ch-adc.ptx:1561-1563 precedent is prose she has passed, not something she
  wrote. It came in with commit 2864343 (the Day 7 simulator rework), and her Day 7
  round (c00f1a1) edited the paragraphs around it and left these lines alone. It is
  the right model, but it is weaker evidence than a hand edit, so the proposal
  should not call it "Petra's".
- Nothing closer turned up in the three voice specimens (none of them mention the
  simulator), in `assets/sim-starters`, in `assets/starters` or in the decks. The
  other form is ch-switches.ptx:1036-1038: "so you can start the toggle homework
  tonight whether or not your Nucleo is in front of you". It belongs in an embed
  paragraph. For a pointer inside the homework subsection, the Day 7 form fits
  better.

### Sweeps
- L-11 days as topics: 0. L-12: all whole sentences. L-13, L-15, L-17: none.
- L-18: none. The `<xref>` renders as "Subsection N.N.N".
- No em dashes. "labeled" is the American spelling.
- Not unit openings: both paragraphs come after each subsection's first paragraph.
- Acronyms and labels: B1 is glossed by what it labels. A0 and PC13 are already
  defined in each chapter.

### For Petra, not for me
- Both links land at the top of a "Writing ..." subsection. The `<sim>` is about 190
  lines below that in Day 8 and about 260 in Day 9. A link straight to the embed
  would need an id on `<sim>`. That is a learner-in-the-room question, not a voice
  one.

### Final wording (re-check of `git diff source/`, merged text)

**PASS.** There are no BLOCKER or MAJOR findings.

- **Day 8:** the pot step now uses the book's usual wording ("…, then click the
  Arduino header pin labeled A0"), and "Arduino" is back. The added paste sentence
  is a plain declarative, names no file, and does not restate the homework. The
  paragraphs beside the simulator already call it "this window" ("a blink in this
  window"), so "the window" matches.
- **Day 9:** the paste sentence is identical in both paragraphs, which is right. The
  B1 sentence kept its colon ("labeled B1 (PC13): hold it down to press it"). That
  is MINOR at most and can stay. If you want to make the change anyway, it is: "…,
  labeled B1 (PC13).  Hold it down to press it."
- L-11, L-12, L-13, L-15, L-17 and L-18: clean. No em dashes. American spelling.
