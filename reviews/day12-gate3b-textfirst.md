# Day 12 — Gate 3″ — learner-text-first

**Verdict: MAJOR**

Reviewed after the prose redo (42 → 28 body paragraphs) and the addition of
`sec-motors-reference`. Length budget in force: every finding carries
ADD/DISPLACES/NET or MOVE TO.

## Findings

### [MAJOR] [P-5] `subsec-day12-main-loop` — an unsupported magnitude

The compressed polling paragraph asserts "a signal whose pulses are a few
milliseconds long" as a settled fact. Nothing a text-first reader has seen
derives or measures that magnitude: the actual pulse rate ("tens of hertz") is
stated only inside `inst-day12-wire-and-scope`, an `<instructor>` block stripped
from the student book. As written the number is unverifiable.

```
ADD:       A loop that looks a hundred times a second will miss a pulse whenever
           that pulse is shorter than the gap between two looks,
DISPLACES: A loop that looks a hundred times a second at a signal whose pulses
           are a few milliseconds long will miss some of them,
NET:       0 words
```

Removes the unsupported magnitude and keeps the mechanism, which the rest of the
paragraph ("arrives and leaves between two reads", "not synchronized") already
supports without an invented number.

### [MAJOR] [B-11b] `subsec-motors-ref-speed` — "The sensor" does not stand on its own

The paragraph calls the EE-SX672's "NPN open collector" rating "the
manufacturer's own words for the argument of `fig-photointerrupter-states`", but
that argument — the transistor only pulls the line down, never drives it up — is
never stated inside the Reference section. It is only in `sec-motors-day12`'s
body prose, pages earlier. B-11b requires every subsection to stand on its own
for a reader arriving by search or link, and Petra's framing for this section
("for students who are interested") is exactly that reader.

```
MOVE TO: sec-motors-reference / subsec-motors-ref-speed (not length-budgeted)
```

State the mechanism in the reference before invoking the figure: the transistor
can only pull the output down to ground when it conducts; when it stops
conducting it lets go of the line entirely, and only the resistor brings the
voltage back up — which is why the resistor's rail sets the HIGH level.

### [MINOR] [B-11b] `subsec-motors-ref-speed` — two names for one register, unreconciled

"The interrupt" paragraph names the port-select register `EXTI_EXTICR4`
(RM0490's 1-indexed name); `table-day12-exti-lines`, two lines later, calls the
identical register `EXTI->EXTICR[3]` (0-indexed C array element), with nothing
connecting them. A reader working from this page alone cannot tell these name
the same register. A seam from the move: the table came over whole, the
paragraph was written fresh, and the two were never reconciled.

```
ADD: one clause to the paragraph — "(the table below calls this same register
     EXTI->EXTICR[3], since the array is zero-indexed)"
```

### [MINOR] [B-7] `fig-day12-lab6-build` caption — an unexplained switch

The caption says the finished-build figure shows "the pin's own internal pull-up
enabled rather than the external resistor" without saying why that differs from
what students just wired and scoped in Part 2. The reasoning ("the external one
is what Day 12 uses, because there is a scope probe on that node") lives in
`subsec-motors-ref-speed` and is never tied back to this figure.

```
MOVE TO: subsec-motors-ref-speed, "The pull-up value" paragraph — append
         ", the way the finished build does, once the scope probe that needed
         the external node is gone."
```

## Checked and found intact

- The open-drain clause is present in Part 2 body prose and is self-contained.
- The prediction **is** answered in body prose, not only in
  `inst-day12-wire-and-scope`.
- The pull-up **value** argument is cleanly deferred to the reference with no
  dangling claim left in-class.
- The interrupt-vs-poll decision in Part 4 does not depend on the exact HIGH/LOW
  condition, so deferring that condition's precise statement to
  `subsec-motors-ref-speed` does not break the in-class argument.
