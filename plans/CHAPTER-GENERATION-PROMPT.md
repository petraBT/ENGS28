# The chapter-generation prompt

Paste everything below the line into a fresh session in `~/repos/ENGS28`, after
filling in the two blanks at the top.

This supersedes `plans/ch-i2c-9x-10-handover.md` and
`plans/ch9-week-rewrite-prompt.md`. Those were ~300 lines each and were still
missed in places; length was never the lever. The lever is **order** and **gates
that cannot be skipped**.

---

You are writing one unit of the ENGS 28 textbook — PreTeXt book source plus the
classroom deck it projects. Branch `main`. Small commits, pushed as you go.

**The unit:** `______` (e.g. "Day 11 — Motors", "Day 13x — Accelerometer")
**The chapter file:** `source/ch-______.ptx`

## Deliverable

A day's section of that chapter — prose, figures, activities, instructor
solutions, `<slide>` blocks — plus `assets/decks/dayNN.json`. Done means it has
passed the committee and is ready for Petra to read as a near-final draft, not
as a first attempt.

## The five gates

You may not start a gate until the one before it is finished. The gates exist
because every defect that has reached Petra was cheap at the gate before the one
that found it, and expensive at the one that did.

| Gate | You may not proceed until |
| --- | --- |
| **0 — Ground truth** | you have written `plans/dayNN-ground-truth.md` and **sent Petra your questions** |
| **1 — The plan** | the Gate 1 panel has reviewed a one-page lesson plan **and the outline** |
| **2 — Prose** | Gate 1's change list is applied |
| **3 — Slides and fit** | the prose is written and the mechanical checks pass |
| **4 — Committee** | every reviewer named in `.claude/agents/README.md` for this unit has run and the synthesizer's list is applied |
| **5 — Petra** | Gate 4 is done. **A draft does not reach her before the committee has run.** |

Gate 5's rule is not a formality. On the I2C week the committee was not run at
all until she asked *"Are you using the committee we constructed?"*, and
everything it later found — wrong hardware claims, a slide of undefined symbols,
the same list enumerated four times in ten minutes — reached her first.

## Continuing or reworking an existing unit

Most units from here on are **not greenfield**: a second day in a chapter that
already has one, or a day that has been rewritten and needs finishing. Run the
same five gates, with these four changes. Skipping them wastes a day re-deriving
what the repo already knows; ignoring them ships a unit reviewed against a shape
it no longer has.

**Gate 0 becomes verification, not collection.** The ground truth is already
written down — `plans/dayNN-ground-truth.md`, `plans/weekN-*.md`. Read it and
confirm the handful of facts this unit actually leans on, rather than re-mining
the deck. Two things you still do in full: **re-run the structural-convention
check**, because a unit that has been restructured may no longer match its
siblings, and **re-ask any question still on the open list**.

**The sibling day is your voice reference, ahead of the specimens.** A day in the
same chapter that has been through Petra's hand is a better model than
`plans/day8-voice-reference.diff`, because it is the same week, the same
vocabulary and the same students. Read it first, and match it. The specimens
remain the authority where the sibling is silent.

**A committee report is void for any part that has moved.** Check the date on
`reviews/dayNN-gateN.md` against the last commit that changed the section's
*structure* — a part that has been moved between days, split, merged or
renumbered was reviewed under a different time budget, a different neighbour and
sometimes a different day. Its load and sequencing findings do not carry over;
its factual findings usually do. State plainly which parts are still covered and
re-run the affected reviewers on the rest.

**Read the existing change list before you look for problems.** An unapplied
review is the cheapest work available, and it is nearly always partly unapplied —
a restructure in the middle of applying one leaves a mix nobody has audited.
Start by checking each finding against the current file and saying whether it is
live, fixed, or void. Rediscovering them costs a committee run; applying them
costs an afternoon.

**And clear the rewrite scars**, which are invisible to every linter: `xml:id`s
that name the wrong day after a part moved, deck `page` fields keyed to them, two
names for one file, and presenter notes that budget a structure that changed.

---

## Gate 0 — Ground truth before prose

`CHAPTER_PROCESS.md` Step 0 has the full version. The parts that have bitten:

**The real driver**, from `assets/starters/`, then `assets/images/Day*/`, then
the old deck's code slides — full listings are frequently pasted there as text
and are recoverable with `pptx_mine.py <deck> --code`. Never reconstruct driver
code from memory (B-6): invented-but-plausible code is the single largest source
of error in this book. If you cannot find it, ask — that blocks the prose, not
the plan.

