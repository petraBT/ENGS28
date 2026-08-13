# The chapter-generation prompt

Paste everything below the line into a fresh session in `~/repos/ENGS28`, after
filling in the two blanks at the top.

This supersedes the per-unit handover prompts now in `plans/archive/`. Those were
~300 lines each and were still missed in places; length was never the lever. The
lever is **order** and **gates that cannot be skipped**.

---

You are writing one unit of the ENGS 28 textbook — PreTeXt book source plus the
classroom deck it projects. Branch `main`. Small commits, pushed as you go.

**The unit:** `______` (e.g. "Day 11 — Motors", "Day 13x — Accelerometer")
**The chapter file:** `source/ch-______.ptx`

## Deliverable — two deliveries, not one

**You do not start the second until Petra has passed the first.**

| | You hand her | Which is |
| --- | --- | --- |
| **1** | **The book** | pre-class reading (if this day has one), the in-class `Part N` sections, reference material, instructor solutions, and every figure settled |
| **2** | **The deck** | `<slide>` blocks condensed from the text she passed, plus `assets/decks/dayNN.json` |

Why the split. A slide condenses a paragraph, so a slide built from prose she has
not passed inherits wording she is about to change. On Day 10 twenty-two of them
did, and each then needed rewriting *and* refitting — more work than everything
else in that session combined, all of it avoidable. Figures settle in delivery 1
for the same reason: her annotated figures arrived after the slides had been
built, and each one forced caption rewrites plus two figures moving to slides of
their own.

Done, for either delivery, means it has passed its committee and is ready for her
to read as a near-final draft, not as a first attempt.

## The gates

You may not start a gate until the one before it is finished. The gates exist
because every defect that has reached Petra was cheap at the gate before the one
that found it, and expensive at the one that did.

| Gate | You may not proceed until |
| --- | --- |
| **0 — Ground truth** | you have written `plans/dayNN-ground-truth.md` and **sent Petra your questions** |
| **1 — The plan** | the Gate 1 panel has reviewed a one-page lesson plan **and the outline** |
| **1.5 — Voice probe** | `checker-voice` has run on the **first** subsection of prose and its findings are applied |
| **2 — The book, and its committee** | the prose is written, the mechanical checks pass, every Gate 2 reviewer has run into `reviews/dayNN-gate2.md`, and the synthesizer's list is applied |
| **→ Petra, pass 1** | Gate 2 is done. **A draft does not reach her before the committee has run.** |
| **3 — Slides, and the fit check** | her pass-1 edits are in the file, and the deck is condensed from *that* text |
| **3.5 — The deck's committee** | the slide-facing reviewers have run into `reviews/dayNN-gate3.md` and their list is applied |
| **→ Petra, pass 2** | Gate 3.5 is done |
| **4 — Close the loop** | every general correction she made in either pass is a rule in `AUTHORING-book.md` |

These numbers match the review files already on disk (`reviews/dayNN-gate1.md`,
`reviews/dayNN-gate2.md`) and the roster in `.claude/agents/README.md`. Use them.

The committee rule is not a formality. On the I2C week the committee was not run
at all until she asked *"Are you using the committee we constructed?"*, and
everything it later found — wrong hardware claims, a slide of undefined symbols,
the same list enumerated four times in ten minutes — reached her first.

## Continuing or reworking an existing unit

Most units from here on are **not greenfield**: a second day in a chapter that
already has one, or a day that has been rewritten and needs finishing. Run the
same gates, with these four changes. Skipping them wastes a day re-deriving what
the repo already knows; ignoring them ships a unit reviewed against a shape it no
longer has.

**Gate 0 becomes verification, not collection.** The ground truth is already
written down — `plans/dayNN-ground-truth.md`, `plans/weekN-*.md`. Read it and
confirm the handful of facts this unit actually leans on, rather than re-mining
the deck. Two things you still do in full: **re-run the structural-convention
check**, because a unit that has been restructured may no longer match its
siblings, and **re-ask any question still on the open list**.

