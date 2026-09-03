# Week 8 ground truth — Days 15, 15x, 16: servos, then the solar tracker

Step 0 for the whole week, mined 2026-09-02 from the three decks, Lab 8, the
two placeholder chapters, `ch-motors.ptx` (what TIM14 PWM already taught) and
`ch-adc.ptx` (what the ADC driver looks like). Chapters: `source/ch-servos.ptx`
(540 lines, **placeholder**) and `source/ch-photosensors.ptx` (477 lines,
**placeholder**) — §7 says what in them survives. Downstream: **Lab 8**, one
lab spanning both chapters, due Tuesday March 3, 2026.

Sources mined:

- `assets/ClassSlidesOLD/Day15-Servos.pptx` — 31 slides (`--arc`, whole, `--code`)
- `assets/ClassSlidesOLD/Day15x-Servos(2).pptx` — 6 slides, all re-shows of Day 15's 27–30
- `assets/ClassSlidesOLD/Day16-Photosensors.pptx` — 16 slides
- `assets/Labs/Lab8_ES28.pdf` — 10 pages, read in full (§4)
- `assets/datasheets/Servosg90_datasheet.pdf`, `CdS-photocell-PDV-P8001.pdf`,
  `Adafruit-photocells.pdf` (Petra, 2026-09-02) — §3
- `assets/stm32c031_datasheet.pdf` Table 12 and RM0490 §14 (ADC), §17 (TIM14),
  §18 (TIM16/17) — pasted, not typed (§3)
- `assets/starters/TTmotor_ramp.c`, `ADCPot.c`, `ES28.h`, `sysinit.c` — the
  drivers this week stands on (§2)

