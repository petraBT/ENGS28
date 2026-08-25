# Day 12 — Gate 3′ — the change list

Seven reviewers. Individual reports: `day12-gate3-voice.md` (lead),
`day12-gate3-arc.md`, `day12-gate3-figures.md`, `day12-gate3-technical.md`,
`day12-gate3-textfirst.md`, `day12-gate3-continuity.md`, `day12-gate3-novice.md`.

Verdicts: **BLOCKER** (continuity, technical), **MAJOR** (voice, arc, figures,
text-first, novice).

**Status: applied and rebuilt 2026-08-25.** `check_rules` 0/0, `check_deck` clean,
`check_starters` clean. All 36 student-facing slides fit at 1600×900; the four that
overflow (14, 28, 37, 39) are instructor-only.

## Applied

### Blockers

| # | From | Change |
| --- | --- | --- |
| B1 | continuity | `subsec-i2c-ref-ht16k33` does **not** contain the signed-counter pattern — verified, zero hits. Stop claiming it does. Split the sentence: the xref stays for the HT16K33 reference, the signed counter is named as Day 10 homework, and the gap is handed to Petra rather than papered over. |
| B2 | continuity | SysTick appears nowhere before Day 12 — verified, zero hits outside `ch-motors.ptx`; Day 8 is TIM14 only. "No new machinery, exactly like Day 8" is false. Say it is a second peripheral of the same shape. |
| B3 | novice | The five EXTI moves plus the which-4s-change exception are one prose sentence with no table, and Part 6 expects them in code. Add a three-column table (register / Day 9, PB4 / today, PA15) with the `EXTI4_15_IRQn` exception in its own row. |

### Correctness

| # | From | Change |
| --- | --- | --- |
| C1 | text-first | The interrupt argument contradicts the book: they *did* measure the pulse rate (`task-day12-measure`). Name the one genuinely unmeasured quantity — the slot/spoke width split — and drop the self-contradicting "does not fail… but whether it fails" sentence. |
| C2 | text-first | Only the HIGH half of the polling condition is motivated. Derive the LOW half: edge detection needs a sample in both phases. This is what the parked `sl-day12-naive-loop` used to supply. |
| C3 | text-first | The prediction is never closed in the book — the answer lives only in `inst-day12-wire-and-scope`. Add one sentence of body prose. |
| C4 | arc + continuity | `sl-day12-pullup-value` prints **PA15** in Part 2, ten deck entries before `act-day12-find-the-pin`. Reword to name no pin, and put the claim in the prose behind it (the bullet currently has no paragraph). |
| C5 | continuity | `motor_mode()` missing from the Part 5 inventory; Lab 6 requires all three driver functions. |
| C6 | voice + text-first | `fig-day12-wiring`'s caption (a) gives the pull-up's reason, which its own slide note forbids until the reveal, and (b) attributes the 3.3 V path to the thin blue arrow, which is the *label's pointer*. Fix both. |
| C7 | novice | `volatile` gets a bare "for the reason you met on Day 9"; the mechanism is only in an `<instructor>` block. Add the one-clause recap. |
| C8 | novice + text-first | The polling condition stays abstract (`f`, `1/(2f)`) — the same defect P-19 was written for. Plug in a number. |
| C9 | arc | The parked reveal's "§12.5.9 is only the register map" warning did not land. One parenthesis. |

### Voice

