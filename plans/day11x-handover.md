# Day 11x — handover

State as of 2026-08-19. Written because this session is long; everything needed to
finish Day 11x is here or in the files it names, so the work survives a context
reset.

## Where the unit is

Delivery 1 (slides, figures, activities, deck) — **done, and Petra passed it**
with 11 notes and 6 hand edits, all applied.
Delivery 2 (the in-class prose) — **written**, Parts 1–5.
Gate 1.5 (voice probe on Part 1) — done, applied: `reviews/day11x-gate1_5.md`.
Gate 3 (the deck's committee, 7 reviewers) — **done**: `reviews/day11x-gate3.md`,
which ends in a **26-item consolidated change list**. That list is the work queue.

## Petra's decisions, 2026-08-19

1. **Apply everything in the Gate 3 list except the CCMR1 split.** The reveal
   figure stays as one slide. Its legibility finding (field text at 1.4%, code at
   1.1–1.3%, against the ≥2% rule, and height-limited so unscalable) is therefore
   **accepted risk, not resolved** — record it, do not silently drop it.
2. **Never point out in writing that there is no hardware today.** Not a rephrase —
   the observation itself goes. This is broader than the one sentence: do not tell
   these students what a day does *not* involve.
3. **Restore the driver listing to the book prose.** A program living only on the
   wall is not acceptable.

## What is left

Work the numbered list at the foot of `reviews/day11x-gate3.md`. Items 1–26.
Skipped by her instruction: the CCMR1 two-half re-export.

Still open with her, not blocking:
- play the closing video once to confirm the "30 → 180 rpm" claim (a video renders
  black in a still, so no reviewer could check it);
- whether `fig-pwm-scope.png` should move from `Day11-Motors/` to
  `Day11x-Motors(2)/` — Day 11x is now its only user, and a re-crop "for Day 11"
  would silently change Day 11x's prediction slide.

## Standing facts for this day, so they are not re-derived

- **50 minutes**, Wednesday x-hour. Parts budgeted to 46; the other 4 are settling
  and transitions. Gate 3 found Part 4 running ~17.5 against 15 before two untimed
  activities.
- **No pre-class reading.** The in-class section is the whole of it.
- The driver is `assets/starters/TTmotor_ramp.c`; both quoted functions are
  registered in `scripts/check_starters.py`, which accepts a **tuple of markers**
  for one function split across several listings.
- Her deck is 4:3 and the player 16:9, so her full-slide exports letterbox. That is
  expected, not a defect.
- Petra's preview servers are `./preview-edit.sh` (book, 8931/8932) and
  `./preview-slides.sh` (deck, 8352). **`build-all` kills them** — restart both
  afterwards or her teaching dashboard goes dark.

## Voice rules this day added, beyond AUTHORING-book.md

- No asking a student to **"say"** something — *describe*, *work out*.
- No figurative verbs for what the class did with a component: not "we drew", not
  "we met". Her own forms: "As we saw in the reading", "the function we wrote on
  Day 10", "the same timer we set up on Day 8".
- No stating what the day does **not** involve (above).
