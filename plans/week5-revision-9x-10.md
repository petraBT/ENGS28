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

---

## Follow-on: there is no pre-class reading for an x-day

*(Petra, 2026-08-06, after the first pass was built.)*

The part tables above assumed Day 9x could lean on a protocol reading. It cannot:
**x-days get no reading**, and the reading students do is the one before Day 10.
`ch-debugging.ptx` (Day 7x) and `ch-io-datasheets.ptx` (Day 5x) already work this
way — neither has a Before Class section at all.

What changed:

- `sec-i2c-how-it-works` is no longer a reading. Its four subsections moved to
  the head of the **Reference** section, which is what B-2 prescribes for
  mechanism that is first encountered in class.
- `fig-i2c-frame-diagram` moved into Day 9x Part 3b, where it is now taught.
- Parts 3a and 3b **build** the protocol instead of recalling it: the
  synchronous argument and the shared bus in 3a, the SDA-changes-only-while-
  SCL-is-LOW rule, START, STOP and the ACK in 3b.
- That costs about 3 minutes, so Part 3 goes 12 → 15 and Parts 1 and 6 give up
  1 and 2. Day 9x sums to exactly 50 with no slack; the cut order is on the
  opening slide's note.
- The chapter's one reading, before Day 10, is retitled *The Display, and the
  Bus You Have Used*. It carries the display material unchanged, and the three
  protocol reading questions move to it as an after-the-fact check, because
  Day 10 opens the peripheral and the library and both are hard to follow if
  START, ACK and STOP are still vague.

**Open for Petra:** the protocol reading questions are the one judgment call
here. They now sit in the Day 10 reading, checking material students met in
class rather than in that night's reading. The alternatives were to drop them or
to leave them stranded in Reference. Say if you would rather they went.

---

## Day 10: Petra's instructions, 2026-08-07 — for a separate session

She glanced at Day 10 while reviewing Day 9x and gave three directions. They are
**not applied yet**; Day 9x was the focus. Do these first in the Day 10 session.

1. **Cut every Arduino comparison.** *"Get rid of how you would have done things
   in Arduino. Nobody cares."* This goes further than B-11e, which allowed one
   sentence. Affected: `sl-day9x-wire-h` and `sl-day9x-wire-h-gaps` (the
   `Wire.h` mapping slides, now in Day 10 Part 7a), `sl-day9x-wire-begin`
   ("What `Wire.begin()` was doing", Part 6a), `sl-day10-adafruit`
   (`Adafruit_LEDBackpack.h`, Part 8a), and the matching prose in
   `subsec-day9x-library`, `subsec-day9x-pins` and `subsec-day10-layers`.
   B-11e should be amended to say *cut*, not *at most a sentence*.

2. **Drop the timing settings.** *"Don't bother with timing settings — those are
   way too complex. Focus on the I2C protocol instead."* That removes Part 6b
   whole: `subsec-day9x-timingr`, its activity `act-i2c-timingr`, the slides
   `sl-day9x-timingr-intro`, `sl-day9x-timing-tables`, `sl-day9x-presc`,
   `sl-day9x-presc-answer`, and the three RM0490 table images. `i2c1_init()` is
   still given to students, so the `TIMINGR` lines stay in the listing; they are
   simply not taught. That frees ~10 minutes to spend on the protocol.
   `fig-i2c-timing-tables` and the `I2C_TIMINGR` row of the register table can
   stay in Reference for anyone who wants them.

3. **Figures and tables are cut off and do not fit.** Fit-check every Day 10
   slide by eye, not only by the overflow numbers. Known: the four-layer
   diagram and the three stacked RM0490 timing tables were both silently
   cropped with every overflow number reading zero. Item 2 removes the second
   of those.

Also fixed globally on 2026-08-07 and worth knowing: seven hand-authored SVGs in
`assets/` had a `viewBox` but no intrinsic `width`/`height`, so browsers gave
them the 300x150 fallback and they projected at a fraction of their size.
`i2c_transaction.svg` was one, which is why "the whole protocol in one picture"
was unreadable. All seven now carry explicit dimensions.

**Still open on Day 10:** the rebuilt scope captures
(`scope_ping_ack.svg`, `scope_ping_noack.svg`, `waveforms_i2c_setup.svg`) have
text outside their boxes and arrows drawn through labels. Petra's offer —
*"I'd rather give you screenshots than go through this again"* — is the fix;
take the screenshots rather than patching the composites (P-12).

---

## Figures: re-shot by Petra, 2026-08-07 — RESOLVED

The three broken `pptx_annotate.py` composites are deleted. Petra supplied clean
screenshots in `assets/images/Day09X-I2C/`, in graded versions, and Day 9x now
uses four of them for four distinct jobs:

| File | Figure | Where | Job |
|---|---|---|---|
| `scope_ping_ack_1.png` | `fig-scope-setup` | Part 3b | The AD2's own trigger/timebase/offset settings, so the setup is shown rather than described in prose |
| `scope_ping_ack_2.png` | `fig-i2c-scope-ack` | Part 3c | Clean SDA/SCL, no decode — what students compare their own capture against |
| `scope_ping_ack_4.png` | `fig-i2c-scope-decoded` | Part 4 | The reveal: `1 1 1 0 0 0 0` then the R/W bit circled, then `Ack` |
| `scope_ping_noack.png` | `fig-i2c-scope-noack` | Part 4 | `1 1 0 0 0 0 0` + `0`, then `NoAck` — nine pulses against eighteen |
| `waveforms_i2c_setup_1.png` + `_2.png` | `fig-waveforms-setup` | Part 3c | Both, as Petra said: `_1` gets the two signals on screen (steps 1–6), `_2` adds the I2C decoder (steps 1–3) |

`scope_ping_ack_3.png` (sample markers, no bit values) was not used — it sits
between `_2` and `_4` and would have been a third near-identical view of one
trace, which is the repetition being cut everywhere else.

**One thing to know:** the decoded row in `waveforms_i2c_setup_2.png` reads
`h70 WR / ACK / hBE / ACK`. The data byte is `0xBE`, not the `0x00` that
`helloDisplay.c` sends, so that screenshot was taken with a different value in
the program. The caption says so rather than glossing it.