**Two answers already in hand (do not re-ask):** the parts are the SG90-family
servo and the PDV-P8001 photocell, datasheets above; and the servo's 5 V comes
from **the same regulator board as the motor** ("We are using the same voltage
regulator as we did for motors - we're not using the battery pack", Petra,
2026-09-02). That is `fig-tb6612-regulator` in `ch-motors.ptx` — her Day 15
slide 29's regulator picture is byte-identical to the one that figure already
uses (`md5 451b5f6c…`), so the book **xrefs** it and never writes "battery pack",
"battery box", "9 V" or "7805" (her Day 12 ruling: *"let's just call this the
regulator, not mention 9V anywhere"*).

---

## §1 Her arcs, slide by slide

### Day 15 (Tue, 110 min) — Servomotors

| Slide | Content |
| --- | --- |
| 1–3 | Title; agenda (a Williams reading, P-12 trap — drop; "You will need today: Nucleo & breadboard, AD2, power supply, potentiometer, servomotor, power board"); final-project survey (course admin — drop) |
| 5 | **Review: DC permanent magnet motor** — brushes, commutator, torque ∝ current, back emf ∝ speed. Note: *"Key fact we need going forward."* Speaker note: "Torque is proportional to current. Now we are going to add on to it." **Recall of Day 11** (`subsec-day11-actuator-chain` owns the physics); one slide |
| 6 | **What is a servomotor?** The howtomechatronics cutaway (gearbox, pot, DC motor, control circuit with H-bridge). Her text: "Potentiometer senses the motor position and provides feedback to the motor control electronics. Through a gear train, power = torque × angular velocity is (except for friction) conserved: τin ωin ≈ τout ωout." Rich speaker note — the whole mechanism in her words (§1a) |
| 7 | **Servomotors provide precise position control** — nine applications, solar trackers among them ("you'll build one in lab 8") |
| 8 | **How a servomotor works: feedback** — her block diagram (command position → error → controller → motor → gears → position; pot feeds back). Her text: "Command position input is a voltage. Potentiometer, turned by the motor, outputs a voltage proportional to position output. Controller drives the motor until position error voltage is zero. If a disturbance perturbs the motor's position, the feedback loop corrects. For details of controller design, see Engs 26. Our servomotors have the controller built in, we just have to supply the command signal." Speaker note: never take a servo all the way around; push the horn and it resists (§1a) |
| 9 | **Our servomotor** — "Tower-Pro SG92R microservo. Relevant specs: stall torque 2.5 kgf-cm (0.245 N-m, 35 ozf-in, 0.18 lbf-ft); speed 0.1 s/60°; dead band width 1 µs." Speaker note explains kgf-cm and "please don't try to turn them by hand." **The delivered datasheet is the SG90's, and it carries no dead-band line — §3, question 1** |
| 10 | **Commanding a servo with a microcontroller** — her timing figure (1 ms / 1.5 ms / 2 ms pulses, ≈20 ms period, "not to scale"). Text: "Microcontroller has only digital outputs. How do we get a command voltage? Servo controller electronics convert pulse width to control voltage. Pulse widths between 1ms and 2ms, repeated regularly, roughly every 20 ms (so 50Hz). The width of the pulse is conveying information to the controller on how far to turn the motor." Speaker note (§1a): 1.5 ms is the middle, 1 ms −90°, 2 ms +90° "hypothetical — our servos don't go all that far"; the servo holds as long as pulses keep coming; no signal, no power on the motor |
| 11–12 | **Setting up a timer for PWM** — "We need a 50Hz PWM frequency (pretty small, compared to 12MHz clock). So the counter needs to take 20ms to count from 0 to its auto-reload value. Lots of ways to accomplish this! Which of these are usable?" A **table** (blank on 11, filled on 12 — `pptx_mine.py` drops tables; recovered from the slide XML): prescaler 1 / 2 / 6 / 60 / 240 → timer clock 12 MHz / 6 MHz / 2 MHz / 200 kHz / 50 kHz → autoreload 240,000 / 120,000 / 40,000 / 4,000 / 1,000, column header "Autoreload (≤65,635)" [sic — 65,535]. The first two rows are unusable: the 16-bit ARR |
| 13 | **Auto-reload / Counter / Prescaled clock input / Compare register** over RM0490 Figure 165, titled "Review: Timer 14 PWM on the STM32C0". Speaker note is AVR-era (TCNT, OCR, "8-bit counter") — mine nothing from it. **Recall of Day 11x** (`fig-tim14-block-full` is this exact figure) |
| 14 | **Nucleo PWM outputs** — the annotated pinout. "Almost every pin is capable of PWM, driven by different counters. PA4, PA7 and PB1 can be driven by TIM14. See Datasheet, Table 12." Verified §3. Speaker note is stale (Arduino pins 9/10/11, the H-bridge) — drop |
| 15 | **Setting up Timer 14 for PWM** — the design table (recovered from XML): prescaler 6 / 60 / 240 → ARR+1 40000 / 4000 / 1000 → T0 = 20 ms/(ARR+1) = 0.5 µs / 5 µs / 20 µs → steps between 1 and 2 ms = 2000 / 200 / 50 → Δθ = 180°/steps = 0.09° / 0.9° / 3.6°. Callouts on the pulse figure: "Minimum pulse width, T0 = Tp/MAXCOUNT", "Pulse period, Tp". Text: "Which one do you like best? 50 Hz frequency gives a pulse period of Tp = 1000/50 = 20ms. Recall: The servo has a dead band of 1µs. If you change the pulse by 1µs the motor won't notice." Speaker note: prescaler 6 is finer than the dead band, "more finely grained than is worth doing. But… a prescaler of 60 is great. Next one is fine too." (Her note says "the 4us is good" where the table says 5 µs — the table is right.) |
| 16–17 | **Timer 14 registers** — CCMR1 OC1M bit-field image with the two clear-then-set lines; CCER, EGR, CR1 images. **All taught on Day 11x** (`fig-tim14-ccmr1*`, the CCER/EGR/CR1 figures in `subsec-day11x-driver`) — recall by xref, never re-teach |
| 18 | The register map with "determines TPERIOD" / "determines THIGH" / "Prescaler - counting rate" callouts and Vavg = VM × THIGH/TPERIOD. **This is Day 11x's `fig-tim14-register-map`** (same base image) — xref |
| 19 | **Choosing TIM14_ARR and TIM14_CCR1** — the fill-in: "Timer 14 will: count continuously from 0 to the value stored in TIM14_ARR; drive the connected pin high while the timer is between 0 and the value stored in TIM14_CCR1; drive the pin low while the timer is between TIM14_CCR1 and TIM14_ARR. Recall: by default the oscillator on the STM32C031 runs at ____ MHz. Prescaler slows the clock down to ____ MHz. What value should we choose for ARR+1? ____ = PWM_TIMER_MAX. What value for CCR1 will yield a pulse of 1ms ____ = SERVO_MIN, 1.5ms ____ = SERVO_MID, 2ms ____ = SERVO_MAX. Pick one." Speaker note = the answers: `PWM_PSC_FACTOR 60 // 12 MHz / 60 = 200 KHz`, `PWM_TIMER_MAX 4000 // 200 KHz / 4000 = 50 Hz`, `SERVO_MIN 200 // 1 ms`, `SERVO_MID 300`, `SERVO_MAX 400`; "Important to know SERVO_MIN and MAX since you HAVE to stay between those to not damage the servo." **Instructor-only** (P-10) |
| 20–21 | **Design exercise, Part 1** — copy `TemplateProject` → `Servo`; download `Day15_servo_template.c`, `tim.c`, `tim.h` from Canvas into `Src`/`Inc`; "You'll also need your adc code. If you have previously added your adc code to the mylib folder you are good to go, otherwise copy adc.c and adc.h into Src and Inc." Complete: TIM14 prescaling; the four `#define`s; the pot→pwm mapping expression; adjust anything ADC-related. Wire the pot to Analog 0 "as usual", AD2 CH1 to PA7 and ground; verify the pulse sweeps 1–2 ms as the pot turns; demonstrate to an instructor or LF; "What setting might you use for your time base? Trigger on the rising edge."; note the 1.5 ms pot position and re-seat the knob at midway. Speaker note: **"This exercise takes students a LONG time. Lots of trouble-shooting to do."** Its "0 to 1023" and "Scopy" are AVR/ADALM leftovers — the ADC is 12-bit (0–4095) and the software is Waveforms |
| 22–23 | Her two Waveforms captures: knob leftmost, cursors 1.0056 ms and 19.91 ms; knob rightmost, 2.008 ms and 19.93 ms; 5 ms/div, rising-edge trigger. Reference images for the verification step (the spec 1–2 ms / 20 ms is printed in Lab 8 itself, so these give nothing away) |
| 24–25 | **`Day15_servo_template.c`**, blank and completed (§2). Speaker notes carry AVR residue (`TIMER1_TOP 40000`, `TCCR1B`, `/1023`) — P-12 trap, drop |
| 26 | **`tim.c`** — `tim16_ms_interrupt_init()`, `tim14_pwm_set()`, `tim14_pa7_pwm_init(prescaleFactor, timerMax)` (§2) |
| 27 | **Servo wiring** — the SG92R photo. "UNPLUG POWER before making any changes to wiring. Brown wire → ground; Red/Orange wire → power; Yellow wire → a PWM pin. TIM14 can control PA7." |
| 28 | **How to power a servo** — "Servo runs on 4-6V, draws a lot of current. It may draw 250mA while moving, can be much higher if stalled. Because of high current draw, power the servo from a separate supply, NOT from the Nucleo's +3/5V pin." Then the battery-box paragraph (SUPERSEDED — her answer above). "Why? The USB power from your laptop is limited to 500mA. High current draw by the servo can starve the Nucleo, causing it to 'brown out' and reset itself." Speaker note: "Used to do this but kept running out of batteries. That's why we use our external power supply again, just like in the motor lab." |
| 29 | **How to power a servo (2)** — "We'll use the same external power supply setup as we did for the motor" (the rest names 9 V and a 7805 — superseded by her Day 12 ruling, see the top of this file). Colour callout "Brown ➝ GND, Orange ➝ power, Yellow ➝ PWM". **The Fritzing on this slide draws the servo's supply rail from the Nucleo's 3V3 pin** — §6, question 5 |
| 30 | **Design Exercise, Part 2** — "Wire the servo and power board to the breadboard. Check wiring with instructor. Pot → ADC → PWM controls the servo. Your program is still there on your Nucleo, so you should see the servo rotate, smoothly, as you adjust the potentiometer." Same Fritzing, now with the pot |
| 31 | "If you finished everything… then you don't need to come to tomorrow's x-hour." Classroom management (S-25) — instructor note at most |

Slide 4 is a section divider.

### Day 15x (Wed x-hour, 50 min) — Servos, continued

Six slides: title; "If you didn't finish Tuesday's design exercise you need to
complete that first, before moving on to the next exercise"; then Day 15's
slides 27, 28, 29, 30 verbatim (slide 6 adds "Use the code from
Day15_servo_template.c that you completed last class"). **Her x-hour is a
work session with no new content.** Whatever the plan adds to it is ours, and
must be named as such for `checker-arc-fidelity`.

### Day 16 (Thu, 110 min) — Photosensors and the solar tracker

| Slide | Content |
| --- | --- |
| 3 | **Photocell = light-dependent resistor (LDR)** — Adafruit's product photo. "Cadmium sulfide's resistivity decreases with increasing light exposure." Bullets and speaker note: semiconductor with high resistance; photons absorbed free electrons; "Very low cost, but are very inaccurate. Each photocell sensor will act a little differently than the other. The variations can be really large, 50% or higher! They shouldn't be used to try to determine precise light levels. Instead, you can expect to only be able to determine basic light changes." (The bullets are Adafruit's guide, near-verbatim — §3) |
| 4–5 | **Photosensors are frequently nonlinear** — the resistance-vs-illumination log-log family of curves (one curve highlighted red). "The CdS photosensor has nonlinear response: its resistance is not a linear function of the illumination. This isn't a problem if used as a 'light / dark' sensor for night lights, etc. If you want a quantitative result (lux), must implement a conversion function." Slide 5 adds the datasheet's relation: "log10(R100) – log10(R10) = −0.6 (log10(E100) – log10(E10))". "'lux' = lumens per square meter". Speaker note: log-log scale; the datasheet's two-step recipe for drawing your own curve ("look up 2 footcandle resistance in table; draw a curve through that point parallel to the closest member of the family") |
| 6 | **Many sensors are based on resistance** — potentiometer (position, angle), force-sensing resistor, photoresistor, thermistor; also strain gage and load cell ("require more complex electronics than a simple voltage divider") |
| 7 | **Using a CdS photocell to measure light** — the divider figure (R_sens over R_M, V_M = V_cc · R_M/(R_sens + R_M)). "**Discuss at your table: As the light gets brighter, does VM increase or decrease?** Part 1 of the lab will guide you deeper into the data sheet." |
| 8–9 | **Part 1 of Lab 8: Technical Study of Photocells** — the lab's deliverables 1–8 pasted onto the slides (§4). In her arc **Lab 8's photocell section is done in class** |
| 10 | **Review: servo test setup** — the Day 15 Fritzing + regulator picture again. "Pot → ADC → PWM controls the servo. Use the code from Day15_servo_template.c that you completed last class. We'll now add the photocells to the tracker arm of your servo motor." |
| 11–13 | **Solar Tracker Assembly** — photocells into the shielding cups on the motor arm (photo, "Photocell" arrow); alligator-to-breadboard clips (photo); "Connect the leads of the alligator clips to your breadboard to recreate the photocell circuit from earlier in the lab." "After you've confirmed that your servo (still) works properly with the pot in Part 2 of the lab handout, you can remove the pot." Callout "Physically located in the cups of your tracker arm" on the Fritzing |
| 14 | **Ultimate Setup** — the full Fritzing (two dividers on A0/A1, pot, servo) |
| 15 | **Read "A Solar Tracker" in the lab handout. Discuss at your table how you might implement the feedback loop.** |
| 16 | Student feedback survey — course admin, drop |

Slide 2 is a divider. **Her Thursday is: the sensor, the divider, Lab 8 Part 1
done in class, the arm assembled, and the loop discussed — not the loop
running.** The book's Day 16 crucial step is calibrated to that (question 7).

### §1a Her wording worth carrying verbatim (reuse before invention)

- Slide 6 note: *"This is what's inside your servo. There is a DC Motor that's
  connected to a little circuit board (including an H-bridge). The motor shaft
  goes through this gear train that gears it way down to the output shaft that
  is not turning very fast. A potentiometer is attached to this shaft and gives
  you the angular position of the shaft. Corresponding to that angular position
  the pot puts out a voltage that is fed into the control circuit where it is
  compared with the desired voltage and then the control circuit adjusts the
  motor speed and direction if necessary using the h-bridge until the feedback
  loop signals that the error is zero. Why all the gears? Power is the product
  of torque and angular velocity. Through the gear train the speed going in is
  much higher than the speed going out. Since power is preserved, the torque
  going out is much higher than the torque going in. In goes a high speed motor
  with not a lot of torque, and out comes a low speed with a large amount of
  torque."*
- Slide 8 note: *"It's the ability to go to precisely someplace that's the
  really valuable feature. This works by feedback. You never take a servo all
  the way around. If you do you break it. That's why you can measure the
  position with a pot. … Once in its position, if you try to turn the servo by
  hand the pot is going to sense that and the controller is going to
  counteract that error. So the servo will strongly resist. How exactly the
  controller does this is something you study in ENGS 26. All we have to do is
  stick in a signal to command the position. The circuitry does the rest."*
- Slide 10 note: *"Servos don't have an i2c interface… Technology is fairly
  old, and there is a historic way to control them. … So you are using pwm as a
  way to communicate with the controller rather than directly sending it to the
  motor. For a typical hobby servo, the pwm pulse is repeated at 50Hz. … By
  convention, a 1.5 ms pulse brings the servo to the middle (a zero angle). 1ms
  turns it to -90 degrees, 2ms turns it to 90 degrees. This is hypothetical.
  Our servos don't go all that far. Please do not try to turn them that far. As
  long as the same pulse is applied to the motor, it stays at that one position
  and is held there. If you shut the signal down there is no power on the motor.
  So a servo spins to the correct position and then sticks there as long as you
  apply the same pulses. … So the signal is a position signal and you have to
  keep sending it."*
- Slide 15 note: *"Since each pulse has a period of 20ms, that width is divided
  into ARR+1 number of bins. So 20ms/(ARR+1) gives you the smallest pulse
  width. All useful angles occur between a pulse width of 1ms and 2ms. The
  number of steps in between 1ms and 2ms is the resolution of your servo … each
  step corresponds to 0.09 degrees. Amazing angular resolution! But this thing
  is made out of plastic. So… is that worth it? The servo has a dead band of 1
  us. That means that if you change the pulse by that amount the motor won't
  notice it."*
- Slide 9 note, on kgf-cm: *"A kgf (kilogram force) is the gravity exerted on
  1kg of mass. So kgf-cm is still force times distance. So 2.5 kgf-cm is not a
  huge force, but remember it's a tiny motor!"*
- Slide 28: *"High current draw by the servo can starve the Nucleo, causing it
  to 'brown out' and reset itself."*
- Day 16 slide 3/4 bullets are Adafruit's sentences (§3) — cite the guide when
  they are used, as her slide did.

---

## §2 The code — what is real, where it is, and what is missing

### Already in the repo and already taught

| File | Status this week |
| --- | --- |
| `assets/starters/TTmotor_ramp.c` | Day 11/11x's PWM driver: `tim14_pa7_pwm_init(void)` with `PSC_FACTOR 6`, `PWM_TIMER_MAX 1250`, `ARR = PWM_TIMER_MAX-1`, `CCR1 = 0` safety line, and `tim14_pwm_set()` that **limits** the value to `PWM_TIMER_MAX-1` and writes `CCR1 = value`. Its two commented-out lines (`PSC_FACTOR 120`, `PWM_TIMER_MAX 2000`, "50 Hz with prescale 120") were the Day 11x stretch and `inst-day11x-stretch` already works them out. **Day 15's timer arithmetic is a second, different answer to a question the class has met once** — see §5 |
| `assets/starters/ADCPot.c` | Day 7's driver: `pa0_adc_init()` (PA0 analog, ADC clock, `CHSELR |= CHSEL0`, ADRDY clear + ADEN), `start_conversion()` (wait ADRDY, set ADSTART), `adc_read()` (wait EOC, return DR). One channel. `adc.c`/`adc.h` — the library form the Day 15 template `#include`s — are the students' own productization (Day 7 → mylib); no `adc.h` exists in the repo |
| `assets/starters/ES28.h` | `GPIO_ALTERNATE`, `GPIO_AF4`, `TIM_OC1_PWM1`, `TIM_CC1_OUTPUT` — every symbol `tim.c` uses |
| `assets/starters/sysinit.c` | `milliseconds()` (SysTick, taught Day 12 Part 4) — the timer Lab 8 tells students to use for the sampling interval T |

### Recovered from the deck as text (B-6: verbatim, not reconstructed) — files still to come

**`Day15_servo_template.c`** (slides 24/25). Blank version, exactly:

```c
/* Potentiometer:  	Analog channel PA0
 * Servo PWM input:	PA7 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"
#include "adc.h"
#include "tim.h"

#define PWM_PSC_FACTOR  // prescaler
#define PWM_TIMER_MAX   // 20 ms
#define SERVO_MIN       // 1 ms
#define SERVO_MID       // 1.5 ms
#define SERVO_MAX       // 2 ms
#define MAXADC   4096   // 12-bit converter

volatile uint8_t timerFlag = 0;
void updateServo(uint16_t value);
void updateServo(uint16_t value) {
	if (value>SERVO_MAX)
		value = SERVO_MAX;
	else if (value < SERVO_MIN)
		value = SERVO_MIN;
	tim14_pwm_set(value);
}
void TIM16_IRQHandler(void) {
	__disable_irq();
/* Clear UIF in status register */
	TIM16->SR &= ~TIM_SR_UIF;
	timerFlag = 1;
	__enable_irq();
}
int main(void) {
 int16_t pot_value = 0;
 int16_t pwm_value = SERVO_MIN;
 uart2_init();
 tim14_pa7_pwm_init(PWM_PSC_FACTOR, PWM_TIMER_MAX);
 pa0_adc_init();
 printf("Potentiometer-controlled servo\n\r");
 timerFlag = 0;
 tim16_ms_interrupt_init(500);
 while(1) {
   if(timerFlag==1) {
     start_conversion();
     pot_value = adc_read(); // Pot value (0 to 4095)
     pwm_value =	  	// Map pot_value to pwm_value
     updateServo(pwm_value);	 // Update the PWM
     printf("pot_value=%d, \tpwm_value=%d\n\r",
pot_value, pwm_value);
     timerFlag=0;			 // Put the flag down
   }
 }
 return 0;
}
```

Completed version (slide 25) differs in exactly two places: the four `#define`s
(`60`, `4000`, `200`, `300`, `400`) and
`pwm_value = SERVO_MIN + pot_value*(SERVO_MAX-SERVO_MIN)/MAXADC;`.
Two things to know about that line: `pot_value` is `int16_t`, so
`pot_value*(SERVO_MAX-SERVO_MIN)` is computed in promoted `int` (32-bit here,
max 4095 × 200 = 819,000 — safe); and the map never quite reaches
`SERVO_MAX` (4095 × 200 / 4096 = 199, so the top value is 399). Neither is a
defect; both are worth a sentence when the line is derived. `main()` ends
`return 0;` — her file, keep it (B-14 precedent: `whoami_test.c`).

**`tim.c`** (slide 26), exactly:

```c
#include "tim.h"
#include "ES28.h"
#define TIM16_PSC_FACTOR	12000
void tim16_ms_interrupt_init(int milliseconds) {
	// enable clock access to timer 16
	RCC->APBENR2 |= RCC_APBENR2_TIM16EN;
	// Set prescaler value
	TIM16->PSC = TIM16_PSC_FACTOR - 1;
	// Set auto-reload value
	TIM16->ARR = milliseconds - 1;
	// Clear counter
	TIM16->CNT = 0;
	// Enable update interrupt
	TIM16->DIER |= TIM_DIER_UIE;
	// Enable timer interrupt in NVIC
	NVIC_EnableIRQ(TIM16_IRQn);
	// Enable timer
	TIM16->CR1 |= TIM_CR1_CEN;
}

void tim14_pwm_set(uint16_t value) {
	TIM14->CCR1 = value-1;
}

void tim14_pa7_pwm_init(uint16_t prescaleFactor, uint16_t timerMax) {
	RCC->IOPENR |=  RCC_IOPENR_GPIOAEN;
	// Set PA7 in alternate function mode (10)
	GPIOA->MODER &= ~GPIO_MODER_MODE7_Msk;
	GPIOA->MODER |= GPIO_ALTERNATE << GPIO_MODER_MODE7_Pos;
	// Set PA7 alternate function type AF4
	GPIOA->AFR[0] &= ~GPIO_AFRL_AFSEL7_Msk;
	GPIOA->AFR[0] |= GPIO_AF4 << GPIO_AFRL_AFSEL7_Pos;
	// Enable clock access to Timer 14
	RCC->APBENR2 |= RCC_APBENR2_TIM14EN;
	// Set prescaler
	TIM14->PSC = prescaleFactor-1;
	// Set autoreload value
	TIM14->ARR = timerMax;
	// Set the compare register value
	TIM14->CCR1 = 0;
	// Set pwm mode 1 (0110)
	TIM14->CCMR1 &= ~TIM_CCMR1_OC1M_Msk;
	TIM14->CCMR1 |= TIM_OC1_PWM1 << TIM_CCMR1_OC1M_Pos;
	// Make sure timer is in output mode
	TIM14->CCMR1 &= ~TIM_CCMR1_CC1S_Msk;
	TIM14->CCMR1 |= TIM_CC1_OUTPUT << TIM_CCMR1_CC1S_Pos;
	// Enable TIM14_CH1 in output mode
	TIM14->CCER |= TIM_CCER_CC1E;
	// Generate an update event
	TIM14->EGR |= TIM_EGR_UG;
	// Enable timer
	TIM14->CR1 |= TIM_CR1_CEN;
}
```

**`tim.h`** was on no slide. **All three files landed in `assets/starters/`
on 2026-09-03 (Petra)** — `Day15_servo_template.c`, `tim.c`, `tim.h` — and are
now the authority over the deck text above. `tim.c` matches the slide
verbatim (comments fuller). The template differs from the slide in shape,
not in code that students touch: a `servo.c` header block naming the
dependencies (`adc.c`, `uart.c`, `tim.c`) and the pins; `updateServo()` and
`TIM16_IRQHandler()` moved below `main()`; the read comment is "Pot value
(0 to MAXADC-1)"; a "Processor could sleep here" comment in the loop; the map
line is boxed between two comment rules. `tim.h` declares the three
prototypes, `tim14_pwm_set(uint16_t pulse)`. Register the book's listings
against these files in `scripts/check_starters.py` when they exist.

### §2a Two things in `tim.c` that the plan must not paper over

1. **The off-by-one convention differs from the driver Day 11x taught.**
   `TTmotor_ramp.c` writes `ARR = PWM_TIMER_MAX-1` and `CCR1 = value`, and
   Day 11x's passed prose says *"Both the prescaler and counter start counting
   at 0, we therefore subtract one from the value we have in mind"* (S-14's own
   example). `tim.c` writes `ARR = timerMax` (period 4001 counts = 20.005 ms)
   and `CCR1 = value-1` (a `SERVO_MID` of 300 gives 299 counts HIGH). Neither
   is wrong enough to matter to a servo, but a student who reads both files —
   and Lab 8 §3 sends them back to their Day 15 program — sees two answers to
   a question the course made a point of. **Resolved 2026-09-03: Petra asked
   for the fix** ("so that we go for 4000 counts not 4001") — `tim.c` in
   `assets/starters/` now writes `ARR = timerMax-1` and `CCR1 = value`, the
   Day 11x convention, with comments saying why. Nothing to re-teach: Part 4's
   "what changed since Wednesday's driver" is the two parameters and the
   moved limit only. The deck text above (§2) is superseded by the file.
