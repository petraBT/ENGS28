# Committee regression suite — August 2026

Evidence behind the caught/missed table in `.claude/agents/README.md`. Every
defect below is one that actually reached Petra in a Day 9x / Day 10 draft.

## Method, and its limits

For each defect, the **bad** version of the artifact was checked out of git into
a scratch path, cut down to the Day 9x section, and the relevant agent was run
against it with a brief that named only the files — never the defect.

Three caveats, stated up front because they bound how much the results are
worth:

1. **The agents were exercised by loading their brief into a general-purpose
   agent at the same model**, not by `subagent_type`. The agent registry
   snapshots at session start, so the three new agents were not invocable by
   name in the session that wrote them. What was tested is the brief, which is
   the artifact under review; the dispatch mechanism was not.
2. **Two of the six fixtures are contaminated**, in different directions, and
   the affected rows say so. `checker-technical-accuracy` can see the *fixed*
   chapter at `source/ch-i2c.ptx`, and `expert-cognitive-load`'s brief names
   this chapter's own repetition instances as its calibration example.
3. **Defects D3 and D4 have no committed bad version** — Petra's hand pass and
   the fixes she named landed in one commit, so the broken state was never in
   git. They were reconstructed from the commit message as a synthetic fixture
   and are labelled as such.

## Rebuilding the fixtures

```bash
cd ~/repos/ENGS28
S=<scratch>/regr; mkdir -p $S

# A — voice: the draft before Petra's hand pass
git show 51da2d5^:source/ch-i2c.ptx      > $S/ch-A.ptx
git show 51da2d5^:assets/decks/day9x.json > $S/day9x-A.json
git show 51da2d5^:assets/i2c_transaction.svg > $S/i2c_transaction-F1.svg   # F1

# B — reasoning: before the false-claims commit
git show 0ddd960^:source/ch-i2c.ptx > $S/ch-B.ptx

# C — figure/claim: before the address material was cut
git show c3e34e8^:source/ch-i2c.ptx       > $S/ch-C.ptx
git show c3e34e8^:assets/decks/day9x.json > $S/day9x-C.json

# D1/D2, E — before the committee round
git show 0d538ca^:source/ch-i2c.ptx       > $S/ch-DE.ptx
git show 0d538ca^:assets/decks/day9x.json > $S/day9x-DE.json

# F4 — the broken pptx_annotate composites, before they were deleted
git show 6593603^:source/ch-i2c.ptx > $S/ch-F4.ptx
for f in scope_ping_ack.svg scope_ping_noack.svg waveforms_i2c_setup.svg; do
  git show "6593603^:assets/images/Day10-I2C(2)/$f" > "$S/f4/$f"
done
```

Each `ch-*.ptx` was cut to `<section xml:id="sec-i2c-day9x">` plus the file
header, which is ~1,100 lines instead of ~4,300 — the scoping the README asks
for, and the reason each run finished in four to nine minutes rather than
twenty-two.

## Results

The summary table is in `.claude/agents/README.md`. What follows is what each
run actually did, including where it did less than the table implies.

### A — voice (`checker-voice`, 107k tokens, 6 min)

Fixture: `51da2d5^`, the draft Petra rejected with *"You are not speaking in my
voice."* **All seven patterns caught**, and it identified the fixture correctly
as a pre-hand-pass draft: it reported eight passages that reproduce the
specimen's *before* column verbatim, including the opening, "the direct approach
is not short by a little", "Today: the two wires. Thursday: the chip at the end
of them.", the known-good-hardware paragraph, the "Four wires, and 3.3 V not
5 V" title, "The AD2 in the picture is for Part 3b.", the deleted wiring task,
and "Three things follow from sharing the wires" over four bullets.

The two mechanical sweeps are what make it more than string-matching:

- **`we'll` appears 0 times** in the fixture. Independently verified: `grep -ci`
  returns 0 in the fixture and 7 in the live chapter after her pass.
- **SDA and SCL are never expanded**, in either file, including on the exact
  slide where she wrote the expansion in by hand.

