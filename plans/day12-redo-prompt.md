# Day 12 — redo the in-class prose, and de-clutter it

Paste everything below into a fresh session in `~/repos/ENGS28`.
**Use Opus 5.** Reasoning: this is a voice-and-judgment rewrite at scale — cutting
roughly 40% of a section, deciding what is teaching and what is reference, and
holding one author's register across six Parts. The mechanical tail (checks, fit
measurement) does not need Opus; the rewrite does.

---

## What happened

Day 12 of `source/ch-motors.ptx` went through the pilot ordering: slides first,
Petra reviewed the deck three times (48 comments, all applied and archived in
`reviews/slide-comments-archive.jsonl`), then the in-class connecting prose was
written from her passed slides. Gate 3′ then ran seven reviewers
(`reviews/day12-gate3.md` and the seven `day12-gate3-*.md` beside it) and its list
was applied.

**Petra then read the result and stopped part way through Part 2.** Her verdict, in
her words: *"The style in this in-class section is entirely different from other
chapters. We were going to de-clutter the preclass and in-class stuff from too much
technical stuff and instead add that to the reference section for students who are
interested."*

**She is right, and the mechanism is worth understanding before you rewrite
anything.** Gate 3′'s reviewers optimised for completeness — every caption had to
survive `checker-figure-claims`, every argument had to survive `learner-text-first`,
every pointer had to survive `expert-continuity-auditor`. Each fix was individually
correct. Together they inflated the section past the register of the book. The
numbers:

| | captions (words, min/med/max) | body paragraphs |
| --- | --- | --- |
| Day 11, passed by her | 9 / 50 / 162 | **24** |
| Day 11x, awaiting her pass 2 | 12 / 28 / 130 | 21 |
| **Day 12, this draft** | 11 / 25 / **209** | **42** |

Median sentence length is fine. **The count is the defect**: 42 paragraphs where a
comparable passed day has 24, in a section with fewer minutes. Plus one 209-word
caption (`fig-day12-wiring`).

## Her 13 comments, and what each points at

They are in `reviews/slide-comments.jsonl`, **left unarchived on purpose so you read
them yourself**. Two are on the deck; eleven are book comments on
`subsec-day12-driver-questions` and `subsec-day12-wire-and-scope`. She stopped
there, so **Parts 3–6 have not been reviewed and almost certainly have the same
defects** — do not treat the absence of comments as approval.

| # | She wrote | On |
| --- | --- | --- |
| 1 | *"signal wire"* | deck slide 7 |
| 2 | *"Is it possible to actually show the image from the following slide here?"* | deck slide 7 (`act-day12-predict-trace`) — she wants the wiring picture on the prediction slide |
| 3 | *"much of that"* | Part 1's opening paragraph, on *"whatever is still unclear in that file"* |
| 4 | *"empty fluff - useless. Delete"* | Part 2's opening paragraph |
| 5 | *"reading it with a pin (note: stop using cutsy language. We are talking with adults. Dont infantilze them. Use plain language. The signal isn't 'going near a pin')"* | same paragraph — **this is the register note that governs the whole redo** |
| 6 | *"Do you mean we even omit the pullup here?"* | `act-day12-predict-trace` — the prediction is genuinely ambiguous about whether the resistor is fitted |
| 7 | *"on the breadboard"* | the three-connections paragraph |
| 8 | *"delete that sentence fragment - duh."* | `fig-day12-wiring`'s caption |
| 9 | *"are you doing this for accessibility? If so, then great, but shouldn't that go into some kind of alternative tag for screen readers? The way it reads is just ridiculous right now and not how we have done other figure captions."* | `fig-day12-wiring`'s caption — **the 209-word one** |
| 10 | *"What on earth are you talking about? Everything is drawn. Delete this nonsense."* | the same caption's *"that connection is not drawn in any of this chapter's pictures"* |
| 11 | *"You've gotta be kidding. All of this about a wire? SHORTEN."* | `fig-day12-cabled-sensor`'s caption (the L-terminal paragraph) |
| 12 | *"at which point the wire is pulled up through the 10kOhm resistor to 3.3V."* | the reveal paragraph — **her own replacement wording, use it** |
| 13 | *"delete. This kind of stuff should go into a reference section"* | `fig-photointerrupter-states`'s caption, the sourced datasheet paragraph |

Read them with `python3` off the JSONL, and render the book URLs in the comment
records if you want to see what she circled. The workflow is in `CLAUDE.md` under
"Review comments".

## What to do

1. **Rewrite the in-class prose of `sec-motors-day12` shorter.** Target the shape of
   Day 11's passed prose: roughly 24–28 body paragraphs, not 42. Cut whole
   paragraphs rather than trimming sentences — her register is plain and explanatory,
   so shortening *within* a paragraph is the wrong direction (the S-22…S-28
   calibrations in `AUTHORING-book.md` say so explicitly, and they still apply).
2. **Captions go back to the book's convention.** Compare against Day 11's captions
   before writing one. A caption says what the picture shows and why it matters; it
   does not enumerate wire colours, and it does not say what is *absent* from the
   drawing. Comment 9 is the standard to meet.
