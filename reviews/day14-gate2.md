# Day 14 — Gate 2′ reports

Session: Week 7 session 4 (2026-08-31), at commit ecd2f3d.  Under review: the
Day 14 Before Class reading (`sec-accel-day14-before`), the Day 14 in-class
skeleton (`sec-accel-day14`, Parts 2–10, connecting prose deferred with OWES
markers), the chapter's Reference section (`sec-accel-reference`), and the deck
(`assets/decks/day14.json`, 49 slides), reviewed together.  Every reviewer was
briefed with the B-18 length budget (findings that add words name what they
displace), the skeleton/DELIVERY-2 marker convention, the Q3 constraint (no
student-facing sentence may assert what the program prints on a
wrong-device-address NACK), and Petra's two standing rules of 2026-08-31 (no
em dashes; whole sentences) for all new student-facing text.

Twelve reviewers: checker-arc-fidelity, checker-technical-accuracy ×2 (scoped
reading + Parts 2–5 + Reference registers/data-format/signed-shift / Parts
6–10 + Reference mems/offset/orientation/float), checker-voice,
checker-figure-claims, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-visual, learner-firstgen-novice,
learner-anxious-nonhardware, learner-in-the-room.  The synthesizer's list
follows the reports.

Verdict summary:

| Reviewer | Verdict |
| --- | --- |
| checker-arc-fidelity | PASS WITH CHANGES |
| checker-technical-accuracy (A: reading + Parts 2–5) | **BLOCKER** |
| checker-technical-accuracy (B: Parts 6–10 + Reference) | **BLOCKER** |
| checker-voice | PASS WITH CHANGES |
| checker-figure-claims | MAJOR |
| expert-cognitive-load | MAJOR |
| expert-continuity-auditor | MINOR |
| expert-class-logistics | MAJOR |
| learner-visual | MAJOR |
| learner-firstgen-novice | MAJOR |
| learner-anxious-nonhardware | MAJOR |
| learner-in-the-room | **BLOCKER** |

---

## checker-arc-fidelity — Verdict: PASS WITH CHANGES

**Provenance.** Her deck `assets/ClassSlidesOLD/Day14-Accelerometer(2).pptx` (21 slides) mined with speaker notes; images opened by eye: slide09_img1.png, slide17_img1/2.png, and the two rebuilt SVGs `tilt_single_axis.svg` / `tilt_two_axis.svg` (rendered; both declare width/height matching viewBox).  Ours: source/ch-accelerometers.ptx, assets/decks/day14.json (49 slides, 36 refs), plans/day14.md, ground truth §1.  check_rules / check_deck / check_starters all clean at ecd2f3d.

**Headline.** Her whole Day 14 spine is carried: agenda; the CTRL_REG1/4 discussion and both reveal bytes with the 3.9-rounds-to-4 clause; download/exclude staging with the two-main() rescue line; the four prototypes and the partial file's blanks; silent attempt → one-call reveal → Table 20 on the wire; accel_test.c read before it is run, split setup/loop, with the hex-beside-mg prints her elision hid; flip/rotate and the ≈1000 mg expectation; rename → mylib → rebuild; the CoolTerm modifications, View → View Chart from her screenshot, all five experiments, her plotter shot; single-axis arcsine with its failure mechanism; two-axis arctangent and atan2; the float hinge, the cast question and answer, round(), the no-FPU cost; Lab 7.  Deliberate drops confirmed: HiTA (Q4), slide 19's re-show as one recall line (Gate 1 R3), slide 5's register list merged into Day 13x, dividers as glue.  No in-class paragraph lacks a slide; no slide lacks an origin in her arc or a recorded Gate 1 addition.

**Findings.**

1. **[MAJOR] The two-axis tilt formula's precondition is in no artifact: the board has to be held upright, like a phone, so gravity lies in the x–y plane.**  Her slide 17 switches pictures (Figure 1 a flat slab; Figure 7 an upright cube with +Y along gravity at rest) and her speaker note states it outright ("Any rotation about the other axes reduces the magnitude of the acceleration on the x-axis and results in error").  Our Part 8 shows both pictures and never names the change of frame — and one screen earlier ins-day14-tilt-commit has the room predict a tilt FROM FLAT: z 1000 → 866, x 0 → 500.  A student who takes those numbers to θ = tan⁻¹(A_x/A_y) has A_y ≈ 0 and gets 90° for a 30° tilt.  The plan's own STRETCH line carries the missing clause; it never reached the book.  Not F7 re-litigated — atan2(ax, ay) stays; this is the sentence that makes it true.  **Fix**: one sentence in the two-axis paragraph after the ratio ("This assumes gravity lies in the x–y plane, which is how you hold the board for Lab 7: upright, like a phone, so at rest y reads about +1000 mg and z about zero"); one clause on ins-day14-tilt-commit marking its prediction as the flat frame; on the wall, the same words into sl-day14-tilt-two's second bullet IN PLACE OF "In Lab 7 you will use exactly this."  **Displacement**: none — one sentence swapped for another; re-measure slide 39's fit.

2. **[MAJOR] The whole STRETCH tier is missing — her slide 11's "Try all three resolutions (8-bit, 10-bit, 12-bit)" reaches the room nowhere.**  plans/day14.md commits four stretch tiers; tiers 3–4 (re-derive CTRL_REG1/4 for low-power and high-resolution, watch the noise floor; compute atan2 on paper from your own numbers) are in neither book nor deck.  Parts 5 and 7 are 30 minutes of worktime with a checkpoint for the slow half and nothing for the fast half.  **Fix**: two "If you finish early" tasks on act-day14-experiments — change LPen/HR to low-power and high-resolution, rebuild, watch the chart's step size; then, holding the board upright, compute θ = atan2(ax, ay) on paper from your own two numbers — plus her "anything else?".  **Displacement**: none on the clock (rides Part 7's existing 5-minute experiment beat, on the existing activity slide); re-measure slide 33's fit.

3. **[MINOR] Her slide 17's third takeaway — "Using all three axes, can fully orient in space.  See app note for details." — is Reference-only.**  **Fix**: one clause at the end of the two-axis paragraph with an xref to subsec-accel-ref-orientation, and name it in sl-day14-tilt-two's note.  No wall line.

4. **[MINOR] Her slide 20's precision-versus-range resolution is Reference-only.**  She printed "int32_t has more precision than a float, but float has more dynamic range.  Note that the accelerometer, in highest precision mode, is only 12 bits."  sl-day14-cost keeps "trades exactness for range" and drops the reassurance.  **Fix**: extend deck 46's first bullet by one clause ("and our readings carry at most 12 bits, so a float's 24 lose nothing") or put it in the note if fit is tight.

**Layouts she already solved** (recorded): her slide 6's four-tables-with-answer layout — deliberately not reused (four tiny tables on one wall are unreadable; deck 10's note pages back instead); her slide 17's figure-with-equations-beside layout — adopted exactly in the two SVGs; her slide 9's reveal-with-Table-20 — split per the plan's beats, kept.

