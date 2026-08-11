# Prompt: Day 10 slide pass

Paste everything below the line into a fresh session in `~/repos/ENGS28`, then
paste your slide feedback under it.

---

You are working on the **Day 10 deck** of the ENGS 28 textbook. Two jobs, in this
order.

## Job 1 — propagate Petra's book edits into the slides

She has hand-edited the Day 10 prose and the slides have not caught up. **A
`<slide>` block and the paragraph it condenses are separate texts and no build,
linter or check compares them** — this is Step 5b in `CHAPTER_PROCESS.md`, and it
is the single most reliable source of drift in this book. Four slides were found
carrying pre-hand-pass text in the last pass alone.

Find what she changed:

```bash
git log --oneline -15 -- source/ch-i2c.ptx
git diff <the commit before her edits> -- source/ch-i2c.ptx
git diff -- source/ch-i2c.ptx            # if any are still uncommitted
```

Her edits are in `<section xml:id="sec-i2c-day10">` and in
`sec-display-before-class`. For each changed paragraph, open the `<slide>` block
that condenses it — they sit **inside the same subsection**, right after the
prose — and bring it into line. Also check the deck's own glue text in
`assets/decks/day10.json`: the `recap`, `agenda`, `prompt` and `section` entries
are authored there, not in the book, so they drift independently again.

## Job 2 — her other slide feedback

It follows this prompt. Work it after Job 1, since some of it may already be
fixed by the propagation.

---

## What you need to know

**Where things are.** Slides are `<slide xml:id="sl-day10-…">` blocks inside
`source/ch-i2c.ptx`, authored beside the prose they condense. The deck is
`assets/decks/day10.json` — 64 entries, 45 of them `ref`s into those blocks, 13
`Part N` section dividers, 6 marked `"instructor": true`. Mechanics are in
`AUTHORING-slides.md`.

**Her voice is specified, not guessed at.** Three frozen specimens, listed in
`AUTHORING-book.md` under *S-11 … S-28*. Read
**`plans/day10-voice-reference.diff` first** — it is her own 692-line pass over
this exact material and the newest of the three. S-22…S-28 come from it. Two
that bite hardest on slides:

- **S-25, no classroom management in student-facing text** — no spare hardware,
  no "if your homework did not build", no "raise your hand". The one permitted
  form in the whole corpus is `Still stuck?  We're here to help!`, five words.
  Instructor logistics go in a `<note>` or the deck's `presenterNote`.
- **Her register is plain and explanatory, not terse.** Several of her rewrites
  are *longer* than what they replaced. Drafts keep compressing toward the
  aphoristic; that is the wrong direction.

**Solutions are not student-facing.** Two mechanisms, not interchangeable
(`AUTHORING-book.md`, P-10): in the book, an `<instructor>` element, stripped
from every student target before the HTML is written; in the deck, a slide whose
entry is `"instructor": true`. If you add a reveal, use one of them.

**Slides must stand alone (S-9)** — every symbol on a code slide needs a referent
the room has already seen, in projection order. And a figure under a tall bullet
stack projects at a quarter of the size it needs: the lever is fewer/shorter
bullets, because the `width=` attribute does nothing on a slide.

**Fixed recently, do not re-report:** prompt and notice slide bodies used to
render at `font-weight: 600`, so whole paragraphs read as bold. That was
`assets/class.html`, now weight 400.

## Before every commit

```bash
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

`check_deck.py` resolves refs against `output/web-deck`, so **build first** or
new slides report as phantom problems. Re-run `python3 scripts/make_deck_index.py`
if the slide count changes. Small commits, pushed as you go.

**`git status` before committing.** Petra edits this repo while you work, and a
second session may be working on the Launchpad wiring at the same time — commit
only files you changed, never revert a change you did not make.

## Still open, in case her feedback touches them

- The persistence-of-vision beat in Part 3 rests on three unverified claims (the
  HT16K33's scan rate is not in the repo). The `OPEN, for Petra` comment in the
  source is deliberate; do not assert a rate.
- Lab 5 §3.3 declares `SevenSeg_write(uint16_t *)` where the chapter and the real
  starter both say `uint8_t *`. Adjudicated as the handout's error; the fix is in
  a PDF only she can change.
- `expert-class-logistics` predicts the crucial step does not land for the slower
  half of the room. About 7 minutes of duplication were cut and Part 4 carries a
  documented compression lever, against a predicted 15–20 minute overrun. If the
  first run confirms the prediction, the next lever is Part 3.
