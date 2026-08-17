# Day 11 — Gate 2 committee (the book)

Reviewing the Day 11 delivery of `source/ch-motors.ptx`: the Before Class reading
(`sec-motors-concepts`) and the in-class Parts 1–6 (`sec-motors-day11`). The
commented Day 11x/12 placeholder is out of scope.

Panel: `checker-technical-accuracy` (×2, Parts 1–3 and Parts 4–6 + self-contradiction),
`checker-voice`, `checker-figure-claims`, `expert-cognitive-load`,
`expert-continuity-auditor`, `expert-class-logistics`, `learner-visual`,
`learner-firstgen-novice`, `learner-anxious-nonhardware`, plus rotators
`expert-rigor-hawk` and `learner-weak-circuits`. Run 2026-08-14.

Reports are pasted below as they complete; the synthesizer consolidates them into
the applied change list.

---

## learner-anxious-nonhardware — BLOCKER

- **[BLOCKER] P-14/P-2** Part 4 verify task: only guidance is for a *partial* mismatch; no path for "nothing moves in any setting" (the expected first-time regulator-build failure). Add one diagnostic sentence distinguishing "no response at all" (check the regulator is producing 5 V at VM first) from "one wrong response." *(Weigh vs S-25 — a concrete physical check is a diagnostic, not classroom management; keep to one sentence, no ladder.)*
- **[BLOCKER] P-2/B-4** Part 6 depends entirely on a working Part 4 circuit with no re-entry point. Add one sentence: a student not continuing from a working Part 4 can wire `fig-tb6612-wiring-2` directly. *(Weigh vs S-25.)*
- **[MAJOR] P-14/P-2** `act-day11-demo`: no guidance if the motor doesn't move / scope shows nothing when the program runs. State what to check first (build OK, board/port, PA7/PA5/PA6 wiring). *(Weigh vs S-25.)*
- **[MAJOR] P-1/B-11c** Part 4 says nothing about what is/isn't at risk at the regulator stage (barrel jack keyed? caps backwards?). **Needs a fact I don't have — ASK PETRA rather than invent.**
- **[MINOR] P-2** ch-motors.ptx:654 "move just three wires" → drop "just."
- **[MINOR] P-3** The stretch ("A further question, once the ramp is running…") isn't marked optional; frame as extra without manufactured urgency.

## learner-firstgen-novice — BLOCKER

- **[BLOCKER] P-2/P-4/B-5** Part 4 names wall adapter + barrel connector + L7805, but the cited figure `fig-tb6612-wiring` (slide17_1573fa6d) shows NONE of them — power-rail wires just end at the breadboard edge. And the whole build is one verb ("wire the circuit"). Fix: (a) a labeled figure of the barrel→L7805→caps sub-assembly + break the build into ordered `<task>`s, or (b) if handed over pre-built, say so. **Figure gap — needs Petra's wiring slide.**
- **[MAJOR] B-5/P-2** `task-day11-dir-verify` "Apply power" bundles two never-named actions (plug wall adapter for VM; USB for VCC). Split into two explicit tasks naming each supply.
- **[MAJOR] P-1/P-4** `task-day11-pwm-pin` sends to "Table 12" with no page number / no screenshot, unlike the truth-table activity (which gives p.4 + inline image). Give the page number or a cropped Table 12 row.
- **[MINOR] P-1/B-12** "breakout board" and "logic-level pins" never defined; used repeatedly. One clause on first use (Part 3).
- **[MINOR] P-4** The regulator caps (0.22 µF, 0.1 µF) are never mentioned though students place them (ground truth §3). Name/show them if students wire them — folds into the figure fix.

## expert-continuity-auditor — MINOR (one MAJOR)

- **[MAJOR] P-1/continuity** "no true DAC" (Part 1 ~358, Part 5 ~584) never ties back to Day 7, where DAC was taught as an internal ADC component (`ch-adc.ptx:240`). A student who remembers Day 7's DAC reads "no true DAC" as a contradiction. Restore the Gate-1 clause (dropped from the draft): distinguish the ADC's internal DAC from a pin-drivable output. Also Part 5's "the reading gave the idea… no true DAC" misattributes — the reading never says "DAC" (only that a GPIO pin is binary); fix the attribution.
- **Confirmed genuine:** Day 7 sensor-chain, Day 6 N-channel/P-channel (term-for-term), Day 8 TIM14 (Day 8 even forward-declares PWM for the motor chapters), Day 10 dimming, Lab 6 scope match (P-13 satisfied both ways), register work correctly deferred to 11x, 5 V/3.3 V rails handled per the CLAUDE.md exception.

