# Day 17x — Project work session; sleep modes as the optional unit

**Class length: Wednesday x-hour, 50 minutes** (Nx = Wednesday 50, from
CLAUDE.md's standing facts).  **No pre-class reading** (x-day).

**The default is the work session.**  Petra: last year there was no time
for sleep modes and the x-hour was project time.  The section's
introduction frames the hour as project work; the sleep-modes unit is
built, marked optional, and may go unused.  B-19 discipline applies in
both directions: the work session gets no invented content, and the
optional unit is her deck's lesson, not an expansion of it.

**Objectives (optional unit).**  A student can: name where a CMOS chip's
power goes (static leakage, dynamic switching, dynamic ∝ clock
frequency); name the STM32C031C6's four low-power modes and the
trade-off that deepens with each; put the CPU to sleep with `__WFI()` in
an interrupt-driven main loop; explain what the independent watchdog does
and configure it from her watchdog.c.

**The crucial step (P-2).**  For the day as a work session: every team
moves its project forward with the instructor in the room.  For the
optional unit: seeing, on their own board, the "Hello dog world" message
repeat — a processor that is silently rebooting — and stopping the
reboots by petting the watchdog.

**The stretch (P-3).**  Her slide 21, verbatim: make the dog needier (1 s,
then shorter), and find how needy it can get before the greeting cannot
even print.

**The datasheet moment (P-11).**  Reference Manual chapter 4 (Power
control), Table 20 (which SLEEPDEEP/LPMS values enter which mode) and
Table 19 (what still runs in each mode); Reference Manual §20 for the
IWDG's key values and prescaler.

**Two budgets** (the plan carries both; the instructor picks on the day):

*Default — work session (what the book's introduction frames):*

| min | What happens |
| --- | --- |
| 2 | where things stand: paper design due Friday, demos Thursday; the room works |
| 48 | project work time |

*Optional — the sleep-modes unit runs first.*  Said plainly (Gate 1,
logistics 3): running the full unit converts most of the hour into
instruction, 38 of 50 minutes at Gate 2's rebudget (Part 3's hands-on
was under-budgeted at 9 minutes against the repo's own 10-minute
copy-and-build precedent; it is now 12, funded from Part 4), and the
day is then not a work session in any real sense.  That is the
instructor's trade to make.

| Part | min | Mode | What happens |
| --- | --- | --- | --- |
| — | 2 | — | agenda; the unit is running today |
| 1. Where the power goes | 6 | explain | her slides 4–6: the plain one-liner first (an idle chip still leaks a little; every switch of a transistor costs a little more), then her bullets — static and dynamic power, dynamic ∝ clock, the levers (fewest peripherals, lowest clock, sleep), ST's five-arrow figure.  (3 + 3) |
| 2. The four modes, and how you enter one | 10 | explain | her slides 7–14, against the RM: the clock tree (divide-by-four, not /8) (2); the transit diagram and the four modes qualitatively, off Table 19 — what each keeps running, what wakes it (4); ONE worked entry sequence, Stop mode, corrected against Table 20 — `RCC->APBENR1 \|= RCC_APBENR1_PWREN;`, LPMS stays at its reset 000, SLEEPDEEP in SCB->SCR, `__WFI()`, and the wake half of her slide 13 (an interrupt occurs; clear SLEEPDEEP; back to work); plain Sleep needs no register write at all (2); the processing loop with `__WFI()` (2).  The full LPMS table (Standby 011, Shutdown 1XX) lives in the Reference, not the teaching flow (Gate 1, load 3). |
| 3. The watchdog | 20 | do → explain | her slides 15–20: what it does (3); the quick example on their boards — copy TemplateProject, download watchdog.c, watch "Hello dog world" repeat, then her two conditions by name: press the blue button more often than every 4 seconds, then less often (12; Gate 2 logistics — first-time file on first-time behavior); the reveal in her words (2); the IWDG configuration against RM0490 §20, read off her watchdog.c (3) |
| 4. Stretch, then work time | 12 | do | her slide 21 for the fast, briefed in a sentence and done inside the work time; the room returns to project work |

**Coverage table against her deck** (25 slides):

| Her slide | Where |
| --- | --- |
| 1 title, 2 agenda | deck glue |
| 3 section | deck section slide |
| 4 where does the power go | Part 1 |
| 5 saving power | Part 1 |
| 6 ST modes figure | Part 1 (figure) |
| 7 clock distribution | Part 2 (figure, raw image; the /8 callout dropped — HSIDIV reset is divide-by-four, RM0490 §4.3.2) |
| 8 transit diagram (RM Fig 7) | Part 2 (figure) |
| 9 resources table (RM Table 19) | Part 2 (figure) |
| 10 the four modes | Part 2 (her bullets, which match RM §4.3.2) |
| 11 entering low-power modes (RM Table 20) | Part 2 (figure) |
| 12 PWR_CR1 / SCB_SCR | Part 2 (the two fields the code writes) |
| 13 programming a sleep mode | Part 2 — with the LPMS erratum corrected against Table 20 (Q6) |
| 14 processing loop with sleep | Part 2 (the loop) |
| 15 watchdogs section | Part 3 |
| 16 what does the watchdog do (+ puppy) | Part 3 |
| 17 quick example | Part 3 (the hands-on) |
| 18 what actually happens | Part 3 (the reveal, her words) |
| 19 IWDG configuration | Part 3 |
| 20 watchdog.c | Part 3 (projected whole) |
| 21 super quick modification | Part 4 (the stretch) |
| 22–25 choosing a microcontroller | **pending Q1**: 17x, Day 18's wrap-up, or dropped.  Not in the unit until she says |
| 2 (agenda's "Project work time") | Part 4 / the default session |

**Additions beyond her slides:** none.  The work-session framing is the
day's default per her own ruling; the LPMS correction and the /8 → /4
correction are RM-verified fixes to her material, flagged to her (Q6).

**Book shape** (`ch-power.ptx`, rebuilt): chapter introduction (short —
why power management, and that this unit is taught as time permits in
the final week); one in-class section: the work-session paragraph first,
then the optional unit as Parts 1–4; Reference: the four modes against
Table 19/20, the WFI/WFE pair, the IWDG register recipe.  No Before
Class section, no reading questions.

**Cut order** (inside the optional unit — reordered at Gate 1 so the
demo and its reveal, the unit's own crucial step, survive every stage):
first the stretch (her slide 21); then Part 2's mode-entry detail (the
transit diagram and Table 19 walk compress to the four names and their
trade-off; the RM figures stay in the book); then Part 1 compresses to
its one-liner and the ST figure.  The watchdog demo and reveal are never
cut; if even that does not fit, the unit is not run and the hour is the
work session.

**If Q1 lands the microcontroller slides here** (her 22–25): they take
the stretch's slot plus 4 minutes of Part 4's work time — and note for
her that her 17x slide 23 and her Day 19 "Where to go from here?" are
the same move (Engs 62, Engs 31, CS 51 in both), so Day 18's where-to-go
beat is the natural home at no net cost.
