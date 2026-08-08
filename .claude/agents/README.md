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

| When | Who | Reviewing |
| --- | --- | --- |
| **Gate 1** — after the lesson plan | the Gate 1 panel | `plans/dayNN.md` **and the outline** |
| **Gate 1.5** — the voice probe | `checker-voice` alone | the **first** subsection of prose, as soon as it exists |
| **Gate 2** — before Petra | the standing core + rotators, then the synthesizer | the whole unit, prose and deck |

Three rules about scheduling, all learned the expensive way:

**Run it early, on the outline — not once at the end on 3,700 lines.** A
committee that first sees a finished chapter can only ask for rewrites. Gate 1
already paid for itself once: revision 1 of the ADC lesson plan was missing the
entire read path, and three reviewers found it at a cost of one page.

**Gate 1.5 exists because register is systemic.** If the voice is wrong in the
first subsection it is wrong in all of them, and a sweep at the end produces a
chapter that is half hers — worse than either. Run `checker-voice` on one section
of prose before writing the rest.

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
| `checker-voice` | that the prose and slides sound like Petra, against her two hand passes; and that her existing wording was reused rather than reinvented | **107k tokens, 6 min** including the reuse pass over the old deck |

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

**Gate 2 — the standing core (10 + synthesizer).** These earned their place by
finding defects nothing else caught:

```
checker-technical-accuracy    wrong code, wrong registers, wrong arguments   [scope per Part]
checker-voice                 register; reuse of her existing wording
checker-figure-claims         caption vs. what is in the image
learner-in-the-room           what each slide adds; slides that shouldn't exist
expert-cognitive-load         load per part, and the repetition census
expert-continuity-auditor     forward refs, deferred topics, downstream fit
expert-class-logistics        whether the hour actually works
learner-visual                figure coverage, annotations, legibility, layout
learner-firstgen-novice       unexplained jargon, unreachable crucial step
learner-anxious-nonhardware   no diagnostic path, no way back in
```

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

*(filled in below)*
