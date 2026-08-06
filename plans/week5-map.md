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
| Pre-class reading | yes | **none — x-day** | the display |
| Deck | 55 slides, 9 parts | 40 slides, 8 parts | 71 slides, 12 parts |
| Class length | Tue, **110 min** | Wed x-hour, **50 min** | Thu, **110 min** |
| Built to | ~65 min — 45 spare | **50 min**, rebalanced | **110 min**, rebalanced |
| Students **build** | interrupt-driven counter | the bytes for one digit | their first device driver |
| Hands-on block | 13 min | 22 min | 33 min |
| Inherits from | Day 8, almost entirely | Day 5 (UART), loosely | Day 9x, entirely |
| Arduino call replaced | `attachInterrupt()` | `Wire.h` | `Adafruit_LEDBackpack.h` |

**One hard pivot, one smooth hand-off.** Day 9 → 9x shares no machinery.
9x → 10 shares everything.

### Crucial steps

- **Day 9** — every student's own board runs `counterResetButtonInt.c`; a press
  on PB4 resets the counter *immediately*, including during the one-second wait
  the polled version slept through.
- **Day 9x** — every student's own display shows characters, driven from their
  own board, and every student has written the two bytes that put one digit
  there.
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

## Day 9x — I2C (50 min)

Rebalanced by `plans/week5-revision-9x-10.md`: use it Wednesday, build it
Thursday.

**No pre-class reading** — x-days do not get one, so the protocol is built in
class in 3a/3b and its written form lives at the head of the Reference section.

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | 34 LEDs, how many pins? → two wires and a backpack | predict → tell | 3 |
| 2 | Safety line, wire it, flash given code → **the display shows characters. CRUCIAL (1)** | do | 12 |
| 3a | *"How did two wires do that?"* — shared clock, shared wires, an address | explain | 5 |
| 3b | **The framing rule and the ACK, built from scratch** → capture your own | explain + do | 8 |
| 3c | Reading your own trace | explain | 2 |
| 4 | Which number is on the wire? 7-bit vs 8-bit, **found on their own trace** | do → explain | 8 |
| 5 | **Write one digit yourself. CRUCIAL (2)** | do | 10 |
| 6 | Recap; Thursday is the driver | tell | 2 |

## Day 10 — HT16K33 driver (110 min)

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | Homework review + **the AI critique** (students commit first, then compare) | do | 9 |
| 2 | Does the bus still work? Flash Wednesday's program unchanged | do | 3 |
| 3 | How the display is built + **persistence of vision** | observe → explain | 10 |
| 4 | HT16K33 commands **derived from the datasheet** | do → explain | 10 |
| 5 | Display RAM; **why the always-zero byte must still be sent** | predict → reveal | 10 |
| 6 | **Now the peripheral**: PB8/PB9, AF6, open-drain, `I2C_TIMINGR` — **datasheet moment** | explain | 20 |
| 7 | The five library operations, derived — then open `i2c1_byteWrite()` | predict → reveal | 12 |
| 8 | Firmware layers; **write the driver → `ES.28`. CRUCIAL** | do | 25 |
| 9 | **Break it on purpose** (stretch): a perfect trace and a blank display | do → explain | 8 |
| 10 | Homework; what Lab 5 asks | tell | 4 |

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

**1. Every day was budgeted to 65 minutes, and none of the three days is 65
minutes long.** Tuesdays and Thursdays run 110 minutes; the Wednesday x-hour
runs 50. So Days 9 and 10 each had roughly 45 minutes of slack, and Day 9x was
14 minutes over its hour. All three are now corrected: Day 9 in its own
section, and Days 9x and 10 by `plans/week5-revision-9x-10.md`, which moves the
peripheral registers off Wednesday and onto Thursday.

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

**4. `i2c1_byteWrite()` cannot report ACK or NACK, and hangs on one.** It
returns `void`; its `NACKF` test runs about ninety microseconds before the
device could have failed to answer, so it always passes, and the `TXIS` wait
after it never ends (RM0490 §23.4.9). So a bus scanner that walks 0x00–0x7F and
prints what answers **cannot be built on the library students are given** — it
would stop at the first address nobody claims. Day 9x Part 4 therefore reaches
the same discovery through the trace, which is what the API does provide, and
the scanner stays an open request (flag 20).

**5. `SevenSegPartial.h` is no longer missing** (flag 12 resolved).
`assets/starters/SevenSegPartialORIGINAL.{c,h}` are Petra's own files, and
every `HT16K33_*` constant and `numbertable[]` entry in the chapter is now
checked against them. Two differences remain, both listed in the flags below.

---

## Open flags that block content

| # | Blocks | Question |
|---|---|---|
| 8 / 11 | a Day 9x safety slide | What actually happens if +V and GND are swapped on the display breakout? |
| 12 | ~~Day 10's skeleton~~ | **Resolved** — `SevenSegPartialORIGINAL.{c,h}` are in `assets/starters/` |
| 13 | `fig-backpack-pins` caption | Does the kit's backpack arrive with its header soldered? |
| 14 | all four diagnostic ladders | Are there spare/known-good displays in the room? |
| 15 | ~~Day 10 Part 2~~ | **Resolved** — kits stay in the classroom with evening access |
| 16 | P-11 citations | HT16K33 datasheet page numbers are unverified — not in the repo |
| 20 | Day 9x Part 4, and the accelerometer later | May `i2c.c` gain a version of `i2c1_byteWrite()` that reports a NACK instead of hanging? Without one, a bus scanner cannot be written, and it is a technique students would reuse |
| 21 | Day 10 Part 3 | The persistence-of-vision figure does not exist — see the `<note>` on `subsec-day10-display-hardware` |
| 22 | Day 10 Part 6 | `SevenSegPartialORIGINAL.c`'s own `SevenSeg_init()` sends `HT16K33_BRIGHT_CMD \| 0x7U`; the chapter and your Day 10 deck both say full brightness, `0xEF`. Which is the one students should end up with? |
| 23 | the driver prototypes | `SevenSegPartialORIGINAL.h` declares `SevenSeg_number(uint16_t, uint8_t *)`; the chapter followed your deck slide 50 and said `int16_t`. The chapter now follows the header |
| 2 | Day 9 Part 7 framing | BSRR has no atomic *toggle*, so `ODR ^= LED` in an ISR is not fixed by it — is that the framing you want? |
| 3 | Lab 5 PDF | §3.3 prototype is `uint16_t *` over `HT16K33_NBUF`; the chapter follows your slides' `uint8_t *` over `2*HT16K33_NBUF` |
