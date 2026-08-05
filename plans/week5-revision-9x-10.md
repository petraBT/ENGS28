# Revision: Days 9x and 10 — invert to "use it, then build it"

Supersedes the Day 9x and Day 10 sections of `plans/week5.md`. Petra's
decision, 2026-08-05. Day 9's plan is unchanged; Gate 1 material in `week5.md`
stands except where contradicted here.

*(Kept in a separate file because a cloud agent is editing `week5.md`
concurrently for Day 9's timings.)*

---

## Why this changes

**The real class lengths were wrong in the plan.** Day N odd → Tuesday, 110
min. Day Nx → Wednesday, **50 min**. Day N even → Thursday, 110 min. The plan
budgeted all three at 65. So Day 9x was ~14 min over and Day 10 ~45 min under.

**The ping activity is a weak opener.** `pingDisplay.c` sends `0x70` with a
byte whose own comment says the value does not matter, in a loop. The display
**stays dark for the whole of Wednesday**, and Wednesday's crucial step is to
annotate a scope trace. The artifact the unit is motivated by — 34 LEDs on two
wires — does nothing until Thursday.

**The cause of both is the same:** the unit is built bottom-up (protocol →
peripheral → library → device), so the payoff lands last and all the theory has
to fit in the shortest day.

## The change

**Wednesday is "use it". Thursday is "build it."**

Top-down, and consistent with house style: Day 1 runs Blinky before explaining
a single register. It puts the visible win on the 50-minute day and moves the
register work to the 110-minute day where there is room for it.

**Accepted trade-off (P-1).** Students call `i2c1_byteWrite()` on Wednesday
before they know what it does. This is already true of the current design —
`pingDisplay.c` calls it too — and Day 1 sets the precedent. Taken
deliberately, not inherited.

---

## Day 9x — Wednesday, 50 minutes

**CRUCIAL step:** *every student's own display shows characters, driven from
their own board, and every student has written the two bytes that put one digit
there.*

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | Pin-count hook: 34 LEDs in four digits — how many pins? → two wires and a backpack. **Keep as is; it works** | predict → tell | 4 |
| 2 | Safety line, wire it, flash given code → **the display shows characters**. CRUCIAL (part 1) | do | 12 |
| 3 | *"How did two wires do that?"* — the protocol, answering a question they now have. One captured trace: START / address+R/W / ACK / data / STOP | explain + do | 12 |
| 4 | **Bus scanner**: walk 0x00–0x7F, print what ACKs. They *find* 0x70 — and the wire shows 0xE0, so the 7-bit/8-bit trap is discovered, not told | do → explain | 8 |
| 5 | **Write one digit yourself.** CRUCIAL (part 2) | do | 10 |
| 6 | Recap; Thursday is the driver | tell | 4 |

**Moved to Thursday:** the pins/AF/open-drain beat, `I2C_TIMINGR`, the five
library operations, and opening `i2c1_byteWrite()` — about 18 minutes, which is
the overcommitment.

**Replaces `pingDisplay.c`** with (a) a given program that writes visible
characters and (b) a scanner. Both need writing; see "What must be built".

## Day 10 — Thursday, 110 minutes

**CRUCIAL step:** unchanged — *every student's display shows `ES.28`, written
from a buffer through their own `SevenSeg_write()`.*

| Part | Content | Mode | Min |
|---|---|---|---|
| 1 | Homework review + the AI critique. **Keep as is** | do | 9 |
| 2 | Does the bus still work? Flash Wednesday's program unchanged | do | 3 |
| 3 | How the display is actually built: common cathode, 34 LEDs on 14 wires, multiplexed. **Persistence-of-vision demo** — film it at high shutter, or scope one segment line: the eye smooths out what the chip is really doing. This is the honest answer to "why does this need its own chip?" | observe → explain | 10 |
| 4 | The HT16K33's commands, derived from its datasheet | do → explain | 10 |
| 5 | Display RAM: two bytes per digit, and why the always-zero byte must still be sent | predict → reveal | 10 |
| 6 | **Now the peripheral**: PB8/PB9, AF6, open-drain and why it is not optional; `I2C_TIMINGR` and PRESC — **datasheet moment**. Motivated, because they have used it for a day | explain | 20 |
| 7 | The five operations a library needs — derived, committed, revealed — then **open `i2c1_byteWrite()`** and see them | predict → reveal | 12 |
| 8 | Firmware layers; what `Adafruit_LEDBackpack.h` did; **write the driver → `ES.28`**. CRUCIAL | do | 25 |
| 9 | **Break it on purpose** (stretch): wrong address → NACK on the trace. **Omit the oscillator-on command → a perfect trace and a blank display.** The bus can be flawless and the device still do nothing — the Day 7x "which tool, when" lesson, made physical | do → explain | 8 |
| 10 | Homework; what Lab 5 asks | tell | 4 |

Sums to 111 against 110 — trim Part 9 first if long.

---

## What must be built

1. **A given program that lights the display** (Wednesday Part 2). Must use
   only `i2c.h`'s existing API. The oscillator-on and display-on commands are
   in `assets/starters/SevenSegPartialORIGINAL.h`
   (`HT16K33_SYSTEM_CMD|HT16K33_OSC_ON`, `HT16K33_DISPLAY_CMD|HT16K33_DISPLAY_ON`),
   and `numbertable[]` gives the segment patterns. **Verify against that file —
   do not invent constants.**
2. **A bus scanner** (Wednesday Part 4). Needs `i2c1_byteWrite()` to report
   ACK/NACK; check whether it does before designing the activity around it. If
   it cannot, say so rather than inventing a return value.
3. **The persistence-of-vision demo** (Thursday Part 3) — decide whether it is
   a phone camera, the AD2 on a segment line, or an instructor demo. Needs a
   figure either way.

## Still open (unchanged from `week5.md`)

Flags 8/11 (+V and GND swapped — what actually happens), 13 (does the backpack
ship with its header soldered), 14 (spare displays in the room), 16 (HT16K33
datasheet page citations, unverified — the datasheet is not in the repo).

Settled since: kits stay in the classroom with evening access, so Thursday may
assume the display is still wired; `SevenSegPartialORIGINAL.{c,h}` is now in
`assets/starters/`, and confirms `SevenSeg_write(uint8_t *)` with
`HT16K33_NBUF 5` — so Lab 5 §3.3's `uint16_t *` is the error, not the chapter.
