# Day 12 — Gate 3″ technical verification

Scope: `sec-speed-before-class`, `sec-motors-day12` (Parts 1–6), and the new
`sec-motors-reference`. Everything below was checked against a source, named in
the finding. Carve-outs 1–7 of the brief are not re-reported.

**Verdict: BLOCKER** — three findings contradict the source they cite, two of
them inside the new Reference section that exists to be looked up.

Sources used: `assets/stm32c031_rm.pdf` (RM0490 Rev 3, read with pypdf),
`assets/stm32c031_datasheet.pdf` (DS13867 Rev 3, Table 13),
`assets/nucleo_user_manual.pdf` (UM2953 Rev 1, Tables 11 and 12),
`assets/datasheets/TB6612FNG_datasheet_en_20141001.pdf` p. 4,
`assets/datasheets/ee-sx67.pdf`, `assets/Labs/Lab6_ES28.pdf`,
`assets/starters/TTmotor_ramp.c`, `assets/starters/sysinit.c`,
`assets/starters/counterResetButtonInt.c`, `assets/starters/ES28.h`,
`assets/ClassSlidesOLD/Day12-Motors(3).pptx` and `Day11x-Motors(2).pptx`,
and every Day 12 figure rendered at full size (Chrome headless at the SVG's own
viewBox — `qlmanage` crops these figures and misleads).

---

## BLOCKERS

### B1. `ch-motors.ptx:3084` — "nothing on this pin can capture or count edges in hardware" is refuted by the same sentence's own list

`inst-day12-find-the-pin` reads:

> UM2953's *Function* column gives `PA15` only "I/O" … the STM32C031C6 datasheet
> does list alternate functions on PA15 — `SPI1_NSS/I2S1_WS`, `USART2_RX`,
> **`TIM1_CH1`**, `MCO2`, `USART1_RTS_DE_CK` and `EVENTOUT` — but *no TIM14
> channel*, so **nothing on this pin can capture or count edges in hardware** and
> the counting has to be done in software either way.

Source checked: DS13867 Rev 3, Table 13 (*Port A alternate function mapping,
AF0 to AF7*), p. 36. PA15 = AF0 `SPI1_NSS/I2S1_WS`, AF1 `USART2_RX`, **AF2
`TIM1_CH1`**, AF3 `MCO2`, AF4 `USART1_RTS_DE_CK`, AF7 `EVENTOUT`. The list of
six is exactly right and the "no TIM14" is right (TIM14_CH1 is on PA4 and PA7
only). The conclusion is wrong: `TIM1_CH1` **is** a timer capture/compare
channel. RM0490 §15.3.7 *Input capture mode* and §15.3 *External clock source
mode 1* (SMS=111, counting each rising or falling edge on TI1) are TIM1's, and
TIM1 reaches PA15 at AF2. So PA15 can both capture and hardware-count edges.
This is the damaging shape: the counter-example is in the same sentence, and a
student who checks Table 13 will find it.

Correction — rewrite in place, same length:

    ADD: "...and MCO2 — including TIM1_CH1, which could capture or count edges in
    hardware. We do it in software anyway: TIM1 input capture is not something this
    course has taught."
    DISPLACES: "...and EVENTOUT — but no TIM14 channel, so nothing on this pin can
    capture or count edges in hardware and the counting has to be done in software
    either way."
    NET: −6 words

The same error is repeated at **`ch-motors.ptx:3016`**, `inst-day12-pulses-to-rpm`:
"let a timer count the edges in hardware, which we have not covered and **which
would in any case need the sensor on a pin that has a timer channel on it**".
PA15 has one. Cut the clause after "covered": **NET −16 words**.

### B2. `ch-motors.ptx:3809` and `:3813` — `OC1M` is not in RM0490 §17.4.5

`table-motors-tim14-registers` sends the reader to **§17.4.5** for both `OC1M`
and `CC1S`.

Source checked: RM0490 Rev 3, p. 485 — §17.4.5 is headed "The same register can
be used for **input capture mode (this section)** or for output compare mode
(**next section**)"; its fields are `IC1F[3:0]`, `IC1PSC[1:0]`, `CC1S[1:0]`.
`OC1M[3:0]` is in **§17.4.6**, *TIM14 capture/compare mode register 1
[alternate]*, p. 486–487 (bits 16 and 6:4). A student who opens §17.4.5 looking
for the `0110` PWM pattern will not find it and will find input-capture filter
bits instead.

