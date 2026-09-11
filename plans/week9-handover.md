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

## Session 2 (2026-09-09): her reading comments, and the Day 17 deck built deck-first

Her ruling, applied: the in-class section needs activities mimicking her
slides (nothing invented), and the deck comes before the in-class book
refinement.  Delivered, committed on `main`:

- Her 13 reading comments applied (every circle rendered in headless
  Chrome against the current build before the edit; archived).  The
  substantive ones: the data-mode sentence rebuilt in her words; the
  circled CTS deferral answered in place (our RTS drives it; tie to
  ground without flow control); Part 1's opener in her sentence; the
  GATT example's values as examples; "silver can" → "silver metal box".
- Seven `<activity>` blocks in her slides' own words (driver,
  passthrough test, connect, UART mode, CMD mode, MOD-pin startup,
  paper design), the wiring table numbered (`table-day17-wiring`, title
  de-duplicated from the slide headline), nine `<slide>` blocks, and
  `assets/decks/day17.json` (28 entries, 17 refs, 1 instructor-only;
  groupings and kit-return placeholders pending Q8/Q9).  passthrough.c
  split setup/loop to fit.  Fit-swept at 1600×900 (crossfade killed,
  MathJax settled): all student slides fit; the instructor AF slide 6 px
  over (allowed); figure slides looked at.
- Gotcha learned: **PreTeXt silently drops section-level content that
  trails the last subsection** — `inst-day17-af-options` rendered on no
  page until moved inside `subsec-day17-usart1`.
- Still open: the in-class PROSE refinement (her instruction: after the
  deck) — the briefing paragraphs still sit beside the new activities
  and will be trimmed once she passes the deck; Gate 3 runs then too.
  The Day 17x deck follows the same pattern once this one is approved.

## Session 3 (2026-09-10): her 12 deck comments applied

Her ruling, now in memory: at least what her slides had; solutions never
given away; explanations may be added, nothing skipped.  Applied and
committed (`0f50bf4`): passthrough.c and uart2_RxAvail withdrawn from
student text ("You are giving it away!") — described in her slide 15's
words, built by the students in the activity, the worked code in
`inst-day17-passthrough` as the reveal; the AF fill-in table
(`act-day17-af-table`, Lab 9's Table 1 with its two prefilled Bluefruit
cells and everything else blank); her slide 19's circled-switch picture
rebuilt (`fig-bluefruit-switch.svg`, pptx_annotate) as a figure and an
image-dominant slide; the crossover names the Nucleo's and the
Bluefruit's RTS/CTS (slide + mirrored paragraph); recap and agenda
rewordings.  Deck 29 entries, full fit sweep clean (two instructor-only
overflows allowed).

## Session 4 (2026-09-11): her 16 deck comments, and the committee pass she demanded

