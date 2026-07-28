# Day 8 — Gate 2 committee reports

Draft under review: `source/ch-timers-interrupts.ptx` (Day 8 portion) +
`assets/decks/day8.json`, against `plans/day8.md` rev 2 (post-Gate 1).

Panel: standing core of 7 (checker-technical-accuracy,
expert-continuity-auditor, expert-class-logistics, expert-cognitive-load,
learner-visual, learner-firstgen-novice, learner-anxious-nonhardware) plus
rotators expert-rigor-hawk (real quantities/timing), expert-embedded-industry
(transferable register contracts), learner-arduino-veteran (replaces Arduino
invisibles), learner-python-intro (new C-isms: volatile, widths).

---

## learner-arduino-veteran

## Verdict: PASS WITH CHANGES

Four of Gate 1's five items are fixed cleanly and thoroughly. The fifth (the Part 5 spoiler) is fixed in the actual reading body but leaves one faint echo in the objectives list — not the blocker it was, but worth a one-line fix before this ships. One new MAJOR surfaced on the Arduino-veteran walk: the timer itself invites a `millis()`-shaped misreading that nothing in the draft names.

## Findings

1. **[MAJOR] [P-1, P-5]** `ch-timers-interrupts.ptx:99-155` (`subsec-timer-hardware`) — never names the collision with Arduino's `millis()` model. `millis()` trains you to think of a hardware timer as a free-running counter you *read and diff* against a saved timestamp — no flags, no interrupts, no configuration beyond `Serial.begin()`-style setup. TIM14 here is the opposite shape: a periodic auto-reload counter that wraps, sets a flag, and must be cleared. Every other Arduino false-friend in this chapter gets an explicit callout (`attachInterrupt()`, the ISR/interrupt-status-register acronym collision, "the library clears the flag for me") — this one doesn't, even though it's the first thing a veteran will silently get wrong ("why can't I just poll `TIM14->CNT`?"). Fix: one sentence in `subsec-timer-hardware` or the Part 1 slide — "If you've used Arduino's `millis()`, that reads a free-running counter fed by a timer you never configure. This chapter hands you exactly what `millis()` hides: choosing the count rate, noticing the wrap, clearing the flag yourself."

