# Authoring spec: the ENGS 28 book and its slides

The rules this book is written to. Every rule has an **ID** so that review
feedback can cite a rule instead of an opinion ("violates P-1" rather than "this
felt confusing"), and so the committee synthesizer can dedupe overlapping notes.

Four groups:

| Prefix | Scope |
| --- | --- |
| **P-n** | Pedagogical principles — govern the book *and* the slides |
| **B-n** | Book prose, structure, figures, activities |
| **S-n** | Slides (mechanics live in `AUTHORING-slides.md`) |
| **L-n** | Language and standing rules — mechanically checkable |

For *how* to run a chapter through the workflow, see `CHAPTER_PROCESS.md`.
For slide markup mechanics (`<slide>`, `@ref`, deck JSON), see
`AUTHORING-slides.md`. For build/git/deploy, see `AUTHORING.md`.

These rules were derived from the corrections Petra gave across Days 1–6. The
point of writing them down is that a draft should arrive at her desk already
obeying them.

---

## P — Pedagogical principles

### P-1 Theory before activity. No forward references.

Everything a student needs in order to attempt an activity appears **before** the
activity, in reading order. If an activity needs a register, the register is
explained first; if it needs an operator, the operator is taught first.

This is the most frequently violated rule and the most damaging, because a
forward reference is invisible to the author — who already knows the material —
and total for the student.

### P-2 The crucial step, scaffolded for the slowest student

Every chapter names exactly **one crucial step**: the thing every single student
must reach by the end of class. It is scaffolded densely enough that the slowest
student gets there — worked example, skeleton with `// TODO`, a predict-then-verify
warm-up before the real thing.

If a chapter cannot name its crucial step in one sentence, the chapter is not
designed yet.

### P-3 A genuine stretch for the fastest students

Every chapter leaves real challenge for students who finish early. The stretch is
**additional**, never a withheld piece of the crucial step — you may not create
challenge by under-teaching. Good stretches generalize the day's idea (a second
channel, a harder pattern, an efficiency question) rather than adding busywork.

P-2 and P-3 are a pair. A chapter that satisfies only one of them has failed.

### P-4 A visual for every abstract idea

Any idea a student cannot see gets a picture. "Each bit is one pin" became the
register-as-boxes grid; masks became an 8-bit worked example. Prose alone is
acceptable only for ideas that are already concrete.

Prefer diagrams that can be *drawn on* during class over decorative figures.

### P-5 Observe → explain → fix

Teach a phenomenon by having students **see** it first, then explaining it, then
fixing it. Do not lead with the answer. (Day 3x: scope the switch bounce → explain
contact bounce → fix in hardware → fix in software.)

The old decks are full of this and it is easily lost in transcription: the ADC
deck's "Quick aside… / **Wait: WHAT?** / Atomic Register Access" sequence is
observe-then-explain, and the book had flattened it into a single box that gives
the answer away before the student is puzzled.

### P-6 Activity before reveal

Students do or predict first; a reveal slide debriefs afterwards. Reveals are
marked optional so the instructor can adapt to pace.

**The failure mode is the slide *before* the activity, not the one after.** A
setup slide that helpfully includes the answer leaves the activity with nothing
to do, and the loss is invisible in a slide list — the sequence still reads
setup → activity → reveal. Day 9's EXTICR lookup had it in the worst form: the
setup slide gave the field layout, the port codes, *and* a figure with port B's
code already written into it, and then the activity asked students to look up
exactly those. Before shipping a setup slide, read the activity that follows it
and check that every question still has an answer worth finding.

### P-7 One idea per unit on first encounter

A concept that is new gets a **mini-arc**, not one dense slide or paragraph:
motivate → mechanic → mechanic → predict/practice → the hands-on activity.
Slides are free; confusion is not. Compressing a first encounter to save space is
always the wrong trade.

### P-8 Teach an operator alone before its compound form

`|` before `|=`. `&` and `~` before `&= ~`. Each rule arrives with its evidence —
a truth table, a few binary lines — and the reference table sits beside the worked
example, not on a separate slide.

Generalizes: teach the simple form of anything before its shorthand.

### P-9 Taught code progresses naive → broken → skeleton → solution

Show a naive or broken version, run an activity on why it fails, give a skeleton
with `// TODO` blanks, and only then the full solution. Never show the finished
solution before the fill-in step.

The reading book may show worked code inline; the **deck follows the classroom
progression**. This is a legitimate, intended divergence between the two.

### P-10 An instructor solution for every coded activity

Every activity that asks students to write code has a corresponding solution. No
exceptions — including open-ended design activities, which get a *worked example*
solution even though student answers will differ.

**The solution is never in the student book.** There are two places it may live,
and they are not interchangeable:

| Where | How | For |
| --- | --- | --- |
| the deck | a `<slide>` whose deck entry is `"instructor": true` | a reveal projected in class after the activity |
| the book | inside an `<instructor>` element | the worked answer, for your own copy — see *Instructor-only content in the book* at the end of this file |

Code a student or a lab is meant to produce goes in `<instructor>` **even when
the class works through it together**, because the book outlives the hour. A
derivation the room does jointly — building `0x21` out of the command table — is
teaching, not a solution, and stays.

### P-11 Datasheet literacy is an early, recurring thread

