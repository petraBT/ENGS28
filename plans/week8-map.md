# Week 8 at a glance — Days 15, 15x, 16

The arc of the week, for judging the plans without reading the ground truth.
Source: `plans/week8-ground-truth.md`, the three decks, Lab 8. Chapters:
`source/ch-servos.ptx` (Days 15, 15x) and `source/ch-photosensors.ptx`
(Day 16) — both placeholders, neither trusted (ground truth §7).

Day plans: `plans/day15.md`, `plans/day15x.md`, `plans/day16.md`.

**Class lengths, from the day-parity rule** (stated because the 65-minute
error has been made three times): Day 15 is odd → Tuesday, **110 min**.
Day 15x is an x-day → Wednesday, **50 min**. Day 16 is even → Thursday,
**110 min**.

---

## The week

| | **Day 15** | **Day 15x** | **Day 16** |
|---|---|---|---|
| Topic | Servomotors | Servos, continued | Photosensors and the solar tracker |
| Chapter | `ch-servos.ptx` | `ch-servos.ptx` | `ch-photosensors.ptx` |
| Pre-class reading | yes — what a servo is, its internal feedback loop, the pulse-width command, the power rule | **none — x-day** | yes — the photocell, resistance-based sensors, the divider interface, the datasheet tour |
| New machinery | a second design of TIM14's period (50 Hz, sized by the dead band); TIM16 as a periodic tick; the pot→pulse map with bounds | the servo on the regulator's 5 V; **reading two ADC channels** (new code, ours — see below) | a resistive sensor in a divider; the geometric-mean rule; a feedback loop *we* write (the update rule, K, T, bounds) |
| Students **build** | their own pot-controlled 1–2 ms pulse train on PA7, verified on the AD2 against their own prediction; `adc.c`/`adc.h` in `mylib` | the servo following the pot; a two-channel readout | two photocell dividers on the tracker arm, both channels printing, the pot retired, the loop designed |
| Load lands on | design arithmetic, then a long build | wiring and hands-on | the lab's Part 1 in class, then design |
| Inherits from | Days 11/11x (TIM14 PWM, whole), Day 7 (ADC), Day 8 (periodic interrupt) | Day 15, Day 11 (the regulator), Day 7 (CHSELR) | Days 15/15x entirely; Day 7 (the divider, the ADC); Day 12 (`milliseconds()`) |

**Her ordering, and where the week deviates.** Day 15 and 16 follow her decks
slide for slide (ground truth §1). Day 15x is, in her deck, a pure work
session of Tuesday's last four slides; the plan keeps that as its first two
Parts (Part 2 opens on finishing Tuesday, which is what her x-hour is for)
and **adds one taught beat of ours** — reading two ADC channels — because
Lab 8 calls that "an easy two-channel modification" and nothing in the course
has done it (ground truth §2c, question 4). Day 16's Parts 5 and 6 are the
other addition: her deck ends on one slide, "discuss at your table how you
might implement the feedback loop", and the plan expands it into three
commits in Lab 8 §4's own notation plus the start of the build (question 7).
Both additions are named for `checker-arc-fidelity`.

### The arc in three sentences

On Tuesday students meet a motor that already contains a feedback loop, and
learn that the only thing they supply is a pulse whose width is the position
command, so the day is spent designing TIM14 for a 50 Hz pulse sized by the
servo's dead band and proving the pulse on the scope. Wednesday puts the servo
on the regulator's 5 V and watches it follow the potentiometer, then teaches
the one piece of code the week still lacks, reading two ADC channels. Thursday
replaces the potentiometer with two photocells on the servo's arm and closes
the course's biggest loop: the ADC driver from Day 7 and the servo driver from
this week become one feedback system that the students design themselves.

### Crucial steps

- **Day 15** — every student's board, running their own completed
  `Day15_servo_template.c`, produces a 50 Hz pulse train on PA7 whose width
  sweeps from 1 ms to 2 ms as they turn the potentiometer, verified with the
  AD2.
- **Day 15x** — every student's servo, powered from the regulator's 5 V pin,
  follows the potentiometer smoothly, and every student has read two ADC
  channels in one program.