**The sibling day is your voice reference, ahead of the specimens.** A day in the
same chapter that has been through Petra's hand is a better model than the frozen
specimens, because it is the same week, the same vocabulary and the same
students. Read it first, and match it. The specimens remain the authority where
the sibling is silent.

**A committee report is void for any part that has moved.** Check the date on
`reviews/dayNN-gate*.md` against the last commit that changed the section's
*structure* — a part that has been moved between days, split, merged or renumbered
was reviewed under a different time budget, a different neighbour and sometimes a
different day. Its load and sequencing findings do not carry over; its factual
findings usually do. State plainly which parts are still covered and re-run the
affected reviewers on the rest.

**Read the existing change list before you look for problems.** An unapplied
review is the cheapest work available, and it is nearly always partly unapplied —
a restructure in the middle of applying one leaves a mix nobody has audited.
Start by checking each finding against the current file and saying whether it is
live, fixed, or void. Rediscovering them costs a committee run; applying them
costs an afternoon.

**And clear the rewrite scars**, which are invisible to every linter: `xml:id`s
that name the wrong day after a part moved, deck `page` fields keyed to them, two
names for one file, and presenter notes that budget a structure that changed.
This is the one licensed exception to "never change an `xml:id`" below — when the
rename *is* the change, do it in its own commit, and repoint every deck entry in
the same commit.

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
worked examples, and drafts keep inventing replacements for text that already
existed:

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

**The failure signature is paraphrase, not deletion, and it is far more common
than it looks.** Grepping the slides for sentences she *cut* found four stale
slides on Day 10. The real number was twenty-two, because the larger class is
slides that say, worse, something she had already written well. If a slide reads
as *terser than the prose it condenses*, that is backwards — go and find her
sentence.

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

## Gate 1.5 — The voice probe, on your first subsection

As soon as the **first** subsection of prose exists, stop and run `checker-voice`
on it alone. Apply what it says before writing the rest.

Register is systemic: if the voice is wrong in the first subsection it is wrong in
all of them, and a sweep bolted on at the end produces a chapter that is half hers
— worse than either. She rejected a whole draft with *"You are not speaking in my
voice."*

One scoping caveat: acronym first-use is chapter-wide, so on an extract tell the
agent what earlier sections already expanded, or its acronym findings will be
noise.

---

## Gate 2 — The book, in Petra's voice from the first sentence

Order within the day: introduction and objectives → Before Class reading and
reading questions, *if this day has one* → `Part N` subsections matching the plan
→ Reference material at the end. **Do not write `<slide>` blocks yet** — they are
Gate 3, after her pass.

Everything you need is in `AUTHORING-book.md`. Two things to do before you start
typing, not after:

**Read the three voice specimens.** They are Petra's own hand passes, and they
are the specification — the S-rules are only their summary.

| Specimen | What it is |
| --- | --- |
| `plans/day10-voice-reference.diff` | **Read this one first.** 692 lines, her only full prose pass over a finished draft. S-22…S-28 come from it |
| `plans/day9x-voice-reference.md` | Day 9x prose — S-20, S-21, the count rule |
| `plans/day8-voice-reference.diff` | the Day 8 deck and pre-class video — S-11…S-19 |

Two calibrations matter as much as the rules, and drafts get both backwards:
**her register is plain and explanatory, not terse** — many of her replacements
are *longer* than what they replace — and **"we" is the course**, including for
everything the course supplies.

The failures that keep recurring, so you can not-write them in the first place:
opening on what is **absent** rather than on what we are doing; the clipped,
contrastive, aphoristic register; slide titles that are epigrams rather than
names; missing "we'll" for what the class does; time budgets and "Part 3b" in
student-facing text; acronyms not expanded inline on first use (`PB9 (SDA —
serial data)`); reassurance theater, which B-12 bans and which comes back every
single time; classroom management in student-facing text (S-25 — spare hardware,
what to do if your build failed, raise your hand); the book explaining its own
teaching strategy to the student (S-23); course lore and war stories (S-24);
count-armatures — *"Two things follow, and the first is…"* (S-28); bold banner
lead lines, which are a `<term>` misused (S-29 — twenty-five of them in Day 10);
and fragments where a sentence belongs (L-12).