Every chapter contains at least one moment where the answer comes from the
datasheet or reference manual, and the text **names the document, table, and
section** so the student can repeat the lookup. Not "check the datasheet" but
"Datasheet Table 12, *Pin assignment and description*".

This starts in the first weeks and reinforces every chapter — it is the skill that
outlives the specific chip.

**Replacing a figure's image erases its provenance unless you look.** Rewriting a
caption around a new image is where the document, table and section names quietly
go. On Day 10 the command table caption was rewritten for Petra's annotated
version and "datasheet pp. 24–25" went with it — which removed the only P-11
anchor from the whole part, on three slides at once, and she caught it two passes
later. **When you swap an image, diff the old caption for document, table and
section names before you write the new one, and carry every one of them across.**

### P-15 A discovery must not be answered anywhere ahead of it — including in a figure

Grepping the prose is not enough: an answer can be **drawn**. Day 10's COM/ROW
map had the colon's LED filled in and boxed at ROW1, with "so bit 1 of
buffer[4]" beside it, four slides before students run the experiment that finds
it — while the slide's own presenter note called finding it "an experiment
rather than a lookup".

When an activity asks students to discover X, check the figures for X too,
including annotations baked into an SVG's text nodes or a rebuilt PNG. Draw the
unknown as genuinely unknown — all eight crossings identical and open, not seven
open and one filled — and **leave a comment in the source saying the omission is
deliberate**, or the next pass will helpfully fill it in.

### P-16 Introduce what students write before the harness that tests it

Petra, 2026-08-12: *"The ordering is all wrong."* Day 10 Part 8b opened on
`writeFirstDigit.c` and mentioned only in passing that the function it calls does
not exist yet. The order students need is: here are your three files, these two
are unfinished, fill in this function — *then* here is the program that tests it.
The test harness is meaningless before the thing under test has been named.

Corollary, and worth a mechanical check: **no task should appear twice in a
day.** Day 10 had the stopwatch measurement in both a deck prompt and the
activity's first task, and the colon experiment as both its own activity and the
last task of a later one.

### P-12 Prefer the old annotated images

`assets/ClassSlidesOLD/` is the authority for the intended in-class arc, and its
images carry teaching annotations — callouts, arrows, labelled regions — that the
raw extracted media does not. The annotations live in the PowerPoint shape layer,
so plain media extraction silently drops them.

Rebuild them with `scripts/pptx_annotate.py` rather than shipping the bare
picture. A register diagram without its callouts has lost the teaching.

### P-13 The lab is one consumer, not the goal

Chapters prepare students for the lab that follows, but a great deal of learning
happens **in class and in homework** and has its own goals. Do not reduce a
chapter to lab preparation, and do not let the lab's requirements set the
chapter's scope. Objectives come first; the lab is checked as a downstream
constraint (see `CHAPTER_PROCESS.md`, Step 0).

### P-14 Productive struggle, and AI used honestly

Activities are designed so the struggle is productive rather than a wall. Where
students are likely to reach for an AI tool, the activity should require something
an AI answer does not supply on its own — a measurement, a prediction recorded
before running the code, an explanation of a specific line. Course policy is that
students disclose AI use and can explain every line they submit.

---

## B — The book

### B-1 Chapter skeleton

```
<chapter>
  <introduction> + <objectives>
  Before Class: … …………………… reading + <reading-questions>
  Day N In-Class: … ………………… Part 1..k subsections; activities; <slide> blocks
  (Day Nx In-Class: …) ……………… x-hour, if the chapter has one
  Reference: … ………………………… lookup material, end of chapter
</chapter>
```

The book is the single source of truth for both the pre-class reading and the
in-class slides. In-class sections carry `<slide>` blocks beside the prose they
condense.

### B-2 Pre-class material motivates and introduces — it does not build the machinery

The "Before Class" reading must be readable and answerable **without hardware,
without the IDE, and without having been to class** — and its job is to
**motivate** the day and introduce the **ideas**, not to construct the full
mechanism. Students cannot absorb implementation — register maps, datapaths,
multi-stage mechanism figures — from prose alone (Petra, Day 8). A reading
section that needs a reveal-sequence figure has outgrown the reading.

Mechanism is first *encountered* in a **pre-class video** (scripted from the
book — `plans/dayNN-video-script.md` — and recorded over a deck of the book's
own slide blocks, so video and book cannot drift) or in class, and the full
written version lives in the chapter's **Reference** section for revisiting.
Reading questions may cover video content when a video is part of the
pre-class package. The reading contains no in-class activities.

*(Rewritten after Day 8. The original rule — "the reading builds the concepts;
class applies them" — produced a Before-Class section Petra rejected as
overload. This also settles the Day 7 Gate 2 escalation about reading scope:
the cognitive-load reviewer's "readings introduce and motivate only" brief is
now the rule.)*

### B-3 Reading questions are grounded in real behavior

Every `<exercise>` correct answer must describe what the **actual driver and actual
hardware** do — not a plausible invention. Distractor feedback must be accurate too;
it is read by students who chose it and is prime teaching space.

Verify against the driver source before finalizing. (`rq-uart-crlf` was wrong for a
year because it assumed the retarget inserted `\r`, which `uart.c` does not.)

### B-4 In-class sections mirror the lesson plan

