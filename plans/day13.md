# Day 13 — The accelerometer as an I2C device

**Tuesday, 110 minutes** (Day N with N odd is a Tuesday — the day-parity rule
in `CLAUDE.md`). Chapter: `source/ch-accelerometers.ptx`. Old deck:
`Day13-I2C(3).pptx` (32 slides). Ground truth: `plans/week7-ground-truth.md`.

## Objectives

By the end of class a student can:

1. Wire the LSM303AGR breakout to the Nucleo's I2C bus (STEMMA QT: red → 3.3 V,
   black → GND, yellow → SCL/PB8, blue → SDA/PB9) and say why the display can
   stay on the same two wires.
2. Verify an I2C link with a WHO_AM_I read, and explain what a successful 0x33
   proves and what it does not (the bus and address work; nothing yet about
   configuration).
3. Capture an I2C transaction with the AD2's logic analyzer and protocol
   decoder, and read the device address, the register address, and the returned
   data off it.
4. Explain the register-read transfer: why the device address goes onto the
   wire twice, where the register address is sent, and why the value on the
   wire is 0x19 when the header says 0x32.
5. Say what a device driver is made of — the five-step recipe — and where
   `lsm303agr.h`'s structure comes from (the datasheet's register table).

## The CRUCIAL step

> **Every student's board prints "Accelerometer initialized!" from
> `whoami_test.c` over their own wiring, and every student captures that
> transaction on the AD2 and reads 0x19, 0x0F, and 0x33 off the decoded
> trace.**

Scaffolding (P-2):

- The code is **given whole** (`whoami_test.c`) — nobody writes I2C on the day
  they meet a new device. The workflow is the standing one: copy
  `TemplateProject` → `Accelerometer`, file into `Src`, build, CoolTerm.
- The wiring is four STEMMA wires into a breakout that carries its own
  pull-ups and regulator; wiring photo on screen for the whole part.
- The analyzer setup is **Day 9x's own, unchanged**: digital channels, D0
  (pink) → SDA, D1 (green) → SCL, black → GND, falling-edge trigger, single
  sweep, then the I2C decoder. The slide names it as the setup from Day 9x
  rather than teaching it fresh.
- **Checkpoint at minute 35** (end of Part 2): if the room is not mostly
  printing, the rescue splits hardware from software — re-seat the four wires
  against the photo; a failed build gets the verified-good file. Nobody debugs
  alone while the class waits.
- **Checkpoint at minute 65** (end of Part 4): a student who cannot get a
  sweep marks the projected capture instead; the decoded values are the same
  by construction.
- A student whose WHOAMI never succeeds still does Part 4 — their capture
  shows the address and a NACK, which Part 6 is about to make everyone
  produce on purpose anyway. The activity does not fail closed.

## The STRETCH

Inside Part 6, second tier: after the wrong-address capture, predict what a
**wrong register address** produces (ACKs all the way, a value that is not
0x33 — the else-branch prints), then capture it. Fast finishers also predict
what the *display's* address (0x70) would return for WHO_AM_I — a concrete
question with a discoverable answer sitting on their own desk.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 2 (agenda) | deck glue |
| 3–4 (the device; keep the display?) | Part 1 |
| 5–6 (I2C protocol review) | pre-class reading (recall via ch-i2c xrefs), 60-second resurface in Part 1 |
| 7 (library recall) | reading + Part 3 |
| 8 (breakout + wiring colors) | Part 2 |
| 9–11 (whoami activity + listing) | Parts 2–3 |
| 12 / 17 (`i2c1_memRead` walk) | Part 5 (after the capture — see the ordering note) |
| 13–15, 25 (AD2 wiring) | Part 4 (one figure; 15/25 are rescue duplicates) |
| 16 (predict the trace) | Part 4 commit |
| 19–21 (captures A/B/C) | C in Part 4; A and B in Part 6 |
| 24 (Digging Deeper) | Part 5 |
| 26–28 (layers; driver recipe) | Part 7 |
| 29 (transfer patterns) | Part 5 |
| 30–31 (`lsm303agr.h`; prototypes) | Part 7 |
| 32 (homework) | Part 8 |
| 18, 22, 23 (empty) | dropped |

