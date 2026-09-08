You are writing the last week of the ENGS 28 textbook, PreTeXt book source plus the classroom decks it projects. Branch `main`. Small commits, pushed as you go.

**The unit:** Week 9, the final week of classes: Day 17 (Tuesday, 110 min, with a pre-class reading), Day 17x (Wednesday x-hour, 50 min, no reading), Day 18 (Thursday, 110 min).
**The chapter files:** `source/ch-ble.ptx` (Day 17; a rough placeholder, nothing in it is trusted) and `source/ch-power.ptx` (Day 17x; the same). Day 18 has no chapter and gets none: it is project demos and the wrap-up, a deck only.

Read, in this order, before touching anything: `CLAUDE.md`, `plans/CHAPTER-GENERATION-PROMPT.md` (the whole of it), `plans/week8-handover.md` (every session block; sessions 8 to 10 are the ones that changed the rules), `CHAPTER_PROCESS.md` (the status table and "What Day 15x taught us"), `AUTHORING-book.md` (B-19 and S-6 as rewritten on 2026-09-08), `AUTHORING-slides.md` (the MathJax note at the top of the math bullet), `AUTHORING-visual.md`, `source/ch-photosensors.ptx` (Day 16, the most recent chapter Petra passed: its in-class section is the model for how little a Part says when the room is working), `assets/decks/day16.json` (the model deck: her slides one to one, glue, instructor reveals), and every memory file in your memory directory, especially "In-class is her slides, lab time", "Rebuild the preview before delivery", "X-day is a work session", "Never say write", "Precise language, no anthropomorphism", "No em dashes, whole sentences", "Deck edits by id, then look".

## The week, in Petra's words

Most of the time is project work time for the student teams. On Tuesday we introduce Bluetooth Low Energy, because the teams need it for the final project, and then they get time to work on the project. The x-hour had been planned for sleep modes; last year there was no time for it and the x-hour was project time, so build the sleep-modes material, but it may not be used. Thursday is project demos and the wrap-up.

So the shape is fixed before any mining: Day 17 is a short taught unit (BLE, the Bluefruit module as a UART bridge, the one program the teams need) followed by project time in one sentence; Day 17x is a work session by default, with the sleep-modes lesson built as an optional short unit the instructor can choose to run; Day 18 is demos and wrap-up, projected from a deck of glue and Petra's own wrap-up slides. Do not invent a lesson to fill any of the three.

## Sources

