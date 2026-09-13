# Day 19 — Project demos and the wrap-up (deck only)

**Class length: Tuesday, 110 minutes** (odd day = Tuesday 110, from
CLAUDE.md's standing facts).  **The last day of classes.**  **No chapter,
no reading**: Day 19 is project demos and the course wrap-up, projected
from `assets/decks/day19.json`.  Her ruling (2026-09-13): Day 18
(Thursday) is a pure work day — no deck, no slides; Day 19 carries what
this plan's predecessor (`plans/day18.md`) planned for Thursday.

**The deck is all glue.**  With no chapter there are no book pages to
`ref`, so every slide carries its text in the JSON (title / agenda /
section / notice / recap).  Consequence: no images — the player's glue
types are text-only.  Her Day 19 deck's images are the title clip art
and the four vote icons (`assets/images/Day19-Topics/slide04_*`),
decoration on a text slide; the text carries whole.

**What the day is** (from her `Day19-Topics.pptx`, 8 slides, verified as
last year's demo-day wrap-up): share projects, then wrap up the course.

**Objectives.**  Teams demonstrate the Lab 9 demo checklist; the
course's learning objectives are reviewed; students know where to go
next and what to return.

**The crucial step.**  Every team demos: the six checkboxes of Lab 9
§4.6 (explain the system; two actuators; two sensors; works with no
central connected; can be connected to; the Bluetooth interface works).
Projected in the lab's own words, with no deliverable number and no
points on the wall.

**Beats** (sum 110; the demo format inside the 70 minutes is hers, Q7):

| min | What happens | Source |
| --- | --- | --- |
| 5 | title, agenda | glue; her slides 1–2 |
| 5 | the share format and the votes | her slide 4: one partner stays, the other walks; votes: Most Creative System, Cleverest Device Name, Best use of Adafruit App, Best Overall Solution |
| 70 | demos / sharing, the demo checklist projected | Lab 9 §4.6; her slides 3–4 |
| 5 | votes collected / results | hers; no slide of its own (page back to the vote slide) |
| 10 | review: the ENGS 28 learning objectives | her slide 6, the eight objectives verbatim |
| 8 | where to go from here | her slide 7, the course list (presenter notes carried) |
| 5 | last things: kit return, Bluefruit return, course evaluation; "Thank you for a great term!!!" | her slide 8 |
| 2 | slack | — |

**Coverage table against her Day 19 deck (Gate 1, slide for slide):**

| Her slide | Her text | Where in day19.json |
| --- | --- | --- |
| 1 title ("Engs 28 / Embedded Systems / Day 19") | — | `title` glue, the course's standard form |
| 2 agenda: Project Presentations; Wrapping up the course | verbatim | `agenda` glue |
| 3 Share Projects! (section) | verbatim | `section` glue, Part 1 |
| 4 share format + votes | "One project partner stays at their table, the other walks around to look at other projects." + "Each person gets to vote on:" + the four categories with her count parentheticals and her four LEGO piece photos | `notice` glue.  Her ruling (2026-09-13): the counts name LEGO pieces — each student gets one of each and deposits it with the project they vote for.  The pieces and counts are on the wall (her comment), and the mechanism is in the body in her words |
| — | — | **the one addition**: the demo checklist (Lab 9 §4.6's six checkboxes, the lab's words, no deliverable number) — stays on the wall through the demo block; its lead is the lab's own sentence re-tensed ("Today each team will demonstrate their project:") |
| 5 Wrapping up (section) | verbatim | `section` glue, Part 2 |
| 6 Review: Engs 28 learning objectives | "Here's where we've been:" + the eight objectives | two `recap` slides (1–5, 6–8), verbatim — all eight overflow one glue slide and the eighth was sliced at the bottom edge; her speaker note ("YOU DID ALL THESE THINGS!!!") as the presenterNote |
| 7 Where to go from here? | "Courses that have been mentioned during Engs 28" + the course list | `recap` glue, verbatim; her speaker note carried verbatim in the presenterNote |
| 8 Last things to do | kit to Tad after demo; Bluefruit to Tad; course evaluation; "Thank you for a great term!!!" | `notice` glue for the three to-dos; the thank-you as its own closing `section` slide so it is large on the wall, not a sub-line |

Nothing of hers is skipped; the only addition is the demo checklist
(named in the predecessor plan as the one addition, since her old deck
predates this lab revision).  No content beat is invented: the votes,
the objectives, the courses and the close are hers verbatim.

**Consistency with the passed Day 17 deck:** Day 17's notice says "All
lab kits will be collected on Tuesday after class"; her Day 19 slide 8
says "Return your kit to Tad after demo."  With demos on Tuesday these
now agree (Q8 closed, 2026-09-11).  Her Day 19 wording is kept.

**Q1 (answered 2026-09-13), then modernized the same day at her
request.**  The instructor-only block after the where-to-go slide is
no longer a carry of her 17x slides 22–25: she asked for it to be
updated to the current market and the Nucleo-based course, with
researched recommendations for a student who must pick a
microcontroller for another course's project.  Its shape now: section
→ **Start with what your project needs** (the method: peripherals,
wireless, battery, flash/RAM/pins, ecosystem, a worked example) → her
**Microcontroller "ecosystems"** slide (kept, examples refreshed) →
**Beyond the Nucleo** in two slides (Cortex-M transfer claim with the
read-the-new-manual caveat, her Arm-licensing line, ST C0→H7, the
other vendors, Nordic/Bluefruit; then RP2350/ESP32, RISC-V with a
one-term-project caveat, her 8/16-bit line) → **Suggested boards, by
what the project needs** (STM32 Nucleo / ESP32 / Nordic / Pico 2 /
small computers / Arduino) → **Where to look** (parametric search,
vendor selectors, Adafruit/SparkFun, the Make: guide, the
datasheet-check habit).  Market facts checked 2026-09 by web search
(sources in the delivery message); still instructor-only until she
says otherwise; if run, ≈ 10–12 min out of the demo block.

**Format items still hers (folded into Q7, unchanged from the
predecessor plan):** BLE congestion with ~8 modules advertising in one
room (stagger, or the stationed partner drives the connection);
whether the pair swaps stay/walk roles mid-block; whether the graded
demos and the walk-around are one block or two.  None of these change
the deck; the format slide states her format as she projected it.

**Resolved since the predecessor plan:** demo day and kit-return day
are the same Tuesday (Q8); Lab 9's stated due date (Tuesday March 10,
2:15 PM) is the demo day itself, no longer after it.

**Her rulings, 2026-09-13 (message + five review comments, all
applied):** the counts are LEGO pieces used as votes — pieces and
counts back on the wall, mechanism in the body; the checklist lead is
her "In your demonstration:" and item e gains "by a phone"; the
course list loses "and ENGS 62, Microprocessors" from the COSC 50
line and "(next winter)"; Tad confirmed; the 17x microcontroller
block built instructor-only (Q1 closed).  Remaining open: Q7's format
calls (stay/walk swap; one block or two) — nothing on a slide until
she asks.
