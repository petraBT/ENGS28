# Week 7 Gate 1 — reviews of the arc and the three lesson plans

Reviewed 2026-08-26, over `plans/week7.md`, `plans/day13.md`, `plans/day13x.md`,
`plans/day14.md`, against `plans/week7-ground-truth.md` and the three decks.
Nine reviewers, every one briefed with the length-budget rule (a fix that adds
content names what it displaces; totals stay 110/50/110). Reports in the order
run: `checker-arc-fidelity` first, then the panel.

Verdict summary:

| Reviewer | Day 13 | Day 13x | Day 14 |
| --- | --- | --- | --- |
| checker-arc-fidelity | PASS WITH CHANGES | PASS WITH CHANGES | **BLOCKER** |
| expert-active-learning | PASS WITH CHANGES | PASS WITH CHANGES | PASS WITH CHANGES |
| expert-cognitive-load | PASS WITH CHANGES | PASS WITH CHANGES | **BLOCKER** |
| expert-continuity-auditor | PASS WITH CHANGES | PASS WITH CHANGES | **BLOCKER** |
| expert-class-logistics | PASS WITH CHANGES | PASS | **BLOCKER** |
| learner-firstgen-novice | PASS WITH CHANGES | **BLOCKER** | PASS WITH CHANGES |
| learner-anxious-nonhardware | **BLOCKER** | PASS | PASS WITH CHANGES |
| expert-rigor-hawk | PASS | PASS WITH CHANGES | PASS WITH CHANGES |
| learner-python-intro | PASS | PASS WITH CHANGES | PASS WITH CHANGES |

Four reviewers independently found the same Day 14 defect: the Part table sums
to 120 minutes against the stated 110, and the checkpoint labeled minute 60 is
really 65. When a finding arrives in four dialects it is not four findings.

---


# checker-arc-fidelity

**Trees**: the three `.pptx` from `assets/ClassSlidesOLD/` read in full with speaker notes, plus `assets/images/Day13-I2C(3)/slide29_c59c860f.png`, `Day14-Accelerometer(2)/slide06_img2.png`, `slide06_img4.png`, `slide17_img1.png`, `slide17_img2.png`, and `assets/Labs/Lab7_ES28.pdf`.

**Headline**: the arc is carried faithfully — the most complete Gate 1 coverage of her decks so far, and both named ordering decisions are correct. But **`plans/day14.md` budgets 120 minutes against a 110-minute class**, and the one slide of hers that carries the week's arithmetic from Wednesday into Thursday (`accel_test.c`, her slide 10) is claimed in the coverage table and funded in no beat.

## The clock

| Plan | Stated length | Rule correct? | Parts actually sum to |
| --- | --- | --- | --- |
| `plans/day13.md` | Tuesday, 110 min | yes | **110** ✓ (checkpoints at 35 and 65 both arithmetically true) |
| `plans/day13x.md` | Wednesday x-hour, 50 min | yes | **50** ✓ |
| `plans/day14.md` | Thursday, 110 min | yes | **120** ✗ — and "checkpoint minute 60" is really minute 65 |