Two ordering rules that are book defects, not slide defects, and that the deck
will otherwise expose later: **a discovery must not be answered ahead of itself,
including inside a figure** (P-15 — check the SVG text nodes, not just the
prose), and **introduce what students write before the harness that tests it**
(P-16, whose corollary is that no task appears twice in a day).

**Read `AUTHORING-book.md` B-11e.** Arduino comparisons are **cut**, not
compressed: *"Get rid of how you would have done things in Arduino. Nobody
cares."*

Settle the figures here too, in this delivery: which exist, which are hers, which
need rebuilding, which do not exist and you need from her. Captions are then
written once, against final images.

Then run the mechanical checks (below), fix everything, and run the Gate 2
committee. Reports go to `reviews/dayNN-gate2.md` **before** the synthesizer runs
— it reads that file and will correctly refuse to consolidate reports that exist
only in a transcript. Scope `checker-technical-accuracy` per `Part N`; run whole
it has cost 22 minutes and 250k tokens on one day's material, which is why it
gets skipped. Give `checker-figure-claims` and `learner-visual` the **rendered**
figures, not their paths.

Then apply the synthesizer's list, and **verify it item by item against the
finished file** — not against your own edit scripts' success output. Four applied
fixes were silently clobbered by a later script that had read the file before
them and wrote it after.

**Then hand her the book, and stop.** Do not start slides while you wait.

---

## Gate 3 — Slides, condensed from the text she passed

Start by reading what she changed:

```bash
git log --oneline -15 -- source/ch-NAME.ptx
git diff <the commit before her edits> -- source/ch-NAME.ptx
```

Every slide condenses a specific paragraph or activity. For each one, open that
paragraph **in its post-pass form** and ask *did she already write this sentence?*
If so, use hers — see the reuse rule above, which is where this delivery most
often goes wrong.

Author the `<slide>` blocks beside the prose they condense, then the deck JSON.
Mechanics in `AUTHORING-slides.md`. This step is condensation, not design — the
plan already fixed the arc. If a section resists condensing, the section is not
clear yet.

Three rules that are cheap here and expensive later:

**A slide must be usable from the wall, with no book open (S-9).** Every symbol
on a code slide needs a referent the room has already seen. `helloDisplay.c`
projected with its `#define` block stripped out to make it fit, so every name on
the slide was undefined — Petra: *"just pops out of nowhere."*

**Never compress her sentences to make a slide fit.** Restoring her register
*will* overflow slides — nine of them on Day 10 — and the cheapest repair is
always to tighten her wording, which is exactly the direction the voice rules
forbid. The legitimate levers, in order, are in `AUTHORING-book.md` under the
S-22…S-28 calibrations: merge two bullets, delete what the code block or figure
already states, move a closing line into the `<caption>`, drop a blank line from
a listing, abridge the *listing* and say so in a `<note>`, or split into two
slides **where both halves teach**. Shortening her prose is not on the list.
`room="compressed"` tightens spacing without changing type size and is neither
thinning nor splitting.

**Every slide must earn its place.** What does a student get from this that they
did not get from the slide before it? Two slides survived four rounds of review
with no answer: a troubleshooting slide with no diagnosis in it, and a slide
about why `+` goes to 3.3 V that existed only to fix a crop. Never fix a crop by
adding a slide. And **prefer a `ref` over a `prompt`** — a `prompt` is book
content retyped into the JSON, so it drifts by construction and projects larger
and plainer than its neighbours; she had both of Day 10's removed.

### The fit check

Run the snippet in `AUTHORING-slides.md` **verbatim**, including the style
injection that kills the crossfade. Waiting after setting `location.hash` is not
enough on its own: during the transition both slides are in the DOM, so a slide
that fits exactly comes back "311 px over". If a screenshot shows the slide's own
text repeated below itself, that is what you are measuring.