3. **Move the technical depth into the chapter's Reference section**, which is
   **still unwritten** and whose five subsections are specified in `plans/day12.md`.
   This is the half of her instruction that is easy to forget: the material is not
   deleted, it is relocated for students who want it. At minimum it should absorb:
   - the Omron EE-SX672 datasheet detail (open collector, 5–24 V DC supply, response
     frequency, the L terminal and light-ON/dark-ON) — comments 11 and 13;
   - the pull-up value trade-off in full, and the internal-`PUPDR` alternative;
   - `table-day12-exti-lines` (the five EXTI writes, Day 9's line vs this one) — it
     was added at Gate 3′ for a real reason (`learner-firstgen-novice` BLOCKER) but
     it is reference material, not in-class prose;
   - the polling-versus-interrupt condition stated properly (`T_poll` < the shorter
     of the HIGH and LOW times), which is currently three in-class paragraphs;
   - `subsec-motors-ref-tim14`, which `plans/day12.md` says must exist even if the
     session runs short.
4. **De-clutter the pre-class reading too** (`sec-speed-before-class`) — she names it
   explicitly. She has not commented on it yet, so use judgment and flag what you
   cut.
5. **Then re-run Gate 3′ — but brief the reviewers differently.** The last run's
   reports are on disk and their findings are real; the failure was that nothing
   weighed a fix against the section's total length. Tell `checker-figure-claims`
   and `learner-text-first` that a fix which adds words has to say what it displaces.

## What must not be lost

Everything below survived a gate for a reason. If you move it, move it somewhere
real and say where.

- **Part 2 owes the open-drain clause in body prose** — the sensor behaves like
  Day 10's open-drain I2C pins (`subsec-day10-pins`) on a different kind of
  transistor, and there is no `OTYPER` bit on the sensor.
- **Part 4 owes the polling argument and the interrupt decision**, because
  `sl-day12-naive-loop` and `sl-day12-two-answers` are parked (she cut them) and
  project nowhere. Both are marked `PARKED` in the source with her quote.
- **Part 5 owes the "what you already have written" inventory**, including that the
  Day 10 signed counter was homework nobody reviewed.
- **`volatile` needs its one-clause reason** — a novice reviewer's MAJOR.
- **The prediction must be answered somewhere a student who missed class can read
  it**, not only in `inst-day12-wire-and-scope`.

## Still open with her — do not re-discover these

Four questions from the Gate 3′ report, none answered yet:

1. **`fig-photointerrupter-states.svg` may draw the polarity backwards.** The
   EE-SX672 is the selectable dark-ON/light-ON model; with the L terminal open it is
   dark-ON, so OUT would be pulled LOW when a **spoke** blocks the beam — the
   opposite of the artwork. The kit's 3-pin breakout hides L, so the datasheet cannot
   settle it. The prose currently avoids asserting which state is which and has
   students read it off the scope. **One scope look settles it.**
2. **Nothing student-facing carries the signed-counter pattern** Lab 6 grades.
   `subsec-i2c-ref-ht16k33` was cited for it and does not contain it (verified);
   the only worked version is instructor-only and stripped.
3. **"Five volts on a Nucleo pin damages it"** — PA15 may be 5 V tolerant per
   DS13867. Her sentence, left alone deliberately; the documented hazard is the
   3.3 V rail.
4. **`table-day12-build-order` lost its regulator input check** when "9 V" came out
   at her instruction; it now checks only the 5 V output.

Plus two standing asset requests: the regulator's 5 V path is drawn connected in
**no** figure in the chapter, and the deck's figure height cap (`72cqh` in
`assets/class.html`) is what limits her callout text to 21 px.

## Traps

- **Her wording wins**, over the draft and over any rule. Comment 12 is a sentence
  to use verbatim.
- **Do not touch Day 11 or Day 11x.** Day 11 is passed; Day 11x awaits her pass 2.
- **`sl-day12-naive-loop`, `sl-day12-two-answers`, `sl-day12-deadband-table` are
  parked deliberately** — no deck refs them. Do not re-add them.
- **P-6 orderings**: `act-day12-predict-trace` before `fig-day12-wiring` and
  `fig-photointerrupter-states`; nothing prints PA15 before `act-day12-find-the-pin`
  opens Part 4; `table-day12-diagnostics` gives symptoms, not the pull-up reason.
  Note comment 2 asks to put the wiring image *on* the prediction slide, which
  touches the first of these — resolve it with her, or show the picture without the
  resistor called out.
- **A solution no deck projects is a P-10 failure** (`check_deck.py`), so an
  `<instructor>` block cannot simply be dropped from the deck.
- **The clock**: 110 min, Thursday. 6 settling + Parts of 8/26/15/8/5 + 37 build
  (floor 30) + 5 close. `check_deck.py` checks it at the beat level. Moving prose to
  Reference does not change it; cutting a *slide* does.
- **Never kill the review server on :8928.** It is a child of `preview-slides.sh`,
  whatever `CLAUDE.md` says — kill the 8352/8931/8932 listeners by PID instead.
- **Stop the preview servers before `./scripts/build-all.sh`** and restart them after.

## Before you commit

```bash
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

Then re-measure the fit of every slide you touched at 1600×900, crossfade killed,
900 ms settle, notes off. Four slides overflow today and all four are
instructor-only (14, 28, 37, 39), which is allowed. `git status` before committing —
she edits this repo while you work.

## Rules this whole episode earned

Worth adding to `AUTHORING-book.md` once the redo is done, because it is the lesson
the gate did not catch:

**A committee change list needs a length budget.** Seven reviewers each asking for
one more clause produced a section 75% longer than the passed day it sits beside,
and every individual fix was defensible. Petra: *"The style in this in-class section
is entirely different from other chapters."* Before applying a gate's list, measure
the section against a passed one — paragraph count, not sentence length — and make
each addition name what it displaces.
