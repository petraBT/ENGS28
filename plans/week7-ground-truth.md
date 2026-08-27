# Week 7 ground truth — Days 13, 13x, 14: the accelerometer

Step 0 for the whole week, mined 2026-08-26 from the three decks, Lab 7, the
starter library, and `source/ch-i2c.ptx`. Chapter: `source/ch-accelerometers.ptx`
(447 lines, **rough** — see §7 for what in it is wrong). Downstream: **Lab 7**.

Sources mined:

- `assets/ClassSlidesOLD/Day13-I2C(3).pptx` — 32 slides
- `assets/ClassSlidesOLD/Day13x-Accelerometer.pptx` — 19 slides
- `assets/ClassSlidesOLD/Day14-Accelerometer(2).pptx` — 21 slides
- `assets/Labs/Lab7_ES28.pdf` — 5 pages, read in full (§4)
- `assets/starters/i2c.c` — the I2C library, already in the repo and already
  taught (Days 9x/10)

**The sensor is the LSM303AGR on the Adafruit LSM303AGR Accelerometer
Magnetometer — STEMMA breakout (product 4413; Petra confirmed 2026-08-27).**
Not the LIS3DH — `assets/datasheets/lis3dh.pdf` is Day 5X worksheet material
and must not be cited anywhere this week. The LSM303AGR datasheet is
`assets/datasheets/lsm303agr.pdf` (§3, verified).

---

## §1 Her arcs, slide by slide

### Day 13 (Tue, 110 min) — "I2C(3)": the sensor as an I2C device

