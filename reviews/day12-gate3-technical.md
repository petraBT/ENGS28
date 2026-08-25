# Day 12 — Gate 3′ technical verification (`source/ch-motors.ptx`, `sec-motors-day12`, lines 2542–3772)

Scope: Day 12's in-class section only. Body prose (written 2026-08-25) checked line by line
against: `assets/datasheets/ee-sx67.pdf` (Omron EE-SX47/67, CSM_EE-SX47/67_DS_E_13_2),
RM0490 Rev 3, DS13867 Rev 3, UM2953 Rev 1, `assets/Labs/Lab6_ES28.pdf` (Doc Rev 0x5a9a),
`assets/starters/*.c`, `assets/ClassSlidesOLD/Day12-Motors(3).pptx`, `source/ch-i2c.ptx`,
`source/ch-gpio-interrupts.ptx`, `source/ch-timers-interrupts.ptx`, and every figure rendered.

### Verdict: BLOCKER

---

## Findings

### BLOCKER

**B-1. The sensor's output polarity is inverted for the wiring the book prescribes.**
`ch-motors.ptx:2716–2728` (prose), `:2729–2748` (`fig-photointerrupter-states` caption **and
artwork**), `:2750` (`sl-day12-states`), `:2862–2865` (`inst-day12-wire-and-scope`).

Claim as written: *"when a slot lets the beam through it conducts and pulls the signal wire down
to 0 V; when a spoke blocks the beam it stops conducting and lets go of the line entirely."*
The rendered SVG says the same in both panels ("A slot is in front of the beam → the transistor
conducts, and OUT is pulled down" / "A spoke blocks the beam → the transistor is off, and the
resistor holds OUT up").

Source: `ee-sx67.pdf` p. 4, *I/O Circuit Diagrams — NPN Output*, the two timing charts for
`EE-SX67@` / `EE-SX67@-WR` (rendered and read directly):

| Row | L terminal | Incident (slot) | Interrupted (spoke) |
|---|---|---|---|
| **Light-ON** | *short-circuited* between L and positive terminal | output transistor **ON** | OFF |
| **Dark-ON** | ***open*** between L and positive terminal | output transistor OFF | **ON** |

The figure draws the **Light-ON** case. But the book itself puts the part in **Dark-ON**: the
cabled-sensor caption says the pink wire *"is not needed here"* (`:2841–2843`), and Lab 6's own
schematic (Figure 1, p. 3 — rendered) draws the sensor's 4-pin connector with **pin 2 marked
with an X**, i.e. L left open, pin 1 → +5 V, pin 3 → ENC_OUT, pin 4 → GND. With L open, OUT is
pulled LOW when a **spoke** blocks the beam and released HIGH when a **slot** passes — the exact
opposite of the figure, the caption, the prose and the slide.

Correction — pick one and make the whole Part consistent:
* (a) keep the figure and tell students to tie the L terminal (pink wire) to the sensor's +5 V,
  which is what selects Light-ON; or
* (b) keep L open and invert the explanation: *"a spoke blocks the beam, the transistor conducts
  and pulls OUT down to 0 V; a slot lets the light through, the transistor stops conducting, and
  the resistor holds OUT up."*

Note the rpm measurement is **not** affected — one edge per slot either way, and a falling-edge
interrupt still counts once per slot; it lands on the arrival of a spoke instead of a slot. What
is affected is the day's reveal, the diagnostics table (see B-3) and anything a student infers
about which state means "slot".

**UNVERIFIED sub-item:** what the 3-pin breakout board in her drawing (blue PCB, pads `OUT`/`GND`/
`VCC`, Adafruit 3985) does with the sensor's L terminal. If the board ties L to VCC, that variant
is Light-ON and the figure is right *for it* while the cabled variant is inverted — which would be
a fact the room needs. Needs the Adafruit 3985 schematic, or a 30-second bench check (scope OUT,
block the beam by hand, note which way it goes).

---

**B-2. The pink wire is the L terminal, not "the LED".**
`ch-motors.ptx:2841–2843` — *"The pink wire drives the LED separately and is not needed here."*

Source: `ee-sx67.pdf` p. 8, *Terminal Arrangement* for `EE-SX672-WR` — **Brown Vcc, Pink L,
Blue GND (0 V), Black OUTPUT**; footnotes on pp. 1, 2, 4 and 5: *"the L terminal wire ((2)
pink)"*, *"Dark-ON when the L terminal … is opened, and light-ON when the L terminal and positive
(+) terminal are connected"*, and *"Do not connect the L terminal to 0 V when using dark-ON
operation."* The emitter LED and the red indicator are internal and run off Vcc; the pink wire
drives neither. Provenance of the error: her old slide 7 says *"Pink wire - Led (optional) to
5V"* — a P-12 reuse of her own misreading of "L".