The snippet reports what is measurable and refuses to answer when it cannot —
suspended layout in a background window reads 0 everywhere and looks exactly like
"fits", and a `<pre>` scrolls inside itself so a listing can lose a third of every
line while the body reports no overflow at all.

**What no measurement will tell you: whether a figure is readable from the back
of the room.** Figures letterbox now rather than cropping, so the failure mode is
a wide diagram made *small* by a bullet-heavy slide, at zero measured overflow.
The lever is the number of bullets, or a paired image-dominant slide carrying the
figure at full size. **Look at every slide that carries a figure.** (An `.svg`
with a `viewBox` and no `width`/`height` projects at 300×150 whatever room it has;
`check_rules.py` errors on that now, B-11a.)

### Then the book/slide cross-check — Step 5b

Do this before the deck's committee, not after. A `<slide>` block and the
paragraph it condenses are **separate texts, and no build, linter or check
compares them.** Beyond reusing her sentences, three things a slide gets wrong
that no diff will show:

- **a claim the book has since retracted** — Day 10's findings slide still said
  "ChatGPT never zeroes `TIM14->CNT`" after the book had replaced it, so the
  projector was contradicting the chapter;
- **numbers that appear nowhere in the book** — an invented "about ninety
  microseconds" against the book's "long before the ninth clock pulse";
- **the deck's own glue.** `recap`, `agenda`, `prompt` and `section` entries are
  authored in the JSON, not the book, so they drift independently and silently.
  Read them against the section they introduce.

---

## Gate 3.5 — The deck's committee

The slide-facing reviewers only, per `.claude/agents/README.md`; reports to
`reviews/dayNN-gate3.md`, then the synthesizer, then apply. `learner-in-the-room`
is the one that matters most here — it walks the deck in projection order asking
what each slide adds — and `checker-voice` reads the slides against the prose they
condense, which is the only automatic check on Step 5b there is.

Then hand her the deck.

---

## Gate 4 — Close the loop

Anything she corrected in either pass that is **general** becomes a rule in
`AUTHORING-book.md`, with her before → after pair beside it, because the examples
are what make a rule usable. That is the only mechanism that makes the next
chapter cheaper than this one. Update the chapter status table in
`CHAPTER_PROCESS.md` in the same commit.

If a correction is *not* general, say so rather than inventing a rule to cover
it — an over-broad rule is how the last pass flattened a metaphor she had
deliberately left standing.

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
`build-all.sh` builds all five targets, including the student deck via
`build-deck.sh` — a bare `pretext build web-deck` leaves the deck *list* naming
the instructor slides it just stripped.

**Solutions.** Every coded activity has an instructor solution (P-10). A worked
answer goes in an `<instructor>` element, which is *stripped* from the reading
book, the student deck and the PDF; the deck may `ref` that block directly rather
than a `<slide>` repeating it, and should, because two copies of one solution
drift invisibly. A deck entry's `"instructor": true` must agree with the source
marker; `check_deck.py` fails when it does not.

**`git status` before committing. Petra edits this repo while you work: commit
only files you changed, never `git checkout` a directory to tidy up, and never
revert a change you did not make.**

Never change an `xml:id`, a `ref`, `stack`, `room`, `"instructor"`, `"page"`,
`"slide"` or `"type"` unless that is the change (see the rewrite-scar exception
above). Never change a number — address, register value, cycle count, table or
section number — unless you are correcting it against a verified source, and say
so in the commit.

## Report back

Per unit, what changed and why. Then, at the end of each delivery:

- the questions you asked Petra and which are still unanswered;
- anything you could not verify and therefore left alone;
- every figure you need that does not exist;
- **delivery 2 only:** fit measurements for the slides you touched — **do not
  fabricate these**; if a slide could not be measured, say so, and say which ones
  you looked at by eye;
- where you used her wording from an old deck or from her hand pass, and where
  you deliberately did not;
- any correction of hers you think is general enough to become a rule.
