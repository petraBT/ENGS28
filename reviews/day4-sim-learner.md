# Day 4 simulator embed: learner-ai-reliant (scoped gate)

The agent had no write tool; its report is saved here verbatim from its reply.

### Verdict: MAJOR
### Findings

- [MAJOR] [P-14, P-6] act-day4-fsm-implement + sim header B. Prompt: "Here is
  a button-toggle FSM (typedef enum, switch, PB4→PA5); turn it into the
  pause/resume counter described in this comment: LEDs PA5/6/7 in binary,
  button pauses/resumes, one press = one change." An AI returns the canonical
  four-state RUN/RUN_HELD/PAUSE/PAUSE_HELD machine complete and correct, with no
  state diagram ever drawn and no encounter with why a naive two-state version
  double-fires. The header comment's own "Your job: turn this into the
  pause/resume counter from the state diagram you drew. The counting code from
  your own blinkyCNT.c can be pasted in" is already phrased as a self-contained
  task spec; it duplicates the activity's own wording, and pasting header +
  starter body into an AI is a one-shot solve. Redesign: cut that "Your job"
  paragraph from the header entirely. This shortens the header.

- [MAJOR] [P-14, B-3] prose A's sim paragraph. The register-panel sentence
  ("so you can watch the pin read 1 released and 0 pressed while your switch
  runs") is generic observability, not a test. Section D shows the simulator
  reproduces, deterministically, the exact defect the chapter is built around:
  a naive pause/resume FSM with delay_ms(500) and one read per pass drops two
  150 ms taps that land between reads, while the sliced version catches them.
  Nothing points the student at it: a correct-looking FSM will look fine under
  a slow deliberate button and only fails on a quick tap. Redesign: replace the
  register-panel sentence with a directed comparison, e.g. "Try a quick tap and
  a half-second hold separately; does the count change by the same amount
  either way?" A like-for-like swap of one existing sentence, and it does not
  name states, held twins or slicing.

- [MINOR] [P-14] Even with fix 2, "does the count change by the same amount" is
  a yes/no an AI explanation could supply. Out of this review's scope (the
  activity's existing text): flag to Petra that Task 1 could ask for a count
  read off the student's own LEDs after N taps rather than a yes/no.

- [OK] [P-15] Neither prose A nor header B names RUN/PAUSE, their count, the
  held twins, or the slicing. The seed is already printed in
  subsec-day4-fsm-lecture, so it adds no new leak ahead of act-day4-fsm-draw.

- [OK] Pins D5/PB4, D13/D12/D11 match Lab 1 and sl-day3-sim-solution.

- [MINOR] [P-2] The simulator makes guess-and-check cheap enough to bypass the
  drawing activity; inherent to any simulator. Finding 2 is the mitigation.
