# Day 12 — Gate 2′

The **student-facing half** reviewed as one draft, 2026-08-24: the pre-class
reading, the in-class skeleton, and the deck.

This is the pilot ordering (`CHAPTER_PROCESS.md`, Steps 3′/4′), so **there is no
in-class connecting prose yet** — every subsection carries a
`<!-- DELIVERY 2: prose. -->` marker, and the paragraphs are written in the
follow-up session from the slides Petra passes. Reviewers were told not to report
them missing.

Under review:

- `source/ch-motors.ptx`, `<section xml:id="sec-speed-before-class">` — the
  reading, two subsections and three reading questions
- `source/ch-motors.ptx`, `<section xml:id="sec-motors-day12">` — Parts 1 to 6:
  subsections, figures, tables, activities with their instructor answers, and the
  `<slide>` blocks
- `assets/decks/day12.json` — 41 slides

**Day 12 is a Thursday, 110 minutes**: 4 settling, Parts of 10 / 26 / 15 / 10 / 5,
a 35-minute build with a floor of 25, and a protected 5-minute close.

Panel: the standing Gate 2 core — `checker-arc-fidelity`,
`checker-technical-accuracy`, `checker-voice`, `checker-figure-claims`,
`expert-cognitive-load`, `expert-continuity-auditor`, `expert-class-logistics`,
`learner-visual`, `learner-firstgen-novice`, `learner-anxious-nonhardware` — plus
`learner-in-the-room` early, because this draft has a deck in it. Then
`committee-synthesizer`.

Gate 1 and its applied change list: `reviews/day12-gate1.md`. Gate 1.5, the voice
probe: `reviews/day12-gate1_5.md`.

*Reports are transcribed here by the orchestrating session where a reviewer ran
without a file-write tool.*

---

## expert-cognitive-load

### Verdict: MAJOR

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| **"the pulse rate is proportional to the shaft's speed"** | **6, most in full** | Day 11x Part 5: `sl-day11x-next` bullet 4, `fig-photointerrupter-video`'s caption, `sl-day11x-scope-video`'s caption — then Day 12's reading: the section introduction, `subsec-speed-sensor`'s closing paragraph, and `fig-photointerrupter-beam`'s caption | Day 11x's `sl-day11x-next` bullet (first encounter, in class) and the reading's introduction — the one line a reader needs to carry into the mechanism paragraph | Delete it from `subsec-speed-sensor`'s closing paragraph and from `fig-photointerrupter-beam`'s caption. The reading states this idea identically **three times in under 500 words**, which is exactly the caption-introduction-paragraph shape B-8 asks you to grep for |
| **The pull-up's open-drain mechanism** | **3, all in full, all inside Part 2** | `fig-photointerrupter-states`'s caption (the reveal), `sl-day12-states`'s caption and note, and `sl-day12-pullup-value`'s first bullet | `fig-photointerrupter-states` / `sl-day12-states` as the one reveal — a book caption plus a slide caption is the designed B-7 split, not a duplicate | `sl-day12-pullup-value`'s first bullet is a **third** full telling. Cut it and open the slide on "why 3.3 V", which is genuinely new. Gate 1's fix moved this mechanism out of the reading; it did not stop it being told three times where it landed |
| The direction question | 3, **not a violation** | posed in the reading, asked in `task-day12-direction`, revealed in `sl-day12-quadrature` | all three | none — this is the designed pose → do → reveal arc (P-6). Listed to show the census checked it |

### Findings

- **[MAJOR] [B-8]** **The proportionality claim regrew across the seam nobody re-checked.** Gate 1's census covered the Δθ generalization, the pull-up mechanism and the direction conclusion, and all three landed clean — the Δθ material now exists only in `sl-day12-decoding`, and the reading is cut cleanly at `RPM = 3 × PPS`. But the sensor's headline fact is now told **six** times, three of them inside the reading, near-verbatim against Wednesday's own slide. This is the load Gate 1 spent its effort trimming elsewhere, regrowing where nobody looked.
- **[MAJOR] [B-8]** **The open-drain mechanism was relocated, not reduced.** `sl-day12-pullup-value`'s own note calls its third bullet *"the one they have not had before"*, which concedes the first is not — and states it anyway. Net repetition in the day is unchanged; only its location moved from "reading + Part 2" to "Part 2 × 3".
- **[MAJOR] [P-6, P-15]** **`table-day12-diagnostics` is sequenced before the mechanism it depends on.** Its own presenter note says *"each row is a consequence of the circuit in `fig-photointerrupter-states`"* — and that figure comes 32 lines later. As drafted the table goes up while they wire, and its first row already states the answer (nothing pulls the line up, so it floats) **before** the class has worked out why the pull-up is needed, which is the promise the reading made. **Move the table after `sl-day12-states`**, where its own note says it belongs.
- **[MAJOR] [P-9]** **`counterResetButtonInt.c` reaches the room only by voice.** It is named in a `presenterNote` on the Part 6 glue and inside an `<instructor>` block that is stripped from the student book — the only occurrence of the filename in the chapter. No student-facing prose, activity introduction or slide bullet names it. A student reconstructing the day from the book, or finishing Lab 6 without notes, has no written pointer to the one file that turns "sketch a main loop from nothing" into "adapt a working example".
- **[MAJOR] [B-8a, P-9]** **The seven-segment hand-off caveat Gate 1 asked for is not present.** `grep -n subsec-i2c-ref-ht16k33 source/ch-motors.ptx` returns **zero** matches. Part 5's build-order table states the requirement — *"a minus sign when the motor is running in reverse"* — with no pointer to where the signed counter was built.
- **[MINOR] [P-7]** Part 4 is a properly *sequenced* mini-arc, which is the right shape, but five staged beats in 10 minutes leaves no room for the individual commit to actually be individual. If it overruns, the commit is still the first thing to give, exactly as Gate 1's dissent recorded — **but that trade should be made explicitly rather than discovered live.**

### On the five questions asked

1. **The reading is within budget on element count** — construction plus figure, the bare pull-up fact, the derivation, and the open direction question — and its three reading questions are each answerable from the reading alone. What is not within budget is the **repetition** inside it.
2. **Part 4 is survivable as a sequence, not as four simultaneous demands.** The commit belongs, per Objective 5's own requirement.
3. **Part 2's 26 minutes are the day's heaviest**, and correctly ordered except for the diagnostics table. The right order is: predict → wire → scope and measure → reveal → the value argument → diagnostics as an applied reference → the cabled variant as a conditional aside.
4. **The Part 4 → Part 6 net is real but invisible in the book.** Written into the book once, it would be sufficient.
5. **The caveat is not in Part 5**, confirmed by grep. One clause on the build-order table's last row.

---

## expert-class-logistics

### Verdict: BLOCKER

### Running clock

| Clock | Event |
|---|---|
| 0:00–~7:00 | Title, recap (2 min stated), agenda (untimed), and real settling for an individual-kit room. Budgeted 4; realistically 6–7 |
| ~7:00–17:00 | Part 1, discussion. Plausible as budgeted |
| 17:00–~47:00 | Part 2. Beats sum to 25 against a 26-minute budget — but the 14-minute wire/scope/measure beat is first-time hardware for a full room with no shared equipment. Realistic 28–34, as the plan's own Risks section says |
| ~47:00–63:00 | Part 3. Beats sum to 16 against 15 |
| ~63:00–74:00 | Part 4. Beats sum to 11 against 10 |
| ~74:00–~84:00 | **Part 5. Budgeted 5; its own slide notes sum to 9–10** |
| ~84:00 on | Part 6. Only ~21–23 minutes remain before the close must start — **already below the stated 25-minute floor, before any valve is spent** |
| 105:00–110:00 | The close, if it starts on time |

**Prediction: the hour does not fit in 110 as built.** The Part-level table sums to
110, but that arithmetic is only true one level up — **the same defect Gate 1 found
reappears one level down**, inside Part 5, where the beat notes commit to roughly
double what the Part row claims. With Part 2's honestly-flagged overrun on top, the
three valves are worth at most 12–15 minutes against a deficit closer to 15–19.

The **crucial step is genuinely protected** — it lands in Parts 2 and 3, before any
of this pressure hits. What suffers is the build, which will run below both its
target and its stated floor, and the close, on a day where compressing it is
explicitly forbidden.

### Findings

- **[BLOCKER] [S-8]** **Part 5's beats sum to 9–10 minutes against a 5-minute Part.** `act-day12-find-the-pin` ≈2, `sl-day12-lab6-build` ≈2, `sl-day12-build-order` ≈2, `sl-day12-deadband` ≈2, `sl-day12-hazards` ≈1, plus `inst-day12-find-the-pin`, which carries **no timing at all**. This is the identical failure Day 11x's Gate 3 found — a Part whose section-level number and beat-level numbers disagree — relocated one level down where the Part table cannot show it. The real total for the day is closer to **115**. Fix by cutting Part 5's content or by rewriting its budget to 9–10 and taking the difference from something already named as a valve — **not silently from Part 6's floor**.
- **[MAJOR] [P-2, S-8]** **Part 2's 14-minute wire-and-scope beat is the pairing that actually drains the build below its floor.** Three wires plus a resistor, a pull-up whose correctness is only confirmed by probing, then running and reading a ramp, for a room of individual kits. Nothing in Part 2 is a valve — correctly, since the pull-up must not be cut — so this overrun has nowhere to go but Part 6.
- **[MAJOR] [S-8]** **The settling bucket is over-subscribed.** The recap's own note says its 2 minutes come *out of* the same 4-minute pool as the two transitions, leaving about 2 minutes for laptops open, kits powered and attention gathered. For this format, settling plus two transitions is more plausibly 6–8. **The bucket needs restating, not just the recap re-timed.**
- **[MAJOR] [S-8]** **The close's mechanism is undersized, or its scale is ambiguous.** *"Go round the room and have every group say which stage they reached"* — if "group" means each student, thirty ten-second turns is the whole five minutes with nothing left for the recap items above it. If it means table clusters, say so. The close is the one thing named as never absorbing an overrun, so its feasibility at room scale has to be nailed down rather than assumed.
- **[MINOR] [S-8]** **Valve 2 returns less than it claims.** Moving the poll-versus-interrupt comparison out of Part 4 is said to take Part 4 to 6 minutes, but the content stated to remain — three-rates 1 + `milliseconds()` 3 + the naive-loop predict 2 + the commit 2 — already sums to **8**.
- **[MINOR] [P-3]** **Part 2 has nothing for the fast finishers.** It is instructor-paced through predict → wire → diagnostics → pull-up value while the completion spread will be wide. A one-line prompt — *start counting the slots on your wheel*, which is literally Part 3's first task — uses that time instead of leaving it idle.

---

## expert-continuity-auditor

### Verdict: MAJOR

### Verified, no finding

- **Objective 3's 5 V claim.** Grepped every `5 ?V` occurrence in `source/ch-motors.ptx` — 37 hits. Every one inside the two Day 12 sections is the regulator or motor rail, or the potentiometer hazard. **Nothing anywhere asserts the sensor's own supply is 5 V**, in the reading, the captions, the slides, the instructor blocks or the deck.
- **Open-collector / open-drain.** `sl-day12-states`'s note says exactly what was asked. The built material goes one better than the plan by **never introducing "open-collector" at all** — it stays inside Day 10's own vocabulary, so there is no new synonym to reconcile.
- **The Day 9 → PA15 EXTI transfer.** Checked against `ch-gpio-interrupts.ptx`: the *"the bit number **is** the line number, in all three EXTI registers"* claim is verbatim at line 850; `EXTI->EXTICR[3]` for line 15 is consistent with the worked line-13 example at line 1367; `EXTI_PA` is defined in `ES28.h`; and `counterResetButtonInt.c`'s five TODOs match "the five moves" the instructor block claims are unchanged. No forward reference.
- **Downstream.** All four of the chapter's objectives are now delivered somewhere, with Objective 4 landing in Day 12. **No `<xref>` anywhere points at `sec-motors-reference` or any `subsec-motors-ref-*`** — the deferred Reference section is not prematurely called on.

### Findings

- **[MAJOR] [P-1, P-6, P-11]** **Part 4 gives away Part 5's datasheet answer, and the deck admits it.** `sl-day12-naive-loop`'s code comment says `// the photointerrupter, on PA15 (D7)`, and `sl-day12-two-answers` and `inst-day12-poll-or-interrupt` both name PA15 again — all three inside Part 4. Part 5's `act-day12-find-the-pin` then asks students to derive that exact fact from UM2953 Table 11 as a genuine lookup. The deck confirms the collision was noticed and left unresolved: that slide's presenter note says *"Keep it to which pin — not which registers, which is Part 4's answer and is already given by now."* This is the datasheet moment the plan explicitly protected at Gate 1, and it is now hollow — the answer was on the wall two Parts earlier. **Fix:** in Part 4 refer to the sensor's pin only as `SENSOR_PIN` or "the sensor's pin", with no `(D7)` / `PA15`; the EXTI mechanics can still cite `EXTI_EXTICR4` and line 15 without tying either to the header label.
- **[MAJOR] [P-6]** **`table-day12-diagnostics` states the pull-up mechanism before its designated reveal.** Its first row — *"nothing is pulling the line up, so the pin is floating"* — is the answer to `act-day12-predict-trace`, and it comes 32 lines before `fig-photointerrupter-states`, whose own note calls itself *"the reveal for the prediction"*. (Independently found by `expert-cognitive-load`.) **Fix:** move the table after `sl-day12-states`, or rewrite its second column to point at the reveal rather than state the cause.
- **[MAJOR] [B-8a, P-9]** **The seven-segment safety net promised at Gate 1 is not in the built chapter.** `grep -n subsec-i2c-ref-ht16k33 source/ch-motors.ptx` returns zero, and `table-day12-build-order`'s last row asserts the signed-display requirement with no pointer to where it was built. Nothing in Part 5's `DELIVERY 2` marker flags that this pointer is owed, so it carries **the same risk that produced Day 11's dropped motor equations** — the precedent the plan's own Reference note cites. **Fix:** add the `<xref>` now, or leave an explicit reminder comment naming it.
- **[MINOR] [L-5, L-6, P-1]** **The open-drain / `OTYPER` distinction currently reaches nobody but the instructor.** It exists only inside `sl-day12-states`'s `<note>`, which is presenter-only in both the book and the student deck. Gate 1 asked for it in Part 2's **own text**; it needs to land in body prose in the follow-up session rather than stay a spoken aside.

---

## learner-in-the-room

Walked `assets/decks/day12.json` in projection order, student view only
(the seven `"instructor": true` refs skipped), against
`source/ch-motors.ptx` §`sec-motors-day12`. Slide numbers below are the
**student-deck** position; the `json` column is the index in the deck file,
which is what the instructor build's page counter shows plus one.

### Verdict: MAJOR

No blocker. The archetype that reached Petra on Day 10 — a listing whose
symbols have no referent in the room — is **not** here: `SENSOR_PIN` is
`#define`d on the same slide that uses it, `start_conversion()` / `adc_read()`
are the course's own ADC functions from Day 7, `GPIOA->IDR` is Day 3, and
`EXTI4_15_IRQHandler` / `EXTI_EXTICR4` / `volatile` are Day 9. The code slides
are usable from the wall.

What fails is thinner and later: an activity whose answer the deck printed two
slides earlier, a 35-minute build block whose projected surface is the optional
stretch, one slide that restates the figure beside it, and one fact Lab 6
requires that no student slide supplies.

### Slide walk