Correction: `OC1M` row → **§17.4.6**. `CC1S` row → **§17.4.6** as well, since the
driver configures the channel as an *output*; §17.4.5's `CC1S` is the same two
bits but the wrong view of the register. Two cell edits, **NET 0**.

### B3. `ch-motors.ptx:3921` — the TB6612 Stop row's `PWM` is **H**, not "either"

`table-motors-tb6612-modes`, last row: `IN1` L, `IN2` L, `PWM` **"either"**,
"*Stop*: both outputs off, so the motor coasts".

Source checked: TB6612FNG datasheet p. 4, *H-SW Control Function* — the row is
`L | L | **H** | H | OFF (High impedance) | Stop`. The datasheet gives no row for
`L L L`. The `H/L` don't-care notation is used elsewhere in that same table (the
Short brake row is `H | H | H/L`, and the Standby row is `H/L | H/L | H/L`), so
the plain `H` is deliberate. The chapter's own artwork proves it:
`fig-tb6612-truth-table` (`assets/images/Day11-Motors/tb6612-truth-table-annotated.png`,
rendered) shows the Stop row's PWM cell as a bare **H** inside Petra's green
callout, and `fig-tb6612-truth-table`'s caption at `:807` defines "H/L in a cell
means the value in that position does not matter for that row." Day 11 gets this
right — `inst-day11-direction` at `:958` frames all four modes "**With PWM held
HIGH**".

Correction: change the Stop row's `PWM` cell from `either` to `H`, and add a
five-word clause. **NET +5 words**, in the Reference, unbudgeted.

    ADD (Stop row, "What the motor does"): "Stop: both outputs off, so the motor
    coasts. With PWM LOW the datasheet gives no row."
    DISPLACES: "Stop: both outputs off, so the motor coasts"
    NET: +9 words (Reference section — unbudgeted)

---

## MAJOR

### M1. `ch-motors.ptx:3773–3775` — "Offsets are from the timer's own base address" misdescribes four of the table's twelve rows

The intro to `table-motors-tim14-registers` says: "Offsets are from **the
timer's own base address**". Four rows are not timer registers:
`RCC_IOPENR` (offset given as "—"), `GPIOA_MODER` (**0x00**), `GPIOA_AFR[0]`
(**0x20**), `RCC_APBENR2` (**0x40**). Applying the stated rule to
`GPIOA_MODER`'s 0x00 lands the reader on `TIM14_CR1`, and `GPIOA_AFR[0]`'s 0x20
is byte-for-byte `TIM14_CCER`'s offset — the collision is inside the table. The
rule is refuted by the table's own rows.

