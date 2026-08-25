# Day 12 — handover

State as of 2026-08-24, after Gate 2′ and its change list were applied.
Everything needed to finish Day 12 is here or in the files it names.

## Where the unit is

This day ran the **pilot ordering** (`CHAPTER_PROCESS.md`, Steps 3′/4′), so the
deliveries are the other way round from the standard flow.

| | State |
| --- | --- |
| **Gate 0** — ground truth | done: `plans/day12-ground-truth.md`. **§4c(ii) was corrected at Gate 2′ — read the correction, it changes a question to Petra** |
| **Gate 1** — plan and outline | done, 8 reviewers, 3 BLOCKER: `reviews/day12-gate1.md`, list applied |
| **The pre-class reading** | **written in full**, `sec-speed-before-class` |
| **Gate 1.5** — voice probe | done, 7 rewrites applied: `reviews/day12-gate1_5.md` |
| **The in-class skeleton** | **written**, `sec-motors-day12`, Parts 1–6 — subsections, figures, tables, activities with their `<instructor>` answers, and the `<slide>` blocks. **No connecting prose.** |
| **The deck** | `assets/decks/day12.json`, **44 slides, 34 refs** |
| **Gate 2′** | done, 11 reviewers, 4 BLOCKER: `reviews/day12-gate2.md`, list applied |
| **→ Petra, pass 1** | **this is what happens next.** She reviews the reading and the slides |

`build-all`, `check_rules`, `check_deck` and `check_starters` are all clean.
**Every student-facing slide fits** at 1600×900 with the crossfade killed and a
900 ms settle; the three that overflow are instructor-only, which is allowed.

## What the follow-up session does

1. **The in-class connecting prose**, Parts 1–6, written **from the slides Petra
   has passed** — never before. Each paragraph expands the slide beside it, and
   **the prose is expected to be longer than the slide**: compression toward the
   bullet is the failure mode of this ordering.
2. **Gate 1.5 again**, on the first subsection of that prose, before the rest is
   written. It is a real gate in this ordering, not a formality.
3. **Gate 3′**, the prose gate: `checker-voice` leads, `checker-arc-fidelity` runs
   the paragraph↔slide mapping.
4. **The chapter's `Reference:` section**, whose five subsections are specified in
   `plans/day12.md`. If that session runs short, `subsec-motors-ref-tim14` is the
   one that must exist — it is the table students will have open while writing
   `tb6612.c`, and it is writable from Day 11x alone.

### What the prose owes, by id

Every `<!-- DELIVERY 2: prose. -->` marker in the source now names what it owes,
which is a rule this day added to `AUTHORING-book.md`. The two that carry real
content:

- **Part 2** owes the open-drain clause **in body prose** — the sensor behaves
  like the open-drain outputs of `subsec-day10-pins` on a different kind of
  transistor, and there is no `OTYPER` bit on the sensor. It is currently
  instructor-only, in `sl-day12-states`'s note.
- **Part 5** owes the "what you already have written" paragraph:
  `SevenSeg_number()` and the signed counter from Day 10
  (`subsec-i2c-ref-ht16k33`), `motor_init()`/`motor_speed()` from
  `sl-day11x-lab6-seam`, `adc_read()`/`start_conversion()` from Day 7 — **and the
  note that the signed counter was homework and was never reviewed in class**,
  which is now load-bearing for a graded deliverable. No fourth slide: Part 5 has
  no minutes for one.
- **Part 3** owes nothing by id, but `sl-day12-decoding`'s average-angular-speed
  line was cut for the clock and is owed to `subsec-motors-ref-speed`.

## Open with Petra — the questions, and which are blocking

**None of these blocks her pass 1.** The draft is written to survive any answer.

1. **The EE-SX672's output stage.** The day's load-bearing hardware claim is that
   the phototransistor is a switch to ground with **no internal pull-up to its own
   supply**. There is no datasheet for this sensor in `assets/datasheets/` and
   nothing in the repo settles it. Mitigation already shipped: `task-day12-scope`
   tells students to stop if the trace goes above 3.3 V, and the output does not
   reach the Nucleo today — so the failure is caught on the oscilloscope. **Worth
   keeping even after she answers.**
2. **The sensor's supply, narrowed.** Three of the four sources agree once her
   Fritzing is traced properly: her slide 6 says 5 V, her drawing takes the
   sensor's VCC to the driver's **`VM`** pad, and Lab 6's schematic puts it on
   +5 V. What is left is one thing — **her slide-6 speaker note says *"just wire
   power and ground to logic power and ground"***, and in Exercise 1 the regulator
   is not wired yet (Lab 6 connects it at §2.3, after the potentiometer). Which do
   students wire on the day?
3. **The potentiometer's rail.** Lab 6's schematic wires it to +5 V with the wiper
   on PA0; the lab text describes 0 / 1.65 / 3.3 V. The book says 3.3 V and the
   hazard paragraph says so plainly. Confirm the schematic's `+5V` is legacy.
