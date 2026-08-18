# Day 11x — ground truth

Gate 0 for Day 11x. Chapter `source/ch-motors.ptx`, new `<section>` at the
placeholder near the end. Day 11 is finished and passed; **do not touch it.**

**Day 11x is a Wednesday x-hour: 50 minutes.** (`CLAUDE.md`: `Nx` = Wednesday,
50 min.) **There is no pre-class reading** — Petra, 2026-08-18.

---

## 1. The driver — `assets/starters/TTmotor_ramp.c`

In the repo, added by Petra 2026-08-18. 173 lines. It is the authority (B-6);
every listing in the book is copied from it, never retyped.
`scripts/check_starters.py` verifies the match once the book quotes it.

Structure:

| Lines | What |
| --- | --- |
| 1–13 | Header comment. Pin map: `AIN1 → PA5`, `AIN2 → PA6`, `PWMA → PA7` |
| 15 | `// trying 50 Hz` — a stray scratch line. **Do not copy into a listing.** |
| 25–26 | `PSC_FACTOR 6`, `PWM_TIMER_MAX 1250` — the active constants |
| 28–29 | The commented-out 50 Hz pair — **see the discrepancy below** |
| 38–121 | `main()` — ramp state machine, direction bits, brake-before-reverse |
| 123–130 | `tim14_pwm_set()` — clamp, then `TIM14->CCR1 = value` |
| 133–173 | `tim14_pa7_pwm_init()` — the whole init sequence |

**The active timing agrees with what Day 11 already teaches**: 12 MHz ÷ 6 =
2 MHz, ÷ 1250 = 1.6 kHz, and `PSC = PSC_FACTOR-1 = 5`, `ARR = PWM_TIMER_MAX-1 =
1249`. Nothing to reconcile.

**Every symbol the driver uses is real** — checked against
`assets/starters/ES28.h`: `GPIO_OUTPUT 1`, `GPIO_ALTERNATE 2`, `GPIO_AF4 4`,
`TIM_OC1_PWM1 6`, `TIM_CC1_OUTPUT 0`, `delay_ms()`.

### Two discrepancies in her file — questions, not edits

**(a) The commented-out 50 Hz pair does not give 50 Hz as written.** Lines 28–29:

```c
//#define PSC_FACTOR	12		    // 12 MHz / 120 = 100 KHz
//#define PWM_TIMER_MAX	  2000		// 100 KHz / 2000 = 50 Hz with prescale 120
```

The two comments say **120** and are arithmetically right: 12 MHz ÷ 120 =
100 kHz, ÷ 2000 = 50 Hz. The `#define` says **12**, which gives 12 MHz ÷ 12 =
1 MHz, ÷ 2000 = **500 Hz**, ten times too fast. So the define looks like a typo
for `120`.

This matters more than a stray comment would, because Day 11's stretch
(`task-day11-stretch-lowfreq`) asks students to predict what changes at 50 Hz,
and the prompt's plan for this day is that they uncomment these two lines and
*hear* it. Uncommented as written they would hear 500 Hz. **Left alone pending
her answer** — it is her file and a number (working rules).

**(b) The `value < 0` branch in `tim14_pwm_set()` is unreachable.** Lines 123–129
take a `uint16_t`, so `value < 0` is never true. The function is still *safe* —
a negative `int16_t` converts to a large `uint16_t` and the first branch clamps
it — and `main()` only ever passes `abs(counter_new)`. So this is dead code, not
a bug. Worth knowing before it is projected, because a student reading it
carefully will ask.

---

## 2. Her deck — `assets/ClassSlidesOLD/Day11x-Motors(2).pptx`, 21 slides

Mined arc:

