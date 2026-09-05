# Day 15x — the prompt

Paste everything below the line into a **fresh** session in `~/repos/ENGS28`.
It is `plans/CHAPTER-GENERATION-PROMPT.md` with its two blanks filled and the
unit's own situation stated; that file stays the authority for the process.

---

You are writing one unit of the ENGS 28 textbook, PreTeXt book source plus the
classroom deck it projects. Branch `main`. Small commits, pushed as you go.

**The unit:** Day 15x — Servos, continued (Wednesday x-hour, 50 min, no
pre-class reading)
**The chapter file:** `source/ch-servos.ptx` (the second day of the
Servomotors chapter; Day 15 is finished and passed)

Read, in this order, before touching anything: `CLAUDE.md`,
`plans/CHAPTER-GENERATION-PROMPT.md` (the whole of it; its "Continuing or
reworking an existing unit" section is the case you are in),
`plans/week8-handover.md` (Sessions 1 to 5 and the standing facts),
`plans/week8-ground-truth.md` (§9 is the open-question list),
`plans/day15x.md` (the plan, through Gate 1 in `reviews/week8-gate1.md`),
`plans/day15.md`, `CHAPTER_PROCESS.md`, `AUTHORING-book.md`,
`AUTHORING-slides.md`, `AUTHORING-visual.md`, and your memory directory's
rules (no em dashes, whole sentences, precise scientific language with no
anthropomorphized hardware or code and no baby or spoken phrasing, compact
replies to Petra, fix given code and never annotate it, no classroom staffing
anywhere).

## The situation

Day 15 (`sec-servo-day15`) is finished: book passed by Petra, deck through her
pass 2 with every comment applied (commits through `1b81eee`). Day 15x has a
plan through Gate 1 and **no prose**: its section is the OWES comment in
`ch-servos.ptx` just above `sec-servo-reference`, which names what the section
owes, and one thing moved there on 2026-09-05: **the UNPLUG-before-rewiring
rule and the power-up order (USB first, then the adapter) are stated on Day
15x, not on Day 15**, because Day 15x is where the wiring happens. Her original
deck is `assets/ClassSlidesOLD/Day15x-Servos(2).pptx` (six slides, re-shows of
Day 15's 27 to 30). Figures that already exist: `towerProPowering.png` (Day 15
Part 6, xref it, never re-add it), `towerProPot.png` (hers, for the
pot-plus-servo wiring, `fig-servo-pot-wiring`, not yet placed), Day 15's two
scope captures, `fig-tb6612-regulator` from Day 11.

**The sibling day is the voice reference.** Day 15's in-class section has been
through Petra's hand twice; match it before the frozen specimens. Read its
`<slide>` blocks too, because Day 15x's deck will recall several of them by
`refPage` rather than restating them.

## What to do

1. **Gate 0 as verification.** Confirm the facts Day 15x leans on from the
   ground truth and Day 15's settled text (SG92R, brown/red/orange leads,
   regulator 5V pin never Vin, 250 mA moving, PSC 60 / ARR+1 4000 / CCR1
   200-300-400 are instructor-only, the pot on A0, the two-channel ADC read
   from Lab 5). Re-ask only what is still open in ground truth §9 for Day 15x.
   Send Petra a short numbered list and carry on.
2. **Gate 1 is done; re-check it against the current Day 15.** Day 15's Part 5
   budget changed (49 min) and the wiring rules moved to 15x; say in
   `plans/day15x.md` which Gate 1 findings are still live and adjust the
   Part table (Parts 1 to 3 and the close within 50 min).
3. **Write the Day 15x book**: `sec-servo-day15x` with its Parts, activities,
   the three-branch checkpoint ladder as an `<instructor>` block, the
   pot-plus-servo wiring figure, and no reading. No new driver code: the
   program is Day 15's completed template. Gate 1.5 on the first subsection,
   then Gate 2 into `reviews/day15x-gate2.md`, apply the synthesizer's list,
   all mechanical checks green (`build-all.sh`, `check_rules.py`,
   `check_deck.py`, `check_starters.py`, `check_instructor_only.py`,
   `image_ratios.py --check`).
4. **Deliver the book to Petra** with a compact message: what to look at, and
   the numbered questions. Stop there.
5. After her pass 1: apply it, condense the deck from the passed text into
   `assets/decks/day15x.json` (refPage recalls of Day 15's leads and powering
   slides rather than copies), Gate 3 into `reviews/day15x-gate3.md`,
   fit-check every student slide at 1600×900 with the crossfade killed and
   notes off, deliver the deck.

Build note: a `watch.py --command ./scripts/build-edit.sh` process rebuilds
`output/web-edit` on every save and races `build-all.sh`; if `rm -rf
output/web-edit/external` fails, build the other targets one by one and leave
web-edit to the watcher. Update `CHAPTER_PROCESS.md`'s status row and append a
session block to `plans/week8-handover.md` at the end of every session.
