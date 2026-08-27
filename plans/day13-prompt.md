# Day 13 — session prompt (Week 7 session 2: build the day)

Paste this into a fresh session in `~/repos/ENGS28`. Read first, in order:

1. `CLAUDE.md` — orientation, hardware facts.
2. `plans/CHAPTER-GENERATION-PROMPT.md`, especially **"Continuing or
   reworking an existing unit"** — `ch-accelerometers.ptx` is **rough**
   (assembled from raw extraction; nothing in it is trusted; its defect list
   is `plans/week7-ground-truth.md` §7).
3. `plans/week7-ground-truth.md` — the week's verified record. §2 says which
   code is recoverable verbatim and which files are still Petra's to send;
   §9 is the open question list (check git log / ask whether any have been
   answered since 2026-08-26 before re-asking).
4. `plans/week7.md` and `plans/day13.md` — the arc and this day's plan.
   **The plan has been through Gate 1 and the list is applied**
   (`reviews/week7-gate1.md`); do not re-litigate its decisions, in
   particular: the memRead-walk-after-the-capture ordering (ruled faithful),
   DIO0/DIO1 naming, the two-kinds-of-NACK beat, the fail-open scaffolding,
   and the two-commit shape of Part 5.
5. `AUTHORING-book.md` (the rules), `AUTHORING-slides.md`, and
   `AUTHORING-visual.md` before laying out any slide.

**Voice references, in order:** Day 11's passed prose in `ch-motors.ptx`,
then Day 12's post-redo prose, then the three frozen specimens. Reuse her
sentences from the mined deck (`scratch: python3 scripts/pptx_mine.py
"assets/ClassSlidesOLD/Day13-I2C(3).pptx"`) before writing your own (P-12).

## The ordering for this session — the pilot ordering, now standard

Same shape as Day 12's session (Petra's preference after Day 11x's pilot):

1. **Lay the chapter skeleton for the whole week first.** Restructure
   `ch-accelerometers.ptx` into its final section order — Day 13 Before
   Class; Day 13 in-class Parts; Day 13x in-class Parts (placeholder); Day 14
   Before Class (placeholder); Day 14 in-class Parts (placeholder);
   Reference (placeholder, shape per `plans/day14-prompt.md`) — with TODO
   comments naming which session fills each. The rough chapter's existing
   material mostly belongs to Day 13x (MEMS physics) and Day 14 (tilt);
   park what is salvageable under the right placeholder, delete what §7
   convicts, and clear rewrite scars (renamed `xml:id`s in their own commit).
2. **Day 13's Before Class reading**, full prose (it has one): I2C recalled
   in one page leaning on ch-i2c xrefs; the LSM303AGR introduced, with the
   breakout-board definition from the plan's Hand-offs section; WHO_AM_I and
   why self-identifying registers exist. Scope limits in `plans/day13.md`
   (no MEMS, no 0x19 derivation, no trace walkthrough, no wrong-address
   outcome; the "keyed connector" reassurance waits on Q9). Reading
   questions per B-3, answers checked against §2a's verified behavior.
3. **Gate 1.5 — the voice probe** on the reading's first subsection, as soon
   as it exists. Apply before writing more.
4. **The in-class skeleton**: `Part N` subsections per the plan's table,
   figures settled, `<activity>` blocks with `<instructor>` answers, **no
   connecting prose**.
5. **`<slide>` blocks + `assets/decks/day13.json`**, condensing the skeleton.
   Every activity's answer projected instructor-only (P-10). Fit-measure at
   1600×900, crossfade killed, ~900 ms settle, no `?notes`; look at every
   slide carrying a figure.
6. **Gate 2′** over reading + skeleton + deck together: `checker-arc-fidelity,
   checker-technical-accuracy` (scoped per Part), `checker-voice,
   checker-figure-claims` (rendered figures, not paths), `expert-cognitive-load,
   expert-continuity-auditor, expert-class-logistics, learner-visual,
   learner-firstgen-novice, learner-anxious-nonhardware, learner-in-the-room`
   + `committee-synthesizer`. Reports to `reviews/day13-gate2.md` **before**
   the synthesizer. **Brief every reviewer with the length budget**: a fix
   that adds words names what it displaces; the skeleton is measured against
   Day 11's passed shape before the list is applied.
