# Day 12 — Gate 1

The plan (`plans/day12.md`) and outline, and the ground truth
(`plans/day12-ground-truth.md`), reviewed 2026-08-24.

**Premise given to every reviewer: Day 12 is a Thursday, 110 minutes** — 62
taught/structured, **45 open build**, 8 settling and transitions.

Panel: `checker-arc-fidelity` (leading), `expert-active-learning`,
`expert-cognitive-load`, `expert-continuity-auditor`, `expert-class-logistics`,
`learner-firstgen-novice`, `learner-anxious-nonhardware`, plus two rotators —
`expert-rigor-hawk` (the day turns on quantities) and `learner-weak-circuits`
(Lab 6's regulator and pull-up wiring are now in scope).

*Reports are transcribed here by the orchestrating session; several reviewers ran
without a file-write tool.*

---
# Day 12 — Gate 1 review

## checker-arc-fidelity

*Everything read from the live working tree: `assets/ClassSlidesOLD/Day12-Motors(3).pptx`
and `Day11x-Motors(2).pptx` (gitignored, present here), `plans/day12.md`,
`plans/day12-ground-truth.md`, `source/ch-motors.ptx` at HEAD+working changes.
Both decks mined; her slide images opened, not inferred.*

### Verdict: MAJOR

Nothing of hers is silently lost — the coverage table is real and both duplicate
claims **verify against the source**, which is more than Day 11's plan could say.
Three things reach the room nowhere: the day's own arithmetic, the internal
pull-up, and the last two steps of her build order. And the Part table does not
fit the class.

### Her arc against the plan

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| Day12 1 | *Engs 28 / Day 12* | deck `title` glue | OK — deck furniture |
| Day12 2 | *Review: Basic DC motor control* | `section` glue before Part 1 | OK — divider |
| Day12 **3** | *Discuss At Your Table* — how does `TTmotor_ramp.c` work, which register bits, what questions | **Part 1** (10 min), `act-day12-driver-questions` | carried whole, three questions intact |
| Day12 4 | *Motor speed sensing* | `section` glue before Part 2 | OK — divider |
| Day12 5 | *We will use an optical incremental sensor* | **dropped as duplicate → pre-class reading** | **drop VERIFIED.** `sl-day11x-next` (ch-motors.ptx:2231) carries her bullet 1 — the term *optical incremental sensor*, the wheel, the beam once per slot, the rate proportional to speed; `sl-day11x-scope-video` (:2245) carries her bullet 2 — *"On Thursday we'll count them, turn them into rpm"*; `fig-encoder-wheel` (:2212) is her third photo. Her two **new** photos (EE-SX672 body, the wheels) and her construction sentence go to the reading only, so they never reach the room — acceptable, because the room saw `fig-encoder-wheel` on Wednesday |
| Day12 **6** | **Exercise #1** — wire it, scope it, run the ramp | **Part 2** (20 min), `act-day12-wire-and-scope` + rebuilt figure | slide face carried in full, including *don't wire OUT to the Nucleo yet*. **Speaker note only partly carried** — finding 4 |
| Day12 **7** | *Wiring the Fancy Photointerrupter* — brown/pink/black/blue | **Part 2**, photo kept raw + four-row wire table | carried |
| Day12 8 | scope video, 30 → 180 rpm | **dropped — projected Wednesday** | **drop VERIFIED.** `fig-photointerrupter-video` (:2220) is the same `VH0-zO2LpDc`, and `sl-day11x-scope-video` plays it. Part 2 has them capture their own instead |
| Day12 **9** | **Exercise #2: Photointerrupter → RPM (on paper)** | **Part 3** (15 min), merged with Day11x 20 | activity carried and correctly left open (P-6). **Its answer does not reach the room** — finding 2 |
| Day12 **10** | *Complete Lab 6 setup* — hardware + firmware checklist | **Part 5** (5 min) + Part 6 opener | mostly carried. **Two items on the slide face land nowhere**: *"(internal or external pullup)"* — finding 3 — and the last two firmware steps — finding 6 |
| Day11x **20** | *With your table group, discuss* — edges / rpm / direction | **Part 3**, merged into the same activity (P-16) | carried; merge recorded in ground truth §3c |
| Day11x **21** | *Decoding shaft position from sensor output* | **split**: derivation → reading; generalization + quadrature → Part 3 reveal | split is sound. Δθ, position vs. average speed, quadrature and the decode-in-hardware aside are all placed. **Her framing sentence is not** — finding 7 |

**No slide of hers is marked skippable in her own notes** — checked both decks;
there is no *"this is in the video, we'll skip it"* anywhere in Day 12, so no drop
is excused on that ground and none is claimed on it.

### The clock

The plan states **110 minutes** and cites the rule (`CLAUDE.md`: even day =
Thursday, 110) in its first paragraph, written out with the reason. That part is
right and is what Day 11 got wrong.

**The Part table does not add to 110. It adds to 115.**

```
Part 1 10 + Part 2 20 + Part 3 15 + Part 4 12 + Part 5 5  =  62
                                    + Part 6 45           = 107
                                    + settling 8          = 115
```

The header's *"the taught arc is 57 minutes"* is the sum of Parts **1–4** only;
the table's own *"62 are taught or structured"* adds Part 5. So the plan carries
two different totals for the same thing and the larger one overruns by five
minutes. This is the opposite of Day 11's failure — nothing is dropped, the day is
**over**-committed — but the consequence is the same: the named pressure valve
(Part 4, 12 → 6) is already spent before the class starts, so the first thing to
overrun takes the pull-up or the build with it.

Nothing of hers is homeless for want of minutes. Her ten slides fit
comfortably in 62; the question is only which five minutes come back. Cheapest fix:
settling/transitions 8 → 3, or Part 6 45 → 40, and state one total not two.

**On the 57/45 (really 62/45) split.** It looks right in *shape* against her deck
and wrong only in arithmetic. Her ten slides are three dividers/title, two
exercises done at the desk (6 and 9), three explain slides (5, 7, 8 — two of which
are already dropped as duplicates) and a build checklist she ends on; her slide 5
note is *"really important that you get this working before you leave today."* A
deck that ends on *Complete Lab 6 setup* with no slide after it is a deck whose
last block is unstructured build time. Part 6 is inferred rather than evidenced,
which the plan says honestly and Question 6 asks her. Counting Part 2's twenty
hands-on minutes, the day is 65 minutes at the desk against 45 taught — defensible
for the last class before a lab.

### Findings

- **[MAJOR] The day's own arithmetic reaches the room nowhere.**
  `RPM = 60 × PPS / N` is objective 2, is what Lab 6 p. 5 sources from the reading
  quiz, and is the second half of the crucial step. It is placed in the **pre-class
  reading**, which generates no slides (B-1). Part 3's reveal is then specified as
  *"the same count read as an angle (Δθ = 2π / N), position versus average speed,
  the quadrature aside, decode-in-hardware over I2C"* — the rpm formula is not in
  that list. The crucial-step paragraph asserts the opposite (*"the Part 3 reveal
  restates it in full regardless of what any table found"*), so the plan contradicts
  itself and the outline is the half that becomes prose. This is exactly Day 11's
  motor equations: correct, present in the draft, and never on a wall.
  — her Day12 slide 9 / Day11x slide 21, `plans/day12.md` Part 3
  **fix**: make `RPM = 60 × PPS / N`, evaluated at the slot count they just
  counted, the **first** item of Part 3's reveal, ahead of the angle
  generalization; the outline bullet should name the formula in full. One slide,
  `sl-day12-rpm`, between the activity and the generalization reveal.

- **[MAJOR] The internal pull-up — her Lab 6 answer — has no home.**
  It is on her **slide 10 face**: *"Wire photointerrupter OUT to PA15 (internal or
  external pullup)"*, and in her **slide 6 note**: *"when you build this in Lab 6
  you'll wire this into the [Nucleo] and so you can just enable the pullup on that
  pin."* Lab 6 §2.5 offers both; Day 3 taught `PUPDR` and
  `counterResetButtonInt.c` uses it. The plan teaches the 10 kΩ resistor only, in
  Part 2, and Part 5's *"what is left"* list does not mention the pull-up at all.
  A student therefore leaves with the external resistor as the only pull-up they
  have seen for this sensor, and the lab asks for a choice.
  — her Day12 slide 10 face + slide 6 note
  **fix**: one sentence closing Part 2, next to the D7/PA15 line that is already
  *"for the lab, not for today"* — external today because you are putting a scope
  probe on that node; internal in the lab, `PUPDR` on PA15 — and one line in Part
  5's *what is left*. No new slide needed; it belongs on the Part 2 wiring slide's
  last bullet.

- **[MAJOR] The figure manifest mis-identifies slide 6's second picture, and the
  mis-identification hides an answer to Question 2.**
  Ground truth §10 says *"a second picture carries '~10 KΩ pullup'"* and asks Petra
  for a re-export. Opened at full size: `slide06_img2.png` is the **5 V regulator
  board** — barrel jack, `6–12V` silkscreen, `5V / GND / Vin` on J2 and J4 — which
  is **already in the book** as `fig-tb6612-regulator` (ch-motors.ptx:875,
  `images/Day11-Motors/…`) and was projected on Day 11 as `sl-day11-regulator`.
  It carries no callout. The rebuilt composite `slide06_9f98a1fb.png` renders
  pixel-identical to `img1`: it drops **all five** shapes — *"Exercise #1"*, the
  pullup callout, the 5 V annotation and the three arrows — so the diagnosis
  *"because it sits on a second picture"* is wrong and no re-export from her is
  needed for that image.
  The consequence that matters: her annotation *"The photointerrupter needs a 5V
  voltage supply"* sits on a slide whose second picture is the **regulator**, which
  makes a third reading of Question 2 available that ground truth §4c(ii) does not
  offer — *power the sensor from the regulator's 5 V output, not from the Nucleo* —
  and that reading is consistent with both her drawing (3.3 V on the rail and on
  the pull-up) and her annotation at once.
  — ground truth §10, row `Day12 s6`; §4c(ii)
  **fix**: correct the manifest row (second image = the regulator board, already in
  the book, do not duplicate; the composite loses all shapes, so the rebuild is an
  annotation job on the existing drawing, not a request to her); add the regulator
  reading to Question 2. Also add the missing row for **Day12 s9** — it has no
  image, but s3 has a *"none — keep as an activity"* row and s9 does not, so the
  manifest is not literally complete.

- **[MAJOR] Three items in her slide 6 speaker note are not in the plan, and one of
  them is evidence on an open question.**
  1. *"Take down the oscilloscope, multimeter, etc. Back to the barebones circuit."*
     — the starting configuration for Part 2. Wednesday left them with probes on
     the PWM node; her Part 2 begins by stripping back. Nowhere in the plan.
  2. *"just wire power and ground to **logic** power and ground"* — her own words,
     and they side with her drawing (the 3.3 V rail) against her *"5 V"* annotation.
     Ground truth §4c(ii) cites the annotation, the Lab 6 schematic and the Fritzing
     drawing, but **not this sentence**, which is the only place she says in words
     which rail she means.
  3. *"orange in this picture, white in your setup"* — the signal wire is a
     different colour on the part they hold. Her slide 7 gives a wire-colour key for
     the cabled variant and the plan carries it; the plain variant gets none.
  — her Day12 slide 6 note
  **fix**: (1) and (3) are a presenter `<note>` on the Part 2 wiring slide and one
  line beside the wiring figure (S-25 keeps (1) out of student text); (2) goes into
  Question 2 as a fourth source before she is asked again.

- **[MINOR] The D7 → PA15 lookup opens the Part the plan names as the day's
  overrun risk, and its answer is not used today.**
  The plan itself says *"needed for the lab, not for today"*, and her own arc puts
  PA15 in the **slide 10 lab checklist**, at the end of the hour. Putting a
  user-manual lookup in front of the wiring makes the first two minutes of the
  Part most likely to run long into the only content that is not needed to finish
  it — and Part 2's pull-up is the one thing the plan says must never be cut.
  — her Day12 slide 10 / `plans/day12.md` Part 2, first bullet
  **fix**: move the lookup to **Part 5**, where her arc has it and where the whole
  build is being named; it stays the day's P-11 moment and gives Part 2 back the
  two minutes. If it stays in Part 2, say explicitly that it is the first thing
  cut, not Part 4.

- **[MINOR] Her slide 10's last two firmware steps are missing from the build
  order.** Her firmware column reads: driver → *"convert pulse train to RPM,
  display **on screen**"* → *"add the 7-segment display, show ±RPM"*. That is
  screen-first, display-last, and it matches Lab 6 §2.5 then §3. Part 5's build
  order is Lab 6's **hardware** order and stops at *"then the sensor"*; the
  seven-segment display appears only as a hand-off. A 45-minute build with no
  named finishing checkpoint tends to end mid-I2C.
  — her Day12 slide 10, firmware bullets 2–3
  **fix**: extend Part 5's build-order list by two steps — rpm to the screen first,
  then the display — so the build block has a milestone that does not depend on the
  display working.

- **[MINOR] Her Day11x slide 21's framing sentence is the only line of that slide
  not placed.** *"Regardless of technology (mechanical, optical, magnetic), you must
  translate a pulse train into position / velocity information."* It is what makes
  the reveal a generalization rather than a second lap around this one sensor —
  which is precisely the plan's own argument for putting the reveal there.
  — Day11x slide 21, bullet 1
  **fix**: it is the reveal's opening line, before Δθ.

- **[MINOR] On the three additions — one of them is not an addition, and one
  displaces nothing but is priced against the wrong Part.**
  `milliseconds()` (Part 4, 12 min) is confirmed a real hole: `grep 'milliseconds()'
  source/*.ptx` returns nothing, Lab 6 requires it twice and forbids `delay_ms()`,
  and her Day 12 deck has **no code slides at all**, so it displaces nothing of
  hers — it fills the space her deck leaves between the paper exercise and the
  build. Keep it, and answer the plan's own question: **converge on the interrupt**.
  Her Day11x slide 20 opens *"Remember how to detect falling/rising edge of the
  pulse?"*, the chapter's objective at ch-motors.ptx:18 already says
  *"photointerrupter and GPIO interrupt"*, and PA15 lands in the `EXTI4_15` handler
  they wrote on Day 9 — leaving it open would leave her own callback unanswered.
  Describe polling honestly (S-19) and stop.
  The **pull-up** is not an addition at all — it is her slide 6 note promoted from
  an aside, and the plan's own additions table says so; calling it an addition is
  over-conservative but it costs nothing. The **D7 lookup** is finding 5.

### Layouts she already solved

- `fig-day12-wiring` — her slide 6 **is** `fig-tb6612-wiring-2`
  (`images/Day11-Motors/tb6612-wiring-exercise2.png`, ch-motors.ptx:1166) with the
  sensor, one resistor and two wires added; everything else on the board is
  unchanged from what the room wired on Day 11x. **Adopt hers**: annotate the
  existing book drawing rather than re-export, and say in the caption what her
  drawing already says silently — *changed from Wednesday only by the sensor and one
  resistor*. That is the same continuity move `fig-tb6612-wiring-2`'s own caption
  makes (*"changed from the first only at the driver's three logic inputs"*), and it
  is cheaper than a new figure.
- Her slide 7 — photograph plus a four-item colour key as slide text. The plan's
  *photo kept raw + small table* is that shape. **Keep.**
- Her slide 21 — bullets with the relation at the end of each line, one `<m>` per
  line, no fraction bar that matters. That is the Day 11 four-relationships shape
  she already solved. **Keep as bullets**; the manifest's *"no, not a figure"* is
  right.

### Checked and correct

Carried: her slide 3 whole into Part 1; slide 6's face and its *don't wire OUT to
the Nucleo yet* into Part 2; slide 7's cabled variant; slide 9 merged with Day11x
20 into one activity (P-16) with its detect-question correctly left open (P-6);
slide 10's hardware checklist and anchor figure into Part 5; Day11x 21's Δθ,
position-vs-speed, quadrature and decode-in-hardware asides into Part 3's reveal;
slide 5's *"really important you get this working before you leave"* into the
crucial step.

Deliberately dropped, both **verified against `source/ch-motors.ptx` rather than
accepted**: slide 5 (`sl-day11x-next` + `fig-encoder-wheel`, :2212–2242) and slide 8
(`fig-photointerrupter-video` + `sl-day11x-scope-video`, :2220–2250). Slides 1, 2
and 4 are title and dividers. No slide of either deck is unaccounted for; the plan
is the first in this chapter whose coverage table survives an audit.

## expert-cognitive-load

### Verdict: MAJOR

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| Δθ = 2π/#slots generalization (angular position, average angular speed — her slide 21) | **2, both in full** | the pre-class reading **and** Part 3's reveal | Part 3's reveal — the plan itself frames it as "new content," which is only true if the reading does not already carry it | Delete from the reading entirely. The reading keeps only the RPM arithmetic Lab 6's quiz needs (`RPM = 60 × PPS / N`); the angular generalization and the quadrature aside become genuinely first-encounter material at the Part 3 reveal |
| The pull-up / open-drain mechanism | **2, both in full** | the reading **and** Part 2 | Part 2 — this is the day's hands-on predict-then-explain moment and the crucial step's own safety net | Reduce the reading to the bare fact — "the sensor's output needs a pull-up resistor" — with no open-drain reasoning, so Part 2's "ask what the trace will look like without it" has something left to discover |
| "The pulse train cannot tell you direction" | **2** | stated as settled fact in the reading; posed as a discovery question in Part 3 | Part 3 Q4, as a genuine P-15 discovery — it also seeds Stretch 1 | The reading poses it as an open question it does *not* resolve, rather than stating the conclusion |
| Optical incremental sensor construction | 2 | Day 11x `sl-day11x-next` (functional) **and** the reading (construction) | both | **No change** — a genuinely new facet, not a repeat. Listed to show the census checked and cleared it |

### Findings

- **[MAJOR] [B-2, B-8]** The Δθ = 2π/N generalization is written into the reading in full and then Part 3's reveal claims the same content as "new content rather than a debrief." One of those claims is false. B-2 says the reading motivates and introduces; the angular-position generalization is machinery and belongs solely at the Part 3 reveal.
- **[MAJOR] [P-15, P-6]** The reading states outright that the pulses are identical whichever way the shaft turns, which is the answer to Part 3's Q4. A discovery question must not be answered ahead of it, including in a reading that precedes it by hours.
- **[MAJOR] [B-2, B-8]** The pull-up's open-drain mechanism is fully explained in the reading and then fully re-explained as "the teaching" of Part 2. Beyond the repetition, this drains Part 2's predict-then-explain step of its function.
- **[MAJOR] [P-7]** With those three uncut, the reading carries five simultaneous new elements for a desk read with no hardware and no instructor — over budget, and two of the five are machinery B-2 excludes from a reading. Trimming per the census brings it to three.
- **[MAJOR] [P-7, P-2]** Part 4 packs four moves into 12 minutes: `milliseconds()`, a predict-then-fail, an honest interrupt-vs-poll comparison, and a design activity with an instructor solution. The first three are a defensible mini-arc for one new idea; the fourth competes for the same 12 minutes. **Move "sketch the main loop" to open Part 6** — it needs unhurried thinking time, and Part 6 already has instructors circulating to react to what groups sketch.
- **[MAJOR] [P-9, P-2]** The scaffold fades correctly through Day 11 and Day 11x, but the day's newest technical piece — the pulse counter and the three-rate loop — jumps from a demo of the broken version to independent build with only a *projected* instructor worked example as a net, not a student-facing skeleton. `counterResetButtonInt.c` softens this but **is not named as a resource** in Part 4 or Part 6. Name it explicitly as the starting point.

**Also recorded:** the seven-segment hand-off is fair for what the driver does, but the *signed* counter and its minus sign were homework, never reviewed in class, and are now load-bearing for a graded deliverable. That piece deserves a one-line pointer to `subsec-i2c-ref-ht16k33`, not silent confidence.

---

## learner-anxious-nonhardware

### Verdict: BLOCKER

**Where the day becomes frightening rather than difficult:** not Part 2 — Part 2 is guided, whole-room and short. It is the seam between Part 5 and Part 6. At about minute 65 the room goes from "everyone does the same three wires together" to "45 minutes, no script" while assembling a live 9 V adapter, 5 V regulator, H-bridge, motor and pot — the first time all of it exists on one breadboard at once. Difficulty is fine. What is frightening is that nothing in the outline says what a correct *intermediate* state looks like, so a wrong result and a not-yet-finished result are indistinguishable from the inside.

### Findings

- **[BLOCKER] [P-14, P-2]** Part 2's own risk note says the pull-up "must never absorb an overrun", but the outline gives no diagnostic path for a table whose trace is still noise *after* the resistor goes in — wrong header pin, swapped power and ground, the probe on the wrong node, the wrong AD2 channel. With 45 unscripted minutes riding on this step, add a stated checkpoint inside Part 2 (a minute mark, and two or three named things to check against) so a stuck table knows where to look rather than waiting silently.
- **[MAJOR] [P-14]** The build's only diagnostic structure — Part 5's staged test order — names an **order** but not an **expected result** at each stage. Add what a pass looks like at each of the five stages (driver alone on Waveforms, pot alone, regulator alone, motor added, sensor added), or a stalled build at minute 90 has no way to localize the fault. This is structure, not reassurance, so B-12 does not bar it.
- **[MAJOR] [B-12]** The Lab 6 hazards — 5 V onto the Nucleo, and the "hot smell" — are absent from the day even though Part 6 is where they become live, and the pot's rail is unresolved between 3.3 V and 5 V in her own sources. State the hazard plainly once (which wire, which rail, why), in the register B-12 already permits for a physical claim. What must **not** be added is a sentence saying the day "does not involve" some risk.
- **[MINOR] [P-2]** Part 2 has no internal checkpoint minute for the whole-room wiring step, unlike the pattern Day 11x's gate recommended for its dense activity. Twenty minutes with no marker means a table can be behind without anyone — themselves included — knowing until Part 4 or Part 6 exposes it.
- **[MINOR] [P-1]** Part 3 restates the arithmetic in full regardless of the reading (good, keep it), but Parts 1 and 2 have no equivalent foothold for a student who arrives without the reading.

---

## learner-firstgen-novice

### Verdict: MAJOR

**Where I get lost first:** Part 2's pull-up moment. It is scheduled as the room's shared moment, and it silently requires me to still hold Day 10's open-drain explanation from weeks ago — the plan's citation is a cross-reference, not a restatement. That is a silent forward-dependency living inside the one Part that carries the crucial step.

**Vocabulary audit.** Taught: photointerrupter (with a new figure), `milliseconds()` (from zero, with real code — the model the others should follow). Assumed: phototransistor (leans on Day 6), pull-up and open-drain (Day 3, Day 10), EXTI (Day 9), duty cycle (Day 11). **Unexplained:** *open-collector*, which is a new word riding on a half-remembered one; *dead band*, which appears in Part 5 and the build and is defined nowhere; and **PPS**, never expanded.

### Findings

- **[MAJOR] [P-4, P-2]** The only wiring figure a hardware novice has for the crucial step is recorded in ground truth §10 as self-contradictory (a 5 V label against a 3.3 V drawing). For someone who has never wired a breadboard the wiring figure is not an illustration, it **is** the instruction. Resolve before Gate 2 rather than leaving it "held pending Question 2".
- **[MAJOR] [P-1, P-2]** Part 2's pull-up depends on Day 10 via an `xref` only. Add the one-clause lifeline P-2 calls for, in Part 2's own text: *the phototransistor can only pull the line down, so whatever the pull-up is tied to sets the HIGH level.*
- **[MAJOR] [P-1, B-8]** Ground truth §7 equates "open-collector" and "open-drain" without telling the student they are the same idea in two transistor families. Either add one sentence naming the equivalence, or use one term throughout.
- **[MAJOR] [P-1]** **"Dead band"** appears in Part 5's build list and again in the build itself, with no definition anywhere in the day. Define it, or say plainly where it is defined.
- **[MINOR] [B-9a]** **PPS** is never expanded to *pulses per second* at first use.
- **[MINOR] [P-2, B-11b]** Part 1 has no reveal by design, which is right for a student who can look the answers up — but leaves a student who skipped the homework with nothing resolved after ten minutes. A one-line pointer to `sec-motors-day11x` costs nothing.

---

## expert-class-logistics

### Verdict: BLOCKER

### Running clock

**The plan's own numbers do not sum to 110.** 10 + 20 + 15 + 12 + 5 + 45 + 8 = **115**. The class is five minutes over budget on paper, before a single student mis-wires anything, and the stated "62 taught + 45 build" is never reconciled against the 110 it claims.

Simulated with realistic hardware time on top: settling runs to 0:05; Part 1 ends 0:15; Part 2 realistically takes **28 minutes** for a full room wiring a new sensor, a pull-up and an AD2 probe with no benches, ending 0:45 rather than 0:37; Part 3 ends 1:00; Part 4 cut to 6 by the named valve ends 1:06; Part 5 ends 1:11; transition to 1:13. **That leaves 37 minutes for the build against 45 budgeted** — an 18 % cut, absorbed silently because it is last and "open" — and **zero minutes for any recap.**

### Findings

- **[BLOCKER] [S-8]** The Part table sums to 115, not 110. Correct the accounting or cut five explicit minutes.
- **[MAJOR] [P-2, S-8]** Part 2's 20 minutes is optimistic for first-time hardware in a full room with no benches. A realistic number is **28–32**. The plan already names Part 2 as the only Part gated on hardware working for everybody; the estimate should reflect that, not merely flag it.
- **[MAJOR] [S-8]** The single named valve is too small and one-sided. Part 4 at 12 → 6 saves six minutes against a likely eight-to-twelve-minute Part 2 overrun plus the five-minute baseline deficit. There is no second valve, and **Part 6 has no stated floor**, so it absorbs the shortfall by default. Name Part 3's reveal as a second valve and give the build an explicit floor.
- **[MAJOR] [S-8]** **No recap exists anywhere in the sequence.** S-8's arc ends in *recap or looking ahead*; here "wrap" shares an 8-minute bucket with settling and two transitions, so it is first to vanish. Carve a protected close, announced — stop with five minutes left and have everyone report where they are.
- **[MAJOR] [B-11c]** Part 2 does not say where the sensor's supply comes from **if it turns out to be 5 V**. No regulator exists yet at that point in the class (Lab 6 wires it later), and there are no benches to supply it from. If Petra answers "5 V", Part 2 needs a concrete source before it can be taught.
- **[MINOR] [S-25]** Part 6 carries the no-classroom-management flag; **Part 2 needs the same flag**, since it is the day's other high-failure-rate hardware activity and "ask your table" will otherwise creep into the task when it is drafted.

---

## expert-continuity-auditor

### Verdict: MAJOR

### Findings

- **[MAJOR] [P-1, internal consistency]** `plans/day12.md` **Objective 3** states as settled fact ("...why pulling a **5 V-powered sensor's** output up to 3.3 V...") the very premise the plan's own Risks section calls unresolved — *"Nothing may say 5 V about anything on the logic side until she answers."* State it generically until Question 2 is answered: *why pulling an open-collector sensor's output up to 3.3 V gives a safe signal regardless of the sensor's own supply.*
- **[MINOR] [L-5, L-6]** Ground truth §7 calls the sensor's output **open-collector** and "the same idea" as Day 10's **open-drain**, and the outline goes further and calls it outright "Day 10's open-drain output". Day 10 taught open-drain as a specific `OTYPER` GPIO configuration; the sensor's output is a discrete BJT's collector with no `OTYPER` bit anywhere. Functionally identical, not the same mechanism. One clause distinguishing "the same behavior on a different kind of transistor" stops a student going to look for an `OTYPER` equivalent on the sensor.

### Verified, no finding

- **Day 9 → Day 12 EXTI transfer.** `subsec-day9-ftsr-imr-nvic` states explicitly that *"the bit number **is** the line number, in all three EXTI registers"* (`ch-gpio-interrupts.ptx:850`), and `subsec-day9-isr`/`subsec-day9-code` already handle **two lines sharing `EXTI4_15_IRQHandler`** (PC13 and PB4 both land there, `ch-gpio-interrupts.ptx:1305`). The transfer to PA15 / line 15 is exact and fully supported. Nothing forward-referenced.
- **`milliseconds()` is taught nowhere** — grepped `source/*.ptx` for the literal call: **zero matches**. `delay_ms()` is taught on Day 2 purely as a black box, its listing never showing the SysTick handler or the counter it reads, and Day 8 never mentions SysTick either. Part 4 genuinely is the first time the book opens this box. Lab 6 §2.2 and §2.5 require it twice and forbid `delay_ms()` for timing, exactly as claimed.
- **The seven-segment hand-off is complete.** `SevenSegPartial.c` defines only `SevenSeg_init/blink/dim/write`; `SevenSeg_number()` is student-written in `act-i2c-homework` task 1, with the signed case in task 2 and the reference solution in an `<instructor>` block. What Lab 6 §3 needs is the composition of those two pieces, which is reasonable lab work rather than an un-taught gap.
- **Nothing downstream depends on Day 12.** Grepped `ch-servos.ptx`, `ch-photosensors.ptx` and `ch-accelerometers.ptx` for `milliseconds`, `photointerrupter`, `RPM`, `EXTI15`, `pulse` — no chapter after Day 12 reuses this day's material, so it creates no obligation it fails to meet.

---

## learner-weak-circuits

### Verdict: BLOCKER

### Findings

- **[BLOCKER] [P-1]** The pot's top terminal wired to +5 V with its wiper on PA0 (Lab 6's schematic, ground truth §4c(i)) is a live risk of putting 5 V on a 3.3 V ADC pin, and **no student-facing hazard box exists for it** — unlike Day 11's regulator Part, which has one. Add an explicit line in Part 5/6: the pot's outer legs go to 3.3 V and ground, never the 5 V rail, **regardless of how Question 1 resolves**. This is the riskiest single wire in the day.
- **[BLOCKER] [P-4, P-15]** `fig-day12-wiring` — ground truth §10 leaves it unresolved whether the resistor **symbol** survives in the rebuilt composite or only its text label is missing. If the symbol is gone, the diagram is wireable into a floating input, which is the day's own central failure mode. Confirm before Part 2 ships. *(Resolved by the orchestrating session — see the change list: the resistor is drawn in the Fritzing artwork itself, at breadboard column ~15; only the label was a separate text shape.)*
- **[MAJOR] [P-4]** Part 2's pull-up explanation leans on Day 10's `fig-open-drain`, which is a **two-device bus-arbitration** diagram — not the single-transistor, two-state case this day needs (beam blocked → transistor off → resistor pulls the node to 3.3 V; beam clear → transistor on → node LOW). Those are different circuits. Add a **two-panel sensor-state figure** to the reading so the claim is shown rather than asserted.
- **[MAJOR] [P-1]** **The 10 kΩ value is never justified.** Why a pull-up at all is answered; why *this magnitude* is not. One line of trade-off — too low wastes current and loads the transistor harder, too high is slow against stray capacitance and picks up more noise.
- **[MAJOR] [P-4, P-7]** The **pot's dead band** is named only as build-time work in Part 5, with no worked ADC-count → volts → direction → PWM pass anywhere. Add one worked example before Part 6.
- **[MINOR] [P-1]** Day 11's shared-ground rule (`subsec-day11-direction`: *"All 5 V wires need to stay on the motor side and never touch the 3.3 V rail"*) is good but is never restated for the **third** supply (the 9 V adapter) and the two new grounded peripherals Day 12 adds. One sentence at the top of Part 6.

