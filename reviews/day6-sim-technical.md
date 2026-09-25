# Day 6 simulator embed — checker-technical-accuracy

### Verdict: BLOCKER

The values, the pin and the code are all correct. The blocker is the argument in the new prose. The check it offers cannot catch the exact mistake the prose says reading will miss.

### Findings

**1. [BLOCKER] [B1/B2] The prose sentence and header lines 21–25: "Reading the code cannot give you that confirmation, because a macro that names the wrong field looks just as plausible on the page as the right one."**

The sentence implies that running the program catches a wrong-field macro. That only holds when the wrong field sits at a different bit position. The likeliest wrong field is the right pin in the wrong register, and those macros have the same values:
- In CMSIS `stm32c031xx.h` (lines 2579/2793), `GPIO_PUPDR_PUPD5_Pos` is 10, the same as `GPIO_MODER_MODE5_Pos`. The `_Msk` values match too, and so do the `OSPEEDR` ones.
- `GPIO_OTYPER_OT5`, `GPIO_BSRR_BS5` and `GPIO_IDR_ID5` all equal `GPIO_ODR_OD5` (0x20).
- `GPIO_ODR_OD1` equals `RCC_IOPENR_GPIOBEN` (0x2).
- `GPIO_PULLUP` is 1 (ES28.h:26), the same as `GPIO_OUTPUT`. Both appear side by side in the chapter's own figure `slide14_img1.png`, which I viewed.

The simulator defines all of these names (`device-header.ts:183–195`, `:126–130`). So `GPIOB->MODER |= (GPIO_PULLUP << GPIO_PUPDR_PUPD5_Pos)` lights the LED and leaves every register identical. The check passes on a wrong answer.

Two `=`-for-`|=` rewrites also pass falsely. RM0490 p.129 gives `RCC_IOPENR` a reset value of 0x0000 0000, and p.156 gives `GPIOx_ODR` 0x0000 0000. The simulator matches (`rcc.ts:73`). So `RCC->IOPENR = RCC_IOPENR_GPIOBEN;` and `GPIOB->ODR = GPIO_ODR_OD5;` give the same values as the correct `|=` lines.

`MODER` is the one register where the check has teeth. It resets to 0xFFFF FFFF (RM0490 p.154; `stm32-defs.ts:45`), so dropping the clear, using `=`, or mixing up `_Pos` and `_Msk` all show up.

**Fix:** state it as a necessary check, not a sufficient one. For example: "If the LED stays dark or a register changes, your rewrite is wrong. If they all match, you have the right bits but not necessarily the right names: `GPIO_PUPDR_PUPD5_Pos` is also 10, so check each name against the register it is written to." Make the same change in the header comment.

**2. [MAJOR] [B-6 simulator vs CMSIS] "if your rewrite is right the LED lights."**

Several names that are valid CMSIS are missing from the simulator, so a correct rewrite that uses them stops with "`X` is not defined." (`interpreter.ts:575/739`). The missing names are:
- `GPIO_MODER_MODE5` (CMSIS 2581)
- `GPIO_MODER_MODE5_0` and `_1` (2582–2583)
- `GPIO_ODR_OD5_Msk` and `_Pos` (2915–2916)
- `RCC_IOPENR_GPIOBEN_Msk` and `_Pos` (4288–4289)

`device-header.ts` defines only the `_Pos`/`_Msk` pair for MODER, only the bare name for ODR, and only the bare name for IOPENR. Task `task-macros-iopenr` is open-ended, so `RCC_IOPENR_GPIOBEN_Msk` is a correct answer that the simulator rejects.

**Fix:** add the CMSIS triplets (bare, `_Pos`, `_Msk`, `_0`/`_1`) to `device-header.ts` for these fields. CMSIS wins.

**3. [MAJOR] [B-3 accuracy] Header lines 18–20: "replace the raw constants with the CMSIS macros the activity names."**

The activity does not name the IOPENR macro. `task-macros-iopenr` asks the student to find it. The sentence is wrong, although it does not give the answer away.

**Fix:** "with CMSIS macros, as the activity's three tasks ask."

**4. [MINOR] "The two versions write exactly the same bits."**

They do not perform the same writes. The raw MODER sequence makes three writes (0xFFFFF7FF, 0xFFFFF3FF, 0xFFFFF7FF) and the macro version makes two (0xFFFFF3FF, 0xFFFFF7FF). What is true is that they leave the same final values.

**Fix:** "leave exactly the same bits in all three registers."

**5. [MAJOR, pre-existing, outside the draft] [figure caption] `ch-transistors.ptx:501`.**

The caption reads "CMSIS macro naming conventions for common GPIO configurations. The same pattern extends to every peripheral register." The image shows ES28.h's own `#define`s (`GPIO_INPUT` through `GPIO_AF15`), which are not CMSIS, and it shows no `_Pos`/`_Msk` pattern. This matters here because it is the figure a student will use for the rewrite.

### Verified correct

- **PB5 is D6.** The user manual (p.20, CN9 pin 7) shows "PWM/D6, ARD_D6, PB5", and `pinmap.ts:35` has `{label:'D6', port:'B', bit:5}`. The pin number "CN9 pin 7" in the draft's notes is right.
- **Macro values** are the same in CMSIS, ES28.h and the simulator: `MODE5_Pos` is 10, `MODE5_Msk` is 0xC00, `RCC_IOPENR_GPIOBEN` is 0x2, `GPIO_ODR_OD5` is 0x20, `GPIO_OUTPUT` is 1.
- **Seeded code.** Lines 31–40 match the activity listing at `ch-transistors.ptx:515–524` exactly. The file is byte-identical to the `examples.ts` entry. It ends with `return 1;` as B-14 requires (the other seven starters use `return 0;`, which is a separate, pre-existing B-14 issue). It uses only constructs the README says the interpreter supports.
- **Register values** for the raw version and `sl-day6-macros-solution` are identical: IOPENR = 0x00000002, MODER = 0xFFFFF7FF, ODR = 0x0020. The solution slide is correct CMSIS, and it lives only in `examples-instructor.ts`.
- **Register panel.** It always shows `RCC->IOPENR` and the MODER of any clocked port, and it shows ODR once ODR has been written (`register-panel.ts:151,195,230`). So the three registers the prose names will all be visible.

### Reasoning (Part B)

- **[B1 rule vs. own example]** The rule "running it confirms it; reading can't" is refuted by the section's own figure. That figure puts `GPIO_OUTPUT 1` and `GPIO_PULLUP 1` next to each other, and they are indistinguishable at run time (finding 1).
- **[B2 arithmetic]** I recomputed the MODER sequences above. Both reach 0xFFFFF7FF, and each step is correct. No other arithmetic.
- **[B3 self-contradiction]** Nothing in the new text contradicts the chapter. `ch-transistors.ptx:491` says "names are checked by the compiler" and the draft says a wrong name "looks just as plausible". These agree only if the reader understands that the compiler checks that a name exists, not that it means the right thing. The draft's implied promise that the simulator checks meaning is the overreach. The draft is consistent with the README's clock-gating claim (README:257–259, `gpio.ts:92`): a rewrite that drops the IOPENR line leaves the LED dark.
- **[B4 contradicts the book]** The IOPENR hint points to `ch-uart.ptx:688`, `RCC->IOPENR |= RCC_IOPENR_GPIOAEN;`, and the solution follows the same pattern. Consistent.

### Hand-over check (item 7)

Nothing in the new prose, the starter header or the dropdown label gives away any of the three answers. The dropdown `needs` text only says to attach the LED.

### Unverified

None left open. Everything above was checked against CMSIS, RM0490, the user manual or the simulator source.