Her message was angry on two counts: unreadable slides, and no
committee pass before delivery ("Are you getting this checked by any
student committee?").  Both fixed.  All 16 comments applied (archived):
the AF fill-in table as a real grid (statement-only, no lone "(a)");
her waits-not-aborted CTS correction mirrored on the slide, the Part-1
paragraph and the Reference; "accidentally"/"appearing" inserted; the
driver activity's empty intro deleted; her ask honored with a new
`sl-day17-uart2-read` (the given `uart2_read()` with the blocking line
marked — given code, not a solution); the passthrough intro rebuilt
with the loop in words, no code; the test activity as four short tasks;
the standalone switch slide deleted and rebuilt as `sl-day17-uart-mode`
(her slide 19's layout: steps beside the circled-switch picture);
deliverable numbers swept from student-facing text.

Then the committee ran — learner-in-the-room + checker-voice — and its
findings were applied before replying: a new `sl-day17-ad2-protocol`
(her slide 15's AD2/Protocol-tab half, which I had skipped — the test
activity referenced a tab never introduced); the AF fill-in moved after
the flow-control slide (its crossover column was unanswerable one slide
earlier); `sl-day17-bridge` rebuilt as her slide 12's bullets beside
the pinout (content was caption-bound); `AT+GAPDEVNAME=chosenName`
(the bare command was uncarryoutable) + the Lab 9 §4.3 pointer; the
paper-design questions as a sub-list (`room: "compressed"` to fit);
9600 baud in the AD2 task; RXNE glossed on the uart2-read slide; her
slide 12/15/17 titles restored verbatim; recap/agenda voice fixes.
Deck now 30 entries; budgets reconcile (7+11+18+16+7+50+1 = 110).
Full fit sweep clean (two instructor-only overflows allowed); every
changed slide looked at.

Committee findings NOT applied, on purpose: the flow-slide split with a
crossover drawing (invented figure), the USART_CR3-at-UE=0 bullet (the
Reference and the assigned RM reading carry it), MOD in the wiring
table (her slide 17 also had six), the groupings grid and kit-return
date (hers to fill; Q8/Q9 open), inter-command startup waits (Lab 9's
detail, not her slides').  Voice findings on the Part 2–4 briefing
paragraphs (duplicating the activities) remain deferred: that is the
post-pass prose refinement, per her instruction.

Gotcha: the deck player's fetch cache AND the build output both go
stale — `location.reload(true)` is not enough; the JSON is copied at
build time, so after a deck-JSON edit either rebuild or copy it into
`output/web-deck-instructor/external/decks/` before measuring.

Later that day: her 11 follow-up comments applied (`3e22fbd`).  The
big one is the AF table in two stages, her design: the quick
port/pin/AF table right after her slide 13 (`act-day17-pin-table`),
and after the flow slide the old activity becomes "Complete your
earlier table by adding the right-hand column" (the Bluefruit pin).
Also: demos are on TUESDAY (recap + Part 5 paragraph — this reconciles
the kit-return notice, Q8 closed); the x-hour promise removed from the
close (she may bring a speaker or do sleep modes — bears on how Day
17x is framed); the wiring table in her terminology (into/out of the
Bluefruit module, "On your Nucleo"); the AD2 DIO roles are the
students' choice, no dedicated pins; AT commands briefly introduced;
the RX/TX crossover noted beside the flow-control one; "either read".
Deck 31 entries.

Third pass, same day: her 7 follow-up comments applied.  The fill-in
table moved ONTO her slide 13 itself (her ask: the document names stay
readable while teams fill it in) — `act-day17-pin-table` stays in the
book as the completion's antecedent but is no longer projected; the
AD2 sends as well as observes ("reads" on its Rx DIO pin); "we'll use
the AD2 as a device that can temporarily fill this role" (her words,
slide + paragraph); the connect task says "using the Nucleo pins you
picked earlier along with their alternate function modes" and spells
out BOTH crossovers (RX/TX and RTS/CTS) — her rule: both or neither.
Deck back to 30 entries; Part 1 still 12 min.

**Her ruling (2026-09-11, message): Day 18 (Thursday) is project work
time.  Day 19 (Tuesday) is demos and wrap-up.**  This answers Q7 and
confirms Q8 (kits collected Tuesday after class = demo day).
`plans/day18.md` was written for a demos day — it now describes Day
19; Day 18 needs only a small work-time deck (groupings/recap, the
deadlines, work time, close).  Replan before building either deck.

**She passed the Day 17 deck (2026-09-11: "Okay, deck is finished").**
The deferred in-class prose refinement then ran: the five briefing
paragraphs that restated their activities verbatim (driver, wiring,
UART mode, CMD mode, MOD pin, paper design) were trimmed to context
the tasks do not carry, per her Day 9x specimen.  checker-voice ran on
the trimmed section (14 findings); applied: the AD2 paragraph
condensed (the four test tasks carry the steps), "Initially there will
be a lot missing" moved after the paper activity where its antecedent
lives (her slide 24's order), AT commands defined in prose before
first use, the UART-mode diagnostics moved after the activity, the
CTS-unwired sentences reordered (module first, then our end), the
pads bridge sentence before the complete-your-table activity, RXNE
expanded in prose, small dedups.  NOT applied (would edit activities
she passed): trimming task-day17-at's definition or the spelled-out
crossovers in task-day17-wire (her explicit ask).  The passed deck's
slide and activity text is untouched.

### Next session

Her next pass on the Day 17 deck → refine the in-class book prose from
the passed deck (the briefing paragraphs still duplicate the activities
— deliberate until she passes; checker-voice's rewrites 1–2 and 6–7 are
the worklist, in `reviews/` context via this file) → the Day 17x deck
(`day17x.json`; the optional unit's slides + `inst-day17x-session`) →
Gate 3 → fit check at 1600×900 with the crossfade killed and MathJax
settled → deliver.  Then her answers on Q7–Q9 → `day18.json`.  Close
the loop: any general correction as a rule in `AUTHORING-book.md`.
