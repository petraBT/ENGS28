# Week 8 handover — where things stand after session 1 (2026-09-02)

Week 8 is Days 15, 15x and 16: servomotors (`ch-servos.ptx`), then
photosensors and the solar tracker (`ch-photosensors.ptx`). One lab, Lab 8,
spans both chapters. This file is updated at the end of every session; the
next session starts from it.

## Session 1 (2026-09-02): ground truth, week map, Gate 1 — no prose written

Delivered, all committed and pushed on `main`:

- `plans/week8-ground-truth.md` — Step 0 for the whole week: her three arcs
  slide by slide with the two timer tables `pptx_mine.py` drops (recovered from
  the slide XML) and her wording worth carrying (§1, §1a); the real code —
  `Day15_servo_template.c` and `tim.c` recovered verbatim from the deck,
  `tim.h` missing, the off-by-one between `tim.c` and Day 11x's driver, TIM16
  as Day 8's recipe on a new timer, and the two-channel ADC read that Lab 8
  calls "easy" and no chapter has taught (§2); the datasheets verified — the
  hosted servo sheet is the SG90's and carries no dead band or current figure,
  the PDV-P8001 says 0.6 and 520 nm where the placeholder said 0.7 and 560
  (§3); Lab 8 end to end with the **protected deliverables list** (§4);
  continuity against `ch-motors` and `ch-adc` (§5); the figure manifest with a
  decision per image — every Fritzing in her decks feeds the servo from the
  Nucleo's 3V3 (§6); what in both placeholder chapters is usable and what is
  condemned, with reasons (§7); reuse traps (§8); and nine questions (§9).
- `plans/week8-map.md` — the arc in three sentences, the three crucial steps,
  the hand-off chain, the reading split, where the two feedback loops land,
  the protected list in one line, risks, cut order, and the open flags.
- `plans/day15.md`, `plans/day15x.md`, `plans/day16.md` — one-page plans with
  outlines, coverage tables against her decks, beats that sum to their Parts
  (110 / 50 / 110), checkpoints with ladders, datasheet moments, writing room,
  hand-offs. **Gate 1 applied** (`reviews/week8-gate1.md`, ten reviewers, the
  rulings and the applied list at its end).

### What Gate 1 changed

Ten reviewers; every clock was found correct. Four structural findings, all
applied: the Day 15 reading was giving away Parts 1–2's three commits (the
reasoning moves into the reveals; the reading keeps the ideas); Day 15x had
no minute for finishing Tuesday (its Part 2 now opens on a universal
re-verification of the pulse, and a minute-10 decision point collapses Part
3 if the room is behind); the servo build assumes an `adc.c`/`adc.h` that no
chapter has taught students to make (Day 15 Part 5 gains the split as a
named beat; question 9); and Day 16's end state kept the potentiometer that
her last slide removes (Part 4 retires it). Plus a dozen wording-level fixes:
the Day 11x callback and the 16-bit ARR recall open Part 3, the dead band is
defined before it is used, the chosen row's arithmetic leads the reveal and
rests on her plastic-gear-train argument rather than the unverified 1 µs,
the map expression gets a round-number example, students predict their
printouts before capturing, Day 16 Part 1 recalls Day 7's divider and walks
the denominator, "compare two" carries its caveat, the integer-K reveal states
the dead zone (±100 counts), Part 2 gets two checkpoints, and the reading of
Lab 8 §4 is split so commit 3 is not pre-answered.

### The questions sent to Petra (ground truth §9), and what each blocks

