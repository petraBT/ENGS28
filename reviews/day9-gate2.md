# Gate 2 — Day 9 (GPIO Interrupts): chapter, deck, starters

Artifacts: `source/ch-gpio-interrupts.ptx`, `assets/decks/day9.json` (51 slides,
37 refs, 3 instructor-only), `assets/starters/counterResetButtonPolled.c` and
`counterResetButtonInt.c`. Reviewed against `plans/week5.md` (Rev 2),
`plans/week5-ground-truth.md`, and `reviews/week5-gate1.md`.

Panel: the standing core of 7 plus four rotators — `learner-arduino-veteran`
(the chapter replaces `attachInterrupt()`), `expert-embedded-industry`
(register contracts and a concurrency argument), `learner-ai-reliant` (a
codeable deliverable, and Part 7 claims to be AI-proof), `expert-rigor-hawk`
(Gate 1 was heavy on accessibility findings; check nothing was thinned).

| Reviewer | Verdict |
| --- | --- |
| checker-technical-accuracy | **BLOCKER** |
| expert-class-logistics | **BLOCKER** |
| learner-visual | **BLOCKER** |
| expert-continuity-auditor | PASS WITH CHANGES |
| expert-cognitive-load | PASS WITH CHANGES |
| learner-firstgen-novice | PASS WITH CHANGES |
| learner-anxious-nonhardware | PASS WITH CHANGES |
| learner-arduino-veteran | PASS WITH CHANGES |
| expert-embedded-industry | PASS WITH CHANGES |
| learner-ai-reliant | PASS WITH CHANGES |
| expert-rigor-hawk | PASS WITH CHANGES |

---

## checker-technical-accuracy — BLOCKER

Linters confirmed clean: `check_rules.py` 0/0, `check_starters.py` 0 problems
(27 and 30 matched code lines), `check_deck.py` 51 slides / 37 refs / 0
problems. The EXTI code is faithful to the recovered driver and the BSRR
material is correctly sourced — the defects are in the *explanations* around
them, which is the half that gets checked least.

- **[BLOCKER] L-6, B-3 — lines 810–813, 819–821, 837–838, 1853–1859: "a masked
  line still records edges in `EXTI_FPR1`" is false on this device.** The
  chapter says *"A line whose mask bit is 0 still detects edges and still
  records them — the CPU is simply not told. That separation is what lets a
  program poll the EXTI's pending register instead of being interrupted by
  it"*, repeats it in the `fig-exti-imr1` caption (*"edges are detected, flags
  are set, and nothing ever happens"*), on `sl-day9-imr`, and as an entire
  Reference subsection. RM0490 §12.3.1, verbatim: *"The configurable events
  have unique interrupt pending request registers, shared by the CPU. **The
  pending register is only set for an unmasked interrupt.**"* And §12.4:
  *"**When the associated CPU interrupt is unmasked**, the corresponding RPIFn
  and/or FPIFn bit is/are set"*. Table 45 shows FPIF*n* **Masked** whenever
  `IM*n* = 0`. So masked-line polling of `FPR1` does not work, and a student
  debugging a missing `IMR1` bit will not find a flag waiting in `FPR1`. The
  chapter's own `fig-exti-signal-path` caption has the topology right (the AND
  gate gates the pending register), so the figure contradicts the prose. The
  old deck's slide-19 speaker note asserts the opposite; **the note is wrong
  and the ground-truth table inherited it.** The three defensible reasons the
  mask is separate are event generation via `EXTI_EMR1`, cheap temporary
  masking without disturbing the trigger config, and stop-mode wakeup
  selection. Delete the poll-instead-of-interrupt reason everywhere.
- **[BLOCKER] B-8, L-6 — lines 978–981 and 1012: the reason for assigning
  rather than compound-assigning `FPR1` is backwards.** The chapter says *"a
  read-modify-write on a register full of latched flags can destroy a flag that
  hardware set **between the read and the write back**."* On an `rc_w1`
  register, `|=` is destructive because the read returns 1 at **every
  already-set flag** and OR-ing then writing back sends those 1s into a
  write-1-to-clear register, clearing them all. A flag set *between* the read
  and the write-back reads 0, so a 0 is written there — which on `rc_w1` has no
  effect, and the flag survives. The stated failure mode is exactly the one
  that cannot happen. Day 7 and Day 8 state it correctly
  (`ch-timers-interrupts.ptx:1068–1073`, `ch-adc.ptx:1312–1326`); this is their
  set-piece restated wrongly on the day it pays out.
