# checker-voice — Day 9 simulator text (scoped gate)

Draft reviewed: `scratchpad/day9-sim-prose-draft.md` (sections A–D)
Specimens: `plans/day10-voice-reference.diff`, `plans/day9x-voice-reference.md`,
`plans/day8-voice-reference.diff`
Ground truth compared: `source/ch-adc.ptx` 1246–1265 (her passed Day 7 `<sim>` prose),
`source/ch-gpio-interrupts.ptx` (sl-day9-missed, sl-day9-polled-code,
fig-exti-imr1, the Part 6 ladder, act-gpio-int-t5),
`assets/starters/counterResetButtonInt.c` (her header),
`assets/sim-starters/blinkyTimerInt.c` + `ADCPot.c` (the two gated sim headers),
`reviews/day8-sim-proposed-prose.md` (the Day 8 text as it left the gate),
`ENGS28-board-sim/src/examples.ts`, `src/peripherals/exti.ts`.

### Verdict: MAJOR

### Register — is this her?

Mostly, and the four things I flagged on Day 8 as *structural* were carried over
correctly: nothing opens on an absence (Day 8 had two), the count-as-lead
armature is gone (Day 8 had one), "One word of caution:" is used exactly as she
uses it, and the download / *Full screen* paragraph is still hers verbatim. What
came back is the clipped contrastive habit in two new places — a two-word
sentence used for effect ("It is missed.") and a "really is … really is not"
parallel — plus three passages that reinvent sentences she has already written,
one of them in the very starter this file rewrites. The one new register fault
is a dropdown hint that personifies the counter.

Two of the reinventions are *shortenings* of her own sentences to fit the
narrow sim column, which is the Day 10 calibration backwards: her replacements
are longer and state the mechanism, and one of the dropped clauses is the only
place that says why a press is a falling edge.

### Rewrites

1. **[MAJOR] Section B, block 3 — a fragment for effect, and her own sentence exists (failure 2; P-12 reuse; day8-sim-voice rewrite 1, reintroduced)**
   - draft: "Try the polled version first and tap the button between two prints. It is missed. The same tap here is not, and GPIOB->IDR appears nowhere in main()."
   - hers: "Try the polled version first and tap the button between two prints. The tap registers only if the button is still down at the one instant per second when the loop reads the pin. The point of the exercise is what disappears: GPIOB->IDR is not read anywhere in main(), and a press during the one-second delay is still noticed."
   - because: the last sentence is *hers*, word for word, in the file this header rewrites — `assets/starters/counterResetButtonInt.c:29-31`: "The point of the exercise is what disappears: GPIOB->IDR is not read anywhere in main(), and a press during the one-second delay is still noticed." And "It is missed. / The same tap here is not" is the specimen's clipped contrast: ~~"Today: the two wires. Thursday: the chip at the end of them."~~ → **"We'll talk about the I2C protocol today and will examine how to talk to the backpack chip tomorrow."**

2. **[MAJOR] Section A ¶2 — "really is … really is not", and the claim is stronger than hers (failure 2; S-16; day8-sim-voice rewrite 4, reintroduced)**
   - draft: "Run `counterResetButtonPolled.c` from the examples list first and tap the button between two prints. The tap is missed here exactly as it is on your board, because the program really is inside `delay_ms(1000)` and really is not looking. Then run your own version and tap it the same way."
   - hers: "Run `counterResetButtonPolled.c` from the examples list first and tap the button between two prints. A short tap sometimes resets the counter and sometimes does not, here exactly as on your board: during `delay_ms(1000)` the program is not looking at the pin at all, and it sees only the level at the one instant per second when it reads it. Then build your own version and give it the same short tap that the polled version missed."
   - because: two specimen pairs. The doubled "really" is the shape I flagged on Day 8 and the gated text dropped — ~~"a 500 ms period really is 500 ms and a prescaler that does not fit 16 bits really does give you the wrong one"~~ → **"a 500 ms period really does take 500 ms. A prescale factor too large … is truncated here exactly as it is on the board"** — one "really", then the mechanism in its own sentence. And "The tap is missed" overstates her own passed claim, `sl-day9-missed`: **"A short tap sometimes resets the counter and sometimes does not; a press-and-hold always does."** The simulator's own polled header already says it correctly ("The tap works only if you happen to still be holding the button…"), so the draft paragraph is the only surface that says something different — B-7. The closing clause is `act-gpio-int-t5`, hers: "give the button the same short tap that the polled version missed."

