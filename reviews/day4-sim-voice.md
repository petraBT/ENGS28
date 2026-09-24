# Day 4 simulator embed: checker-voice (scoped gate)

Scope: sections A, B and C of `reviews/day4-sim-proposed-prose.md` only. The
text will sit in `source/ch-switches.ptx`, `subsec-day4-fsm-code`, after
`act-day4-fsm-implement`.

Compared against: the three voice specimens (S-11 to S-30); the Day 3 embed
paragraph above `<sim starter="toggleLEDstart"/>` in this chapter; the Day 7,
8 and 9 embed paragraphs (`ch-adc.ptx`, `ch-timers-interrupts.ptx`,
`ch-gpio-interrupts.ptx`); the headers of `toggleLEDstart.c` and
`counterResetButtonInt.c`; the Day 4 section of `ch-switches.ptx`; and
`ClassSlidesOLD/Day04-Debounce.pptx`, slides 9 to 13.

### Verdict: MINOR

### Register: is this her?

Mostly, yes. Nearly every sentence in section A is lifted from the embed
paragraphs she has already passed ("The simulator below is seeded with…",
"Attach the button first: click *+ Button*…", "so you can watch the pin read 1
released and 0 pressed", "One warning:", and the save/bookmark paragraph
word for word). The sentences it adds are plain declaratives with no
aphorisms, no count armature, no weekday doing the teaching, and no
reassurance. What is left is a handful of joins that read as clipped next to
her sentences ("and again for", "and there is no oscilloscope" tacked onto a
"so" clause, "the third task" pointed at rather than named). There is also one
honest-incompleteness sentence that the Day 3, 8 and 9 embeds all have and
this one does not.

### Rewrites

- [MINOR] A, para 2 — S-19 (honest incompleteness), reused from the Day 3, 8 and 9 embeds
    draft:   "One warning: the simulated button makes clean contact and the debounce capacitor is not modeled, so nothing here bounces, and there is no oscilloscope. The third task, checking the transitions with and without the capacitor, needs your Nucleo and the AD2."
    hers:    "One warning: the debouncing capacitor across the switch (<xref ref="fig-rc-debounce-circuit"/>) is not modeled, so nothing here bounces, and a single press that gives exactly one state change in this window is not evidence that your machine is right on the real switch. There is no oscilloscope here either, so checking that the LED transitions are clean with and without the capacitor needs your Nucleo and the AD2."
    because: The first task asks "does a single physical press always produce exactly one state change?", and a student testing here will get a yes on bounce whatever their code does. Her passed embeds say this outright: Day 8 has "a blink in this window is not evidence that you have it right" and Day 9 has "a counter that resets in this window is not evidence that you have it right". The capacitor clause is Day 9's own sentence: "The debouncing capacitor across the switch (<xref ref="fig-rc-debounce-circuit"/>) is not modeled, so nothing here bounces." The rewrite also fixes two things. "and there is no oscilloscope" was hung onto a "so" clause it has nothing to do with. And "The third task" pointed at something instead of naming it (S-26: ~~"How many LEDs is that?"~~ → "How many LEDs are in this display?"). This names none of the RUN/PAUSE states, their count, the held twins or the slicing, so the no-answer rule still holds. Nothing technical is weakened.

- [MINOR] B, "Your job" — reuse of her Day 4 deck, slide 13
    draft:   "Your job: turn this into the pause/resume counter from the state diagram you drew. The counting code from your own blinkyCNT.c can be pasted in."
    hers:    "Your job: use the button to pause and resume a counter. Begin with the counting code from your own blinkyCNT.c, and adapt the toggle state machine below, following the state diagram you drew."
    because: She already wrote this instruction, in `Day04-Debounce.pptx` slide 13: "Use a pushbutton to pause / resume a counter (begin with blinkyCNT.c, adapt LED-toggling state machine)." Her "adapt" is exactly what this seed asks of the student, and it replaces a passive sentence ("can be pasted in") with one that says what the student does (S-13).

- [MINOR] A, para 1, first sentence — S-26, matching the header's own wording
    draft:   "The simulator below is seeded with the toggle state machine from <xref ref="subsec-day4-fsm-lecture"/>, the `typedef enum` and `switch` version, so you can work on the pause/resume counter away from your Nucleo."
    hers:    "The simulator below is seeded with the button toggle written as a state machine, with `typedef enum` and `switch`, as it is printed in <xref ref="subsec-day4-fsm-lecture"/>, so you can work on the pause/resume counter away from your Nucleo."
    because: "the X version" is an afterthought appositive. Header B already has the plain form ("the button toggle written as a state machine, with typedef enum and switch, exactly as printed earlier in this chapter"), and the book and the file should read as one writer. Keep the Day 3 frame ("The simulator below is seeded with `button.c` as you ran it in class, so you can…"), which is already hers. (The xref renders as "Subsection 2.x.2", not "Part 2", so L-18 is clean.)

- [MINOR] A, para 1, LED sentence — plain join
    draft:   "For the counter, attach three LEDs the way you wired them in Lab 1: click *+ LED*, then D13 (PA5), and again for D12 (PA6) and D11 (PA7)."
    hers:    "For the counter, attach three LEDs the way you wired them in Lab 1: click *+ LED* and then the Arduino header pin D13 (PA5), and do the same for D12 (PA6) and D11 (PA7)."
    because: "and again for" is the clipped join; her button sentence two lines earlier says "then click the Arduino header pin D5". Make the same change in header B ("+ LED and then header pin D13 (PA5), and do the same for D12 (PA6) and D11 (PA7)").

