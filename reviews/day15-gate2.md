# Day 15 Gate 2 — the book's committee

Reviewed 2026-09-03, over `source/ch-servos.ptx` as of the first complete draft
of the Day 15 book (delivery 1: introduction, Before Class reading and five
reading questions, in-class Parts 1–6 with activities and `<instructor>`
blocks, Reference section; no `<slide>` blocks, no deck). Against
`plans/day15.md` (Gate 1 applied), `plans/week8-ground-truth.md`, the deck
`Day15-Servos.pptx`, the three starter files and the two servo datasheets.
Class length given to every reviewer: Tuesday, 110 minutes.

Gate 1.5 (`checker-voice` on the reading's first subsection) ran first and
its findings were applied before the in-class Parts were written: the
H-bridge clause from her slide 6 note restored, the chapter opening's
deferring armature replaced with what the period and the constraint are, the
horn named, day-labels replaced with chapter names, "prove the pulse" replaced
with checking on the AD2.

Seventeen invocations: the standing core of ten (`checker-technical-accuracy`
scoped three ways plus one self-contradiction read) and the four rotators
this chapter earns (`expert-rigor-hawk`, `learner-weak-circuits`,
`learner-ai-reliant`, `learner-python-intro`). Reports follow in the order
they returned; the synthesizer's list and the applied list are at the end.

---

# learner-anxious-nonhardware

### Verdict: BLOCKER

- **[BLOCKER] P-14, P-2** — `act-day15-build` vs `inst-day15-checkpoint` — the only troubleshooting ladder for the crucial step lives entirely inside an `<instructor>` block. If nothing shows on the scope the page gives no branch to work from (wiring, a `#define`, the map). Fix: promote a stripped, answer-free version of the three-branch triage (category only, not the fix) into student-visible text after `task-day15-build-run`; it reveals no code and no numbers. Displaces nothing (a move, B-18).
- **[MAJOR] P-2, B-4** — `act-day15-fill-in` vs `task-day15-build-blanks` — the four constants (60, 4000, 200, 300, 400) appear nowhere in student-visible prose, and Part 5 says "Complete the four `#define` lines with the numbers you chose." A student whose table was wrong walks into the 45-minute build on a wrong constant. Fix: one lifeline sentence at the Part 4→5 handoff on the model of Day 11x's CC1E recap, the settled constants in parentheses.
- **[MAJOR] B-12, S-15** — "All we have to do is stick in a signal to command the position, and the circuitry inside the servo does the rest." at the top of Part 2, upstream of the 20-minute derivation and 45-minute build. Fix: "The signal that commands the servo's position is a pulse; today we design that pulse and build the circuit to produce it." Same position, no added length.
- **[MINOR] P-1, B-1** — "you HAVE to stay between those to not damage the servo" is instructor-only; Part 4 says only "the servo's safe range", and the consequence (drives against its own stops) appears only in the Reference. Fix: one clause in Part 4's sentence: "…the servo's safe range, 1 ms to 2 ms, outside of which it drives against its own mechanical stops".

What works: Part 5's intro ("a wrong number shows up on the screen, not in the gear train") placed where it helps; the predict task; Part 6's mechanism-not-rule brown-out paragraph and the unplug/power-up order; Part 6 not requiring Part 5 to have succeeded.

---

# learner-visual

### Verdict: MAJOR

Coverage: cutaway, feedback loop, the pulse window, ARR+1 bins/T0, the PWM pins, the leads, the two captures and the two-supplies wiring all have figures; the dead band and the integer map have none.

- **[MAJOR] B-11** `fig-servo-powering` — the red and black wires at the top of the frame run off-canvas with no visible origin and the caption never mentions them. Fix: recrop so their header is in frame and caption them, or say what they are.
- **[MAJOR] P-4** the affine map 0–4095 → SERVO_MIN–SERVO_MAX is worked twice in prose (Part 4, Reference) with no picture. Fix: a two-axis ramp figure (x: 0, 2048, 4095; y: 200, 300, 399), which lets the round-number paragraph and the Reference walk-through shorten.
- **[MINOR] P-4** the dead band (1 µs) decides the resolution table's winning row but is never drawn. Fix: a shaded ±1 µs band on one pulse edge of `fig-servo-pulse-resolution`, or an inset.
- **[MINOR] B-7/P-4** `fig-servo-leads` — the reviewer reports the rendered image as a generic product photo with no stand or arm, leads exiting top-left (md5 identical to the deck's image31.png). Fix: correct the caption or supply the mounted photo. [Session note: to be verified against the file; the author's own render of `slide27_8afc6953.png` showed the servo on the tracker stand.]

---

# expert-continuity-auditor

### Verdict: MINOR

- **[MINOR] [L-5]** "Tower Pro SG92R" (two words) at `:119`, `:136` drifts from the part's naming: TowerPro (the maker, Petra's answer, Lab 8). Fix: "TowerPro SG92R" throughout.
- **[MINOR] [P-1]** `subsec-servo-ref-map` states C's integer promotion to a 32-bit `int` as settled fact; no earlier chapter teaches it, and the fact is not needed to complete `act-day15-map`. Fix: keep the multiply-before-divide rule in the Reference and trim the promotion sentence there (it stays in `inst-day15-map`), or mark it as a C-language fact.

Per section: the reading is self-contained and B-2 holds; Parts 1–2 recall the motor chapter correctly; Part 3 frames the search as a second design and opens `tim.c` before Part 4 reads it; Part 4's TIM16 recall (position 21) and the moved-limit design change are correct; Part 5's `adc.c`/`adc.h` from Lab 5 is established (`ch-i2c.ptx:3746`), the pot stays on A0; Part 6 leaks no battery/9 V/7805; the Reference resolves; Day 15x's and Lab 8 §3's needs are delivered.

---

# learner-firstgen-novice

### Verdict: MAJOR

- **[MAJOR] P-4, P-7** Part 4's map paragraph does the scaling formula, the worked mini-example and the integer-truncation rule in one block with no picture, then the activity asks for the transfer. Fix: split into two paragraphs; the truncation rule gets a two-line before/after snippet (`100 + (x/10)*100` vs `100 + x*100/10`, values at x = 5). DISPLACES: the "Here is the whole program as you download it" connective sentence (B-16).
- **[MAJOR] P-2, B-5** the crucial build has no student-visible troubleshooting; the ladder is instructor-only. Fix: promote the three symptom→cause lines into the task text as a self-check list. DISPLACES: the closing callback paragraph ("Tomorrow we'll connect… the reading for Thursday is the photocell"), which repeats the chapter introduction.
- **[MINOR] P-1, B-11b** the reading names "dead band width of 1 µs" without saying what it means, and the term meant something else in the motor chapter (a range of duty-cycle counts, `ch-motors.ptx:3431`). Fix: one clause, "the smallest change in pulse width the servo's controller can actually notice". DISPLACES: "2.5 kgf-cm is not a huge force, but remember it is a tiny motor."
- **[MINOR] S-25** "as a question for those who finished early" at the top of Part 3 is classroom status in student prose. Fix: "On Day 11x we worked out what the prescaler and auto-reload would have to be for a 50 Hz PWM: …" (same length).

What works: a figure at every abstract step of the reading; the two captures as self-verification; the two scaffolded tables; the ADC-name fallback in the build.

---

# learner-python-intro

### Verdict: MAJOR

- **[MAJOR] P-1, B-6, B-10** integer promotion is asserted in the visible Reference ("computed in `int`, which is 32 bits") and derived with numbers only in the stripped `inst-day15-map`. Fix: move the worked numbers (4095 × 200 = 819,000, larger than `int16_t` holds, fits 32-bit `int`) into `subsec-servo-ref-map` and cut the terse restatement.
- **[MAJOR] P-1, B-6** the template declares `pot_value` and `pwm_value` as `int16_t` and passes them to `uint16_t` parameters with no comment; the course chose `uint16_t` for `adc_read()` for a reason. Fix proposed: declare them `uint16_t`. [Session note: the template is Petra's file (B-6); this becomes a question for her, not an edit.]
- **[MAJOR] P-1, P-14** blank `#define` lines are new in the book; left unfilled they compile to nothing and the build fails with a syntax error at the call site, which the checkpoint ladder never mentions. Fix: one sentence folded into the ladder's first bullet.
- **[MINOR] P-8, B-17** `TIM16->SR &= ~TIM_SR_UIF;` in the template contradicts Day 8's "clear status flags by assigning a mask". Fix proposed: `TIM16->SR = ~TIM_SR_UIF;`. [Session note: her file; flagged to Petra.]
- **[MINOR] P-1, B-17** the stretch asks students to write `milliseconds() - last_sample >= SAMPLE_MS`, an idiom whose wraparound reasoning is never taught. Fix: a clause in `ch-motors.ptx` where the idiom first appears, xref'd from the stretch.

---

# expert-cognitive-load

### Verdict: MAJOR

Paragraph count: Day 15's in-class section is about 26 body paragraphs against Day 11's about 25; length is at parity, the problem is concentration and repetition.

Census: the lead-colour/power mapping is stated in full four times (reading, `fig-servo-powering` caption, the Part 6 paragraph after it, `fig-servo-leads` caption); PWM mode 1's CCR1 semantics three times before the Reference (Part 3 body, `inst-day15-fill-in`, the `tim14_pwm_set()` comment); the pulse convention, "holds while pulses keep coming", the dead band, T0 and the integer map are correctly staged pairs (teach once, Reference once).

- **[MAJOR] [B-8]** Part 6: cut the body paragraph's restatement of the colours to its one new clause (unplug everything; USB first, then the adapter) and cut `fig-servo-leads`' caption to what is new in that figure (the arm on the horn). Removes words.
- **[MAJOR] [B-8, P-7]** trim `inst-day15-fill-in`'s re-explanation of PWM mode 1 to the arithmetic result (300 in CCR1, 1.5 ms). Removes words.
- **[MAJOR] [P-7, P-2]** `act-day15-fill-in` is the working-memory peak, right before the build: five names plus the `tim.c` cross-check in one beat. Fix: split into two beats inside the same 6 minutes: the four `#define` values with their own reveal, then the `tim.c` check as its own beat. Resequencing, no added content.
- **[MINOR] [P-7]** Part 4's TIM16 paragraph re-enumerates Day 8's six steps in prose that the printed code already carries. Fix: point at Day 8 and let the code carry the steps. A cut.

Not flagged on purpose: the round-number map before the real one; the Day 11x callback before the design change; the dead-band motivate→teach→reference arc.

---

# expert-class-logistics

### Verdict: MINOR

Running clock: Parts 1–4 fit as budgeted; the slip is Part 5's 18-minute build/run/capture beat (minute 75–93), and by minute 98 a fraction of the room is still inside `act-day15-build`. Part 6 and the close are lecture and reach everyone; Day 15x's Part 2 is the designed recovery.

- **[MAJOR] [P-2, P-14]** `inst-day15-template-complete` / `inst-day15-checkpoint` ask the same instructor/LF pool to triage the ladder and to sign off every finished build in the same block, and it is unclear whether the demo gates the stretch. Fix (instructor-only): a student may move to the stretch on matching the reference captures themselves; instructor/LF time is for the ladder. Confirm the LF count with Petra (B-11c).
- **[MINOR] [S-8]** the Part 5 header comment lists "checkpoint" as the final 5-minute beat while the instructor prose says minute 78, mid-build. Fix: reword the comment so the two agree.
- **[MINOR] [S-8]** `task-day15-fill-timc` opens `tim.c` mid-derivation, 15 minutes before it is handed out. Fix: move that sub-question to Part 4, which already reads `tim.c`.
- OK: the ladder is cheapest-first and matches real symptoms; the build's task order executes; "unplug everything" is stated today, before anything is powered.

---

# learner-ai-reliant

### Verdict: MAJOR

- **[MAJOR] [P-14, P-17]** the prescaler table, the resolution table, the fill-in and the map are closed-form arithmetic on constants identical for every student; an AI reproduces the `<instructor>` blocks verbatim, and the demo gate validates the code, not the derivation. Fix (zero net words): reword the instructor demo-gate sentence to "demonstrate the sweeping pulse and say, without looking at your table, why you picked your prescaler and what CCR1 value `SERVO_MID` produces."
- **[MINOR] [P-14]** the three Part 1–2 commits are generic mechanism questions an AI answers in full; mitigated by the in-class, peer-compared format. No fix required now.
- **[MINOR] [P-6, B-3]** her two captures sit in the same task as the student's own capture; nothing forces the comparison to be against their own prediction. Fix: one clause on `task-day15-build-run`: "check them against the prediction you wrote down, not against the figures below."
- Protected list clean; `act-day15-tim14-pins` is well anchored.

---

# checker-arc-fidelity

### Verdict: MINOR

Every one of her 31 slides reaches the chapter as a reading paragraph, a Part, a recorded xref or a recorded drop; §1a is reused verbatim; the manifest was followed except one image reassignment; the budgets sum to 110 and each Part equals its beats. Her-slide → where-it-lands table in the agent's report (slides 5–29 all placed; 2, 3, 31 dropped and recorded; 30 is Day 15x's marker).

