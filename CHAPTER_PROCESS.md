# The per-chapter workflow

How a chapter of this book gets written, from nothing to Petra's sign-off. The
goal of the process is that **the draft that reaches her is already near-final** —
her corrections should be judgment calls, not the same twelve fixes every time.
Those twelve fixes are now rules, in `AUTHORING-book.md`.

- **What to write** → `AUTHORING-book.md` (rules P-n, B-n, S-n, L-n)
- **Slide markup mechanics** → `AUTHORING-slides.md`
- **Build, git, deploy** → `AUTHORING.md`
- **The prompt that starts a chapter session** → `plans/CHAPTER-GENERATION-PROMPT.md`

That prompt is this document compressed to what a fresh session needs, as gates
rather than steps. This file is the reference behind it.

---

## The workflow

**Two deliveries, not one: the book, then — after Petra has passed it — the
deck.** A slide condenses a paragraph, so a slide built from prose she has not
passed inherits wording she is about to change. On Day 10 twenty-two of them did,
and each then needed rewriting *and* refitting — more work than everything else
in that session combined. Figures settle with the book, for the same reason: her
annotated figures arrived after the slides had been built, and each one forced
caption rewrites plus two figures moving to slides of their own.

The step numbers are **names**, not an order — other files cite "Step 0" and
"Step 5b", so they stay fixed even though Step 4 now runs late. Execution order
is top to bottom.

| # | What runs | Produces |
| --- | --- | --- |
| 1 | **Step 0** | ground truth: driver code, downstream constraints, datasheet/RM pages |
| 2 | **Step 1** | mined old deck: arc, speaker notes, rebuilt annotated images |
| 3 | **Step 2** | the lesson plan (1 page) **+ the outline** |
| 4 | **Gate 1** | the small panel, on both → fixes applied |
| 5 | **Step 3** | the book: pre-class, in-class `Part N`, reference, **figures settled** |
| 6 | **Gate 1.5** | the voice probe, on the first subsection, as soon as it exists |
| 7 | **Step 5** | mechanical checks pass |
| 8 | **Gate 2** | the book's committee → prioritized change list, applied |
| 9 | **Petra, pass 1** | **she passes the book** |
| 10 | **Step 4** | `<slide>` blocks + deck JSON, condensing the **in-class** sections she passed |
| 11 | **Step 5b** | the fit check, and the book/slide cross-check |
| 12 | **Gate 3** | the slide-facing panel → change list, applied |
| 13 | **Petra, pass 2** | **she passes the deck** |
| 14 | **Step 6** | her general corrections become rules |

Four gates, not one. A problem with the arc or the objectives costs one page to
fix at Gate 1 and a whole chapter at Gate 2. A wrong register costs a sentence at
Gate 2 and a slide rewrite plus a refit at Gate 3.

**A committee gate is not optional, and it is not the place a draft first meets a
reviewer.** On the I2C week Gate 2 was not run at all until Petra asked *"Are you
using the committee we constructed?"* — so a wrong hardware claim, a slide of
undefined symbols and the same six-field list enumerated four times in ten
minutes all reached her first. Nothing goes to her until the committee for that
delivery has run and its list is applied.

---

### Step 0 — Ground truth

Before reading anything written *about* the topic, collect what is actually true.

1. **The driver.** Find the real `.c`/`.h`. Check, in order: the repo
   (`assets/images/Day*/`), then **the old deck's code slides** — full driver
   listings are frequently pasted there as text and are recoverable with
   `scripts/pptx_mine.py`. Only if both fail, ask Petra.
   Never reconstruct driver code from memory (B-6).
2. **Downstream constraints.** Read the lab this chapter feeds (`assets/Labs/`),
   and note what the chapter must have covered by then.
   **The lab is a constraint, not the goal (P-13).** In-class and homework learning
   have their own objectives; do not let the lab set the chapter's scope.
3. **The datasheet / reference manual pages.** Identify the specific tables and
   sections students will be sent to, by name and number (P-11).
4. **Continuity.** What has been taught already, and what later chapters depend on
   this one for. Check the deferred-topics list at the bottom of this file.
5. **The structural convention, read off the sibling chapters.** Before designing
   the day, open the chapters that already do this shape of day and see how they
   do it — do not reason it out. An **x-day has no pre-class reading**:
   `ch-debugging.ptx` (Day 7x) and `ch-io-datasheets.ptx` (Day 5x) have no Before
   Class section at all, and `ch-switches.ptx` puts the material between Day 3
   and Day 3x in plain titled sections. Day 9x was designed around a protocol
   reading that should never have existed, and had to be rebuilt after Petra
   said so. This costs five minutes at Step 0 and a day's work at Gate 2.

Note what you found and what is missing. Missing driver code blocks Step 3, not
Steps 1–2 — keep going.

**Then ask Petra your questions**, as one short list, and keep working on
everything that does not depend on the answers. She would rather answer four
questions than correct forty sentences, and B-11c facts — what students have in
front of them, whether spares exist, what happens if a connection is reversed —
cannot be recovered from plausibility.

### Step 1 — Mine `ClassSlidesOLD`

The old deck is the authority for the **intended in-class arc**.

```bash
python3 scripts/pptx_mine.py assets/ClassSlidesOLD/DayNN-Name.pptx
```

Extract:

- **The arc** — slide titles in order. This is the teaching sequence Petra actually
  used, including the asides and the "wait, what?" moments that a topic-ordered
  rewrite destroys.
- **Speaker notes** — often the richest source in the whole deck. They contain the
  explanations, the analogies, and the in-class demonstrations (the ADC deck teaches
  successive approximation as a live number-guessing game, which existed *only* in a
  speaker note).
