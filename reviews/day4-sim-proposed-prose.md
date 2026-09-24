# Day 4 simulator: new student-facing text, for review

Context: `source/ch-switches.ptx`, Day 4 Part 4, "Implementing a State Machine
in C" (`subsec-day4-fsm-code`), gets a board-simulator embed. Nothing in the
simulator needed building for Day 4: `typedef`, `enum` and `switch` were already
in. One simulator defect was found and fixed on the way (section D).

**The seed is Petra's choice (2026-09-24).** There is no given starter for this
activity: it says "Start from your `toggleLED.c` or `blinkyCNT.c` project", both
of which are the student's own. Three options were put to her: the Part 2
`typedef enum` + `switch` toggle listing (already printed in the student book),
a working `blinkyCNT` counter (rejected: that program is `sl-day3-cnt-solution`,
instructor-only, and Lab 1's graded BlinkCNT deliverable), or a header-only
paste-your-own file. She chose the Part 2 listing.

**The rule this embed must keep:** the window must not hand over an answer the
chapter asks for. The activity before this one, `act-day4-fsm-draw`, has
students design the pause/resume machine's states; `inst-day4-fsm-code` answers
it with four states and a sliced delay, and its "Why the delay is sliced"
paragraph says the blocking-`delay_ms(500)` failure "is worth letting happen
once". So nothing student-facing below names the RUN/PAUSE states, their count,
the held-button twins, or the slicing.

LED pins, from Lab 1 ("wire up three LEDs ... to Port A, bits 5, 6 and 7") and
the chapter's own `sl-day3-sim-solution` comment ("LEDs on D13, D12, D11 (PA5,
6, 7)"), checked against the simulator's `src/board/pinmap.ts`.

---

## A. Chapter paragraphs, as integrated

After `act-day4-fsm-implement`, before `inst-day4-fsm-code` (prose, then
`<sim>`, the Day 3 order in this chapter; Part 4 has no slides). Final text,
after the gate (`day4-sim-gate.md`):

> The simulator below is seeded with the button toggle written as a state
> machine, with `typedef enum` and `switch`, as it is printed in
> <xref ref="subsec-day4-fsm-lecture"/>, so you can work on the pause/resume
> counter away from your Nucleo. Attach the button first: click *+ Button* in
> the component bay, then click the Arduino header pin D5 (PB4). Each press
> toggles the on-board LED. For the counter, attach three LEDs the way you wired
> them in Lab 1: click *+ LED* and then the Arduino header pin D13 (PA5), and do
> the same for D12 (PA6) and D11 (PA7). The on-board LED is also on PA5, so it
> lights together with the first. When you test your counter here, try a quick
> tap as well as a press held down.
>
> One warning: the debouncing capacitor across the switch
> (<xref ref="fig-rc-debounce-circuit"/>) is not modeled, so nothing here
> bounces, and a single press that gives exactly one state change in this
> window is not evidence that your machine is right on the real switch. There
> is no oscilloscope here either, so checking that the LED transitions are clean
> with and without the capacitor needs your Nucleo and the AD2.
>
> Nothing here is saved for you, so use the download button (the downward
> arrow) to keep a copy of your work. *Full screen* opens the program in a new
> tab, and your code is part of that tab's web address, so a bookmark of that
> tab brings it back as it was when you pressed the button.
>
> `<sim starter="toggleLEDfsm"/>`

---

## B. The starter's header comment, as shipped

`assets/sim-starters/toggleLEDfsm.c`; the code below it is the Part 2 listing
verbatim, enforced by `scripts/check_starters.py`.

```
/* toggleLEDfsm.c
 * ENGS 28 - Day 4 in-class
 *
 * Below is the button toggle written as
 * a state machine, with typedef enum and
 * switch, exactly as printed earlier in
 * this chapter.
 *
 * Attach the button first: click
 * + Button in the component bay, then
 * click header pin D5 (PB4). Each press
 * toggles the on-board LED on PA5.
 *
 * For the counter, attach three LEDs the
 * way you wired them in Lab 1: click
 * + LED and then header pin D13 (PA5),
 * and do the same for D12 (PA6) and D11
 * (PA7). The on-board LED is also on
 * PA5, so it lights together with the
 * first.
 *
 * Your job: use the button to pause and
 * resume a counter. Begin with the
 * counting code from your own
 * blinkyCNT.c, and adapt the toggle
 * state machine below, following the
 * state diagram you drew. Test it with a
 * quick tap as well as a press held
 * down.
 *
 * The debouncing capacitor across the
 * switch is not modeled, so nothing here
 * bounces, and there is no oscilloscope.
 * Checking that the LED transitions are
 * clean with and without the capacitor
 * needs your Nucleo and the AD2.
 */
```

---

## C. Dropdown entries, as shipped

Student build (`src/examples.ts`), after Day 3's button:

- `Day 4 — toggleLEDfsm.c (the toggle as a state machine)`, hint
  `Add a button to header pin D5, and LEDs to D13, D12 and D11 for the counter.`

Instructor build only (`src/examples-instructor.ts`), verbatim from the chapter:

- `Solution: Day 4 toggleLED.c (the flag in the outer if)`: `sl-day4-sol1`
- `Solution: Day 4 toggleLED.c (the button in the outer if)`: `sl-day4-sol2`
- `Solution: Day 4 pause/resume counter as a state machine`:
  `inst-day4-fsm-code`, hint `Add LEDs to D13, D12 and D11, and a button to D5.
  Try a quick tap as well as a press held down.`

---

## D. What was run, and the simulator defect it found

Run in headless Chrome against the dev server, with a scripted button on D5
(PB4) and ODR bits 5-7 sampled every 5 ms:

| program | result |
| --- | --- |
| `sl-day4-sol1`, `sl-day4-sol2`, the Part 2 listing | three 200 ms presses, three toggles of PA5, one per press |
| `sl-day3-cnt-solution` | steps every 500 ms, 000 → 111 → 000 |
| `inst-day4-fsm-code` | steps every 500 ms; a 150 ms tap pauses it, a second resumes |
| the same machine with one `delay_ms(500)` and one read per pass | two 150 ms taps landing between reads are both lost; the count runs on |

A correction to the brief this work started from: `sl-day4-sol1` and
`sl-day4-sol2` are the **toggleLED homework** solutions projected in Part 1.
They contain no `delay_ms` at all. The blocking-delay failure belongs to the
pause/resume counter, and is described in `inst-day4-fsm-code`'s "Why the delay
is sliced" paragraph. It reproduces exactly, as above.

**The defect.** Before the fix, `inst-day4-fsm-code` counted every **830 ms**,
not 500. The runner refilled its statement budget from the time elapsed since
the last animation frame, and a delay's end reset that time, so the handful of
statements between two `delay_ms(10)` calls waited for the next frame: every
delay cost its argument plus up to 16 ms. A loop of `delay_ms(1)` ran about
seventeen times slow, and after a first fix about four times slow, because
browsers clamp nested `setTimeout` to 4 ms. The runner now keeps the program's
own clock (a statement costs 1/300,000 s, a delay its argument), the engine
steers `delay_ms` by that clock, and a delay already elapsed on it continues
without a timer. `check-ui.mjs` guard 12 asserts 50 × `delay_ms(10)` and
500 × `delay_ms(1)` each come to 500 ± 40 ms, and that the blocking loop loses
a tap the sliced loop catches. All five check scripts pass.
