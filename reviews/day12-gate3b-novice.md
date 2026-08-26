# Day 12 — Gate 3″ — learner-firstgen-novice

**Verdict: MINOR**

Read `sec-speed-before-class`, `sec-motors-day12` and the reference material they
point into, with `sec-motors-day11` (passed) as the register.

## Resolved since Gate 3′

- `volatile` now carries its reason in **body prose**, not only in the stripped
  `<instructor>` block.
- The polling condition's algebra (<m>f</m>, <m>1/(2f)</m>) moved to
  `subsec-motors-ref-speed`; what is left in-body is plain language I can follow
  without the formula.
- The prediction is answered in body prose; the open-drain clause survived; the
  "what you already have written" inventory survived with the Day-10-homework
  caveat; and the rpm-on-screen milestone is in student-facing prose rather than
  only in the presenter note — that was my Gate 3′ P-7 MAJOR, and it is resolved.

## Findings

### [MINOR] P-2 — four different xrefs land on one eight-topic subsection

The L terminal, the pull-up value trade-off, quadrature and the polling condition
all `<xref ref="subsec-motors-ref-speed"/>`. Clicking the pull-up one lands at
"The conversion", not "The pull-up value"; I have to scan five run-in labels to
find what I came for. The run-in `<term>` labels make this survivable, not free.

```
ADD: 0 words — give the run-in paragraphs their own xml:ids
     (subsec-motors-ref-speed-pullup, -quadrature, -polling, -sensor) and point
     each xref at its own paragraph.
DISPLACES: nothing — pure markup.
NET: 0 words
```

### [MINOR] P-4 — the polling argument never points at the picture that draws it

`fig-three-rates` already draws exactly what this paragraph argues ("the pulses
along the bottom … line up with none of the three"), and the paragraph never
points back at it.

```
ADD:       "As <xref ref="fig-three-rates"/> shows, a"  (5 words)
DISPLACES: "it will miss a different number in every second: the count comes out
           low by an amount that changes, not by a fixed factor you could divide
           back out" (24 w) → "it misses a different number each time, not a
           fixed fraction" (10 w)
NET:       −9 words
```

## Judgment call requested — and answered

`table-day12-exti-lines` in `subsec-motors-ref-speed`, xref'd from Part 4:
**this placement works.** The two things I need in the moment to attempt Part 6
are already in body prose — that it is "the same five moves you made on Day 9 …
with 15 in place of 4", and the `volatile` requirement with its reason. The
register-by-register table is exact-value lookup of the same kind as the UM2953
tables I already use earlier in this Part. I would want it open beside me while
typing code, which is when Reference is supposed to earn its keep.
