# Day 7x — Gate 2 reviews (full draft + slides + deck)

Reviewed 2026-07-28: `source/ch-debugging.ptx`, `assets/decks/day7x.json`,
`plans/day7x.md` rev 2, rendered figures in `assets/images/Day07x-Debugging/`.
Panel: checker-technical-accuracy, expert-class-logistics,
expert-cognitive-load, learner-visual, learner-anxious-nonhardware,
expert-ai-era-readiness (rotator).
Verdicts: 4 BLOCKER, 2 PROCEED-WITH-CHANGES.

---

## checker-technical-accuracy — BLOCKER

Register/RM facts, the compiler transcript, and every figure caption check
out. Three claims demonstrably wrong; seven more diverge from sources.

### Blockers

1. **`subsec-debug-tools` — "each call costs milliseconds at 115200 baud."**
   The course driver runs at **9600** (`ch-uart.ptx:624–641`: `BAUD_RATE 9600U`;
   BRR = 1250; CoolTerm configured at 9600; 115200 appears in ch-uart only as
   the mismatch experiment). At 9600/8N1, one char ≈ 1.042 ms; a 20-char
   ADCPot line ≈ **20.8 ms**. The wrong baud understates the cost 12× in the
   paragraph whose point is the cost. Fix: "tens of milliseconds at the
   course's 9600 baud."
2. **`subsec-debug-printf-patterns` — "there is no `%f` in this course's
   printf" stated as absolute.** Lab 4 Appendix A ("How to print floats",
   p.11) documents the project setting that enables it, and Lab 4
   Deliverable 4 *requires* `printf("%f\n\r", voltage)` — the very lab in
   flight during this x-hour. Fix: "%f is off by default; Lab 4 Appendix A
   shows the setting that enables it; the STM32C031C6 has no FPU (floats are
   software-emulated, Lab 4 §3.1.2) — prefer scaling to an integer."
   **Standing rule L-2 in AUTHORING-book.md carries the same error** — needs
   correction at spec level (NOT edited this session: the file is dirty in a
   parallel session; flagged for Petra).
3. **`subsec-debug-part2a` — the parse explanation is wrong.** Verified by
   preprocessing with the course toolchain: with the semicolon gone the
   compiler sees `(1U << 0)` followed by `((GPIO_TypeDef *)0x50000000UL)` —
   the argument list is `GPIOA`'s own parenthesized expansion, not
   `GPIOAEN (GPIOA->MODER |= ...)`. Control experiment with a non-macro
   `GPIOA` yields a plain `expected ';'` — the baffling message exists ONLY
   because the peripheral name is a parenthesized macro. Fix both prose and
   `sl-debug-compiler-reveal`.

### PWC

4. **`fig-debug-perspective` contains a wrong bit value on screen**: the
   capture's line 7 comment writes the `1U<<5` mask as `0b…0001 0000`
   (should be `0b…0010 0000`), legible at 95% width, contradicting
   ch-intro-blinky. Fix via caption note (or annotate/crop).
5. **`act-debug-printf-where` reveal contradicts `ADCPot.c` and the Day 7
   ladder**: ADCPot already opens with two printfs, so "first line of main"
   is a no-op; per `sl-adc-diagnostics`, *nothing at all* printing = a stray
   blinky.c is building, while a *hang* prints the greeting then stops; the
   reveal's `count` variable doesn't exist in ADCPot (`sensor_value`). Recast
   symptom + reveal to be ADCPot-accurate.
6. **`task-debug-ascii` cites "Day 5's ASCII table" — no ASCII table exists
   anywhere in the book** (only individual codes, e.g. 'E' = 69). Reword with
   an in-task anchor ('a' = 97). The value itself is right ('u' = 117 =
   0x75, matches old-deck speaker note).
7. **"100,000 iterations, one click each" is added and mechanically wrong**
   (Step Over completes the one-line loop in a single slow click; the old
   deck says only "do not single-step through that for-loop"). Keep the
   sourced warning, drop the gloss.
8. **NRST mechanism partially unsourced.** Sourced: adjacency (UM2953
   Table 11: CN6 pin 3 NRST, pin 4 3V3), symptom (ch-adc ladder: libusb
   error, won't connect), old deck "tends to reset the processor
   unexpectedly". Unsourced: "holds the processor in reset" (load-dependent
   per DS13867 Table 53) and "does not damage anything" (defensible; needs
   Petra). Soften mechanism; keep reassurance flagged for Petra.
9. **"a fresh chip could never be debugged or reprogrammed"** — the system
   bootloader is an independent programming path (RM0490/AN2606; RDP L2
   wording). Delete "or reprogrammed".
10. **P-10: no instructor solution in the whole deck**; `act-debug-printf-where`
    needs a concrete ADCPot answer slide, `"instructor": true`.

### NIT

11. `fig-rm-moder-reset` caption asserts decode claims not in the image — trim.
12. `fig-debug-variables` caption discloses type divergence but not the name
    divergence (`counter` vs `count`).
