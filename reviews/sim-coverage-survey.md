# Where else the board simulator could go

A survey of all sixteen chapters against what `~/repos/ENGS28-board-sim` can do
today. Nothing in the book was changed.

## Where it is now

Seven embeds, six chapters, all of them the same shape: the homework or the
in-class coding exercise, placed right after the activity, so a student away
from the Nucleo can still do the work.

| Chapter | Starter | Placed at |
| --- | --- | --- |
| ch-intro-blinky | `blinkySlowToFast` (twice: activity + `<slide>` demo) | Day 1 homework |
| ch-switches | `toggleLEDstart` | Day 3 homework |
| ch-uart | `keyboardCounter` | Day 5 in-class Part 3 |
| ch-adc | `ADCPot` | Day 7 in-class Part 4b |
| ch-timers-interrupts | `blinkyTimerInt` | Day 8 in-class Part 7 |
| ch-gpio-interrupts | `counterResetButtonInt` | Day 9 in-class Part 6 |

Chapters with none: ch-io-datasheets, ch-transistors, ch-debugging, ch-i2c,
ch-motors, ch-accelerometers, ch-servos, ch-photosensors, ch-ble, ch-power.

## How this was checked

Two things, rather than reading and guessing.

1. **A compile harness.** The sim's own `src/engine/index.ts` was bundled with
   esbuild and every candidate program run through `build()` — the real
   preprocessor, lexer and parser. Where a program fails, the failure below is
   the parser's actual message and line, not an inference.
2. **The peripheral models were read**, not assumed: `stm32-defs.ts`,
   `gpio.ts`, `adc.ts`, `timer.ts`, `exti.ts`, `usart.ts`,
   `engine/device-header.ts`, `board/pinmap.ts`, `board/register-panel.ts`.

What the harness found, on the real starters in `assets/starters/`:

```
OK     TTmotor_ramp.c                (parses; TIM14->CCR1 has no effect at runtime)
OK     tim.c                         (parses; TIM16 is not in the device header)
OK     i2c.c                         (parses; I2C1 is not in the device header)
OK     SevenSegPartial.c             (parses; every i2c1_* call is undefined)
OK     whoami_test.c, blinkyTimerPolled.c, counterResetButtonPolled.c
FAIL   Day15_servo_template.c    line 37: Unexpected ';'
FAIL   accel_test.c              line 25: Expected ';' but found 'accel_raw'   (struct)
FAIL   helloDisplay.c            line 95: Expected ';' but found 'b0'          (0b literal)
FAIL   writeFirstDigit.c         line 70: Expected ';' but found 'b01111001'   (0b literal)
FAIL   lsm303agr_partial.c       line 41: Unexpected ';'
```