- [MINOR] A, para 1, last sentence — ambiguity in a chapter about switches
    draft:   "…so you can watch the pin read 1 released and 0 pressed while your `switch` runs."
    hers:    "…so you can watch the pin read 1 released and 0 pressed while your state machine runs."
    because: In "Digital Inputs: Switches and Debouncing", "switch" means the pushbutton on every page but this one, and code font on a single word is easy to miss. S-26 applies: name the referent. The Day 3 sentence this reuses ends at "0 pressed", so ending there is also acceptable.

- [MINOR] B, last paragraph — the same fix as A para 2, and the two surfaces should agree
    draft:   "The simulated button makes clean contact, so nothing here bounces, and there is no oscilloscope. Checking the debounce capacitor needs your Nucleo."
    hers:    "The debouncing capacitor across the switch is not modeled, so nothing here bounces, and there is no oscilloscope. Checking that the LED transitions are clean with and without the capacitor needs your Nucleo and the AD2."
    because: "Checking the debounce capacitor" says the capacitor is what gets checked, but the activity checks the transitions. The prose says "Nucleo and the AD2" while the header says only "Nucleo". The first half is `counterResetButtonInt.c`'s own header line: "The debouncing capacitor across the switch is not modeled, so nothing here bounces."

- [MINOR] C, student dropdown label — match the siblings
    draft:   "Day 4 — toggleLEDfsm.c, the toggle as a state machine"
    hers:    "Day 4 — toggleLEDfsm.c (the toggle as a state machine)"
    because: Every other label puts the description in parentheses ("Day 8 — blinkyTimerPolled.c (given, complete)", "Day 9 — counterResetButtonInt.c starter (3 TODOs)").

No finding on: the save/bookmark paragraph (verbatim and correct, B-11b); "Attach the button first…" (the Day 3 sentence plus "(PB4)", which is an improvement); "The on-board LED is also on PA5, so it lights together with the first" (plain, and it supplies the causal middle, S-27); the student dropdown hint (matches its siblings exactly).

### Sweeps

- Unit openings checked: 0. This is not a unit opening: it sits mid-subsection after an activity, like Day 3's. Its first sentence says what the window is for, not what is absent, so it passes failure 1 anyway.
- Slide titles: none (Part 4 has no slides).
- Weekday or course-period as grammatical actor (S-20) and day as topic (L-11): 0. "Lab 1" is real coursework named as the student's own work ("the way you wired them in Lab 1"), which is the S-13 "you noticed this in the Lab 2 race game" form. "Day 4 in-class" in the header and "Day 4 —" in the label are structural, the same as every sibling.
- "N, and it is the one that…" armature (S-21, S-28): 0. "One warning:" puts its content straight after the colon, the form she kept in Days 3 and 7.
- "we" in class-work sentences: 0 of 0. Every sentence is about what the individual student does in the window, so "you" is correct (S-13), the same as every passed embed.
- Acronyms first used without expansion: none. IDR, LED, AD2 and FSM are expanded earlier in the chapter. `PA5`/`D13`, `PB4`/`D5`, `PA6`/`D12` and `PA7`/`D11` always come in pairs.
- Design scaffolding in student-facing text: none. No "Part N" (the xref renders as a subsection number), no minute counts, no "a program you are given".
- L-rules: no em dashes in A or B; whole sentences throughout; American spelling ("modeled"); no anthropomorphism (L-15, L-17); no reassurance or classroom management (B-12, S-25).

### Already written: reuse instead of invent

- The "Your job" instruction was already hers: `Day04-Debounce.pptx` slide 13, "Use a pushbutton to pause / resume a counter (begin with blinkyCNT.c, adapt LED-toggling state machine)." The rewrite above uses it.
- The capacitor sentence was already written, in `ch-gpio-interrupts.ptx`'s embed paragraph and the `counterResetButtonInt.c` header: "The debouncing capacitor across the switch (…) is not modeled, so nothing here bounces."
- The limitation sentence has a precedent in the Day 8 and Day 9 embeds: "… in this window is not evidence that you have it right."
- Everything else in section A already reuses her embed sentences, which is the right call.

### For Petra, not for me

1. Every dropdown label, this one included, uses "Day N — …" with an em dash. The no-em-dash rule covers student-facing text and these labels are student-facing, but the dash is the convention across all of them and was not introduced here. Should all the labels change, or does the rule stop at the book?
2. The seed is the Part 2 listing, as you chose. That listing uses `int btn = !(GPIOB->IDR & (1U << 4))` and hard-coded shifts. Your own slide 12 ("Translate state diagram to C") and the chapter's `inst-day4-fsm-code` solution both use your idiom: `buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0)` with `LED_PIN`/`BUTTON_PIN` defines. A student who adapts the seed will end up with a different idiom from the solution projected afterwards. That is a question about the Part 2 listing, not about this embed.
3. The instructor-build hint says to add LEDs only to D12 and D11 ("bit 0 of the count is the on-board LED on D13"). The student hint and prose say to add all three, including D13. Both are correct. Should they match?