2. **`tim14_pwm_set()` has lost its limit.** The Day 11x version limits the
   value to `PWM_TIMER_MAX-1` before writing `CCR1`; the servo version does
   not, because the limiting moved up into `updateServo()`, where it is
   `SERVO_MIN..SERVO_MAX` — a narrower, servo-specific bound ("you HAVE to stay
   between those to not damage the servo"). That move is a teachable design
   point (the driver knows the timer; the program knows the servo), and it is
   the reason the plan keeps `updateServo()` as a taught beat rather than a
   line to skip.

### §2b TIM16 — a timer the book has named but never used

The template's sampling tick is `TIM16` (RM0490 §18, "General-purpose timers
(TIM16/TIM17)", p. 493: a 16-bit auto-reload upcounter with a programmable
prescaler, one channel, update interrupt; `TIM16_IRQn`, vector 21 —
`ch-timers-interrupts.ptx` already lists it). `tim16_ms_interrupt_init()` is
Day 8's `TIM14` interrupt recipe with the peripheral name changed: clock,
`PSC = 12000-1` (1 kHz tick), `ARR = ms-1`, `DIER |= UIE`, `NVIC_EnableIRQ`,
`CEN`. Why a second timer at all: TIM14 is now busy being the PWM, and Day 8
used TIM14 for the periodic interrupt. **Recall with one new fact**, not a new
mechanism. (Lab 8 instead says to use `milliseconds()` for the interval T — the
plan's Day 15 stretch is exactly that substitution, which also makes the Lab
8 controller's `T` a `#define`.)

### §2c Reading two ADC channels — needed by Lab 8, taught nowhere, not "easy" as written

Lab 8 Part 1: *"Write a program to measure the two sensor voltages… This
should be an easy two-channel modification of the earlier A/D + potentiometer
program."* Nothing in `ch-adc.ptx` reads two channels; Day 7's homework
(`ADC1->CHSELR = ADC_CHSELR_CHSEL18;`, plain `=`, with the note that `|=`
"would leave channel 0 selected as well and the ADC would scan a two-channel
sequence") is the only place the idea appears, as a warning.

RM0490, pasted:

- §14.4.x *Channel selection (CHSEL, SCANDIR, CHSELRMOD)*, p. 249: *"It is
  possible to convert a single channel or a sequence of channels. The sequence
  of the channels to be converted can be programmed in the ADC_CHSELR channel
  selection register: each analog input channel has a dedicated selection bit
  (CHSELx). … Sequencer not fully configurable: the order in which the channels
  are scanned is defined by the channel number (CHSELRMOD bit must be cleared
  in ADC_CFGR1 register)… the channels are scanned in a forward direction (from
  the lowest to the highest channel number)…"*
- §14.4.10 *Single conversion mode (CONT = 0)*, p. 251: *"the ADC performs a
  single sequence of conversions, converting all the channels once… Inside the
  sequence, after each conversion is complete: the converted data are stored in
  the 16-bit ADC_DR register; the EOC (end of conversion) flag is set… After the
  sequence of conversions is complete: the EOS (end of sequence) flag is set…
  Then the ADC stops until… the ADSTART bit is set again. Note: To convert a
  single channel, program a sequence with a length of 1."*
- §14.12.x ADC_CR, p. 281: *"After writing to ADC_CHSELR register or changing
  CHSELRMOD or SCANDIRW, it is mandatory to wait until CCRDY flag is asserted
  before setting ADSTART, otherwise, the value written to ADSTART is ignored."*

So there are two honest routes, and the book must pick one with her (question
4): **(A)** select both channels in `CHSELR` and call `adc_read()` twice per
`start_conversion()` — DR holds channel 0's result at the first EOC and
channel 1's at the second, and the second `start_conversion()` the student
would naturally write is harmless only because ADSTART is already set; or
**(B)** write `CHSELR` to a single channel before each conversion, waiting on
CCRDY, i.e. an `adc_read_channel(n)`-shaped function. (A) is fewer lines and
matches the lab's "easy"; (B) generalizes and matches the Day 7 homework's
plain-`=` idiom. Either way it is **new code the course has not shown**, so it
is a taught beat, provisionally Day 15x Part 3 (§5).

Nucleo header → pin → ADC channel, from datasheet Table 12 (p. 31–32): **A0 =
PA0 = ADC_IN0, A1 = PA1 = ADC_IN1, A2 = PA4 = ADC_IN4, A3 = PB1 = ADC_IN18**
(the Day 7 homework's channel 18 is A3). Lab 8 §3 says the pot goes on
"analog channel 3" while the Day 15 template uses PA0 and Day 16's Fritzing
puts the photocells on A0/A1 — **question 3**.

---

## §3 The datasheets and manuals — in the repo and verified

**`assets/datasheets/Servosg90_datasheet.pdf`** (1 page; link as
`external/datasheets/Servosg90_datasheet.pdf`). Pasted: *"Tiny and lightweight
with high output power. Servo can rotate approximately 180 degrees (90 in each
direction)… Position '0' (1.5 ms pulse) is middle, '90' (~2ms pulse) is all the
way to the right, '-90' (~1ms pulse) is all the way to the left."* Table:
Speed (sec) 0.1; Torque (kg-cm) 2.5; Weight (g) 14.7; Voltage 4.8–6; dimensions
A–F. Wiring figure: **PWM = Orange, Vcc = Red (+), Ground = Brown (−)**; timing
figure "1–2 ms Duty Cycle, 20 ms (50 Hz) PWM Period, 4.8 V (~5 V) Power and
Signal". **Not in it:** dead band, current draw, stall current.

**`assets/datasheets/C17481_SG92R_datasheet.pdf`** (Petra, 2026-09-03; the
Adafruit-hosted sheet for the **SG92R**, which is the kit's part — there is no
official one beyond the maker's page, https://towerpro.com.tw/product/sg92r-7/).
One page, pasted: digital 9 g servo, Teflon bushing, 25 cm wire, coreless
motor; 23 × 12.2 × 27 mm; **stall torque 2.5 kg/cm at 4.8 V**; **operation
speed 0.1 s/60° at 4.8 V**; operating voltage 4.8 V; gear type **POM with
carbon fiber gear**; **dead band width 1 µs**; 0–55 °C. So the dead band her
prescaler choice turns on is now sourced, and so is her plastic-gear argument
(POM). **Still in no sheet:** current draw — "250 mA while moving, can be much
higher if stalled" is her slide 28's figure (follow-up 1b); the placeholder's
"700 mA at stall" stays condemned. The book names the part **SG92R** and
links this sheet; the SG90 sheet stays hosted for its wiring and timing
figures.

**`assets/datasheets/CdS-photocell-PDV-P8001.pdf`** (1 page, Advanced Photonix,
rev 3/30/06). Electro-optical characteristics at 23 °C: dark resistance R_D
min **0.2 MΩ** (after 10 s at 10 lux, 2856 K); illuminated resistance R_I
**3 kΩ min, 11 kΩ max** at 10 lux; sensitivity S = [log(R100) − log(R10)] /
[log(E100) − log(E10)] typ **0.6** (her slide 5's −0.6 slope — the datasheet
prints the magnitude; the sign is in the definition); spectral range 400–700
nm, peak 520 nm; rise time 55 ms, fall time 20 ms (both at 10 lux); absolute
max 150 V, 100 mW/°C, −30 to +75 °C. **The dark and illuminated minimums are
Lab 8 Deliverable 1 — the book never prints them** (§4). What the datasheet
activity can send students to instead: the spectral peak against the eye, the
rise/fall times against the sampling interval T, the 2856 K test condition,
the sensitivity definition as a slope on the log-log plot, the "available in a
wide range of resistance values" line that explains unit-to-unit variation.

**`assets/datasheets/Adafruit-photocells.pdf`** (25 pages, "Photocells", lady
ada, 2018). Pages 3–5 and 11–12 are the source of her Day 16 slide 3/4 text
and of the resistance-vs-illumination graph: *"Resistance range: 200KΩ (dark)
to 10KΩ (10 lux brightness)"*, *"Each photocell sensor will act a little
differently than the other, even if they are from the same batch. The
variations can be really large, 50% or higher!"*, *"Note that the graph is not
linear, its a log-log graph!"*, the lux table (p. 6: 50 lux living room, 300–500
lux office, 10,000–25,000 lux daylight), the voltage-divider method (p. 11–12,
with the "Axel Benz" formula: pull-down = √(Rmin × Rmax) — **the geometric-mean
rule Lab 8 Deliverable 4 cites to "page 133 of Williams"**, so the book can cite
the Adafruit guide instead and never Williams). Its code is Arduino — B-11e,
never quoted. Its "dark… up to 10MΩ" (p. 5) is a generic figure, not this
part's.

**STM32C031 datasheet Table 12** (pp. 31–33): PA4, PA7 and PB1 carry
`TIM14_CH1` (PA4 on AF4 with USART2_TX/TIM1_CH2N; PA7 on AF4; PB1 on AF0), and
PF0 — her slide 14 is right. ADC channel map as in §2c.

**RM0490**: §17 "General-purpose timers (TIM14)" p. 467 (Figure 165 block
diagram p. 468; §17.3.8 PWM mode p. 479; §17.4 registers p. 482 — CR1 482,
DIER 483, EGR 484, CCMR1 485, CCER 488, CNT 489, PSC 490, ARR 490, CCR1 490,
register map 491); §18 TIM16/TIM17 p. 493 (registers p. 524, map p. 543); §14
ADC as cited in §2c (channel selection p. 249, single conversion p. 251, EOS
p. 256, CHSELR register p. 289). All page numbers are the PDF's printed ones,
checked by search in the hosted file.

---

## §4 Lab 8 — the downstream constraint, and the protected list

`assets/Labs/Lab8_ES28.pdf`, "Lab 8 — Servo Motors", due Tue March 3, 2026.
Equipment: Nucleo and breadboard; **TowerPro SG92R microservo and solar tracker
fixture**; two photocells; two 10 kΩ resistors; "9V power supply" (the
regulator board's adapter — never named that way in the book); alligator-to-
breadboard jumpers; a flashlight (phone). Appendix A: the kit includes a
3D-printed motor arm and stand, "most have already been assembled"; photocells
go into the shielding cups on the arm; alligator clips carry their leads to the
breadboard.

**§2 Technical Study – Photocells** (Figure 1: photocell R1 on top from V_cc,
R2 to ground, output V1 — the node is labelled `V_AVR_PCx`, an AVR leftover).
Deliverables, each 1 pt: **1** datasheet minimum dark and minimum illuminated
resistance; **2** measured dark/illuminated resistance with the multimeter;
**3** why measured and datasheet disagree; **4** R2 = √(R_dark × R_illuminated)
from the measured values ("page 133 of Williams" — the course no longer cites
Williams; the Adafruit guide carries the same rule, §3); **5** expected V1
dark/light from the divider equation at V_cc = 3.3 V, from measured values;
**6** the same with a 10 kΩ, and "is this a problem?"; then wire two dividers
(Figure 2: photocells and 10 kΩ on the breadboard, outputs to two A-pins),
write the two-channel program, one-second sampling, AD2 voltmeter on both;
**7** measured values within the expected range; **8** min/max while sweeping
a flashlight.

**§3 Technical Study – Servo Motors**: *"This section repeats the class activity
from Day 15. There is nothing to turn in."* Modify the Day 15 program for a pot
"on analog channel 3" (question 3); PWM per Figure 3 (20 ms period, 1–2 ms
pulse) verified in Waveforms; barrel-jack adapter supplying 5 V, confirmed with
the voltmeter; unplug the Nucleo while wiring; servo follows the pot; then the
pot can go. Note box: *"There are several different color schemes for the servo
motor connections. The center pin is VCC (5V), the darker of the outer wires
(either black or brown) in GND, the other is the PWM signal."*

**§4 Design Challenge – Solar Tracker** (Figure 6 block diagram: two sensors →
two ADCs → controller → PWM → servo → angle θ, fed back optically). Her theory
of operation, verbatim where the book needs it: *"If V1 = V0, the tracker is
pointing right at the source, as desired. If V1 ≠ V0, you want to nudge the
servo in a direction that will tend to equalize the voltages. The difference
V1–V0 is called the error, e. Repeated nudges, or steps, increase or decrease
the PWM value, until the error is reduced to zero… The controller, which you
will write in C, takes in the ADC values, updates the PWM value, and writes it
to the CCR1 register. This is called a closed-loop feedback control system."*
Then PWM(t+T) = PWM(t) ± Δ, and the proportional form PWM(t+T) = PWM(t) + K e(t)
with e = V1 − V0, *"we can just use the ADC readings directly and lump the
proportionality constant VREF/4096 into K"*; tune T and K; too aggressive →
oscillation, too cautious → lag; *"start out cautiously, with a value of K on
the order of 0.01"*; *"impose upper and lower bounds on the PWM values before
writing to OCR1A"* (AVR leftover — CCR1) *"so that you don't overdrive the
servo beyond ±60° of center"*; *"You will be using Timer 14 for the PWM… Use
the millisecond timer we have provided keep track of your value for T."*
Competing light sources (laptop screen, lamp, window). **Deliverable 9 (10
pts): demo. Deliverable 10 (2 pts, final touches): seven-segment display back
in, calculate and display the servo angle.**

### The protected list (never in student-facing text, screenshots included)

| Deliverable | What the book must not contain |
| --- | --- |
| 1 | the PDV-P8001's dark-resistance and illuminated-resistance minimums, in any form (a "typical range" sentence that quotes them is the same leak) |
| 2, 3 | a measured value; the reason measurement disagrees with the sheet (the *ideas* — unit variation, the 2856 K test condition, your flashlight is not 10 lux — may be taught, the written answer may not) |
| 4 | R2 computed for these parts. The geometric-mean rule and *why* it centers the swing may be taught (it is in the lab and in Adafruit) |
| 5, 6 | expected dark/light voltages with these numbers, and whether 10 kΩ is a problem |
| 7, 8 | example readings from a working divider (a terminal screenshot showing two channel values is a leak — blur or omit) |
| 9 | the controller. No tracker loop code in student-facing text; the placeholder's `solar_tracker_update()` is condemned. A worked example may exist in `<instructor>` (P-10) |
| 10 | the CCR1→angle formula as code. The datasheet's 1 ms ↔ −90°, 1.5 ms ↔ 0°, 2 ms ↔ +90° may be stated (it is on her slide 10 and the sheet); the arithmetic is theirs |

Lab 8 problems that are hers, not ours, flagged at delivery: "OCR1A" for CCR1;
"page 133 of Williams"; "V_AVR_PCx"; "analog channel 3" vs the Day 15 template.

---

## §5 Continuity — what is already taught, what this week may not re-teach, what is new

**From Days 11/11x/12 (`ch-motors.ptx`), verified against the source:**

- The DC motor physics and torque ∝ current (`subsec-day11-actuator-chain`) —
  her Day 15 slide 5 is one recall slide, not a re-teach.
- PWM as counter + compare (`sl-day11-counter-compare`), TIM14 on PA7 (D11)
  via AF4 and datasheet Table 12 (`inst-day11-pwm` says so), the whole of
  `tim14_pa7_pwm_init()` register by register (`subsec-day11x-registers`,
  `subsec-day11x-driver`, with `fig-tim14-block-full`, `fig-tim14-main-circuit`,
  `fig-tim14-output-stage`, `fig-tim14-register-map`, the CCMR1/CCER/EGR/CR1
  figures). **Her Day 15 slides 13, 16, 17, 18 are those figures** — xref, never
  redefine an id. Resolution T0 = period/steps (`subsec-day11x-resolution`).
  **Prescaler arithmetic for 50 Hz was already done once**, as the Day 11x
  stretch (PSC 120, ARR 2000, 10 µs steps) — a different row of the same table.
  Day 15 must frame its design exercise as *a second design with a new
  constraint (the dead band and the 1–2 ms window)*, not as first contact.
- The regulator board and its rules (`fig-tb6612-regulator`, `sl-day11-regulator`,
  the "two supplies, one ground" paragraph, USB-first-then-adapter order in
  `sl-day11-wiring-1`, Day 12's build-order table measuring 5 V at the pins).
  Reuse by xref; her Day 15 slide 28's *why* (brown-out) is the one new sentence.
- `milliseconds()` and the three-rates main loop (`subsec-day12-main-loop`) —
  Lab 8's sampling interval T.
- The Day 12 whole-build discipline: power, then ground, then the signal path.

**From Day 7 (`ch-adc.ptx`):** the single-channel driver, 12-bit 0–4095 (so the
deck's "0 to 1023" note is a trap), the potentiometer as a divider
(`subsec-adc-potentiometer` — the only voltage-divider teaching in the book so
far, and it is the pot's own track, not a sensor + fixed resistor), Table 12
for analog pins, the CHSELR bit-per-channel figure. **Two channels: new (§2c).**

**From Day 8 (`ch-timers-interrupts.ptx`):** the periodic-interrupt recipe on
TIM14, `volatile` flags, the ISR-clears-UIF idiom — `tim16_ms_interrupt_init()`
is that recipe on TIM16 (§2b). Recall with one new name.

**From Day 3/AD2:** CH1 orange, CH2 blue; time base and trigger settings — the
"what time base?" question on her slide 21 is a Day 3 skill applied.

**Feedback / closed loop:** not taught anywhere before Day 15's reading (the
servo's internal loop), then written by the student on Day 16 / Lab 8. Two
loops in one week — the one inside the servo that we buy, and the one around
it that we write — is the week's arc (week8-map).

**Floating point (L-2):** Lab 8's K ≈ 0.01 invites a float. Day 14 taught
`round()` and the no-`%f` rule; the plan's Day 16 Part 5 makes the integer form
of K e a predict beat (e = 50, K = 0.01 → integer step 0 → a dead zone, which is
useful) rather than reaching for `float`.

**Deferred-topics list** (`CHAPTER_PROCESS.md`): nothing pending lands here.
**Downstream:** Days 17/17x (BLE, power) do not depend on this week.

---

## §6 Figure manifest (P-12) — every image, with a decision

Extractions are in `assets/images/Day15-Servos/`, `Day15x-Servos(2)/`,
`Day16-Photosensors/`. Hash-named files are the `pptx_annotate.py` rebuilds
already on disk; for every slide listed, `--list` was run and its overlapping
shapes are noted.

| Deck slide | What | Decision |
| --- | --- | --- |
| 15/5 | Four motor images (gif, cutaways) | **Drop** — `ch-motors` owns the motor figures; the recall slide uses `refPage` to Day 11's |
| 15/6 | howtomechatronics servo cutaway (gearbox, pot, DC motor, control circuit) | **Use raw** with the source URL as her slide carried it; it is the only inside-the-servo picture we have. Labels are legible at projection |
| 15/8 | Her feedback block diagram (command → error → controller → motor → gears → position; pot feedback) | **Use raw** (`slide08_095020b6.png`); clean, hers. Book figure and the Day 16 loop's sibling |
| 15/9 | SG92R product photo (arm on); SG92R with cable (leads brown/red/orange) | **Use raw**, the second one is the wiring-colour reference photo (question 6 on lead colours) |
| 15/10 | Her pulse-width figure (1 / 1.5 / 2 ms, ≈20 ms not to scale) | **Use raw** — the servo-command figure for reading and class |
| 15/11–12 | Same pulse figure + the prescaler table | Table is **text** (recovered, §1); the blank version is the commit, the filled one the reveal |
| 15/13 | RM0490 Figure 165 with "Auto-reload / Counter / Prescaled clock / Compare register" callouts | **Do not rebuild** — xref `fig-tim14-block-full` (Day 11x) |
| 15/14 | Annotated Nucleo pinout (PWM flags per pin) | **Use raw** for the "which pins can TIM14 drive" lookup, cropped to the header columns if it projects small; Table 12 is the citation |
| 15/15 | Bare pulse figure + T0/Tp callouts + the resolution table | **Rebuild with `pptx_annotate.py --max-text 200`** for the two callouts (they are the definitions); the table is text, blank for the commit (only the prescaler column filled), full for the reveal |
| 15/16 | OC1M bit-field text + two code images | **Do not rebuild** — Day 11x's `fig-tim14-ccmr1*` figures |
| 15/17 | CCER / EGR / CR1 bit diagrams | **Do not rebuild** — Day 11x's figures |
| 15/18 | Register map with TPERIOD/THIGH/prescaler callouts | **Do not rebuild** — `fig-tim14-register-map` |
| 15/22–23 | Waveforms captures, 1 ms and 2 ms pulses at 5 ms/div with cursors | **Use raw** as the reference for the verification step (nothing graded is in them) |
| 15/27 | SG92R photo (same as 15/9 second image) | reuse 15/9 |
| 15/28 | Battery box photo; Fritzing with a battery pack | **Drop both** — superseded by her answer |
| 15/29 | Her composite: Fritzing + the regulator board as a **separate layered picture**, which extraction drops. **CORRECTED 2026-09-03:** in her slide the servo's power lead runs to the regulator board's **5V pin**, not to the rail; the rail is the Nucleo's 3.3 V and GND (the pot's supply and the shared ground). The "wrong rail" reading in this file's first version and in Gate 1 was an extraction artifact, not her drawing. **Her export `towerProPowering.png` (2026-09-03) is the figure** — servo, regulator board on the breadboard, legend "Brown → GND, Orange → power, Yellow → PWM" |
| 15/30 | Same, with the pot | **Her export `towerProPot.png` (2026-09-03)** — but its pot is on **A3** (the lab's channel); Day 15 wants **A0**, and she is re-exporting for that (follow-up 3b). Until then the book uses `towerProPowering.png` for the servo and Day 7's pot figure for the pot |
| 15x/* | re-shows of 15/27–30 | as above |
| 16/3 | Adafruit photocell photo | **Use raw**; credit as her slide did |
| 16/4–5 | Resistance-vs-illumination log-log family (one curve red) | **Use raw** (`slide04_0c98f286.png`); the axes are legible. It is the generic family from the Adafruit guide, not the PDV-P8001's own — caption says so |
| 16/6 | Sensor-family image (7 KB) | Check at render; likely **drop** for a text list (her slide is text) |
| 16/7 | Divider schematic (R_sens over R_M, V_M formula) | **Use raw** — the interface figure; note Lab 8 Figure 1 draws the same circuit with R1/R2 |
| 16/8 | Lab 8 Figure 1 + two formula images | Lab figures — **do not reproduce the deliverable text**; the divider drawing may be used once (16/7 is better) |
| 16/9 | Lab 8 Figure 2 Fritzing (two dividers to A0/A1) | **Use raw** — it draws the 3V3 rail correctly for the dividers (no servo) |
| 16/10 | = 15/30 + regulator | Thursday's review beat only; the pot comes out at the start of Thursday's lab work (Petra, 2026-09-03), so the figure that matters is 16/14's export |
| 16/11 | Photocell in the cup, "Photocell" arrow (Lab App. A photo) | **Use raw** |
| 16/12 | Alligator clips on the arm (Lab App. A photo) | **Use raw** |
| 16/13 | = 15/30 with "Physically located in the cups" callout | the callout goes on `week8FullLabSetup.png` (below) as a caption or a `pptx_annotate`-style overlay if wanted; the extracted base is not used |
| 16/14 | Full Fritzing — **two dividers and the servo, no potentiometer**: her end state | **Delivered 2026-09-03: `assets/images/Day16-Photosensors/week8FullLabSetup.png`** — two photocell dividers (10 kΩ each) with their nodes on **A0 (blue) and A1 (purple)**, the 3.3 V and ground rails from the Nucleo, the servo's power lead to the regulator board's 5V pin, its ground to the rail, its signal to D11, the board's GND to the rail. The Day 16 wiring figure |
| 16/16 | Survey QR | **Drop** |
| all/1 | Logo slides | **Drop** |

**Figures that do not exist and are needed:** (a) ~~the servo-on-the-regulator
wiring drawing~~ — **delivered**: `towerProPowering.png` (servo) and
`week8FullLabSetup.png` (Day 16 end state); the pot-on-A0 version of
`towerProPot.png` is being re-exported (she asked what to name it: overwrite
`towerProPot.png` — the book never shows the A3 version); (b) the two-loops picture for the week map (the servo's
internal loop, from her slide 8, next to the tracker loop, Lab 8 Figure 6) —
hand-author, both halves exist; (c) a blank-then-filled version of her two
tables, which are text and need no image.

---

## §7 The placeholder chapters — what survives, what is condemned

Both were written before the voice rules, the gates and most of the authoring
rules. Read as an outline someone else left; trust level low.

### `ch-servos.ptx` (540 lines)

**Usable (as outline, re-written in her voice):** the three-part shape
(concepts reading → PWM generation → wiring and power); the figure choices
15/6, 15/8, 15/10, 15/22–23 (all in §6); the objective "calculate TIM14
PSC/ARR/CCR1 values to produce a 50 Hz servo PWM signal".

**Condemned, with the reason:**

1. **Every number in the Canvas quiz block and reading questions is unverified
   or wrong.** "1.3 ms → approximately −54°" is linear interpolation asserted as
   fact over a range her own note calls hypothetical. "Servos draw up to 700 mA
   at stall" appears nowhere in the hosted datasheet or her deck (she says
   "250 mA while moving, can be much higher if stalled" — no stall number). "A
   GPIO pin is limited to ~8 mA" — unsourced. Q4's *reason* is also wrong: the
   argument is current and the brown-out, not "above the 3.3 V rail".
2. **The timer numbers contradict her design.** It teaches `PSC = 11, ARR =
   19999, CCR1 = 1000/1500/2000` (a 1 MHz tick) with `TIM_CCMR1_OC1PE` and
   raw bit shifts (`3U << 14`, `4U << 28`). Her design is PSC 60 / 4000 /
   200–300–400, chosen *through* the dead-band argument, and her code is the
   CMSIS-mask idiom the whole book uses. Every figure caption in
   `subsec-servo-timer-registers` restates the wrong numbers.
3. **"the audio-inaudible 20 kHz frequency used for motors"** — the motor PWM
   was 1.6 kHz (`TTmotor_ramp.c`), audibly so; Day 11 made a point of it.
4. **The power section keeps the battery/USB-header options** ("use the 5 V
   output on the Nucleo's USB power header (sufficient for light loads…)") —
   superseded and, for the second half, contrary to her rule.
5. **"Lab 7: Servo Sweep"** — wrong lab number, and an invented activity (sweep
   in 10 µs steps with 10 ms delay) that is not in her arc or Lab 8.
6. **`servo_init()` / `servo_set()`** — invented driver names; the real files
   are `tim.c`'s `tim14_pa7_pwm_init()` / `tim14_pwm_set()` and the template's
   `updateServo()`.
7. The "insight" that "the 20 ms period is mostly dead time: the servo only
   looks at the first 1–2 ms" — plausible, unsourced; her framing ("the width
   of the pulse is conveying information") is the one to use.
8. Its `xml:id`s (`sec-servo-concepts`, `fig-servo-*`, `rq-servo-*`) are free to
   reuse or rename — nothing refs them yet (no deck exists).

### `ch-photosensors.ptx` (477 lines)

**Usable (as outline):** the reading's three beats (resistance-based sensors
family → the LDR → the divider interface); the two-loop framing in the
introduction ("closes the loop by combining the ADC driver… with the servo
driver"); the figure choices 16/3, 16/4, 16/7, 16/11–14 (with §6's caveats).

**Condemned, with the reason:**

1. **"several megaohms in complete darkness, falling to a few kilohms"** and
   Q1's "increases to several megaohms" — the hosted datasheet says dark
   resistance **min 0.2 MΩ**; "several MΩ" is Adafruit's generic "up to 10 MΩ".
   And any such sentence is **Deliverable 1** (§4) — out either way.
2. **"R ∝ E^−γ with γ ≈ 0.7 for this type of cell"** — the datasheet says
   **0.6**; her slide 5 says 0.6. Invented.
3. **"peak sensitivity near 560 nm, similar to the human eye"** — the datasheet
   says **520 nm**. (Adafruit also says 520.)
4. **"Choosing R_fixed = 10 kΩ places the midpoint in the middle of the ADC
   range… maximizing sensitivity"** — Deliverable 6's question, answered.
5. **The `solar_tracker_update()` listing with `GAIN 5`** — Deliverable 9 (10
   pts) handed over in student prose, with invented driver names
   (`adc_read_channel`, `servo_set`) and a gain that contradicts the lab's
   "K on the order of 0.01".
6. **"the nonlinearity does not matter because we only look at the difference…
   any systematic distortion cancels out"** — false as stated: a nonlinear
   response to a *difference* in illumination does not cancel; what the
   tracker relies on is *equal* readings at *equal* illumination (matched
   cells), and unit-to-unit mismatch is exactly the residual the placeholder's
   own Q4 feedback admits. Rewrite from her framing (compare, don't measure).
7. **"Verify both return reasonable codes (1000–3000) under room lighting"** and
   "steady-state error angle when the flashlight is held 10 cm to the left" —
   invented numbers, invented experiment.
8. **"Real industrial solar trackers compute the sun's position from date,
   time and GPS… no light sensor required"** — unsourced aside; the lab's own
   framing (some trackers use edge photosensors) is the one to keep.
9. The PI-control "insight" and "steady-state error whenever friction is
   significant" — beyond the course (ENGS 26 is where she sends them) and
   unsourced.
10. `fig-resistance-based-sensors` uses the 7 KB slide-6 image — check it
    renders as anything before keeping.

---

## §8 Reuse traps confirmed present in these decks

- **Williams**: Day 15 slide 2 ("Williams, Chapter 11", "pp 129-133"), slide 5
  ("See Williams, 'DC Motors' section in Chapter 14"), and Lab 8 D4 ("page 133
  of Williams"). Drop all; cite the Adafruit guide for the geometric-mean rule.
- **AVR / Arduino residue**: slide 13's speaker note (TCNT/OCR/8-bit), slide 14's
  note (Arduino pins 9/10/11), slides 24–26 notes (`TIMER1_TOP`, `TCCR1B`,
  `/1023`), slide 20's "0 to 1023", Lab 8's `OCR1A` and `V_AVR_PCx`. The
  Adafruit guide's code is Arduino (B-11e).
- **Scopy** (slide 20 note) — the ADALM2000's software; ours is Waveforms.
- **Battery box / Adafruit 830** (slides 28–29) — superseded; never "battery".
- **9 V / 7805** (slide 29, Lab 8) — her Day 12 ruling: "the regulator".
- **Lead colours disagree with each other**: slide 27 "Red/Orange → power,
  Yellow → PWM"; slide 29 "Orange ➝ power, Yellow ➝ PWM"; the SG90 sheet
  "Orange = PWM, Red = Vcc, Brown = GND"; the SG92R photo shows brown/red/orange;
  Lab 8 says "center pin is VCC, darker outer is GND, the other is PWM". The
  lab's rule is the safe one and is hers — question 6 confirms the kit's leads.
- **"Analog 0, as usual"** (slide 21) vs Lab 8 "analog channel 3" — question 3.
- **"Demonstrate to an instructor or LF"**, "Check wiring with instructor",
  "you don't need to come to tomorrow's x-hour" — classroom management (S-25);
  presenter notes only.
- **Third-party image**: slide 6's howtomechatronics cutaway carries a
  watermark and her URL credit; keep the credit line as she did.

---

## §9 Questions for Petra — sent 2026-09-02; her answers of 2026-09-03 recorded

Everything the repo cannot establish. Numbered so the plans can cite them; the
two answered items at the top of this file are not re-asked.

**Answered 2026-09-03** (her message, folded into §2, §3, §6 above):

- **Q1 → mostly answered.** The part is the **SG92R**; the Adafruit-hosted
  sheet `C17481_SG92R_datasheet.pdf` is in the repo (there is no official one,
  only https://towerpro.com.tw/product/sg92r-7/). Dead band 1 µs, stall
  torque, speed and the POM/carbon gears are sourced. **Still open, 1b:** the
  current figure — no sheet has one; the book states "a few hundred mA while
  moving, more when stalled" as hers unless she prefers no number.
- **Q2 → answered.** `Day15_servo_template.c`, `tim.c`, `tim.h` are in
  `assets/starters/`. "tim.c is updated on purpose from the previous version,
  so teach the difference." **Follow-up 2b** (below).
- **Q3 → answered.** The pot is on **A0** on Day 15 (her `towerProPot.png`
  shows A3 and she is re-exporting for A0); in the lab students work out the
  move to A3 themselves — **so the book never shows the pot on A3 or walks
  that change** (protected). **Thursday (2026-09-03): "They take the
  potentiometer out and follow the lab instructions on Thursday, so the
  photocells go on A0 and A1."** So Day 16 opens its lab work with the pot
  out, and the servo confirmation is Wednesday's, not Thursday's.
- **Q5 → moot, and mine to withdraw.** Nowhere in her slides is the servo
  powered from the Nucleo. The extracted Fritzings had lost the regulator
  board (a separate picture on the slide), so the orange lead ended at an
  empty column and I read the rail as the servo's supply. Her composites are
  right; `towerProPowering.png` is the figure.
- **Q9 → answered.** A lab already had students split their ADC code into a
  library; each student has their own `adc.c`/`adc.h`. Day 15 Part 5's split
  beat is withdrawn; her fallback line stays as one clause.

**Follow-ups of 2026-09-03 — all three answered the same day:**

- **2b → answered: fix it.** "Please fix (so that we go for 4000 counts not
  4001 - I misunderstood your question). So no re-teaching necessary." Done in
  `assets/starters/tim.c` (§2a).
- **3b → answered.** Pot out on Thursday; photocells on A0 and A1;
  `week8FullLabSetup.png` delivered (§6). The A0 re-export of `towerProPot`
  is in progress — overwrite the file, same name.
- **6b → answered.** "Students have the Tower-Pro SG92R with the brown, red
  and yellow wires, just like the one in the slides on day 15." So: **brown =
  ground, red = power (the center lead), yellow = signal.** One thing to fix
  in her two Day 15 exports when she re-exports: their legend reads "Orange →
  power"; the kit's power lead is red (flagged to her 2026-09-03).

The original list, for the record:

1. **Which servo, and where do dead band and current come from.** Deck, Lab 8
   and the kit photo say **TowerPro SG92R**; the datasheet you dropped is
   titled **SG90** (same family, 2.5 kg-cm, 0.1 s/60°, 4.8–6 V). Which name goes
   in the book, and is that sheet the one students open? It has **no dead-band
   line** — your slide 15's prescaler choice turns on "dead band 1 µs" — and no
   current figure ("250 mA while moving" is on your slide 28). May the book
   state both as your figures ("about 1 µs", "a few hundred mA while moving,
   more when stalled"), or do you have the SG92R sheet that carries them?
   *(Blocks: Day 15 Part 3's reveal text and the reading's spec paragraph.)*
2. **The three files.** `Day15_servo_template.c` and `tim.c` are recovered
   verbatim from slides 24–26 (§2); **`tim.h` is on no slide**. Please drop all
   three into `assets/starters/` so the book's listings are registered against
   the real files. And one thing to decide in `tim.c`: it writes
   `TIM14->ARR = timerMax` and `CCR1 = value-1`, where `TTmotor_ramp.c` (and
   Day 11x's passed prose, "we therefore subtract one") writes
   `ARR = PWM_TIMER_MAX-1` and `CCR1 = value`. May `tim.c` be aligned with the
   Day 11x convention, or should the book teach the difference? *(Blocks: the
   Day 15 book's Part 4 and every listing.)*
3. **Which ADC channels.** The Day 15 template reads the pot on **PA0 (A0)**
   and slide 21 says "Analog 0, as usual" — but your own Day 15 slide 30
   Fritzing (re-shown on 15x/6 and 16/10, 16/13) draws the pot's wiper on
   **A2**; Lab 8 §3 says the pot goes on "analog channel 3"; Lab 8 Figure 2
   and your Day 16 Fritzing put the two photocells on **A0 and A1**. For the
   tracker: photocells on A0 (PA0, ADC_IN0) and A1 (PA1, ADC_IN1), pot on A2
   (PA4, ADC_IN4) as drawn, or A3 (PB1, ADC_IN18) as the lab says? And which
   is right for the figure we redraw? *(Blocks: Day 15 Part 5's wiring line,
   Day 16's wiring figure and the two-channel code.)*
4. **How you want two channels read.** Lab 8 calls it "an easy two-channel
   modification" of `ADCPot.c`, but nothing in the course has read two channels
   (§2c). Two honest routes: **(A)** select both in `CHSELR` and call
   `adc_read()` twice per `start_conversion()` (the sequencer converts channel
   0 then 1, EOC after each); **(B)** an `adc_read_channel(n)` that writes
   `CHSELR` to one channel, waits for CCRDY, then converts. Do you have a
   version from a previous year, or a preference? The plan teaches it on
   Wednesday (Day 15x Part 3) so Thursday can use it — say if you would rather
   it were Thursday's or the lab's. *(Blocks: Day 15x Part 3 and Day 16 Part 2.)*
5. ~~**The wiring drawing.**~~ **Withdrawn 2026-09-03** — see above: an
   extraction artifact, not her drawing. `towerProPowering.png` is the figure.
6. **The servo's leads and its safe range.** The SG92R in your photo has brown
   / red / orange leads; your slides say "yellow → PWM"; the SG90 sheet says
   orange = PWM. Lab 8's rule (center = power, darker outer = GND, the other =
   signal) is what I will teach — confirm the kit's servos are brown/red/orange.
   And the endpoints: the sheet says ±90° at 1–2 ms, your note says "our servos
   don't go all that far", Lab 8 says stay within ±60°. What should the book
   say a student sees at 1 ms and 2 ms, and is 1–2 ms the safe range to state?
   *(Blocks: the reading's pulse-width paragraph and the Day 15x observation.)*
7. **What Thursday ends with.** Your Day 16 deck ends on "read *A Solar
   Tracker*, discuss at your table how you might implement the feedback loop."
   The plan's crucial step for Day 16 is therefore: sensors on the arm, both
   channels printing, servo still following the pot, and the loop *designed*
   (update rule, sign, bounds, T, K) — with running it in class as the stretch.
   Is that right, or do you expect the loop running before students leave?
   *(Blocks: Day 16's Part 5/6 split.)*
8. **Homework across the week.** No deck sets homework after Day 15 or 15x
   beyond the x-hour continuation; the Day 16 reading is the photocell
   material. Is there anything due Thursday (the Lab 8 photocell deliverables
   are done in class on Thursday in your arc)? *(Blocks nothing; shapes the
   Day 15 close.)*
9. **`adc.c` and `adc.h`.** The Day 15 template `#include`s `adc.h` and your
   slide 20 says "if you have previously added your adc code to the mylib
   folder you are good to go." `ch-adc.ptx` never splits `ADCPot.c` into a
   library the way `ch-uart` and `ch-i2c` do for theirs, and no `adc.h` is in
   the repo (Gate 1, continuity). Did a lab (6 or 7) already have students
   make `adc.c`/`adc.h` in `mylib`, or is Day 15 the first time? The plan
   carries the split as a five-minute beat of Part 5 either way, with your
   fallback (copy into `Src`/`Inc`). *(Blocks: Day 15 Part 5's first beats.)*

Lab 8 fixes that are yours, not the book's, noted for whenever you next touch
it: `OCR1A` → `CCR1` (§4, "before writing to OCR1A"); "page 133 of Williams";
`V_AVR_PCx` in Figure 1. ("Analog channel 3" is correct for the lab — the
pot moves there as the students' own work.)