Each in-class section is divided into `Part N` subsections whose sequence and titles
match the lesson plan's activity sequence. A reader can see the shape of the class
from the table of contents.

### B-5 Activities are `<activity>` with `<task>` children

One action per `<task>`. Tasks are numbered by the build, so prose should not
hard-code "step 3". Give every activity and task an `xml:id` — the deck references
them directly, and sub-parts can be projected individually (`task-passport-a`).

### B-6 Code in the book is the real driver's code

Read the actual `.c`/`.h` before writing a line of explanation. Match its idiom
exactly: its includes, its `#define`s, its CMSIS macro names, its clear-then-set
sequences, its return types, its function decomposition.

Where the driver is not in the repo, it is very often recoverable **as text** from
the old deck's code slides — check there before asking Petra for files.

Invented-but-plausible code is the single largest source of error in this book.

### B-7 Book captions describe; slide captions instruct

A **book** figure caption is full and self-contained: what is shown, with correct
register, bit, and hardware names, so a student reading alone understands the figure
without the surrounding prose.

A **slide** caption is one instructive line — "what to notice" (S-3). They are
different texts for the same figure, and the player hides the book caption on slides.

### B-8 Each concept is taught exactly once, where it is needed

No concept is explained twice in a chapter. Put an explanation where it is *needed*,
not where the term first appears in passing — oversampling belongs in the BRR section
that it motivates, not in the CR1 section that mentions it.

Duplication is the standard failure mode of drafts assembled from slide decks; check
for it explicitly.

### B-9 Cross-references and counts are real

Use `<xref ref="..."/>` rather than "the figure below". If an intro says "three
steps", count the subsections — this drifts every time content is added or merged.

### B-10 Reference material goes at the end

Lookup material that students will return to (bit twiddling, register tables) lives in
a `Reference:` section at the end of the chapter, not inline in the teaching flow.

### B-11a Figures must be legible when projected

Type in a figure is read from the back of a room, not from a laptop. Size it
generously, and when text does not fit, **make the figure bigger rather than the
text smaller** — a diagram that has been shrunk to fit a column has usually been
shrunk past the point of being readable. Check by looking at the rendered figure,
not the source.

### B-11b Every subsection must stand on its own

Each subsection chunks to its **own page**, and a student can arrive there
directly from search, a link, or the table of contents. So a subsection may not
open by referring to context the reader is assumed to be carrying — "this
arithmetic", "the relationship above", "as we saw". Name the subject in the first
sentence, then `<xref>` to wherever it was developed.

### B-11c Never invent physical or classroom facts

The rule against inventing code (B-6) extends to everything the author cannot
observe: what equipment students have in front of them, how a component mounts,
what they already have wired, how long something takes. These read as
authoritative and are impossible for a reader to challenge. Take them from the
old deck, from the lab handout, or ask — never reconstruct them from
plausibility.

Standing classroom facts (from Petra, Day 7x review): **there are no lab
benches** — each student carries a portable equipment kit (a <q>suitcase</q>)
and works on their own laptop. Never write "bench", "at your bench", or "lab
station".

### B-11d No unsupported claims about what is common

"The most frequent mistake", "students usually", "this always trips people up" —
these are empirical claims presented as fact, and a chapter has no evidence for
them. Say what is true instead: *why* the slip is easy to make, or what it costs.

### B-11 Every image path resolves; crop to what matters

Verify `<image source="..."/>` against disk. Never drop a whole slide into a section
when one diagram matters — crop it, or the book reads like pasted PowerPoint.

### B-14 `int main()` returns

Every `main()` declared `int` ends with a `return` — this course uses
`return 1;`, matching the drivers. It is unreachable after a `while (1)`, and
it is still written: students copy these listings into their own programs, and
a function with a declared return type that falls off its end is wrong C.
Declare `main` `void` instead and the return is not needed — but the course
does not.

Checked by `scripts/check_rules.py` (brace-matched, comment-blind, so a
`return` in a comment or in a later function does not satisfy it).

### B-13 The handout is more verbose than the book

A starter `.c` file students download is read **alone**, with no chapter beside
it, so it carries the fuller commentary: the reason behind each constant, a
label on every step, and the header block (name, assignment, collaborators,
I/O pins, circuit, revision history) that `ADCPot.c` established. The book's
listing of the same program stays compressed — it has the surrounding prose to
lean on, and it has to condense onto a slide.

The **code** must be identical in both, line for line: a student comparing the
download against the book should find the same program. Comments may differ
freely. `scripts/check_starters.py` enforces exactly that split, and is part of
Step 5.

### B-11e Cut the Arduino comparisons

> *"Get rid of how you would have done things in Arduino. Nobody cares."*
> — Petra, Day 9x

**Most ENGS 28 students have never used Arduino**, so a comparison explains the
familiar in terms of the unfamiliar: confusing for the majority, merely
nostalgic for the rest. The default is **cut**, not compress.

Banned: a slide devoted to an Arduino call; argument-by-argument mappings
(`Wire.beginTransmission()` → `i2c1_byteWrite()`); a tour of which Arduino
boards have which interrupt hardware; a paragraph or a sentence whose work is
to say what Arduino did instead.