## checker-technical-accuracy (Parts 1–3 + reading) — MINOR

Truth table, physics, arithmetic, all callbacks: VERIFIED correct (TB6612 table line-by-line vs datasheet p.4; torque∝current, back-EMF, speed∝V correctly hedged; N-/P-channel matches Day 6 term-for-term; CW/CCW/brake figures match). No BLOCKER/MAJOR.

- **[MINOR] figure** `fig-tb6612-internal` caption says "for one motor channel," but the image (slide15) is the FULL dual-channel block diagram (Control Logic A+B, AIN/BIN, AO/BO). Fix caption: it's the whole chip with two independent channels A and B; this course uses channel A. (Or crop to one channel.)
- **[MINOR] figure** `fig-hbridge-concept` image labels the motor rail "Motor VCC," but the book uses VCC = 3.3 V logic and VM = motor supply. Add a caption note that "Motor VCC" here means the motor supply (VM). (Stray baked-in label "Figure 15-2" is cosmetic.)
- **[MINOR] nuance** Part 3 "PWM switches it on and off" — with a direction selected, PWM = LOW is *short brake*, not coast. Optional half-sentence; not an error.
- STBY pull-up sourced only to Petra's deck note (accepted); Adafruit schematic not independently consulted.

## checker-voice — MINOR (one MAJOR)

Substantially her voice: plain, "we"-voiced, acronyms expanded, reasons given, no aphorism problem. Reuse tracked (dimming callback, "fast PWM" correctly avoided, real driver constants). Fixes:
- **[MAJOR] S-11** Part 5 lead "The H-bridge sets direction; PWM sets speed." — the contrastive epigram she cuts. → "The H-bridge sets the motor's direction. In this part we turn to its speed, which we set with PWM."
- **[MINOR] S-16** line 122 "the whole point" → "the point" (strip intensifier; claim unchanged).
- **[MINOR] S-22** Part 3 opens on "We do not wire the four switches ourselves." → open on the TB6612; keep the contrast at the tail.
- **[MINOR] S-20** instructor block "the two knobs the rest of the hour builds hardware for" → "…we spend the rest of the hour building hardware for."
- **[MINOR] S-12** "STBY" first use → "STBY (standby)".
- **[MINOR] S-12** DAC first body use → add "(digital-to-analog converter)".
- **[MINOR] S-26** Part 4 switches IN1/IN2 → AIN1/AIN2 with no bridge. Add a clause: the breakout labels channel A's IN1/IN2 as AIN1/AIN2.
- **[MINOR] S-23** Part 6 "You are running it today, not writing it —" → "You will run it today; we will go through…".

## expert-rigor-hawk — MAJOR

- **[MAJOR] B-6** line ~707 "2 MHz — the 12 MHz clock divided down" never states the divisor. Add "divided by 6" (a plain number, not a register).
- **[MAJOR] P-3/B-5** the Part 6 stretch is loose prose, not an `<activity>`, not marked for early finishers, and doesn't stretch (frequency handed then "confirm"; 30%×1250 repeats the reading's 30%×5). Restructure as an early-finisher `<activity>`: derive the frequency from the clock + top count; replace the 30% question with one requiring reasoning (e.g. "what compare value would double the current speed").
- **[MAJOR] B-6** line 68 back-EMF "grows with speed" → "proportional to speed" (matches torque∝current's precision; E = Kₑω).
- **[MAJOR] B-6, WEIGH DOWN** wants V = IR + Kₑω shown in the reading to earn "roughly proportional." **Conflicts with Petra's deck note "you'll learn all that in ENGS 22 or 26" — she deliberately keeps the full model out.** Keep "roughly proportional"; do NOT add the equation. (Synthesizer: rigor-vs-Petra's-scope, resolve toward her documented choice.)
- **[MAJOR] B-11c** the driver's current capacity is never stated though the whole justification is a current mismatch. Add one sentence by `fig-tb6612-internal`: the TB6612 sinks up to ~1.2 A per channel, and exceeding it triggers thermal shutdown.
- **[MAJOR] B-3] rq-pwm-timer is answerable verbatim from the preceding paragraph. Consider rephrasing to require applying the fact, not retrieving it. *(Lower priority — reading checks may be retrievable.)*
- **[MINOR] B-6** reading "as long as the switching is fast enough" is unquantified; tie to 1.6 kHz where it's introduced ("far faster than the rotor's inertia can follow").
- **[MINOR] B-3** rq-motor-direction correct answer near-quotes the reading; rephrase in a future pass.
- Confirms the run-only Day 11 scope is right (P-2 reachable, register work legitimately 11x); the P-3 failure is the stretch's execution, not the deferral.

