# Voice sweep: `source/ch-io-datasheets.ptx` (Chapter 4, Day 5x)

Prompt 3, session 2. Full-chapter pass, 550 lines, prose + all six `<slide>`
blocks + the two deck-ref'd `<instructor>` blocks + `assets/decks/day5x.json`
titles. Specimens read in order: `plans/day10-voice-reference.diff`,
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`. Register
calibrated against `source/ch-power.ptx` §§ intro–Part 2 (1/10 chapter).

**Verdict: BLOCKER.** Systemic, not local: student-facing first-person-plural is
**0**, the chapter is the only one of sixteen with no `<introduction>` and no
`<objectives>`, its first student-facing sentence opens on what a
microcontroller *cannot* do, and no acronym in it is ever expanded. This is the
"you are not speaking in my voice" shape, and it is fixable in five edits.

---

## 1. The measured gap

| | this chapter | 1/10 calibration chapters |
| --- | --- | --- |
| first-person-plural tokens (`we`/`us`/`our`/`we'll`), whole file | **3** (lines 377, 460, 464) | — |
| ... of those, in **student-facing** text | **0** | — |
| `you`/`your`/`you'll` tokens, student-facing | **41** | — |
| **student-facing we/you ratio** | **0.00** | **0.41 – 0.94** |

All three first-person tokens in the file are inside `<instructor>` blocks
("*our* board", "*our* 3.3 V ADC", "*our* 12-bit ADC"). The worklist's recorded
0.14 counted those three against a narrower `you` set; the number that matters
is that **a student reading this chapter never once encounters the course
speaking as "we."** ch-power, one Wednesday x-hour like this one, says "we'll"
four times before its first subsection ends.

### Where the shared-class work is currently narrated impersonally or as "you"

Seven sites, every one of them describing something the *class* does, not
something a student personally does (S-13, and the "'We' is the course"
calibration):

| Line | As written | What is actually happening |
| --- | --- | --- |
| 8–11 | *(nothing — no chapter introduction exists)* | the course states the chapter's goal |
| 11–15 | *(nothing — no section introduction exists)* | the course states the day's plan |
| 18 | "A microcontroller on its own senses nothing and drives nothing." | we open the day |
| 31 | "Getting a peripheral to work requires answers to many questions..." | we motivate the datasheet |
| 47 | "Once you know where to look, you can navigate any datasheet quickly." | we characterize the skill |
| 125 | "**Your table will be assigned** one component." | **we** assign the components |
| 128 | "Each table **will share their answers** with the class at the end." | **we** hear from every table |
| 522 | "Each table presents their slide in 30 seconds or less." | **we** run the share-out |
| 532 | "**You will use** several of these parts later in the course." | **we** come back to them |

Applying findings 1, 2, 5, 9 and 11 below takes the student-facing ratio to
roughly 20 / 40 ≈ 0.5, inside the calibration band, without a single "we" being
bolted onto a sentence that does not want one.

The register diagnosis in one pair. Her hand pass, Day 9x:

> ~~"Nothing was assigned to read before today, and nothing from Tuesday is a
> prerequisite. No EXTI, no NVIC, no ISR..."~~
> → **"Today we'll start communicating with the seven-segment display in your kit."**

This chapter's first student-facing sentence is
*"A microcontroller on its own senses nothing and drives nothing"* — the same
move, one clause shorter. Nothing in the chapter ever says *today we'll*.

---

## 2. Findings, by severity

Ownership column: **OURS** = editable; **HERS** = flag only, wording is floor.

---

### F1 — BLOCKER. The chapter has no introduction and no objectives. [B-1, S-22]

**Line 8–11.** OURS (present since `5e1b8ab`, the bulk import; never revised).

Evidence it is ours: `git log -L 17,50` on this file returns only `5e1b8ab`,
`e43b9d2` (image repoint) and `f3657e6` (em-dash sweep). Nothing in
`reviews/`, nothing in the comment archive, no Day 5x entry anywhere.

`ch-io-datasheets.ptx` is **the only one of the sixteen chapter files with zero
chapter `<introduction>` and zero `<objectives>`** (checked across all sixteen).
The file goes `<title>` → `<section>` with nothing between them. S-22's specimen
is precisely her *adding* a goal sentence to the head of a chapter that already
had an opening:

> **+ "The goal of this chapter is to communicate with and control a four-digit
> seven-segment display via our microcontroller."** — inserted above the draft's
> own first line, `plans/day10-voice-reference.diff:9`

draft: *(nothing)*

hers:

```xml
<chapter xml:id="ch-io-datasheets" xmlns:xi="http://www.w3.org/2001/XInclude">
    <title>Reading Component Datasheets</title>

    <introduction>
        <p>
            The goal of this chapter is to be able to pick up the datasheet of a
            component we have never used before and find in it everything we need
            in order to wire that component to the STM32C031C6 and write code
            that reads it or drives it.  The STM32C031C6 measures nothing and
            moves nothing on its own: every useful embedded system connects it to
            the physical world through input and output components, and the
            datasheet is the only place that says what a given component needs
            and what it gives back.  Microcontrollers have datasheets too, and we
            have used one already: the USART registers we programmed on Day 5
            came out of the STM32C031C6's reference manual and datasheet.  In
            this chapter we turn that same habit on the sensors and actuators
            around the chip.
        </p>
        <p>
            This chapter covers one class day, a Wednesday x-hour, and it has no
            pre-class reading.  In class each table takes one real component and
            its datasheet, works through a worksheet on it, and presents what it
            found to the rest of us.  Between the five components we will see an
            analog voltage output, a part whose output is a signed quantity, and
            three parts that are read over a digital protocol.
        </p>
        <objectives>
            <ul>
                <li>Name the standard sections of a component datasheet, and say which question each one answers.</li>
                <li>Find a part's supply voltage range and its absolute maximum ratings, and say both whether 3.3 V is safe and whether 5 V would destroy it.</li>
                <li>Say what interface a component uses, and list every pin needed for a minimal hookup.</li>
                <li>For a part with an analog output, write the transfer function that converts its output voltage into a physical quantity; for an I2C part, list the addresses it can take.</li>
                <li>Decide from a part's current or power numbers whether it can be powered from a GPIO pin.</li>
                <li>Name one thing that has to be configured or calculated in code before a component can be read.</li>
            </ul>
        </objectives>
    </introduction>
```

