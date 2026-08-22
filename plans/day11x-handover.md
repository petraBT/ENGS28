# Day 11x — handover

State as of 2026-08-20, after the Gate 3 list was applied, its two structural
items closed, and Petra's first round of notes on the finished deck applied.
Everything needed to finish Day 11x is here or in the files it names, so the work
survives a context reset.

## Where the unit is

Delivery 1 (slides, figures, activities, deck) — **done, and Petra passed it**
with 11 notes and 6 hand edits, all applied.
Delivery 2 (the in-class prose) — **written**, Parts 1–5, and the driver listing
is in the book prose as she asked.
Gate 1.5 (voice probe on Part 1) — done, applied: `reviews/day11x-gate1_5.md`.
Gate 3 (the deck's committee, 7 reviewers) — done: `reviews/day11x-gate3.md`,
ending in a 26-item consolidated change list.

**The Gate 3 list is applied.** Items 1–26, except the one she declined. Two of
them resolved differently than the reviewers proposed, both recorded below with
the measurement that decided it.

`build-all`, `check_rules`, `check_deck` and `check_starters` are clean, and all
34 deck slides measure **fits** at 1600×900 with the crossfade killed and no
clipped code. Measure without `?notes`: presenter notes are part of the body, so
a sweep run with them showing reports several hundred px of overflow on slides
that fit.

**Nothing is left before delivery 2 goes to her.** The next thing that happens is
**Petra, pass 2 — she passes the deck** (`CHAPTER_PROCESS.md`, step 13).

## Petra's decisions, 2026-08-19

1. ~~**Apply everything in the Gate 3 list except the CCMR1 split.**~~ —
   **SUPERSEDED 2026-08-20.** She made the split herself and dropped
   `fig-ccmr1-oc1m.png` and `fig-ccmr1-cc1s.png` into the images folder: the same
   bit map twice, once with OC1M boxed and once with CC1S. The reveal is now two
   slides, each carrying the manual's own wording as slide text beside its own
   bit map, so **the legibility finding is resolved rather than accepted** — no
   text on either slide is below the ≥2% rule. Her dense combined page
   (`fig-ccmr1-oc1m_cc1s.png`) stays in the book, where reading distance is a
   laptop and not a projector.
2. **Never point out in writing that there is no hardware today.** Not a rephrase —
   the observation itself goes. This is broader than the one sentence: do not tell
   these students what a day does *not* involve.
3. **Restore the driver listing to the book prose.** A program living only on the
   wall is not acceptable.

## The two items that resolved differently, and why

- **Item 21, "merge `sl-day11x-init-pin` into `sl-day11x-init-timing`"** — three
  reviewers asked for it independently. **It does not fit.** Merged and set side by
  side at 47%, the two listings clip **149 px and 99 px across** and the body runs
  **81 px past the slide** (1600×900, transitions killed). The lines that clip are
  the driver's own — `GPIOA->MODER |= GPIO_ALTERNATE << GPIO_MODER_MODE7_Pos;` and
  its neighbours — so B-6 leaves no lever, and shortening comments does not reach a
  55-character line of code. **The minute is taken instead**: the two slides stay,
  marked as ONE beat, at 30 s + 90 s against the 3 minutes they used to hold. The
  source carries this reasoning as a comment above the pair, so it is not
  re-attempted.
- **Item 21, "fold `inst-day11x-bitfields` into the register walk"** — removing its
  deck entry is what `check_deck.py` exists to catch: *"instructor-only in the
  source, but no deck refs it"*. Every instructor block in this book projects. So
  the fold is by **timing**, not deletion: the register walk and its answer slide
  are one 2-minute beat (1 + 1), and both notes now say so.

## The clock, recomputed

Gate 3 found the day to be a 58–60 minute plan misfiled as 50, mostly because four
beats carried no time in any file. **Every beat is now timed**, so the arithmetic
is auditable end to end:

| Part | Budget | Sums to |
| --- | --- | --- |
| 1 | 4 | 4 |
| 2 | 14 | 14 |
| 3 | 8 | 8.5 |
| 4 | 15 | **17.5** (was 21.5 honestly counted, 17.5 with four beats invisible) |
| 5 | 5 | 6 |

**52 against 50**, and Part 3's register-map slide is marked in its own note as the
pressure valve — cutting it closes the gap exactly. Part 4's stretch activity is
explicitly *no class time*.

Where the four minutes came from: the register walk and its answers 4 → 2; the two
init slides 3 → 2; the Lab 6 seam 3 → 2, read off the bullets rather than discussed.

## Her round on the finished deck, 2026-08-20 — applied

- **The decode activity and the slide after it named different registers.** The
  activity asks about CCMR1, CCER and CR1; the slide showed CCER, CR1 and EGR.
  The slide is now CCER and CR1 — *"two of your three answers"* — and CCMR1 is the
  two slides that follow, so the three slides cover exactly the three questions.
  EGR keeps its bit map in the book and loses the wall, where it was a fourth
  register nobody had been asked about.
- **Her CCMR1 split, applied** (see decision 1 above).
- **"Name the register" had an (a) and no (b).** The single `<task>` is now the
  activity's `<statement>`, so neither the book nor the wall prints a label.
- **Its table was full-slide wide.** A `<tabular>` inside a projected activity
  cannot carry declared column widths (`AUTHORING-slides.md`), so the checkpoint
  now has its own `<slide>` block: 62/38 columns inside a `<sidebyside widths=
  "66%" margins="17%">`. The deck refs the slide; the book keeps the activity.
- **Projected `<xref>`s are gone from every deck.** Not from the source — the
  book needs them, and most of them live in activities the deck refs by their own
  `xml:id` — but rewritten in the player: `dexref()` in `assets/class.html` drops
  the whole parenthetical for "(Figure 11.2.12)", drops the link where a naming
  word already precedes it ("as in picture Figure 10.1.2"), and otherwise puts the
  noun where the number was ("placed as in the figure"). Eleven of them, across
  six decks.
- **The video sound: not ours to fix.** The embed is not muted and the player adds
  no `mute` — asked over YouTube's iframe API on the Day 11 slide, it answers
  `muted: false, volume: 100`. But YouTube's own metadata reports `loudnessDb:
  -9986` for **both** videos (`MuDX2vrNV3Q`, the TTmotorRamp capture, and
  `VH0-zO2LpDc`), which is its sentinel for a digitally silent track. The uploads
  carry an audio stream with nothing in it, so the motor cannot be heard however
  the embed is configured. **Re-uploading the capture with its audio is the fix,
  and it is hers.** Nothing in the book or the player needs to change for the
  sound to arrive once it does.

Two player bugs surfaced while checking her notes, both fixed and both affecting
every deck:

- **A note written on the deck entry never reached the wall.** `presenterNote`
  rendered for glue slides only, so on a `ref` slide it was dead text — and an
  `<activity>` or an `<instructor>` block cannot carry a `<slide>`'s `<note>`, so
  that was the only place their notes could live. Day 11x had four, all written to
  make its clock auditable, and none of them projected under `?notes`.
- **`room="yes"` put its writing space after the LAST item too**, against the
  bottom of the slide where it buys nothing and counts as overflow. The bullet
  list had a `:last-child` exception since it was written; the numbered list did
  not. Her fourth question on the Part 2 slide put it 18 px over with 65 px of
  empty space underneath — the fix is the exception, not shorter questions.

## Her second round, 2026-08-20 — applied

- **CC1S arrived unannounced.** Nothing named it before it appeared on the second
  CCMR1 slide. It is now **task (d) of the decode activity** — the same register as
  task (a) and a second field of it, asking which bits CC1S is, what `00` selects,
  and why the driver writes a field whose default is already the value it wants.
  The answer is the one the CC1S slide was already carrying: `00` is the reset
  value, so on a fresh chip the pair changes nothing, and it is written anyway
  because a driver does not get to assume what ran before it — after a soft reset,
  or after a program that used the channel as input capture, CC1S would not be `00`
  and the pin would never drive. The CC1S slide is now that task's reveal, and the
  answers in `inst-day11x-bitfields` run in task order.
  The activity stays capped at 2 minutes: (d) is the short one.
- **The checkpoint table had no right-hand rule**, so the answer column ran off
  into white space. It is now built exactly like Day 11's
  `act-day11-speed-params` table, which is the house form for a fill-in:
  `top="major" bottom="major" left="minor" right="minor"` on the tabular, a
  `bottom="major"` header row, `bottom="minor"` on every data row but the last,
  and the answer column `halign="center"`. The book's copy of the table is the
  same markup, so the two do not diverge.

## Her review rounds of 2026-08-21 — applied

Twelve comments through the circle-and-comment queue, all applied and archived in
`reviews/slide-comments-archive.jsonl`: nine on the deck (Reference Manual naming,
the CC1S bullet, naming what each piece of the init accomplishes, the table
divider, and the L-13 rewrite of "Lab 6 asks…"), then three more (her opening
sentence for Part 1, and naming `TTmotor_ramp.c` instead of "the program we are
about to read", in both slides and the Part 2 paragraph).

Two rules came out of them and are now in `AUTHORING-book.md`: **L-13** (a
document does not act on a student) and **L-14** (say Reference Manual when the
section number is RM0490's).

## Still open with her, not blocking

- **What is the driver file called?** She wrote **`TTMotor_Ramp.c`** twice in
  review. The book uses `TTmotor_ramp.c` — the actual name of the file in
  `assets/starters`, the name both her own Day 11 and Day 11x decks use, and the
  spelling of all sixteen references in the chapter (`TTMotorRamp` appears in her
  Day 11 deck only as the title of the screen capture). Left as `TTmotor_ramp.c`
  pending her ruling. If she wants the rename, it is one pass: the file, the
  sixteen references, and `scripts/check_starters.py`.

- Play the closing video once to confirm the "30 → 180 rpm" claim (a video renders
  black in a still, so no reviewer could check it) — and see the sound note above
  while you are in there.
- `fig-pwm-scope.png` still lives in `Day11-Motors/` and Day 11x is now its only
  slide user. **Noted in the source** at `fig-pwm-scope-still` rather than moved:
  Day 11's Gate 2 left a re-crop of that file open with her, and a re-crop made
  "for Day 11" would silently change Day 11x's prediction slide. Moving the file is
  hers to decide.

## Standing facts for this day, so they are not re-derived

- **50 minutes**, Wednesday x-hour. Parts budgeted to 46; the other 4 are settling
  and transitions.
- **No pre-class reading.** The in-class section is the whole of it.
- The driver is `assets/starters/TTmotor_ramp.c`; both quoted functions are
  registered in `scripts/check_starters.py`, which accepts a **tuple of markers**
  for one function split across several listings. It resolves a marker to the
  **first** `<program>` block containing it — the prose listings, which come before
  the slides in the file — so slide edits cannot break it.
- Her deck is 4:3 and the player 16:9, so her full-slide exports letterbox. That is
  expected, not a defect.
- Petra's preview servers are `./preview-edit.sh` (book, 8931/8932) and
  `./preview-slides.sh` (deck, 8352). **`build-all` needs them stopped** — a running
  `http.server` holds `output/` — and they must be restarted afterwards or her
  teaching dashboard goes dark. Their watchers rebuild the pages on a `.ptx` save
  but do **not** refresh `output/*/external/`, so a deck JSON edit needs a real
  build before the player sees it.
- An XML comment cannot contain `--`. Use an em dash; the build fails with
  *"Double hyphen within comment"* otherwise.

## Voice rules this day added, beyond AUTHORING-book.md

- No asking a student to **"say"** something — *describe*, *work out*.
- No figurative verbs for what the class did with a component: not "we drew", not
  "we met". Her own forms: "As we saw in the reading", "the function we wrote on
  Day 10", "the same timer we set up on Day 8".
- No stating what the day does **not** involve (above).
