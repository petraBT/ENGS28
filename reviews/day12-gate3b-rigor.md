# Day 12 — Gate 3″ — expert-rigor-hawk

**Verdict: MAJOR**

Audited the 42 → 28 cut against `reviews/day12-gate3.md`'s change list, and read
`sec-motors-reference` in full to verify what actually landed there rather than
what was claimed to have moved.

## Verified rather than found

The three items Gate 3′ marked heaviest — the open-drain clause, the full
poll-vs-interrupt argument (both `<term>` paragraphs), and the "what you already
have written" inventory with the unreviewed Day 10 signed counter — are all
present in body prose at essentially their Gate 3′ length and wording. Each was
checked against the current text rather than assumed. Nothing on the
must-not-be-lost list is missing. The EXTI arithmetic in the reference (offset
`0x06C`, the bit-field derivation, the `EXTI4_15` vector-name exception) checks
out against `ch-gpio-interrupts.ptx`'s own conventions. **This is a well-executed
cut.**

## Findings

### [MAJOR] B-6, L-6 — a vague comparison where the chapter already has the number

`subsec-motors-ref-speed`, "The sensor": *"the response frequency as 1 kHz
minimum, far above the tens of hertz this wheel produces"*. `fig-rpm-formula` one
screen away already establishes 180 rpm on a 20-slot wheel as 60 pulses/second.
"Far above the tens of hertz" survives contact with nothing.

```
ADD: "— at the ramp's fastest, 20 slots at 180 rpm is 60 pulses a second,
     comfortably under that —" in place of the vague clause.
     (Reference is not length-budgeted; no DISPLACES owed.)
```

### [MAJOR] B-6 — depth moved to the right place and then never quantified

The in-class clause defers the pull-up trade-off to Reference, but Reference never
states a number: "wastes current", "takes too long", "picks up more noise",
bounded by "a wide middle". One sentence of arithmetic grounds it without
touching the deliberately-omitted leakage-current point.

```
ADD (unbudgeted section): after "straight to ground" —
    "at 10 kΩ that is 0.33 mA, and at 1 kΩ it would be ten times that."
```

### [MAJOR] B-6 — a vanishing quantity inside the budgeted section

*"asking what time it is costs essentially nothing"*, in a chapter that otherwise
counts cycles and microseconds relentlessly. "Essentially nothing" teaches nothing
a student could check.

```
REWRITE IN PLACE: "costs essentially nothing" → "costs one memory read"
NET: 0 words
```

### [MINOR] B-6 — an unbounded claim in a scrupulous paragraph

*"the pulse is counted whatever else the loop is doing, at any speed"*. There is a
real upper bound — back-to-back pulses faster than the ISR's own service time —
which never applies at these motor speeds, which is why this is MINOR.

```
REWRITE IN PLACE: "at any speed" → "at any speed this motor reaches"
NET: +1 word
```

**All four applied.**
