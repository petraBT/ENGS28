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
  a hash-only change (`#12`) does not re-fetch, so reload after editing a deck.
  (Served from `localhost` the player now fetches decks and book pages with
  `cache: 'no-store'`, so a plain reload is enough — the old trick of adding a
  throwaway `&r=2` is no longer needed. A deployed deck still caches normally.)

To author *from* the slides — Alt-click a bullet or caption and edit it in
place — use `./preview-slides.sh` instead, and see "Editing from the player"
below.

**Contents page.** Open `class.html` with **no `?deck=`** and the player lists
every deck in teaching order, with its title — a day's X session under its day,
its pre-class video under that. One switch at the top flips the whole page
between the instructor and student links, and `?notes` carries through.

The list comes from `assets/decks/index.json`, because a deployed deck is a
static site and cannot list a directory. Regenerate it after adding or renaming
a deck:

```bash
python3 scripts/make_deck_index.py
```

`preview-slides.sh` runs it on every start, and `check_deck.py` fails if the
committed index is out of date — so the usual way to find out is to be told.
Deck titles are the source: `"title": "Day 8 — Timers and Interrupts"` splits on
the em dash into the label and the name, so keep that form.

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
| **Demo** (live board simulator) | `<slide><p>lead-in</p><sim starter="…"/></slide>` | lead-in line on top, the running simulator filling the rest of the slide |

**A code activity you want shown *with* its code** (e.g. "rewrite this snippet") must be
authored as a **self-contained `<slide>` block** — put the `<program>` and the questions
(`<ol>`) directly in the block. Do **not** ref the `<activity>`: an activity ref strips
`pre.program`, so the code the students are meant to work from would vanish. (Day 6
"Rewriting with Macros" is the pattern.)

**A demo slide** puts ENGS 28's coding surface on the projector: a `<slide>` whose body
is a `<sim>` (see AUTHORING.md) is shown as the live simulator, full slide, with the
lead-in line above it. This is ENGS 20's `demo` slide type, arrived at the book-native
way — there is no `"type": "demo"` in the deck JSON; it is an ordinary `ref` to a
`<slide>` that happens to contain a `<sim>`. (Day 1, `sl-day1-sim-demo`, is the pattern.)
A `<sim>` embedded in an **activity** is dropped when that activity is projected, exactly
like the figures and code listings an activity embeds — the students already have it in
the book, and the slide should show the tasks.

**Instructive caption** (short line under the figure): add a `<caption>…</caption>`
child. The player shows THIS under the image and **hides the book figure's full
caption** — slide captions are a one-line "what to notice," not the textbook
caption. See the educational patterns below.

