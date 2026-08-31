# Day 13x — Gate 2′ (skeleton + deck), 2026-08-30

Reviewed: `source/ch-accelerometers.ptx` `sec-accel-day13x` at commit c4bb734,
`assets/decks/day13x.json` (32 slides).  Panel: checker-arc-fidelity,
checker-technical-accuracy, checker-voice, checker-figure-claims,
expert-cognitive-load, expert-continuity-auditor, expert-class-logistics,
learner-visual, learner-firstgen-novice, learner-anxious-nonhardware,
learner-in-the-room; then committee-synthesizer.  Every reviewer was briefed
with the length budget (B-18): additions need a DISPLACES line; the only
honest sources are Part 2 → one example (−2) and the close (−1).

---

## learner-firstgen-novice

# Gate 2′ Review — Day 13x (`sec-accel-day13x`), read as a first-gen novice

I read this in order, as it will project, with only Day 13 and the ADC/I2C chapters behind me. No hardware today — I'm reading and computing on paper.

## Verdict: BLOCKER

## Findings

- **[BLOCKER] P-1** `source/ch-accelerometers.ptx:1480–1491` (`act-day13x-sensitivity` / `task-day13x-sensitivity`) — I stop cold on *"compute it, in mg per step"* and on the intro's *"first pick a full-scale range — ±2 g, ±4 g, ±8 g, or ±16 g."* Nobody has told me what **g** means as a unit here. I've seen "mg" mean milligrams (mass) in every other context in my life — is this the same thing? Is it a typo for "mV"? The only sentence in the entire day that says *"1 g = 9.8 m/s² — so multiplying by 1000 gives milli-g"* is the caption on `sl-day13x-mg-formula` (line 1627), which is a full Part later, after I've already been asked to compute, commit an answer, and read a reveal all in units I was never given. Neither this Part's DELIVERY-2 marker (line 1438–1445) nor Part 4's (1558–1567) owns this definition, so it's a genuine gap, not deferred prose. **Fix:** add one clause to the sensitivity lead-in the marker already owes (line 1442, "the sensitivity lead-in that poses the commit's question") — *"…in milli-g (mg): 1 g is the acceleration of gravity, 9.8 m/s², and 1 mg is a thousandth of that."* One clause, no new paragraph, costs nothing against the budget.

- **[BLOCKER] P-2, P-4, P-7** `source/ch-accelerometers.ptx:1578–1594` (`sl-day13x-sign`, `sl-day13x-worked`) — This is where the hour loses me for good. The slide's own note admits *"FIRST teaching, not review: nothing before this week has decoded a signed bit pattern"* — and then teaches it in one bullet: *"In two's complement, 0b1110 reads −8 + 4 + 2 = −2 — the top bit is worth −8, and the rest are ordinary."* I have nothing to point at. The one figure that shows the bit layout, `fig-accel-data-format` (line 1596), doesn't appear until **three slides later** — after `sl-day13x-worked` has already walked a full 16-bit example (0xC000) with no diagram at all. So the single hardest new idea of the term (P-2's crucial step, by the source's own comment at line 1552) is delivered as an assertion I'm told to accept, verify it once in an example I still can't picture, and then reproduce alone on 0xE000. **Fix:** move `fig-accel-data-format` (or a 4-bit-only crop of it) up to sit beside `sl-day13x-sign`, and add one row of bit-weight boxes under the `0b1110` line (8 · 4 · 2 · 1, with the top box crossed out and relabeled −8) so the sum has something to point at. This is a reorder plus a table already implicit in the existing figure — it displaces nothing.

- **[MAJOR] P-1, B-8** `source/ch-accelerometers.ptx:1450, 1461, 1469, 1405–1406` (`fig-lsm303agr-block`, `sl-day13x-block`) — The block-diagram walk names *"a charge amplifier"* three times, and it's never explained anywhere in the day. Worse: the *same box* was already described in Part 1's MEMS slide (line 1406) in different words — *"a capacitance-to-voltage circuit"* — and the two names are never tied together. When I hit "charge amplifier" in Part 3 I can't tell if it's new or the thing I already met. Part 3's DELIVERY-2 marker (line 1438–1445) only owes *"a sentence for the block diagram's chain,"* which doesn't guarantee the reused name. **Fix:** when that sentence is written, say *"a charge amplifier — the same capacitance-to-voltage circuit from Part 1"* (or vice versa in Part 1's MEMS paragraph). One parenthetical, no new content.

- **[MINOR] P-19** `source/ch-accelerometers.ptx:1587–1594` vs `1633–1638` — The worked model (0xC000) never does a plausibility check, but the independent activity (0xE000, line 1638) asks me to do one I've never seen modeled: *"Then check your answer for plausibility — is it inside the range?"* It's answered fine in the instructor reveal, but the room never watched anyone do it together first. **Fix:** add one clause to the end of `sl-day13x-worked`'s bullet 2 — *"...−1000 mg — minus one g, comfortably inside ±2000 mg."* No length added; it replaces "minus one g" rather than following it.

Files reviewed: `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (sections `sec-accel-day13`, `sec-accel-day13x`), `/Users/dz00762/repos/ENGS28/assets/decks/day13x.json`, `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (rules P-1 through S-21).

---

## expert-class-logistics

# Day 13x Gate 2′ — Logistics Review

## Verdict: BLOCKER

