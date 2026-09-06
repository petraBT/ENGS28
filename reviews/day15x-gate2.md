# Day 15x Gate 2 — the book's committee

Reviewed 2026-09-05, over `source/ch-servos.ptx` `sec-servo-day15x` (lines
1380–1705 at commit `ac46bde`): the Day 15x in-class section, delivery 1 —
introduction, Parts 1–3, three activities, a student symptom list, four
`<instructor>` blocks and one figure (`fig-servo-pot-wiring`, Petra's
`towerProPot.png`). No reading (x-day), no `<slide>` blocks, no deck.
Against `plans/day15x.md` (Gate 1 applied and re-checked the same day
against the passed Day 15), `plans/week8-ground-truth.md` (with its Day 15x
Gate 0 block), her deck `Day15x-Servos(2).pptx`, the three starter files,
Lab 5 §3.2 and Lab 8 §3. Class length given to every reviewer: Wednesday
x-hour, 50 minutes.

Gate 1.5 (`checker-voice` on the introduction and Part 1) ran first and its
ten findings were applied before Parts 2–3 were written: the count-armature
frame deleted, both rules stated as things we do, the opening on the goal
rather than on yesterday, her slide 6's "still there on your Nucleo, so you
should see the servo rotate, smoothly" and the file name reused, the PA7
claim restated as "driven by TIM14" (its engineering question), the Part 1
title without a count.

Twelve invocations: the standing core of ten (`checker-technical-accuracy`
run once over all three Parts, which are short, with the self-contradiction
read included) and the two rotators this day earns (`learner-weak-circuits`
for the wiring, `expert-rigor-hawk` for the electrical claims). Reports
follow in the order they returned; the synthesizer's list and the applied
list are at the end.

---

# checker-voice

### Verdict: MAJOR

Register mostly hers: sweeps clean (no em dashes, no `Part N` or minutes outside comments and `<instructor>`, no reassurance, no weekday as actor); the symptom list correctly modeled on the passed Day 15 one. Not hers: a recurring colon-plus-verbless-appositive and a few epigrammatic closers; three places reinvent a sentence she wrote for this day (Day 15x slides 2 and 6).

