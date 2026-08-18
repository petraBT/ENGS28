# What a slide looks like from the back of the room

`AUTHORING-slides.md` says how to *build* a slide. This file says how one should
**look**, because that is where Day 11 lost four rounds of Petra's time.

Every rule here comes from a correction she actually made, and the numbers are
measured in the player, not estimated. Read it before laying out a slide that
carries a figure, a formula, a table or a legend.

---

## The type scale is fixed. Learn it.

Measured on the 1280×720 stage, expressed as **% of slide height** so it is
projector-independent (multiply by your screen height to get real millimetres):

| element | size | % of slide height |
| --- | --- | --- |
| slide title | 23 px | 3.2 % |
| **body paragraph, task text** | **21.6 px** | **3.0 %** ← the reference |
| bullet (`<li>`) | 22.3 px | 3.1 % |
| table cell | 19.4 px | 2.7 % |
| slide `<caption>` | 15.1 px | 2.1 %, grey, centred |

**Body text at 3.0 % is the reference for everything else on the slide.** It is
the size the room was designed around. Anything a student has to read is
measured against it, not against how it looks on your laptop.

---

## Rule 1 — A `<caption>` is a closing aside, never content

It renders at **2.1 %, grey and centred**: 70 % the size of the prose above it,
in the lowest-contrast colour on the slide, in the position the eye reaches last.
That is deliberate. It is for one line of *what to notice*.

Petra, 2026-08-17, on captions used as a general text slot:

> *"You keep using these tiny lines of text on the slides — very hard to read…
> the font is tiny and it's very much squished towards the bottom of the slide.
> This will not be easily visible on the projector."*

And 2026-08-18, on a symbol legend I had put in one:

> *"the caption is way too small to actually convey much information."*

**The test:** if a student who never read the caption would be unable to do the
next thing you ask of them, it is not a caption. Legends, definitions,
instructions, and anything they must hold in mind while thinking go **in the
body**, at body size — beside the figure in a `<sidebyside>` if the slide is
short of vertical room.

**Her own resolution, on `sl-day11-motor-relations`, is the model.** A nine-item
symbol legend does not split into "keep" and "cut"; it splits into two jobs:

- the five **variables** that appear in every equation on the slide — τ, i, ω, e,
  V — are a bulleted list beside the circuit, at **3.1 %**, because a student
  reads an equation and looks across;
- the four **constants** — K_t, b, K_e, R_a — are the caption, at **2.1 %**,
  because each of them is *already named inline in the bullet that uses it*
  (`τ = K_t i`, `e = K_e ω`). Losing the caption costs nothing, which is exactly
  what makes it a legitimate caption.

This correction has now been given twice. It is the most repeated note in the
Day 11 record.

---

## Rule 2 — Figure text is measured against body text

For a figure, work out what its text will actually be on the wall:

```
on-stage %  =  (font size in the figure ÷ figure's natural height)
               × (rendered height on the slide ÷ slide height) × 100
```

Measured examples from Day 11, with her verdict on each:

| figure text | on-stage | verdict |
| --- | --- | --- |
| display equation at `width="25%"` (294 × 94 px) | 4.4 % | accepted |
| display equation, filling a media column | ~9 % | *"way too big"* |
| my pMOS/nMOS legend | 2.6 % | accepted |
| regulator silkscreen, full width | 2.5 % | accepted |
| her truth table body type | 2.2 % | *"projects beautifully"* |
| her wiring-1 yellow annotations | 1.9 % | accepted |
| wiring-2 Nucleo pin silkscreen | **0.5 %** | rejected — still open |

So:

- **Load-bearing figure text: aim for ≥ 2 %.** Below ~1 % it is not small, it is
  absent, and a slide that asserts something it cannot show is a figure-claims
  defect (the wiring-2 pin names have survived three rounds because the fix is an
  export only Petra can make).
- **A display equation wants about 1.5 × body text — roughly 4–5 %.** For the
  Day 11 equation SVG (500 × 160 viewBox, 54-unit glyphs) that is
  `width="25%"` as a bare `<image>` in the slide body. Do not let it fill a
  media column. A one-line formula ref'd as a figure gets sized as if it
  were a diagram and comes out 3 × body text, which she has now called *"way too
  big"* once and *"looks terrible"* once.
- **The lever is a bigger figure, never smaller text** (B-11a). If the figure
  cannot be bigger, it needs callouts, an inset, or a re-export — ask.

---

## Rule 3 — Her layouts already exist. Use them.

`ClassSlidesOLD` is the authority for the **arc** (`CHAPTER_PROCESS.md` Step 1),
and it is equally the authority for **layout**. Mine it for both.

Day 11's four-relationships slide went through three shapes before landing on the
one her own slide 7 had used all along:

> **image on top → the claims, each with its equation at the end of its own line
> → the symbol legend in a box of its own, not a bullet in the argument.**

The two failed attempts were a two-column figure ref (equations enormous, bullets
squeezed) and a bullets-plus-caption version (legend unreadable). Neither was a
new idea worth trying; her slide already answered the question. Her final hand
edit put the legend beside the picture and the constants in the caption — see
Rule 1.

**When a slide is about content she has taught before, open her deck and look at
the slide before choosing a layout.** `python3 scripts/pptx_mine.py` prints the
text; the images are in `assets/images/DayNN-*/slideNN_*.png`.

---

## Rule 4 — One paragraph, one slide, and check the mapping

A slide condenses **one** thing. Two failures on Day 11, both from breaking this:

- `sl-day11-counter-compare` carried five bullets, the last of which condensed
  the paragraph *after* the figure rather than the figure's own. It was 196 px
  over and printed over its own title. Splitting that bullet onto its own slide
  fixed the fit with nothing shortened.
