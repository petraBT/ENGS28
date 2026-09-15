# Learner-in-the-room gate: Day 3 / Day 3x / Day 4 (post voice-sweep)

Walked at http://localhost:8352/external/class.html?deck=day3|day3x|day4, 1600×900,
against `source/ch-switches.ptx`. Every student-facing slide fits (per the
console snippet); this pass is about content, not overflow.

## Verdict: MINOR

No blocker, no unparseable task, no illegible caption-only slide. Three small
content-accuracy defects, listed hardest first.

---

## Does not earn its place / is wrong from the wall

1. **[MINOR] day3x — `sl-day3x-hw-or-sw`, and the day3x notice slide 2
   ("Review, and where we're headed")** — Both slides characterize the
   upcoming "leading edge" work as the *software* half of the hardware/software
   debounce tradeoff: the notice's third bullet says "We'll then fix what we
   find twice over: once with hardware, a capacitor, and once in software, by
   detecting the edge," and `sl-day3x-hw-or-sw`'s last bullet says "Today
   we'll do both: the capacitor now, and edge detection in the second half of
   the hour," directly under a bullet that describes "software" debouncing as
   costing "processor cycles, spent waiting for the bouncing to stop." A
   student who takes that framing literally arrives at the very next section,
   "The Toggle Problem," whose lead slide (`sl-day3x-naive-polling`) opens
   with "Even with a debounced switch, this loop does not do what you want" —
   i.e., bounce is *already* solved (by the capacitor), and what follows is an
   unrelated bug (a level read mistaken for an edge), not the software half of
   debouncing. The mismatch resolves within one slide, but for that one slide
   a student is set up to expect the wrong problem.
   **Fix (improve):** reword the last bullet of `sl-day3x-hw-or-sw` (and the
   parallel clause in the day3x notice) to something like "Today we'll do the
   hardware fix now, and after the break find a second, unrelated bug that
   the capacitor can't touch," so "software debouncing" and "edge detection"
   are not presented as the same fix.