3. **[MAJOR] Section B, block 1 — her explanation of why a press is a falling edge was cut to fit the column (S-14; Day 10 calibration)**
   - draft: "The same counter as counterResetButtonPolled.c, but the button is no longer read in the loop. A falling edge on PB4 raises an interrupt; the handler records the press in a shared flag, and main() acts on it next time round."
   - hers: "The same counter as counterResetButtonPolled.c, but the button is no longer read in the loop. A falling edge on PB4 raises an interrupt. A press looks like a falling edge because the pull-up holds the pin HIGH until the button connects it to GND. The handler records the press in a shared flag; main() acts on it the next time round."
   - because: her own header, same file: "A falling edge on PB4 -- which is what a press looks like, since the pull-up holds the pin HIGH until the button connects it to GND -- raises an interrupt." Narrowing the column is not a reason to delete the mechanism clause; the Day 10 pass runs the other way — ~~"The pull-ups are already on the backpack."~~ → **"The I2C protocol requires pull-up resistors on SCL and SDA but the backpack has this integrated, so no need for us to wire them externally."** (Split into plain sentences rather than kept as an aside, because the no-em-dash rule applies to the prose form; "the next time round" is hers.)

4. **[MAJOR] Section A ¶1 — the register-panel sentence ends on the diagnostic instead of on what to watch, which the Day 8 gate settled the other way**
   - draft: "The register panel shows `EXTI->EXTICR[1]`, `EXTI->FTSR1`, `EXTI->IMR1` and `EXTI->FPR1` as soon as your program touches the EXTI, so a switch you left out shows up as a register still holding its reset value. `IMR1`'s reset value is not zero, so read that one carefully."
   - hers: "The register panel shows `EXTI->EXTICR[1]`, `EXTI->FTSR1`, `EXTI->IMR1` and `EXTI->FPR1` as soon as your program touches the EXTI, so you can watch the pending bit in `EXTI->FPR1` come up the moment you press the button and go back to zero when your handler clears it. `EXTI->IMR1` reads 0xFFF8 0000 at reset rather than zero, because the direct peripheral lines are unmasked there (<xref ref="fig-exti-imr1"/>), so look at bit 4 and not at the whole register."
   - because: hers, `ch-adc.ptx:1252` — "The register panel shows `ADC1->CHSELR`, `ADC1->ISR` and `ADC1->DR` as soon as your program touches the converter, **so you can watch `EOC` come up and the count land in `DR`**." The gated Day 8 book paragraph keeps that positive shape ("so you can watch the counter run from 0 to 499 and wrap") and puts the *diagnostic* form ("a forgotten clock line shows up as an empty RCC->APBENR2") in the header only. The Day 9 draft has the diagnostic on both surfaces and the positive on neither. Section B block 4 already carries the diagnostic; leave it there. The IMR1 number is her own, `fig-exti-imr1` caption: "(The reset value is 0xFFF8 0000: the direct peripheral lines 19, 23, 25 and 31 are unmasked at reset, which is why the top of the register is not all zeros.)" — "read that one carefully" says none of that.

5. **[MAJOR] Section D, hint 1 — the counter is given a mind (precise-language memory; B-12 register)**
   - draft: "Add a button to header pin D5, then tap it between two prints and watch the counter ignore you."
   - hers: "Add a button to header pin D5, then tap it between two prints: a short tap sometimes resets the counter and sometimes does not."
   - because: her Day 8 hint, gated, is flat and says what to watch — "It blinks the on-board LED, so there is nothing to attach. Watch TIM14->CNT in the register panel." "Ignore you" is the personified-hardware register the standing memory rules out, and it also asserts the flat "always missed" claim that rewrite 2 corrects. (This one is live in `src/examples.ts:414`, not only in the draft file.)

6. **[MINOR] Section C, message 1 — states the fault and stops; her passed message shape ends with the move (`src/peripherals/exti.ts:107`)**
   - draft: "EXTI->EXTICR points line 4 at port D, which this board does not bring out to a pin."
   - hers: "EXTI->EXTICR selects port D for line 4, and this board brings no port D pin out to a header, so nothing you press can reach the line. Check the port code you wrote into the EXTI4 field."
   - because: her gated Day 8 message 1 is symptom-then-action — "TIM14's clock is off, so this write did nothing. **Set RCC_APBENR2_TIM14EN in RCC->APBENR2 first.**" And "Check the port code you wrote into the EXTI4 field" is her own ladder item 2 in different words ("A port code left at 0 selects port A, which is a pin you are not pressing"), so it adds no help the chapter does not already print. Naming `EXTI_PB` would hand over TODO 1a; this does not.