The one surviving use is **naming**, once, the library a chapter replaces —
`attachInterrupt()`, `Wire.h`, `Adafruit_LEDBackpack.h` — where a student who
has met it would otherwise wonder. One clause, no mapping, no digression. If it
needs more than that, it goes.

*(History: this rule read "at most a sentence" until Day 9x, when Petra
restated it as above. Day 9's `attachInterrupt()` slide and its paragraph were
removed whole; the Day 9x draft grew them back. The reviewer brief that asks
for real-world grounding — `expert-embedded-industry` — is a likely source and
should be weighted down, not followed, on this point. `learner-arduino-veteran`
was retired from the committee for the same reason: an agent whose job is to
ask for more of a banned thing is worse than no agent.)*

### B-15 No stray apostrophe in a `<program>` listing

A lone `'` inside a listing opens a C character literal the highlighter never
closes, so **every line after it projects red**. It is invisible in the source
and obvious on the wall. Two Day 10 listings shipped this way for weeks
(`the command's identity`, `the colon's pair`), and a third was nearly added
while fixing them.

Reword rather than escape: "the command identity", "the colon pair", "X is
ignored" instead of "X = don't care". A real character literal (`'a'`) is fine.
`check_rules.py` enforces it.

### B-12 Write for adults — no cute framing

Students are adults; the prose is direct, technical, and plain (Petra, Day 8).
A relaxed instructor voice — "we'll", a light aside, a rhetorical question —
is fine; ornamental drama is not. Banned patterns, with the corrections Petra
made:

- Dramatized stakes: ~~"before it bites"~~, ~~"the case against captivity"~~,
  ~~"holds the CPU hostage"~~, ~~"Blinky sheds its last delay"~~.
- Strained metaphor and idiom: ~~"wearing the same letters"~~ → "using the
  same acronym"; ~~"belt-and-suspenders"~~; ~~"folklore"~~; ~~"the safety
  rope"~~; ~~"with its heart moved"~~ → "with its core moved"; ~~"never tears
  a period in half"~~ → "never changes the counting rate mid-period".
- Narrative hand-holding: ~~"Hold that thought"~~, ~~"the same trick played
  by hardware"~~, ~~"that is the entire magic"~~.
- Reassurance theater: ~~"nobody sits with a dark board alone"~~, ~~"that is
  a clock problem, not a bug"~~. State the rescue plainly; do not perform it.

