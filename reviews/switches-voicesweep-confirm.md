# Confirmation pass — `source/ch-switches.ptx` after the voice sweep

checker-voice, second run, 2026-09-15.  Its verdict was **MAJOR — 14 numbered
fixes, no BLOCKER**, and almost all of it was damage the sweep's own edits
created: six of the eight newly written openers echoed either the chapter
introduction or their own neighbour.  All 14 were applied, plus the smaller
items and the five slide-title corrections.  Recorded here because this pass is
the reason the chapter is deliverable.

## What had not landed from the first report

- **F4 did not land.**  The Day 4 Part 1 paragraph had been *rewritten* rather
  than deleted, so the verbatim second telling of its own activity survived one
  paragraph apart — and the activity's copy is the one `day4.json` #4 projects.
  Now: "We'll start with the homework you brought in." and nothing else.
- **F16, one row.**  `V_{DD}` was still never named as the supply voltage, in
  either surface.  Both now read "roughly 0.3 × V_DD, where V_DD is the supply
  voltage, 3.3 V on the Nucleo, so about 1.0 V".
- **F19, the pronoun.**  "one of those diagrams" reached back across a
  subsection boundary and an instructor block → "one of the diagrams you just
  drew".

Everything else from F1–F32 landed.

## New problems the edits created, and what was done

1. **The Day 3 section opener and the Part 2 opener said the same two things
   verbatim** — "watch a signal change in time" and "work out what each of the
   controls does".  Exactly session 3's failure, reproduced.  The section opener
   was rewritten to the day's arc (and now names Part 4, which the first version
   dropped); Part 2 keeps the controls.
2. **`sec-state-machine` opened its second paragraph on an orphaned "It"** — the
   new first paragraph pushed the old opener down.  Subject moved into the main
   clause (S-21).
3. **The FSM definition was on a Part 2 slide and in the Part 3 prose,
   near-verbatim, two minutes apart.**  Cut from the prose; on the slide the
   definition bullet moved from fourth to first, so the slide defines before it
   argues.
4. **`day4.json` #13's new `presenterNote` contradicted the body of #16** — F7
   had moved the *superseded* claim into the note.  Corrected.
5. **`sl-day3x-hw-or-sw` said "the capacitor now"** while sitting after the
   capacitor has been fitted → "the capacitor we just fitted".
6. **`sl-day3-settling-fixes` repeated its own deck title in its first
   sentence** (the fault F13 removed four times) **and its fifth bullet was not
   a member of its own list.**  Sentence cut; the fifth bullet is now a closing
   `<p>` after the `</ul>`.  Verified in the player: a trailing `<p>` renders in
   body order.
7. **The L-21 pointer paragraph and the activity introduction it precedes both
   announced the hardware fix and both pointed at Lab 2.**  Split: the pointer
   paragraph carries the xref and the circuit, the projected copy carries only
   Lab 2's Technical Study.
8. **The F22 merge left "the resistor" with no antecedent** on
   `sl-day3-pushbutton-active-low` — five words added, nothing of hers
   shortened.  (The merge itself was confirmed clean: no run-on, no buried
   point, all three of her engineering facts intact.)
9. **Her slide-30 sentence had gained an ambiguous pronoun** — "the pull-up has
   no effect on it" → "has no effect", which is her wording.
10. **The F21 prose contradicted the reference section**, which stated
    `delay_ms(1)` as sufficient with no condition on it.  It is sufficient for
    the bare pin and not once the debounce capacitor is fitted, which is the
    whole point of the new material.  The condition was added rather than either
    claim weakened (S-16).
11. **`subsec-hw-debounce`'s closing sentence was a thin third copy** of the
    insight forty lines below it.  Deleted.

Plus: the chapter intro's three-clause semicolon chain broken into sentences;
the Day 4 opener's paired-noun ornament ("a name and a shape") removed; "three"
said three times in one sentence; a trailing appositive for effect; an S-23
clause justifying the code review; a non-parallel "twice over" mirrored into
`day3x.json`; "header" → "the Arduino header" (her own day9x correction); and
two `<note>` fields that addressed her in the third person on her own presenter
screen.

