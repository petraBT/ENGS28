# Day 13x — Gate 3′ (prose + deck, after Petra's passes 1 and 2), 2026-08-31

Reviewed: `source/ch-accelerometers.ptx` `sec-accel-day13x` with the in-class
connecting prose written (24 body paragraphs; the length briefing named
Day 13's passed 17 as the yardstick and the ten crucial-step paragraphs as
the mitigating structure), and `assets/decks/day13x.json` (35 slides).
Panel: checker-voice, checker-technical-accuracy, checker-arc-fidelity,
expert-continuity-auditor, checker-figure-claims, learner-firstgen-novice,
learner-text-first; then committee-synthesizer.  Petra's passed wording is
authoritative throughout.

---

## learner-text-first

# Gate 3′ Review — Day 13x (`sec-accel-day13x`), text-first read

Read with figures covered. `<slide>`/`<instructor>` blocks excluded as directed (stripped from the reading book).

### Verdict: BLOCKER

### Findings

- **[BLOCKER] P-5, P-10** (the paragraph after `act-day13x-mass-commit`) — The activity asks students to predict what the proof mass does, but the *reason* — inertia — never reaches the book: it lives only in `ins-day13x-mass-commit`, which is stripped from the reading book. The visible paragraph says "The mass's displacement is what is measured" without saying the mass lags *because of inertia*, or *which direction*, before handing over `a = (k/m)x`. Per P-10's own carve-out, a jointly-discussed physical explanation is teaching, not a solution — it belongs in prose. Fix: move the explanation into the visible paragraph — "Because of its inertia, the mass resists the case's acceleration and is displaced backward, opposite the direction of acceleration, until the spring's restoring force grows to match it. That displacement is what is measured, and <xref ref="fig-accel-proof-mass"/> turns this observation into a formula." DISPLACES: the now-redundant clause in the instructor block.

- **[MAJOR] B-7, P-4** (the collapse paragraph and `fig-accel-data-format`) — "the algebra collapses to the same formula in every mode … exactly because the valid bits always start at bit 15" names the conclusion but not the mechanism; the actual cancellation is only in the figure's equations and the stripped slide note ("the shift and the step size always cancel to 2¹⁶"). Fix: pull that sentence into the body paragraph. DISPLACES: the vague "exactly because…" clause.

- **[MAJOR] B-9, B-11b** (`fig-lsm303agr-block` caption) — "the same picture as the STM32C031C6's ADC" is a bare analogy with no xref and no statement of what is the same; taken literally it can mislead (V_ref single-ended vs a ±2 g span doubled to 4 g). Fix: "— the same architecture as the STM32C031C6's ADC (<xref ref="ch-adc"/>), which likewise multiplexes several input channels through one shared converter." Length-neutral.

- **[MINOR] P-1** (before `act-day13x-sensitivity`) — nothing student-visible before the activity states that the span is double the ± figure (4 g for ±2 g); the fact lives only in the stripped instructor answer, and the caption's "4 g / 2¹⁰" shows the 4 without justifying it. Fix: extend the ranges sentence — "…±2 g, ±4 g, ±8 g, or ±16 g — a span of 4 g, 8 g, 16 g, or 32 g respectively — where 1 g is…" DISPLACES: nothing; it is the activity's required input promoted ahead of the activity (P-1).

**Not flagged, checked and found sound:** the capacitive pickoff paragraph, the two's-complement explanation (4-bit example and the bit-15 extension), the auto-increment/subaddress paragraph and datasheet quote, and the byte-assembly paragraph all stand on their own in prose.

---

## learner-firstgen-novice

# Gate 3′ Review — Day 13x Book Prose (post-class reading, slides/instructor stripped)

## Verdict: BLOCKER

The physics (Part 1–3) reads fine end to end. The failure is in Part 4 — the chapter's own named crucial step — where the worked example and the activity use two different computational paths, and the one sentence that would reconcile them lives only in a slide presenter note.

## Findings

- **[BLOCKER] P-1, P-2** — The only fully worked conversion in the book, 0xC000, reduces to the **top byte** (−128 + 64 = −64, × 15.625 mg). The activity gives **0xE000 with no mode stated**, and its instructor answer uses the **full 16-bit word** (−32768 + 24576 = −8192). Nothing visible ever shows the two methods agree, or that with no mode given you use the raw 16-bit value with the collapsed formula. The reconciling sentence exists only in `sl-day13x-worked`'s note. **Fix**: pull it into the book right after the 0xC000 walk (or the collapse paragraph): "The same reading, decoded the general way — the full 16-bit word directly, with the collapsed formula — gives 0xC000 = −32768 + 16384 = −16384, and 4 g × (−16384)/2¹⁶ = −1000 mg: the same answer." A move, not new content.

- **[MAJOR] P-4, P-7** — "Left-justified" is a spatial idea introduced with no picture in the reading: `one_byte_example.svg` exists only inside the stripped slide. **Fix**: promote it into a `<figure>` right after the one-byte paragraph, captioned per B-7. A move, not new art.

- **[MAJOR] P-1** — the first `struct` anywhere in the book (grep-confirmed) is introduced with one clause and no definition, and the line that uses it (`result->x = …`) exists only on the stripped slide. **Fix**: one clause defining struct on first use ("a struct groups related values — here x, y, and z — into one named type, each field reached off a pointer with `->`"), and include the real function body (at minimum the `result->x = …` line) in the book listing.

- **[MINOR] P-6** — the opening activity's answer ("the mass gets left behind… opposite the acceleration") lives only in the stripped instructor block; the reader never finds out whether their table's guess was right. **Fix**: fold one clause into the following paragraph.

Everything else — the physics mini-arc, applications, the sensitivity derivation (whose answer IS findable in the fig-accel-specs caption), the control-register table — reads cleanly with no forward references.

---

## expert-continuity-auditor

### Verdict: MAJOR

### Findings

- **[MAJOR] L-5/L-6, P-1 (naming drift)** — the prose introduces `<term>subaddress</term>` (one word), but the concept already has an established name with a different spelling: `fig-i2c-transfer-pattern`'s own caption in ch-i2c defines "**SUB is the sub-address**" (hyphenated), Day 13's passed prose used "register address" throughout, the datasheet quote says "sub-address (SUB)", and Part 4 itself reverts to "register address" twice after introducing "subaddress". Three names for one concept inside the crucial step, with no bridging sentence. Fix: either keep "register address" and introduce "sub-address (SUB)" only as the datasheet's field name at the blockquote — or keep the term and add one clause welding it to "register address", matching ch-i2c's hyphenation.

### Confirmed-clean list

