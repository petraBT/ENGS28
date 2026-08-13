# Handover: rebuild the review committee, then write the chapter-generation prompt

Paste everything below the line into a fresh session in `~/repos/ENGS28`.

---

You are working in the ENGS 28 textbook repo — PreTeXt book source plus a
classroom deck player. Branch `main`. Work on `main`, commit per unit, push as
you go.

## Your task, in one line

The review committee in `.claude/agents/` did not prevent a bad draft reaching
Petra. **Rebuild it against the actual defects that got through**, then write the
chapter-generation prompt that future chapters will be produced from.

You are producing **two deliverables**:

1. **A revised committee** — agent definitions in `.claude/agents/`.
2. **`plans/CHAPTER-GENERATION-PROMPT.md`** — the prompt Petra will paste into a
   new session to generate a chapter, replacing the ad-hoc handovers in
   `plans/ch-i2c-9x-10-handover.md` and `plans/ch9-week-rewrite-prompt.md`.

Do not touch `source/` or `assets/decks/` in this session. This is about the
process, not the content.

## Read these first

1. `AUTHORING-book.md` — the rule catalogue (P/B/S/L).
2. `AUTHORING-slides.md` — slide markup, layouts, the fit check.
3. `CHAPTER_PROCESS.md` — the workflow the committee sits inside.
4. `.claude/agents/README.md` and every agent definition.
5. **`plans/day9x-voice-reference.md`** and **`plans/day8-voice-reference.diff`**
   — Petra's own hand passes. These are the specification for her voice.
6. `git log --oneline 4f83003..HEAD` — the Day 9x/10 session this is drawn from.
   The commit messages record what was wrong and why.

## The evidence: what actually got through

Every item below is a real defect that reached Petra in a draft she reviewed.
Treat this list as the **regression suite** the rebuilt committee must catch.

### A. Voice — nothing in the committee looks for this at all

Her verdict on the draft: *"You are not speaking in my voice."* Then, later,
*"I made a bunch of changes also. Learn from them."* The recurring failures,
all in `plans/day9x-voice-reference.md` with her before/after pairs:

- Opening on what is **absent** — "Nothing was assigned to read before today,
  and nothing from Tuesday is a prerequisite. No EXTI, no NVIC, no ISR…" — where
  she writes "Today we'll start communicating with the seven-segment display in
  your kit."
- Aphoristic, contrastive register: "The direct approach is not short by a
  little"; "Today: the two wires. Thursday: the chip"; "the third is the day";
  slide titles like "Four wires, and 3.3 V not 5 V" where she writes "Wire up
  your display."
- Missing "we'll" for what the class does.
- Time budgets and "Part N" cross-references in **student-facing** text.
- Acronyms not expanded on first use — she adds "PB9 (SDA, serial data)",
  "I2C (Inter-Integrated Circuit)" every time.
- Reassurance theater — "There is known-good hardware in the room and we will
  get you onto it" — which B-12 already bans and which kept coming back.

### B. Reasoning errors that a constants-and-counts check does not catch

`checker-technical-accuracy` verified every `#define`, every image path and
every enumeration, and still missed these, because they are **arguments**, not
values:

- *"An 8-bit address whose lowest bit is 0 is the giveaway."* Wrong, and
  self-refuting: `0x70` — the chapter's own address — ends in 0. The real
  discriminator is magnitude: a 7-bit address is at most `0x7F`.
- *"An 8-bit one always [ends in 0], because that bottom bit is the direction."*
  False: 0 for a write, 1 for a read.
- *"The direct approach is short by more pins than the board has."* 34 − 22 = 12,
  and 12 < 22.
- A paragraph asserting the pull-up brings SDA HIGH before the ACK and then, four
  lines later, that the line never had a chance to rise.

### C. Figure/claim correspondence

- A slide captioned *"What passing 0xE0 actually looks like"* showed a capture of
  a write to `0x60`. Petra: *"does not correspond to 0xE0."*
- Segment names written lowercase in the text, uppercase in the figure.
- A caption promising annotations ("the STOP is at the right") the image did not
  contain.

### D. Slides that fail on their own terms

- `helloDisplay.c` projected as a 20-line listing with the `#define` block
  stripped to make it fit — so every symbol on the slide was undefined. Petra:
  *"just pops out of nowhere. How are they supposed to get anything out of this
  slide?"*
- A troubleshooting slide with no diagnosis in it. Petra: *"is useless. There is
  no help in there for them to diagnose the problem — so either improve or get
  rid of."*
- An activity task reading *"Write down the question you would have to answer to
  be able to write this program yourself."* Petra: *"What do you mean by this???"*
- A whole slide devoted to why `+` goes to 3.3 V, created only to fix a crop.

### E. Repetition

The six-field protocol list enumerated **four times in ten minutes**; the ACK
mechanism explained twice in full; the 3.3 V fact stated four times; a slide
restating the tasks of the activity two slides later. Petra: *"Stop repeating
things constantly."*

### F. Figures and fit

- `assets/i2c_transaction.svg` had a `viewBox` but no `width`/`height`, so
  browsers gave it the 300×150 fallback and it projected unreadably small.
  **Six other hand-authored SVGs in `assets/` had the same defect**, affecting
  other chapters.
- Slides silently **cropped** — the four-layer diagram lost its top and bottom
  rows, three stacked timing tables showed one — while every overflow
  measurement read zero.
- Two screenshots stacked in one figure on an image-dominant slide: both cut off.
- Rebuilt `pptx_annotate.py` composites with text outside its box, an arrow drawn
  through a label, and an ACK ellipse measurably on clock pulse 8 while every
  caption said the ninth.

