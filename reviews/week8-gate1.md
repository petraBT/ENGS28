# Week 8 Gate 1 — reviews of the arc and the three lesson plans

Reviewed 2026-09-02, over `plans/week8-map.md`, `plans/day15.md`,
`plans/day15x.md`, `plans/day16.md`, against `plans/week8-ground-truth.md`,
the three decks and Lab 8. Ten reviewers — the Gate 1 panel plus three
rotators (rigor hawk for the timer and control quantities, weak-circuits for
the divider and the wiring, AI-reliant for the codeable deliverable and the
giveaway rule) — every one briefed with the class lengths (110 / 50 / 110)
and the length-budget rule (a fix that adds minutes names what it displaces).
Reports in the order run: `checker-arc-fidelity` first, then the panel. The
consolidated rulings and the applied list are at the end.

Verdict summary:

| Reviewer | Day 15 | Day 15x | Day 16 |
| --- | --- | --- | --- |
| checker-arc-fidelity | PASS WITH CHANGES | PASS WITH CHANGES (MAJOR) | PASS WITH CHANGES (MAJOR) |
| expert-active-learning | **BLOCKER** | MINOR | MAJOR |
| expert-cognitive-load | MAJOR | MINOR | MAJOR |
| expert-continuity-auditor | **BLOCKER** | OK | MAJOR |
| expert-class-logistics | MAJOR | **BLOCKER** | MAJOR |
| learner-firstgen-novice | MAJOR | MAJOR | MAJOR |
| learner-anxious-nonhardware | MAJOR | **BLOCKER** | MAJOR |
| expert-rigor-hawk | MAJOR | MINOR | MAJOR |
| learner-weak-circuits | **BLOCKER** | **BLOCKER** | MAJOR |
| learner-ai-reliant | MAJOR | MINOR | MAJOR |

