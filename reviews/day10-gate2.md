# Gate 2 — Day 10, `sec-i2c-day10` in `source/ch-i2c.ptx`

Day 10 is a section of a chapter, not a chapter. It shares the Reference
section, the figures and the voice of Day 9x, which sits in the same file and
has been through Petra's hand and a full sweep as of 2026-08-08. Day 10 has
not.

---

## 0. Triage of `reviews/day9x-day10-gate2.md` (5 Aug, commit `9b1a75c`)

That report was written against a **50-minute Day 9x and a 65-minute Day 10**.
Commit `1621633` (6 Aug) then moved open-drain, `I2C_TIMINGR`, the five library
operations and `i2c1_byteWrite()` out of Day 9x into Day 10 as Parts 6a/6b/7a/7b,
and commit `a8deb5a` (8 Aug) cut the Arduino material. Day 10 is now 110 minutes.

**So every load, timing and sequencing finding in that report is void for Day 10**
— it was computed against a budget and a neighbour that no longer exist. Its
factual findings mostly survive, and most of them have already been applied.

Each finding below was checked against the file as it stands, not against the
report's own claim about it.

### Findings that are still LIVE

| Finding | Owner | Where it stands now |
| --- | --- | --- |
| `act-i2c-ai-review` is a design AI can complete outright | `learner-ai-reliant` | **Partly applied.** `act-i2c-ai-t0` now demands a stopwatch measurement of the student's own program, and `-t2` requires one criticism justified from their own `PSC`/`ARR`. That is the reviewer's own proposed redesign, so the blocker as written is answered. What is *not* answered: t1, t3 and t4 remain generic code-review prompts, and the five reveal paragraphs are still all findable from the listings alone. Re-judge at Gate 2, do not assume. |
| `act-i2c-five-operations` has one canonical answer | `learner-ai-reliant` | **Partly applied.** `-t1b` now ties the list to the student's own capture. `-t1` and `-t2` are still the outsourceable half. |
| `SevenSeg.c` vs `SevenSegPartial.c` | `expert-continuity-auditor` | **Mostly fixed, one live residue.** The rename instruction now exists in two places — `act-i2c-homework`'s introduction ("rename the pair you just finished … and move both into your `mylib` folder"), and the header comment of `assets/starters/SevenSegPartial.c` itself. So the open question is answered: **the student renames**. What is still wrong is Part 8a, which calls the file `SevenSeg.c` in both the prose and `sl-day10-layers-rule` — 40 minutes *before* the rename happens. Fix Part 8a, not the naming. |
| Day 10 Part 2 has no equipment fallback for a dead display | `expert-class-logistics` / `learner-anxious-nonhardware` | **Live.** Part 2 and `sl-day10-verify` both end at "flag it now rather than at minute 90" — better than "re-seat the wires", but there is still no statement of what flagging gets you. `sl-day10-ladder` does have the S-17 ending. Needs Petra: is there a known-good backpack in the room? |
| Neither day's cut list lives in the chapter itself | `expert-class-logistics` | **Live**, but re-scoped: it is now one presenter note on `sl-day10-ai-gemini`, and that note is stale (see §1). Folded into the re-timing. |

### Findings that are FIXED — verified in the current file

| Finding | Evidence |
| --- | --- |
| BLOCKER: "a powered display lights up" contradicts the HT16K33 reset state | Part 2 now flashes `helloDisplay.c`, which sends the oscillator-on command, so "blank ⇒ wiring" is true as written and no longer contradicts Part 8b. |
| BLOCKER: `fig-segment-map` missing the E and F labels | Redrawn, commit `27b4f33`. |
| BLOCKER: `fig-ht16k33-cmd-table` image 1 lacks the System setup row | Image is now `ht16k33_cmd_pointer_system.png` — pointer *and* system rows. |
| BLOCKER: "20 ticks LOW and 16 HIGH is 10 µs" | Corrected to 9.0 µs with the `t_SCL` footnote. *(Moot for class — Part 6b is cut; the corrected text moves to Reference.)* |
| BLOCKER: "5 V on a signal pin is outside what the chip is rated for" | Claim is gone from the chapter. |
| BLOCKER: the Arduino headers do not carry this course's UART | Reworded to "22 pins in total, and one of those is already committed to the potentiometer". |
| MAJOR: `I2C_TXDR`/`RXDR` cited §23.7.11–12 | Now §23.7.10–11. |
| MAJOR: `RCC_APBENR1` cited §5.4.15 | Now §5.4.13. |
| MAJOR: "NBYTES counts the transfer down" | `fig-i2c-master-tx` caption now says NBYTES *holds* the programmed count. |
| MAJOR: STOP after a NACK attributed to AUTOEND | Part 9 now quotes §23.4.9's unconditional NACK handling instead. |
| MAJOR: `fig-i2c-hardware` "address-match unit" | Caption now says *wake-up on address match*, with the reason we never use it. |
| MAJOR: `fig-display-ram-map` "one per digit, plus the colon" | Caption now says COM0…COM7, eight common lines, of which our display uses five. |
| MAJOR: open-drain has no figure | `fig-open-drain` exists, with a predict beat on `sl-day9x-opendrain` before the reveal. |
| MAJOR: the pull-up value is asserted, not explained | The squeeze-from-both-ends argument is now in Part 6a prose *and* on `sl-day9x-opendrain-more`; `subsec-i2c-ref-opendrain` carries the arithmetic. |
| MAJOR: half brightness depends on a rule only in Reference | The `(7+1)/16` step is now worked on `sl-day10-cmd-answer` and in the Part 4 reveal. |
| MAJOR: "duty cycle" used three times, never defined | Glossed inline in `fig-ht16k33-cmd-table`'s caption. |
| MAJOR: the "no timeout, ever" habit is never generalized | `subsec-i2c-ref-library` now generalizes it and connects it explicitly to the stuck-LOW case. |
| MINOR: the address-conflict failure mode is only in a quiz distractor | Now in the teaching prose. |
| MINOR: "prose says minute 50, slide says minute 48" | Neither string remains. |
| MINOR: `act-i2c-timingr` is proportional extrapolation | `-t5` added the AD2 measurement. *(Moot — Part 6b is cut.)* |
| MINOR: the duplicated 0xE0 address question | Cut; `act-i2c-wrong-address` runs t1, t4, t5, t6. |
| MINOR: `act-i2c-sevenseg-t3` asks for unscaffolded recall | Now points at the student's own `writeFirstDigit.c`. |

