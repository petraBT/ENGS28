# Day 16 — Photosensors and the solar tracker

**Thursday, 110 minutes** (Day N with N even is a Thursday — the day-parity
rule in `CLAUDE.md`). Chapter: `source/ch-photosensors.ptx` (placeholder —
nothing in it is trusted, ground truth §7). Old deck: `Day16-Photosensors.pptx`
(16 slides). Ground truth: `plans/week8-ground-truth.md`. Downstream: Lab 8
§2 (done in class, her arc) and §4 (designed in class, built in the lab).

## Objectives

By the end of class a student can:

1. Explain what a CdS photocell is and is not: a resistor whose value falls
   with light, cheap, nonlinear (a straight line only on log-log axes), and so
   different from unit to unit that it compares light levels rather than
   measuring them.
2. Put a resistive sensor into a voltage divider, write V_M = V_cc · R_M /
   (R_sens + R_M), predict which way V_M moves as the light changes, and say
   why the fixed resistor is chosen near the geometric mean of the sensor's
   extremes.
3. Read the PDV-P8001 datasheet for what the tracker needs: the sensitivity
   definition as a slope, the rise and fall times as a bound on how fast to
   sample, the spectral peak, the test conditions behind every number.
4. Recognize the same interface across the sensor family: thermistor,
   force-sensing resistor, potentiometer — one circuit, one ADC channel each.
5. Design the tracker's control loop from Lab 8 §4: the error e = V1 − V0, the
   update PWM(t+T) = PWM(t) + K·e, its sign, its bounds before CCR1, the
   sampling interval T from `milliseconds()`, and what K "on the order of
   0.01" means in integer arithmetic.
6. Mount two photocells on the servo arm, wire both dividers back to the
   breadboard and to two ADC channels, and print both readings.

## The CRUCIAL step

