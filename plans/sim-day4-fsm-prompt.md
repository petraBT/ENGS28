Put the board simulator into Day 4's state-machine work in
`source/ch-switches.ptx`, Part 4, "Implementing a State Machine in C"
(`subsec-day4-fsm-code`).

READ THESE FIRST, IN THIS ORDER, BEFORE WRITING ANYTHING:

1. `plans/sim-embed-context.md` — everything the last three embeds cost to
   learn: the sync-then-build-all sequence, where facts come from, the
   committee gate, the house rules that bite, the traps. Do not re-derive any
   of it.
2. `AUTHORING-book.md` — every writing rule, with its ID.
3. `CHAPTER_PROCESS.md` — the gates.
4. `~/repos/ENGS28-board-sim/README.md`, especially "What works today" and
   "Checking it".
5. `.claude/agents/README.md` — the review committee.
6. `reviews/day8-sim-gate.md` and `reviews/day9-sim-gate.md` — the two most
   recent embeds, what their gates caught, and what is still open.
7. `source/ch-switches.ptx`, the whole Day 4 section, plus the existing
   `<sim starter="toggleLEDstart"/>` already in that chapter's Day 3 material.

WHY THIS DAY. The interpreter grew `typedef`, `enum` and `switch` for Day 4
(the simulator's README says so) and Day 4 then never got an embed. The
chapter's own instructor solutions, `sl-day4-sol1` and `sl-day4-sol2`, parse
and run today. Nothing needs building in the simulator. And the failure the
chapter most wants students to feel reproduces exactly: a blocking
`delay_ms(500)` in the loop means a press landing in the gap is lost, which is
the whole reason for the state machine.

Confirm that claim yourself before building on it. Run `sl-day4-sol1` through
the simulator and watch it work. An earlier session asserted it from reading,
and reading is not running.

THE DESIGN QUESTION TO SETTLE FIRST, BEFORE WRITING ANY PROSE. There is no
`blinkyCNT.c` file. It is the student's own Lab 1 program (`act-blinky-cnt` in
`ch-intro-blinky.ptx` asks them to write it: three LEDs showing a 3-bit binary
count). Day 4 Part 4 says "start from your `toggleLED.c` or `blinkyCNT.c`
project". So unlike Days 7, 8 and 9 there is no given starter to narrow into a
sim-starter, and you have to decide what the embed seeds with.

The tension: the activity immediately before this one, `act-day4-fsm-draw`,
has students DESIGN the state diagram. A starter handing them a `typedef enum`
with the right states pre-empts exactly that, and "the window must not hand
over an answer the chapter asks for" is the rule that has nearly gone wrong on
every embed so far.

One shape worth proposing: seed with a working `blinkyCNT`-style binary
counter and nothing else, no button and no states, so the student's task is
precisely the one the chapter sets, turning a working counter into an FSM.
That hands over none of the state design and still gives them driven LEDs and
named bay pins. Check it against the activity text, then PUT THE OPTIONS TO
PETRA rather than picking silently. Whatever you choose is new student-facing
code and goes through the gate.

ALSO GET RIGHT:

- The LED pins. `blinkyCNT` uses three LEDs. Find which header pins the book's
  Day 2 and Lab 1 material puts them on and name both forms, "D4 (PB10)". The
  bay takes three LEDs. Do not invent a pin assignment.
- Task 3 stays on hardware: it asks students to verify clean transitions on
  the oscilloscope, with and without the debounce capacitor. The simulator
  models neither bounce nor the AD2. Say so in the prose, the way the Day 9
  paragraph says the capacitor is not modeled and nothing there bounces.
- Task 2's stretch adds a second button. Two buttons on two pins work today.
- The chapter's instructor solutions become an instructor-only dropdown entry
  in `examples-instructor.ts`, labeled `Solution: …`, as Days 7, 8 and 9 did.

SCOPE. The embed, its prose, whatever seeds it, the dropdown entries, and a
guard in `scripts/check-ui.mjs` for anything you fix. Do not touch the FSM
teaching itself. If the gate turns up defects in the surrounding chapter, and
it has every time, report them with section headings and quoted sentences,
never line numbers, and let Petra decide.

Verify the embed from the BUILT book before saying it works: serve
`output/web` and drive the iframe in headless Chrome. Then run every check in
`plans/sim-embed-context.md` and commit both repos.