- **Code slides** — the real driver, as text (see Step 0).
- **Images, with their annotations rebuilt** (P-12):

```bash
python3 scripts/pptx_annotate.py assets/ClassSlidesOLD/DayNN-Name.pptx --slide 17
```

The annotations are PowerPoint shapes layered over the picture; plain media
extraction drops them, which is why the images currently in the rough chapters are
worse than the originals. The script re-composites them. Fall back to a LibreOffice
render for any figure the script can't reproduce.

**Three traps in that script, all of which shipped broken figures on the I2C week.**
It drops the *text* of any annotation longer than `--max-text` (default 60
characters) and draws the empty box instead, silently — which cost
`firmware_layers.svg` the two layer labels the figure exists to teach. Pass
`--max-text 200`, and check what it prints against `--list`. It composites only
*one* picture per figure, so a slide that layers several (Day 9x's three timing
tables) comes out with every annotation over the wrong one. And it draws each
paragraph as a single unwrapped line, so a callout that PowerPoint wrapped into a
narrow box runs off the edge of the crop; the fix is to split the `<text>` element
by hand.

### Step 2 — The lesson plan (one page)

Write `plans/dayNN.md`:

- **The class length, on its own line, taken from `CLAUDE.md`'s standing facts** —
  odd day = Tuesday 110 min, `Nx` = Wednesday 50 min, even day = Thursday 110 min.
  Write the rule you applied, not just the number. Day 11's plan opened at ~66
  minutes against a real 110, and **that one wrong premise shaped the whole
  chapter** (see *What Day 11 taught us*): every Part was budgeted thin, Part 1 got
  six minutes for material her slides spend two slides on, and both logistics
  reviews were answering a question that had been mis-posed.
- **A coverage table against her mined arc** — every slide of `ClassSlidesOLD`,
  and which Part carries it or why it is dropped. This is the cheapest place in
  the whole process to notice that a step of hers has no home; a missing row costs
  a line here, a section at Gate 2, and a round of her time after that.
- **Objectives** — what a student can do afterwards.
- **The CRUCIAL step** (P-2) — one sentence. The thing every student must reach.
- **The STRETCH** (P-3) — what the fastest students do instead of waiting.
- **The activity sequence** — Part 1..k, each with a time budget, marked as
  do / predict / explain / reveal.
- **Datasheet moment** (P-11) — which lookup, which table.
- **Hand-offs** — what pre-class reading must establish; what the homework is; what
  the lab downstream needs.

One page. If the crucial step won't fit in a sentence, the class isn't designed yet.

Then write the **outline** beside it: the `Part N` titles, and two or three lines
per part on what it teaches and what students do. Gate 1 reviews both together.
The outline is the cheapest artifact on which a reviewer can see the shape of the
finished chapter, and reviewing it costs a paragraph of rewriting where the same
finding on a finished draft costs a section.

### Gate 1 — the plan and outline review

Run `checker-arc-fidelity` here **first**, against the plan. It is the cheapest
gate at which her arc can be compared to what is being built, and Day 11 is the
case for it: her slides 7 and 8 are the entire motor physics, the plan gave Part 1
six minutes as a *"recap of reading/video"*, and the physics reached the chapter
only when Petra asked *"Where did the actual physics go?"* — two gates and eleven
reviewers later.

Small panel, minutes to run:

```
expert-active-learning, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-firstgen-novice, learner-anxious-nonhardware
```

Asking: is the arc sound, is the crucial step actually crucial and actually
reachable, does the timing survive contact with a real classroom, does it depend on
anything not yet taught? Fix the plan, then proceed.

### Step 3 — Write the book

Per `AUTHORING-book.md`. Order within the chapter:

1. Objectives and chapter introduction.
2. **Before Class** reading + reading questions (B-2, B-3).
3. In-class `Part N` subsections matching the lesson plan (B-4), each with its
   figures, activities, and instructor solutions.
4. Reference material at the end (B-10).

Write the prose and the figures. **Do not write `<slide>` blocks yet** — they
are Step 4, after her pass.

**Settle the figure inventory here**, as part of this delivery: which figures
exist, which are hers, which need rebuilding with `pptx_annotate.py`, and which
do not exist and must be asked for. Captions are then written once, against final
images.

### Gate 1.5 — the voice probe

As soon as the **first** subsection of prose exists, stop and run `checker-voice`
on it alone. Apply what it says before writing the rest.

Register is systemic. If the voice is wrong in the first subsection it is wrong
in all of them, and a sweep bolted on at the end produces a chapter that is half
hers — worse than either. She rejected a whole draft with *"You are not speaking
in my voice."*

One scoping caveat, found the hard way: **acronym first-use is chapter-wide**, so
on an extract tell the agent what earlier sections already expanded, or its
acronym findings are noise.

### The order of review, and why it matters

**Never generate slides from prose Petra has not passed.** This is the one
sequencing error that costs a whole session, and it is why the workflow above
delivers twice. Day 10's slides were condensed from a draft she later
hand-rewrote, so twenty-two of them inherited pre-pass wording and each needed
rewriting *and* refitting — more work than everything else in that session
combined, all of it avoidable.

**Delivery 1 — the book.** The in-class sections are the slide source, so
nothing downstream can be generated until they are passed. Figures go with them:
settle the inventory *before* slides, or captions get written twice. Pre-class
reading and Reference sections have nothing derived from them, so they ride along
in this delivery without blocking anything.

