# Day 11x — Gate 3 review

The deck's committee, on the 33-entry deck and the prose it condenses. Under the
pilot ordering this is also the first review the **prose** has had beyond Part 1
(Gate 1.5 covered Part 1 only).

Panel per `.claude/agents/README.md`: `learner-in-the-room` (lead), `checker-voice`,
`checker-arc-fidelity`, `checker-figure-claims`, `learner-visual`,
`expert-cognitive-load`, `expert-class-logistics`.

The deck was rendered to 33 PNGs at 1600×900 and handed to the two visual
reviewers rather than given as paths.

---

## learner-in-the-room — verdict: BLOCKER

Walked all 33 in projection order with no book open. Its slide-by-slide table
found real content on all but the glue slides; the failures are concentrated in
what a student can *act on* from the wall.

- **[BLOCKER] `PSC_FACTOR` and `PWM_TIMER_MAX` are never on the wall.**
  `sl-day11x-init-timing` shows `TIM14->PSC = PSC_FACTOR-1;` and
  `TIM14->ARR = PWM_TIMER_MAX-1;`, and the `#define` block that gives those names
  their values is on no slide. It propagates: `sl-day11x-set-code` clamps to
  `PWM_TIMER_MAX-1`, the stretch refers to "the two commented-out `#define`
  lines", and `fig-pwm-resolution` prints T₀ = T_p / `PWM_TIMER_MAX`. **Four
  slides rest on two undefined symbols** — S-9, and the exact `helloDisplay.c`
  failure the rule was written for.
  *Verified:* no `<slide>` in the section contains `#define`; two use the symbols.
  **Fix:** put the two `#define` lines with their comments at the head of the
  init-timing listing. Four lines; nothing needs cutting to make room.
- **[BLOCKER] Part 2's questions 2 and 3 point at a program that is not in the
  room.** Q2 says "the one line that sets it **in our test program**" and Q3 says
  "the program writes one more register … **find it**" — but the listing does not
  appear until thirteen slides later, and the slide never names the file. From the
  wall it could start Q1 and was stuck on the other two. **Fix:** one clause on the
  slide — "with `TTmotor_ramp.c` open on your laptop, and the reference manual at
  §17.4 (p. 482)". Also restore the three words dropped from the caption: the book
  task says "what average voltage does the motor **see** from a 5 V supply", and
  without them it reads as the pin's supply, when the only voltage on the wall is
  the 3.3 V trace.
- **[MAJOR] The recall table answers the Part 3 prediction, five slides early.**
  `table-day11x-recall`'s last row is "Set the speed, once everything is running |
  `TIM14_CCR1` | Day 11", and `sl-day11x-predict-ccr1` then asks which of ARR and
  CCR1 the program rewrites every two seconds. **P-15**, and it is mine.
  *Verified:* the row is at `ch-motors.ptx:1446`, the question at `:1591`.
- **[MAJOR] "Twelve lines" is wrong, in three places.** The init is **sixteen**
  register-write lines — the four clear/set pairs are two lines each, which the
  decode activity makes a whole point of — covering **twelve steps** and **eleven
  registers**. *Verified by counting the function.* The prose already says
  "steps"; the slide, the checkpoint and the instructor answer still say "lines".
  Its suggested sentence is better than what is there: *"sixteen lines, twelve
  steps, eleven registers."*
- **[MAJOR] The closing slide contains dead code** — `else if (value < 0)` on a
  `uint16_t`. **Not a defect to fix: Petra ruled on this** (2026-08-19) and wants
  it kept, because a student writing `motor_speed()` with a signed parameter for
  Lab 6 makes it live. The presenter note carries her reasoning. *Its second
  observation is real and new*: her comment has an unbalanced parenthesis —
  `outside the (0, PWM_TIMER_MAX-1 range!` — visible on the projected slide.