---

## checker-technical-accuracy (A: reading, Parts 2–5, Reference registers/data-format/signed-shift) — Verdict: BLOCKER

Ground truth: lsm303agr.pdf (pypdf, Rev 10), the four figure PNGs rendered and read, all five starter files diffed against listings, day14.json, ch-intro-blinky/ch-timers-interrupts/ch-gpio-interrupts, plans/week5.md, plans/week7.md.  check_rules 0/0, check_starters 0, check_deck 0, all image paths resolve, every coded activity in scope has an instructor reveal.

**BLOCKER 1 — the stated stationary-reading rule produces the wrong sign for the chapter's own worked case** (`:2233-2242`, and the two reading-question feedbacks).  "Each axis reports the component of gravitational acceleration that points along that axis… flat, component side up, +1000 mg on z."  Gravitational acceleration points DOWN; its component along an up-pointing z is −1000 mg.  The rule, applied to the example two lines below it, gives the opposite of the sensor's answer (datasheet §3.2 p. 20 states the +1 g result).  This is the chapter's only statement of WHY z reads +1000, and one feedback says "The sign is worth getting right."  **Fix** (no proper-acceleration hook, per Q8): make the projection a magnitude statement and the sign a stated convention — "each axis measures how much of gravity's 1 g lies along it, and the sensor's convention is that an axis pointing up reads positive: flat on the table, component side up, z is approximately +1000 mg and x and y are approximately 0."  Same change in both feedbacks.  **Displacement**: drop "That is worth knowing before we configure the sensor…" (restates the introduction).

**BLOCKER 2 — the signed-shift worked example uses a raw value the configured sensor cannot produce, and asserts a value CoolTerm cannot print** (`:3650-3654`).  Normal mode has 10 valid bits at the top, zeros below: every raw reading is a multiple of 64.  The example's −16 (0xFFF0) is impossible, and accel_test.c's products are multiples of 256000, so −1 mg is never printed.  **Fix**: use −64 (0xFFC0), one step in normal mode: product −256000 = −3.90625 × 2¹⁶; the shift floors to −4, so CoolTerm prints −4 mg; a hand check with / or a calculator truncates to −3 mg.  (Also the better example: −3.90625 is the chapter's own step size.)

**MAJOR 3 — the hand-check task converts a hex value that is not printed in the form the formula takes** (`task-day14-run-raw`).  printf's %x widens the int16_t: a negative raw reading prints as EIGHT digits, sign-extended (raw −16384 prints ffffc000, not c000) — and the previous task just had students flip the board.  **Fix**: fold one clause into the walk paragraph — "because printf's %x widens the 16-bit reading to 32 bits, a negative raw reading prints as eight digits, ffffc000, and the reading is the bottom four" — replacing "yesterday's left-justified reading and what it means, side by side on every line of output" (restates the sentence's first half).  Add an instructor block after act-day14-run working one printed line end to end (instructor-only; no class minutes).

**MAJOR 4 — "the same pattern the room captured on Tuesday" is not what the room captured** (`:2793-2795`, sl-day14-write-transfer lead).  Tuesday's write transaction was Table 22's first phase — no data byte.  Table 20 has one byte more.  **Fix** (in place): "…It is Tuesday's first transaction with one byte more: the same START, the same h19 WR, the same SUB — and then the data byte, where Tuesday's trace went straight to the STOP."  Same correction on the slide's lead line.

**MAJOR 5 — the readbacks do not prove what the caption says** (sl-day14-accel-test-setup caption).  CTRL_REG4_A's default is 00000000 and the committed value is 0x00: that readback cannot distinguish a successful write from no write.  Only CTRL_REG1_A is diagnostic (default 07, committed 77).  **Fix**: "The init check says which way it went, and Control Register 1 is the one that proves your write landed: its power-on default is 07, so 77 can only have come from your code."

**MAJOR 6 — SPI_ENABLE does not select the serial interface** (`:2320-2324`).  Table 42: "3-wire SPI interface enable"; the I2C/SPI choice is the CS pin (§6, Table 18).  The subsection's own figure refutes the gloss.  **Fix**: "…and SPI_ENABLE, which picks the 3-wire form of the SPI interface we are not using (the chip is on I2C because the breakout ties CS high, not because of this bit)."

**MAJOR 7 — the ladder's third rung blames code the student did not write** (`:3008-3011`, slide).  The scaling line ships identical on every board; with rungs 1–2 passed, the remaining cause of wrong magnitudes is a committed value that is wrong but consistent (e.g. FS=11 → everything 8× small while the readback still matches).  **Fix**: "If everything prints and both readbacks match, but the values are nowhere near 1000 mg at rest, the readings are arriving and the numbers you committed are the suspect: the scaling in accel_test.c assumes ±2 g, so a different FS[1:0] scales every axis by the ratio of the ranges."

**MAJOR 8 — assets/starters/lsm303agr_partial.c:19 still cites "Table 13"** (a magnetometer ODR table in the hosted PDF; the single-byte read is Table 22), so it diverges from the book listing and from whoami_test.c's corrected comment; and the book's provenance comment at `:2718-2721` claims the copy "matches verbatim," which is false.  **Fix**: her file needs her approval (same one-word class as the two she approved 2026-08-30) — flag it; meanwhile correct the provenance comment to state the divergence.