Verified for the record (RM0490 Rev 3): `RCC_IOPENR` **0x34**, §5.4.11 (p. 128);
`RCC_APBENR2` **0x40**, §5.4.14, `TIM14EN` bit 15 (p. 131); `GPIOx_MODER` 0x00
§6.4.1 (p. 154); `GPIOx_AFRL` 0x20 §6.4.9 (p. 158). Every **TIM14** offset and
section number in the table is correct: `CR1` 0x00 §17.4.1, `EGR` 0x14 §17.4.4
(and `UG`'s access really is `w`, write-only), `CCMR1` 0x18, `CCER` 0x20 §17.4.7,
`PSC` 0x28 §17.4.9, `ARR` 0x2C §17.4.10, `CCR1` 0x34 §17.4.11. `§17.3.8 PWM
mode` in `table-motors-lookups` is right too (p. 479).

Correction — Reference, unbudgeted:

    ADD: "Offsets are from each peripheral's own base address, and the section
    numbers are RM0490's." + fill RCC_IOPENR's offset cell with 0x34 and split the
    two RCC rows' section numbers to §5.4.11 and §5.4.14.
    DISPLACES: "Offsets are from the timer's own base address, and the section
    numbers are RM0490's."
    NET: +2 words

### M2. `ch-motors.ptx:3869–3873` — the "50 Hz alternative, and why not" contradicts Lab 6's own optional exercise

The Reference says:

> **The 50 Hz alternative, and why not.** At 50 Hz the period is 20 ms rather
> than 625 µs, which is long enough for the motor to accelerate and decelerate
> within each period rather than averaging across it. The switching frequency has
> to sit above the motor's own mechanical response, and 1.6 kHz does.

Source checked: `assets/Labs/Lab6_ES28.pdf` §4 *Going Further*: "We are running
this motor using very high frequency (for a motor) PWM. This provides very
smooth angular velocity and torque, **at the expense of low speed operation**.
Some sources recommend running at a **lower** PWM frequency for **improved low
speed torque**. If you are curious, change your PWM to run at 50 Hz and compare."
`TTmotor_ramp.c` carries Petra's own commented-out 50 Hz constants (`PSC_FACTOR
120`, `PWM_TIMER_MAX 2000` → 12 MHz/120/2000 = 50 Hz exactly) under the comment
`// trying 50 Hz`.

The arithmetic is right (1/50 Hz = 20 ms ✓) and the mechanism described is real,
but the *verdict* — "why not" — is the opposite of the one the lab asks students
to go and test, and it is unsourced. A student who does Lab 6's optional section
will find the book told them the answer in advance, and told them wrong.
**UNVERIFIED** as a claim: no source in the repo supports "the switching
frequency has to sit above the motor's own mechanical response."

Correction — Reference, unbudgeted:

    ADD: "**The 50 Hz alternative.** At 50 Hz the period is 20 ms rather than
    625 µs, long enough for the motor to accelerate and decelerate within each
    period rather than averaging across it. That torque ripple is a cost at speed
    and can help starting torque at very low speed, which is what Lab 6's optional
    section asks you to try."
    DISPLACES: the whole paragraph at :3869–3873.
    NET: +4 words

### M3. `ch-motors.ptx:2664–2665`, `:2718–2720`, `:3540` — powering the sensor from the regulator's 5 V contradicts Lab 6's boxed warning

Body prose: "Its power is 5 V, taken from the regulator — the same node that
already feeds the driver's `VM` pin". `task-day12-wire`: "Its power is 5 V, taken
from the regulator, just as the motor's is." `sl-day12-hazards`: "The regulator's
**5 V powers the motor and the photointerrupter**, and nothing else."

Source checked: Lab 6 §2.3, in an `Important!` box: "**DO NOT** connect the 5 V
output to your power rail on the breadboard. You will damage the Nucleo. **ONLY
connect it to the Motor Power on the TB6612**"; and §2.2 "Use the 5 V pin to
power the **motor only**." Lab 6 §2.5 then says only "Wire the speed sensor to
power and ground" without naming a rail.

Both the book and the lab agree the 5 V must not touch a breadboard rail. They
disagree on whether the sensor may hang off that node. The book is technically
right (EE-SX67 supply range is 5–24 VDC, so 3.3 V is out of range — verified
below), and Petra's own Day 12 deck slide 6 says "The photointerrupter needs a
5V voltage supply". So the *book* is correct and the *lab* is stale. But
`sl-day12-hazards` reads as if it were quoting Lab 6, and a student holding the
handout will see a direct conflict.

Correction — in-class, at equal length:

    ADD (sl-day12-hazards bullet 2, after "and nothing else."): "Lab 6's own box
    says motor only; the sensor needs 5 V too, so it shares that node."
    DISPLACES: nothing in the bullet; instead delete the last sentence of the
    slide's note ("The first bullet is the one that is easy to get wrong: Lab 6's
    own schematic draws the pot on the 5 V net — most likely a leftover, but Petra
    has not confirmed it — while the lab text describes a 3.3 V pot.") is NOT the
    right displacement — keep it. Displace instead the redundant second sentence of
    the body paragraph at :3528–3530, "and to no rail — the Nucleo's 3.3 V feeds one
    of the breadboard's power rails, so 5 V put on a rail arrives on the Nucleo and
    damages it", which `sl-day12-hazards` bullet 2 already carries verbatim.
    NET: −13 words

Flag for Petra: Lab 6 §2.2/§2.3 need one word changed ("motor only" → "motor and
speed sensor only") or the book will keep diverging from it.

### M4. `ch-motors.ptx:3104–3111` — `fig-three-rates` labels every pass "look for an edge", which is the design Part 4 then retires

Rendered at 1120×480. Row 1 reads **"every pass / look for an edge"**. Row 2
"every 10 ms / read the knob". Row 3 "once a second / count → rpm → display".
Row 4 "the pulses / arrive when they arrive".

Two problems. (a) The caption paraphrases row 1 as "**something happens** on
every pass of the loop", which is not what the picture says. (b) The picture
commits to polling, and `inst-day12-main-loop-sketch` at `:3599` says the
opposite: "**Every pass: nothing**, if the pulses are being counted by the
interrupt — which is the point of using one." The chapter chooses the interrupt
at `:3288` ("We'll use the interrupt"). Students will have this figure on screen
while being told the row-1 label is the wrong answer.

Correction — change the artwork's row-1 label to "**every pass / ask the time**"
(that *is* what the loop does on every pass in both designs — `milliseconds()`
is called unconditionally in `inst-day12-main-loop-code`), and the caption's
first clause to match. Asset edit + caption edit, **NET 0**.

### M5. `ch-motors.ptx:2317–2320` ⟷ `:3377–3378` — "the same resistor appears in the Lab 6 wiring" is contradicted by the chapter's own Lab 6 figure

Before-class: "The output needs a pull-up resistor — about 10 kΩ between the
output and 3.3 V — and **the same resistor appears in the Lab 6 wiring**."
`fig-day12-lab6-build`'s caption: "The sensor is drawn here with **the pin's own
internal pull-up enabled rather than the external resistor**." I traced the
rendered `fig-day12-lab6-build.svg` — the sensor's OUT (green) runs straight to
D7 with no resistor anywhere on that row, so the caption is right about the
drawing.

Source checked: Lab 6 §2.5 — "pull the OUT terminal up with an **internal pullup
resistor or** a 10 kΩ resistor to 3.3 V", and the `Note!` box repeats the choice.
Petra's Day 12 deck slide 10 likewise: "Wire photointerrupter OUT to PA15
(internal or external pullup)."

Correction — before-class, at equal length:

    ADD: "The output needs a pull-up resistor — about 10 kΩ between the output and
    3.3 V, or the pin's own internal one, which is what Lab 6 offers you."
    DISPLACES: "The output needs a pull-up resistor — about 10 kΩ between the output
    and 3.3 V — and the same resistor appears in the Lab 6 wiring."
    NET: +2 words

---

## MINOR

- **`ch-motors.ptx:3773`** — "The **twelve steps** of `tim14_pa7_pwm_init()`, as
  registers." The count is right (the driver makes exactly twelve register
  writes) but the table's order is not the function's: `TIM14_CCR1` is the
  driver's **seventh** write (`TIM14->CCR1 = 0;`, immediately after `ARR`), and
  the table lists it twelfth. Ordering is load-bearing in this function — the
  whole point of the `EGR`/`UG` row is that it must precede `CR1`/`CEN`. Either
  move the `CCR1` row up to position 7, or change the intro to "The registers
  `tim14_pa7_pwm_init()` writes" (**NET −2 words**, Reference).
- **`ch-motors.ptx:3822`** — the `TIM14_EGR` row correctly says "Write-only"
  (RM0490 p. 484 gives `UG` access `w`), but `TTmotor_ramp.c` writes
  `TIM14->EGR |= TIM_EGR_UG;` — a read-modify-write on a write-only register. A
  student comparing the two will think one of them is wrong. One clause in the
  Reference would settle it: "the driver's `|=` reads back zero, so it is
  harmless here" (**+11 words**, Reference, unbudgeted).
- **`ch-motors.ptx:4009–4021`** — the pull-up trade-off never gives the internal
  pull-up's value. It is **~40 kΩ** (`ch-switches.ptx:691, 1023`), four times the
  external 10 kΩ, and the paragraph's own argument says a much larger resistor
  is slower and noisier. Add three words: "the pin's own internal pull-up (about
  40 kΩ)" (**NET +3**, Reference).