"Parses" is a low bar. `TIM16`, `I2C1`, `SPI1` and `PWR` do not exist in
`src/engine/device-header.ts` at all, so any program naming them dies at the
first reference. Interpreter limits confirmed by reading and by test: no
`struct`, no user arrays (`interpreter.ts:904` — "Array indexing is only
supported on register arrays such as `GPIOA->AFR[0]`"), no pointers beyond
string literals, and **no `0b` binary literals** (verified: `0b1011` fails to
lex; `0x0b` is fine).

---

## Tier 1 — do next. Runs today, no simulator work at all.

### 1. ch-switches, Day 4 Part 4 (`subsec-day4-fsm-code`) — the strongest candidate in the book

The pause/resume state machine in `inst-day4-fsm-code` **parses and runs
verbatim**: `typedef enum { RUN, RUN_HELD, PAUSE, PAUSE_HELD }`, a `switch`
with four cases, `%`, `delay_ms`, PA5/PA6/PA7 as outputs, PB4 with a pull-up.
The sim's README says outright that `typedef`/`enum`/`switch` were added *for
Day 4's state machines* — and then Day 4 never got an embed. The bay supplies
the two extra LEDs (PA6 = D12, PA7 = D11) and the button (PB4 = D5).

Why it is worth it beyond "it runs":

- The failure the instructor note most wants students to hit — keeping
  `delay_ms(500)` unsliced, so a normal press lands in the gap and does nothing
  — reproduces exactly here, and the register panel shows `IDR` not moving while
  the program sleeps.
- A three-bit binary count on three LEDs is a *logic* bug when it is wrong, not
  a wiring bug, and that is precisely what the sim isolates.
- Lab 2 (Challenge 1 is this same FSM, Challenge 2 the reaction-time game) is
  overnight work, when the kit is on a desk somewhere else.

Honest caveat, and it should be said in the prose the way ch-switches already
says it for `toggleLEDstart`: task 3 asks students to verify clean transitions
**on the oscilloscope, with and without the debounce capacitor**. The sim's
button makes clean contact and there is no scope. That task stays on hardware.

Cost: one `assets/sim-starters/day4Fsm.c` skeleton (the FSM with the states and
the switch blanked), a paragraph, one `<sim>`, plus the `examples.ts` entry and
`check_starters.py` row the convention requires.

### 2. ch-transistors, Day 6 Part 2 (`act-macros-rewrite`) — a verification loop that does not exist today

The macros rewrite is the one activity in the book whose answer a student
**cannot check by looking at it**. `GPIOB->MODER &= ~GPIO_MODER_MODE5_Msk;`
either names the right field or it silently names a different one, and the
compiler is happy either way — which is the activity's own stated point ("a
wrong shift value is invisible to the compiler").

Every name the activity asks for is in the sim's device header:
`RCC_IOPENR_GPIOBEN` (line 58), `GPIO_OUTPUT` (line 126),
`GPIO_ODR_OD5` (generated at line 191), `GPIO_MODER_MODE5_Msk`/`_Pos`. A
hand-written version of the expected answer compiles and runs. PB5 is header
D6, so an LED in the bay lights when the rewrite is right.

The teaching move is the one the sim is best at: run the raw version, note
`MODER` and `ODR` in the panel, run your macro version, and the panel reads
identically — or it does not, and you can see which field you hit. That is a
self-check the classroom currently has no way to give, since the lab
breadboard for Day 6 is a transistor driver, not a bare LED.

Cost: same as above. This one needs no new starter file even — a ten-line
program with the raw version in it and the macro version to be written.

### 3 and 4. Two homework pointers that cost a sentence each

Both of these run today and both chapters already have a working `<sim>` a few
subsections earlier. Neither needs a new embed; each needs a line telling the
student the window they used in class also does tonight's homework.

- **ch-timers-interrupts Part 8** (`act-timer-homework`, ADCPot with a
  timer-interrupt blink). ADC + TIM14 + interrupt + USART2, all modeled. The
  instructor solution's arithmetic (PSC 4000 × ARR 1000 = 1/3 s exactly) is the
  kind of claim `check-timer.mjs` already asserts against the real clock, so
  the window is trustworthy here.
- **ch-gpio-interrupts Part 8** (`act-gpio-homework`, `counterTwoButtons.c`).
  PB4 *and* PC13 on one `EXTI4_15_IRQHandler`, `EXTICR[1]` vs `EXTICR[3]`, and
  a BSRR-driven LED toggle in the handler — the sim README names all three of
  those as deliberately modeled, and PC13 is the board's own blue button, so
  nothing has to be attached. This is the single best fit in the book for
  "student is blocked away from the board", because the homework is due
  Thursday and the whole difficulty is register geometry.

The existing caveat paragraphs (`volatile` does nothing here; an interrupt is
taken only between statements) apply unchanged and are already written a few
paragraphs up in both chapters.

---

## Tier 2 — worth considering, with real work behind it.

### 5. ch-debugging, Parts 3b and 3c — a fallback, explicitly not the debugger

This one is more interesting than it first looks. Part 3c asks students to
notice that `GPIOA_MODER` reads **0xEBFFFFFF** before the program touches it,
and to find the reason (analog reset state; `EB` because PA13/PA14 are SWD).
The simulator models that value exactly — `stm32-defs.ts:46`, `A: 0xebff_ffff`,
with the comment naming the SWD pins. Part 3b's `RCC_IOPENR` 0x0 → 0x1 on one
step is the sim's default first-step behavior.

So the content of 3b and 3c is reproducible today with `blinky.c`, no sim work.
What makes this Tier 2 rather than Tier 1 is that it is a **different tool**,
and the chapter is about STM32CubeIDE:

- No SFRs tree with **named bit fields**. `register-panel.ts` renders a hex
  value plus a bit grid; it never prints "MODE5 = 0x3". The named field is a
  good part of what Part 3c is teaching a student to read.
- No **Variables** tab, so Part 4's `key` = 117 beside `USART_RDR` = 0x75 is
  half-available: the sim shows the register, not the C variable.
- No breakpoints (Part 3d), no Step Over/Into distinction, no Resume.

The case for it anyway is `insight-debug-ladder`, which currently ends with
"nothing later today requires your own launch, and you can redo this
walkthrough from this chapter, step by step, before the next class." A student
whose ST-Link will not come up is told to read. The sim would let them
*do* 3b and 3c instead. Frame it precisely — "this is not the debugger; it is
the same two registers, so you can at least see them move" — or it will quietly
become the thing students do instead of launching CubeIDE, which would be a
real loss.

Cost: no simulator work. The cost is entirely in getting the framing right, and
it should probably be Petra's call rather than a default add.

### 6. ch-photosensors, the two-channel ADC read — thin, but cheap

The two-channel loop in `inst-day16-two-channel` runs today: the bay takes more
than one pot, A0 (PA0) and A1 (PA1) both have channels, and `adc.ts` already
warns when `CHSELR` is written with `|=` and ends up converting two channels.
The CCRDY subtlety the instructor note calls out (a `CHSELR` write without the
`CCRDY` wait makes `ADSTART` a no-op) is modeled — `adc.ts:187` raises it.

But almost nothing else in Day 16 is sim-able. The photocell study is
resistance measured with a DMM, dividers wired on a breadboard, light swept
across two cups; the tracker needs a servo (PWM) and `milliseconds()` (no
SysTick). The only thing a `<sim>` would add is a place to practise
"alternate the channel between two reads", which is about six lines. I would
**not** add this on its own. It becomes worth a sentence only if Tier 3's PWM
work ever happens.

### 7. PWM output (TIM14 capture/compare) — the roadmap item, and it is bigger than it looks

This is the sim's own stated next step, and it unblocks ch-motors (Days 11, 11x,
12) and ch-servos (Days 15, 15x) in principle. Be skeptical about the size and
the payoff.

