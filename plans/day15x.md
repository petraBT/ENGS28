# Day 15x — Servos, continued

**Wednesday x-hour, 50 minutes** (Day Nx is a Wednesday x-hour — the
day-parity rule in `CLAUDE.md`). **No pre-class reading — x-days do not get
one.** Chapter: `source/ch-servos.ptx`, `sec-servo-day15x`. Old deck:
`Day15x-Servos(2).pptx` (6 slides, all re-shows of Day 15's 27–30). Ground
truth: `plans/week8-ground-truth.md` (Day 15x Gate 0 at its end). Gate 1
applied: `reviews/week8-gate1.md`; **re-checked 2026-09-05 against the
passed Day 15, below.**

Yesterday students designed and built a 1–2 ms pulse on PA7 and verified it
with the AD2 — most of them; her note says the exercise takes a long time,
and her x-hour exists to finish it. Today everyone re-verifies that pulse,
the servo goes on the regulator's 5 V and follows the potentiometer, and we
recall the two-channel ADC read the class did in Lab 5, which Thursday's
photocells and Lab 8 §2 both use.

## Objectives

By the end of class a student can:

1. Wire the servo correctly and safely: power from the regulator board's 5V
   pin, ground shared with the Nucleo, the signal lead to PA7 (D11), nothing
   powered while wiring, USB first and the adapter second.
2. Confirm with the multimeter that the regulator's 5V pin reads 5 V before
   the servo is connected, and say why that check comes first: a wrong
   voltage there is found with nothing attached to it.
3. Observe the servo follow the potentiometer, hold its position, and turn
   through less than the convention's 180°, and connect each observation to
   the design (the 1.5 ms center, the step size) and to the internal loop.
4. Say how the two-channel ADC read from Lab 5 applies to Thursday: one
   photocell divider's node on each channel, the channel-select call made
   twice per sampling interval, nothing new to write.

## The CRUCIAL step

> **Every student's servo, powered from the regulator's 5 V pin, follows the
> potentiometer smoothly.**

Scaffolding (P-2):

- **Part 2 opens on finishing Tuesday.** Every student re-verifies the pulse
  on the AD2 before any servo lead carries it (two minutes for a working
  board; it also catches a build that regressed overnight). A student still
  in Tuesday's template spends Part 2 there, with Tuesday's ladder, and wires
  the servo when the pulse is verified — not before.
- The wiring is the Day 11 regulator setup with one consumer swapped: the
  motor driver's VM becomes the servo's center lead. The 5 V measurement at
  the pin's row (Day 12's build-order table) comes before the servo does, and
  the adapter comes out again before any lead is added.
- Nothing new is written for the servo: yesterday's program is still on the
  board (her slide 30).
- The two-channel read is recall — Lab 5's `adc_setChannel()` (Petra,
  2026-09-03) — so Part 3 is five minutes of pointing plus a paper plan.
- **Checkpoint at about minute 34**, inside the follow beat and before the
  observations, a ladder: no motion with the pulse re-verified → power (5 V
  at the pin's row? the board's GND wire to the rail?) or the signal lead on
  the wrong pin; twitching and a board that resets → the brown-out, the
  servo's red lead is on the Nucleo's rail; motion that ignores the knob →
  the program on the board is not Tuesday's, or the wiper is off A0.

## The STRETCH

Predict, then measure: AD2 channel 2 (blue) on the row of the regulator's 5V
pin, channel 1 still on the signal row; sweep the knob and watch the 5 V while
the servo moves (question 11). Then: leave the servo powered and stop turning
the knob; the pulse is still there and the arm still holds. What would you
expect the arm to do if the pulses stopped and the 5 V stayed, from what the
reading said, and how would you show it without breaking the power-down
order?

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 1 (title) | deck glue |
| 2 (finish Tuesday first) | **Part 2's first sentence**, her words — scheduling, not classroom management; her x-hour's premise |
| 3 (servo wiring; UNPLUG POWER before making any changes) | Part 1: the unplug rule is stated here (moved from Day 15 by Petra, 2026-09-05); the lead map is a pointer to `fig-servo-powering` (Day 15 Part 6) |
| 4–5 (how to power) | Part 1 pointer; the *why* was Tuesday's; the power-up order (USB, then the adapter) is stated here |
| 6 (design exercise Part 2) | Part 2, in full, with her `towerProPot.png` as `fig-servo-pot-wiring` |
| — | Part 3 (five minutes) is a recall of Lab 5's two-channel read — a pointer toward Thursday, not an addition |

