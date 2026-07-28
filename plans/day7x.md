# Day 7x — Debugging Embedded Programs

Chapter: `source/ch-debugging.ptx` · Old deck: `assets/ClassSlidesOLD/Day07x-Debugging.pptx`
(22 slides) · Downstream: **Lab 4 in flight** (`assets/Labs/Lab4_ES28.pdf`), Day 8
(timers/interrupts) benefits from debugger fluency.

**x-hour: 50 minutes. No pre-class reading — the class is self-contained.**
Students arrive mid-Lab-4: potentiometer + TMP235 wired, `ADCPot.c` working or
half-working. Every debugging tool taught today has an immediate customer.

**Revision 2** — rebuilt after Gate 1 (1 BLOCKER, 4 PWC; reports in
`reviews/day7x-gate1.md`). See "What Gate 1 changed" at the end.

## Objectives

By the end of class a student can:

1. Recognize the common sources of C bugs and name the practice that would
   have prevented a specific one of their own.
2. Read compiler error output strategically: start at the top, read *up* from
   the reported line, expect one root error to spawn many messages.
3. Place a diagnostic `printf` that answers a specific question — was this
   reached? is this value reasonable? — printing the *expected* value beside
   the actual one.
4. **Launch a STM32CubeIDE debug session, single-step, and watch a peripheral
   register change in the SFRs view.**
5. Set breakpoints, resume between them, and observe a variable at the moment
   it changes (seen in a guided demo; transferred in the stretch and Lab 4).

## The CRUCIAL step

> **Every student runs blinky under the debugger, predicts what
> `RCC_IOPENR` will contain before stepping the first line of `main()`, steps
> it, and sees GPIOAEN go from 0 to 1 in the SFRs view.**

Scaffolding to guarantee it (P-2):

- The program is **blinky** — the first program they ever ran, known line by
  line since Day 1. Zero new C to parse; all attention goes to the tool.
- **Blinky is already open and rebuilt before Part 3 starts**: the settling
  slide and the Part 1/2 presenter notes say "while we talk, find your Blinky
  project and hit build" — the project-reopen tax runs in parallel with the
  no-hardware parts, not at minute 20.
- The walkthrough is icon-by-icon with the real screenshots on the slides:
  bug icon → perspective-switch popup → "this is what you should see" anchor
  screenshot → SFRs tab → expand RCC → expand IOPENR. Slides are self-paced;
  the instructor circulates.
- The predict is tiny and binary (what does bit 0 show now? what will it show
  after this line runs?), answered in writing before the step (P-6, S-2).
- A **four-rung troubleshooting ladder** stays on screen/in the book for the
  whole launch (each rung = symptom → action):
  1. *Project won't build* → you're debugging old code, not the tool: grab the
     known-good blinky (pre-staged) and move on — today is about the debugger.
  2. *Board not found / connect or libusb error* → check the USB cable, then
     check the breadboard power lead: it must land on **3V3, not the NRST pin**.
     This mis-plug does **not damage anything** — it only resets the chip and
     blocks the debug connection until moved.
  3. *Clicked the wrong thing on the perspective popup* → Window → Perspective
     → Open Perspective → Debug.
  4. *Weird behavior, session seems stuck* → a previous debug session is still
     running: terminate it (red square) first — **one session at a time**.
  Plus the spoken script (presenterNote, Part 3 opener): "a good number of
  these won't launch on the first try — that's normal, put your hand up and
  I'll come by."
- **Checkpoint, minute 32** (S-8): if the room is not mostly past the IOPENR
  step, the MODER moment happens on the projector and Part 3d becomes a
  student-driven front demo. Students who never launched redo the walkthrough
  self-paced from the chapter (every screenshot is in the book) in open lab
  hours before Day 8 — that re-entry path is stated out loud and in the
  chapter.

## The STRETCH

For students who finish the guided walkthrough early (P-3):

**Debug your actual Lab 4 program.** Launch `ADCPot.c` under the debugger, set
a breakpoint on the line after the EOC wait, and watch `ADC_DR` in the SFRs
view while turning the potentiometer. Then check `ADC_CHSELR` and `ADC_CR`
against what your init code claims to have written. Unguided on purpose — the
guided walkthrough taught every move it needs; transferring them to a program
with real state is the genuine challenge, and it advances their lab. This is
also where Part 4's variable-watching becomes hands-on: watch `count` (or
`key` on the counter) on your own screen.

## Activity sequence (50 min)