- **[MINOR] `sl-day11x-bitfield-registers`' caption reveals the decode answer**
  two slides before the reveal: "…which is why each of those lines is a plain OR
  with 1, and CCMR1's fields are not" is verbatim the conclusion on
  `inst-day11x-bitfields`. Cut it back to naming the registers.
- **[MINOR] The three code slides do not read as one function.** Slide 21's body
  is indented under the opening brace, 22 starts at column 0, 23 is indented again
  and ends with a lone `}`. Match the indentation and mark 22 and 23 as
  continuations. Also `sl-day11x-init-mode`'s caption says "the four **they** just
  decoded" — instructor voice pointed at the room from the wall; make it "you".
- **[MINOR] `sl-day11x-register-map` states the ARR/CCR1 mapping a third time.**
  The genuinely new fact is that all three fields are `[15:0]`, which is what Part
  5 needs. Move that into the caption, or cut the slide (it is already the named
  pressure valve).

Also noted in passing: the callout boxes on the CCMR1 reveal sit over the manual's
0001/0010/0011 mode descriptions and hide their right-hand halves.

---

## expert-class-logistics — verdict: BLOCKER

Added up the deck's own `presenterNote` timings, which is the most optimistic
possible reading — no slippage, no transitions.

| Part | Its own budget | Its slides actually sum to |
| --- | --- | --- |
| 1 | 4 | 4 |
| 2 | 14 | 14 |
| 3 | 8 | **8.5** |
| 4 | 15 | **17.5**, and that excludes two activities with *no stated time at all* |
| 5 | 5 | 6 |

**Cumulative: minute 48 at the end of Part 4's explicitly timed slides**, before
its untimed activities. **Prediction: the class ends inside Part 4 and Part 5 is
dropped — exactly the Gate 1 failure, relocated.** With the untimed activities,
four transitions and normal first-pass slippage on the manual hunt, this is a
58–60 minute plan misfiled as 50.

- **[BLOCKER] Part 4 overspends its own note by 2.5 minutes before reality.**
  `act-day11x-bitfields` and the answer-walk carry no time at all, unlike every
  other activity in the file. Cap the decode at 2 minutes; fold
  `inst-day11x-bitfields` into the register walk it already narrates rather than
  treating it as a separate beat; trim the live discussion on the Lab 6 seam,
  whose slide text already carries the answer.
- **[MAJOR] "Protect this" is not a mechanism.** Part 5's note says to protect it,
  but nothing upstream is required to yield, and Parts 1–3 are at or over their own
  budgets with nothing to give. **Fix: move Part 5's load-bearing fact — the
  resolution number Lab 6 Deliverable 1 needs — onto `sl-day11x-set-code`, where
  `CCR1` is already on screen**, so it survives even if the last three slides do
  not.
- **[MAJOR] Part 2's minute-7 checkpoint only diagnoses navigation failure**, not
  reasoning failure. Three conceptual questions on a first pass through §17.4
  realistically need 10–12 minutes, not 8, and Part 1 has no slack to give.
- **[MINOR] The register map is still the right pressure valve** — but Part 3
  already overspends by 30 s on its own, so the valve buys back what Part 3 spent,
  not time for anyone else.
- **[MINOR] The closing video has no fallback** and sits at the least-cushioned
  point in the hour. Add one line: if it will not load in ten seconds, describe the
  trace and move on.
- **[MINOR] The recap's 3 minutes eats most of the 4-minute reserve** Gate 1 set
  aside for settling and transitions, leaving about one minute for all of it.

---

## learner-visual — verdict: MAJOR

Measured the non-white bounding box of each figure against the 1600×900 canvas.

- **[MAJOR] The CCMR1 reveal is the densest slide in the deck and its callout sits
  on top of the manual's own text.** At native resolution the blue "Set pwm mode 1"
  box covers the right-hand ends of the `0001:` and `0010:` mode descriptions. A
  32-bit map, eleven lines of manual prose and two code callouts are stacked into
  ~445 px. **Split it:** (a) bit map + OC1M definitions through the boxed
  `0110` line + the blue callout, (b) CC1S definition + the pink callout. Each half
  then has the full column and the callout no longer needs to overlap anything.