---

## expert-active-learning

### Verdict: MAJOR

**On the design decision ground-truth §9 asks Gate 1 to confirm:** **converge Part 4 on the interrupt.** The objective is already in `ch-motors.ptx:18`, PA15 / EXTI15 lands in the exact Day 9 handler, and the 60 Hz-against-100 Hz arithmetic makes naive polling a real failure. The recommendation is sound; the gap is that Part 4 as written **tells** students this rather than having them reach it.

**P-6 leak check on Part 3 Q2:** no leak of the *detection mechanism* — the reading, the Part 2 figure and the D7/PA15 lookup all stay silent on interrupt versus poll.

### Findings

- **[MAJOR] [P-6, B-8, S-10]** **Part 3's "reveal" is contradicted by its own coverage table.** The coverage table assigns the angular-position generalization exclusively to Part 3 and calls it new; the Before-Class outline already writes out Δθ = 2π/N, `pulse_count × Δθ` and `pulse_count/time × Δθ`. It cannot be both. A student who did the reading arrives holding the reveal's content, and the reveal becomes the condescending restatement Petra rejected on Day 7. **Cut the reading at `RPM = 60 × PPS / 20`.**
- **[MAJOR] [P-6, P-17]** **Objective 5 is narrated, not exercised.** Part 4 predicts correctly, then the instructor does the interrupt-versus-poll comparison and states both conclusions *before* the student activity. The activity is about scheduling three rates, not about choosing. The one objective that names a decision has no task that asks a student to make it. **Fold the choice into the sketch task** — *given the 60 pulses per second you measured, will your loop poll or interrupt, and why* — before the two answers are given.
- **[MAJOR] [P-14]** **No route back for a student whose Part 2 wiring fails.** The only named mitigation is a *time* valve, which does nothing for a bad connection. A diagnostic grounded in the open-drain teaching itself — floating trace → no pull-up; flat line → beam or LED; noisy square wave → ground — is **content, not classroom management**, so S-25 does not bar it.
- **[MAJOR] [P-6]** **Part 2's one clean predict-verify moment is one sentence from being destroyed by drafting order.** The resistor is listed inside the wiring bullet, and only the *next* bullet says to ask what the trace looks like before it goes in. A drafter reading top to bottom will write the resistor into the build steps first. Move the predict question into the wiring bullet, immediately before the resistor is named.
- **[MINOR] [S-2, P-6]** Part 1 has no point where an **individual** commits anything — ten minutes a quiet student can coast through. A one-line ask ("write down one line of `TTmotor_ramp.c` your table can now explain, and one it cannot") converts it to retrieval every student does.
- **[MINOR] [P-6]** Part 2's D7/PA15 lookup softly foreshadows Part 4. Keep its framing strictly about **which pin**, not which register set.

