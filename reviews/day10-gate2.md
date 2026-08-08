# Gate 2 — Day 10, `sec-i2c-day10` in `source/ch-i2c.ptx`

Day 10 is a section of a chapter, not a chapter. It shares the Reference
section, the figures and the voice of Day 9x, which sits in the same file and
has been through Petra's hand and a full sweep as of 2026-08-08. Day 10 has
not.

---

## 0. Triage of `reviews/day9x-day10-gate2.md` (5 Aug, commit `9b1a75c`)

That report was written against a **50-minute Day 9x and a 65-minute Day 10**.
Commit `1621633` (6 Aug) then moved open-drain, `I2C_TIMINGR`, the five library
operations and `i2c1_byteWrite()` out of Day 9x into Day 10 as Parts 6a/6b/7a/7b,
and commit `a8deb5a` (8 Aug) cut the Arduino material. Day 10 is now 110 minutes.

**So every load, timing and sequencing finding in that report is void for Day 10**
— it was computed against a budget and a neighbour that no longer exist. Its
factual findings mostly survive, and most of them have already been applied.

Each finding below was checked against the file as it stands, not against the
report's own claim about it.

### Findings that are still LIVE

| Finding | Owner | Where it stands now |
| --- | --- | --- |
| `act-i2c-ai-review` is a design AI can complete outright | `learner-ai-reliant` | **Partly applied.** `act-i2c-ai-t0` now demands a stopwatch measurement of the student's own program, and `-t2` requires one criticism justified from their own `PSC`/`ARR`. That is the reviewer's own proposed redesign, so the blocker as written is answered. What is *not* answered: t1, t3 and t4 remain generic code-review prompts, and the five reveal paragraphs are still all findable from the listings alone. Re-judge at Gate 2, do not assume. |
| `act-i2c-five-operations` has one canonical answer | `learner-ai-reliant` | **Partly applied.** `-t1b` now ties the list to the student's own capture. `-t1` and `-t2` are still the outsourceable half. |
| `SevenSeg.c` vs `SevenSegPartial.c` | `expert-continuity-auditor` | **Mostly fixed, one live residue.** The rename instruction now exists in two places — `act-i2c-homework`'s introduction ("rename the pair you just finished … and move both into your `mylib` folder"), and the header comment of `assets/starters/SevenSegPartial.c` itself. So the open question is answered: **the student renames**. What is still wrong is Part 8a, which calls the file `SevenSeg.c` in both the prose and `sl-day10-layers-rule` — 40 minutes *before* the rename happens. Fix Part 8a, not the naming. |
| Day 10 Part 2 has no equipment fallback for a dead display | `expert-class-logistics` / `learner-anxious-nonhardware` | **Live.** Part 2 and `sl-day10-verify` both end at "flag it now rather than at minute 90" — better than "re-seat the wires", but there is still no statement of what flagging gets you. `sl-day10-ladder` does have the S-17 ending. Needs Petra: is there a known-good backpack in the room? |
| Neither day's cut list lives in the chapter itself | `expert-class-logistics` | **Live**, but re-scoped: it is now one presenter note on `sl-day10-ai-gemini`, and that note is stale (see §1). Folded into the re-timing. |

### Findings that are FIXED — verified in the current file