**Erratum, 2026-09-03.** The "every wiring drawing feeds the servo from the
Nucleo's 3V3 pin" finding — reported as a BLOCKER by two reviewers and
carried as question 5 — rested on an extraction artifact: the regulator board
on her slides is a separate picture layered over the Fritzing, and
`pptx_mine`'s media pull drops it, so the servo's orange lead ended at an
empty breadboard column and the rail (the Nucleo's 3.3 V, for the pot) was
read as the servo's supply. Petra's own exports (`towerProPowering.png`,
`towerProPot.png`, 2026-09-03) show the lead going to the regulator's 5V pin.
Nowhere in her slides is the servo powered from the Nucleo. The two findings
are void; the figure exists. Everything else in this report stands.

Every clock was found correct by every reviewer who checked it: the three
class lengths are stated with the rule, the Part rows sum to them, and every
Part's row equals the sum of its beats. The blockers are all structural, and
three of them are the same finding in different dialects: **Day 15x had no
minute for finishing Tuesday** (logistics, anxious learner, arc-fidelity);
**the servo's crucial build assumes an `adc.h` no chapter has taught students
to make** (continuity); **every wiring drawing feeds the servo from the wrong
rail** (anxious learner, weak-circuits — this one is question 5 and blocks the
book, not the plan); and **Day 15's Parts 1–2 asked the room to discover what
the reading had just explained** (active learning).

---

# checker-arc-fidelity

**Tree:** everything from the live working tree at `/Users/dz00762/repos/ENGS28` (`assets/ClassSlidesOLD/` is gitignored and exists only there; the plans and ground truth are the committed versions on `main`). Her three decks mined with `scripts/pptx_mine.py`; the two Day 15 tables taken from ground truth §1 as instructed; the Fritzing images on Day 15 slide 30 and Day 16 slides 13 and 14 opened directly (two findings rest on them).

### Verdict: PASS WITH CHANGES (all three days)

Day 15 — PASS WITH CHANGES. Day 15x — PASS WITH CHANGES (one MAJOR). Day 16 — PASS WITH CHANGES (one MAJOR). No BLOCKER: no idea of hers that gates an activity is absent from every Part.

## The clock

| Day | Rule | Plan states | Part rows sum to | Every Part's row = sum of its beats? |
| --- | --- | --- | --- | --- |
| 15 | odd → Tuesday, 110 min | "Tuesday, 110 minutes (Day N with N odd…)" ✓ | 3+2+10+8+15+10+45+12+5 = **110** ✓ | ✓ P1 2+4+4=10; P2 5+3=8; P3 5+5+5=15; P4 3+2+5=10; P5 5+10+5+20+5=45; P6 4+3+5=12 |
| 15x | `Nx` → Wednesday x-hour, 50 min | "Wednesday x-hour, 50 minutes" ✓ | 2+1+5+20+17+5 = **50** ✓ | ✓ P1 3+2=5; P2 4+3+3+5+3+2=20; P3 3+5+7+2=17; close 2+3=5 |
| 16 | even → Thursday, 110 min | "Thursday, 110 minutes" ✓ | 3+2+12+33+8+15+22+10+5 = **110** ✓ | ✓ P1 4+1+5+2=12; P2 6+7+8+10+2=33; P3 5+3=8; P4 3+8+4=15; P5 2+4+4+5+3+4=22; P6 8+2=10 |

All three clocks are stated correctly, all three Part tables sum to the class length, and **every Part row equals the sum of the beats inside it**. The three-times-repeated failure is not present at any of the three levels. `plans/week8-map.md` also states the parity rule and the three lengths independently, and they agree.

The one clock-shaped problem is not arithmetic: **Day 15x has 50 minutes allocated and zero of them budgeted for finishing Tuesday's exercise**, which is what her x-hour is for. See Finding 1.

## Her arc against the plans

### Day 15 — `Day15-Servos.pptx`, 31 slides

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | Engs 28 / Day 15 (title) | not listed in the coverage table | deck glue — table incomplete, see note below |
| 2 | Agenda (Williams ×2; "You will need today: Nucleo & breadboard, AD2, power supply, potentiometer, servomotor, power board") | "deck glue; Williams dropped" | Williams correctly dropped (CLAUDE.md standing fact). **The equipment line reaches no Part on any day** — Finding 7 |
| 3 | Final Project Survey | "dropped — course admin" | deliberately dropped, recorded ✓ |
| 4 | Servomotors (section divider) | not listed | divider — no content |
| 5 | Review: DC permanent magnet motor ("key fact we need going forward") | Part 1 beat 1 (2 min), `refPage` to Day 11 | ✓ recall, not re-teach; her own framing kept |
| 6 | What is a servomotor? (cutaway; gears; power conserved) | reading + Part 1 beat 2 commit "why the gears?" (4 min) | ✓ reaches the room as a commit, not only prose |
| 7 | Servomotors provide precise position control (9 applications) | reading, one list | ✓ acceptable — an aside; her "solar trackers: you'll build one in lab 8" survives on Day 16 |
| 8 | How a servomotor works: feedback | reading + Part 1 beat 3 (push the horn; never all the way around) (4 min) | ✓ |
| 9 | Our servomotor (SG92R; stall torque 2.5 kgf-cm; 0.1 s/60°; dead band 1 µs) | reading only; the dead band re-enters at Part 3 commit 2 | dead band ✓. **Speed 0.1 s/60° reaches no Part all week** — Finding 8 |
| 10 | Commanding a servo with a microcontroller | reading + Part 2 beat 1 commit (5 min) | ✓ her "between pulses / when pulses stop" note becomes the commit |
| 11–12 | Setting up a timer for PWM (prescaler table, blank → filled) | Part 3 commit 1 (5 min) | ✓ present; **thin** — Finding 4 |
| 13 | Review: TIM14 PWM block diagram (RM0490 Fig 165) | Part 4, `refPage` `fig-tim14-block-full` | ✓ never redefined (B-8) |
| 14 | Nucleo PWM outputs (PA4/PA7/PB1, Table 12) | Part 2 datasheet moment (3 min) | ✓ P-11 satisfied |
| 15 | Setting up Timer 14 for PWM (resolution table; dead band) | Part 3 commit 2 (5 min) | ✓ present; **thin** — Finding 4 |
| 16–18 | Timer 14 registers; register map | Part 4 recall by `refPage` to Day 11x | ✓ correctly not re-taught |
| 19 | Choosing TIM14_ARR and TIM14_CCR1 (fill-in) | Part 3 commit 3 (5 min); answers `<instructor>` (P-10) | ✓ |
| 20–21 | Design exercise, Part 1 ("takes students a LONG time") | Part 5 (45 min) | ✓ present, and the overflow is explicitly deferred to the x-hour — but see Finding 1, which is where that deferral lands |
| 22–23 | Her two Waveforms captures | Part 5 reference images | ✓ |
| 24–25 | `Day15_servo_template.c` blank / complete | Part 4 (read) and Part 5 (complete) | ✓ |
| 26 | `tim.c` | Part 4 beat 1 ("what changed since Wednesday's driver") | ✓; the driver-diff beat is ours, derived from her file and flagged to question 2 — acceptable, see reverse table |
| 27 | Servo wiring ("UNPLUG POWER"; lead colours) | Part 6 beat 2 (3 min) | ✓ deliberate deviation to Lab 8's colour rule, recorded at question 6 |
| 28–29 | How to power a servo (1) and (2) | Part 6 beat 1 (4 min): her brown-out *why* + xref `fig-tb6612-regulator` | ✓ battery/9 V/7805 correctly dropped per her rulings |
| 30 | Design Exercise, Part 2 | Part 6 beat 3 (5 min) start; Day 15x Part 2 in full | ✓ — but its Fritzing draws the pot on **A2**, Finding 3 |
| 31 | "If you finished everything… you don't need to come to tomorrow's x-hour" | "dropped — presenter note at most" | dropped, recorded (S-25) ✓ — but it interacts with Finding 1 |

**Ordering:** the plan claims "No ordering change from her deck," and that is true — Parts 1→6 walk her slides 5→30 in order. The one structural difference (slides 5–10 become the reading) is stated.

### Day 15x — `Day15x-Servos(2).pptx`, 6 slides

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | Engs 28 / Day 15x | not listed | deck glue |
| 2 | "If you didn't finish Tuesday's design exercise you need to complete that first" | "presenter note (S-25)" | **Not classroom management — it is how her x-hour is scheduled. Reaches no Part and no minute.** Finding 1 |
| 3 | Servo wiring (re-show of 15/27) | Part 1 recall (3 min) | ✓ recall, not re-teach |
| 4–5 | How to power a servo (re-shows of 15/28–29) | Part 1 recall; the *why* was Tuesday's | ✓ |
| 6 | Design Exercise, Part 2 (re-show of 15/30 + "use the code you completed last class") | Part 2, in full (20 min), CRUCIAL | ✓ present |
| — | — | **Part 3 (17 min), two ADC channels** | named as ours in the coverage table and in the week map ✓ |

**Ordering:** none to change — six slides, four of them re-shows, taken in her order.

### Day 16 — `Day16-Photosensors.pptx`, 16 slides

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1–2 | Title; Photosensors (divider) | not listed | deck glue |
| 3 | Photocell = LDR (CdS; photons free electrons; "very inaccurate", 50 % unit variation) | "reading + Part 1 recall" | reading ✓; **no beat of Part 1 is budgeted for the recall** — the resistance-falls-with-light fact arrives only inside beat 1's reveal, and the inaccuracy point inside beat 4. Coverage table overstates; see Finding 6 |
| 4–5 | Photosensors are frequently nonlinear (log-log family; the 0.6 relation) | Part 1 beat 3 (5 min) + datasheet moment 1 | ✓ |
| 6 | Many sensors are based on resistance | reading list + Part 3 (5 min) | ✓ — the one reorder, named |
| 7 | Using a CdS photocell to measure light ("brighter: V_M up or down?") | Part 1 beat 1 commit (4 min), question kept out of the reading | ✓ exemplary — the commit is preserved as a commit |
| 8–9 | Part 1 of Lab 8, in class (D1–D8) | Part 2 (33 min), in full | ✓ her arc kept: the lab's §2 is class time |
| 10 | Review: servo test setup | Part 4 beat 1 (3 min) | ✓ |
| 11–13 | Solar Tracker Assembly (cups, clips, recreate the circuit) — **and "you can remove the pot"** | Part 4 beats 2–3 (12 min) | assembly ✓. **"Remove the pot" reaches no Part; the plan's end state keeps it.** Finding 2 |
| 14 | Ultimate Setup (full Fritzing — **two dividers, servo, no pot**) | "Part 4's figure (question 5 — the rail)" | figure ✓, but the plan (and ground truth §6) describe this image as containing the pot; it does not. Finding 2 |
| 15 | Read *A Solar Tracker*; discuss at your table how you might implement the feedback loop | Part 5 (22 min), as three commits | present, and the change of shape is flagged in the crucial step — but it is an expansion, not a mapping. Finding 5 |
| 16 | Student Feedback Survey | "dropped — course admin" | deliberately dropped, recorded ✓ |
| — | — | **Part 6 (10 min), "Start the build"** | **no origin in her deck; not named as an addition.** Finding 5 |

**Ordering:** the plan claims "No ordering change from her deck" and then names the one swap (slide 6 after 7–9). That is honest and correct. It slightly understates Part 5/Part 6 — see Finding 5.

## The reverse direction — Parts and beats with no origin in her arc

| Part / beat | Origin | Named as an addition? |
| --- | --- | --- |
| **Day 15x Part 3** (17 min), two ADC channels | Lab 8 §2's "easy two-channel modification"; ground truth §2c | **Yes** — coverage table, week map §"Her ordering", and question 4. Correct |
| Day 15 Part 4 beat 1's driver diff (the moved limit, the off-by-one) | Her slide 26's own file, read against `TTmotor_ramp.c` (ground truth §2a) | Not named, but explicitly gated "(per question 2)". Acceptable — it is a reading of her slide, not new content. If question 2 lands "align `tim.c` with Day 11x", say what fills the freed minute |
| Day 15 stretch tier 1 (`milliseconds()` for the tick) | Lab 8 §4's own instruction | P-3 stretch, additional — exempt, and its source is cited |
| Day 15 stretch tier 2 ("is finer worth it?") | Her slide 15 note verbatim | hers ✓ |
| Day 15x stretch (supply sag on the AD2 under load) | Ours, invented | P-3 stretch — exempt, but it is invention; keep it in the stretch and out of any Part |
| Day 16 Part 3 datasheet moment 2 (rise 55 ms / fall 20 ms vs sampling) | PDV-P8001 sheet; ground truth §3 | Not named. Small and grounded — fold into Finding 8's fix |
| Day 16 Part 5's three commits (22 min) | Lab 8 §4's own wording, expanded from her one "discuss" slide | Partially — the *shape* change is flagged in the crucial step; the expansion is not. Finding 5 |
| Day 16 Part 5 beat 1's two-loops figure | Does not exist (ground truth §6 "figures that do not exist", item b) | Not flagged in Day 16's plan. Finding 5 |
| **Day 16 Part 6** (10 min, start the build) | Nothing in her deck; the lab's afternoon work pulled forward | **No.** Finding 5 |

So the week's claim of "exactly one addition" is close but not exact: **Day 16 Part 6 is a second taught addition** and Part 5 is a substantial expansion of one slide.

## Findings

- **[MAJOR] Day 15x has no minute for the thing her x-hour is for.** Her slide 2 is the whole scheduling premise of the Wednesday — *"If you didn't finish Tuesday's design exercise you need to complete that first"* — and her slide 20 note says that exercise *"takes students a LONG time."* `plans/day15.md` agrees and designates the x-hour as the overflow ("Nothing in Part 6 is lost if the room is still in Part 5 at minute 100"). But `plans/day15x.md` maps slide 2 to a presenter note (S-25) and then spends all 50 minutes on Part 2 (20, assuming Tuesday's program runs), Part 3 (17, a new taught beat), Part 1 (5) and glue (8). A student who did not finish Tuesday cannot start Part 2, which is the CRUCIAL step, and cannot use Part 3, which gates Thursday's Part 2. The machinery to fix this is already in the plan; it is filed as a contingency instead of a budget. — her Day 15x slide 2, her Day 15 slides 20–21 and 31 — **fix**: (a) rewrite Part 2's row as *"Finish Tuesday, then wire"* and add the sentence that students still in Day 15 Part 5 spend Part 2 there with the Day 15 checkpoint ladder, not the wiring; (b) make the existing overrun clause the **default trigger with a decision point**: "at minute 10, if more than a third of the room is still completing Tuesday's template, Part 3 collapses to its reveal-only form (17 → 10) and the 7-minute do-step moves to Thursday's Part 2 opening, funded from Thursday's Part 3 (8 → 3, its datasheet beat only — already first in Day 16's cut order)." Totals stay 50 and 110. Also stop calling her slide 2 an S-25 note in the coverage table: it is scheduling, and it belongs in the Part 2 row.

- **[MAJOR] Day 16's end state is not hers: she removes the potentiometer, the plan keeps it.** Her slide 13 ends *"After you've confirmed that your servo (still) works properly with the pot in Part 2 of the lab handout, you can remove the pot,"* and her slide 14, "Ultimate Setup" — which I opened (`assets/images/Day16-Photosensors/slide14_img1.png`) — has **no potentiometer at all**: two photocell dividers, the servo, nothing else. Her slide 13's Fritzing (`slide13_img1.png`) is the transitional state, pot on A2 plus photocells on A0/A1. The plan freezes that transitional state as the end of class: the crucial step reads *"two channels print on their screen, **the servo still follows the pot**,"* Part 4 beat 1 confirms the pot and no beat retires it, and `week8-map.md` repeats it. That end state needs three ADC channels, which the two-channel program taught on Wednesday does not read, and Day 16's plan never cites question 3. (Ground truth §6's manifest row for 16/14 says "two dividers on A0/A1, pot, servo" — that description is wrong and is what the plan inherited.) — her Day 16 slides 13 and 14 — **fix**, 0 minutes: inside Part 4's existing 3-minute confirm beat, add her sentence — "once you have confirmed the servo still follows the pot, the pot comes out, and its channel becomes the second photocell's"; reword the crucial step to *"the servo was confirmed following the pot before the pot came out"*; cite question 3 in Day 16's Part 4 and in its coverage table row for 14; and correct ground truth §6's 16/14 row.

- **[MINOR] The potentiometer's analog pin is stated flat on Day 15 and is contradicted by the figure the book will print.** Her slide 21 says "Wire potentiometer to Analog 0, as usual"; her template reads PA0; **her own Day 15 slide 30 Fritzing wires the wiper to A2** (`assets/images/Day15-Servos/slide30_img1.png`, orange lead into the A2 header) — and that image is re-shown as 15x/6, 16/10 and 16/13; Lab 8 §3 says "analog channel 3." Question 3 exists but only names the template-vs-Lab 8 disagreement, and `plans/day15.md` Part 5 states "Wire the pot to A0 as on Day 7" with no flag at all. — her Day 15 slides 21 and 30, Day 15x slide 6 — **fix**, 0 minutes: add "(question 3)" to Day 15 Part 5's wiring beat and to Day 15x Part 3's do-step, and extend question 3 in ground truth §9 to include "your Day 15 Fritzing draws the pot on A2 while the slide text and the template say A0 — which is right for the figure we redraw?"

- **[MINOR] Day 15 Part 3 is the day's idea and is the thinnest Part in the week.** Fifteen minutes carries three commit-and-reveal cycles: her slide 11/12 table (five prescaler rows, two computed columns, plus disqualifying two rows on the 16-bit ARR), her slide 15 table (three rows × three derived quantities — T0, steps, Δθ — plus the dead-band argument), and her slide 19 fill-in (five values). That is roughly 26 numbers derived cold in 15 minutes, and every one of them gates Part 5: a wrong `PWM_TIMER_MAX` is a servo that never sees 1–2 ms. The plan itself says "Never cut Part 3." — her Day 15 slides 11, 12, 15, 19 — **fix**: Part 3 15 → **20**, displaced from **Part 6 12 → 7** by dropping beat 3 ("Start wiring if there is time"), which is already the first item in both the day's and the week's cut order and is done in full on Wednesday (Day 15x Part 1 recall + Part 2). Total stays 110. Day 15x's Part 1 recall already covers the wiring explanation, so nothing is lost.

- **[MINOR] Day 16's additions are not named, and the week map's "exactly one addition" is therefore inaccurate.** Her Thursday ends at slide 15, "discuss at your table how you might implement the feedback loop." The plan turns that into Part 5, a 22-minute three-commit design, plus **Part 6 (10 min), "Start the build," which has no slide of hers behind it at all** — 32 of 110 minutes. Both are legitimate (Lab 8 §4 is her lab, and question 7 asks her about exactly this), but neither is declared the way Day 15x Part 3 is, and `week8-map.md` states the week has one addition. Part 5 beat 1 also depends on the two-loops figure, which ground truth §6 lists as not existing — Day 16's plan does not carry that in its blocking list. — her Day 16 slide 15 — **fix**, 0 minutes: add two rows to Day 16's coverage table — "— | **Part 5's three commits are ours**, expanded from her 'discuss at your table' using Lab 8 §4's own notation (question 7)" and "— | **Part 6 is ours** (question 7); her deck ends at slide 15"; change `week8-map.md`'s sentence to "the week's additions, all named: Day 15x Part 3, and Day 16 Parts 5–6's expansion of her discussion slide"; and add the two-loops figure to Day 16's open-flags list against question 7.

- **[MINOR] Day 16's coverage table promises a Part 1 recall of her slide 3 that no beat provides.** The row reads "reading (her/Adafruit's sentences) + Part 1 recall," but Part 1's 12 minutes are fully spent on four beats (4+1+5+2) and none of them is a recall of what a photocell is. The facts do arrive — resistance falls with light inside beat 1's reveal, unit-to-unit variation inside beat 4's "compare two, do not measure one" — so nothing is missing from the room; the table is describing a beat that is not there. — her Day 16 slide 3 — **fix**, 0 minutes: change the row to "reading; the resistance-falls fact lands in Part 1 beat 1's reveal and the unit-variation point in beat 4." A coverage table that names a beat is checked against the beat list at Gate 2.

- **[MINOR] Her equipment line has no home, and Wednesday's CRUCIAL step needs hardware nobody was told to bring.** Her Day 15 slide 2 lists what students bring: "Nucleo & breadboard, AD2, power supply, potentiometer, servomotor, power board." The plan maps slide 2 to "deck glue." Day 15 Part 6 wires the servo, and Day 15x Part 2 (CRUCIAL) needs the regulator board, its adapter, a multimeter and the servo in hand at minute 8 — yet Day 15's close says only "Tomorrow: the servo on 5 V, and two ADC channels," and Day 15x's close is the only place in the week that carries a bring-list ("bring the tracker fixture from your kit"). — her Day 15 slide 2 — **fix**, 0 minutes: inside Day 15's existing 5-minute close, one clause — "bring the servo, the regulator board and its adapter, and your multimeter tomorrow"; and one in the Day 15x close for Thursday's photocells and cups. Presenter-facing, so S-25 is satisfied.

- **[MINOR] The servo's own speed reaches the room nowhere, and Day 16's sampling-interval argument is missing its lower bound.** Her slide 9 gives "Speed: 0.1 s/60°" as a headline spec, and the plan puts slide 9 entirely in the reading. On Day 16, Part 3's datasheet moment bounds the sampling interval T from *above* by the photocell (rise 55 ms, fall 20 ms) and Part 5 commit 3 says "T too large → lag" — but nothing tells the room how fast the arm itself can move, which is the other half of choosing T and is the number she already put on a slide. — her Day 15 slide 9; Day 16 Part 3 and Part 5 — **fix**, 0 minutes: add one sentence to Day 16 Part 3's existing 3-minute datasheet beat — "and the servo takes about 0.1 s to move 60°, so there is no point sampling faster than the arm can respond either" — and cite it back to the servo datasheet's own table (P-11, and it is not a protected number).

## Where the plans are exactly right

- Every one of her Day 15 slides 5–30, every Day 15x slide 3–6, and every Day 16 slide 3–15 has a Part, a reading beat, or a recorded `refPage`/xref to material Days 7/8/11/11x/12 already own. Nothing of hers is silently absent.
- The four slides she or the course rules mark as skippable are dropped **and recorded**: Day 15 slide 3 (project survey), slide 31 ("you don't need to come to the x-hour" — S-25), Day 16 slide 16 (feedback survey), and the Williams citations on Day 15 slides 2 and 5 (P-12 reuse trap, dropped per CLAUDE.md's standing fact). I checked each one; none is a finding.
- Her three commit questions are preserved **as commits, in the room, with `room="yes"`**, not flattened into prose: "why the gears?" (15/6), "what happens between pulses and when they stop?" (15/10), "which of these are usable / which do you like best?" (15/11–12, 15/15), and — the one that matters most — "as the light gets brighter, does V_M increase or decrease?" (16/7), which the plan explicitly keeps out of the reading. That is the failure mode this review exists for, and it did not happen.
- Her figures that Day 11x already owns (15/13, 15/16, 15/17, 15/18) are recalled by `refPage`/xref and never redefined; her superseded ones (15/28's battery box, 15/29's 9 V and 7805) are dropped against her own later rulings.
- Both P-2/P-3 pairs are complete on all three days, each day has a checkpoint minute with a triage ladder, and each has a cut order that names what is never cut.

### Table completeness (nit, not a finding)

All three coverage tables omit the title and section-divider slides (15/1, 15/4; 15x/1; 16/1, 16/2). They carry no content, but a mapping table that starts at slide 2 or 3 reads as if the first slides were overlooked. One row each — "1, 4 | title, divider | deck glue" — makes the tables self-evidently complete for Gate 2's reader.

---

# expert-active-learning

Reviewed: `plans/week8-map.md`, `plans/day15.md`, `plans/day15x.md`, `plans/day16.md` against `plans/week8-ground-truth.md` and `AUTHORING-book.md` P-2, P-3, P-5, P-6, P-15, P-17, P-18, P-19, S-10.

## Day 15 — Verdict: **BLOCKER**

- **[BLOCKER] [P-5, P-6, P-15] Parts 1–2's entire "predict → explain" arc is pre-answered by the assigned reading** — `plans/day15.md:112-113`, reading scope at `plans/day15.md:150-155` and `plans/week8-map.md:82-86`.
  The Reading Split assigns "her slide 6 note, near verbatim: motor, gears, pot, control circuit; **why the gears**," "the feedback loop in her slide 8's words **and figure**," and "the pulse-width command (her slide 10 figure and wording; **the servo holds as long as pulses keep coming**)." Her slide notes, quoted in full at `week8-ground-truth.md:97-130`, are not summaries — they contain the reasoning itself: *"Since power is preserved, the torque going out is much higher…"*, *"the servo will strongly resist,"* *"If you shut the signal down there is no power on the motor."* Day 15 then stages Part 1's commit as *"the motor turns fast and the arm turns slowly — why put gears in the way?"* and Part 2's commit as *"what does the servo do between two pulses, and what happens if the pulses stop?"* — the textbook example of the rejected pattern named in this audit's own rubric ("discuss why this works after the text has explained why it works is not an activity"). The reading's own "Must not contain" list (`day15.md:150-155`) protects Part 3/4's numbers but never extends that protection to Parts 1–2's three commits — an internal gap in the plan, not a deliberate call. Worse, Part 1's "push the arm, what happens?" commit cannot even be physically tested that day: no student's servo is wired until Day 15x (`day15.md:167`), so the "observe" is really "recall the sentence you read," with no hardware to observe. 18 of the day's 110 minutes are staged as discovery but deliver none.
  **Fix (time-neutral — moves a boundary, adds nothing):** trim the pre-class reading to the *mechanism inventory* only — what a servo contains (motor, gears, pot, H-bridge), the 20 ms/1–2 ms timing fact as a bare spec, applications, the datasheet, the power rule. Move the three explanations — why gears trade speed for torque, what a push against the loop does, what happens between/without pulses — out of the reading and into Parts 1–2's reveals, which are already written to receive them (`day15.md:112-113`). Add "must not contain: the gear/torque reasoning, the resist-a-push behavior, the hold-without-pulses behavior" to the reading's exclusion list next to the existing PSC/ARR/CCR exclusions.

- **[MAJOR] [P-7] Part 3 is written as first contact with a search the class already ran** — `day15.md:114`, contradicted by `week8-ground-truth.md:519-522`: *"Prescaler arithmetic for 50 Hz was already done once, as the Day 11x stretch… Day 15 must frame its design exercise as a second design with a new constraint… not as first contact."* Part 3's opening beat reads *"We need 20 ms per period from a 12 MHz clock. Commit 1… fill her table"* — identical framing to a cold start, with no callback to the PSC-120 row Day 11x's stretch already worked out. Students who did that stretch get no retrieval credit, and the class has no signal that this is round two of a known search.
  **Fix (time-neutral — a framing sentence, not new content):** open Part 3 with one line: "You searched this space once, on Day 11x, for a 50 Hz PWM frequency. Same search, new constraint: the servo's 1 µs dead band and its 1–2 ms window." No new minutes; it replaces the cold-start framing already in the row.

## Day 15x — Verdict: **MINOR**

- **[MINOR] [P-6, redundancy] Part 2's "push the arm gently — it pushes back" repeats Day 15 Part 1's commit a third time** — `day15x.md:73` vs. `day15.md:112` (predicted) and the reading (told). Once Day 15's Part 1 is fixed per the finding above, this becomes the day's *first* genuine physical confirmation, which is exactly right. As currently written against the unfixed Day 15, it is the third exposure to the same fact with no new framing.
  **Fix (time-neutral):** once Day 15 is corrected, relabel this beat "you predicted this yesterday — watch it happen" rather than a fresh `room="yes"` observation, same 3 minutes.
- Everything else in Day 15x is sound: the two-channel commit (`day15x.md:74`) is a genuine, well-scaffolded prediction with a reveal that only follows the commit; the checkpoint at minute 28 (`day15x.md:44`) and the stretch (`day15x.md:49-54`) both satisfy P-2/P-3; the "recalled not re-taught" framing for the wiring (`day15x.md:61`) is honest about what's new versus what isn't, which is the discipline Day 15 Parts 1–2 lack.

## Day 16 — Verdict: **MAJOR**

- **[MAJOR] [P-6] Part 5's setup reading answers its own third commit** — `day16.md:93`, source text at `week8-ground-truth.md:478-482`. The beat sequence is: *"Read A Solar Tracker (§4) at the table"* → Commit 1 → Commit 2 → Commit 3 (*"what goes wrong with K too large, T too large?"*). But Lab 8 §4, which students just read in full, states almost verbatim: *"too aggressive → oscillation, too cautious → lag."* The day16.md reveal even cites this as *"the lab's own words."* Commits 1 and 2 survive because they ask students to apply the theory to their *own* board's wiring and to do real integer arithmetic the text doesn't supply — genuine work. Commit 3 does not survive: the room is being asked to predict a sentence it read four minutes earlier.
  **Fix (time-neutral — resequences the existing 22-minute Part 5, adds nothing):** split the reading. Have the table read only the block diagram and the error/update-rule paragraph before Commits 1–2 (which need those definitions). Hold the tuning paragraph ("too aggressive… too cautious…") until *after* Commit 3's reveal, where it now functions as confirmation of what the class just worked out rather than the answer key handed out early. Alternatively, replace Commit 3 with a fictional K/T pair and a synthetic error trace (per P-19 — supply the numbers) and ask students to say which one overshoots, which is real reasoning the read-ahead can't spoil.
- Everything else in Day 16 is the model this week should follow. The reading explicitly withholds the V_M-direction answer for Part 1's commit (`day16.md:129-131`, matching the rubric's own good-practice example) and explicitly withholds every protected Lab 8 value (`day16.md:126-132`), correctly distinguishing "the geometric-mean rule may be taught" from "R2 for these parts may not." Part 2's in-class Lab 8 work has students producing their own deliverables under supervision — matching her arc, not handing anything over. Part 4's mechanical build changes no electrical node and is correctly not staged as a discovery. The crucial step's checkpoint (`day16.md:52-54`) and the stretch (`day16.md:56-62`, explicitly *additional*, using the students' own code) both satisfy P-2/P-3.

## Cross-week notes

- Length budgets: every fix above is a resequencing or a boundary move between reading and class, not new content — Day 15 stays 110, Day 15x stays 50, Day 16 stays 110, as the task requires.
- Protected-list discipline (constraint a) holds throughout: I found no place where Lab 8's D1, D4–D8, D9 or D10 values are handed over by an activity or its reveal. Day 16 is in fact the more careful of the two reading-taught days on this point.
- Activity difficulty (constraint b, P-17): no lookup-dressed-as-activity was found this week — every `room="yes"` commit that isn't compromised by the reading (Day 15 Part 3–4, Day 15x Part 3, Day 16 Part 1 and Part 5 Commits 1–2) requires real computation, prediction, or board-specific reasoning, which is the right level for a class that has already been told "students are not third graders."
- The two findings against Day 15 and the one against Day 16 share a single root cause worth naming for future weeks: the plans are careful to keep *numeric* answers (PSC/ARR/CCR, R2, dead band) out of the reading, but not equally careful to keep *reasoning* answers (why gears, what a push does, what over-aggressive tuning does) out of the reading or the pre-commit setup text. A discovery is spoiled by a sentence exactly as much as by a number — P-15 says so explicitly ("a discovery must not be answered anywhere ahead of it") and the fix pattern is the same in both cases: check what the reveal says, then check that nothing already shown or read says the same thing first.

---

# expert-cognitive-load

Reviewed: `plans/week8-map.md`, `plans/day15.md`, `plans/day15x.md`, `plans/day16.md`, against `plans/week8-ground-truth.md` and `AUTHORING-book.md` (P-2, P-3, P-7, P-9, B-8, B-18).

### Verdict: MAJOR

| Day | Verdict |
| --- | --- |
| Day 15 (Tue, 110) | MAJOR — Part 3 mis-marks recall as first contact and packs too much into too little time, right before the day's crucial 45-minute build |
| Day 15x (Wed, 50) | MINOR — the wiring rule is retold in full rather than pointed at; the crucial-step checkpoint has no buffer, but the plan's own contingency mostly covers it |
| Day 16 (Thu, 110) | MAJOR — Part 2 crams the lab's eight deliverables into 33 minutes with a checkpoint only at the very end |

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| The servo's power rule and wiring mapping (regulator 5V → center lead, GND shared, signal → PA7, USB-then-adapter) | 3 real deliveries, 2 in full | Day 15 reading hand-off (mention, xref only — fine); **Day 15 Part 6** (full: reason/brown-out + lead mapping); **Day 15x Part 1** (full: same lead mapping restated, labeled "recalled not re-taught" but textually a complete re-telling minus the reason) | Day 15 Part 6 — it is the only place the *reason* (brown-out) is taught, and the first place the servo's specific lead mapping is stated | Day 15x Part 1's beat: replace the restated mapping with a one-line pointer ("wired as Tuesday — `fig-tb6612-regulator` and the Day 15 Part 6 lead map") and spend the freed ~2 min on Part 2's checkpoint (see Finding 3) |
| The servo's internal feedback-loop figure (her slide 8) | 3 | Day 15 reading (introduce/motivate); Day 15 Part 1 (full teaching, commit → reveal, "why the gears," push-the-horn); Day 16 Part 5 (one line, beside Lab 8 Figure 6, as a contrast with the loop students are about to design) | All three | None — this is the reading → class → later-contrast design the rubric protects, not B-8 duplication: three different treatments (motivate, explain, contrast), not the same treatment twice |

Nothing else in the three plans is stated more than twice as delivered content.

### Findings

- **[MAJOR] P-7, P-2 — Day 15 Part 3 (`plans/day15.md` Part 3, 15 min)** — Ground truth §5 is explicit: *"Prescaler arithmetic for 50 Hz was already done once, as the Day 11x stretch… Day 15 must frame its design exercise as a second design with a new constraint… not as first contact."* Nothing in Part 3's actual script does that framing — the three commits read as first contact, and by the third commit a student must hold prescaler-to-clock arithmetic, the 16-bit ARR ceiling, the T0 formula, steps-between-1–2ms, angular resolution, the dead-band comparison, and two new names (`PWM_TIMER_MAX`, `SERVO_MIN/MID/MAX`) — eight elements, well past P-7's four, in 15 minutes across three cascading commit/reveals for material that is mostly recall. Fix: open commit 1 with the one-line pointer ground truth asks for, and reclaim 3–5 minutes for the genuinely new pieces (dead band, naming). Source the added minutes from Part 6's wiring-start, which the plan's own cut-order already lists as first to go (B-18): Part 6 drops from 12 to ~7–9 min, Part 3 gains the difference.

- **[MAJOR] P-2 — Day 16 Part 2 (`plans/day16.md` Part 2, 33 min)** — Lab 8's eight deliverables run back-to-back with a single checkpoint at minute 50 — the exact end of the Part. A student who falls behind at the measurement or R2 step gets no catch until the block is nominally finished, by which point wiring, coding and testing have all compounded on the same unnoticed error. Day 16's cut order never touches Part 2. Fix: insert a checkpoint after the physical build (roughly minute 33, after "wire two dividers… AD2 voltmeter on both nodes," before the code-and-flashlight beat) so a wiring problem is caught before code is layered on top — the existing single checkpoint split into two shorter ones inside the same 33-minute budget.

- **[MAJOR] B-8, B-18 — repetition census, row 1.** The servo's power rule and wiring mapping is told in full twice (Day 15 Part 6, Day 15x Part 1) one class day apart. Fix as in the census table: Day 15x Part 1 becomes a pointer, not a retelling; the ~2 minutes recovered go toward Finding 4's checkpoint buffer.

- **[MINOR] P-2 — Day 15x Part 2 (`plans/day15x.md` Part 2, 20 min)** — The crucial-step checkpoint sits at minute 28, exactly the end of the block. A servo that fails to move gets caught with zero runway before Part 3 starts. The plan's stated overrun contingency does absorb this in practice — but the census fix would buy back the 1–2 minutes needed to move the checkpoint a beat earlier, after "servo leads" and before the final confirmation.

- **[MINOR] P-7 — Day 16 Part 1 (`plans/day16.md` Part 1, 12 min)** — Five related but distinct ideas share 12 minutes: the divider-direction commit, the "why 3.3 V" reminder, the log-log nonlinearity family, the sensitivity-slope datasheet moment, and the unit-to-unit-variation framing — all inside a single 5-minute beat. If Part 1 overruns, this is where to trim first: state "each photocell differs, sometimes by 50%" as an asserted fact and spend the saved time on the sensitivity slope alone.

---

# expert-continuity-auditor

## Verdict: BLOCKER (Day 15) / MAJOR (Day 16) / OK (Day 15x)

## Findings

- **[BLOCKER] [P-1 / B-8]** `plans/day15.md` Part 5 (*"the ADC code is their own from Day 7 (already in `mylib` for most)"*; *"your `adc.c`/`adc.h` from `mylib`"*) — the crucial step's code (`Day15_servo_template.c`, recovered in ground truth §2) does `#include "adc.h"` and calls `pa0_adc_init()`/`start_conversion()`/`adc_read()` as **library** functions with a header. But `source/ch-adc.ptx` (Day 7) never productizes `ADCPot.c` into `adc.c`/`adc.h` — Part 4b (`ch-adc.ptx:1050-1200`) and the homework (`:1450-1544`): the pot driver stays a single `Src`-folder program, never split into a `mylib` header/implementation pair. `assets/Labs/Lab4_ES28.pdf` read in full: students copy and modify `ADCPot.c` in place — no `adc.h` step anywhere. Compare the pattern the course *does* use — `uart.c`/`uart.h` → `mylib` (`ch-uart.ptx:387-402`) and `i2c.c`/`i2c.h`, `SevenSeg.c`/`SevenSeg.h` → `mylib` (`ch-i2c.ptx:293-301`, `:3099-3111`, `:3683-3687`) — each explicitly taught. `ch-adc.ptx` teaches no analogous step, and `assets/starters/adc.h` does not exist. So Day 15's 45-minute crucial build assumes infrastructure that has never been taught or built, for most of the class. **Fix**: teach the productization explicitly — either retroactively as Day 7/7x homework (mirroring `uart.c`'s pattern, costing Day 15 nothing), or as a named ~3 min beat inside Day 15 Part 5 itself, displaced from Part 6's wiring start (already first on Day 15's own cut order).

- **[MAJOR] [B-8 / P-1]** `plans/day15.md` Part 3 presents the 50 Hz-from-12 MHz prescaler design as first contact. But this identical problem was already solved once, as the Day 11x stretch: `source/ch-motors.ptx:2155-2173` (`inst-day11x-stretch`) computes *"12 MHz ÷ 50 Hz = 240,000 counts per period... PSC_FACTOR would have to be 120 and PWM_TIMER_MAX 2000"* — a different row of the same table. Ground truth §5 itself names the requirement, but `day15.md`'s actual Part 3 beat text contains no recall of the Day 11x stretch. **Fix**: one recall sentence at the top of Part 3 — a rewording, no added minutes.

- **[MAJOR] [P-1, downstream delivery]** Day 15's crucial-path code drives the loop off a `TIM16` interrupt flag. Lab 8 §4 explicitly requires *"Use the millisecond timer we have provided to keep track of your value for T"* — but the TIM16→`milliseconds()` substitution is taught **only** as Day 15's optional STRETCH tier 1, not on the crucial path. Yet `plans/day16.md` Part 5 states flatly, for the whole class, *"T kept with `milliseconds()` (Day 12)"* as one of "the two safety facts said once" — a fact never established for any student who skipped Tuesday's stretch. **Fix**: promote the swap into Day 15's crucial path (~2 min added to Part 4, displaced from Part 6's wiring start or Part 1's push-the-horn beat), **or** re-teach/confirm it explicitly at the top of Day 16 Part 4 before Part 5's design (displacing from Part 3, already first on Day 16's cut order).

- **[MINOR] [P-1 / L-5, L-6]** `plans/day16.md` Part 1 introduces the sensor-divider formula without recalling that the class already met a voltage divider on Day 7: `source/ch-adc.ptx:178-201` (`fig-adc-divider`), V_wiper = V_supply × R_2/(R_1+R_2) — same structure, different variable names. The pot **is** a divider; Day 16 should say so rather than re-derive the concept cold. **Fix**: one recall sentence, no time cost.

- **[MINOR] [P-11]** `plans/day15.md` Part 3's reveal (dead band 1 µs) and the reading's spec paragraph state the servo's dead band and current draw as settled numbers, but ground truth §3 and §9 Question 1 show these are unsourced against the hosted SG90 datasheet. `week8-map.md`'s own risk #5 says the reveal is "written to survive 'your figure' as the answer" — but `day15.md`'s actual reveal text is not visibly hedged. Confirm before Gate 2 that both the reading's spec paragraph and Part 3's reveal carry the same placeholder/hedge.

## Per-day summary

- **Day 15 — BLOCKER.** The crucial step's own template assumes a library file (`adc.h`) that no prior chapter or lab has ever taught students to build; the design exercise (Part 3) doesn't relate to the identical arithmetic already done as the Day 11x stretch. Everything else checked clean: Part 4's `refPage`/xref reuse of Day 11x's TIM14 figures is correctly never-redefined; H-bridge, the regulator board, and the brown-out reasoning build cleanly on Day 11/11x without restarting.
- **Day 15x — OK.** The two-channel ADC read correctly rests only on already-taught material (`CHSELR`, `ADSTART`, `EOC`, `ADC_DR`) plus new content taught in place with RM0490 pasted (`EOS`, `CCRDY`) — properly scaffolded, not a forward reference. Explicitly named as the week's one addition, correct per ground truth §2c.
- **Day 16 — MAJOR.** Part 5's K-beat correctly honors L-2 — confirmed compliant. But Part 5 asserts the `milliseconds()`-based T as settled for the whole class when it is only conditionally true (Day 15 stretch), and Part 1 restarts the divider concept instead of recalling Day 7's.

---

# expert-class-logistics

### Verdict: BLOCKER
**By day:** Day 15 = MAJOR · Day 15x = BLOCKER · Day 16 = MAJOR

The week's timing tables all sum correctly (S-8 arithmetic is clean on every day), and the self-diagnosis ladders at each checkpoint are genuinely good (P-14). The blocker is structural: Day 15's own crucial step is optimistic against Petra's explicit warning, and Day 15x — the day that has to absorb both the overflow and new content — has no slack to do either job.

### Running clock

**Day 15 (110 min).** 0:00–0:05 settle/announce. 0:05–0:15 Part 1 (loop). 0:15–0:23 Part 2 (pulses). 0:23–0:38 Part 3 (three timer commits). 0:38–0:48 Part 4 (read the program). 0:48–1:33 Part 5, the design exercise — CRUCIAL, checkpoint at 1:15. Against her own note ("takes students a LONG time. Lots of trouble-shooting to do") and the 3× completion-spread rule, a full room will not uniformly reach "verified pulse" by 1:33: expect roughly a third done well before then, a third finishing near the wire, and a real tail still debugging past 1:50. The plan's mitigation — sacrifice Part 6 (1:33–1:45) — is sound and correctly named as the first cut. 1:45–1:50 close. **Where it actually ends: most boards pulse correctly; a meaningful minority do not, and start Wednesday without the prerequisite Day 15x itself assumes they have.**

**Day 15x (50 min) — the pinch point.** 0:00–0:08 settle/announce/recall. 0:08–0:28 Part 2, servo wiring — CRUCIAL, checkpoint at 0:28. For students without Tuesday's verified pulse, this part is not just slow, it is impossible — nothing in the 50-minute budget lets them finish Tuesday's work first (the deck's own "finish Tuesday first" line is demoted to a presenter note with zero allocated minutes). For students who do have a working pulse, 20 minutes for a first-time, power-carrying, 3-lead wiring job with conflicting color documentation across every source in hand is tight, not doubled. 0:28–0:45 Part 3, two ADC channels — new content, immediately following, no slack. 0:45–0:50 close. **Where it actually ends: a real fraction of the room has neither a working servo nor personal experience with two-channel ADC — both named as Thursday's prerequisites — with the class's only "buffer" (a demo-mode fallback for Part 3) not reconciled against Thursday's fixed budget.**

**Day 16 (110 min).** 0:00–0:05 settle/announce. 0:05–0:17 Part 1 (divider, predict). 0:17–0:50 Part 2, Lab 8 Part 1 in class (8 deliverables) — checkpoint at 0:50; students still repaying Wednesday's debt (unwritten two-channel code) absorb that debt here, uncosted. 0:50–0:58 Part 3 (sensor family, lecture, low risk). 0:58–1:13 Part 4, arm assembly (first-time fine-motor work in shielding cups, likely underbudgeted). 1:13–1:35 Part 5, the loop design — never cut, but landing on whatever time and attention is left after two tight, hands-on parts. 1:35–1:45 Part 6 (cuttable). 1:45–1:50 close. **Where it actually ends: the on-pace two-thirds of the room reaches the stated crucial step (dividers on the arm, loop designed); the tail carried over from Tuesday/Wednesday is still doing hardware triage at minute 110 and never reaches Part 5.**

### Findings

- **[BLOCKER] [S-8] Day 15 → Day 15x continuity** — Day 15's crucial step (Part 5, 45 min) is sized against Petra's own note that the exercise "takes students a LONG time" with "lots of trouble-shooting," yet Day 15x's 50-minute budget sums exactly (2+1+5+20+17+5=50) with no reserved catch-up time, and Part 2 opens by assuming "yesterday's program is still on the board" working. Her deck's own remedial line ("if you didn't finish Tuesday's exercise you need to complete that first") is correctly demoted to a presenter note (S-25) but that also strips it of any allocated minutes. *Fix: name explicit catch-up minutes at the top of Day 15x — displace from Part 3, which the plan already treats as compressible into a demo — rather than leaving stragglers with no path to the prerequisite at all.*

- **[MAJOR] [P-2 / B-11c] Day 15x Part 2 — an unplug step is implied, not written.** The sequence is: wire the regulator rail unpowered → "Adapter in, multimeter on the 5V pin: 5 V before anything is connected to it" (power live) → "Servo leads: center to the 5V rail…" — with no stated step to unplug the adapter again before the servo leads land on a live rail. This contradicts her own slide 27 rule, "UNPLUG POWER before making any changes to wiring," and Day 11's established discipline. With one instructor and thirty self-pacing students, an implicit step is a step that gets skipped. *Fix: insert an explicit "unplug the adapter" beat between the voltage check and the servo-lead wiring, funded from Part 1's 5-minute recall.*

- **[MAJOR] [P-2] Day 15x Part 2 — first-time 3-lead wiring not doubled.** P-2's own example ("a potentiometer with three legs will have a meaningful fraction of the class wiring it backwards") describes this servo wiring exactly, and the ground truth records the color code as actively contradictory across every source in hand (deck slides 27 vs 29, the SG90 sheet, Lab 8's note) with no corrected wiring figure yet delivered (open question 5). 20 minutes, not doubled, immediately followed by a hard transition into new Part 3 content at minute 28 with zero slack, will strand a wide tail of students exactly at the week's most safety-sensitive step. *Fix: budget ~35–40 min by pre-emptively treating Part 3 as a demo today (its own documented fallback), rather than waiting for the overrun to trigger it.*

- **[MAJOR] [S-8] The Day 15x → Day 16 recovery path is uncosted.** Day 15x's own stated fallback for an overrun is "the do-step is the first thing on Thursday," but Day 16 Part 2 allots a fixed 10 of its 33 minutes to "Wednesday's two-channel program… one-second period; D7–D8 with the flashlight" — a figure sized to *adapt* already-working code to new pins, not to write it from scratch. If Wednesday's do-step didn't happen, Thursday's Part 2 has no named displacement to absorb the missing first-time coding work. *Fix: if Day 15x's Part 3 do-step is cut, Day 16 Part 2 must name what it gives up (candidate: shorten D5–D6's on-paper voltage computation) to fund the extra ~10 minutes the code will actually take.*

- **[MAJOR] [P-2 / S-8] Day 16 Part 4 (15 min) underbudgets first-time mechanical assembly, with no cut-order coverage.** Seating two small photocells into the tracker arm's shielding cups and re-landing their alligator clips on the same breadboard rows is fine-motor, first-time-with-this-fixture work for 30 students working alone — 8 of the part's 15 minutes, not doubled. Unlike every other Part this day, Part 4 appears in neither the "never cut" list nor the cut order, so there is no named recourse if it runs long; the overrun falls directly on Part 5, which *is* marked never-cut. *Fix: either double Part 4's cup/clip beat (funded from Part 3's 8-minute lecture, already the day's first named cut) or add Part 4 explicitly to the cut order with a stated fallback (e.g., clips checked by the instructor walking the room rather than a full-class pause).*

- **[MINOR] [B-11c] Day 16 Part 2's D2 measurement window doesn't budget for a true "dark" reading.** The 6-minute beat covers both datasheet lookups and four physical multimeter measurements (dark + light × two cells); getting a genuinely dark reading in a lit classroom (hand-cupping, ambient leakage) typically costs more than the electrical measurement itself, even though the sensor's own response time (55 ms/20 ms) is fast. *Fix: no time change needed, but the presenter note should say explicitly how to get a fast, good-enough dark reading (e.g., cup the sensor in a closed fist) so thirty students don't each improvise a technique.*

---

# learner-firstgen-novice

## Day 15 — Servomotors (Tue, 110 min)

### Verdict: MAJOR

- **[MAJOR] [P-1, P-2]** `day15.md` Part 3, commit 1 → **"Reveal: ARR is 16 bits, so 240,000 and 120,000 are out."** — This is the sentence where I stop. I'm asked to fill a table with prescaler → timer clock → auto-reload values, and then told two rows are impossible because of a 16-bit register, but nothing before this point in the day (or in the reading, which is explicitly forbidden from carrying PSC/ARR/CCR content) reminds me what "auto-reload" is or that 16 bits caps out at 65,535. The one place that *does* recall the register machinery — "every register the same, Day 11x's figures by `refPage`" — is in **Part 4**, which comes *after* Part 3's three commits. I'm being asked to compute with a concept before the day re-introduces it. Fix: move one recall sentence ("Timer 14 counts up to its auto-reload value, ARR — and ARR is a 16-bit register, so the largest count it can hold is 65,535") to the top of Part 3, before commit 1. DISPLACES: trim Part 1's push-the-horn beat to one sentence — already named as the day's own first cut in the overrun order, so this costs nothing net.

- **[MAJOR] [B-9a, P-1]** `day15.md` Part 3, commit 2 → **"Reveal with the dead band: 0.5 µs is finer than the servo can notice, 20 µs is 3.6° — 60 is the one."** — "Dead band" is used here as though I already know it, but I don't, and nothing before this sentence defines it. It isn't in the reading (Part 5's "Must not contain" list explicitly keeps the resolution argument out of Before Class), and it isn't in Part 1 or 2. This is the day's whole design argument — the answer to "which prescaler is best" turns on this one word — and I'm handed the term for the first time inside its own reveal. Fix: one clause in Part 2, where the pulse-width command is recalled: "…the servo also has a dead band — the smallest change in pulse width its motor can actually notice." DISPLACES: cut one clause from Part 2's "PWM used as a message, not as an average voltage" aside.

- **[MINOR] [B-11c, P-2]** `day15.md` Part 5 → **"your `adc.c`/`adc.h` from `mylib` (5)."** — This assumes my ADC code is already sitting in `mylib`. Her own deck's slide 20–21 gives the fallback ("If you have previously added your adc code to the mylib folder you are good to go, otherwise copy adc.c and adc.h into Src and Inc") and the plan drops it. If I'm one of the students who never productized Day 7's driver into `mylib`, I hit a missing-file build error at minute ~48 with no instruction for what to do about it — exactly the kind of silent stall the checkpoint at minute 75 is too late to catch. Fix: restore the one-clause fallback. Zero net minutes — it's restoring wording the plan compressed out, not adding new content.

**What works:** the checkpoint ladder at minute 75 (wiring vs `#define` vs ADC/map, triaged by symptom) is a real rescue, and the x-hour is genuinely an overflow valve, not a bluff — the day survives the pacing above without collapsing, which keeps this MAJOR rather than BLOCKER.

## Day 15x — Servos, continued (Wed x-hour, 50 min)

### Verdict: MAJOR

- **[MAJOR] [P-7]** `day15x.md` Part 3 → **"Reveal with RM0490 §14.4 on screen: the sequencer converts the selected channels in number order, EOC after each, EOS at the end; so either read twice per start (route A) or select one channel per conversion and wait for CCRDY (route B)…"** — Three near-synonymous acronyms (EOC, EOS, CCRDY) plus "the sequencer" all land in one 5-minute reveal, with no mini-arc (motivate → one mechanic → one mechanic → practice) — this is a first encounter with a whole new ADC behavior compressed into a single dense paragraph, in the same breath as choosing between two implementation routes. This is the sentence in the whole week I'd be most likely to just copy code without understanding, which is exactly the failure mode I'm trying to avoid. Fix: split the reveal — state EOC/EOS as "the ADC finishes one channel, then the next, in order" first, let that land, *then* introduce CCRDY as the one new gotcha (the wait-before-starting rule). DISPLACES: the CCRDY corner case is fine to state once and point at, rather than walk through live — cut it from the spoken reveal and let the printed RM excerpt on screen carry it, freeing ~1 minute.

- **[MINOR] [B-5, P-2]** `day15x.md` Part 3, "do" beat → **"modify your Day 7 program to read A0 (the pot) and A1, A1 jumpered to 3.3 V then to GND, and print both."** — This is at least four actions in one sentence (edit code, physically wire a jumper from A1 to a rail, build, run, read output, then re-wire to GND and repeat) and never says *how* to jumper A1 to 3.3 V — which row, which rail, which wire. I can start the code edit, but the physical step is a guess. Fix: one clause naming the physical action ("a wire from A1's breadboard row to the 3.3 V rail"). DISPLACES: nothing — this is one clause, absorbed into the existing 7-minute do-beat.

**What works:** the wiring/power sequence in Part 2 (unplug everything → 5 V rail → multimeter check → servo leads → observe) is genuinely a first-action-obvious, step-by-step sequence — I could follow it without anyone leaning over my shoulder.

## Day 16 — Photosensors and the solar tracker (Thu, 110 min)

### Verdict: MAJOR

- **[MAJOR] [P-2]** `day16.md` Part 5, commit 1 reveal → **"e = V1 − V0; the sign depends on which cell is which and which way CCR1 moves the arm — find it on your own board, not in the book."** — This is the crucial step's own definition (week8-map: "the student has written down the loop's update rule **with its sign**"), and the reveal tells me to determine that sign empirically on my own hardware — but Part 5's beats are all reading and table-talk (predict → reveal ×3), and no minutes are budgeted anywhere for actually testing my board. Part 4's flashlight sweep (4 min) happens *before* Part 5 and isn't framed as "note which way this tells you to turn" at the time. So the checkpoint at minute 50 doesn't rescue this — it's a different problem (a channel reading a rail value), not this one. I'd leave Thursday having written down an equation with a blank where the sign goes. Fix: rename part of Part 4's existing "sweep the flashlight across the arm and watch the two numbers cross" beat to explicitly ask "which channel rises as you move the light toward which side?" — the observation is already scheduled, it just isn't yet pointed at the thing Part 5 needs. DISPLACES: nothing — reuses an existing 4-minute beat, no new minutes.

- **[MINOR] [B-9a]** `day16.md` Part 5, commit 2 reveal → **"the ADC counts are used directly (the lab's VREF/4096 lumped into K); no floats needed."** — The integer-truncation point (K·50 → 0) lands fine on its own, but "VREF/4096 lumped into K" is a second, unrelated idea packed into the same clause, and nothing before it has explained what VREF/4096 represents (volts per ADC count) or why it would need to be "lumped" anywhere. I'd nod and move on without understanding it, which is worse than not hearing it. Fix: drop this clause from the live reveal entirely; the "no floats needed" conclusion doesn't depend on it. DISPLACES: nothing removed from the schedule — the clause is simply cut, and the fuller derivation (if wanted) moves to the chapter's Reference section per B-10.

- **[MINOR] [B-9a, P-1]** `day16.md` Part 1 → **"The log-log family (her slides 4–5): straight on these axes only."** — "Log-log axes" is asserted, not explained, and this is the persona's flagged gap (reading a log-log plot). It's low stakes here because the point (nonlinear-but-tameable) survives even if I don't fully parse the axes, so I'm marking this MINOR rather than MAJOR — but one clause ("both axes stretched logarithmically, so a power-law curve becomes a straight line") would cost nothing and close it.

**What works:** Part 2 (Lab 8 §2 done in class) is well-scaffolded — datasheet lookup, measurement, wiring, and the two-channel program are sequenced so the first physical action is always obvious, and the checkpoint at minute 50 catches the two most likely wiring mistakes with a clear diagnostic. Part 4's "confirm the servo still follows the pot" opening is a good, low-stakes re-entry point after the mechanical work.

## Overall verdict: MAJOR

No single day is unreachable — every crucial step has *some* checkpoint or overflow valve, and none of what I found would leave a board completely dark with no way back. But across all three days the pattern repeats: a term or mechanism (dead band, the sequencer/CCRDY, VREF/4096, the loop's sign) is used inside a dense reveal at the exact moment it's needed, rather than surfaced one beat earlier where it costs nothing to say. That is the specific, fixable shape of the problem — every fix above is a clause or a beat-rename, not new content, and each names what it displaces per the length-budget rule (B-18). Fixed, these three days would clear Gate 1 as OK.

---

# learner-anxious-nonhardware

### Verdict: BLOCKER

**Per-day:** Day 15 = MAJOR · Day 15x = BLOCKER · Day 16 = MAJOR

### Findings

- **[BLOCKER] P-2, B-12** — `week8-map.md` §"Week-level risks" item 2 / ground-truth §9 Q5 — *where I'd withdraw:* every wiring drawing that exists for this week (her decks' slides 29, 30, 16/10, 13, 14) feeds the servo's power rail from the Nucleo's **3V3** pin — the exact thing the text says causes the brown-out. Day 15 Part 6, Day 15x Part 2, and Day 16 Part 4 all point students at "the wiring" with no other picture in hand. If I wire from a figure that matches everything else I've seen in the deck, I can't tell whether I just fed my servo (or my board) from the wrong rail — the text warns me but doesn't show me the difference. A "don't" with no correct picture next to it is not a rescue, it's a trap. **Fix:** gate Day 15 Part 6 and Day 15x Part 2 on the corrected figure landing first (question 5 must close before either ships); until then, do not let a Fritzing from the old decks appear anywhere near "how to wire the servo."

- **[BLOCKER] P-2, S-25** — `day15x.md` Part 1 / coverage table row "2 (finish Tuesday first)" — *where I'd withdraw:* Day 15's own ground truth says the design exercise "takes students a LONG time. Lots of trouble-shooting to do" — some students will not have a verified pulse by the bell. Day 15x's Part 1 nonetheless opens "Yesterday **every student** proved a 1–2 ms pulse," and her original safety-relevant line ("if you didn't finish Tuesday's exercise you need to complete that first") is downgraded to a presenter note with **zero minutes budgeted** for it in the 50-minute total. Part 2 then goes straight to powering the real servo. If I'm the student who never verified my pulse, I either sit doing nothing while the room wires hardware (the withdrawal this review exists to catch), or I wire an unverified signal straight into a servo I've been told can be damaged. This is the one moment where "no safe re-entry" and "fear of damage" are the same failure. **Fix:** before Part 2 connects power, add a 2-minute universal re-check — "reverify on the AD2 that your pulse is still 1–2 ms" — which catches both the behind student and anyone whose Tuesday build silently regressed; fund it by trimming Part 3 (17→15 min) or the close (5→3 min), not by cutting Part 2.

- **[MAJOR] P-14, P-2** — `day16.md` Part 4 ("confirm it," 3 of 15 min) — *where I'd withdraw:* by Thursday, whether my servo still follows the pot after two days of handling, storage, and re-wiring is the one thing everything else that day is built on top of — and it's the only checkpoint all week with no diagnostic ladder. Day 15 has one (wiring/build vs `#define` vs ADC/map); Day 15x has one (power/ground vs signal pin vs brown-out). Day 16 Part 4 just says "confirm it." If it doesn't move, I have no sorted list of what to check before the room moves into Part 5's design work without me. **Fix:** give Part 4 the same three-branch shape as the other two checkpoints (no motion → power/ground as Wednesday's ladder; motion but ignores the knob → wiring against Wednesday's; motion but off-center → knob re-seated?); fund the extra ~2 minutes by shortening Part 6 (10→8 min), already marked as continuing in the lab.

- **[MAJOR] B-12** — Day 15 reading hand-off, carrying her slide 8 note — *where I'd withdraw:* the reading is set to import, near verbatim, "All we have to do is stick in a signal to command the position. The circuitry does the rest." That sentence sits immediately upstream of the day's crucial step, which her own note calls an exercise that "takes students a LONG time. Lots of trouble-shooting to do." Told beforehand that this is easy, when I get stuck for 45 minutes I read that as me being the problem, not the material being hard — which is exactly the fear this review is watching for. **Fix:** keep her mechanism description, but do not let the "all we have to do" clause land in reading prose that precedes Part 5; state instead that getting a clean pulse usually takes real troubleshooting, without naming a fix ("productive struggle," not reassurance theater, per P-14 and the ban on reassurance theater in B-12).

- **[MINOR] P-1** — `day16.md` Part 1 — *where I'd withdraw:* Day 15 opens Part 1 with an explicit one-line recall ("torque ∝ current — key fact we need going forward") before its first commit. Day 16 Part 1 goes straight to the divider figure and a predict commit ("brighter — V_M up or down?") with no restated sentence of what the reading established (a photocell's resistance falls as light rises). If I came in shaky on the reading, the very first minute of Thursday assumes I already have it loaded. **Fix:** add one restated sentence ahead of the commit, matching Day 15's pattern; costs a sentence, not a minute.

- **[MINOR] B-12, P-2** — Day 15 Part 3 reveal / `<instructor>` note "you HAVE to stay between those to not damage the servo" — *where I'd withdraw:* the danger is stated as a bare imperative, never paired with the fact that the class's own sequencing is what protects me from it — the pulse is verified on the scope Tuesday with no servo attached, before the servo is ever wired Wednesday. That structure is real and it's reassuring, but nobody ever tells me it's there on purpose. **Fix:** one sentence, in Day 15 Part 5 or Day 15x Part 1: "this is why you verify the pulse on the scope before the servo is ever connected — a wrong number shows up on the screen, not in the gear train." No added minutes; folds into existing text.

---

# expert-rigor-hawk

Reviewed: `plans/day15.md`, `plans/day15x.md`, `plans/day16.md` against `plans/week8-ground-truth.md` and `AUTHORING-book.md` (S-16, S-19, B-11c, B-11d, L-2). Verified the timer arithmetic (prescaler tables, T0, angular steps, the 399 top value, SERVO_MIN/MID/MAX) line by line — all of it checks out exactly against the ground truth's §1/§2, and none of the three placeholder-era fabrications (700 mA stall, 0.7 exponent, 560 nm peak) reappear in these plans.

**Two claims verified true, stated for the record, not as findings:**
- *"The mid-value puts the dark and light readings farthest apart on the ADC's scale"* (day16.md Part 2). Re-derived: for a divider V = Vcc·R2/(Rsens+R2), maximizing ΔV = V(R_illuminated) − V(R_dark) over R2 gives exactly R2 = √(R_dark·R_illuminated) — the same value that also centers V_dark and V_light symmetrically about Vcc/2. The plan's one-sentence claim is exactly right.
- *"The servo's loop is ENGS 26's"* — correct scoping, not a dodge. It is Petra's own line, and the plans never claim to explain the internal controller's mechanism, only its observable behavior.

### Verdict: MAJOR
Per day — **Day 15: MAJOR** · **Day 15x: MINOR** · **Day 16: MAJOR**

### Findings

- **[MAJOR] S-19 / question 1** `day15.md` Part 3 and the tier-2 stretch — Day 15's entire "which prescaler" reveal rests on the servo dead band (1 µs) as settled fact, but the ground truth is explicit that no hosted datasheet supports this number and it is an open question blocking exactly this reveal (§9 Q1). The hedge that exists lives only in a footnote three sections away. **Fix:** back the reveal with a number-independent argument that survives if Q1 never resolves — a plastic gear train's mechanical backlash is coarser than 0.09°/0.9° regardless of the exact electrical dead band, so finer than a few tenths of a degree is wasted either way. One sentence, no added minutes; if Q1 resolves with a real figure, add it as confirmation rather than as the sole premise.

- **[MAJOR] S-19 / L-2** `day16.md` Part 5 Commit 2 — "K = 0.01 and e = 50 → step 0… which is not all bad" replaces a computable consequence with a hedge. Integer truncation zeroes the correction for **any** |e| < 100 counts, not just 50 — a genuine steady-state dead zone of about ±100 ADC codes (≈ ±0.08 V at 3.3 V/4096) that the tracker cannot correct out of. "Not all bad" never says what "it" is. The adjacent "no floats needed" also overstates L-2: that rule forbids `%f` in `printf`, not float *arithmetic* — a float `K` would avoid this dead zone entirely; avoiding it here is a style choice with a real cost, not a hard constraint. **Fix:** state the bound ("any error under about 100 counts produces zero correction — the arm can sit up to that far from true alignment and stop moving") and reframe "no floats needed" as a tradeoff, not a freebie.

- **[MAJOR] S-19** `day16.md` Part 1 — "compare two, do not measure one" is the sanctioned replacement for the condemned "nonlinearity cancels" claim (ground truth §7.6), but it drops exactly the caveat that made the original false: comparison only cancels a **shared** nonlinear curve between matched cells; the residual is cell-to-cell mismatch, which Adafruit's own sheet puts at 50%+. **Fix:** carry the one sentence ground truth already wrote — comparison works because both cells share the same curve shape; what's left over is unit-to-unit mismatch, which is why the datasheet gives ranges rather than one number.

- **[MAJOR] S-16** `day16.md` Part 3 — the rise/fall-time datasheet moment states the numbers (55 ms rise, 20 ms fall) and gestures at relevance but never closes the argument with a number or comparison. **Fix:** name the actual comparison — against Lab 8's own 1-second D7-D8 sampling, or the controller's period T — so the beat ends on a stated conclusion ("tens of milliseconds means our sampling rate has room to spare"), not a rhetorical question.

- **[MINOR] S-19** `day16.md` Part 1 — "S = Δlog R/Δlog E = 0.6, is that slope" drops the sign nuance ground truth flags explicitly (§3): the datasheet's 0.6 is a magnitude; the actual slope on the resistance-vs-illumination log-log plot is negative. **Fix:** "the magnitude of the (negative) slope" — one clause.

- **[MINOR] S-19** `day15.md` Part 1 — Petra's own slide-6 text is "(except for friction) conserved: τin ωin ≈ τout ωout"; the plan's reveal drops the qualifier to "power is conserved." The exception is hers, stated deliberately. **Fix:** restore the three words.

### Notes for the synthesizer

- Day 15x is clean: its wiring and two-channel content are faithfully hedged against open questions 4–6, its sequencer claim matches RM0490 verbatim, and its diagnostic ladder is a triage heuristic grounded in the mechanism taught.
- All timing arithmetic sums correctly in all three plans.
- The fixes above are each one clause to one sentence, landing inside beats that already have their allotted minutes.

---

# learner-weak-circuits

### Verdict: BLOCKER

**Per-day:** Day 15 — BLOCKER · Day 15x — BLOCKER · Day 16 — MAJOR

### Findings

- **[BLOCKER]** **[P-4, B-11c]** `plans/week8-ground-truth.md` §6 (question 5); `plans/day15.md` Part 6; `plans/day15x.md` Part 1–2; `plans/day16.md` Part 4 (coverage row "14 — ultimate setup") — The one diagram that shows the servo actually wired correctly does not exist. Ground truth is explicit: "every candidate in her decks draws the wrong rail" — every Fritzing feeds the servo's power lead from the Nucleo's **3V3** pin, which is the exact connection the reading's own power rule says never to make. As a student with wiring fear, if I open the deck I have nothing to copy that isn't wrong, and nothing that's right either — I'd have to invent the correct wiring myself, which is precisely what stops me. Day 15 Part 6, Day 15x Part 1–2, and Day 16 Part 4 all point at this same missing artifact. **Fix:** this is gated on Petra answering question 5; the book cannot ship Day 15 Part 6 without a delivered, checked figure — regulator board with 5V/GND/Vin pins labeled → 5V to the servo's center lead, GND to the dark outer lead *and* jumpered to the Nucleo's GND, signal (remaining lead) to PA7/D11 — ideally in the style of `fig-day12-lab6-build`, which already draws the regulator correctly. This is pre-class authoring work, not class-time cost, so nothing needs to be displaced to fund it — but no amount of in-class scaffolding fixes a page that shows the wrong rail.

- **[MAJOR]** **[P-1, P-4]** `plans/day15x.md` Objective 2 vs. Part 2 activity row — The objective promises "say why that check comes first" (measuring 5 V at the regulator pin before the servo is connected), but the Part 2 activity script is pure action — "multimeter on the 5V pin: 5 V before anything is connected to it" — with no explain/reveal beat attached. I'd do the measurement and still not know what a bad reading (0 V, 9 V, the raw input voltage) would have told me, or what it was protecting the servo from. **Fix:** add one sentence to Part 2: "if this isn't ~5 V, something upstream is wired wrong — find that fault with nothing else connected, before the servo is anywhere near it." Costs under a minute, absorbable from Part 2's own three-observation beat (currently 3 min) without displacing anything else.

- **[MAJOR]** **[P-4, P-7]** `plans/day16.md` Part 1 — The direction reveal ("R_sens falls, V_M rises") skips the middle step: R_sens sits in the *denominator* of V_M = V_cc·R_M/(R_sens+R_M), so R_sens falling shrinks the denominator and raises V_M — that's the actual chain, and it's the step a shaky-algebra reader needs to see once. The swapped-divider case ("swap the two resistors and it goes the other way") is asserted with no way to check it. And because the lab's own R2/voltage numbers are protected (Deliverables 4–6), nowhere in this day is the formula worked with real numbers at all. **Fix:** add one throw-away numeric example not tied to the lab's own values, e.g. "R_sens = 20 kΩ, R_M = 10 kΩ, V_cc = 3.3 V → V_M = 3.3·10/30 = 1.1 V; light doubles, R_sens drops to 10 kΩ → V_M = 3.3·10/20 = 1.65 V — up," plus one sentence on the swap. Under a minute, fundable from the log-log beat day16.md already marks cuttable under overrun.

- **[MAJOR]** **[P-4, P-7]** `plans/day16.md` Part 5, Commit 2 — The scripted reveal for "K = 0.01, e = 50 → what step?" is just "0," with "the lab's VREF/4096 lumped into K" tacked on as an unexplained second substitution. The real chain is: K must be a whole number (no floats in this program), so 0.01 stored as an int is already 0 before it ever meets e — a different and more important fact than "0.01 × 50 rounds down," and it's the fact that makes "lumping VREF/4096 into K" meaningful (it's what lets K be scaled to something nonzero). The script never says this out loud. **Fix:** rewrite the reveal: "K has to be a whole number to store it — 0.01 as an int is 0 — so K·e is 0 for every e until K is scaled up; that scaling is what 'lumping VREF/4096 into K' buys you." Same length as the current line — no time cost.

- **[MAJOR]** **[P-4, P-7]** `plans/day15.md` Part 3, Commit 2 — The reveal narrates only the two *rejected* rows ("0.5 µs is finer than the servo can notice, 20 µs is 3.6°") and jumps straight to "60 is the one" without ever saying the winning row's own arithmetic out loud — T0 = 20 ms/4000 = 5 µs, steps = 1000 µs/5 µs = 200, Δθ = 180°/200 = 0.9°. This is exactly the stall point named in the audit brief: a student who can't see 180°/200 = 0.9° worked out has nothing to check the chosen answer against. **Fix:** lead the reveal with the chosen row's full chain, then the two disqualifiers as asides: "prescaler 60 → T0 = 20 ms/4000 = 5 µs; 1000 µs of pulse range ÷ 5 µs = 200 steps; 180°/200 = 0.9° per step — well under the 1 µs dead band, so that's the one. (Prescaler 6: 0.5 µs/step, finer than the servo can feel. Prescaler 240: 20 µs/step, 3.6°, coarser than we want.)" Same beat, reordered — no time cost.

- **[MAJOR]** **[P-7, P-8]** `plans/day15.md` Part 4 — `SERVO_MIN + pot_value*(SERVO_MAX-SERVO_MIN)/MAXADC` is the course's first linear-interpolation-style formula (Day 7's ADC work only ever read raw 0–4095, never rescaled it onto a second range), and it lands as a cold 5-minute "write the expression" commit with no mechanic step first, violating the mini-arc P-7 asks for on a first encounter. The reveal covers int promotion and the SERVO_MAX-is-never-quite-reached off-by-one, but never says why the multiplication is written *before* the division — reorder it and integer truncation silently zeroes the whole map, a code trap as damaging to a first-timer as a wiring one. **Fix:** work one small round-number example before the commit ("map 0–10 onto 100–200: value = 100 + x·100/10") and add one sentence on operation order. Fund it from Part 4's TIM16 beat, which the plan already marks cuttable to "read it tonight" under overrun.