- **`ch-motors.ptx:2990`, `:3672`, `:3981`** — "a second sensor **a quarter of a
  slot** away from the first" (three times). A quadrature pair is offset a
  quarter of a *cycle*, i.e. a quarter of the slot **pitch** (slot + spoke), not
  a quarter of the slot. `sl-day12-quadrature` already says "a quarter of a
  cycle" correctly. Change "slot" → "cycle" in all three, **NET 0**.
- **`ch-motors.ptx:3703–3705`** — `inst-day12-stretch`: quadrature "**doubles or
  quadruples** the resolution, because there are now **four** distinguishable
  edges per slot instead of one." The reason given supports only ×4. Either drop
  "doubles or" (**−2 words**) or say why ×2 is a decode choice. The Reference
  version at `:3986` says "multiplies the resolution" and is fine.
- **`ch-motors.ptx:2885–2888`** — "one fact that is on no datasheet anywhere —
  how many slots are cut in the wheel." Lab 6 p. 5 prints `RPM = 60 × PPS / 20`,
  and the before-class reading already told them N = 20 (`:2352`). "On no
  datasheet" is fine as rhetoric; "anywhere" is not. Delete "anywhere"
  (**NET −1**).
- **`ch-motors.ptx:3967`** — "**a longer window** halves the quantization." Only a
  *two-second* window halves it; the instructor version at `:3710` says so.
  Insert "two-second" (**NET +1**, Reference).