## expert-class-logistics — BLOCKER

- **[BLOCKER] P-4/P-2** Part 4's wiring figure (`fig-tb6612-wiring`/slide17_1573fa6d) shows NO barrel jack / L7805 / VM connection; the power build is only narrative, not a `<task>`. **`slide17_img2.png` (in repo, unused) shows the regulator board with header pins labeled `5V`/`GND`/`Vin`** — the fix material exists. Extend/add a figure, name the pins, make wiring the supply an explicit task.
- **[BLOCKER] P-14/P-2** No path for "nothing turns → VM never got 5 V"; and `Vin` (unregulated 6–12 V) sits next to `5V` on the header — a student could wire Vin→VM and over-drive the 3–6 V motor. Needs a diagnostic branch + a warning.
- **[MAJOR] P-3** Part 4's planned early-finisher lead-in never shipped into `act-day11-direction`. Add it as a real task.
- **[MAJOR] S-8** Part 3 datasheet lookup realistically ~10–11 min; stacked with Part 4's gap, Part 6 (crucial step) isn't reached by a real fraction of the room. Instructor-facing (plan-level) 60-sec regulator-pin callout at the top of Part 4.
- **[OK] S-25/L-1/L-8** No classroom-management / grouping / time-pressure language in the student-facing text. The plan-level checklist correctly stayed out of the book.

## learner-visual — BLOCKER

- **[BLOCKER] P-4/B-7** `fig-pwm-counter-compare` (slide24) is a generic block diagram (counter box → comparator + pseudocode), NOT the ramp/compare/output timing picture its caption promises. **Hand-author a timing SVG:** sawtooth ramp (3 periods) + dashed compare line + aligned output square wave, CNT/ARR/CCR labeled.
- **[MAJOR] P-4/P-12** Shoot-through has no figure though CW/CCW/brake each do. Add a fourth same-style H-bridge diagram showing the same-side short VM→GND bypassing the motor. (Check slide14 assets.)
- **[MAJOR] B-11** `fig-tb6612-internal` captioned "one channel" but shows the full dual-channel die (dense, hard to project). Crop to channel A and annotate IN1/IN2/PWM/OUT1/OUT2. (Converges with tech-accuracy.)
- **[MINOR] B-11/B-11a** `fig-pwm-scope` is a full WaveForms screenshot; trace is a tiny strip. Recrop to the graph area.
- **[MINOR] P-4** No static motor cutaway in Part 1 (only the video); optional labeled still would help.
- **Confirmed:** `fig-actuator-chain.svg` re-rendered in Chrome is correct and well-annotated (the PyMuPDF black-box render is a CSS-class limitation, not a defect); H-bridge + truth-table figures legible and correctly annotated.

## checker-technical-accuracy (Parts 4–6 + self-contradiction) — BLOCKER

All quantities/citations VERIFIED correct (1.6 kHz, 375, 3×, RM §17.3.8 p479/§17.4 p482, PA7 AF4=TIM14_CH1, rail voltages, pin map, truth table). Blockers are figure artwork:
- **[BLOCKER] B-6/figure** `fig-pwm-counter-compare` (slide24): the figure's embedded pseudocode reads `if SAMPLE_VALUE < COUNT then PWM<='1'` — HIGH when counter is ABOVE compare, the OPPOSITE of the prose and of real PWM mode 1 (CNT<CCR1→active). Replace with a correct timing figure. (Converges with learner-visual BLOCKER.)
- **[MAJOR] B-11c/figure** `fig-tb6612-wiring` shows no external power (4th reviewer to flag).
- **[MAJOR] B1/figure** `fig-pwm-waveform` (slide23): the third trace is **20%** (averages 1 V of 5 V), NOT 25% as the caption says. Fix the caption's third case to 20% (or use a 25% figure). Prose/tasks elsewhere say 25/50/75.
- **[MINOR] L-5** PA5/PA6/PA7 given without Arduino Dxx header names (CLAUDE.md "D5 (PB4)"). Add both on first use. **[Dxx UNVERIFIED — need nucleo_pinout.pdf.]**
- Could not confirm slide17 shows AIN1/AIN2 *free* vs already wired (near-identical to slide27 at low res) — needs Petra's source.