because: the goal-sentence insertion at `day10-voice-reference.diff:9`; the
"we have been handing you" calibration; and her own deck slide 8, which is where
the USART sentence comes from — see §4. "a Wednesday x-hour" and "no pre-class
reading" follow ch-power's intro, which words the same two facts the same way.

---

### F2 — BLOCKER. The day opens on what a microcontroller cannot do, and the section has no opening at all. [S-22, S-13, L-5, B-9]

**Lines 11–21.** OURS (`5e1b8ab`; not in her old deck — her slide 3 is titled
"Inputs and Outputs to an Embedded System" and her slide 4 note opens
"Inputs measure things in the physical world").

draft:

```xml
    <section xml:id="sec-datasheets-inclass">
        <title>In-Class: Datasheet Scavenger Hunt</title>

        <subsection xml:id="subsec-datasheets-intro">
            <title>Embedded Systems Need Peripherals</title>
            <p>
                A microcontroller on its own senses nothing and drives nothing.
                Every useful embedded system connects the MCU to the physical
                world through <em>input</em> and <em>output</em> components:
            </p>
```

hers:

```xml
    <section xml:id="sec-datasheets-inclass">
        <title>In-Class: Datasheet Scavenger Hunt</title>
        <introduction>
            <p>
                Today we'll learn to read a component's datasheet.  Each table
                gets one real component and its datasheet, and we'll work through
                a worksheet that asks of it the questions we would have to answer
                before we could wire that component up and program it.  At the end
                of the hour every table presents what it found, so between us
                we will have read five datasheets rather than one.
            </p>
        </introduction>

        <subsection xml:id="subsec-datasheets-intro">
            <title>Embedded Systems Need Peripherals</title>
            <p>
                An embedded system is a microcontroller together with the
                components it reads and drives
                (<xref ref="fig-mcu-io-block"/>).  The STM32C031C6 measures
                nothing and moves nothing on its own.  It reads
                <em>input</em> components, which turn something in the physical
                world into a signal the chip can read, and it drives
                <em>output</em> components, which change something in the
                physical world.
            </p>
```

because: the Day 9x pair quoted in §1 — a list of what is absent is not an
opening, and the fix is a plain sentence saying what the day is. Three further
moves in that hunk, each with its own specimen: "the MCU" → "the STM32C031C6"
(L-5, and her own deck slide 7 glosses "MCU = Microcontroller unit (i.e., our
STM32C031C6)"); the dangling colon into a figure becomes an `<xref>` (B-9, and
`day10-voice-reference.diff:638`, "The 34 LEDs are wired up in a grid which you
can see in `<xref ref="fig-four-digit-wiring"/>`"); and the fact that the chip
does nothing alone is *kept, at full strength*, moved out of first position
(S-16 — do not weaken the engineering to fix the register).

---

### F3 — BLOCKER (systemic). No acronym in this chapter is expanded at first use. [B-9a, S-12]

Complete list. Every first student-facing occurrence, checked one by one; the
chapter expands **none** of them. OURS throughout (`5e1b8ab`, `ffae805`).

| Line | First use, as written | hers |
| --- | --- | --- |
| 19, 20, 38 + slides 90–92 | "the MCU" | "the STM32C031C6" in prose; "microcontroller" where the generic is meant. Her deck slide 7: "MCU = Microcontroller unit (i.e., our STM32C031C6)" |
| 37 | "give you numbers over I²C" | "give you numbers over **I2C (Inter-Integrated Circuit)**" |
| 38 | "does your MCU's **ADC** must interpret" | "that **the analog-to-digital converter (ADC)** built into the STM32C031C6 must interpret" |
| 178 | "What supply voltage range (**VDD or VCC**) does the part accept?" | "What supply voltage range does the part accept?  (The supply pin is labeled **VDD** or **VCC**, depending on the manufacturer.)" |
| 209 | "*SPI*," | "*SPI (Serial Peripheral Interface)*," |
| 210 | "*UART/serial*," | "*UART (universal asynchronous receiver/transmitter), or plain serial*," |
| 211 | "*PWM input*," | "*PWM (pulse width modulation) input*," |

because: the Day 9x specimen does this three times in one short pass —
`PB9 (SDA)` → **`PB9 (SDA - serial data)`**, "the two wires of an I2C bus" →
"the two wires of an **I2C (Inter-Integrated Circuit)** bus", "the header" →
"the **Arduino** header". And B-9a is quoting her directly on PWM: *"Do we ever
spell out what PWM actually means (pulse width modulation)?"* — asked in a
chapter whose Part 5 was *about* PWM. Here it is worse: **PWM is not taught
until Day 11** and **SPI is never taught at all**, so on Day 5x both are bare
initialisms on a projected worksheet slide. UART was expanded in `ch-uart`
(Day 5, the previous class), so that one is the weakest of the seven; expand it
anyway, because `task-passport-b` projects and a slide is read out of order,
which is B-9a's own stated reason for re-expanding in captions.

---

### F4 — MAJOR. "you can navigate any datasheet quickly" is the opposite of what she wrote. [S-19, B-12, P-12 reuse]

