# Day 11x — Gate 1 review

Reviewing `plans/day11x.md` (lesson plan **and** outline) and
`plans/day11x-ground-truth.md`, before any prose or slides exist.

**Class length given to every reviewer: 50 minutes** (Wednesday x-hour), per
`CLAUDE.md`'s standing facts. **No pre-class reading** for this day.

Panel per `.claude/agents/README.md` Gate 1 roster: `checker-arc-fidelity` (lead),
`expert-active-learning`, `expert-cognitive-load`, `expert-continuity-auditor`,
`expert-class-logistics`, `learner-firstgen-novice`, `learner-anxious-nonhardware`.

---

## expert-class-logistics — verdict: MAJOR

Confirms the day is correctly a paper/manual/projector/laptop day: nothing gets
wired, so there is no hardware distribution cost. The failure is in the minutes.

**Its running clock.** Settling and pulling up RM0490 (~3 min), table-group
formation for Part 2 (~2 min) and four inter-Part transitions (~1 min each) are
**none of them budgeted**. So Part 3 starts at real-clock minute 24–27, not the
plan's minute 20, and **the class is still inside Part 4 when the 50 minutes end**.

**Prediction: Part 5 silently disappears** — the resolution answer to Day 11's own
stretch, and the Day 12 hand-off. The plan has no line saying so and no instruction
for what to do about it.

### Findings

- **[MAJOR] [S-8] The Parts sum to exactly 50 with zero slack.** Real settling and
  transition cost is 5–8 minutes, none of it budgeted. Same failure mode `CLAUDE.md`
  flags for Day 11 itself. Reserve 4–5 minutes of explicit slack.
- **[MAJOR] [S-8] The named pressure valve is the wrong one.** The plan marks
  **Part 3** as compressible, but Part 4's bit-field walkthrough is built directly
  on Part 3's concepts — cutting Part 3 does not recover time, it makes Part 4
  slower and pushes the overrun downstream. Spend Part 4's own valve first (the
  verification activity as a 60-second show of hands). If Part 3 must shrink, cut
  the **register-map recap (her slide 13)**, which restates what Figures 176/177
  already cover — not the Figures themselves.
- **[MAJOR] [P-3] Part 2 has no completion-spread absorption.** Ten questions,
  first sustained navigation of an 825-page manual: expect a 3× spread — fast
  groups done in 6–7 minutes, slow groups still hunting CCMR1's bit-field table at
  minute 15. The stretch serves early *Part 4* finishers; nothing serves Part 2's
  fast groups, who sit idle while one instructor cannot chase every stuck table.
  Give them forward motion, e.g. *"once you have all ten, predict what `CCR1` holds
  after `tim14_pwm_set(625)`."*
- **[MINOR] [S-8] Part 4 packs six sub-topics into 16 minutes** — under 3 min each
  before transitions. Pre-mark that past minute 42, brake-before-reverse and
  `abs()` get named but not walked line by line; they are lower-stakes than the
  `CCR1` punchline, which Part 2 has already delivered.
- **[MINOR]** Part 2 assumes RM0490 is already open per group but never says so.
  One line: confirm it is open from Day 11's homework before starting the clock.

### Its concrete reallocation

| Part | Was | Proposed |
| --- | --- | --- |
| 2 | 15 | **13** (12 do + 3 reveal → 13 with tightening) |
| 3 | 9 | **8**, dropping only the redundant register-map recap |
| 4 | 16 | 16, with a pre-authorized cut past minute 42 |
| — | — | **~4 min freed** to fund settling and the four transitions |
| 5 | 5 | 5, **genuinely protected** rather than quietly vanishing |

---

## expert-active-learning — verdict: BLOCKER

**"This is a lecture with one activity bolted on."** Three of five Parts are
explain/reveal; Part 4 is labelled do → explain but the plan's own text describes
narration with a hedged optional 60-second check. That leaves **Part 2 alone — 15
of 50 minutes — as sustained student work**, and Part 2 is itself a name-lookup.

### Findings

- **[BLOCKER] [P-5, P-6, P-2]** Every Part below has a redesign that converts
  explain time into do time **without adding minutes**. Apply at least Parts 3 and
  4's fixes before this plan goes to prose.
