# Day 13x — What a MEMS accelerometer is

**Wednesday x-hour, 50 minutes** (Day Nx is a Wednesday x-hour — the
day-parity rule in `CLAUDE.md`). **No pre-class reading — x-days do not get
one.** Chapter: `source/ch-accelerometers.ptx`. Old deck:
`Day13x-Accelerometer.pptx` (19 slides). Ground truth:
`plans/week7-ground-truth.md`. Gate 1 applied: `reviews/week7-gate1.md`.

Yesterday the class read 0x33 out of a chip without knowing what is inside
it. Today is the inside: the physics, the datasheet's numbers, and the format
the data will arrive in tomorrow.

## Objectives

By the end of class a student can:

1. Explain how a proof mass on a spring turns acceleration into displacement
   (deriving kx = ma from F = ma and F = kx) and how differential capacitance
   turns displacement into a voltage — and that MEMS means this whole
   structure is etched in silicon.
2. Read the sensor-characteristics table: pick a full-scale range, and compute
   the sensitivity as range / 2^bits for each of the three resolution modes —
   the same LSB-size logic as the ADC's V_ref/2^B from Day 7.
3. Convert a raw 16-bit left-justified two's complement reading — including a
   negative one — to milli-g, and explain why one formula, a = FS·raw/2¹⁶,
   works in every mode.
4. Say how all six data bytes come back in one transfer: successive
   subaddresses, the subaddress MSB that turns on auto-increment, and the
   low-byte-first assembly `AccelReadRaw()` does with them.
5. Name which two of the six control registers this course configures
   (CTRL_REG1 and CTRL_REG4) and what each governs.

## The CRUCIAL step

> **Every student converts a raw 16-bit left-justified two's complement
> reading — a negative one — to milli-g on paper, and can say why
> a = FS·raw/2¹⁶ works in all three resolution modes.**

Scaffolding (P-2), matching the Part 4 beats exactly:

- The conversion is staged one idea at a time: **one byte, unsigned** first
  (the value lives at the top of the word; shift and scale), then **the sign**
  — which is a first teaching, not review: nothing before Week 7 has decoded
  a signed bit pattern (Gate 1 corrected the ground truth on this) — then the
  three modes and the general formula. Nobody meets left-justification, sign,
  and scaling in the same breath.
- The sign beat contains one fully worked hex example carried all the way to
  mg on the board — `0xC000` → −16384 → **−1000 mg** — which is literally
  tomorrow's flip-the-board-over test.
- The committed conversion that follows uses a **negative** raw value, so
  "the shift just chops bits off" cannot pass unnoticed until Thursday.
- The algebra that collapses the three modes into one formula is shown as her
  slide 15 draws it — three bit-rows with the zeros visible — not as symbol
  manipulation.

## The STRETCH