| Slides | What |
| --- | --- |
| 1 | Title |
| 2–4 | Review: H-bridge sets direction, PWM sets speed; "Our motor controller setup" (TB6612 breakout, motor power / direction+PWM controls / logic power labelled) |
| **5–7** | **"Writing code for PWM" — the central activity.** 5 asks, 6 is the same slide with answers, 7 is the references |
| 8–9 | RM0490 Figure 176 (capture/compare ch 1 main circuit) and Figure 177 (output stage), annotated |
| 10 | `TTmotor_ramp.c` — the two core PWM functions |
| 11–12 | Register bit-fields: CCMR1 in output-compare mode, CCER, EGR, CR1 |
| 13 | The TIM14 register map (CNT / PSC / ARR / CCR1) annotated |
| 14–15 | `TTmotor_ramp.c` — brake-before-reverse, and `abs()` on the bipolar ramp |
| 16 | PWM resolution: minimum pulse width T₀ = T_p / `PWM_TIMER_MAX` |
| 17–21 | Motor speed sensing — optical incremental sensor, photointerrupter on the scope, table discussion, decoding pulses to position/velocity |

### Her slide 5/6 answers, verbatim

| Question | Answer |
| --- | --- |
| Which data sheet do we need to dig into? | Reference Manual |
| Enable clock access to the pin? | `RCC_IOPENR` |
| Make the pin a pwm pin? | `GPIOA_MODER`, `GPIOA_AFR[0]` |
| Enable clock access to Timer 14? | `RCC_APBENR2` |
| Set the prescaler? | `TIM14_PSC` |
| Set the top (autoreload) value of the counter? | `TIM14_ARR` |
| Set pwm mode, pin high→low on compare match? | `TIM14_CCMR1` |
| Enable the TIM14_CH1 in output mode? | `TIM14_CCER` |
| Enable the timer? | `TIM14_CR1` |
| **What register controls the speed of the motor?** | **`TIM14_CCR1`** |

Her references slide (7): *Williams, Chapter 10, pp 199–206* (start of chapter to
"Initializing Timers"); *Reference Manual, Section 17.3.8*.

### The two traps, both confirmed

**Slide 8's speaker notes are stale and describe an ATmega** — Timer 0/1/2,
`ICR1`, `OCR1A`, *"Timers 0 and 2 always count to 255."* That is the previous
version of the course. **Mine them for the teaching only** — period fixed, high
time varies, duty × supply = average voltage, the counter compares continuously,
"if you want to change the duty cycle you simply write a new value" — and drop
every register name. The STM32C031C6 facts are on the slide face and in the
driver.

**Slide 21's notes describe Day 12**, not this day (*"Tomorrow in class…"*):
voltmeter/scope on the PWM, then wire the photointerrupter, count pulses, convert
to rpm, display on the 7-segment, potentiometer as a throttle. Use as the
hand-off, not as content.

---

## 3. Reference-manual citations — all verified against the PDF

Checked in `assets/stm32c031_rm.pdf` (825 pages) by text extraction, not from
memory (P-11):

| Citation | Verified |
| --- | --- |
| §17.3.8 *PWM mode* | RM PDF page 479. Chapter header reads "General-purpose timers (TIM14)". Text confirms `0110` = PWM mode 1, `0111` = PWM mode 2 |
| §17.4 *TIM14 registers* | RM PDF page 482 |
| Figure 176, *Capture/compare channel 1 main circuit* | RM PDF page 476, inside the TIM14 chapter |
| Figure 177, *Output stage of capture/compare channel (channel 1)* | RM PDF page 476, same chapter |
| Figure 165, *General-purpose timer block diagram (TIM14)* | RM page 468 — this is the Day 11 slide-25 diagram that was dropped and belongs here |

**A trap worth teaching, not hiding.** RM0490 prints Figure 177 *inside the TIM14
chapter* but labels the register **`TIM1_CCER`** — three times — and
**`TIMx_CCMR1`**. Confirmed by extraction: `TIM1_CCER` ×3, `TIM14_CCER` ×0. ST
reused the TIM1 artwork. Students writing `TIM14->CCER` from the driver will see
`TIM1_CCER` on the projected figure. Her slide reproduces the manual faithfully;
the caption should name the mismatch rather than quietly crop it.

---

## 4. What Day 11 already did — do not repeat

`act-day11-pwm` (source ~866) already covers, and it is passed:

