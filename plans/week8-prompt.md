# Week 8 — the session-1 prompt

Paste everything below the line into a fresh session in `~/repos/ENGS28`.

This is a **week-level** prompt: it scopes the first session and sets the arc.
The per-unit machinery — gates, deliveries, voice, slides — lives in
`plans/CHAPTER-GENERATION-PROMPT.md` and is not repeated here; that file is
part of this prompt by reference. Where the two disagree, this file wins for
scope, that file wins for process.

---

You are building Week 8 of the ENGS 28 textbook: **Days 15, 15x, and 16 —
servomotors, then the solar tracker**. Branch `main`, small commits, pushed as
you go. Read `plans/CHAPTER-GENERATION-PROMPT.md` in full before anything else;
every gate and working rule in it applies to every session this week.

## The week

| | **Day 15** | **Day 15x** | **Day 16** |
|---|---|---|---|
| Topic | Servomotors | Servos, continued | Photosensors + solar tracker |
| Chapter | `ch-servos.ptx` | `ch-servos.ptx` | `ch-photosensors.ptx` |
| Class length | Tue, **110 min** | Wed x-hour, **50 min** | Thu, **110 min** |
| Pre-class reading | yes | **none — x-day** | yes |
| Her old deck | `Day15-Servos.pptx` | `Day15x-Servos(2).pptx` | `Day16-Photosensors.pptx` |

Class lengths are stated here because the 65-minute error has now been made
three times in this repo. Take them from this table, not from assumption.

**The arc the week serves:** Lab 8 (`assets/Labs/Lab8_ES28.pdf`) is one lab
spanning both chapters — technical study of photocells, technical study of
servos, and a Design Challenge: the solar tracker. Day 16 is where the course
closes its biggest loop: the ADC driver from the ADC week plus the servo
driver from this week become one feedback system. The lab is the downstream
constraint, not the goal (P-13) — and note that the lab's graded deliverables
(datasheet min/max, calculated R, expected voltages) are **the students'
work**; see the giveaway rule below before writing anything that computes them.

**The chapters are not greenfield, and they are not trustworthy either.**
`ch-servos.ptx` (~540 lines) and `ch-photosensors.ptx` (~477 lines) exist as
placeholder drafts written before the voice rules, the gates, and most of the
authoring rules existed. Treat them as an outline someone else left behind:
read them, mine anything genuinely useful, and verify **every number in them
against a primary source before it survives** — the embedded Canvas quiz
questions assert stall currents and pulse-width-to-angle endpoints that no one
has checked against a datasheet. The "Continuing or reworking an existing
unit" section of the chapter prompt applies, with the trust level set lower.

## What THIS session does — and does not

Week 7 took nine sessions for three days, and the expensive part was never the
planning — it was corrections after delivery. The shape that worked: one
session of ground truth and Gate 1 for the whole week, then one delivery per
session after that. Keep that shape.

**This session delivers exactly four things:**

1. **Ground truth for all three days** — `plans/week8-ground-truth.md`. Mine
   all three old decks (`scripts/pptx_mine.py`, `--arc` first, then whole,
   then `--code`); read Lab 8 end to end; read both placeholder chapters and
   list what in them is usable, what is unverified, and what contradicts her
   decks; read `ch-motors.ptx` for what TIM14 PWM already taught (Day 15
   revisits it — what is recall and what is new is a plan-level decision) and
   `ch-adc.ptx` for what the ADC driver looks like when Day 16 picks it up.
2. **The week map** — `plans/week8-map.md`, in the format of
   `plans/week5-map.md`: the arc across the three days, what each day builds,
   what hands off to what, where the lab's three sections land.
3. **The question list, sent to Petra** — everything the repo cannot
   establish. Ask about anything the decks and lab leave open. Four questions
   now beat forty corrections later. Two are already answered — do not
   re-ask:
   - **The parts and their datasheets** (added 2026-09-02): the servo is the
     **SG90** (`assets/datasheets/Servosg90_datasheet.pdf`), the photocell the
     **PDV-P8001 CdS cell** (`CdS-photocell-PDV-P8001.pdf`, with
     `Adafruit-photocells.pdf` as the guide). Verify every placeholder number
     against these.
   - **The servo's 5 V supply** (Petra, 2026-09-02): *"We are using the same
     voltage regulator as we did for motors - we're not using the battery
     pack."* That is the regulator board from `ch-motors.ptx` — the 6–12 V
     wall adapter into the barrel connector, a steady 5 V out on the header —
     with `fig-tb6612-regulator` and her wording already in the book. Reuse
     both; never write "battery pack".