- **[MAJOR] [P-6] Part 4 answers its own activity ahead of itself.** The plan
  explains CCMR1/CCER/CR1/EGR *before* the "does `TIM_OC1_PWM1 <<
  TIM_CCMR1_OC1M_Pos` really land `0110`" check — P-6's named failure mode, the
  slide before the activity. The plan's own hedge ("can be a 60-second show of
  hands") is the tell that it is not real work. **Fix: invert.** Give students the
  bit-field table (already open from Part 2) and the bare driver line, and have
  them work out in writing what lands in OC1M *before* any walkthrough. Repeat for
  `CC1E` in CCER and `CEN` in CR1, so all three name→value translations are
  computed, not narrated. First S-2 writing room anywhere in the day.
- **[MAJOR] [P-2] The crucial step is stated twice and reached never.** No point
  in the 50 minutes has a student reconstruct the register-to-line mapping unaided.
  **Fix:** end Part 4 with an *individual* checkpoint replacing the token
  verification — a stripped, uncommented copy of `tim14_pa7_pwm_init()`, 90 seconds
  to write the register name beside each line from memory, then reveal against the
  driver. Same budget as the show of hands, but it is the actual test.
- **[MAJOR] [P-6, P-11] Part 2 is a regression from this chapter's own activity
  style.** Her slide 5/6 asks students to *name* a register. Day 11's
  `task-day11-pwm-config` already asks them to **write the register operations**.
  Reusing 5/6 verbatim reintroduces a shallower task on the day whose crucial step
  depends on it. **Fix:** keep the ten lookups, but for CCMR1 and CCER add *"what
  would you see on the scope trace from `fig-pwm-scope` if this register were left
  at its reset value?"* — converts name-finding into consequence-reasoning at
  near-zero time cost, and ties the lookup to the phenomenon Day 11 already put on
  the scope.
- **[MAJOR] [P-5] Part 3 explains with no prediction step**, though the phenomenon
  is already in hand: `fig-pwm-scope` shows the HIGH width changing while the
  period stays fixed. **Fix:** open Part 3 by asking which of `CCR1`/`ARR` the ramp
  rewrites every 2 s, *before* Figure 176 names it. Under 90 seconds against a
  9-minute budget; converts explain into observe → explain.
- **[MINOR] [S-10, P-6] Part 5 restates the resolution result** to a room that
  mostly did not derive it the first time. A 30-second predict-then-reveal ("1250
  steps on a 5 V rail — how many mV is the smallest step?") lands it instead.
- **[MINOR] [S-2] Part 1 is mislabelled** "reveal" while its text describes real
  student work (locate three things on the block diagram). Relabel to do → reveal,
  or better, give it something to write.
- **[MINOR] [UDL] Only two routes into the crucial step** — dense register-table
  prose and code-reading. The scope trace, a visual anchor students already watched
  and measured, is invoked only as passing recall. Wiring it into Parts 2 and 3
  (above) closes this too.

---

## learner-anxious-nonhardware — verdict: MAJOR

### Findings

- **[MAJOR] [P-2, P-14] The foothold exists only in the author's private
  rationale.** The plan's crucial-step footnote says *"a student who finds none of
  the ten registers still leaves with the mapping written down"* — but nothing in
  the Part 2 outline says that **to the room**. At minute 20 a student behind their
  group does not know whether that is their fault, and the instructor has nothing
  to say out loud. **Fix:** move the "you leave with the mapping either way" fact
  into Part 2 as something said at the *start* of the activity.
- **[MAJOR] [P-2, B-4] Part 4 never states whether it assumes the Day 11 homework
  was done.** The footnote is explicit that nothing is typed or built — but silent
  on the likelier failure: arriving without having read `TTmotor_ramp.c`. Sixteen
  minutes for the init sequence, four bit-fields, a verification exercise, two code
  puzzles and the Lab 6 seam only fits if most of the room has seen the file once.
  The plan must say whether Part 4 walks the code from zero or moves at the pace of
  those who have.
- **[MAJOR] [P-1] Nowhere does the plan say this day involves no wiring.** Every
  Part is manual, figures and code-reading — but Day 11 *was* a wiring day, so a
  plan that never says "no hardware today" leaves the fear of damaging the board
  live for 50 minutes for no reason. Worse at the stretch, whose *"change the two
  lines and listen"* implies re-flashing and running a different PWM frequency on
  the real motor, with nothing said about whether that is safe.
- **[MINOR] [P-2] The word "simply" survives the stale-notes mining.** Ground truth
  §2 marks *"if you want to change the duty cycle you simply write a new value"* as
  teaching to keep, flagging only the register names as stale. "Simply" is exactly
  the tone the book's rules ban and should be struck before it reaches prose.
- **[MINOR] [P-14] Part 2 opens with "which reference do we even need" as an open
  question** while the Objectives already state RM0490 §17.4 as a given. A table
  that spends minutes in the datasheet or the wrong RM chapter has no stated
  recovery — no checkpoint at, say, minute 7 to confirm every group is in the right
  section before the rest of the activity depends on it.

---

## learner-firstgen-novice — verdict: MAJOR

*Its three factual claims were independently verified before recording — see the
verification line under each.*

### Findings

- **[MAJOR] [P-2, B-5] Part 2 never says how to get from a closed 825-page PDF to
  page 482.** Ten register names, and no sentence describing the first physical
  action — table of contents, Ctrl-F, scroll? The one prior manual-navigation
  exercise, `act-day3-ref-manual`, handed over the exact section number and asked
  for *one* register. **Fix:** open Part 2's activity with the same shape Day 3
  used — a `<url>` link plus "navigate to §17.4, *TIM14 registers*, page 482" —
  before the first question.
  *Verified:* `act-day3-ref-manual` (`ch-switches.ptx`) does exactly this — links
  `external/stm32c031_rm.pdf`, names the section, gives the path via the table of
  contents, all in its `<introduction>` before task 1.
- **[MAJOR] [P-1, P-7] "Shadow register" and "compare match" are first encounters,
  used inside a causal clause without being defined.** The student is never told
  that `CCR1` has a hidden active copy updated only at the update event, so
  mid-period writes do not tear the waveform — the sentence moves straight on to
  using the fact. **Fix:** give "shadow register" its own 2–3 sentence beat,
  reusing the update-event language already built for Day 8.
  *Verified:* neither term appears anywhere in `source/`. "Update event" **is**
  already established as a `<term>` at `ch-timers-interrupts.ptx:143`, so the
  pointer-back is real ground, not an invention.
- **[MAJOR] [P-7] Five bit-field names in one sentence** — CCMR1's fields, `CC1S`,
  `CC1E`, `UG`, `CEN` — in the Part the plan's own Risks section already calls
  dense. **Fix:** one beat per field. `TTmotor_ramp.c` already has that structure,
  a comment above each block; do not compress it back down.
- **[MINOR] [P-2] The missing transition sentence in Part 2** is the difference
  between a group working in the first 30 seconds and one spending 5 of its 15
  minutes finding the right page.
- **[NOTE — not a defect] The P-2 scaffolding genuinely works, but only for the
  floor.** Part 2's unchanged reveal slide does mean a student who finds nothing
  still leaves with the `CCR1` = speed mapping, and Part 4 needs only Part 2's
  register *names*, not Part 3's bit-level detail. That protects Objective 5. It
  does **not** protect Objective 3 (name → *value*): a student who goes quiet at
  "shadow register" has no equivalent reveal to fall back into. Worth not assuming
  the reveal slide covers everything the day claims to teach.

**Where it would quietly give up:** Part 3, at *"the compare shadow register against
the counter"* — the first wholly new term of the day, delivered with no definition,
four minutes before Part 4 asks for bit-fields it is now shaky on the premise for.

---

## expert-cognitive-load — verdict: MAJOR

### Repetition census (this agent owns it)

| Idea | Times | Where | Keep | Reduce to |
| --- | --- | --- | --- | --- |
| PWM resolution, T₀ = T_p / `PWM_TIMER_MAX`, incl. the 4 mV number | 2, both in full | Day 11's optional stretch (`task-day11-stretch-resolution` / `inst-day11-stretch`) and Day 11x Part 5 | Day 11x Part 5 — the telling every student receives | Day 11 is passed and untouchable, so the fix lives here: frame Part 5 as **confirming** an answer some already have. State the number for this motor; do not re-walk the general formula |
| Reasons to brake before reversing (shoot-through; back-EMF spike) | up to 2 | Day 11 (`task-day11-demo-reversal` / `inst-day11-demo`, both reasons in full) and Day 11x Part 4 | Day 11's telling | Part 4 should **point at the code lines** that implement the brake and recall the why from Day 11. The outline does not currently say which it is doing |

### Findings

- **[MAJOR] [P-7] Naming is front-loaded ahead of meaning.** Part 2 introduces
  **six brand-new register names at once** — past the ~4-item ceiling P-7 rests on
  — and meaning for four of them (`CCMR1`, `CR1`, `RCC_IOPENR`, `RCC_APBENR2`) does
  not arrive until Part 4, 15–30 minutes later. Only `CCR1`, `ARR`, `CCER` get
  meaning in the intervening Part 3. **Fix:** split Part 2 into two waves —
  (a) the clock-enable pair, mechanically identical to the Day 1 / Day 8 pattern,
  explained on the spot in ~2 min; (b) the four PWM-behaviour registers moved to sit
  **beside** Part 3's Figure 176/177 explanation rather than 9 minutes ahead of it.
- **[MAJOR] [P-7] Part 4 stacks at least eight novel items in sixteen minutes** —
  five bit-field symbols (`OC1M`, `CC1S`, `CC1E`, `UG`, `CEN`) on top of Part 2's
  six register names, plus two code-behaviour explanations plus the Lab 6 seam. The
  plan's own mitigation (shrink the verification activity) saves *time, not load*.
  **Fix:** split into two beats — name→value for CCMR1/CCER/CR1 closing on `CCR1`;
  then a separate short beat for the ramp asides and the Lab 6 seam, which are a
  different kind of cognitive work.
- **[MAJOR] [B-8] PWM resolution gets a full worked treatment twice in one
  chapter.** The ground truth calls the overlap acceptable, but Part 5 as written
  re-derives the formula and the volts number from scratch rather than confirming
  — the same treatment twice, which B-8 flags regardless of the day gap.
- **[MINOR] [B-9] The plan's own count does not match its own table.** It marks
  "two of ten" questions as Day 11 recall while the table shows at least three rows
  of Day 11 material (`MODER`/`AFR`, `PSC`, `ARR`).
  *Verified: correct.* `plans/day11x.md` and the ground truth both say "two of the
  ten" and then enumerate three items. Fix the count before Gate 2.
  Also: interleaving recall and new items across one ten-row activity makes every
  student do double duty per row — "do I know this" **and** "do I need to look this
  up." Pull the recall rows into a one-minute recap *before* the activity, so the
  15 minutes are a clean run at new material only.
- **[MINOR] [P-2] Nothing in the day asks a student to produce a register value or
  a line of code.** Part 2 ends in a complete reveal; Part 4 only checks a *given*
  line. Every scaffold stays at recognition — and Lab 6, immediately after, asks
  for independent authorship of a three-function driver with no intermediate
  skeleton. May be the right trade at 50 minutes, but it should be a **named
  decision, not an implicit gap**. Swapping Part 4's activity from "check this
  given line" to "**predict** the bit pattern, then check" buys production-adjacent
  practice at no time cost. *(Converges with `expert-active-learning`.)*
- **[MINOR] [P-4] The `TIM1_CCER` mislabel aside crowds Part 3**, which already
  carries two dense figures and the register map. Make it a caption-only note, or
  fold it into Part 4 where `CCER` is already on screen and going into code.

---

## expert-continuity-auditor — verdict: MINOR (but carries the single most
consequential correction of the gate)

Backward and downstream threads otherwise check out cleanly: PA7 → AF4,
`MODER`/`AFR`, the PSC/ARR arithmetic and the H-bridge truth table are all taught
in Day 11 exactly where the plan assumes.

### Findings

- **[MAJOR] [P-1] `UG`/`EGR` is not new — it was taught on Day 10.** Part 4
  introduces it as if fresh ("why an update event is generated before the timer
  starts"), but `ch-i2c.ptx` already teaches it by name with the same reasoning.
  Part 2 flags its Day 11 recall; Part 4 does no equivalent flagging, in the day's
  densest block. **Fix:** name `UG`/`EGR` as **Day 10 recall**, tied back to
  `subsec-day8-rcw0`'s buffered register, so the instructor does not re-derive it.
  *Verified:* `ch-i2c.ptx:1663–1673` reads *"`TIM14->EGR |= TIM_EGR_UG;` forces an
  update event before the timer starts, and that is what loads `PSC` into the
  prescaler's working copy — the buffered register the timers chapter drew"*, with
  an `<xref>` to `subsec-day8-rcw0`. **This also removes one item from
  `expert-cognitive-load`'s count of eight novel items in Part 4.**
- **[MINOR] [L-5/L-6] "Shadow register" is naming drift.** Day 8
  (`ch-timers-interrupts.ptx:640–650`) and the Day 10 passage above both use
  **"buffered"** for the identical concept. Two terms for one idea, 20+ class-days
  apart. **Fix:** reuse "buffered", or say explicitly that "shadow register" is
  RM0490's own name for the buffered-value mechanism from Day 8.
  *Verified:* "buffered" appears at `ch-timers-interrupts.ptx:648`, `:1749` and
  `ch-i2c.ptx:1666`; "shadow register" appears nowhere in `source/`.
  **This supersedes `learner-firstgen-novice`'s fix**, which proposed defining
  "shadow register" fresh — the better repair is to connect it to a term the
  students already own.
- **[MINOR] Forward obligation on Day 12, currently unrecorded.** Lab 6 p.5 says
  students derive `RPM = 60 × PPS / 20` *"in the reading quiz."* Day 11x has no
  pre-class reading, so that quiz can only belong to **Day 12** — which means
  moving her slides 20–21 there is safe *only if Day 12's Before-Class section
  actually carries the derivation.* `plans/day12.md` does not exist yet. Record it
  now so Day 12's Gate 0 does not rediscover it late.
- **[MINOR] Part 4's "Lab 6 seam" conflates two different things — and this is a
  real error in the plan, not a presentation nit.** The plan points at
  `TTmotor_ramp.c`'s inline direction logic in `main()` as *"the mode-select
  function the lab asks them to write."* It is not. Lab 6's prototype is a simple
  four-mode truth-table wrapper, **already taught on Day 11**
  (`act-day11-truth-table`). The inline logic in `main()` is entangled with the
  *ramp state machine's* brake-before-reverse decision — a main-loop policy
  concern, not a driver concern. Students sketching the signature from that block
  risk copying ramp-specific logic into their driver.
  *Verified against `Lab6_ES28.pdf` p.2, which gives the prototypes explicitly:*

  ```c
  void motor_init(void);                 // Set ports for PWM, IN1, IN2
  void motor_mode(uint8_t mode);         // FWD, REV, BRAKE, STOP
  void motor_speed(uint16_t pwm_value);  // interacts with TIM14
  ```

  *and states "The mode and speed (PWM) controls are separated for flexibility."*
  **Correct seam:** `tim14_pa7_pwm_init()` → `motor_init()` (merged with the
  PA5/PA6 output setup that currently sits in `main()`); `tim14_pwm_set()` →
  `motor_speed()`; `motor_mode()` → **Day 11's truth table**. The ramp's
  brake-before-reverse stays in `main()` as the caller's policy. That is a better
  teaching point than the original: the driver exposes mechanism, `main()` holds
  policy.

**Not a finding, worth recording:** this day's register content is not merely Lab 6
prep. `ch-servos.ptx:369–407` (Day 15) and `ch-photosensors.ptx:401` (Day 16) both
reuse `TIM14->CCMR1`/`CCER`/`EGR`/`UG` on PA7/CH1 **without re-teaching it**, and
`ch-timers-interrupts.ptx:1965–1970` promises *"input filtering, capture/compare,
and output control… all of it returns in the motor chapters."* **Day 11x is the
chapter that has to deliver on that promise** — which confirms the register
walkthrough is real course content, not a P-13 lab collapse.

---

## checker-arc-fidelity (lead) — verdict: MAJOR

**No slide of hers is homeless** — every one of her 21 has a Part or a recorded
decision, which is the opposite of Day 11 and a genuinely strong Gate 1. Reverse
direction is clean too: no Part invents content to absorb a layout problem. The
failure is subtler: **the plan's recall boundary is wrong, under the day's largest
Part.**

### Findings

- **[MAJOR] Part 2 spends 15 minutes — 30% of the class — on an activity with two
  genuinely new answers out of ten.** The plan says two of the ten are recall. **It
  is seven.**
  *Verified independently, and the reviewer understated it:*
  - `ch-timers-interrupts.ptx:731–848` already writes, **for TIM14 by name**:
    `RCC->APBENR2 |= RCC_APBENR2_TIM14EN`, `TIM14->PSC = PSC_FACTOR - 1`,
    `TIM14->ARR = ARR_FACTOR - 1`, `TIM14->CR1 |= TIM_CR1_CEN` — questions **4, 5,
    6, 9** — and names `RCC_IOPENR` as a "familiar neighbor" in the same passage.
  - `sl-day11-counter-compare` names both by mnemonic: *"That top value is the
    timer's **ARR**"* and *"That number lives in the timer's **CCR1**"* —
    questions **6 and 10**.
  - `inst-day11-pwm` projects `RCC->IOPENR`, `GPIOA->MODER` and `GPIOA->AFR[0]`,
    and `task-day11-pwm-config` had students **write** them — questions **2, 3**.

  Only **CCMR1** and **CCER** are new. Under **P-17** this is the activity shape
  Petra rejected four times on Day 11 (*"they can read a table without an
  activity"*).
  **Fix:** keep her slide 5 as the spine, but **pre-fill the seven recall rows with
  the day each came from** and project that as its own moment — *"you already know
  eight lines of this driver."* The 15 minutes then buys three questions reading
  cannot answer: (a) §17.3.8 gives `0110` and `0111` — which is "HIGH up to the
  compare value, then LOW", and what would the scope show if you picked the other?
  (b) find `CC1E` in CCER and say what PA7 does if that line is deleted; (c) the
  EGR question below.

- **[MAJOR] `TIM14_EGR` / the `UG` bit is the one register nobody has met, and no
  question in the day asks for it.** Her slide 5 asks nine register questions; the
  code writes ten. EGR is the omission — present in her slide 10 listing and her
  slide 12 bit-field figure, but with no question behind it, and the plan inherits
  the gap by carrying EGR as a clause inside a Part 4 bullet.
  **Fix:** make it Part 2's third discovery, as an eleventh row her slide does not
  have — *"the driver writes one more register none of these questions asked about.
  Find it in §17.4 and say why it is written before the counter is enabled."*
  Rated the highest-value single change available at Gate 1: it converts the day's
  centrepiece from recall into work, and costs one row.
  *Note the tension with `expert-continuity-auditor`, which found `UG`/`EGR` was
  taught on Day 10 — resolved in the change list below.*

- **[MAJOR] Part 5's first half re-reveals an answer already on Day 11's wall.**
  `inst-day11-stretch` (in `day11.json`) states *"one step of the compare value is
  5 V ÷ 1250 = **4 mV** of average voltage."* Ground truth §4 judged her slide 16
  safe as "making the stretch everyone's" — that judgment predates checking that
  Day 11's **solution slide projects the number**.
  **Fix:** her slide 16's own label is *"Minimum pulse width, **T₀**"* — a **time**,
  which Day 11 never gave. T₀ = 625 µs / 1250 = **500 ns**. Teach T₀ as the time,
  tie it to the 4 mV they already have, and land it on Lab 6: *one count of CCR1 =
  500 ns of pulse width = 4 mV of average — and that is what your Waveforms
  screenshot for Deliverable 1 has to resolve.* Same slide, different quantity, no
  repeat.

- **[MINOR] The crucial-step sentence lands on a Day 11 fact.** *"…can say, without
  looking, that the one register their speed-select writes is `TIM14_CCR1`"* —
  `sl-day11-counter-compare` said that a week ago. The first half (point at any line
  and name its register) is genuinely this day's. **Fix:** re-point the second half
  to what is new, which Objective 5 already states — *and **nothing else** has to be
  touched while the motor is running.*

- **[MINOR] The Lab 6 stretch asks for something the handout prints.** *"Sketch its
  signature"* — Lab 6 p. 2 prints `void motor_mode(uint8_t mode);`. Under P-17 that
  is a lookup. And the seam is bigger than the plan says: the driver's inline logic
  produces **three** of the four modes (CW, CCW, short brake) and **never STOP**.
  **Fix:** the stretch becomes *write the body*, including the STOP case the driver
  never uses, from Day 11's `fig-tb6612-truth-table`. Real work, and it is the seam
  Lab 6 actually leaves open. *(Converges with `expert-continuity-auditor`.)*

- **[MINOR] Figure 165 in Part 1 — confirmed, with two conditions.** Her
  annotations are **functional block names only** and name none of CCMR1, CCER, CR1
  or EGR, so **P-15 is satisfied** and the placement is right. Conditions:
  (a) project her annotation and **add nothing** — labelling the "Output control"
  block with CCER would answer Part 2 inside a figure (P-15); leave a source comment
  saying the omission is deliberate, because the next pass will helpfully fill it
  in; (b) **re-show it at the head of Part 3** via `refPage` — Fig 176 is the
  expansion of its "Capture/compare 1 register" block and Fig 177 of its "Output
  control" block. No new figure, no new minutes.

- **[MINOR] Part 1 carries four things in five minutes.** **Fix:** the slides 2–4
  recall is one sentence with a `refPage` to `fig-tb6612-wiring-2` and no slide of
  its own; the locate task is a show of hands, not group work.

- **[MINOR] Four small things dropped between her deck and the plan**, one line each:
  `TIM14->CCR1 = 0;` (*"start with a speed of 0"* — the only safety line in the
  init, and Lab 6's `motor_init()` needs it); the dead `value < 0` branch, which
  ground truth §1b says a careful student will ask about; her slide 18 note *"This
  is built into your motor setup"* — a hardware fact about their kit that the one
  closing slide must carry; and her slide 7's **Williams, Ch. 10, pp 199–206**,
  which is in the plan's P-11 list but in no Part's outline, and belongs where she
  put it: on the Part 2 reveal.

### Layouts she already solved — adopt, do not rebuild

- **Part 2's reveal:** her slides 5 and 6 are the *same slide*, answers appended in
  the same rows, same geometry. Two slides, identical layout, the second with
  answers (and now recall days) added in place. **Do not** rebuild it as a
  two-column question/answer table — the row-for-row identity is what makes the
  reveal readable from the wall.
- **Part 3's register map:** adopt her slide 13's in-place callouts.
- **Part 3, Fig 176:** the unwrapped-label defect from ground truth §6 is a Gate 2
  problem, flagged here so it is not discovered at Gate 3.

### The clock

Totals to 50 exactly; arithmetic correct; no Part starved against her material.
Two observations: **zero slack against three "do" moments** — budget 46 and name
the remainder; and the plan names Part 3 compressible **without naming what inside
it compresses**. The right absorber is **her slide 13**, whose unique content is
only the prescaler → counting-rate link. What must **not** absorb the overrun is
Fig 177's `CC1E` — *"that is the 'my pin is silent' bug Lab 6 students will hit at
11 pm."*

### Scoping decision — right call, now evidenced rather than asserted

Slides 20–21 → Day 12: confirmed three ways (her own slide-21 note is a Day 12
lesson plan; Lab 6 p. 5 sources the arithmetic from a reading quiz; Day 12 is a
110-minute Thursday needing a front end). Slides 17–19 → one slide: right, since
keeping three costs two minutes out of the day's most over-packed Part. Slides 3–4
→ recall: verified against `subsec-day11-direction`, which teaches the regulator,
VM 5 V vs VCC 3.3 V, shared ground and "every 5 V wire stays on the motor side" —
the whole of her slide 4 including its speaker note. **Would it have cut something
else? No.** The only other candidate, her slide 12, must stay: `CC1E` and `UG` are
the two bits students cannot get from any previous day.

---

# Consolidated change list

Resolved across seven reports. Ordered by what must change before slides exist.

## The one finding that reframes the day

**Part 2 is not a discovery activity as designed — seven of its ten answers are
already on the wall.** `checker-arc-fidelity` found it, `expert-active-learning`
reached the same place from the other side (it is a name-lookup where Day 11 asked
students to *write* operations), and `expert-cognitive-load` reached it from a
third (six names introduced ahead of their meaning). Independently verified.

**Resolution — and it settles three reviewers at once.** Keep her slides 5/6 whole,
in her layout, as the spine. Pre-fill the seven recall rows with the day each came
from and project that as its own moment. Spend the freed minutes on the three
questions the manual answers and reading does not:

1. §17.3.8 gives `0110` and `0111` — which one is HIGH-then-LOW, and what would the
   scope show if you chose the other? *(new: CCMR1)*
2. Find `CC1E` in CCER, and say what PA7 does if that line is deleted. *(new: CCER)*
3. The driver writes one register none of these questions asked about. Find it, and
   say why it is written before the counter is enabled. *(EGR/UG)*

This also resolves `expert-cognitive-load`'s "split Part 2 into two waves" **without
cutting her slide in half** — the recall pre-fill *is* the wave separation, and her
row-for-row reveal geometry survives. Her wording wins.

**One conflict to resolve, flagged not silently decided:** `checker-arc-fidelity`
calls EGR/`UG` "the one register nobody has met"; `expert-continuity-auditor`
verified it **was** taught on Day 10 (`ch-i2c.ptx:1663–1673`, with an xref to Day 8's
buffered register). Both are right about their own evidence. **Resolution:** the
*bit* is not new, but the *question* is — nothing has ever asked why the update
event must precede `CEN`, and Day 10 delivered it as an aside in an AI-review
debrief, not as something students worked out. Keep it as Part 2's third discovery,
and phrase the reveal as recall-and-deepen, not as first contact.

## Must fix before authoring

| # | Change | From |
| --- | --- | --- |
| 1 | Rebuild Part 2 per the resolution above | arc-fidelity, active-learning, cognitive-load |
| 2 | **Correct the Lab 6 seam.** `tim14_pa7_pwm_init()` → `motor_init()`; `tim14_pwm_set()` → `motor_speed()`; `motor_mode()` → **Day 11's truth table**, not the ramp's reversal logic, which stays in `main()` as policy. Driver exposes mechanism, `main()` holds policy | continuity (verified against Lab 6 p. 2) |
| 3 | **Stretch becomes "write the body of `motor_mode()`", including the STOP case the driver never produces** — the driver makes only CW, CCW and brake | arc-fidelity, continuity |
| 4 | **Part 5 teaches T₀ as a time (500 ns), not the 4 mV** that `inst-day11-stretch` already projects; land it on Lab 6 Deliverable 1's screenshot resolution | arc-fidelity, cognitive-load |
| 5 | **Invert Part 4:** students decode `0110` into OC1M, `CC1E`, `CEN` *before* any walkthrough (P-6) | active-learning, cognitive-load |
| 6 | **Add a 90-second individual checkpoint** at the end of Part 4 — stripped `tim14_pa7_pwm_init()`, name the register beside each line, reveal against the driver | active-learning |
| 7 | **Budget 46 minutes, not 50**, and name the remaining 4 as settling and transitions | logistics, arc-fidelity |
| 8 | **Name her slide 13 as the pressure valve**, not Part 3 wholesale. `CC1E` must never absorb an overrun | logistics, arc-fidelity |
| 9 | **Use "buffered", not "shadow register"** — or state that RM0490's "shadow" is Day 8's buffered register | continuity (supersedes firstgen's fix) |
| 10 | **Flag `UG`/`EGR` as Day 10 recall** in Part 4 so it is not re-derived | continuity |
| 11 | **Fix the recall count** — the plan says "two of ten" and enumerates three; the true number is seven | cognitive-load, arc-fidelity |

## Must fix in the prose/slides (delivery 1)

| # | Change | From |
| --- | --- | --- |
| 12 | Part 2 opens with the manual's navigation path — `<url>` link, §17.4, page 482 — in the shape `act-day3-ref-manual` already uses | firstgen |
| 13 | Say to the room, at the *start* of Part 2, that the reveal covers all ten regardless of what the table found | anxious |
| 14 | State once that this day involves **no wiring** | anxious |
| 15 | Say whether Part 4 assumes the Day 11 homework was done | anxious |
| 16 | Give Part 2's fast groups forward motion — e.g. predict what `CCR1` holds after `tim14_pwm_set(625)` | logistics |
| 17 | A checkpoint ~minute 7 of Part 2 confirming every group is in §17.4 | anxious, firstgen |
| 18 | One beat per bit-field, not five names in one sentence — `TTmotor_ramp.c`'s own comment structure | firstgen, cognitive-load |
| 19 | Open Part 3 with a prediction against `fig-pwm-scope`: which of `CCR1`/`ARR` does the ramp rewrite every 2 s? | active-learning |
| 20 | Part 4 **points at** the brake code and recalls the why from Day 11; does not re-derive it | cognitive-load |
| 21 | Carry the four dropped items: `TIM14->CCR1 = 0;`, the dead `value < 0` branch, "built into your motor setup", and Williams pp 199–206 on the Part 2 reveal | arc-fidelity |
| 22 | Strike "simply" from the mined slide-8 teaching | anxious |
| 23 | `TIM1_CCER` trap becomes a **caption note**, not a spoken aside in Part 3 | cognitive-load |
| 24 | Figure 165: project her annotation and **add nothing** (P-15); leave a source comment saying the omission is deliberate; `refPage` it again at the head of Part 3 | arc-fidelity |
| 25 | Relabel Part 1 do → reveal, and make its locate task a show of hands | active-learning, arc-fidelity |

## Recorded for Day 12's Gate 0

Lab 6 sources `RPM = 60 × PPS / 20` from a **reading quiz**. Day 11x has no reading,
so that quiz belongs to **Day 12's Before-Class section**. Moving her slides 20–21
is safe *only if* Day 12 carries the derivation. `plans/day12.md` does not exist
yet — record it there when it does.

## Open for Petra

The five questions in `plans/day11x-ground-truth.md` §9 remain open, plus one this
gate added: the day's biggest activity is being rebuilt around three questions
rather than her ten rows. **Her slide 5/6 layout and wording are preserved**, but
the *ask* changes. That is a change to her material and is hers to approve.