**The old deck's arc and its speaker notes** (`--arc`, then the whole thing).
The notes are often the richest source in the repository — the ADC deck teaches
successive approximation as a live number-guessing game that existed *only* in a
speaker note. The decks are authoritative for **the arc and the code**, and
**not** for *why the hardware works*: Day 9 taught that a masked EXTI line still
records edges in `FPR1`, straight from Petra's own speaker note, and RM0490
§12.3.1 says otherwise. Treat a deck's explanation as a claim to verify.

**The structural convention, from sibling chapters, before you design.** Open
the files; do not assume. An x-day has **no pre-class reading** —
`ch-debugging.ptx` (7x) and `ch-io-datasheets.ptx` (5x) have no Before Class
section at all. A whole day was built on the opposite assumption and had to be
rebuilt after Petra said so.

**Downstream:** the lab this feeds (`assets/Labs/`) is a constraint, not the goal
(P-13). **The datasheet / RM pages** by table and section number, pasted out of
the PDF rather than typed — two register sections were cited a subsection off
because they were typed from memory (P-11).

### Then ask, before writing anything

**Petra would rather answer four questions than correct forty sentences.** Send
a short list and carry on with everything that does not depend on the answers.

Ask about anything the repo cannot establish (B-11c): what students have in front
of them, how a part mounts, whether spares exist in the room, what happens if a
connection is reversed, how long a step takes, whether a datasheet you are citing
is even in the repo. These read as authoritative and no reader can challenge
them. One standing fact you need not ask: there are no lab benches — each student
carries a portable kit and works on their own laptop, so never write "bench".

Write what you found and what is missing to `plans/dayNN-ground-truth.md`.

---

## Reuse before invention — the rule that runs through every gate

The draft that reaches Petra fastest is the one that started from what she
already wrote. Her old decks carry her phrasing, her comparison tables and her
worked examples, and the last three drafts each invented replacements for text
that already existed:

- her UART-vs-I2C comparison table was in her deck the whole time, while the
  draft wrote three bullets over a cropped figure;
- her `pingDisplay.c` loop idiom was replaced with a cleverer one that confused
  her;
- her own screenshots, offered when the rebuilt composites were wrong, fixed in
  one step what two rounds of patching had not.

So before writing any substantial passage — a comparison, a definition, a
diagnostic list, a worked example, a code idiom — check the old deck for it, and
prefer her wording almost verbatim. Where you genuinely think yours is better,
say so in the commit message rather than quietly replacing hers.

Same for figures: `assets/ClassSlidesOLD/` images carry teaching annotations in
the PowerPoint shape layer that plain extraction drops (P-12). Rebuild with
`pptx_annotate.py --max-text 200`, then **look at the result** — and when it
disagrees with the original, **ask for the original** rather than patching the
composite. Its failure modes are in `CHAPTER_PROCESS.md` Steps 1 and 5; the one
that cost most was a silent crop, which no amount of fixing arrows recovers.

---

## Gate 1 — The plan, and the outline, reviewed early

Write `plans/dayNN.md`, one page: objectives; **the crucial step** in one
sentence (P-2); **the stretch** (P-3); the Part 1..k sequence with time budgets
and each marked do / predict / explain / reveal; the datasheet moment; the
hand-offs. If the crucial step will not fit in a sentence, the class is not
designed yet.

Then write the **outline** — the Part titles and, per part, two or three lines
on what it teaches and what students do.

Run the Gate 1 panel on **both**, together. Roster in
`.claude/agents/README.md`. This is minutes of work and it has already saved a
chapter: revision 1 of the ADC plan was missing the entire read path, so a
student completing every scaffolded blank would have printed nothing.

**Run the committee early, on the outline — not once at the end on 3,700
lines.** A committee that first sees a finished chapter can only ask for
rewrites.

---

## Gate 2 — Prose, in Petra's voice from the first sentence

Order within the day: introduction and objectives → Before Class reading and
reading questions, *if this day has one* → `Part N` subsections matching the
plan → Reference material at the end. **Do not write `<slide>` blocks yet.**

Everything you need is in `AUTHORING-book.md`. The two things to do before you
start typing, not after:

**Read the two voice specimens.** `plans/day9x-voice-reference.md` and
`plans/day8-voice-reference.diff` are Petra's own hand passes, and they are the
specification — S-11…S-19 are only a summary of them. A voice sweep bolted on at
the end produces a chapter that is half hers; she rejected a whole draft with
*"You are not speaking in my voice."*

