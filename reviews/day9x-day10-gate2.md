# Gate 2 — `source/ch-i2c.ptx` (Days 9x and 10, I2C)

Reviewed at commit `9b1a75c`: the chapter, its 54 `<slide>` blocks, the two
decks (`day9x.json`, 46 slides; `day10.json`, 41 slides), and the three new
starters.  All four mechanical checks passed on the draft the committee saw,
and every slide fitted at 1280×720 in both views — so, as on Day 9, nothing
below was machine-catchable.

**Panel:** the standing core of seven — `checker-technical-accuracy`,
`expert-continuity-auditor`, `expert-class-logistics`, `expert-cognitive-load`,
`learner-visual`, `learner-firstgen-novice`, `learner-anxious-nonhardware` —
plus four rotators the chapter's character called for:
`learner-arduino-veteran` (it replaces `Wire.h` *and*
`Adafruit_LEDBackpack.h`), `expert-embedded-industry` (four named datasheet
lookups and a register contract), `learner-ai-reliant` (a codeable deliverable
and an AI-critique activity of its own), and `learner-weak-circuits` (unlike
Day 9, this chapter wires something new and reads a scope trace).

The visual reviewer was given every figure rendered as a PNG, not a path.

---

<!-- Reports are appended below, one section per reviewer, verbatim. -->

## `expert-cognitive-load` — MAJOR

- **[MAJOR] P-7 — Day 9x Part 6, `subsec-day9x-library`.** Gate 1's blocker on this back half ("taught the whole peripheral in `tell` mode") has been relocated, not resolved, inside Part 6 itself. The part opens well — students derive the five library functions from what they watched on the scope — but then pivots, with no further activity, into a register-level opening of the box: `I2C_CR2`'s five fields, the `=`-vs-`|=` habit, the RM master-transmit sequence (BUSY/TXIS), and the full hardware block diagram (shift register, clock control, noise filters, address-match unit, SMBus blocks). Eight-plus new named things in explain-only mode, in a part budgeted 7 minutes and containing 8 slides — under a minute per slide. The plan's own week-level cut list names this stretch as excess ("Day 9x's field-by-field walk of `I2C_CR2`, which moves to Reference"), which concedes the load problem rather than fixing it. Split Part 6 into the five-function interface (keep the activity) and a separate short beat for opening `i2c1_byteWrite()`, or move `sl-day9x-hardware` to Reference by default — `subsec-i2c-ref-cr2` already carries this material with room to breathe.

- **[MAJOR] P-4 — the crucial step's own reference vanishes before students use it (`act-i2c-capture-t4`).** Students must mark START, seven address bits, R/W, ACK and STOP on a trace they capture themselves. The only labeled reference for what those look like — `fig-i2c-frame-diagram` and the labeled failed-trace walkthrough — is shown and taken down in Part 3 (`sl-day9x-noack`'s note says "Thirty seconds… then move to the real capture. Do not walk it bit by bit"). By the time the hands-on task starts the screen holds the wiring photo and then the troubleshooting ladder ("Stays up for all of Part 4") — not the protocol legend. Students hold five signal definitions in working memory while wiring hardware, flashing code and learning single-sweep triggering. Keep a compact legend visible during Part 4 — the generic labels, without the noack example's bit values, so it is not the answer.

- **[MAJOR] B-8 — Day 9x Part 2 re-teaches the reading's synchronous/half-duplex explanation almost verbatim.** Same examples, same order, same conclusions, with nothing added until the final paragraph (the address shift, which *is* new and load-bearing). Costly because Part 2 is budgeted 6 minutes and the address-shift content is what the Part 4 capture depends on. Trim to a one-line callback and spend the time on the address shift.

- **[MINOR] P-7 / P-2 — open-drain gets explain-only treatment with no retrieval moment (`sl-day9x-opendrain`).** Flagged in-text as "one thing that is new," but unlike BSRR on Day 9 — redesigned so it is "written, not only watched" — open-drain gets three narrated slides and no predict moment. A one-line predict ("if both ends were push-pull for the one bit-time SDA changes hands, what happens?") before the short-circuit explanation would convert transmitted load into germane load.

- **[MINOR] P-9 — Day 10 Part 8 asks for unscaffolded recall (`act-i2c-sevenseg-t3`).** "The `E` and the `S.` you derived in Part 6" assumes students remember values that still exist in their own flashed `writeFirstDigit.c`. A one-line pointer turns an implicit memory demand into an explicit external scaffold.

- **[MINOR] S-9 — `sl-day9x-hardware` does not stand alone.** The figure shows the address-match unit and SMBus blocks; the slide caption covers only the shift register, clock control and registers — the explanation of the two unused blocks lives entirely in the presenter note. Move the "we are always the controller, so we never use it" line onto the caption.

## `learner-anxious-nonhardware` — BLOCKER

- **[BLOCKER] P-14, P-2, S-17 — every diagnostic ladder terminates in "re-seat the wires."** Day 9x Part 4's `<ol>`, `sl-day9x-ladder`, Day 10 Part 2 / `sl-day10-verify`, and `sl-day10-ladder` all end at "re-seat / check 3.3 V not 5 V / check D and C aren't swapped." None has a next step for the student who does all of that correctly and the display still says nothing — which, across two class days built entirely on live hardware, is the scenario I dread. The book's own precedent exists elsewhere in the corpus (S-17's "Still stuck? We're here to help!") and is absent from both ladders here. The Day 9x minute-32 checkpoint is the only individual-level fallback in the chapter, it is instructor-triggered and room-wide rather than something I can reach for myself, and Day 10 has no equivalent at all. Add one line to each ladder — a known-good backpack the instructor keeps for this, or an explicit "flag it and we'll swap boards."

