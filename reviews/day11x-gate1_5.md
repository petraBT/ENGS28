# Day 11x — Gate 1.5, the voice probe

`checker-voice` on the **first subsection of prose only** — the section
`<introduction>` and Part 1 — before Parts 2–5 were written. Register is
systemic: if it is wrong in the first subsection it is wrong in all of them, and
a sweep bolted on at the end produces a chapter that is half hers.

**Verdict: MAJOR.** All findings applied.

## What passed

The pilot ordering did **not** produce expanded bullets, which was the failure
mode this probe existed to catch. The prose is longer than the slide beside it,
the causal middles are supplied, "we" density is right, and there is no weekday
actor, no banner bold, no reassurance theater and no time budget in
student-facing text.

## What failed, and why

- **[MAJOR] The absent-frame, twice** — *"What we have not done is open that
  program"*, *"What we have not opened up is the part of the microcontroller
  that…"*. Her own Day 10 in-class introduction is the same situation — second
  day, recap then plan — and has no absent-pivot at all: *"Yesterday we used the
  I2C bus to light up the 7-segment display. Today we'll look at the backpack
  chip…"* Recap, then straight to "Today we'll".
- **[MAJOR] *"This is where it comes back"* is a sentence she struck by hand.**
  Verified in `plans/day10-voice-reference.diff:519–522`:
  ~~"That function is what Lab 5 asks you for, and **this is where it comes
  from**."~~ → **"You'll use this device driver in Lab 5."**
  It was also discharging the same forward reference **twice within twelve
  lines**, since the figure caption below already says *"…said the
  capture/compare machinery around it would come back in the motor chapters.
  This is it."* Replaced with her own deck line — Day 11 slide 25, *"PWM is
  built into the STM32C0 timer/counters."*
- **[MAJOR] A count-armature in its softened form** — *"the hardware for both of
  the things a motor needs from us"* defers both items into the following
  sentences, which is what S-28 removes. **And she had already written the
  sentence**: Day 11x slide 3, *"H-bridge circuit controls direction of
  rotation. Pulse-width modulation of the active switches controls the speed of
  rotation."* Her nouns — *direction of rotation*, *speed of rotation* — are now
  the prose's.
- **[MAJOR] The one place the prose was thinner than its own material.**
  *"That register holds the second number the timer compares the counter
  against"* re-derives something the passed sibling has already **named** ("A
  second number, the compare value, is checked against the counter"), and says
  less than her own annotation of the very figure beside it (*"CCR1 determines
  T_HIGH"*, *"TIM14_ARR determines T_PERIOD"*). Rewritten to say what the
  register **determines**.
- **[MINOR]** RM0490 unnamed in prose while its own caption names it (S-12);
  pin names given without the Arduino header numbers the sibling always gives;
  an apposition punctuated so it read as a list of three; and the Part title
  *"The Timer Behind the Waveform"* — the one word doing gesture rather than
  naming, against siblings that are all declarative. Now *"The Timer That Makes
  the Waveform"*.
- **[MINOR, and it argued the other way]** *"We will not wire anything today"*
  is **legitimate and stays** — Day 8's specimen keeps exactly that frame and
  rewrites only the epigram after it: ~~"No wiring today — the whole class is
  code"~~ → *"No wiring today — everything is done in code and on the chip's
  hardware."* Only the colon construction after it was changed.

## Counts it ran

Forward-looking **"we'll": 0 of 3 opportunities**, against seven in three
paragraphs of her Day 10 intro. Now used in the introduction and Part 1's close.
Weekday-as-actor: 0. Acronyms unexpanded: none in scope (all established
chapter-earlier). Bold/S-29: clean.

## Left for Petra

- **Should Part 1's prose name `CCR1`?** Held back deliberately: the figure's
  P-15 comment says it names functional blocks only, and Part 1's job is that the
  timer is a thing with parts before Part 2 goes hunting for register names. But
  `CCR1` is *not* one of Part 2's discoveries — Day 11's own passed slide already
  names it, and the Part 2 recall table lists it as known. So naming it here
  would be consistent if she prefers.
- **The learning-outcome sentence** has no close specimen pair. Hers state a
  concrete artifact instead — *"By the end of the today your own display will
  show `ES.28`"* — where this one states a capability.
