# Day 16 Gate 2 — the book's committee

Reviewed 2026-09-07, over `source/ch-photosensors.ptx` at commit `3c36db5`:
the whole chapter, delivery 1 — the introduction and objectives, the Before
Class reading (five subsections, five reading questions), Day 16 In-Class
Parts 1–6 (nine activities, four `<instructor>` blocks) and the Reference
(three subsections); eight figures. No `<slide>` blocks, no deck. Against
`plans/day16.md` (Gate 1 applied 2026-09-02, re-checked 2026-09-07 against
the passed Days 15/15x), `plans/week8-ground-truth.md` (with its Day 16
Gate 0 block), her deck `Day16-Photosensors.pptx`, Lab 8 and Lab 5, the
PDV-P8001 sheet and the Adafruit guide. Class length given to every
reviewer: Thursday, 110 minutes.

Gate 1.5 (`checker-voice` on the introduction and `subsec-photo-cell`) ran
first and its ten findings were applied before the rest was written: the
personified sensor sentences ("tells us", "we'll never ask a photocell",
"it compares"), the "reason is in the material" hinge, the colon-for-drama
in the introduction, Adafruit's sentences restored verbatim (low-power,
"For that reason they often appear in toys, gadgets and appliances",
"Instead, you can expect…"), the authorship sentence cut (S-23), "cheap" →
"inexpensive", "the lab" → "Lab 8".

Fourteen invocations: the standing core of ten (`checker-technical-accuracy`
scoped two ways, the reading with Parts 1–3 and Parts 4–6 with the
Reference, each with the self-contradiction read) and three rotators this
day earns (`expert-rigor-hawk` for the quantities, `learner-weak-circuits`
for the wiring and the algebra, `learner-ai-reliant` for Deliverable 9).
Reports follow in the order they returned; the synthesizer's list and the
applied list are at the end.

---

# expert-class-logistics

### Verdict: BLOCKER

### Running clock

**As planned** (0→110, matches the plan's own arithmetic and checkpoints):
0–3 settling · 3–5 announcements · 5–17 Part 1 · 17–20 servo check/pot out · 20–26 D1–D3 · 26–33 D4–D6 · 33–41 wire two dividers + AD2 (**checkpoint 41**) · 41–50 two-channel program · 50–53 (**checkpoint 53**) · 53–58 Part 3 · 58–65 cups/clips · 65–69 arm sweep · 69–72 (**checkpoint 72**) · 72–94 Part 5 (two loops, read §4, three commits, tuning para, bounds/`milliseconds()`) · 94–105 Part 6 (plan the loop, fixed-step, D9/D10 sentence) · 105–110 close.

**As it will actually run**, applying doubled first-time-hardware cost (P-2) and a 2–3× completion spread on hands-on steps (rubric) to the two genuinely novel hardware/debugging steps inside the class's one protected Part:

0–5 settling/announcements (kits and Day 15 wiring re-seated after a trip in a bag — no slack budgeted, but not unique to this day) · 5–19 Part 1 (discussion drifts ~2 min) · 19–24 servo check/pot removal (some Day-15 servos need re-seating) · 24–33 D1–D3 (first-time multimeter-on-a-photocell technique, 6→~9) · 33–41 D4–D6 · 41–~57 wire two never-before-built dividers + AD2 check (8 min budgeted, doubled per P-2 for the slow third of the room — this is exactly the "first time a component is wired" case the rubric calls out) · ~57–59 checkpoint discussion (now really landing at minute ~57, not 41) · 59–~74 two-channel program with the CCRDY trap the plan's own instructor block flags (9→~15) · 74–76 checkpoint · 76–78 Part 3 compressed to datasheet-only per the cut order · 78–92 cups/clips/sweep (Part 4, itself a first-time fine-motor task, held to its 14 as budgeted only by skipping the checkpoint pause) · 92–**114** Part 5's three "never cut" commits.

**Where the hour actually ends:** the class runs out of clock inside Part 5, roughly 4 minutes past the bell. Part 6 — the one addition Petra asked for specifically so the lab has "a running start" — gets zero minutes, and the closing 5 minutes (Lab 8's due date, the competing-light warning, the instruction to keep a K/T log) is what actually gets cut, not what the plan names as first-cut (Part 6's two-sentence close, Part 3, Part 1's log-log beat, Part 4's checkpoint). The plan's designated slack (roughly 18 minutes spread across Parts 1/3/4/6) is smaller than the overrun one under-costed hardware step (`act-day16-dividers`) can generate on its own.

### Findings

1. **[BLOCKER] [P-2, S-8] `subsec-day16-lab` (Part 2), `act-day16-dividers`, `act-day16-two-channel`** — Two genuinely first-time steps sit inside the one Part the plan marks "never cut": wiring two never-before-built photocell dividers (8 min budgeted for the whole room) and a two-channel ADC program with a documented CCRDY trap (9 min budgeted). Neither is costed at the double the rubric calls for on first-time hardware, and Lab 8 itself is Part 2's downstream, so it can't just be deferred. **Fix:** either shrink what's graded live in Part 2 (e.g., move D2/D3's "why they disagree" discussion fully into the reading, since the ideas are already pre-taught there per the protected list) so the hardware steps get the minutes P-2 requires, or make the minute-53 checkpoint a hard stop — announce up front that D7/D8 finish as the first few minutes of Lab 8 outside class for anyone not done, rather than letting the two-channel debugging silently eat into Part 3–6.

2. **[MAJOR] [S-8] Whole-day sequencing / the close** — Under a realistic (not doubled-everywhere, just doubled-where-the-rubric-says) timing, the actual casualty is not what the plan's cut order names first (Part 6, then Part 3, then Part 1's log-log beat, then Part 4's checkpoint) — it's the final 5-minute close, which the plan never lists as compressible at all. Losing it means the due date, the competing-light warning, and the instruction to keep a K/T tuning log (needed for Lab 8 D9) are never said in class. **Fix:** name the close as protected-last, not implicitly protected by omission — move the due-date/competing-light lines to the top of Part 6 (they take under a minute) so they survive even if Part 6 itself is cut to nothing.

3. **[MAJOR] [P-2, P-14]** — No instructor block covers a student whose servo is still not working by Thursday, for **Part 5's commit 1** (`task-day16-sign`, which explicitly needs "which way the arm turned on Day 15 as `pwm_value` increased") or for **Part 6** (which requires calling `updateServo()`). `inst-day16-part2-checkpoint` and `inst-day16-arm-checkpoint` both say this student is fine through Part 4 ("the servo is not needed until the loop runs"), but the loop is exactly Part 5's third commit and all of Part 6, and her own deck's speaker note on the wiring exercise says "this exercise takes students a LONG time" — after two class days on it, some fraction will still be here. **Fix:** add one line to `inst-day16-loop` or a new instructor note: this student pairs with a tablemate's working board for the sign observation and predicts sign from the pulse convention alone rather than their own sweep, and does Part 6 by design/pseudocode only.