Every xref resolves and lands correctly (all 12 targets checked); no xref inside any projected block (all 20 occurrences checked against every slide and projected instructor block — slides substitute plain prose); P-1 ordering within Part 4 correct and self-contained (two's complement confirmed first-taught by grep); the sec-accel-reference forward pointer exists and that section's manifest still promises the signed-shift note; downstream delivery to Day 14 verified against the actual starters (accel_test.c defines and scaling line exact; struct matches lsm303agr.h; low-byte-first + auto-increment match lsm303agr_partial.c; Part 5 matches the fill-in blanks); 0x77/0x00 appear nowhere rendered; B-8 clean (library/header/layers referenced, not re-taught); P-13 proportionate; the P-11 datasheet thread continues rather than restarts; B-11b openings name their subjects; controller/target consistent; typedef struct and -> were established in ch-intro-blinky (the struct-pointer idiom is not novel, only its contents).

---

## checker-voice

## Verdict: MAJOR

### Register — is this her?

Mostly, yes. The section opens the way she opens ("Today we'll look at how the sensor works inside…"), there are no time budgets, no `Part N` pointers, no reassurance theater, no weekday doing the teaching, and the protected sentences all survive verbatim with the sign framing correct. The failure is narrower and it runs one direction: **where a paragraph diverges from the slide Petra passed, it is almost always the *shorter*, more compressed version** — and that is the exact direction the Day 10 calibration forbids. Four times the book paragraph drops something the passed slide has (a number, a condition, a causal clause, a "we"), and once it *adds* the count-armature she deletes on sight:

> passed slide `sl-day13x-specs-reveal`: "The unmasked table confirms the arithmetic. The three modes trade…"
> book ¶: "The unmasked table confirms the arithmetic, **and it says two more things worth reading carefully.** The three modes trade…"
> her pass: ~~"Two things to take from a failed transaction. The first is… The second is…"~~ → "A few notes about a failed transaction: …" (S-28)

Two Part-openings also drift into the balanced-clause register she rewrites ("The data format is settled; what remains is telling the sensor how to run"), and the applications paragraph packs seven passed bullets into one 144-word periodic sentence. None of this is "you are not speaking in my voice" — it is a dozen specific places where her own passed wording was available and a tighter invention was written instead.

---

### Rewrites

**1 — [MAJOR] `source/ch-accelerometers.ptx:1664` — S-28 (count-armature) + S-16 (a lost number)**

    draft:   "The unmasked table (<xref ref="fig-accel-specs"/>) confirms the
              arithmetic, and it says two more things worth reading carefully.
              The three modes trade resolution against speed: fewer bits means
              bigger steps, and low-power mode runs at rates the other two
              cannot.  And the zero-g offset row says that lying perfectly
              flat, the sensor reads typically ±40 mg away from the true
              value — the Min and Max columns allow ±80.  40 mg would be ten
              of our steps, and a significant amount of error."

    hers:    "The unmasked table (<xref ref="fig-accel-specs"/>) confirms the
              arithmetic.  The three modes trade resolution against speed:
              fewer bits means bigger steps, and low-power mode runs at rates
              the other two cannot.  The zero-g offset row is below it: lying
              perfectly flat, the sensor reads typically ±40 mg away from the
              true value, and the datasheet's Min and Max columns allow ±80.
              40 mg would be ten of our steps — 80 mg would be twenty — and a
              significant amount of error."

    because: her passed slide `sl-day13x-specs-reveal` is already exactly this,
             count-armature absent and "80 mg would be twenty" present. The
             draft's prose added the frame and dropped the number. Specimen:
             ~~"Three rows are all we need"~~ → "For now we mostly care about
             the rows named *System setup*, *Display setup* and *Dimming set*."

**2 — [MAJOR] `source/ch-accelerometers.ptx:1805` — S-27 (the causal middle), calibration (plain and explanatory, not terse), L-16**

    draft:   "What about the other two modes?  <xref
              ref="fig-accel-data-format"/> shows all three writing their valid
              bits into the same 16-bit word.  Follow any one row: shift the
              zero bits off the bottom, multiply by that mode's step size, and
              the algebra collapses to the same formula in every mode —
              a = 4g · raw / 2¹⁶ — exactly because the valid bits always start
              at bit 15."

    hers:    "The other two modes work the same way.  <xref
              ref="fig-accel-data-format"/> shows all three writing their valid
              bits into the same 16-bit word, with one equation per mode.  To
              convert a raw reading, shift the zero bits off the bottom, then
              multiply by that mode's step size.  Every one of the three
              simplifies to the same thing: a = 4g · raw / 2¹⁶.  This works
              because the valid bits always start at bit 15, so the shift and
              the step size always cancel to 2¹⁶."

    because: the passed slide `sl-day13x-collapse` carries the causal clause
             the prose drops — "so the shift and the step size always cancel to
             2¹⁶" — and `<slide>` is stripped from the reading book, so the
             *reason* the formula collapses exists nowhere a reader can find it.
             Specimen: "the display then pulls it LOW" → "the display, **having
             recognized its address,** then pulls SDA LOW."

**3 — [MAJOR] `source/ch-accelerometers.ptx:2035` — S-13, S-22, aphoristic register**

    draft:   "The data format is settled; what remains is telling the sensor
              how to run.  The accelerometer has six control registers, all
              reachable over I2C, and only two of them matter for us — the rest
              configure features we leave at their defaults."

    hers:    "We now know how to read the data out of the sensor.  What we have
              not done yet is tell the sensor how to run.  The accelerometer
              has six control registers, all reachable over I2C.  Only two of
              them matter for us — the rest are about features we leave at
              their defaults."

    because: the balanced "X is settled; what remains is Y" is the clipped,
             contrastive register she rewrites — ~~"Today: the two wires.
             Thursday: the chip at the end of them."~~ → "We'll talk about the
             I2C protocol today and will examine how to talk to the backpack
             chip tomorrow." The second and third sentences are her passed slide
             `sl-day13x-control-regs`, two sentences, not one joined by "and".

**4 — [MAJOR] `source/ch-accelerometers.ptx:1778` — "we" is the course (calibration), S-13**

    draft:   "Here is the whole conversion once, on the reading 0xC000.  In
              binary that is 0b1100 0000 0000 0000, and bit 15 is set, so the
              value is negative."

    hers:    "We'll work the whole conversion once, on the reading 0xC000, step
              by step.  In binary that is 0b1100 0000 0000 0000, and bit 15 is
              set, so the value is negative."
              (rest of the paragraph unchanged)

    because: her passed slide `sl-day13x-worked` says "The reading is 0xC000.
             **We convert it step by step**". The book telling of the same
             worked example lost the "we". Specimen: ~~"In the first twelve
             minutes we wire a display…"~~ → "**We'll start by** wiring the
             display…"; ~~"four characters that somebody else chose"~~ → "four
             characters that **we** chose".

**5 — [MAJOR] `source/ch-accelerometers.ptx:1479` — calibration (plain, one claim per sentence), failure 7 (the phone hook told twice)**

    draft:   "Accelerometers are in your phone, which measures gravity's pull
              along each axis to decide when to rotate its screen; in airbag
              sensors, which detect the sudden deceleration of a crash; and in
              laptops — before solid-state drives, an accelerometer detected a
              falling laptop and pulled the disk heads off the spinning drive
              before it hit the floor.  A step counter in a wearable picks up
              the impact of every footfall, football helmets carry
              accelerometers to measure hits to the head, and accelerometers
              monitor vibration in machinery, where a change in the vibration
              pattern can flag a failure building before anything else shows
              it.  Paired with a gyroscope…"

    hers:    "Tilt is the case we started with: your phone measures gravity's
              pull along each axis to decide when to rotate its screen.  An
              airbag sensor detects the sudden deceleration of a crash.  Before
              solid-state drives, an accelerometer detected a falling laptop
              and pulled the disk heads off the spinning drive before it hit
              the floor.  A step counter in a wearable picks up the impact of
              every footfall, and football helmets carry accelerometers to
              measure hits to the head.  Accelerometers also monitor
              machinery: a change in a machine's vibration pattern can flag a
              failure building before anything else shows it.  Paired with a
              gyroscope they form an IMU (inertial measurement unit) — the
              motion sensor in vehicles and drones.  Two local companies
              founded by Thayer alumni build on exactly this technology:
              SignalQuest (precision motion sensing) and Simbex (the helmet
              impact sensors)."

    because: the passed slide `sl-day13x-applications` is already one plain
             declarative per example; the prose folded seven of them into two
             periodic sentences. Also: "your phone … rotate its screen" is the
             second telling of the hook in `act-day13x-mass-commit` twelve
             paragraphs earlier — "Tilt is the case we started with" makes it a
             callback instead of a repeat. Specimen: her whole applications
             deck note is one short sentence per application.

**6 — [MAJOR] `source/ch-accelerometers.ptx:1646` — unexpanded acronym in the reading book (failure 5)**

    draft:   "…and at ±2 g in normal mode the table prints 3.9 mg/LSB, the
              number we derived as 4 g / 2¹⁰ = 3.90625 mg."

    hers:    "…and at ±2 g in normal mode the table prints 3.9 mg/LSB — milli-g
              per least significant bit, the size of one step — the number we
              derived as 4 g / 2¹⁰ = 3.90625 mg."

    because: the only gloss of `mg/LSB` in the section is inside
             `ins-day13x-sensitivity` (line 1630), and `<instructor>` is
             **stripped** from the reading book, the student deck and the PDF.
             A student reading the book meets `mg/LSB` cold in this caption.
             Specimen: `PB9 (SDA)` → `PB9 (SDA — serial data)`; "the two wires
             of an I2C bus" → "an **I2C (Inter-Integrated Circuit)** bus".

**7 — [MAJOR] `source/ch-accelerometers.ptx:2047` and `:2050` (book table) + `:2069` and `:2072` (slide table) — failure 5, and her own plainer wording exists**

    draft:   "Data rate, the LPen bit, axis selection — <em>ours to set</em>."
             "Full-scale range (±2, ±4, ±8, ±16 g) and the HR bit; together
              with LPen in <c>CTRL_REG1_A</c> it picks the resolution mode…"

    hers:    "Data rate, power mode (the <c>LPen</c> bit — low-power enable),
              axis selection — <em>ours to set</em>."
             "Full-scale range (±2, ±4, ±8, ±16 g) and the <c>HR</c> bit —
              high resolution; together with <c>LPen</c> in <c>CTRL_REG1_A</c>
              it picks the resolution mode — <em>ours to set</em>."

    because: her slide 11 says "Data rate, **power mode**, axis selection" and
             "Full-scale range selection" — she never used the bit names. If
             they stay (and they should, because the homework hunts for them),
             they carry their expansion. Change both copies together; the note
             at 2031 says so.

**8 — [MAJOR] `source/ch-accelerometers.ptx:1943` (slide) vs `:1917` (book) — S-12, S-9, the two tellings diverge**

    draft:   slide: "But note the datasheet's own wording (§6.1.1): <q>an 8-bit
             sub-address (SUB) is transmitted: the 7 LSb represent the actual
             register address while the MSB enables address auto increment…</q>"
             book:  "…where its <q>slave</q> is our target and <q>MSb</q> is the
             most significant bit:"

    hers:    slide: "But note the datasheet's own wording (§6.1.1) — where its
             <q>slave</q> is our target, and <q>LSb</q> and <q>MSb</q> are the
             least and most significant bits: <q>an 8-bit sub-address…</q>"
             book:  "…where its <q>slave</q> is our target, and <q>LSb</q> and
             <q>MSb</q> are the least and most significant bits:"

    because: the slide carries none of the gloss the book has, and slides stand
             alone (S-9); and neither telling glosses `LSb`, which appears in
             the quote before `MSb` does. Specimen: "the header" → "the
             **Arduino** header".

**9 — [MAJOR] `source/ch-accelerometers.ptx:1713` — S-16, a condition lost against the passed slide**

    draft:   "Suppose the two bytes contain the reading 0x4000: the top byte is
              0x40 = 64, and with a full-scale range of ±2 g each step is
              4 g / 2⁸ = 15.625 mg, so this reading corresponds to an
              acceleration of 64 × 15.625 mg = 1000 mg — one g."

    hers:    "Suppose the two bytes contain the reading 0x4000: the top byte is
              0x40 = 64.  In low-power mode with a full-scale range of ±2 g,
              each step is 4 g / 2⁸ = 15.625 mg, so this reading corresponds to
              an acceleration of 64 × 15.625 mg = 1000 mg — one g."

    because: her passed slide `sl-day13x-one-byte` repeats "In low-power mode"
             onto the step-size sentence on purpose — 15.625 mg is the
             *low-power* step, not the ±2 g step. The book joined the two
             clauses with "and" and the condition now hangs two sentences back.
             This is the crucial step; it should be the slide's wording exactly.

**10 — [MAJOR] `source/ch-accelerometers.ptx:1539` — the prose is terser than the passed slide, and the join is broken**

    draft:   "You interact with the chip through control and data registers,
              over I2C, and it has hardware interrupt pins we're not using."

    hers:    "You interact with the chip through its control and data
              registers, over I2C — SPI is the other option, and the breakout
              wires it for I2C by default — and through hardware interrupt pins
              we're not using."

    because: the passed slide `sl-day13x-block` has the SPI parenthetical and a
             parallel "through … and through …"; the book drops the
             parenthetical and switches subject mid-sentence ("You interact …
             and **it** has"). Her slide 10 lists all three routes.

**11 — [MINOR] `source/ch-accelerometers.ptx:1741` — S-20 generalized ("no period of the course acts"), and "we" is the course**

    draft:   "Nothing in the course has needed this encoding until now, so here
              is the whole of it:"

    hers:    "We have not needed this encoding until now, so here is the whole
              of it:"

    because: *"Don't ever make the weekday the grammatical actor"* generalizes
             to "no period of the course — a day, a week, a lab, 'the hour' —
             acts, wants, covers, says or explains anything." The course does
             not need things; we do.

**12 — [MINOR] `source/ch-accelerometers.ptx:1367` — L-13 ("Don't make things do other things")**

    draft:   "The mass's displacement is what is measured, and <xref
              ref="fig-accel-proof-mass"/> turns that observation into a
              formula."

    hers:    "The mass's displacement is what is measured, and we can turn that
              observation into a formula (<xref ref="fig-accel-proof-mass"/>)."

    because: a figure is something you look at, not an agent that transforms an
             observation. Her own form is "<xref/> is the reference manual's own
             picture of that sequence" — the figure *is*, it does not *do*.

**13 — [MINOR] `source/ch-accelerometers.ptx:1676` — invented frame where hers exists**

    draft:   "The last thing between the chip and your breadboard is the
              breakout board: it carries the I2C pull-up resistors, a voltage
              regulator, and the pull-ups on the configuration pins that set the
              chip for I2C (<xref ref="fig-accel-breakout"/>)."

    hers:    "The breakout board carries the parts the chip needs: the I2C
              pull-up resistors, a voltage regulator, and pull-ups on the
              configuration pins that set the chip for I2C (<xref
              ref="fig-accel-breakout"/>)."

    because: that is verbatim the passed slide caption `sl-day13x-breakout`.
             "The last thing between the chip and your breadboard is…" is an
             invented lead over her own sentence.

**14 — [MINOR] `source/ch-accelerometers.ptx:1573` — S-26, and emphasis doing the work of a noun**

    draft:   "The first number to pull out of the datasheet is how <em>fine</em>
              this converter's steps are — and we can derive it before we read
              it off the table."

    hers:    "The next number to take from the datasheet is the size of one step
              of the converter's output, and we can derive it before we read it
              off the table."

    because: "how *fine* this converter's steps are" is not a number, and the
             italic is carrying the meaning. Her own framing (deck note): "Next
             is the sensitivity. How are bits at the output related to
             acceleration at the input?"

**15 — [MINOR] `source/ch-accelerometers.ptx:1964` — S-26 (name the referent)**

    draft:   "…and a pointer to a variable of this type is what the read
              function fills in:"

    hers:    "…and a pointer to a variable of this type is what
              <c>lsm303_AccelReadRaw()</c> fills in:"

    because: her slide 18 names it — "A pointer to a variable of that structure
             type is passed to `lsm303_AccelReadRaw()`". Specimen: ~~"the `H` in
             the program"~~ → "the `H` in the `helloDisplay.c` program".

**16 — [MINOR] `source/ch-accelerometers.ptx:1402` — compression against the passed slide**

    draft:   "There are resistive, capacitive, and inductive ways of measuring a
              displacement; our sensor uses the capacitive one."

    hers:    "There are multiple ways of measuring a displacement: resistive,
              capacitive, and inductive techniques.  Our sensor uses the
              capacitive one."

    because: two sentences on the passed slide `sl-day13x-capacitive`, one
             semicolon-joined sentence in the book. Hers is the longer one.

**17 — [MINOR] `source/ch-accelerometers.ptx:2056` — "we" is the course**

    draft:   "Everything today assumed the ±2 g range and normal mode."
    hers:    "Everything we did today assumed the ±2 g range and normal mode."

    because: same move as ~~"this course has been handing you all term"~~ → "**we**
             have been handing you all term". One word.

**18 — [MINOR] `assets/decks/day13x.json:15,16,18` and `:65` — S-18/S-30, and the deck disagrees with itself**

    draft:   agenda: "Why accelerometers are everywhere" / "Our device, by its
             datasheet" / "What is left to configure"
             Part 5 section slide: "Settings for basic accelerometer operation"

    hers:    agenda: "Accelerometers are everywhere" / "The LSM303AGR, and its
             datasheet" / "Settings for basic accelerometer operation"

    because: the agenda promises three things the section slides then name
             differently, and "Why accelerometers are everywhere" promises a
             *why* the slide never gives (S-30 — the headline is a promise).
             "Settings for basic accelerometer operation" is her own slide 11
             title; consider it for the book subsection title too, in place of
             the invented "Part 5: What Is Left to Configure".

**19 — [MINOR] `source/ch-accelerometers.ptx:1981` — the reading book never sees the function**

    draft:   the book gives the `typedef` and describes the assembly line in
             prose; the full `lsm303_AccelReadRaw()` listing exists only inside
             `sl-day13x-readraw`, which is stripped from the reading book.

    hers:    add her slide-18 listing to the book after the `typedef`, as the
             chapter does for `whoami_test.c` and `helloDisplay.c` —
             "<c>lsm303_AccelReadRaw()</c>, which we'll hand you, makes the
             six-byte read and then assembles each pair into one signed 16-bit
             value:" followed by the function.

    because: the paragraph's claim is load-bearing for Lab 7, and every other
             function this chapter discusses is shown in the book. If the
             omission is deliberate (the file arrives tomorrow as
             `lsm303agr_partial.c`), leave it and say so in the source comment.

---

### Sweeps

- **Unit openings checked: 9** — section introduction (1302), Parts 1–5 (1322, 1479, 1529, 1713, 2035), the homework subsection (2086), and the two activity introductions that open a beat (1333, 1582). **Failing: 1** — Part 5 (2035), finding #3. None opens on what is absent; the section opener is her passed recap wording plus "Today we'll look at how the sensor works inside…".
- **Slide titles: 35 (26 refs + 9 structural)** — **epigrams rather than names: 0** in the section slides. Three agenda lines are loose rather than epigrammatic (finding #18). `sl-day13x-block` folds her slides 7 and 10 and keeps her own names.
- **Weekday or course-period as grammatical actor: 1** — "Nothing in the course has needed this encoding until now" (1741, finding #11). Everything else is adverbial ("Tomorrow we'll check…", "Yesterday we wired…", "Everything today assumed…" — that last one is finding #17, a "we" gap rather than S-20). Possessives naming real work ("Table 22 is yesterday's single-register read") are the permitted form.
- **"N, and it is the one that…" armature: 1** — "it says two more things worth reading carefully" (1666, finding #1). "Two familiar facts are enough: …" (1370) and "We'll follow that chain in three steps: …" (1324) both deliver their content immediately after the colon and are already in her fixed form; leave them.
- **"we" in class-work sentences: 7 of 11 paragraphs.** The four impersonal ones are exactly findings #3, #4, #2 and #17 (¶13, ¶14, ¶21, ¶22). Every "you" in the section is what the student personally does ("You interact with the chip…", "you can read all six bytes in one transfer", "if you finish early") — correct under S-13.
- **Acronyms first-used without expansion (complete, within-section scope):**
  - `mg/LSB` — **failing**, `fig-accel-specs` caption (1646). Gloss exists only in the stripped `<instructor>` block. Finding #6.
  - `LSb` — **failing**, in the datasheet quote at 1925 (book) and 1953 (slide); only `MSb` is glossed, and only in the book. Finding #8.
  - `LPen`, `HR` — **failing**, control-register table, both copies (2047/2050, 2069/2072). Finding #7.
  - `MEMS` — passes: expanded at first prose use, "a MEMS accelerometer, a Micro-Electro-Mechanical System" (1432) and on `sl-day13x-mems`. The section/deck title carries it unexpanded ~15 minutes earlier; acceptable, and expanding it in a title would read worse.
  - `IMU` — passes, "an IMU (inertial measurement unit)" in both prose (1491) and slide (1506).
  - `SPI` — passes: glossed in the Day 13 pre-class reading, "a different serial bus we don't use in this course" (line 91). But see finding #10 — the book dropped the reminder the slide keeps.
  - `mg` / `g` — pass: "1 g is the acceleration of gravity, 9.8 m/s², and one milli-g (mg) is a thousandth of that" (1589) precedes every use.
  - `FS` — passes, expanded inside `fig-accel-data-format`'s caption.
  - `I2C`, `STEMMA`, `MSB`, `WHO_AM_I`, `ADC`, `NACK`/`MAK` — established earlier in the chapter or in `ch-i2c`.
  - Cosmetic only: "A/D converter" (1586, 1607, 1569) and "analog-to-digital converter" (1538, 1550) are both used; pick one.
- **Design scaffolding in student-facing text: none.** No `Part N` outside subsection titles and `<note>`/comments; no minute counts outside `<note>` and `presenterNote`; no "the reading"; no "a program you are given" — the section says "which **we'll hand you**" (1985), which is the calibration's own phrasing. `check_rules.py` is clean and `check_deck.py` reports 0 problems.

### Length judgment (B-18)

24 body paragraphs, ~1,700 words. **No paragraph is padding.** Part 4 is 10 paragraphs / ~800 words and every one of them is load-bearing: two's complement is first taught here, `<slide>` and `<instructor>` are both stripped from the reading book, so those paragraphs are the *only* book-form record of the crucial step. The apparent redundancy in ¶12 — 0b1110 evaluated twice, as −8+4+2 and as −8 + 0b110 — is her passed slide `sl-day13x-sign`'s three bullets, and it is the rule followed by its consequence, not a second telling; leave it. Parts 1–3 are 9 paragraphs against her six slides, which is the expected expansion when slides do not survive into the book. The only paragraph I would consider shortening is ¶9, and finding #1 shortens it by deleting an armature while *adding* a number back.

### Already written — reuse instead of invent

- `source/ch-accelerometers.ptx:1479` (applications) — she already wrote it as one plain sentence per case: `Day13x-Accelerometer.pptx`, slide 6 speaker notes — *"Airbag sensor senses when you are hitting something. Pedometer set up to pick up impact of every foot slapping the ground. … Before solid state hard drives it was catastrophic to drop your laptop…"* Finding #5 restores that shape.
- `source/ch-accelerometers.ptx:1676` (breakout) — she already wrote it: slide 9 notes — *"Big chip is the accelerometer, little chip is the voltage regulator. Can see the SDA and SCL wires, including, right on the board, pullup resistors."* The passed slide caption is the book sentence; finding #13.
- `source/ch-accelerometers.ptx:2047` (control registers) — she already wrote the row: slide 11 — *"Data rate, power mode, axis selection"*, not "the LPen bit". Finding #7.
- `source/ch-accelerometers.ptx:1964` — she already named the function: slide 18 — *"A pointer to a variable of that structure type is passed to lsm303_AccelReadRaw()"*. Finding #15.
- `assets/decks/day13x.json:65` / book subsection title — she already titled it: slide 11, *"Settings for basic accelerometer operation"*. Finding #18.
- **Correctly reused, no change wanted:** the `>>` form of the conversion (`assets/starters/accel_test.c:43` is hers — the draft's `>> ACC_REGISTERWIDTH` matches the starter, not the old slide's `/2¹⁶` math notation, and that is right); the auto-increment paragraph and its datasheet quote (her slide 17 verbatim, including *"we need to use `0x28 | (1<<7)`"*); the `lsm303AccelData_s` struct and byte-assembly line (slide 18); the homework list (slide 19); the sensitivity derivation and the zero-g calibration answer (slide 8 notes). The draft did the reuse pass — these are hers and they read as hers.

### For Petra, not for me

- **The `lsm303_AccelReadRaw()` listing is on the slide but not in the book** (finding #19). Every other function in the chapter appears in both. Deliberate, because the file lands tomorrow as `lsm303agr_partial.c`, or an omission? This is the "which explanations get expanded" question from the Day 8 pass, and the specimens do not settle it.
- **The phone/screen-rotation hook is told twice in the reading book** — once in `act-day13x-mass-commit` (1333) and again in the applications paragraph (1480). In the deck the two are ten minutes apart and read as a callback; in the book they are twelve paragraphs apart. Finding #5 turns the second into an explicit callback, but if you want the applications paragraph to stand alone, say so and I will leave the repeat.
- **`ins-day13x-convert:1901` writes the divisor as `/ 65536`** while the prose and slides use `2¹⁶` throughout. Instructor-facing, so it is yours; flagging only for consistency.

---

## checker-arc-fidelity

Everything checked. Both trees are the same live working tree at HEAD `6e70414` (her `.pptx` is gitignored, so it necessarily comes from the live tree; source and deck come from the same tree, clean status).

---

### Verdict: MINOR

Every one of her 19 slides reaches the room, no slide in the deck lacks an origin, all five of her pass-2 additions landed, and the budgets reconcile exactly. What is left is glue that did not follow her retitles, one minute quietly taken off a beat the plan protected, and three claims that live on a slide or in a note but not in the delivered book.

---

### Her arc against the room

Source: `/Users/dz00762/repos/ENGS28/assets/ClassSlidesOLD/Day13x-Accelerometer.pptx` (19 slides, mined with notes). "Reaches us at" is a deck index in `/Users/dz00762/repos/ENGS28/assets/decks/day13x.json`.

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | Engs 28 / Day 13x | deck 1 (title) | ✓ |
| 2 | Accelerometers (divider) | deck 4 (section, Part 1) | ✓ |
| 3 | Accelerometer — proof mass, *kx = ma* | deck 5, 6, 7 + `fig-accel-proof-mass` | ✓ both facts named separately, her "replicate" wording applied |
| 4 | How do we measure "displacement"? | deck 8 + `fig-accel-capacitive` | ✓ resistive/capacitive/inductive all three named |
| 5 | Machined out of silicon (MEMS) | deck 9 + deck 10 (instructor) | ✓ full 1235×468 two-panel image restored; her speaker-note C1/C2 is deck 10 |
| 6 | Accelerometer applications | deck 12 + deck 13 (instructor) | ✓ expanded to 7 bullets incl. step counter; gyro note is deck 13 |
| 7 | STMicro LSM303AGR (block diagram) | deck 15 + 16 + `fig-lsm303agr-block` | ✓ full diagram, magnetometer included (her ruling) |
| 8 | Important accelerometer specifications | deck 17, 18, 19 + `fig-accel-specs` | ✓ her 12/10/8-bit brackets kept; her "sensitivity" column label and "?" box both present in `accel_specs_masked.svg`; −80/±40/+80 in the reveal |
| 9 | Breakout board schematic (partial) | deck 20 + `fig-accel-breakout` | ✓ her four callouts verbatim in `breakout_schematic.svg` |
| 10 | How do you interact with the device? | deck 15, bullet 3 (folded, Gate 1) | ✓ for the claims — **her speaker-note ISR aside has no home** (finding 6) |
| 11 | Settings for basic accelerometer operation | deck 33 (Part 5) | ✓ re-ordered to the end, a named Gate 1 decision |
| 12 | Device header file, `lsm303agr.h` | **deliberately dropped** | ✓ taught Day 13 — `sl-day13-header`, source 1103–1180 (B-8) |
| 13 | Device driver function prototypes | **deliberately dropped** | ✓ taught Day 13 — `sl-day13-prototypes`, source 1224–1243; its "these functions use i2c.c and lsm303agr.h" line survives as deck 31's caption |
| 14 | Getting data out (divider) | deck 21 (section, Part 4) | ✓ |
| 15 | 16-bit, left-justified, 2s complement; three modes | deck 22 (staged) + deck 25 + `fig-accel-data-format` | ✓ her three bit-rows with each mode's equation at the end of its own row, adopted verbatim |
| 16 | Accelerometer data format (2) — mg formula, #defines | deck 26 | ✓ `ACC_FS`/`ACC_REGISTERWIDTH`/`MILLI` verbatim |
| 17 | I2C transfers, autoincrement §6.1.1 | deck 29 + deck 30 | ✓ **her requested split**: #defines + the datasheet quote on 29, her Tables 22/23 image with its red glosses on 30 |
| 18 | `lsm303_AccelReadRaw()` | deck 31 | ✓ struct + function on one slide, her shape |
| 19 | Homework for Thursday | deck 35 | ✓ item 1 now points at our book, per her pass-2 comment |

No slide of hers is missing. No slide in the deck is invented: all 35 trace to her arc, to a Gate 1 decision (the sign/worked/convert triple), or to deck glue.

---

### The chapter's in-class prose against the deck

`/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx`, `sec-accel-day13x` (lines 1297–2116), in source order.

| source | what it teaches | condensed by | judgment |
| --- | --- | --- | --- |
| 1302 `<p>` | yesterday / today | deck 2 recap | ✓ her edited wording, verbatim |
| 1322 `<p>` | the three-step chain, roadmap | — | left off; the chain is spoken in deck 8's note |
| 1330 activity | commit: what does the mass do? | deck 5 | ✓ `room="yes"` |
| 1357 instructor | inertia; the mass is left behind | deck 6 | ✓ reveal |
| 1367 `<p>` | *ma*, *kx*, balance, three axes | deck 7 | ✓ |
| 1381 figure | proof mass, spring, *x* | deck 7 (`ref`) | ✓ |
| 1402 `<p>` | three sensing techniques; capacitive | deck 8 | ✓ |
| 1412 figure | plates on mass and case | deck 8 (`ref`) | ✓ |
| 1429 `<p>` | MEMS; capacitance→voltage | deck 9 | ✓ |
| 1439 figure | mechanism + micrograph | deck 9 (`ref`, `stack`) | ✓ |
| 1462 slide | C1/C2 differential | deck 10 (instructor) | **no prose behind it** — routed to `sec-accel-reference`, which is a stub (finding 5) |
| 1479 `<p>` | seven applications + two Thayer companies | deck 12 | ✓ 1:1 |
| 1512 slide | gyroscope / Coriolis | deck 13 (instructor) | no prose behind it; her slide-6 note, her explicit request |
| 1529 `<p>` | LSM303AGR, signal chain, registers, I2C, INT pins | deck 15 | ✓ |
| 1545 figure | block diagram | deck 16 (`ref`) | ✓ |
| 1573 `<p>` | one-sentence lead-in | — | left off; glue |
| 1579 activity | commit: derive the sensitivity | deck 17 | ✓ `room="yes"`, masked table |
| 1612 instructor | range, sensitivity, three modes, 3.9 mg | deck 18 | ✓ her whole slide-8 note |
| 1640 figure | range rows + unmasked table | deck 19 (image inline) | ✓ for the reveal; `accel_specs_range.png` projects nowhere, but its content (±2/±4/±8/±16 g) is in the table's own Test-conditions column |
| 1655 slide / 1664 `<p>` | modes trade; zero-g offset ±40/±80 | deck 19 | ✓ slide and paragraph carry the same two claims |
| 1676 `<p>` | breakout: pull-ups, regulator, straps | deck 20 | ✓ |
| 1684 figure | breakout schematic | deck 20 (`ref`) | ✓ |
| 1713 `<p>` | subaddress, left-justified, 0x4000 → 1000 mg | deck 22 | ✓ 1:1, with the 16-bit picture she asked for |
| 1739 `<p>` | two's complement, top bit worth −2¹⁵ | deck 23 | ✓ her approved sign route only |
| 1758 figure | bit weights, 4-bit and 16-bit | deck 23 (image inline) | ✓ |
| 1778 `<p>` | 0xC000 → −64 → −1000 mg | deck 24 | ✓ as an `<ol>`, per her "set it better" |
| 1805 `<p>` | three modes collapse to 4g·raw/2¹⁶ | deck 25 | ✓ |
| 1816 figure | three bit-rows + per-row equations | deck 25 (`ref`, `stack`) | ✓ her slide 15's layout |
| 1835 `<p>` + 1841 program + 1852 `<p>` | mg conversion, the #defines, the shift | deck 26 | ✓ — the `accel_test.c` tie is note-only, acceptable |
| 1876 activity | commit: convert 0xE000; offset stretch | deck 27 | ✓ `room="yes"` |
| 1896 instructor | −500 mg; calibrate by flat + flipped average | deck 28 | ✓ her slide-8 calibration note lands here |
| 1913 `<p>` + 1922 blockquote + 1931 `<p>` | six subaddresses; §6.1.1; `0x28 \| (1<<7)` | deck 29 | ✓ three blocks on one slide, but **this composition is hers**, requested explicitly in pass 2 |
| 1958 slide | Tables 22/23, MAK per byte, final NACK | deck 30 | **asserts more than any Day 13x paragraph** (finding 4) |
| 1964 `<p>` + 1970 program + 1981 `<p>` | struct; low-byte-first assembly | deck 31 | ✓ two paragraphs on one slide — **her slide 18's shape**, not a doubling |
| 2035 `<p>` + 2043 tabular | six control registers, two are ours | deck 33 | ✓ two copies of one list, kept in sync |
| 2056 `<p>` | today assumed ±2 g / normal; that's the homework | — | note-only; also carried by deck 35 bullet 3 |
| 2086 `<p>` + 2090 `<ul>` + 2101 `<p>` | the three homework items; tomorrow | deck 35 | ✓ |

Two paragraphs are deliberately reading-only (1322, 1573) and both are glue. No slide condenses a paragraph that no longer exists. `check_deck.py`: 0 problems. `check_rules.py`: 0 errors, 0 warnings.

---

### Budgets

50 minutes, Wednesday x-hour (`CLAUDE.md`: Day N**x**). Verified two ways — Part row against the sum of its own slide notes, and the deck total.

| Part | row | its beats | ✓ |
| --- | --- | --- | --- |
| 1 | 11 | 3 commit + 2 reveal + 4 derivation + 1 capacitive + 1 MEMS | 11 |
| 2 | 3 | 3 applications | 3 |
| 3 | 9 | (1 + 2) block + 3 commit + (1 + 1) reveal + 1 breakout | 9 |
| 4 | 19 | 3 + 3 + 2 + 2 + 1 + 4 + 1 + 1 + 1 + 1 | 19 |
| 5 | 3 | 3 control regs | 3 |
| Close | 2 | 2 | 2 |

2 + 1 + 11 + 3 + 9 + 19 + 3 + 2 = **50**. Both instructor slides (deck 10, 13) carry no minutes and say so. Against `plans/day13x.md`, one minute moved inside Part 3 (commit 4→3, reveal 1→2, after she asked for more framing — fine) and one inside Part 4 (byte assembly 2→1, conversion reveal 0→1 — finding 3).

---

### Findings

- **[MINOR] The agenda slide still carries all three pre-retitle Part names — one of them a phrase she deleted by name.** Deck 3's items read "Why accelerometers are everywhere", "Our device, by its datasheet", "What is left to configure"; the section slides that follow (deck 11, 14, 32) read "Accelerometers are everywhere", "The LSM303AGR, and its datasheet", "Settings for basic accelerometer operation". Her pass-2 comment on the Part 2 section slide was *"Just say Accelerometers are everywhere"* — that retitle was applied to the section slide and to the source subsection title (line 1475) and not to the agenda, so the exact wording she struck still projects two slides earlier. The Part 3 drift dates from pass 1 and has now survived two rounds. — deck index 3 — **fix**: replace the five agenda items with the five section-slide titles as they now stand. **DISPLACES**: nothing — same five lines, three retyped; no slide added, no minutes moved.

- **[MINOR] Part 5 is named three different ways, and its section slide duplicates its only content slide's title verbatim.** Source subsection title is "Part 5: What Is Left to Configure" (line 2029); the agenda says "What is left to configure"; deck 32 (section) and deck 33 (content) *both* say "Settings for basic accelerometer operation". Two consecutive slides with identical titles read as a stutter in the player. The retitle entered at pass 1 with no annotation behind it, so unlike finding 1 there is no ruling to preserve on either side. — deck 32/33, source 2029 — **fix**: keep her slide-11 wording where it belongs and make the three artifacts agree — source subsection → "Part 5: Settings for Basic Accelerometer Operation", deck 32 section → same, deck 33 content → "Six control registers — two of them are ours". **DISPLACES**: nothing; titles only.

- **[MINOR] `sl-day13x-readraw` lost the minute the plan gave it.** `plans/day13x.md` Part 4 beat 6 budgets 2 minutes for byte assembly and says why: the shift-and-OR here "builds a wider signed value from two array elements, not a bit inside one register", an idiom unlike anything so far, and the source comment at line 1978 marks the claim load-bearing for Lab 7 D1. The deck gives it 1 minute — last slide of the densest Part, 15 code lines, a struct, a new operator idiom and the driver-layer point. The minute went to `ins-day13x-convert`. — source 1981/1999, deck 31 — **fix**: `sl-day13x-readraw` note and the Part 4 breakdown → ≈2 min; take the minute from Part 2 by folding the vibration bullet into the wearables one on `sl-day13x-applications` (the plan's own named cut lever, and that slide is the deck's largest text-only slide at 870 projected characters). Part rows become 11 / 2 / 9 / 20 / 3; total still 50. **DISPLACES**: one minute of Part 2's applications discussion and one of its seven bullets.

- **[MINOR] `sl-day13x-autoincrement-tables` asserts more than any Day 13x paragraph does.** Its caption teaches "Table 22 is yesterday's single-register read; Table 23 is today's — after each DATA byte the controller ACKs (MAK) and the chip serves the next register, until the final NACK." The only in-class prose behind it is one clause at line 1938: "This is the read pattern of `fig-i2c-transfer-pattern`, extended to multiple bytes" — and that figure lives in `source/ch-i2c.ptx:4319`, a different chapter. The slide is right and it is her slide 17's own image; the gap is that a reader of the book alone (slides are stripped) never gets the multi-byte transfer shape at all. — source 1931–1941, deck 30 — **fix**: one sentence onto the end of the paragraph at 1931 — Table 23 is the multi-byte form of Table 22, the controller acknowledges each data byte (MAK) so the target serves the next register, and the final not-acknowledge ends the transfer. **DISPLACES**: nothing — one sentence into an existing paragraph; no slide, no minutes.

- **[MINOR] `sec-accel-reference` is a stub holding two in-class promises, and one of them is content she asked for twice.** Line 2183 reads "This section is still being written." Line 1855 sends the reader there for the signed-shift subtlety, and the Part 1 authoring comment (1317–1321) routes the C1/C2 differential detail there and says "do not grow it back here." Since `<instructor>` is stripped from the reading book, the C1/C2 explanation — her slide-5 speaker note, requested in pass 1 and again in pass 2 — appears in the delivered book **nowhere**. It does reach the room, as deck 10. — source 1462, 1855, 2183 — **fix**: track as a Reference-section dependency for the Day 14 session; if Reference will not be written before the book goes to her, add one sentence to the MEMS paragraph at 1429 (two capacitors, ΔC = C₁ − C₂, and with Q = CV the differential charge is ΔQ = (C₁ − C₂)·V_exc). **DISPLACES**: nothing at the deck; one sentence of Part 1 prose, no slide.

- **[MINOR] Her slide 10's speaker note has no home.** *"If you wanted to use one of the interrupts you'd take the interrupt pin and wire it to a pin on your microcontroller, set a pin change interrupt. Then you'd write an ISR for that pin change interrupt."* — the bridge from this chip back to `ch-gpio-interrupts`, and the answer to the question the room asks when it is told there are interrupt pins we do not use. `sl-day13x-block` bullet 3 stops at "hardware interrupt pins we're not using". — her slide 10, deck 15 — **fix**: one sentence into `sl-day13x-block`'s `<note>`. **DISPLACES**: nothing — presenter note only.

- **[MINOR] Three slides to hand to the fit sweep by name.** Projected character counts, code and notes excluded: `sl-day13x-applications` 870 chars / 7 bullets / no image (grew in her pass; the deck's largest text-only slide), `sl-day13x-autoincrement` 696 chars + 6 code lines + a 60-word block quote / no image, `sl-day13x-one-byte` 683 chars / 3 bullets + a 58%-width image. All three map 1:1 to their prose, so if any overflows it is volume, not paragraph doubling — the split fix does not apply. **fix**: none from me; these are measurements for whoever renders. **DISPLACES**: n/a.

---

### Layouts she already solved

- `sl-day13x-autoincrement-tables` — her slide 17 does this as the datasheet's Tables 22 and 23 with a red spoken-sequence gloss under the first and "Subaddress autoincrements for multiple reads, see Sec 6.1.1" under the second — **adopted, hers verbatim in the SVG**. Keep.
- `fig-accel-data-format` / `sl-day13x-collapse` — her slide 15 does this as three bit-rows with each mode's equation at the end of its own row, ending `= 4g·raw/2¹⁶` on all three — **adopted**, with the sign arrow added on top. Keep.
- `sl-day13x-breakout` — her slide 9's four callouts (I2C pullups / 6-pin header / 5V-3.3V regulator / Pullups set device for I2C) survive word for word. Keep.
- `sl-day13x-specs-commit` — her slide 8's 12-bit / 10-bit / 8-bit colour brackets kept, plus both of her pass-2 additions (the rotated "sensitivity" column label and the "?" box). Keep.
- `sl-day13x-specs-reveal` — **adopt hers**: `accel_specs_reveal.svg` drops the "Table 3. Sensor characteristics" caption and the Symbol / Parameter / Test conditions / Min / **Typ.** / Max / Unit header row that the masked image on the previous slide carries, so the boxed 3.9 sits in an unlabeled column. `accel_specs_header.png` is already in the folder, unused, and is exactly that strip.
- `sl-day13x-mems` — the full 1235×468 two-panel mechanism, byte-identical in size to her `slide05_img1.png`; her crop complaint is fixed. Keep.

Housekeeping, not a finding: four images in `assets/images/Day13x-Accelerometer/` are now referenced nowhere — `accel_specs_header.png`, `accel_specs_offset.png`, `accel_specs_sensitivity.svg`, `mems_mechanism_rest.png` — leftovers from superseded layouts.

---

### Checked and correct

All 19 of her slides reach the room: 3–5 as Part 1 with both instructor asides, 6 as the expanded seven-bullet applications slide plus the gyroscope aside, 7–10 folded into Part 3's four beats with her datasheet table masked then revealed, 11 re-ordered to Part 5 by a named Gate 1 decision, 14–18 as Part 4's ten beats with her auto-increment slide split exactly as she asked, and 19 as the close pointing at our book instead of Canvas. Her slides 12 and 13 are deliberately dropped and I verified the destination — the header file and the four prototypes are taught on Day 13 at source 1103–1180 and 1224–1243, and slide 13's layering sentence survives as deck 31's caption. All five of her pass-2 additions landed: the differential-capacitors instructor slide (deck 10), the gyroscope instructor slide (deck 13), the expanded applications (7 bullets, step counter included), the sensitivity framing (on the commit slide and in full in `ins-day13x-sensitivity`), and the split auto-increment beat (deck 29 + 30) — and I diffed pass 1 against pass 2 line by line to confirm nothing else was lost in the process.

One thing I checked and ruled settled rather than reporting: the model on the wall converts 0xC000 by the top-byte route (−128 + 64 = −64) while `ins-day13x-convert` answers 0xE000 by the same rule at 16 bits (−32768 + 24576 = −8192), and the 16-bit worked line exists only in the presenter notes of deck 24 and 25. That line **was** on deck 24 at pass 1 and she deleted it — her "delete" and "WHAAAAATTTTT?????" on that slide, aimed at the unsigned-minus-2^width phrasing it carried. Both routes are her approved one (top bit's negative weight plus the remaining bits), the top-byte route reaches the same −500 mg on 0xE000, and the 16-bit composition is scripted out loud in two notes — so I am not proposing to put it back.

---

## checker-technical-accuracy

# Gate 3′ Verification — Day 13x (`sec-accel-day13x`)

### Verdict: BLOCKER

One figure teaches the opposite of the Part 1 reveal it illustrates, and one Part 5 summary sentence is refuted by Part 4's own worked examples. Everything else — all arithmetic, every datasheet citation and quote, every register address, both duplicated blocks, all code against the real starters, all 16 image paths, all xrefs/refs, and the 50-minute budget — verified clean.

---

### Findings

- **[BLOCKER] [B1/B3, figure content]** `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx:1439-1460` (`fig-accel-mems`, `sl-day13x-mems`) — the figure's right panel is presented as "the mechanism … under acceleration." **Rendered** `assets/images/Day13x-Accelerometer/mems_mechanism.png` (cropped and enlarged): the arrow labelled **"Acceleration" points left**, and the moving plate's displacement arrows (on the plate and on every finger) **also point left** — i.e. the proof mass is drawn displacing *in the same direction as the acceleration*. Source checked against the chapter itself: `ins-day13x-mass-commit` at line 1358-1360 — "the mass gets left behind … **it moves backward — opposite the acceleration**" — and `fig-accel-proof-mass` (`mass_spring.svg`, rendered: "accel" arrow **right**, mass displaced **left** of the dashed rest box, spring stretched, `F = kx = ma`). Two beats after the commit-and-reveal whose entire point is the direction of the displacement, the chapter projects a diagram showing the opposite. Neither the caption nor the note flags it.
  **Fix (either):** (a) mirror the right panel's `Acceleration` label so it points right (opposite the plate arrows); or (b) add one clause to the caption and the note: "the borrowed drawing's arrow marks the force felt by the mass, not the case's acceleration — the mass still lags the case, as we derived." Option (a) is cleaner because the wall version has no caption to read.

- **[MAJOR] [B1/B3]** `source/ch-accelerometers.ptx:2057` and the same sentence in the slide note at `:2076` — "**Everything today assumed the ±2 g range and normal mode.**" Refuted by the chapter's own Part 4: line 1720-1726 ("**In low-power mode**, for example, there are 8 valid bits … each step is 4 g / 2⁸ = 15.625 mg") and the whole worked example at 1778-1790 ("Read the top byte (**low-power mode**): 0xC0 …"), plus `fig-accel-data-format`, which works all three modes. Only the *sensitivity derivation* (Part 3) assumed normal mode; the two set-piece conversions assumed low-power. The ±2 g half is correct.
  **Fix:** "Everything today assumed the ±2 g range; the derivation used normal mode, and the worked examples used low-power. `CTRL_REG1_A` and `CTRL_REG4_A` are where both choices actually get made." (Change the prose and the slide note together — the comment at 2031-2034 already says they are two copies of one list.)

- **[MINOR] [L-6, hardware precision]** `:1634-1636` (`ins-day13x-sensitivity`) — "The lower the number of bits, the faster you can generate measurements." Checked against `assets/datasheets/lsm303agr.pdf` §8.6 **Table 35** (p. 47): normal and high-resolution mode offer the **same** ODR list, both topping out at 1.344 kHz; only low-power mode adds 1.620 kHz and 5.376 kHz. (High-resolution is slower in *bandwidth*, ODR/9 vs ODR/2, and in turn-on, 7/ODR vs 1.6 ms — Table 14, §4.2.1, p. 27.) This is her deck's wording, carried verbatim from the slide-8 speaker note, so no rewrite is demanded — but the body prose at `:1669` already says it correctly ("low-power mode runs at rates the other two cannot"), and the instructor block could simply borrow that clause.

- **[MINOR] [B-11c, attribution]** `:1446-1447` — "(surface micromachined capacitors — Roger Howe, Stanford)". The credit matches Petra's old deck slide 5 exactly (mined: "Surface micromachined capacitors / Roger Howe, Stanford"), so it is inherited, not invented. But the micrograph itself is stamped **"ADI – MPS  03 JAN 94"** (verified by enlarging `mems_micrograph.png`), i.e. the device is an Analog Devices part. Optional: "(surface micromachined capacitors — Roger Howe, Stanford; the device is an Analog Devices part)". *The scale claim is clean:* the image's own 10 µm bar makes the fingers ≈4-5 µm, so "a few µm across" is verified, not assumed.

- **[MINOR] [build integrity]** `scripts/check_starters.py` — the `lsm303_AccelReadRaw()` listing at `:2008-2016` is byte-for-byte the starter's (comments stripped, as the note says), but it is **not** registered in the `FUNCTIONS` list, so nothing catches drift between `assets/starters/lsm303agr_partial.c` and the slide. The i2c1_memRead entry at `check_starters.py:85` is the precedent. Add: `("assets/starters/lsm303agr_partial.c", "lsm303_AccelReadRaw", "source/ch-accelerometers.ptx", …)`.

- **[MINOR] [starter file, not the book]** `assets/starters/lsm303agr_partial.c:30-33` — "There are **8** control registers (Datasheet, Section 8.6), but only need the first one for basic operation." The book is right (§8.6-§8.11, `CTRL_REG1_A`-`CTRL_REG6_A` = **six**; Table 26 confirms 0x20-0x25 with no `CTRL_REG0_A` on this part), and the driver itself writes **two** of them, not one. Students read both documents. Also `lsm303agr.h` declares `void lsm303_AccelReadRaw(lsm303AccelData_s * const result);` while the `.c` defines `(lsm303AccelData_s *result)` — the book matches the `.c`, which is the right call; the header is the file that is out of step.

- **[MINOR] [deck, presenter guidance]** `assets/decks/day13x.json` slide 1 recap note — "Part 2 drops to one example (−2) and the close absorbs one minute. **That is the whole margin**" — against slide 13's Part 3 note, which offers a third lever ("the commit's discussion minute is the first thing to give back"), and against slide 33's close note ("End-of-class beat, **protected**"). All three are defensible individually; as instructions to a person watching a clock they disagree. Suggest: name the Part 3 minute in the recap's accounting, or drop it from the Part 3 note.

- **[MINOR] [wording, optional]** `:1936-1941` — "This is the read pattern of `fig-i2c-transfer-pattern`, **extended to multiple bytes**." Rendered `Day13-I2C(3)/i2c_transfer_pattern.svg`: that figure already contains **all four** transfers, Table 23 (multi-byte read) included, and `ch-i2c.ptx:4320` calls them "the four register-access transfers." Not false — but the reader is being told to extend something the figure already shows. "This is Table 23 of `fig-i2c-transfer-pattern`, the multi-byte read" is tighter.

- **[tracked dependency, not a defect]** `:1853-1856` forward-references `sec-accel-reference` for the signed-shift subtlety; that section (`:2183`) is still a stub. Its manifest comment (`:2118-2126`) already lists the signed-shift note, the C1/C2 differential detail (promised by `sl-day13x-mems-differential`'s note at `:1469`) and the zero-g calibration. Flagging so the three promises land when Reference is written.

---

### Reasoning (Part B)

**B1 — rules tested against the chapter's own instances.**
- The sign rule ("a number with its top bit set is negative; the top bit contributes its negative weight, the rest are read as usual") was run over **every** instance in the chapter: `0b0010` → +2 ✓; `0b1110` → −8+6 = −2 ✓; `0x4000` (bit 15 clear) → +1000 mg ✓; `0xC000` → −1000 mg ✓; `0xE000` → −500 mg ✓. The rule misclassifies nothing, and — the case most likely to bite — the rule applied at **8 bits** to the top byte agrees with the **16-bit** route on both worked values: `0xC0` → −64 × 15.625 = −1000 mg vs 4·(−16384)/2¹⁶ = −1 g; and the activity's `0xE0` → −32 × 15.625 = **−500 mg**, the same answer the instructor's 16-bit route gives. A student who copies the modelled top-byte method into the activity lands on the intended answer.
- **One finding:** "Everything today assumed … normal mode" (`:2057`, `:2076`), which the chapter's own low-power examples refute. See above.

**B2 — arithmetic recomputed independently of the conclusions.** No errors found. Recomputed: 4 g/2¹⁰ = 0.00390625 g = **3.90625 mg** ✓ (datasheet prints 3.9 ✓, Table 14 prints 4 mg/digit ✓); 4 g/2⁸ = **15.625 mg** ✓ (datasheet prints 15.63 ✓); 64 × 15.625 = **1000** ✓; 0xC0 = −128 + 64 = **−64** ✓ and −64 × 15.625 = **−1000** ✓; 0xE000 = −32768 + 24576 = **−8192** ✓ and (4 × −8192 × 1000)/65536 = **−500** ✓ (exact — the `>>16` shift and the division agree here, no floor-rounding gap); 0xC000 as 16 bits = −32768 + 16384 = **−16384**, 4·(−16384)/2¹⁶ = −1 g = **−1000 mg** ✓; stretch (1032 + (−968))/2 = **+32** ✓ and both readings are indeed 32 mg high ✓. Comparatives: "40 mg would be ten of our steps" = 40/3.90625 = 10.24 ✓ and "80 … twenty" = 20.5 ✓ (both rounded, both honest); "−1000 mg … comfortably inside ±2000 mg" ✓. Figure algebra rechecked on the render: (raw≫8)·4g/2⁸, (raw≫6)·4g/2¹⁰, (raw≫4)·4g/2¹² each collapse to 4g·raw/2¹⁶ ✓, and the bit counts drawn in the three rows are 8+8, 10+6, 12+4 ✓. Timing: 2+1+11+3+9+19+3+2 = **50** ✓ (Wednesday x-hour), and each Part's internal note sums to its section total (11 = 3+2+4+1+1; 9 = 3+3+2+1; 19 = 3+3+2+2+1+4+1+1+1+1).

**B3 — end-to-end read for self-contradiction.** Two found, both reported above (the MEMS figure vs. the Part 1 reveal; the "normal mode" summary vs. the Part 4 examples), plus the deck-note margin tension. Everything else holds across the section: the "three steps" promised at `:1325` are all three delivered; the mode/bit-count mapping (8/10/12 ↔ low-power/normal/high-resolution) is stated identically in the instructor block, the two figure captions, the masked and revealed table art, and the register table; ±2 g ⇒ 4 g full range is used consistently in every calculation and never slips to 2; "left-justified, valid bits start at bit 15" is consistent between prose, `data_format_rows.svg`, and the collapse argument; the homework close matches the opening ("tomorrow"/"yesterday" are correct for a Wednesday); `fig-accel-proof-mass` and `mass_spring_rest.svg` are correctly split commit/reveal (the rest drawing carries the "accel" arrow but no displacement — that *poses* the question rather than answering it).

**B4 — against the rest of the book.** No contradictions. "The same calculation we did for the ADC" ✓ — `ch-adc.ptx:140` gives 1 LSB = V_ref/2^B = 3.3/4096, exactly the form used here. "The same picture as the STM32C031C6's ADC" ✓ — `ch-adc.ptx:591, 866` describe one converter behind a multiplexer. `fig-i2c-transfer-pattern` exists (`ch-i2c.ptx:4319`) and is the LSM303AGR's own §6.1.1 tables ✓. The intro's recap of Day 13 (wired, 0x33 from WHO_AM_I, logic analyzer) matches `sec-accel-day13` ✓, as does the repeated homework (three items, all on paper, `:1249-1270`). "Nothing in the course has needed this encoding until now" ✓ — a grep of `source/*.ptx` finds two's complement nowhere before this section except the chapter's own objectives line. `i2c1_memRead(addr, reg, n, buf)` matches every other use in the book ✓.

---

### Verified clean (checked, not assumed)

- **Code vs. the real driver (B-6):** the struct, `lsm303_AccelReadRaw()` (signature, `i2c1_memRead(LSM303_ADDRESS_ACCEL, LSM303_OUT_X_L_A | (1<<7), 6, &data[0])`, all three byte-assembly lines) are identical to `assets/starters/lsm303agr_partial.c`; `ACC_FS 4 / ACC_REGISTERWIDTH 16 / MILLI 1000` and `a = (ACC_FS * ACCEL_raw * MILLI) >> ACC_REGISTERWIDTH` are identical to `assets/starters/accel_test.c` (note: the book correctly uses the **shift** form the driver uses, not the division form on her old slide 16). The prose's claim that the `int16_t` assignment is "where bit 15 becomes the sign" is C-accurate — the casts promote to `int`, and the narrowing conversion at the assignment is what produces the sign. No overflow in `4 * raw * 1000` at 32 bits.
- **Registers/bits vs. the reference manual (L-6):** 0x28-0x2D and 0x20-0x25 vs. Table 26 (p. 43) and `lsm303agr.h`; WHO_AM_I = 0x33; `CTRL_REG1_A` = ODR/LPen/Zen/Yen/Xen (Table 33); `CTRL_REG2_A` = high-pass filter, FDS default 0 = "internal filter bypassed" (Table 37, §8.7); `CTRL_REG3_A` = INT1 routing (Table 39); `CTRL_REG4_A` = BDU/BLE/FS[1:0]/HR/ST/SPI_ENABLE with 00 = ±2 g (Table 42, §8.9); `CTRL_REG6_A` = INT2 routing (Table 47); six control registers total; LPen+HR ⇒ 8/10/12-bit modes (Table 14); output "two's complement left-justified" (§8.14-8.16). *One nuance not worth a finding but worth knowing:* `CTRL_REG5_A` (Table 44) is interrupt latching/4D **plus** `FIFO_EN` and `BOOT`; the table row says only "Interrupt configuration."
- **Datasheet quotes:** the §6.1.1 blockquote (`:1922-1930`) and the slide's copy (`:1953`) are **verbatim** against p. 38, including the datasheet's own MSB/MSb inconsistency; the note-8 quote "1LSb = 3.9 mg in normal mode (10-bit) at FS=±2 g" is verbatim (p. 14). Page/section citations §2.1 Table 3 pp. 13-14 and §6.1.1 p. 38 are correct.
- **Figures, by rendering all of them:** `sign_bit_weights.svg` (struck-through 8 → −8, −8+4+2 = −2, bit 15 = −2¹⁵) ✓ caption; `one_byte_example.svg` (0100 0000 0000 0000, top byte 0x40 = 64, low byte 0x00) ✓; `data_format_rows.svg` (bit counts and all three equations) ✓; `accel_specs_masked.svg` (Typ column blanked, vertical "sensitivity" label, purple **?** box on the ±2 g normal row, 12/10/8-bit brackets) ✓; `accel_specs_reveal.svg` (all twelve sensitivity values matching Table 3, ±2 g normal 3.9 boxed, LA_TyOff −80/±40/+80 row present) ✓; `accel_specs_range.png` (LA_FS ±2/±4/±8/±16 g) ✓ — together they carry the caption's Top/Middle/Bottom; `mass_spring.svg`, `mass_spring_rest.svg`, `capacitive_pickoff.svg` ✓; `lsm303agr_block.svg` (blue box = accelerometer half, six caps X±/Y±/Z± → MUX → **one** charge amp → **one** A/D, red box on SCL/SPC and SDA/SDI/SDO, INT_1_XL/INT_2_XL/INT_MAG present) ✓; `breakout_schematic.svg` — every clause verified: four 10 kΩ SDA/SCL pull-ups, AP2112 3.3 V regulator, 10 kΩ pull-ups on CS_ACCEL/CS_MAG (which is exactly the datasheet's §6 requirement, "to select the I2C interface the CS line must be tied high"), and JP1's six pins = 3.3V, VCC, GND, SCL, SDA, INTM_3V, i.e. power, ground, SCL, SDA and the magnetometer interrupt ✓; `i2c_transfer_reads.svg` (Table 22 single-byte, Table 23 multi-byte with MAK/MAK/NMAK) ✓ caption.
- **Duplicated blocks:** the Part 5 register table's two copies are byte-identical; the milli-g program's two copies are byte-identical; the struct's two copies are byte-identical.
- **Build integrity:** all 16 `source=` paths resolve; every `xref`/slide `ref` in the section resolves to an existing id; `external/datasheets/lsm303agr.pdf` is hosted; `image_ratios.py --check` reports `book.css` current; `check_rules.py source/ch-accelerometers.ptx` → **0 errors, 0 warnings** (no undocumented violations, no missing `check-rules: allow` directives); `check_deck.py assets/decks/day13x.json` → 35 slides, 26 refs, **0 problems**; `check_starters.py` → **0 problems**; P-10 satisfied — all three activities (`act-day13x-mass-commit`, `act-day13x-sensitivity`, `act-day13x-convert`, the last with both tasks) have instructor solutions.
- **Classroom/physical claims (B-11c):** the SignalQuest/Simbex Thayer-alumni sentence, the "Roger Howe" credit, the 8/10/12-bit trade, the breakout gloss ("big chip is the accelerometer, little one the regulator") and the applications list are all traceable to `assets/ClassSlidesOLD/Day13x-Accelerometer.pptx` slides 5, 6, 8, 9, 11; nothing in the section asserts equipment state or kit contents (kits stay bagged — nothing is wired on this x-day, consistent with the paper-only activities).

### Unverified
- Nothing material. The only claim I could not source to a document is the deck note's "Kits stay in bags — nothing is wired today," which is a scheduling decision rather than a fact about the world, and is consistent with the section containing no wiring activity.

---

## checker-figure-claims

I have rendered and read every Day 13x figure — as standalone SVG/PNG, in the built book pages, and on the live deck at 1600×900. Report below.

---

### Verdict: MAJOR

---

### Figures opened

| # | asset / id | rendered how | what is actually in it (before reading any caption) |
|---|---|---|---|
| 1 | `mass_spring.svg` (880×430) | Chrome headless 2×; book PDF p1; slide 7 | Ground hatch, grey case (base + right wall, "case"), white square "m" left of a **dashed** square, rounded-coil spring (6 periods) from mass to wall, "k", "accel →" on the case, "F = kx = ma", "x" double-arrow between two dotted leaders, "0 (rest)" under the dashed square with a tick. Dashed square left edge x=230, mass right edge x=220 — **clear by ~7 px including strokes**. Leaders sit at x=170 and x=280 = the two squares' **centres**. "0 (rest)" anchored x=280 = dashed-square centre. All four brief items confirmed. |
| 2 | `mass_spring_rest.svg` (880×430) | 2×; slide 5 | Same scene, mass centred at x=265 sitting at rest, spring ~5 periods, "case", "accel →", **no x, no dashed square, no F=kx=ma**. Correctly withholds the answer. |
| 3 | `capacitive_pickoff.svg` (760×400) | 2×; book PDF p2; slide 8 | Two dark vertical plates, inner faces 104 px apart; ←/→ motion arrows over the left plate; gap double-arrow; "the gap tracks the displacement" with a dashed leader into the gap; "C changes with the gap"; "plate on the mass" (ends x=290) and "plate on the case" (starts x=386) — **96 px clear, no overlap**. |
| 4 | `accel_specs_masked.svg` (716×332) | 2×; slide 17 | "Table 3. Sensor characteristics" + full header row, 12 sensitivity rows, red/purple/green 12/10/8-bit brackets, Typ column wholly white, purple **?** box, rotated "sensitivity". Measured: header column rules at 11.0/82.2/248.2/496.5/539.2/599.2/642.2/706.2 — **identical to the body's, to 0.1 px**. ? box y 147.1–173.5 sits exactly on the ±2 g/normal row rules. |
| 5 | `accel_specs_reveal.svg` (716×307) | 2×; book PDF p2; slide 19 | Same 12 rows **with values** (0.98/1.95/3.9/11.72; 3.9/7.82/15.63/46.9; 15.63/31.26/62.52/187.58), purple box round the whole ±2 g normal row and a second round its **3.9**, LA_TyOff row −80/±40/+80/mg complete at the bottom, its rules within 1 px of the block's. **No header row.** |
| 6 | `accel_specs_range.png` (711×147) | direct | Table 3 title + header + LA_FS ±2/±4/±8/±16, Unit *g*. |
| 7 | `sign_bit_weights.svg` (1060×300) | 2×; book PDF p1; slide 23 | Left: 4 cells `1 1 1 0`, weights grey-struck **8** with **−8** beneath, then 4, 2, 1; "−8 + 4 + 2 = −2". Right: 16 italic *b*'s (1 + 15 = **16**, counted in source), divider after bit 15, indices 15/0, arrow up to the sign cell, "bit 15 is worth −2¹⁵" with a true raised `<tspan>` superscript, "every other bit keeps its usual value". |
| 8 | `data_format_rows.svg` (1060×470) | 2×; book PDF p2; slide 25 | Three 16-cell rows: 8 b + 8 zeros, 10 b + 6 zeros, 12 b + 4 zeros (counted in source). Per-row equations `(raw ≫ 8)·4g/2⁸ = 4g·raw/2¹⁶`, `≫6 … /2¹⁰`, `≫4 … /2¹²`, all superscripted. Arrow from "bit 15: the sign, worth −2¹⁵" lands on x=342 = the centre of row 1's first cell. Closing line "the valid bits always start at bit 15…". Arithmetic checks out in all three rows. |
| 9 | `one_byte_example.svg` (1060×250) | 2×; slide 22 | "the reading 0x4000, as 16 bits"; cells `0 1 0 0` black then twelve grey `0`; heavy divider at the byte boundary; brackets to "top byte: 0x40 = 64" and "low byte: 0x00"; indices 15/0. 0x4000 = 0b0100 0000 0000 0000 ✓, 0x40 = 64 ✓. |
| 10 | `mems_mechanism.png` (1235×468) | direct + per-panel 2× crops; book PDF p2; slide 9 | **Both panels present.** Left: straight springs, "Spring", "Moving Plate (mass)", two "Fixed Plate" bars, yellow C between a fixed and a moving finger. Right: springs bowed **left**, six ← arrows on the moving fingers and one on the plate, "← Acceleration" at the right edge, yellow C narrowed. ElectronicWings watermark. |
| 11 | `mems_micrograph.png` (282×305) | book PDF p2; slide 9 | SEM of five interleaved comb fingers, "10µm" scale bar, "ADI – MPS", "03 JAN 94". |
| 12 | `lsm303agr_block.svg` (1312×804) | 1× and 4×; book PDF p1; slide 16 | Blue box round the upper half; **six** variable-cap symbols (3 up, 3 down) labelled X+/Y+/Z+ and Z−/Y−/X− into one MUX → one triangular CHARGE AMPLIFIER → one A/D CONVERTER → CONTROL LOGIC → INT_2_XL/INT_1_XL; an I2C/SPI block on the right with CS_XL, CS_MAG, and a **red box round exactly SCL/SPC and SDA/SDI/SDO**; magnetometer half below, wired into the same I2C/SPI block; "a" and "I (M)" input arrows. |
| 13 | `breakout_schematic.svg` (1437×889) | 1×; book PDF p3; slide 20 | AP2112K-3.3 regulator ("Power supply"), ON LED, "I2C Pullups & Shift" with 10 k pull-ups on SDA/SCL and SDA_3V/SCL_3V, LSM303AGR symbol, 10 k pull-ups on CS_ACCEL/CS_MAG, JP1 with pins **1 VCC, 2 3.3V, 3 GND, 4 SCL, 5 SDA, 6 INTM_3V** (zoomed to confirm), JP3. Four blue callouts. Crop/callout displacement present as recorded — not graded. |
| 14 | `i2c_transfer_reads.svg` (Day13 dir) | slide 30 | Table 22 (ST/SAD+W/SUB/SR/SAD+R/DATA/NMAK/SP) with Petra's red gloss row, Table 23 with MAK/MAK/NMAK and the red "Subaddress autoincrements…" line. Master/Slave row labels. |

Also opened for completeness: `accel_specs_header.png`, `accel_specs_offset.png`, `accel_specs_sensitivity.svg`, `mems_mechanism_rest.png` — the last two are referenced nowhere.

---

### Correspondence failures

- **[MAJOR] slide 19 `sl-day13x-specs-reveal` — the bullet names columns the image does not label.** Text says: *"the datasheet's **Min and Max** columns allow ±80."* Image shows: `−80 | ±40 | +80` in three **unheaded** columns — `accel_specs_reveal.svg` starts at the block, so Symbol/Parameter/Test conditions/Min/Typ./Max/Unit are absent. Slide 17 two beats earlier has them; slide 19 alone does not. This is the same defect `reviews/day13x-gate3.md:600` prescribed a fix for ("`accel_specs_header.png` is already in the folder, unused, and is exactly that strip") and it was not applied. — **fix:** prepend the 711×58 header strip inside `accel_specs_reveal.svg` (viewBox → 716×365), or drop "Min and Max" from the bullet. The first is better: it also makes the boxed **3.9** sit under a visible `Typ.`/`mg/LSB` pair, which is the whole point of the reveal.

- **[MAJOR — known, parked for Petra] `fig-accel-mems` / slide 9 — the MEMS panel teaches the wrong answer to Part 1's commit.** Text (Activity 12.3.1 + `ins-day13x-mass-commit` + `fig-accel-proof-mass`): *"the mass gets left behind: seen from inside the case, it moves backward — **opposite** the acceleration."* Image (right panel, verified at 2× on both springs): the moving plate has translated **left**, both springs bow left, all six finger arrows point **left**, and the label reads **"← Acceleration"** — mass and acceleration in the **same** direction. Four slides after the room commits, the wall shows the wrong answer. The caption ("at rest and under acceleration") is true of the pixels, so nothing is mis-captioned; the failure is cross-figure. `plans/week7-handover.md` records this as hers and says *"do not re-crop"*, and `reviews/day13x-gate2.md:392` offered *"(b) keep both and add one clause naming the disagreement"* — **that clause is in neither the caption nor the slide.** — **fix: ask Petra.** Two questions, not one: (i) may the right panel's outer arrow be reversed (a one-element edit that makes the drawing correct, since the motion arrows already point the other way)? (ii) if not, may the caption carry one clause naming the disagreement? Shipping with neither leaves the day's central derivation contradicted on the wall.

- **[MINOR] slide 30 `sl-day13x-autoincrement-tables` — the caption's vocabulary is not the image's.** Text says: *"after each DATA byte the **controller** ACKs (MAK)."* Image shows rows labelled **Master** and **Slave**. The gloss exists only in the presenter note (invisible), and Day 13's own deck glosses it on a *different* slide (`sl-day13-transfer-pattern`). Graded alone, this slide asks a student to read a row that is not called what the caption calls it. — **fix:** one parenthetical in the slide caption, on the model this chapter already uses well in `fig-lsm303agr-block` ("the datasheet prints them SCL/SPC and SDA/SDI/SDO"): "(the tables' Master is our controller, their Slave our target)".

- **[MINOR] slide 8 `sl-day13x-capacitive` — "compute x" over a figure that never prints x.** Text: *"measuring the capacitance lets us compute **x**."* Image: "the gap tracks the displacement" / "C changes with the gap" — the symbol `x` appears nowhere. — **fix:** label the two plate-motion arrows `x` in `capacitive_pickoff.svg` (there is room at y≈70), or write "compute the displacement x".

---

### Notation mismatches

- `fig-accel-data-format` — text: `a = 4g·raw/2¹⁶` (body) / caption: `a = FS·raw/2¹⁶` / figure: `4g·raw/2¹⁶`. **No change needed** — the caption reconciles them explicitly ("where FS is the full-scale range, 4 g here"). Recording it as the model the other two mismatches above should follow.
- `fig-lsm303agr-block` — text: `SCL`/`SDA` / figure: `SCL/SPC`, `SDA/SDI/SDO`. **No change needed** — the caption names both forms. Same model.
- `sl-day13x-autoincrement-tables` — text: `controller`/`target` / figure: `Master`/`Slave`. **Change the slide caption** (see above).
- `sl-day13x-capacitive` — text: `x` / figure: *displacement*, no symbol. **Change the figure** (cheaper and it helps slide 7's continuity).

---

### Legibility

Measured on the live deck at 1600×900; house metric is rendered font size ÷ 900, the one `reviews/day13x-gate2.md:406` used (2 % = 18 px).

| slide | figure | smallest load-bearing text | on-stage | verdict |
|---|---|---|---|---|
| 5 | `mass_spring_rest` | "case" (30 px @ 0.935) | 3.1 % | pass |
| 7 | `mass_spring` | "0 (rest)" (26 px @ 0.824) | **2.4 %** | pass, no margin — do not shrink |
| 8 | `capacitive_pickoff` | "plate on the mass" (28 px @ 1.0) | 3.1 % | pass |
| 9 | `mems_mechanism` | "Acceleration" | ~3.0 % | pass (SEM legend decorative) |
| **16** | **`lsm303agr_block`** | **CHARGE AMPLIFIER / A/D CONVERTER / MUX / X+…X− — cap height 10–11 px measured** | **≈1.6 %** | **FAIL** |
| 17 | `accel_specs_masked` | row text | 2.1 % | pass (was 1.7 % at Gate 2 — the widening worked) |
| 19 | `accel_specs_reveal` | row text | 2.2 % | pass (was 1.9 %) |
| 20 | `breakout_schematic` | native pin names / designators | <1.5 % | known, rides on ask A1 |
| 22 | `one_byte_example` | bit indices 15/0 (22 px @ 0.807) | 2.0 % | borderline; "top byte: 0x40 = 64" 2.5 % |
| 23 | `sign_bit_weights` | the sixteen *b*'s (24 px @ 0.889) | 2.4 % | pass |
| 25 | `data_format_rows` | equation superscripts | 2.2 %; body 3.1 % | pass |
| 30 | `i2c_transfer_reads` | table cells | 2.0 % | borderline pass |

- **[MAJOR] slide 16 `sl-day13x-block-fig` — 1.6 %, on the one slide whose caption instructs reading those labels.** The caption says "six sense capacitors — a pair per axis — into the multiplexer, the one charge amplifier and one A/D converter they share, and the control logic": five labels, every one of them at 1.6 %. **The lever is a bigger figure, not smaller text** — but the figure is already height-limited (1008 × 617 px in ~700 px of available height; growing it to the maximum that fits still only reaches 1.8 %). Gate 2 prescribed cropping to the accelerometer half; Petra then ruled the whole diagram stays (`reviews/day13x-gate3.md:493`, and the presenter note says why — "so the room can see the two halves sharing one I2C/SPI interface"). Her ruling and the 2 % bar cannot both be met on one slide. — **fix: make it two slides.** Keep slide 16 whole-diagram for the two-halves-share-one-interface point (which needs no small-label reading, only the two boxes and the shared block), and add a second slide cropped to the accelerometer **chain** — caps → MUX → charge amp → A/D → control logic, roughly x 280–1080 / y 130–500 of the 1312×804 — where the walk actually happens. At 1480 px wide that crop puts the labels at **≈2.1 %**. The book keeps the full diagram unchanged. If a crop is not wanted at all, this needs Petra: an export of the accelerometer half at native resolution.
- **[MINOR] slides 22 and 23 have free legibility on the table.** Slide 22 has **219 px** of empty stage below its figure and runs `width="58%"`; slide 23 has **166 px** and runs `64%`. Taking 22 to ~80 % lifts its bit indices from 2.0 % to ~2.7 % and costs nothing.
- B-11a mechanical check: all eleven hand-authored SVGs carry `width`/`height` matching their `viewBox`. `python3 scripts/check_rules.py --quiet source/ch-accelerometers.ptx` → 0 errors, `check_deck.py day13x.json` → 0 problems, `image_ratios.py --check` → current. The linter was run.

---

### Composite / build defects

- **[MINOR] `fig-accel-specs` in the book — the two stacked strips do not share a scale, so the column rules jog at the seam.** The figure is two `<image>`s (`ch-accelerometers.ptx:1651–1652`): `accel_specs_range.png` is 711 px wide and fills the 86 %; `accel_specs_reveal.svg` has a **716**-wide viewBox whose block sits at x=0..711, so it renders at 0.993 of the other's scale. Measured on the built page, the vertical rules land at 207/302/525/859/916/997/1055/1140 above the seam and 211/305/527/858/915/995/1052/1137 below — a **+4 px to −3 px** spread. Zoomed 3×, the outer left border and the Symbol divider visibly step right below the seam. — **fix:** compose the range strip into `accel_specs_reveal.svg` (or a third SVG) so one coordinate system governs all three strips, exactly as that file already does for its block + offset pieces. That also collapses the two `<image>`s in one `<figure>` into one, which is the arrangement this figure wants — the three strips are meant to read as one continuous table, not as two views.
- **[MINOR] `accel_specs_masked.svg` bottom edge leaves a ~4 px stub of the next table row** (viewBox 332; the block's last rule lands at y=328). Cosmetic; trim the viewBox to 328 or extend to a full row.
- **[MINOR] the two spring drawings do not agree as a pair, and slides 5 → 7 show them consecutively.** `mass_spring_rest.svg` draws ~5 coils with its **last coil visibly compressed** (51 units vs 64 for the rest — obvious at 4×, subtle at slide size); `mass_spring.svg` draws **6** coils at a uniform 64 pitch. A stretched spring keeps its coil count and opens the pitch; here it gains a coil. The rest position also differs between the files (rest mass centred at 265, dashed rest square centred at 280). No caption is wrong; it is a continuity nit on the day's opening beat.
- **[MINOR, housekeeping]** four assets in `assets/images/Day13x-Accelerometer/` are referenced nowhere — `accel_specs_header.png`, `accel_specs_offset.png`, `accel_specs_sensitivity.svg`, `mems_mechanism_rest.png` (already noted at `reviews/day13x-gate3.md:603`). The first is the strip the slide-19 fix above wants; the other three are superseded interim crops and are easy to mistake for current assets.
- Not graded, per the brief: the breakout composite's crop and callout displacement (the regulator arrow through `AP2112K-3.3`, "Pullups set device for I2C" floating with no arrow, "I2C pullups" sitting over `R3G$3`) — all confirmed present, all covered by ask A1. Watermarks and the dashed square crossing the coils confirmed present, not graded.

---

### Look before shipping (crop candidates, not defects)

Every one of these I rendered in the player and saw uncropped at 1600×900; the numbers are the headroom that remains, and the risk is the *next* edit.

- **slide 16** `sl-day13x-block-fig` — 2-line caption + full-height figure — **21 px free**. Tightest on the day. One more caption line crops the magnetometer half off the bottom, which is the half the caption's last sentence is about.
- **slide 19** `sl-day13x-specs-reveal` — **2 bullets (5 rendered lines)** + a 716×307 table — **30 px free**, and the bottom row (LA_TyOff, −80/±40/+80) is exactly what bullet 2 sends students to. Adding the header strip recommended above makes the image ~19 % taller — check this one in the player *after* that change, or trade a bullet line for it.
- **slide 25** `sl-day13x-collapse` — `stack="yes"`, 2 bullets + `data_format_rows` — 70 px free.
- **slide 17** `sl-day13x-specs-commit` — 4-line paragraph + the masked table — 60 px free.
- **slide 9** `sl-day13x-mems` — `stack="yes"`, 2 bullets + a 2.6:1 sidebyside — 104 px free.

---

### Shared between days

- **`assets/images/Day13-I2C(3)/i2c_transfer_reads.svg`** is used by **Day 13** (`ch-accelerometers.ptx:845`, `sl-day13-transfer-reads`: *"Table 22 is the shape your trace has — and NMAK is the N on your trace"*) and **Day 13x** (`:1959`, slide 30: *"Table 22 is yesterday's single-register read; Table 23 is today's"*). I checked the current file against both captions: Table 22 with NMAK ✓, Table 23 with MAK/MAK/NMAK ✓. Any re-crop for Day 13x's auto-increment beat silently changes Day 13's trace-matching slide — re-render and re-read both.
- No figure in `assets/images/Day13x-Accelerometer/` is referenced outside `sec-accel-day13x`; all eight `xml:id`s resolve within the section.
- `one_byte_example.svg` reaches the **wall only** — the book's Part 4 opening paragraph carries 0x4000 → 0x40 → 1000 mg in prose with no figure, while slide 22 has the picture. Not a correspondence defect (nothing is mis-claimed), but flagging it for `learner-visual`: the asset exists and the book paragraph is the one that introduces left-justification.

---

Files: `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (figures at lines 1381, 1412, 1439, 1545, 1640, 1684, 1758, 1816; slides at 1346, 1392, 1421, 1454, 1568, 1601, 1687, 1694, 1728, 1768, 1827, 1957), `/Users/dz00762/repos/ENGS28/assets/images/Day13x-Accelerometer/`, `/Users/dz00762/repos/ENGS28/assets/decks/day13x.json`. Renders kept at `/private/tmp/claude-503/-Users-dz00762-repos-ENGS28/0a850db4-a67e-47d2-af02-99edb9b26f68/scratchpad/figs/`.

---

# Synthesis — the change list

## Verdict

**Not ready for Petra — seven must-fix items, two of them correctness.** But the seven have one cause between them, and it is not seven problems. Every reviewer found a different symptom of the same defect: **teaching that exists only where the reading book cannot see it.** `<slide>`, `<instructor>` and `presenterNote` are all stripped from the reading book, and ten distinct pieces of Day 13x live only there — the inertia answer (text-first BLOCKER), the 16-bit reconciliation (novice BLOCKER), the cancellation mechanism (text-first MAJOR + voice #2), the `mg/LSB` gloss (voice #6), the 4 g span (text-first MINOR), the "In low-power mode" condition (voice #9), the left-justification picture (novice MAJOR + figure-claims), the `lsm303_AccelReadRaw()` body (voice #19 + novice), the multi-byte transfer shape (arc-fidelity), and the C1/C2 detail (arc-fidelity). Fix the cause once and five reviewers' blockers close together. The genuinely independent problems are small: one sentence in Part 5 that the chapter's own worked examples refute, one instructor clause the datasheet refutes, and one figure of hers whose arrow contradicts the day's central derivation — which is an ask, not an edit. Arc-fidelity's structural verdict (all 19 of her slides reach the room, budgets reconcile at 50, all five pass-2 additions landed) and technical-accuracy's arithmetic sweep (clean, every value recomputed) both hold; nothing below is a rebuild.

**Budget rule enforced throughout (B-18):** voice measured 24 body paragraphs and found no padding, so **no item below adds a body paragraph.** Every addition is a sentence into an existing paragraph, a move of an asset that already exists, or a caption clause. Paragraph count after this list: 24.

---

## Must fix (blocks sign-off)

**1. [B1/B3, S-13] `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx:2056-2062` and the slide note at `:2076` — a summary sentence the chapter's own Part 4 refutes.**
"Everything today assumed the ±2 g range and normal mode" is false: `:1720` and the whole worked example at `:1778` are **low-power**; only the Part 3 derivation used normal mode. Replace both copies (the comment at `:2031-2034` already says they change together):

> "Everything we did today assumed the ±2 g range; the sensitivity derivation used normal mode, and the worked conversions used low-power. `CTRL_REG1_A` and `CTRL_REG4_A` are where both choices actually get made, and working out their settings from the datasheet is part of tonight's homework (`<xref ref="sec-accel-day14-before"/>`)."

Slide note (`:2076`), same claim, note register: "Everything we did today assumed ±2 g — the derivation used normal mode and the worked conversions low-power. `CTRL_REG1_A` and `CTRL_REG4_A` are where both choices get made."
Raised by: checker-technical-accuracy (MAJOR, B1/B3), checker-voice (#17, the "we"). *Not negotiable; the voice fix rides along and weakens nothing (S-16 checked).*

**2. [L-6] `.../ch-accelerometers.ptx:1632-1637` (`ins-day13x-sensitivity`) — a causal claim the datasheet refutes, spoken to the room.**
"The lower the number of bits, the faster you can generate measurements" is true only of low-power mode: normal and high-resolution share an ODR list topping out at 1.344 kHz (lsm303agr.pdf §8.6 Table 35, p. 47); only low-power adds 1.620 and 5.376 kHz. Her deck's wording, so borrow the body prose's already-correct clause (`:1669`):

> "Fewer bits means bigger steps, and low-power mode runs at output data rates the other two cannot (§8.6, Table 35) — notice in the table how the sensitivity gets better as you go to higher resolutions."

Add a one-line source comment saying the datasheet, not the draft, corrected her note.
Raised by: checker-technical-accuracy (MINOR, but a wrong reason under a right answer — Part B is not tradeable).

**3. [B1/B3 + P-15] `.../ch-accelerometers.ptx:1440-1447` (`fig-accel-mems` caption) and `:1459` (`sl-day13x-mems` note) — interim clause for the MEMS panel. NO pixel edit, NO re-crop.**
Petra's pass-1 comment restored both panels; that ruling stands and neither reviewer may touch the image. But four slides after the room commits to "the mass moves opposite the acceleration", the right-hand panel shows plate, springs and all six finger arrows moving **left** beside a label reading **"← Acceleration"**. Gate 2 (`reviews/day13x-gate2.md:392`) already prescribed the naming clause and it landed in neither place — this is the second round.

Caption, appended to the "Left:" sentence:
> "…capacitors that change as it moves; in its accelerating panel the arrow labelled *Acceleration* is the mass's acceleration **as seen from inside the case**, which points opposite the case's own — the mass still lags the case, as we derived."

Slide note (`:1459`), appended: "Say this at the right-hand panel: the borrowed drawing's arrow is the acceleration seen from inside the case, opposite the case's acceleration. The mass still lags, as the reveal showed."
Interim pending **Ask A** below; if she declines the arrow edit, promote the clause to a third bullet on `sl-day13x-mems` (104 px of stage free, per figure-claims).
Raised by: checker-technical-accuracy (BLOCKER), checker-figure-claims (MAJOR) — convergent: one asks whether the picture shows what the text claims, the other whether it teaches. **DISPLACES:** nothing; the note clause replaces no content.

**4. [P-1, P-2] `.../ch-accelerometers.ptx:1805-1814` — the crucial step's two routes never meet in the book, and the collapse has no mechanism.** One composed rewrite of the whole paragraph, covering three reviewers at one location:

> "The other two modes work the same way. `<xref ref="fig-accel-data-format"/>` shows all three writing their valid bits into the same 16-bit word, with one equation per mode. To convert a raw reading, shift the zero bits off the bottom, then multiply by that mode's step size. Every one of the three simplifies to the same thing: `<m>a = 4g \cdot \mathrm{raw} / 2^{16}</m>`. This works because the valid bits always start at bit 15, so the shift and the step size always cancel to 2¹⁶. The same reading decoded this way gives the same answer: as a whole 16-bit word, 0xC000 is −32768 + 16384 = −16384, and 4 g × (−16384) / 2¹⁶ = −1000 mg — the number the top-byte route gave. When no mode is stated, this is the route to use: the whole 16-bit word, with the collapsed formula."

**This does not violate her deletion, it completes it.** Her strike and her "WHAAAAATTTTT?????" were aimed at the *unsigned-minus-2^width phrasing* the deck-24 line carried; the sentence above uses only her approved route (top bit's negative weight plus the remaining bits read as usual), and the arithmetic is already scripted out loud in the notes of deck 24 and deck 25. Arc-fidelity is right that the **deck** side is settled — and nothing here goes back on a slide. This is a book-prose move of a presenter note, and it is what makes the activity at `:1876` (0xE000, no mode stated, answered at 16 bits) answerable by a reader who only ever saw the top-byte walk.
Raised by: learner-firstgen-novice (BLOCKER, P-1/P-2), learner-text-first (MAJOR, B-7/P-4), checker-voice (#2, S-27/L-16 — its rewrite is the spine of the wording above).
**DISPLACES:** the vague "exactly because…" clause; and `sl-day13x-worked`'s note (`:1802`) drops its now-duplicated parenthetical — deck 25's note keeps the spoken version. Zero new paragraphs.

**5. [P-5, P-10 carve-out] `.../ch-accelerometers.ptx:1367-1370` — Part 1's answer reaches the room and not the reader.** *Why* the mass lags is inertia, and it exists only in `ins-day13x-mass-commit`, which is stripped. Per P-10's own carve-out, a jointly-discussed physical explanation is teaching, not a solution. Replace the paragraph's opening clause:

> "Because of its inertia, the mass resists the case's acceleration: seen from inside the case it is displaced backward, opposite the acceleration, until the spring's restoring force grows to match the force needed to carry it along. That displacement is what is measured, and we can turn that observation into a formula (`<xref ref="fig-accel-proof-mass"/>`). Two familiar facts are enough: …"

**Leave `ins-day13x-mass-commit` (`:1357-1365`) intact** — it is the reveal the room needs — and do **not** add the sentence to `sl-day13x-derivation`, or the room hears it twice one slide apart. Each artifact then carries it exactly once (B-8 holds).
Raised by: learner-text-first (BLOCKER, P-5/P-10), learner-firstgen-novice (MINOR, P-6), checker-voice (#12, L-13 — its "we can turn that observation into a formula" is used verbatim above; a figure *is*, it does not *do*).
**DISPLACES:** the replaced clause; net +1 sentence, no new paragraph.

**6. [S-16, P-2] `.../ch-accelerometers.ptx:1713-1727` — a condition lost off the crucial step's first number.** As drafted, "the top byte is 0x40 = 64, and with a full-scale range of ±2 g each step is 4 g / 2⁸" reads as though 8 bits follows from ±2 g. 15.625 mg is the **low-power** step. Her passed slide repeats the condition onto the step-size sentence on purpose; take the slide's wording exactly:

> draft: "Suppose the two bytes contain the reading 0x4000: the top byte is 0x40 = 64, and with a full-scale range of ±2 g each step is 4 g / 2⁸ = 15.625 mg, so this reading corresponds to an acceleration of 64 × 15.625 mg = 1000 mg — one g."
> **hers:** "Suppose the two bytes contain the reading 0x4000: the top byte is 0x40 = 64. In low-power mode with a full-scale range of ±2 g, each step is 4 g / 2⁸ = 15.625 mg, so this reading corresponds to an acceleration of 64 × 15.625 mg = 1000 mg — one g."

Raised by: checker-voice (#9). Filed as must-fix rather than voice because the missing condition is a wrong reason under a right answer, at the crucial step.

**7. [B-7, B-9a, P-1] `fig-accel-specs` — one composed-SVG fix plus one paragraph, covering four findings at one location.**
Four reviewers hit this figure; it is one job:

- **The art.** Compose the strips into one coordinate system. (a) `assets/images/Day13x-Accelerometer/accel_specs_reveal.svg` → prepend the existing, currently-unused `accel_specs_header.png` strip (711×58), viewBox → 716×365, so the boxed **3.9** sits under a visible `Typ.` and the bullet's "Min and Max columns" name columns the image actually labels. (b) For the book, build `accel_specs_table.svg` = range rows + header + the twelve sensitivity rows + the LA_TyOff row on one geometry, and replace the **two** `<image>` elements at `.../ch-accelerometers.ptx:1651-1652` with that one image at 86% — this kills the +4/−3 px column jog at the seam. Then re-render slide 19 at 1600×900: it has only 30 px free and the image grows ~19% taller; if it crops, take the width from 74% to 68% and keep both bullets.
- **The caption** (`:1641-1650`) — two clauses:
  - voice #6, verbatim: "…the table prints 3.9 mg/LSB — milli-g per least significant bit, the size of one step — the number we derived as 4 g / 2¹⁰ = 3.90625 mg"
  - and the 4 g justification, eight words at the end of that same clause: "…= 3.90625 mg (the ±2 g range spans 4 g, from −2 g to +2 g)". *This is the resolution of text-first's P-1 MINOR — see Dissent.*
- **The paragraph** (`:1664-1674`), voice #1, hers verbatim — armature out, the lost number back in:

> "The unmasked table (`<xref ref="fig-accel-specs"/>`) confirms the arithmetic. The three modes trade resolution against speed: fewer bits means bigger steps, and low-power mode runs at rates the other two cannot. The zero-g offset row is below it: lying perfectly flat, the sensor reads typically ±40 mg away from the true value, and the datasheet's Min and Max columns allow ±80. 40 mg would be ten of our steps — 80 mg would be twenty — and a significant amount of error."

Raised by: checker-figure-claims (MAJOR, unlabeled columns; MINOR, the seam), checker-arc-fidelity ("adopt hers" — her slide 8 carries the header), checker-voice (#1 S-28/S-16, #6 acronym), learner-text-first (MINOR, P-1).
**DISPLACES:** the count-armature "and it says two more things worth reading carefully"; two `<image>`s become one. Run `python3 scripts/image_ratios.py` and commit `assets/book.css` (the aspect ratio changes).

---

## Should fix

**8. [B-6, B-13, P-1] `.../ch-accelerometers.ptx:1964-1997` + `/Users/dz00762/repos/ENGS28/scripts/check_starters.py` + `/Users/dz00762/repos/ENGS28/assets/starters/lsm303agr_partial.c` — put the function in the book, guard it, and fix the starter's own count.**
Ruled against arc-fidelity's "acceptable": every other function this chapter discusses (`whoami_test.c`, `helloDisplay.c`, `i2c1_memRead()`) appears in the book, the paragraph's claim is load-bearing for Lab 7 D1, and no source comment records the omission as deliberate.
- `:1966-1967`, voice #15 verbatim: "…and a pointer to a variable of this type is what `<c>lsm303_AccelReadRaw()</c>` fills in:"
- Split the paragraph at `:1981` after "…assembles each pair into one signed 16-bit value:" and insert `sl-day13x-readraw`'s listing (`:2008-2016`) as a `<program>`; the remainder resumes "The line `result->x = ((int16_t) data[1] << 8) | ((int16_t) data[0]);` widens each byte, moves the high byte up eight places, ORs them, and stores the result in an `int16_t` — which is where bit 15 becomes the sign. This is a different use of the shift and OR operators than we have seen so far: …". Add the chapter's standing comment: two copies of one listing (book + `sl-day13x-readraw`), change them together.
- Register the pair, in `FRAGMENTS` (not `FUNCTIONS`; precedent at `check_starters.py:85`): `("assets/starters/lsm303agr_partial.c", "lsm303_AccelReadRaw", "source/ch-accelerometers.ptx", "i2c1_memRead(LSM303_ADDRESS_ACCEL, LSM303_OUT_X_L_A | (1<<7), 6, &data[0]);")`.
- `lsm303agr_partial.c:30-33`: "There are **8** control registers … but only need the first one" → six (§8.6-§8.11, Table 26), and the driver writes **two**. The book is right; the handout contradicts it and students read both.
Raised by: checker-voice (#19, #15), learner-firstgen-novice (MAJOR — the half of it that survives), checker-technical-accuracy (MINOR ×2).
**DISPLACES:** the paragraph's inline re-quotation of the assembly expression; a listing insertion, not a new body paragraph.

**9. [P-4] `.../ch-accelerometers.ptx` after `:1727` — promote `one_byte_example.svg` into the book.** "Left-justified" is a spatial idea and the reading has no picture of it; the asset exists and reaches the wall only. Add `<figure xml:id="fig-accel-one-byte">` after the Part 4 opening paragraph, `<xref>`'d from it, B-7 caption:
> "The reading 0x4000 as it sits in the two data registers, all 16 bits. In low-power mode only the top byte carries valid bits — 0x40 = 64 — and the low byte is zeros: that is what left-justified means. At ±2 g in low-power mode each step is 15.625 mg, so 64 steps is 1000 mg, one g."

Same location, free legibility: `sl-day13x-one-byte`'s inline image (`:1735`) has 219 px of empty stage — take `width` from **58% → 80%**, which lifts the bit indices from 2.0% to ~2.7%. Keep it inline (do not convert the slide to a `ref`).
Raised by: learner-firstgen-novice (MAJOR, P-4/P-7), checker-figure-claims (flagged wall-only; legibility MINOR). **DISPLACES:** nothing — an asset move plus a caption; no new paragraph. Re-run `image_ratios.py`.

**10. [calibration, S-13] `.../ch-accelerometers.ptx:1479-1497` — the applications paragraph, hers, one sentence per case.** Seven passed bullets are folded into two 144-word periodic sentences; her passed slide is one plain declarative each. Her version also turns the second telling of the phone hook (first told at `:1333`, twelve paragraphs earlier) into a callback. Adopt verbatim — it restores the prose to 1:1 with the slide's seven bullets, in order:
> "Tilt is the case we started with: your phone measures gravity's pull along each axis to decide when to rotate its screen. An airbag sensor detects the sudden deceleration of a crash. Before solid-state drives, an accelerometer detected a falling laptop and pulled the disk heads off the spinning drive before it hit the floor. A step counter in a wearable picks up the impact of every footfall, and football helmets carry accelerometers to measure hits to the head. Accelerometers also monitor machinery: a change in a machine's vibration pattern can flag a failure building before anything else shows it. Paired with a gyroscope they form an IMU (inertial measurement unit) — the motion sensor in vehicles and drones. Two local companies founded by Thayer alumni build on exactly this technology: SignalQuest (precision motion sensing) and Simbex (the helmet impact sensors)."

Raised by: checker-voice (#5). Text-first and the novice did not flag it, which is expected — it reads fine; the failure is register, and register is voice's remit, not theirs. Length-neutral, no claim weakened (the vibration content survives in the machinery sentence).

**11. [B-9a] Acronym expansions — four locations, both copies each, verbatim.**
- `LSb` — book `:1919-1920` and slide `:1953`. Hers, book: "…where its `<q>slave</q>` is our target, and `<q>LSb</q>` and `<q>MSb</q>` are the least and most significant bits:"; slide (which currently carries no gloss at all, S-9): "But note the datasheet's own wording (§6.1.1) — where its `<q>slave</q>` is our target, and `<q>LSb</q>` and `<q>MSb</q>` are the least and most significant bits: `<q>an 8-bit sub-address…</q>`"
- `LPen` / `HR` — book table `:2047`, `:2050` **and** slide table `:2069`, `:2072` (the note at `:2031` says change together). Hers: "Data rate, power mode (the `<c>LPen</c>` bit — low-power enable), axis selection — *ours to set*." and "Full-scale range (±2, ±4, ±8, ±16 g) and the `<c>HR</c>` bit — high resolution; together with `<c>LPen</c>` in `<c>CTRL_REG1_A</c>` it picks the resolution mode — *ours to set*."
Raised by: checker-voice (#7, #8). (`mg/LSB` is item 7.)

**12. [B-8a, S-12] `.../ch-accelerometers.ptx:1938-1940` and `:1960-1961` — the multi-byte transfer shape, and the tables' vocabulary.** `sl-day13x-autoincrement-tables` teaches MAK/NACK that no Day 13x paragraph carries, and the one clause behind it points at a figure in another chapter. Two edits at one location:
- Replace "This is the read pattern of `<xref ref="fig-i2c-transfer-pattern"/>`, extended to multiple bytes." with: "This is Table 23 of `<xref ref="fig-i2c-transfer-pattern"/>`, the multi-byte read: the controller acknowledges each data byte (MAK) so the target serves the next register, and a final not-acknowledge (NMAK) ends the transfer."
- Slide caption `:1960`, add figure-claims' parenthetical: "…(the tables' Master is our controller, their Slave our target)". **DISPLACES:** the conditional "If anyone asks…" clause in the note at `:1961` — it is now visible instead of contingent.
Raised by: checker-arc-fidelity (MINOR), checker-technical-accuracy (MINOR, the tighter wording — the figure already contains Table 23, so "extended to" tells the reader to extend what they are looking at), checker-figure-claims (MINOR, Master/Slave). One sentence into an existing paragraph.

**13. [L-5/L-6, P-1] `.../ch-accelerometers.ptx:1713-1715` and slide `:1731` — three names for one concept inside the crucial step.** The prose introduces `<term>subaddress</term>`, `ch-i2c.ptx:4324` already defines "SUB is the **sub-address**", the datasheet quote says "sub-address (SUB)", and Part 4 reverts to "register address" twice (`:1918`, `:1935`). Keep her term, weld it, match ch-i2c's hyphen — both copies:
> "The acceleration readings are put in the data registers of the accelerometer's memory, at a register address — the datasheet calls it a `<term>sub-address</term>` (SUB) — which we can find in the datasheet."

The later "register address" uses then stand correct as written. Raised by: expert-continuity-auditor (MAJOR). The slide changes with the prose: it is a hyphen and an apposition, not a claim.

**14. [S-18, S-30, B-9] Titles: the agenda, Part 5, and the Part 5 opening.** One pass over four artifacts:
- `/Users/dz00762/repos/ENGS28/assets/decks/day13x.json:14-18` — replace the five agenda items with the five section-slide titles as they now stand: "The physics of a proof mass" / "**Accelerometers are everywhere**" / "**The LSM303AGR, and its datasheet**" / "The data format" / "**Settings for basic accelerometer operation**". Her pass-2 comment was *"Just say Accelerometers are everywhere"*; the exact phrasing she struck still projects two slides before the retitled section slide, and the Part 3 drift has now survived two rounds.
- `.../ch-accelerometers.ptx:2029` — subsection title → "Part 5: Settings for Basic Accelerometer Operation" (her slide 11's own words).
- `day13x.json:67` — the content slide's title → "Six control registers — two of them are ours", so deck 32 and 33 stop reading as a stutter.
- `.../ch-accelerometers.ptx:2035-2041`, voice #3, hers verbatim: "We now know how to read the data out of the sensor. What we have not done yet is tell the sensor how to run. The accelerometer has six control registers, all reachable over I2C. Only two of them matter for us — the rest are about features we leave at their defaults."
Raised by: checker-arc-fidelity (two MINORs), checker-voice (#18, #3). **DISPLACES:** nothing — titles only; no slide added, no minute moved.

**15. [B-9, B-11a, S-3, B-8a] `fig-lsm303agr-block` / slides 15-16 — three edits, one figure.**
- Book caption `:1551`, text-first's wording verbatim: "…one analog-to-digital converter shared by all three axes — the same architecture as the STM32C031C6's ADC (`<xref ref="ch-adc"/>`), which likewise multiplexes several input channels through one shared converter." (Verified true against `ch-adc.ptx:591, 866`; the bare analogy as drafted can mislead, since V_ref is single-ended and a ±2 g span doubles to 4 g.) Free on the wall — the player hides the book caption.
- Slide caption `:1569` → one instructive line (S-3): "The accelerometer is the boxed upper half: six sense capacitors — a pair per axis — into the multiplexer, and the one charge amplifier and A/D converter they share." The magnetometer sentence is already in the note verbatim. Then grow the figure to the maximum height that fits the freed space (~1.6% → 1.8% of stage). **This is an interim; see Ask B.**
- `sl-day13x-block`'s note `:1565`, append her slide-10 speaker note, which currently has no home: "If you wanted to use one of the interrupt pins you'd wire it to a pin on your microcontroller, set up a pin-change interrupt, and write an ISR for it — the GPIO interrupts chapter." (Plain words, no `<xref>`: notes are copied into deck JSON.)
Raised by: learner-text-first (MAJOR, B-9/B-11b), checker-figure-claims (MAJOR, legibility), checker-arc-fidelity (MINOR, the orphaned note).

**16. [S-8] Budget: give `sl-day13x-readraw` its minute back, and make the three margin notes agree.**
The plan budgets 2 minutes for byte assembly and says why (a shift-and-OR that builds a wider signed value from two array elements — an idiom unlike anything so far, load-bearing for Lab 7 D1); the deck gives it 1, as the last slide of the densest Part, and it now carries a listing (item 8). Fund it from Part 2's **row**, not from her bullets:
- `sl-day13x-readraw` note (`:2019`) and `day13x.json:51` Part 4 breakdown → ≈2 min; Part 4 row 19 → **20**.
- `day13x.json:34` Part 2 → **≈2 min**; the applications slide keeps all seven bullets.
- Rows become 11 / 2 / 9 / 20 / 3; 2 + 1 + 11 + 2 + 9 + 20 + 3 + 2 = **50** ✓.
- Reconcile the notes that disagree as instructions to someone watching a clock: `day13x.json:11` recap note names both remaining levers (Part 2 down to one example, −1; and the Part 3 commit's discussion minute) and drops "That is the whole margin"; `:40` Part 3 and `:66`/`:70` stay as they are.
Raised by: checker-arc-fidelity (MINOR), checker-technical-accuracy (MINOR, the three-way note disagreement). I overruled arc-fidelity's specific lever — see Dissent.

**17. [voice] The remaining rewrites — apply verbatim, six of them, three seconds each.** Each is her own passed wording where a tighter invention was written instead; none weakens a technical claim (checked, S-16).

| line | draft | hers |
|---|---|---|
| `:1778` | "Here is the whole conversion once, on the reading 0xC000." | "**We'll work the whole conversion once, on the reading 0xC000, step by step.**" (rest unchanged; her slide says "We convert it step by step") |
| `:1539` | "You interact with the chip through control and data registers, over I2C, and it has hardware interrupt pins we're not using." | "You interact with the chip through its control and data registers, over I2C — **SPI is the other option, and the breakout wires it for I2C by default** — and **through** hardware interrupt pins we're not using." |
| `:1741` | "Nothing in the course has needed this encoding until now, so here is the whole of it:" | "**We have not needed** this encoding until now, so here is the whole of it:" (S-20 generalized) |
| `:1676` | "The last thing between the chip and your breadboard is the breakout board: it carries the I2C pull-up resistors, a voltage regulator, and the pull-ups on the configuration pins that set the chip for I2C (`<xref/>`)." | "**The breakout board carries the parts the chip needs:** the I2C pull-up resistors, a voltage regulator, and pull-ups on the configuration pins that set the chip for I2C (`<xref/>`)." (verbatim her passed slide caption) |
| `:1573` | "The first number to pull out of the datasheet is how *fine* this converter's steps are — and we can derive it before we read it off the table." | "**The next number to take from the datasheet is the size of one step of the converter's output, and** we can derive it before we read it off the table." |
| `:1402` | "There are resistive, capacitive, and inductive ways of measuring a displacement; our sensor uses the capacitive one." | "There are **multiple ways of measuring a displacement: resistive, capacitive, and inductive techniques. Our sensor uses the capacitive one.**" (two sentences, as on the passed slide) |

---

## Consider

- **`capacitive_pickoff.svg`** — slide 8's bullet says "measuring the capacitance lets us compute *x*"; the drawing never prints `x`. Label the two plate-motion arrows `x` (there is room at y≈70). Cheaper than rewording, and it makes slide 8 continuous with slide 7's `x`. — checker-figure-claims (MINOR).
- **`fig-accel-mems` caption `:1446-1447`** — the micrograph is stamped "ADI – MPS 03 JAN 94", i.e. an Analog Devices part, while the inherited credit reads "Roger Howe, Stanford". Optional: "…(surface micromachined capacitors — Roger Howe, Stanford; the device is an Analog Devices part)". Her credit is inherited, not invented, so this is accuracy garnish, not a defect. — checker-technical-accuracy (MINOR).
- **`accel_specs_masked.svg`** — 4 px stub of the next table row at the bottom edge; trim viewBox 332 → 328. Do it in the same sitting as item 7. — checker-figure-claims (MINOR).
- **`mass_spring_rest.svg` vs `mass_spring.svg`** — the rest drawing has 5 coils with the last one compressed; the displaced drawing has 6 at uniform pitch, and the rest position differs (265 vs 280). A stretched spring keeps its coil count and opens its pitch. Slides 5 → 7 are consecutive. — checker-figure-claims (MINOR).
- **Housekeeping** — after item 7, `accel_specs_header.png` is in use; `accel_specs_offset.png`, `accel_specs_sensitivity.svg` and `mems_mechanism_rest.png` are referenced nowhere and are easy to mistake for current assets. Also `lsm303agr.h` declares `(lsm303AccelData_s * const result)` while the `.c` defines `(lsm303AccelData_s *result)` — the book matches the `.c`, which is right; the header is the file out of step, and it ships to students tomorrow. — checker-arc-fidelity, checker-figure-claims, checker-technical-accuracy.

---

## Escalate to Petra

**A — `fig-accel-mems`, the right-hand panel's arrow.** Her pass-1 comment restored both panels and `plans/week7-handover.md` records "do not re-crop", so neither a crop nor a silent arrow edit is available to us — but in that panel the plate, both springs and all six finger arrows point left beside a label reading "← Acceleration", which is the opposite of the answer the room commits to four slides earlier. Two questions, not one: (i) may the outer arrow alone be reversed, a one-element edit that makes the borrowed drawing agree with our convention; or (ii) if not, does the caption clause in Must-fix 3 read acceptably to her? **Recommendation:** ask for (i) — it is the only fix the wall can see, since a slide has no caption — and ship the clause meanwhile. Note this was offered at Gate 2 and has now gone two rounds unresolved.

**B — `lsm303agr_block.svg`: her whole-diagram ruling and the 2% legibility bar cannot both be met on one slide.** She ruled at pass 1 that the block-diagram slide shows the whole diagram so the room can see the two halves sharing one I2C/SPI interface; the five labels the caption instructs students to read (MUX, CHARGE AMPLIFIER, A/D CONVERTER, X+…X−) measure 1.6% of stage height against a 2% bar, and the figure is height-limited — growing it to the maximum that fits reaches only 1.8%. **Recommendation:** ask her for an export of the **accelerometer half at native resolution** (drop path `assets/images/Day13x-Accelerometer/lsm303agr_block_accel.png`; the `<image source>` line would be the only change, and the book keeps the full diagram). I have **rejected** the committee's alternative — adding a second, cropped slide — because it adds a slide to an exactly-reconciled 50-minute deck and re-decides her ruling by routing around it; if she prefers that, it is hers to grant, not ours to take.

---

## Rejected

- **checker-figure-claims' two-slide block-diagram fix** (keep 16 whole, add a cropped accelerometer-chain slide). It **dodges her ruling rather than honoring it**: her comment settles what the room sees when that point is made, and the reviewer's own escape hatch — "if a crop is not wanted at all, this needs Petra" — is the tell that this is an asset request. It also adds a 36th slide to a deck whose beats sum exactly to 50 and whose only spare minute is already spoken for by item 16. → Ask B, plus the interim in item 15.
- **learner-firstgen-novice's "define `struct` on first use."** Factually wrong and I checked it myself: `/Users/dz00762/repos/ENGS28/source/ch-intro-blinky.ptx:2117-2136` prints `typedef struct { … } GPIO_TypeDef;` and then explains that "`GPIOA->ODR = value` is exactly equivalent to writing to address `0x5000 0014`" — and `GPIOA->ODR` has appeared in every program since Day 2. Defining `struct` again here violates B-8. Expert-continuity-auditor is right, and the persona is arguing outside its evidence. **The half of the finding that survives is real** — the `result->x = …` line exists only on a stripped slide — and item 8 fixes exactly that.
- **learner-text-first's fix for the 4 g span** ("…±2 g, ±4 g, ±8 g, or ±16 g — a span of 4 g, 8 g, 16 g, or 32 g respectively…", stated *before* `act-day13x-sensitivity`). The doubling is the only non-mechanical step in that activity — the deck note names it as the classic slip — and pre-stating it leaves the activity as a division (P-17). The finding is right that the caption's "4 g / 2¹⁰" shows the 4 without justifying it, so the justification goes **after** the commit, in the caption, as the parenthetical in item 7. Scaffold the path, don't remove the rung.
- **checker-arc-fidelity's funding lever** for the ReadRaw minute (fold the vibration bullet into the wearables bullet on `sl-day13x-applications`). That slide grew to seven bullets at her pass-2 request; deleting one to buy a minute is the silent-loss failure B-8a exists to prevent, and it would break the 1:1 that item 10 has just restored. Funded from the Part 2 **row** instead — same minute, no content lost.
- **checker-voice's "A/D converter vs analog-to-digital converter — pick one"** (listed by the reviewer itself as cosmetic). The current pattern is already B-9a's prescribed one: expanded at first prose use (`:1538`) and again in the caption (`:1550`), abbreviated thereafter (`:1569`, `:1586`, `:1607`). No change.
- **`ins-day13x-convert:1901`'s `/ 65536`** where prose and slides use 2¹⁶ (voice, "for Petra"). Instructor-facing, the arithmetic is verified correct, and the divisor written out is arguably clearer when spoken. Leave it.

---

## Deferred — `sec-accel-reference` (week 7, session 4)

Three of this day's promises land only when Reference is written; the manifest at `:2168-2182` lists them but does not name what depends on them, which B-8a calls a drop with a note attached. Replace the manifest comment with a marker that names its dependents by id:

```
<!-- DELIVERY (week 7, session 4): sec-accel-reference prose.
     Sibling shape is sec-i2c-reference ("nothing here is new" opener, then
     lookup-form subsections).  OWES, by id — each is already asserted or
     promised somewhere a reader can see:
       - the signed-shift note (>> is an arithmetic floor shift) — the xref
         at subsec-day13x-data-format :1855 sends the reader here for it
       - the C1/C2 differential-capacitance detail — asserted by
         sl-day13x-mems-differential (:1462), routed here by the Part 1
         comment (:1317, "do not grow it back here"); until this is written
         it reaches the room only, and no reader at all
       - the zero-g offset calibration (flat + flipped, average) — worked in
         ins-day13x-convert (:1903), which is stripped from the reading book
       - the LSM303AGR register map / lsm303agr.h
       - the data-format arithmetic in full, with the worked negative example
       - IEEE 754 layout; precision vs range said precisely
       - AN-1057 depth (three-angle orientation, quadrants) —
         external/datasheets/an-1057.pdf is hosted (2026-08-27)
     Until this section exists it must not be xref'd from any NEW location. -->
```

**Trigger, decided now so nobody has to ask:** if Reference has not been written when the book goes to Petra, add arc-fidelity's one pre-approved sentence to the MEMS paragraph at `:1429` — two capacitors, ΔC = C₁ − C₂, and with Q = CV the differential charge is ΔQ = (C₁ − C₂)·V_exc — and note in the source that it is a placeholder for the Reference entry. It is content she asked for twice. Otherwise leave Part 1 alone: the comment at `:1317` says do not grow it back, and that is a recorded decision, not an omission.

---

## Dissent worth recording

- **learner-text-first wanted the 4 g span stated before the sensitivity activity, not after it.** I put it in the caption to protect the one thing that activity asks students to work out. If the room comes out of that commit having mostly written 2 g / 2¹⁰ and the reveal has to rescue them, text-first was right and the span belongs in the activity's introduction.
- **checker-figure-claims wanted a second, cropped block-diagram slide.** If students in the room cannot follow the left-to-right chain walk on slide 16 at 1.8%, that judgment was correct and the answer is Ask B's native-resolution export, not more caption work — two rounds of patching one figure fixed nothing on Day 12 because the defect was the asset.
- **checker-arc-fidelity ruled the current ReadRaw split (prose in the book, listing on the slide) acceptable.** I overruled it toward printing the listing. If Petra reads the Part 4 page and finds it code-heavy against a 50-minute x-hour, her call reverses mine cheaply — delete the `<program>`, keep the `check_starters.py` entry pointed at the slide copy, and record the omission as deliberate in the source comment, which is what voice asked for either way.
- **checker-voice offered to leave the phone hook told twice** if the applications paragraph should stand alone. I took the callback ("Tilt is the case we started with"). If she ever moves Part 2 away from Part 1, the callback becomes a dangling reference and the plain sentence should come back.

*After applying: `./scripts/build-all.sh`, then `python3 scripts/image_ratios.py --check` (items 7 and 9 change figure geometry — commit `/Users/dz00762/repos/ENGS28/assets/book.css`), `python3 scripts/check_rules.py --quiet source/*.ptx`, `python3 scripts/check_deck.py assets/decks/day13x.json`, `python3 scripts/check_starters.py` (item 8 adds a pair).*

*Application note (session): item 8's edit to assets/starters/lsm303agr_partial.c (the "8 control registers" comment) was NOT applied — her files are not edited without her approval (only the two comments she approved on Day 13 were); it goes to the ask-Petra list as a one-word fix instead.*