13. B-9: figures never xref'd from prose after slide-link removal — add prose xrefs.
14. B-11d frequency claims authored, not sourced ("every term", "in any room
    this size") — reword.
15. UNVERIFIED (kept, low-risk): x16/x10/x2 = radix switch (read off labels);
    Window → Perspective path (standard Eclipse); delay-loop wall-clock;
    transcript vs the real CMSIS header (stub reproduces byte-exact).
16. Cross-chapter, pre-existing: `stm32c0xx.h` (lowercase) at ch-uart.ptx:620
    is the outlier vs the capital-C form everywhere else incl. Petra's real
    project.
17. `assets/starters/blinky.c` verified byte-identical to the Day 1 listing;
    ch-adc names Canvas as the distribution channel — name it here too.

### Verified correct (highlights, with method)

Transcript **byte-exact** vs arm-none-eabi-gcc 13.3 (both copies); broken
listing differs from Day 1 blinky only by the semicolon; counter excerpt
matches `sl-uart-keyboard-solution` line-for-line; RCC_IOPENR @0x40021034 /
GPIOAEN bit 0 (RM §5.4.11) and on-screen; GPIOA_MODER reset 0xEBFF FFFF
(§6.4.1 p.154); **0xEB decode places AF on exactly PA13/PA14**, and RM §6.3.1
p.147 confirms "PA14: SWCLK … PA13: SWDIO … AF after reset"; analog =
high-impedance, Schmitt off, IDR reads 0 (§6.3.12 Fig. 18); 0xEBFFFFFF →
0xEBFFF7FF after the two lines (bit arithmetic + slide17_img4); ODR 0x0/0x20
with OD5 (§6.4.6 + captures); **yellow = changed-since-last-read confirmed by
cross-rendering the pair** (APBRSTR rows yellow at first stop, white at
second, only IOPENR yellow); USART_RDR 0x75 @0x40004424 (§24.8.12); toolbar
legend caption matches the image verbatim; bug icon sits next to Run (6×
crop); all old-deck UI phrases verbatim; breakpoint-inside-if behavior;
'u' = 117 = 0x75; stretch register names match ch-adc + ADCPot.c; Day 3 RM
lookup back-reference exact; both cross-chapter MODER fixes correct at all
sites, no surviving "reset = input" claim in source/; all counts, image
paths, xrefs, deck refs, linter: clean.

---

## expert-class-logistics — BLOCKER

Clock sums to exactly 50 with the checkpoint + reversed cut order as the
slack — defensible. Likelier overrun is mechanical: the Part 4 podium
machine.

1. **[BLOCKER] P-14/P-2** — Ladder rung 1's "known-good Blinky copy" asserted
   as fact; artifact did not exist at review time; only safeguard is a
   presenterNote. Fix: stage the artifact, cite it in chapter/slide, add
   graceful degradation ("if it isn't ready either, hand up / pair with a
   neighbor").
2. **[MAJOR] P-2/S-8** — rung-1 recovery (download/import) has no budgeted
   time or walkthrough inside the 8-minute launch sub-budget.
3. **[MAJOR] P-2/B-11c** — Part 4's podium machine (counter built, board
   wired, CoolTerm connected, right COM port, before minute 42) has no
   staging task anywhere; never made the Petra flags. Fix: fifth flag + a
   presenterNote on `sl-debug-counter-bp`.
4. **[MAJOR] S-8/P-3** — pacing-model contradiction: plan says Part 3 is
   self-paced; `act-debug-iopenr`'s presenterNote reads as a synchronized
   whole-room gate ("before anyone clicks"). Rewrite to state the self-paced
   model ("each student gates their own Step Over — don't gate the room").
5. **[MINOR] P-3** — stretch announced at ~minute 47; a fast self-paced
   finisher clears 3d by ~minute 30. Add "done early → your own ADCPot.c
   (stretch)" to a Part 3 slide/presenterNote.
6. **[MINOR] S-8** — "in about twenty minutes" vs Part 3a at minute 18.

---

## expert-cognitive-load — BLOCKER

Gate 1 items confirmed applied (two predict cycles; MODER required + RM crop;
breakpoint bridge; checklist in Reference).

1. **[BLOCKER] P-5/P-4** — `sl-debug-moder-observe` refs the before-AND-after
   figure: the answer is on screen during the puzzle, and no later slide
   confirms the step. Fix: split `fig-debug-moder` into before/after figures;
   observe slide refs before-only; new step-reveal slide after `sl-debug-moder-rm`
   carries the after image + the "step both lines" instruction (also trims
   the RM slide to 3 bullets).
2. **[MAJOR] P-7** — `sl-debug-compiler-reveal` fuses the specific diagnosis
   and the three general rules into 6 bullets. Split into two slides.
3. **[MAJOR] P-7** — `fig-debug-perspective` caption names ~6 UI regions at
   once; the "Breakpoints tab" is named and never used (Part 3d uses the
   gutter). Trim to "SFRs today, Variables in Part 4".
4. **[MAJOR] B-11b** — subsec-debug-part3b and part3c open mid-session
   ("With the program halted", "The next two lines") — add grounding openers
   with xrefs.
5. **[MAJOR] P-7/P-2** — the transcript exercise requires parsing GCC
   notation (`error:` vs `note:` + caret) simultaneously with the diagnosis;
   the general mechanism is never named. Add one gloss sentence before the
   transcript.
6. **[MINOR]** `sl-debug-printf-reveal` dense but chunkable — leave unless
   the reveal split frees room.

Scaffold fade 3a→3d→4→stretch checked sound; all other openers stand alone.

---

## learner-visual — BLOCKER

1. **[BLOCKER] P-4/P-12** — the first physical action ("click the bug icon")
   has no image anywhere; the only screenshot is post-launch, whose toolbar
   is the debug-session toolbar. Fix: add the bug-icon crop, legible.
2. **[MAJOR] B-7]** — `fig-debug-iopenr` caption asserts per-row "changed"
   semantics; the before panel shows a dozen already-yellow rows (and
   `fig-debug-variables` shows unchanged `counter` yellow). Caption must
   match the pictures. *(Checker's cross-render: yellow = changed since last
   read; at the first stop everything counts as new. Captions rewritten to
   the semantics both observations support.)*