| Finding | Evidence |
| --- | --- |
| BLOCKER: "a powered display lights up" contradicts the HT16K33 reset state | Part 2 now flashes `helloDisplay.c`, which sends the oscillator-on command, so "blank ⇒ wiring" is true as written and no longer contradicts Part 8b. |
| BLOCKER: `fig-segment-map` missing the E and F labels | Redrawn, commit `27b4f33`. |
| BLOCKER: `fig-ht16k33-cmd-table` image 1 lacks the System setup row | Image is now `ht16k33_cmd_pointer_system.png` — pointer *and* system rows. |
| BLOCKER: "20 ticks LOW and 16 HIGH is 10 µs" | Corrected to 9.0 µs with the `t_SCL` footnote. *(Moot for class — Part 6b is cut; the corrected text moves to Reference.)* |
| BLOCKER: "5 V on a signal pin is outside what the chip is rated for" | Claim is gone from the chapter. |
| BLOCKER: the Arduino headers do not carry this course's UART | Reworded to "22 pins in total, and one of those is already committed to the potentiometer". |
| MAJOR: `I2C_TXDR`/`RXDR` cited §23.7.11–12 | Now §23.7.10–11. |
| MAJOR: `RCC_APBENR1` cited §5.4.15 | Now §5.4.13. |
| MAJOR: "NBYTES counts the transfer down" | `fig-i2c-master-tx` caption now says NBYTES *holds* the programmed count. |
| MAJOR: STOP after a NACK attributed to AUTOEND | Part 9 now quotes §23.4.9's unconditional NACK handling instead. |
| MAJOR: `fig-i2c-hardware` "address-match unit" | Caption now says *wake-up on address match*, with the reason we never use it. |
| MAJOR: `fig-display-ram-map` "one per digit, plus the colon" | Caption now says COM0…COM7, eight common lines, of which our display uses five. |
| MAJOR: open-drain has no figure | `fig-open-drain` exists, with a predict beat on `sl-day9x-opendrain` before the reveal. |
| MAJOR: the pull-up value is asserted, not explained | The squeeze-from-both-ends argument is now in Part 6a prose *and* on `sl-day9x-opendrain-more`; `subsec-i2c-ref-opendrain` carries the arithmetic. |
| MAJOR: half brightness depends on a rule only in Reference | The `(7+1)/16` step is now worked on `sl-day10-cmd-answer` and in the Part 4 reveal. |
| MAJOR: "duty cycle" used three times, never defined | Glossed inline in `fig-ht16k33-cmd-table`'s caption. |
| MAJOR: the "no timeout, ever" habit is never generalized | `subsec-i2c-ref-library` now generalizes it and connects it explicitly to the stuck-LOW case. |
| MINOR: the address-conflict failure mode is only in a quiz distractor | Now in the teaching prose. |
| MINOR: "prose says minute 50, slide says minute 48" | Neither string remains. |
| MINOR: `act-i2c-timingr` is proportional extrapolation | `-t5` added the AD2 measurement. *(Moot — Part 6b is cut.)* |
| MINOR: the duplicated 0xE0 address question | Cut; `act-i2c-wrong-address` runs t1, t4, t5, t6. |
| MINOR: `act-i2c-sevenseg-t3` asks for unscaffolded recall | Now points at the student's own `writeFirstDigit.c`. |

### Findings that are VOID

| Finding | Why |
| --- | --- |
| BLOCKER: the `Wire.h` mapping contradicts the chapter's own hang | The Arduino material was cut on 8 Aug. Nothing left to contradict. The whole of `learner-arduino-veteran`'s report goes with it — that agent is retired (`.claude/agents/README.md`). |
| MAJOR: Part 6 is eight-plus new named things in explain-only mode, 8 slides in 7 minutes | Computed against the 50-minute day. **Overtaken by Petra's own instruction**, which removes Part 6b entirely — see §1. |
| MAJOR: Day 10's 65 minutes have no slack | 65 is not the budget. |
| BLOCKER: Day 9x Part 4 stacks four first-time activities | Day 9x, and re-planned since. |
| Everything else scoped to Day 9x | `act-i2c-capture-t2`, `fig-backpack-pins`, `fig-display-wiring`, `fig-waveforms-setup`, `fig-i2c-scope-ack`, the Day 9x ladders, the Day 9x "Equipment:" line. Day 9x has since had Petra's hand pass and a full sweep. Not re-opened here. |

### Still unverified from that report, and still unverified now

- HT16K33 datasheet page numbers ("pp. 24–25", "p. 22") — the datasheet is not
  in the repo.
- The persistence-of-vision beat in Part 3: scan rate, whether the phone-camera
  or wave-it route actually works, and whether any display-to-backpack line is
  reachable once the backpack is seated. The prose is deliberately written to
  assert none of these; the `<!-- OPEN, for Petra -->` comment is still in place.
- Whether the room has a spare display or a known-good backpack.