- Her decks: `assets/ClassSlidesOLD/Day17-BLE.pptx`, `assets/ClassSlidesOLD/Day17x-Sleep Modes.pptx`, and `assets/ClassSlidesOLD/Day19-Topics.pptx` (check what it is: last year's wrap-up, or a topics list; do not assume). Mine with `python3 scripts/pptx_mine.py` (`--arc`, whole, `--code`); PowerPoint tables are dropped by the miner, so read `ppt/slides/slideN.xml` from the zip when a slide's text looks thin. Extracted images are in `assets/images/Day17-BLE/`, `assets/images/Day17x-Sleep Modes/` and `assets/images/Day17x-Sleep_Modes/` (two folders; find out which is which before using either).
- The final project handout is `assets/Labs/Lab9B_ES28.pdf` ("Lab 9, Final Project - Bluetooth", 9 pages, due Tuesday March 10, 2026). Read it in full at Gate 0: what the teams build, what BLE is used for, what the demo requires, what is due, and how it is graded; its deliverables are the protected list for this week, exactly as Lab 8's were for Day 16. The BLE program the teams need is the one thing Day 17 must teach, and its code must be the real starter, not reconstructed (B-6): look in `assets/starters/`, then the deck's code slides; if it is in neither, ask, since that blocks the prose.
- The Bluefruit LE UART Friend: its guide, the pins it uses on the Nucleo, and which USART it goes through. The placeholder claims USART1; verify against the datasheet's Table 12 and RM0490, and against her deck, before writing a pin name.
- Sleep modes: RM0490's power-control chapter (Sleep, Stop, Standby, Shutdown for the STM32C031C6), `__WFI()`, and what her Day 17x deck actually does with them; the placeholder's watchdog section is invention until her deck says otherwise.

## What to do

1. **Gate 0 as verification and collection.** Write `plans/week9-ground-truth.md` (her three arcs slide by slide with the wording worth carrying, the real code, the datasheets and RM sections pasted not typed, the figure manifest with a decision per image, what in the two placeholders survives, and the questions). Send Petra the questions, numbered and short, and carry on with everything that does not depend on them.
2. **Gate 1.** `plans/week9-map.md` and one-page plans `plans/day17.md`, `plans/day17x.md`, `plans/day18.md`, each with the coverage table against her deck, beats that sum to 110 / 50 / 110, and the cut order. Name every addition beyond her slides; for the x-hour the default is the work session and the sleep-modes unit is the option, so the plan carries both budgets. Run the Gate 1 panel on the plans and outlines together.
3. **Day 17 book:** introduction and objectives, the Before Class reading (what BLE is, GAP and GATT as ideas, the module as a UART bridge, the datasheet tour) with reading questions, the in-class Parts (her slides, the one program, then "we'll now give you time to work on your project" in one sentence), the Reference section. Gate 1.5 on the first subsection; Gate 2 into `reviews/day17-gate2.md`; apply and verify the synthesizer's list item by item; every check green; rebuild web-edit and web-instructor yourself with `./scripts/build-edit.sh` and check the page timestamps before delivering. Deliver with a compact message: what to look at, the numbered questions. Stop there.
4. **Day 17x book** (no reading): the sleep-modes unit as a short in-class section that the instructor may skip, built from her deck, with the work session as the section's default framing in its introduction. Same gates.
5. **Day 18:** no chapter. After her passes on the books, a deck of glue and her wrap-up slides (`assets/decks/day18.json`), plus whatever the demo format needs projected (the schedule, the rubric if she gives one). Ask what she wants on the wall before building it.
6. After her pass 1 on each book: the deck (`assets/decks/day17.json`, `assets/decks/day17x.json`), Gate 3, the fit check at 1600×900 with the crossfade killed and MathJax settled (the player typesets `<m>` and `<md>` now; wait for `mjx-container` elements before measuring), every figure slide looked at, deliver.
7. Close the loop: the status rows in `CHAPTER_PROCESS.md`, a session block in `plans/week9-handover.md` at the end of every session, and any general correction of hers as a rule in `AUTHORING-book.md`.

## Guards, from what went wrong on Days 15x and 16

- **The in-class section is her slides and nothing more.** Where her slide gives the class time to work, the book gives one sentence and the work's own wording; nothing taught in the reading is re-stated in class; no invented reveals, wiring prose, symptom lists or observation tasks. The committee will review an invention for faults and never ask whether it should exist, so ask that question yourself before every Part, with her slide beside it.
- Do not add a Part, an activity or a recall her deck does not have without asking first; name any addition in the plan and in the message.
- Math on a slide is `<m>`/`<md>`, never an SVG of an equation and never raw `10^0.6` in slide text; a formula the room must read goes on its own line.
- When she says "check my review comments": render every circle before applying a one-word comment (book comments by page and document pixels on the current web-edit build; slide comments by deck and stage-normalized bbox at 1600×900), ask when it is not clear, select deck entries by `slide` id or exact title, mirror every slide edit into its paragraph and every book edit into its slide, and open the changed slide or grep the built page before reporting an edit as done. Move each handled comment to `reviews/slide-comments-archive.jsonl`.
- After any structural move, grep the chapter, the deck JSON and the presenter notes for the words the old structure used, and fix every hit in the same commit.
- Precise scientific language; no personified hardware or code; no "write" or "write down" in a task; no classroom management or staffing anywhere; every "board" named (breadboard, Nucleo, the Bluefruit module); no em dashes; whole sentences; a rule stated once, where the action happens.
- Never say 5 V for the Nucleo's supply; the AD2's channel 1 is orange and channel 2 blue; the clock is 12 MHz; there are no lab benches.

## Build note

A `watch.py --command ./scripts/build-edit.sh` process rebuilds `output/web-edit` on every save and races `build-all.sh`, and it has been seen to stop silently: build the targets one by one (`pretext build web-deck-instructor`, `./scripts/build-deck.sh`, `./scripts/build-edit.sh`, `./build.sh`) and check the built page's timestamp before every delivery. The deck player for the fit check is served from `output/web-deck-instructor` on :8352 (`./preview-slides.sh` if nothing answers); the book preview she reviews is :8931 (web-edit) and :8932 (web-instructor); the review server on :8928 must never be killed during corrections. Before every commit:

```bash
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
python3 scripts/check_instructor_only.py
python3 scripts/image_ratios.py --check
```

Commit only the files you changed; never revert a change you did not make; Petra edits this repo while you work.