- **[MAJOR] P-1 — the reversed-polarity case is never mentioned at all.** The 3.3 V-vs-5 V rule is stated clearly and early, which is good. But `+`/`−` swapped is never mentioned — not to say it is safe, not to say it is dangerous, not to say it is an open question. For a student already nervous about wiring, silence reads two ways at once: either nobody thought about it, or it is being left out because the answer is bad. State it plainly: something like "what happens if `+` and `−` are swapped is not something we have characterized — treat it as a mistake to avoid, not a test to run."

- **[MAJOR] P-14, P-2 — `act-i2c-capture-t4` asks every student to mark an ACK, and the ladder names NACK as an expected outcome.** A NACK trace has no ACK to mark. Nobody tells a case-3 student what to write in that box; "stay calm, you have a real capture" does not resolve that the assigned task, read literally, asks for something that is not on their screen. Add: "If yours is case 3, write NACK in the ACK box instead — that is the correct answer for what you captured." Separately, the ladder's header "Nothing on the screen?" does not fit case 3, which *is* a trace — a student scanning for their symptom may not find themselves there (S-11).

- **[MINOR] P-2 — "If yours is not running, take a working copy before we start" does not say where the copy comes from.** Every other file drop in the chapter is explicit ("on Canvas"); this is the one place a student who most needs the safety net has to guess how to reach it.

*Not flagged:* tone throughout is careful — no "simply/just/obviously," the NACK reassurance and the AI-review safety net both state the rescue plainly rather than performing it, and Parts 6 and 8 both hand every slow student the worked solution before the next section. The gap is specifically the hardware escape hatch, not the prose.

## `expert-class-logistics` — BLOCKER

**Running clock, Day 9x:** 0–3 settling, 3–5 announcements, 5–9 Part 1, 9–15 Part 2, 15–20 Part 3, 20–35 Part 4 (hard checkpoint at 32), 35–42 Part 5, 42–49 Part 6, 49–54 Part 7a, 54–59 Part 7b, 59–63 Part 8. The deck's presenter notes sum to 60 minutes of content plus 3 settling — 63, not 65.

**Running clock, Day 10:** sums to exactly 65 with zero slack. Part 8 starts at minute 48 only if all six preceding parts land on budget.

- **[BLOCKER] P-2, P-14 — Day 9x Part 4's fifteen minutes cover four stacked first-time activities:** wiring a new component (4 wires, unresolved polarity risk), a full project-copy-build-flash cycle (Day 9's equivalent software-only step got 9 minutes for that alone), a new AD2 mode (single sweep, trigger on edge, last used on Day 3), and reading a five-item trace. The checkpoint at minute 32 is clock-anchored, not anchored to Part 4's actual start, so any drift in Parts 1–3 shrinks the window further. If it fires — likely for the majority of a real room — the fallback ("project the capture and have students mark that one instead") erases the crucial step's own stated purpose for most of the class, not just the stragglers.

- **[MAJOR] S-8 — Day 9x's deck timings do not reach 65.** 2+4+6+5+15+7+7+5+5+4 = 60, plus 3 settling = 63. The missing 2 minutes is the plan's own Part 9 ("Recap; Thursday is the display"), which has a labeled kicker and presenter note in *both* sibling decks (`day9.json`, `day10.json`) but not in `day9x.json`, where the day ends on a bare recap slide with no time budget and no section marker. This is the identical class of arithmetic slip Gate 1 caught on Day 9's checkpoint minute; it has moved from the checkpoint into the closing beat.

- **[MAJOR] S-8 — Day 10's 65 minutes have no slack, and only one named lever protects Part 8.** The only documented compression is Part 1, 9→6 min, recovering 3 minutes against 39 minutes of unprotected Parts 2–7 — six beats including a datasheet derivation, a paper construction activity and a first-write debugging surface, none named as compressible.

- **[MAJOR] S-8, P-2 — neither day's cut list lives in `ch-i2c.ptx` itself.** Grepping the chapter for "cut", "compress", "running long" returns nothing for either day. The guidance exists only in `plans/week5.md` and as a single deck presenter note. An instructor mid-class, flipping to `subsec-day9x-capture` or `subsec-day10-driver` for what to cut, finds nothing.

- **[MAJOR] P-2, B-11c — Day 10 Part 2 has no checkpoint and no recovery path for a genuinely broken display.** Unlike Day 9x Part 4 and Day 9 Part 2, it is a flat three minutes with no stated boundary if re-seating does not fix it and no equipment fallback if the failure is hardware. Since the display gates Day 10's entire crucial step, a student with a dead unit has no way back in.

- **[MINOR] B-11c, P-2 — Day 9x has no local "Equipment:" line,** though Day 9 and Day 10 both state theirs. The 1:1 AD2-per-student assumption Part 4 depends on is never stated where an instructor auditing that section would check it.

## `expert-continuity-auditor` — MAJOR

- **[MAJOR] P-13 / L-6 — the driver file has two names and the chapter never says to rename it.** The in-class driver is `SevenSegPartial.c`/`.h` throughout Parts 6 and 8, put in `Src`/`Inc` of project `SevenSegI2CSecondSteps` — *not* `mylib`. But Part 7's firmware-layers discussion, the Adafruit-correspondence slide and the final answer listing's `#include` all silently call it `SevenSeg.c`/`.h`, and Part 9's homework says "Keep `SevenSeg.c` and `SevenSeg.h` in your `mylib` folder — Lab 5 wants them there" with no sentence telling the student to rename or move anything. Contrast `i2c.c`/`i2c.h`, which the chapter explicitly routes into `mylib`. As written, a student following the chapter literally ends the day with `SevenSegPartial.c` in a throwaway class project and no instruction to produce the pair Lab 5 assumes. Fix: rename the skeleton to `SevenSeg.c`/`.h` from Part 6, or add the copy-and-rename sentence in Part 8 or 9.

