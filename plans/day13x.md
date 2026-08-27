# Day 13x — What a MEMS accelerometer is

**Wednesday x-hour, 50 minutes** (Day Nx is a Wednesday x-hour — the
day-parity rule in `CLAUDE.md`). **No pre-class reading — x-days do not get
one.** Chapter: `source/ch-accelerometers.ptx`. Old deck:
`Day13x-Accelerometer.pptx` (19 slides). Ground truth:
`plans/week7-ground-truth.md`.

Yesterday the class read 0x33 out of a chip without knowing what is inside
it. Today is the inside: the physics, the datasheet's numbers, and the format
the data will arrive in tomorrow.

## Objectives

By the end of class a student can:

1. Explain how a proof mass on a spring turns acceleration into displacement
   (kx = ma) and how differential capacitance turns displacement into a
   voltage — and that MEMS means this whole structure is etched in silicon.
2. Read the sensor-characteristics table: pick a full-scale range, and compute
   the sensitivity as range / 2^bits for each of the three resolution modes.
3. Convert a raw 16-bit left-justified two's complement reading to milli-g,
   and explain why one formula — a = FS·raw/2¹⁶ — works in every mode.
4. Say how all six data bytes come back in one transfer: successive
   subaddresses, and the subaddress MSB that turns on auto-increment.
5. Name which two of the six control registers this course configures
   (CTRL_REG1 and CTRL_REG4) and what each governs.

## The CRUCIAL step

> **Every student converts a raw 16-bit left-justified two's complement
> reading to milli-g on paper, and can say why a = FS·raw/2¹⁶ works in all
> three resolution modes.**

Scaffolding (P-2):

- The conversion is staged: first *unsigned and 8-bit* (one byte, top of the
  word, shift and scale), then the sign (two's complement resurfaced with a
  concrete negative reading — flip-the-board-over is tomorrow's test of
  exactly this), then the general formula. Nobody meets left-justification,
  sign, and scaling in the same breath.
- The worked example is done together before the committed one is posed alone.
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
| 5 (MEMS in silicon) | Part 1 |
| 6 (applications) | Part 2 |
| 7 (LSM303AGR block diagram) | Part 3 |
| 8 (the characteristics table) | Part 3 — the datasheet moment |
| 9 (breakout schematic) | Part 3 |
| 10 (how you interact; interrupt pins unused) | Part 3, one beat |
| 11 (six control registers; think about 1 and 4) | Part 5 |
| 12–13 (header + prototypes, re-shows of Day 13's 30–31) | **dropped** — taught yesterday (B-8); Part 4 recalls the OUT_*_A addresses off the header students already have |
| 15 (data format, three modes) | Part 4 |
| 16 (the mg formula + #defines) | Part 4 |
| 17 (auto-increment, §6.1.1) | Part 4 |
| 18 (`AccelReadRaw` + struct) | Part 4 |
| 19 (homework) | close |

## Activity sequence (50 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 0 | 1 | tell | Announcements |
| 1 | 10 | predict → explain | **The physics.** A mass on a spring in a case: commit, `room="yes"` — *the case accelerates to the right; what does the mass do, seen from inside the case?* (3) Then kx = ma → a = (k/m)x: measure displacement, get acceleration; three copies for three axes (4). Displacement → capacitance: the differential pair, and the whole structure etched in silicon — the MEMS pictures (3) |
| 2 | 5 | tell | **Why these are everywhere.** Tilt (your phone's screen), airbags, helmet impact sensing, laptop free-fall protection, vibration monitoring; + gyro = IMU. SignalQuest and Simbex, both Thayer-founded (5) |
| 3 | 12 | do → explain | **Our device, by its datasheet.** The block diagram: three sense capacitors → ADC → logic → I2C; magnetometer and temperature on die, unused (3). **Datasheet moment:** the characteristics table — pick ±2 g; commit, `room="yes"`: *at 10 bits, what is the sensitivity?* (4 g / 2¹⁰ = 3.9 mg) (5). The three modes as a trade (speed vs resolution), and the zero-g offset line read honestly (2). The breakout schematic: pull-ups on board, the regulator, pullups strap it to I2C (2) |
| 4 | 15 | do → reveal | **The data format — CRUCIAL.** The reading is 16 bits, left-justified, two's complement: her three bit-row pictures (3). Two's complement resurfaced on a concrete negative reading (3). The collapse: (raw ≫ 6)·4g/2¹⁰ = 4g·raw/2¹⁶, same in every mode — the zeros make it so (3). **On paper, committed:** convert a given raw value to mg; reveal together (4). Then how six bytes arrive in one transfer: subaddresses 0x28–0x2D, the MSB auto-increment bit (`0x28 | (1<<7)`, datasheet §6.1.1), and `AccelReadRaw()` read as the five lines that do exactly that (2) |
| 5 | 3 | tell | **What is left to configure.** Six control registers, one line each; only CTRL_REG1 (rate, mode, axes) and CTRL_REG4 (range, resolution) matter here — the rest are interrupts and filters we leave at defaults (3) |
| — | 2 | tell | **Close / homework:** tonight's datasheet scavenger hunt decides what goes *into* those two registers; RegisterWrite on paper if not already done. Tomorrow: data on the screen (2) |

Total: 2+1+10+5+12+15+3+2 = **50**.

**This is the densest 50 minutes of the week** — all concepts, no rescue
time needed (nothing is wired today; kits stay in bags). **Cut order:**
Part 2 to three examples (2 min) → Part 3's breakout-schematic beat to one
sentence → Part 1's capacitance beat compressed (the spring intuition
survives; the C1/C2 detail moves to Reference). **Not cuttable:** Part 4 —
Day 14's scaling line and Lab 7's tilt both stand on it — and Part 3's
sensitivity computation, which is what makes tomorrow's "≈ 1000 mg" a number
instead of an incantation.

## Datasheet moment (P-11)

The sensor-characteristics table (Part 3): full-scale ranges, mg/LSB
sensitivity per mode, zero-g offset — with the sensitivity *derived*
(range / 2^bits) rather than read off, so the table's three modes stop being
arbitrary. Exact table number pending the PDF (ground truth Q1).

## Writing room (S-2)

- Part 1: *what does the mass do when the case accelerates?* — committed
  before the physics.
- Part 3: *what is the sensitivity at ±2 g, 10 bits?* — committed arithmetic.
- Part 4: *convert this raw reading to mg* — the crucial step's own paper
  record.

## Hand-offs

**Pre-class: nothing — x-day.**

**Homework (due Thursday, unchanged from Day 13's assignment):** the datasheet
scavenger hunt — settings for CTRL_REG1 and CTRL_REG4, on paper — and
`lsm303_AccelRegisterWrite()` on paper.

**Day 14 needs from here:** the raw→mg formula (its scaling line is
`accel_test.c`'s), the sensitivity number (its ±1000 mg test), two's
complement live enough that a flipped board's negative reading surprises
nobody, and auto-increment understood so `AccelReadRaw()` is not magic.