2. **[MINOR] [P-5]** `ch-timers-interrupts.ptx:35-37` (chapter `<objectives>`) — the objectives list still names `rc_w0`/`rc_w1` verbatim: *"Read a status bit's access type (`rc_w0`, `rc_w1`) from the reference manual…"* This is a much weaker echo of the Gate 1 blocker (it doesn't hand the answer — it doesn't say which register has which polarity — so Part 5's "commit to an answer" beat survives), but it's still an avoidable early flag for a term whose whole pedagogical point is that you *look it up*, not that you already know it exists. The Before Class reading body itself is clean (confirmed: first occurrence of `rc_w0`/`rc_w1` in the chapter's prose is line 1098, inside Part 5, after the "is this a bug?" commit). Fix: reword the objective to "Read a status bit's clear-by-write convention from the reference manual and clear any status flag correctly," and let Part 5 introduce the two specific labels.

3. **[MINOR] [B-6]** `ch-timers-interrupts.ptx:1713-1714` (`sl-day8-challenge-solution`, the T_on≠T_off homework solution) — `GPIOA->MODER |= (1U<<10); GPIOA->MODER &= ~(1U<<11);` breaks the idiom used everywhere else in the chapter (`GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk; GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);`, e.g. lines 985-986, 1378-1379, 1537-1538, 1651-1652). It's off the crucial-step path (instructor-only, "for fun" solution), but a student who does look at it will hit an unexplained idiom shift right where they have no scaffolding left. Fix: use the same `_Msk`/`_Pos` macros as the rest of the chapter.

**Gate 1 verification, item by item:**
- Spoiler (rc_w0/rc_w1 before class) — **fixed** in the reading body; see finding 2 for the residual trace in objectives.
- `attachInterrupt()` never named — **fixed**, and fixed twice: once as an in-Before-Class slide (`sl-day8-mechanism`, line 294) and once in Part 6 prose (lines 1196-1202), both naming the three hidden jobs Arduino used to do.
- `TIM14_IRQn` as an untraced third name — **fixed**, and fixed well: `act-timer-vector-lookup` + `fig-vector-table` walk all three names (vector table position 19, `TIM14_IRQn`, `TIM14_IRQHandler`) back to RM0490 §11.3 Table 40, the device header, and the startup file respectively. This is the strongest P-11 moment in the excerpt.
- Motivation targeting Day 1's loop instead of `delay_ms()` — **fixed**. Part 1 and its slide (`sl-day8-captivity`) center entirely on `delay_ms(1000)`'s captivity and the Lab 2 race game; Day 1's busy-wait is mentioned only for continuity in the reading, not as the motivating example.
- `if`-vs-`while` polling shape unmarked — **fixed**, with a dedicated side-by-side (`while` from Day 7 vs `if` today) in both prose and `sl-day8-if-not-while`.

## What works

The vector-table activity (finding above aside) is genuinely excellent P-11: three names, one lookup, done in under a minute, and it's the moment that would have been most tempting to just hand students. The Part 5 set-piece survives its own reveal well — "commit to an answer" (`sl-day8-waitwhat`) before the lookup, RM section-and-table named exactly (P-11), and the fix (assign-a-mask) generalizes rather than just patching the one line (P-5, P-8-style "teach the robust form"). The deck's presenter notes explicitly build a fast lane for students who skimmed the reading ("the only way back in for a student who bounced off the reading... compress to a show of hands if the room predicts confidently") — this is exactly the accommodation the skim-and-quiz persona needs, and it's done without diluting the material for students who did the reading. The two stretch activities (250 ms without touching PSC, then without touching ARR; the T_on≠T_off state machine) both generalize the day's idea rather than repeating it — genuine P-3 material, not busywork.

---

## learner-python-intro

## Verdict: PASS WITH CHANGES

## Findings

1. **[MAJOR] P-1, P-4 — `volatile` is explained by invoking "the compiler optimizes," but "compiler optimization" itself was never taught, only name-dropped.** `source/ch-timers-interrupts.ptx:392-404` (and the slide restating it, `:1337`) says: "The compiler optimizes on the assumption that it can see every way a variable changes... an optimizing compiler is entitled to conclude the flag is always 0." For a Python-only student this is the single biggest leap in the chapter: nothing in Python ever rewrites, deletes, or reorders your code out from under you — the interpreter runs what you wrote. The book's only two prior mentions of "compiler optimization" (`ch-intro-blinky.ptx:1378,1419`) say only that a busy-wait loop's *timing* "depends on the compiler's optimization level" — never that the compiler treats source as a specification it may legally transform, deleting reads/branches it can prove don't matter. The Day 8 text then jumps straight to a specific, correct instance of that general fact without ever stating the general fact. It reads as "the compiler decided something malicious," not "here is what compilers are allowed to do and why." **Fix:** add one or two sentences establishing the general idea *before* the specific case — e.g., "Unlike Python, C is not executed line-by-line as written: the compiler is free to rewrite your code into anything that behaves identically for everything it can see, including deleting reads or whole branches, provided nothing it can see ever contradicts the rewrite." Also add a small visual (P-4) — a two-box diagram: "what the compiler sees" (the `main()` loop) vs. "what it can't see" (the ISR's write, arriving from outside that view) — since none exists here (`sl-day8-flag` has no `ref`/image).

2. **[MAJOR] P-4, B-8 — 65,535 is used five times in this chapter and never derived from 2^16, despite the chapter having a ready-made, already-taught template for exactly this move.** `ch-timers-interrupts.ptx:172-174`: "the counter and the auto-reload register are 16 bits wide, so the largest count they can hold is 65,535" — stated, not shown. The ADC chapter (`ch-adc.ptx:121-160`, with an explicit reveal slide "4096 steps — but the top one is numbered 4095") already taught the *general* pattern — N bits → 2^N values, numbered 0 through 2^N − 1 — with a worked example and a reading question specifically about the off-by-one trap. This chapter needed that pattern again for 16 bits and just asserted the answer, with no `<xref>` back to the ADC's 4095 derivation and no restatement of 2^16 = 65,536. A student who correctly internalized "4096 steps, 0–4095" from Day 7 gets no help connecting it to "65,536 steps, 0–65,535" here — the number just appears. **Fix:** one sentence at `:172-174`, e.g. "A 16-bit register holds 2^16 = 65,536 distinct values, numbered 0 through 65,535 — the same counting-from-zero rule as the ADC's 12-bit, 0–4095 range (`<xref ref="..."/>`)."

3. **[MAJOR] P-10 — the "for fun" challenge's instructor solution never shows the one piece of code that is actually new.** `ch-timers-interrupts.ptx:1690-1737` (`sl-day8-challenge-solution`). The prose above the slide says `tim14_ms_interrupt_init(ms)` is "Day 8's init with the period as a parameter," but the code block calls `tim14_ms_interrupt_init(T_OFF);` (`:1718`) and never declares or defines that function — the listing jumps straight from `#define`s to `main()`. This is exactly the step a Python-only student would find hardest to produce unaided: turning a fixed, no-argument init function into one with a runtime parameter (replacing `ARR_FACTOR - 1` with `ms - 1`, adding `(int ms)` to the signature). Describing the change in prose instead of showing it is not a solution a student — or the instructor — can check against. **Fix:** include the actual `void tim14_ms_interrupt_init(int ms) { ... }` body in the slide.

4. **[MINOR] B-6, L-4 — function-prototype style is inconsistent within this single chapter, unexplained.** Compare `void tim14_500ms_init();` (`:981`) and `void tim14_500ms_interrupt_init();` (`:1370`, `:1532`) against `void tim14_third_s_interrupt_init(void);` (`:1643`) and `uint16_t adc_read(void);` (already established in `ch-adc.ptx:1072`). Empty parentheses `()` and explicit `(void)` mean different things in C (unspecified-vs-no arguments), and the book has otherwise used `(void)` consistently for no-argument prototypes elsewhere. A student trying to pattern-match syntax (since producing C from scratch is hard for them) has no way to know which form is "the rule" here — three of five examples in this chapter drop the `void`. **Fix:** make all no-argument prototypes in this chapter `(void)` for consistency with the rest of the book, or add a one-line note if the difference is ever meant to be taught.

5. **[MINOR] P-1 — the vector-table "linkage by name" explanation gets the mechanism right but never contrasts it with the Python/Arduino mental model this course's audience actually holds.** `:348-359` and `:1193-1202` do explain that the table is fixed at compile time and wired by the startup file — good, not ritual. But the explicit statement a Python student needs — "you might expect to *pass* your handler as an argument to some `register()` call, the way you'd pass a function object in Python; here there is no such call, because the linkage happens once, at build time, by the linker matching a name" — is only given as an aside to "Arduino veterans" (`sl-day8-mechanism`, `:294`), which doesn't reach a student with no Arduino background. **Fix:** widen that aside so it isn't Arduino-specific, or add a one-sentence Python contrast in the book prose at `:348-359`.

## What works

The `rc_w0` vs. `rc_w1` sequence (`subsec-day8-rcw0`, Part 5) is an excellent observe→explain→fix arc (P-5) with a genuine "commit before you look it up" moment and a habit ("assign a mask, never read-modify-write") that generalizes correctly. The `if`-not-`while` contrast (`sl-day8-if-not-while`) is a clean, concrete before/after. `(1U<<5)`, `^=`, `typedef enum`/`switch`, `_Msk`/`_Pos`, and `rc_w1` are all genuinely pre-taught in earlier chapters (`ch-switches.ptx`, `ch-adc.ptx`) and reused correctly here — no forward references on those. The debugging ladders (Parts 4 and 7) directly address P-14's "nothing happened" problem with a concrete, ordered checklist rather than assuming the student will know where to look.

---

## learner-anxious-nonhardware

## Verdict: PASS WITH CHANGES

The four Gate 1 demands are largely delivered — the Part 4 checkpoint, the datasheet-driven Part 6 vector-table lookup, the survivable/checkable misnamed-ISR framing, and the Part 7 skeleton's restatement of the Part 5 clearing idiom are all present and well done. But one of the four demands is contradicted by the actual student-facing text, and the crucial step (Part 7) still lacks a written promise for the "ran out of time, not because of a bug" case that Part 4 models so well. Neither is a redesign; both are text fixes.

## Findings

1. **[MAJOR — P-2, B-4]** Part 5's prose and its slide **still say "the program you just ran"** — the exact phrasing the Gate 1 fix was supposed to remove. `ch-timers-interrupts.ptx:1063` ("The program you just ran contains a line that Day 7 taught you to distrust"), `:1075` ("the timer code you just ran"), and slide `sl-day8-waitwhat` at `:1147` ("The code you just ran contains this line"). This directly contradicts `day8.json`'s own presenter note for Part 4 — *"Part 5 runs off the projected code, so a dark board doesn't strand anyone"* — and Part 4's rescue text, which promises *"nothing until Part 7 needs your own board."* A student who took the Part 4 rescue reads Part 5 and is told, in effect, *you did a thing you didn't do* — the exact "did the class move on without me" moment this review is meant to catch. Fix: reword all three instances to be state-neutral, e.g. "The polled program — yours if it's running, the projected copy otherwise — contains a line…". This is a global search-and-replace, not a structural change.

2. **[MAJOR → downgraded to MINOR on inspection, keep as a note — P-2]** Part 7 (`subsec-day8-code`, the crucial step) has a debugging ladder (`sl-day8-ladder`) but, unlike Part 4, no written line for the scenario where the hour simply ends before a student finishes the four TODOs — not because of a bug, but because they were slow. `day8.json` does chain the ladder slide directly into the (visible, badge-only) solution slide `sl-day8-solution`, so a student physically in the room that day will in fact see the completed code projected. But nothing in the book text says this will happen, so a student reviewing later, or absent that day, has no equivalent of Part 4's *"a known-good copy… will be available."* Suggest one sentence after the ladder, mirroring Part 4's rescue: something like "Out of time before the four blanks are filled? The complete file goes up on the screen next, and on Canvas after class — copy it and move on to Part 8 with a working reference."

3. **[MINOR — P-2]** The safety sentence ("nothing today can damage the board") lives only in the book's `sec-timers-day8` intro paragraph and in the title slide's `presenterNote` (spoken, never projected). For a student anxious for the whole hour, a single utterance at minute 0 is easy to miss or forget by Part 4 or 7, when it matters most. Suggest adding the line as *visible* text on the title or agenda slide, not just presenter's mouth, so it's something the room can glance back at.

4. **[MINOR — P-2]** `ch-timers-interrupts.ptx:1018-1020`: *"Get this program running before anything else today — everything that follows builds on top of it."* states the stakes several sentences before the reader reaches the ladder + rescue that defuses them (`:1037-1046`). For the reader this review is written as, that gap is where the stomach drops. Suggest folding the reassurance into the same sentence, e.g. "...everything that follows builds on top of it — and if it doesn't come up, there's a two-check rescue below, so nobody sits here alone."

## What works

- The Part 4 checkpoint (`sl-day8-polled-ladder`) is genuinely good: a visible (not instructor-only), two-rung ladder ending in an explicit known-good-file rescue, plus a presenter note giving the instructor a hard clock ("minute 32") to act on it. This is exactly the diagnostic path the persona needs, and it's on-screen for students, not buried in instructor notes.
- The misnamed-ISR failure mode is handled consistently and calmly everywhere it appears (Before Class Rule 1, Part 6 prose and slide, Part 7 ladder rung 3, TODO 3's comment): always named, always "still compiles and links, just never runs," never dramatized. TODO 3's comment also proactively tells the student to *copy, not type* the name — good defusing before the failure can even happen.
- Part 7's skeleton (`TODO 3`) literally restates the Part 5 clearing idiom inline (`TIM14->SR = ~TIM_SR_UIF;`), so a student who missed Part 5 (lookup activity, not board-dependent) can still complete the crucial step correctly.
- Both stretches (Part 7's 250 ms exercise, Part 8's asymmetric-blink challenge) are unambiguously marked optional in both book and deck ("Done early?", "for fun — nothing to submit", `presenterNote: "Genuinely optional; say so."`).
- Part 8's presenter note — *"if the clock has eaten this part, students still have everything they need from the book"* — is exactly the reassurance a student needs about the back half of the hour.
- No tone-of-delight language ("simply"/"just"/"obviously" used dismissively) found anywhere in the reviewed sections; the handful of "just"/"simply" hits are all the neutral "merely" sense describing symptoms, not framing the task as easy.

---

## learner-visual

## Verdict: PASS WITH CHANGES

The prose is disciplined about P-1/P-2/P-9/P-10, and the register figures that *were* rebuilt (`tim14_regmap_polled.svg`, `tim14_regmap_interrupt.svg`, `apbenr2_tim14en.svg`, `tim14_prescaler_timing.svg`, `adc_blinky_flow.svg`, and the `slide30/31/32` interrupt-execution progression) are genuinely good — legible, correctly annotated, captions match what's rendered. But three figures fail the "look at the render, not the source" test, and two abstract ideas central to the chapter's own motivation have no picture.

## Findings

1. **[MAJOR] B-11 / B-11a / P-11 — `fig-vector-table` (slide39_811bdd0f.png)**: The rendered crop shows a partial row cut off at the very top ("18 | – | – | – | Reserved | 0x0000_0088", sliced mid-cell) and, more seriously, **no header row at all** — no "Position / IRQ# / Type / Acronym / Description / Address" labels anywhere in the crop. The caption's central claim, "TIM14's interrupt is position 19," can't be verified from the image itself: the TIM14 row shows two bare numbers, `19` and `26`, and nothing tells the reader which column is "position." This is the exact figure anchoring `act-timer-vector-lookup`, the day's datasheet-literacy activity (P-11) — and it's used again later for `TIM14_IRQn`, which feeds the crucial step. Fix: re-crop to include the header row, and don't let the top data row bleed off the edge.

2. **[MAJOR] B-7 / P-12 — `fig-tim14-block` (tim14_block_annotated.svg)**: Caption says the highlight is "the prescaled clock input (CK_PSC into the PSC prescaler, **red**)... auto-reload register... **blue**." The render shows the opposite mapping: the **PSC prescaler box is outlined in blue** — the *same* blue as the Auto-reload register box, an unrelated register — while **red** is actually used on the *downstream* wire (`CK_CNT`, the prescaler's output into the counter), not on the `CK_PSC` input the caption names. A student trying to match the caption's three-color legend to the picture will see two boxes sharing one color (prescaler + auto-reload, both blue) and a red label sitting on the wrong side of the diagram. Fix: re-color so the PSC prescaler box itself is red, distinct from ARR's blue, or rewrite the caption to describe what's actually colored.

3. **[MAJOR] B-11a / P-12 — `fig-tim14-sr` (slide17_2c524508.png)**: This is a raw, low-resolution RM0490 scan with the access-type label ("rc_w0") printed in the manual's naturally tiny sub-caption font — and this is the single fact the whole Part 5 set-piece turns on (the deck's own presenterNote calls it "the day's set-piece... cut it WHOLE"). Every neighboring TIM14 register figure in this same chapter (`fig-tim14-regmap-polled`, `fig-tim14-regmap-interrupt`, `fig-apbenr2-tim14`) got the annotation/enlargement treatment with big colored callout boxes; this one, used one subsection earlier for the identical register family, did not. Projected from the back of a room, the one label everything hinges on is the hardest thing to read. Fix: rebuild with `pptx_annotate.py` (or a fresh highlight) boxing UIF and enlarging "rc_w0" the way the polled/interrupt regmap figures already do.

4. **[MINOR] P-4 — no timeline for the chapter's own founding contrast**: `subsec-cost-of-waiting` and `subsec-interrupt-mechanism` build the entire chapter on contrasting three strategies — blocking wait, polling, interrupt — but the contrast lives only in prose and one text-only email analogy ("stare at your inbox... check after every paragraph... wait for a ping"). No figure ever shows the three as parallel CPU-busy/CPU-free timelines, which is precisely the "sequence with no timeline" failure mode. A three-row bar diagram (busy-wait: solid bar for the whole delay; polling: a comb of short "ask" ticks; interrupt: one tick, then a long free bar) would make the chapter's thesis visible instead of argued.

5. **[MINOR] P-4 — `subsec-isr-rules` volatile mechanism has no diagram**: Why the compiler "cannot see" the ISR's write and can fold `if (timerElapsed)` into `if (0)` is explained in two dense paragraphs of pure prose — a genuinely abstract idea (compiler optimization reasoning about code it "sees" vs. code it doesn't) that a visual learner cannot get from text alone. A simple two-box diagram — `main()`'s loop box with a dashed boundary labeled "what the compiler sees," a `timerElapsed` box outside that boundary, and the ISR writing into it from outside — would make the *actual* mechanism (not just the fix) visible.

6. **[MINOR] S-3 / S-5 — `sl-day8-ladder` caption is an instructor cue, not a student line**: `<caption>Stays up for all of Part 7.</caption>` is pure staging instruction, not "what to notice." The deck already models the correct split one slide earlier — `sl-day8-polled-ladder` has a proper instructive `<caption>` *and* a separate `<note>` carrying the identical kind of staging instruction ("Checkpoint slide — if the room isn't mostly blinking by minute 32..."). `sl-day8-ladder` should move "Stays up for all of Part 7" into a `<note>` and give it a real student-facing caption instead.

## What works

The five-lines-of-init sequence (Part 3) has textbook P-8/P-9 scaffolding with a register figure per step. The `rc_w1`/`rc_w0` set-piece (Part 5) is a strong, well-sequenced P-5 observe→explain→fix arc backed by good slide captions ("Same puzzle as Day 7, opposite polarity — and the answer came off the page"). The normal-execution → function-call → interrupt-execution triptych (`slide30/31/32`) is exactly the kind of progressively-annotated figure family P-12 asks for, and reads cleanly at every stage. `fig-tim14-regmap-polled`/`interrupt` and `fig-apbenr2-tim14` are legible, correctly captioned, and consistent with each other.

---

## learner-firstgen-novice

## Verdict: PASS WITH CHANGES

The Day 8 draft has real craft in it — the reading builds timer arithmetic and the interrupt mechanism carefully, and the class hour pays off two things I was told to watch for (the ISR-register-vs-ISR-function collision, and resurfacing `volatile`). But there is one place where the draft still tells me a fact without giving me a way to act on it, and it happens to sit inside the step every presenter note in the deck flags as the one that must not be cut. That is a fixable gap, not a redesign — hence changes, not block.

## Findings

1. **[MAJOR] P-2, P-4 — the startup file is named but not reachable; this is exactly the crucial step.** `source/ch-timers-interrupts.ptx:1264-1271` and again in the TODO comment at `:1410-1412` (`"copy it from the startup file, don't type it from memory"`): *"the handler function is `TIM14_IRQHandler` — the project's startup file, `startup_stm32c031ctx.s`, lists every handler name and wires each into its vector-table slot. You will read that file, never edit it: find the name, copy it exactly."* I have never opened a `.s` file, I don't know what "the startup file" looks like, and nothing tells me which folder of my project it's even in. This is where I go quiet — not because the idea is hard, but because "find the name" assumes I already know where to look. It's worse than a normal gap because TODO 3 is literally the thing the deck's own presenter note calls "THE CRUCIAL STEP — never cut" (`assets/decks/day8.json:204`), and unlike Part 4's polled activity, Part 7's fault ladder (`sl-day8-ladder`) has no "still stuck, here's a known-good copy" escape valve for this specific step — rung 3 just repeats the requirement, it doesn't tell me where the file lives. **Fix:** give the startup file its own beat with a figure: a screenshot of the Project Explorer with the file's folder circled (the course already has this convention — `fig-exclude-from-build` in `ch-intro-blinky.ptx:1111` is an annotated Project Explorer screenshot; reuse the pattern), plus a crop of the file's actual content showing the line pattern to search for. Add the same figure reference to the matching slide (`sl-day8-vector`, `:1318-1326`), which currently only has bullet text.

2. **[MINOR] P-7 — the startup file's first encounter rides in on a clause, not a beat.** `:1259-1272` (and mirrored in `sl-day8-vector`) packs the RM row/position, the `IRQn` constant, the handler name, the brand-new startup-file concept, *and* the silent-failure warning into one paragraph. Every other first-encounter concept in this chapter (prescaler, ARR, NVIC, `volatile`) gets its own subsection or slide; the startup file — a file type and a workflow I've genuinely never touched — gets an appositive inside a sentence about something else. This compounds finding 1: fixing it with the figure from finding 1 and giving it one dedicated sentence/slide beat would resolve both at once.

3. **[MINOR] P-2 — `UIE` and `UIF` are a near-collision that doesn't get the same defusing the `ISR` collision got.** `sl-day8-dier` (`:1296-1303`) introduces `TIM_DIER_UIE` and in the same breath says "CEN and UIF keep their jobs" — two three-letter bit names, one letter apart, in different registers, introduced back to back. The chapter is explicitly careful about this kind of near-miss elsewhere (the vocabulary-guard slide for ISR-as-register vs ISR-as-routine, `:293`), but this one — which I think is just as easy to swap under time pressure — gets no equivalent callout. **Fix:** one clause the first time `UIE` appears: "UIE enables the request; UIF reports it happened — one letter apart, don't swap them."

4. **[MINOR] B-5 — one task bundles three physical actions.** `act-timer-int-t1` (`:1425-1432`): *"Add `blinkyTimerInt.c` to your project's `Src` folder. Then swap the build: ... exclude `blinkyTimerPolled.c` and include `blinkyTimerInt.c`."* That's add-file, exclude-old, include-new in one `<task>`. The exclude-from-build mechanic was taught with a figure back in `ch-intro-blinky.ptx` (Day 1x), so I've technically seen it — but that was many classes ago and this chapter doesn't cross-reference it. **Fix:** split into two tasks, and add `<xref ref="fig-exclude-from-build"/>` so I don't have to recall a multi-step IDE menu path from memory.

## What works

- Gate 1's ISR-register-vs-ISR-routine collision is genuinely defused, both in the reading (`:307-316`) and resurfaced on `sl-day8-mechanism` — I would not go quiet there.
- The `volatile`/flag pattern is properly resurfaced in class (`sl-day8-flag`, `:1328-1341`), not left to the reading alone, as demanded.
- Part 5 ("Wait — Was That Clear Wrong?") is a strong observe→explain→fix arc (P-5): it shows me code that contradicts what I was just taught, makes me commit to an answer, and only then sends me to RM0490 §1.2 to resolve it via a real datasheet lookup (P-11) rather than being told the answer.
- The four TODOs in `blinkyTimerInt.c` are well-scaffolded: TODO 1/2 are near-verbatim recall of lines shown moments earlier, TODO 3's *contents* are given explicitly (only the name is left to look up), and TODO 4 is split into 4a/4b/4c so declare/initialize/consume don't collapse into one blank.
- Reading-question feedback throughout is genuinely instructive, not scolding — every wrong-choice feedback explains the actual mechanism rather than just saying "no."
- Part 6's three-beat structure (mechanism resurfacing → DIER/NVIC/vector-lookup → volatile flag) matches the presenter note's own description exactly, and the deck order tracks the book order throughout with no forward jumps.

---

## expert-embedded-industry

## Verdict: PASS WITH CHANGES

## Findings

1. **[MAJOR] P-11 / B-11c — the "do-nothing default handler" claim is unverified and likely understates the real symptom.** `subsec-interrupt-mechanism` ("Get one character wrong and nothing complains — your function is simply never wired in"), `subsec-day8-interrupt-prog` (~line 1271, "the interrupt goes to a do-nothing default handler instead"), the slide `sl-day8-vector`, and the Part 7 diagnostic ladder (`subsec-day8-code`, ~1469-1472, and slide `sl-day8-ladder`) all describe a misnamed `TIM14_IRQHandler` as producing silence ("nothing complains," "just never runs"). On a standard CMSIS/ST startup file, `Default_Handler` is `b .` — an infinite loop. Once DIER's UIE and the NVIC line are correctly set (which the ladder checks *after* the name), the first genuine update event vectors into that loop and the CPU never returns: the whole program halts, not just the LED. That is a materially different, more useful fingerprint ("everything stopped dead the instant I turned the interrupt on, with no console output at all") than "not blinking," and it is exactly what a working engineer recognizes on sight. The chapter's own planning doc (`plans/day8.md`, "Flags for Petra / checker" item 1) already flags this as unverified because `startup_stm32c031ctx.s` is not in the repo — that flag is still open in this draft. **Fix:** pull the actual startup file (or confirm its `Default_Handler` behavior from the generated project), then rewrite the claim to state the true symptom — a hang, not silence — and move it to the top of the ladder as the highest-signal check, consistent with the chapter's own use of "freezes" in the Day 8 safety framing (line 681) which currently isn't connected to this scenario.

2. **[MAJOR] Habits-that-transfer — "the course driver keeps [`__disable_irq()`/`__enable_irq()` bracketing the ISR body], buying simplicity at no practical cost" overclaims a pattern students must unlearn.** `subsec-day8-interrupt-prog`, ~lines 1284-1294. Blanket-disabling global interrupts inside every handler *is* free here only because TIM14 is the system's sole active source at the (uniform) default priority. The moment a real system has a second interrupt at a different priority — which every one of these students will meet in their first job — this exact pattern silently adds the low-priority ISR's runtime to the worst-case latency of the higher-priority one, defeating the reason the NVIC has priorities at all. Stating it as "no practical cost" rather than "no cost *in this specific single-source design*" is precisely the kind of caveat-free habit a reviewer sends back. **Fix:** one bounding clause, e.g. "...harmless here because TIM14 is the only active interrupt source, all at the same default priority; once a system mixes priorities, disabling globally inside a handler is exactly what you don't want — don't carry this forward as a default habit."

3. **[MINOR] P-11 — the "assign a mask" idiom is correct and matches ST's own LL driver convention (`TIMx->SR = ~TIM_SR_UIF`, confirmed against `LL_TIM_ClearFlag_UPDATE`), but the chapter never names that the mask also writes 1s across bits the RM marks "reserved, must be kept at reset value."** No occurrence of "reserved" anywhere in the file (checked). This is a gap in exactly the habit the rubric asks about ("not clobbering reserved bits"): a sharp student — or a future reviewer — will reasonably ask "isn't writing 1 to a reserved bit against the manual's contract?" **Fix:** one sentence in `subsec-timers-ref-access-types` acknowledging that `= ~FLAG` also sets any reserved bits above the flag, that this is safe here (vendor-sanctioned, matches ST's own driver, silicon reserved bits are write-don't-care on this family), but that the reserved-bit contract is worth checking per-register rather than assumed.

## What works

- The rc_w0/rc_w1 set-piece (Part 5) is the strongest section in the chapter: genuine observe→explain→fix (P-5), a real, named RM lookup (§17.4.3 then §1.2, P-11), and the resulting idiom — clear by mask-assignment, access type is the authority — is not just pedagogically clean but is literally what ST's own LL driver does. This is a habit that survives contact with production code, and the chapter earns the right to assert it.
- The five-line init correctly differentiates *when* to `|=` (CR1, DIER — preserving other configuration bits) from *when* to plain-assign (PSC/ARR/CNT — pure value registers) from *when* to mask-assign (SR — clear-only). That distinction is usually where junior code goes wrong, and it's taught explicitly here.
- Vector-table fluency (position 19, `TIM14_IRQn`, `TIM14_IRQHandler`, "copy it, don't type it") is taught as a repeatable three-name trace off a named table (RM0490 §11.3, Table 40), not folklore — exactly the transferable skill this review is meant to protect.
- The RMW-can-be-interrupted argument is correctly bounded to one sentence and deferred to Day 9 rather than over-explained before students have felt it (P-5/scope discipline).
- Timer drift/jitter and reading CNT mid-run are rightly left out — nothing in this chapter's code reads CNT during operation or needs jitter-level precision, so raising either would be manufacturing rigor the lesson doesn't need.

---


## expert-rigor-hawk

## Verdict: PASS WITH CHANGES

The crucial step (polled → interrupt-driven TIM14 blink) is scaffolded to P-2 standard — naive/broken → skeleton with numbered TODOs → debugging ladder → full solution — and the timer arithmetic itself is taught with real rigor: `(PSC+1)(ARR+1)/f` is stated as a formula in the Reference section, the two minus-ones are explained as consequences of how the hardware counts (not "just remember"), and the 16-bit ceiling is enforced with a real number (65,535) at every point it matters. That part of the audit passes cleanly. But two specific places lose precision that the reference material (and the old deck) actually had, and one "genuine stretch" is mathematically unsound as worded, with no instructor answer to catch it.

## Findings

1. **[MAJOR] P-5 / B-6 / L-6 / P-11 — `subsec-interrupt-mechanism`, lines 254–287; Reference section.** "The machine state — the PC and certain general-purpose registers — is pushed onto the stack" (repeated in the `fig-function-call` caption) hedges exactly where the old deck's slide 32 image was precise, and the draft never recovers that precision anywhere, including the Reference section built for exactly this kind of lookup fact. For the Cortex-M0+, exception entry stacks a fixed 8-word frame — **R0–R3, R12, LR, PC, xPSR** (32 bytes) — documented in the ARM Cortex-M0+ Devices Generic User Guide, "Exception entry and return." This is as citable as any RM0490 register and belongs in this book by P-11's own standard. Worse, describing an ordinary function call as also "push[ing] the machine state... onto the stack" blurs the very distinction the section is building toward: on ARM, what a call saves is decided by compiler-generated prologue code, not hardware, whereas the interrupt's 8-word stacking is automatic and unconditional — that hardware-automatic property *is* "an interrupt is a function call hardware makes." As written, function calls sound equally automatic, so the contrast the analogy is supposed to deliver collapses.
   **Fix:** name the 8 registers at first use of the mechanism, and/or add a short "What Gets Stacked" fact box to the Reference section (P-3: depth added at the top, not required for the crucial step). Rewrite the function-call sentence to say the *compiler* decides what a call saves — so the interrupt's fixed, hardware-mandated frame reads as the new fact it is, not a repeat of the call analogy.

2. **[MAJOR] P-3 / P-10 — `act-timer-int-t6`, `sl-day8-ladder`, `day8.json`.** The stretch — "Toggle every 250 ms without touching PSC; then without touching ARR. Which change would survive a switch to a 48 MHz clock?" — fails against the chapter's own formula, `t = (PSC+1)(ARR+1)/f`. Config A (PSC+1=12000, ARR+1=250) and Config B (PSC+1=6000, ARR+1=500) both have product 3,000,000, and **both** degrade to exactly 62.5 ms at 48 MHz — neither survives, because the period depends only on the product `(PSC+1)(ARR+1)`, never on how it's split between the two registers. As posed, the question presupposes an asymmetric answer that does not exist under a literal reading. There is no instructor note or solution anywhere (checked `sl-day8-solution`, `sl-day8-challenge-solution`, and every `presenterNote` in `day8.json`) resolving which reading is intended, or confirming the arithmetic. A rigorous fast-finisher who actually works the algebra gets an answer that contradicts the question's framing — the opposite of a genuine stretch (P-3), and a bare P-10 violation regardless.
   **Fix:** either reframe explicitly — "Assume PSC is always re-derived from the actual clock to hold the tick at exactly 1 ms; under that convention only, which register's *value* needs to change when the clock changes?" — or ask the sharper question the algebra actually reveals: "why do both configurations degrade to exactly the same wrong period at 48 MHz?" Either way, write the answer down.

3. **[MINOR] P-10 — `sl-day8-challenge-solution`.** The T_on≠T_off "solution" slide calls `tim14_ms_interrupt_init(T_OFF)` but never defines the function — only a prose sentence above the code describes what it should contain. P-10 allows no exceptions, and this is exactly the kind of challenge where the fastest students deserve the most rigor, not a paraphrase.
   **Fix:** show the actual `tim14_ms_interrupt_init(uint16_t ms)` body in the code block.

4. **[MINOR] B-6 accuracy/completeness — `subsec-interrupt-mechanism`.** "The Cortex-M0+ provides four priority levels; this course leaves them at their defaults" is a genuine improvement over the old deck (which raised "what if two interrupts arrive at once?" and never answered it in the slide text) — but doesn't say what the default *is*. Since the course relies on defaults rather than teaching `NVIC_SetPriority`, the one clause that makes "default" checkable is missing, and it becomes load-bearing the moment two peripherals compete for the NVIC (Lab 5, Day 9 EXTI).
   **Fix:** "...at their default of priority 0, so simultaneous interrupts are resolved by IRQ number, not priority."

## What works

- The `(PSC+1)(ARR+1)/f` formula is stated in full in the Reference section with real bounds (65,535, both registers), and the two off-by-ones are taught as hardware facts ("the hardware divides by PSC+1, and counts from 0 through ARR inclusive"), not folklore — this is exactly what the audit asked for and it's there.
- The rc_w0/rc_w1 sequence (`subsec-day8-rcw0`) is a faithful, deepened observe→explain→fix (P-5): commit-before-lookup, RM0490 §1.2 lookup, then the general habit ("assign a mask, never read-modify-write") stated for both polarities and tied forward honestly to Day 9's race condition — this is a legitimate deferral, not a dodge, and matches the old deck's own speaker-note aside almost exactly.
- `__disable_irq()` inside the ISR is explained as belt-and-suspenders rather than left unmotivated — an improvement on the old deck, which showed the bracket without justifying it.
- The old deck's "what can you do with a background timer" breadth (sensor sampling, timestamping, steady-rate control loops, held outputs, pulse timing) is fully preserved and correctly mapped forward to PWM and the tachometer.
- The crucial step itself (Part 7) is properly scaffolded to P-2/P-9/P-10: skeleton with four TODO clusters, a four-rung debugging ladder that stays on screen, and a complete instructor solution.

---

## expert-class-logistics

## Verdict: PASS WITH CHANGES

The rev-2 plan's three Gate-1 BLOCKER fixes are genuinely present in both the `.ptx` and the deck — Part 4's 9-minute budget, two-rung ladder, and minute-32 checkpoint; Part 5 written to run off the projected code; and the reading's `fig-timer-sr` caption has in fact been neutralized (no rc_w0/rc_w1 in the reading section). The 65-minute sum is exact, the cut list is distributed at the correct decision points, and P-2/P-3 (crucial step + stretch) are both honored. But two concrete, checkable gaps would actively hurt the room during the never-cut crucial step, and one omission puts the recap at needless risk. None require re-architecting the plan — they're text fixes.

Running-clock check: 3 (settling) + 2 (Part 0) + 4 + 8 + 6 + 9 + 8 + 8 + 15 + 2 = 65, and Parts 0–4 alone sum to 3+2+4+8+6+9 = 32, exactly matching the "minute 32" checkpoint cited in both the plan and the deck's presenterNotes — the numbers are internally consistent, not just asserted. The 42-slide count against 65 minutes is plausible: slide density is low during the two long hands-on blocks (Parts 4 and 7, where wall-clock time is spent building/flashing, not flipping slides) and higher during lecture-mode Parts 3/5/6, which is the right shape.

## Findings

1. **[MAJOR — P-2, P-14, B-8] Part 7's build-config swap uses a different, wrong IDE term than the one the course already established, breaking self-diagnosis during the never-cut crucial step.** `ch-timers-interrupts.ptx:1427-1431` tells students to "swap the build: in the project's build configuration, exclude `blinkyTimerPolled.c` and include `blinkyTimerInt.c`," and ladder rung 1 (mirrored on the projected `sl-day8-ladder` slide) asks "Build clean? … included … excluded?" without naming any menu. But the course's actual, previously-taught click path — confirmed in `ch-intro-blinky.ptx:1106,1113,1129` ("Resource Configurations → Exclude from Build") and in the ground-truth old deck's own slide 48 ("**Update the resource configurations**: Exclude … Include …") — is a specific right-click menu that is *not* the same thing as "Build Configuration" (which in STM32CubeIDE/Eclipse selects Debug vs. Release, a different feature entirely). The draft keeps only the secondary term and drops the load-bearing one. All ~30 students perform this exact swap simultaneously in Part 7 (15 min, marked never-cut); a student who can't find "build configuration" as a file-inclusion control has no way to self-rescue via the ladder, and one instructor cannot walk 30 laptops through the correct menu individually. **Fix:** restore "Resource Configurations → Exclude from Build" verbatim in both the activity task and ladder rung 1 (and on the projected `sl-day8-ladder` bullet), matching Day 1/2's phrasing.

2. **[MAJOR — S-8, P-2] The Part 4 minute-32 rescue names a "known-good file location" three times but never operationalizes it.** `ch-timers-interrupts.ptx:1043,1053,1056` all say "grab the known-good copy" / "announce the known-good file location," inherited unchanged from the plan's equally vague "distribute the verified-good file location." No actual mechanism is specified — and if the fallback is "post another file to Canvas," it depends on the same Canvas/network path already named as the day's bottleneck (`Part 4`'s own presenterNote: "the Canvas download… is at least as failure-prone… as the Part 7 build-swap"), so it may not rescue the students it's meant for. This is exactly the kind of fallback that gets improvised badly under time pressure. **Fix:** pin down and write into the checkpoint `<note>` a concrete, pre-staged mechanism that doesn't re-use the failing channel — e.g., the instructor's laptop screen-shares a working build, or a USB stick is passed row-to-row, or the file is pre-loaded to a location named before class starts — so the instructor has a rehearsed action, not a phrase, at minute 32.

3. **[MAJOR — S-8] The recap has no protection, and has grown past the plan's own scope, in the one part explicitly marked sacrificial.** The plan calls for a "one-sentence recap" specifically so that losing Part 8 to the clock "costs nothing" (homework is self-serve). The deck's `recap` slide (`assets/decks/day8.json`, final entry) instead carries 6 substantive bullets covering the whole day's content — and, uniquely among all 9 section/part entries in this deck, it is the *only* one with no `presenterNote` at all. If Part 7 runs its full protected 15 minutes (as mandated) and any earlier part ran even slightly long, the recap — "the part that consolidates the learning" — is what silently disappears, with no textual signal telling the instructor what to preserve if rushed. **Fix:** either trim the slide back to one or two sentences (move the rest to book-only prose) or add a `presenterNote` with an explicit one-line fallback ("if under a minute: say only …") mirroring the cut-rule treatment every other section already gets.

4. **[MINOR — Gate 1's "fully self-serve" directive] Homework due date is vaguer than the self-serve standard.** `ch-timers-interrupts.ptx:1586-1588` says "Due before next class, submitted per the Canvas assignment" — workable, but weaker than the old deck's slide-title framing ("Homework for Tuesday:"), and "self-serve" should mean a student who never hears Part 8 spoken still knows precisely when it's due. **Fix:** name the actual next class day/date on the slide, not just "next class."

## What works

- Part 4's re-budget (9 min), two-rung ladder, and minute-32 checkpoint are faithfully present in both `ch-timers-interrupts.ptx` and `assets/decks/day8.json`, and — notably — the checkpoint trigger is repeated redundantly on the ladder slide's own `<note>`, not just in the section-entry `presenterNote`, so it's visible at the actual moment of decision (~6 minutes into the part), not just at its start.
- Part 5 genuinely runs off the projected polled code (no student-board dependency), the safety line ("nothing today can damage the board") is present verbatim, and every cut-list item from the plan (Part 1→2 min, Part 2 refresher→show of hands, Part 6a→30 s, never-cut Part 5/7) is carried into the corresponding section's `presenterNote`.
- Part 7's 15-minute budget, never-cut framing, and the "under 12 minutes: TODOs 1-2 on the projector" fallback are present and match the plan exactly; the small stretch is correctly routed to fast finishers on the last line of the ladder slide that stays up for all of Part 7 (P-3).
- S-2 writing-room flags (`room: true`) are present on all three plan-mandated commit moments (Part 2 prediction, Part 5's yes/no commit, Part 6b's vector-table guess), plus the two datasheet-lookup activities.
- L-1 is clean throughout — no grouping/timing language appears in student-facing book or slide text; all timing lives in `presenterNote`.
- Part 4/Part 7's Canvas-download and project-copy instructions otherwise match the old deck's slides 24 and 48 phrasing closely (project copy, file placement, build/run).

---

## expert-continuity-auditor

## Verdict: PASS WITH CHANGES

The Day 8 draft delivers its crucial step cleanly, keeps BSRR and the ISR/GPIO race genuinely unspent, cashes the Day-7 `rc_w1` plant, and keeps the Before-Class reading free of the `rc_w0`/clearing-comparison spoiler as Gate 1 required. The issues below are refinements, not structural failures — none of them block the crucial step or introduce an untaught dependency inside Day 8 itself.

## Findings

1. **[MAJOR] B-3 — Gate-1's own unresolved verification flag shipped anyway.** `plans/day8.md:265-270` (Flag 1) explicitly required confirming the real misnamed-ISR symptom against `startup_stm32c031ctx.s` before the diagnostic ladder or reading-question feedback asserted it. That file is still not in the repo (confirmed by search), yet the draft ships the claim in three places: `rq-volatile`'s distractor feedback ("your function is never wired into the vector table and so never runs at all," `ch-timers-interrupts.ptx:596-601`), Part 7's ladder rung 3 ("the handler just never runs," `:1469-1472`), and the prose at `:1269-1271` ("the interrupt goes to a do-nothing default handler"). All three describe a *silent* failure. Standard ST CMSIS startup files alias unhandled vectors to a `Default_Handler` that is conventionally `b .` — an infinite loop — which would freeze the whole board on the very first stray TIM14 update, not leave everything else running with just a dark LED. That is a materially different symptom for a ladder 30 students will use live. Fix: locate the actual startup file in the student project template and verify the observed symptom before this ships, per the plan's own instruction.

2. **[MAJOR] B-8/P-5 — the Part 5 "reveal" is pre-empted by Day 7's own reference material.** `plans/day8.md:163-168` mandates "Nothing before Part 5 may explain `rc_w0` or compare the two clears," and Day 8's own Before-Class reading (`subsec-timer-hardware`, `:148-155`) correctly honors this. But `ch-adc.ptx:1343-1359` (`insight-adc-rc-w1`, part of the Day 7 material that is already live and not being revised here) already defines `rc_w0` generically: *"`rc_w0` for the opposite convention, cleared by writing 0."* A student who read that insight box on Day 7 arrives at Day 8's "commit before the reveal" activity (`act-timer-rcw0-lookup`) already holding the vocabulary the set-piece is built to withhold. This doesn't break the activity (applying the label to a *new* register is still the real work), but it weakens the "observe → explain" surprise Gate 1 fought to protect. Fix: either trim the Day-7 insight box to `rc_w1` only (deferring the generic `rc_w0` mention to Day 8), or reframe Part 5's "commit" prompt so its payoff doesn't depend on `rc_w0` being unheard-of.

3. **[MINOR] P-13 boundary — the motor/tachometer forward-pointer exceeds the plan's ration.** `plans/day8.md:257-259` bounds this note to "**one** forward-pointing sentence in the recap, no more." The draft plants it four times: Part 1 prose (`ch-timers-interrupts.ptx:697-701`), the Part 1 slide (`sl-day8-captivity`, `:709-711`), the closing Reference subsection which additionally names the new terms "output compare"/"input capture" (`subsec-timers-ref-family`, `:2021-2027`), and the deck's recap slide (`assets/decks/day8.json:279`). None is individually damaging, but cumulatively it drifts past the plan's explicit ration. Consolidate to the recap as specified, or explicitly re-scope the constraint if the extra mentions are wanted.

4. **[MINOR] Plan fidelity — a Gate-1 "fix" is missing from the shipped draft.** `plans/day8.md:217-218` and the "What Gate 1 changed" majors list (`:306-307`) both call for glossing "busy-wait loop" vs. "spin loop" once, and record it as already applied. The string "spin loop" does not appear anywhere in `ch-timers-interrupts.ptx` (confirmed by search) — the defusing was dropped between plan and draft. Low risk (no one text I found actually uses "spin loop" against the student), but it's a specific commitment the plan claims was already satisfied.

5. **[MINOR] Naming exposure — `rc_w0`/`rc_w1` named at the chapter's very top.** Objective 3 (`ch-timers-interrupts.ptx:35-37`) names both access types before the Before-Class reading or Part 5 even begin. This is verbatim from the Gate-1-approved plan (`plans/day8.md:21-23`), so it isn't fresh drift, but it sits in direct tension with the same plan's "nothing before Part 5" rule (`:163`). It doesn't disclose which register has which polarity, so the actual reveal survives — flagging only because it's the most visible early appearance of the exact terms the set-piece is built around.

## What works

- P-1: no untaught forward references found. `subsec-day2-delay-ms` (`ch-intro-blinky.ptx:1371`), `subsec-processor-arch` (`:1958`, register file/SP/LR/PC), and `subsec-adc-day7-atomic` (`ch-adc.ptx:1257`) all resolve correctly and match the context claimed.
- CHAPTER_PROCESS deferred topic: BSRR and the ISR/GPIO race are genuinely unspent — the Part 5 race sentence (`:1140-1144`) is one bounded, GPIO-agnostic sentence, and the homework's ISR toggles `GPIOA->ODR` while `main()` never touches it, so it is race-free by construction, exactly as required.
- B-6: driver code matches ground truth exactly — `pa0_adc_init`/`start_conversion`/`adc_read` and the `ADCPot.c` structure reproduce `ch-adc.ptx` verbatim; the polled driver ships `&= ~TIM_SR_UIF` as the plan's B-6 note requires.
- P-11: the datasheet thread continues rather than restarts — RM0490 usage (§17.4.3, §1.2, §11.3 Table 40) builds on the Day 7 RM0490 thread rather than reintroducing "check the datasheet" generically.
- P-13: the chapter is not lab-collapsed — Parts 1-7 are substantive teaching; Lab 5 is checked only as a downstream constraint (Part 8 + Hand-offs), matching Lab5_ES28.pdf's actual requirements (ADC-with-timer-interrupt, no BSRR needed).
- Naming (L-5/L-6): `GPIO_OUTPUT`, `GPIO_MODER_MODE5_Msk`, `RCC_APBENR2_*EN`, `TemplateProject`/`Src` conventions all match prior chapters exactly.

---

## expert-cognitive-load

## Verdict: PASS WITH CHANGES

All four Gate 1 structural demands are implemented: Part 6 is genuinely split into three separated beats (6a mechanism, 6b DIER→NVIC→vector-table, 6c flag), the vector-table lookup is its own predict-then-verify activity (`act-timer-vector-lookup`, guess-position then verify), the `volatile`/flag resurfacing in Part 6c is a real explanatory beat (not a bare `<xref>`), and the reading→class handoffs I was asked to spot-check (period arithmetic, interrupt mechanism, volatile/flag) all resurface correctly rather than re-teaching or merely asserting. Remaining issues are scoped and fixable without restructuring.

## Findings

1. **[BLOCKER] B-3 / B-11c — Gate 1's Flag 1 is still open, and the wording chosen in its place is very likely wrong, and it's repeated four times.** Flag 1 said: "Confirm the file's exact path... and the actual observed symptom before the diagnostic ladder and the reading-question feedback state it." `startup_stm32c031ctx.s` still isn't in the repo (confirmed via grep — only this chapter and the plan mention it), so nothing was verified. The draft nonetheless asserts a specific, benign-sounding symptom in four places: the Part 6 book prose ("your function just never enters the table, and the interrupt goes to a do-nothing default handler instead," line 1270-1271), `sl-day8-vector` (line 1324, same phrasing), the Part 7 diagnostic-ladder prose ("the handler just never runs," line 1472), and `rq-volatile`'s distractor feedback ("never wired into the vector table... never runs at all," lines 597-599). Standard ST/CMSIS startup files implement `Default_Handler` as `B .` — an infinite loop. If UIE and the NVIC line are both correctly enabled (as they would be if only the ISR *name* is wrong) but no function occupies `TIM14_IRQHandler`'s slot, the very first update event vectors into that infinite loop and the **entire board freezes** — nothing prints, nothing blinks, everything stops — not "the handler just never runs" while the rest of the program continues. Tellingly, the same file already uses the correct "hangs" language for a different scenario (`rq-isr-short`, line 556: "An ISR that never returns simply hangs the rest of the program"), so the softer claim for the misnamed-handler case looks like an unverified guess rather than a checked fact. This is exactly the failure mode B-11c warns about (an authoritative-sounding, unverifiable classroom/hardware claim) and it sits at the single highest-stakes diagnostic rung for the crucial step — an anxious student debugging a real freeze, told to expect silence instead, will misdiagnose. **Fix:** bench-verify the actual symptom (or pull it from the CMSIS startup file used by the toolchain) before this ships, and make the four passages consistent with whatever is actually observed.

2. **[MAJOR] P-7 / S-7 / S-9 — `sl-day8-vector` (and its paired paragraph, lines 1259-1272) stacks too many new named things into one slide, right where the crucial step is most failure-prone.** In one slide, immediately after the DIER bit and `NVIC_EnableIRQ()` were each just introduced, students receive: the vector-table row/position, the `TIM14_IRQn` constant *and* the device-header concept behind it, the `TIM14_IRQHandler` name *and* the startup-file artifact behind it, and the near-miss failure consequence — four bullets, each a genuinely new fact, on one slide, in a beat budgeted ~4 minutes. The predict-then-verify activity only covers the *first* of these (guessing the position); the other two names arrive as plain exposition with no separated moment of their own, even though `TIM14_IRQHandler` is precisely the fact the Part 7 ladder identifies as the most common point of failure. **Fix:** split into two slides — (a) the row + `TIM14_IRQn`, which is what the predict-verify activity just produced; (b) the handler name + startup file + "read, never edit, copy don't type" + the failure consequence, giving the highest-stakes fact of the day its own beat instead of bullet 3 of 4.

3. **[MINOR] B-11b — two Day 8 subsections open on an unnamed referent, unlike the Day 7 exemplar's fully self-contained Part openers.** Part 3 opens: "Turning **the design** into a running timer takes five register writes..." (line 800-802) — "the design" has no antecedent in the sentence or title for a reader landing directly on this page. Part 7 opens: "**Now assemble it.** The skeleton below is the polled program with its heart moved..." (line 1346-1348) — "it" is likewise unnamed. Compare Day 7's Part 4a, which opens self-contained via the `analogRead()` analogy with no dependency on a prior part. **Fix:** name the subject in the first sentence, e.g. "Turning the (prescale, count) pair chosen in Part 2 into a running timer..." and "Now assemble `blinkyTimerInt.c`. The skeleton below is..."

4. **[MINOR] Reading hand-off gap against the approved plan.** `plans/day8.md`'s Hand-offs section explicitly requires: "Gloss the vocabulary once: Blinky's delay was named a busy-wait loop in Days 1-2 — 'spin loop' is the same thing; use busy-wait consistently." The string "spin loop" does not appear anywhere in the chapter — the reading (`subsec-cost-of-waiting`) only uses "busy-wait loop." This is a small, checkable drift from the approved plan, not a load problem in itself, but worth closing so a student who has heard "spin loop" elsewhere isn't left wondering if it's a different thing. **Fix:** add the one-clause gloss where `subsec-cost-of-waiting` first defines "busy-wait loop."

## What works

The reading→class handoffs specifically named for spot-check are solid: `sl-day8-arithmetic` refreshes the reading's *exact* 1 s worked example (not the 500 ms target) before asking for transfer, matching the "transfer, not recall" design in the plan; `sl-day8-mechanism` resurfaces the reading's interrupt figure in ~90 s and adds only the two vocabulary defusings (ISR-the-register vs. ISR-the-routine; `attachInterrupt()`) without re-deriving the mechanism; `sl-day8-flag` condenses Part 6c's volatile beat rather than re-teaching it from scratch, and the earlier fictional "each TODO taught in Part 6" claim is now honest in substance (TODOs 1-3 taught fresh in 6b, TODO 4 explicitly resurfaced in 6c). Scaffold fading across the day (given `blinkyTimerPolled.c` → four-blank `blinkyTimerInt.c` skeleton → unscaffolded homework) is well-calibrated, and the TODO comments are genuine lifelines rather than spoilers (TODO 3's Part-5 callback line is deliberate; TODO 4's Socratic prompts withhold the answer). The `fig-timer-sr`/rc_w0 pre-emption BLOCKER from Gate 1 is fully resolved — no access-type language appears anywhere in the Before Class section. The Part 4 checkpoint-and-rescue mechanism and the persistent Part 7 ladder are both present and correctly sequenced (P-6 activity-before-reveal is honored throughout: Part 2, Part 5, and Part 6b all commit before revealing).

---

## checker-technical-accuracy

I have completed verification. Full working notes and renders are in the scratchpad; findings below.

## Verdict: BLOCKER

Linter is clean (`python3 scripts/check_rules.py source/ch-timers-interrupts.ptx` → `0 error(s), 0 warning(s)`, exit 0; no `check-rules: allow` directives present, none needed). All 23 image paths resolve, all 8 slide `ref=`s and all `xref`s resolve (three cross-file: `subsec-day2-delay-ms` → ch-intro-blinky.ptx:1371, `subsec-processor-arch` → ch-intro-blinky.ptx:1958, `subsec-adc-day7-atomic` → ch-adc.ptx:1257). All 42 deck entries in `assets/decks/day8.json` point at ids that exist. The blockers are all hardware/figure claims.

### 1. [BLOCKER] L-6 / B-6 — `source/ch-timers-interrupts.ptx:807-809`: TIM3's clock-enable bit is **not** in `RCC_APBENR2`

Claim as written: "All five timers live on the APB bus, and their enable bits are in `RCC_APBENR2` — the same register where you enabled the ADC's clock on Day 7".

Source checked: RM0490 §5.4.13 (`RCC_APBENR1`, offset 0x3C) — **TIM3EN is bit 1 of APBENR1**. §5.4.14 (`RCC_APBENR2`, offset 0x40) contains TIM1EN (11), TIM14EN (15), TIM16EN (17), TIM17EN (18), ADCEN (20). Confirmed a second way: the figure printed immediately below this sentence (`apbenr2_tim14en.svg`, rendered) shows **TIM3EN sitting in the 0x3C APBENR1 row**, directly contradicting the sentence above it.

Correction: "All five timers live on the APB bus. TIM1, TIM14, TIM16, and TIM17 are enabled in `RCC_APBENR2` — the same register where you enabled the ADC's clock on Day 7; TIM3's enable bit is one register over, in `RCC_APBENR1`." (The slide `sl-day8-reg-clock`, line 894, says only "all five timers live on the APB bus" and is correct as written — do not change it.)

### 2. [BLOCKER] B-6 / L-6 — `source/ch-timers-interrupts.ptx:1163` (and 1114-1117, 2005-2007): the read-modify-write mechanism is described wrongly, and the Reference section generalizes the error into a rule

Claim as written (slide `sl-day8-sr-rcw0`): "the read-modify-write **writes 1s to every other flag** — and here, a written 1 does nothing."

Source checked: the operation is `SR = SR & ~1`. Bits that read 1 are written back as 1; **bits that read 0 are written back as 0**. Per RM0490 §1.2, `rc_w0` means "Software can read as well as clear this bit **by writing 0**." So the write-back sends the *clearing* value to every other flag that happened to be clear at the read. TIM14_SR's other flags are CC1IF (bit 1) and CC1OF (bit 9), both `rc_w0` (RM0490 §17.4.3, verified in the PDF and in `slide17_2c524508.png`). Note that ch-adc.ptx:1305 gets the analogous Day 7 statement *right* ("puts a 1 into every status bit that happened to be **set** when the read occurred") — Day 8 dropped the qualifier.

This also makes the race real rather than hypothetical: if hardware raises CC1IF (or UIF itself) between the read and the write-back, the 0 written into that bit clears it and the event is lost. The old deck's own speaker note on slide 18 says exactly this: *"the &= solution could still suffer from a race condition if another bit got modified via an interrupt in the middle of this operation."* The chapter drops the mechanism and keeps only a vague forward-reference ("a read-modify-write can be interrupted partway through", line 1139-1143).

Worst instance is the Reference section, line 2005-2007: "`&= ~` **happens to be harmless on `rc_w0` bits** and is destructive on `rc_w1` bits". That is false as a general rule and students will carry it into TIM3 (four live `rc_w0` CCxIF flags, RM0490 Table 71) in the motor labs.

Correction:
- Line 1163 → "the read-modify-write writes back a 1 to every flag that was already set — harmless here, because a written 1 does nothing — **and a 0 to every flag that was clear, which on an `rc_w0` register is the *clear* command.**"
- Line 1114-1117 → add "…and 0s to every bit that read as 0."
- Line 2005-2007 → "`&= ~` is destructive on `rc_w1` bits, and on `rc_w0` bits it is safe only as long as no other flag in the register is raised between the read and the write-back."

### 3. [BLOCKER] B-6 / figure — `source/ch-timers-interrupts.ptx:139-145`: `fig-tim14-block`'s caption misidentifies the signal and the colour coding

Claim as written: "…the timing core highlighted: **the prescaled clock input (CK_PSC into the PSC prescaler, red)**, the 16-bit counter (CNT, green), and the auto-reload register … (blue)."

Source checked: rendered `assets/images/Day08-Interrupts/tim14_block_annotated.svg` (Chrome headless, native 1497×897). In the artwork:
- **red** = the arrow on **CK_CNT** (prescaler output → counter) plus the red text "Prescaled clock input";
- **blue** = the CK_INT → Trigger Controller → **CK_PSC** → PSC prescaler path **and** the Auto-reload register box + "Auto-reload (upper limit)";
- **green** = the CNT counter box + "Counter".

Also a hardware error independent of the colours: per RM0490 Figure 165 and §17.4.9 ("The counter clock frequency CK_CNT is equal to f_CK_PSC / (PSC[15:0] + 1)"), **CK_PSC is the un-prescaled clock going *into* the prescaler; CK_CNT is the prescaled clock.** Calling CK_PSC "the prescaled clock input" inverts the signal path the chapter spends a whole subsection teaching.

Correction: "…the timing core highlighted: the clock path into the prescaler (CK_INT through the trigger controller to CK_PSC, blue) and the auto-reload register that sets the counter's upper limit (also blue); the **prescaled** counter clock CK_CNT (red); and the 16-bit counter CNT (green)."

### 4. [BLOCKER] B-6 / figure — `source/ch-timers-interrupts.ptx:203-214`: `fig-prescaler-timing` asserts two things the artwork whites out, and three annotations point at blank space

Claims as written: "When the counter reaches the auto-reload value it **wraps to 0 and the update event (UEV) fires**. A new prescaler value written mid-period … takes effect only at the next update event — here the division changes from 1 to 4, **visible in the slower CK_CNT afterward**."

Source checked: rendered `tim14_prescaler_timing.svg` and extracted its embedded base64 PNG. The embedded source PNG *is* the complete RM0490 Figure 167 (counter register F7…FC → 00 → 01, a UEV pulse, a Prescaler-buffer row, and CK_CNT visibly slowing). But the SVG paints two opaque white rectangles over it (`<rect x="818.2" y="67.9" width="452.8" height="659.7" fill="#FFFFFF"/>` and `<rect x="779.7" y="79.8" width="59.1" height="659.7" fill="#FFFFFF"/>`). These erase the entire right-hand ~40% of every row except the bottom "Prescaler counter" row. In the published figure there is **no wrap to 00, no UEV pulse, no slowed CK_CNT, and no Prescaler-buffer row** — and the blue annotations "counter reaches auto-reset value" and "new prescaler value takes effect" point at empty white.

Correction: remove the two white `<rect>`s (or shrink them so only the intended element is hidden), then re-check the caption against the restored artwork. The caption's *physics* is correct per RM0490 §17.3.1 ("It can be changed on the fly as this control register is buffered. The new prescaler ratio is taken into account at the next update event") — only the description of what is visible is wrong.

### 5. [MAJOR / UNVERIFIED] B-11c / P-11 — `:1271`, `:1324`, `:353-355`, `:1469-1472`, `:1516`: "do-nothing default handler" almost certainly understates the symptom, and cannot be verified from any source in this repo

Claim as written: "A name that is even one character off still compiles and still links — your function just never enters the table, and the interrupt **goes to a do-nothing default handler** instead." Ladder rung 3: "A near-miss name builds and links without a single warning; **the handler just never runs.**"

Source checked: `startup_stm32c031ctx.s` is **not in the repo**. The weak-alias/link behaviour ("compiles and links, your function is never wired in") is standard CMSIS/ST and safe to state. The **behaviour of `Default_Handler` is not**: on every ST startup file I know it is `Default_Handler: Infinite_Loop: b Infinite_Loop`. If that holds here, then with UIE and the NVIC line correctly set (which the ladder checks *after* the name), the first update event vectors into an infinite loop with UIF never cleared and the **whole program stops dead** — no LED, no `printf`, nothing — which is a far more distinctive fingerprint than "not blinking". `plans/day8.md` "Flags for Petra / checker" item 1 already flags this as open; it is still open.

Correction: obtain the actual startup file from a generated student project, confirm `Default_Handler`, then replace "do-nothing default handler" / "just never runs" with the true symptom, and promote it in the ladder. Do not ship "do-nothing" — it is the one wording that is wrong under both possible behaviours (either it hangs, or, if the NVIC line is off, nothing is dispatched at all and there is no "default handler" involved).

### 6. [MAJOR / UNVERIFIED] L-6 — `:820-822` and `:893`: "writes have no effect and reads return zero" is not in RM0490

Source checked: searched all 825 pages of RM0490 for statements about accessing a peripheral whose clock is gated. §4.3.1 describes peripheral clock gating as a power measure; **nothing in RM0490 specifies the bus response to a register access with the clock off.** (RM0490 *does* document "reads return 0" for specific write-only registers — GPIOx_BSRR p.157, EXTI_SWIER p.225 — which shows ST states this explicitly when it means it.) The Day 7 chapter uses the safer wording, ch-adc.ptx:815: "needs its own clock enabled before its registers respond."

Correction: either soften to Day 7's wording ("until TIM14EN is set, TIM14's registers do not respond"), or, if you want to keep the concrete claim, cite an observed debugger session — mark it as an empirical observation, not a manual fact.

### 7. [MAJOR] B-6 — `:1692-1736`: the T_on≠T_off solution drops the driver's `#include "tim.h"` and supplies no prototype for `tim14_ms_interrupt_init()`

Driver (mined deck slide 52) includes `"tim.h"`; the chapter's listing calls `tim14_ms_interrupt_init(T_OFF);` with no declaration in scope — an implicit-function-declaration constraint violation (warning under GCC's default C11 settings, hard error under newer toolchains). This is an instructor solution slide; it should compile.

Correction: restore `#include "tim.h"`, or add `void tim14_ms_interrupt_init(uint16_t ms);` above `main()`.

### 8. [MAJOR] L-6 — `:1996-1999`: the `rs` row is attributed to RM0490 §1.2 but is not §1.2's definition

RM0490 §1.2, p.35 verbatim: "**read/set (rs)** — Software can read as well as set this bit. **Writing 0 has no effect on the bit value.**" §1.2 says nothing about who clears an `rs` bit. Correction: "`rs` — Read; software can set by writing 1; **writing 0 has no effect** (so software cannot clear it this way — ADEN and ADSTART are both `rs`)."

### 9. [MAJOR] P-10 / B-3 — `:1448-1455` and `:1518`: the fast-finisher question has no correct answer as posed, and no instructor solution anywhere

Recomputed: change A (ARR_FACTOR 500→250, PSC 12000) at 48 MHz → 62.5 ms. Change B (PSC 12000→6000, ARR 500) at 48 MHz → 62.5 ms. Both wrong by 4×. **Neither survives** — the period is (PSC+1)(ARR+1)/f and both factors are clock-relative. Correction: either reword to the defensible question ("Neither survives — why not, and which single number would you change to fix it?") or drop the third clause; and record the answer on the instructor solution slide.

### 10. [MINOR] `:1630`: "4,000,000 cycles = PSC × ARR" contradicts the chapter's own PSC/ARR convention (as-written values 3999 × 999 = 3,995,001). Correction: "4,000,000 cycles = prescale factor × count." (All other homework arithmetic verified correct.)

### 11. [MINOR] `:691`: "its CPU is doing nothing a thousand times per millisecond" — at 12 MHz it is 12,000 cycles per millisecond. Reword or drop the figure.

### 12. [MINOR] `:1262-1264`: "the device header defines one such constant per row" — Table 40 has Reserved rows with no `IRQn_Type` constant. Reword to "one per *populated* row."

### 13. [MINOR] `:1291`: "holds same-priority interrupts pending" — ARMv6-M holds same-**or-lower**-priority exceptions pending; higher preempts. Say "same or lower priority."

### 14. [MINOR] `:1130` and `:1988`: `REG = ~FLAG` writes 1s into Reserved bits ("must be kept at reset value" per §1.2). The idiom is the driver's own and works on ST timer SRs — keep it, but add one clause acknowledging the reserved-bit question.

### 15. [MINOR] `:1641`: the homework solution elides the three ADC prototypes that `ADCPot.c` carries; the listing calls all three. Keep the three prototype lines so the solution compiles as printed.

### 16. [MINOR] `:201`, `:734`: "exactly one second" / "exact" — exact in counts; the HSI48 RC oscillator is 47.92-48.40 MHz (datasheet Table 41) ±1% over temperature. One honest sentence would cost nothing.

### 17. [MINOR] Build integrity — no Day 8 starter files in the repo. `assets/starters/` contains only `ADCPot.c`; the chapter references `blinkyTimerPolled.c` and the `blinkyTimerInt.c` skeleton as Canvas artifacts. Day 7 set the precedent of keeping the handed-out file in `assets/starters/`. Two files are missing.

### 18. [MINOR] `:863`: "The TIM14 register map (RM0490 Table 73)" — the figure shows only offsets 0x00-0x10. Say "An excerpt of the TIM14 register map."

## Verified-correct highlights

- **Every register fact in the Reference table** (RM0490 §17.4): CR1 0x00 CEN bit 0; DIER 0x0C UIE bit 0; SR 0x10 UIF bit 0 `rc_w0`; CNT 0x24; PSC 0x28; ARR 0x2C. Table 73 and Figure 165 numbers correct.
- **Every vector-table claim** (§11.3 Table 40): TIM14 = position 19, 0x0000_008C; TIM16 = 21; TIM17 = 22; TIM1 = 13/14; TIM3 = 16. Four priority levels (§11.1).
- **`rc_w0`/`rc_w1` definitions** match §1.2 verbatim; TIM14_SR bit inventory (UIF 0, CC1IF 1, CC1OF 9, all rc_w0) confirmed.
- **All arithmetic** in Parts 2/4/8 and the reading questions verified correct, every −1 convention consistent.
- **The ARR-on-the-fly premise is sound**: ARPE=0 at reset (CR1 reset 0x0000), so the mid-flight ARR write takes effect immediately; the state machine produces 200 on / 800 off as claimed. Worth one sentence: the trick works *because* ARPE is 0.
- **The `__disable_irq` claim is substantively right** (see minor 13 for wording).
- **Code fidelity to the driver is otherwise excellent**: polled and interrupt listings match mined slides 25/42/47 line for line, including `&= ~` in the polled loop, `= ~` in the ISR, `volatile int timerElapsed`, and `return 1;`. Macro names CMSIS-correct throughout.
- **Other figures check out against captions** (rendered): fig-tim14-sr, fig-vector-table, fig-tim14-regmap-interrupt, fig-tim14-psc-arr, fig-counter-block, fig-interrupt-execution, fig-nvic-block, fig-adc-blinky-flow. The CSDN watermark is **gone** from nvic_block_diagram.png — that flag can be closed.
- **Classroom/continuity claims check out**: Lab 2's countdown game (Lab2_ES28.pdf §3.2); Lab 5 §3.2.1 is literally "ADC with timer interrupt"; TemplateProject/Canvas/build-swap steps match deck slides 24/48; the startup filename is sourced to deck slide 41's speaker note.

## Unverifiable

- **`Default_Handler` behaviour on a misnamed ISR** — needs the real startup file or a bench observation from Petra. Also confirm the exact filename: CubeIDE normally emits `startup_stm32c031c6tx.s` for this part; the chapter and old deck say `startup_stm32c031ctx.s`.
- **"Writes have no effect and reads return zero" with the clock off** — not documented in RM0490; needs a debugger observation.
- **`TIM14_IRQn == 19` / `TIM14_IRQHandler` weak symbol** — needs `stm32c031xx.h`/`ES28.h`, not in repo. Standard and almost certainly right; the chapter never prints the numeric value.
- **The two promised Canvas artifacts** (`blinkyTimerPolled.c`, skeleton `blinkyTimerInt.c`) do not exist in `assets/starters/` yet.
- **`delay_ms()`'s implementation** — if SysTick-interrupt-based, nothing breaks (all priorities equal), but unconfirmed; `ES28.h` not in repo.

---

# Committee synthesis (committee-synthesizer)

[Full synthesis applied 2026-07-27; the prioritized change list below was executed
against the draft. Items marked "escalate" remain open for Petra.]

Verdict: not ready for Petra, but close — failures in the ink, not the
architecture. 5 must-fix BLOCKERs (TIM3/APBENR1; the rc_w0 read-modify-write
mechanism described backwards and generalized into a false Reference rule; two
figure/caption contradictions incl. white-rect occlusion of the prescaler
timing artwork; the unverified misnamed-ISR symptom), 7 further MAJORs, a batch
of checker minors, and ~19 should-fix items. Escalations to Petra: (1) bench-run
the misspelled-handler symptom + confirm startup filename + supply the
project-tree screenshot for fig-startup-file; (2) supply
assets/starters/blinkyTimerPolled.c and blinkyTimerInt.c (and ideally ES28.h);
(3) Day-7 insight-box rc_w0 trim — recommendation: leave Day 7 alone; (4)
confirm the minute-32 rescue mechanism (recommendation: screen-share + USB
stick, never Canvas); (5) the homework due weekday.

Key resolutions: race sentence stays bounded at ONE sentence with no
GPIO/ODR/BSRR (Day 9's reserved material untouched); the stretch question is
reworded to the question the algebra rewards ("neither survives — why not?")
with a new instructor solution; the 8-word exception frame goes in a Reference
fact box (depth at the top), while the reading gains only the
compiler-decides-vs-hardware-decides clause; recap keeps its six bullets
(S-9: split, don't thin) but gains the missing presenterNote; embedded-industry's
ladder reorder is declined in favor of a dead-board triage line.

See the conversation record for the full 32-item list; all non-escalated items
were applied and re-verified (build, linter, deck check, figure renders).
