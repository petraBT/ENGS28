# Day 6 simulator embed — learner-python-intro

## Findings

**1. [MAJOR] Unstated assumption that "Run" resets the chip — the whole check may be meaningless**
Text: *"Run the program and note the values ... Then replace the raw constants with the macros and run it again. ... if your rewrite is right the LED lights and all three registers hold the same values as before."*
This logic only holds if clicking Run re-initializes GPIOB/RCC to power-up defaults before the edited code executes. Nothing in the new prose (or elsewhere in the chapter) says the board resets between runs. If it doesn't, a broken rewrite that writes nothing could still show "matching" registers left over from the first, correct run — the student would get a false pass on exactly the mistake the paragraph claims to catch. This is worse than a gap in explanation; it's a claim that may be false.
Rewrite (displaces nothing, adds one clause to an existing sentence): *"...run it again — the simulator restarts the chip fresh, so a leftover value from the first run can't fool you."* If that isn't true of the simulator, the paragraph needs a "press Reset first" step instead, and someone should verify which.

**2. [MAJOR] "Note the values" assumes a comparison skill never modeled at this width, and nothing preserves the first run**
Text: *"note the values of RCC->IOPENR, GPIOB->MODER and GPIOB->ODR in the register panel."* then, two sentences later, *"run it again"* — overwriting the only place the first run's values were shown.
Every prior register read in the book (ch-intro-blinky's `0x00000400`, the step-by-step bit watching in ch-intro-blinky/ch-switches) is either a single known bit or a live step-through, never "memorize an 8-hex-digit number, edit the code, then compare it against a second 8-hex-digit number by eye." The one place the book does this side by side (`0xEBFFFFFF` → `0xEBFFF7FF`, ch-debugging.ptx:728/782) is a full chapter *later* than this activity. A Python-only student has no instinct for "same" here and no scratch mechanism the text gives them.
Rewrite (add ~10 words, displace the same clause rather than stack a new sentence): *"note the values ... in the register panel, and write down each one — you'll compare it against the second run's."* No other addition needed; this is cheap enough to fit inside the existing sentence.

**3. [MINOR] "Run" is a new interaction mode, introduced without contrast to "Step"**
Every earlier embed (ch-intro-blinky, ch-switches) teaches watching registers via **Step**, one line at a time. This paragraph switches to **Run** (execute to the `while(1)`) with no acknowledgment that it's a different mode from the one already taught. Not necessarily wrong, but worth one displacing clause rather than a silent switch — e.g., replace "Run the program" with "Run the program to completion (unlike Step, which you used earlier to watch one line at a time)" — only if room; otherwise leave as is and let the UI itself disambiguate, since word budget is tight (B-18).

**Not flagged, checked and clear**: `1U`, `<<`, `~`, `|=`, `&=`, `_Msk`/`_Pos`, `main(void)`, `while(1)`, and `return 1;` are all taught before this point (ch-intro-blinky and the subsection immediately above `act-macros-rewrite`), and the file's `return 1;` matches B-14. The prose does not give away the three tasks' specific macro names — stating that the raw and macro versions must produce identical registers is new pedagogy about *how to verify*, not the activity's answer.

Files: `/Users/dz00762/repos/ENGS28/source/ch-transistors.ptx` (subsec-stm32-macros, act-macros-rewrite, lines 459–601), `/Users/dz00762/repos/ENGS28/assets/sim-starters/macrosRewrite.c`, proposed prose in the scratchpad file.
