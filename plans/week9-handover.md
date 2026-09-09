# Week 9 handover — Days 17, 17x, 18

Week 9 is the final week: Day 17 (BLE and the Bluefruit, then project
work time; `ch-ble.ptx`), Day 17x (project work session; the sleep-modes
unit built as optional; `ch-power.ptx`), Day 18 (demos and wrap-up; no
chapter, a deck only, built after her passes).  This file is updated at
the end of every session; the next session starts from it.

## Session 1 (2026-09-08): ground truth, Gate 1, both books through Gate 2 — awaiting Petra's pass 1 on each

Delivered, all committed and pushed on `main`:

- `plans/week9-ground-truth.md` — her three arcs slide by slide with the
  wording worth carrying; `passthrough.c` + `uart2_RxAvail()` and
  `watchdog.c` recovered verbatim from her code slides (neither file is
  in `assets/starters/` — asked); the AF option lists and RM0490 §4.3 /
  §20 / §24.5.20 pasted; Lab 9 end to end with the protected
  deliverables list (the USART1 pin choice above all — the book never
  names one); the figure manifest with a decision per image; what
  survives of the two placeholders (shape only; every number, question
  and listing was condemned); eleven questions.  Verified against the
  RM before writing: her Day 17x slide 13's `LPMS = 0b011` enters
  Standby, not Stop (Table 20; her own slide-12 crop confirms); her
  slide 7's "/8" callout is divide-by-four (HSIDIV 010); her slide 10's
  "GAAT" is GATT.  `Day19-Topics.pptx` is last year's demo-day wrap-up.
- `plans/week9-map.md`, `plans/day17.md`, `plans/day17x.md`,
  `plans/day18.md` — coverage tables against all three decks, beats
  summing to 110 / 50 (both budgets) / 110, additions named.  **Gate 1
  applied** (`reviews/week9-gate1.md`, seven reviewers): flow control
  glossed plainly, the CTS trap made student-facing, the Protocol tab
  treated as new, the settle re-budgeted as a reseating, 17x's cut
  order reordered to protect the watchdog demo, Day 18's format risks
  (BLE congestion, the partner swap) folded into Q7.
- `source/ch-ble.ptx`, rewritten from the outline up.  Gate 1.5 ran on
  the reading (28 findings applied before the Parts were written).
  Gate 2: thirteen invocations in `reviews/day17-gate2.md`
  (tech-accuracy scoped three ways incl. a self-contradiction read; the
  synthesizer's 27-item list applied and verified item by item, 58
  checks).  The big ones: the "second USART" opener; the message-board
  analogy scoped to the rhythm; the passthrough claim narrowed (flow
  control is exercised by the module, not the AD2 stage); the pinout
  caption's invented pin order replaced (measured order DFU, GND, RTS,
  VIN, RXI, TXO, CTS, MOD) and the figure cropped legible; CTSE/RTSE
  writable only at UE = 0; the instructor AF table gains
  PB6/PB7-are-the-Nucleo-default-USART1-pins (UM2953), the PA14
  SWCLK/BOOT0 warning, PB4 = D5 button, PA15 = D7 photointerrupter,
  PA11/PA12 = A4/A5.
- `source/ch-power.ptx`, rebuilt as an x-day (no reading; the work
  session frames the hour; the optionality lives in
  `inst-day17x-session`).  Gate 2: ten invocations in
  `reviews/day17x-gate2.md`, the list applied and verified (45 checks).
  The big ones: the countdown story unified against RM §20.3.1 (0xCCCC
  starts from 0xFFF — the demo's 4 seconds; RLR loads on each pet);
  Stop exit does not reset the divider; "cannot be stopped" defused
  (any reset or reflash starts the chip with the watchdog stopped); the
  worked Stop entry writes LPMS explicitly; the four modes as a
  numbered table with Standby's retention corrected (PWR_CR3/CR4/backup
  retained, PWR_CR1 reset); an invented predict task removed under
  B-19; PC13's board pull-up (R29 4.7 kΩ) stated; Table 19's key moved
  into the caption; Table 20 trimmed to the taught columns; PWR_CR1
  cropped to bits 15–0 and moved into Part 2 with the SCR diagram
  (her unused `slide12_img2.png`) beside it.