**Cleared, no finding:** the three stretches are genuine additions, not withheld pieces of the crucial step. Stretch 2 (quadrature) looks like a repeat of Part 3's reveal, but the reveal only *mentions* quadrature while the stretch requires *sketching* the waveforms — application, not duplication.

---

## expert-rigor-hawk

### Verdict: MAJOR

### Findings

- **[MAJOR] [S-19, B-6]** **`RPM = 60 × PPS / N` silently assumes one counted edge per slot.** Her own slide 21 says *"count pulses (rising **or** falling edges)"*, and Day 9 hands students the exact registers — `FTSR1` and `RTSR1` — to trigger on **both**. A student who wires any-edge detection, a completely natural extension of Day 9, gets 2N transitions per revolution and reports **twice the true rpm** with a formula that never told them why it broke. Add one sentence: count one edge per slot; counting both doubles the apparent PPS and needs N → 2N.
- **[MAJOR] [S-19, B-6]** **The interrupt-versus-poll argument states the wrong sufficient condition.** Sampling frequency alone does not determine whether a poll misses a digital pulse; the condition is **T_poll < the shorter of the high time and the low time**, which is set by the wheel's **duty cycle**, not by PPS. At 50 % duty and 60 PPS the high time is ≈ 8.3 ms against a 10 ms poll — misses are likely — but that rests on a duty-cycle assumption asserted nowhere and sourced to no datasheet. If the slots are wider than the spokes, the same 60 PPS could be safe to poll. State the real condition, and either source the duty cycle or say plainly it is assumed ~50 % pending Question 3.
- **[MAJOR] [B-11c, S-19]** **The 5 V → 3.3 V pull-up safety claim rests on an assumption, not a lookup.** It is true only if the EE-SX672's output stage has **no internal pull-up to its own supply**. Many phototransistor modules ship with exactly that; if one is present, the external 3.3 V pull-up fights it through a divider and the HIGH level lands somewhere between 3.3 V and 5 V — the very failure the argument exists to prevent. This is the highest-consequence claim in the day. Attach its condition until the datasheet settles it.
- **[MAJOR]** **The arithmetic is load-bearing on an unverified 180 rpm.** Recomputed at the bounds: at **120 rpm**, PPS = 40 and the high time at 50 % duty is 12.5 ms — *longer* than a 10 ms poll, so a naive poll is arguably safe and "the arithmetic forces the interrupt" is **false**. At **250 rpm**, PPS ≈ 83, high time ≈ 6 ms, and the argument holds and is stronger than stated. Either make the argument over the plausible range, or be honest that it is a demonstration rather than a proof until Question 5 is answered.
- **[MAJOR]** **Stretch 3's "count edges both ways doubles the count"** is offered as a remedy without noting that it requires N → 2N. Same gap as the first finding, recurring in the day's most careful quantitative moment. A fast group that "does better" this way and forgets the adjustment reports double the rpm and has no way to notice.
- **[MINOR]** **"Timing the interval inverts the trade" is asserted with no numbers.** The crossover is the actual content and is free to state from numbers already in the plan: at 3 rpm the interval is ~1000 ms and a 1 ms tick gives ~0.1 % error against a counting method that sees one pulse in a one-second window; at 180 rpm the interval is ~16.7 ms and the same tick gives ~6 %, worse than counting's ~1.7 %.

