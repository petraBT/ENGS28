# Confirmation pass: `source/ch-io-datasheets.ptx` + `assets/decks/day5x.json`

Second reader over the edits made from `reviews/io-datasheets-voicesweep.md`
(F1–F18).  Specimens re-read in order: `plans/day10-voice-reference.diff`,
`plans/day9x-voice-reference.md`, `plans/day8-voice-reference.diff`.  Register
re-calibrated against `source/ch-power.ptx` (the other single-x-hour chapter) and
against the whole-corpus we/you distribution.

### Verdict: MAJOR — 15 items, two of them the class you asked me to hunt

The register is now hers.  All five opening moves landed: the chapter opens on
its goal, the day opens on "Today we'll learn to read a component's datasheet",
every acronym is expanded, no `MCU` survives, no `I²C` survives, no curly
apostrophe survives, the time budget is out of student-facing text.  Read cold,
this now sounds like the author of the Day 9x pass.

What the edits themselves created is one real fault of the predicted kind: **a
whole sentence is now told twice verbatim across two of the three new openers,
and the worksheet-and-share-out mechanic is told three times in 130 lines.**
Everything else is small.  One finding (F18a) did not land — the prescribed
replacement text was pasted into the wrong `<instructor>` block, so the sentence
the report flagged is still there and a sentence it never flagged was rewritten
instead.

---

## 1. Did F1–F18 land?

| # | Landed | Evidence |
| --- | --- | --- |
| F1 chapter intro + objectives | **yes** | lines 15–49; goal sentence, the x-hour/no-reading paragraph, six objectives.  Her deck slide 8 USART sentence is in, with links (see §3). |
| F2 section intro + subsection opening | **yes** | lines 53–62, 67–74.  "The STM32C031C6 measures nothing and moves nothing on its own" kept at full strength, out of first position (S-16 respected). |
| F3 acronyms | **yes, all seven** | I2C (90, 157, 266), ADC (91, 157), SPI (267), UART (268–269), PWM (270), VDD/VCC (236–238), MCU → 0 occurrences in the file. |
| F4 "navigate any datasheet quickly" | **yes** | 98–105; her "Datasheets can be intimidating" verbatim, her two hedges restored. |
| F5 "Every Datasheet Has the Same Structure" | **yes** | insight title 108, "typically shows at least" 110, deck title "Where to look in a datasheet". |
| F6 slide title + paired prose | **yes** | deck title "The questions a datasheet has to answer"; prose 84–86. |
| F7 share-out time budget | **yes** | prose 581–589, slide 601–608, `presenterNote: "≈ 6 min.  About 30 s per table."` |
| F8 "Your table will be assigned" | **yes** in prose (180–185); **partly** on the slide — see item 9 below. |
| F9 "on the board" | **yes, all three** | 213–215, 361–362, slide 573. |
| F10 share-out closing | **yes** | 590–598 and slide 608; the causal middle is there and "This is your first look at them" is gone. |
| F11 bold lead in `inst-datasheet-worked` | **yes** (400) — but the second half of F11 traded an S-21 armature for an S-29 banner; item 11. |
| F12 "sits inside" → "falls inside" | **yes** (520). |
| F13 two fragments | **yes** (336, 453–454). |
| F14 I²C → I2C | **yes** | 0 × `I²C`, 17 × `I2C`. |
| F15 55 vs 50 minutes | **partly** — header comment and `presenterNote` fixed, but the deck now says 40 min where the source comment says 45; item 10.  The second em dash (now line 192) was left; item 14. |
| F16 structure claim moved to `sl-datasheet-skeleton` | **yes** | bullet deleted from `sl-datasheet-questions`, lead `<p>` added at 163. |
| F17 curly apostrophes | **yes** | 0 remain. |
| F18a "the habit Part A–D is teaching" | **NO — did not land**; item 6. |
| F18b "making the room say out loud" | **yes** (483–484). |

`check_rules.py`: 0 errors, the same 7 pre-existing warnings (2 × L-19, 5 × L-20)
and no new ones.  `check_deck.py`: 0 problems.

---

## 2. Rewrites — new problems the edits created, worst first

### 1. [MAJOR] One sentence, told twice verbatim, in two of the three new openers. [say it once; Day 9x "Do not restate an instruction the previous slide gave"]

