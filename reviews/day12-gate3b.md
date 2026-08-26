# Day 12 — Gate 3″ — the change list

**Run 2026-08-26, after Petra rejected Gate 3′'s applied result part way through
Part 2.** Her verdict: *"The style in this in-class section is entirely different
from other chapters. We were going to de-clutter the preclass and in-class stuff
from too much technical stuff and instead add that to the reference section for
students who are interested."*

Eight reviewers, briefed with a **length budget** (`AUTHORING-book.md` B-18, added
this pass): every finding had to carry `ADD / DISPLACES / NET` or `MOVE TO
sec-motors-reference`, and a finding without one would be discarded however
correct. Individual reports: `day12-gate3b-voice.md` (lead),
`-technical.md`, `-figures.md`, `-arc.md`, `-continuity.md`, `-rigor.md`,
`-textfirst.md`, `-novice.md`.

Verdicts: **BLOCKER** (technical), **MAJOR** (voice, rigor, text-first),
**MINOR** (arc, continuity, figures, novice).

**Status: applied and rebuilt.** `check_rules` 0/0, `check_deck` 0,
`check_starters` 0. All 40 deck slides fit at 1600×900 with zero overflow.

## The measurement the budget was for

| | Gate 3′ result | now | Day 11 (passed) |
| --- | --- | --- | --- |
| in-class body paragraphs | 42 | **28** | 25 |
| in-class words | 3643 | **2618** | 2081 |
| longest caption | 209 w | **66 w** | 162 w |
| pre-class paragraphs | 8 | 7 | — |
| Reference (unbudgeted) | did not exist | 1703 w | — |

The budget worked as intended: of 40 findings across eight reviewers, **two**
asked for net words in the length-budgeted section (+1 and +2), and both were
correctness fixes. Everything else was net-negative, net-zero, or landed in
Reference.

## Blockers — all three verified against the primary source before applying

| # | From | Change |
| --- | --- | --- |
| B1 | technical | `inst-day12-find-the-pin` listed PA15's alternate functions **including `TIM1_CH1`** and then concluded "nothing on this pin can capture or count edges in hardware". The counter-example was in the same sentence. Verified: DS13867 Table 13 puts `TIM1_CH1` on PA15; RM0490 §15.3.7 is TIM1 input capture. Rewritten to say we count in software because the course has not taught input capture, **not** because the pin cannot do it. Second site in `inst-day12-pulses-to-rpm` fixed too. |
| B2 | technical | `table-motors-tim14-registers` sent readers to **§17.4.5** for `OC1M`. Verified by extracting RM0490: §17.4.5 (p. 485) is the *input-capture* view of `CCMR1`; `OC1M` is on p. 487, inside **§17.4.6**, the `[alternate]` output-compare view. Both `OC1M` and `CC1S` rows repointed. |
| B3 | technical | `table-motors-tb6612-modes` gave the Stop row `PWM` = "either". Verified against TB6612FNG p. 4: the row is `L | L | **H** | H → OFF | Stop`, and there is no `L L L` row. The datasheet uses `H/L` for don't-care elsewhere, so "either" was a real error. Short brake's "either" is correct and stays. |

## Majors

