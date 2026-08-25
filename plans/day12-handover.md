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
| **The in-class skeleton** | **written**, `sec-motors-day12`, Parts 1–6 — subsections, figures, tables, activities with their `<instructor>` answers, and the `<slide>` blocks |
| **The deck** | `assets/decks/day12.json`, **40 slides, 30 refs** — 44/34 until Petra's pass 1 cut four |
| **The in-class prose** | **WRITTEN 2026-08-25**, all six Parts, from the slides she passed. Every `DELIVERY 2` marker is discharged and says where its content landed |
| **Gate 2′** | done, 11 reviewers, 4 BLOCKER: `reviews/day12-gate2.md`, list applied |
| **→ Petra, pass 1** | **DONE, 2026-08-25.** 42 slide comments, all applied and archived; see the pass-1 section below |

`build-all`, `check_rules`, `check_deck` and `check_starters` are all clean.
**Every student-facing slide fits** at 1600×900 with the crossfade killed and a
900 ms settle; the three that overflow are instructor-only, which is allowed.

## What is left

1. ~~**The in-class connecting prose**~~ **DONE 2026-08-25**, Parts 1–6, written
   from the slides she passed. `checker-voice` ran over it once and its list was
   applied (one BLOCKER, thirteen MAJOR, mostly S-23/S-25/S-28 register leakage and
   three L-18 hits in my own prose). **Gate 1.5 was not run as a separate gate** —
   the voice pass covered the whole thing at once instead, which is the shortcut
   worth knowing about and worth admitting to.
2. **Gate 3′, the prose gate**, has *not* run: `checker-voice` has seen this prose
   but `checker-arc-fidelity` has not, so the paragraph↔slide mapping is unchecked.
   That is the next thing.
3. **The chapter's `Reference:` section**, whose five subsections are specified in
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

1. ~~**The EE-SX672's output stage.**~~ **SETTLED 2026-08-25.** Petra: *"the short
   answer is that we need the pullup on the signal wire (the output transistor is
   open-collector),"* and she added the datasheet — `assets/datasheets/ee-sx67.pdf`,
   linked as `external/datasheets/ee-sx67.pdf`. Its ratings table gives the control
   output as **NPN open collector** and the supply voltage as **5 to 24 VDC**, so
   the 5 V is *required* and that is now the reason the book gives for the two
   rails. Cited in `fig-photointerrupter-states`'s caption and in
   `inst-day12-wire-and-scope`; recorded in `plans/day12-ground-truth.md` §4d,
   which also records the one number deliberately left out (0.5 mA off-state
   leakage). The `task-day12-scope` stop-above-3.3 V check stays anyway.
2. ~~**The sensor's supply, narrowed.**~~ **SETTLED at pass 1.** *"The power for
   the photointerruptor needs to be 5V, taken from the regulator just as the motor
   input."* And on the hazards slide: *"not true, it also powers the photo
   interruptor."* So the sensor's VCC is the regulator's 5 V from Exercise 1 onward,
   the slide-6 speaker note is the outlier, and the regulator is wired for
   Exercise 1 rather than first at Lab 6 §2.3. Applied in `task-day12-wire`,
   `fig-day12-wiring`'s caption, `sl-day12-hazards`, `fig-day12-lab6-build`'s
   caption and the Part 5 hazard paragraph; recorded in
   `plans/day12-ground-truth.md` §4c(ii).
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

- ~~**`fig-day12-wiring`**~~ **LANDED, 2026-08-25.** She supplied her own annotated
  slide 6; it is `images/Day12-Motors(3)/fig-day12-wiring-annotated.png`, with the
  "Exercise #1" heading, its three bullets and its page number erased and the canvas
  re-cropped. The slide is image-dominant now — her three callouts carry what the
  bullets used to. **It also has the regulator board and its barrel jack in it**,
  which the rebuilt SVG did not. `fig-day12-wiring.svg` is kept for reference.
  **Two things still open on it, both hers to decide:**
  - Its 5 V / GND / Vin pads have **nothing wired to them**, exactly as in her
    slide 10, so the supply path is not traceable off the picture. The caption
    says so and sends the student to their own board.
  - **Her callout text projects at about 20 px on a 1600×900 stage**, against 28 px
    for a slide bullet — legible, but the smallest type in the deck. The cause is
    the empty upper-left quarter of her drawing: the canvas is 2488×1836, so the
    image is height-capped at 648 px and only 878 px of the 1472 px-wide box is
    used. **Dragging the two callout boxes up into that empty corner in PowerPoint
    and re-exporting would make her own annotations about 1.65× bigger on the
    wall** — arrows follow the boxes there, which is why it has to be her export
    and not a crop here.