| # | json | slide | What I have that I didn't before |
| --- | --- | --- | --- |
| 1 | 0 | *title* | The day has a subject: measuring the motor's speed. |
| 2 | 1 | *recap* | Wednesday set the speed, the reading did the rpm arithmetic, today wires the sensor and builds Lab 6. (Omits Part 4 — the day's actual intellectual centre — from the "today" sentence.) |
| 3 | 2 | *agenda* | Six parts, matching the six dividers exactly. Items 5 and 6 read as the same thing. |
| 4 | 3 | *section P1* | We are opening on the homework, not on new material. |
| 5 | 4 | `act-day12-driver-questions` | A concrete thing to write: one line of `TTmotor_ramp.c` I can explain, one I cannot. |
| 6 | 5 | *section P2* | The next block is hands-on with the sensor. |
| 7 | 6 | `act-day12-predict-trace` | A question I have to commit to on paper before any hardware: sensor powered, scope on the output, **nothing else connected** — what is the trace? |
| 8 | 7 | `sl-day12-wiring` | Where every wire goes, and two facts the picture alone would not give: the resistor goes to 3.3 V, and the output stops at the breadboard today. |
| 9 | 8 | `sl-day12-cabled-sensor` | A colour code for the cabled variant — brown/blue/black/pink. New only if I am holding that variant; the deck is honest that it is conditional. |
| 10 | 9 | `act-day12-wire-and-scope` | Four things to do, and one number to write down and keep ("we'll use it twice more today"). The hand-turn check is the part I could not have invented. |
| 11 | 10 | `sl-day12-diagnostics` | Four traces, each mapped to a *different* cause — floating vs. beam-never-blocked vs. power/ground swapped vs. wrong node. This is a real diagnostic ladder: any two rows are distinguishable by looking at the screen. |
| 12 | 11 | `sl-day12-states` | The mechanism: the phototransistor is a switch to ground only, so it cannot drive OUT up, so whatever the resistor is tied to sets HIGH. This is the reveal for slide 7. |
| 13 | 12 | `sl-day12-pullup-value` | Two bullets I already have from slide 12, one that is new (why ~10 kΩ and not 1 kΩ or 1 MΩ), one that is new (internal `PUPDR` pull-up is allowed in Lab 6). **See finding 3.** |
| 14 | 14 | *section P3* | Arithmetic next, on paper. |
| 15 | 15 | `act-day12-pulses-to-rpm` | Four questions, all answerable: count the slots, list ways to notice a pulse, convert my measured rate, decide whether direction is in the signal. |
| 16 | 16 | `sl-day12-rpm` | The formula with *my* two numbers in it — and the one genuinely new rule: count **one edge per slot**, or the formula needs 2N. The opening paragraph ("regardless of the technology…") adds nothing. |
| 17 | 17 | `sl-day12-decoding` | The same count read as an angle: Δθ = 2π/N, count×Δθ is position, and position is relative to wherever the shaft started. Plus the word *average*. |
| 18 | 18 | `sl-day12-quadrature` | Direction is not in this signal at all, and what a second sensor a quarter-slot away buys. |
| 19 | 20 | *section P4* | The problem is now the loop, not the circuit. |
| 20 | 21 | `sl-day12-three-rates` | Three jobs at three rates named, and `delay_ms()` ruled out — with the Day 9 polled-button callback as the reason. |
| 21 | 22 | `sl-day12-milliseconds` | `milliseconds()`: what has been under `delay_ms()` all term, and that asking the time costs nothing. First sighting of `SysTick` anywhere in this course. **See finding 5.** |
| 22 | 23 | `sl-day12-naive-loop` | A concrete broken loop, and a question with a number in it: at the rate I measured, what does `pulses` hold after a second? |
| 23 | 24 | `act-day12-poll-or-interrupt` | The one place today I have to decide something myself and give a reason. |
| 24 | 25 | `sl-day12-two-answers` | Both answers, honestly: polling works if nothing in the loop ever blocks; the interrupt is Day 9's five moves with 15 for 4 and port A for port B. And the reason to prefer it is that it does not depend on numbers nobody measured. |
| 25 | 27 | *section P5* | Briefing, not discussion. |
| 26 | 28 | `act-day12-find-the-pin` | **Nothing.** PA15 is on slides 22 and 24. **See finding 1.** |
| 27 | 30 | `sl-day12-lab6-build` | The whole system as one picture — four blocks and two supplies — which I have never seen assembled. |
| 28 | 31 | `sl-day12-build-order` | Seven stages in order, each with a stated test. The single most usable slide in the deck. |
| 29 | 32 | `sl-day12-deadband` | The knob→ADC→motor mapping with numbers, and the dead band as a named requirement. |
| 30 | 33 | `sl-day12-hazards` | Three ways to destroy hardware, plus the hot regulator. All new as *hazards*. |
| 31 | 34 | *section P6* | Says only what slide 25 said. Two dividers in a row about building. |
| 32 | 35 | `act-day12-main-loop-sketch` | Three questions I can answer on paper from slides 20–24. |
| 33 | 38 | `act-day12-stretch` | Three optional extensions. This is also what stays on the wall for the next half hour. **See finding 2.** |
| 34 | 40 | *recap* | Where I am, what Lab 6 still wants — and one bullet I cannot act on. **See finding 8.** |

### Does not earn its place

1. **[MAJOR] `act-day12-find-the-pin` (json 28) — the answer is already on the
   wall, twice.** Slide 22 (`sl-day12-naive-loop`) projects
   `#define SENSOR_PIN (1U<<15)   // the photointerrupter, on PA15 (D7)`, and
   slide 24 (`sl-day12-two-answers`) says "Take a falling-edge interrupt on
   PA15." Four and two slides later I am asked to look up "which pin is behind
   D7." I write PA15 without opening UM2953. This is the Day 10 reveal pattern
   — an exercise debriefing something the room already had — and the presenter
   note half-notices it ("*not which registers, which is Part 4's answer and is
   already given by now*") without noticing that the pin is in the same
   condition. **improve**: move the whole activity to the *opening of Part 4*,
   before `sl-day12-naive-loop`, so the lookup supplies the constant the
   listing then uses. Nothing else in Part 5 depends on its position, and the
   presenter note's own reason ("this is where PA15 is needed") is satisfied
   two slides earlier instead. If it stays in Part 5, then slide 22's comment
   has to become `// the photointerrupter's pin` and slide 24 has to say "the
   sensor's line" — but that breaks slide 24's "15 in place of 4" argument, so
   moving the activity is the cheaper fix.

2. **[MAJOR] The build block leaves the wrong slide on the wall for 35
   minutes.** After `act-day12-main-loop-sketch` (json 35) the student deck has
   exactly one more slide before the recap: `act-day12-stretch`, "*These are
   optional, for when the rpm is on your display.*" That is what a student who
   looks up at minute 20 of the build reads, while most of the room is on stage
   three of seven. Everything a stuck student needs — the build order and its
   tests, the hazards, the pin — is six to eight slides behind and gone.
   **improve**: after the sketch activity, re-project `sl-day12-build-order` as
   the build's standing slide (a second `ref` to the same table, captioned
   "*Where you are — say the stage you are on when I come round*"), and move
   `act-day12-stretch` to sit immediately before the closing recap. That also
   gives the presenter note's go-round ("*have every group say which stage of
   the build order they reached*") something on the wall to point at.

3. **[MAJOR] `sl-day12-pullup-value` (json 12) — half of it is
   `sl-day12-states` again.** Bullet 1 ("*the phototransistor can pull OUT down
   but cannot drive it up*") and bullet 2 ("*the resistor's rail is what sets
   the HIGH level, and 3.3 V is what the STM32C031C6's pins expect*") are the
   caption of the slide immediately before it, verbatim in substance — and the
   figure on that slide already labels both 3.3 V and 10 kΩ. Half the title
   ("Why 3.3 V") answers a question the previous slide answered. This is the
   family Petra cut on Day 10: a slide carrying a fact already stated, sitting
   next to a figure slide. **improve**: delete bullets 1–2, retitle to
   **"How big should the pull-up be — and which one in Lab 6?"**, and keep the
   two bullets that are new (the sizing trade-off, which is genuinely new — Day
   3 and Day 10 both gave pull-ups with no value argument — and the
   `PUPDR`-versus-external choice). That is a four-line slide, which is the
   right size for the two minutes budgeted.

4. **[MAJOR] The minus sign is required and never supplied.**
   `sl-day12-build-order`'s last row makes the acceptance test "*the same number
   appears there, with a minus sign when the motor is running in reverse*."
   `sl-day12-quadrature` tells me direction is **not** in the signal. No
   student-facing slide anywhere says where the sign *does* come from. The
   answer — from the mode the program last commanded — exists only in
   `inst-day12-pulses-to-rpm` and in a comment inside `inst-day12-main-loop-code`,
   both instructor-only, and is finally leaked as the *premise* of stretch task
   (a) after the build is over. **improve**: one bullet on
   `sl-day12-quadrature`, immediately after "nothing in this signal carries
   direction" — "*so in Lab 6 the sign has to come from the mode your program
   last commanded, not from the measurement.*" One line, and it removes the
   only place in the deck where the checklist asks for something the room was
   never told how to do.

5. **[MAJOR] `sl-day12-milliseconds` (json 22) does not say the thing I need to
   use it.** The slide is otherwise good and its symbols are fine — every
   register write carries a comment and the caption does the 12000-at-12-MHz
   arithmetic. But `SysTick` appears **nowhere else in this book** (grep: only
   `ch-motors.ptx`), so this is its first and only sighting, and the slide
   never says that `SysTickInit()` is already called for me by `SystemInit()`.
   Sitting in front of a listing containing an init function I have never
   called, about to write a loop that depends on it, the live question is "do I
   have to call this?" — and the wall does not answer. **improve**: one clause
   on the caption or a fourth code comment — "*`SystemInit()` calls
   `SysTickInit()` before `main()`; you just call `milliseconds()`.*"

6. **[MINOR] The naive loop's prediction is never answered on the wall.**
   Slide 22 asks "*After one second of this, what does `pulses` hold?*". Slide
   24 gets close ("move the read out of the 10 ms beat so the loop looks at it
   as fast as it can go") but never states the answer, which lives only in the
   presenter note and in `inst-day12-poll-or-interrupt`. This matters more than
   the usual predict-reveal, because the note itself warns that the *short*
   version of the argument ("a 100 Hz loop can't see a 60 Hz signal") is wrong
   and sticks — so the room will take away whatever it half-heard. **improve**:
   a lead line on `sl-day12-two-answers` — "*Fewer than went past, and not by a
   fixed amount: a read catches every pulse only if the gap between reads is
   shorter than the shorter of the pulse's HIGH and LOW times.*" Related
   ordering note, not a finding: the broken polled loop is projected
   immediately before the room is asked to vote poll-or-interrupt, so the vote
   is taken with a thumb on the scale; slide 24 does rehabilitate polling
   honestly, which mostly repairs it.

7. **[MINOR] `speed` appears from nowhere in `sl-day12-naive-loop`
   (json 23).** Five locals are declared on the slide (`last_sample`, `now`,
   `before`, `pulses`) and a sixth, `speed`, is assigned without ever being
   declared. It is not inherited from anywhere either — Day 7's `ADCPot.c`
   calls it `sensor_value`. The same slide is otherwise the correct answer to
   the Day 10 finding, because it `#define`s `SENSOR_PIN` in place instead of
   stripping the block to fit. **improve**: add `uint16_t speed = 0;` to the
   declarations. (`inst-day12-main-loop-code` has the same issue four times
   over — `speed`, `count`, `rpm` and `SLOTS` are all undeclared, and `SLOTS`
   is a name the room has never seen; instructor-only, so low stakes, but
   `SLOTS` at least wants a `#define SLOTS 20` line if the listing is ever
   shown.)

8. **[MINOR] The glue at both ends.** The closing recap's third bullet — "*the
   optional experiment at the end of the lab is the 50 Hz one you worked out on
   Wednesday*" — is a pointer with no content: "the 50 Hz one" has not been on
   the wall today, and a student who missed Wednesday leaves with a dangling
   reference on the last slide of the day. **improve**: name it — "*run the PWM
   at 50 Hz instead of 1.6 kHz and listen to the motor; the PSC and ARR numbers
   are Wednesday's.*" Two smaller glue items in the same family: the agenda's
   items 5 and 6 ("The whole build" / "Build") and the two dividers behind them
   are indistinguishable from the wall — rename to **"What Lab 6 asks for"** and
   **"Build it"**; and `sl-day12-diagnostics` prints its title twice (slide
   title *and* the table's own `<title>` as a line beneath it), while its
   caption — "*the first row is the one to expect if the pull-up is missing*" —
   flags row 1 as the answer to slide 7's prediction one slide before the reveal
   on slide 12. Keep the row, drop that caption sentence.

### Undefined on the wall

- `sl-day12-naive-loop` (json 23) — `speed` — last seen: **nowhere** (not
  declared on the slide; Day 7's ADC starter calls it `sensor_value`).
- `sl-day12-milliseconds` (json 22) — `SysTick`, `SysTick->LOAD`,
  `SysTick->CTRL`, `SysTick_CTRL_CLKSOURCE_Msk`, `_TICKINT_Msk`, `_ENABLE_Msk`
  — last seen: **nowhere in the course**; introduced here, deliberately and
  with inline comments on every line, so this is a first-sighting rather than a
  gap. The gap is operational, not lexical: see finding 5.
- `sl-day12-lab6-build` (json 30) — the figure's Nucleo silkscreen. The
  presenter note says not to read pin names off it because they are too small
  to project. From the room that reads as a crop: the picture is captioned as
  the whole system but I cannot resolve its labels. Nothing to fix if the
  build-order slide carries every name as text, which it does — but the slide
  caption could say so ("*pin names are on the next slide*").
- Everything else resolves: `SENSOR_PIN` (defined in place), `milliseconds()`
  (slide 21), `start_conversion()` / `adc_read()` (Day 7, `ADCPot.c`),
  `GPIOA->IDR` (Day 3), `delay_ms()` (Day 2), `PUPDR` (Day 3, named on the
  slide), `EXTI4_15_IRQHandler` / `EXTI_EXTICR4` / `EXTI_FTSR1` / `volatile` /
  `counterResetButtonInt.c` (Day 9), `PPS` and `N` (the Before Class reading),
  `tb6612.c` and PA5/PA6/PA7 (Day 11/11x), 1.6 kHz (Day 11x).

### Tasks I could not do

None. Every `<task>` and prompt in the student deck produced something I could
write down:

- `task-day12-one-line` — "I can explain `TIM14->CCR1 = speed;`; I cannot
  explain the `PSC` line."
- `task-day12-count-slots` — "20." (The reading already says 20; the task is
  explicitly a verification and says so.)
- `task-day12-detect` — "Read the pin in the loop; take a GPIO interrupt like
  Day 9's button; let a timer count it." Answerable from Day 9 alone, and
  correctly left unruled here.
- `task-day12-convert` — my measured rate ÷ 20 × 60.
- `task-day12-direction` — "No — every slot looks the same. You'd need a second
  sensor."
- `act-day12-poll-or-interrupt` — "Interrupt, because the loop also has to do
  ADC and I2C and I don't want to promise never to block."
- `task-day12-sketch-rates` — "every pass: nothing, the ISR counts; every
  10 ms by `milliseconds()`: ADC → mode+PWM → driver; every 1 s by
  `milliseconds()`: read count → ×60/20 → display → reset."
- `task-day12-sketch-window` — "read and zero at the same moment; a pulse
  arriving between them is lost."
- `task-day12-sketch-shared` — "`volatile`, as on Day 9."
- `task-day12-d7` — "PA15" — but see finding 1: I write it from slide 22, not
  from the table.

---

## learner-anxious-nonhardware

### Verdict: MAJOR

Real ground was gained since Gate 1 — the diagnostics table and the hazard paragraph
are both genuinely good, in-register work. But **two things the hand-off claimed were
fixed are not in the file**, and the day still has one moment where "nothing happens"
has no next step. Every claim was tested against `source/ch-motors.ptx` rather than
trusted.

**Where it still becomes frightening rather than difficult — two moments.**

*The Part 1 re-entry point that was claimed and is not there.* The write-down is real;
**the pointer is not.** There is no `<xref>`, no sentence and no note anywhere in
`subsec-day12-driver-questions` telling a student who can explain nothing that the
full walkthrough already exists in `sec-motors-day11x`. This is what P-2 exists to
prevent, and it is worse than a missing scaffold because I was told it was there.

*Six build stages with a pass line and no fault line.* `table-day12-build-order` gives
"it is working when" for seven stages, and only one of them — the photointerrupter —
has anywhere to go if it is **not** working. If the regulator reads 0 V, I now know
*that* something is wrong, which is real progress over Gate 1, but not *where to
look*, and that not-knowing is what makes me stop touching it.

**The hazard paragraph.** The register is right. *"Three things about this circuit are
worth being careful with, because they are the ones that damage hardware rather than
simply not working"* draws exactly the line I need — falsifiable, a fact rather than a
mood. No reassurance theater; B-12 is satisfied. **But the paragraph and the slide
disagree**: the paragraph says "three" and lists three, and the slide has a **fourth**
— the regulator running hot, and what to do about it. That is the single most useful
sentence in the day for someone like me, and it exists **only where the room can hear
it read aloud**.

**The diagnostics table** gets me unstuck, and I have nothing to add to it — it is
scoped correctly and complete for what it covers, and its fourth row catches the trap
specific to this activity. My only note is that it is the **only** table like it in the
day, and the build needed one more, or a sentence pointing back to its method.

**The 35-minute build** is more survivable than at Gate 1, but the survival depends on
a sentence that is only in a **presenter note**: that getting the rpm onto the screen
is a milestone independent of the display, so nobody spends the evening stuck on I2C
with nothing to show. Nothing student-facing says that today's build **is** Lab 6's
build and continues after class. This is not a request for comfort — it is a request
for a fact the presenter note already has.

**The close.** *(Partially corrected by the orchestrating session: the close does
exist, as the deck's final `recap` glue slide, "Where you are, and what is left". The
reviewer checked only `source/ch-motors.ptx`, where it correctly found nothing. The
substantive half of the finding stands — the book carries no record of it, and the
mechanism is a spoken status round.)* When it is written, make the first move an
**individual, private note** — mirroring Part 1's pattern — not a spoken round that
makes a behind student's position public. That is the difference between a checkpoint
and a roll call.

**Tone.** One instance, in the reading: *"that makes the arithmetic easy enough to do
in your head"* tells the student a task is easy rather than stating the fact that makes
it simpler. Nothing else assumes delight, and nothing anywhere states what the day does
**not** involve.

### Findings

- **[MAJOR] [P-2]** The claimed re-entry pointer from Part 1 to `sec-motors-day11x` **does not exist in the source** — only the write-down does. Add one sentence.
- **[MAJOR] [P-1, B-9]** The hazard paragraph says "three things" and the slide has **four**. The fourth — the regulator running hot — is the most useful line in the day and exists only on the wall. Add it to the paragraph.
- **[MAJOR] [P-14, P-2]** **Six of the seven build stages have a pass condition and no fault line.** At minimum, point each stage back to the method Part 2 already taught: power first, then the signal path.
- **[MAJOR] [P-2, B-4]** The close has no presence in the book. When authored, its first move should be an individual private note, not a spoken status round.
- **[MINOR] [P-14]** The fact that removes most of my fear about the open build is confined to a presenter note. State once, in the book, that today's build is Lab 6's own and continues after class.
- **[MINOR] [B-12]** *"easy enough to do in your head"* — state the round multiplier and let the reader judge.

---

## learner-firstgen-novice

### Verdict: MAJOR

**Could I do the reading?** Yes, and I would arrive able to answer all three reading
questions. The sensor is introduced with a real mechanism, the PPS→RPM derivation is
built one unit conversion at a time with concrete numbers, and the reading never asks
me to hold a register or a wiring diagram in my head — it stays where B-2 asks.

**Where I get lost first — Part 4**, at *"This has been in every project you have built
this term, in `sysinit.c`, and we have never opened it."* I would read
`SysTick->LOAD`, `SysTick_CTRL_CLKSOURCE_Msk` and `SysTick_CTRL_TICKINT_Msk`
immediately after with **no idea what SysTick physically is**. The caption says it
"counts down from 12000 at 12 MHz", which describes the behavior of a thing I have
never been told exists. The one sentence that would connect it to something I know —
*"it is a timer interrupt, exactly like the one we set up on Day 8"* — is in the
presenter's note, not in anything I can read.

**Vocabulary.** All five Gate 1 gaps are fixed. Open-collector / open-drain is fixed
*well*: the reveal figure never uses either word, it just says the transistor can pull
OUT down and has no way to drive it up, which I can follow with no prior term at all.
Dead band is defined in the same sentence that names it. PPS is expanded at first use.
Quadrature is defined in line. `volatile`, `EXTI`, `PUPDR`, duty cycle and alternate
function are all taught earlier and referenced by day and register name. **SysTick is
the new gap.**

**The diagnostics table** is concrete and actionable even before I understand why —
*"check the resistor and the rail it goes to"* is something I can do with my hands. But
I would not be looking at it at the right moment: it sits before
`fig-photointerrupter-states`, so I am told "nothing is pulling the line up" before I
have been told what a pull-up does. I can follow the instruction without understanding
my own circuit.

**The build.** The "it is working when" column is exactly the scaffold I need — a
testable, physically observable checkpoint at every stage, tested with the motor
disconnected first. One worry: *"9 V on its input side and 5 V on its output side, on
the multimeter"* assumes I know how to set a multimeter to DC volts and where to put
the probes. It is the one row that says what the answer should be without saying how
to check.

**Tone.** No complaints. Nothing made me feel behind. The SysTick moment is a content
gap, not a tone problem — it is not condescending, it is a missing sentence.

### Findings

- **[MAJOR] [P-1, P-7]** **SysTick is introduced entirely through register names.** It is used **nowhere else in the book** — `grep -r SysTick source/*.ptx` returns only `ch-motors.ptx` — and no student-visible sentence says what it is (a countdown timer built into the processor core, distinct from TIM14) or why it counts down from 12000. The only connecting sentence is in a `presenterNote`, spoken and never printed.
- **[MINOR] [P-2, P-14]** `task-day12-detect` is a fully open brainstorm with no worked example or nudge. Staying open is right, but a one-clause nudge that costs a confident student nothing — *think about how the button press was noticed on Day 9* — would rescue the student staring at a blank page.
- **[MINOR, confirming]** `table-day12-diagnostics` precedes the figure it depends on. Listed only to confirm that this is a real novice-facing effect and not merely a structural one.

## checker-voice

Read in order before the draft: `sec-motors-day11` and `sec-motors-day11x` in the
same file (both through her hand), `plans/day10-voice-reference.diff`,
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`,
`plans/day11x-handover.md`, `AUTHORING-book.md` S-11…S-29 / L-12…L-16,
`AUTHORING-slides.md` § "What no rule covers". Reuse pass run against
`assets/ClassSlidesOLD/Day12-Motors(3).pptx` (all 10 slides, speaker notes
included) and `Day11x-Motors(2).pptx` slides 19–21. Gate 1.5's seven rewrites
re-checked as applied, not re-derived.

### Verdict: MAJOR

### Register — is this her?

The prose is. Every unit opening passes, the day's introduction is the same shape
as her own Day 11x opening, "we" carries the class's work throughout, there is no
reassurance theater anywhere in 1,050 lines, no time budget outside a `<note>`,
no weekday doing the teaching, and the hazards paragraph and the
`fig-photointerrupter-states` caption are as good as anything in the chapter.
**The deck glue is not.** Seven of the JSON `title`s are epigrams rather than
names — "Both work. One of them stops being your problem", "Three jobs, three
rates, one loop", "What this signal cannot tell us" — which is exactly where the
Day 9x pass found it: ~~"Four wires, and 3.3 V not 5 V"~~ → **"Wire up your
display"**. Three body passages carry the same compression: the wiring caption
ends on a manufactured aphorism (*"a signal we have not looked at is a signal we
cannot debug"*), `sl-day12-two-answers` on *"it costs a promise"* and *"this
course goes with"* — the second of which she rewrote by hand on Day 10,
~~"the same kind of layer this course has been handing you all term"~~ →
**"the same kind of layer we have been handing you all term"**. Localized, not
systemic, so this is not the "you are not speaking in my voice" case — but the
titles are what she reads as a list.

### Rewrites

- [MAJOR] `assets/decks/day12.json` — seven `title`s, one pattern — [S-18, failure 2]

    Read as a list, these are the tell. A title says what the slide **is**.

    | line | draft | hers |
    | --- | --- | --- |
    | 63 | "Wire the sensor — the output stops at the breadboard" | **"Wire up the photointerrupter"** |
    | 69 | "If yours is the one on a cable" | **"Wiring the photointerrupter that comes on a cable"** |
    | 133 | "What this signal cannot tell us" | **"Direction, and the quadrature encoder"** |
    | 153 | "Three jobs, three rates, one loop" | **"A loop that does three things at three rates"** (the Part's own title) |
    | 171 | "Your call: poll or interrupt?" | **"Poll or interrupt?"** (the activity's own title) |
    | 179 | "Both work. One of them stops being your problem" | **"Two answers, and the one we'll go with"** |
    | 231 | "Three wires to get right before you apply power" | **"The supply rails, the grounds, and the potentiometer"** |

    because: ~~"Four wires, and 3.3 V not 5 V"~~ → **"Wire up your display"**;
    ~~"Run it: Blinky that never waits"~~ → **"Run it: Blinky with a (polled)
    timer and without `delay_ms()`"**; ~~"LED not blinking? The ladder"~~ →
    **"LED not blinking? Steps to help you diagnose the fault"**;
    ~~"The mechanism, resurfaced"~~ → **"Review: The interrupt mechanism"**. Four
    separate title fixes in the Day 8 pass alone, all in the same direction:
    name, not epigram; longer, not shorter. Three specifics: 63's tail is the
    "not-that" qualifier of the Day 9x pair; 133 names the slide by what is
    absent, which is failure 1 in a title; 231 is a count used as rhetoric over a
    four-bullet slide whose fourth bullet is not a wire — she deleted
    ~~"Three things follow from sharing the wires"~~ rather than correcting the
    number. Note also that 179 and 171 are the only two titles in the deck with a
    second-person address in them ("your problem", "Your call"), which is the
    L-10 family the linter cannot see.

- [MAJOR] `source/ch-motors.ptx:2598–2600` — [failure 2, S-23, reuse of her Day 12 slide 6]

    draft:
    > "The output wire stops there — it does not go to the Nucleo today (the
    > orange arrow), because a signal we have not looked at is a signal we cannot
    > debug."

    hers:
    > "The output wire stops there — today it does not go to the Nucleo (the
    > orange arrow), because we'll look at its signal with the oscilloscope
    > first, before it goes anywhere near a pin."

    because: her own slide 6 says it plainly, twice — the slide body, *"Don't
    wire the signal wire into the Nucleo yet. We'll observe its signal with the
    oscilloscope."*, and the note, *"Don't wire the signal wire (orange in this
    picture, white in your setup) into the Arduino yet. For now, just wire power
    and ground… We'll observe the signal on the orange wire with Scopy."* The
    draft replaces her reason with an aphorism, which is the pattern of
    ~~"The direct approach is not short by a little."~~ → *she deleted it*, and
    the aphorism is also the book explaining its own teaching strategy (S-23:
    ~~"We do this deliberately: we ran Blinky before we explained a single
    register…"~~ → deleted whole). The engineering claim is unchanged by the
    rewrite; only the frame goes.

- [MAJOR] `source/ch-motors.ptx:2943–2945` (`sl-day12-two-answers`) — [S-29, L-15, S-11, S-13]

    draft:
    > "<term>Read the pin every pass.</term> Move the read out of the 10 ms beat
    > so the loop looks at it as fast as it can go, and use `milliseconds()` only
    > to decide when to sample the potentiometer and when to close the one-second
    > counting window. This works, and it costs a promise: nothing anywhere in
    > the loop may ever block, for as long as the program lives."
    > …
    > "The second one is the one this course goes with, and the reason is not the
    > arithmetic."

    hers:
    > "One answer is to read the pin on every pass of the loop. Move the read out
    > of the 10 ms beat so the loop looks at the pin as fast as it can go, and use
    > `milliseconds()` only to decide when to sample the potentiometer and when to
    > close the one-second counting window. This works, and what it costs is a
    > standing constraint on the rest of the program: no line anywhere in the loop
    > may ever block, for as long as the program is running."
    > …
    > "The second answer is the one we'll go with, and the reason is not the
    > arithmetic."

    because: three separate specimen moves. **S-29** — `<term>Read the pin every
    pass.</term>` is a five-word bold sentence ending in a full stop, which is
    her *"I really don't like those. Can these become regular bullets?"*; same
    for `<term>Take a falling-edge interrupt on PA15.</term>` in the next bullet
    and for `<term>Both answers are correct, and one of them is better for a
    reason that is not about this motor.</term>` at 2967, which is a
    seventeen-word bolded sentence. **L-15** — "for as long as the program lives"
    is the banned verb applied to software; *"apply everywhere"* was her
    instruction. **S-11** — "it costs a promise" is a metaphor used as the label
    for the thing, which the reader must decode; her own instructor block two
    paragraphs later already says it plainly, *"a standing constraint on every
    line added to that loop afterwards"*. **S-13** — ~~"the same kind of layer
    this course has been handing you all term"~~ → **"the same kind of layer we
    have been handing you all term"**, and ~~"which is the order this course
    usually takes"~~ → deleted. The course does not act; **we** do.

- [MAJOR] `source/ch-motors.ptx:2687–2695` (`sl-day12-pullup-value`, bullets 1 and 2) — [failure 7]

    draft (bullets 1–2):
    > "Why a resistor at all: the phototransistor can pull OUT down but cannot
    > drive it up, so something has to hold the line up when it lets go."
    > "Why it goes to 3.3 V: the resistor's rail is what sets the HIGH level, and
    > 3.3 V is what the STM32C031C6's pins expect."

    hers: **DELETE both.** The slide keeps bullets 3 and 4 and gains a lead
    sentence: *"The value of the pull-up is a trade-off rather than a
    calculation."* Retitle the deck entry at line 95 from "Why 3.3 V, and why
    about 10 kΩ" to **"Why about 10 kΩ"**.

    because: the slide immediately before it, `sl-day12-states`, has the caption
    *"The phototransistor can only pull OUT down. Whatever the resistor is tied
    to is what sets the HIGH level."* — the same two facts, in the same order,
    one slide earlier, over the figure that proves them. This is her Day 9x
    deletion exactly: the activity's *"Wire the display: + to 3.3 V, − to GND…"*
    went because the wiring slide immediately preceding said exactly that.
    Nothing is lost: bullet 3 (the value trade-off) and bullet 4 (the internal
    pull-up in Lab 6) are the only new content on the slide, and bullet 3 is what
    her Day 12 slide 6 note gestures at and never gets to.

- [MAJOR] six student-facing tasks ask a student to **say** something — [Day 11x rule 1]

    | line | draft | hers |
    | --- | --- | --- |
    | 2760 | "…and **say** what each one would cost the rest of the program." | "…and **work out** what each one would cost the rest of the program." |
    | 2771 | "If you can, **say** how; if you cannot, **say** what would have to be different about the sensor." | "If you can, **describe** how; if you cannot, **describe** what would have to be different about the sensor." |
    | 3245 | "…and **say** what the display would show." | "…and **work out** what the display would show." |
    | 3253 | "…and **say** precisely what a program would have to look at to tell them apart." | "…and **describe** precisely what a program would have to look at to tell them apart." |
    | 3261 | "…and **say** what each one costs and where each one wins." | "…and **work out** what each one costs and where each one wins." |

    because: `plans/day11x-handover.md`, "Voice rules this day added" — *"No
    asking a student to **say** something — describe, work out."* Her own Day 10
    pass makes the same move in the other direction, ~~"write down — not just
    say — what each of `i2c1_memWrite()`'s four arguments has to be"~~ → **"write
    down what each of…"**. Mechanical and complete: these are all six occurrences
    of a bare "say" in student-facing text in the two sections; every other hit
    is inside a `<note>`.

- [MAJOR] `source/ch-motors.ptx:2925` and `3072` — internal cross-references in student-facing text — [failure 4]

    draft (`sl-day12-naive-loop` bullet):
    > "Your motor at the top of the ramp gives the pulse rate you measured in
    > Part 2."

    hers:
    > "Your motor at the top of the ramp gives the pulse rate you measured on the
    > oscilloscope earlier today."

    draft (`table-day12-build-order`, last-but-two row):
    > "The trace toggles once per slot, as it did in Part 2"

    hers:
    > "The trace toggles once per slot, as it did when you first put the scope on
    > it"

    because: ~~"The AD2 in the picture is for Part 3b."~~ → **"…We'll use the AD2
    in a bit."** "Part N" is the lesson plan's own numbering; a student who is
    looking at the slide does not have it. Both hits are on projected,
    student-facing surfaces. The remaining four "Part N" hits are inside
    `<instructor>` blocks and are listed separately below.

- [MAJOR] `source/ch-motors.ptx:2616–2619` (`task-day12-wire`) — [failure 7, reuse of her Exercise #1]

    draft:
    > "Wire the photointerrupter's power and ground, and run its output to a row
    > of its own on the breadboard. Put the 10 kΩ resistor between that row and
    > 3.3 V."

    hers:
    > "Wire the photointerrupter to your setup as in the picture, with its output
    > running to a row of its own on the breadboard."

    because: the slide immediately in front of it in the deck,
    `sl-day12-wiring`, is *"a 10 kΩ resistor from the sensor's output up to
    3.3 V"* over the figure, and the figure caption says it a third time. Same
    deletion as the Day 9x wiring task. Her own wording for the whole activity is
    three sentences on her slide 6 — *"Wire the photointerrupter to your setup.
    Connect the AD2 to monitor the photointerrupter output using Waveforms. Run
    `TTmotor_ramp.c`, observe the photointerrupter signal on the oscilloscope as
    the motor changes speed."* — which is tasks 1–3 of this activity; adopt hers
    and keep the draft's fourth task, which is new and is what Parts 3 and 4
    need. Nothing technical is lost: the resistor value survives on the slide,
    the caption and the diagnostics table.

- [MAJOR] `source/ch-motors.ptx:2751` and `3160–3161` — activity introductions open on fragments — [L-16, S-... Day 10 pair]

    draft: "On paper, with your table group."
    hers:  **"Start on paper, and work through these with your table group."**

    draft: "On paper, before the keyboard. Your program has to do three things at
    three different rates."
    hers:  **"Start on paper, before you go to the keyboard. Your program has to
    do three things at three different rates."**

    because: this is a specimen pair, not an inference — ~~"On paper, before any
    of this is code."~~ → **"Start on paper, not by writing code."** She fixed
    this exact fragment, in this exact position, by hand.

- [MINOR] `source/ch-motors.ptx:2799` (`sl-day12-quadrature`, bullet 3) — [L-15, reuse of her slide 21]

    draft:
    > "Some sensors do all of this decoding in hardware and hand you the answer
    > over a bus — over I2C, for instance, which you already have working."

    hers:
    > "Some sensors do all of this decoding in hardware and present the result
    > over a bus — over I2C (Inter-Integrated Circuit), for instance, which you
    > already have working."

    because: two things at once. L-15 — *"any verb that gives a register hands"*;
    "hand you the answer" is that verb, and her own sentence for this exact
    bullet avoids it: Day 11x slide 21, *"Some sensors do the decoding in
    hardware, **present a result**, e.g., via I2C."* And I2C is used bare here
    and at 3032 and is never expanded anywhere in `ch-motors.ptx` — she added
    ~~"the two wires of an I2C bus"~~ → **"an I2C (Inter-Integrated Circuit)
    bus"** by hand.

- [MINOR] `source/ch-motors.ptx:2944` (`sl-day12-two-answers`, bullet 2) — [S-12, failure 5]

    draft:
    > "The port selection is in `EXTI_EXTICR4`, which the Reference Manual gives
    > in section 12.5.9."

    hers:
    > "The port selection is in `EXTI_EXTICR4` — EXTI is the extended interrupt
    > and event controller we used for the button on Day 9 — which the Reference
    > Manual gives in section 12.5.9."

    because: EXTI's first appearance in this chapter is this bullet, and it is
    bare. ~~`PB9 (SDA)`~~ → **`PB9 (SDA — serial data)`**; ~~"the header"~~ →
    **"the Arduino header"**. L-14 is already satisfied here and is right — this
    is the only register citation in the two sections and it names the Reference
    Manual, so nothing else on L-14 to report.

- [MINOR] `source/ch-motors.ptx:2879` (`sl-day12-milliseconds`, lead) — [S-27, S-26]

    draft:
    > "This has been in every project you have built this term, in `sysinit.c`,
    > and we have never opened it."

    hers:
    > "This has been in every project you have built this term, in `sysinit.c`,
    > and we have never opened it. SysTick is a counter built into the processor
    > core itself rather than a peripheral like TIM14, and it is what
    > `delay_ms()` has been reading all term."

    because: S-27 is the move most of her Day 10 insertions make — "`PE` is
    cleared before `TIMINGR`" → **"`PE`, **which enables the peripheral**, is
    cleared before `TIMINGR`"**. "SysTick" appears four times in the listing and
    is never said to be anything. Two of the three facts are already in the
    slide's own `<note>`, which is the wrong side of the wall for them.

- [MINOR] `source/ch-motors.ptx:2324` — [failure 2]

    draft:  "Everything else is a matter of units."
    hers:   "The rest of the conversion is a matter of units, and we'll do it in
            two steps."

    because: a four-word closer that carries no content is the register of
    ~~"The direct approach is not short by a little."~~, which she deleted. The
    rewrite is longer and says what the next paragraph is going to do, which is
    her habit at a subsection seam ("We'll start with the display and its
    controller, then we'll focus on…").

- [MINOR] `source/ch-motors.ptx:3128` — [S-28, count against the slide]

    draft:
    > "Three things about this circuit are worth being careful with, because they
    > are the ones that damage hardware rather than simply not working."

    hers:
    > "A few things about this circuit are worth being careful with, because
    > getting them wrong damages hardware rather than simply not working."

    because: the slide this paragraph condenses, `sl-day12-hazards`, carries
    **four** bullets — the fourth is the regulator getting hot, which is not one
    of the three. ~~"Three rows are all we need"~~ → **"For now we mostly care
    about the rows named *System setup*, *Display setup* and *Dimming set*"**,
    and ~~"Two things to take from a failed transaction. The first is…"~~ →
    **"A few notes about a failed transaction:"**. Fix the frame, not the number
    — and this then survives the deck title fix above without a second edit.

- [MINOR] `source/ch-motors.ptx:2844` (`sl-day12-three-rates`, bullet 2) — [Day 11x rule 2]

    draft:  "…which is the same problem we watched a polled button counter have
            on Day 9."
    hers:   "…which is the same problem we saw with the polled button counter on
            Day 9."

    because: *"No figurative verbs for what the class did with a component…  Her
    own forms: 'As we saw in the reading', 'the function we wrote on Day 10',
    'the same timer we set up on Day 8.'"* "watched a counter have a problem" is
    not one of them.

- [MINOR] `source/ch-motors.ptx:3085` (`sl-day12-build-order` caption) — [S-23]

    draft:  "…The last two are firmware only, and the display is deliberately
            last."
    hers:   "…The last two are firmware only, and the display comes last because
            the rpm is already on your screen by then."

    because: "deliberately" is the book explaining its own lesson design to the
    student — ~~"Two things were given to you today rather than explained, both
    deliberately."~~ → **"Today you were given the I2C library without much
    explanation of the code therein."** The reason is already in the slide's
    `<note>`; move it to the caption and the word is not needed.

- [MINOR] four `<instructor>` blocks carry lesson-design and minute counts, and
  they project — [S-23, L-8, failure 4]

    - 2733 `inst-day12-wire-and-scope`: "it is theirs to measure rather than ours
      to state. What matters is that they write it down: **Part 3** turns it into
      rpm and **Part 4** uses it to decide how the pulses get counted."
      → **"Whatever they measured is the number to keep: it becomes an rpm later
      today, and it decides how the pulses get counted."** Move the Part
      references and the reason into the deck's `presenterNote` for this slide,
      which already exists.
    - 2811 `inst-day12-pulses-to-rpm`: "Leave this open — **Part 4** is where it
      gets settled." and "Having them count it rather than take it from the
      handout is worth the **thirty seconds**."
      → both belong in the deck `presenterNote` at line 108, which already says
      *"stays OPEN here… Part 4 settles it."* The block itself should open on the
      answer: **"The slot count is twenty, on the wheels in the kit, which is the
      number the expression in Lab 6 uses."**
    - 2816 same block: "use a timer's input capture, which **this course** has not
      taught" → **"…which we have not covered"** (the S-13 pair above).
    - 3021 `inst-day12-find-the-pin`: "the lookup is a **two-minute job** that
      saves a wrong guess in the lab, which is the whole reason for doing it in
      the room rather than printing the answer."
      → **DELETE the clause**, keep the sentence before it. What is lost is the
      instructor's cue, which belongs in the deck note at line 200.
    - 2973 `inst-day12-poll-or-interrupt`: "it is the one **the chapter's
      objectives commit to**" → **"and it is the one we'll use for the rest of
      this chapter."** (L-13: a document does not act; and the book does not cite
      its own objectives at a student.)

    because: her passed Day 11 instructor blocks do address the instructor
    directly — *"One thing to expect and to mention"*, *"This is the row where
    the simplified bridge would have misled them"* — so third-person "them" is
    **not** the finding and I am not reporting it. What is absent from every one
    of her passed blocks is a minute count, a "Part N", and a sentence explaining
    why the exercise is being run at all. Those are the four above, and every one
    of these blocks is a `ref` in `day12.json` with `"instructor": true`, so they
    go on the wall.

- [MINOR] four instructor paragraphs open on a fragment — [L-16]

    - 3018 "Two things worth naming while the table is open." → **"Two things are
      worth naming while the table is open."**
    - 3203 "A worked shape, not the only one, and not code to hand out:" →
      **"Here is one worked shape. It is not the only one, and it is not code to
      hand out:"**
    - 3181–3186 "Every pass: nothing, if the pulses are being counted by the
      interrupt… Every 10 ms, decided by `milliseconds()`: read the ADC…  Once a
      second, decided by `milliseconds()` again: take the pulse count…" →
      **"On every pass the loop does nothing about the pulses, because the
      interrupt is counting them — which is the point of using one. Every 10 ms,
      timed by `milliseconds()`, it reads the ADC, maps the reading to a mode and
      a PWM value, and calls the driver. Once a second, timed by
      `milliseconds()` again, it takes the pulse count, converts it to rpm, sends
      it to the display, and starts the next window."**
    - 2607–2608 `sl-day12-wiring` bullets 1–2: "Blue arrow: a 10 kΩ resistor from
      the sensor's output up to 3.3 V." → **"The blue arrow marks the 10 kΩ
      resistor, which runs from the sensor's output up to 3.3 V."**; "Orange
      arrow: the output wire stops at the breadboard." → **"The orange arrow
      marks where the output wire stops: at the breadboard, and not in the Nucleo
      today."**

    because: *"not a complete sentence — use only complete sentences"* and
    *"sentence fragment"*, Petra on two of these in one Day 11x pass, fixed to
    "Then **come** the timer's own numbers." / "**This is** the part that makes
    it a PWM channel." Figure labels and table cells are L-12-exempt; a slide
    bullet and an instructor paragraph are not. `sl-day12-cabled-sensor`'s colour
    key is **not** reported — terse parallel items in a key are the L-12
    exemption, and that list is her slide 7's own.

- [MINOR] `assets/decks/day12.json:279` (closing recap, item 2) — [L-12/L-16]

    draft:
    > "For Lab 6: the tb6612 driver, the potentiometer mapped to a mode and a
    > speed, the pulse counter on PA15, and the rpm on the display."

    hers:
    > "For Lab 6 you'll write the `tb6612.c` driver, map the potentiometer to a
    > mode and a speed, count the pulses on PA15, and put the rpm on the
    > display."

    because: her rewrite of the Day 8 video recap turns exactly this kind of
    telegraphic item into sentences — ~~"Your ISR: exact name, quick in and out,
    volatile on anything shared."~~ → **"The ISR (interrupt service routine) is
    code you write and to which the processor jumps at the time the interrupt
    fires."** plus **"Important about the ISR: exact name, quick in and out,
    volatile on anything shared."** The recap is the last thing on the wall.

- [MINOR] `assets/decks/day12.json:75` — [S-18, consistency with the source]

    draft:  "Wire it, scope it, and measure the pulse rate"
    hers:   "Wire the sensor, and watch it while the motor ramps" (the activity's
            own `<title>`, which the book already carries)

    because: the deck title and the activity title should not be two different
    sentences for the same block — and the three-verb parallel is the rhythm of
    ~~"Today: the two wires. Thursday: the chip at the end of them."~~ The
    measurement is task 4 and does not have to be in the title.

- [MINOR] `source/ch-motors.ptx:2967` and `3289`, `3301` — [failure 2, in the
  instructor answers]

    - 2967 `<term>Both answers are correct, and one of them is better for a reason
      that is not about this motor.</term>` → drop the `<term>` (S-29) and make it
      a plain lead sentence.
    - 3289 "That trade is the whole of it." → **"That is the whole of the
      trade-off: resolution against how quickly the display responds."** ("the
      whole point" / "the whole of it" is on the Day 9x banned list.)
    - 3301 "So counting wins at speed and interval-timing wins at rest, and a real
      instrument does both and crosses over." → **"So counting is the better
      method at high speed and timing the interval is better at low speed, and a
      real instrument does both and switches between them at some threshold
      speed."**
    - 3190 "small, but worth having noticed rather than discovered." →
      **"small, but worth knowing about in advance rather than finding it in the
      readings later."**

### Sweeps

- **Unit openings checked: 11 — failing: 0.**
  `sec-speed-before-class` intro (2252, "On Wednesday we set the motor's speed,
  but we could not yet measure it."), `subsec-speed-sensor` (2270),
  `subsec-speed-rpm` (2321), `sec-motors-day12` intro (2537, "On Wednesday we
  read `TTmotor_ramp.c` one register at a time"), and the first student-facing
  text of Parts 1–6 (2556, 2585, 2751, 2843, 2997, 3160). None opens on what is
  absent; none states what the day does *not* involve (Day 11x rule 3 clean).
  Parts 3 and 6 open on a fragment and are rewritten above, but the *content* of
  the opening is right in all eleven. The Day 12 introduction is the strongest
  paragraph in the draft and matches her own Day 11x opening beat for beat.
- **Slide titles: 32 read as a list (2 recap, 1 agenda, 6 section, 23 `ref`) —
  epigrams rather than names: 7**, plus one inconsistency: lines 63, 69, 133,
  153, 171, 179, 231, and 75. All eight rewritten above. The six `section` titles
  and the two `recap` titles are clean and match the subsection titles.
- **Weekday or course-period as grammatical actor: 0** (S-20). Swept: "On
  Wednesday we set…", "at the end of Wednesday's class" (possessive naming a real
  session — permitted), "On Wednesday we read…", "Today we'll find out…", "the
  one you built on Wednesday", "what you wired on Wednesday", "Today it is the
  external one", "it does not go to the Nucleo today", "earlier today", "twice
  more today". Every one is an adverbial or a permitted possessive. **One
  course-as-actor found instead**, which S-20 generalizes to: "the one **this
  course** goes with" (2945) and "which **this course** has not taught" (2816) —
  both rewritten above against her ~~"this course has been handing you"~~ →
  **"we have been handing you"**.
- **"N, and it is the one that…" armature: 0** (S-21). Nearest miss is "The
  second one is the one this course goes with, and the reason is not the
  arithmetic" (2945) — the subject arrives first, so it is not the armature; it is
  reported above for "this course" and for the not-X-but-Y tail.
- **Count used as rhetoric: 2** — "Three things about this circuit…" against a
  four-bullet slide (3128), and the deck title "Three wires to get right…" over
  the same four bullets (JSON 231). Both rewritten. `sl-day12-three-rates`'s
  "three jobs… three different rates" is **not** reported: the count is the
  content there, and the three are then named.
- **"we" in class-work sentences: 30 "we" against 41 that are "you"-only, out of
  ~229 sentences in student-facing text.** Every one of the 41 is the student's
  own work or the student's own hardware, which is S-13-correct ("Count the slots
  on your own wheel", "the pulse rate you measured", "your kit"). I found **no**
  class activity narrated impersonally. The remaining sentences are the reading
  questions' feedback and the diagnostics table, both correctly impersonal.
- **Acronyms first-used without expansion, complete list for the two sections:**
  **I2C** (2799 slide bullet, 3032 caption — never expanded in `ch-motors.ptx`);
  **EXTI** (2944, first appearance in the chapter); **NVIC** (2979,
  instructor-only, first appearance in the chapter — expand or say "the interrupt
  controller"); **SysTick** (2856 onward — not an acronym but a name the chapter
  never says the meaning of, see the S-27 rewrite). Checked and correctly
  handled: rpm (2262), PPS (2328, `<term>` + expansion), PWM, ADC, LED,
  phototransistor, EMF, AF, STM32C031C6, TB6612, UM2953 (named as "The user
  manual for the board", S-12-correct), RM0490 (named as "the Reference Manual",
  L-14-correct), Waveforms, `EXTI4_15_IRQHandler`.
- **Design scaffolding in student-facing text: 2** — "in Part 2" at 2925
  (`sl-day12-naive-loop` bullet) and at 3072 (`table-day12-build-order` cell).
  Four more "Part N" are inside `<instructor>` blocks at 2733, 2734, 2811 and
  3233; those blocks project, so they are reported at MINOR above rather than
  passed. **Minute counts in student-facing text: 0** — all 17 occurrences of
  "≈ N min" are inside `<note>` or `presenterNote`, correctly (L-8 clean), except
  the prose "two-minute job" at 3021 in a projecting instructor block.
- **L-15 personified hardware: 2** — "for as long as the program **lives**"
  (2943) and sensors that "**hand you** the answer" (2799). No "sits", no
  "sitting", no "located" problem, and the wiring, register and pin names in
  Parts 2, 4 and 5 were grepped individually. Two more in `<note>`s
  ("it **hands back** a number", 2899; "Lab 6 **wants** a negative rpm", 2801) —
  instructor-facing, so listed and not rewritten.
- **L-16 fragment opening a paragraph or bullet: 7** — 2607, 2608, 2751, 3018,
  3160, 3181 (three in one paragraph), 3203, plus `day12.json:279`. All rewritten
  above. `sl-day12-cabled-sensor`'s four colour bullets are exempt (L-12
  checklist exemption, and they are her slide 7's own list).
- **L-13, a document acting on a student: 0 violations.** Every Lab 6 reference
  is already in her form — "In Lab 6 you are asked to display a negative rpm"
  (2359), "In Lab 6 you are told not to use `delay_ms()`" (2845), "the same
  resistor appears in the Lab 6 wiring" (2312), "the number the expression in
  Lab 6 uses" (2347), "The same list is in the Lab 6 handout" (2703). "which is
  what Lab 6 asks for" (2906) is the permitted case — a specification asking for
  a **value**, exactly as in her own "the PWM mode the Reference Manual asked
  for". The one hit is "the chapter's objectives commit to" at 2973, above.
- **Reassurance theater: 0.** No "raise your hand", no known-good hardware, no
  "keep going", no "Still stuck?". The diagnostics table (2638) is diagnosis, not
  reassurance, and its `<note>` says so; the hot-regulator bullet at 3145 is a
  safety instruction with a mechanism, not comfort. This is the cleanest the
  corpus has been on B-12.
- **S-25 classroom management in student-facing text: 0.** Everything about who
  to ask, what to skip, what to cut for time and how to run the room is inside
  `<note>` or `presenterNote`, which is where it belongs.

### Book captions vs slide captions (B-7)

The six `<figure>` captions are full and self-contained and would survive being
read by someone who skipped the prose — `fig-photointerrupter-states` (2671) and
`fig-day12-lab6-build` (3028) are the two best things in the draft, and
`fig-rpm-formula` (2336) says what each factor converts, which is her S-27 move.
`fig-day12-wiring` (2593) is the one exception and is rewritten above; the fault
is the closing aphorism, not the length. The nine `<slide>` `<caption>`s are all
one instructive line and none of them merely restates its title. The one
duplication is not caption-to-title but slide-to-slide: `sl-day12-states`'s
caption and `sl-day12-pullup-value`'s first two bullets, above.

On the B-7 test itself — is the `<slide>` block the same writer as the prose it
condenses? The clearest pair in the draft is Part 5's hazards paragraph (3127,
plainly hers: long, causal, "because they are the ones that damage hardware
rather than simply not working") beside `sl-day12-hazards` and its deck title
"Three wires to get right before you apply power". Same content, two different
writers. Fixing the title and the count sentence closes it. Every other
slide/source pair reads as one voice.

### Already written — reuse instead of invent

- **`act-day12-wire-and-scope`, tasks 1–3** (2616–2630) — she already wrote them:
  Day 12 deck, slide 6 — *"Wire the photointerrupter to your setup. Connect the
  AD2 to monitor the photointerrupter output using Waveforms. Run
  `TTmotor_ramp.c`, observe the photointerrupter signal on the oscilloscope as
  the motor changes speed."* Task 4 (measure the rate) is a genuine addition and
  should stay — the day needs the number three times.
- **`fig-day12-wiring` caption, the "output stops here" clause** (2598) — she
  already wrote it: Day 12 deck, slide 6 body and note — *"Don't wire the signal
  wire into the Nucleo yet. We'll observe its signal with the oscilloscope."*
- **`sl-day12-pullup-value`, bullet 4** (2692) — she already wrote it: slide 6
  note — *"Later, when you wire it to the Nucleo you can simply enable the
  pull-up on that pin."* The draft's version is hers plus the `PUPDR` and Day 3
  pointer, which is an improvement; keep the draft's.
- **`sl-day12-quadrature`, bullet 3** (2799) — she already wrote it: Day 11x
  slide 21 — *"Some sensors do the decoding in hardware, **present a result**,
  e.g., via I2C."* The draft's "hand you the answer" is an L-15 reinvention of a
  sentence that was already correct.
- **`act-day12-driver-questions`, task 2** (2562) — she already wrote it: Day 12
  slide 3 — *"How does `TTmotor_ramp.c` work? Do you understand all of the
  register bits that are set? What questions do you have about the code?"* Her
  three questions are cleaner than "work through how the program runs: what
  happens in `main()`, and which register each line of the setup writes", and the
  deck already reuses her slide title ("Discuss at your table"). The draft's task
  1 — one line you can explain, one you cannot — is a real addition and is worth
  keeping in front of hers.
- **`act-day12-pulses-to-rpm`** (2748) — she wrote this activity twice, and the
  draft is missing one of her four questions. Day 12 slide 9: *"How do you detect
  the pulses on the microcontroller? **How do you count the pulses?** How do you
  convert the count to an rpm?"* Day 11x slide 20: *"Remember how to detect
  falling/rising edge of the pulse? Once you can detect those, how do you use
  that signal to find the speed of the motor (in rpm)? Is it possible to tell the
  direction in which the motor turns from the signal?"* The draft has detect,
  convert and direction; **"how do you count them"** — the variable, where it is
  incremented, over what window — is dropped here and then has to be invented
  from scratch in Part 6's sketch activity. Recommend adding it as a task between
  `task-day12-detect` and `task-day12-convert`.
- **`sl-day12-rpm` lead and `sl-day12-decoding`** (2776, 2785) — correctly hers
  already: *"Regardless of technology (mechanical, optical, magnetic), must
  translate pulse train into position / velocity information"* and the whole
  ∆θ block from slide 21, expanded into sentences. This is the reuse pass working;
  no change.
- **`sl-day12-cabled-sensor`** (2706) — hers, slide 7, including the pink-wire
  note and the pointer to the lab handout. No change.
- **`fig-day12-lab6-build` and `table-day12-build-order`** (3027, 3045) — her
  slide 10's two lists, hardware and firmware, turned into a caption and a table
  with a "It is working when" column that her slide does not have. The addition
  is an improvement and the arc is hers; no change.

### For Petra, not for me

- **What supply does the photointerrupter run from?** Still open from Gate 1.5,
  and Day 12 now depends on it in three more places: the reading says "the supply
  rail", `fig-day12-wiring` and `sl-day12-wiring` say the pull-up goes to
  **3.3 V**, and your Day 12 slide 6 says *"The photointerrupter needs a 5V
  voltage supply"* with the pull-up *"between it and the power rail"*. This is a
  technical call, not a voice one, and `checker-technical-accuracy` should own the
  number — but the wording of four student-facing sentences depends on your
  answer, so it is flagged here too.
- **The Part 1 activity: your three questions, or the draft's "one line you can
  explain, one you cannot"?** They are both good and they are both about two
  minutes. The specimens do not settle which; my recommendation above keeps both
  and puts the draft's first.
- **`<term>` as an answer-key label inside `<instructor>` blocks.** Day 12's five
  instructor blocks open each paragraph with a bolded label (`<term>The
  prediction.</term>`); your own passed Day 11 blocks use the same labels in
  **plain text** ("The table.  Increasing the friction…"). S-29 reads against the
  bold, and I have only reported the one that is a full seventeen-word sentence.
  Whether the short ones should be bold at all is yours — it is a house-style
  question that affects five blocks in this chapter and about thirty across the
  book.

## learner-visual

### Verdict: MAJOR

### Findings

- [MAJOR] [P-4, extra-emphasis] `subsec-day12-wire-and-scope` / `act-day12-predict-trace` — Part 2 opens on the wiring figure and asks students to predict the photointerrupter's trace, but nothing in Day 12's deck re-shows `fig-photointerrupter-beam` (the wheel + photointerrupter + pulse-train picture from the pre-class reading). It is never referenced again anywhere in `sec-motors-day12` or `day12.json`. A student who read it Tuesday night and forgot the picture has nothing on the wall to anchor "a slot passing the beam = one pulse" before being asked to predict a trace or, later, to count slots on their own wheel (`task-day12-count-slots`). Add a small reminder — even just the right-hand pulse-train half of that figure — to `sl-day12-wiring` or a quick recap slide immediately before the prediction activity.

- [MAJOR] [P-4] "A loop that does three things at three rates" (Part 4) has no timeline anywhere. `sl-day12-three-rates` is bullets only; `sl-day12-milliseconds` and `sl-day12-naive-loop` are code listings. The idea itself — three jobs sharing one loop at three different periods — is inherently a picture (three lanes of time, ticking at different rates), and the note for `sl-day12-naive-loop` even tells the *presenter* to "draw the pulse train on the board and put 10 ms tick marks under it" — i.e., the deck is relying on an ad-hoc whiteboard sketch to carry the one idea a visual learner needs fixed in front of them. Add a simple three-lane timeline (every pass / every 10 ms / once a second, with the pulse train running underneath) beside `sl-day12-three-rates`, and reuse it, marked up, as the reveal for `sl-day12-naive-loop`'s aliasing prediction.

- [MAJOR] [P-4] The one-second counting window has no picture. `task-day12-sketch-window` asks "what happens to a pulse that arrives between [the read] and [the reset]?", and the only answer is prose in `inst-day12-main-loop-sketch". A single timeline — window boundary, "read then zero" marked as one instant, one pulse landing exactly on that instant — would make the "at most one pulse lost" answer visible instead of asserted. As written, a visual learner has to hold the race condition in their head from a sentence alone.

- [MINOR] [P-4 / S-4] `table-day12-deadband` / `sl-day12-deadband` — the dead band is a number-line concept (ADC counts 0 – ~1948 – ~2148 – 4095, mapped to CW / stopped / CCW) presented as a four-column table with no diagram, and the slide itself uses only the top ~40% of the stage with nothing below (checked at 1600×900: table bottom ≈ y=430, next content y=900). A horizontal bar — 0 to 4095, the dead band shaded around 2048, the two speed regions labeled either side — would teach the idea in one glance and use the empty two-thirds of the slide that is currently wasted.

- [MINOR] [B-11] `fig-day12-wiring`, the orange arrow — rendered at its native 2240×2020 and re-measured on `sl-day12-wiring` at 1600×900: the arrowhead tip lands on an empty breadboard hole, about one hole-spacing short of the orange output wire it is meant to indicate, and the arrow itself is nearly the same hue as that wire (only the resistor's blue arrow has real color contrast with what it points at). It is findable up close but asks the eye to bridge a gap and match a near-identical color from the back of the room. Extend the arrowhead to touch the wire, or give the arrow a dark outline/halo so it reads against orange-on-orange.

- [OK] Rule 8 — confirmed `fig-encoder-wheel` and `fig-photointerrupter-video` (both projected on Day 11x) do not appear as any `ref` in `assets/decks/day12.json`; no repeat.

---

## checker-arc-fidelity

*Everything read from the live working tree; both decks mined including speaker
notes, her slide images opened at full size, and the four new SVGs rendered in
headless Chrome at their declared `viewBox` size and looked at.*

### Verdict: MAJOR

All three Gate 1 "reaches the room nowhere" findings are **closed, and closed
properly** — the arithmetic, the internal pull-up and her last two firmware steps are
each on a wall, in her order. Her ten slides plus the two moved ones all land, and the
deck's 41 slides contain **nothing without a source**: 31 refs against 31 source
elements, counts matching exactly, so nothing exists to absorb a layout problem.

What is wrong is at the edges of her slide 5 and slide 6: **two of her pictures were
promised a home, staged as files, and never placed** — and one of them is the motor's
power supply, whose absence from the wiring drawing the caption actively contradicts.

**Skippable check.** Neither deck marks any of these slides skippable — there is no
*"this is in the video, we'll skip it"* note anywhere. No drop is excused on that
ground and none is claimed on it.

### Findings

- **[MAJOR] Her slide 6's second picture — the regulator — was dropped as a duplicate, the manifest's replacement instruction was never carried out, and the drawing that remains shows the motor with no power supply.** Ground truth §10 says *"Do not duplicate — it is already `fig-tb6612-regulator`. `<xref>` it."* **There is no `<xref>` to `fig-tb6612-regulator` anywhere in Day 12.** `fig-day12-wiring` embeds her slide-6 Fritzing byte for byte — and that drawing has **no regulator board and no barrel jack**, unlike `fig-tb6612-wiring-2`, which is what the room actually has on the desk. The caption then says the circuit is *"the one you built on Wednesday changed only by the sensor and one resistor"*, which the picture contradicts. Her own slide solved this by putting the regulator photo immediately beside the drawing. **In the room the motor has to run for tasks 3 and 4**, and that measured pulse rate gates Parts 3 and 4.
  **fix**: one clause in the caption and one in the slide's third bullet — *the 9 V adapter and the regulator that powers the motor are still connected as on Wednesday; they are simply not drawn here* — plus the `<xref>` the manifest asked for. No new figure.
- **[MAJOR] Her slide 5's two new photos were renamed for use and then never placed.** `fig-day12-sensor-body.jpg` (her `slide05_img1`, with `EE-SX672` legible on it) and `fig-day12-encoder-wheels.jpg` (her `slide05_img2`) exist, are named in the book's convention, and are **referenced nowhere in `source/*.ptx`**. Both the coverage table and the manifest say they land in `subsec-speed-sensor`. What landed instead is `fig-photointerrupter-beam`, a schematic — so the reading describes *"the U-shaped part wrapped around the rim of that wheel"* and **never shows the student the object they are holding**. This is the exact shape of a B-8a loss: the table says it lands, the file was even prepared, and nothing looked back.
  **fix**: one `<sidebyside>` figure in `subsec-speed-sensor`, between the construction paragraph and `fig-photointerrupter-beam`. Reading only — no slide needed, because the room saw `fig-encoder-wheel` on Wednesday.
- **[MINOR] Her slide 5's note is the day's crucial step, and it reaches no presenter note.** *"Really important that you get this working before you leave today."* The nearest thing in the deck is Part 2's section note — *"this is the Part that can eat the hour"* — which is about the clock, not the standard. The closing recap **asserts** *"You have the speed sensor wired"* with no instruction to check that it is true.
  **fix**: one sentence into Part 2's presenter note, and one into the closing recap's.
- **[MINOR] Question 2 is still open, Part 2 was drafted anyway, and nothing in the source marks where the answer lands.** The drafting is **defensible**: nothing in Day 12 says 5 V about anything on the logic side, the pull-up goes to 3.3 V everywhere, and `fig-day12-wiring` carries **her own drawing**, which wires the sensor's VCC to the 3.3 V rail. But the caption's *"power and ground go to the breadboard rails"* is the sentence that has to change if she answers *"5 V from the regulator"*, and the source comment flags only the P-6 ordering and the two P-15 omissions. Her slide 6 note — *"just wire power and ground to **logic** power and ground"* — is still the only place she says a rail in words and is still not quoted in the source.
- **[MINOR] Part 5's "what you already have written" — including the Gate 1 caveat on the seven-segment display — has no element and no slide.** `SevenSeg`, `ht16k33`, `motor_speed` and `adc_read` appear **zero** times in Part 5 and zero times in the deck. It is DELIVERY-2 territory, but the marker is a bare `<!-- DELIVERY 2: prose. -->` with nothing naming what the prose owes — **which is how Day 11's four slides went missing.**
  **fix**: name it in the marker, or give Part 5 a fourth slide.
- **[MINOR] `rpm-formula.svg` is a new asset with no manifest row — and the manifest's one deferred check is now done.** Checked by reading `demath()` in `assets/class.html` rather than by eye: `\Delta\theta = 2\pi / N` flattens to *Δθ = 2π / N* and `\text{pulse count} \times \Delta\theta` to *pulse count × Δθ*, both correctly, so `sl-day12-decoding` is safe. The rpm expression, which does have a fraction bar, was made an image instead, which is the right call and is not in §10.
- **[MINOR] The chapter's `Reference:` section is fixed in the plan and unpinned in the source**, and `subsec-motors-ref-speed` is the only home outside a slide for the one-edge-per-slot condition, the 60/*N* resolution figure and the EXTI-15 row.
- **[MINOR] The end-of-chapter comment is now stale and contradicts the file** — it still says Day 12's in-class section is authored in a separate session, still forward-describes what Day 12 will cover, and still carries the Gate 0 requirement that `sec-speed-before-class` now satisfies.

### Layouts she already solved

`fig-day12-wiring` is her slide 6 **adopted whole** — her PNG byte for byte, two arrows where her callouts pointed, and her two callout texts as the slide's first two bullets, as she had them. **Better than Gate 1's suggestion** of re-annotating `fig-tb6612-wiring-2`. Keep — with finding 1's clause, which is the one thing her layout carried and this one does not. `fig-day12-lab6-build`, `sl-day12-rpm` and `sl-day12-cabled-sensor` are likewise hers. Keep.

### Checked and correct

**The three Gate 1 items are all delivered, and each is on a wall, not only in the
book**: the arithmetic on `sl-day12-rpm`, first in Part 3's reveal, with the
one-edge-per-slot condition and both input numbers coming from the students; the
**internal** pull-up on `sl-day12-pullup-value`'s fourth bullet, which is her slide 10
face and her slide 6 note together; and her slide 10's last two firmware steps as the
final two rows of `table-day12-build-order`, screen first and display last.

Also verified: both Gate 1 drops still hold **on the bytes**; `sysinit.c` is quoted
verbatim (B-6); the deck's own clock is the plan's 110 and the section notes name the
valves in the plan's order; and Day11x s21's speaker note is placed except for its
*"tomorrow: use the voltmeter/oscilloscope"* opener, which Day 11 and Day 11x already
delivered and which Part 2's note deliberately reverses — **superseded, not lost**.

---

## checker-technical-accuracy

### Verdict: BLOCKER

Sources checked **by extraction, not memory**: UM2953 Tables 11 and 12; RM0490 §11.3
(vector table), §12.3.3, §12.5.6, §12.5.9/Table 47, and the TIM3 chapter; the
STM32C031 datasheet AF table; `sysinit.c`, `ADCPot.c`, `counterResetButtonInt.c`,
`counterResetButtonPolled.c`, `TTmotor_ramp.c`, `ES28.h`; all seven pages of Lab 6;
her Day 12 deck; and every Day 12 figure rendered and looked at.

**Verified clean, so it is not re-litigated.** D7 = PA15 (Table 11 CN9 pin 8; Table 12
pin 37). PA15 → EXTI15 (§12.3.3, Figure 26). Line 15 → `EXTI4_15`, vector position 7.
`EXTI_EXTICR4` at offset **0x06C**, top byte **`EXTI15[7:0]`**. `EXTI_PA` = 0 in
`ES28.h` and `0x00: PA[m+3]` in §12.5.6. The whole pin map in `table-day12-build-order`,
including the Lab 6 build figure traced pin by pin. Both `<program>` blocks are
`sysinit.c` **line for line**. **All rpm, dead-band and stretch arithmetic recomputed
and correct.** `check_rules.py`, `check_deck.py` and `check_starters.py` clean; every
image path and `xref` resolves; B-14 satisfied; no B-15 violation. **The draft never
states a sensor supply voltage in words** — that constraint is honored.

### Findings

- **[BLOCKER] [L-6, B-4]** `sl-day12-two-answers` says the port selection is in `EXTI_EXTICR4`, *"which the Reference Manual gives in section 12.5.9."* **§12.5.9 is "EXTI register map" — a table of offsets.** The register, and the `0x00: PA[m+3]` port encoding this bullet is about, is **§12.5.6**. `ch-gpio-interrupts.ptx` sends students to §12.5.6 for this exact lookup, twice. A student following the slide lands in a register map with no port values in it. **Correction: §12.5.6.**
- **[BLOCKER] [B-6, B-3]** The worked main loop's 100 Hz branch is `speed = adc_read();` **with no `start_conversion();`**. `ADCPot.c` documents `adc_read()` as *"Blocks until the conversion finishes"*; without the start, EOC never sets and **the loop hangs on the first pass** — in the one listing whose entire point is a loop that never blocks. The chapter's own naive loop, 300 lines earlier, has both calls in the right order.
- **[BLOCKER] [B-11c, L-6]** The reading says the resistor goes *"between the output and **the supply rail**."* Lab 6 §2.5 says **3.3 V**, twice. "The supply rail" is the **sensor's** supply — precisely the rail that is open with Petra — and if that is 5 V, the reading has told students to put 5 V on PA15 before Part 2 gets a chance to correct them. **Correction: "between the output and 3.3 V."**
- **[MAJOR] [B-6]** *"Every 4 in `counterResetButtonInt.c` becomes a 15"* — **the file's own name list includes `EXTI4_15_IRQn`, whose 4 must stay**, as the same subsection says two bullets earlier. It also silently mis-handles `EXTI->EXTICR[1] → EXTICR[3]`, where the change is not a 4 at all.
- **[MAJOR] [L-6, B-4]** *"count in hardware, which the STM32C031C6's TIM3 can do."* TIM3 has encoder modes — **but not on this pin.** The datasheet AF table gives PA15 as `SPI1_NSS/I2S1_WS`, `USART2_RX`, **`TIM1_CH1`**, `MCO2`, `USART1_RTS_DE_CK`, `EVENTOUT`; TIM3's channels on this board are PA6/PA7/PB0/PB4/PB5/PC7. A table told "TIM3 can count it" and sent to Lab 6 with the sensor on D7 cannot make it work. **Name TIM1, or drop the timer name.**
- **[MAJOR] [B-3]** `rq-speed-what-carries-it`'s distractor feedback says *"how quickly the output switches is a property of the sensor, not of the shaft."* The rising edge is set by the pull-up against stray capacitance — **which this same day teaches explicitly** on `sl-day12-pullup-value`. The sibling distractor gets it right. The correct answer is unaffected; the reason is wrong.
- **[MAJOR / UNVERIFIED] [B-11c]** `fig-photointerrupter-states`'s caption and `sl-day12-states` assert the phototransistor *"is a switch to ground and nothing more"* and *"has no way to drive OUT up"*. **This is the day's highest-consequence hardware claim and no source in the repo supports it** — there is no EE-SX672 datasheet, and Gate 1 ruled the claim true *only if the output stage has no internal pull-up to its own supply*. **The condition appears nowhere in the delivered material, and it cannot be deferred to the missing prose, because the assertion is being made now, in a caption and a projected slide.**
- **[MAJOR] [B-13]** `sl-day12-milliseconds`'s note says the listing is *"abridged from `sysinit.c` only by its comments"*. It is also **reordered and cut** — `SystemInit()` and `delay_ms()` are dropped and `SysTickInit()` is moved below the handler. Every code line is the file's, so B-13's substance holds; the sentence about it does not.
- **[MAJOR] [B-3]** `count = pulses;  pulses = 0;   // read and clear together`. The instructor block immediately above says a pulse arriving *"between the read and the zeroing"* is lost and names two remedies. **The listing does neither** — it is exactly the two-statement version, labelled with a comment claiming the property it does not have.
- **[MINOR] [B-6]** `speed`, `count`, `rpm` are undeclared and `SLOTS` undefined in both teaching listings; **neither would compile as printed.** The naive loop is meant to be broken in one specific way, and being broken in a second, incidental way costs the demonstration.
- **[MINOR] [L-6]** *"SysTick counts down from 12000"* — `LOAD = 12000 - 1`, so it counts 11999 → 0. Suggest *"reloads every 12000 counts."*
- **[MINOR] [B-11c]** `fig-day12-wiring`'s caption says power and ground go to the breadboard rails and the oscilloscope is on the same row. Traced: **GND does go to the − rail, but VCC runs on a long jumper to the TB6612's Vcc column** (the same node electrically, not what the sentence describes), and **no probe is drawn anywhere in the figure.**
- **[MINOR / UNVERIFIED] [B-11c]** *"It is the same part and the same three connections"* for the cabled variant — her slide says only *"some of you have a photointerrupter with a long cable on it"*, the photo shows a bare U-body with a **four**-core cable, and the other variant is a breakout board. Suggest *"the same kind of sensor."*
- **[MINOR / UNVERIFIED] [B-11c, B-3]** *"The pink wire… is not needed here"* — her slide says *"optional"*. It also interacts with the diagnostics table, whose remedy for a permanently-HIGH line is *"the LED side has no power"* and never mentions the pink wire, which on the cabled variant **is** the LED side.
- **[MINOR] [B-3]** Three names for one object in one day: *"the solid part of the rim between two slots"*, *"a spoke"* (including in the artwork's panel title), and *"the metal between them"*. A slotted disc has no spokes, and the wheels are plastic — **"metal" is an unverified material claim.**
- **[MINOR] [B-1]** `fig-photointerrupter-beam`'s caption says the output *"switches once for every slot"*. It completes **one cycle — two edges** — per slot, which is the whole basis of `sl-day12-rpm`'s set-piece. The body text has it right; the caption dropped the "back and forth."
- **[MINOR] [B-2]** Part 5's section note says ≈5 min against its own five child slides at 2+2+2+2+1 = **9**. Summed slide by slide the taught total is ≈71, not 66.
- **[MINOR] [P-12]** `fig-day12-sensor-body.jpg` and `fig-day12-encoder-wheels.jpg` are prepared and **unreferenced**.
- **[MINOR] [B-11c]** `sl-day12-hazards`'s note states *"Lab 6's own schematic draws the pot on the 5 V net, which is a leftover"* — ground truth says "most likely legacy" and makes it **Question 1, still open.** The student-facing paragraph is correct; the note states the answer to an open question as fact.
- **[MINOR] [L-6]** *"unlike D11 beside it"* — D7 is CN9 pin 8, D11 is **CN5 pin 4**, a different connector. The substance is right.
- **[MINOR] [L-6]** *"a 1.6 kHz square wave on PA7"* — 1.6 kHz is confirmed, but "square wave" implies 50%, and at a commanded speed of 0 there is no waveform at all. *"Pulse train"* costs nothing.

### Reasoning checks that passed

**The polling condition is sound and correctly stated.** *"A polled read catches every
pulse only if the gap between reads is shorter than the shorter of the pulse's HIGH
time and its LOW time"* — run over the chapter's own instance: 10 ms gap, 60 PPS,
roughly even slots and rim → HIGH ≈ LOW ≈ 8.3 ms, 10 > 8.3, so the loop misses.
`1/(2f)` at even duty is exact, and the note's refusal of the shorter *"100 Hz cannot
see 60 Hz"* version is correct. Level-sampling can only under-count, which is what
*"fewer than it should"* claims.

**All arithmetic recomputed and correct**: the derivation and its three distractors;
the dead-band numbers (0.806 mV, 2047.5, 80.6 mV, and the correct 4095/4096 pairing);
every figure in Stretch 3 including the interval-timing crossover; the Δθ relations;
SysTick at 1 kHz; the PWM at 1.6 kHz with `CCR1` 0–1249.

**Every claim about an earlier day checked and correct**: the Day 9 polled-counter
argument restated exactly; `volatile`, `PUPDR`, `FTSR1`/`RTSR1`; open-drain as *"the
same behavior on a different kind of transistor"* with *"no `OTYPER` bit on the
sensor"*; `SENSOR_PIN` mirroring `BUTTON_PIN`; `start_conversion()`/`adc_read()` as the
course's own names; the build order matching Lab 6 §2.1→§3 exactly, with the pot's
0/1.65/3.3 V, the dead-band rationale, the 5 V-motor-only warning and the
hot-regulator note.

**The P-6 sequencing holds**: prediction → wiring → states reveal, with
`task-day12-detect` left open until Part 4, enforced by the deck's Part 3 note. The
direction story is consistent across four blocks. The one-edge-per-slot condition is on
the slide, in Stretch 3, and **nowhere in the reading**, exactly as required.

### Unverified

- **The sensor's output stage has no internal pull-up** — needs the EE-SX672 datasheet. **The day's load-bearing safety claim.**
- *"The same part"* for the cabled variant; *"the pink wire is not needed"*; the wheel's material.
- **Both delivered figures show the sensor's VCC on the 3.3 V logic node**, traced hole by hole. The prose is correctly silent, but **the artwork answers Question 2** in the direction of her drawing and her speaker note, and against her slide-6 annotation. Both figures would have to change if the answer is 5 V.

## checker-figure-claims

### Verdict: BLOCKER

One caption sends students to a wire that is not where it says it is, and two more
describe power paths that are not drawn. Everything I report below I looked at:
every SVG was rasterised with headless Chrome at the size its own `<svg>`
declares (aspect checked against the `viewBox` before any judgement), and the
Fritzing composites were re-cropped and re-read at 2× and 5× to trace individual
wires hole by hole.

### Figures opened

- `fig-photointerrupter-beam` — Chrome, 1100×620 at dsf 2 (2200×1240), plus a 5×
  crop of the sensor gap. A grey disc with a rounded-square shaft hole and
  **twenty** white radial slots cut round its rim; a dark blue C-shaped body
  straddling the top of the rim, labelled `LED` beside its upper arm and
  `phototransistor` beside its lower one; a vertical orange line in the gap
  labelled `beam` by a leader with a black arrowhead; a black arc under the
  wheel with an arrowhead at bottom-left; caption text `slotted wheel on the
  motor shaft`. To its right, a blue square wave — five complete high pulses —
  under `the sensor's output, as the wheel turns`, with a double-headed bar
  labelled `one slot goes by` spanning exactly one full period.
- `fig-photointerrupter-states` — Chrome, 1100×600 at dsf 2. Two panels split by
  a grey rule. Left, `A slot is in front of the beam`: a grey `wheel rim`
  rectangle with a **white** window, a solid orange arrow passing through it into
  the base of an NPN whose collector goes up to a node dot, `OUT` to the right, a
  `10 kΩ` box above it to a `3.3 V` rail, emitter to ground; below in dark red,
  `the transistor conducts, and OUT is pulled down`. Right, `A spoke blocks the
  beam`: identical circuit, the window filled **dark grey**, the orange beam a
  stub that stops at the rim with a grey dashed continuation; below in blue, `the
  transistor is off, and the resistor holds OUT up`.
- `rpm-formula.svg` — Chrome, 560×172 at dsf 3. `RPM =` then a fraction: `60 × PPS`
  over a rule, `N` italic beneath it. RPM and PPS upright, N italic.
- `fig-day12-wiring` — Chrome, 2240×2020 (viewBox `360 40 2240 2020`, aspect
  confirmed 1.109), then 2× re-render and five crops at 2.5–5×. A Nucleo top
  right; a full breadboard; a teal photointerrupter module bottom left with three
  wires; a yellow TT motor bottom right with brown and purple leads; a TB6612 on
  the board; **no regulator board, no barrel jack, no oscilloscope probe**. Two
  drawn-on arrows, no text nodes at all. Traced hole by hole: red 3V3 → top `+`
  rail; resistor (bands read bottom-up brown-black-orange-gold = **10 kΩ**) from
  that `+` rail down to col 13 row I; orange sensor `OUT` → col 13 row F, same
  node, and nowhere else; black sensor `GND` → bottom `−` rail; blue sensor `VCC`
  → col 61 row I; light-blue jumper col 58 row J ↔ col 61 row J; TB6612 `GND`
  col 56 (black → `−` rail), `Vcc` col 57 (red → `+` rail), **`VM` col 58**;
  orange/green/brown/black at the header pins `PWM/MOSI/D11`, `MISO/D12`,
  `SCK/D13`, `GND`.
- `fig-day12-lab6-build` — Chrome, 2084×1970, then 2× with four crops. Same board
  plus a 7-segment HT16K33 backpack reading `88:88`, a potentiometer, and the
  regulator board with its 6–12 V barrel jack on the right. Blue wire from the
  **sixth (rightmost) AIN pin** — the one whose `A0` silkscreen the wire itself
  covers — down to the pot; green wire from the sensor to the header pin labelled
  **`D7`**; motor's brown and purple into the two columns under **`MOTORA`**;
  sensor `VCC` again on col 61, jumpered to `VM`. The regulator's `5V`/`GND`/`Vin`
  pads are gold, not green, and **no wire touches them**.
- `fig-day12-cabled-sensor.jpg` — read directly, 970×728, plus a 5× crop of the
  conductors. Black U-shaped photointerrupter on a long grey four-core cable;
  the four tinned ends are, unambiguously, **blue, brown, pink and black**.
- `fig-tb6612-wiring-2` (`Day11-Motors/tb6612-wiring-exercise2.png`, 1412×1039) —
  opened for the comparison the caption demands, plus a 4× crop of its right end.
  Same board, **plus the green regulator board and its 9 V barrel jack**, and the
  same col 58 ↔ col 61 jumper — but in row I, and with col 61 otherwise empty.
- `fig-encoder-wheel` (`Day11x-Motors(2)/fig-encoder-wheel.jpg`) — opened because
  the Day 12 pre-class reading xrefs it. A hand holding a TT motor, white slotted
  disc on the shaft inside a black photointerrupter, breadboard below with an OLED
  reading **`222 RPM`**.

### Correspondence failures

- **[BLOCKER] `fig-day12-wiring` / `sl-day12-wiring`** — text says: *"The
  photointerrupter's power and ground go to the breadboard rails."* — image
  shows: ground does (black → bottom `−` rail), **power does not**. The blue VCC
  wire runs the length of the board to column 61 row I, and the light-blue jumper
  ties column 61 to column 58, which is the TB6612's **`VM`** pin. In
  `fig-tb6612-wiring-2` that same column-61 node is the one the regulator's 5 V
  feeds. Verified three ways: the jumper's left end and the VM pad are at the
  same x to the pixel; the adjacent pins check out (black → col 56 = `GND` → `−`
  rail, red → col 57 = `Vcc` → `+` rail); and the node spacing is one row pitch,
  so rows I and J of column 61 are the same node.
  This is not a wiring error on her part — a 5 V open-collector sensor with a
  10 kΩ pull-up to 3.3 V is exactly the circuit `fig-photointerrupter-states`
  teaches, and the HIGH level still comes out at 3.3 V. **It is the caption that
  is wrong.** Note also that this answers the open question: in *both* of her
  Fritzings the sensor's VCC is on the regulator's 5 V / `VM` node, not on a
  3.3 V rail. — fix: **ask Petra to confirm the 5 V intent**, then re-caption
  ("its ground goes to the ground rail and its power to the same 5 V the motor
  driver uses"). Do not describe it as a rail while the drawing shows a jumper.

- **[MAJOR] `fig-day12-wiring` / `sl-day12-wiring`** — text says: *"the one you
  built on Wednesday changed only by the sensor and one resistor"*, and the
  slide's third bullet, *"Everything else on the board is what you wired on
  Wednesday."* — image shows: the **regulator board and the 9 V barrel jack are
  gone**. They are plainly present in `fig-tb6612-wiring-2`, which is the picture
  the room saw on Wednesday and which this caption xrefs. A student comparing the
  two — which is precisely what the caption asks them to do — sees the motor's
  power supply vanish while the text says nothing but the sensor and a resistor
  changed. The activity then has them run `TTmotor_ramp.c` and watch the motor
  ramp. — fix: **ask Petra for a version of her slide-6 Fritzing with the
  regulator in it**. She has one — it is in the slide-10 drawing. This is a
  one-step fix from her and not a caption patch: the caption cannot truthfully
  say "unchanged" about a picture that dropped the supply.

- **[MAJOR] `fig-photointerrupter-beam`** — text says: *"A slot lets the light
  through and the solid rim between two slots blocks it"* — image shows: the
  orange beam drawn at x=230, while the top slot spans x=240.9–259.1. The beam
  falls **squarely on the solid rim between two slots**, i.e. in the blocked
  state, in the one figure whose job is to establish that a slot lets it through.
  Worse, the `beam` leader's arrowhead ends at (220,175), over the *next slot to
  the left*, so the annotation points at a slot the beam does not use. — fix:
  move the beam line to `x="250"` (the slot's centre through its whole depth) and
  the leader's endpoint to about `(238,178)`; re-render and re-read afterwards.

- **[MAJOR] `fig-day12-lab6-build` / `sl-day12-lab6-build`** — text says: *"The
  9 V adapter feeds the regulator board on the right, whose 5 V output powers the
  motor through the TB6612 and nothing else"* and *"every part on the board
  shares one ground"* — image shows: the regulator board lying across the
  breadboard's right edge with **its `5V`, `GND` and `Vin` pads unplugged and
  unwired**. They render gold, not green; Fritzing has them connected to nothing.
  The `VM` jumper ends at column 61 in the *upper* half; the regulator's pads sit
  in the *lower* half, a different node across the centre channel. The one power
  path the caption leads with is the one path a student cannot trace. — fix: **ask
  Petra for the original**, and consider asking for it graded — a whole-board view
  for the block layout, and a close-up of the regulator's two connections, which
  is the thing the caption is actually about.

- **[MINOR] `fig-day12-wiring`** — text says: *"…and the oscilloscope on the same
  row"* — image shows: no probe, no scope, nothing on that row but the resistor
  and the output wire. Inside a caption that has just written "(the blue arrow)",
  the reader takes the whole sentence as a description of the picture. — fix:
  re-caption to "…and the oscilloscope goes on that same row (not drawn)".

- **[MINOR] `fig-day12-wiring`** — text says: *"The output wire stops there — it
  does not go to the Nucleo today (the orange arrow)"* — image shows: the arrow
  tip at viewBox (1105, 1240), which lands **in the empty lower half of the
  breadboard**, about 28 px left of the orange wire's shaft and 300 px below the
  hole where that wire actually stops (col 13, row F). It identifies the wire, but
  it does not point at where the wire stops, which is the claim. — fix: move the
  arrow's endpoint up to the wire's termination.

**Correspondence checks that passed** — recorded so the list is evidence, not
selection: the 10 kΩ resistor really reads brown-black-orange-gold; it really
runs from the sensor's output row up to the `+` rail, and the `+` rail really is
fed by the red wire from the Nucleo's **3V3** pin (not 5V — I read the pin
label); the output really does land in a row of its own with nothing else on it;
the three signal wires really are at `D11`, `D12`, `D13` with a fourth at `GND`;
the pot in the Lab 6 figure really is on `A0` (the sixth AIN pin) and not `A1`;
the sensor's output really does go to the pin labelled `D7`; the motor really is
on `MOTORA`; the cabled sensor really does have blue, brown, pink and black
conductors; and `fig-photointerrupter-states` is drawn as a correct circuit —
NPN, floating base with the beam on it, collector to the `OUT` node and the
pull-up, emitter to ground, node dot present, the arrow on the emitter pointing
outward. Its `one slot goes by` bar on the beam figure spans exactly one full
period, which is the right claim.

### Notation mismatches

- `fig-photointerrupter-states` — text: *"the solid part of the rim between two
  slots"* (reading), *"the solid rim between two slots"* (beam caption), *"the
  metal between them"* and *"slots and spokes of about equal width"* (two
  different instructor notes) / figure: **`A spoke blocks the beam`** — change:
  the **text**. Four names for one thing, and the figure's word is the one that
  never appears in the prose that introduces the mechanism. Name it once where
  the mechanism is introduced — "the solid part of the rim between two slots (a
  **spoke**)" — and use it thereafter. Worth noticing while you do: the wheel in
  `fig-photointerrupter-beam` is a solid disc with slots cut in it and has no
  spokes at all, so if "spoke" is not defined it is a word the drawing contradicts.
- `rpm-formula.svg` — text: `<m>PPS</m>`, `<m>RPM = 3 \times PPS</m>` (MathJax
  sets both italic, letter by letter) / figure: **PPS and RPM upright**, only `N`
  italic — change: the **text**, to `\text{RPM}` and `\text{PPS}`. The figure has
  it typographically right and is the harder thing to change; the reading and the
  slide bullet should match it.

### Legibility

- `rpm-formula.svg` on `sl-day12-rpm` — 50-unit glyphs in a 172-unit figure at
  `width="24%"` — **3.5 %** — under the 4–5 % band `AUTHORING-visual.md` Rule 2
  sets for a display equation, though comfortably above the 2 % floor. Calibrated
  against the Day 11 precedent in that file (500×160 viewBox, 54-unit glyphs at
  `width="25%"` → 4.4 %). — fix: **`width="30%"`**, which lands it at 4.4 %. Make
  the figure bigger; do not touch the SVG.
- `fig-photointerrupter-states` on `sl-day12-states` — smallest type 22 units in
  a 600-unit figure, image-dominant → **2.9 %**; `3.3 V`/`OUT`/`10 kΩ` at 24 →
  3.1 %; panel titles 3.6 %. — every load-bearing item clears 2 %. **No action.**
  This is the figure to point at when someone asks what a hand-authored diagram
  sized for the room looks like.
- `fig-day12-wiring` on `sl-day12-wiring` — Nucleo pin silkscreen ≈15 units in a
  2020-unit figure; with three bullets beside it the media column gives ~505 px
  → **0.52 %**. The sensor module's own `OUT`/`GND`/`VCC` silkscreen measures
  ~0.49 %. Same order as the wiring-2 silkscreen already logged at 0.5 % and
  rejected. — the two claims the slide actually makes are carried by the two
  coloured arrows, not by type, so nothing is asserted that cannot be shown; and
  the note already tells the instructor to say the signal wire is orange here and
  white in the kit. **Mitigation holds**, but `sl-day12-lab6-build`'s note carries
  the sentence *"do NOT ask them to read pin names off it"* and this slide's note
  does not. Add it here too — this is the slide where a student is most likely to
  try.
- `fig-day12-lab6-build` on `sl-day12-lab6-build` — silkscreen **0.57 %**, as the
  brief says. I checked the mitigation rather than re-reporting it: every pin the
  caption names is present as text in `table-day12-build-order` — `PA5 (D13)`,
  `PA6 (D12)`, `PA7 (D11)`, `A0 (PA0)`, `D7 (PA15)` — and the display's row names
  no pins because the caption names none either ("on the I2C bus"). **The
  mitigation holds.** The one gap is SDA/SCL, which come from the Day 10 driver
  and are not asked of this figure.
- `fig-day12-cabled-sensor` on `sl-day12-cabled-sensor` — the load-bearing
  feature is colour, not type, and colour survives scaling. Blue, brown and pink
  are unmistakable. The **black** conductor is the low-contrast one: it lies over
  a dark grey background beside the black cable jacket, and it is the one that
  matters most (it is the output). The four bullets name every colour as text, so
  the mitigation holds; worth saying out loud that the black one is the one at the
  bottom of the fan.

### Drawn wrong (small, all in the three hand-authored figures)

- `fig-photointerrupter-beam` — the word **`phototransistor`** is drawn straight
  across the wheel's outer rim outline and through a slot. Legible, but it is a
  label the artwork runs through. Move it right (about `x="440"`) or give it a
  short leader.
- `fig-photointerrupter-beam` — the `beam` leader is an orange line with a
  **black** arrowhead: the `ah` marker hard-codes `fill="#1a1a1a"`, and the same
  marker serves the black rotation arc. Give the leader its own marker, or use
  `fill="context-stroke"` as `fig-day12-wiring` does.
- `fig-photointerrupter-states` — the orange **`LED`** label overlaps the left
  edge of the `wheel rim` rectangle in *both* panels (text at x=40 and x=600,
  rects at x=74 and x=634). It reads for a moment as if it labels the rim. Move
  each label about 25 units left, or put it above the beam.
- `fig-day12-wiring` — the composite clips 60.5 px off the top and the bottom of
  her 1848×2048 slide-6 PNG. The bottom cut removes the `fritzing` watermark,
  which is the point, and does **not** touch the encoder wheel (its lowest pixel
  is at y≈1980, the cut is at 1987.5). The top cut slices through the Nucleo's
  upper header row rather than clearing it. Cosmetic, nothing load-bearing lost —
  but if you ask Petra for a new export anyway (see the two findings above), ask
  for it with the watermark cropped and the crop will stop mattering.
- Both composites declare `width`/`height` matching their `viewBox`, both
  linters pass clean on this chapter (`check_rules.py`: 0 errors; `check_deck.py`
  on `day12.json`: 0 problems), and no `<figure>` in this day holds more than one
  image. **B-11a is clean.**

### P-15 — does a figure answer an activity's question?

Checked in the SVG text nodes, not the captions, as asked.

- `fig-photointerrupter-beam` states **no slot count anywhere**. Its six text
  nodes are `slotted wheel on the motor shaft`, `LED`, `phototransistor`, `beam`,
  `the sensor's output, as the wheel turns`, `one slot goes by`. ✔ The *drawing*
  contains exactly 20 slot paths, which is the answer, but the pre-class reading
  already states "For the wheel in your kit `N` is 20" two paragraphs later, so
  the figure is not the leak and the deliberate omission is intact.
- `fig-day12-wiring` carries **no text nodes at all** and exactly two elements
  besides the picture: a blue arrow and an orange arrow. **No pull-up value and
  no `OUT → PA15` arrow.** ✔ Both deliberate omissions confirmed present-as-absent.
  The value arrives in the caption and the slide bullet, which is after the
  prediction has been taken, and the pin arrives in Part 5.
- Two things adjacent to P-15 that are not figure defects and belong to whoever
  owns that pass, noted because I was in the file: `table-day12-diagnostics`
  (deck slide 10) row 1 states *"Nothing is pulling the line up, so the pin is
  floating"* — the answer to `act-day12-predict-trace` — one slide before
  `fig-photointerrupter-states` is supposed to reveal it. The prediction has
  already been collected at slide 6, so it may well be fine; it is a judgement,
  not a defect. And `sl-day12-rpm`'s second bullet ("count *one edge per slot*")
  gestures at edge triggering while `task-day12-detect` is still open.

### Shared figures

- Nothing else in the book resolves into `assets/images/Day12-Motors(3)/` — I
  grepped every `<image source=…>` in `source/`. The only cross-day dependency
  runs the other way: the Day 12 pre-class reading xrefs **`fig-encoder-wheel`**,
  which lives in `Day11x-Motors(2)/` and is also `sl-day11x-next`'s figure. A
  re-crop made for Day 11x changes what the Day 12 reading points at. I opened it:
  it does show a slotted disc, a photointerrupter over it, and a display reading
  `222 RPM`, so its caption holds today.
- `rpm-formula.svg` is used twice inside Day 12 — as `fig-rpm-formula` at
  `width="42%"` in the book and as a bare `<image width="24%">` in
  `sl-day12-rpm`. One file, two jobs: if you resize it for the slide (see
  Legibility), do it with the `width=` attribute and not by editing the SVG, or
  the book figure moves too.

### Look before shipping (crop/scale candidates, not defects)

The player's crop bug is fixed, so these letterbox rather than clip — but
letterboxed is still small, and the lever is still the bullet count.

- `sl-day12-wiring` — **3 bullets** + `fig-day12-wiring`, which is nearly square
  (2240×2020) and made entirely of fine detail. The worst combination on the day.
- `sl-day12-cabled-sensor` — **4 bullets**, `stack="yes"`, and the image is
  970×728, i.e. **4:3, not wide**. `AUTHORING-slides.md` gives `stack="yes"` for a
  *wide* image with a few talking points; a 4:3 photo under four bullets gets
  whatever height is left.
- `sl-day12-lab6-build` — no bullets, but the figure is 2084×1970 (aspect 1.06)
  on a 16:9 stage, so it can only grow to ~75 % of the slide *height* and sits
  narrow in a wide frame — the portrait-image case in that document, with the
  smallest type on the day inside it.
- `sl-day12-rpm` — `room="yes"`, a paragraph **plus** a bare image **plus** 2 long
  bullets. The image is fixed at 24 % so it will not crop, but the slide as a
  whole may overrun.
- `sl-day12-build-order` — a 7-row table + caption; `sl-day12-naive-loop`
  (`room="compressed"`) — a 14-line listing with comments out to ~66 characters.
  Table and `<pre>` overflow both measure zero. Not mine, but look at them.

---

## Orchestrator's correction, before synthesis — the sensor's supply

`checker-figure-claims` and `checker-technical-accuracy` traced
`fig-day12-wiring`'s blue VCC wire to **different nodes**. I re-traced it myself at
8× on the original `slide06_img1.png`, reading pad x-centres rather than eyeballing,
and **`checker-figure-claims` is right**:

| wire | lands on | node |
| --- | --- | --- |
| red, short | the **Vcc** pad's column | the `+` rail, fed by the Nucleo's 3V3 — logic power |
| light-blue jumper, row J | left end on the **VM** pad's column, right end at col ≈61 | motor power |
| long blue, row I, from the sensor | col ≈61 — **the same column as the jumper's right end** | therefore **VM** |

**The sensor's VCC is tied to the TB6612's `VM` pin — the motor supply — not to the
3.3 V rail.**

**This corrects `plans/day12-ground-truth.md` §4c(ii), which is wrong**, and with it
the shape of Question 2. The ground truth says her slide-6 drawing wires VCC to
3.3 V and therefore contradicts her *"The photointerrupter needs a 5V voltage supply"*
annotation. **There was never a contradiction on that slide.** Traced correctly, her
drawing, her annotation and Lab 6's schematic all say the same thing: the sensor runs
from the regulator's 5 V, and the pull-up goes to 3.3 V — which is exactly the
open-collector level translation `fig-photointerrupter-states` teaches, and which is
now **sourced** rather than assumed.

Two things follow, and both go on the change list:

1. **`fig-day12-wiring`'s caption is wrong in a way that matters more than reported.**
   It says power and ground go to the breadboard rails. Ground does; **power goes to
   VM**. And `VM` is unpowered in that drawing, because the regulator is not in it —
   so `checker-arc-fidelity`'s missing-regulator finding and this one are the **same
   defect**: the picture shows a sensor and a motor with no supply.
2. **Question 2 to Petra changes shape.** It is no longer "your drawing and your
   annotation disagree, which is it" — it is "your drawing powers the sensor from VM
   and your speaker note says *logic* power and ground; which do students wire in
   Exercise 1, when the regulator is not connected until Lab 6 §2.3?" That is a
   narrower and more answerable question, and it is the one that should go to her.

The error was mine at Gate 0 and it propagated into the plan, the questions and two
captions. Recorded here rather than quietly fixed, because the ground truth is the
document the next session will trust.

---

## committee-synthesizer — the change list

### Verdict

Not ready for Petra, but close, and closer than the four BLOCKERs suggest: three of
them are one-line corrections and the fourth is a clock. The single biggest problem is
that **`fig-day12-wiring` shows a sensor and a motor with no power supply, and its
caption describes a circuit that is not in the picture** — the orchestrator's
correction collapses `checker-arc-fidelity`'s missing regulator and
`checker-figure-claims`'s VM trace into one defect, and it is the defect that gates
Part 2's fourteen-minute beat, which gates Parts 3 and 4.

Two structural rulings the rest of the list depends on:

- **What a `<!-- DELIVERY 2: prose. -->` marker may defer.** It may defer *connecting
  prose*. It may **not** defer a cross-reference, a pointer, or an explanation of
  something a projected surface already asserts.
- **The sensor's supply is two items and one escalation, not three.** The reading's
  *"the supply rail"* fix does **not** depend on Petra's answer, because the rail in
  question there is the **pull-up's**, which every source agrees is 3.3 V.

### Must fix

1. **[B-11c, L-6]** The reading: *"between the output and the supply rail"* → **"between the output and 3.3 V"**. "The supply rail" reads as the *sensor's* supply, which is 5 V.
2. **[B-11c, S-23, L-16]** `fig-day12-wiring`'s caption and `sl-day12-wiring` — one rewrite fixing four defects: the missing regulator, the VM trace, the undrawn probe, and the closing aphorism. Caption must say ground goes to the ground rail, **power goes to the node that feeds `VM`**, the 9 V adapter and regulator are still connected but not drawn, the resistor's rail is 3.3 V **and not the sensor's supply**, and the scope goes on the output row (not drawn).
3. **[L-6, B-4]** `sl-day12-two-answers`: RM0490 **§12.5.9 → §12.5.6**. Also in `plans/day12.md`.
4. **[B-6, B-3]** `inst-day12-main-loop-code`: insert `start_conversion();` before `speed = adc_read();` — **as printed the loop hangs**. Add the missing declarations and `#define SLOTS 20`. Change `// read and clear together` to say what the code actually is.
5. **[B-6]** `sl-day12-naive-loop`: declare `speed`.
6. **[L-6, B-4]** `inst-day12-pulses-to-rpm`: **drop TIM3** — its channels are not on PA15. Say "or let a timer count the edges in hardware, which we have not covered." Do not substitute TIM1.
7. **[S-8, B-2]** **The clock, reconciled at the beat level.** Settling 6, Parts 8 / 26 / 15 / 13 / 5, build 32 (floor 25), close 5 = **110**. Part 1 loses 2 minutes of open discussion (never the commit); `sl-day12-decoding` loses 1; `sl-day12-lab6-build` and `sl-day12-deadband` lose 1 each; the build drops 35 → 32. Valves restated honestly: Part 6 to floor returns **7**; `sl-day12-two-answers` into the build returns **3**; `sl-day12-quadrature` returns **2** — total **12** against Part 2's 2–8 minute risk.
8. **[P-6, P-15]** `table-day12-diagnostics` row 1: **delete the cause**, keep the symptom. Delete the caption sentence naming row 1 as the prediction's answer. Move the table **after** `sl-day12-states` in the book; leave the deck `ref` during the wiring beat.
9. **[P-1, P-6, P-11]** **Move `act-day12-find-the-pin` to the opening of Part 4**, where its answer supplies the constant `sl-day12-naive-loop` uses. Part 4 currently prints PA15 two Parts before Part 5 asks students to look it up.
10. **[P-2]** `act-day12-driver-questions`: add the re-entry pointer to `sec-motors-day11x` that was reported applied and is not in the file.

### Should fix

11. **[B-8a, P-9]** `table-day12-build-order`'s last row: the `<xref>` to `subsec-i2c-ref-ht16k33` for the signed counter.
12. **[P-14, B-8a]** `sl-day12-quadrature`: **where the minus sign comes from** — the commanded mode, not the measurement. If valve 3 is spent, this bullet moves to `sl-day12-rpm`; it is not optional.
13. **[P-1, P-7, S-27]** `sl-day12-milliseconds`: **SysTick said once** — a counter in the processor core rather than a peripheral like TIM14, and what `delay_ms()` has been reading all term. Note that `SystemInit()` calls `SysTickInit()` before `main()`. Correct "counts down from 12000" → "reloads every 12000 counts", and correct the abridgement note.
14. **[P-3, P-14]** **What stands on the wall during the build:** re-project `table-day12-build-order` as the standing slide, and move the stretch to just before the recap. As drafted the last student slide before the recap is the optional stretch, up for half an hour while most of the room is at stage three of seven.
15. **[S-18, S-29, L-15, L-16, S-11, S-13, S-23]** `checker-voice`'s rewrites, applied as a block — seven epigram deck titles, `sl-day12-two-answers`'s three violations, the fragments, the "Part N" leaks, the "say" lines.
16. **[B-8]** **Repetition and reuse, reconciled.** *Leaves the reading:* the proportionality claim from the closing paragraph and from `fig-photointerrupter-beam`'s caption (six tellings → two); "easy enough to do in your head". *Leaves Part 2:* `sl-day12-pullup-value`'s first two bullets. *Enters the reading:* one `<sidebyside>` of her two orphaned photos. **The trade-off, stated:** the reading is at its element budget and an element is added anyway, because the words removed exceed the words added and a schematic cannot show a student the object in their hand.
17. **[P-1, B-9, S-28]** The hazard paragraph is one short of its slide — **add the hot regulator**. Soften the note that states an open question's answer as fact.
18. **[P-2, B-11c]** `task-day12-scope`: **"If the trace goes above 3.3 V, stop and ask before that wire goes anywhere near the Nucleo."** The mitigation that holds whichever way the datasheet falls.
19. **[P-14, P-2]** `table-day12-build-order`: a **fault line** for the six stages that have only a pass line — work it the way you worked the trace: power, then ground, then the signal path. Add that this is Lab 6's own build and continues after class. Fix the multimeter row.
20. **[P-2, B-4, S-8]** **The close, sized:** 1 minute private and written, then **table clusters** not individuals, then the recap. Add her slide 5's standard — nobody leaves without pulses on their screen.
21. **[B-8a]** **Every `DELIVERY 2` marker names what it owes.** A marker naming nothing is a drop, not a deferral.
22. **[P-9]** `act-day12-main-loop-sketch`: **name `counterResetButtonInt.c`** in student-facing text.

### Consider

23. **[P-4]** A three-lane timeline for Part 4 (every pass / every 10 ms / once a second).
24. **[P-4, S-4]** A number-line bar for the dead band.
25. **[P-4]** Re-show `fig-photointerrupter-beam` at the opening of **Part 3** — not Part 2, where its right half answers the prediction.
26. **The correctness sweep** — the beam falling on the rim rather than through a slot; "switches once" → "completes one cycle, two edges"; one name for the spoke; the reading-question distractor's wrong reason; "every 4 becomes a 15"; "the same part"; "square wave" → "pulse train"; "unlike D11 beside it"; `width="24%"` → `30%`; **her missing fourth question, "How do you count them?"**; the stale end-of-chapter comment.

### Escalate to Petra

- **A. The EE-SX672's output stage** — the day rests on it having no internal pull-up to its own supply. Ship item 18's stop-clause meanwhile.
- **B. Question 2, narrowed, and two Fritzing exports.** The old form is void: her drawing, her annotation and Lab 6's schematic all agree. What remains: her note says *logic* power, her drawing says `VM`. And neither figure can be fixed by captioning — `fig-day12-wiring` needs the regulator in it, and `fig-day12-lab6-build` needs one where the regulator's pads are actually wired.
- **C. Two house-style calls:** whether Part 1 keeps both her questions and the write-down; and whether `<term>` should bold answer-key labels inside `<instructor>` blocks at all.

### Dissent worth recording

- Two reviewers wanted the diagnostics table moved out of the wiring beat entirely; it stays on the wall with the cause removed, because the room needs it at the moment it is stuck. If the class still reads row 1 as the answer, move the deck ref and accept the loss.
- `learner-visual` wanted `fig-photointerrupter-beam` in Part 2, before the prediction; moved to Part 3 on P-15 grounds. If students arrive without the mechanism, show the **left half only** in Part 2.
- **Part 1 losing two minutes is the softest cut and the one most likely to be wrong.** If Part 1 is where the room actually engages, take the two from Part 6 and run the build at 30.

### Proposed for `AUTHORING-book.md`

1. **A deferral marker must name what it owes** — a sub-rule of B-8a. A marker naming nothing produced Day 11's four missing slides and four "missing" findings at this gate.
2. **Minute budgets must reconcile at the beat level, and it must be checked mechanically.** This failure has now been found at Day 11x Gate 3, Day 12 Gate 1 and Day 12 Gate 2, each time one level further down. Extend S-8, and add a check to `check_deck.py` that totals `≈ N min` per section kicker. **Every one of the three would have been caught by a script.**
3. **A figure defect whose cause is the crop, the export or the resolution goes to the author as an asset request, never to the caption.**
