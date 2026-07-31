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

Every activity that asks students to write code has a corresponding solution
authored as an instructor-only slide (`"instructor": true`). No exceptions —
including open-ended design activities, which get a *worked example* solution even
though student answers will differ.

### P-11 Datasheet literacy is an early, recurring thread

Every chapter contains at least one moment where the answer comes from the
datasheet or reference manual, and the text **names the document, table, and
section** so the student can repeat the lookup. Not "check the datasheet" but
"Datasheet Table 12, *Pin assignment and description*".

This starts in the first weeks and reinforces every chapter — it is the skill that
outlives the specific chip.

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
- **S-6 No `<m>` math on slides** — the player has no MathJax. Plain text (`V_IL`).
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

---

## L — Standing language rules (mechanically checked)

| ID | Rule |
| --- | --- |
| **L-1** | Never write "working in pairs", "work individually", or "before you leave". Grouping is given verbally. |
| **L-2** | No `%f` in printf examples — float printing is off by default and the STM32C031C6 has no floating-point hardware (Lab 4 Appendix A shows the setting that enables it). Scale to integers and print with `%d`. Where the caveat itself is being taught, mark the element `check-rules: allow L-2`. |
| **L-3** | No "gate" language for clocks. "Enable the clock", "until its clock is enabled" — not "open the gate". |
| **L-4** | "Prototypes", never "forward declarations". |
| **L-5** | Specific hardware names. "STM32C031C6", not "the target MCU". |
| **L-6** | Register, bit, and peripheral names match the reference manual exactly, including case. CMSIS device headers are all lowercase — `stm32c0xx.h`, `stm32c031xx.h` — even though the part is `STM32C031C6`. |
| **L-7** | American spelling throughout — "stabilize", "center", "labeled", "gray". |

`scripts/check_rules.py` enforces L-1 … L-7, image paths, and step counts. Run it
before every committee review.

---

## Resolving conflicts

Rules collide, most often **rigor versus accessibility**. The resolution is not to
split the difference — that flattens both. It is P-2 with P-3: scaffold the crucial
step until the slowest student reaches it, *and* preserve genuine challenge for the
fastest. Depth is added at the top, not removed from the middle.

Where a conflict cannot be resolved this way, the committee synthesizer states the
trade-off explicitly and Petra decides. It does not get silently averaged away.
