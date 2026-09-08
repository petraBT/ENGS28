# Day 16 Gate 3 — the deck's committee

Reviewed 2026-09-08, over `assets/decks/day16.json` (35 entries, 30 refs,
5 instructor-only) and the sixteen `<slide>` blocks in
`source/ch-photosensors.ptx` `sec-photo-day16` at commit `f0e86b8`,
condensed from the prose Petra passed in three passes the same day. Fit
at 1600×900 with the crossfade killed and the notes off: every student
slide fits; the instructor's worked loop overflows, as allowed; every
figure slide looked at. Seven reviewers, then the synthesizer; the applied
list is at the end.

---

# expert-cognitive-load

### Verdict: MAJOR

The ordering is sound — every reveal (`sl-day16-direction-reveal`, `inst-day16-two-channel`, `inst-day16-part2-checkpoint`, `inst-day16-arm-checkpoint`, `inst-day16-discussion`, `inst-day16-loop`) sits *after* the activity it answers, and Part 2/Part 5's designation as work time rather than lecture time is respected. But three ideas are stated in full twice, each pair one slide apart, and one slide compresses a two-symbol relationship into a single dense bullet. None of these need a new slide to fix — all are cuts or rebalances within the sixteen she gave.

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| Lab 8 Deliverables 9 and 10, plus "keep a log of K and T" | 2, both in full | `sl-day16-start` (bullets 2–3) and the closing recap "Looking ahead" (both items) | `sl-day16-start` — it is the slide left up during the 14 min of work, so it is the one students actually read while doing the thing | Recap: drop the D9/D10 restatement and the separate "keep a log" line; replace with the one fact `sl-day16-start` does *not* carry — that Lab 8 is due Tuesday and nothing else is (already in the presenter note, currently never projected) |
| The divider-wiring instruction ("wire the two photosensors and 10 kΩ resistors on your breadboard as shown") | 2, both in full, one slide apart | `sl-day16-lab-fig2` (bullet 1) and `act-day16-two-channel`'s `<introduction>` | `sl-day16-lab-fig2` — the figure is right there | Delete the activity's `<introduction>` paragraph outright (B-16: it restates the slide just shown and adds nothing); the activity drops straight into the program task |
| The clip-connection instruction ("use alligator-to-breadboard clips to make the electrical connections between the leads of the photosensors and your breadboard") | 2, both in full, one slide apart | `sl-day16-clips` (caption) and `task-day16-clips` | `sl-day16-clips`'s caption, paired with the figure (P-4) | `task-day16-clips` keeps only what is new: "one clip per lead" |
| The two feedback loops (servo loop, tracking loop) | 1 telling each, on their own slides, plus a brief naming (not a re-explanation) in the closing recap | `sl-day16-loop-servo`, `sl-day16-loop-around`, recap item 1 | — | Nothing over two here; the recap's mention is a forward pointer to Lab 8, not a second full treatment. Not a violation. |

### Findings

1. **[MAJOR] B-8 / B-16 — `sl-day16-start` → closing recap.** The Deliverable 9/10 content and the "log your K and T" instruction are stated in full twice, the last two slides of class, with no new information in the second telling. This is exactly B-16's pattern ("a paragraph earns its place only if it adds something the following material does not already say"), applied to a recap instead of a lead-in. Fix: recap keeps only "Lab 8 is due Tuesday; nothing else is" — the one fact `sl-day16-start` doesn't carry.

2. **[MAJOR] B-16 — `act-day16-two-channel`'s `<introduction>`.** Its one sentence ("Wire the two photosensors and 10 kΩ resistors on your breadboard as shown in Figure 2") repeats `sl-day16-lab-fig2`'s bullet word for word, projected the slide immediately before. Delete the introduction; the activity opens on the program task.

3. **[MAJOR] B-8 — `task-day16-clips`.** Restates `sl-day16-clips`'s caption verbatim plus "one clip per lead." Reduce the task to the one new clause; the caption already did the explaining, adjacent to the figure it explains (P-4).

4. **[MINOR] P-7 — `sl-day16-nonlinear`.** Bullet 2 conflates two new elements (the log-log axis-reading convention, and the general power-law form R∝E⁻ˢ with three symbols) alongside the nonlinearity claim and the practical implication — four elements on one two-minute slide. Move the power-law form to `sl-day16-loglog-relation`, where its concrete instance (S = 0.6) already lives; leave `sl-day16-nonlinear` with only the qualitative claim and the practical implication.

5. **[MINOR] S-9/P-4 — `sl-day16-loglog-relation`.** The equation is carried as plain text with four subscripted variables (R₁₀₀, R₁₀, E₁₀₀, E₁₀) — heavier to parse on a slide without math typesetting than the one-sentence verbal form directly below it. Lead with the words ("a factor of 10 in light, a factor of about 4 in resistance"); keep the equation as the supporting line, not the first.

6. **[OK, flagged] `act-day16-study` — six deliverables on one compressed slide.** This looks like a P-7 violation by count, but it isn't one in kind: the slide is explicitly "leave up" reference during 38 minutes of self-paced work, not a lecture beat the students hold in working memory at once — closer to the reference-table-beside-the-worked-example pattern than a compressed lecture. No structural change recommended (no new slide is available to split it onto); if Petra wants tighter chunking, the only in-budget move is visual grouping of D1–3 (datasheet/measurement/explain) apart from D4–6 (the two calculations) within the existing slide.

**Files referenced:** `/Users/dz00762/repos/ENGS28/assets/decks/day16.json`, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` (`sec-photo-day16`, lines 403–955), `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (B-8 line 441, B-16 line 763, B-18 line 566, B-19 line 532, P-7 line 99).

---

# expert-class-logistics

### Verdict: BLOCKER

### Running clock (Thursday, 110 min)

| Clock | Block | Budgeted | Beat-level sum (as written) | Agrees? |
|---|---|---|---|---|
| 0:00–0:03 | Settling | 3 | — | n/a |
| 0:03–0:05 | Announcements | 2 | — | n/a |
| 0:05–0:15 | Part 1, divider (`subsec-day16-divider`) | 10 | 1+2+1+2+2+2 = 10 | yes, exact — no slack |
| 0:15–0:53 | Part 2, Lab 8 §1 (`subsec-day16-lab`) | 38 | ptx note claims "≈35 min in all" (+1 intro = 36) | **no — 2 min short of the 38 the section header and agenda slide use** |
| 0:53–1:10 | Part 3, arm assembly (`subsec-day16-arm`) | 17 | 1(review)+1(cup)+1(clips)+10(assembly) = 13 | **no — 4 min unaccounted** |
| 1:10–1:30 | Part 4, loop design (`subsec-day16-loop`) | 20 | 1+2+17(=5+12)+1(bounds) = 21 | **no — 1 min over its own row** |
| 1:30–1:45 | Part 5, start tracker (`subsec-day16-start`) | 15 | 1+14 = 15 | yes, exact |
| 1:45–1:50 | Close | 5 | — | n/a |

Where the hour actually ends: with Part 4 already 1 minute over its own beat sum, and no slack anywhere else to absorb it, class lands at **minute 111**, one minute into what should be the close — the recap that consolidates the loop's design gets clipped first, which is the one thing S-8 says never to lose.

The bigger problem isn't the 1–4 minute drifts above — a `≈` budget with a few minutes of slop is normal. It's that **checkpoint minute 72 no longer exists on this clock** (Part 3 now ends at minute 70), and the plan's own printed recovery path can't be executed against the current 5-Part arc. Both are detailed below.

### Findings

1. **[BLOCKER] S-8 — `plans/day16.md`'s "If a part overruns, cut in this order" is written against a Part structure Petra's own two review passes deleted.** It names "Part 6," "Part 3 to its datasheet beat only," and "Part 4's clip check" — none of which exist in the deck's current Parts 1–5 (`assets/decks/day16.json`, `sec-photo-day16`). Part 2 (38 min, the day's only genuinely uncuttable content per her own ruling) is the section most likely to run long, and there is no dated, correct fallback telling the presenter what compresses if it does. **Fix:** rewrite the cut order against the current arc — e.g. "Part 5's tracker-start intro to one sentence → Part 4's discussion to the sign question only, the other two folded into the instructor reveal read aloud → Part 3's clip check done by the instructor walking the room rather than a full pause. Never cut Part 2." No new slides needed, this is a `plans/day16.md` text fix.

