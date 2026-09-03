# Day 16 — Photosensors and the solar tracker

**Thursday, 110 minutes** (Day N with N even is a Thursday — the day-parity
rule in `CLAUDE.md`). Chapter: `source/ch-photosensors.ptx` (placeholder —
nothing in it is trusted, ground truth §7). Old deck: `Day16-Photosensors.pptx`
(16 slides). Ground truth: `plans/week8-ground-truth.md`. Gate 1 applied:
`reviews/week8-gate1.md`. Downstream: Lab 8 §2 (done in class, her arc) and
§4 (designed in class, built in the lab).

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
> its 5 V from Wednesday with the potentiometer out, and the student has
> written down the loop's update rule with its sign, its bounds and its two
> tuning numbers.**
> *(Calibrated to her deck, which ends on "discuss how you might implement
> the feedback loop", and to her answer of 2026-09-03: the pot comes out on
> Thursday and the photocells go on A0 and A1 — question 7 for the
> designed-vs-running calibration.)*

Scaffolding (P-2):

- The divider is built on the breadboard first (Lab 8 Figure 2, her slide 9),
  with the AD2 voltmeter on both nodes before any code runs — so a wrong
  reading is separable into circuit vs program. **Two checkpoints in Part 2:**
  after the physical build (minute 38) and after the code (minute 50).
- The two-channel program is one the class has written before (Petra,
  2026-09-03), with a photocell divider's node on each channel.
- The arm is the last mechanical step and changes no electrical node: the
  clips move the same two leads.
- The loop is designed on paper in the lab's own notation before anyone
  writes it, with the sign and the integer-K consequences committed to first;
  the sign is read off the sweep the student made in Part 4.
- **Checkpoint at minute 38** (Part 2, after the build): a node that reads a
  rail value is a divider wired to the wrong row; the AD2 voltmeter says
  which. **Checkpoint at minute 50** (end of Part 2): two channels that read
  the same value is the channel selection in the program, not the circuit.
  **Part 4's ladder** (minute 78), for the arm: a channel that stopped
  printing when the clips went on → the clip is on the wrong row or the lead
  is not in the clip; both channels the same → the two clips share a row;
  the servo twitches when the flashlight moves → nothing is wrong, Tuesday's
  program is still on the board and A0 is now a photocell.

## The STRETCH