**Delivery 2 — the deck**, condensing **the in-class sections only**. Pre-class
reading and reference material are read, not projected. The one exception is a
**pre-class video deck** for a day that has one — `assets/decks/day8video.json`
is the only one so far, and it refs the pre-class and reference subsections on
purpose. Do not "fix" it to point at Part N.

**The slide pass feeds back into the book, and that leg is not cleanup.**
Projection is a different reading mode — no page to scroll back on, symbols
arriving in a fixed order, nothing available but what is on the wall — so it
surfaces a class of book defect that reading the page does not. Most of Petra's
Day 10 *slide* feedback turned out to be *book* defects: a forward reference to
a file introduced two parts later, an activity duplicated between two parts, a
lesson ordering that showed the test harness before the thing it tests, a naming
clash the prose had only muttered about, missing `#define` provenance, a missing
datasheet reference, and a derivation the prose asserted but never showed. Fix
those in both places, and expect the book to improve because of the deck.

### Step 4 — Condense into slides, from the text she passed

**This runs after Petra's pass 1, not before it.** Start by reading what she
changed — `git diff` from the commit before her edits — and condense from the
post-pass text. **Condense the in-class `Part N` sections, and only those.** If a
slide seems to want material from the pre-class reading, either the in-class
section is missing a step it should teach, or the slide should not exist. A
*figure* may legitimately come from the reading, via the deck's `refPage`.

Now author the `<slide>` blocks beside the prose, and the deck JSON.
See `AUTHORING-slides.md`.

This is deliberately late, and deliberately mechanical: the lesson plan already
fixed the arc, so this step is condensation, not design. If a section resists
condensing to a slide, that is a signal the section is not clear yet — fix the
section.

**Slides are written in Petra's voice — rules S-11 … S-29** in
`AUTHORING-book.md`, derived from her own hand passes and frozen as three
specimens: `plans/day10-voice-reference.diff` (692 lines, her only full prose
pass over a finished draft — read it first), `plans/day9x-voice-reference.md`,
and `plans/day8-voice-reference.diff`. The rules summarize them, and the examples
in them are what make them usable. In short: name things plainly, say where they
live, give the reason with the rule, and drop manufactured urgency — while
keeping every technical claim exactly as strong (S-16 softens rhetoric, never
engineering).

**Her register is plain and explanatory, not terse, and several of her rewrites
are longer than what they replaced.** Restoring it will overflow slides. The six
legitimate ways to make one fit are listed under the S-22…S-28 calibrations in
`AUTHORING-book.md`; shortening her prose is not one of them.

The same voice applies to the prose the slide condenses. A `<slide>` block and
its paragraph are separate texts, so a fix to one is not a fix to the other
(Step 5b).

Remember the deck may legitimately diverge from the reading (P-9): the book may
show worked code that the deck presents as a fill-in-the-blank skeleton.

### Step 4b — Walk the arc against her old deck, and the prose against the slides

**Two mappings, both of which Day 11 got wrong and nothing caught.**

**The arc.** Put the mined slide titles from Step 1 beside the deck you just
built and read them in parallel. Step 4 condenses the book's `Part N` sections,
so the deck inherits whatever those sections happen to contain — and if her arc
had a step the book folded into a paragraph, the deck simply does not have it.
Day 11 opened Part 2 on *how to control an H-bridge* with no slide saying what
one is, because her slides 9 and 10 (reverse the polarity; the four switches are
pMOS and nMOS) had become two paragraphs with no `<slide>` block. She found it,
five rounds in: *"you just jump into how to control the H-bridge, without any
review of what an h-bridge is."*

**The paragraph mapping.** Walk the in-class prose paragraph by paragraph and
confirm each one either has a slide or was deliberately left off. The same walk
catches a slide carrying two paragraphs' worth — Day 11's counter/compare slide
had a fifth bullet condensing the paragraph *after* its figure, which is why it
was 196 px over.

`checker-arc-fidelity` does this walk at Gate 3 and reports both mappings as
tables; run it there rather than doing it by hand. Step 4b remains the author's
own pass, because the reviewer runs after the deck is built and this is cheaper
to fix before.

Her old deck is also the authority for **layout**, not just sequence — see
`AUTHORING-visual.md` Rule 3. Day 11's four-relationships slide went through three
shapes before landing on the one her slide 7 had used all along.

### Steps 3′ and 4′ — the PILOT ordering: the student's experience first

**Status: pilot, one chapter. Day 11x runs it; Day 11 is the control.** The order
above stays in force everywhere else until this is judged.

Petra's proposal, 2026-08-18, after Day 11 took five rounds:

> *"Is it better to start with the pre-class reading section and the slides, review
> those, since that's really the student experience, and then after all that's
> reviewed, create the in-class narrative directly from the slides?"*

**Why it should work.** Her old slides are discrete teaching steps; the chapter
turns them into continuous prose inside `Part N`, and the deck is then condensed
back out of that prose. Prose has no step boundaries, so the boundaries have to be
guessed on the way back — which is exactly how two of her Day 11 steps returned as
clauses inside a paragraph about something else. Nothing was deleted; the shape was
lost in the round trip. This ordering removes the round trip: **her deck → our
deck**, one lossy hop instead of two. It also puts the harder constraint first,
since a figure that works in the book routinely fails on the wall.

**It preserves the invariant the current order exists for.** Slides are built from
the plan she passed at Gate 1; she then passes the slides; the prose is written
from passed slides. Nothing is ever built on unpassed text — the Day 10 lesson
survives with the arrows reversed.