- **[MAJOR] The letterboxing is worst exactly where width would help most.**
  Measured fill: Figure 176 **58%**, Figure 177 **65%**, register map **74%**, and
  the CCMR1 reveal — the most crowded slide — only **51%**. Freed horizontal space
  on that slide could hold the code callouts *beside* the bit map instead of over
  the prose. Re-export as tighter crops rather than pillarboxing the full 4:3
  canvas.
- **[MINOR] PWM mode 2 has no picture anywhere.** Three slides explain in words
  that `0111` would invert the waveform and run the duty cycle backwards, but the
  only waveform drawn is the correct mode-1 shape. A dashed second trace on that
  sketch would let a visual learner see the contrast instead of holding it in words.
- **[MINOR] The recall table's lead line describes the table instead of
  instructing.** It restates the title and duplicates the column headers. Something
  like *"Read down the middle column — every name here is one you've already
  written"* earns its place.
- **[OK] No figure went small because bullets ate the space** — the specific
  failure mode the letterboxing produces. The scope trace and the encoder photo are
  both sized generously. Figure 165's four colour-coded labels and the three
  bit-field strips all hold up at native resolution.

---

## expert-cognitive-load — verdict: MAJOR

### Repetition census

| Idea | Times | Keep | Reduce to |
| --- | --- | --- | --- |
| **Why a multi-bit field must be cleared before it is set** | **5 full tellings + 3 presenter notes**, all inside Part 4 | the prose (first teaching) + `inst-day11x-bitfields` (the reveal, which earns it with the concrete `0011` example) | Both visible captions drop their "which is why…" clause. `inst-day11x-checkpoint` answers *which* register is written twice without re-explaining *why*. Two of the three notes say "reference, don't re-teach" |
| `0110` = PWM mode 1 | 3 | `inst-day11x-registers`, where mode 1 vs mode 2 is the actual question | The figure caption and the slide caption directly below it currently say the same sentence in almost the same words **on the same screen** — both drop to a pointer |
| `CCR1` sets T_HIGH, `ARR` sets T_PERIOD | 4 in this day alone (5 with Tuesday's) | Part 1 (first teaching) + Part 3's reveal (the predicted answer) | `fig-tim14-main-circuit`'s caption stops re-deriving what was answered a paragraph above and describes the picture. Part 4's closing keeps only the new part — one register, for the rest of the program's life |
| **CC1E gates the output to the pin** | 2 full + caption + note, spanning Parts 2 and 3 | `inst-day11x-registers-b`, where the question was asked | Part 3's prose should say *"we already worked out what CC1E does — here is where that gate sits"* and go to the figure |
| PSC/ARR are buffered until an update event | 2 full tellings **that disagree** | `inst-day11x-registers-b` | Figure 176's caption points back rather than re-deriving |
| `V_avg = V_M × T_HIGH / T_PERIOD` | 2, identical | slide 13, next to the registers it is about | Remove the box from Figure 177, where it competes with CC1E — the one thing that slide's note says never to cut |

### Findings

- **[MAJOR] [B-8] The clearing-line point is the most-repeated idea in the hour**,
  and it sits inside the densest 15 minutes — every retelling is time the
  checkpoint is competing against, and that checkpoint is the day's only unaided
  recall moment.
- **[MAJOR] [B-8, P-1] Gate 1's risk did not materialise as predicted, and the way
  it did materialise is worse.** The mitigation was "name six registers now,
  explain later." That held for OC1M. It failed for CC1E: Part 2's instructor
  answer already gives its full meaning *and* consequence, and Part 3's prose then
  repeats nearly the same sentence before the figure that was supposed to be CC1E's
  first real explanation. **Naming ahead of meaning became meaning taught twice.**
- **[MAJOR] [P-2, P-7] Part 4 sums to 17.5 minutes against a 15-minute budget**
  before the decode activity or its walkthrough are counted at all — independently
  the same arithmetic `expert-class-logistics` did. Gate 1's fallback only trims the
  optional stretch at the very end and does not reach an overrun built into the
  required slides. Candidate cut: fold the init-pin walkthrough into one beat with
  init-timing, since its own note already says "move briskly, they wrote this
  themselves on Day 11."
- **[MINOR] The buffered-register tellings disagree on whether it was Day 8 or Day
  10** — itself evidence the second drifted from the first rather than reinforcing
  it. *(Both are true: Day 8 introduced buffering, Day 10 applied it to UG. The fix
  is to say it once, properly, not to pick one.)*

---

## checker-arc-fidelity — verdict: MAJOR

Mapped her 21 slides against the room, and every in-class paragraph against the
deck. **No paragraph is condensed by two slides, and no slide condenses two
paragraphs** — the mapping is otherwise sound. The failures are holes, not
duplicates.

- **[MAJOR] Her slides 14 and 15 reach neither the book nor the room.**
  Brake-before-reverse (`TTmotor_ramp.c:87–104`) and `abs(counter_new)` (line 107)
  have no paragraph and no slide. The plan committed both explicitly.
  *Verified:* `TB6612_AIN1`, `abs(counter_new)` and `counter_old` appear nowhere in
  the section, while three shipped artifacts point at them —
  **and one of those is load-bearing**: `inst-day11x-checkpoint` says *"Cut the
  brake-and-`abs` discussion instead"* as the way to protect the 90-second
  checkpoint. **Cutting nothing recovers nothing, so the checkpoint's protection is
  illusory** — which is also why the clock findings from logistics and cognitive
  load cannot be resolved by the valve the deck names. `sl-day11x-lab6-seam` also
  makes claims about *"the two lines in `main()`"* and *"the direction logic in
  `main()`"* — code the room has never been shown, in a deck that projected every
  other line of the driver.
  **Fix:** one slide between the checkpoint answers and the Lab 6 seam — the
  if/else block with `// short brake` beside the `abs()` line, captioned *"The ramp
  decides* when *to brake; the driver only knows* how*."* Deck 27 has roughly a
  third of its height empty if the clock forbids a new slide.
- **[MAJOR] Her slide 12's field descriptions are gone, and they are the answers to
  two of Part 2's three questions.** Her slide pairs each bit map with the manual's
  own wording — *"Bit 0 UG: Update generation… 1: Re-initialize the counter and
  generates an update of the registers"*, and the CC1E description. We reproduce
  the three bit rows and none of the descriptions. But `task-day11x-cc1e` asks *"How
  does the manual describe what it does?"* and `task-day11x-egr` asks what the bit
  does — **the room is sent to find wording that is never projected**, while
  `sl-day11x-ccmr1` does show §17.4's field text exactly as her slide 11 did.
  **Fix:** put the UG and CC1E excerpts on `inst-day11x-registers-b`, the reveal for
  those two questions — not on the bit-map slide, which is already full.
- **[MAJOR] Four slides carry content that exists nowhere in the reading book.**
  The `<program>` blocks for `tim14_pa7_pwm_init()` and `tim14_pwm_set()` are all
  inside `<slide>`, which is stripped from the student build.
  *Verified: the student book's driver page contains **zero** `<program>` blocks*,
  and mentions `tim14_pa7_pwm_init()` only in prose. A student who misses class, or
  reads before Lab 6, gets the whole walkthrough with no listing to walk. The plan
  also said the `value < 0` rationale would become prose in delivery 2; it is still
  only a presenter note.
- **[MAJOR] The clock, independently: Part 4 ≈ 23 against 15, deck ≈ 58 against
  50** — because `act-day11x-bitfields` has no time estimate anywhere, in any file.
  Its honest valve candidate is merging `sl-day11x-init-pin` into `-init-timing`,
  since that slide's own note already says the half is Day 11 recall.
- **[MINOR] The paragraph framing all of Part 2 has no slide** — *"two of them are
  registers we have never written… the third is a line whose reason is not
  obvious"* is what tells the room why these three questions and not ten. One lead
  line on the questions slide fixes it.
- **[MINOR] Her replacement CCMR1 image re-introduced the header I had cropped.**
  *Verified: 17,641 dark pixels in the top-right header zone — "Timer 14 Registers"
  is back*, competing with the slide's own title. The crop was lost when she
  supplied the corrected callout; my fault for not re-checking after the swap.
- **[MINOR] `fig-ccmr1-bits` is an orphan**, and two figures fifteen lines apart
  have crossed names — `fig-ccmr1-bits` → `fig-ccmr1-oc1m.png`, `fig-ccmr1-oc1m` →
  `fig-ccmr1-oc1m_cc1s.png`. Harmless to the room, will bite the next editor.
- **[MINOR, for the record, not to re-litigate] Her one genuinely open question is
  now pre-answered.** *"Which data sheet do we need to dig into?"* was the only one
  the recall table marked open; the activity now hands over document, section and
  page. That was a deliberate Gate 1 decision to match `act-day3-ref-manual`, but it
  belongs in the record rather than in silence.
- **[MINOR] The source order of the last two slides is backwards.** The deck plays
  `next` then `scope-video`, which is right, since the video slide says *"the same
  sensor's output"*. The source has them the other way round.

### Layouts of hers to adopt rather than rebuild

Her slide 12's **bit map + field description, paired** is the layout to copy for UG
and CC1E. Her slide 13's register map is reproduced verbatim and should stay. Her
slide 16's resolution waveform is kept.

---

## checker-voice — verdict: MAJOR

**Parts 2 and 3 are longer and more explanatory than their slides, which is the
right direction — but Parts 4 and 5 are *thinner than their own slides*, which is
the mirror image of the failure Gate 1.5 hunted.** Part 4 says *"we can now read it
straight through"* over a book page containing no listing; Part 5 says the
resolution *"is worth working out for our settings"* and then gives no settings, no
number and no answer — 625 µs, 1250 and 500 ns live only on a slide and in a
presenter note. Independently the same hole `checker-arc-fidelity` found.

### The one that matters most

- **[MAJOR] Petra's own edit to this day overrides the prose, and Gate 1.5 got it
  wrong.** She rewrote the recap item ~~"No hardware today — the reference manual,
  the figures, and the code."~~ → **"We'll use the reference manual, the figures,
  and the code."** (commit `386c61a`). My prose still says *"We will not wire
  anything today — everything happens in…"*, so **the slide and the paragraph it
  condenses now disagree, and the slide is hers.**
  *Verified: her edit is in the diff; my line is at `ch-motors.ptx:1328`.*
  Gate 1.5 explicitly *kept* the negative frame, on the strength of Day 8's agenda
  item *"No wiring today — everything is done in code and on the chip's hardware"*.
  **Her Day 11x edit is later, is a sentence rather than a list label, and is on
  this day** — so it wins. Rewrite to *"We'll work from the reference manual,
  RM0490, from the figures, and from the code."*

### Other majors

- **[MAJOR] The deck still carries the phrase Gate 1.5 removed from the book.**
  The agenda item and the Part 1 section slide both read *"The timer behind the
  waveform"*; the book title is now *"The Timer That Makes the Waveform"*. The JSON
  was not swept with the source. *Verified at `day11x.json:25` and `:36`.*
- **[MAJOR] Three of the four Part openings it had never seen each reproduce a
  different named failure.** Part 3 — the **absent-frame** Gate 1.5 already struck
  twice (*"What we do not have yet is…"*). Part 4 — an **aphorism** (*"Knowing which
  register to write is not yet knowing what to write into it"*), which then appears
  **again verbatim** thirty lines later in the activity introduction. Part 5 — the
  **S-21 count-armature** (*"There is one number left that the program never states
  outright"*).
- **[MAJOR] Forward-looking "we'll" is absent from Parts 2, 3 and 5 entirely.**
  *Verified by count: intro 2, Part 1 one, Part 4 one, Parts 2/3/5 **zero**.* Her
  Day 10 introduction uses seven in three paragraphs.
- **[MAJOR] Instructor voice on the wall** — `sl-day11x-init-mode`'s caption says
  *"the four **they** just decoded"*. That is the room seen from the front, on a
  slide facing the room.
- **[MAJOR] S-11, metaphor as the name of the thing** — *"CC1E is the gate between a
  channel that is working and a pin that carries nothing"*. The paragraph beside it
  already says this plainly and at length; the caption should not be shorter *and*
  more figurative than the prose it condenses. Her own annotation is literal:
  *"Output enable"*.
- **[MAJOR] S-23, the book explaining its own teaching** — *"which is the whole
  idea"*, *"That is the closure worth carrying out of today"*, *"finding them there
  is the work"*, *"what the next stretch of class is for"*.

### Sweeps

**Unit openings: 10 checked, 4 failing** (Parts 3, 4, 5 and the decode activity's
intro). **Slide titles: 1 epigram** — *"Rate, period, HIGH time"*. **Count-armatures:
2.** **Weekday as actor: 0** in student text, one colon construction (*"Thursday:
count those pulses…"*). **Acronyms:** `TIM14_CCMR1` is **never expanded in
student-facing text** — the expansion exists only inside an `<instructor>` block;
`TIM14_CCER`'s first student-facing use is bare. **Design scaffolding:** six
instances, listed above. **No time budgets or `Part N` references leaked** into
student text.

### Reuse it found

- **The sensor is never named.** Her slide 18 is titled *"We will use an optical
  incremental sensor"* with the body *"LED + photosensor → series of pulses as
  slotted wheel interrupts the beam."* Our text describes the mechanism and never
  gives the part its class name anywhere a student sees it.
- **The Figure 176 caption re-words her own annotations.** Use her verb and symbols:
  *"CCR1 determines T_HIGH"*, *"TIM14_ARR determines T_PERIOD"*.
- **Where the draft is better and should stay:** the recall table is a genuine
  improvement on her slides 5/6 (same jobs, plus *where we did it before*), and the
  Lab 6 seam slide has no counterpart in her deck at all.

### Conflicts to resolve at synthesis

1. **Gate 1.5 vs Gate 3 on the negative frame.** Resolved in Petra's favour — her
   later, same-day edit governs.
2. **Deck order of the last two slides.** `checker-arc-fidelity` says the deck order
   (sensor → video) is correct because the video says *"the same sensor's output"*;
   `checker-voice` wants the video moved earlier so the day ends on the wrap-up.
   Both agree the **source order is backwards** and must be fixed either way.

---

## checker-figure-claims — verdict: MAJOR

Opened every figure at native resolution and in the player. **No blockers, and all
eight verifications the brief asked for hold against the pixels:** the white-out on
Figures 176/177 damaged nothing; Petra's `TIMx_CCER` correction is complete (all
three labels, no `TIM1_CCER` survives); the register map shows four registers; the
CCMR1 reveal contains every element claimed, with the magenta comment reading
exactly `// Set timer to output mode (00)`; **Figure 165 names no register at all**
(only signal and block names — P-15 holds, and the source comment forbidding
additions should stay); T₀ and T_p are proper subscripts; the OLED reads **222 RPM**
at 5× zoom.

- **[MAJOR] The register-map SLIDE caption says three registers; the image shows
  four.** The *book* caption was corrected to four; the slide caption was not.
  Seen alone the slide contradicts itself. Re-caption the slide; do not touch the
  image.
- **[MAJOR] The CCMR1 reveal fails the legibility rule and cannot be fixed by
  scaling.** The manual's field descriptions measure **13 px = 1.4%** of slide
  height and the code inside the annotation boxes **10–12 px = 1.1–1.3%**, against
  the ≥2% rule — and these *are* the content of the reveal. The figure is already
  **height-limited** (827×690 in a 1470×700 well), so it cannot grow. Two things
  make it worse: the leftover **"Timer 14 Registers"** heading takes the right ~20%,
  and the opaque code boxes cover the `0001`/`0010` description lines while the box
  border overstrikes `0111: PWM mode 2`.
  **Its recommendation, which I endorse: ask Petra for two graded exports** — the
  OC1M half and the CC1S half, each without the heading. Split across two slides
  each half projects at roughly twice the type size, and the split matches the
  two-fields-one-register story the caption already tells. **Do not crop or shrink
  it myself.**
- **[MINOR] Four caption/image position errors**, all mine: "the capture/compare
  register **beside** it" (it is *below* the counter — and the body prose says
  "below", so the caption contradicts the paragraph); "the comparator **between**
  them" (it is to the *right*); "`TIMx_CCMR1` just **below**" (it is at the *lower
  left*); and "the four they just decoded" where the code shows **five** commented
  steps and the activity covered **three**.
- **[MINOR] Notation splits across figures.** Her three figures write the period as
  **T_PERIOD**; my hand-authored resolution figure writes **T_p** — same quantity,
  two symbols, four slides apart. Change *my SVG*, since hers cannot change.
- **[MINOR] The three bit-field SVGs print no register name**, leaving three
  anonymous rows on slide 18 identified only by the order of the intro line. A
  student who mis-maps one row gets the wrong decode answer. Add the name at the
  left of each row, the way her own register map does.
- **[MINOR] `V_avg`, `V_M`, `T_HIGH`, `T_PERIOD` appear only inside the figures** —
  the prose never uses these symbols, and the boxed red formula is the most
  prominent thing on two slides with no caption acknowledging it exists.
- **[MINOR] Dead space.** The resolution slide is two-thirds empty and the figure is
  neither width- nor height-limited — a bigger figure is free. The scope-still slide
  has a large empty band above it too.
- **[NOTE] `fig-pwm-scope.png` lives in `Day11-Motors/` but is now used only by Day
  11x** (Day 11's own figure is the video). A re-crop made "for Day 11" would
  silently change Day 11x's prediction slide. Move it or note it.
- **[UNVERIFIABLE] Both texts claim the closing video runs "about 30 rpm to about
  180 rpm".** A video renders black in a still capture. **Petra should play it once
  before shipping** — it is her own capture, so this is a confirmation, not a
  suspicion.

---

# Consolidated change list

Seven reports: **2 BLOCKER, 5 MAJOR.** The findings trade against each other —
the arc wants content *added*, cognitive load wants tellings *collapsed*, logistics
needs Part 4 to shed ~8 minutes, and voice wants prose *lengthened*. They resolve
together only because **prose length costs no class time** and **the collapses buy
the minutes the additions need**.

## The finding that unlocks the rest

**The brake-before-reverse and `abs()` material exists nowhere**, and three shipped
artifacts point at it — including `inst-day11x-checkpoint`'s instruction to *"cut
the brake-and-`abs` discussion"* as the way to protect the 90-second checkpoint.
**Cutting nothing recovers nothing**, so Part 4's stated safety valve is fictional,
which is why the clock findings have no slack to draw on. Fix the hole and the valve
becomes real.

## Apply — no decision needed

| # | Change | From |
| --- | --- | --- |
| 1 | **Put the two `#define` lines at the head of the init listing.** Four slides rest on two symbols shown nowhere | in-the-room (BLOCKER) |
| 2 | **Name the file and the manual section on the Part 2 questions slide**, and restore "does the motor **see** from a 5 V supply" | in-the-room (BLOCKER) |
| 3 | **Break the P-15 leak**: the recall table's `CCR1` row answers the Part 3 prediction five slides early. Reword the row's job, keep the register cell blank until Part 3 | in-the-room |
| 4 | **"Twelve steps" everywhere** (slide, checkpoint, instructor). The function is 16 lines / 12 steps / 11 registers | in-the-room, voice |
| 5 | **Add the brake/`abs` code under the Lab 6 seam bullets** — that slide has a third of its height empty, so no new slide and no new minutes. Makes both valve notes truthful | arc |
| 6 | **Put the UG and CC1E field descriptions on the Part 2 reveal**, from her slide 12's layout | arc |
| 7 | **Restore the driver listing to the book prose**, in three `<program>` blocks split where the slides split, quoted from the starter | arc, voice |
| 8 | **Give Part 5 its numbers** — 625 µs ÷ 1250 = 500 ns, tied to the 4 mV from Day 11 | voice |
| 9 | **Follow her recap edit**: drop "We will not wire anything today —" for her "We'll use the reference manual, the figures, and the code" | voice |
| 10 | **Sweep the deck JSON**: "The timer behind the waveform" → "that makes"; register-map title and caption; three-vs-four registers | voice, figure-claims |
| 11 | **Rewrite the Part 3, 4 and 5 openings** (absent-frame, aphorism, count-armature), and delete the aphorism's verbatim repeat in the activity intro | voice |
| 12 | **Collapse the clearing-line point** from five tellings to two; drop the "which is why" clause from both visible captions | cognitive load |
| 13 | **Move CC1E's full explanation to Part 3 only**; Part 2's answer stops at naming plus one sentence | cognitive load |
| 14 | **Drop the duplicated `V_avg` box from Figure 177's slide**, where it competes with CC1E | cognitive load |
| 15 | **Fix four caption position errors** (beside/below, between/right, lower-left, four-vs-five) | figure-claims |
| 16 | **`T_p` → `T_PERIOD`** in my resolution SVG; **add register names** to the three bit-field SVGs | figure-claims |
| 17 | **"they" → "you"** on the init-mode caption; **S-11 metaphor** out of the CC1E caption | voice |
| 18 | **Add "we'll"** to Parts 2, 3 and 5, which have none | voice |
| 19 | **Expand `TIM14_CCMR1`** on first student-facing use | voice |
| 20 | **Name the sensor** — "optical incremental sensor", her slide 18's title | voice |
| 21 | **Time the two untimed activities**; merge init-pin into init-timing; fold the decode reveal into the register walk | logistics, cognitive load, arc |
| 22 | **Fix the source order** of the last two slides to match the deck; move the Thursday hand-off to the closing slide only | arc, voice |
| 23 | **Add a video fallback line** to the closing note | logistics |
| 24 | **Move Part 5's resolution number onto the `CCR1` slide** so it survives if Part 5 is lost | logistics |
| 25 | **Re-crop the "Timer 14 Registers" header** that her replacement file re-introduced | arc |
| 26 | Enlarge the resolution and scope-still figures into their dead space; note or move `fig-pwm-scope.png` | figure-claims |

## For Petra

- **The CCMR1 reveal needs a re-export in two halves** — it fails the legibility
  rule at 1.1–1.4% and is height-limited, so it cannot be fixed by scaling or
  cropping.
- **The negative frame** — was removing "No hardware today" a list-label-vs-sentence
  distinction, or a change of mind? It decides whether Day 8's agenda item stands.
- **Should the book carry the driver listing?** Restoring it makes Part 4 the
  longest Part. The alternative is to shorten the prose's claim — but a program
  living only on the wall would be a first for this book.
- **Play the closing video once** to confirm the 30→180 rpm claim.