## learner-weak-circuits — BLOCKER

- **[BLOCKER] P-4/P-1** Wiring figure shows no barrel jack/L7805/caps/VM wire. The real board photo is **`slide17_img2.png` (= slide19_img4.png)**: barrel jack J1, L7805 U1, C1/C2, headers **J2 (5V/GND)** and **J4 (Vin)**. Add it, label J1/J2/J4, show the J2-5V→VM wire, and NAME the board in prose.
- **[MAJOR] P-1** The common-ground wire (5 V gnd ↔ 3.3 V gnd) is stated as important but never shown as a specific wire/callout.
- **[MAJOR] P-4** `fig-tb6612-wiring` vs `-wiring-2` are near-identical Fritzing renders; the free-vs-connected wires aren't labeled. Label each wire directly (prose callouts) rather than relying on spotting a routing difference.
- **[MAJOR] P-4/P-7** The 1.6 kHz math skips steps: the ÷6 is never given, and Hz→kHz is silent. Write it out: 12,000,000 ÷ 6 = 2,000,000 Hz; 2,000,000 ÷ 1250 = 1,600 Hz = 1.6 kHz. (Converges with rigor.)
- **[MINOR] P-2** Scope-probe placement (CH1 on PA7, ground clip) is prose-only; a photo/annotated crop would remove ambiguity.
- **[MINOR] P-1** "a mistake on the motor side" is too vague; name the concrete rail-bridging error to avoid (once the regulator figure exists).

## expert-cognitive-load — MAJOR

Gate 1 Part 2/3 split worked (each Part now 2–4 new elements, under P-7). Run-only Part 6 is a correct scaffold fade. Two repetition problems:
- **[MAJOR] B-8** chapter intro (lines 7–15) vs reading-section intro (30–39) both explain "why a GPIO can't drive a motor" in full, read back-to-back. Cut the chapter intro's restated clause; let the reading intro carry it once. Also trim the subsection openers to short callbacks.
- **[MAJOR] B-2/B-8/P-6** the reading (`subsec-hbridge-concept`) FULLY explains the back-EMF brake mechanism, which (a) B-2 reserves for class and (b) pre-answers Part 2's `task-day11-diagonal-brake` predict. Trim the reading's brake line to a forward pointer; keep the full causal explanation for `fig-hbridge-brake`'s caption after the predict.
- **[MINOR] P-4/B-7** Part 4's predict reaches the truth table only via xref back to Part 3; re-show a compact copy beside `act-day11-direction` (the plan called for this).
- **[MINOR] P-3/B-5** the stretch is a bare `<p>`, not `<activity>/<task>` (no id for the deck), and its answer sits in the preceding instructor block before the question is posed. Wrap as its own `<activity>/<task>` + `<instructor>`.

## checker-figure-claims — BLOCKER

Opened all 12 figures. P-15 CLEAR: `fig-hbridge-concept`'s highlight is a symmetric wash over all four legs, so it does NOT pre-answer the Part 2 diagonal task.
- **[BLOCKER] fig-pwm-counter-compare** wrong image: a block diagram + inverted VHDL (`if SAMPLE_VALUE < COUNT then PWM<='1'`), no ramp — opposite of the caption. Replace with a correct ramp/compare/output timing drawing (hand-author).
- **[MAJOR] fig-tb6612-wiring** the Fritzing's only supply is a red wire on the Nucleo **3V3** pin (VM fed from 3.3 V); NO barrel/L7805/5 V rail. Contradicts the prose's L7805→5 V→VM. Use the regulator board (slide17_img2) + fix prose; **flag to Petra — her Fritzing shows 3V3→VM, contradicting the confirmed regulator setup.**
- **[MAJOR] fig-tb6612-wiring-2** wires land on header pins **D11 / D12 / D13** — confirms **D11=PA7 (PWM), D12=PA6 (AIN2), D13=PA5 (AIN1)**. Give both names in prose (D5 (PB4) convention).
- **[MAJOR] fig-pwm-waveform** third trace is **20%/1 V**, not 25%. Fix caption (75/50/20, averages 3.75/2.5/1 V of 5 V).
- **[MAJOR] fig-tb6612-internal** full two-channel chip (AIN/PWMA/BIN/PWMB, AO/BO, VM1/2/3), not "one channel." Fix caption + bridge names.
- **[MINOR]** PWM "held HIGH" not clearly shown in the Fritzing; "Motor VCC" vs VM bridge; baked-in "Figure 15-2" leftover on fig-hbridge-concept; fig-pwm-scope unreadable projected (not load-bearing); project the wiring figures large (B-11a).