| Part | Content | Mode | Min |
| --- | --- | --- | --- |
| — | Settling. On screen: "Open your old **Blinky** project and click build — leave it compiling while we start." | — | 3 |
| 1 | Where do bugs come from? — error-list show of hands; then write-and-share: *which practice would have caught yours?* | do → write | 6 |
| 2a | Compiler errors: real multi-error transcript, **mark the root line** → reveal: top-down, read up, one error spawns many | predict → reveal | 4 |
| 2b | Diagnostic printf: "ADCPot prints nothing" — **write where your one printf goes and what it prints** → reveal: reached? / reasonable? / expected-vs-got | predict → reveal | 5 |
| 3a | **Launch the debugger on blinky**: bug icon, perspective popup, anchor screenshot; troubleshooting ladder on screen | do | 8 |
| 3b | SFRs tab → RCC → IOPENR: **write the predicted bit-0 value after line 1** → step → GPIOAEN 0→1 | predict → do | 5 |
| 3c | **The MODER moment**: it reads 0xEBFFFFFF, not 0 — why? RM §6.4.1 crop on the slide: reset is analog; the two exceptions are PA13/PA14 = SWD, the debugger's own pins | observe → explain | 4 |
| 3d | Breakpoints (bridge: "stepping every line is slow — set a destination instead"): two breakpoints on the ODR lines, resume-hop, LED matches OD5; do NOT step into the delay loop | do | 7 |
| 4 | Watch a variable change — **student-driven front demo** on the Day 5 counter: class writes the predicted decimal for `key` before the volunteer presses `u` → 117 in Variables, 0x75 in USART_RDR | predict → demo | 5 |
| 5 | Which tool when (one slide, incl. the hardware-checklist pointer); stretch + re-entry announced; rest of hour = Lab 4 with the debugger open | tell | 3 |

Total 50. Part 3 = 24 min with an internal checkpoint at minute 32.

**Cut order if running long (lecture compresses before hands-on demotes):**
1. Part 1's write-and-share → show of hands only (–2).
2. Part 2b's predict → told reveal (–3).
3. Part 4's demo → 90 seconds, still student-driven (–3).
4. Part 3 degrades only via its own checkpoint; **never cut Part 3.**

**Part 3 is still the likeliest overrun.** Thirty simultaneous launches will
surface every rung of the ladder. That is why launch has its own 8-minute
sub-budget *after* the rebuild tax was moved to settling/Parts 1–2, why the
ladder is projected rather than narrated, and why the checkpoint is a named
minute, not a feeling.

## The datasheet moment (P-11)

Part 3c, required, its own row. When GPIOA_MODER first appears it reads
`0xEBFFFFFF` — *not* zero. Why? The slide shows the cropped reset-value lines
from **RM0490 §6.4.1, GPIO port mode register (GPIOx_MODER)**
(`assets/images/Day07x-Debugging/rm_moder_reset_value.png`): 0xEBFF FFFF for
port A, 0xFFFF FFFF otherwise — pins reset to analog (0b11, known from
Day 7). The two exceptions hiding in the "EB" are PA13/PA14, which reset to
alternate function: the **SWD debug port**. The debugger they are using at
that moment is why. (Told as a punchline, not derived — the decode is not a
class exercise.) Day 3's RM activity asked for exactly this power-on default;
today they watch it be true. *(Gate 1 found and fixed a live contradiction:
Days 1 and 3 previously claimed input/00 is the reset default — corrected in
ch-intro-blinky.ptx and ch-switches.ptx, 2026-07-28.)*

## Continuity

**Backward (all verified by the continuity auditor against sources):**
- Day 1: blinky line by line; registers-as-boxes; `1U << n` masks.
- Day 3: AD2 oscilloscope; RM §6.4.1 lookup (now consistent with the RM).
- Day 5: printf format specifiers (%d, %x, %lx — **not** re-taught, B-8),
  CoolTerm, RXNE polling, the keyboard counter (Part 4's demo program —
  the book's version polls RXNE and reads RDR inside the if; no blocking
  uart2_read, so the breakpoint goes on the RDR-read line and hits on
  keypress).
- Day 7: analog mode 0b11; `ADCPot.c` (stretch target); the "nothing
  printed?" ladder — Part 2b generalizes it.

**Forward:**
- Day 8 (in flight, other session): Day 7x must NOT explain interrupts; the
  "when the debugger is the wrong tool" line (pausing breaks real-time
  behavior) stays one sentence.
- BSRR stays unspent (verified absent from Day 7x).
- I2C days: AD2 protocol decode is mentioned in Reference only.

**Not taught today (deliberately):** semihosting/SWO printf, watchpoints,
fault handlers, the Memory view.

