# Day 12 — Gate 3′ — `learner-text-first`

Reviewed 2026-08-25, on the in-class connecting prose written the same day. Read as
a student who missed class: book prose only, `<slide>` and `<instructor>` blocks
treated as nonexistent. Reviewer had no write tool; report transcribed verbatim by
the session that ran it.

**Verdict: MAJOR**

Two of the four things asked for are genuinely solid: the 5 V-sensor/3.3 V-HIGH
argument (~2715–2748) is complete without the figure — it states the mechanism
(open-collector, pull-down-only), names the part and cites the datasheet table, and
never asks the reader to take anything on trust. And all three figures asked about
(`fig-day12-wiring`, `fig-three-rates`, `fig-deadband`) say enough in prose that the
picture could be skipped; the reviewer checked `fig-day12-wiring`'s three
handwritten callouts against the PNG directly and found each one answered in the
surrounding paragraphs.

The polling-vs-interrupt argument is where the gate fails: it reads as an assertion,
not a settled argument, and it contradicts the text's own earlier instruction.

## Findings

- **[MAJOR] [P-6 / P-18]** `act-day12-predict-trace` + `subsec-day12-wire-and-scope`
  (~2613–2748) — The book poses *"What would the trace look like, and why?"* for the
  sensor with *no* pull-up wired, and the wiring activity right after wires the
  resistor in from the start (`task-day12-wire`), so nothing hands-on ever tests the
  "nothing connected" case. The explicit reveal — *"With nothing connected to the
  output but the oscilloscope, the trace is not a square wave and it is not a flat
  line either — it wanders..."* — exists only in `inst-day12-wire-and-scope`, which
  does not exist for me. The nearest visible prose is the caption of
  `fig-photointerrupter-states` ("With no resistor there, ... the pin is left
  floating") and a diagnostics-table row about "noise wandering," neither framed as
  closing the loop on the earlier prediction. A student who does the activity
  honestly gets no confirmation anywhere in the book. *Fix*: add one sentence in
  body prose, right after the prediction activity or right after
  `fig-photointerrupter-states`, stating explicitly what an unpulled-up trace looks
  like and why.

- **[MAJOR] [P-5]** `subsec-day12-main-loop` (~3285–3296) — *"A polled read catches
  every pulse only if the gap between reads is shorter than the shorter of the
  pulse's HIGH time and its LOW time."* The paragraph before it only motivates the
  HIGH-time half ("a pulse that arrives and leaves between two reads is never
  seen"); nothing explains why the LOW time matters too. A reader who has just been
  told "a pulse is missed if it's entirely between two reads" has no way to see why
  a *long* LOW interval would ever cause a miscount. This is exactly the
  edge-detection algorithm's requirement — you need at least one sample in the HIGH
  phase *and* one in the LOW phase of every cycle to register a falling edge — but
  that algorithm is never shown to the book reader (it lives only in the parked
  `sl-day12-naive-loop`), so the claim arrives with no derivation the reader can
  check. *Fix*: one or two sentences: "Detecting a pulse takes two things — a read
  that catches it HIGH, and a later read that catches it LOW again, so the loop can
  tell the difference. If either interval is shorter than the gap between reads,
  that interval can fall entirely between two reads and the transition is never
  seen."

- **[MAJOR] [P-5 / B-8]** `subsec-day12-main-loop`, the interrupt-decision paragraph
  (~3334–3342) — *"The arithmetic depends on how fast this particular motor turns
  and how wide these particular slots are, and neither of those is a number we have
  measured closely."* This is false on its own terms: `task-day12-measure` ("At the
  fastest motor speed, measure how many pulses arrive per second. Write the number
  down.") had the student measure exactly "how fast this particular motor turns,"
  and `task-day12-convert` in Part 3 explicitly reused that number. Only the
  slot/spoke width ratio was genuinely never measured. The very next sentence
  compounds this: *"The polled version does not fail at these rates, but whether it
  fails depends on numbers nobody has measured"* — asserting both that it doesn't
  fail and that whether it fails is unknown, in the same breath. As written, the
  reason given for choosing the interrupt doesn't survive a check against the book's
  own earlier instructions. *Fix*: name the one quantity that is actually unmeasured
  (the HIGH/LOW split, i.e. slot width vs spoke width) rather than "neither of
  those," and rewrite the self-contradicting sentence so it makes one claim.

  *(Session note: that sentence came out of `checker-voice`'s morning rewrite, which
  was about register — "this course goes with" → "we'll use" — and I adopted the
  whole sentence with it. A voice fix carried a factual error in.)*

- **[MINOR] [B-7]** `fig-day12-wiring` caption — *"a 10 kΩ resistor from that row up
  to 3.3 V (the thin blue arrow)"*. Checked against
  `fig-day12-wiring-annotated.png` directly: the wire that actually carries 3.3 V to
  the resistor is drawn in dark red (running to the Nucleo's 3V3 pin); the thin
  *blue* arrow in the picture is the annotation pointer for the "~10 KΩ pullup" text
  label, not the electrical connection. Since the rest of this caption carefully
  uses color to let the reader trace the picture ("orange is the output, black is
  ground and blue is power"), this clause breaks that convention and would send a
  reader looking for a blue wire that is not the 3.3 V path. *Fix*: drop the color
  parenthetical, or correct it to name the wire's actual color.

## The four items, answered directly

1. **Both load-bearing arguments walked.** The 5 V→3.3 V argument (Part 2) has no
   gap. The "100 Hz loop misses pulses" argument (Part 4) has a real gap: the
   "shorter of HIGH and LOW" condition is asserted, not derived (finding 2).
2. **Figures**: `fig-day12-wiring`'s three callouts are all covered in prose (see the
   color slip, finding 4); `fig-three-rates` and `fig-deadband` are fully covered — a
   reader could skip all three pictures and lose nothing load-bearing.
3. **Nothing flatly unactionable.** The one place checked closely — the predicted
   "no pull-up" trace — is a missing-explanation gap, not a missing-instructions gap
   (finding 1).
4. **The polled-vs-interrupt decision does not read as settled.** The conclusion is
   very likely the right one to teach, but the stated reason needs repair before it
   survives a careful reader (finding 3).