**One item closed since.** The report could not verify `SevenSegPartial.h`'s
values, and therefore could not verify the Reference note that `SevenSeg_dim()`'s
`HT16K33_DISPLAY_CMD` term adds nothing. `assets/starters/SevenSegPartialORIGINAL.h`
gives `HT16K33_DISPLAY_CMD 0x80` and `HT16K33_BRIGHT_CMD 0xE0`, and
`0x80 | 0xE0 == 0xE0`. The note is correct: the term contributes nothing.
Blink constants check out too — `BLINK_1HZ 0x04` gives B1 B0 = 1 0, so
`0x81 | 0x04 == 0x85`, which is what Part 4's reveal claims.

---

## 1. Structural decisions taken before the committee ran

**Part 6b is cut**, on Petra's instruction of 2026-08-07 recorded in
`plans/week5-revision-9x-10.md` — *"Don't bother with timing settings — those are
way too complex. Focus on the I2C protocol instead."* Item 1 of that same list
(cut Arduino) was applied on 8 Aug; item 2 had not been. Confirmed live before
acting, because it runs against the 5 Aug committee's praise for the PRESC
derivation as the day's best datasheet moment. Her instruction wins; the
derivation is preserved in Reference rather than deleted.

**"Thursday" versus "tomorrow" is not a Day 10 question.** All 19 student-facing
instances are in Day 9x. The schedule, from Petra: Day *n* odd is Tuesday, Day
*n*x is Wednesday, Day *n* even is Thursday, and after an even day the next class
is the following Tuesday. Day 9x is Wednesday, so its "tomorrow" and its
"Thursday" both denote the same real day and both are correct. Day 10's own
forward references were checked against that schedule separately.

<!-- Reviewer reports are appended below, one section per reviewer, verbatim. -->

---

## `checker-voice` — BLOCKER (Gate 1.5 probe, Part 3 only)

*Scoped deliberately to `subsec-day10-display-hardware` — prose, both figure
captions, five slides, matching deck entries — with `sec-i2c-day9x` in the same
file as the reference specimen. Run before the sweep, so that the sweep knows
what it is sweeping for.*

### Register — is this her?