The 50-minute budget reconciles exactly at the Part level (2+1+11+3+9+19+3+2 = 50, matching `assets/decks/day13x.json`'s recap `presenterNote`), and `check_deck.py`'s own S-8 arithmetic passes. But one sub-beat inside the **CRUCIAL, not-cuttable** Part 4 has silently drifted a minute short of what `plans/day13x.md` itself specifies, the class carries zero minutes of slack for the ordinary friction of three separate commit→reveal pivots, and the day's opening move (phones out, find a level app) has no presenter fallback. None of this trips `check_deck.py`, because the Part-level totals still balance — the drift is inside a Part, which is exactly what this hand audit is for.

## Running clock (as authored, zero friction)

| Clock | Beat |
|---|---|
| 0:00–2:00 | Settling |
| 2:00–3:00 | Announcements |
| 3:00–6:00 | Part 1 commit — phones out, tilt, pose mass question, commit in writing |
| 6:00–8:00 | Part 1 reveal |
| 8:00–14:00 | Part 1 derivation + capacitance + MEMS |
| 14:00–17:00 | Part 2 (soft-cuttable, −2) |
| 17:00–26:00 | Part 3 — block diagram, sensitivity commit + reveal, breakout |
| 26:00–37:00 | Part 4 beats 1–5 (unsigned byte → sign → worked example → collapse → mg formula) |
| 37:00–40:00 | Part 4 conversion commit (0xE000, alone, on paper) — **authored 3 min; plan specifies 4** |
| 40:00–41:00 | Part 4 reveal |
| 41:00–45:00 | Part 4 auto-increment + ReadRaw — **ReadRaw authored 2 min; plan specifies 1** |
| 45:00–48:00 | Part 5 (not cuttable) |
| 48:00–50:00 | Close (soft-cuttable, −1) |

**Realistic prediction:** the day's only new, first-time, five-sub-step independent skill (binary → sign → unsigned value → mg via a multi-digit multiply/divide → plausibility check) is budgeted the *same* 3 minutes as the single-operation sensitivity commit three Parts earlier, immediately after seeing exactly one worked example. Applying the stated 3× completion-spread heuristic to a 2–2.5 min "confident" completion time puts the slow third of the room past minute 40 before they finish writing — right as the reveal fires. Add normal pivot friction (pens down, refocusing after three separate write-then-reveal beats, 8 section changes) that has **no line item anywhere in the budget**, and the class is realistically 4–6 minutes long by the time it reaches Part 5. Because the only named recovery levers (Part 2 −2, Close −1 = 3 min total) sit *before* Part 4 and are already the day's entire contingency, the actual squeeze lands on the two items the plan explicitly calls "not cuttable" and "protected": **Part 5 (the sole in-class setup for tomorrow's homework-dependent commit) and the Close.** Prediction: class ends mid-Part 5 or with Part 5 rushed to under a minute, and/or the Close's homework framing dropped — the opposite of what the plan says must survive.

## Findings

- **[BLOCKER] [S-8/P-2] Part 4 conversion commit (`act-day13x-convert`)** — Authored at 3 min in the deck's `presenterNote`, but `plans/day13x.md`'s own Part 4 breakdown specifies "4 the conversion activity, 1 its reveal." The missing minute reappears on `sl-day13x-readraw` (source `<note>` says "≈ 2 min," plan says 1) — a clean, apparently unintentional 1-minute swap from the crucial independent-decode task to a passive code-walk. This is the day's *sole* named crucial step (P-2: scaffold to the slowest student), it is the densest first-time skill of the week, it has no stretch-side relief for slow finishers (only fast ones get the offset stretch), and the reveal follows in one more minute with no cushion. **Fix (net zero, inside Part 4's existing 19 min — no DISPLACES needed):** bump `act-day13x-convert`'s `presenterNote` to "≈ 4 min," and trim `sl-day13x-readraw`'s `<note>` in `source/ch-accelerometers.ptx` (line ~1735) from "≈ 2 min" to "≈ 1 min," matching the plan's original split.

- **[MAJOR] [S-8] No transition slack anywhere in the 50 minutes** — The Part rows sum to exactly 50 with nothing held back for the ordinary cost of three commit→reveal pivots (pens down, calling on students, refocusing) and eight section changes. The entire contingency for both content overrun *and* this transition friction is the 3 minutes named in the cut order (Part 2 −2, Close −1), and both of those levers sit early, before the highest-risk beats (Part 3's commit, Part 4 entire). **Fix:** either fold an explicit ~1 min of "settle after commit" into the two commit-heavy Parts' own budgets (Part 1 and Part 4, taken from their least-loaded beats — Part 1's capacitance/MEMS beats at 1 min each are candidates to compress to a single 1.5 min beat), or state explicitly in the presenter notes that the Part 2/Close cut is the *only* margin in the hour and must be spent the instant Part 1 or Part 3 runs long, not held in reserve.

- **[MAJOR] [P-14/P-2] Phone/level-app opening move has no failure-mode cue** — `act-day13x-mass-commit`'s introduction and presenterNote ("have the room actually pull phones out and tilt") assume every student has a working level app ready to hand, on the very first activity of class, using personal devices for the first time in this course. No presenter cue exists (deck or source) for "no such app," a dead phone, or a student who doesn't want a phone out — and any stall here, at minute 3–6, eats directly into the tightest budget of the week before any recovery lever has fired. **Fix:** one added sentence to the `presenterNote` on `act-day13x-mass-commit`: *"If a student has no level app or a dead phone, they can answer from the case-accelerating-right scenario alone — the phone is a hook, not a requirement; do not let it stall the room."* Zero-cost, keeps the beat inside its existing 3 minutes.

- **[MINOR] [S-8] Plan's stated Part 3 soft-cut doesn't map to an actual beat** — `plans/day13x.md`'s not-cuttable list says of Part 3's sensitivity commit: "if the room stalls on the derivation, its fifth minute is the first thing to give back" — but Part 3 totals only 9 minutes across four sub-beats (3/3/2/1); nothing in it has a fifth minute. The deck's own section `presenterNote` is clearer and *is* executable ("the commit's discussion minute is the first thing to give back," i.e., trim the reveal+modes-trade beat from 2 to 1). **Fix:** sync `plans/day13x.md`'s prose to the deck's wording so the documented soft-cut actually points at a real beat — cosmetic, but worth doing before this plan is reused as ground truth for a future day.

- **[MINOR] [P-2] Part 3 sensitivity commit's known trap has no student-facing self-check** — The presenter is warned ("the classic slip is using 2 g as the range instead of 4") but the student task gives no plausibility check the way the Part 4 conversion task does ("is it inside the range?"). Low stakes since it's a predict/reveal, not independent work, but a one-clause addition ("does your answer look close to the 3.9–4 mg/LSB you'd expect from a 10-bit ADC-style split?") would let a fast student catch their own range error before the reveal rather than after. **Fix:** optional one-clause addition to `task-day13x-sensitivity`'s statement in `source/ch-accelerometers.ptx` (line ~1484).

## What is not a problem (checked, passed)

- All three committed writes (`act-day13x-mass-commit`, `sl-day13x-specs-commit`, `act-day13x-convert`) correctly carry `room="yes"`/`"room": true` and are immediately followed in the deck array by their reveal — commit mechanics are sound.
- The Part 2 (−2) and Close (−1) cuts are mechanically executable: Part 2 is a single static bullet slide, so "one example" is a spoken-time cut, not a slide edit; the Close is a reminder of already-assigned homework, compressible to one minute.
- No "bench" language, no spare-hardware mention, and no equipment ask anywhere in `sec-accel-day13x` or `day13x.json` — correct for a bags-stay-closed conceptual day.
- The Part 4 conversion task's own "check your answer for plausibility" clause is a good self-diagnostic (P-14): a sign error will produce an out-of-range mg value, catchable without the instructor.

**Files reviewed:** `/Users/dz00762/repos/ENGS28/plans/day13x.md`, `/Users/dz00762/repos/ENGS28/assets/decks/day13x.json`, `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (lines 1297–1787), `/Users/dz00762/repos/ENGS28/scripts/check_deck.py`.

---

## expert-continuity-auditor

### Verdict: MINOR

### Findings

- **[MINOR] L-5/L-6 naming drift** — `source/ch-accelerometers.ptx:1465` — the presenter note for `sl-day13x-block` says "WHO_AM_I was one of the control registers." Day 13 never called WHO_AM_I a control register (`source/ch-accelerometers.ptx:107-141` treats it as a read-only identification register), and Part 5's own table (`source/ch-accelerometers.ptx:1752-1765`) restricts "control register" to `CTRL_REG1_A`–`CTRL_REG6_A`, which govern behavior — WHO_AM_I governs nothing. The note blurs a distinction the chapter itself draws forty minutes later. Fix: "WHO_AM_I was one of the registers reachable that way" (drop "control").

- **[MINOR] SKELETON/DELIVERY-2 compliance** — `source/ch-accelerometers.ptx:1416-1420` — the Part 2 `OWES` marker ("one paragraph carrying the three examples... exactly as the slide has them... and the SignalQuest/Simbex sentence") is the only owed-prose marker in the section that names no `xml:id`. Every sibling marker does. Fix: add `sl-day13x-applications` to the Part 2 marker.

- **[MINOR] Term reuse without acknowledgment** — `source/ch-accelerometers.ptx:1485` (`<term>sensitivity</term>` = "the size of one step of the output," i.e., mg/LSB) vs. `source/ch-io-datasheets.ptx:500-503` (sensitivity = the DRV5053's mV/mT analog output slope, explicitly taught as *not one number* and dependent on part suffix). Both are legitimate, datasheet-native uses of the word, but the accelerometer chapter neither flags the different sense nor calls back to Day 5x's own "sensitivity" lesson. Not a blocker — each use is locally well-defined and matches its own datasheet's vocabulary — but worth a half-sentence tying it back, since Day 5x made a point of "the sensitivity is not one number."

**Checks that passed and are worth recording as confirmed, not just silent:**
- Two's complement is genuinely first-taught at `sl-day13x-sign`: grepped every earlier chapter — Day 10's signed-counter task (`source/ch-i2c.ptx:3691-3741`) is confirmed to route around decoding via `abs()`, and no earlier chapter decodes a signed bit pattern. `int16_t` (true signed) appears nowhere before `source/ch-accelerometers.ptx:1706`.
- The subaddress weld happens in the same slide that first uses the bare term (`sl-day13x-one-byte`), correctly tying back to Day 13's "SUB" labeling.
- `BSRR` does not appear anywhere in the file — deferred topic intact.
- Day 14's answer values (`0x77`/`0x00`) appear nowhere in student-facing Day 13x content — the only occurrence is the build comment explicitly forbidding it.
- Downstream delivery to Day 14/Lab 7 is complete: the raw→mg formula and `#define`s match `plans/day14.md`'s scaling line verbatim; the ±1000 mg/flip test is named; auto-increment and low-byte-first assembly are both taught as their own beats; Part 5's control-register table is exactly what Day 14 Part 2's commit needs and is marked not-cuttable.
- The datasheet thread continues rather than restarts: §7 Table 26 (Day 13) → §2.1 Table 3, §6.1.1 (Day 13x) — consistent citations.
- Length budget holds; the only stated overrun sources match the plan's cut order verbatim.
- Not lab-collapsed: Parts 1–2 are substantive with no lab dependency (P-13).
- The Day 13 header table vs. Day 13x's control-register table are not a B-8 duplicate — one transcribes addresses/defaults, the other teaches function — and the homework repetition between Day 13 Part 8 and the Day 13x close is explicitly self-labeled "the reminder, not a new item."

---

## learner-anxious-nonhardware

### Verdict: BLOCKER

I read this as the fifty minutes with nothing to plug in, so nothing to break — that part of the day I trust before I even open the file. What worries me is the one moment I do have to produce something alone (0xE000), and where I'd go if I froze on it.

### Findings

- **[BLOCKER] P-1, B-8a** — `source/ch-accelerometers.ptx:1558-1594` (Part 4, the crucial step). The `<!-- DELIVERY 2 -->` comment defers "the sign paragraph (bit 15 is worth −2¹⁵ — FIRST teaching... the 4-bit +2/−2 contrast; the 0xC000 worked example)" and the one-byte-unsigned walk — but that content is already asserted, almost word for word, on `sl-day13x-one-byte` and `sl-day13x-sign`. Per B-8a, "an explanation of something a figure or slide already asserts is written now." Because `<slide>` content is stripped from the student book (B-1), what this means *today* is that the reading book has **no explanation at all** of how to read a two's-complement bit — only `fig-accel-data-format`'s caption survives, and it states the fact without the procedure. This is the first time anyone in the course has been asked to decode a signed pattern, and it's also the one thing I have to do alone, on paper. If I lose the thread live, my own laptop's copy of the book currently has nothing to scroll back *to*. Fix: write the sign paragraph and the 0xC000 walk now; the text is already drafted almost verbatim in the slide bullets and the OWES comment itself. Same defect, lower stakes, in Part 1 (`fig-accel-proof-mass`'s derivation is deferred though `sl-day13x-derivation` already asserts it). No `DISPLACES` needed — this is already-budgeted content changing when it's written, not new length.

- **[MAJOR] B-8a, B-11b** — `source/ch-accelerometers.ptx:1300-1304` vs `assets/decks/day13x.json:6-10`. The day's opening two sentences ("yesterday we read 0x33... today is the inside") are deferred in the book, but the deck's own recap slide already states them verbatim. As built, the book section falls from its title straight into Part 1's mass-and-spring activity with no orientation to what "yesterday" was. Fix: copy the two sentences from the deck's recap into the book now — B-8a requires it since the assertion is already made elsewhere. No `DISPLACES` needed.

- **[MAJOR] P-6, S-17** — `act-day13x-mass-commit`'s presenterNote: "Collect two or three answers out loud without ruling on them." This is the one commit in the day that's spoken aloud rather than only written, so it's the one place a wrong guess is briefly public. The same chapter already has the fix, at `ch-accelerometers.ptx:684`, for an equivalent beat: "...without ruling on them — most get the pieces right and the number of transactions wrong, **and the trace settles it, not you**." Day 13x's version stops one clause short. Fix: "Collect two or three answers out loud without ruling on them; the derivation on the next slide settles it, not you." Presenter-note text, no `DISPLACES` needed.

- **[MINOR] Not a defect, worth recording so it isn't "fixed" later.** `assets/decks/day13x.json:11` correctly keeps "Kits stay in bags — nothing is wired today" in the presenterNote only, per S-25. As authored this **lowers** my anxiety about the day, and the reassurance is instructor-delivered verbally, never written to students — the correct call under S-25; a future pass must not add a banned "don't worry, nothing to plug in today" line (B-12 theater) to fix a problem that doesn't exist.

Files: `source/ch-accelerometers.ptx` (section `sec-accel-day13x`), `assets/decks/day13x.json`, cross-checked against `AUTHORING-book.md`.

---

## expert-cognitive-load

### Verdict: MAJOR

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| The sensitivity result, 3.9 mg/LSB (= 4 g/2¹⁰ = 3.90625 mg) | 3, two of them full derivations | `ins-day13x-sensitivity` (instructor REVEAL, projected: full arithmetic + datasheet quote), `fig-accel-specs` caption (book), `sl-day13x-specs-reveal` (a *second* deck slide, immediately after the first reveal) | `ins-day13x-sensitivity` as the one worked derivation (it is the answer to the commit); `fig-accel-specs` caption (book captions must be self-contained, B-7) | `sl-day13x-specs-reveal`'s opening clause — delete "The table prints 3.9 mg/LSB… our 3.90625, rounded" and open on the new content instead: "The unmasked table confirms it. The three modes trade speed against resolution…" |
| The zero-g offset, ±40 mg | 3 | `fig-accel-specs` caption, `sl-day13x-specs-reveal` bullet 2, `task-day13x-offset-stretch` intro | `fig-accel-specs` caption (reference) and `task-day13x-offset-stretch` (the stretch is reached minutes later and must stand alone, B-11b) | `sl-day13x-specs-reveal` bullet 2 — the image already shows the ±40 mg row; say only what's new without re-stating the number the caption already gave |

Nothing else in the section clears the bar: the book-paragraph/its-own-condensing-slide pairs (auto-increment, byte assembly, the physics derivation, the block diagram) are each stated once in the book and once on the one slide built from it — that pairing is the architecture (B-1), not duplication. `sl-day13x-specs-reveal` is the repeat offender for both rows above.

### Findings

- **[MAJOR] S-9, P-4 — `sl-day13x-autoincrement`.** This slide reuses yesterday's I2C protocol figure (`i2c_transfer_reads.svg`, Tables 22 and 23) with only the intro paragraph as on-slide text — no `<caption>`. The one sentence that makes the figure legible as *new* material ("Table 22 is the WHO_AM_I read's shape; Table 23 is today's payoff… after each DATA the controller ACKs and the chip serves the next register, until the final NACK") exists only in the deck's `presenterNote`, invisible to any student and absent from the book. Load-bearing: the plan's "Day 14 needs from here" names "auto-increment… understood so `AccelReadRaw()` is not magic." Fix: promote the presenter note's distinguishing sentence into a one-line `<caption>` on the slide (S-3/S-9). No class time added — already-spoken content, now also written — so no displacement is needed.

- **[MAJOR] B-8 — `sl-day13x-specs-reveal`.** This one slide re-states two facts each already given in full elsewhere (see census). In a day with zero slack this costs real seconds twice in a row for no new information. Fix: per the census's "cut or reduce to" column. This is a cut; it frees time, no DISPLACES required.

- **[MINOR] P-7, B-9a (spirit) — `sl-day13x-block`.** One un-illustrated, 1-minute slide names the device plus its unused magnetometer/temperature sensor, walks a 4-stage signal chain, raises an I2C-vs-SPI aside, *and* names three specific interrupt pins (`INT_1_XL`, `INT_2_XL`, `INT_MAG`) — confirmed by grep to appear nowhere else in the chapter. Naming three proper identifiers that are immediately discarded is pure extraneous load. Fix: "It also has hardware interrupt pins, which we're not using" — cut the three names. Zero-cost cut.

- **[MINOR] S-8 — Part 4's section-level `presenterNote`.** The stated per-beat breakdown ("4 the conversion activity, 1 its reveal… 1 ReadRaw") does not match the actual per-slide minutes: `act-day13x-convert` is annotated ≈3 and `sl-day13x-readraw` ≈2. The Part-4 total of 19 reconciles only because the two errors cancel — the S-8 failure mode one level further down. Fix: make the note and the slide minutes agree.

- **[MINOR] B-16, B-8a — Part 1's DELIVERY-2 marker.** The marker guards the level-app hook against repetition but not the kx = ma derivation, which `fig-accel-proof-mass`'s caption and `sl-day13x-derivation` already state in full. When the connecting prose is written, a third full re-derivation would be a duplicate (B-8); the paragraph should motivate and add the axis-triplication point, not re-derive the algebra. Advisory for DELIVERY 2.

**On the crucial step itself:** the staging holds up and is the strongest part of the draft — each of the six beats adds exactly one new idea, no slide forces left-justification, sign and scaling into one breath, and the worked `0xC000` example's four steps are a genuine model for the committed `0xE000` conversion. The sensitivity commit correctly keeps question and masked image on one slide; its problem is downstream, in the reveal that follows it twice over.

---

## learner-visual

### Verdict: MAJOR

Most of Day 13x's figures are excellent — the spring/capacitor/MEMS chain (slides 7–9) is exactly the "register-as-boxes" style P-4 asks for, the breakout schematic (18) and auto-increment table (27) carry hand-drawn callouts that instruct rather than describe, and the bit-row collapse (23) is a genuinely good grid. But the day's single hardest, first-ever idea — the sign bit — gets no picture until two beats and a full worked example after it's introduced, and the one datasheet diagram the class is told to trace by eye is captioned to read text that measures under half the size a back-row student can resolve.

### Per-slide notes (figure slides)

- **7 (derivation)** — Clean. Labels on the spring diagram; bullets and picture agree.
- **8 (capacitive)** — Clean. "the gap tracks the displacement" is baked into the image as an instruction — good S-3 form.
- **9 (MEMS)** — Clean. The micrograph earns its place by showing the µm scale claimed in the bullets.
- **14 (block diagram)** — The blue accelerometer box and red SCL/SDA highlight are legible, but the labels they point *at* — CHARGE AMPLIFIER, A/D CONVERTER, CONTROL LOGIC, MUX — measure roughly 10–13px tall at 1600×900, about **1.1–1.5% of slide height**. The slide's own caption instructs students to read them. See finding.
- **15 (sensitivity, masked)** — The masking is fine (already decided); "?" and colored brackets big and legible. Row text small (~1.7%) but secondary here.
- **17 (sensitivity, reveal)** — Same table, borderline row text; the boxed 3.9 mg/LSB is legible and does the teaching. See minor finding.
- **18 (breakout schematic)** — The four blue callouts carry the whole one-sentence point; tiny native labels illegible but "do not linger" — appropriately low-stakes.
- **23 (three modes, one formula)** — This is the figure the sign teaching needed two beats earlier. On its own it's excellent.
- **27 (auto-increment)** — Datasheet tables reused with Petra's red gloss restored — good P-12 use, legible.
- **28 (ReadRaw)** — Code listing; fine as is.

### Findings

- **[MAJOR] P-4 — `sl-day13x-sign` (slide 21), and `sl-day13x-one-byte` (20)** — The sign bit is "FIRST teaching" yet slides 20→21→22 (≈8 minutes) teach it entirely in prose and hex arithmetic — three consecutive slides with a blank lower two-thirds and not one box drawn. The picture that would make "bit 15 is worth −2¹⁵" as obvious as "each bit is one pin" doesn't appear until slide 23's three-row collapse, *after* the concept and a full worked example have gone by in text. Fix: pull forward one row of the already-built `data_format_rows.svg` (a single 16-box row with the bit-15 arrow and "−2¹⁵" label) onto slide 21, in its current blank canvas. DISPLACES: nothing — the slide's lower ~65% is empty and the asset already exists.

- **[MAJOR] B-11a / B-11 — `sl-day13x-block-fig` (slide 14)** — Measured off the rendered slide, the interior chain labels are ~10–13px tall at 1600×900 (≈1.1–1.5% of slide height) — under back-of-room legibility, and this is the one slide whose caption tells students to read them. The asset is an embedded 1296×788 raster; displaying at native width already overflows the slide's height, so the labels are stuck this small at any size that fits. Fix: crop the source image to just the boxed accelerometer half (the magnetometer half is fully handled by the caption's one line and never revisited) and re-render at roughly 2× scale — B-11's "crop to what matters" plus B-11a's "make the figure bigger." DISPLACES: nothing — same slide, same beat, cropped image only.

- **[MINOR] B-11 — `sl-day13x-specs-commit` / `sl-day13x-specs-reveal` (slides 15, 17)** — The table carries 12 rows (4 ranges × 3 modes) at ~1.7% row height, when only the ±2 g/normal-mode row is ever used. The colored brackets carry the essential teaching so this isn't blocking, but cropping to the ±2 g rows would let the relevant text scale up within the same footprint — B-11's "crop to what matters," not yet applied here.

---

## checker-arc-fidelity

## Verdict: PASS WITH CHANGES

(Full her-slide → our-element mapping table produced and checked slide by slide; abridged here to the judgments.)

| her slide | judgment |
| --- | --- |
| 1–2 | furniture/divider, carried |
| 3 (proof mass) | carried; F = ma and F = kx named separately per Gate 1; her figure redrawn faithfully |
| 4 (displacement) | carried (resistive/capacitive/inductive all named) |
| 5 (MEMS) | carried; C1/C2 deferral recorded; her image credit dropped (F8) |
| 6 (applications) | carried, compressed 3+1 (Gate 1, recorded) |
| 7 (block diagram) | carried; accelerometer half boxed, chain walked on the full-size pair |
| 8 (characteristics) | carried; masking + reveal exactly as Gate 1 ruled; zero-g kept |
| 9 (breakout) | carried; all four callouts in the caption |
| 10 (interact) | partial — SPI/I2C + registers are in the Day 13 pre-class reading (B-8 satisfied); the INT-pin clause exists on a slide and nowhere in the book (F2) |
| 11 (control registers) | reaches the room; the book's Part 5 owes no counterpart (F1c) |
| 12–13 | dropped as re-shows (recorded); layering sentence carried |
| 14 | divider, carried |
| 15 (data format) | carried and staged per Gate 1; her per-row equations lost (F3) |
| 16 (mg formula) | reaches the room; reaches the book nowhere (F1a) |
| 17 (auto-increment) | carried (quote written now, correctly); missing xref (F7) |
| 18 (ReadRaw) | partial — assembly paragraph written; struct + listing inside the slide only (F1b) |
| 19 (homework) | carried; her third deliverable folded into a clause (F6) |

**Reverse direction.** Every one of the 32 deck entries has an origin; the three additions to her arc (the opening commit, the sensitivity commit, the one-byte/sign/worked staging) are all named in plans/day13x.md and traceable to Gate 1 items. No Part exists without an origin, and no slide exists to absorb a layout problem.

### Findings

- **[MAJOR] F1 — Three of her slides reach the room but reach the book only inside `<slide>` elements, and no DELIVERY 2 marker owes a body counterpart** (B-8a; `<slide>` renders in deck builds only, so at Delivery 2 all three vanish from the chapter). Fixes, all book-side, zero class minutes:
  - **(a) her slide 16, the milli-g conversion** — the mg formula exists in the book body nowhere. Fix: extend the Part 4 marker to owe the milli-g paragraph (units of g, 1 g = 9.8 m/s², ×1000 gives mg, the ACC_FS/ACC_REGISTERWIDTH/MILLI names, which are accel_test.c's) with a body `<program>` the slide condenses.
  - **(b) her slide 18** — the struct is defined only inside the slide. Fix: the Part 4 marker owes the struct definition (body `<program>`, three int16_t) and a one-sentence pointer gloss.
  - **(c) her slide 11** — the book's Part 5 (not cuttable) would render as two sentences with no register list. Fix: the Part 5 marker owes the six registers, one line each, with CTRL_REG1_A and CTRL_REG4_A marked as ours.

- **[MINOR] F2 — her slide 10's interrupt pins are asserted on a slide and explained nowhere.** Fix: add a clause to the Part 3 marker, or drop the bullet.

- **[MINOR] F3 — the collapse figure drops the layout she already solved** (AUTHORING-visual Rule 3): her slide 15 puts each mode's equation at the end of its own bit row; `data_format_rows.svg` carries rows but no equations, and all three arrive squeezed into one bullet on `sl-day13x-collapse`. Fix: put each mode's equation on its own row in the SVG; the bullet becomes the punchline alone. Zero minutes, one figure edit.

- **[MINOR] F4 — Part 4's per-slide minutes sum to 20 against a 19-minute Part** (section note says "…4 the conversion activity, 1 its reveal, … 1 ReadRaw" but the slides say act 3 / readraw 2). Fix: rewrite the section note as "…4 the conversion activity and its reveal, 2 auto-increment, 2 ReadRaw" (3+3+2+3+1+4+2+2... = 19 with the mg-formula beat).

- **[MINOR] F5 — the worked example uses the 2¹⁶ formula one slide before the collapse derives it** (P-1 inside Part 4). Fix options: flag it ("using the 16-bit form we're about to show works in every mode"), or mirror deck 20's machinery (0xC0 = 192 unsigned → −64 signed → −64 × 15.625 mg = −1000 mg). The second changes Gate 1's beat text — flag rather than rewrite if the synthesizer wants Gate 1's wording kept.

- **[MINOR] F6 — the homework's third deliverable is folded into a clause about the reading.** Her slide 19 and Day 13 Part 8 both keep "work out the CTRL_REG1/4 settings, on paper" as its own line. Fix: split the close bullet into two.

- **[MINOR] F7 — the auto-increment paragraph asserts a picture it never points at.** Fix: add `<xref ref="fig-i2c-transfer-pattern"/>` to the written paragraph (a pointer, written now); the Part 4 marker should also carry the forward pointer to sec-accel-reference for the signed-shift caveat behind "the divide by 2¹⁶ is the shift".

- **[MINOR] F8 — her image credit did not survive the reuse** (fig-accel-mems): her credit line "Surface micromachined capacitors — Roger Howe, Stanford" is on neither figure nor slide. Fix: one clause at the end of the caption.

### Layouts she already solved

Adopt hers on the collapse figure (one equation per bit row); keep everything else — mass_spring.svg redraws her slide 3 line for line; the masked/reveal pair is her annotation doing what Gate 1 asked.

### Checked and correct

The full arc is carried; the room's ordering gates nothing it has not been shown — no BLOCKER. Drops all recorded and checked against her deck (slides 12–13 re-shows; C1/C2 to Reference; Adafruit provenance out per B-11e). She marks nothing on this deck as skippable in her own notes.

---

## checker-voice

# Gate 2′ Voice Review — Day 13x (`sec-accel-day13x`)

### Verdict: BLOCKER

*(The blocker is one localized thing — the day's opening — plus the DELIVERY-2 comment that will reproduce it. The body of this draft is in better shape than any Day 13x draft has a right to be: em-dash density is 2.10 per 100 words against the passed Day 13's 2.09, there is not one minute count, "Part N" pointer, weekday-as-actor, reassurance line, or banner lead in the whole section. Do not read the length of the list below as a rejection of the section.)*

### Register — is this her?

Mostly yes. Parts 1, 4 and 5 read like the passed Day 13 next door. Where it stops being her is at the **joins** — the day's opening, the slide titles, and the short connective sentences. The day's very first projected sentence carries two of her named failures at once; and she has already written this day's opening herself, in prose she passed: **"Tomorrow we'll look at how the sensor works inside"** (`ch-accelerometers.ptx:1267`). The draft invented an epigram over the top of her sentence.

### Rewrites

**1. [BLOCKER] deck recap ("Where we are") — S-22, S-26; day9x specimen.** Draft: "…watched the transactions on the logic analyzer — without knowing what is inside the chip." / "Today is the inside: …". Hers: "Yesterday we wired the LSM303AGR onto the I2C bus, read 0x33 out of its WHO_AM_I register, and watched the transactions on the logic analyzer." / "Today we'll look at how the sensor works inside: the physics that senses acceleration, the numbers in its datasheet, and the format the data will arrive in tomorrow." A trailing "without knowing…" is a list of what we do not have; "Today is the inside" is the nominal-equation epigram. DISPLACES: net −3 words.

**1b. [BLOCKER] the section-introduction DELIVERY 2 spec comment** pre-loads the same epigram ("today is the inside — …"). Change the comment's wording to the recap rewrite above so the Delivery-2 prose lands in her register the first time.

**2. [MAJOR] auto-increment lead (1670–1673) — S-21 armature, L-17, unglossed quote.** "One thing has to be said to the chip first, and the datasheet says it…" → "…you can read all six bytes in one transfer, starting at 0x28, if you set one bit in the register address first. The datasheet explains that bit in §6.1.1 (p. 38) — where its 'slave' is our target and 'MSb' is the most significant bit:". DISPLACES: +3 net; cut the following paragraph's closing "and one six-byte read collects all three axes".
**2b.** After the quote, use her deck's own sentence: "So instead of sending 0x28 as the register address, you send `0x28 | (1<<7)`, and the accelerometer advances to the next data register after every byte."

**3. [MAJOR] Slide titles — six epigrams where she writes names or whole facts (S-18, S-30).** Her own deck titles slides as declarative sentences (slide 15: "The output of the accelerometer is a 16-bit, left-justified 2s complement number."). Retitle: "One byte, unsigned, at the top of the word" → "The output is a 16-bit, left-justified number"; "Worked together: a negative reading, carried to milli-g" → "A negative reading, converted to milli-g" ("Worked together" is lesson-design scaffolding on the wall); "Three modes, one formula" → "One formula converts the raw reading in all three modes"; "The table, unmasked" → "The sensitivity in the datasheet's table"; "The LSM303AGR, inside" → "Our device: the STMicro LSM303AGR"; "Six control registers; two are ours" → "Settings for basic accelerometer operation" (her slide 11's title, verbatim).

**4. [MAJOR] ins-day13x-convert (1659–1661) — a mining artifact reached a projected block (S-26).** "That is the calibration her datasheet note describes" — "her" has no referent for any reader (Petra's speaker note leaking through), and it mis-attributes. → "That is how you calibrate the zero-g offset out: read flat, read flipped, and average the two readings."

**5. [MAJOR] the close (1780) — L-13, and her passed wording exists.** "the reading … decides what goes into CTRL_REG1_A and CTRL_REG4_A" is L-13. Restore her three-item shape (Day 13 Part 8 / her slide 19): reading ("a guided walk through the datasheet"), RegisterWrite on paper, and "From the datasheet, work out what settings belong in CTRL_REG1_A and CTRL_REG4_A, and take notes on paper." DISPLACES: the deleted clause pays for the third bullet.

**6. [MAJOR] sl-day13x-breakout caption (1547) — metaphor as the name of a thing (S-11).** "does the analog housekeeping for us" → "The breakout carries the parts the chip needs: the I2C pull-up resistors, a voltage regulator, and pull-ups on the configuration pins that set the chip for I2C." DISPLACES: drop the figure caption's duplicate strapping clause.

**7. [MINOR] collapse bullet (1610).** "Left-justification is why —" → "This works because the valid bits always start at bit 15, …". Same length.

**8. [MINOR] block slide bullets (1460–1461) — L-12 colon fragment; reuse her slide-7 note.** "Our device is the STMicro LSM303AGR: a 3-axis accelerometer, a 3-axis magnetometer, and a temperature sensor. We'll only use the accelerometer." / "For each axis, the signal follows the path we just worked out: a variable capacitor whose capacitance changes as the mass moves, then a charge amplifier, an analog-to-digital converter, and control logic that puts the result on the I2C bus." DISPLACES: merge bullets 3 and 4.

**9. [MINOR] two fragment leads (1581, 1590) — L-12/L-16.** "The idea in 4 bits:" → "The same idea is easier to see in 4 bits: …". "Carried to milli-g:" → "In milli-g that is …, which is minus one g."

**10. [MINOR] flip-test line (1591) — S-13.** "That is tomorrow's experiment:" → "Tomorrow we'll check this on real boards: lying flat, a board reads about +1000 mg on its z axis, and flipping it over flips the sign."

**11. [MINOR] reveal bullet 2 (1530) — S-23.** "is worth reading honestly" is the book commenting on its own pedagogy. → "The zero-g offset row is below it: … That is ten of our steps, and a significant amount of error." (her slide-8 note: "40mg is a significant amount of error!")

**12. [MINOR] sensitivity activity intro (1476–1479) — reuse her slide-8 note.** → "…says how acceleration at the input is turned into bits at the output. The first thing to decide is the measurement range: ±2 g, ±4 g, ±8 g, or ±16 g." DISPLACES: the commit slide's duplicate first sentence.

**13. [MINOR] commit slide parenthetical (1495) — S-26/S-12.** "(This is the ADC argument again…)" → "(This is the same calculation we did for the ADC on Day 7: the full range, divided into 2^bits bins.)"

**14. [MINOR] mass-commit intro (1330).** → "Your phone already measures what we wired up yesterday: open its level app, tilt the phone, and the reading changes as you tilt. Something inside the phone senses that motion, and today we'll look at how it does it."

**15. [MINOR] byte-assembly paragraph (1709–1712) — S-11 "machinery", ornament appositive.** → "lsm303_AccelReadRaw(), which we'll hand you, makes the six-byte read… This is a different use of the shift and OR operators than we have seen so far: here they build a wider signed value out of two array elements, rather than setting a bit inside a register."

**16. [MINOR] readraw caption (1734).** "— Day 10's firmware layers, made concrete." → "This function uses i2c.c and lsm303agr.h: it is the device-driver layer from Day 10, now for the accelerometer."

**17. [MINOR] MSB unexpanded on first use (1691).** → "…the subaddress's most significant bit (MSB) enables address auto-increment. Send 0x28 | (1<<7) instead of 0x28." DISPLACES: the trailing restatement clause.

**18. [MINOR] applications bullets (1426–1428).** Free-fall bullet: put the accelerometer back as the subject ("an accelerometer detected a falling laptop and pulled the disk heads off the spinning drive before it hit the floor"). Fix the comma splice ("they are used to monitor vibration"). "build on exactly this sensor" overclaims → "work with these sensors" (whether either company uses the LSM303AGR is a technical-accuracy call).

**19. [MINOR] INT pins (1463) — S-12.** → "INT_1_XL and INT_2_XL for the accelerometer, INT_MAG for the magnetometer — which we're not using." (her slide 10 glosses each). DISPLACES per finding 8's bullet merge.

**20. [MINOR] derivation bullet (1367) — hers is more exact.** "These are the same force, so kx = ma" → her slide 3 verbatim: "Measure the displacement x when the forces balance: kx = ma…" The forces balance; they are not the same force.

**21. [MINOR] Part 3 title.** "Our Device, by Its Datasheet" → "The LSM303AGR, and What Its Datasheet Says". Lowest priority — flag, do not insist.

### Sweeps

Openings checked: 8 (failing: the deck recap, the DELIVERY-2 spec comment, Part 3, Part 1's hook, Homework). Slide titles: 24, six epigrams (finding 3). Weekday-as-actor: 0. S-21 armature: 1 (finding 2). Acronyms: MSB never expanded anywhere in the book (finding 17); FS appears in fig-accel-data-format's caption unexpanded — add "(FS is the full-scale range, 4 g here)", DISPLACES the caption's duplicated "always start…" clause. Everything else clean (MEMS, IMU, LSB, ADC, SDA/SCL, SPI glossed in pre-class, µm/mg/g). Design scaffolding student-facing: one ("Worked together:" title). Pasted-AI residue from her slides 5/6 notes: none leaked. S-29 banners: 0. Book/slide split (Step 5b): same writer throughout; the one divergence is findings 12/13.

### Already written — reuse instead of invent

The day's opening (her passed line at 1267); the homework close (her slide 19 + passed Day 13 Part 8, three items); slide 15's sentence-title; her slide-7 note for the block walk; her slide-8 note for the sensitivity lead-in and the ±40 mg line; her slide-9 callouts for the breakout caption; her slide-11 title. Correctly reused already: the derivation bullets, capacitive bullets, applications list, the §6.1.1 quote and the 0x28|(1<<7) sentence, the ReadRaw listing and struct, the ACC_FS block, and `>>` rather than `/ 2¹⁶` (her own accel_test.c).

### For Petra, not for me

1. The two-line homework close vs. her three-line slide 19 — restored to three per L-13; if she wants two, say so.
2. The blockquote's "slave" is quoted verbatim while the book says controller/target — finding 2 adds a one-clause gloss; tell us if the quote should stand bare.
3. Which explanations earn expansion (the sign slide, the collapse slide) — the Day 8 unresolvable; flagged rather than guessed.

---

## learner-in-the-room

# Gate 2′ — Day 13x student-view walk (`day13x`, 32 slides)

I sat through all 32 with no book open. Three of the four archetype failures are absent — every task is answerable, there is no troubleshooting slide, and the ReadRaw listing (the S-9 trap) passes cleanly. The fourth (a slide that exists for layout) shows up once, at the close. The real damage is an **ordering inversion inside the crucial step**: slide 22 uses a formula slide 23 exists to derive.

### Verdict: MAJOR

(Slide-by-slide walk produced, one line each — all 32 accounted for; abridged here to the findings.)

### Does not earn its place

- **[MAJOR] `sl-day13x-worked` (slide 22) — the worked example uses a formula the room has not been given.** Bullet 2 reads "Carried to milli-g: (4 × −16384 × 1000) / 2¹⁶". The only model at that moment is slide 20's: shift the zeros off, multiply by that mode's step. Nothing has said the whole word divides by 2¹⁶ — that is slide 23's entire job, and slide 23 comes next; slide 24 then states it a third time. Three statements of one formula, the first of them unearned. **improve** (zero minutes, pure deck reorder): project 20 → 21 → 23 → 24 → 22 → 25 — derive the collapse, name it in code, then work 0xC000 with it, then hand the room 0xE000. Also fixes slide 22's own note ("this is the model for the conversion the room does alone next" — as placed there are two slides between model and activity).

- **[MAJOR] `sl-day13x-specs-reveal` (slide 17) — the bullet contradicts the image directly under it.** Bullet 2: "can read up to ±40 mg away." The table on the same slide reads −80 | ±40 | +80 | mg — Min, Typ, Max. So ±40 is *typical*; "up to" is ±80. Propagates into `task-day13x-offset-stretch` and `fig-accel-specs`'s caption. **improve** (three words, three places): "typically ±40 mg and up to ±80 — ten to twenty of our steps." Also re-crop `accel_specs_offset.png` on a row boundary (a sliver of the next row bleeds in).

- **[MINOR] deck entry 31 (the "Close" section divider) — a slide whose only content is the title of the slide after it.** Two consecutive dividers in the last four slides of a class with zero slack. **cut** — slide 32 already carries the heading; returns ~15 s to the protected close.

- **[MINOR] `sl-day13x-specs-commit` (slide 15) — asked to produce a number in a unit not on the wall.** "Compute it, in mg" — milli-g and 1 g = 9.8 m/s² first appear on slide 24. Also two headerless "−7%"/"+7%" columns (the crop cut the Min/Typ/Max header row). **improve**: "Compute it, in milli-g (mg)." and crop or re-head the columns in `accel_specs_masked.svg`.

- **[MINOR] `sl-day13x-block-fig` (slide 14) — the caption is slide 13 re-typed.** **improve**: give the caption the boundary job: "Everything above the blue box is the accelerometer; the identical chain below it is the magnetometer, sharing one I2C/SPI block on the right."

- **[MINOR] `act-day13x-mass-commit` (slide 5) — a spatial question with no geometry on the wall, and a hook only the presenter can see.** **improve**: add "(try it now)" to the hook sentence, and put a rest-state-only crop of `mass_spring.svg` (no F = kx = ma, no displacement arrow) on the commit slide. One derived asset, no class time.

- **[MINOR] `sl-day13x-autoincrement` (slide 27) — Table 22 was on the wall yesterday and does nothing today.** **improve**: a Table-23-only crop so the multi-byte read and its red gloss project at twice the size.

- **[MINOR] `sl-day13x-readraw` (slide 28) — one clause short of self-contained.** Asserts low-byte-first without saying on the wall why data[1] is the high byte. **improve** (four words): "…assembled low-byte-first — `data[0]` is `OUT_X_L_A` — into a signed 16-bit value."

**Budget:** no fix adds a minute; the divider cut returns time. No DISPLACES line required.

### Undefined on the wall

slide 15 — "mg" (defined slide 24); slide 15 — the −7%/+7% columns (header cropped); slide 22 — /2¹⁶ (derived next slide); slide 24 — ACCEL_raw (placeholder, becomes result->x on 28); slide 28 — int16_t (glossed in the same slide's lead — acceptable, and it lands after two's complement, the right order).

**`sl-day13x-readraw` passes the archetype-1 test** — every identifier resolves to a prior slide (header listing Day 13, i2c1_memRead Day 13, (1<<7) slide 27, struct defined on the slide itself).

**P-15 checks, both clean.** Nothing before slide 16 shows the sensitivity; nothing before slide 25 shows 0xE000's answer (−500 mg appears first on the instructor reveal).

### Tasks I could not do

None — all four produced a concrete answer on paper (worked answers recorded in the transcript; the sensitivity trap — 2 g vs 4 g — is live and unspoiled).

### Note for the instructor pane

Part 4's section note ("4 the conversion activity … 1 ReadRaw") disagrees with the slide notes (act ≈3, readraw ≈2); the errors cancel to 19 but the lines should agree. Parts 1, 3, 5 reconcile exactly.

---

## checker-figure-claims

# Gate 2′ figure review — ENGS 28 Day 13x

## Verdict: BLOCKER

One caption sends students to a connector the crop deleted; four more findings are MAJOR. Everything was rendered and looked at — no claim below comes from a filename, a caption or SVG source alone. (Full per-figure inventory table produced — 12 assets rendered at declared size, every image-carrying slide rendered in the player at 1600×900, plus the two built book pages; abridged here to findings and verdicts.)

## Correspondence failures

**[BLOCKER] `fig-accel-breakout` caption — "the 6-pin header is where the STEMMA QT connector's four wires arrive" — but the schematic crop contains no STEMMA connector.** The source bitmap has a "STEMMA/I2C Headers" block (two 4-pin STEMMA_I2C_QT parts, GND/V+/SDA/SCL) at x 1450–1930, and the SVG's clip discards it (the `<image>` is drawn at natural 2003×1064 in a 1437×889 canvas — the right 29% and bottom 18% are thrown away). The one part that IS arrowed ("6-pin header" → JP1) is the 0.1″ breadboard header students do not use. — fix: **ask Petra for the original** (un-cropped slide-9 export, or the Adafruit schematic PDF, which is vector). Re-caption to the truth once it lands. Do not fix by re-wording alone.

**[MAJOR] `breakout_schematic.svg` — the crop** (as above; the Day 9 defect exactly — the crop, not the arrows, is the problem). — fix: ask for the original; do not patch the composite.

**[MAJOR] `breakout_schematic.svg` — annotation misregistration.** Her callouts are placed at picture-fractions of the clipped canvas while the artwork is drawn 2003 wide, so every callout is displaced left/up, more the further right it belongs: the regulator arrow runs through the AP2112K-3.3 part label; "I2C pullups" sits ON the resistor bank covering a designator; "Pullups set device for I2C" floats ~450 px from the pull-ups it names (and never had an arrow, in her deck either). — fix: same ask; when the original lands this figure probably wants to be two zoomed panels. DISPLACES: nothing (same slide) or, if a second slide, the applications drop-if-behind item.

**[MAJOR] `fig-lsm303agr-block` caption and slide-14 caption — "three variable capacitors" — the image shows six** (three columns × two rows, feeding X+, Y+, Z+, Z−, Y−, X−). — fix: "three **pairs** of variable capacitors — one pair per axis (X±, Y±, Z±)" in both captions. DISPLACES: +2 words.

**[MAJOR] the ±40 mg claim vs the row `-80 | ±40 | +80 | mg`** (slide 17 bullet, `fig-accel-specs` caption, the stretch task): ±40 is Typ; "up to" is ±80 — wrong by a factor of two, and on slide 17 the column headers are not in frame. — fix: "typically ±40 mg — ten of our steps — and the datasheet's Min/Max columns allow ±80", in all three places.

**[MAJOR] slide 9 / `fig-accel-mems` — cross-figure contradiction.** The mechanism's right panel draws "← Acceleration" with the moving plate displaced **in the same direction** as the arrow; two slides earlier `mass_spring.svg` and the mass-commit reveal teach the mass lags **opposite** the acceleration. The figure is Petra's own — a call for her, not a silent edit. — fix: **ask Petra**: (a) crop to the left (at-rest) panel — every caption claim is in that panel; or (b) keep both and add one clause naming the disagreement.

**[MINOR] slide 28 caption — "These functions" — the image shows one typedef and one function.** — fix: "This function uses…" (defer to checker-voice's wording, which agrees).

**Checked and correct** (recorded as evidence): the masked variant hides every mg/LSB value including 187.58 and carries no answer box; the reveal boxes 3.9 on the ±2 g NORMAL row (not the ±8 g high-res row that prints the same number); blue box = accelerometer half, red box = SCL/SDA labels; mass_spring displaces the mass opposite the accel arrow with x spanning displaced-edge to rest-edge; data_format_rows carries 8/10/12 b-cells with 8/6/4 zeros — the same numbers as the collapse bullet's shifts; slide 27's tables are Tables 22/23 with the auto-increment gloss under 23; the micrograph's fingers measure ≈4–5 µm against its own 10 µm bar; the three strips of fig-accel-specs compose into one continuous Table 3 in both book and slide.

## Notation mismatches

- fig-lsm303agr-block: text "the SCL and SDA pins" vs figure `SCL/SPC` / `SDA/SDI/SDO` — name both forms once in the text.
- sl-day13x-block: "INT_MAG" vs the figure's `INT_MAG/DRDY` — use the figure's form.
- fig-lsm303agr-block caption: "boxed" does duty for two boxes — say "boxed in blue" / "boxed in red".
- slide 27: figure prints Master/Slave; optional "(its Master row is our controller)" in the lead — Day 13's deck reconciles it, this one does not.
- capacitive_pickoff.svg: the rule between C and "changes with the gap" reads as a fraction bar — delete the line, set the two text lines beside the C.

## Legibility (threshold 2% of slide height = 18 px at 1600×900)

- **slide 14 block diagram: pin/block labels ≈1.5% — FAILS.** The figure already fills the slide; the fix is showing less: crop to the accelerometer half (the blue box) on the slide, keep the full diagram in the book. DISPLACES: nothing — image swap.
- **slide 18 breakout: pin names ≈1.4%, designators <1% — FAILS.** Callouts fine (2.9%), gestalt survives; real fix rides on the ask-Petra original + two zoomed panels.
- slide 7: 2.3% passes with no margin — do not shrink. Slide 8: 2.2% ✓. Slide 9: 2.8% ✓ (SEM legend unreadable but decorative). Slide 15: 2.2% ✓. **Slide 17: 1.9% — marginal fail on the slide whose numbers are load-bearing; let the two images run to ~85% width.** Slide 23: 2.2% ✓. Slide 27: 2.2% ✓ with ~220 px empty below — scale to ~2.8% for free. Slide 28: 2.4% ✓.

## Shared figures

`i2c_transfer_reads.svg` is used twice in this chapter (Day 13's transfer-reads slide + Day 13x's auto-increment slide); any re-crop for one silently changes the other — re-render both if touched. Housekeeping: mems_mechanism/micrograph and the two spec strips are byte-identical to the mined slide pulls still in the directory; a re-crop of one leaves the other stale.

---

## checker-technical-accuracy

## Gate 2′ Review — Day 13x (`sec-accel-day13x`) + `assets/decks/day13x.json`

Authorities checked: the hosted datasheet (§1.1 Fig. 1 p. 10, §1.2 Table 2 p. 12, §2.1 Table 3 pp. 13–14, §4.2.1 Tables 14–16 p. 27, §6.1.1 Tables 20–23 p. 38, §7 Table 26 p. 43, §8.6–8.10 pp. 47–49); the four starters; her mined deck incl. speaker notes; every figure RENDERED; ch-i2c/ch-adc/ch-debugging/ch-io-datasheets for cross-checks.

### Verdict by Part

| Part | Verdict |
|---|---|
| Part 1 — physics | MAJOR (figure contradicts the commit's answer) |
| Part 2 — applications | MAJOR ("build on exactly this sensor") |
| Part 3 — datasheet | BLOCKER (capacitor count; shared amp/ADC; ±40 mg bound; breakout/STEMMA) |
| Part 4 — data format | MAJOR (`/65536` vs `>>16`; all arithmetic verified correct) |
| Part 5 — control registers | BLOCKER (CTRL_REG2_A "analog filter"; CTRL_REG4 resolution mode) |
| Close + deck glue | MINOR (Part-4 minute itemization) |

**Overall: BLOCKER.**

#### BLOCKER

- **[B-7, B-11c] "three variable capacitors — one per axis"** (fig caption, sl-day13x-block, sl-day13x-block-fig) — the figure (and datasheet Fig. 1) shows **six**, a differential pair per axis (X+/X− …). Fix: "six sense capacitors — a pair per axis"; sets up the C1/C2 Reference item instead of colliding with it. Zero-length swap.
- **[B-7, L-6] "Per axis, the chain is … a variable capacitor, a charge amplifier, an ADC …"** — the axes feed a **MUX**; one charge amplifier and one A/D converter serve the whole accelerometer (ch-adc.ptx:591 already teaches "one converter and a multiplexer in front of it"). Fix: "Sense capacitors per axis; the three axes share one charge amplifier and one A/D converter through a MUX — the same picture as the STM32C031C6's ADC." DISPLACES: block-fig caption's second half.
- **[B-11c, L-6] "can read up to ±40 mg"** (three places) — Table 3 LA_TyOff is Min −80 / Typ ±40 / Max +80; ±40 is typical, the bound is ±80. Fix in caption, slide, and stretch task.
- **[B-8a, L-6] presenter note "WHO_AM_I was one of the control registers"** — Table 26: WHO_AM_I_A is type R, "Dummy register"; contradicts Part 5's own "six control registers". Fix: "WHO_AM_I is one you read; the control registers are the ones you write."
- **[L-6] CTRL_REG2_A "Analog filter selection"** — §8.7 is **high-pass filter** configuration; no "analog filter" anywhere in the datasheet (inherited from her slide 11). Fix: "High-pass filter configuration (§8.7) — bypassed by default."
- **[B-11c, B-7] "the 6-pin header is where the STEMMA QT connector's four wires arrive"** — JP1 carries six signals and no STEMMA connector is in the crop; the cable plugs into a JST socket, not the header; contradicts Day 13's own fig-accel-wiring caption. Fix: "…and the 6-pin header brings power, ground, SCL, SDA and the magnetometer interrupt out to the breadboard."

#### MAJOR

- **[B-6] the mg-formula slide writes `/ 65536` on one line and `>> ACC_REGISTERWIDTH` on the next as the same computation** — not equivalent for negative operands (floor shift vs truncation; e.g. raw −15872: /65536 = −968, >>16 = −969). Her code uses `>>` throughout. Fix: first line becomes `a = (4 * ACCEL_raw * 1000) >> 16;`; the signed-shift caveat is already owed to Reference.
- **[L-6] CTRL_REG1_A "power mode" / CTRL_REG4_A "resolution mode" as two independent things** — Table 14: the mode is LPen AND HR jointly (1/1 not allowed). Fix: REG4 cell → "Full-scale range … and the HR bit; with LPen in REG1 it picks the mode." DISPLACES: REG5/REG6 cells shortened.
- **[B-11c, P-6] `mems_mechanism.png` right panel shows the plate displaced in the SAME direction as its Acceleration arrow** — the exact wrong answer to the mass commit, contradicting fig-accel-proof-mass. Fix, zero-length: crop to the left (rest) panel — the caption describes that panel and needs nothing from the right one.
- **[B-11c, B-11d] "build on exactly this sensor"** — her slides support the companies and the field, not the part. Fix: "build on exactly this technology". One word.
- **[B-8a] "That is the calibration her datasheet note describes"** — the procedure is Petra's speaker note, not the datasheet's; and "her" is disorienting. Fix: "That is the calibration to do on a real board: read flat, read flipped, average."

#### MINOR

- The byte-assembly paragraph's "promotes each byte to 16 bits… builds a wider signed value" — in C the operands promote to `int`; the sign appears at the narrowing store. Suggested: "…widens each byte, moves the high byte up eight places, ORs them, and stores the result in an int16_t — which is where bit 15 becomes the sign."
- Part 4 section note mis-itemizes (4/1 where the beats are 3/2); row total right.
- The applications note under-counts ("three examples plus one sentence" vs five bullets).
- The Table 3 note quote is note **8** (the self-test footnote), printed "1LSb"/"FS=±2 g" — match spacing or cite "Table 3, note 8".
- "fewer bits means faster" holds only at the low-power end — normal and high-resolution share ODR list and current; difference is bandwidth/turn-on. Suggested: "…low-power runs at rates the others cannot."
- Stretch readings +1032/−968 are not attainable single readings at a 3.90625 mg step (neighbors 1027/1031/1035). Cheapest: "your board **averages** +1032 mg…".
- Starter comment drift (not the book): lsm303agr_partial.c says "8 control registers"; and the .h/.c prototype `* const` vs `*` — the book quotes each correctly; do not "align" the book.
- "INT_MAG" → the pin is `INT_MAG/DRDY` (Table 2), as the block figure prints.

### Arithmetic recomputed independently — all checks pass

4 g/2¹⁰ = 3.90625; 4 g/2⁸ = 15.625, 64 × 15.625 = 1000; 0b1110 = −2 both routes; 0xC000 → −16384 → −1000 mg; 0xE000 → −8192 → −500 mg; (1032−968)/2 = +32; 40/3.90625 ≈ 10 steps. **The Gate-1 trap did not get imported: nowhere does the source say 0xC000 → −500 mg.** Part budgets reconcile; Part 4's header mis-attributes two steps (minor above).

### Verified clean

check_rules 0/0; check_deck 0 problems; check_starters 0; image paths all resolve; the §6.1.1 blockquote is **verbatim** against p. 38, punctuation included; the ReadRaw listing is line-for-line lsm303agr_partial.c (comments stripped per B-13) and the struct matches lsm303agr.h; ACC_* defines match accel_test.c; "low byte first" correctly sourced (BLE=0, Table 42, CTRL_REG4=0x00); the masked figure really is masked (P-15); every "her slide N" attribution checks out.

### Unverified

The SignalQuest/Simbex-to-this-part link (needs Petra or the word change); the level-app hook (plan-sourced); kits-in-bags (plan decision).

---

## Synthesis — the change list

(Produced by committee-synthesizer from the eleven reports above; applied by the session, verified item by item — see the applying commit.)

### Verdict

The skeleton and the deck are sound: the arc is fully carried, the crucial step's staging is the strongest thing in the draft, and the budget reconciles. What blocks sign-off is a cluster of **factual claims about the LSM303AGR that the datasheet and the figures themselves refute** — six capacitors called three, three signal chains where the chip has one, a typical offset quoted as a bound, a filter register misnamed, and a connector that the crop deleted — plus **one forward reference inside the crucial step** and **one first-teaching (the sign bit) with no picture on the wall**. Twenty-six edits below; every one is a swap, a cut, a caption, a crop, or a presenter note. **Nothing on this list spends a class minute.** The two named levers — Part 2 → one example (−2) and the close (−1) — are still unspent when the list is applied.

## MUST FIX — blocks sign-off

1. **The block diagram: three capacitors are six, and the chain is shared, not per-axis** — fig caption, sl-day13x-block bullets (four become three; INT pin names cut per cognitive-load, overruled voice F19), sl-day13x-block-fig caption ("six sense capacitors — a pair per axis — … the one charge amplifier and one A/D converter they share"), plus an accelerometer-half-only crop for the slide (legibility 1.1–1.5% → ~2×), full diagram stays in the book. Consolidates technical-accuracy (2 BLOCKERs), figure-claims, visual, firstgen ("charge amplifier" tied to Part 1's circuit), in-the-room, voice F8, cognitive-load. DISPLACES: bullets 3+4 merge.
2. **±40 mg is typical, not the bound** — "typically ±40 mg … Min and Max columns allow ±80" in fig-accel-specs caption, the reveal bullets (whose restated 3.9-clause is cut per the census), and the stretch task ("averages +1032 mg"); Min/Typ/Max headers restored to the wall; offset crop landed on a row boundary; reveal images widened (1.9% marginal fail). Consolidates technical-accuracy, figure-claims, in-the-room, cognitive-load, voice F11.
3. **Part 5's register table: two wrong cells** — CTRL_REG2_A → "High-pass filter configuration (§8.7) — bypassed by default."; CTRL_REG4_A → range + HR bit, with LPen jointly picking the mode; REG1 cell names LPen. DISPLACES: REG5/REG6 cells shortened.
4. **WHO_AM_I is not a control register** — presenter note fix: "WHO_AM_I is one you read; the control registers are the ones you write."
5. **The breakout caption's STEMMA claim is false** — the header brings power/ground/SCL/SDA/INTM out to the breadboard; the STEMMA sockets are not in the crop. Slide caption loses "analog housekeeping" (S-11). Crop/misregistration NOT patched — ASK PETRA A1.
6. **`/ 65536` vs `>>` are not the same computation for negatives** — first formula line becomes the shift, caption reworded; signed-shift caveat stays owed to Reference.
7. **The MEMS right panel teaches the wrong answer to the commit** — interim: crop to the left (at-rest) panel; credit line restored ("Surface micromachined capacitors — Roger Howe, Stanford"). Panel itself: ASK PETRA A2.
8. **The day's first projected sentence is not in her register** — recap rewritten in her own passed words (ch-accelerometers.ptx:1267); plans/day13x.md's epigram corrected too.
9. **The sign teaching gets a picture** — a 4-bit weight row (8·4·2·1, top box crossed → −8) plus a 16-bit row with the bit-15 arrow, on sl-day13x-sign's blank lower two-thirds; "The same idea is easier to see in 4 bits: …" (voice F9). Consolidates firstgen BLOCKER + visual MAJOR.
10. **The worked example's forward reference removed in place (arc-fidelity F5, NOT the reorder)** — 0xC000 worked by the top-byte route already on the wall (0xC0 = 192 → −64 → −64 × 15.625 = −1000 mg), with the plausibility check modeled ("comfortably inside ±2000") and the collapse note closing the loop with the 16-bit route. Rejects in-the-room's deck reorder (re-litigates Gate 1). Voice F9/F10 folded in.
11. **milli-g defined before it is used** — the g/mg gloss lands in act-day13x-sensitivity's introduction (her slide-8 note's framing: "says how acceleration at the input is turned into bits at the output"); "the same calculation we did for the ADC on Day 7" named on task and slide. Consolidates firstgen BLOCKER, in-the-room, voice F12/F13. DISPLACES: the commit slide's duplicate first sentence.
12. **Part 4's minute drift restored to the plan** — act-day13x-convert → ≈4 min; sl-day13x-readraw → ≈1 min (rejects ratifying the drift); recap gains the spend-the-levers-early sentence. Consolidates logistics BLOCKER, cognitive-load, arc F4, in-the-room, technical-accuracy.

## SHOULD FIX

13. Six deck titles de-epigrammed to her register (incl. her slide 11's title "Settings for basic accelerometer operation" and her slide 15's sentence-title form).
14. Auto-increment beat: voice F2's lead rewrite with the slave/MSb gloss, her own 0x28|(1<<7) sentence, the fig-i2c-transfer-pattern xref, MSB expanded, and the presenter note's Table-22-vs-23 sentence promoted to a slide `<caption>`; image scaled into the empty space. (Never re-crop the shared SVG — R6.)
15. The collapse figure regains her layout: each mode's equation at the end of its own bit row; caption gains the FS gloss; bullets become pointer + punchline (voice F7).
16. The opening commit: "(try it now)" hook, rest-state figure on the commit slide, and the fallback + "the derivation settles it, not you" presenter note (logistics MAJOR + anxious MAJOR + in-the-room + voice F14).
17. Applications: the accelerometer restored as the free-fall subject; semicolons for the splice; "exactly this **technology**"; note counts "three examples plus two sentences".
18. Byte assembly: the C promotion story corrected ("stores the result in an int16_t — which is where bit 15 becomes the sign"); caption → "This function uses…"; slide lead gains "— data[0] is OUT_X_L_A —".
19. Instructor blocks: "her datasheet note" mining artifact → "That is how you calibrate the zero-g offset out…"; the 3.9 quote cited as Table 3 note 8, spacing matched.
20. The close restored to her three items (L-13; the reading no longer "decides").
21. "These are the same force" → her "Measure the displacement x when the forces balance: kx = ma" (also fixed in plans/day13x.md).
22. Housekeeping: plans/day13x.md's phantom "fifth minute" soft-cut synced to the deck's wording; capacitive_pickoff's fraction-bar rule deleted; image_ratios + book.css after crops; do NOT align the book to the starters' comment drift.

## CONSIDER

23. Part 3 title (voice F21) — applied as "The LSM303AGR, and What Its Datasheet Says".
24. Recorded, not fixed: kits-in-bags stays presenter-only (S-25) — a future pass must not make it student-facing reassurance.

## REJECTED

R1 in-the-room's deck reorder (re-litigates Gate 1's beat order; superseded by item 10 — dissent recorded: if the room stalls at the worked slide anyway, the reorder is the next thing to try). R2 anxious's write-the-prose-now (contrary to the skeleton step; the legitimate half lands as marker text, DELIVERY 2 c–f). R3 logistics' sensitivity self-check (P-15 — states the answer band ahead of the masked reveal). R4 logistics' settle-time refold (re-opens Gate 1's budget, no displacement). R5 in-the-room's cut of the Close divider (check_deck attributes beats to the preceding section; cutting it breaks the S-8 reconciliation). R6 Table-23-only re-crop (the 22-vs-23 contrast is the teaching; the shared SVG must not change under Day 13). R7 visual's ±2 g-rows crop (deletes the range choice and the modes trade). R8 continuity's Day-5x sensitivity callback (no displacement; dissent recorded). R9 voice F19's INT-pin glosses (overruled by cognitive-load's cut). R10 arc F4's note-matches-slides (ratifies the drift; fixed the other way). R11 arc F5 option 1 (flags the forward reference instead of removing it). R12 figure-claims' recaption-as-whole-fix (the false claim comes out now; the crop goes to Petra).

## ASK PETRA

- **A1** — `breakout_schematic.svg`: the defect is the crop, not the arrows — the source bitmap's STEMMA/I2C Headers block is discarded by the clip, and every callout is displaced (positioned against the clipped canvas). Ask for the un-cropped slide-9 export or the Adafruit schematic PDF (vector); the figure then probably wants to be two zoomed panels. Interim: the false STEMMA sentence is corrected; do not patch the composite.
- **A2** — `mems_mechanism.png`'s right panel displaces the plate WITH its acceleration arrow — the wrong answer to Part 1's commit. Redraw or drop; interim, the figure is cropped to the at-rest panel.
- **A3** — the §6.1.1 blockquote keeps the datasheet's "slave"; a one-clause gloss ("where its 'slave' is our target") now leads into it. Confirm the gloss or let the quote stand bare.
- **A4** — the homework close is restored to your slide 19's three items; if you want two, say so.

## DEFERRED TO DELIVERY 2 — marker text updated now

(a) section intro marker rewritten in her register (the epigram removed at its source); (b) Part 1 marker: the derivation paragraph motivates + adds three-axes, does NOT re-derive (B-8); (c) Part 2 marker names sl-day13x-applications; (d) Part 3 marker: the charge-amplifier ↔ Part 1 weld as a parenthetical; the milli-g gloss no longer owed (written now); (e) Part 4 marker: owes the milli-g paragraph + body program (the shift, not the divide), the struct as body program, the sec-accel-reference xref for the signed shift — and the sign paragraph marked not-to-be-compressed (the slides are stripped; the book's Part 4 is the only place a student can go back to two's complement); (f) Part 5 marker: owes the six registers as body prose/tabular with the corrected REG2/REG4 facts; (g) close marker: the three-item close.

Open for Gate 3′: which explanations earn expansion (the sign slide, the collapse slide) — the Day 8 unresolvable; decide with Petra.

## DISSENT WORTH RECORDING

In-the-room's reorder (watch the conversion commit's completion spread on the day); continuity's Day-5x "sensitivity is not one number" callback (one clause in the Part 3 marker if it bites); cognitive-load's state-±40-once (if a future re-crop makes the row self-explanatory on the wall, the reveal bullet can lose the number).
