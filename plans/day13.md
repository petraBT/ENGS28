# Day 13 — The accelerometer as an I2C device

**Tuesday, 110 minutes** (Day N with N odd is a Tuesday — the day-parity rule
in `CLAUDE.md`). Chapter: `source/ch-accelerometers.ptx`. Old deck:
`Day13-I2C(3).pptx` (32 slides). Ground truth: `plans/week7-ground-truth.md`.
Gate 1 applied: `reviews/week7-gate1.md`.

## Objectives

By the end of class a student can:

1. Wire the LSM303AGR breakout to the Nucleo's I2C bus (STEMMA QT: red → 3.3 V,
   black → GND, yellow → SCL/PB8, blue → SDA/PB9) and say why the display can
   stay on the same two wires.
2. Verify an I2C link with a WHO_AM_I read, and explain what a successful 0x33
   proves and what it does not (the bus and address work; nothing yet about
   configuration).
3. Capture an I2C transaction with the AD2's logic analyzer and protocol
   decoder (DIO0/DIO1, Day 9x's own setup), and read the device address, the
   register address, and the returned data off it.
4. Explain the register-read transfer: why the device address goes onto the
   wire twice, where the register address is sent, which NACK ends the read on
   purpose, and why the value on the wire is 0x19 when the header says 0x32.
5. Recall the five-step device-driver recipe (Day 10) and apply it to the
   LSM303AGR's register table — which is where `lsm303agr.h`'s structure comes
   from.

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
- The analyzer setup is **Day 9x's own, unchanged**: digital channels, DIO0
  (pink) → SDA, DIO1 (green) → SCL, black → GND, falling-edge trigger, single
  sweep, then the I2C decoder. The slide names it as the setup from Day 9x
  rather than teaching it fresh.
- **Checkpoint at minute 35** (end of Part 2): if the room is not mostly
  printing, the rescue splits hardware from software — re-seat the four wires
  against the photo; a failed build gets the verified-good file. **A second
  re-seat failure is not a wait-for-the-checkpoint problem — it gets
  immediate priority triage.** Nobody debugs alone while the class waits.
- **Checkpoint at minute 65** (end of Part 4): a student who cannot get a
  sweep marks the projected capture instead; the decoded values are the same
  by construction.
- A student whose WHOAMI never succeeds still does Part 4 — their capture
  shows the address and a NACK, which Part 6 is about to make everyone
  produce on purpose anyway. **For Part 5 that student works from the
  projected capture (or a neighbour's)**, not their own: four of the six
  Digging Deeper questions cannot be answered off a NACK-only trace, and the
  decoded values are the same by construction. The activity does not fail
  closed.

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
| 5–6 (I2C protocol review) | pre-class reading (recall via ch-i2c xrefs); the in-class resurface is **inside Part 1's first beat** — the device sits on the same bus, same protocol, one sentence with the bus picture up |
| 7 (library recall) | reading + Part 3 |
| 8 (breakout + wiring colors) | Part 2 |
| 9–11 (whoami activity + listing) | Parts 2–3 |
| 12 / 17 (`i2c1_memRead` walk) | Part 5 (after the capture — see the ordering note); during Part 4 the listing is **on screen as reference, not walked** (her slide 17's role) |
| 13–15, 25 (AD2 wiring) | Part 4 (one figure; 15/25 are rescue duplicates) |
| 16 (predict the trace) | Part 4 commit |
| 19–21 (captures A/B/C) | C in Part 4; A and B in Part 6 |
| 24 (Digging Deeper) | Part 5 |
| 26–28 (layers; driver recipe) | Part 7 |
| 29 (transfer patterns) | Part 5 |
| 30–31 (`lsm303agr.h`; prototypes) | Part 7 |
| 32 (homework) | Part 8 |
| 18, 22, 23 (empty) | dropped |

**One ordering change from the deck, named for `checker-arc-fidelity` (and
ruled faithful at Gate 1):** her slide 12 shows `i2c1_memRead()` *before* the
AD2 work, framed as "Recall". The plan moves the full walk **after** the
capture (Part 5), so the trace's two transactions are observed before they
are explained (P-5), and slide 24's "Digging Deeper" questions stay genuine
(P-15). Her slides' real function — the code visible beside the trace — is
kept: Part 4 keeps `whoami_test.c` and the `i2c1_memRead()` prototype on
screen as reference while the room captures.

## Activity sequence (110 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 3 | — | Settling |
| 0 | 2 | tell | Announcements |
| 1 | 8 | predict → tell | **Back to I2C.** The device, in one look — an I2C sensor, on the same two-wire bus as the display, same protocol, same library (the sixty-second resurface lives here, with the bus picture up) (3). Her question, committed: *the display is still wired — do I have to take it down to add a second I2C device?* (3) Reveal: no — one bus, one address each; that is the whole point of a bus, and Lab 7 grades exactly this (2) |
| 2 | 22 | do | **Wire it and prove the link.** STEMMA wiring against the photo (5). Copy `TemplateProject` → `Accelerometer`; `whoami_test.c` into `Src`; build (10). CoolTerm: "Accelerometer initialized!" — **CRUCIAL, first half** (5). Checkpoint minute 35; hardware-vs-software rescue split; **early finishers start Part 4's DIO0/DIO1/GND analyzer wiring now — it does not depend on Part 3** (2) |
| 3 | 6 | explain | **What just ran.** Walk `whoami_test.c` top down: the two `#define`s (`(0x32 >> 1)` noted, not yet explained — planted for Part 5), the loop, and `lsm303_AccelRegisterRead()` = one call into the Day 10 library — the five operations from Day 10 Part 7a, `i2c1_memRead()` among them (4). What 0x33 proves and doesn't (2) |
| 4 | 24 | predict → do | **Put the analyzer on it.** Wire DIO0/DIO1/GND — Day 9x's setup, named (5). **Commit, `room="yes"`:** what will the decoder show when this loop runs? — with `whoami_test.c` on screen as reference, her slides 16/17's pairing (4). Capture + decode: find the address, the register address, the 0x33 — **CRUCIAL, second half** (12). Checkpoint minute 65; projected capture as rescue (3) |
| 5 | 15 | do → explain | **Digging Deeper — against the room's own traces.** *Why 0x19, not 0x32?* answered call-and-response — Day 9x's shift set-piece paying out. Then **two** committed questions, `room="yes"`: *why does the same address go out twice?* — framed as confirmation: Day 10 Part 7a told you our `i2c1_memRead()` does stop-then-start where the datasheet draws a repeated START; find it on your own trace — and *who ACKs?* (5). The transfer diagram (her slide 29) beside their capture: where the register address is said, where the data appears, who ACKs each byte — the remaining questions answered on the diagram as recap — **and the two kinds of NACK, named**: the NACK before the STOP is the *controller's*, sent on purpose to end the read; the other NACK, the one Part 6 is about to produce, comes from nobody at all (4). Then the `i2c1_memRead()` **code walk** — its first in-class walk (the code lives in ch-i2c's Reference; the *fact* was Day 10's): two CR2 writes, STOP then START, and what that means on a bus with two controllers — xref `subsec-i2c-ref-library` (6) |
| 6 | 15 | predict → do → explain | **Break it on purpose.** Change the address to 0x60 — predict what CoolTerm and the analyzer will each show, commit — and one spoken line before anyone runs: *if nothing happens on your screen, that is expected here — wait for the reset cue* (4). Capture: a NACK after the address, once — single sweep armed, then reset the board; **projected capture as rescue here too** (7). Debrief the asymmetry the room just saw; stretch tier: wrong register address (4) |
| 7 | 12 | explain → do | **A driver begins.** The firmware-layers figure — Day 10's, re-shown (2). The five-step recipe, recalled and applied (3). `lsm303agr.h` toured against the recipe: the datasheet's register table become `#define`s; download into `mylib` (4). The four prototypes; one is already running, one is tonight's homework (3) |
| 8 | 3 | tell | **Homework:** daily-page reading (the datasheet scavenger hunt: CTRL_REG1/4 settings, on paper); write `lsm303_AccelRegisterWrite()` on paper, mimicking the read function. One sentence on the week: tomorrow how it works inside, Thursday data out |

Total: 3+2+8+22+6+24+15+15+12+3 = **110**.

**Part 2 is the day's tooling bottleneck** (download, project copy, first
build, four wires). **Part 6's wrong-address behavior is pending Petra's
confirmation** (ground truth Q3): the "expected here" line is worded true
whichever way it lands (hang or repeating error), so drafting need not wait;
no student-facing text asserts what the program *prints* on a NACK until she
confirms.

**If a part overruns, cut in this order:** Part 6's stretch tier → Part 6's
capture B to an instructor demo → Part 1's reveal discussion to one sentence
→ Part 7's recipe compressed (the header tour survives; Part 7 as a whole is
not cuttable — Day 14 starts from it). **Never cut** Part 4, or Part 5's
"address twice" explanation **and the two kinds of NACK**: an unexplained
double transaction — or an unexplained NACK inside a *successful* read — on
their own screen is worse than not capturing at all.

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
- Part 5: *why does the same address go out twice?* and *who ACKs?* — the two
  real commits; the rest of the six are answered on the diagram.
- Part 6: *what will CoolTerm show, and what will the analyzer show?* — the
  day's best wrong-guess moment (most will predict a clean error message).

## Hand-offs

**Pre-class reading (B-2, ideas only):** I2C recalled in one page — the bus,
addresses, the five library functions by name, leaning on ch-i2c xrefs; the
LSM303AGR introduced: an I2C accelerometer on a **breakout board — a small
board that carries the chip and the extra parts (pull-ups, a regulator) it
needs — connected by a STEMMA QT cable, a 4-wire plug**; it has a WHO_AM_I
register, and why self-identifying registers exist. (Whether the connector's
keying can be *stated* — "it only fits one way" — waits on ground truth Q9;
until she answers, give the wire colors and stop.) **Must not contain:** MEMS
internals (Wednesday), the 0x19 derivation, any trace walkthrough, or the
wrong-address outcome.

**Homework (due Thursday):** the daily-page datasheet reading (CTRL_REG1/4
settings, on paper — becomes Day 14 Part 2's commit) and
`lsm303_AccelRegisterWrite()` on paper (becomes Day 14 Part 4's reveal).
Nothing to submit.

**Day 14 needs from here:** the sensor wired and verified; `lsm303agr.h` in
`mylib`; `RegisterRead` understood; the analyzer routine enough to be Lab 7's
debugging tool, not a fresh skill.
