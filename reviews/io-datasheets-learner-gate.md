# Day 5x learner-in-the-room gate — deck as it stands after the voice sweep

Deck: `assets/decks/day5x.json` · Source: `source/ch-io-datasheets.ptx`
Reviewed as a student in the room, book closed, watching the projector only.

### Verdict: MAJOR

### Slide walk

| # | slide | What I have that I didn't before |
| --- | --- | --- |
| 0 | title | Orientation only: today is datasheets. |
| 1 | sl-datasheet-peripherals | The input/output vocabulary: a microcontroller does nothing by itself; components either feed it a signal (input) or get driven by it (output). New and self-contained. |
| 2 | sl-datasheet-questions | Four questions any datasheet must answer: supply range, what the signal represents, whether the part converts on its own over I2C or hands back a raw voltage for our ADC, and how to wire/configure it. Both acronyms are expanded inline, so I can hold the sentence even though the ADC chapter (Day 7) and the I2C chapter (Day 9x/10) are both still ahead — I only need the names as labels here, not the mechanisms. New. |
| 3 | sl-datasheet-skeleton | The map: the named sections of a datasheet, in the order they appear (Features/Description, Pinout, Absolute Maximum Ratings, Recommended Operating Conditions, Electrical Characteristics, Application Information, Packaging) plus the active-low pin notation. This is the vocabulary every worksheet task below names by section, so it earns its place as the slide right before the activity starts. New. |
| 4 | section: Datasheet Scavenger Hunt | Transition; presenter note only (40 min). Nothing new for me, and nothing needed. |
| 5 | sl-datasheet-assign | The mechanics of the hour: where the datasheet comes from (Canvas), that I present at the end, which five components exist and what each one is, and that some questions have an analog/digital fork. New. |
| 6 | task-passport-a | Three concrete things to find on the first page/Recommended Operating Conditions/Absolute Maximum Ratings, self-contained. New, and actionable without the book. |
| 7 | task-passport-b | Q1: check off the interface(s) my part uses, from a seven-item list. Q2: list every pin for a minimal hookup. Actionable, but see finding #1 below — the checklist offers three options (UART, PWM, Other) that the very next task gives no follow-up for. |
| 8 | task-passport-c | The Electrical-Characteristics question, forked four ways by interface type (passive / analog / I2C / SPI), each self-contained with its own sub-question. New and actionable for whichever fork applies to my table's part. |
| 9 | task-passport-c2 | The current-draw / GPIO-25mA question, explicitly flagged "continued" and "also in the Electrical Characteristics table" — reads as the second half of the same question, not a dropped one. New, no confusion. |
| 10 | task-passport-d | Sketch the hookup on the whiteboard, name one thing to configure in code, name what confused me. New and actionable. |
| 11 | task-passport-slide | The Part E instruction: put Parts A–D (not the sketch) on one shared slide, concise. New and actionable. |
| 12 | inst-datasheet-worked | instructor-only — not on the wall for students; skipped. |
| 13 | inst-datasheet-key | instructor-only — not on the wall for students; skipped. |
| 14 | sl-datasheet-shareout | New: the three things to say per table, in order. Not new: the closing paragraph about analog-vs-ADC vs digital-vs-already-converted is the same fact slide 2 already gave me — see finding #2. |

### Does not earn its place

- **[MAJOR] task-passport-b** — Part B's interface checklist ("Passive (variable resistance), Analog voltage output, I2C (Inter-Integrated Circuit), SPI (Serial Peripheral Interface), UART (universal asynchronous receiver/transmitter), or plain serial, PWM (pulse width modulation) input, Other") offers seven options, but `task-passport-c`, the very next slide, only gives a worked sub-question for four of them: passive, analog, I2C, SPI. A table that honestly checks UART, PWM, or Other has nowhere to go on Part C — that is failure mode 3, "I don't know what it is asking," waiting to happen. It doesn't happen *this term* only because none of the five assigned parts (TMP235, DRV5053, DS3231, LIS3DH, Si7021) is UART- or PWM-driven — every table's honest answer is one of the four Part C actually supports. So right now the extra options are dead weight, not a trap, but they are exactly why the sentence reads as clutter rather than help: four acronym expansions crammed into one comma-run sentence, two of which (SPI, PWM) name protocols this course never teaches by the time this slide is used (PWM not until Day 11) and one of which (PWM) no assigned part even uses.
  **improve**: cut UART and PWM from the checklist entirely, matching it to the four branches Part C supports (Passive, Analog voltage output, I2C, SPI); keep "Other" only if Part C gets a matching escape-hatch line, otherwise cut it too. Expand I2C inline (it is the real answer for three of five tables and the term is genuinely new here). Leave SPI as a bare acronym — it is real for the LIS3DH table, but no one-line gloss makes "Serial Peripheral Interface" usable to a student who has never seen it and never will again in this course. Turn the whole thing into an actual list (one option per line), not a single run-on sentence — a "check one or more" instruction over seven comma-spliced items is a scanning problem independent of the acronym question.