The brown/blue/black assignments in the same caption are **correct** and match the datasheet.

Correction: *"The pink wire is the L terminal, and it sets the sensor's polarity: left
unconnected the output pulls LOW when a spoke blocks the beam; tied to the sensor's 5 V it pulls
LOW when a slot lets the light through. Never connect it to ground. If it is unused, the
datasheet asks you to cut it back at the connector and insulate it, so it does not pick up
noise."*

---

**B-3. Two rows of `table-day12-diagnostics` contradict the figure the prose says every row
follows from.** `ch-motors.ptx:2786–2793` (*"each row is a consequence of
`fig-photointerrupter-states`"*) vs. `:2807–2810` and `:2811–2814`.

Run the figure's own rule over the table's own rows:

* Row *"A flat line at 3.3 V that never moves → The beam is never being blocked, or the LED side
  has no power."* Under the figure's model (Light-ON) the beam never being blocked means the
  light is always incident, so the transistor is **always conducting** — a flat **0 V**, not
  3.3 V. Only the second cause produces a flat HIGH.
* Row *"A flat line at 0 V → Power and ground are most likely swapped at the sensor."* A sensor
  whose supply is reversed cannot conduct at all, so the 10 kΩ pull-up holds the node at **3.3 V**.
  Under the figure's model the real cause of a flat 0 V is that the rim is not in the gap, so the
  beam is never blocked — the cause the row above claims.

The two beam-related causes are crossed, and they stay wrong (crossed the other way) under
Dark-ON. Correction, for Light-ON: *flat 3.3 V* ⇐ nothing is reaching the phototransistor — the
sensor is unpowered, or power and ground are swapped, or the emitter side is dead; *flat 0 V* ⇐
the wheel's rim is not in the gap, so the beam is never interrupted (or OUT is shorted to
ground). If B-1 is resolved as Dark-ON, swap the two beam causes.

---

### MAJOR

**M-1. `motor_init()` and `motor_speed()` are not code the students have.**
`ch-motors.ptx:3435–3436` — *"`motor_init()` and `motor_speed()` are the driver you wrote on
Wednesday."*

Source: `grep -l motor_init assets/starters/` returns nothing; `TTmotor_ramp.c` declares
`tim14_pa7_pwm_init(void)` and `tim14_pwm_set(uint16_t)`. The chapter's own Day 11x material
(`:2107–2111`) says *"In Lab 6 you are asked to write three functions: `motor_init()`,
`motor_mode()` and `motor_speed()`"* and maps `tim14_pa7_pwm_init()`/`tim14_pwm_set()` onto two of
them; the only one written in class is `motor_mode()` (activity at `:2132`). Lab 6 §2.1 gives the
three prototypes as Deliverable 1. The sentence also omits `motor_mode()`, which
`table-day12-build-order`'s first row depends on (*"IN1 and IN2 follow the mode"*).

Correction: *"`motor_init()` and `motor_speed()` are barely more than `tim14_pa7_pwm_init()` and
`tim14_pwm_set()` from Wednesday's `TTmotor_ramp.c`, and `motor_mode()` is the one you wrote in
class."*

**M-2. Wrong xref for the signed counter, and "written out" overstates what is there.**
`ch-motors.ptx:3437–3443` — *"`SevenSeg_number()` is from Day 10, and so is the signed counter …
`subsec-i2c-ref-ht16k33` has that pattern written out."*

