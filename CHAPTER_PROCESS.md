# The per-chapter workflow

How a chapter of this book gets written, from nothing to Petra's sign-off. The
goal of the process is that **the draft that reaches her is already near-final** —
her corrections should be judgment calls, not the same twelve fixes every time.
Those twelve fixes are now rules, in `AUTHORING-book.md`.

- **What to write** → `AUTHORING-book.md` (rules P-n, B-n, S-n, L-n)
- **Slide markup mechanics** → `AUTHORING-slides.md`
- **Build, git, deploy** → `AUTHORING.md`

---

## The workflow

| Step | Produces | Gate |
| --- | --- | --- |
| 0 | Ground truth: driver code, downstream constraints, datasheet/RM pages | |
| 1 | Mined old deck: arc, speaker notes, rebuilt annotated images | |
| 2 | **Lesson plan** (1 page) | **Gate 1** — small panel |
| 3 | Book chapter | |
| 4 | `<slide>` blocks + deck JSON | |
| 5 | Mechanical checks pass | |
| 6 | Committee review → prioritized change list | **Gate 2** — full panel |
| 7 | Petra's sign-off | **her** |

Two gates, not one. A problem with the arc or the objectives costs one page to fix
at Gate 1 and a whole chapter at Gate 2.

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

Note what you found and what is missing. Missing driver code blocks Step 3, not
Steps 1–2 — keep going.

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

- **Objectives** — what a student can do afterwards.
- **The CRUCIAL step** (P-2) — one sentence. The thing every student must reach.
- **The STRETCH** (P-3) — what the fastest students do instead of waiting.
- **The activity sequence** — Part 1..k, each with a time budget, marked as
  do / predict / explain / reveal.
- **Datasheet moment** (P-11) — which lookup, which table.
- **Hand-offs** — what pre-class reading must establish; what the homework is; what
  the lab downstream needs.

One page. If the crucial step won't fit in a sentence, the class isn't designed yet.

### Gate 1 — the lesson plan review

Small panel, minutes to run:

```
expert-active-learning, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-firstgen-novice, learner-arduino-veteran,
learner-anxious-nonhardware
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

Write the prose and the figures. **Do not write `<slide>` blocks yet.**

### Step 4 — Condense into slides

Now author the `<slide>` blocks beside the prose, and the deck JSON.
See `AUTHORING-slides.md`.

This is deliberately last, and deliberately mechanical: the lesson plan already
fixed the arc, so this step is condensation, not design. If a section resists
condensing to a slide, that is a signal the section is not clear yet — fix the
section.

**Slides are written in Petra's voice — rules S-11 … S-19** in
`AUTHORING-book.md`, derived from her hand rewrite of Day 8 and frozen as a
specimen at `plans/day8-voice-reference.diff`. Read that diff before writing a
deck; the rules summarize it, and the examples in them are what make them
usable. In short: name things plainly, say where they live, give the reason with
the rule, and drop manufactured urgency — while keeping every technical claim
exactly as strong (S-16 softens rhetoric, never engineering).

The same voice applies to the prose the slide condenses. A `<slide>` block and
its paragraph are separate texts, so a fix to one is not a fix to the other
(Step 5b).

Remember the deck may legitimately diverge from the reading (P-9): the book may
show worked code that the deck presents as a fill-in-the-blank skeleton.

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

For each fix you made in Step 3 or after review, ask: does a slide repeat this
wording, this number, or this claim? If so, fix it there too, then rebuild.

### Gate 2 — the committee

Run the **standing core of 7** plus any rotators the chapter calls for (the roster
and the selection table are in `.claude/agents/README.md`), then the synthesizer,
which returns a **prioritized, actionable change list** with rule IDs. Apply it.

Running all 17 is only worth it for a chapter unlike anything done before.

**Write every reviewer's report to `reviews/dayNN-gateN.md` before running the
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

### Step 6 — Sign-off

Petra reviews a near-final draft. Her corrections are fed back into
`AUTHORING-book.md` as new rules if they are general — that is what keeps the next
chapter cheaper than this one.

---

## Definition of done

A chapter is done when all of these are true.

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
- [ ] `check_rules.py` passes (L-1…L-6, image paths, step counts)

**Artifacts**
- [ ] Every coded activity has an instructor solution (P-10)
- [ ] Images are the annotated versions, cropped to what matters (P-12, B-11)
- [ ] Book captions describe; slide captions instruct (B-7, S-3)
- [ ] Deck built, every `ref` resolves, arc matches the lesson plan (S-8)
- [ ] Practice/predict slides have writing room (S-2)
- [ ] `pretext build web-deck` clean; student view (`?student`) hides solutions

**Sign-off**
- [ ] Committee change list applied
- [ ] Petra approved
- [ ] Any general correction she made is now a rule in `AUTHORING-book.md`

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
| ch-motors.ptx | Day11, Day11x, Day12 | rough |
| ch-accelerometers.ptx | Day13, Day13x, Day14 | rough (Day 13 moved here from ch-i2c, Petra's call) |
| ch-servos.ptx | Day15, Day15x | rough |
| ch-photosensors.ptx | Day16 | rough |
| ch-ble.ptx | Day17 | rough |
| ch-power.ptx | Day17x | rough |

"Rough" means: assembled from raw slide extraction, with duplicated concepts,
unannotated images, invented code, and no in-class structure. Assume nothing in a
rough chapter is correct until checked against Step 0 ground truth.

---

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
chapter asserting something the chapter itself had falsified 130 lines earlier);
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