- **PA7 → `TIM14_CH1`, AF4**, looked up in the STM32C031C6 datasheet Table 12, p. 30;
- **the `MODER` / `AFR` operations** that hand the pin to the timer;
- **the prescaler and auto-reload arithmetic** for 1.6 kHz in 1250 steps.

Its homework: *work through `TTmotor_ramp.c` with RM0490 §17.3.8 and §17.4 open.*

**Consequence for her slide 5.** Two of its ten questions — "make the pin a pwm
pin" and the two timing registers — are Day 11 recall, not new work. The new
questions are the clock-enable pair, `CCMR1`, `CCER`, `CR1`, and the punchline
`CCR1`. The activity should say so, so the room spends its minutes on the
registers Day 11 deliberately deferred (`plans/day11.md`: *"The register-level
walkthrough of the code is **not** taught here — that is Day 11x."*)

**Also inherited:** Day 11's Gate 1 arc check found her Day 11 slide 25 — the
annotated RM0490 TIM14 block diagram (Figure 165) — was dropped from Day 11
without a decision. It belongs here as the opener that joins Day 11's abstract
counter-compare picture (`fig-pwm-counter-compare`) to the registers this day
writes.

**Overlap to watch:** her slide 16 (PWM resolution, T₀ = T_p / `PWM_TIMER_MAX`)
is the same idea as Day 11's *optional* stretch `task-day11-stretch-resolution`.
Different day, so no P-16 violation, but it should be framed as making the
stretch question everyone's, not as new material.

---

## 5. Structural convention — checked, not assumed

Opened the sibling x-days:

- `ch-debugging.ptx` (7x): one section, `sec-debug-inclass`, titled "Day 7x
  In-Class: Debugging Tips and Tools". **No Before Class section.**
- `ch-io-datasheets.ptx` (5x): one section, `sec-datasheets-inclass`. **No Before
  Class section.**
- `ch-i2c.ptx` (9x): `sec-i2c-day9x`, subsections `subsec-day9x-*`. **No Before
  Class section** (the Before Class in that file belongs to Day 10).

So Day 11x follows Day 11's own naming: `<section xml:id="sec-motors-day11x">`,
title `Day 11x In-Class: …`, subsections `subsec-day11x-*`, activities
`act-day11x-*`, instructor answers `inst-day11x-*`, slides `sl-day11x-*`.

---

## 6. Figure manifest (P-12)

Composites rebuilt with `pptx_annotate.py --max-text 200` and **looked at**.

One methodology note, because it nearly produced a wrong manifest: `qlmanage`
forces every thumbnail to a square and silently crops wide figures. Two composites
were read as "cropped on the right" when the composite was fine and the rasterizer
was not. Render with headless Chrome at the SVG's declared `viewBox` size instead.

| Her slide | Image | Decision |
| --- | --- | --- |
| 3 | voltage → speed (3 separate pictures, **no** annotation shapes) | **Drop.** Day 11 teaches this in full; recall it in prose and `refPage` `fig-pwm-waveform` if a slide needs it |
| 4 | "Our motor controller setup" — breadboard + Nucleo + TB6612 + motor, 12 annotation shapes | **Rebuilt, clean and complete.** But Day 11 already has `fig-tb6612-wiring-2`. Compare the two; use hers only if it shows something Day 11's does not, else `refPage` Day 11's |
| **8** | **RM Fig 176, capture/compare ch 1 main circuit.** 12 shapes: "CCR1 determines THIGH", "TIM14_ARR determines TPERIOD", "Output Mode", "To PWM", "Counter" | **Rebuild — core figure of the day.** One real defect: her left label "TIM14_ARR determines TPERIOD" does not wrap in the composite and overruns into the diagram's own Counter box. Needs the wrap restored by hand, or her original |
| **9** | **RM Fig 177, output stage.** 6 shapes: "From previous pg", "Output enable" (boxing CC1E), "PWM" | **Rebuilt, clean.** Caption must name the `TIM1_CCER` mislabel (§3 above) |
| 11 | CCMR1 bit-field in output-compare mode + her code beside it (3 pictures) | Rebuild; not yet inspected — do before Gate 2 |
| 12 | CCER, EGR, CR1 bit-fields (6 pictures, no overlapping shapes listed) | Raw extraction likely sufficient; verify legibility at projection size |
| **13** | **TIM14 register map** — CNT / PSC / ARR / CCR1 rows, 7 shapes: "Prescaler – counting rate", "determines TPERIOD", "determines THIGH" | **Rebuilt, clean and complete** |
| **16** | **PWM resolution** — pulse train, "Minimum pulse width, T0 = Tp/PWM_TIMER_MAX", "Pulse period, Tp" | **Rebuilt, clean and complete.** Use as-is |
| 18 | Optical incremental sensor — Adafruit 3985 / 3782, 3 photos | Depends on the scoping decision (§7). If speed sensing closes the day, one photo |
| 19 | Photointerrupter on the scope, 30 → 180 rpm | Same. Strong hook if a closing motivation slide survives |
| — | **RM Fig 165, TIM14 block diagram** (her Day 11 slide 25, dropped) | **Needed as the opener.** Source it from the Day 11 deck, not this one |

**Figures I may need from her:** the slide-8 original, if restoring the label wrap
by hand does not match what she projected.

---

## 7. The scoping decision for Gate 1 — her 21 slides do not fit 50 minutes

Recommendation, to be confirmed at Gate 1 with `checker-arc-fidelity` reporting:

| Part | Her slides | Minutes |
| --- | --- | --- |
| Opener: from Day 11's counter-compare picture to the real timer | Day 11 sl. 25 (RM Fig 165), brief recall of 2–4 | 6 |
| **Part 1 — which register does each job** (the central activity) | 5, 6, 7 | 15 |
| Part 2 — reading the bit-fields: name → value | 11, 12, 13 | 12 |
| Part 3 — the code, `TTmotor_ramp.c` | 10, 14, 15 | 12 |
| Close — resolution, and what Thursday is | 16, + one motivation slide | 5 |
| | | **50** |

**What has no room, and why.** Slides **17–21**, motor speed sensing. It is a
second topic, it is where Day 12 begins, and her own slide-21 speaker note
describes it as *"Tomorrow in class."* Day 12 is a Thursday, 110 minutes.

Concretely: **slides 20 and 21** (the table discussion, and the decoding
arithmetic Δθ = 2π / #slots) **move wholly to Day 12**; **slides 17–19** collapse
into **one closing motivation slide** — the slotted wheel and the scope trace —
costing about two minutes and buying the hand-off her note asks for.

Slides 8 and 9 both survive: 8 is where `CCR1` and `ARR` live, 9 is where `CCER`
lets the pin out, and Part 1's activity names both registers.

---

## 8. Downstream

**Lab 6** (`assets/Labs/`) is the constraint (P-13) — her slide 15 note: *"Need to
study this for lab 6."* Day 12 continues into the full Lab 6 build. Check the Lab 6
PDF before Gate 1 closes.

---

## 9. Questions for Petra

Sent 2026-08-18. Everything not depending on these is proceeding.

1. **The commented-out 50 Hz pair** (§1a): should `PSC_FACTOR` there be **120**
   rather than `12`? As written the two lines give 500 Hz, and the comments beside
   them say 120. If you confirm, do you want the fix in `TTmotor_ramp.c` itself, or
   left as-is and handled in the book?
2. **The scoping decision** (§7): does moving slides 20–21 to Day 12, and keeping
   17–19 as a single closing motivation slide, match how you actually run this
   class? Or does speed sensing leave Day 11x entirely?
3. **Your slide 4** ("Our motor controller setup"): Day 11 already projects
   `fig-tb6612-wiring-2` for the same wiring. Is there something in slide 4 you
   want that Day 11's figure does not show, or should Day 11x just point back?
4. **The `TIM1_CCER` mislabel on RM Figure 177** (§3): happy for the caption to
   name it as ST's own inconsistency, so students are not thrown when the figure
   and the code disagree?
5. **Your slide 16** overlaps Day 11's optional stretch on PWM resolution. Fine to
   teach it to everyone here, as the answer to the question only some of them
   reached?
