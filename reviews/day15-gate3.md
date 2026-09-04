# Day 15 Gate 3 — the deck's committee

Reviewed 2026-09-04, over `assets/decks/day15.json` (53 entries, 41 refs, 10
instructor-only) and the `<slide>` blocks in `source/ch-servos.ptx`
`sec-servo-day15`, condensed from the in-class Parts 1–6 as Petra passed them
(her pass 1 of 2026-09-04 applied, plus three follow-up comments). Fit swept at
1600×900 in the player with the crossfade killed: every student-facing slide
fits except the two activities that were split afterwards (`act-day15-build`
into setup and measurement; `act-day15-tim14-pins` projected as its two tasks);
the two instructor-only listings overflow, which is allowed. Every figure slide
looked at by eye.

Seven reviewers: `learner-in-the-room`, `checker-arc-fidelity`,
`checker-voice`, `checker-figure-claims`, `learner-visual`,
`expert-cognitive-load`, `expert-class-logistics`. Reports follow in the order
they returned; the synthesizer's list and the applied list are at the end.

---

# expert-class-logistics

### Verdict: MAJOR

Clock: 5 + 6 + 8 + 18 + 10 + 51 + 7 + 5 = 110, every sub-beat sums, the checkpoint at minute 78 and "Part 6's first beat and the close still fit at minute 100" are consistent with it. The problem is zero slack before Part 5.

- **[MAJOR] S-8** the checkpoint is anchored to a wall-clock minute 78 only. Fix: add a relative anchor ("about 30 minutes into the build, whatever the clock says") and what to do if Part 5 has not started by minute 50.
- **[MAJOR] S-8** the only named cut is Part 6; Parts 1, 2 and 4 have no compressible beat named. Fix: name one per Part (Part 1's push reveal; Part 4's file walkthrough).
- **[MINOR] S-8** the agenda slide is unbudgeted. Fix: fold into the opening recap's note.
- **[MINOR] S-8** the prescaler-table beat is timed twice with different numbers (≈4 on the lead-in note, ≈3 on the activity). Fix: keep one number, on the activity.
- OK: the symptom list and ladder are cheapest-first; no staffing or minute counts in student text; the page-back/forward notes name slides that exist.

---

# expert-cognitive-load

### Verdict: MAJOR

Census: the pulse convention twice in ten minutes (recap item 2, `sl-day15-pulse`); the lead colours on consecutive Part 6 slides (`sl-day15-powering` caption, `sl-day15-leads`); the troubleshooting ladder three times (book list, `sl-day15-symptoms`, `inst-day15-checkpoint`). Not violations: "own supply" (recap conclusion, then the reason); the ARR + 1 convention (math → number → code); the dead band (defined once, applied twice).

- **[MAJOR] P-7, S-3** `sl-day15-tim16`: a 1-minute slide with a new idea, a seven-line function and a caption carrying four more facts (vector 21, the handler name, the flag). Fix: caption to one line ("Same recipe as Day 8, on TIM16"); the vector position and handler name to the Reference.
- **[MAJOR] P-7** `sl-day15-resolution`: five new elements in two bullets over a figure, right before the table that needs them. Fix: split into two slides at the same time: T0 and its worked example; steps → angle and the ±90° convention.
- **[MAJOR] P-4, P-1** `sl-day15-second-design`: three long bullets, and the 16-bit ARR limit is stranded from the activity it gates. Fix: move bullet 3 (the timer recall and the 65,535 limit) to `sl-day15-lots-of-ways`, adjacent to the prescaler table.
- **[MINOR] B-8** recap item 2 → a pointer, the numbers stay on `sl-day15-pulse`.
- **[MINOR] B-8, S-3** `sl-day15-leads`: drop the colour mapping; keep the unplug rule and the order.
- **[MINOR] S-10, B-8** `inst-day15-checkpoint` re-projects the ladder the symptom slide already shows. Fix: what is projected at the checkpoint is the overflow policy; the ladder stays in the source for the instructor.

---

# checker-voice

### Verdict: MAJOR

Register: hers in the main (openings, "we'll", both reveals near-verbatim from her slide 8 and 10 notes, no aphorism, no banner leads, no em dashes). What is not hers is five compressions that drop the causal clause.

