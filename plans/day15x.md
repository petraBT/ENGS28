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
recall the two-channel ADC read the class has done before, which Thursday's
photocells and Lab 8 §2 both use.

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
4. Say how the two-channel ADC read they have written before applies to
   Thursday: one photocell divider's node on each channel, nothing new to
   write.

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
  the pins (Day 12's build-order table) comes before the servo does, and the
  adapter comes out again before any lead is added.
- Nothing new is written for the servo: yesterday's program is still on the
  board (her slide 30).
- The two-channel read is recall (Petra, 2026-09-03: "we have taught
  2-channel reads"), so Part 3 is five minutes of pointing, not teaching.
- **Checkpoint at minute 40** (end of Part 2), a ladder: no motion with the
  pulse re-verified → power (5 V at the pin? shared ground?) or the signal
  lead on the wrong pin; twitching and a board that resets → the brown-out,
  the servo is on the Nucleo's rail; motion that ignores the knob → the
  program on the board is not Tuesday's.

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
| — | Part 3 (five minutes) is a recall of the two-channel ADC read the class has done before — a pointer toward Thursday, not an addition |

## Activity sequence (50 min; every Part's row equals the sum of its beats)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 0 | 1 | tell | Announcements |
| 1 | 3 | tell | **Where we are.** Yesterday: the pulse, verified. Today: the servo on its own supply, wired as Tuesday's figure and lead map say (her `towerProPowering.png`: red center lead to the regulator's 5V pin, brown to the shared ground rail, yellow to PA7) — a pointer, not a retelling (2). The order of checks from Day 12: power first, then ground, then the signal path (1) |
| 2 | 34 | do | **Finish Tuesday, then wire — CRUCIAL.** Finish Tuesday's design exercise first: the four `#define`s, the map, the verified pulse — her x-hour's premise, with Tuesday's ladder (10). Everything unplugged: the regulator board on the breadboard as in her drawing (`towerProPot.png`, pot on A0 — follow-up 3b for the export), its GND to the ground rail the Nucleo already shares (4). Adapter in, multimeter on the 5V pin: 5 V before anything is connected to it — if it is not, the fault is upstream and you find it with nothing else attached (3). **Adapter out** before the next wire (1). Servo leads: red (center) to the regulator's 5V pin, brown to the ground rail; the yellow signal lead not yet (3). USB in, AD2 on PA7: the pulse is still 1–2 ms — everyone, and a student still in Tuesday's template does Tuesday's Part 5 here instead (2). USB out; signal lead to PA7 (D11); wiring checked; USB, then adapter; the servo follows the knob (5). You predicted this yesterday — watch it happen, `room="yes"` for a sentence each: it holds where you leave the knob; push the arm gently and it pushes back; the 1.5 ms knob position centers the arm (3). Checkpoint minute 40, the ladder above (3) |
| 3 | 5 | tell | **Two channels, recalled.** Thursday's photocells are two voltages on two pins, A0 and A1. You have read two ADC channels in one program before; that program, with a photocell divider's node on each channel, is Thursday's first program — nothing to write today (3). Where the two numbers will go: into a loop you design on Thursday and write in the lab (2) |
| — | 5 | tell | **Close.** Tomorrow: photocells replace the pot, on the arm of this servo. The reading is the photocell and its datasheet — read the datasheet's table, not just the page (2). Leave the servo wired. Presenter note: bring the tracker fixture, the photocells and the alligator clips from your kit (3) |

Total: 2+1+3+34+5+5 = **50**.

**If a part overruns:** Part 3 to one sentence in the close (−4), then the
close to two (−3). **Not cuttable:** Part 2 (Lab 8 §3 is this, and her
x-hour is for finishing it).

## Datasheet moments (P-11)

- **Part 2**: the regulator board's silkscreen (5V / GND / Vin) against Day 11's
  figure — a lookup on the part in hand.

## Writing room (S-2)

- Part 2: the three observations, one sentence each.

## Hand-offs

**Pre-class: nothing — x-day.**

**Homework:** the Day 16 reading (the photocell, the divider, the datasheet
tour). Nothing to submit (question 8).

**Day 16 needs from here:** the servo wired on 5 V and following the pot; the
two-channel program from earlier in the term at hand; the tracker fixture,
photocells and clips in hand.