- **Day 16** — every student's tracker arm carries two working photocell
  dividers whose two channels print on their screen, the servo was confirmed
  following the pot before the pot came out (her slide 14's end state has no
  pot), and the student has written down the loop's update rule with its
  sign, its bounds and its two tuning numbers (pending question 7).

Lab 8's servo section "repeats the class activity from Day 15" — so Day 15's
and 15x's crucial steps are literally the lab's §3, and Day 16's is the lab's
§2 done in class (her arc) plus the design of §4.

## What each day owes the next

```
Day 11/11x ── tim14_pa7_pwm_init(), the register map, T0 ──►  Day 15 Parts 3–4 (recall; a second design)
Day 11     ── the regulator board, two supplies one ground ──►  Day 15 Part 6, Day 15x Part 2 (xref, never re-teach)
Day 7      ── ADCPot.c, 0–4095, CHSELR ────────────────────►  Day 15 Part 5 (the pot), Day 15x Part 3 (two channels)
Day 8      ── periodic interrupt on TIM14 ──────────────────►  Day 15 Part 4 (same recipe on TIM16)
Day 12     ── milliseconds() ───────────────────────────────►  Day 15 stretch, Day 16 Part 5 (the interval T)
Day 15     ── verified 1–2 ms pulse; SERVO_MIN/MAX ─────────►  Day 15x Part 2; Day 16 Part 5 (the bounds)
Day 15x    ── servo on 5 V; two-channel read ───────────────►  Day 16 Parts 2 and 4
Day 16     ── dividers on the arm; the loop designed ───────►  Lab 8 §4 (D9), due Tue 3 Mar 2026
```

## The reading split (a Gate 1 exhibit)

- **Day 15 Before Class**: what a servo contains (her slide 6's inventory:
  motor, gears, pot, control circuit); what it does (goes to a commanded
  position and holds it — her slide 8 figure); applications in one list; our
  servo and its datasheet (P-11 — the sheet's table, the wiring figure, the
  ±90° convention with her caveat, question 6); the command is a pulse of
  1–2 ms every 20 ms (her slide 10 figure); the power rule and its reason
  (brown-out), pointing at the regulator by xref. **Must not contain**: the
  prescaler table or any PSC/ARR/CCR value (Part 3's design exercise), the
  pot→pulse map, TIM16 — **and none of Parts 1–2's reasoning** (why the gears
  trade speed for torque, what a push against the loop does, what happens
  between pulses and when they stop): those are the class's three commits,
  and a commit whose answer is a sentence in the reading is not a commit
  (Gate 1 ruling 1).