- **[MAJOR] S-27, L-5** `sl-day15-why-separate`: restore "the STM32C031C6 datasheet … so a servo's power lead on a pin would exceed that rating many times over"; drop "never to Vin" (nowhere in the passed prose; the Vin warning lives in the motor chapter with its reason). Ask Petra if the servo text should carry it.
- **[MAJOR]** `sl-day15-symptoms` item 1: restore "rather than at the blank itself".
- **[MAJOR] S-12, B-9a** `task-day15-pins-find` as projected never shows the introduction (the AF expansion and the page numbers). Fix in the task statement: "the AF (alternate function) number it is under" and the Table 12 / pages 36 to 39 pointer. Do not ref the activity (its introduction carries a `<url>`).
- **[MAJOR] S-30** `sl-day15-driver-numbers` promises two changes and delivers one. Fix: "Here is the first:".
- **[MINOR]** `sl-day15-second-design`: add the closing sentence as a caption ("The numbers we settle here become the five `#define` lines…").
- **[MINOR]** `sl-day15-resolution`: `<m>T_p</m>`/`<m>T_0</m>` instead of underscores.
- **[MINOR]** `sl-day15-safety`: title "Verify the pulse before the servo goes on", one merged bullet.
- **[MINOR] S-12** `sl-day15-tim16`: name the RM section title.
- **[MINOR] S-11** "Checkpoint: the ladder" → "Checkpoint: triage by symptom"; "the ladder" in the note and the instructor block → "the symptom list" / "the triage list".
- **[MINOR] S-20** presenter note "Wednesday recalls the leads" → "we'll recall the leads on Wednesday".
- **[MINOR]** five notes carry a stray " , " from the parenthesis strip; one ends ", .".
- Reuse: add her slide 21 clause to `task-day15-build-run`: "verify that the pulse width sweeps smoothly from 1 ms to 2 ms as you rotate the potentiometer".

Sweeps clean: 13 openings, 46 titles, weekdays, armatures, "we" 45/45, acronyms (only AF), scaffolding, xrefs/urls in projected blocks (0), em dashes (0 in slide bodies).
For Petra: the Vin warning; de-bolding the symptom list's `<term>` leads.

---

# checker-arc-fidelity

### Verdict: MAJOR

Her 31 slides all reach the room, the reading, or a recorded drop, except two the plan recorded as refPage recalls and the deck lost: slide 13 (RM0490 Fig. 165) and slide 18 (the register map with her callouts).

