# Day 6 simulator embed — checker-voice

**Gate on the Day 6 simulator-embed text: MAJOR.** One sentence needs to go. The other findings are MINOR. The paragraph does not give away the answer to any of the activity's three tasks. It never names `RCC_IOPENR_GPIOBEN`, and it points only at registers the activity's code already shows.

### Findings

**1. [MAJOR] Section 1, last sentence (S-19, S-23; reuse)**
- Current: "Reading the code cannot give you that confirmation, because a macro that names the wrong field looks just as plausible on the page as the right one."
- It is not in her register, and it is only half true.
  - It argues why the exercise is worth doing, which is the self-justification S-23 cuts. The phrasing "looks just as plausible on the page" is the contrastive, aphoristic tell.
  - Technically, it contradicts the subsection it sits in. The subsection's case for macros is that a wrong raw shift is hard to spot in review, and her Day 6 deck (slides 12–13) frames the whole topic as "Goal: Make this code more readable." Saying a macro looks just as plausible as the right one undercuts that argument. "Cannot" is also an absolute claim: checking each name against the reference manual does confirm a rewrite.
  - What is true is narrower, and worth keeping in S-19's spirit. The compiler rejects a name that does not exist, but it accepts a real macro for the wrong pin or register.
- Proposed: "The compiler rejects a misspelled macro, but it accepts one that exists and names the wrong pin, so the register values are the check."
- Or DELETE. The only thing lost is the reason for running the program, and the paragraph's first sentence already gives it.

**2. [MINOR] Section 1, sentence 5 (S-27, precision)**
- Current: "The two versions write exactly the same bits, so if your rewrite is right the LED lights and all three registers hold the same values as before."
- The two versions do not write the same bits along the way. The raw code clears bit 11 and bit 10 in separate writes; the macro code clears the whole field in one. Only the final values match. The sentence also says the same thing twice ("same bits", then "same values").
- Proposed: "If your rewrite is right, the LED lights and all three registers hold the same values as before, because each macro stands for the same bits as the raw constant it replaces."
- The facts in the proposal file support this: `_Msk` is 0x3<<10, `_Pos` is 10, `GPIO_ODR_OD5` is 1<<5, `GPIOBEN` is 1<<1.

**3. [MINOR] Section 1, sentence 1 (reuse)**
- Current: "You can check your rewrite in the simulator below, which starts with the raw-constant code from the activity inside a `main()` function."
- It opens on what we are doing, so failure 1 does not apply. But "raw-constant code" is a coined compound. The house opening already exists in `ch-switches.ptx` ("The simulator below is seeded with …, so you can …") and in the starter headers ("inside a main() so that it runs").
- Proposed: "The simulator below is seeded with the code from this activity, placed inside a `main()` so that it runs, so you can check your rewrite."

**4. [MINOR] Section 2, header comment (accuracy against task 2)**
- Current: "replace the raw constants with the CMSIS macros the activity names"
- The activity names only three of the four macros. Task 2 asks the student to find the `RCC->IOPENR` macro, with the hint about the UART driver. A student reading this header will look for a fourth name that isn't there.
- Proposed: "replace the raw constants with CMSIS macros. The activity names three of them; the one for RCC->IOPENR is the one you look up."
- For the same reason, "with the macros" in section 1 sentence 4 is better as "with CMSIS macros".

### Sweeps
- **Unit opening:** checked sentence 1. It passes failure 1.
- **"we" versus "you":** zero "we", which is correct. Every sentence is something the student personally does (S-13), and every other embed paragraph is also all "you".
- **Weekday as actor, the "N, and it is the one that…" armature, count-rhetoric, time budgets, "Part N" leakage:** none.
- **Acronyms:** "CMSIS" is expanded earlier in the same subsection (line 470). PB5 carries its D6 name, per the "D5 (PB4)" convention.
- **Personification, fragments, spelling:** none. American spelling throughout.
- **Em dashes:** none in the prose or the header. The dropdown label "Day 6 — macrosRewrite.c …" has one, but every label in the simulator's `src/examples.ts` has the same form. That is UI convention, not prose, so I did not flag it.
- **Needs line:** "Add an LED to header pin D6." matches the house form ("Add a button to header pin D5.").

### Already written: reuse instead of invent
- The attach instruction, "click *+ LED* in the component bay, then click the Arduino header pin D6, which is PB5", matches `ch-gpio-interrupts.ptx` ("the Arduino header pin labeled `D5`, which is PB4"). Keep it.
- "Your job:" and "Below is … inside a main() so that it runs" in the header are the house forms used across the starter files. Keep them.
- Paragraph 2 is verbatim the house sentence, as intended. Not reviewed.

### Checked facts
- The register panel does show `RCC->IOPENR`, so asking students to note it works (`~/repos/ENGS28-board-sim/src/board/register-panel.ts:151`).

### For Petra
- The subsection's existing code comment, "names are checked by the compiler", is only half the story; my rewrite in finding 1 supplies the other half. Does she want that refinement in the embed paragraph, or not raised at all? If not, delete the sentence.

Reviewed: `/private/tmp/claude-503/-Users-dz00762-repos-ENGS28/dc290cb9-c4d7-4b6c-8d93-20e5edc8c70b/scratchpad/day6-sim-proposed-prose.md`, in context of `/Users/dz00762/repos/ENGS28/source/ch-transistors.ptx` lines 459–601.