The zero-g offset: her datasheet note says ±40 mg is realistic. For students
ahead of the room — how would you calibrate it out with the board on a flat
table? (Her answer, from the speaker notes: read flat, read flipped, average.)
This is also tomorrow's "suggested tests" made quantitative.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 3 (proof mass, kx = ma) | Part 1 |
| 4 (displacement → capacitance) | Part 1 |
| 5 (MEMS in silicon) | Part 1 (C1/C2 differential detail → Reference) |
| 6 (applications) | Part 2, three examples |
| 7 (LSM303AGR block diagram) | Part 3 beat 1 |
| 8 (the characteristics table) | Part 3 beat 2 — the datasheet moment |
| 9 (breakout schematic) | Part 3 beat 4, one sentence |
| 10 (how you interact; interrupt pins unused) | folded into Part 3 beat 1 |
| 11 (six control registers; think about 1 and 4) | Part 5 — **a deliberate re-order**, see below |
| 12–13 (header + prototypes, re-shows of Day 13's 30–31) | **dropped** — taught yesterday (B-8); the OUT_*_A addresses survive on her slides 17/18, and slide 13's layering sentence ("these functions use i2c.c and lsm303agr.h") is carried into Part 4's last beat |
| 15 (data format, three modes) | Part 4 beats 1–3 |
| 16 (the mg formula + #defines) | Part 4 beats 3–4 |
| 17 (auto-increment, §6.1.1) | Part 4 beat 5 |
| 18 (`AccelReadRaw` + struct) | Part 4 beat 6 |
| 19 (homework) | close |

**One ordering change from her deck, named:** her slide 11 (the control
registers) sits *before* the data-format material; the plan moves it to
Part 5, at the end — so the control-register question is the last thing said
before the homework that answers it. Deliberate, and Part 5 is on the
not-cuttable list for the same reason.

## Activity sequence (50 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 0 | 1 | tell | Announcements |
| 1 | 11 | predict → explain | **The physics.** Commit, `room="yes"` — *the case accelerates to the right; what does the mass do, seen from inside the case?* — with a second concrete route in: pull out your phone's level app and tilt it (3). Then the derivation, two named facts before they are combined: **F = ma** (the mass resists) and **F = kx** (the spring pushes back in proportion); the same force, so kx = ma → a = (k/m)x — measure displacement, get acceleration; three copies for three axes (6). Displacement → capacitance, and the whole structure etched in silicon — the MEMS pictures; the differential C1/C2 detail goes to Reference (2) |
| 2 | 3 | tell | **Why these are everywhere.** Three examples: tilt (your phone's screen), airbags, laptop free-fall protection; one sentence on the rest (helmets, vibration monitoring, + gyro = IMU) with SignalQuest and Simbex named, both Thayer-founded (3) |
| 3 | 9 | do → explain | **Our device, by its datasheet.** The block diagram: three sense capacitors → ADC → logic → I2C; control registers and data registers are how you interact — I2C here (SPI exists; the breakout straps it to I2C), and the INT pins we do not use (3). **Datasheet moment:** pick ±2 g; commit, `room="yes"`: *at 10 bits, what is the sensitivity?* — the same LSB-size logic as the ADC's V_ref/2^B (Day 7): 4 g / 2¹⁰ = 3.9 mg. **The commit-time table image must have the sensitivity column masked or cropped — the full table is the reveal**, and when the datasheet PDF arrives, teach its rounding (3.90625 → the table's 4 mg/digit) in the same reveal (4). The three modes as a trade (speed vs resolution), and the zero-g offset line read honestly (1). The breakout schematic in one sentence: pull-ups on board, a regulator, the pull-ups strap it to I2C (1) |
| 4 | 19 | do → reveal | **The data format — CRUCIAL.** (1) One byte, unsigned: the reading arrives at a **subaddress — the datasheet's own word for yesterday's register address** — and the value lives at the *top* of a 16-bit word; 8-bit mode first, shift and scale, no three-mode picture yet (3). (2) **The sign — first teaching, not review**: bit 15 is worth −2¹⁵, not +2¹⁵ — the one fact that lets "left-justified" and "two's complement" compose; a 4-bit +2/−2 contrast; then one worked hex example carried to mg on the board: `0xC000` → `1100 0000 …` → bit 15 set → 49152 − 65536 = −16384 → (4 × −16384 × 1000)/2¹⁶ = **−1000 mg** — tomorrow's flip test (5). (3) **The collapse**: now her three bit-row pictures with the zeros visible — (raw ≫ 6)·4g/2¹⁰ = 4g·raw/2¹⁶, the same in every mode, and the mg form with the #defines (3). (4) **On paper, committed — a negative raw value**: convert it to mg; reveal together (4). (5) Six bytes in one transfer: subaddresses 0x28–0x2D, and the subaddress MSB that turns on auto-increment (`0x28 \| (1<<7)`, datasheet §6.1.1) (2). (6) **Byte assembly**: the six bytes come back **low byte first** — `OUT_X_L_A` at 0x28, `OUT_X_H_A` at 0x29 — and `AccelReadRaw()` joins each pair with `result->x = ((int16_t)data[1] << 8) \| ((int16_t)data[0])`, an operation unlike the bit-idioms so far (it builds a wider signed value from two array elements, not a bit inside one register). These functions use `i2c.c` and `lsm303agr.h` — Day 13's layers figure, made concrete (2) |
| 5 | 3 | tell | **What is left to configure.** Six control registers, one line each; only CTRL_REG1 (rate, mode, axes) and CTRL_REG4 (range, resolution) matter here — the rest are interrupts and filters we leave at defaults (3) |
| — | 2 | tell | **Close / homework:** tonight's datasheet scavenger hunt decides what goes *into* those two registers; RegisterWrite on paper if not already done. Tomorrow: data on the screen (2) |

Total: 2+1+11+3+9+19+3+2 = **50**.

**This is the densest 50 minutes of the week** — all concepts; kits stay in
bags, so there is no hardware rescue to fund, but the conceptual load is the
budget's whole story and Gate 1 has already spent every named cut (the
applications trim, the schematic compression, the capacitance compression)
funding Parts 1 and 4. **If a part still overruns:** Part 2 drops to one
example (−2), and the close absorbs one minute. **Not cuttable:** Part 4
(Day 14's scaling line and Lab 7's tilt both stand on it), Part 3's
sensitivity commit (already compressed once — if the room stalls on the
derivation, its fifth minute is the first thing to give back), and **Part 5**
— it is the sole in-class setup for the homework that Day 14 Part 2's commit
stands on, and end-of-class beats get cut by the clock unless the plan
protects them.

## Datasheet moment (P-11)

The sensor-characteristics table (Part 3): full-scale ranges, mg/LSB
sensitivity per mode, zero-g offset — with the sensitivity *derived*
(range / 2^bits, the ADC's own LSB logic) rather than read off. The
commit-time image masks the sensitivity column; the full table is the reveal.
Exact table number pending the PDF (ground truth Q1), and the reveal
reconciles our 3.90625 with the table's rounded figure when it arrives.

## Writing room (S-2)

- Part 1: *what does the mass do when the case accelerates?* — committed
  before the physics.
- Part 3: *what is the sensitivity at ±2 g, 10 bits?* — committed arithmetic,
  answer column masked until the reveal.
- Part 4: *convert this raw reading — a negative one — to mg* — the crucial
  step's own paper record.

## Hand-offs

**Pre-class: nothing — x-day.**

**Homework (due Thursday, unchanged from Day 13's assignment):** the datasheet
scavenger hunt — settings for CTRL_REG1 and CTRL_REG4, on paper — and
`lsm303_AccelRegisterWrite()` on paper.

**Day 14 needs from here:** the raw→mg formula (its scaling line is
`accel_test.c`'s), the sensitivity number (its ±1000 mg test), two's
complement taught well enough that a flipped board's negative reading
surprises nobody, and auto-increment plus the byte assembly understood so
`AccelReadRaw()` is not magic.
