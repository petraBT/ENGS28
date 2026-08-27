# Week 7 handover — where things stand after session 1 (updated 2026-08-27)

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