---

## SYNTHESIS (committee-synthesizer) — applied list

**Conflict resolutions:** (1) rigor vs Petra's scope → back-EMF "proportional to speed" YES, but NO V=IR+Kₑω in the reading (her ENGS 22/26 deferral); the depth goes into the Part 6 stretch. (2) anxious/logistics diagnostics vs S-25 → one CONCRETE PHYSICAL check per spot allowed; no hand-raising/instructor/while-you-wait (stays plan-level).

MUST FIX (apply now): 1 waveform caption 25→20; 2 hand-author counter-compare timing SVG; 3 Part 4 power build (regulator figure slide17_img2 + Vin warning + ordered tasks + split "apply power" + common-ground callout + name board/caps); 4 write out the frequency arithmetic; 5 back-EMF ∝ speed; 6 fig-tb6612-internal caption (dual-channel) + ~1.2 A capacity/thermal shutdown; 7 three concrete-physical diagnostic sentences.
SHOULD FIX: 8 trim reading brake to a forward pointer (un-pre-answer Part 2); 9 stretch → early-finisher `<activity>` that derives + Part 4 early-finisher task; 10 Part 5 lead voice + DAC tie-back to Day 7 + fix attribution; 11 cut chapter-intro repetition.
MINOR: 12 voice (whole point→point, Part 3 opening, S-20 instructor, STBY (standby), Part 6 contrastive, AIN1/AIN2 bridge); 13 Dxx names (D11=PA7, D12=PA6, D13=PA5); 14 define breakout board / logic-level pins; 15 Table 12 p.30; 16 re-show truth table in Part 4; 17 drop "just"; 18 fig-hbridge-concept "Motor VCC"=VM note.
NEEDS PETRA: corrected wiring Fritzing (VM from 5 V, not 3V3; confirm AIN free); regulator-stage risk facts (barrel keying? caps?); fig-pwm-scope recrop; optional shoot-through diagram / motor cutaway / scope-probe crop.
DEFER: rq-* answerable-from-adjacent-prose; "fast enough" quantify; PWM=LOW brakes nuance.

---

## CORRECTION (2026-08-17, Petra): the class is 110 minutes, not 65

Petra: *"This is a Tuesday class, so 110 minutes long?"* — correct, and it is the
documented rule: Day N odd = Tuesday = **110 min**; Day Nx = Wednesday x-hour = 50;
Day N even = Thursday = 110 (`plans/week5.md`, `plans/week5-map.md`, which record the
same error being made for every day of week 5).

`plans/day11.md` said ~65, and both `expert-class-logistics` runs were briefed with
that number, so:

- **VOID as timing findings:** the Gate 2 BLOCKER ("the 65 minutes have no slack",
  "the crucial step is not reached by a real fraction of the room"), the Gate 1
  BLOCKER of the same kind, and the whole protect/cut apparatus they motivated. A
  110-minute class started with ~45 minutes of slack. This is the third time this
  defect has been recorded in this repo; see the note added to `AUTHORING-book.md`.
- **STILL LIVE, and applied:** everything those reviews found that was not about the
  clock — above all the Part 4 wiring figure with no regulator or VM path (five
  reviewers converged on it), the missing Part 4 early-finisher task, and the
  observation that Part 3's datasheet lookup is slower than a lecture beat.

**The day is now over budget for real**, but at a different number: after Petra's
pass 1 restored the physics and replaced the too-simple activities, the parts sum to
**~130 against 110**. The cut/defer order is in `plans/day11.md` — move Part 5's two
paper tasks to the homework, make Part 4's two added measurement tasks
early-finisher work — and Part 4's build and Part 6's run stay protected.
