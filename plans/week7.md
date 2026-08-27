# Week 7 — Days 13, 13x, 14: the accelerometer

One chapter: `source/ch-accelerometers.ptx` (rough; nothing in it is trusted —
see ground truth §7). Old decks: `Day13-I2C(3).pptx` (32 slides),
`Day13x-Accelerometer.pptx` (19), `Day14-Accelerometer(2).pptx` (21).
Ground truth: `plans/week7-ground-truth.md`. Downstream: **Lab 7**.

Day plans: `plans/day13.md`, `plans/day13x.md`, `plans/day14.md`.

**Class lengths, from the day-parity rule** (stated because the 65-minute error
has been made three times): Day 13 is odd → Tuesday, **110 min**. Day 13x is an
x-day → Wednesday, **50 min**. Day 14 is even → Thursday, **110 min**.

---

## The shape of the week

| | Day 13 | Day 13x | Day 14 |
|---|---|---|---|
| Topic | The LSM303AGR as an I2C device | What a MEMS accelerometer *is* | Finish the driver; see data; tilt |
| New machinery | none — a new *device* on known machinery | the sensor physics and its data format | two driver functions, CoolTerm's chart, float arithmetic |
| What students build | a verified I2C link (WHOAMI = 0x33), and their own captured, decoded trace of it | a by-hand raw→mg conversion | their own working driver streaming live x/y/z |
| Load lands on | doing and debugging | concepts and arithmetic | production |
| Inherits from | Days 9x/10, entirely (I2C, the library, the analyzer, the driver discipline) | Day 13, plus Phys 13/Engs 22 mass-spring intuition | Days 13 and 13x, plus Day 10's library discipline |
| Pre-class reading | yes — I2C recall + meet the device | **none — x-day** | yes — the datasheet scavenger hunt (her "daily page readings") |

**The ordering is hers and deliberate: use the device Tuesday, learn how it
works inside Wednesday, put it to work Thursday.** Day 13's deck is titled
"I2C(3)" because it is the third I2C day; it lives in this chapter by Petra's
explicit call. A topic-logical rewrite that opens on MEMS physics is the arc
destruction `checker-arc-fidelity` exists to catch.

Unlike Week 5, this week has **no hard pivot**: each day hands the next exactly
what it needs. The corresponding risk is different — a stumble on Tuesday
(wiring, WHOAMI never reads 0x33) cascades, so Day 13 carries the week's
heaviest diagnostic scaffolding, and Days 14's opening verifies rather than
assumes Tuesday's wiring survived (the Week 5 standing rule).

## Crucial steps

- **Day 13** — every student's board prints "Accelerometer initialized!" from
  `whoami_test.c` over their own wiring, and every student captures that
  transaction on the AD2 and reads the shifted address (0x19), the register
  address (0x0F), and the returned 0x33 off the decoded trace.
- **Day 13x** — every student converts a raw 16-bit left-justified two's
  complement reading to milli-g on paper, and can say why
  <em>a = FS·raw/2¹⁶</em> works in all three resolution modes.
- **Day 14** — every student's own completed driver streams live x/y/z
  accelerations in mg to CoolTerm: ≈ +1000 mg on the downward axis, and
  flipping the board flips the sign.

