# Day 4 simulator embed: checker-technical-accuracy (scoped gate)

The agent was not permitted to write files; its report is saved here from its
reply, condensed only in formatting.

### Verdict: MAJOR (no BLOCKER)

### Findings

- **[MAJOR] Prose A, para 1: the register-panel sentence is wrong.** "The
  register panel shows `GPIOB->IDR` while the button is attached." In
  `register-panel.ts:183` and `:230`, GPIOB rows appear only once the port's
  clock is on; IDR then shows if the program has read it or if
  `gp.hasDrivenInputs()`. A released bay button does not drive the pin
  (`board-view.ts:68`, `:475` call `driveInput(bit, pressed ? 0 : null)`;
  `null` clears `externalDriven`, `gpio.ts:176-185`). So before Run no GPIOB
  rows show; with this starter IDR shows from the first loop pass whether or
  not a button is attached, because the program reads it. The comment at the
  top of `register-panel.ts` (lines 25-28) makes the same mistake. Fix: "Once
  the program is running, the register panel shows `GPIOB->IDR`…", matching
  Day 3's unconditional wording.

- **[MAJOR, not measured] The runner fix can still add a frame to a delay when
  a timer fires early** (`runner.ts`, `beginDelay`). The fractional
  `progTime - performance.now()` passed to `setTimeout` is typed `long`, so
  9.7 ms becomes 9 ms; if the timer fires before `progTime`, `loop()` runs
  nothing and waits for the next animation frame. Headless Chrome measures in
  tolerance (504 and 511 ms); Safari and Firefox not measured. Fix:
  `Math.ceil(...)`, or a sub-millisecond tolerance in the loop condition.

- **[MAJOR] Delivery: the book's simulator does not have this work yet.** The
  simulator changes are uncommitted and `assets/board-sim/` was synced at
  `a1550b0`. Until synced, the book's embed still counts `inst-day4-fsm-code`
  every ~830 ms and has no Day 4 dropdown entries.

- **[MINOR] Prose A, para 2 ties the lack of bounce to the third task only.**
  The first task's test ("does a single physical press always produce exactly
  one state change?") also depends on bounce; `inst-day4-fsm-code` describes a
  bounced press pausing and resuming within one press.

- **[MINOR] No automated check covers busy-wait pacing** (Day 1's for-loop
  blink) after the runner change. By reading, it is equivalent to before.

- **[MINOR] The student dropdown label uses an em dash**, like every other
  simulator label.

- **[MINOR, pre-existing] Stepping over `delay_ms(n)` spins the JavaScript
  thread for n ms of real time.** `doDelay` loops until the real clock passes
  its deadline while `step()` ignores delay events; the runner header's
  "delays are treated as instantaneous" is inaccurate. Harmless for
  `delay_ms(10)`.

### What checked out

- Pins: D13=PA5, D12=PA6, D11=PA7, D5=PB4 match UM2953 Table 11 (p.20) and
  `pinmap.ts`; LD4 is "connected to D13 ARDUINO signal corresponding to PA5"
  (UM p.16); Lab 1 wires the LEDs to "Port A, bits 5, 6 and 7".
- UI labels (+ LED, + Button, Component bay, Full screen, the download arrow)
  match `index.html`; the bay allows an LED on D13; buttons are active-low.
- Starter code identical to the Part 2 listing; dropdown entry identical to
  the file; the header's description is accurate.
- The three instructor entries are character-for-character `sl-day4-sol1`,
  `sl-day4-sol2`, `inst-day4-fsm-code`; the student build excludes them.
- **The no-answer rule holds**: nothing student-facing names RUN/PAUSE, a
  state count, the held twins or slicing; the seed is already printed in
  Part 2.
- Runner model: the program clock tracks the real clock (lag clamped at
  50 ms); TIM14 and EXTI still run on the real clock, costing at most one
  extra slice per interrupt, never a missed or early handler; `uart2_read`
  waits do not create catch-up bursts; pause during a delay behaves as before;
  the backgrounded-tab clamp is equivalent.
- All five simulator checks pass. `check_rules.py` on a scratch copy with the
  proposed paragraphs: 0 errors, 0 warnings.

### Reasoning

- B2 arithmetic consistent (830 ms / 50 = 10 + 6.6 ms; 17x and 4x; 1/300,000 s
  matches `stepsPerSecond`).
- B3: one inconsistency, the IDR sentence against Day 3's unconditional
  wording (above).

### Unverified

- Three-presses and two-taps-lost runs have no guard (the UI check runs one
  tap). Runner timing in Safari and Firefox.