**One ordering change from the deck, named for `checker-arc-fidelity`:** her
slide 12 walks `i2c1_memRead()` *before* the AD2 work, framed as "Recall".
The plan moves the full walk **after** the capture (Part 5), so the trace's
two transactions are observed before they are explained (P-5), and slide 24's
"Digging Deeper" questions stay genuine questions (P-15). Part 3 keeps a
one-sentence version ("`RegisterRead` is one call to `i2c1_memRead()` — the
library function from Day 10's Reference section; we'll see exactly what it
does on the wire in a minute").

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 8 | predict → tell | **Back to I2C.** The device, in one look (3). Her question, committed: *the display is still wired — do I have to take it down to add a second I2C device?* (3) Reveal: no — one bus, one address each; that is the whole point of a bus, and Lab 7 grades exactly this (2) |
| 2 | 22 | do | **Wire it and prove the link.** STEMMA wiring against the photo (5). Copy `TemplateProject` → `Accelerometer`; `whoami_test.c` into `Src`; build (10). CoolTerm: "Accelerometer initialized!" — **CRUCIAL, first half** (5). Checkpoint minute 35; hardware-vs-software rescue split (2) |
| 3 | 6 | explain | **What just ran.** Walk `whoami_test.c` top down: the two `#define`s (`(0x32 >> 1)` noted, not yet explained — planted for Part 5), the loop, and `lsm303_AccelRegisterRead()` = one call into the Day 10 library (4). What 0x33 proves and doesn't (2) |
| 4 | 24 | predict → do | **Put the analyzer on it.** Wire D0/D1/GND — Day 9x's setup, named (5). **Commit, `room="yes"`:** what will the decoder show when this loop runs? (4) Capture + decode: find the address, the register address, the 0x33 — **CRUCIAL, second half** (12). Checkpoint minute 65; projected capture as rescue (3) |
| 5 | 15 | do → explain | **Digging Deeper** — her six questions against the room's own traces, committed answers first: why 0x19 not 0x32 (Day 9x's shift, paying out); who ACKs; why the address goes out **twice** (5). Then the explain: the register-read transfer end to end, and the `i2c1_memRead()` walk — two CR2 writes, stop-then-start, vs the datasheet's repeated START; xref the ch-i2c Reference note (10) |
| 6 | 15 | predict → do → explain | **Break it on purpose.** Change the address to 0x60 — predict what CoolTerm and the analyzer will each show, commit (4). Capture: a NACK after the address, once — single sweep armed, then reset the board (7). Debrief the asymmetry the room just saw; stretch tier: wrong register address (4) |
| 7 | 12 | explain → do | **A driver begins.** The firmware-layers figure — Day 10's, re-shown (2). The five-step recipe (3). `lsm303agr.h` toured against the recipe: the datasheet's register table become `#define`s; download into `mylib` (4). The four prototypes; one is already running, one is tonight's homework (3) |
| 8 | 3 | tell | **Homework:** daily-page reading (the datasheet scavenger hunt: CTRL_REG1/4 settings, on paper); write `lsm303_AccelRegisterWrite()` on paper, mimicking the read function. One sentence on the week: tomorrow how it works inside, Thursday data out |

Total: 3+2+8+22+6+24+15+15+12+3 = **110**.

**Part 2 is the day's tooling bottleneck** (download, project copy, first
build, four wires). **Part 6's wrong-address behavior is pending Petra's
confirmation** (ground truth Q3): the plan teaches the single-sweep-then-reset
technique either way, and no student-facing text asserts what the program
*prints* on a NACK until she confirms the hang.

**If a part overruns, cut in this order:** Part 6's stretch tier → Part 6's
capture B to an instructor demo → Part 1's reveal discussion to one sentence
→ Part 7's recipe compressed (the header tour survives; Part 7 as a whole is
not cuttable — Day 14 starts from it). **Never cut** Part 4 or Part 5's
"address twice" explanation: an unexplained double transaction on their own
screen is worse than not capturing at all.

## Datasheet moments (P-11)

1. **Part 7**: `lsm303agr.h` beside the datasheet's register-address table —
   the header *is* the table, transcribed; that is the five-step recipe's
   step 2 happening in front of them. (Exact table number pending the PDF —
   ground truth Q1.)
2. **Part 5**: the register-read transfer diagram (her slide 29 / datasheet
   §6.1.1 territory) against their own capture.

## Writing room (S-2)

- Part 1: *do I have to take the display down?* — committed before the reveal.
- Part 4: *what will the decoder show?* — committed before the capture.
- Part 5: *why does the same address go out twice?* — committed before the
  memRead walk.
- Part 6: *what will CoolTerm show, and what will the analyzer show?* — the
  day's best wrong-guess moment (most will predict a clean error message).

## Hand-offs

**Pre-class reading (B-2, ideas only):** I2C recalled in one page — the bus,
addresses, the five library functions by name, leaning on ch-i2c xrefs; the
LSM303AGR introduced (an I2C accelerometer on a STEMMA breakout; it has a
WHO_AM_I register, and why self-identifying registers exist). **Must not
contain:** MEMS internals (Wednesday), the 0x19 derivation, any trace
walkthrough, or the wrong-address outcome.

**Homework (due Thursday):** the daily-page datasheet reading (CTRL_REG1/4
settings, on paper — becomes Day 14 Part 2's commit) and
`lsm303_AccelRegisterWrite()` on paper (becomes Day 14 Part 4's reveal).
Nothing to submit.

**Day 14 needs from here:** the sensor wired and verified; `lsm303agr.h` in
`mylib`; `RegisterRead` understood; the analyzer routine enough to be Lab 7's
debugging tool, not a fresh skill.