### Verified, no finding

- **Stretch 3's headline arithmetic is right.** At N = 20 one pulse of miscount in a one-second window is 60 × 1 / 20 = **3 rpm**, and at 30 rpm (PPS = 10) that is 3/30 = **10 %**.
- The core derivation (edge-counting gap aside), the D7 → PA15 mapping, and `EXTI_EXTICR4` / 0x06C / `EXTI15[7:0]` are correctly derived and independently sourced.
- `milliseconds()` (SysTick reload 12000 − 1 at 12 MHz → a 1 kHz tick) is stated correctly and is real cited code, not invented. **This is the one place the day adds genuine depth rather than removing it.**

**On whether the 45-minute build has thinned the taught arc: no.** The direction-sourcing insight is answered in Part 3's main line rather than deferred to a stretch, and Part 4's design activity is substantive rather than transcription. The disagreement is narrower and sharper: three central quantitative claims are stated at a strength the evidence does not support, and the fix in each case is a sentence naming the actual condition.

---

## committee-synthesizer — the change list

### Verdict

Not ready for Petra, but closer than Day 11 ever was. Nothing of hers is lost, both
duplicate drops verify against source, and the coverage table survives an audit.
The single biggest problem is that **the plan's own arithmetic does not fit its own
hour and does not reach its own room**: the Part table sums to 115, and
`RPM = 60 × PPS / N` — the second half of the named crucial step — lives only in a
pre-class reading, which generates no slides. Those two compound: with five minutes
overdrawn and the only valve pre-spent, the first thing to overrun takes the pull-up
or the build with it. Items 1–7 block sign-off.

