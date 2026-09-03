# Day 15x — Servos, continued

**Wednesday x-hour, 50 minutes** (Day Nx is a Wednesday x-hour — the
day-parity rule in `CLAUDE.md`). **No pre-class reading — x-days do not get
one.** Chapter: `source/ch-servos.ptx`. Old deck: `Day15x-Servos(2).pptx`
(6 slides, all re-shows of Day 15's 27–30). Ground truth:
`plans/week8-ground-truth.md`. Gate 1 applied: `reviews/week8-gate1.md`.

Yesterday students designed and built a 1–2 ms pulse on PA7 and verified it
with the AD2 — most of them; her note says the exercise takes a long time,
and her x-hour exists to finish it. Today everyone re-verifies that pulse,
the servo goes on the regulator's 5 V and follows the potentiometer, and we
add the one piece of code the week still lacks: reading two ADC channels in
one program, which Thursday's photocells and Lab 8 §2 both need.

## Objectives

By the end of class a student can:

1. Wire the servo correctly and safely: power from the regulator board's 5V
   pin, ground shared with the Nucleo, the signal lead to PA7 (D11), nothing
   powered while wiring, USB first and the adapter second.
2. Confirm with the multimeter that the regulator's 5V pin reads 5 V before
   the servo is connected, and say why that check comes first: a wrong
   voltage there is found with nothing attached to it.
3. Observe the servo follow the potentiometer, hold its position, and resist
   a gentle push — the behavior predicted yesterday — and connect each
   observation to the internal loop.
4. Read two ADC channels in one program (question 4 decides the route), and
   say what the sequencer does with two bits set in `CHSELR`.

## The CRUCIAL step

> **Every student's servo, powered from the regulator's 5 V pin, follows the
> potentiometer smoothly, and every student has read two ADC channels in one
> program.**

Scaffolding (P-2):

- **Part 2 opens on finishing Tuesday.** Every student re-verifies the pulse
  on the AD2 before any servo lead carries it (two minutes for a working
  board; it also catches a build that regressed overnight). A student still
  in Tuesday's template spends Part 2 there, with Tuesday's ladder, and wires
  the servo when the pulse is verified — not before.
- The wiring is the Day 11 regulator setup with one consumer swapped: the
  motor driver's VM becomes the servo's center lead. The 5 V measurement at
  the pins (Day 12's build-order table) comes before the servo does, and the
  adapter comes out again before any lead is added.
- Nothing new is written for the servo: yesterday's program is still on the
  board (her slide 30).
- The two-channel change is two or three lines on `ADCPot.c`, shown as a
  predict-then-reveal with the RM's sequencer paragraph on screen, and tested
  with the second input tied to a rail, predicted first.
- **Checkpoint at minute 30** (end of Part 2), a ladder: no motion with the
  pulse re-verified → power (5 V at the pin? shared ground?) or the signal
  lead on the wrong pin; twitching and a board that resets → the brown-out,
  the servo is on the Nucleo's rail; motion that ignores the knob → the
  program on the board is not Tuesday's.
- **Decision point at minute 10:** if more than a third of the room is still
  completing Tuesday's template, Part 3 collapses to its reveal (15 → 8) and
  the do-step opens Thursday's Part 2, funded from Thursday's Part 3 (6 → 3,
  its datasheet beat only). Totals stay 50 and 110.

## The STRETCH

Predict, then measure: with the knob at the 1.5 ms position, gently load the
arm and watch the regulator's 5V pin on the AD2 — does the supply sag when the
servo works against you? Then: what does the arm do at exactly 1 ms and 2 ms,
and how far is that from the datasheet's ±90° (question 6)?

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 1 (title) | deck glue |
| 2 (finish Tuesday first) | **Part 2's first beat** — scheduling, not classroom management; her x-hour's premise |
| 3 (servo wiring) | Part 1, one pointer to Tuesday's figure and lead map (taught Day 15 Part 6) |
| 4–5 (how to power) | Part 1 pointer; the *why* was Tuesday's |
| 6 (design exercise Part 2) | Part 2, in full |
| — | **Part 3 is ours** (two ADC channels), named as an addition: Lab 8 §2 needs it, no deck teaches it (question 4) |

## Activity sequence (50 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 0 | 1 | tell | Announcements |
| 1 | 3 | tell | **Where we are.** Yesterday: the pulse, verified. Today: the servo on its own supply, wired as Tuesday's figure and lead map say (her `towerProPowering.png`: center lead to the regulator's 5V pin, ground to the shared rail, signal to PA7) — a pointer, not a retelling (2). The order of checks from Day 12: power first, then ground, then the signal path (1) |
| 2 | 24 | do | **Finish Tuesday, then wire — CRUCIAL.** Everything unplugged: the regulator board on the breadboard as in her drawing (`towerProPot.png`, pot on A0 — follow-up 3b for the export), its GND to the ground rail the Nucleo already shares (4). Adapter in, multimeter on the 5V pin: 5 V before anything is connected to it — if it is not, the fault is upstream and you find it with nothing else attached (3). **Adapter out** before the next wire (1). Servo leads: center to the regulator's 5V pin, darker outer to the ground rail; the signal lead not yet (3). USB in, AD2 on PA7: the pulse is still 1–2 ms — everyone, and a student still in Tuesday's template does Tuesday's Part 5 here instead (2). USB out; signal lead to PA7 (D11); wiring checked; USB, then adapter; the servo follows the knob (5). You predicted this yesterday — watch it happen, `room="yes"` for a sentence each: it holds where you leave the knob; push the arm gently and it pushes back; the 1.5 ms knob position centers the arm (3). Checkpoint minute 30, the ladder above (3) |
| 3 | 15 | predict → reveal → do | **Two channels.** The question: Thursday's photocells are two voltages on two pins — what does `pa0_adc_init()` need? Commit, `room="yes"`: *if `CHSELR` has both bit 0 and bit 1 set, what does `start_conversion()` + `adc_read()` return, and what happens to the second channel?* (3). Reveal, in two steps with RM0490 §14.4 on screen: first, the ADC converts the selected channels one after another in number order, EOC after each, EOS after the last — so either read twice per start (route A) or select one channel per conversion (route B), whichever question 4 lands (3); then the one new rule, pointed at on the excerpt rather than walked: after `CHSELR` changes, wait for CCRDY before starting (1). Do: modify your Day 7 program to read A0 (the pot) and A1; a wire from A1's breadboard row to the 3.3 V rail, then to GND; **predict the two raw values first**, then print both — the first follows the knob, the second reads what you predicted (6). One sentence on what this becomes tomorrow (2) |
| — | 5 | tell | **Close.** Tomorrow: photocells replace the pot, on the arm of this servo. The reading is the photocell and its datasheet — read the datasheet's table, not just the page (2). Leave the servo wired. Presenter note: bring the tracker fixture, the photocells and the alligator clips from your kit (3) |

Total: 2+1+3+24+15+5 = **50**.

**If a part overruns:** the minute-10 decision point above is the default
trigger; past it, Part 3's activity becomes a demonstration from the front
with the code on screen, and the do-step is the first thing on Thursday.
**Not cuttable:** Part 2 (Lab 8 §3 is this), and Part 3's reveal — Thursday's
Part 2 assumes the sequencer fact has been said once.

**If question 4 lands "make it Thursday's" or "leave it to the lab":** Part 3
becomes 15 more minutes of Part 2 (a work session, her arc exactly) and Day
16 Part 2 gains the reveal at +5, funded from Day 16 Part 3.

## Datasheet moments (P-11)

- **Part 3**: RM0490 **§14.4, "Channel selection (CHSEL, SCANDIR, CHSELRMOD)"**
  (p. 249) and **§14.4.10 "Single conversion mode (CONT = 0)"** (p. 251), and
  the ADC_CR note on CCRDY (p. 281) — pasted, on screen for the reveal.
- **Part 2**: the regulator board's silkscreen (5V / GND / Vin) against Day 11's
  figure — a lookup on the part in hand.

## Writing room (S-2)

- Part 2: the three observations, one sentence each.
- Part 3: *what does two bits in CHSELR do?* and the two predicted values.

## Hand-offs

**Pre-class: nothing — x-day.**

**Homework:** the Day 16 reading (the photocell, the divider, the datasheet
tour). Nothing to submit (question 8).

**Day 16 needs from here:** the servo wired on 5 V and following the pot; two
channels readable (or the do-step carried to Thursday's Part 2 by the
decision point); the tracker fixture, photocells and clips in hand.