7. Apply the list, verify item by item against the finished file, **stop for
   Petra's pass**. In-class connecting prose is a later session, from the
   slides she passes, against Day 11's paragraph count (~24).

## What is already decided (do not re-derive)

- The Part table and its beats are in `plans/day13.md` and sum to 110; the
  checkpoints are minutes 35 and 65. `check_deck.py` reconciles Part rows
  against beats — budget the `≈ N min` marks on slides from the start.
- The captures: C is whole-class (Part 4), A is a whole-class break-it with
  the "expected here" line spoken **before** the run, B is the stretch.
  Student-facing text must not assert what the program *prints* on a NACK
  until Q3 is answered — the trace (one transaction, NACK after the address)
  is safe to assert; the CoolTerm behavior is not.
- The AD2's digital channels are **DIO0 (pink) → SDA, DIO1 (green) → SCL**.
  Never "yellow" near the AD2 — yellow is the STEMMA cable's SCL wire only.
  Day 9x's `fig-waveforms-setup`/`fig-waveforms-decode` are the taught
  setup; name it, don't re-teach it.
- `fig-firmware-layers` is xref'd/refPage'd from ch-i2c — never re-authored,
  never a second `xml:id`.
- Part 5 has exactly two written commits (address-twice, framed as
  confirm-on-your-trace per Day 10 Part 7a; and who-ACKs), the
  two-kinds-of-NACK item, then the first in-class `i2c1_memRead()` code walk
  (xref `subsec-i2c-ref-library` for the two-controllers point).

## Code and figures

- `whoami_test.c` is recoverable **verbatim from her slides 10/11/16**
  (ground truth §2) — the book listing may be built from them, with the
  missing `#include` block left as a marked TODO until her file arrives
  (Q2). Do not invent includes (B-6). No starter file is registered in
  `check_starters.py` until her real file lands.
- `i2c1_memRead()` is quoted from `assets/starters/i2c.c` (verbatim match
  with her slides — verified).
- Figures, per the manifest (ground truth §6): rebuild with
  `pptx_annotate.py --max-text 200` and **look at each** — 13/8 (STEMMA
  wiring + colors), 13/14 (AD2 wiring, collapse the duplicates), 13/29
  (transfer patterns; check the existing `i2c_transfer_pattern.svg` first).
  Keep as-is: 13/9 (setup photo), 13/19–21 (her Waveforms captures — if
  illegible at projection size, ask for originals, Q6 covers it). Commit
  `assets/book.css` when figures are added (`image_ratios.py`).

## Open questions that touch this day

Q1 (datasheet PDF — blocks the P-11 table citation in Part 7, not the
build), Q2 (real files — blocks the includes and `check_starters.py`
registration), Q3 (NACK behavior — blocks one student-facing sentence),
Q6 (capture originals), Q9 (connector keying — blocks one reading
reassurance). All have workarounds marked in the plan; none blocks the
session.

## Standing traps — each cost something once

- Day 13 is a **Tuesday, 110 minutes** (day parity; the 65-minute error has
  been made three times).
- Stop the preview servers before `./scripts/build-all.sh` (kill the
  8352/8931/8932 listeners **by PID**), restart after, and **never kill the
  review server on :8928**.
- Before every commit: `./scripts/build-all.sh`, `check_rules.py --quiet
  source/*.ptx`, `check_deck.py assets/decks/*.json`, `check_starters.py` —
  and `git status` first; Petra edits while you work, and her wording wins.
- Units Unicode (µs, kΩ); American spelling (L-7); "on Day N"; controller/
  target, never master/slave; no benches — students carry kits; no Arduino
  comparisons (B-11e — her slide 16 note says "Arduino", drop it); L-13 (a
  document does not act on a student); L-14 (say Reference Manual for
  RM0490 sections); no cutesy language; never tell students what a day does
  *not* involve.
- Re-run `make_deck_index.py` when the deck's slide count changes.
