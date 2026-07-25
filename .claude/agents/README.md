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

**Gate 2 — the full draft:** everyone, then the synthesizer.

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
