# Day 6 simulator — scoped committee gate, synthesis

Three reports on the embed in "Rewriting with Macros" (`act-macros-rewrite`,
`ch-transistors.ptx`): `day6-sim-technical.md` (BLOCKER), `day6-sim-voice.md`
(MAJOR), `day6-sim-learner.md` (MAJOR, learner-python-intro). Final text in
`day6-sim-proposed-prose.md`. A narrow confirmation pass by both checkers ran
on the revised text: technical MINOR (all claims true, blocker fixed), voice
MINOR (two rewrites, both applied).

**Integrated.** `<sim starter="macrosRewrite" height="740"/>` follows the
activity, before `sl-day6-moder`, with two paragraphs above it (the second is
the house save/Full-screen sentence, verbatim). The seed is the activity's
`<introduction>` listing, unchanged, inside a `main()`.

## The blocker: a match proves the bits, not the names

The draft said reading cannot confirm a rewrite "because a macro that names the
wrong field looks just as plausible on the page as the right one", which
implied running it can. It cannot always: `GPIO_PUPDR_PUPD5_Pos` is 10, the
same as `GPIO_MODER_MODE5_Pos`, and `GPIO_PULLUP` is 1, the same as
`GPIO_OUTPUT`. Those two sit side by side in the chapter's own figure. So
`GPIOB->MODER |= (GPIO_PULLUP << GPIO_PUPDR_PUPD5_Pos)` lights the LED with
every register identical. The prose now says so plainly: matching values show
the right bits, not the right names, and it gives that example. `MODER` is
the register where the check has teeth, because it resets to all ones.

## A defect the learner found, in the simulator

The learner asked whether Run resets the board. The honest answer was worse
than the question. The seed parks in `while (1)`, so Run is disabled while it
runs. The student then presses Pause, edits and presses Run, and **Run resumed
the old program**: the panel went on showing the raw version's values under
the new text, and any rewrite appeared to match. Fixed in
`src/main.ts`. Once the editor differs from the loaded program, Run and Step
are enabled and start the edited text from reset. Guarded in `check-ui.mjs`
guard 14 (Run after edit, Pause-edit-Run, Step after edit, all in one page).
This affected every embed, not just this one.

## Also applied

- **Missing CMSIS spellings** (technical). `RCC_IOPENR_GPIOBEN_Msk`,
  `GPIO_MODER_MODE5` (bare), `GPIO_MODER_MODE5_0`/`_1`, `GPIO_ODR_OD5_Msk`/`_Pos`
  all stopped with "not defined", and task 2 is open-ended. `device-header.ts`
  now generates the full CMSIS set for every GPIO field and `RCC_IOPENR` bit.
  New guard `scripts/check-header.mjs` compares all 607 names against
  `stm32c031xx.h` both ways. It fails 396 of them against the old header.
- **Header said "the macros the activity names"** (technical, voice). The
  activity leaves the IOPENR macro for students to find. Now "as the
  activity's three tasks ask".
- **"write exactly the same bits"** (technical, voice). The raw version makes
  three MODER writes and the macro version two; only the final values match.
  Reworded to final values.
- **Write the values down** (learner). The second run replaces the first
  run's values on the panel.
- **Opening** reuses the house "seeded with … so that it runs" (voice).
- **Height 740**, measured in headless Chrome on the built book: at the default
  660 px `GPIOB->ODR` is below the register panel's fold.

## Not applied, and why

- Learner 3 (contrast Run with Step): the UI disambiguates it, and it would
  add a clause (B-18).
- Technical: "CMSIS macros" is loose, since `GPIO_OUTPUT` is ES28.h. The
  activity's own wording is the same, so it was left alone.

## Open, for Petra

1. **Pre-existing caption, `fig-moder-macros-ref`** (`ch-transistors.ptx:501`):
   "CMSIS macro naming conventions for common GPIO configurations." The image
   is `ES28.h`'s own `#define`s (`GPIO_INPUT` … `GPIO_AF15`). Those are not
   CMSIS, and the image shows no `_Pos`/`_Msk` pattern. **DONE (2026-09-25),
   at her request:** the caption now says it shows the `ES28.h` GPIO constants
   (MODER modes, PUPDR pull settings, AF0 to AF15), that they are not CMSIS
   names, and that each is shifted into place with a CMSIS `_Pos`. Checked by
   `checker-technical-accuracy` (OK, one MINOR wording point applied). The
   figure has no slide, so there was nothing to mirror.
2. **The student dropdown already carries task 2's answer.** The Day 9 entries
   (`counterResetButtonPolled`, `counterResetButtonInt`) contain
   `RCC->IOPENR |= RCC_IOPENR_GPIOBEN;`. Task 2's hint makes it a one-step
   analogy from the UART driver anyway, so the impact is low. Removing those
   entries would cost Day 9 its embed seeds. **Her ruling (2026-09-25):
   keep as is.**
