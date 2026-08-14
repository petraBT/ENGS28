# Step 0 — Ground truth for Day 11 (DC Motors, the H-Bridge, and PWM)

Covers **Day 11 only** of `source/ch-motors.ptx`. Days 11x and 12 are separate
sessions; their material is noted here only where it fixes Day 11's hand-off.

**Sources mined:** `assets/ClassSlidesOLD/Day11-Motors.pptx` (30 slides),
`Day11x-Motors(2).pptx` (21) for the driver code and the 11x/12 boundary,
`Day12-Motors(3).pptx` (10) for the boundary. Downstream: **Lab 6**
(`assets/Labs/Lab6_ES28.pdf`, due Tue 17 Feb 2026). Reference: **RM0490**
(`assets/stm32c031_rm.pdf`) and the **datasheet** (`assets/stm32c031_datasheet.pdf`).

Checked 2026-08-14.

---

## 1. The scope of Day 11 — what it is and is not

The old **Day 11** deck's arc (30 slides), which is the authority for the arc:

> actuator signal chain → how a DC permanent-magnet motor works → voltage → speed
> → direction (polarity) → H-bridge → the pMOS/nMOS switches → CW / CCW / brake
> modes → shoot-through (cultural enrichment) → inside the TB6612 controller IC →
> the truth table → **first exercise: manual direction control** → PWM (why we
> need it) → recall dimming the 7-seg → duty cycle → "fast PWM" counter-compare →
> auto-reload → Nucleo PWM output pins → **second exercise: run `TTmotor_ramp.c`,
> watch the PWM on the scope** → homework.

**Day 11 introduces PWM conceptually and has students RUN the demo. It does not
teach the register-level TIM14 PWM code** — that is Day 11x, whose title is
literally "Writing code for PWM" (11x slides 5–16: TIM14 CH1, CCMR1, CCER, CCR1,
the full `TTmotor_ramp.c` walkthrough). Day 11's homework is the bridge: *"Work
through the demo code with the data sheet to understand how this is programmed."*

So the two Day 11 activities are:

- **First exercise — manual direction control** (deck 17–19): wire the breakout
  with external power, PWM tied HIGH, AIN1/AIN2 unconnected; after a wiring check,
  jumper AIN1/AIN2 to the power and ground rails (`++`, `+−`, `−+`, `−−`) and
  observe the motor's direction and brake behavior. No Nucleo code yet.
- **Second exercise — run the demo** (deck 27–29): copy `TemplateProject` → rename
  `DCmotor`, drop in `TTmotor_ramp.c`, compile, run, and watch the PWM ramp on the
  AD2 oscilloscope while the motor speeds up and reverses.

### The 11x / 12 overlap to flag (does NOT affect Day 11 prose)

Photointerrupter **speed sensing** appears on **both** Day 11x (slides 17–21) and
Day 12 (slides 4–8). **Day 11 does not touch speed sensing at all.** The split
between 11x and 12 is a later-session decision; it is raised in the questions to
Petra only so the chapter file gets structured correctly. Day 11's hand-off to
11x is clean: PWM understood conceptually + demo run + homework = study the code.

**Consequence for the rough file:** the current `sec-motor-speed` section
(photointerrupter, RPM, complete Lab 6 setup) is **11x/12 material, not Day 11**,
and must not be part of the Day 11 delivery.

---

## 2. The driver — `TTmotor_ramp.c`, recovered as text (B-6)

Transcribed from **Day 11x deck code slides 10, 11, 14** — not reconstructed. The
current chapter's listing is **invented and wrong** (it has `PSC_VALUE 11`,
`PWM_TIMER_MAX 100` → 10 kHz). The real constants:

```c
#define PSC_FACTOR    6      // 12 MHz / 6 = 2 MHz
#define PWM_TIMER_MAX 1250   // 2 MHz / 1250 = 1.6 kHz
```

Core PWM init (11x slide 10 — note: this is **Day 11x teaching material**; Day 11
shows it only as a runnable demo):