3. **[PWC] B-11/S-4** — before/after IOPENR pair shot at different zooms;
   re-crop the before to the after's framing (fig-debug-moder is the
   standard to match).
4. **[PWC] B-11a/B-7** — perspective caption says "Variables, Breakpoints,
   SFRs" but the capture truncates to "Varia / Break" — note it.
5. **[MINOR] B-7** — `fig-debug-sfr-tree` caption describes expansion
   behavior the collapsed capture doesn't show — trim.
6. **[NIT] P-4** — the ladder's rung 2 is a physical wiring check with no
   picture; add a labeled crop of the Nucleo power header (3V3 beside NRST).

---

## learner-anxious-nonhardware — BLOCKER

1. **[BLOCKER] P-14/P-2** — rung 1 points at a nonexistent artifact (see
   logistics 1).
2. **[MAJOR] P-2/B-4** — re-entry path stated only in Part 5/recap — the part
   most likely rushed. Add the still-stuck line to the ladder itself:
   "keep watching on the shared screen — nothing later in Part 3 requires
   your own launch — and redo it from this chapter before next class."
3. **[MINOR] B-11c** — no TA/second helper named; Gate 1 NIT still open.

On the record as landed: all four ladder categories with concrete fixes; the
no-damage reassurance in plain language; "won't launch first try — normal"
carried into the presenter script; MODER moment protected by the checkpoint;
stretch reads as invitation; no condescending tone drift found.

---

## expert-ai-era-readiness — PROCEED-WITH-CHANGES

1. **[PWC] P-14** — the chapter never connects its tools to the course AI
   policy ("explain every line", ch-intro-blinky AI-policy aside). Add one
   Part 5 sentence with an xref: these four moves are how you check code you
   did not write — including AI-drafted code.
2. **[PWC] P-2/P-3/P-14** — the audit move ("does every bit you set read back
   set?") lives only in the stretch; most students only ever *observe correct*
   code. Fold a one-line audit beat into guaranteed Part 3c (after stepping
   MODER, check MODE5 reads what the lines claim).
3. **[PWC] P-14/B-3** — Parts 2a/2b are the most AI-outsourceable activities
   (static artifacts, no hardware check). Suggested redesign: students break
   their own Blinky and read their own transcript. *(Resolved at synthesis:
   rejected as written — deliberately breaking the one project Part 3
   depends on, minutes before launch, is a logistics hazard; instead the
   reveal invites re-running the experiment in your own project after class.
   Trade-off documented for Petra.)*
4. **[NIT]** — plan's P-14 section over-claims "every prediction" is
   AI-proof; narrow to distinguish hardware-verified predictions from
   reveal-only ones.

Noted as right: the IOPENR takeaway line is genuine transferable judgment.

---

## Synthesis (committee-synthesizer, 2026-07-28) — applied

Prioritized list: 7 must-fix (parse explanation; baud; %f; ladder rung 1
two-tier + artifact; MODER figure split + step-reveal slide; bug-icon figure;
Part 2b vs real ADCPot.c + P-10 instructor slide), 8 should-fix (yellow
semantics captions + tight before-crop; self-paced presenterNote; GCC gloss +
reveal split; podium flag; five-item correctness sweep; grounding openers +
caption trims + erratum; three AI-honesty beats + plan narrowing; clock
fixes + early stretch announcement), 2 considers adopted (power-header
figure; stm32c0xx.h case NIT deferred to a separate pass), 3 escalations to
Petra (L-2 spec text — AUTHORING-book.md held by a parallel session; blinky
project zip + Canvas staging; NRST no-damage confirmation).

Conflicts resolved, not averaged: ai-era 3 (break-your-own-Blinky) overruled
with revisit note; checker vs learner-visual on yellow highlighting found to
be the same fact in different vocabulary — captions rewritten to match the
rendered evidence.

All items applied to source/ch-debugging.ptx, assets/decks/day7x.json,
plans/day7x.md the same day; every fix cross-checked against the slide
blocks that repeat it (Step 5b).
