# Day 14 — Finish the driver, see the data, measure tilt

**Thursday, 110 minutes** (Day N with N even is a Thursday — the day-parity
rule in `CLAUDE.md`). Chapter: `source/ch-accelerometers.ptx`. Old deck:
`Day14-Accelerometer(2).pptx` (21 slides). Ground truth:
`plans/week7-ground-truth.md`.

## Objectives

By the end of class a student can:

1. Derive the CTRL_REG1_A and CTRL_REG4_A settings from the datasheet's
   bit-field tables and say what mode, rate, and range they select.
2. Complete a device driver from a partial file: implement `AccelInit` and
   `AccelRegisterWrite` using only the I2C library, and test it with a given
   test program.
3. Promote a working driver into a library: rename, move to `mylib`, rebuild —
   and manage a project's build configuration (exclude a stale test `main`).
4. Stream and plot live sensor data (CoolTerm's chart view) and interpret it:
   ±1000 mg at rest, sign flips, shock and vibration signatures.
5. Explain how tilt follows from gravity's projection — why the two-axis
   arctangent beats the single-axis arcsine — and what computing it costs on a
   chip with no FPU (software floats, `math.h`, `round()` back to integers).

## The CRUCIAL step

> **Every student's own completed driver streams live x/y/z accelerations in
> mg to CoolTerm: ≈ +1000 mg on the downward axis, and flipping the board
> flips the sign.**

This is verbatim Lab 7's pre-lab. Scaffolding (P-2):

- The day opens by **verifying Tuesday's wiring before depending on it**
  (the Week 5 standing rule): run `whoami_test.c` unchanged — if it still
  prints, the hardware is fine and everything after is software.
- The two functions students write were both **staged in advance**:
  `RegisterWrite` was written on paper Tuesday night ("mimic the read
  function"); `AccelInit`'s two register values were derived in the reading
  and committed in Part 2 before any code is touched.
- `accel_test.c` is given whole — the harness is not the exercise (P-16).
- **Checkpoint at minute 60** (end of Part 5): a student not yet streaming
  gets the completed driver file and rejoins; their own paper versions are
  graded by the room's reveal, not by the clock.
- The diagnostic ladder distinguishes the three failure layers by their
  symptoms: WHOAMI fails too → hardware (re-seat against the photo); WHOAMI
  passes, init prints failure or the CTRL readback is wrong → the write path
  (their new code — check the paper version against the reveal); everything
  prints but values are nonsense → scaling (yesterday's formula, not today's
  code). The AD2 stays the instrument of last resort, as on Day 13.

## The STRETCH

Her "suggested tests" ladder is naturally tiered: flip and rotate (everyone,
Part 5) → the plotting experiments (raise/lower periodically, shake, bang the
table — Part 7) → try all three resolution modes (re-derive CTRL_REG1 for
low-power and high-resolution, watch the noise floor change) → start Lab 7's
tilt early: compute θ = atan2(ax, az) on paper from your own resting numbers.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 2 (agenda) | deck glue |
| 3 (HiTA water-bottle activity) | Part 1 — **provisional, pending Petra (ground truth Q4)** |
| 5–6 (CTRL settings discussion + answers 0x77/0x00) | Part 2 |
| 7–8 (download partial + test; exclude whoami; complete two functions) | Parts 3–4 |
| 9 (RegisterWrite reveal) | Part 4 |
| 10 (accel_test.c walk) | Part 4 |
| 11 (suggested tests; rename → mylib) | Parts 5–6 |
| 13 (CoolTerm chart setup) | Part 7 |
| 14–15 (plot experiments; plotter shot) | Part 7 |
| 17 (tilt geometry, AN-1057) | Part 8 |
| 18 ("looks like we need floating point…") | Part 8 → 9 hinge |
| 19 (data format recap) | recalled inside Part 8, one beat, not re-taught (B-8) |
| 20 (floating point) | Part 9 |
| 21 (Lab 7) | Part 10 |
| 4, 12, 16 (section dividers) | deck glue |

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 10 | do | **HiTA water-bottle activity** (her slide 3): table groups reverse-engineer the Thayer filling stations — sensors, actuators, displays, block diagram. *Provisional: content, length, and whether it stays are Petra's call (Q4); its minutes fall to Part 5 and lab-start time if cut* |
| 2 | 10 | do → reveal | **The settings, committed then revealed.** From the reading's scavenger hunt: *what byte goes in CTRL_REG1_A? In CTRL_REG4_A?* — committed, `room="yes"` (4). Reveal on the datasheet's bit tables: 0b01110111 (rate, normal mode, all three axes on) and 0b00000000 (±2 g, normal resolution) — and what that pair selects: 10-bit, so 3.9 mg sensitivity, yesterday's number (6) |
| 3 | 8 | do | **Wiring verified, project staged.** Run Tuesday's `whoami_test.c` unchanged — hardware-vs-software split established (3). Download `lsm303agr_partial.c` + `accel_test.c` into `Src`; **exclude `whoami_test.c` from the build** — one `main` per build, and how to exclude a file (5) |
| 4 | 17 | do → reveal | **Complete the driver.** What the partial file gives and what is blank (2). `RegisterWrite`: implement from Tuesday's paper version; reveal — one `i2c1_memWrite()` call, the write transfer they captured Tuesday (datasheet Table 20) (6). `AccelInit`: write the two committed values through their own `RegisterWrite`; what the return value reports (per the real skeleton — *provisional until the file arrives, Q2*) (9) |
| 5 | 15 | do | **Run it — CRUCIAL.** `accel_test.c` builds, CoolTerm shows the init line, the CTRL readbacks, then live x/y/z in mg (6). The tests: at rest ≈ +1000 mg on z; flip → −1000; rotate to move g between axes (5). Checkpoint minute 60; ladder on screen throughout (4) |
| 6 | 6 | do | **Make it a library.** Rename `lsm303agr_partial.c` → `lsm303agr.c`, move to `mylib`, delete from `Src`, rebuild, re-run — Day 10's discipline, second device (6) |
| 7 | 12 | do | **Plot it.** Swap the prints for `printf("%d,%d,%d\n\r", …)`, `delay_ms(100)` (3). CoolTerm's chart view — new tool, shown from her setup shot (3). Experiments: flip, rotate, raise-and-lower periodically, shake, bang the table — what does each look like? (6) |
| 8 | 12 | predict → explain | **Tilt.** Commit, `room="yes"`: *the board tilts 30° — which readings change, and how?* (3). The geometry from AN-1057: one axis, θ = arcsin(ax/g) — sensitive at 0°, useless at 90°, no full circle (4). Two axes: θ = arctangent of ax/ay — constant sensitivity, full 360° if the quadrant is handled, which is exactly what C's `atan2()` is for (4). One beat of recall: ax and ay come from yesterday's formula (1) |
| 9 | 12 | explain → do | **Floating point, honestly.** Sine and arctangent need real arithmetic: `float`, `math.h` (2). The cast question, committed: *`raw * 4 / 65536` — where must the `(float)` go, and why?* (4). Compute in float, `round()` back to `int` for printing and the display — and the one-line caveat: `printf` does not print floats by default; this course rounds and prints integers (Lab 4 Appendix A has the flag if you ever need it) — **the L-2 decision lands here, marked `allow L-2`** (3). What it costs: no FPU on the STM32C031C6, software arithmetic, slower and bigger in flash — Lab 7 asks for the program size (3) |
| 10 | 5 | tell | **Lab 7.** Both devices on one bus (Tuesday's question, now graded); tilt from −180° to 180° with `atan2` and `round`; the orientation LEDs are the lab's own design problem. Homework = the pre-lab, which the room just did (5) |
| — | 8 | — | **Lab-start buffer**: begin Lab 7 wiring (the shared bus) with help in the room; absorbs overrun from Parts 4–5 |

Total: 3+2+10+10+8+17+15+6+12+12+12+5+8 = **110**.

**If a part overruns, cut in this order:** the lab-start buffer → Part 1 (if
Petra has not already settled it) → Part 7's experiments to flip-and-shake →
Part 8's single-axis contrast compressed (state, don't derive, why atan2
wins). **Never cut** Parts 4–5 (the crucial step) or Part 9's cast-and-round
mechanics — Lab 7's Deliverable 3 dies without them; and never cut Part 3's
build-exclusion beat, because a two-`main` project fails with a linker error
no student has seen before.

## Datasheet moments (P-11)

1. **Part 2**: the CTRL_REG1_A / CTRL_REG4_A bit-field tables — settings
   *derived*, field by field, from the reading's scavenger hunt (her slide 6
   images; exact table numbers pending the PDF, Q1).
2. **Part 4**: Table 20 (the register-write transfer) connected to Tuesday's
   captured write pattern.

## Writing room (S-2)

- Part 2: the two CTRL bytes — committed from the reading before the reveal.
- Part 8: *which readings change when the board tilts?* — committed before
  the geometry.
- Part 9: *where must the cast go?* — committed before the answer; the
  classic silent-integer-division bug, met on paper instead of in Lab 7.

## Hand-offs

**Pre-class reading (B-2):** the datasheet scavenger hunt — the CTRL_REG1/4
bit fields, with the reading quiz asking lookup questions (her design; the
*answers* 0x77/0x00 are revealed in class, not printed in the reading); plus
one short subsection on what a stationary accelerometer reads (±1000 mg and
why — framing pending Q8). **Must not contain:** the completed `AccelInit`
or `RegisterWrite` bodies, or the tilt geometry (Part 8's commit dies).

**Homework:** Lab 7's pre-lab — which is this class. Students leave with it
done or with the checkpoint rescue and a working reference driver.

**Lab 7 needs (P-13 — checked, not taught):** the driver (D1), the shared-bus
answer and bus sniffing (D2), tilt trig + `atan2` + `round()` + `math.h`
(D3), the flash-size observation (D4). The orientation logic (D5) is
deliberately untaught — axes and signs are in hand; the design is the lab's.