`source/ch-io-datasheets.ptx:20` (chapter introduction) and `:69` (first
subsection) — 50 lines apart in reading order:

    chapter intro:  "The STM32C031C6 measures nothing and moves nothing on
                     its own: every useful embedded system connects it to the
                     physical world through input and output components…"
    subsection:     "An embedded system is a microcontroller together with the
                     components it reads and drives.  The STM32C031C6 measures
                     nothing and moves nothing on its own.  It reads input
                     components… and it drives output components…"

and a third time on `sl-datasheet-peripherals:145`.  This is the exact
configuration the other chapter failed on: a new chapter introduction reaching
for the sentence the first subsection already owns.  It is not the ch-power
pattern — ch-power's introduction and its Part 1 prose share an *agenda*, never a
teaching sentence.

hers — chapter introduction, lines 20–23, replacing the clause only:

    it or drives it.  Every useful embedded system connects the chip to the
    physical world through input and output components, and the datasheet is
    the only place that says what a given component needs and what it gives
    back.

What is lost: nothing.  "measures nothing and moves nothing on its own" stays
where it teaches — the subsection, next to `fig-mcu-io-block`.

### 2. [MAJOR] The worksheet-and-share-out mechanic is announced three times, twice in near-identical words. [Day 9x, "Say a thing once"]

- `:33–35` (chapter intro ¶2) — "each table takes one real component and its datasheet, works through a worksheet on it, and presents what it found to the rest of us"
- `:55–60` (section intro) — "Each table gets one real component and its datasheet, and we'll work through a worksheet… At the end of the hour every table presents what it found"
- `:181–184` (subsection, the operative instruction) — "We'll give each table one component to study… At the end of the hour each table presents its answers to the rest of us"

"one real component and its datasheet", "presents what it found" and "at the end
of the hour" each appear twice; "at the end of the hour" three times counting the
`sl-datasheet-assign` bullet.  The chapter-level version is the ch-power
convention and the subsection version is the instruction a student has to act
on, so the section introduction is the one to cut back — and doing so also fixes
the only genuine density problem in the chapter (6 we-family tokens in 72 words,
three of them in one sentence).

hers — `:54–61`:

    Today we'll learn to read a component's datasheet.  The worksheet below
    asks of one real component the questions we would have to answer before
    wiring it up and programming it, and each table answers them for a
    different component, so between us we will have read five datasheets
    rather than one.

Keeps her "Today we'll…" opening and the payoff line; drops the second telling.

### 3. [MAJOR] "so the five of them together cover…" — an orphaned referent, a third telling, and a count frame, all in one clause added by F8. [S-26, S-28]

`:184–185`:

    draft:   "At the end of the hour each table presents its answers to the
              rest of us, so the five of them together cover an analog sensor,
              a signed analog sensor and three digital parts."
    hers:    "At the end of the hour each table presents its answers to the
              rest of us."
    because: "the five of them" has no clean antecedent — the nearest plural
             nouns are "each table" and "its answers", so it reads as five
             tables.  And the analog/signed/digital split is already stated in
             the chapter introduction and is *explained*, with its reason, in
             the share-out paragraph F10 rewrote (`:590–598`) — which is where
             it earns its keep.  S-28: "Delete a count-armature; do not repair
             it."

What is lost: a preview of the taxonomy.  If you want it previewed, the chapter
introduction already does it — do not restore it here.

### 4. [MINOR] A count was made vaguer than the chapter's own knowledge. [precision, S-16 direction]

`:36–37`:

    draft:   "…a part whose output is a signed quantity, and others that are
              read over a digital protocol."
    hers:    "…a part whose output is a signed quantity, and three parts that
              are read over a digital protocol."
    because: this is F1's own text, changed in transcription.  The chapter
             knows the number (DS3231, LIS3DH, Si7021) and states it 150 lines
             later.  After item 3 there is nothing left to conflict with it.

### 5. [MINOR] The new objectives contradict F4 and F5's deliberate hedges. [S-19]

`:41`:

    draft:   "Name the standard sections of a component datasheet, and say
              which question each one answers."
    hers:    "Name the sections most datasheets have, and say which question
              each one answers."
    because: F4 and F5 exist to stop this chapter saying datasheets are
             uniform — "They also vary between component types and between
             manufacturers" (`:100`), "most datasheets are organized along the
             same lines" (`:102`), "The first page typically shows at least"
             (`:110`), her own slide 11 "First page **typically** shows at
             least… **Most parts** then have".  An objective written after
             those, asserting "the standard sections", puts the hedge and the
             claim 60 lines apart in the same chapter.