Run the loop in class: from the paper design, the first version with a fixed
step ±Δ (the lab's first equation), then the proportional one — after writing
one sentence predicting whether the chosen K and T will hunt, lag or track —
and see which it does. Fast finishers tune T and K and keep the log the lab
asks for. (This is Lab 8 D9's work started early — her ruling, 2026-09-03:
"the feedback loop is on them - they can get started, but it's their lab
work"; nothing about it appears in the book beyond the design.)

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 1–2 (title, divider) | deck glue |
| 3 (LDR, physics, inaccurate) | reading (her/Adafruit's sentences); in class, the resistance-falls fact is Part 1's opening recall and the unit-variation point is Part 1's last beat |
| 4–5 (nonlinear, log-log, the 0.6 relation) | Part 1, with the datasheet's sensitivity line as the datasheet moment |
| 6 (sensors based on resistance) | reading list + Part 3 |
| 7 (divider; "brighter: V_M up or down?") | Part 1's commit — the question stays out of the reading |
| 8–9 (Lab 8 Part 1 in class) | Part 2, in full, deliverables done by the students |
| 10 (servo test setup review) | Part 4's first beat: Wednesday's build is still wired (one recall slide, `towerProPowering.png`) |
| 11–13 (assembly: cups, clips, recreate the circuit; **remove the pot**) | Part 4 — the pot came out at the start of Part 2 (her answer, 2026-09-03: "they take the potentiometer out and follow the lab instructions on Thursday"); the "physically located in the cups" callout goes on the end-state figure |
| 14 (ultimate setup: two dividers and the servo, **no pot**) | Part 4's end-state figure: **her export `week8FullLabSetup.png`** (dividers on A0 and A1, servo on the regulator's 5V) |
| 15 (read *A Solar Tracker*; discuss the loop) | Part 5 — **ours, expanded** from her one discussion slide into three commits in Lab 8 §4's own notation (question 7) |
| — | **Part 6 is ours** (question 7): her deck ends at slide 15; the build starts in class so the lab's afternoon has a running start |
| 16 (survey) | dropped — course admin |

**One ordering change from her deck, named:** Part 3 (the sensor family) is
her slide 6 moved after the lab work so the divider is concrete before it is
generalized — a swap of slides 6 and 7–9 only.

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 12 | predict → explain | **The photocell in the divider.** Recall from the reading: its resistance falls as the light rises. And you have built a divider before: Day 7's potentiometer, V_wiper = V·R2/(R1+R2), the same formula with the bottom resistor in the numerator. Her slide 7 figure; commit, `room="yes"`: *as the light gets brighter, does V_M increase or decrease?* Reveal by walking the formula: R_sens is in the denominator, so as it falls the denominator falls and V_M rises — with throwaway numbers that are not the lab's (R_sens 20 kΩ over R_M 10 kΩ at 3.3 V gives 1.1 V; R_sens down to 10 kΩ gives 1.65 V); swap the two resistors and it goes the other way, same formula (4). Why V_cc is 3.3 V here (the ADC's reference; standing rule) (1). The log-log family (her slides 4–5): both axes are logarithmic, so a power law is a straight line — on these axes only; **datasheet moment 1** — the PDV-P8001's sensitivity line, S = Δlog R / Δlog E = 0.6, is the magnitude of that slope (it is negative: R falls as E rises), and "each photocell will be a little different" is why the sheet gives ranges (5). What that means for us: compare two cells, do not measure one — comparison cancels the curve shape the two cells share, and what it does not cancel is unit-to-unit mismatch, which is why the sheet prints ranges (2) |
| 2 | 33 | do | **Lab 8 Part 1, in class.** The lab's §2 as printed; the book describes the activity and never its answers. The potentiometer comes out — its channel, A0, is the first photocell's (her answer, 2026-09-03). Datasheet lookups (D1) and multimeter measurement (D2–3), at the table (presenter note: a closed fist over the cell is dark enough) (6). R2 by the geometric-mean rule (D4) and the expected voltages (D5–6), on paper — the *why* of the rule taught in one sentence: the mid-value puts the dark and light readings farthest apart on the ADC's scale (7). Wire two dividers with the kit's 10 kΩ, their nodes on A0 and A1 (Lab 8 Figure 2; her `week8FullLabSetup.png` is the end state), AD2 voltmeter on both nodes (8). **Checkpoint minute 38**: a node at a rail value is a divider on the wrong row (1). Your two-channel program from earlier in the term with the two photocell nodes; one-second period; D7–D8 with the flashlight (9). Checkpoint minute 50 (2) |
| 3 | 6 | tell | **One circuit for a family.** Her slide 6: thermistor, force-sensing resistor, the potentiometer you have been using, the photoresistor — the same divider, an ADC channel each; strain gauges and load cells need more than a divider (4). **Datasheet moment 2**: the PDV-P8001's rise time 55 ms and fall time 20 ms, and the servo's 0.1 s per 60° from its own sheet — against the lab's one-second sampling and the loop's T: tens of milliseconds means a sampling interval of a tenth of a second has room to spare, and faster than the arm can move buys nothing (2) |
| 4 | 17 | do | **On to the arm.** The servo is still wired on its 5 V from Wednesday — one recall slide, her `towerProPowering.png`, and the check order from Day 12 if anything has moved: power, ground, signal (2). Photocells out of the breadboard and into the shielding cups; alligator clips from their leads back to the same breadboard rows, recreating the two dividers — the end state is her `week8FullLabSetup.png` (her slides 11–13; Lab 8 App. A) (8). Both channels print again, now from the arm; sweep the flashlight across the arm and write down which channel rises as the light moves which way — the sign of the loop's step (4). Checkpoint minute 78, the arm ladder above (3) |
| 5 | 22 | predict → reveal, ×3 | **The loop we write.** Lab 8 Figure 6 beside her slide 8: the servo's loop and ours (the two-loops figure) (2). Read *A Solar Tracker* (§4) at the table — the block diagram and the error/update paragraph only (3). Commit 1, `room="yes"`: *V1 > V0 — which way should the arm turn, and what sign does that give the step?* Reveal: e = V1 − V0; the sign depends on which cell is which and which way CCR1 moves the arm — you wrote it down from your own sweep, not from the book (4). Commit 2: *K = 0.01 and e = 50 — what step does integer arithmetic give?* Reveal: K stored as an integer is already 0, and even scaled so it is not, any error under about 100 counts gives a step of zero — a dead zone of about ±100 counts, about 0.08 V, inside which the arm stops correcting. Keeping the arithmetic in integers is a trade (a smaller loop, no float library) with that cost; the ADC counts are used directly (5). Commit 3: *what goes wrong with K too large, T too large?* Reveal: overshoot and hunting; lag (3). Now read the lab's tuning paragraph: its own words for what you just worked out (1). Then the two safety facts said once: the bounds before CCR1 (`SERVO_MIN`/`SERVO_MAX`, Tuesday's `updateServo()`), and T kept with `milliseconds()` — Day 12's function, shown as the two lines it takes (4) |
| 6 | 10 | do | **Start the build — their lab work, begun in class.** Pseudocode of the loop at the table — read both channels, error, update, bound, write, wait T — kept as words, not as the course's function names, then the fixed-step version if there is time — the stretch (8). What Lab 8 D9 and D10 ask, in one sentence each (2) |
| — | 5 | tell | **Close.** Lab 8 due Tuesday; the competing-light warning from the lab; the log of K and T (5) |

Total: 3+2+12+33+6+17+22+10+5 = **110**.

**If a part overruns, cut in this order:** Part 6 to its two-sentence close
(the lab has the build) → Part 3 to its datasheet beat only → Part 1's
log-log beat to one sentence with the figure → Part 4's clip check done by
the instructor walking the room rather than a full pause. **Never cut** Part
2 (the lab's §2 is this class, her arc) or Part 5's three commits (the design
is the only thing about D9 the class teaches).

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

**Figures this day needs that do not exist:** the two-loops figure (her slide
8 beside Lab 8 Figure 6 — hand-author). The wiring figure exists:
`week8FullLabSetup.png`.

**Lab 8 needs from here:** §2 done (D1–D8), §3 done Tuesday/Wednesday, §4
designed; the bounds and `milliseconds()` named; the competing-light warning
heard.
