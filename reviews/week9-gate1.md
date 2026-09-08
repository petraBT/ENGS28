# Gate 1 — Week 9 plans (Days 17, 17x, 18), 2026-09-08

Seven reviewers on `plans/week9-map.md`, `plans/day17.md`,
`plans/day17x.md`, `plans/day18.md` against
`plans/week9-ground-truth.md` and her three decks.  Reviewers were
briefed on the fixed shape (briefings + work time; B-19; the "in-class is
her slides" ruling) and told that additions without a DISPLACES line
would be discarded.  Rulings and the applied list are at the end.

Verdicts: checker-arc-fidelity MAJOR (coverage COMPLETE on all three
decks; no Day 11-class omission); expert-active-learning 1 MAJOR each on
17x and 18; expert-cognitive-load MAJOR (three overloaded beats, census
clean); expert-continuity-auditor 2 MAJOR (Protocol tab; PWREN), all
prerequisite claims verified; expert-class-logistics 1 BLOCKER (Day 18
BLE congestion) + 2 MAJOR; learner-firstgen-novice 1 BLOCKER (flow
control never glossed) + 3 MAJOR; learner-anxious-nonhardware 1 BLOCKER
(CTS trap instructor-only) + 2 MAJOR.

---

## checker-arc-fidelity

Verdict MAJOR (1 MAJOR, 7 MINOR).  All three clocks right, all sub-beats
sum, all 59 of her slides in a coverage table; the Day 11 failure mode is
absent.  Coverage-table verdicts: Day17-BLE COMPLETE, Day17x COMPLETE
(slides 22–25 recorded deferral, Q1), Day19 COMPLETE (the one addition —
Deliverable 6's checklist — named as required).

1. [MAJOR] Her slide 24's "Optional HiTA activity" reaches the room
   nowhere: the ground truth (updated after the plans) records the HiTA
   screenshot and Q11, but day17.md Part 4, its coverage row and the
   map's flag list never carry it.  Fix: one clause in Part 4, the
   coverage row amended, Q11 in the map's flags.
2. [MINOR] Q1's answer has nowhere to land: the 17x optional variant and
   Day 18 are both budgeted to the minute.  Her 17x slide 23 and Day 19
   slide 7 are the same move (Engs 62/31/CS 51 in both), making Day 18's
   where-to-go beat the natural home at no net cost.  Fix: funding lines
   in both plans.
3. [MINOR] 17x Part 3's hands-on at 6 min is half the repo's own
   precedent (day13: 10 min for copy+file+build; her slide adds a Canvas
   download), and her two observation conditions (press more/less often
   than every 4 s) are compressed to "pet with the blue button" —
   written from this line, Gate 2 would produce a single-condition
   instruction and the reveal lands on half its evidence.  Fix: 6 → 9
   min funded from Part 4's 18; name both conditions.
4. [MINOR] Two module facts of hers reach the instructor or nobody: her
   slide 17 speaker note's "CTS … pulled high by default and must be set
   to ground in order to enable data transfer out!" is instructor-only
   in the plan, and slide 12's "Built-in LED – useful for debugging the
   connection state" is nowhere.  Both are her words (Adafruit's);
   carrying them is not invention.  Fix: two clauses in the reading's
   module tour.
5. [MINOR] The AD2 Waveforms "Protocol" tab is new to the course
   (ch-uart's four "protocol" hits are all "serial protocol" prose) and
   has no Reference home; students use it unsupervised for the rest of
   the project.  Fix: add to the Reference hand-off list in her slide-15
   words (which DIO is Tx/Rx; one character at a time, no hardware flow
   control on the AD2).
6. [MINOR] Three 17x slides are in the coverage table but named in no
   sub-beat: slide 12 (PWR_CR1/SCB_SCR), slide 13's wake half, slide 20
   (watchdog.c).  A row in the table is not a home in the budget.  Fix:
   name them in Part 2's and Part 3's sub-beats.
7. [MINOR] Day 18's 70-minute beat fuses the graded Deliverable 6 demo
   and her peer walk-around, and Q7 asks only what to project.  Fix:
   extend Q7 — same 70 minutes or sequential?
8. [MINOR] Q3 and Q5 are answered silently in the plan (link-only guide;
   projected listing vs B-14) instead of flagged; Q3, Q5, Q11 absent
   from the map's flags.  Fix: add them; half-line in Part 2 on B-14
   pending Q5.

Also: her slide 18's image is an App Store listing, not a wiring photo —
**there is no wiring photo anywhere in her Day 17 deck**; Gate 2 must not
invent one.  Lab 9's due date (Tuesday March 10, 2:15 PM) is after
Thursday's demos — fold into Q8's calendar answer.

## expert-class-logistics

1. [BLOCKER] Day 18 demos: ~8 teams' Bluefruit modules all advertising
   at once in one room for 70 minutes, while the walking partner's phone
   must find one specific device — the exact failure her own slide 19
   warns about, at the moment grading depends on it, with no quieter
   room to retreat to.  Fix: stagger which tables are live, or have the
   stationed partner drive the connection; a decision for Petra (folded
   into Q7).
2. [MAJOR] Day 17's 4-minute settle+groupings is a reseating (students
   relocate laptop + kit to newly assigned tables), realistically 6–9
   min; Parts 1–4 have zero internal slack, so the overrun lands on work
   time or the close unplanned.  Fix: budget 7 and take the difference
   from the work block explicitly.
3. [MAJOR] If the 17x optional unit runs, 32 of 50 minutes are
   instruction; calling the hour a work session is not realistic, and
   Part 3's first-time hands-on at 6 min runs long.  The plan should say
   plainly that running the unit converts most of the hour.
4. [MINOR] Day 18's 5-min vote tally has no transition budgeted and the
   day's slack is 2 min; the wrap-up is the likely casualty — pre-flag
   it.
5. [OK] Day 17 does not depend on connecting to the Bluefruit in class;
   the staggered work block keeps Tuesday free of Day 18's congestion.

## expert-active-learning

1. [MINOR] passthrough.c is projected with a working `uart2_RxAvail()`
   while Deliverable 3 requires the non-blocking check for both USARTs —
   defensible as the model to mimic (the graded work stays theirs), but
   the map's protected-list line should record it as a deliberate,
   bounded exception.
2. [MAJOR] 17x's cut order strips the unit's own crucial step (the
   watchdog demo) at its last stage while pure lecture survives.  Fix:
   reorder — stretch first, then Part 2's mode-entry detail, compress
   Part 1 last; the demo + reveal protected through every stage.
3. [MAJOR] Day 18's stay/walk format leaves half of each pair never
   performing Deliverable 6's "explain the system"; a mid-block swap
   resequences the same 70 minutes.  The format is hers (Q7) — flag,
   don't default to no-swap.

## expert-cognitive-load

Census clean (nothing over two; the two twice-told ideas are the
sanctioned reading→class hand-off).  Kit-return day appears twice with
contradictory content — a Q8 accuracy item, not load.

1. [MAJOR] Day 17 Part 3 packs six novel elements into 16 min and gives
   the highest-stakes item (MOD pin / startup sequence) the last 3.
   Fix, no time added: promote the CMD-mode cut to baseline (AT commands
   are pointed at Lab 9 §4.3; 4 → 2) and give the MOD-pin beat 5.
2. [MAJOR] Part 2 lands three new things together and the genuinely new
   tool (Protocol tab — confirmed absent from the corpus) gets the
   smallest slice.  Lab 9 §4.1 only gestures at the tab; her slide 15
   carries the real instructions (which DIO is Tx/Rx).  Fix: the tab
   gets its own named sub-beat in her slide-15 words; the RxAvail design
   idea named in the driver beat.
3. [MAJOR] 17x Part 2 is six-plus new elements in 10 explain-mode
   minutes.  Fix per B-18's order: teach the four modes qualitatively
   off Table 19 and show one worked, corrected entry sequence (Stop);
   the full LPMS combinatorics live in the Reference.
4. [MINOR] The reading is a well-built mini-arc; GATT's four sub-terms
   are chunked by the message-board analogy.  Sound.
5. [MINOR] AT+GAPDEVNAME contains "GAP" and nothing connects it to the
   reading — a one-clause P-2 lifeline, cheap and germane.

## expert-continuity-auditor

1. [MAJOR] The AD2 "Protocol" tab has never been named or taught (the
   I2C chapters call the analogous instrument "logic-analyzer mode" /
   "the decoder"); Day 17 must introduce it by name and tie it to the
   Day 9x vocabulary, not assume it.
2. [MAJOR] Whether PWR_CR1 needs RCC_APBENR1's PWREN set first was
   unverified; the course has drilled clock-before-registers since Day 1
   and ch-uart calls a missed enable the classic "nothing works" bug.
   Must be resolved before the sleep snippets are written.
   **Resolved after review, against RM0490 §5.4 (RCC register map, page
   143): RCC_APBENR1 carries PWREN (bit 28).  The Stop-mode snippet
   gains `RCC->APBENR1 |= RCC_APBENR1_PWREN;` before the PWR_CR1
   write; plain Sleep mode touches no PWR register at all.**
3. Checks out: ch-uart teaches the USART2 driver at full register depth
   (jigsaw at :620–661, complete annotated driver at :1276–1374, the
   real rounding formula verbatim), and already plants a reading
   question telling students USART1 is on APB2 (RCC->APBENR2) at
   :1479–1502 — a real hand-off for Day 17 to cite.
4. Checks out: GPIO output, EXTI+PC13, TemplateProject copying, CoolTerm
   all taught earlier (citations in the report).
5. Checks out: 17x's dependencies (ISRs, PC13 active-low, printf, the
   IOPENR idiom) all taught; the non-blocking RXNE poll pattern is
   already taught in ch-uart's keyboard-counter exercise (:769–800).
6. [MINOR] P-13 watch: Day 17 Parts 1–3 track Lab 9 §4.1–4.5 nearly
   point for point; at Gate 2 confirm Part 2's driver discussion earns
   its explain-time rather than restating the lab.  No id collisions for
   sec-ble/sec-power outside their own files.

## learner-firstgen-novice

1. [BLOCKER] "Hardware flow control" and CTS/RTS never get a plain-words
   gloss anywhere a student sees; the day's crucial step depends on
   them.  Protecting Deliverable 1 requires withholding which pins, not
   what flow control is for.  Fix: one plain sentence in Part 1 (two
   extra wires that say wait / go ahead) before the RM/AF pointers.
2. [MAJOR] UUID (and "services") appear inside the GAP bullet a slide
   before GATT defines them; gloss UUID inline at first use in the
   reading.
3. [MAJOR] The Protocol tab used as a 4-minute test method with no
   scheduled definition (same cluster as continuity 1 / load 2).
4. [MAJOR] Three names for one switch position (Data / transparent /
   UART mode) with no bridge; her own slide-19 title supplies it ("aka
   'Data Mode' in Adafruit Speak") — carry that clause.
5. [MINOR] 17x's static-vs-dynamic beat is vocabulary before picture; if
   the unit runs, open on the figure or the plain one-liner (idle chip
   still leaks; every switch costs a little more).

## learner-anxious-nonhardware

1. [BLOCKER] The most likely cause of a silent driver (CTSE enabled, CTS
   unwired → transmit blocks; CTS pulled high on the module side) is
   named and then locked in the instructor block.  It is an RM
   §24.5.20 fact, not a protected answer; state it where flow control is
   taught.
2. [MAJOR] The passthrough test's diagnostic value ("proves the driver
   before the Bluefruit is ever wired") lives only in plan metadata;
   the taught beat carries mechanics only.  One sentence belongs in the
   taught material.
3. [MAJOR] "You are now ready to build your system!" is followed
   immediately by the full paper-design wall with no anchor that the
   deliverables are staged.  Lab 9's own sentence exists ("approach the
   Design as a series of small incremental steps.  The following
   deliverables should lead you to a functioning system fairly
   quickly," §4) — carry it at that junction; invent nothing.
4. [MINOR] "Evolve gradually" deserves its own sentence in Part 4's
   prose, not one bullet among many.
5. [OK] The peer votes are already right (her categories, none
   technical-correctness); keep the Deliverable 6 checklist visually
   distinct from the vote slide in the deck.
6. [OK] Re-entry is right: work time is never cut and the x-hour is
   project time regardless.

---

## Rulings

The Protocol-tab cluster (arc 5, load 2, continuity 1, firstgen 3) is
one finding in four vocabularies: the tab is new, gets a named sub-beat
in her slide-15 words, an introduction tied to Day 9x's "decoder"
vocabulary, and a Reference home.  The CTS cluster (arc 4, firstgen 1,
anxious 1) likewise: flow control glossed plainly in Part 1, the
pulled-high/blocked-transmit fact stated in student-facing text, the
diagnosis ladder staying instructor-side.  The Day 18 format cluster
(logistics 1, active 3, arc 7) is hers to decide: Q7 is extended rather
than the plan inventing a mitigation.  Logistics 2's reseating cost is
taken from the work block explicitly.  Load 1's Part 3 rebalance and
active 2's cut-order inversion are applied as written.  Load 3's Part 2
(17x) is applied: one worked entry (Stop), the rest to the Reference.
Anxious 3 carries the lab's own sentence — nothing invented.  Firstgen 5
and anxious 4 are Step 3 notes, recorded in the plans.  No finding was
discarded for a missing DISPLACES line: every accepted addition is a
clause inside an existing beat or a resequencing of the same minutes.

## Applied (all in plans/, same date)

1. day17.md: settle 4 → 7, work 60 → 57 (sums 110); Part 2's beats named
   (RxAvail design idea; passthrough as the proof before the Bluefruit
   is wired; the Protocol tab as new, slide-15 words, decoder tie-in);
   Part 3 rebalanced 4+3+2+5+2 (CMD → pointer at Lab 9 §4.3, MOD-pin
   beat 5 min); Part 4 carries the HiTA clause (Q11), the lab's
   incremental sentence at the "ready to build" junction, and "evolve
   gradually" flagged for its own sentence; the reading notes: UUID
   glossed inline, the "aka Data Mode" bridge, CTS-pulled-high and the
   built-in LED in the module tour; flow control glossed in plain words
   in Part 1; Reference list gains the Protocol tab; AT+GAPDEVNAME's GAP
   parenthetical noted; B-14/Q5 note on the projected listing.
2. day17x.md: Part 3's demo 6 → 9 (both press conditions named), Part 4
   18 → 15; Part 2 re-scoped (modes qualitatively off Table 19, one
   worked Stop entry naming PWR_CR1/SCB_SCR and the wake half, the LPMS
   table to the Reference; PWREN line added per continuity 2); the cut
   order reordered (stretch → Part 2 detail → compress Part 1; the demo
   and reveal protected throughout); the honesty sentence (running the
   unit converts most of the hour); Q1 funding line.
3. day18.md: Q7 extended (graded demos and the walk-around concurrent or
   sequential; the congestion mitigation — staggered live tables or
   stationed-partner-drives-connection; the partner swap); the
   vote-tally transition pre-flagged with the wrap-up named as the
   casualty; Q1 funding line (slides 22–25 merge into the where-to-go
   beat if she sends them here).
4. week9-map.md: flags gain Q3, Q5, Q11 and the Day 18 format cluster;
   the protected-list line records the uart2_RxAvail exception.
5. week9-ground-truth.md: PWREN resolution recorded in §2; question 12
   added (Day 18 format details) folded into Q7's wording instead.