| # | Question | Blocks |
| --- | --- | --- |
| 1 | SG92R vs the SG90 sheet; source for dead band 1 µs and current draw | Day 15 reading's spec paragraph; Part 3's confirmation clause |
| 2 | The three files (`tim.h` is on no slide); `tim.c`'s `ARR = timerMax` / `CCR1 = value-1` vs Day 11x's convention | every Day 15 listing; Part 4's "what changed" |
| 3 | Which A-pins: photocells A0/A1; pot A0 (template), A2 (her Fritzing) or A3 (Lab 8) | Day 15 Part 5's wiring line; Day 16's wiring figure; the two-channel code |
| 4 | Two-channel read: route A (both in `CHSELR`, read twice) or route B (select per conversion); Wednesday or the lab | Day 15x Part 3; Day 16 Part 2 |
| 5 | A wiring drawing with the regulator feeding the servo rail — every drawing in her decks and Lab 8 Figure 4 uses 3V3 | **the week's wiring figure** — Day 15 Part 6, Day 15x Part 2, Day 16 Part 4; the Day 15 book cannot ship Part 6 without it |
| 6 | Lead colours (brown/red/orange in the kit?); what students see at 1 ms and 2 ms; is 1–2 ms the safe range to state | Day 15 reading; Day 15x observation |
| 7 | Does Thursday end with the loop designed (her deck) or running | Day 16 Parts 5/6 |
| 8 | Any homework due Thursday | Day 15 close |
| 9 | Do students already have `adc.c`/`adc.h` in `mylib` from a lab | Day 15 Part 5's first beats |

Two are already answered and folded in (top of the ground truth): the parts
and their datasheets; the servo's 5 V from the motors' regulator, never a
battery pack.

### What survives of the placeholders, and what is condemned

Ground truth §7 has the itemized list. In short: the section shapes and a
few figure choices survive as an outline; **no number, no reading question,
no listing and no activity survives**. `ch-servos.ptx` teaches PSC 11 / ARR
19999 / CCR 1000–2000 with raw bit shifts where her design is 60 / 4000 /
200–400 in the CMSIS idiom, asserts 700 mA and 8 mA from nowhere, calls the
motor PWM 20 kHz (it was 1.6 kHz), keeps the battery option, and names the
lab "Lab 7". `ch-photosensors.ptx` prints Lab 8 Deliverable 1's numbers (and
gets them wrong), gives away Deliverable 9 as `solar_tracker_update()` with a
gain of 5 where the lab says 0.01, and claims the nonlinearity cancels.

## Addendum, 2026-09-03: Petra's answers, and one withdrawal

