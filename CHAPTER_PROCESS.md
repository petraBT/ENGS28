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

- **BSRR register** — introduce in `ch-gpio-interrupts.ptx` (Day 9), not before. The
  motivation is that ISRs sharing GPIO state with the main loop create a race on the
  ODR read-modify-write; BSRR's atomic set/clear is the fix. Students need to have hit
  the problem before BSRR makes sense. Hook: "you're now writing ISRs that share GPIO
  pins with the main loop — here's why that matters and here's the one-line fix."
  CMSIS: `GPIO_BSRR_BS5` to set, `GPIO_BSRR_BR5` to clear.
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
| ch-gpio-interrupts.ptx | Day09 | rough (split out of ch-timers-interrupts at Petra's direction) |
| ch-i2c.ptx | Day09X, Day10, Day13 | rough |
| ch-motors.ptx | Day11, Day11x, Day12 | rough |
| ch-accelerometers.ptx | Day13x, Day14 | rough |
| ch-servos.ptx | Day15, Day15x | rough |
| ch-photosensors.ptx | Day16 | rough |
| ch-ble.ptx | Day17 | rough |
| ch-power.ptx | Day17x | rough |

"Rough" means: assembled from raw slide extraction, with duplicated concepts,
unannotated images, invented code, and no in-class structure. Assume nothing in a
rough chapter is correct until checked against Step 0 ground truth.

---

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