1. **[MINOR] B-9** the template has five blank `#define` lines; the chapter says "four" at `:711`, `:942`, `:991`, and "five blanks" at `:841` where the file has six. Fix: word swaps.
2. **[MINOR] B-8a** the section comment records the clock and cut order but not what delivery 2 owes: the `refPage` recall slides for `subsec-day11-actuator-chain` (Part 1), `fig-tim14-block-full` (Part 3), `subsec-day11x-driver` and `fig-tim14-register-map` (Part 4). Fix: an OWES line in the comment.
3. **[MINOR]** `fig-servo-leads` places `slide27_8afc6953.png`, the Adafruit product shot (cable on grey, orange third lead), under a caption written for the stand-and-arm photo; the manifest's colour-reference photo is `slide09_a204d4b1.jpg` (2048×1536), unused. Also `fig-servo-sg92r` says "cross-shaped horn" where the photo shows a two-arm horn. Fix: place `slide09_a204d4b1.jpg` (keeps the caption and the yellow lead) and drop the horn's shape.
4. **[MINOR]** her knob re-seat instruction ("Remove and reattach the knob, if necessary, so that it is at the midway position") is reduced to "leave the knob there". Fix: restore her sentence in `task-day15-build-center`.
5. **[MINOR]** Part 5's beat split (5+5+7+5+18+5) takes five minutes off the completion and capture beats to fund a wiring beat; the plan had 5+10+5+20+5. Fix: `5 + 8 + 4 + 5 + 18 + 5` or the plan's split (comment only).
6. **[MINOR]** `inst-day15-tim14-pins` names three pins; Table 12 also lists PF0 (the oscillator pin, not on a header). Fix: one clause.
7. **[MINOR]** the current draw is stated three ways (reading "a few hundred milliamps", Part 6 "250 mA", Reference "no datasheet gives it"). Fix: her number once, in Part 6; the reading carries the hedge.

Ordering note: her slide 14 (Table 12) is in Part 2, ahead of the prescaler search, per the plan; `plans/day15.md` says "no ordering change" and should record this one.

---

# expert-rigor-hawk

### Verdict: MAJOR

Verified true: T0 is exactly the integer step of CCR1 in PWM mode 1; the three resolution rows; the map arithmetic and promotion; multiply-before-divide; the 5% and 0.3 s reading-question arithmetic; the brown-out paragraph (hers); "holds while pulses keep coming" (hers, right strength); `tim.c` matches the Day 11x convention; the stretch is genuine; no lookup-as-activity.

- **[MAJOR] B-6/S-19** `inst-day15-resolution-table`: "0.5 µs is below the servo's 1 µs dead band, so the controller would not even notice every step" is ambiguous; the stretch answer has the precise form. Fix: "so the controller acts on every second one at best".
- **[MAJOR] L-6/B-6** the Reference formula `PSC × (ARR+1) = 12 MHz × Tp` uses PSC for the prescale factor while the next sentence uses PSC for the register (value − 1). Fix: `prescaleFactor × (ARR + 1) = 12 MHz × Tp`.
- **[MAJOR] B-11c** "A plastic gear train does not hold a position to a tenth of a degree" is an invented absolute (twice). Fix: a comparative the chapter can support ("has backlash well beyond what 0.09° would buy"), or ask Petra for a figure.
- **[MINOR] S-19** Part 3 uses 180°/steps as settled where the reading called ±90° a convention. Fix: "using the ±90° convention" clause; cut one of the two "Please do not try to turn them that far" repeats to stay net zero.

---

# learner-weak-circuits

### Verdict: BLOCKER