It also produced 13 findings that are *not* in either specimen — epigram slide
titles ("Seven Bits, Eight Bits", "UART needs an agreement; I2C sends the
clock"), the acronym first-use table, five instances of "this course" as the
grammatical actor — so it generalizes rather than only recognizing.

**The reuse pass worked**, which was the open question. From
`Day09X-I2C.pptx` it recovered her own UART-vs-I2C comparison table (six paired
claims, against the draft's three bullets over a cropped figure), her own
protocol slide with the five fields on the slide rather than in a presenter
note, her controller/target inclusive-language line, and her first-person
version of the address war story. It also named two places where the draft is
better than the old deck and should be kept.

### B — reasoning (`checker-technical-accuracy`, Part B only, 115k tokens, 9 min)

Fixture: `0ddd960^`. **All four caught as BLOCKERs**, each with the derivation
shown rather than asserted:

- **B1** ran the low-bit rule over the chapter's own `0x70` and showed the
  misclassification, and separately showed the direction bit is 1 for a read
  using the chapter's own frame diagram.
- **B2** recomputed 34 − 22 = 12 and stated that no reading of the sentence
  makes "more pins than the board has" true, while noting the conclusion is
  correct — which is the failure shape the pass exists for. It also listed
  eighteen calculations it recomputed and found correct, so the pass is legible.
- **B3** found the ACK paragraph contradicting itself within four lines, plus
  four more contradictions the original session never recorded (seven-vs-eight
  recorded values, "the eight bits of the address" against Part 4's set-piece,
  Part 4 staging as discovery something Part 3b already printed).
- **B4** found the D0/D1 virtual-COM-port claim and cited `ch-uart.ptx:900-904`
  as the contradicting source.

**Caveat, and it is a real one:** the fixed chapter is present in the repo at
`source/ch-i2c.ptx`, and the agent said so and used it. For B1, B2 and B4 it
showed independent derivations as well, so the finding does not rest on the
diff. For B3 the evidence is stronger than that — it reported the ACK
contradiction as *still present in the live file*, which it could not have got
from diffing against a fix that does not exist.

**Three live defects it turned up in the current book**, verified by hand:

| File | What |
| --- | --- |
| `source/ch-i2c.ptx:746-755` | the ACK paragraph still says the pull-up brings SDA HIGH before the ACK, then that the line never had a chance to rise |
| `source/ch-i2c.ptx:696` | "the display staying lit is the proof" that the bus works — but the chapter also says the loop changes nothing, so a lit display survives SDA being unplugged |
| `source/ch-gpio-interrupts.ptx:1870` | "Thursday is a change of subject: I2C" — I2C starts on Wednesday's x-hour |

### C — figure/claim correspondence (`checker-figure-claims`, 180k tokens, 16 min)

Fixture: `c3e34e8^`. It opened **all twelve figures the day uses**, rendering
SVGs through PyMuPDF, cropping at 4×, and measuring pixel positions
programmatically — it counted SCL pulses and compared the red ACK ellipse's
bounding box against pulse centres.

- **The `0xE0` / `0x60` title: caught, under-graded.** It found the exact
  pairing and proposed the exact fix, but graded it MINOR because the two slides
  before it establish the shift. Petra graded it a defect. **The brief has been
  corrected**: grade a slide as if it were seen alone.
- **The segment-case mismatch: caught (MAJOR)**, with the right resolution —
  name both forms in the text rather than redraw a datasheet extract.
- **Two screenshots stacked in one figure: caught (MAJOR)**, correctly
  classified as "two views doing different jobs" rather than a `<sidebyside>`
  comparison, with the fix being two figures and two slides.
- **A caption sending students to something not in the frame: caught (BLOCKER)**
  — in a different instance from the one on the evidence list. The wiring
  figure's caption says the `+` wire runs to the Nucleo's 3.3 V pin; the red
  wire exits the top edge of the crop and the Nucleo's power header is sliced
  off at y=0. The debug ladder and the slide caption both send students there.
  It correctly said **ask for the original re-export**, not patch the crop.
- **B-11a confirmed clean** on all four SVGs.

Five further correspondence findings it produced that no one had recorded,
including a scope-setup caption claiming the whole transaction fits on screen
when the settings panel covers the STOP, and a datasheet-frame caption crediting
the datasheet with a distinction its own bracket does not make.

It asked for one asset outright: `seven_seg_segment_map` is 571×276, will be
scaled *above* native size on a slide, and is the figure two activities derive
bytes from. That is a legitimate request to Petra and layout cannot fix it.

### D — slides on their own terms (`learner-in-the-room`)

Two runs.

**D1, D2 — fixture `0d538ca^`** (78k tokens, 4 min). Walked all 38
student-facing slides in projection order.

- **The `helloDisplay.c` listing: caught (BLOCKER)**, with the cause named —
  `room="compressed"` and the `#define` block cut to fit, which is thinning
  instead of splitting. It tabulated nine identifiers against "last seen:
  nowhere" and traced the downstream cost: `0x70` does not reach the wall until
  slide 26, *after* the slide-25 activity that opens "Write 0x70 in binary."
- **The troubleshooting slide: caught (MAJOR)**, by the two-causes test — rung 2
  is not a step, it is an explanation that the symptom is ambiguous.
- Plus four defects from the same week that were not on the D list: the
  seven-values / eight-values broken activity chain, the agenda listing six
  items for eight parts with Part 3c missing, a caption re-issuing the task two
  slides after it was done, and three typos on projected material.

**D3, D4 — synthetic fixture** (54k tokens, 3 min), Parts 1–2 only. There is no
committed bad version: Petra's hand pass and the two fixes she named landed in
one commit, so the broken state never entered git. Both were reconstructed from
the commit message — the task *"Write down the question you would have to answer
to be able to write this program yourself"*, and a slide whose only content is
why `+` goes to 3.3 V — and injected into the `0d538ca^` day.

- **Both caught**, and named against the brief's archetypes ("archetype 3,
  verbatim"; "archetype 4, and worse than the original"). For the task it
  reported writing nothing and said why, and proposed a concrete replacement.
  For the slide it noted the injected second bullet gives the reason the book
  spends a paragraph ruling out.
- It also found, unprompted, that `act-i2c-hello` has no task telling a student
  to wire anything, in an activity titled "Wire the Display and Light It" — the
  ids run `t2, t3, t4` and `t1` is missing. That is a real defect in the
  snapshot, not part of the injection.

Because the fixture is reconstructed rather than checked out, these two rows are
weaker evidence than the rest. They test that the brief's archetypes fire on the
described defect; they do not prove the wording matched Petra's draft exactly.

### E — repetition (`expert-cognitive-load`, 71k tokens, 4 min)

Fixture: `0d538ca^`. It produced the census as a table with counts and
locations, and found three of the four recorded items: the six protocol fields
(it counted 3 full student-facing tellings, against the 4 the commit message
records), the ACK mechanism twice in full, and 3.3 V three times. The fourth —
a slide restating the activity's tasks — it could not find and said so; that
instance was caught by `learner-in-the-room` as a caption re-issuing a task.

It also produced an unprompted load finding (seven novel elements in Part 3a
across two slides in five minutes) that is not a repetition finding at all.

**This row is the weakest in the suite and should be read as such.** The brief's
calibration example names this chapter's own instances, so the run partly tests
recall rather than detection. Two things argue it is not purely lookup: the
counts it reported differ from the brief's (3 rather than 4, 3 rather than 4),
which means it counted, and it declined to carry forward the one item it could
not locate rather than assert it. The brief has since been marked as an example
of *shape*, not a checklist. **A clean re-test needs a chapter the brief does
not describe** — run it on Day 11 or Day 13 when those are drafted.

### F — figures and fit

- **F1, the SVG with no intrinsic size: caught by the linter, not an agent.**
  `check_rules.py` now errors on B-11a. Verified firing on
  `51da2d5^:assets/i2c_transaction.svg` and silent on the fixed version and on
  the whole live book. This is strictly better than an agent finding: it blocks
  the commit.
- **F2, the silently cropped slide: not covered, and cannot be.** Every overflow
  measurement reads zero, so there is no static or measurable signal.
  `checker-figure-claims` names the candidates with their bullet counts — it
  produced six for this day, correctly ranking the two-image portrait figure and
  the heaviest stacked slide at the top — but naming candidates is not detection.
  **The control is the human fit check**, now trap 4 of five in
  `AUTHORING-slides.md`.
- **F3, two screenshots stacked in one figure: caught** — see C.

### The false-positive check, and what it found instead

An agent that flags everything is a report Petra stops reading, so
`checker-voice` was also run against prose that had *already* had her hand pass,
expecting a short list or none.

**It came back BLOCKER, and it was right.** The fixture was not clean. Verified
by hand against the live `source/ch-i2c.ptx`:

| Live | What |
| --- | --- |
| `:78-99` | `sec-i2c-day9x`'s `<introduction>` still opens *"Nothing from Tuesday is a prerequisite for today… Nothing was assigned to read before today"* — the exact sentences she replaced |
| `:352`, `:1823`, `:1833`, `:3440`, `:3512` | "known-good hardware in the room" survives in **five** places across Days 9x and 10 |
| `:481` | "Three things follow from sharing, and you will see all three before the hour is out" |
| — | `we'll` appears 7 times in 3,700 lines of prose against 4 in a 37-slide deck |

**Her Day 9x hand pass reached the deck and was never propagated into the book
prose.** The deck's opening slide carries her replacement verbatim; the
paragraph it condenses still carries what she struck out. That is precisely the
half-hers failure the brief predicts and `CHAPTER_PROCESS.md` Step 5b warns
about, and it is the strongest single argument for this agent existing — it
found, unprompted, that a voice pass everyone believed was applied is half
applied.

It also caught a defect in the fixture that was **mine**: the extract script
duplicated the opening `<section>` line, which would fail the build. It flagged
it, correctly handed it to `checker-technical-accuracy` as out of its own remit,
and did not let it derail the review.

So the false-positive property is **still unmeasured** by that run. A second
attempt against `sec-timers-day8` — the section Petra hand-rewrote in
`plans/day8-voice-reference.diff`, and the cleanest available specimen of her
own finished prose — is the real test.