4. **[MAJOR] [P-2, P-3]** `subsec-day16-arm` (Part 4) — Cups-and-clips is itself a first-time fine-motor task (some arms already loaded softens it but doesn't eliminate it for the rest), and it directly gates Part 5, which the instructor block says cannot start until "every table has both" sign facts. There is no stretch or fallback named for a table that is still on clips when the room is ready to move on, and one instructor cannot verify 30 tables' clip connections individually before starting the "never cut" Part 5 commits. **Fix:** let Part 5's first commit open with tables that have their data while stragglers finish clips in parallel during the "read §4" beat (3 min), rather than gating the whole room on Part 4's completion.

5. **[MINOR] [S-8]** Settling (3) + announcements (2) = 5 min assumes the Day 15 wiring (servo on 5 V, pot on A0) survived a trip home/back in a portable kit undisturbed. No slack is budgeted for re-seating a jarred breadboard connection before the Part 2 opening check even runs. Not unique to this day, but it's the first thing every student does, so any drift here compounds finding 1's overrun rather than absorbing it.

**Files reviewed:** `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md` (§4 protected list, §1 Day 15/16 arcs), `/Users/dz00762/repos/ENGS28/source/ch-servos.ptx` (lines 1330–1580, Day 15 Part 6 and Day 15x, for the servo-check xref and symptom lists Day 16 relies on).

---

# learner-visual

### Verdict: MAJOR

### Findings

1. **[MAJOR] P-12** — `fig-day16-full-setup` — Her Day 16x slide 13 put the callout **"Physically located in the cups of your tracker arm"** directly on the Fritzing, next to the drawn photocell symbols. The chapter now carries that fact only in the caption's prose ("The two photocells are drawn on the breadboard, but they are physically in the cups..."). A figures-first reader sees two photocell symbols sitting on the breadboard and takes that literally before ever reaching the sentence that corrects it. Redraw the callout on the image itself — an arrow from each photocell symbol to a short label ("in the arm's cup, reached by clip — see fig-day16-cup") — instead of asking the caption to do the annotation's job.

2. **[MAJOR] P-4** — the **dead zone** (`subsec-day16-loop`) has no figure. Two dense paragraphs argue, in symbols, why `|e| < K_DIV` produces a zero PWM step; this is exactly the kind of idea that is obvious as a picture and unretained as a paragraph. Add a small generic plot: x-axis error `e` in ADC counts (say −200 to 200), y-axis PWM step, flat at 0 between −100 and +100 (the K = 0.01 / K_DIV = 100 example is already worked in visible, non-instructor prose, so this uses no protected value), sloped outside that band, labeled "dead zone." DISPLACES: the sentence "every error below 100 counts... produces no correction at all" becomes redundant with the plot and can go; keep the integer-vs-float tradeoff sentence.

3. **[MAJOR] B-11 / B-11a** — `fig-day16-full-setup` (2236×1874, placed at width="100%") and `fig-day16-lab-fig2` (981×1426, placed at width="55%") are full Fritzing screenshots. Both keep the unused right two-thirds of the Nucleo board (ST-LINK, USB connector, RX/TX header, reset/user buttons), and `fig-day16-lab-fig2` also keeps roughly the bottom half of an empty breadboard. That dead space is what forces the header pin labels a student actually needs (AIN row, PWM/MOSI/D11, 3V3/GND) down to near-illegible size at the widths they're displayed at. Crop both to the header rows and breadboard rows actually wired; the same figure width then buys visibly larger labels on the parts that matter (B-11: "never drop a whole slide into a section when one diagram matters — crop it").

4. **[MINOR] Layout** — `fig-tracker-two-loops`. The two source images are already wide-and-short block diagrams dense with labels (986×252 and 886×205, roughly 4:1, with SENSORS/CONTROLLER/PWM/SERVO/V₀/V₁/ADC/θ all needing to be read). Placing them side by side at `widths="48% 48%"` halves their width again on top of an already-squat native size, shrinking those labels further than either diagram needs to be shrunk. Neither half needs the height it isn't using — stack them one above the other instead of side by side, so each keeps close to full text width; the left/right "bought vs. wrote" pairing survives fine as top/bottom.

5. **[MINOR] P-4** — the **two-channel ADC read** is described only in prose ("select channel 0 and read, select channel 1 and read, print both, once a second") because the actual loop code lives inside two `<instructor>` blocks stripped from the student book. Add a small 4-box sequence figure (Select CH0 → Read → Select CH1 → Read, looping back) near the "Now the program" paragraph in `subsec-day16-lab`, so a visual learner has a picture of the sequence before writing it, not just one sentence. DISPLACES: nothing — it augments a sentence already at minimum length.

6. **[MINOR] P-4** — the **geometric-mean rule** (`subsec-day16-lab` and `subsec-photo-ref-divider`) is argued entirely in symbols: too-large-in-both-states, too-small-in-both-states, "the same factor above and below." A generic sketch — swing in V_M vs. R_M on a log R_M axis, with R_low and R_high marked and the peak between them — would make the optimum visible rather than asserted. Draw it with symbolic R_low/R_high only (no measured ohm values, no computed R₂), so it stays clear of the protected Lab 8 deliverable answers in `plans/week8-ground-truth.md` §4.

**Compliance check**: none of the proposed figures draw the direction of V_M with light or the sign of the step (`act-day16-direction`, `task-day16-sign` stay unanswered by any image, per P-15), and none uses a value from the protected Lab 8 answer list.

**Files referenced**: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/assets/images/Day16-Photosensors/week8FullLabSetup.png`, `/Users/dz00762/repos/ENGS28/assets/images/Day16-Photosensors/slide09_a9c74b15.png`, `/Users/dz00762/repos/ENGS28/assets/images/Day15-Servos/slide08_095020b6.png`, `/Users/dz00762/repos/ENGS28/assets/images/Day16-Photosensors/lab8-fig6-tracker-loop.png`, `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md`.

---

# learner-anxious-nonhardware

### Verdict: BLOCKER

### Findings

- **[BLOCKER] P-2, P-14** `source/ch-photosensors.ptx:496-501` (`task-day16-servo-follow`) + `:786-793` (`inst-day16-arm-checkpoint`) — Where I'd withdraw: the very first thing I do today is turn the knob and watch the servo. The task text says only *"The servo rotates as you adjust the potentiometer... If it does not, the symptom list in `subsec-day15-power` says where to look."* Nothing in the student-visible text tells me whether I can keep going if the symptom list doesn't fix it in five minutes. The actual answer — *"A student whose servo did not follow the knob at the opening check goes on with the study anyway: nothing in this Part or the next needs the servo, and the arm's electrical work in Part 4 does not either"* and *"A student whose servo is not yet working still does this Part; the servo is not needed until the loop runs"* — exists only inside `<instructor>` blocks (`inst-day16-part2-checkpoint`, `inst-day16-arm-checkpoint`), which are stripped from the book I read. So the one reassurance that would keep me moving is invisible to me, and a dead servo at minute 3 reads as a dead end for the whole 110 minutes. Fix: one clause, student-facing, right after `task-day16-servo-follow` or opening Part 2's intro paragraph, stating plainly that the divider study and the arm wiring do not depend on the servo working. This is the exact P-2 "lifeline" move the rule already documents (Day 11x's CC1E parenthetical) — one clause, nothing displaced.

- **[MAJOR] P-14, P-2** `source/ch-photosensors.ptx:628-634` vs `:656-678` (`inst-day16-part2-checkpoint`) and `:780-785` — Where I'd withdraw: my two channels don't read the same value — one is pinned at 4095 while the AD2 says the node itself is fine. The visible diagnostic paragraph after the two-channel activity only covers "both channels print the same number"; it never covers a value stuck at a rail while the voltmeter looks normal. That exact case — *"A value stuck at 4095 or 0 with a sensible voltmeter reading: the program is reading a channel with nothing on it"* — is written down, but only inside the stripped `<instructor>` checkpoint block. Part 4's parallel paragraph (`:780-785`) does cover this case for the arm ("A channel that now prints a rail value, 4095 or 0... has a clip on the wrong row"), so the coverage clearly exists and was simply left out of Part 2's version. Fix: add the same clause to the visible Part 2 paragraph.

- **[MAJOR] P-2, P-14** `source/ch-photosensors.ptx:866-878` — Where I'd withdraw: the reveal for commit 1 says *"Both are what you noted from your own sweep earlier today, so the sign of K comes from your board and not from the book."* This assumes every student has a clean answer from Part 4's sweep and from Day 15's knob direction. If my arm wasn't finished, my sweep was inconclusive, or my Day 15 servo never got wired, I'm left holding a question the book tells me only I can answer, with no acknowledgment that this is expected or any way to proceed. The fallback already exists — the instructor's worked code carries the comment `// or pwm - e / K_DIV: the sign is found on the board` — but it's instructor-only. Fix: one sentence in the student text saying what to do without the personal data: try one sign when the loop runs and reverse it if the arm moves away from the light.

- **[MINOR] P-2, B-4** `source/ch-photosensors.ptx:993-998` (`task-day16-fixed-step`) — Where I'd withdraw: this task assumes a wired, working arm ("see whether the arm turns toward the light or away from it"). If I'm still finishing Part 4's clips when class reaches Part 6, this task is simply undoable, and nothing at Part 6's opening says that's fine — unlike the servo checkpoints, there's no stated re-entry point here (the plan treats Part 6 as "begun in class, finished as lab homework," but the book never tells the reader that). Fix: one sentence at the top of Part 6 stating that a student not yet wired plans the loop in words now and builds/tests it as part of Lab 8.

Files reviewed: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/source/ch-servos.ptx` (subsec-day15-power), `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md`, `/Users/dz00762/repos/ENGS28/AUTHORING-book.md`.

---

# expert-cognitive-load

# Gate 2 Cognitive-Load Review — Day 16, `source/ch-photosensors.ptx`

Files reviewed: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (P-2, P-7, B-2, B-8, B-18, B-19), `/Users/dz00762/repos/ENGS28/source/ch-servos.ptx` (`sec-servo-day15`, for the length budget), `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md` §4 (protected list).

### Verdict: MAJOR

The chapter's shape is right — Parts match the plan 1:1 (B-19 respected, no invented Parts), the two-loop crucial step gets real scaffolding (Part 2's two checkpoints, Part 4's checkpoint ladder), and the protected Lab-8 deliverable answers stay out of student-facing text (the dark/illuminated resistance numbers and the tuning log are correctly confined to `<instructor>`). Paragraph density against `sec-servo-day15` is comparable minute-for-minute, so this is not a B-18 length-budget problem. The damage is concentrated: one duplicated explanation that adds extraneous load exactly where Part 1 is already carrying its ceiling of new ideas, and one commit reveal in Part 5 that answers more than the question asked.

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| $V_{cc}$ is 3.3 V because it's the ADC's reference, so the node uses the ADC's full range | 2, both in full | reading `subsec-photo-divider` l.134–137; Part 1 body l.433–435 | the reading's telling | Part 1: cut to a parenthetical, "($V_{cc}$ is 3.3 V, the ADC's reference)" |
| "we compare two cells, not one" — what the comparison cancels and what it doesn't | 3 (2 brief motivating, 1 full mechanism) | reading `subsec-photo-cell` l.90–92 (brief); `rq-photo-variation` feedback l.263–267 (states the conclusion); Part 1 closing paragraph l.465–477 (full mechanism: cancels curve shape, doesn't cancel mismatch) | reading's motivating line + Part 1's mechanism reveal (legitimate B-2 motivate→explain fade) | `rq-photo-variation` feedback: drop "This is why the tracker compares two cells rather than trusting the value of either one" — it gives away Part 1's reveal before Part 1 runs it |
| the geometric-mean fixed resistor maximizes the reading's voltage separation | 2, both in full (two different methods) | Part 2 body l.510–525 (qualitative, near-0/near-1 argument); Reference `subsec-photo-ref-divider` l.1033–1046 (restates qualitatively, then also takes the derivative) | Part 2's qualitative version (it's what Deliverables 4 and 6 need) | Reference: cut "and setting its derivative with respect to $R_M$ to zero gives the geometric mean" — the result is already stated; the derivation reproves what Part 2 already taught |
| "plug in the USB cable first, then the power adapter" (power-up order) | 2, both in full, ~20 minutes apart in the same class | Part 2 `task-day16-servo-follow` l.497–501; Part 4 `task-day16-arm-print` l.770–778 | Part 2's telling | Part 4: "power up again" — no need to re-spell the two-step order minutes after it was performed |
| the two-channel ADC read (`adc_setChannel`/`adc_getValue`) | nothing over two for the student | Part 2 body l.598–607; Reference `subsec-photo-ref-two-channel` (register-level CHSELR/CCRDY detail, a different level) | both | — |
| `milliseconds()` for the sampling interval | nothing over two | Part 5 body l.916–921; Reference l.1096–1099 (brief) | both | — |
| the PWM bounds (±60°, `SERVO_MIN`/`SERVO_MAX`) | nothing over two | Part 5 body l.908–921 only | — | — |

### Findings

1. **[MAJOR] P-7 / B-8 — Part 1 (12 min).** The ADC-reference rationale is re-derived word-for-word right where Part 1 is already landing three new, heavy ideas (log-log axes, the sensitivity-slope footnote formula, the compare-two-cells mechanism) in its 12 minutes. Reading (l.134–137): *"$V_{cc}$ is the Nucleo's 3.3 V, because the ADC's reference is 3.3 V… so a node fed from 3.3 V can use the ADC's whole range and never exceeds it."* Part 1 (l.433–435): *"$V_{cc}$ is the Nucleo's 3.3 V and not its 5 V because the ADC converts voltages up to its 3.3 V reference: fed from 3.3 V, the node can use the ADC's whole range and never exceeds it."* This is not a worked-example restatement (unlike the numeric divider walkthrough beside it, which is legitimate P-7 chunking) — it is the same fact, same reasoning, same clause structure, adding nothing. **Fix:** cut Part 1's sentence to a bare parenthetical, "($V_{cc}$ is 3.3 V, the ADC's reference)." **DISPLACES:** nothing added — pure cut, one sentence shorter.

2. **[MAJOR] P-7 — Part 1's sensitivity-slope formula is intrinsic load that doesn't need to live in the 12-minute Part.** L.444–452 spells out the full footnote identity — $[\log(R_{100})-\log(R_{10})]/[\log(E_{100})-\log(E_{10})]$ — plus the sign subtlety between the datasheet's magnitude and the plotted negative slope, on top of the log-log axis concept it depends on and the compare-two argument that follows it. The plan's own overrun order already names "Part 1's log-log beat to one sentence with the figure" as the first cut — this should not wait for an overrun; it belongs in the reading's or Reference's territory permanently, since the qualitative result ("about a factor of 4 per decade of light") is all Part 1's arc needs. **Fix:** move the bracket-notation derivation (l.444–452) to `sec-photo-reference`, beside the divider formula it complements; Part 1 keeps only "the datasheet's Sensitivity row is the slope of that line, about a factor of 4 per decade of light." **DISPLACES:** the log-identity sentences move out of Part 1's body paragraph into a new short paragraph in `subsec-photo-ref-divider` — Part 1 loses two sentences, Reference gains an equivalent two.

3. **[MAJOR] P-2 — Part 5's commit 2 (the dead zone) answers more than its own question at the crucial step.** The commit asks *"K = 0.01 and e = 50 — what step does integer arithmetic give?"* (plan). The reveal (l.879–896) answers that, then keeps going: names the dead zone, frames the integer-vs-float trade, and adds *"A `float` K removes the dead zone, and the STM32C031C6 can do the arithmetic in software; the loop shown in Lab 8 uses the ADC counts directly…"* — a design fork the lab never asks the student to choose, arriving in the middle of the three commits that carry the crucial step's design reasoning. This is exactly the pattern the load audit flags: intrinsic difficulty (truncation, dead zone) piled together with an extraneous aside (the float alternative and the chip's software-float capability) at the densest point of the class. **Fix:** cut the float-alternative clause from Part 5's paragraph, ending the reveal at the dead zone's width and the trade it costs. **DISPLACES:** the float/capability clause moves into Reference's `subsec-photo-ref-loop`, which already discusses `K_DIV` and the dead zone (l.1086–1094) — one clause added there, two clauses cut from Part 5.

4. **[MINOR] B-8 — Part 4 repeats Part 2's power-up order in full.** Part 2 (l.497–501): *"Plug in the USB cable first, then the power adapter into the regulator board, and turn the knob."* Part 4 (l.770–772): *"Plug in the USB cable, then the adapter into the regulator board, and run your two-channel program."* Both are full, near-identical restatements of the same two-step order within one class session — the B-19 finding on Day 15x ("state a rule once, where the action happens... harping") applies here in miniature. **Fix:** Part 4: "Power up again, and run your two-channel program." **DISPLACES:** nothing added — pure cut.

5. **[MINOR] B-8 — the geometric-mean rule is proved twice.** Part 2 (l.516–522) gives the qualitative argument (near-$V_{cc}$/near-0 at the extremes) that the mean maximizes separation; Reference (l.1038–1043) restates the same qualitative argument and then also takes the derivative to re-derive the identical conclusion. The Reference exception (a lookup restatement) covers stating the result again; it doesn't need to reprove it a second way. **Fix:** cut "and setting its derivative with respect to $R_M$ to zero gives the geometric mean" from Reference. **DISPLACES:** nothing added — pure cut.

6. **[MINOR] B-3 — `rq-photo-variation`'s feedback gives away Part 1's reveal.** The reading question's feedback (l.263–267) ends *"This is why the tracker compares two cells rather than trusting the value of either one"* — the exact conclusion Part 1's closing paragraph (l.465–477) is built to reveal fresh in class, with the mechanism (what cancels, what doesn't) attached. Stating the bare conclusion pre-class blunts that reveal. **Fix:** trim the feedback to the datasheet-range fact only ("the datasheet gives ranges rather than one value, and the Adafruit guide puts the variation at 50% or higher"), dropping the tracker-design conclusion for class to land. **DISPLACES:** nothing added — pure cut.

---

# learner-firstgen-novice

### Verdict: MAJOR

### Findings

1. **[MAJOR] P-1, P-4 — `subsec-photo-tracker`, source/ch-photosensors.ptx:203-208** — "using the imbalance between the sensors caused by oblique illumination to control servos in elevation as well as in azimuth. In Lab 8 we build a model of an **azimuth-only** system." This is where I would stop reading. "Oblique illumination," "elevation," and "azimuth" are never defined, and the second sentence reuses "azimuth" to describe the very tracker I am about to build — so I can't just skip the jargon as someone else's system. I don't know if my arm is missing a capability or what "azimuth-only" even constrains. **Fix (a clause, not a paragraph, per B-18):** cut the technical tangent about other trackers' elevation/azimuth hardware and replace with plain language that still lands on the fact this system needs: "Some trackers also tilt up and down to follow the sun's height, not just turn side to side. In Lab 8 we build a model that only turns side to side, in the plane the arm sweeps: the servo from the servo chapter…" — this displaces the three unglossed technical nouns with words already in my vocabulary.

2. **[MAJOR] P-7, P-4 — `subsec-day16-divider`, source/ch-photosensors.ptx:438-455** — "The figure is a log-log plot: both axes are logarithmic, so each division of the grid is a factor of ten, and a relationship of the form <m>R \propto E^{-S}</m>… is a straight line on these axes and only on these." In the same breath this moves straight into the sensitivity formula with four subscripted terms (<m>R_{100}, R_{10}, E_{100}, E_{10}</m>) before I've seen a single worked number. This is the "one dense paragraph" P-7 warns against, and it's the first math-heavy idea of the day, 12 minutes in — I would go quiet here and just wait for the reveal instead of trying to follow. **Fix:** reorder, don't lengthen (B-18) — move the concrete number ("ten times the light divides the resistance by about 4") and the figure itself to before the algebraic subscript formula, so the picture and one worked ratio anchor "log-log" before the notation arrives.

3. **[MAJOR] P-1, P-2 — `act-day16-arm`, source/ch-photosensors.ptx:770-778, and the crucial step itself** — "Recall also, from the servo chapter, which way the arm turned as `pwm_value` increased. Both facts are needed for the loop." I checked ch-servos.ptx's Day 15 wiring activity (`act-day15-servo-wire`, task-day15-servo-power): it only asks the student to confirm "the servo rotates as you adjust the potentiometer" — it never asks which way it turns as the value goes up. There is nothing to "recall," because it was never recorded. This directly threatens the crucial step (the sign of K), since by the time Part 5 needs this fact, the potentiometer is gone and there's no way to casually re-check it. **Fix (one clause, in Day16's own text since Day 15 is already passed):** add a clause to `task-day16-servo-check` (Part 2, while the pot is still in): "…and turn the knob, noting which way the arm turns as the knob increases the reading." This displaces nothing but the passive "you should see it rotate."

4. **[MINOR] P-15 — `fig-day16-full-setup` caption, source/ch-photosensors.ptx:741-742, vs. the Part 5 reveal at line 874** — the caption states as the assembly's fixed answer that "the right-hand node goes to A0 (PA0)… and the left-hand one to A1 (PA1)," yet the Part 5 reveal insists "the sign of K comes from your board and not from the book." The book's own required-wiring figure already commits to a specific side-to-channel mapping before the Part 4 sweep activity is supposed to discover it. **Fix:** soften the caption's specificity to a labeled example rather than a universal fact, e.g. "…goes to A0 (PA0) in this build" — a two-word change, not a rewrite.

5. **[MINOR] P-4 — `subsec-photo-family`, source/ch-photosensors.ptx:111-114** — "A strain gage senses a tiny stretch or compression as a very small change in resistance, and a load cell, which measures weight, is built from strain gages." Two unfamiliar mechanical parts, defined in one clause each, with no picture — for a student who has never seen either, this is prose describing something I "cannot see," which P-4 says needs an image. Low priority since neither part is used in this lab. **Fix:** none needed if space is tight (B-18 — nothing else to displace), but if a figure already exists from the ADC chapter's sensor family discussion, one xref to it would close the gap at zero added cost.

**Overall on the crucial step:** both channels printing from the arm is well scaffolded (checkpoints at minute 41, 53, 72, clear physical tasks, clear symptom text). The loop's sign, bounds, and two numbers are well-structured as predict-then-reveal — but finding 3 means the "sign" half of that step rests on a fact the course never actually asked me to notice, which is the single biggest risk to reaching it independently.

---

# learner-ai-reliant

### Verdict: BLOCKER

### Findings

**1. [BLOCKER] P-14, B-3, protected list item 9 (`plans/week8-ground-truth.md` §4)** — `source/ch-photosensors.ptx`, `subsec-photo-ref-loop`, lines 1086–1089:

> "In integer arithmetic a gain below 1 is written as a division, `pwm = pwm + e / K_DIV`, with `K = 1/K_DIV`. Because `/` on integers discards the remainder, every error with `|e| < K_DIV` produces a step of 0, a dead zone of `±K_DIV` counts around the balance point…"

The protected list is explicit: *"9 | the controller. No tracker loop code in student-facing text… A worked example may exist in `<instructor>`"* (week8-ground-truth.md, line 521). This line is not in an `<instructor>` block — it is in the Reference section, which every student reads, and it is the literal proportional-update statement, the core of Deliverable 9.

It doesn't stand alone. The same chapter, in plain student prose, already names the two ADC calls (`subsec-day16-lab`, lines 599–604: *"Your ADC library from Lab 5 selects a channel with `adc_setChannel()` and reads it with `adc_getValue()`… select channel 0 and read, select channel 1 and read, print both, once a second"*) and the bound-write function (line 912: *"your servo program from Day 15 already applies a limit in `updateServo()` before every write"*). Prompt that solves D9 outright: *"Using `adc_setChannel()`/`adc_getValue()` on channels 0 and 1, `e = V1 - V0`, the update `pwm = pwm + e / K_DIV`, `updateServo()` to write it bounded between two limits, and `milliseconds()` to gate on `T_MS`, write the tracker's main loop in C."* An AI reproduces `inst-day16-loop` almost verbatim — the only gaps left are the sign (a 50/50 guess, and see Finding 2) and two numeric bounds (a short datasheet computation). That is D9 handed over.

**Fix, naming what it displaces (B-18):** delete the `<c>pwm = pwm + e / K_DIV</c>` code element and the clause built on it from `subsec-photo-ref-loop` (lines 1086–1091), replacing it with a words-only pointer back to the in-class result: "the update is the division by `K_DIV` worked out in Part 5's discussion; the dead zone it produces is `±K_DIV` counts." Nothing pedagogical is lost — the dead-zone concept and its width are still stated — only the compilable assignment statement is removed, which is what item 9 protects. No new Part or activity (B-19); no scaffolding of a crucial step is withheld (P-3), since the crucial step remains fully described in words.

**2. [MAJOR] P-14, B-3 — the sign task's own answer key defeats its anchor.** `act-day16-design`, `task-day16-sign` (lines 849–853):

> "Suppose V1 is larger than V0, so that e is positive. Which way should the arm turn, and should the PWM value increase or decrease to turn it that way? **What in your own build decides the answer?**"

is a genuinely well-anchored question — until the very next paragraph gives the tell that makes reasoning unnecessary, lines 875–878:

> "A loop with the wrong sign drives the arm away from the light until it reaches a bound and holds it there, so a wrong sign shows up as an arm pinned at one end of its travel, not as an arm that hunts."

Prompt that now solves the "what decides the sign" question without touching the board's wiring at all: *"My tracker's arm drives to one end and sits there instead of tracking. Is my controller's sign wrong?"* — the book has already supplied the oracle. A student can write `pwm + e/K_DIV`, run it, and if the arm pins, flip to `pwm - e/K_DIV` — trial and error, no reasoning from which photocell is on which channel or which way the arm turns with `pwm_value`, which is exactly the fact P-2/P-14 wanted them to use.

**Fix:** move the wrong-sign symptom sentence out of the teaching prose and into an `<instructor>` checkpoint, matching the chapter's own established pattern (`inst-day16-part2-checkpoint`, `inst-day16-arm-checkpoint`) — a troubleshooting note for the instructor circulating during Part 6's build, not a standing sentence in the reading every student sees before they've tried anything. Displaces: the one clause at lines 875–878, moved (not duplicated) into a new instructor-only checkpoint note attached to Part 6. No new Part/activity (B-19); the student-facing task is untouched, so nothing is withheld from the crucial step (P-3) — the diagnostic still exists for whoever needs it while debugging, just not as a pre-answer.

**3. [MAJOR] P-6, B-18 — a bare, unanchored predict/reveal duplicates the one that's done right.** `act-day16-design`, `task-day16-tuning` (lines 861–864):

> "Predict what the arm does if K is much too large, and what it does if T is much too long."

is answered in full two paragraphs later (lines 898–903, hunt/overshoot and lag), with no board involved — an AI (or the book itself) completes it outright, and it is never checked against the student's own tracker. Part 6 already does this correctly and anchored, lines 985–987:

> "before you run anything predict whether the arm will hunt, lag, or track the light with the values you chose."

Two predictions for one idea, one of them empty (P-6's actual test — "does the reveal leave the activity with nothing to do" — fails for the Part 5 copy) and one of them real. This is exactly the shape B-18 flags: a defensible addition that isn't earning its paragraphs against a passed chapter's budget.

**Fix:** delete `task-day16-tuning` and its two-paragraph reveal from Part 5 (lines 861–864 and the "too large/too long" half of lines 898–903), and extend Part 6's existing predict sentence to carry the dead-zone case that Finding 1's removal leaves untested: "…predict whether the arm will hunt, lag, sit in a dead zone, or track the light with the values you chose." This displaces the Part 5 task and its reveal paragraph exactly with one added word-string in an already-existing Part 6 task — no new Part or activity (B-19), and the concept (K too large, T too long) is still taught, once, verified against real hardware instead of twice with one copy verified against nothing (P-3 is not violated: the words-based reasoning survives, only the redundant unanchored copy is cut).

### Files
- `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` (lines 599–606, 849–907, 928–967, 970–999, 1070–1101)
- `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md` (§4 protected list, line 521; §7 condemned item 5, line 696)
- `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (P-3 line 57, P-6 line 85, P-11 line 171, P-14 line 350, B-3 line 400, B-18 line 566, B-19 line 532)

---

# checker-arc-fidelity

Mined her deck from the live working tree (`assets/ClassSlidesOLD/Day16-Photosensors.pptx`, 16 slides, gitignored but present); chapter, plan and ground truth from the same tree at `main`. Her titles are hers, not inferred.

### Verdict: MAJOR

One protected-list leak in student-facing text; her arc otherwise reaches the chapter in full, and her sentences are reused rather than paraphrased almost everywhere.

### Her arc against the book

| her slide | title | reaches us at (`source/ch-photosensors.ptx`) | judgment |
| --- | --- | --- | --- |
| 1 | Engs 28 / Day 16 | — | deck glue, deliberately dropped |
| 2 | Photosensors (divider) | — | section divider, deliberately dropped |
| 3 | Photocell = light-dependent resistor (LDR) | `subsec-photo-cell` L56–99 + `fig-photocell-photo` L75; recalled Part 1 L404–412; the unit-variation half at L465–477 | present, her sentences verbatim ("Cadmium sulfide's resistivity decreases with increasing light exposure", "the variation can be really large, 50% or higher", "determine basic light changes") |
| 4 | Photosensors are frequently nonlinear | Part 1 L437–455 + `fig-photocell-loglog` L456 (her raw `slide04_0c98f286.png`) | present; the plural/family claim in her title does not (finding 5) |
| 5 | …continued, the log-log relation | Part 1 L444–452; her relation printed at L452 as `log10(R100) − log10(R10) = −0.6[log10(E100) − log10(E10)]` | present, verbatim |
| 6 | Many sensors are based on resistance | `subsec-photo-family` L101–116 (reading) + Part 3 L684–695 (in class) | present; her ordering swap (6 after 7–9) is the Gate 1 decision, recorded in `plans/day16.md` L108 |
| 7 | Using a CdS photocell to measure light | `fig-photocell-divider` L144 (her layout redrawn as SVG) + `act-day16-direction` L414–421 + reveal L422–436 | present; the commit is her sentence verbatim ("Discuss at your table: as the light gets brighter, does V_M increase or decrease?") |
| 8 | Part 1 of Lab 8: Technical Study of Photocells | Part 2 intro L485–493, `act-day16-study` L526–556 (D1–D6), geometric-mean beat L510–525 | present, deliverables restated without answers |
| 9 | Technical Study, continued | `fig-day16-lab-fig2` L569, `act-day16-dividers` L578–597, `act-day16-two-channel` L608–626 (D7, D8, one-second period, AD2 voltmeter, flashlight sweep) | present; her (a)(b)(c) all land |
| 10 | Review: servo test setup | `act-day16-servo-check` L494–509; her closing line "We'll now add the photocells to the tracker arm" at Part 4 L713–714 | **partly present** — the check is there, the wiring figure and "use the code from Day15_servo_template.c" are not (finding 2) |
| 11 | Solar Tracker Assembly | `task-day16-cups` L752 + `fig-day16-cup` L724 | present, her sentence reused |
| 12 | …continued (clips) | `task-day16-clips` L758 + `fig-day16-clips` L730 | present, her sentence verbatim |
| 13 | …last step (recreate; **remove the pot**) | recreate: `task-day16-recreate` L763; **pot out: `task-day16-pot-out` L503–508, at Part 2's opening as the plan now says**; "physically located in the cups" → `fig-day16-full-setup` caption L738–739 | present, and placed where Gate 1 put it |
| 14 | Ultimate Setup | `fig-day16-full-setup` L736–749, her export `week8FullLabSetup.png`, no pot | present |
| 15 | Read "A Solar Tracker" / discuss the loop | `act-day16-read-tracker` L828–836 and `act-day16-design` L847–865 — both activity titles are her two sentences verbatim; reveals L866–927 | present, expanded to three commits (named at Gate 1) |
| 16 | Student Feedback Survey | — | deliberately dropped, course admin, recorded in `plans/day16.md` L106 |

Speaker-note asides checked and not treated as findings: her slide 4 note's datasheet recipe ("look up 2 footcandle resistance… draw a curve parallel to the closest member of the family") and her slide 6's resistorguide/omega links are dropped; her slide 10's "7805 / 9 V external supply" is dropped under her own Day 12 ruling.

### The chapter against her deck (reverse direction)

| chapter | origin | named? |
| --- | --- | --- |
| `subsec-photo-family`, `subsec-photo-datasheet`, `subsec-photo-tracker`, 5 reading questions | her slide 6 moved to the reading; PDV-P8001 + Adafruit lux table; Lab 8 §4's opening; B-3 | yes — plan L96–99, L144–147, L166–170 |
| Part 2 `act-day16-servo-check` | her slides 10 + 13 | yes |
| Part 2 checkpoints, the voltmeter-before-code step, "Both channels print the same number?" | plan scaffolding L61–79 | yes |
| Part 3 ¶2 (rise/fall times vs the servo's 0.1 s/60°) | datasheet moment 2 | yes — plan L142–143 |
| `fig-tracker-two-loops` | her Day 15 slide 8 + Lab 8 Fig 6 | yes — plan L175–178 |
| Part 5's three tasks, the sign/dead-zone/tuning reveals, bounds + `milliseconds()` | expansion of her slide 15 | yes — plan L104, ruling 8 |
| **Part 6** `subsec-day16-start` | none in her deck; her 2026-09-03 "they can get started" | yes — plan L105, and open with her |
| `subsec-photo-ref-two-channel` (CCRDY) | Lab 5 + RM0490, ground truth §2c | yes — plan L26–27 |
| **`subsec-photo-ref-divider` ¶2: the derivative derivation of the geometric mean and the "Axel Benz formula" name** | Adafruit/Lab 8 D4; not her deck, not in the plan's hand-offs | **no — the one unnamed addition** (finding 3) |

Nothing else in the in-class section is unnamed.

### Findings

1. **[MAJOR] Tracker-loop code in student-facing text — protected list, Deliverable 9.** `subsec-photo-ref-loop` L1086–1088 prints the controller's update statement:
   > "In integer arithmetic a gain below 1 is written as a division, `pwm = pwm + e / K_DIV`, with K = 1/K_DIV."

   Ground truth §4's protected list for D9 (10 pts) is absolute: *"the controller. No tracker loop code in student-facing text."* The **idea** (integer division, the dead zone) is authorized by Gate 1 ruling 8 and by Part 5's math (`e/100`, L884–887); only the C form is the leak, and it is the one line a student has to arrive at. Petra's standing rule (worked answers stay out of student prose even after an in-class reveal) points the same way.
   **fix**: rewrite in place, code deleted: "In integer arithmetic a gain below 1 is a division of the error by a constant, with K = 1/K_DIV." — **DISPLACES**: nothing added, six words removed; the worked line already exists in `inst-day16-loop` L952, which the protected list explicitly permits. While there, consider whether L1093–1095 ("`e` and the PWM value are signed integers, `int32_t`, and the bounded value is converted back to `uint16_t` only when it is written") is design guidance or D9's declarations — her call, no change proposed.

2. **[MINOR] Her slide 10 lands as a check without its figure or its program (B-8a).** `task-day16-servo-follow` L496–501 says "turn the knob. The servo rotates as you adjust the potentiometer, as it did at the end of the servo chapter (`act-day15-servo-wire`)". Her slide 10 is a *picture* of the test setup plus "Use the code from `Day15_servo_template.c` that you completed last class"; the plan's coverage row L101 promised `fig-servo-powering` **by xref**. Neither the figure nor the program reaches the check, and the check silently assumes the Day 15 binary is still on the board.
   **fix**: rewrite the second sentence as "Your servo program from Day 15 is still on the Nucleo, and the servo rotates as you adjust the potentiometer, with everything wired as in `<xref ref="fig-servo-powering"/>`." — **DISPLACES** the clause "as it did at the end of the servo chapter (`<xref ref="act-day15-servo-wire"/>`)"; net +4 words in one task, and the symptom-list xref to `subsec-day15-power` is untouched.

3. **[MINOR] The geometric-mean beat is a 190-word teaching paragraph inside 36 minutes of lab work (B-18, B-10).** L510–525 walks "much larger… much smaller… the same factor above and below" in full, and `subsec-photo-ref-divider` L1033–1046 then derives it properly. The plan budgeted "the *why* of the rule taught in **one sentence**" (L119), and this is the paragraph shape Petra stopped reading on Day 12.
   **fix**: keep the first two sentences (the rule, the formula, "computed from the values you measure") and the last (the kit's 10 kΩ and D6), replace the middle with "The mid-value is what puts the dark reading and the lit reading farthest apart on the ADC's scale (`<xref ref="subsec-photo-ref-divider"/>`)." — **DISPLACES** ~100 words from the in-class flow into the Reference paragraph that already holds them (B-18's delete-then-relocate order); nothing new is written.

4. **[MINOR] `fig-day16-full-setup`'s caption is 135 words and re-states two things the chapter already owns (B-18 caption rule, B-8).** L737–747 re-describes each divider (already in `fig-day16-lab-fig2`'s caption 160 lines earlier) and the servo's three leads with their drawn colours (owned by `fig-servo-powering`, Day 15, which she passed at 127 words). Her *"All of this about a wire? SHORTEN."* is on record for exactly this.
   **fix**: keep sentence 1, sentence 2 (her slide 13 callout: the cells are drawn on the breadboard but are physically in the cups), an xref to `fig-servo-powering` for the servo's leads, and "There is no potentiometer" (her slide 14's whole point). — **DISPLACES**: ~70 words deleted, nothing added. At Gate 3, her slide 13 put the "Physically located in the cups of your tracker arm" line **on the image** as a callout; a `pptx_annotate`-style overlay carries it to the wall, where a caption will not be read.

5. **[MINOR] Her slides 4–5 title claim — "Photosensor**s** are frequently nonlinear" — reaches nowhere.** Part 1 L437–438 makes the claim about this photocell only, and Part 3 L684–690 presents the family as interchangeable dividers whose "one change from sensor to sensor is the fixed resistor", which is not what her slide-6-into-slide-4 sequence taught.
   **fix**: equal-length rewrite of Part 3 L688–690: "What changes from sensor to sensor is the fixed resistor, chosen by the same geometric-mean reasoning, and the shape of that sensor's own nonlinear curve, read from its own datasheet." — **DISPLACES** the existing sentence word for word.

6. **[MINOR] `rq-photo-swapped`'s feedback hands over Part 1's reveal (B-2).** The plan chose the *swapped* divider "so the class commit stays fresh" (L168–169), but the correct-answer feedback L300–304 says the photocell "is now in the numerator **as well as the denominator**", and the distractor feedback L308–311 repeats the mechanism. A student who reads the feedback arrives with the commit's answer and its reasoning.
   **fix**: delete "as well as the denominator" and the distractor's second clause, leaving the swapped case's own arithmetic. — **DISPLACES**: delete-only, ~10 words. Judgment call: if you would rather the reading prime the mechanism, close this and say so, but then Part 1's commit is a recall and its 5 minutes should be re-read at Gate 3.

7. **[MINOR] The power-up order is enacted three times in one class (B-19, "state a rule once, where the action happens").** L497 ("Plug in the USB cable first, then the power adapter"), L591 ("Plug in the USB cable, open Waveforms' voltmeter"), L771 ("Plug in the USB cable, then the adapter into the regulator board"). Day 15 Part 6 already states the rule once; this is the shape she rejected on Day 15x (*"The two wiring rules don't need to be harped on over and over"*).
   **fix**: L771 → "Power up in the usual order and run your two-channel program." — **DISPLACES**: delete-only. The Part 2 opening instance stays, because that is the one power-up that follows a rewire from last class.

8. **[MINOR — a question for her, not a change] `inst-day16-two-channel` L653–654 prints Deliverable 1's datasheet rows** ("dark resistance 0.2 MΩ minimum after 10 s at 10 lux; illuminated resistance 3 kΩ to 11 kΩ at 10 lux"). It is inside `<instructor>`, so it is stripped from the student book, deck, PDF and search index — but ground truth §4 permits `<instructor>` explicitly only for D9, and the Gate 0 block says these two numbers may not be printed "in any form". Instructors do need a check value.
   **fix**: none proposed; ask her with the delivery whether the instructor build may carry D1's rows.

### Layouts she already solved

- `fig-photocell-divider.svg` — her slide 7 does this as V_cc at top, R_sens as a variable resistor with the diagonal arrow, a dotted node with a horizontal arrow to the formula set as a display fraction, R_M below, ground symbol. The SVG reproduces that shape exactly and adds only two small labels ("the sensor", "the fixed resistor", "to an ADC pin, A0 or A1"). **Keep** — hers, enlarged for projection, which is what Gate 0 asked for.
- `fig-photocell-loglog` — her slide 4 raw, red curve intact, caption saying it is the guide's generic family. **Keep.**
- `fig-day16-full-setup` — her slide 14 export; her slide 13 solved the "the cells are not really on the breadboard" problem as an **on-image callout**, and the book has it as caption prose. **Adopt hers** at Gate 3 (see finding 4).
- `fig-tracker-two-loops` — a new `<sidebyside>` of her Day 15 slide 8 diagram and Lab 8 Figure 6; she never showed them together, but Gate 1 named it and both halves are hers. **Keep.**

### Checked and correct

Her whole Thursday reaches the chapter: the LDR and its physics, the nonlinearity with the −0.6 log-log relation, the resistance-sensor family, the divider with her exact commit question, Lab 8 §2 done in class as D1–D8 with no answers printed, the cups, the clips, the recreate step, **the pot's removal and the servo check both at Part 2's opening as the re-plan requires**, her end-state Fritzing, and her two closing sentences as the titles of Part 5's two activities — her wording reused rather than paraphrased on slides 3, 4, 5, 6, 7, 9, 11, 12, 13 and 15. Deliberately dropped and recorded: slide 16 (survey, course admin), slides 1–2 (glue), slide 10's 7805/9 V sentence (her Day 12 ruling), slide 4's footcandle curve-drawing recipe and slide 6's vendor links (asides). Also checked: no protected number from D1–D8 appears in student prose, no example terminal readings, the bounds and K are left to the student, `check_rules.py` is clean, all ten cross-chapter xrefs resolve, and the in-class section is 22 body paragraphs against the passed `sec-servo-day15`'s 37 over the same 110 minutes.

Files: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md`, `/Users/dz00762/repos/ENGS28/assets/ClassSlidesOLD/Day16-Photosensors.pptx`, `/Users/dz00762/repos/ENGS28/assets/images/Day16-Photosensors/`.

---

# expert-rigor-hawk

### Verdict: MAJOR

### Findings

- **[MAJOR] S-19, L-6** — `source/ch-photosensors.ptx:1062-1066` (`subsec-photo-ref-two-channel`): *"The other way to read two channels is to select both bits in `ADC_CHSELR` at once: in that case the sequencer converts the selected channels in increasing channel order (Reference Manual §14.4, Channel selection)..."* — **Check**: RM0490 §14.4 actually says channels are scanned in ascending order only "if `CHSELRMOD` bit is cleared in `ADC_CFGR1` register"; the ordering is a configuration, not a hardware invariant. This is exactly the S-19 failure pattern the rulebook itself names ("an absolute technical claim is only as good as its edge case") — a curious student who reads `ADC_CFGR1` will find the claim incomplete. **Fix**: one clause — "...in increasing channel order, provided `CHSELRMOD` in `ADC_CFGR1` is left at its reset value of 0 (the course's driver never touches it)."

- **[MAJOR] B-3** — `rq-photo-peak` (`source/ch-photosensors.ptx:322-351`) and `rq-photo-family` (`:353-382`). **Check**: the immediately preceding paragraph (`subsec-photo-datasheet`, line 174) already states *"the peak response at 520 nm, in the green"* verbatim, and `subsec-photo-family` (line 111-114) already states *"[a strain gage and load cell] require more complex electronics than a simple voltage divider, because the change to be measured is so small."* Both reading questions are answerable by re-reading the sentence just above them — this is the "reading questions answerable from the surrounding sentence" failure this course's own gate exists to catch, and the chapter's other three RQs (`rq-photo-resistance`, `rq-photo-variation`, `rq-photo-swapped`) all require applying a formula or synthesizing a fact, so the gap is visible by contrast. **Fix**: replace `rq-photo-peak` with something that uses the peak rather than restates it — e.g. would an IR remote or a red LED drive this cell as effectively as a white flashlight, and why (requires combining 520 nm peak + 400-700 nm range with the light source, not lookup). Replace `rq-photo-family`'s stem so the distinguishing fact (the very small resistance change) has to be applied to a sensor not already named in the text, or drop the strain-gage sentence's explicit "because…" clause from the reading so the question is the first place the reasoning is required.

- **[MINOR/MAJOR] B-6, S-19** — `source/ch-photosensors.ptx:700-706` (`subsec-day16-family`): *"a reading taken every tenth of a second is a settled reading."* **Check**: rise/fall times are 55 ms / 20 ms; 100 ms is only ≈1.8–5× those numbers depending on which time constant convention the datasheet's 55 ms figure represents (10–90% step response ⇒ τ≈25 ms ⇒ 100 ms is ≈4τ, roughly 98% settled, not fully settled). The claim is asserted with more certainty than the margin supports — S-19 asks for the honest version, not a stronger one. **Fix**: "close to settled" or state the margin explicitly ("about twice the datasheet's rise time — close enough for the loop, not exact") rather than the flat assertion.

- **[MINOR] B-6** — `source/ch-photosensors.ptx:876-878` (the wrong-sign paragraph): *"A loop with the wrong sign drives the arm away from the light until it reaches a bound and holds it there, so a wrong sign shows up as an arm pinned at one end of its travel, not as an arm that hunts."* **Check**: correct as a general description of positive feedback with saturation, but only once the arm is perturbed from exact balance — at `e=0` a wrong sign produces the same (zero) correction as a right sign, so the claim implicitly assumes a nonzero starting error, which in practice is guaranteed by any ambient light asymmetry. Not worth more than a MINOR since the omitted case is physically unreachable on the bench, but the claim as written reads as unconditional. **Fix**: no structural change needed; if touched, "once perturbed from balance" would close the gap.

Everything else checked against source and found correct, worth stating plainly since the demanding standard makes silence ambiguous: the geometric-mean claim in `subsec-photo-ref-divider` (`:1034-1046`) is verified by direct derivative calculation — `R_M = √(R_low·R_high)` genuinely is the swing-maximizing value, and the text's boundary reasoning (both terms → 0, both terms → 1) is correct. The `10^0.6 ≈ 4` step (line 449) is numerically right (3.98). The dead-zone arithmetic (`e/K_DIV`, `±100` counts, `0.08 V`) is internally consistent and matches the CCR1/ADC scale. The "K as an `int` is 0" claim is correct C semantics. L-2 is applied correctly — floats are framed as a legitimate trade (dead zone vs. software floating point), never banned, and `%f` never appears. The CCRDY/ADSTART interlock and EOS statements match RM0490 verbatim in substance. None of the placeholder's condemned numbers (0.7, 560 nm, "several MΩ," "the nonlinearity cancels") reappear — the "compare two cells" paragraph (`:466-477`) correctly replaces the condemned claim with the accurate one (equal illumination + matched curves ⇒ equal voltage, regardless of curve shape; unit-to-unit mismatch is the real residual). The protected list is respected — no datasheet minimums, no computed R2, no expected voltages, no tracker controller code in student-facing text.

**Files reviewed**: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/plans/week8-ground-truth.md`, `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (S-16, S-19, L-2, B-3, B-11c, B-11d, B-18, B-19, P-2, P-3, P-5 sections).

---

# expert-continuity-auditor

## Continuity Audit — Day 16 Book (`source/ch-photosensors.ptx`), Gate 2

I read the chapter in full reading order, traced every `<xref>` target (all resolve, all point backward in `main.ptx` order — `ch-adc.ptx` → `ch-motors.ptx` → `ch-servos.ptx` → `ch-photosensors.ptx`), checked every named prerequisite against its source chapter, confirmed the protected list (Lab 8 Deliverables) is respected (numeric answers appear only inside `<instructor>` blocks, which are stripped from the student book), confirmed `BSRR` does not appear, confirmed the deferred-topics list in `CHAPTER_PROCESS.md` has nothing outstanding for this chapter, and confirmed Day 15's closing promise ("On Thursday we'll remove the potentiometer... add two photocells... and start on the solar tracker," `source/ch-servos.ptx:1516-1518`) is fully delivered by Parts 2, 4 and 6.

Specifically verified as correctly taught upstream, in order: `int32_t` and its signed range (`ch-accelerometers.ptx:3995`, before Day 15/16), integer-division truncation (`ch-servos.ptx:971`, recalled correctly at `ch-photosensors.ptx:1088`), the divider formula and 3.3 V reference (`ch-adc.ptx:189`, `:97`), Table 12's pin lookup (`ch-adc.ptx:587-621`), `CHSELR`/`EOC` (`ch-adc.ptx:672-937`, with `CCRDY`/`EOS` newly and adequately introduced in this chapter's own Reference section, `ch-photosensors.ptx:1049-1067`), `milliseconds()` (`ch-motors.ptx:3029`), and the servo's command/bounds vocabulary (`ch-servos.ptx:1334-1524`, `:1591`). No BSRR, no Williams citation, no re-teaching of Day 15's or Day 7's material beyond one-sentence recalls.

### Verdict: MINOR

### Findings

1. **[MINOR] [P-1]** `source/ch-photosensors.ptx:89` — "a photocell should not be used to determine a precise light level in **lux**" uses the term before it is taught. The formal definition — `<term>lux</term>, lumens per square meter` — doesn't arrive until `source/ch-photosensors.ptx:179`, in `subsec-photo-datasheet`, about 90 lines later in the same reading. Fix: move the "lumens per square meter" gloss up to line 89 (a short parenthetical is enough), or drop "in lux" from the first sentence and let the one formal definition at line 179 stand alone as the sole first use.

2. **[MINOR] [B-9]** `source/ch-photosensors.ptx:27` says "The loop itself is your work in Lab 8," but Part 6 (`act-day16-start`, lines 982-998) has students write and run both the fixed-step and proportional versions in class ("see whether the arm turns toward the light or away from it. Then the proportional version..."). This is licensed by Petra's ruling in `plans/week8-ground-truth.md` §9 ("they can get started, but it's their lab work"), so it is not a defect in what the chapter does — but the chapter's own introduction undersells what Part 6 actually asks for and could read as self-contradictory to a student who reads the intro first. Fix: soften line 27 to something like "Lab 8 is where you tune and demonstrate it" so it doesn't imply no code is written before Tuesday.

3. **[MINOR] [naming]** `source/ch-photosensors.ptx:142` names the single test-divider's output "`V_1`" (Lab 8 Figure 1's label, one photocell), while `source/ch-photosensors.ptx:838-839` reuses "`V_1`" for one of the *two* tracker-arm channels (Lab 8 Figure 6/§4's label). Both uses are accurate quotations of the lab's own notation, so this is the lab's inconsistency rather than an authored one, and the book cannot fix the lab — but nothing in the chapter flags the switch the way it flags the `V_supply`→`V_cc` switch (line 134, explicitly tied back to `subsec-adc-quantization`). A one-clause note at line 838 ("Lab 8 reuses `V_1` here for the second arm channel, not Figure 1's test-divider node") would close the gap at no cost.

No blocking or major findings: every forward-declared term/technique/register traces to a real, earlier teaching point in the correct chapter order; the chapter does not spend BSRR or any other deferred topic; it does not collapse into pure lab prep (Part 5's control-loop derivation — sign, integer dead zone, hunt/lag — is genuine new material, not setup); and it hands Lab 8 exactly what the ground truth says it must (the bounds via `updateServo()`/`SERVO_MIN`/`SERVO_MAX`, `milliseconds()` for `T`, the competing-light warning verbatim, and the two-channel read) without leaking any protected Deliverable 1/4/5/6/9/10 answer into student-facing text.

---

# learner-weak-circuits

### Verdict: MAJOR

### Findings

- **[MAJOR] P-4, P-7 — `subsec-day16-lab` (geometric-mean paragraph) and `subsec-photo-ref-divider`** — The formula that sizes the fixed resistor is never worked with a single number anywhere in the chapter. The text says: *"The geometric mean puts the dark resistance and the illuminated resistance the same factor above and below R2, and that is the value that puts the dark reading and the lit reading as far apart as this photocell can put them."* I can't check that claim — I have no numbers to plug in, and the real photocell's numbers are off-limits (protected list item 4). Part 1 solved exactly this problem for the divider-direction formula by inventing numbers that are "not our photocell's" (20 kΩ / 10 kΩ). Do the same here: one clause with an invented pair, e.g. "(a cell that happened to swing between 2 kΩ and 200 kΩ — not this photocell's own range — would have a geometric mean of √(2 kΩ × 200 kΩ) = 20 kΩ: ten times 2 kΩ, and a tenth of 200 kΩ, the same factor each way)." One added clause, no protected number touched.

- **[MAJOR] P-4, P-7 — `subsec-photo-ref-divider`, line 1042** — *"…and setting its derivative with respect to R_M to zero gives the geometric mean."* No derivative is taken, no intermediate step is shown — this is a bare assertion of a calculus result in a Reference section, the one place a shaky student goes specifically to check a claim. It reads as authority with nothing behind it. Fix: delete the clause (B-18 preference order: delete first) — the paragraph's own symmetric-swing argument two sentences earlier already carries the intuition and needs nothing more.

- **[MAJOR] P-4, P-7 — `rq-photo-swapped`, the "It rises" distractor feedback** — *"The photocell's resistance is now the numerator, and a smaller numerator over a sum that also gets smaller comes out smaller."* Stated as a general rule, this is false (4/5 → 3/3: numerator and denominator both shrink, the fraction grows). It happens to hold for this pair of resistors, but nothing on the page lets a shaky-algebra reader tell the true case from the false one — no numbers are given, unlike the un-swapped case one paragraph over in Part 1, which is fully worked (20 kΩ/10 kΩ → 1.1 V → 1.65 V). Fix: substitute the same already-used, non-real numbers into the swapped formula in this feedback (3.3×20/30 = 2.2 V falling to 3.3×10/20 = 1.65 V) — reusing Part 1's own example, not a protected value, and not a new reveal since this exercise's answer is already given.

- **[MINOR] P-4, P-7 — `subsec-day16-loop`, line 887** — *"…every error below 100 counts, which is about 0.08 V on the ADC's 3.3 V, 12-bit scale, produces no correction at all."* The 0.08 V is never derived on the page: it depends on "one count ≈ 0.8 mV," which this chapter only states later, in the Reference section (`subsec-photo-ref-divider`, itself only reached at the end of the chapter). Add the one missing multiplication as a parenthetical where 0.08 V first appears: "(100 counts × 0.8 mV per count = 80 mV = 0.08 V)." One clause, no new number, nothing displaced.

- **[MINOR] P-4 — `fig-day16-lab-fig2` caption, line 574** — *"…and the node goes to an analog pin, A0 (PA0) for one divider and A1 (PA1) for the other."* This never says **which** divider — by position or wire color — is A0 and which is A1, so the task that follows (*"a wire from the node row to A0 (PA0) for one divider and to A1 (PA1) for the other"*) can't actually be executed from the figure: nothing on the page ties a physical wire to a channel name. The later `fig-day16-full-setup` caption does this correctly ("the right-hand node goes to A0 (PA0), the purple wire, and the left-hand one to A1 (PA1), the blue wire"). Since the book itself says later the assignment doesn't matter functionally, this isn't a damage risk, but it is a genuine "I can't build this from the page" gap at the point it first matters. Fix: add the same left/right-and-wire-color phrase used in the full-setup caption to `fig-day16-lab-fig2`'s caption.

Files: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` (lines 289–320, 511–525, 569–577, 880–896, 1033–1046); reference figures at `/private/tmp/claude-503/-Users-dz00762-repos-ENGS28/571c8e26-02d9-41b6-bfe6-c7c6a3489f23/scratchpad/figs/fig-day16-lab-fig2.png` and `fig-day16-full-setup.png`.

Not flagged, and worth noting as passing: grounding is stated explicitly in every wiring caption and task in this chapter (both rails' sources, the AD2's striped leads, the regulator's GND), the AD2 voltmeter step names lead color and node precisely, and the primary (un-swapped) divider-direction arithmetic in Part 1 is fully worked with real substituted numbers — this chapter gets the things the persona fears most about *wiring* right; the defects found are all in the *algebra*, not the circuit.

---

# checker-voice

## Verdict: MAJOR

### Register — is this her?

Mostly, and the parts that are hers are unmistakably hers: the chapter and day openings are S‑22 clean ("The goal of this chapter is to build a solar tracker…", "Today we'll put the photocell from the reading into a voltage divider…"), the reading restores Adafruit's and her own slide‑3/4/5 sentences, every activity title is a name rather than an epigram, there are no weekday actors, no reassurance theater, no classroom management, no "Part N" or minutes outside comments and `<instructor>` blocks, and the explanations carry their causal middles (S‑27) — the 3.3 V reason, the geometric‑mean reason, the dead‑zone reason are all spelled out at her length.

What is not hers is the **connective tissue of the in‑class section**. Eight paragraphs open on a verbless fragment — "Now the datasheet and the multimeter." / "Now the circuit." / "Now the program." / "The sign first." / "Then the size of the step." / "Then the two ways the loop misbehaves." — which is the exact construction she struck twice in one Day 11x pass (L‑16: *"not a complete sentence — use only complete sentences"*, *"sentence fragment"*, fixed to "Then **come** the timer's own numbers"). With that goes the "we": the section narrates the class's own work impersonally ("Lab 8's section 2 … **is done now**, in class"), 4 `we'll` against the passed Day 15 in‑class section's 10 over half again as many paragraphs. The specimen pair is the one she wrote by hand:

> ~~"In the first twelve minutes we wire a display to two of the Nucleo's pins, flash a program you are given…"~~ → **"We'll start by wiring the display to two of the Nucleo's pins, flash a program, and make sure the display lights up."**

These are one edit each and the section is hers again.

---

### Rewrites

**1 — [MAJOR] `source/ch-photosensors.ptx:511, 558, 599` — L‑16, S‑13, the day9x "we'll" pair.** The three transitions that carry Part 2.

    draft:   "Now the datasheet and the multimeter.  Lab 8's Deliverable 4 asks for a fixed resistor at the geometric mean…"
             "Now the circuit.  Lab 8's Figure 2 is the two dividers on the breadboard…"
             "Now the program.  Your ADC library from Lab 5 selects a channel with adc_setChannel()…"
    hers:    "We'll start with the datasheet and the multimeter.  In Lab 8, Deliverable 4 asks for a fixed resistor at the geometric mean…"
             "Now we'll build the circuit.  Lab 8's Figure 2 shows the two dividers on the breadboard…"
             "Now we'll modify your ADC program to read both channels.  Your ADC library from Lab 5 selects a channel with adc_setChannel()…"
    because: Petra, Day 11x, on exactly this shape: *"not a complete sentence — use only complete sentences."*  ~~"Then the timer's own numbers."~~ → "Then **come** the timer's own numbers."  And the Day 9x pair above: the class's work is something *we* do.

**2 — [MAJOR] `source/ch-photosensors.ptx:867, 880, 898` — L‑16, S‑28.** Three consecutive paragraphs of Part 5 open the same way, which is the density that got a draft rejected whole.

    draft:   "The sign first.  A positive error means…"
             "Then the size of the step.  The step K e has to be a whole number…"
             "Then the two ways the loop misbehaves.  With K too large, each step overshoots…"
    hers:    "We'll take the sign first.  A positive error means…"
             "Next comes the size of the step.  The step K e has to be a whole number…"
             "There are two ways this loop can misbehave.  With K too large, each step overshoots…"
    because: same specimen as #1.  Nothing technical changes; only the subject-verb.

**3 — [MAJOR] `source/ch-photosensors.ptx:486-492` — S‑13, S‑23, and her deck's own title.** Part 2's opening paragraph has no "we" in it at all, and the second sentence explains the book's ordering rather than saying what we do.

    draft:   "Lab 8's section 2, <em>Technical Study – Photocells</em>, is done now, in class, with the handout in front of you; the handout has a space for each answer.  The order is the handout's: the datasheet, the multimeter, the fixed resistor, the two dividers, the program.  Before the photocells go on the breadboard the potentiometer comes off it, since its channel, A0 (PA0), is where the first photocell's divider goes; the servo stays wired as it is."
    hers:    "We'll now work through section 2 of Lab 8, <em>Technical Study of Photocells</em>, with the handout in front of you; the handout has a space for each answer.  We'll go in the handout's order: the datasheet, the multimeter, the fixed resistor, the two dividers, and then the program.  Before the photocells go on the breadboard we'll take the potentiometer off, because its channel, A0 (PA0), is where the first photocell's divider goes.  The servo stays wired as it is."
    because: ~~"In the first twelve minutes we wire a display…"~~ → "**We'll start by** wiring the display…"; and her own deck titles this "Technical Study of Photocells" (slides 8 and 9), which also removes the chapter's one remaining en dash (`–`, line 486 — the only dash in the file).

**4 — [MAJOR] `source/ch-photosensors.ptx:736-748` — B‑18's caption ruling.** The `fig-day16-full-setup` caption is ~110 words, most of it drawing colours, and it ends by saying what the picture does *not* contain.

    draft:   "…the right-hand node goes to A0 (PA0), the purple wire, and the left-hand one to A1 (PA1), the blue wire.  The servo's red lead goes to the row of the regulator board's 5V pin (drawn green), its brown lead to the ground rail (drawn black), and its orange signal lead to D11 (PA7) (drawn yellow); the regulator board's GND pin is wired to the ground rail, and the Nucleo's 3.3 V and GND feed the two rails.  There is no potentiometer."
    hers:    "The complete tracker circuit: the two dividers, the servo powered from the regulator board's 5V pin, and its orange signal lead on D11 (PA7).  The two photocells are drawn on the breadboard, but they are physically in the cups of your tracker arm, reached through the alligator clips.  One divider's node goes to A0 (PA0) and the other's to A1 (PA1)."
    because: Petra, Day 12, on a 209-word caption that enumerated wire colours: *"You've gotta be kidding.  All of this about a wire?  SHORTEN."* and the ruling that follows it — *a caption says what the picture shows and why it matters; it never says what the picture leaves out.*  The servo's own lead colours are content and stay; "(drawn green)", "the purple wire" and "There is no potentiometer" go.

**5 — [MAJOR] `source/ch-photosensors.ptx:557-596` and `713-769` — the day9x "say it once" pair.** The divider wiring is given three times: prose, caption, task. The clip instruction is given twice: prose and task.

    draft:   prose 558: "…each one a photocell from the 3.3 V rail to a node and a 10 kΩ resistor from that node to the ground rail, with one node wired to A0 (PA0) and the other to A1 (PA1)."
             caption 570: "Each photocell is connected from the 3.3 V rail, through the red jumper, to a node row; the 10 kΩ resistor goes from that row to the ground rail; and the node goes to an analog pin, A0 (PA0) for one divider and A1 (PA1) for the other."
             task 581: "…for each divider, the photocell from the 3.3 V rail to a node row and the resistor from that row to the ground rail, and a wire from the node row to A0 (PA0) for one divider and to A1 (PA1) for the other."
    hers:    keep the task verbatim (that is where the action is).  Prose: "Now we'll build the circuit.  Lab 8's Figure 2 (<xref/>) shows the two dividers on the breadboard, one node on A0 (PA0) and the other on A1 (PA1).  A0 and A1 are ADC channels 0 and 1, ADC_IN0 and ADC_IN1 in Table 12 of the STM32C031C6 datasheet…"  Caption: "Lab 8's Figure 2, the two photocell dividers on the breadboard.  The Nucleo's 3.3 V and GND feed the two rails."
             Same in Part 4: DELETE the prose sentence at 717-720 ("Alligator-to-breadboard clips make the electrical connections…") — `task-day16-clips` and `task-day16-recreate` already say it in her own slide-12/13 words.  Nothing is lost; the paragraph keeps its first and last sentences.
    because: she deleted the activity's "Wire the display: + to 3.3 V, − to GND…" because the wiring slide immediately before it said exactly that; and B‑19, *"state a rule once, where the action happens."*

**6 — [MAJOR] `source/ch-photosensors.ptx:909-921` — S‑28, S‑23, L‑13.** A count frame, plus the book telling the student about its own no-repetition policy.

    draft:   "Two things the lab asks for, said once.  First, the bounds.  The lab asks that upper and lower bounds be imposed on the PWM value before it is written to CCR1, so that the servo is not driven beyond ±60° of center. … Second, the sampling interval.  The lab asks you to use <c>milliseconds()</c>, the SysTick count from the motor chapter, to keep track of T."
    hers:    "In Lab 8 you are also asked to impose upper and lower bounds on the PWM value before it is written to <c>CCR1</c>, TIM14's compare register, so that the servo is not driven beyond ±60° of center.  Your servo program from Day 15 already applies a limit in <c>updateServo()</c> before every write; its <c>SERVO_MIN</c> and <c>SERVO_MAX</c> are the 1 ms and 2 ms endpoints, and Lab 8's ±60° is narrower than that, so the two numbers are yours to work out from the pulse convention (<xref ref="subsec-servo-ref-command"/>).  You are also asked to keep track of T with <c>milliseconds()</c>, the SysTick count from the motor chapter (<xref ref="subsec-day12-main-loop"/>).  The loop then has the shape of the Day 12 main loop, and it takes two lines:"
    because: ~~"Two things to take from a failed transaction.  The first is… The second is…"~~ → "A few notes about a failed transaction: …" (S‑28); and L‑13, *"Lab 6 asks you to write three functions"* → "In Lab 6 you are asked to write…".

**7 — [MAJOR] `source/ch-photosensors.ptx:809, 813` — B‑12 aphorism, S‑21 armature.** Two sentences in one paragraph.

    draft:   "…the servo's own controller drives the motor until the error is zero.  We bought that loop."
             "The controller in this loop is a program, and it is the program you will write."
    hers:    "…the servo's own controller drives the motor until the error is zero.  That loop is built into the servo and we do not program it."
             "The controller in this loop is the program you will write in Lab 8."
    because: ~~"The direct approach is not short by a little."~~ → *she deleted it*; and S‑21 ~~"One question is left, and it is the one that makes the rest work."~~ → the subject goes first.

**8 — [MAJOR] `source/ch-photosensors.ptx:684-695` vs `101-116` — B‑8, the second-telling pattern.** Part 3's first paragraph re-tells the reading's `subsec-photo-family` almost sentence for sentence, including the strain gage clause twice.

    draft (Part 3):   "…A strain gage senses a tiny stretch or compression, and a load cell measures weight with strain gages; the change in resistance is so small that they require more complex electronics than a simple voltage divider."
    draft (reading):  "A strain gage senses a tiny stretch or compression as a very small change in resistance, and a load cell, which measures weight, is built from strain gages; those two require more complex electronics than a simple voltage divider, because the change to be measured is so small."
    hers:    keep the reading in full (the reading question `rq-photo-family` tests it) and cut Part 3 to the recall plus what is genuinely new: "The circuit you just built reads any sensor whose resistance changes with the quantity being measured — the thermistor, the force-sensing resistor, the photoresistor and the potentiometer of the reading, each in the same divider and each on one ADC channel.  The one change from sensor to sensor is the fixed resistor, chosen by the same geometric-mean reasoning from that sensor's own range."
    because: her slide 6 arc beat stays (P‑12) — it is the *prose* that need not say it twice.  DISPLACES: three sentences of Part 3, no content lost from the chapter.

**9 — [MAJOR] eight student-facing "the lab" — the Gate 1.5 finding, unapplied outside `subsec-photo-cell`.** Lines 215, 838, 856, 894, 903, 909, 914, 997.

    draft:   "in class we'll work out from the lab's description how that program is designed" (215)
             "In the lab's notation the two sensor voltages are V₀ and V₁" (838)
             "The lab suggests starting with K on the order of 0.01" (856) / "with K as the lab suggests" (997)
             "what the lab's 'lump VREF/4096 into K' means" (894)
             "the lab's next paragraph … it says the same in its own words, and it recommends starting cautiously" (903)
             "the lab's ±60°" (914)
    hers:    "…from Lab 8's description of it"; "In Lab 8's notation…"; "Lab 8 recommends starting with K on the order of 0.01"; "…with K as Lab 8 recommends"; "what Lab 8's <q>lump VREF/4096 into K</q> means"; "Lab 8's next paragraph, the one that begins <q>You, as the designer</q>, describes the same two failure modes and recommends starting cautiously, with K on the order of 0.01, and increasing it as you gain understanding of the system's dynamics"; "Lab 8's ±60°".
    because: the same correction she made to "the lab" → "Lab 8" at Gate 1.5, plus this course has no lab room ("There are no lab benches"), so a bare "the lab" is ambiguous.  Note the 903 rewrite also drops "it says the same in its own words" (S‑23: the book does not narrate its own repetition).

**10 — [MAJOR] `source/ch-photosensors.ptx:172, 917, 856, 997, 523, 853` — L‑13, documents acting on people.**

    draft:   "the dark resistance and the illuminated resistance, which Lab 8 asks you to look up" (172)
             "The lab asks you to use <c>milliseconds()</c>" (917)
             "so Deliverable 6 asks whether that value, rather than the computed one, is a problem" (523)
             "What in your own build decides the answer?" (853)
    hers:    "…which in Lab 8 you are asked to look up"
             "You are also asked to keep track of T with <c>milliseconds()</c>" (folded into #6)
             "…so Deliverable 6 is whether the kit's 10 kΩ, rather than the computed value, is a problem"
             "What do you need to know about your own build to answer that?"
    because: L‑13, *"Don't make things do other things"* — and Day 8, where ~~"The access type in the RM, not habit, is the authority"~~ → "To know which to use you need to consult the reference manual."  "Lab 8's Deliverable 4 asks for a fixed resistor at the geometric mean" (511) is fine and stays: a specification asking for a *value* is the permitted form.

**11 — [MINOR] `source/ch-photosensors.ptx:405` — L‑16, S‑26.** Part 1 opens on a colon label rather than a sentence.

    draft:   "From the reading: a photocell's resistance falls as more light falls on it, and it is a resistance, which the ADC cannot measure directly."
    hers:    "In the reading we saw that a photocell's resistance falls as more light falls on it.  A photocell is a resistance, and the ADC measures voltages rather than resistances."
    because: ~~"Start with the one you have met before."~~ → "Recall the UART, which is another communication protocol that uses 2 wires only."

**12 — [MINOR] `source/ch-photosensors.ptx:468-477` — B‑12 epigram, third telling.**

    draft:   "What the tracker relies on is not the resistance of either cell but a comparison of the two. … We compare two cells, and we never measure one."
    hers:    "The tracker relies on the comparison of the two cells rather than on the resistance of either one. … two cells that differ by tens of percent balance at a point where the light is not quite centered on the arm."  (DELETE the closing sentence: it is the third statement of "compare, don't measure" — the reading says it at line 91 and this paragraph has already said it.)
    because: "not X but Y" plus a closing epigram is the pattern of ~~"Today: the two wires.  Thursday: the chip at the end of them."~~ → "We'll talk about the I2C protocol today and will examine how to talk to the backpack chip tomorrow."

**13 — [MINOR] `source/ch-photosensors.ptx:533, 549` — L‑12, verbless task statements.**

    draft:   "Deliverable 1: from the PDV-P8001 datasheet, the minimum dark resistance and the minimum illuminated resistance."
             "Deliverables 5 and 6: from the divider formula with V_cc = 3.3 V and your measured values, the voltages you expect at V₁ with the cell dark and lit, first with your computed R₂ and then with the kit's 10 kΩ; and whether the 10 kΩ is a problem."
    hers:    "Deliverable 1: look up the minimum dark resistance and the minimum illuminated resistance in the PDV-P8001 datasheet.  Both are rows of the <em>Electro-optical characteristics</em> table; note the test conditions beside each."
             "Deliverables 5 and 6: using the divider formula with V_cc = 3.3 V and your measured values, work out the voltages you expect at V₁ with the cell dark and with it lit, first with your computed R₂ and then with the kit's 10 kΩ, and decide whether the 10 kΩ is a problem."
    because: L‑12, complete sentences in every task statement.  Deliverables 2/3, 4, 7 and 8 are already right, and D8 correctly turns the lab's "record" into "note".

**14 — [MINOR] `source/ch-photosensors.ptx:397, 974` — S‑15, S‑20's generalization.**

    draft:   "The loop itself is your lab work, and there is time at the end to start on it."
             "The rest of today is a start on Lab 8's design challenge, which is your lab work."
    hers:    "The loop itself is your lab work, and we'll start on it together at the end of class."
             "We'll spend the rest of today starting on Lab 8's design challenge, which is your lab work."
    because: a period of the course does not act, and the time budget is not student-facing — ~~"In the first twelve minutes we…"~~ → "We'll start by…".

**15 — [MINOR] `source/ch-photosensors.ptx:425` — L‑16.**

    draft:   "With numbers that are not our photocell's: R_sens at 20 kΩ over R_M at 10 kΩ, with V_cc at 3.3 V, gives V_M = 1.1 V…"
    hers:    "Here is an example with round numbers rather than our photocell's own.  With R_sens at 20 kΩ, R_M at 10 kΩ and V_cc at 3.3 V, V_M = 3.3 × 10/30 = 1.1 V, and if the light brightens until R_sens is 10 kΩ, V_M = 3.3 × 10/20 = 1.65 V."

**16 — [MINOR] `source/ch-photosensors.ptx:696` — S‑28 count frame.**

    draft:   "Two datasheet numbers say how fast the tracker can usefully read its sensors."
    hers:    "How fast the tracker can usefully read its sensors is set by the photocell's own speed.  The PDV-P8001's rise time is 55 ms and its fall time 20 ms, both at 10 lux…"
    because: ~~"Three rows are all we need"~~ → "For now we mostly care about the rows named *System setup*, *Display setup* and *Dimming set*."

**17 — [MINOR] acronyms and both-names, mechanical.**

    `:149`  caption "to an ADC pin, A0 or A1 on the Nucleo"  →  "A0 (PA0) or A1 (PA1) on the Nucleo"  (CLAUDE.md: both names, always)
    `:1065` "the <c>EOC</c> flag is set after each conversion … the <c>EOS</c> flag is set after the last"  →  "the <c>EOC</c> (end of conversion) flag … the <c>EOS</c> (end of sequence) flag"
    `:911`  "before it is written to <c>CCR1</c>"  →  "before it is written to <c>CCR1</c>, TIM14's compare register"  (S‑27: name what it does at first use in this chapter)
    because: `PB9 (SDA)` → `PB9 (SDA — serial data)`; "the header" → "the **Arduino** header".

**18 — [MINOR] `:466, 832, 834, 895, 903` — straight quotes in prose.** `"the same"`, `"Here is the theory of operation"`, `"You, as the designer"`, `"lump VREF/4096 into K"` → `<q>…</q>`, as `ch-i2c.ptx` (29 uses) and `ch-motors.ptx` (21) do; `ch-servos.ptx` has none in prose. Not a voice finding, but it is student-facing and the corpus is otherwise uniform.

**19 — [MINOR] `:1044, 1083` — Reference section shrugs.**

    draft:   "The nearest standard value is what gets built, and the cost of a value away from the mean is a smaller swing, not a wrong reading."
             "…the counts are used directly and K is whatever works."
    hers:    "You build with the nearest standard resistor value; a value away from the geometric mean costs you a smaller swing between the dark and the lit reading, not a wrong reading."
             "…the counts are used directly, and K is chosen by trying values on your own build."

---

### Sweeps

- **Unit openings checked: 18** — chapter introduction; `sec-photo-before-class` introduction; `subsec-photo-cell`, `-family`, `-divider`, `-datasheet`, `-tracker`; `sec-photo-day16` introduction; Parts 1–6; `sec-photo-reference` introduction and its three subsections. **Failing: 4** — `subsec-day16-divider` ("From the reading:", #11), `subsec-day16-lab` (impersonal, #3), `subsec-day16-start` ("The rest of today is a start…", #14), and the last clause of the `sec-photo-day16` introduction ("there is time at the end", #14). The chapter opening and the day opening are both correct S‑22 form and should not be touched.
- **Slide titles: 0** — delivery 1 has no `<slide>` blocks; I checked the 6 Part titles and the 9 activity titles instead. **Epigrams: none.** "Wire the two dividers", "Solar tracker assembly", "Read 'A Solar Tracker' in the lab handout", "Discuss at your table how you might implement the feedback loop" are hers or the lab's verbatim. Note for delivery 2: findings 1, 2 and 3 are precisely the sentences that become slide lead lines, so they should be fixed in the prose before anything is condensed (B‑7).
- **Weekday or course-period as grammatical actor: 0** of 7 date references (S‑20). "which you saw on Day 15 as you turned the knob", "Your servo program from Day 15", "the shape of the Day 12 main loop" are all adverbial or possessive and correct. The two near-misses are periods, not days: "The rest of today is a start on…" and "there is time at the end" (#14).
- **"N, and it is the one that…" armature: 1** (S‑21) — `:813` "The controller in this loop is a program, and it is the program you will write." **Count frames (S‑28): 3** — `:909` "Two things the lab asks for, said once", `:696` "Two datasheet numbers say how fast…", `:867/880/898` "The sign first / Then the size of the step / Then the two ways" as a set. `:808` "There are two feedback loops in the tracker" delivers both immediately and is fine.
- **"we" in class-work sentences: 4 `we'll` / 11 `we` across 46 paragraphs** of `sec-photo-day16`, against **10 `we'll` / 32 `we` across 62 paragraphs** in the passed `sec-servo-day15`. Three of the four are in the section introduction; only Part 4 opens with one, and that is because it is her slide‑10 sentence verbatim. Parts 1, 2, 3, 5 and 6 all open impersonally.
- **Acronyms first-used without expansion (complete list):** `EOC`, `EOS` (`:1065`, Reference). Correctly expanded: ADC (`:10`), CdS and LDR (`:61-62`), lux (`:179`), 2856 K glossed as a tungsten lamp (`:169`), `milliseconds()` glossed as the SysTick count (`:917`), Reference Manual named wherever an RM0490 § appears (`:1056`, `:1064`, L‑14 ✓). Board labels: A0 (PA0), A1 (PA1), D11 (PA7) carry both names everywhere in prose and tasks — the single exception is the `fig-photocell-divider` caption (#17). **PWM bare: I agree** with the brief — it is expanded twice in `ch-servos.ptx` (chapter introduction and `subsec-servo-command`), its first appearance here is in Part 5 after two chapters of use, and her own Day 16 deck uses it bare. `AD2` bare is likewise consistent with the passed Day 15 sections.
- **Design scaffolding in student-facing text:** none of the linted kinds — no "Part N" outside titles, comments and `<instructor>` blocks; no minute counts outside comments and `<instructor>` blocks; no Canvas, spare hardware, staffing or "raise your hand". The three soft hits are "is done now, in class" (#3), "there is time at the end" (#14) and "said once" (#6).
- **Personified hardware verbs (L‑15/L‑17): 0.** No `sits`, `lives`, `meets`, no sensor or trace with a voice. The `says` hits are all documents, which is her own usage ("the SG90 datasheet says the servo rotates approximately 180 degrees", `ch-servos.ptx:190`). `:1006` "a laptop screen, a lamp across the room and a sunny window all attract the tracker" is Lab 8's own image and reads fine.
- **"write"/"write down"/"record" in a task: 0.** The draft correctly converts Lab 8's "record" to "look up", "measure", "compute", "note" and "compare" throughout `act-day16-study`, `act-day16-two-channel` and `act-day16-arm`. This is the one sweep the draft passes perfectly.
- **Em dashes: 1**, `:486`, inside the lab's section title, and finding #3 removes it. Whole-sentence bold leads at `:628` and `:781` are **not** findings: `ch-servos.ptx:1195, 1440` carries the same `<term>…?</term>` symptom-lead form and she passed it.

---

### Already written — reuse instead of invent

Reuse is unusually good in this draft; these are the exceptions and the confirmations.

- **`:486` "Technical Study – Photocells"** — she already wrote it: Day16 deck, slides 8 and 9 — "**Technical Study of Photocells**" / "Technical Study of Photocells, continued". Use hers (and lose the en dash).
- **`:903` "the lab's next paragraph … it says the same in its own words, and it recommends starting cautiously"** — Lab 8 §4 already says it: "*I recommend that you start out cautiously, with a value of K on the order of 0.01, and increase it as you gain understanding of the system's dynamics.*" Quote the lab's requirement, drop the meta-sentence (#9).
- **`:511-524` the geometric mean** — the lab cites *Williams* p. 133 here and the draft correctly drops the citation (P‑12 / CLAUDE.md: the course no longer cites Williams) and supplies the reason instead. That is the right call and the derivation checks out; the Reference's "setting its derivative with respect to R_M to zero gives the geometric mean" is correct. **Correct reuse, keep.**
- **`:466` "Each photocell is a bit different, even if two are 'the same' part"** — her slide 4 note verbatim ("Each photocell is a bit different, even if they are 'the same'"). ✓
- **`:414-421` `act-day16-direction`** — her slide 7 verbatim ("Discuss at your table: As the light gets brighter, does VM increase or decrease?"). ✓
- **`:452` the log-log relationship** — her slide 5 verbatim (`log10(R100) – log10(R10) = -0.6 (log10(E100) – log10(E10))`). ✓
- **`:454` "If we wanted a quantitative result in lux we would have to implement that conversion; for a light-or-dark sensor, or for our tracker, we do not."** — her slide 4, rewritten into her sentence form rather than her bullet form. ✓
- **`:714` "Now we'll add the photocells to the tracker arm of your servo."** — her slide 10 note verbatim. ✓
- **`:751-769` the three assembly tasks** — her slides 11, 12 and 13 verbatim, which is why the *prose* above them must give way (#5), not the tasks.
- **`:829` and `:848` activity titles** — her slide 15, title and body, verbatim. ✓
- **`:203-207` "A solar tracker uses servomotors to keep a solar panel pointed at the sun…"** — Lab 8 §4 verbatim, with "You may have seen an example on campus between Kemeny and Moore" correctly dropped. ✓
- **`fig-photocell-divider.svg`** — a faithful, legible redraw of her slide 7 image keeping her exact notation (V_cc, R_sens, R_M, V_M). Justified by B‑11a; the original is 7 kB and would not project. ✓

---

### For Petra, not for me

1. **Six power-sequence instructions in one class.** "Plug in the USB cable first, then the adapter" appears at `:497` and `:771`; "With nothing powered" at `:581` and `:753`; "Unplug the adapter…, then the USB cable" at `:503`; "Plug in the USB cable" at `:591`. Each sits at a real action, which is the B‑19 form you asked for ("a rule once, where the action happens") — but Day 15x was rejected partly for the unplug rule appearing four times in fifty minutes. Six times in 110 minutes at six genuine power transitions: right, or harping?
2. **Where the sensor-family paragraph should live.** Your Day 16 deck teaches it in class (slide 6), but this chapter now has a pre-class reading that teaches it first and a reading question that tests it. Finding #8 assumes the reading keeps it and the in-class beat becomes a recall. If you would rather teach it in class as before, the reading's `subsec-photo-family` should shrink instead and `rq-photo-family` move to the in-class questions.
3. **R₂ versus R_M.** The book's own notation is R_sens / R_M; Lab 8's Figure 1 is R₁ / R₂ / V₁. The reading maps them once (`:140-142`), then Part 2 switches to the lab's names because students are filling in the lab's blanks. Live with the two sets, or standardize the book on the lab's?

---

# checker-technical-accuracy (Parts 4–6 and the Reference)

## Verdict: BLOCKER

Scope reviewed: `subsec-day16-arm` (Part 4), `subsec-day16-loop` (Part 5), `subsec-day16-start` (Part 6), `sec-photo-reference` (all three subsections), plus `inst-day16-two-channel` as named in the task. File: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`.

Linter clean (`0 error(s), 0 warning(s)`); `check_starters.py` clean; all 9 image paths resolve; every `<xref>` in the file targets an id that exists somewhere in `source/`. No leak of protected content (see the bottom).

---

### Findings

**1. [BLOCKER] [L-6, B1] `ch-photosensors.ptx:891-893` — a `float` K does not remove the dead zone in this chapter's own loop**

> "A `float` *K* removes the dead zone, and the STM32C031C6 can do the arithmetic in software"

Source checked: the chapter's own worked loop, `inst-day16-loop` line 941/954: `int32_t pwm = SERVO_MID;` … `pwm = pwm + e / K_DIV;`. Run the rule over the chapter's own instance: with `float K = 0.01f` and `pwm` still `int32_t`, `pwm = pwm + K*e` for `e = 50` evaluates `300 + 0.5f = 300.5f`, and the assignment to `int32_t` truncates to 300. The step is still 0 for every `|e| < 100`, so the dead zone is **exactly the same width**. What removes it is accumulating the PWM value in a `float` (or carrying the integer remainder forward), converting only at the write.

Fix (rewrite in place, net zero words, B-18 displaces nothing):

> "A `float` *K* removes the dead zone only if the PWM value is accumulated in a `float` too and converted to an integer at the write, since assigning 300.5 to an integer discards the same half count; the STM32C031C6 has no floating-point unit, so that arithmetic runs in software."

The Cortex-M0+ "in software" half is correct and stays.

---

**2. [BLOCKER] [L-6, B2] `ch-photosensors.ptx:1079-1081` — the volts/counts gain conversion is stated backwards**

> "an ADC count is 3.3/4096 V, so an error in volts is the error in counts times that constant, and **a gain defined against volts is the gain against counts times the same constant**."

Source checked: Lab 8 p. 8 — *"we don't need to convert the ADC readings to actual voltages. We can just use the ADC readings directly and lump the proportionality constant VREF/4096 into K."*

Recomputed. Let `c = V_REF/4096`. `e_V = c·e_counts`. Equating the two controllers, `K_counts·e_counts = K_V·e_V = K_V·c·e_counts`, so **`K_counts = c·K_V`** — the counts gain is the volts gain times the constant, which is exactly what "lumping VREF/4096 into K" does. The chapter asserts `K_V = c·K_counts`, the inverse. The first clause of the sentence (errors) is right and the second (gains) is inverted, which is why it reads true. A student applying it to the lab's `K ≈ 0.01` gets 8×10⁻⁶ V⁻¹ where the answer is ≈12.2 V⁻¹ — off by a factor of ~1.5 million.

Fix (same length):

> "…so an error in volts is the error in counts times that constant, and a gain that was chosen to multiply volts becomes, when it multiplies counts instead, that gain times the same constant. Lumping VREF/4096 into *K* is that multiplication."

---

**3. [BLOCKER] [L-6] `ch-photosensors.ptx:1059-1061` and `:648-650` — the consequence drawn from the CCRDY rule is not the behaviour RM0490 describes**

Reference section, immediately after quoting the rule correctly:

> "…otherwise the write to `ADSTART` is ignored. A channel-select function that does not wait can therefore **start its first conversion on the previous channel**."

And `inst-day16-two-channel:648`:

> "A library whose `adc_setChannel()` writes `CHSELR` without waiting for `CCRDY` **starts the first conversion after the change on the old channel**…"

Source checked: RM0490 Rev 3 §14.4.12 *Starting conversions (ADSTART)*, p. 252 — *"After changing channel selection configuration (by programming ADC_CHSELR register or changing CHSELRMOD or SCANDIR), it is mandatory to wait until CCRDY flag is asserted before asserting ADSTART, otherwise the value written to ADSTART is ignored."* — and §14.12.3 ADC_CR, p. 281, same sentence.

The manual says the **start is ignored**, so **no conversion is started at all**. It does not say a conversion runs on the stale channel. The observable, with the Day 7/Lab 5 driver shape (`ADCPot.c`'s `adc_read()` polls EOC then reads DR, and reading DR clears EOC), is either a hang on the EOC poll or, for a driver that does not re-poll, the **previous conversion's result** returned again — which is the old channel's value one read late. The symptoms the note lists ("values look swapped, or lag the light by one sample") are the right symptoms of that stale-read mechanism, so only the mechanism sentence needs correcting.

Fix, both places (net −2 words in the Reference):

> Reference: "…otherwise the write to `ADSTART` is ignored. A channel-select function that does not wait therefore starts no conversion at all: the read that follows either blocks on `EOC` or returns the previous conversion's result, which is the old channel's."
> Instructor note: "A library whose `adc_setChannel()` writes `CHSELR` without waiting for `CCRDY` starts no conversion, so the read returns the previous one — the old channel, one read late; a student whose two values look swapped, or lag the light by one sample, has that."

---

**4. [MAJOR] [B-11c, B3] `ch-photosensors.ptx:716-717` and `task-day16-cups` — "some arms in the kits already carry their photocells" contradicts Part 2 and the lab's equipment list**

> "…a photocell is inserted into each cup; **some arms in the kits already carry their photocells**."
> task-day16-cups: "…**If your arm already carries its photocells, go on to the clips.**"

Sources checked: Lab 8 §1.3 Equipment — *"Two photocells (light-dependent resistors)"* — and this chapter's own `task-day16-wire-dividers` (line 578), which has every student wire **their two photocells into the breadboard** in Part 2, twenty minutes earlier. With exactly two cells per kit, no arm can already carry its photocells at the start of Part 4; the cells are on the breadboard, which is why `task-day16-cups` opens "remove your photocells from the breadboard". Lab 8 Appendix A's *"Most have already been assembled"* is about the 3D-printed **arm and stand** ("Using the small screws in your servo kit, gently attach the … to the mount, and then the arm to the motor"), and `ch-servos.ptx:1366` already treats that as done ("The SG92R on its stand, with the solar tracker's arm bolted to its horn"). No source says photocells ship pre-seated.

Fix (B-18: the replacement is shorter than what it displaces): delete the clause at 716-717 and the second sentence of `task-day16-cups`. If Petra confirms that some kits do ship with cells glued into the cups, then Part 2 is what has to change, not Part 4 — those students would have to clip the arm-mounted cells into the breadboard for the divider study.

Marked **UNVERIFIED** as to which way it resolves; needs Petra or the kit packing list.

---

**5. [MINOR] [L-6] `ch-photosensors.ptx:1062-1064` — scan order stated without its condition, and the section number is one level short**

> "the sequencer converts the selected channels in increasing channel order (Reference Manual §14.4, *Channel selection*)"

Source: RM0490 §14.4.**8** *Channel selection (CHSEL, SCANDIR, CHSELRMOD)*, p. 249 — the forward order holds when `CHSELRMOD = 0` **and** `SCANDIR = 0`; `SCANDIR = 1` scans highest-to-lowest. Both bits reset to 0 (ADC_CFGR1 reset value 0x0000 0000), so the statement is true for the class's configuration but is written as unconditional. Same for the preceding sentence, "one bit per channel", which is the `CHSELRMOD = 0` layout.

Fix: "…converts the selected channels in increasing channel order, the reset configuration (`SCANDIR = 0`, RM0490 §14.4.8, *Channel selection*)".

---

**6. [MINOR] [B-6] `ch-photosensors.ptx:955` vs `:1085-1087` — the `int32_t` → `uint16_t` handoff is asserted in the Reference but not made in the code**

Reference: "the bounded value is **converted back to `uint16_t` only when it is written**." The worked loop passes `updateServo(pwm)` with `int32_t pwm` and no cast; `Day15_servo_template.c` declares `void updateServo(uint16_t value);`. The implicit conversion is safe because `pwm` is clamped between two positive bounds first, but the code does not show the conversion the Reference says happens, and `-Wconversion` flags it. Fix: `updateServo((uint16_t)pwm);` — one cast, displaces nothing. (The blank-valued `#define PWM_LOWER /* their value */` placeholders are fine: they are her own `Day15_servo_template.c` convention.)

---

**7. [MINOR] `ch-photosensors.ptx:885-886` — "a whole count" is what integer division always produces**

> "a step of *e*/100, the step becomes a whole count only once |*e*| reaches 100"

`e/100` is a whole count for every *e*; what changes at |*e*| = 100 is that it becomes **nonzero**. Fix: "the step is zero until |*e*| reaches 100". (The arithmetic around it is right: 0.01 × 50 = 0.5 → 0; 100 counts × 3.3/4096 = 80.6 mV ≈ 0.08 V; 3.3/4096 = 0.806 mV/count; ±K_DIV counts ≈ 0.8 mV × K_DIV. All recomputed independently.)

---

**8. [MINOR] `ch-photosensors.ptx:964-965` — "hunts by one step when balanced" is contradicted by the snippet it describes**

> "`if (e > 0) pwm = pwm + STEP; else if (e < 0) pwm = pwm - STEP;`, which has no dead zone and **hunts by one step when balanced**."

At `e == 0` neither branch runs and the arm holds still. What is meant is that *e* is rarely exactly zero, so the arm dithers by one step about the balance point. Fix: "…and, because *e* is almost never exactly zero, dithers by one step about the balance point."

---

**9. [MINOR] `ch-photosensors.ptx:910-911` — the lab's bounds paragraph names `OCR1A`, not `CCR1`**

> "The lab asks that upper and lower bounds be imposed on the PWM value before it is written to `CCR1`"

Lab 8 p. 8: *"Be sure that you impose upper and lower bounds on the PWM values before writing to **OCR1A**…"* — an AVR holdover; the lab's own earlier sentence says the controller "writes it to the CCR1 register". The book's silent correction is the right call, but a student who greps that paragraph will not find `CCR1`. Optional half-clause: "…before it is written to `CCR1` (the lab's paragraph says `OCR1A`, an AVR name for the same register)". Displaces nothing; skip if the budget is tight.

---

**10. [MINOR] [P-10] Part 6 carries no instructor checkpoint or symptom block**

Part 4 has `inst-day16-arm-checkpoint`, Part 2 has `inst-day16-part2-checkpoint`, and Day 15's equivalents carry symptom lists. Part 6 is 9 minutes of open coding with nothing for the instructor circulating; the only support is the "What to expect on the demo" paragraph inside `inst-day16-loop`, one subsection earlier. The two coded tasks (`task-day16-fixed-step`) are covered by `inst-day16-loop`, so P-10 is satisfied, but nothing points there.

---

**11. [MINOR] Day 16 budgets 100 of its 110 minutes and has no close**

Parts sum 12 + 36 + 5 + 14 + 22 + 11 = 100. The three stated checkpoint minutes are self-consistent **only** with an unwritten ~5-minute opening: opening 5 → Part 2 reaches 5+12+3+6+7+8 = **41** ✓, then 51 + 2 = **53** ✓, then Part 3 to 58, Part 4 to 58+7+4+3 = **72** ✓, Part 5 to 94, Part 6 to 105. That leaves 105-110 unallocated and there is no closing block, where `ch-servos.ptx:1522` closes Day 15 with a paragraph and an explicit `<!-- Close, 5 min -->`. The minute-72 checkpoint in my scope is arithmetically sound; the gap is the missing bookends. A 5-minute close at 105-110 displaces nothing.

---

**12. [MINOR] `subsec-photo-ref-two-channel` never says PA1 needs no `MODER` change**

The Day 15 program calls `pa0_adc_init()`, which configures PA0 only; Part 6 says "the potentiometer read becomes two photocell reads" and the Reference explains only `CHSELR`. A student will ask what puts PA1 in analog mode. Source: RM0490 §6.4.1, p. 154 — `GPIOx_MODER` **reset value 0xEBFF FFFF (port A)**, so PA1's bits are `11`, analog, out of reset, and nothing in the course changes them. So the code works, but for a reason the book never gives. Optional one-clause addition, displacing the redundant "and a read that follows converts that channel" at line 1055-1056: "…PA1 needs no mode change, because `GPIOA_MODER` resets to 0xEBFF FFFF and every analog-capable pin starts in analog mode."

---

### Reasoning (Part B)

**[B1 rule vs. own example]**
- `:891-893` — "A `float` K removes the dead zone." The chapter's own `inst-day16-loop` (`int32_t pwm`, line 941) is the counter-example on the facing page: the truncation is in the assignment, not in K. Finding 1.
- `:964` — "hunts by one step when balanced," refuted by the very code quoted in the same sentence (`else if (e < 0)` does nothing at zero). Finding 8.
- Rules that survived the test: "a wrong sign shows up as an arm pinned at one end of its travel, not as an arm that hunts" (`:900-902`) is **correct** — sign-inverted feedback makes `e = 0` an unstable equilibrium, the error grows monotonically until the clamp, and at the clamp the error keeps its sign, so the arm stays pinned; and the loop clamps the state variable `pwm`, not just the output, so there is no windup to unwind. "The lab's ±60° is narrower than SERVO_MIN/SERVO_MAX" (`:912-915`) is correct: `Servosg90_datasheet.pdf` gives 1 ms = −90°, 2 ms = +90°, and `ch-servos.ptx:759` gives 200/300/400 counts at 5 µs, so ±60° is 233…367 inside 200…400.

**[B2 arithmetic]**
- `:1080-1081` — the gain conversion, recomputed from the substitution rather than from the conclusion. Right topic, inverted step, and here the conclusion is wrong too. Finding 2.
- `:885-887` — 0.01 × 50 = 0.5 → 0 ✓; step zero for |e| < 100 ✓; 100 × 3.3/4096 = 80.6 mV, written "about 0.08 V" ✓.
- `:1088-1090` — dead zone ±K_DIV counts ≈ 0.8 mV × K_DIV: 3.3/4096 = 0.8057 mV ✓, and 0.8 mV × 100 = 80 mV agrees with the 0.08 V in Part 5 ✓.
- `:962-964` — "halving K_DIV halves the band" ✓; "a smaller K_DIV is a larger gain and a narrower dead zone" ✓ (K = 1/K_DIV).
- `subsec-photo-ref-divider` — the geometric-mean claim verified by differentiation, not by memory: maximizing `R/((R_low+R)(R_high+R))` gives `(R_low·R_high − R²)/(…)² = 0`, so `R = √(R_low·R_high)` ✓; the stated swing expression and both limiting cases ("both terms near 0", "both terms near 1") are correct; "one count is about 0.8 mV" ✓.
- Timing: Part 4 = 7+4+3 = 14 ✓, Part 5 = 2+3+4+5+3+1+4 = 22 ✓, Part 6 = 9+2 = 11 ✓; day total 100 of 110, see finding 11.

**[B3 self-contradiction]** One found, over an end-to-end read of Parts 4-6 and the Reference: `:716-717` ("some arms in the kits already carry their photocells") against `:578` (`task-day16-wire-dividers` puts both cells in the breadboard in Part 2) and Lab 8's two-photocell equipment list. Finding 4. No others: Part 5's dead-zone prose, `inst-day16-loop`'s "settles inside a band of about 100 counts", and the Reference's "±K_DIV counts" all agree; Part 4's "the servo is not needed until the loop runs" agrees with Part 2's instructor note; Part 6's "the TIM16 tick becomes `milliseconds()`" agrees with Part 5's skeleton and worked loop; the `fig-day16-full-setup` caption agrees with `task-day16-recreate`.

**[B4 contradicts the book]** Nothing found; four inherited claims checked and all match.
- `milliseconds()` idiom — `:924-928` vs `ch-motors.ptx:3213`: same guard, and Day 16 uses the student-facing `last_update = milliseconds()` form rather than the instructor-only `last_sample += 10` variant, correctly.
- Power-up order — `task-day16-arm-print` "Plug in the USB cable, then the adapter" vs `ch-servos.ptx:1433` "Plug in the USB cable first, then the power adapter into the regulator board" ✓.
- Servo lead names and pins — the `fig-day16-full-setup` caption (red→5V row, brown→ground rail, orange→D11 (PA7), regulator GND→ground rail) is word-for-word consistent with `ch-servos.ptx:1425-1429` and the symptom list at `:1474`; "orange … (drawn yellow)" matches `ch-servos.ptx:1371` ("the signal lead is called orange and photographs yellow").
- `updateServo()` and SERVO_MIN/MAX — `:912-915` vs `assets/starters/Day15_servo_template.c` (limits to SERVO_MAX/SERVO_MIN before `tim14_pwm_set()`) and `ch-servos.ptx:759` (200/300/400 at 5 µs) ✓.
- Lab 5 API — `adc_setChannel()` / `adc_getValue()` verified verbatim against `Lab5_ES28.pdf` p. 4 prototypes ✓. Note the Day 15 template itself uses `pa0_adc_init()`/`start_conversion()`/`adc_read()`; the chapter flags this ("with … Lab 5's ADC names", "If your library uses other names for those functions, use your own"), so it is handled, not a finding.

**Figures, rendered and checked against their captions (not read off filenames):**
- `week8FullLabSetup.png` — zoomed the analog header: the six-pin block reads A5 A4 A3 A2 (A1) (A0) left to right (labels are drawn rotated), the **blue** wire is on the fifth pin, **A1**, and the **purple** on the sixth, **A0**. Traced both to the breadboard: blue lands on the **left** divider's node column, purple on the **right**. The caption's "the right-hand node goes to A0 (PA0), the purple wire, and the left-hand one to A1 (PA1), the blue wire" is **correct**. Also verified in the artwork: photocell from the lower (red, +) rail row via the red jumper to the node, brown-black-orange (10 kΩ) resistor from the node to the upper (black, −) rail row; green from the servo's red lead to the regulator's 5V-pin column; black from the regulator's GND-pin column to the ground rail; yellow on the pin labelled `PWM/MOSI/D11`; no potentiometer. Every clause of the caption checks out.
- `fig-tracker-two-loops` — both panels rendered. Left (`Day15-Servos/slide08_095020b6.png`): command position, ± summing junction, error, CONTROLLER, MOTOR, GEARS, position output, POTENTIOMETER feedback — caption ✓. Right (`lab8-fig6-tracker-loop.png`): SENSORS with V₀ and V₁, two ADC blocks, CONTROLLER, PWM, SERVO, "Angle, θ", feedback to the sensors — caption ✓, and the caption's "two ADC **conversions**" is the right wording for a figure that draws two ADC symbols where the hardware has one multiplexed converter.

**Hardware/source claims confirmed rather than assumed:** photocell rise/fall 55 ms / 20 ms (`CdS-photocell-PDV-P8001.pdf`, t_r 55 ms, T_f 20 ms typ, 10 lux @ 2856 K) ✓; "The Adafruit guide calls this the Axel Benz formula" (`Adafruit-photocells.pdf` p. 12, *"Pull-Down-Resistor = squareroot(Rmin * Rmax)"*) ✓, and using Adafruit rather than Lab 8's own Williams p. 133 citation is right per the no-Williams rule; `milliseconds()` returns `uint32_t` (`assets/starters/sysinit.c:60`), matching the loop's `uint32_t last_update` ✓; EOC-per-conversion / EOS-after-the-last (RM0490 §14.4.10, p. 251) ✓; Deliverables 9 and 10 as described (Lab 8 p. 8) ✓; Appendix A's four assembly steps against Part 4's three tasks — step 1 (arm to mount to motor) is already done in `ch-servos.ptx:1366`, so its omission is correct, and no student turns a screw in Part 4, so the lab's over-torque warning is not needed here.

### Protected list

No leak. The student-facing `<program>` at `:924-928` is the Day 12 `milliseconds()` guard with the controller body as a prose comment ("read both channels, compute e, update the PWM value, bound it, write it") — not Deliverable 9's controller. The full controller appears only in `inst-day16-loop`, which P-10 permits, with the sign and both bound values left to the student. No CCR1→angle formula appears anywhere in Parts 4-6 or the Reference; Deliverable 10 is named in prose only (`:1002-1004`).

### Unverified

- "some arms in the kits already carry their photocells" (`:716-717`) — needs Petra or the kit packing list; no source supports it and Lab 8's two-photocell equipment list plus Part 2 argue against it.
- Whether Deliverable 10 is required or bonus — Lab 8 files it under "4.1 Final Touches Credit" (2 pts) and the chapter presents it flatly alongside D9 (10 pts). Needs Petra's ruling on whether the book should say so.

---

# checker-technical-accuracy (the reading and Parts 1–3)

## Verdict: BLOCKER

Scope reviewed: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` lines 1–707 (chapter introduction, `sec-photo-before-class` incl. all five subsections and `rq-photo`, and Day 16 Parts 1–3). Linter: `python3 scripts/check_rules.py source/ch-photosensors.ptx` → **0 errors, 0 warnings**. `image_ratios.py --check` → current. All 13 `xref` targets used in scope resolve; both images used in scope exist; `act-day16-two-channel` (the only coded activity in scope) has `inst-day16-two-channel` (P-10 ✓). Timing comments sum correctly (12 + 36 + 5 = 53, and with a 5-minute opening the stated checkpoints land exactly on minutes 41, 53 and 72).

### Findings

**1. [BLOCKER] [L-6/B-6] `ch-photosensors.ptx:648-651`** — instructor block: *"A library whose `adc_setChannel()` writes `CHSELR` without waiting for `CCRDY` **starts the first conversion after the change on the old channel**, so a student whose two values look swapped, or lag the light by one sample, has that."*
Checked against RM0490 (`assets/stm32c031_rm.pdf`, ADC_CR bit description, PDF p. 281): *"After writing to ADC_CHSELR register or changing CHSELRMOD or SCANDIRW, it is mandatory to wait until CCRDY flag is asserted before setting ADSTART, **otherwise, the value written to ADSTART is ignored**."* No conversion is started at all — the hardware does not convert the old channel. The real symptoms are (a) a library that polls EOC hangs, because EOC never rises, and (b) a library that does not poll returns the *previous* conversion's result still sitting in `ADC_DR`, which is what looks swapped or lagged.
Fix, displacing the clause "starts the first conversion after the change on the old channel, so a student whose two values look swapped, or lag the light by one sample, has that": "has its `ADSTART` write ignored (RM0490, `ADC_CR`), so no conversion starts: a read that polls `EOC` hangs, and a read that does not poll returns the previous channel's result still in `ADC_DR`, which looks like two values swapped or lagging the light by one sample."
**Same defect, outside my scope but needing the same edit**: line 1060-1061, *"A channel-select function that does not wait can therefore start its first conversion on the previous channel"* — this sentence quotes the manual correctly two lines earlier and then draws a conclusion the manual contradicts. Flag to the Reference invocation.

**2. [BLOCKER] [L-6] `ch-photosensors.ptx:167-170`** — *"The Electro-optical characteristics table is the one the tracker depends on, and **every row of it carries a test condition: 10 lux** from a lamp at 2856 K (a tungsten lamp), and the whole table at 23 °C."*
Checked against `assets/datasheets/CdS-photocell-PDV-P8001.pdf` (read with PyMuPDF). Of the six rows: R_D and R_I and t_r and t_f are at 10 lux/2856 K ✓, but **Sensitivity**'s test-conditions cell is `LOG(R100)−LOG(R10) / LOG(E100)−LOG(E10)` — 100 lux against 10 lux, not 10 lux — and the two spectral rows (λ_range, λ_peak) carry "Flooded" and no lux condition at all. The chapter refutes itself 280 lines later (line 444-448 correctly defines the sensitivity between 100 lux and 10 lux). Students are sent to "note the test conditions beside each" in Deliverable 1 (line 536-537), so the wrong description is load-bearing.
Fix, displacing "every row of it carries a test condition: 10 lux from a lamp at 2856 K (a tungsten lamp), and the whole table at 23 °C": "its rows carry their own test conditions: the two resistances and the two times are measured at 10 lux from a lamp at 2856 K (a tungsten lamp), the sensitivity is defined between 100 lux and 10 lux at that same color temperature, and the whole table is at 23 °C."

**3. [BLOCKER] [B-11c] `ch-photosensors.ptx:140-142`** — *"Lab 8 draws the same circuit in its Figure 1 with the photocell named R_1, the fixed resistor R_2 and **the node V_1**."*
Checked by extracting and rendering Lab 8's Figure 1 image (`assets/Labs/Lab8_ES28.pdf` p. 2, XObject 120). The figure labels R_1 ✓ and R_2 ✓, but the node is labelled **V_AVR_PCx** (an AVR leftover; `plans/week8-ground-truth.md` §4 flags it as one of the lab's own problems). `V_1` appears only in the Deliverable 5 text. A student who looks at Figure 1 as instructed sees a label the book says is not there.
Fix, displacing "and the node <m>V_1</m>": "and the node, labelled <m>V_{AVR\_PCx}</m> in the drawing and <m>V_1</m> in the deliverables."

**4. [BLOCKER] [B-1/B-4] `ch-photosensors.ptx:109-110` and `687-690`** — *"All four are read with the same circuit, the voltage divider of the next subsection, and one ADC channel each"* (Before Class), and *"…and the potentiometer for position or angle, each one in the same divider and each on one ADC channel. **The one change from sensor to sensor is the fixed resistor**, chosen by the same geometric-mean reasoning from that sensor's own range"* (Part 3).
Run the rule over the chapter's own instance: the potentiometer. `ch-adc.ptx:192-210` (`fig-adc-divider`) shows the pot's *track* as both halves of the divider, wired rail to rail, with **no fixed resistor** — there is nothing to choose by geometric mean. The chapter's own reading-question feedback says so at line 378-379: *"A potentiometer is its own divider, which is how it gave the ADC a voltage in the ADC chapter."* Her slide 6 (ground truth §1) only lists the sensors; the "same divider, same fixed resistor" claim is the book's addition.
Fix, Before Class, displacing "All four are read with the same circuit, the voltage divider of the next subsection, and one ADC channel each": "The photoresistor, the thermistor and the force-sensing resistor are read with the same circuit, the voltage divider of the next subsection, and one ADC channel each; the potentiometer needs no fixed resistor, because its own track is both halves of the divider."
Fix, Part 3, displacing "and the potentiometer for position or angle, each one in the same divider and each on one ADC channel. The one change from sensor to sensor is the fixed resistor…": "each one in the same divider and each on one ADC channel, with the fixed resistor the one change from sensor to sensor, chosen by the same geometric-mean reasoning from that sensor's own range. The potentiometer is the exception you have already built: its track is both halves of the divider, so it needs no fixed resistor at all."

**5. [BLOCKER] [B-2/B-4] `ch-photosensors.ptx:703-705`** — *"The other bound is the servo. Its datasheet gives 0.1 s per 60°, **so the arm cannot respond to commands that arrive much faster than that**, and sampling faster than the arm can move buys nothing."*
The value is right (`assets/datasheets/C17481_SG92R_datasheet.pdf`: operation speed 0.1 s/60° at 4.8 V, per ground truth §3, and `ch-servos.ptx:320`), but the step is wrong. 0.1 s/60° is a slew *rate*, not a response latency: the tracker's steps are a few timer counts, i.e. a few degrees, which complete in a few milliseconds. What actually bounds how fast a new command can arrive is the frame the servo chapter taught — one pulse per 20 ms at 50 Hz (`ch-servos.ptx`, her slide 10 note in ground truth §1a). Right conclusion, wrong derivation, in a paragraph the Part makes a two-minute set-piece of.
Fix, displacing "so the arm cannot respond to commands that arrive much faster than that, and sampling faster than the arm can move buys nothing": "so a correction of a few degrees takes only a few milliseconds to complete, and in any case the servo accepts a new command once per 20 ms frame; sampling much faster than the frame buys nothing."

**6. [MAJOR] [B-11b] `ch-photosensors.ptx:439-441`** — *"The figure is a log-log plot: both axes are logarithmic, so **each division of the grid is a factor of ten**."*
Rendered `assets/images/Day16-Photosensors/slide04_0c98f286.png` and looked at it: the grid carries the usual logarithmic *minor* lines (roughly nine per decade, at 2, 3, 4 … 9), so a "division of the grid" is emphatically not a factor of ten; only the labelled decades (100, 1k, 10k, 100k, 1 Meg, 10 Meg; 0.1, 1, 10, 100, 1000) are. A student counting divisions on the figure in front of them gets the wrong answer.
Fix, displacing "so each division of the grid is a factor of ten": "so each labelled step along either axis, 1k to 10k or 10 lux to 100 lux, is a factor of ten."
(The rest of the caption checks out: the graph is the Adafruit guide's own, red curve included — verified against `Adafruit-photocells.pdf` p. 5, image 1, which is pixel-for-pixel the same plot. "This is the guide's generic family, not the PDV-P8001's own curve" ✓ ground truth §3.)

**7. [MAJOR / partly UNVERIFIED] [L-6/B-2] `ch-photosensors.ptx:697-703`** — *"after the light changes, the resistance takes tens of milliseconds **to settle**. The lab's one-second sampling for the study is far slower than that, **and so is any sampling interval we would choose for the loop**; a reading taken every tenth of a second is a settled reading."*
Two problems. (a) Arithmetic: the loop's interval is 100 ms (`T_MS 100` in `inst-day16-loop`, line ~955) against a 55 ms rise time — a factor of 1.8, which is not "far slower"; the 1 s study interval is (18×), so a true statement about one interval has been extended to a false one about the other. (b) The datasheet gives t_r = 55 ms and t_f = 20 ms with **no threshold definition**, so "settled" cannot be sourced from it; and the sheet's own dark-resistance condition, "After 10 sec. @ 10 Lux", shows the resistance still moving seconds after a light change. Same over-claim at line 175-176 ("which say how long the resistance takes to settle after the light changes").
Fix, displacing "and so is any sampling interval we would choose for the loop; a reading taken every tenth of a second is a settled reading": "and the tenth of a second we would choose for the loop is still longer than either time, so neither the study nor the loop is limited by the cell."
**UNVERIFIED**: the 10%–90% or 63% convention behind t_r/t_f — needs the Advanced Photonix application note, not the one-page sheet.

**8. [MAJOR] [B-3] `ch-photosensors.ptx:276-279`** — distractor feedback in `rq-photo-variation`: *"The rise and fall times on the datasheet are tens of milliseconds, **so both cells settle almost at once**."*
Same over-claim as #7, now in a reading question, and the distractor it rebuts ("the cells need a few minutes under the lamp before they agree") is closer to true than the feedback allows: the datasheet's own dark-resistance row is specified only *after a 10-second dwell at 10 lux*, precisely because CdS cells carry light history. The exercise's correct answer is unaffected; the feedback teaches something the sheet contradicts.
Fix, displacing "so both cells settle almost at once": "so both cells respond in tens of milliseconds, not minutes."

**9. [MAJOR / UNVERIFIED] [B-11b] `ch-photosensors.ptx:76-79`** — caption of `fig-photocell-photo`: *"The face is the cadmium sulfide, laid down in a winding track between the two electrodes **to make the light-sensitive path long**."*
Rendered `slide03_img1.png`: the face shows the serpentine pattern and two contact posts. Neither source supports the purpose clause — the PDV-P8001 sheet says only "sintered construction … two leaded plastic-coated ceramic header", and the Adafruit guide says only "the squiggly face". The clause is very likely backwards: the pattern is the gap between two interdigitated electrode combs, whose effect is a *short, wide* conduction path (large W/L) over a large sensing area, i.e. a lower resistance, not a longer path.
Fix, displacing "laid down in a winding track between the two electrodes to make the light-sensitive path long": "laid down between two electrodes whose interdigitated fingers make the winding pattern you see". **UNVERIFIED**: the construction and its purpose — needs an Advanced Photonix or Silonex application note on CdS cell construction before any mechanism is asserted.

**10. [MAJOR / UNVERIFIED] [B-11c] `ch-photosensors.ptx:673-676`** — instructor checkpoint: *"A value stuck at 4095 or 0 with a sensible voltmeter reading: the program is reading a channel with nothing on it."*
An analog input with nothing connected floats; its converted value is indeterminate and drifts, and pinning at a rail is not what it does. No source available for this diagnostic. It also sits oddly beside the correct student-facing symptom list at 664-668. Either name a mechanism that produces a rail (a pin left with a pull-up enabled, or an `adc_setChannel()` argument that selects an internal channel) or drop the value: "A value that drifts or makes no sense with a sensible voltmeter reading: the program is reading a channel other than the one on the node."

### Reasoning (Part B)

- **[B1 rule vs. own example] `:109` and `:687-690`** — the rule "all of these resistive sensors go in the same divider, and the only change is the fixed resistor chosen by geometric mean". The chapter's own instance it misclassifies: the potentiometer, whose figure in `ch-adc.ptx` has no fixed resistor and whose own reading-question feedback at `:378` says "A potentiometer is its own divider". Finding 4.
- **[B1 rule vs. own example] `:168`** — the rule "every row of the electro-optical table carries the 10 lux test condition". The chapter's own instance it misclassifies: the sensitivity row, which the chapter itself defines at `:444-448` between 100 lux and 10 lux. Finding 2.
- **[B2 arithmetic] `:700-702`** — "The lab's one-second sampling … is far slower than that, and so is any sampling interval we would choose for the loop." Recomputed: 1000 ms / 55 ms = 18× (far slower ✓); 100 ms / 55 ms = 1.8× (not far slower ✗). Right conclusion (100 ms works), wrong step. Finding 7.
- **[B2 arithmetic] `:703-705`** — "0.1 s per 60°, so the arm cannot respond to commands that arrive much faster than that." Recomputed: a step of a few timer counts is a few degrees, ≈ 5 ms of travel; the binding constraint is the 20 ms frame. Right conclusion, wrong step. Finding 5.
- **[B2 arithmetic — checks that PASSED]** 10^0.6 = 3.981 ≈ 4 ✓ (`:448-449`); 3.3 × 10/30 = 1.100 V and 3.3 × 10/20 = 1.650 V ✓ (`:427-429`); the geometric mean **provably** maximizes the swing — d/dR₂[R₂/(R_l+R₂) − R₂/(R_d+R₂)] = 0 gives R₂ = √(R_l R_d) exactly, so "as far apart as this photocell can put them" (`:521-522`) is correct, not merely plausible; the strain-gage claim is quantitatively sound (0.1 % ΔR/R in a matched divider ≈ 0.83 mV ≈ 1 LSB at 3.3 V/12 bits, so "too small … to resolve" ✓, `:361-364`); Part timing sums 12/36/5 and the minute-41, minute-53, minute-72 checkpoints are all consistent with a 5-minute opening in a 110-minute Thursday.
- **[B3 self-contradiction] `:168` ⟷ `:444-448`** — "every row … carries a test condition: 10 lux" vs. "the footnotes define it as [log(R₁₀₀) − log(R₁₀)]/[log(E₁₀₀) − log(E₁₀)], with R₁₀₀ and R₁₀ the resistances at 100 lux and at 10 lux". The first is wrong; the sheet's sensitivity row is defined against 100 lux.
- **[B3 self-contradiction] `:109-110` ⟷ `:378-379`** — "All four are read with the same circuit, the voltage divider" vs. "A potentiometer is its own divider". The body text is wrong.
- **[B3 self-contradiction] `:648-650` ⟷ `:1057-1061`** — the instructor block says the ADC "starts the first conversion … on the old channel"; the Reference quotes the manual correctly ("the write to `ADSTART` is ignored") and then draws the same wrong conclusion. Both need the same repair.
- **[B3 — no other contradictions found]** in an end-to-end read of the introduction, Before Class (five subsections + five questions) and Parts 1–3 against Parts 4–6 and the Reference: the divider orientation, the 3.3 V rail, A0/A1, the "compare two cells, never measure one" line, the pot-comes-out sequencing, T = 100 ms, and the "start on the loop, the loop is lab work" framing are consistent throughout.
- **[B4 contradicts the book] `:703-705`** — 0.1 s/60° presented as the bound on command arrival; `ch-servos.ptx` (her slide 10 note, ground truth §1a) teaches the 50 Hz/20 ms frame, and `ch-servos.ptx:318-339` frames 0.1 s/60° as travel time (0.3 s for 180°). The servo chapter is right.
- **[B4 — checks that PASSED]** the recalled divider formula `V_wiper = V_supply × R₂/(R₁+R₂)` matches `ch-adc.ptx:186-190` verbatim in form and in which resistor is which ✓; "the ADC's reference is 3.3 V" matches `ch-adc.ptx:95-100` ✓; "A0 and A1 are ADC_IN0 and ADC_IN1 in Table 12, *Pin assignment and description*" verified directly in `assets/stm32c031_datasheet.pdf` p. 30 (PA0 → ADC_IN0/WKUP1, PA1 → ADC_IN1) and the table title on p. 29 ✓; the pot is on A0 per `ch-servos.ptx:1383` ✓; "USB cable first, then the power adapter" matches `ch-servos.ptx:1387-1392` ✓; `act-day15-servo-wire`, `subsec-day15-power`, `fig-servo-leads` all exist and say what the chapter says they say ✓; Lab 5's names `adc_setChannel()` / `adc_getValue()` verified on `assets/Labs/Lab5_ES28.pdf` p. 4 ✓; `delay_ms()` is real (`assets/starters/ES28.h:18`) and the `"\n\r"` ordering in the instructor `printf` matches the Day 15 template's own idiom (`ch-servos.ptx:1054`) rather than diverging from it ✓.
- **[Figure check, rendered]** `fig-photocell-divider.svg` rendered: R_sens (variable) from V_cc to node, R_M node to GND, `V_M = V_cc · R_M/(R_sens + R_M)`, "to an ADC pin, A0 or A1" — caption at `:145-150` is accurate, and the SVG carries matching `width`/`height`/`viewBox` (B-11a ✓). `slide09_a9c74b15.png` (Lab 8 Figure 2) rendered and zoomed at both the breadboard and the header: red jumper from the 3.3 V rail into each photocell's row, photocell to a node row, 10 kΩ (brown-black-orange) from that row to the ground rail, node to an analog pin; the Nucleo's 3V3 and GND feed the two rails. Caption at `:570-575` is accurate, and its deliberate refusal to say which node is A0 is the right call — in the lab's own figure the *left* divider goes to A1 and the *right* to A0, which is the opposite pairing to a reader's left-to-right instinct.

### Protected-list audit (ground truth §4)

**Pass.** No student-facing sentence in scope prints or nearly prints Deliverable 1's minimums, a measured value, a computed R₂, an expected voltage, an answer to "is 10 kΩ a problem", or an example reading.
- `:172` names the dark and illuminated resistance rows and says Lab 8 asks you to look them up, without values ✓.
- `:511-524` teaches the geometric-mean rule and *why* it centers the swing, which §4 explicitly permits, and stops at "Deliverable 6 asks whether that value … is a problem" without answering ✓.
- The 20 kΩ → 10 kΩ worked example at `:425-429` is explicitly disclaimed ("With numbers that are not our photocell's") and does not reproduce D5/D6 for these parts ✓.
- The only place the minimums appear is `inst-day16-two-channel` (`:652-654`), an `<instructor>` block, which is stripped from the reading book, the student deck, the PDF and the search index ✓.
- Two advisories, not violations: (i) `:94-96` sends students to the Adafruit guide, whose page 4 carries "Resistance range: 200KΩ (dark) to 10KΩ (10 lux)" — numerically D1's dark answer, one click away. Ground truth says that line "is not quoted either"; it is not quoted ✓, but Petra may want to know the link reaches it. (ii) `:188` compresses the guide's "0.27 − 1 lux" row to "1 lux" while presenting the table as the guide's rows (see MINOR below).

### Minor

- **[MINOR] `:20-25`** — the introduction's two enumerations are short: "the reading introduces the photocell, the family …, the divider, and the photocell's datasheet" omits `subsec-photo-tracker`, the fifth subsection (which the Before Class introduction at `:49-51` lists correctly); and the in-class list omits Part 3 and Part 6.
- **[MINOR] `:488-489` vs `:564-567`** — "The order is the handout's: the datasheet, the multimeter, the fixed resistor, the two dividers, the program", but the AD2 voltmeter step is then placed *before* the program, where Lab 8 §2 puts it after ("Write a program … Wire the sensor voltages to analog channels 1 and 2 of the AD2"). The reordering is good pedagogy; say it is ours, displacing "The order is the handout's": "The order is the handout's, with one change: we read the nodes on the AD2 before the program rather than after."
- **[MINOR] `:188`** — table row "1 lux / full moon on a clear night"; the guide's row is "0.27 − 1 lux". The other four rows match `Adafruit-photocells.pdf` p. 6 exactly.
- **[MINOR] `:443-448`** — "the **footnotes** define it as [log(R₁₀₀) − log(R₁₀)]/[log(E₁₀₀) − log(E₁₀)]". The ratio is printed in the row's *test-conditions* cell; the two footnotes define R₁₀₀/R₁₀ and E₁₀₀/E₁₀. Displace "the footnotes define it as" with "the row states it as", keeping the footnote clause that follows.
- **[MINOR] `:599-607`** — the two-channel instructions never mention that the second pin must be in analog mode. It happens to work without a line of code, because GPIOA_MODER's reset value is 0xEBFF FFFF (RM0490 §6.4.1, p. 153), i.e. MODE1 = 11 = analog — but Day 7 taught students to clear-and-set MODER for PA0 explicitly (`ADCPot.c` TODO 1), so the silence will be asked about. One instructor sentence covers it.
- **[MINOR] `:611`** — "Modify your Lab 5 program, **or the ADC part of your servo program**". The Day 15 template as printed (`ch-servos.ptx:1036-1046`) has `pa0_adc_init()`, `start_conversion()`, `adc_read()` and **no channel-select function at all**, so the second route needs more than "the same thing twice". Worth a clause: the servo program's ADC part reads one hard-wired channel, so students starting there bring `adc_setChannel()` over from Lab 5.
- **[MINOR] `:432-435`** — "V_cc is the Nucleo's 3.3 V and not its 5 V because the ADC converts voltages up to its 3.3 V reference". True but incomplete: the reason not to feed the divider from 5 V is not only that the top of the range is exceeded but that an input above VREF+/VDDA on a pin configured as an analog input is outside the device's operating conditions. Given the course rule about never implying 5 V is available for signals, the stronger reason is the one to give.

### Unverified

- Construction and purpose of the serpentine face (`:76-79`) — needs an Advanced Photonix / Silonex CdS application note.
- The t_r/t_f threshold convention (`:175-176`, `:698-700`) — needs the Advanced Photonix application note; the one-page sheet defines neither.
- "Each curve of the family is one type of cell" (`:443`) — the Adafruit guide labels no curve and states only "each photocell will be a little different"; the plot is reproduced from an unnamed application note.
- "hardly at all to infrared" (`:332`) — physically sound for CdS (band gap ≈ 2.4 eV) but an extrapolation past the sheet's stated 400–700 nm application range; neither source says it.
- "A multimeter reads resistances in the kilohm range to within a percent or so" (`:283-284`) — no source for the kit's meter.
- "A phone's flashlight held close to the cell is far brighter than [10 lux]" (`:195-196`) — plausible by estimate (≈ thousands of lux), unsourced.
- "with the handout in front of you; the handout has a space for each answer" (`:487-489`) — the blanks are real (Lab 8 §2, "Record your answers … in the space provided"), the paper handout is a classroom claim with no source; her Day 16 deck pasted the deliverables onto slides 8–9 instead.

---

# checker-figure-claims

## Verdict: MAJOR

---

### Figures opened

Every figure below was rasterized and read. The bitmaps in the brief's directory were verified byte-identical to their sources (`md5`); the one SVG was **re-rendered myself in headless Chrome**, because PyMuPDF drops this file's `stroke`/`fill:none` polylines and mangles `tspan dy` — and the re-render did not match the PNG I was given (finding 3).

| id | rendered how | what is actually in it (before reading the caption) |
|---|---|---|
| `fig-photocell-photo` | `Read` of `slide03_img1.png` (1200×900), plus a 6× crop of the face | A CdS cell on a dark ground. Face = a light-**grey** disc carrying a dark reddish-**brown serpentine** line, two small metal posts (upper-left, lower-right), orange epoxy around the rim, two long tinned leads out the back. |
| `fig-photocell-divider` | headless Chrome at 2× from the committed SVG | Vertical divider: `V_cc` bar at top → variable resistor (zigzag with a diagonal arrow) labelled `R_sens` / **"the sensor"** → node dot → fixed zigzag labelled `R_M` / "the fixed resistor" → GND symbol. An arrow from the node points right at `V_M = V_cc · R_M/(R_sens + R_M)`; below it, "to an ADC pin, A0 or A1". |
| `fig-photocell-loglog` | `Read` of `slide04_0c98f286.png` (500×351) at 3× | "Resistance vs. Illumination". y = RESISTANCE–ohms, 100 → 10 Meg; x = Illumination (lux), 0.1 → 1000. ~8 near-straight descending curves, unlabelled; exactly **one is red**, the lowest of the family. Log-log grid. |
| `fig-day16-lab-fig2` | `Read` of `slide09_a9c74b15.png` (981×1426), plus 3× crops of header and breadboard | Fritzing. Nucleo 3V3 → lower rail row (red line, "+"); GND → upper rail row (blue line, "−"). Two identical dividers at cols 4/6 and 9/11: red jumper + rail → row J; photocell across the two columns in F/G; brown-black-orange-gold resistor from the node column up to the **ground** rail; blue wire on node 1 → analog pin **5** (A1), green wire on node 2 → analog pin **6** (A0). "fritzing" watermark bottom right. |
| `fig-day16-cup` | `Read` of `slide11_324c26cf.png` (581×549), plus 6× crop | Photo. End of a **black** arm; a round recess with a photocell seated in it (CdS serpentine visible). A large red arrow points up at it, labelled "Photocell". Blue servo body lower left, graph paper behind. |
| `fig-day16-clips` | `Read` of `slide12_a6a60c41.png` (726×544), plus 4× crops of both ends | Photo. Black arm upright on a blue servo. **Four** alligator clips: blue + yellow on the top cell's two leads, white + green on the bottom cell's. Two of the four wires end in visible male breadboard pins (yellow, white); the blue and green wires run off the right edge. |
| `fig-day16-full-setup` | `Read` of `week8FullLabSetup.png` (2236×1874), plus 3–8× crops of header, D11, breadboard, servo, regulator | Fritzing. Same two dividers, verified hole by hole. Blue → **A1** (5th analog pin), purple → **A0** (6th). Yellow → the pin labelled `PWM/MOSI/D11`. Servo stubs yellow/red/black carry yellow, **green**, black wires. Nucleo 3V3 → "+" rail, GND → "−" rail. **No potentiometer.** Regulator board drawn rotated over the breadboard's bottom-right corner; a black wire runs from the "−" rail down to col 29 row I; the green wire ends at col 28 row I. |
| `fig-tracker-two-loops` | `Read` of the two panels side by side (1912×252) | **Left** (`Day15-Servos/slide08_095020b6.png`, 986×252): command position → ⊕ (+ in, − from below) → error → CONTROLLER → MOTOR → GEARS → position output; feedback via POTENTIOMETER. **Right** (`lab8-fig6-tracker-loop.png`, 886×205): SENSORS (two circles, V₀ and V₁) → two ADC triangles → CONTROLLER → PWM → SERVO → "Angle, θ", with a return line from the far right back to the sensors. |

Also opened, because the chapter makes claims about them: `Day15-Servos/slide09_a204d4b1.jpg` (`fig-servo-leads`), `Day15-Servos/towerProPowering.png` and `towerProPot.png` (the Day 15 precedent for the regulator drawing), `Day07-ADC/adc-divider.svg` (`fig-adc-divider`), `assets/datasheets/Adafruit-photocells.pdf` p. 5, `assets/datasheets/CdS-photocell-PDV-P8001.pdf`.

---

### Correspondence failures

**1. [MAJOR] `fig-day16-full-setup` — the two regulator-board connections the caption asserts are not connections in the drawing.**

Caption: *"The servo's red lead goes to the row of the regulator board's 5V pin (drawn green) … the regulator board's GND pin is wired to the ground rail."*

Measured, in image pixels (breadboard row pitch 36–37 px; row I = y 1296, row F = y 1405, row E ≈ y 1481; col 28 = x 1694, col 29 = x 1730, col 30 = x 1766):

- green wire (servo power) terminus: **col 28, row I** — top half.
- black wire (from the "−" rail, confirmed adjacent to the blue line): **col 29, row I** — top half.
- regulator `J4` header (5V/GND/Vin): **y ≈ 1434 — inside the centre channel**, seated in no hole at all.
- regulator `J2` header: **y ≈ 1519 — row D**, the bottom half.
- header pin pitch as drawn is 28 px against the board's 36 px, so the part is not on the grid in either axis.

The two halves of a breadboard column are separate nodes. As drawn, the servo's 5 V and the regulator's ground are floating. The columns happen to line up (28 and 29), which is what makes this read as correct at a glance and is exactly why it survived. A student wiring from the picture gets an unpowered servo, and Part 6's loop never runs.

This is Petra's own Fritzing export, so — **ask for the original rather than patching it** (P-12). Two graded options worth offering her: (a) re-export with the regulator board seated in the top-half rows the green and black wires already occupy; (b) re-export with the board drawn clear of the breadboard, as her Day 15 `towerProPowering.png` does, in which case the caption must borrow Day 15's sentence — *"The regulator board is plugged into the breadboard, so each of its pins is reached through the row it sits in"* — which `fig-day16-full-setup`'s caption currently lacks. Day 16's version is the more dangerous of the two precisely because the board overlaps the board's bottom rows and so looks seated.

**2. [MINOR] `fig-photocell-photo` — the caption names a region the picture does not distinguish.**

Caption: *"The face is the cadmium sulfide, laid down in a winding track between the two electrodes."* At 6× the face has two candidate regions — a grey field and a dark brown serpentine — and nothing in the image says which is the CdS. A reader cannot follow the caption to a place in the picture. Fix by naming the colour: *"the dark meander is the cadmium sulfide; the grey combs either side of it are the electrodes, and the two posts are where they meet the leads."*

Separately, and outside my remit: *"to make the light-sensitive path long"* is a claim the image cannot support and is probably backwards — an interdigitated meander makes the path **short and wide**. Hand to `checker-fact`.

**3. [MINOR, process] `fig-photocell-divider` — the pre-rendered PNG in the review directory is not the committed figure.**

`figs/fig-photocell-divider.png` prints *"the photocell"* under `R_sens`. The committed SVG (`assets/images/Day16-Photosensors/fig-photocell-divider.svg`, line 24, clean in `git status`, last touched by 3c36db5) says **`the sensor`**, and so does my Chrome render. The pre-render was made from bytes that never landed. Anyone reviewing from that directory reviewed a figure that does not exist. I judged against the committed SVG; the caption ("The sensor, `R_sens`, drawn as a variable resistor") matches the committed SVG and is correct.

**4. [MINOR] `fig-day16-clips` — the crop cuts two of the four pins.**

Caption: *"the other end of each clip is a pin that goes into the breadboard."* True and visible for the yellow and white leads; the blue and green run off the right edge. The claim is generic and the two shown carry it, so this is a note, not a defect — but if a re-crop is ever made for the deck, do not tighten this one further.

---

### Verified correct (listing these because the list is the evidence)

- `fig-photocell-loglog` — **both** contested claims check out. Adafruit guide p. 5 carries this exact 500×351 bitmap (image xref 88), and **the red curve is the guide's own highlight**, not ours; the page's own text says *"use this as a guide only"*, so *"the guide's generic family, not the PDV-P8001's own curve"* is right. Exactly one red curve. Robust fit of the red pixels gives a slope of **0.69** against the datasheet's typical Sensitivity of **0.6** — the same range, and the caption's disclaimer already covers the gap. (`0.6` and the footnote definition both confirmed in `CdS-photocell-PDV-P8001.pdf`.)
- `fig-day16-lab-fig2` — every clause verified hole by hole: red jumper from the "+" rail, photocell to the node column, brown-black-orange = 10 kΩ from that column to the "−" rail, one node to A0 and the other to A1 (5th/6th analog pins counted). `task-day16-wire-dividers` describes exactly what is drawn.
- `fig-day16-full-setup` — everything **except** finding 1: purple = right-hand node = A0, blue = left-hand node = A1 (both confirmed by counting pins), yellow on the pin labelled `PWM/MOSI/D11`, 3V3 → "+" rail and GND → "−" rail, and no potentiometer anywhere in the frame.
- `fig-tracker-two-loops` — all six named elements present in the left panel and all six in the right; θ is drawn as "Angle, θ"; V₀/V₁ match the prose's `V_0`/`V_1`.
- `fig-day16-cup` — a photocell genuinely seated in a cup, red arrow on it, "Photocell" label present.
- **P-15 clean.** `act-day16-direction` asks which way `V_M` moves: `fig-photocell-divider` gives the formula and the topology and nothing else — no arrow, no numbers, no direction. `act-day16-design` asks the sign of the step: the right-hand panel of `fig-tracker-two-loops` labels CONTROLLER/PWM/SERVO with no sign and no equation; the ± summing junction is in the *left* panel, a different loop, and says nothing about which way the arm turns. Neither activity is pre-answered. `rq-photo-swapped` asks about the inverted divider, which the figure does not draw.
- Cross-chapter claims: `fig-adc-divider` does print `V_wiper = 3.3 V × R₂/(R₁+R₂)`, so "the bottom resistor in the numerator" is right; `fig-servo-leads` does show the arm bolted to the SG92R's horn with a cup at each end and brown/red/orange leads, so the lead-colour mapping in `fig-day16-full-setup`'s caption is consistent with the photograph.

---

### Notation mismatches

- `fig-photocell-divider` — text and activities: **"the photocell"** / figure: **"the sensor"**. Defensible as it stands, because the figure is framed generically ("a resistive sensor and the ADC") and its caption says "The sensor, `R_sens`". **No change required** — but do not "fix" the caption to say photocell, and be aware that the stale PNG in the review directory shows the other choice, so this may resurface.
- `fig-photocell-divider` — the arrow leaving the node points at the *formula*; "to an ADC pin, A0 or A1" sits beneath it as loose text. The caption's "The node's voltage `V_M` goes to an ADC pin" is true of the words in the figure but not of any drawn wire. Optional: give the ADC-pin line its own short stub off the node.
- `fig-day16-lab-fig2` and `fig-day16-full-setup` — **the `A1` and `A0` silkscreen labels are covered by the blue and purple wires**. A student cannot read the pin names off either figure; they have to count from A2. Both captions do state the mapping in words, which is what rescues it. If Petra re-exports for finding 1, ask her to nudge the wire bends clear of the labels.
- `fig-photocell-loglog` — the prose says *"Each curve of the family is one type of cell."* The plot has **no legend and no curve labels**. Nothing contradicts the sentence, but nothing in the image supports it either. Consider *"the curves are different cell types; the guide does not say which is which."*

---

### Legibility

Measured cap heights, projected against 1600×900 with a figure occupying ~1500 px of content width, per `AUTHORING-visual.md` Rule 2 (≈2% of slide height = 18 px).

| figure | smallest type | at projection | verdict |
|---|---|---|---|
| `fig-tracker-two-loops` **left** | "CONTROLLER", **12 px** of a 252 px panel (4.8%) | 48% → 720 px wide → scale 0.73 → **8.8 px = 0.98%** | **FAIL, worst in the chapter** |
| `fig-tracker-two-loops` **right** | "V₀", ~16 px of 205 px (7.8%) | scale 0.81 → **13 px = 1.44%** | **FAIL** |
| `fig-day16-full-setup` | Fritzing pin labels, ~20 px of 1874 (1.07%) | 2236×1874 is height-limited: ~800 px tall → **8.5 px = 0.95%** | **FAIL** |
| `fig-day16-lab-fig2` | Fritzing pin labels, ~14 px of 1426 (0.98%) | portrait, height-limited → **7.9 px = 0.87%** | **FAIL** |
| `fig-photocell-divider` | `.sml` 18 px of 540 (3.3%) | 70% → 1050 px → **25 px = 2.8%** | PASS |
| `fig-photocell-loglog` | axis labels ~14 px of 351 (4.0%) | 70% → **29 px = 3.3%** | PASS on size; soft, see below |
| `fig-day16-cup` | "Photocell" ~40 px of 549 (7.3%) | 55% → **57 px = 6.3%** | PASS |
| `fig-photocell-photo`, `fig-day16-clips` | no type | — | PASS |

**The fix is a bigger figure, not smaller text**, in every case:

1. `fig-tracker-two-loops` is the one to act on now, because it is illegible **in the book too** — at 48% of a ~700 px text column the left panel's labels come out about 4 px tall. The comparison is genuinely a comparison, so `<sidebyside>` is the right *idea*, but two wide, short block diagrams at 48% each cannot carry it. Stack them: two full-width figures one above the other (`fig-tracker-loop-servo` and `fig-tracker-loop-around`), captioned so each is true alone (B-7), with the comparison made in the prose that already sits above them. For delivery 2 that also gives you two slides instead of one unreadable one.
2. `fig-day16-lab-fig2` and `fig-day16-full-setup` are acceptable in the book — a reader zooms — and are a **delivery-2 problem only**. Do not solve it by cropping these yourself; ask Petra for zoomed exports, one of the breadboard half and one of the header half, when the deck is built. Note the precedent: Day 15's `sl-day15-powering` already puts `towerProPowering.png` on a slide at the same effective type size, so this is a known class rather than a new regression — raise it once, for both chapters.
3. `fig-photocell-loglog` passes the 2% test but is a 500 px bitmap upscaled ~2.1×, and 500×351 is the maximum the Adafruit PDF holds (I checked the embedded image dimensions). Nothing to be done; it will be soft and that is the ceiling.

`check_rules.py --quiet` and `image_ratios.py --check` both pass, so **B-11a is clean** — the hand-authored SVG carries `width="760" height="540"` matching its `viewBox`, and `book.css` is current. No `<figure>` holds more than one `<image>` outside the one `<sidebyside>`.

---

### Shared between days — re-render after any change

- **`assets/images/Day15-Servos/slide08_095020b6.png`** is used by `fig-servo-feedback` in `source/ch-servos.ptx:110` at `width="95%"` **and** by `fig-tracker-two-loops` in `source/ch-photosensors.ptx:824` at 48%. Both captions are true of it today (I checked each against the picture). **If the two-loops figure is restructured per the legibility finding, do not recrop or resize this file** — Day 15 renders it at nearly double the width and its caption depends on the POTENTIOMETER feedback path being visible.
- `fig-servo-leads` (`Day15-Servos/slide09_a204d4b1.jpg`) is `<xref>`ed from `ch-photosensors.ptx:209`. Same caution.
- Cosmetic, no action: the tracker arm is **orange** in `fig-servo-leads` and **black** in `fig-day16-cup` / `fig-day16-clips`. Different filament, same part; the Day 16 captions wisely never name a colour.

---

### Look before shipping (crop candidates, not defects)

No `<slide>` elements exist in this chapter — delivery 1 is the book only — so this is a note for whoever builds the Day 16 deck. Carry it forward:

- `fig-day16-lab-fig2` — 981×1426, **aspect 0.69** against the slide's 1.78. The most extreme mismatch in the chapter. On any stacked slide it will be cropped, not scaled. Keep it on a bullet-free image slide.
- `fig-day16-full-setup` — 2236×1874, aspect 1.19, and it is the chapter's `width="100%"` figure. Height-limited on a 16:9 stage; any bullets above it eat the picture.
- `fig-tracker-two-loops` — combined aspect **7.6:1**. If it survives as one `<sidebyside>` it will be letterboxed to a sliver. Splitting it (legibility fix 1) removes this risk as well.
- `fig-photocell-loglog`, `fig-photocell-divider`, `fig-day16-cup`, `fig-day16-clips`, `fig-photocell-photo` — all between 1.0 and 1.5, all safe.

---

# committee-synthesizer — the ruled list

# Day 16 Gate 2 — consolidated change list

Draft: `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` @ `3c36db5`. Plan: `/Users/dz00762/repos/ENGS28/plans/day16.md`. Reports: `/Users/dz00762/repos/ENGS28/reviews/day16-gate2.md`.

## Verdict

Not ready for Petra, but close, and the shape is right: Parts match her deck 1:1, the protected Deliverable answers are confined to `<instructor>`, her sentences are reused rather than paraphrased, and the crucial step is genuinely scaffolded. The single biggest problem is that **eight separate technical claims are wrong in ways the chapter's own pages refute** — the CCRDY consequence (in two places), the volts/counts gain direction, "a `float` K removes the dead zone", the sensitivity row's test condition, "all four sensors need a fixed resistor", the servo's 0.1 s/60° as a command-rate bound, the settling over-claims, and Lab 8 Figure 1's node label. Under them sits one real contradiction (photocells cannot already be in the cups when Part 2 put them in the breadboard) and one protected-list leak (`pwm = pwm + e / K_DIV` in the Reference). Second-biggest: the in-class section's connective tissue is not her register — eight verbless paragraph openings of exactly the form she struck twice on Day 11x. Everything else is compression, and the compression pays for the four P-2 lifelines the learner panel is right to demand.

---

## Must fix (blocks sign-off)

### Correctness — not negotiable

**1. [L-6, B-6] `ch-photosensors.ptx:648-651` and `:1059-1061` — the CCRDY consequence is not what RM0490 says.** Both places quote the rule correctly and then draw a conclusion the manual contradicts. RM0490 §14.4.12 / ADC_CR: the `ADSTART` write is *ignored*, so no conversion starts.
- Instructor block, before: *"…without waiting for `CCRDY` starts the first conversion after the change on the old channel, so a student whose two values look swapped, or lag the light by one sample, has that: the fix is the wait, in the Reference section."*
  After: *"…without waiting for `CCRDY` has its `ADSTART` write ignored (RM0490, `ADC_CR`), so no conversion starts: the read that follows either blocks on `EOC` or returns the previous conversion's result, which is the old channel's one read late. A student whose two values look swapped, or lag the light by one sample, has that: the fix is the wait, in the Reference section."*
- Reference, before: *"A channel-select function that does not wait can therefore start its first conversion on the previous channel."*
  After: *"A channel-select function that does not wait therefore starts no conversion at all: the read that follows either blocks on `EOC` or returns the previous conversion's result, which is the old channel's."*
- DISPLACES: rewrite in place, net −2 words in the Reference. Raised by: checker-technical-accuracy (both scoped runs, independently).

**2. [L-6] `ch-photosensors.ptx:1078-1081` — the gain conversion is stated backwards** (`K_V = c·K_counts` instead of `K_counts = c·K_V`; a student applying it to K ≈ 0.01 is off by ~1.5 million).
- Before: *"…so an error in volts is the error in counts times that constant, and a gain defined against volts is the gain against counts times the same constant."*
- After: *"…so an error in volts is the error in counts times that constant, and a gain that was chosen to multiply volts becomes, when it multiplies counts instead, that gain times the same constant. Lumping V_REF/4096 into K is that multiplication."*
- DISPLACES: same length. Raised by: checker-technical-accuracy (Parts 4–6).

**3. [L-6, P-7] `ch-photosensors.ptx:889-895` + `subsec-photo-ref-loop` — "a `float` K removes the dead zone" is refuted by the chapter's own worked loop** (`int32_t pwm` at `:941`; `300 + 0.5f` still truncates to 300). Conflict resolved: the technical checker says correct it, `expert-cognitive-load` (finding 3) says the float fork is extraneous load at the densest point of the class. **Both**: correct it *and* relocate it.
- Part 5, before: *"Keeping the arithmetic in integers is a trade: a smaller and faster loop with no floating-point library, at the price of a dead zone whose width is set by K. A `float` K removes the dead zone, and the STM32C031C6 can do the arithmetic in software; the loop shown in Lab 8 uses the ADC counts directly, and <xref/> says what the lab's "lump VREF/4096 into K" means."*
- Part 5, after: *"Keeping the arithmetic in integers is a trade: a smaller and faster loop with no floating-point library, at the price of a dead zone whose width is set by K. The loop in Lab 8 uses the ADC counts directly, and <xref ref="subsec-photo-ref-loop"/> says what Lab 8's <q>lump VREF/4096 into K</q> means."*
- Reference `subsec-photo-ref-loop`, after the dead-zone sentence, add: *"A `float` K removes the dead zone only if the PWM value is accumulated in a `float` too and converted to an integer at the write, since assigning 300.5 to an integer discards the same half count; the STM32C031C6 has no floating-point unit, so that arithmetic runs in software."*
- DISPLACES: two clauses out of Part 5, one sentence into the Reference paragraph that already holds `K_DIV` and the dead zone. Raised by: checker-technical-accuracy (Parts 4–6), expert-cognitive-load.

**4. [L-6, B-3 self-contradiction] `ch-photosensors.ptx:167-170` — not every row of the table carries the 10 lux condition;** the sensitivity row is 100 lux vs 10 lux (which the chapter itself states correctly 280 lines later at `:444-448`), and the two spectral rows carry none. Load-bearing, because D1 sends students to "note the test conditions beside each".
- Before: *"…and every row of it carries a test condition: 10 lux from a lamp at 2856 K (a tungsten lamp), and the whole table at 23 °C."*
- After: *"…and its rows carry their own test conditions: the two resistances and the two times are measured at 10 lux from a lamp at 2856 K (a tungsten lamp), the sensitivity is defined between 100 lux and 10 lux at that same color temperature, and the whole table is at 23 °C."*
- DISPLACES: rewrite in place. Raised by: checker-technical-accuracy (reading/Parts 1–3).

**5. [B-1, B-4, B-8] `ch-photosensors.ptx:109-110` and `:684-695` — the potentiometer is the chapter's own counter-example to "the same divider, the fixed resistor is the one change".** Its own reading-question feedback says so at `:378`. Merged with `checker-arc-fidelity` finding 5 (her slides 4–5 claim "photosensor**s** are frequently nonlinear" and it reaches nowhere) and `checker-voice` #8 (Part 3 re-tells the reading's strain-gage sentence for the second time).
- Reading `:109-110`, before: *"All four are read with the same circuit, the voltage divider of the next subsection, and one ADC channel each."*
  After: *"The photoresistor, the thermistor and the force-sensing resistor are read with the same circuit, the voltage divider of the next subsection, and one ADC channel each; the potentiometer needs no fixed resistor, because its own track is both halves of the divider."*
- Part 3 `:684-695`, replace the whole paragraph with: *"The circuit you just built reads any sensor whose resistance changes with the quantity we want: a thermistor for temperature, a force-sensing resistor for force, a photoresistor for light, and the potentiometer for position or angle, each one in the same divider and each on one ADC channel. What changes from sensor to sensor is the fixed resistor, chosen by the same geometric-mean reasoning from that sensor's own range, and the shape of that sensor's own nonlinear curve, read from its own datasheet. The potentiometer is the exception you have already built: its track is both halves of the divider, so it needs no fixed resistor at all."*
- DISPLACES: Part 3's four sentences become three; the strain-gage sentence is **deleted, not moved** — the reading keeps it in full and `rq-photo-family` tests it. Raised by: checker-technical-accuracy (reading/Parts 1–3), checker-arc-fidelity, checker-voice.

**6. [B-2, B-4] `ch-photosensors.ptx:703-705` — 0.1 s/60° is a slew rate, not a command-arrival bound;** the servo chapter teaches the real bound (one pulse per 20 ms frame). Right conclusion, wrong step, in a two-minute set-piece.
- Before: *"…so the arm cannot respond to commands that arrive much faster than that, and sampling faster than the arm can move buys nothing."*
- After: *"…so a correction of a few degrees takes only a few milliseconds to complete, and in any case the servo accepts a new command once per 20 ms frame; sampling much faster than the frame buys nothing."*
- DISPLACES: same length. Raised by: checker-technical-accuracy (reading/Parts 1–3).

**7. [B-2, S-19] Three settling over-claims, one cause** — the datasheet defines no threshold for t_r/t_f, and 100 ms against 55 ms is 1.8×, not "far slower". Ruling applied: state less, do not invent a source.
- `:700-702`, before: *"The lab's one-second sampling for the study is far slower than that, and so is any sampling interval we would choose for the loop; a reading taken every tenth of a second is a settled reading."*
  After: *"The lab's one-second sampling for the study is far slower than that, and the tenth of a second we would choose for the loop is still longer than either time, so neither the study nor the loop is limited by the cell."*
- `:175-176`, before: *"…the rise time and fall time, 55 ms and 20 ms, which say how long the resistance takes to settle after the light changes."* After: *"…the rise time and fall time, 55 ms and 20 ms, which say how fast the resistance responds when the light changes."*
- `:277-279` (`rq-photo-variation` distractor feedback), before: *"…so both cells settle almost at once."* After: *"…so both cells respond in tens of milliseconds, not minutes."*
- DISPLACES: delete-and-rewrite, no additions. Raised by: checker-technical-accuracy (reading/Parts 1–3, findings 7 and 8), expert-rigor-hawk.

**8. [B-11c] `ch-photosensors.ptx:140-142` — Lab 8 Figure 1 labels the node `V_AVR_PCx`, not `V_1`.** A student sent to that figure sees a label the book says is not there.
- Before: *"…with the photocell named R_1, the fixed resistor R_2 and the node V_1."*
- After: *"…with the photocell named R_1, the fixed resistor R_2, and the node, labelled `V_AVR_PCx` in the drawing and V_1 in the deliverables."*
- DISPLACES: +6 words in one sentence, paid by item 17's cuts. Raised by: checker-technical-accuracy (reading/Parts 1–3); the lab's own AVR leftover is on the ground-truth flag list. This also closes `expert-continuity-auditor` finding 3 (the `V_1` reuse) if you add its half-clause at `:838`: *"Lab 8 reuses V_1 here for the second arm channel, not Figure 1's test-divider node."*

**9. [protected list §4 item 9, P-14, B-3] `ch-photosensors.ptx:1086-1087` — Deliverable 9's update statement is printed in student-facing Reference text.** With `adc_setChannel()`/`adc_getValue()` at `:599-604`, `updateServo()` at `:912` and `milliseconds()` at `:917` all named in prose, this one line completes a prompt that reproduces `inst-day16-loop` almost verbatim.
- Before: *"In integer arithmetic a gain below 1 is written as a division, `pwm = pwm + e / K_DIV`, with K = 1/K_DIV."*
- After: *"In integer arithmetic a gain below 1 is a division of the error by a constant, with K = 1/K_DIV."*
- The rest of the paragraph (integer truncation, the ±K_DIV dead zone, 0.8 mV × K_DIV) stays; the worked loop stays in `inst-day16-loop`, which §4 explicitly permits. DISPLACES: six words removed, nothing added. Raised by: learner-ai-reliant (BLOCKER), checker-arc-fidelity.

**10. [B-11c, P-2, P-14] `ch-photosensors.ptx:674-676` and `:628-634` — the rail-value diagnostic is both wrong and invisible.** Conflict resolved in favour of the engineering: `learner-anxious-nonhardware` (MAJOR) is right that Part 2's visible paragraph covers only "both channels print the same number" while Part 4's parallel paragraph at `:780-785` covers the rail case; `checker-technical-accuracy` is right that a floating analog input drifts rather than pinning. So add the clause students need, with the mechanism corrected.
- Instructor `:674-676`, before: *"A value stuck at 4095 or 0 with a sensible voltmeter reading: the program is reading a channel with nothing on it."*
  After: *"A value that drifts, or makes no sense against a sensible voltmeter reading, with no matching fault on the breadboard: the program is reading a channel other than the one on the node."*
- Student-facing, append to the paragraph at `:628-634`: *"A value that drifts or makes no sense while the voltmeter reads a sensible node means the program is reading a channel other than the one your wire is on."*
- DISPLACES: the added student sentence is paid for by the deletion at item 17 (Part 4's power-up order). Raised by: checker-technical-accuracy (reading/Parts 1–3, finding 10), learner-anxious-nonhardware (finding 2).

**11. [L-6, B-6, B-11b] Eight one-line corrections.** Each is a single substitution.
- `:440` *"so each division of the grid is a factor of ten"* → *"so each labelled step along either axis, 1k to 10k or 10 lux to 100 lux, is a factor of ten"* (the plot carries nine minor lines per decade; a student counting divisions gets the wrong answer).
- `:885-886` *"the step becomes a whole count only once |e| reaches 100"* → *"the step is zero until |e| reaches 100"* (e/100 is a whole count for every e).
- `:961` (instructor) *"which has no dead zone and hunts by one step when balanced"* → *"which has no dead zone and, because e is almost never exactly zero, dithers by one step about the balance point"* (at e == 0 neither branch runs — refuted by the snippet in the same sentence).
- `:955` (instructor) `updateServo(pwm);` → `updateServo((uint16_t)pwm);` (the Reference at `:1094-1095` says the conversion happens; the code does not show it, and `-Wconversion` flags it).
- `:1062-1064` *"the sequencer converts the selected channels in increasing channel order (Reference Manual §14.4, Channel selection)"* → *"the sequencer converts the selected channels in increasing channel order, which is the reset configuration (`CHSELRMOD = 0`, `SCANDIR = 0`; RM0490 §14.4.8, Channel selection)"*. Raised by expert-rigor-hawk **and** checker-technical-accuracy.
- `:444` *"the footnotes define it as"* → *"the row states it as"* (the ratio is in the test-conditions cell; the footnotes define the symbols).
- `:332` delete *"and hardly at all to infrared"* (unsourced extrapolation past the sheet's 400–700 nm range).
- `:188` table row *"1 lux"* → *"0.27 to 1 lux"* (the Adafruit guide's own row; the other four match exactly).
- DISPLACES: all deletions or same-length substitutions. Raised by: checker-technical-accuracy (both runs), expert-rigor-hawk.

### The crucial step (P-2)

**12. [P-2, P-14, B-8a] `ch-photosensors.ptx:496-501` (`task-day16-servo-follow`) — three findings, one location.** The task is the only moment when the potentiometer is still in the board, so it is the only place the Day-15 sign fact can still be observed; it is also where a student with a dead servo decides whether the next 110 minutes are worth staying for.
- Before: *"Plug in the USB cable first, then the power adapter into the regulator board, and turn the knob. The servo rotates as you adjust the potentiometer, as it did at the end of the servo chapter (`<xref ref="act-day15-servo-wire"/>`). If it does not, the symptom list in `<xref ref="subsec-day15-power"/>` says where to look."*
- After: *"Plug in the USB cable first, then the power adapter into the regulator board, and turn the knob. Your servo program from Day 15 is still on the Nucleo, and the servo rotates as you adjust the potentiometer, with everything wired as in `<xref ref="fig-servo-powering"/>`. Note which way the arm turns as the knob raises the reading; the loop needs that fact later today. If the servo does not follow the knob, the symptom list in `<xref ref="subsec-day15-power"/>` says where to look, and the study and the arm wiring that follow do not depend on the servo, so go on either way."*
- DISPLACES: the clause *"as it did at the end of the servo chapter (`act-day15-servo-wire`)"*, and Part 2's prose loses ~100 words at item 16. Raised by: learner-anxious-nonhardware (BLOCKER — the lifeline exists only inside `inst-day16-part2-checkpoint`, which she never reads), learner-firstgen-novice (finding 3 — Day 15 never asked anyone to notice the direction, so `task-day16-arm-print`'s "recall also" recalls nothing), checker-arc-fidelity (finding 2 — her slide 10 lands without its figure or its program), expert-class-logistics (finding 3).

**13. [P-2, P-14, B-6] Move the wrong-sign symptom out of Part 5's reveal and into Part 6, student-facing.** Explicit conflict, decided rather than averaged: `learner-ai-reliant` (MAJOR) is right that at `:874-878` it is an oracle — a student can guess a sign, run, and flip on the symptom without ever using which cell is on which channel; `learner-anxious-nonhardware` (MAJOR) is right that a student whose sweep was inconclusive needs a stated way forward. **Decision: keep it in student prose, at the place where the action is** (B-19: a rule once, where it happens). By Part 6 the commit has been discussed and the reasoning done, so it is a debugging fact and no longer a pre-answer; and moving it, rather than burying it in `<instructor>`, is what the anxious learner needs and what P-3 requires (the fast student still has to reason the sign out in Part 5 to have anything to test).
- Delete from `:874-878`: *"A loop with the wrong sign drives the arm away from the light until it reaches a bound and holds it there, so a wrong sign shows up as an arm pinned at one end of its travel, not as an arm that hunts."*
- Add to Part 6, after `task-day16-fixed-step`: *"A loop with the wrong sign drives the arm away from the light, once it is off balance, until it reaches a bound and holds it there, so a wrong sign shows up as an arm pinned at one end of its travel rather than as an arm that hunts. If that is what yours does, reverse the sign of the step."*
- The "once it is off balance" clause closes `expert-rigor-hawk`'s MINOR (at e = 0 a wrong sign produces the same zero correction). DISPLACES: moved, not duplicated; net zero. Raised by: learner-ai-reliant, learner-anxious-nonhardware, expert-rigor-hawk.

**14. [P-2, B-9, S-15, S-20] Part 6's opening — one restructure covering four findings.** `:974` narrates the period of the course as an actor, the introduction at `:25-26` undersells what Part 6 asks for, a student still on clips has no stated re-entry, and the close is what actually gets cut when the clock runs out.
- `:25-26`, before: *"The loop itself is your work in Lab 8."* After: *"Lab 8 is where you tune and demonstrate it."*
- `:397`, before: *"The loop itself is your lab work, and there is time at the end to start on it."* After: *"The loop itself is your lab work, and we'll start on it together at the end of class."*
- `:974`, before: *"The rest of today is a start on Lab 8's design challenge, which is your lab work."* After: *"We'll spend the rest of today starting on Lab 8's design challenge, which is your lab work."*
- **Move the paragraph at `:1000-1007`** (Deliverables 9 and 10, the tuning log, the competing-light warning) from the end of Part 6 to its beginning, immediately after the rewritten `:974` paragraph, and add one sentence to it: *"If your arm is not wired yet, plan the loop in words now and build it as the first step of Lab 8."* Mark the last five minutes with `<!-- Close, 5 min -->` as `ch-servos.ptx:1522` does.
- DISPLACES: a move plus one sentence, paid for by item 13 (Part 5 loses a sentence to Part 6) and item 17. Raised by: expert-class-logistics (finding 2 — the close is the real casualty and the plan never lists it as compressible), learner-anxious-nonhardware (finding 4), expert-continuity-auditor (finding 2), checker-voice (#14), checker-technical-accuracy (Parts 4–6, finding 11).

---

## Should fix

**15. [S-8, P-2] The rebudget: Part 1 12 → 10, Part 2 36 → 38.** `expert-class-logistics` (BLOCKER, finding 1) is right that two genuinely first-time steps sit inside the one Part marked "never cut" and are costed at single time: wiring two never-before-built dividers (8 min for the whole room) and a two-channel program with a documented CCRDY trap (9 min). The four minutes come from displacements this list already makes, so the day still sums to 110:

`5 + 10 + 38 + 5 + 14 + 22 + 11 + 5 = 110`

Part 2's beats become `3 + 6 + 5 + 10 + 1 + 11 + 2 = 38`. Checkpoints land at **minute 39** (was 41) and **minute 53** (unchanged); Part 4's checkpoint stays at 72; Part 5 runs 94–105 unchanged; the close is 105–110.
- DISPLACES, named: Part 1 loses 2 minutes because the log-log identity moves to the Reference (item 17, row 2); Part 2's D4–D6 beat loses 2 minutes because the 190-word geometric-mean teaching paragraph moves to the Reference (item 16). Nothing is cut from the room's hands-on time; both displaced blocks are teaching prose the plan already budgeted at one sentence (`plans/day16.md` L119).
- Edits: the timing comments at `:401` and `:480-482`, and "minute 41" at `:657` and `:664` → "minute 39".
- Also add to `inst-day16-part2-checkpoint`: *"Minute 53 is a hard stop. A student who is not printing both channels finishes Deliverables 7 and 8 as the first step of Lab 8 rather than holding the room."* Raised by: expert-class-logistics.

**16. [B-18, B-10, P-4, P-7] The geometric mean: one teaching, in the Reference, with numbers.** Three reviewers, one paragraph, and a genuine conflict between two of them. `expert-cognitive-load` (finding 5) wanted Part 2 kept and the Reference cut; `checker-arc-fidelity` (finding 3) wanted Part 2 compressed to the plan's one sentence and the Reference kept. **Decided for arc-fidelity**, because the plan budgeted the *why* at one sentence (L119), Part 2 is the over-budget Part, and a Reference is where a shaky student goes to check a claim. `learner-weak-circuits`'s scaffold then goes where the argument now lives — depth added at the top, not removed from the middle.
- Part 2 `:515-522`: keep the first two sentences (the rule, the formula, "computed from the values you measure") and the last (the kit's 10 kΩ and Deliverable 6). Replace the middle with: *"The mid-value is what puts the dark reading and the lit reading farthest apart on the ADC's scale (`<xref ref="subsec-photo-ref-divider"/>`)."* DISPLACES ~100 words out of the in-class flow.
- Reference `:1041-1043`: **delete** *"and setting its derivative with respect to R_M to zero gives the geometric mean"* — a bare calculus assertion with no step shown, in the one place a shaky reader goes to check. The symmetric-swing argument two sentences earlier already carries it. Raised by expert-cognitive-load **and** learner-weak-circuits.
- Reference, add one clause in its place: *"(a cell that happened to swing between 2 kΩ and 200 kΩ, not this photocell's own range, would have a geometric mean of √(2 kΩ × 200 kΩ) = 20 kΩ: ten times 2 kΩ, and a tenth of 200 kΩ, the same factor each way)"* — the same invented-number move Part 1 already uses at `:425-429`, no protected value touched.
- DISPLACES: net negative overall (100 words out of Part 2, ~15 words net into the Reference). Raised by: checker-arc-fidelity, expert-cognitive-load, learner-weak-circuits, checker-voice (#5 territory).

**17. [P-7, B-8, B-19, B-3] The repetition census — one item, six dispositions.** Each row is one edit; none of them adds a word.

| Idea | Times | Disposition |
| --- | --- | --- |
| V_cc is 3.3 V because it is the ADC's reference | 2, both in full (`:134-137` reading, `:432-435` Part 1) | Part 1 → the parenthetical *"(V_cc is 3.3 V, the ADC's reference)"*. **And**, resolving the conflict with the technical MINOR that wants the stronger reason: put it in the reading's one telling, not in the cut — `:136-137` gains *"and a voltage above the ADC's reference is outside the pin's operating conditions"*. The course rule about never implying 5 V for signals is the reason the stronger form belongs somewhere. |
| the log-log identity and the slope's sign | Part 1 `:444-452` | Move the bracket-notation derivation to `subsec-photo-ref-divider`; Part 1 keeps *"The datasheet's Sensitivity row is the slope of that line, about a factor of 4 per decade of light."* This is the plan's own first-cut item and pays for the rebudget's 2 minutes. |
| power-up order, in full, twice | `:497` Part 2, `:770-772` Part 4 | Part 4 → *"Power up in the usual order and run your two-channel program."* The Part 2 instance stays: it is the one power-up that follows a rewire from last class. |
| "we compare two cells, not one" | 3 (`:91` reading, `:266-267` RQ feedback, `:465-477` Part 1) | Drop *"This is why the tracker compares two cells rather than trusting the value of either one"* from `rq-photo-variation`'s feedback (it gives away Part 1's reveal, B-3), and delete Part 1's closing epigram at `:475-476` *"We compare two cells, and we never measure one."* The mechanism paragraph stays. |
| `rq-photo-swapped` pre-answers Part 1's mechanism | `:300-311` | Correct-answer feedback: delete *"as well as the denominator"*. Distractor feedback: replace *"The photocell's resistance is now the numerator, and a smaller numerator over a sum that also gets smaller comes out smaller"* — which is **false as a general rule** (4/5 → 3/3 grows) — with Part 1's own numbers: *"Follow the formula with the two resistors exchanged: 3.3 × 20/30 = 2.2 V when the cell is at 20 kΩ, and 3.3 × 10/20 = 1.65 V when the light brightens it to 10 kΩ."* Both edits are compatible; the false general rule is a correctness fix. |
| the divider wiring, three times | prose `:558`, caption `:570-575`, task `:581` | Keep the task verbatim (that is where the action is). Prose → *"Now we'll build the circuit. Lab 8's Figure 2 (`<xref/>`) shows the two dividers on the breadboard, one node on A0 (PA0) and the other on A1 (PA1). A0 and A1 are ADC channels 0 and 1, ADC_IN0 and ADC_IN1 in Table 12…"*. Caption → *"Lab 8's Figure 2, the two photocell dividers on the breadboard. The Nucleo's 3.3 V and GND feed the two rails."* And in Part 4, delete the prose sentence at `:717-720` (*"Alligator-to-breadboard clips make the electrical connections…"*): `task-day16-clips` and `task-day16-recreate` say it in her own slide-12/13 words. |

Raised by: expert-cognitive-load (all six rows), checker-arc-fidelity (rows 3, 5), checker-voice (#5, #12), learner-weak-circuits (row 5's false rule).

**18. [B-11c, B-3] `ch-photosensors.ptx:716-717` and `task-day16-cups` — delete the "already carry" clauses.** With two photocells per kit and `task-day16-wire-dividers` putting both into the breadboard twenty minutes earlier, no arm can already carry its photocells at Part 4; Lab 8 Appendix A's "most have already been assembled" is about the 3D-printed arm and stand, which `ch-servos.ptx:1366` already treats as done.
- `:716-717`: delete *"; some arms in the kits already carry their photocells"*.
- `task-day16-cups`: delete *"If your arm already carries its photocells, go on to the clips."*
- DISPLACES: delete-only. Question for Petra recorded below — the book cannot establish which kits are which, and if she confirms some ship with cells glued in, **Part 2** is what changes, not Part 4. Raised by: checker-technical-accuracy (Parts 4–6, finding 4), against `plans/day16.md` L54-56.

**19. [B-11, P-4, B-7] Split `fig-tracker-two-loops` into two stacked figures.** Convergence, not duplication: `checker-figure-claims` measured the left panel's "CONTROLLER" at 12 px of a 252 px panel, which is ~4 px at 48% of a 700 px text column — illegible **in the book**, not only at projection; `learner-visual` independently found the same thing from the reading side (two 4:1 diagrams halved again).
- Replace the `<sidebyside widths="48% 48%">` at `:823-826` with two full-width figures, `fig-tracker-loop-servo` (`Day15-Servos/slide08_095020b6.png`) and `fig-tracker-loop-around` (`Day16-Photosensors/lab8-fig6-tracker-loop.png`), each with a caption true on its own (B-7); the comparison is already made in the prose above them at `:804-814`. Update the `<xref>` at `:805-806` to name both.
- **Do not recrop or resize `slide08_095020b6.png`** — `ch-servos.ptx:110` renders the same file at 95% and its caption depends on the POTENTIOMETER feedback path being visible.
- Run `python3 scripts/image_ratios.py` and commit `assets/book.css`.
- DISPLACES: no words added; one `<sidebyside>` becomes two `<figure>`s. Raised by: checker-figure-claims (legibility, "the one to act on now"), learner-visual (finding 4).

**20. [B-18 caption rule, P-12, P-15] `fig-day16-full-setup` caption `:737-747`, 135 words → 85.** Four reviewers on one caption. Petra's ruling applied: the regulator-board defect is answered by Day 15's own sentence, not by a re-export or a patch.
- After: *"The complete tracker circuit. The two photocells are drawn on the breadboard, but they are physically in the cups of your tracker arm, reached through the alligator clips. Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail; one node goes to A0 (PA0) and the other to A1 (PA1). The servo is powered from the regulator board's 5V pin and its orange signal lead goes to D11 (PA7), as in `<xref ref="fig-servo-powering"/>`. The regulator board is plugged into the breadboard, so each of its pins is reached through the row it sits in."*
- What that does: keeps her slide-13 callout (learner-visual 1, arc-fidelity 4); drops the drawn-colour enumeration Petra rejected on Day 12 (*"All of this about a wire? SHORTEN."*) and *"There is no potentiometer"* (a caption never says what the picture leaves out — the fact survives in the prose at `:721-722`); drops the universal left/right-to-channel mapping that pre-committed Part 4's discovery (first-gen finding 4); and carries the `fig-servo-powering` sentence verbatim, which is the fix for the regulator board drawn across the centre channel.
- DISPLACES: ~50 words deleted, one borrowed sentence added. Raised by: checker-voice (#4), checker-figure-claims (finding 1), checker-arc-fidelity (finding 4), learner-visual (finding 1), learner-firstgen-novice (finding 4).

**21. [B-11b] `fig-photocell-photo` caption `:76-79` — the purpose clause is unsourced and probably backwards, and the caption names a region the picture does not distinguish.**
- Before: *"The face is the cadmium sulfide, laid down in a winding track between the two electrodes to make the light-sensitive path long; the two leads are the resistor's two terminals, and there is no polarity."*
- After: *"The face is the cadmium sulfide: the dark meander is the sensing material, and the two posts are where the leads attach. The two leads are the resistor's two terminals, and there is no polarity."*
- Ruling applied: state less rather than assert a mechanism (an interdigitated meander makes the path short and wide, not long) — no source exists in the kit's datasheets for either version. DISPLACES: shorter. Raised by: checker-figure-claims (finding 2), checker-technical-accuracy (finding 9, UNVERIFIED).

**22. [P-1, P-4] `ch-photosensors.ptx:203-208` — three unglossed technical nouns where a first-generation reader stops.** "Oblique illumination", "elevation" and "azimuth" are never defined, and the second sentence reuses "azimuth" to describe the tracker the student is about to build.
- Before: *"Some trackers work by attaching photosensors at the edges of the solar panel, and using the imbalance between the sensors caused by oblique illumination to control servos in elevation as well as in azimuth. In Lab 8 we build a model of an azimuth-only system:"*
- After: *"Some trackers also tilt up and down to follow the sun's height, not just turn side to side. In Lab 8 we build a model that only turns side to side, in the plane the arm sweeps:"*
- DISPLACES: three unglossed nouns for words already in the reader's vocabulary, one word shorter. Raised by: learner-firstgen-novice (finding 1).

**23. [P-10, P-2, P-14] Four lines into the instructor blocks.** No new Parts, activities or recalls (B-19); these are notes for the person circulating.
- `inst-day16-arm-checkpoint:794-795`, before: *"make sure every table has both before moving on."* After: *"Part 5 can open with the tables that have both facts while the last tables finish their clips during the read-§4 beat; one instructor cannot verify thirty tables' clips before starting."* (`expert-class-logistics` finding 4 — the current line gates the whole room on Part 4.)
- `inst-day16-loop`, add: *"A student whose servo still does not run pairs with a tablemate's board for the sign observation, predicts the sign from the pulse convention alone, and does Part 6 as design and pseudocode."* (`expert-class-logistics` finding 3.)
- `inst-day16-two-channel`, add: *"PA1 needs no `MODER` change: `GPIOA_MODER` resets to 0xEBFF FFFF, so every analog-capable pin starts in analog mode. Day 7 set PA0 explicitly, so this will be asked."* (`checker-technical-accuracy`, both runs; RM0490 §6.4.1.)
- Part 6: point at `inst-day16-loop` from `act-day16-start` so the circulating instructor has the symptom list one subsection away rather than none. (`checker-technical-accuracy` Parts 4–6, finding 10.)
- DISPLACES: instructor-only text, stripped from the student book, deck, PDF and index; no student-facing budget touched.

### Voice — pass through as written

**24. [L-16, S-13, S-28, S-21, L-13] `checker-voice` MAJOR rewrites, verbatim.** A draft in the wrong register has been rejected whole before; these are three seconds each. Findings #4, #5, #8 and #14 are already carried in items 20, 17, 5 and 14 above.

- **#1, `:511, 558, 599`** — the three transitions that carry Part 2.
  *"Now the datasheet and the multimeter."* → *"We'll start with the datasheet and the multimeter. In Lab 8, Deliverable 4 asks for a fixed resistor at the geometric mean…"*
  *"Now the circuit."* → *"Now we'll build the circuit. Lab 8's Figure 2 shows the two dividers on the breadboard…"*
  *"Now the program."* → *"Now we'll modify your ADC program to read both channels. Your ADC library from Lab 5 selects a channel with `adc_setChannel()`…"*
- **#2, `:867, 880, 898`** — three consecutive Part 5 paragraphs open the same way.
  *"The sign first."* → *"We'll take the sign first."*
  *"Then the size of the step."* → *"Next comes the size of the step."*
  *"Then the two ways the loop misbehaves."* → *"There are two ways this loop can misbehave."*
- **#3, `:486-492`** — Part 2's opening, merged with the technical MINOR on the AD2 ordering:
  → *"We'll now work through section 2 of Lab 8, `<em>`Technical Study of Photocells`</em>`, with the handout in front of you; the handout has a space for each answer. We'll go in the handout's order, with one change: we read the nodes on the AD2 before the program rather than after. Before the photocells go on the breadboard we'll take the potentiometer off, because its channel, A0 (PA0), is where the first photocell's divider goes. The servo stays wired as it is."*
  This also removes the file's only em dash (the en dash at `:486`) and uses her deck's own title.
- **#6, `:909-921`** — the count frame and the book narrating its own no-repetition policy:
  *"Two things the lab asks for, said once. First, the bounds. The lab asks that…"* → *"In Lab 8 you are also asked to impose upper and lower bounds on the PWM value before it is written to `CCR1`, TIM14's compare register, so that the servo is not driven beyond ±60° of center. Your servo program from Day 15 already applies a limit in `updateServo()` before every write; its `SERVO_MIN` and `SERVO_MAX` are the 1 ms and 2 ms endpoints, and Lab 8's ±60° is narrower than that, so the two numbers are yours to work out from the pulse convention (`<xref ref="subsec-servo-ref-command"/>`). You are also asked to keep track of T with `milliseconds()`, the SysTick count from the motor chapter (`<xref ref="subsec-day12-main-loop"/>`). The loop then has the shape of the Day 12 main loop, and it takes two lines:"*
- **#7, `:809, 813`** — *"We bought that loop."* → *"That loop is built into the servo and we do not program it."*; *"The controller in this loop is a program, and it is the program you will write."* → *"The controller in this loop is the program you will write in Lab 8."*
- **#9, `:215, 838, 856, 894, 903, 909, 914, 997`** — the Gate 1.5 correction, unapplied outside `subsec-photo-cell`: every student-facing *"the lab"* → *"Lab 8"*. *"…from Lab 8's description of it"*; *"In Lab 8's notation…"*; *"Lab 8 recommends starting with K on the order of 0.01"*; *"…with K as Lab 8 recommends"*; *"Lab 8's ±60°"*; and at `:903`, *"Lab 8's next paragraph, the one that begins `<q>`You, as the designer`</q>`, describes the same two failure modes and recommends starting cautiously, with K on the order of 0.01, and increasing it as you gain understanding of the system's dynamics"* — which also drops *"it says the same in its own words"* (S-23). This course has no lab room; a bare "the lab" is ambiguous.
- **#10, `:172, 523, 853`** — documents acting on people (L-13): *"which Lab 8 asks you to look up"* → *"which in Lab 8 you are asked to look up"*; *"so Deliverable 6 asks whether that value, rather than the computed one, is a problem"* → *"so Deliverable 6 is whether the kit's 10 kΩ, rather than the computed value, is a problem"*; *"What in your own build decides the answer?"* → *"What do you need to know about your own build to answer that?"* (`:511` *"Lab 8's Deliverable 4 asks for a fixed resistor at the geometric mean"* is the permitted form and stays.)

**25. [L-16, L-12, S-26, S-28] `checker-voice` MINOR rewrites, verbatim.**
- **#11, `:405`**: *"From the reading: a photocell's resistance falls as more light falls on it, and it is a resistance, which the ADC cannot measure directly."* → *"In the reading we saw that a photocell's resistance falls as more light falls on it. A photocell is a resistance, and the ADC measures voltages rather than resistances."*
- **#13, `:533, 549`**: *"Deliverable 1: from the PDV-P8001 datasheet, the minimum dark resistance and the minimum illuminated resistance."* → *"Deliverable 1: look up the minimum dark resistance and the minimum illuminated resistance in the PDV-P8001 datasheet."* And *"Deliverables 5 and 6: from the divider formula with…"* → *"Deliverables 5 and 6: using the divider formula with V_cc = 3.3 V and your measured values, work out the voltages you expect at V_1 with the cell dark and with it lit, first with your computed R_2 and then with the kit's 10 kΩ, and decide whether the 10 kΩ is a problem."*
- **#15, `:425`**: *"With numbers that are not our photocell's: R_sens at 20 kΩ over R_M at 10 kΩ…"* → *"Here is an example with round numbers rather than our photocell's own. With R_sens at 20 kΩ, R_M at 10 kΩ and V_cc at 3.3 V, V_M = 3.3 × 10/30 = 1.1 V, and if the light brightens until R_sens is 10 kΩ, V_M = 3.3 × 10/20 = 1.65 V."*
- **#16, `:696`**: *"Two datasheet numbers say how fast the tracker can usefully read its sensors."* → *"How fast the tracker can usefully read its sensors is set by the photocell's own speed. The PDV-P8001's rise time is 55 ms and its fall time 20 ms, both at 10 lux…"*
- **#17**: `:149` *"to an ADC pin, A0 or A1 on the Nucleo"* → *"A0 (PA0) or A1 (PA1) on the Nucleo"* (both names, always); `:1065` → *"the `EOC` (end of conversion) flag … the `EOS` (end of sequence) flag"*; `:911` `CCR1` → *"`CCR1`, TIM14's compare register"* (folded into #6).
- **#18, `:466, 832, 834, 895, 903`**: straight quotes → `<q>…</q>`, matching `ch-i2c.ptx` and `ch-motors.ptx`.
- **#19, `:1044, 1083`**: *"The nearest standard value is what gets built, and the cost of a value away from the mean is a smaller swing, not a wrong reading."* → *"You build with the nearest standard resistor value; a value away from the geometric mean costs you a smaller swing between the dark and the lit reading, not a wrong reading."*; *"…the counts are used directly and K is whatever works."* → *"…the counts are used directly, and K is chosen by trying values on your own build."*

---

## Consider

**26. [P-1] `:89` — "lux" is used 90 lines before it is defined.** Either add the gloss at `:89` or drop "in lux" from that sentence and let the one formal definition at `:179` stand. Raised by: expert-continuity-auditor.

**27. [P-4] A dead-zone plot in `subsec-day16-loop`.** Error e in ADC counts on x, PWM step on y, flat at zero between −100 and +100, sloped outside, labelled "dead zone". `learner-visual` names its displacement honestly (the sentence *"every error below 100 counts… produces no correction at all"* becomes redundant), it uses no protected value, and it sits at the crucial step. Held at Consider only because it is new SVG authoring inside the Part logistics is already squeezing; if there is one figure to add this chapter, it is this one.

**28. [MINOR, three clauses that cost nothing]**
- `:887` add the derivation the number rests on: *"(100 counts × 0.8 mV per count = 80 mV = 0.08 V)"* — the 0.8 mV/count fact only appears later, in the Reference (`learner-weak-circuits`).
- `:611` *"or the ADC part of your servo program"* — the Day 15 template has no channel-select function at all; add *"the servo program reads one hard-wired channel, so bring `adc_setChannel()` over from Lab 5"* (`checker-technical-accuracy`).
- `:910` the lab's paragraph names `OCR1A`, an AVR holdover; a student grepping for `CCR1` will not find it. Half-clause, skip if the budget is tight.
- `:20-25` the introduction's two enumerations omit `subsec-photo-tracker`, Part 3 and Part 6.

---

## Not applied, with reasons

- **Crop `fig-day16-full-setup` and `fig-day16-lab-fig2` to the wired rows** (learner-visual 3). Her Fritzing exports are hers, and Petra ruled on Day 15 that students reason the wiring out from the figure. Projection legibility is a delivery-2 matter, recorded for the deck.
- **A 4-box "select CH0 → read → select CH1 → read" sequence figure** (learner-visual 5) and **a swing-vs-R_M sketch for the geometric mean** (learner-visual 6). Both name *no* displacement; B-18 discards additions with none. The second gap is closed in words by item 16's worked numbers.
- **Redraw the "physically in the cups" callout onto the image** (learner-visual 1, arc-fidelity 4). Correct for the deck, where a caption is not read; the book carries it as caption sentence 2 (item 20). Recorded for Gate 3 via `scripts/pptx_annotate.py`.
- **Delete `task-day16-tuning` and its reveal** (learner-ai-reliant 3). Gate 1 ruling 8 kept three commits with the reading split so Lab 8's tuning paragraph is read *after* the class has worked the same idea out; deleting commit 3 removes the thing the lab's paragraph then confirms. Keep all three.
- **Replace `rq-photo-peak` and re-stem `rq-photo-family`** (expert-rigor-hawk, B-3). The plan's own hand-off (`plans/day16.md` L169) specifies "a datasheet lookup that is not Deliverable 1 (the spectral peak, or the rise time)", so the lookup is designed, not accidental; and his proposed IR-remote replacement rests on the "hardly at all to infrared" claim that item 11 deletes as unsourced. Three of five RQs require applying a formula or synthesizing; that is enough variety.
- **Name which node is A0 in `fig-day16-lab-fig2`'s caption** (learner-weak-circuits). In Lab 8's own figure the *left* divider goes to A1 and the right to A0, the opposite of a reader's instinct, and the book says later that the assignment does not matter functionally. The task text carries "one divider… the other", which is executable. Caption stays short per item 17.
- **Naming the sensor "the photocell" in `fig-photocell-divider`** — the figure is deliberately generic and its caption says "The sensor, R_sens". Do not "fix" it. (The pre-rendered PNG in the review scratch directory shows "the photocell" and is stale; the committed SVG is correct.)
- **Settling slack for re-seated kits** (logistics 5) — real, not unique to this day, and no student-facing text follows from it.

---

## Escalate to Petra

- **The two Fritzings are unreadable at projection and cannot be fixed by layout.** `week8FullLabSetup.png` gives ~8.5 px cap height on a 16:9 stage and `slide09_a9c74b15.png` ~7.9 px, against `AUTHORING-visual.md`'s 18 px floor; the same is already true of Day 15's `sl-day15-powering`, so this is one class of problem across two chapters, not a Day 16 regression. **Recommendation:** no book change now; when the Day 16 deck is built, ask her for two zoomed exports per figure (breadboard half, header half) covering Day 15 and Day 16 together — and while she is in Fritzing, ask her to nudge the blue and purple wire bends clear of the A0/A1 silkscreen, which they currently cover.
- **Whether any kit ships with photocells already in the cups.** Her note of 2026-09-06 says some arms already carry them; the kit has exactly two cells and Part 2 has every student wire both into the breadboard twenty minutes earlier, so as written the chapter contradicts itself and the book cannot establish which kits are which. **Recommendation:** delete the two "already carry" clauses now (item 18) and ask; if some kits do ship with cells glued in, the change is to **Part 2** — those students clip the arm-mounted cells into the breadboard for the study — not to Part 4.

---

## Questions for Petra (deduplicated, for the delivery message)

1. **Six power-sequence instructions in 110 minutes** (`:497`, `:503`, `:581`, `:591`, `:753`, `:771`), each at a genuine power transition. Day 15x was rejected partly for the unplug rule appearing four times in fifty. Right, or harping? *(Ruled out of the change list per B-19: instructions at genuine transitions stay.)*
2. **May the instructor build carry Deliverable 1's two datasheet rows?** They are in `inst-day16-two-channel:652-654` and are stripped from the student book, deck, PDF and search index — but ground truth §4 permits `<instructor>` explicitly only for D9, and the Gate 0 block says those two numbers may not be printed "in any form". Instructors do need a check value. Kept as drafted pending her answer.
3. **Where should the sensor-family paragraph live?** Her deck teaches it in class (slide 6); the chapter now teaches it in the reading and tests it with `rq-photo-family`, and item 5 makes the in-class beat a recall. If she would rather teach it in class, `subsec-photo-family` shrinks and the reading question moves.
4. **R_sens/R_M versus Lab 8's R_1/R_2/V_1.** The reading maps them once at `:140-142` and Part 2 then switches to the lab's names because students are filling the lab's blanks. Live with two sets, or standardize on the lab's?
5. **Is Deliverable 10 required or bonus?** Lab 8 files it under "4.1 Final Touches Credit" (2 pts); the chapter presents it flatly beside D9 (10 pts) at `:1002-1004`.
6. **Is the Reference's `int32_t`/`uint16_t` sentence (`:1093-1095`) design guidance or Deliverable 9's declarations?** Her call; no change proposed either way.
7. **Is there a paper handout?** `:487-489` says "with the handout in front of you; the handout has a space for each answer". The blanks are real in Lab 8 §2; the paper handout is a classroom fact only she has, and her Day 16 deck pasted the deliverables onto slides 8–9 instead.
8. **Advisory, no action:** the Adafruit guide linked at `:94-96` carries "200 kΩ (dark) to 10 kΩ (10 lux)" on its page 4 — Deliverable 1's answer, one click from the reading. Not quoted anywhere in the book, but she may want to know the link reaches it.

---

## Dissent worth recording

- **`expert-cognitive-load` wanted the geometric-mean teaching kept in Part 2 and cut from the Reference**; I ruled the opposite (item 16) on the plan's one-sentence budget and Part 2's overrun. If the class cannot compute R_2 in Part 2 without flipping to the Reference, put the qualitative argument back in Part 2 and delete it from the Reference instead — not both.
- **`learner-ai-reliant` wanted the wrong-sign symptom out of student prose entirely.** I moved it to Part 6 rather than to `<instructor>` (item 13). If the demo comes back with a room full of arms that were sign-flipped by trial and error rather than reasoned, that sentence goes into the instructor block next year.
- **`checker-arc-fidelity` wanted "There is no potentiometer" kept in the `fig-day16-full-setup` caption** as her slide 14's whole point. Dropped under her own Day 12 caption ruling; the fact survives in the prose at `:721-722`. If students arrive at Part 4 with the pot still in, that sentence goes back.
- **`learner-visual` wanted the dead zone drawn** (item 27, Consider). If commit 2 lands flat in class — students able to state ±100 counts but not to say what the arm does inside the band — that figure is the first thing to add.
- **`expert-rigor-hawk` on `rq-photo-peak`.** Two of five reading questions are lookups. If the pre-class questions stop discriminating, his replacement is the one to write, sourced against something better than "hardly at all to infrared".

---

# Applied (2026-09-07)

Every item of the synthesizer's must-fix and should-fix lists is in
`source/ch-photosensors.ptx`, verified phrase by phrase against the finished
file (the presence and absence greps are in the session transcript):

- Correctness (items 1–11): the CCRDY consequence in both places (the
  `ADSTART` write is ignored, so no conversion starts and the read returns the
  previous result); the volts-to-counts gain direction; the `float` K needs a
  `float` accumulator, moved to the Reference; the sensitivity row's 100 lux
  versus 10 lux; the potentiometer as the sensor with no fixed resistor
  (reading and Part 3); the servo's 20 ms frame as the bound, not its slew
  rate; the three settling over-claims; Lab 8 Figure 1's `V_AVR_PCx` label and
  the `V_1` reuse note; the D9 update line removed from the Reference; the
  rail-value diagnostic corrected and made student-facing; the eight one-line
  corrections (labeled steps, "zero until", "dithers", the `uint16_t` cast,
  `CHSELRMOD`/`SCANDIR`, "the row states", infrared clause deleted, 0.27 to
  1 lux).
- The crucial step (items 12–14): the servo check names the Day 15 program,
  `fig-servo-powering`, the sign observation (which way the arm turns as the
  knob raises the reading) and the lifeline that the study and the arm do not
  depend on the servo; the wrong-sign symptom moved to Part 6, student-facing,
  with "once it is off balance"; the introduction, the day's introduction and
  Part 6's opening reworded; Deliverables 9 and 10, the competing-light
  warning and the K/T log now open Part 6, with the not-yet-wired sentence;
  the close marked.
- Rebudget (item 15): Part 1 10, Part 2 38, checkpoints at 39 and 53 (53 a
  hard stop), in the chapter's comments, the instructor block and the plan.
- Geometric mean (item 16): Part 2 keeps the rule, one sentence of why and an
  xref; the Reference carries the symmetric-swing argument with an invented
  2 kΩ/200 kΩ pair and no derivative claim.
- Repetition census (item 17): all six rows, including the log-log identity
  moved to the Reference, the swapped-divider feedback corrected with Part 1's
  numbers, the divider wiring said once (task), Part 4's power-up line and
  clip sentence cut.
- Item 18, resolved the other way on Petra's own fact (2026-09-06: some arms
  already carry the photocells): the "already carry" clauses moved to Part 2,
  where a student with cells in the cups brings their leads to the breadboard
  through the clips for the study, and Part 4's cup task says those cells are
  already wired. Asked with the book.
- Figures (items 19–21): the two-loops `<sidebyside>` is two full-width
  figures (`fig-tracker-loop-servo`, `fig-tracker-loop-around`); the wiring
  caption is 85 words with her slide 13 callout and Day 15's regulator-board
  sentence; the photo caption states less.
- Items 22–28: azimuth and elevation glossed in place; the four instructor
  lines; every voice rewrite (#1–#19) verbatim, "the lab" → "Lab 8" throughout
  the student text (the one remaining "the lab handout" is her slide 15's
  title); lux glossed at first use; the 0.08 V derivation; the servo-program
  clause; the introduction's enumerations.

Not applied, as ruled: the crops of her Fritzings (hers; a delivery-2 zoom
request), the two extra figures with no displacement, the on-image callout
(Gate 3), deleting commit 3, replacing the two lookup reading questions,
naming which node is A0 in Lab 8's Figure 2 caption, the dead-zone plot
(held; the first figure to add if commit 2 lands flat).
