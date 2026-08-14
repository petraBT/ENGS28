# Day 11 — Gate 1 committee (plan + outline)

Panel: `expert-active-learning`, `expert-cognitive-load`,
`expert-continuity-auditor`, `expert-class-logistics`, `learner-firstgen-novice`,
`learner-anxious-nonhardware`. Reviewed `plans/day11.md` + `plans/day11-ground-truth.md`.
Run 2026-08-14.

Verdicts: class-logistics **BLOCKER**; the other five **MAJOR** (active-learning
adds "arc is sound"). Consolidated change list below, applied to the plan and
ground truth in this same commit.

## Convergent findings (multiple reviewers → highest priority)

1. **Part 2 is overloaded — split it (P-7).** cognitive-load + firstgen-novice.
   Six first-encounter ideas in 12 min (four-switch bridge, brake/back-EMF,
   shoot-through, TB6612 pins, 5 V/3.3 V split, reading a truth table) with no
   predict beat. → Split into **Part 2 (the H-bridge)** and **Part 3 (the TB6612
   IC + truth table)**; add a predict beat (predict the CW switch combination
   before the table); keep shoot-through to one "cultural enrichment" sentence;
   move the 5 V/3.3 V rail split down to the wiring exercise.

2. **Back-EMF is an unshown, undefined first encounter (P-7, P-4).**
   cognitive-load + firstgen-novice. Used in Part 2's brake mode but not in the
   pre-class reading's idea list and with no figure. → Add back-EMF to the
   pre-class reading (it is in the embedded video already), so Part 1 is a true
   recap; and describe brake mode mechanically (shorting the two terminals resists
   rotation) so it does not hinge on the term alone.

3. **The hour has no slack; the crucial step is at risk (BLOCKER, S-8, P-2).**
   class-logistics. Part 3-as-was (wiring) needs ~22–25 min not 15; budget sums to
   exactly 65 with nothing named as the live cut. → Re-budget with the
   **first exercise protected**, name the **PWM explain part as the compressible
   cut** (its concept is carried by the reading, B-2), and note that the **second
   exercise continues from the first exercise's wiring** (move three jumpers to the
   Nucleo), not a fresh build — which buys back its time.

## Single-reviewer findings, accepted

4. **Part 4→5 predict link must be a recorded artifact (P-6, active-learning).**
   The PWM demo has no predict of its own. → Students **write** predicted relative
   speed at ~25/50/75 % duty in the PWM part, then check it against the ramp in the
   run exercise, so the link survives a time squeeze.

5. **Diagnostic fallback in the first exercise (P-2/P-14, anxious).** Say what the
   wiring check confirms and what a stalled student does next (predict-vs-verify
   against the truth table, a continuity check) — kept out of student-facing prose
   as classroom management (S-25), stated in the plan.

6. **VM/VCC rail separation as a plain fact (B-12, anxious).** A motor-side wiring
   mistake (5 V rail) cannot reach the 3.3 V Nucleo — state it plainly in the
   exercise, no reassurance language.

7. **"Fast PWM" is a borrowed AVR/Arduino mode name (B-11e, firstgen).** → call it
   the **counter-compare PWM mechanism**.

8. **The capacitor-code "callback" is false (P-1, continuity).** The delivered
   Day 5x book (`ch-io-datasheets.ptx`) never taught capacitor codes — only the old
   PPTX did. → Struck from ground truth; introduce the regulator caps (if
   student-facing at all) as plain new labels, or ask Petra. Depends on the
   pre-built-adapter question.

9. **Day 6 (Transistors) is the H-bridge prerequisite (continuity, L-6).** The book
   teaches N-channel low-side / P-channel high-side switches — the H-bridge legs.
   → Added Day 6 to backward links; use "N-channel/P-channel", never "nMOS/pMOS".

10. **`sec-motor-speed` is a live section in the file (continuity, MINOR).** Step 3
    must relocate it (and the register-level PWM code) out of the Day 11 boundary,
    not leave it and hope the outline doesn't reach it.

11. **Smaller:** Part 4 (PWM) Table 12 lookup should be a student self-lookup, not a
    stated fact (P-11); DAC is defined in Day 7 (`ch-adc.ptx:240`) but as an ADC
    internal — add a one-clause reminder on first use (P-1); state the scope channel
    in the run exercise (CH1 orange on PA7) (firstgen); Part 1 gets an explicit
    recall check and mode label "explain + predict" (active-learning); predictions
    are written down, S-2.

## Confirmed genuine (not invented) — continuity

Day 8 TIM14/PSC/ARR, Day 10 duty-cycle dimming, Day 7 signal-chain term, the
Table 12 / AFR datasheet thread (Day 5 UART → Day 7 ADC → PA7/TIM14 here). Lab 6
scope not over-reached (P-13). Code correctly run-only, register walkthrough
deferred to 11x (P-9).

## Still gating (to Petra)

The first-exercise timing cannot be finalized until Q1 is answered: is the
9 V→L7805→5 V barrel-jack/regulator a **pre-built adapter** or **student-wired**?
If student-wired, that is a second first-time build inside the first exercise and
the budget needs more than the protection above.
