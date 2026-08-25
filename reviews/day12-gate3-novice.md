# Day 12 — Gate 3′ — `learner-firstgen-novice`

Reviewed 2026-08-25, on the in-class connecting prose written the same day.
Reviewer had no write tool; report transcribed verbatim by the session that ran it.

**Verdict: MAJOR**

## Findings

- **[BLOCKER] P-2, P-4** — `ch-motors.ptx:3320-3333` (Part 4, the interrupt
  option) — I stop following here for the rest of the hour. Quote: *"This is the
  same five moves you made on Day 9 for the button on PB4, with 15 in place of 4:
  select port A for the line in `EXTI_EXTICR4`, enable the falling-edge trigger in
  `EXTI_FTSR1`, unmask the line in `EXTI_IMR1`, enable the line in the NVIC, and
  clear the pending bit in `EXTI_FPR1` inside the handler... so the 4 in that name
  and in `EXTI4_15_IRQn` stays a 4, while every 4 that names the line becomes a
  15."* Five register operations, plus a "which 4s change and which don't"
  exception, all in one sentence, with zero table and zero figure. Even if I
  remembered every register from Day 9 (I don't, fully), I cannot hold five
  substitutions and one exception to the substitution in my head from prose alone.
  This is also the setup that Part 6 ("no more training wheels") expects me to
  *execute in code* fifteen minutes later. Fix: a two-column table — register |
  Day 9 value (PB4) | today's value (PA15) — with the
  `EXTI4_15_IRQn`/`EXTI4_15_IRQHandler` exception called out in its own row so it
  isn't buried inside a clause about the other four.

- **[MAJOR] P-2** — `ch-motors.ptx:3330-3332` — *"The counter the handler
  increments has to be declared `volatile`, for the reason you met on Day 9."* No
  recap at all — contrast with two paragraphs earlier in the same Part
  (`3149-3151`), where the same kind of pointer to Day 9 ("the same problem we
  watched a polled button counter have on Day 9") is *immediately preceded* by an
  inline explanation ("the program is doing nothing else whatsoever"), so I don't
  need to have retained Day 9 to follow it. `volatile` gets no such lifeline, and
  the only place the actual mechanism is spelled out ("the compiler... may keep the
  value in a register and never look at memory again... the display stops moving")
  is `inst-day12-main-loop-sketch`, an `<instructor>` block I never see. Fix: one
  clause, the same shape as the `delay_ms()` sentence — "...declared `volatile`, or
  the compiler may keep it in a register and never notice the handler changed it."

- **[MAJOR] P-7 (load tipping)** — `ch-motors.ptx:3411-3416` and `3433-3443` —
  this is where the hardware and the code debt both land at once. Quote: *"Every
  piece of the Lab 6 system is something you have wired before or written
  before. What is new is that all of it is on the board at the same time..."*
  followed immediately by a paragraph naming five functions from four different
  days (Wednesday, Day 7, Day 10 twice) I'm expected to already have working,
  closing with *"The signed counter was homework and we have not gone over it in
  class, so it is the piece you are least likely to have finished already."* Read
  on its own the sentence is honest, even a little reassuring (I'm not the only
  one). Read where it sits — the last row of the build-order table, the moment "no
  more training wheels" starts, right after a five-piece inventory — it reads as:
  the one thing I'm weakest on is the one thing standing between me and a working
  display, today, with no class time set aside to fix it. Fix: either give this
  piece five minutes of class time somewhere in Day 12, or say so explicitly here —
  "if this isn't working yet, everything above it is still a real milestone" — the
  way `sl-day12-build-order`'s presenter note already frames it for the instructor
  but the student-facing prose does not.

- **[MINOR/MAJOR] P-4, and the same gap P-19 already named elsewhere in this
  day** — `ch-motors.ptx:3285-3296` — *"A polled read catches every pulse only if
  the gap between reads is shorter than the shorter of the pulse's HIGH time and
  its LOW time... a pulse rate of `f` gives a HIGH time of roughly `1/(2f)`."* No
  figure, no concrete number. This is exactly the failure mode P-19 was written to
  fix a few slides earlier in this same chapter ("give them a fictional rpm" rather
  than an abstract variable) — but it recurs here with `f` and `1/(2f)` left
  abstract. I can follow "reading between two pulses can miss one," but the algebra
  loses me, and there's nothing to point at. Fix: plug in a number — "at 60 pulses
  a second, that's a HIGH time of about 8 ms; a loop checking every 10 ms can miss
  it," and consider a small figure of the pulse train with 10 ms tick marks under
  it, as the (stripped) slide's presenter note already suggests doing on the
  whiteboard but the book prose never draws.

- **[MINOR] Tone** — `ch-motors.ptx:2701-2704` and `3568-3580` — *"If it goes
  above 3.3 V, stop, check your wiring and ask for help if need be: 5 V will damage
  your Nucleo."* and *"if something smells hot or is hot to the touch, disconnect
  the power and check the wiring before anything else."* I registered these as
  flatly frightening on first read — the words "damages" and "smells hot" land hard
  for someone who has never plugged anything into anything. To be fair, both
  sentences do include a next step ("ask for help," "disconnect the power and check
  the wiring"), so they aren't pure alarm without a way out, and I don't think the
  language should be softened (the hazard is real). What would help is putting the
  rescue *first* in the sentence rather than after the threat — "If it goes above
  3.3 V, stop and check your wiring" reads calmer than the same clause with "5 V
  will damage your Nucleo" trailing it as the last thing I read before touching a
  wire.

- **[MINOR] For the record** — the Day 9/Day 3 pointers are not uniformly a
  problem; several of them (`ch-motors.ptx:3149-3151`, the internal-pull-up aside
  at `2779-2784`) carry an inline recap and cost me nothing even when my memory of
  the earlier day is shaky. It's specifically the EXTI and `volatile` pointers
  above that don't, which is why I've flagged those two rather than the pattern
  generally — the fix is consistency with the pointers that already do this well,
  not a new rule.

Files read: `source/ch-motors.ptx` (lines 2249–3790), `AUTHORING-book.md`
(P-1…S-10, B-1…B-17).