Source: `ch-i2c.ptx:4345` `subsec-i2c-ref-ht16k33` is the *HT16K33 Quick Reference* — the command
table, the display-RAM layout, the page-write rule and the `SevenSeg_dim()` oddity. It contains no
minus sign and no signed counter (`grep -n "minus\|negative\|signed"` over the subsection: no
hits). The signed counter is `act-i2c-hw-t2` in `subsec-day10-next` (`ch-i2c.ptx:3700–3703`), and
it is a task with two hints ("a minus sign, which is one segment"; `abs()`), not a worked pattern
— the only code shown is the instructor-only `sl-day10-hw-solution`, whose `SevenSeg_number()`
takes `uint16_t`, so the sign is the caller's problem. Correction: xref `act-i2c-hw-t2` (or
`subsec-day10-next`) and say *"that is the task where you were asked for it"*.

**M-3. "The same list is in the Lab 6 handout" is false as written.**
`ch-motors.ptx:2843`, and the instructor note at `:2854` (*"say the colors are in the lab
handout"*).

Source: `Lab6_ES28.pdf` full-text search — `brown`, `pink`, `blue`, `black` appear **zero** times
in the prose. Its Figure 1 schematic (rendered at 900 dpi) does label the sensor connector, but
in different words and with a fourth pin X'd out: pin 1 *"RED or BROWN"* → +5 V, pin 2 **X**
(unconnected — the L/pink), pin 3 *"WHITE or BLACK"* → ENC_OUT, pin 4 *"BLACK or BLUE"* → GND.
Correction: *"The same colors are on Lab 6's schematic (Figure 1), which labels them 'RED or
BROWN', 'WHITE or BLACK' and 'BLACK or BLUE'."*

**M-4. "Five volts on a Nucleo pin damages it" is contradicted by the datasheet for this very pin.**
`ch-motors.ptx:2686–2688`; repeated in `task-day12-scope` at `:2703` (*"5 V **will** damage your
Nucleo"*).

Source: DS13867 Rev 3 Table 11 (p. 30) legend — I/O structure **`FT` = "5 V tolerant I/O"**;
Table 12 gives **PA15 = FT** (p. 33) and **PA0 = FT** (p. 31). Table 21 (p. 42) *Voltage
characteristics*: V<sub>IN</sub> max = **VDD + 4.0 V**, note 2: *"To sustain a voltage higher than
4 V the internal pull-up/pull-down resistors must be disabled."* So 5 V on PA15 as a digital
input is inside spec, and the blanket claim is wrong.

The two hazards that **are** documented, and that the chapter already states correctly elsewhere:
5 V onto the breadboard rail that carries the Nucleo's 3.3 V (Lab 6 §2.3, boxed: *"DO NOT connect
the 5V output to your power rail. You will damage the Nucleo"* — `:3574–3575` and `sl-day12-hazards`
get this right), and an analog input driven above VDDA on A0.

Recommended tightening that keeps the safety instruction intact: *"If what you see ever goes above
3.3 V, stop there: nothing in this circuit should be putting 5 V on that node, and 5 V that finds
its way onto the 3.3 V rail — or onto an analog input — will damage the board."* Flagging rather
than editing, because the current wording is hers (her slide-10 review comment: *"5V WILL DAMAGE
your Nucleo"*).

**M-5. PA15 does have a timer channel.** `ch-motors.ptx:3048–3050` —
*"…let a timer count the edges in hardware, which we have not covered and which would in any case
need the sensor on a pin that has a timer channel on it."*

Source: DS13867 Table 13, *Port A alternate function mapping (AF0 to AF7)*, PA15 row:
`SPI1_NSS/I2S1_WS`, `USART2_RX`, **`TIM1_CH1`**, `MCO2`, `USART1_RTS_DE_CK`, `–`, `–`,
`EVENTOUT`. PA15 carries TIM1_CH1 on AF2 (no TIM3, and no TIM14 — which is the true point).
`inst-day12-find-the-pin`'s narrower claim at `:3110–3113` (*"no alternate function in the
**Function** column, only 'I/O'"*) is correct — UM2953 Table 11, CN9 pin 8, Function = `I/O` —
and should not be confused with the datasheet's AF table.
Correction: *"…and it would need a timer this course has not taught: the only timer channel on
PA15 is TIM1_CH1, and everything we have done is TIM14."*

**M-6. The quadrature offset is stated as a quarter of a *slot*.**
`ch-motors.ptx:3019` (*"two of them, a quarter of a slot apart"*) and `task-day12-stretch-quadrature`
at `:3716` (*"a second sensor a quarter of a slot away from the first"*), against
`inst-day12-stretch` at `:3742–3743`, which has it right (*"one a quarter of a **cycle** ahead of
the other"*).

One output cycle is one slot **pitch** — slot plus spoke. On a wheel with equal slots and spokes,
a quarter of a *slot* is an eighth of a pitch, i.e. 45°, not the 90° quadrature needs; a student
sketching from the task's wording gets waveforms from which the "which one leads" test does not
work cleanly. Correction: *"a quarter of a slot pitch — a quarter of one slot-plus-spoke, which is
a quarter of a cycle of the output."*

**M-7. `fig-three-rates` commits to the polled answer that Part 4 then rejects.**
Caption at `:3131–3135` (*"The loop looks for an edge on every pass"*) and the artwork's own row
label (rendered: *"every pass / look for an edge"*), against `:3335` (*"We'll use the interrupt"*)
and `inst-day12-main-loop-sketch` at `:3643–3644` (*"Every pass: **nothing**, if the pulses are
being counted by the interrupt — which is the point of using one"*).

The figure and `sl-day12-three-rates` also go up **before** `act-day12-poll-or-interrupt`, so the
Part's one student decision is pre-answered from the wall — in the direction the Part goes on to
retire. Correction: relabel the row and caption to state the *constraint* rather than the
mechanism — *"every pass: nothing may block, because a pulse can arrive at any moment"* — and let
Part 4 settle how the pulse is noticed.

**M-8. "It will not run on 3.3 V at all" is an inference presented as a datasheet fact.**
`ch-motors.ptx:2649–2653`, `:2743–2746`, `:2877–2879`.

Source: `ee-sx67.pdf` p. 3, *Ratings and Specifications*: **"Supply voltage: 5 to 24 VDC ±10%,
ripple (p-p): 10% max."** The datasheet gives a rated range and nowhere states behaviour below it;
the ±10% puts the specified floor at 4.5 V. Correction: *"…its rated supply is 5 to 24 VDC, so
3.3 V is below anything the manufacturer specifies — which is exactly why its supply and its HIGH
level have to be two different rails."* The conclusion survives; the attribution has to go.

---

### MINOR

**m-1. The pull-up "wide middle" argument omits the datasheet's own lower bound.**
`:2768–2776`. `ee-sx67.pdf` p. 3 specifies the control output's **"OFF current (leakage current):
0.5 mA max."** A 10 kΩ pull-up to 3.3 V can source only 330 µA, less than that worst-case
leakage, so the datasheet does not by itself guarantee a valid HIGH at 10 kΩ (real leakage is
microamps, and both Lab 6 and her own deck specify ~10 kΩ). The paragraph currently implies the
only cost of a *larger* resistor is rise time and noise; one clause fixes it.

**m-2. Related idealization**, `:2722–2724`: *"the only things connected to that row are the
10 kΩ resistor and the 3.3 V at the far end of it."* True to within the leakage above. Worth
recording that the datasheet **settles Gate 1's open question in the book's favour**: the NPN
output circuit on p. 4 shows OUT as a bare open collector with the load external — there is no
internal pull-up to the sensor's own supply, which is what the whole 3.3 V argument rested on.

**m-3. The SysTick minus-one is attributed to the clock rather than to the reload.**
`:3198–3200` — *"`SysTick->LOAD` gets 12000 − 1 because the clock is 12 MHz, and 12 MHz divided by
12000 is 1 kHz."* Arithmetic verified: 12 000 000 / 12 000 = 1000 Hz = one interrupt per
millisecond ✓, and the listing is verbatim from `sysinit.c` (whose own comment reads *"Assumes
12MHz clock…could be better"*). But the reason for the −1 is the counter running from the reload
value down through zero — LOAD + 1 cycles — which is Day 8's rule (`ch-timers-interrupts.ptx:198–203`,
`:759–767`: *"both PSC and ARR are written as the desired factor minus one … the counter counts
from 0 through ARR inclusive"*), and the paragraph explicitly invokes Day 8 two sentences earlier.
Suggested: *"…gets 12000 − 1 for the reason ARR did on Day 8: the counter runs from the reload
value down through zero, so 12000 − 1 is 12000 cycles of the 12 MHz clock, and 12 MHz / 12000 is
1 kHz."* (SysTick's down-count direction is documented in the Cortex-M0+ generic user guide, which
is not in this repo — **UNVERIFIED in-repo**.)

**m-4. `fig-three-rates` is not to scale and does not say so.** The caption says *"drawn over one
second"*; the SVG has **9** ticks on the "every 10 ms" row (should be 100) and about 10 pulses on
the bottom row (60–75 at the speeds Part 2 measures). The qualitative point survives and 100 ticks
would be illegible — add "not to scale" to the caption.

**m-5. Line 15 is the *high* byte of `EXTICR4`, not the low byte like Day 9's line 4.**
`inst-day12-poll-or-interrupt` at `:3396–3398` gives `EXTI->EXTICR[3]` (correct) but not the field.
RM0490 §12.5.6: address offset `0x060 + 0x4*(x−1)`, fields `EXTIm[7:0]` … `EXTIm+3[7:0]` with
`m = 4*(x−1)`; so `EXTICR4` holds EXTI12–EXTI15 and **EXTI15 is bits 31:24**. A student
transplanting Day 9's line (`EXTI->EXTICR[1] |= (EXTI_PB << EXTI_EXTICR2_EXTI4_Pos)` —
`ch-gpio-interrupts.ptx:764`, the *lowest* byte) into `EXTICR[3]` without changing the field
configures line 12. Worth naming the field in the instructor block. The CMSIS spelling
(presumably `EXTI_EXTICR4_EXTI15_Pos/_Msk`) **cannot be verified here** — `stm32c031xx.h` is not
in the repo.

**m-6. Lab 6's boxed 5 V rule and the book's sentence will read as a conflict.**
`:3569–3573` and `sl-day12-hazards`: *"The regulator's 5 V output powers the motor and the
photointerrupter, and nothing else."* Lab 6 §2.3 boxes: *"DO NOT connect the 5V output to your
power rail… **ONLY** connect it to the Motor Power on the TB6612."* The book is right on the
electricals — Lab 6's own Figure 1 feeds both the TB6612's VM+ and the sensor from `+5V`, and her
Day 12 drawing puts the sensor's VCC on the VM column — but a student reading the lab's boxed rule
will think the sensor is excluded. One clause ("the lab's warning is about the breadboard's power
rails, not about the sensor") removes it.

**m-7. Both were homework.** `:3437–3442` implies `SevenSeg_number()` was done in class and only
the signed counter was homework. Both are tasks in `act-i2c-homework` (`ch-i2c.ptx`, t1 and t2).

**m-8. `act-day12-driver-questions` (`:2568`) is the one activity in the section with no
instructor block.** It is a discussion prompt rather than a coded activity, so P-10 arguably does
not bite — flagging so the omission is a decision rather than an oversight.

---

## Unverified

* **Whether the 3-pin breakout (Adafruit 3985, the blue PCB in `fig-day12-wiring`) ties the
  sensor's L terminal to VCC.** This decides whether that variant is Light-ON (figure correct) or
  Dark-ON (figure inverted). Needs the Adafruit 3985 schematic or a bench check.
* **The supply path in `fig-day12-wiring`.** Traced at pixel level: the sensor's VCC (blue) lands
  on the TB6612's **VM** column ✓ (so the book's *"the same node that already feeds the driver's
  `VM` pin"* is right about the topology), but that column is bridged to **Vcc** by a short red
  jumper, and a red wire arrives at the Vcc column from the Nucleo's **3V3** pin (verified: the
  dark-red wire lands on `3V3`, not `5V`). As drawn, the node the caption calls "the regulator's
  5 V" is therefore tied to the 3.3 V rail, and the regulator's pads are empty. The caption warns
  readers off the regulator but not off this bridge; Day 11's own text says the TB6612's *"logic
  power [comes] from the Nucleo's 3.3 V"* (`:1344–1345`). Needs her confirmation of what the real
  board does. Same defect as her slide 10, as the source comment already says.
* **CMSIS field name** `EXTI_EXTICR4_EXTI15_Pos/_Msk` — needs `stm32c031xx.h`.
* **SysTick's down-count/reload semantics** — needs PM0223 (Cortex-M0+ generic user guide); not in
  the repo.

---

## Verified correct (so it is on the record)

**Datasheet.** `EE-SX672` is legible on `fig-day12-sensor-body.jpg` (rendered at 3×) ✓. It is an
**NPN** model — p. 1 ordering table puts `EE-SX672` in the *NPN output* column and
`EE-SX672P`/`EE-SX672R` in the *PNP* one; p. 3 lists it under *NPN models* ✓. Control output
**"NPN open collector"** is the datasheet's exact phrase, in *Ratings and Specifications* ✓.
Supply voltage **5 to 24 VDC** ✓ (with ±10%, see M-8). Response frequency **"1 kHz min. (3 kHz
average)"** ✓, and "far above the tens of hertz this wheel produces" ✓ (20 slots at 180–222 rpm =
60–74 Hz). No internal pull-up on OUT ✓ (p. 4 NPN output circuit) — this closes Gate 1's
highest-consequence open item.

**Registers and citations.** `EXTI_EXTICR4` is documented in **§12.5.6** *EXTI external interrupt
selection register (EXTI_EXTICRx)* ✓ and **§12.5.9** is only the register map ✓ (RM0490 pp. 226,
229). `EXTI_RTSR1` §12.5.1, `EXTI_FTSR1` §12.5.2, `EXTI_FPR1` §12.5.5, `EXTI_IMR1` §12.5.7 ✓ —
and "the rising- and falling-edge trigger registers" is a fair rendering of *rising/falling
trigger selection register* ✓. `EXTI4_15` is *"EXTI line 4 to 15 interrupt"*, NVIC position 7
(RM0490 p. 215) ✓, so the `4` in `EXTI4_15_IRQn`/`EXTI4_15_IRQHandler` stays a `4` ✓. `EXTICR4`
covers EXTI12–15 ✓. `EXTI_PA` = 0 in `assets/starters/ES28.h` ✓; `EXTI->EXTICR[3]` for
`EXTI_EXTICR4` ✓ (C indexing, as taught at `ch-gpio-interrupts.ptx:744–745`). PA15's alternate
functions are exactly `SPI1_NSS/I2S1_WS`, `USART2_RX`, `TIM1_CH1`, `MCO2`, `USART1_RTS_DE_CK`,
`EVENTOUT`, with no TIM3 ✓ (DS13867 Table 13).

**D7 = PA15.** UM2953 Table 11 (p. 20), CN9 pin 8: *D7 · ARD_D7 · PA15 · I/O* ✓ — quoted exactly
in `inst-day12-find-the-pin`. Table 12, pin 37: *PA15 · ARD_D7* ✓. D11 = PA7 with
*SPI_1_MOSI || TIM_14_CH1* ✓, so "unlike D11 … and is why the PWM comes out there" ✓. Table 11 is
on page 20 ✓.

**Code.** Both `<program>` listings are verbatim `assets/starters/sysinit.c` — every line matches
character for character; only the order differs from the file (the file has
`currentMilliseconds`/`delay_ms`/`SysTickInit`/`SysTick_Handler`/`milliseconds`) and
`SystemInit()`/`delay_ms()` are omitted, which `sl-day12-milliseconds`'s note discloses.
`check_starters.py` passes on `SysTickInit()`. `SystemInit()` does call `SysTickInit()` ✓.
`#define SENSOR_PIN (1U<<15)` + `GPIOA->IDR & SENSOR_PIN` is the course idiom
(`counterResetButtonPolled.c`: `#define BUTTON_PIN (1U<<4)`, `(GPIOB->IDR & BUTTON_PIN) == 0`) ✓.
`counterResetButtonInt.c` exists and is the Day 9 PB4 interrupt starter with the same five moves
(`EXTI_EXTICR2_EXTI4_Msk/_Pos`, `EXTI_FTSR1_FT4`, `EXTI_IMR1_IM4`, `EXTI4_15_IRQn`,
`EXTI_FPR1_FPIF4`) ✓. `start_conversion()`/`adc_read()` are in `ADCPot.c` (Day 7,
`ch-adc.ptx:1050`) ✓. `SevenSeg_number(uint16_t, uint8_t*)` is in `SevenSegPartialORIGINAL.h` ✓.
`tim14_pa7_pwm_init()`/`tim14_pwm_set()` and PA5=AIN1, PA6=AIN2, PA7=PWMA are `TTmotor_ramp.c`'s ✓;
PWM 0–1249 ✓ (`PWM_TIMER_MAX 1250`, clamp at `PWM_TIMER_MAX-1`), 1.6 kHz ✓ (12 MHz / 6 / 1250).
`inst-day12-main-loop-code` checked line by line: 16-bit `volatile` counter, wrap-safe unsigned
subtraction, `last_sample += 10`, `60 * count / SLOTS` (60 × 60 / 20 = 180) ✓.

**Arithmetic, recomputed independently.** RPM = 60·PPS/N ✓; N = 20 ⇒ 3×PPS and 60 pulses ⇒
180 rpm ✓, matching `sec-speed-before-class` (`:2358–2360`) ✓. Both edges ⇒ `2N` ✓. Angle
2π/N rad, 360/N deg, 1/N rev ✓ (18° at N = 20). Equal slots and spokes ⇒ 50 % duty ⇒ HIGH time
1/(2f) ✓. The polled condition (*interval < the shorter of HIGH and LOW*) is right, and the
warning against shortening it to "a 100 Hz loop cannot see a 60 Hz signal" is right ✓.
One pulse in a 1 s window = 60/N = 3 rpm ✓; 30 rpm = 10 pulses = 10 % ✓; 180 rpm = 60 pulses,
3/180 = 1.7 % ⇒ "under 2 %" ✓; interval timing at 3 rpm = 1 pulse/s ⇒ 1 ms/1000 ms = 0.1 % ✓; at
180 rpm ⇒ 16.7 ms ⇒ "about 17 ms" and 6 % ✓, "worse than counting's 2 %" ✓. Deadband:
3.3/4096 = 0.806 mV ⇒ "a little under a millivolt" ✓; 1.65 V ⇒ 2048 ✓; 100 counts ⇒ 80.6 mV ⇒
"about 80 mV" ✓; 12 MHz/12000 = 1 kHz ✓. Lost pulse at the read/zero boundary ≤ 1 pulse/s = 3 rpm
⇒ "a few rpm" ✓. Quadrature "four distinguishable edges per slot" ✓.

**Figures, rendered and read.** `fig-photointerrupter-states` (Chrome, 1100×600 — the square
`qlmanage` thumbnail clips the right panel): caption matches the artwork exactly, including
"3.3 V", "10 kΩ", "OUT", and both state legends — the artwork is internally consistent with its
caption, and the problem is B-1, not the drawing. `fig-day12-wiring-annotated.png`: at the sensor,
orange = OUT, black = GND, blue = VCC ✓ exactly as the caption says; her two callouts are present
with the wording the caption quotes; the regulator's 5V/GND/Vin pads are indeed empty ✓; no
OUT-to-PA15 arrow ✓. `fig-day12-lab6-build.svg`: green wire lands on **D7** ✓, pot wiper on
**A0** ✓, red wire on **3V3** ✓, orange/green/brown on D11/D12/D13 ✓, display on SDA/SCL ✓, block
order left-to-right as the caption says ✓. `fig-deadband.svg`: 0 V/0, 1.65 V/2048, dead band
labelled "motor stopped" ✓. `fig-day12-cabled-sensor.jpg`: a 4-core cabled slot sensor ✓
("four-core cable" ✓). `fig-three-rates.svg`: rows and labels as the caption says (see m-4 for
scale).

**Classroom and physical claims.** *"Only some kits have this cable"* ✓ (her slide 7: *"Some of
you have a photointerrupter with a long cable on it"*). *"Its power is 5 V"* ✓ (her slide-6
callout: *"The photointerrupter needs a 5V voltage supply"*; Lab 6 Figure 1 feeds it from `+5V`).
*"Don't wire the signal wire into the Nucleo yet"* ✓ (her callout). *"Twenty slots"* ✓ (Lab 6:
`RPM = 60 × PPS / 20`). *"The signed counter was homework and we have not gone over it in class"* ✓
(`act-i2c-homework`). *"Lab 6 … asks you not to use `delay_ms()` for timing"* ✓ (Lab 6 §2.2:
*"you may not use delay ms() for timing"*). *"1.6 kHz … tested with no motor connected"* ✓ (Lab 6
§2.1 and Deliverable 1). *"5 V on its output side"* ✓ (Lab 6 §2.3). *"The regulator gets hot"* ✓
(Lab 6 Pro Tip). *"Lab 6's own schematic draws the pot on the 5 V net while the lab text describes
a 3.3 V pot"* (instructor note at `:3588`) — **confirmed**: Figure 1 wires the 10K pot between
`+5V` and GND, wiper → `TARGET_SPEED` → A0, while §2.2 gives 0 V / 1.65 V / 3.3 V.

**Recalls that check out (B4).** Open-drain and `OTYPER`, and that the external pull-up sets the
level: `ch-i2c.ptx:2512` *Part 6: The Pins, and Why They Must Be Open-Drain* ✓, so the "no
`OTYPER` bit on the sensor" contrast is sound. `EXTI_RTSR1` **is** taught on Day 9
(`ch-gpio-interrupts.ptx:804`, `:852`, `:1945`, `:2011`) ✓, so *"you have RTSR1 and FTSR1 from
Day 9"* is accurate. `volatile` and its reason ✓ (`:301–304`). The polled button that misses
events while inside `delay_ms(1000)` ✓ (`counterResetButtonPolled.c` header). PB4 = D5 ✓.

**Lint and build integrity.** `check_rules.py source/ch-motors.ptx` → 0 errors, 0 warnings.
`check_deck.py assets/decks/day12.json` → 40 slides, 30 refs, 0 problems. `check_starters.py` →
0 problems. All seven image paths in the section resolve. All six outbound xref targets exist
(`fig-rpm-formula`, `subsec-day10-pins`, `fig-photointerrupter-beam`, `subsec-i2c-ref-ht16k33`,
`fig-tb6612-wiring-2`, `fig-encoder-wheel`) — but see M-2 for one that resolves to the wrong
place. The three slides the source comments describe as parked (`sl-day12-naive-loop`,
`sl-day12-two-answers`, `sl-day12-deadband-table`) are indeed absent from `day12.json` ✓. No
"yellow", no "bench", no Williams citation, no 48 MHz; every one of the section's nineteen `5 V`
mentions is on the motor/sensor supply side or in a hazard warning.

---

## Reasoning passes

**B1 — rules against the chapter's own examples.** Two hits. `fig-photointerrupter-states`'
rule ("beam through ⇒ conducts ⇒ LOW") misclassifies two of the four rows of the chapter's own
diagnostics table two pages later (**B-3**), and the prose explicitly claims each row is a
consequence of that figure. And "a quarter of a slot" applied to the chapter's own wheel — equal
slots and spokes — gives 45°, not the 90° the instructor block's "a quarter of a cycle" requires
(**M-6**).

**B2 — arithmetic in prose.** Every worked number recomputed; all the answers are right (see
"Arithmetic" above). One right answer reached by a step that is not stated: the SysTick
`12000 − 1` is justified by the clock rate rather than by the reload semantics (**m-3**). One
comparative claim that the artwork does not honour: "drawn over one second" against 9 ticks on a
100 Hz row (**m-4**). One bound omitted from an argument that claims to enumerate the trade-offs:
the output's 0.5 mA OFF leakage against 330 µA of pull-up current (**m-1**).

**B3 — end-to-end read for self-contradiction.** Three hits. `fig-three-rates` asserts the polled
loop shape that Part 4 rejects and that `inst-day12-main-loop-sketch` explicitly contradicts
("every pass: nothing") — **M-7**. The diagnostics table against the states figure — **B-3**.
And inside Part 2, the pink wire being "not needed" against the figure's Light-ON polarity —
**B-1/B-2**, the same defect wearing two hats. Also noted: `:3437–3442` implies `SevenSeg_number()`
was classwork and the signed counter homework, when both were homework (**m-7**).

**B4 — against the rest of the book.** Three hits: `motor_init()`/`motor_speed()` claimed as
written when Day 11x's own slides say they are Lab 6's to write (**M-1**); the signed-counter xref
pointing at the HT16K33 quick reference instead of Day 10's homework (**M-2**); "a pin that has a
timer channel on it" against DS13867's PA15 row (**M-5**). And one inherited rule not invoked
where it pays out: Day 8's written-minus-one (**m-3**). Everything else the section presents as
recalled — open-drain/`OTYPER`, `RTSR1`/`FTSR1`, `volatile`, the five EXTI moves, the
`EXTICR` array indexing, the Day 9 polled counter, PB4 = D5, the pre-class RPM = 3 × PPS — matches
the book where it was taught.
