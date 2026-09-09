# Gate 2 — Day 17x book (`source/ch-power.ptx`), 2026-09-08

Ten invocations: the core (technical-accuracy as one whole-chapter run
including the self-contradiction read — the chapter is small), arc,
voice (this file had no separate Gate 1.5; the voice run below is the
probe and the full pass in one), figure-claims, cognitive-load,
continuity, logistics, learner-visual, learner-firstgen,
learner-anxious.  Briefed on: x-day (no reading), the work session as
the default with the optional unit sanctioned by Petra, B-19, no
staffing, the standing facts.

Verdicts: tech BLOCKER (3 B/5 M/12 m, with a long verified-correct
list); arc MAJOR (coverage 19/19 taught slides, 2 partial, 4 deferred on
record); voice BLOCKER (the two opening paragraphs are S-23; 23
findings); figure-claims MAJOR (Table 19's key cropped off; PWR_CR1
unlabeled and 3.8 px; widths); cognitive-load MAJOR (census + the
HSISYS gap); continuity MINOR (all thirteen checks pass; two one-clause
glosses); logistics MAJOR (Part 3's hands-on under-budgeted; zero
slack); firstgen MAJOR (fabrication technology; nA; supply domain;
PVU/RVU unexplained); anxious BLOCKER ("cannot be stopped" reads as
permanent; the stretch's expected outcome instructor-only; S-17 dare).

---

## checker-technical-accuracy (BLOCKER)

1. [BLOCKER] :369 "exiting [Stop] re-enables the HSI48 with the system
   clock at its divide-by-four reset setting" — RM Table 21: Stop exit
   leaves HSIDIV "as before entry"; only Standby/Shutdown force 010.
2. [BLOCKER] :8 "Every program we have written this term runs the
   processor at full speed all the time" — the course runs at 12 MHz of
   a 48 MHz maximum; the chapter's own line 96 says so.  Meaning:
   "continuously, never idling".
3. [BLOCKER] :266 vs :417 — Part 3 says RLR "sets where the countdown
   starts"; the Reference says 0xCCCC starts from 0xFFF.  RM §20.3.1:
   start runs from 0xFFF; RLR is loaded on each 0xAAAA.  Her watchdog.c
   issues no reload before the loop, and 0xFFF ≈ 4.095 s is what the
   demo's "every 4 seconds" actually shows.  Fix the prose (her code is
   fine); the first-countdown silicon question is flagged as a bench
   item.
4. [MAJOR] :150 the PWREN sentence justifies a clock enable for a
   listing that touches no PWR register (LPMS deliberately left at
   reset).  Fix: write the field explicitly with the clear-then-set
   idiom, which earns the enable and restores her three steps
   (convergent with arc 3).
5. [MAJOR] :371 Standby retains "the PWR control and backup registers" —
   the RM retains PWR_CR3 (and CR4)/BKPxR and explicitly RESETS PWR_CR1.
6. [MAJOR] The PC13 read is never explained: the board's R29 4.7 kΩ
   pull-up to VDD (Nucleo schematic sheet 3) is why a plain input reads
   1 open, 0 pressed — load-bearing, one sentence.
7. [MAJOR] :60 "depending on the fabrication technology" is an
   unsourced addition to her 5–50 µW/MHz (convergent with firstgen 1).
8. [MAJOR] The instructor stretch arithmetic is right (1.0417 ms/char ×
   17 = 17.7 ms; RLR ≈ 20) but assumes the countdown runs from RLR;
   with the 0xFFF start the edge appears only after the first pet.
   Hedge the block; bench question.
9–20. [MINOR] "at most three steps" vs Standby's four; Stop keeps GPIOs
   too (Table 19) — add to the caption; Shutdown "everything is off" vs
   NRST and WKUPx; "four registers" vs §20.4's five; the IWDG also runs
   in Standby (extend the sleep-reset clause); wake order (ISR runs
   first, then resumes); "Nothing here is new" false (0xFFF, the PR
   table, the retention exception are new); "worth five minutes" vs the
   17-minute Part; the work-session framing vs 35 taught minutes (voice
   1/2 resolve); the predict task's answer in student prose two
   paragraphs later (P-10 — drop the added task, her arc had none);
   "template project"/"source folder" → TemplateProject/Src; Canvas as
   the channel unverified (Q4).
Verified correct: watchdog.c verbatim vs her slide but for the three
sanctioned changes; the LPMS correction right and complete; PWREN
real (bit 28); all four mode summaries; the IWDG facts incl. both /256
rows; her "always accessible" comment sourced (no IWDGEN bit exists);
the ST figure's numbers against datasheet Tables 30/33/34/36; budget
comments sum to 50.  Unverified: PWREN-for-Stop-entry, the 0xFFF first
countdown, SLEEPDEEP reset value (ARMv6-M standard, not hosted),
Canvas.