- **[MAJOR]** `sl-day15-second-design` condenses two paragraphs and drops `fig-tim14-block-full`. Fix: its third bullet becomes its own slide, `sl-day15-timer-recall`, `ref="fig-tim14-block-full"`, refPage `subsec-day11x-timer-peripheral.html`, between the callback and "lots of ways".
- **[MAJOR]** her slide 18 never reaches the room. Fix: `sl-day15-timer-behaves` gets `ref="fig-tim14-register-map"`, refPage `subsec-day11x-hardware.html`, one slide before the fill-in.
- **[MINOR]** "Table 12" is off the wall: put "Table 12, Pin assignment and description" into `sl-day15-pwm-pins`'s caption; do not ref the activity (its introduction has a `<url>`).
- **[MINOR]** "Demonstrate to an instructor or LF" is instructor-only; the room does not know a demo is expected. Fix: one clause on `task-day15-build-center`. [Session note: Petra ruled staffing appears nowhere; "show your sweeping pulse to an instructor" names no count and is her slide 21's own line, so it can go in without "LF".]
- **[MINOR]** her slide 2's "you will need today" list has no home. Fix: one recap item: "Out on your desk today: Nucleo and breadboard, AD2, potentiometer. No servo yet."
- **[MINOR]** four notes are text-mangled from the parenthesis strip; the prescaler-table activity note says 3 where the beat is 4.
- **[MINOR]** `sl-day15-inside` condenses reading prose; trim bullet 2 to her closing clause.

Paragraph → slide: `:802` (the driver's two changes) is condensed by two slides (fine, split the prose at "And the range check…" for 1:1); everything else is 1:1. Budgets sum to 110; minute 78 lands nine minutes into the build beat.

---

# learner-visual

### Verdict: MAJOR

- **[MAJOR] P-4** `sl-day15-second-design` opens Part 3 with no picture; the OWES comment promised `fig-tim14-block-full`. Fix: ref it (or a slide before it).
- **[MAJOR] P-4** `sl-day15-driver-numbers` walks PSC/ARR/CCR1 in code only; `fig-tim14-register-map` is owed. Fix: the register map beside the code.
- **[MAJOR] P-4** `sl-day15-dead-band`: two bullets on an empty slide. Fix: a small number-line inset showing a 1 µs band ("no change inside this band"), reusable on the resolution figure.
- **[MINOR] P-4** `fig-servo-pulse-resolution` names ARR + 1 bins but draws none. Fix: tick marks between the pulse edges.
- **[MINOR] P-4, S-4** `sl-day15-why-separate`: the current argument is three numbers in prose beside an unannotated board photo. Fix: a three-bar comparison (USB 500 mA / servo 250 mA / GPIO 20 mA).

---

# learner-in-the-room

### Verdict: MAJOR

Slide walk: every student-facing slide adds something except `sl-day15-lots-of-ways`; every task was doable from the wall except the Table 12 task, which has no locator on the wall.

1. **[build state]** `act-day15-measure` is not in the student build yet (`output/web-deck` predates the split). Rebuild the student deck before class.
2. **[MAJOR] S-9** `sl-day15-lots-of-ways` restates `sl-day15-second-design`; cut it; the transition line becomes a fourth bullet there.
3. **[MAJOR]** `sl-day15-symptoms` rung 2 names two causes and cannot separate them. Fix: "Look at the terminal first. If `pot_value` is printing, the program is running and the fault is on the scope side (channel 1 on PA7, D11; its striped ground lead on GND). If nothing prints, the build never reached the board (tim.c and adc.c in the project; one main())."
4. **[MAJOR] S-9** `sl-day15-template` is thinned: the lines that consume the defines and declare the variables are cropped. Fix: put back `uint16_t pot_value`, `pwm_value`, `tim14_pa7_pwm_init(PWM_PSC_FACTOR, PWM_TIMER_MAX)`, `pa0_adc_init()`, `tim16_ms_interrupt_init(500)`; split into two slides if tall.
5. **[MAJOR]** `task-day15-pins-find` has no locator on the wall (the introduction is not projected). Fix: the Table 12 / pages 36 to 39 pointer in the task's own statement; leave the `<url>` in the introduction.
6. **[MAJOR] S-26** `act-day15-map` says "using the names in the template" two slides before the template. Fix: move `sl-day15-template` before `sl-day15-map` in the JSON; "using the program's names".
7. **[MINOR] S-18** `sl-day15-safety`: title = first bullet = the section slide. Fix: retitle "Verify the pulse before the servo is attached", one bullet.
8. **[MINOR] S-30** `sl-day15-leads` repeats the powering caption's lead map. Fix: retitle "Unplug before you rewire"; bullet 1 says what the photo adds (the kit's servo with the arm).

Undefined on the wall: TIM14_CH1 and AF (fix with 5); SG92R at `sl-day15-dead-band` ("the servo in your kit"); SERVO_MID's purpose (move the note's half-sentence into the body of `sl-day15-driver-numbers`); `milliseconds()` in the stretch (one clause); "the table's first row" on `sl-day15-resolution` → "the prescaler-1 row".

Mechanical: the 4-vs-3 note; two beats with no minutes (`sl-day15-between-reveal`, `inst-day15-tim14-pins`); the stray-comma notes; put "their own predicted numbers come first" in the capture slides' presenter notes.

---

# checker-figure-claims

### Verdict: MAJOR

All ten figures opened and every figure slide rendered in the player at 1600×900.

- **[MAJOR] `fig-servo-powering`** the opaque legend box hides ~165 px of the brown ground jumper, so the shared ground the caption claims is not visible. Fix: ask Petra to park the legend in clear space (her `towerProPot.png` does).
- **[MAJOR] `fig-servo-powering`** the one clearly orange wire in the drawing is the servo's power jumper (to 5V), while the legend and caption say orange → PWM (that wire is drawn yellow). Fix: ask Petra to recolour the power jumper red (as in `towerProPot.png`).
- **[MINOR]** the regulator graphic sits 0.4 pitch off its columns (note for the re-export).
- **[MINOR]** `fig-servo-scope-2ms` "unchanged at 19.93 ms" against 19.91 → "has not moved: 19.93 ms against 19.91 ms".
- **[MINOR, ch-motors]** `fig-tb6612-regulator`'s caption "a capacitor either side of it": the capacitors are below the regulator, flanking its centre lead.
- Observation: `towerProPot.png` (with the pot, legend in clear space, larger) is the scene Part 5 actually wires; consider it for Day 15 and a zoom for 15x.