The failures that keep recurring, so you can not-write them in the first place:
opening on what is **absent** rather than on what we are doing; the clipped,
contrastive, aphoristic register ("the direct approach is not short by a little";
"Today: the two wires. Thursday: the chip"); slide titles that are epigrams
rather than names; missing "we'll" for what the class does; time budgets and
"Part 3b" in student-facing text; acronyms not expanded inline on first use
(`PB9 (SDA — serial data)`, `I2C (Inter-Integrated Circuit)`); and reassurance
theater, which B-12 bans and which comes back every single time.

**Read `AUTHORING-book.md` B-11e.** Arduino comparisons are **cut**, not
compressed: *"Get rid of how you would have done things in Arduino. Nobody
cares."*

Then run `python3 scripts/check_rules.py source/ch-NAME.ptx` and fix everything
before you write a slide.

---

## Gate 3 — Slides, then the fit check

Author the `<slide>` blocks beside the prose they condense, then the deck JSON.
Mechanics in `AUTHORING-slides.md`. This step is condensation, not design — the
plan already fixed the arc. If a section resists condensing, the section is not
clear yet.

Two rules that are cheap here and expensive later:

**A slide must be usable from the wall, with no book open (S-9).** Every symbol
on a code slide needs a referent the room has already seen. `helloDisplay.c`
projected with its `#define` block stripped out to make it fit, so every name on
the slide was undefined — Petra: *"just pops out of nowhere."* When it does not
fit, **split it, or compress the spacing (`room="compressed"`), never thin it,
and never invent a slide to absorb the overflow.**

**Every slide must earn its place.** What does a student get from this that they
did not get from the slide before it? Two slides survived four rounds of review
with no answer: a troubleshooting slide with no diagnosis in it, and a slide
about why `+` goes to 3.3 V that existed only to fix a crop.

### The fit check

The snippet and its traps are in `AUTHORING-slides.md`. There are **five**, and
the last two cannot be measured at all:

1. layout is suspended in a background window — every number reads 0, which
   looks exactly like "fits". Require `clientHeight > 0`.
2. image-dominant slides have `display:none` on `.ref-body` and legitimately
   report nothing.
3. code in a `<pre>` scrolls inside itself, so a clipped listing reports no
   overflow.
4. **a figure on a stacked or two-column slide is cropped, not scaled**, into
   whatever the bullets leave — with every measurement reading zero. **Look at
   every slide that carries a figure.**
5. **an `.svg` with a `viewBox` but no `width`/`height`** has no intrinsic size,
   so the browser gives it 300×150 and it projects tiny however much room the
   slide has. `check_rules.py` errors on this now (B-11a).

Also: wait ~300 ms after setting `location.hash` before measuring, or you get
phantom overflows on slides that fit.

---

## Gate 4 — The committee

Roster, scoping and schedule are in `.claude/agents/README.md`. Run the cheap
reviewers in parallel; scope `checker-technical-accuracy` per `Part N` — run
whole, it has cost 22 minutes and 250k tokens on one day's material, which is
why it gets skipped.

Write every reviewer's report to `reviews/dayNN-gateN.md` **before** running
`committee-synthesizer` — it reads that file and will correctly refuse to
consolidate reports that exist only in a transcript.

Give `checker-figure-claims` and `learner-visual` the **rendered** figures, not
their paths.

Then apply the synthesizer's list, and **verify it item by item against the
finished file** — not against your own edit scripts' success output. Four
applied fixes were silently clobbered by a later script that had read the file
before them and wrote it after.

---

## Working rules

**Small units, pushed as you go.** Two previous cloud agents were given a
chapter whole and both stalled without finishing. Scope per commit is the
mitigation. One Part, or one fix class, per commit.

Before every commit:

```bash
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

`check_deck.py` resolves refs against `output/web-deck`, so **build first** or
new slides report as phantom problems. Re-run
`python3 scripts/make_deck_index.py` if a deck's slide count changes.

**`git status` before committing. Petra edits this repo while you work: commit
only files you changed, never `git checkout` a directory to tidy up, and never
revert a change you did not make.**

Never change an `xml:id`, a `ref`, `stack`, `room`, `"instructor"`, `"page"`,
`"slide"` or `"type"` unless that is the change. Never change a number —
address, register value, cycle count, table or section number — unless you are
correcting it against a verified source, and say so in the commit.

Any change to book prose or a caption must be checked against the `<slide>`
blocks that condense it (Step 5b): they are separate texts and the build will
not tell you.

## Report back

Per unit, what changed and why. Then, at the end:

- the questions you asked Petra and which are still unanswered;
- anything you could not verify and therefore left alone;
- every figure you need that does not exist;
- fit measurements for the slides you touched — **do not fabricate these**; if a
  slide could not be measured, say so, and say which ones you looked at by eye;
- where you used her wording from an old deck, and where you deliberately did
  not.