| | Step | Artifact |
| --- | --- | --- |
| 3′ | **Write the student-facing half** | the pre-class reading (if the day has one), and the in-class **skeleton**: subsections, figures, `<activity>` blocks with their `<instructor>` answers, `<slide>` blocks, and the deck JSON. No connecting prose yet. |
| | **Gate 2′ — the student-facing gate** | the reading gets the book core; the slides get the deck panel. `checker-arc-fidelity` runs across both. Then **delivery 1 to Petra.** |
| 4′ | **Write the in-class prose from the passed slides** | each paragraph expands the slide beside it. |
| | **Gate 3′ — the prose gate** | `checker-voice` leads, `checker-arc-fidelity` runs the paragraph↔slide mapping in the easy direction, then **delivery 2.** |

**Three guards, and the pilot is not a fair test without all three.**

1. **Gate 1.5, the voice probe, moves to Step 4′** and runs on the *first*
   subsection of prose before the rest is written. It never ran on Day 11.
2. **The prose is expected to be longer than the slide it expands.** The slide is
   the skeleton, not the target. The failure mode of this ordering is prose that
   reads like expanded bullets, which is precisely the register the S-22…S-28
   calibrations forbid — *"her register is plain and explanatory, not terse."*
   Compression toward the slide is the thing to watch for.
3. **Gate 3′ is a real gate.** The artifact reviewed last is the one a student who
   missed class depends on; it does not get a rubber stamp.

**What this ordering does not fix,** so do not expect it to: the class-length
premise (Step 2 and Gate 1), activities that are too easy (P-17), her annotated
figures being ignored (P-12), or the need for the arc check at every gate. Day 11
lost the physics before any artifact existed.

**How it is judged.** Two numbers, recorded in `reviews/day11x-pilot.md`: how many
review rounds Petra spends, and what fraction of her notes are *"this isn't what I
teach"* versus *"this doesn't read right"*. Day 11 was five rounds, and the first
kind dominated.

### Step 5 — Mechanical checks

```bash
python3 scripts/check_rules.py source/ch-NAME.ptx    # L-1..L-6, image paths, step counts
python3 scripts/check_starters.py                    # handout code == book code
pretext build web-deck                               # must build clean
```

Plus: every deck `ref` resolves; every coded activity has an instructor solution
(P-10); code matches the driver (B-6).

**The handout and the book are different documents (B-13).** A starter `.c`
carries fuller commentary than the book's listing of the same program — the
student who opens only the file should not need the book. `check_starters.py`
strips comments from both and compares the code, so the commentary can grow
while the program cannot drift. Register a new pair in its `STARTERS` list.

Fix everything here — the committee's time should go to teaching, not typos.

**Look at every rebuilt figure.** `pptx_annotate.py` will happily composite the
wrong picture: a slide often carries several, and the largest is not always the one
the caption describes. Render each and check it shows what you claimed:

It fails in two further ways, both found on Day 9's EXTI signal-path figure and
both invisible unless you look:

- **It crops to one picture and drops the rest of the slide.** That figure's
  blue path ends at the NVIC, inside a Cortex-M0+ box Petra had drawn *below*
  the picture. The script kept the picture and discarded the box, so the
  diagram's destination simply did not exist — and no amount of fixing arrows
  recovers something that was cropped away.
- **It gets arrow directions wrong.** Two arrows came out reversed, one of them
  pointing back into the multiplexer.

When a rebuilt figure disagrees with the original, **ask for the original**
(P-12) rather than patching the composite. Two rounds of arrow-patching on this
one figure fixed nothing, because the real defect was the crop.

```bash
qlmanage -t -s 900 -o /tmp assets/images/DayNN-Name/fig.svg
```

### Step 5b — Cross-check every book fix against the slides

**Any change to book prose or a caption must be checked against the `<slide>`
blocks that condense it.** They are separate text: fixing "enters at the pointed
end" in a figure caption does not fix the slide caption that says the same thing,
and the build will not tell you. Petra found exactly this on Day 7.

```bash
# every slide block, next to the prose it condenses
grep -n '<slide xml:id=' source/ch-NAME.ptx
```

**The check is reuse, not deletion.** This is the part that is easy to get
wrong, and getting it wrong costs a whole pass. Diffing her hand pass for text
she *removed* and grepping the slides for it finds only the slides that kept a
sentence she cut — on Day 10 that method found **four**. The real number was
**twenty-two**, because the larger class is slides that *paraphrase where she
had already written the sentence*. Nothing was deleted; the slide just said it
worse:

| the slide said | she had written |
| --- | --- |
| "On paper, before any of this is code." | "Start on paper, not by writing code." |
| "…and what to?" | "…and what would you change it to?" |
| "Phone camera, slow-motion mode, then step through the clip." | "Put your phone's camera into its slow-motion mode and point it at the display, then play the clip back and step through it." |

So: for **every** slide in the day, open the paragraph or activity it condenses
and ask *did she already write this sentence?* If so, use hers. The failure
signature is recognizable once you know it — the slide is **terser than the
prose and reads as a summary of it**. That is backwards; see the "never compress
her sentences" calibration in `AUTHORING-book.md`.

Two more things a slide can get wrong that no diff will show:

- **a claim the book has since retracted.** Day 10's findings slide still said
  "ChatGPT never zeroes `TIM14->CNT`" after the book had replaced that with the
  `TIM_EGR_UG` finding, so the projector was contradicting the chapter.
- **numbers that appear nowhere in the book.** The same day's hang slide had
  invented "about ninety microseconds"; the book says "long before the ninth
  clock pulse".

Then the deck's own glue: `recap`, `agenda`, `prompt` and `section` entries are
authored in the JSON, not the book, so they drift independently and silently.
Read them against the section they introduce.