```c
void tim14_pa7_pwm_init(void) {
    // GPIO pin configuration
    RCC->IOPENR |= RCC_IOPENR_GPIOAEN;          // Enable clock access to GPIOA

    GPIOA->MODER &= ~GPIO_MODER_MODE7_Msk;      // PA7 alternate function mode (10)
    GPIOA->MODER |= GPIO_ALTERNATE << GPIO_MODER_MODE7_Pos;

    GPIOA->AFR[0] &= ~GPIO_AFRL_AFSEL7_Msk;     // PA7 alt. function type (AF4, 0100)
    GPIOA->AFR[0] |= GPIO_AF4 << GPIO_AFRL_AFSEL7_Pos;

    // Timer configuration
    RCC->APBENR2 |= RCC_APBENR2_TIM14EN;
    TIM14->PSC = PSC_FACTOR-1;
    TIM14->ARR = PWM_TIMER_MAX-1;
    TIM14->CCR1 = 0;                            // compare register - speed of 0

    TIM14->CCMR1 &= ~TIM_CCMR1_OC1M_Msk;        // Set pwm mode 1 (0110)
    TIM14->CCMR1 |= TIM_OC1_PWM1 << TIM_CCMR1_OC1M_Pos;

    TIM14->CCMR1 &= ~TIM_CCMR1_CC1S_Msk;        // Make sure timer is in output mode
    TIM14->CCMR1 |= TIM_CC1_OUTPUT << TIM_CCMR1_CC1S_Pos;

    TIM14->CCER |= TIM_CCER_CC1E;               // Enable TIM14_CH1 in output mode
    TIM14->EGR  |= TIM_EGR_UG;                  // Generate update event
    TIM14->CR1  |= TIM_CR1_CEN;                 // Enable timer
}

void tim14_pwm_set(uint16_t value) {
    if (value > PWM_TIMER_MAX-1)
        value = PWM_TIMER_MAX-1;
    else if (value < 0)
        value = 0;
    TIM14->CCR1 = value;
}
```

Direction bits (11x slide 14) — brake-before-reverse logic. `AIN1`, `AIN2` are the
direction inputs; a direction change forces a short brake first:

```c
// AIN1=1, AIN2=0 -> CW ;  AIN1=0, AIN2=1 -> CCW ;  AIN1=1, AIN2=1 -> short brake
GPIOA->ODR = (GPIOA->ODR & ~GPIO_ODR_OD5_Msk) | (TB6612_AIN1 << GPIO_ODR_OD5_Pos);
GPIOA->ODR = (GPIOA->ODR & ~GPIO_ODR_OD6_Msk) | (TB6612_AIN2 << GPIO_ODR_OD6_Pos);
```

**Pin assignment (from the driver code, authoritative):**
`AIN1 = PA5` (`ODR` bit 5), `AIN2 = PA6` (`ODR` bit 6), `PWMA = PA7`
(TIM14_CH1, AF4). STBY is pulled up on the breakout — no GPIO used.

