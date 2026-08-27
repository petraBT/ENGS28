# Day 14 — Finish the driver, see the data, measure tilt

**Thursday, 110 minutes** (Day N with N even is a Thursday — the day-parity
rule in `CLAUDE.md`). Chapter: `source/ch-accelerometers.ptx`. Old deck:
`Day14-Accelerometer(2).pptx` (21 slides). Ground truth:
`plans/week7-ground-truth.md`. Gate 1 applied: `reviews/week7-gate1.md`.

**The HiTA water-bottle activity (her slide 3) is dropped — Petra's call,
2026-08-27 (ground truth Q4, closed).** Its 10 minutes were exactly what
Gate 1 found the first draft of this table over budget by; the table below
is the plan of record, final.

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
  `RegisterWrite` was drafted on paper Tuesday night ("mimic the read
  function"); `AccelInit`'s two register values were derived in the reading
  and committed in Part 2 before any code is touched. A student without the
  paper draft still writes before watching — Part 4 opens each function with
  a silent attempt, against the given `RegisterRead` as the model.
- `accel_test.c` is given whole — the harness is not the exercise (P-16) —
  and is **read before it is run** (Part 5's first beat).
- **Checkpoint at minute 58** (end of Part 5): a student not yet streaming
  gets the completed driver file and rejoins. The handoff is **one-to-one,
  not announced**, and that student still runs their own board through the
  rest of Part 5–7's tests — they personally see the +1000 mg and the sign
  flip; what they did not finish is the write logic, whose reveal already
  graded their paper version. Say this plainly in the instructor notes.
- The diagnostic ladder distinguishes the three failure layers by their
  symptoms: WHOAMI fails too → hardware — re-seat against the photo, **and a
  second re-seat failure is not a software problem and the checkpoint file
  will not fix it: it gets priority triage during Parts 3–5's worktime**;
  WHOAMI passes but init prints failure or the CTRL readback is wrong → the
  write path (their new code — check the paper version against the reveal);
  everything prints but values are nonsense → scaling (yesterday's formula,
  not today's code). The AD2 stays the instrument of last resort, as on
  Day 13.

## The STRETCH

Her "suggested tests" ladder is naturally tiered: flip and rotate (everyone,
Part 5) → the plotting experiments (raise/lower periodically, shake, bang the
table — Part 7) → try all three resolution modes (re-derive CTRL_REG1 for
low-power and high-resolution, watch the noise floor change) → start Lab 7's
tilt early: compute θ = atan2(ax, ay) on paper from your own numbers — hold
the board upright, like a phone, so gravity lies in the x–y plane.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 2 (agenda) | deck glue |
| 3 (HiTA water-bottle activity) | **cut — Petra, 2026-08-27** (Q4 closed) |
| 5–6 (CTRL settings discussion + answers 0x77/0x00) | Part 2 |
| 7–8 (download partial + test; exclude whoami; complete two functions) | Parts 3–4 |
| 9 (RegisterWrite reveal) | Part 4 |
| 10 (accel_test.c walk) | Part 5, first beat |
| 11 (suggested tests; rename → mylib) | Parts 5–6 |
| 13 (CoolTerm chart setup) | Part 7 |
| 14–15 (plot experiments; plotter shot) | Part 7 |
| 17 (tilt geometry, AN-1057) | Part 8 |
| 18 ("looks like we need floating point…") | Part 8 → 9 hinge |
| 19 (data format recap) | head of Part 9, one beat (B-8) — the integer before-picture for the float recast |
| 20 (floating point) | Part 9 |
| 21 (Lab 7) | Part 10 |
| 4, 12, 16 (section dividers) | deck glue |

## Activity sequence (110 min; every Part's row equals the sum of its beats)

Part numbers 2–10 are kept from the pre-Gate-1 draft (Part 1 is the cut HiTA
slot), so cross-references in `plans/week7.md` stay valid.

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 2 | 10 | do → reveal | **The settings, committed then revealed.** The CTRL_REG1/4 bit-field tables go on screen for sixty seconds first — *if you didn't finish the scavenger hunt, take your best guess from this table now* (1). The commit, `room="yes"`: *what byte goes in CTRL_REG1_A? In CTRL_REG4_A?* (4). The reveal on the same tables: 0b01110111 (rate, normal mode, all three axes on) and 0b00000000 (±2 g, normal resolution) — 10-bit, yesterday's sensitivity, and yesterday's 3.9 mg sensitivity named, not re-derived — Day 13x owns that (the datasheet's Table 3 prints 3.9; only her old slide's callout rounded it to 4) (5) |
| 3 | 8 | do | **Wiring verified, project staged.** Run Tuesday's `whoami_test.c` unchanged — hardware-vs-software split established (3). Download `lsm303agr_partial.c` + `accel_test.c` into `Src`; **exclude `whoami_test.c` from the build** — one `main` per build, how to exclude a file, and one displayed line: *if the build fails with `multiple definition of 'main'`, you skipped this step — here is the menu path* (5) |
| 4 | 17 | do → reveal | **Complete the driver.** What the partial file gives and what is blank — **verified against the real `lsm303agr_partial.c` (in `assets/starters/`, 2026-08-27)**: RegisterRead given; RegisterWrite's body entirely blank; AccelInit given whole except the two register values (her intent comments beside each blank); ReadRaw given (2). `RegisterWrite`: **two minutes' silent attempt** — from Tuesday's paper draft, or fresh against `RegisterRead` as the model — then the reveal: one `i2c1_memWrite()` call, the write transfer they captured Tuesday (datasheet §6.1.1, Table 20) (2+4). `AccelInit`: fill the two committed values; the WHOAMI check and the `uint8_t` 0/1 return are given code — one beat on what that return reports and how `accel_test.c` uses it (9) |
| 5 | 18 | do | **Run it — CRUCIAL.** First, **read `accel_test.c` before you run it**: the init check, the two CTRL readbacks — proof the writes landed, and the ladder's probe — the scaling line `accel_x = (ACC_FS * accel_raw.x * MILLI) >> ACC_REGISTERWIDTH` (yesterday's #defines in C, `>>16` where the formula said ÷2¹⁶; the variables are `int16_t` — the big product lives only inside the promoted arithmetic), and the paired print lines: **the raw values in hex beside the converted mg** — yesterday's left-justified reading and its conversion, side by side on every line of output (3). Build, run: the init line, the readbacks, live x/y/z in mg (6). The tests: at rest ≈ +1000 mg on z; flip → −1000; rotate to move g between axes (5). Checkpoint minute 58; ladder on screen throughout (4) |
| 6 | 6 | do | **Make it a library.** Rename `lsm303agr_partial.c` → `lsm303agr.c`, move to `mylib`, delete from `Src`, rebuild, re-run — Day 10's discipline, second device (6) |
| 7 | 12 | do | **Plot it.** Swap the prints for `printf("%d,%d,%d\n\r", …)`, `delay_ms(100)` (3). CoolTerm's chart view — new tool, shown from her setup shot (3). Experiments: flip, rotate, raise-and-lower periodically, shake, bang the table — what does each look like? (6) |
| 8 | 11 | predict → explain | **Tilt.** Commit, `room="yes"`: *the board tilts 30° — which readings change, and how?* (3). The geometry from AN-1057: one axis, θ = arcsin(ax/g) — and the mechanism, not just the verdict: Aₓ = g sin θ *flattens* as θ→90° (its slope, g cos θ, goes to zero there), so a fixed amount of sensor noise barely moves θ near 0° but can swing the computed angle by tens of degrees near 90°; and no full circle (4). Two axes: θ = the arctangent of ax/ay — constant sensitivity, full 360° if the quadrant is handled, which is exactly what C's `atan2()` is for. One clause: ax and ay are the mg numbers already on your screen — the angle comes out the same from the raw values (4) |
| 9 | 13 | explain → do | **Floating point, honestly.** The data-format recap, one beat — the integer picture, with its `>>16`, that the float version is about to replace (1). Sine and arctangent need real arithmetic: `float`, `math.h` (2). One recall before the commit: *`uart.c`'s BRR line — `/` between two integers throws away the remainder; that is what is about to bite this formula.* Then the commit, `room="yes"`: *`raw * 4 / 65536` — where must the `(float)` go, and why?* (4). **Land the answer**: `(float)raw * 4 / 65536` — casting `raw * 4` after the fact is too late, the damage is done in integer math. Then `round()` back to `int` for printing and the display — recall Day 5's no-`%f` rule; the new piece is `round()` instead of Day 5's truncating cast — marked `allow L-2` (3). What it costs: no FPU — no dedicated hardware circuit for float math — so it is done in software: slower, and bigger in flash, which Lab 7 asks you to measure (3) |
| 10 | 5 | tell | **Lab 7.** Both devices on one bus (Tuesday's question, now graded); tilt from −180° to 180° with `atan2` and `round`; the orientation LEDs are the lab's own design problem. Homework = the pre-lab, which the room just did (5) |
| — | 5 | — | **Lab-start buffer**: begin Lab 7 wiring (the shared bus) with help in the room; absorbs overrun from Parts 4–5 |

Total: 3+2+10+8+17+18+6+12+11+13+5+5 = **110**. Checkpoint: end of Part 5 =
3+2+10+8+17+18 = minute **58**.

**Part 2's budget assumes the reading was done**; its first beat is the
mitigation for the fraction of the room where it wasn't. **If a part
overruns, cut in this order:** the lab-start buffer → Part 7's experiments to
flip-and-shake → Part 8's single-axis contrast compressed (state, don't
derive, why atan2 wins) — and if the room visibly did not do the paper
homework, treat Part 4 as needing the full buffer. **Never cut** Parts 4–5
(the crucial step) or Part 9's cast-and-round mechanics — Lab 7's
Deliverable 3 dies without them; and never cut Part 3's build-exclusion beat,
because a two-`main` project fails with a linker error no student has seen
before.

## Datasheet moments (P-11)

1. **Part 2**: the CTRL_REG1_A / CTRL_REG4_A bit-field tables — settings
   *derived*, field by field, from the reading's scavenger hunt. Verified
   against `assets/datasheets/lsm303agr.pdf`: **§8.6, Tables 33–35 (p. 47)**
   for CTRL_REG1_A (Table 35 is the data-rate table the 0b0111 = 400 Hz
   derivation reads) and **§8.9, Tables 41–42 (p. 49)** for CTRL_REG4_A.
2. **Part 4**: **§6.1.1, Table 20 (p. 38)** — the register-write transfer —
   connected to Tuesday's captured write pattern.

## Writing room (S-2)

- Part 2: the two CTRL bytes — committed from the reading (or the sixty-second
  table look) before the reveal.
- Part 8: *which readings change when the board tilts?* — committed before
  the geometry.
- Part 9: *where must the cast go?* — committed after the truncation recall,
  before the answer is landed; the classic silent-integer-division bug, met
  on paper instead of in Lab 7.

## Hand-offs

**Pre-class reading (B-2):** the datasheet scavenger hunt — the CTRL_REG1/4
bit fields, with the reading quiz asking lookup questions (her design; the
*answers* 0x77/0x00 are revealed in class, not printed in the reading); plus
one short subsection on what a stationary accelerometer reads (±1000 mg,
flipped goes negative — **her decks' framing, Petra's call 2026-08-27, Q8
closed**; the rough chapter's proper-acceleration/free-fall hook is out).
**Must not contain:** the completed `AccelInit`
or `RegisterWrite` bodies, or the tilt geometry (Part 8's commit dies).

**Homework:** Lab 7's pre-lab — which is this class. Students leave with it
done or with the checkpoint rescue and a working reference driver.

**Lab 7 needs (P-13 — checked, not taught):** the driver (D1), the shared-bus
answer and bus sniffing (D2), tilt trig + `atan2` + `round()` + `math.h`
(D3), the flash-size observation (D4). The orientation logic (D5) is
deliberately untaught — axes and signs are in hand; the design is the lab's.