**Not on this panel:** `checker-voice`, `checker-technical-accuracy`,
`checker-figure-claims`. The register pass on drafted prose is still owed at Gate 2′
and must not be assumed clean because Gate 1 was quiet about it.

### Must fix (blocks sign-off)

**1. [S-8] The Part table — replace wholesale.** It sums to 115, and the header
carries a second, different total (57). Realistic hardware time makes Part 2's 20
minutes fiction; there is no recap anywhere; Part 6 has no floor, so it absorbs
every overrun silently. One table, one total:

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 4 | — | Settling and the two transitions |
| **1** | 10 | discuss | Questions about `TTmotor_ramp.c` |
| **2** | **26** | **do** | Wire the sensor and look at what it says |
| **3** | 15 | do → reveal | From a pulse train to a number |
| **4** | **10** | predict → commit → explain | A loop that does three things at three rates |
| **5** | 5 | explain | The whole build |
| **6** | **35** | **build** | Open build time — **floor 25** |
| **close** | **5** | — | **Protected and announced**: stop, everyone says where they are |

**Total 110**, of which **66 taught or structured**, 35 build, 5 close. Delete the
"57 minutes" sentence. Part 2 gains six minutes plus two more from item 8.

**Valves, in the order they are spent:** (i) Part 6 down to its 25-minute floor;
(ii) Part 4's poll-vs-interrupt comparison moves into Part 6's opener, taking Part 4
to 6 — the `milliseconds()` mechanic, the predict-then-fail and the 2-minute commit
are never cut; (iii) Part 3's reveal drops the quadrature and decode-in-hardware
asides, which survive as Stretch 2 and a Reference line. **Never absorbs an
overrun:** Part 2's pull-up, `sl-day12-rpm`, the 5-minute close.
*(`expert-class-logistics` BLOCKER, `checker-arc-fidelity`, `expert-cognitive-load`)*