**Checked and clean:** (1) Forward references — the Day 9x reading stays at protocol level with no register, timing value or captured trace, and `fig-i2c-frame-diagram` is a drawn diagram not a capture; the Day 10 reading stops at sharing plus time-division multiplexing and never gives the RAM map. Both match the plan's constraints. (2) Day 9x → Day 10 delivery: the five functions, the shifted address and the AD2-as-instrument are all delivered as Day 10 assumes. (3) Day 8 is restated, not reversed — the chapter correctly gives the *different* reason for assigning a whole mask on `I2C_CR2` (control register, leftovers) versus Day 8's reason on `TIM14->SR` (status register, read-back). (4) B-8: the multiplexing split between reading and Part 3 is a clean deepen, not a repeat. (5) BSRR appears zero times, as intended — it was spent on Day 9. (6) `fig-i2c-pins` correctly says AF6, not the AF1 bug the ground truth flagged. (7) P-13: the chapter is not collapsed into lab prep. (8) Day 13's move to `ch-accelerometers.ptx` is fully implemented, with no stray accelerometer content left here.

## `learner-firstgen-novice` — MAJOR

- **[MAJOR] B-5, P-2 — `act-i2c-capture-t2` bundles five distinct actions into one task:** put two files in `mylib`, copy `TemplateProject`, rename it, add `pingDisplay.c` to `Src`, build and flash. For a student who has never independently done a project copy, there is no way to tell *which* sub-step went wrong if the build fails. Split into separate `<task>` elements. This sits directly before the day's crucial capture.

- **[MAJOR] P-4, P-7 — open-drain is a genuine first encounter and gets one dense paragraph, twice, with no figure either time.** Pull-up resistors have a figure back in `ch-switches.ptx`; this is where the mental model of "a resistor holds a pin HIGH" breaks, because now there is a second thing — a transistor that can be *off* — that has never been drawn. Two dense unvisualized ideas back to back, right before `I2C_TIMINGR`. One small diagram (two switches onto a shared wire, one open one closed, the wire reading LOW) reused at both locations.

- **[MAJOR] P-1 — "duty cycle" is used three times and never defined here.** It gets its real definition, with a `<term>` tag and a PWM figure, in `ch-motors.ptx`, which comes *after* this chapter in `main.ptx`. The caption says "the duty cycle in sixteenths" as if the reader already knows. The code (`brightness & 0xf`) does not require understanding it, so it does not block the crucial step, but it is unexplained jargon. A one-clause gloss fixes it.

- **[MINOR] P-2 — the ladder's second rung diagnoses without scaffolding the fix.** Rung 1 points at a figure and rung 3 explains what a NACK is; rung 2 says "check the trigger source and edge, not the wiring" without naming the control to click. This lands at the hard checkpoint. Name the actual Waveforms setting.

- **[MINOR] P-1 — the objectives introduce "the backpack" before the term is used or explained anywhere else** (first real explanation is ~380 lines later). Objectives previewing vocabulary is a common convention, but for this reader it is a plausible first stumble before class has begun.

*Not flagged:* tone is good throughout — no "everyone already knows this" language, and the NACK/reset-button and address-shift traps are handled with real reassurance rather than performance of it.

## `learner-arduino-veteran` — BLOCKER

- **[BLOCKER] P-1, P-5 — the `Wire.h` mapping asserts something the chapter itself falsified 130 lines earlier.** After the mapping, the text says *"The difference is not what the calls do; it is that this time you can open the file and see what happens underneath."* But `sl-day9x-hang` / `subsec-day9x-debrief` spends a whole beat showing that `i2c1_byteWrite()` returns `void`, checks for NACK exactly once, and then **hangs forever** if nobody answers — the reason the wrong-address activity needs the reset button. `Wire.endTransmission()` returns a status byte (0–4) and does not silently hang. The Arduino model I would wrongly apply: "the calls do the same thing, so a NACK will just come back as an error I check, like it always has." This is exactly the collision P-1/P-5 require naming, inside a beat the plan calls not cuttable. Fix: connect Part 5's observed failure to Part 6's mapping instead of denying it — "the difference is not the wire protocol; it is that `endTransmission()` hands you back a status code the instant it knows, and `i2c1_byteWrite()` hands you back nothing and can hang, which is exactly the bug you just found."

- **[MAJOR] P-1, B-3, B-6 — the read-side mapping is wrong.** "`Wire.requestFrom(addr, n)` followed by `Wire.read()` is `i2c1_byteRead()` or `i2c1_memRead()`" collapses two different Arduino sequences. The real idiom for a register read is `beginTransmission(addr); write(regAddr); endTransmission(false);` — a repeated START, not a STOP — *before* `requestFrom()`. The write side of the same paragraph gets this right. A student who follows the read side gets whatever byte the device streams next, not the register they asked for. Give the read side the same two-tier treatment the write side has.

- **[MAJOR] P-1, P-5 — `begin(0x70) → SevenSeg_init()` is mapped 1:1 and is not.** `Adafruit_LEDBackpack::begin(addr)` does both what `i2c1_init()` does (it calls `Wire.begin()`) *and* what `SevenSeg_init()` does (oscillator, display on, brightness) — one Arduino call the course splits into two. It also takes the address as an argument, while `SevenSeg_init()` takes none and hardcodes a `#define` — even though Part 8, in the same chapter, teaches that eight backpacks can share a bus via A0–A2. The Arduino model I would wrongly apply: "one setup call handles everything, so why are there two, and why can I not address a second display?" This is the layering point Part 7 is trying to make, and the table never says the Arduino call is doing double duty. Add one sentence, and note in Part 8 that a hardcoded address is the price of the simpler driver.

