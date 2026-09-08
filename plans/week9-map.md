# Week 9 map — Days 17, 17x, 18 (the final week)

**The arc in three sentences.**  On Tuesday we introduce Bluetooth Low
Energy because the final project teams need it, show the Bluefruit module
as a UART bridge and the passthrough program that tests a USART1 driver,
and then the teams work on their projects.  The Wednesday x-hour is
project work time by default; a sleep-modes unit built from her old deck
stands ready if she chooses to run it.  On Thursday the teams demo, and
the course wraps up.

**The week's one crucial step (Day 17, P-2).**  Every team leaves Tuesday
knowing the bring-up path for their project's radio: USART1 with hardware
flow control (found in the Reference Manual and the datasheet's AF
tables, by them — that is Deliverable 1), a driver that mimics the USART2
driver they have, and `passthrough.c` as the test that proves the driver
before the Bluefruit is ever connected.

**The stretch (P-3).**  Lab 9 builds it in: the fifth point of
Deliverable 3 is an interrupt-driven driver, and the "language" a team
designs can be as rich as they like.  The book invents no additional
stretch.

**Hand-offs.**  Day 16's deck close already names Tuesday's pre-class
reading; that reading is `ch-ble`'s Before Class section (BLE as ideas:
classic vs BLE, GAP, GATT, the module as a UART bridge, the Adafruit
guide tour).  The in-class sections carry her slides and the lab's own
wording, nothing else.  Day 18 has no chapter: a deck of glue, the demo
format, and her wrap-up slides.

**The protected list, in one line.**  Lab 9's seven deliverables — the
USART1 pin/AF table, the paper design, the USART1 driver, the CMD-mode
screenshot, the BLE startup function, the demo, the reflection — are
answered nowhere in any student-facing target; the book never names a
USART1 pin choice.

**Structure decisions (from the shape Petra fixed before mining):**

- Day 17 in-class = her slides 13–26: the bring-up briefing, the paper
  design, then "we'll now give you some time to work on your project" and
  the room works.  No invented activities, reveals, checklists or
  symptom lists; the lab's wording carries the work.
- Day 17x = `ch-power`'s single section: the work-session framing first
  (the default), then the optional unit, built from her deck, that the
  instructor may run or skip.  No pre-class reading (x-day).
- Day 18 = deck only (`assets/decks/day18.json`), built after her passes
  on the books; content questions (demo format, votes, kit return) are
  hers to answer first.

**Risks / open flags** (numbers = ground-truth §9 questions):

1. The 17x optional unit's scope — watchdog in or out, the
   microcontroller-ecosystems slides in 17x or Day 18 (Q1).
2. Two of her slides carry verified errata (GAAT → GATT, Q2; the LPMS
   stop/standby mix-up, Q6) — the book follows the RM; her sign-off
   wanted.
3. passthrough.c and watchdog.c exist only as code-slide text; the real
   files are requested (Q4) but do not block prose.
4. Kit-return day is contradictory between her two decks (Q8) — the Day
   17/18 closes carry a placeholder until she answers.
5. Day 18's wall content is entirely hers to choose (Q7, Q9).

**Cut order** (if a day runs long, in order): Day 17 — the CMD-mode
walkthrough compresses to "the AT commands are in Lab 9 §4.3" (the lab
carries it); then the mode-pin slide compresses the same way; work time
is never cut.  Day 17x optional unit — the stretch (her slide 21), then
the watchdog config detail (slide 19; the demo and reveal stay), then
sleep modes stand alone.  Day 18 — the wrap-up compresses before the
demos do.