**Lines 44–50.** Mixed: **one clause is HERS**, the rest OURS.

draft:

> "Datasheets can be intimidating: they are written for engineers who already
> know the jargon, and they pack enormous amounts of information into dense
> tables.  But they follow a predictable structure.  Once you know where to
> look, you can navigate any datasheet quickly."

Her deck, `Day05X-InputOutputDatasheets.pptx` slide 9, four bullets:

> "Datasheets are packed densely with information. / **Datasheets can be
> intimidating.** / **Reading datasheets requires patience.** / **Datasheets
> vary between component types and manufacturers.**"

"Datasheets can be intimidating" is hers verbatim — floor, and the rewrite
below keeps it untouched. The rest is ours, and it drops both of her hedges and
replaces them with a claim she contradicts twice.

hers:

> "Datasheets can be intimidating: they are written for engineers who already
> know the jargon, and they pack enormous amounts of information into dense
> tables.  They also vary between component types and between manufacturers.
> Reading one takes patience.  What makes it manageable is that most datasheets
> are organized along the same lines, so once we know which section answers
> which question, we can find our way around a datasheet we have never opened
> before."

because: this is `S-19` exactly as her Day 8 pass states it — ~~"Both
`TIM14_IRQn` and the handler name ... come from one table in the reference
manual"~~ → **"...come from different places"**, *because they do*. It is also
the `B-12` reassurance pattern: telling the student the task will be quick.
Longer than what it replaces, which is the correct direction (the "plain and
explanatory, not terse" calibration).

---

### F5 — MAJOR. "Every Datasheet Has the Same Structure" / "The first page always gives". [S-19, S-30, P-12 reuse]

**Line 53 (`<insight>` title), line 55 (prose), `assets/decks/day5x.json` slide
index 3 (deck title).** OURS (`5e1b8ab`, `ffae805`).

Her deck slide 11 hedges both halves of this: "First page **typically** shows at
least: ... **Most parts then have**: ..." — and slide 9 says outright that
datasheets *vary*. The draft promotes "typically" to "always" and "the same
structure", and then the insight's own body has to carry
"sometimes called 'Theory of Operation' or 'Detailed Description'" and
"Rarely relevant for breadboard work" — the body already knows the title is
overstated.

draft (three places):

- title: `<title>Every Datasheet Has the Same Structure</title>`
- prose: "The first page **always** gives the high-level picture:"
- deck title: `"title": "Every datasheet has the same structure"`

hers:

- title: `<title>Where to Look in a Datasheet</title>`
- prose: "The first page **typically** shows at least the high-level picture:"
- deck title: `"title": "Where to look in a datasheet"`

because: S-19, and her *own* wording is the authority for the hedge. Note the
one thing in this insight that **is** hers and must not be softened further:
"Description (always read this)" — her slide 11 has it in capitals,
"Description - ALWAYS READ THIS". Keep as is, on the slide too (line 109).

---

### F6 — MAJOR. Slide title points instead of naming, and overclaims. [S-18, S-26, S-19]

**`assets/decks/day5x.json`, slide index 2**, over `sl-datasheet-questions`
(lines 97–105). Plus the paired prose at lines 31–32. OURS (`ffae805`).

draft: `"title": "Only the datasheet can answer these"`

hers: `"title": "The questions a datasheet has to answer"`

and the paired prose, lines 31–32:

draft: "Getting a peripheral to work requires answers to many questions that
only the component's `<term>`datasheet`</term>` can provide."

hers: "Getting a peripheral to work requires answers to a set of questions, and
for most of them the component's `<term>`datasheet`</term>` is the only place to
look."

because: S-18 — ~~"Run it: Blinky that never waits"~~ → **"Run it: Blinky with a
(polled) timer and without `delay_ms()`"**; a title says what the slide *is*.
And S-26 — ~~"How many LEDs is that?"~~ → **"How many LEDs are in this
display?"**; "these" is a pointer, not a referent. "only" is the same S-19
overclaim as F5 (her deck slide 8: "Microcontrollers, such as our STM32C031C6,
also have datasheets" — and app notes, errata and the reference manual carry
plenty that the datasheet does not).

---

### F7 — MAJOR. The share-out opens on a time budget. [S-15, S-25, L-8]

**Lines 521–524, and slide line 539.** OURS (`5e1b8ab`, `ffae805`).

draft (prose): "Each table presents their slide in 30 seconds or less.
Cover at least these three things:"

hers (prose):

> "Each table presents its slide to the rest of us.  Cover at least these three
> things:"

draft (slide, `sl-datasheet-shareout` first `<li>`): "Each table presents their
slide in 30 seconds or less. Cover at least:"

hers (slide) — promote it out of the bullet list into the slide's lead `<p>`,
unbolded:

```xml
<slide xml:id="sl-datasheet-shareout">
    <p>Each table presents its slide to the rest of us.  Cover at least these three things:</p>
    <ul>
        <li>The component's name and what it does, in one sentence.</li>
        <li>Its interface: passive, analog, I2C, SPI, or something else.</li>
        <li>One thing that surprised you, or that the rest of us should know.</li>
    </ul>
</slide>
```

and the 30 seconds goes where the other timings in this deck already live —
`assets/decks/day5x.json`, the share-out slide's `presenterNote`:
`"presenterNote": "≈ 6 min. About 30 s per table."`

because: the Day 9x pair — ~~"**In the first twelve minutes** we wire a display
to two of the Nucleo's pins, flash a program you are given, and read four
characters off it"~~ → **"We'll start by wiring the display to two of the
Nucleo's pins, flash a program, and make sure the display lights up."** S-25
names this explicitly: *"That covers ... and how long a step takes."* L-8 is the
lintable corner of the same rule and only catches fixed phrases, which is why
"30 seconds or less" survived four rounds. Also fixed in passing: "their slide"
→ "its slide" for a singular table, and the last bullet gains "or that the rest
of us should know" so the audience is the class rather than nobody.

---

### F8 — MAJOR. "Your table will be assigned one component" — the course, in the passive. [S-13, "We is the course", B-11c]

**Lines 124–128, and slide `sl-datasheet-assign` lines 509–511.** OURS
(`5e1b8ab`, `ffae805`).

draft:

> "Your table will be assigned one component.  Open its datasheet from Canvas,
> display it on your table's monitor, and complete the Datasheet Worksheet
> below.  Each table will share their answers with the class at the end."

hers:

> "We'll give each table one component to study.  Open its datasheet from
> Canvas, display it where your whole table can see it, and work through the
> Datasheet Worksheet below.  At the end of the hour each table presents its
> answers to the rest of us, so the five of them together cover an analog
> sensor, a signed analog sensor and three digital parts."

draft (slide, line 510): "Open its datasheet from Canvas, display it on your
table's monitor, and complete the Datasheet Worksheet (next slides)."

hers (slide): "We'll give each table one component.  Open its datasheet from
Canvas and display it where your whole table can see it."

because: the "'We' is the course, including for everything the course supplies"
calibration, with her four pairs — ~~"a library we have not read"~~ → **"a
library we'll hand to you"**; ~~"this course has been handing you all term"~~ →
**"we have been handing you all term"**; ~~"four characters that somebody else
chose"~~ → **"four characters that we chose when writing the `helloDisplay.c`
program"**. Assigning the components is the most purely course-owned act in the
chapter and it is currently agentless.

**One question inside this finding, for Petra.** "your table's monitor" is a
classroom fact I cannot verify (B-11c — and CLAUDE.md is explicit that there are
no benches, that students work on their own laptops). Her deck slide 10 says
*"open it up and display it on your **projector**."* My rewrite says "where your
whole table can see it", which is true under either arrangement — but if the
tables do have monitors, hers should probably read "monitor" and the old deck's
"projector" is the stale one. **Ask her; do not guess.**

---

### F9 — MAJOR. "on the board" means the whiteboard, in a chapter about a board. [S-26, L-5]

**Lines 156–158, 300–304, and slide line 513.** OURS (`5e1b8ab`, `ffae805`).
The referent is settled by *her* text: the instructor block written to her
2026-08-14 ruling (`5063921`) says "The sketch stays on **the table's
whiteboard**". The student-facing text says "the board" three times, in a
chapter whose other "board" is the Nucleo.

draft (156–158): "If you finish early, sketch a circuit on the board showing how
you would connect your component to the STM32 Nucleo."

hers: "If you finish early, sketch on your table's whiteboard how you would
connect your component to the Nucleo-C031C6."

draft (300–304): "Find the example schematic or application circuit.  Sketch the
minimal hookup on the board at your table: just power, ground, and signal
lines, labeled with pin names."

hers: "Find the example schematic or application circuit.  Sketch the minimal
hookup on your table's whiteboard: just power, ground and the signal lines, each
labeled with its pin name."

draft (slide, 513): "Some questions have analog and digital versions. Answer the
one that applies. Finish early? Sketch the hookup to the STM32 on your board."

hers (slide): "Some questions have an analog and a digital version.  Answer the
one that applies.  If you finish early, sketch the hookup to the Nucleo-C031C6
on your table's whiteboard."

because: S-26 — ~~"the `H` in the program"~~ → **"the `H` in the
`helloDisplay.c` program"**; name the referent rather than pointing at it. L-5
for "the STM32 Nucleo" / "the STM32" → **Nucleo-C031C6**. And "Finish early?" is
a bare fragment used as a transition, which L-16 and her Day 11x pass strike
(*"sentence fragment"*, *"not a complete sentence — use only complete
sentences"*).

---

### F10 — MAJOR. The share-out's closing lines explain the course to the student and assert a split without explaining it. [S-23, S-27, S-13]

**Lines 530–534, and slide line 543.** OURS (`5e1b8ab`, `ffae805`).

draft:

> "As you listen, note which components use analog interfaces and which use
> digital ones.  You will use several of these parts later in the course.  This
> is your first look at them."

hers:

> "As you listen, note which of the five components give an analog output and
> which are read over a digital protocol.  That split decides how a component
> gets read: an analog part goes to one of our ADC inputs and we convert the
> count into a physical quantity ourselves, while a digital part hands back a
> number it has already converted, and our job is to ask it for that number over
> I2C or SPI.  We'll come back to several of these parts later in the term."

draft (slide, 543): "As you listen, note which components are analog and which
are digital, since you'll use several later in the course."

hers (slide): "As you listen, note which of the five give an analog output and
which are read over a digital protocol: an analog part goes to our ADC and we
convert the count ourselves, a digital part hands back a number it converted
itself.  We'll come back to several of these parts later in the term."

because: three separate specimen moves. **"This is your first look at them"** is
S-23, the book explaining its own teaching strategy — her deletions are
~~"We do this deliberately: we ran Blinky before we explained a single
register..."~~ (cut whole) and ~~"which is the order this course usually
takes"~~ (cut). **The causal middle** is S-27, which is what most of her Day 10
insertions do — "the display then pulls it LOW" → **"the display, **having
recognized its address**, then pulls SDA LOW"**; here the draft tells a student
to sort five parts into two bins and never says why the bin matters. And
"You will use" → "We'll come back to" is S-13 / the "we" calibration.

---

### F11 — MAJOR. A whole bold sentence as an instructor slide's lead line. [S-29]

**Lines 342–343.** **Content HERS** (`5063921`, her 2026-08-14 ruling; the
commit message restates it almost word for word). **Markup OURS.** This block is
deck-ref'd — `assets/decks/day5x.json` slide index 12,
`"slide": "inst-datasheet-worked", "instructor": true` — so it renders on the
wall, entirely bold, in the instructor deck.

draft:

```xml
<p>
    <term>What Part E asks for is Parts A–D, everything except
    the board sketch.</term>  The sketch stays on the table's
    whiteboard and out of the slide because drawing one on a
    slide, live, costs more of the hour than it returns.
</p>
```

hers — **the words are untouched; only the `<term>` goes**:

```xml
<p>
    What Part E asks for is Parts A–D, everything except the board
    sketch.  The sketch stays on the table's whiteboard and out of the
    slide because drawing one on a slide, live, costs more of the hour
    than it returns.
</p>
```

because: S-29, Petra 2026-08-08 on a deck of bold-led slides — *"I really don't
like those.  Can these become regular bullets?"* Her rule of thumb: past about
four words, or ending in a full stop, it is a sentence. This is thirteen words
and a full stop. Her exemption (a short noun-phrase label such as
`<term>Common cathode.</term>`) does not reach it.

The five labels in `inst-datasheet-key` (lines 402, 433, 448, 470, 481) *are*
noun-phrase labels of a keyed answer list and stay bold. **One does not:**

draft (493): `<term>The one that rewards a careful reader: the DRV5053.</term>`

hers: `<term>The DRV5053: a signed measurement, and a sensitivity that depends
on the suffix.</term>`

because that one is both over-long and the S-21 armature — *"N, and it is the
one that..."* announces a property and defers the subject. Her fix is to put the
subject first: ~~"One question is left, and it is the one that makes the rest
work."~~ → **"One question is left: if SDA is the line carrying the bits, how
does a device tell a START from an ordinary 1 going by?"**

---

### F12 — MINOR. A value that "sits" inside a range. [L-15]

**Lines 460–461.** OURS (`a533757`, written from the datasheets she supplied).
This is the one L-15 instance the survey measured in this chapter.

draft: "so the whole output swing **sits** inside our 3.3 V ADC range with room
to spare and needs no divider."

hers: "so the whole output swing **falls** inside our 3.3 V ADC range with room
to spare and needs no divider."

because: Petra, Day 11x — *"the register is not a person.  Don't personify
things"*, on a run of "sits"/"lives", and *"let's not have registers 'sit'.  How
about 'located'? ... apply everywhere."* A value located inside a range is the
banned form ("the compare value sits above it", "the two numbers actually
live"). **Not** the exempt voltage idiom: "the wiper sits at half the supply"
stays, and session 3 deliberately kept it three times. The difference is that
"sits at" names a level; "sits inside" names a location.

---

### F13 — MINOR. Two unit openings are fragments. [L-16, L-12]

**Line 277** (`task-passport-c2`, **projected**) and **line 395**
(`inst-datasheet-key`, projected in the instructor deck). OURS.

draft (277): `<p><em>Also in the Electrical Characteristics table.</em></p>`

hers: `<p><em>These answers are also in the Electrical Characteristics
table.</em></p>`

draft (395): "Parts A–D, for the five components whose datasheets are in the
repository (`assets/datasheets/`)."

hers: "Below are the answers to Parts A–D for the five components whose
datasheets are in the repository (`assets/datasheets/`)."

because: L-16, and Petra Day 11x on two of these in one pass — *"not a complete
sentence — use only complete sentences"* and *"sentence fragment."* Line 277 is
the odd one out among its four siblings, which all read "These answers are in
the ... section" — so this is a lone fragment among sentences, which is the
exact case L-12's lint is meant to catch and misses here because it sits in a
`<p>`, not an `<li>`.

---

### F14 — MINOR. I²C and I2C in the same chapter. [corpus consistency, L-6]

Seven `I²C` (lines 37, 101, 208, 252, 312, 527, 541) against eight `I2C`
(142, 143, 144, 438, 470, 512×3). **This chapter holds 7 of the 8 `I²C` in the
entire book** (the eighth is one in `frontmatter.ptx`); `ch-i2c.ptx` writes
`I2C` 246 times and `ch-accelerometers.ptx` 98. Normalize all fourteen to
`I2C`, and carry F3's expansion at line 37. OURS.

---

### F15 — MINOR. The chapter is budgeted to 55 minutes; the class is 50. [CLAUDE.md, B-11c]

**Line 5**, with the budget comments at 14, 121 and 518 (≈5 + ≈45 + ≈5 = 55),
and `assets/decks/day5x.json`'s section `presenterNote: "≈ 45 min."` OURS.

Day 5x is a Wednesday x-hour: **50 minutes.** CLAUDE.md flags this precise error
class — *"Every day of week 5 was first budgeted to 65 minutes ... the error has
now been made three times, so take the length from this line rather than
assuming an hour."* Week 5 again, a fourth time.

draft (line 5): `55-minute standalone class — no pre-class reading required.`

hers: `50-minute Wednesday x-hour -- no pre-class reading.`

(Also: that line carries one of the two remaining em dashes in the file —
line 5 and line 135, both inside XML comments, which is why `f3657e6`'s sweep
left them. Worth taking while the line is being edited.)

The 5 / 45 / 5 split needs to become 4 / 40 / 6 or similar, and **which five
minutes come out is her call, not mine** — see §5. These are comments and a
presenter note, so L-8 and S-15 do not bite; the arithmetic does.

---

### F16 — MINOR. The questions slide carries the next slide's point, and carries F4's banned claim. [B-16, S-10]

**Line 103**, last `<li>` of `sl-datasheet-questions`. OURS (`ffae805`).

draft: "Datasheets are dense and written for experts, but they follow a
predictable structure. Learn where to look and you can navigate any datasheet
quickly."

hers: **DELETE from this slide.** What is lost: nothing — the point moves one
slide later to `sl-datasheet-skeleton`, which is the slide that actually has the
structure on it, as its lead `<p>`:

```xml
<slide xml:id="sl-datasheet-skeleton">
    <p>Datasheets vary between component types and manufacturers, and reading one takes patience.  What makes it manageable is that most are organized along the same lines.</p>
    <ul>
        ... (the eight existing bullets, unchanged) ...
    </ul>
</slide>
```

because: B-16, twice in one Day 11x pass — *"I would never speak like that.
This is basically empty of content.  Delete?"* on a paragraph announcing what
the figure directly below it was about. Here a bullet on the *questions* slide
announces what the *structure* slide is about, and the structure slide has no
lead line at all. This also removes the second copy of F4's claim.

---

### F17 — MINOR. Three curly apostrophes. [typography]

Lines 112, 510, 543 — `it’s`, `table’s`, `you’ll` — all inside `<slide>` `<li>`s,
all from `ffae805`. The whole rest of the corpus uses straight apostrophes (6
curly in 16 chapter files, half of them here). OURS; not a paste tell from her —
`git log -S` puts both on `ffae805`, the deck-authoring commit. Straighten them,
in the same spirit as the em-dash sweep. (B-15 is not in play: none is inside a
`<program>`.)

---

### F18 — MINOR, instructor-only. Two register wobbles in `inst-datasheet-key`. [S-20, L-17]

Both project in the instructor deck. OURS (`a533757`). Low priority, and I would
not spend a round on them.

- **Line 398**: "because that is the habit **Part A–D is teaching**" — a
  document doing the teaching (S-20 generalizes this to any part of the course;
  L-13 is its sibling). hers: "because that is the habit **these questions are
  meant to build**".
- **Line 424**: "That column is worth **making the room say out loud**." hers:
  "That column is worth **having the tables read out** at the share-out."
  ("the room" as the actor is the same move as a weekday as the actor.)

---

## 3. Sweeps

**Unit openings checked: 15 — failing: 8.** Every student-facing unit's first
sentence, plus both `<instructor>` blocks, listed so it is visible which ones
were checked.

| # | Unit | First sentence | |
| --- | --- | --- | --- |
| 1 | chapter `ch-io-datasheets` | *(none — no `<introduction>`)* | **FAIL** F1 |
| 2 | section `sec-datasheets-inclass` | *(none — no `<introduction>`)* | **FAIL** F2 |
| 3 | `subsec-datasheets-intro` | "A microcontroller on its own senses nothing and drives nothing." | **FAIL** F2 |
| 4 | `insight-datasheet-sections` | "The first page always gives the high-level picture" | **FAIL** F5 |
| 5 | `subsec-datasheets-scavenger` | "Your table will be assigned one component." | **FAIL** F8 |
| 6 | `act-datasheet-passport` | "Work through Parts A–D, then build your group slide in Part E." | pass |
| 7 | `task-passport-a` | "These answers are on the first page." | pass |
| 8 | `task-passport-b` | "These answers are in the Pinout and Application sections." | pass |
| 9 | `task-passport-c` | "These answers are in the Electrical Characteristics table." | pass |
| 10 | `task-passport-c2` | "Also in the Electrical Characteristics table." | **FAIL** F13 |
| 11 | `task-passport-d` | "These answers are in the Application Information section." | pass |
| 12 | `task-passport-slide` | "Add one slide for your component to the shared class deck." | pass |
| 13 | `subsec-datasheets-shareout` | "Each table presents their slide in 30 seconds or less." | **FAIL** F7 |
| 14 | `inst-datasheet-worked` | "What Part E asks for is Parts A–D..." | **FAIL** F11 (markup only) |
| 15 | `inst-datasheet-key` | "Parts A–D, for the five components..." | **FAIL** F13 |

Units 6–9, 11 and 12 are genuinely hers in register — direct second-person
instruction for what the student personally does, which is exactly what S-13
reserves "you" for ("You noticed this in the Lab 2 race game" survived her
pass). Do not touch them.

**Slide titles: 15 — epigrams rather than names: 2.** Titles live in
`assets/decks/day5x.json`, read as a list:

1. "Reading Component Datasheets" — chapter title. OK.
2. "Embedded systems need peripherals" — names the subsection. OK.
3. **"Only the datasheet can answer these"** — points, and overclaims. **F6.**
4. **"Every datasheet has the same structure"** — asserts what the body hedges. **F5.**
5. "Datasheet Scavenger Hunt" — section slide. OK.
6. "Your table gets one component" — OK as a name. (The *body* is F8.)
7–11. "Datasheet Worksheet, Part A/B/C/C cont./D: ..." — **legitimate.** These
   are the student's own printed worksheet parts, named on the slide the student
   is working from; not the lesson-plan "Part N" L-18 bans.
12. "Datasheet Worksheet, Part E: Group Slide" — same. OK.
13. "Worked example: a Part E slide" — instructor. OK.
14. "Answer key: Parts A–D, five components" — instructor. OK.
15. "Share-Out" — OK.

**Weekday or course-period as grammatical actor: 1 — line 398, "the habit Part
A–D is teaching" (instructor-only). (S-20)** Zero student-facing. Checked: line
345 "costs more of the hour than it returns" (the hour is the object, fine);
line 533 "later in the course" (adverbial, fine, and S-20 explicitly permits
it); line 135 "the course uses it elsewhere" (XML comment recording her ruling —
do not touch, per the brief).

**"N, and it is the one that..." armature: 1 — line 493 (instructor-only). (S-21)**
Zero student-facing. Related count-armatures, both instructor-only and both
mild: line 373 "Two things it does right even so, and both are worth naming"
(S-28 would delete the frame — low priority), and line 404 "the interesting
column is the last one, because two of these parts are destroyed by 5 V and
three are not", which is fine as written because the count *is* the content.

**"we" in class-work sentences: 0 of 9.** The nine sites are tabulated in §1.
Whole-file first-person-plural: 3, all inside `<instructor>` blocks.

**Acronyms first-used without expansion (complete): MCU, I2C, ADC, SPI, UART,
PWM, VDD/VCC.** All seven, with rewrites, in **F3**. Clean: CPOL and CPHA are
expanded inline at lines 262–263; "real-time clock" is spelled out at 142; GPIO
(284) and USART are expanded in earlier chapters and are course-standard by
Day 5x; A0/A1 (255) and SDO/SA0 (474) are datasheet pin labels used in their own
sentence's context.

**Design scaffolding in student-facing text: 2.**
- "in 30 seconds or less" — lines 522 and 539. **F7.**
- the 55-minute budget — line 5 and comments 14/121/518. **F15.** (Comments, so
  instructor-only by construction; listed because the *number* is wrong.)

Clean: no time budget in any `<p>`, `<li>`, `<caption>` or `<title>` other than
the share-out's; no "the reading"; no "a program you are given"; **all fourteen
`Part [A-E]` references are the student's own worksheet parts**, which the brief
rules legitimate and which L-18 does not reach (the four `Part N` hits outside
the worksheet are inside `<instructor>` blocks and XML comments, which L-18
explicitly keeps).

**B-11e — Arduino: 0.** No comparison, no `analogRead`, no `Wire.h`, no borrowed
vocabulary. The five hits on `sketch` (156, 301, 331, 343, 513) are all the
ordinary English verb/noun for a drawing on a whiteboard, which B-11e explicitly
permits ("The verb *sketch* is still ordinary English where nothing is being
named"). Nothing to do. Worth recording, given that this is the rule session 3
shipped a violation of.

**L-17 — a voice on the signal path: 0.** All four hits are legitimate: lines
429–430 ("the first says what kills it, the second says where it works") are
*tables* as subjects, which the brief and L-13 both permit; line 498 is a
*student* reporting. No sensor in this chapter speaks.

**L-13 — a document acting on a student: 0** beyond F18's line 398. Line 476,
"exactly the 'list the possible addresses' the worksheet asks for", is L-13's
stated exception — a specification asking for a value.

**The "never say write" ruling: 0.** No `write down`, no `in writing`, no
`write a sentence`. As the brief notes, **line 246–248 "Write the transfer
function, the equation that converts output voltage to a physical value"
survived her pass and is not flagged.** Neither is anything else in the chapter.

**L-21 / L-19 / L-20.** L-21 clean: the five datasheet `<url>`s (140–144) sit in
subsection prose, and `sl-datasheet-assign` names the five components without
links — verified against every `"slide"` id in `day5x.json`. `check_rules.py`
still reports 7 warnings on this file (2 × L-19, 5 × L-20 anchor form) — those
are Prompt 2's open items from `a219c3b`, not mine, and I have not touched them.

---

## 4. Already written — reuse instead of invent

`ClassSlidesOLD/Day05X-InputOutputDatasheets.pptx`, 15 slides, mined.
Three real reuse findings; speaker notes were the richest source, as usual.

- **The "you can navigate any datasheet quickly" claim** (line 47) — she already
  wrote the opposite, **slide 9**: *"Reading datasheets requires patience."* and
  *"Datasheets vary between component types and manufacturers."* Folded into
  **F4**.

- **"Every datasheet has the same structure"** (line 53, deck title) — she
  already hedged it, **slide 11**: *"First page **typically** shows at least"* /
  *"**Most parts** then have"*. Folded into **F5**. Her *"Description - ALWAYS
  READ THIS"* is already carried at line 56 and line 109; keep it.

- **The chapter has no "why should I care" hook, and hers is sitting in the
  deck — slide 8**: *"Note: Microcontrollers, such as our STM32C031C6, also have
  datasheets.  **That's where we found the registers for the USART module!**"*
  One sentence, in her voice, with a "we", tying Day 5x back to the previous
  class. Used in **F1**'s chapter introduction. This is the single cheapest way
  to make the opening sound like her.

- **Available but not recommended:** slide 9's *"Datasheets are the roadmap to a
  sensor or an actuator"* is metaphor-as-a-label, which her own later S-11
  ruling strikes (*"don't use that word"*, Day 11x) — the old decks are the
  authority for the arc and the code, not a licence to reimport something a
  later ruling bans. Her *"Every circuit part has a data sheet (even a
  resistor!)"* on the same slide **is** safe and would do honest work in F1's
  first paragraph if a sentence is wanted there. Her Elicia White quote
  (*"In some ways, reading a datasheet is like coming into the middle of a
  technical conversation"*) is a metaphor *inside* an explanation and attributed,
  so it would survive — but it is a judgment call about whether the book quotes
  outside sources, and I have not seen it do so elsewhere. **Ask.**

- **One arc gap, reported not fixed.** Her **slide 7, "Typical sensor signal
  chain"** — Sensor → AFE → ADC → MCU, with the taxonomy *"Many sensors are
  'bare' ... Often, the sensor you buy has the AFE built in (example: TMP235)
  ... Often, the sensor you buy has the AFE and the ADC built in, and a serial
  communication interface (example: LSM303AGR) ... Usually, the MCU has an ADC
  built in (ours does)"* and four paragraphs of speaker notes — **is nowhere in
  this chapter.** The only trace is half a clause at line 39, "Is there a
  built-in analog front end, or do you need external signal conditioning?", and
  "AFE" is never used. That taxonomy is exactly what F10's analog/digital split
  needs in order to mean anything. **This is B-8a, not voice** — adding it is new
  content and belongs to a Gate 1 decision, so I am flagging it rather than
  drafting it. Either add it, or record in a source comment why not, which is
  what B-8a asks for.

---

## 5. For Petra, not for me

1. **"your table's monitor" or "your projector"?** Line 127 says monitor; her
   own deck slide 10 says *"display it on your projector"*; CLAUDE.md says
   there are no benches and students work on their own laptops. F8's rewrite
   dodges it with "where your whole table can see it". Which is true of the room?
2. **The 50-minute rebudget.** F15 fixes the total; **which five minutes come
   out is a teaching call.** The current split is 5 opening / 45 hunt / 5
   share-out. ch-power's precedent for this is an `<instructor>` block naming
   the cut order explicitly, which is the form I would copy — but the order is
   hers to state.
3. **Her deck's Elicia White quote** (§4) — does the book quote outside voices?
   I have not found another instance, so I have not imported it.
4. **The signal-chain slide** (§4, last bullet) — add it to the chapter, or
   record why not? Her deck taught it; the book does not.
5. **Not invented into a rule.** Nothing in this chapter raises one of the three
   Day 8 changes that resist generalization (which explanations get expanded,
   when a forward reference is worth keeping, the one exclamation mark). Noting
   it so that the absence is on the record. Her deck's *"(even a resistor!)"*
   would be a second exclamation mark if imported — one more reason to ask
   before importing it.

---

## 6. Slides whose body grows if the paired prose changes — for the fit sweep

At 1600×900, in the order I would check them.

| Slide | Deck idx | Driver | Risk |
| --- | --- | --- | --- |
| `sl-datasheet-questions` | 2 | **F3** adds four acronym expansions into bullets that are already near full width; **F16** deletes the last bullet | **Net shrink**, but bullets 1 and 3 get longer — re-measure. Title changes too (F6). |
| `sl-datasheet-skeleton` | 3 | **F16** adds a lead `<p>` above eight existing bullets; **F5** adds "typically" | **Highest risk.** Eight bullets plus a new lead line. If it overflows, the legitimate lever is #6 — split off the four "what to read first" bullets. **Do not tighten F4's wording to fit.** |
| `task-passport-b` | 7 | **F3** expands SPI, UART and PWM in the interface list | Only two `<ol>` items today, so there is room — but the list line wraps. |
| `task-passport-a` | 6 | **F3** moves VDD/VCC into its own parenthetical sentence | Three items, moderate headroom. |
| `sl-datasheet-assign` | 5 | **F8** rewrites two bullets, **F9** rewrites the last one longer | Four bullets, should absorb it. |
| `sl-datasheet-shareout` | 14 | **F7** promotes bullet 1 to a lead `<p>` and drops the timing | **Net shrink.** |
| `task-passport-d` | 10 | **F9** "the board" → "your table's whiteboard" | +2 words. |
| `inst-datasheet-worked` | 12 | **F11** removes the `<term>` wrapper | No reflow, but the slide loses its bold lead — look at it once. |
| `task-passport-c` / `c2` | 8, 9 | **nothing proposed, deliberately** | The source comment at lines 271–274 records that Part C already ran **68 px past the bottom** as one task and had to be split. **Add nothing to either.** F14's I²C → I2C is character-neutral; F13's line-277 rewrite adds four words to `c2`, which is the lighter of the two — measure it. |
| `inst-datasheet-key` | 13 | **F12, F13, F18** | All in-place word swaps except F13's +5 words. This slide also carries a `<tabular>`; check it still clears. |

Two slides that do **not** change and should not be reopened:
`sl-datasheet-peripherals` (its three bullets are a fair condensation of F2's
rewritten paragraph — re-read them beside it, but the wording holds), and
`task-passport-slide` (Part E, which is her 2026-08-14 ruling; F11 touches only
the instructor block that frames it, never the task).

---

## 7. What is hers, and was left alone

For the record, so it is visible that the floor was checked before anything was
rewritten. `ls reviews/ | grep -i day5` → nothing.
`grep day5x reviews/slide-comments*.jsonl` → nothing. So the floor here is the
four rulings the commit history records, plus her old deck:

- **`5063921`** — the Part E spec and the reason the board sketch is not drawn
  live. **F11 changes the markup around her sentence and not one word of it.**
  Her "the table's whiteboard" is in fact the *evidence* for F9.
- **`71fa3a6`** — the source comment at lines 130–137 explaining why the
  LSM303AGR and the photocell are not in the component list. **Untouched, and
  the component list at 138–145 is untouched.** (Note for the next session: this
  is also why §4's signal-chain reuse must not drag the LSM303AGR example in
  with it — her slide 7 uses it, and this ruling keeps it out of Day 5x.)
- **`a533757` / `37a0c3c`** — the two answer keys, from the five datasheets she
  supplied and her own `Day05X-StudentReport.pptx` Part E slide. Every number,
  every citation and the worked TMP235 example are untouched; F12, F13 and F18
  touch three verbs and one bold label between them, all in prose we wrote
  around her data.
- **Her old deck's own sentences**, where the book already carries them:
  "Datasheets can be intimidating" (45), "Description — always read this"
  (56, 109), the active-low notation paragraph (79–84). **All kept**, and F4 is
  written specifically so that her "intimidating" clause survives the rewrite.
- **Her worksheet Parts A–E** and the direct second-person instructions in tasks
  6–12 of the openings table. Not flagged, per S-13.

No unwrapped long line and no typo was found inside an otherwise-wrapped
paragraph, so nothing in this chapter looks pasted from one of her comments. The
three curly apostrophes (F17) are the closest thing to such a tell, and
`git log -S` puts all three on `ffae805`, our deck-authoring commit.
