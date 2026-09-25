# Homework pointers to the simulator embeds already in each chapter

**As integrated** (after the gate; see `day8-9-hw-sim-gate.md`):

> Day 8: The homework can be done in the simulator (<xref ref="subsec-day8-code"/>) as well as on your board.  Paste in your own program in place of the one in the window, click <em>+ Pot</em> in the component bay to the right of the board, then click the Arduino header pin labeled <c>A0</c>.
>
> Day 9: The homework can be done in the simulator (<xref ref="subsec-day9-code"/>) as well as on your board.  Paste in your own program in place of the one in the window.  The blue user button is already on the simulated Nucleo, labeled B1 (PC13): hold it down to press it.

The proposal as it went to the committee follows.

# Two new sentences: homework pointers to the simulator embeds already in each chapter

No new `<sim>`. Each sentence is its own `<p>` in Part 8, "Before Next Class",
placed after the subsection's opening paragraph and before the homework
`<activity>` (the activities are projected in the decks; these paragraphs are
not, so the `<xref>` survives as a link).

Precedent reused (`source/ch-adc.ptx:1561-1563`, Day 7 homework; prose she passed in her Day 7 round, not wording she wrote):

> Moving the pot to A3 and changing the resolution can both be done
> in the simulator (<xref ref="subsec-adc-day7-code"/>) as well as
> on your board.

The xref renders as "Subsection N.N.N" (checked in the built page), so no
"Part N" reaches the student (L-18).

## Day 8 — `source/ch-timers-interrupts.ptx`, `subsec-day8-homework`

Placed after "Today's pattern (configure a timer, ...) is great preparation
for Lab 5 ..." and before `act-timer-homework` (Homework: ADCPot with a
Timer-Interrupt Blink).

```xml
<p>
    The homework can be done in the simulator
    (<xref ref="subsec-day8-code"/>) as well as on your board: paste
    in your <c>ADCPot.c</c>, then click <em>+ Pot</em> in the component
    bay and the header pin labeled <c>A0</c>.
</p>
```

The embed it points to is `<sim starter="blinkyTimerInt" height="740"/>` in
`subsec-day8-code` ("Writing blinkyTimerInt.c"). Its paragraphs say "nothing
is wired today", so the pot step is the one thing the window needs that the
paragraphs beside it do not say. The `+ Pot` / `A0` wording is from the Day 7
embed paragraph (`ch-adc.ptx:1248-1249`: "Click + Pot in the component bay,
then click the Arduino header pin labeled A0").

## Day 9 — `source/ch-gpio-interrupts.ptx`, `subsec-day9-next`

Placed after "Tonight you'll add a second pin interrupt ... which is what lets
a press be noticed during the delay." and before `act-gpio-homework`
(Homework: counterTwoButtons.c).

```xml
<p>
    The homework can be done in the simulator
    (<xref ref="subsec-day9-code"/>) as well as on your board, and the
    blue user button is the one labeled B1 (PC13) on the simulated
    Nucleo: hold it down to press it.
</p>
```

The embed it points to is `<sim starter="counterResetButtonInt" coolterm="yes"
height="740"/>` in `subsec-day9-code` ("Writing counterResetButtonInt.c"),
whose paragraphs already say how to put a button on D5 ("Click + Button in the
component bay ... click the Arduino header pin labeled D5, which is PB4, and
hold it down to press it"). "hold it down to press it" is reused from there.

## Verified in the BUILT book's embeds (headless Chrome over CDP, production bundle)

Day 9, the finished `counterTwoButtons.c` assembled from `sl-day9-hw-solution`,
`sl-day9-hw-solution-led`, `sl-day9-pc13-solution-init` and
`sl-day9-pc13-solution-isr`, pasted into the Day 9 embed, D5 via + Button, B1
pressed with pointer events on the board view:

- printed sequence: 0 1 2 3 | B1 | 2 1 0 | D5 | 0 100 99 | B1 | 100 0 1
- B1 reverses the direction; D5 resets to 0; the down-count wraps 0 -> 100
- the LED on PA5 changes within 30 ms of each B1 press (driven from
  GPIOA->BSRR in the handler) and does not change on the D5 press
- register panel: EXTI->EXTICR[1] = 0x1 (PB on line 4), EXTI->EXTICR[3] =
  0x200 (PC on line 13), FTSR1 = IMR1 low bits = 0x2010, NVIC->ISER = 0x80
  (one line, EXTI4_15), FPR1 = 0 after both handlers ran
- EXTICR[3]'s row appears only once the program writes it or arms a line
  12-15, so the panel does not show the answer to "a second field in a
  different EXTICR register" before the student's code arms line 13 or
  writes that word (after an attempt it can name the right register; that is
  feedback, and intended)

Day 8, the finished program from `sl-day8-hw-solution` (PSC 4000, ARR 1000)
with Day 7's ADC functions, pasted into the Day 8 embed, pot on A0:

- LED edges every 323-342 ms (mean 333 ms) over 4.2 s
- "Sensor value: 2047/2048" printed once a second at 8, 1012, 2007, 3014,
  4010 ms, so main() keeps its 1 s rhythm inside delay_ms while the ISR keeps
  time
- the CoolTerm panel opens on the first transmitted byte (main.ts
  autoRevealTerm), so the embed needs no coolterm="yes" for this