7. **[MINOR] Section C, message 2 — same, plus her section-mark style (`src/peripherals/exti.ts:101`)**
   - draft: "EXTI->EXTICR selects port code 6 for line 4, which RM0490 12.5.6 lists as reserved."
   - hers: "EXTI->EXTICR selects port code 6 for line 4, and RM0490 §12.5.6 lists that code as reserved, so no port is connected to the line. Check the port code you wrote into the EXTI4 field."
   - because: she writes the section mark everywhere in this chapter — "RM0490 §12.5.5", "RM0490 §1.2", "RM0490 §11.3, Table 40". Same symptom-then-action shape as rewrite 6.

8. **[MINOR] Section B — `EXTI` is never expanded in the header, which is read standalone (failure 5)**
   - draft: "They appear as soon as your program touches the EXTI, so a switch you left out shows up as a register still holding its reset value."
   - hers: "They appear as soon as your program touches the EXTI (the Extended Interrupt and Event Controller), so a switch you left out shows up as a register still holding its reset value."
   - because: the chapter expands it at first use (`ch-gpio-interrupts.ptx:27`, "the **EXTI**, the Extended Interrupt and Event Controller"), and the gated Day 8 header expands ISR for exactly this reason — the full-screen tab is read without the book in view. `PB9 (SDA)` → **`PB9 (SDA - serial data)`**. `NVIC` inside the narrow TODO table can stay as is; expanding it there would wreck the column and the chapter names it on every page.

9. **[MINOR] Section A ¶3 / Section B block 6 — "your own version" and "a counter that resets" are fine; one word only**
   - draft: "…and a counter that resets in this window is not evidence that you have it right."
   - hers: "…and a counter that resets in this window is not evidence that you have it right." — unchanged, this is correct. Flagging only to record that the near-duplication of the `volatile` caution between book ¶ and header is **not** a finding here: the Day 8 gate shipped that same near-duplication deliberately (`reviews/day8-sim-proposed-prose.md` A¶2 and B block 3), so failure 7 does not apply to it. Leave both.

10. **[MINOR] Placement — the stated anchor does not exist in reading order**
    - draft: "after the diagnostic ladder `sl-day9-ladder` and before the skeleton".
    - hers: after the contact-bounce paragraph that ends at `ch-gpio-interrupts.ptx:1336`, and before the `sl-day9-stretch` / `sl-day9-ladder` / `sl-day9-bounce` slide group at 1338.
    - because: in the file, `sl-day9-ladder` sits *after* the skeleton, not before it — the prose diagnostic is the `<ol>` at 1299–1319 and the ladder slide is its condensation. Day 7's model is prose ¶ → `<sim>` → slides (`ch-adc.ptx:1246`, `:1267`, then `sl-adc-setup`), and Day 8's gate moved its paragraph to sit immediately after the troubleshooting list for the same reason. Line 1337 is the one insertion point that reproduces both.

### Sweeps

- **Unit openings checked: 17 — failing: 0.** A¶1 "Here is the same exercise in the simulator…" (hers, verbatim); A¶2 "Run `counterResetButtonPolled.c`… first" (positive instruction); A¶3 "One word of caution:" (hers); A¶4 "Nothing here is saved for you…" (hers, verbatim); B1 "The same counter as counterResetButtonPolled.c…" (hers); B2 "Click + Button…"; B3 "Try the polled version first…"; B4 "Watch EXTI->EXTICR[1]…"; B5 "As given, this file does not compile…"; B6 "One word of caution:"; C1, C2; D1, D2, D3; the polled example's header comment; the instructor hint. **The Day 8 failure (two openings on an absence) was carried over correctly — there is not one here.**
- **Slide titles: 0.** No deck text is proposed. If a slide is added later, read it against S-18.
- **Weekday or course-period as grammatical actor: 0** (S-20).
- **"N, and it is the one that…" armature: 0** (S-21). Day 8 had one; correctly not reintroduced.
- **Sentence fragments used as sentences: 1** — "It is missed." (B3, rewrite 1). This is the Day 8 fault in a new place.
- **"we" in class-work sentences: 0 of 21** — **not a finding.** Her own Day 7 sim paragraph is 0 of 9 and entirely "you/your"; this text describes what one student does in a window on their own laptop (S-13). Do not sweep "we'll" into it.
- **Acronyms first-used without expansion: 1** — `EXTI` in the standalone sim header (rewrite 8). Clean: ISR (expanded, carried over from Day 8), I2C (not used), NVIC (narrow TODO table only, chapter-expanded), RM0490, IDR, PB4/D5 (both names given, per CLAUDE.md), EXTICR/FTSR1/IMR1/FPR1 (register names, spelled as in the chapter).
- **Design scaffolding in student-facing text: none.** No minute counts, no "Part N", no "the reading", no "a program you are given". "TODO 3" and "TODO 3c" name lines of the file the student is editing — settled in favour of keeping by her own hand pass on the Day 8 starter.
- **Em dashes in student-facing text: 0.** The `—` in the dropdown labels is the established format in `src/examples.ts` for every day.
- **Anthropomorphism: 1** — "watch the counter ignore you" (rewrite 5). "your program touches the EXTI" is her Day 7 verb and stays.
- **Completeness of the draft as a collection: 1 gap.** `src/examples.ts:415-419`, the polled example's four-line header comment, is new student-facing text and is not in the draft file. It reads well and needs no change — but it is also the only surface that words the missed tap correctly, which is how rewrite 2 came to light.

