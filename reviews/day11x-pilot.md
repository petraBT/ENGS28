# Day 11x — the pilot numbers

Day 11x runs the **student-first ordering** (`CHAPTER_PROCESS.md`, Steps 3′ and 4′):
delivery 1 is the student-facing half — subsections, figures, activities with their
instructor answers, slide blocks and the deck, **with no connecting prose** —
and delivery 2 is the prose, written from the slides Petra passes.

The pilot exists to answer two questions, and they are recorded here as they
happen rather than reconstructed afterwards.

## 1. How many review rounds does she spend?

| Round | Date | On | Outcome |
| --- | --- | --- | --- |
| 1 | 2026-08-19 | Delivery 1 (slides only — she read no prose, by design) | 11 notes + 6 hand edits, all applied |

Baseline for comparison: **Day 11 took two passes** on the book and a further two
rounds on the deck's layout, under the standard ordering.

## 2. What fraction of her notes are *"this isn't what I teach"* versus
*"this doesn't read right"*?

The premise of the pilot is that the standard ordering discovers arc problems late
— after prose has been written against them — and that showing her the skeleton
first moves those notes earlier and makes them cheaper. So the split matters more
than the count.

| Round | *"isn't what I teach"* (arc, sequencing, emphasis) | *"doesn't read right"* (register, wording) | Mechanics / layout |
| --- | --- | --- | --- |
| 1 | **2 of 11** | **0 of 11** | **9 of 11** |

**Round 1 broke down as:**

*"Isn't what I teach"* (2): drop Williams, because the course uses its own readings
now; and don't dwell on the 50 Hz discrepancy, which she fixed in the file herself.

*"Doesn't read right"* (0): none as notes. She made **6 wording edits directly in
the slides** instead — "found the timer settings" for "did the paperwork", "choices"
for "values", "job" for "business", and so on. Counting those as register feedback
would give 6, but they arrived as edits rather than as instructions to go and fix
something, which is the cheaper form and the one the ordering was meant to produce.

*Mechanics and layout* (9): the video; the missing intro above the table and the
table label's spacing; no book links from slides; a preface on the init slides; the
checkpoint as a fill-in table; naming resolution; subscripts on T₀ and T_p; new
figures to come from her; and filenames for them.

**Expected, if the pilot works:** round 1 is nearly all *"isn't what I teach"*,
because there is no prose to react to yet, and the voice notes arrive in round 2
against prose written from slides she has already accepted. **If round 1 is full of
wording notes anyway**, the ordering has not bought anything and the captions,
slide bullets and activity text were carrying too much prose to be called a
skeleton.

### What round 1 actually says

**The prediction half-held, and the half that missed is the more useful finding.**

Almost no arc notes came back — 2 of 11, and both were facts about the course
rather than about the day's design (Williams; the file she had already fixed).
Nothing came back saying *this isn't how I teach this hour*. On a day whose central
activity had just been rebuilt around a different ask, that is the pilot's strongest
result: **the arc was right before any prose was written**, which is exactly what
the ordering is for.

But the *bulk* of round 1 — 9 of 11 — was **mechanics and layout**, which the
standard ordering would not have surfaced any earlier and which the pilot did not
save. A book link that hijacks the projector, a table label with no margin, a video
that would not embed: none of these are visible until slides are built and looked
at, and three of them were defects in the **player**, not the day.

So the honest read is that the student-first ordering moved the *arc* conversation
early, as designed, and moved a *layout* conversation early too — which is new work
appearing sooner, not work avoided. Whether that is a win depends on round 2: if the
prose written from these slides comes back with few register notes, the ordering
paid. If it comes back like Day 10's, it did not.

**One thing the ordering clearly did buy:** she edited six phrasings directly in the
slides rather than writing them down as notes for someone else to apply. Wording she
fixes herself cannot be mis-applied, and it is the reuse rule working at its best.

## What Gate 1 already caught, before she saw anything

Not one of the pilot's two numbers, but relevant to whether the ordering pays:
the committee found three defects at the *plan* stage that the standard ordering
would have surfaced only after the prose existed. All three were verified against
source before being applied.

- **The recall boundary was wrong** — seven of her slide 5's ten questions were
  already on the wall, not two. Under the standard ordering this would have been
  found after Part 2's prose had been written to the wrong premise.
- **The Lab 6 seam was wrong** — `motor_mode()` is Day 11's truth table, not the
  ramp's inline reversal logic.
- **`UG`/`EGR` was already taught on Day 10**, which also settled "shadow register"
  as naming drift against the established "buffered".

Full reports and the consolidated list: `reviews/day11x-gate1.md`.