- **[MINOR] L-5, L-6 — `Wire.begin()` is overloaded** and the mapping does not say so: with no argument it is controller-mode init; with an address it configures the board as a *target*, a mode this peripheral and library never use. The chapter is careful about controller/target everywhere else. A one-clause aside closes the gap.

## `learner-ai-reliant` — BLOCKER

- **[BLOCKER] P-14 — `act-i2c-ai-review` is the same design the same reviewer falsified on Day 9.** Pasting both listings with "review this STM32 timer+interrupt code for behavioral bugs, not style" reliably surfaces all five of the book's own reveal points without ever having seen a Nucleo: the PSC values imply an assumed clock that may not match the target's; Gemini's `tim14_init()` has no DIER/NVIC/ISR so it is polling despite the assignment; the button test lives inside `if (timerElapsed)`, delaying response; ChatGPT never resets `TIM14->CNT`. All are generic code-review observations. `plans/week5.md` already documents that Gate 2's `learner-ai-reliant` falsified an identical claim for Day 9 Part 7 — and this is now billed as "the week's P-14 beat." Redesign: anchor at least one task to something only the student's own board can supply — e.g. "run *your own* homework file and record its actual counted interval over 10 s with a stopwatch; now predict, before checking, whether ChatGPT's or Gemini's version would read faster, slower, or the same — then explain why from the PSC and ARR values."

- **[MAJOR] P-14, B-3 — `act-i2c-five-operations` has one canonical answer** and the chapter admits as much four paragraphs later ("this is the library you were using"). Any assistant reproduces init/byteWrite/byteRead/memWrite/memRead unprompted; it is `Wire.h`'s public surface. Nothing ties it to the student's own capture. Redesign: "for each of the five things you marked on *your own trace*, which library call produced it — and looking only at your trace, could you tell whether it came from `byteWrite` or `memWrite`?"

- **[MAJOR] P-6, P-14 — the 0xE0 address question is asked twice and verified never.** The rule is a single statable fact the chapter itself states three paragraphs later and again in the Reference table; an assistant answers from the question text alone. Task 3 asks students to *sketch* the predicted waveform but nothing verifies that sketch against hardware — predict without verify, P-6 half-satisfied. And the same scenario appears in both `act-i2c-wrong-address-t3` and `act-i2c-address-trap`, so an answer obtained once is reused. Have students reflash with the wrong `#define` they derived and capture it; cut the duplicate (B-8).

- **[MAJOR] P-11, P-14 — `act-i2c-timingr` is proportional extrapolation from numbers already in the caption.** An assistant divides and returns PRESC = 2 with the same "everything reduces to 4 MHz" explanation the book gives as its own answer. The one thing that would make it un-outsourceable — measuring the resulting SCL period on the AD2 — exists in the chapter's *prose* but is not one of the activity's four tasks, so it never becomes something a student has to do. Add it as a fifth task.