> **Every student's tracker arm carries two working photocell dividers whose
> two channels print on their screen, the servo still follows the pot, and the
> student has written down the loop's update rule with its sign, its bounds
> and its two tuning numbers.** *(Calibrated to her deck, which ends on "discuss
> how you might implement the feedback loop" — question 7.)*

Scaffolding (P-2):

- The divider is built on the breadboard first (Lab 8 Figure 2, her slide 9),
  with the AD2 voltmeter on both nodes before any code runs — so a wrong
  reading is separable into circuit vs program.
- The two-channel program is Wednesday's, with the pot's channel now a
  photocell's.
- The arm is the last mechanical step and changes no electrical node: the
  clips move the same two leads.
- The loop is designed on paper in the lab's own notation before anyone
  writes it, with the sign and the integer-K consequences committed to first.
- **Checkpoint at minute 50** (end of Part 2): a channel that reads a rail
  value is a divider wired to the wrong node; two channels that read the same
  value is the sequencer (Wednesday's reveal, said again once).

## The STRETCH

Run the loop in class: from the paper design, the first version with a fixed
step ±Δ (the lab's first equation), then the proportional one — and see it
hunt or lag. Fast finishers tune T and K and keep the log the lab asks for.
(This is Lab 8 D9's work started early, which is the lab's intent for the
afternoon; nothing about it appears in the book beyond the design.)

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 3 (LDR, physics, inaccurate) | reading (her/Adafruit's sentences) + Part 1 recall |
| 4–5 (nonlinear, log-log, the 0.6 relation) | Part 1, with the datasheet's sensitivity line as the datasheet moment |
| 6 (sensors based on resistance) | reading list + Part 3 |
| 7 (divider; "brighter: V_M up or down?") | Part 1's commit — the question stays out of the reading |
| 8–9 (Lab 8 Part 1 in class) | Part 2, in full, deliverables done by the students |
| 10 (servo test setup review) | Part 4's first beat (Wednesday's build, still wired) |
| 11–13 (assembly: cups, clips, recreate the circuit; remove the pot) | Part 4 |
| 14 (ultimate setup) | Part 4's figure (question 5 — the rail) |
| 15 (read *A Solar Tracker*; discuss the loop) | Part 5, as a designed loop with commits rather than an open discussion |
| 16 (survey) | dropped — course admin |

**No ordering change from her deck.** Part 3 (the sensor family) is her slide
6 moved after the lab work so the divider is concrete before it is
generalized — a swap of slides 6 and 7–9 only.

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 12 | predict → explain | **The photocell in the divider.** Her slide 7 figure; commit, `room="yes"`: *as the light gets brighter, does V_M increase or decrease?* Reveal from the formula: R_sens falls, V_M rises; swap the two resistors and it goes the other way (4). Why V_cc is 3.3 V here (the ADC's reference; standing rule) (1). The log-log family (her slides 4–5): straight on these axes only; **datasheet moment 1** — the PDV-P8001's sensitivity line, S = Δlog R / Δlog E = 0.6, is that slope, and "each photocell will be a little different" is why the sheet gives ranges (5). What that means for us: compare two, do not measure one (2) |
| 2 | 33 | do | **Lab 8 Part 1, in class.** The lab's §2 as printed; the book describes the activity and never its answers. Datasheet lookups (D1) and multimeter measurement (D2–3), at the table (6). R2 by the geometric-mean rule (D4) and the expected voltages (D5–6), on paper — the *why* of the rule taught in one sentence: the mid-value puts the dark and light readings farthest apart on the ADC's scale (7). Wire two dividers with the kit's 10 kΩ (Lab 8 Figure 2), AD2 voltmeter on both nodes (8). Wednesday's two-channel program with the two photocell nodes; one-second period; D7–D8 with the flashlight (10). Checkpoint minute 50 (2) |
| 3 | 8 | tell | **One circuit for a family.** Her slide 6: thermistor, force-sensing resistor, the potentiometer you have been using, the photoresistor — the same divider, an ADC channel each; strain gauges and load cells need more than a divider (5). **Datasheet moment 2**: the PDV-P8001's rise time 55 ms and fall time 20 ms — what that says about how often it is worth sampling (3) |
| 4 | 15 | do | **On to the arm.** The servo is still wired from Wednesday and still follows the pot — confirm it (her slide 10) (3). Photocells out of the breadboard and into the shielding cups; alligator clips from their leads back to the same breadboard rows, recreating the two dividers (her slides 11–13; Lab 8 App. A) (8). Both channels print again, now from the arm; sweep the flashlight across the arm and watch the two numbers cross (4) |
| 5 | 22 | predict → reveal, ×3 | **The loop we write.** Lab 8 Figure 6 beside her slide 8: the servo's loop and ours (2). Read *A Solar Tracker* (§4) at the table (4). Commit 1, `room="yes"`: *V1 > V0 — which way should the arm turn, and what sign does that give the step?* Reveal: e = V1 − V0; the sign depends on which cell is which and which way CCR1 moves the arm — find it on your own board, not in the book (4). Commit 2: *K = 0.01 and e = 50 — what step does integer arithmetic give?* Reveal: 0 — a dead zone near center, which is not all bad; and the ADC counts are used directly (the lab's VREF/4096 lumped into K); no floats needed (5). Commit 3: *what goes wrong with K too large, T too large?* Reveal: overshoot and hunting; lag — the lab's own words (3). Then the two safety facts said once: the bounds before CCR1 (`SERVO_MIN`/`SERVO_MAX`, Tuesday's `updateServo()`), and T kept with `milliseconds()` (Day 12) (4) |
| 6 | 10 | do | **Start the build.** Pseudocode of the loop at the table (read both channels, error, update, bound, write, wait T), then the fixed-step version if there is time — the stretch (8). What Lab 8 D9 and D10 ask, in one sentence each (2) |
| — | 5 | tell | **Close.** Lab 8 due Tuesday; the competing-light warning from the lab; the log of K and T (5) |

Total: 3+2+12+33+8+15+22+10+5 = **110**.

**If a part overruns, cut in this order:** Part 6 to its two-sentence close
(the lab has the build) → Part 3 to its datasheet beat only → Part 1's
log-log beat to one sentence with the figure. **Never cut** Part 2 (the lab's
§2 is this class, her arc) or Part 5's three commits (the design is the only
thing about D9 the class teaches).

## Datasheet moments (P-11)

1. **Part 1**: PDV-P8001 (`external/datasheets/CdS-photocell-PDV-P8001.pdf`),
   *Electro-optical characteristics* — the sensitivity row and its footnotes
   (R100/R10 at 100 and 10 lux, 2856 K), read as the slope of her log-log
   figure. **The dark and illuminated resistance rows are Deliverable 1 and
   are never printed in the book.**
2. **Part 3**: the same table's rise time and fall time.
3. **The reading**: a tour of the rest of the sheet — the spectral range and
   peak (520 nm) against the eye, the absolute maximum ratings, the package
   drawing (two leads, no polarity) — and the Adafruit guide's lux table for
   what 50, 500 and 10,000 lux look like.

## Writing room (S-2)

- Part 1: *brighter — V_M up or down?*
- Part 2: the lab's boxes are the writing room.
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

**Homework:** Lab 8, due Tuesday March 3 — D9 and D10 are theirs.

**Lab 8 needs from here:** §2 done (D1–D8), §3 done Tuesday/Wednesday, §4
designed; the bounds and `milliseconds()` named; the competing-light warning
heard.
