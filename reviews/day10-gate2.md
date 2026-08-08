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

---

## `expert-class-logistics` — MAJOR

**The arithmetic checks out**: 106 + 2 settling = 108 against 110.

**The realistic pass does not.** Applying its standard discounts — individual
write-then-compare-then-reveal activities run 20–30% over; a first full
project-copy → TODO → build → flash → verify cycle runs closer to double for the
slow half of a thirty-student room; settling is rarely 2 minutes on a Thursday —
the planned 77 minutes to the end of Part 8b becomes **≈100**. The class then
arrives at Part 8c, the crucial step, with **~10 minutes left against a 19-minute
budget whose own stated floor is 11**. Parts 9 and 10 do not happen.

> **Prediction: for the slower half of the room, `SevenSeg_write()` does not get
> written, built and verified inside the period — the one thing every student was
> supposed to reach does not land for everyone.**

- **[MAJOR] S-8 — the recovery points sit at the two ends of the day; the overrun
  risk sits in the middle.** The only authorized cuts are Part 9 (8 min) and Part
  1 trimmed 9→6 (3 min), 11 minutes recoverable — and they bracket a **64-minute
  middle** (Parts 3–8b) built from four room-wide paper-derivation activities plus
  the day's first build/flash/debug cycle, carrying **no compression guidance
  anywhere, central or local**. By the time an instructor is 15–20 minutes behind
  at Part 8c, Part 1 has already happened and cannot be compressed retroactively,
  and Part 9's 8 minutes are the only lever left — not enough to protect a part
  explicitly marked not cuttable. *Fix: give at least one of Parts 4, 5 or 6 a
  stated compression — e.g. give the half-brightness byte `0xE7` rather than
  deriving it — so a lever exists* **before** *Part 8c, not only after it.*

