# Authoring in-class slides from the book

The classroom deck player (`assets/class.html`) projects a lecture as a deck. A
deck is a **thin playlist** (`assets/decks/<id>.json`); the slide *content* lives
in the book as hidden `<slide>` blocks, so the book is the single source of truth
for both pre-class reading and in-class slides. This is the workflow and the
conventions, learned building Day 3.

## The two pieces

1. **`<slide>` blocks in the book** — the condensed, in-class form of a piece of
   content, authored right next to the full prose it condenses. Rendered as a
   hidden `<div class="deck-slide">` in the `web-deck` build (stripped from the
   `web`/`web-edit`/`print` reading builds), which the player extracts by
   `xml:id`.
2. **The deck JSON** — an ordered list of slides: `ref` slides that point at a
   `<slide>` block (or any book element) by page + `xml:id`, plus inline "glue"
   slides (title, section dividers, agenda, …). No content lives in the JSON
   beyond glue.

## Build & preview

```bash
pretext build web-deck                       # renders <slide> blocks (hidden) for the player
cd output/web-deck && python3 -m http.server 8351
# open  http://localhost:8351/external/class.html?deck=<id>
```

- `web`, `web-edit`, `print` **strip** `<slide>` blocks entirely (the reading
  book shows full prose, never the condensed form or instructor notes).
- **Cache gotcha:** the player fetches the deck JSON only on a full page load;
  a hash-only change (`#12`) does not re-fetch. After editing a deck, reload with
  a throwaway query param (`?deck=day3&r=2`) to bust the cache.

## Authoring `<slide>` blocks

Put the block next to the content it condenses. Give every block an `xml:id`
(the deck references it). `@ref` names an existing figure/activity to show
without duplicating its image.

| Slide kind | Author it as | Renders |
|---|---|---|
| **Figure + talking points** | `<slide ref="fig-X"><ul><li>…</li></ul></slide>` | two-column: bullets left (vertically centered), figure right |
| **Diagram (image is the point)** | `<slide ref="fig-X"></slide>` — **no bullets** | image-dominant: the figure fills the slide |
| **Code listing** | `<slide><p>lead</p><program language="c"><code><![CDATA[ … ]]></code></program></slide>` | full-width, syntax-highlighted, scrolls if long |
| **Text / prompt** | `<slide><ul><li>…</li></ul></slide>` (or `<p>`) | full-width |
| **Activity** | *no `<slide>` block* — the deck refs the `<activity>`'s own `xml:id` | full-width; the activity's own heading is hidden, and any figures **or code listings** it embeds are dropped (they get their own slides) |
| **Table** | `<slide ref="table-X"><caption>takeaway</caption></slide>` (tables are targetable) | the table full-width, with the instructive caption below it |

**A code activity you want shown *with* its code** (e.g. "rewrite this snippet") must be
authored as a **self-contained `<slide>` block** — put the `<program>` and the questions
(`<ol>`) directly in the block. Do **not** ref the `<activity>`: an activity ref strips
`pre.program`, so the code the students are meant to work from would vanish. (Day 6
"Rewriting with Macros" is the pattern.)

**Instructive caption** (short line under the figure): add a `<caption>…</caption>`
child. The player shows THIS under the image and **hides the book figure's full
caption** — slide captions are a one-line "what to notice," not the textbook
caption. See the educational patterns below.

**Presenter note** (instructor-only, never projected): add a `<note>…</note>`
child to any `<slide>`. It reaches you via the (planned) handout / `?notes` view,
not the projector.

**Coloured text**: `<clr c="orange">Channel 1</clr>` (`orange | blue | red |
green`) — for bullets that mirror a colour in the figure beside them.

### The `@ref` rule (important)

PreTeXt emits an HTML `id` only for **targetable** elements — `<figure>`,
`<activity>`, tables. Those you can `ref`. `<program>` gets **no** id, so **code
lives inline** in the `<slide>`, never `ref`'d. Inline code is also the right home
for **instructor solutions**: hidden from the reading book, projected on the slide.

## The deck JSON

```jsonc
{
  "id": "day3",
  "title": "Day 3 — …",
  "slides": [
    { "type": "title",   "title": "…", "subtitle": "ENGS 28 · Day 3 — In-Class" },
    { "type": "section", "kicker": "Part 1", "title": "…", "presenterNote": "≈ 10 min." },
    { "type": "agenda",  "title": "Agenda", "items": ["…", "…"] },
    { "type": "notice",  "title": "Reminder: …", "items": ["…"] },
    { "type": "prompt",  "title": "…", "body": "…", "note": "…" },
    { "type": "ref", "page": "subsec-day3-ad2.html", "slide": "sl-day3-ad2-pinout", "title": "AD2 connector pinout" },
    { "type": "ref", "instructor": true, "page": "…", "slide": "sl-day3-cnt-solution", "title": "Solution — blinkyCNT.c" }
  ]
}
```

- **Glue types** rendered inline by the player: `title`, `section` (+`kicker`),
  `agenda`/`recap`/`notice` (title + `items`/`body`), `prompt` (title + `body`,
  top-aligned to leave writing room).
- **`ref`** = `{page, slide, title}`. `page` is the built subsection page
  (subsections chunk to their own page); `slide` is the `xml:id` of a `<slide>`
  block **or** any element (e.g. `act-…` for an activity).