4. **`TTmotor_ramp.c` or `TTMotor_Ramp.c`** — still open from Day 11x, and Day 12
   adds more references.
5. **The 30 → 180 rpm claim** on `fig-photointerrupter-video`. Part 4's numbers are
   framed as a demonstration rather than a proof, so nothing breaks if it is
   wrong — but if the top speed is nearer 120 rpm, **Part 4's argument is rebuilt
   on "the interrupt removes the dependence on the top speed" and the numbers are
   demoted to an illustration, not patched with a bigger number.**
6. **The build block is 32 minutes with a floor of 25**, inferred from the shape of
   her deck rather than evidenced. If the real number is 45, the minutes come from
   Parts 1 and 5 — **not from the sensor wiring and not from the close**.
7. **Two house-style calls**, both from `checker-voice`: whether Part 1 keeps both
   her three questions and the individual write-down (the clock assumes both), and
   whether `<term>` should bold answer-key labels inside `<instructor>` blocks at
   all — her passed Day 11 blocks use plain text, and this affects about thirty
   blocks across the book.

## Figures I need from her, and why a caption cannot fix them

Both are **asset requests, not caption work** — a rule this day proposes.

- **`fig-day12-wiring`** is her Day 12 slide-6 Fritzing, and **it has no regulator
  board and no barrel jack in it**, while the motor has to run for two of that
  activity's tasks. The caption now says the supply is still connected but not
  drawn, which is true and is the best a caption can do. **She has a drawing with
  the regulator in it — it is her slide 10.**
- **`fig-day12-lab6-build`** is her slide 10, and the regulator's `5V`/`GND`/`Vin`
  pads render gold with no wire touching them, so the one power path the caption
  leads with is the one a student cannot trace. Worth asking for it **graded**: a
  whole-board view for the block layout, and a close-up of the regulator's two
  connections.

Both with the Fritzing watermark cropped, if that is easy.

## Standing facts, so they are not re-derived

- **110 minutes, Thursday.** 6 settling and two transitions, Parts of
  **8 / 26 / 15 / 13 / 5**, **32** for the build with a floor of 25, and a
  **protected 5-minute close**. It reconciles at the beat level, and
  `check_deck.py` now checks that a Part's row is not under its own beats.
- **There is a pre-class reading**, because Lab 6 p. 5 sources
  `RPM = 60 × PPS / 20` from the reading quiz and Day 11x has none.
- **There is no Day 12 driver file, and that is her arc** — her deck has no code
  slides at all. The four real files the day may quote are `TTmotor_ramp.c`,
  `ADCPot.c`, `counterResetButtonInt.c` and `sysinit.c`. `sl-day12-naive-loop` and
  `inst-day12-main-loop-code` are **teaching code, marked in the source as
  not-a-driver** — do not register them in `check_starters.py` and do not hand
  them out.
- **`SysTickInit()` is now registered** in `check_starters.py` against the Part 4
  listing. `sysinit.c` ships in every project and the book had never opened it.
- **D7 is PA15** — UM2953 Table 11 (CN9 pin 8) and Table 12 (pin 37), and Lab 6's
  own schematic net `ENC_OUT`. **`EXTI_EXTICR4` is RM0490 §12.5.6**; §12.5.9 is
  only the register map, where the offset 0x06C and the byte `EXTI15[7:0]` are.
  **PA15 has no TIM3** — its alternate functions are `SPI1_NSS/I2S1_WS`,
  `USART2_RX`, `TIM1_CH1`, `MCO2`, `USART1_RTS_DE_CK`, `EVENTOUT`.
- **The interrupt decision is made**: converge on it, and state the condition as
  `T_poll < min(high time, low time)` rather than "100 Hz cannot see 60 Hz", which
  is not true as stated.
- Petra's preview servers are `./preview-edit.sh` (8931/8932) and
  `./preview-slides.sh` (8352). **`build-all` needs them stopped**, and the review
  server on 8928 must never be taken down with them.
- An XML comment cannot contain `--`. Use an em dash.

## By-product worth passing on

`check_deck.py`'s new budget check flags exactly one thing across the whole repo,
and it is real: **`day11x` Part 5 is 6 minutes of beats against a 5-minute row.**
Day 11x is awaiting Petra's pass 2, so it is hers to absorb, not this session's to
fix.

## Rules this day added to `AUTHORING-book.md`

Both are in the working tree and **not committed**, because that file also holds
uncommitted edits of Petra's own — see the report.

1. **A deferral marker must name what it owes, by id** (under B-8a). Six bare
   `<!-- DELIVERY 2: prose. -->` markers produced four separate reviewers
   reporting the same four things as *missing*. Only connecting prose may be
   deferred; a cross-reference, a pointer, or the explanation of something a slide
   already asserts is written now.
2. **S-8's clock must reconcile at the beat level.** Found three times by hand,
   each time one level further down. Now checked by `check_deck.py`.