---

# learner-ai-reliant

### Verdict: MAJOR
### Findings
- [MAJOR] [P-14, P-17] Day 15 Part 3, commit 3 (the `PWM_TIMER_MAX`/`SERVO_MIN`/`MID`/`MAX` fill-in) — prompt: *"12 MHz clock, prescaler 60, 20 ms period, 1/1.5/2 ms pulses — give ARR+1, and CCR for each pulse width"* — AI returns exactly 4000/200/300/400, matching the `<instructor>` reveal verbatim, because the arithmetic is the textbook convention, not the driver students will actually run. Fix: pose the fill-in against `tim.c`'s **actual** convention (`ARR = timerMax`, `CCR1 = value−1`, per ground truth §2a) instead of the idealized formula — a generic AI answer built on Day 11x's taught convention will be off by one, and only a student who reads their own `tim.c` gets it right. Zero added minutes.
- [MAJOR] [P-6, P-14, B-3] Day 15 Part 5, the crucial build — the plan hands students "her two captures on screen as the reference" to match against, so the only individually-produced artifact is a scope trace that reproduces a shown answer. Nothing requires the student to commit to a number before they see whether they were right (P-6's predict-then-verify is present for scope *settings* but not for the *values*). Fix: before the capture, have each student write down their own predicted 1 ms / 1.5 ms / 2 ms readings (three numbers, their own derivation) and only then compare against their own capture — not the instructor's reference image. Students already write down "the knob position that gives 1.5 ms" in the same beat; add two more blanks to the same note.
- [MINOR] [P-14] Day 15 Part 3, commits 1–2 — AI completes the tables in one shot. The `room="yes"` live-commit format blunts the risk, but nothing requires an individual, written pre-commitment before the table is worked as a group. Fix: require the writing-room artifact per S-2 to be an individually-signed prediction (not a shared table), same 15 minutes.
- [MINOR] [P-6] Day 15x Part 3 (two-channel ADC) — students are told in advance what they should see ("near 4095 then near 0"), so there is no predict-then-verify gap. Fix: have students write their predicted raw values for A1 at 3.3 V and at 0 V before wiring the jumper — reuses the existing do-beat.
- [MAJOR] [P-17, P-10 boundary] Day 16 Part 6 (loop pseudocode) — by the end of Part 5+6, the class has collectively assembled read→error→update→bound→write→wait as pseudocode, K's order of magnitude, the bounds rule, and T's source — nearly the entire D9 architecture. **Answering the task's direct question**: D9 is *not* fully pattern-matchable from a pasted controller, because two load-bearing pieces are explicitly withheld and can only be resolved on the student's own board — the **sign** of the step and workable **K/T values**. A generic AI-written controller with a guessed sign and K=0.01 will visibly fail on hardware, forcing genuine debugging. That is a real, hardware-anchored gate — but it is fragile: if Part 6's pseudocode ever drifts toward matching the real function names (`adc_read`, `tim14_pwm_set`, `updateServo`), D9 degrades to fill-in-the-blank. Fix: keep Part 6's pseudocode at its current variable-free abstraction — do not let a later pass "clean it up" into named calls; that responsibility belongs to Lab 8 D9 alone.
- [MINOR] [P-6] Day 16 Part 5/stretch, K/T tuning — nothing asks for a prediction first. Fix: before running, have students write one sentence predicting whether their chosen K/T will hunt, lag, or track smoothly, then compare.

## Per-day verdicts

**Day 15 — MAJOR.** The design arithmetic (Part 3) and the map expression (Part 4) are context-free and AI-complete in full, and the verification step (Part 5) checks a *shape* of the output rather than a student-committed predicted value, so a student who skips the derivation entirely and pastes in AI-supplied constants would pass the checkpoint at minute 75 undetected. Findings 1 and 2 close this with zero added minutes.

**Day 15x — MINOR.** Well-anchored overall: the servo-follows-pot behavior and the two-channel wiring transition both require a physical action on the student's own board that AI cannot fake.

**Day 16 — MAJOR**, driven by finding 5, with two passes worth naming: the protected-list check passed (no datasheet minimums, computed R2, expected voltages or example readings anywhere in the plan text), and the sign of the tracking step is correctly kept out of the book.

---

# Rulings and the applied list

Consolidated by the session from the ten reports above; every item below
was applied to the plans on 2026-09-02 and verified against the rewritten
files. Where two reviewers disagreed, the ruling says why.

## Rulings

1. **The reading keeps the ideas and loses the reasoning (active-learning
   BLOCKER vs B-2).** B-2 says the reading motivates and introduces ideas;
   the reviewer is right that a commit whose answer is a sentence in the
   reading is not a commit. Ruling: the Day 15 reading keeps what a servo
   contains, that it goes to a commanded position and holds it, that the
   command is a pulse of 1–2 ms every 20 ms, the datasheet and the power rule.
   The three explanations — why the gears, what a push does, what happens
   between pulses and when they stop — move into Parts 1–2's reveals, and
   the reading's must-not-contain list names them. Her "all we have to do is
   stick in a signal… the circuitry does the rest" moves to Part 2's framing
   (the anxious learner's point: it must not sit upstream of a 45-minute
   build as a promise of ease). The Day 15x observation beat becomes "you
   predicted this yesterday — watch it happen."
2. **Day 15x gets a budget for finishing Tuesday, not a contingency**
   (logistics, anxious learner, arc-fidelity). Part 2 opens with a universal
   two-minute re-verification of the pulse on the AD2 before any servo lead
   carries it; students still in Tuesday's template spend Part 2 there with
   Tuesday's ladder; and a decision point at minute 10 collapses Part 3 to
   its reveal if more than a third of the room is still on Tuesday, with the
   do-step moving to Thursday's Part 2, funded from Thursday's Part 3. Her
   slide 2 is scheduling, not S-25, and is mapped to Part 2's row.
3. **`adc.c`/`adc.h` is a real gap** (continuity BLOCKER). Verified: `ch-adc`
   never splits `ADCPot.c` into a library, and no `adc.h` exists in the repo.
   Day 15 Part 5 gains a named five-minute beat: split your Day 7 program into
   `adc.c` (the three functions) and `adc.h` (their prototypes) in `mylib`,
   the step you did for `uart.c` and `i2c.c`; her deck's own fallback
   ("otherwise copy adc.c and adc.h into Src and Inc") is restored. New
   question 9 asks Petra whether a Lab 6/7 solution already had students do
   this. Funded inside Part 5 by tightening the `#define` beat (10 → 7) and
   the capture beat (20 → 18), since the numbers are derived in Part 3.
4. **Part 3 is the day's idea and gets 20 minutes** (arc-fidelity, cognitive
   load, novice, weak-circuits, active learning, continuity — six reviewers).
   It opens with the Day 11x callback (a second design of a search the class
   ran once, new constraint) and the ARR-is-16-bit recall; the dead band is
   defined in Part 2 before it is used; the reveal leads with the chosen
   row's own arithmetic (5 µs, 200 steps, 0.9°) and rests on the
   number-independent premise — her own "this thing is made out of plastic"
   — with the 1 µs figure as confirmation pending question 1 (rigor hawk);
   and commit 3 adds "now open `tim.c`: what number actually reaches CCR1
   for `SERVO_MID`?" so the answer is not the textbook's (AI-reliant, tied to
   question 2). Funded from Part 6 (12 → 7): the wiring start was already
   the day's first cut and is Wednesday's Part 2 in full.
