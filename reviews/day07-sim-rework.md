# Day 7 — the `<sim>` placement in ch-adc.ptx

A scoped gate on a rework, not a full Gate 2. `ch-adc.ptx` is the pilot chapter
and has already been through the whole process; what was reviewed is two newly
added paragraphs and one `<sim>` embed, plus the handed-over starter they load.

Panel: `checker-voice`, `checker-technical-accuracy`, `learner-weak-circuits`,
each scoped to the new text. `learner-in-the-room` was not run: the change adds
no slides, so there is nothing to walk in projection order.

- **checker-technical-accuracy — BLOCKER** (2 blockers, 4 major, 2 minor)
- **checker-voice — MAJOR** (2 major, 3 minor, 1 for Petra)
- **learner-weak-circuits — MAJOR** (3 major, 1 minor)

## The change list, and what was done

| # | Finding | From | Action |
|---|---|---|---|
| 1 | "join the register panel **as soon as the ADC clock is on**" is stale and stale in the damaging direction: the panel now shows the ADC rows as soon as the program *touches* the converter, so a student with a missing TODO 2 would read this and conclude the clock was on. Also 5 rows, not 3. | technical (BLOCKER) | Rewritten to "as soon as your program touches the converter", reusing her passed sentence shape from `ch-switches.ptx:1042` |
| 2 | "moving the pot to a new pin asks you for the same lookups" was **false**: the simulator's attach message named the ADC channel, handing over the half of the homework the student is meant to derive from Table 12 | technical (BLOCKER) | **Fixed at the source**, not in the prose: the attach message no longer names the channel (`board-sim` `board-view.ts`). The refusal path still does, because "this pin has none" is not the answer to anything |
| 3 | "the same three lookups" — the chapter's own task 1 names **two** lookups and **three numbers**; nothing in the chapter has three lookups | technical (MAJOR) | Reframed: the simulator gives one of the three numbers (the port pin), the channel is still theirs to find |
| 4 | "Keep your work with *↓ Download .c*" — in the book's `?embed=1` layout the label is hidden and the control reads only "↓" | technical (MAJOR) | Prose now says "the download button, marked ↓". Showing the label in the embed was tried and reverted: it wraps the toolbar to a third row and costs two lines of the editor, and a row of chrome in a 660px iframe is a row of code the student cannot see |
| 5 | "on the bench" violates the standing rule that there are no lab benches | technical + voice (MAJOR) | Removed from the paragraph and from `assets/sim-starters/ADCPot.c` |
| 6 | The starter file repeated the stale panel claim from #1, so a fix to the prose alone would leave the wrong version in front of the student while they work | technical (MAJOR) | Starter's header comment rewritten to match, and it now says what a forgotten TODO 2 looks like |
| 7 | "Two things it will not do for you." is the count-armature she deleted twice in the Day 10 pass and once in Day 8, and is a fragment (L-16) | voice (MAJOR) | Replaced with "One warning:", which is in the corpus and passed (`ch-switches.ptx:1043`) |
| 8 | "a single count of deliberate wobble" — metaphor as the name of the thing (S-11), and it explains the tool's design intent to the student (S-23) | voice (MAJOR) | "the reading moves by about one count either way" |
| 9 | The Part 7 paragraph was one six-line sentence with the tool and the tasks as actors (L-13, "don't make things do other things") | voice (MAJOR) | Split into two paragraphs, plain sentences, the student as subject |
| 10 | Dither described as "a single count" is right as an amplitude and wrong as a range: `DITHER_LSB = 1` is uniform in (−1, +1), a two-count spread | technical (MINOR) | "about one count either way". The simulator's own constant called itself "peak-to-peak", which its formula contradicts — **comment corrected upstream** |
| 11 | "in the simulator they cannot disagree" states the fact without the reason and reads like a bug report; with dither they *can* differ by a count, and the real reason is that the two numbers are not independent | technical + learner (MINOR) | Rewritten to the real reason: computed from the same number, so not two independent measurements |
| 12 | The paragraph never said whether clicking A0 also wires power and ground, so a student cannot tell whether the circuit is complete | learner (MAJOR) | Added: "That one click wires the whole divider, so there is nothing to connect to 3.3 V or to ground" |
| 13 | The sampling-time caveat was a warning with no stated consequence for the exercise in hand | learner (MAJOR) | Now states the consequence: those effects "have no effect on what you read" |
| 14 | Three disclaimers stack up right before the one homework task that structurally needs hardware, with no route for a student who has none tonight | learner (MAJOR) | Added: "If your kit is not with you tonight, do the first two and keep this one for when it is" |
| 15 | Reuse (P-12): she had already passed wording for the register-panel sentence, the "Arduino header pin" phrasing, and the "Nothing here is saved for you, so…" reason-before-instruction shape | voice (MINOR ×3) | All three reused rather than reinvented |
| 16 | Part 7's subsection mentions Table 12 with no link, and the homework activity is projected so under L-21 it cannot carry one — this new paragraph is the only place in the subsection that can | voice | Datasheet link added, which also clears an L-19 gain |

## Left for Petra

1. **What a student without their kit submits for homework task 3.** The prose
   now routes them ("keep this one for when it is"), but what they hand in is a
   course decision, not a drafting one.
2. **Whether the book should say how much a *real* reading moves.** The new
   paragraph says the simulated reading moves less than a real one; the chapter
   nowhere sets an expectation for the real figure.
3. **The two older simulator paragraphs predate the download button**
   (`ch-intro-blinky.ptx:1149`, `ch-uart.ptx:888` — "copy your finished code
   somewhere safe"). Worth updating so all three read the same way.
4. **`source/ch-motors.ptx:668` says "different on the bench"** — the same
   standing-rule violation, in prose she has already passed. Not touched.
   `scripts/check_rules.py` has no rule for "bench", which is why it survived;
   adding one would catch it and prevent the next.

## Not run

`learner-in-the-room` (no slides added), and the rest of the Gate 2 standing
core. A two-paragraph rework does not carry a ten-reviewer panel; the three run
were chosen for the two risks this change actually had — factual claims about a
tool that changed under the prose, and register in a passed chapter.