**The size.** `CCMR1`/`CCER`/`CCR1` are accepted and ignored today, so the
register half is genuinely small. But a PWM output with nothing to look at
teaches nothing: 1.6 kHz on an LED is just "on", and a 1.5 ms pulse every 20 ms
is "off". The payoff needs a **waveform view** — a small scope or logic-analyzer
panel with period, pulse width and duty read out. That is a second component
about the size of the register panel, and it is the actual cost. `tim.c` also
uses **TIM16** (`milliseconds()`), which is not in the device header at all, so
Day 12's three-rate main loop and Day 16's tracker need a second timer too.

**The payoff, honestly.** Day 11x Part 2 (`act-day11x-registers`) and Day 15
Part 3 (`act-day15-prescaler-table`, `act-day15-fill-in`) are arithmetic
exercises of exactly the kind the Day 8 embed already serves well: derive PSC,
ARR and CCR1, then find out whether 20 ms and 1.5 ms really came out. A numeric
readout alone — "TIM14 CH1: period 20.0 ms, pulse 1.50 ms" — would serve those
two activities without a full scope, and that is a much smaller build worth
scoping separately.

**What it will not buy.** Day 11 Part 6 and Day 15 Part 5 are
`act-day11-demo`/`act-day15-measure`: *predict, then measure on the AD2*. Day 15
Part 6 is powering a servo from a separate supply. Day 16 Part 3 is bolting an
arm together. None of that moves into a browser, and a servo-horn widget that
rotates convincingly would be the most expensive thing in this document for a
day whose whole point is that the real horn holds position against your finger.

Verdict: **later, and split**. The numeric period/pulse readout on TIM14 CH1 is
plausibly worth it for the two arithmetic activities. The full scope panel plus
a servo widget is not, on this evidence.

### 8. `0b` binary literals — small, and worth doing regardless