### Gate 2 — the book's committee

*This runs before Petra's pass 1, on the book — Steps 4 and 5b above belong to
delivery 2 and come after her pass. The file is ordered by topic; the table at
the top is ordered by execution.*

Run the **standing core of 10** plus any rotators the chapter calls for (the
roster and the selection table are in `.claude/agents/README.md`), then the
synthesizer, which returns a **prioritized, actionable change list** with rule
IDs. Apply it.

Running all twenty is only worth it for a chapter unlike anything done before.

**Start the three `checker-*` agents first and scope them.** They cost 100–180k
tokens each on one day's material, and `checker-technical-accuracy` run as a
single unscoped sweep has cost 22 minutes and 250k — which is precisely why it
gets skipped. Run it **per `Part N` in parallel**, plus one whole-chapter
invocation that does nothing but its self-contradiction read. Everything else in
the core is cheap.

**Write every reviewer's report to `reviews/dayNN-gate2.md` before running the
synthesizer.** The synthesizer reads that file; it cannot consolidate reports that
exist only in a chat transcript, and it will (correctly) refuse to invent them. The
reports are also the evidence for which reviewers earn their keep.

**Give the visual reviewer the rendered figures, not just their paths.** The single
biggest defect class the pilot found was *wrong or mislabelled figures* — captions
promising what the image does not show. That is invisible in the source and obvious
on sight.

PyMuPDF renders SVG, embedded bitmaps and all, so a whole chapter's figures can be
laid out for the reviewer under their own `xml:id`s in one pass:

```python
import fitz                      # also opens .svg, not only .pdf
page = fitz.open(svg_path)[0]
page.get_pixmap(matrix=fitz.Matrix(3, 3)).save(f"{out}/{fig_id}.png")
```

Point the reviewer at that directory. On the I2C week it caught a command-table
figure whose caption promised a row the crop did not contain, and a caption that
put a scope trace's handover blip on the wrong side of the ACK.

### Gate 3 — the deck's committee

The slide-facing reviewers only, per `.claude/agents/README.md`, into
`reviews/dayNN-gate3.md`, then the synthesizer, then apply. `learner-in-the-room`
matters most here — it walks the deck in projection order asking what each slide
adds that the one before it did not — and `checker-voice` reads the slides
against the prose they condense, which is the only automatic check on Step 5b
there is.

**The slide pass feeds back into the book, and that leg is not cleanup.**
Projection is a different reading mode — no page to scroll back on, symbols
arriving in a fixed order, nothing available but what is on the wall — so it
surfaces a class of book defect that reading the page does not. Most of Petra's
Day 10 *slide* feedback turned out to be *book* defects: a forward reference to a
file introduced two parts later, an activity duplicated between two parts, a
lesson ordering that showed the test harness before the thing it tests, a naming
clash the prose had only muttered about, missing `#define` provenance, a missing
datasheet reference, and a derivation the prose asserted but never showed. Fix
those in both places, and expect the book to improve because of the deck.

### Step 6 — Sign-off, and closing the loop

Petra reviews a near-final draft — the book at pass 1, the deck at pass 2. Her
corrections are fed back into `AUTHORING-book.md` as new rules if they are
general, with her before → after pair beside each one, because the examples are
what make a rule usable. That is what keeps the next chapter cheaper than this
one. Update the chapter status table below in the same commit.

If a correction is *not* general, say so rather than inventing a rule to cover
it. An over-broad rule is how a later sweep flattened `plants` to `holds` on a
slide — a metaphor she had deliberately left standing.

---

## Definition of done

Two checklists, because there are two deliveries. **Delivery 1 is everything
down to Artifacts-that-are-not-slides; delivery 2 is the deck block.** A chapter
is done when both are true.

**Structure**
- [ ] Objectives stated; every objective is actually taught and practiced
- [ ] Before-class reading stands alone without hardware or class (B-2)
- [ ] In-class sections are `Part N` subsections matching the lesson plan (B-4)
- [ ] Reference material is at the end, not inline (B-10)
- [ ] No concept taught twice (B-8)

**Teaching**
- [ ] The crucial step is named and scaffolded to the slowest student (P-2)
- [ ] A genuine stretch exists for the fastest (P-3)
- [ ] No forward references — verified by reading in order (P-1)
- [ ] Every abstract idea has a visual (P-4)
- [ ] First-encounter concepts get a mini-arc, not one dense unit (P-7)
- [ ] At least one datasheet/RM lookup, named by table and section (P-11)

**Correctness**
- [ ] All code matches the real driver's idiom (B-6)
- [ ] Reading-question answers *and* distractor feedback match real behavior (B-3)
- [ ] Register and bit names match the reference manual (L-6)
- [ ] `check_rules.py` passes (its own rule set, plus image paths and step counts)
- [ ] No discovery is answered ahead of itself, **including inside a figure** (P-15)
- [ ] Nothing students write is introduced after the harness that tests it, and no task appears twice (P-16)

**Artifacts — delivery 1**
- [ ] Every coded activity has a solution, in an `<instructor>` element (P-10)
- [ ] Images are the annotated versions, cropped to what matters (P-12, B-11)
- [ ] Every figure the day needs exists, or is on the list you sent her
- [ ] Book captions describe (B-7)

**Artifacts — delivery 2, the deck**
- [ ] Every slide condenses **post-pass in-class** prose, reusing her sentences (Step 5b)
- [ ] Every activity's solution is in the deck as an instructor-only entry, and in no student-facing one (P-10)
- [ ] Slide captions instruct (S-3); no slide lead is a bold banner (S-29)
- [ ] Deck built, every `ref` resolves, arc matches the lesson plan (S-8)
- [ ] Practice/predict slides have writing room (S-2)
- [ ] Every slide that carries a figure has been **looked at**, not only measured
- [ ] `./scripts/build-deck.sh` clean; student view (`?student`) hides solutions