- Part 2's first two paragraphs — what an H-bridge is, and that the four switches
  are pMOS on top and nMOS beneath — had **no slide at all**, so the deck opened
  on how to control a thing it had never introduced. Petra:
  *"you just jump into how to control the H-bridge, without any review of what an
  h-bridge is. The book has way more there."*

**Before the deck is finished, walk the in-class prose paragraph by paragraph and
confirm each one either has a slide or was deliberately left off.** A paragraph
with no slide is the failure mode that no linter and no committee reviewer caught
on Day 11.

---

## Rule 5 — Look at the slide. The numbers do not see everything.

Run the fit snippet in `AUTHORING-slides.md` — and then **look**, because these
are invisible to it:

- **A figure whose text is too small** measures perfectly and teaches nothing.
- **An annotation box that misses the thing it annotates.** Day 11's pMOS/nMOS
  boxes were 96 px wide on the right against 140 on the left and sat 22 px off
  their MOSFETs — a sign error in the generator, invisible to every check.
- **A label the artwork is drawn through.** `pwm-counter-compare.svg` had its
  waveform running through *"CNT < CCR1"*; the fix was a left margin for the
  label, not moving the text into a different collision.
- **Text that runs off a hand-authored canvas.** The H-bridge notes were cut
  mid-sentence — *"the upper switch conducts when"* was the last thing on the
  wall. Generators must wrap, and grow the canvas to fit.

Before 2026-08-18 the snippet also reported **"fits"** for a two-column slide that
was 196 px over (it grew past the slide instead of clipping). That is fixed, but
it is the reason the rule is *look at every slide that carries a figure*, not
*run the snippet*.

### Render it at its own size, or you will look at the wrong picture

Looking is only worth anything if what you are shown is the figure. **`qlmanage
-t` forces every thumbnail into a square** and crops whatever does not fit, so a
wide diagram comes back with its right-hand side missing — which looks exactly
like a composite that `pptx_annotate.py` cropped. On Day 11x two rebuilt figures
were read as silently cropped, written up as defects, and very nearly reported to
Petra as figures that had to come from her. Both were fine. The rasterizer was
not.

Render at the size the SVG declares:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# read width/height off the <svg> element -- they match the viewBox (B-11a)
"$CHROME" --headless --disable-gpu --screenshot=out.png \
          --window-size=1158,644 --default-background-color=FFFFFFFF fig.svg
```

Two habits that make this cheap. **Check the aspect ratio of what you got against
the `viewBox`** — a square PNG from a 2:1 figure is the tell, and it costs one
line to notice. And when several figures need looking at, put them in one HTML
page and screenshot that once, rather than reading a dozen images in.

The general form of the mistake is worth naming, because it is not really about
`qlmanage`: **a defect you can only see through a tool is a claim about the tool
as much as about the figure.** Before reporting one, confirm the tool is showing
you the whole artifact. `pptx_annotate.py` does have real failure modes — a label
that does not wrap, a shape layer that lands in the wrong place — and they are
distinguishable from a bad render only if the render is honest.

## Rule 6 — Draw only what the chapter teaches

A figure must not assert more than the text supports, and must not answer a
question the next slide asks (P-15).

- Day 11's bridge drawings leave out the body diodes her datasheet figures show,
  because the chapter never mentions diodes and four unexplained triangles would
  be raising a question nothing answers. `DIODES` in
  `scripts/mk_hbridge.py` turns them on if that changes.
- The plain bridge carries no traced current path, because `act-day11-diagonal`
  asks students to find the conducting diagonals.
- Where a figure cannot honestly show a direction, **say so in the drawing**. The
  short-brake loop is dashed and carries no arrowhead, because which way the
  generator current runs depends on which way the shaft was turning. Petra:
  *"there should not be an arrow since we don't know in which direction the motor
  was turning."*

---

## Rule 7 — An instruction the room must act on goes in the title

Not in a caption, not in a presenter note, not only in the prose.

`sl-day11-wiring-1` is titled **"Build this circuit — but do not connect power
yet"**. It is image-dominant, so the image stays full size and the instruction is
still the largest text on the wall. Petra:

> *"the next slide shows the circuit but no instruction around it. How about
> naming that slide 'Build this circuit but do not connect power' or some such
> thing? They need to see it large on the screen."*

---

## Rule 8 — Do not project the same figure twice

> *"I don't think we need to repeat show the truth table since we had just shown
> it a few slides earlier. They can go back to it on their own."*

If an activity needs a table the room saw four slides ago, the book keeps it
beside the tasks and the deck does not repeat it.

---

## Rule 9 — A term the room has not met does not appear unannounced

`VM` arrived on the regulator slide with no introduction, five parts after the
bridge drawings had been labelling a rail with it. The fix was upstream: the new
H-bridge lead-in names it *the motor supply, the rail across the top of every
bridge drawing today*, and the regulator slide now says why a separate supply
exists at all before naming the pin.

**When a slide introduces hardware, the first bullet says why it is there** — not
what it is. *"The motor needs its own current path, and more than the 3.3 V logic
rail can give"* before *"a 6–12 V wall adapter plugs into the barrel connector"*.

---

## The checklist

Before handing over a deck:

- [ ] Every in-class paragraph has a slide, or was deliberately left off
- [ ] Her old deck was opened for every slide covering content she has taught
- [ ] No `<caption>` carries anything a student must read
- [ ] Every figure's text is ≥ 2 % of slide height; display equations ≈ 4–5 %
- [ ] Every figure looked at in the player, not just measured
- [ ] Every rebuilt composite rendered at its declared `viewBox` size, and its
      aspect ratio checked against it, before any of it is called a defect
- [ ] No figure answers a question a later slide asks
- [ ] No figure drawn twice
- [ ] The fit snippet run with the crossfade killed and the preview server stopped