### Already written — reuse instead of invent

- B block 3, "It is missed. The same tap here is not…" — she already wrote it: `assets/starters/counterResetButtonInt.c:29-31` — "The point of the exercise is what disappears: GPIOB->IDR is not read anywhere in main(), and a press during the one-second delay is still noticed."
- B block 1, the dropped falling-edge clause — she already wrote it: same file, lines 23-27 — "A falling edge on PB4 -- which is what a press looks like, since the pull-up holds the pin HIGH until the button connects it to GND -- raises an interrupt."
- A¶1, "IMR1's reset value is not zero, so read that one carefully" — she already wrote it: `fig-exti-imr1` caption — "(The reset value is 0xFFF8 0000: the direct peripheral lines 19, 23, 25 and 31 are unmasked at reset…)"
- A¶2, "The tap is missed here" — she already wrote it: `sl-day9-missed` — "A short tap sometimes resets the counter and sometimes does not; a press-and-hold always does." And `act-gpio-int-t5` — "give the button the same short tap that the polled version missed."
- C1/C2, what to do about a bad port code — she already wrote it: the Part 6 ladder, item 2 — "A port code left at 0 selects port A, which is a pin you are not pressing."
- Correctly reused already, leave alone: A¶1's opening sentence; the whole download / *Full screen* / bookmark paragraph; the register-panel sentence pattern; "One word of caution:"; the ISR expansion; the dropdown label format; B5's "As given, this file does not compile" (new, and right — her starter's `if ( /* TODO 3c */ )` genuinely does not compile, and nothing she wrote says so).
- `ClassSlidesOLD/Day09-*.pptx` offers nothing the chapter does not already carry better for this text; the sim paragraph has no old-deck analogue.

### For Petra, not for me

1. **The 10 ms sampling limit (the draft's question 3): my reading is leave it out of the prose.** The Day 8 precedent for naming a modelling simplification in the book paragraph — "The prescaler is one more place the window is simpler than the chip: a new value takes effect here as soon as it is written…" — applies where a student can *see* the difference; a press is tens of milliseconds and the RC debounce is longer, so nothing in the course can. A sentence about it would be a statement about the simulator's internals with no observable consequence. If you want it said anyway, one sentence at the end of A¶1: "While a program is inside `delay_ms()`, this window samples an armed line every 10 ms rather than continuously, which is far finer than any press or any bounce you can produce." The wording is yours to accept; the decision is not mine.
2. **The two EXTICR messages (the draft's question 2): no voice objection, and no handover.** Both name a port that cannot work and neither names `EXTI_PB`, so TODO 1a stands; and the chapter's own ladder already prints the stronger hint ("a port code left at 0 selects port A"). With rewrites 6 and 7 they match the shape of the ADC and TIM14 messages you have already passed.
3. **The narrow header drops two blocks of your text that the sim student has no other copy of**: the "Names you will want" list (`EXTI_EXTICR2_EXTI4_Msk`, `EXTI_PB`, `EXTI4_15_IRQn`, …) and "One trap worth stating twice: … EXTI_EXTICR2 is EXTI->EXTICR[1]". The trap survives in the TODO 1a comment ("Mind the array index"), but the names list does not survive anywhere. Whether a student working away from the book should have it is a teaching call, not a register call — flagging it because the text that went missing is yours.
4. **"Switches" or "steps".** Your starter header says "the four EXTI/NVIC switches"; the chapter body and the ladder say "the four EXTI/NVIC steps" (`ch-gpio-interrupts.ptx:1130`, `:1143`, `:1354`). The draft uses both, each time matching whichever of your two files it sits nearest. I have left it alone rather than pick one for you.