**MINORS**: 9 — "four datasheet tables" is six tables in four figures (`:2557`); say "the four table images".  10 — L-17 "reports" ×4 in the stationary subsection and feedbacks (fold into Blocker 1's rewrite: measures/reads/is); `:3000` "the printout tells you" → "the printout narrows it to one layer".  11 — "check both configurations" vs the figure's own caption "click Select All" (see figure-claims: the pixels show Select All greyed; resolve jointly).  12 — a skipped exclusion also duplicates lsm303_AccelRegisterRead; add "— or of lsm303_AccelRegisterRead, which both files define —" to the rescue line.  13 — soften "If something is wrong, the printout tells you which layer to look at" to "When the program runs and the output is wrong, the printout narrows it to one layer" (keeps Q3 open; the ladder itself is Q3-safe — every sentence is conditioned on the message appearing).  14 — Reference header listing: "in full"/"each register's default" overstates (attribution line dropped; seven Table-26 registers absent; 9 of 31 carry comments) — say "the part of that table this driver uses" and "the control and status registers' defaults"; restore or note the Adafruit attribution line.  15 — "each ODR[3:0] pattern selects one rate" contradicts the chapter's own feedback (0000 = power-down): "each nonzero pattern".  16 — ">> is an arithmetic shift" stated as a rule of C; it is implementation-defined — "our compiler's >> is an arithmetic shift; the C standard leaves the choice to the implementation, and arm-none-eabi-gcc, like every compiler you are likely to meet, shifts the sign bit back in."

**Verified correct** (recorded): the ±131 million promotion bound and ±2000 result; all three step sizes, shifts, the collapse, and 0xC000 both routes; 0x77/0x00 field derivations; checkpoint minute 58 and every beat sum; SAD 0011001b → 0x19; WHO_AM_I 0x33; zero-g ±40/±80; Tables 20/22.  **Unverified**: that the unused low bits of the left-justified output read as zero — the datasheet says "left-justified" but never states the padding value; the collapsed formula survives either way, but Blocker 2's replacement example and the "zeros below" phrasing lean on it (a live capture would settle it).

---

## checker-technical-accuracy (B: Parts 6–10, Reference mems/offset/orientation/float) — Verdict: BLOCKER

Sources: an-1057.pdf (all 8 pp.), lsm303agr.pdf §2.1/§1.2, Lab7_ES28.pdf (all 5 pp.), Lab4_ES28.pdf §3.1.1 + Appendix A, the starters, her deck mined, both CoolTerm PNGs read, both tilt SVGs rendered, ch-uart / ch-i2c, stm32c031_datasheet.pdf p. 1.  All four mechanical checks clean.

**BLOCKER 1 — the 30° reveal's sign phrasing misclassifies its own case** (ins-day14-tilt-commit).  "The axis the board tilted toward rises from 0 to 1000 sin 30° = 500 mg": on the natural reading (the direction the board dips), that axis points BELOW the horizon and reads −500 mg (AN-1057 p. 7: a positive angle means the positive axis is above the horizon; the chapter's own convention at Part 5: up = positive).  Lab 7 warns about exactly this ("especially minus signs!").  **Fix** in place: "…the in-plane axis whose positive direction now points up the slope reads +1000 sin 30° = 500 mg, and if you tip the board the other way, so that the positive axis points down the slope, that same axis reads −500 mg.  A positive reading means that positive axis is above the horizon (AN-1057, p. 7).  The third axis stays near zero."  Also say WHICH board (the breakout, not the Nucleo).  No displacement (a one-minute reveal absorbs +35 words).

**BLOCKER 2 — "recall a bug we met on Day 5" contradicts ch-uart** (`:3311-3314`, task-day14-cast, deck note).  The xref'd BRR passage says the opposite twice: uart.c ROUNDS rather than truncates, and at 12 MHz / 9600 baud the division is exact — no bug was met, nothing bit.  A student who follows the xref finds a contradiction.  **Fix** (no growth): state ch-uart honestly — "on Day 5 the baud-rate divisor came out exact and uart.c rounds rather than truncates (xref); here the same integer division does throw the fraction away" — or anchor to Lab 4's integer conversion study instead.  The task statement and the deck note follow.

**MAJOR 3 — round() does not produce an int** (`:3390-3393`, sl-day14-round).  round() is double round(double); printf("%d", round(x)) is undefined behavior, and Lab 7 D3 (8 points) is the graded path.  **Fix** (+6 words): "…round() goes to the nearest integer value, which you then cast for printing: (int)round(angle)."

**MAJOR 4 — "a sine or an arctangent does not come out of integer arithmetic" contradicts Lab 7's own §3.2** ("good polynomial approximations may be employed if program memory is limited").  **Fix** (three words): "does not come out of the integer arithmetic we have been writing".

**MINORS**: 5 — ACCEL_RAW vs ACCEL_raw drift inside one Part (her slides differ; unify on ACCEL_raw at `:3333/:3335`).  6 — "Evaluation runs left to right" is the wrong rule (order of evaluation is unspecified; it is associativity/grouping) — "* and / group left to right, so the multiply happens first, on a float."  7 — plotter caption "near the right edge" is wrong (burst at 62–72% across; flat tail after) — re-caption.  8 — "open the View menu" sends students to the macOS menu bar; the authority shows the toolbar View button — "click View in the toolbar."  9 — "Two small changes" vs three imperatives, grouped differently on the slide — group identically.  10 — "C1 grows exactly as C2 shrinks" is first-order only — drop "exactly" or "in step."  11 — offset "constant for a given board" vs Table 3's ±0.5 mg/°C tempco — "stable for a given board at a given temperature."  12 — int32_t "±2³¹" → "−2³¹ to 2³¹−1."  13 — format-recap caption "is an integer divide" vs the Reference's floor-vs-truncate — add the floor qualifier.  14 — sin/cos/atan2/round are double-precision; note the f-suffixed variants on the cost slide (relevant to D4's size measurement).  15 — act-day14-experiments is predict-then-observe with no reveal, and the deck note asserts an answer the book never gives; add a three-sentence ins-day14-experiments (flip → z sign inverts; raise/lower → excursions above and below 1000 mg; bang → one wide spike on all three, railing at ±2000, decaying in a few samples), absorbing sl-day14-plotter's minute.  16 — "the signs of the two readings say" borderline L-17 → "identify".

**Verified correct** (recorded): atan2(ax, ay) argument order against Lab 7's Θ = arctan(Ax/Ay); range −π..π; the ay = 0 claim; AN-1057 Eq. 1/3, 6/7, 11/12/13 character for character including Eq. 13's inverted operand; Eq. 17; both tilt figures' formulas and captions; zero-g Table 3 values and the +32 mg worked example; "tens of degrees near 90°" survives arithmetic; 866/500; 1+8+23; ~7 digits; 10^±38; no FPU (datasheet p. 1 + Lab 4 §3.1.1); Part 6 against her slide 11 verbatim (and lsm303agr.h already went to mylib on Day 13 — no header move needed); Part 7 against her slides 13–14 and both screenshots; Part 10 against Lab 7 in full; %f wording ("not enabled" is the accurate form; ch-uart's "not supported" is the one that should change, out of scope); Q3 respected everywhere in scope; L-13 clean ×5.  **Unverified**: the deck note's "the shock test is the one nobody guesses right" (not in her deck; needs Petra); "students will try %f in Lab 7 anyway" (plausible, unsourced).

