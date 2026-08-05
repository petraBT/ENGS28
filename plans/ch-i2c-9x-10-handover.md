# Handover: restructure Days 9x and 10

Paste everything below the line into a fresh session in `~/repos/ENGS28`.

---

You are working in the ENGS 28 textbook repo — PreTeXt book source plus a
classroom deck player. Branch `main`. Work on `main`, commit per unit, push as
you go.

## Your task

Restructure **Day 9x** and **Day 10** (I2C and the seven-segment display) to a
shape Petra has already approved.

**Your files:** `source/ch-i2c.ptx`, `assets/decks/day9x.json`,
`assets/decks/day10.json`. Day 9 (`ch-gpio-interrupts.ptx`, `day9.json`) is
finished — read it as a model, do not edit it.

## Read these first, in this order

1. **`plans/week5-revision-9x-10.md`** — the spec. Petra approved this shape.
   It supersedes the Day 9x and Day 10 sections of `plans/week5.md`. Follow its
   part-by-part tables.
2. `plans/week5.md` — Gate 1 material, still valid except where the revision
   contradicts it. Its "65 min" budgets for 9x and 10 are **wrong** (see below).
3. `AUTHORING-book.md` — rule catalogue. Especially **S-11…S-19** (the voice)
   and **L-1…L-11** (mechanically checked).
4. `AUTHORING-slides.md` — slide markup, layouts, the fit check,
   `room="compressed"`.
5. **`git show 0b0bba9`** — Petra's own hand pass over Day 9's reading and
   opening slides. **This is the voice specimen.** Study it before writing prose.
6. **`git show 58d4506` and `git show 29e8f62`** — Day 9's voice sweep and its
   EXTI simplification. These are worked examples of the same moves you are
   about to make, on the sibling chapter.
7. `plans/day8-voice-reference.diff` — the original voice specimen, from Day 8.

## The change, in one line

The unit is currently bottom-up — protocol → peripheral → library → device —
which lands the payoff last and crams theory into the shortest day.
**Invert it: Wednesday is "use it", Thursday is "build it."**

