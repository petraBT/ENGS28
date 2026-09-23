# Session prompt: the simulator for Day 4's state machine

Paste this into a fresh session.

---

Put the board simulator into Day 4's state-machine work in
`source/ch-switches.ptx`, Part 4, "Implementing a State Machine in C"
(`subsec-day4-fsm-code`).

**Read `plans/sim-embed-context.md` first.** It carries the repos, the build
and sync commands, where facts come from, the committee gate, the house rules
that bite, and the traps that have cost time. Do not re-derive any of it.

## Why this day

It is the best remaining fit in the book. The interpreter grew `typedef`,
`enum` and `switch` *for Day 4* — the simulator's README says so — and Day 4
then never got an embed. The chapter's own instructor solutions
(`sl-day4-sol1`, `sl-day4-sol2`) parse and run verbatim today. Nothing needs
building in the simulator.

Better still, the failure the chapter most wants students to feel reproduces
exactly: a blocking `delay_ms(500)` in the loop means a press that lands in
the gap is lost, and the whole point of the FSM is to stop losing it. That is
the Day 9 observation a week early, and it costs nothing to show.

`ch-switches` already has a `<sim starter="toggleLEDstart"/>` in the Day 3
material, so the chapter's conventions are set. Follow them.

## The design question to settle first, before writing anything

**There is no `blinkyCNT.c` file.** It is the student's own Lab 1 program
(`act-blinky-cnt` in `ch-intro-blinky.ptx` asks them to write it: three LEDs
showing a 3-bit binary count). Day 4 Part 4 says "start from your
`toggleLED.c` or `blinkyCNT.c` project". So unlike Days 7, 8 and 9, there is
no given starter to narrow into a sim-starter.

Decide what the embed seeds with, and put the options to Petra rather than
picking silently. The shape of the problem:

- The activity before this one (`act-day4-fsm-draw`) has students **design**
  the state diagram. A starter that hands them a `typedef enum` with the right
  states pre-empts exactly that. This is the "do not hand over the answer"
  rule, and it is the whole difficulty of this embed.
- But a completely empty editor is not useful either, and the three LEDs need
  wiring in the component bay before anything is visible.

A shape worth proposing: seed with a **working `blinkyCNT`-style binary
counter and nothing else** — no button, no states — so the student's task is
exactly the one the chapter sets, turning a working counter into an FSM. That
gives them the LEDs already driven and the bay pins already named, and hands
over none of the state design. Check it against the activity text before
committing to it.

Whatever you choose is new student-facing code and goes through the gate.

## What else to get right

- **The LED pins.** `blinkyCNT` uses three LEDs; find which header pins the
  book's Day 2 and Lab 1 material puts them on, and name both forms ("D4
  (PB10)"). The bay takes three LEDs fine. Do not invent a pin assignment.
- **Task 3 stays on hardware.** It asks students to verify clean transitions
  on the oscilloscope, with and without the debounce capacitor. The simulator
  models neither bounce nor the AD2. Say so in the prose, the way the Day 9
  paragraph says the capacitor is not modelled and nothing here bounces.
- **Task 2's stretch** adds a second button. The bay supports that, and two
  buttons on two pins work today.
- The chapter's instructor solutions should become an instructor-only dropdown
  entry (`examples-instructor.ts`, labelled `Solution: …`), the way Days 7, 8
  and 9 did.

## Scope

The embed, its prose, the sim-starter (or whatever seeds it), the dropdown
entries, and a UI guard for whatever you find. Do not touch the FSM teaching
itself. If the gate turns up defects in the surrounding chapter — it has every
time — report them with section headings and quoted sentences, never line
numbers, and let Petra decide.

Verify from the built book before saying it works.