**2. [B-1, B-2, B-8, P-15, P-6] Move the arithmetic to the room; cut the reading to
three elements.** The crucial step's second half reaches no wall, and the
crucial-step paragraph asserts the opposite — Day 11's motor equations repeating.

*Part 3's reveal, in this order:* (a) her Day11x slide 21 framing sentence verbatim
— *"Regardless of technology (mechanical, optical, magnetic), you must translate a
pulse train into position / velocity information"*; (b) **one new slide,
`sl-day12-rpm`** — `RPM = 60 × PPS / N`, evaluated at the slot count they counted in
Q1 against the rate they measured in Part 2; (c) Δθ = 2π/N, position versus average
speed; (d) quadrature and decode-over-I2C as asides. Not a P-6 restatement, because
both numbers going into it are theirs.

*The reading keeps exactly three elements:* the sensor's construction in her slide-5
words + `fig-photointerrupter-beam`; the derivation ending at
`RPM = 60 × PPS / 20`; and the bare fact that the output needs a pull-up, **with no
open-drain reasoning**. **Delete from the reading:** the whole Δθ / position /
average-speed generalization, and the sentence stating the pulses are identical
whichever way the shaft turns — the reading **poses** direction as a question it does
not answer, because that is Part 3 Q4.
*(`checker-arc-fidelity`, `expert-cognitive-load`, `expert-active-learning`)*