**Sign-off**
- [ ] Gate 2's change list applied, and Petra passed the book
- [ ] Gate 3's change list applied, and Petra passed the deck
- [ ] Any general correction she made is now a rule in `AUTHORING-book.md`
- [ ] The chapter status table above is updated

---

## Deferred topics — do not forget

- ~~**BSRR register** — introduce in `ch-gpio-interrupts.ptx` (Day 9)~~ — **SPENT
  (Day 9 authoring, 2026-08-04).** It is Part 7, `subsec-day9-race`, staged in five
  beats on the old deck's own "cautionary tale" (slides 54–58): two working programs
  → the `counter++` disassembly → the same shape on `ODR` → predict the fix, then
  read it off RM0490 §6.4.6's note → what BSRR does *not* do. Students **write** the
  BSRR line rather than watching it (Gate 1, active-learning), and the homework
  requires one. Two things learned worth carrying forward: the old deck stages the
  race on a *variable*, which is the right on-ramp to the register version; and
  **BSRR has no atomic toggle**, so it fixes the set and the clear and does not
  rescue `ODR ^= LED` — say so rather than implying otherwise (S-19).
- ~~Missing image `slide11_c3ead6b8.png`~~ — **RESOLVED (Day 8 authoring,
  2026-07-27).** The hash belonged to slide 16, not 11; the prescaler-timing
  figure was rebuilt from the deck as
  `assets/images/Day08-Interrupts/tim14_prescaler_timing.svg`. Nothing is
  missing.

## Chapter status

