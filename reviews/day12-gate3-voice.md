# Day 12 — Gate 3′ (prose gate), pass 2

Reviewer: `checker-voice` (lead). Scope: `source/ch-motors.ptx`
`<section xml:id="sec-motors-day12">`, lines 2542–3772, prose and slides read
interleaved. Specimens re-read first: `plans/day10-voice-reference.diff`,
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`. Her 48
archived Day 12 comments re-read for verbatim wording. Linters clean
(`check_rules.py` 0/0, `check_deck.py` 0 problems), so nothing below is
L-1…L-11.

### Verdict: MAJOR

### Register — is this her?

Mostly yes, and the systemic failures are gone: every unit opens on what we are
doing, "we" carries the class's work in all six Parts, there is no time budget,
no `Part N`, no "9 V" and no reassurance theater anywhere a student can see, and
her verbatim wording on `milliseconds()` and on the pull-up trade-off is intact
to the word. What is left is local, and it clusters in Part 2, where the prose
was written around a P-6 reveal and picked up two habits she has struck out
before: the epigrammatic reversal (~~"The direct approach is not short by a
little."~~ → *she deleted it*) and prose that talks about the prose. The other
cluster is duplication at the seams — a Part opening that repeats the section
opening, and two figure captions that re-tell the paragraph immediately above
them, which is the `"Wire the display: + to 3.3 V, − to GND…"` deletion in a new
place. Nine of the twelve rewrites below are cuts; her register is not the
problem here, redundancy and two punchlines are.

### Rewrites

- **[MAJOR] 2596–2602 — S-22, and the Day 9x "say a thing once" rule.** Part 2's
  first two sentences are the section introduction's first two sentences again,
  two screens later.
    draft:   "Today we'll measure how fast the motor's shaft is actually turning.
             We'll use the photointerrupter from the reading, watching a slotted
             wheel turn on the shaft: three wires connect it, and one resistor
             goes with it."
    against: 2547–2552, "Today we'll find out how fast it is actually turning.
             We'll wire the photointerrupter and put its output on the
             oscilloscope…"
    hers:    "In this part we'll wire the photointerrupter and look at its
             output on the oscilloscope. It has three wires and it needs one
             resistor, and we'll get a signal onto the screen before that signal
             goes anywhere near a pin on the Nucleo."
    because: her Day 10 pass rewrote the chapter opening to state the goal once
             ("The goal of this chapter is to communicate with and control a
             four-digit seven-segment display via our microcontroller") and cut
             the restatements underneath it. A unit opens on *its own* goal, not
             on the day's.

- **[MAJOR] 2716–2719 — the aphoristic register (S-16, specimen: "The direct
  approach is not short by a little.").** A rhetorical question answered with a
  reversal is the draft's most recognizable tell, and this is the one instance
  of it left in the day.
    draft:   "It is worth asking how a sensor running on 5 V came to produce a
             3.3 V level, and the answer is that it did not."
    hers:    "The sensor runs on 5 V, but the HIGH level on the screen is
             3.3 V, and that 3.3 V does not come from the sensor at all."
    because: ~~"Today: the two wires. Thursday: the chip at the end of them."~~ →
             "We'll talk about the I2C protocol today and will examine how to
             talk to the backpack chip tomorrow." Plain declarative, subject
             first, no punchline. Nothing technical changes: the next sentence
             ("The phototransistor inside the part is a switch to ground and
             nothing else") still carries the mechanism.

- **[MAJOR] 2654–2656 — S-26, and S-23.** The paragraph stops describing the
  circuit and starts describing itself.
    draft:   "Those two sentences name two different voltages: the sensor runs
             from one rail, and the resistor is tied to another. That is not a
             mistake, and we'll see why in a moment."
    hers:    "So the sensor runs from 5 V and the resistor is tied to 3.3 V.
             Those are deliberately two different rails, and we'll see why in a
             moment."
    because: ~~"How many LEDs is that?"~~ → "How many LEDs are in this display?"
             — she replaces every pointer with the thing itself, and "those two
             sentences" points at the page. The withholding ("we'll see why in a
             moment") is fine and is hers; the sentence-about-sentences is not.

- **[MAJOR] 2730–2734 — the same wording twice (Day 9x: the activity deleted
  because the slide before it said exactly that).** `fig-photointerrupter-states`
  opens by re-telling, near verbatim, the paragraph that ends four lines above
  it.
    draft (caption): "Why the sensor's output needs a pull-up resistor. The
             phototransistor is a switch to ground and nothing more: when a slot
             lets the beam through it conducts and pulls OUT down to 0 V, and
             when a spoke blocks the beam it stops conducting and lets go of the
             line altogether. It has no way to drive OUT up."
    against (2719–2724): "The phototransistor inside the part is a switch to
             ground and nothing else. When a slot lets the beam through it
             conducts and pulls the signal wire down to 0 V; when a spoke blocks
             the beam it stops conducting and lets go of the line entirely…"
    hers:    caption becomes "Why the sensor's output needs a pull-up resistor.
             The left half is a slot in front of the beam and the right half a
             spoke: the phototransistor conducts in one and lets go of the line
             in the other, and it has no way to drive OUT up. The 10 kΩ resistor
             is what does that, which means whatever the resistor is connected
             to is what sets the HIGH level — here 3.3 V, which is what the
             STM32C031C6's pins expect. With no resistor there, nothing holds
             the line up when the transistor lets go, and the pin is left
             floating." — then keep the datasheet paragraph ("This is not a
             guess about the part…") exactly as it stands.
    because: the caption's job beside the paragraph is to say what the *picture*
             shows; the mechanism is already stated. Nothing is lost — every
             clause above survives in one of the two places, and the sourced
             Omron sentences are untouched.

- **[MAJOR] 2664–2668 — `fig-day12-wiring`'s caption, two problems in one
  sentence.** It answers Part 2's prediction before the prediction is made, and
  then it points at an annotation instead of saying what the annotation says.
    draft:   "…with a 10 kΩ resistor from that row up to 3.3 V (the thin blue
             arrow): the resistor's rail is what sets the HIGH level, and it is
             3.3 V rather than the sensor's own supply. Put the oscilloscope on
             that same row, which is not drawn. The signal wire stops there, and
             the orange callout says why."
    hers:    "…with a 10 kΩ resistor from that row up to 3.3 V (the thin blue
             arrow). Put the oscilloscope on that same row; the oscilloscope
             itself is not drawn here. The signal wire stops at that row and
             does not go on to the Nucleo, because we look at this signal on the
             oscilloscope before it reaches a pin — which is what the orange
             callout says."
    because: the slide's own `<note>` is explicit — "do NOT say what the pull-up
             is FOR yet… her callout gives the value, not the reason, so the
             reveal still lands" — and the caption gives the reason anyway, in
             the same words `fig-photointerrupter-states` uses two figures later.
             The S-26 half matches ~~"the `H` in the program"~~ → "the `H` in the
             `helloDisplay.c` program": say the thing, then name where it is
             drawn.

- **[MAJOR] 3567–3580 — the prose and the slide it condenses are not the same
  writer (B-7).** `sl-day12-hazards` is four clean bullets; the paragraph is one
  sentence-chain with three clauses opening on "And".
    draft:   "A few things about this circuit are worth being careful with,
             because getting them wrong damages hardware rather than simply not
             working. The potentiometer's two outer legs go to 3.3 V and ground,
             and never to the 5 V rail: … And the regulator and the Nucleo share
             one ground, which every part on the board has to be connected to; a
             circuit whose grounds are not common does not work, and the symptoms
             look like everything else. And the regulator gets hot with the motor
             running: …"
    hers:    keep sentence 1, then one sentence per hazard, in the slide's order
             and with every number kept: "The potentiometer's two outer legs go
             to 3.3 V and ground, and never to the 5 V rail: its wiper feeds A0
             (PA0), which is an analog input on a 3.3 V part. The regulator's 5 V
             output powers the motor and the photointerrupter and nothing else —
             it goes to the TB6612's motor supply and to the sensor's VCC, and
             not to a breadboard power rail. The Nucleo's 3.3 V feeds one of
             those rails, so 5 V put on a rail arrives on the Nucleo and damages
             it. The regulator and the Nucleo share one ground, and so does every
             part on the board; a circuit whose grounds are not common does not
             work, and the symptoms look like everything else. The regulator gets
             hot with the motor running: if something smells hot or is hot to the
             touch, disconnect the power and check the wiring before anything
             else."
    because: this is the "half hers and half not" case — she passed the slide,
             and the paragraph beside it reads as a different hand. Compare her
             own rewrite of the `fig-firmware-layers` caption: longer, one idea
             per sentence, no chaining.

- **[MAJOR] 3310 and 3320–3321 — S-29's register, in body prose.** Two whole
  sentences are set in `<term>`, which renders them bold; her own slide beside
  them uses a four-word bold label.
    draft:   "<term>The first option is to read the pin on every pass.</term>"
             / "<term>The second option is to take a falling-edge interrupt on
             PA15.</term>"
    hers:    "<term>Reading the pin on every pass.</term>  Move the read out of
             the 10 ms beat so that the loop looks at the pin as fast as it can
             go…" / "<term>Taking a falling-edge interrupt on PA15.</term>  This
             is the same five moves you made on Day 9…"
    because: Petra, 2026-08-08, on bold lead lines: *"I really don't like those.
             Can these become regular bullets?"* — and `sl-day12-two-answers`
             already does it her way: `<term>Read the pin every pass.</term>`,
             `<term>Take a falling-edge interrupt on PA15.</term>`

- **[MAJOR] 3357 — "we" is the course.** `sl-day12-two-answers`, third bullet.
    draft:   "The second one is the one this course goes with, and the reason is
             not the arithmetic."
    hers:    "The second one is the one we'll go with, and the reason is not the
             arithmetic."
    because: ~~"this course has been handing you all term"~~ → "**we** have been
             handing you all term". The body prose at 3335 already says "We'll
             use the interrupt"; the slide is the odd one out. (Same substitution
             in the instructor block at 3048, "which this course has not taught"
             → "which we have not taught", where the sentence already says "which
             we have not covered" four words later.)

- **[MINOR] 2952–2955 — "from the reading", twice in two sentences.**
    draft:   "…which is the expression from the reading in
             <xref ref="fig-rpm-formula"/>. The formula is from the reading, so
             it is not new. What is new is that both numbers going into it are
             now yours: you counted the slots, and you measured the rate."
    hers:    "…which is the expression from the reading in
             <xref ref="fig-rpm-formula"/>. What is new is not the formula but
             the two numbers going into it: you counted the slots, and you
             measured the rate." — or, plainer and closer to her: "…in
             <xref ref="fig-rpm-formula"/>. Both numbers going into it are now
             yours: you counted the slots, and you measured the rate."
    because: her Day 10 pass cut every second telling of a fact she had just
             stated ("Each byte is acknowledged, and one STOP ends the whole
             thing" → "…the whole transaction", and the whole "Two things were
             given to you today" frame). The lesson-design observation itself is
             already in `sl-day12-rpm`'s `<note>`, where it belongs.

- **[MINOR] 3272–3273 and 3288 — one punchline and one third telling, same
  argument.**
    draft:   "The obvious place is inside the 10 ms beat, where the read costs
             nothing and everything is already happening — and that does not
             work."
    hers:    "The obvious place is inside the 10 ms beat, where the read costs
             nothing and everything is already happening. That does not work,
             and the reason is what a pin read actually tells you."
    and:     delete "So the condition is about times rather than about
             frequencies." (3288) — the sentence before it states the condition
             in full, and the last sentence of the same paragraph states it a
             third time ("what decides it is the HIGH and LOW times, not the
             pulse rate on its own"). Nothing is lost: two statements of it
             remain, including the one with the arithmetic.
    because: ~~"not to understand every line, which is Thursday"~~ → "we'll go
             through every line on Thursday" — she unwinds the dash-punchline
             into a sentence; and S-28, delete the frame rather than repair it.

- **[MINOR] 2778–2784 — S-23, one clause.** Her passed slide bullet stops one
  clause earlier than the prose.
    draft:   "Today we use the external one, because we are putting a scope probe
             on that node and a resistor you can point at is easier to reason
             about than one inside the chip."
    hers:    "Today we use the external one, because we are putting a scope probe
             on that node." (`sl-day12-pullup-value`, third bullet, verbatim)
    because: ~~"We do this deliberately: we ran Blinky before we explained a
             single register, and using a thing before opening it up works well
             as long as we do open it up afterwards."~~ → deleted whole. The
             pedagogical reason for a choice is not the student's business; the
             physical one is, and it is already there.

- **[MINOR] 2702–2703 — S-25, four words.**
    draft:   "If it goes above 3.3 V, stop, check your wiring and ask for help if
             need be: 5 V <em>will</em> damage your Nucleo."
    hers:    "If it goes above 3.3 V, stop and check your wiring: 5 V
             <em>will</em> damage your Nucleo."
    because: the one surviving form in the corpus is "Still stuck? We're here to
             help!" — five words, at the end, and nothing else. The diagnosis
             here stays exactly as strong; only the rescue clause goes. (Note the
             asymmetry: `table-day12-diagnostics` is diagnosis, not reassurance,
             and is right to stay.)

- **[MINOR] 3012–3013 — L-15's family: hardware has no body, no voice, and no
  mind.**
    draft:   "So the sign on the display assumes the motor is doing what it was
             told: …"
    hers:    "So the sign on the display is only right if the motor is doing what
             it was told: …"
    because: *"the register is not a person. Don't personify things"* (Day 11x).
             L-15 names sit/live and L-17 names say/tell; "assumes" is the same
             move on a third verb, so this is judgment rather than a lint —
             flagged because the fix is free and changes no claim. Same word in
             the instructor block at 3061 ("the display is trusting the motor to
             be doing what it was told") if she wants it consistent.

- **[MINOR] 2899–2905 — Part 3 opens on what you do not have.**
    draft:   "You now have two things: a pulse train on a screen, and a number
             for how many of those pulses arrive in a second at the fastest the
             motor will go. Neither of them is a speed. Turning one into the
             other takes one fact about your own hardware and one line of
             arithmetic, and the fact is on no datasheet anywhere — it is how
             many slots are cut in the wheel on your motor. So the first thing to
             do is count them."
    hers:    "In this part we'll turn that pulse rate into a speed in revolutions
             per minute. The conversion needs one line of arithmetic and one
             number that is on no datasheet — how many slots are cut in the wheel
             on your own motor — so we'll start by counting them."
    because: S-22, and the Day 9x opening pair. "Neither of them is a speed" is
             the day's only unit opening that leads with an absence, and
             "turning one into the other" leaves the reader to work out which is
             which.

- **[MINOR] 2564–2565 — S-23, tail of Part 1's opening.**
    draft:   "So we'll start with whatever is still unclear in that file, while it
             is small enough to hold in your head all at once."
    hers:    "So we'll start with whatever is still unclear in that file."
    because: ~~"which is the order this course usually takes"~~ → deleted. The
             clause explains why we are teaching it now, and it is also the one
             sentence in the day that tells a student what fits in their head.

- **[MINOR] 3094–3095 — an aside about the exercise's own wording.**
    draft:   "The sensor's output goes to the header pin labeled <c>D7</c> on the
             Nucleo (so that's the Arduino name)."
    hers:    "The sensor's output goes to the header pin labeled <c>D7</c> on the
             Nucleo."
    because: the activity's own introduction, two lines above, already says "The
             Nucleo's headers are labeled with Arduino names". Say it once.

- **[MINOR] 2743–2744 and 2877 — the day's one unexpanded abbreviation.**
    draft:   "the part's supply voltage is specified as 5 to 24 VDC"
    hers:    "the part's supply voltage is specified as 5 to 24 V DC"
    because: `PB9 (SDA)` → `PB9 (SDA — serial data)`. This is the only
             initialism in the whole section that a student meets without an
             expansion, and the datasheet's own "VDC" reads as a unit nobody has
             seen. Keep the numbers exactly.

- **[MINOR] 3414–3415 — a dangling "they".**
    draft:   "Every piece of the Lab 6 system is something you have wired before
             or written before. What is new is that all of it is on the board at
             the same time, and that they now have to share one supply, one
             ground and one set of pins."
    hers:    "…and that all of those pieces now have to share one supply, one
             ground and one set of pins."

### Sweeps

- **Unit openings checked: 7** — the section introduction and Parts 1–6.
  Failing: **Part 2** (repeats the section opening verbatim, MAJOR), **Part 3**
  (opens on "Neither of them is a speed", MINOR), **Part 1** (opening is hers;
  its last clause is S-23, MINOR). Passing and hers: the section introduction
  ("On Wednesday we worked through `TTmotor_ramp.c` one register at a time.
  Today we'll find out how fast it is actually turning."), Part 4 ("By the end of
  Lab 6 your program has three jobs to do, and they run at three different
  rates: …" — count plus colon plus content, the S-21 form), Part 5, Part 6
  ("The rest of the class is yours to build in.").
- **Slide titles: 40 deck entries, 30 refs** — all hers after three review
  passes; **no epigrams**. `Why 3.3 V, and why about 10 kΩ` is the S-30 headline
  she circled this morning, and both halves are now answered on
  `sl-day12-pullup-value`. One count to check, below.
- **Weekday or course-period as grammatical actor: 0** (S-20). Every weekday in
  the section is an adverbial or a possessive naming real coursework: "On
  Wednesday we worked through…", "Wednesday's circuit", "the way you did on
  Day 3", "This is what we set up on Day 9". `Lab 6` is subject twice, both in
  forms L-13 permits: "which is what Lab 6 asks for" (asking for a *value* —
  100 Hz) and "it is what Lab 6's own wording allows" (a document as subject of a
  descriptive verb). No "the hour", no "the lab", no "next week".
- **"N, and it is the one that…" armature: 0** (S-21). The three near misses all
  put the content immediately after a colon or a dash and are hers: "your program
  has three jobs to do, and they run at three different rates: sample…", "You now
  have two things: a pulse train…", "What it costs is a promise: nothing anywhere
  in that loop may ever block".
- **"we" in class-work sentences: 32 of 294** student-facing sentences carry
  "we"/"we'll", spread across all six Parts (79 more are "you" for what the
  student personally does, which is S-13). No Part is narrated impersonally. This
  was the first pass's BLOCKER and it is discharged.
- **Acronyms first-used without expansion:** `VDC` only (2744, 2877). Complete
  list checked, with where each is established: PPS (defined in words at first
  use, 2948 ✓), rpm (expanded in the section introduction, 2551 ✓), NPN (Day 6,
  and "open collector" is termed here ✓), UM2953 (named as "The user manual for
  the board", S-12 ✓), SysTick (explained in full, 3157 ✓), PUPDR/Day 3,
  RTSR1/FTSR1/EXTI/NVIC/volatile/Day 9, ADC/Day 7, I2C/Day 9x, PWM and
  TB6612/`VM`/Day 11x, AD2 and Waveforms/Day 1, PA15 and D7 given as both names
  throughout (3242, 3470, 3622 ✓).
- **Design scaffolding in student-facing text: none.** `Part N` appears only in
  subsection titles (structural, B-1), XML comments, `<note>`s and `<instructor>`
  blocks — which L-18 explicitly keeps for her. Every minute count ("≈ 2 min",
  "the thirty seconds", "a two-minute job") is inside a `<note>` or an
  `<instructor>` block. No "9 V" anywhere in the section, in any register. No
  "bench", no "working in pairs", no "before you leave".
- **Verbatim wording she gave, checked word by word:** the `milliseconds()`
  paragraph (3157–3164) matches her comment text exactly except for one added
  comma and one deliberate correction, below; the pull-up trade-off (2769–2776
  and `sl-day12-pullup-value`) preserves all three of her openings — "Using a
  much smaller resistor wastes…", "A much larger resistor…", "Today we use…";
  **"signal wire"** is used at all ten occurrences and never "output wire" or
  "OUT wire"; `sl-day12-quadrature`'s last bullet correctly drops the "over I2C,
  for instance, which you already have working" she struck and keeps "over a
  bus"; the `<note>` on `sl-day12-milliseconds` no longer says "hands back a
  number" (L-15 ✓).
- **L-17 sweep** (say/tell/report/announce/speak): clean in student-facing text.
  The three survivors are the ones she has licensed — "which one leads tells you
  which way the shaft is turning" and "this measurement says nothing about what
  happened inside the interval" are both from slides she passed, and "Reading a
  pin tells you only what that pin is doing" has the student as the one reading,
  which is the "what the trace is telling you" form L-17 keeps (and which is deck
  entry 10's title). **L-15 sweep** (sit/live): "for as long as the program
  lives" (3316) is a lifetime, not a location, so it is outside L-15's ban —
  noted so nobody 'fixes' it.
- **L-16 sweep:** every paragraph in the section opens on a subject and a verb,
  including the four that lead into a `<program>` listing.

### Already written — reuse instead of invent

Checked `assets/ClassSlidesOLD/Day12-Motors(3).pptx` (slides 4–10 and every
speaker note) and `Day11x-Motors(2).pptx` slides 20–21, which were moved here at
Day 11x's Gate 1. The reuse is in good shape:

- Her Day 11x slide 21 wording survives in both `sl-day12-rpm` and
  `sl-day12-decoding` — "Regardless of technology (mechanical, optical,
  magnetic), must translate pulse train into position / velocity information" →
  the slide's lead, and "∆𝜃 = 2𝜋 / #slots (radians), 360 / #slots (degrees),
  1 / #slots (revolutions)" → the first bullet, units and all.
- Her Day 11x slide 20's three questions ("how do you detect the pulses… how do
  you count them… how do you convert to an rpm") and her Day 12 slide 9's are
  `act-day12-pulses-to-rpm`'s tasks, in her order, with the slot count and the
  direction question added.
- Her Day 12 slide 6 note — "When you build this in Lab 6 you'll wire this into
  the Arduino and so you can just enable the pullup on that Arduino pin" — is
  2779–2781, kept and given the `PUPDR` name and the Day 3 callback.
- Her slide 8's range, "Motor speed increasing from 30 RPM to 180 RPM", is the
  source of the 30/180 numbers in `inst-day12-stretch`'s resolution arithmetic
  and of "a three-digit rpm is right for this motor" in
  `inst-day12-pulses-to-rpm`. Good.
- One place the draft is better and should stay better: her slide 6 note says
  "You'll need a pullup resistor on the orange wire since the phototransistor
  doesn't make any current." The draft's "The phototransistor inside the part is
  a switch to ground and nothing else" plus the open-collector/open-drain link to
  Day 10 is the stronger statement and is sourced to the Omron ratings table.
  Keep the draft's.
- Nothing in the old deck covers `milliseconds()`, the poll-or-interrupt
  decision, the dead band or the build order, so those are not reinventions.

### For Petra, not for me

- **One word of yours was changed on purpose.** Your comment on slide 26 reads
  "…its handler, which is called every time one **second** has passed, simply
  increases the `currentMilliseconds` count by one." The prose and the slide both
  say "every time one **millisecond** has passed", because SysTick is loaded with
  12000 − 1 at 12 MHz. Everything else in that paragraph is yours to the word.
  Flagging it because it is the only place your text was not taken verbatim, and
  it is not recorded anywhere in the source.
- **`sl-day12-hazards`' headline and its body.** Deck entry 32 is titled "Three
  wires to get right before you apply power" and the slide has four bullets —
  three wiring ones and the hot-regulator one — and the first bullet is itself
  two wires. This is the S-30 pattern you named this morning ("the slide doesn't
  answer that question currently"), and the count rule from Day 9x says the fix
  is the lead, not the number. Yours to call: retitle to "Get these right before
  you apply power", or move the heat bullet to the build slide.
- **Six `<instructor>` blocks are projected on Day 12** (deck entries 13, 20, 23,
  27, 35, 36, 38) — more than any other day — and they are written in teacher
  register, which the corpus says is yours: "it is theirs to measure rather than
  ours to state" (2884), "Leave this open — Part 4 is where it gets settled"
  (3043), "the whole reason for doing it in the room rather than printing the
  answer" (3114). Your Day 10 pass left exactly this register in place
  ("The reason is worth giving once they have found it"), so I have not touched
  it. If you would rather the projected answer blocks read as answers to the
  room, that is a rule none of the three specimens settles.
- **`fig-day12-wiring`'s caption calls it "The circuit for this exercise".** You
  erased the "Exercise #1" heading out of your own export; "this exercise" is the
  last trace of it. "The circuit for today's measurement" if you want it gone.