Not a placement, but it fell out of the survey. The lexer rejects `0b1011`
(`Expected ';' but found 'b1011'`). Two of Petra's own starters use them —
`helloDisplay.c:95` and `writeFirstDigit.c:70`, for seven-segment patterns —
and it is the natural notation for bit patterns in a course that spends sixteen
weeks on bit patterns. It is a GCC extension the real toolchain accepts, so a
program that builds on the board fails in the window, with a message that does
not say why. A few lines in `lexer.ts`. Do it whether or not anything else here
happens.

---

## Tier 3 — do not do these, and why.

### ch-i2c (Days 9x, 10), ch-accelerometers (Days 13, 13x, 14)

Three separate large builds stacked: an I2C1 peripheral model, a device model
(HT16K33, then LSM303AGR), and interpreter support for **arrays and pointers**,
which `SevenSegPartial.c` needs for its font table and `i2c1_memWrite(addr,
reg, data, len)` and which `accel_test.c` needs for `accel_raw.x` (a struct —
the parser fails at line 25). Arrays and pointers in particular are not a
feature, they are a change to how the interpreter represents values.

And the teaching would not follow. Day 9x Part 3b and Day 13 Part 4 are
*capture a transaction on the AD2 and mark it up* — the bus trace is the
lesson, and a simulator that draws the trace it was programmed to draw teaches
the diagram, not the bus. Day 13's WHO_AM_I is a proof that a physical wire is
connected. Day 14 is tilting a sensor. The one honest attraction — a simulated
display that lights up for a student whose wiring is wrong — is exactly the
student who needs to fix the wiring.

### ch-ble (Day 17)

Needs USART1 (a copy of `usart.ts` on a second base address, modest) plus a
Bluefruit model with two modes, AT commands and a MOD pin (not modest). The day
is connecting six wires to a physical module, watching the passthrough, and
reading the link on the AD2's protocol tab. A simulated module that answers
`AT` correctly every time removes the only difficulty there is.

### ch-power (Day 17x)

`PWR`, `SCB->SCR` and `IWDG` are all unmodeled. But the deciding thing is that
the observable in Part 1 is **current draw on a meter**, and the observable of
a correct Stop-mode entry is that nothing happens. A simulator showing a number
it was told to show is a slide with extra steps. The watchdog (Part 3) is the
one piece with a visible effect — a reset when `KEY_RELOAD` is late — but it is
not worth a peripheral on its own.

### ch-io-datasheets (Day 5x)

No code. The day is a datasheet worksheet and a share-out. Nothing to embed.

### ch-motors Day 12's photointerrupter, specifically

Separable from the PWM question, and still no. The EXTI counting on PA15/D7 is
sim-able, but the sensor is an open-collector part whose behaviour students
discover by watching a real trace while a real motor ramps
(`act-day12-wire-and-scope`), and a pulse train the simulator generates on
schedule answers the question the activity is asking.

---

## Summary ranking

| | Where | Sim work needed | Verdict |
| --- | --- | --- | --- |
| 1 | ch-switches Day 4 FSM (`subsec-day4-fsm-code`) | none | **do next** |
| 2 | ch-transistors Day 6 macros (`act-macros-rewrite`) | none | **do next** |
| 3 | ch-timers-interrupts Part 8 homework | none (reuse embed) | **do next**, one sentence |
| 4 | ch-gpio-interrupts Part 8 homework | none (reuse embed) | **do next**, one sentence |
| 5 | `0b` literals in the lexer | a few lines | **do**, independent of placement |
| 6 | ch-debugging Parts 3b/3c fallback | none | ask Petra — framing risk |
| 7 | TIM14 CH1 period/pulse readout | small | later; scope first |
| 8 | ch-photosensors two-channel read | none | only if 7 happens |
| 9 | Full PWM + scope panel + servo widget | large | no, on this evidence |
| 10 | ch-i2c, ch-accelerometers | very large (arrays, pointers, I2C, 2 devices) | no |
| 11 | ch-ble, ch-power, ch-io-datasheets, Day 12 sensor | large to n/a | no |

The pattern in the four Tier-1 items is worth stating: every one of them is a
day whose difficulty is **register geometry or program logic**, and every Tier-3
item is a day whose difficulty is **a wire, a trace, or a moving part**. That
line is a better guide to the next embed than any list of what the interpreter
can parse.