| File | Old deck(s) | Status |
| --- | --- | --- |
| ch-intro-blinky.ptx | Day01, Day01x, Day02 | **done** (Days 1, 1x, 2) |
| ch-switches.ptx | Day03, Day03x, Day04 | **done** (Days 3, 3x, 4) |
| ch-uart.ptx | Day05 | **done** (Day 5) |
| ch-io-datasheets.ptx | Day05X | **done** (Day 5x) |
| ch-transistors.ptx | Day06 | **done** (Day 6) |
| ch-adc.ptx | Day07 | pilot |
| ch-debugging.ptx | Day07x | Day 7x through Gate 2 (Petra pending) |
| ch-timers-interrupts.ptx | Day08 | Day 8 through Gate 2 + Petra's review rounds |
| ch-gpio-interrupts.ptx | Day09 | Day 9 through Gate 2 (Petra pending) |
| ch-i2c.ptx | Day09X, Day10 | Days 9x and 10 through Gate 2 (Petra pending) |
| ch-motors.ptx | Day11, Day11x, Day12 | **Day 11 done** (book + deck, Petra passed 2026-08-18); **11x is the pilot of Steps 3′/4′** — see `plans/day11x-prompt.md`; 12 rough |
| ch-accelerometers.ptx | Day13, Day13x, Day14 | rough (Day 13 moved here from ch-i2c, Petra's call) |
| ch-servos.ptx | Day15, Day15x | rough |
| ch-photosensors.ptx | Day16 | rough |
| ch-ble.ptx | Day17 | rough |
| ch-power.ptx | Day17x | rough |

"Rough" means: assembled from raw slide extraction, with duplicated concepts,
unannotated images, invented code, and no in-class structure. Assume nothing in a
rough chapter is correct until checked against Step 0 ground truth.

---

## What Day 11 taught us

Day 11 took **five rounds of Petra's review across two sessions**, more than any
chapter so far. The book itself was not the problem — it passed in two rounds.
Rounds three, four and five were the deck, and almost every note in them was
about **layout and legibility**, not content. That is what `AUTHORING-visual.md`
now exists for.

### The book stage, which went wrong first

The deck's problems get the attention because they took four rounds, but **the
book took two rounds and lost more.** Her first message on it ran to twenty-four
items, and five of them were the same thing: the chapter did not contain what she
teaches.

**One wrong number shaped the whole chapter.** The first `plans/day11.md` budgeted
the class at **~66 minutes against a real 110**, and every Part was sized to fit
it. Part 1 — the actuator chain *and* the DC motor — got **six minutes**, marked
*"explain + predict (recap of reading/video)"*. Her slides 7 and 8 spend two full
slides on the motor physics. At six minutes there was no room for it, so it was
never written, and the plan passed Gate 1 with the omission invisible because the
budget was self-consistent. Her two verdicts — *"Where did the actual physics go?"*
and *"I don't think there is even close to enough going on in this class"* — are
the same finding read from two ends. **The clock error and the thin content were
not two problems.** That is why the class length is now a required line in the plan
and why `checker-arc-fidelity` checks it at Gate 1.

**Four of her slides were simply absent, and eleven reviewers did not notice.**
The motor equations (her 7–8), the IN1/IN2 gate-tying figure (her 10), the
shoot-through picture (her 14), and brake-versus-stop (her 12–13). Gate 2 ran a
full committee over that draft and `checker-technical-accuracy` reported the
physics *"VERIFIED correct"* — which it was, every word. **Verification confirms
that what is present is right and says nothing about what is absent.** No linter
covers it, no build covers it, and no persona reviewer thought to open her deck.
`B-8a` and `checker-arc-fidelity` at Gate 1 and Gate 2 exist for exactly this.

**The IN1/IN2 figure is the one to remember.** She asked for it in her *first*
book message. The book got a figure; the pMOS/nMOS naming stayed in prose. Four
rounds later, on the deck, she asked for the same thing again — *"we need to talk
about what the transistors are, what is on when"*. **A correction satisfied in one
artifact is not satisfied in the next one**, and nothing carried it forward.

**P-12 existed and was skipped, and skipping it was invisible.** Her annotated
figures were in the repo the whole time; the draft shipped with the plain extracted
versions. *"Looks like you never checked these."* The rule was fine — what was
missing was any evidence that it had been followed, so P-12 now produces a figure
manifest in the ground truth with a recorded decision per image.

**Activities: she rejected four in one message and then generalised it herself.**
*"Students are not third graders"*, *"way too basic"*, *"stupidly simple"*,
*"students will feel infantalized"*. P-17 was written from that message and is
good — but note that it took her saying it four times in one round, plus a summary
judgment, before it became a rule. **A correction repeated inside a single message
is already a rule; write it then, not after the next chapter repeats it.**

### The deck stage

**The single largest cause: the deck was condensed from the book, and nothing
compared it back to her arc.** Step 4 says "condense the in-class Part N sections,
and only those," which guarantees the deck inherits the book's structure. When two
of her slides had become two paragraphs of one Part, the deck lost them silently.
No linter checks this, no committee reviewer checked it, and both Gate 3 and two
full fit sweeps passed over it. **Step 4b** now exists to catch it.

**The same correction was given four times, and I re-made it after being
corrected.** "Text on slides is too small" appeared in every round: the figures in
round one, the captions in round two (*"whenever you aren't actually captioning an
image, don't use caption"*), a caption again in round four, a formula in round
five. In round four I put a nine-item symbol legend in a `<caption>` — the exact
element she had banned for that use two rounds earlier — because the rule as
written keyed on *"is it captioning an image"* (it was) rather than on *"can the
room read it"* (it could not). **A correction should be turned into a rule that
generalises to the next case, not applied to the instance she pointed at.**

**Reviewers do not catch layout, and they did not catch bad prose either.** Gate 3
ran six reviewers and produced thirteen figure findings, none of which was the
missing lead-in or the wrong slide layout. A dedicated voice checker passed a
bullet that jammed two relationships into one ungrammatical sentence — *"the
back-EMF is proportional to speed, and what is left of the supply after it drives
the current through the armature resistance"* — which Petra called out with
*"What do you mean by…??? This is terrible. Did this get reviewed?"* The committee
checks drafts against rules; it does not read a slide the way a person in the room
does, and it cannot see a deck's shape at all.

**Three defects were in the player, not the content, and had been mis-attributed
to the content for months.** A slide table kept a fixed 16 px while the prose
scaled with the projector; `major` table rules drew nothing; `demath()` silently
**deleted** every LaTeX command it did not know, so ω and τ vanished from the wall.
Each looked like an authoring mistake. **When a slide looks wrong in a way that
would affect every deck, check the player before rewriting the content.**

**The fit check lied.** A two-column body that overflowed grew past the slide
rather than clipping, so `scrollHeight === clientHeight` and the snippet answered
*"fits"* for a slide that was 196 px over and printing over its own title. Two
sessions' sweeps reported it clean. Fixed in the player; the lesson is the one
`AUTHORING-slides.md` already states and that I did not follow — **look at every
slide that carries a figure.**

**A wrong premise fed to reviewers wastes the whole gate.** `plans/day11.md` said
the class was ~65 minutes; it is a Tuesday, so 110. Both logistics reviews and a
Gate 2 BLOCKER were answering a question I had mis-posed, and the rule was already
written down in `plans/week5.md`. It is in `CLAUDE.md`'s standing facts now, which
is where a fresh session actually looks. **Third time this repo made that mistake.**

**Context ran out mid-list, and the handover lost fidelity.** Stopping to write a
handover was right, and it was accurate enough to resume cold. But one item —
*"the formula in the introduction is wrong"* — described the symptom she saw
(it projected as slash-and-paren text) as a mathematical error, and the next
session spent time re-deriving a formula that was correct. **A handover should
record what she said and what you observed as two separate lines.**

## What Day 9's Gate 2 taught us

The committee's three BLOCKERs all came from the same place, and it is worth
naming because the process pointed the other way.

**The old decks are authoritative for the arc and the code — not for hardware
explanations.** Day 9's chapter taught, in four student-facing places, that a
masked EXTI line still records edges in `FPR1` so software can poll it. RM0490
§12.3.1 says the pending register is only set for an *unmasked* interrupt. The
claim came from Petra's own speaker note, was copied into the Step 0 ground
truth as fact, and survived Gate 1 and every linter. Step 0 should treat a
deck's *explanation* of why hardware works the way it does as a claim to verify
against the manual, exactly like a register name — the code and the arc are
what the decks are trustworthy for.

**Two of the three blockers were earlier chapters' set-pieces restated
backwards** on the day they pay out — the `rc_w1` read-modify-write hazard and
Day 8's written-minus-one rule. A chapter that inherits a lesson is a chapter
that can get it wrong in a way its own linters cannot see, because the correct
version lives in a different file. Worth a targeted check when a chapter's
whole design is "Day N's set-piece pays out here".

**Every linter passed on the draft the committee reviewed.** That is the
strongest argument yet for Gate 2 existing at all. Four of the findings *could*
be linted cheaply and are worth adding to `check_deck.py`: a `refPage` must
actually contain the `ref`'d figure (this one did fire, after the fix); deck ref
order should match source order within a subsection; `room` should agree between
a `<slide>` and its deck entry; and every code-writing `<activity>` needs a
matching `"instructor": true` entry (P-10).

**Highest-yield reviewers this round:** `checker-technical-accuracy` (all three
blocker-class facts), `expert-class-logistics` and `learner-anxious-nonhardware`
(converged on the wrong wiring figure), `expert-rigor-hawk` and
`expert-embedded-industry` (converged on the residual race), and
`learner-ai-reliant`, which falsified a claim the *plan* made about itself.

## What Days 9x and 10 Gate 2 taught us

The same shape as Day 9, which is now the second data point and probably the
rule: **every linter passed and every slide fitted, and the committee still
found five wrong hardware claims.**  Worth naming what kind of wrong they were,
because none of them came from the decks being unreliable in the way Day 9's did.

Three came from **arithmetic and citation drift in material verified
elsewhere**.  5.0 us plus 4.0 us was written as 10 us -- in the one derivation
the chapter makes a set-piece of -- because the *answer* (a 100 kHz clock has a
10 us period) was right and nobody checked the addition against it.  The
manual's own table has the discrepancy and footnotes it.  Two register sections
were cited one or two subsections off.  The cheap defence is to check a
derivation's arithmetic separately from its conclusion, and to paste section
numbers out of the PDF rather than typing them.

One came from **an explanation that contradicted the chapter's own later text**.
Day 10's opening verification told students a powered display lights up; Part 6,
seven hundred lines further on, says correctly that an uninitialized HT16K33
drives nothing.  Both sentences were written into the same file four days apart.
A chapter long enough to contradict itself needs a pass that reads it end to end
for consistency, which no linter does and which the author is worst placed to do
-- this is `checker-technical-accuracy`'s highest-yield mode, and it is worth
giving it the whole chapter rather than a list of claims to check.

One came from **a figure edit that fixed one defect and caused another**: the
segment map was recropped to remove two stray dimension lines and lost its E and
F labels, in a figure two activities send students to precisely to derive
letters that need those segments.  Re-render and re-read a figure after any
change to it, not only after first building it.

**A process defect worth recording separately, because it is the author's and
not the chapter's.**  Four applied fixes were silently clobbered by a later edit
script that had read the file before them and wrote it after.  Scripted
multi-edit passes must re-read before every replacement and write after each
one -- and the change list must be verified item by item against the finished
file, not against the scripts' own success output.

**Highest-yield reviewers this round:** `checker-technical-accuracy` (all five
hardware blockers, and it read the manuals rather than the ground truth);
`learner-visual` (two figures whose captions promised what the image did not
show -- the defect class that is invisible in source and obvious on sight, so
give it rendered figures every time); `learner-arduino-veteran` (found the
chapter asserting something the chapter itself had falsified 130 lines earlier
— *that agent has since been retired under B-11e, and self-contradiction is now
an explicit pass in `checker-technical-accuracy`*);
`learner-anxious-nonhardware` and `expert-class-logistics` (converged on every
diagnostic ladder dead-ending at "re-seat the wires"); and `learner-ai-reliant`,
which falsified an AI-resistance claim for the second week running -- the same
design, comparative code review, defeated the same way.

**Four reviewers independently found one gap in four vocabularies:** open-drain,
the chapter's one genuinely new circuit idea, had no figure.  When a finding
arrives in four dialects it is not four findings.

## What the ADC pilot taught us

The process was validated end-to-end on `ch-adc.ptx` (Day 7). What it exposed:

**Gate 1 paid for itself immediately.** Revision 1 of the lesson plan was a BLOCKER
on three counts, the worst of which was that **the read path was missing entirely** —
`ADSTART`, `EOC` and `ADC_DR` appeared nowhere, so a student completing every
scaffolded blank would have printed nothing. The crucial step was unreachable by
construction. Three reviewers found it independently, at a cost of one page of
rewriting. Found at Gate 2 it would have cost the chapter.

**The old deck is the driver ground truth.** The complete, real `ADCpot.c` was
recoverable as text from the deck's code slides — no need to ask Petra for files,
which had been the process's biggest bottleneck. The chapter that existed before the
pilot contained *invented* code that was plausible and wrong in five places.

**Reviewers verify claims the author cannot.** The continuity auditor caught that the
homework's "change to channel 3" was both wrong (A3 is PB1 → `ADC_IN18`, a different
*port*) and self-defeating, since discovering that is the exercise. The
technical-accuracy checker confirmed the code matched the driver exactly and every
number was right, while finding six wrong hardware claims — `ADSTART`'s clearing
time, the ADC clock's independence, a source-impedance justification the datasheet
contradicts, and a diagnostic step that cannot produce the symptom it claims.

**Figures are the highest-risk artifact.** Two figures were composited from the wrong
picture on their slide, one caption made a flatly false claim about the hardware, and
one figure had no annotations where the original had six. None of this is visible in
the source. Render and look at every one.

**A "done" chapter is not necessarily clean.** Running the new linter across the book
found standing-rule violations in `ch-intro-blinky.ptx` and `ch-uart.ptx`, both marked
done. It also needed a suppression mechanism (`<!-- check-rules: allow L-2 -->`) on
its first run, for the paragraph that deliberately teaches that `%f` is unsupported.

**Where the panel earned its keep.** Highest yield: `checker-technical-accuracy`,
`expert-continuity-auditor`, `learner-visual`, `expert-class-logistics`. The learner
personas overlapped less than expected — each failed at a genuinely different point,
and four of them independently caught the same `GPIO_ANALOG` error from four
different directions. Recommend keeping the full panel for now and re-assessing after
a second chapter.
