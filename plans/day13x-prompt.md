# Day 13x — session prompt (Week 7 session 3: build the day)

Paste this into a fresh session in `~/repos/ENGS28`. Read first, in order:

1. `CLAUDE.md`; `plans/CHAPTER-GENERATION-PROMPT.md` ("Continuing or
   reworking an existing unit" — the chapter skeleton was laid by the Day 13
   session; check `git log -- source/ch-accelerometers.ptx` for where things
   stand before assuming).
2. `plans/week7-ground-truth.md` (§1 Day 13x, §2, §5 — note the Gate 1
   corrections marked in §5), `plans/week7.md`, `plans/day13x.md` (through
   Gate 1, list applied — `reviews/week7-gate1.md`).
3. `plans/week7-handover.md` and `plans/day13-handover.md` if the Day 13
   session wrote one — and **whether Petra's pass on Day 13 has come back**
   (`git log`, `reviews/slide-comments.jsonl`). If it has, this session may
   also write Day 13's in-class prose from the slides she passed, against
   Day 11's paragraph count (~24), with Gate 3′ and the length briefing.
4. `AUTHORING-book.md`, `AUTHORING-slides.md`, `AUTHORING-visual.md`.

**Voice references:** Day 11's passed prose, Day 12's post-redo prose, the
frozen specimens. Mine her deck first
(`python3 scripts/pptx_mine.py assets/ClassSlidesOLD/Day13x-Accelerometer.pptx`);
her speaker notes on slides 8 (sensitivity, zero-g) and 17 (auto-increment)
carry the teaching voice. Slide 5/6 notes contain pasted-AI residue — mine
ideas, never the text.

## The ordering for this session

**No pre-class reading — x-days do not get one.** So this session is:

1. **The in-class skeleton** for `sec-day13x` (or the id the skeleton chose):
   Parts per `plans/day13x.md`'s table (2+1+11+3+9+19+3+2 = 50), figures
   settled, `<activity>` blocks with `<instructor>` answers, no connecting
   prose. Salvage from the rough chapter's old `sec-accel-concepts` material
   only what survives ground truth §7 — its proper-acceleration framing is
   **pending Q8**; do not silently keep or cut it (if unanswered, park it
   under the Day 14 Before Class placeholder where the plan puts the
   stationary-reading subsection).
2. **`<slide>` blocks + `assets/decks/day13x.json`**, condensing the
   skeleton. Fit-measure; look at every figure slide.
3. **Gate 2′** over skeleton + deck (same panel and length briefing as the
   Day 13 prompt; reports to `reviews/day13x-gate2.md`), apply, verify item
   by item, **stop for Petra's pass**.

## What is already decided (do not re-derive)

- **The crucial step is the data format, and its shape is fixed** (Gate 1,
  four reviewers reconciled): one byte unsigned first (and the
  register-address→**subaddress** weld); then the sign as **first teaching**
  — bit 15 is worth −2¹⁵, a 4-bit +2/−2 contrast, and the worked example
  `0xC000` → −16384 → **−1000 mg** carried to the board (this number is
  verified; a Gate 1 reviewer's −500 mg was wrong — do not import it); then
  the three-bit-row collapse; then the **committed conversion of a negative
  raw value**; then auto-increment (§6.1.1); then **byte assembly as its own
  beat** — low byte first, `((int16_t)data[1] << 8) | ((int16_t)data[0])`,
  plus her layering sentence "these functions use `i2c.c` and
  `lsm303agr.h`".
- **The physics is derived, not assumed**: F = ma and F = kx named as two
  facts before kx = ma; the phone-level-app route sits inside the opening
  commit; no Phys 13/Engs 22 prerequisite is cited anywhere student-facing.
- **The sensitivity commit's figure is two images**: the commit-time
  characteristics table with the sensitivity/mg-per-digit column **masked or
  cropped**, and the full table as the reveal. When the datasheet PDF
  arrives (Q1), the reveal reconciles our derived 3.90625 with the table's
  rounded figure explicitly. The Day 7 callback (1 LSB = V_ref/2^B) is in
  the commit beat.
- **Her slides 12–13 are dropped** (re-shows; B-8) and **slide 11 is moved
  to Part 5** — a named re-order; Part 5 is not-cuttable (it is the sole
  setup for the homework Day 14's opening commit stands on).
- Applications are three examples + one sentence (Part 2, 3 min). Do not let
  a reviewer grow them back without naming a displacement.

## Figures (manifest, ground truth §6)

Rebuild with `pptx_annotate.py --max-text 200`, then look: 13x/3
(mass-spring), 13x/4 (capacitive), 13x/5 (MEMS — multi-picture composite
trap), 13x/7 (block diagram), 13x/8 (the spec tables — build the masked
variant too), 13x/9 (breakout schematic), 13x/17 (read transfer — shares a
base with Day 13's 13/29; reuse, don't duplicate ids). Commit
`assets/book.css` with any figure change.

## Open questions that touch this day

Q1 (datasheet — the spec-table figure and §6.1.1/§7.1 citations), Q8
(proper-acceleration framing). Neither blocks the skeleton; both are marked
in the plan where they land.

## Standing traps

- Day 13x is a **Wednesday x-hour, 50 minutes**; **no pre-class reading**.
- Kits stay in bags — no wiring, no checkpoint; the load is conceptual, and
  Gate 1 already spent every named cut funding Parts 1 and 4. If a reviewer
  wants minutes, the only honest sources are Part 2 → one example (−2) and
  the close (−1).
- Servers/PIDs/:8928, the four pre-commit checks, `git status` first, her
  wording wins — as in the Day 13 prompt.
- Units Unicode; American spelling; no Arduino (B-11e); L-13/L-14; no cutesy
  language; never say what the day does not involve.