- **`ch-motors.ptx:3861`** — "A period divided into `M` steps gives `M` distinct
  duty cycles." Strictly `CCR1` takes 0…`M` and there are `M`+1 settings, but Lab
  6 §2.1 says "1250 discrete PWM values" in as many words, so this matches the
  handout. No change; recorded so it is not re-raised.
- **`ch-motors.ptx:3865–3866`** — "Resetting at 100 instead would make one step
  50 mV" (5 V/100 ✓). Worth one clause noting it also moves the switching
  frequency to 20 kHz, or the sentence reads as if `M` were free. Optional.
- **Reference forward-refs.** `subsec-day12-wire-and-scope` and
  `subsec-day12-main-loop` `xref` forward into `sec-motors-reference` five times
  (`subsec-motors-ref-speed` ×3, `table-day12-exti-lines` ×1). `CLAUDE.md`'s
  figure-placement convention is the reverse ("Reference sections `xref` **back**
  to it"). Every one resolves and the builds are clean, so this is Petra's call,
  not a defect — but it is a new pattern in this chapter and worth her seeing.
- **Stale comment, `ch-motors.ptx:2646`** — "`fig-day12-wiring.svg` is the rebuilt
  version both replaced, **kept for reference**." That file is not in
  `assets/images/Day12-Motors(3)/`. Fix or drop the sentence.

---

## Verified correct — checked, no change needed

These were all checked against a source and are right; recording them so the next
gate does not re-do the work.

**RM0490 (Rev 3), all read out of the PDF this pass**
- `TIM14_CR1` 0x00 §17.4.1 · `TIM14_EGR` 0x14 §17.4.4, `UG` access `w` ·
  `TIM14_CCMR1` 0x18 · `TIM14_CCER` 0x20 §17.4.7 · `TIM14_PSC` 0x28 §17.4.9 ·
  `TIM14_ARR` 0x2C §17.4.10 · `TIM14_CCR1` 0x34 §17.4.11 · §17.3.8 *PWM mode*
  (p. 479) · §17.4 starts p. 482.
- `RCC_APBENR2` **0x40** ✓ (§5.4.14, p. 131), `TIM14EN` bit 15.
- `EXTI_EXTICRx` offset formula: RM0490 §12.5.6 p. 226 gives "0x060 + 0x4 × (x −
  1), (x = 1 to 4)". For x = 4 → **0x06C** ✓. Field **`EXTI15[7:0]` in bits
  31:24** ✓ (the RM writes it as `EXTIm+3[7:0]`, m = 4(x−1) = 12). **`0x00`
  selects `PA15`** ✓. §12.5.6 is the register, §12.5.9 Table 47 is the map ✓.
  `ES28.h` gives `EXTI_PA 0`, `EXTI_PB 1` ✓, and `EXTI->EXTICR[3]` ↔ `EXTICR4`,
  `EXTI->EXTICR[1]` ↔ `EXTICR2` ✓ (`counterResetButtonInt.c` uses `EXTICR[1]`
  for PB4). `EXTI_FTSR1`/`IMR1`/`FPR1` all carry bits 15:0 for lines 15…0 ✓, so
  bit 15 exists in all three ✓. `EXTI4_15_IRQn`/`_IRQHandler` unchanged ✓, and
  the "every 4 becomes a 15 except the one in the vector's name" paragraph is
  right.