- **[BLOCKER] B-9, B-6 — line 366 (`sl-day9-hw-review`): "PSC = 4000, ARR =
  1000" is not an exact answer and contradicts Day 8's rule.** Register values
  are written minus one (`ch-timers-interrupts.ptx:197–207, 611, 760–768`; old
  deck slide 10 `TIM14->PSC = PSC_FACTOR - 1`). As written, (4001 × 1001)/12e6
  = **0.33375 s**, not ⅓ s. The correct pair is **PSC = 3999, ARR = 999**. The
  divisor arithmetic on the slide is right; only the register values are wrong.
- **[MAJOR] L-6, P-11 — line 594: the block diagram is cited to the wrong
  section and figure.** The rendered SVG contains "Falling/Rising trigger
  selection register", "Asynchronous Edge detection circuit", "CPU Interrupt
  mask register", "Pending request register" — that is **Figure 24,
  *Configurable event trigger logic CPU wakeup*, §12.3.1**. RM0490's actual
  Figure 23 (§12.2) is the top-level block diagram (AHB interface, Masking,
  EVG, EXTImux, `exti[15:0]`) — a different picture. A student following the
  citation lands on the wrong page.
- **[MAJOR] B-7 — lines 741–743: the caption misdescribes the bits the figure
  draws.** *"The eight bits shown as 1 0 0 0 0 0 0 0"* — the annotation glyphs
  sit at x = 716…1193 for the seven `0`s and **1280.6 for the `1`**, and the
  base bitmap is MSB-left, so the figure reads `0 0 0 0 0 0 0 1`. The
  conclusion ("bit 0 set") is right; the description of the picture is
  backwards. Everything else in the figure verified: EXTI4 over [7:0], EXTI5
  [15:8], EXTI6 [23:16], EXTI7 [31:24], matching Table 47.
- **[MAJOR] L-6 — lines 819–820, 838: "Every line is masked at reset" is
  false.** RM0490 §12.5.7: `EXTI_IMR1` **reset value 0xFFF8 0000** — *"set such
  as to, by default, enable interrupt from direct lines, and disable interrupt
  from configurable lines."* IM31, IM25, IM23, IM19 are 1 at reset, and they
  are drawn in the very figure being captioned. Say "every **GPIO** line — IM0
  through IM15".
- **[MAJOR] B-11c — lines 338–340, 377–380, 427, 450, 1262–1263, 1286 and both
  starters: the debounce capacitor is attributed to Day 3; it is wired on Day
  3x.** The button is Day 3 (`ch-switches.ptx:661–680`); the capacitor is Day 3x
  (`act-day3x-hw-debounce`, `:1108–1160`). The chapter's own Reference section
  gets it right (`:1929`), so the chapter contradicts itself. This matters
  because the wiring-check beat exists precisely to tell students what to look
  for.
- **[MAJOR] P-10 — the homework has no instructor-solution slide.**
  `act-gpio-homework` asks students to write `counterResetButtonIntTimer.c` and
  a BSRR line. P-10 admits no exceptions, and `day8.json` carries instructor
  solutions for Day 8's *homework* as precedent. The solution needs no
  inventing: old deck slide 52 has the complete file.
- **[MAJOR] B-6 — lines 1113–1127 with 1309: the assembled program prints 1
  after a press, where the driver prints 0.** The skeleton pre-gives a
  standalone `if (counter == MAXCOUNT) {...} else { counter++; }` and the
  solution fills TODO 3c as a **separate** statement, so a press falls through
  and increments. Old deck slide 40 uses one chained
  `if / else if / else`, printing 0 — as does the polled program the hour
  contrasts it against. The restructuring breaks the like-for-like comparison
  and is baked into the shipped starter.
- **[MINOR] L-6 — line 731: "0x04 is reserved, because this package has no port
  E."** No STM32C0 has a GPIOE at all; it is a device fact, not a packaging
  one. (Port codes themselves verified exactly.)