**3. [B-11c, S-19, P-1] Condition the 5 V → 3.3 V safety claim.** Objective 3 states
as settled fact the premise the Risks section calls unresolved. And the claim is true
only if the EE-SX672's output stage has **no internal pull-up to its own supply**; if
one is present, the external 3.3 V pull-up fights it through a divider and the HIGH
level lands between 3.3 V and 5 V — the very failure the argument exists to prevent.
Rewrite Objective 3 generically. Teach only Lab 6 §2.5's verified *10 kΩ to 3.3 V*,
with the mechanism and its condition attached. **Nothing says 5 V about anything on
the logic side until Questions 2 and 3 are answered.** This condition goes in Part 2
only; the reading does not gain it. *(`expert-rigor-hawk`, `expert-continuity-auditor`)*

**4. [P-14, P-2, S-25] Add a symptom→cause list and a stated expected result to
Part 2. Ruling: S-25 does not bar this.** S-25 bans classroom management — who to
ask, spare hardware, what to do while you wait, how long a step takes. A
symptom→cause list grounded in the day's own open-drain teaching is **engineering
content**, the kind `ch-debugging.ptx` is a whole chapter of. It goes in
student-facing text:

- *expected result, as the checkpoint*: **turn the wheel by hand — the trace toggles
  between 0 V and 3.3 V once per slot.** (The minute mark is a presenter `<note>`;
  S-25 does bar "how long a step takes".)
- *symptom → cause*: noise wandering mid-rail → nothing is pulling the line up, the
  pin is floating; flat at 3.3 V and never moving → the beam is never blocked, or the
  LED side has no power; flat at 0 V → power and ground swapped at the sensor; a clean
  square wave that does not change with the ramp → the probe is on the wrong node.

Also carry the S-25 flag on Part 2, not only Part 6.
*(`learner-anxious-nonhardware` BLOCKER, `expert-active-learning`, `learner-weak-circuits`)*

**5. [B-12, P-1] One hazard paragraph, at the end of Part 5, before the build
opens.** Three reviewers found three holes that are one hole. Plainly, once, in the
register B-12 permits for a physical claim — which wire, which rail, why:

- **The pot's outer legs go to 3.3 V and ground, never to the 5 V rail** — its wiper
  feeds PA0, an analog input on a 3.3 V part. Holds **regardless of how Question 1
  resolves**; the riskiest single wire in the day.