---

## checker-voice — Verdict: PASS WITH CHANGES

**Register.** Mostly hers: the day's opening is the sibling pattern, no bold banner leads across all 20 new slide blocks, no weekday teaches, the tilt geometry / ladder / Reference read like her.  Two places do not: Part 2 opens on the projector and on the unprepared student (the S-25 shape she deleted whole on Day 10), and Part 5 carries a count-armature ("Three things to notice") over what is actually four things — the S-28 case where she deletes the frame rather than repairing the number.  Plus three fragments in slide bodies against the 2026-08-31 whole-sentences rule, and one classroom-management instruction ("in silence") that exists nowhere else in the corpus.

**MAJOR rewrites** (each with her specimen behind it):
1. `:2556-2566` Part 2 opening [S-22, S-25]: open on the goal, not the screen — "Today's driver needs one byte in CTRL_REG1_A and one in CTRL_REG4_A, and we'll settle both now.  We'll look once more at the four datasheet tables from the reading: … We want readings at 400 Hz, in normal mode, on all three axes, over the ±2 g range, and everything needed to build the two bytes is in those four tables."  The unprepared-reader clause is already in the presenter note, where S-25 puts it.
2. `:2957-2973` [S-28]: delete the "Three things to notice.  First… Second… Third…" frame; plain declaratives ("The program checks… It also reads both control registers back… The scaling line is…").
3. `:2737-2741`, `:2756`, deck title [S-25, S-17]: cut "and in silence" / retitle "Silent attempt: write RegisterWrite" → keep "on your own first"; title "Write the register-write function".
4. `:3005-3007`, `:3061` [S-12]: "compare against the reveal" points at stripped content in the student book — name the check: "check that your lsm303_AccelRegisterWrite() makes a single i2c1_memWrite() call, with the device address, the register address, a count of 1, and a pointer to the data byte."
5. `:3416-3427` Part 10 [failure 2, S-23]: plain declaratives, one clause per sentence; "a design problem that is deliberately yours" → "how you show the orientation is your own design decision" (prose and slide).
6. `:2646-2651` vs sl-day14-verify [failure 7]: the activity task repeats the slide's two sentences verbatim — trim the task to "Run Tuesday's whoami_test.c, unchanged, and confirm it still prints Accelerometer initialized!"
7. Fragments [2026-08-31 rule]: `:3016` "The setup half:" → "Here is the setup half."; `:3040` "The loop half: read, scale, print." → "The loop half reads the sensor, scales the readings, and prints them."; `:2777` "…the write transfers:" (also garden-paths) → "The datasheet draws it in its own tables (§6.1.1)."; `:2847` "The two lines, filled in:" → "Here are the two lines, filled in."; `:3603` "For the ±2 g range (4 g of span):" → "At the ±2 g range (4 g of span) the three modes are as follows."
8. `:2795` [S-12]: "the room captured" in a projected instructor block → "we captured".
9. Deck titles [S-18]: "The Settings, Committed and Revealed" → "The Two Control-Register Settings" (section); "The settings, revealed" → "The two settings"; "RegisterWrite, revealed" → her own "Write to a register"; "AccelInit, filled in" → "AccelInit with your two values in"; "The cast, placed" → "Where the cast goes"; "Verify, download, exclude" → the activity's own title.

**MINOR rewrites**: `:3313` "That is exactly what is about to bite." → "The conversion we are about to write has the same problem."; `:3011/:3063` "the instrument of last resort" [S-11] → "If none of those three finds it, put the logic analyzer back on the bus as you did on Tuesday and watch the transaction itself."; `:2669` "makes today debuggable" [S-20] → "We verify the hardware first, so…" (and `:3003` "the fix is Tuesday's" → "the fix is the one from Tuesday"); `:2571` "in a few minutes" [S-15] → "later today"; `:2580` "in Table 14" → "in Table 14 of the LSM303AGR datasheet" (and `:2589` likewise); `:3080` Part 6's only prose gains the class's voice ("Your driver works… We'll promote it to your mylib folder exactly as we did with the display driver on Day 10."); `:2539` and the "exactly" tic (10 instances, 4 load-bearing — trim the rest); `:2896` "a probe you will want later" [S-26] → "every line it prints tells you something you will need when you are looking for a fault."; `:3587` FIFO unexpanded → "(FIFO, meaning first-in-first-out buffering, plus interrupts and click detection)"; `:3454` Reference opener fragment → "This section is lookup material for the accelerometer chapter." (see For Petra); `:3636` Reference shift title — optional symptom-first retitle.

**Sweeps** (counts in the full report): unit openings 27 checked, 3 failing (listed above); slide titles 45, 7 lesson-mechanics; weekday-as-actor 0 outright, 2 borderline; count-armature 1; em dashes in new student-facing text 0 (clean); fragments 5; acronyms complete except FIFO; Part-number leakage none; minute counts in student text 1 (`:2572`).

**Reuse instead of invent**: her slide 11's test list — add her gravity anchor ("1000 mg is one g… a perfect flat reading is +1000 mg on z") to task-day14-run-tests and the resolutions test as the finish-early item; her slide 20's counterweight — "Floating point arithmetic is more work for the processor, and it is what makes sin(), cos() and atan2() available to us at all" as sl-day14-cost's first bullet [also S-19]; her "For small tilt, sin θ ≈ θ" — one clause on the single-axis beat; her section dividers "Accelerometer: Measuring gravity / Displaying motion / Measuring tilt" for our "Run it / Plot it / Tilt" kickers; her titles "Complete the device driver", "Write to a register", "Plot accelerations with CoolTerm".  Correctly reused already: her one-line RegisterWrite with the Table 20 comment; her float line with the 65536 comment; the plot modification steps; the experiment list; the staging instruction; the agenda; the Reference introduction (her Day 10 rewrite adapted).