- **`fig-day12-lab6-build`** is her slide 10, and the regulator's `5V`/`GND`/`Vin`
  pads render gold with no wire touching them, so the one power path the caption
  leads with is the one a student cannot trace. Worth asking for it **graded**: a
  whole-board view for the block layout, and a close-up of the regulator's two
  connections.

Both with the Fritzing watermark cropped, if that is easy.

## Standing facts, so they are not re-derived

- **110 minutes, Thursday.** 6 settling and two transitions, Parts of
  **8 / 26 / 15 / 8 / 5**, **37** for the build with a floor of 30, and a
  **protected 5-minute close**.  *(Part 4 was 13 and the build 32 until pass 1 cut
  two slides out of Part 4 and she asked for the time to go to the build.)* It reconciles at the beat level, and
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

## Petra's pass 1 — what it changed structurally

42 comments, 2026-08-25, all applied and archived to
`reviews/slide-comments-archive.jsonl`. Most were wording. Four changed the shape
of the day:

1. **Part 4 lost two slides.** *"This is too much stuff. We can also skip that code
   section that was given to them. Just one slide is enough that asks them whether
   they should poll or use an interrupt and have a quick discussion. Then give them
   time to work. This is a lab. It doesn't have to be pre-chewed for them. We are
   holding their hands too much."* `sl-day12-naive-loop` and `sl-day12-two-answers`
   are **parked**: still in the source, with her four wording edits applied to the
   naive loop, but **no deck refs them**, so restoring either is one entry in
   `assets/decks/day12.json`. `act-day12-poll-or-interrupt` is the one slide she
   describes, and the resolution is now led off `inst-day12-poll-or-interrupt`.
   **DELIVERY 2 owes `subsec-day12-main-loop` the polling argument and the interrupt
   decision in body prose**, because neither is on the wall any more.
2. **`sl-day12-deadband-table` is parked too** — *"nice but they need to figure this
   out."* `table-day12-deadband` stays in the book.
3. **The five minutes went to the build**, which is what she asked for: Part 4
   13 → 8, Part 6 32 → 37 with the floor 25 → 30.
4. **No more training wheels from Part 6 on** — her words, on the Part 6 opener.
   Recorded in that subsection's `DELIVERY 2` comment and in the Part 6
   `presenterNote`, so the prose does not put scaffolding back. The two instructor
   blocks there stay: **a solution no deck projects is a P-10 failure**
   (`check_deck.py`), so deleting either is her call, not a side effect.

### The second batch, later the same day

Eight more comments, all applied and archived. Two more shape changes:

5. **`sl-day12-build-order` is projected once, not twice.** *"This seems to be a
   repetition of the previous slide. cut."* The second copy existed to keep the
   table on the wall through the build; the Part 6 `presenterNote` now says to page
   **back** to it. New convention in `AUTHORING-slides.md`. Deck 41 → 40.
6. **No 9 V anywhere in student-facing text.** *"Wait — what do you even mean by
   this??? We just have the regulator and the Nucleo,"* then *"let's just call this
   the regulator, not mention 9V anywhere."* Six places came out, including one
   acceptance test in `table-day12-build-order` that read *"9 V on its input side
   and 5 V on its output side"* and **now checks only the output** — the one place
   a check got smaller, so it is the one to put back if she wants it.

And three wording rules that generalise, now written up: L-17 (nothing on the
signal path has a voice), L-18 (never point a student at "Part N"), B-17 (no C
idiom the course has not taught, in projected code), S-30 (a slide's headline is a
promise the slide has to keep), P-19 (a predict slide supplies its own numbers),
plus additions to P-12, B-11c and B-11e.

**A gotcha worth writing down.** The review server on **8928 is a child of
`preview-slides.sh`**, whatever `CLAUDE.md` says about it being standalone —
killing that wrapper takes 8928 down with it. Kill the port-8352/8931/8932
listeners by PID instead, or restart `review-server.py` immediately afterwards.

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
