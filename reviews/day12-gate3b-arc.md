# Day 12 — Gate 3″ (the prose redo): her deck, the cut prose, and the deck

Reviewer: `reviewer-source-arc`. Scope: `<section xml:id="sec-motors-day12">`
(`source/ch-motors.ptx`:2539–3746, 28 body paragraphs) and
`<section xml:id="sec-motors-reference">` (:3760–4145) against
`assets/decks/day12.json` (40 entries, 30 refs), with
`assets/ClassSlidesOLD/Day12-Motors(3).pptx` (10 slides) and
`assets/ClassSlidesOLD/Day11x-Motors(2).pptx` slides 20–21 as the arc authority.
All trees are the live working tree; `source/ch-motors.ptx` is read at its
uncommitted state. `check_deck.py` and `check_rules.py` both pass clean.

### Verdict: MINOR

**No teaching step of hers was lost in the cut.** All ten Day 12 slides and both
migrated Day 11x slides still reach the room, and the five items the brief
listed as "must not be lost" are all in body prose. The paragraph→slide mapping
survived the 42→28 cut with **one orphan**: p :2752 ("which state is which is
worth reading off your own screen") is now the only body paragraph in the
section that reaches the room nowhere at all — not a slide, not a task, not a
presenter note. Everything else is deck-note or deck-metadata work.

The deck-entry-6 change is **safe**: observe-before-reveal holds, and the reveal
is a different figure four entries later. The picture does appear on two
consecutive slides, which is a room problem, not an ordering one — finding 2.

---

### Her arc against the room

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | *Engs 28 / Day 12* | deck 1 (`title`) | ✓ |
| 2 | *Review: Basic DC motor control* | deck 4 (Part 1 `section` glue) + `act-day12-driver-questions` (:2564) | ✓ her framing kept as the Part opener |
| 3 | *Discuss At Your Table* — how does `TTmotor_ramp.c` work, do you understand all the register bits, what questions | deck 5 → `act-day12-driver-questions` (:2564); prose lead-in p :2558 | ✓ all three of her prompts, plus the individual write-down |
| 4 | *Motor speed sensing* | deck 6 (Part 2 `section` glue) | ✓ |
| 5 | *We will use an optical incremental sensor* (LED + photosensor → pulses; detect, count, convert to RPM) | reading `subsec-speed-sensor` (:2270) + deck 16 `sl-day12-wheel-recall` (:2947); "detect and count in the MCU" → Parts 3–4 | ✓ her note's *"nobody leaves today without pulses on their screen"* is in deck 6's and deck 40's notes |
| 6 | **Exercise #1** — wire it, scope it, run the ramp; *"~10 KΩ pullup"*; *"needs a 5V supply"* | deck 8 `sl-day12-wiring` (:2678, her own re-annotated drawing) + deck 10 `act-day12-wire-and-scope` (:2715); prose p :2660 | ✓ back-to-the-barebones-circuit, the orange/white wire and the 5 V supply all present; *"don't wire the signal wire into the Nucleo yet"* only implicitly — finding 4 |
| 7 | *Wiring the Fancy Photointerrupter* — cabled variant, four wire colors | deck 9 `sl-day12-cabled-sensor` (:2703); **now with body prose at p :2683** | ✓ Gate 3′ finding 2 discharged: the paragraph and the `<xref>` exist, and the figure moved up to follow the wiring picture |
| 8 | The 30 → 180 rpm scope video | **deliberately dropped** — projected Wednesday as `sl-day11x-scope-video` (:2243, same `VH0-zO2LpDc`); Part 2 has them capture their own | ✓ re-checked, still the plan's own ruling (`plans/day12.md`:155) |
| 9 | **Exercise #2: Photointerrupter → RPM (on paper)** — detect / count / convert | deck 17 `act-day12-pulses-to-rpm` (:2894), merged with Day 11x slide 20 | ✓ |
| 10 | *Complete Lab 6 setup* — hardware + firmware checklist | deck 30 `sl-day12-lab6-build` (:3381) + deck 31 `sl-day12-build-order` (:3447) | ✓ all five checklist items land; *"(internal or external pullup)"* is `sl-day12-pullup-value` bullet 3; *"show ±RPM"* is the table's last row |
| Day 11x 20 | *With your table group* — edges / rpm / direction | deck 17, merged (P-16) | ✓ all three questions are tasks |
| Day 11x 21 | *Decoding shaft position from sensor output* | framing sentence → p :2927 / deck 18; Δθ and position → p :2958 / deck 19; quadrature + up-down counter + "some sensors decode in hardware" → p :2981 / deck 20 | ✓ every one of her seven bullets, in her order |

Her arc is intact through the cut. No Williams citation was carried in (her
Day 11x slide 7 is the one that has one; nothing in Day 12's source cites it).

---

### The chapter's in-class prose against the deck

| source | what it teaches | condensed by | judgment |
| --- | --- | --- | --- |
| p :2543 | the day's arc | deck 2 `recap` | ✓ near-verbatim |
| **Part 1** | | | |
| p :2558 | today is built on `TTmotor_ramp.c`; start with what is unclear | deck 4 section note | ✓ deliberate, no reveal slide |
| `act-day12-driver-questions` :2564 | one line you can explain, one you cannot; then the table | deck 5 | ✓ |
| **Part 2** | | | |
| p :2592 | wire it, scope it before it reaches a pin; **predict first** | deck 6 note → deck 7 | ✓ |
| `act-day12-predict-trace` :2603 | the prediction | **deck 7, via `sl-day12-predict-trace`** — the activity itself is now refed by no deck | ✓ the slide's three bullets are the activity's statement; nothing lost. See "the deck change" below |
| `sl-day12-predict-trace` :2628 (`ref="fig-day12-wiring"`) | the prediction, over the wiring picture | deck 7 | ✓ prose behind it is p :2592 + the activity |
| p :2660 | three connections; 5 V from the regulator; 10 kΩ to 3.3 V; two rails on purpose | deck 8 | ✓ |
| `fig-day12-wiring` :2670 + `sl-day12-wiring` :2678 | her own annotated drawing | deck 8 | ✓ — but the same image as deck 7, back to back: finding 2 |
| p :2683 | kits differ; scope on the row, minus lead on shared ground; turn the wheel by hand; stop above 3.3 V; check it **before the wire goes into the header** | deck 9 (first sentence) + deck 10 tasks 1–2 | ✓ as content; the "not into the Nucleo yet" instruction is implicit — finding 4. One paragraph, two deck entries, no overflow risk |
| `fig-day12-cabled-sensor` :2695 + `sl-day12-cabled-sensor` :2703 | the cabled variant; the L terminal | deck 9 | ✓ |
| `act-day12-wire-and-scope` :2715 | wire, scope, ramp, measure the rate | deck 10 | ✓ |
| p :2740 | the expected trace; the phototransistor is a switch to ground; the resistor's rail sets HIGH | deck 12 | ✓ the reveal |
| **p :2752** | **which state is which — this part switches on light or on dark, so read it off your own screen; it matters when you choose which edge to count** | **nothing** | **orphan — finding 1** |
| `fig-photointerrupter-states` :2760 + `sl-day12-states` :2769 | both states | deck 12 | ✓ |
| p :2774 | that answers the prediction: a floating node wanders | deck 14 (`inst-…`, ¶1) | ✓ the brief's "answered in body prose" is satisfied and it also projects |
| p :2781 | Day 10 open-drain / NPN open collector; **no `OTYPER` bit**; the rail is the design decision; value is a wide-middle trade-off (→ Reference) | deck 12's note (open-drain) + deck 13 bullets 1–2 | ✓ the open-drain clause is in body prose as owed; it is still note-only on the wall (recorded as deliberate at Gate 3′) |
| p :2797 | power → ground → signal | deck 11 | ✓ |
| `table-day12-diagnostics` :2803 + `sl-day12-diagnostics` :2826 | four traces, where to look | deck 11 | ✓ symptoms only; deck projects it before the reveal by design |
| `sl-day12-pullup-value` :2830 | why 3.3 V; why ~10 kΩ; internal or external | deck 13 | bullet 1 ✓ (p :2791). **Bullets 2–3 are carried by `subsec-motors-ref-speed` :4008–4022, not by the in-class prose the deck entry points at — finding 3** |
| `inst-day12-wire-and-scope` :2840 | prediction, expected screen, EE-SX672, the number | deck 14 | ✓ |
| **Part 3** | | | |
| p :2882 | a trace and a rate, neither is a speed; the slot count is on no datasheet | deck 16 / 17 | ✓ |
| `act-day12-pulses-to-rpm` :2894 | slots, detect, count, convert, direction | deck 17 | ✓ `task-day12-detect` left open |
| p :2927 | her framing sentence; PPS, N, ×60 | deck 18 (lead `<p>` + bullet 1) | ✓ |
| p :2938 | one edge per slot; both edges needs 2N | deck 18 bullet 2 | ✓ **and the Gate 3′ finding is discharged**: the body prose now says "the rising- and falling-edge trigger registers from Day 9" without naming `RTSR1`/`FTSR1`, so Part 4's answer is no longer telegraphed |
| `sl-day12-wheel-recall` :2947 | the reading's beam figure, left up | deck 16 (`refPage` → the reading) | ✓ |
| `sl-day12-rpm` :2948 | the formula on their own numbers | deck 18 | ✓ |
| p :2958 | the same count as an angle; Δθ; position is relative; it is an *average* | deck 19, three bullets | ✓ one paragraph → three bullets on one slide, which is the compression that fits |
| `sl-day12-decoding` :2972 | as above | deck 19 | ✓ |
| p :2981 | no direction in the signal; the sign comes from the commanded mode; quadrature | deck 20 bullets 1–3 | ✓ |
| `sl-day12-quadrature` :2993 | as above, + hardware decode | deck 20 | ✓ bullet 4 traces to Day 11x slide 21's last line and to Reference :3988 |
| `inst-day12-pulses-to-rpm` :3003 | 20 slots; keep detect open; plausibility; direction = no | deck 21 | ✓ |
| **Part 4** | | | |
| p :3043 | three jobs at three rates — but first, which pin | deck 22 note → deck 23; also deck 25 bullet 1 | ✓ |
| `act-day12-find-the-pin` :3052 | UM2953 Table 11, D7 | deck 23, **first entry of Part 4** | ✓ the Gate 2′ ordering holds, and nothing prints `PA15` before it (deck 13 bullet 1 now says "whichever pin you wired it to") |
| `inst-day12-find-the-pin` :3073 | PA15, CN9 pin 8, no TIM14 channel | deck 24 | ✓ |
| p :3090 | the three rates; the pulses are on no schedule; `delay_ms()` serves one | deck 25 bullets 1–2 | ✓ two former paragraphs merged into one, condensed onto one slide with two bullets — no doubling |
| `fig-three-rates` :3104 + `sl-day12-three-rates` :3112 | the three rates over one second | deck 25 | ✓ |
| p :3122 + listings :3136/:3148 + p :3161 | `milliseconds()`, SysTick, 12000 − 1, `SystemInit()`, costs nothing | deck 26 | ✓ B-6 verbatim from `assets/starters/sysinit.c` |
| `sl-day12-milliseconds` :3178 | as above | deck 26 | ✓ |
| `sl-day12-naive-loop` :3211 | the deliberately-broken 100 Hz loop | **PARKED — refed by no deck** | ✓ verified across `assets/decks/*.json` |
| p :3239 | the loop's shape; the obvious place fails; the count is low by a *changing* amount; the condition is on HIGH/LOW times (→ Reference) | no slide — deck 28 | ✓ **the polling argument is in body prose**, as owed |
| `act-day12-poll-or-interrupt` :3257 | the individual commit | deck 27 | ✓ the one slide she asked for |
| p :3266 / :3277 / :3287 | both answers; the free-running poll and its standing promise; the five Day 9 moves (→ `table-day12-exti-lines`); `volatile` and why; and why we take the interrupt | no slide — deck 28 | ✓ **the interrupt decision and `volatile`'s one-clause reason are in body prose**, as owed; `table-day12-exti-lines` moved to Reference :4047 and the five writes still reach the room off deck 28 ¶4 |
| `sl-day12-two-answers` :3307 | the reveal | **PARKED — refed by no deck** | ✓ verified |
| `inst-day12-poll-or-interrupt` :3316 | the four answers | deck 28 | ✓ |
| **Part 5** | | | |
| p :3365 | every piece has been wired or written before | deck 30 caption | ✓ |
| `fig-day12-lab6-build` :3370 + `sl-day12-lab6-build` :3381 | her slide 10 | deck 30 | ✓ |
| p :3386 | **what you already have written** — the driver from `TTmotor_ramp.c`, `start_conversion`/`adc_read`, `SevenSeg_number`, the never-reviewed signed counter | deck 30's presenter note, in full | ✓ **Gate 3′ finding 3 discharged**, and the "homework nobody reviewed" clause is there twice |
| `table-day12-build-order` :3401 + `sl-day12-build-order` :3447 | seven stages, each with its test | deck 31, **once** | ✓ her pass-1 cut of the second copy still honored |
| p :3440 | a failing stage is worked power → ground → signal; rpm-to-screen is a milestone | deck 31 caption + note | ✓ |
| `fig-deadband` :3452 + `sl-day12-deadband` :3463 | the number line | deck 32 | ✓ |
| `table-day12-deadband` :3470 | the three knob positions | **PARKED slide** `sl-day12-deadband-table` :3518, refed by no deck ✓ | table now has its `<xref>` (:3513) but still sits *above* the paragraph that explains it — observation below |
| p :3503 | the dead band is theirs; 4096 counts across 3.3 V; centre ≈ 2048 | deck 32 | ✓ |
| p :3523 | four hazards | deck 33 | ✓ four sentences → four bullets |
| `sl-day12-hazards` :3537 | as above | deck 33 | ✓ |
| **Part 6** | | | |
| p :3564 | the rest of the class is yours; start on paper; then the build order | deck 34 note → deck 35 | ✓ four sentences, no scaffolding, as she asked |
| `act-day12-main-loop-sketch` :3572 | three rates, the window, the shared counter | deck 35 | ✓ |
| `inst-day12-main-loop-sketch` :3598 / `inst-day12-main-loop-code` :3620 | worked answers | deck 36 / 37 | ✓ both projected (P-10) |
| `act-day12-stretch` :3659 + `inst-day12-stretch` :3688 | sign, quadrature, resolution | deck 38 / 39 | ✓ |

**Reverse direction.** The ten deck entries with no source block are 1 (title),
2 and 40 (recaps), 3 (agenda) and 4/6/15/22/29/34 (`section` glue) — structural,
not content. The only deck-only *claim* is deck 40's third recap item (run the
PWM at 50 Hz and listen), which traces to `act-day11-stretch` (:1286),
`act-day11x-stretch` (:2146) and Reference :3869. **No S-10 slide: nothing in
this deck exists to absorb a layout problem**, and the one new entry this pass
(deck 7) replaced an activity ref rather than being invented.

---

### The deck change: `sl-day12-predict-trace` on deck entry 6

Checked against the two things it could have broken.

**Observe-before-reveal (P-6): intact.** Part 2's room order is
7 predict → 8 wire → 9 cabled → 10 wire-and-scope → 11 diagnostics →
**12 `sl-day12-states` (the reveal)** → 13 pull-up value → 14 answers. The
reveal is `fig-photointerrupter-states`, a *different* figure, four entries
after the prediction. The picture on the prediction slide carries her own
callout *"~10 KΩ pullup"* — a **value, not a reason** — so it names the
component the prediction asks students to imagine away without answering why it
is there. The prompt now says *"suppose we leave the resistor out"* out loud in
bullet 2, and the note tells the presenter to say it; that is the right
mitigation, and retouching her drawing is not on the table.

One thing to keep an eye on, not a finding: deck 11
(`table-day12-diagnostics`, row 1: *"noise wandering between the rails →
check that the pull-up is fitted"*) is up while they wire, one entry before the
reveal. It gives the prediction's *symptom* away but not its mechanism, which is
argued in the slide's own note and was accepted at Gate 3′. Unchanged by this
pass.

**The picture twice: real, and it is finding 2.**

---

### The clock

`plans/day12.md` states **110 minutes, Thursday**, with the `CLAUDE.md` rule
quoted at :3–7. Re-added from the deck's own notes, entry by entry:

| | plan | deck notes | |
| --- | --- | --- | --- |
| settling + 2 transitions | 6 | deck 2's note names the 6-minute bucket | ✓ |
| Part 1 | 8 | deck 5: 2 + 3 + 3 | ✓ |
| Part 2 | 26 | deck 7 · 2, deck 8 · 2, deck 9 · 1, deck 10 · 15, deck 11 · 1, deck 12 · 3, deck 13 · 2 | ✓ 26 |
| Part 3 | 15 | deck 17 · 8, deck 18 · 3, deck 19 · 2, deck 20 · 2 (deck 16 has no minutes of its own, by design) | ✓ 15 |
| Part 4 | 8 | deck 23 · 2, deck 25 · 1, deck 26 · 3, deck 27 · 2 | ✓ 8 |
| Part 5 | 5 | deck 30 · 1, deck 31 · 2, deck 32 · 1, deck 33 · 1 | ✓ 5 |
| Part 6 build | 37, floor 30 | deck 34 | ✓ |
| close | 5, protected | deck 40 | ✓ |
| **total** | **110** | | ✓ |

The deck-entry-6 swap did not disturb Part 2's arithmetic: the replaced activity
ref carried the same ≈ 2 min. `plans/day12.md`'s outline headings, which
contradicted its own table at Gate 3′, now agree with it (Part 1 = 8, Part 4 = 8,
Part 6 = 37/30, and the D7 → PA15 lookup is recorded as moved to Part 4 at :475).
Gate 3′ finding 7 is discharged.

---

### Findings

- **[MAJOR] p :2752 is the only body paragraph in the section that reaches the
  room nowhere** — *"Which state is which is worth reading off your own screen…
  turn the wheel by hand and watch which way the trace moves as a slot comes
  into the gap… it matters when you come to choose which edge to count."* It is
  on no slide, in no task, and in no presenter note. `sl-day12-states`' caption
  and note carry the mechanism only; `task-day12-scope` (:2723) says to turn the
  wheel but only to look for "a trace that toggles between 0 V and 3.3 V";
  `inst-day12-wire-and-scope` says turning the wheel is the check to insist on,
  and not what to read off it. This paragraph is load-bearing twice over: it is
  the in-room resolution of the polarity question the chapter deliberately leaves
  open (the light-ON/dark-ON selectable part), and it is what makes Part 3's
  *"count one edge per slot — the rising edge or the falling edge"* (:2938) and
  Lab 6's falling-edge interrupt on PA15 (:3577) a choice a student can make
  rather than copy.
  **fix, no book words**: two sentences into `sl-day12-states`' `<note>`
  (`source/ch-motors.ptx`:2771), after *"…that is why the pull-up goes to
  3.3 V."*:
  *"Then send them back to their own screen: this part can be wired to switch on
  light or on dark, so have them turn the wheel by hand and watch which way the
  trace moves as a slot enters the gap. Nothing in the rpm arithmetic depends on
  the answer — it matters when they choose which edge to count."*
  ADD: 2 sentences to a deck note. DISPLACES: nothing — notes are outside the
  length budget. NET: 0 body words.
  *(Stronger, if you want it in their hands: append "…and note which way the
  trace moves as a slot enters the gap" to `task-day12-scope` :2723. ADD: 13
  words. DISPLACES: the last sentence of p :2752, which then becomes redundant.
  NET: −20.)*

- **[MINOR] Deck 7 and deck 8 project the identical image back to back** —
  `sl-day12-predict-trace` (:2628) and `sl-day12-wiring` (:2678) both
  `ref="fig-day12-wiring"`. Between the two slides the only thing that changes on
  the wall is that three bullets become a one-line caption; the click reads as a
  duplicate or a mis-advance. This is the cost of Petra's own request
  (*"Is it possible to actually show the image from the following slide here?"*)
  and the answer is not to undo it — the two slides do different jobs (predict,
  then read the circuit you are about to wire) and the shared picture is the
  continuity. It needs to be *named* from the front of the room.
  **fix, no book words**: one sentence at the head of `sl-day12-wiring`'s
  `<note>` (:2680): *"Same picture as the prediction slide — say so as you
  advance: 'same circuit, now we wire it.' Then: back to the bare circuit…"*
  ADD: one note sentence. DISPLACES: nothing. NET: 0 body words.

- **[MINOR] `sl-day12-pullup-value`'s bullets 2 and 3 have no prose on the page
  the deck entry points at** — deck entry 13 has `"page":
  "subsec-day12-wire-and-scope.html"`, but bullet 2 (a smaller resistor wastes
  current, a larger one is too slow against stray capacitance) and bullet 3
  (`PUPDR`, the way you did on Day 3) are now carried only by
  `subsec-motors-ref-speed` :4008–4022. The in-class paragraph :2793 states the
  conclusion ("a wide middle, and 10 kΩ sits comfortably inside it") and xrefs
  the Reference for the argument — which is exactly what this pass was for, so
  the *prose* is right. What is wrong is the navigation: a student who follows
  this slide to its page lands where the argument is not.
  **fix, no book words**: add `"refPage": "subsec-motors-ref-speed.html"` to deck
  entry 13 (`assets/decks/day12.json`:95), the way deck 16 already points at the
  reading. ADD: one JSON key. DISPLACES: nothing. NET: 0 body words.

- **[MINOR] Her slide 6's most emphatic instruction — *"Don't wire the signal
  wire into the Nucleo yet"* — reaches the room only by inference.** She says it
  in a callout box *and* twice in her speaker notes. Ours has it as a
  consequence-clause in body prose (:2692, *"…before the wire goes into the
  header"*), and in the room it survives only as `task-day12-wire`'s "run its
  signal wire to a row of its own on the breadboard" plus `task-day12-scope`'s
  "5 V *will* damage your Nucleo". A student who has already wired the sensor's
  output to D7 from the Lab 6 figure hears nothing that tells them to pull it
  back out before the scope check.
  **fix, no book words**: one clause at the head of `act-day12-wire-and-scope`'s
  deck note (`source/ch-motors.ptx`:2715 → deck entry 10's note): *"Say it before
  they start: the signal wire stops at the breadboard today — nothing goes into
  the Nucleo header until it has been on the scope."*
  ADD: one note sentence. DISPLACES: nothing. NET: 0 body words.

---

### Layouts she already solved

- `sl-day12-wiring` — her slide 6, adopted whole:
  `fig-day12-wiring-annotated.png` is her own re-export, her callouts,
  unretouched, image-dominant with a one-line caption instead of repeating the
  callouts as bullets. **keep.**
- `sl-day12-predict-trace` — the new one. Two-column (bullets left, figure
  right) by default, no `stack="yes"`. That is the right call for this asset:
  the drawing is 2289×1790, aspect 1.28, so `stack="yes"` would height-limit it
  to roughly 630 px wide where the two-column frame gives it about 700.
  **keep** — but her *"~10 KΩ pullup"* callout is the smallest text on it, and
  this is the narrower of the two frames it appears in. Worth one look on the
  wall before Thursday; that check belongs to `learner-in-the-room`, not here.
- `sl-day12-lab6-build` — her slide 10, raw: her Fritzing PNG on white with no
  overlay text; the caption does the block naming and the note forbids reading
  pin names off it. **keep.**
- `sl-day12-cabled-sensor` — her slide 7's shape (photo plus a short colour
  list), `stack="yes"`, and it now sits directly after the wiring slide in both
  the book and the deck. **keep.**
- `sl-day12-wheel-recall` — hers is the three product photos of slide 5; ours is
  the reading's beam figure, projected bare and left up while they work.
  Different picture, same job, and it is the figure they read from. **keep.**

---

### Checked and correct

Carried to the room, after the cut: her slides 2, 3, 4, 5, 6, 7, 9 and 10 and
both migrated Day 11x slides — every one of Day 11x slide 21's seven bullets
included. All five items the brief protected are in body prose and reach the
room: the open-drain clause with "no `OTYPER` bit" (:2781, deck 12's note), the
polling argument and the interrupt decision (:3239, :3266–:3296, deck 28),
`volatile`'s one-clause reason (:3281), the "what you already have written"
inventory with the never-reviewed signed counter (:3386, deck 30's note in
full), and the prediction answered in body prose (:2774) as well as on deck 14.
Three Gate 3′ findings are discharged by this pass — `PA15` no longer prints in
Part 2, `fig-day12-cabled-sensor` has body prose and an `<xref>`, and Part 3 no
longer names `RTSR1`/`FTSR1` — and the plan's outline now agrees with its own
Part table.

Deliberately dropped and re-verified: her slide 8 (the 30 → 180 rpm video,
played Wednesday as `sl-day11x-scope-video`); `sl-day12-naive-loop`,
`sl-day12-two-answers` and `sl-day12-deadband-table`, each parked in source with
its reason and refed by no deck in `assets/decks/`; `act-day12-predict-trace`,
which is no longer refed by any deck because `sl-day12-predict-trace` carries its
prompt verbatim. Two observations, not findings: `table-day12-deadband` (:3470)
still sits above the paragraph that explains it (:3503) although it now has its
`<xref>` — a reading-flow point, not an arc one; and the source now holds the
prediction prompt twice (activity :2605 and slide :2629), so an edit to one has
to be made to the other, which the comment at :2617 already says.