### Findings that are VOID

| Finding | Why |
| --- | --- |
| BLOCKER: the `Wire.h` mapping contradicts the chapter's own hang | The Arduino material was cut on 8 Aug. Nothing left to contradict. The whole of `learner-arduino-veteran`'s report goes with it — that agent is retired (`.claude/agents/README.md`). |
| MAJOR: Part 6 is eight-plus new named things in explain-only mode, 8 slides in 7 minutes | Computed against the 50-minute day. **Overtaken by Petra's own instruction**, which removes Part 6b entirely — see §1. |
| MAJOR: Day 10's 65 minutes have no slack | 65 is not the budget. |
| BLOCKER: Day 9x Part 4 stacks four first-time activities | Day 9x, and re-planned since. |
| Everything else scoped to Day 9x | `act-i2c-capture-t2`, `fig-backpack-pins`, `fig-display-wiring`, `fig-waveforms-setup`, `fig-i2c-scope-ack`, the Day 9x ladders, the Day 9x "Equipment:" line. Day 9x has since had Petra's hand pass and a full sweep. Not re-opened here. |

### Still unverified from that report, and still unverified now

- HT16K33 datasheet page numbers ("pp. 24–25", "p. 22") — the datasheet is not
  in the repo.
- The persistence-of-vision beat in Part 3: scan rate, whether the phone-camera
  or wave-it route actually works, and whether any display-to-backpack line is
  reachable once the backpack is seated. The prose is deliberately written to
  assert none of these; the `<!-- OPEN, for Petra -->` comment is still in place.
- Whether the room has a spare display or a known-good backpack.

**One item closed since.** The report could not verify `SevenSegPartial.h`'s
values, and therefore could not verify the Reference note that `SevenSeg_dim()`'s
`HT16K33_DISPLAY_CMD` term adds nothing. `assets/starters/SevenSegPartialORIGINAL.h`
gives `HT16K33_DISPLAY_CMD 0x80` and `HT16K33_BRIGHT_CMD 0xE0`, and
`0x80 | 0xE0 == 0xE0`. The note is correct: the term contributes nothing.
Blink constants check out too — `BLINK_1HZ 0x04` gives B1 B0 = 1 0, so
`0x81 | 0x04 == 0x85`, which is what Part 4's reveal claims.

---

## 1. Structural decisions taken before the committee ran

**Part 6b is cut**, on Petra's instruction of 2026-08-07 recorded in
`plans/week5-revision-9x-10.md` — *"Don't bother with timing settings — those are
way too complex. Focus on the I2C protocol instead."* Item 1 of that same list
(cut Arduino) was applied on 8 Aug; item 2 had not been. Confirmed live before
acting, because it runs against the 5 Aug committee's praise for the PRESC
derivation as the day's best datasheet moment. Her instruction wins; the
derivation is preserved in Reference rather than deleted.

**"Thursday" versus "tomorrow" is not a Day 10 question.** All 19 student-facing
instances are in Day 9x. The schedule, from Petra: Day *n* odd is Tuesday, Day
*n*x is Wednesday, Day *n* even is Thursday, and after an even day the next class
is the following Tuesday. Day 9x is Wednesday, so its "tomorrow" and its
"Thursday" both denote the same real day and both are correct. Day 10's own
forward references were checked against that schedule separately.

<!-- Reviewer reports are appended below, one section per reviewer, verbatim. -->
