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
| **Activity** | *no `<slide>` block* — the deck refs the `<activity>`'s own `xml:id` | full-width; the activity's own heading is hidden (deck title names it) |

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

- **Captions: one short line.** Not a paragraph. Shorten in the book source — it
  fixes both the slide and the reading view; the prose carries the detail.
- **Diagram slides are image-dominant** (no bullets) so the figure is large
  enough to explain. Don't cram a complex diagram beside bullets.
- **Multiple annotated views of one diagram = multiple figures + multiple
  image-dominant slides.** Never merge them into one.
- **No `<m>` math in slides** — the player doesn't load MathJax. Use plain text
  (e.g. `V_IL`, not `<m>V_{IL}</m>`).
- **Watch for old PowerPoint titles baked into extracted images** — re-export the
  image cropped, or it duplicates the deck title.
- **Solutions** shown in class are instructor material: mark the slide
  `"instructor": true`. (Note: `?student` hides them from the *view*, but the
  content is still in the page source until a solutions-free build is added at
  deploy time.)

## Where things live

- `xsl/engs28-html.xsl` — the `<slide>` and `<clr>` elements (+ `deck.slides`
  strip/render param); `xsl/engs28-latex.xsl` strips `<slide>` from print.
- `assets/deck.css` — hides `.deck-slide` in the reading view.
- `assets/class.html` — the player.
- `assets/decks/*.json` — the decks.