(Per-slide mapping tables for all three days were produced and checked slide by slide; every slide of hers has a home or a ruled drop. Empty slides 18/22/23, duplicate rescue slides 15/25, re-shows 13x/12–13, the Adafruit provenance line (B-11e), and the "hit reset on the Arduino" note (B-11c) are correctly dropped. Reverse direction: no Part exists without an origin in her arc; the three additions — Day 14 Part 3's wiring re-verify, Day 13 Part 6's promotion of captures A/B to a student experiment, Day 13x Part 1's opening commit — all earn their minutes.)

## Findings

**1. [BLOCKER] `plans/day14.md` — the whole Part table.** Parts sum to **120** against a stated and real 110; the "Checkpoint at minute 60" is minute 65. The Day 11 failure with the sign reversed: the overrun will be paid in class out of Parts 8–10, where Lab 7 Deliverable 3 is taught. At 110, **HiTA (10) and the lab-start buffer (8) cannot both exist**: the non-negotiable spine is settle+announce (5) + Parts 2–6 (56) + Parts 7–10 (41) = 102.
**fix (net −13, funding F3 and F6 as well):** make the plan of record HiTA-free — Q4-pending, belongs to no chapter, the plan's own second cut. Drop Part 1 (−10), trim the buffer 8 → 5 (−3), add 3 to Part 5 for F3, move 1 from Part 8 to Part 9 for F6:

| | settle | P0 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | buffer | total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| new | 3 | 2 | 10 | 8 | 17 | **18** | 6 | 12 | **11** | **13** | 5 | **5** | **110** |

Checkpoint moves to **end of Part 5 = minute 58**. State the restore path in one line: *if Petra keeps HiTA (Q4), it takes the buffer (5) and Part 7 drops to 7 — flip and shake only — and the day ends with no slack on the day carrying the crucial step.*

**2. [MAJOR] `plans/day13.md` Part 5 — the NACK that ends every successful read is never named; Part 6 is gated on it.** Her slide 29 is the datasheet's Tables 20–23, and the read pattern ends `... SAK | DATA | NMAK | SP` — the *controller* NACKs the last byte to stop the device sending. So the room's own good capture in Part 4 contains a NACK, and fifteen minutes later Part 6 teaches "NACK after the address = nobody is home." Nothing distinguishes them, and ch-i2c actively predisposes a misread (its NACK prose covers the no-answer NACK and the receiver-couldn't-take-it NACK, never a deliberate end-of-read NACK). Her own slide-16 speaker note shows she expected the room to meet a NACK on this day and be told which kind.
**fix (0 min):** Part 5's existing 10-minute explain gains one named item — *"and the NACK before the STOP: the controller sends it, on purpose, to end the read — the other NACK, the one Part 6 is about to produce, comes from nobody at all."* Widen the never-cut clause to "'address twice' **and** the two kinds of NACK."

**3. [MAJOR] `plans/day14.md` Parts 4–5 — the `accel_test.c` walk (her slide 10) is claimed in the coverage table and budgeted in no beat.** What is lost is not a formality: `accel_x = (ACC_FS * accel_raw.x * MILLI) >> ACC_REGISTERWIDTH` is the single line where Wednesday's arithmetic arrives (week7.md's own hand-off names it); the two CTRL readback printfs are what the diagnostic ladder depends on.
**fix (+3 min, displaced in F1):** Part 5 becomes 18 min with a new opening beat — *"Read `accel_test.c` before you run it: the init check, the two CTRL readbacks (proof the writes landed), and the scaling line — yesterday's #defines in C, with `>>16` where the formula said ÷2¹⁶ (3)."* Note the declared type of `accel_x/y/z` must be settled from the real file (Q2 — 4 × raw × 1000 reaches ±131 M, so `int32_t`).

**4. [MAJOR] `plans/day13x.md` Part 4 — two of her slides in one 2-minute beat, and the byte assembly is in neither.** The final beat carries her slide 17 (auto-increment, §6.1.1 — a P-11 moment) *and* slide 18 (`AccelReadRaw` + struct) in 2 minutes. One step is named nowhere: the six bytes come back **low byte first** — `result->x = ((int16_t)data[1] << 8) | ((int16_t)data[0])`, `OUT_X_L_A` at 0x28, `OUT_X_H_A` at 0x29. Without it, "16-bit left-justified" and "six bytes on the wire" never join up, and Lab 7 D1 asks the student to own that file.
**fix (+2 min, displaced from Part 2, applications 5 → 3 — the plan's own first cut):** Part 4 → 17 min, final beat 4 min, name the byte order. Day total stays 50: 2+1+10+3+12+17+3+2 = 50.

**5. [MINOR] `plans/day13x.md` Part 5 — the control registers are last, unnamed as a re-order, and unprotected.** Her slide 11 sits *before* the data-format section; the plan moves it to the final 3 minutes. Defensible — but not named as a re-order the way Day 13's is, and Part 5 appears in neither the cut list nor the not-cuttable list. It is the sole in-class setup for the homework Day 14 Part 2's commit stands on. End-of-class beats are cut by the clock, not by the plan.
**fix (0 min):** name the re-order and add Part 5 to **not cuttable**, with that reason.

**6. [MINOR] `plans/day14.md` Parts 8/9 — the data-format recap is one beat in the wrong Part.** See R3. Move the 1 minute from Part 8 to the head of Part 9.

**7. [MINOR] `plans/day14.md` STRETCH — `atan2(ax, az)` contradicts her slide and Lab 7.** Her slide 17 (AN-1057 Fig. 7) computes θ = tan⁻¹(Ax/**Ay**); Lab 7 is explicit. Only the stretch says `az`.
**fix (0 min):** stretch reads *"compute θ = atan2(ax, ay) from your own numbers — hold the board upright, like a phone, so gravity lies in the x–y plane"*, which also reconciles it with Part 5's "at rest ≈ +1000 mg on z".

**8. [MINOR] Four one-line corrections, no minutes.**
- day13.md coverage: slides 5–6 claimed as a "60-second resurface in Part 1", but Part 1's beats are 3+3+2 = 8 exactly. Fold the resurface into the first beat and say so, or mark 5–6 reading-only.
- day13x.md coverage: slide 10 claimed as "Part 3, one beat", but Part 3's beats are 3+5+2+2 = 12 exactly. Fold "I2C or SPI; control and data registers; the INT pins we do not use" into the block-diagram beat and say so.
- week7.md consigns "code size" to Reference depth, while day14.md Part 9 teaches it and Lab 7 D4 grades it. Drop "code size" from the week's Reference list; keep IEEE 754 layout and precision-vs-range there.
- day14.md Part 2 says "3.9 mg sensitivity, yesterday's number" while her Table 14, projected in that same beat, prints `So @ ±2g = 4 mg/digit`. One clause: *"the table rounds our derived 3.9 to 4."*

## The three rulings

**R1 — Day 13's moved `memRead` walk: FAITHFUL, and better than hers, with one beat of hers to restore.** She shows memRead twice (slides 12, 17), both framed "Recall:"/"Reminder:" — reference held in front of the room, never a walk; her Digging Deeper comes after the captures anyway. Two things make the move required for us: `i2c1_memRead()`'s code walk is Reference-only in ch-i2c, so this is its first in-class treatment (deepens, not repeats); and P-5/P-15 want the transactions observed before explained. **Not arc destruction.** But her slide 17 has a job the plan does not fill: at the capture moment, the code that produced the trace was on her screen. **fix (0 min):** Part 4's capture beat names `whoami_test.c` and `i2c1_memRead()` as on-screen reference — visible, not walked.

**R2 — Day 13x dropping her slides 12–13: CORRECT (B-8), with one sentence to carry over and one question half-answered.** Slide 12 is a verbatim re-show; the OUT_*_A addresses survive on slides 17/18, which the plan keeps. Slide 13 adds one thing that matters: **"These functions use `i2c.c` and `lsm303agr.h`"** — the layering claim, and Wednesday walks `AccelReadRaw`, the concrete instance of the firmware-layers figure. **fix (0 min):** carry that sentence into Part 4's AccelReadRaw beat. Also: her slide-13 speaker note — *"Have given you the single register read function. You'll write the write function. **Given you skeleton for the init function.** Giving you the readraw function."* — answers half of ground truth Q2 from her own deck: the split is confirmed; only what the skeleton leaves blank *inside* `AccelInit` still needs the file. Record that.

**R3 — Day 14 treating her slide 19 as a one-beat recall: RIGHT SIZE, WRONG PART.** One minute is correct (B-8), but her arc places it between "Looks like we need floating point…" and the float slide — its job is the **integer before-picture for the float recast**. Part 8's trig doesn't need it (`atan2` takes a ratio; Lab 7 says units don't matter). Part 9's cast question is only sharp beside the integer version with its `>>16`. **fix (0 min):** move the beat to the head of Part 9 (Part 8 → 11, Part 9 → 13); Part 8 keeps a clause ("ax and ay are the mg numbers already on your screen — the angle would come out the same from the raw values").

## Checked and correct

Her whole Day 13 spine carried faithfully; AD2 setup named as Day 9x's; `fig-firmware-layers` reused by xref. Day 13x physics and data-format arc intact, collapse staged as her slide 15 draws it. Day 14 driver arc intact; CTRL settings verified against her own Table 14/35 images (ODR 0b0111 = 400 Hz, LPen 0 + HR 0 = normal mode, 10-bit, 4 mg/digit); build-exclusion beat marked never-cut; `%f`-free route taught once with allow L-2. Use-Tuesday/understand-Wednesday preserved — no plan opens on MEMS physics. The wrong-address demo's 0x60 collides with nothing on the bus (accel 0x19, magnetometer 0x1E, HT16K33 0x70), while the stretch's 0x70 question deliberately *will* ACK — a well-chosen pair. Day 13x's "no pre-class reading" matches the standing x-day convention.

## Verdict

| Day | Verdict |
| --- | --- |
| Day 13 | **PASS WITH CHANGES** — F2 and R1's on-screen reference |
| Day 13x | **PASS WITH CHANGES** — F4 (2 min → 4, from applications) and F5 |
| Day 14 | **BLOCKER** — F1: 120 minutes against 110, with F3 funded in the same edit |

week7.md: one line (F8, the code-size consignment).

---

# expert-active-learning

Reviewed against P-5, P-6, P-9, P-15, P-16, P-17, S-2, S-9, S-10. Overall a carefully sequenced week — the deliberate reorder of the `memRead` walk to *after* the capture in Day 13, the staged two's-complement build in Day 13x, and the explicit "no `%f`" L-2 routing in Day 14 all show the arc being protected on purpose. The findings are real gaps, not a rejection of the shape.

## Findings

1. **MAJOR** — `day13x.md`, Part 3 (the sensitivity commit). The commit is meant to be **derived** (range / 2^bits), not read off — but the datasheet-table figure shown for this same beat is a standard ST characteristics table, and every sibling ST datasheet in this family (including lis3dh.pdf) prints sensitivity as its own mg/digit column alongside range and resolution. If the commit-time slide shows the full table, the answer is legible on screen before the student computes anything — the pattern Petra rejected on Day 11 ("read a value off a table … is not an activity", P-17) and the figure-based leak P-15 names. **Fix, no time added**: state at plan level that the commit-time table image must have the sensitivity/mg-per-LSB column masked or cropped; the full table is the reveal.

2. **MAJOR** — `day13.md`, Part 5 ("Digging Deeper"). The row frames all **six** questions as "committed answers first," but the Writing Room section lists only **one** committed question. Five minutes cannot fund six write-then-share cycles. Worse, two of the six ("where is the register address said," "where does the data appear") re-locate values Part 4's capture already had them find — not new intellectual work (P-16's corollary). **Fix, no time added**: name which 1–2 questions get a real S-2 commit (why the address repeats; who ACKs) and fold the two locate-again questions into the 10-minute explain as recap.

3. **MAJOR** — `day14.md`, Part 4 (the RegisterWrite reveal). For a student who did not do Tuesday's paper homework there is no draft to implement *from* and no time to attempt fresh — pure reveal-watching, the "who is doing the intellectual work" failure. **Fix, no time added**: sub-allocate the existing 6 minutes as 2 min silent attempt (against the given `RegisterRead` as a model, paper draft or not) + 4 min reveal.

4. **MAJOR** — `day14.md`, Part 9 (the cast question). Well-designed commit, but the following beat never states the corrected expression or closes the loop on *where* the cast goes — no named landing (S-10/P-6). **Fix, no time added**: within the existing 3-minute beat, name the answer (`(float)raw * 4 / 65536`, and why casting `raw*4` after the fact is too late) before `round()`/the caveat.

5. **MAJOR** — `day14.md`, Part 1 (HiTA). Ten minutes scheduled for an activity whose content and survival are open questions (Q4), counted as committed rather than contingent, with unstated ties to the week's objectives. **Fix, reallocation only**: write Parts 4/5 as the default recipient of those 10 minutes and treat HiTA as an opt-in insert once Petra confirms it, rather than the baseline schedule.

6. **MAJOR** — `day14.md`, Part 2 (the settings commit) — same access gap as Finding 3 on the CTRL_REG1/4 side: depends entirely on the scavenger-hunt reading; no in-class attempt window for a student without it. **Fix, no time added**: reserve ~1 minute inside the existing 4-minute commit as "if you didn't finish, take your best guess from the bit-field table now."

7. **MINOR** — `day13x.md`, Part 1. The predict moment is scaffolded with pictures only, while nearly every student carries a phone with a real accelerometer. **Fix, swap not add**: replace part of the static-diagram time with "pull out your phone's level app and tilt it" as a second concrete route into the same intuition.

## The three decisions, weighed

- **The reading split**: sound. Each day's reading is scoped to avoid pre-answering the day's commits. No change.
- **Where driver-writing lands**: the split is a reasonable "second verse" progression and correctly avoids showing any solution before its matching attempt. Its gap is execution: Findings 3 and 6, both about the reveal when a student's homework attempt doesn't exist.
- **The L-2 float decision**: correctly scoped, IEEE 754 correctly deferred to Reference. Only gap is Finding 4 — the commit needs its answer landed.

## Verdicts

- **Day 13 — PASS WITH CHANGES** (Finding 2).
- **Day 13x — PASS WITH CHANGES** (Findings 1, 7).
- **Day 14 — PASS WITH CHANGES** (Findings 3, 4, 5, 6).

No finding adds net minutes; all are reallocations within existing budgets or slide-content instructions. 110/50/110 stands.

---

# expert-cognitive-load

## Repetition census

**Nothing over two.** The plans already do the de-duplication work correctly: the five-step driver recipe is recalled at Day 13 Part 7 as "second verse," not re-taught; the data-format bit-rows recalled at Day 14 Part 8 as one beat; WHO_AM_I and shared-bus each explained fully exactly once; the CTRL settings attempted once (reading) and derived once (Part 2); her deck's own duplicates (AD2 wiring 13–15/25, memRead walks 12/17) collapsed to one telling each.

## Findings

1. **[BLOCKER] `plans/day14.md`, Activity Sequence total — arithmetic fails the mandatory 110-minute budget.** The stated total line claims 110 but the listed minutes sum to **120**. Even excluding the 8-minute lab-start buffer, Parts 0–10 total 112 — so the buffer isn't a buffer; it's 8 more minutes the day doesn't have, and Parts 4–5 run with zero real slack instead of the slack the plan believes it has. **Fix (cut, not add):** drop Part 1 (HiTA, 10 min) — already provisional pending Q4 — which resolves the deficit exactly and restores the buffer's function. Keeping HiTA is no longer a free provisional add; it is a 10-minute claim against a budget that has none to give.

2. **[MAJOR] `plans/day13x.md`, Part 4 (P-2) — the crucial step's own scaffolding claim isn't instantiated.** The CRUCIAL section promises "the worked example is done together before the committed one is posed alone," but the beats show no distinct worked-together numeric walkthrough — beat 1 teaches the format as rules, beat 3 the formula as symbols, and beat 4 goes straight to the committed attempt. As staged, the first complete raw→mg conversion any student performs is their own. **Fix, no time added:** make beat 2 (the concrete negative reading) explicitly a full worked example — carry that one reading all the way to its mg value together — so beat 4's attempt has a model. If it needs a minute, take it from Part 3's breakout-schematic beat (already marked compressible).

3. **[MAJOR] `plans/day13.md`, Part 5 (P-7, B-8) — three separable ideas stacked in one 10-minute breath, right after a six-question sprint.** The unbroken 10-minute explain bundles (a) the general register-read transfer, (b) the `i2c1_memRead()` code walk, and (c) the datasheet-vs-library discrepancy (true repeated START vs stop-then-start) — the plan's own named hot spot. **Fix, no time added:** split into two labeled beats — the transfer mechanism via the diagram (~4 min), then the code walk *and* the discrepancy as its own beat, since it's the one genuinely new in-class idea (~6 min).

4. **[MAJOR] `plans/day14.md`, Part 4 (P-1) — 9 of 17 minutes committed to content the plan itself calls unverified.** The `AccelInit` sub-beat teaches "what the return value reports" but is provisional until the skeleton arrives (Q2), with an unresolved return-type inconsistency (`int` vs `uint8_t`) across her own decks. No objective promises return-value interpretation. **Fix:** pre-commit a fallback now — if the real skeleton is more than "two writes + a status check," drop the return-value discussion from Part 4 and let Part 5's diagnostic ladder carry it.

5. **[MINOR] `plans/day13.md`, Objective 5 and Part 7 (P-9, B-8) — fading language lags the actual minutes.** Part 7's beats already fade correctly (recall vs new), but Objective 5 reads as if the five-step recipe is freshly taught — a wording risk that could mislead the chapter's drafter into re-teaching it. **Fix:** reword to "recall the five-step recipe (Day 10) and apply it to the LSM303AGR's register table."

## Gate decisions weighed

- **The reading split** — sound. Day 13's reading recalls via xref and excludes the right things; Day 14's scavenger hunt is legitimate commit-before-reveal (P-6), not teaching drifted into the reading.
- **The driver-writing split** — sound, a genuine example of P-9 fading: given whole → written on paper and revealed → derived and completed. No function written twice by two parties.
- **The L-2 float decision** — sound. No `%f`; caveat taught once, marked; IEEE-754 depth deferred to Reference.

## Verdict per day

- **Day 13 — PASS WITH CHANGES** (Findings 3, 5)
- **Day 13x — PASS WITH CHANGES** (Finding 2)
- **Day 14 — BLOCKER** (Finding 1; Finding 4 also applies)

---

# expert-continuity-auditor

Reviewed against `source/ch-i2c.ptx`, `source/ch-uart.ptx`, `source/ch-adc.ptx`, `source/ch-accelerometers.ptx`, `assets/Labs/Lab7_ES28.pdf`, `CHAPTER_PROCESS.md`.

## Findings

**1. [BLOCKER] `plans/day14.md`, Activity sequence — the day is scheduled at 120 minutes, not 110.**
The table's row minutes sum to **120**, but the footer claims 110 — an arithmetic error, not a deliberate over-budget. Every individual Part's internal beat-breakdown is self-consistent, so the error is purely in the grand total. **Fix:** cut 10 minutes using the plan's own cut order — drop the 8-minute lab-start buffer and trim 2 minutes from Part 7's experiment list — and re-total.

**2. [MAJOR] `plans/day13x.md`, CRUCIAL step and Part 4 — "two's complement resurfaced" assumes teaching that does not exist anywhere before Week 7.**
Grepped `source/ch-*.ptx` in full: "two's complement" occurs nowhere before the untrusted rough draft. The only candidate prior teaching — Day 10's signed-counter homework (`act-i2c-hw-t2`) — uses `int`, `abs()`, and a printed minus sign; it never explains the bit-level encoding. No chapter ever does. Day 13x budgets 3 minutes to "resurface" this, inside a day self-described as the densest of the week. This is the CRUCIAL step's own foundation and load-bearing for Lab 7 D3/D4 (tilt sign, negative angles). A 3-minute "resurface" of a concept nobody has met is a P-1 gap, not a recall.
**Displacement, named:** compress Part 2's applications to three examples (2 min) and Part 3's breakout-schematic beat to one sentence (~1–2 min); reallocate into Part 4 so the two's-complement beat runs ~6–7 minutes as a first teaching (e.g., a 4-bit worked contrast of +2/−2).

**3. [MAJOR] `plans/day13.md` — "D0"/"D1" for the AD2's digital channels is a naming drift from the established "DIO0"/"DIO1," and collides with two other established meanings.**
`ch-i2c.ptx`'s Day 9x Part 3c consistently writes "DIO0 (pink) to SDA, DIO1 (green) to SCL," never "D0/D1." Meanwhile "D0"/"D1" already name the Arduino-header pin series (PB9/PB8 = "D14 and D15") and UART data-bit numbering ("D7 down to D0" in ch-uart). **Fix:** rename to "DIO0"/"DIO1" in day13.md's objectives and Part 4. Zero cost. (Her deck's own slides say "D0 (pink)/D1 (green)" — the book's established DIO naming wins for consistency; the wire colors agree either way.)

**4. [MAJOR] `plans/week7-ground-truth.md` §5 and `plans/day13.md` Part 3 mischaracterize `i2c1_memRead()` as Reference-only, which weakens Part 5's "genuine question" framing.**
Source check: the prototype *and* the stop-then-start behavioral fact ("worth knowing before you meet a bus with two") are stated **in-class** in `subsec-day10-library` ("Part 7a: What an I2C Library Has to Provide"), paired with slides. Only the register-level *code walk* is Reference-only (`subsec-i2c-ref-library`). So Day 13 slide 24's "why does the address go out twice?" was already answered in-class on Day 10 — Day 13 is verifying a stated fact on a live trace, not discovering it.
**Fix:** retarget the citation to Day 10 Part 7a (in-class) and reframe Part 5 as "recall Part 7a's warning, now confirm it on your own trace" rather than fresh discovery. This shortens rather than lengthens Part 5.

**5. [MINOR] `plans/week7.md` L-2 decision — the `%f`-unsupported caveat was already taught on Day 5.**
`ch-uart.ptx` already teaches in-class, with a slide and `allow L-2` marker: "`%f` is not supported… convert to integer first." Day 14 adds something real (`round()` in place of Day 5's truncating cast) — name that as the delta and cite Day 5 (B-8), rather than implying first-time teaching of the caveat.
**Fix:** one clause in day14.md Part 9 ("recall Day 5's no-`%f` rule; the new piece is `round()` instead of truncation") — no time cost.

**6. [MINOR] `plans/day13x.md` Part 3 doesn't credit Day 7's identical derivation.**
`ch-adc.ptx` already teaches "1 LSB = V_ref/2^B" — the same range/2^bits reasoning. A one-line callback ("same idea as the ADC's LSB") would strengthen the P-11 thread and could shorten the commit beat.

## Verdicts

- **Day 13** — PASS WITH CHANGES (findings 3, 4: citation/naming fixes, zero budget impact)
- **Day 13x** — PASS WITH CHANGES (finding 2 MAJOR with reallocation already in the plan's own cut order; finding 6 MINOR)
- **Day 14** — BLOCKER (finding 1: does not fit a 110-minute Thursday; finding 5 MINOR)

---

# expert-class-logistics

## Time-budget check (arithmetic, before any findings)

**Day 13** (target 110): Table total = 3+2+8+22+6+24+15+15+12+3 = **110**. ✓. Every Part's internal beats also sum correctly. Checkpoint at minute 35 = 3+2+8+22 ✓. Checkpoint at minute 65 = 35+6+24 ✓. **Day 13's arithmetic is sound throughout.**

**Day 13x** (target 50): Table total = 2+1+10+5+12+15+3+2 = **50**. ✓. All Part-internal beats check out (Part 1: 3+4+3=10; Part 3: 3+5+2+2=12; Part 4: 3+3+3+4+2=15). **Sound throughout.**

**Day 14** (target 110): Table total as *listed* = 3+2+10+10+8+17+15+6+12+12+12+5+8 = **120**, not the 110 the plan asserts. The stated checkpoint — "minute 60 (end of Part 5)" — is also wrong on the plan's own numbers: cumulative through Part 5 = 3+2+10+10+8+17+15 = **65**, not 60. Both errors point the same direction, consistent with Part 1 (HiTA, 10 min) having been inserted as "provisional" without any compensating cut — the same class of error the brief warned about (Day 9's 19-vs-18), just larger. **Day 14's schedule does not fit its own class length even in the zero-slippage case.**

Predicted real-world landing for Day 14: Parts 4–5 are the likeliest to run over; the class will realistically finish Part 7 or partway into Part 8 at the bell. Part 9 (floating point — "never cut," load-bearing for Lab 7 D3/D4), Part 10, and the lab-start buffer are the parts actually at risk, not the ones the cut order protects.

## Findings

**1. [BLOCKER] `plans/day14.md`, whole-table arithmetic — the day does not fit in 110 minutes even ideally.**
The listed Part minutes sum to 120, not 110, and the checkpoint label is off by 5 against the plan's own numbers (real cumulative = 65). Likely cause: Part 1 (HiTA, 10 min, "provisional") added without displacing anything. Even if Petra cuts HiTA (literal total back to 110), the day has **zero built-in slack** beyond the single 8-minute lab-start buffer, which exists to absorb Parts 4–5 overrun. If she keeps HiTA, the class is 10 minutes over before any real-world friction.
**Displacement (mandatory):** if HiTA stays, state now where its 10 minutes come from. Recommend: Part 7's plotting experiments compressed to flip-and-shake only (≈6 min, already in week7.md's cut order) plus Part 2's reveal trimmed to stating the two byte values without re-deriving what the pair selects (Day 13x already taught the sensitivity number — ≈4 min).

**2. [BLOCKER] `plans/day14.md` Part 3 / crucial-step scaffolding — a student whose Day 13 wiring never worked has no real second chance.**
Part 3 correctly *diagnoses* a still-broken setup, but the only named rescue is the minute-60 checkpoint's completed driver file — which fixes a **software** problem. It does nothing for a bad breakout, a bad connector, or a mis-seat the Day 13 re-seat didn't catch; the ladder's "hardware → re-seat against the photo" has no next rung when re-seating doesn't fix it. This is the population the week's own risk analysis flags as costliest.
**Fix (no minutes added):** name a concrete hardware fallback available during Parts 3–5's existing worktime — spare pre-wired breakouts, or a standing rule that a second re-seat failure gets immediate priority triage rather than waiting for the checkpoint.

**3. [MAJOR] `plans/day14.md` Part 3 — the "exclude a file from the build" step has no self-diagnosis text for its failure mode.**
The two-`main()` linker error is one "no student has seen before," and nothing projected maps that error message to its fix. Every student who forgets the exclusion needs one-on-one help at the exact moment Parts 4–5 need the instructor most.
**Fix (no minutes added):** one displayed line in the existing 5-minute beat — "if the build fails with `multiple definition of 'main'`, you skipped the exclude step; here's the menu path" (P-14).

**4. [MAJOR] `plans/day13.md` Part 6 — the single-shot arm-trigger-then-reset capture has no rescue for the base capture, only for its stretch tier.**
Part 4's correct-case capture has a stated fallback (projected capture). Part 6's wrong-address capture is harder — arm a single sweep, then physically reset to catch a transaction that will not repeat — and this choreography is new. At 7 minutes for a room of 30, first-attempt misses are likely, and the cut order only drops the *stretch tier* (capture B); no fallback exists for students who fail capture A itself.
**Fix (no minutes added):** extend the same "projected capture as rescue" to Part 6's capture A.

**5. [MAJOR] `plans/day13.md` Part 2 — no stretch for fast finishers during the day's 22-minute hands-on bottleneck.**
Part 2 will show real variance across 30 laptops; the only named STRETCH lives inside Part 6, near the end of class.
**Fix (no minutes added, pure reorder):** let early finishers begin Part 4's D0/D1/GND analyzer wiring immediately — already-scheduled content that does not depend on Part 3's explanation.

**6. [MINOR] `plans/day14.md` Part 1 / `plans/week7.md` cut order — HiTA's "provisional" framing understates that it is not free bonus content but the exact size of the table's shortfall.**
Given Finding 1, HiTA is the entire discrepancy. The decision needs to be made concrete now (see Finding 1's displacement), not resolved live in front of 30 students.

## Weighing the three named Gate 1 decisions

- **Reading split**: sound in principle, but its 10-minute Day 14 Part 2 budget assumes full reading compliance. With negative slack (Finding 1), a meaningful fraction arriving without the scavenger hunt done expands Part 2 and compounds the deficit — worth one acknowledging line.
- **Driver-writing split**: well-designed pacing, fully dependent on Day 13's homework happening. If it didn't, Part 4's 17 minutes is a from-scratch budget needing closer to 30. Add one line to the cut order ("if the room visibly did not do the paper homework, treat Part 4 as needing its full displacement buffer").
- **L-2 float decision**: pedagogically clean and correctly never-cuttable — but its protection is undermined by Finding 1: a "never cut" Part at position 9 of 10 in a table 10 minutes short is protected by arithmetic, not by a list.

## Verdicts

- **Day 13: PASS WITH CHANGES** — arithmetic sound, crucial-step scaffolding good; fix Findings 4 and 5.
- **Day 13x: PASS** — arithmetic sound, cut order realistic, no findings.
- **Day 14: BLOCKER** — the table sums to 120 vs. 110 with a mislabeled checkpoint, and the stated rescue does not cover the highest-risk population (a Day-13 hardware failure carried forward).

---

# learner-firstgen-novice

### Verdict per day (headline)

- **Day 13 — PASS WITH CHANGES**
- **Day 13x — BLOCKER**
- **Day 14 — PASS WITH CHANGES**

### Findings

1. **[BLOCKER] `day13x.md` Part 1 (physics, min 3–13) — the day's opening move assumes a physics course I may not have taken, and gives itself no room to notice if I'm lost.**
   The sentence that loses me: *"Then kx = ma → a = (k/m)x: measure displacement, get acceleration; three copies for three axes (4)."* Four minutes to (a) recall Hooke's law, (b) recall Newton's second law, (c) combine them, (d) generalize to 3 axes — as a `room="yes"` public commit *before* any of that is derived. `week7.md`'s own table names the risk and doesn't resolve it: *"Inherits from … Phys 13/Engs 22 mass-spring intuition"* — inherited from courses this document never confirms are required. Worse, this is the one day of the week the plan explicitly declines to build in a rescue: *"This is the densest 50 minutes of the week — all concepts, no rescue time needed (nothing is wired today...)"* (day13x.md, cut-order note). That's true for hardware rescue; it is not true for conceptual rescue, and none exists here — Day 13x has no checkpoint at all, unlike Day 13 (min 35, min 65) and Day 14 (min 60). If I freeze on the very first public prediction of the day, I have 40 more minutes of capacitance/datasheet/data-format material built on the thing I just silently didn't get.
   **Fix, budget-neutral:** confirm at Gate 1 whether Phys 13/Engs 22 is an actual prerequisite/corequisite for ENGS 28 (not just "usually already taken"). If it isn't guaranteed, spend 2 more minutes deriving `kx = ma` explicitly from F=ma and F=kx as two separate, named facts before combining them — sourced from the plan's own already-identified 2-minute cut (day13x.md cut order: *"Part 2 to three examples (2 min)"*). Net time unchanged at 50. Rules: P-1, P-7, P-2.

2. **[MAJOR] `day13.md` Part 1 / `week7.md` reading split — "STEMMA QT breakout" is load-bearing vocabulary for the week's first physical action, and it is never defined in student terms.**
   Day 13 Objective 1 hands me a color code (*"red → 3.3 V, black → GND, yellow → SCL/PB8, blue → SDA/PB9"*) with no sentence anywhere saying what a breakout board *is* (a small board carrying the chip plus the pull-ups/regulator it needs) or what makes STEMMA QT different from breadboard wiring (it's keyed — the plug only goes in one way, so I cannot wire it backwards). That last fact is actually reassuring and costs one sentence, but as written I have to infer it. WHO_AM_I, by contrast, is handled correctly — the reading explicitly promises "why such a register exists."
   **Fix:** add one clause to the Day 13 pre-class reading, e.g. *"a breakout board — a small board that carries the chip and the extra parts (pull-ups, a regulator) it needs — connected here by a STEMMA QT cable, a 4-wire keyed plug that only fits one way, so it can't be wired backwards."* Reading text, not class time — **no displacement against the 110-minute budget.** Rules: P-1, P-4.

3. **[MAJOR] `day14.md` Part 1 — the HiTA water-bottle activity has no accountability structure, and it's the exact shape of activity where I go quiet.**
   Unstructured group work, at minute 5 of the day, before any individual-work commit has established that everyone's voice counts. Nothing gives me a role, a sub-question that's mine alone, or a report-out mechanism — contrast with every other group moment this week, which is a `room="yes"` *individual* commit first. If my group has two people who've built circuits since middle school, I can sit silent for 10 minutes and no mechanism would catch it. Already flagged provisional (Q4) with a destination for its minutes.
   **Fix:** don't wait for a time-overrun to trigger this cut — the equity risk is a reason to cut proactively, independent of pacing. If Petra wants it kept, add a 1-minute individual step before the group starts ("write down one guess for a sensor and one for an actuator on your own"), inside the same 10 minutes — no new displacement. Rules: P-2, B-5.

4. **[MINOR] `day13x.md` Part 4 vs. `day13.md` Objectives 4–5 — "subaddress" and "register address" name the same thing and are never welded together.**
   Day 13 teaches "register address" as vocabulary; Day 13x Part 4 then introduces "subaddress" for the identical concept with no connecting sentence. Since "address" already does double duty this week, a silent third term invites quiet confusion.
   **Fix, zero cost:** Day 13x Part 4 opens with *"the register address — the datasheet's own word for it is subaddress —"* instead of introducing "subaddress" cold. Rules: P-1, P-7.

5. **[MINOR] `day14.md` Part 4 — the crucial step's timing rests on an unverified file, inside a window the plan calls uncuttable.**
   `AccelInit`'s 9-minute allocation is annotated provisional until the real `lsm303agr_partial.c` arrives (Q2). If the real file needs more scaffolding, there's no slack without breaking the plan's own "never cut" rule — Parts 4+5 already sum to 32 of the 110 minutes.
   **Fix:** treat this specifically as re-check-before-Gate-2: re-time Part 4 against the real file before committing the 17-minute figure.

6. **[MINOR] `day14.md` Part 9 — "FPU" is used before it's unpacked.**
   **Fix:** *"no FPU — no dedicated hardware circuit for float math — so it's done in software instead: slower and bigger in flash."* Same sentence, same 3-minute beat, no displacement. Rule: P-1.

### Weighing the three named gate decisions

- **Reading split** — sound in principle (holding back MEMS internals, the 0x19 derivation, and the trace walkthrough for the day they're needed is P-1 working correctly). The one gap is Finding 2: it holds back the *right* things but never lands the STEMMA/breakout vocabulary it does introduce.
- **Driver-writing split** — sound as designed, and the "my paper RegisterWrite is wrong and everyone else's works" risk is well handled: explicitly ungraded, the reveal hands the one-line correct answer immediately, the minute-60 checkpoint is a real safety net. Only reservation is Finding 5 — the split's *timing*, not its shape, is provisional.
- **L-2 float route** — sound and well-scaffolded: the cast question is committed on paper before the reveal, `%f` avoided entirely, IEEE 754 depth correctly deferred to Reference. No finding beyond the FPU wording nit.

---

# learner-anxious-nonhardware

I walked all three plans against `AUTHORING-book.md`, with `plans/week7-ground-truth.md` §1/§2a/§5/§8/§9 open beside them. Six findings, most damaging first, then a verdict per day.

**1. [BLOCKER] `plans/day13.md`, Parts 4–5 — the "does not fail closed" claim breaks exactly where it matters most.**

The plan states: *"A student whose WHOAMI never succeeds still does Part 4 — their capture shows the address and a NACK... The activity does not fail closed."* True as far as it goes — but Part 5 ("Digging Deeper," 15 min) runs its six questions *"against the room's own traces."* A NACK-only capture (one transaction, no ACK, no register phase, no returned byte) cannot answer four of those six questions — who ACKs, why the address goes out twice, where the register address sits, where 0x33 appears. The only stated rescue is the minute-65 checkpoint, and its own wording — *"a student who cannot get a sweep marks the projected capture instead"* — is about failing to trigger the analyzer, not about a sensor that never answers. A student whose board never says "Accelerometer initialized!" *does* get a sweep; it's just the wrong one. Nothing hands that student a working trace to reason from in Part 5, and nothing in Day 13 or Day 14 ever gives them a path back to their own working hardware — the Day 14 diagnostic ladder repeats the identical remedy ("re-seat against the photo") with no next step if re-seating isn't the problem. If my breakout is simply bad, I have no way to know that, and no way out of it, for the rest of the week. This is the "what do I do when nothing happens" wall by name (P-14), and it undercuts the crucial step's own language — "every student's board" (P-2). **Fix:** name a spare-breakout swap as the next rung of the minute-35 rescue (not new class time — it belongs beside the existing "hardware-vs-software" split), and say explicitly that a NACK-only student uses the projected/neighbor's trace for Part 5, not just for the Part 4 capture itself.

**2. [BLOCKER] `plans/day13.md`, Part 6 — the freeze is never named as the success state before it happens.**

Ground truth §2a is fairly confident the library hangs on a NACK, and the plan is right not to assert this in student-facing text before Petra confirms (B-11c). But that caution has a side effect: nothing in Part 6's task description tells the student, going in, that a frozen screen and no printed error is what they're supposed to see. The writing-room note even flags that *"most will predict a clean error message"* — meaning the actual result (nothing, ever, until reset) will look like a bigger failure than what they braced for. The plan's only correction is a *debrief*, which comes after the 7-minute capture beat, not before it. For a student whose whole failure mode is "stop touching it and wait," seven minutes of an unresponsive board with no in-the-moment cue is the single worst-designed minute of the week, regardless of which way Q3 resolves. **Fix:** whichever way Q3 lands, add one spoken line to the Part 6 task, before the capture runs — "if nothing happens on your screen, that's expected here; wait for the reset cue" — worded to be true either way (hang or repeating error). No new time: it's a sentence inside the existing 4-minute predict beat.

**3. [MAJOR] `plans/day14.md`, Part 2 — the day opens on a reading-dependent commit with no recap of what the reading established.**

Objective 1 is "derive the CTRL_REG1/4 settings," and Part 2's first beat is a graded-feeling commit — *"what byte goes in CTRL_REG1_A? In CTRL_REG4_A?"* — built entirely on the previous night's datasheet scavenger hunt. The bit-field tables themselves don't appear until the *reveal*, six minutes later. A student who found the reading hard arrives at the commit with nothing to work from and nothing to write in the `room="yes"` box. This is the one place in the whole week the class opens by building straight on the reading without restating it. **Fix, DISPLACES 1 minute from Part 1:** show the CTRL_REG1/4 bit-field table for ~60 seconds immediately before the commit, not only in the reveal. Part 1 (the HiTA activity) is already first in the week's own cut order and explicitly provisional pending Q4 — take the minute from there.

**4. [MAJOR] `plans/day14.md`, crucial-step scaffolding — the minute-60 checkpoint hands over a finished driver with no plan for how that reads to the room, or to the student.**

*"A student not yet streaming gets the completed driver file and rejoins"* protects a grade, not a feeling. Being handed the answer program is the most visible "I couldn't do it" moment in the week, on the day whose crucial step is explicitly *"every student's own completed driver."* The plan doesn't say whether the handoff is quiet or announced, and doesn't reconcile "their own" against the objective's wording. Day 13's equivalent rescue is framed around *shared* data ("the decoded values are the same by construction") — that framing is available here and isn't used. **Fix (no time cost, procedural line):** state that the file is handed one-to-one, not announced, and that the student still runs their own board with it through the rest of Part 5–7's tests, so they still personally see +1000 mg and the sign flip — they just don't personally own the four lines of write logic. Say that plainly in the plan so it survives into the book's instructor notes.

**5. [MAJOR] No plan in the week states a safety line before wiring, and the breakout's tolerance is asserted nowhere but also never flagged as a real open question.**

Day 13 Objective 1 gives the STEMMA wiring with no accompanying line about what is or isn't safe to get wrong — not "the connector is keyed," not "reversing these wires can/cannot damage the board." Ground truth §8 independently flags that her slides say "3.3V–5V" on the breakout's power pin and that tolerance can be stated only against the datasheet/schematic — genuinely unresolved. Yet §9's eight questions for Petra don't include it. For a reader whose stated fear is board damage, silence reads as "nobody thought about this," which is worse than an honest "we don't know yet." **Fix (no time cost):** add a Q9 to `week7-ground-truth.md` §9 asking directly whether a miswired STEMMA connection (reversed power, swapped SDA/SCL) can damage the breakout or the Nucleo, and add one sentence to Day 13 Part 2 stating the answer plainly once known — or, if unconfirmed at drafting time, an explicit interim line that the connector's keying prevents reversal (true of STEMMA QT/JST-SH hardware generally, but verify against the schematic before asserting it, per B-11c).

**6. [MINOR] `plans/day13.md`, Part 1 — the promised refresher has no slot.**

The coverage table says the I2C protocol review gets *"a 60-second resurface in Part 1,"* but Part 1's own beat breakdown is 3+3+2=8 with no line for it (S-8). **Fix (no displacement):** fold the resurface into the existing "device, in one look" beat and say so.

### The three named gate decisions, weighed

- **The reading split** — sound in principle (B-2 respected, forward references correctly excluded) but its Day 14 half is where finding 3 lives: the split assumes the commit can run cold off the reading, and it can't for this reader.
- **Where the driver-writing lands** — no objection. The paper-then-reveal structure doesn't put an individual student on the spot; the reveal is room-wide, which is the right shape.
- **The L-2 floating-point decision** — no objection. Taught once, marked, no `%f` anywhere; the cast-question commit gives a concrete number rather than an abstraction.

### Verdicts

- **Day 13 — BLOCKER.** Findings 1, 2, 5, 6 land here; 1 and 2 are structural.
- **Day 13x — PASS.** No hardware wired; the week's one genuinely safe re-entry point; no findings specific to this day.
- **Day 14 — PASS WITH CHANGES.** Findings 3 and 4 — one is a one-minute fix borrowed from an already-cuttable activity, the other a framing sentence.

---

# expert-rigor-hawk

### Verdict per day: Day 13 — PASS · Day 13x — PASS WITH CHANGES · Day 14 — PASS WITH CHANGES

Scope: data-format (Day 13x Part 4), trig (Day 14 Part 8), float (Day 14 Part 9). Day 13 has no material in this scope.

### Findings

**1. [MAJOR] `plans/day13x.md` Part 4 — the collapse is exact; the driver's runtime arithmetic is not, and the gap is never named.**
The staged derivation is sound: the padding bits are exactly zero, so `(raw ≫ k)·FS/2^(16−k) = FS·raw/2¹⁶` is *algebraically exact* — "the zeros make it so" earns itself. But `accel_test.c` computes `(ACC_FS * raw * MILLI) >> ACC_REGISTERWIDTH` — it multiplies by 4000 (not a power of two) *before* shifting 16, so the shift performs genuine truncation, and because `raw` can be negative it is an **arithmetic (floor) shift**: it rounds toward −∞, not toward zero the way a calculator's division would. For negative readings the two methods can differ by up to 1 mg. A student who hand-verifies a flipped-board reading can get a value one mg different from CoolTerm's with no explanation available anywhere. This belongs in the chapter's **Reference section** (the Day 12 lesson): `>>` on a signed value is an arithmetic (sign-extending, floor) shift on this toolchain, not interchangeable with `/` for negative operands. **Displacement: none — Reference addition, 0 class minutes.**

**2. [MAJOR] `plans/day14.md` — Part 8 and the STRETCH silently disagree on which two axes give tilt.**
Part 8 teaches θ = arctangent of ax/ay, matching her slide and Lab 7's atan2(Ax, Ay). The STRETCH asks fast finishers to "compute θ = atan2(ax, az)" — a different axis pair, contradicting Part 8 and the lab. If `az` survives into chapter prose it plants a wrong axis pair Lab 7 D3 will contradict. **Fix:** change the STRETCH to `atan2(ax, ay)`. **Displacement: none — one token.**

**3. [MAJOR] `plans/day14.md` Part 8 — the single-axis sensitivity claim states the verdict, not the mechanism, while Objective 5 promises the "why."**
"Sensitive at 0°, useless at 90°" is a label. The mechanism is one sentence and fits the same 4-minute budget: *Aₓ = g sin θ flattens as θ→90° — its slope, g cos θ, goes to zero there — so fixed sensor noise barely moves θ near 0° but can swing the computed angle by tens of degrees near 90°.* That is AN-1057's actual argument, in algebra the course already has. **Fix:** the beat carries the mechanism instead of the label. **Displacement: none — same 4 minutes, different sentence.**

**4. [MAJOR] `plans/day13x.md` Part 3 — the derived sensitivity (3.9 mg via 4 g/2¹⁰) is asserted as the datasheet's own number, and that identity is unverified.**
Manufacturer tables routinely round to marketing figures ("4 mg/LSB," not 3.90625) that don't equal the naive quantization formula bit-for-bit, and the LSM303AGR datasheet is not in the repo (Q1). If the numbers don't match exactly, the chapter's flagship P-11 moment fails contact with its own reference. **Fix, no new time:** when the PDF lands, reconcile explicitly — if the table rounds, teach the rounding in the same reveal ("close to, but not exactly, the table's rounded value, because the table rounds"). **Displacement: none — a clause contingent on the datasheet arriving.**

**5. [MINOR] `plans/day13x.md` Part 3 — the sensitivity derivation never names its ancestor: the ADC's LSB = Vref/2^N, taught Day 7.**
One clause turns "a formula to memorize" into "a formula you already have." **Displacement: none.**

**6. [MINOR] `plans/week7.md` — the deferred float claim ("int32_t more precision, float more dynamic range") needs a precise landing in Reference, not her slide's bare dichotomy.**
The defensible version: `int32_t` is *exact* over its full ±2³¹ range, while `float` carries ~24 significant bits of relative precision (~7 decimal digits) but an exponent spanning ~10⁻³⁸ to 10³⁸ — precision and range traded against the same 32 bits, not two free lunches. Flag now so the Reference draft doesn't inherit the slide's imprecision verbatim. **Displacement: none — wording guidance.**

**7. [MINOR] `plans/day13x.md` Part 4 — the committed paper conversion's sign is unspecified.**
The staging (unsigned→signed→general) is the right call, but the plan doesn't say whether the final **committed** exercise uses a negative raw value. The committed record should be the case that actually tests the sign — not a positive-only instance that lets "shift just chops off bits" pass unnoticed until Thursday's flip test. **Fix:** specify the committed raw value is negative. **Displacement: none.**

---

# learner-python-intro

### Findings

**1. [MAJOR] `plans/day13x.md`, Part 4, first 3-min beat ("Two's complement resurfaced on a concrete negative reading") — the beat is scoped as *review* of something this student never actually processed.**

The plan's own scaffolding note calls this a "resurfacing." Checking what it resurfaces: the only prior two's-complement touchpoint is `ch-i2c.ptx`'s Day 10 stretch task (`act-i2c-hw-t2`, "8-bit signed counter"), and that task routes students *around* the representation — `abs()` before display, explicitly to avoid decoding a negative bit pattern. No source file anywhere before Week 7 shows a student converting a raw two's-complement bit pattern to a signed decimal value. So for a meaningful fraction of the room, this is first contact, not review, and 3 minutes is scoped for the wrong task.

For the beat to actually work it needs two things the plan doesn't currently name: (a) the sign-bit-as-weight rule stated as a sentence — bit 15 is worth −2¹⁵, not +2¹⁵, which is the one fact that lets "left-justified" and "two's complement" compose instead of collide — and (b) one fully worked hex example done on the board, not asserted verbally: e.g. `0xC000` → `1100 0000 0000 0000` → bit 15 set → negative → unsigned value 49152 → 49152 − 65536 = −16384 → through the day's own formula, −500 mg. That last step also hands the beat a concrete landing point that ties directly to "flip-the-board-over is tomorrow's test," which the plan currently only gestures at.

Displacement: if the beat needs 5 minutes instead of 3, the day's own cut order already names the source — "Part 2 to three examples (2 min)" is listed first in `day13x.md`'s cut order. Take those 2 minutes there; the 50-minute total is unaffected.

**2. [MAJOR] `plans/day13x.md`, Part 4 — the "unsigned first, then sign, then formula" staging promised in the Crucial-step section does not match the beats in the Activity-sequence table.**

The scaffolding prose says: "first unsigned and 8-bit (one byte, top of the word, shift and scale), then the sign… then the general formula. Nobody meets left-justification, sign, and scaling in the same breath." But the timed beats show no single-byte, unsigned-only step — the first 3-minute beat goes straight to "her three bit-row pictures," which is all three resolution modes (8/10/12-bit) at once, i.e., the multi-mode complexity the prose says is deferred is actually presented first. Left-justification, three simultaneous modes, and the label "two's complement" are named together in beat one; the sign is only unpacked in beat two. Either the promised single-mode/unsigned-first step is missing from the table, or the prose oversells staging that isn't there — this needs reconciling before Gate 2, since P-2's density requirement is being asserted, not shown.

No displacement needed: this is a sequencing fix inside the existing 15-minute Part 4 budget, not new content.

**3. [MAJOR] `plans/day13x.md`, Part 4, final 2-min beat (`AccelReadRaw()` "read as the five lines that do exactly that") — byte assembly is new and is glossed under auto-increment's time budget.**

Checked: the idiom `(int16_t)(data[1] << 8) | data[0]` (or equivalent) appears nowhere before this week — grepped `ch-i2c.ptx` and every earlier chapter for `int16_t`/shift-and-OR byte combination; nothing. The register-bit idioms students *have* seen (`GPIOx->PUPDR |= (1U<<8)`, `0x28 | (1<<7)`) all set or clear a bit inside one already-sized register — they never concatenate two independent 8-bit array elements into one wider signed value. That's a different operation, and the plan's 2-minute beat spends its time on the auto-increment address bit (`0x28 | (1<<7)`, a familiar pattern) while treating the byte-assembly line as one of "five lines" with no dedicated unpacking of why the cast wraps only the shift, or why `<<`/`|` compose to build a 16-bit word from two bytes.

Because `AccelReadRaw` is *given* code (P-16), students are not asked to write this, only to read it — but Day 14 Part 5 has them running and trusting its output for the crucial step, and a curious student inspecting the file after Part 4's driver-writing work will hit this line with zero prior explanation.

Displacement: +2 minutes to split "auto-increment" from "byte assembly" as two distinct sub-beats. Combined with Finding 1's +2 minutes, this draws on the day's own cut order's first *two* items — Part 2 trimmed to three examples (2 min) and Part 3's breakout-schematic beat compressed to one sentence (2 min) — both already named in `day13x.md`'s cut order, so the two additions net to zero against the 50-minute total.

**4. [MAJOR] `plans/day14.md`, Part 9 ("The cast question, committed: `raw * 4 / 65536` — where must the `(float)` go, and why?") — posed without re-establishing that C integer division truncates, which is the one fact that makes the question a real question.**

In Python 3, `/` between two ints returns a float; the "problem" this commit is built on does not exist in this student's prior language. The course *has* touched integer-division truncation before — `ch-uart.ptx`'s BRR passage (`(PeriphClk + BaudRate/2) / BaudRate`, "the standard way to round rather than truncate… floor(f/baud)") — but that passage assumes the reader already knows plain integer division floors; it never states the rule as a fact for a Python-trained reader, and Day 14's plan does not call back to it. As written, the commit ("where must the cast go?") asks a Python-native student to guess at a problem they don't know exists — they'll place the cast arbitrarily or not see why one is needed at all, which turns a genuine commit-then-reveal (P-2) into a guess with no informed basis.

Displacement: none required. Fold one recall sentence into the existing 4-minute beat, anchored to the UART BRR moment already in the book ("recall `uart.c`'s BRR line — `/` between two integers throws away the remainder; that's what's about to bite this formula too") before posing the commit. This trims, not adds — the reveal can be a beat shorter since the setup is doing more work.

**5. [MINOR] `plans/day14.md`, Part 5 (`accel_test.c`'s scaling line, `(ACC_FS * raw * MILLI) >> ACC_REGISTERWIDTH`) — a signed right-shift subtlety appears in given code and is accounted for nowhere, neither class nor Reference.**

`raw` is `int16_t` and goes negative on the flip test the plan itself specifies ("flip → −1000," Part 5). Right-shifting a negative signed value is an arithmetic (sign-extending) shift on this toolchain, and it floors toward −∞ rather than truncating toward zero the way `/` does — a rounding-direction difference invisible at this magnitude (at most ±1 LSB, ~4 mg, buried in sensor noise) but real, and exactly the kind of thing that produces "nothing tells you why" if a careful student ever traces it by hand. Since the code is given (P-16) and the effect is inert at the observed scale, this does not belong in class time — but nothing currently commits to explaining it anywhere, including the future Reference section that `week7.md`'s L-2 decision explicitly reserves for float depth. Recommend one line in that same Reference section, alongside the L-2 material already planned to land there (B-10): `>>` on a signed value here is an arithmetic shift and behaves like division by a power of two with floor rounding, not `/`'s truncate-toward-zero — worth knowing if you ever hand-check a negative reading.

Displacement: none — Reference-section content, zero class minutes either day.

---

### Verdicts

- **Day 13** — PASS. Two's complement and float are not this day's material; nothing in scope here.
- **Day 13x** — PASS WITH CHANGES. Findings 1–3 are all fixable at plan level, and their combined +4 minutes is fully covered by the day's own already-named cut-order items (Part 2 trimmed, Part 3's schematic beat compressed) — the 50-minute total holds. Ground truth's premise that two's complement is "review" (`week7-ground-truth.md` §5) should be corrected before the day plan cites it again.
- **Day 14** — PASS WITH CHANGES. Finding 4 needs a one-sentence callback (no new minutes) before the Part 9 commit is a fair question for this audience; Finding 5 is a zero-cost Reference-section addition.

---

# committee-synthesizer — the change list

(Applied in the commits following this one; each item's application verified item by item against the finished files.)

# Week 7 Gate 1 — synthesis and change list

**Verdict.** The week's arc is right and `checker-arc-fidelity` says so at unusual length; what fails is arithmetic and one factual premise. Day 14 is scheduled at 120 minutes against a 110-minute Thursday (four reviewers, independently), and Day 13x's crucial step rests on a ground-truth claim that is false — two's complement has never been taught in this course, so a 3-minute "resurface" is a first teaching with the wrong budget. Everything else is reallocation inside existing budgets. Nine reports collapse to **18 executable items**, all net-zero per day.

Files edited: `plans/day13.md`, `plans/day13x.md`, `plans/day14.md`, `plans/week7.md`, `plans/week7-ground-truth.md`.

## BLOCKER

### 1. `plans/day14.md` — the whole Activity-sequence table: 120 → 110, HiTA-free

Listed Parts sum to 120 against a real 110, and "Checkpoint at minute 60" is really minute 65. Four repairs were proposed; arc-fidelity's is taken, because it both makes the plan HiTA-free (cognitive-load also demands this) **and** funds the `accel_test.c` gap in the same edit.

| | settle | P0 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | buffer | total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| new | 3 | 2 | 10 | 8 | 17 | **18** | 6 | 12 | **11** | **13** | 5 | **5** | **110** |

- Delete Part 1 (−10), keep the numbering (Parts 2–10 unchanged).
- Buffer 8 → 5 (−3).
- Part 5 15 → 18 (+3), new opening beat: read `accel_test.c` before running it — the init check, the two CTRL readbacks (proof the writes landed), and the scaling line: yesterday's #defines in C, `>>16` where the formula said ÷2¹⁶.
- Part 8 12 → 11, Part 9 12 → 13: the 1-minute data-format recap moves to the head of Part 9 (the integer before-picture for the float recast); Part 8 keeps one clause.
- Checkpoint = end of Part 5 = **minute 58**.
- New cut order; add "if the room visibly did not do the paper homework, treat Part 4 as needing the full buffer."
- Restore path, one line: if Petra keeps HiTA (Q4), it takes the buffer (5 → 0) and Part 7 12 → 7 (flip and shake only); checkpoint minute 68; zero slack on the crucial-step day — which is why the plan of record drops it. If it returns, it opens with a 1-minute individual written guess before group talk.
- `plans/week7.md`: risk 3 and the week cut order updated — HiTA's minutes are not a windfall; they are the deficit.

Discharges: arc-fidelity F1+F3+F6+R3; cognitive-load F1; continuity F1; logistics F1+F6; active-learning F5; firstgen F3.

### 2. `plans/week7-ground-truth.md` §5 and §9 — three corrections to the factual record

- §5 two's complement: **first taught on Day 13x.** Nothing before it decodes a signed bit pattern; Day 10's `act-i2c-hw-t2` uses `abs()` and a printed minus sign. Budget as first teaching, not recall.
- §5 memRead: the prototype and stop-then-start behaviour are **in-class, Day 10 Part 7a** (`subsec-day10-library`); only the line-by-line code walk is Reference-only (`subsec-i2c-ref-library`). Day 13's walk is still the first in-class walk; the *fact* it explains is recall.
- §9 Q2 narrowed: her Day 13x slide-13 speaker note confirms the given/blank split (RegisterRead given, RegisterWrite student-written, AccelInit skeleton given, ReadRaw given). Still needed: what the skeleton leaves blank *inside* `AccelInit`, and `accel_test.c`'s elided types (product reaches ±131 M → `int32_t`), plus the `int` vs `uint8_t` return type.

Discharges: continuity F2+F4; python-intro F1 (premise); arc-fidelity R1+R2.

### 3. `plans/day13x.md` — the whole Part table re-based (funds items 4 and 5)

| Part | old | new | what moves |
| --- | --- | --- | --- |
| settle / 0 | 2 / 1 | 2 / 1 | — |
| 1 physics | 10 | **11** | +2 derivation, −1 capacitance beat (C1/C2 detail → Reference) |
| 2 applications | 5 | **3** | three examples |
| 3 datasheet | 12 | **9** | schematic 2→1; mode-trade 2→1; commit 5→4 via the Day 7 callback |
| 4 data format | 15 | **19** | +2 sign, +2 byte assembly |
| 5 control regs | 3 | **3** | untouched, now protected |
| close | 2 | 2 | — |
| **total** | 50 | **50** | 2+1+11+3+9+19+3+2 ✓ |

### 4. `plans/day13x.md` Part 1 (11 min) — derive `kx = ma`, do not assume it

Beats 3+6+2: the commit (with the phone-level-app route swapped in as a second way in); then F = ma and F = kx named as two separate facts, set equal, → a = (k/m)x; then displacement → capacitance in brief (C1/C2 → Reference). Also `week7.md`: replace "Inherits from … Phys 13/Engs 22 mass-spring intuition" with "derives kx = ma in class; no physics prerequisite assumed." Discharges: firstgen F1 (BLOCKER); active-learning F7.

### 5. `plans/day13x.md` Part 4 (19 min) — the reconciled crucial step

Beats 3+5+3+4+2+2:
1. (3) One byte, unsigned — and the weld: "the register address — the datasheet's own word for it is **subaddress**". No three-mode picture yet.
2. (5) The sign — **first teaching**: bit 15 is worth −2¹⁵; a 4-bit +2/−2 contrast; then one fully worked hex example carried to mg: `0xC000` → bit 15 set → 49152 − 65536 = **−16384** → (4 × −16384 × 1000)/2¹⁶ = **−1000 mg** — literally tomorrow's flip test. (Correctness note: python-intro's finding said −500 mg; that is wrong — 0xC000 is −1000 mg; −500 mg would be 0xE000·… do not copy the reviewer's figure.)
3. (3) The collapse — now her three bit-row pictures; (raw ≫ 6)·4g/2¹⁰ = 4g·raw/2¹⁶, the zeros make it so.
4. (4) On paper, committed — **the committed raw value must be negative**. Reveal together.
5. (2) Six bytes, subaddresses 0x28–0x2D, auto-increment MSB (§6.1.1).
6. (2) **Byte assembly**, split out: low byte first — `result->x = ((int16_t)data[1] << 8) | ((int16_t)data[0])` — a different operation from any bit-idiom taught so far; carry her slide-13 sentence "these functions use `i2c.c` and `lsm303agr.h`" (the layering claim).

Update the CRUCIAL prose to match; drop "resurfaced". Discharges: continuity F2; python-intro F1+F2+F3; cognitive-load F2; arc-fidelity F4+R2; firstgen F4; rigor-hawk F7.

### 6. `plans/day13.md` Parts 4–6 — make the day genuinely fail-open

- Crucial-step scaffolding: a WHOAMI-never-succeeds student uses the projected capture (or a neighbour's) **for all of Part 5** — four of the six questions cannot be answered off a NACK-only trace.
- Minute-35 rescue, next rung: a second re-seat failure gets immediate priority triage, not a wait for the checkpoint.
- Part 6, inside the predict beat, before the capture: "If nothing happens on your screen, that is expected here — wait for the reset cue" (true whichever way Q3 lands).
- Part 6 capture A gets the projected-capture rescue (currently only the stretch tier has one).

Discharges: anxious F1+F2 (BLOCKERs); logistics F4.

### 7. `plans/day14.md` Part 3 — the two failure modes with no next rung

- Ladder rung added: WHOAMI still fails after a second re-seat → not a software problem; the checkpoint file will not fix it; priority triage during Parts 3–5.
- One displayed line: "if the build fails with `multiple definition of 'main'`, you skipped the exclude step — here is the menu path" (P-14).

Discharges: logistics F2 (BLOCKER) + F3.

## MAJOR

### 8. `plans/day13.md` Part 5 (15 min) — the reconciled "Digging Deeper" (beats 5+4+6)

1. (5) 0x19-not-0x32 answered call-and-response (Day 9x paying out); then **two** real commits: *why does the same address go out twice?* — reframed as confirmation ("Day 10 Part 7a told you ours does stop-then-start; here it is on your own trace — find it") — and *who ACKs?*
2. (4) The transfer diagram beside their capture; her remaining four questions answered as recap. **And the two kinds of NACK, named**: the NACK before the STOP is the controller's, sent on purpose to end the read; Part 6's NACK comes from nobody at all.
3. (6) The `i2c1_memRead()` code walk — first in-class walk; xref `subsec-i2c-ref-library`; retarget Part 3's citation to Day 10 Part 7a.

Never-cut clause widened to include the two kinds of NACK. Discharges: active-learning F2; cognitive-load F3; arc-fidelity F2; continuity F4.

### 9. `plans/day14.md` Part 2 (10 min, beats 1+4+5)

(1) The bit-field tables on screen for 60 s **before** the commit + "if you didn't finish, take your best guess now"; (4) the commit; (5) the reveal — no sensitivity re-derivation (callback clause instead), plus the rounding clause: "the table rounds our derived 3.9 to 4." Reading-compliance note added. Discharges: anxious F3; active-learning F6; arc-fidelity F8(4).

### 10. `plans/day14.md` Part 4 (17 min) — sub-allocate the RegisterWrite beat 2 attempt + 4 reveal (a student without Tuesday's paper draft attempts against `RegisterRead` as the model); pre-commit the AccelInit fallback (if the skeleton is more than two writes + a status check, drop the return-value discussion, let Part 5's ladder carry it); re-time Part 4 against the real file before Gate 2. Discharges: active-learning F3; cognitive-load F4; firstgen F5.

### 11. `plans/day14.md` Parts 8/9 — mechanism, landing, one wrong axis

- Part 8 single-axis beat carries the mechanism: Aₓ = g sin θ flattens as θ→90° (slope g cos θ → 0), so fixed noise swings the computed angle near 90°.
- STRETCH: `atan2(ax, az)` → **`atan2(ax, ay)`**, "hold the board upright, like a phone, so gravity lies in the x–y plane."
- Part 9 beats 1+2+4+3+3 = 13: the recap (moved here); float+math.h; the cast question with the BRR recall first ("`/` between two integers throws away the remainder"); land the answer — `(float)raw * 4 / 65536`, and why casting raw*4 after the fact is too late; round() + the `%f` caveat as a **delta on Day 5** (allow L-2 stays); the cost with FPU unpacked on first use.

Discharges: rigor-hawk F2+F3; arc-fidelity F7+R3; active-learning F4; python-intro F4; continuity F5; firstgen F6.

### 12. `plans/day13.md` — `D0`/`D1` → `DIO0`/`DIO1` throughout (the book's established naming; "D0/D1" already means two other things). Discharges: continuity F3.

### 13. `plans/day13.md` Part 2 — early finishers may start Part 4's DIO0/DIO1/GND wiring now (pure reorder). Discharges: logistics F5.

## MINOR

### 14. `plans/day13x.md` Part 3 (9 min, beats 3+4+1+1) — block diagram with slide 10 folded in; the sensitivity commit with the Day 7 ancestor named (1 LSB = V_ref/2^B) **and the figure instruction: the commit-time table image must have the sensitivity column masked or cropped — the full table is the reveal**; when the datasheet arrives, teach the rounding (3.90625 vs the table's 4 mg/digit) rather than letting the P-11 moment fail contact; modes + zero-g in one beat; schematic in one sentence. Discharges: active-learning F1; rigor-hawk F4+F5; continuity F6; arc-fidelity F8(2).

### 15. `plans/day13x.md` Part 5 — name the re-order (her slide 11 moved after the data format, so the control-register question is the last thing said before the homework that answers it) and add Part 5 to **not cuttable**. Discharges: arc-fidelity F5.

### 16. `plans/day13.md` — fold the 60-second resurface into Part 1's first beat and say so in the coverage row; reword Objective 5 to "recall the five-step recipe (Day 10) and apply it." Discharges: anxious F6; arc-fidelity F8(1); cognitive-load F5.

### 17. `plans/day13.md` reading — define "breakout board" in student terms (reading text, no class minutes). **Hold the keying claim** ("only fits one way") until Q9 answers — B-11c. Discharges: firstgen F2; anxious F5 (plan half).

### 18. `plans/week7.md` Reference manifest — drop "code size" (taught in class, graded by Lab 7 D4); add the signed-`>>` item (arithmetic floor shift, not interchangeable with `/` — accel_test multiplies by 4000 before shifting, and negative readings floor toward −∞, up to 1 mg off a calculator check); fix the precision-vs-range wording (int32_t exact over ±2³¹; float ~24 significant bits with ~10³⁸ range — traded, not two free lunches). Discharges: arc-fidelity F8(3); rigor-hawk F1+F6; python-intro F5.

## Explicitly rejected

1. continuity F1's Day 14 repair (keep HiTA, spend the buffer) — spends the only slack on the crucial-step day to keep a Q4-provisional activity.
2. cognitive-load F1's arithmetic (drop HiTA alone) — leaves accel_test.c unfunded.
3. logistics F1's Part 2 displacement — content adopted, but Part 2 keeps its minute for the access fix.
4. firstgen F1's funding source — substance applied; Part 2's minutes were quadruple-claimed; Part 1's second minute comes from its own capacitance beat.
5. python-intro F1's worked example **as written** — 0xC000 is −1000 mg, not −500 mg. Adopted with the number corrected.
6. active-learning F7's phone route as added time — adopted as a swap only.
7. "Spare pre-wired breakouts" as a named plan rescue — a plan may not name hardware that has not been provisioned. Priority-triage half applied; provisioning goes to Petra.
8. firstgen F2's "keyed, can't be wired backwards" — B-11c; held for Q9.
9. week7.md's "HiTA's minutes fall to Part 5" line — false under the repair; only 3 reach Part 5, from the buffer.

## For the question list / handover

- **New Q9 (safety):** can a miswired STEMMA QT connection (reversed power, swapped SDA/SCL) damage the breakout or the Nucleo? The connector appears keyed (JST-SH) but that is nowhere citable; slide 8 says "3.3 V–5 V" on the power pin.
- **Spare breakouts:** are there spares in the room on Days 13/14? The ladders end at "priority triage" because a spare-swap rung cannot be written without them.
- **Q4 (HiTA), with the arithmetic attached:** plan of record is HiTA-free; the restore path and its cost are stated in the plan.
- **Q2, narrowed** per item 2. **Q1** still gates the masked-column figure and the 3.9-vs-4 reconciliation. **Q3 no longer blocks drafting** (Part 6's line is worded true either way).
- **Re-time Day 14 Part 4 against the real `lsm303agr_partial.c` before Gate 2.**

## Dissent worth recording

- Day 13x Part 3's sensitivity commit goes 5 → 4 despite being on the not-cuttable list — two reviewers said the Day 7 callback shortens it, and Part 4's minutes had nowhere else to come from. If the room stalls on the derivation, that minute is the first to go back.
- continuity would keep HiTA and spend the buffer. Overruled — but if Petra answers Q4 with "HiTA is the point of the day," continuity's arithmetic is the one to revisit.