## P-14 (AI-honest)

Debugging is the course's central AI-era skill: an AI can draft `ADCPot.c`,
but it cannot press the reset button, watch the SFRs view, or know what *this*
board is doing. Every prediction is written before its reveal, but they are
not equally AI-proof: IOPENR, MODER, and ODR are verified against the
student's own hardware; the root-error line, printf placement, and ASCII
predictions are reveal-only (an AI answers them instantly — their value is
the committed reasoning, and Part 2a's closing line invites re-running the
experiment in the student's own project). The chapter now says the quiet part
out loud in Part 5: these tools are how you check any code you did not write,
AI-drafted included, with an xref to the course AI policy. The register-audit
move ("every bit you claim to set, read back set") is practiced by everyone
in Part 3c, not only by stretch-reachers.

## Hand-offs

- **No homework.** The class ends inside Lab 4 with the debugger open; the
  hand-off *is* the lab.
- **Re-entry path (stated in class and in the chapter):** anyone who didn't
  get a debug session running redoes the Part 3 walkthrough self-paced from
  the chapter during open lab hours before Day 8.
- The chapter's Reference section carries: the scientific debugging method
  (hypothesis, one change at a time, bisection, notes), the full prevention
  checklist, the hardware checklist, for-vs-while, the debugger control-icon
  table, and printf diagnostic patterns.

## Flags for Petra

1. **Known-good Blinky is half-staged.** `assets/starters/blinky.c` now exists
   (byte-identical to the Day 1 listing) and ladder rung 1 links it
   (`external/starters/blinky.c`) — but a source file cannot rescue a broken
   `.cproject`. Before the x-hour: upload `blinky.c` to Canvas, and ideally
   export the Day 1 CubeIDE project as a zip alongside it. The rung degrades
   gracefully ("hand up, watch with a neighbor") if the zip never exists.
2. **Stage the podium machine before class** (Part 4): counter project built,
   board wired, CoolTerm connected on the right port, no old debug session
   running. Part 4 has no fallback if this is not ready at minute 42.
3. **Standing rule L-2 is factually stale** and was NOT edited (a parallel
   session holds AUTHORING-book.md dirty). Lab 4 Appendix A documents the
   project setting that enables float printf, and Deliverable 4 requires
   `%f`. Suggested replacement when the file frees up: "No %f in printf
   examples — float printing is off by default and the STM32C031C6 has no
   FPU. Scale to integers and print %d. Where the caveat itself is being
   taught, mark the element check-rules: allow L-2." The chapter already
   teaches the corrected fact.
4. **Confirm the NRST no-damage sentence with your own eyes.** Adjacency and
   the connect-failure symptom are sourced (UM2953 Table 11; the Day 7
   ladder); "does not damage anything" is defensible but was the one physical
   claim the checker could not source. It is the anxious learner's most
   valuable sentence — keep it, but make it yours.
5. **Does a TA attend the x-hour?** The plan assumes instructor-only.
6. The anxious-learner reviewer suggests a standing **damage-safety rule ID**
   in AUTHORING-book.md — general spec change, your call.
7. Re-entry venue is phrased as "at any bench before next class" — name open
   lab hours explicitly if that is the intended venue.

## Notes from the old deck worth keeping

- Instructor-note failure modes (slide 3) → ladder rungs 2 and 4.
- Slide 18's caution verbatim: do **not** single-step into the software-delay
  `for` loop; if you do, "Terminate and Relaunch" or "Reset the chip and
  restart".
- Slide 21's speaker note: `'u'` = 117 = `0x75` — the same byte in Variables
  (decimal) and USART_RDR (hex). (No ASCII table exists in the book — Day 5
  taught individual codes — so the class prediction is anchored on
  `'a'` = 97 and letters running in order.)
- The screenshots are from Petra's own Winter2025 CubeIDE session on the real
  blinky — use them as-is (before/after pairs), not re-mocked.

## What Gate 1 changed

Panel: class-logistics (BLOCKER), active-learning, cognitive-load, continuity,
anxious-nonhardware (all PWC). Reports: `reviews/day7x-gate1.md`.

1. **Part 3 was 20 min of wishful budgeting** — now 24 min in four sub-budgeted
   rows, with the project-rebuild tax moved to settling/Parts 1–2 and a named
   minute-32 checkpoint (logistics 1, 2, 5).
2. **Part 4 as 30-student hands-on was unachievable** (second stale project +
   second session + CoolTerm in 7 min, colliding with the "didn't terminate"
   failure mode) — now a student-driven front demo with a class-wide written
   ASCII prediction; hands-on transfer moved to the stretch (logistics 3;
   cognitive-load 4; active-learning 3 preserved the predict).
3. **Part 2 was the hour's only all-passive block** — now two predict-then-
   reveal cycles (root-error line; printf placement) at the same 9 minutes;
   hardware checklist moved to Part 5/Reference (active-learning 1;
   cognitive-load 1, 6).
4. **Cut order reversed**: lecture compresses before any hands-on demotes
   (active-learning 2).
5. **MODER moment had contradictory status** (required P-11 moment *and*
   stretch) — now required, its own row, RM crop on the slide instead of a
   live PDF hunt; deleted from the stretch (cognitive-load 2, 3).
6. **Troubleshooting covered 2 of 4 failure categories** — now a four-rung
   ladder with the no-damage reassurance and a stated re-entry path
   (anxious 1, 2, 4; logistics 4, 6).
7. **Cross-chapter blocker**: Days 1 and 3 taught that input/00 is the MODER
   reset default — wrong per RM0490 §6.4.1 and functionally broken for inputs
   (analog mode disconnects the input buffer); the chapter's own drivers
   always cleared the bits. Fixed in ch-intro-blinky.ptx (table + aside) and
   ch-switches.ptx (reveal slide, Reference prose, walkthrough snippet, Day 4
   FSM listing) before this chapter stages the payoff (continuity 1, 2).

## What Gate 2 changed

Panel: checker-technical-accuracy, expert-class-logistics,
expert-cognitive-load, learner-visual, learner-anxious-nonhardware,
expert-ai-era-readiness (4 BLOCKER, 2 PWC). Reports:
`reviews/day7x-gate2.md`; synthesis applied 2026-07-28.

1. **Three factual claims corrected** (checker, all verified by
   compile/render/document): the macro-parse explanation for the
   missing-semicolon error (the "call" is the macro value applied to GPIOA's
   parenthesized expansion — reproduced with the course toolchain); printf
   cost restated at the course's 9600 baud (was 115200, a 12× understatement);
   the "%f is unsupported" absolute softened to off-by-default + Lab 4
   Appendix A + no-FPU advice. Also: "or reprogrammed" deleted (bootloader is
   an independent path), the delay-loop "one click each" gloss dropped, the
   NRST mechanism softened to its sourced form, and unsourced frequency
   claims ("every term", "in any room this size") reworded per B-11d.
2. **Part 2b rebuilt against the real ADCPot.c**: symptom is now "prints its
   two greeting lines, then nothing more" (nothing-at-all already has Day 7's
   canonical answer); the one printf goes at the first line of
   pa0_adc_init(); variables renamed to sensor_value; the deck gained its
   first instructor-only solution slide (P-10).
