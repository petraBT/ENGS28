# Day 15x — Servos, continued

**Wednesday x-hour, 50 minutes** (Day Nx is a Wednesday x-hour — the
day-parity rule in `CLAUDE.md`). **No pre-class reading — x-days do not get
one.** Chapter: `source/ch-servos.ptx`. Old deck: `Day15x-Servos(2).pptx`
(6 slides, all re-shows of Day 15's 27–30). Ground truth:
`plans/week8-ground-truth.md`.

Yesterday every student proved a 1–2 ms pulse on PA7 with the AD2. Today the
servo goes on the regulator's 5 V and follows the potentiometer, and we add
the one piece of code the week still lacks: reading two ADC channels in one
program, which Thursday's photocells and Lab 8 §2 both need.

## Objectives

By the end of class a student can:

1. Wire the servo correctly and safely: power from the regulator board's 5V
   pin, ground shared with the Nucleo, the signal lead to PA7 (D11), nothing
   powered while wiring, USB first and the adapter second.
2. Confirm with the multimeter that the regulator's 5V pin reads 5 V before
   the servo is connected, and say why that check comes first.
3. Observe the servo follow the potentiometer, hold its position, and resist
   a gentle push, and connect each observation to the internal loop.
4. Read two ADC channels in one program (question 4 decides the route), and
   say what the sequencer does with two bits set in `CHSELR`.

## The CRUCIAL step

> **Every student's servo, powered from the regulator's 5 V pin, follows the
> potentiometer smoothly, and every student has read two ADC channels in one
> program.**

Scaffolding (P-2):

- The wiring is the Day 11 regulator setup with one consumer swapped: the
  motor driver's VM becomes the servo's center lead. The 5 V measurement at
  the pins (Day 12's build-order table) comes before the servo does.
- Nothing new is written for the servo: yesterday's program is still on the
  board (her slide 30).
- The two-channel change is two or three lines on `ADCPot.c`, shown as a
  predict-then-reveal with the RM's sequencer paragraph on screen, and tested
  with the second input tied to a rail so the answer is unambiguous.
- **Checkpoint at minute 28** (end of Part 2): a servo that does not move
  with the pulse verified yesterday is power (5 V at the pin? shared
  ground?) or the signal lead on the wrong pin. A servo that twitches and
  resets the board is the brown-out: the servo is on the Nucleo's rail.

## The STRETCH

Predict, then measure: with the knob at the 1.5 ms position, gently load the
arm and watch the regulator's 5V pin on the AD2 — does the supply sag when the
servo works against you? Then: what does the arm do at exactly 1 ms and 2 ms,
and how far is that from the datasheet's ±90° (question 6)?

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 2 (finish Tuesday first) | presenter note (S-25) |
| 3 (servo wiring) | Part 1 recall slide (taught Day 15 Part 6) |
| 4–5 (how to power) | Part 1 recall; the *why* was Tuesday's |
| 6 (design exercise Part 2) | Part 2, in full |
| — | **Part 3 is ours** (two ADC channels), named as an addition: Lab 8 §2 needs it, no deck teaches it |

## Activity sequence (50 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 0 | 1 | tell | Announcements |
| 1 | 5 | tell | **Where we are.** Yesterday: the pulse, verified. Today: the servo on its own supply. The wiring on one slide, recalled not re-taught: regulator 5V → center lead, GND shared, signal → PA7 (D11); unplug before wiring; USB, then the adapter (3). The order of checks from Day 12: power first, then ground, then the signal path (2) |
| 2 | 20 | do | **Design exercise, Part 2 — CRUCIAL.** Everything unplugged: regulator board on the breadboard, 5V and GND to their own rail, ground jumper to the Nucleo (4). Adapter in, multimeter on the 5V pin: 5 V before anything is connected to it (3). Servo leads: center to the 5 V rail, darker outer to ground, signal to PA7 (3). Wiring checked; USB, then adapter; the servo follows the knob (5). Observe, `room="yes"` for a sentence each: it holds where you leave the knob; push the arm gently — it pushes back; turn the knob to the 1.5 ms position — the arm centers (3). Checkpoint minute 28 (2) |
| 3 | 17 | predict → reveal → do | **Two channels.** The question: Thursday's photocells are two voltages on two pins — what does `pa0_adc_init()` need? Commit, `room="yes"`: *if `CHSELR` has both bit 0 and bit 1 set, what does `start_conversion()` + `adc_read()` return, and what happens to the second channel?* (3). Reveal with RM0490 §14.4 on screen: the sequencer converts the selected channels in number order, EOC after each, EOS at the end; so either read twice per start (route A) or select one channel per conversion and wait for CCRDY (route B) — whichever question 4 lands (5). Do: modify your Day 7 program to read A0 (the pot) and A1, A1 jumpered to 3.3 V then to GND, and print both; the second value should read near 4095 then near 0 while the first follows the knob (7). One sentence on what this becomes tomorrow (2) |
| — | 5 | tell | **Close.** Tomorrow: photocells replace the pot, on the arm of this servo. The reading is the photocell and its datasheet — read the datasheet's table, not just the page (2). Leave the servo wired; bring the tracker fixture from your kit (3) |

Total: 2+1+5+20+17+5 = **50**.

**If a part overruns:** Part 3's activity becomes a demonstration from the
front with the code on screen (−7), and the do-step is the first thing on
Thursday. **Not cuttable:** Part 2 (Lab 8 §3 is this), and Part 3's reveal —
Thursday's Part 2 assumes the sequencer fact has been said once.

**If question 4 lands "make it Thursday's" or "leave it to the lab":** Part 3
becomes 17 more minutes of Part 2 (a work session, her arc exactly) and Day
16 Part 2 gains the reveal at +5, funded from Day 16 Part 3.

## Datasheet moments (P-11)

- **Part 3**: RM0490 **§14.4, "Channel selection (CHSEL, SCANDIR, CHSELRMOD)"**
  (p. 249) and **§14.4.10 "Single conversion mode (CONT = 0)"** (p. 251), and
  the ADC_CR note on CCRDY (p. 281) — pasted, on screen for the reveal.
- **Part 2**: the regulator board's silkscreen (5V / GND / Vin) against Day 11's
  figure — a lookup on the part in hand.

## Writing room (S-2)

- Part 2: the three observations, one sentence each.
- Part 3: *what does two bits in CHSELR do?*

## Hand-offs

**Pre-class: nothing — x-day.**

**Homework:** the Day 16 reading (the photocell, the divider, the datasheet
tour). Nothing to submit (question 8).

**Day 16 needs from here:** the servo wired on 5 V and following the pot; two
channels readable; the tracker fixture in hand.