1. **[MAJOR] section introduction — S-17, aphoristic register.** "…: its power from the regulator board's 5V pin, its ground shared…; today the servo is on the end of that signal." → "Its power comes from the regulator board's 5V pin, its ground is shared with the Nucleo, and its signal lead goes to PA7 (D11). Yesterday we designed its command pulse and checked it on the AD2 oscilloscope with no servo attached, and today we'll put the servo on the end of that signal." (Her Day 15 intro is all finite clauses.)
2. **[MAJOR] `act-day15x-wire` introduction — P-12 reuse.** Use her slide 2 verbatim: "If you didn't finish Tuesday's design exercise you need to complete that first, before moving on to the next exercise." and slide 3's "Unplug power before making any changes to wiring."
3. **[MAJOR] Part 2 opening — S-19 saying it twice; passive.** The three clauses restate tasks 1–4. → "We'll measure the regulator board's 5 V first, then check the pulse on PA7 again, and connect the servo's leads last."
4. **[MAJOR] `task-day15x-power` / `-leads` — P-12 reuse.** "Turn the knob, and you should see the servo rotate, smoothly, as you adjust the potentiometer." / "Then check your wiring with an instructor." (her slide 6).
5. **[MAJOR] `inst-day15x-checkpoint` — she reads this block.** "Her x-hour" → "This x-hour"; "Tuesday's ladder" → "works down the Day 15 checkpoint list" (S-11, metaphor as a name).
6. **[MINOR] Part 3** "A program that reads both is one you have already written. In Lab 5 your ADC library gained a function…" → "You have already written a program that reads two channels. In Lab 5 you added a function to your ADC library that selects the channel…"
7. **[MINOR] Part 3** "Reading two channels … is that call made twice:" → "To read two channels in every sampling interval we call that function twice:".
8. **[MINOR] `task-day15x-observe-scope`** "Say what the servo is loading, and what it is not." → "Say which supply the servo is loading, and whether it draws any appreciable current from the signal pin."
9. **[MINOR]** "on Thursday this loop gets its two photocells" → "on Thursday we'll give this loop its two photocells"; and pick one name for the day in the close ("Tomorrow" vs "On Thursday"; Day 15's passed close says "On Thursday").
10. **[MINOR] `task-day15x-5v`** design commentary → "We measure before the servo is connected. If you do not read 5 V, the fault is upstream of that pin, in the adapter, the board or its ground wire."
11. **[MINOR] instructor text** "may or may not have survived" → "may have been damaged"; "Nobody pushes the arm to find out" → "Do not have students push on the arm to find out".
12. **[MINOR]** "If it were… may respond" → "might respond".

Sweeps: 8 unit openings, none on an absence; weekday-as-actor 0; count-armature 0; "we" in 12 of ~19 class-work sentences. Deliberately not flagged: the symptom-list lead (her Day 15 wording); Part 1's two rule paragraphs (Gate 1.5 applied; longer than the rule, correctly); the Part 2 title; the caption repeating `fig-servo-powering`'s lead map (captions are standalone); the instructor blocks' technical content. For Petra: "Tomorrow" vs "On Thursday" on an x-hour.

---

# learner-visual

### Verdict: MAJOR

- **[MAJOR] [B-11a] `fig-servo-pot-wiring`** — at the ~700 px the figure occupies in the book column the labels the tasks depend on (the board's 5V/GND/Vin silkscreen, the Nucleo's A0/D11 header text) are unreadable; no lightbox in the built HTML, and Petra's ruling forecloses a zoom export. Fix: crop the dead real estate (the ST-LINK half of the Nucleo) so the same pixels buy more scale. DISPLACES nothing (a re-crop of the existing export).
- **[MAJOR] [P-4] [B-7] `task-day15x-observe-center`** compares the arm's travel against "the 180° … in the convention from the reading", but nothing in Day 15x re-shows `fig-servo-pulses`. Add the same one-line recall the OWES note already lists for the other figures (a refPage recall in the deck, ~1 min). DISPLACES nothing in the prose.
- **[MINOR] [P-4]** The five-step build is ordered prose only; Day 12's equivalent got `table-day12-build-order`, which this section invokes by name without giving its own. A 5-row stage / it-is-working-when table before the figure; DISPLACES the tasks' inline justifications, folded into the table's second column.
- **[OK] [B-18]** Deferring the two-divider figure to Day 16 is right: Part 3 is paper-only.

---

# expert-cognitive-load

### Verdict: MAJOR

Repetition census: the lead map (red → 5V row, brown → ground rail, orange → D11) is stated in full four times inside this 50-minute section (Part 1 prose, the `fig-servo-pot-wiring` caption, `task-day15x-leads`, symptom item 1) against two full statements already passed on Day 15; keep `fig-servo-powering` (Day 15) as the one full statement. The power rule and its reason, and "no signal, no power on the motor", are each in full exactly twice (reading, Day 15) and only recalled here — the intended handoff.

- **[MAJOR] [B-8, P-7]** the lead map ×4 here; the plan's own coverage table says Part 1 is a pointer. DISPLACES: Part 1 to a pointer clause plus the two new rules (−2 sentences); the caption to the one new fact, the potentiometer (−2); symptom item 1 to a figure reference (−1).
- **[MAJOR] [P-4, P-7]** Part 2's five tasks toggle two supplies on and off in a precise order around the crucial step; the intro invokes Day 12's build-order table as the model but supplies none. A compact table (step / USB / adapter / connected / check) beside the tasks; DISPLACES the repeated "with nothing powered" / "then unplug" framing across the tasks, roughly length-neutral.
- **[MINOR] [P-7]** Part 1's 3 minutes carry a full lead re-derivation plus two new rules; the trim above resolves it.
- **[MINOR] [B-18/S-2]** Part 3: 3 min of recall then 2 to write the loop on paper; a student who must look up their own `adc.c` names will not finish. Either a minute from the close, or work from their own Lab 5 file rather than memory.

---

# checker-arc-fidelity

### Verdict: MAJOR

Her arc: 15x/1 deck glue; 15x/2 present near-verbatim in `act-day15x-wire`'s introduction, but a beat later than the plan puts it; 15x/3 (UNPLUG POWER, the lead map, "TIM14 can control PA7") present in Part 1, paraphrased; 15x/4–5 (the power argument; 9 V / 7805) deliberately not repeated, drops recorded (Day 15 Part 6, her Day 12 ruling); 15x/6 present in full with her `towerProPot.png` (A0 version, verified: wiper on A0, signal on D11) and her "your program is still there on your Nucleo" kept. Reverse direction: Part 3, the observations, the symptom list and the stretch are Gate 1 decisions, recorded. Density healthy: 26 paragraphs over 50 minutes against Day 15's 66 over 110.

- **[MAJOR] B-8a / P-2** "never Vin" does not reach the student at the moment the lead goes in: `task-day15x-leads` says "into the row of the board's 5V pin" with no warning; the warning is in a Day 15 caption and instructor prose. Fix: "not the GND or Vin row beside it" in the red-lead clause of the task. DISPLACES the same clause in symptom 1. Net zero.
- **[MINOR] B-4** her slide 2 belongs at the top of Part 2, not after the circuit paragraph and a 105-word caption. Move it.
- **[MINOR] P-12** open the unplug paragraph with her sentence, "Unplug power before making any changes to wiring."
- **[MINOR] B-7 / B-18** the caption re-enumerates the lead map; cut to "Today's circuit: yesterday's servo wiring with the potentiometer on A0 (PA0), and one ground shared by the servo, the board, the potentiometer and the Nucleo." Her legend in the picture carries the leads.
- **[MINOR]** `inst-day15x-stretch`: say why `tim14_pwm_set(0)` bypasses `updateServo()` (it would limit 0 up to `SERVO_MIN`). DISPLACES "which is a defined level and no pulse".
- **[note]** the observation and stretch tasks commit to answers still open with Petra (questions 10–12); flag on delivery.

---

# expert-class-logistics

### Verdict: MAJOR

Running clock: Part 2 0:06–0:40 with the checkpoint at ~0:34, Part 3 0:40–0:45, close 0:45–0:50. Survivable for a student who finished Tuesday; the build order (test the 5 V unloaded, re-verify the pulse unloaded, then load the servo) is sound.

- **[MAJOR] [S-8 / P-3]** the 10-minute pulse beat gives a student still inside Tuesday's exercise about 8 spare minutes; Day 15 calls that exercise "a LONG time". A real bottom quartile is still on Tuesday's pulse past minute 23 and never reaches a following servo by minute 50, and nothing later reserves time for them.
- **[MAJOR] [P-14 / P-2]** a servo that buzzes at one end of its travel (expected, since the observation task itself anticipates less than 180°) is diagnosed only in the instructor block; move that line into the student list (one sentence, no minutes).
- **[MAJOR] [S-8]** the checkpoint at minute 34 leaves ~6 minutes to resolve five fault categories, each needing a power cycle; Part 3 and the close are whole-class tell content, not runway.
- **[MINOR] [P-2]** the Vin-swap outcome names hardware damage with no recovery path (equipment, not staffing).
- **[MINOR] [S-8]** nothing states what a student whose servo does not follow by minute 50 does before Thursday; Day 16 assumes a following servo from everyone.

---

# learner-anxious-nonhardware

### Verdict: MAJOR

What works: Part 1's rules give mechanism, not threat, and drop it after one plain sentence; the symptom list branches on what a student can see (motion, printout, `pot_value`) with no number from an earlier measurement; Part 3 is servo-independent.

- **[MAJOR] B-12** "the servo may or may not have survived" (Vin) exists only in the instructor block; a student who fixed their own Vin miswire and still sees no motion has no text saying this was a possible outcome. Fold into student item 1; DISPLACES a tightened first clause.
- **[MAJOR] P-2, P-14** no branch for "I checked everything above and it still does not move": append to item 1 "say so when your wiring is checked; the unit itself may have failed." DISPLACES the signal clause, shortened.
- **[MINOR] P-14** `task-day15x-pulse` covers only the student who never finished Tuesday; one whose re-check fails today has no stated path. One clause pointing back at Tuesday's symptom list.
- **[MINOR] B-4** Part 3 never says it does not need a working servo; say so in its first sentence. DISPLACES "using the functions of your own ADC library and their names" (redundant).

---

# expert-continuity-auditor

### Verdict: OK

- **[MINOR] P-1 / process risk** the xref to `table-day12-build-order` leans on a Day 12 table Petra has not passed; the id resolves and the claim matches the table's regulator row today. Re-check when Day 12 is passed; not a hold.
- **[MINOR] L-6** "brown-out" (instructor block) vs "brown out" (Day 15 prose). Cosmetic.

Verified clean: `SERVO_MIN`/`SERVO_MAX`/`pwm_value` and the 1.5 ms knob position are taught on Day 15 before use; `fig-servo-powering`, `fig-adc-test-circuit`, `table-day12-build-order` resolve to what the prose claims; `adc_setChannel()`/`adc_getValue()` match Lab 5 p. 4 and the "names vary" caveat is right; the stretch's CCR1 = 0 claim agrees with the Reference; no Lab 8 protected number or the controller appears (Part 3 stops at the ADC read); the x-day convention holds; the chapter's opening promises and objectives are delivered; no 9 V / battery / 7805; the section is not collapsed lab prep.

---

# learner-firstgen-novice

### Verdict: MAJOR

- **[MAJOR] P-2/B-5** the activity intro says finish Tuesday first; task 3 says re-check the pulse "whether or not your pulse was verified yesterday". Which path applies to me? Fix: task 3 is a mandatory re-verification for everyone, and a partial Tuesday build is finished at that step, not before the activity. One-clause rewording.
- **[MAJOR] P-2/B-5** `task-day15x-leads`: "into a breadboard row that a wire connects to D11 (PA7)" assumes a wire yesterday's instruction never asked for. Fix: "Run a wire from D11 (PA7) into an empty breadboard row" as its own clause. DISPLACES "as in today's circuit drawing" in `task-day15x-board`.
- **[MINOR] P-1** "sampling interval" was named only in Day 15's optional stretch; gloss it once, "(each time the flag is raised)".
- **[MINOR] P-4** the multimeter step fuses dial, jacks and probes into one sentence; fine if the multimeter is a settled skill by now.

What works: the build order (5 V with nothing attached, pulse with no servo, then the servo) and the symptom list, each item with its cause and its physical fix.

---

# expert-rigor-hawk

### Verdict: MAJOR

- **[MAJOR] [B-6]** Part 1's "the damage happens immediately" for any wire on a live 5 V row contradicts the checkpoint's own "may or may not have survived" (Vin). The three cases differ: 5 V on a 3.3 V GPIO pin is reliably immediate damage (the 20 mA / pin rating is at l.1337); 12 V on Vin into a 4.8–6 V servo is likely but not certain; 5 V onto GND is a short the regulator may current-limit through. Rewrite to state what is true: the wrong row connects the supply to whatever is there, and on a pin that is an overvoltage the pin cannot survive; "either way you find out only after it is done." Net +1 clause, cutting "and the damage happens immediately".
- **[MAJOR] [B-6]** "draws a negligible current from PA7" has no bound; tie it to the pin's 20 mA rating and the ~250 mA on the 5 V lead.
- **[MAJOR] [B-6]** twitching and a restarting printout are unequal evidence: the restarting printout proves a reset; a twitch alone is also consistent with supply noise. Say which is proof. ~15 words.
- **[MAJOR] [B-6]** Part 3's "select, convert, select, convert" is silent on CCRDY (RM0490 §14: wait for CCRDY after writing CHSELR before ADSTART). A Lab 5 library that does not wait can return the other channel's value with no error. Append to `inst-day15x-two-channels` only (+30 words); the student text is untouched.
- **[MINOR] [P-5]** "PA7 is being driven by TIM14" understates the guarantee: CCR1 = 0 at init, so PA7 is driven LOW for the ~500 ms before the first reading (the Reference says so). Name the level.

---

# checker-figure-claims

### Verdict: BLOCKER

Opened both PNGs at up to 8×. `towerProPot.png`: Nucleo 3V3 → the red-line rail row, GND → the blue-line rail row; pot legs in row J cols 16–18, left leg → ground rail, wiper → the rightmost AIN pin (A0), right leg → 3.3 V rail; regulator board at cols 28–30 with a black wire from its GND column to the ground rail; the servo's dark-red lead in row I of the 5V column; servo leads drawn yellow / dark red / black. `towerProPowering.png`: same layout, leads drawn yellow / red / brown; Part 1's lead map matches it exactly.

- **[BLOCKER]** the caption's "orange signal lead (drawn yellow) to D11 (PA7) **through a breadboard row**": the drawing has one continuous yellow wire from the servo connector straight to the D11 header pin, no row in the signal path (verified at 8×). Re-caption to "…to D11 (PA7)", matching `fig-servo-powering`, or ask Petra for a re-export with a row.
- **[BLOCKER]** `task-day15x-leads`'s "into a breadboard row that a wire connects to D11… The AD2's channel 1 lead can share that row": the row does not exist in the drawing; `task-day15x-stretch-supply` also keeps channel 1 on the signal. Decide the wiring, then caption, task and symptom list together.
- **[MAJOR]** symptom item 1's "the orange lead and the wire to D11 (PA7) in the same row": the same absent row.
- **[MINOR]** `inst-day15x-checkpoint`'s "one row over, on Vin": the silkscreen order is 5V, GND, Vin, so Vin is two over.
- Legibility: the A0 silkscreen is covered by the wiper wire; say "the rightmost pin of the AIN header" in the caption. The regulator silkscreen is unreadable at 95% width; the tasks name the pins in words, so no change beyond stating the 5V, GND, Vin order in prose.
- Notation: brown is drawn brown in one figure and black in the other; the caption's "(drawn black here)" covers it and must stay.

Everything else checks out.

---

# learner-weak-circuits

### Verdict: MAJOR

- **[MAJOR] P-1** `task-day15x-5v` says black probe on the ground rail but not why; the reason (a probe on the board's own GND pin reads 5 V even with the GND-to-rail wire missing) is only in the stripped instructor block. Fold one clause into the task. DISPLACES the "comes before the servo is connected" clause, shortened.
- **[MAJOR] P-2** the 5 V check has one outcome and one catch-all failure; it does not distinguish 0 V (nothing reaching the board: the adapter, its seating) from a reading near the adapter's own voltage (5V and Vin rows swapped, or the regulator failed: do not connect the servo). One sentence; DISPLACES "in the adapter, the board or its ground wire, and you find it now with nothing attached to the 5 V".
- **[OK]** the lead map and the symptom list tell what red-on-Vin and red-on-3.3 V each produce; `inst-day15x-observe`'s 5 µs / 0.9° / ~20-per-count arithmetic checks against Day 15's numbers, and the observe task needs nothing the section withholds (MAXADC is given; SERVO_MAX − SERVO_MIN is theirs); Part 1's floating-signal reasoning states the mechanism.

---

# checker-technical-accuracy

### Verdict: BLOCKER

- **[BLOCKER] [L-6 / B-11c] `inst-day15x-checkpoint`** "one row over, on Vin": the header order is 5V, GND, Vin (`fig-tb6612-regulator`, both exports); one row over is GND (no motion, no damage), Vin is two over. Fix: name both misses.
- **[MAJOR] [B-11a] caption** "through a breadboard row": the yellow wire runs directly to the D11 header pin. Delete the phrase.
- **[MAJOR] [B-3 / P-12] the stretch** attributes "no signal, no power on the motor" to the reading; it is Day 15 Part 2's reveal (and the Reference). Say "on Tuesday".
- **[MAJOR] [B-1] Part 1's power-up rule** "the USB cable goes in first and then the adapter" is refuted by `task-day15x-5v`, which plugs the adapter in with no USB. Fix: "Whenever the servo is connected, the USB cable goes in first…"
- **[MINOR] [L-6]** "GND or Vin row beside it": Vin is not beside. Delete "beside it".
- **[MINOR] [B-2]** "20 counts of `pot_value`" → "codes" (Day 15's own word).
- **[MINOR] [B-3]** "0.9°" three lines after "less than 180°": on a short-travel servo one count moves less. Say so; DISPLACES seven words in the same block.
- **[MINOR] [B-1]** "channel numbers … not the pin numbers": on A0/A1 all three coincide; name the chapter's counter-example (A3 → PB1 → ADC_IN18, `ch-adc.ptx`).
- **[MINOR]** "may or may not have survived" → "may have been damaged".
- **[MINOR]** "tests each supply before anything is connected to it": only the 5 V is a supply; the second item is the pulse.

Verified: linter clean; all xrefs resolve and none sits inside an activity or instructor block; every activity has its instructor block; the arithmetic (5 µs, 200 steps, 0.9°, ≈20 codes per count, 5 µs > 1 µs dead band); the template's start-up `printf` supports "starts over from its first line"; `tim14_pwm_set(0)` → PA7 LOW all period (tim.c, RM0490 p. 478); Lab 5 p. 4's prototypes; Table 12 PA0 = ADC_IN0, PA1 = ADC_IN1; Lab 8 §3's order; ch-motors' USB-then-adapter. Unverified: the visible size of the 5 V dip on the real board; the signal input's current (no figure on the sheet); whether one count's step is visible through gear backlash.

---

# committee-synthesizer — the ruled list

1. **[B-11a/B-11c] No breadboard row on the signal; follow her drawing.** Caption, `task-day15x-leads`, symptom 1 and the stretch lose the row; the AD2 leaves the signal when the servo goes on; `task-day15x-observe-scope` becomes reasoning. No re-export asked. Net −24 words.
2. **[B-11c/L-6] `inst-day15x-checkpoint`**: one pin over is GND (no damage), two over is Vin (the adapter's raw input).
3. **[B-1] Part 1's power-up rule** → "Whenever the servo is connected, the USB cable goes in first and then the adapter."
4. **[B-6] "the damage happens immediately"** → the honest three-case statement; "may or may not have survived" → "may have been damaged".
5. **[B-6] "negligible current"** → well under the pin's 20 mA rating, against about 250 mA on the 5 V lead.
6. **[B-6] symptom 2**: the restarting printout is the proof of the reset; a twitch alone is also consistent with supply noise.
7. **[B-6] `inst-day15x-two-channels`**: the CCRDY caution, instructor only.
8. **[B-8/P-7/B-7] the lead map ×4** → Part 1 to a pointer plus "the signal lead goes to D11 (PA7), the pin TIM14 drives"; the caption to the potentiometer, the rightmost AIN pin, the shared ground and "brown drawn black".
9. **[P-2/B-8a] "not its GND or Vin pin"** in `task-day15x-leads`; symptom 1's clause shortened, "beside it" gone.
10. **[P-2/B-5] two paths → one**: the re-verification is for everyone and is where an unfinished Tuesday build is finished.
11. **[P-2/P-14] a "still does not move" branch** at the end of symptom 1: say so when your wiring is checked; the servo may have been damaged.
12. **[P-1] the 5 V check, one rewrite**: why the rail; 0 V vs a reading near the adapter's own voltage; the design commentary cut.
13. **[P-14/P-2] the buzzing servo** as student symptom 4.
14. **[P-5/B-6] "driven LOW by TIM14, whose compare value is 0 until the first reading"**; the floating clause tightened, "might".
15. **Voice rewrites verbatim**: the introduction in finite clauses; her slide 2 at the top of Part 2 and her slide 3 opening the unplug paragraph; Part 2's opening to one sentence of order; her slide 6 in `task-day15x-power` and `-leads`; "This x-hour", "the Day 15 checkpoint list"; Part 3's opening; the scope task as reasoning; "On Thursday" throughout the close; "Do not have students push on the arm".
16. **[B-3/P-12] the stretch's "the reading's"** → Tuesday's reveal (Part 2, not Part 6 as the synthesizer wrote; verified against lines 491–496).
17. **Four MINORs**: "codes"; 0.9° on a full-travel servo, less on a shorter one; the A3/PB1/ADC_IN18 counter-example; "brown out".
18. **[B-18/S-2] Part 3's task**: "Nothing here needs a working servo. On paper, with your Lab 5 `adc.c` open, …".
19. **[P-4/B-7] OWES note**: a refPage recall of `fig-servo-pulses` at the observe-center task (delivery 2).
20. **[B-6] `inst-day15x-stretch`**: why `tim14_pwm_set(0)` bypasses `updateServo()`.

Rejected or deferred: the Part 2 build-order table (B-18: a fifth statement of an order the five tasks and the new one-sentence opening already carry; recorded as the dissent of three reviewers, with the recovery named); re-cropping her figure (her no-zoom ruling); the logistics clock items (the plan's own Gate 1 re-check; the x-hour is Tuesday's overflow by design; the student residue is item 11); "what a student does before Thursday" (S-25); the multimeter step (a settled skill; B-18); the unpassed Day 12 table (re-check when Day 12 passes); "Tomorrow vs Thursday" ruled "On Thursday".

Ask-Petra: questions 10–12 (the arm on the horn; a single AD2 channel on the 5 V row now that channel 1 leaves the signal; the sub-180° travel); and, for the record, that her drawing runs the signal lead straight to D11, so the AD2 leaves the signal when the servo goes on.

# Applied (2026-09-05)

All twenty items applied and verified phrase by phrase against the finished file; see the commit after `ac46bde`. Item 16's attribution corrected to Day 15 Part 2 (`sl-day15-between-reveal`'s paragraph), where the sentence actually is.

# Petra's pass 1 (2026-09-06): the day restructured

Her message: the whole day was busy work; students who finish on Tuesday
power the servo on Tuesday and skip the x-hour; the others come and
complete it; the AD2 comes off and the servo goes on; the two-channel
recall is unnecessary; the wiring rules are not restated. Applied: the
wiring activity, the two rules (once), the circuit figure, the symptom
list and the instructor ladder are Day 15 Part 6's; Day 15x is her slide 2
plus pointers, with `day15x.json` as refPage recalls. Her 19 comments
(archived) were applied where their target survived: the `fig-servo-powering`
caption ("regulator board's 5V pin… and also never to the Nucleo's 3.3 V or
5V pin"), "When you are ready to power up, plug in the USB cable first", the
5 V sentence in bold with "we do not want to connect the servo until…",
"before connecting the servo" and the "Everyone does this" sentence
deleted, "the power adapter into the regulator board", "it should be 5 V",
"let us know", her Thursday sentence. Comments on Part 3 and the
observation tasks are moot with those parts gone; "never say they should
write" is a standing rule (memory). The committee's findings on Parts 2–3
of the first draft are void with the parts; items 1–14 that concerned the
wiring tasks and the symptom list carried over into Day 15 Part 6.