## checker-arc-fidelity (MAJOR; coverage 19/19 taught, 2 partial)

1. [MAJOR] fig-pwr-cr1 lives only in the Reference and will never be
   projected; her slide 12 put it in the teaching flow.  Move it to
   Part 2 after the Stop listing; xref back from the Reference.
2. [MINOR] The Cortex-M0+ generic user guide pointer (Table 4-14, where
   SLEEPDEEP is documented — not in RM0490) is gone; one clause, and a
   question whether to host the guide.
3. [MINOR] Her slide 13's step 1 vanished: write LPMS explicitly (=
   tech 4).
4. [MINOR] Her slide 5's fourth lever (component datasheets, tests at
   different clock frequencies) reaches the room nowhere.
5. [MINOR] Part 4's comment says 17 min vs the plan's 15; re-budget to
   13 work so the 2-min agenda survives.
6. [MINOR] TemplateProject by name.
7. [MINOR] The activity intro's "The program below is watchdog.c" points
   past its own reveal; start at the copy step.
Also: the added predict task is an addition the plan denies; her
slide-10 four-box shape flattened — adopt a four-row tabular (mode /
what stops / what survives / what wakes it); the dog photo and layouts
otherwise right; deferrals recorded.

## checker-voice (BLOCKER)

1. [BLOCKER] The chapter introduction's second paragraph is the book
   arguing for its own inclusion (S-23, absence list, a minute count);
   replace with the sibling shape ("This chapter covers one class day,
   the Wednesday x-hour… In class we'll look at… <xref> collects…");
   the optionality fact moves to an <instructor> block as ch-servos
   does for the Day 15x session.
2. [BLOCKER] The day's opening paragraph: "bring your system and keep
   building" is S-25; "taught as time allows" is scaffolding; use the
   Day 17 shape ("Today we'll look at… Then we'll give you the rest of
   the hour…").
3–23. [MAJOR/MINOR, rewrites in the full report]: the "Three levers"
   armature deleted and her fourth lever + upshot restored; Part 1's
   added epigram lead deleted (her slide 4 opens on the transistor
   sentence); "Two refinements exist" → her slide-16 block verbatim;
   the work-time close → "We'll now give you the rest of the hour…"
   with the deadlines (S-13); "The IWDG Recipe" → "Configuring the
   IWDG" (S-11); the Reference modes subsection opens on a fragment
   (L-16); "The trade to understand from the start:" → her slide 4
   bullet with her "can take" hedge (S-19); the dog caption does no
   work → a caption that does (or hers/none — question); five
   unexpanded acronyms (LSI, LPMS, HSE, LSE, PVU/RVU); "which the
   tradition calls" → "which is called"; "which is what the name
   means" → the S-27 middle; "Stop mode is one bit more" → finite
   sentence; "the same event in reverse" → her slide 13's wake steps;
   "which is the pet" → her slide 19's why; "reset in its sleep" →
   "before it wakes" (L-15); "The same chapter introduces" → "We'll
   also introduce"; Part 4 needs an opening sentence (S-22); "Each
   gate in the tree" (L-3!) → stopping-a-clock wording; the ST-figure
   caption reads two of five rows — carry all five; objective 2's
   "trade-off that deepens"; SCB->SCR named at first prose use.
For Petra: the optionality sentence's student-facing form; the dog
caption; slides 22–25 scope (the intro's topic list must match); the
"we'll" form for the work-time line.

## checker-figure-claims (MAJOR)

- [MAJOR] fig-power-resources: the crop has no key — Y/O/U/A/- and the
  grey wake column are defined by the footnotes cropped off.  Put the
  key in the caption (text supplied in the report).
- [MAJOR] fig-pwr-cr1: nothing in the crop names the register (heading,
  offset, reset value all cut); the LPMS encodings the caption reads
  off are in the unused slide12_img4.png.  Bring img4 in or re-crop RM
  p.90–91; and the bit map fails legibility outright (3.8 px at 85%;
  re-crop to bits 15–0).
- [MINOR] clock-tree caption claims the /4 reset setting the drawing
  does not show — re-caption; name it Figure 9 like its siblings.
- [MINOR] st-modes caption "for each" — Run has no wake-up tab.
- Legibility: transit → 100% (5.9 px at 70%); resources → 100%; entry →
  100% and a trimmed five-column crop is the real fix (925 of 1510 px);
  clock tree fails at any width — crop to the two used branches or
  keep-as-overview, ask Petra; st-modes good; dog fine (but 4.2 MB —
  downsample).
- Housekeeping: the space-named `Day17x-Sleep Modes/` directory holds
  byte-identical duplicates — delete before re-crops; slide12_img2/3
  (the SCR diagram + field text) sit unused while SLEEPDEEP has no
  figure; slide21_img1 is the begging-dog "petting" half of the joke.

## expert-cognitive-load (MAJOR)

Census: four modes told twice nearly in full (trim the Reference to
what it adds); Standby/Shutdown literal codes leak into Part 2 against
the Gate 1 deferral (drop them there); PWREN restated in the Reference
with zero new content; the IWDG recipe three tellings (Part 3 keeps the
instance, Reference the generalization; the code comments are fine);
"cannot be stopped" twice (keep the Reference's deepened version).
1. [MAJOR] HSISYS labeled in the figure, never named in caption or
   prose — gloss it in the caption.
2. [MAJOR] Part 2 stacks 7–9 first-encounter elements; the literal-code
   drop and the tabular help.
Paragraph count judged proportionate to the sanctioned scope; hold as
the ceiling.

## expert-continuity-auditor (MINOR)

All thirteen checks pass (details in the report).  Two one-clause
gaps: GPIO_IDR_ID13 is a first-use CMSIS macro (gloss); the IWDG's
no-clock-enable exemption never connected in prose to its independent
LSI (one sentence in the Reference).  Housekeeping: stale
pretext_warnings.txt names dead placeholder ids.

## expert-class-logistics (MAJOR)

1. [MAJOR] Part 3's 9-minute hands-on (copy + Canvas download + build +
   flash + CoolTerm + watch a 4 s cycle + two timed conditions)
   realistically runs 13–16; the plan's own precedent is 10 for
   copy+build alone.  Re-budget or the overrun eats the closing work
   block.
2. [MAJOR] Zero slack; the plan's 2-min agenda has no room in the
   chapter's comments (= arc 5).
3. [MAJOR] The stretch's several build-flash cycles vs a "2 min
   briefing" comment — say the doing happens inside the work block.
4. [MINOR] "open CoolTerm" with no baud reminder in student text;
   nothing for "no terminal output".
5. [MINOR] The press conditions name no timing method (a "count seconds"
   cue).
Works: both framings, the close, no shared-instrument bottleneck.

## learner-firstgen-novice (MAJOR)

1. [MAJOR] "depending on the fabrication technology" — first technical
   sentence ends on an undefined term (cut; = tech 7).
2. [MAJOR] 19 nA is the first nanoamp in the corpus — one bridging
   clause (a thousand times smaller than a microamp).
3. [MAJOR] Four modes in one paragraph with "the core's supply domain"
   unglossed — give Standby its own clause and gloss the term.
4. [MAJOR] The PVU/RVU while-loops are never explained in the config
   paragraph — one sentence (the registers take time to update
   internally; the code waits for each).
5. [MINOR] LSI/LSE never expanded (= voice 11).

## learner-anxious-nonhardware (BLOCKER)

1. [BLOCKER] "Once running, the IWDG cannot be stopped" twice, with
   nothing saying a reset or reflash clears it — reads as a permanent
   change to the chip.  Add the verified fact (software-watchdog option
   default: the IWDG runs only after the program writes 0xCCCC; any
   reset starts fresh; RM §20.3.3 hardware-watchdog is an option byte
   this course does not set).
2. [MAJOR] The stretch's expected outcome (a garbled repeating fragment
   is the result, not a fault) is instructor-only — move one clause to
   student prose.
3. [MAJOR] "How needy can you make it…" is an S-17 dare — name the
   landing inside the question ("Push the reload value down until the
   message starts arriving garbled or not at all.") while keeping her
   question.
4. [MINOR] "simply stops responding" — drop "simply".
Works: predict-then-reveal order; the no-project-dependency sentence
placed early and repeated.

## learner-visual (MAJOR)

1. [MAJOR] SLEEPDEEP is written in code and named four times with no
   figure while her slide 12's SCR bit diagram (slide12_img2.png) sits
   extracted and unused — add it beside fig-pwr-cr1.
2. [MAJOR] Static-vs-dynamic power is prose-only — prefer an xref to
   ch-transistors' switch figure over new art; ask Petra if more is
   wanted.
3. [borderline] Table 20 carries five columns the chapter never teaches
   — a trimmed crop for the teaching flow, the full table in the
   Reference (= figure-claims).
4–6. [MINOR] resources → 100%; a highlighted clock-tree crop is a
   Petra question; the downcounter is fine as prose; the dog stays
   (downsample the 4.2 MB file).

---

The synthesizer's list and the applied record follow.
