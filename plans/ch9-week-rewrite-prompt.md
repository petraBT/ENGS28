# Prompt: rewrite the Day 9 / 9x / 10 week

Paste everything below the line into a fresh session in `~/repos/ENGS28`.

---

## The task

Rewrite one week of ENGS 28: **Day 9 (GPIO interrupts)**, **Day 9x (I2C)** and
**Day 10 (I2C and the 7-segment display)**. All three are currently *rough* —
assembled from raw slide extraction, with duplicated concepts, unannotated
images, possibly invented code, and no in-class structure. Assume nothing in
them is correct until checked against ground truth.

These are three days but **two chapters**:

| Day | Topic | File | Old deck |
|---|---|---|---|
| 9 | GPIO interrupts (EXTI) | `source/ch-gpio-interrupts.ptx` | `assets/ClassSlidesOLD/Day09-Interrupts(2).pptx` |
| 9x | I2C | `source/ch-i2c.ptx` | `assets/ClassSlidesOLD/Day09X-I2C.pptx` |
| 10 | I2C + 7-segment | `source/ch-i2c.ptx` | `assets/ClassSlidesOLD/Day10-I2C(2).pptx` |

### How to scope it

**Plan all three together, then write them one chapter at a time.**

1. **One Step 0** (ground truth) covering the whole week.
2. **One week-level Step 2** — a lesson plan covering all three days, with the
   hand-offs between them made explicit. **One Gate 1** on that plan.
3. Then **Steps 3–5 and Gate 2 per chapter**: `ch-gpio-interrupts.ptx` first,
   then `ch-i2c.ptx`. Day 9x/10 do not depend on Day 9, and Day 9 is the
   cheaper of the two because it inherits the NVIC, ISR naming and `volatile`
   from Day 8 — so it is the right place to find out whether the process is
   working before spending it on the bigger chapter.

Do **not** merge the two chapters, and do not write one three-day lesson plan
so large that Gate 1 stops being cheap. The point of Gate 1 is that a bad arc
costs one page.

### Read these first

- `CHAPTER_PROCESS.md` — the workflow, the gates, the definition of done
- `AUTHORING-book.md` — the rule catalogue (P-, B-, S-, L-)
- `AUTHORING-slides.md` — slide markup, layouts, the fit check
- `plans/day8-voice-reference.diff` — the voice specimen (see below)
- `plans/day8.md` — the most recent lesson plan, as a model for format

## Things specific to this week

**Day 9 carries a deferred topic: BSRR.** `CHAPTER_PROCESS.md` holds it
specifically for this chapter, and the motivation is load-bearing: ISRs that
share GPIO pins with the main loop create a race on the `ODR`
read-modify-write, and BSRR's atomic set/clear is the fix. Students must have
*hit* the problem before BSRR makes sense, so the chapter has to stage the
race first. CMSIS names: `GPIO_BSRR_BS5` to set, `GPIO_BSRR_BR5` to clear.
Place this deliberately in the lesson plan; do not let it fall out of Step 3.

**Day 9 continues Day 8, and should say so.** Day 8 taught the interrupt
mechanism with the timer as the source: DIER raises it, the NVIC admits it, the
vector table names it, the ISR stays short, shared variables are `volatile`.
Day 9 changes only the *source* (a pin instead of a timer). Do not re-teach the
mechanism — check what Day 8 already establishes and build on it. Read
`source/ch-timers-interrupts.ptx`, which is the most polished chapter in the
book and the best model for what "done" looks like.

**Day 9 → Day 9x is a hard pivot** from interrupts to a new protocol, with no
shared machinery, inside one week. The week-level plan should say explicitly
where the cognitive load lands and what gets cut if the week runs long.

**`ch-i2c.ptx` currently also contains Day 13** (`Day13-I2C(3).pptx`), which is
a different week. Decide *before writing* whether Day 13 content stays in that
file or moves — otherwise it gets rewritten twice. Ask if unsure.

## The voice — this is not optional

Slides and prose are written in **Petra's voice, rules S-11 … S-19** in
`AUTHORING-book.md`. These were derived from her own hand rewrite of Day 8,
frozen at `plans/day8-voice-reference.diff`. **Read that diff before writing
anything.** The rules summarize it; the diff is the specification.

The whole point of those rules is that a new chapter should arrive *already*
in this voice rather than being corrected into it afterwards. In short: name
things plainly and say where they live; "we" for what the class does and "you"
for what the student does; give the reason with the rule even though it makes
the slide longer; no manufactured urgency, stakes or dares; requirements
rather than slogans — **without ever weakening a technical claim**; a title
that says what the slide is; and admit where a rule has exceptions.

`scripts/check_rules.py` now enforces the lintable corner of this as
**L-8 … L-11** (time pressure, slogan endings, challenge phrasing, "in Day N"
→ "on Day N" or "tomorrow"). It will fail the build on those.

## Traps that have actually bitten, in this book

- **An activity ref strips its code.** `assets/class.html` removes
  `pre.program` from any deck ref that resolves to an `<activity>`. A code
  activity you want projected *with* its code must be a self-contained
  `<slide>` block. Two decks shipped with the listing silently missing and the
  text still saying "the code below".
- **Check the fit, with the current check.** The snippet in
  `AUTHORING-slides.md` catches three things a naive check misses: suspended
  layout in a background window, image-dominant slides whose `.ref-body` is
  `display:none`, and — worst — code clipped *inside* a `<pre>`, which scrolls
  within itself and reports no overflow at all.
- **A dense code screenshot beside bullets is unreadable.** Two-column put one
  at ~9px per code line. Use `stack="yes"` or an image-dominant slide, and
  measure rather than guessing (B-11a).
- **`room="compressed"`** tightens prose spacing, not code. It rescues a long
  activity; it does almost nothing for a slide that is mostly `<program>`.
- **The book has four build targets in four output directories**, and building
  one does not touch the others. `./scripts/build-all.sh` rebuilds them all.
  `check_deck.py` resolves refs against `output/web-deck`, so **build before
  running it** or it reports phantom problems for newly added slides.
- **Never invent code, register detail, or classroom facts** (B-6, B-11c). The
  real driver is often recoverable as text from the old deck's code slides via
  `scripts/pptx_mine.py`. Ask rather than reconstruct from plausibility.

## How to work

Work in small, reviewable steps and check in at the gates. Commit per
meaningful unit with a message that says *why*, not just what. Run before every
commit:

```bash
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

`git status` before committing — Petra edits these repos while you work.
Commit only files you changed, never `git checkout` a directory to tidy up,
and never revert a change you did not make.
