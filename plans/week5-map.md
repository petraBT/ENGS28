# Week 5 at a glance — Days 9, 9x, 10

A map of what was actually built, for judging the pedagogy without reading
5,941 lines. Source: `source/ch-gpio-interrupts.ptx`, `source/ch-i2c.ptx`,
`assets/decks/day9|day9x|day10.json`, against `plans/week5.md`.

---

## The week

| | **Day 9** | **Day 9x** | **Day 10** |
|---|---|---|---|
| Topic | GPIO interrupts (EXTI) | I2C protocol + peripheral | HT16K33 + device driver |
| Chapter | `ch-gpio-interrupts.ptx` | `ch-i2c.ptx` | `ch-i2c.ptx` |
| Deck | 55 slides, 9 parts | 51 slides, 11 parts | 42 slides, 9 parts |
| Class length | Tue, **110 min** | Wed x-hour, **50 min** | Thu, **110 min** |
| Built to | ~65 min — 45 spare | ~64 min — **14 over** | ~65 min — 45 spare |
| Students **build** | interrupt-driven counter | nothing — wire, flash, **look** | their first device driver |
| Hands-on block | 13 min | 15 min | 13 min |
| Inherits from | Day 8, almost entirely | Day 5 (UART), loosely | Day 9x, entirely |
| Arduino call replaced | `attachInterrupt()` | `Wire.h` | `Adafruit_LEDBackpack.h` |

**One hard pivot, one smooth hand-off.** Day 9 → 9x shares no machinery.
9x → 10 shares everything.

### Crucial steps

- **Day 9** — every student's own board runs `counterResetButtonInt.c`; a press
  on PB4 resets the counter *immediately*, including during the one-second wait
  the polled version slept through.
- **Day 9x** — every student captures a real I2C transaction from their own
  board on the AD2 and marks START / address / R/W / ACK / STOP on it.
- **Day 10** — every student's four-digit display shows `ES.28`, written from a
  ten-byte buffer through their own `SevenSeg_write()`.

---

## Day 9 — GPIO interrupts (~65 min built, 110 available)

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | Homework review; **plant** the ISR that writes `ODR` directly | do/tell | 4 |
| 2 | Wiring check → run polled counter → **observe the missed tap**. Checkpoint min 18 | do → observe | 9 |
| 3 | Why EXTI exists; 16 lines, 3 vectors; Table 40 lookup; what `attachInterrupt()` did | explain | 6 |
| 4a | `EXTI_EXTICR2` — port select, **datasheet moment**, the `EXTICR[1]` index catch | do → explain | 6 |
| 4b | `FTSR1` → `IMR1` → NVIC — Day 8's two enables, now four | explain | 4 |
| 5 | The ISR: `FPR1`, predict access type, clear it, `volatile` from the other end | predict → explain | 5 |
| 6 | **Three TODOs → build → run. CRUCIAL.** Ladder on screen; PC13 for fast finishers | do | 13 |
| 7 | **The race, and BSRR** — the planted line collected | predict → explain → fix | 11 |
| 8 | Homework; one sentence on the pivot | tell | 2 |

**Stretch:** PC13 blue button sharing `EXTI4_15_IRQHandler` — forces
discrimination on `FPIF4` vs `FPIF13`. Homework: modularize into `exti.c/.h`.

**Arc quality:** the P-5 observe→explain→fix spine is intact and the Part 1
plant → Part 7 payoff is the strongest structural idea in the week.

## Day 9x — I2C (65 min)

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | 34 LEDs, how many pins? → two wires and a backpack | predict → tell | 4 |
| 2 | Shared clock vs UART's baud agreement; address shifted left + R/W | explain | 4 |
| 3 | Protocol in one figure; **worked example is the wrong-address trace** | explain | 5 |
| 4 | **Wire, flash `pingDisplay.c`, capture, mark your own trace. CRUCIAL.** Checkpoint min 32 | do | 15 |
| 5 | Debrief the trace; NACK and data-byte tiers | do → explain | 7 |
| 6a/6b | Five operations a library needs → `Wire.h` is that library; open `i2c1_byteWrite()` | predict → reveal | 8 |
| 7a/7b | PB8/PB9, AF6, open-drain and why; `I2C_TIMINGR` — **datasheet moment** | explain | 10 |
| 8 | Seven bits, eight bits — the trap, exercised | do → explain | 4 |
| 9 | Recap | tell | 2 |