No. Part 3 is the un-swept half of the file, and the split is measurable:
`sec-i2c-day9x` (her hand pass, one thousand lines above) uses **"we'll" 34
times**; Part 3 uses it **zero times in 159 lines** and narrates the class's work
with bare imperatives instead ("Work out what that costs and what it forbids" —
where Day 9x's matching sentence is *"Next we'll work out what those two wires
carried"*, `source/ch-i2c.ptx:423`). On top of that: one S-20 violation in a
slide caption ("**Today is** the wiring behind them"), two S-21 armatures, two
epigram slide titles, a student-facing time budget of the exact kind she deleted
on Day 8, and the draft's signature tic — *"a question you have not been given a
reason to ask yet"* — used **three times** for the same question. The engineering
in this part is good and the two figure captions are correct, descriptive B-7
captions; the problem is entirely register, and it is systemic within the part
rather than local, which is the BLOCKER case.

To answer the scoping question directly: **yes, sweep all fourteen parts.** The
section introduction outside the probe's scope (`:1498`, *"Yesterday you used a
bus. Today you find out what you were using."*) is the same clipped contrastive
register as the Day 9x opening she rejected, so this is not confined to Part 3.

### Rewrites

- **[BLOCKER]** `:1844-1852` — S-13, opening on a fragment / deferred subject.
  Draft: *"From the reading: 34 LEDs, a grid, and a sweep fast enough to fool the
  eye. … What is left is the wiring behind them, and the answer to a question you
  have not been given a reason to ask yet: why does a display need its own
  chip?"* → Hers: *"You already know the segment names and the bit order they map
  to, because you wrote a digit's byte with them yesterday. Now we'll look at the
  wiring behind them: how 34 LEDs are reached with 14 pins, and why the display
  needs a chip of its own."* Because her Day 9x part openings are declaratives
  that say what we are doing (`:158`, `:422`). A verbless fragment is the
  register of ~~"Today: the two wires. Thursday: the chip at the end of them."~~
  ("From the reading" itself is fine — it survived her Day 8 pass as "The
  reading's example", `day8-voice-reference.diff:132`.)

- **[MAJOR]** `:1961` `sl-day10-segment-map` caption — **S-20**. *"Today is the
  wiring behind them"* → *"Today we'll look at the wiring behind them."*
  ("Yesterday's map" is fine — a possessive naming real coursework.)

- **[MAJOR]** `:1876` — S-13. *"Work out what that costs and what it forbids."* →
  *"We'll work out what that wiring makes possible and what it rules out."*
  Her own sentence one section earlier does the same job with "we'll" (`:423`).

- **[MAJOR]** `:1895-1899` and `:1986` — **S-21** + S-15 time budget. *"Two ways
  to catch it, and they take a minute between them"* / *"you can catch it, two
  ways, in about a minute"* → *"We can watch that happen. The display in front of
  you looks steady, but at every instant most of it is dark, and there are two
  ways to see it."* Two specimens at once: the S-21 armature, and the Day 8 pair
  ~~"you can find it in under a minute"~~ → **"The answer is in the Reference
  Manual (RM0490):"**. **Note the linter cannot see this** — L-8's regex is
  `in under (a|one) (minute|…)`, so "in about a minute" and "they take a minute
  between them" both pass.

- **[MAJOR]** deck slides 14 and 15 titles — **S-18**. *"One digit at a time —
  which is what the sweep is for"* → *"One digit at a time, and why the display
  is swept"*; *"Your display looks steady. It is not."* → *"Seeing the sweep:
  wave the display, or film it."* "which is what the sweep is for" is the "which
  is the whole point" family named in the specimen.

- **[MAJOR]** `:1928-1937` — the tic's third appearance plus a near-verbatim
  second telling of the reading. The rhetorical question is asked at `:1850`,
  again at `:1990`, and a third time here. Replacement supplied, dropping no
  technical claim; see the reuse section — her own sentence covers it and
  restores **multiplexing**, a `<term>` the reading defines at `:1157` and which
  never reappears in the part that is supposed to be its payoff.

- **[MAJOR]** `:1887-1889` — a sentence whose only content is a count. **DELETE**
  ("When a count is wrong, the lead goes" — she deleted ~~"Three things follow
  from sharing the wires"~~ rather than fix it). Nothing is lost: the identical
  decomposition is in the `fig-four-digit-wiring` caption three inches above and
  again on `sl-day10-grid-answer`.

- **[MINOR]** `:1884-1885`, `:1975` — contrastive epigram, in prose and on the
  slide. Replacements supplied from her own speaker note.
- **[MINOR]** `:1858`, `:1866`, `:1967` — S-12: `(COM)` is first used here and is
  expanded nowhere in the chapter. Add *"for common"*.
- **[MINOR]** `:1942`, `:1953` — S-12: `RC` appears nowhere else. Expand once.
- **[MINOR]** `:1968-1969` — drop the drum-roll connectives "So:" and "And then:".
- **[MINOR]** `:1980` — the count on two consecutive slides. Low confidence,
  flagged as a judgment call: her own old deck does state it on slides 32 and 33.

### Sweeps

- **Unit openings: 8 checked, 4 failing** — `:1845` (verbless fragment), `:1961`
  (S-20), `:1975`, `:1986`. Both figure captions pass and were left alone.
- **Slide titles: 5 checked, 2 epigrams.** The other three are names and are hers.
- **Weekday as grammatical actor: 1** — `:1961`. Every other day word in the part
  is adverbial or in an instructor `<note>`, and is correct. L-11 satisfied.
- **S-21 armature: 2 clear, 1 near.**
- **"we" in class-work sentences: 2 of 5 passing. "we'll": 0 occurrences in the
  whole part, against 34 in `sec-i2c-day9x`.** Every "you" describing what the
  student personally does is correct under S-13 and should stay.
- **Acronyms:** `COM` and `RC` unexpanded. Correctly expanded upstream and
  therefore *not* findings: `I2C` (`:128`), `SDA`/`SCL` (`:201-202`), `DP`
  (`:958`), `HT16K33` and `RAM` (`:1178-1179`).
- **Design scaffolding in student-facing text:** the two minute references only.
  No `Part N` in any `<p>`, `<li>`, `<caption>` or `<title>` in the part; budgets
  are correctly in `presenterNote`, pacing correctly in `<note>`.

### Already written — reuse instead of invent

- `:1884-1885` — hers, `Day10-I2C(2).pptx` slide 32 notes: *"So if I want to
  display a four-digit number I'll need to do the digits in sequence and sweep
  through them rapidly enough so that my eyes don't notice."* Plainer and
  first-person; take it.
- `:1936`, `:1990-1991` — hers, slide 33 body: *"That's why we use a controller
  driver: The four-digit display is wired to a 'backpack' that does the
  multiplexing and decoding, and interfaces to the processor via I2C."*
- `:1876-1886` — the two questions on `sl-day10-grid` are **already hers,
  verbatim**, from slide 32. Good reuse; keep exactly as is.
- `:1888-1889` — the 5-cathode/9-anode decomposition is hers, slide 33.
- `:1939-1946` and the `fig-ht16k33-block` caption — **the draft is better than
  her slide 34 notes**; it adds the power-up-oscillator-off fact. Keep it.
- The wave-it / film-it beat has **no counterpart anywhere in the old deck** — it
  is entirely invented.

### Escalated to Petra rather than ruled on

- **The persistence-of-vision beat is new material with three unverified
  claims**, which the draft's own OPEN comment states honestly. Whether it stays
  at all is hers — it has no precedent in `Day10-I2C(2).pptx`.
- **Which explanations earn expansion.** `sl-day10-pov` re-derives an argument
  the pre-class reading already makes in full (`:1150-1173`). S-14 says give the
  reason; it does not say whether a reading-then-class pair should re-derive or
  point. First Day 8 non-generalizable change — not guessed at.
- **`sl-day10-segment-map` is a caption-only recall slide** carrying yesterday's
  figure. Second non-generalizable change; ten seconds of recall looks right but
  no specimen settles it.

---

## `learner-in-the-room` — MAJOR (pre-rework deck walk)

*Walked in projection order, 62 slides, after the Part 6b cut so it would not
judge slides that are gone. Told to ignore the `sl-day9x-` id scar.*

Nothing here stops the crucial step: `sl-day10-driver-todo` and the projected
`act-i2c-sevenseg` are usable from the wall, and `sl-day10-ladder` is a real
ladder. So no BLOCKER. But five student-facing slides in the main line give
little or nothing, one spoils the prediction its part exists for, one homework
task names a function the room has never seen, and **the two rounds of cuts have
left two holes that are visible from the room**.

### Does not earn its place

- **[MAJOR] `sl-day10-breakit`** — from the wall it gives equipment setup and the
  *conclusion of an experiment not yet run*. It never says what the two one-line
  changes are; the next slide does. Worse, bullet 1 spoils task (b): the
  presenter note says "almost everyone predicts a broken trace for case 2", but
  the slide has already said the two failures look identical on the display and
  completely different on the wire. **S-10 run backwards — a debrief projected
  before the activity.** Cut it; move the AD2 setup into
  `act-i2c-wrong-address`'s missing `<introduction>` and the contrast onto
  `sl-day10-breakit-answer`, which already carries it.
- **[MAJOR] `sl-day10-verify`** — bullet 3 is Day 9x's `sl-day9x-ladder` rung 1
  verbatim with **its one diagnostic step removed**. Holding only this slide I
  cannot separate *wire out* from *wire in the wrong hole* from *display never
  answering*. Restore the discriminator: a display that never acknowledges also
  stops the program, so a program visibly still running means the bus answered.
- **[MAJOR] `sl-day10-layers` + `sl-day10-layers-rule`** — two slides, two titles
  both naming "the rule in the middle", and the second's first bullet restates
  the first's. **And the 8 Aug Arduino cut's hole is here**: Part 8a's presenter
  note says the Adafruit beat "is not cuttable — it is one sentence", and that
  sentence is on neither slide. Merge into one stacked slide over
  `fig-firmware-layers` with four bullets, the third being the Adafruit clause.
- **[MAJOR] `act-i2c-homework` task (a)** asks the student to write
  `SevenSeg_number()`, and the deck has said twice that the driver is *four*
  functions. The five-prototype listing lives only in the book. Put the fifth
  prototype on `sl-day10-driver-todo` with one clause.
- **[MAJOR] `sl-day9x-init-code`** — **hole left by today's `I2C_TIMINGR` cut.**
  Four projected lines carry `PRESC`, `SCLDEL`, `SDADEL`, `SCLH`, `SCLL` and the
  constants `0x2`, `0x4`, `0x2`, `0xf`, `0x13`; the bullet accounts for four of
  the five fields and none of the numbers. *"This is the `helloDisplay.c` shape
  at small scale: the beat that defined the symbols was removed and the listing
  that uses them stayed."* Fix is already written in the slide's own `<note>` —
  promote it to a student bullet.
- **[MINOR] `sl-day10-segment-map`** — nothing new, and in the wrong part: shown
  in Part 3, which is about the grid *behind* the segments, while the two beats
  that need it are 11 and 34 slides later. Cut from Part 3; put
  `ref="fig-segment-map"` on `sl-day10-skeleton-init`, where they derive `S`,
  `2`, `8`.
- **[MINOR] Two slides restate the activity beside them** — the Part 1 prompt is
  `act-i2c-ai-t0` word for word, and `sl-day10-skeleton-init`'s bullets are tasks
  (b)–(d) of `act-i2c-first-digit`.
- **[MINOR] `act-i2c-wrong-t1`** — two references that only work with the book
  open: "the paragraph after this activity says why" (from the room there is no
  paragraph) and "check the capture against Figure 10.4.1", which is
  `fig-i2c-scope-noack` and is projected on no slide in this deck.

### Undefined on the wall

| slide | identifier | last seen |
| --- | --- | --- |
| `sl-day9x-init-code` | `PRESC` and `0x2`; `SCLDEL`/`SDADEL`/`SCLH`/`SCLL` and their values | nowhere — the beat that derived them was cut today |
| `sl-day10-skeleton` | `HT16K33_ADDR` | Day 9x. The `#include "SevenSegPartial.h"` line that says where it lives was cut from the listing to fit — **same cause as the `helloDisplay.c` precedent** |
| `sl-day10-driver-todo` | `HT16K33_ADDR_PTR` | defined for Day 10 one slide *later* |
| `sl-day10-ladder` | `HT16K33_NBUF` | in time, but its value is never stated |
| `act-i2c-homework` | `SevenSeg_number()` | nowhere |
| `act-i2c-wrong-address` | "Figure 10.4.1" | nowhere in this deck |
| `act-i2c-first-digit` | "Figure 10.2.x" | slides 12 and 23; not on the wall at slide 46 |

*Declared rather than hidden, and accepted:* `MAXCOUNT`, `timerElapsed`,
`buttonPushed` on the AI listings — the slide `<note>` says the declarations were
dropped.

### Tasks it could not do from the wall

`act-i2c-hw-t1` (the unseen fifth function), `act-i2c-wrong-t1` (the absent
paragraph and figure), `act-i2c-first-t3` ("derive from the map" with the map 34
slides back). *"Everything else I could answer on paper."* `sl-day10-cmd-derive`
is named the model slide: the three bit layouts are printed on the same slide as
the question.

### Three things flagged while in there, not findings

1. **The time budget is stale by two rounds of cuts.** The `presenterNote` fields
   now sum to **105**, against a note that still says "110 minutes, and it sums
   to 111". That note is also carrying equipment lists and the whole session's
   timing on a slide about Gemini's `tim14_init()`; S-5 puts timing in
   `presenterNote`.
2. **The dimming answer contradicts the derivation the room just did** —
   `HT16K33_DISPLAY_CMD | HT16K33_BRIGHT_CMD | …` where Part 4 derived `0xEF` as
   *dimming set with all four duty bits*. *(Resolved separately: the
   `SevenSeg_init()` instance was invented and has been corrected against
   `assets/starters/SevenSegPartialORIGINAL.c`; the `SevenSeg_dim()` instance is
   Petra's own code from her deck slide 52 and stays, disclosed in Reference.)*
3. **Two slides both want to stay up during Part 8c** — `act-i2c-sevenseg` and
   `sl-day10-ladder`, and the ladder is projected after the activity. Also ladder
   rung 3 is the one rung that names two causes without splitting them.
