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
| Inherits from | Days 9x/10, entirely (I2C, the library, the analyzer, the driver discipline) | Day 13 — the physics is derived in class from F = ma and F = kx; no physics prerequisite assumed | Days 13 and 13x, plus Day 10's library discipline |
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
  complement reading — a negative one — to milli-g on paper, and can say why
  <em>a = FS·raw/2¹⁶</em> works in all three resolution modes. (Two's
  complement is **first taught** here — Gate 1 established that nothing
  earlier in the course decodes a signed bit pattern.)
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
  depend on) — **in her decks' framing** (Petra, 2026-08-27, Q8 closed; the
  rough chapter's proper-acceleration hook is out). Table/section citations
  verified against `assets/datasheets/lsm303agr.pdf` (Q1 closed).

## Where the driver-writing lands (a Gate 1 exhibit)

Split across the week exactly as her decks do it:

| Function | Written | By whom |
| --- | --- | --- |
| `lsm303_AccelRegisterRead` | given (inside `whoami_test.c`, runs Day 13) | Petra |
| `lsm303_AccelRegisterWrite` | homework after Day 13, **on paper** ("mimic the read function"); revealed Day 14 Part 4 | student |
| `lsm303_AccelInit` | settings derived in Day 14's reading + Part 2; body completed Day 14 Part 4 | student |
| `lsm303_AccelReadRaw` | given; walked on Day 13x (auto-increment is its teaching payload) | Petra |

**Q2 is closed** (2026-08-27): all four real files are in `assets/starters/`
and verified — `RegisterWrite`'s body is entirely blank; `AccelInit` is given
whole except the two register values (Day 14 Part 4's 17-minute shape matches
the file exactly, so the provisional marker is retired); `AccelInit` returns
`uint8_t`; `accel_x/y/z` are `int16_t`. Details and the stale-comment flags
are ground truth §2.

## The L-2 floating-point decision (a Gate 1 exhibit)

Day 14 Part 9 teaches float arithmetic because tilt needs real math
(`atan2`, `math.h`), and it teaches Petra's route around `%f`: compute in
float, `round()` back to integers, print with `%d`. The one-line caveat that
`printf` does not print floats by default (Lab 4 Appendix A shows the
enabling flag) is taught **there, once**, and that element is marked
`<!-- check-rules: allow L-2 -->` — and it is a **delta on Day 5**, which
already taught the no-`%f` rule in ch-uart; the new piece is `round()` in
place of Day 5's truncating cast. No `%f` appears anywhere in the chapter.
The deeper material is Reference-section depth, not in-class prose (the
Day 12 lesson applied in advance): IEEE 754 layout; precision-vs-range said
precisely (`int32_t` is *exact* over its full ±2³¹ range, `float` carries
~24 significant bits of relative precision with an exponent spanning
~10⁻³⁸ to 10³⁸ — traded against the same 32 bits, not two free lunches);
and the signed-shift note (`>>` on a signed value is an arithmetic floor
shift, not interchangeable with `/` — `accel_test.c` multiplies by 4000
before shifting 16, so a hand check of a negative reading can land 1 mg off
CoolTerm's). **Not** Reference material: code size — Day 14 Part 9 teaches
it and Lab 7 Deliverable 4 grades it.

## Week-level risks and their costs

1. **The wrong-address hang** (ground truth §2a). Week 5 established the
   library hangs after a NACK; that makes Day 13's capture-A exercise a
   *single-shot* capture (trigger armed, then reset the board) and makes
   `whoami_test.c`'s "Could not connect" print unreachable for an absent
   device. Petra will check at her own pace (2026-08-27) and may switch the
   library to the NACK-reporting variant — **do not press it**; the plans
   teach the single-sweep-then-reset technique and **do not assert** in
   student-facing text what the program prints in that case. Her capture A
   (one transaction, then nothing) is consistent with the hang.
2. **Day 13x is the densest 50 minutes of the week** — physics, applications,
   the datasheet table, and the data format. The cut order is inside its plan;
   the data-format part is uncuttable (Day 14's scaling line and Lab 7's tilt
   both stand on it).
3. **The HiTA water-bottle activity** (Day 14 slide 3) is **dropped —
   Petra's call, 2026-08-27** (Q4 closed). The Day 14 table is final.
4. **Missing artifacts — mostly resolved 2026-08-27**: the datasheet
   (`assets/datasheets/lsm303agr.pdf`, citations verified), the four driver
   files (`assets/starters/`), and her three Waveforms capture originals
   (`assets/images/Day13-I2C(3)/`) are all in the repo. Still missing:
   **AN-1057** — approved for hosting, but analog.com refuses downloads from
   this network; Petra drops it into `assets/datasheets/an-1057.pdf`.

## Week-level cut order

Day 13's capture-B variant (wrong register) to instructor demo → Day 13x's
applications part to a single example → Day 14's plotting experiments
trimmed (flip and shake only). (HiTA is already out of the plan of record,
and Gate 1 spent Day 13x's applications/schematic cuts funding its Parts 1
and 4 — the remaining slack is thin and named per day.) **Not cuttable**:
Day 13's WHOAMI + capture-C and the two-kinds-of-NACK explanation, Day 13x's
data format and its Part 5 (the homework setup), Day 14's driver completion
and test, the tilt trig, and the float mechanics (Lab 7 needs every one).

## Hand-offs to Lab 7, checked (P-13 — constraint, not goal)

| Lab 7 asks | The week teaches it |
| --- | --- |
| D1: the driver | Day 14 Parts 4–6 (crucial step) |
| D2: two devices, one bus; bus sniffing | Day 13 Part 1 (the keep-the-display answer) + Part 4 (the decoder, routine by now) |
| D3: tilt via `atan2`, round(), math.h | Day 14 Parts 8–9 (class teaches the trig and the float mechanics; the lab does the implementation) |
| D4: accuracy, program size | Day 14 Part 9 names the no-FPU/flash cost |
| D5: orientation LEDs | class teaches axes and signs only; the LED logic is the lab's own design work — deliberately untaught |