## Five slide titles corrected

| Deck | Was | Now | Why |
| --- | --- | --- | --- |
| day3 #20 | "How to wire a pushbutton: pull-ups & active-low" | "Pull-ups and the active-low convention" | #19 is the wiring slide; this body says nothing about wiring (S-30) |
| day3 #26 | "Reference: Reading a pin (VIL / VIH thresholds)" | "Reference: the two input thresholds" | ASCII pseudo-math in a projected title while the body is typeset `<m>` (N-4) |
| day3 #31 | (title fine) | kept | the duplicated body sentence was cut instead |
| day3x #13 | "Review, and where we're headed" | "Review" | her own Day 3x slide 2 is titled just "Review" |
| day3x #34 | "The fix: detect the leading edge, fill in the blanks" | "Edge detection: fill in the blanks" | the body's second sentence already says it |

## Its judgment on the five deviations I made from its first report

- **F14** (fourth bullet kept as an `<li>` rather than moved to a `<caption>`) —
  agreed, and it said I was right to override it: three rulings on "a slide
  caption is not for content" outrank its lever choice.
- **F22** (five bullets merged to three) — merge confirmed clean; one missing
  antecedent, fixed above.
- **F25** (slide bullet reverted because the figure already carries her
  sentence) — both halves confirmed correct, with a reason I had not had: the
  sentence inside `ann-d4-state-diagram.png` is **pixels, not text**, so it is
  not in the reading flow, not searchable, not in the PDF's text layer and not
  available to a screen reader.  The book needs it as prose; the slide does not.
- **F21** (her "Fundamental Issue" material given its own slide rather than
  grown into the settling slide) — right call, lever 6, and it matches her own
  deck order (slide 37 then slide 38).
- **§6** (the seven caption-only slides left alone) — agreed, with one
  exception: `sl-day3-switch-portbit` puts 201 characters of the core
  explanation into small grey centred type, and since F22 the slide before it
  now teaches exactly that in bullets at full size.  Its recommendation is
  **subtraction, not layout** — shorten the caption.  Left for the learner gate
  and for her, since it is a projection-legibility call.

## Re-measured after the fixes

- Unit openings: **37 checked, 0 failing.**
- Slide titles: **74, 0 epigrams**; the four duplicating their own body are fixed.
- S-20 day-actors **0** (was 4) · S-21 armatures **0** (was 3) · L-16 fragment
  openers **0** (was 5) · L-5 **0** (was 13) · L-15 **0** · L-18 **0** ·
  B-11e **0** · "never say write" **0** · curly apostrophes **0** ·
  `→` inside `<c>` **0** · "Day 3X" **0** · S-29 bold leads **6, all compliant**.
- Acronyms unexpanded: **0** (was 9).
- we/you: **78 : 70, ratio 1.11** (was 9 : 53, 0.17).

## Left for Petra

1. **Bounce duration is stated three different ways** and always was, so this
   predates the sweep: "a few hundred microseconds to a few milliseconds",
   "typically 50 µs to a few ms", "a few microseconds to 20 ms".  Not voice —
   one range, in one place, is a technical-accuracy call.
2. **"Digital timer (Engs 31 solution)"** — her Day 3x slide 13 lists it as the
   third debouncing option.  `sl-day3x-hw-or-sw` says "an RC filter or a digital
   timer" without the course name.  Should the ENGS 31 pointer go back in?
3. **`day3.json` ends on the pause/resume solution with nothing looking
   forward**, while `day3x.json` has "Looking ahead to Day 4".  Her old Day 3
   deck ended on "Homework for Thursday".
4. **The `Why use a pull-up resistor?` insight** is now the fourth telling of
   the pull-up/active-low explanation, and the weakest, since the Day 3 prose is
   complete.  Trim, or leave as deliberate reference redundancy?
5. **`sec-gpio-input-config` and `sec-bounce` sit mid-chapter**, between the
   teaching days; B-10 puts reference material at the end.  Structural.