- **[MAJOR] P-2 / P-14 — Part 2's "flag it… we're here to help" does not say what
  flagging produces, and the crucial step depends on it.** Both wordings, as
  requested:
  - *If spares exist*: name them and the quantity in the text ("N spares at the
    front — a display that still fails the ladder gets swapped now, not diagnosed
    further"), and state the threshold where swapping stops scaling ("more than
    two swaps in one section → pair instead"), because instructor bandwidth, not
    spare count, is the real constraint.
  - *If none exist*: replace the reassurance with a concrete hardware-free path —
    pair the student with a working-display neighbour for the rest of the session
    (their board flashes and verifies; the student writes and reasons about the
    code), which is the pattern Day 9x already uses as its fallback — plus an
    explicit deferred check-off. **As written, a student with a genuinely dead
    display has no stated route to Part 8c at all.**

- **[MINOR] S-8 findability — good where it exists, absent where it is needed
  most.** Parts 1, 8a, 8c and 9 each repeat their own cut trigger on their own
  `presenterNote`. Parts 2–8b — the six identified as the actual overrun risk —
  carry nothing, locally or centrally.

- **[MINOR] P-4/P-5 — the persistence-of-vision demo is untested going into a
  zero-slack day**, and Part 3 has no stated compression. A demo that visibly
  fizzles in front of thirty students costs unbudgeted minutes in exactly the part
  that can least afford them.

- **[MINOR] Part 9's own 8 minutes are optimistic even on a good day** — two full
  change→rebuild→flash→capture cycles plus a required predict step. Read it as
  aspirational for the median, not a number the day can rely on recovering.

---

## `learner-ai-reliant` — MAJOR

*Rotator. Fourth run against essentially this design; told what was changed and
asked to judge whether the fixes are real or cosmetic.*

> "The day's two contested activities are not in the same state. `act-i2c-ai-t0`/
> `-t2` is a real fix for the one defect it targets, but the fix does not
> propagate to the slide actually used in class. `act-i2c-five-operations` is a
> thin wrapper: three of its four tasks are exactly as pasteable as the design it
> replaced." Every redesign it proposes costs under a minute.

- **[MAJOR] S-9 / B-1 — the fix does not reach the slide.** The book's
  `act-i2c-ai-t0` asks students to "work out from those three numbers what clock
  this board is running at". **The projected `prompt` slide does not** — it stops
  at "write down the `PSC` and `ARR`", and the clock-derivation step exists only
  in the book and in the instructor's private `presenterNote`. *"A class run
  strictly off the deck skips the derivation entirely, and t2's anchor
  requirement quietly reopens."* One line appended to the deck body, zero added
  time, already inside Part 1's budget.

- **[MAJOR] P-14 — `act-i2c-five-t1`, `-t2`, `-t3` are still outsourceable.**
  "Your own `helloDisplay.c`" changes the framing, not the content: source code is
  exactly what an assistant parses perfectly once pasted. It supplied the two
  prompts that solve them wholesale, one of which needs no file at all — *"Given
  `i2c1_init`, `i2c1_byteWrite`, `i2c1_memWrite`, what two operations are missing,
  why can't they be built from these three, and which is device-independent?"*
  **Only `-t1b` is genuinely resistant**, because it requires reading a specific
  image the student made. *Fix: make `-t2` cite the trace rather than general
  knowledge — "Your capture shows one ACK per byte and never a byte coming back
  to you. From that trace, not from general I2C knowledge, which two operations
  does it prove are missing?"*

- **[MAJOR] P-2 — the crucial step's only check is still spoken.**
  `act-i2c-sevenseg-t2` says "say out loud what each of `i2c1_memWrite()`'s four
  arguments has to be and why". A student arrives having called the identical
  function in Part 8b, so the line can be produced by analogy —
  `display_subaddr`→`HT16K33_ADDR_PTR`, `1`→`2*HT16K33_NBUF` — without engaging
  the reasoning, **and no artifact is left behind that anyone can check.** Same
  gap as the last two reports, still open. *Fix: "write down (don't just say)".
  Same content, same time, an artifact instead of air.*

- **[MINOR] P-14 — `act-i2c-ai-t1` and `-t3` are untouched** by the `-t0` fix, so
  the activity's closure is really `-t2` alone. Explicitly **no redesign
  proposed**: anchoring a one-sentence "what's better" question to the board is
  not worth the cost. Flagged for awareness.

- **[MINOR] P-14 — the homework's first two tasks are self-contained**
  "write a function that does X". `act-i2c-hw-t3`, the `MM:SS` clock, is the one
  with a real anchor, because the colon bit is not on the datasheet pages we have
  and must be found by experiment. *Fix: one clause on t1 — predict in writing
  what the display shows when the counter passes 9999, before testing the
  wraparound you chose.*

### Already safe — no action needed

`act-i2c-wrong-address` (Part 9) is called **solid**: the written prediction
before flashing, the presenter note protecting it, and two failure modes that
genuinely cannot be told apart without both the scope and the datasheet. P-6 and
P-14 both satisfied. The command-table and RAM-map derivations are AI-completable
in the abstract, but they are supervised, individually written and immediately
revealed in class — consistent with how the book treats datasheet literacy
(P-11), and not a verification gap.

---

## `expert-continuity-auditor` — BLOCKER

- **[BLOCKER] P-13, B-6 — the driver signature Day 10 teaches does not match the
  one Lab 5 hands the student.** The chapter builds
  `void SevenSeg_write(uint8_t *display_buffer)` over a `2*HT16K33_NBUF`-byte
  array. **Lab 5 §3.3 (p.4) specifies `void SevenSeg_write(uint16_t *display_buffer);`**
  with `HT16K33_NBUF 5` meaning the buffer length itself rather than half of it.
  `_init`, `_blink` and `_dim` match exactly; only `_write` diverges. A student who
  does exactly what the chapter and its homework rename instruct arrives at Lab 5
  with the wrong prototype for what the handout tells them to declare.

  > **Adjudicated already, and the reviewer did not have the note.**
  > `plans/week5-revision-9x-10.md` records: *"`SevenSegPartialORIGINAL.{c,h}` is
  > now in `assets/starters/`, and confirms `SevenSeg_write(uint8_t *)` with
  > `HT16K33_NBUF 5` — so Lab 5 §3.3's `uint16_t *` is the error, not the
  > chapter."* Both spellings describe the same ten bytes. **The fix belongs in
  > the Lab 5 PDF, which is Petra's to change, not the chapter's.** Recorded here
  > so it is not re-raised a third time, and carried to the open-questions list.

- **[MINOR] B-9 — stale "Part 6a" in the Reference open-drain subsection**, twice.
  Left over from today's cut, which collapsed Part 6a/6b back to a single Part 6.
  *Fixed in this session.*

### The rename thread — verified closed end to end

It checked the standing defect specifically and found it closed in four places:
the prose explaining *why* two names exist (`subsec-day10-layers`), the mechanical
instruction in `act-i2c-homework`'s introduction *before* the tasks (P-1), the
same instruction in `assets/starters/SevenSegPartial.c`'s header comment, and —
the part I had not checked — **the deck actually delivers it**: `assets/class.html`
renders an activity ref's `<introduction>` rather than stripping it, so the rename
is student-facing in class and not only in the book.

*"This part of the fix is solid. The problem is one layer further downstream: the
rename gets students to the right file location for Lab 5, but not to the right
function signature."*

### Checked and clean

BSRR still absent (reserved for the timers chapter). **The TIMINGR cut leaves
nothing downstream stranded** — no chapter objective, no homework task, and no
grep hit for `TIMINGR|PRESC|SCLL|SCLH|SDADEL|SCLDEL` outside `ch-i2c.ptx`, so
neither Lab 5 nor `ch-motors.ptx` nor `ch-accelerometers.ptx` assumes students
derived it. The Arduino cut held: every surviving "Arduino" is a pin-naming fact,
and the one `Adafruit_LEDBackpack.h` clause appears exactly once. The Day 9x →
Day 10 part move left no orphaned ids, and Day 9x's homework note is consistent
with Day 10 Part 1. No forward reference found used before its introduction.
P-13: the day does not collapse into lab prep — Lab 5 is first named in Part 8a,
past the halfway point.

---

## `learner-weak-circuits` — MAJOR

- **[MAJOR] P-1 — the chapter never says why the scope's ground lead must land on
  the circuit's ground node.** "Both minus leads — the ones with the white stripe
  — to ground" appears as a bare instruction, and grepping the whole `source/`
  tree finds the same unexplained instruction in `ch-switches.ptx` on Day 3.
  **It matters here specifically because Part 9 is a debugging exercise**: with
  the AD2's ground on the wrong rail the capture looks wrong for a reason that has
  nothing to do with the address or oscillator changes being taught, and the
  chapter gives no way to recognize that. *Fix: one sentence, once — Day 3 is the
  natural home, with a forward pointer from Part 9.*

- **[MINOR] P-4, P-7 — the pull-up arithmetic in Reference is only half worked.**
  The low end substitutes real numbers (3.3 V ÷ 1 kΩ = 3.3 mA against 3.3 V ÷
  200 Ω = 16 mA). The high end asserts a range instead of computing one — 10 kΩ ×
  300 pF = 3 µs is one line and is not shown. And the example resistors are never
  connected back to the stated 5 kΩ floor: 1 kΩ is shown to sink fine, so a
  student working the algebra literally has no arithmetic reason the floor is
  5 kΩ rather than 1 kΩ.

### Confirmed fixed, from its own previous report

- **The half-brightness `(7+1)/16` step is now worked at the point of use**, in
  the prose *and* on the answer slide the deck actually shows. *"A real fix, not
  a narrated assertion."*
- **The pull-up paragraph now points to real arithmetic** via a live xref, and
  *"no pull-up anywhere → the line can never be released HIGH"* is now tied back
  to the open-drain explanation rather than left as a bare fact. Both items it
  flagged last time are closed.

### Opened the images rather than trusting captions

`four_digit_wiring.png` is the real KW4-56NCLB-P datasheet page and matches the
caption pin for pin; the one-LED and four-LED reasoning is *"fully derivable from
that figure alone, with no unstated leap."* `open_drain_vs_push_pull.svg` is a
real checkable circuit diagram whose two panels match what the caption claims.

---

## `expert-embedded-industry` — MAJOR

*Rotator, weighted down on Arduino grounding per B-11e, and it respected that.*

- **[MAJOR] B-6, L-6, P-11 — `SevenSeg_dim()`'s model answer teaches code that
  works by coincidence.** `HT16K33_DISPLAY_CMD` (0x80) has no business in a
  dimming-set byte — TODO 3's own spec says "the dimming command", singular — and
  it produces the right result only because 0x80's one set bit already sits inside
  0xE0's three fixed bits. *"Nothing on the display or the scope will ever reveal
  this; it is silent by construction."* It lands directly against the chapter's
  own inoculation: Part 7b's `=`-not-`|=` argument, and the sentence one line
  above it about masking so a caller cannot corrupt the command itself.

  > **This is a real conflict, not an oversight, and it needs Petra.** That line
  > is **hers, verbatim**, from `Day10-I2C(2).pptx` slide 52, and it was kept
  > deliberately under the reuse rule; `subsec-i2c-ref-library` already discloses
  > that the term contributes nothing. The same spurious term in
  > `SevenSeg_init()` **was** invented by the draft and has been corrected against
  > `assets/starters/SevenSegPartialORIGINAL.c` in commit `8c23e4f`. So the
  > question is narrow: does her own code stay as the model answer when the
  > chapter spends a part arguing against exactly this pattern? Carried to the
  > synthesizer and to the open-questions list.

- **[MINOR] P-14 — the address-conflict failure mode is still only a quiz
  distractor's feedback**, which a student sees only by choosing the wrong answer.
  The A2/A1/A0 prose is framed entirely positively ("so that up to eight of these
  can share one bus") and never states the failure a student doing group work with
  two kits will actually hit. Still open from its last report; one sentence closes
  it.

### Held up, and named as the day's strongest material

The Arduino cut **held under restructuring** — every surviving mention names the
physical header, not an API, and the one `Adafruit_LEDBackpack.h` clause is not
expanded anywhere including the presenter notes. The three datasheet lookups
survive as genuinely derived: AF6 out of DS13867 Table 15, the command bytes with
students deriving `0x85` and `0xE7` themselves as a check, and the RAM layout
where "why send the zeros at all" is *answered* by the pointer's auto-increment
rather than asserted as a rule. The `i2c1_byteWrite()` hole and its
generalization to "none of the waits has a timeout" are accurate and *"not
overstated — it doesn't claim more than the code supports."* Part 8a's layering
argument and Part 9's two-fault beat are called the day's best-argued material.

---

## `expert-cognitive-load` — MAJOR

*Standing core, and **the agent's clean re-test**. Its brief's calibration example
names this chapter's own instances, so the August regression run tested recall as
much as detection. Day 10 in its current form is material the brief does not
describe. It was briefed on the files only, with no hint of what to find.*

**Re-test verdict: the census works.** Six rows, each with a count, a location
list, a keep and a cut — on material the brief has never seen. It also
distinguished *deepening* repetition from *rewording* repetition, which is the
judgment the row is supposed to exercise. See the regression-table update in
`.claude/agents/README.md`.

### The repetition census

| Idea | Times | Keep | Reduce to |
|---|---|---|---|
| The HT16K33's oscillator must run before it drives anything | **5 full statements, 6 total in one session** — Part 3 prose + `sl-day10-block` note; Part 8b prose **twice, back to back** + `sl-day10-init-answer`; Part 9 prose + `sl-day10-breakit-answer` | Part 8b's first statement, attached to the code just written | Part 8b's second → "oscillator missing — see above"; Part 9's → "as in Part 8b", not a re-derivation |
| The device driver may call `i2c1_byteWrite()` freely, never `I2C1->CR2` | 3, near-verbatim | the Part 8a prose/slide pair | recap item 6 → a fragment, not a re-quote |
| "A scope answers *did my bytes arrive?*; only the datasheet answers *were they the right bytes?*" | 3, near-verbatim | Part 9's telling, the payoff of the activity | recap item 7 → a pointer |
| Open-drain "is not a preference": SDA changes hands every ninth bit | 3, near-verbatim | the Part 6 prose/slide pair | recap item 4 → keep only "PB8/PB9, AF6, open-drain" |
| Nothing in the library counts a clock edge | 3 | Part 7b prose | recap item 5's second sentence → drop |
| The segment bit mapping, `0b DP g f e d c b a` | taught in full on Day 9x; **Part 3 says "you already know this", then Part 5 re-derives it in full anyway** | Day 9x + Part 3's one-line acknowledgment | Part 5 → one clause, freeing the beat for what is actually new: the second byte's meaning |

### Findings

- **[MAJOR] B-8, P-2 — the oscillator fact is re-explained five times across the
  hour leading into the crucial step, twice back to back inside Part 8b alone.**
  That stacks extraneous load directly against `SevenSeg_write()`, which needs the
  room's attention on a four-argument call, not a fourth hearing of a Part 3 fact.
- **[MAJOR] P-4, P-5 — the persistence-of-vision demo is the only observe-first
  step the authors themselves flag as unverified**, and it sits as the
  load-bearing middle beat of a three-idea part. If the effect does not read in
  the room there is nothing concrete to recover with before four more
  block-diagram terms arrive. *Run it with a real display before class, and have
  a fallback image regardless of the outcome.*
- **[MAJOR] B-2, B-8 — two of Part 3's three sub-beats genuinely deepen the
  reading; the third only rewords it.** The common-cathode activity grounds the
  abstract grid argument in the real datasheet pinout and the block diagram gives
  the division-of-labour argument concrete blocks — but the continuous-refresh
  argument is reworded with no new technical content. *Replace with a one-line
  callback and spend the sentence on the block diagram.*
- **[MAJOR-ish] B-8 — Part 3 contradicts its own forward pointer.** It tells
  students they already know the segment mapping, and Part 5 then re-derives the
  identical mapping in full, in both prose and slide.
- **[MINOR] B-8 — four of the recap's eight items are near-verbatim copies of a
  slide bullet from minutes earlier** rather than compressed callbacks. *"Exactly
  the deck-glue duplication the census exists to catch: a recap this close to the
  source material should compress, not requote."*
- **[MINOR] P-7 — `HT16K33_NBUF` is introduced inline at the crucial step**,
  alongside three already-known names, with no beat of its own — one new symbol
  and a formula in the same breath, at the worst moment for it.

**Not flagged, by design:** both cuts are correctly applied and are not gaps.

---

## `learner-firstgen-novice` — MAJOR

- **[MAJOR] P-2, B-5 — `act-i2c-first-digit`'s introduction is the exact moment
  this reader stops following.** Five physical actions collapsed into two
  sentences with no per-step check: download three files, duplicate and rename a
  whole IDE project, and sort three files into two folders. *"It's also ambiguous
  on its face: 'the two `SevenSegPartial` files go in `Src` and `Inc`' doesn't say
  which file goes where; I have to infer `.c`→`Src`, `.h`→`Inc` from the
  folder-name convention, which is a second silent assumption stacked on the
  first."* Get any one piece wrong and the next thing that happens is a build
  error in a section titled "today's crucial step", with nothing saying which of
  the four things went wrong. **This is the same defect a previous committee
  flagged on Day 9x — it moved rather than got fixed**, and the slide is projected
  `room="compressed"`, so the compressed version gets *less* room to say it
  clearly, not more. *Fix: split into `<task>`s — download; duplicate and rename;
  then name which file goes in `Src` and which in `Inc` by name.*

- **[MINOR] P-2 — explicitly NOT a violation, flagged so the fix does not
  overcorrect.** `act-i2c-first-t1`'s "fill in TODO 1, build, flash, confirm the
  first digit shows an `E`" is a ritual done a dozen times by Day 10 with legible
  feedback at each stage. *"That's different in kind from the project-copy step,
  which is a first/rare, multi-folder action whose failure surfaces somewhere else
  entirely."*

### Confirmed fixed

**"Duty cycle" — fixed.** It now appears twice in the whole file and the *first*
occurrence is the definition, in the `fig-ht16k33-cmd-table` caption, right where
it is needed. *"I never had to guess what it meant or go looking for it."*

### What worked, named as such

The half-brightness gotcha is *"P-6 and P-14 done right — exactly the kind of
productive struggle an AI answer wouldn't force me to notice on my own."*
`I2C_CR2`'s five fields get a real mini-arc rather than one dense paragraph
(P-7). And two tone moments landed for precisely this reader: the reference copy
offered to the whole room *"so that a student whose homework did not run… never
has to say so out loud"*, and Part 2 giving *"anyone whose display never lit
yesterday a second try with the whole session still ahead."* — *"Neither of these
had to be there for the technical content to work, and both are precisely the
thing that keeps a quiet, behind-feeling student from having to raise a hand and
admit it."*

---

## `expert-rigor-hawk` — MAJOR

*Rotator. Asked directly what the `I2C_TIMINGR` cut costs, and told the decision
will not be reversed by its report.*

> "The protocol content, the register work, and the AI-critique arithmetic are
> unusually solid — better than most Gate 2 submissions I see. But the day ships
> one invented quantity dressed as observed fact, and the 'moved to Reference,
> not deleted' claim doesn't fully deliver even in Reference."

### The `TIMINGR` cut — its three direct answers

**(a) What is lost.** Not the numbers and not the register's meaning — both
survive. What is lost is *"the activity of confronting three RM0490 tables that
don't cover your case and noticing, unprompted, that four of the five fields are
constant across all three and only `PRESC` moves — which is what makes
`PRESC = f/4 MHz − 1` a derived fact rather than a quoted one."* Gone from the
required floor, full stop.

**(b) Is what remains honest?** **Honest.** *"It is not the 'the hardware handles
it' failure mode"* — it names what each field family does, attributes the
derivation to a specific subsection, and scopes when a reader would need it.
*"Better still: the visible slide already carries one real derived number —
12/4 − 1 = 2 — so the floor isn't 'trust us', it's 'here is one fact,
checkable.' This is the correct application of P-2 + P-3's resolution: depth
removed from the required middle, preserved at the top."*

**(c) The cheapest fixes.** Two, and it rates the second as the more important:
1. *Free.* The visible bullet gives the arithmetic but never says **no RM0490
   table lists 12 MHz** — *"that clause is what makes the number feel derived
   rather than looked up, and it costs nothing to add."* **Applied.**
2. *"Reference is not, in fact, genuinely enough."* `subsec-i2c-ref-timingr`
   promises to work out where each value came from and **derives one field of
   five**. `SDADEL` and `SCLDEL` — two of the four the slide describes — are
   never derived, and RM0490's formula for `SDADEL` *omits the `+1` the other
   four carry*, so a reader extending the pattern by analogy gets it wrong.
   *"This is the one place this book currently overclaims what it has done."*
   **Applied**: the promise is narrowed to what the section actually does, and
   the `SDADEL` irregularity is now stated.

### Findings

- **[MAJOR] B-11c, B-6 — an invented quantity on a student-facing slide.** *"The
  image exists only while something redraws it, **thousands of times a second**"*
  is stated as fact in the prose and on `sl-day10-pov`, while the author's own
  inline comment eight lines above says the HT16K33's scan rate is not in the
  repo. *"The discipline of leaving the OPEN comment was right; shipping the
  specific number anyway undoes it."* **Applied** — now "fast enough that the eye
  cannot follow", which is all the wave-it/film-it activity needs.
- **[MAJOR] B-6, L-6 — the pull-up low end is illustrated, not derived.** The high
  end is genuinely derived (RC against the LOW phase). The low end shows 1 kΩ
  sinking 3.3 mA, *"which most parts manage"* — **certifying 1 kΩ as fine two
  paragraphs before the text asserts the convention floor is 5 kΩ.** Either derive
  the constraint that actually produces 5 kΩ, or move the example to land on it.
  *(Converges with `learner-weak-circuits` from the opposite direction.)*
- **[MAJOR] P-3 — `act-i2c-sevenseg-t4` is repetition, not challenge.** Steady,
  blink, dim is a recombination of three functions already written and called,
  with no new idea. *"Contrast with `act-i2c-wrong-t6` in the same subsection — a
  genuine stretch, same day, same driver."* Its proposed replacement tests the
  pointer-advance idea instead: what breaks if the ten bytes go as ten separate
  `i2c1_byteWrite()` calls rather than one `i2c1_memWrite()`.
- **[MINOR] B-6 — `fig-i2c-timing-tables`' caption** states `SDADEL`/`SCLDEL`
  values with no time-domain meaning attached, unlike the same paragraph's careful
  `SCLL`/`SCLH` conversion. **Partly addressed** by the new Reference paragraph.

### Confirmed correct

The AI-critique clock arithmetic (4.000 s and 1.333 s, with 4 ms and 1.33 ms tick
periods) — *"a strong instance of B-6/L-6 and a good model for the rest of the
chapter."* The `(N+1)/16` derivation, worked correctly in both directions. The
`I2C_CR2` `=`-not-`|=` argument as *"genuinely a different mechanism from the
timers chapter's"* — B-8 done right. And Part 9's ninety-microseconds claim,
arithmetically sound (9 bit-times × 10 µs at 100 kHz) with RM0490 §23.4.9 quoted
on both sides: *"the strongest 'missing consequence' moment in the day — it names
what actually happens (program hangs, bus is fine) rather than just 'know your
library's limits.'"*

---

## `learner-anxious-nonhardware` — BLOCKER

*Raised the BLOCKER on this chapter last time. Asked to judge the fixes honestly
rather than generously, and it did — including finding a defect in the fix
itself.*

### Findings

- **[BLOCKER] P-2, P-14, B-12 — "Flag it. We're here to help!" still states no
  mechanism**, and it answered the open question with evidence from the book's own
  corpus rather than opinion: `ch-gpio-interrupts.ptx:382` writes *"flag it and we
  will get you a working board **before Part 6**"*, and `ch-debugging.ptx:603`
  writes *"raise your hand and watch with a neighbor — **nothing later needs your
  own launch**, and the chapter has every step for a redo before next class."*
  **Both name the physical act, the fallback, and a scope or deadline. Day 10 had
  none of the three.** Its two wordings: with spares, *"we'll swap in a spare
  backpack; your driver files don't change"*; without, *"watch with a neighbor for
  Part 8c; nothing in Parts 3–7 needs your own display, and we'll get yours
  working before Lab 5."* — *"Silence isn't [fine] — for the student with a
  genuinely dead unit, this sentence is the only thing between 'I have a path' and
  'I stop and wait.'"*
  **Partly applied**: the physical act is named, and the scope — that nothing in
  the next four parts needs a working display — is now stated in both the prose
  and on both slides. **The spare-versus-neighbour half still needs Petra**, and
  is on the open-questions list.

- **[MAJOR] P-1, P-14 — the discriminator I added this morning is true but not
  observable, which makes it unusable by the student it is meant to rescue.**
  Neither `writeFirstDigit.c` nor `helloDisplay.c` has an LED, a `printf`, or any
  output independent of the I2C calls under test, *"so a hung program and a
  successfully-looping-but-wrong-command program both leave the board silent and
  the display blank."* **Applied, two ways**: Part 2 now says plainly that the two
  look identical from where the student is sitting — which is Petra's own sentence
  from Day 9x, reused — and gives that as the reason to check wiring rather than
  code; and ladder rung 3, where the AD2 is at hand, now names the instrument and
  what each outcome looks like on it.

- **[MAJOR] B-4, P-2 — nothing told a flagged student to keep going.** *"Without
  that sentence, the natural reading of 'we're here to help' is 'wait,' when the
  correct instruction is 'keep going.'"* **Applied.**

- **[MINOR] — "Flag it" never names the physical act**, where `ch-debugging.ptx`
  says "raise your hand" plainly. *"Not because the phrase is sacred, but because
  an anxious student shouldn't have to infer what 'flag it' means to do with their
  body in the moment."* **Applied.**

### What it judged genuinely well handled

- **Part 2's discriminator and ladder rung 3** — *"real physics from
  `i2c1_byteWrite()`'s wait loop, correctly derived… a genuine fix to what I
  flagged last time, not a rewording of it."*
- **Part 9 is safe to actually do, by construction rather than by reassurance.**
  Two mechanisms: working on a copy is *"a real mechanism — a different file, not
  a promise"*, and the crucial step is structurally complete before Part 9 begins,
  *"so even a fumbled Part 9 can't retroactively cost me the thing the day was
  building toward."* No wiring changes, so no new damage surface. **P-2/B-12
  satisfied by construction.**
- **The reversed-polarity line reads as honesty, and is not a finding.** *"'Check
  the four wires rather than finding out' is a real preventive action, not a
  soothing sentence layered over an unknown. Given B-11c bans inventing facts the
  author hasn't verified, 'we have not tested this' is the correct thing to say
  rather than a false 'it's fine.'"*

---

## `learner-in-the-room` — MAJOR (re-walk, post-rework)

> "Different MAJOR from this morning. The four archetypes are gone: no listing
> shows a name with no referent, no slide restates the one before it, no slide
> exists only to absorb a crop, and every task can be answered on paper except
> one."

**But it found that my own ladder fix leaked Part 9's punchline.**

- **[MAJOR] `sl-day10-ladder` rung 3** now splits the space correctly — and pays
  for it by putting Part 9's answer on the wall three slides early: *"Still
  running means the bus answered, and the suspect is the oscillator command"* is
  exactly case 2. **Applied**: the rung stops one clause earlier, at "check that
  `SevenSeg_init()` is called and that its three commands are the ones you
  derived."
- **[MAJOR] Part 9 had no student-facing conclusion.** Moving the spoiler to
  `sl-day10-breakit-answer` moved the *lesson* there too, and that slide is
  `instructor: true`. **Applied**: the two-questions takeaway now closes
  `sl-day10-hang`, which is *after* the activity and so spoils nothing.
- **[MAJOR] `sl-day10-verify` bullet 3** — *"Nothing is on the bus at all in that
  case"* is false and Part 9 disproves it. *(Already removed in `26a4b79`.)*
- **[MAJOR] the AI listings are abridged and the notice is instructor-only**,
  while one of the five findings is an argument from absence. **Applied**: the
  disclosure is now a visible line.
- **[MAJOR] the Part 1 prompt is not startable for the students it was designed
  for** — everything after "your program from Tuesday prints once a second"
  assumes it runs, and the reference copy exists only in presenter notes.
- **[MINOR] `sl-day10-init-code`** — `I2CCLK` and the bare `12` unanchored, and
  "derives all five" reads as a miscount. **Applied.**
- **[MINOR] `act-i2c-first-t4` is recall wearing a prediction's clothes** — the
  same experiment ran on Day 9x and today's own slides give the answer.
  **Applied**: it now points at address 4, the colon, whose bit genuinely nobody
  knows.

### On the one thing I did not apply, it withdrew the flag

> "Keeping both the Part 1 prompt and `act-i2c-ai-t0` was right, and I withdraw
> the flag. Reading it in projection order rather than as two texts side by side:
> the prompt is at index 4, the activity at index 7, and t0 is not a repeat at
> that distance — it adds the step the prompt deliberately withholds."

---

## `checker-technical-accuracy` — Parts 3–5 — BLOCKER

*Rendered every figure and read the datasheet crops rather than the captions.*

- **[BLOCKER] L-6 — "the fourteen pins going to the display"** (prose and
  `sl-day10-block`). The rendered block diagram shows **COM0–COM7 and
  ROW0–ROW15: 24 driver pins**. The chapter contradicts itself 220 lines later,
  where the RAM-map caption correctly says eight COMs of which our display uses
  five. **Applied.**
- **[BLOCKER] L-6, B-3 — the duty-cycle definition is wrong and contradicts the
  chapter's own Part 3.** The datasheet row reads *"Defines the pulse width of
  ROW"* — it is the fraction of each digit's scan slot, not of the refresh cycle.
  As written, `0xEF` would mean the LEDs are lit for the whole refresh cycle,
  against Part 3's *"at every instant most of it is dark."* **Applied.**
- **[BLOCKER] L-6 — ROW/INT set does not choose "rows or read a keypad."** The
  rendered row gives INT output active low/high; it is **one pin**, and the
  alternative is an interrupt output. Keypad sensing happens on K0–K13 either
  way. **Applied.**
- **[BLOCKER] B-7 — "the only way into the chip"** is refuted by the figure it
  captions: `A[2:0]` enters from the pin block too. **Applied.**
- **[MAJOR] B1 — the table-reading rule is refuted by the chapter's own rows.**
  "A column with a letter is an option you fill in" — but `X` is a don't-care,
  and the chapter's own answer silently fills it with 0, while task t1 writes
  `0b0010000S` and t2 writes `0b1000XB1B0D`, inconsistently, inside one activity.
  **Applied**: three cases stated, both rows rendered the same way.
- **[MAJOR] B-8 — "row" is used in two incompatible senses and the chapter never
  reconciles them.** The reading's "row" is the swept common; the figure's
  ROW0–ROW15 are the segment lines. *Worse:* the datasheet prose inside the
  figure image uses "Row" for the commons — a third usage, printed above a table
  whose left column is COM0–COM7.
- **[MINOR] B1 — "its default is the one we want, so we never send it"** is
  refuted on the same page: the Def. column gives **EFH** for Dimming set, and
  `0xEF` is exactly the byte the driver does send.
- **[MINOR]** `display_ram_map.svg` carries two magenta highlights inherited from
  the old deck's g-segment example that the caption never mentions; `fig-four-digit-wiring`
  should name the part (KW4-56NCLB-P) per P-11; the middle command-table crop has
  no D15–D8 header row.
- **[OBSERVATION]** Part 4 derives `0xE7` as half brightness — and that is the
  byte `helloDisplay.c` has been sending since yesterday. *"Somebody will notice
  they have been running at half brightness, and one sentence turns that into a
  free win."* **Applied.**

### Verified correct

The diode bars are at the top joined to the COM bus, so **"common cathode" is the
right term and the drive directions are right**. Every pin traced individually:
commons 14/11/7/10/6, anodes A→13, B→9, C→4, D→2, E→1, F→12, G→5, DP→3, colon 8.
All three command bytes bit by bit against the rendered rows, plus `0x85` and
`0xE7`; `HT16K33_BLINK_1HZ 0x04` corroborated three ways against the header. Every
header name the chapter claims exists, exists. The RAM map, the segment patterns
against `numbertable[]`, and DP=bit 7 confirmed four independent ways. **And the
chapter is better than the deck on the pointer**: her speaker note says *"if you
don't write the zeros, the pointer won't advance"*, which is wrong; the chapter's
version is right.

---

## `checker-technical-accuracy` — B3 self-contradiction, whole chapter — BLOCKER

*The strongest agent in the suite, again. Five BLOCKERs, most invisible to any
scoped read.*

- **[BLOCKER] cross-day — `helloDisplay.c` sends `BRIGHT_CMD | 0x7`**, and Day 10
  calls all three of yesterday's bytes "given rather than derived" and then
  derives `0xEF`, identifying `0xE7` as *half* brightness in the same paragraph.
  The deck note says it outright: *"They have had those three bytes running in
  front of them since yesterday."* They have not. **Applied.**
- **[BLOCKER] inside one paragraph** — "the pull-up brings the line HIGH" then,
  four lines later, "the line was already LOW and never had a chance to rise."
  It rendered the capture and measured: **no pre-ACK rise; the excursions are at
  ≈94 µs and ≈181 µs, after each ACK.** **Applied.**
- **[BLOCKER] both introductions state the chapter's central taxonomy backwards**
  — `uart.c`/`adc.c` named as the device-driver layer, where Part 8a and the
  figure put them in the interface-driver layer, and `sl-day10-layers` calls the
  device-driver layer *"the first one in this course that has been yours."*
  **Applied.**
- **[BLOCKER] B1 — "one transaction is the only thing that works"** is refuted by
  `writeFirstDigit.c` two parts later, which writes one byte per transaction, and
  by the activity that has every student do it four times. **Applied**, narrowed
  to the true claim.
- **[BLOCKER]** *(already fixed before it reported)* `sl-day10-verify`'s "nothing
  is on the bus at all".
- **[MAJOR] ×10**, of which applied: the oscillator "has to come first" pre-empting
  and contradicting `act-i2c-wrong-t6`; the ladder's "stopped means the bus and
  the wires" omitting *the address you passed*, which is what students have been
  editing all hour; `sl-day9x-handover` hedging what the figure plainly shows;
  the reading question saying "address byte of 0x70" against the day's own
  set-piece that the address byte is `0xE0`; Reference's "fixed by its
  manufacturer" against A2/A1/A0; and Reference calling `memRead` "the same
  pattern" when it must clear `AUTOEND` for the repeated START.
  **Not applied, carried:** the `(high byte, low byte)` comment states the pair
  order backwards and is verbatim from Petra's file — needs the same disclosure
  treatment the `SevenSeg_dim()` oddity gets; and **Day 9x's budget note says 52
  where its deck sums to 46**, a wrong total driving a cut list.

### Cross-boundary pairs checked and found consistent

Listed *because "not reported" and "not looked at" are otherwise
indistinguishable*: every day/date phrase in both days against the real schedule
(**all correct after the 6 Aug move — no surviving stale "you just saw"**); the
powered-display defect that shipped before (**fixed and consistent**); the whole
protocol between Day 9x and Reference; pin assignment in ten places; the scope
channel/colour convention across six figures and slides; the entire address
set-piece; the buffer layout; 34 LEDs / 14 pins everywhere; the `=`-not-`|=`
argument in four places; the NACK hang in five. Arithmetic recomputed
independently throughout — including the `TIMINGR` derivation the brief warned
about, *"the step is right, not just the answer."*

---

## `learner-visual` — MAJOR

*Screenshotted the live deck in headless Chrome at 1280×720 — which is the human
fit check `AUTHORING-slides.md` names as the only control for trap 4.*

- **[MAJOR] `fig-firmware-layers` projects at roughly 150×140 px** under four
  paragraph-length bullets. *"Every label is a gray smudge."* The source SVG is
  clear at native size, **so the fix is layout, not art.** **Applied**: bullets
  cut from four to three and shortened.
- **[MAJOR] `fig-ht16k33-cmd-table`'s three stacked crops render ~250 px wide** —
  illegible — and the very next slide asks students to read those bits off it.
  **Applied**: bullets trimmed.
- **[MAJOR] `fig-display-ram-map` is portrait (825×933) on a `stack="yes"`
  slide**, which is exactly the shape the authoring notes say to give a
  two-column treatment. **Applied**: `stack` removed.
- **[MINOR] orphaned annotations** on `fig-ht16k33-block` and `fig-display-ram-map`
  that no caption accounts for. *"A visual learner's eye goes to the colour
  first; finding no textual anchor there is worse than no highlight at all."*
- **[Guidance] what the persistence-of-vision figure would need to show**, once
  the scan rate is verified: one digit lit with the other three and the colon
  dark, over a time axis divided into five equal slices — *"the same diagram that
  can be drawn on that P-4 asks for, not a photograph."* Until it exists the beat
  is live-or-nothing with no projector fallback.

**Counter-examples named as working:** `fig-four-digit-wiring` and
`fig-ht16k33-page-write` — wide art with `stack="yes"` renders large and legible,
*"confirming the layout mechanism works correctly when the figure's own shape
matches the chosen layout."*

---

## `checker-technical-accuracy` — Parts 1–2 — BLOCKER

- **[BLOCKER] L-6, B-6 — the `TIM14->CNT = 0` claim is wrong in both halves.**
  `CNT`'s reset value is 0 and the peripheral has never counted, so the stated
  failure mode cannot arise; and with no update event the **prescaler shadow is
  still ÷1**, so the first interval is 83.3 µs in ChatGPT's program *and in our
  own `tim14_ms_interrupt_init()`*. `CNT = 0` does not make the first interval
  full — only an update event does. **The book already teaches this**
  (`ch-timers-interrupts.ptx:621`), and the facing listing carries the
  counter-example: Gemini's `TIM14->EGR |= TIM_EGR_UG` is exactly that event, and
  is almost certainly the intended answer to *"what does it do better than
  yours?"* — which is nowhere stated. **Inherited from Petra's own deck
  annotation, so the rewrite needs her.**
- **[BLOCKER] B-6 — "no ISR anywhere in the file"** is refuted by the chapter's
  own Gemini listing fourteen lines above: `EXTI4_15_IRQHandler` is there, and it
  is the only thing that ever sets `buttonPushed`.
- **[BLOCKER] B-6 — "the button test is inside `if (timerElapsed)`"** is asserted
  of both; Gemini has no `timerElapsed` at all.
- **[MAJOR] "the output looks identical"** — refuted by the chapter's own first
  finding six paragraphs earlier (1.33 s per print) and by the stopwatch
  measurement the same activity requires.
- **[MAJOR] B4 — Day 10 upgrades Day 8's "mostly harmless" to "harmless"** and
  drops the second hazard, in a Part whose programs are exactly the case Day 8
  said would come due.
- **[MAJOR] P-10 — `act-i2c-ai-t1` has no answer anywhere.** It names three real
  candidates the instructor currently has to invent live.
- **[MAJOR] B-11c — two unsourced classroom facts**: *"the kits stayed in the
  room overnight"* (only occurrence in `source/`; B-11c's standing fact points
  the other way) and the deck note *"Coolterm is already up; nobody needs to
  reflash"* (Thursday morning's boards hold Wednesday's display program).
- **[MAJOR] B4 — "four characters on the display is a strong test"** assumes
  Wednesday's buffer survived, but Day 9x's activity has students edit it and
  never restore it — *and t4 deliberately makes a digit disappear*, which is the
  exact confusion Part 2 exists to remove.
- **[MINOR]** the `return 1;` disclosure claims completeness and Gemini has three
  edits; "two presses become one" is wrong twice over; `rc_w0` belongs to bits,
  not registers; Tuesday's homework also required a BSRR-driven LED that neither
  AI listing has; and "time ten prints" is ambiguous between ten intervals and
  nine — *"the two differ by 11%, i.e. 12.0 MHz against 13.3 MHz — enough to land
  a student on Gemini's assumed clock."*

**Verified:** both listings diffed line by line against the deck — *"Nothing is
invented."* The five findings map one-to-one onto her own deck annotations. All
of Part 1's clock arithmetic recomputed and correct, and `act-i2c-ai-t0` is
derivable as stated: 12000 × 1000 / 1 s = **12 MHz**. **Part 2's causal claim
verified three ways** against the driver body and RM0490 §23.4.9.

---

## `checker-technical-accuracy` — Parts 8–10 — BLOCKER

- **[BLOCKER] B-11c — neither fault in Part 9 blanks the display.** The HT16K33
  holds its RAM and keeps sweeping while powered — *which is Part 8c's own
  set-piece twenty lines earlier* — and NRST resets the STM32C031C6, not the
  backpack. Case 1 leaves `ES.28` up; case 2 shows the new buffer. `act-i2c-wrong-t5`
  ("compare the two displays") would have nothing to compare. **Applied**: both
  the prose and the projected activity introduction now require a USB power cycle
  before each capture, and say why.
- **[BLOCKER] B1 — "the oscillator has to come first"** is refuted by the
  chapter's own stretch task, which exists to try the opposite ordering.
  **Applied** as a convention with a reason.
- **[MAJOR] ×4 P-10 — missing instructor solutions**: `act-i2c-homework` has none
  at all, against the precedent of `day7`, `day8` and `day9`, and the reference
  `SevenSeg_number()` is already sitting unused in `assets/starters/`;
  `act-i2c-wrong-t6` has none; `act-i2c-first-t2/t3/t4` have none.
- **[MAJOR] B-11c — `act-i2c-first-t2` sends students to the colon.** **Applied.**
- **[MAJOR] B4 — the two introductions vs Part 8a** *(same as B3's finding)*.
  **Applied.**
- **[MAJOR] B-11c — Lab 5 never names `SevenSeg.c` or a folder.** The rename is
  sourced from her deck; the *"because Lab 5 goes looking for it there"*
  justification is not. **Applied.**
- **[MAJOR] B2 — "Two programs" against three required.** **Applied.**
- **[MINOR] ×10**, including: `SevenSegPartialORIGINAL.c` ships `0x7` where the
  book derives `0xf` (**the book is right and the shipped file should follow**);
  "the only files allowed to touch a machine register" contradicted by three
  starters (**applied**); "the odd bytes are what move the pointer" — every byte
  moves it; and `assets/starters/` has no `SevenSegPartial.h`, only
  `SevenSegPartialORIGINAL.h`.

**Verified:** `writeFirstDigit.c` and the `SevenSegPartial.c` skeleton are
**byte-identical** to the starters (programmatic diff, zero differences).
`SevenSeg_blink/_dim/_write` and the `ES.28` program are byte-for-byte Petra's.
**The `SevenSeg_init()` correction made this morning is right and complete** — no
listing anywhere still carries the spurious term. All of Part 9's RM0490 quotes
are exact and in the one bullet. The ninety-microsecond claim measured off the
capture at full resolution: nine rising edges, 10.3 µs apart, ACK slot ≈96 µs
after the `NACKF` test. Lab 5's due date confirmed — and 10 Feb 2026 is a Tuesday.

---

## `checker-voice` — MAJOR (full pass, all fourteen parts)

*The check on the morning's sweep. Told to be adversarial about it, and to say
whether 11 "we'll" was right or whether the sweep had over-applied.*

### Register — is this her?

> "Mostly, yes — and that is the honest headline. **You did not produce a third
> voice**: where the hand-sweep touched a sentence, the result is in her register,
> and I could not tell your rewrites from mine in Part 3. The failure is
> *coverage*, not register — the sweep stopped at prose in several places,
> stopped at slides in others, and never reached the deck-only slides or the
> captions."
>
> "**No opening in Day 10 opens on what is absent.** That failure is gone."

### The over-application it was asked to look for — and found

- **[MAJOR] B-12, S-15 — the rescue text in Part 2 and Part 8c has been rebuilt
  into the shape of the passage she deleted whole.** Her one permitted form is
  five words — *"Still stuck? We're here to help!"* — and the afternoon's edit
  replaced it with three sentences of rescue logistics plus a new student-facing
  minute count ("at minute five"). *"The draft is the same four moves — condition,
  instruction, rescue logistics, don't-worry — at the same length"* as
  ~~"Been through the four wires twice and still dark? Flag it. There is
  known-good hardware in the room…"~~, which she deleted entirely.
  **This is a direct conflict with `learner-anxious-nonhardware`'s BLOCKER**,
  which wanted exactly that path stated, with the corpus precedent to back it.
  **Not resolved here — sent to the synthesizer.**

### The count, recomputed

| | Day 9x (her hand pass) | Day 10 (now) |
|---|---|---|
| `we'll`, raw | 34 | 13 |
| per word, prose only | 1 per 192 | 1 per 869 |
| parts with `we'll` in the opening paragraph | **6 of 6** | **8 of 14** |

> "**11 was not right, and 13 is not either — but the problem is not that it is
> scattered as a tic.** Every one of the 13 is doing real work and sits where she
> puts it. The deficit is at the openings of **Parts 4, 6 and 10**, and Parts 4
> and 6 together are eighteen minutes of the day's teaching. The `you`-heaviness
> is *correct* for this day and I am not asking you to move it: Day 10 is a build
> day, and 'you' is what the student personally does."

### Findings

- **[MAJOR] design vocabulary in student-facing text** — "crucial step" ×3, "this
  is the case this part exists for", "this part is about reading code, not about
  whose homework built", and *"in the order Petra's own list gives them"*.
  **All applied.**
- **[MAJOR] literal `Part N` in student-facing text, nine places.** *"You already
  made this exact substitution once, on the slide, while leaving the prose it
  condenses saying 'in Part 4' — so the house style is already established, just
  not applied."* `<xref>`s are fine and hers; the literal string is the leak.
- **[MAJOR] S-20 — the deck was not swept with the prose.** `slides[1]` item 2,
  *"Today **is** everything that was handed to you"*, on the first slide of the
  day and the single most-read line in it — while the prose it condenses already
  says "today we'll open up". Also `sl-day10-cmd-table`'s caption, *"all today
  needs"*, where the prose twelve lines above says "all we need".
- **[MAJOR] a lab as grammatical actor, six places** — S-20's generalization
  names a lab among the periods that may not act, and her Day 8 pass converted
  *"Lab 5 asks exactly this at full scale"* into *"This is a great preparation for
  Lab 5."* **Four applied; escalated to her, because a lab is also a document.**
- **[MAJOR] ×6 more**: Part 10's opening as count-rhetoric; Part 8c's S-21
  armature; the recap's S-21; the "not X — it is Y" armature twice in Part 8a;
  the "whole argument for the backpack" slogan ending; and the same wording on
  two consecutive slides (`sl-day10-driver-todo` then `act-i2c-sevenseg`).
- **[MINOR] ×10**, including three verbless activity openers, two bare RM0490
  citations on slides that must stand alone, a student-facing time estimate in
  the homework, and **API — the only unexpanded acronym in the day**, occurring
  once in the entire book.

### Reuse — the parts nobody had checked

- **Part 1: she already wrote the questions** (her slide 4). The draft's "What
  does it do better than yours? There is something." should be her *"Do you see
  advantages over your own solution?"* — the nudge also pre-answers the question.
  The draft's t0 and t2 are **better** than her open "problematic parts"; keep
  those.
- **Part 1: a missing beat.** Her slide 3 ends *"Demonstrate your counter with
  timer and reset and discuss with your table partners."* Nobody in the draft
  ever shows their own working program.
- **Part 8a: the device-driver recipe is missing entirely** (her slide 48) — and
  with it **unit testing**, which her slide 53 supports with a `SevenSeg_test.c`
  from Canvas. *"It is the transferable method, and it is the one thing in her
  Day 10 arc that has no counterpart in the draft."*
- **Part 10: her overflow convention** — *"SevenSeg_num will make EEEE when
  >9999"* — against the draft's open "decide what it should do", which will
  produce five different behaviours.
- **Part 9: the draft is better than hers and should stay.** Her second
  experiment was a different data byte; the missing-oscillator case *"is the only
  place in either day where a flawless bus and a dead display coexist."*

### Escalated to Petra

- **Is `Lab 5` allowed to be the grammatical actor?** Her own Day 8 pass says no;
  a lab handout is arguably a document rather than a period.
- **"We're here to help!" appears three times in one day.** The Day 8 note says
  that exclamation mark is *"clearly deliberate and clearly not a general
  licence"* — three uses may be one too many, and that is her call, not a rule.
- **A technical claim conflicting with her own deck**, flagged from reading both
  texts together: her `SevenSegPartial.c` comment says *"You can either write one
  digit at a time or (more efficient!) write the entire display all at once"*,
  against the chapter's "one transaction is the only thing that works". *"I have
  not rewritten either sentence, because doing so would change the engineering,
  not the register."* — **independently confirmed as a BLOCKER by the B3 run, and
  applied.**
