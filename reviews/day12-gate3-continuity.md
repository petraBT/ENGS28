# Day 12 — Gate 3′ — `expert-continuity-auditor`

Reviewed 2026-08-25, on the in-class connecting prose written the same day.
Reviewer had no write tool; report transcribed verbatim by the session that ran it.
**The two BLOCKERs were independently re-verified by that session before being
accepted** — see the note at the end.

**Verdict: BLOCKER**

## Findings

- **[BLOCKER] [P-1 backward reference]** `source/ch-motors.ptx:3438-3442` — the new
  Part 5 prose says `SevenSeg_number()` and "the signed counter that puts a minus
  sign in front of a negative reading" are "from Day 10... `subsec-i2c-ref-ht16k33`
  has that pattern written out." It does not: `source/ch-i2c.ptx:4345-4409`
  ("HT16K33 Quick Reference") contains only the command-byte table, the RAM layout,
  and the page-write note — no signed-counter or minus-sign code at all. The only
  place that pattern is actually written out is `sl-day10-hw-solution`
  (`source/ch-i2c.ptx:3717-3743`), which is `instructor="yes"` and is stripped from
  the student book, deck, PDF and search index per `CLAUDE.md`. Day 12's own prose
  admits the signed counter "was homework and we have not gone over it in class,"
  yet points students at a reference that has nothing there — and Lab 6
  Deliverable 4 requires exactly this negative-rpm display. Fix: write the
  signed-counter/minus-sign pattern into `subsec-i2c-ref-ht16k33` as student-facing
  reference material (or into Day 12's own still-unwritten Reference section), then
  repoint the xref.

- **[BLOCKER] [P-1 backward reference]** `source/ch-motors.ptx:3156-3166,
  3195-3198` — the new prose introduces `SysTick`, `SysTick_Handler`,
  `SysTick->LOAD`, `CTRL`, `CLKSOURCE_Msk`, `TICKINT_Msk`, `ENABLE_Msk` and then
  says "There is no new machinery here at all: this is a timer interrupt, exactly
  like the one you set up on Day 8." Grepping every earlier chapter finds zero hits
  for SysTick outside `ch-motors.ptx`. Day 8
  (`source/ch-timers-interrupts.ptx`) sets up **TIM14** exclusively — its
  objectives (lines 29-46) name TIM14, prescaler/auto-reload, the update flag and
  the NVIC, never SysTick. `delay_ms()` itself was taught on Day 2
  (`source/ch-intro-blinky.ptx:1454`) as a black-box "course-provided function,"
  with no mention of what backs it. So this is the first-ever appearance of a second
  timer peripheral, with its own register block and bit names, presented as
  something students "set up" before — which sends a student who checks Day 8 for
  confirmation to material that isn't there. Fix: say plainly this is a *second*,
  new peripheral, analogous in shape to Day 8's TIM14 (same timer+interrupt+ISR
  pattern) but not the same registers or the same day.

- **[MAJOR] [P-6 ordering, book vs. deck]** `source/ch-motors.ptx:2715-2794` — the
  book's reveal of *why* the pull-up is needed (`fig-photointerrupter-states`, the
  open-drain analogy, the value trade-off) all land **before**
  `table-day12-diagnostics` in reading order. But `assets/decks/day12.json` orders
  the slides `sl-day12-wiring → sl-day12-cabled-sensor → act-day12-wire-and-scope →
  sl-day12-diagnostics → sl-day12-states → sl-day12-pullup-value`, i.e. diagnostics
  *before* the reveal — and `sl-day12-diagnostics`'s own note says so explicitly:
  "Row 1 deliberately says what to CHECK and not why — the why is the reveal two
  slides later." In the book, by the time a reader reaches the diagnostics table the
  reason has already been told three times over, so the deliberate suspense the
  table depends on is gone for anyone reading the page rather than watching the
  deck. Fix: move `table-day12-diagnostics` and its lead-in paragraph to before the
  reveal paragraph/figure in the book, to match the deck's order.

  **DECLINED by the session, with a reason recorded in the slide's note.** The
  deck's order is for the room and is preserved. The book's order — explain, then
  diagnose — is the right one for a reader at a desk, where a "what to check" table
  arriving before the explanation is worse, not better. The P-6 note is about the
  *deck*, and it has been reworded to say so, so the next reviewer does not
  re-report this.

- **[MAJOR] [P-6 ordering, discovery pre-empted]** `source/ch-motors.ptx:2828` —
  `sl-day12-pullup-value`'s first bullet says "Pulled up to 5 V, this line would put
  **5 V on PA15** as soon as you wired it there," naming the pin in Part 2.
  `act-day12-find-the-pin`, the activity that is supposed to be the first place a
  student learns D7 is PA15, does not open until Part 4. The body prose in Part 2
  correctly avoids naming PA15 (it says only "the sensor's signal wire" / "a pin"),
  so this is a slide-only leak — but it directly breaks the stated invariant that
  "nothing states PA15 before the students look it up." Fix: reword to "the sensor's
  pin" and drop the pin name from this slide.

  *(Session note: that bullet was added earlier the same day, to answer Petra's
  "the slide doesn't answer that question currently". The leak is ours, introduced
  while fixing something else.)*

- **[MINOR] [downstream delivery / naming completeness]**
  `source/ch-motors.ptx:3434-3436` — the "what you already have" inventory says
  "`motor_init()` and `motor_speed()` are the driver you wrote on Wednesday,"
  omitting `motor_mode()`. Day 11x taught all three as one driver
  (`source/ch-motors.ptx:2107-2148`: "In Lab 6 you are asked to write three
  functions: `motor_init()`, `motor_mode()` and `motor_speed()`"), and Lab 6
  (`assets/Labs/Lab6_ES28.pdf` p.2) requires all three prototypes in
  `tb6612.h`/`tb6612.c`. A student assembling the Lab 6 build from this sentence
  alone is missing a third of the required driver, including the function that sets
  IN1/IN2 direction that the pseudocode's "map speed to a mode... then call the
  driver" comment relies on. Fix: add `motor_mode()` to the inventory sentence.

## What checked out cleanly

`subsec-day10-pins` open-drain (Day 10) and Day 3 `PUPDR` are correctly taught
before their Day 12 use; `start_conversion()`/`adc_read()`/`ADCPot.c` (Day 7)
predate Day 12; `EXTI_EXTICR4`, `RTSR1`/`FTSR1`, `volatile`,
`counterResetButtonInt.c`, `EXTI4_15_IRQHandler` (Day 9) all predate and match
Day 12's reuse; BSRR appears nowhere in `ch-motors.ptx` (deferred topic still
respected); `act-day12-predict-trace` correctly precedes `fig-day12-wiring` and
`fig-photointerrupter-states`; the two parked slides and `sl-day12-deadband-table`
are confirmed unreferenced by the deck, and their content is not duplicated in body
prose; the RPM derivation Lab 6 needs "from the reading quiz" is present in the
Before Class section (`fig-rpm-formula`).

## Re-verification of the BLOCKERs

Run independently before accepting:

- `awk` over `subsec-i2c-ref-ht16k33` for `sign|minus|negative|counter` — **zero
  hits**; the subsection contains `table-ht16k33-commands` and nothing else of that
  kind. Confirmed.
- `grep -rn "SysTick" source/*.ptx` excluding `ch-motors.ptx` — **zero hits**.
  `ch-timers-interrupts.ptx` names TIM14 in its objectives and never SysTick.
  Confirmed.
- `grep -n "motor_mode" source/ch-motors.ptx` — taught at 2107-2148 in Day 11x,
  absent from the Day 12 inventory. Confirmed.
