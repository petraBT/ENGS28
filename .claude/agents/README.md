# The ENGS 28 review committee

Reusable reviewer agents that run against any draft — a lesson plan, an outline, a
chapter, or a deck. They exist so that Petra reviews a near-final draft instead of
finding the same twelve problems by hand every chapter.

Every reviewer scores against the numbered rules in `AUTHORING-book.md` and cites
rule IDs, so feedback is traceable and the synthesizer can deduplicate it.

> **This roster was rebuilt in August 2026 against the defects that actually
> reached Petra in the Day 9x / Day 10 draft**, not against opinions about what a
> committee should contain. Every change below has a regression case, and the
> results of running each agent against its own case are in
> [The regression suite](#the-regression-suite) at the bottom. Read that table
> before trusting any claim of coverage here.

## When the committee runs

This is the part that failed. On the I2C week the committee **was not run at
all** until Petra asked *"Are you using the committee we constructed?"* — so a
wrong hardware claim, a slide whose every symbol was undefined, and the same
six-field list enumerated four times in ten minutes all reached her first.

**A draft does not reach Petra until the committee has run and its list is
applied.** That is a gate, not a recommendation.

**And the unit is delivered twice** (Petra, 2026-08-13): the book first, and the
deck only after she has passed it — so there are two committee gates, one before
each delivery. See `CHAPTER_PROCESS.md`.

| When | Who | Reviewing |
| --- | --- | --- |
| **Gate 1** — after the lesson plan | the Gate 1 panel | `plans/dayNN.md` **and the outline** |
| **Gate 1.5** — the voice probe | `checker-voice` alone | the **first** subsection of prose, as soon as it exists |
| **Gate 2** — before Petra's pass 1 | the standing core + rotators, then the synthesizer | **the book** — prose, activities, figures |
| **Gate 3** — before Petra's pass 2 | the slide-facing panel, then the synthesizer | **the deck** — `<slide>` blocks and the deck JSON, against the prose she passed |

Four rules about scheduling, all learned the expensive way:

**Run it early, on the outline — not once at the end on 3,700 lines.** A
committee that first sees a finished chapter can only ask for rewrites. Gate 1
already paid for itself once: revision 1 of the ADC lesson plan was missing the
entire read path, and three reviewers found it at a cost of one page.

**Gate 1.5 exists because register is systemic.** If the voice is wrong in the
first subsection it is wrong in all of them, and a sweep at the end produces a
chapter that is half hers — worse than either. Run `checker-voice` on one section
of prose before writing the rest.

**Nothing is reviewed against prose she has not passed.** Slides are condensed
from her post-pass text, so Gate 3 is the first time a reviewer sees a slide.
Day 10's deck was built from a draft she then hand-rewrote, and twenty-two slides
inherited wording she had already replaced.

**Scope the expensive reviewers, and start them first.** The three `checker-*`
agents cost roughly 100–180k tokens each on one day's material — see the cost
column below — and `checker-technical-accuracy` run as a single unscoped sweep
has cost 22 minutes and 250k, which is precisely why it gets skipped. Run it
**per `Part N`, in parallel**, plus one whole-chapter invocation that does
nothing but its B3 self-contradiction read. Launch all three checkers before the
learner and expert panels: they are the long poles, and everything else in the
core is cheap. All of them are independent and read-only, so they run together.

Write every reviewer's report to `reviews/dayNN-gateN.md` **before** running
`committee-synthesizer`. It reads that file; it cannot consolidate reports that
exist only in a chat transcript, and it will correctly refuse to invent them.

Give `learner-visual` the **rendered** figures rather than their paths — it is a
sonnet persona and will not spend its budget rasterizing.
`checker-figure-claims` renders its own, deliberately; a directory of
pre-rendered PNGs saves it time but does not excuse it from opening anything it
was not given.

## The panels

**Verification** — not personas. These check that something is true, and they are
the three that most recently caught what everything else missed.

| Agent | Verifies | Cost (measured, one day's material) |
| --- | --- | --- |
| `checker-technical-accuracy` | claims against the driver, the RM, the rest of the book; **and reasoning** — a rule against the chapter's own example, arithmetic in prose, self-contradiction | **115k tokens, 9 min** for Part B alone on a scoped section; 250k / 22 min unscoped |
| `checker-figure-claims` | that every caption, slide title and claim describes what is **actually in the rendered image** | **180k tokens, 16 min** for twelve figures — it renders, crops and measures, and that is the expensive half |
| `checker-voice` | that the prose and slides sound like Petra, against her three hand passes; and that her existing wording was reused rather than reinvented | **107k tokens, 6 min** including the reuse pass over the old deck |

**All three verification agents are expensive, and two of them are expensive on
purpose** — `checker-figure-claims` spends its budget rendering, cropping and
counting features in images, which is the whole reason it finds what source
review cannot. Scope them by section and run them in parallel with each other;
do not try to make them cheap by giving them less to look at than a whole
figure or a whole argument.

**Learner panel** — nine students who fail in different ways.

| Agent | Fails when… |
| --- | --- |
| `learner-in-the-room` | a slide gives nothing the previous one didn't, or can't be used from the wall |
| `learner-firstgen-novice` | jargon is undefined or background is assumed |
| `learner-visual` | an abstract idea has no picture, or a figure lost its annotations |
| `learner-text-first` | a figure carries a claim the prose never states |
| `learner-c-fluent` | the real difficulty is under-served, or the stretch is busywork |
| `learner-python-intro` | a C-ism is assumed — widths, hex, bit ops, pointers |
| `learner-weak-circuits` | wiring or algebra skips steps |
| `learner-ai-reliant` | an activity can be outsourced wholesale |
| `learner-anxious-nonhardware` | failure is unrecoverable or the tone assumes delight |

**Expert panel** — seven specialists.

| Agent | Audits |
| --- | --- |
| `expert-cognitive-load` | working-memory demand, chunking, fading scaffolds — **and owns the repetition census** |
| `expert-continuity-auditor` | prerequisites, forward references, downstream delivery |
| `expert-class-logistics` | whether the plan survives a real 65 minutes |
| `expert-active-learning` | who is doing the intellectual work |
| `expert-rigor-hawk` | depth removed and called scaffolding |
| `expert-ai-era-readiness` | what still matters when AI writes the code |
| `expert-embedded-industry` | datasheet fluency and habits that transfer |

**Synthesis** — `committee-synthesizer` turns the above into one prioritized,
executable change list and resolves rigor-vs-accessibility.

## Convening a panel

**Gate 1 — the plan and the outline** (cheap, minutes):

```
expert-active-learning, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-firstgen-novice, learner-anxious-nonhardware
```

**Gate 1.5 — the voice probe**, on the first subsection of prose only:

```
checker-voice
```

**Gate 2 — the book's standing core (9 + synthesizer).** These earned their place
by finding defects nothing else caught:

```
checker-technical-accuracy    wrong code, wrong registers, wrong arguments   [scope per Part]
checker-voice                 register; reuse of her existing wording
checker-figure-claims         caption vs. what is in the image
expert-cognitive-load         load per part, and the repetition census
expert-continuity-auditor     forward refs, deferred topics, downstream fit
expert-class-logistics        whether the hour actually works
learner-visual                figure coverage, annotations, legibility
learner-firstgen-novice       unexplained jargon, unreachable crucial step
learner-anxious-nonhardware   no diagnostic path, no way back in
```

`learner-in-the-room` is **not** in this core: it walks a deck, and at Gate 2
there is no deck. It leads Gate 3 instead.

**Gate 3 — the deck's panel (6 + synthesizer)**, on the `<slide>` blocks, the
deck JSON and the prose they condense, together:

```
learner-in-the-room           what each slide adds; slides that can't be used from the wall
checker-voice                 slides vs. the paragraph they condense — the only check on Step 5b
checker-figure-claims         slide titles and captions vs. what is in the image
learner-visual                legibility at projection size; a letterboxed figure gone small
expert-cognitive-load         the repetition census across the projected hour
expert-class-logistics        whether the deck's arc survives 65 real minutes
```

Give `checker-voice` **both** texts at Gate 3. Her hand pass reaches the slides
and the deck and stops at the paragraph margin — or the reverse — and the drift
is only visible when the two are read side by side.

**Rotators — add when the chapter has that character:**

| Add | When the chapter… |
| --- | --- |
| `expert-rigor-hawk` | has real quantities, timing, or tolerances to get right |
| `expert-embedded-industry` | teaches a habit that transfers (datasheets, register contracts) |
| `expert-ai-era-readiness` | has activities an AI could complete outright |
| `expert-active-learning` | has a new activity structure (**not** for routine passes — see below) |
| `learner-python-intro` | introduces new C syntax or integer-width reasoning |
| `learner-weak-circuits` | asks students to wire or measure something new |
| `learner-c-fluent` | risks boring the fast students, or the stretch is thin |
| `learner-text-first` | leans heavily on figures |
| `learner-ai-reliant` | has a codeable deliverable |

Running all twenty is only worth it for a chapter unlike anything done before.

**Two cautions.**

`expert-active-learning` is the one reviewer whose advice has been *wrong*: it
demanded a visible debrief for every part, those became slides, and Petra
rejected them as condescending (now **S-10**). It is corrected, but weigh its
structural recommendations against her taste rather than applying them straight.

`expert-embedded-industry` asks for real-world grounding, and Arduino comparisons
are the wrong way to supply it. **B-11e says cut them** — *"Get rid of how you
would have done things in Arduino. Nobody cares."* Weight it down on that point.
`learner-arduino-veteran` was retired for exactly this: an agent whose brief is
to ask for more of a banned thing is worse than no agent.

Petra's own review remains the last word; the committee exists to make her pass
short, not to replace it.

Give every reviewer the same brief: the file(s) under review, the lesson plan,
the relevant old deck, and a pointer to `AUTHORING-book.md`. Then pass **all**
their reports to `committee-synthesizer`, including the ones that agree.

## Conflict is the point

The rigor hawk and the learner panel are built to disagree. That tension is the
committee's most useful output, and resolving it is the synthesizer's job — under
Petra's rule: scaffold the crucial step for the slowest student (P-2) *and* keep a
genuine challenge for the fastest (P-3). Depth is added at the top, never removed
from the middle.

## The regression suite

Every agent changed or added in the August 2026 rebuild was run against the
defect it exists for, with the **bad version of the artifact checked out of git**
and a brief that named only the files — never the defect. Full method, fixtures,
rebuild commands and per-run detail: `reviews/committee-regression-2026-08.md`.

**An agent that does not catch its own regression case is not finished.** Read
the "how strong is this" column before trusting a row.

| # | Defect that reached Petra | Owner | Result | How strong is this |
| --- | --- | --- | --- | --- |
| A | Opening on what is absent; aphoristic register; missing "we'll"; time budgets and "Part 3b" in student-facing text; unexpanded acronyms; reassurance theater; a verbatim second telling; a count as rhetoric | `checker-voice` | **caught — all 7** | strong. Also produced 13 findings in neither specimen, so it generalizes. `we'll` count independently verified |
| A′ | Her existing wording reinvented instead of reused | `checker-voice` reuse pass | **caught** | strong. Recovered her UART/I2C table, her protocol slide, her controller/target line from the old deck |
| B1 | "An 8-bit address ending in 0 is the giveaway" — refuted by the chapter's own `0x70` | `checker-technical-accuracy` B1 | **caught (BLOCKER)** | good. Ran the rule over the chapter's instance and showed the misclassification |
| B2 | "Short by more pins than the board has" — 34 − 22 = 12 | B2 | **caught (BLOCKER)** | good. Recomputed, and listed 18 calculations it checked and found correct |
| B3 | A paragraph contradicting itself in four lines | B3 | **caught (BLOCKER)** | **strongest in the suite** — it reported the same defect as *still live* in `source/ch-i2c.ptx`, so it cannot be diffing against a fix |
| B4 | D0/D1 on the virtual COM port, which `ch-uart.ptx` contradicts | B4 | **caught (BLOCKER)** | good. Cited `ch-uart.ptx:900-904` as the source |
| C1 | Slide captioned "What passing `0xE0` actually looks like" over a capture of `0x60` | `checker-figure-claims` | **caught, under-graded** | mixed. Found the pairing and the fix, graded MINOR where Petra graded it a defect. **Brief corrected** — grade a slide as if seen alone |
| C2 | Segment names lowercase in text, uppercase in figure | `checker-figure-claims` | **caught (MAJOR)** | strong |
| C3 | A caption promising what the image does not contain | `checker-figure-claims` | **caught (BLOCKER)** | strong, in two instances — a wiring caption whose destination is cropped out of frame, and a caption promising a decoded view over an undecoded screenshot |
| D1 | `helloDisplay.c` projected with its `#define` block stripped — every symbol undefined | `learner-in-the-room` | **caught (BLOCKER)** | strong. Tabulated 9 identifiers as "last seen: nowhere" and traced the downstream cost |
| D2 | A troubleshooting slide with no diagnosis in it | `learner-in-the-room` | **caught (MAJOR)** | strong, via the two-causes test |
| D3 | "Write down the question you would have to answer…" | `learner-in-the-room` | **caught (MAJOR)** | weaker — **synthetic fixture**. No committed bad version exists |
| D4 | A whole slide created only to fix a crop | `learner-in-the-room` | **caught (MAJOR)** | weaker — same synthetic fixture |
| E | An idea stated four times in ten minutes | `expert-cognitive-load` census | **caught 3 of 4**, and **re-tested clean 2026-08-08** | **no longer the weakest row — see below.** The August run's brief named this chapter's own instances, so it tested recall as much as detection. The re-test on the reworked Day 10 is the clean one |
| F1 | An `.svg` with no `width`/`height` projecting at 300×150 | `scripts/check_rules.py` (B-11a) | **caught — by the linter** | strongest possible. Blocks the commit; fires on the pre-fix file, silent on the whole live book |
| F2 | A slide's figure silently cropped while every measurement reads zero | — | **not covered** | there is no static or measurable signal. `checker-figure-claims` names candidates with bullet counts; that is triage, not detection. **The control is the human fit check** (`AUTHORING-slides.md`, trap 4) |
| F3 | Two screenshots stacked in one image-dominant figure | `checker-figure-claims` | **caught (MAJOR)** | strong, with the right fix (two figures, not a `<sidebyside>`) |
| F4 | Composites with text outside its box, an arrow through a label, a dropped annotation, and an ACK ellipse on clock pulse 8 | `checker-figure-claims` | **caught — all four kinds** | strong. It measured the ellipse's bounding box against pulse centres rather than eyeballing it, and said "ask for the original" instead of proposing patches |
| G | The committee not being run at all | process, not an agent | **addressed, untestable** | the gate is in this file, `CHAPTER_PROCESS.md` and `plans/CHAPTER-GENERATION-PROMPT.md`. No agent can enforce it |
| G′ | A structural convention never checked against sibling chapters | `checker-technical-accuracy` B4 + `CHAPTER_PROCESS.md` Step 0.5 | **caught** | good — the B run confirmed the x-day no-reading convention holds, citing `ch-debugging.ptx` |

**Two things this table does not claim.** `learner-visual`, and every expert and
learner persona other than `learner-in-the-room` and `expert-cognitive-load`,
were **not re-tested** in this round — they are unchanged and their evidence is
the `reviews/day*-gate2.md` transcripts. And the agents were exercised by loading
their briefs into a general-purpose agent at the same model, because the agent
registry snapshots at session start; what was tested is the brief, not the
dispatch.

### Row E, re-tested on Day 10 — the census holds

The August run of `expert-cognitive-load` was the suite's weakest row for a
structural reason: the agent's brief names *this chapter's own* repetition
instances as its calibration example, so running it against this chapter tested
recall as much as detection. The re-test that row asked for was run on
**2026-08-08**, against the reworked Day 10 — material the brief does not
describe, and which did not exist when the brief was written. The agent was
given the files and the day's shape, and **no hint of what to find**.

**Result: the census works.** Six rows, each with a count, a location list, a
keep and a reduce-to. Two of them are defects nothing else in the committee
found — the HT16K33 oscillator fact stated **five times in one session, twice
back to back inside the part containing the crucial step**, and four of the
recap's eight items being near-verbatim copies of a slide bullet from minutes
earlier rather than compressed callbacks.

Two things make this a real detection result rather than a lucky one. It
**distinguished deepening from rewording** on its own: of Part 3's three
sub-beats over the pre-class reading it passed two as genuine deepening and
flagged only the third, which is reworded with no new technical content. And it
caught a **structural contradiction** the census is not obviously aimed at —
Part 3 tells students they already know the segment bit mapping, and Part 5 then
re-derives it in full, in both prose and slide, contradicting Part 3's own
forward pointer.

Treat row E as good now, on the strength of a fixture the brief cannot have
memorized. The remaining caveat is the same one that applies to every row: the
agent was exercised through its brief, not through the registry dispatch.

### The open risk: `checker-voice`'s false-positive rate is unmeasured

An agent that flags everything is a report Petra stops reading, so `checker-voice`
was run twice against prose that had *already* had her hand pass, expecting
silence. **Neither fixture was clean, so no false-positive rate exists yet.**

Both runs found real, hand-verified defects instead, and both are the same
defect: **her hand pass reaches the `<slide>` blocks and the deck and stops at
the paragraph margin.** In `ch-i2c.ptx` the rejected opening, the known-good-
hardware paragraph and "Three things follow from sharing" all survive in prose
while the deck carries her replacements. In `ch-timers-interrupts.ptx` the slide
says "the point" where the prose still says "the whole point", the slide expands
CMSIS where the prose does not, the prose still carries the rescue sentence she
cut from the slide — and a later sweep flattened `plants` to `holds` on the
slide, a metaphor she had deliberately left standing.

That is Step 5b, observed twice, in the only two chapters where it can be
checked against a specimen. It is also the strongest argument for this agent
reading prose and slides **together**.

Evidence it discriminates rather than flags everything is indirect but real: it
graded the swept chapter **MAJOR** and the unswept one **BLOCKER** and said why;
it named titles it deliberately did *not* flag because her hand was visibly on
them; and it escalated three rule-versus-specimen tensions to her rather than
ruling on them.

**Treat the false-positive rate as an open risk until this agent runs on a
chapter swept end to end.** One scoping caveat found the hard way: **acronym
first-use sweeps are unreliable on an extract**, because first use is
chapter-wide — give it the whole chapter, or tell it what earlier sections
already expanded.