**For Petra**: (1) the Reference opener is her Day 10 fragment — confirm the 2026-08-31 whole-sentences rule overrides her own passed sentence, or Reference openers keep the terse form (ch-i2c would then stay as is); (2) FPU is expanded twice, three paragraphs apart — the which-explanations-get-expanded question the specimens do not settle; (3) the ladder's "Tuesday's diagram" points at a figure the slide does not carry — add ref="fig-accel-bb" or name the four leads; both cost deck space, her call.

---

## checker-figure-claims — Verdict: MAJOR

Every image rasterized and looked at (table of contents in the transcript).  All eight raw pulls are byte-identical to her mined slide images (md5), and both SVG composites embed her unmodified AN-1057 panels at native size — nothing re-cropped.  Datasheet page numbers verified (47/49/27).  AN-1057 Eq. 6/7 reproduced exactly.  P-15 clean: no table figure carries her "Setting:" callouts; the 400 Hz row is unmarked; the tilt figures land after the commit in deck order.

**Correspondence failures.**
1. [MAJOR] fig-accel-plotter caption: "the bursts near the right edge are shaking" — the burst spans 62–72% across, and the right quarter is flat, settled traces; a student sent to the right edge sees the steady state.  Fix: "the burst about two-thirds of the way across is shaking, and the flat traces after it are the board back at rest."
2. [MINOR] same figure: "live acceleration" — the status bar reads Disconnected in red; captured data.  Drop "live".
3. [MAJOR, shared figure, Day 1x] fig-exclude-from-build: the Day 1x caption and slide say "click Select All" but the pixels show Select All GREYED OUT with Debug and Release already checked.  Day 14's own text ("both configurations") is correct; the two days now instruct differently over one picture.  Fix Day 1x's caption to match the pixels ("confirm both Debug and Release are checked, then click OK") or ask Petra for a pre-check screenshot.
4. [MINOR] fig-accel-modes caption/slide title "the three operating modes" over a four-row table (the fourth is Not allowed).  Fix: "three modes and one disallowed combination"; "each mode row".
5. [MINOR] "open the View menu" (prose + slide caption + slide title) vs the toolbar-button popup the crop shows; the book figure caption ("from the toolbar") is right.  Fix: "the View button on the toolbar"; do not re-crop.

