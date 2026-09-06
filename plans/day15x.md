# Day 15x — Servos, continued

**Wednesday x-hour, 50 minutes** (Day Nx is a Wednesday x-hour — the
day-parity rule in `CLAUDE.md`). **No pre-class reading — x-days do not get
one.** Chapter: `source/ch-servos.ptx`, `sec-servo-day15x`. Old deck:
`Day15x-Servos(2).pptx` (6 slides, all re-shows of Day 15's 27–30). Ground
truth: `plans/week8-ground-truth.md`.

**Petra's ruling, 2026-09-06, on the first draft of this day:** *"this
entire day feels like busy work… For students who get the things right on
Tuesday, they can power their servo on Tuesday and get to skip class on
Wednesday. For those who don't get it done they come on Wednesday and we
review what they need to do. All of the other stuff feels like a complete
waste of time… when they have the correct signal on the AD2, they remove
the AD2 and connect and power the servo. The two-channel recall is
unnecessary. The two wiring rules don't need to be harped on over and
over."* So this day is what her deck says it is: a work session. Everything
the first draft added (the universal re-verification, the observation
tasks, the stretch, the two-channel recall, the wiring rules restated) is
withdrawn, and the servo wiring is Day 15 Part 6's, done on Tuesday by
each student as their pulse is verified.

## Objectives

By the end of the x-hour every student who was not finished on Tuesday
has the potentiometer-controlled pulse verified on the AD2 and the servo,
powered from the regulator board's 5V pin, following the potentiometer.
Nothing new is taught.

## The CRUCIAL step

> **Every student's servo, powered from the regulator's 5 V pin, follows
> the potentiometer** — Tuesday's, completed here by whoever did not
> finish on Tuesday.

Scaffolding: Tuesday's two symptom lists and two instructor checkpoint
lists, in order (the pulse, then the servo). Her slide 31 (students who
finished need not come) is a presenter note.

## Coverage against her deck

| Her slides | Where |
| --- | --- |
| 1 (title) | deck glue |
| 2 (finish Tuesday first) | the section introduction and `sl-day15x-finish`, her words |
| 3–6 (re-shows of Day 15's 27–30) | Day 15 Part 6 (`sl-day15-wiring-rules`, `sl-day15-pot-wiring`, `act-day15-servo-wire`, `sl-day15-servo-symptoms`), recalled by refPage in `day15x.json` |

## Activity sequence (50 min)

| Part | Min | Mode | What |
| --- | --- | --- | --- |
| — | 2 | — | Settling |
| 1 | 48 | do | **Finishing the design exercise.** Her slide 2. Tuesday's order: the pulse (`act-day15-build`, `act-day15-measure`, the pulse symptom list, `inst-day15-checkpoint`), then the servo (`act-day15-servo-wire`, the two rules, the servo symptom list, `inst-day15-servo-checkpoint`). The Thursday line at the end |

Total: 50. No cut order: the whole hour is work time.

## Hand-offs

**Pre-class: nothing — x-day.** **Homework:** the Day 16 reading; nothing to
submit. **Day 16 needs from here:** the servo wired on 5 V and following the
pot; the tracker fixture, photocells and clips in hand (some arms already
carry the photocells in their cups; others put theirs in — Petra,
2026-09-06, for Day 16).

## History

The first draft (2026-09-05; `reviews/day15x-gate2.md`) had three Parts:
the wiring rules, a 34-minute build with a universal pulse re-verification
and observation tasks, and a five-minute two-channel recall from Lab 5. Its
Gate 1 re-check table and Gate 2 list are in the review file; the parts
that survived (the wiring tasks, the 5 V check with her boldface, the
symptom list with her edits, the instructor ladder) moved to Day 15 Part 6
on 2026-09-06.