- **[BLOCKER] P-4, B-11c** `fig-servo-powering`: a red and a black wire enter from the top edge (from the Nucleo's 3V3 and GND pins, cropped) and run to the rail, and the caption never says what they are, beside the rule that the servo's power never touches the Nucleo's 3.3 V. Fix: say in the caption what the pair is (the Nucleo's 3.3 V and GND to the breadboard rails, the pot's supply, tomorrow), or recrop.
- **[MAJOR] P-1** "the board and the Nucleo share a ground" is stated twice as a bare fact and never as a reasoned rule (the pulse from PA7 is measured against the Nucleo's 0 V; without the shared ground the servo has no reference for it). Fix: one sentence, once, in the reading, xref'd from Part 6.
- **[MAJOR] P-4, P-7** T0 = Tp/(ARR + 1) is given only symbolically before the resolution table; no student-visible sentence plugs in a number. Fix: one throwaway example on a non-answer row (prescaler 1: 240,000 counts, T0 would be 20 ms/240,000).
- **[MAJOR] P-4, P-7** `task-day15-fill-ccr1` needs the ms → µs → counts conversion, modeled only in the stripped answer. Fix: one worked non-answer example (prescaler 240, T0 = 20 µs: 1 ms = 1000 µs ÷ 20 µs = 50 counts).
- **[MINOR] P-4, P-7** the multiply-before-divide paragraph never plugs in a number. Fix: one clause, x = 5: wrong order 100, right order 150.
- **[MINOR]** `fig-servo-leads` caption does not match the placed image (see arc-fidelity 3).

---

# checker-technical-accuracy (whole chapter, self-contradiction read)

### Verdict: BLOCKER

1. **[BLOCKER]** "four `#define` lines" at `:539`, `:653`, `:711`, `:942`, `:992` against five blank `#define`s in the template, the fill-in, both instructor listings and the starter; "five blanks" at `:841` where the listing has six. Fix: "five `#define` lines and the map line" throughout; `:841` "six blanks". Say `SERVO_MID` is defined but not used by the loop.
2. **[MAJOR]** `inst-day15-resolution-table` rejects prescaler 240 ("coarser than we want") and approves it in the next sentence ("240 would be fine too", hers). Fix: drop the rejection; contrast it as four times coarser but still fine.
3. **[MAJOR]** the Reference formula `PSC × (ARR+1)` with PSC named as the register three lines later (59 × 4000 ≠ 240,000). Fix: `prescaleFactor × (ARR + 1) = 12 MHz × Tp`.
4. **[MAJOR]** "the program limits every value … before writing CCR1" (Reference `:1181`, `inst-day15-map`) vs `tim14_pa7_pwm_init()` writing `CCR1 = 0`, which stands for the first 500 ms. Fix: "every value it computes"; the initialization parks CCR1 at 0, no pulse, so the servo is unpowered until the first reading.
5. **[MAJOR]** the printed ISR's `TIM16->SR &= ~TIM_SR_UIF;` under a "Day 8's recipe" banner, where Day 8 taught assigning the mask (`ch-timers-interrupts.ptx:1108`, `:1944-1950`). Code is Petra's. Fix: one sentence beside the handler (UIF is rc_w0, so it is harmless here; Day 8's assignment is still the habit), or ask Petra whether the starter should change.
6. **[MAJOR]** "As long as the same pulse is applied to the motor" (her slide 10 note) vs "rather than sending it to the motor directly" four lines later. Fix: "As long as the same pulse keeps arriving at the servo".
7. **[MAJOR]** the reading's "Please do not try to turn a servo by hand" vs Part 1's push-on-the-horn activity. Fix: `:130` → "do not try to force a servo's horn around by hand"; Part 1 keeps "never all the way around".
8. **[MAJOR]** Reference map rule: "x runs from 0 to N" then "never quite reaches b". Fix: "0 to N − 1", and a clause in Part 4's warm-up that the pot stops one step short of N.
9. **[MINOR]** current draw four ways (few hundred mA / hundreds / 250 mA / no datasheet); the only sourced figure is her 250 mA. Fix: "about 250 mA while moving, and much more when stalled" everywhere; correct the authoring comment.
10. **[MINOR]** 4.8 V / 4 to 6 V / the regulator's 5 V never joined. Fix: one clause in `subsec-servo-ours`.
11. **[MINOR]** `rq-servo-speed` assumes 180° of travel where the reading calls it hypothetical. Fix: "the datasheet's nominal 180° of travel".
12. **[MINOR]** `SERVO_MID` discussed as though the program used it. Fix: "If you called `tim14_pwm_set(SERVO_MID)`…", and say what `SERVO_MID` is for.
13. **[MINOR]** "a pulse width, SERVO_MIN to SERVO_MAX" vs "never quite reaches SERVO_MAX". Fix: "just about spanning".
14. **[MINOR]** "resolution" is a time in `ch-motors` and a count here (her wording). Fix: "counted in steps rather than in microseconds", and xref `subsec-day11x-resolution`.
15. **[MINOR]** the TIM16 prose recipe omits "clear the counter", which the listing does.
16. **[MINOR]** the introduction promises the second day that the marker defers; flagged so it is not lost.
17. **[MINOR]** the printed comment "Do not forget the volatile!" differs from the download's "Don't forget the "volatile"!" (B-15 reword; harmless).

Xref check: all 22 targets resolve; no duplicate ids. B1 check on the lead rule: both instances classify correctly.

---

# checker-voice (whole chapter)

### Verdict: MAJOR

Register: mostly hers, more of it literally hers than any draft reviewed (Parts 1, 2, 3, 6 reveals and tables verbatim from slides 6, 8, 10, 11/12, 15, 19, 28). Left: one S-23 self-justification with an aphorism, and reading/in-class duplication she strikes by hand.

- **[MAJOR] S-23** `:921-924` "…on purpose: a wrong number shows up on the screen, not in the gear train." → hers (slide 20 note): "We'll verify the pulse on the oscilloscope before the servo is ever attached: that is your safety check, so that you won't break the servo."
- **[MAJOR]** Part 6's first three sentences repeat the reading word for word. → "The reading said the servo is powered from a separate supply and never from the Nucleo. Here is the number behind that: the servo may draw 250 mA while moving, and much more if it is stalled, while the USB power from your laptop is limited to 500 mA. High current draw by the servo can starve the Nucleo, causing it to brown out and reset itself." (shorter)
- **[MAJOR]** lead colours told three times in Part 6, five in the chapter. → Part 6 prose: "On the SG92R in your kit the three leads are brown, red and yellow, and `fig-servo-powering` shows where each one goes. Unplug everything…"; `fig-servo-leads` caption loses its colour list.
- **[MAJOR] S-23/S-24** "as a question for those who finished early" → delete the clause.
- **[MAJOR]** `act-day15-map`'s statement restates the paragraph before it → "Write the expression that maps `pot_value` onto `pwm_value`, using the names in the template (`MAXADC` is 4096). Then check it…"; and `:803` "The last blank is the map from … onto …" (L-13).
- **[MAJOR]** "Which of these are usable?" three times in fifty lines → delete from the prose; the activity title carries it.
- **[MINOR] L-13** "Here is what the header promises:" → "Here is the header, `tim.h`, and the three functions it declares:".
- **[MINOR] S-18** "Part 4: The Program, Read Before It Is Built" → "Part 4: Reading the Program".
- **[MINOR] S-26** "Part 2: How We Command It" → "…the Servo"; "Part 3: Designing the Timer, a Second Time" → "Designing the Timer for the Servo's Pulse"; "Part 5: Design Exercise: The Pulse…" → "Design Exercise, Verifying the Pulse on the Oscilloscope".
- **[MINOR] S-21** delete "That move is a design decision worth naming."
- **[MINOR]** "Which timer, and which alternate function, is a datasheet lookup." → "We look up which timer drives a given pin, and which alternate function to select, in the datasheet."
- **[MINOR] S-28** "Two things bear on the choice:" → "Keep in mind…"; "the program's four numbers follow" → "Now that we have chosen a row, we can work out the numbers the program needs."; "with its five blanks" → drop the count.
- **[MINOR]** Part 3's recall paragraph states the CCR1 mechanism which her slide-19 paragraph states in full later → drop the CCR1 clause from the recall.
- **[MINOR]** Part 1 opening: "The key fact we need going forward is from that chapter: the torque…"; the feedback loop paragraph before `act-day15-push` → one pointer sentence.
- **[MINOR]** the reading's "the same pin that carried the motor's PWM" pre-answers `task-day15-pins-choose` → drop the clause.
- **[MINOR]** Reference "buys nothing" → her "is more finely grained than is worth doing".
- **[MINOR] S-27** her stall-torque definition (slide 9 note: "the torque the servo puts out if you try to resist its turning") is missing; write kgf-cm, not kg-cm. DISPLACES: one of the three "do not turn it by hand" repeats.
- **[MINOR] B-9a** expand NVIC and CNC on first use in this chapter.
- **[MINOR] L-5** "A0 (PA0)" once in the build task.
- **[MINOR] L-12** "the reading for Thursday is the photocell" → "Thursday's reading is about the photocell."
- **[MINOR] S-26** `rq-servo-speed` feedback: "when a program has to wait for the arm to arrive before it takes its next reading."
- **[MINOR] L-16** instructor "Then the two we did not choose." → "Then we'll look at…" (optional).

Sweeps: 16 unit openings, 0 failing; 3 epigram titles; 0 weekday actors; "we" 16 of 23 class-work sentences; NVIC and CNC unexpanded; no time budgets or Part pointers in student text; no em dashes; no B-12.

Reuse table: reveals, tables, fill-in, project setup, captures, brown-out and Reference intro all hers verbatim; paraphrased where hers should stand: the stall-torque definition, the knob re-seat sentence, "more finely grained than is worth doing". Deliberately not used, with reasons visible: Williams, battery/9 V/7805, slide 31, slide 14 as an activity, 0–1023/Scopy, slide 8's disturbance sentence (withheld for `act-day15-push`).

For Petra: which current figure; her three stall-torque unit conversions; whether Part 5 carries a plain symptom list; L-13 inside instructor blocks.

---

# checker-technical-accuracy (Parts 3–4)

### Verdict: BLOCKER

All five listings match the real files line for line; every number in both tables, the fill-in and the map is correct. The defects are in the arguments and counts around the code.

- **[BLOCKER] B-6/B1/B3** "four `#define` lines" / "four numbers" / "five blanks" against five blank defines and six blanks. Fix: five / six, also in `check_starters.py`'s comment.
- **[BLOCKER] L-6/B4** "the oscillator on the STM32C031C6 runs at ____ MHz" / "The oscillator runs at 12 MHz": the oscillator is HSI48 at 48 MHz; 12 MHz is the system clock after HSIDIV's reset divide-by-four (RM0490 §5.4.1; `ch-timers-interrupts.ptx:212-214`, `ch-i2c.ptx:3999`). Fix: "the STM32C031C6's system clock".
- **[MAJOR] B-6/B2** "set the auto-reload value to the number of milliseconds" vs `ARR = milliseconds - 1`. Fix: "one below the number of milliseconds".
- **[MAJOR] B4** "position 21 … so the handler is `TIM16_IRQHandler()`" is the construction Day 8 forbids (`ch-timers-interrupts.ptx:1240-1246`). Fix: "and the startup file's name for that slot is `TIM16_IRQHandler()`".
- **[MAJOR] B4** the printed ISR's `&= ~TIM_SR_UIF` unremarked under a Day 8 banner. Fix: one clause beside the handler; Day 8's assignment is what to write yourself. DISPLACES: the "design decision worth naming" sentence and its final clause.
- **[MINOR] B3** first table's header "Auto-reload (must fit)" over values that are ARR + 1. Fix: "Counts for 20 ms (must fit)".
- **[MINOR] B1** "HIGH while the counter is between 0 and CCR1" reads as 301 counts. Fix: "below the value stored in `TIM14_CCR1`".
- **[MINOR] B2** "`tim14_pa7_pwm_init()` … with two changes" where the init has one and the file two. Fix: "The driver is the one we read on Day 11x with two changes."
- **[MINOR] B2** "much narrower than anything the timer can produce" → "than the range the timer can produce".
- **[MINOR] B-6** the TIM16 recipe omits "clear the counter", and Day 8's init also brackets with `__disable_irq()`. Fix: insert the step; "with the peripheral's name changed" → "on a different timer".
- **[MINOR] B1** the toy map divides by the largest x (10) while the answer divides by the number of readings (4096). Fix: a parenthetical "(the divisor is the number of steps, not the largest x)", displaced from "In C, with integers," and "of the same problem".
- **[MINOR] B3** "is the angle one step moves the horn" → "is the nominal angle per step" (also in the Reference).
- **[MINOR] L-6** "exactly 20 ms" → drop "exactly".
- **[MINOR] B-11c** `tim.c` "is on Canvas and you will want it open" → "download it now and keep it open".

Verified: the 16-bit ARR ceiling, CK_CNT = f/(PSC+1), PWM mode 1 and CC1P = 0 so active is HIGH, TIM16 §18 p. 493, vector 21, TIM16 UIF rc_w0; int promotion on AAPCS; the rebuilt figure's labels; all xrefs; P-10 answers present; no em dashes.

---

# checker-technical-accuracy (Parts 5–6 + Reference)

### Verdict: BLOCKER

- **[BLOCKER] B-11a** `fig-servo-leads` caption vs `slide27_8afc6953.png` (the Adafruit cable shot: no stand, no arm, no horn, cable leaving at the left). Lead colours in the photo check out (brown / red / amber). Fix: place the stand photo or recaption.
- **[BLOCKER] B-2** stretch answer "Half of those steps are below the 1 µs dead band": every 0.5 µs step is below it; one step is half the dead band. Fix: "Each step is half the dead band, so the servo cannot resolve a single step and the controller acts on every second one at best."
- **[MAJOR] B-6** "four `#define` lines" at `:942`, `:992` (five in the file). Fix: five.
- **[MAJOR] P-3/B3** the "finer" stretch task re-asks what Part 3 already answered (the prescaler-6 row; the prescaler-1 limit). Replace with something additional, e.g. how many ADC codes correspond to one timer count (4096 onto 200) and what that means for how the knob feels.
- **[MAJOR] B4** "no interrupt is needed" for the `milliseconds()` stretch contradicts Day 12 (SysTick is interrupt based). Fix: "no interrupt of your own is needed".
- **[MAJOR] L-6** "The servo runs on 4 to 6 V" (her slide 28); the sheets say 4.8 V and 4.8–6 V. Fix: "4.8 to 6 V" (also in the reading).
- **[MAJOR] B-11a** `fig-servo-powering` contains the Nucleo's 3V3 red wire to the + rail, unmentioned beside "not from the Nucleo's 3.3 V pin". Fix: "The red wire on the far rail is the Nucleo's 3.3 V, for tomorrow's potentiometer; nothing on the servo touches it." DISPLACES: "the center one".
- **[MINOR]** the Fritzing's servo ground lead is drawn black and its legend says Red/Orange; a caption clause is optional (flagged to Petra already).
- **[MINOR]** `fig-servo-scope-2ms` caption: "the period, 19.93 ms, has not moved" quotes a different number from the 19.91 ms it says has not moved. Fix: "the period has not moved: 19.93 ms, still 20 ms within the cursor's precision."
- **[MINOR]** Reference `PSC × (ARR + 1)` → use the prescale factor's name.
- **[MINOR]** "The whole of `tim.c`" → add "with its comments shortened".
- **[MINOR]** "the one from Day 8 with the peripheral's name changed" → "…and the period as a parameter" (Day 8 also brackets with `__disable_irq()`).
- **[MINOR] B-11c** "The servo stays in its bag until tomorrow" is unsourced → "stays unplugged".
- **[MINOR] B2** 250 mA is half the 500 mA budget; the starvation argument needs the stall case and the board's own draw. Fix: "Your laptop's USB port supplies at most 500 mA for the whole board…".
- **[MINOR]** "turn this into a solar tracker" on Thursday overstates Q7's answer → "and start on the solar tracker".
- **[MINOR]** instructor "the shape Lab 8's controller wants" → "the shape Lab 8 asks for".
- **[MINOR] S-8** the Part 5 beat list's checkpoint position vs "minute 78"; "Nothing in Part 6 is lost … at minute 100" leaves 10 minutes for 12. Fix: "Part 6's first beat and the close still fit at minute 100."

Verified: `tim.c` and the template listings identical in code; captions' cursor numbers, trigger and time base read off the images; `fig-servo-powering`'s three servo leads end where the caption says; AD2 conventions; the Reference's spec numbers; the map arithmetic; the protected list clean; xrefs, P-10, check_rules and image_ratios clean. Unverified: 250 mA (her slide 28; question 1b open).

---

# checker-figure-claims

### Verdict: BLOCKER

All ten figures rendered and opened; check_rules and image_ratios clean; the SVG's width/height match its viewBox.

- **[BLOCKER] fig-servo-leads** the placed file is the Adafruit cable shot (bare spline, no horn, no stand, no arm; cable leaves at the left). The colour half of the caption is right (brown / red / yellow-amber). Fix: recaption to the picture, or place the stand photo (the reviewer notes Day 16's cup photos are close-ups, not a full view; the author's own render found the full stand-and-arm view in `slide09_a204d4b1.jpg`).
- **[MAJOR] fig-servo-powering** "The servo's red lead, the center one" is drawn as an orange jumper for the whole visible run, and there IS a literal red wire in the frame that goes elsewhere (the + rail, off the top). Fix: name the drawing's colour: "The servo's centre lead, its power lead, is the orange jumper; it goes to the regulator board's 5V pin."
- **[MAJOR] fig-servo-powering** the Nucleo's GND (and 3V3) wires run off the top edge; the shared ground's Nucleo half is not visible, and the unused +-rail feed is unexplained on a day with no pot. Fix: ask Petra for a re-export with the frame extended to the POWER header, and whether the 3.3 V feed belongs in this version.
- **[MINOR] fig-servo-scope-2ms** "the period, 19.93 ms, has not moved" quotes a different number from 19.91. Fix: "the period is still 20 ms to within the cursors' placement."
- **[MINOR] fig-servo-cutaway** `:406` quotes "60 rpm, high torque" as if verbatim; the picture has two bullets. Fix: drop the quotation marks.
- **[MINOR] fig-servo-pulses** stray second parenthesis in "full CCW))" in her art; the image asserts CW/CCW directions the caption does not. Fix: ask Petra about the glyph; a clause "the angles and directions are the convention".

Verified exact: the 1 ms capture's numbers; "almost every pin" (20 of 22 carry PWM; PA12 and PB10 do not); the rebuilt resolution figure clean; the cross-shaped horn; the feedback diagram's signs.

Legibility: `fig-servo-powering`'s pin labels (0.62 % of width) and the scope captures' cursor digits (0.73 %) fail at every delivery size and are the numbers the captions quote; fix upstream (a higher-resolution export or a zoomed header/board view; a tighter capture or an agreed crop keeping the time base, trigger, the three cursors and the two ΔX rows). `fig-servo-pwm-pins` is adequate for the book, short of projection (crop for the deck). `fig-servo-pulses` passes in the book, marginal projected: raise to 95 %. The rest pass.

Carry into the delivery-2 fit check: the captures want image-dominant slides; the powering figure is squarer than the stage; the pins figure's legend and tags are at opposite edges; the resolution figure is 3.19:1 and will letterbox.

---

# checker-technical-accuracy (reading + Parts 1–2)

### Verdict: BLOCKER

- **[BLOCKER] L-6/B-6/P-12** `inst-day15-tim14-pins`: Table 12 lists TIM14_CH1 on five pins (PF0, PA4, PA7, PB1, PA8), not three, and Table 12 carries no AF numbers; those are in Tables 13–15 and 20 (PA4/PA7 AF4, PA8 AF13, PB1 AF0, PF0 AF2). Neither PA8 nor PF0 reaches the Arduino header. Fix: send the activity to Table 12 and the port mapping tables (pp. 36–39); the answer lists all five with the right AF. Same mis-attribution in `ch-motors.ptx:1130` (out of scope).
- **[MAJOR] B-3** `rq-servo-leads` distractor feedback "Putting the signal there would put 5 V onto a pin" is unsourced. Fix: "Wiring the pulse pin to it puts a 3.3 V logic output on the servo's supply rail and ties the 5 V supply to the signal lead instead."
- **[MAJOR] B-1** `fig-servo-sg92r` (the stock shot) has black / red / white leads while the text says the kit's are brown / red / yellow. Fix: place the kit photo, or a caption caveat that the stock photo's colours differ and the rule is about position.
- **[MAJOR] B-3** reading "Please do not try to turn a servo by hand" vs Part 1's push; her note is "…by hand all that much". Fix: restore her hedge; Part 1 is a light push, never forcing the shaft round.
- **[MAJOR] B-3, ground truth §7.7** `rq-servo-width` feedback "The rest of the 20 ms period carries no information" is the condemned framing and contradicts "you have to keep sending it". Fix: "The width is the command, and the pulses have to keep coming."
- **[MINOR] L-6** "4 to 6 V" → "4.8 to 6 V".
- **[MINOR]** "shows what is inside your servo" for a brass-geared generic cutaway → "inside a hobby servomotor like yours".
- **[MINOR]** `rq-servo-speed` "roughly 180°" → "its nominal 180° of travel".
- **[MINOR] L-6** "2.5 kg-cm … which the sheet writes as kg/cm" → "2.5 kgf-cm".
- **[MINOR] B-11c** "On every hobby servo" overreaches Lab 8's note → "On a hobby servo".
- **[MINOR]** current draw stated two ways (few hundred / 250 mA).
- **[MINOR] B-11a** the doubled parenthesis in her pulse art.
- **[MINOR] L-15** "because the controller does not notice it" → "produces no change in the commanded position".
- **[MINOR]** "all we supply from the outside is one signal" vs the power lead → "all we supply as a command".

Verified: both sheets' figures; every reading-question answer's arithmetic; the cutaway, feedback, pulse and pinout figures against their captions; Table 12 on page 30; A2 = PA4, A3 = PB1; the reveals in prose as derivations (P-10). Latent: the cutaway's "60 rpm" vs the SG92R's 100 rpm (0.1 s/60°), attributed to the picture, not a finding. Unverified: the current figure (1b open); "You'll feel this tomorrow" needs the Day 15x plan to carry the beat; the 3.3 V signal level against the SG90 sheet's "4.8 V signal".

---

# committee-synthesizer — the consolidated list

# Day 15 Gate 2 — consolidated change list for `source/ch-servos.ptx`

## Verdict

Not ready for Petra, but close: the draft's register is more literally hers than any chapter reviewed, the arc is complete against her 31 slides, and every listing matches the real files line for line. The defects are almost entirely in the **arguments and counts around the code** — a template with five blank `#define`s described as four in five places, the STM32C031C6's oscillator confused with its system clock, an instructor reveal that rejects prescaler 240 and approves it one sentence later, a dead-band claim the chapter's own stretch answer refutes, and `fig-servo-leads` captioned for a photograph that is not the one placed. The single biggest problem is that **the only troubleshooting for the crucial step lives inside an `<instructor>` block**, so a student whose pulse does not appear at minute 78 has a page with no branch to work from. Three reviewers found that independently, one as a BLOCKER against P-2.

---

## (a) Rulings on the conflicts

**1. Rigor vs. accessibility — the dead band and the gear train against the worked examples.** These do not conflict on content, only on length. Every rigor-hawk fix is a correction at equal or shorter length inside an `<instructor>` block or the Reference (depth at the top and in lookup material, per P-3 and B-10); every learner fix is one worked number in student prose below the crucial step (scaffold, per P-2). **Take both.** The three added sentences (T0 with a number in it, ms → counts, multiply-before-divide with x = 5) are funded by the repetition census, and every one of them uses a **row the class has already rejected** — prescaler 1 and prescaler 240 — so nothing is removed from the middle and no answer is given away. Nothing here needed escalating.

**2. The student-visible symptom list (anxious learner, novice) — GRANTED.** P-2 requires the crucial step to be scaffolded densely enough that the slowest student reaches it, and a triage ladder that is stripped from the student book scaffolds nobody. S-25 bans *classroom management* — spare hardware, who to ask, how long a step takes — not diagnosis. The book already carries exactly this form in a passed chapter: `ch-adc.ptx:1140-1163`, *"Nothing printed? Work down this list… since each symptom has a distinct cause"*, four symptom → where-to-look items. Copy that markup. The `<instructor>` block keeps the causes and the fixes.

**3. The constants "lifeline" in student prose (anxious learner) — REFUSED, with a substitute.** P-10 makes an activity's solution instructor-only *without exceptions*, and Lab 8 §3 repeats this activity, so printing 60/4000/200/300/400 hands Lab 8 away with it. But P-2's lifeline precedent is instructive: Petra's own instruction on Day 11x turned "We already worked out what CC1E does" into "…(it lets the channel's output reach the pin)" — a **conceptual** recap, not the numeric answer. So `task-day15-build-blanks` names what each of the five blanks *is* (the prescaler factor, the counter's top value, the three compare values for 1 ms, 1.5 ms and 2 ms) and gives no number. The risk the anxious learner names — walking into a 45-minute build on a wrong constant — is answered by the symptom list's "wrong width or period → one of the `#define` values" branch and by the demo gate, not by printing the answers.

**4. `fig-servo-leads` — place `slide09_a204d4b1.jpg`, and cut the colours from the caption.** I rendered both files. `slide27_8afc6953.png` is the Adafruit cable shot: bare spline, no horn, no stand, cable leaving left. `slide09_a204d4b1.jpg` is the SG92R on the grey ENGS 28 stand with the orange ENGS 28 arm bolted to its horn and brown/red/yellow leads leaving **at the right** — exactly what the caption already claims. Placing it makes the caption true; the repetition census then decides that the colour list goes anyway, because Part 6's prose and the reading each name the colours once.

**5. `fig-servo-sg92r` — arc-fidelity is right, `checker-figure-claims` is wrong.** Figure-claims lists "the cross-shaped horn" under *Verified exact*. The image shows a **two-arm** horn, and its lead colours are the manufacturer's, not the kit's. Overruled on the evidence of the file.

**6. The current draw (question 1b) — one wording, everywhere: "about 250 mA while moving, and much more when it is stalled."** Four reports found four different wordings, and her slide 28's 250 mA is the only sourced one. The Reference's "No datasheet gives its current draw" is the sentence that must go: it undercuts a number the book uses three sections earlier to carry the brown-out argument. `checker-arc-fidelity`'s split (her number in Part 6, the hedge in the reading) is recorded as dissent.

**7. `act-day15-fill-in` is overloaded and `tim.c` is opened 15 minutes early — one cause, one fix.** `expert-cognitive-load` wants the working-memory peak split; `expert-class-logistics` wants `task-day15-fill-timc` moved out of a derivation that predates the handout. Both are satisfied by moving that one sub-question into Part 4 and pointing it at `subsec-servo-ref-driver`, where the whole file is already printed. That also deletes the "on Canvas and you will want it open" instruction, which was the premature-download problem itself.

**8. `checker-voice`'s Part titles override B-4.** B-4 requires Part titles to match the plan, so the *plan* is what changes (see section (c)). A draft in the wrong register has been rejected whole before; the plan's table has not.

**9. Petra's code is not edited (B-6).** The template's `int16_t` variables and its `TIM16->SR &= ~TIM_SR_UIF;` stay. The book gets one honest prose clause beside the handler; the code questions go to her.

---

## (b) The change list

### BLOCKER

**1. [B-6, B-9, B3] The `#define` count. Five places plus the checker comment.** Raised by: `checker-technical-accuracy` (whole chapter #1, Parts 3–4, Parts 5–6 — three BLOCKERs), `checker-arc-fidelity` #1, `learner-python-intro`. The template has **five** blank `#define`s (`PWM_PSC_FACTOR`, `PWM_TIMER_MAX`, `SERVO_MIN`, `SERVO_MID`, `SERVO_MAX`) and **six** blanks counting the map line.
- `:539-540` — "The numbers we settle here become the four `#define` lines of the program we'll build afterwards." → "The numbers we settle here become the five `#define` lines of the program we'll build afterwards."
- `:711` — "complete except for the four `#define` lines whose values we just chose and one line in the loop, the map from the potentiometer's reading to a pulse width." → "complete except for the five `#define` lines whose values we just chose and one line in the loop, the map from the potentiometer's reading to a pulse width."
- `:840-842` — "Here is the whole program as you download it, with its five blanks." → "Here is the whole program as you download it." (`checker-voice`: drop the count rather than repair it, S-28. This resolves the `:841` error by deletion.)
- `:942` — "Complete the four `#define` lines with the numbers you chose, and the map line." → see item 6 below, which rewrites this line.
- `:991-992` — "It differs from the download in exactly two places: the four `#define` values and the map line." → "…: the five `#define` values and the map line."
- Add one clause in Part 4, after the driver paragraph: "`SERVO_MID` is not used by the loop; it is the center of the range, and it is the number to send if you want to park the horn in the middle." **DISPLACES:** the deleted sentence in item 12 (`:757-758`).

**2. [L-6, B4] `:665` and `:686` — the oscillator is not 12 MHz.** Raised by: `checker-technical-accuracy` (Parts 3–4, BLOCKER). HSI48 runs at 48 MHz; 12 MHz is the system clock after HSIDIV's reset divide-by-four (RM0490 §5.4.1; the chapter's own `ch-timers-interrupts.ptx:212-214`).
- `:665-666` — "By default the oscillator on the STM32C031C6 runs at ____ MHz." → "By default the STM32C031C6's system clock runs at ____ MHz."
- `:686` — "The oscillator runs at 12 MHz;" → "The system clock runs at 12 MHz;"

**3. [L-6, B-6, P-12] `:504-506` and `:519-524` — Table 12 lists five pins and carries no AF numbers.** Raised by: `checker-technical-accuracy` (reading + Parts 1–2, BLOCKER), `checker-arc-fidelity` #6 (PF0). Table 12 gives TIM14_CH1 on PF0, PA4, PA7, PB1 and PA8; the AF numbers are in the port mapping tables, pages 36–39.
- `:504-506` → "Open the `<url href="external/stm32c031_datasheet.pdf">`STM32C031C6 datasheet`</url>` at Table 12, *Pin assignment and description*, on page 30, and at the alternate-function tables that follow it on pages 36 to 39, which give the AF number for each pin."
- `:519-524` → "Table 12 lists TIM14_CH1 on five pins: PF0, PA4, PA7, PB1 and PA8. The alternate-function tables give the number for each: PA4 and PA7 are AF4, PB1 is AF0, PA8 is AF13, and PF0 is AF2. Neither PA8 nor PF0 reaches the Arduino header — PF0 is an oscillator pin — so the real choice is PA4, PA7 and PB1. PA7 is D11 on the Arduino header, and it is where the motor's PWM was, so the pin configuration in the driver, alternate-function mode and AF4, is exactly the one we read on Day 11x and nothing about the pin setup changes today. PA4 and PB1 are also A2 and A3 on the analog header, which is another reason to leave them alone."

**4. [B-6, S-19, B-11c, B-2] `:637-646` — `inst-day15-resolution-table` contradicts itself, and its dead-band claim is refuted by the chapter's own stretch answer.** Raised by: `expert-rigor-hawk` (two MAJORs), `checker-technical-accuracy` (whole chapter #2; Parts 5–6 BLOCKER on the stretch answer). Three defects in one paragraph: 240 is rejected as "coarser than we want" and approved as "fine too" four lines later; "0.5 µs is below the servo's 1 µs dead band, so the controller would not even notice every step" is ambiguous (every step is below it — one step is half the dead band); "a plastic gear train does not hold a position to a tenth of a degree" is an invented absolute. Replace the second paragraph with:

> "Then the two we did not choose. A prescaler of 6 gives ARR + 1 = 40,000, `<m>T_0</m>` = 0.5 µs, 2000 steps and 0.09° per step. Amazing angular resolution! But this thing is made out of plastic. So, is that worth it? Each step is half the servo's 1 µs dead band, so the servo cannot resolve a single step and the controller acts on every second one at best, and a plastic gear train has backlash well beyond what 0.09° would buy. That is more finely grained than is worth doing. A prescaler of 240 gives ARR + 1 = 1000, `<m>T_0</m>` = 20 µs, 50 steps and 3.6° per step, four times coarser than the row we chose. So a prescaler of 60 is great, and 240 would be fine too."

The same fix lands at `:1085-1087` (see item 20) and `:1204-1205` (item 22).

**5. [B-11a, B-7, P-4] `:1128` — `fig-servo-leads` places the wrong photograph.** Raised by: `checker-figure-claims` (BLOCKER), `checker-technical-accuracy` (Parts 5–6, BLOCKER), `checker-arc-fidelity` #3, `learner-visual`, `learner-weak-circuits` — five reviewers, and the figure-claims and learner-visual findings converge rather than duplicate (one asks whether the picture shows what the caption claims, the other whether it teaches).
- `:1128` — `source="images/Day15-Servos/slide27_8afc6953.png"` → `source="images/Day15-Servos/slide09_a204d4b1.jpg"` (2048×1536, currently unused, and the manifest's colour-reference photo).
- `:1125-1127` caption → "The SG92R on its stand, with the solar tracker's arm bolted to its horn. The three leads leave at the right." (Colour list cut — see item 13.)
- Then run `python3 scripts/image_ratios.py` and commit `assets/book.css`; the aspect ratio changes.

**6. [P-2, P-14, B-5] After `:989` — the crucial step has no student-visible troubleshooting.** Raised by: `learner-anxious-nonhardware` (BLOCKER), `learner-firstgen-novice` (MAJOR), `learner-python-intro` (MAJOR, the blank-`#define` build failure). Insert after `fig-servo-scope-2ms` and before `inst-day15-checkpoint`, in the markup of `ch-adc.ptx:1140-1163`:

```xml
<p>
    <term>Nothing on the screen, or not what you predicted?</term>  Work down
    this list, since each symptom points somewhere different.
</p>
<ol>
    <li><term>The project will not build.</term>  Look at the <c>#define</c>
    lines first: a blank one puts nothing where the compiler expects a number,
    and the error is reported at the line that uses the name rather than at the
    blank itself.  Then check that <c>tim.c</c> and your <c>adc.c</c> are in
    the project, and that there is exactly one <c>main()</c> in it.</li>
    <li><term>No pulse at all.</term>  Wiring or the build.  PA7 is D11, and
    channel 1's ground lead has to be on a GND pin.</li>
    <li><term>A pulse of the wrong width or period.</term>  One of the
    <c>#define</c> values.  <c>PWM_PSC_FACTOR</c> and <c>PWM_TIMER_MAX</c> set
    the period; <c>SERVO_MIN</c> and <c>SERVO_MAX</c> set the width at the two
    ends of the knob.</li>
    <li><term>A pulse that does not move with the knob.</term>  The ADC or the
    map.  Look at <c>pot_value</c> in the printout: if it is not changing, the
    fault is before the map; if it is changing and <c>pwm_value</c> is not, the
    fault is in the map.</li>
</ol>
```

No numbers, no code, no classroom management. `inst-day15-checkpoint` keeps its causes and fixes (the wiper not on A0, the map dividing before it multiplies) and gains one line: "Point a stuck student at the symptom list in the text first; the ladder below is the part that needs you."

Also rewrite `:941-947` to carry the P-2 lifeline: "Complete the five `#define` lines with the numbers you chose in Part 3 — the prescaler factor, the counter's top value, and the three compare values for a 1 ms, a 1.5 ms and a 2 ms pulse — and the map line. If your ADC functions have different names from `pa0_adc_init()`, `start_conversion()` and `adc_read()`, adjust those three calls to your own names."

**DISPLACES:** items 12 and 13 (Part 1's feedback paragraph reduced to a pointer; Part 6's colour restatement and its 4-to-6 V repeat cut).

**7. [P-4, B-11c, B-11a] `:1108-1111` — `fig-servo-powering`'s caption names a colour the drawing does not use and ignores two wires that leave the frame.** Raised by: `learner-weak-circuits` (BLOCKER), `checker-figure-claims` (two MAJORs), `learner-visual` (MAJOR), `checker-technical-accuracy` (Parts 5–6, MAJOR). I rendered it: the servo's power lead is an **orange** jumper for its whole visible run; there is a literal red wire in the frame that goes to the + rail and off the top edge, uncaptioned, on a day with no potentiometer; the legend reads "Red/Orange → power" while the servo's ground lead is drawn black. Her export cannot be edited here, so the **caption is what changes** and the re-export goes to her (escalation E2).

> "How the servo is powered. The servo's center lead, its power lead, is the orange jumper here — the drawing's legend calls it *Red/Orange* because the color varies between servos, and on the kit's SG92R it is red — and it goes to the regulator board's 5V pin. Its darker outer lead goes to the ground rail, which the Nucleo's GND and the board's GND pin share, and its yellow lead carries the pulse from D11 (PA7). The red and black pair leaving the top of the frame is the Nucleo's 3V3 and GND feeding the breadboard's rails, for tomorrow's potentiometer; nothing on the servo touches the 3.3 V rail."

**DISPLACES:** "the center one" at `:1108-1109`.

---

### MAJOR

**8. [B-2, P-1] Three arguments that contradict themselves.** Raised by: `checker-technical-accuracy` (whole chapter #4, #6; reading + Parts 1–2 B-3 with ground truth §7.7).
- `:471` — "As long as the same pulse is applied to the motor, it stays at that one position" → "As long as the same pulse keeps arriving at the servo, it stays at that one position" (four lines later the same paragraph says "rather than sending it to the motor directly").
- `:215-216` — "The controller measures how long the signal stays HIGH in each period and converts that width into its command voltage. The rest of the 20 ms period carries no information." → "The controller measures how long the signal stays HIGH in each period and converts that width into its command voltage. The width is the command, and the pulses have to keep coming." (The struck framing is the one ground truth §7.7 condemns, and it contradicts "you have to keep sending it" at `:474`.)
- `:1181-1183` — "…which is why the program limits every value to `SERVO_MIN` through `SERVO_MAX` before writing `CCR1`." → "…which is why the program limits every value it computes to `SERVO_MIN` through `SERVO_MAX` before writing `CCR1`. The initialization is the one exception: `tim14_pa7_pwm_init()` parks `CCR1` at 0, so for the first half-second, until the first potentiometer reading arrives, there is no pulse at all and the servo is not commanded anywhere." And at `:834-838`, "And `updateServo()` limits the value to… anyway" → "And `updateServo()` limits every value the map computes to `SERVO_MIN` through `SERVO_MAX` before it reaches CCR1, so a slip in the map cannot send the servo past its range. (The initialization is the exception: it parks `CCR1` at 0, so nothing is commanded until the first reading.)"

**9. [B4, B-6, B-17, P-7] `:764-777` — the TIM16 paragraph, rewritten whole.** Raised by: `checker-technical-accuracy` (Parts 3–4, two MAJORs and two MINORs; whole chapter #5, #15), `learner-python-intro` (MINOR P-8/B-17), `expert-cognitive-load` (MINOR P-7 — the paragraph re-enumerates Day 8's six steps that the printed listing already carries). Four defects and one cut, all fixed by one rewrite: "set the auto-reload value to the number of milliseconds" is wrong (`ARR = milliseconds - 1`); "position 21 … so the handler is `TIM16_IRQHandler()`" is the construction Day 8 explicitly forbids (`ch-timers-interrupts.ptx:1240-1246`); the enumeration omits "clear the counter"; the printed ISR's `&= ~TIM_SR_UIF` sits unremarked under a Day 8 banner where Day 8 taught assigning the mask (`ch-timers-interrupts.ptx:1944-1950`).

> "The program reads the potentiometer twice a second, and TIM14 is busy making the pulse, so the timing tick comes from a second timer, TIM16 (Reference Manual §18, *General-purpose timers (TIM16/TIM17)*). `tim16_ms_interrupt_init()` is the periodic-interrupt recipe from Day 8 (`<xref ref="subsec-day8-interrupt-prog"/>`) on a different timer, with the period as a parameter; the listing below is that recipe line for line. TIM16's interrupt is position 21 in the vector table (`<xref ref="subsec-timers-ref-family"/>`), and the startup file's name for that slot is `TIM16_IRQHandler()`. The handler raises `timerFlag`, and the main loop takes one reading and lowers it again. One note on the handler as printed: UIF is an rc_w0 flag, so clearing it with `&= ~TIM_SR_UIF` does work here — but when you write a handler yourself, use Day 8's assignment, which is correct for both polarities."

Removes the six-step enumeration; nothing is lost, because the listing sits directly beneath it (B-6). The code itself stays (B-6) — the starter change is escalation E5.

**10. [B-8, P-7, S-23, S-25] The repetition census — one item, all cuts, and it funds every addition above.** Raised by: `expert-cognitive-load` (three MAJORs and a MINOR), `checker-voice` (three MAJORs), `learner-firstgen-novice`.
- `:542-548`, drop the CCR1 clause from Part 3's recall — "…and starts again, and the pin is HIGH while the counter is below the compare value CCR1. ARR is a 16-bit register…" → "…and starts again. ARR is a 16-bit register…". The CCR1 semantics survive once, at `:648-655`, where the fill-in needs them.
- `:552-553`, delete "Which of these are usable?" from the prose; `act-day15-prescaler-table`'s title and statement carry it (three times in fifty lines).
- `:404-407`, delete the paragraph and fold its content into `act-day15-gears`'s statement, which also drops the false quotation marks (`checker-figure-claims`): "The cutaway (`<xref ref="fig-servo-cutaway"/>`) labels what goes into the gear train high speed and low torque, and what comes out of it 60 rpm and high torque. The motor turns fast and the horn turns slowly. Why put a gear train in the way, and where does the extra torque at the output shaft come from? Work it out on your own first, then compare with your table."
- `:692-700`, trim `inst-day15-fill-in`'s second paragraph to the arithmetic result (it re-explains PWM mode 1 a third time) — and move it to Part 4 with the task (item 11): "In `tim.c`, `tim14_pa7_pwm_init()` writes `TIM14->ARR = timerMax-1`, so 4000 gives 4000 counts, 20 ms. `tim14_pwm_set()` writes `TIM14->CCR1 = value`, so `SERVO_MID` would put 300 in CCR1 and the pin would be HIGH for 300 counts, 1.5 ms. Same convention as `TTmotor_ramp.c` on Day 11x, so a student who reads both files sees one answer." (Also drops "exactly 20 ms" — L-6.)
- `:426-432`, Part 1's feedback-loop paragraph is `subsec-servo-holds` restated → "The potentiometer on the output shaft closes the loop (`<xref ref="fig-servo-feedback"/>`)." The reveal at `:441-449` carries the reasoning, which is where the plan puts it.

**11. [P-7, P-2, S-8] `act-day15-fill-in` splits; `task-day15-fill-timc` moves to Part 4.** Raised by: `expert-cognitive-load` (MAJOR — five names plus a file cross-check in one beat, right before the build), `expert-class-logistics` (MINOR S-8 — the task opens `tim.c` 15 minutes before it is handed out).
- `:658-663`, `act-day15-fill-in`'s introduction → "Write all of these down before we compare. The names in capitals are the `#define` lines of the program we'll build next."
- Delete `task-day15-fill-timc` (`:676-683`) from Part 3.
- In Part 4, after the `tim14_pwm_set()` listing at `:747`, add `<activity xml:id="act-day15-timc-check">` titled "What reaches CCR1", with a single `<statement>`: "Look at `tim14_pa7_pwm_init()` and `tim14_pwm_set()` in `<xref ref="subsec-servo-ref-driver"/>`. What does the initialization write into `ARR` from the number it is given, and what does `tim14_pwm_set()` write into `CCR1`? If the program called `tim14_pwm_set(SERVO_MID)`, what number would end up in `CCR1`, and for how many counts of each period would the pin be HIGH?" Followed by `<instructor xml:id="inst-day15-timc-check">` carrying the trimmed paragraph from item 10.
- Beat comment `:373-379`: Part 3 = 18 (2+5+7+4), Part 4 = 12 (3+1+2+2+4). Total still 110.

**12. [S-21, P-1, B-1] `:757-763` — the design-decision paragraph.** Raised by: `checker-voice` (S-21), `checker-technical-accuracy` (Parts 3–4), `learner-anxious-nonhardware` (MINOR P-1/B-1 — Part 4 says only "the servo's safe range" and the consequence appears only in the Reference).

> old: "That move is a design decision worth naming. The driver knows the timer, so on Day 11x the limit it applied was the timer's. The program knows the servo, and the servo's safe range, 1 ms to 2 ms, is much narrower than anything the timer can produce, so the program is where that limit belongs."
> new: "The driver knows the timer, so on Day 11x the limit it applied was the timer's. The program knows the servo, and the servo's safe range, 1 ms to 2 ms — outside which it drives against its own mechanical stops — is much narrower than the range the timer can produce, so the program is where that limit belongs."

**13. [B-8, S-23] `:1096-1123` — Part 6's first two paragraphs, `checker-voice`'s rewrites, carried verbatim.** Raised by: `checker-voice` (two MAJORs), `expert-cognitive-load` (MAJOR B-8), `checker-technical-accuracy` (Parts 5–6, MINOR B2 — 250 mA is half of 500 mA, so the argument needs the stall case and the board's own draw).

> `:1096-1106` → "The reading said the servo is powered from a separate supply and never from the Nucleo. Here is the number behind that: the servo may draw about 250 mA while moving, and much more if it is stalled, while your laptop's USB port supplies at most 500 mA for the whole board and everything on it. High current draw by the servo can starve the Nucleo, causing it to brown out and reset itself. So we power it from the same regulator board we used for the motor (`<xref ref="fig-tb6612-regulator"/>`), and `<xref ref="fig-servo-powering"/>` shows how the servo connects to it."

> `:1114-1123` → "On the SG92R in your kit the three leads are brown, red and yellow, and `<xref ref="fig-servo-powering"/>` shows where each one goes. Unplug everything, the USB cable and the adapter, before you make any change to the wiring. After the wiring has been checked, the order is the one from the motor chapter: USB first, for the Nucleo, then the adapter. We'll do the wiring tomorrow."

The general position rule ("the center lead is power, the darker outer lead is ground…") survives **once**, in the reading at `:198`, where item 18 corrects it. The 4-to-6 V sentence is dropped here as reading repetition. Net −4 sentences; this is the second half of item 6's funding.

**14. [P-4, P-7] Three worked numbers in student prose — the accessibility half of ruling 1.** Raised by: `learner-weak-circuits` (two MAJORs and a MINOR), `learner-firstgen-novice` (MAJOR P-4/P-7), `checker-technical-accuracy` (Parts 3–4, MINOR B1).
- `:596`, append to the T0 paragraph: "Putting a number in: on the table's first row the period is divided into 240,000 bins, so `<m>T_0</m>` would be 20 ms/240,000, about 83 ns." **DISPLACES:** the "Which of these are usable?" sentence cut in item 10.
- `:648-655`, in the rewritten paragraph (item 17): "Going from a pulse width to a count is a division: on the 240 row, where one count is 20 µs, a 1 ms pulse is 1000 µs ÷ 20 µs = 50 counts."
- `:808-812` → "…so `x/10` is 0 for every `<m>x</m>` below 10, and `100 + (x/10)*100` would give 100 for every reading but the last: at x = 5 it gives 100, where `100 + x*100/10` gives 150. Multiply first, then divide — and note that the divisor is the number of steps, not the largest x." **DISPLACES:** "In C, with integers," and "of the same problem" at `:808` and `:805`.

All three use rows or values the class has already rejected, so no answer is given away (P-14).

**15. [P-3, B3, B4] `:1054-1060` and `:1084-1089` — the stretch's second task re-asks Part 3's reveal.** Raised by: `checker-technical-accuracy` (Parts 5–6, MAJOR P-3/B3, MAJOR B4). `inst-day15-resolution-table` already computes the prescaler-6 row *and* the prescaler-1 limit, so the task asks students to reproduce a reveal they watched. P-3 forbids creating challenge that is not additional.
- `:1047-1052` — "no interrupt is needed" → "no interrupt of your own is needed" (SysTick is interrupt based — Day 12).
- `:1054-1060` → "The map turns 4096 potentiometer readings into 200 timer counts. How many readings share one timer count, and what does that mean for how the knob feels as you turn it? Then: if you wanted one timer count per reading, what would `PWM_TIMER_MAX` have to be, and what would go wrong with the pulse period?"
- `:1084-1089`, replace the "Finer." paragraph with its answer: "**One count per reading.** 4096/200 is about 20 readings to a count, so roughly 20 codes of knob travel go by before the horn moves — which is what a student who turns the knob slowly and watches `pwm_value` will notice. For one count per reading you would need 4096 counts across the 1 ms window, so `<m>T_0</m>` = 244 ns and ARR + 1 for a 20 ms period would be 81,920, which a 16-bit register cannot hold. And 244 ns is far below the servo's 1 µs dead band, so the servo could not act on a single step even if the register could."

`expert-rigor-hawk` verified the old stretch as genuine; it is correct but not *additional*, and the finding citing P-3 outranks.

**16. [B-3, L-6, P-1] The reading's datasheet paragraph, `:118-131`.** Raised by: `checker-voice` (S-27 — her stall-torque definition is missing, and "kgf-cm" not "kg-cm"), `learner-firstgen-novice` (MINOR P-1/B-11b — the dead band is named without meaning, and the term meant something else in the motor chapter, `ch-motors.ptx:3431`), `checker-technical-accuracy` (reading + Parts 1–2 and whole chapter #7, #10), `expert-continuity-auditor` (L-5).

> "Our servomotor is the TowerPro SG92R micro servo (`<xref ref="fig-servo-sg92r"/>`). Its `<url …>`datasheet`</url>` is one page, so look through the whole of it. The relevant specs are the stall torque, 2.5 kgf-cm at 4.8 V, which is the torque the servo puts out if you try to resist its turning; the operating speed, 0.1 s per 60°; the operating voltage, 4.8 V, which is why we run it from the regulator board's 5 V and never from a 3.3 V pin; the gear material, POM (a hard plastic) with a carbon-fiber gear; and a dead band width of 1 µs, the smallest change in pulse width the servo's controller can actually notice, which we'll use in class when we decide how finely to divide the pulse. A kgf (kilogram-force) is the gravity exerted on 1 kg of mass, so kgf-cm, which the sheet writes as kg/cm, is still force times distance. Please do not try to force a servo's horn around by hand."

**DISPLACES:** "2.5 kgf-cm is not a huge force, but remember it is a tiny motor." (`learner-firstgen-novice`'s own nomination), and "Please do not try to turn a servo by hand", which contradicted `act-day15-push`. Also `:119`, `:136`: "Tower Pro" → "TowerPro" (L-5; note the product label reads "Tower Pro" — escalation E8).

**17. [S-18, S-23, S-25, S-26, S-28, L-13] `checker-voice`'s rewrites, carried through verbatim.** Its verdict is not balanced against other reviewers; each of these is three seconds of work.
- `:919` "Part 5: Design Exercise: The Pulse on the Oscilloscope" → "Part 5: Design Exercise, Verifying the Pulse on the Oscilloscope" (S-26)
- `:706` "Part 4: The Program, Read Before It Is Built" → "Part 4: Reading the Program" (S-18)
- `:454` "Part 2: How We Command It" → "Part 2: How We Command the Servo" (S-26)
- `:530` "Part 3: Designing the Timer, a Second Time" → "Part 3: Designing the Timer for the Servo's Pulse" (S-26)
- `:920-924` "Now we'll build it. The pulse is verified on the oscilloscope with no servo attached, on purpose: a wrong number shows up on the screen, not in the gear train." → "Now we'll build it. We'll verify the pulse on the oscilloscope before the servo is ever attached: that is your safety check, so that you won't break the servo." (S-23; hers, slide 20 note)
- `:531-533` "On Day 11x we asked, as a question for those who finished early, what the prescaler and the auto-reload value would have to be for a 50 Hz PWM" → "On Day 11x we worked out what the prescaler and the auto-reload value would have to be for a 50 Hz PWM" (S-25, also raised by `learner-firstgen-novice`)
- `:455-457` "All we have to do is stick in a signal to command the position, and the circuitry inside the servo does the rest. Today's work is making that signal." → "The signal that commands the servo's position is a pulse; today we design that pulse and build the circuit to produce it." (B-12/S-15, `learner-anxious-nonhardware` MAJOR — the old sentence sits directly upstream of a 20-minute derivation and a 45-minute build)
- `:714` "Here is what the header promises:" → "Here is the header, `tim.h`, and the three functions it declares:" (L-13)
- `:610-612` "Two things bear on the choice: the servo's dead band of 1 µs, and what its gears are made of." → "Keep in mind the servo's dead band of 1 µs, and what its gears are made of." (S-28)
- `:648-655` "…drive the pin LOW while the counter is between `TIM14_CCR1` and `TIM14_ARR`. With the row chosen, the program's four numbers follow." → "…drive the pin LOW while the counter is between `TIM14_CCR1` and `TIM14_ARR`. Now that we have chosen a row, we can work out the numbers the program needs." Plus item 14's ms → counts sentence.
- `:490-491` "Which timer, and which alternate function, is a datasheet lookup." → "We look up which timer drives a given pin, and which alternate function to select, in the datasheet."
- `:816-822` `act-day15-map`'s statement → "Write the expression that maps `pot_value` onto `pwm_value`, using the names in the template (`MAXADC` is 4096). Then check it: what does it give for readings of 0, 2048 and 4095, and are all three inside the servo's safe range?"
- `:803-804` "The last blank turns a potentiometer reading, 0 to 4095, into a pulse width, `SERVO_MIN` to `SERVO_MAX`." → "The last blank turns a potentiometer reading, 0 to 4095, into a pulse width just about spanning `SERVO_MIN` to `SERVO_MAX`." (L-13, and `checker-technical-accuracy` #13)
- `:1130-1135` → "Tomorrow we'll connect the servo to its 5 V and watch it follow the potentiometer. On Thursday we'll replace the potentiometer with two photocells and start on the solar tracker. Thursday's reading is about the photocell." (L-12, and Q7's answer is overstated by "turn this into a solar tracker")
- `:637` `inst-day15-resolution-table` "Then the two we did not choose." → "Then we'll look at the two we did not choose." (L-16)
- `:191-192` drop "the same pin that carried the motor's PWM" — it pre-answers `task-day15-pins-choose`: "Only the signal lead goes to the STM32C031C6, at PA7 (D11)."

**18. [L-6, B-11c] Voltage and current, one wording each.** Raised by: `checker-technical-accuracy` (three reports), `checker-arc-fidelity` #7, `checker-voice`.
- `:185` — "The servo runs on 4 to 6 V and draws a lot of current: a few hundred milliamps while moving, and much more if it is stalled." → "The servo runs on 4.8 to 6 V and draws about 250 mA while moving, and much more if it is stalled."
- `:278` — "draws hundreds of milliamps while moving and more when stalled" → "draws about 250 mA while moving and much more when stalled".
- `:1188-1190` — "No datasheet gives its current draw; a few hundred milliamps while moving, and more when stalled, is the figure we work with." → "It draws about 250 mA while moving, and much more when it is stalled." Also `:1187` "2.5 kg-cm" → "2.5 kgf-cm".
- `:132-134` the authoring comment → record that the settled wording is "about 250 mA while moving, and much more when it is stalled", used in four places, and that the number is her slide 28's (escalation E1).
- `:198` — "On every hobby servo the center lead is power" → "On a hobby servo the center lead is power" (B-11c; Lab 8's note does not support the absolute).

**19. [P-4, P-1] `:190` — the shared ground is asserted twice and never reasoned.** Raised by: `learner-weak-circuits` (MAJOR P-1). One clause, in the reading, where the rule is introduced; Part 6 and `fig-servo-powering`'s caption then point at it rather than restating it.

> "…the servo's power lead goes to the board's 5V pin, and the board and the Nucleo share a ground, because the pulse from PA7 is a voltage measured against the Nucleo's 0 V and without a shared ground the servo has nothing to measure it against."

**20. [B-3] `:254-255` — an unsourced distractor feedback.** Raised by: `checker-technical-accuracy` (reading + Parts 1–2, MAJOR B-3). "The center lead is power. Putting the signal there would put 5 V onto a pin of the STM32C031C6." → "The center lead is power. Wiring the pulse pin to it puts a 3.3 V logic output on the servo's supply rail, and ties the 5 V supply to the signal lead instead."

**21. [B-1, B-7] `:136-137` — `fig-servo-sg92r`'s caption describes a horn the photograph does not have.** Raised by: `checker-arc-fidelity` #3, `checker-technical-accuracy` (reading + Parts 1–2, MAJOR B-1). Overruling `checker-figure-claims`, which verified "cross-shaped horn" as exact: the image is a two-arm horn, and its lead colours are the manufacturer's.

> "The TowerPro SG92R micro servo, the manufacturer's photograph, with a two-arm horn fitted to the output shaft. The three leads leave at the left; their colors here are not the kit's, which are brown, red and yellow."

**22. [L-6, B-10, P-1] The Reference section.** Raised by: `expert-rigor-hawk` (MAJOR L-6/B-6), `checker-technical-accuracy` (whole chapter #3, #8, #14; Parts 5–6 MINORs ×3), `learner-python-intro` (MAJOR P-1/B-6/B-10), `expert-continuity-auditor` (MINOR P-1).
- `:1201` — `<m>\text{PSC} \times (\text{ARR}+1) = 12\text{ MHz} \times T_p</m>` → `<m>\text{prescaleFactor} \times (\text{ARR}+1) = 12\text{ MHz} \times T_p</m>`. Three lines later PSC is named as the register (value − 1), so as written 59 × 4000 ≠ 240,000.
- `:1204-1205` — "A finer step than the servo's dead band, or than its gear train can hold, buys nothing." → "A step finer than the servo's dead band, or than its gear train's backlash, is more finely grained than is worth doing." (hers; and it removes the second instance of the invented gear-train absolute)
- `:1218-1219` — "The initialization is the one from Day 8 with the peripheral's name changed." → "The initialization is the one from Day 8 on a different timer, with the period as a parameter."
- `:1226` — "The whole of `tim.c`." → "The whole of `tim.c`, with its comments shortened."
- `:1299-1310` — "a reading `<m>x</m>` that runs from 0 to `<m>N</m>`" → "runs from 0 to `<m>N-1</m>`" (as written it contradicts "never quite reaches `<m>b</m>`" six lines down); and give the promotion its numbers here rather than in the stripped `inst-day15-map`: "…the product `<m>x \times (b-a)</m>` is computed in `int`, which is 32 bits on the STM32C031C6 — a C-language fact worth knowing: 4095 × 200 = 819,000 is far more than an `int16_t` holds, and fits in an `int` with room to spare." Then `:832-834` in `inst-day15-map` reduces to "`pot_value` is an `int16_t`, and the product is computed in `int`; see `<xref ref="subsec-servo-ref-map"/>`."
- `:1198-1203`, add one clause disambiguating "resolution", which is a *time* in the motor chapter and a *count* here: "…is the resolution of the servo, counted in steps rather than in microseconds (`<xref ref="subsec-day11x-resolution"/>` measures it the other way)."

---

### MINOR

**23. [S-8, B-8a, B-9] The section comment `:373-379` and the Day 15x OWES comment `:1143-1149`.** Raised by: `expert-class-logistics` (two MINORs S-8), `checker-arc-fidelity` #2, #5, `checker-technical-accuracy` (Parts 5–6, MINOR S-8), `checker-technical-accuracy` (whole chapter #16). Comment-only, no student text.
- Part beats: Part 3 = 18 (2+5+7+4), Part 4 = 12 (3+1+2+2+4) after item 11.
- Part 5 = 45 as `5 + 8 + 4 + 5 + 18 + 5`, restoring the fill-the-blanks beat to 8 minutes (`checker-arc-fidelity` #5), and naming the checkpoint as falling **inside** the 18-minute beat at about minute 78, not as a final beat.
- `:1035-1038` — "Nothing in Part 6 is lost if the room is still building at minute 100" → "Part 6's first beat and the close still fit at minute 100" (Part 6 plus the close is 12 minutes, and minute 100 leaves 10).
- Add to the Day 15x comment: **OWES delivery 2** the `refPage` recall slides for `subsec-day11-actuator-chain` (Part 1), `fig-tim14-block-full` (Part 3), `subsec-day11x-driver` and `fig-tim14-register-map` (Part 4); and record that the introduction's "on the second we'll connect the servo" is a promise `sec-servo-day15x` has yet to keep.

**24. [P-14, P-17, B-3, B-11c] Instructor blocks — the gates.** Raised by: `learner-ai-reliant` (MAJOR P-14/P-17, MINOR P-6/B-3), `expert-class-logistics` (MAJOR P-2/P-14).
- `:1012-1013` — "Have each student demonstrate the sweeping pulse to an instructor or an LF before moving on." → "Have each student demonstrate the sweeping pulse and say, without looking at their table, why they picked their prescaler and what CCR1 value `SERVO_MID` produces." (zero net words; the demo currently validates the code, not the derivation, and every number in the day is closed-form arithmetic on constants identical for every student)
- Add to `inst-day15-template-complete`: "A student may go on to the stretch as soon as their own capture matches the reference captures; instructor and LF time in this block is for the symptom list and the ladder."
- `:963-972` `task-day15-build-run`, replace "…show what a good capture looks like." → "Check what you measure against the prediction you wrote down. `<xref ref="fig-servo-scope-1ms"/>` and `<xref ref="fig-servo-scope-2ms"/>` show the time base and the trigger a good capture uses."

**25. [B-11a, B-7] Two caption numbers and one caption claim.** Raised by: `checker-figure-claims` (two MINORs), `checker-technical-accuracy` (Parts 5–6 MINOR, reading + Parts 1–2 MINOR).
- `:986-987` — "The pulse is now 2.008 ms wide, and the period, 19.93 ms, has not moved." → "The pulse is now 2.008 ms wide, and the period is unchanged at 19.93 ms, still 20 ms to within the cursors' placement." (the previous caption says the period is 19.91 ms, so "has not moved" quoted a different number)
- `:163-165` — "The angles are the convention described below, and the drawing is not to scale." → "The angles and the turn directions are the convention described below, and the drawing is not to scale." (the art asserts CW and CCW; the caption did not)
- `:55` — "shows what is inside your servo" → "shows what is inside a hobby servomotor like yours" (the cutaway is a brass-geared generic, and the caption already attributes its 60 rpm to the picture).

**26. [B-3, S-26, S-19] Reading questions and the ±90° convention.** Raised by: `checker-technical-accuracy` (whole chapter #11; reading + Parts 1–2 MINORs), `expert-rigor-hawk` (MINOR S-19), `checker-voice` (S-26).
- `:309` — "roughly 180°" → "its nominal 180° of travel" (the reading calls the endpoints hypothetical).
- `:315-316` — "This is the number that matters when something else in the system has to wait for the arm." → "This is the number that matters when a program has to wait for the arm to arrive before it takes its next reading."
- `:594-595` — "and 180° divided by that number of steps is the angle one step moves the horn." → "and, using the ±90° convention from the reading, 180° divided by that number of steps is the nominal angle per step." **DISPLACES:** "Please do not try to turn them that far." at `:177-178`, which duplicates the by-hand caution item 16 rewrites at `:130`.
- `:484-485` — "because the controller does not notice it" → "it produces no change in the commanded position" (L-15).

**27. [B3, B1, B2, L-6, B-9a, L-5, B-11c] Word-level corrections.** Raised by: `checker-technical-accuracy` (Parts 3–4 and Parts 5–6, MINORs), `checker-voice`, `checker-arc-fidelity` #4.
- `:569` table header — "Auto-reload (must fit)" → "Counts for 20 ms (must fit)" (the values entered are ARR + 1, not ARR).
- `:650-651` — "HIGH while the counter is between 0 and the value stored in `TIM14_CCR1`" → "HIGH while the counter is below the value stored in `TIM14_CCR1`" (as written, 300 reads as 301 counts).
- `:729-730` — "`tim14_pa7_pwm_init()` is the driver we read on Day 11x with two changes." → "The driver is the one we read on Day 11x, with two changes." (the initialization has one change; the file has two)
- `:110` — "CNC tools for metal and wood" → "computer-numerical-control (CNC) tools for metal and wood" (B-9a). After item 9, "NVIC" no longer appears in this chapter's prose — grep to confirm before closing.
- `:949` — "Wire the potentiometer to A0" → "Wire the potentiometer to A0 (PA0)" (L-5, both names).
- `:928-929` — "The servo stays in its bag until tomorrow." → "The servo stays unplugged until tomorrow." (B-11c: nothing sources a bag)
- `:661-662` — "`tim.c`, the timer driver that goes with it, is on Canvas and you will want it open for the last question." → deleted with item 11.
- `:973-976` — restore her sentence: "Find the knob position that gives a 1.5 ms pulse. Remove and reattach the knob, if necessary, so that it is at the midway position."
- `:1082-1083` — "the shape Lab 8's controller wants" → "the shape Lab 8 asks for" (S-20: no artifact wants anything).
- `:10` — "all we supply from the outside is one signal" → "all we supply as a command is one signal" (the power lead is also supplied from outside).
- `:166` — `fig-servo-pulses` width `80%` → `95%` (`checker-figure-claims`: marginal projected).

**28. Rebuild.** `python3 scripts/image_ratios.py` and commit `assets/book.css` (item 5 changes an aspect ratio), then `./scripts/build-all.sh`, `python3 scripts/check_rules.py --quiet source/*.ptx`, `python3 scripts/check_starters.py`.

**Length check (B-18).** The in-class section goes from about 26 body paragraphs to **26** — item 10 deletes one (`:404-407`) and item 6 adds one, and net sentence count falls by about eight. The additions in items 6 and 14 are funded by the census cuts in items 10, 12 and 13, exactly as required.

---

## (c) Items belonging to other files

1. **`source/ch-motors.ptx:1130`** — [L-6, B-6] `inst-day11-pwm` says "Table 12 gives PA7 the alternate function TIM14_CH1, which is alternate function 4." Table 12 carries no AF numbers. → "Table 12 gives PA7 the alternate function TIM14_CH1, and the port alternate-function tables that follow it give the number: AF4." Same mis-attribution as item 3; raised by `checker-technical-accuracy` (reading + Parts 1–2).
2. **`source/ch-motors.ptx`, near `:3255-3263` in `subsec-day12-main-loop`** — [P-1, B-17] the `milliseconds() - last_sample >= SAMPLE_MS` idiom that the Day 15 stretch asks students to write appears in the reading book only inside a `<slide>` (stripped) and an `<instructor>` (stripped), so its wraparound reasoning is never taught in student prose. Add one clause where the polling loop is described: "The subtraction is what makes this safe when the millisecond count wraps around: `milliseconds() - last_sample` is the elapsed time either way, because both are unsigned." Then `<xref>` it from `task-day15-stretch-millis`. Raised by `learner-python-intro`.
3. **`plans/day15.md`** — record five things Gate 2 settled: the Part titles from item 17 (B-4 requires the plan's table to match); the "five `#define`s and the map line" count in the CRUCIAL-step scaffolding at `:49-53` (it says "four `#define`s and one expression"); Part 5's beat split as `5 + 8 + 4 + 5 + 18 + 5`; the move of the `tim.c` cross-check from Part 3 to Part 4, with Part 3 = 18 and Part 4 = 12; and, under "No ordering change from her deck", that her slide 14 (Table 12) sits in Part 2 ahead of the prescaler search, per the plan — currently an unrecorded ordering fact (`checker-arc-fidelity`).
4. **`scripts/check_starters.py:59`** — the comment reads "prints Petra's servo template whole, with its five blanks". → "…whole, with its five blank `#define`s and its blank map line". Raised by `checker-technical-accuracy` (Parts 3–4).

---

## (d) Escalate to Petra / ask-Petra

**E1 (the one real trade-off). The servo's current draw — question 1b.** No datasheet gives a figure, so the book either speaks with one unsourced number or drops the brown-out argument's arithmetic; I have used your slide 28's 250 mA in four places and cut the Reference's "no datasheet gives it", because a chapter that quotes a number in Part 6 and disowns it in the Reference teaches neither. **Recommendation:** keep "about 250 mA while moving, and much more when it is stalled." If you would rather the book carried no number, Part 6's paragraph needs a replacement reason, since 250 mA against USB's 500 mA is the whole of the brown-out argument.

**Figure originals — these cannot be fixed here.**

**E2. `towerProPowering.png` (`fig-servo-powering`) needs a re-export.** Three separate defects, and the caption in item 7 can only describe them, not repair them: the Nucleo's 3V3 and GND wires leave the top edge with no visible origin, so the shared ground's Nucleo half is invisible on the day we argue for it; the 3.3 V rail feed is for a potentiometer that is not wired until Wednesday — does it belong in the Day 15 version at all?; and the legend says "Red/Orange → power" while the servo's ground lead is drawn black. Separately, the pin labels are **0.62 % of image width** and are illegible at every delivery size — including in the book — and they are the labels the caption points at. Two rounds of caption patching will not fix a crop.

**E3. `slide22_0bd6d3c6.png` and `slide23_535a10d2.png` (the two scope captures) need a tighter capture or an agreed crop.** The cursor digits are **0.73 % of width**, and they are the exact numbers both captions quote (1.0056 ms, 19.91 ms, 2.008 ms, 19.93 ms, 50.2 Hz) and the numbers a student compares their own capture against. A crop that keeps the time base, the trigger, the three cursors and the two ΔX rows would do it; layout cannot.

**Questions.**

**E4. `Day15_servo_template.c`** declares `int16_t pot_value` and `int16_t pwm_value` and passes both to `uint16_t` parameters, with no comment. The course chose `uint16_t` for `adc_read()` deliberately. Should the starter declare them `uint16_t`? Not changed here (B-6).

**E5. `Day15_servo_template.c`'s ISR** clears the flag with `TIM16->SR &= ~TIM_SR_UIF;`, where Day 8 teaches clearing status flags by **assigning** the mask (`ch-timers-interrupts.ptx:1944-1950`). UIF is rc_w0, so it is harmless as written, and the book now says so beside the listing (item 9). Should the starter change to `TIM16->SR = ~TIM_SR_UIF;` so the file matches the habit we teach?

**E6. `slide10_3c7eff36.png`** — your pulse figure has a doubled closing parenthesis: "1 ms (−90°, full CCW))". Your art; happy to leave it or swap in a fixed export.

**E7. The Part 5 checkpoint assumes instructor plus LF coverage** for a room in which a fraction of students are still building at minute 98. How many LFs are in the room on a Tuesday? (B-11c — I will not reconstruct it.)

**E8. "TowerPro" or "Tower Pro"?** Your answer and Lab 8 say TowerPro, and I have used that; the product label in both photographs reads "Tower Pro" as two words.

**E9. Your three stall-torque unit conversions** — the book carries 2.5 kgf-cm at 4.8 V and notes the sheet writes it as kg/cm. Is there a conversion you want stated (to N·cm, to oz-in)?

**E10. `rq-servo-supply`'s distractor feedback** asserts "The pulse from PA7 is 3.3 V and the servo reads it fine." The SG90 sheet quotes a 4.8 V signal level. True on our hardware, but unverified against the sheet — confirm, or let me hedge it.

---

## (e) Findings discarded, with reasons

1. **`checker-figure-claims`: "the cross-shaped horn" verified exact.** Overruled on the file: `slide09_7ead9cea.png` shows a two-arm horn. `checker-arc-fidelity` was right. (Item 21.)
2. **`learner-visual` [MAJOR P-4]: a two-axis ramp figure for the affine map.** Deferred to *Consider* / delivery 2. No such asset exists, a new figure in Part 4 costs class minutes the 110 does not have, and what the novice and weak-circuits reviewers actually needed — the map with numbers in it — is delivered in prose by item 14. Revisit if Part 4's map commit stalls.
3. **`learner-visual` [MINOR P-4]: shade the ±1 µs dead band on `fig-servo-pulse-resolution.svg`.** *Consider.* The asset is ours and editable, but the dead band is now argued in words in Part 2 and in the resolution reveal, and B-11a requires the SVG's `width`/`height` to be re-matched to its `viewBox` after any edit. Cheap and worth doing if there is time before delivery 2.
4. **`checker-technical-accuracy` #8, second half: a clause in Part 4's warm-up saying the potentiometer stops one step short of N.** Discarded — it pre-answers `act-day15-map`'s own check question ("what does it give for readings of 0, 2048 and 4095"), which is the one place a student discovers 399 for themselves (P-14, P-17). The Reference half of the finding is taken (item 22).
5. **`expert-continuity-auditor` [MINOR P-1]: trim the integer-promotion sentence from the Reference.** Overruled by `learner-python-intro`'s opposite finding. B-10 and P-3 put depth in the Reference, not out of the book; the auditor's real objection is that it reads as settled fact, and item 22 answers that by naming it as a C-language fact and giving it its numbers.
6. **`learner-python-intro`'s two code fixes** (`uint16_t` declarations; `SR = ~mask`) → escalations E4 and E5, not edits. Petra's file (B-6).
7. **`learner-anxious-nonhardware` [MAJOR]: the settled constants in a student-visible lifeline sentence.** Refused under P-10 and Lab 8 §3; see ruling 3. Substituted with the conceptual form P-2's own precedent authorizes.
8. **`checker-technical-accuracy` #17: the printed comment "Do not forget the volatile!" differs from the download's "Don't forget the "volatile"!".** Discarded. It is a deliberate B-15 reword (a lone apostrophe in a listing turns every following line red) and `check_starters.py` matches on the blank map line, so nothing drifts.
9. **`learner-ai-reliant` [MINOR P-14] on the Part 1–2 commits.** No fix, by the reviewer's own verdict: the in-class, peer-compared format is the mitigation.
10. **`checker-technical-accuracy`, latent: the cutaway's "60 rpm" against the SG92R's 100 rpm (0.1 s/60°).** Not a finding, and item 10's rewrite keeps it attributed to the picture rather than to our servo.
11. **`checker-figure-claims`: `fig-servo-pwm-pins` — crop for the deck.** Adequate for the book; carried to the delivery-2 fit check, along with its notes that the captures want image-dominant slides, the powering figure is squarer than the stage, and the resolution figure at 3.19:1 will letterbox.

---

## Dissent worth recording

- **`checker-arc-fidelity` wanted the current draw split**: her 250 mA once in Part 6, and the reading keeping "a few hundred milliamps" as a hedge. I ruled for one wording everywhere. If Petra's answer to E1 is that the number is not solid, the split is the better shape and this is the item to revisit first.
- **`expert-rigor-hawk` verified the old stretch task 2 as genuine**, and I replaced it (item 15). If the "one count per reading" question turns out to land above the class's reach, the prescaler-6 recomputation is a real fallback — but it should then be moved *out* of `inst-day15-resolution-table` so it is not a reveal and a stretch at once.
- **`learner-anxious-nonhardware`'s lifeline.** I refused the constants in student prose twice over (P-10, Lab 8 §3). The failure mode it names is real and expensive: a student who mis-derives in Part 3 loses the 45-minute build. If the checkpoint at minute 78 finds more than a couple of students on wrong constants, the honest fix is not printing the answers — it is moving the Part 3 reveal's projection earlier in Part 5, at the instructor's discretion, and that belongs in `inst-day15-checkpoint` on Petra's word rather than mine.
- **`expert-class-logistics`'s clock.** It finds a fraction of the room still inside `act-day15-build` at minute 98 even after item 23's beat split, and treats Day 15x's Part 2 as the designed recovery. That is the plan's own position, so I did not escalate it — but the plan's cut order (Part 6 to its first beat) is what will actually be exercised, and Day 15x must not assume Part 6's second beat was heard.

---

# Applied (2026-09-03), verified against the file by phrase

All 28 items of the synthesizer's list are applied in `source/ch-servos.ptx`
(90 scripted replacements, each asserted to hit exactly once; every new phrase
then grepped for and every struck phrase grepped against), with these
departures:

- Item 7's caption drops "nothing on the servo touches the 3.3 V rail" (B-18:
  a caption does not say what the picture leaves out) and its em dashes.
- Item 17's Part 2 opener reads "The signal that commands the servo's position
  is a pulse, and today we'll design that pulse and produce it" (no circuit is
  built today).
- Item 21's caption says "with a horn fitted" rather than "two-arm"; the two
  figure reviewers disagreed on the horn's shape, so the caption makes no
  claim about it.
- Item 6's lifeline says "the numbers you chose earlier today", not "in
  Part 3" (L-18).
- Every rewrite the synthesizer wrote with an em dash was applied without one.

Other files: `ch-motors.ptx:1130` (Table 12 → the port alternate-function
tables, AF4) done; `plans/day15.md` updated (titles, five defines, Part 3 = 18,
Part 4 = 12, Part 5's beats, the ordering note, a Gate 2 rebudget paragraph);
`scripts/check_starters.py`'s comment corrected. Not done: the
`milliseconds()` wraparound clause in `ch-motors.ptx`'s Day 12 prose, which is
awaiting Petra's pass 1 and is recorded in `plans/week8-handover.md` as a Day
12 follow-up.

Deferred, per the synthesizer's (e): the two-axis map figure and the dead-band
shading on `fig-servo-pulse-resolution.svg` (delivery 2 candidates).

The ask-Petra items E1–E10 are in `plans/week8-handover.md` and
`plans/week8-ground-truth.md` §9.