Her message answered five of the nine questions and delivered six files, all
committed: `assets/datasheets/C17481_SG92R_datasheet.pdf` (the kit's part is
the **SG92R**; dead band 1 µs, stall torque 2.5 kg/cm, 0.1 s/60°, POM and
carbon gears — no current figure; there is no official sheet beyond
https://towerpro.com.tw/product/sg92r-7/), `assets/starters/Day15_servo_template.c`,
`tim.c`, `tim.h` (`tim.c` is "updated on purpose from the previous version,
so teach the difference"), and `assets/images/Day15-Servos/towerProPowering.png`
and `towerProPot.png`, her own composites. Each student has their own
`adc.c`/`adc.h` from a lab (the Day 15 Part 5 split beat is withdrawn). The
pot is on **A0** on Day 15; in the lab students work out the move to A3
themselves, so the book never shows it.

**Question 5 is withdrawn, and the Gate 1 "wrong rail" blocker with it**
(erratum at the top of `reviews/week8-gate1.md`). Nowhere in her slides is
the servo powered from the Nucleo: the regulator board is a separate picture
layered over the Fritzing, media extraction drops it, so the servo's power
lead ended at an empty column and the 3.3 V rail (the pot's) was misread as
the servo's supply. Her exports show the lead going to the regulator's 5V
pin. Ground truth §6 and §9, the map, and the three plans are corrected.

**Her second message, same day, closed the three follow-ups:** `tim.c` is
**fixed** at her request (`ARR = timerMax-1`, `CCR1 = value` — 4000 counts,
Day 11x's convention; "no re-teaching necessary"); on Thursday the pot comes
out and the photocells go on **A0 and A1**, and her
`assets/images/Day16-Photosensors/week8FullLabSetup.png` is the Day 16
wiring figure; the kit's SG92R has **brown, red and yellow** leads (ground,
power at the center, signal). She is re-exporting `towerProPot.png` with the
pot on A0 (same file name — overwrite); its legend, and `towerProPowering`'s,
read "Orange → power" and should say red.

**Her third message (2026-09-03) closed 4, 7 and 8:** two-channel reads have
been taught earlier in the term (Day 15x Part 3 is now a five-minute recall
and Part 2 a 34-minute work session; the plan's "addition" is withdrawn); the
feedback loop is their lab work, begun in class (Day 16's crucial step stays
"designed"); no homework is due Thursday. Both wiring exports are replaced
(pot on A0, legend "Red/Orange → power").

**Fourth message:** the two-channel read was part of **Lab 5**, which is also
where students developed their `adc.c`/`adc.h` library — recorded in the
ground truth and the plans; the book points at Lab 5.

**Still open (ground truth §9):** 1b the current figure (hers unless she
prefers none); 6 what students see at 1 ms and 2 ms.

**Lesson for every later week:** a slide whose extracted picture ends a wire
at nothing has lost a layered picture. Look at her composite (render the
slide, or ask for the export) before calling her drawing wrong.

## Session 2 (2026-09-03): the Day 15 book, delivery 1 — through Gate 2, awaiting Petra's pass 1

Delivered, committed on `main`:

- `source/ch-servos.ptx`, rewritten from the outline up: the chapter
  introduction and objectives; the Before Class reading (what is inside a
  servo, what it does, the SG92R and its datasheet, the command pulse, the
  power rule) with five reading questions; Day 15 in-class Parts 1–6 with
  eleven activities and ten `<instructor>` blocks (the filled tables, the four
  constants and the map, the completed template, the checkpoint ladder, the
  stretch answers); and the Reference section (the pulse convention, the timer
  arithmetic, `tim.c` whole, integer scaling). No `<slide>` blocks, no deck.
  Day 15x's section is a marker comment naming what it owes.
- Figures settled: her cutaway, feedback diagram, pulse figure, pinout, two
  captures and stand-and-arm photo raw; slide 15 rebuilt with its two callouts
  (`fig-servo-pulse-resolution.svg`); her export `towerProPowering.png` as the
  wiring figure; Day 11x's timer figures and `fig-tb6612-regulator` by xref.
  `assets/book.css` regenerated.
- `Day15_servo_template.c` and `tim.c` registered in `check_starters.py`
  (the template whole, `tim.c` whole in the Reference plus two Part 4
  fragments).
- Gate 1.5 ran on the reading's first subsection and was applied before the
  Parts were written. Gate 2: seventeen invocations (the core of ten with
  `checker-technical-accuracy` scoped three ways plus a self-contradiction
  read, and four rotators), all in `reviews/day15-gate2.md`, the synthesizer's
  28-item list applied and verified phrase by phrase. The big ones: the
  template has five `#define` blanks, not four; the 12 MHz is the system
  clock, not the oscillator; Table 12 lists five TIM14_CH1 pins and carries no
  AF numbers; the resolution reveal contradicted itself on prescaler 240 and
  overstated the dead band; `fig-servo-leads` had the wrong photograph; the
  crucial build now carries a student-visible symptom list (no numbers) ahead
  of the instructor ladder; the `tim.c` cross-check moved from Part 3 to
  Part 4 (Part 3 = 18, Part 4 = 12); Part 6 no longer repeats the reading.
- `plans/day15.md` carries the rebudget and the book's Part titles;
  `ch-motors.ptx:1130` no longer attributes AF4 to Table 12.

**Known state to say plainly:** `check_deck.py` reports nine `NOT PROJECTED`
instructor blocks (`inst-day15-*`). That is the delivery-1 state: the blocks
exist and no deck refs them until delivery 2. Every other check is clean.

### Ask-Petra, from Gate 2 (also in ground truth §9)

1. The current draw (1b): the book uses her slide 28's "about 250 mA while
   moving, and much more when it is stalled" in four places. Keep, or no
   number?
2. `towerProPowering.png`: a re-export whose frame reaches the Nucleo's POWER
   header (the 3V3 and GND wires leave the top edge), with or without the
   3.3 V rail feed the pot does not need until Wednesday, and readable pin
   labels (they are 0.6 % of the width).
3. The two Waveforms captures: a tighter capture or leave to crop (keeping
   the time base, trigger, three cursors and the ΔX rows).
4. The template: `int16_t` for `pot_value`/`pwm_value` against `uint16_t`
   parameters; and the ISR's `&= ~TIM_SR_UIF` against Day 8's assignment.
   The book states the rc_w0 fact beside the listing; the code is hers.
5. The doubled parenthesis in her slide 10 pulse art.
6. The LF count on a Tuesday (the Part 5 checkpoint).
7. "TowerPro" (used) vs the label's "Tower Pro".
8. Whether to state her stall-torque conversions (N·cm, oz-in).
9. The 3.3 V signal level against the SG90 sheet's 4.8 V drawing.
10. Still open from session 1: 6's endpoints (what students see at 1 ms and
    2 ms); the reading states the convention and her "don't go all that far".

### Follow-ups for other days

- `ch-motors.ptx` Day 12 prose (awaiting her pass 1): one clause where the
  polling loop is described, saying why `milliseconds() - last_sample` is
  the safe form when the count wraps, then an xref from
  `task-day15-stretch-millis`.
- Delivery 2 candidates: a two-axis figure for the integer map; a shaded
  dead band on `fig-servo-pulse-resolution.svg`; the pinout figure cropped to
  the header columns; the captures on image-dominant slides; the
  `refPage` recall slides the section comment lists.

## Session 3 (2026-09-04): Petra's pass 1 on the Day 15 book, applied

Her 46 review comments (archived in `reviews/slide-comments-archive.jsonl`)
and her answers to the Gate 2 questions are applied. What changed that the
deck must follow: Part 1 lost the gears commit (her power-conservation note
is now in the reading; Part 1 = 6 min); the push-the-horn commit is
hypothetical and never done on a servo; Part 4 lost the `tim.c` cross-check
(the code is consistent, so nothing to check; Part 4 = 10) and the map's
round-number mechanic ("don't give it away"); Part 5 = 51; the Table 12
activity is a fill-in table (pin, AF, header name) with a sentence on which
document holds what; the fill-in is a two-column table with room to write;
`fig-servo-pulse-resolution.svg` has real subscripts and ARR + 1; the two
captures are cropped (`fig-servo-scope-*.png`); `fig-servo-pulses.png` has
the parenthesis fixed; the servo photo is her `towerPro.jpg`; both wiring
exports are hers, re-done, with the lead colours brown / red (middle) /
orange (yellowish), and the book says orange for the signal lead everywhere.
The starter `Day15_servo_template.c` is fixed (`uint16_t`, `SR = ~UIF`) and
the book says nothing about it. "Tower Pro". The current draw stays 250 mA.

Not done by her choice: torque conversions (either way; left as kgf-cm).
Standing rule from this pass: [memory] a starter's defects are fixed in the
file, never explained; LF counts are hers and appear nowhere.

## Session 4 (2026-09-04): the Day 15 deck, delivery 2, through Gate 3

`assets/decks/day15.json` (55 entries, 43 refs, 10 instructor-only) and 27
`<slide>` blocks beside the in-class prose she passed. Every student-facing
slide fits at 1600×900 (measured with the crossfade killed, notes off); the
two instructor listings overflow, which is allowed; every figure slide looked
at. Gate 3 ran seven reviewers (`reviews/day15-gate3.md`); the synthesizer's
list is applied and recorded there. Day 11x's two timer figures reach the
room by refPage (the block diagram on the recall slide, the register map on
the "What Timer 14 will do" slide); the resolution and template slides are
split; the symptom list's rung 2 is terminal-first in both the book and the
slide; a minute mark on every deck entry reconciles each Part (6 + 8 + 17 +
10 + 51 + 7, one minute of slack). Petra's rules honoured: no staffing
anywhere, "Tower Pro", the map not drawn, the starter fixed and not annotated.

Ask-Petra (deck): the `towerProPowering.png` re-export (legend over the ground
jumper; the power jumper drawn orange; the regulator graphic off its columns)
and two zoom exports of it; the Vin warning in the servo text or not;
`towerProPot.png` for Day 15 with a zoom for 15x; the symptom list's bold
leads.

## Session 5 (2026-09-05): Petra's pass 2 on the Day 15 deck, applied

Her 51 slide comments applied (archived in `reviews/slide-comments-archive.jsonl`),
each mirrored into the book paragraph the slide condenses. The rulings that
became standing rules: **precise scientific language, no anthropomorphized
hardware or code, no baby or spoken language** ("the driver knows", "busy
making", "write down", "on your own", "recipe", "sticks there", "nominal"
all struck); the 5V-not-Vin warning is now in the reading, Part 6 and the
power slide; the powering figure (her replaced `towerProPowering.png`) is
described in words, no zoom exports (students reason the wiring out from the
figure on the screen at their table); the symptom list's `<term>` leads stay
italic. Structural changes: `tim.c` is projected whole on two slides
(`sl-day15-tim-c-1`/`-2`; one slide overflowed by 468 px at projection size)
before the driver's two changes; the range-check slide is retitled "Ensuring
pwm values are in a safe range"; the measure activity gained a scope task
(`task-day15-build-scope`); the fill-in table's answer column is wider on
the slide (an activity table ignores `<col>` widths on a slide, so its blank
cells carry a run of non-breaking spaces). `Day15_servo_template.c` is
reindented with spaces and aligned comments (her "fix indenting and
tabbing"); `check_starters.py` re-registered (template marker, the Reference
`tim.c` by a comment only it carries, the second tim.c slide as a FRAGMENTS
pair). Deck 57 entries; Parts 6 + 8 + 17 + 12 + 49 + 7. All student slides fit;
the two instructor listings overflow, as allowed.

Note for the build: a `watch.py --command ./scripts/build-edit.sh` process
(the preview-edit stack) rebuilds `output/web-edit` on every save and races
`build-all.sh`'s `rm -rf output/web-edit/external`. Build the other targets
one by one and leave web-edit to the watcher.

## Next session: the Day 15x book (no reading)

The Day 15 deck awaits her pass 3, if any. Then the Day 15x book (no
reading), from the OWES comment in `ch-servos.ptx` and `plans/day15x.md`.

## Superseded: `plans/day15-prompt.md` — the Day 15 book, delivery 1

Then, in order, each session starting from this file: her pass → Day 15
deck → Day 15x book (no reading — x-day) → her pass → Day 15x deck → Day 16
book → her pass → Day 16 deck. Update this file and the `CHAPTER_PROCESS.md`
status rows at the end of every session.

## Ask-Petra list, standing

The open items above (1b, 6's endpoints). Plus, for whenever she
next touches Lab 8 (hers, not the book's): `OCR1A` → `CCR1`; "page 133 of
Williams"; `V_AVR_PCx` in Figure 1.

## Standing facts learned this week, for every later session

- `pptx_mine.py` drops PowerPoint **tables**; her Day 15 slides 11, 12 and 15
  are tables. Read `ppt/slides/slideN.xml` from the zip when a slide's text
  looks thin.
- `pdftotext` and `pdftoppm` are not installed here; PyMuPDF (`import fitz`)
  and `pypdf` are, and `Read` renders small PDFs directly.
- Her regulator picture on Day 15 slide 29 is byte-identical to
  `fig-tb6612-regulator`'s image — xref it, never re-add it.
- Her Day 16 slide 14 ("Ultimate Setup") has **no potentiometer**; the pot
  comes out after the servo is confirmed (slide 13). Ground truth §6 was
  corrected at Gate 1.