### G. Process failures, not content failures

- **The committee was not run at all** until Petra asked *"Are you using the
  committee we constructed?"* Everything in A–F reached her first.
- The x-day structural convention (**no pre-class reading**) was never checked
  against `ch-debugging.ptx` or `ch-io-datasheets.ptx`, both of which already
  demonstrate it. A day was built on the wrong assumption and had to be rebuilt.
- Content was rewritten rather than reused: Petra's own `pingDisplay.c` loop
  idiom was replaced with a cleverer one that confused her, and her UART-vs-I2C
  comparison table existed in her deck all along.

## Deliverable 1: the revised committee

### Required changes

**Remove `learner-arduino-veteran`.** B-11e already says Arduino comparisons are
a garnish; Petra has since gone further — *"Get rid of how you would have done
things in Arduino. Nobody cares."* An agent whose job is to ask for more of a
thing that is banned is worse than no agent. Delete the file and amend B-11e in
`AUTHORING-book.md` from "at most a sentence" to "cut", citing her.

**Add a voice agent that sounds like Petra.** This is the gap she named. Design
notes, not prescriptions — you decide the details:

- Its specification is the two frozen specimens, not a rule list. It should read
  `plans/day9x-voice-reference.md` and `plans/day8-voice-reference.diff` every
  time and compare the draft against **her actual sentences**.
- It must be able to say *"this is not how she would write it"* and offer the
  rewrite, because the failure mode is register, not grammar. A lint cannot do
  this, which is why L-8…L-11 did not catch any of it.
- It should check the **book prose and the slide text together** — a `<slide>`
  block and the paragraph it condenses must not sound like different people.
- Consider whether it also owns "did you reuse what she already wrote?" — her old
  decks in `assets/ClassSlidesOLD/` are full of her own phrasing, and the draft
  kept inventing replacements for text that already existed.

**Strengthen `checker-technical-accuracy` to check reasoning, not just values.**
Section B above is its miss list. It needs an explicit pass for: claims that
contradict another chapter in the book; arithmetic in prose; a stated rule tested
against the chapter's own example; and a paragraph that contradicts itself.

**Add figure/claim correspondence** — section C. Whether that is a new agent or
a widened `learner-visual` is your call, but *someone* must open each image and
check that the caption describes what is actually in it.

**Make `expert-cognitive-load` own repetition explicitly.** It found section E
when it was finally run; its brief should name repetition as a first-class
output, with a count of how many times each idea is stated.

**Consider a "does this slide earn its place" pass** — section D. Every slide
should have to answer: what does a student get from this that they do not get
from the slide before it? The two useless slides both survived four rounds of
my own review.

### Validate the committee against the regression suite

Do not ship agent definitions you have not tested. For each defect in A–F,
there is a commit in `git log` where it was present and a later one where it was
fixed. **Check out the bad version of the artifact into a scratch path, run the
relevant agent against it, and record whether it fires.** Put the results in
`.claude/agents/README.md` as a table: defect, agent, caught / missed.

An agent that does not catch its own regression case is not finished.

### Also fix the process, not only the agents

`.claude/agents/README.md` should say plainly **when** the committee runs and
that a draft does not reach Petra before it has. From this session:

- Run it **early, on the outline**, not once at the end on 3,700 lines.
- Run the cheap ones in parallel; `checker-technical-accuracy` took 22 minutes
  and 250k tokens on one day's material, so it needs scoping to a section.
- Structural conventions get checked against sibling chapters **before** writing,
  not after.

## Deliverable 2: the chapter-generation prompt

Write `plans/CHAPTER-GENERATION-PROMPT.md` — what Petra pastes into a new
session to produce a chapter. It supersedes the two ad-hoc handovers in `plans/`.

It must encode what this session learned the hard way:

- **Ground truth before prose.** Read the real driver source, the old deck
  (`python3 scripts/pptx_mine.py`), the lab handout. Check sibling chapters for
  the structural convention. Never invent a classroom fact.
- **Reuse before invention.** Petra's old decks carry her own wording, her own
  comparison tables and her own worked examples. Use them. The draft that gets
  to her fastest is the one that started from what she already wrote.
- **Voice from the start**, not as a final sweep. Point at the two specimens.
- **The committee gates the draft**, with the schedule above.
- **The fit-check protocol**, including the three false-negative traps in
  `AUTHORING-slides.md` and the fourth this session found: an SVG with no
  intrinsic `width`/`height` projects at 300 px regardless.
- **Small commits, pushed as you go** — two previous cloud agents stalled on
  whole-chapter scope.
- **What to ask rather than guess**: hardware facts, equipment, anything the repo
  cannot establish. Petra would rather answer four questions than correct forty
  sentences.

Keep it as short as it can be while still being sufficient. The existing
handovers are ~300 lines and were still missed in places; length is not the
lever, ordering and hard gates are.

## Workflow

Small units, push after each. Before every commit:

```
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

`git status` before committing. Petra edits this repo while you work: commit only
files you changed, never `git checkout` a directory to tidy up, and never revert a
change you did not make.

## Report back

- What changed in the committee, and why, agent by agent.
- The regression table: which defects each agent now catches, and which are still
  uncovered — say so plainly rather than claiming full coverage.
- Anything in the evidence above you think is **not** worth defending against,
  with your reasoning. Some of these were one-offs and a rule for each would make
  the committee slower without making it better; say which you think those are.