- **Day 15x**: none.
- **Day 16 Before Class**: the photocell (Adafruit/her sentences: what it is,
  inaccurate, unit-to-unit variation, log-log response); the resistance-based
  family; the divider as the interface, formula only — **the direction question
  ("brighter: V_M up or down?") stays for class**; a datasheet tour of the
  PDV-P8001 that sends students to the spectral peak, the rise and fall times,
  the sensitivity definition and the test conditions — **and never to the dark
  and illuminated resistance minimums (Lab 8 Deliverable 1)**; one paragraph on
  what a solar tracker is (Lab 8 §4's first two sentences).

## Where the two feedback loops land (a Gate 1 exhibit)

The week's idea is that there are two loops. The one **inside** the servo
(pot → error → controller → motor) is bought, and Day 15's reading teaches it
from her slide 8. The one **around** the servo (photocells → ADC → our C →
CCR1 → servo → arm → photocells) is written by the student, and Day 16 Part 5
designs it from Lab 8 §4's own wording: error e = V1 − V0, PWM(t+T) = PWM(t) +
K e(t), bounds before writing CCR1, T from `milliseconds()`, K "on the order of
0.01" — with the integer-arithmetic consequence of that K made a predict beat
(e = 50 → step 0 → a dead zone), so nobody reaches for a `float`. The loop's
**code is the lab's Deliverable 9 and never appears in student-facing text**;
a worked example lives in `<instructor>` (P-10).

## The protected list — Lab 8's deliverables

Ground truth §4 has the table. In one line: the datasheet minimums (D1), the
computed R2 and the expected voltages (D4–D6), any example readings (D7–D8),
the controller (D9) and the angle arithmetic (D10) appear in no student-facing
text, caption or screenshot.

## Week-level risks and their costs

0. **`adc.c`/`adc.h` do not exist yet** (Gate 1, continuity). The Day 15
   template `#include`s a library no chapter has taught students to make:
   `ch-adc` never splits `ADCPot.c`, and her deck's own fallback ("otherwise
   copy adc.c and adc.h into Src and Inc") is the only acknowledgment. Day 15
   Part 5 now carries the split as a named beat; question 9 asks whether a
   lab already had them do it.
1. **The files** (question 2). `Day15_servo_template.c` and `tim.c` are
   recovered verbatim from the deck; `tim.h` is not, and `tim.c`'s off-by-one
   convention differs from the driver Day 11x taught (ground truth §2a). The
   Day 15 book cannot register its listings until the files land; the plans do
   not wait.
2. **Every wiring drawing is wrong the same way** (question 5): the servo's
   rail from 3V3. The week's most important figure has to be drawn or
   delivered before Day 15's book ships its Part 6.
3. **Two-channel ADC is ours, not hers** (question 4). If she would rather it
   were the lab's, Day 15x Part 3 becomes a longer work session and Day 16
   Part 2 gains a taught beat.
4. **Day 15's design exercise "takes students a LONG time"** (her note). Part 5
   has 45 minutes and a checkpoint; Day 15x is the overflow by design.
5. **Unverified specs** (question 1): dead band 1 µs, moving current, stall
   current. The plan's Part 3 reveal is written to survive "your figure" as
   the answer, and the reading states no current number.

## Week-level cut order

Day 15 Part 6's wiring start (the x-hour has it) → Day 15x Part 3's activity
to a demonstration → Day 16 Part 3 (the sensor family) to one slide → Day 16
Part 6 shortened (the build continues in the lab). **Not cuttable:** Day 15
Part 3 (the design exercise is the day's idea) and Part 5 (crucial); Day 15x
Part 2; Day 16 Parts 2 and 5 (the lab's §2 and the design of §4).

## Hand-offs to Lab 8, checked (P-13 — constraint, not goal)

| Lab 8 asks | The week teaches it |
| --- | --- |
| §2 D1–D6: datasheet lookups, measurement, R2, expected voltages | Day 16 Part 2 does them in class (her arc); the book teaches the divider and the geometric-mean *reasoning*, never the numbers |
| §2 D7–D8: two-channel program, AD2 voltmeter, flashlight sweep | Day 15x Part 3 (the code) + Day 16 Part 2 (the use) |
| §3: PWM per Figure 3, verified; 5 V from the adapter; servo follows pot | Days 15 and 15x, verbatim (the lab says so) |
| §4 D9: the controller | Day 16 Part 5 designs it (rule, sign, bounds, T, K, integer K); the code is theirs |
| §4 D10: display the angle | untaught by design — the linear map is stated in words on Day 15; the arithmetic and the display call are theirs |

## Open flags that block content

| # | Blocks | Question (ground truth §9) |
|---|---|---|
| 1 | Day 15 Part 3 reveal, reading's spec paragraph | which servo; source for dead band and current |
| 2 | Day 15 book listings | the three files; `tim.c`'s off-by-one convention |
| 3 | Day 16 wiring figure, the two-channel code | which A-pins for photocells and pot (her own Day 15 Fritzing draws the pot on A2 while its text says A0) |
| 4 | Day 15x Part 3, Day 16 Part 2 | route (A) or (B) for two channels; Wednesday or lab |
| 5 | the week's wiring figure | a drawing with the regulator feeding the servo rail |
| 6 | Day 15 reading, Day 15x observation | lead colours; what students see at 1 ms and 2 ms |
| 7 | Day 16 Parts 5/6 | does Thursday end with the loop designed, or running |
| 8 | Day 15 close | any homework due Thursday |
| 9 | Day 15 Part 5 | do students already have `adc.c`/`adc.h` in `mylib` from a lab, or is the split new on Day 15 |
| — | Day 16 Part 5 | the two-loops figure (her slide 8 beside Lab 8 Figure 6) does not exist — hand-author before the Day 16 book |