| # | From | Change |
| --- | --- | --- |
| M1 | technical | "Offsets are from **the timer's own base address**" was refuted by four of its own twelve rows — `GPIOA_MODER`'s 0x00 collides with `TIM14_CR1`'s inside the table. Rule generalized; `RCC_IOPENR` given its real offset (0x34) and both RCC rows their real sections (§5.4.11, §5.4.14). |
| M2 | technical | "The 50 Hz alternative, **and why not**" was the opposite verdict to Lab 6 §4, which asks students to go and try 50 Hz for low-speed torque — and `TTmotor_ramp.c` carries Petra's own commented-out 50 Hz constants. Rewritten as a trade-off, pointing at the lab's optional section. |
| M4 | technical | `fig-three-rates` labelled row 1 **"look for an edge"** — the polling design Part 4 then retires, and `inst-day12-main-loop-sketch` says "Every pass: **nothing**". Artwork label changed to "ask the time" (true in both designs), caption matched. |
| M5 | technical | Pre-class said the 10 kΩ resistor "appears in the Lab 6 wiring"; `fig-day12-lab6-build` draws the internal pull-up instead, and Lab 6 §2.5 offers the choice. Reworded to give the choice. |
| V1 | voice | The epigram closing Part 4 — *"it is right for reasons you have not checked, and that is what makes the interrupt the better answer"* — which the lead called *"which is the whole point" wearing a lab coat*. Deleted; the honest defence of polling already stands plainly one paragraph up. |
| V2 | voice | *"What it costs is **a promise**… bound by that promise"* → "a constraint on everything you add later". S-11: the metaphor was the name of the thing. |
| V3 | voice | Part 3's opening flourish, "on no datasheet anywhere", and the class's own work narrated impersonally ("So the first thing to do is") → "So we'll start by counting them" (S-13). |
| V4 | voice | Reassurance theater in Part 5 (S-25). It survives where it belongs, in `sl-day12-build-order`'s note. |
| V5 | voice | Two S-23 leaks: "two different rails, **deliberately**" (she struck that word twice in the Day 10 pass) and "the only test today where you control the input", which is the book praising its own exercise design. |
| V6 | voice | The pull-up rail told a **fifth** time in three hundred words. |
| V8 | voice | **Reuse miss.** `task-day12-detect` / `task-day12-count` reinvented and lengthened questions Petra had already written on `Day12-Motors(3).pptx` slide 9. Now hers: *"How do you detect the pulses on the STM32C031C6?"* / *"How do you count the pulses?"* (P-12). |
| R1 | rigor | *"far above the tens of hertz"* in the section built to hold the detail, when `fig-rpm-formula` one screen away already gives 60 pulses/second. Replaced with the number. |
| R2 | rigor | The pull-up trade-off was moved to Reference and then never quantified there — "wastes current", "a wide middle". Now: 0.33 mA at 10 kΩ, ten times that at 1 kΩ. |
| R3 | rigor | "costs essentially nothing" → "costs one memory read", in a chapter that otherwise counts cycles. |
| A1 | arc | **The orphan Gate 3′ also missed.** The "which state is which" paragraph reached the room nowhere — no slide, no task, no note. It is the in-room resolution of the open polarity question and what makes "count one edge per slot" a choice. Now two sentences in `sl-day12-states`' note. Zero body words. |
| T1 | text-first | `subsec-motors-ref-sensor` invoked "the argument of `fig-photointerrupter-states`" without ever stating that argument inside Reference (B-11b: a reader arrives here by search). The mechanism is now stated where it is used. |
| N1 | novice | Four xrefs all landed on one eight-topic subsection. **`subsec-motors-ref-speed` split into four** — `-speed`, `-direction`, `-sensor`, `-counting` — because PreTeXt does not number a `<p>`, so xrefs need real subsections. Each xref repointed. Zero prose words. |

Plus 14 minors: the quadrature offset is a quarter of a **cycle**, not of a slot
(three sites); quadrature quadruples the resolution, it does not "double or
quadruple" it; only a **two-second** window halves the quantization; the internal
pull-up's value (~40 kΩ) added where the argument needs it; the `EGR` write-only
/ `|=` seam explained; `EXTI` expanded on first student-facing use;
`EXTI_EXTICR4` reconciled with `EXTI->EXTICR[3]`; a stale comment about a deleted
SVG; pin-name order made consistent; three sentence fragments in Reference given
verbs; deck slide 19 retitled from an absence to a thing.

## Figures

`checker-figure-claims` rendered all nine Day 12 figures twice (PyMuPDF 3× and
headless Chrome 2×, because PyMuPDF silently drops SVG markers) and traced the
breadboard nets hole by hole. **No BLOCKER: every number, pin, label and net a
caption names is in the picture and correct** — including that
`fig-photointerrupter-beam` really draws exactly 20 slots, and that the cable
colours match `ee-sx67.pdf` p. 7.