Day 14's crucial step is **verbatim Lab 7's pre-lab** ("complete the
accelerometer device driver and acquire raw acceleration data").

## What each day owes the next

```
Day 9x  ── Waveforms logic mode + I2C decoder ──►  Day 13 Part 4 (recall, then routine)
Day 10  ── driver discipline, memWrite, layers ──►  Day 13 Part 7, Day 14 Parts 4/6
Day 13  ── wired sensor + verified bus ─────────►  Day 14 Part 5 (verified, not assumed)
Day 13  ── RegisterRead running; RegisterWrite on paper ──►  Day 14 Part 4
Day 13x ── CTRL_REG1/4 homework question ───────►  Day 14 Part 2 (commit → reveal)
Day 13x ── raw→mg formula ──────────────────────►  Day 14 accel_test.c's scaling line
Day 14  ── working driver + tilt trig + atan2 ──►  Lab 7 (D1, D3); shared-bus answer ──► D2
```

The display stays wired all week (Day 13 slide 4's question; the answer the
week lands is *no, leave it — same bus, different addresses*), because Lab 7
Deliverable 2 puts both devices on one bus.

## The reading split (a Gate 1 exhibit)

- **Day 13 Before Class**: short. Recall I2C in one page — the bus, the five
  library operations by name — leaning on `<xref>` to `ch-i2c`'s Reference
  rather than re-teaching (B-8); then meet the LSM303AGR: an I2C sensor on a
  STEMMA QT breakout, it has a WHO_AM_I register and why such a register
  exists. **Must not contain**: MEMS internals (Wednesday's material — the
  use-first ordering dies), the 0x19 derivation (Part 5's discussion), or any
  trace walkthrough (Part 4's prediction dies).
- **Day 13x**: none. x-days have no pre-class reading. The MEMS physics is
  taught in class, from her slides.
- **Day 14 Before Class**: the datasheet scavenger hunt — her design ("the
  reading quiz gives you a scavenger hunt through the data sheet"): find the
  CTRL_REG1/4 fields and *work out* the settings (the answers 0x77/0x00 are
  revealed in class, not in the reading); plus one short subsection on what a
  stationary accelerometer reads (the ±1000 mg expectation Part 5's tests
  depend on) — pending Petra's answer on the proper-acceleration framing
  (ground truth Q8). Blocked on the datasheet PDF (Q1) for exact
  table/section citations, not for the plan.

## Where the driver-writing lands (a Gate 1 exhibit)

Split across the week exactly as her decks do it:

| Function | Written | By whom |
| --- | --- | --- |
| `lsm303_AccelRegisterRead` | given (inside `whoami_test.c`, runs Day 13) | Petra |
| `lsm303_AccelRegisterWrite` | homework after Day 13, **on paper** ("mimic the read function"); revealed Day 14 Part 4 | student |
| `lsm303_AccelInit` | settings derived in Day 14's reading + Part 2; body completed Day 14 Part 4 | student |
| `lsm303_AccelReadRaw` | given; walked on Day 13x (auto-increment is its teaching payload) | Petra |

The exact given-vs-blank split in `lsm303agr_partial.c` is unverified until
the real file arrives (ground truth Q2) — Day 14's plan marks Part 4
provisional on it.

## The L-2 floating-point decision (a Gate 1 exhibit)

Day 14 Part 9 teaches float arithmetic because tilt needs real math
(`atan2`, `math.h`), and it teaches Petra's route around `%f`: compute in
float, `round()` back to integers, print with `%d`. The one-line caveat that
`printf` does not print floats by default (Lab 4 Appendix A shows the
enabling flag) is taught **there, once**, and that element is marked
`<!-- check-rules: allow L-2 -->`. No `%f` appears anywhere in the chapter.
The deeper material — IEEE 754 layout, precision-vs-range, code size — is
Reference-section depth, not in-class prose (the Day 12 lesson applied in
advance).

## Week-level risks and their costs

1. **The wrong-address hang** (ground truth §2a). Week 5 established the
   library hangs after a NACK; that makes Day 13's capture-A exercise a
   *single-shot* capture (trigger armed, then reset the board) and makes
   `whoami_test.c`'s "Could not connect" print unreachable for an absent
   device. Until Petra confirms (Q3), the plans teach the wrong-address
   experiment with the single-sweep-then-reset technique and **do not assert**
   in student-facing text what the program prints in that case.
2. **Day 13x is the densest 50 minutes of the week** — physics, applications,
   the datasheet table, and the data format. The cut order is inside its plan;
   the data-format part is uncuttable (Day 14's scaling line and Lab 7's tilt
   both stand on it).
3. **The HiTA water-bottle activity** (Day 14 slide 3) is ~10 unbudgeted
   minutes; provisionally budgeted, question 4 pending. If cut, its minutes
   fall to Part 5/lab-start time.
4. **Missing artifacts**: the LSM303AGR datasheet PDF, the four driver files,
   AN-1057 (questions 1, 2, 5). None blocks the plans; all block book
   listings and P-11 citations.

## Week-level cut order

Day 14's HiTA activity (pending Q4 anyway) → Day 13's capture-B variant
(wrong register) to instructor demo → Day 13x's applications part compressed
to three examples → Day 14's plotting experiments trimmed (flip and shake
only). **Not cuttable**: Day 13's WHOAMI + capture-C, Day 13x's data format,
Day 14's driver completion and test, the tilt trig, and the float mechanics
(Lab 7 needs every one).

## Hand-offs to Lab 7, checked (P-13 — constraint, not goal)

| Lab 7 asks | The week teaches it |
| --- | --- |
| D1: the driver | Day 14 Parts 4–6 (crucial step) |
| D2: two devices, one bus; bus sniffing | Day 13 Part 1 (the keep-the-display answer) + Part 4 (the decoder, routine by now) |
| D3: tilt via `atan2`, round(), math.h | Day 14 Parts 8–9 (class teaches the trig and the float mechanics; the lab does the implementation) |
| D4: accuracy, program size | Day 14 Part 9 names the no-FPU/flash cost |
| D5: orientation LEDs | class teaches axes and signs only; the LED logic is the lab's own design work — deliberately untaught |