**PWM arithmetic** — all recomputed independently.
`TTmotor_ramp.c`: `PSC_FACTOR 6`, `PWM_TIMER_MAX 1250` ✓ so P = 6, M = 1250 ✓;
12 MHz/6 = 2 MHz ✓; 2 000 000/1250 = **1600 Hz** ✓; 1/1600 = **625 µs** ✓;
`TIM14->PSC = PSC_FACTOR-1` = **5** ✓, `TIM14->ARR = PWM_TIMER_MAX-1` = **1249**
✓; 625 µs/1250 = **500 ns** ✓; 5 V/1250 = **4 mV** ✓; 5 V/100 = **50 mV** ✓;
12 MHz/(P×M) = 12e6/7500 = 1600 ✓. Consistent with `subsec-day11x-resolution`
(`:2185`) and with Lab 6 §2.1 ("1.6 KHz … 1250 discrete PWM values").

**TB6612 pin map** — `table-motors-tb6612-pins` `AIN1`→PA5 (D13), `AIN2`→PA6
(D12), `PWMA`→PA7 (D11, TIM14_CH1): matches `TTmotor_ramp.c`'s header block,
matches UM2953 Table 11 (D13 = PA5, D12 = PA6, D11 = PA7 with
`SPI_1_MOSI || TIM_14_CH1`), and matches the wire colours in the rendered
`fig-day12-lab6-build.svg` (orange on D11 → `PWMA`, green on D12 → `AIN2`, brown
on D13 → `AIN1`, motor on `MOTORA`). Modes rows 1–3 match the datasheet; row 4 is
finding **B3**. `STBY` "pulled up already on our breakout" is sourced to Petra's
own annotation on `tb6612-truth-table-annotated.png` ("Automatically pulled up
through our breakout board") — not to a schematic, but it is hers.

**EE-SX672** — `assets/datasheets/ee-sx67.pdf`, *Ratings and Specifications*
(p. 3): Control output "**NPN open collector**: 5 to 24 VDC, 100 mA max." ✓;
Supply voltage "**5 to 24 VDC** ±10%" ✓; Response frequency "**1 kHz min.** (3
kHz average)" ✓. L terminal: p. 1 note *3 — "Dark-ON when the L terminal of the
connector is opened, and light-ON when the L terminal and positive (+) terminal
are connected" ✓ (so "selects light-ON or dark-ON" ✓); note *4 — "cut the unused
L terminal wire at the base of the connector and wrap it with insulating tape" ✓,
"noise may affect the Photomicrosensor" ✓. Cable colours (p. 8): **Brown Vcc,
Blue GND, Black OUTPUT, Pink L** ✓ — `fig-day12-cabled-sensor`'s caption and
`sl-day12-cabled-sensor` are exactly right, and they correctly override Petra's
Day 12 deck slide 7, which calls the pink wire "Led (optional) to 5V". Sensor
never limits the measurement: 180 rpm × 20 slots / 60 = 60 Hz ≪ 1 kHz ✓.