- **[MINOR] B-11c — lines 1565–1570, 1597: Lab 5 AF1 described as concurrent
  when the lab says the LEDs are mutually exclusive** (*"The green LED turns
  off"*), and the lab says "with a timer", not "with a timer interrupt". The
  shared-ODR race is still real — the lab's pin plan puts LED1/2/3 on
  PA5/PA6/PA7 — but reword to what the lab says.
- **[MINOR] B-9 — line 335, 368: "the twelve minutes" / "the last twelve
  minutes of class".** Part 7 is 11 minutes and Part 8 follows it.
- **[MINOR] B-9 — line 427: "five class meetings and four chapters ago".**
  Between Day 3 and Day 9: 3x, 4, 5, 5x, 6, 7, 7x, 8 = **eight** meetings
  across **six** chapters. The numbers only work if the x-sessions are
  excluded, and they are real meetings.
- **[MINOR] — line 1510–1512: "a variable `main()` is never in the middle of
  modifying"** — the listing directly above contains `buttonPushed = 0;` in
  `main()`. Accurate statement: `main()`'s modification is a single store, not
  a read-modify-write, so there is no stale copy to write back. Also, a second
  press arriving between `if (buttonPushed)` and `buttonPushed = 0;` is
  discarded. (Petra's slide-57 note — "This will ALWAYS work. Trust me." — is
  the same overstatement; the chapter need not repeat it.)
- **[MINOR] B-9 — lines 26–28: "four registers to configure it".** Three are
  configuration; `FPR1` is read and cleared at run time.
- **[MINOR] B-9 — lines 348–350, 363: "blinks every third of a second".** Day
  8's homework is ⅓ s **on**, ⅓ s **off** — interval ⅓ s, period ⅔ s.
- **[MINOR/UNVERIFIED] B-7 — lines 1945–1948, the second scope trace.** Both
  traces fall together with the same 3.3 V swing, supporting "the same event
  offset vertically" — but CH1 shows an undershoot CH2 does not, which a pure
  offset would not produce. Nothing in the old deck says what CH1 probed. Drop
  the parenthetical or say "a second channel is shown offset below". Verified
  from the image: "20 µs/div" is printed on the capture, and the fall is single
  and clean.
- **[MINOR] S-2 — deck slide 41 has no writing room**, though the plan lists it
  as one of four committed-answer moments.
- **[MINOR] B-4 — the plan's running checklist is in neither chapter nor
  deck.** Old deck slide 45 carries the five-item list verbatim.

**Verified correct — do not re-litigate.** `pb4_exti_init()` is byte-for-byte
the recovered driver (re-mined slide 34 independently), including the
`EXTICR[1]` index and the clear-then-set pairs, and slide 40's missing close
paren is correctly not inherited. The ISR matches slide 38 exactly and uses
Petra's corrected comment wording. The PC13 stretch solutions match slides 44
and 47 exactly. All five disassembly instructions and addresses match slide 56
character for character, every comment matches her speaker note, and the race
narrative is correct for Cortex-M0+ — r3 is in the hardware-stacked frame
{R0–R3, R12, LR, PC, xPSR}. "Six lines shorter" is exactly right (16 vs 22
non-blank lines). **Every BSRR claim confirmed against §6.4.7**: both halves
write-only with reads returning 0x0000, writing 0 does nothing, set wins over
reset, no toggle field exists; `GPIOx_BRR` §6.4.11 does duplicate the upper
half; the ODR note is quoted verbatim. Every register offset and section number
in the Reference table matches. `EXTI_FPR1` is `rc_w1`, quoted exactly. The
vector-table row is position 7 / priority 14 / 0x0000_005C, with EXTI0_1 at 5
and EXTI2_3 at 6. Both EXTICR derivations check out. All counts check out
(sixteen lines, three vectors, twelve on EXTI4_15, four switches, five
instructions, five ports A/B/C/D/F). `fig-gpio-input-driver` is genuinely
RM0490 Figure 15 and its caption's three claims are all visible in the image.
All ten image paths resolve; all seven cross-chapter xrefs resolve. All three
reading questions and every distractor's feedback check out against the real
hardware. The `attachInterrupt()` mapping is accurate. The Lab 2 motivation is
confirmed against Lab2_ES28.pdf §3.2. The other-sources list matches slide 13
item for item. Part 1's `ODR ^= LED` plant is accurate.

**Unverified:** `ES28.h` and `stm32c031xx.h` are absent, so `EXTI_PB`,
`GPIO_INPUT`, `GPIO_PULLUP`, `delay_ms()` and the CMSIS field macros are
confirmed only from the deck's compiled-in-class code (sufficient);
`GPIO_BSRR_BS5`/`BR5` appear in **no** deck and are confirmed only against the
RM's bit names and the STM32G0/C0 naming convention.

---

## expert-class-logistics — BLOCKER

Running clock: Settling 0–3, recap+agenda 3–5, Part 1 5–9, Part 2 9–18
(**checkpoint at 18**, matching the plan's arithmetic), Part 3 18–24, Part 4a
24–30, Part 4b 30–34, Part 5 34–39, Part 6 39–52, Part 7 52–63, Part 8 63–65.
The clock holds if the checkpoint is enforced. The real risk is not overrun —
it is that the rescue does not put rescued students on equal footing for the
rest of the hour.

- **[BLOCKER] B-11c, P-2, P-14 — `sl-day9-wiring-check` shows the wrong figure
  to verify wiring with.** It refs `fig-rc-schematic`
  (`ch-switches.ptx:1398`), the *abstract RC-filter schematic*. The figure that
  shows where the capacitor sits **on the breadboard** — *"from D5 (PB4) to GND
  … The red dashed line shows where the capacitor connects"* — is
  `fig-rc-debounce-circuit` (`:1128`), never referenced. A student who cannot
  remember whether PB4 still has its capacitor cannot check a physical
  breadboard against an electrical schematic. This is the one slide Gate 1's
  fix depends on.
- **[MAJOR] P-2, B-11c — the ladder's rung 1 is unusable by students rescued in
  Part 2.** Rung 1 presumes a *confirmed-working* polled baseline, but the Part
  2 rescue is only "hand out the verified-good file and move on" — it never
  requires the rescued student to build, flash and watch it count. They reach
  Part 6 with nothing to test against: the same "asserted, not verified"
  failure, recurring inside the fix meant to close it.
- **[MAJOR] S-8, P-2 — Part 2 budgets more mechanical steps than its own
  precedent, and the rescue misses the likeliest failure.** The activity
  requires a wiring check, a project copy, a download, a build, a flash, a
  *second* download plus an exclude-from-build submenu, two button tests and a
  written answer — more distinct IDE operations than Day 9x's 15-minute Part 4.
  "Hand out the verified-good file" fixes a bad download or build; it does
  nothing for a student still mid-way through the project copy.
- **[MAJOR] P-3, S-5 — the two instructor-only PC13 slides have no delivery
  mechanism compatible with "the ladder stays up for the whole part".**
  Projecting them mid-part removes the self-rescue tool from strugglers and
  reveals the stretch answer to fast finishers who have not attempted it.
- **[MINOR] S-8 — Part 3 has no compressible element**, contradicting the
  plan's cut list, which names "deck slide 13" — content that is pre-class
  reading in this draft, not a Part 3 slide. Overflow has nowhere sanctioned to
  land except Part 4a/4b, which were split precisely to slow them down.
- **[MINOR] S-8, P-2 — unbudgeted load moved into the day's tightest part.**
  Task t2 (download and exclude the interrupt file) exists so Part 6 avoids a
  Canvas trip — moving cost from Part 6 (13 min, slack) into Part 2 (9 min, the
  named bottleneck). Wrong direction.

---

## learner-visual — BLOCKER

- **[BLOCKER] P-4, B-7 — `fig-exti-signal-path`.** The caption says the press
  *"enters at the multiplexer"*, but the base bitmap I can see has no
  multiplexer element — the signal arrives as an unlabeled arrow marked
  "Configurable Event input(y)" into the edge-detection box. The manifest lists
  `'multiplexer'` only as *text*, so I cannot confirm whether a mux symbol was
  drawn or the word was dropped next to an arrow that isn't one. Needs checking
  against the rendered composite. **Separately and independently of that:** the
  diagram has **two parallel gated paths** out of the edge detector — a "CPU
  Event mask register" path and a "CPU Interrupt mask register" path — and the
  caption walks only the second without warning that the first, similar-looking
  AND-gate/mask pair is also grayed out. A student comparing diagram to
  sentence can plausibly follow the wrong branch.
- **[MAJOR] P-4 — the read-modify-write race has no diagram.** It is taught
  entirely as a disassembly listing plus prose. A multi-step interleaving (main
  fetches → ISR changes the variable → main resumes and clobbers it) is exactly
  what a two-lane timeline shows instantly and a static listing cannot. The
  chapter gives this "the twelve minutes", which is a strong signal it deserves
  a picture.
- **[MAJOR] B-11, P-12 — `fig-vector-table-exti` is an uncropped, unannotated
  extraction.** The caption names three rows; the image shows those three plus
  nine others (`PendSV_Handler`, `SysTick_Handler`, `WWDG`, `RTC`, `FLASH`,
  `RCC`, two `Reserved`, `DMA1_Channel1` cut off) with no shading or box. A
  student on a slide must find three rows among thirteen unaided.
- **[MAJOR] P-12 — `gpio_input_driver.png` ships bare while its caption asks
  for three spatial callouts.** *"On the right … Along the top … on the left,
  feeding the output data register"* in a dense 15-box diagram with rotated
  labels. Box the three regions or re-run the annotation pipeline scoped to
  exclude the colliding shapes.
- **[MINOR] B-7, S-3 — `fig-pb4-clean-edge` channel numbers are backwards.**
  The caption says "the lower trace is the same event on the second channel";
  the legend labels the lower trace **CH 1** and the upper **CH 2**.
- **[MINOR] S-3 — slide captions inconsistent.** `sl-day9-exti-path`'s "Follow
  the blue line: …" is a good S-3 model; `sl-day9-exti-mux` and
  `sl-day9-wiring-check` are compressed restatements of their book captions.

---

## expert-continuity-auditor — PASS WITH CHANGES

- **[MAJOR] P-1, L-5, L-6 — the debounce capacitor is misattributed to Day 3
  instead of Day 3x**, in five places, twice contradicting itself in adjacent
  sentences (*"which Day 3x had you capture on the oscilloscope … The capacitor
  wired on Day 3 is what keeps that from happening here"*). The chapter gets it
  right exactly once, in Reference. Change "Day 3" to "Day 3x" wherever the
  capacitor specifically is meant; leave "Day 3" for the pull-up and pin
  configuration.
- **[MAJOR] B-8 — the "resurfaced volatile" beat does not implement the plan's
  design and reduces to re-teaching by restatement.** The plan specified "the
  same rule from the other end — *nothing in `main()` writes this flag; write
  it down and see whether the compiler could tell*", with the slide naming Day
  8's `fig-compiler-view`. As written, the Part 5 prose answers the question in
  full before the student ever reaches the TODO, and `sl-day9-isr-code` restates
  the same fact in the same order with no `ref` to `fig-compiler-view`.
- **[MINOR] S-2 — Part 2's writing-room commitment is marked
  `"room": "compressed"`, the opposite setting**, so of the plan's four
  committed-answer moments only two carry writing room in the built deck.

**Verified clean:** every cross-chapter xref resolves to the content claimed.
`ch-timers-interrupts.ptx` contains no BSRR, no `EXTI_FPR1` and no framing of
the ISR/main race — Day 8's only EXTI mention names no register and states no
polarity, so both Day 9 commit moments are safe. The Before-Class reading obeys
the plan's exclusion list exactly. BSRR is genuinely spent: Objective 5 is
practiced via `act-gpio-bsrr-t4`, and the no-toggle limitation is stated where
the student meets it. **Lab 5 AF1 verified against the PDF and matches Part 7's
citation — the Gate 1 fix removing the incorrect two-button-stretch citation
held.** Deck counts accurate.

---

## expert-cognitive-load — PASS WITH CHANGES

- **[MAJOR] P-6, B-4 — the deck inverts activity-before-reveal for the
  vector-table lookup.** The book's order is `sl-day9-exti-mux` →
  `sl-day9-exti-vectors` (the "go look it up, thirty seconds" prompt) →
  `sl-day9-exti-names` (the derived answer). The deck plays `exti-names` — the
  full answer — **before** `exti-vectors`. Students are shown the derived table
  and then told to spend thirty seconds finding what is already in front of
  them. Swap the two refs; no content or timing change.
- **[MAJOR] P-2 — Part 6 lost the scaffold the plan designed for it.** The plan
  promised Petra's running "what we need to do" checklist on screen for Parts
  4a–6. Grepping chapter and deck for "checklist" returns zero matches — it was
  never built. What Part 6 has is the *failure-diagnosis* ladder, which does not
  carry FTSR1/IMR1's bit assignments, FPR1's clear semantics, or the `volatile`
  requirement. Build it, or update the plan to say the ladder is the substitute.
- **[MAJOR] P-7 — Part 7 is still too dense; Gate 1's fix added a beat and
  three minutes, not headroom.** Six to seven first-encounter elements in
  eleven minutes, against P-7's ~four-item bound. `sl-day9-bsrr-limits` alone
  stacks four ideas (no-toggle, the ownership pattern, the set-wins tie-break
  plus `GPIOx_BRR`, and the ODR-vs-BSRR rule of thumb) in the part's closing
  60–90 seconds — and it duplicates `subsec-gpio-ref-odr-bsrr`, so moving it to
  Reference would help more than the added beat did.
- **[MODERATE] P-7, S-14 — Part 4b's "relief" framing outpaces its content.**
  Three named registers in four minutes (~80 s each) is a *faster* pace than
  4a's one register in six, and `sl-day9-imr` carries three sub-ideas needing
  real explanation while `sl-day9-ftsr` introduces a fourth register
  (`EXTI_RTSR1`) in passing.

**Verified:** the B-2 hand-off is the one boundary in the chapter drawn
correctly — the reading motivates, broadens and names-without-configuring, and
nothing leaks. The 4a/4b split and the BSRR predict-then-write both discharge
Gate 1's MAJORs.

---

## learner-firstgen-novice — PASS WITH CHANGES

Reading questions: all three answerable. RQ3's distractor feedback on
`volatile` is **the best re-teaching moment in the chapter** — better than the
in-class treatment.

- **[MAJOR] B-11d, P-2 — line 626: "because roughly half of this room has done
  pin interrupts before under a different name."** An unverified claim about
  who is in the room, and for a student with no Arduino background it states as
  fact that half the room is ahead — immediately before the chapter's first
  hard datasheet content. Drop the fraction; the slide's own framing ("If you
  have used `attachInterrupt()` before, here is what it was doing for you")
  does the same job.
- **[MAJOR] P-4, P-7 — the disassembly is the one abstract, time-ordered
  sequence in the chapter and the one place P-4 is skipped.** Every other new
  mechanism gets a figure. *"The CPU stacks its state — including that
  register"* is a term I have not met, with nothing on the page to point at
  while it happens.
- **[MAJOR] P-1 — `act-gpio-bsrr-t1` sends me to read a note containing
  "atomic", a word never defined in the chapter.** The following paragraph
  explains the mechanism without tying it back to the word.
- **[MAJOR] P-2, P-7 — Gate 1 finding (a) not fully fixed.** Time went 8→11 min
  and a presenter note now flags the exact risk, but the *page* did not change.
  A live-room instruction to pause is not a fix for someone reading alone.
- **[MINOR] P-7 — Gate 1 finding (b) partially fixed.** The real improvement is
  in the reading (RQ3); in-class is still one paragraph plus a cross-reference,
  and nothing distinguishes "solid on Day 8" from "shaky on Day 8".
- **[OK — keep]** Gate 1 finding (c) is genuinely fixed. Also keep: *"This is a
  genuinely easy slip to make and it produces a program that builds cleanly and
  never interrupts"* — explains why the array-index bug is easy without
  implying I should have known; and *"There is no right answer yet"*.

Every activity has a concrete, low-ambiguity first move — "this is P-2 done
right."

---

## learner-anxious-nonhardware — PASS WITH CHANGES

- **[MAJOR] P-14, P-2, S-17 — a diagnosis with no remedy attached, twice.**
  Both places the chapter says "your wiring, not your code" it stops there. The
  only rescue — "a dead button gets re-seated against the Day 3 photo" — lives
  solely in a `presenterNote` and never reaches a student-facing slide, task or
  sentence. Grepping the whole chapter finds no "ask for help", "flag it",
  "raise your hand" — nothing resembling S-17's own model line. Being told
  whose fault it isn't, with no visible next step, is the moment I stop
  touching the board and wait.
- **[MAJOR] S-17, S-5 — Part 7's reassurance never reaches what I am writing
  on.** The book activity has *"There is no right answer yet"*; the deck's
  actual student-facing `prompt` slide has only the two questions, with the
  reassurance in `presenterNote`. A spoken aside is not the same as a line I
  can read while deciding what to write.
- **[MAJOR] P-2 — the day's crucial step has no checkpoint parity with Part
  2.** Part 2 has a named minute and a named rescue; Part 6 — 13 minutes, where
  the day's stated outcome actually happens — has only a whole-room
  contingency. Nothing protects an individual who is behind while the room's
  own task list says "Done early? Add … PC13" on the same visible slide.
- **[MAJOR] B-11c — the wiring check points me at the wrong artifact**
  (schematic, not photo) — independently the same finding as logistics.
- **[MINOR] P-2, S-2 — the pace signal is baked into the shared task list.**
  A student still on TODO 1 sees, on the same slide, that classmates are being
  invited to extend.
- **[MINOR] B-12, L-10 — mostly clean.** No "simply/just/obviously" applied to
  the *student*; all timing confined to presenter notes; homework optionality
  legible, though task t2 is unlabeled next to two explicitly-optional tasks — a
  one-word `(required)` would remove the ambiguity.

**Keep unchanged:** *"Nothing today can damage anything…"* — the plain,
load-bearing safety statement, do not soften or dramatize. *"Thursday is I2C …
Nothing from today is a prerequisite for it."* And the ladder's *behavioral*
first rung, which is the right design — it just needs the "then what".

---

## learner-arduino-veteran — PASS WITH CHANGES

Gate 1's BLOCKER is discharged in the way that matters: the beat names
`attachInterrupt()`, sits at the end of Part 3 (the correct spot — motivation
immediately ahead of the payoff), and maps three of its four hidden actions
onto specific registers. BSRR-never-written is also discharged.

- **[MAJOR] L-5, B-11d — "it is an ARM chip with an EXTI too" is stated as fact
  and is wrong for most of the room.** "Several Arduino courses" overwhelmingly
  means Uno/Nano/Mega — AVR, 8-bit, no EXTI, no NVIC, external interrupts via
  `EICRA`/`EIMSK` and `PCICR`/`PCMSK`. Only Due/Zero/Nano 33 BLE/Portenta are
  ARM. The slide is strictly *less* accurate than the paragraph it condenses
  (the book hedges with "EXTI-equivalent"; the slide drops the hedge). Say it
  accurately and still make the point.
- **[MAJOR] L-5, L-6, P-1 — `digitalPinToInterrupt(4)` and `PB4` are silently
  treated as the same "4".** The Arduino `4` is a board digital-pin number, not
  a port-pin number; Uno's D4 is AVR PD4. Placed beside a paragraph about PB4
  and reusing the digit, the natural and wrong read is that the two numbering
  schemes are the same kind of thing. This is the A0/PA0/ADC-channel collision
  the course exists to defuse, recreated instead of named.
- **[MAJOR] P-5, P-1 — the fix for the case Part 1 planted is described, never
  written.** Part 7 explains why BSRR cannot rescue `ODR ^= LED` and states the
  ownership pattern in words, but no code shows it — not in the chapter, not in
  the homework (task 2 exercises plain on/off, not a toggle). I would leave able
  to recite "keep the state in an owned variable" without being able to produce
  four lines that do it.
- **[MODERATE] P-3 — most of the stretch is Part 4a/4b's arithmetic again.**
  `pc13_exti_init()` is line-for-line `pb4_exti_init()` with different
  constants. The one genuinely new idea — two flags sharing one handler, each
  clearing only its own bit — is the smaller half. Hand the init as given and
  spend the time on the dispatch logic.
- **[OK — keep]** Part 7's observe→explain→fix shape; the `rc_w1`
  predict-then-reveal; the four-switch count against Day 8. These are the right
  antidotes to this persona's overconfidence.

---

## expert-embedded-industry — PASS WITH CHANGES

- **[MAJOR] P-5, S-19 — "reads are not interruptible half-way" is stated as an
  unqualified architectural truth.** True here only because `buttonPushed` is a
  naturally aligned machine-word `int` that GCC loads with a single `LDR` on
  Cortex-M0+. The chapter never names that boundary. A student who walks away
  believing "reads of shared variables are safe, full stop" will apply it to a
  `struct`, a `uint64_t`, or a narrower bus and get burned in exactly the "fails
  silently and rarely" way the chapter warns about two paragraphs later.
- **[MAJOR] P-5, P-14 — the chapter's own "safe" example still has an
  unexamined race.** If the ISR sets `buttonPushed = 1` between `main()`'s read
  of the flag and its write of `0`, that write silently clobbers the ISR's
  update — the identical lost-update shape just taught, with the roles reversed
  and the window on the consumer side. Benign in this program; the *moral* as
  stated is not quite true of the consumption of a control signal, only its
  production.
- **[MAJOR] P-5 — `__disable_irq()`/`__enable_irq()` bracket every ISR with no
  explanation of what they buy or cost.** They do **not** protect against the
  race Part 7 teaches — by the time the ISR's disable executes, `main()` has
  already been preempted. What they do is raise interrupt latency for every
  other source, which becomes concrete the moment Part 8's homework puts two
  sources in one program. Compounding it: the Part 7 listings silently drop the
  bracket and the abridgment note does not disclose that.
- **[MINOR] P-14 — spurious/nested interrupts never named**, and the two-button
  stretch's `if/else if` means a simultaneous PB4+PC13 edge services one line
  per entry and relies on the pending register re-triggering — worth naming.
- **[OK] Both datasheet lookups are genuine, transferable, and named precisely
  enough to repeat** — verified against ground truth exactly (offsets, port
  codes, `rc_w1` polarity, vector row). "This is the strongest part of the
  chapter and models the habit correctly, including generalizing the
  access-type lesson beyond the three specific registers."

---

## learner-ai-reliant — PASS WITH CHANGES

- **[MAJOR] P-14, B-3 — Part 7's own claim, tested and found false as
  worded.** The plan says Part 7 is "the activity an AI answer does not
  survive". But presenting two complete candidate solutions side by side and
  asking for a pick with justification hands the AI exactly the
  comparative-analysis task it is best at — "ISR writing shared data that main
  read-modify-writes is a race" is *the* canonical warning in every ARM
  tutorial. The plan's stated failure mode describes asking an AI to *write* the
  solution unframed; it does not describe a multiple-choice comparison.
  **Redesign:** show only the ISR-direct version, ask whether it can ever behave
  wrong and under what circumstance, and reveal the flag version as the fix.
  Preserves the commit-before-reveal framing, costs zero minutes, and removes
  the side-by-side an AI thrives on.
- **[MAJOR] P-14, P-2 — the crucial step has no gate against a pasted answer.**
  The starter's header lists every CMSIS name *and* states the `EXTICR[1]` trap
  and its resolution — correct P-2/B-13 scaffolding that is simultaneously a
  complete AI prompt with the answer key attached. No task requires a
  prediction or an explanation; the ladder only fires if the code fails, which
  correctly-pasted code will not. **Fix:** one required sub-task — before
  building, predict which *one* of the four switches, if omitted, would still
  build and link cleanly but never interrupt.
- **[MINOR] P-5, P-14 — Part 7 never observes the race, only narrates it.** No
  student runs the ISR-direct version and watches it drop a reset; the whole
  beat is answerable from the text, no board required. Even a coarse empirical
  check would work.
- **[MINOR] P-6, S-2 — nothing collects the committed answers.** A student can
  sit through the reveal having written nothing. Whole-course pattern, but Day
  9 is a reasonable place to pilot a fix.
- **[MINOR] P-14, P-11 — the homework's anchor is one plausible sentence**,
  which is exactly what an AI supplies.

**Where it already does this well:** `act-gpio-polled-run` anchors to the
student's own board ("did *my* counter reset" has no AI substitute);
`act-gpio-bsrr` correctly uses an AI-answerable lookup as *intended*
scaffolding, since the goal is "open the manual"; the ladder is genuinely
productive struggle because rung 1 is something no AI can answer for you; B-3
is respected throughout the reading questions.

---

## expert-rigor-hawk — PASS WITH CHANGES

- **[MAJOR] P-5, B-6 — claim (b) is stated as an absolute while the code on the
  same page contradicts its premise.** *"a variable `main()` is **never** in the
  middle of modifying"* — six lines above, the listing does modify it
  (`buttonPushed = 0;`). A second press landing during `counter = 0;` has its
  flag silently overwritten. A *different and milder* failure than Beat 2's RMW
  corruption — an event coalesced, not data corrupted — which is exactly why it
  should be named rather than waved past. Objective 4 bakes the unqualified
  version into the chapter's learning goal. "Leaving it unqualified is not
  'true-enough-for-Day-9', it's a wrong general principle handed to students who
  will write exactly this pattern in real firmware."
- **[MAJOR] S-16, P-5 — the `__disable_irq()` convention the chapter itself
  establishes is silently dropped from the one listing where it mattered
  most**, and the disclosed abridgment list never mentions it. This is the
  finding above's root cause: the tool that would close the race is the one
  piece of prior discipline that vanished.
- **[MODERATE] P-5 — the "reads are safe" half is asserted, not derived.** Beat
  2 earns its rigor with an actual disassembly; Beat 3's parallel claim gets no
  equivalent treatment, though the earlier beat trained the student to expect
  one. One annotated line on the existing slide would close it at no time cost.
- **[MINOR] P-3 — the PC13 stretch is mostly repetition with one genuine new
  idea buried inside it** (independently the same finding as arduino-veteran).
- **[MINOR] P-3 — the large stretch (modularizing) is filing, not depth.** Fine
  as homework hygiene; it should not be read as the chapter's genuine challenge
  for strong students. A content-bearing alternative is at hand: have them add
  the `__disable_irq()` fix and explain why it closes the gap.
- **[OK — correctly done, cost nothing] The volatile compression and the 4a/4b
  split both preserve full technical content** — nothing softened, only minutes
  reallocated, with the full written explanation one xref away. "This is the
  correct kind of Gate-1 fix: depth added at the top rather than removed from
  the middle."
- **[OK] `sl-day9-skeleton`'s trim is presentational, not substantive.**
- **[OK] Every register claim verified precise, none overclaimed** — exact
  names, exact bit fields, exact section numbers. "This is the standard the
  concurrency section should be held to, and mostly is not quite meeting."

---

# Synthesis — prioritized change list

Produced by `committee-synthesizer` from all eleven reports above.
