# Day 12 — Gate 1.5, voice probe

Scope: `source/ch-motors.ptx` lines 2249–2313 only — `sec-speed-before-class`'s
`<introduction>`, `subsec-speed-sensor`, and `fig-photointerrupter-beam`'s caption.
Reference read in order: `sec-motors-day11` / `sec-motors-day11x` in the same file
(both through her hand), then `plans/day10-voice-reference.diff`,
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`,
`plans/day11x-handover.md`, `AUTHORING-book.md` S-11…S-29 / L-12…L-16.

### Verdict: MAJOR

### Register — is this her?

Mostly, yes. The paragraphs are plain declaratives, they explain rather than
assert, "we" carries every sentence about the class's work, LED and
phototransistor are expanded inline, there is no reassurance, no time budget, no
epigram, and no weekday doing the teaching. Two places are not hers. The **first
sentence of the section** packs a recap, a full re-description of the sensor and
a colon-appositive into sixty words, where her own opening one section earlier is
three plain sentences — *"On Tuesday we got a motor turning. We wired the TB6612
breakout, set the motor's direction by hand… Today we'll open that program and
read it one register at a time."* — and where the re-description reinvents a
sentence she has already written on `sl-day11x-next`. The **pull-up paragraph**
reproduces the S-21/S-28 armature she deleted twice in the Day 10 pass: *"there
is one thing about the output that has to be right before any of this works: it
needs a pull-up resistor"* against her ~~"Two things to take from a failed
transaction. The first is…"~~ → **"A few notes about a failed transaction:"**.
Neither is systemic, so this is not the "you are not speaking in my voice" case —
but the section's first sentence is the one she reads first.

### Rewrites

- [MAJOR] `source/ch-motors.ptx:2252–2262` — [S-22, S-16, reuse of `sl-day11x-next`]

    draft:
    > "On Wednesday we got the motor turning at whatever speed we asked for, and
    > at the end of class we looked at the sensor that will let us find out what
    > speed it is actually turning at: a wheel with slots cut around its rim,
    > turning on the motor's shaft, and a photointerrupter whose beam those slots
    > interrupt one at a time (<xref ref="fig-encoder-wheel"/>). What comes out of
    > that sensor is a train of pulses, and the faster the shaft turns the faster
    > the pulses arrive. In this reading we'll work out how to turn that rate into
    > a number: the speed of the shaft in revolutions per minute."

    hers:
    > "On Wednesday we set the motor's speed, but we could not yet measure it. At
    > the end of class we looked at the sensor that will let us: an optical
    > incremental sensor, a slotted wheel on the motor's shaft and a
    > photointerrupter whose beam is interrupted once per slot
    > (<xref ref="fig-encoder-wheel"/>). It is already mounted on the motor in
    > your kit. What comes out of it is a train of pulses, and the rate those
    > pulses arrive at is proportional to how fast the shaft is turning. In this
    > reading we'll work out how to turn that rate into the speed of the shaft in
    > revolutions per minute (rpm) — the number we'll count out, convert, and put
    > on the seven-segment display in class."

    because: three of those five sentences are hers already, on the slide that
    closes Day 11x — *"We can set the speed. We cannot yet measure it."*, *"We'll
    use an <term>optical incremental sensor</term>: a slotted wheel on the shaft,
    and a photointerrupter whose beam is interrupted once per slot, turning
    rotation into a train of pulses."*, *"This is already built into your motor
    setup"*, *"The rate those pulses arrive at is proportional to how fast the
    shaft is turning."* The closing clause is `sl-day11x-scope-video`'s caption:
    *"we'll count them, turn them into rpm, and put the number on the
    seven-segment display."* Two things the draft loses and this restores: the
    **term** (the reading paraphrases a name the class already has, so a student
    cannot connect the two), and the **proportionality** — "the faster the shaft
    turns the faster the pulses arrive" is a weaker claim than hers, and the
    whole point of the reading is a derivation that needs proportionality (S-16:
    never weaken the engineering while changing the register). Her Day 11x note
    also calls "the sensor is already on their motor" *"the fact that matters —
    say it explicitly or they will not look"*, which is exactly what a pre-class
    reading is for.

- [MAJOR] `source/ch-motors.ptx:2303–2311` — [S-21 / S-28, S-15]

    draft:
    > "The photointerrupter has three connections — power, ground, and an output —
    > and there is one thing about the output that has to be right before any of
    > this works: it needs a <term>pull-up resistor</term>, a resistor between the
    > output and the supply, of around 10 kΩ. The same requirement is written into
    > Lab 6. We'll wire that resistor in class and find out on the oscilloscope
    > what it is doing there."

    hers:
    > "The photointerrupter has three connections: power, ground, and an output.
    > The output needs a <term>pull-up resistor</term> — a resistor of about
    > 10 kΩ between the output and the supply rail — and the same resistor appears
    > in the Lab 6 wiring. We'll wire it in class, put the oscilloscope on the
    > output, and work out there why the pull-up is needed."

    because: the armature and the stakes clause are both patterns she has removed
    by hand. S-21: ~~"There is one rule, and everything else follows from it."~~ →
    **"There is one rule: SDA is allowed to change only while SCL is LOW."**;
    S-28 goes further and takes the frame out entirely: ~~"Two things to take from
    a failed transaction. The first is…"~~ → **"A few notes about a failed
    transaction:"**. "…that has to be right before any of this works" is the
    manufactured-stakes clause of S-15 — compare her ~~"Lab 5 asks exactly this at
    full scale — and next week, timers drive motors."~~ → **"This is a great
    preparation for Lab 5."** The withholding itself is fine and stays: "we'll…
    work out there why the pull-up is needed" is the same shape as her
    **"we'll observe what actually happens when you try to talk to a device that's
    not answering"** and **"we'll find out on Thursday why"**. What makes the draft
    read as a tease is not the withholding but the frame in front of it.
    ("work out" rather than "find out what it is doing there" also follows the Day
    11x rule against asking a student to *say* something — *describe*, *work out*.)

- [MAJOR] `source/ch-motors.ptx:2271–2275` — [L-15, reuse of her Day 12 deck slide 5]

    draft:
    > "…the U-shaped part wrapped around the rim of that wheel: one arm of the U
    > holds an LED (light-emitting diode) and the other holds a
    > <term>phototransistor</term>, which is a transistor that is switched by
    > light falling on it rather than by a current we supply."

    hers:
    > "…the U-shaped part wrapped around the rim of that wheel. There is an LED
    > (light-emitting diode) on one side of the U and a <term>phototransistor</term>
    > on the other. A phototransistor is a transistor that is switched by light
    > falling on it rather than by a current we supply."

    because: her own sentence for this exact object, in the Day 12 deck's speaker
    note for slide 5: *"It's the U-shaped object that's wrapped around the slotted
    wheel. **It has an LED on one side and a photosensor on the other side.**"*
    And L-15: *"the register is not a person. Don't personify things"* — "holds"
    gives the arm hands, the same move as the "sits"/"lives" run she found five
    times in one Day 11x pass, with *"apply everywhere"* attached. Splitting the
    relative clause into its own sentence is also her habit in this chapter
    ("A commutator keeps switching the direction of the current…").

- [MINOR] `source/ch-motors.ptx:2285–2287` — [S-26, S-16]

    draft:
    > "The two things worth holding onto from that picture are that the
    > <em>number</em> of pulses tells us how far the shaft has turned, and the
    > <em>rate</em> they arrive at tells us how fast it is turning."

    hers:
    > "For now the two ideas to hold onto are that the <em>number</em> of pulses
    > tells us how far the shaft has turned, and that the <em>rate</em> at which
    > they arrive is proportional to how fast it is turning."

    because: "from that picture" points instead of naming (S-26: ~~"How many LEDs
    is that?"~~ → **"How many LEDs are in this display?"**), and "for now the
    idea(s) to hold onto" is her own wording three subsections earlier in this
    chapter — *"for now the idea to hold onto is that the duty cycle sets the
    average voltage, and the average voltage sets the speed."* Proportionality
    again, per `sl-day11x-next`.

- [MINOR] `source/ch-motors.ptx:2267–2268` — [S-26, and her form for referring back]

    draft:  "The sensor is called an <term>optical incremental sensor</term>, and it has two parts."
    hers:   "The optical incremental sensor we looked at at the end of class has two parts."

    because: the class was given this name on Wednesday (`sl-day11x-next`), so a
    sentence that introduces it cold makes the student wonder whether it is a new
    thing. Her forms for reaching back: *"the same timer we set up on Day 8"*,
    *"which you found on Day 11"*, *"As we saw in the reading"*. If the section
    introduction is rewritten as above, the `<term>` markup belongs there, on
    first use, and this sentence just refers to it. **Not flagged:** "it has two
    parts. The first is… The second is…" is *not* an S-28 count-armature to
    delete — her own passed paragraph in this chapter runs *"Two relationships
    describe how the motor behaves. The first is that the torque… The second is
    that a spinning motor also generates a voltage."* Specimen beats rule here.

- [MINOR] `source/ch-motors.ptx:2291` (caption, first sentence) — [S-26]

    draft:  "The two parts of the optical incremental sensor, and what comes out of it."
    hers:   "The two parts of the optical incremental sensor, and the pulse train they produce."

    because: same move as ~~"Start with the one you have met before."~~ →
    **"Recall the UART, which is another communication protocol that uses 2 wires
    only."** Name the referent. (Caption noun-phrase style is correct and stays —
    L-12 exempts captions.)

- [MINOR] `source/ch-motors.ptx:2298–2299` (caption, last sentence) — [S-13 shape]

    draft:  "The wheel in your kit has slots all the way around its rim, and counting them is the first thing we'll do in class."
    hers:   "The wheel in your kit has slots cut all the way around its rim, and in class we'll start by counting how many there are."

    because: her rewrite of the Day 9x opening puts the class as the subject of
    the doing — ~~"In the first twelve minutes we wire a display…"~~ → **"We'll
    start by wiring the display to two of the Nucleo's pins…"** A gerund as
    subject ("counting them is the first thing we'll do") reads as a lesson plan
    describing itself; "in class we'll start by counting" is the same fact as
    something we do.

- [MINOR] `source/ch-motors.ptx:2261` — [S-12, mechanical]

    draft:  "…the speed of the shaft in revolutions per minute."
    hers:   "…the speed of the shaft in revolutions per minute (rpm)."

    because: the abbreviation is used bare four times immediately before this
    section (`fig-encoder-wheel`, `fig-photointerrupter-video`, both Day 11x
    slides) and will be used throughout Day 12's derivation, and it is never tied
    to its expansion anywhere in the chapter. This is the only mechanical
    expansion gap in the passage.

### Sweeps

- **Unit openings checked: 2** (section `<introduction>` 2252, subsection
  `subsec-speed-sensor` 2267) — plus the figure caption at 2291, checked as a
  third opening. **Failing on failure 1 (opening on what is absent): none.**
  Nothing in the passage states what the day does *not* involve either — the Day
  11x rule 3 is clean. The section opening is flagged above for compression and
  reuse, not for opening on an absence: her own Day 11x introduction also opens
  on a recap and reaches the goal in sentence three, so "goal first" is not the
  finding.
- **Slide titles: 0** — the passage is a pre-class reading and carries no
  `<slide>`. The nearest deck text is `sl-day11x-next` and
  `sl-day11x-scope-video`, both hers and both out of scope; the check that
  matters here is that the prose does not sound like a different writer from
  them, and after the rewrites above it does not.
- **Weekday or course-period as grammatical actor: 0** (S-20). Occurrences swept:
  "On Wednesday we got…" (adverbial), "at the end of class we looked" (adverbial),
  "in class" ×2 (adverbial), "In this reading we'll work out" (hers — Day 10:
  *"This reading has two jobs"*), "The same requirement is written into Lab 6"
  (Lab 6 is not commanding anyone — L-13 clean, though the sentence is rewritten
  above for vagueness).
- **"N, and it is the one that…" armature: 1** (S-21) — line 2305, *"there is one
  thing about the output that has to be right before any of this works: it needs
  a pull-up resistor"*.
- **"we" in class-work sentences: 5 of 5.** "we got the motor turning", "we looked
  at the sensor", "we'll work out", "we'll do in class", "We'll wire that
  resistor". "your kit", "your motor" are used only for the student's own
  hardware, which is S-13-correct.
- **Acronyms first-used without expansion: rpm** (the abbreviation is never
  introduced; "revolutions per minute" at 2261 is spelled out but not tied to it).
  Checked chapter-wide and correctly handled: PWM (line 11), back-EMF (65), ADC,
  AF, LED (2272, deliberate), phototransistor (2273, deliberate), TB6612FNG,
  STM32C031C6. No others appear in the passage.
- **Design scaffolding in student-facing text: none.** No `Part N`, no minute
  counts, no "the reading" used as a scheduling noun, no "a program you are
  given". Grepped the passage for `Part [0-9]` and for minute counts: zero hits.
- **L-15 personified hardware: 1** — "one arm of the U **holds** an LED… the other
  **holds** a phototransistor" (2272–2273). No "sits", no "lives", no register
  with hands anywhere in the passage. ("The LED shines", "a slot comes around",
  "the light is blocked" are physical descriptions and stay.)
- **L-16 fragment opening a paragraph: 0.** All four paragraphs open on a
  subject-verb clause. The caption's opening noun phrase is exempt (L-12 excludes
  captions), and is the same shape as her own *"The narrowest pulse this program
  can ask for."*

### Is the figure caption a book caption?

**Yes.** Four sentences, self-contained, both parts named, the mechanism stated
and the consequence drawn — the same shape and length as her
`fig-tim14-block-full` caption, which she left at five sentences after her pass.
It would survive being read on its own by someone who skipped the prose, which is
the B-7 test. Only the two sentence-level edits above.

One thing checked and deliberately **not** reported: the caption restates the two
body paragraphs almost clause for clause. That is her practice, not a defect —
`fig-tim14-block-full`'s caption restates its prose paragraph the same way, and
she left it. The one repetition that *is* worth attention is the proportionality
claim, which after this section appears four times in about 250 words of running
text (the Day 11x video caption, `sl-day11x-next`, the section introduction, and
this caption). Counting how often an idea appears is `expert-cognitive-load`'s
call, not mine; my rewrite of the introduction leaves it at three, all of them in
her wording.

### Already written — reuse instead of invent

- **Section introduction, the sensor description** (2255–2258) — she already wrote
  it: `sl-day11x-next`, in this file — *"We'll use an **optical incremental
  sensor**: a slotted wheel on the shaft, and a photointerrupter whose beam is
  interrupted once per slot, turning rotation into a train of pulses."* The draft
  paraphrases it into an appositive and drops the term.
- **"the faster the shaft turns the faster the pulses arrive"** (2259–2260) — she
  already wrote it, twice: `sl-day11x-next` — *"The rate those pulses arrive at is
  proportional to how fast the shaft is turning"* — and `fig-photointerrupter-video`
  — *"the rate the pulses arrive at is proportional to the speed of the shaft."*
- **"one arm of the U holds an LED and the other holds a phototransistor"**
  (2272–2274) — she already wrote it: `assets/ClassSlidesOLD/Day12-Motors(3).pptx`
  slide 5, speaker note — *"It's the U-shaped object that's wrapped around the
  slotted wheel. It has an LED on one side and a photosensor on the other side."*
- **"In this reading we'll work out how to turn that rate into a number"**
  (2260–2261) — her Day 12 slide 5 note says where it lands: *"You'll figure out
  how to capture those pulses with the microcontroller and count them in Lab 6 and
  how to convert those counts to the rpm of the motor"*, and
  `sl-day11x-scope-video` says it for class: *"we'll count them, turn them into
  rpm, and put the number on the seven-segment display."* The reading's goal
  sentence should end where hers does, on the display.
- **The sensor is already on their motor** — dropped by this draft, and her Day 11x
  note is emphatic about it: *"Her slide 18's note is the fact that matters: the
  sensor is already on their motor. Say it explicitly or they will not look."*
  A pre-class reading is the right place for it; restored in rewrite 1.
- **The pull-up** (2306–2308) — her Day 12 slide 6 note: *"connect a ~10K pullup
  resistor between it and the power rail"*, and the withheld mechanism is her next
  clause, *"since the phototransistor doesn't make any current"* — which is
  correctly held back for the in-class predict-then-explain. The reading's
  "around 10 kΩ" matches her number; "the supply" should be "the supply rail",
  which is her noun.

### For Petra, not for me

- **What supply does the photointerrupter run from, and what does the pull-up tie
  to?** Your Day 12 slide 6 says *"The photointerrupter needs a 5V voltage
  supply"* and the pull-up goes *"between it and the power rail"*. The reading
  says only "power" and "the supply", and this chapter has already established two
  rails (5 V from the regulator for the motor, 3.3 V from the Nucleo for logic),
  so naming the rail is your usual habit (S-12) — but naming it 5 V here raises a
  5 V pull-up on a line that goes to a 3.3 V GPIO in Lab 6, which your slide 6
  note handles by keeping the signal wire off the Nucleo on Day 12 and using the
  internal pull-up later. My rewrite says "the supply rail" and stops there. Which
  way do you want the reading to put it?
- **Does the reading state the slot count (20), or does class?** The caption
  currently defers it — "in class we'll start by counting how many" — but the
  note at the end of this file records that Lab 6 p.5 has students derive
  RPM = 60 × PPS / 20 *"in the reading quiz"*, and Day 11x has no reading. If the
  derivation is to live in this section, the number has to be in it. That is a
  scope call, not a voice one.
- The section introduction promises *"we'll work out how to turn that rate into a
  number"*, and `subsec-speed-sensor` is currently the section's only subsection.
  Presumably the derivation subsection is still to be written; noted so the
  promise is not left unpaid.