- **[MAJOR] sl-datasheet-shareout** — the closing paragraph ("an analog part goes to our ADC and we convert the count ourselves, a digital part hands back a number it converted itself") restates, word for word in substance, the third bullet already on `sl-datasheet-questions` two slides ago ("does it do its own conversion and give you numbers over I2C... or does it output a raw voltage that... the ADC must interpret"). It is also planted at the bottom of a slide whose actual job — the one the room needs at that exact moment — is procedural: three things to say, one table at a time, back to back. A four-line teaching aside at the bottom of an instruction slide is not read by anyone running the activity; it is read by someone reading the deck afterward.
  **cut**: remove the closing paragraph from the projected slide. If Petra wants the synthesis spoken, it belongs in the presenter note as her verbal wrap-up line, not projected — nothing in it is new information the room doesn't already have from slide 2.

- **[MINOR] sl-datasheet-shareout** — the sweep moved "30 seconds or less" off the visible slide into a presenter note. The slide's only job is running five back-to-back presentations, and the room now has no visible timing cue at all, even though `task-passport-slide` already told them to keep their group slide concise on the assumption there's a tight window. The presenter knows the timing; the five tables watching the wall do not.
  **improve**: put a short visible line back on the slide (e.g. "About 30 s per table") — it is exactly the kind of fact this slide exists to carry, unlike the closing paragraph above.

### Undefined on the wall
None found. Every task that names a datasheet section (Recommended Operating Conditions, Absolute Maximum Ratings, Electrical Characteristics, Application Information) re-names it in its own text, so a table doesn't have to remember `sl-datasheet-skeleton` from several slides back. Every acronym used in a task (VDD/VCC, I2C, SPI, CPOL/CPHA) is expanded or defined inline at first use in that task.

### Tasks I could not do
None. All six worksheet tasks (`task-passport-a` through `task-passport-slide`) produce a concrete instruction I can act on immediately, including the split `task-passport-c`/`task-passport-c2`, which reads cleanly as one question continued rather than one that lost its ending.

---

### Answers to the three questions

**1. Can a table run the whole activity off `task-passport-a` through `task-passport-slide`?**
Yes, for all five of the parts actually assigned this term. Every question either is self-contained (defines its own terms inline) or names the exact datasheet section to open, and the one place where a table's honest checklist answer in Part B (UART, PWM, or "Other") would leave Part C silent never triggers, because none of the five assigned components is UART- or PWM-driven. The `task-passport-c`/`task-passport-c2` split reads as a continuation, not a loss: the title says "continued," and the lead sentence repeats "also in the Electrical Characteristics table," so nothing here looks like the crop that caused the split. The one real gap is structural rather than experiential this term: the worksheet's own checklist and its own follow-up task disagree about how many interface types exist, and that will bite the day a table's part is genuinely something the seven-item list offers but the four-branch task doesn't cover.

**2. The acronym expansions.**
Clutter, not help, as written — one run-on sentence with four spelled-out acronyms is a scanning problem before it's even a vocabulary problem. Keep I2C's expansion (it's the real, live answer for three of five tables, and the term is being met for the first time here, cleanly, as a label). Drop the expansions for SPI and PWM — SPI is real for exactly one table (LIS3DH) but spelling it out doesn't make an unteached protocol teachable in a parenthetical, and PWM is not real for any of the five tables this term and isn't taught until Day 11. UART's expansion is nearly free (it was taught the day before, on Day 5) but also not exercised by any of the five assigned parts, so it can go either way. Beyond the expansions: restructure the whole checklist into an actual list, one option per line, and trim it to the four options (Passive, Analog voltage output, I2C, SPI) that `task-passport-c` actually has a branch for.

**3. The share-out closing paragraph.**
Presenter material, not slide material. It teaches a fact the room already has (slide 2's third bullet said the same thing about ADC-vs-I2C), and it sits underneath the one instruction the slide exists to deliver — three things, thirty seconds, five tables. Cut it from the projected slide; if it survives anywhere, it survives as a spoken wrap-up or a presenter note, not as four lines of prose competing with a procedural cue in the room's last minute of activity time.