Notation: the signal lead photographs yellow in both photos while the text says orange → add "(it photographs yellow)" in the two photo captions, `sl-day15-leads` and the reading paragraph; `sl-day15-inside` bullet 2 → "a gear train (the picture labels it GEARBOX)". `sl-day15-resolution`'s T_p/T_0 render as real subscripts in the player (no defect).

Legibility (cap height as % of slide height; 2 % wanted): `sl-day15-powering` 0.55 % (pin names) and 0.83 % (legend), fail; `sl-day15-pwm-pins` 0.83–0.95 %, fail and an activity depends on it; `sl-day15-loop` 1.0 %, fail, with a free fix: `stack="yes"` takes it to 2.3 %; `sl-day15-why-separate` 1.2 % borderline (a crop to the header end would need a new file, the figure is shared with Day 11); the captures 1.4 % borderline (crop the three chrome rows above the Trigger row); `sl-day15-pulse` 2.1 % pass (regenerate at 2× when convenient); `sl-day15-inside` pass (the bullets carry the sub-labels); the resolution SVG ~5 %.

Fixes for the two failures are upstream: ask Petra for the powering export cropped to the Nucleo header end and the servo/regulator end (two zooms), and split the pinout into left-header and right-header slides, or send the room to the pinout PDF on their laptops.

Crop candidates: `sl-day15-resolution` has ~55 px of clearance; do not add a bullet.

---

# committee-synthesizer — the consolidated list

(The synthesizer's list, 3 blockers, 9 majors, 15 minors, plus 9 mirror edits and a 5-item ask-Petra list, is applied below; its rulings: Part 3 restructure funded by cutting `sl-day15-lots-of-ways`; tim16 caption to one line with the RM title in the lead; voice's `sl-day15-safety` wording; the register map on `sl-day15-timer-behaves`, page-back from Part 4; rung 2 rewritten terminal-first; the powering caption fixed now, the re-export asked for; splits are self-funding.)

---

# Applied (2026-09-04), verified in the player at 1600×900

The synthesizer's list is applied: B1 (the student deck rebuilt with `build-deck.sh`), B2 (the powering caption says the signal lead is orange on the servo and drawn yellow), B3 (the motor chapter's regulator caption: C1 and C2 below the regulator, one either side of its center lead); M1 (`sl-day15-lots-of-ways` cut; `sl-day15-timer-recall` refs `fig-tim14-block-full` by refPage and carries the 65,535 limit and the 20 ms lead-in; `sl-day15-second-design` is two bullets and a caption); M2 (`sl-day15-timer-behaves` refs `fig-tim14-register-map`, stacked; its transition line is in the note); M3 (`sl-day15-resolution` split, `sl-day15-steps-angle` new; "the prescaler-1 row"); M4 (`sl-day15-template` restored to the defines and the setup calls, `sl-day15-template-loop` new with the marker lines); M5 (the template slides precede the map); M6 (rung 2 terminal-first, on the slide and in the book); M7 (the locator in the task); M8 (`sl-day15-why-separate` restored clause, "never to Vin" dropped); M9 (a minute mark on every deck entry, deck wins; the checkpoint anchored to 30 minutes into the build; a compressible beat named per Part; the agenda folded into the opening note; Part 3 = 17 with one minute of slack); N1–N15 as listed, except N11 (tick marks on the resolution SVG: the drawing is a bitmap with text overlays; deferred, see below). Mirror edits 1–9 done. Fit: every student-facing slide fits (slides 1–46 measured; 47–55 unchanged from the first sweep); the two instructor listings overflow, which is allowed. `check_deck.py` 0 problems; the Day 11x Part 5 warning is pre-existing.

Deferred: N11 (bins as tick marks), and learner-visual's dead-band inset and current-comparison bars, per the synthesizer's (e).

Ask-Petra, from Gate 3: (1) `towerProPowering.png` re-export: the legend box over the brown ground jumper, the power jumper drawn orange, the regulator graphic 0.4 pitch off its columns; (2) two zoom exports of the powering drawing (the Nucleo header end; the servo and regulator end) because the pin names are 0.55 % of the slide height; (3) whether the Vin warning belongs in the servo text (it is in the motor chapter with its reason); (4) whether `towerProPot.png` should be the Day 15 figure with a zoom for 15x; (5) whether the symptom list's bold leads should be de-bolded.
