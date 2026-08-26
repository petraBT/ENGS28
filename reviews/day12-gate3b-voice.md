# Gate 3″ — Day 12 voice review (lead)

**Scope**: `source/ch-motors.ptx` — `sec-speed-before-class` (2251–2529),
`sec-motors-day12` (2539–3728), `sec-motors-reference` (3760–4142).
**Calibrated against**: `plans/day10-voice-reference.diff` (read first),
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`, and
`sec-motors-day11` (320–1319), which she has passed.

### Verdict: MAJOR

### Register — is this her?

Mostly, and much more so than Gate 3′. The unit openings, the weekday handling,
the acronym expansions and the "we/you" split are hers, and the pre-class reading
reads like Day 11 throughout. What is not hers is a thin seam of *epigram* that
runs through Part 3 and Part 4 — four sentences whose job is to sound like a
conclusion rather than to carry one. That is the register she rejected in the Day
9x specimen (~~"The direct approach is not short by a little."~~ → *deleted*), and
it is where "cutsy" lands in this draft: not in baby-talk, but in aphorism. The
worst instance is Part 4's close, ~~"it is right for reasons you have not checked,
and that is what makes the interrupt the better answer"~~, which is
~~"which is the whole point"~~ wearing a lab coat. Alongside it there are two
small S-23 leaks ("deliberately", "the only test today where you control the
input"), one reassurance clause in Part 5, and one sentence about the pull-up rail
told three times in three hundred words.

Everything below is net-negative in words except two one-word fixes. Total effect
on `sec-motors-day12`: about **−190 words**.

---

### Findings

**1 — [MAJOR] 3287–3296 — the epigram at the end of Part 4 (S-21/S-23, day9x
"cut the rhetorical construction")**

    draft:   "We'll use the interrupt, and the reason is not the arithmetic. … So
              the polled version is not wrong at these rates; it is right for
              reasons you have not checked, and that is what makes the interrupt
              the better answer."
    hers:    "We'll use the interrupt. Whether polling is fast enough depends on
              the pulse's HIGH and LOW times rather than on the pulse rate you
              measured, and those times depend on how wide the slots are compared
              with the spokes between them — which nobody has measured, and which
              changes if you swap a wheel. The interrupt does not depend on any of
              that: the pulse is counted whatever else the loop is doing, at any
              speed."
    because: ~~"Today: the two wires.  Thursday: the chip at the end of them."~~ →
             "We'll talk about the I2C protocol today and will examine how to talk
             to the backpack chip tomorrow." (day9x). Two contrastive frames go —
             "the reason is not the arithmetic" and "not wrong … right for reasons
             you have not checked" — and the engineering is unchanged.

    ADD:       nothing
    DISPLACES: the final sentence of 3288–3296 whole, plus the "the reason is not
               the arithmetic" tag. The honest defence of polling is NOT lost: it
               is already stated plainly at 3271–3272 ("At the rates this motor
               produces, this works, and it is what Lab 6's own wording allows").
    NET:       −28 words

**2 — [MAJOR] 3273–3275 — "a promise" (S-11, metaphor as the name of a thing;
L-15, "for as long as the program lives")**

    draft:   "What it costs is a promise: nothing anywhere in that loop may ever
              block, for as long as the program lives, and every line added to it
              afterwards is bound by that promise."
    hers:    "What it costs is a constraint on everything you add later: nothing in
              that loop may block, ever."
    because: ~~"tim14_pwm_set() **clamps** the value…"~~ → "…**limits** the value
             it is given to the range…" (S-11, Day 11x: *"don't use that word."*)
             The constraint is named by a metaphor the reader has to decode, and
             the metaphor is then repeated as the sentence's last word. The
             technical claim (never block, for the life of the program, including
             later additions) is preserved exactly.

    ADD:       nothing
    DISPLACES: the second half of 3273–3275
    NET:       −15 words

**3 — [MAJOR] 2882–2889 — Part 3's opening (day9x "cut the rhetorical
construction"; S-13 "we" for class work)**

    draft:   "You now have two things: a pulse train on a screen, and a number for
              how many of those pulses arrive in a second… Neither of them is a
              speed. Turning one into the other takes one line of arithmetic and
              one fact that is on no datasheet anywhere — how many slots are cut in
              the wheel on your own motor. So the first thing to do is count them."
    hers:    "You now have a pulse train on the screen and a number for how many
              pulses arrive in a second at the fastest the motor will go. Neither
              is a speed yet. Converting one into the other takes one line of
              arithmetic and one number that is not in any datasheet: how many
              slots are cut in the wheel on your own motor. So we'll start by
              counting them."
    because: "on no datasheet anywhere" is the flourish; "So the first thing to do
             is count them" is the class's work narrated impersonally —
             ~~"In the first twelve minutes we wire a display…"~~ → "**We'll start
             by wiring** the display…" (day9x).

    ADD:       nothing
    DISPLACES: 2882–2889 rewritten in place
    NET:       −10 words

**4 — [MAJOR] 3443–3445 — reassurance in Part 5 (S-25 / B-12)**

    draft:   "This is Lab 6's own build, so it continues after class, and getting
              the rpm onto your screen is a milestone on its own whether or not the
              display is working yet."
    hers:    "This is Lab 6's own build, so it continues after class."
    because: ~~"Been through the four wires twice and still dark? … we will get you
             onto it."~~ → *deleted whole*, and ~~"Still blank after that? Raise
             your hand and keep going — nothing in the next four parts needs your
             own display"~~ → *deleted* in the Day 10 pass. What is lost is the
             encouragement, and it is already where it belongs: `sl-day12-build-order`'s
             note says "getting the rpm onto the screen is a milestone that does not
             depend on the display working, so nobody spends the evening stuck on
             I2C with nothing to show."

    ADD:       nothing
    DISPLACES: the second clause of 3443–3445
    NET:       −18 words

**5 — [MAJOR] 2666–2668 and 2688–2690 — two S-23 leaks in Part 2**

    draft:   (a) "…two different rails, deliberately, and we'll see why in a
              moment."
              (b) "turn the wheel slowly by hand before you start the motor: it is
              the only test today where you control the input and already know what
              the output should do."
    hers:    (a) "So the sensor runs from 5 V and the resistor is tied to 3.3 V.
              We'll see below why those are two different rails."
              (b) "…and turn the wheel slowly by hand before you start the motor."
    because: ~~"We do this **deliberately**: we ran Blinky before we explained a
             single register…"~~ → *deleted whole*; ~~"Two things were given to you
             today rather than explained, both **deliberately**."~~ → "Today you
             were given the I2C library without much explanation…" (S-23). Her pass
             struck that word twice in one file. (b) is the book praising its own
             exercise design; the same sentence, addressed to the instructor, is
             already in `inst-day12-wire-and-scope` at 3850–3853, so nothing is lost.

    ADD:       nothing
    DISPLACES: (a) rewritten in place; (b) the trailing clause deleted
    NET:       (a) 0, (b) −20 words

**6 — [MAJOR] 2789–2792 — the pull-up rail, told a third time in three hundred
words (day9x "say a thing once")**

    draft:   "…so the resistor is not optional, and the rail you tie it to is the
              design decision: 3.3 V, which is what the STM32C031C6's pins expect,
              and not the sensor's own 5 V."
    hers:    "…so the resistor is not optional."
    because: the same sentence is already at 2748–2749 ("the rail the resistor is
             tied to is what sets the HIGH level, and we tied it to 3.3 V because
             3.3 V is what the STM32C031C6's pins expect"), in the caption of
             `fig-photointerrupter-states` at 2765–2766, and again on
             `sl-day12-pullup-value` and in `subsec-motors-ref-speed` at 4017–4018.
             Five tellings. The Day 10 pass cut the *third* telling of the wiring
             list for exactly this reason. No engineering is lost: 5 V's consequence
             is stated on the slide ("Pulled up to 5 V, this line would carry 5 V
             into whichever pin you wired it to").
    note:    **Her verbatim sentence at 2746–2747 — "at which point the wire is
             pulled up through the 10 kΩ resistor to 3.3 V" — is intact and this
             finding does not touch that paragraph.**

    ADD:       nothing
    DISPLACES: the second half of 2789–2792
    NET:       −25 words

**7 — [MAJOR] 2545 — the day's second sentence points at the wrong noun (S-26)**

    draft:   "On Wednesday we worked through TTmotor_ramp.c one register at a time.
              Today we'll find out how fast it is actually turning."
    hers:    "…Today we'll find out how fast the motor is actually turning."
    because: ~~"the `H` in the program"~~ → "the `H` in the `helloDisplay.c`
             program"; ~~"How many LEDs is that?"~~ → "How many LEDs are in this
             display?" (S-26). As written, the antecedent of "it" is the program.

    ADD:       "the motor"
    DISPLACES: "it"
    NET:       +1 word

**8 — [MAJOR] 2903–2913 — her own Exercise #2 wording already exists (P-12 reuse,
and her pass-1 "no more training wheels")**

    draft:   "How could the STM32C031C6 notice each pulse as it arrives? Describe
              every way you can think of, and list what each one would need in terms
              of code."  /  "Given a way of noticing them, how do you count them?
              The rpm has to come from a count taken over a known stretch of time —
              where does that count live, and what starts and ends the stretch?"
    hers:    "How do you detect the pulses on the STM32C031C6? Describe every way
              you can think of."  /  "How do you count the pulses? The rpm comes
              from a count taken over a known stretch of time: what starts and ends
              that stretch?"
    because: `Day12-Motors(3).pptx` slide 9, in her words: *"Discuss, at your table,
             how to convert the pulse stream from the photosensor into measurements
             of RPM: How do you detect the pulses on the microcontroller? How do you
             count the pulses? How do you convert the count to an rpm?"* The draft
             reinvented three questions she had already written, and lengthened each.
             Also fixes "where does that count **live**" (L-15).

    ADD:       nothing
    DISPLACES: `task-day12-detect` and `task-day12-count` statements
    NET:       −30 words

**9 — [MINOR] 3239–3245 — "the shape of the loop is clear" / "the one thing still
unplaced" / "beat" (S-21; S-11)**

    draft:   "So the shape of the loop is clear. Ask the time on every pass; … The
              one thing still unplaced is where the sensor's pin gets read, and the
              obvious place — inside the 10 ms beat, where everything else is
              already happening — does not work."
    hers:    "So the loop asks the time on every pass; when 10 ms have gone by it
              samples the potentiometer and commands the motor, and when a second
              has gone by it converts the pulse count and sends it to the display.
              What is left to place is the read of the sensor's pin, and the obvious
              place — inside the 10 ms step, where everything else already happens —
              does not work."
    because: "The one thing still unplaced is…" is the S-21 armature; "the 10 ms
             beat" (also 3269) names a period with a metaphor, which is S-11's
             ban — a metaphor *inside* an explanation is fine, a metaphor used as
             the *label* is not.

    ADD:       nothing
    DISPLACES: 3239–3245 rewritten in place
    NET:       −8 words

**10 — [MINOR] 3564–3569 — "before there is a keyboard involved" (cutsy)**

    draft:   "…and both of those are far easier to get right before there is a
              keyboard involved than afterwards."
    hers:    "…and both are easier to get right on paper than in the editor."
    ADD:       nothing
    DISPLACES: the trailing clause
    NET:       −6 words

**11 — [MINOR] 2740–2742 — restating the instruction the activity just gave
(day9x "do not restate an instruction the previous slide gave")**

    draft:   "What should be on the screen is a square wave between 0 V and 3.3 V,
              one cycle for every slot that goes past. The sensor runs on 5 V, but
              that HIGH level is 3.3 V, and the 3.3 V does not come from the sensor
              at all."
    hers:    "The square wave you are looking at runs between 0 V and 3.3 V, and
              that 3.3 V does not come from the sensor at all: the sensor runs on
              5 V."
    because: `task-day12-scope`, immediately above, already says "You are looking
             for a trace that toggles between 0 V and 3.3 V once for every slot
             that goes past." She deleted "Wire the display: + to 3.3 V…" for this.
    NET:       −12 words

**12 — [MINOR] 3162–3164 — "a second timer" reads as "a timer of seconds"**

    draft:   "SysTick is a second timer, with its own registers — Day 8's was
              TIM14 — but the shape is Day 8's: a counter, an interrupt when it
              reaches the end, and a handler that runs on the way past."
    hers:    "SysTick is another timer, with its own registers — Day 8's was
              TIM14 — but it has the same shape as Day 8's: a counter, an interrupt
              when it reaches the end, and a handler that runs each time."
    because: S-26 (name the referent) and L-16's spirit; "on the way past" is
             ornament. The paragraph above it at 3123–3131 is **hers to the word**
             and is untouched by this.
    NET:       0

**13 — [MINOR] hardware personification and one document-as-agent (L-15, L-13)**

    - 2793 "10 kΩ **sits** comfortably inside it" → "**is** comfortably inside it"
      (which is exactly what her Reference version at 4016 already says). NET 0.
    - 3872 "The switching frequency has to **sit** above the motor's own mechanical
      response" → "has to **be** above". NET −1.
    - 3929–3930 "A wheel that must hold position **wants** the brake, a flywheel
      that should spin down gently **wants** the coast." → "Use the brake for a
      wheel that must hold its position, and the coast for a flywheel that should
      spin down gently." NET 0.
    - 3388 "is what **Lab 6 asks you to write**" → "is what **you are asked to
      write in Lab 6**" (L-13, her words: *"Don't make things do other things."*).
      NET +1.

**14 — [MINOR] 2366–2367 — saying it twice inside one clause**

    draft:   "…so it is a question we have to answer, and we'll answer it in class."
    hers:    "…so we'll answer it in class."
    NET:       −8 words

**15 — [MINOR] `assets/decks/day12.json` slide 19 — a title stated as an absence
(S-18, and failure 1)**

    draft:   "What the pulse train does not carry"
    hers:    "Telling which way the shaft is turning"
    because: ~~"Four wires, and 3.3 V not 5 V"~~ → "Wire up your display" (day9x).
             A title says what the slide *is*. The slide's own first bullet already
             delivers the negative finding; the title does not have to.
    NET:       0 (deck only)

**16 — [MINOR] `sec-motors-reference` — three sentence fragments (L-16)**

    3773 "The twelve steps of `tim14_pa7_pwm_init()`, as registers." → "The table
    below gives the twelve steps of `tim14_pa7_pwm_init()` as registers."
    3880 "Three logic inputs per channel, and a fourth pin for the whole chip." →
    "The driver has three logic inputs per channel, and a fourth pin for the whole
    chip."
    4009 "The pull-up value.  A trade-off rather than a calculation." → "The
    pull-up value.  Choosing it is a trade-off rather than a calculation."
    because: Petra, Day 11x: *"not a complete sentence — use only complete
             sentences."*  The `<term>`-label-then-sentence pattern elsewhere in
             this section is the permitted S-29 form and is fine; these three are
             the ones where the sentence after the label never arrives.
    NET:       +9 words, in the section that is not length-budgeted.

**17 — [MINOR] 3085–3087, inside `<instructor>` — "which is the whole reason"**

    draft:   "And the lookup is a two-minute job that saves a wrong guess in the
              lab, which is the whole reason for doing it in the room rather than
              printing the answer."
    hers:    "Doing the lookup in the room rather than printing the answer saves a
              wrong guess in the lab."
    because: ~~"which is the whole point"~~ is on the day9x list. Instructor-only,
             so this is style not policy — but it is the one place a time budget
             and a pedagogy justification are still in the file, and they read
             oddly next to her own notes.
    NET:       −10 words

---

### Sweeps

- **Unit openings checked: 10 — failing: 1** (`sec-motors-reference`, and only in
  the sense of finding 16's fragment; see the note below on why its first
  paragraph is *not* a finding).
  `sec-speed-before-class` "On Wednesday we set the motor's speed, but we could
  not yet measure it." ✓ — this is her Day 10 pattern exactly ("Yesterday we used
  the I2C bus to light up the 7-segment display."), not failure 1.
  `sec-motors-day12` ✓ (but see finding 7). `subsec-speed-sensor` ✓,
  `subsec-speed-rpm` ✓, Parts 1 ✓, 2 ✓, 3 → finding 3, 4 ✓, 5 ✓, 6 ✓.
- **Slide titles: 40 — epigrams rather than names: 1** (#19, finding 15). #10
  "What the trace is telling you" is her own surviving form (L-17: the student is
  the one interpreting) and stays. #32 "Get these right before you apply power" is
  an instruction, not an epigram, and stays.
- **Weekday or course-period as grammatical actor: 0** (S-20). Every occurrence is
  adverbial ("On Wednesday we…", "as it did earlier today") or a possessive naming
  real coursework ("Wednesday's `TTmotor_ramp.c`", "Wednesday's circuit"). Clean.
- **"N, and it is the one that…" armature: 1** (finding 9, "The one thing still
  unplaced is…"). See the rule-vs-specimen note below for the three that were
  considered and cleared.
- **"we" in class-work sentences**: `sec-motors-day12` body prose has 19 "we" to
  87 "you", against Day 11's 34 to 44. The skew is defensible — Day 12 is a build
  day and S-13 gives "you" to what the student personally does — but two of the
  three impersonal narrations of the *class's* work are in Part 3, and finding 3
  fixes one of them ("So the first thing to do is count them" → "So we'll start by
  counting them").
- **Acronyms first-used without expansion: 1** — `EXTI`, first student-facing use
  in this chapter at 4041 and in `table-day12-exti-lines`. It is expanded in
  ch-gpio-interrupts, but a student lands on a Reference section cold. Add
  "EXTI (the extended interrupts and events controller)" at 4041 — the Reference
  is not length-budgeted, so no DISPLACES is owed. Everything else is clean: rpm
  (2263), LED (2276), PPS (2334), phototransistor (2277), pull-up resistor (2317),
  spoke (2285), dead band (3457), quadrature encoder (2991), UM2953 named with its
  table and page (3056–3058, S-12), RM0490 named rather than a bare section number
  (L-14), D7/PA15 and every other pin given both names.
- **Design scaffolding in student-facing text: 0.** No minute counts, no "Part N"
  pointers and no "a program you are given" outside `<note>`, `<instructor>` and
  XML comments. The only "Part N" references in prose are in `<instructor>`
  blocks (2868, 3010, 3656), which L-18 explicitly leaves to her. `≈ N min`
  appears only in `<note>`.
- **Captions**: 9 in Day 12, longest 60 words (`fig-day12-lab6-build`), against
  Day 11's longest of 58 (`fig-actuator-chain`). None enumerates a wire colour
  decoratively and none says what is absent from the drawing. **`fig-day12-cabled-sensor`
  names brown/blue/black/pink deliberately and should stay**: the colours are the
  only way to tell that variant's wires apart, the book reader never sees
  `sl-day12-cabled-sensor`'s bullets, and this is not the case she was objecting
  to. Captions are clean this round.

### Where a rule and a specimen disagree — three things I did **not** flag

1. **S-28 says delete a count-armature. Her passed Day 11 keeps one.** 359–364:
   "Two stages of that chain are new, and they are what this chapter is about: the
   driver … and the converter …". That is the S-21 shape, delivered by a colon, and
   she passed it. So **2882 "You now have two things:"** and **3524 "Four things
   about this circuit damage hardware rather than simply not working."** are not
   findings on the count alone — 3524 stays as written. (Finding 3 rewrites 2882
   for the flourish that follows it, not for the count.)
2. **The pre-class "has two parts. The first is… The second is…"** (2272–2276) is
   the exact armature S-28 quotes — but her own Day 10 hand rewrite *wrote* "This
   reading has two jobs. The first is to get ready to understand…". Where the count
   is real and physical, the frame is hers. Not a finding.
3. **The Reference section's opening paragraph (3763–3767)** is a near-copy of her
   passed `sec-i2c-reference` opening ("Lookup material for all of the I2C material
   we studied. Nothing here is new; it is the same information arranged in a
   fashion more suitable for a quick look-up, plus some additional information in
   case you are curious."). "Nothing here is new" would otherwise read as failure 1;
   it is hers, so it stays. If anything, match her wording more closely rather than
   less.

### Already written — reuse instead of invent

- `task-day12-detect` / `task-day12-count` — she already wrote these three
  questions: `Day12-Motors(3).pptx` slide 9, *"How do you detect the pulses on the
  microcontroller?  How do you count the pulses?  How do you convert the count to
  an rpm?"*  See finding 8.
- `sl-day12-wheel-recall` / the pre-class sensor description correctly carry her
  slide 5 line, *"LED + photosensor → series of pulses as slotted wheel interrupts
  the beam. Detect and count pulses in the MCU, convert to RPM."*  Nothing to do.
- Her slide 5 speaker note, *"Really important that you get this working before you
  leave today,"* was correctly **not** carried into student-facing text (S-25).
- `milliseconds()` paragraph at 3123–3131 and the sentence at 2746–2747 are hers
  verbatim from pass 1 and pass 2. Both are intact; no finding touches either.

### For Petra, not for me

- **"The 50 Hz alternative, and why not"** (3869) as a `<term>` label. It reads as
  a heading with an opinion in it. Her Day 8 pass kept one forward-referencing
  heading and cut another, and the specimens do not settle which this is. Leaving
  it alone.
- **"beat"** for the 10 ms period (finding 9). I read it as S-11 metaphor-as-label,
  but "the wire changes hands" survived her Day 10 pass, so the line between a
  metaphor inside an explanation and a metaphor as a name is hers to draw here.
- `sec-motors-day12` body prose runs 19 "we" to 87 "you". If she wants Day 11's
  balance, the place to change it is Parts 5 and 6, where the build is narrated
  entirely in the second person — but that may be exactly right for a build day,
  and it is a bigger change than a voice pass should make unasked.
