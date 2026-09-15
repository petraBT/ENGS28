# Voice sweep — `source/ch-switches.ptx` (Ch. 2, Days 3 / 3x / 4)

Prompt 3, session 2. Specimens read in order: `plans/day10-voice-reference.diff`,
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`. Register
calibrated against `source/ch-power.ptx` §`sec-power-day17x` (a measured 1/10
chapter). `check_rules.py` and `check_deck.py` are both green on this chapter, so
nothing below is lintable.

**Verdict: BLOCKER.**

Three of the chapter's four teaching units open with no statement of what we are
doing, and two of them have no `<introduction>` element at all — Day 3 opens on
"Share your `blinkyCNT.c` … within your table group", Day 3x on "Load your
`toggleLED.c` (or `button.c` if your homework is not finished)", Day 4 on "Set up
your Nucleo …". The chapter itself opens on a contrastive hook rather than a
goal. On top of that, first-person plural is effectively absent: **9 `we` tokens
against 47 `you`**, and **zero occurrences of `we'll` in the entire 2100 lines**.
Both are systemic, both are the "you are not speaking in my voice" case.

The chapter is not badly written. Its problem is that it reads as a competent
technical manual addressed to a solitary reader, where hers reads as a person
teaching a room. Every finding below is a move in that direction.

---

## 1. The measured gap

| Chapter | `we` | `you` | ratio |
| --- | --- | --- | --- |
| **ch-switches** | **9** | **47** | **0.19** |
| ch-power (1/10 calibration) | 10 | 22 | 0.45 |
| ch-photosensors (1/10) | 25 | 39 | 0.64 |
| ch-servos (1/10) | 72 | 59 | 1.22 |

(Counted over student-facing text: XML comments, `<instructor>` blocks, `<note>`,
`<program>` listings and `instructor="yes"` slides stripped. `we|we'll|we're|we've`
against `you|you'll|you're|you've`.  The worklist's figure for this chapter was
6 against 43, ratio 0.14; the difference is that this count includes `<slide>`
bodies, which is the right scope, since a slide and its prose are one voice.  The
conclusion is the same either way and the calibration chapters were measured with
the identical script.)

All nine `we` tokens, with their line numbers:

| Line | Sentence | Verdict |
| --- | --- | --- |
| 699 | "On the STM32 **we** use the built-in internal pull-up instead" | genuine |
| 714 | (same, in the slide caption) | genuine |
| 891 | "Tomorrow **we** add a capacitor across the button" | genuine but should be "we'll be adding" (her wording, below) |
| 1009 | "For a pushbutton **we** use digital input mode" | genuine |
| 1366 | "**We will** discuss how the `state` variable corresponds to …" | genuine |
| 1544–1546 | "**we** need two states … **We** toggle the LED … **we** ignore further LOW readings" | three tokens, all in one paragraph of `sec-state-machine` |
| 1615 | "**We will** formalize this in the mini-lecture that follows" | genuine |

Six of the nine are in two paragraphs. Nothing in Day 3, Day 3x Part 1, or Day 4
Parts 1/3/4/5 is narrated as something the class does together.

**Where shared-class work is currently impersonal or "you will"** — this is the
list the ratio is made of, and the rewrites are in §3:

- 18–20 "**This chapter covers** how to configure a GPIO pin as an input, read it
  in a polling loop, observe the bounce on an oscilloscope, and eliminate it…"
- 39 "**This chapter introduces** the other direction"
- 135–137 "There are two main strategies for eliminating bounce, **which this
  chapter covers** in detail"
- 512–515 "**Connect** the minus leads to GND, then **connect** channel 1's plus
  lead…"
- 591 (slide) "**You will use** this to measure pulse widths, and tomorrow,
  switch bounce."
- 647 "**You will need** this skill for all future lab reports."
- 657 "**Add** a pushbutton to your breadboard as shown below."
- 745–748 "The specific bit values for each setting **are in** the reference manual"
- 1117–1122 "**Load** your `toggleLED.c` … **Wire** the AD2 with CH1…"
- 1363 "**Day 4 will show you** a cleaner way…"
- 1590–1593 "**Set up** your Nucleo with your `toggleLED.c` code … and **share**
  it with your group."
- 1870–1872 "**Translate** one of your diagrams from Part 3 into working code"
- 2006–2008 "Lab 2 has two design challenges. **Read** the full spec … and
  **start work** on whichever challenge…"

Her pair, for reference (day9x specimen):

> ~~"In the first twelve minutes we wire a display to two of the Nucleo's pins,
> flash a program you are given, and read four characters off it."~~
> → **"We'll start by wiring the display to two of the Nucleo's pins, flash a
> program, and make sure the display lights up."**

"You" is correct and stays wherever the student personally does the thing
(S-13): "your `blinkyCNT.c`", "press the button once", "you get a spurious 0",
"Write the C statements that…" (809 — legitimate, code not prose, and named in
`plans/style-sweep.md` N-2 as surviving her pass).

---

## 2. Sweeps

- **Unit openings checked: 37** (1 chapter + 8 sections + 16 subsections + 12
  activities). **Failing: 12** — the chapter `<introduction>` (14), 
  `sec-switches-concepts` (38), `sec-switches-day3` (**no introduction**),
  `subsec-day3-inputs` (657), `subsec-day3-button-exercises` (903),
  `sec-switches-day3x` (**no introduction**), `sec-state-machine` (1537, no goal
  and no "this is the Day 4 reading" framing), `subsec-sw-debounce` (1501,
  fragment), `sec-switches-day4` (**no introduction**),
  `subsec-day4-code-review` (1590, and it duplicates its own activity),
  `subsec-day4-fsm-code` (1870), `subsec-day4-lab2-intro` (2006).
  Passing and left alone: `subsec-reading-a-pin`, `subsec-floating-pins`,
  `subsec-contact-bounce`, `subsec-day3-ad2`, `sec-gpio-input-config`,
  `sec-bounce`, `subsec-hw-debounce`, `subsec-day3x-bounce`,
  `subsec-day3x-toggle-problem`, `subsec-day4-fsm-lecture`,
  `subsec-day4-fsm-design`, `sec-switch-lab`, and all twelve activity titles.
- **Slide titles: 72** across `day3.json` (34), `day3x.json` (19), `day4.json` (19).
  **Epigrams rather than names: 0.** This is genuinely good and I am not
  inventing a finding here — her own titles are the source for most of them.
  One S-30 failure (a two-clause title its body does not answer): `day3x` #14
  "Polling, and why a naive toggle fails". Four in-slide `<em>` banner lead
  lines act as second titles and repeat the deck title verbatim (775, 889, 1261,
  1390) — the same fault `c564471` removed 19 of.