2. **[MAJOR] S-8 — `inst-day16-arm-checkpoint` (deck title "Checkpoint: minute 72"; also named in `sl-day16-full-setup`'s `<note>`, ch-photosensors.ptx line 755) is stale by 2 minutes.** It's a leftover from a superseded structure where a 5-minute "sensor family" Part sat between the lab work and the arm assembly (53+5+14=72); that Part was cut in Petra's pass 1 and moved to the reading. Under the current arc Part 3 runs 53→70, so the checkpoint the presenter is told to expect at 72 is actually 2 minutes into Part 4 — i.e., looking for it "about minute 72" means it's already missed. **Fix:** change the slide title to "Checkpoint: about minute 70" in `assets/decks/day16.json` and the matching text in `source/ch-photosensors.ptx` (`inst-day16-arm-checkpoint`'s opening clause and `sl-day16-full-setup`'s note).

3. **[MAJOR] S-8 / instructor bandwidth — the minute-39 checkpoint is not where the presenter will be looking at minute 39.** `inst-day16-part2-checkpoint` bundles both the minute-39 (build/voltmeter) and minute-53 (code) ladders on one slide positioned at the *end* of Part 2's sequence — after `act-day16-study` (D1–D6, ~minute 24–39) **and** after `act-day16-two-channel` (D7–D8, the code activity), both of which are explicitly marked "Leave up." A presenter walking the room at minute 39 checking for a rail-value fault has to skip forward past two slides deliberately left projected to find the ladder they need right now. **Fix (no new slides):** reorder the existing `inst-day16-part2-checkpoint` entry in `assets/decks/day16.json` to sit immediately after `act-day16-study` (before `sl-day16-lab-fig2`), since its content already covers both checkpoints — the presenter reaches it once, in time for minute 39, and can flip back to it again near minute 53.

4. **[MINOR] S-8 — Part 3 and Part 4's own itemized beat lists don't sum to their section totals.** Part 3: "1 review, 2 for cups/clips, ≈10 assembly, checkpoint" = 13 against a stated 17 (4 min unexplained — likely absorbed slack, but unstated). Part 4: "3 for the two loops, 5 to read, 12 to discuss" = 20, but `sl-day16-bounds`'s own 1 min pushes the real total to 21. This is the exact failure mode S-8 names ("Day 12's Gate 2′ found Part 5's beats summing to 9 against a row of 5") — a presenter working from these notes has arithmetic that doesn't close. **Fix:** either state Part 3 honestly as "13 + 4 min of finishing/checkpoint slack" and Part 4 as "3+5+11+1=20" (trim the discussion beat by one minute), or bump the section headers to 17/13→ state correctly and take the 1 spare minute from the close.

5. **[MINOR] S-25-adjacent logistics — Part 5's open lab-work slide has no persistent on-screen reference, unlike Part 2's.** `act-day16-study` and `act-day16-two-channel` are both marked "Leave up" so the deliverables stay projected during the 38 minutes of work time. `sl-day16-start` (Part 5, ~14 minutes of open lab time before the close) carries no such instruction, so nothing keeps D9/D10 and the competing-light warning visible while students work. **Fix:** add "Leave up." to `sl-day16-start`'s `presenterNote` in both `assets/decks/day16.json` and `source/ch-photosensors.ptx` — a two-word text edit, no new slide.

6. **[MINOR] P-2 — the minute-39 checkpoint compresses first-time-hardware and paper work into 24 minutes.** Between Part 2's start (0:15) and the minute-39 checkpoint sits: datasheet lookup (D1), a multimeter dark/light measurement with a 10 s settle (D2), a discrepancy discussion (D3), a geometric-mean calculation (D4), two expected-voltage calculations (D5–6), *and* building two photocell dividers on the breadboard with an AD2 voltmeter check on both nodes — six deliverables plus a two-divider build, in 24 minutes, for a class with a documented 3× completion spread on hands-on tasks. The checkpoint's own troubleshooting ladder (rail-value nodes, shared rows, dead cells) suggests this is already anticipated as tight. No fix required if Petra accepts the minute-53 hard stop as the real safety valve (it already sends stragglers into Lab 8's own time) — flagging only because nothing marks minute 39 as approximate/soft the way minute 53 is explicitly called "a hard stop."

**Checked and clear:** no S-25 classroom-management language found on any student-facing slide (all checkpoint/staffing/troubleshooting text lives correctly in `<instructor>` blocks and `presenterNote`s). The "servo does not work" branch is well-handled through Part 3 — explicit instructor-block text lets that student continue the divider study and the arm assembly unaffected, and pairs them with a tablemate for the Part 4 sign-observation — though nothing addresses it for Part 5, which is acceptable since Part 5 is lab-time/homework continuation, not new class content.

**Files referenced:** `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/assets/decks/day16.json`, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` (lines 403–955, `sec-photo-day16`), `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (S-8 at line 864, P-2/P-3 at line 40/57, S-25 at line 1009, B-18 at line 566, B-19 at line 532).

---

# checker-arc-fidelity

Everything read from the live working tree (`main`, clean): her `.pptx`, `assets/decks/day16.json`, `source/ch-photosensors.ptx`, `plans/day16.md`, `plans/week8-ground-truth.md` §4, and both built decks in `output/web-deck/` and `output/web-deck-instructor/`. Titles are hers, mined, not inferred.

### Verdict: MAJOR

Nothing that gates an activity is missing from the room. All sixteen of her slides are accounted for, in her order, and every in-class paragraph has exactly one home. The one real defect is a layout: her slide 5's equation, which she solved on its own line, is buried mid-sentence in a bullet on ours — and that is the one thing she already told us to fix, in the book, at pass 1.

### Her arc against the room

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | Engs 28 / Day 16 | deck 1 (`title`) | glue, fine |
| 2 | Photosensors (divider) | deck 4 (`section`, Part 1) | fine |
| 3 | Photocell = light-dependent resistor (LDR) | **not in the deck** — reading, `source/ch-photosensors.ptx:60–101`, her/Adafruit's sentences near-verbatim | deliberately dropped (plan coverage table: "reading") |
| 4 | Photosensors are frequently nonlinear | deck 8 `sl-day16-nonlinear`, on her own slide-4 image (`slide04_0c98f286.png`) | present; "lux" undefined — finding 2 |
| 5 | …nonlinear (the log-log relation) | deck 9 `sl-day16-loglog-relation` | present but **relayout worse** — finding 1 |
| 6 | Many sensors are based on resistance | **not in the deck** — reading, `:104–128` | deliberately dropped: Petra pass 2, *"Part 3 … is deleted: it is the reading"* |
| 7 | Using a CdS photocell to measure light | deck 5 `sl-day16-divider-recall` (refPage to `fig-photocell-divider`) + deck 6 `act-day16-direction` + deck 7 reveal | present; her second line dropped — finding 6 |
| 8 | Part 1 of Lab 8: Technical Study | deck 13 `sl-day16-lab-fig1` + deck 14 `act-day16-study` (D1–D6) | present, lab's words |
| 9 | …continued | deck 15 `sl-day16-lab-fig2` + deck 16 `act-day16-two-channel` (program, D7–D8) | present; slide 15 carries a stray bullet — finding 3 |
| 10 | Review: servo test setup | deck 20 `sl-day16-servo-review` (refPage `subsec-day15-power.html`) | present; tense now wrong — finding 4. 7805/9 V correctly dropped |
| 11 | Solar Tracker Assembly | deck 21 `sl-day16-cup` | present, caption verbatim |
| 12 | …continued | deck 22 `sl-day16-clips` | present, caption verbatim |
| 13 | …last step | deck 23 `act-day16-arm`; her "physically located in the cups" callout → deck 24's caption | present. Her pot clause was **moved by Petra** to Part 2's opening (`sl-day16-lab-time`); the servo confirmation she deleted outright at pass 2 |
| 14 | Ultimate Setup | deck 24 `sl-day16-full-setup`, her export `week8FullLabSetup.png` (verified: no pot, dividers on A0/A1, servo on the regulator) | present, her image |
| 15 | Read "A Solar Tracker" | deck 26 (`section`, title verbatim) + deck 29 `act-day16-design` | present, expanded to three questions (named in the plan) |
| 16 | Student Feedback Survey | — | deliberately dropped: course admin |

### The chapter's in-class prose against the deck

| source | what it teaches | condensed by | judgment |
| --- | --- | --- | --- |
| `:406` intro | today's shape | deck 2 recap + deck 3 agenda | glue |
| `:419` p | R_sens, R_M, V_M named | 5 `sl-day16-divider-recall` | 1:1 |
| `:430` activity | her slide 7's question | 6 (`room:true`) | 1:1 |
| `:438` p | the reveal | 7 (instructor) | 1:1 |
| `:449` p | her slides 4 **and** 5 in one paragraph | **8 and 9** | one paragraph, two slides — the safe direction |
| `:475` fig `fig-photocell-loglog` | her log-log family | ref of 8 and 9 | fine |
| `:499` p | two cells differ | 10 `sl-day16-compare` | 1:1; bullets 2–3 are ours (below) |
| `:524` p | lab time; pot off A0 | 12 `sl-day16-lab-time` | 1:1 |
| `:536` fig Lab 8 Fig 1 | the divider, V_1 relabeled | 13 | 1:1 |
| `:546` activity D1–D6 | the study | 14 (`room:"compressed"`) | 1:1 |
| `:587` fig Lab 8 Fig 2 | two dividers on the board | 15 | slide adds a sentence the book does not say here — finding 3 |
| `:599` activity (intro, program, D7, D8) | the two-channel program | 16 | 1:1; its `<introduction>` is doubled onto 15 |
| `:624` instructor | the loop, CCRDY, D1's rows | 17 (instructor) | 1:1 |
| `:651` instructor | checkpoints 39 / 53 | 18 (instructor) | 1:1 |
| `:684` p | servo recall, on to the arm | 20 | 1:1; tense — finding 4 |
| `:699` fig cup | her slide 11 photo | 21 | 1:1 |
| `:709` fig clips | her slide 12 photo | 22 | 1:1 |
| `:719` activity | cups, clips, recreate | 23 | 1:1 |
| `:741` fig full setup | her slide 14 | 24 | 1:1; its caption's wiring sentence is spent on slide 15 instead |
| `:757` instructor | checkpoint 72 | 25 | 1:1 |
| `:776` p | the two loops | **27 and 28** | one paragraph, two slides, both `stack="yes"` — correct, two block diagrams cannot share a 1600×900 |
| `:791` fig servo loop | Day 15's slide 8 | ref of 27 | fine |
| `:803` fig Lab 8 Fig 6 | the tracking loop | ref of 28 | fine |
| `:817` activity | read §4, three questions | 29 (`room:true`) | 1:1 |
| `:842` p | bounds, `milliseconds()` | 31 `sl-day16-bounds` | 1:1 (deck puts the reveal at 30 first, per its own note) |
| `:860` instructor | the three answers | 30 | 1:1 |
| `:887` instructor | worked loop, fixed-step | 32 | 1:1 |
| `:935` p | lab time, D9/D10, competing light | 34 `sl-day16-start` | 1:1 |

**No paragraph is left off, and no slide condenses two paragraphs.**

### Deck entries with no origin in her Day 16 deck

- 1 title, 2 `Where we are`, 3 agenda, 4 / 11 / 19 / 26 / 33 section dividers, 35 `Looking ahead` — **glue**. Entry 26's title is her slide 15 verbatim; the rest are the standard frame.
- 7 `sl-day16-direction-reveal` — **the reveal of her own question**, licensed by her slide 7.
- 10 `sl-day16-compare` — bullet 1 is her slide 3's speaker note ("variations … 50% or higher"); **bullets 2 and 3 are ours**, the argument that comparison does not cancel unit mismatch. Named in the plan.
- 17, 18, 25, 30, 32 — **instructor blocks, ours** (P-10). Verified stripped from `output/web-deck/`: 0 hits for `inst-day16`, `K_DIV`, `CCRDY`, D1's resistance rows.
- 27, 28 `sl-day16-loop-servo` / `-loop-around` — **Day 15's slide 8 plus Lab 8 Figure 6**, not her Day 16 deck. Named in the plan.
- 31 `sl-day16-bounds` — **Lab 8 §4's own requirements**, not a slide of hers.
- 34 `sl-day16-start` + Part 5 — **the one addition**, licensed by her *"they can get started, but it's their lab work"* and named twice in the plan.

None of these is a slide invented to absorb a layout problem.

### Reuse: hers and the lab's, verbatim vs paraphrased

**Verbatim hers** — `act-day16-direction` statement (slide 7, plus one added sentence); `sl-day16-cup` and `sl-day16-clips` captions (slides 11, 12); the program task in `act-day16-two-channel` (slide 9a, whole); "We'll now add the photocells to the tracker arm of your servo" and "Use the code from `Day15_servo_template.c` that you completed" (slide 10); `act-day16-design`'s instruction (slide 15); `sl-day16-full-setup`'s "physically located in the cups of your tracker arm" (slide 13's callout, correctly re-homed onto slide 14's image); the log-log relation itself, in her plain-text form (slide 5).

**Verbatim the lab's** — D1, D2, D3, D6, D8; D5 with the divider equation typeset; D4 minus the Williams citation (correctly dropped, CLAUDE.md).

**Paraphrased** — `sl-day16-nonlinear` rewrites her slide 4's three lines into complete sentences (her pass-2 request) and adds "or for our tracker"; "Pot → ADC → PWM controls the servo" → "the potentiometer, the ADC and the PWM pulse control the servo"; D7's "Does your measured value … in the question 6?" → "Do your measured values … within the expected range you calculated earlier?"; her slide 13's "leads of the alligator clips" → "pins" (finding 8).

**P-12 traps correctly not carried** — "page 133 of Williams", the 7805/9 V sentence, "Waveform's", the survey slide.

### Findings

1. **[MAJOR] Her slide 5's layout rebuilt worse — the log-log relation is buried mid-bullet.** Her slide 5 is: statement, figure, the label line *"Log-log plot approximate relationship (data sheet)"*, then the equation **alone on its own line at title size**, with the symbol meanings out of the argument. `sl-day16-loglog-relation` (`source/ch-photosensors.ptx:492–497`, deck 9) puts the whole thing inside one ~240-character bullet: *"The slope of the line comes from the datasheet, whose Sensitivity row gives S = 0.6, so the approximate relationship is log10(R100) − log10(R10) = −0.6 [log10(E100) − log10(E10)], where R100 and R10 are …"*. This is the Day 11 four-relationships case exactly (`AUTHORING-visual.md` Rule 3), and it is also the one thing she already asked for — pass 1: *"her slides 4–5 on the nonlinearity (**the log-log relationship on its own line, symbols defined**)"*. The book obeys her (`<md>` at `:466–470`); the room does not. — her slide 5 / `:492` — **fix**: rebuild `sl-day16-loglog-relation` as her shape — lead line ("The datasheet's *Sensitivity* row gives S = 0.6, so, from the plot:"), the equation on its own line as a display element, the four symbols in a legend block of their own, and "a factor of 10 in light is a factor of about 4 in resistance" as the closing line. Position unchanged, deck 9.

2. **[MINOR] "lux" reaches the room undefined.** Her slides 4 *and* 5 both carry the callout *"'lux' = lumens per square meter"* in the right margin at 37.5 pt — title size, said twice, so she plainly thought it needed saying at the wall. Deck 8 and 9 use "lux" four times between them; the definition exists only in the reading (`:92`). — her slides 4 and 5 / `:484`, `:492` — **fix**: a short second-tier line on `sl-day16-nonlinear`, "lux = lumens per square meter", carried as-is.

3. **[MINOR] `sl-day16-lab-fig2` carries a bullet with no paragraph behind it, and it is the room's only statement of which pin is which.** Bullet 2 ("Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail; one node goes to A0 (PA0) and the other to A1 (PA1)") appears nowhere in Part 2's prose — the sentence is lifted from `fig-day16-full-setup`'s caption in Part 3 (`:741`), and that slide's own caption drops it. So the pin assignment reaches the room once, forty minutes before its figure, and Part 2's book text never says it. Bullet 1 duplicates `act-day16-two-channel`'s `<introduction>` (`:602`), which deck 16 shows next. — her slide 9 / `:587–597` — **fix**: move the wiring sentence into `fig-day16-lab-fig2`'s caption, where the students meet Lab 8 Figure 2 and need it, and let the slide carry that caption alone; drop bullet 1.

4. **[MINOR] `sl-day16-servo-review` recalls a potentiometer that came out in Part 2.** Petra's pass 2 moved the pot's removal to Part 2's opening (`sl-day16-lab-time`, `:524`). Forty minutes later deck 20 says, in the present tense, "the potentiometer, the ADC and the PWM pulse **control** the servo". In her deck this slide came *before* the pot left (her slide 10 vs slide 13). — her slide 10 / `:684`, `:692` — **fix**: past tense in both the paragraph and the slide, "On Day 15 the potentiometer, the ADC and the PWM pulse controlled the servo, with the code …". One word.

5. **[MINOR] The Reference answers two of the day's commits, in student-facing text.** `subsec-photo-ref-divider` ends "and V_M rises as R_sens falls" — the answer to `act-day16-direction` (deck 6, `room:true`). `subsec-photo-ref-loop` states "every error with |e| < K_DIV produces a step of 0, a dead zone of ±K_DIV counts" — the answer to `task-day16-integer` (deck 29). The *reading* is clean: `subsec-photo-divider` deliberately stops at "V_M changes with it", and the reading question asks the swapped divider on purpose. This is a judgment call, since the Reference is the lookup material she asked for — flagging it, not asserting it. — `:975`ish and `subsec-photo-ref-loop` — **fix, if she wants it**: cut the clause "and V_M rises as R_sens falls" and let the formula stand; leave the loop paragraph alone, since Lab 8 prints the update rule itself.

6. **[MINOR] Her slide 7's bridge line has no home.** *"Part 1 of the lab will guide you deeper into the data sheet."* — the sentence that tells the room why the next 38 minutes are a datasheet exercise. Not in the deck. — her slide 7 — **fix**: append as a second bullet to `sl-day16-direction-reveal` (deck 7), which is where her slide put it, or failing that to `sl-day16-lab-time`.

7. **[MINOR] Part 4's beats sum to 21 against its stated 20.** `check_deck.py` already reports it (S-8): section note 3 + 5 + 12 = 20, slide notes 1 + 2 + 17 + 1 = 21. — deck 26–31 — **fix**: `sl-day16-loop-servo` and `-loop-around` at 1 min each, or raise Part 4 to 21 and the close to 4.

8. **[MINOR] Her slide 13's word silently changed.** "Connect the **leads** of the alligator clips to your breadboard" → `task-day16-recreate` (`:734`) "Connect the **pins**". Hers is also the lab's (Appendix A), and it is an instruction students follow with hardware in hand. — her slide 13 / `:734` — **fix**: restore "leads".

### Layouts she already solved

- `sl-day16-loglog-relation` — her slide 5 does this as **figure, label line, equation alone on its own line, symbols out of the argument** — **adopt hers** (finding 1).
- `sl-day16-nonlinear` — her slide 4 does this as **statement above the figure, the "not a problem / if you want lux" pair below, lux defined in the margin** — keep the bullets, **adopt her lux callout** (finding 2).
- `fig-photocell-divider.svg` — her slide 7 does this as **schematic with V_M = V_cc·R_M/(R_sens+R_M) beside the node arrow** — **hers, adopted**: the SVG is a faithful redraw with "the sensor" / "the fixed resistor" / "to an ADC pin" added. Keep.
- `sl-day16-full-setup` — her slide 14's own export, with her slide 13's "physically located in the cups" callout folded into the caption. Keep.
- `sl-day16-loop-servo` / `-loop-around` — the plan wanted one `<sidebyside>`; the deck uses two stacked slides. **Keep** — two block diagrams in one 1600×900 would be unreadable, and each has its own paragraph clause.

### Checked and correct

The room gets, in her order: the divider and her question with its reveal, the nonlinearity on her own plot, the unit-to-unit caveat, Lab 8 §2 in the lab's own words with both figures, the servo recall on Day 15's powering drawing, the cups, the clips, the recreate step, her ultimate setup, and her "read §4 and discuss" — sixteen for sixteen, with slides 3 and 6 moved to the reading and slide 16 dropped, both on Petra's own pass-2 instruction, and her slide 13's pot clause relocated to Part 2 by her, also checked. Constraints: **protected list clean** — no D1 resistance rows, no measured values, no expected voltages, no tracker loop code and no `K_DIV`/`updateServo`/`adc_setChannel` anywhere in `output/web/` or `output/web-deck/`; all of it confined to five `<instructor>` blocks, verified stripped. **B-18**: ten body paragraphs across five Parts against Day 11's passed 25, and 20 student-facing content slides for 110 minutes — the additions over her arc are the two-loops pair, `sl-day16-compare`'s two bullets, `sl-day16-bounds`, Part 5, and the instructor blocks, each named in the plan's pass blocks. **B-19**: not an x-day; the pot rule and the competing-light warning are each stated once.

Files: `/Users/dz00762/repos/ENGS28/assets/decks/day16.json`, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx`, `/Users/dz00762/repos/ENGS28/plans/day16.md`, `/Users/dz00762/repos/ENGS28/assets/ClassSlidesOLD/Day16-Photosensors.pptx`, `/Users/dz00762/repos/ENGS28/assets/images/Day16-Photosensors/`.

---

# learner-visual

### Verdict: BLOCKER

### Findings

- **[BLOCKER] P-4 / AUTHORING-slides.md ("put the picture on the wall")** — Every "leave-up" activity in this deck strands the room on a figure-free slide while its own text tells them to look at one. `act-day16-direction` (runtime #6) asks students to "explain your answer from the formula in **the figure**" — the divider circuit shown one slide earlier (`sl-day16-divider-recall`, #5) is already gone. `act-day16-study` (#14) is left up for the ~35-minute lab block and Deliverable 5 says "the equation for the voltage divider **as drawn above**" — nothing is drawn above; the circuit (`sl-day16-lab-fig1`, #13) was on the *previous* slide. `act-day16-two-channel` (#16, also "Leave up") says "wire… **as shown in the figure**" with no figure on screen. `act-day16-arm` (#23, "her slide 13," ≈10 min) says "as in **the figure**" twice, for both the cup and the full-setup wiring, with neither image present. I mined her original deck to confirm: slide 7 (question + divider figure), slide 8 (deliverables + figure, 3 images), slide 9 (fig 2 + program task, 1 image) and slide 13 (assembly steps + both photos, 2 images) each put the picture and the task **on the same physical slide**; ours split every one of them into a figure-only slide followed by a text-only slide. Fix: pair each activity slide with its figure at reduced scale (the "figure + talking points" two-column pattern already used elsewhere in this deck), reusing the image already approved one slide earlier — not new content.

- **[MAJOR] P-12** — `sl-day16-full-setup` (#24) lost an annotation her original slide had. I rebuilt slide 13 with `pptx_annotate.py`: it draws a blue box around the two photocell symbols on the breadboard with an arrow and the label "Physically located in the cups of your tracker arm" placed directly on the image. Our slide instead puts that same sentence as plain caption text below the figure, so the eye has to search the drawing for two symbols with no box or arrow to find them. Rebuild the annotated SVG for `fig-day16-full-setup`/`sl-day16-full-setup` from that slide (the tooling and the annotation both already exist) instead of leaving the pointer to text.

- **[MAJOR] S-4 / B-11** — `sl-day16-lab-fig1` (#13) wastes its slide. I measured the rendered figure against the other single-figure slides in this deck at 1600×900: the divider circuit occupies ~20% of the usable area (347×597 px) versus 41% (`sl-day16-cup`), 42% (`sl-day16-full-setup`), and 52% (`sl-day16-clips`). It sits alone between a title and a one-line caption with no competing bullets, so there is no reason for it to be this small — it should be scaled up substantially (or, per finding 1, moved beside the deliverables it labels rather than left solo).

- **[MINOR] S-3 vs B-7** — Once finding 2 restores the arrow-and-box onto `fig-day16-full-setup`/`sl-day16-full-setup`, its slide caption ("The two photocells are physically located in the cups of your tracker arm…") is redundant with the on-image label and reads as description (correct for the *book* figure, `fig-day16-full-setup`, per B-7) rather than instruction (required on the *slide* per S-3). Trim the slide caption to what else needs saying (e.g., which pin the servo signal uses) once the annotation carries the location callout.

- **[MINOR, extra emphasis]** The same pattern as finding 1 shows up for the pre-class reading specifically: `act-day16-direction` (#6) is the room's first return to the photocell divider after last night's reading, and it is pure text — no re-shown circuit, no callouts, nothing but the question. A student who didn't retain the reading's figure has nothing to look at while working the divider formula at the table. This is the single highest-value slide in the deck to fix under finding 1, since it is also the first "did the reading land" checkpoint of the day.

Files reviewed: `/Users/dz00762/repos/ENGS28/assets/decks/day16.json`, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` (`sec-photo-day16`, lines 403–952), `/Users/dz00762/repos/ENGS28/assets/ClassSlidesOLD/Day16-Photosensors.pptx` (slides 7, 8, 9, 12, 13, 14 mined for comparison), and rendered screenshots of deck slides 5–29 at 1600×900 via headless Chrome against the local player.

---

# learner-in-the-room

## Verdict: BLOCKER

One slide projects a formula with the square root silently deleted; it is up for 35 minutes and Deliverables 4, 5 and 6 are computed from it.

---

### Slide walk

Projection order in `output/web-deck-instructor` (the instructor build). `[I]` = `instructor: true`, dropped from the student deck.

| # | slide | What I have that I didn't before |
| --- | --- | --- |
| 1 | title | The day's topic. OK |
| 2 | recap "Where we are" | Where my board stands (servo on the regulator's 5 V, pot on A0, `Day15_servo_template.c`), what the reading gave me, what today is. OK |
| 3 | agenda | Five named parts. Item 5 ("Starting on your tracker") is the only thing not already in bullet 3 of slide 2; thin, but the deck's standard glue. OK |
| 4 | section "The photocell in the divider" | We are starting. OK |
| 5 | `sl-day16-divider-recall` | The divider figure with the formula V_M = V_cc·R_M/(R_sens+R_M) on the wall, and the three names. Real. Title is verbatim the same as slide 4's |
| 6 | `act-day16-direction` (room) | The question to commit to: brighter → V_M up or down? Real. **But** the slide says "explain your answer from the formula in the figure" and the figure left the wall on slide 5 (the player strips figures out of a projected activity). Her slide 7 had figure and question together |
| 7 | `sl-day16-direction-reveal` [I] | The answer. Fine as instructor-only |
| 8 | `sl-day16-nonlinear` + log-log plot | Nonlinearity; both axes logarithmic; R ∝ E^(−S) is a straight line. R, E, S defined in the bullet. Real (her slide 4) |
| 9 | `sl-day16-loglog-relation` | S = 0.6, the log relation, "ten times the light, about four times less resistance". Real (her slide 5). "the datasheet" is never given a part number anywhere in this deck |
| 10 | `sl-day16-compare` | Unit-to-unit spread and what it costs the tracker (the two voltages balance at an arm angle that is not the light). Genuinely new |
| 11 | section "Part 1 of Lab 8" | Transition. OK |
| 12 | `sl-day16-lab-time` | Work time begins; the pot comes off A0 with nothing powered. A real action |
| 13 | `sl-day16-lab-fig1` | Lab 8's Figure 1 and its notation R1/R2/V1. Real. It never says these are Part 1's R_sens/R_M/V_M under new names |
| 14 | `act-day16-study` (compressed) | Deliverables 1–6. **D4 projects as "R_2 = R_dark × R_illuminated" — the √ is gone.** See finding 1 |
| 15 | `sl-day16-lab-fig2` | The two-divider breadboard photo, and A0/A1 assigned. Real |
| 16 | `act-day16-two-channel` (compressed) | The program, D7, D8. Real. Its lead sentence repeats slide 15's first bullet word for word and points at a figure that has just left the wall |
| 17 | `inst-day16-two-channel` [I] | CCRDY, the D1 rows. Fine |
| 18 | `inst-day16-part2-checkpoint` [I] | Two real ladders that split causes (rail value vs. unchanging node vs. shared row). Good |
| 19 | section "Solar tracker assembly" | Transition. OK |
| 20 | `sl-day16-servo-review` + Day 15 powering drawing | Recall, and the powering drawing back on the wall. Real (her slide 10) |
| 21 | `sl-day16-cup` | The cup photograph and the instruction. Real (her 11) |
| 22 | `sl-day16-clips` | The clip photograph and the instruction. Real (her 12) |
| 23 | `act-day16-arm` "last step" (compressed) | **Almost nothing.** Tasks (a) and (b) restate slides 21 and 22 near-verbatim; only (c) is new, and (c) says "as in the figure" about a figure that is on the *next* slide |
| 24 | `sl-day16-full-setup` | The end-state photograph. Real (her 14) |
| 25 | `inst-day16-arm-checkpoint` [I] | The clip ladder. Good, but titled "minute 72" and claims an observation the room was never asked to make (see finding 5, 6) |
| 26 | section 'Read "A Solar Tracker"' | Transition. OK |
| 27 | `sl-day16-loop-servo` (stacked) | The servo's own loop, as a diagram. Real |
| 28 | `sl-day16-loop-around` (stacked) | Lab 8's Figure 6: the loop we close, and that we write the controller. Real |
| 29 | `act-day16-design` (room) | Read §4; three questions. Real — but V_0, V_1, T and the update rule K·e all appear here for the first time and none is on the wall |
| 30 | `inst-day16-discussion` [I] | The three answers. Good |
| 31 | `sl-day16-bounds` | New requirement: bounds before `CCR1`, ±60°, and T kept with `milliseconds()`. Real — but "the two numbers are yours to work out from the pulse convention" gives me nothing to work from |
| 32 | `inst-day16-loop` [I] | The worked loop. Good |
| 33 | section "Starting on your tracker" | Transition. OK |
| 34 | `sl-day16-start` | Lab time; D9 and D10; the competing-light warning. Real |
| 35 | recap "Looking ahead" | **Nothing.** Both bullets are already on slide 34 |

---

### Does not earn its place

1. **[BLOCKER] `act-day16-study` / `task-day16-d4` (slide 14) — the square root is deleted on the wall.** S-6 ("a fraction bar, a **root** or a stacked limit does not [survive flattening]"). The source is `<m>R_2 = \sqrt{R_\text{dark} \times R_\text{illuminated}}</m>`; the player's `demath()` has a `\frac` handler and no `\sqrt` handler, so the catch-all `/\\[a-zA-Z]+/` eats `\sqrt` and `/[{}]/` eats its braces. The projected text is:

   > Deliverable 4. It is recommended that the value of R_2 be set as the geometric mean of R_dark and R_illuminated, i.e. **R_2 = R_dark × R_illuminated.** Based on the values you measured, compute R_2.

   This is on the wall for the whole 38-minute work block, it is the only statement of the rule the room can see, and D5 and D6 are computed from its answer. A student following it gets ~1 GΩ instead of ~30 kΩ. **improve**: add `.replace(/\\sqrt\s*\{([^{}]*)\}/g, '√($1)')` next to the `\frac` line in `demath()` in `/Users/dz00762/repos/ENGS28/assets/class.html`, and make `scripts/check_deck.py` fail when a projected `<m>` contains a LaTeX command `demath()` does not handle — this is the second class of math that has reached the projector raw (the comment above `placeMedia` records the first).

2. **[MAJOR] slide 35, the closing recap "Looking ahead" — a fact that was already on slide 34.** Slide 34 says "Deliverable 9 is a demonstration of the working tracker, with a log of your tuning of K and T, and Deliverable 10 puts the seven-segment display back into the system to show the servo's angle." Slide 35 says the same two things in the same order. Fifteen minutes of work happened in between, but nothing new arrived. Compare Day 15's close, which gave the x-hour rule and named Thursday's work and Thursday's reading — both new. **improve**: replace with what only the close can give — when Lab 8 is due, what next class is and its reading, and whether anything else is due (the presenter note already says "No other homework is due"; that sentence is the one thing here the room does not have).

3. **[MAJOR] slides 6, 16 and 23 — three projected activities point at a figure that is not on the slide.** The player deliberately strips figures out of a ref'd `<activity>` (`isActivity` branch), and `dexref()` rewrites the number to the bare noun. So:
   - slide 6: "Explain your answer from the formula in **the figure**" — the divider was on slide 5.
   - slide 16: "Wire the two photosensors and 10 kΩ resistors on your breadboard **as shown in the figure**" — the breadboard photo was on slide 15, and this sentence is slide 15's first bullet repeated.
   - slide 23 task (c): "recreate the photocell circuit from earlier in the lab, **as in the figure**" — that figure is on slide **24**, which I have not seen yet.

   S-9: a slide has to stand on its own. **improve**: for slide 6, put `"refPage": "subsec-photo-divider.html"` and the figure back beside the question (her slide 7 had both) — this is the one that matters, because it is a predict-and-commit slide and the formula *is* the reasoning. For 16 and 23, drop the dangling reference from the projected wording ("Wire the two photosensors and 10 kΩ resistors on your breadboard"; "…recreate the photocell circuit from earlier in the lab"), or move slide 24 in front of slide 23 so the picture is up while the step is done.

4. **[MAJOR] slide 23 `act-day16-arm` — restates the two slides immediately before it.** Task (a) is slide 21's caption plus "with nothing powered"; task (b) is slide 22's caption plus "one clip per lead". Only task (c) is new, and the slide is titled "Solar tracker assembly, **last step**" — which is exactly what her slide 13 is: the last step alone. This is the "a slide restating the tasks of the activity two slides earlier" pattern. **improve**: move "with nothing powered" and the already-in-the-cups shortcut into slide 21's caption and "one clip per lead" into slide 22's, and let the projected activity be the last step: connect the clips to the breadboard, recreate the circuit, power up in the usual order, run the two-channel program again. (The book keeps all three tasks; only what projects changes.)

5. **[MAJOR] the clock does not reconcile at the beat level, and one checkpoint has drifted off the timeline (S-8).**
   - Part 3: section row **17 min**, beats 1 + 1 + 1 + 10 = **13**. Four minutes with no beat on them — S-8's named failure mode.
   - Part 2: section row **38 min**; `sl-day16-lab-time`'s note says "≈ 1 min … ≈ 35 min in all" = **36**.
   - Part 4: row **20**, beats 3 + 17 + 1 = **21**. `scripts/check_deck.py` already prints this one.
   - Consequence: with 3 settling + 2 announcements + 10 + 38, Part 3 runs minute 53 → **70**. `inst-day16-arm-checkpoint` is titled **"Checkpoint: minute 72"** and its text repeats it — two minutes into Part 4. It is a leftover from the pre-rebudget plan where the assembly Part was 14 minutes starting at 58.
   - Also stale, in `source/ch-photosensors.ptx`: the Part 2 comment reads `38 min = 3 (the servo check) + 35` — the servo check was deleted in Petra's pass 2 — and the Part 3 comment reads `14 min`, against the deck's 17.

   **improve**: give the Part 3 checkpoint its own 3-minute beat and the assembly 11 (1+1+1+11+3 = 17), retitle it **minute 70**; make `sl-day16-lab-time`'s note read "≈ 1 min, then ≈ 37 min"; move `sl-day16-bounds`'s minute into the Part 4 section note (3 + 5 + 11 + 1 = 20). Net change to the class: zero, still 110 (B-18). Fix the two source comments at the same time.

6. **[MINOR] slide 29 `act-day16-design` — three symbols make their first appearance inside the questions.** `V_0` / `V_1` (Lab 8's two channel readings — and `V_1` meant something else on slide 13, the single divider's node); `T` (appears only as "if T is much too long", and is not defined until slide 31); and the update rule itself — question (b) asks "what step does **the arithmetic** give" when no arithmetic is on the wall. Students have Lab 8 §4 open, which is why this is minor rather than a blocker, but the slide is not usable without it. **improve**: one framing line on slide 28 or in the activity's introduction — "Lab 8 writes the two readings V_0 and V_1 (the cells on A0 and A1), the error e = V_1 − V_0, and the update PWM ← PWM + K·e every T milliseconds" — and then (c) reads "if the sampling interval T is much too long".

7. **[MINOR] slide 31 `sl-day16-bounds` — "the two numbers are yours to work out from the pulse convention"** with no convention on the wall. To convert ±60° into `CCR1` counts I need 1 ms = 200 = −90° and 2 ms = 400 = +90°, which was Day 15's table. S-12 / S-26: name the referent. Also "narrower than **its** `SERVO_MIN` and `SERVO_MAX`" — the antecedent reads as Lab 8's. **improve**: "…narrower than the program's `SERVO_MIN` and `SERVO_MAX`, so the two numbers are yours to work out from Day 15's convention: 1 ms is −90° and 2 ms is +90°."

8. **[MINOR] the photocell is never named on the wall.** Deliverable 1 (slide 14) says "Using **the datasheet**, record the minimum dark resistance…" — the anchor text is the word "datasheet" and the part number PDV-P8001 appears on no slide in the deck. The lab handout names it, so this is not fatal, but it is the one lookup the whole of Part 1 rests on. **improve**: "Using the PDV-P8001 datasheet" in the task, and put the part number on slide 9 where "the datasheet's Sensitivity row" is first cited.

---

### Undefined on the wall

- `sl-day16-loglog-relation` (9) — "the datasheet" (which part) — last seen: nowhere in this deck; the reading names PDV-P8001
- `act-day16-study` (14) — "the datasheet" for Deliverable 1 — last seen: nowhere
- `act-day16-study` (14) — `V_cc` — last seen: slide 5's figure (as V_cc on the divider); the task also gives it as 3.3 V, so this one resolves
- `sl-day16-lab-fig1` (13) — `R_1`, `R_2`, `V_1` — defined in the caption, but never tied to slide 5's `R_sens`, `R_M`, `V_M`
- `act-day16-design` (29) — `V_0`, `V_1` (as the two channels) — last seen: nowhere; `V_1` last seen on slide 13 meaning a different node
- `act-day16-design` (29) — `T` — last seen: nowhere (defined one slide later, on 31)
- `act-day16-design` (29) — the update rule / "the arithmetic" that K multiplies — last seen: nowhere on the wall (Lab 8 §4 only)
- `sl-day16-bounds` (31) — "the pulse convention" — last seen: Day 15's deck, unnamed here
- `sl-day16-bounds` (31) — `SERVO_MIN`, `SERVO_MAX`, `updateServo()`, `CCR1`, `TIM14`, `milliseconds()` — last seen: Day 15 / Day 12; the slide names where each lives, so these resolve

---

### Tasks I could not do

- `task-day16-d4` — projected as *"the value of R_2 be set as the geometric mean of R_dark and R_illuminated, i.e. R_2 = R_dark × R_illuminated. Based on the values you measured, compute R_2."* — what I wrote: **R_2 = 0.2 MΩ × 5 kΩ = 1 GΩ.** The words say geometric mean and the formula says product; I copied the formula, because that is what a formula is for. Nothing else on the wall lets me tell which one is meant.
- `task-day16-recreate` (slide 23c) — *"Connect the pins of the alligator clips to your breadboard to recreate the photocell circuit from earlier in the lab, as in the figure."* — what I wrote: nothing about the target arrangement, because there is no figure on this slide; I worked from memory of slide 15. The picture arrives one slide later.
- `task-day16-tuning` (slide 29c) — *"Predict what the arm does if K is much too large, and what it does if T is much too long."* — what I wrote: the K half ("it overshoots and swings back and forth"); for T, nothing, because T has not been named on any slide I have seen. I had to look it up in the lab handout to find out T was the sampling interval.

---

### Two things to put to Petra

- **Her slide 16 (the Gen AI teaching-grant feedback survey, `dartgo.org/genaifeedback`, "approximately 5 minutes") is not in the deck** — dropped as course admin in `plans/day16.md`. It is one of her sixteen and it is the only one that asks the room to do something in the last five minutes, which is exactly the five minutes the close occupies. If she still wants it, it needs a slide and it takes the close's budget, not extra time (B-18).
- `inst-day16-arm-checkpoint` says *"every table should have seen, from the Deliverable 8 sweep, which channel rises as the light moves toward which side, and remember from Day 15 which way the arm turned as the knob raised the reading."* Neither observation is asked for anywhere student-facing: Deliverable 8 asks for maximum and minimum voltages, and the invented sweep task was removed in her pass 1. Part 4's question (a) is still answerable as written, but the instructor block's premise is not true of the room.

Files: `/Users/dz00762/repos/ENGS28/assets/decks/day16.json`, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` (lines 403–955), `/Users/dz00762/repos/ENGS28/assets/class.html` (`demath()`, ~line 825), `/Users/dz00762/repos/ENGS28/plans/day16.md`.

---

# checker-voice

## Verdict: MAJOR

### Register — is this her?

Yes, mostly — and that is worth saying plainly. The prose is her own three passes from today, the slides reuse her sentences rather than paraphrasing them (`sl-day16-clips`, `sl-day16-cup`, `sl-day16-compare`, `sl-day16-loop-around` are her wording or hers-as-passed), every Part opens on what we are doing, and I found no aphorism, no reassurance theater, no weekday as actor, no S-21 armature, and no unexpanded acronym. What is wrong is at the seam between the two texts: three activities restate the slide immediately in front of them (her Day 9x deletion, exactly), five `<xref>`s sit inside blocks the deck projects (her Day 12 finding, verbatim), one slide carries a sentence Part 2's prose no longer contains, one review slide describes a setup Part 2 dismantled forty minutes earlier, and the deck's "Where we are" drops out of the "Today we'll …" form that every deck since Day 9 uses.

---

### Rewrites

**1 — [MAJOR] `source/ch-photosensors.ptx:435, 603, 724, 731, 736` — live book links inside projected blocks (AUTHORING-slides § refs; her Day 12 comment)**

Five `<xref>`s sit inside blocks `day16.json` names as `ref` entries. Each projects as a clickable "Figure 14.4.3" on the wall.

```
act-day16-direction   line 435  <xref ref="fig-photocell-divider"/>
act-day16-two-channel line 603  <xref ref="fig-day16-lab-fig2"/>
act-day16-arm         line 724  <xref ref="fig-day16-cup"/>
act-day16-arm         line 731  <xref ref="fig-day16-clips"/>
act-day16-arm         line 736  <xref ref="fig-day16-full-setup"/>
```

- draft (435): `Explain your answer from the formula in <xref ref="fig-photocell-divider"/>.`
- hers: `Explain your answer from the divider's formula.` — the slide already carries the figure via `sl-day16-divider-recall`'s `ref` and `refPage`.
- draft (724): `insert them into the shielding cups on the motor arm, as in <xref ref="fig-day16-cup"/>` → `insert them into the shielding cups on the motor arm.` (the cup slide is the entry before it)
- draft (731): see finding 2 — the task goes.
- draft (736): `to recreate the photocell circuit from earlier in the lab, as in <xref ref="fig-day16-full-setup"/>` → `to recreate the photocell circuit from earlier in the lab.` The full-setup slide is the entry immediately after, and its `presenterNote` already says to leave it up.
- because: Petra, Day 12, 2026-08-25 — *"Remember that we never want to link to the book from slides. Clicking on a link like that leaves the slides in the middle of class — no good."* Nothing is lost: the figures are the neighbouring deck entries, and the book keeps every pointer if you move it into the paragraph outside the activity.

Adjacent, same failure mode but not settled by a specimen: `task-day16-d1` (line 550) projects a live `<url>` to the datasheet PDF. See "For Petra".

**2 — [MAJOR] `source/ch-photosensors.ptx:719-732` — the assembly activity re-tells the two slides in front of it (S-19 / Day 9x)**

Deck order is `sl-day16-cup` → `sl-day16-clips` → `act-day16-arm`. The first two tasks say what the two captions just said.

- draft (`task-day16-cups`): "With nothing powered, remove your photocells from the breadboard and insert them into the shielding cups on the motor arm, as in `fig-day16-cup`. If your photocells were already in the cups, they are already wired through their clips; go on to the last step."
- draft (`task-day16-clips`): "Use alligator-to-breadboard clips to make the electrical connections between the leads of the photosensors and your breadboard, one clip per lead."
- hers: keep one task and DELETE `task-day16-clips`. `task-day16-cups` becomes: *"With nothing powered, put a photocell into each of the two shielding cups on the arm, and bring each lead to the breadboard with an alligator-to-breadboard clip, one clip per lead. If your photocells are already in the cups, they are already wired through their clips; go on to the last step."* Nothing is lost — "one clip per lead" is carried, and the deck headline already calls this entry *"Solar tracker assembly, last step"*, which is her slide 13.
- because: she deleted *"Wire the display: + to 3.3 V, − to GND…"* from the Day 9x activity because the wiring slide immediately preceding it said exactly that.

**3 — [MAJOR] `source/ch-photosensors.ptx:592-598, 536-541, 599-604` — `sl-day16-lab-fig2` says something Part 2's prose no longer says, and repeats the activity behind it**

Her pass 2 deleted the paragraph that named the rails and the two ADC channels ("Lab 8's Figure 2 shows the two dividers on the breadboard, one node on A0 (PA0) and the other on A1 (PA1)…" and the whole `act-day16-dividers` wiring activity). The slide kept that sentence; the book now has it only in Part 3's `fig-day16-full-setup` caption, one Part after the students wire it. Meanwhile the slide's first bullet is the activity's introduction, word for word.

- draft (slide, 594-595):
  `<li>Wire the two photosensors and 10 kΩ resistors on your breadboard as shown.</li>`
  `<li>Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail; one node goes to A0 (PA0) and the other to A1 (PA1).</li>`
- draft (activity intro, 602-603): "Wire the two photosensors and 10 kΩ resistors on your breadboard as shown in `fig-day16-lab-fig2`."
- hers: make the slide caption-only, and put the electrical detail back in the book caption where it belongs, so the two texts match:
  - `fig-day16-lab-fig2` caption (537-539) → *"Lab 8's Figure 2, the two photocell dividers on the breadboard. The Nucleo's 3.3 V and GND feed the two rails. Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail; one node goes to A0 (PA0) and the other to A1 (PA1)."*
  - slide `sl-day16-lab-fig2` → `<caption>Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail. One node goes to A0 (PA0) and the other to A1 (PA1).</caption>` (drop both `<li>`)
  - the activity's introduction keeps her sentence, minus the xref (finding 1).
- because: the engineering must not be weakened to remove the duplication (S-16) — the pin assignment is the one fact a student cannot recover from the photograph, and right now it lives only on a slide and in a later Part's caption.

**4 — [MAJOR] `source/ch-photosensors.ptx:684-698` — the review slide describes a setup Part 2 took apart**

- draft (`sl-day16-servo-review`, and the paragraph at 685): "Recall the servo test setup from Day 15: the potentiometer, the ADC and the PWM pulse control the servo…"
- hers: *"Recall the servo test setup from Day 15: the potentiometer, the ADC and the PWM pulse controlled the servo, with the code from `Day15_servo_template.c` that you completed. The servo is still powered as shown, and the potentiometer came off the breadboard at the start of Part 1 of Lab 8."*
- because: Part 2's first instruction is "The potentiometer comes off the breadboard first", so by Part 3 the present tense is false on every table. Her Day 15 close promised exactly this order — *"On Thursday we'll remove the potentiometer from the setup, add two photocells to the servo's arm, and start on the solar tracker"* (day15.json, closing recap, her edit) — so the removal is right and the tense is what is wrong. See also "Already written" below: her own slide 13 puts the removal after the servo check, which is a question for her.

**5 — [MAJOR] `assets/decks/day16.json:16` — "Where we are" leaves the "Today we'll …" form**

- draft: `"Today: the photocell in the divider, Part 1 of Lab 8, the photocells on the tracker arm, and the feedback loop that points the arm at the light."`
- hers: `"Today we'll put the photocell into a voltage divider, work through Part 1 of Lab 8, add the photocells to the tracker arm of your servo, and discuss how the feedback loop can be implemented."`
- because: her own section introduction (line 406) is that sentence, and every deck she has passed since Day 9 uses the verb form — day15: *"Today we'll design the timer that creates that pulse, check the pulse on the AD2 oscilloscope, and then wire the servo."*; day13, day12, day11, day10 the same. The specimen for the colon form is *"Today: the two wires. Thursday: the chip at the end of them."* → **"We'll talk about the I2C protocol today and will examine how to talk to the backpack chip tomorrow."**

**6 — [MINOR] `assets/decks/day16.json:80` — an epigram where a name belongs (S-18)**

- draft: `"title": "Two cells are never quite the same"`
- hers: `"title": "Each photocell is a bit different"`
- because: that is the slide's own first bullet and her old speaker note (Day16 deck, slide 4): *"Each photocell is a bit different, even if they are 'the same'."* The draft's version is also a shade stronger than the book, which says "a bit different", not "never quite the same".

**7 — [MINOR] `source/ch-photosensors.ptx:706` — `sl-day16-cup` drops the reason the cup exists**

- draft (caption): "Remove your photocells from the breadboard and insert them into the shielding cups on the motor arm, like so."
- hers: *"Remove your photocells from the breadboard and insert them into the shielding cups on the motor arm, like so. The cup shades its cell from light arriving from the other side of the arm."*
- because: her register is explanatory, not terse — the Day 10 pass added whole paragraphs to two captions. The shading is the entire physical basis of the tracker and the room never sees it otherwise; the book caption (700-702) already has the sentence.

**8 — [MINOR] `source/ch-photosensors.ptx:488` — a dangling "This" on `sl-day16-nonlinear`**

- draft: "This is not a problem if the photocell is used as a light-or-dark sensor…"
- hers: "The nonlinearity is not a problem if the photocell is used as a light-or-dark sensor…"
- because: the book paragraph (459) says exactly that; on the slide the nearest antecedent is the log-log plot bullet, so "this" reads as the plot.

**9 — [MINOR] `source/ch-photosensors.ptx:526-527, 532` — a class action narrated impersonally**

- draft: "The potentiometer comes off the breadboard first, with nothing powered: its channel, A0 (PA0), is where the first photocell's divider goes."
- hers: "First, with nothing powered, take the potentiometer off the breadboard: its channel, A0 (PA0), is where the first photocell's divider goes."
- because: *"In the first twelve minutes we wire a display…"* → **"We'll start by wiring the display…"**. This is also the only instruction in the day that removes the pot, and it currently reads as description rather than as something to do.

**10 — [MINOR] `source/ch-photosensors.ptx:426, 487` — ASCII where the book has math**

- draft: `<li>The photocell is the sensor R_sens in the divider, with the fixed resistor R_M and the node voltage V_M.</li>` and `R ∝ E^(−S)`
- hers: use `<m>R_\text{sens}</m>`, `<m>R_M</m>`, `<m>V_M</m>`, `<m>R \propto E^{-S}</m>`, as the paragraphs they condense do and as `sl-day11-motor-relations` does on a slide.
- because: the pair has to sound (and look) like one writer. Leave `sl-day16-loglog-relation` alone — that plain-text form is hers, from her slide 5.

**11 — [MINOR] `assets/decks/day16.json:50` — a subscript the room reads aloud**

- draft: `"As the light gets brighter, does V_M increase or decrease?"`
- hers: `"As the light gets brighter, does the divider's voltage increase or decrease?"`
- because: glue titles are plain text, so "V_M" projects with the underscore. (The headline extending the activity's title is fine and established — day12's *"Poll or interrupt"* → *"Poll or interrupt: write down your answer"*.)

**12 — [MINOR] `assets/decks/day16.json:225` — a title whose only content is a count**

- draft: `"title": "The three answers"`
- hers: `"title": "Answers: the sign, the integer step, and K and T"`
- because: the corpus convention she has passed is *"Answers: the sign, quadrature, and resolution"*, *"Answer: the three rates, the window, and volatile"*.

**13 — [MINOR] `assets/decks/day16.json:261-262` — the tuning log twice in two bullets**

- draft: `"Lab 8: the tracker loop, tuned and demonstrated (Deliverable 9), and the seven-segment display showing the servo's angle (Deliverable 10)."` / `"Keep a log of your tuning of K and T."`
- hers: keep the first, and DELETE the second — its content ("with a log of your tuning of K and T") is already inside it, and inside `sl-day16-start` one entry earlier. What is lost: nothing.

**14 — [MINOR] `assets/decks/day16.json:15` — the recap under-reports the reading**

- draft: "The reading introduced the photocell, a resistor whose resistance falls as more light falls on it, the voltage divider that turns that resistance into a voltage for the ADC, and the photocell's datasheet."
- hers: "The reading introduced the photocell, a resistor whose resistance falls as more light falls on it, the family of sensors that work the same way, the voltage divider that turns a resistance into a voltage for the ADC, the photocell's datasheet, and what a solar tracker is."
- because: her chapter introduction (line 20) lists five things; she deleted the in-class "One Circuit for a Family of Sensors" Part precisely *because* it is the reading, so the recap is the one place the family is now acknowledged in class.

**15 — [MINOR] `source/ch-photosensors.ptx:571-572` — "as drawn above" points at nothing on the wall**

- draft: "Recall that the equation for the voltage divider as drawn above is …"
- hers: "Recall that the equation for the voltage divider in Lab 8's Figure 1 is …"
- because: in the handout "above" is Figure 1; projected, `act-day16-study` is a separate deck entry from `sl-day16-lab-fig1`.

**16 — [MINOR] `source/ch-photosensors.ptx:411-412` and `935-936` — the same sentence twice**

- draft, section introduction and Part 5 opening, identical: "The rest of the class is time to start on the loop, which is your lab work."
- hers: keep it in the introduction; open Part 5 with what happens now — *"Now we'll start on the loop, which is your lab work in Lab 8."*
- because: a verbatim second telling is the one she cuts; the idea belongs in both places, the wording in one.

**17 — [MINOR] `source/ch-photosensors.ptx:416` and `681` vs `assets/decks/day16.json:87, 146` — stale internal budgets**

- draft (book comment 416): `Part 2: 38 min = 3 (the servo check) + 35 …` — the servo check activity was deleted in her pass 2 and no longer exists.
- draft (book comment 681): `Part 3: 14 min` vs the deck's `≈ 17 min` and the agenda's arithmetic (`10 + 38 + 17 + 20 + 15`).
- hers: `Part 2: 38 min, all work time (Part 1 of Lab 8; checkpoints about minute 39 and 53)` and `Part 3: 17 min = 1 review + 2 (cups, clips) + ~10 assembly + checkpoint about minute 72`.
- because: instructor-only, so it costs nobody in the room, but the two files now disagree about the shape of the hour.

---

### Sweeps

- **Unit openings checked: 8 — failing: none.**
  chapter intro ("The goal of this chapter is to build a solar tracker…"); `sec-photo-before-class` ("In the ADC chapter we measured a voltage from a potentiometer…"); `sec-photo-day16` ("Today we'll put the photocell from the reading into a voltage divider…"); Part 1 ("The photocell is the sensor R_sens in the divider…"); Part 2 ("We'll now give you some time to work through Part 1 of Lab 8."); Part 3 ("Recall the servo test setup from Day 15…"); Part 4 ("There are two feedback loops in the tracker…"); Part 5 ("The rest of the class is time to start on the loop…"). None opens on what is absent; all but Part 1 are hers verbatim from today's passes.
- **Slide titles: 34 read (26 `ref` headlines, 5 section titles, 3 glue titles) — epigrams rather than names: 1** — *"Two cells are never quite the same"* (finding 6). One count-as-content title, *"The three answers"* (finding 12). `"Reveal: V_M rises"` is the established convention (day15: *"Reveal: the servo resists"*) and is fine.
- **Weekday or course-period as grammatical actor: 0 in student-facing text (S-20).** "Recall the servo test setup from Day 15", "your servo program from Day 15 already applies a limit" — both adverbial or a program as subject. Two in `<instructor>` blocks only ("Part 4's discussion uses both", "Part 4 can open with the tables…"), which are not projected to students; not flagged.
- **"N, and it is the one that…" armature: 0 (S-21).** "There are two feedback loops in the tracker (fig, fig). The first loop is inside the servo…" puts the content in the next clause; "Three questions to settle in the discussion:" is a list lead-in, the form she uses herself ("Many sensors are based on a variable resistance:").
- **"we" in class-work sentences: 5 of 9.** The four that are not: the intro's and Part 5's identical "The rest of the class is time to start on the loop" (hers — left alone except for the duplication, finding 16), "The potentiometer comes off the breadboard first" (finding 9), and the deck's "Today: …" (finding 5).
- **Acronyms first-used without expansion: none.** Complete list checked: CdS (expanded in the reading, "after the cadmium sulfide it is made of"); LDR (expanded); ADC (expanded, chapter intro); PWM, AD2, SysTick (unexpanded on Day 16 slides — matching day15.json, which she edited by hand, where "PWM" and "the AD2 oscilloscope" stand bare on Day 15's own recap); PDV-P8001, CCR1 ("TIM14's compare register"), A0 (PA0) / A1 (PA1) / D11 (PA7) — every board label carries both names.
- **Design scaffolding in student-facing text: none.** Every minute count and every internal "Part N" is inside `<note>`, `presenterNote` or an `<instructor>` block. "Part 1 of Lab 8" is Lab 8's own part and is her slide 8's title. No "the reading" used as scaffolding — the two occurrences are her own construction from the chapter introduction.

---

### Already written — reuse instead of invent

- **The bridge from Part 1 into Part 2** — she already wrote it: Day16 deck, slide 7, second line — *"Part 1 of the lab will guide you deeper into the data sheet."* The draft ends Part 1 on `sl-day16-compare` and starts Part 2 cold. Add her sentence as the last line of the Part 1 close or the lead of `sl-day16-lab-time`.
- **`act-day16-arm` / `task-day16-recreate`, "Connect the pins of the alligator clips"** — she already wrote it: Day16 deck, slide 13 — *"Connect the leads of the alligator clips to your breadboard to recreate the photocell circuit from earlier in the lab."* Use **leads**, not "pins"; the rest of the chapter calls them leads throughout (`fig-day16-clips`, "the leads of the photosensors").
- **The pot removal** — she already wrote it: Day16 deck, slide 13 — *"After you've confirmed that your servo (still) works properly with the pot in Part 2 of the lab handout, you can remove the pot."* The draft removes it at the top of Part 2 instead, because A0 is needed for the first divider. See "For Petra".
- **The servo lead colours** — her deck, slide 10: *"Brown ➝ GND, Orange ➝ power, Yellow ➝ PWM."* This contradicts the book, which says the signal lead is orange (`ch-servos.ptx:1363`: "the signal lead is called orange and photographs yellow"). The book is right and the old slide is the loose one — recording it here so nobody "reuses" it later.
- Where the draft is better than the deck: `sl-day16-loglog-relation` keeps her plain-text log-log relation *and* the book adds the words ("when the illumination increases by a factor of 10, the resistance decreases by a factor of about 4"), which her slide 5 never said. Keep the draft's.

---

### For Petra, not for me

1. **When does the potentiometer come off?** Her Day 16 slide 13 says after the servo has been re-confirmed with the pot (Lab 8 Part 2); the draft takes it off at the start of Part 1 of Lab 8, because the first divider needs A0 (PA0). Both cannot be true in one hour. If the pot stays until after assembly, the first divider needs a channel other than A0 for the study.
2. **The datasheet link on a projected activity** (`task-day16-d1`, `source/ch-photosensors.ptx:550`). Her stated rule is about links *to the book*; this one leaves the deck the same way. Strip it from the projected task and leave it in the reading, or keep it because students open the datasheet at that moment?
3. **A "what you need today" line in the opening recap.** day15.json has one — *"What you need today: Nucleo and breadboard, AD2, potentiometer, servo, the regulator board and its adapter, and your multimeter."* Day 16 needs the multimeter, a flashlight, the AD2, the tracker arm and the alligator clips, and no deck other than Day 15 carries such a line, so I have not written one.
4. **The close does not say what the next class is.** Her Day 15 close named the x-hour and Thursday. Day 17 (BLE) is still rough, so I have not invented a forward line.

---

# checker-figure-claims

## Verdict: BLOCKER

One slide title/bullet pair makes a numeric claim the picture measurably contradicts. Five further MAJORs (one activity slide points at a figure that is not on it; two captions point at things the image does not show or cannot show at size; one notation collision; one legibility failure on the figure the next activity is derived from).

---

### Figures opened

Rendered in the live player at 1600×900 (`http://localhost:8352/external/class.html?deck=day16#N`, headless Chrome), plus source-resolution crops of every raster. PNGs in `/private/tmp/claude-503/-Users-dz00762-repos-ENGS28/571c8e26-02d9-41b6-bfe6-c7c6a3489f23/scratchpad/shots/` and `/figs/`.

- **`fig-photocell-divider`** (`/Users/dz00762/repos/ENGS28/assets/images/Day16-Photosensors/fig-photocell-divider.svg`, slide 5) — rasterized with headless Chrome (PyMuPDF drops every stroked path in this file and renders only the text; do not judge this SVG from a PyMuPDF render) and seen in the player. A vertical divider: V_cc bar at top, a variable resistor with a diagonal arrow through it labelled *R_sens / the sensor*, a node dot with an arrow right to *to an ADC pin*, a plain resistor labelled *R_M / the fixed resistor*, a ground symbol with *GND*. To the right of the node, V_M = V_cc · R_M/(R_sens + R_M) as a two-line fraction. `width`/`height` present and equal to the viewBox (B‑11a clean).
- **`fig-photocell-loglog`** (`slide04_0c98f286.png`, 500×351, slides 8 and 9) — a scanned log-log chart titled *Resistance vs. Illumination*, y-axis *RESISTANCE – ohms* labelled 100, 1k, 10k, 100k, 1 Meg, 10 Meg; x-axis *Illumination (lux)* labelled 0.1, 1, 10, 100, 1000. About nine near-parallel descending straight lines, solid in the middle and dashed at both ends; one is drawn in red.
- **`fig-day16-lab-fig1`** (`lab8-fig1-divider.png`, 502×568, slide 13) — Lab 8's Figure 1: V_cc, a photocell drawn as a resistor inside a circle with two incoming light arrows, labelled **R₁**; a node with an open terminal circle labelled **V₁**; a plain resistor **R₂**; a triangle ground. The relabel to V₁ is in the file.
- **`fig-day16-lab-fig2`** (`slide09_a9c74b15.png`, 981×1426, slide 15) — portrait Fritzing. Nucleo above, half-breadboard below. Red from **3V3** and black from **GND** to the two top rails. Two identical dividers: a short red jumper from the **+** rail to a column, photocell across to a second column, a 4-band resistor from that second column up to the **−** rail, and a blue (col ~6) and a green (col ~15) wire from the node columns up to the fifth and sixth analog pins (A1 and A0 — those two silkscreen labels are covered by the wires themselves).
- **`fig-servo-powering`** (`/Users/dz00762/repos/ENGS28/assets/images/Day15-Servos/towerProPowering.png`, 1626×1334, slide 20 by refPage) — Fritzing: Nucleo, breadboard, a servo at lower left, the regulator board with barrel jack at lower right, and a grey annotation box reading **Brown → GND / Red (middle wire) → power / Orange (yellowish) → PWM**. No potentiometer anywhere in the drawing.
- **`fig-day16-cup`** (`slide11_324c26cf.png`, slide 21) — photo: one photocell seated in a round shielding cup at the right end of a black printed arm, a red arrow pointing up at it and the word *Photocell*. Blue servo at lower left. One cell, one cup.
- **`fig-day16-clips`** (`slide12_a6a60c41.png`, slide 22) — photo: the arm upright on its stand with four alligator clips (blue, yellow, white, green) on the four photocell leads, their other ends terminating in male breadboard pins.
- **`fig-day16-full-setup`** (`week8FullLabSetup.png`, 2236×1874, slide 24) — Fritzing: Nucleo, full breadboard, servo at left, regulator board plugged in at right. Two photocell dividers **drawn on the breadboard**; blue and purple to A1/A0; the servo's yellow lead lands on the pin silkscreened **PWM/MOSI/D11** (verified at source resolution, green connection dot present); a green wire from the servo's red lead to the regulator's **5V** column; black from its brown lead to the GND column and the rail. Every electrical claim in the book caption checks out.
- **`fig-tracker-loop-servo`** (`/Users/dz00762/repos/ENGS28/assets/images/Day15-Servos/slide08_095020b6.png`, slide 27) — block diagram: *command position* → summing circle with + and − → *error* → CONTROLLER → MOTOR → GEARS → *position output*, with POTENTIOMETER in the return path. Nothing cropped.
- **`fig-tracker-loop-around`** (`lab8-fig6-tracker-loop.png`, slide 28) — Lab 8's Figure 6: SENSORS (two circles labelled **V₀** and **V₁**) → two ADC funnels → CONTROLLER → PWM → SERVO → *Angle, θ*, with the outer return line back to the sensors. Nothing cropped.

---

### Correspondence failures

**1. [BLOCKER] `sl-day16-loglog-relation` (slide 9, "The log-log relationship from the datasheet") — the plot does not have the slope the slide asserts, and is not the datasheet's plot.**

Text says: title *"The log-log relationship from the datasheet"*; bullet *"The slope of the line comes from the datasheet, whose Sensitivity row gives S = 0.6"*; *"when the illumination increases by a factor of 10, the resistance decreases by a factor of 10^0.6, which is about 4."*

Image shows: the Adafruit generic family. Calibrating on the decade gridlines (96.2 px/decade in x, 46.0 px/decade in y) and least-squares fitting the red pixels (`y = 0.4188x + 89.8`), the highlighted red curve has slope **S ≈ 0.88** — it passes ~100 kΩ at 1 lux and ~2 kΩ at 100 lux, a factor of **50 over two decades, i.e. about 7 per decade, not 4**. Sampling the black curves at x = 200 and x = 330 gives 0.83–0.89 for every one of them. No line in this figure has slope 0.6, and at 100 lux the S = 0.6 model (6.3 kΩ from 100 kΩ) sits half a decade above the drawn red line. The slide also carries no attribution, so on its own it reads as the PDV‑P8001 datasheet's own plot, which the book's caption is at pains to deny (*"This is the guide's generic family, not the PDV‑P8001's own curve"*).

Fix: **re-caption and re-title.** Slide 9 must say on its own face what slide 8 says — that the plot is the Adafruit guide's generic family — and must stop pointing at "the line" in it: the S = 0.6 is the PDV‑P8001's Sensitivity row, an arithmetic relation, not the slope of anything visible here. Either drop the `ref` from slide 9 and let it be a text slide, or re-word to "the datasheet's Sensitivity row gives S = 0.6 for our part; the guide's generic curves above are steeper." Same repair needed in the book, `/Users/dz00762/repos/ENGS28/source/ch-photosensors.ptx` around line 472: *"In the plot below the slope of the line comes from the datasheet"* directly contradicts the caption 15 lines later.

**2. [MAJOR] `act-day16-direction` (slide 6) — "the formula in the figure", with no figure on the slide.**

Text says: *"Explain your answer from the formula in the figure."* Image shows: nothing. The slide is title + one paragraph and 700 px of white space; the divider is on slide 5. The `<xref>` flattens to the bare word "figure" in the deck.

Fix: **add `ref="fig-photocell-divider"` to the activity slide.** The figure gives the formula but not the direction, so P‑15 is satisfied — showing it is exactly right, and the empty right half of slide 6 is where it goes. Source: `source/ch-photosensors.ptx`, the `<activity xml:id="act-day16-direction">` block.

**3. [MAJOR] `sl-day16-servo-review` (slide 20) — "the servo powered as shown" points at text that does not project.**

Text says: *"…and the servo powered as shown."* Image shows: the powering, entirely in a grey annotation box whose type measures **8 px on a 900 px stage, 0.89 %** (source cap height ~15.5 px scaled by 697/1626 = 0.43). Below 1 % is absent, not small. Neither bullet restates the three connections, and Day 15's own slide of this figure (`sl-day15-powering`, deck slide 55) does exactly that in its caption — image-dominant, with "Red to the row of the regulator board's 5V pin… Brown to the ground rail… Orange to D11 (PA7)" in words. Day 16 shrank the picture into a two-column and dropped the words.

Fix: **make slide 20 caption-only (image-dominant) and put the three connections in the caption**, mirroring `sl-day15-powering`. A second, smaller point on the same slide: the bullet opens *"Recall the servo test setup from Day 15: the potentiometer, the ADC and the PWM pulse…"* and there is no potentiometer in this drawing; say that the drawing shows the powering only.

**4. [MAJOR] `sl-day16-full-setup` (slide 24) — the caption says the photocells are in the cups; the drawing puts them on the breadboard.**

Text says: *"The two photocells are physically located in the cups of your tracker arm, reached through the alligator clips."* Image shows: two photocells drawn in the breadboard, rows F–G, columns 3–6 and 9–12. The book caption reconciles this in its second clause — *"are drawn on the breadboard, but they are physically in the cups"* — and that clause was dropped from the slide caption. Seen alone, the caption and the picture disagree.

Fix: **restore the clause** to the slide caption: "The two photocells are drawn on the breadboard here, but they are physically in the cups of your tracker arm, reached through the alligator clips."

---

### Notation mismatches

**5. [MAJOR] `sl-day16-loop-around` (slide 28) → `act-day16-design` (slide 29) — V₁ means two different things two slides apart, and the deck never bridges them.**

Slide 13's caption: *"V1 the node"* (the single divider's node). Slide 28's figure prints **V₀** and **V₁** on the two sensor circles, and neither bullet nor the book caption for `fig-tracker-loop-around` ever names them. Slide 29 then opens *"In Lab 8's notation the error is e = V₁ − V₀"* with no figure and no definition on the slide. The collision is Lab 8's own (its Figure 1 uses V₁ for the single node; its Figure 6 uses V₁ and V₀ for the two sensors) and the figures cannot be changed — so the text has to name both forms.

Change: **the text.** Slide 28's bullet should say the two sensors' node voltages are what Lab 8's Figure 6 calls V₀ and V₁, one divider each, on A0 and A1 — and the book caption for `fig-tracker-loop-around` (`source/ch-photosensors.ptx` ~line 804) should do the same.

**6. [MINOR] `fig-day16-full-setup` book caption — "its orange signal lead" over a wire drawn yellow.** The Fritzing draws the servo's signal lead yellow. Day 15's caption for the shared powering figure handles this correctly — *"The signal lead, orange on the servo and drawn yellow here"* — and Day 16's caption should mirror it. (The slide caption does not mention the lead, so this is book-only.)

**7. [MINOR] `sl-day16-lab-fig1` (slide 13) — figure prints R₁, R₂, V₁ as typographic subscripts; caption writes R1, R2, V1 flat.** Normal deck plain-text convention and the caption states the mapping, so no action needed — recorded so it is not re-raised.

---

### Legibility

Measured against `AUTHORING-visual.md` Rule 2 (load-bearing figure text ≥ 2 % of slide height = 18 px at 900).

- **`fig-photocell-divider` on slide 5 — smallest load-bearing type: the subscripts in R_sens / R_M / V_M, 10.5 px = 1.17 %.** Main symbols 17 px (1.9 %), the grey annotations 13 px (1.44 %). **Fails.** Telling R_sens from R_M in the denominator *is* what `act-day16-direction` asks students to do, and the subscript is the only thing that distinguishes them. The fix is a bigger figure, not smaller text, two ways that compound: (a) make slide 5 caption-only image-dominant — its single bullet is one sentence and belongs in a caption — which frees the full stage height and gets ~1.5×; (b) the SVG wastes its box: content occupies (111, 35)–(690, 500) of a 760×540 viewBox, 24 % dead width. Trimming the viewBox (and the matching `width`/`height`) to roughly `100 25 610 490` buys another ~1.16× everywhere the figure is width-limited, book included.
- **`fig-photocell-loglog` on slides 8 and 9 — smallest type: the y-axis tick labels and *RESISTANCE – ohms*, 9 px in source × 1.34 render scale = 12 px = 1.34 %.** x-axis decade labels ~1.6 %. **Fails**, and it matters here because slide 8's own bullet instructs students to read *"1k to 10k or 10 lux to 100 lux"* off those axes. Bigger figure — but note the ceiling: the source is only 500 × 351, already upscaled 1.34× and visibly soft, so beyond re-laying-out the slide this wants **a higher-resolution export of her slide 4 from Petra** rather than more upscaling.
- **`fig-servo-powering` on slide 20 — annotation box at 0.89 %.** See finding 3.
- **`fig-day16-full-setup` on slide 24 — the whole Fritzing renders at 0.32× (714 px wide, height-limited by the caption-only layout at a 1.19 aspect).** This is the known sub-1 % pin-label item and I am not re-reporting it as new, but two consequences are worth stating: the caption's own claim, "the regulator board's 5V pin", rests on a 5V silkscreen that is unreadable at this size; and if this ever gets addressed, this single image genuinely wants to be **two graded exports from Petra** (Nucleo-plus-dividers, and servo-plus-regulator), not one re-crop.
- **`fig-day16-lab-fig2` on slide 15 — known sub-1 % pin labels.** One aggravating detail for the record: the A1 and A0 silkscreen labels are additionally **covered by the blue and green wires** in the source image, so no amount of enlargement recovers them; the bullet's "one node goes to A0 (PA0) and the other to A1 (PA1)" cannot be checked against the picture at any size.
- **`fig-day16-lab-fig1` (13), `fig-day16-cup` (21), `fig-day16-clips` (22), `fig-tracker-loop-servo` (27), `fig-tracker-loop-around` (28) — pass.** All type well above 2 %; 27 and 28 in particular are large and clean.

Two rendering defects found only by looking, both on text rather than figures, both on slides that carry figure-derived work:

- **[MINOR] slide 14** — `R_\text{illuminated}` renders as **"R_illumi" + "nated" on the baseline** (twice, in Deliverable 4). And the lab's phrase *"the voltage divider as drawn above"* has nothing above it: the drawing is on slide 13. Name the figure or repeat it.
- **[MINOR] slide 8** — `∝` falls back to a tiny superscript-height glyph; the line reads as "R ᵅ E^(−S)" and from the back of the room will read as "R E^(−S)". Set it in words or as `R = C · E^(−S)`.

---

### Look before shipping (crop candidates, not defects)

I did render all of these in the player at 1600×900; none is cropped (deepest content bottom is y = 800). Listed anyway with bullet counts, since the fit check owns them:

- **slide 5** — 1 bullet + `fig-photocell-divider` — figure sits in the right column, badly under-scaled rather than cropped.
- **slide 8** — 3 long bullets + `fig-photocell-loglog` — two-column, tightest of the set; bullets run to y = 742.
- **slide 9** — 2 bullets + `fig-photocell-loglog`.
- **slide 15** — 2 bullets + a **portrait** 981×1426 figure — the aspect furthest from the stage's; the deck note already flags "portrait, so two-column".
- **slide 20** — 2 bullets + `fig-servo-powering`.
- **slide 27** — `stack="yes"`, **1 bullet** + the servo block diagram — renders complete, bottom at y = 704.
- **slide 28** — `stack="yes"`, **2 bullets** + Lab 8 Figure 6 — renders complete, bottom at y = 748. Adding a third bullet here (see finding 5) is the one change that could push it; re-render after.

---

### Shared figures — re-render both chapters after any change

- **`assets/images/Day15-Servos/slide08_095020b6.png`** is `<image>`d twice: `source/ch-servos.ptx:110` and `source/ch-photosensors.ptx:795` (`fig-tracker-loop-servo`). Different `xml:id`s, one file — a re-crop for Day 16 silently changes Day 15's figure.
- **`assets/images/Day15-Servos/towerProPowering.png`** is `fig-servo-powering` in `source/ch-servos.ptx:1356`; Day 16 slide 20 reaches it by `refPage`. Any change for finding 3 must be to the *slide layout*, not the image, or Day 15 slide 55 changes with it.

Linters are clean on this chapter: `check_rules.py` 0/0 (so B‑11a passes — the divider SVG does carry `width` and `height`), `check_deck.py` reports only the S‑8 Part 4 budget (21 vs 20 min, not mine), `image_ratios.py --check` current. No `<figure>` in this section holds more than one `<image>`.

---

# committee-synthesizer — the ruled list

# Day 16 Gate 3 — consolidated ruling

## Verdict

Not ready for Petra yet, but close: seven reviewers found one genuine correctness defect and about a dozen seam faults, and every one of them is executable text. **The single biggest problem is `sl-day16-loglog-relation` and the paragraph behind it** (`source/ch-photosensors.ptx:462`): the slide and the book both attribute S = 0.6 to *the plotted line*, and the plotted Adafruit curves have slope ≈ 0.85. Everything else is one of three clusters — five `<xref>`s and three "as in the figure" pointers inside blocks the deck projects; three activities restating the slide in front of them; and a clock whose Part rows do not equal their beats. The `\sqrt` BLOCKER is already closed in the player. The two Fritzings and the 500 px log-log plot are asset requests, stated once at the bottom, not layout work.

Counted against B-18: this list **deletes** one task, one activity introduction clause and four slide bullets, **moves** two sentences into captions, **rewrites** eighteen strings in place, and **adds** one bullet (item 12), which names its displacement. No new student-facing slide.

---

## Must fix (blocks sign-off)

**1. [figure-claims BLOCKER / P-11, S-30] `source/ch-photosensors.ptx:462-464` and `sl-day16-loglog-relation` (:492-498, deck entry 9) — the slide asserts a slope the picture measurably does not have.**
The plotted curves (Adafruit generic family, red curve fitted) have slope ≈ 0.85–0.88, passing ~100 kΩ at 1 lux and ~2 kΩ at 100 lux. S = 0.6 is the PDV-P8001's *Sensitivity* row, an arithmetic relation, not the slope of anything drawn. Petra's own pass-1 sentence ("In the plot below the slope of the line comes from the datasheet") must keep its intent — the 0.6 is the datasheet's — without claiming the plot shows it.

Book, replace :462-464 ("In the plot below the slope of the line comes from the datasheet, whose *Sensitivity* row gives S = 0.6, so the approximate relationship is") with:

> The PDV-P8001 datasheet's <em>Sensitivity</em> row gives <m>S = 0.6</m> for our part, so its approximate relationship is

and after the "which is about 4" sentence at :473 add: "The curves in <xref ref="fig-photocell-loglog"/> are the Adafruit guide's generic family, and they are steeper than that."

Slide, replace both `<li>`s with her slide 5's shape — lead line, equation alone on its own line as plain text, legend line, closing line:
```xml
<p>The PDV-P8001 datasheet's Sensitivity row gives S = 0.6 for our part, so the approximate relationship is:</p>
<p>log10(R100) − log10(R10) = −0.6 [log10(E100) − log10(E10)]</p>
<p>R100 and R10 are the cell's resistances at 100 lux and at 10 lux; E100 and E10 are those two illuminances; lux = lumens per square meter.</p>
<p>In words: when the illumination increases by a factor of 10, the resistance decreases by a factor of 10^0.6, which is about 4. A relationship of this form, R = C·E^(−S), plots as a straight line on log-log axes.</p>
<p>The plot is the Adafruit guide's generic family, not the PDV-P8001's own curve; its curves are steeper.</p>
```
Deck title (`day16.json:73`) → `"The log-log relationship from the PDV-P8001 datasheet"`.
**DISPLACES:** the two 240-character bullets; the power-law form and the `∝` glyph move off `sl-day16-nonlinear` (item 2), and "lux" is defined here rather than added anywhere else.
*Raised by:* checker-figure-claims (BLOCKER), checker-arc-fidelity (1, 2), expert-cognitive-load (4, 5), learner-in-the-room (8).

**Decision, and why:** her slide 5's shape wins over cognitive-load's "lead with the words" — a `<slide>` may not carry built-up math, so her plain-text equation on its own `<p>` line *is* the S-6-compliant form, and AUTHORING-visual Rule 3 says use the layout she already solved. The verbal line stays, at the end, where she put it.

**2. [P-7, S-6] `sl-day16-nonlinear` (:484-491) — four elements on a two-minute slide, one of them an illegible glyph.**
`∝` falls back to a superscript-height glyph and reads as "R E^(−S)" from the back. Delete the power-law clause from bullet 2 (it now lives on slide 9), so bullet 2 ends at "…is a factor of ten." Bullet 3, first word: "This" → "The nonlinearity" (nearest antecedent is the plot).
**DISPLACES:** nothing — this is a cut of two clauses.
*Raised by:* expert-cognitive-load (4), checker-figure-claims (slide 8 rendering), checker-voice (8, 10).

**3. [AUTHORING-slides §refs; Petra, Day 12] Five `<xref>`s inside blocks the deck projects — remove all five.** Never link into the book from the wall.
- `:435` `act-day16-direction` → "Explain your answer from the divider's formula." (the figure is `sl-day16-divider-recall`, the entry immediately before, which stays immediately before it)
- `:603` `act-day16-two-channel` `<introduction>` → "Wire the two photosensors and 10 kΩ resistors on your breadboard as shown in Lab 8's Figure 2." (the lab's own figure, in their hand)
- `:724` `task-day16-cups` → drop ", as in fig-day16-cup" (task merges under item 4)
- `:731` `task-day16-clips` → task deleted (item 4)
- `:736` `task-day16-recreate` → "Connect the **leads** of the alligator clips to your breadboard to recreate the photocell circuit from earlier in the lab. Then power up in the usual order and run your two-channel program again: both channels print, now from the arm." ("pins" → "leads" is hers and the lab's, Appendix A)

The `<url>` in `task-day16-d1` (`:550`) **stays** — it is the lab's own pointer and it leaves the deck rather than the book. Add the part number in the same task: "Using the [PDV-P8001 datasheet](…), record…" (P-11).
**DISPLACES:** the book keeps every pointer — `fig-photocell-divider`, `fig-day16-cup` and `fig-day16-full-setup` are each already `<xref>`d or immediately adjacent in the paragraph outside the activity.
*Raised by:* checker-voice (1), learner-in-the-room (3), learner-visual (BLOCKER), checker-figure-claims (2), expert-cognitive-load (2).

**4. [B-8, B-16] `act-day16-arm` (:719-740) — tasks (a) and (b) restate the two captions projected one and two slides earlier. Delete `task-day16-clips`; merge its content into `task-day16-cups`.**
```xml
<task xml:id="task-day16-cups">
    <statement><p>With nothing powered, remove your photocells from the breadboard,
    put one into each of the two shielding cups on the motor arm, and bring each lead
    to the breadboard with an alligator-to-breadboard clip, one clip per lead.  If your
    photocells are already in the cups, they are already wired through their clips; go
    on to the last step.</p></statement>
</task>
```
**DISPLACES:** one whole `<task>` deleted; "one clip per lead" is carried, and the deck headline "Solar tracker assembly, last step" becomes true to her slide 13.
*Raised by:* checker-voice (2), expert-cognitive-load (3), learner-in-the-room (4).

**Decision, and why:** voice's delete over in-the-room's "move the clauses up into slides 21/22's captions". B-18's order is delete → move → rewrite → add, and moving them into captions would recreate the same duplication in the other direction. Her slide 11 and 12 captions are already hers, verbatim; leave them alone (except item 14).

**5. [S-16, B-8, arc] `sl-day16-lab-fig2` (:592-598) — make it caption-only; put the pin assignment in the book caption where students meet Figure 2.**
Right now the room's only statement of which node is A0 and which is A1 is a slide bullet with no paragraph behind it, forty minutes before its figure, and bullet 1 repeats the activity's introduction word for word.
- `fig-day16-lab-fig2` caption (:588-589) → "Lab 8's Figure 2, the two photocell dividers on the breadboard. The Nucleo's 3.3 V and GND feed the two rails. Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail; one node goes to A0 (PA0) and the other to A1 (PA1)."
- slide → drop both `<li>`, add `<caption>Each divider is a photocell from the 3.3 V rail to a node row and a 10 kΩ resistor from that row to the ground rail. One node goes to A0 (PA0) and the other to A1 (PA1).</caption>`
- `fig-day16-full-setup` caption (:744-747) → delete the now-duplicated sentence "Each divider is a photocell from the 3.3 V rail … A1 (PA1)."
**DISPLACES:** two slide bullets deleted; the sentence is moved one Part earlier, not added.
*Raised by:* checker-voice (3), checker-arc-fidelity (3), expert-cognitive-load (2), learner-in-the-room (3).

**Decision, and why:** caption-only over cognitive-load's "keep bullet 1". The engineering must not be weakened to remove duplication (S-16), and the pin assignment is the one fact a student cannot recover from the photograph — so it moves into the book, not out of the deck. Portrait 981×1426, so the slide stays two-column.

**6. [figure-claims 3, arc 4, voice 4 + settled ruling] `sl-day16-servo-review` (:692-698, deck 20) — present tense for a setup Part 2 dismantled, and a powering annotation that projects at 0.89 % (absent, not small).**
Book paragraph :684-691, first sentence →
> Recall the servo test setup from Day 15: the potentiometer, the ADC and the PWM pulse **controlled** the servo, with the code from `Day15_servo_template.c` that you completed, and the servo powered as in `fig-servo-powering`. The potentiometer came off the breadboard when you started Part 1 of Lab 8. Now we'll add the photocells to the tracker arm of your servo. The arm has a shielding cup at each end (`fig-day16-cup`).

Slide → **image-dominant, caption-only**, the three connections in words:
```xml
<slide xml:id="sl-day16-servo-review" ref="fig-servo-powering">
    <caption>On Day 15 the potentiometer, the ADC and the PWM pulse controlled the servo,
    with the code from Day15_servo_template.c that you completed.  The powering has not
    changed: red to the regulator board's 5V row, brown to the ground rail, orange to
    D11 (PA7).  The drawing does not show the potentiometer, which came off the
    breadboard at the start of Part 1 of Lab 8.  Now we'll add the photocells to the
    tracker arm of your servo.</caption>
    <note>≈ 1 min.  Her slide 10; Day 15's powering drawing (refPage).</note>
</slide>
```
Deck title (`day16.json:152`) → `"Review: the servo test setup from Day 15"`.
**DISPLACES:** both bullets; the image is not re-cropped (it is shared with `ch-servos.ptx:1356`).
*Raised by:* checker-figure-claims (3), checker-arc-fidelity (4), checker-voice (4), learner-in-the-room (slide walk 20).

**Decision, and why:** image-dominant with the connections in the caption, over a two-column with bullets. `sl-day15-powering` (deck 55) already does exactly this with the same image; shrinking it into a two-column is what dropped the words in the first place. No servo check exists, per Petra's ruling today.

**7. [figure-claims 4] `sl-day16-full-setup` caption (:754) — the caption says the cells are in the cups; the drawing puts them on the breadboard.** Restore the reconciling clause the book caption has:
> The ultimate setup. The two photocells are **drawn on the breadboard here, but they are physically in** the cups of your tracker arm, reached through the alligator clips; the servo is powered from the regulator board's 5V pin.

**DISPLACES:** nothing — six words restored.
*Raised by:* checker-figure-claims (4), learner-visual (2, same figure — convergence: one asks whether the picture shows what the text claims, the other whether it teaches).

**8. [B-11c] `inst-day16-arm-checkpoint` (:764-769) — the block's premise is not true of the room.** Deliverable 8 asks for maximum and minimum voltages; the sweep-observation task was removed in Petra's pass 1. Replace the sentence beginning "Before Part 4, every table should have seen…" with:
> Deliverable 8 asks for the maximum and minimum voltages, so no table has been asked to observe which channel rises as the light moves toward which side. Part 4's discussion reasons the sign out instead, from which cell is on A1 and which way the arm turned on Day 15 as the knob raised the reading. Part 4 can open with the tables that are finished while the last tables finish their clips.

**DISPLACES:** an equal-length false claim.
*Raised by:* learner-in-the-room ("two things to put to Petra", 2); settled by Petra's ruling.

---

## Should fix

**9. [S-8] The clock — every Part row must equal its beats; one checkpoint has drifted two minutes off the timeline.** One item, seven edits:
- `day16.json:189` title → `"Checkpoint: about minute 70"`; `:191` presenterNote → `"The clip ladder; ≈ 3 min. What Part 4's discussion needs."`; `source:758` opening clause → "Checkpoint about minute 70."; `source:755` note → "…checkpoint about minute 70 is the instructor block."
- `source:534` note → `"≈ 1 min, then ≈ 37 min"` (Part 2 = 38)
- `day16.json:146` → `"≈ 17 min: 1 review, 1 cups, 1 clips, ≈ 11 assembly, 3 checkpoint."`; `:176` → `"≈ 11 min. Her slide 13."`; `source:717` note "≈ 10 min" → "≈ 11 min" (Part 3 = 1+1+1+11+3 = 17)
- `day16.json:197` → `"≈ 20 min: 3 for the two loops, 5 to read section 4, 11 to discuss the three questions, 1 for the bounds; the answers are the instructor block."`; `:219` → `"≈ 16 min: read section 4 (5), discuss the three questions (11). Her slide 15."`; `source:815` note → "…≈ 16 min: 5 to read, 11 to discuss." (Part 4 = 3+5+11+1 = 20)
- Two stale source comments: `:520-521` → `<!-- Part 2: 38 min = 1 (lab time, the pot comes off) + 37 (Part 1 of Lab 8, at the table; checkpoints about minute 39 and 53) -->`; `:681` → `<!-- Part 3: 17 min = 1 review + 1 cup + 1 clips + ~11 assembly + 3 checkpoint about minute 70 -->`; `:773` → `+ 11 (her slide 15's discussion) + 1 (the bounds)`.
- `day16.json:255` → `"≈ 1 min, then ≈ 14 min of work time. Leave up."`
**DISPLACES:** nothing; class total unchanged at 110 (B-18).
*Raised by:* expert-class-logistics (2, 4, 5), learner-in-the-room (5), checker-arc-fidelity (7), checker-voice (17); `check_deck.py` already prints the Part 4 row.

**10. [S-8] `day16.json` — move the `inst-day16-part2-checkpoint` entry (lines 134-141) to sit immediately after `act-day16-study` (line 110), before `sl-day16-lab-fig2`.** It carries both the minute-39 and minute-53 ladders, and at minute 39 the presenter currently has to page forward past two slides deliberately left projected to reach it. `inst-day16-two-channel` stays where it is.
**DISPLACES:** nothing — a reorder.
*Raised by:* expert-class-logistics (3).

**11. [B-8/B-16] The closing recap (`day16.json:258-264`) repeats slide 34 in the same order, fifteen minutes later, with nothing new.** Replace both items with the one fact the close alone can give:
```json
"items": [ "Lab 8 is next, and there is no other homework due." ]
```
Do not write a due date — the source records only "no homework is due beyond Lab 8 (Petra, 2026-09-03)" (B-11c). See question 4.
**DISPLACES:** two items deleted, one added; `sl-day16-start` keeps D9/D10 and the competing-light warning, and is the slide left up while they work.
*Raised by:* expert-cognitive-load (1, the repetition census), learner-in-the-room (2), checker-voice (13).

**12. [P-1, S-26, figure-claims 5] `sl-day16-loop-around` (:810-816) and `fig-tracker-loop-around`'s caption — V₀ and V₁ are printed in the figure, never named, and then `act-day16-design` opens on them.** V₁ also meant the single divider's node on slide 13, two Parts earlier. Add one bullet to the slide, after bullet 1:
> Lab 8's Figure 6 calls the two sensors' node voltages V_0 and V_1 — one divider each, on A0 and A1. The error is e = V_1 − V_0, and the controller updates the PWM value by K·e every T milliseconds, where T is the sampling interval.

Same sentence into the book paragraph at :788 (after "…which closes the loop.") and, shortened, into the caption at :804-807.
**DISPLACES:** `task-day16-sign` (:825) drops its now-duplicated lead "In Lab 8's notation the error is e = V_1 − V_0. " and opens "Suppose V_1 is larger than V_0."; `task-day16-integer` (:834) "what step does the arithmetic give" → "what step does K·e give"; `task-day16-tuning` (:839) "if T is much too long" → "if the sampling interval T is much too long". Net paragraph count unchanged.
**Verify:** slide 28 renders to y = 748 today; re-render at 1600×900 after adding the bullet.
*Raised by:* checker-figure-claims (5), learner-in-the-room (6).

**13. [S-12/S-26] `sl-day16-bounds` (:853-859) and the paragraph at :846-849 — "the pulse convention" is named on no slide, and "its SERVO_MIN" reads as Lab 8's.**
> …and Lab 8's ±60° is narrower than **the program's** `SERVO_MIN` and `SERVO_MAX`, so the two numbers are yours to work out from **Day 15's pulse convention: a 1 ms pulse is −90° and a 2 ms pulse is +90°.**

Book keeps its `<xref ref="subsec-servo-ref-command"/>` (the paragraph is outside the projected block).
**DISPLACES:** nothing — a rewrite in place.
*Raised by:* learner-in-the-room (7).

**14. [S-11…S-30] Voice rewrites, passed through as rewrites.** Each is one edit:
- `day16.json:16` → `"Today we'll put the photocell into a voltage divider, work through Part 1 of Lab 8, add the photocells to the tracker arm of your servo, and discuss how the feedback loop can be implemented."` (every deck since Day 9 uses the verb form)
- `day16.json:15` → `"The reading introduced the photocell, a resistor whose resistance falls as more light falls on it, the family of sensors that work the same way, the voltage divider that turns a resistance into a voltage for the ADC, the photocell's datasheet, and what a solar tracker is."`
- `day16.json:50` → `"As the light gets brighter, does the divider's voltage increase or decrease?"` (glue titles are plain text; "V_M" projects with its underscore)
- `day16.json:80` → `"Each photocell is a bit different"` (S-18; also a shade weaker than "never quite the same", matching the book)
- `day16.json:225` → `"Answers: the sign, the integer step, and K and T"` (S-28)
- `source:526-527` → "First, with nothing powered, take the potentiometer off the breadboard: its channel, A0 (PA0), is where the first photocell's divider goes." (and `sl-day16-lab-time`'s matching bullet at :532)
- `source:706` `sl-day16-cup` caption, append: "The cup shades its cell from light arriving from the other side of the arm." (the shading is the physical basis of the tracker; the book caption already has it)
- `source:426` `sl-day16-divider-recall` — use `<m>R_\text{sens}</m>`, `<m>R_M</m>`, `<m>V_M</m>` as the paragraph it condenses does
- `source:571-572` `task-day16-d5` → "Recall that the equation for the voltage divider in Lab 8's Figure 1 is…" ("as drawn above" points at nothing projected)
- `source:936-937` Part 5 opening → "Now we'll start on the loop, which is your lab work in Lab 8." (the section introduction at :411 keeps the original wording)
- `source:531` `sl-day16-lab-time` bullet 1 → "We'll now give you some time to work through Part 1 of Lab 8, where you will go deeper into the datasheet." (her slide 7's bridge line, which currently reaches the room nowhere; phrased so the lab does not act on the student, L-13)
**DISPLACES:** all rewrites in place or into an existing bullet.
*Raised by:* checker-voice (5, 6, 7, 9, 10, 11, 12, 14, 15, 16), checker-arc-fidelity (6).

**15. [B-11a, AUTHORING-visual Rule 2] `fig-photocell-divider` — the subscripts that `act-day16-direction` turns on project at 1.17 %.** Telling R_sens from R_M in the denominator *is* the task. Two compounding fixes, both ours:
- `sl-day16-divider-recall` (:424-429) → caption-only, image-dominant (landscape, so permitted): move the single bullet into `<caption>` and delete the `<ul>`. Frees the stage height, ≈ 1.5×.
- `assets/images/Day16-Photosensors/fig-photocell-divider.svg` — content occupies (111,35)–(690,500) of a 760×540 viewBox, 24 % dead width. Trim the `viewBox` to `100 25 610 490` and set `width`/`height` to match (B-11a requires they match, and `check_rules.py` errors if they do not). ≈ 1.16× more, book included. Run `python3 scripts/image_ratios.py` and commit `assets/book.css`.
**DISPLACES:** one bullet becomes a caption; no new slide, and the slide keeps its position immediately before `act-day16-direction`.
*Raised by:* checker-figure-claims (legibility), learner-visual (5).

**16. [S-6, tooling] The projector has now taken raw LaTeX twice.** The `\sqrt` handler is in and committed — **the in-the-room BLOCKER on Deliverable 4 is resolved; recorded as done, no source edit.** Two follow-ons remain and are cheap:
- `assets/class.html`, `demath()` — a long `\text{}` subscript still breaks across the baseline: `R_\text{illuminated}` in `task-day16-d4` projects as "R_illumi" + "nated". Fix in the player (keep the flattened subscript as one non-breaking unit); do **not** alter the lab's own notation in `task-day16-d4`.
- `scripts/check_deck.py` — fail when a projected `<m>` contains a LaTeX command `demath()` has no handler for. This is the class of defect that produced the blocker.
*Raised by:* learner-in-the-room (1), checker-figure-claims (slide 14 rendering).

**17. [S-8] `plans/day16.md:128-133` — the printed cut order names Parts that Petra's two passes deleted** ("Part 6", "Part 3 to its datasheet beat only", "Part 4's clip check"). Rewrite against Parts 1–5:
> **If a part overruns, cut in this order:** Part 5's opening to one sentence (the deliverables are on the slide and in the handout) → Part 4's discussion to the sign question only, with the other two read aloud from the instructor reveal → Part 3's checkpoint done by walking the room rather than a full pause → Part 1's log-log relation to its closing line with the figure up. **Never cut Part 2**: Part 1 of Lab 8 is this class, and it is her arc.

Also update the "Rebudget" line to `3+2+10+38+17+20+15+5 = 110` and the coverage table's Part numbers.
**DISPLACES:** nothing — instructor-only plan text.
*Raised by:* expert-class-logistics (1, BLOCKER in its own report).

---

## Consider

**18. [P-6/P-15] `subsec-photo-ref-divider` ends "and V_M rises as R_sens falls" — the answer to `act-day16-direction`, in student-facing text.** The reading is clean; this is the Reference, which is lookup material by design, and the reviewer flagged rather than asserted it. Cheapest fix if wanted: cut the clause and let the formula stand. The loop paragraph stays — Lab 8 prints the update rule itself. Outside Parts 1–5, so not ruled here.
*Raised by:* checker-arc-fidelity (5).

---

## Not applied, with reasons

- **learner-visual's BLOCKER — "pair each activity slide with its figure at reduced scale."** A projected `<activity>` is refd by its own id and the player strips figures out of it; the two ways to put the divider back beside `act-day16-direction` are an activity `<introduction>` (which projects as text, not a picture) or ordering. Resolved by ordering — `sl-day16-divider-recall` stays immediately before it and goes image-dominant (item 15) — plus removing the text's pointer at a figure that is not there (item 3). No `prompt` slide invented (B-18). Dissent recorded below.
- **learner-visual 2 — rebuild her slide 13's box-and-arrow annotation onto `fig-day16-full-setup`.** Different source slide: the deck uses her slide **14** export, `week8FullLabSetup.png`, which arc-fidelity verified as the correct end state (no pot, dividers on A0/A1, servo on the regulator). The annotation ask is folded into the export request to Petra, question 2.
- **learner-visual 3 — scale up `sl-day16-lab-fig1`.** It is portrait on a 16:9 stage and already 597 px of 900 in height; the "20 % of usable area" comparison penalizes portrait. figure-claims measured its type and passed it, and S-4 forbids image-dominant for a portrait image.
- **learner-visual 4 — trim the `sl-day16-full-setup` caption.** Moot: the annotation is not being baked into the image, and the caption instead gains the clause that reconciles it with the drawing (item 7).
- **expert-cognitive-load 6 — regroup D1–3 and D4–6 on `act-day16-study`.** The reviewer itself ruled it not a P-7 violation in kind: the slide is a leave-up reference sheet for 37 minutes of self-paced work, not a lecture beat.
- **expert-cognitive-load's "keep bullet 1 on `sl-day16-lab-fig2`"** — superseded by caption-only (item 5).
- **learner-in-the-room 4's variant** (push "with nothing powered" and "one clip per lead" up into slides 21/22's captions) — superseded by the delete (item 4).
- **checker-voice 13's "keep recap bullet 1"** — overruled by the repetition census; the whole recap is slide 34, fifteen minutes later.
- **checker-voice 10's `<m>R \propto E^{-S}</m>` on the slide** — the `∝` glyph is illegible projected, whatever markup produces it. The form moves to slide 9 in words (`R = C·E^(−S)`); the **book** keeps `<m>R \propto E^{-S}</m>` at :457, where MathJax renders it. The rest of finding 10 (R_sens, R_M, V_M as `<m>`) is applied.
- **expert-class-logistics 6 — mark minute 39 as soft.** No change: minute 53 is already stated as the hard stop and is the real safety valve, and the checkpoint's own ladder anticipates the tightness.
- **`checker-arc-fidelity`'s note on her slide 10's lead colours** ("Orange ➝ power") — correctly *not* carried; the book is right and the old slide is loose. Recorded so nobody reuses it.
- **Legibility of the two Fritzings and the 500 px log-log plot** — not layout work, and stated once: see question 2.

---

## Escalate to Petra — questions, deduplicated

1. **The log-log plot.** Your pass-1 sentence reads "In the plot below the slope of the line comes from the datasheet." The curves in that image are the Adafruit guide's generic family and measure a slope of about 0.85; the PDV-P8001's *Sensitivity* row is 0.6, so no line in the picture has the slope the slide claims. We have reworded so the 0.6 is the datasheet's and the plot is named as the guide's steeper generic family (item 1). **Recommendation:** ship the reworded version; if you would rather the slide showed the part's own curve, we need the PDV-P8001 plot as an image.
2. **Three exports only you can make.** `fig-photocell-loglog` is 500×351, already upscaled 1.34× and soft, with its axis labels at 1.34 % of stage height while the slide instructs students to read "1k to 10k" off them. `fig-day16-lab-fig2`'s A0 and A1 silkscreen labels are covered by the blue and green wires in the source image, so no enlargement recovers them. `fig-day16-full-setup` renders at 0.32× and the "5V" silkscreen its caption rests on is unreadable; it wants **two** graded exports — Nucleo-plus-dividers, and servo-plus-regulator — rather than one re-crop, and if you have the annotated version of your slide 13 (the box and arrow on the two photocell symbols, "physically located in the cups"), that carries the teaching the caption is currently doing in words. Drop path: `assets/images/Day16-Photosensors/`; only the `<image source>` lines change.
3. **The datasheet link on a projected task.** `task-day16-d1` carries a live `<url>` to the PDV-P8001 PDF. Your rule is about links *to the book*; this one also leaves the deck mid-class. We have ruled it stays (it is the lab's own pointer and students open the datasheet at that moment) — confirm.
4. **The close.** It is now one line, "Lab 8 is next, and there is no other homework due." Two things could fill its five minutes: the next class and its reading (Day 17, BLE, still rough — we have not invented a forward line), and your slide 16, the Gen AI feedback survey, which was dropped as course admin. If you want the survey back it needs a slide and it takes the close's budget, not extra time (B-18). **Recommendation:** name Day 17's reading if it is settled; leave the survey out unless you want the five minutes spent on it.
5. **A "what you need today" line in the opening recap**, as day15.json has. Day 16 needs the multimeter, a flashlight, the AD2, the tracker arm and the alligator clips. No deck other than Day 15 carries one, so we have not written it.

*Settled today and not re-asked:* the photocells use A0 and A1, so the potentiometer comes off at the start of Part 2 and no servo check exists; slide 16 stays dropped.

---

## Dissent worth recording

- **learner-visual, on the projected activities.** Its position is that her slides 7, 8, 9 and 13 each put the picture and the task on one physical slide, and that splitting every one of them into figure-slide-then-text-slide is a real loss — most of all at `act-day16-direction`, the day's first "did the reading land" checkpoint, where the formula *is* the reasoning. We resolved by ordering and by image-dominant scaling, because the player cannot render a figure inside a projected activity. **If the room stalls on the divider question, or students at the back cannot read R_sens from R_M, the answer is a player change (let a refd activity carry its `ref` figure), not more caption words.**
- **checker-voice, on the closing recap.** It would keep the Deliverable 9/10 line and delete only the tuning-log line. If the close feels empty in delivery, that bullet is the one to restore — not the log line, which is on `sl-day16-start` twice over.

---

# Applied (2026-09-08)

Every must-fix and should-fix item of the synthesizer's list is in the
deck and the source, verified by rebuilding both decks and re-measuring the
changed slides at 1600×900:

- The log-log slide is her slide 5's shape (lead line, the equation alone
  on a line in her plain-text form, a legend line with lux defined, the
  words, and a caption naming the plot as the guide's steeper generic
  family); the book says the 0.6 is the PDV-P8001's and that the guide's
  curves are steeper. The nonlinear slide lost the power-law clause and its
  `∝`.
- Every `<xref>` is out of the projected activities; `task-day16-clips` is
  merged into `task-day16-cups`; "leads" restored; the datasheet link names
  the part.
- `sl-day16-lab-fig2` is caption-only and the pin assignment moved into Lab
  8 Figure 2's book caption (out of the full-setup caption); the servo
  review is image-dominant with the three connections in words and the past
  tense; the full-setup caption says the cells are drawn on the breadboard
  but are in the cups; the arm checkpoint block no longer claims a sweep
  observation and is titled "about minute 70".
- The clock: Part 2's note ≈ 1 + ≈ 37, Part 3 = 1+1+1+11+3, Part 4 =
  3+5+11+1, the two stale source comments fixed, the Part 2 checkpoint
  entry moved to follow the deliverables, the close is one line.
- V_0 and V_1 named on the tracking-loop slide, paragraph and caption; the
  three questions trimmed to match; the bounds slide names Day 15's pulse
  convention; the eleven voice rewrites; the divider recall is image-dominant
  with `<m>` symbols and the SVG's viewBox trimmed to its content.
- Tooling: `demath()` flattens `\sqrt{}` and keeps a twelve-character plain
  subscript whole; `check_deck.py` reports raw LaTeX in a projected `<m>`
  that the player would delete.

Not applied, as ruled: a figure inside a projected activity (the player
cannot), the slide-13 annotation rebuild (the deck uses her slide 14
export; asked as an export), scaling the portrait Figure 1, regrouping the
six deliverables, the Reference's "V_M rises" clause (outside the deck; her
call).
