# Day 12 — Gate 3″ — expert-continuity-auditor

**Verdict: MINOR**

Read `ch-motors.ptx:2251–4145` in full against `assets/Labs/Lab6_ES28.pdf`,
`ch-gpio-interrupts.ptx` (Day 9 EXTI), `ch-switches.ptx` (Day 3 `PUPDR`),
`ch-i2c.ptx` (Day 10 `OTYPER`, the HT16K33 reference, `act-i2c-hw-t2`), and the
sibling reference sections.

## Charge 1 — nothing Lab 6-critical was cut instead of moved

Verified present in real body `<p>`/`<table>` (not `<slide>`, not
`<instructor>`, both stripped from the student book):

- **EXTI line-15 writes** — `table-day12-exti-lines` lives whole in
  `subsec-motors-ref-speed`; Part 4's body prose carries a live xref to it. No
  orphaned or duplicate id.
- **Pull-up value trade-off + internal `PUPDR`** — full paragraph in
  `subsec-motors-ref-speed`; Part 2's body states the conclusion and points forward.
- **`RPM = 60 × PPS / N`** — general form in the reference, concrete `N = 20`
  evaluation still in the pre-class reading and Part 3.
- **`volatile`** — one-clause reason intact in Part 4 body, repeated in Part 6's
  instructor key.
- **`milliseconds()` / SysTick** — full explanation and both listings still real
  body content in Part 4, not moved and not cut. Grep confirms this is still the
  only place in the book either is named.

## Charge 2 — cross-references

Every xref inside these three sections was resolved against its `xml:id`. All
resolve, and each resolves to content that matches the citing sentence's claim.
No dangling or mis-pointed reference.

## Charge 3 — reorganization vs duplication

The reference opening tracks `sec-i2c-reference`'s wording closely. No verbatim
duplicate paragraphs between the shortened in-class prose and the reference; every
item the source's change-log comment says was extracted is genuinely absent
in-class and present once in Reference.

### [MINOR] Reference resolves an open stretch task, unlike its siblings

"Direction, and quadrature" and "The measurement's own resolution" are the only
place a student reading just the printed book gets the actual mechanism (the
two-bit state machine, the `60/N`-rpm quantization, the three-remedy trade-off
numbers). The in-class prose only *poses* these, in `task-day12-direction` and
`task-day12-stretch-resolution`; the worked treatment is otherwise in
`inst-day12-stretch` (stripped) and two deck-only slides.

Not damaging — Reference is licensed to add depth — but it differs from
`sec-i2c-reference` / `sec-adc-reference` / `sec-timers-reference`, none of which
resolve an activity left open in class. **For Petra: is that an acceptable role
for this section?**

### [MINOR] `plans/day12.md` cites a precedent that does not exist

`subsec-motors-ref-lookups` was planned as "the shape `ch-adc.ptx` uses", but
`sec-adc-reference` has no what/which-document/where lookup table. The table
itself reorganizes only already-cited facts, so this is not a book defect — but a
future audit citing "the ADC shape" will not find it there.

## Charge 4 — forward references

None that block comprehension. Every xref from pre-class or in-class prose into
the reference sits after a self-contained sentence that already states the needed
conclusion. No pre-class sentence references anything later. Reading order
back-checks clean.

### [MINOR] Pin-name order flips within one day

`PA15 (D7)` in two places, `D7 (PA15)` in a third. Both satisfy L-5, but the rest
of the chapter is consistently port-name-first. **Applied.**