| Slide | Content |
| --- | --- |
| 1–2 | Title; agenda: *Back to I2C! / Accelerometers / Serial (I2C) debugging* |
| 3–4 | The LSM303AGR: I2C device (breakout wired for I2C by default; SPI is the other option); has a magnetometer we don't use. Her posed question: *"I still have my 7-segment display connected to the I2C pins. Do I need to take that down? What if I wanted to use both?"* |
| 5–6 | I2C protocol review: bus picture (SDA/SCL/pullups, controller/peripheral, addresses), then the full START/address+R/W/ACK/DATA/STOP walk. Rich speaker notes, but this is **review** — Days 9x/10 taught it |
| 7 | The five I2C library functions, recalled verbatim (`i2c1_init/byteWrite/byteRead/memWrite/memRead`). Note: *"All these will be given to you. To use them properly we still need to understand how they work."* |
| 8 | The breakout + STEMMA QT wiring: GND black, VIN red, SCL yellow, SDA blue. Board text says "3.3V–5V" (regulator on breakout) |
| 9 | The activity: build the circuit, copy `TemplateProject` → `Accelerometer`, download `whoami_test.c` into `Src`, build, run CoolTerm. WHO_AM_I contains 0x33; reading it right proves the I2C setup |
| 10–11 | `whoami_test.c` in full (§2), incl. `lsm303_AccelRegisterRead()` |
| 12 | `i2c1_memRead()` walked line by line — "Recall:" (the *fact* it teaches was in-class on Day 10 Part 7a; only the code walk is Reference-only — §5, corrected at Gate 1) |
| 13–15 | AD2 **digital channels** (larger flying-lead bundle): GND black, D0 (pink) → SDA, D1 (green) → SCL |
| 16 | **Predict**: what will the logic analyzer show when `whoami_test.c` runs? (Full listing repeated.) Speaker note expects a NACK + "press single then hit reset to catch that first interaction" — see §2a, this note is doing more work than it looks |
| 19–21 | Waveforms captures A/B/C — **her full-resolution originals are now in `assets/images/Day13-I2C(3)/WaveformsA/B/C.png` (Petra, 2026-08-27), all three verified by eye.** The decoder rows read: **A** — `h18 WR`, NACK, STOP: one transaction, nothing more in the 400 µs window (the wrong *device* address; h18 = `0x30 >> 1`, i.e. the demo changes `0x32` to `0x30` in the `#define`). **B** — `h19 WR · A · h20 · A · P`, then `h19 RD · A · h07 · N · P`: the wrong *register* address (0x20 = CTRL_REG1_A) ACKs all the way and returns that register's power-on default 0x07 — a teachable detail: the "wrong" value is the header's DEFAULT column made visible. **C** — `h19 WR · A · h0F · A · P`, then `h19 RD · A · h33 · N · P`: both transactions, the stop-then-start between them, the register address, the 0x33, and the controller's deliberate NACK before the final STOP — every Part 5 teaching point on one screen |
| 24 | "Digging Deeper" — six questions on the trace: why 0x19 not 0x32; who sends the address; who ACKs; why the address goes out **twice**; where the register address is said; where the data appears |
| 25 | AD2 wiring repeated (rescue slide) |
| 26–28 | Device driver begins: firmware-layers figure (the Day 10 figure, reused); the five-step "writing a device driver" recipe (datasheet transfers → `#define`s → functions → implement via i2c calls → unit tests) |
| 29 | The two I2C transfer patterns (write; read with repeated START), with "subaddress autoincrements, see Sec 6.1.1" |
| 30 | `lsm303agr.h` excerpt: device address `(0x32 >> 1)`, WHO_AM_I_A 0x0F, CTRL_REG1..6_A 0x20–0x25, STATUS 0x27, OUT_X/Y/Z_L/H 0x28–0x2D. "Download lsm303agr.h and put it into your mylib folder" |
| 31 | The four driver prototypes (names borrowed from Adafruit's Arduino driver — do not repeat that provenance in the book, B-11e): `AccelInit`, `AccelRegisterWrite`, `AccelRegisterRead`, `AccelReadRaw` |
| 32 | Homework for Thursday: daily-page readings; **write `lsm303_AccelRegisterWrite()` on paper** (mimic the read function); work out the CTRL_REG1/4 settings on paper. Speaker note: "Tomorrow: theory of how this thing works. Thursday: get some data." |

Slides 18, 22, 23 are empty. Slides 14/15/25 are near-duplicates.

### Day 13x (Wed x-hour, 50 min) — what a MEMS accelerometer is

| Slide | Content |
| --- | --- |
| 3 | Proof mass + spring: inertia, kx = ma, a = (k/m)x; 1-D per axis, three copies for 3 axes; "how do we measure displacement?" |
| 4 | Displacement → capacitance (resistive/capacitive/inductive options; we do capacitive) |
| 5 | MEMS: the structure micromachined from silicon; differential capacitors C1/C2; capacitance-to-voltage circuit. Speaker note has a pasted-AI block (mangled LaTeX) — mine the idea, not the text |
| 6 | Applications: tilt, vibration/condition monitoring, shock/airbag, wearables/helmets, free-fall/laptop, IMU. Local color: SignalQuest and Simbex, both Thayer-alum companies |
| 7 | The LSM303AGR block diagram: three variable capacitors → analog mux → ADC → logic → I2C. Also magnetometer + temperature sensor on die (unused) |
| 8 | **Datasheet moment**: the sensor-characteristics table. Range ±2/4/8/16 g; sensitivity = full range / 2^bits; three resolution modes — low power **8-bit**, normal **10-bit**, high-resolution **12-bit**; zero-g offset (her note: ±40 mg is significant; calibrate flat + flipped, average) |
| 9 | Breakout schematic: I2C pullups on board, 6-pin header, 5V→3.3V regulator, pullups strap the chip into I2C mode |
| 10 | How you interact: I2C (or SPI); control + data registers; hardware interrupt pins INT_MAG, INT_1_XL, INT_2_XL — **not used** |
| 11 | The six control registers, one line each; only CTRL_REG1 and CTRL_REG4 matter for us (the rest are interrupts/filters, defaults fine). "For Thursday: think about setups for Control Registers 1 and 4" |
| 12–13 | `lsm303agr.h` and the four prototypes again (re-shows of Day 13's slides 30–31; 13x's version adds "These functions use i2c.c and lsm303agr.h") |
| 15 | **The data format**: output is 16-bit, **left-justified**, two's complement. Three modes drawn as bit rows (8 valid bits / 10 / 12, zeros below). The punchline: acceleration = raw × 4g / 2^16 **in every mode**, because left-justification makes the same formula work |
| 16 | The format in mg: a = (ACC_FS × ACCEL_raw × MILLI) / 2^ACC_REGISTERWIDTH, with `#define ACC_FS 4`, `ACC_REGISTERWIDTH 16`, `MILLI 1000` |
| 17 | Multi-byte read: data registers at successive subaddresses 0x28–0x2D; **set the subaddress MSB to auto-increment** (send `0x28 | (1<<7)`), quoting datasheet §6.1.1 verbatim |
| 18 | `lsm303_AccelReadRaw()` in full (§2), plus the `lsm303AccelData_s` struct (three `int16_t`) |
| 19 | Homework (same as Day 13 slide 32, plus): from the datasheet, what values go into CTRL_REG1 and CTRL_REG4? Speaker note: "The reading quiz gives you a scavenger hunt through the data sheet" — **so a Day 14 pre-class reading exists and is datasheet-driven** |

### Day 14 (Thu, 110 min) — finish the driver, see data, tilt

| Slide | Content |
| --- | --- |
| 2 | Agenda: complete the driver / send x-y-z to screen, observe tilt / plot in CoolTerm, observe shock and vibration |
| 3 | **"Water Bottle Filling Station: In-class HiTA Activity"** — table groups reverse-engineer the Thayer bottle fillers: sensors, actuators, displays, block diagram, program flow. (Day 13 slide 32's note: "Still working on that water bottle filling station!") — §9 question 4 |
| 5–6 | Discuss the homework's CTRL_REG1/4 settings; her answer slides: **CTRL_REG1_A = 0b01110111, CTRL_REG4_A = 0b00000000** (four datasheet-table images) |
| 7–8 | Download `lsm303agr_partial.c` and `accel_test.c` into `Src`, **exclude `whoami_test.c` from the build**; complete `AccelInit` and `AccelRegisterWrite`; test with `accel_test.c` + CoolTerm |
| 9 | The reveal: `lsm303_AccelRegisterWrite()` is one line — `i2c1_memWrite(LSM303_ADDRESS_ACCEL, RegisterAddress, 1, &data);` (comment cites "Datasheet, Table 20") |
| 10 | `accel_test.c` (elided listing, §2): init check prints, CTRL readback prints, then the loop: `AccelReadRaw` → scale to mg with `(ACC_FS * raw * MILLI) >> ACC_REGISTERWIDTH` → printf → `delay_ms(2000)` |
| 11 | Suggested tests: 1000 mg is "perfect"; flip → sign change; align x/y with g; try all three resolutions. Then productize: rename `lsm303agr_partial.c` → `lsm303agr.c`, move to `mylib`, delete from `Src`, rebuild |
| 13 | Plotting: comment out prints, emit `printf("%d,%d,%d\n\r", …)`, `delay_ms(100)` or less; CoolTerm **View menu → View Chart** |
| 14–15 | Plot experiments: flip, rotate, raise/lower periodically, shake, bang the table (shock); serial-plotter screenshot |
| 17 | **Tilt geometry** (from Analog Devices AN-1057): single-axis Ax = g sin θ → θ = asin(Ax/g), sensitive near 0°, useless near 90°, no 360°; two-axis θ = atan(Ax/Ay) (her slide writes tan⁻¹(Ax/Ay); Lab 7 uses atan2(Ax, Ay)) — constant sensitivity, full 360° if careful about quadrants; three axes orient fully in space |
| 18 | "Sine? Cosine? Tangent? Looks like we need floating point arithmetic…" |
| 19 | Data format recap (re-show of 13x slide 16) |
| 20 | **Floating point**: `float a = (float) ACCEL_RAW * ACC_FS / 65536;` — make sure the division is float (how?); compute with `math.h`, convert back with `round()` for printing/display; sign + 8-bit exponent + 23-bit mantissa; int32_t more precision, float more dynamic range (and the sensor is only 12-bit anyway); **no FPU on our processor** — software floats, slower, more flash |
| 21 | Lab 7: two I2C devices on one bus; calculate and display tilt; simulate phone rotation |

Slides 4, 12, 16 are section-divider slides. Slide 1 is the title.

**The ordering is hers and deliberate**: the class *uses* the device Tuesday
(wire, WHOAMI, analyzer) and learns *how it works inside* Wednesday. A
topic-logical rewrite that puts MEMS physics first is the arc destruction
`checker-arc-fidelity` exists to catch.

---

## §2 The code — all four real files are in the repo (Petra, 2026-08-27)

`assets/starters/` now holds `whoami_test.c`, `lsm303agr.h`,
`lsm303agr_partial.c`, `accel_test.c` — **her files, verbatim; they are the
authority for every listing (B-6)**. Read against the decks, they settle:

| File | What it settles |
| --- | --- |
| `whoami_test.c` | Includes are `stdio.h`, `ES28.h`, `uart.h`, `i2c.h`. Matches the slides otherwise. `main()` ends `return 0;` — the course convention is `return 1;` (B-14, Week 5 flag 6); **her file wins, do not "fix" it**; the book listing must match the starter (`check_starters.py`) |
| `lsm303agr.h` | The full register map runs to 0x3D (FIFO/INT/CLICK/TIME registers beyond the slide's excerpt); calibration constants `ACCEL_GRAVITY 9.8`, `ACCEL_RANGE 2`; **`lsm303_AccelInit()` returns `uint8_t`** (the Day 14 slide was right, Day 13/13x's `int` was stale); ReadRaw's prototype is `* const result` in the `.h` but `*result` in the `.c` — compatible in C, note it, don't touch it. The header comment credits Adafruit_LSM303_U.h — internal provenance, never book prose (B-11e) |
| `lsm303agr_partial.c` | **The skeleton, exactly as the plans assumed**: `AccelRegisterWrite`'s body entirely blank ("// complete this function"); `AccelInit` given whole **except the two register values** (`uint8_t ctrl_reg1 =      ;` / `ctrl_reg4 =      ;`, with her intent comments "normal power mode @ 400 Hz, all axes enabled" / "continuous update, 2g full scale, I2C"); the WHOAMI check given, returning 0 fail / 1 success; `ReadRaw` given whole, with the §6.1.1 auto-increment quote, the alternative two-single-reads route, and the mg-conversion comment in it. **Day 14 Part 4 is no longer provisional — the plan's 17-minute shape matches the real file** |
| `accel_test.c` | `accel_x/y/z` are **`int16_t`** — not the `int32_t` this document previously presumed: the product `ACC_FS * raw * MILLI` is computed in promoted `int` arithmetic (reaches ±131 M there safely) and only the post-shift result (±2000) is stored. It also prints the **raw values in hex** (`accel_raw_x=%x …`) beside the converted mg line — a line the deck's elided listing never showed, and a teaching hook: the left-justified raw and its mg conversion, side by side. Banner is "LSM303AGR test program"; `delay_ms(2000)` |
| `i2c.c` / `i2c.h` | Unchanged — slide 12's `i2c1_memRead()` matches the starter verbatim |

**Stale datasheet citations inside her files** (they were written against an
older datasheet revision; the hosted PDF is the authority — §3): the
read-one-byte comments say "Table 13", which in the hosted PDF is a
maximum-ODR table — the single-byte read transfer is **Table 22**;
`lsm303agr.h` cites "Sec 6, 7.1" where the hosted PDF's register map is
**§7, Table 26**; `lsm303agr_partial.c` says "there are 8 control registers
(Section 8.6)" where the hosted PDF has **six** accelerometer control
registers (§8.6–8.11; §8.6 is CTRL_REG1_A alone — her deck slide 11's "six"
agrees). Do not edit her files; the book cites the hosted PDF, and the
comment drift is flagged to her at delivery as a one-word-per-comment fix.

### §2a How the code actually fails, and why it matters for Day 13's captures

Week 5 established (week5-map item 4, verified against RM0490 §23.4.9): the
library's NACKF test runs just after START, ~90 µs before the address phase
completes, so it always passes; on a real NACK the following `TXIS` wait never
ends. `i2c1_memRead()` has the identical structure. Consequences, all
load-bearing for Day 13's three captures:

- **Wrong device address (capture A): the program hangs inside the first
  `i2c1_memRead()` call.** One transaction ever appears on the wire (address,
  NACK, STOP via AUTOEND), and CoolTerm shows the banner and then nothing.
  `whoami_test.c`'s "Could not connect to accelerometer" branch is
  **unreachable for an absent or mis-addressed device** — `who_am_i` stays 0
  only if `memRead` returns, which it does not.
- Her slide 16 speaker note — "you may have to press single and then hit reset
  to catch that first interaction" — is consistent with exactly this: there is
  no repeating transaction to trigger on. Her parenthetical doubt ("I really
  don't think so since it's part of the while loop???") assumes the loop keeps
  running; the Week 5 finding says it does not. **Verify on hardware before
  the book asserts either** (question 3).
- **Wrong register address (capture B): everything ACKs**, the loop runs, and
  the printout alternates "Could not connect" — this branch IS reachable here,
  because the device answered with a value ≠ 0x33.
- So the student-visible symptom table is asymmetric — hang-with-one-trace
  vs. repeating-wrong-value — and that asymmetry is genuinely useful teaching
  material for the diagnostic ladder, once verified.

This also re-opens **week5-map flag 20** (may `i2c.c` gain a NACK-reporting
variant?), which explicitly anticipated "and the accelerometer later". Not
ours to decide; on the question list (question 3).

*Status (Petra, 2026-08-27):* she does not remember the wrong-address
behavior and will check later; if the NACK-reporting variant works she will
switch to it. **Do not press this** — the plans are already worded to be true
either way, and her capture A is at least consistent with the hang (one
transaction in a 400 µs window, and her old "press single then hit reset"
note). Whatever she decides simply lands in the drafted text later.

---

## §3 The datasheet — in the repo and verified (Petra, 2026-08-27)

**`assets/datasheets/lsm303agr.pdf`** (72 pages; link as
`external/datasheets/lsm303agr.pdf`). The P-11 citations, verified against
this PDF — pasted, not typed:

- **§2.1, Table 3 "Sensor characteristics" (pp. 13–14)** — full-scale ranges;
  sensitivity per mode (the table's own note: *"1 LSb = 3.9 mg in normal mode
  (10-bit) at FS=±2 g"* — so the datasheet prints **3.9**, matching our
  derived 3.90625; it is **her slide's callout** that rounds to "4 mg/digit");
  zero-g offset **LA_TyOff ±40 mg** — her speaker note's figure, confirmed.
- **§6.1.1 "I2C operation" (p. 38)** — the auto-increment SUB-MSB paragraph,
  verbatim as her 13x slide 17 quotes it; and **Tables 20–23**: 20 write one
  byte, 21 write multiple, **22 read one byte**, 23 read multiple. (The read
  cites in her `.c` files say "Table 13", which in this revision is a
  maximum-ODR table — stale, see §2.)
- **§7, Table 26 (p. 43)** — the register address map, the source of
  `lsm303agr.h`'s `#define` block (Day 13 Part 7's datasheet moment).
- **§8.4 WHO_AM_I_A (0Fh), p. 46** — default 0b00110011 = 0x33.
- **§8.6 CTRL_REG1_A (20h), Tables 33–35, p. 47** — ODR[3:0]/LPen/Zen/Yen/Xen;
  Table 35 is the data-rate table the 0b0111 = 400 Hz derivation reads.
- **§8.9 CTRL_REG4_A (23h), Tables 41–42, p. 49** — BDU/BLE/FS[1:0]/HR/
  self-test/SPI_ENABLE; FS 00 = ±2 g, HR 0 = normal (10-bit) mode.

**The settings pair (0x77/0x00) selects normal mode = 10-bit** — the rough
chapter's "12-bit low-power mode" is wrong twice over (§7). The accelerometer
has **six** control registers, CTRL_REG1_A–CTRL_REG6_A (§8.6–8.11), as her
deck slide 11 says; `lsm303agr_partial.c`'s "8 control registers" comment is
stale against this revision.

Also cited: Analog Devices **AN-1057**, "Using an Accelerometer for
Inclination Sensing" (Day 14 slide 17; Lab 7 names it too). Petra approved
hosting it (2026-08-27), but analog.com refuses downloads from this network —
**she drops the PDF into `assets/datasheets/an-1057.pdf`** the same way as
the datasheet, and the book links it as `external/datasheets/an-1057.pdf`.

---

## §4 Lab 7 — the downstream constraint (P-13: constraint, not goal)

Read in full. Equipment: Nucleo/breadboard, the four-digit seven-segment
display, **Adafruit LSM303AGR breakout, STEMMA QT cable (4-wire)**, LEDs +
330 Ω as needed.

- **Pre-lab** = "complete the accelerometer device driver and acquire raw
  acceleration data (Thursday's class)". Day 14's crucial step is literally
  the lab's pre-lab.
- **Deliverable 1 (5 pts)**: the driver, clean and well organized, `.c` + `.h`.
- **Deliverable 2 (5 pts)**: **both devices on one bus** — read WHO_AM_I_A,
  write its value to the seven-segment display. The lab says "As you saw in
  class, Waveforms has a built-in protocol decoder… known as bus sniffing" —
  taught Day 9x Part 3c to the whole room, exercised again Day 13. Day 13's
  slide 4 question ("do I need to take the display down?") is this
  deliverable's setup; the answer the week must land is *no — same bus,
  different addresses*.
- **Deliverable 3 (8 pts)**: tilt, −180° to 180°, via `atan2()` (the lab
  explicitly says use `atan2`, not `atan`), radians → degrees × 180/π,
  `round()` back to int for printf and the display, `#include <math.h>`.
  Compare against a phone tilt app (may differ by 90°).
- **Deliverable 4 (2 pts)**: accuracy vs. phone; **program size in flash** —
  ties to Day 14 slide 20's "software floats take flash" claim.
- **Deliverable 5 (5 pts)**: orientation — four LEDs (two portrait, two
  landscape), track the "top of the phone"; the breakout's X axis runs along
  the long dimension. (Apple/Android landscape-naming aside is the lab's own.)
- Optional: full 3-angle orientation from AN-1057.

What class must therefore have covered by Thursday's end: the working driver
(D1), shared-bus reasoning + bus sniffing (D2), the tilt trig **as taught
material** with `atan2` at least named (D3 — her slide writes tan⁻¹; the lab's
`atan2` quadrant point should be the class's version), float mechanics +
`round()` (D3/D4). The orientation deliverable is lab-only design work — class
teaches axes and signs, not the LED logic.

---

## §5 Continuity — what is already taught, and what this week may not re-teach

**From Day 9x/10 (`ch-i2c.ptx`), verified against the source:**

- The I2C protocol, the ACK handover, the shifted address (7-bit vs 8-bit trap
  — Day 9x Part 4 made a set-piece of it). Day 13 slide 24's "why 0x19, not
  0x32?" is that set-piece paying out; the chapter may **recall**, not
  re-teach (B-8).
- The five library operations and `i2c1_memWrite()` (Day 10 in-class).
  **`i2c1_memRead()` — corrected at Gate 1:** the prototype *and* the
  stop-then-start behavioral fact ("ours sends the register address, lets the
  transaction end, and starts a second one — worth knowing before you meet a
  bus with two") are taught **in class, Day 10 Part 7a**
  (`subsec-day10-library`, with slides). Only the register-level **code
  walk** is Reference-only (`subsec-i2c-ref-library`). So Day 13's walk is
  still the first in-class walk (it deepens, not repeats), but the *fact* it
  explains is a recall — frame the "address goes out twice" question as
  confirm-on-your-own-trace, not fresh discovery. Note the
  ST transfer diagram (13x slide 17 / Day 13 slide 29) shows a **repeated
  START**; our library issues STOP then START. The trace students capture will
  show two transactions. The book must not paper over that difference —
  slide 24's "why does the address go out twice?" only has its (already
  written) answer in `sec-i2c-reference`; xref it.
- The AD2 **logic-analyzer mode and the I2C protocol decoder** — taught to the
  whole room, Day 9x Part 3c (`fig-waveforms-setup`, `fig-waveforms-decode`;
  DIO0 pink → SDA, DIO1 green → SCL, black → GND, falling-edge trigger, single
  sweep). Day 13 reuses the identical setup on a device that can NACK. Lab 7's
  "as you saw in class" is already satisfied; Day 13 makes it routine.
- The firmware-layers figure: `fig-firmware-layers`
  (`images/Day10-I2C(2)/firmware_layers.svg`) — Day 13 slide 27 is the same
  figure. **Reuse by `<xref>`/`refPage`, do not re-author, never define the id
  twice.**
- The device-driver discipline (datasheet structure → header structure;
  driver never touches machine registers) — Day 10 Part 7/8. Day 13 slide 28's
  five-step recipe is the same discipline restated for a new device; frame as
  "second verse", the display was the first.
- `TemplateProject` copy/rename, mylib, CoolTerm — standing workflow.

**From Day 7 (`ch-adc.ptx`)**: CoolTerm as the serial terminal, printf/UART.
**CoolTerm's chart view is new on Day 14** — no chapter mentions plotting
(grepped ch-adc, ch-uart, ch-i2c). Budget it as a taught step, not a recall.

**From Day 3/AD2 lore**: scope channels are orange CH1 / blue CH2 — but Day 13
uses the **digital** channels (pink D0/green D1), per her slides and per
Day 9x's figures. Do not let "orange and blue" leak onto the logic-analyzer
wiring, and do not let "yellow" leak in from anywhere (the breakout's SCL
STEMMA wire IS yellow — keep "yellow" strictly attached to the STEMMA cable,
never to the AD2).

**Two's complement — corrected at Gate 1: first taught on Day 13x.** Nothing
before Week 7 decodes a signed bit pattern: Day 10's signed-counter task
(`act-i2c-hw-t2`) routes *around* the encoding with `abs()` and a printed
minus sign, and no chapter teaches bit-level signed representation. The
left-justified 16-bit framing is new **on top of a new idea** — budget it as
first teaching, not recall.

**Floating point / L-2**: the standing rule is no `%f` (off by default; Lab 4
Appendix A shows the flag). Her Day 14 route avoids `%f` entirely — compute in
float, `round()` back to int, print `%d`. The chapter should teach the same
route and carry the one-line caveat (students will try `%f` in Lab 7), marked
`<!-- check-rules: allow L-2 -->` where the caveat itself is taught. Decided
deliberately at Gate 1 (the week prompt requires it).

**Deferred-topics list** (`CHAPTER_PROCESS.md`): both entries spent; nothing
pending lands this week. Week5-map flag 20 (NACK-reporting write) reopens via
§2a.

**Downstream of this week**: Day 15+ (servos) and Lab 8 assume the driver
pattern is now routine; nothing else identified.

---

## §6 Figure manifest (P-12) — every image, with a decision

Extractions already in `assets/images/Day13-I2C(3)/`, `Day13x-Accelerometer/`,
`Day14-Accelerometer(2)/` (mix of plain `slideNN_imgN` pulls and hash-named
rebuilds). "Rebuild" = `pptx_annotate.py --max-text 200`, then **look at it**;
where the composite disagrees with the original, ask for the original.

| Deck slide | What | Decision |
| --- | --- | --- |
| 13/5 | I2C bus diagram (controller, peripherals, pullups) | Prefer ch-i2c's existing protocol figures via xref; only rebuild if the plan keeps a recap figure |
| 13/6 | Protocol walk figure | Same — ch-i2c already owns this teaching |
| 13/8 | Breakout photo + STEMMA wiring (2 images, color callouts) | **Rebuild with annotations** — this is the week's wiring figure |
| 13/9 | Full test-setup "photo" | **CORRECTED on inspection (session 2): not a photo — a stale Fritzing diagram whose sensor is an MPU-6050, red lead on a 5 V pin.  NOT USED.**  A real setup photo (breakout + STEMMA, the SCL/SDA rows with the display still on them, 3.3 V and GND feeds, the AD2's DIO leads landed) is on the ask-Petra list |
| 13/14–15/25 | AD2 digital-channel wiring (4 images, "Connect me!" callout) | **CORRECTED on inspection (session 2): two of the four images are unusable (an ADALM2000 pinout — wrong instrument; an Arduino UNO + MPU-6050 Fritzing).  The clean AD2-with-bundle product photo (slide14_img4) IS used, as `ad2_digital_bundle.png` in `fig-ad2-digital-wiring`; the Waveforms steps are Day 9x's `fig-waveforms-decode` by refPage** |
| 13/19–21 | Waveforms captures A/B/C | Her originals cropped to the trace rows (`waveforms_capture_a/b/c.png`).  **A is re-cut tight to its one transaction (x 0–1300 of the original) and reads well projected; B and C fill their frames and still project below the legibility floor — a re-export with taller signal rows is on the ask-Petra list.**  Note her captures are at **50 µs/div**, not Day 9x's 20 — Gate 2′ made this a taught change |
| 13/27 | Firmware layers | **Do not rebuild** — xref `fig-firmware-layers` in ch-i2c |
| 13/29 | I2C write/read transfer patterns (annotated) | Rebuild; also `i2c_transfer_pattern.svg` already exists in the Day 13 image dir — check it first |
| 13x/3 | Mass-spring-case diagram | Rebuild with labels (rough chapter uses plain pull) |
| 13x/4 | Capacitive displacement diagram | Rebuild |
| 13x/5 | MEMS micrograph + mechanism (2 images) | Rebuild; watch the multi-picture composite trap |
| 13x/7 | LSM303AGR block diagram | Rebuild (callout "we only use the accelerometer") |
| 13x/8 | Datasheet spec tables (3 images, callouts: full range / 2^bits, 12/10/8-bit) | Rebuild — this is the Day 13x datasheet moment's figure |
| 13x/9 | Breakout schematic with 4 callouts (pullups, header, regulator, I2C strapping) | Rebuild |
| 13x/17 | ST read-transfer diagram + auto-increment quote | Rebuild (same base as 13/29's read half) |
| 14/6 | CTRL_REG1/4 datasheet tables + "Setting:" callouts (4 images) | Rebuild — these are the homework-reveal figures; instructor-only candidates |
| 14/9 | Table 20 write-transfer image | Rebuild or reuse 13/29's write half |
| 14/13 | CoolTerm chart-view setup screenshot | Keep as-is; verify menu path on current CoolTerm (question 7) |
| 14/15 | Serial-plotter trace screenshot | Keep as-is |
| 14/17 | AN-1057 tilt geometry (2 images) | Rebuild with the formula callouts |
| all/1 | Course logo slides | Drop |

---

## §7 The rough chapter — what is wrong in it (assume nothing else is right)

`source/ch-accelerometers.ptx` (447 lines) was assembled from raw extraction.
Defects found on this read; none of its prose survives into the rebuild
without checking:

1. **"±2g full-scale and 12-bit low-power mode"** (`fig-lsm303agr-specs`
   caption) — wrong: low-power is 8-bit; her settings (CTRL4 = 0x00) select
   **normal 10-bit** mode.
2. **"In 12-bit low-power mode, only bits [15:4] are valid"** — same confusion.
3. **CoolTerm "Connection → Serial Plotter"** — her slide says **View → View
   Chart**. Verify the real menu (question 7).
4. **`sinf()`/`asinf()`** — Lab 7 and the course use `atan2()`; the asin route
   is the one AN-1057 shows *fails* near 90°.
5. **"tilt display updating at 100 Hz… easily fast enough"** — invented
   number; her slide says `delay_ms(100)` for *plotting*, and no such claim
   about float throughput exists in any source.
6. "7-bit address 0x19" — true, but stated flat where her arc makes deriving
   it from `0x32 >> 1` a puzzle (slide 24). Preserve the discovery (P-15).
7. The reading questions and Canvas-quiz block are unvetted; the proper-
   acceleration framing ("+1 g when sitting still") is plausible and worth
   keeping **if verified** — her decks never state it this way; her framing is
   simpler (measure gravity's projection; suggested tests show ±1000 mg). Gate
   1 should weigh whether the proper-acceleration/free-fall subtlety stays in
   the reading (it is good physics and good motivation — free-fall laptop
   protection depends on it — but it is our addition, not hers; flag to
   Petra rather than silently keeping or cutting, question 8).
8. Existing `xml:id`s (`sec-accel-concepts`, `fig-accel-proof-mass`, …) may be
   reused or renamed during the rebuild — rewrite-scar rules apply (rename in
   its own commit, repoint deck refs in the same commit).

---

## §8 Reuse traps confirmed present in these decks

- **Arduino**: Day 13 slide 16 speaker note says "hit reset on the Arduino" —
  stale, from the course's Arduino era; the board is the Nucleo. Day 13/13x
  prototype slides say "names are borrowed from Adafruit's driver for the
  Arduino" — drop (B-11e). No Scopy references found. No Williams references
  found in any of the three decks.
- **Pasted-AI residue**: Day 13x slide 5 and 6 speaker notes contain mangled
  LaTeX (`C1andC2C_1…`) from a paste; mine ideas only.
- **"master/slave"**: her slide 6 carries the inclusive-language update note;
  the book already says controller/target throughout — keep it that way.
- Her slides say "3.3V-5V" on the breakout power pin (the breakout has a
  regulator). The Nucleo wiring uses **3.3 V**; never write bare 5 V advice
  (standing rule). The breakout's tolerance can be stated only against the
  datasheet/schematic.

---

## §9 Questions for Petra — answered 2026-08-27, one item still open

Her answers, recorded here so no session re-asks:

1. **Datasheet** — ANSWERED: `assets/datasheets/lsm303agr.pdf` is in the
   repo; citations verified against it in §3.
2. **The four real files** — ANSWERED: all four are in `assets/starters/`;
   what they settle (and the stale-comment flags) is §2. `AccelInit` returns
   `uint8_t`; `accel_x/y/z` are `int16_t`.
3. **Wrong-address behavior** — OPEN, at her pace: she will check later, and
   if the NACK-reporting variant (week5 flag 20) works she will switch to it.
   **Do not press this.** The plans are worded true either way; the one
   affected student-facing sentence waits.
4. **HiTA** — ANSWERED: dropped. The Day 14 plan of record stands; the
   restore-path note is retired.
5. **AN-1057** — ANSWERED and DELIVERED: her `AN-1057.pdf` landed
   2026-08-27 and is committed as `assets/datasheets/an-1057.pdf`
   (lowercased to the planned path); linked as
   `external/datasheets/an-1057.pdf`.  Nothing is missing any more.
6. **The breakout** — ANSWERED: Adafruit LSM303AGR Accelerometer Magnetometer
   — STEMMA (product 4413, adafruit.com/product/4413). And her Waveforms
   originals are in the repo (§1, §6).
7. **CoolTerm** — ANSWERED: students will have the newest version. Her
   slide's screenshot is the authority for the chart-view path; session 4
   confirms the menu wording against the current build when writing that
   beat.
8. **Reading framing** — ANSWERED: stick to her decks' framing. The rough
   chapter's proper-acceleration/free-fall hook is **out**; the Day 14
   reading's stationary-reading subsection says what the decks say (the
   sensor reads gravity's projection; flat ≈ +1000 mg, flipped ≈ −1000 mg).
9. **Connector safety** — ANSWERED: **"You can't miswire the STEMMA
   connector, it only goes in one way."** Citable now (her words); the
   Day 13 reading's reassurance and the safety line may state it.
10. **Spares** — ANSWERED: spares exist, **but this must appear nowhere on
    slides or in the book** — she handles the classroom. The rescue ladders
    keep "priority triage" with no mention of spare hardware, and that is
    final, not provisional.