**UM2953** — Table 11, CN9 pin 8: `D7 · ARD_D7 · PA15 · I/O`, on printed **page
20** ✓ (the page's own footer reads "UM2953 - Rev 1 page 20/32"). Table 12, pin
**37**: `PA15 · ARD_D7` ✓. D11's Function column really does read
`SPI_1_MOSI || TIM_14_CH1` ✓.

**SysTick** — `sysinit.c` compared line by line: both listings at `:3136` and
`:3148` are **verbatim** (`check_starters.py` also registers `SysTickInit`).
`SysTick->LOAD = 12000 - 1` at 12 MHz → 1 kHz → one interrupt per millisecond ✓,
so the deliberate "millisecond"-for-"second" correction recorded at `:3172` is
right. `SystemInit()` calls `SysTickInit()` ✓ (`sysinit.c:18–20`), and
`delay_ms()` is built on `milliseconds()` ✓ (`sysinit.c:39–42`) — so "it is what
`delay_ms()` uses" is accurate. Day 8's timer really was TIM14
(`blinkyTimerPolled.c`, `blinkyTimerInt.c`) ✓.

**Driver-facing prose in the Reference** — "`OC1M` is a multi-bit field, so it is
cleared and then set rather than OR'd into … `CC1E` and `CEN` are single bits,
which is why `|=` on its own is safe" matches `tim14_pa7_pwm_init()` exactly
(`&= ~..._Msk` then `|= ... << ..._Pos` for `OC1M` and `CC1S`; bare `|=` for
`CC1E` and `CEN`) ✓. PWM mode 1 = `0110` = HIGH until the compare value ✓
(RM0490 §17.4.6).

**Lab 6 alignment** — `motor_init()`, `motor_mode()`, `motor_speed()` ✓ (§2.1
prototypes); 100 Hz ADC sampling ✓; "you may not use `delay_ms()` for timing" ✓
(§2.2); `RPM = 60 × PPS / 20` ✓ (§2.5, and it credits "the reading quiz", which
is why the derivation belongs in `sec-speed-before-class`); dead band, 0 V /
1.65 V / 3.3 V and the CCW/stop/CW mapping ✓ (§2.2, matches
`table-day12-deadband` and the rendered `fig-deadband.svg`); negative RPM in
reverse ✓; seven-segment display last ✓ (§3); regulator hot-smell warning ✓
(§2.4 *Important!*, near-verbatim in `:3533`). `SevenSeg_number()` ✓ exists
(`ch-i2c.ptx:3720`, `SevenSegPartialORIGINAL.c:40`) and takes `uint16_t`, which
is why the sign is handled separately; `start_conversion()`/`adc_read()` ✓
(`ADCPot.c:82,90`); `act-i2c-hw-t2` ✓ really is the signed-counter homework
(`ch-i2c.ptx:3699`); `subsec-day10-pins` ✓ really is "Part 6: The Pins, and Why
They Must Be Open-Drain", and `OTYPER` is RM0490 §6.4.2 there; Day 9 really does
teach both `EXTI_FTSR1` **and** `EXTI_RTSR1` (`ch-gpio-interrupts.ptx:804, 852`),
so "the rising- and falling-edge trigger registers from Day 9" is right; Day 3
really does teach `PUPDR` and ~40 kΩ (`ch-switches.ptx`).

**Measurement arithmetic** — every figure recomputed: 60/N = 3 rpm per pulse on a
20-slot wheel ✓; 180 rpm → 60 pulses, 3/180 = 1.67 % ✓ "under 2 %"; 30 rpm → 10
pulses, 3/30 = 10 % ✓; 3 rpm → 1 pulse/s → ~1 s interval, 1 ms/1000 ms = 0.1 % ✓;
180 rpm → 1/60 s = **16.7 ms** ✓ "about 17 ms", 1/16.7 = **6.0 %** ✓ "about 6 %",
and 6 % > 2 % ✓ so "worse than counting" ✓. Polling condition: on equal slots and
spokes at f = 60 Hz, HIGH = 1/(2f) = **8.3 ms** ✓ "about 8 ms", and 10 ms > 8.3 ms
✓ so a 10 ms loop does miss changes. The stated rule — "the gap between reads must
be shorter than the *shorter* of the HIGH and LOW times" — is correct as stated,
and the explicit refusal of the short version ("a 100 Hz loop cannot see a 60 Hz
signal") is right to refuse it. Dead band: 3.3/4096 = **0.806 mV** ✓ "a little
under a millivolt"/"about 0.8 mV", 100 counts ≈ **80.6 mV** ✓ "about 80 mV",
centre ≈ 2048 ✓. Reading questions: 60 × 40/20 = **120** ✓, distractor 60 × 40 =
2400 ✓, distractor 40 × 20 = 800 ✓; Canvas Q3 60 × 30/20 = **90** ✓.

**Figures, all rendered** (Chrome headless at each SVG's own viewBox; `qlmanage`
crops these and must not be used):
- `fig-photointerrupter-beam.svg` — I counted the slot paths in the source:
  **exactly 20** ✓, which is the N the chapter uses. The "one slot goes by" arrow
  spans one full period ✓, matching "one cycle — two edges — for every slot".
- `fig-photointerrupter-states.svg` — 3.3 V rail, 10 kΩ, OUT node, NPN with
  emitter to ground and collector to OUT ✓; caption matches panel for panel.
  (Polarity is carve-out 1, not re-reported.)
- `fig-deadband.svg` — 0 V/0, 1.65 V/2048, 3.3 V/4095, CCW | dead band | CW ✓,
  caption exact.
- `rpm-formula.svg` — reads `RPM = (60 × PPS)/N` ✓, not 60 × PPS/20.
- `fig-day12-lab6-build.svg` — traced pin by pin at 4× zoom: pot outer legs on
  the red (3.3 V) rail and ground, wiper (blue) to **A0** ✓; display on SDA/SCL ✓;
  TB6612 `Vcc` jumpered to the 3.3 V rail and `VM` jumpered to the same node as
  the sensor's `VCC` ✓ (so "the same node that already feeds `VM`" is true of the
  drawing); motor on `MOTORA` ✓; sensor OUT (green) to **D7** with **no external
  resistor** ✓, which is what the caption says. The regulator's J4/J2 pads are
  unwired — carve-out 5, not re-reported.
- `fig-day12-wiring-annotated.png` — the 10 kΩ resistor really does run from the
  sensor's own row (col 13, rows F–J) up to the rail the Nucleo's `3V3` feeds ✓,
  and the sensor's `VCC` reaches the `VM` node ✓. Her "~10 KΩ pullup" callout and
  the "needs a 5V voltage supply" callout are both her own (Day 12 deck slide 6,
  verbatim) ✓.
- All six Day 12 SVGs carry `width`/`height` matching their `viewBox` (B-11a) ✓.

**Build integrity** — `check_rules.py source/ch-motors.ptx`: **0 errors, 0
warnings**. Every `<xref>`, every `<slide ref=>`, every `<image source=>` and
every `external/` URL in lines 2251–4145 resolves (scripted check). `check_deck.py`
0 problems; all 30 refs in `assets/decks/day12.json` resolve, and
`sl-day12-naive-loop` / `sl-day12-two-answers` / `sl-day12-deadband-table` are
referenced by nothing, exactly as documented. `check_starters.py` 0 problems.
P-10: every activity with a right answer has an `<instructor>` block
(`act-day12-predict-trace` is answered both in body prose at `:2774` and in
`inst-day12-wire-and-scope`, as the brief requires).

**Length** — the in-class section is now 3579 words of `<p>` against Day 11's
3692 over the same 110 minutes. No length finding.

---

## Part B passes

- **B1 (rule vs. the chapter's own example)** — two hits, both blockers: the
  PA15 "cannot capture or count edges" rule (F-B1), refuted by `TIM1_CH1` in the
  same sentence; and "offsets are from the timer's own base address" (M1),
  refuted by four of the table's own twelve rows.
- **B2 (arithmetic recomputed independently)** — every calculation in Day 12
  recomputes correctly, including the ones whose conclusions would have hidden a
  bad step (625 µs, 4 mV, 16.7 ms/6 %, 8.3 ms, 0.806 mV). One right-answer-wrong-
  step: "doubles or quadruples … because there are now four edges per slot"
  (MINOR).
- **B3 (end-to-end read for self-contradiction)** — two found: `fig-three-rates`'
  "every pass: look for an edge" against `inst-day12-main-loop-sketch`'s "every
  pass: nothing" (M4); and the before-class "the same resistor appears in the Lab
  6 wiring" against `fig-day12-lab6-build`'s caption and artwork (M5). Nothing
  else contradicted itself across the six Parts, the Reference and the
  before-class reading — the open-drain/pull-up story, the 3.3 V-vs-5 V rail
  story, the direction/sign story and the one-edge-per-slot story are each stated
  consistently everywhere they appear.
- **B4 (against the rest of the book and the lab)** — three found: the TB6612
  Stop row against `fig-tb6612-truth-table` and `inst-day11-direction` (B3); the
  50 Hz verdict against Lab 6 §4 and Petra's own commented-out constants (M2);
  and the sensor's 5 V supply against Lab 6 §2.2/§2.3 (M3). Everything the
  chapter presents as recalled — Day 3's `PUPDR`, Day 8's TIM14, Day 9's five
  EXTI moves and `volatile`, Day 10's open-drain and `SevenSeg_number()`, Day
  11's TB6612 pin map, Day 11x's twelve steps and 500 ns/4 mV — was located in
  the earlier file and matches.

## Unverified

- "The switching frequency has to sit above the motor's own mechanical response"
  (`:3872`) — no source in the repo, and Lab 6 §4 argues the other way. Needs a
  citation or deletion (see M2).
- "`STBY` … on our breakout it is pulled up already" (`:3884`, inherited from
  passed Day 11 `:788`) — sourced only to Petra's own arrow on
  `tb6612-truth-table-annotated.png`. Needs the Adafruit TB6612 breakout
  schematic to be a hardware fact rather than a classroom one. Low risk: the
  `STBY` pin is unwired in both Fritzing drawings and the circuit is expected to
  run.
- "Not every kit has the same part … some have it on a length of four-core cable"
  (`:2684`) — sourced to Day 12 deck slide 7 ("Some of you have a photointerrupter
  with a long cable on it") ✓, so this one is fine; recorded because it is the
  kind of claim that has no other source.