- **`"instructor": true`** marks a slide instructor-only. The plain URL shows it
  with an "instructor only" badge; **`?student`** drops it (the student version).
- **`presenterNote`** = instructor-only timing/cue on a glue slide; not projected.

## Conventions (apply going forward)

- **Captions are INSTRUCTIVE, not descriptive.** A slide caption is a one-line
  "what to notice / what this shows / what to do" (e.g. *"CH1 on the button, CH2
  on the LED; minus leads to GND"*), NOT the book's full figure caption. Author it
  as the slide's `<caption>`; the book's own figcaption is hidden on slides. Keep
  it to a line or two.
- **Diagram slides are image-dominant** (no bullets) so the figure is large
  enough to explain. Don't cram a complex diagram beside bullets.
- **Multiple annotated views of one diagram = multiple figures + multiple
  image-dominant slides.** Never merge them into one.
- **Two images to compare side by side** → one `<figure>` with a
  `<sidebyside widths="44% 44%" margins="2%">` of the two images, ref'd (no bullets)
  → image-dominant, both large. (The player fills the media column and drops the
  book's outer sidebyside margins so the panels don't collapse.) If the reading
  already had them as two separate small figures with no xref, replace those with the
  one combined figure — it reads better in the book too. (Day 6 N/P-channel topologies.)
- **No `<m>` math in slides** — the player doesn't load MathJax. Use plain text
  (e.g. `V_IL`, not `<m>V_{IL}</m>`).
- **Watch for old PowerPoint titles baked into extracted images** — re-export the
  image cropped, or it duplicates the deck title.
- **Solutions** shown in class are instructor material: mark the slide
  `"instructor": true`. (Note: `?student` hides them from the *view*, but the
  content is still in the page source until a solutions-free build is added at
  deploy time.)

## Educational patterns (Petra's design — follow these for new days)

Observed across the prototyped decks (Days 3–6). Use these when generating slides
for days that have no PowerPoint yet.

**Lesson arc.** A day opens with a title, a short *review / where-we're-headed*,
and an *agenda*; it's split into timed **Part N** sections (put the time budget in
`presenterNote`, e.g. "≈ 20 min"); it ends with a *recap* or *looking ahead to the
next day*.

**Observe → explain → fix.** Concepts are taught by having students SEE the
phenomenon first, then explaining it, then fixing it. (Day 3X: scope the bounce →
explain contact bounce → fix in hardware (capacitor) → fix in software (edge
detection).) Don't lead with the answer.

**Activity before reveal.** Students DO or PREDICT first (an `activity` slide),
and only then a **reveal** slide (marked `<note>OPTIONAL / REVEAL — show after the
activity</note>`) confirms/debriefs what they found. Reveals are skippable so she
can adapt to pace. Reference/threshold slides are optional too.

**Teaching code.** The progression is: a **naive / broken** version → an
**activity** to work out why it fails → a **skeleton with `// TODO` blanks** for
students to fill in → the **full solution as an instructor-only slide**
(`"instructor": true`). Never show the finished solution before the fill-in step.
(This is why the deck can diverge from the book's reading version, which may show
the worked code inline — the deck follows the classroom progression.)

**A slide poses; the instructor explains.** Slides carry condensed talking points
and instructive captions, not full prose — the book prose carries the detail. A
complex diagram gets its own image-dominant slide so she can talk over it.

**A concept that is new to students gets its own mini-arc, not one dense slide.**
Motivate → mechanic → mechanic → a predict/practice warm-up, then the hands-on
activity. (Day 1 bitwise ops: *why bitwise* → *masks* → *OR-set* → *AND-clear* →
*predict the bits* → the bit-manipulation activity, under a "Bitwise Operations"
divider.) Don't compress a first-encounter topic to save slides — slides are free;
confusion is not. A short truth table or a few binary-pattern lines can sit right in
the `<slide>` body (a bare `<tabular>` renders full-width; a `<program>` shows the
bit pattern) so each rule comes with its evidence. Put a small reference table off
to the **side** of the worked example with a `<sidebyside>` in the slide body (program
in one panel, `<tabular>` in the other). Slide tables honor PreTeXt's `halign`/`valign`
— the player maps PreTeXt's per-cell alignment classes (`c`/`l`/`r`, `m`/`t`/`b`) — so
`halign="center"` really centers the data under the headers.

**Layout signals meaning:**
- *talking points + a supporting image* → two-column (bullets left, figure +
  instructive caption right).
- *the diagram/photo IS the point* (register diagrams, scope captures) →
  image-dominant, big, with just an instructive caption.
- *a WIDE image with a few talking points* → `<slide ref="fig" stack="yes">`:
  bullets span the full width on top, the figure sits full-width (large) below.
- *code or an activity* → full width.

Slide figures fill the space automatically (the book's small reading-page image
width is overridden), so you don't size them per slide.

**Solutions and instructor reminders are never student-facing.** Solution
listings are `"instructor": true`; how-to-solve-it hints are `<note>`s.

## Where things live

- `xsl/engs28-html.xsl` — the `<slide>` and `<clr>` elements (+ `deck.slides`
  strip/render param); `xsl/engs28-latex.xsl` strips `<slide>` from print.
- `assets/deck.css` — hides `.deck-slide` in the reading view.
- `assets/class.html` — the player.
- `assets/decks/*.json` — the decks.
