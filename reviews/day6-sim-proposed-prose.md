# Day 6 simulator embed — final proposed prose (after the gate)

Chapter `source/ch-transistors.ptx`, Part 2 "STM32 Bit-Manipulation Macros"
(`subsec-stm32-macros`), after the activity "Rewriting with Macros"
(`act-macros-rewrite`), before the slide `sl-day6-moder`. Gate reports:
`day6-sim-voice.md`, `day6-sim-technical.md`, `day6-sim-learner.md`; synthesis
in `day6-sim-gate.md`.

## Book prose

```xml
            <p>
                The simulator below is seeded with the code from this activity,
                placed inside a <c>main()</c> so that it runs.  First attach an LED
                to PB5: click <em>+ LED</em> in the component bay, then click the
                Arduino header pin D6, which is PB5.  Run the program and write down
                the values of <c>RCC->IOPENR</c>, <c>GPIOB->MODER</c> and
                <c>GPIOB->ODR</c> in the register panel.  Then replace the raw
                constants with CMSIS macros and run it again.  If your rewrite is
                right, the LED lights and all three registers hold the same values
                as before.  Matching values show that your macros stand for the right
                bits.  They do not show that you chose the right names.
                <c>GPIO_PUPDR_PUPD5_Pos</c> is 10, the same as
                <c>GPIO_MODER_MODE5_Pos</c>, so check that each name belongs to the
                register it is written to.
            </p>
            <p>
                Nothing here is saved for you, so use the download button (the
                downward arrow) to keep a copy of your work.  <em>Full
                screen</em> opens the program in a new tab, and your code is
                part of that tab's web address, so a bookmark of that tab
                brings it back as it was when you pressed the button.
            </p>

            <sim starter="macrosRewrite" height="740"/>
```

## Header comment of `assets/sim-starters/macrosRewrite.c`

```c
/* macrosRewrite.c
 * ENGS 28 - Day 6 in-class
 *
 * Below is the code from the activity
 * "Rewriting with Macros", unchanged,
 * inside a main() so that it runs. It
 * configures PB5 as an output and
 * drives it high, all with raw
 * constants.
 *
 * Attach an LED first: click + LED in
 * the component bay, then click header
 * pin D6 (PB5). Run the program and
 * write down the values of RCC->IOPENR,
 * GPIOB->MODER and GPIOB->ODR in the
 * register panel.
 *
 * Your job: replace the raw constants
 * with CMSIS macros, as the activity's
 * three tasks ask, then run the program
 * again. If your rewrite is right, the
 * LED lights and all three registers
 * hold the same values as before.
 *
 * Matching values show that the bits
 * are right. Check the names as well:
 * GPIO_PUPDR_PUPD5_Pos is 10, the same
 * as GPIO_MODER_MODE5_Pos, so make sure
 * each name belongs to the register it
 * is written to.
 */
```

## Simulator dropdown

- student: `Day 6 — macrosRewrite.c (PB5 with raw constants)`, needs "Add an LED to header pin D6."
- instructor: `Solution: Day 6 macro rewrite (PB5 on D6)` (`sl-day6-macros-solution` inside a main())
