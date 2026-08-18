# Day 11x — session prompt

Read `plans/CHAPTER-GENERATION-PROMPT.md` first, then this file. This day runs the
**pilot ordering** (`CHAPTER_PROCESS.md`, Steps 3′ and 4′), so the deviations from
the standard workflow are deliberate and are listed below.

---

## The three facts that must not be re-derived

1. **Day 11x is a Wednesday x-hour: 50 minutes.** From `CLAUDE.md`'s standing
   facts — `Nx` = Wednesday, 50 min. Write the number *and the rule* on its own
   line at the top of `plans/day11x.md`. Day 11's plan was built to ~66 minutes
   against a real 110 and that one wrong premise thinned every Part in the
   chapter; a 50-minute class is genuinely short, so the budget decides the scope
   rather than the other way round.
2. **There is no pre-class reading for this day.** Petra, 2026-08-18. So B-1's
   chapter skeleton does not apply here, and delivery 1 is the in-class skeleton
   alone. Do not invent a reading to fill the slot, and do not move in-class
   material into one.
3. **The chapter already exists.** `source/ch-motors.ptx` holds Day 11, finished
   and passed. Day 11x is a new `<section>` in the same file, at the placeholder
   comment near the end. Do not touch the Day 11 sections.

## The pilot ordering, concretely

**Delivery 1 — the student-facing half.** Subsections, figures, `<activity>`
blocks with their `<instructor>` answers, `<slide>` blocks, and
`assets/decks/day11x.json`. **No connecting prose.** Gate 2′ reviews it; then
Petra passes it.

**Delivery 2 — the in-class prose**, written from the slides she passed, each
paragraph expanding the slide beside it. Gate 1.5 (the voice probe) runs on the
first subsection *before* the rest is written. Gate 3′ then reviews it.

The failure mode this ordering has is prose that reads like expanded bullets. Her
register is plain and explanatory and often *longer* than what it replaces — the
slide is the skeleton, not the target.

Record the two pilot numbers in `reviews/day11x-pilot.md` as you go: how many
review rounds she spends, and what fraction of her notes are *"this isn't what I
teach"* versus *"this doesn't read right."*

## Step 0 — ground truth, before anything else

- **Recover `TTmotor_ramp.c` into `assets/starters/`.** It is the day's driver and
  it is **not** in the repo. Its text is in `plans/day11-ground-truth.md` §2, and
  her Day 11x slides 10, 14 and 15 carry the core functions. B-6: the code in the
  book is the real driver's code — do not reconstruct it from memory. Once it is
  a file, `scripts/check_starters.py` will verify the book's listing against it.
- **Write the figure manifest** (`plans/day11x-ground-truth.md` §6): every image
  in her deck, and for each a decision — rebuilt with annotations / used raw /
  hand-authored / dropped and why. P-12 existed on Day 11 and was skipped, and
  skipping it looked identical to doing it.

## Her deck — `assets/ClassSlidesOLD/Day11x-Motors(2).pptx`, 21 slides

The arc, mined:

| | |
| --- | --- |
| 2–4 | Review: H-bridge sets direction, PWM sets speed. "Our motor controller setup" — the TB6612 breakout, with motor power / direction+PWM controls / logic power labelled |
| **5–7** | **"Writing code for PWM" — the day's central activity**, and slide 6 is the same slide with the answers. Which datasheet; then which register for each of: clock to the pin, pin to PWM mode, clock to TIM14, prescaler, auto-reload, PWM mode with high→low on compare match, enable CH1 output, enable the timer — and finally *which register controls the speed*. Answers: `RCC_IOPENR`, `GPIOA_MODER` + `GPIOA_AFR[0]`, `RCC_APBENR2`, `TIM14_PSC`, `TIM14_ARR`, `TIM14_CCMR1`, `TIM14_CCER`, `TIM14_CR1`, `TIM14_CCR1`. Slide 7 is the references |
| 8–9, 13 | The TIM14 PWM channel-1 block diagram: `CCR1` sets T_HIGH, `ARR` sets T_PERIOD, prescaler sets the counting rate, V_avg = VM × T_HIGH / T_PERIOD |
| 10, 14, 15 | `TTmotor_ramp.c` walked through — `tim14_pa7_pwm_init()`, `tim14_pwm_set()`, brake-before-reverse, and `abs()` on the bipolar ramp |
| 11–12 | The register bit-fields: CCMR1 in output-compare mode, CCER, EGR, CR1 |
| 16 | PWM resolution: minimum pulse width T₀ = T_p / `PWM_TIMER_MAX` |
| 17–21 | **Motor speed sensing begins** — the optical incremental sensor (slotted wheel, Adafruit 3985/3782), the photointerrupter on the scope, a table discussion (detect edges → rpm → can you get direction?), and decoding pulses to position/velocity |