## Activity sequence (50 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 0 | 1 | tell | Announcements |
| 1 | 3 | tell | **Two rules for wiring the servo.** Where each lead goes is Tuesday's figure and lead map (`fig-servo-powering`: red center lead to the row of the regulator's 5V pin, brown to the shared ground rail, orange to D11 (PA7)) — a pointer, not a retelling (1). The two rules, stated here for the first time: unplug power before any change to the wiring, with the reason (a wire landing on a live 5 V row makes its fault at the moment of contact; unpowered, a wrong wire is only a wrong wire); and the power-up order, USB first so the STM32C031C6 is running and its pins are at defined levels before the servo has power, then the adapter (2) |
| 2 | 34 | do | **Design exercise: the servo follows the potentiometer — CRUCIAL.** Her premise first, in her words: if you did not finish Tuesday's design exercise, complete that first (Tuesday's ladder applies). Everything unplugged: the regulator board on the breadboard as in `fig-servo-pot-wiring`, its GND to the ground rail the Nucleo already shares; the pot stays on A0 (4). Adapter in and nothing else: multimeter on the 5V pin's row, 5 V before anything is connected to it — if not, the fault is upstream and you find it with nothing attached. **Adapter out** (3). USB in, AD2 on PA7: the pulse still sweeps 1–2 ms — everyone; a student still in Tuesday's template does Tuesday's build here instead. USB out (10). Servo leads, nothing powered: brown to the ground rail, red to the 5V pin's row, orange to D11 through a breadboard row; wiring checked (5). USB, then the adapter; the servo follows the knob. **Checkpoint at about minute 34**, inside this beat, the ladder above; the student symptom list (no numbers) is in the text ahead of the instructor block (7). Observations, `room="yes"`: the 1.5 ms knob position and the arm's center, the total travel against the convention's 180° (question 12); the knob turned slowly, the arm's smallest step against `pwm_value` and the design's step size (5) |
| 3 | 5 | tell → plan | **Two channels, from Lab 5.** Thursday's photocells are two voltages on two pins, A0 (PA0) and A1 (PA1); Table 12 gives the channel numbers. In Lab 5 your library gained a channel-select function and you moved between the pot and the TMP235 with it; two channels per sampling interval is that call twice, each followed by a conversion (3). On paper: yesterday's loop changed to read both, with your own function names — nothing to build today. Where the two numbers go is the loop we'll design on Thursday (2) |
| — | 5 | tell | **Close.** Tomorrow: photocells replace the pot, on the arm of this servo. The reading is the photocell and its datasheet. Leave the servo wired. Presenter note: bring the tracker fixture, the photocells and the alligator clips from your kit (5) |

Total: 2+1+3+34+5+5 = **50**. Part 2's beats: 4+3+10+5+7+5 = 34. Part 3's:
3+2 = 5.

**If a part overruns:** Part 3 to one sentence in the close (−4), then the
close to two (−3). **Not cuttable:** Part 2 (Lab 8 §3 is this, and her
x-hour is for finishing it).

## Gate 1 re-check against the passed Day 15 (2026-09-05)

Day 15 has been through Petra's hand twice since Gate 1 (pass 1, 2026-09-04;
pass 2 on the deck, 2026-09-05). What changed that this plan leans on: Part 5
is 49 minutes (from 45 at Gate 1, 51 after Gate 2), the push against the horn
is hypothetical and never done on a servo, the UNPLUG rule and the power-up
order moved from Day 15 Part 6 to this day, and both wiring exports are hers
with the pot on A0. Each Day 15x finding, and its state now:

| Finding (reviewer) | State |
| --- | --- |
| No minute for finishing Tuesday (arc-fidelity MAJOR, logistics BLOCKER, anxious BLOCKER) | **applied and live**: Part 2 opens on her slide 2, in her words, and the pulse re-verification is universal (10 min). The minute-10 decision point that collapsed Part 3 is **void**: Part 3 is already the five-minute recall (Petra, 2026-09-03), so there is nothing left to collapse and nothing moves to Thursday |
| Part 1 retells the wiring rule (cognitive-load MAJOR, census row 1) | **applied, with one change**: the lead map is a pointer to `fig-servo-powering`; the unplug rule and the power-up order are **new statements here**, not a retelling, because Day 15 no longer carries them (Petra, 2026-09-05) |
| Checkpoint at the block's end, no runway (cognitive-load MINOR) | **live and now fixed**: the checkpoint is inside the follow beat at about minute 34, with the observation beat, Part 3 and the close after it |
| Unplug step implied, not written (logistics MAJOR) | **applied**: the adapter comes out after the 5 V check and USB comes out after the pulse check, each its own sentence; the rule itself is Part 1 |
| Three-lead wiring not doubled (logistics MAJOR) | **applied**: Part 2 = 34 |
| Day 15x → 16 recovery uncosted (logistics MAJOR) | **void**: Part 3 has no do-step to move |
| EOC/EOS/CCRDY in one reveal; the A1 jumper (cognitive-load MAJOR, MINOR) | **void**: Part 3 no longer teaches the sequencer; the RM excerpt stays in ground truth §2c |
| "Push the arm, it pushes back" a third time (active-learning MINOR) | **superseded**: the push is never done on a servo (Petra, pass 1). The observation beat now measures the center, the travel and the step size instead, none of which Tuesday answered |
| Wrong rail in every drawing (anxious BLOCKER, weak-circuits BLOCKER) | **withdrawn** (erratum): her exports are the figures |
| Objective 2 promises a reason the script lacks (weak-circuits MAJOR) | **applied**: the 5 V check carries its reason in the task |
| Predict A1's raw values (AI-reliant MINOR) | **void**: no A1 do-step |
| "This is why you verify on the scope first" (anxious MINOR) | **applied on Day 15** (`sl-day15-safety`, Part 5's first sentence); not repeated here (B-8) |

The one open Gate 1 clock item, the checkpoint runway, is closed by the
table above; nothing else in the report is still live for this day.

## Datasheet moments (P-11)

- **Part 2**: the regulator board's silkscreen (5V / GND / Vin) against Day 11's
  figure — a lookup on the part in hand.
- **Part 3**: STM32C031C6 datasheet Table 12, *Pin assignment and
  description*: A0 is PA0, ADC_IN0, and A1 is PA1, ADC_IN1.

## Writing room (S-2)

- Part 2: the observations, one sentence each.
- Part 3: the two-channel loop on paper.

## Hand-offs

**Pre-class: nothing — x-day.**

**Homework:** the Day 16 reading (the photocell, the divider, the datasheet
tour). Nothing to submit (question 8).

**Day 16 needs from here:** the servo wired on 5 V and following the pot; the
two-channel plan from Lab 5 at hand; the tracker fixture, photocells and
clips in hand.