2. **[MINOR] day3 — `sl-day3-settling-fixes`, bullet 1** — "The easiest, and
   the one `button.c` uses: wait 50 ms with `delay_ms()` after initialization,
   before sampling any pin" repeats a fact the student already has twice: from
   `sl-day3-pullup-settling` ("Read IDR before it settles and you get a
   spurious 0, so delay first") two slides earlier, and from the visible
   `delay_ms(50)` line with its own comment in `sl-day3-button-excerpt` four
   slides earlier. The other four bullets on this slide (loop-until-1,
   drive-as-output-then-switch, external pull-up, and the generalization to
   "not only a start-up problem" with the Thursday forward-link) are all new,
   so the slide as a whole earns its place — bullet 1 alone is dead weight.
   **Fix (improve):** drop bullet 1, or compress it to a one-clause callback
   ("As already seen in `button.c`: `delay_ms(50)`...") so it doesn't read as
   the same fact restated at full length.

3. **[MINOR] day3 — `sl-day3-portbit`, `sl-day3-switch-portbit`,
   `sl-day3-input-config`** — all three diagrams carry the label "TTL Schmitt
   trigger" (twice, on `sl-day3-portbit` and `sl-day3-switch-portbit`), and
   the term is never spoken from the wall. The *behavior* it names (two
   thresholds instead of a single comparator point) is explained on
   `sl-day3-vil-vih`, but that slide is marked optional/reveal and never uses
   the words "Schmitt trigger" itself. A student relying only on the
   projected wall sees a labeled block in a copied reference-manual diagram
   with no definition anywhere. It is not load-bearing for any activity (no
   task asks what a Schmitt trigger is), which is why this is MINOR rather
   than a blocker.
   **Fix (improve):** add one clause to `sl-day3-vil-vih`'s intro sentence —
   "The input circuitry does not compare the pin voltage against a single
   threshold; the comparator that does this, the Schmitt trigger, has two
   thresholds instead of one" — so the name and the behavior are tied
   together somewhere on the wall.

---

## Slide walk

Student-facing slides only, in projection order. "What I have" is written as
a student with no book open would state it.

### Day 3 — Digital Inputs & the Oscilloscope

| # | slide | What I have that I didn't before |
| --- | --- | --- |
| 1 | title | Today's topic: Digital Inputs & the Oscilloscope, Day 3. |
| 2 | notice: Late Lab Policy | The 2-late-days / 10%-per-day rule. |
| 3 | notice: Labs & Honor Code | Work alone; exchange ideas not code; cite partners. |
| 4 | notice: AI Use | HiTA only; must disclose and understand any AI-assisted code. |
| 5 | agenda | The four-part roadmap for today, matching the four sections that follow. |
| 6 | section: Code Review | We're starting with `blinkyCNT.c` code review. |
| 7 | notice: Recall Lab 1 | Reminded what `blinkySIM/SEQ/CNT.c` each do — needed to read a partner's code next. |
| 8 | `sl-day3-code-review` | The specific snippet and three concrete questions to compare against my own `blinkyCNT.c`. |
| 9 | section: AD2 Oscilloscope | We're moving to oscilloscope measurements. |
| 10 | `sl-day3-ad2-photo` | What the AD2 is (scope + waveform gen + logic analyzer, USB, flying leads). |
| 11 | `sl-day3-ad2-pinout` | Which lead is which: CH1=orange, CH2=blue, minus leads (white stripe) always to GND. |
| 12 | `sl-day3-ad2-wiring` | The concrete wiring steps: `blinkySEQ.c` loaded, minus to GND, CH1/CH2 plus to two LED anodes. |
| 13 | `sl-day3-ad2-cursors` | How to measure a pulse width with two cursors and Δt, and that I'll reuse this tomorrow for bounce. |
| 14 | `act-day3-ad2-explore` | Five concrete tasks (a–e) to run at the scope myself. |
| 15 | `sl-day3-ad2-debrief` | Named definitions of all four scope controls (Time Base, Range, Offset — confirming what I just found; Trigger — new, not asked in the activity). |
| 16 | section: Wiring & Reading a Digital Input | We're moving from output to input wiring. |
| 17 | `sl-day3-pushbutton-wiring` | The physical wiring: D5 to one leg, GND to the other. |
| 18 | `sl-day3-pushbutton-active-low` | Why a pull-up is needed (floating pin), the active-low convention, and that we use the internal ~40 kΩ pull-up, not an external resistor. |
| 19 | `sl-day3-portbit` | A generic picture of one GPIO bit's read and write paths to refer back to. |
| 20 | `sl-day3-switch-portbit` | The same picture with a button wired in: pull-up holds HIGH, closing pulls LOW, blue path into IDR. |
| 21 | `sl-day3-input-config` | Which register (MODER / PUPDR / IDR) corresponds to which part of that same picture. |
| 22 | `act-day3-ref-manual` | Two concrete reference-manual lookups: MODER's input value + reset default; PUPDR's pull-up value + the C statements for PB4. |
| 23 | `sl-day3-pb4-config` | The reveal: the actual clock-enable + MODER + PUPDR code that answers the activity. |
| 24 | `sl-day3-vil-vih` | The two-threshold (VIL/VIH) model of reading a pin, and when it matters (slow signals, noise, mixed supplies). |
| 25 | `sl-day3-button-excerpt` | A complete short program: pull-up enable, settling delay, active-low read-and-branch — ready to compare against my own code. |
| 26 | `act-day3-button-c` | Concrete build/flash steps and three questions (why the delay? why `==0`? verify + extend `blinkySEQ.c`). |
| 27 | `sl-day3-pullup-settling` | The pin doesn't snap HIGH instantly (~2.5 µs to settle) and reading too soon gives a spurious 0. |
| 28 | `sl-day3-debounce-preview` | New forward fact: tomorrow's debounce cap makes that settling time much worse (~4 ms, not 2.5 µs). |
| 29 | `sl-day3-settling-fixes` | Three new alternative fixes beyond `delay_ms()` (loop-until-1, drive-then-switch, external pull-up), the generalization that this isn't just a start-up problem, and the forward link to Thursday's state machine. (Bullet 1 alone repeats #27/#25 — see defect 2.) |
| 30 | section: Button Exercises | We're moving to hands-on button exercises. |
| 31 | `act-day3-button-exercises` | Two concrete tasks: pause/resume on `blinkyCNT.c`, and (homework, due Thursday) `toggleLED.c` with its specific toggle behavior. |

(Instructor-only solution slides #8a–c and the pause/resume solution skipped
per student view.)

### Day 3x — Observing & Fixing Switch Bounce

| # | slide | What I have that I didn't before |
| --- | --- | --- |
| 1 | title | Today's topic: Observing & Fixing Switch Bounce, Day 3x. |
| 2 | notice: Review, and where we're headed | Reminded of Tuesday, and told today's arc (put the scope on the button itself; fix twice over). See defect 1 for the "software = edge detection" framing this sets up. |
| 3 | section: Observing and Fixing Bounce | We're starting with observation. |
| 4 | `sl-day3x-wire` | The specific wiring: CH1 on the button (PB4/D5), CH2 on the LED (PA5/D13). |
| 5 | `sl-day3x-trigger` | The exact trigger settings to catch one press (CH1, Falling, 1 V, 20 µs/div). |
| 6 | `act-day3x-observe-bounce` | Three concrete tasks: capture and describe one press, measure bounce duration, count LED changes per press. |
| 7 | `sl-day3x-bounce-look` | Confirmation of what my own capture showed: many rapid transitions, ~50 µs to a few ms. |
| 8 | `sl-day3x-hw-fix` | The mechanism of the capacitor fix: discharges through closed contacts, recharges slowly through the pull-up. |
| 9 | `sl-day3x-cap-codes` | How to read a capacitor's printed value/tolerance/voltage code. |
| 10 | `sl-day3x-cap-place` | Exactly where to place the capacitor (D5/PB4 to GND, in parallel with the switch). |
| 11 | `act-day3x-hw-debounce` | Three concrete tasks: identify my kit's cap, place it and recapture, compare toggle count with/without. |
| 12 | `sl-day3x-with-without` | Confirmation: with the cap, one clean transition, one toggle per press. |
| 13 | `sl-day3x-rc-why` | Why it works: pull-up + cap form an RC low-pass filter; if C is large enough the voltage never re-crosses VIH during a bounce. |
| 14 | `sl-day3x-hw-or-sw` | The hardware/software cost tradeoff, and what's coming next. Sets up the mismatch in defect 1. |
| 15 | section: The Toggle Problem | Told explicitly we're now onto a second, different problem. |
| 16 | `sl-day3x-naive-polling` | The term "polling" defined; a cleaner `buttonPushed` pattern; the flagged claim that this loop still misbehaves for a toggle, even though the switch is already debounced. |
| 17 | `sl-day3x-toggle-activity` | Three concrete predict/calculate/trace tasks that let me work out for myself why the naive loop over-toggles. |
| 18 | `sl-day3x-edge-skeleton` | The fix pattern (a `buttonAlreadyPressed` flag detecting the leading edge) as a skeleton with three specific blanks to fill in. |
| 19 | notice: Looking ahead to Day 4 | Told Thursday's topic (state machines) and the specific mapping (`buttonAlreadyPressed` → `state`) we'll discuss. |

(Instructor-only `sl-day3x-toggle-solution` skipped per student view.)

**Slides 15→16→17→18 specifically (Petra's question):** see judgment 1 below.

### Day 4 — State Machines

| # | slide | What I have that I didn't before |
| --- | --- | --- |
| 1 | title | Today's topic: State Machines, Day 4. |
| 2 | notice: Announcements | Three logistics items (TA time, signatures, Quiz 1 window). |
| 3 | agenda | The roadmap for today. |
| 4 | section: Code Review | Starting with `toggleLED.c` review. |
| 5 | `act-day4-code-review` | Two concrete tasks: judge which of two valid `buttonAlreadyPressed` structures is clearer, and map my code onto FSM vocabulary (state/events/actions). |
| 6 | section: The State Machine Pattern | We're now formalizing what I already wrote. |
| 7 | `sl-day4-fsm-diagram` | My toggle logic redrawn as a formal two-state diagram, with the C expression on each transition, and `buttonAlreadyPressed` named as the state variable. |
| 8 | `sl-day4-enum-switch` | The same logic idiomatically in C (`typedef enum` + `switch`), to read line-by-line against the diagram. |
| 9 | `sl-day4-why` | The payoff (no blocking loop, so it embeds in a bigger program) and the formal three-part FSM definition (states/events/actions) plus why it beats a bare flag as things grow. |
| 10 | section: Designing State Machines | We're now designing from scratch, on paper first. |
| 11 | `act-day4-fsm-draw` | Two concrete diagram-drawing tasks (3-state LED cycler; Lab 2 pause/resume counter) with guiding questions for each. |
| 12 | section: Implementing a State Machine in C | We're turning a diagram into code. |
| 13 | `act-day4-fsm-implement` | The concrete implementation task (pause/resume FSM), a stretch goal, and an oscilloscope-verification step. |
| 14 | notice: Lab 2 Introduction | Lab 2 has two design challenges; read the handout. |
| 15 | `act-day4-lab2-start` | The two challenge prompts themselves (pause/resume tie-back; reaction-time game with its own state/event/action questions). |

(Instructor-only `sl-day4-sol1`, `sl-day4-sol2`, `inst-day4-fsm-diagrams`,
`inst-day4-fsm-code` skipped per student view.)

---

## Judgment 1 — the shortened title on `sl-day3x-naive-polling`

Walking slides 15→16→17→18 of day3x in order: the section-divider slide
**immediately before** `sl-day3x-naive-polling` is titled "The Toggle
Problem." By the time a student reaches "Polling an input port," they
already have the "why" — it came from the section header one slide earlier,
not from this slide's own title. Given that, restoring "and why a naive
toggle fails" to this slide's title would be redundant with the section
header sitting right above it.

On its own merits, the slide's third bullet — "Even with a debounced switch,
this loop does not do what you want when the action is a toggle" — does
carry the setup: it is specific (names the failure mode as tied to *toggle*
actions, not bounce), and it sits directly above the very code that will
misbehave. The next slide (`sl-day3x-toggle-activity`) then supplies the two
concrete numeric prompts (loop iterations in 200 ms; toggles produced) that
let the student derive the failure themselves rather than being told it.

So: no, the shortened title does not under-promise. "Polling an input port"
accurately describes the slide's primary content — defining the term
*polling* and the `buttonPushed` refactor is at least as much this slide's
job as foreshadowing the bug — and the surrounding context (section header
before, activity after) supplies the "why" that the old title used to carry
alone. I would keep the title as it stands. If anything, I would tighten
bullet 3 to make the claim more falsifiable up front — e.g. "Even with a
debounced switch, holding the button for 200 ms will toggle the LED far more
than once" — but that is a polish suggestion, not a defect.

## Judgment 2 — the two brand-new slides

**`sl-day3-settling-fixes`** ("Code runs faster than a pin can change") earns
its place. Four of its five bullets are new: three concrete alternative
fixes the deck had not shown before (loop-until-1, drive-as-output-then-
switch, external pull-up), plus the generalization that this is not a
start-up-only problem and the explicit bridge to Thursday's state machine.
Only its first bullet is dead weight (defect 2). Net: keep it, trim bullet 1.

**`sl-day3x-hw-or-sw`** ("Hardware or software?") also earns its place: it
gives the cost/benefit reasoning (processor cycles vs. component cost and
tolerance) that nothing else in the deck states, and it is the right kind of
slide to sit at a section boundary. Its problem is not that it's filler — it
is that its closing bullet blurs into a claim that isn't quite what the next
section teaches (defect 1). Fix the wording, keep the slide.

Neither slide reads as filler; both would be missed if cut, which is the
right test for "does it earn its place."

## Judgment 3 — the seven caption-only slides

All seven are legible and understandable from a projected 1600×900 view;
none needs a body-text, bigger-figure, or layout fix.

- **`sl-day3-portbit`, `sl-day3-switch-portbit`, `sl-day3-input-config`** —
  each is a large, densely color-annotated register diagram (red/blue/green
  callouts drawn directly on the datasheet figure) with a caption that names
  the highlighted path. The progression across the three (generic bit →
  bit wired to a button → registers named on that same bit) is real teaching
  content, not three views of one static image. Caption text renders at a
  size and contrast that read cleanly in the screenshot without zooming. The
  one loose end is the unexplained "Schmitt trigger" label (defect 3), which
  is a term problem, not a legibility one.
- **`sl-day3x-bounce-look`** — a real captured bounce trace with a "What is
  happening???" callout baked into the image and a caption stating the cause
  and duration range. Legible, and functions correctly as a post-activity
  reveal (it answers the activity's own question, not an obvious restatement
  of it).
- **`sl-day3x-cap-codes`** — a full worked reference (field diagram + rules +
  four worked examples) for reading capacitor markings. Fully self-contained,
  nothing missing.
- **`sl-day3x-cap-place`** — breadboard photo with a dashed placement arrow,
  a rhetorical prompt tied to the upcoming activity's task 1, and a caption
  stating exactly where the part goes. Clear.
- **`sl-day3x-with-without`** — side-by-side scope captures labeled "Without
  capacitor" / "With capacitor," each trace itself labeled "switch" / "LED,"
  with a caption stating the conclusion. Clear.

None of the seven needs a fix.