- Figures: `Day17-BLE/fig-bluefruit-pinout.png`, `fig-ble-central.png`,
  `fig-ble-topologies.png` and `Day17x-Sleep_Modes/fig-pwr-cr1-low.png`,
  `fig-power-entry-trim.png`, `fig-watchdog-dog.png` are Gate 2 crops
  beside the raw extractions; the space-named duplicate folder
  `Day17x-Sleep Modes/` was deleted (byte-identical copies);
  `assets/book.css` regenerated and committed.
- All five targets rebuilt one by one at delivery (`web-deck-instructor`,
  `build-deck.sh`, `build-edit.sh`, `build.sh`); page timestamps and
  newest-edit greps checked per the standing memory.  `check_rules`,
  `check_starters`, `check_instructor_only`, `image_ratios --check`
  clean; `check_deck` reports exactly the four unprojected
  `inst-day17*` blocks, the delivery-1 state.

### Not delivered / deliberately deferred

- No `<slide>` blocks, no `day17.json` / `day17x.json` (delivery 2,
  after her passes).  No `day18.json` (after her passes and Q7–Q9).
- Her 17x slides 22–25 (choosing a microcontroller) are in no chapter,
  pending Q1; the recommendation on record (Gate 1 arc, 17x synthesis)
  is Day 18's where-to-go beat, which covers the same courses.
- `passthrough.c` and `watchdog.c` are not yet in `assets/starters/`
  (they exist only as her code slides and the book's listings); waiting
  on Q4.  Register them in `check_starters.py` when the files arrive.

### The questions sent to Petra (numbered as in the delivery message)

The ground truth's §9 (Q1–Q11) plus Gate 2's additions; the delivery
message is the authoritative numbering.  Bench items that block only
their own sentences: whether the IWDG's first countdown after 0xCCCC
truly runs from 0xFFF (the book states the RM's claim; the demo's 4 s
supports it), and whether Stop entry needs PWREN at all (the fix was
written so the answer does not change the listing).

### Standing facts learned this session

- Nucleo-C031C6: PB6/PB7 are D1/D0 and the board's default USART1 pins
  (UM2953 Table 11); PA14 is SWCLK/BOOT0; PA11/PA12 are A4/A5 via
  SB8/SB9; PC13's pull-up is R29 4.7 kΩ (schematic sheet 3); PC14/PC15
  are GPIOs by default (SB3/SB4 ON).
- RM0490: Stop = SLEEPDEEP + LPMS 000 (the reset value); Standby 011;
  Shutdown 1XX; Stop exit keeps HSIDIV as before entry, Standby/
  Shutdown exit forces 010; CTSE/RTSE in USART_CR3 writable only at
  UE = 0; IWDG starts from 0xFFF on 0xCCCC and reloads RLR on 0xAAAA;
  the IWDG runs in Standby too; RCC_APBENR1 bit 28 is PWREN.
- `pptx_annotate` compositing picked the wrong picture again (Day 17
  slide 12 → the Nucleo photo); the raw folder is the underscore one.
- SLEEPDEEP lives in the Arm Cortex-M0+ Generic User Guide (Table
  4-14), not in RM0490 — the guide is not hosted in `assets/` (asked).

### Next session

Her pass 1 on the two books → apply → the Day 17 deck
(`assets/decks/day17.json`; her slides one to one; the wiring table and
GATT table as slides; refPage recalls of the reading's pinout figure)
and the Day 17x deck (`day17x.json`; the optional unit's slides +
`inst-day17x-session`) → Gate 3 → fit check at 1600×900 with the
crossfade killed and MathJax settled → deliver.  Then her answers on
Q7–Q9 → `day18.json`.  Close the loop: any general correction as a rule
in `AUTHORING-book.md`.