- **Weekday or course-period as grammatical actor (S-20): 4.**
  1363 ("Day 4 will show you"), `day3x.json` #17 item 1 ("Day 4 shows a cleaner
  way"), 989–990 ("Part 4 of Day 4 replaces … the one Day 9 replaces"), 1986–1988
  ("the same defect Day 9 opens with … Slicing the wait is the Day 4 answer; an
  interrupt is the Day 9 one"). The last two are on projected instructor slides.
  Correct and untouched: "Homework (due Thursday)" (916), "tomorrow" (591, 891,
  922), all section titles.
- **"N, and it is the one that…" armature (S-21/S-28): 3.**
  135–137 ("There are two main strategies … which this chapter covers"),
  1836–1838 ("The catch, and it is the whole point of the second task."),
  981–982 ("Two things worth saying out loud when this one goes up."). Real
  counts whose content follows immediately, which stay: 739 (three registers,
  three named), 1544 (two states), 1606 (two structures).
- **`we` in class-work sentences: 9 of 56** (see §1).
- **Acronyms first-used without expansion — complete:**
  `ODR` (51, never expanded anywhere in the chapter), `MODER` (740, and 766 on a
  slide, never expanded), `GPIO` (19, never expanded in this chapter),
  `V_DD` (777 bare on a slide; 61 in math, never named as the supply voltage),
  `VCC` (1040, a second unexplained name for the same 3.3 V rail),
  `VIH` (1298, bare ASCII on a slide), `R_pu` (1300, 1469, never named as the
  pull-up resistance), `FSM` (expanded at 1539 and 1785, but **not** in
  `fig-state-diagram`'s caption at 1687, and B-9a wants it again in a caption),
  `RC` (bare in the objective at 28; expanded at 139), "Schmitt trigger" (named
  in four captions at 718/726/751/756 and in no prose at all).
  Correctly expanded and left alone: `IDR` (51), `PUPDR` (108), `AD2` (451).
- **Design scaffolding in student-facing text:** `Part N` pointers at 1870 and
  2015; `Part 4 of Day 4` and `Part 2` inside projected instructor blocks (989,
  1840); instructor stage directions inside projected instructor blocks (981–982
  "worth saying out loud when this one goes up", 1846 "ask what happens while the
  finger is still down", 1996–1997 "it is worth drawing both on the board").
  **No minute counts reach student-facing text** — all eleven `≈ N min` budgets
  are in XML comments. Clean.
- **B-11e Arduino comparisons: 0.** Clean.
- **"never say write" banned forms (`write down`, `in writing`, `write a
  sentence`): 0.** Clean, as `plans/style-sweep.md` N-2 measured.
- **L-15 location personification: 1** — 948, "the button **lives** on port B"
  (projected instructor slide). No register, pin or value `sits` anywhere.
- **L-17 voice on the signal path: 0.** Clean.
- **L-13 a document acting on a student: 0.** "Lab 2 has two parts" (2039) is a
  document as the subject of a plain descriptive verb, which L-13 explicitly
  permits.
- **L-16 fragment openers: 5** — 1016–1034 (a lead fragment plus three `<p>`
  each opening on a bare register name), 1501, 535–547 (a four-fragment run),
  1788, 1911.
- **L-5 unspecific hardware: 11 student-facing** "the STM32" (49, 106, 175, 177,
  691, 699, 712, 714, 739, 1043, 1452) plus "STM32C031" for "STM32C031C6" at 791
  and 1008.

---

## 3. Findings

Ordered by severity. "Floor" = I believe the text is hers or carried from her
deck; flag only. "Ours" = editable.

### BLOCKER

#### F1 — The chapter opens on a hook, not on its goal. (S-22) — **ours** (`5e1b8ab`, generated; `f3657e6` only swapped an em dash)

`ch-switches.ptx:14-21`

    draft:  "Reading a pushbutton seems trivial: the pin is either high or low.
             In practice, mechanical switches bounce: the contacts chatter for a
             few milliseconds every time you press or release them, generating
             dozens of spurious transitions.  This chapter covers how to
             configure a GPIO pin as an input, read it in a polling loop,
             observe the bounce on an oscilloscope, and eliminate it in hardware
             or software."

    hers:   "The goal of this chapter is to read a pushbutton switch reliably
             with the STM32C031C6, and to use it to control a program.  A pin
             configured as an input is either HIGH or LOW, so reading a button
             looks like it should take one line of code.  It takes more than
             that, for two reasons.  The first is that a button by itself does
             not produce a 1 or a 0: it only closes a connection from the pin to
             ground, and a pin with nothing driving it reads unpredictably.  The
             second is that mechanical switches bounce: the contacts chatter for
             a few milliseconds every time you press or release them, generating
             dozens of spurious transitions.

             This chapter covers three class days.  We'll configure a GPIO
             (general-purpose input/output) pin as an input with an internal
             pull-up resistor and read it in a polling loop; we'll put an
             oscilloscope on the button and see the bounce for ourselves; and
             then we'll eliminate the bounce twice over, once in hardware with a
             capacitor and once in software with a state machine."

    because: her pass *added* a goal sentence to the head of `ch-i2c` before any
             hook — "The goal of this chapter is to communicate with and control
             a four-digit seven-segment display via our microcontroller."
             `ch-power:6` does the same: "The goal of this chapter is to reduce
             how much power an embedded system consumes when it has nothing to
             do."  Both then say how many class days it covers.  The second
             sentence of the rewrite is her own, from `Day03-Switches.pptx`
             slide 24: "A button by itself does not produce a 1 or a 0 — it
             simply closes a connection from the pin to ground."

#### F2 — Day 3 has no introduction at all; the day opens on a table instruction. (S-22) — **ours**

`ch-switches.ptx:318-323` — insert an `<introduction>` after the `<title>`.

    draft:  <section xml:id="sec-switches-day3">
                <title>Day 3 In-Class: Digital Inputs and the Oscilloscope</title>
                <subsection …><title>Part 1: Code Review (blinkyCNT.c)</title>
                <p>Share your blinkyCNT.c from Lab 1 within your table group. …

    hers:   <introduction>
                <p>
                    Today we'll start reading the outside world with the
                    STM32C031C6, by wiring a pushbutton to one of the Nucleo's
                    pins and reading it in code.  We'll open with a code review
                    of the blinkyCNT.c you wrote for Lab 1.  Then we'll
                    introduce the Analog Discovery 2 (AD2) oscilloscope and use
                    it to look at the LED signals that program produces, because
                    from here on the scope is how we find out what a pin is
                    actually doing.  After that we'll wire the button to D5
                    (PB4), configure the pin as an input with its internal
                    pull-up resistor, and read it.  The last part of the hour is
                    a set of button exercises that are the start of your Lab 2
                    work.
                </p>
            </introduction>

    because: ~~"Nothing was assigned to read before today, and nothing from
             Tuesday is a prerequisite…"~~ → **"Today we'll start communicating
             with the seven-segment display in your kit."**  And `ch-power:36`:
             "Today we'll look at where a microcontroller's power goes, the four
             low-power modes and the one instruction that enters them, and the
             independent watchdog."  A day says what it is for before it says
             what to do.

#### F3 — Day 3x has no introduction, and opens on a homework caveat. (S-22, S-25) — **ours** for the framing; the `button.c` fallback is **hers**, inverted

`ch-switches.ptx:1111-1122`

    draft:  <section xml:id="sec-switches-day3x">
                <title>Day 3X In-Class: Observing and Fixing Bounce</title>
                <subsection …><title>Part 1: Observing and Fixing Bounce</title>
                <p>Load your toggleLED.c (or button.c if your homework is not
                   finished).  Wire the AD2 with CH1 (orange) on D5 (PB4,
                   button) and CH2 (blue) on D13 (PA5, LED), as shown in …

    hers:   <introduction>
                <p>
                    On Tuesday we introduced oscilloscope measurements with the
                    AD2 and Waveforms, and we wired a pushbutton switch to an
                    input pin on the STM32C031C6.  Today we'll go back to the
                    oscilloscope and put it on the button itself, to see what
                    actually happens on the pin in the moment you press it.
                    Then we'll fix what we find, twice: first in hardware, with
                    a capacitor across the switch, and then in software, by
                    detecting the edge rather than the level.
                </p>
            </introduction>
            …
                <p>
                    Load button.c onto your Nucleo, or your own toggleLED.c if
                    you finished the homework.  We'll wire the AD2 with CH1
                    (orange) on D5 (PB4, the button) and CH2 (blue) on D13
                    (PA5, the LED), as in <xref ref="fig-bounce-wiring"/>.
                </p>

    because: the introduction is her own Day 3x slide 2, near-verbatim:
             "On Tuesday: Introduction to oscilloscope measurements with AD2 /
             Waveforms.  How to interface a pushbutton switch to an STM32C0 I/O
             pin.  Today: Back to the oscilloscope.  More about switches and
             inputs."  And the polarity of the fallback is hers too —
             `Day03x-Debounce.pptx` slide 9 is titled "Load button.c onto your
             Nucleo (unless you already finished the toggle…".  Hers offers the
             *simpler* program as the default; the draft inverted it into "if
             your homework is not finished", which is the S-25 register her Day
             10 pass struck ("If yours is not running, take the working copy
             from Canvas before we start" → deleted).  Same fix on the slide,
             `sl-day3x-wire:1237`: "Load your `toggleLED.c` (or `button.c` if the
             homework isn't done)." → "Load `button.c`, or your own
             `toggleLED.c` if you finished the homework."

#### F4 — Day 4 has no introduction, and its opening paragraph is a verbatim second telling of its own activity. (S-22 + "say it once") — **ours**

`ch-switches.ptx:1584-1599`

    draft:  <p>Set up your Nucleo with your toggleLED.c code (with the debounce
               capacitor across the switch) and share it with your group.</p>
            <activity xml:id="act-day4-code-review">
                <introduction><p>Set up your Nucleo with your toggleLED.c
                (debounce capacitor across the switch) and share it with your
                group.</p></introduction>

    hers:   Add, after the section `<title>`:
            <introduction>
                <p>
                    Today we'll turn the button logic you wrote for homework
                    into a <term>state machine</term>, which is the pattern
                    we'll use for the rest of the term whenever a program has to
                    remember where it is.  We'll start with a code review of
                    your toggleLED.c.  Then we'll show that the code you already
                    wrote is a state machine, and write it out as one in C using
                    typedef enum and switch.  After that you'll design and
                    implement state machines of your own, and we'll close by
                    looking at the two Lab 2 design challenges.
                </p>
            </introduction>

            And DELETE the paragraph at 1590-1593.  What is lost: nothing — the
            activity's own <introduction> says it, and that is the copy the deck
            projects (`day4.json` #4 refs `act-day4-code-review`).

    because: she deleted the activity's "Wire the display: + to 3.3 V, − to
             GND…" because the slide immediately before it said exactly that.
             Here the duplication is inside the book, one paragraph apart.

#### F5 — "we'll" is absent from the whole chapter. (S-13, "We is the course") — **ours**

Twelve sentences, all listed in §1. The rewrites, in reading order:

- `18-20` → see F1.
- `39` "This chapter introduces the other direction" → "**we'll** look at the
  other direction" (see F11).
- `135-137` → see F17.
- `512-515` "Connect the minus leads to GND, then connect channel 1's plus lead
  to one LED anode and channel 2's plus lead to a second LED anode, as shown
  below.  Load `blinkySEQ.c` onto your Nucleo."
  → "**We'll** connect both minus leads to GND, then channel 1's plus lead to
  one LED anode and channel 2's plus lead to a second (<xref
  ref="fig-ad2-wiring"/>), with `blinkySEQ.c` running on the Nucleo so that
  there is something to look at."
- `591` (slide `sl-day3-ad2-cursors`) "You will use this to measure pulse
  widths, and tomorrow, switch bounce."
  → "**We'll** use this to measure pulse widths today, and tomorrow **we'll**
  use it to measure how long a switch bounces for."
- `657` "Add a pushbutton to your breadboard as shown below."
  → "**We'll** now add a pushbutton to the breadboard (<xref
  ref="fig-pushbutton-wiring"/>)."  (also fixes B-9's "as shown below")
- `745-748` "The specific bit values for each setting are in the reference
  manual (RM0490)."
  → "The specific bit values for each setting are in the reference manual
  (RM0490), and **we'll** look them up there rather than take them from a
  slide."
- `1117` → see F3.
- `1363` → see F6.
- `1590` → see F4.
- `1870-1872` → see F19.
- `2006-2008` "Lab 2 has two design challenges.  Read the full spec in
  `sec-switch-lab` and start work on whichever challenge you have not already
  completed above."
  → "**We'll** finish by looking at Lab 2's two design challenges.  Read the
  full spec in <xref ref="sec-switch-lab"/>, and start work on whichever of the
  two you have not already built today."

    because: ~~"a library we have not read"~~ → **"a library we'll hand to
             you"**; ~~"this course has been handing you all term"~~ → **"we
             have been handing you all term"**; ~~"In class you build all of
             it"~~ → **"In class we will build all of it"**.  `ch-power` and
             `ch-servos` both run 0.45–1.22 on this ratio; this chapter runs 0.19.

### MAJOR

#### F6 — A weekday does the teaching, on two surfaces. (S-20) — **ours**

`ch-switches.ptx:1362-1368` and `assets/decks/day3x.json` slide 17, item 1.

    draft:  "Day 4 will show you a cleaner way to write this same logic: the
             state machine design pattern."
    draft:  "Day 4 shows a cleaner way to write this logic, the state machine
             design pattern."

    hers:   "On Thursday we'll look at a cleaner way to write this same logic:
             the state machine design pattern."

    because: ~~"Thursday explains why they still have to be sent"~~ → **"we'll
             see on Thursday why they still have to be sent"**; ~~"Thursday is
             where you find out why"~~ → **"we'll find out on Thursday why"**.
             Her own Day 3x slide 25 is titled simply "On Thursday" — the
             adverbial, with no actor.  Keep the `day3x.json` notice title
             "Looking ahead to Day 4"; a day in a heading is structural and fine.

#### F7 — The same, twice, inside projected instructor slides. (S-20, S-23, L-18, L-15) — **ours**

`inst-day3-pause` (`day3.json` #33) and `inst-day4-fsm-code` (`day4.json` #16)
are both `"instructor": true`, which means they are stripped from the student
deck but **projected in class** (`AUTHORING-slides.md:293` — "Every activity's
solution is projected"). Their prose is read off the wall.

`ch-switches.ptx:944-951`

    draft:  "what is new is that the button lives on port B, so GPIOB needs its
             own clock, its input mode and its pull-up."
    hers:   "what is new is that the button is on port B, so GPIOB needs its own
             clock, its input mode and its pull-up."
    because: L-15 — *"the register is not a person.  Don't personify things"*
             (Petra, Day 11x), on a run of "sits"/"lives".

`ch-switches.ptx:981-991`

    draft:  "Two things worth saying out loud when this one goes up.  The pause
             is level-triggered … And the wait is a blocking loop … That is
             exactly the structure Part 4 of Day 4 replaces with a state
             machine, and the one Day 9 replaces with an interrupt."
    hers:   "The pause is level-triggered: it holds while the button is down and
             resumes when it comes up, so no edge detection is needed and no
             bounce is visible, which is why this exercise comes before
             toggleLED.c rather than after it.  The wait is also a blocking
             loop: the program can do nothing else while a finger is on the
             button.  That is exactly the structure we'll replace with a state
             machine on Thursday, and with an interrupt on Day 9."
             Move "worth saying out loud when this one goes up" to the deck
             entry's `presenterNote`.
    because: ~~"Two things to take from a failed transaction.  The first is…
             The second is…"~~ → **"A few notes about a failed transaction: …"**
             (S-28: delete the count-armature, don't repair it), plus S-20 and
             L-18 (*"Don't refer to parts.  Nobody knows what those are."*).

`ch-switches.ptx:1981-1998`

    draft:  "That is the right thing to have happen once: it is the same defect
             Day 9 opens with, and the same fix is not available yet.  Slicing
             the wait is the Day 4 answer; an interrupt is the Day 9 one."
             … "A student who adds three more states for it has found the real
             lesson the hard way, and it is worth drawing both on the board."
    hers:   "It is worth letting that happen once, because it is the same defect
             we open Day 9 with.  Slicing the wait is the answer available today;
             on Day 9 we'll replace the whole arrangement with an interrupt."
             … "The stretch (a second button that resets the counter from either
             state) does not add states.  It adds one event and two
             self-transitions, one on RUN and one on PAUSE, each with the action
             count = 0, and the machine returns to the state it was already in."
             Move "it is worth drawing both on the board" and "a student who adds
             three more states has found the real lesson the hard way" to the
             deck entry's `presenterNote`.
    because: S-20 (three day-actors), S-23 (the book does not explain its own
             teaching strategy — ~~"We do this deliberately: we ran Blinky before
             we explained a single register…"~~ → deleted whole), and the
             semicolon parallelism is the ~~"Today: the two wires.  Thursday: the
             chip at the end of them."~~ register.

`ch-switches.ptx:1835-1847`

    draft:  <p><term>The catch, and it is the whole point of the second
            task.</term>  Three states are only enough if the event really is
            <q>a press</q>. … ask what happens while the finger is still down.</p>
    hers:   <p><term>Why three states are not enough.</term>  Three states only
            work if the event really is <q>a press</q>.  A pin does not give you
            a press; it gives you a level, and turning a level into an edge is
            itself the two-state machine from earlier today.  So a working
            cycling FSM is either six states (each pattern with a <q>button
            still down</q> twin) or three pattern states running alongside the
            Unpressed/Pressed machine that supplies the edge.  A student who
            draws three states and no release arrow has drawn a machine that
            advances the pattern thousands of times per press.</p>
            Move "ask what happens while the finger is still down" to the
            `presenterNote`.
    because: L-9 bans "the entire point"/"the whole point"; S-21 defers the
             subject into a relative clause (~~"One question is left, and it is
             the one that makes the rest work."~~); S-29 — the bold runs eleven
             words and ends in a full stop, so it is a sentence, not a label.
             "from Part 2" → "from earlier today" is L-18.
             `1854`: "<term>How the two differ,</term> which is the question
             worth landing:" → "<term>How the two differ.</term>  In the cycling
             FSM the work happens on the transitions: …".
             The other four bold labels in these blocks — "The 3-state cycling
             FSM.", "The pause/resume counter.", "What the third task finds.",
             "Why the delay is sliced." — are short noun-phrase labels of the
             kind S-29 permits (`<term>Common cathode.</term>`) and stay.

#### F8 — An activity restates, verbatim, the slide two before it — and the prose says it a third time. ("say it once") — **ours**

`ch-switches.ptx:596-604`, against `sl-day3-ad2-wiring:526-533` (`day3.json` #14)
and the prose at `510-515`.

    draft (prose 510):  "Connect the minus leads to GND, then connect channel 1's
                         plus lead to one LED anode and channel 2's plus lead to a
                         second LED anode … Load blinkySEQ.c onto your Nucleo."
    draft (slide 526):  "Load blinkySEQ.c onto your Nucleo. / Connect both minus
                         (white-stripe) leads to GND. / CH1 (+) → one LED anode;
                         CH2 (+) → a second LED anode."
    draft (activity 598): "Load blinkySEQ.c onto your Nucleo.  Wire the AD2: minus
                         (white-stripe) leads to GND, channel 1 plus lead to one
                         LED anode, channel 2 plus lead to a second LED anode."

    hers:   DELETE the activity's <introduction> (598-604) entirely.  The
            activity then opens on its first task, "Run the scope and observe
            both channels."  What is lost: nothing.  The wiring is on the slide
            two before it in the deck, in `fig-ad2-wiring`, and in the prose.
            Keep the prose (rewritten per F5) as the single telling.

    because: exactly her Day 9x deletion — "the activity's 'Wire the display: +
             to 3.3 V, − to GND…' was deleted because the wiring slide
             immediately before it says exactly that."

#### F9 — The same pattern on Day 3x: an activity introduction re-teaching the mechanism three slides after the slide that taught it. ("say it once") — **ours**

`ch-switches.ptx:1181-1190`, against `sl-day3x-hw-fix:1260-1268` (`day3x.json` #7;
the activity is #10).

    draft:  "Hardware debouncing works by adding a small capacitor across the
             switch.  When the switch closes, the capacitor discharges through
             the low-resistance contacts rather than bouncing; when the switch
             opens, the internal pull-up recharges it slowly through its ~40 kΩ
             resistance.  The RC time constant smooths out the bounce spikes.
             See <xref ref="subsec-hw-debounce"/> for the circuit details."

    hers:   "We'll fix the bounce in hardware first, by putting a small capacitor
             across the switch.  <xref ref="subsec-hw-debounce"/> has the circuit
             and the reasoning, and Lab 2's Technical Study is where you size the
             capacitor for a given switch yourself."
             Keep both figures (`fig-cap-codes`, `fig-rc-debounce-circuit`) in
             the introduction — the activity's tasks need them.

    because: same specimen as F8.  The four bullets on `sl-day3x-hw-fix` already
             carry the mechanism, and `sl-day3x-rc-why` carries it a third time
             with the RC arithmetic.

#### F10 — Classroom management, and it is a paraphrase of her own sentence with reassurance added. (S-25) — **ours**, but her wording exists and should be restored

`ch-switches.ptx:902-905`

    draft:  "These exercises are a head start on Lab 2.  You may not finish them
             in class.  That is fine."

    hers:   "These exercises are part of your Lab 2 work.  You will not finish
             them in class, but they are a good head start."

    because: `Day03-Switches.pptx` slide 39, her own parenthetical: "(This is
             part of your Lab 2 work.  You won't quite get this done right now
             but can get a nice headstart.)"  The draft kept the substance and
             added "That is fine.", which is the reassurance-theater move B-12
             and S-25 ban.  Her one permitted form in the whole corpus is "Still
             stuck?  We're here to help!" and nothing after it.

#### F11 — The pre-class section opens on the previous chapter and a litotes, and never names what the three subsections are. (S-22, S-26) — **ours**

`ch-switches.ptx:36-44`

    draft:  "The previous chapter covered GPIO outputs, pins your code drives
             HIGH or LOW.  This chapter introduces the other direction: GPIO
             inputs, where the outside world drives the pin and your code reads
             it.  A pushbutton is the simplest possible input device, but getting
             reliable readings from one turns out to require a bit of thought."

    hers:   "In the previous chapter we drove GPIO (general-purpose
             input/output) pins HIGH and LOW from code.  This reading is about
             the other direction: a GPIO pin configured as an <term>input</term>,
             where something outside the chip sets the voltage on the pin and
             your code reads it.  A pushbutton is the simplest input device
             there is, and getting a reliable reading from one takes three
             things.  The three subsections below are those three: how to read
             the voltage on a pin at all, how to give the pin a defined voltage
             while the button is not pressed, and what the switch's metal
             contacts do in the few milliseconds while they close."

    because: ~~"Start with the one you have met before."~~ → **"Recall the UART,
             which is another communication protocol that uses 2 wires only."**
             (S-26: name the referent).  "turns out to require a bit of thought"
             is the coy register she struck in ~~"The direct approach is not
             short by a little."~~ (deleted).

#### F12 — S-30: a two-clause slide title its own body does not answer. — **ours**

`assets/decks/day3x.json` slide 14, over `sl-day3x-naive-polling:1374-1387`.

    draft title: "Polling, and why a naive toggle fails"
    draft body:  "Polling = reading the pin every iteration of the main loop and
                  acting on it.  Simple, but it has a subtle problem for a
                  toggle." + the code listing.

    hers (title): "Polling an input port"
    hers (body):  <ul>
                    <li>Reading the pin on every pass of the main loop and
                        acting on its value is called <term>polling</term>.  It
                        is the simplest way to respond to an input.</li>
                    <li>A more general way to write it is to separate reading
                        the pin from acting on what was read, which is what
                        <c>buttonPushed</c> does below.</li>
                    <li>Even with a debounced switch, this loop does not do what
                        you want when the action is a toggle.</li>
                  </ul>

    because: S-30 — Petra, circling "Why 3.3 V, and why about 10 kΩ": *"the
             slide doesn't answer that question currently."*  Here the failure is
             *deliberately* withheld for the activity (P-6, P-15), so the right
             one of S-30's two exits is to shorten the headline.  And the title
             it shortens to is hers: `Day03x-Debounce.pptx` slide 21 is
             "'Polling' an input port".  The middle bullet is also hers, from the
             same slide: "More general way: clearly separate reading the pin from
             acting".  The `=` copula and the verbless "Simple, but…" are L-12.
             **The paired prose at 1308-1313 gains the same middle sentence**, so
             the two surfaces still sound like one writer (B-7).

#### F13 — Four `<em>` banner lead lines that repeat their own deck title. (S-29 in spirit; `c564471` removed 19 of these) — **ours**

| Line | Slide | Draft lead line | Deck title |
| --- | --- | --- | --- |
| 775 | `sl-day3-vil-vih` | `<em>Reference: reading a pin (V_IL / V_IH):</em>` | "Reference: Reading a pin (VIL / VIH thresholds)" |
| 889 | `sl-day3-debounce-preview` | `<em>Preview: a debounce capacitor slows this down more:</em>` | "Preview: a debounce capacitor slows this down more" |
| 1261 | `sl-day3x-hw-fix` | `<em>Hardware fix: add a capacitor:</em>` | "Hardware fix: add a capacitor" |
| 1390 | `sl-day3x-toggle-activity` | `<em>Activity: the toggle problem:</em>` | "Activity: The Toggle Problem" |

    hers:   Delete all four.  Where the slide then opens on a bullet, that is
            correct; where it needs a lead, give it a sentence:
            775 → see F14.
            889 → "Tomorrow we'll be adding a capacitor across the button to
                   suppress the bounce.  That makes the button behave better,
                   and it makes this settling problem worse:"
            1261 → "Debouncing means delaying what reaches the pin until the
                    bouncing has stopped.  The hardware way to do that is a
                    capacitor across the switch:"
            1390 → delete; the three bullets are the activity.

    because: S-29 — *"I really don't like those.  Can these become regular
             bullets?"*  A lead line that restates the title carries nothing,
             and a title plus an identical bold line is the "say it twice" fault
             at the level of wording.  The 889 replacement is her own sentence:
             `Day03-Switches.pptx` slide 37's title is "Tomorrow we'll be adding
             a capacitor to our setup to improve the button's behavior.  This
             actually makes things worse when it comes to the time it takes to
             pull the pin up…".  The 1261 replacement is her Day 3x slide 12:
             "Debouncing consists of delaying the input to the pin until the
             bouncing stops."

#### F14 — `sl-day3-vil-vih` drops every expansion the prose gives, and writes the thresholds as ASCII. (S-9, B-9a, N-4) — **ours**

`ch-switches.ptx:774-783`

    draft:  <p><em>Reference: reading a pin (V_IL / V_IH):</em></p>
            <ul>
              <li>Below V_IL (≈ 0.3 × VDD ≈ 1.0 V) reads a reliable 0.</li>
              <li>Above V_IH (≈ 0.7 × VDD ≈ 2.3 V) reads a reliable 1.</li>
              <li>In between is indeterminate: the result is unpredictable.</li>
              <li>Matters for slow-rising signals, noisy lines, or mixed supply
                  voltages.</li>
            </ul>

    hers:   <p>The input circuitry does not compare the pin voltage against a
            single threshold.  There are two:</p>
            <ul>
              <li>Any voltage below <m>V_{IL}</m>, the maximum low input voltage
                  (about <m>0.3 \times V_{DD} \approx 1.0</m> V on a 3.3 V
                  supply), is reliably read as a logic 0.</li>
              <li>Any voltage above <m>V_{IH}</m>, the minimum high input voltage
                  (about <m>0.7 \times V_{DD} \approx 2.3</m> V), is reliably
                  read as a logic 1.</li>
              <li>A voltage between the two is in an indeterminate zone, and what
                  the input data register reads there is unpredictable.</li>
              <li>In ordinary digital circuits the signal is driven firmly to one
                  rail or the other, so you stay well outside that zone.  It
                  matters when a signal rises slowly, for example through a large
                  RC filter, when there is significant noise on the line, or when
                  two devices run on different supply voltages.</li>
            </ul>

    because: the paired prose (57-75) already says all of this in full sentences
             with the expansions and the math markup; the slide is the same
             content stripped down, which is the B-7 "two different people"
             failure.  S-14 lengthens slides and that is correct.  And N-4: she
             asked twice in one session for real typeset math instead of ASCII
             pseudo-math.  **This slide grows — see §5.**

#### F15 — `GPIOx→MODER`: six register references written with a Unicode arrow instead of C's `->`, and her own explanation of the difference is in her deck and not in the book. (L-6, reuse) — **ours**

`ch-switches.ptx:740, 742, 743, 1019, 1028, 1032`

    draft:  <c>GPIOx→MODER</c>, <c>GPIOx→PUPDR</c>, <c>GPIOx→IDR</c>
    hers:   <c>GPIOx-&gt;MODER</c>, <c>GPIOx-&gt;PUPDR</c>, <c>GPIOx-&gt;IDR</c>

    and add, to `act-day3-ref-manual`'s `<introduction>` (787-798), her own note
    from `Day03-Switches.pptx` slide 29, which the chapter never carries:

            "One note on naming before you start.  <c>GPIOx_MODER</c> is the
            register's name in the reference manual.  <c>GPIOx-&gt;MODER</c> is a
            dereferenced pointer to the memory location that register is mapped
            to, so to change <c>GPIOx_MODER</c> we write to
            <c>GPIOx-&gt;MODER</c>, and that is the form we'll always use in
            code."

    because: her wording, verbatim from her slide: "Note: GPIOx_MODER is the name
             of the register.  GPIOx->MODER is a dereferenced pointer to the
             memory location that is mapped to the register.  To change
             GPIOx_MODER we write to GPIOx->MODER.  So in our code we'll always
             use GPIOx->MODER."  Note the "we'll" — it is her sentence, and the
             chapter reinvented the distinction as a typographic accident.

#### F16 — Acronyms unexpanded at first use. (B-9a) — **ours**

Complete, in reading order. Every one of these is a first student-facing
appearance with no expansion.

| Line | Draft | Rewrite |
| --- | --- | --- |
| 19 | "configure a GPIO pin as an input" | "configure a **GPIO (general-purpose input/output)** pin as an input" |
| 28 | "hardware debouncing with an RC filter" | "hardware debouncing with an **RC (resistor-capacitor)** filter" |
| 51 | "Like the ODR, the IDR is a 16-bit register" | "Like the **ODR (Output Data Register)**, which we used in the previous chapter to drive pins, the IDR is a 16-bit register" |
| 740 | "`GPIOx->MODER` (where x is the port letter…) sets the pin mode" | "`GPIOx->MODER`, the **Mode Register** for GPIO port x (where x is the port letter: A, B, C, D or F), sets the pin mode" |
| 777 | "≈ 0.3 × VDD" | "`<m>0.3 \times V_{DD}</m>`", and name it: "`<m>V_{DD}</m>`, the supply voltage, which is 3.3 V on the Nucleo" |
| 1040 | "a pull-up resistor (from the pin to VCC)" | "a **pull-up resistor**, from the pin to the 3.3 V supply" |
| 1298 | "never climbs back above VIH" | "never climbs back above `<m>V_{IH}</m>`" |
| 1300, 1469-1471 | "R_pu (~40 kΩ)" / "the internal pull-up (Rpu ≈ 40 kΩ)" | "`<m>R_{pu}</m>`, the internal pull-up resistance, about 40 kΩ" |
| 1687 | "State diagram for the button-toggle FSM." | "State diagram for the button-toggle **finite state machine (FSM)**." |

    because: `PB9 (SDA)` → **`PB9 (SDA — serial data)`**; "the two wires of an I2C
             bus" → "the two wires of an **I2C (Inter-Integrated Circuit)**
             bus"; and B-9a's own quote — *"Do we ever spell out what PWM
             actually means?"* — in a chapter whose Part 5 was about PWM.  B-9a
             also asks for the expansion again in a caption, "because a caption
             is read out of order", which is why 1687 is on the list.

#### F17 — "Schmitt trigger" appears in four figure captions and in no prose. (B-9a over-naming / S-27) — **ours**, and her own explanation exists

`ch-switches.ptx:718, 726, 751, 756` name the Schmitt trigger; nothing in the
book says what it is or does.

    hers:   Add to `subsec-reading-a-pin`, after the first paragraph (56):
            "The sampling is not done with a plain comparator.  The voltage on
            the pin goes through a <term>Schmitt trigger</term>, a comparator
            with two thresholds instead of one, and its output is what the input
            data register holds.  Configuring the pin as an input is what turns
            the Schmitt trigger on; it also disables the pin's output buffer, and
            it activates whichever of the pull-up and pull-down resistors
            `GPIOx->PUPDR` selects.  From then on the pin's level is sampled into
            the input data register on every AHB clock cycle, and reading
            `GPIOx->IDR` gives you the most recent sample."

    because: her own speaker notes on `Day03-Switches.pptx` slide 27, near
             verbatim: "When the I/O port is programmed as input: the output
             buffer is disabled; the Schmitt trigger input is activated; the
             pull-up and pull-down resistors are activated depending on the value
             in the GPIOx_PUPDR register; the data present on the I/O pin are
             sampled into the input data register every AHB clock cycle; a read
             access to the input data register provides the I/O state."  This
             also supplies the causal middle for the two-threshold paragraph at
             57-67, which currently asserts two thresholds without saying what
             circuit produces them (S-27).

#### F18 — A count-armature and a piece of pedagogical self-justification in the same sentence. (S-28, S-23) — **ours**

`ch-switches.ptx:134-137`

    draft:  "There are two main strategies for eliminating bounce, which this
             chapter covers in detail:"
    hers:   "Bounce is eliminated either in hardware or in software, and we'll
             do both."
    because: ~~"Three rows are all we need"~~ → **"For now we mostly care about
             the rows named *System setup*, *Display setup* and *Dimming
             set*"** — she names them instead of counting them.  And "which this
             chapter covers in detail" is the register of ~~"which is the order
             this course usually takes"~~, deleted.

#### F19 — "Part N" pointed at a student, twice. (L-18) — **ours**

`ch-switches.ptx:1869-1873`

    draft:  "Translate one of your diagrams from Part 3 into working code using
             the typedef enum / switch pattern from the mini-lecture above."
    hers:   "We'll now translate one of the diagrams you just drew into working
             code, using the <c>typedef enum</c> and <c>switch</c> pattern from
             earlier today."

`ch-switches.ptx:2013-2019`

    draft:  "If your FSM from Part 3 already implements this, review the lab spec
             and make sure your solution meets all requirements…"
    hers:   "If the state machine you just implemented already does this, read
             the lab spec and check that your solution meets all of its
             requirements: the state behavior, the debouncing, and clean
             oscilloscope traces."

    because: L-18 — *"Don't refer to parts.  Nobody knows what those are."*  Say
             *when* instead: ~~"the pulse rate you measured in Part 2"~~ → "as it
             did **earlier today**".  Note in passing that "Part 3" is also the
             wrong number in the second one (the FSM is *implemented* in Part 4
             and only *drawn* in Part 3) — the rewrite removes the question.

#### F20 — Her hardware-versus-software comparison is in her deck, the book has a thinner paraphrase of it, and it reaches no slide at all. (P-12 reuse, B-8a, B-12) — **ours**

`ch-switches.ptx:1520-1530`, and `day3x.json` has no entry for it.

    draft:  <insight><title>Hardware vs. software debouncing trade-offs</title>
            <p>Hardware debouncing (RC filter) consumes no CPU cycles but costs a
            component on the board and is hard to adjust after fabrication.
            Software debouncing is free in hardware but ties up the processor
            during the delay and must be tuned to the slowest switch you ever
            use.  In practice, a small capacitor plus a short software delay
            gives the best of both worlds.</p></insight>

    hers:   <insight><title>Hardware or software?</title>
            <p>Hardware debouncing, with an RC filter or a digital timer, does
            not tie up processor cycles.  What it costs is another small
            component on the board and the wiring for it, and it is hard to
            revise for a different switch, so it has to be designed with some
            tolerance.  Software debouncing is flexible: if the switch is
            changed, you edit the code and reflash.  It is also simple, and it
            needs no extra components.  What it costs is processor cycles, spent
            waiting for the bouncing to stop.  In practice a small capacitor
            together with a short software delay covers both sides, and Lab 2's
            Technical Study is where you size the capacitor for a given
            switch.</p></insight>

            And add a projected slide in `subsec-day3x-bounce`, where the choice
            is actually being made, with a `day3x.json` entry after "Why it
            works: the RC filter":

            <slide xml:id="sl-day3x-hw-or-sw">
              <p>Bounce can be fixed in hardware or in software, and each way
              costs something different:</p>
              <ul>
                <li><term>Hardware</term> (an RC filter, or a digital timer):
                does not tie up processor cycles.  It costs another small
                component and its wiring, and it is hard to revise for a
                different switch, so it has to be designed with tolerance.</li>
                <li><term>Software</term> (a delay): flexible, because if the
                switch changes you edit the code and reflash.  Simple, and no
                extra components.  It costs processor cycles, spent waiting for
                the bouncing to stop.</li>
                <li>Today we'll do both: the capacitor now, and edge detection in
                the second half of the hour.</li>
              </ul>
            </slide>

    because: her `Day03x-Debounce.pptx` slide 13, "Hardware or software?", is a
             six-item signed comparison the book compressed to three clauses and
             the deck dropped entirely — the same failure as the UART-vs-I2C
             table that was in her deck the whole time while the draft wrote
             three bullets over a cropped figure.  Two of her points are missing
             from the draft's version: "Hard to revise for a different switch;
             design with tolerance" and "Flexible.  Just edit code and reflash if
             the switch is changed."  And "gives the best of both worlds" is the
             strained-idiom class B-12 lists.  **New slide — see §5.**

#### F21 — Her "Fundamental Issue" slide never reached the book, and it is the missing bridge from Day 3 to Day 4. (P-12 reuse, S-27) — **ours**

`ch-switches.ptx:870-896`. The book covers the pull-up settling time and the
`delay_ms(50)` fix, and stops there. Her `Day03-Switches.pptx` slide 38 carries
the generalization and three other fixes, and the caution that ties the whole
thing to Day 4's state machine.

    hers:   Add after `fig-pullup-settling` / `sl-day3-pullup-settling`:

            "The general problem is that code executes far faster than a pin can
            change state.  The pins on the chip start out at 0, and enabling the
            pull-up does not make the pin read 1 until the pin's stray
            capacitance has charged; the debounce capacitor we'll add tomorrow
            makes that take longer still.  There are several ways to deal with
            it.  The easiest is the one <c>button.c</c> uses: wait 50 ms with
            <c>delay_ms()</c> after initialization, before sampling any pin.  You
            can also loop until the pin reads 1; or start the pin as an output,
            drive it to 1, and then switch it to input and enable the pull-up; or
            fit an external pull-up instead of using the internal one.

            This is not only a start-up problem.  It happens any time the pin is
            pulled down, so your code has to account for it every time it reads a
            button.  The reliable way to do that in ordinary code is a state
            machine that acts only on a transition: make sure the program has
            gone from PRESSED back to UNPRESSED before it takes another action.
            That is the pattern we'll build on Thursday."

    because: her slide 38, near verbatim: "Fundamental Issue: Code executes super
             fast but it takes time for the pins to get to the '1' state. … How
             can we fix it?  Easiest: Wait (delay_ms) 50ms before sampling any
             pin … Others: Loop until the pin reads '1'.  Start as an output, set
             the pin to a '1', then switch modes and enable the pullup.  Use an
             external pullup.  Caution!  This will happen any time the pin is
             pulled down.  Your code needs to account for this!  Best way in
             'regular' code is to use a state machine.  Make sure you transition
             from PRESSED to UNPRESSED before taking another action."
             Nothing in the chapter currently explains *why* Day 4's state
             machine is the answer to a Day 3 problem; this is her explanation.
             **`sl-day3-pullup-settling` grows, or splits — see §5.**

#### F22 — Her pull-up explanation, reinvented and made ornamental. (P-12 reuse, B-12, S-27) — **ours**

`ch-switches.ptx:682-693` and `sl-day3-pushbutton-active-low:706-715`

    draft:  "Without any extra circuitry, an unconnected GPIO pin floats: its
             voltage drifts with electrical noise and reading it produces random
             0s and 1s.  The fix is a pull-up resistor between the pin and 3.3 V.
             When the button is open, the resistor holds the pin firmly HIGH.
             Pressing the button connects the pin to GND and pulls it LOW.  This
             active-low convention (pressed = 0, released = 1) is the standard
             arrangement for buttons.  The STM32 has built-in ~40 kΩ pull-up
             resistors that you enable in software; no external resistor is
             needed."

    hers:   "A button by itself does not produce a 1 or a 0: it only closes a
             connection from the pin to ground.  With nothing else connected the
             pin <term>floats</term>, its voltage drifts with electrical noise,
             and reading it produces random 0s and 1s.  The fix is to pull the
             pin up, so that it reads HIGH while the switch is unpressed.  A
             <term>pull-up resistor</term> between the pin and 3.3 V does that:
             while the button is open the resistor holds the pin at 3.3 V and
             `GPIOB->IDR` reads 1, and pressing the button connects the pin to
             ground, which overrides the pull-up so the pin reads 0.  That is the
             <term>active-low</term> convention, pressed = 0 and released = 1,
             and it is the standard arrangement for buttons.  There are two ways
             to supply the resistor: an external one of about 10 kΩ, or the
             STM32C031C6's own internal pull-up, about 40 kΩ, which we enable in
             software.  We'll use the internal one, so nothing extra goes on the
             breadboard.  If something is actively driving the pin, the pull-up
             has no effect on it."

    because: her `Day03-Switches.pptx` slide 24: "A button by itself does not
             produce a 1 or a 0 — it simply closes a connection from the pin to
             ground. … 'Pull the pin up' so that it is HIGH when the switch is
             unpressed.  Two possibilities: An external resistor (about 10K);
             Enable the pin's internal pullup resistor.  Pressing the button
             connects the pin to ground and pulls the pin LOW."  And slide 30:
             "If an active signal is attached to the pin the pull-up has no
             effect."  The draft dropped her 10 kΩ external figure, dropped the
             no-effect sentence, and added "holds the pin firmly".  Separately,
             at `97-99` in the pre-class section: "the resistor **gently** pulls
             the pin to 3.3 V" and "the **ground wins** and the pin reads logic
             0" → "the resistor pulls the pin to 3.3 V" and "the connection to
             ground **overrides** the pull-up, and the pin reads logic 0" —
             which is the word the feedback at 208-209 already uses.
             **`sl-day3-pushbutton-active-low` grows — see §5.**

#### F23 — L-16: five paragraph or slide openings that are fragments. — **ours**

`ch-switches.ptx:535-547`

    draft:  "Open Scope in Waveforms and press Run.  Four controls you will use
             constantly: Time Base: how much time fits across the screen (100
             ms/div for a full blink cycle; 20 µs/div to reveal switch bounce).
             Range: the vertical scale in volts per division; adjust until the
             waveform fills roughly half the screen height.  Offset: shifts a
             channel up or down; use this to separate overlapping traces.
             Trigger: starts the capture when a signal crosses a threshold,
             useful for catching a single button press."

    hers:   "Open <em>Scope</em> in Waveforms and press <em>Run</em>.  Four
             controls do most of the work.  <term>Time Base</term> sets how much
             time fits across the screen: 100 ms/div shows a full blink cycle,
             and 20 µs/div is where switch bounce becomes visible.
             <term>Range</term> sets the vertical scale in volts per division;
             adjust it until the waveform fills roughly half the screen height.
             <term>Offset</term> shifts one channel up or down, which is how you
             separate two traces that would otherwise overlap.
             <term>Trigger</term> starts the capture when a signal crosses a
             threshold, and that is what lets you catch a single button press."

`ch-switches.ptx:1015-1034`

    draft:  "The register fields involved in input configuration are:"
            "<c>GPIOx→MODER</c>, two bits per pin.  Writing <c>00</c> selects
             input mode. …"
            "<c>GPIOx→PUPDR</c>, two bits per pin.  Writing <c>01</c> enables…"
            "<c>GPIOx→IDR</c>, read-only.  Bit n reflects the current logic
             level on pin n."

    hers:   "Three register fields configure a pin as an input."
            "<c>GPIOx-&gt;MODER</c>, the Mode Register, has two bits per pin, and
             writing <c>00</c> into them selects input mode.  Do not assume
             those bits are already <c>00</c>: pins reset to <c>11</c>, analog
             mode (the reference manual, RM0490 §6.4.1, reset value 0xEBFF FFFF
             for port A and 0xFFFF FFFF for the other ports), so clear both bits
             explicitly for every input pin."
            "<c>GPIOx-&gt;PUPDR</c> also has two bits per pin.  Writing
             <c>01</c> enables the internal pull-up, <c>10</c> enables the
             pull-down, and <c>00</c> leaves the pin floating."
            "<c>GPIOx-&gt;IDR</c> is read-only, and bit <m>n</m> of it reflects
             the current logic level on pin <m>n</m>."

`ch-switches.ptx:1500-1503`

    draft:  "The simplest software debounce: after detecting a press, wait longer
             than the maximum bounce duration before checking again."
    hers:   "The simplest software debounce is to wait, after detecting a press,
             for longer than the switch's maximum bounce duration, and then read
             the pin again to confirm that it is still pressed."

`ch-switches.ptx:1787-1791`

    draft:  "The key advantage over a simple flag variable: the pattern scales
             cleanly when you add more states or more events."
    hers:   "The advantage over a single flag variable is that the pattern keeps
             working as you add more states or more events."

`ch-switches.ptx:1910-1917` (projected instructor slide)

    draft:  "The pause/resume counter as a state machine.  Four states, because
             the two that matter (counting or not) each need a twin that means
             'and the button is still down'; that twin is what makes one physical
             press produce exactly one change."
    hers:   "Here is the pause/resume counter written as a state machine.  It
             needs four states, because the two that matter (counting or not)
             each need a twin that means <q>and the button is still down</q>, and
             that twin is what makes one physical press produce exactly one
             change."

    because: L-16, and Petra's own words on two of these in one Day 11x pass:
             *"not a complete sentence — use only complete sentences"* and
             *"sentence fragment."*  `check_rules.py` cannot see a fragment that
             opens a paragraph, which is why all five survived four rounds.

#### F24 — `sl-day4-why`: `=` used as a copula. (L-12, S-14) — **ours**

`ch-switches.ptx:1771-1778`

    draft:  "<li>A finite state machine = states, events that cause transitions,
             and actions on each transition.  It scales cleanly as you add states
             or events.</li>"
    hers:   "<li>A finite state machine is a set of <term>states</term>, the
             <term>events</term> that cause transitions between them, and the
             <term>actions</term> taken on each transition.  Its advantage over a
             single flag variable is that it keeps working as you add more states
             or more events.</li>"
    because: the paired prose at 1785-1790 says exactly this in sentences; the
             slide is the telegraphic version of it (B-7).  **Grows slightly —
             §5.**

#### F25 — Her FSM sentence, the one that says *why* a state machine, is in her deck and in neither surface. (P-12 reuse, S-27) — **ours**

`ch-switches.ptx:1679-1684` and `sl-day4-fsm-diagram:1739-1747`

    hers:   Add to the prose, after "the `buttonAlreadyPressed` variable *is* the
            state variable":
            "The button can be pressed or unpressed, but it is only when we
            observe a <term>transition</term> that the program needs to do
            anything: update the state, and toggle the LED on the transition from
            unpressed to pressed."
            And as a bullet on `sl-day4-fsm-diagram`:
            "<li>The button can be pressed or unpressed.  It is only when we
            observe a transition that we need to do anything: update the state,
            and toggle the LED going from unpressed to pressed.</li>"
    because: her `Day04-Debounce.pptx` slide 11, verbatim: "The button can be
             pressed or unpressed.  But it is only when we observe a transition
             that we need to do anything: Update the state.  Toggle LED in
             transition from unpressed to pressed."  It is also one of the few
             "we" sentences in her Day 4 material, and it is the sentence that
             makes the two-state diagram inevitable rather than arbitrary.
             **`sl-day4-fsm-diagram` grows — §5.**

### MINOR

#### F26 — L-5: "the STM32" eleven times, and "STM32C031" for "STM32C031C6" twice. — **ours**

`49, 106, 175, 177, 691, 699, 712, 714, 739, 1043, 1452`; `791, 1008`.

    hers:   Name **STM32C031C6** at first use in each section and use "the
            STM32C031C6" thereafter.  (Her own decks write "STM32C0", which is
            also acceptable after the full name has appeared; what is not
            acceptable is the bare family name.)  `791` "the STM32C031 reference
            manual" → "the STM32C031C6's reference manual (RM0490)"; `1008`
            "Every GPIO pin on the STM32C031" → "Every GPIO pin on the
            STM32C031C6".
    because: L-5 — "Specific hardware names.  'STM32C031C6', not 'the target
             MCU'."  `ch-power` names the part in full in its first sentence and
             again in each section.

#### F27 — S-26/S-16: three places that withhold the referent for effect. — **ours**

`ch-switches.ptx:76-81`

    draft:  "Reading a button in code is therefore straightforward in practice,
             as long as the pin voltage is always driven firmly to one rail or
             the other.  The subtleties arise not from the reading itself but
             from what the hardware is doing, or not doing, when the button is
             open."
    hers:   "Reading a button in code is therefore straightforward, as long as
             the pin voltage is always driven firmly to one rail or the other.
             What makes a button awkward is not the reading.  It is that while
             the button is open, nothing is driving the pin at all, and that is
             the subject of the next subsection."
    because: "not X but Y" with the content deferred is the S-21 armature, and
             "or not doing" is the epigrammatic turn of ~~"The direct approach is
             not short by a little."~~

`ch-switches.ptx:1308-1313`

    draft:  "It is the simplest way to respond to an input, but it has a subtle
             problem when the desired action is a toggle."
    hers:   "It is the simplest way to respond to an input.  It stops being
             enough as soon as the action you want is a toggle, because a pin
             gives you a level and a toggle needs an edge; the next activity is
             where you find out what that costs."
    because: S-26 (name the referent) without giving away the discovery the
             activity is for (P-15).  Her own Day 3x slide 24 title says it
             outright: "Often you need to sense both states of the switch."

`ch-switches.ptx:1398-1399` (`sl-day3x-edge-skeleton` lead)

    draft:  "The fix is to detect the leading edge.  Fill in the blanks:"
    hers:   "Often you need to sense both states of the switch, not just its
             current level.  The fix is to detect the leading edge, the moment
             the pin goes LOW, and to remember that you have already acted on
             it.  Fill in the blanks:"
    because: her Day 3x slide 24 title, above.

#### F28 — B-9: "as shown below" twice. — **ours**

`513` "as shown below" → `(<xref ref="fig-ad2-wiring"/>)`;
`657` "as shown below" → `(<xref ref="fig-pushbutton-wiring"/>)`.
(`358`, "compare with the approach below", is inside a slide where the code
listing is immediately below it, and is correct.)

    because: B-9 — "Use `<xref ref="..."/>` rather than 'the figure below'."

#### F29 — `sec-state-machine` is the Day 4 pre-class reading and never says so. (S-22) — **ours**

`ch-switches.ptx:1535-1537`. The XML comment at `1582` records that this is Day
4's reading; the section itself opens as reference material and buries "Before
coming to class, draw the state diagram" in its third paragraph.

    hers:   Add as the section's first paragraph:
            "This is the reading for Day 4.  The goal is for you to arrive able
            to draw a state diagram, because on Thursday we'll turn your own
            button code into a state machine and then design new ones from
            scratch."
    because: S-22, and `ch-i2c`'s reading section after her pass: "This reading
             has two jobs.  The first is to get ready to understand communication
             with the display itself via the backpack chip.  You'll write a
             device driver for the display in class tomorrow and this reading
             will help prepare you for this task."

#### F30 — Her oscilloscope-versus-eye sentence, dropped from the activity that needs it. (P-12 reuse) — **ours**

`ch-switches.ptx:627-635`

    draft:  "…Observe the LED brightness and the waveform on the scope.  Then
             swap to 10 ms ON / 1 ms OFF and flash again.  How does brightness
             change, and why?"
    hers:   "…Observe the LED brightness and the waveform on the scope.  Then
             swap to 10 ms ON / 1 ms OFF and flash again.  The oscilloscope can
             see the LED going on and off even when your eyes cannot.  Discuss at
             your table why the brightness changes, and where that could be
             useful."
    because: her `Day03-Switches.pptx` slide 21, verbatim: "The oscilloscope can
             see the on/off in the LED signal, even when your eyes cannot.
             Discuss at your table why the LED brightness changes.  How could
             this be useful?"  The last question is her forward pointer to PWM
             and the draft dropped it.

#### F31 — Two curly apostrophes, the only two in the file. — **ours**, mechanical

`1237` "isn’t" and `1295` "can’t" → `isn't`, `can't`. (Every other apostrophe in
the file is straight.)

#### F32 — "Day 3X" against the corpus's "Day 3x". — **ours**, mechanical

`895`, `994`, `1112` and the `<title>` at `1112` use "Day 3X"; `CLAUDE.md` and
25 of the 34 corpus-wide instances use lowercase `x` ("Day 11x", "Day 9x", "Day
17x"). Normalize to "Day 3x". Low value on its own; worth doing while the file is
open.

---

## 4. Floor — flagged, not edited

| Where | Text | Evidence |
| --- | --- | --- |
| `1200-1213`, `1275`, `1460`, `2059` | "the debounce capacitor (0.1 µF or 0.15 µF, depending on how your kit was stocked)" and "Kits are stocked with either a 0.1 µF or a 0.15 µF part.  Both work here." | `25a8a0f`, her call. Do not touch the wording or the values. |
| `892`, `1477-1488` | the pinned measurement values: "with a 0.1 µF cap the pin takes ~4 ms", `fig-rc-results` (0.01 µF vs 0.1 µF), `fig-bounce-comparison` (with vs without 0.1 µF), the `.1J63` worked example | `25a8a0f` explicitly pins values that label a specific scope measurement. F13's rewrite of `sl-day3-debounce-preview` keeps "0.1 µF" and "~4 ms" exactly. |
| `1415-1439`, `1621-1672`, `1695-1730`, `1918-1971` | the four instructor solutions and the `typedef enum` / `switch` idiom | `fc63cde`, taken from her own `Day04-Debounce.pptx`. The code is untouched by every finding above; F7 and F23 touch only the surrounding prose. |
| `1295` | "Recall from Phys 14: a capacitor stores charge and can't change its voltage instantly." | Hers, `Day03x-Debounce.pptx` slide 17: "Remember from Phys 14: a capacitor stores electric charge." Only the apostrophe (F31) changes. |
| `333`, `1602` | "Read your partners' code" / "Read each partner's code" | **Not an L-1 violation.** Her own `Day04-Debounce.pptx` slide 6 says "Can you read, understand, and explain your partners' codes?" I nearly flagged this and it is hers. |
| `day3.json` #1–#3, `day4.json` #1 | the late-policy, honor-code, AI-use and lab/quiz notices | All four track her `Day03-Switches.pptx` slides 5–7 and `Day04-Debounce.pptx` slides 3–4. The one thing already correctly dropped from her originals is the Williams citation in the Quiz 1 permitted-sources list — keep it dropped (`CLAUDE.md`). |
| `day3x.json` #1 | "Yesterday: the AD2 oscilloscope… / Today: put a scope on the button…" | The colon-fragment review format is hers: `Day03x-Debounce.pptx` slide 2, "On Tuesday: … Today: …". Do not convert these to sentences. |
| `647` | "You will need this skill for all future lab reports." | Close to her "(You'll need this for labs going forward)", `Day03-Switches.pptx` slide 20. Leave. |
| `1943-1944` | the sliced-delay comment in the Day 4 solution listing | Inside a `<program>` block in a `fc63cde` solution. Leave. |

No unwrapped long line inside an otherwise-wrapped paragraph, and no typo of the
kind that signals a pasted review comment, appears anywhere in this file. Every
long line is a slide bullet or a caption, which this repo writes unwrapped by
convention. The chapter's prose is all from `5e1b8ab` (the generated import) or
from the four sweep commits above, so the editable surface is large and the floor
is narrow — the opposite of session 3's two chapters, and consistent with there
being no `reviews/day3*-petra.md` and no Day 3/3x/4 lines in
`reviews/slide-comments-archive.jsonl`.

---

## 5. Slides whose bodies grow — for the fit sweep (1600×900)

| Slide | Deck entry | Why it grows | Risk |
| --- | --- | --- | --- |
| `sl-day3-vil-vih` | `day3` #26 | F14: four bullets gain expansions and `<m>` math; the banner lead becomes a sentence | **high** — was four short bullets, becomes four long ones. Likely wants splitting, or the fourth bullet moved to the `<caption>` (lever 3). |
| `sl-day3-pushbutton-active-low` | `day3` #20 | F22: gains "a button by itself does not produce a 1 or a 0", the 10 kΩ external option, and the no-effect sentence | **high** — already five bullets. Merge bullets 1 and 2 (lever 1) before anything else. |
| `sl-day3-pullup-settling` | `day3` #29 | F21: gains the generalization and the three alternative fixes | **high** — probably two slides: the measurement, then "what to do about it". Both halves teach, so lever 6 applies. |
| `sl-day3x-hw-fix` | `day3x` #7 | F13: the banner lead becomes her "Debouncing consists of delaying the input to the pin until the bouncing stops" sentence | low |
| `sl-day3x-naive-polling` | `day3x` #14 | F12: two bullets become three full sentences, title shortens | medium — the code listing is fixed; check the bullets fit above it. |
| `sl-day3x-hw-or-sw` | **new**, `day3x`, after #12 | F20: her hardware-or-software comparison, which currently reaches no slide | **new slide — fit from scratch.** Three bullets, two of them long. |
| `sl-day3-debounce-preview` | `day3` #30 | F13: her longer wording replaces the banner lead | low |
| `sl-day4-fsm-diagram` | `day4` #8 | F25: gains her transition sentence as a fifth bullet | medium — it is a `ref` to `fig-state-diagram`, so the body competes with the image. If it reads small, `stack="yes"` (N-4). |
| `sl-day4-why` | `day4` #10 | F24: bullet 4 becomes two sentences | low |
| `sl-day3-code-review` | `day3` #7 | F28 has no effect here; listed only because it holds an inline `<program>` and any prose change above it is tight | low |
| `inst-day3-pause` | `day3` #33 | F7: prose net **shrinks** (a sentence deleted, cues moved to `presenterNote`) | shrinks |
| `inst-day4-fsm-diagrams` | `day4` #13 | F7: net shrinks | shrinks |
| `inst-day4-fsm-code` | `day4` #16 | F7, F23: net shrinks | shrinks |

Three deck JSONs need edits, not only the `.ptx`: `day3x.json` (slide 14 title,
slide 17 item 1, one new entry) and nothing in `day3.json` or `day4.json` beyond
the two new `presenterNote` fields F7 asks for.

---

## 6. Adjacent, and it will cost her a review round (not voice — N-4)

Not in scope for this pass, reported because N-4 says session 3 took 31 deck
comments and almost none were about register.

**Seven slides in this chapter have no body at all — their only text is a
`<caption>`:** `sl-day3-portbit` (158 chars), `sl-day3-switch-portbit` (201),
`sl-day3-input-config` (56), `sl-day3x-bounce-look` (200), `sl-day3x-cap-codes`
(167), `sl-day3x-cap-place` (136), `sl-day3x-with-without` (122). A slide
`<caption>` renders small, grey and centered, and she has commented on this three
separate times ("a slide caption is not for content"). Five of the seven are
carrying real teaching content in the caption — `sl-day3-switch-portbit`'s 201
characters are the entire explanation of how a switch reaches the input data
register. The fix on each is body text plus `stack="yes"`, which also answers
both "this is ginormous" and "why is this so small". Recommend handling this in
the same pass, since every one of those slides is touched by a §5 fit check
anyway.

---

## 7. For Petra, not for me

1. **`inst-day3-pause`, `inst-day4-fsm-diagrams` and `inst-day4-fsm-code` are
   projected** (`"instructor": true` shows them in the instructor deck; they are
   stripped only from the student build). So sentences written for the instructor
   — "Two things worth saying out loud when this one goes up", "ask what happens
   while the finger is still down", "it is worth drawing both on the board" — are
   on the wall in front of the room. F7 moves them to `presenterNote`. **Is that
   what you want, or would you rather these blocks stayed as written and the
   deck refs pointed at the `<program>` listings alone?** The specimens do not
   settle it, because no projected `<instructor>` block appears in any of the
   three.
2. **"Digital timer (Engs 31 solution)"** is the third debouncing option on your
   `Day03x-Debounce.pptx` slide 13. F20 restores your comparison but I left the
   ENGS 31 cross-reference out, because naming another course is a classroom fact
   I cannot verify (B-11c). **Should it go back in?**
3. **`sec-gpio-input-config` (1005) and `sec-bounce` (1445) and
   `sec-state-machine` (1535) sit in the middle of the teaching flow**, between
   Day 3 and Day 3x and between Day 3x and Day 4. B-10 puts reference material at
   the end of the chapter. `sec-state-machine` is deliberately mid-chapter
   because it is Day 4's pre-class reading, but the other two read as reference.
   Structural, not voice, so I have not proposed a move — **do you want them
   collected into a `Reference:` section at the end, as in `ch-i2c`?**
4. **`subsec-day3-button-exercises` has no Day 3 wrap-up.** `ch-i2c`'s Day 9x
   ends with "Leave the display wired.  On Thursday we'll…", and `day3x.json` has
   a "Looking ahead to Day 4" notice, but `day3.json` ends on the pause/resume
   solution with nothing looking forward. Your old Day 3 deck ended on "Homework
   for Thursday" (slide 40). **Worth adding a closing paragraph, or is the
   homework task at 914-924 enough?**
