# The ENGS 28 review committee

Reusable reviewer agents that run against any draft — a lesson plan, a chapter, or
a deck. They exist so that Petra reviews a near-final draft instead of finding the
same twelve problems by hand every chapter.

Every reviewer scores against the numbered rules in `AUTHORING-book.md` and cites
rule IDs, so feedback is traceable and the synthesizer can deduplicate it.

## The panels

**Learner panel** — nine students who fail in different ways.

| Agent | Fails when… |
| --- | --- |
| `learner-firstgen-novice` | jargon is undefined or background is assumed |
| `learner-arduino-veteran` | Arduino habits silently mislead |
| `learner-visual` | an abstract idea has no picture |
| `learner-text-first` | a figure carries a claim the prose never states |
| `learner-c-fluent` | the real difficulty is under-served, or the stretch is busywork |
| `learner-python-intro` | a C-ism is assumed — widths, hex, bit ops, pointers |
| `learner-weak-circuits` | wiring or algebra skips steps |
| `learner-ai-reliant` | an activity can be outsourced wholesale |
| `learner-anxious-nonhardware` | failure is unrecoverable or the tone assumes delight |

**Expert panel** — seven specialists.

| Agent | Audits |
| --- | --- |
| `expert-active-learning` | who is doing the intellectual work |
| `expert-rigor-hawk` | depth removed and called scaffolding |
| `expert-ai-era-readiness` | what still matters when AI writes the code |
| `expert-cognitive-load` | working-memory demand, chunking, fading scaffolds |
| `expert-continuity-auditor` | prerequisites, forward references, downstream delivery |
| `expert-embedded-industry` | datasheet fluency and habits that transfer |
| `expert-class-logistics` | whether the plan survives a real 65 minutes |

**Verification** — `checker-technical-accuracy` (not a persona: checks claims
against the driver, the reference manual, and the linter).

**Synthesis** — `committee-synthesizer` turns the above into one prioritized,
executable change list and resolves rigor-vs-accessibility.

## Convening a panel

**Gate 1 — the lesson plan** (cheap, run before writing the chapter):

```
expert-active-learning, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-firstgen-novice, learner-arduino-veteran,
learner-anxious-nonhardware
```

**Gate 2 — the full draft.** Running all 17 costs a lot and produces redundant
findings. Based on two full Gate 2 passes on the ADC pilot, run a **standing core**
every time and add rotators when the chapter's character calls for them.

**Standing core (7 + synthesizer)** — these earned their place by finding defects
nothing else caught:

```
checker-technical-accuracy      wrong code, wrong registers, invented facts
expert-continuity-auditor       forward refs, deferred topics, downstream fit
expert-class-logistics          whether the hour actually works
expert-cognitive-load           reading -> class handoff, load per part
learner-visual                  figures, captions vs. rendered image, legibility
learner-firstgen-novice         unexplained jargon, unreachable crucial step
learner-anxious-nonhardware     no diagnostic path, no way back in
```

**Rotators — add when the chapter has that character:**

| Add | When the chapter… |
| --- | --- |
| `expert-rigor-hawk` | has real quantities, timing, or tolerances to get right |
| `expert-embedded-industry` | teaches a habit that transfers (datasheets, register contracts) |
| `expert-ai-era-readiness` | has activities an AI could complete outright |
| `expert-active-learning` | has a new activity structure (**not** for routine passes — see below) |
| `learner-arduino-veteran` | replaces something an Arduino library did invisibly |
| `learner-python-intro` | introduces new C syntax or integer-width reasoning |
| `learner-weak-circuits` | asks students to wire or measure something new |
| `learner-c-fluent` | risks boring the fast students, or the stretch is thin |
| `learner-text-first` | leans heavily on figures |
| `learner-ai-reliant` | has a codeable deliverable |

**A caution about `expert-active-learning`.** It is the one reviewer whose advice
has been *wrong*: it demanded a visible debrief for every part, those became slides,
and Petra rejected them as condescending (now **S-10**). It is corrected, but weigh
its structural recommendations against her taste rather than applying them straight.

Petra's own review remains the last word; the committee exists to make her pass
short, not to replace it.

Give every reviewer the same brief: the file(s) under review, the lesson plan, the
relevant old deck, and a pointer to `AUTHORING-book.md`. Run them in parallel —
they are independent and read-only. Then pass **all** their reports to
`committee-synthesizer`, including the ones that agree.

## Conflict is the point

The rigor hawk and the learner panel are built to disagree. That tension is the
committee's most useful output, and resolving it is the synthesizer's job — under
Petra's rule: scaffold the crucial step for the slowest student (P-2) *and* keep a
genuine challenge for the fastest (P-3). Depth is added at the top, never removed
from the middle.