**Frequency arithmetic to keep straight:** 12 MHz clock / `(PSC+1=6)` = 2 MHz
counter; 2 MHz / `(ARR+1=1250)` = **1.6 kHz PWM**, with **1250 discrete duty
steps**. This matches Lab 6 §2.1 exactly ("1.6KHz PWM frequency, with 1250
discrete PWM values"). `f_PWM = f_CLK / ((PSC+1)(ARR+1))`.

Note: `value < 0` on a `uint16_t` is always false — dead branch in Petra's real
code. Reproduce it verbatim (B-6); do not "fix" it.

---

## 3. Hardware — what students physically have

- **Motor driver:** **Adafruit TB6612 breakout** (Adafruit logo in the Fritzing;
  KiCad "TB6612 Breakout" block in the Lab 6 schematic). Pins used: `VM` (motor
  power), `VCC` (logic power), `GND`, `STBY`, `AIN1`, `AIN2`, `PWMA`, `AO1/AO2`
  (`MOTORA`). STBY is **pulled up on the breakout** (Petra's own note, deck 16).
  The TB6612FNG H-bridge sinks up to ~1.2 A continuous.
- **Motor:** yellow **TT gearmotor**, rated **DC 3–6 V** (printed on the Fritzing
  part).
- **Power (from the Lab 6 schematic, Figure 1):** a **9 V wall-wart → barrel-jack
  adapter → L7805 regulator (with 0.22 µF and 0.1 µF caps) → +5 V** rail. That
  **+5 V feeds VM** (motor power). **VCC (logic) = 3.3 V from the Nucleo.** The
  photointerrupter (Lab 6 / Day 12) also runs from +5 V.
  - **Critical distinction for L-? / CLAUDE.md:** the "never say 5 V" rule guards
    the **MCU/logic** side (VCC, GPIO — always 3.3 V). The **motor** side (VM)
    legitimately runs at **5 V** here, on a separate rail. Keep the two apart in
    prose; do not let the 5 V motor rail read as an MCU voltage.
  - **The current draft is wrong:** it says VM = "6–12 V" / "up to 15 V". The chip
    *supports* up to 15 V, but this course runs VM at **5 V**.
- **NOT a capacitor callback (corrected at Gate 1).** The old deck's slide 18
  recalls "Reading Capacitor Codes" for the 0.22 µF cap (`.22J63`), but the
  **delivered Day 5x book (`ch-io-datasheets.ptx`) never taught capacitor codes** —
  only the old PPTX did. So the caps are **new** to the reader here, not a recall.
  Whether the caps are even student-facing depends on the pre-built-adapter
  question (Q1): if the barrel-jack/L7805 board is handed over pre-built, students
  never wire the caps at all. Introduce them as plain labels if needed; do not
  frame as "recall."

---

## 4. Reference-manual / datasheet anchors (P-11), pasted from the PDFs

- **RM0490**, Chapter **17, "General-purpose timers (TIM14)"**:
  - **§17.3.8, "PWM mode"** (p. 479): PWM mode 1 = `OC1M = 0110`
    (channel active while `TIMx_CNT < TIMx_CCR1`), PWM mode 2 = `0111`.
  - **§17.4, "TIM14 registers"** (p. 482 ff.): CCMR1 §17.4.7, CCER, CCR1, PSC, ARR.
    (These registers are Day 11x's lookup; Day 11 cites them only for the homework.)
- **Datasheet**, **Table 12, "Pin assignment and description"** (p. 30 ff.):
  the alternate-function lookup that shows **PA7 → TIM14_CH1**. The old deck's
  slide 26 cites exactly "Datasheet, Table 12." (STM32C0 folds AF mapping into
  Table 12; there is no separate "Alternate function" table.)
- **TB6612FNG datasheet** — the **"H-SW Control Function" table (p. 4)**:
  IN1/IN2/PWM/STBY → OUT1/OUT2/Mode (CW, CCW, short brake, stop, standby). The
  rebuilt-clean image is `assets/images/Day11-Motors/slide16_87126f38.png`.
  **Petra added the PDF to the repo (2026-08-14):**
  `assets/datasheets/TB6612FNG_datasheet_en_20141001.pdf`, linked as
  `external/datasheets/TB6612FNG_datasheet_en_20141001.pdf`. The table is unnumbered
  in the datasheet — cite it by its label and page.

---

## 5. Backward links (continuity — verified against the delivered books)

- **Day 6 (Transistors) — the H-bridge prerequisite.** `ch-transistors.ptx` teaches
  the **N-channel low-side switch** (gate HIGH = on) and the **P-channel high-side
  switch** (gate LOW = on) — which are exactly the four legs of the H-bridge. Name
  the switches **N-channel / P-channel** (the book's terms, L-6), NOT the deck's
  shorthand "nMOS/pMOS", and cite Day 6 explicitly in Part 2.
- **Day 8 (TIM14 timers):** PWM reuses the TIM14 counter/PSC/ARR the class already
  configured for periodic interrupts. "The same hardware timers we used" is a real
  callback, not invention.
- **Day 10 (dimming the 7-seg):** the deck opens PWM by recalling `SevenSeg_dim()`
  — the HT16K33 brightness command is duty-cycle dimming the class has already met.
  This is the on-ramp to "PWM is not just for LEDs."
- **Day 7 (ADC):** the "signal chain" framing (Part 1's actuator chain mirrors the
  sensor chain) and "DAC" both come from `ch-adc.ptx` (DAC defined at line 240, as
  the ADC's internal converter — add a one-clause reminder on first use here).
- **NOT Day 5x:** capacitor codes were never taught in the delivered book (see §3).

---

## 6. Figures — inventory for Day 11 (settle at Step 3)

Present in `assets/images/Day11-Motors/` (raw slide extraction + a few rebuilt):

| Need | Candidate image | State |
| --- | --- | --- |
| Actuator signal chain | `slide03_2496941e.png` (rebuilt) | check vs. deck slide 5 annotations |
| DC motor cutaway / how it works | deck slide 6 (4 imgs) + the YouTube video | video already embedded in reading |
| Speed ∝ voltage (equations) | deck 7–8 | may be too much for the reading (B-2) |
| Direction = polarity | deck 9 | |
| H-bridge (pMOS/nMOS, CW/CCW/brake) | `slide09_f985348c.png`, `slide11_665f7016.png`, `slide11_d4050cd8.png`, `slide12_8fcc0651.png` | H-bridge diagrams |
| H-bridge modes summary (4-up) | deck 13 | |
| TB6612 internal block diagram | `slide15_d0880cf7.png` | |
| **TB6612 truth table** | `slide16_87126f38.png` | **clean, good** — the real datasheet table |
| First-exercise wiring | `slide17_1573fa6d.png` | Adafruit Fritzing; **but no external-power/regulator detail visible** — may need the 2nd slide-17 image or Petra's |
| PWM waveform / duty cycle | `slide23_b58b0b83.png` | |
| Fast-PWM counter-compare | `slide24_c96b1180.png` | conceptual, Day 11 keeps this high-level |
| Nucleo PWM output pins | `slide26_ef97f387.png` | |
| Second-exercise wiring | `slide27_faf84a1a.png` | |
| Scope trace of the ramp | `slide29_ab2c785e.jpg` | photo of AD2 |

**Deferred to 11x/12 (NOT Day 11):** everything in `Day11x-Motors(2)/` (CCMR1,
TIM14 registers, photointerrupter) and `Day12-Motors(3)/` (speed sensing, full
Lab 6 setup). The rough file currently pulls these into Day 11 sections — remove.

---

## 7. Questions — ANSWERED by Petra 2026-08-14

1. **External power — CONFIRMED student-wired.** "We use the voltage regulator
   chip with the barrel connector, just like in my slides for Day 11." So the first
   exercise (Part 4) includes wiring the **barrel connector → L7805 regulator (+ its
   caps) → 5 V** rail feeding VM, exactly as deck slide 17. This is a genuine
   first-time external-power build inside Part 4 — budget it as such (logistics
   BLOCKER). The regulator caps (0.22 µF, 0.1 µF) are student-facing, introduced as
   **plain labeled components**, not as a capacitor-code "recall" (§3, §5).
2. **11x/12 split — flexible.** "If there is time on 11x for speed sensing then
   great, but if it should rather be on Day 12 that's totally fine also." Structure
   the chapter so speed sensing lands on 11x with overflow to Day 12. Does not touch
   Day 11.
3. **TB6612 datasheet — ADDED.** `assets/datasheets/TB6612FNG_datasheet_en_20141001.pdf`.
   Cite the "H-SW Control Function" table (p. 4). See §4.
4. **Code hand-off — run-only on Day 11, but open.** "Currently we only run
   TTmotor_ramp on Day 11, but it doesn't have to stay that way. We can do other
   things, look at the registers, whatever is educationally most valuable."
   **Decision (given the wiring-heavy hour):** keep Day 11 run-the-demo so the
   crucial step (motor running under PWM + read the scope) is reachable; the
   register walkthrough stays on Day 11x, where students *write* the PWM code. Day
   11 honors "look at the registers" through (a) the homework — study the code
   against RM0490 §17.3.8/§17.4 — and (b) the stretch, where fast finishers
   reconcile the measured PWM period with PSC/ARR. Adding a whole-class register
   pass would break the 65-minute budget and duplicate 11x. Revisit if Petra wants
   more register content moved forward.