5. **The map expression gets a mechanic step first** (weak-circuits): a
   round-number example (map 0–10 onto 100–200) and the multiply-before-divide
   rule, inside Part 4's existing minutes by trimming the TIM16 beat to one.
6. **Predict before the capture** (AI-reliant): each student writes their
   own predicted `pwm_value` printout at the two knob ends and the middle
   before capturing, and compares against their own trace; her captures are
   the time-base reference, not the answer.
7. **Day 16's end state is hers: the pot comes out** (arc-fidelity MAJOR;
   her slide 14 has no pot — ground truth §6 corrected). Part 4 confirms the
   servo with Tuesday's program, then retires the pot; the crucial step says
   so. Part 4 gains a three-branch ladder (anxious learner) and two minutes
   (logistics), funded from Part 3 (8 → 6). The flashlight sweep now asks
   which channel rises as the light moves which way — the observation Part
   5's sign commit needs (novice).
8. **Part 5's reading is split** (active learning): the block diagram and the
   error/update paragraph before commits 1–2; the tuning paragraph read after
   commit 3 as confirmation. Commit 2's reveal states the bound (any |e| under
   100 counts gives zero step, a dead zone of about ±100 counts, about 0.08 V)
   and frames integer K as a trade, not a rule (rigor hawk, weak-circuits);
   the VREF/4096 clause leaves the live reveal for the Reference section
   (novice). `milliseconds()` for T is taught as Day 12 recall in Part 5's
   safety beat, not assumed from Tuesday's stretch (continuity).
