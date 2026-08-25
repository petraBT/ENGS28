# Day 12 — Gate 3′ (Step 4′): her deck, the chapter's Day 12 prose, and the deck

Reviewer: `reviewer-source-arc`. Scope: `<section xml:id="sec-motors-day12">`
(`source/ch-motors.ptx`, lines 2534–3772) against `assets/decks/day12.json` (40
entries, 30 refs), with `assets/ClassSlidesOLD/Day12-Motors(3).pptx` as the arc
authority. Day 11 and Day 11x untouched; the pre-class reading
(`sec-speed-before-class`) read only as the source of `fig-photointerrupter-beam`
and `fig-rpm-formula`. All trees are the live working tree.

### Verdict: MAJOR

One projected slide prints the answer to an activity two Parts later (`PA15`, on
`sl-day12-pullup-value`, ten deck entries before `act-day12-find-the-pin`) — the
exact ordering that was fixed at Gate 2′. Everything else is MINOR: the mapping
in the direction that matters at this gate is otherwise complete, both parked
slides' content landed in body prose, and her ten-slide arc has no step without a
home.

---

### Her arc against the room

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | *Engs 28 / Day 12* | deck 1 (`title`) | ✓ |
| 2 | *Review: Basic DC motor control* | deck 4 (Part 1 `section` glue) + `act-day12-driver-questions` (:2568) | ✓ her framing kept as a Part opener |
| 3 | *Discuss At Your Table* — how does `TTmotor_ramp.c` work, which register bits, what questions | deck 5 → `act-day12-driver-questions` (:2568), with the individual write-down added | ✓ |
| 4 | *Motor speed sensing* | deck 6 (Part 2 `section` glue) | ✓ |
| 5 | *We will use an optical incremental sensor* (LED + photosensor → pulses; detect, count, convert to RPM) | reading `subsec-speed-sensor` (:2267) + deck 16 `sl-day12-wheel-recall` (:2967); "detect and count in the MCU" → Parts 3–4 | ✓ her "nobody leaves without pulses on their screen" is in deck 6's and deck 40's notes |
| 6 | **Exercise #1** — wire it, scope it, run the ramp | deck 8 `sl-day12-wiring` (:2676, her own re-annotated drawing) + deck 10 `act-day12-wire-and-scope` (:2690) | ✓ her note's "back to the barebones circuit", the orange/white wire, the 5 V supply and "don't wire it into the Nucleo yet" all present |
| 7 | *Wiring the Fancy Photointerrupter* — cabled variant, wire colors | deck 9 `sl-day12-cabled-sensor` (:2846) | ✓ in the room — but no body paragraph behind it, see finding 2 |
| 8 | The 30 → 180 rpm scope video | **deliberately dropped** — projected Wednesday as `sl-day11x-scope-video` (:2239, same `VH0-zO2LpDc`); Part 2 has them capture their own | ✓ checked, and it is the plan's own ruling (`plans/day12.md`:155) |
| 9 | **Exercise #2: Photointerrupter → RPM (on paper)** — detect / count / convert | deck 17 `act-day12-pulses-to-rpm` (:2911), merged with her Day 11x slide 20 | ✓ |
| 10 | *Complete Lab 6 setup* — hardware + firmware checklist | deck 30 `sl-day12-lab6-build` (:3428, her own Fritzing image raw) + deck 31 `sl-day12-build-order` (:3490) | ✓ all five of her checklist items land; "(internal or external pullup)" is `sl-day12-pullup-value` bullet 3 |
| Day 11x 20 | *With your table group* — edges / rpm / direction | deck 17, merged (P-16) | ✓ |
| Day 11x 21 | *Decoding shaft position* | split: derivation → the reading; framing sentence + Δθ + quadrature → deck 18/19/20 | ✓ in her order |

