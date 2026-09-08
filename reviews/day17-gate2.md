# Gate 2 — Day 17 book (`source/ch-ble.ptx`), 2026-09-08

Thirteen invocations: the core of ten with `checker-technical-accuracy`
scoped three ways (reading+Part 1; Parts 2–5+Reference; a whole-chapter
self-contradiction read) plus one rotator (`expert-embedded-industry`).
Gate 1.5 (28 findings) was applied before the Parts were written; the
voice report below is the full-chapter pass.  Every reviewer was briefed
on the fixed shape (her slides + Lab 9's wording; B-19), the protected
list (Lab 9 Deliverables 1–7), and the 110-minute Tuesday.

Verdicts: arc-fidelity MINOR (coverage COMPLETE, no leaks);
tech-accuracy A BLOCKER (3 B/2 M/13 m); tech-accuracy B BLOCKER (2 B/6
M/6 m); self-contradiction BLOCKER (5 B/3 M/6 m); voice MAJOR (10 M/12
m); figure-claims BLOCKER (pin order + two legibility failures);
cognitive-load MAJOR (census: 3 duplicated tellings); continuity OK (1
m); logistics MAJOR (3 M/2 m); learner-visual MAJOR; firstgen MAJOR (5
M); anxious MAJOR (3 M/2 m); embedded-industry MAJOR (2 M/3 m).

---

## checker-arc-fidelity (MINOR; coverage COMPLETE)

All 22 of her teaching slides reach the chapter; Parts mirror the plan;
budgets consistent; protected list clean (every pin/AF token inside the
stripped instructor block).  Findings:

1. [MINOR] Her slide 10's GATT hierarchy taught only as running prose;
   her aligned generic-vs-Team-15 tree flattened into two consecutive
   paragraphs.  Fix: a small two-column table or indented tree between
   them.
2. [MINOR] The cork-board figure decided "use, small" in the manifest
   never appears and no drop is recorded.  Image is a text-free empty
   corkboard; drop it and record the drop.
3. [MINOR] Her slide 19 speaker note "sort devices by signal strength"
   is gone; one clause restores it.
4. [MINOR] Pinout caption pin order wrong (RTS is third from top, not
   seventh) — see figure-claims for the measured order.
5. [MINOR] ":611 …the commands you need for Lab 9 are in its §4.3" —
   "its" attaches §4.3 to the Adafruit documentation; §4.3 is Lab 9's.
6. [MINOR] Manifest's slide-12 photo decision (use slide08_img2)
   superseded by the better single-photo choice; amend the manifest row.
7. [MINOR] The RTS/CTS crossover taught in full three times (Part 1,
   Part 3, Reference); cut Part 1's crossover sentence, keep Part 3's
   (where the wires are made) and the Reference's.
8. [MINOR] Part 3's wiring is a six-item comma chain; the plan called
   for the lab's table.  Fix: a three-column tabular.

Plus: Part 1's title extended beyond the plan (update the plan); the
CMD beat delivers more than its 2 minutes (re-budget 4+3+3+5+1); slide
25 (kit return) assigned to Part 4 in the plan but deck-only in the
chapter — reconcile when Q8 is answered.  Layouts she already solved:
her slide 6's image-over-column pairing (adopt); her slide 10 tree
(adopt); keep the three figures used whole.

## checker-technical-accuracy A — reading + Part 1 (BLOCKER)

1. [BLOCKER] :199 "its advertising packet names its available services
   and characteristics" — advertising data carries services, never
   characteristics; the chapter's own GAP paragraph and rq feedback say
   so.  Inherited from her slide 11.  Fix: "…names its available
   services; the characteristics inside them are discovered once the
   central connects."
2. [BLOCKER] Pinout caption order vs the photo: silkscreen reads DFU,
   GND, RTS, VIN, RXI, TXO, CTS, MOD; caption has RTS seventh.  Off-by-
   one wiring risk.
3. [BLOCKER] :13 "the STM32C031C6's second USART" reads as USART2, the
   one the Bluefruit does NOT use; contradicts Part 1 and the rq
   feedback.  Fix: "USART1, the STM32C031C6's other USART".
4. [MAJOR] :184–195 the Team 15 example framed as "close to what your
   project will look like from the phone's side" — from the phone the
   project is the UART service's console, not a team-named service with
   temperature/motor-speed characteristics.  Keep the example as a
   hierarchy illustration; drop the framing; say the project's data
   rides inside the UART service's two characteristics.
5. [MAJOR] :454–459 "the Bluefruit device requires the use of USART1
   and… hardware-based flow control" states a course requirement as a
   device property (datasheet Table 9: USART2 also has flow control;
   Adafruit: tie CTS low to skip flow control).  It is Lab 9 §3's own
   sentence; attribute it.
6. [MINOR] central=client, peripheral=server is a simplification (GAP
   vs GATT roles); scope it: "in the usual arrangement, and in ours".
7. [MINOR] :46 "the three ways BLE devices connect" vs broadcast's "no
   connection at all"; use her title's "BLE communication modes".
8. [MINOR] :162–165 "the moment you connect… disappears from everyone
   else's list" over-claims list dynamics; use "stops advertising and
   drops out".
9. [MINOR] :222 "subscribes to the UART service" — properties belong to
   characteristics; "…the UART service's transmit characteristic".
10. [MINOR] fig-ble-central caption lists four devices; image shows six.
11. [MINOR] fig-ble-classic-vs-ble caption describes behavior two stills
    cannot show; describe the devices, leave behavior to prose.
12. [MINOR] :474–477 "silences… on either side" — module side certain
    (pulled high), STM32 side floats; keep the hedge.
13. [MINOR] :253 "a built-in LED" — the photo shows two, CONN and MODE.
14. [MINOR] :248 "UART mode and data mode interchangeably" — sources say
    UART is the switch label, Data Mode is Adafruit's name.
15. [MINOR] MOD-pin "or"/"same selection" phrasing implies two
    independent controls; the lab says the switch and pin share the
    node.  See tech-B 8; question for Petra.
16. [MINOR] Pinout at 80% renders pin names at ≈8 px; see
    figure-claims.
17. [MINOR] :71 "a few times a second" for heart rate unsourced; loosen.
18. [MINOR] :24 the introduction's list of the Reference omits the
    Protocol-tab subsection.

Verified correct: RM0490 §24.5.20 quotes faithful (incl. "no error
anywhere"); two USARTs; VCP facts; Tables 13–18 citation complete for
USART1; every instructor-block AF entry cell-checked; Bluefruit pin
facts per her slide 17 + speaker note; Adafruit URLs match Lab 9's link
annotations; topologies figure matches; all five rq sets' answers and
feedback accurate; protected list respected; build clean.
Unverified: the app's scan-list behavior; "stops advertising" as a
general BLE rule (scope to the Bluefruit); "interchangeably" (needs the
guide); MOD/switch contention (needs the schematic).

## checker-technical-accuracy B — Parts 2–5, instructor block, Reference (BLOCKER)

1. [BLOCKER] The passthrough claim "if characters cross it in both
   directions, your driver works, and any problem that appears later…
   not to your code" is refuted by the chapter's own CTS rule: with
   CTSE on and no AD2 flow-control wires, either the test fails with no
   bug (CTS floats high) or passes without exercising CTSE/RTSE at all.
   Fix: tie the chosen CTS pin to GND for the AD2 stage (or run the
   stage with CTSE off) and narrow the conclusion to "TX, RX and the
   availability check work; flow control is exercised by the module".
   Neither the lab nor her slide says how she handles this — ASK PETRA.
2. [BLOCKER] :13 the "second USART" opener (as tech-A 3).
3. [MAJOR] :565 "the same idea as the I2C decoder you used on Day 9x" —
   Day 9x's instrument is the passive logic-analyzer decode, the
   Protocol tab sends and receives, and the decode view is Day 9x's
   first-listed cut, so "you used" is not established.  Reword.
4. [MAJOR] The Reference names RTSE/CTSE in USART_CR3 while Part 1 and
   Lab 9 §3 assign that lookup to the student, and its "Nothing here is
   new" is false.  Petra's call whether naming the bits preempts the
   prelab — QUESTION.
5. [MAJOR] The Reference omits the write restriction: CTSE and RTSE can
   only be written while UE = 0 (RM0490 §24.8.4) — load-bearing, since
   the mimicked driver sets UE last and an appended CR3 write is
   silently ignored.  State it; it gives away no pin and no code.
6. [MAJOR] inst-day17-af-options offers PA14 for RTS without saying
   PA14 is SWCLK/BOOT0 — a team using it loses flashing/debug.
7. [MAJOR] The conflict list omits: PB6/PB7 are D1/D0 and the Nucleo's
   DEFAULT USART1 pins per UM2953 Table 11 (the most relevant fact for
   Deliverable 1); PB4 is D5, the course's external button; PA15 is D7,
   the Day 12 photointerrupter.
8. [MAJOR] :617 "The switch position is also controlled by the MOD pin"
   — a GPIO drives the node, not the switch; the lab sends students to
   the schematic ("one position connects to ground, the other is pulled
   up").  Reword and carry the lab's schematic pointer; where to leave
   the switch is unresolved — QUESTION.
9. [MINOR] "PA11 and PA12 are free on most builds" — they are A4/A5 on
   CN8 by default (SB8/SB9); name them so the analog clash is visible.
10. [MINOR] PC14/LSE: on the Nucleo SB3/SB4 default ON makes PC14 a
    GPIO; the stated conflict is wrong for this board (or drop PC14).
11. [MINOR] Datasheet spells the signal USART1_RTS_DE_CK; note it so
    teams can grep the table.
12. [MINOR] :500 "One design requirement is new" vs ":505 you made this
    kind of check once before" — "new to the driver".
13. [MINOR] :611 "its §4.3" → "Lab 9 §4.3" (as arc 5).
14. [MINOR] The budget comments sum to 103 of 110 — the unnamed 7 are
    the settle; name it in a comment.

Verified correct: passthrough.c and uart2_RxAvail byte-for-byte vs her
slide (tabs→spaces, return 1 flagged); wiring crossover vs Lab 9 §4.2;
AT commands + timing rules vs Lab 9; MOD high=CMD low=UART; every AF
entry re-rendered and checked; RM §24.5.20 quotes; keyboard-counter
back-reference correct; PB8/PB9 claim correct; protected list clean.
Unverified: 9600 as the shipped default (needs the guide); the
switch-position question (needs the schematic); "almost always" in the
instructor triage (frequency claim — soften); HiTA still running (Q11).

## checker-technical-accuracy C — whole-chapter self-contradiction read (BLOCKER)

1. [BLOCKER] :13 vs :456 — the "second USART" opener (as above).
2. [BLOCKER] Part 1's CTS rule vs Part 2's AD2 test configuration (as
   tech-B 1); the chapter prescribes the configuration it predicts
   cannot transmit, and never resolves it.
3. [BLOCKER] :199 advertising packet contents vs :151 and two rq
   feedback lines (as tech-A 1).
4. [BLOCKER] The message-board analogy ("public board", "central
   occasionally checks") contradicts stop-on-connect and notify, both
   of which the chapter grades as correct answers; a student who learns
   the analogy picks a distractor.  Scope the analogy to the rhythm
   (no constant conversation), not the mechanics.
5. [BLOCKER] The Team 15 example's framing vs the UART-service reality
   (as tech-A 4).
6. [MAJOR] Pinout caption order vs figure (as figure-claims).
7. [MAJOR] MOD pin as alternative selector (reading) vs override
   (Part 3), never reconciled (as tech-B 8).
8. [MAJOR] The passthrough "your driver works" claim vs the untestable
   flow-control half (as tech-B 1).
9. [MINOR] fig-ble-central four-vs-six enumeration.
10. [MINOR] :474 hedge + categorical in one sentence ("can stop" vs
    "silences", either side).
11. [MINOR] "ES28 students" vs the corpus's "ENGS 28".
12. [MINOR] :24 Reference described as three things; it has four.
13. [MINOR] "do not start coding until you have a plan" vs Part 5's
    work time and Parts 2–3's driver work; one clarifying clause.
14. [MINOR] Where uart2_RxAvail lives is never stated (the forward
    declaration implies not-in-uart.h); one clause.
Cross-checked consistent: CTS/RTS polarities everywhere; the crossover
(4 tellings, no variation); mode names; data directions; stop-on-
connect; AT commands; all xrefs.

## checker-voice (MAJOR)

Register mostly hers (Parts 2–5 carry her slides nearly verbatim); the
failures are the connective tissue: four count-armatures, four
epigrammatic tags, three reinventions of wording her slides already
have.  Findings (each with her rewrite in the full report):

1. [MAJOR] Part 1's title → her slide 13's "Using USART1 and Hardware
   Flow Control".
2. [MAJOR] :480 "Two documents answer the two questions this raises" →
   her slide 13's own sequence, no count.
3. [MAJOR] :472 "One consequence is worth knowing…" armature deleted;
   "silences" → "stops that side from transmitting" (L-17).
4. [MAJOR] :510 "which is what makes it worth running first" (S-23 tag)
   deleted; keep the fact.
5. [MAJOR] :605 "the big hammer" as whole predicate → "restores the
   module to a known state, the big hammer".
6. [MAJOR] :462 "wires the two sides use to say wait or go ahead" →
   "carry each side's ready-or-not state" (L-17).
7. [MAJOR] :669 "and that is the point of starting this way" → her
   slide 24's single sentence with "but".
8. [MAJOR] The Friday-10-pm deadline verbatim twice (Part 4 + close);
   keep it in the close, Part 4 says "Deliverable 2 of Lab 9".
9. [MAJOR] The in-class forward pointer told three times (chapter
   intro, reading intro, day intro); delete the reading intro's copy.
10. [MAJOR] :612 "its §4.3" → "Lab 9 §4.3".
11. [MINOR] :499 "One design requirement is new." → colon form.
12. [MINOR] :777 "Two timing rules… keep a startup routine reliable" →
    "In Lab 9 you are given two timing rules to follow…" (S-28, L-13);
    fix the spliced clause.
13. [MINOR] :598 "which is what command mode is for" → "which you do in
    command mode" (her slide 19).
14. [MINOR] :131 "the client wants to read" → her "reads, writes, or
    subscribes to".
15. [MINOR] VIN expansion in both caption and prose; keep the caption's,
    open the prose on CTS.
16. [MINOR] :455/:562/:579 impersonal actors → "In the reading we…",
    "we'll take the AD2 off USART1…" (S-13).
17. [MINOR] :583 crossover re-teaching in Part 3 → pointer + the
    figure number (Figure 263).
18. [MINOR] :735 "which is the figure in that section" → name Figure
    263 (S-12).
19. [MINOR] Objectives use GAP/GATT before expansion; expand inline.
20. [MINOR] Two of her slide-24 reasons dropped ("focus on the bigger
    picture…"; "(buttons, display, motors, and so on)"); restore.
21. [MINOR] "the two USARTs… the two UARTs" in one paragraph; pick one.
22. [MINOR] Part 2's title — optional; the noun form matches the passed
    sibling.
Sweeps: S-20 clean; no reassurance theater; acronyms complete except
the objectives; time budgets all in comments; no L-18.  Deliberately
hers, protect from later passes: the doubled "the use of", "you won't
know which USART…", "one character at a time", the switch line, the
"come and go" paragraph, the message board.  For Petra: "The reading"
as referent (specimen keeps it); her exclamation mark on "ready to
build your system!"; HiTA expansion; §4.3 confirmation.

## checker-figure-claims (BLOCKER)

- [BLOCKER] fig-bluefruit-pinout caption order vs the measured
  silkscreen: top to bottom the pads are DFU, GND, RTS, VIN, RXI, TXO,
  CTS, MOD (pad pitch measured; labels alternate sides; four triangles
  mark the signal pins).  The caption's order is Adafruit's functional
  grouping rewritten as physical.  Fix: functional grouping with no
  positional claim, or the true order; confirm against a physical board.
- [MAJOR] The loose unsoldered 8-pin header in the photo is the more
  visible "row of pins" at rendered size and is never mentioned; crop
  it out or name it.
- [MAJOR legibility] The pinout's silkscreen is ≈8.5 px at 80% of a
  600 px column — unreadable, in the chapter's read-the-pin-names
  figure.  Fix: ask for a higher-resolution original, or crop to the
  board and set width 100% (≈18 px, reads).
- [MAJOR legibility] fig-ble-topologies' baked-in labels are ≈5 px at
  90% — grey smears.  Crop the label band and let the caption name the
  panels, or split into three stacked images; ask Petra.  Same failure
  at deck size later.
- [MINOR] fig-ble-central: six peripherals vs four named; the "fan"
  icon reads as a flower; the canvas is 51% margin — crop to ink
  (roughly x 301–889, y 107–539) to double effective size.
- [MINOR] "The small switch in the middle" — it is between the radio
  can and the header; name the CMD/UART silkscreen labels instead.
- [MINOR] "a built-in LED" vs the photo's two (CONN, MODE).
- fig-ble-classic-vs-ble: no correspondence failure; passes legibility;
  right panel is a retail composite (box says Bluetooth 4.0/ANT+ —
  consistent, unreadable at size).
- Housekeeping: Day17x-Sleep_Modes/slide06_img1.png shares a basename
  with Day17-BLE's (different dirs — watch on re-mining); the output/
  tree was stale mid-review (rebuilt since).

## expert-cognitive-load (MAJOR)

Census: flow control told 2× in full (Part 1, Reference) + a Part 3
restatement; the AD2 Protocol tab 2× near-verbatim (Part 2, Reference);
VIN=3.3 V 4×; ATZ's clause 2×; mode names and Deliverable-1 pointers
sanctioned.  Reduce: Reference flow-control ¶1 to the bit names + module
facts; Reference Protocol-tab entry to the baud-match detail; VIN prose
copy cut; ATZ's Reference row to command-and-effect.
1. [MAJOR] Part 3 stacks six chunks in 16 min with no visual; split the
   MOD beat's landing (deck concern; prose order stands per B-19).
2. [MAJOR] The crossover never drawn while told 2.5×; one small crossing
   diagram at Part 1 would replace prose repetitions.  (Ruled at
   synthesis: the figure question goes to Petra — no invented figure.)
3. [MAJOR] Protocol tab duplication (as census).
4. [MAJOR] P-2 wants a skeleton/predict beat for the crucial step; the
   in-class section has zero activities vs the sibling's five.  (Ruled:
   B-19 — her deck has no activities; the crucial step is exercised by
   Lab 9's own procedure during work time.  Not applied.)
5. [MAJOR] The GATT reading subsection is seven new elements in one
   pass; split the abstract layer from the worked example, or move the
   analogy.  (Partially applied via the tree/table fix.)
6. [MAJOR] B-18: 17 body paragraphs vs the sibling's 10; the census
   cuts bring it to ~15; future additions need DISPLACES lines.

## expert-continuity-auditor (OK)

One MINOR: the Day 9x decoder analogy overstates equivalence (passive
decode vs send-and-receive) and "Protocol" was never a taught tab name;
reword.  Everything else checks out: ch-uart teaches the driver at full
register depth and already plants the APBENR2 hand-off; keyboard-counter
claim verified; PB8/PB9 verified; removed placeholder ids unreferenced;
main.ptx position right; Lab 9's needs all covered at pointer level.

## expert-class-logistics (MAJOR)

1. [MAJOR] Parts 2–3's second-person imperatives read as do-it-now in a
   briefing with zero slack; open the bring-up paragraphs with an
   explicit "In lab / during work time you will…" frame.
2. [MAJOR] No external/ links for the RM and datasheet anywhere in the
   chapter, against corpus practice; add them at first mention and in
   the Reference.
3. [MAJOR] The identical-name scan pile-up: the UART-mode test comes
   before naming; restore her signal-strength tip and note that naming
   can come first.
4. [MINOR] Part 2's paragraph has the same do-now ambiguity.
5. [MINOR] The plan's cut order exists only in the plan; echo it in an
   instructor note.  (Ruled: presenter notes are delivery 2; carried to
   the deck's section notes instead.)
Works: the close is genuinely disposable; the CTS failure mode is
student-facing.

## learner-visual (MAJOR)

1. [MAJOR] GATT hierarchy has no picture; the Team 15 example is the
   drawn-on-ready worked example (converges with arc 1 — the
   table/tree fix).
2. [MAJOR] The RTS/CTS crossover is spatial and never drawn; a two-box
   diagram would prevent the documented failure mode.  (To Petra as a
   figure question — no invented art under the week's rules.)
3. [MAJOR] GAP advertise-scan-connect has no figure; pending Q10; do
   not silently resolve to prose-only.
4. [MINOR] fig-ble-classic-vs-ble carries no teaching content beyond
   its caption; possible duty-cycle timeline — ask Petra.
5. [MINOR] Passthrough data path fine as prose for the book; revisit at
   deck time.
6. [MINOR] fig-ble-central four-vs-six (convergent).

## learner-firstgen-novice (MAJOR)

1. [MAJOR] :13 "second USART" plants the wrong assignment (convergent
   with the blockers).
2. [MAJOR] The pinout caption uses "flow-control input/output" the
   night before flow control is defined; add a six-word gloss.
3. [MAJOR] "The big hammer" never says what a factory reset does; pull
   the Reference clause forward.
4. [MAJOR] The driver brief folds four actions into one sentence; break
   into a short list.  (Applied as her slide's own sequence split into
   sentences — no invented checklist structure.)
5. [MAJOR] "This is a large, complicated project" lands between the
   staging sentence and the first concrete action; resequence.

## learner-anxious-nonhardware (MAJOR)

1. [MAJOR] The connects-but-no-characters failure has its diagnostic
   only in the stripped instructor block; add the one-sentence
   crossover check to the UART-mode paragraph.
2. [MAJOR] The MOD/switch interaction is unstated (convergent; Petra
   question + honest wording).
3. [MAJOR] The full-system "should… should… make sure" paragraph lands
   before the staging sentence; resequence so it reads as the
   destination.  (Applied: the staging sentence moves to Part 4's
   head; her slide 22 paragraph stays at the end of Part 3 — her
   order.)  → Ruled partially: her slide order is 22 then 23; keep her
   order, and let Part 4 open on the staging sentence, which is what
   the draft already does — the fix is deleting the second "large,
   complicated" restatement (firstgen 5).
4. [MINOR] "Big hammer" defusing (convergent with firstgen 3).
5. [MINOR] PC14's second job is instructor-only; per tech-B 10 PC14 is
   a GPIO on this board, so the landmine claim dissolves; the
   instructor row is corrected instead.
Works: CTS fact strongly stated; passthrough anchor; feedback lines.

## expert-embedded-industry (MAJOR)

1. [MAJOR] The flat 200 ms rule vs ATZ/FACTORYRESET stack-restart time;
   proposes "give these two a second".  (Ruled: the timing rules are
   Lab 9's own tested contract; the book does not invent numbers beyond
   the lab's.  Not applied; noted for Petra only if she wants it.)
2. [MAJOR] "Requires flow control" never explains why; one sentence of
   mechanism (the radio forwards in bursts; the module paces us via the
   wires), funded by the Reference duplication cut.  (Applied with
   wording verifiable against Adafruit's guide; kept minimal.)
3. [MINOR] The tie-CTS-low escape hatch as a diagnostic; converges with
   the AD2-test resolution — carried into the same fix, pending Q.
4. [MINOR] §24 vs §24.5.20 precision; cite the subsection both times.
5. [MINOR] The ad-hoc prototype for uart2_RxAvail; hers — kept, with
   one clause saying you supply its definition (self-contradiction 14).
Sound: the crossover explanation, the AF-table withholding, the
passthrough habit, the module-behind-a-serial-port framing.

---

The synthesizer's prioritized list and the applied record follow in
`day17-gate2-synthesis.md` (same directory).