**Notation.**
6. [MAJOR] fig-tilt-two labels X/Y with +Y the 1 g axis, while the 30° reveal one slide earlier used z as the vertical — a student holding both is stuck on which two readings to feed atan2.  Change the TEXT, not the AN-1057 figure: one clause naming the frame change (converges with arc-fidelity's finding 1).
7. [MINOR] plotter legend "Trace 1/2/3" carries no axis names; put the mapping in the slide caption ("Trace 1 is x, Trace 2 y, Trace 3 z…").
8. [MINOR, no action] 0x20 vs (20h) — standard convention; recorded so nobody "fixes" it.

**Legibility** (measured at 1600×900).
9. [MAJOR] sl-day14-exclude: the Eclipse context menu renders at 0.6–0.8% of slide height — unreadable; the portrait two-panel PNG is height-limited at 353 px wide.  Fix is a bigger figure, which means splitting the two panels — ask Petra for the original screenshots (P-12) — and Day 14 arguably needs only the dialog panel, since its bullets carry the menu path in words.  Changes a Chapter 1 figure; re-read both days after.
10. sl-day14-look-reg1/-reg4 description rows at 1.6–1.8%: readable, marginal (near-square sources are height-limited).  Optional split into two slides each if wanted comfortable; not a defect.
11. The rates and modes tables: excellent.  chartview 2.7%: fine.  write-transfer 2.1%: legible, could be 25% larger for free.  Tilt formulas ~4.4%: the best type in the deck; panel labels ~2%.
12. [MINOR] both tilt SVGs declare no font-family, and tilt_single's red line ends 12.7 units (1.3%) from the edge — a wider substituted face clips it.  Fix: font-family="Helvetica Neue, Helvetica, Arial, sans-serif" on the text group of both; widen tilt_single's viewBox/width 1000 → 1030 to match its sibling; re-render.

**Fit-adjacent** (the fit check owns the verdict): sl-day14-tilt-two is the tightest slide in the deck (~65 px headroom — one more bullet line crops the AN-1057 caption); tilt-single ~105 px; exclude renders whole; write-transfer low risk.

**Housekeeping**: the PARKED comment at `:2505-2519` still instructs a future pass to rebuild the tilt figure and keep the plotter image — both jobs are done; mark DONE with filenames or delete, before someone rebuilds correct figures.

---

## expert-cognitive-load — Verdict: MAJOR

Reading OK (clean single job, B-2 compliant).  In-class MAJOR (findings 1–2).  Reference MINOR (absorbs the right depth; one gap).  Deck MAJOR (shares 1–2).  Paragraph count: ~19 substantive body paragraphs against Day 11's passed 25 and Day 12's rejected 42 — headroom for the deferred connecting prose.  All DELIVERY-2 markers name their owed ids.

**Repetition census**: one entry over the bar — the write's on-wire pattern (Table 20, "captured on Tuesday") told twice in ~2 minutes, in full, by ins-day14-registerwrite and sl-day14-write-transfer.  Keep the figure's telling; trim the instructor block to the code mechanics (why &data, why count 1).  Nothing else crosses; the reading→class resurfacing is the deliberate B-2 exception.

1. [MAJOR] Part 5's "three things to notice" is four things, and the fourth (the promoted-arithmetic product) is deferred by the slide note to a Reference subsection that does not cover it (ref-signed-shift covers floor-vs-truncate only).  Fix: cut the "wider integer type" clause from the class paragraph and the note; land it in subsec-accel-ref-signed-shift.  Pure move.
2. [MAJOR] the Table 20 double-tell (census above).
3. [MINOR] the sixty-second look is permission, not instruction — works only because the reveal repairs the commit before Part 4 codes it; keep the framing honest, no change.
4. [MINOR] the ax/ay-are-your-screen-numbers clause exists only as a spoken aside — put it in the two-axis paragraph ("ax and ay here are the milli-g x and y readings already on your screen; the scale factor cancels in the ratio"), funded by finding 2's trim.
5. [MINOR] Part 4's four-functions-three-states compound sentence: bulletize to match sl-day14-partial's four clean bullets.

**Not to be touched**: Part 4's one-function-at-a-time fade (P-9 exactly); the minute-58 checkpoint; Part 8's concrete-before-general commit.

---

## expert-continuity-auditor — Verdict: MINOR

1. [MINOR] sl-day14-round's presenter note attributes the enabling-flag detail to ch-uart; the flag is taught in ch-debugging (Day 7x).  Presenter-facing only, but it mis-teaches the presenter.  Fix the attribution.
2. [MINOR] ODR here (output data rate) is the exact acronym drilled for 80 occurrences as the GPIO Output Data Register.  The datasheet's name stands; add a one-clause disambiguation at first use in the reading ("a different ODR than the GPIO output data register you met on Day 9").

Checked clean (recorded): all xref targets resolve and teach what is claimed (subsec-uart-brr, subsec-uart-printf-usage, fig-exclude-from-build, fig-accel-bb, the four refPage'd reading figures); BSRR deferral honored; float/atan2/round/signed-shift all genuinely first-taught where claimed; recalls framed as recalls; Lab 7 D1–D4 delivered, D5 deliberately untaught; terminology stable (controller/target, DIO0/DIO1, View Chart, sub-address/register address welded pair, no third term); day is a Thursday at 110 and the deck sums to it.

---

## expert-class-logistics — Verdict: MAJOR

**The clock** (recomputed by hand): every Part row equals the sum of its own beats; plan and deck agree; checkpoint at minute 58 confirmed.  Realistic landing: Parts 3–5's completion spread puts the room at ~1:02–1:05 by the checkpoint; the buffer is consumed every session, not just overrun sessions — survivable, and exactly what the cut order sacrifices first.

1. [MAJOR, Q3 precedent] The ladder re-asserts the causal claim Day 13's Gate 2 (item 23) ruled out: "If Could not connect to accelerometer appears, the WHO_AM_I check failed: that is hardware."  The print is not a verified hardware verdict.  Fix (same length): book — "the WHO_AM_I check did not read back 0x33 — the same first move as Tuesday's: re-seat the wiring against fig-accel-bb and try again."  Slide — "The WHO_AM_I readback did not match.  Re-seat the wiring against Tuesday's diagram and try again."
2. [MAJOR] No stated resolution for the student whose hardware triage fails (bad breakout, snapped wire): Q10 rules out spares, and nothing names the fallback.  Fix: one presenter-note line — pair with a working neighbor's stream to verify the driver logic; the Lab 7 pre-lab dependency is handled separately.
3. [MAJOR] Part 7's 3-minute chart-view beat is a first-time software-tool cost for 30 laptops (rebuild, reflash, reconnect, find a menu) and will consume 5–6 minutes, silently eating the experiments and the stretch built on them.  Fix: rebalance 3+5+3+1, pulling 2 minutes from Part 6 (a repeat-of-Day-10 procedure likelier to run under its 6 than a new UI under its 3).
4. [MINOR] Part 3's 3-minute staging worktime is tight; Part 4's 2-minute lecture opener is the de facto slack — name the adjacency in the Part 4 section note so nobody compresses the opener.
5. [MINOR, S-8] Settling (3) and announcements (2) carry no ≈ figure the reconciler can see; the checkpoint arithmetic depends on them.  Add "≈ 2 min" to the agenda glue note naming the 3+2 convention (Day 13's deck does this on its first slide).
6. [MINOR] Part 6 is in neither the cut order nor the never-cut list, yet Lab 7 presumes the driver is in mylib.  Name it: never-cut, with the reason.

---

## learner-visual — Verdict: MAJOR

1. [MAJOR, P-4] The settings reveal is prose-only at the day's payoff moment: the register-as-boxes grid (the book's own P-4 exhibit) is never filled in.  Fix: one small SVG in the reading's box style with both bytes filled (0 1 1 1 0 1 1 1 = 0x77; 0 0 0 0 0 0 0 0 = 0x00), dropped onto the existing ins-day14-settings slide.  Displaces nothing.
2. [MAJOR] sl-day14-ladder never re-shows the wiring diagram its first rung points at (unlike the exclude slide, which re-shows its dialog).  Fix: ref fig-accel-bb from the ladder slide or a cropped inset of the breakout-to-rail wires.  Same worktime slide.
3. [MAJOR, P-4] No picture of successful plain-text CoolTerm output anywhere in Part 5 — the thing the ladder asks students to judge against is described only in words, while the chart view gets two screenshots.  Fix: one CoolTerm plain-view screenshot (banner, init line, two readbacks, 2–3 raw/mg line pairs), as a book figure in subsec-day14-run, layered on the existing budgeted slides.  [Needs an asset: this screenshot does not exist in the repo — ask Petra, or capture on hardware.]
4. [MINOR, book-only] Reference IEEE 754: a single 3-cell proportional box (1 | 8 | 23) in the register-box style.  No deck cost.
5. [MINOR] ins-day14-cast: a two-line side-by-side (cast-first vs cast-too-late) with the type-change point marked, on the existing reveal slide.
6. [MINOR] plotter caption "near the right edge" (converges with figure-claims 1).

---

## learner-firstgen-novice — Verdict: MAJOR

The reading's guided walk works for me (every table has document/section/page; acronyms expanded; I could assemble both bytes at my desk).  Part 4's silent attempt lands (the model has the same four-argument shape; i2c1_memWrite is Day 10 material).  Where I stop following:

1. [MAJOR, P-1/P-7] act-day14-cast requires knowing a cast binds to the value right after it and runs before * and / — never taught (the corpus's only prior casts wrap complete parenthesized expressions).  Fix: one mechanic sentence before the activity, P-8 style — "A cast applies only to the value written right after it, and runs before * or /: (float) 7 / 2 gives 3.5, but (float)(7 / 2) gives 3.0, because the division has already happened."
2. [MAJOR, P-2] The ladder's third rung names a cause and no action (rungs 1–2 end in actions).  Fix: point at the existing hand-check ("recompute one printed line by hand, against yesterday's formula") and the committed values.  (Converges with tech-A MAJOR 7 and anxious MINOR.)
3. [MAJOR, P-4] "The slope of sin θ is cos θ" is a calculus claim with no figure; the next sentence already restates it plainly.  Fix: cut the slope clause (B-16) and lead with the concrete version, ideally with two numbers ("near 0° a 1° tilt moves the reading about 17 mg; near 90° the same 1° tilt moves it less than 1 mg").
4. [MINOR] The best-guess line's low stakes live only in the presenter note.  Fix: one clause in the book paragraph — "It is fine to be wrong here; we'll settle on the exact byte together before it goes into any code."

---

## learner-anxious-nonhardware — Verdict: MAJOR

Checked clean (recorded): checkpoint/triage/one-to-one confined to presenter notes (S-25); Q10 zero hits; Q3 clean for Day 14's scope; tone clean (no dares, no reassurance theater); the best-guess line reads as permission; Parts 8–9 are paper tasks, so a stranded student rejoins substantively before their hardware is fixed.

1. [MAJOR, P-14/P-2] The hardware rung ends at re-seat with nothing for a second failure, and Day 14 never says the five sanctioned words.  Fix: add "Still stuck?  We're here to help!" as the ladder slide's last line — the S-25-precedented form, five words, nothing after them.
2. [MAJOR, P-14] The earliest hardware failure (Part 3's re-verify) gives no action; the re-seat instruction arrives three subsections later.  Fix: one clause in task-day14-reverify — "If it does not, re-seat the wiring against fig-accel-bb before continuing" — content moved earlier, not added.
3. [MINOR] Rung 3 ends in a diagnosis, not a check (converges; see novice 2).

---

## learner-in-the-room — Verdict: BLOCKER

(Slide-by-slide walk in the transcript; ordering checks all pass — every reveal follows its activity, nothing leaks 0x77/0x00, the 30° numbers, or the cast.)

1. [BLOCKER, slide 9 act-day14-settings] The commit's target specification is on no student-facing slide: "400 Hz" is on slide 6 and "normal mode" on slide 8, but ±2 g and "all three axes enabled" appear only in a presenter note and the book.  Task 2 is unanswerable from the wall.  Fix: one lead line on the commit slide — "We want: 400 Hz, normal mode, all three axes enabled, the ±2 g range." — and slide 7's caption gains "we want ±2 g".  Neither leaks a byte.
2. [MAJOR, slide 39] The two-axis slide's A_y is AN-1057's vertical axis; ours is z, as slide 37 just said; "ax and ay are the numbers on your screen" applied to a flat board is 0/0.  (Converges with arc-fidelity 1 and figure-claims 6 — resolved by the upright-frame clause, NOT by changing the axis pair: Gate 1 F7 and Lab 7 fix atan2(ax, ay).)
3. [MAJOR, slide 3] The agenda covers Parts 4/5/7/10 only; Parts 6, 8, 9 (24 minutes, one never-cut) are unannounced.  Fix: six items (add the library promotion, the tilt geometry, floating point).
4. [MAJOR, slides 41/43/44] One conversion, three spellings, and a silent unit change: ACC_FS*ACCEL_raw*MILLI>>16, then raw*4/65536, then (float)ACCEL_RAW*ACC_FS/65536 with MILLI gone and a magic 65536 back.  Fix: one spelling throughout (ACCEL_raw); land the unit change in words on the reveal ("in g now, not mg — sin⁻¹(Ax/g) wants a fraction of 1 g"); consider folding the recap line onto the float slide.
5. [MINOR, slides 12 vs 14] sl-day14-verify's two sentences are act-day14-stage task 1 verbatim, two slides later (converges with voice 6).
6. [MINOR, slides 24/26] "You should see the banner" — the banner printf was cut from the setup listing.  Fix: restore the banner line to the listing (drop the declaration line if space is needed) or cut "the banner" from the task.
7. [MINOR, slide 19] sl-day14-write-transfer adds nothing over the reveal unless it is made to: caption discusses Table 20 while the image shows 20 and 21.  Fix: label the call's arguments onto Table 20's cells (LSM303_ADDRESS_ACCEL→SAD+W, RegisterAddress→SUB, 1→one DATA cell, &data→its contents), or cut the slide and say the sentence over the reveal.  (Tension with cognitive-load 2, which keeps this slide and trims the reveal — synthesizer to rule.)
8. [MINOR, slide 49] "Begin Lab 7's wiring" asks the room to wire what never came down (the display stayed on the bus all week; slide 48 calls it "now graded").  Fix: retitle to what is actually left — "Lab 7 now: both devices answering in one program" — or cut (it is the declared buffer).
9. Smaller, recorded: the deck's first section reads "Part 2" with no Part 1 in the room (kicker numbering is plan scaffolding; consider dropping the numbers from kickers); the ladder's "Tuesday's diagram" is not on the wall (converges with visual 2); the plotter slide could name Trace 1/2/3 = x/y/z (converges with figure-claims 7); the 30° commit could ask for the three numbers in mg outright.

---

## committee-synthesizer — the change list

**Verdict: not ready for Petra, but close.**  The arc is hers, the clock reconciles, eleven of twelve report a structurally sound draft.  What blocks sign-off is six correctness defects in the reasoning: the stationary-reading rule's sign, the 30° reveal's phrasing, the impossible signed-shift example, the "bug we met on Day 5" that ch-uart refutes, round() printed as an int, and the two-axis formula shipped without the upright-frame precondition (three reviewers independently).

### Blockers
1. Stationary-reading rule → magnitude + stated convention (up = positive); same in three feedbacks (clears the L-17 "reports"); displaces the sentence restating the intro.  [tech-A B1]
2. Part 8 three-part fix: (a) the 30° reveal names the up-the-slope axis and both signs, cites AN-1057 p. 7, names the breakout, and marks itself as the flat frame; (b) the two-axis paragraph gains the upright-like-a-phone frame, the ax/ay-on-your-screen clause, "identify" for L-17, and the Reference-orientation xref, with the quadrant mechanics moving to the Reference (already there verbatim); (c) sl-day14-tilt-two's second bullet swaps "In Lab 7 you will use exactly this" for the upright-frame words.  The axis pair does NOT change (Gate 1 F7).  Re-measure slide 39.  [tech-B B1; arc 1,3; figure-claims 6; room 2; load 4]
3. Signed-shift example → raw −64 (0xFFC0), one step in normal mode: >> floors to −4 (CoolTerm), / truncates to −3.  [tech-A B2]
4. Part 9 lead rewritten: honest BRR recall (uart.c rounds; the division was exact; ours is not so lucky) + the cast-binding mechanic taught before the commit ((float) 7 / 2 vs (float)(7 / 2)); one spelling ACCEL_raw across slides 41/43/44 and the task; ins-day14-cast says "group", not "evaluation order", and lands the mg→g unit change in words.  [tech-B B2, M4, m5, m6; room 4; novice 1]
5. (int)round(angle) — round() returns double; D3 is graded on this line.  [tech-B M3]
6. The commit's target spec goes on the wall: the activity introduction states 400 Hz / normal / all three axes / ±2 g ("later today", not "in a few minutes"); look-reg4's caption gains "we want ±2 g".  [room B1; voice]

### Must fix
7. The ladder rewritten whole (book + slide): rung 1 loses the causal verdict (Q3 precedent, Day 13 gate item 23) and names the four leads in words; rung 2 names the check instead of "the reveal"; rung 3 ends in two actions (recompute one line; compare the committed values against the readbacks — the FS-scales-everything mechanism); the analyzer close loses the metaphor; the slide gains "Still stuck?  We're here to help!" and the presenter note gains the neighbor-stream fallback (no spares, Q10).  [logistics 1,2; tech-A 7,10,13; novice 2; anxious 1,3; voice; visual 2; room 9]
8. Part 5 walk: count-armature deleted; the wider-integer clause MOVES to subsec-accel-ref-signed-shift; the %x sign-extension clause replaces the side-by-side restatement; new instructor block ins-day14-run-line works one line both ways (0x4000 → +1000; ffffc000 → −1000).  [load 1; voice 2; tech-A M3]
9. sl-day14-write-transfer carries the on-wire telling (corrected: one byte MORE than Tuesday's write, which was a read's first phase) plus the argument-to-cell mapping in words; ins-day14-registerwrite trims to code mechanics; image enlarged.  [tech-A M4; load 2; room 7; voice 8; tension resolved: keep the slide, trim the reveal]
10. Setup slide: caption → CTRL_REG1 is the diagnostic readback (REG4's default equals the committed 0x00); banner printf restored (the task references it), declaration line dropped to pay.  [tech-A M5; room 6]
11. Reading: SPI_ENABLE = the 3-wire form (the CS pin picks the interface); ODR disambiguated from Day 9's register; "each nonzero pattern".  [tech-A M6, m15; continuity 2]
12. checker-voice's MAJOR rewrites verbatim: Part 2 opening (goal-first, S-25 clause to the note, "four table images"); "in silence" cut; task-day14-reverify deduplicated + gains the early re-seat clause; Part 10 plain declaratives + "your own design decision"; five fragments fixed; six S-18 deck titles.
13. checker-voice's MINOR rewrites verbatim (todays/Tuesdays possessives, Table 14 of the LSM303AGR datasheet, Part 6's voice, the probe sentence, FIFO expanded, the Reference opener as a sentence, the "exactly" tic trimmed to the four load-bearing).

### Should fix
14. Plotter captions: burst two-thirds across + at-rest tail; "live" dropped; slide caption gains Trace 1/2/3 = x/y/z.  [figure-claims 1,2,7; tech-B 7; visual 6; room 9]
15. Part 7: beats re-split 2+5+4+1 inside the fixed 12 (chart view is a first-time tool); "click View in the toolbar"; "a few changes" grouped identically; new ins-day14-experiments reveal (flip/raise-lower/bang described); the unsourced "nobody guesses right" note deleted.  [logistics 3; tech-B 8,9,15; figure-claims 5]
16. The stretch lands: the resolutions re-derive task on act-day14-experiments; the buffer section becomes "Lab 7 now: hold the board upright and compute the angle" (atan2 on paper from your own numbers) — after the geometry, P-1.  [arc 2; room 8]
17. Agenda → six items.  [room 3]
18. ctrl_bytes_filled.svg (register-as-boxes, both bytes) on ins-day14-settings.  [visual 1]
19. Day 1x / Day 8's "click Select All" captions → "confirm both Debug and Release are checked" (the pixels show Select All greyed).  [figure-claims 3; tech-A m11]
20. Reference corrections: compiler-specific shift wording; "the part of that table this driver uses" + attribution noted; "exactly" dropped from C1/C2; offset "stable at a given temperature"; int32_t −2³¹..2³¹−1; format-recap caption gains the floor; cost-slide note gains the 12-bits reassurance.  [tech-A m14,16; tech-B m10-13; arc 4]
21. Hygiene: provenance comment states the Table-13 divergence; PARKED comment marked DONE; the rescue line gains the second duplicate symbol; sl-day14-round's note attribution → ch-debugging + the double-precision aside; Part 3/4 adjacency named; settling/announcement minutes noted; plan's never-cut gains Part 6; Part 4's OWES marker gains the bulletize note.
22. Both tilt SVGs gain font-family; tilt_single widened 1000 → 1030.  [figure-claims 12]

### Consider (deferred this pass)
23. IEEE 1|8|23 box figure (Reference, book-only).  24. Cast side-by-side listing on the reveal.  25. Dropping Part numbers from deck kickers.

### Explicitly rejected
- Changing the atan2 axis pair (settled, Gate 1 F7; the upright frame is the fix).
- A reassurance clause in Part 2's book paragraph (S-25; the permission lives in the presenter note).
- Student-facing sinf/atan2f material (ground truth §7 item 4; survives as a presenter note).
- Moving 2 minutes from Part 6 to Part 7 (Part budgets fixed; re-split inside Part 7 instead; escalated as ask-Petra 6).
- Annotating the call's arguments onto Day 13's shared i2c_transfer_writes.svg (never re-crop/edit the shared figure; the mapping goes in slide text).
- ref="fig-accel-bb" on the ladder slide (would force two-column and shrink the ladder; the four leads are named in words — DISSENT RECORDED: if rung-1 failures do not resolve in the room, the picture is the next thing to try).
- Splitting the look slides (readable at 1.6–1.8%; costs four slides).
- Collapsing the two FPU expansions (S-9: slide and prose are different surfaces).

### Ask Petra
1. lsm303agr_partial.c:19 "Table 13" → Table 22 (her file; same one-word class she approved 2026-08-30).
2. A plain-view CoolTerm success screenshot (banner, init, readbacks, raw/mg pairs) — drop path assets/images/Day14-Accelerometer(2)/coolterm_plainview.png; only an <image source> line changes.
3. The original Eclipse exclude screenshots, two panels (the menu panel renders at 0.6–0.8% on the wall; Day 14 may need only the dialog panel; a pre-check capture would also settle the Select All caption).
4. Reference openers: does the whole-sentences rule override her passed Day 10 fragment corpus-wide (ch-i2c too)?
5. One 30-second hardware check: do the unused low bits of the left-justified output read as zero?  (Nothing applied depends on it; "zeros below" phrasing does.)
6. Part 7's chart-view beat measured at 5–6 real minutes against 3 budgeted: re-split inside Part 7 for now; if it runs over in class, the 2 minutes from Part 6 are the right source and only she can move them.