## Day 10 — HT16K33 driver (65 min)

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | Homework review + **the AI critique** (students commit first, then compare) | do | 9 |
| 2 | Verify the bus still works — flash Thursday's `pingDisplay.c` | do | 3 |
| 3 | How the display is built: common cathode, multiplexing → therefore a backpack | explain | 6 |
| 4 | HT16K33 commands **derived from the datasheet** | do → explain | 7 |
| 5 | Display RAM; **why the always-zero byte must still be sent**; make a pattern | predict → reveal | 8 |
| 6 | Write one digit | do | 6 |
| 7 | Firmware layers; what `Adafruit_LEDBackpack.h` did; what writing it buys | explain | 4 |
| 8 | **`SevenSeg_write()` → `ES.28`. CRUCIAL.** | do | 13 |
| 9 | Homework; what Lab 5 asks | tell | 4 |

---

## Dependency chain

```
Day 3/3x  ── PB4 button + debounce cap ──►  Day 9 Part 2 (verified, not assumed)
Day 8     ── NVIC, ISR naming, volatile ─►  Day 9 Parts 4b/5 (must not re-teach)
Day 9x    ── display stays wired ────────►  Day 10 Part 2  ⚠ see risk 3
Day 9x    ── i2c1_byteWrite() ───────────►  Day 10 Part 8
Week 5    ── all three ──────────────────►  Lab 5, due Tue 10 Feb 2026
```

---

## Five things worth your judgment

**1. Every day was budgeted to 65 minutes, and only one of the three days is
65 minutes long.** Tuesdays and Thursdays run 110 minutes; the Wednesday x-hour
runs 50. So Days 9 and 10 each have roughly 45 minutes of slack, and **Day 9x is
14 minutes over its hour** — the one place in the week where the clock is a real
constraint. Day 9's own section is corrected; 9x and 10 still read "65 min" and
need a pass of their own.

**2. Day 9's deck is the densest in the book** — 55 slides, against Day 8's 48.
Parts 4a/4b/5 are 15 planned minutes carrying 18 slides. With 110 minutes in the
room that is no longer a clock problem, but it is still worth asking whether the
pace is real or a symptom of one-idea-per-slide applied too literally (P-7 says
slides are free, but attention is not).

**3. Day 10's crucial step depends on the display still being wired from
Tuesday** — and nothing in the repo establishes whether kits go home
(flag 15). If they do and the wiring does not survive, Part 2's 3 minutes will
not cover it, and Day 10's crucial step is at risk from a Day 9x hardware
decision. This is the biggest single structural risk in the week.

**4. Day 9x is the only day where students write no code.** They wire, flash
given code, and read a trace. That is a defensible design for a protocol day
and the capture is genuinely hands-on — but it sits in the middle of the week,
and it means the I2C *peripheral* registers (Parts 7a/7b, 10 min) are taught
entirely by explanation with nothing built on them until Thursday.

**5. `SevenSegPartial.h` is missing, so Day 10's skeleton is authored, not
recovered** (flag 12). The signatures come from your slide 50, but the bodies
and the `HT16K33_*` constants are used by name and never quoted against a real
file. B-6 calls invented-but-plausible code the single largest source of error
in this book, and this is the one place in the week where it applies.

---

## Open flags that block content

| # | Blocks | Question |
|---|---|---|
| 8 / 11 | a Day 9x safety slide | What actually happens if +V and GND are swapped on the display breakout? |
| 12 | Day 10's skeleton + a Reference note | The real `SevenSegPartial.h` |
| 13 | `fig-backpack-pins` caption | Does the kit's backpack arrive with its header soldered? |
| 14 | all four diagnostic ladders | Are there spare/known-good displays in the room? |
| 15 | Day 10 Part 2 (see risk 3) | Do students take kits home between 9x and 10? |
| 16 | P-11 citations | HT16K33 datasheet page numbers are unverified — not in the repo |
| 2 | Day 9 Part 7 framing | BSRR has no atomic *toggle*, so `ODR ^= LED` in an ISR is not fixed by it — is that the framing you want? |
| 3 | Lab 5 PDF | §3.3 prototype is `uint16_t *` over `HT16K33_NBUF`; the chapter follows your slides' `uint8_t *` over `2*HT16K33_NBUF` |
