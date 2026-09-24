# checker-voice — Day 8 simulator text (scoped gate)

Draft reviewed: `scratchpad/day8-sim-prose-draft.md` (sections A–D)
Specimens: `plans/day10-voice-reference.diff`, `plans/day9x-voice-reference.md`,
`plans/day8-voice-reference.diff` (her own hand pass over *this* chapter).
Ground truth compared: `source/ch-adc.ptx` 1246–1265 (her passed `<sim>` prose),
`assets/starters/blinkyTimerInt.c`, `assets/sim-starters/ADCPot.c`,
`ClassSlidesOLD/Day08-Interrupts.pptx` slides 41–46.

### Verdict: MAJOR

### Register — is this her?

Mostly. The frame is her own Day 7 sim paragraph, reused rather than reinvented
(the opening sentence and the whole download/full-screen paragraph are verbatim
hers), the runtime messages copy the diagnostic shape she already passed in
`src/peripherals/adc.ts`, and there is no weekday-as-actor, no time budget, no
reassurance theater and no em dash in student-facing text. What is not hers is
concentrated in the `volatile` caveat and in two of the four runtime messages:
a sentence fragment used as a sentence ("One thing this window cannot show
you."), the count-as-lead armature she strikes (S-21), a "really is … really
does" parallel, and two passages that reinvent sentences she has already written
in this chapter and in her own starter header.

### Rewrites

1. **[MAJOR] Section A, paragraph 2, first sentence — fragment for effect (S-21, failure 2/10; no-em-dashes-whole-sentences memory)**
   - draft: "One thing this window cannot show you."
   - hers: "One word of caution: this simulator does not optimize your code, so a flag shared between the interrupt handler and `main()` works here whether or not its declaration carries `volatile`."
   - because: day10 specimen, same armature, same fix —
     ~~"One caution, because it costs people time.  Datasheets are not consistent about…"~~ → **"One word of caution:  Datasheets are not consistent about…"**
     and ~~"There is one rule: SDA is allowed to change only while SCL is LOW"~~ kept only because the rule follows the colon. A lead whose only content is a count defers the subject by a sentence; the colon is the whole fix. The whole-sentences rule makes the fragment a hard fail in `<p>` regardless.

2. **[MAJOR] Section A, paragraph 1, sentence 2 — opens on what is absent, and reinvents her own line (failure 1; P-12 reuse)**
   - draft: "Nothing is attached: the LED is PA5, already on the board."
   - hers: "The LED is PA5 and it is already on the Nucleo board, so nothing is wired today."
   - because: that is very nearly her sentence already — `assets/starters/blinkyTimerInt.c`, her header: "None.  The LED is already on the Nucleo board; nothing is wired today." Her Day 7 sim paragraph puts the positive first and the absence as a consequence: "Click *+ Pot* … and drag the knob … **That one click wires the whole divider, so there is nothing to connect to 3.3 V or to ground.**" Day 9x: a list of what is not needed is not an opening.

3. **[MAJOR] Section C, message 3 — reinvents a sentence she has already passed in this chapter (P-12 reuse; failure 2)**
   - draft: "The interrupt handler returned with the flag that raised the interrupt still set, so the request is still standing and the handler is entered again at once. main() gets one statement in between one return and the next, so whatever it does happens far too fast rather than not at all. Check which write actually clears the flag: the access type in the reference manual decides whether a 0 or a 1 does the clearing."
   - hers: "The interrupt handler returned without clearing the flag that raised the interrupt, so the request is still pending and the handler is entered again the moment it returns. The main loop gets almost no time between entries, so the work it does when it sees the flag happens far too fast, rather than not happening at all. Check which write actually clears this flag: the access type in RM0490 says whether a 0 or a 1 does the clearing."
   - because: `source/ch-timers-interrupts.ptx:402` (hers, passed): "The flag still must be cleared, in the ISR itself, **or the interrupt fires again the moment the ISR returns.**" Reuse her clause. "still standing" → "still pending" is also the NVIC's own term (precise-language memory). The "rather than not at all" contrast is kept because it is the diagnostic content, not ornament.

4. **[MAJOR] Section A, paragraph 1, last sentence — aphoristic parallel, and a vague referent (failure 2; S-14, S-16)**
   - draft: "The counter runs on real time here, so a 500 ms period really is 500 ms and a prescaler that does not fit 16 bits really does give you the wrong one."
   - hers: "The counter runs on real time here, so a 500 ms period really does take 500 ms. A prescale factor too large for the 16 bits of `TIM14->PSC` is truncated here exactly as it is on the board, and the blink comes out at the wrong rate."
   - because: this is the "not short by a little" / "Today: the two wires. Thursday: the chip at the end of them." habit — the contrastive symmetry is doing the work instead of the mechanism. Her replacements are *longer* and state the mechanism (day9x: ~~"The pull-ups are already on the backpack."~~ → **"The I2C protocol requires pull-up resistors on SCL and SDA but the backpack has this integrated, so no need for us to wire them externally."**). Verified against `src/peripherals/timer.ts`: `psc = value & 0xffff`, and the counter is advanced from wall-clock ms, so both claims survive the rewrite intact. "the wrong one" never names what is wrong.

5. **[MAJOR] Section A paragraph 2 and Section B, third block — the same three sentences twice, verbatim (failure 7)**
   - draft: the `volatile` caveat appears word for word in the chapter paragraph and in the starter's header comment.
   - hers: keep the explanatory version in the book paragraph (rewrite 1), and in the header comment keep a short, differently worded one: "This simulator does not optimize your code, so a flag shared between the ISR (interrupt service routine) and `main()` runs here whether or not its declaration carries `volatile`. On your Nucleo, compiled with optimization on, the same program can stop blinking, with no error and no warning. A blink here is not evidence that your declaration is right."
   - because: the Day 7 pair is the model — her prose says "The register panel shows `ADC1->CHSELR`… so you can watch `EOC` come up", and `ADCPot.c`'s header says the same thing in different words *and adds a payload the prose does not have* ("a forgotten TODO 2 shows up as an empty `RCC->APBENR2`"). Overlap yes, duplication no. She deleted the activity task that restated the wiring slide in front of it for exactly this reason.

6. **[MINOR] Section A, paragraph 1 — `UIF` unexpanded at first use (failure 5)**
   - draft: "…and UIF come up when it does."
   - hers: "…and the update interrupt flag `UIF` come up when it does."
   - because: `PB9 (SDA)` → **`PB9 (SDA - serial data)`**; "the header" → "the **Arduino** header". Her own Day 8 pass adds expansions rather than removing them: **"`NVIC_EnableIRQ()` is a function provided by the CMSIS (Common Microcontroller Software Interface Standard)"**, and she wrote out "(interrupt service routine)" on `sl-day8v-*`.

7. **[MINOR] Section A, paragraph 2 — her wording for the symptom already exists (P-12 reuse)**
   - draft: "…the same program can stop blinking with no error anywhere."
   - hers: "…the same program can stop blinking, with no error and no warning."
   - because: `sl-day8-flag` (hers, passed): "Without it: no error, no warning: the blink just never happens."

8. **[MINOR] Section A, paragraph 2, last sentence — rhetorical "is still the real question"**
   - draft: "TODO 4a is still the real question, and a blink here is not evidence that the declaration is right."
   - hers: "TODO 4a asks which keyword that declaration must carry, and a blink in this window is not evidence that you have it right."
   - because: "which is the whole point" / "that is the day" family; she cut "That free remainder of the loop is **the entire point** of a background timer." to "…is **the point**…", and cut "The direct approach is not short by a little." whole. ("TODO 4a" itself is fine and stays: it names a line in the file the student is editing, not lesson design. Her own hand kept "clear UIF the **Part 5** way" in this same starter's comment, so Part-N-in-a-code-comment is settled in favour of keeping.)

9. **[MINOR] Section C, message 2 — two clauses welded by "not"**
   - draft: "This simulator models TIM14's counter and its update event, not its capture/compare output stage. TIM14->CCMR1, ->CCER and ->CCR1 are accepted and stored, but no waveform comes out of a pin."
   - hers: "This simulator models TIM14's counter and its update event. It does not model the capture/compare output stage, so `TIM14->CCMR1`, `TIM14->CCER` and `TIM14->CCR1` are accepted and stored, but no waveform appears on a pin."
   - because: the `->CCER` shorthand is not how she writes a register anywhere in the chapter, and "not X" as a trailing appositive is the clipped register. Content unchanged.

10. **[MINOR] Section C, message 4 — "took its vector-table entry", and her wording exists**
    - draft: "An interrupt was raised and the processor took its vector-table entry, but no function in this program carries that entry's handler name, so the entry still holds the startup file's weak default: Default_Handler, an infinite loop. Nothing else runs from here. Press Reset."
    - hers: "An interrupt was raised and the processor fetched the handler's address from the vector table, but no function in this program has that entry's handler name. The entry therefore still holds the startup file's weak default, `Default_Handler`, which is an infinite loop, and nothing else in your program will run. Press Reset."
    - because: her own Day 8 additions to `sl-day8-isr-name`: **"Startup files declare standard interrupt names as weak symbols pointing to a generic infinite loop."** and **"When the timer interrupt event occurs, the CPU jumps to the weak Default_Handler instead of your written code."** Note the draft correctly does *not* name `TIM14_IRQHandler` here: naming it would hand over TODO 3. Keep it that way.

11. **[MINOR] Section D / `src/examples.ts:148` — hint opens on the absence**
    - draft: "Nothing to attach: it blinks the on-board LED. Watch TIM14->CNT in the register panel."
    - hers: "It blinks the on-board LED, so there is nothing to attach. Watch TIM14->CNT in the register panel."
    - because: her Day 7 hint in the same file reads "Attach a pot to A0 with + Pot, then drag the knob. Nothing is read until the TODOs are filled in." — instruction first, absence second. The instructor hint at `examples-instructor.ts:193` ("Nothing to attach. The main loop never touches a timer register.") is instructor-facing and can stand.

12. **[MINOR] Section B, first line — same fix as rewrite 2, in the header**
    - draft: "Nothing to attach. The LED is PA5, on the board already."
    - hers: "The LED is PA5, already on the Nucleo board, so there is nothing to wire today."
    - because: her own starter header, `assets/starters/blinkyTimerInt.c`: "None.  The LED is already on the Nucleo board; nothing is wired today."

### Sweeps

- **Unit openings checked: 9 — failing: 2.**
  A¶1 "Here is the same exercise in the simulator…" (hers, verbatim — pass);
  A¶2 "One thing this window cannot show you." (**fail**, rewrite 1);
  A¶3 "Nothing here is saved for you…" (hers, verbatim — pass);
  B block 1 "Nothing to attach." (**fail**, rewrite 12);
  B block 2 "Watch TIM14->CNT…" (pass, mirrors `ADCPot.c`);
  B block 3 (duplicate of A¶2 — rewrite 5);
  C1 "TIM14's clock is off, so this write did nothing." (pass — matches the passed ADC message verbatim in shape);
  C2, C3, C4 (pass in shape; wording in rewrites 3, 9, 10).
- **Slide titles: 0** in this draft. No deck text is proposed, so nothing to check for epigrams. If a slide is added later it must be read against S-18.
- **Weekday or course-period as grammatical actor: 0** (S-20). No weekday, hour, "the lab" or "next week" appears.
- **"N, and it is the one that…" armature: 1** (S-21) — "One thing this window cannot show you." (rewrite 1). No others.
- **"we" in class-work sentences: 0 of 12** — and **0 of 9** in her own passed Day 7 sim paragraph, which is entirely "you/your". **Not a finding**: this text describes what the individual student does in a window on their own laptop, which is exactly S-13's "you". Do not sweep "we'll" into it.
- **Acronyms first-used without expansion: 2** — `UIF` (Section A ¶1, rewrite 6); `ISR` in the *sim starter header* only (Section B ¶3), which is read standalone in the full-screen tab where the chapter's expansion is not in view (rewrite 5 supplies it). Clean: TIM14, PA5, LED, RCC->APBENR2, CCMR1/CCER/CCR1, CMSIS (not used), NVIC (not used), `rc_w0` (not used — good, it stays behind Part 5's activity).
- **Design scaffolding in student-facing text: none.** No minute counts, no "the reading", no "a program you are given". "TODO 4a" and "Part 5 way" are lines of the file the student is editing, and her own hand pass kept the latter (`day8-voice-reference.diff`, TODO 3 comment).
- **Em dashes in student-facing text: 0.** The two in the draft file are in the reviewer's commentary and in the examples-dropdown label, where `—` is the established format in `src/examples.ts` for every day.
- **British spelling: 0.** **Baby talk: 0.** **Anthropomorphism: 2 mild** — "the request is still standing" (→ "pending", rewrite 3) and "no waveform comes out of a pin" (→ "appears on a pin", rewrite 9). "your program touches the timer" and "UIF come up" are *her* Day 7 verbs and stay.
- **Sentence fragments used as sentences: 2** — the same one, in A¶2 and in the header (rewrites 1, 5). "Press Reset." is an instruction, not a fragment for effect; it stays.

### Already written — reuse instead of invent

- Section A ¶1 sentence 2 ("Nothing is attached: the LED is PA5…") — she already wrote it: `assets/starters/blinkyTimerInt.c`, her header — "None.  The LED is already on the Nucleo board; nothing is wired today."
- Section C message 3 ("returned with the flag … still set") — she already wrote it: `source/ch-timers-interrupts.ptx:402`, `rq-*` feedback — "The flag still must be cleared, in the ISR itself, or the interrupt fires again the moment the ISR returns."
- Section A ¶2 ("stop blinking with no error anywhere") — she already wrote it: `sl-day8-flag` — "Without it: no error, no warning: the blink just never happens."
- Section C message 4 (Default_Handler) — she already wrote it: `sl-day8-isr-name`, her own added bullets in `day8-voice-reference.diff` — "Startup files declare standard interrupt names as weak symbols pointing to a generic infinite loop."
- Correctly reused already, leave alone: "Here is the same exercise in the simulator, for working on it away from your Nucleo"; the whole download / *Full screen* / bookmark paragraph; the register-panel sentence pattern; message 1, which is her passed ADC message with TIM14 substituted.
- Old deck (`Day08-Interrupts.pptx`) adds nothing the chapter does not already carry better: slide 45's volatile framing ("The compiler can be too helpful…") is superseded by the chapter's own passed paragraph and `fig-compiler-view`. No reuse gap there.

### For Petra, not for me

1. **Message 3's middle sentence makes a claim about the processor, not about the simulator.** "main() gets one statement in between one return and the next" — on Cortex-M0+ a still-pending interrupt is tail-chained, and the architecture does not guarantee that any instruction of the interrupted code runs in between. In *this simulator* one statement does. Either scope it ("in this window one statement of `main()` runs between entries") or let `checker-technical-accuracy` settle it. My rewrite 3 avoids the number ("gets almost no time between entries") so the message is true on both.
2. **Does message 3's last clause front-run Part 5?** My reading is no: it names the *access type* as the thing to look up, which is exactly what her own recap bullet says ("Status flags clear by assigning a mask — and the access type in the RM says which type"), and it does not say `rc_w0` or which polarity TIM14 uses, so `act-timer-rcw0` still has its work. But it is her call whether a runtime message may point at the reference manual at all while the activity is live.
3. **Placement.** The draft proposes the paragraph after `act-timer-interrupt` and its skeleton slides. The Day 7 analogue sits *after* the troubleshooting list and the "Finished early?" paragraph, immediately before `<sim>`. Putting Day 8's after the "LED not blinking?" list would mirror it exactly and keeps the diagnostic steps attached to the exercise.
4. **`volatile` in the header versus in the book.** Rewrite 5 assumes the book paragraph is the explanatory one and the header the short one. If she would rather the full explanation live in the header — the full-screen tab is the surface a student working away from the book actually has — say so and I will swap which side carries it.