4. **Gate 1, at week level** — three one-page day plans plus outlines
   (`plans/day15.md`, `plans/day15x.md`, `plans/day16.md`), reviewed together
   by the Gate 1 panel (roster in `.claude/agents/README.md`), report to
   `reviews/week8-gate1.md`. Week 7 ran Gate 1 at week level and it worked;
   the crucial-step and stretch budget for each day only make sense against
   the other two days.

Then **write the handover** — `plans/week8-handover.md`, plus
`plans/day15-prompt.md` telling the next session to build Day 15's book
(delivery 1) per the chapter prompt — and stop.

**This session writes no chapter prose and no slides.** If Gate 1 finishes
with time left, the right use of it is sharpening the question list and the
handover, not starting Day 15.

**Sessions after this one, in order, each starting from the handover:**
Day 15 book → her pass → Day 15 deck → Day 15x book (no reading — x-day) →
her pass → Day 15x deck → Day 16 book → her pass → Day 16 deck. Update
`plans/week8-handover.md` and the `CHAPTER_PROCESS.md` status row at the end
of every session.

## What Week 7 cost, so Week 8 doesn't pay it again

Day 14 alone took **five comment passes — over a hundred review comments
across the week** — and nearly every one belongs to a failure class that was
already written down somewhere. The committee's job this week is to catch
these before Petra does. In cost order:

**1. Her language. This is the one that keeps failing.** Her decks carry her
phrasing; use it nearly verbatim, and when she supplies a sentence in a review
comment, it goes in **verbatim** — not improved, not tightened. The failure
signature is paraphrase: text that says, worse, something she already wrote
well. She has rejected an entire draft with *"You are not speaking in my
voice."* Her register is plain and explanatory, not terse — her replacements
are frequently *longer*. Before any substantial passage (a definition, a
comparison, a diagnostic list, a worked example), check the old deck for hers
first. Voice probe (Gate 1.5) on the first subsection before writing the rest.

**2. Invented claims.** Week 7's worst moment: telling students to confirm a
build compiles when the half-finished driver cannot compile — *"that makes no
sense... Come on - this is ridiculous. don't invent stuff like that."* Every
claim about what students will observe must be traced to the real driver, the
real datasheet, or her deck — or turned into a question for her. This week's
live risks: servo stall current, pulse-width endpoints, photocell resistance
ranges — all currently unverified placeholder numbers.

**3. Giving away their work.** *"You are giving away their work. Don't do
that."* Anything students hand in — homework answers, lab deliverables,
register values they derive, expected voltages they calculate — never appears
in student-facing text, **even after the in-class reveal**. Reveals live in
`<instructor>` blocks only. Screenshots need the same care: a terminal capture
that shows a value they were asked to compute gets blurred or replaced. Lab
8's deliverables list is the protected list for this week.

**4. Sequencing that doesn't execute.** Instructions must work in the order
written: Week 7 shipped "exclude the file, then re-run it." Walk every
activity as a student actually performing it, in order, before delivery.

**5. Nothing projected may link into the book.** No `<xref>` inside a
`<slide>`, nor inside any `<activity>` or `<instructor>` a deck refs directly
— *"This would kick me out of the slides in class - bad idea."* Name the thing
plainly instead. This is easy to miss because activities are written for the
book first; check every deck-ref'd block.

**6. Both surfaces, every time.** *"Be sure to apply the slide ones in the
book also as I have not double marked them."* A book paragraph and the slide
that condenses it are one text in two tellings: whenever either changes,
re-read the **whole pair** side by side — not just the sentence a comment
named. Week 7 shipped a paragraph that had silently missed its slide's fixes.

**7. The mechanical voice rules, from the start, not as a sweep:** whole
sentences (captions, titles, checklists, table cells exempt); no em dashes;
no personifying hardware or software; diagnostic material as checklists, not
prose (*"Much easier to process"*); a single-task activity uses a plain
`<statement>`, never a lone lettered `(a)`; PreTeXt cannot nest a list inside
a list item — fold sub-points into the parent item's text; don't over-explain
routine steps (*"We have done this many times - they are not babies"*); and
cited sources **present** math, they don't invent it — the app-note framing
rule from Day 14 applies directly to whatever this week cites for servo
control.

**8. Datasheet activities familiarize.** Her design intent, in her words:
make students *"look through all kinds of parts of the datasheet to
familiarize"* — not fetch one value that happens to serve the homework. The
servo and photocell datasheets, once she supplies them, get that treatment.

## Report back, end of session

The week map's arc in three sentences; the questions sent and which block
what; what in the placeholder chapters survives and what is condemned; the
Gate 1 verdicts and what changed because of them; and the handover's location.