- The regulator's 5 V is **motor power only** and never touches the breadboard's
  power rail (Lab 6 §2.3's own box).
- The 9 V adapter, the Nucleo and the regulator now share one ground, and every
  ground on the board must be that ground — the third-supply restatement of
  `subsec-day11-direction`.

*(`learner-weak-circuits` BLOCKER, `learner-anxious-nonhardware`)*

**6. [P-4, P-15, B-11a] Figure list, reconciled. Nothing is requested from Petra.**

- **`fig-photointerrupter-beam`** — the **reading**. Hand-authored SVG: LED, slot,
  phototransistor, and the resulting square wave. **Mechanical only** — no transistor
  symbol, no pull-up, no node levels. B-11a: `width` **and** `height` matching the
  `viewBox`.
- **`fig-photointerrupter-states`** — **Part 2, NEW**, two panels. A: slot open →
  beam reaches the phototransistor → it conducts → node LOW. B: spoke blocking →
  transistor off → the 10 kΩ pull-up holds the node at 3.3 V. This replaces the
  `fig-open-drain` cross-reference, which is a **two-device bus-arbitration** diagram
  and not this case. Do not merge it with the beam figure — the boundary between them
  is the B-8 line between motivation and machinery.
- **`fig-day12-wiring`** — **annotate the book's existing
  `images/Day11-Motors/tb6612-wiring-exercise2.png`** (`ch-motors.ptx:1166`), adding
  only the sensor, one resistor and two wires. Caption says what her drawing says
  silently: *changed from Wednesday only by the sensor and one resistor*. P-15 holds:
  no pull-up **value** on the figure, no `OUT → PA15` arrow, and a source comment
  saying the omission is deliberate.
- **`slide06_img2.png` is the regulator board**, already in the book as
  `fig-tb6612-regulator`. `<xref>` it; do not duplicate. Correct the §10 row.
- Unchanged: slide 7 photo raw + colour table; slide 5's two new photos as one
  `<sidebyside>` in the reading; slide 10's whole-build Fritzing as Part 5's anchor
  with every pin name as text beside it; slide 21 stays bullets.
- **Figures needed from Petra: none.**

*(`learner-weak-circuits`, `checker-arc-fidelity`, `learner-firstgen-novice`)*

**7. [P-6, P-17, S-19, B-6] Part 4 — DECIDED: converge on the interrupt, and have
them choose before you tell them.** Unanimous, and the evidence is settled:
`ch-motors.ptx:18` already states the objective, her Day11x slide 20 opens
*"Remember how to detect falling/rising edge of the pulse?"*, and PA15 lands in the
`EXTI4_15` handler they wrote on Day 9. Strike both "Gate 1 is asked to confirm"
sentences. Three changes to how Part 4 runs:

- **Objective 5 is narrated, not exercised.** After the predict-then-fail and
  **before either answer is given**, a **2-minute commit**, individually then to the
  room: *given the pulse rate you measured in Part 2, will your loop poll or
  interrupt — and why?* The only task in the day that asks a student to make the
  decision Objective 5 names. Not a valve.
- **State the real condition** [S-19]: the condition is **T_poll < the shorter of the
  high time and the low time**, set by the wheel's duty cycle — not "100 Hz against
  60 Hz". Say the ~50 % duty is an assumption pending a source, and make the argument
  survive the number: **the interrupt's real advantage is that it removes the
  dependence on the top speed altogether.** Numbers are a demonstration, not a proof.
- **Move "sketch the main loop" to open Part 6**, with its `<instructor>` answer
  projected there and **`counterResetButtonInt.c` named explicitly as the starting
  point** [P-9].

*(`expert-active-learning` ×2, `expert-rigor-hawk` ×2, `expert-cognitive-load` ×2,
`checker-arc-fidelity`, `expert-continuity-auditor`)*

### Should fix

**8. [P-11, B-8a] Move the D7 → PA15 lookup to Part 5; give the internal pull-up a
home.** The lookup opens the Part named as the overrun risk and its answer is *"for
the lab, not for today"*; her own arc puts PA15 on the slide 10 lab checklist. Keep
its framing strictly about **which pin**, not which register set. Separately, the
**internal pull-up is her Lab 6 answer and has no home at all** — slide 10 face
(*"internal or external pullup"*) and slide 6 note. One sentence closing Part 2 —
*external today, because you are putting a scope probe on that node; internal in the
lab, `PUPDR` on PA15, as Day 3 taught and `counterResetButtonInt.c` uses* — and one
line in Part 5's *what is left*. *(`checker-arc-fidelity`, `expert-class-logistics`)*

**9. [P-14, P-4, P-7, P-1] Part 5 — expected results, two more build steps, the dead
band worked.**
- Add a **pass criterion** per stage: driver alone on Waveforms → a square wave whose
  duty follows the commanded speed; pot alone → `ADC1->DR` sweeps end to end as the
  knob turns; regulator alone → 5 V at its output with nothing else connected; motor
  added → it turns both ways from the truth table; sensor added → the trace toggles
  once per slot.
- Extend the build order by her last two firmware steps: **rpm to the screen first,
  then the seven-segment display** — her own slide 10 order, and Lab 6 §2.5 then §3.
  It gives the block a milestone that does not depend on the display working.
- **"Dead band" is used twice and defined nowhere.** Define it by working it: one
  ADC-count → volts → direction → PWM pass at three counts. Add the pointer to
  `subsec-i2c-ref-ht16k33` for the signed counter and its minus sign — homework,
  never reviewed in class, now load-bearing for a graded deliverable.

*(`learner-anxious-nonhardware`, `checker-arc-fidelity`, `learner-weak-circuits`,
`learner-firstgen-novice`, `expert-cognitive-load`)*

**10. [S-19, B-6] The formula assumes one counted edge per slot — say so where the
formula is used.** Her slide 21 says *"rising **or** falling edges"* and Day 9 hands
students `FTSR1` **and** `RTSR1`. Any-edge detection gives 2N transitions per
revolution and **twice the true rpm**. One sentence on `sl-day12-rpm`; the same clause
on Stretch 3's *"counting edges both ways doubles the count"*; one line in the
Reference. **Not in the reading** — the reading has no detection mechanism yet and
putting it there leaks toward Part 3 Q2. *(`expert-rigor-hawk` ×2)*

**11. [P-1, L-5, L-6, B-9a] The vocabulary lifelines — four clauses.**
- **open-collector vs open-drain**: *the same behavior on a different kind of
  transistor — there is no `OTYPER` bit on the sensor.* Stops a student hunting for a
  register that does not exist.
- **the Day 10 lifeline in Part 2's own text**, not as an `xref`: *the phototransistor
  can only pull the line down, so whatever the pull-up is tied to sets the HIGH level.*
- **why 10 kΩ**: too low wastes current and loads the transistor harder; too high is
  slow against stray capacitance and picks up more noise.
- **PPS** expanded to *pulses per second* at first use [B-9a].

*(`learner-firstgen-novice` ×4, `expert-continuity-auditor`, `learner-weak-circuits`)*

**12. [P-6, P-15, S-2] Two drafting-order fixes that are lost if not written down
now.**
- **Part 2's predict-verify moment is one sentence from being destroyed by drafting
  order.** The resistor is listed inside the wiring bullet and the predict question is
  in the *next* bullet. **Move the predict question into the wiring bullet,
  immediately before the resistor is named.**
- **Part 1 has no point where an individual commits anything.** One line does both
  jobs: *write down one line of `TTmotor_ramp.c` your table can now explain, and one
  it cannot*, plus a pointer to `sec-motors-day11x`. No reveal slide — that is S-10.

*(`expert-active-learning`, `learner-firstgen-novice`)*

### Consider

**13. Ground truth §10 and §13 — three record corrections.** Add the missing manifest
row for **Day12 s9**. Add to **Question 2** the two sources it does not cite: slide 6's
second picture is the **regulator board**, which makes a third reading available —
*power the sensor from the regulator's 5 V output, not from the Nucleo* — and her
slide 6 note says in words *"just wire power and ground to **logic** power and
ground"*, the only place she states a rail in prose, and it sides with her drawing
against her annotation. Ask once with all four sources on the table.

**14. Part 2 — two lines from her slide 6 note that are nowhere in the plan.**
(a) *"Take down the oscilloscope, multimeter, etc. Back to the barebones circuit"* —
the starting configuration, since Wednesday left probes on the PWM node. Presenter
`<note>`, not student text. (b) *"orange in this picture, white in your setup"* — the
signal wire is a different colour on the part they hold; her slide 7 gives a colour
key for the cabled variant and the plain one gets none.

**15. Stretch 3 — state the crossover instead of asserting it.** At 3 rpm the interval
is ~1000 ms and a 1 ms tick gives ~0.1 % error against counting's one pulse in a
one-second window; at 180 rpm the interval is ~16.7 ms and the same tick gives ~6 %,
worse than counting's ~1.7 %.

### Escalate to Petra

- **The sensor's supply is a teachability question, not just an ambiguity.** If it
  runs on 5 V, Part 2 has **no source for it** — the regulator is not wired until Lab 6
  §2.3, well after Exercise 1, and there are no benches. And the 3.3 V pull-up's safety
  additionally depends on the EE-SX672 having no internal pull-up, which no document in
  the repo can settle. **Recommendation:** answer Question 2 with the rail students
  actually wire in Exercise 1, and approve Question 3.
- **The build is 35 minutes here, not 45, with a floor of 25 — and that is a guess.**
  Your deck ends on *Complete Lab 6 setup* with no slide after it, so the block's size
  is inferred from the deck's shape. **Recommendation:** confirm or correct (Question
  6); if the real number is 45, Parts 1 and 5 are where the ten minutes come from, not
  Part 2 and not the close.

### Dissent worth recording

- **`expert-cognitive-load` wanted the design activity moved *wholly* out of Part 4**
  on P-7 grounds; the 2-minute commit stayed on `expert-active-learning`'s P-17
  grounds, because Objective 5 otherwise has no task that asks a student to make the
  decision it names. If Part 4 runs over on the day, the load argument was right and
  the commit is the first thing to go — but then Objective 5 has to be rewritten to
  stop claiming a choice the day never asks for.
- **`expert-rigor-hawk` is right that the arithmetic does not force the interrupt
  across the plausible speed range** — at 120 rpm the high time is ~12.5 ms against a
  10 ms poll, and "the arithmetic forces it" is false there. Overruled as a reason to
  reopen the decision, because the objective, her slide 20 and the Day 9 handler all
  point one way. But if Question 5 comes back near 120 rpm, Part 4's argument must be
  rebuilt on *the interrupt removes the dependence on the top speed* and the numbers
  demoted to an illustration — **not patched with a bigger number**.
- **`learner-firstgen-novice` asked that the wiring figure's 5 V/3.3 V contradiction be
  resolved before Gate 2 rather than held.** Overruled — for a hardware novice the
  wiring figure *is* the instruction, which is exactly why guessing is worse than
  waiting. But if Petra has not answered by Gate 2′, this becomes the blocker on
  drafting Part 2 at all, not a held question.
