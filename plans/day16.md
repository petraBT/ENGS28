# Day 16 — Photosensors and the solar tracker

**Thursday, 110 minutes** (Day N with N even is a Thursday — the day-parity
rule in `CLAUDE.md`). Chapter: `source/ch-photosensors.ptx` (placeholder —
nothing in it is trusted, ground truth §7). Old deck: `Day16-Photosensors.pptx`
(16 slides). Ground truth: `plans/week8-ground-truth.md`, with its Day 16
Gate 0 block (2026-09-07). Gate 1 applied: `reviews/week8-gate1.md`; the
re-check against the Days 15/15x that Petra passed is at the end of this
file. Downstream: Lab 8 §2 (done in class, her arc) and §4 (designed in
class, built in the lab).

## Objectives

By the end of class a student can:

1. Explain what a CdS photocell is and is not: a resistor whose value falls
   with light, cheap, nonlinear (a straight line only on log-log axes), and so
   different from unit to unit that it compares light levels rather than
   measuring them — and say what comparing two cells does and does not
   cancel.
2. Put a resistive sensor into a voltage divider, write V_M = V_cc · R_M /
   (R_sens + R_M) (the same formula as Day 7's potentiometer), predict which
   way V_M moves as the light changes by following R_sens through the
   denominator, and say why the fixed resistor is chosen near the geometric
   mean of the sensor's extremes.
3. Read the PDV-P8001 datasheet for what the tracker needs: the sensitivity
   definition as the magnitude of a negative slope, the rise and fall times as
   a bound on how fast to sample, the spectral peak, the test conditions
   behind every number.
4. Recognize the same interface across the sensor family: thermistor,
   force-sensing resistor, potentiometer — one circuit, one ADC channel each.
5. Design the tracker's control loop from Lab 8 §4: the error e = V1 − V0, the
   update PWM(t+T) = PWM(t) + K·e, its sign (found on their own board), its
   bounds before CCR1, the sampling interval T from `milliseconds()`, and what
   K "on the order of 0.01" means in integer arithmetic — a dead zone whose
   width they can state.
6. Mount two photocells on the servo arm, wire both dividers back to the
   breadboard and to two ADC channels, and print both readings.

## The CRUCIAL step

> **Every student's tracker arm carries two working photocell dividers whose
> two channels (A0 and A1) print on their screen, the servo is still wired on
> its 5 V from Day 15 with the potentiometer out, and the student has the
> loop's update rule in hand with its sign, its bounds and its two tuning
> numbers.**
> *(Calibrated to her deck, which ends on "discuss how you might implement
> the feedback loop", and to her answers of 2026-09-03: the loop is their lab
> work, begun in class; the pot comes out on Thursday and the photocells go
> on A0 and A1.)*

Scaffolding (P-2):

- **Petra, 2026-09-06:** some students' servo arms already carry the
  photocells in their cups; others have to put theirs in. The assembly beat
  says so and is short for the first group.
- The lab work opens on a check, not a build: the servo follows the knob
  (Day 15's program is still on the board), then power comes off and the pot
  comes out. A servo that does not follow is Day 15 Part 6's symptom list, by
  xref.
- The divider is built on the breadboard first (Lab 8 Figure 2, her slide 9),
  with the AD2 voltmeter on both nodes before any code runs — so a wrong
  reading is separable into circuit vs program. **Two checkpoints in Part 2:**
  after the physical build (minute 39) and after the code (minute 53).
- The two-channel program is Lab 5's (Petra, 2026-09-03), with a photocell
  divider's node on each channel and `adc_setChannel()` before each read, in
  the students' own function names.
- The arm is the last mechanical step and changes no electrical node: the
  clips move the same two leads.
- The loop is designed at the table in the lab's own notation before anyone
  writes it, with the sign and the integer-K consequences committed to first;
  the sign is read off the sweep the student made in Part 4.
- **Checkpoint at minute 39** (Part 2, after the build): a node that reads a
  rail value is a divider wired to the wrong row; the AD2 voltmeter says
  which. **Checkpoint at minute 53** (end of Part 2): two channels that read
  the same value is the channel selection in the program, not the circuit.
  **Part 4's ladder** (minute 72), for the arm: a channel that stopped
  printing when the clips went on → the clip is on the wrong row or the lead
  is not in the clip; both channels the same → the two clips share a row.

## The STRETCH

Run the loop in class: from the paper design, the first version with a fixed
step ±Δ (the lab's first equation), then the proportional one — after
predicting whether the chosen K and T will hunt, lag or track — and see which
it does. Fast finishers tune T and K and keep the log the lab asks for. (This
is Lab 8 D9's work started early — her ruling, 2026-09-03: "the feedback loop
is on them - they can get started, but it's their lab work"; nothing about it
appears in the book beyond the design.)

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 1–2 (title, divider) | deck glue |
| 3 (LDR, physics, inaccurate) | reading (her/Adafruit's sentences); the resistance-falls fact lands in Part 1 beat 1's recall and the unit-variation point in beat 4 |
| 4–5 (nonlinear, log-log, the 0.6 relation) | Part 1, with the datasheet's sensitivity line as the datasheet moment |
| 6 (sensors based on resistance) | reading list + Part 3 (her slide is text; its image is the slide 7 divider again) |
| 7 (divider; "brighter: V_M up or down?") | Part 1's commit — the question stays out of the reading |
| 8–9 (Lab 8 Part 1 in class) | Part 2, in full, deliverables done by the students |
| 10 (review: servo test setup) | Part 2's opening check: the servo still follows the knob, `fig-servo-powering` by xref (refPage on the deck) |
| 11–13 (assembly: cups, clips, recreate the circuit; **remove the pot**) | the pot comes out at Part 2's opening (her answer, 2026-09-03: "they take the potentiometer out and follow the lab instructions on Thursday"); cups and clips are Part 4; the "physically located in the cups" callout is the end-state figure's caption |
| 14 (ultimate setup: two dividers and the servo, **no pot**) | Part 4's end-state figure: **her export `week8FullLabSetup.png`** (dividers on A0 and A1, servo on the regulator's 5V) |
| 15 (read *A Solar Tracker*; discuss the loop) | Part 5 — **ours, expanded** from her one discussion slide into three commits in Lab 8 §4's own notation (question 7) |
| — | **Part 6 is ours** (question 7, her "they can get started"): her deck ends at slide 15; the build starts in class so the lab's afternoon has a running start. Named again in the delivery message as the one addition |
| 16 (survey) | dropped — course admin |

**One ordering change from her deck, named:** Part 3 (the sensor family) is
her slide 6 moved after the lab work so the divider is concrete before it is
generalized — a swap of slides 6 and 7–9 only.

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 10 | predict → explain | **The photocell in the divider.** Recall from the reading: its resistance falls as the light rises (1). You have built a divider before: Day 7's potentiometer, V_wiper = V·R2/(R1+R2), the same formula with the bottom resistor in the numerator. Her slide 7 figure (redrawn); commit, `room="yes"`: *as the light gets brighter, does V_M increase or decrease?* Reveal by walking the formula: R_sens is in the denominator, so as it falls the denominator falls and V_M rises — with throwaway numbers that are not the lab's (R_sens 20 kΩ over R_M 10 kΩ at 3.3 V gives 1.1 V; R_sens down to 10 kΩ gives 1.65 V); swap the two resistors and it goes the other way, same formula; V_cc is 3.3 V, the ADC's reference, in a parenthesis (5). The log-log family (her slides 4–5): both axes are logarithmic, so a power law is a straight line — on these axes only; **datasheet moment 1** — the PDV-P8001's sensitivity row, typ 0.6, is the slope: ten times the light divides the resistance by about 4 (the row's definition and the sign of the slope are in the Reference, the Gate 2 move that pays for the rebudget) (2). What that means for us: compare two cells, do not measure one — comparison cancels the curve shape the two cells share, and what it does not cancel is unit-to-unit mismatch, which is why the sheet prints ranges (2) |
| 2 | 38 | do | **Lab 8 §2, in class.** The lab's §2 as printed; the book describes the study and never its answers. Opening check: USB first, then the adapter; turn the knob and the servo follows (Day 15's program is still on the board), and note which way the arm turns as the knob raises the reading (the sign fact Part 5 needs, which Day 15 never asked for); then the adapter out, the USB out, and the potentiometer comes out — its channel, A0, is a photocell's; the study and the arm do not depend on the servo, said in the task (3). Datasheet lookups (D1) and multimeter measurement, covered and lit (D2–3), at the table (6). R2 by the geometric-mean rule (D4) and the expected voltages (D5–6), on paper — the *why* of the rule in one sentence, the reasoning in the Reference (5). Wire two dividers with the kit's 10 kΩ, their nodes on A0 and A1 (Lab 8 Figure 2; her `week8FullLabSetup.png` is the end state), AD2 voltmeter on both nodes (10). **Checkpoint minute 39**: a node at a rail value is a divider on the wrong row (1). Your two-channel program from Lab 5 with the two photocell nodes; one-second period; D7–D8 with the flashlight (11). Checkpoint minute 53, a hard stop: whoever is not printing both channels finishes D7–D8 as the first step of Lab 8 (2) |
| 3 | 5 | tell | **One circuit for a family.** Her slide 6: thermistor, force-sensing resistor, the potentiometer you have been using, the photoresistor — the same divider, an ADC channel each; strain gauges and load cells need more than a divider (3). **Datasheet moment 2**: the PDV-P8001's rise time 55 ms and fall time 20 ms, and the servo's 0.1 s per 60° from its own sheet — against the lab's one-second sampling and the loop's T: tens of milliseconds means a sampling interval of a tenth of a second has room to spare, and faster than the arm can move buys nothing (2) |
| 4 | 14 | do | **On to the arm.** Photocells out of the breadboard and into the shielding cups (already done on some arms); alligator clips from their leads back to the same breadboard rows, recreating the two dividers — the end state is her `week8FullLabSetup.png` (her slides 11–13; Lab 8 App. A) (7). Both channels print again, now from the arm; sweep the flashlight across the arm and note which channel rises as the light moves which way — the sign of the loop's step (4). Checkpoint minute 72, the arm ladder above (3) |
| 5 | 22 | predict → reveal, ×3 | **The loop we write.** Lab 8 Figure 6 beside her slide 8: the servo's loop and ours (the two-loops figure) (2). Read *A Solar Tracker* (§4) at the table — the block diagram and the error/update paragraph only (3). Commit 1, `room="yes"`: *V1 > V0 — which way should the arm turn, and what sign does that give the step?* Reveal: e = V1 − V0; the sign depends on which cell is which and which way CCR1 moves the arm — you noted it from your own sweep, not from the book (4). Commit 2: *K = 0.01 and e = 50 — what step does integer arithmetic give?* Reveal: K stored as an integer is already 0, and even scaled so it is not, any error under about 100 counts gives a step of zero — a dead zone of about ±100 counts, about 0.08 V, inside which the arm stops correcting. Keeping the arithmetic in integers is a trade (a smaller loop, no float library) with that cost; the ADC counts are used directly (5). Commit 3: *what goes wrong with K too large, T too large?* Reveal: overshoot and hunting; lag (3). Now read the lab's tuning paragraph: its own words for what you just worked out (1). Then the two facts said once: the bounds before CCR1 (the lab's ±60° of center, narrower than Tuesday's `SERVO_MIN`/`SERVO_MAX`, applied where `updateServo()` applies them), and T kept with `milliseconds()` — Day 12's function, shown as the two lines it takes (4) |
| 6 | 11 | do | **Start the tracker — their lab work, begun in class.** What Lab 8 D9 and D10 ask, the competing-light warning and the K/T log first, so they survive an overrun (2). Plan the loop at the table — read both channels, error, update, bound, write, wait T — kept as words, not as the course's function names, then the fixed-step version if there is time — the stretch; the wrong-sign symptom (pinned at one end) stated here, where the action is (9) |
| — | 5 | tell | **Close.** Lab 8 is next; the warning and the log were said at the top of Part 6 (5) |

Total: 3+2+10+38+5+14+22+11+5 = **110** (Gate 2 rebudget: Part 1's log-log identity and Part 2's geometric-mean reasoning moved to the Reference, their four minutes to the two first-time hardware steps in Part 2).

**If a part overruns, cut in this order (against the Parts as passed on
2026-09-08, 1 to 5):** Part 5's opening to one sentence (the deliverables are
on the slide and in the handout) → Part 4's discussion to the sign question
only, with the other two read aloud from the instructor reveal → Part 3's
checkpoint done by walking the room rather than a full pause → Part 1's
log-log relation to its closing line with the figure up. **Never cut Part 2**:
Part 1 of Lab 8 is this class, and it is her arc. (The table above is the
Gate 2 plan; the passed structure and its budget, 3+2+10+38+17+20+15+5 = 110,
are in the pass blocks at the end of this file.)

## Datasheet moments (P-11)

1. **Part 1**: PDV-P8001 (`external/datasheets/CdS-photocell-PDV-P8001.pdf`),
   *Electro-optical characteristics* — the sensitivity row and its footnotes
   (R100/R10 at 100 and 10 lux, 2856 K), read as the slope of her log-log
   figure. **The dark and illuminated resistance rows are Deliverable 1 and
   are never printed in the book.**
2. **Part 3**: the same table's rise time and fall time, and the servo
   datasheet's speed.
3. **The reading**: a tour of the rest of the sheet — the spectral range and
   peak (520 nm) against the eye, the absolute maximum ratings, the package
   drawing (two leads, no polarity) — and the Adafruit guide's lux table for
   what 50, 500 and 10,000 lux look like.

## Writing room (S-2)

- Part 1: *brighter — V_M up or down?*
- Part 2: the lab's boxes are the writing room.
- Part 4: *which channel rises as the light moves which way?*
- Part 5: the three commits — the sign, the integer step, too-large K and T.

## Hand-offs

**Pre-class reading (B-2, ideas only):** the photocell and why it is a
comparator not a meter (her/Adafruit's sentences, cited); the resistance-based
family; the divider as the interface, formula only; the datasheet tour above;
what a solar tracker is (Lab 8 §4's first two sentences). **Must not contain:**
the direction answer (Part 1's commit), any of the protected numbers (ground
truth §4), the loop's update rule (Part 5 derives it from the lab), tracker
code of any kind.

**Reading questions (B-3):** what a photocell's resistance does with more
light; why two cells of the same part read differently; which way a divider's
output moves (asked for the *swapped* divider, so the class commit stays
fresh); a datasheet lookup that is not Deliverable 1 (the spectral peak, or
the rise time); which of the sensor family needs a different circuit.

**Homework:** Lab 8, due Tuesday March 3 — D9 and D10 are theirs. Nothing
else is due (Petra, 2026-09-03).

**Figures:** the two-loops figure is her slide 8 diagram beside Lab 8 Figure
6 (extracted from the lab PDF) in one `<sidebyside>`; the divider is redrawn
as an SVG with her slide 7's labels; the wiring figure is
`week8FullLabSetup.png`.

**Lab 8 needs from here:** §2 done (D1–D8), §3 done on Day 15, §4 designed;
the bounds and `milliseconds()` named; the competing-light warning heard.

## Gate 1 re-check (2026-09-07), against the Days 15 and 15x Petra passed

`reviews/week8-gate1.md` reviewed this plan on 2026-09-02. Since then Day
15x became a work session (2026-09-06), the servo wiring moved to Day 15
Part 6, and Petra answered the questions the plan cited. Each Day 16
finding, by its ruling number:

- **Ruling 7 (the pot comes out; Part 4 confirms the servo with a ladder;
  the sweep asks which channel rises) — partly superseded.** Her answer of
  2026-09-03 puts the pot's removal at the start of Thursday's lab work, so
  the servo check and the removal open Part 2, not Part 4; the check is a
  check (turn the knob), and a servo that does not follow is Day 15 Part 6's
  symptom list by xref, not a new ladder. The sweep-asks-which-channel item
  is live and is Part 4's observation task.
- **Ruling 8 (Part 5's reading split; commit 2 states the ±100-count bound
  and frames integer K as a trade; VREF/4096 to the Reference;
  `milliseconds()` taught as Day 12 recall) — live**, applied in the prose.
- **Ruling 9 (Part 2's two checkpoints; the dark-reading technique) —
  live, with one change**: the technique is not invented (B-11c); the
  instructor block says "covered" and the delivery message asks her.
- **Ruling 10 (Part 1 recalls before it commits; Day 7's divider; the
  denominator walked with throwaway numbers; the compare-two caveat; the
  slope's sign; log-log in one clause) — live.**
- **Ruling 11 (Part 3 closes its argument: rise and fall times and the
  servo's 0.1 s per 60° against T) — live.**
- **Ruling 12 (additions named) — live**, and read now under B-19: Part 5
  is her slide 15's discussion given three questions to discuss; Part 6 is
  the one Part with no slide of hers, licensed by her "they can get started"
  and asked about again with the book.
- **Logistics, "the Day 15x → Day 16 recovery path is uncosted" — void.**
  Day 15x is a work session and teaches nothing Thursday depends on. A
  student whose servo is not yet working does Parts 1 to 3 unaffected and
  Part 4's electrical half; the instructor block for Part 2's opening says
  so.
- **Logistics, "Part 4 underbudgets first-time assembly" — superseded** by
  Petra (2026-09-06): some arms already carry the photocells. Part 4 is 14
  minutes with the cups and clips at 7.
- **Anxious learner, "Part 4's confirm has no ladder" — superseded**: the
  check moved to Part 2's opening and the ladder is Day 15's.
- **Cognitive load, "Part 1 carries five ideas" — live** as the cut order
  (the log-log beat first).

**Rebudget** (the prompt's three changes: the pot comes out at the start of
Part 2, the servo confirmation is a check and not a build, and Part 4's
assembly is short for loaded cups): 3+2+12+**36**+**5**+**14**+22+**11**+5 =
110. Part 2's beats: 3+6+5+10+1+11+2 (checkpoints at 39 and 53); Part 4's
beats: 7+4+3 (checkpoint at 72); Part 5's beats: 2+3+4+5+3+1+4; Part 6's
beats: 2+9. Gate 2 (2026-09-07) moved two minutes each from Part 1 and Part 2's
paper beat to Part 2's two first-time hardware steps: 3+2+10+38+5+14+22+11+5.

## Petra's pass 1 (2026-09-08): stick to her slides, give them lab time

Her 38 comments (archived in `reviews/slide-comments-archive.jsonl`). The
in-class section is now her deck and nothing else: Part 1 is her slide 7's
question with a two-sentence reveal, her slides 4–5 on the nonlinearity
(the log-log relationship on its own line, symbols defined) and one
paragraph on comparing two cells that differ; Part 2 is one sentence ("We'll
now give you some time to work through Part 1 of Lab 8"), the servo check
with the lab's "you can remove the pot" clause, Lab 8's Figures 1 and 2 and
its deliverables in the lab's own words; Part 3 is her slide 6; Part 4 is
her slides 11–14; Part 5 is her slide 15 (read §4, discuss) with the three
questions as the discussion's prompts and their answers in an instructor
block; Part 6 is lab time with Deliverables 9 and 10 and the lab's
competing-light sentence. The Part 1 recall, the round-number reveal, the
geometric-mean teaching, the divider-wiring and two-channel prose, the
invented sweep task and symptom paragraph, and the Part 5 reveal paragraphs
are gone. Budget: 3+2+10+38+3+14+20+15+5 = 110 (Part 5's beats 3+5+12;
Part 6 is lab-work time). The reading: "identify"; photocells age (the
"do not wear out" claim was wrong); the sensor family as bullets; "is
placed", "resembles", R_sens for R_1 and R_M for R_2; no A0/A1 on the
divider figure; the datasheet's test conditions per row (illuminated under
10 lux, dark 10 s after the light is removed, sensitivity 100 vs 10 lux),
a row lists a range; "applied voltage" is the maximum that may be applied;
the phone-flashlight sentence deleted; the guide linked; her tracker
sentence, plus that real trackers compute the sun's position.

## Petra's pass 2 (2026-09-08): 20 comments applied

The servo check is gone from Part 2 ("the technical study of photocells
does not use the servo"); Part 2 is one sentence plus the pot coming off
A0 with nothing powered, then Lab 8's own deliverables. Part 3 (her slide
6, the sensor family) is deleted: it is the reading. The Parts are now 1
(the divider question and the nonlinearity), 2 (Part 1 of Lab 8), 3 (her
slides 10-14: the servo test setup recalled in one sentence, cups, clips,
the ultimate setup), 4 (her slide 15, read and discuss), 5 (lab time).
Budget: 3+2+10+38+17+20+15+5 = 110. Lab 8 Figure 1 relabeled V_1 in the
image. The reading: photocells age (no light-history claim), no "which of
two cells receives more light" (contradicts the 50%), "contains", "one
page long", "no polarity", "look at in class on a plot". Part 1: one intro
sentence with the figure and the names; the nonlinearity in short
sentences, the plot credited to the guide and the 0.6 to the datasheet's
Sensitivity row, the "factor of 10 in light, factor of about 4 in
resistance" sentence in words. Part 4: complete sentences, "the tracking
loop, the one that points the arm at the light", "a controller gain K".
Part 5: "may all attract". Reference: the swapped-divider formula removed.