- **[MAJOR] P-2, P-14 — the crucial step is outsourceable and its underlying understanding is not tested where an AI cannot reach.** `SevenSeg_write()`'s one line is a direct pattern-match off `writeFirstDigit.c`'s own `i2c1_memWrite()` call, seen forty minutes earlier, plus the four-argument breakdown the book spells out immediately before the task. The only check on the underlying understanding — "say out loud what each of the four arguments has to be and why" — is spoken, not written, and `sl-day10-driver-todo` carries no `room`, unlike `sl-day9x-presc` and `sl-day9x-address-trap`. The nearest genuine test of the RAM map (the homework clock's colon bit) happens after the crucial step and is homework, so it does not gate the in-class moment. Redesign: a written wrong-answer diagnostic immediately before TODO 4 — "a classmate wrote `i2c1_memWrite(HT16K33_ADDR, 1, 2*HT16K33_NBUF, display_buffer)`, starting at address 1. Predict in writing what the display will show, then flash it and check."

- **[MINOR] P-14 — `act-i2c-ht16k33-commands` and `act-i2c-make-pattern` are pure bit-packing from a template given inline in the task text,** so an assistant completes them outright with no datasheet page-turning. Not raised higher because both are ungraded warm-ups feeding forward into hardware-verified work minutes later — but note that as written the actual P-11 datasheet moment happens passively during the instructor's walkthrough of the figure, not inside a task a student performs.

**Already safe:** `act-i2c-capture` is the strongest activity in the chapter — every task terminates in a physical artifact no assistant can generate, and task 5 demands a count taken from that trace. `act-i2c-wrong-address-t1/t2` likewise require a real capture and a real NACK. `act-i2c-first-digit-t4` (predict what subaddress 1 does, then try it) is a correctly built predict-then-verify pair. `act-i2c-homework-t3`'s colon bit is the one place the book says plainly that a fact cannot be looked up — though note that fact is public in the `Adafruit_LEDBackpack` source the chapter itself names, so it is worth stress-testing before relying on it.

## `expert-embedded-industry` — MINOR

Preamble, kept because it is a finding of its own: the four named lookups are real and generative (students *derive* PRESC, the AF6 pin and the 0x21/0x81/0xEF command bytes rather than copying them); the `I2C_CR2`-as-contract framing and the `SADD[7:1]` quote are exactly how a new hire should think about a control register; the honesty about `i2c1_byteWrite()`'s NACKF/TXIS hole is better than most textbooks manage, naming the flag, quoting §23.4.9 and pointing at Figure 228 rather than hiding the wart; and Part 7's layering argument is the real portability-and-debuggability argument, not a tidiness lecture.

- **[MAJOR] P-14 — the "no timeout, ever" habit is never generalized.** The chapter is honest about one blocking-wait failure (`while(!(...TXIS));` never returning after a NACK) but never says that *every* wait in this library assumes the hardware behaves and none has a timeout. Worse, the very first wait — `while( !(I2C1->ISR & I2C_ISR_BUSY) );` right after START — is never connected to the no-pull-ups discussion two sections later ("a bus with no pull-ups anywhere never leaves the LOW state"). If SDA cannot rise, `BUSY` never sets and the program hangs at the very first I2C call, with none of the NACK story to fall back on — a worse case than the one the chapter does walk through. One sentence generalizing it, explicitly connected to the stuck-low case.

- **[MINOR] P-5, P-11 — the pull-up range is the only numeric constant in the chapter that is not derived.** 5–10 kΩ is given as a memorized range, one paragraph after a rigorous PRESC derivation the chapter explicitly prizes. Students who leave this course's two pre-fitted devices will have to size a pull-up from bus capacitance and speed; naming that trade-off, even without deriving it, would match the chapter's own standard.

- **[MINOR] P-14 — the address-conflict failure mode is only in a quiz distractor.** A2/A1/A0 are introduced so that "eight of these can share a bus," but the failure they exist to prevent — two devices left at the same default address, both driving SDA on a read and corrupting the byte — is never stated as a plain warning in the teaching prose. It surfaces only in a reading-question distractor's feedback and in a dead Canvas-quiz comment. This is one of the most common real I2C integration bugs (two of the same breakout on one bus) and deserves one explicit sentence near the address-select discussion.

- **[MINOR — verify before publication] P-11 — "RM0490 Figure 228" is the one citation I could not independently confirm** (no PDF text extraction in that environment). Every other named lookup checks out against the ground truth's verified section numbers; this figure number was not in that pass, and it is cited three times as the canonical "what production code does instead."

## `learner-weak-circuits` — MAJOR

- **[BLOCKER] P-2, B-11c — `fig-backpack-pins` shows four bare unsoldered pads, and the text calls them "header pins."** I viewed the photo directly: there are no pins standing up, no header strip, nothing to clip or plug a jumper onto. The text calls them "header pins" throughout and the activity says only "wire the display: + to 3.3 V…". Nowhere does the chapter say *how* a wire attaches to a bare pad — solder, pre-installed header, alligator clip. A student cannot start the physical task from what is on the page, and guessing wrong on a solder joint is the damage-the-board fear itself. State explicitly what is already on the kit's backpack, or show the actual attachment method.

- **[MAJOR] P-1, P-4, P-7 — the half-brightness answer depends on an encoding rule stated only in the Reference section.** Part 4 asks for "half brightness" and the answer is given as `0xE7, 8/16` with no derivation. That depends on knowing the encoding is (N+1)/16, not N/16 — a rule stated only in the Reference table at the end of the chapter, after Day 10's class section. The fact a student needs to check their own answer against is not available where the activity happens, and the one step of arithmetic that would resolve it (`0111 → 7 → (7+1)/16`) is never worked. Move the "+1" rule into the Part 4 figure caption or prose, or show the worked step at the reveal.

- **[MAJOR] P-1 — the pull-up value is asserted, not explained.** "Typically 5 kΩ to 10 kΩ… a bus with no pull-ups anywhere never leaves the LOW state and a bus with too many in parallel cannot be pulled LOW cleanly." A student who has never reasoned about a pull-up has no way to judge why 5–10 kΩ and not 100 Ω or 100 kΩ — the actual trade-off (low R draws too much current and cannot be pulled below V_IL by an open-drain sink; high R is too slow against bus capacitance to reach 100 kHz) is never given, so the number reads as a fact to memorize.

- **[MAJOR] P-1 — grounding is instructed six times and never explained.** "Both minus leads — the ones with the white stripe — to ground" appears repeatedly, and the Fritzing figure shows the AD2's grounds tied into the same rail as the backpack's `−` and the Nucleo's GND, but nowhere does the chapter say *why* the scope's ground reference has to be the same node as the circuit's ground. I checked `ch-switches.ptx`, which this chapter defers to ("exactly as on Day 3"), and the same gap exists there. Since this chapter is the one under review, and it is the single most common wiring failure, add the sentence here even though Day 3 does not have it.

- **[MINOR] P-1 — "a bus with no pull-ups anywhere never leaves the LOW state" is stated as a bare fact** though it is derivable from the open-drain explanation given earlier in the chapter (only a pull-down is active; nothing restores HIGH without a resistor). A one-clause tie-back closes the loop for a reader who has forgotten the earlier section by Part 7a.

- **[MINOR] P-4 — the pull-up resistor itself never gets its own schematic.** It is described in prose and appears inside `fig-uart-vs-i2c`, which is bundled with the whole UART-versus-I2C comparison rather than being a focused schematic. A single small drawing isolating "pull-up resistor + open-drain transistor" as a drawable primitive would do more for a circuits-shaky reader than the block diagram carries incidentally.

## `learner-visual` — BLOCKER

- **[BLOCKER] B-7, P-11 — `fig-ht16k33-cmd-table` image 1 does not contain the System setup row.** The caption promises it (*"System setup is 0 0 1 0 X X X S, where S is the internal oscillator"*) and `act-i2c-ht16k33-commands` task 1 sends students to that exact row "in `fig-ht16k33-cmd-table`". The rendered image shows only the **Display data Address pointer** row; its viewBox is tall enough for one row plus its description text. Images 2 and 3 are Display setup and Dimming set. The row the whole "turn the oscillator on first" thread depends on — Part 4, Part 6, Part 8 — is missing from the figure the caption and the activity point at.

- **[BLOCKER] B-7, B-11a — `fig-i2c-scope-ack`'s caption puts the handover blip on the wrong side of the ACK.** The caption says the data byte is `0x00` and *"eight more clocks with SDA held LOW"* follow the first ACK, with *"brief HIGH blips just before the two ACKs."* In the rendered trace SDA shows a clear HIGH excursion **after** the annotated Ack, not before it. Ask Petra to check against the raw AD2 capture: either the captured data byte was not `0x00`, or the caption describes an idealized trace.

- **[MAJOR] B-11c, B-11 — `fig-display-wiring` is cropped through the point where the red `+` wire lands on the Nucleo.** It exits the top of the frame before reaching a visible pin. The caption's highest-stakes claim in the whole two-day sequence — *"+ to the Nucleo's 3.3 V pin… not the 5 V pin"*, repeated with explicit safety warnings in prose and on `sl-day9x-wiring` — cannot be verified from what the figure shows. Recrop to include the power header.

- **[MINOR] B-11a — `fig-waveforms-setup`'s caption walks five steps; the image is annotated 1, 3, 4, 5, 6.** There is no step 2 anywhere on the figure. Either a callout was dropped when the image was built, or the numbering needs correcting to match.

- **[MINOR] P-4 — push-pull versus open-drain is taught entirely in prose plus one ASCII-art code comment.** "A transistor from 3.3 V and a transistor to ground both switched on across the same wire" is hard to hold without seeing two output stages drawn against one wire. A two-panel sketch — push-pull driving HIGH vs LOW, open-drain floating vs pulling LOW with the pull-up shown — is exactly the kind of diagram P-4 prefers, because it can be drawn on during class.

- **[MINOR] S-3, B-7 — `sl-day9x-decode`'s caption restates the wiring** rather than telling the student what to notice on the projected slide. Something like "the same trace, but as decoded bytes instead of edges" satisfies S-3.

**Checked and consistent with their captions:** `fig-i2c-scope-noack` (bit pattern `1100000`+`0`, the nine-pulse count and the NACK all check out against the trace), `fig-i2c-frame-diagram`, `fig-i2c-timing-tables` (all three 100 kHz columns verified value by value against the caption's claim that only PRESC varies), `fig-i2c-pins`, `fig-ht16k33-addr-frame`, `fig-four-digit-wiring` (pin numbers 14/11/7/10/6 and 13/9/4/2/1/12/5/3/8 all match the image precisely), `fig-firmware-layers`, `fig-display-photo`.

### Author's own re-measurement of `fig-i2c-scope-ack`

Because this is the defect class Day 9's Gate 2 was built to catch, I measured the trace out of the SVG's embedded bitmap rather than accepting or dismissing the finding. Extracting the blue and orange pixel runs and thresholding them:

- **18 SCL pulses**, rising at x = 390, 463, 537, 610, 685, 758, 833, 907, 980, 1055, 1128, 1202, 1275, 1350, 1423, 1497, 1571, 1645. Caption's count is right.
- SDA falls at x = 315 while SCL is HIGH (SCL's long HIGH runs 139→344) — the **START**. Right.
- SDA is HIGH from 351 to 576, so the first three clock rises (390, 463, 537) sample 1 and the next five (610…907) sample 0: **1 1 1 0 0 0 0** then the write bit. Right.
- The **9th pulse (980–1009) samples SDA LOW — the ACK.** Right.
- SDA is LOW across the next eight rises (1055…1571): **data byte 0x00**. Right.
- The 18th pulse (1645–1674) samples LOW — the second ACK — and SDA rises at 1748 while SCL has been HIGH since 1719: the **STOP**. Right.
- **The blips are at x = 1010–1034 and 1675–1684 — both entirely inside the SCL-LOW gap *after* an ACK, not before it.** There is no pre-ACK blip, because the eighth address bit is already 0, so the line never rises between the last bit and the acknowledge. The finding is correct on position; "roughly one clock-period wide" overstates it — the first blip is 24 px against a 74 px clock period, about a third.

So the caption's one real error is the word *before*: what is visible is the display letting go and the controller taking the line back, which happens **after** each ACK.

## `checker-technical-accuracy` — BLOCKER

*(Ran last and longest. Note that the chapter was edited during its review — the ACK-blip caption, the Waveforms step-2 label, the backpack-pins caption and the command-table image — so its findings are against the current file.)*

### Wrong hardware, wrong numbers

- **[BLOCKER] L-6 / B-11c — "20 ticks LOW and 16 HIGH is 10 µs of SCL period" is arithmetic that does not add up.** 5.0 + 4.0 = **9.0** µs, not 10. RM0490 Table 94's own `t_SCL` row reads "~10 µs" with footnote 1 — *"t_SCL is greater than t_SCLL + t_SCLH due to SCL internal detection delay"* — and footnote 2 gives the example t_SYNC1 + t_SYNC2 = 1000 ns. The missing microsecond is the synchronization and detection delay. Appears in the prose derivation and twice on `sl-day9x-presc-answer`. (The separate claim that the *measured* period is 10 µs is correct and confirmed by the scope capture, where the pulse pitch measures ~10 µs.)

- **[BLOCKER] L-6 — "5 V on a signal pin is outside what the chip is rated for" is falsified for exactly the two pins this page is about.** DS13867 Table 12 gives PB8 and PB9 the I/O structure **`FT`**, and Table 11 defines `FT` as **"5 V tolerant I/O"**. The instruction (use 3.3 V) is fine; the justification is not, and "same rule as every other part in this course" is unsupported — it is the only place in the book making the claim.

- **[BLOCKER] B-11c — the Arduino headers do not carry the UART this course uses.** "22 pins… several of which are already spoken for by the UART and the ADC" / "you have already spent two of those on the UART." UM2953 Table 11 lists the 22 pins, and **PA2/PA3 — the pins `uart2_init()` configures — are not among them**; they go to the ST-LINK virtual COM port. The ADC half is correct (A0 = PA0). What *is* true is that D0/D1 (PB6/PB7, USART1) are tied to the VCP by SB31/SB33 in the default configuration.

- **[BLOCKER] B-11c / L-6 — "A powered display lights up" contradicts the HT16K33's reset state and the chapter's own Part 6.** The command table the chapter itself reproduces gives *System setup* default **20H** (S = 0, oscillator off, standby) and *Display setup* default **80H** (D = 0, display off). Nothing is driven after a cold power-up. The chapter says exactly this 700 lines later: "with the oscillator off the HT16K33 accepts everything you send it and drives nothing at all, which looks exactly like a display that is not wired." As written, Part 2 sends every student with a correctly wired, correctly powered display hunting a power fault.

- **[BLOCKER] B-11c — `fig-segment-map` is missing the E and F labels.** The caption and two derivation activities name "`e` and `f` up the left side," and the rendered crop shows **A, B, G, C, D, DP only** — E and F are cut off the left edge. Both activities send students to this figure precisely to derive letters that need the left-hand segments.

### Wrong or unsourced register and figure claims

- **[MAJOR] L-6 — `I2C_TXDR`/`I2C_RXDR` cited as "RM §23.7.11–12".** They are **§23.7.10 (RXDR) and §23.7.11 (TXDR)**; §23.7.12 is the register map.
- **[MAJOR] L-6 — `RCC_APBENR1` cited as "RM §5.4.15".** It is **§5.4.13**, p. 130. §5.4.15 is `RCC_IOPSMENR`.
- **[MAJOR] L-6 — the `fig-i2c-cr2` caption files `STOP` under "target mode, 10-bit addressing, >255 bytes and SMBus".** RM0490 §23.7.2: *"Bit 14 STOP: Stop generation (master mode)… 1: Stop generation after current byte transfer."* It is a controller bit, and it is exactly what software uses when AUTOEND = 0 — which the same subsection describes two paragraphs later. The other five classifications check out.
- **[MAJOR] L-6 — the `fig-i2c-hardware` caption calls the left-hand block "the address-match unit… how this peripheral would recognize its own address".** RM0490 Figure 211 labels it **"Wake-up on address match"** — the wake-from-low-power feature. Slave address recognition is `I2C_OAR1`/`OAR2` and the `ADDR` flag. The old deck makes the same loose claim, but the deck is not authoritative for hardware explanations.
- **[MAJOR] L-6 — "NBYTES counts the transfer down".** The figure being captioned shows the `NBYTES` waveform as `xx` then a constant **2** for the whole transfer. RM0490 says only that a STOP is sent "when NBYTES data are transferred" and that the number of TXIS events corresponds to the programmed value. Nothing says the field decrements.
- **[MAJOR] L-6 — "the hardware still does the right thing on the wire, because AUTOEND sends the STOP by itself".** §23.4.9: *"If a NACK is received: the TXIS flag is not set, and a STOP condition is automatically sent after the NACK reception."* The STOP after a NACK is unconditional NACK handling, not AUTOEND completing NBYTES. Same outcome, different mechanism.
- **[MAJOR] B-11c — `ht16k33_cmd_display.svg` cuts the ROW/INT set row off entirely,** but the caption still explains it. (The parallel defect in the first image — a missing System setup row — was fixed mid-review.) Also, ROW/INT set is not purely a keypad row: its default A0H selects ROW driver output, which is what the display needs.
- **[MAJOR] L-6 — the `fig-display-ram-map` caption says the left column is "one per digit, plus the colon".** It is **COM0…COM7 — eight common lines**, of which our wiring uses five. The rest of the caption matches the figure exactly.

### Correct but imprecise

- **[MINOR]** "a bus with no pull-ups anywhere never leaves the LOW state" — with no pull-up the line floats at an undefined potential. Say "can never be released HIGH".
- **[MINOR]** "Every segment of every digit is `0b11111111` in bytes 0, 2, 6 and 8, and 0 in the odd bytes" — byte 4, the colon, is an even address and is also 0. The slide gets it right.
- **[MINOR] B-3** — a reading-question distractor says "Each device on a bus has its own address, so only one can match… There is no collision to resolve," stated as a law, while the chapter later explains that A2/A1/A0 exist so eight identical displays can coexist. Say "on a correctly configured bus".
- **[MINOR]** the `Wire.requestFrom` → `i2c1_memRead()` mapping omits the preceding sub-address write and repeated START (also raised by `learner-arduino-veteran`).
- **[MINOR]** `fig-i2c-transfer-pattern`'s caption says the sequences are written "above the first two". They accompany Tables 20 and 22 — the two single-byte cases — and sit **below** each.
- **[MINOR]** prose says the fault would surface "at minute 50"; the slide says "minute 48".
- **[MINOR] B-8** — Day 9's homework also *required* an LED driven through `GPIOA->BSRR`. The Day 10 review of that homework never mentions it, and neither AI listing has it.
- **[MINOR] B-6** — "ChatGPT's `main()` as generated had no `return` at all" is right, but **Gemini's ended `return 0;`** and was silently changed to `return 1;`. Disclose both.

### Verified correct, no action

Code: `i2c1_init()`, the `i2c1_byteWrite()` and `i2c1_byteRead()` bodies are **line for line identical** to ground truth §1 / slides 24, 29, 30 (diffed programmatically). `pingDisplay.c`, `writeFirstDigit.c`, the three SevenSeg solutions and the ES.28 program match slides 15/16, 43, 52, 55 exactly, with only the documented `return 0;` → `return 1;` normalization. Both AI listings match slides 5 and 7 verbatim. All four linters report 0 problems; every xref, slide ref and image path resolves.

Hardware: PRESC = f/4 MHz − 1 and 12 MHz → 0x2 ✓ (the three tables differ only in PRESC across *both* Standard-mode columns). The SADD quote ✓ verbatim. "The TXIS flag is not set when a NACK is received" ✓ verbatim, and the hang follows. OTYPER ✓. PB8/PB9 under AF6 ✓ Table 15; D15/D14 ✓ UM2953 Table 11. BUSY/TXIS/RXNE/NACKF ✓. RM Figure 228 really is a loop testing TXIS and NACKF each pass ✓. I2CCLK = 12 MHz ✓ (CCIPR reset → I2C1SEL = PCLK). `TIM14_SR` UIF is `rc_w0` ✓, and the Day 10 wording does not contradict Day 8. The `=`-not-`|=` argument on `I2C_CR2` is correct and correctly distinguished from Day 8's reason.

Numbers: 34 LEDs ✓; 5 + 9 = 14 wires ✓ read off the KW4-56NCLB-P figure, diodes drawn cathode-to-COM = common cathode ✓; `0 1 2 3`, `E`, `S.` ✓; 0x21 / 0x81 / 0xEF / 0x85 / 0xE7 ✓ all read off the rendered datasheet rows; the grid-count feedback (35 / 19 / 12) ✓; PSC 48000−1 → 4 s and 16000−1 → 1.33 s at 12 MHz ✓; Gemini's `tim14_init()` really has no UIE, no NVIC_EnableIRQ and no ISR ✓.

Figures rendered and checked: `scope_ping_noack.svg` numerically (9 pulses; SDA HIGH over 1–2, LOW over 3–8, HIGH over 9, then the STOP) ✓ and `scope_ping_ack.svg` (3 HIGH then 5 LOW, ACK on pulse 9, 18 pulses) ✓, plus twenty more.

### Unverified — cannot be closed from the repo

- HT16K33 datasheet page numbers ("pp. 24–25", "p. 22") — the datasheet is not in the repo; sourced only through the old deck and the ground truth.
- `SevenSegPartial.h`'s values, and therefore the Reference note that `SevenSeg_dim()`'s `HT16K33_DISPLAY_CMD` term adds nothing.
- "three that are set by solder pads on the board", the on-board pull-ups and the 5–10 kΩ figure — needs the Adafruit schematic or the equipment list.
- "The wiring went home in a kit and came back" and "leave the display wired" — no source in the repo for students taking kits home; the old deck wires the display fresh on Day 10.
- "a microsecond or so after setting START" — the ~90 µs to the ninth pulse checks out; nothing quantifies CR2-write → BUSY.
- `Wire.begin()` doing all five configuration steps — no Arduino core source consulted.

---

# Synthesis — the change list, and what was done with it

`committee-synthesizer` deduplicated twenty-two findings to **10 must-fix, 9
should-fix**, plus two structural recommendations, two escalations and ten flags
that cannot be closed from the repo.  Verdict: *not ready for Petra* — "the arc
and the code are sound, the hardware explanations are not," which is Day 9's
lesson arriving again.

**All 10 must-fix and all 9 should-fix are applied**, commit `655f0e0` and the
one that follows it.  So are six of the Consider items: the TIMINGR measurement
becomes a task, the five-operations activity is tied to the student's own trace,
the duplicated 0xE0 question is cut, `act-i2c-sevenseg-t3` points at the file
where the bytes already are, `sl-day9x-decode`'s caption became instructive, and
the address-conflict warning moved from a quiz distractor into the prose.

**Q1 — Day 9x Part 6.**  Split into 6a (the five-function interface and the
`Wire.h` beat, with the activity) and 6b (opening `i2c1_byteWrite()`).
`fig-i2c-hardware` and its slide moved to a new Reference subsection,
`subsec-i2c-ref-hardware`.  Funded by cutting Part 2 from 6 minutes to 4, which
was re-teaching the reading's synchronous argument almost verbatim (B-8).  The
synthesizer overruled the plan's own cut list on one point and I have kept its
call: the five-field `I2C_CR2` paragraph stays in class, because it is the
sentence that connects the register to the trace students captured forty minutes
earlier.  Day 9x now sums to 64 minutes with a minute of slack.

**Q2 — `act-i2c-ai-review`.**  Petra's design is untouched — individual written
answer before the group, reference copy offered first.  What is added is one
measurement an assistant cannot make: time ten prints of your own program and
write down your own PSC and ARR, then justify at least one criticism from those
numbers.  Two of the five defects in the AI solutions are only visible if you
know this board runs at 12 MHz.

**Dissent recorded.**  `learner-visual`'s MAJOR on `fig-display-wiring` — that
the red `+` wire's landing point is cropped off — was checked and rejected: the
top of that figure renders with the wire terminating visibly on the pin labelled
3V3 in the POWER header.  Not changed, recorded here so it is not re-raised.

**Escalations, not applied — they are Petra's clock:**

- **E1.** Day 9x Part 4 stacks four first-time activities into fifteen minutes.
  The only lever that removes real minutes is taking the project copy out of the
  part.  The synthesizer recommends shipping `SevenSegI2CFirstSteps` ready-made
  on Canvas for Day 9x only, since the copy-and-rename skill is still taught and
  practised at Day 10 Part 6 where the clock has room.  Worth four or five
  minutes on the day's bottleneck at zero homework cost.
- **E2.** Day 10 has zero slack and one named compression lever.  The
  synthesizer recommends naming Part 3 (6 → 4 min) as a second one — the reading
  already covers common cathode and multiplexing, and Part 3 opens with a
  refresher of exactly that.  That would free the minute for a written
  wrong-answer diagnostic before TODO 4, which is the one thing that would make
  the crucial step's underlying understanding testable in class rather than in
  homework.
