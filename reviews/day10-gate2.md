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
