# Week 7 handover — where things stand after session 2+ (updated 2026-08-30)

## Session 2+ (2026-08-30): her pass 1 is applied, the prose is written, Gate 3′ ran — awaiting her pass 2

All 37 of her pass-1 annotations were rendered, applied and archived
(`reviews/slide-comments-archive.jsonl`); her three new images are integrated
(`stemma.png` → the wiring figure's right panel, `Accel_bb.png` →
`fig-accel-bb`, `accelerometerSlide.png` → the hi-res AD2 pinout crop); the
two stale starter comments she approved are corrected (whoami_test.c Table 22;
lsm303agr.h REFERENCE_A r/w); the in-class connecting prose is written
(17 body paragraphs, under Day 11's yardstick); and Gate 3′
(`reviews/day13-gate3.md`, 7 reports + synthesis) ran with all 19 items
applied.  One recorded fallback was exercised: the transfer-patterns slide
measured below the legibility floor at every width, so it ships **split into
write/read halves** (`i2c_transfer_writes/reads.svg`, glosses enlarged in the
derived copies only; the shared book SVG untouched except the sanctioned
gloss-row nudge), with Part 5's diagram beat re-cut 4 → 2 + (1+1).  The deck
is 46 slides, fit-swept at 1600×900, every named slide looked at.

### Ask-Petra list (refreshed 2026-08-30, pass 2 applied)

1. ~~D0/D1 vs DIO0/DIO1~~ **RESOLVED by her pass 2 ("let's go with DIO0
   after all"): DIO0/DIO1 swept everywhere in Day 13 — bullets, captions,
   titles, notes, the break-it task.**
2. **`Accel_bb.png` — one ask: a display-free re-export.** The drawing is
   correct (red lead on +3V3, measured) and now projects WHOLE, per her
   pass 2.  She'd rather the display not appear: deleting the display part
   in her Fritzing project and re-exporting gives the clean version —
   pixel-erasing it from the PNG would leave its four leads floating, so
   that was not attempted.
3. **Wednesday vs Thursday.** Your slide 32's printed line — kept verbatim as
   the homework slide's caption — says "Wednesday and Thursday"; its speaker
   note (and the book prose, and what Day 13x actually does) says
   tomorrow = theory, Thursday = data.  Which ships on the wall?
4. **DIO and VIN are never expanded anywhere in the book** (both appear bare
   in text you passed).  Expand on first use, or is bare the house style for
   instrument-panel and silkscreen labels?
5. **The AD2 pinout sheet is the ADALM2000's** (the AD2's silkscreen reads
   T1/T2, the sheet TI/TO).  Your slide 25 shows you have taught from it for
   years, so it ships — cropped from your hi-res export to the digital half.
   An AD2-native sheet at full resolution would be for next year, not this
   delivery.
6. **Q3 unchanged, at your pace** — nothing student-facing asserts what the
   program prints on a wrong-device-address NACK; Part 6's debrief paragraph
   stays owed on it (it lands in ch-i2c too when answered).

Resolved since 2026-08-27: the setup-photo ask (your three images cover it),
the two stale starter comments (your go-ahead, applied), the either-socket
confirmation (now in `fig-accel-wiring`'s caption), and the 3.3/5 V question
(your ruling — the board takes either logic level, the course sticks with
3.3 V — is now `fig-accel-wiring`'s caption wording).

## Session 2 (build Day 13) is DONE — the delivery is with Petra

Everything in `plans/day13-prompt.md`'s ordering ran: the chapter skeleton
for the whole week (rough content parked or deleted per ground truth §7;
Day 13x/14/Reference sections are placeholders whose TODO comments name
their sessions), the Day 13 Before Class reading (Gate 1.5 voice probe
applied), the in-class Parts 1–8 skeleton with activities and instructor
answers, the 43-slide deck (`assets/decks/day13.json`, fit-measured at
1600×900, every figure slide looked at), and Gate 2′
(`reviews/day13-gate2.md`: eleven reports, the synthesizer's 30-item list
applied and verified item by item — including two correctness BLOCKERs
that had reached the draft: a four-vs-three ACK count and an
"every acknowledge is an ACK" caption over a visible N).  **Stopped for
Petra's pass 1.  In-class connecting prose is a later session, from the
slides she passes** (the DELIVERY 2 markers in the source name what each
Part still owes).

### Ask-Petra list from session 2

1. ~~Re-export Waveforms B and C~~ **RESOLVED 2026-08-27 — Petra exports
   one way, so the gate's named fallback shipped instead**: B and C are
   split into write-half/read-half close-ups
   (`waveforms_capture_{b,c}_{write,read}.png`), projected on a close-up
   slide after the whole-strip view (C) and as the stretch reveal (B).
   The whole strips stay as the discovery and the rescue's marking
   target — do not merge the views back.  Capture A was re-cut tight to
   its single transaction and reads well.
2. **One setup photo** for Part 4: the breakout with its STEMMA cable, the
   SCL/SDA breadboard rows with the display still on them, the 3.3 V and
   GND feeds (never 5 V), and the AD2's DIO0/DIO1/ground leads landed.
   Her slide 9's Fritzing turned out to be a stale MPU-6050 drawing and
   was not used; the AD2-with-bundle product photo covers the day
   meanwhile.
3. **Stale comments in her files** (one-word fixes, book already prints
   the corrected values): `whoami_test.c` cites "Table 13" where the
   hosted PDF's single-byte read is Table 22; `lsm303agr.h` marks
   `LSM303_REFERENCE_A` as `r` where Table 26 says R/W, and cites
   "Sec 6, 7.1" where the hosted map is §7 Table 26.
4. **Two one-line confirmations**: the breakout's 3.3–5 V input tolerance
   (needs the schematic; the book currently avoids the claim), and "the
   STEMMA plug goes into either socket" (rests on the product photo).
5. **Q3 unchanged** — at her pace; the affected sentences are listed at
   the end of `reviews/day13-gate2.md` ("Ask-Petra list and handover").

### Verify-later list

- Reference Manual §23.4: whether the controller's final NACK on a read
  is NBYTES-driven — if confirmed, `sl-day13-memread-read`'s caption
  sharpens to name it (Gate 2′ item 25).
- Recorded so later passes do not undo them: L-17 is deliberately not
  applied to bus-protocol talk; the wall listings deliberately omit the
  `// 7-bit address` comment (P-15); capture C deliberately stays whole
  (the two-transaction count is the discovery) — if her re-export does
  not arrive and the room cannot read it, the write/read-half split is
  the named fallback.


Session 1 of four (per `plans/week7-prompt.md`) is **done**: ground truth,
the week arc, the three lesson plans, one Gate 1 over the whole week with
its 18-item list applied and verified item by item, and the three build
prompts. **No book prose and no slides were written** — that was the deal.

**Update 2026-08-27 — Petra answered the question list**, and her assets are
in the repo: `assets/datasheets/lsm303agr.pdf` (citations verified, ground
truth §3), the four real driver/test files in `assets/starters/` (what they
settle, §2), and her three full-resolution Waveforms captures in
`assets/images/Day13-I2C(3)/` (decoded contents, §1). All plans and prompts
are updated to match. **Session 2 (`plans/day13-prompt.md`) is ready to
run.**

## What exists now

| Artifact | State |
| --- | --- |
| `plans/week7-ground-truth.md` | Step 0 for all three days: decks mined, Lab 7 read in full, code recovery status (§2), the NACK-hang analysis (§2a), continuity verified against ch-i2c/ch-uart/ch-adc (§5, **with Gate 1's corrections marked**), figure manifest (§6), rough-chapter defect list (§7), questions §9 (now ten) |
| `plans/week7.md` | The arc: crucial steps, hand-offs, the reading split, the driver-writing split, the L-2 decision (now with the Reference manifest), risks, cut order |
| `plans/day13.md`, `day13x.md`, `day14.md` | One page each, beat-level budgets summing to exactly 110/50/110, coverage tables against her decks, **post-Gate-1** |
| `reviews/week7-gate1.md` | Nine reviewer reports + the synthesizer's change list (applied) |
| `plans/day13-prompt.md`, `day13x-prompt.md`, `day14-prompt.md` | The session prompts for sessions 2–4, in `day12-prompt.md`'s shape |
| `CHAPTER_PROCESS.md` | Status row updated |

`source/ch-accelerometers.ptx` is **untouched and still rough** — nothing in
it is trusted (ground truth §7 is its conviction list).

## Gate 1, in one paragraph

Nine reviewers (arc-fidelity first, then the panel + rigor-hawk and
python-intro as rotators), every one briefed with the Week 6 length-budget
rule. The arc survived — arc-fidelity called it the most complete Gate 1
coverage yet and ruled both deliberate re-orderings faithful. What failed:
**Day 14 was budgeted at 120 minutes against 110** (four reviewers
independently; my own summing error), and **the ground truth wrongly called
two's complement "recall"** — nothing before Week 7 decodes a signed bit
pattern, so Day 13x's central beat was scoped as review of a thing never
taught. Both fixed: Day 14 re-based HiTA-free at a true 110 (restore path
stated), Day 13x re-based with the sign as first teaching (`0xC000` →
−1000 mg worked to the board) and byte assembly as its own beat. The full
list, including everything explicitly rejected, is at the end of
`reviews/week7-gate1.md`.

## The question list — answered 2026-08-27 (full record: ground truth §9)

- **Q1 datasheet** — in the repo, citations verified. **Q2 files** — in the
  repo; `AccelInit` returns `uint8_t`, its skeleton leaves exactly the two
  register values blank, `accel_x/y/z` are `int16_t`.
- **Q3 wrong-address behavior** — the one still-open item, at her pace: she
  will check later, and may switch `i2c.c` to the NACK-reporting variant.
  **Do not press it**; sessions check `i2c.c`'s git log before quoting it.
- **Q4 HiTA** — dropped; the Day 14 table is final.
- **Q5 AN-1057** — approved for hosting, but analog.com refuses downloads
  from this network: **Petra drops `an-1057.pdf` into `assets/datasheets/`**
  like the datasheet. The only file still missing.
- **Q6 breakout** — Adafruit LSM303AGR STEMMA, product 4413; capture
  originals delivered. **Q7 CoolTerm** — newest version; her screenshot is
  the menu-path authority, session 4 confirms wording.
- **Q8 framing** — her decks' framing only; the rough chapter's
  proper-acceleration hook is out.
- **Q9 connector** — "you can't miswire the STEMMA connector, it only goes
  in one way" (her words; now citable in the reading and safety line).
- **Q10 spares** — spares exist, **never mentioned on slides or in the
  book**; she handles the classroom. The ladders keep "priority triage"
  with no hardware mention — final.

## What runs next

- **Session 2 — build Day 13** (`plans/day13-prompt.md`): chapter skeleton
  for the whole week, the Day 13 reading, in-class skeleton, deck, Gate 2′,
  stop for Petra. This is the next session to run.
- **Session 3 — build Day 13x** (`plans/day13x-prompt.md`): no reading;
  skeleton + deck, Gate 2′, stop. Carries Day 13's prose if her pass is back.
- **Session 4 — build Day 14** (`plans/day14-prompt.md`): reading + skeleton
  + deck + the chapter's Reference section (manifest is in the prompt),
  Gate 2′, stop. Re-times Part 4 against the real `lsm303agr_partial.c`.
- Prose for each day follows that day's pass, from the passed slides,
  against Day 11's ~24-paragraph budget, Gate 3′ with the length briefing.

## Traps carried forward (beyond the standing ones in each prompt)

- **Day 14's arithmetic has failed once already** — re-add the table by hand
  after any change; `check_deck.py` cannot catch it until a deck exists.
- **The −500 mg figure in python-intro's Gate 1 report is wrong** (0xC000 is
  −1000 mg). It is quoted verbatim inside `reviews/week7-gate1.md`; the
  synthesizer's correction note sits beside it. Do not import the number.
- **Day 13x has no unspent slack.** Gate 1 consumed every named cut funding
  Parts 1 and 4. Any reviewer addition needs a new named displacement.
- The LIS3DH datasheet in `assets/datasheets/` is Day 5X material — never
  cite it this week. The sensor is the LSM303AGR.
- Her Day 13 slide-16 speaker note says "Arduino" (stale) and doubts its own
  "press single then reset" advice — the Week 5 hang finding says the old
  advice is right; treat the doubt, not the advice, as the error until Q3
  answers.