### 6. [MINOR] F18a did not land — the prescribed sentence was applied to the wrong block.

`:457–458` still reads exactly what the report flagged:

    draft:   "Every number below is cited to the table it came from, because
              that is the habit Part A–D is teaching and the tables move
              between revisions."
    hers:    "Every number below is cited to the table it came from, because
              that is the habit Parts A–D are meant to build, and the tables
              move between revisions."
    because: S-20 generalized — no part of the course does the teaching; and
             "Part A–D" should be "Parts A–D" as it is in all seven other
             places in the file.

The prescribed wording went instead into `inst-datasheet-worked:442–443`, whose
"which is the part that transfers" the report never flagged.  That edit is
harmless but it now echoes the fix above.  Optional, to keep the two instructor
blocks from sharing a phrase: `:442–443` → "which is the part of the habit that
carries over: …".

### 7. [MINOR] The L-5 sweep stopped one line short, in text that projects. [L-5]

`:437`, inside `inst-datasheet-worked`, which is deck-ref'd as instructor slide 12:

    draft:   "the group checked which STM32 pins could receive the signal."
    hers:    "the group checked which of the Nucleo-C031C6's pins could
              receive the signal."
    because: the same fix you made by eye in `task-passport-b`.  CLAUDE.md
             L-5: name the part, never a truncation.

### 8. [MINOR] `sl-datasheet-assign`'s first bullet lost its antecedent to the deck title. [S-26]

`assets/decks/day5x.json` slide index 5 title, `source/ch-io-datasheets.ptx:570`:

    draft:   title "We'll give each table one component"
             bullet "Open its datasheet from Canvas and display it where your
                     whole table can see it."
    hers:    bullet "Open your component's datasheet from Canvas and display it
                     where your whole table can see it."
    because: F8's slide rewrite put "We'll give each table one component."
             *inside the slide body*, with "Open its datasheet" following it —
             that is what "its" pointed at.  Promoting the sentence to the deck
             title and then deleting it from the body left the pronoun
             depending on a string in a JSON file.  S-26: "the `H` in the
             program" → "the `H` in the `helloDisplay.c` program".

You were right that title and bullet must not be the same words.  If you would
rather keep the report's shape, the equivalent fix is a lead `<p>` in the slide —
`<p>We'll give each table one component to study.</p>` — and revert the deck
title to a name ("One component per table"); the one-line bullet fix above is
cheaper and I would take it.

### 9. [MINOR] The deck and the source now disagree about how long the hunt is. [B-11c]

`source/ch-io-datasheets.ptx:177` says `≈45 min`; `day5x.json` slide index 4 says
`"≈ 40 min in a 50-minute x-hour."`; the header comment at `:6–9` says the parts
still sum to 55.  Three numbers for one activity.  Your reason for not
redistributing is right — which five minutes come out is hers — but then the
presenter note should not have made the call either.

    hers (day5x.json, index 4):
      "presenterNote": "≈ 45 min as budgeted.  The three parts sum to 55 in a
       50-minute x-hour, so five minutes have to come out; which five is a
       teaching call."

That keeps the flag in front of the instructor who will actually feel it, and
leaves `:177` correct as written.

### 10. [MINOR] F11's second half swapped an S-21 armature for an S-29 banner. [S-29]

`:553`:

    draft:   "<term>The DRV5053: a signed measurement, and a sensitivity that
              depends on the suffix.</term>"
    hers:    "<term>The DRV5053.</term>"
    because: S-29's rule of thumb is "if the bold runs past about four words,
             or ends in a full stop or a question mark, it is a sentence."  The
             replacement is thirteen words and a full stop — the longest bold
             lead in the file, longer than the nine-word armature it replaced,
             on a slide that projects in the instructor deck.  Nothing is lost:
             the next sentence already says the quantity is signed, and the
             last sentence already says the sensitivity depends on the suffix.