No teaching step of hers is without a home. No Williams citation was carried in
(her Day 11x slide 7 is the one that has one; nothing in Day 12's source cites it).

---

### The chapter's in-class prose against the deck

| source | what it teaches | condensed by | judgment |
| --- | --- | --- | --- |
| p :2546 | the day's arc — Wednesday's driver, wire + scope, pulses → number, build | deck 2 `recap` | ✓ near-verbatim |
| **Part 1** | | | |
| p :2561 | today is built on `TTmotor_ramp.c`; start with what is unclear while it is small | deck 4 section note | ✓ deliberate, no reveal slide (plan :341) |
| `act-day12-driver-questions` :2568 | one line you can explain, one you cannot; then the table | deck 5 | ✓ |
| **Part 2** | | | |
| p :2596 | today we measure the shaft; three wires and one resistor; scope it before it reaches a pin | deck 6 section note | ✓ |
| p :2603 | predict first, sensor alone | deck 7 | ✓ |
| `act-day12-predict-trace` :2613 | the prediction | deck 7 | ✓ **before** `fig-day12-wiring` (:2658) and `fig-photointerrupter-states` (:2729), in source and in the deck (7 → 8 → 12). P-6 intact |
| p :2646 | three connections; 5 V from the regulator; 10 kΩ to 3.3 V; two different rails, on purpose | deck 8 | ✓ |
| `fig-day12-wiring` :2658 + `sl-day12-wiring` :2676 | her own annotated drawing | deck 8 | ✓ |
| p :2681 | signal stops at the breadboard; scope on that row; turn the wheel by hand; stop above 3.3 V | deck 10 (tasks 2–3) | ✓ |
| `act-day12-wire-and-scope` :2690 | wire, scope, ramp, measure the rate | deck 10 | ✓ |
| p :2715 | the expected trace; the phototransistor is a switch to ground; the resistor's rail sets HIGH | deck 12 | ✓ the reveal |
| `fig-photointerrupter-states` :2729 + `sl-day12-states` :2749 | both states, EE-SX672 open collector, 5–24 VDC | deck 12 | ✓ |
| p :2754 | the same behavior as Day 10 open-drain; **no `OTYPER` bit on the sensor** | deck 12's presenter **note** only | deliberate but wall-less — finding 6 |
| p :2767 | the value is a trade-off, not a calculation | deck 13 bullet 2 | ✓ |
| p :2778 | internal `PUPDR` pull-up is fine in Lab 6; external today because of the probe | deck 13 bullet 3 | ✓ (her slide 6 note) |
| p :2785 | power → ground → signal; the table is that order applied | deck 11 | ✓ |
| `table-day12-diagnostics` :2794 + `sl-day12-diagnostics` :2821 | four traces, where to look | deck 11 | ✓ symptoms only, no mechanism — the Gate 2′ constraint holds. Deck projects it **before** the reveal by design (its own note); the book has it after. Observation below |
| `sl-day12-pullup-value` :2825 | why 3.3 V; why ~10 kΩ; internal or external | deck 13 | **bullet 1 has no body paragraph and prints `PA15` — finding 1** |
| `fig-day12-cabled-sensor` :2835 + `sl-day12-cabled-sensor` :2846 | the cabled variant's wire colors | deck 9 | **no body paragraph, zero xrefs — finding 2** |
| `inst-day12-wire-and-scope` :2857 | the prediction, the expected screen, the part, the number | deck 14 | ✓ |
| **Part 3** | | | |
| p :2899 | a trace and a rate, neither is a speed; the slot count is on no datasheet | deck 16/17 | ✓ |
| `act-day12-pulses-to-rpm` :2911 | slots, detect, count, convert, direction | deck 17 | ✓ `task-day12-detect` left open |
| p :2944 | any pulse-train sensor → position/velocity; 60 × PPS / N; both numbers are theirs | deck 18 bullet 1 | ✓ her Day 11x slide 21's framing sentence |
| p :2957 | one edge per slot; `RTSR1`/`FTSR1`; both edges needs 2N | deck 18 bullet 2 | ✓ as content — but the register names pre-empt Part 4, finding 5 |
| `sl-day12-wheel-recall` :2967 | the reading's beam figure, left up | deck 16 | ✓ |
| `sl-day12-rpm` :2968 | the formula, evaluated on their numbers | deck 18 | ✓ never a valve (plan :285) |
| p :2978 | the same count as an angle; Δθ = 2π/N; position is relative | deck 19 bullets 1–2 | ✓ |
| p :2990 | it is an *average*; a shorter window buys detail, costs resolution | deck 19 bullet 3 | ✓ |
| `sl-day12-decoding` :2998 | one count, two questions | deck 19 | ✓ |
| p :3007 | no direction in the signal; the sign comes from the commanded mode | deck 20 bullets 1–2 | ✓ |
| p :3017 | quadrature; some parts decode in hardware | deck 20 bullets 3–4 | ✓ valve 3, and the note keeps bullet 1 if cut |
| `sl-day12-quadrature` :3026 | as above | deck 20 | ✓ |
| `inst-day12-pulses-to-rpm` :3036 | 20 slots; keep detect open; plausibility; direction = no | deck 21 | ✓ |
| **Part 4** | | | |
| p :3076 | three jobs at three rates — but first, which pin | deck 22 note → deck 23 | ✓ |
| `act-day12-find-the-pin` :3085 | UM2953 Table 11, D7 | deck 23, **first entry of Part 4** | ✓ opens the Part, as fixed at Gate 2′ |
| `inst-day12-find-the-pin` :3106 | PA15, CN9 pin 8, cross-checked in Table 12 | deck 24 | ✓ |
| p :3119 | now that D7 is PA15: the three rates, and the pulses are on no schedule | deck 25 | ✓ |
| `fig-three-rates` :3130 + `sl-day12-three-rates` :3138 | the three rates over one second | deck 25 | ✓ |
| p :3148 | `delay_ms()` serves one of the three; Day 9's polled counter; Lab 6 forbids it | deck 25 bullets 2–3 | ✓ |
| p :3156 + listings :3170/:3182 + p :3195 | `milliseconds()`, SysTick, 12000 − 1, `SystemInit()`, costs nothing | deck 26 | ✓ B-6 verbatim from `assets/starters/sysinit.c` |
| `sl-day12-milliseconds` :3206 | as above | deck 26 | ✓ |
| **`sl-day12-naive-loop` :3239** | the deliberately-broken 100 Hz loop | **PARKED — no deck entry** | ✓ verified: no deck in `assets/decks/` refs it |
| p :3267 | the loop's shape; the read inside the 10 ms beat is the obvious place, and it fails | no slide — deck 28 | ✓ deliberate (parked) |
| p :3275 | a read tells you only that instant; the count is low by a *changing* amount | no slide — deck 28 ¶1 | ✓ **the polling argument landed** |
| p :3285 | the condition is **times, not frequencies**: shorter of HIGH/LOW; ~1/(2f); resist "100 Hz can't see 60 Hz" | no slide — deck 28 ¶2 | ✓ **landed in full, including the caveat** |
| `act-day12-poll-or-interrupt` :3297 | the individual commit | deck 27 | ✓ the one slide she asked for |
| p :3306 / :3309 / :3319 / :3334 | both answers; the free-running poll and its standing promise; the five Day 9 moves with `EXTI_EXTICR4` §12.5.6, `EXTI4_15_IRQHandler`, `volatile`; and why we take the interrupt | no slide — deck 28 ¶3–4 | ✓ **the two answers and the interrupt decision landed, `EXTI_EXTICR4` pointer included** (one clause lost — finding 8) |
| **`sl-day12-two-answers` :3353** | the reveal | **PARKED — no deck entry** | ✓ verified |
| `inst-day12-poll-or-interrupt` :3362 | the four answers, led from the room's board work | deck 28 | ✓ the resolution's only projected home |
| **Part 5** | | | |
| p :3411 | every piece has been wired or written before; now they share one supply, ground and pin set | deck 30 caption | ✓ |
| `fig-day12-lab6-build` :3417 + `sl-day12-lab6-build` :3428 | her slide 10, raw | deck 30 | ✓ |
| p :3433 | **what you already have written** — `motor_init`/`motor_speed`, `start_conversion`/`adc_read`, `SevenSeg_number`, the never-reviewed signed counter | **no slide**; only the signed-counter clause is in deck 31's note | finding 3 |
| `table-day12-build-order` :3444 | seven stages, each with its pass criterion | deck 31, **once** | ✓ her pass-1 cut of the second copy honored; Part 6's note says "page BACK to it" |
| p :3483 | a failing stage is worked power → ground → signal; rpm-to-screen is a milestone | deck 31 caption + note | ✓ |
| `table-day12-deadband` :3495 | the three knob positions in volts and counts | **PARKED slide** (`sl-day12-deadband-table` :3562, no deck entry ✓) — table stays in the book | **orphaned in the flow — finding 4** |
| p :3528 | the dead band is theirs to choose; 4096 counts across 3.3 V; center ≈ 2048 | deck 32 | ✓ |
| `fig-deadband` :3541 + `sl-day12-deadband` :3552 | the number line | deck 32 | ✓ the note carries the numbers the parked table held |
| p :3567 | the pot on 3.3 V; 5 V is motor + sensor only; one ground; the regulator gets hot | deck 33 | ✓ |
| `sl-day12-hazards` :3581 | as above | deck 33 | ✓ |
| **Part 6** | | | |
| p :3608 | the rest of the hour is yours; start on paper; then the build order | deck 34 note → deck 35 | ✓ four sentences, no scaffolding, as she asked |
| `act-day12-main-loop-sketch` :3616 | three rates, the window, the shared counter; `counterResetButtonInt.c` named | deck 35 | ✓ |
| `inst-day12-main-loop-sketch` :3642 / `inst-day12-main-loop-code` :3664 | worked answers | deck 36 / 37 | ✓ both projected (P-10 satisfied) |
| `act-day12-stretch` :3703 + `inst-day12-stretch` :3732 | sign, quadrature, resolution | deck 38 / 39 | ✓ |

**Reverse direction.** The ten deck entries with no source block are 1 (title),
2 and 40 (recaps), 3 (agenda), and 4/6/15/22/29/34 (`section` glue) — structural,
not content, and none of them absorbs a layout problem. The only deck-only *claim*
is deck 40's third recap item (run the PWM at 50 Hz and listen); it traces to
`act-day11-stretch` (:1284) and `act-day11x-stretch` (:2144), so it has a home in
the chapter even though Day 12's own prose never says it. No S-10 slide found.

### The clock

`plans/day12.md`'s Part-sequence table (:246–258) states **110 minutes, Thursday**,
with the rule quoted at :3–7, and reconciles at the beat level:
6 + 8 + 26 + 15 + 8 + 5 + 37 + 5 = 110. Every Part's row equals the sum of the
`≈ N min` marks in the deck's own notes — I re-added them: Part 1 = 8 (2+3+3);
Part 2 = 2+2+15+1+3+2+1 = 26; Part 3 = 8+3+2+2 = 15; Part 4 = 2+1+3+2 = 8;
Part 5 = 1+2+1+1 = 5; build 37 (floor 30); close 5. The two parked Part 4 slides
were 2 + 3 = 5, which is exactly the 13 → 8 move, and the build's 32 → 37 is the
other end of it. `scripts/check_deck.py` and `check_rules.py` both pass clean.
The plan's *outline* headings below the table were not updated with it — finding 7.

---

### Findings

- **[MAJOR] `PA15` is printed on the wall in Part 2, ten deck entries before the
  activity that asks students to look it up** — `sl-day12-pullup-value` bullet 1,
  `source/ch-motors.ptx:2828` ("…would put 5 V on PA15 as soon as you wired it
  there"), projected as deck entry 13; `act-day12-find-the-pin` is deck entry 23.
  This is the ordering Gate 2′ fixed (`plans/day12.md`:123–128: "It now opens
  Part 4… nothing prints PA15 before students look it up"), and it is undone by
  the one clause on this slide that **no body paragraph expands** — nothing in
  p :2715, p :2767 or p :2778 names a pin. **fix**: reword the bullet to name no
  pin — "Pulled up to 5 V, this line would put 5 V on the Nucleo pin it goes to
  as soon as you wired it there" — and add the same clause to the body paragraph
  at :2767 so the slide has prose behind it. Slide stays where it is.

- **[MINOR] `sl-day12-cabled-sensor` (deck 9, her slide 7) is the one projected
  slide with no body paragraph at all** — `fig-day12-cabled-sensor` (:2835) has
  **zero `<xref>`s** in the whole chapter and no sentence introduces it; the
  figure caption carries the entire teaching. The book also puts it last in
  Part 2, after the pull-up trade-off and the diagnostics table, while the deck
  projects it *second* in the wiring block, before students wire — which is the
  right room order. **fix**: move `fig-day12-cabled-sensor` + `sl-day12-cabled-sensor`
  up to immediately after `sl-day12-wiring` (:2679), and give them a two-sentence
  lead-in with `<xref ref="fig-day12-cabled-sensor"/>` ("Some kits have this
  sensor on a length of cable instead of a small board…"). Deck order unchanged.

- **[MINOR] "What you already have written" reaches the room only as one clause
  of a presenter note** — p :3433–3443 lists five pieces students already have
  (`motor_init`/`motor_speed`, `start_conversion`/`adc_read`, `SevenSeg_number`,
  the signed counter, with the `subsec-i2c-ref-ht16k33` pointer). Deck 31's note
  carries only the signed-counter caveat; deck 30's note says "point at the four
  blocks and the two supplies, and move on". The plan asked for this "said out
  loud so nobody starts from nothing" (`plans/day12.md`:475), and in the room it
  is not said. **fix**: put the five-item list into `sl-day12-lab6-build`'s
  presenter note (deck 30) — no new slide, Part 5 has no minute for one.

- **[MINOR] `table-day12-deadband` (:3495) is orphaned in the reading flow** —
  it sits *above* the only paragraph that explains it (p :3528–3540), has **zero
  `<xref>`s**, and its slide is parked, so a reader meets a four-column table with
  no lead-in and the projector never shows it. **fix**: move the table to below
  `fig-deadband` (:3551) and xref it from p :3528 ("…the three positions Lab 6
  names are in `<xref ref="table-day12-deadband"/>`"). No deck change.

- **[MINOR] Part 3's prose names the EXTI edge-trigger registers, against that
  subsection's own P-6 comment** — the comment at :2908–2910 says "nothing in
  this subsection or in `sl-day12-rpm` may answer [`task-day12-detect`] early",
  and p :2957 then hands them `RTSR1`/`FTSR1` "from Day 9" (deck 18's note does
  the same). In the room that is deck 18, nine entries before the poll-or-interrupt
  commit at deck 27 — the commit's answer is telegraphed. Her own wording of the
  rule ("rising **or** falling edges", Day 11x slide 21) does not need the
  register names. **fix**: in p :2957 and in `sl-day12-rpm`'s bullet 2, keep
  "count one edge per slot — the rising edge or the falling edge, not both" and
  drop the two register names; they are already in Part 4 at :3323 where they
  belong. Leave them in the presenter note if useful.

- **[MINOR] The open-drain callback is on no wall** — p :2754–2766 (Day 10's
  open-drain, and **there is no `OTYPER` bit on the sensor**) reaches the room
  only through `sl-day12-states`' presenter note. It is the plan's "one clause, so
  nobody goes hunting for a register that does not exist" (:394), and it is the
  one place the day connects to a taught register. **fix**: optional — one bullet
  on `sl-day12-states` ("Same behavior as Day 10's open-drain pins, on a
  different transistor — and there is no `OTYPER` bit on the sensor"). The slide
  is currently figure + caption only, so it has the room for one line. Recorded
  as deliberate if you would rather say it than print it.

- **[MINOR] `plans/day12.md`'s outline contradicts its own Part table in four
  places** — the table (:246–258) is correct; below it, :333 still says Part 1 is
  10 min, :440 still says Part 4 is 10 min and :452/:460 still list the
  predict-then-fail listing and "the two answers, honestly" as Part 4 beats with
  valve 2 attached (both cut at her pass 1), :473 still gives the D7 → PA15
  lookup to **Part 5** ("it opens the Part") against the Gate 2′ move recorded at
  :123–128, and :518 still says Part 6 is 35 min with a floor of 25 rather than
  37/30. **fix**: four edits, all in the outline; the table, the valves and the
  clock arithmetic are already right.

- **[MINOR] One clause of the parked reveal did not land** — `sl-day12-two-answers`
  (:3356) warned that RM0490 "§12.5.9 is only the register map"; the body prose at
  :3326 gives §12.5.6 and nothing about 12.5.9, so a student who looks up EXTI in
  the register-map section has no signpost. **fix**: one parenthesis at :3326.

### Layouts she already solved

- `sl-day12-wiring` — her slide 6, adopted whole: `fig-day12-wiring-annotated.png`
  is her own re-export, her callouts, unretouched, and the slide is
  image-dominant with a one-line caption rather than repeating the callouts as
  bullets. **keep.**
- `sl-day12-lab6-build` — her slide 10 raw: `fig-day12-lab6-build.svg` is a
  white ground plus her Fritzing PNG, no overlay text; the caption does the
  block naming and the note forbids reading pin names off it. **keep.**
- `sl-day12-cabled-sensor` — her slide 7's shape (photo plus a short color list)
  is what the slide uses, `stack="yes"`. **keep** (but see finding 2 for where it
  sits in the book).
- `sl-day12-wheel-recall` — hers is the three product photos of slide 5; ours is
  the reading's beam figure, projected bare and left up. Different picture, same
  job, and it is the figure the students read from. **keep.**

### Checked and correct

Carried to the room: her slides 2, 3, 4, 5, 6, 7, 9 and 10 and both migrated
Day 11x slides; both parked slides' teaching (the polling argument as *times not
frequencies*, the two answers, the interrupt decision and the `EXTI_EXTICR4`
pointer) is in body prose at :3267–3296 and :3306–3342 and reaches the room off
`inst-day12-poll-or-interrupt`; `sl-day12-build-order` projects once; the three
Gate 2′ P-6 orderings — predict before the wiring and the states figure,
diagnostics as symptoms only, `act-day12-find-the-pin` opening Part 4 — all hold
in both source and deck order.

Deliberately dropped and verified: her slide 8 (the 30 → 180 rpm video, played
Wednesday as `sl-day11x-scope-video`); `sl-day12-naive-loop`,
`sl-day12-two-answers` and `sl-day12-deadband-table`, each parked in source with
its reason and refed by no deck in `assets/decks/`. One observation, not a
finding: `table-day12-diagnostics` is projected *before* the pull-up reveal
(deck 11 before deck 12) and read *after* it in the book (:2794 after :2729) —
both orders are argued in the slide's own note, and the table gives symptoms
only, so the reveal still lands either way.