9. **Part 2 gets two checkpoints** (cognitive load): after the physical build
   at minute 38, before code is layered on it, and at minute 50; the
   dark-reading technique is a presenter note (logistics).
10. **Part 1 recalls before it commits** (anxious learner, continuity,
    weak-circuits, novice, rigor hawk): the photocell's resistance falls with
    light; Day 7's pot was a divider with the same formula; the reveal walks
    the denominator; a throwaway numeric example that is not the lab's; the
    "compare two" line carries its caveat (shared curve shape cancels,
    unit-to-unit mismatch does not); the slope's sign; log-log in one clause.
11. **Part 3 closes its own argument** (rigor hawk, arc-fidelity): rise and
    fall times against the lab's one-second sampling and the loop's T, and
    the servo's own 0.1 s per 60° as the other bound.
12. **Additions are named** (arc-fidelity): Day 16 Parts 5–6 are ours,
    expanded from her one discussion slide, and the week map says so; the
    two-loops figure is on Day 16's blocking list; title and divider slides
    are rows in every coverage table; the bring-lists are presenter notes in
    the Day 15 and 15x closes.
13. **Not applied, with reasons.** Logistics' "pre-emptively demo Part 3 on
    Day 15x": the decision point (ruling 2) does the same thing only when
    needed. AI-reliant's "pose commit 3 against tim.c's convention" is
    applied as an added question rather than a replacement, because
    question 2 may align `tim.c` with Day 11x. Continuity's "promote
    `milliseconds()` into Day 15's crucial path": Day 15 has no minutes for
    it and Day 16 Part 5 now teaches it where it is used.

## Rebudgets (every Part's row equals the sum of its beats)

- Day 15: 3+2+10+8+**20**+10+45+**7**+5 = 110. Part 5's beats: 5+5+7+5+18+5.
- Day 15x: 2+1+**3**+**24**+**15**+5 = 50. Part 2's beats: 4+3+1+3+2+5+3+3;
  checkpoint at minute 30.
- Day 16: 3+2+12+33+**6**+**17**+22+10+5 = 110. Part 2's beats: 6+7+8+1+9+2
  (checkpoints at 38 and 50); Part 4's beats: 5+1+8+3.