Real class lengths: **Day 9x is Wednesday, 50 minutes. Day 10 is Thursday, 110
minutes.** The plan's 65 for both is wrong; Day 9x is ~14 min over and Day 10
~45 under. Correct those claims in `plans/week5.md` and `plans/week5-map.md` as
part of your work (Day 9's own numbers are already fixed).

## Order of work

### 1. Ground truth first — do not skip

- Read `assets/starters/SevenSegPartialORIGINAL.c` and `.h`. These are the
  **real** files Petra supplied. Every `HT16K33_*` constant and every
  `numbertable[]` entry must come from here. The current draft used several by
  name without ever checking them. Verify what the chapter asserts and fix
  mismatches.
- Establish **whether `i2c1_byteWrite()` can report ACK vs NACK.** The bus
  scanner in the new Day 9x depends on it. If it cannot, say so in your report
  and design the activity around what the API actually provides. **Do not
  invent a return value** (B-6).
- `python3 scripts/pptx_mine.py "assets/ClassSlidesOLD/Day09X-I2C.pptx"` and the
  same for `Day10-I2C(2).pptx`. The old decks are the authority for the
  intended arc and often carry real driver code as text.

### 2. Day 9x — Wednesday, 50 min

Follow the six parts in the revision doc. The substantive changes:

- **Replace `pingDisplay.c` as the opener.** It sends an address with a byte
  whose own comment says the value does not matter, so **the display stays dark
  for the whole period** and the crucial step is annotating a scope trace.
  Write a given program that makes the display **show characters**, using only
  the existing `i2c.h` API plus the oscillator-on and display-on commands from
  `SevenSegPartialORIGINAL.h`.
- **Add a bus scanner**: walk 0x00–0x7F, print what ACKs. Students discover
  `0x70` themselves, and the wire showing `0xE0` turns the 7-bit/8-bit trap
  into a discovery rather than a telling.
- **Add "write one digit yourself"** as the second half of the crucial step.
- **Move to Day 10:** the pins/AF/open-drain beat, `I2C_TIMINGR`, the five
  library operations, and opening `i2c1_byteWrite()`. That is the ~18 minutes
  of overcommitment.
- The protocol explanation now answers *"how did two wires do that?"* — a
  question students have after seeing it work.

### 3. Day 10 — Thursday, 110 min

Follow the ten parts in the revision doc. New material:

- A **persistence-of-vision** beat in Part 3 — why the display needs its own
  chip. Decide the mechanism (phone camera at high shutter, or the AD2 on one
  segment line) and note that a figure is needed. **Do not invent a figure that
  does not exist**; list it as needed and leave a `<note>`.
- Part 6 carries the peripheral registers moved off Wednesday, now motivated
  because students have used the bus for a day.
- Part 9 is a **break-it stretch**: wrong address → NACK on the trace; **omit
  the oscillator-on command → a perfect trace and a blank display.** That
  second case is the point — the bus can be flawless and the device still do
  nothing.

### 4. Voice pass

Match `git show 0b0bba9`. From Day 9, the two that dominate:

- **No personified hardware or code.** Registers, pins, buses, compilers and
  programs do not want, care, notice, look, know, or get around to things.
  ("the flag carrying the news to `main()`" → "communicating with"; "none of it
  cares where" → "none of it changes when".) `ch-i2c.ptx` currently scores 0 on
  a crude grep for this, but the grep is crude — read for it.
- **No course-internal day references in student-facing text.** Day 9 had 31.
  `ch-i2c.ptx` has **13**, plus 2 in `day9x.json` and 3 in `day10.json`. Name
  earlier material by topic and relative time: "on Day 8" → "last week", "the
  Day 3 idiom" → "the same one we used before", "Day 8's second enable" → "the
  timer's second enable". L-11 bans "in Day N"; the rule is broader.
  **Keep** day numbers in: section titles (structural, B-1), deck subtitles,
  and presenterNotes (instructor-only).
- Cut dramatized framing and manufactured stakes (S-15, S-16). "We" for what
  the class does, "you" for what the student does (S-13). Name things
  precisely (S-12).
- **Never weaken a technical claim** while doing this — S-16 softens rhetoric,
  never engineering.

### 5. Remove activity/slide repetition

Several deck refs point at an `<activity>` and sit next to a `<slide>`
restating the same tasks (S-10, B-8). Keep one — normally the activity, since
it is what students work from — and reduce or delete the duplicate.

### 6. Fit-check everything you touch

`AUTHORING-slides.md` has the snippet. Four things Day 9 proved:

- **Layout is suspended in a background window.** Every element reads 0, which
  looks like "fits". A `resize_window` call wakes it. **Require
  `clientHeight > 0` or the numbers are meaningless.**
- **Image-dominant slides have `display:none` on `.ref-body`** and legitimately
  report nothing. Detect them rather than counting them as passes.
- **Code inside `<pre>` scrolls within itself and reports no overflow at all**,
  so a clipped listing is invisible to measurement. Check code slides by eye.
- **Layout comes from whether the slide has bullets, not from the figure's
  `width`.** A caption-only `ref` slide is already image-dominant; a static
  check that flags "wide figure on a two-column slide" will produce false
  positives.

Instructor-only solution slides may overflow. Student-facing ones may not.

## Hard constraints

- **Never change:** `xml:id`, `ref`, `stack`, `room`, `"instructor"`, `"page"`,
  `"slide"`, `"type"`.
- **Never change a number** — addresses, register values, cycle counts, table,
  figure or page numbers — unless correcting it against a verified source, and
  say so in the commit.
- Register, bit and peripheral names keep reference-manual casing (L-6).
- **Never invent code, register detail, datasheet page numbers, or classroom
  facts** (B-6, B-11c). **The HT16K33 datasheet is not in the repo**, so its
  page citations cannot be verified — leave existing ones alone and add none.
- Deck glue (`prompt`, `notice`, `agenda` bodies) is injected as **raw HTML,
  not PreTeXt**: `<c>` and `<term>` render as unstyled text and newlines
  collapse. Use `<code>`, `<em>`, `<br><br>`, or put the content in a `<slide>`
  block in the book, which is where `AUTHORING-slides.md` says it belongs.
- Every coded activity needs an instructor solution (P-10),
  `"instructor": true`.

## Workflow

Work in **small units and push after each one.** Two previous cloud agents were
given this job whole and both stalled without finishing; scope per commit is
the mitigation.

Before every commit:

```
./scripts/build-all.sh
python3 scripts/check_rules.py --quiet source/*.ptx
python3 scripts/check_deck.py assets/decks/*.json
python3 scripts/check_starters.py
```

All must be clean. `check_deck.py` resolves refs against `output/web-deck`, so
**build first** or newly added slides report as phantom problems. Re-run
`python3 scripts/make_deck_index.py` if a deck's slide count changes, or the
index check fails.

`git status` before committing. Petra edits this repo while you work: commit
only files you changed, never `git checkout` a directory to tidy up, and never
revert a change you did not make.

## Report back

Per unit, what changed and why. Then:

- the ACK/NACK finding for `i2c1_byteWrite()`;
- any mismatch between the chapter and `SevenSegPartialORIGINAL.*`;
- fit measurements for slides you touched — **do not fabricate these**; if a
  slide could not be measured, say so;
- every figure you need that does not exist;
- anything you could not verify and therefore left alone.

## Open questions for Petra — do not guess

These block specific content. Write around them and list them; do not invent
answers.

- What actually happens if **+V and GND are swapped** on the display breakout?
- Does the kit's backpack **arrive with its pin header soldered**?
  (`fig-backpack-pins` is a product photo of a bare board.)
- Are there **spare or known-good displays** in the room? Every diagnostic
  ladder currently ends at "re-seat the wires", which is a dead end without
  spares.
- The **HT16K33 datasheet** is not in the repo, so its page numbers are
  unverified.

Already settled, do not re-ask: kits stay in the classroom with evening access,
so Thursday may assume the display is still wired; and
`SevenSegPartialORIGINAL.*` confirms `SevenSeg_write(uint8_t *)` with
`HT16K33_NBUF 5`, so **Lab 5 §3.3's `uint16_t *` is the error, not the
chapter**.
