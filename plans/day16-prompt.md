# Day 16 — the prompt

Paste everything below the line into a **fresh** session in `~/repos/ENGS28`.
It is `plans/CHAPTER-GENERATION-PROMPT.md` with its two blanks filled and the
unit's own situation stated; that file stays the authority for the process.

---

You are writing one unit of the ENGS 28 textbook, PreTeXt book source plus the
classroom deck it projects. Branch `main`. Small commits, pushed as you go.

**The unit:** Day 16 — Photosensors and the solar tracker (Thursday, 110 min,
with a pre-class reading)
**The chapter file:** `source/ch-photosensors.ptx` (a placeholder; nothing in
it is trusted, ground truth §7)

Read, in this order, before touching anything: `CLAUDE.md`,
`plans/CHAPTER-GENERATION-PROMPT.md` (the whole of it), `plans/week8-handover.md`
(Sessions 1 to 7 and the standing facts), `plans/week8-ground-truth.md` (§1 her
Day 16 arc, §3 the photocell datasheets, §4 Lab 8 with the **protected
deliverables list**, §5, §6, §9 and its last three blocks), `plans/week8-map.md`,
`plans/day16.md` (the plan, through Gate 1 in `reviews/week8-gate1.md`),
`source/ch-servos.ptx` Day 15 Part 6 and `sec-servo-day15x` (what Thursday
inherits), `CHAPTER_PROCESS.md` (including "What Day 15x taught us"),
`AUTHORING-book.md` (including B-19), `AUTHORING-slides.md`,
`AUTHORING-visual.md`, and your memory directory's rules.

## The situation

Days 15 and 15x are done: the book and deck passed by Petra through three
passes (commits through `2794e32`). Students arrive on Thursday with the
servo wired on the regulator board's 5 V and following the potentiometer on
A0; the x-hour was for whoever did not finish. Her Day 16 deck is
`assets/ClassSlidesOLD/Day16-Photosensors.pptx` (16 slides; ground truth §1
has them, and §6 the figure decisions). Her Thursday, in her own words and
her deck: the photocell and its nonlinearity, the divider, Lab 8 §2 done in
class (deliverables 1 to 8), the arm assembled, the pot removed once the
servo is confirmed, the photocells on A0 and A1, and "discuss at your table
how you might implement the feedback loop". The loop is their lab work; the
plan's Part 5 designs it in Lab 8 §4's own notation and Part 6 begins it,
and **the controller's code never appears in student-facing text** (Lab 8
Deliverable 9; the protected list in ground truth §4 is absolute, screenshots
included). Her answers already in hand: photocells on A0 (PA0, ADC_IN0) and
A1 (PA1, ADC_IN1); the pot comes out on Thursday after the servo is
confirmed; `week8FullLabSetup.png` is the wiring figure; the two-channel
read is Lab 5's `adc_setChannel()`, recalled and not taught; some students'
arms already carry the photocells in their cups and others put theirs in
(2026-09-06); the current figure stays 250 mA; no homework is due Thursday.
Figures that exist: her Day 16 slide images in `assets/images/Day16-Photosensors/`
(the Adafruit photo, the log-log family, the divider schematic, the cup and
clip photos, Lab 8 Figure 2) and `week8FullLabSetup.png`; the datasheets
`assets/datasheets/CdS-photocell-PDV-P8001.pdf` and `Adafruit-photocells.pdf`.

The voice reference is the passed Day 15 in-class section, ahead of the
frozen specimens. Her standing rules from this week, all in memory and
`AUTHORING-book.md`: no em dashes, whole sentences, precise scientific
language with no anthropomorphized hardware or code and no spoken phrasing,
never "write" or "write down" in a task, no classroom management or staffing
anywhere, compact replies, fix given code and never annotate it, a rule
stated once where the action happens (B-19), and every "board" named
(breadboard, regulator board, Nucleo).

## What to do

1. **Gate 0 as verification.** Confirm the facts Day 16 leans on from the
   ground truth (the PDV-P8001 sheet's numbers you may cite and the ones
   you may not; Lab 8 §2 and §4 wording; A0/A1; Lab 5's library; what Day 15
   Part 6 settled). Re-ask only what is still open; keep it to a numbered
   list; carry on.
2. **Gate 1 re-check.** `plans/day16.md` was reviewed on 2026-09-02, before
   Days 15 and 15x changed shape. Say which findings are live, applied or
   void, and re-budget: the pot comes out at the start of Part 2, the servo
   confirmation is a check and not a build, and Part 4's assembly is short
   for students whose cups are already loaded. Parts sum to 110.
3. **Write the Day 16 book**: the chapter introduction and objectives, the
   Before Class reading (the photocell, resistive sensors, the divider as an
   interface, the datasheet tour that never reaches the dark and illuminated
   resistance minimums, one paragraph on what a solar tracker is) with
   reading questions, the in-class Parts, the Reference section. Gate 1.5 on
   the first subsection; Gate 2 into `reviews/day16-gate2.md`; apply the
   synthesizer's list and verify it in the finished file; all mechanical
   checks green.
4. **Deliver the book** with a compact message: what to look at, the numbered
   questions. Stop there.
5. After her pass 1: apply it, then the deck (`assets/decks/day16.json`),
   Gate 3, the fit check at 1600×900 with the crossfade killed, deliver.

## Guards, from what went wrong on Day 15x

- Do not add a Part, an activity or a recall her deck does not have without
  asking first; name it as an addition in the plan and in the message.
- When she says "check my review comments": render the circled region before
  applying a one-word comment, and ask when it is not clear; select deck
  entries by `slide` id or exact title, never by type or position; open the
  changed slide (or grep the built page) before reporting an edit as done.
- After any structural move, grep the chapter, the deck JSON and the
  presenter notes for the words the old structure used, and fix every hit.
- When she strikes a word, grep the whole draft for it before delivering.
- Mirror every slide edit into its book paragraph and every book edit into
  its slide, whole paragraph pairs, not the sentence a comment named.

Build note: a `watch.py --command ./scripts/build-edit.sh` process rebuilds
`output/web-edit` on every save and races `build-all.sh`; build the other
targets one by one and leave web-edit to the watcher. The deck player for the
fit check is served from `output/web-deck-instructor`; start it with
`./preview-slides.sh` if nothing answers on its port. Update
`CHAPTER_PROCESS.md`'s status row and append a session block to
`plans/week8-handover.md` at the end of every session.