On the cut: Day 12 captions now run 41–90 words, mean 66; passed Day 11 runs
9–162, mean 71. **It asked for no words back anywhere**, and both its text
findings removed words:

- `fig-day12-wiring`'s caption named an oscilloscope that is not in the drawing.
- `fig-day12-lab6-build`'s caption said what was *absent*; rewritten positively.

Its one asset finding was acted on: **`fig-day12-cabled-sensor`'s four coloured
cores were ~5 % of the frame** while the caption and all five slide bullets turn
on telling them apart. The figure is now a `sidebyside` — the whole part, plus a
3× crop of the fanned wire ends from the same photograph, nothing retouched
(`fig-day12-cabled-sensor-ends.jpg`). Verified legible at 1600×900.

## Confirmed intact — three reviewers, independently

`expert-rigor-hawk` checked the must-not-be-lost list item by item against the
current text; `expert-continuity-auditor` resolved every xref and grepped for the
moved material; `checker-arc-fidelity` walked all ten of her Day 12 slides plus
the two migrated Day 11x ones.

- The **open-drain clause** is in Part 2 body prose, self-contained.
- The **polling argument and the interrupt decision** are in Part 4 body prose.
- The **Part 5 inventory** survives, with the never-reviewed Day 10 signed counter.
- **`volatile`** keeps its one-clause reason in body prose, not only in the
  stripped instructor block.
- **The prediction is answered in body prose.**
- **No teaching step of hers was lost.** Her slide 8 is still the one deliberate
  drop. All seven bullets of Day 11x slide 21 still land, in her order. No
  Williams citation was carried in.
- The clock still reconciles at the beat level: 6 + 8 + 26 + 15 + 8 + 5 + 37 + 5
  = 110.

## Open for Petra — four things this gate found and did not decide

1. **Lab 6 §2.2/§2.3 contradict the book on the sensor's supply.** The lab's
   `Important!` box says the regulator's 5 V goes to the **motor only**; the
   EE-SX672 needs 5–24 V DC and your own deck slide 6 says the sensor needs 5 V.
   The book follows the datasheet and your slide. **The lab wants one word:
   "motor only" → "motor and speed sensor only",** or a student holding the
   handout sees a straight contradiction. Flagged in `sl-day12-hazards`' note;
   nothing in the book was changed on your behalf.
2. **Reference now resolves stretch tasks left open in class.** The quadrature
   mechanism and the resolution arithmetic are worked out only in
   `subsec-motors-ref-direction` / `-speed`; the in-class prose merely poses them.
   None of `sec-i2c-reference`, `sec-adc-reference` or `sec-timers-reference`
   resolves an activity that way. Acceptable role for the section?
3. **Reference xrefs point forward, not back.** In-class prose xrefs *into*
   `sec-motors-reference` five times. `CLAUDE.md`'s figure convention is the
   reverse. Every one resolves and the builds are clean, so this is a new pattern
   in this chapter rather than a defect — but it is new.
4. **`plans/day12.md` cites a precedent that does not exist**:
   `subsec-motors-ref-lookups` was planned as "the shape `ch-adc.ptx` uses", and
   `sec-adc-reference` has no such table. The table is fine; the citation will
   mislead a future audit.

## Still open from before, deliberately not re-decided

`fig-photointerrupter-states.svg`'s polarity (one scope look settles it, and the
prose now sends students to their own screens for it, on a slide as well as in the
book); the signed-counter gap Lab 6 grades; PA15's 5 V tolerance;
`table-day12-build-order`'s missing regulator input check; the regulator's 5 V
path drawn connected in no figure; `fig-day12-lab6-build`'s Nucleo silkscreen at
~7 px projected (an asset request — every pin name it carries is also text on the
build-order slide, so nothing is lost).
