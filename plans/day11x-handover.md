# Day 11x — handover

State as of 2026-08-20, after the Gate 3 list was applied and its two structural
items closed. Everything needed to finish Day 11x is here or in the files it
names, so the work survives a context reset.

## Where the unit is

Delivery 1 (slides, figures, activities, deck) — **done, and Petra passed it**
with 11 notes and 6 hand edits, all applied.
Delivery 2 (the in-class prose) — **written**, Parts 1–5, and the driver listing
is in the book prose as she asked.
Gate 1.5 (voice probe on Part 1) — done, applied: `reviews/day11x-gate1_5.md`.
Gate 3 (the deck's committee, 7 reviewers) — done: `reviews/day11x-gate3.md`,
ending in a 26-item consolidated change list.

**The Gate 3 list is applied.** Items 1–26, except the one she declined. Two of
them resolved differently than the reviewers proposed, both recorded below with
the measurement that decided it.

`build-all`, `check_rules`, `check_deck` and `check_starters` are clean, and all
33 deck slides measure **fits** at 1600×900 with the crossfade killed and no
clipped code. Measure without `?notes`: presenter notes are part of the body, so
a sweep run with them showing reports several hundred px of overflow on slides
that fit.

**Nothing is left before delivery 2 goes to her.** The next thing that happens is
**Petra, pass 2 — she passes the deck** (`CHAPTER_PROCESS.md`, step 13).

## Petra's decisions, 2026-08-19

1. **Apply everything in the Gate 3 list except the CCMR1 split.** The reveal
   figure stays as one slide. Its legibility finding (field text at 1.4%, code at
   1.1–1.3%, against the ≥2% rule, and height-limited so unscalable) is therefore
   **accepted risk, not resolved** — recorded, not silently dropped.
2. **Never point out in writing that there is no hardware today.** Not a rephrase —
   the observation itself goes. This is broader than the one sentence: do not tell
   these students what a day does *not* involve.
3. **Restore the driver listing to the book prose.** A program living only on the
   wall is not acceptable.

## The two items that resolved differently, and why

- **Item 21, "merge `sl-day11x-init-pin` into `sl-day11x-init-timing`"** — three
  reviewers asked for it independently. **It does not fit.** Merged and set side by
  side at 47%, the two listings clip **149 px and 99 px across** and the body runs
  **81 px past the slide** (1600×900, transitions killed). The lines that clip are
  the driver's own — `GPIOA->MODER |= GPIO_ALTERNATE << GPIO_MODER_MODE7_Pos;` and
  its neighbours — so B-6 leaves no lever, and shortening comments does not reach a
  55-character line of code. **The minute is taken instead**: the two slides stay,
  marked as ONE beat, at 30 s + 90 s against the 3 minutes they used to hold. The
  source carries this reasoning as a comment above the pair, so it is not
  re-attempted.
- **Item 21, "fold `inst-day11x-bitfields` into the register walk"** — removing its
  deck entry is what `check_deck.py` exists to catch: *"instructor-only in the
  source, but no deck refs it"*. Every instructor block in this book projects. So
  the fold is by **timing**, not deletion: the register walk and its answer slide
  are one 2-minute beat (1 + 1), and both notes now say so.

## The clock, recomputed

Gate 3 found the day to be a 58–60 minute plan misfiled as 50, mostly because four
beats carried no time in any file. **Every beat is now timed**, so the arithmetic
is auditable end to end:

| Part | Budget | Sums to |
| --- | --- | --- |
| 1 | 4 | 4 |
| 2 | 14 | 14 |
| 3 | 8 | 8.5 |
| 4 | 15 | **17.5** (was 21.5 honestly counted, 17.5 with four beats invisible) |
| 5 | 5 | 6 |

**52 against 50**, and Part 3's register-map slide is marked in its own note as the
pressure valve — cutting it closes the gap exactly. Part 4's stretch activity is
explicitly *no class time*.

Where the four minutes came from: the register walk and its answers 4 → 2; the two
init slides 3 → 2; the Lab 6 seam 3 → 2, read off the bullets rather than discussed.

## Still open with her, not blocking

- Play the closing video once to confirm the "30 → 180 rpm" claim (a video renders
  black in a still, so no reviewer could check it).
- `fig-pwm-scope.png` still lives in `Day11-Motors/` and Day 11x is now its only
  slide user. **Noted in the source** at `fig-pwm-scope-still` rather than moved:
  Day 11's Gate 2 left a re-crop of that file open with her, and a re-crop made
  "for Day 11" would silently change Day 11x's prediction slide. Moving the file is
  hers to decide.
- The CCMR1 reveal's legibility, per her decision 1 above.

## Standing facts for this day, so they are not re-derived

- **50 minutes**, Wednesday x-hour. Parts budgeted to 46; the other 4 are settling
  and transitions.
- **No pre-class reading.** The in-class section is the whole of it.
- The driver is `assets/starters/TTmotor_ramp.c`; both quoted functions are
  registered in `scripts/check_starters.py`, which accepts a **tuple of markers**
  for one function split across several listings. It resolves a marker to the
  **first** `<program>` block containing it — the prose listings, which come before
  the slides in the file — so slide edits cannot break it.
- Her deck is 4:3 and the player 16:9, so her full-slide exports letterbox. That is
  expected, not a defect.
- Petra's preview servers are `./preview-edit.sh` (book, 8931/8932) and
  `./preview-slides.sh` (deck, 8352). **`build-all` needs them stopped** — a running
  `http.server` holds `output/` — and they must be restarted afterwards or her
  teaching dashboard goes dark. Their watchers rebuild the pages on a `.ptx` save
  but do **not** refresh `output/*/external/`, so a deck JSON edit needs a real
  build before the player sees it.
- An XML comment cannot contain `--`. Use an em dash; the build fails with
  *"Double hyphen within comment"* otherwise.

## Voice rules this day added, beyond AUTHORING-book.md

- No asking a student to **"say"** something — *describe*, *work out*.
- No figurative verbs for what the class did with a component: not "we drew", not
  "we met". Her own forms: "As we saw in the reading", "the function we wrote on
  Day 10", "the same timer we set up on Day 8".
- No stating what the day does **not** involve (above).