**Presenter note** (instructor-only, never projected): add a `<note>…</note>`
child to any `<slide>`. Add **`?notes`** to the player URL to see them (and a
glue slide's `presenterNote`); they are hidden otherwise and never shown in the
`?student` view. That view is also the only place they can be clicked, so it is
how you edit them.

**Coloured text**: `<clr c="orange">Channel 1</clr>` (`orange | blue | red |
green`) — for bullets that mirror a colour in the figure beside them.

**Writing room** (predict/practice slides): add `room="yes"` to a `<slide>` (or
`"room": true` to a deck `ref`, e.g. an activity) to leave a couple of blank lines
after each list item / task, so students — and you — can write an answer in class.
Slide content top-aligns, so the room falls below each problem.

**Compressed spacing** — the opposite setting, `room="compressed"` (or
`"room": "compressed"` on a deck `ref`). Tightens the gaps between paragraphs,
list items and tasks so a long activity fits on one slide. **Type size is not
changed** — only the spacing — so nothing gets harder to read from the back of
the room. Reach for this when a projected activity overflows: it is the way to
keep every task on the slide without deleting one (S-9 says split, don't thin —
compressing the gaps is neither). Day 3's "Exploring the Oscilloscope" is the
pattern: five tasks, 108px over, and it fits with `"room": "compressed"`.

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
- **`"room"`** = `true` for writing room after each item, or `"compressed"` to
  tighten the spacing so a long activity fits (see above). A `<slide>` block sets
  the same thing with `room="yes"` / `room="compressed"`.
- **`"refPage"`** = the page a `<slide>`'s `@ref` target lives on, when that is
  *not* the slide's own page. Normally a slide and the figure it refs must be in
  the same subsection (they chunk to one page, and the player only searches that
  page). `refPage` lets an in-class slide show a figure from the Before Class
  reading instead of duplicating it — Day 6's transistor review reuses
  `fig-bjt-npn-symbol` this way. `check_deck.py` verifies the target really is on
  that page, and flags a `refPage` that is no longer needed.
- **`presenterNote`** = instructor-only timing/cue on a glue slide; not projected.
  (On a `prompt` slide, a `note` field is rendered **visibly** as sub-text — use
  `presenterNote` for anything the class shouldn't see, e.g. a think-pair-share
  reveal.)

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
  (e.g. `V_IL`, not `<m>V_{IL}</m>`). The player still makes it *look* like math:
  a **single-letter** variable followed by `_subscript` is typeset as an italic
  symbol with a real subscript (`V_BE` → *V*&#8203;<sub>BE</sub>), in slide text,
  captions, titles, and in a ref'd table. Two-letter heads are deliberately left
  alone so reference-manual names — `rc_w0`, `rc_w1`, `CK_CNT`, `CK_PSC` — stay
  exactly as the RM writes them (L-6), and anything inside `<c>`/`<program>` is
  never touched. `<m>` in a ref'd **figure or table** is flattened the same way,
  so a table lifted from the book no longer projects raw LaTeX.
- **Watch for old PowerPoint titles baked into extracted images** — re-export the
  image cropped, or it duplicates the deck title.
- **Solutions** shown in class are instructor material: mark the slide
  `"instructor": true`. (Note: `?student` hides them from the *view*, but the
  content is still in the page source until a solutions-free build is added at
  deploy time.)

## Voice

Slides are written in Petra's voice, which is **S-11 … S-19** in
`AUTHORING-book.md`. There are two frozen specimens, and the rules are only a
summary of them — read both before authoring a deck, and read them again if a
rule feels ambiguous:

- `plans/day8-voice-reference.diff` — her hand rewrite of the Day 8 deck.
- `plans/day9x-voice-reference.md` — her hand pass over the Day 9x opening,
  with the before/after pairs called out. Written after she rejected a draft
  with *"You are not speaking in my voice"*, so it is the one to check a draft
  against when the register feels off rather than the facts.

In one line each: name things plainly and say where they live (S-11, S-12); "we"
for the class and "you" for the student (S-13); give the reason with the rule,
even though it makes the slide longer (S-14); no manufactured urgency, stakes, or
dares (S-15, S-17); requirements rather than slogans, **without weakening the
technical claim** (S-16); a title that says what the slide is (S-18); and admit
where a rule has exceptions (S-19).

A `<slide>` block and the prose it condenses are separate texts that must not
sound like different people, so a voice fix in one needs checking against the
other (Step 5b).

### What no rule covers

Three changes in the Day 8 pass resist generalization. They are recorded here so
nobody later mistakes them for rules — if a draft raises one of these, ask rather
than guessing:

- **Which explanations get expanded.** Day 8 grew the misspelled-handler slide
  from one bullet to four (weak symbols, the default handler, the symptom) while
  leaving other slides alone. S-14 says give the reason; it does not say which
  slides earn four bullets and which earn one.
- **When a forward reference is worth keeping.** "Starting Day 9, that stops
  being hypothetical" was cut, but "we'll revisit this in two weeks: timers will
  hold pins high for exact durations (motor speed)" was kept and made *more*
  specific. Both point forward; only one survived.
- **Exclamation marks.** "Still stuck? We're here to help!" is the only one in
  the corpus. It is clearly deliberate and clearly not a general licence.

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

**No debrief slides.** An activity's takeaway belongs in the instructor's mouth or
in the next slide's content, not on a slide that restates the obvious conclusion.
Petra's verdict on the Day 7 set: *"Students will think I am making fun of them."*
Put the timing cue in a `presenterNote` instead. (This overrides the reviewer
guidance that every part needs a visible debrief.)

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

**Slides must stand alone (S-9).** This *reverses* earlier guidance, on Petra's
review of Day 7: the first version's slides were "way too thin". A slide is not a
set of cue cards for the instructor — it is what a student looks at while trying to
follow, and it has to carry the reasoning on its own, without the book open beside
it.

So bring the substance across from the book: the worked arithmetic, not just the
formula; *why* this register and where the constant comes from, not just the line of
code; the reason a step exists, not only the step. **Assume smart students who can
hold more than two lines in their heads.** Where the book explains something in a
paragraph, the slide gets the same explanation compressed — not deleted.

A complex diagram still gets its own image-dominant slide to talk over. The limit is
space, not principle: check that the slide actually fits (see below), and if it does
not, split it rather than thinning it.

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

**Check that a slide fits.** Content is free to be substantial but must not
overflow. Paste this in the browser console with the slide showing; it reports
every way a slide can be cut, not just the obvious one:

```js
// in the browser console, on the slide
(() => {
  const ref = document.querySelector('#ref');
  const b   = document.querySelector('#ref .ref-body');
  if (!ref || getComputedStyle(ref).display === 'none') return 'not a ref slide';
  const out = [];
  const shown = b && getComputedStyle(b).display !== 'none';
  // A hidden/background window suspends layout and every measurement reads 0,
  // which looks exactly like "fits". Refuse to answer instead of lying.
  if (shown && b.clientHeight === 0) return 'LAYOUT SUSPENDED — front the window, re-run';
  if (shown) {
    const dy = b.scrollHeight - b.clientHeight, dx = b.scrollWidth - b.clientWidth;
    if (dy > 2 || dx > 2) out.push(`body overflows ${dy}px down, ${dx}px across`);
  }
  // A <pre> scrolls INSIDE itself, so clipped code never shows up in .ref-body.
  document.querySelectorAll('#ref pre').forEach((p, i) => {
    const dx = p.scrollWidth - p.clientWidth, dy = p.scrollHeight - p.clientHeight;
    if (dx > 2) out.push(`code block ${i + 1}: ${dx}px CLIPPED across — line ends are cut off`);
    if (dy > 2) out.push(`code block ${i + 1}: ${dy}px clipped down`);
  });
  return out.length ? out : 'fits';
})()
```

**Give the player time to settle.** If you walk the whole deck in a loop, wait
~300 ms after setting `location.hash` before measuring. At 80 ms the check
reports large phantom overflows on slides that fit exactly — it is measuring
mid-layout, and a reload makes it worse. This is the one *false-positive* mode;
the three below are false negatives.

Five traps it exists to catch, all of which have produced a false "fits". The
last two are not measurable at all, and are the reason the rule is **look at
every slide that carries a figure**, not "run the snippet":

- **Suspended layout.** In a background or hidden window the browser stops
  computing layout, so every `clientHeight` reads 0 and the old one-line check
  returned `[0, 0]` for every slide regardless of content. Require
  `clientHeight > 0` or the numbers mean nothing; a `resize_window` call wakes it.
- **Image-dominant slides.** `#ref.figure-focus .ref-body` is `display: none`,
  so the body measures 0 there too — correctly, since there is nothing to
  overflow, but indistinguishable from a pass.
- **Clipped code.** A `<pre>` scrolls within itself, so a listing can lose a
  third of every line off the right edge while `.ref-body` reports no overflow
  at all. This is the one that hid for an entire voice pass; Day 8's
  `sl-day8-flag` was cutting the words the slide was making its point with.
- **A silently cropped figure.** On a stacked or two-column slide the bullets
  take the top and the figure is **cropped, not scaled**, into whatever height
  is left — so the four-layer diagram loses its top and bottom rows, three
  stacked timing tables show one, and **every overflow measurement reads zero**.
  The lever is the number of bullets; the image's `width=` attribute does
  nothing, because the player overrides it on slides. There is no measurement
  for this. Look at it.
- **An `.svg` with a `viewBox` but no `width`/`height`.** It has no intrinsic
  size, so the browser gives it the 300×150 replaced-element default and it
  projects tiny no matter how much room the slide has — Petra's *"that picture
  is so tiny that nobody can see it"*. Seven hand-authored figures shipped this
  way across four chapters. `scripts/check_rules.py` now errors on it (B-11a);
  the fix is to add both attributes matching the `viewBox`, which is a no-op on
  the drawing.

A code block that reports clipping is fixed by shortening the *comments* (the
code itself must not drift from the driver, B-6) or by giving the listing the
full width instead of a column.

**Never fix a crop by adding a slide.** Splitting a crowded slide is right when
both halves teach; a slide invented to absorb the overflow — Day 9x's "why `+`
goes to 3.3 V and not 5 V" — is a slide a student gets nothing from, and Petra
deletes it. Cut a bullet instead, or give the figure its own image-dominant
slide.

Instructor-only solution slides may overflow. Student-facing ones may not.

**Layout signals meaning:**
- *talking points + a supporting image* → two-column (bullets left, figure +
  instructive caption right).
- *the diagram/photo IS the point* (register diagrams, scope captures) →
  image-dominant, big, with just an instructive caption.
- *a TALL / portrait image* (a vertical screenshot, a menu + dialog) is lost on an
  image-dominant slide — it can only grow to ~72–80% of the slide *height*, which
  leaves it narrow and marooned in a wide frame. Give it a **two-column** slide
  instead (a few step bullets left, the image right): the half-width column suits the
  portrait aspect and the image reads large beside its steps. (Day 1x exclude-from-build.)
- *a WIDE image with a few talking points* → `<slide ref="fig" stack="yes">`:
  bullets span the full width on top, the figure sits full-width (large) below.
- *code or an activity* → full width.

Slide figures fill the space automatically (the book's small reading-page image
width is overridden), so you don't size them per slide.

**Solutions and instructor reminders are never student-facing.** Solution
listings are `"instructor": true`; how-to-solve-it hints are `<note>`s.

## Editing from the player

`./preview-slides.sh` serves the deck player with the authoring tools attached
(and a watcher that rebuilds on save). Hold **Alt** and everything a click could
reach outlines itself, in two colours that say where the write would land:

| Outline | What it is | Alt-click | Alt-shift-click |
|---|---|---|---|
| **green** | slide-owned text — a `<li>`, `<p>`, `<caption>` or `<note>` in a `<slide>` block | opens the block in your editor | edits it in place (⌘⏎ saves, Esc cancels) |
| **green** | a glue slide, or a `ref` slide's **title bar** (both are deck JSON) | opens `decks/<id>.json` at that entry | opens a form for its fields |
| **amber dashed** | real book content — an `<activity>`/`<task>` a deck refs by its own `xml:id` | opens it in your editor | **refused**, with a note saying why |

The amber case is the one to understand. A `ref` resolves either to a `<slide>`
block written for the projector, or **straight to book content**. Editing the
second would change the reading students do that night, not just the slide — so
the player refuses it rather than letting a slide tweak quietly rewrite the
chapter. Alt-click still opens it, and you can make the change deliberately in
your editor. (Currently 50 slides across the decks are this kind: 45 `act-*`
and 5 `task-*`.)

**Inline markup is protected.** Text inside `<c>`, `<em>`, `<term>` or `<clr>`
cannot be rewritten from the player: the write is refused per changed span, so
editing the prose *around* `<clr c="orange">A0</clr>` works and lands cleanly,
while editing "A0" itself is refused rather than guessed at. Colour spans and
code spans therefore can't be broken by accident.

**What a form can't reach.** A slide's `type`, `page`, `slide`, `instructor` and
`room` fields are deliberately not editable from the browser — the server's
allow-list drops them — so a form save can never retype a slide, repoint a ref,
or silently clear an instructor-only flag. Alt-click into the JSON for those.

**None of this exists in a deployed deck.** `assets/class.html` is one file
serving both, so the authoring layer gates itself twice at runtime: it returns
immediately unless the hostname is `localhost`/`127.0.0.1`, and even then wires
up nothing until the edit server at `:8927` answers a probe. On gh-pages both
gates fail, so there is no edit UI and no write endpoint to reach.

## Where things live

- `xsl/engs28-html.xsl` — the `<slide>` and `<clr>` elements (+ `deck.slides`
  strip/render param); `xsl/engs28-latex.xsl` strips `<slide>` from print.
- `assets/deck.css` — hides `.deck-slide` in the reading view.
- `assets/class.html` — the player, and the authoring layer at the end of it.
- `assets/decks/*.json` — the decks.
- `preview-slides.sh` — the authoring preview (player + edit server + watcher).
- `scripts/edit-server.py` — finds and rewrites the source behind a click:
  `/locate` + `/patch` for `<slide>` text, `/open-slide` for a block by
  `xml:id`, `/open-deck` + `/patch-deck` for the deck JSON.