The test: would the sentence survive in a well-written datasheet
introduction or a colleague's explanation? Precision-adding rewrites are
always welcome ("the period follows" → "the time period follows"; "That
switch is the UIE bit" → "This new behavior is enabled via the UIE bit").

**Not violations.** Established technical terms keep their names even when
they sound figurative — *magic numbers*, *handshake*, *heartbeat* (as a blink
pattern), *daisy chain*, *race condition*. A physical claim is not
condescension ("3.3 V through 10 kΩ easily exceeds that"); only telling the
*student* a task is easy is. A brief instructor aside or rhetorical question
is fine — "imagine keeping track of that" earns its place; "Hold that
thought" does not.

---

## S — Slides

Mechanics (markup, `@ref` rules, deck JSON, layouts) are in `AUTHORING-slides.md`.
These are the quality rules.

- **S-1 Content is top-aligned with real spacing.** Items get room to breathe;
  content is pulled to the top of the slide rather than vertically centered as a
  block.
- **S-2 Practice and predict slides leave writing room.** `room="yes"` (or
  `"room": true` on a deck ref) so students — and the instructor — can write an
  answer in class.
- **S-3 Captions are instructive, not descriptive.** One line: what to notice, what
  this shows, what to do. See B-7.
- **S-4 Layout signals meaning.** Talking points + supporting image → two-column;
  the diagram *is* the point → image-dominant; wide image + a few points → stacked;
  code or activity → full width; a **portrait** image → two-column, never
  image-dominant.
- **S-5 Solutions and instructor cues are never student-facing.** Solutions are
  `"instructor": true`; how-to-solve-it hints are `<note>`; timing goes in
  `presenterNote`.
- **S-6 No `<m>` math on slides** — the player has no MathJax. Write plain text
  (`V_IL`, `h_FE`, `R_lim`): the player typesets a single-letter variable plus
  `_subscript` as an italic symbol with a real subscript, so it *looks* like
  math without one. Two-letter heads are left alone on purpose, so RM names
  like `rc_w0` and `CK_CNT` stay verbatim (L-6).
- **S-7 One idea per slide.** See P-7.
- **S-9 Slides stand alone.** A slide must carry its reasoning without the book
  open beside it — the worked arithmetic, not just the formula; why a register and
  where its constant comes from, not just the line of code. Assume students who can
  hold more than two lines in their heads. If it will not fit, split the slide;
  do not thin it. (Reverses the earlier "a slide poses, the instructor explains".)
- **S-10 No debrief slides.** A slide that restates an activity's obvious
  conclusion reads as condescending. Put the takeaway in a `presenterNote`, or
  build it into the next slide's content.
- **S-8 The deck arc.** Title → brief review / where we're headed → agenda → timed
  `Part N` sections → recap or looking ahead.

### S-11 … S-28 — the voice

Derived from Petra's own hand rewrites, frozen as three specimens. **The
specimens are the specification; these rules are their summary**, and each
carries one of her actual before → after pairs, because the examples are what
make the rules usable.

| Specimen | What it covers |
| --- | --- |
| `plans/day8-voice-reference.diff` | the Day 8 deck and pre-class video — slide register, S-11…S-19 |
| `plans/day9x-voice-reference.md` | Day 9x prose — S-20, S-21, the count rule |
| `plans/day10-voice-reference.diff` | **Day 10 and its reading, 692 lines, 2026-08-08 — S-22…S-28.** The largest of the three, and the only one that is a full prose pass over a finished draft rather than a deck. Read it first when writing prose. |

These are slide rules, but the voice reads the same in the book's prose, and a
`<slide>` block and the paragraph it condenses should not sound like different
people (B-7, 5b).

- **S-11 Name the thing plainly; no metaphor as a label.** A metaphor *inside*
  an explanation is fine — "the `while` **plants** the program at the flag, the
  `if` **glances** once" survived her pass untouched. What is banned is metaphor
  used as the *name* of a thing, which the reader must decode before they can
  start.
  ~~"LED not blinking? The ladder"~~ → "LED not blinking? Steps to help you
  diagnose the fault".
- **S-12 Name what you point at, and where it lives.** No in-group shorthand: a
  student who missed that day must still be able to follow.
  ~~"Now open RM0490 §11.3, Table 40"~~ → "Now open the reference manual,
  RM0490 §11.3, Table 40".
- **S-13 "We" for what the class does, "you" for what the student does.**
  ~~"In class you build all of it"~~ → "In class we will build all of it" — but
  "You noticed this in the Lab 2 race game" stays "you", because the student is
  the one who did it.
- **S-14 Give the reason with the rule.** Where a terse slide asserts, say why.
  This *lengthens* slides, and that is correct — it is S-9, not a conflict with
  it.
  ~~"Both are written minus one"~~ → "Both the prescaler and counter start
  counting at 0, we therefore subtract one from the value we have in mind".
- **S-15 No manufactured stakes, urgency, or time pressure.** Cut the clause
  that raises the temperature; keep the one that carries information.
  ~~"Lab 5 asks exactly this at full scale — and next week, timers drive
  motors."~~ → "This is a great preparation for Lab 5." Also
  ~~"(≈ 7 minutes)"~~ in a student-facing subtitle, and ~~"Your turn."~~
- **S-16 Requirements, not slogans.** Keep the technical claim **exactly as
  strong**; change only the register. Softening the rhetoric is not softening
  the engineering — do not weaken a fact to satisfy this rule.
  ~~"Every variable an ISR shares with the rest of the program is volatile.
  Always."~~ → "…therefore needs to be declared volatile."
- **S-17 Support, don't challenge.** A question opens a discussion; it does not
  dare the student.
  ~~"Check both against a 48 MHz clock: neither survives — why not?"~~ → "Now
  imagine your clock was running at 48 MHz (which our chip can do): how could
  you make the 250 ms or 500 ms blink rate work?" And ~~"Still stuck? Flag it,
  grab the known-good copy…"~~ → "Still stuck? We're here to help!"
- **S-18 A title says what the slide is.** Not what it gestures at.
  ~~"Run it: Blinky that never waits"~~ → "Run it: Blinky with a (polled) timer
  and without `delay_ms()`".
- **S-19 Allow honest incompleteness.** Say when a rule has exceptions rather
  than implying it is the whole story.
  ~~"Both `TIM14_IRQn` and the handler name … come from one table in the
  reference manual."~~ → "…come from different places." (because they do), and
  the added "(Other behaviors are possible here as well.)"
- **S-20 A day never does the teaching.** *"Don't ever make the weekday the
  grammatical actor"* (Petra, Day 9x). **We** teach, **you** do the work, and a
  weekday is only ever *when*. Banned in every position where a day is the
  subject or the predicate of an act of teaching:
  ~~"Thursday explains why they still have to be sent"~~ → "we'll see on
  Thursday why they still have to be sent"; ~~"Thursday is where you find out
  why"~~ → "we'll find out on Thursday why"; ~~"Thursday starts by flashing
  `helloDisplay.c`"~~ → "we'll start on Thursday by flashing `helloDisplay.c`";
  ~~"not to understand every line, which is Thursday"~~ → "we'll go through
  every line on Thursday".
  Fine, and unchanged: a day as an adverbial ("On Thursday we'll look at…",
  "we'll see on Thursday why"), a day in a section title (structural, B-1), and
  a possessive naming real coursework ("Tuesday's timer program is what is
  due"). This generalizes: no period of the course — a day, a week, a lab, "the
  hour" — acts, wants, covers, says or explains anything.
- **S-21 Say the thing, not that there is a thing.** The armature *"N, and it
  is the one that…"* announces a quantity and then defers the content into a
  relative clause, so the reader has to wait a sentence for the subject. Her
  register puts the subject first.
  ~~"One question is left, and it is the one that makes the rest work."~~ →
  "One question is left: if SDA is the line carrying the bits, how does a device
  tell a START from an ordinary 1 going by?"; ~~"There is one rule, and
  everything else follows from it."~~ → "There is one rule: **SDA is allowed to
  change only while SCL is LOW.**"; ~~"One more piece, and it is the only
  moment in a transaction where the wire changes hands."~~ → "One more piece.
  After the seven address bits and the R/W bit the controller lets go of SDA…"
  A colon is usually the whole fix. Related to the count rule in
  `plans/day9x-voice-reference.md`: where the count is the *only* content, the
  sentence goes entirely rather than getting a colon.

---

**S-22 … S-29 come from the Day 10 pass** (`plans/day10-voice-reference.diff`),
which is the first full prose pass she has made over a finished draft. Where
they overlap with S-11…S-21 they are stronger, because that draft had already
been swept against S-11…S-21 and she still changed 692 lines.

- **S-22 Open a unit on its goal, plainly.** She *added* a sentence to the head
  of the chapter, before any hook or motivation: "The goal of this chapter is to
  communicate with and control a four-digit seven-segment display via our
  microcontroller." Say what we are trying to achieve, then why it is hard.
- **S-23 The book does not explain its own teaching strategy to the student.**
  Cut pedagogical self-justification wherever it appears.
  ~~"We do this deliberately: we ran Blinky before we explained a single
  register, and using a thing before opening it up works well as long as we do
  open it up afterwards."~~ → deleted whole; ~~"Two things were given to you
  today rather than explained, both deliberately."~~ → "Today you were given the
  I2C library without much explanation of the code therein."; ~~"which is the
  order this course usually takes"~~ → deleted; ~~"what makes the pair worth
  doing is that they look nothing like each other on the wire"~~ → "but they look
  nothing like each other on the oscilloscope."
- **S-24 No course lore and no war stories.**
  ~~"Get that backwards and the device never answers, which looks exactly like a
  wiring fault. It has happened to this course, once."~~ → "If you mix up the
  7-bit and the 8-bit address, the device never answers, which looks exactly like
  a wiring fault." The anecdote goes; the fact stays.
- **S-25 No classroom management in student-facing text.** Her instruction:
  *"you should never refer to any of that classroom management stuff."* That
  covers spare hardware, what to do if your homework did not build, who to ask,
  what to do while you wait, and how long a step takes. Deleted in this pass:
  the entire Part 2 rescue passage, ~~"If yours is not running, take the working
  copy from Canvas before we start"~~, ~~"and if you have been through all of
  that and still have nothing, raise your hand"~~, ~~"two minutes with the buffer
  and a rebuild will settle it"~~.
  **The one surviving form in the corpus is `Still stuck?  We're here to help!`**
  — five words, and nothing after them. It survived her pass in `ch-i2c.ptx`.
  Treat `ch-gpio-interrupts.ptx:382` and `ch-debugging.ptx:603`, which each carry
  a longer version, as **outliers to be cleaned up, not as precedent** — a Gate 2
  synthesis used them to overrule `checker-voice` on exactly this point, and her
  pass shows `checker-voice` was right.
- **S-26 Name the referent; do not point at it.**
  ~~"How many LEDs is that?"~~ → "How many LEDs are in this display?";
  ~~"the `H` in the program"~~ → "the `H` in the `helloDisplay.c` program";
  ~~"Which library function sends one"~~ → "Which I2C library function sends
  one"; ~~"Start with the one you have met before."~~ → "Recall the UART, which
  is another communication protocol that uses 2 wires only."
- **S-27 Supply the causal middle.** S-14 says give the reason with the rule;
  this is the same move inside an explanation, and it is what most of her
  insertions do. "the display then pulls it LOW" → "**the display, having
  recognized its address, then pulls SDA LOW**"; "`PE` is cleared before
  `TIMINGR`" → "**`PE`, which enables the peripheral,** is cleared before
  `TIMINGR`"; "the display data address pointer" → "**a pointer that holds the
  address of the RAM to which you'd like to write**". Where the draft names a
  mechanism, she says what it does.
- **S-28 Delete a count-armature; do not repair it.** S-21 said a colon is
  usually the fix. Her pass goes further and removes the frame.
  ~~"Two things to take from a failed transaction. The first is… The second
  is…"~~ → "A few notes about a failed transaction: …"; ~~"Three rows are all we
  need"~~ → "For now we mostly care about the rows named *System setup*, *Display
  setup* and *Dimming set*."

- **S-29 A slide's lead line is a sentence, not a banner.** Petra, 2026-08-08,
  on a deck where most slides opened with a fully bold line: *"I really don't
  like those. Can these become regular bullets?"* `<p><term>…</term></p>` renders
  the whole line bold; `<term>` is for marking a **term**. A short noun-phrase
  label may stay bold — `<term>Common cathode.</term>` followed by the
  explanation — but a whole sentence is ordinary text.
  ~~`<p><term>Your display looks steady, but at every instant most of it is
  dark.</term> There are two ways…</p>`~~ → `<p>Your display looks steady, but at
  every instant most of it is dark. There are two ways…</p>`
  Rule of thumb: if the bold runs past about four words, or ends in a full stop
  or a question mark, it is a sentence. Twenty-five leads in Day 10 broke this.

**Two calibrations that matter as much as the rules.**

**Her register is plain and explanatory, not terse.** Many of her replacements
are *longer* than what they replace — the `fig-firmware-layers` caption gained a
whole second paragraph, and the `fig-ht16k33-block` caption gained four
sentences explaining why the RAM is bigger than we need. Drafts keep compressing
toward the aphoristic; that is the wrong direction. Long, plain, fully-explained
sentences are hers. Clipped ones are not.

**Never compress her sentences to make a slide fit.** These two calibrations
collide with the frame, and the collision is where drafts lose her voice.
Restoring her register *will* overflow slides — nine of them on Day 10 — and
every time, the cheapest repair is to tighten her wording, which is exactly the
direction this section forbids. The legitimate levers, in order:

1. merge two bullets that had been split (you recover the inter-bullet gap);
2. delete text the adjacent code block or figure already states;
3. move a closing line out of a bullet into the slide's `<caption>`;
4. remove a blank line from a listing;
5. abridge the *listing* — never the prose — and say so in a `<note>`;
6. split into two slides, where both halves teach.

Shortening her prose is not on the list. If none of the six is enough, the slide
is carrying two ideas and wants splitting.

**"We" is the course, including for everything the course supplies.**
~~"a library we have not read"~~ → "a library **we'll hand to you**";
~~"this course has been handing you all term"~~ → "**we** have been handing you
all term"; ~~"the three bytes `helloDisplay.c` has been sending"~~ → "the three
command bytes **we have been sending**"; ~~"four characters that somebody else
chose"~~ → "four characters that **we** chose when writing the `helloDisplay.c`
program". "You" stays for what the student personally does.

**Not covered by these rules.** Petra's Day 8 pass made a few changes no rule
explains — see the end of `AUTHORING-slides.md`. Do not invent a rule to cover
them; ask.

---

## L — Standing language rules (mechanically checked)

| ID | Rule |
| --- | --- |
| **L-1** | Never write "working in pairs", "with your partner", or "before you leave". *Assigning* a grouping is given verbally, and so is end-of-class timing. Sequencing a student's own work is fine and is hers: "Work individually first, then compare your list with your table group" (2026-08-10). |
| **L-2** | No `%f` in printf examples — float printing is off by default and the STM32C031C6 has no floating-point hardware (Lab 4 Appendix A shows the setting that enables it). Scale to integers and print with `%d`. Where the caveat itself is being taught, mark the element `check-rules: allow L-2`. |
| **L-3** | No "gate" language for clocks. "Enable the clock", "until its clock is enabled" — not "open the gate". |
| **L-4** | "Prototypes", never "forward declarations". |
| **L-5** | Specific hardware names. "STM32C031C6", not "the target MCU". |
| **L-6** | Register, bit, and peripheral names match the reference manual exactly, including case. CMSIS device headers are all lowercase — `stm32c0xx.h`, `stm32c031xx.h` — even though the part is `STM32C031C6`. |
| **L-7** | American spelling throughout — "stabilize", "center", "labeled", "gray". |
| **L-8** | No manufactured time pressure — "in under a minute", "(≈ 7 minutes)" in student-facing text. Enforces S-15. |
| **L-9** | No slogan endings — "`. Always.`", "the entire point". State the requirement instead, just as strongly. Enforces S-16. |
| **L-10** | No challenge phrasing — "Your turn", "be ready to". Enforces S-15 and S-17. |
| **L-11** | "on Day N", never "in Day N" — or "tomorrow", since Day Nx follows Day N. |
| **L-12** | Complete sentences, always. No fragments. Every paragraph, slide bullet, lead line, task statement and feedback line has a subject and a verb. **Out of scope, by Petra's rulings (2026-08-12):** figure and slide *captions*, which keep the conventional noun-phrase style; the short bold noun-phrase *label* S-29 permits (`<term>Common cathode.</term>` followed by the explanation); **enumerated checklists**, where terse parallel items are the point — the compiler-error list in `ch-debugging.ptx`, the register recap in `ch-adc.ptx`, the three voltages to measure in `ch-intro-blinky.ptx`; titles and headings; code comments and in-listing annotations; table cells and figure labels. |

`scripts/check_rules.py` enforces L-1 … L-11 and warns on L-12, plus B-9, B-11,
B-11a, B-14, B-15 and S-4, image paths, unresolved cross-references and step
counts. Run it before every committee review.

L-8 … L-11 are the *lintable corner* of the voice rules — fixed phrases only.
L-12 is only partly lintable. `check_rules.py` **warns** on a list item that ends
without terminal punctuation, but only when it is *a lone fragment among
sentences* — if most of a list's items are fragments, the list is an enumerated
checklist and is exempt. That is the mechanical form of the ruling above: the
register of a checklist is enumeration, not prose, whereas one unpunctuated
bullet in a list of sentences is somebody writing a bullet badly. A trailing
bracket does not count as terminal punctuation, so "(anode to cathode)" is still
a fragment. The corpus is clean under this rule (2026-08-12). The rest of L-12 is
judgment, like S-11 … S-28.
The rest of S-11 … S-29 needs judgment and is deliberately not linted. Each was
validated against the corpus as it stood before the voice pass: together they
catch 7 real violations, three of them phrases Petra deleted by hand in
`plans/day8-voice-reference.diff`, with no false positive in any chapter file.

---

## Resolving conflicts

Rules collide, most often **rigor versus accessibility**. The resolution is not to
split the difference — that flattens both. It is P-2 with P-3: scaffold the crucial
step until the slowest student reaches it, *and* preserve genuine challenge for the
fastest. Depth is added at the top, not removed from the middle.

Where a conflict cannot be resolved this way, the committee synthesizer states the
trade-off explicitly and Petra decides. It does not get silently averaged away.

---

## Instructor-only content in the book

Anything that hands over work a student or a lab is supposed to do — a filled-in
driver function, a completed program, an activity's worked answer — goes inside
an `<instructor>` element:

```xml
<instructor>
    <p>The three functions, complete:</p>
    <program language="c"><code><![CDATA[ ... ]]></code></program>
</instructor>
```

It is **stripped** from the reading book (`web`), the authoring preview
(`web-edit`), the student deck (`web-deck`) and the PDF — not hidden with CSS,
*stripped*, so it is not in the page source either. It is rendered, boxed and
labelled, in the two instructor targets (`web-instructor` and
`web-deck-instructor`):

```bash
pretext build web-instructor     # or ./scripts/build-all.sh, which does all five
```

### Two axes, and they are not the same question

There are two ways a thing can be instructor-only, because they answer different
questions:

| | `<instructor>` element | `instructor="yes"` on a `<slide>` |
|---|---|---|
| Question | does this render *at all*? | does this slide exist in the *student deck*? |
| Param | `book.solutions` | `deck.solutions` |
| Rendered in | `web-instructor`, `web-deck-instructor` | `web-deck-instructor` |
| You project it | only if a deck refs it | yes — that is the point |

The deck JSON's `"instructor": true` is a **third** thing: it drives the player,
not the build — the badge in the instructor view, and dropping the slide from
`?student`. It must agree with the source marker, and `scripts/check_deck.py`
fails when it does not. Disagree one way and the student deck lists a slide
whose markup was stripped; disagree the other and it ships an answer.

A deck may ref an `<instructor>` block **directly** by its `xml:id`, instead of a
`<slide>` repeating the same answer next to it. Prefer that: two copies of one
solution drift, and the drift is invisible until you project the stale one.

### The student deck is built with a script, not a bare target

```bash
./scripts/build-deck.sh          # web-deck + filter its deck list
```

`pretext build web-deck` alone is **not** enough. The XSL strips instructor
slides from the pages, but PreTeXt copies `assets/decks/` verbatim into
`external/`, so the deck list beside those stripped pages still names all 29 of
them — the player fails on each, and the titles ("Solution — blink, dim, write")
are readable in the JSON. `scripts/filter_student_decks.py` fixes that up, and
`build-deck.sh` is the two steps as one command.

This is not hypothetical: a `watch.py web-deck` left running from an older
`preview-slides.sh` put the unfiltered list straight back on every save. Check a
built student deck with:

```bash
python3 scripts/filter_student_decks.py --check output/web-deck
```

**Do not deploy `output/web-instructor` beside the student book.**

You rarely build it by hand. `./preview-edit.sh` builds and serves both books
side by side — the student book on **:8931** (with Alt-click editing) and the
instructor book on **:8932** — and its file watcher rebuilds *both* on every
save, so the solutions view is never a build behind the page you are writing.
Both are one click apart on the Launchpad's ENGS 28 Author tile. Editing only
happens on :8931; `web-instructor` carries no `ptx-edit.js`.

Two things to know.

**A reveal is not automatically a solution.** A derivation the class does
together — working `0x21`, `0x81` and `0xEF` out of the command table — is
teaching and stays in the book. What goes in `<instructor>` is the thing whose
value is that the student produced it: the finished `SevenSeg_init()`, the
finished driver, the answer program.

**The PDF was a separate leak, and it was a real one.** A strip-by-default
element needs a template in **both** stylesheets. `xsl/engs28-latex.xsl` had one
for `<slide>` and `<sim>` but not for `<instructor>`, so PreTeXt's stock
fallback recursed into the children and typeset every solution into the PDF —
*without* the "Instructor only" label, which only the HTML template produces, so
it read as ordinary book prose. Fixed 2026-08-11.

It hid for so long because the print build **dies on an SVG in Chapter 3** and
never reaches Chapter 9, where the blocks are — while still reporting
`Success! Built requested target(s) without errors`. Do not verify the print
strip by reading the PDF. Verify the generated LaTeX, which is fast and
complete: add a `latex` target temporarily and grep `main.tex`.

```xml
<target name="latex-check" format="latex" xsl="engs28-latex.xsl" output-dir="latex-check" />
```

```bash
pretext build latex-check && grep -c 'The three functions, complete' output/latex-check/main.tex   # expect 0
```

**The search index is a separate leak, and it was a real one.** PreTeXt builds
`lunr-pretext-search-index.js` in its own XSL modes, which walk the *source*
tree rather than the rendered HTML — so stripping an element from the page does
not remove it from the index. Before this was fixed the student book's search
index carried every `<slide>` presenter note and, once solutions were wrapped,
would have carried every solution: searching `SevenSeg_write` returned the
finished function. `xsl/engs28-html.xsl` now has four templates
(`search-node-text` and the two `search-block-docs-*` modes) that suppress both
elements. **If you add another strip-by-default element, it needs the same four
templates** — plus a template in `engs28-latex.xsl`, per the PDF note above.
Three places, and only the page is obvious. The way to check the index is to
grep the built file, not the page:

```bash
grep -c 'The three functions, complete' output/web/lunr-pretext-search-index.js
```
