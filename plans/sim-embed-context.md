# Putting the board simulator into a chapter — shared context

Read this first, then the prompt for the specific day. Everything here was
learned the hard way across the Day 7, Day 8 and Day 9 embeds; none of it is
obvious from the repos.

## The two repos and the one command that matters

The simulator is `~/repos/ENGS28-board-sim`; the book is `~/repos/ENGS28` and
carries a **built copy** at `assets/board-sim/`. Editing the simulator does not
change the book until you sync.

```bash
cd ~/repos/ENGS28-board-sim && npm run check      # five scripts, ~2 min
cd ~/repos/ENGS28 && ./scripts/sync-board-sim.sh
./scripts/build-all.sh                            # NOT ./build.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
python3 scripts/check_instructor_only.py
```

`./build.sh` alone refreshes the reading book and leaves the preview, the decks
and the instructor targets on the old simulator.

## Where facts come from

**RM0490** (`assets/stm32c031_rm.pdf`, PyMuPDF reads it) for registers. But the
bigger unlock, and the thing nobody had used before: **the real CMSIS header
and the real startup file are on this machine.**

```
~/Documents/ENGS28Code/ES28W25/Library/chipheaders/Device/stm32c031xx.h
~/Documents/ENGS28Code/ES28W25/workspace/Blinky/Startup/startup_stm32c031c6tx.s
~/Documents/ENGS28Code/ES28W26/workspace/TemplateProject/         (build flags)
```

They are authoritative for symbol names and values, and they settled two
questions that had been open in review for weeks. Where the manual and CMSIS
disagree, CMSIS wins, because it is what student code is compiled against.

Also settled and worth knowing: **the students' Debug build is `-O0`**. A
missing `volatile` does not reproduce on the build they actually run; at `-Os`
GCC reads the flag once and emits `b .`, a hard hang. The chapter states the
consequence unconditionally in three places, which is still open with Petra.

## The rule that governs every embed

**The simulator must not hand a student an answer the chapter asks them to
work out.** This has nearly gone wrong every time. Check every message a new
peripheral can emit, every starter header, and every dropdown label against
what the day's activities ask. On Day 7 the pot's attach message named the ADC
channel, which is exactly what the homework exists to make students derive.

Related: read the activities BEFORE the reveal slides. Several chapters have a
predict-then-look-it-up beat (`act-timer-rcw0-lookup`, `act-gpio-fpr-predict`)
and the window must not pre-empt the prediction.

## Prose goes through a committee gate before Petra sees it

Non-negotiable, and skipping it is what has made her angriest. For an embed:
`checker-voice` and `checker-technical-accuracy` scoped to the new text, plus
one learner agent chosen to match the day. Reports to `reviews/dayNN-sim-*.md`.

They earn their keep. On Day 8 the technical checker caught a blocker (a claim
about the board that was the opposite of what a Cortex-M0+ does) and a real
model bug (`TIM14_ARR` resets to `0xFFFF`, not 0). On Day 9 it caught a lost
button press. The voice checker has, both times, caught wording Petra had
already written that had been reinvented — always search her starters, slides
and prose for the sentence before writing a new one.

Collect the new text into one scratch file and hand the agents that path;
persist the final version to `reviews/dayNN-sim-proposed-prose.md`.

## House rules that bite

- **L-11: never name a day as the name of a topic** in student-facing text.
  "the switch you wired on Day 3" fails `check_rules.py`. Say what it was.
- No em dashes, whole sentences, American spelling, no anthropomorphism.
- A slide caption is not for content; it renders tiny and centred.
- Mirror both surfaces: if a claim appears in the book and on a slide, fix
  both.

## The `<sim>` element

```xml
<sim starter="name"/>                                  assets/sim-starters/name.c
<sim starter="name" coolterm="yes" height="740"/>      if the program prints
```

Placement convention, from Day 7 and followed since: **prose paragraph, then
`<sim>`, then the slides.** After the activity and any troubleshooting ladder.

A sim-starter is Petra's file from `assets/starters/` with the header comment
rewritten narrow (~40 columns) for the embed. **The code below the header must
stay byte-identical**, and `scripts/check-starters.mjs` in the simulator repo
enforces that, plus that a dropdown entry naming a sim starter IS that file.
It caught live drift on its first run; expect it to catch yours.

The examples dropdown is ordered by day. Student entries go in `examples.ts`;
anything that answers something students must work out goes in
`examples-instructor.ts` and is labelled `Solution: …`.

## Verifying

- **Measure in headless Chrome, never the editor's Browser pane.** The pane
  suspends layout when hidden: it reports a clipped label as clean and a
  working element as invisible, and it answers 0 for every height. Both
  `scripts/check-ui.mjs` and `scripts/deck_fit.mjs` drive Chrome over raw CDP
  for this reason.
- **Verify the embed from the BUILT book**, not just that the XML compiled.
  Serve `output/web` with `python3 -m http.server` and drive the iframe. Twice
  now that has been the step that found something.
- Add a guard for whatever you fix. Every guard in `check-ui.mjs` exists
  because a defect reached Petra.

## Small traps that cost time

- `rsync --exclude` also *protects* an existing destination copy from
  `--delete`, so excluding a file does not remove the one already there.
- This shell is **zsh**, which does not word-split unquoted variables. A
  `for … set -- $spec` loop silently produces empty arguments; use bash.
- Chrome ignores `clip` on `Page.captureScreenshot` when
  `captureBeyondViewport` is set.
- A starter that deliberately does not compile (Day 9's empty `if ( )`) is
  fine, but say so in the header before the student clicks Run.