| # | Change |
| --- | --- |
| V1 | Part 2's opening repeats the section opening verbatim. Rewrite to open on its own goal. |
| V2 | Cut the rhetorical-question-plus-reversal at 2716 ("…and the answer is that it did not"). |
| V3 | "Those two sentences name two different voltages" → say the thing, not the page. |
| V4 | `fig-photointerrupter-states`'s caption re-tells the paragraph four lines above it. Caption keeps the picture's job; the datasheet paragraph stays untouched. |
| V5 | `sl-day12-hazards`'s paragraph is one chained sentence beside four clean bullets. One sentence per hazard, slide order, every number kept. |
| V6 | Part 4's two `<term>` labels back to her passed slide's short form. |
| V7 | `sl-day12-two-answers` and `inst-day12-pulses-to-rpm`: "this course" → "we". |
| V8 | Cut the second "from the reading" (2952), the "condition is about times" third telling (3288), the dash-punchline at 3272, the S-23 tails at 2565 and 2782, the rescue clause at 2702. |
| V9 | "the display assumes the motor" → "is only right if" (L-15's family, third verb). |
| V10 | Part 3 opens on an absence. Open on what we'll do. |
| V11 | "5 to 24 VDC" → "5 to 24 V DC" (the only unexpanded initialism in the section). |
| V12 | "that they now have to share" → name the referent. |
| V13 | Record in the source that Petra's "one second" was deliberately corrected to "one millisecond". |

### Arc / structure

| # | Change |
| --- | --- |
| A1 | `sl-day12-cabled-sensor` is the only projected slide with no body paragraph and no xref. Move figure + slide up after `sl-day12-wiring`, add a lead-in and an xref. Deck order unchanged. |
| A2 | `table-day12-deadband` orphaned above the paragraph that explains it. Move below `fig-deadband`, xref it. |
| A3 | The five-item "what you already have written" list into `sl-day12-lab6-build`'s presenter note. No new slide — Part 5 has no minute for one. |
| A4 | `plans/day12.md`'s prose outline contradicts its own table in four places (Part 1 10 min, Part 4 10 min with the cut slides still listed, the D7 lookup still opening Part 5, Part 6 35/25). |
| A5 | Drop the literal `RTSR1`/`FTSR1` from Part 3, keep the descriptive gloss. |
| A6 | `sl-day12-hazards` deck title says "Three wires" over four bullets whose first is two wires — the S-30 pattern. Retitle. |
| A7 | "The circuit for this exercise" → the last trace of the erased "Exercise #1" heading. |

### Figures (`day12-gate3-figures.md`)

| # | Change |
| --- | --- |
| F1 | `fig-day12-wiring` caption: "which is what the blue callout says" — the callout says only *"The photointerrupter needs a 5V voltage supply."* It names neither the regulator nor `VM`. Re-attribute. |
| F2 | `fig-day12-wiring` caption redirects to `fig-tb6612-wiring-2` for the regulator connection — **that figure's pads are equally empty**, and so are `tb6612-wiring-exercise1.png`'s. No figure in the chapter draws how the regulator's 5 V reaches `VM`. Drop the redirect and say so; ask Petra for one export that closes it. |
| F3 | `fig-day12-lab6-build` caption asserts the regulator "supplies 5 V" while its pads are drawn unwired. The honest sentence went into only one of the two captions. Propagate it. |
| F4 | `fig-day12-lab6-build` has **no pull-up resistor** and runs `OUT` straight into D7 — legitimate (the `PUPDR` option) but unstated, and it is the figure Lab 6 gets wired from. One caption clause. |
| F5 | Deck slide 32 titled "The knob, the dead band, and the **PWM value**" — the slide has no PWM value anywhere, and the note says the 0–1249 mapping is deliberately left to the students. The title advertises what the slide withholds. Retitle. |
| F6 | `fig-three-rates` shows **9** marks across "one second" while the text says every 10 ms / 100 times a second. One caption clause saying the marks are schematic. |
| F7 | `sl-day12-three-rates`: the figure is squeezed by three bullets and its row sub-labels are 1.8 %, the smallest load-bearing type in the deck. Drop bullet 3 — slide 26 covers it in full — rather than shrinking anything. |
| F8 | `fig-day12-wiring.svg` is now an orphan whose viewBox crops the regulator and barrel jack off entirely and whose callout text is gone, leaving two leader lines to nothing. One `<image source>` typo from making the caption false. Delete it. |
| F9 | Caption clause naming the board's silkscreen marks (`OUT`, `GND`, `VCC`), which the prose never names. |
| F10 | `fig-photointerrupter-states`'s caption says "With no resistor there…" but there is **no third panel** — reword so a reader does not go looking for one. |

**Legibility: passes, and this settles it.** Her callout text renders at 2.3 % of
stage height, against the 1.9 % she has accepted before and the 2.2 % she called
"projects beautifully"; the `~10 KΩ pullup` label is at 1.85 %. Not a defect. The
two levers that would help are a player change (72cqh → ~78cqh, +9 %) or a second
graded export cropped to the sensor half — both hers to call.

**One new legibility defect, not about her figure**: a projected table's own
`<title>` renders at ≈1.5 %, *below* caption size. That matters for
`sl-day12-diagnostics`, where I dropped the caption this morning on the grounds that
the table's title carried its job. At 1.5 % it does not carry it on a wall.

## Declined, with reasons

| From | Finding | Why not |
| --- | --- | --- |
| continuity | Move `table-day12-diagnostics` before the pull-up reveal in the book, to match the deck | The deck's order is for the room and is preserved. For a reader at a desk, a what-to-check table before the explanation is worse. The P-6 note is about the wall; reworded to say so, so this is not re-reported. |
| arc | Add the Day 10 open-drain callback as a bullet on `sl-day12-states` | That slide is deliberately image-dominant (AUTHORING-visual), Petra has passed it twice, and its note already tells the presenter to say it. Recorded as deliberate. |
| voice | Cut "(so that's the Arduino name)" from `task-day12-d7` as a repetition | **Her wording, verbatim from her comment #25.** Her wording wins over any rule, including ours. |

## Conflicts between reviewers, and how they were resolved

1. **`<term>` label length** — voice pass 1 said expand to a full sentence (S-29); voice pass 2 said use her passed slide's short form. **Pass 2**, because it is grounded in text she actually approved.
2. **`RTSR1`/`FTSR1` in Part 3** — voice pass 1 asked for the gloss (S-27, name the referent); arc says the names pre-empt Part 4 (P-6). **Keep the gloss, drop the names.**
3. **`fig-day12-wiring`'s caption** — voice wants the reason clause gone; text-first says the arrow attribution is wrong. **Both.**

## For Petra

Carried into the report to her, not fixed here: the signed-counter gap (nothing
student-facing has the pattern Lab 6 grades), the figure-focus height cap, and the
register of the six projected `<instructor>` blocks.


---

## Technical (`day12-gate3-technical.md`) — BLOCKER

Its three blockers all trace to one fact nobody had looked up: **the EE-SX672's
L terminal**. I re-verified each against the PDF before acting.

| # | Finding | What I did |
| --- | --- | --- |
| T1 | **The output polarity is inverted for the wiring we prescribe.** EE-SX672 is listed as *"Dark-ON/Light-ON (selectable)"*, and footnote 3 says dark-ON when L is open, light-ON when L is tied to the positive terminal. Our caption leaves the pink wire unconnected — i.e. dark-ON — so OUT is pulled LOW when a **spoke** blocks the beam, the opposite of what the prose, the caption and the artwork say. | **Not inverted — deferred to Petra.** The kit's part is a 3-pin breakout with no L pin exposed, so its maker chose the polarity and this datasheet cannot tell us which. Inverting on a guess would be worse than the current state. Instead the prose no longer asserts which state is which: it names light-ON/dark-ON, says the L terminal selects between them, and has students read the sense off their own oscilloscope — which is better teaching and true either way. **`fig-photointerrupter-states.svg` still draws one specific pairing and is the thing that needs her call.** |
| T2 | **The pink wire is the L terminal, not "the LED."** Datasheet p. 8: *Brown Vcc, Pink L, Blue GND, Black OUTPUT*; and *"Do not connect the L terminal to 0 V when using dark-ON operation"*, plus a note that an unused L wire picks up noise and should be cut back and taped. Inherited from her slide 7's *"Pink wire - Led (optional) to 5V"* — a P-12 reuse of her own misreading. | **Applied**, caption and slide, including the cut-and-tape instruction the datasheet asks for. |
| T3 | **Two diagnostics rows contradict the figure they claim to follow from** — the two beam causes are crossed, and stay crossed under either polarity. | **Applied**, and made polarity-independent: the two rows are merged into one that sends the student to the rim first, then to power and ground. |
| M1 | `motor_init()`/`motor_speed()` are not code students have — `TTmotor_ramp.c` has `tim14_pa7_pwm_init()`/`tim14_pwm_set()`, and the three `motor_*` functions are what Lab 6 asks them to **write**. `motor_mode()` was also missing. | **Applied** — the inventory now names all three and points at the two functions they are built from. |
| M2 | The signed-counter xref is wrong (see B1). | **Applied** — points at `act-i2c-hw-t2` and says the worked version is not in the book. |
| M3 | *"The same list is in the Lab 6 handout"* — Lab 6's prose has no wire colors and its figure uses alternatives. | **Applied.** |
| M4 | *"Five volts on a Nucleo pin damages it"* — DS13867 marks PA15 and PA0 as **FT, 5 V tolerant**; the documented hazards are the 3.3 V rail and an analog input above VDDA. | **Not applied.** I could not confirm the per-pin FT column from the PDF's table extraction, the sentence is Petra's, and Lab 6 carries the same warning in a box. Over-caution costs nothing here. **Hers to decide.** |
| M5 | PA15 *does* have alternate functions, including `TIM1_CH1` — the instructor block said it had none. | **Applied** — distinguishes UM2953's board-level *Function* column from the chip's AF list, and keeps the point that matters (no TIM14 channel, so no hardware edge counting). |
| M6 | Quadrature is a quarter of a **cycle**, not a quarter of a slot. | **Applied**, prose and slide. |
| M7 | `fig-three-rates`' caption commits to the polled answer Part 4 rejects. | **Applied** — caption reworded, and bullet 3 dropped so the figure is no longer squeezed (F7). |
| M8 | *"it will not run on 3.3 V at all"* is an inference beyond the datasheet. | **Applied** — now "3.3 V is below anything the part is rated for". |

**Not applied, recorded:** the 0.5 mA leakage bound (already documented in
`plans/day12-ground-truth.md` §4d with the reason it stays out of the book); the
SysTick −1 attribution; that line 15 is the *high* byte of `EXTICR4` unlike Day 9's
line 4; Lab 6's "ONLY to Motor Power" wording.

## What still needs Petra

1. **`fig-photointerrupter-states.svg`'s polarity** (T1) — one scope look at the kit
   part settles it, or the Adafruit 3985 schematic.
2. **The signed-counter gap** (B1) — nothing student-facing carries a pattern Lab 6
   grades.
3. **"Five volts on a Nucleo pin damages it"** (M4) — keep as is, or narrow to the
   rail.
4. **The figure-focus height cap** — 72cqh → ~78–82cqh buys her callouts 9–17%.
