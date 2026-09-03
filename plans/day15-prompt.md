# Day 15 — session prompt (Week 8 session 2: build the Day 15 book, delivery 1)

Paste this into a fresh session in `~/repos/ENGS28`. Read first, in order:

1. `CLAUDE.md`; `plans/CHAPTER-GENERATION-PROMPT.md` in full — every gate and
   working rule applies; the "Continuing or reworking an existing unit"
   section applies with the trust level set low (the chapter is a placeholder).
2. `plans/week8-handover.md` — where things stand, and which of the nine
   questions Petra has answered (check `git log` on `plans/week8-ground-truth.md`
   and her replies; fold answers into the ground truth §9 before writing).
3. `plans/week8-ground-truth.md` (§1 Day 15's arc and §1a her wording, §2 the
   code and §2a/§2b, §3 the datasheets, §4 Lab 8 and the **protected list**,
   §5 continuity, §6 the figure manifest, §7 what is condemned in
   `ch-servos.ptx`, §9 the questions), `plans/week8-map.md`, `plans/day15.md`
   (Gate 1 applied — `reviews/week8-gate1.md`, rulings at the end).
4. `AUTHORING-book.md` in full; `AUTHORING-visual.md` for figures. The voice
   specimens: `plans/day10-voice-reference.diff` first, then
   `plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`.
   **The sibling voice reference ahead of the specimens is `ch-motors.ptx`'s
   Day 11 and Day 11x** — same PWM vocabulary, passed by Petra.
5. The Week 7 failure catalog in `plans/week8-prompt.md` ("What Week 7 cost")
   — her language verbatim, no invented claims, no giveaways, sequencing that
   executes, no `<xref>` in anything projected, both surfaces, the mechanical
   voice rules, datasheet activities that familiarize.

## What this session delivers — the Day 15 book only

Delivery 1 per the chapter prompt: the chapter introduction and objectives,
the Before Class reading with its reading questions, the in-class `Part N`
subsections per `plans/day15.md`, `<instructor>` solutions, every figure
settled, and the chapter's Reference section if time allows. **No `<slide>`
blocks, no deck JSON** — those come after Petra passes the book. Day 15x's
in-class section is the session after that.

Order of work:

1. **Re-check the ground truth against what Petra has answered.** Questions
   1, 2, 3, 5, 6 and 9 all touch Day 15's book. The plan is written to survive
   each answer; the prose cannot be. Where an answer is still open, write the
   sentence that is true either way and mark the spot with a comment naming
   the question.
2. **Rewrite `ch-servos.ptx` from the outline up.** Keep the file and its
   chapter id; treat the placeholder as an outline (ground truth §7 says what
   in it is usable). Reuse or rename its `xml:id`s freely — no deck refs
   them yet — but settle the ids now, because the deck will.
3. **The reading first**, per `plans/day15.md`'s hand-off section: the ideas,
   not the reasoning (Gate 1 ruling 1); her slide 6/8/10 wording where the
   reading uses it (§1a); the datasheet paragraph against the hosted SG90
   sheet with question 1's hedge; the power rule with an xref to
   `fig-tb6612-regulator`. Then **Gate 1.5** — `checker-voice` on the reading's
   first subsection alone, with the acronyms `ch-motors` already expanded
   listed in the brief (PWM, ADC, H-bridge, AD2, RM). Apply before writing on.
4. **Parts 1–6**, each with its figures, activities and `<instructor>` blocks.
   Rules that bite here, from Gate 1: the three commits of Parts 1–2 are
   questions in the prose (P-18), with their answers in the reveals and
   nowhere earlier; Part 3 opens on the Day 11x callback and the 16-bit ARR
   recall, the dead band is defined in Part 2, the reveal leads with the
   chosen row's arithmetic and rests on her plastic-gear-train argument;
   Part 4's map has its round-number example before the commit; Part 5's
   `adc.c`/`adc.h` split is a task, with her fallback; the predicted
   printouts precede the capture; the checkpoint ladder is a checklist in an
   `<instructor>` or presenter note, not student prose (S-25).
5. **Listings**: `Day15_servo_template.c` (blank, in the book; completed, in
   `<instructor>`) and `tim.c` exactly as ground truth §2 has them — until the
   real files land (question 2), and then exactly as the files have them.
   Register both in `scripts/check_starters.py` the moment they are in
   `assets/starters/`. Do not invent `tim.h`.
6. **Figures**, from the manifest (§6): reuse by xref everything Day 11x
   owns; rebuild 15/15 with `pptx_annotate.py --max-text 200`; her pulse
   figure, cutaway, feedback diagram, captures and pinout raw. **Do not use
   any Fritzing from her decks for the servo's wiring** — every one feeds the
   servo from 3V3 (question 5). If she has not delivered a drawing, hand-draw
   one in the style of `fig-day12-lab6-build` (the regulator board's 5V and
   GND pins to the servo rail, shared ground, signal to D11) and send it for
   her check; the reading only xrefs the regulator figure. Commit
   `assets/book.css` with any new figure.
7. Mechanical checks, then **Gate 2** with the standing core plus the
   rotators this chapter earns — `expert-rigor-hawk` (the timer quantities),
   `learner-weak-circuits` (the wiring), `learner-ai-reliant` (the fill-ins),
   `learner-python-intro` (the integer map) — reports to
   `reviews/day15-gate2.md`, then the synthesizer with the length budget
   (B-18: measure the in-class section against Day 11's passed ~25 paragraphs),
   apply, verify item by item against the file. **Then stop for Petra's
   pass 1.** Update `plans/week8-handover.md` and the `CHAPTER_PROCESS.md`
   status row.

## The protected list, for this day

Nothing in Lab 8's §2 or §4 is in Day 15, but two Lab 8 habits still bind:
the CCR1-to-angle arithmetic (D10) stays out of student prose — the datasheet's
1 ms / 1.5 ms / 2 ms ↔ −90° / 0° / +90° convention may be stated, the formula
may not — and the `<instructor>` block carries the completed template and the
Part 3 numbers, never the student text.

## Standing traps

- Day 15 is a **Tuesday, 110 minutes**. Re-add the minutes by hand after any
  change to the Part table; every Part's row equals the sum of its beats.
- Never "battery", "battery box", "9 V", "7805": the regulator, by her ruling.
  Never "yellow" for the AD2 (orange CH1, blue CH2). Never "bench". Units in
  Unicode. American spelling. No Arduino (B-11e). No Williams. No Scopy. The
  ADC is 12-bit, 0–4095, never 1023.
- "We" is the course; "you" is the student; no weekday teaches (S-20); no
  "Part N" in student text (L-18); no personified hardware (L-15/L-17); whole
  sentences; no em dashes in student-facing text (her standing rule,
  2026-09-01); a single-task activity is a plain `<statement>`.
- Her sentences from §1a go in nearly verbatim where they fit. When you
  think yours is better, say so in the commit message.
- `git status` before committing; Petra edits this repo while you work.