### Two traps in that deck

**Slide 8's speaker notes are stale and wrong for this course.** They describe an
**ATmega**: Timer 0/1/2, `ICR1`, `OCR1A`, *"Timers 0 and 2 always count to 255."*
That is the previous version of the course. The STM32C031C6 facts are on the slide
itself and in `TTmotor_ramp.c`. Mine the notes for the *teaching* — period fixed,
high time varies, duty × supply = average voltage, counter compares continuously —
and drop every register name in them.

**Slide 21's notes describe Day 12, not this day** (*"Tomorrow in class…"*). Use
them as the hand-off, not as content.

## What Day 11 already did — do not repeat it

Day 11 is passed and its activity `act-day11-pwm` **already covers the paper
lookup**: PA7's alternate function from datasheet Table 12 (`TIM14_CH1`, AF4), the
`MODER`/`AFR` operations that hand the pin to the timer, and the prescaler and
auto-reload arithmetic for 1.6 kHz in 1250 steps (PSC 5, ARR 1249). Its homework is
*"work through `TTmotor_ramp.c` with RM0490 §17.3.8 / §17.4 open."*

So Day 11x starts from a class that has already worked out the pin and the timing.
Her slides 5–6 are the *register-naming* activity, which is a different question —
and the rest of the day is the code and the bit-fields, which Day 11 deliberately
deferred (`plans/day11.md`: *"The register-level walkthrough of the code is **not**
taught here — that is Day 11x."*).

**Also inherited:** Day 11's Gate 1 arc check found her Day 11 slide 25 — the
annotated RM0490 TIM14 block diagram — was dropped from Day 11 without a decision.
It belongs here, as the opener that joins Day 11's abstract counter-compare picture
to the registers this day writes.

## The scoping decision to take to Gate 1

**Her 21 slides do not fit in 50 minutes.** The PWM code (2–16) and the start of
speed sensing (17–21) are two topics, and the second is where Day 12 continues.
Decide it at Gate 1, with `checker-arc-fidelity` reporting, and **record the
decision rather than letting the overflow happen silently**: either speed sensing
moves wholly to Day 12, or slides 17–21 become a short closing motivation with the
work in Day 12. Say which of her slides has no room, and why.

## Two live defects in Day 11 you may be asked to fix

Found by `checker-arc-fidelity` after Day 11 was passed; reported to her, not
applied, because she had declared the day done. Ask before touching them.

- **`ch-motors.ptx:783–790` is condensed by no slide.** It says STBY must be HIGH
  and is pulled up on our breakout. Nothing on the wall says so, yet
  `act-day11-truth-table`'s projected introduction says *"with STBY HIGH
  throughout"* and `inst-day11-truth-table` explains the pull-up **in the answer**.
  Two bullets on `sl-day11-truth-table` fixes it.
- **The Day 10 dimming recall** is a bullet on `sl-day11-pwm-idea` but is in no
  paragraph of the book, so the deck teaches something the book does not.

## Standing reminders

- Her wording wins over any reviewer's and over anything in this file.
- **Stop the preview servers before `build-all`** — a running `http.server` holds
  `output/` and the build fails with `rm: Directory not empty`.
- Read `AUTHORING-visual.md` before laying out any slide that carries a figure, a
  formula, a table or a legend. Day 11 lost four rounds there.
- Day 11 sits on `main`, unpushed, along with the authoring changes made after it.