Calibration note, so this is not over-applied: she did leave one fully bold
sentence standing in the Day 10 result (`day10-voice-reference.diff:104`,
"<term>Each LED needs a pin and a ground wire, and the board does not have 33
pins to spare.</term>"), so S-29 is a strong default and not an absolute.  The
other five `<term>` labels in `inst-datasheet-key` are short keyed labels and
stay.

### 11. [MINOR] A slide caption restating its own bullet. [say it once; "a slide caption is not for content"]

`sl-datasheet-peripherals`, `:148` and `:150`:

    bullet:  "Sensors, switches and data streams feed in; displays, actuators
              and data streams are driven out."
    caption: "Inputs feed the microcontroller through interfaces; the
              microcontroller sends commands out through interfaces on the
              other side."
    hers:    DELETE the bullet; keep the caption.
    because: the F2 edit split one prose sentence into three bullets, taking
             this slide from three bullets to four, and bullet 4 now says what
             the caption under it says.  The full version survives in the book
             at `fig-mcu-io-block`'s caption (`:76–79`).  Deleting it also
             takes the slide back to the three-bullet height the earlier fit
             check signed off on.

### 12. [MINOR] `day5x.json`'s `_comment` is now false in two places.

You touched these lines for the 5X → 5x sweep:

    draft:   "tasks (task-passport-a..d + task-passport-slide). No
              instructor-only slides."
    hers:    "tasks (task-passport-a..d, task-passport-c2 + task-passport-slide).
              Two instructor-only slides: inst-datasheet-worked and
              inst-datasheet-key."
    because: there are two `"instructor": true` refs at indices 12 and 13, and
             `task-passport-c2` is ref'd too.  A comment that miscounts the
             instructor-only surface is the kind that gets believed later.

### 13. [MINOR] Two tidies in the comments you rewrote.

- `:192` — the second of the two XML-comment em dashes the report asked for is
  still there: "adding a part because the course uses it elsewhere — that is
  backwards" → "…elsewhere, which is backwards".  (Comment, so no rule bites;
  take it while the file is open.)
- `:8–9` — "the week-5 budgets have now been got wrong four times" reads
  awkwardly and disagrees with CLAUDE.md, which says three.  hers: "and the
  week-5 budgets have been wrong three times already, so take the length from
  that line."

### 14. [cosmetic, pre-existing] Whitespace-only lines at `:141`, `:567`, `:600` and
`</subsection>` mis-indented at `:175`, `:577`, `:611` (all from `ffae805`, not
from this session).  Worth a pass since a gate is a defect gate, not an edit gate.

---

## 3. Your deviations — my judgment on each

- **F1, linking RM0490 and the STM32C031C6 datasheet: agree.**  It is reading
  prose, not projected, and C-1/C-2 want the link; L-19/L-20 stayed silent, so
  the anchors are in the house form.  The claim also checks out — `ch-uart`
  cites the reference manual for the USART registers (`:958`, `:1139`) *and* the
  datasheet for the alternate-function table (`fig-uart-af-table`, "Table 13
  from the STM32C031C6 datasheet, PA2 AF1 = USART2_TX").  One optional
  tightening, in her explanatory direction rather than a correction: "…came out
  of the reference manual (RM0490), and the alternate-function number for PA2
  and PA3 came out of the STM32C031C6 datasheet."  Her deck slide 8 names only
  the one document, so the two-document sentence is ours and should be exactly
  true.
- **F7, moving the listening instruction out of the `<ul>` into a trailing `<p>`:
  agree, and it is the better fix.**  B-9's complaint was real — the fourth item
  was never one of the three things a table covers.  Her Day 9x ruling on the
  mismatched count is that the *frame* goes when the frame is the problem; here
  the frame is correct and the non-member was in the wrong box.  One handoff:
  `sl-datasheet-shareout` is now lead `<p>` + three bullets + a long closing
  `<p>` (684 characters of body).  That is a fit question for the visual pass,
  not a wording question — do not shorten F10's sentence to make it fit.
- **F15, not redistributing 5/45/5: agree** — that is hers.  But the
  `presenterNote` did make a call (40); item 9 above puts it back.
- **F16: landed and correct.**  `sl-datasheet-skeleton` now has the lead line it
  was missing and `sl-datasheet-questions` is four clean bullets.
- **F14: complete.**  0 × `I²C` in the file; the book's remaining one is
  `frontmatter.ptx`, out of scope here.
- **Your two by-eye fixes.**  `task-passport-b` "a specific pin of the
  STM32C031C6" is right, and it exposed that the same sweep missed `:437` (item
  7).  The `sl-datasheet-assign` de-duplication was the right diagnosis and the
  wrong lever — it broke the antecedent (item 8).
- **§4 arc gap (her slide 7 signal chain): agree, do not draft it.**  It is
  B-8a/Gate 1 content, not register, and the report is right that it needs her.
  When it does get drafted, note that her slide 7 illustrates the
  "AFE + ADC + interface" tier with the **LSM303AGR**, which `71fa3a6` keeps out
  of Day 5x deliberately — the taxonomy can come, that example cannot.