3. **The MODER set-piece no longer spoils itself**: the before/after figure
   split in two; the observe slide shows only the puzzle; a new step-reveal
   slide confirms MODE5 0x3 → 0x1 and names the register-audit move, which
   every student now practices (ai-era).
4. **Visual gaps closed with real assets**: annotated bug-icon toolbar crop
   (the first physical action now has a picture); Nucleo power-header crop
   (3V3 vs NRST); IOPENR before-panel re-cropped to match the after-framing;
   yellow-highlight captions rewritten to the semantics the screenshots
   actually show (re-read since last display; only the changed row glows
   after a step) — checker and learner-visual were describing the same fact.
5. **Ladder rung 1 became a two-tier procedure with a real artifact**
   (assets/starters/blinky.c, linked from the chapter): paste over
   Src/main.c, build, ~60 s; still stuck → hand up, watch with a neighbor,
   redo from the chapter before next class (the re-entry path now lives at
   the point of failure, not only in the recap).
6. **Pacing fixes**: the crucial-step presenterNote now states the self-paced
   model ("do not gate the room"); the stretch is announced at Part 3d; the
   compiler reveal split into two slides; a GCC-anatomy gloss precedes the
   transcript; the perspective caption trimmed to the two tabs that matter
   (plus the screenshot's own comment erratum noted); "twenty minutes" →
   fifteen.
7. **Escalations recorded** in Flags 1–4 (blinky zip + Canvas, podium
   machine, L-2 spec correction, NRST no-damage confirmation).
8. **Dissent recorded**: ai-era's "break your own Blinky in Part 2a" was
   overruled for this offering (it would break the one project Part 3 needs,
   minutes before launch) — revisit next offering if launches go cleanly; the
   invitation to re-run the experiment after class carries the intent.