---

## 4. Sweeps, re-measured against the current file

- **Unit openings checked: 16 — failing: 0.**  chapter intro ("The goal of this
  chapter is to be able to pick up the datasheet of a component we have never
  used before…"), section intro ("Today we'll learn to read a component's
  datasheet."), `subsec-datasheets-intro` ("An embedded system is a
  microcontroller together with the components it reads and drives."),
  `insight-datasheet-sections` ("The first page typically shows at least…"),
  `subsec-datasheets-scavenger` ("We'll give each table one component to
  study."), `act-datasheet-passport` ("Work through Parts A–D…"),
  `task-passport-a/b/c/c2/d` (all five now "These answers are…"),
  `task-passport-slide` ("Add one slide for your component…"),
  `subsec-datasheets-shareout` ("Each table presents its slide to the rest of
  us."), `inst-datasheet-worked` ("What Part E asks for is Parts A–D…"),
  `inst-datasheet-key` ("Below are the answers to Parts A–D…").  Two of them
  echo a neighbour rather than fail: items 1 and 2.
- **Slide titles: 15 — epigrams rather than names: 0.**  Index 2 and 3 are fixed.
  Index 5, "We'll give each table one component", is a sentence rather than a
  name (S-18 edge) and is the string item 8's pronoun now leans on; everything
  else is a name or her own worksheet part.
- **Weekday or course-period as grammatical actor: 0 student-facing, 0
  instructor (S-20).**  Checked all nine hits: "a Wednesday x-hour" (5, 32,
  descriptive), "At the end of the hour" (58, 183, 571, adverbial), "costs more
  of the hour than it returns" (403, object), "later in the term" (597, 608,
  adverbial — explicitly permitted).  F18a's "Part A–D is teaching" (458) is the
  last document-as-teacher in the file; item 6.
- **"N, and it is the one that…" armature: 1 (S-21/S-28)** — `:431`, "Two things
  it does right even so, and both are worth naming" (instructor-only,
  pre-existing, still low priority).  `:184`'s new "so the five of them
  together…" is item 3.  `:464`, "the interesting column is the last one,
  because two of these parts are destroyed by 5 V and three are not", still
  reads fine: the count *is* the content.
- **"we" in class-work sentences: student-facing we-family 30, you-family 35,
  ratio 0.86.**  How I counted: strip XML comments, strip both `<instructor>`
  blocks, then count `\b(we|us|our|ours|let's)\b` against
  `\b(you|your|yours)\b`, case-insensitive, with `we'll`/`you'll` matching on
  the stem.  **Your 35/19 = 1.84 does not reproduce** — I get 19 `we`, 7 `us`,
  4 `our` and 19 `you`, 16 `your`.  Corpus, same method: ch-motors 0.97,
  ch-accelerometers 0.94, ch-io-datasheets 0.86, ch-servos 0.83, ch-transistors
  0.77, ch-power 0.73, ch-i2c 0.61, ch-switches 0.60, down to ch-intro-blinky
  0.12.  0.86 is high-normal, not over-corrected, and the nine class-owned sites
  the first report tabulated are all now "we".
  **No individual sentence reads as a "we" bolted onto something the student
  does alone (S-13)** with one exception, and it is inside item 2: "Each table
  gets one real component and its datasheet, **and we'll work through a
  worksheet** that asks of **it**…" — the tables work through five different
  worksheets, not one together, and "it" is three clauses from its noun.  Item
  2's rewrite removes both.  Density: the chapter introduction is 3.1 and 2.7
  we-family per 100 words, which does not drone (ch-power's introduction sits in
  the same place); the section introduction is 8.3 per 100, with three in one
  sentence, and that is the only place it does.  Item 2 takes it to 4.
- **Acronyms first-used without expansion: none.**  I2C, ADC, SPI, UART, PWM,
  VDD/VCC all carry their expansion at first student-facing use, and re-expand on
  the projected worksheet slides (B-9a).  Clean as before: CPOL/CPHA inline
  (322–323), "real-time clock" spelled out (199), GPIO and USART
  course-standard, A0/A1 and SDO/SA0 datasheet pin labels in context.  New with
  F1: RM0490 is introduced as "the reference manual (RM0490)", which is the right
  order.
- **L-16 / L-12 fragments: 0** in prose.  All five task lead lines are
  sentences; `inst-datasheet-key` opens with one.  Slide bullets are the
  label-plus-gloss form L-12 exempts.
- **L-15 personification: 0.**  "falls inside" at 520 was the only instance.
- **L-17 a voice on the signal path: 0.**  `:490` "the first says what kills it,
  the second says where it works" is two *tables* as subjects, permitted.
- **L-13 a document acting on a student: 1** — item 6.  `:537` "exactly the
  'list the possible addresses' the worksheet asks for" is the stated exception.
- **L-5: 1** — item 7 (`:437`).  Everything else is STM32C031C6 or
  Nucleo-C031C6; "the STM32 Nucleo" is gone.
- **B-11e Arduino: 0.**  No "Arduino", no "bench", no `analogRead`.  The five
  `sketch` hits are the ordinary verb for drawing on a whiteboard.
- **"Never say write": confirmed, nothing flagged.**  `:305` "Write the transfer
  function, the equation that converts output voltage to a physical value"
  survives untouched, as it should; `:277` "write its name and what it connects
  to" and `:19` "write code" are the same ordinary use; the new objective at
  `:44` "write the transfer function" inherits `:305`'s exception and is
  consistent with it.  Supporting evidence I had not seen quoted before: her own
  Day 10 pass writes "**write down two numbers**"
  (`day10-voice-reference.diff:86`), so the ruling is about "write a sentence",
  not about the verb.
- **S-29 bold lead lines: 6 `<term>` labels, 1 failing** — item 10.
- **L-21 (no links on slides): clean.**  Zero `<url>` inside any of the five
  `<slide>` bodies; every `"slide"` id in `day5x.json` re-checked
  (`sl-datasheet-peripherals`, `-questions`, `-skeleton`, `-assign`,
  `-shareout`, `task-passport-a/b/c/c2/d/-slide`, `inst-datasheet-worked/-key`).
  The five datasheet links stay in subsection prose.
- **Slide/prose pairs, read together: same writer throughout.**
  `sl-datasheet-peripherals` ↔ `:67–74`, `sl-datasheet-questions` ↔ `:84–95`,
  `sl-datasheet-skeleton` ↔ `:98–105` + the insight, `sl-datasheet-assign` ↔
  `:180–202`, `sl-datasheet-shareout` ↔ `:581–598`.  The near-verbatim reuse
  between prose and slide is **not** a second telling — ch-power does exactly
  this (`sl-day17x-power` repeats its paragraph almost word for word), and the
  two surfaces reach different audiences.  The only duplication that counts is
  *within* one surface: item 11.
- **Design scaffolding in student-facing text: 0.**  The 30 seconds is in a
  `presenterNote`, the budgets are in comments and notes, all fourteen `Part
  [A-E]` references are the student's own worksheet.

---

## 5. For Petra, not for me

Unchanged from the first report, and still open:

1. **"where your whole table can see it"** — her old deck says "display it on
   your projector", the draft used to say "your table's monitor", CLAUDE.md says
   there are no benches.  The current wording is true either way; she should say
   which the room is.
2. **The 50-minute rebudget** — which five minutes come out of 5/45/5.  Item 9
   keeps the question visible in the presenter note instead of answering it.
3. **Her slide 7 signal chain** (Sensor → AFE → ADC → MCU, and the bare /
   AFE-built-in / AFE+ADC+interface taxonomy) — add it, or record why not
   (B-8a).  Not a voice question.  If it goes in, the LSM303AGR example does not
   come with it (`71fa3a6`).
4. **Her Elicia White quote** — does the book quote outside voices?  Still no
   other instance in the corpus.
5. **Nothing here touches the three Day 8 changes that resist generalization.**
   Recorded so the absence is on the record; her deck's "(even a resistor!)"
   would be a second exclamation mark if imported, which is a question for her.

## 6. Floor, re-checked before anything above was proposed

"Datasheets can be intimidating" (`:98`) and "always read this" (`:112`, slide
`:165`) are verbatim intact.  The Part E spec and the board-sketch reasoning
(`5063921`) are intact — F11 removed a `<term>` wrapper and no words; item 10
removes a wrapper we wrote, not her sentence.  The source comment and component
list keeping the LSM303AGR and the photocell out (`71fa3a6`) are untouched.  Both
answer keys (`a533757`, `37a0c3c`) are untouched except three verbs and two bold
labels in prose we wrote around her numbers; every number, citation and section
reference is as she supplied it.  No misspelling found anywhere in the file, in
her text or ours.
