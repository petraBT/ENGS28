# Day 12 — Gate 3′, figure/caption correspondence

Scope: every figure and table in `<section xml:id="sec-motors-day12">`
(source/ch-motors.ptx ≈ 2542–3760), their captions, the `<slide>` blocks that
ref them, and the deck titles in `assets/decks/day12.json`. Day 11 / 11x figures
were opened only where a Day 12 caption points at them.

### Verdict: MAJOR

Four caption-level correspondence failures, none of which is a wrong value over
a picture, and all of which are one-sentence fixes except the two that need an
export only Petra can make. The figure the brief flagged —
`fig-day12-wiring-annotated.png` — is **substantially accurate**: I traced every
wire in it and every colour, node and annotation the caption names is really
there, with two exceptions noted below. Legibility on the wall **passes** against
her own recorded verdicts; the numbers are in the Legibility section.

---

### Figures opened

Rendered with PyMuPDF at 3× (SVGs), `Read` directly (bitmaps), and — for the
projected sizes — headless Chrome against the live player at 1600×900,
`http://127.0.0.1:8352/external/class.html?deck=day12#N`. Slides 8, 9, 11, 12,
16, 18, 25, 30, 31, 32 were screenshotted and read. What each figure actually
contains, before reading its caption:

- **fig-day12-wiring** (`fig-day12-wiring-annotated.png`, 2289×1790, her export
  of today) — Fritzing breadboard. Nucleo top right; three signal wires
  (orange, green, brown) from `PWM/MOSI/D11`, `MISO/D12`, `SCK/D13` plus a black
  one from `GND`; a dark-red wire from `3V3` into the top rail's lower (+) row.
  One axial resistor at column 13, upper leg in that + row, lower leg in row I.
  A photointerrupter board bottom left with silkscreen `OUT / GND / VCC` and,
  respectively, an **orange, a black and a blue** wire. Orange ends at row F
  col 13 and goes nowhere else; black ends in the bottom rail's ground row;
  blue runs up and then right along row I to col 61, where a short blue jumper
  in row J carries it to col 58 — the TB6612's **VM** column. TB6612 with
  `Vcc` jumpered red to the + rail and `GND` black to the − rail; motor on
  MOTORA; regulator board and barrel jack at the far right with its `5V`,
  `GND`, `Vin` pads (both J2 and J4) **empty**. Annotations: orange box top
  left, two paragraphs, orange arrow down-right to the signal wire; "~10 KΩ
  pullup" at mid-left with a thin blue arrow to the resistor; blue box bottom
  right, "The photointerrupter needs a 5V voltage supply.", long blue arrow up
  to the sensor's power wire in row I.
- **fig-photointerrupter-states** (svg) — two panels. Left "A slot is in front
  of the beam": orange beam with an arrowhead crossing a clear rim window into
  an NPN, collector at `OUT`, 10 kΩ to `3.3 V`, emitter grounded, red legend
  "the transistor conducts, and OUT is pulled down". Right "A spoke blocks the
  beam": beam drawn dashed grey, dark spoke in the rim, blue legend "the
  transistor is off, and the resistor holds OUT up". Labels `LED`, `wheel rim`,
  `phototransistor`, `OUT`, `10 kΩ`, `3.3 V`.
- **fig-three-rates** (svg) — "One second of the main loop". Four rows: blue
  "every pass / look for an edge" (~30 ticks); olive "every 10 ms / read the
  knob" (**9** ticks); green "once a second / count → rpm → display" (2 ticks,
  the ends); dark-red "the pulses / arrive when they arrive", a regular square
  wave of 13 cycles.
- **fig-deadband** (svg) — one horizontal bar: blue "counter-clockwise" band,
  grey band, red "clockwise" band. Above: `0 V / 0`, `1.65 V / 2048`,
  `3.3 V / 4095`. Below the grey band: "dead band / motor stopped".
- **fig-day12-lab6-build** (svg, Fritzing export) — same board plus a
  0.56" HT16K33 seven-segment backpack at left, a potentiometer whose wiper
  runs to the sixth `AIN` socket (`A0`), SDA blue / SCL yellow, the sensor's
  green `OUT` wire plugged into the socket labelled **D7**, motor on MOTORA,
  regulator at the right with `5V / GND / Vin` **empty**, **no pull-up
  resistor anywhere**, and a "fritzing" watermark bottom right.
- **fig-day12-cabled-sensor** (jpg, 970×728) — a photointerrupter body on a
  coiled four-core cable, stripped ends at the right: **blue, brown, pale pink,
  black**. No silkscreen visible.
- **fig-photointerrupter-beam** (svg; defined in the reading, ref'd by the
  in-class slide `sl-day12-wheel-recall`) — slotted wheel with **exactly 20
  slots** (counted in the source: 20 slot paths), photointerrupter straddling
  the rim, orange `beam` with a leader arrow, rotation arc, and at the right
  "the sensor's output, as the wheel turns" over five square-wave cycles with a
  double-headed bracket "one slot goes by".
- **rpm-formula** (svg) — `RPM = 60 × PPS / N`.
- **table-day12-diagnostics** — 4 rows, all four render on the slide.
- **table-day12-build-order** — 7 rows, all seven render on the slide.
- **table-day12-deadband** — 3 rows; book only (its slide is parked and no deck
  entry refs it).
- Opened for cross-reference only: **fig-tb6612-wiring-2**
  (`Day11-Motors/tb6612-wiring-exercise2.png`) and the unreferenced
  `tb6612-wiring-exercise1.png`, because the Day 12 caption redirects to the
  first of them.
- Opened because it is still in the folder: **fig-day12-wiring.svg**, the
  orphan. See "Orphan" below.

---

### Correspondence failures

- **[MAJOR] fig-day12-wiring** — text says: *"its power is the regulator's 5 V,
  the same node that feeds the driver's `VM` pin, **which is what the blue
  callout says**."* — image shows: the blue callout says only **"The
  photointerrupter needs a 5V voltage supply."** It names neither the regulator
  nor `VM`, and its arrow points at the sensor's power wire in row I, not at the
  regulator and not at `VM`. The substance of the caption is correct — I traced
  the blue wire from `VCC` along row I to col 61 and the row-J jumper from col 61
  to col 58, which is `VM`'s column — but the attribution is not.
  — fix: re-caption. *"…the same node that feeds the driver's `VM` pin; the blue
  callout says why it has to be 5 V."*

- **[MAJOR] fig-day12-wiring** — text says: *"its 5 V, GND and Vin pads are drawn
  with nothing on them — trace that connection on your own board rather than off
  this picture (**`fig-tb6612-wiring-2` is where you wired it**)."* — image
  shows: I opened `fig-tb6612-wiring-2` and its regulator's `5V / GND / Vin` pads
  are **equally empty**; so are `tb6612-wiring-exercise1.png`'s. No figure
  anywhere in ch-motors draws how the regulator's 5 V reaches the `VM` node. The
  redirect sends a student to a second picture with the identical hole, which is
  worse than admitting the hole once.
  — fix: either drop the parenthetical redirect and say plainly that the
  connection is not drawn in any of these pictures, **or ask Petra for one export
  with the regulator's 5 V and GND wired** — that single export would close this
  and the next finding together. Do not patch it: this is her drawing (P-12).

- **[MAJOR] fig-day12-lab6-build** — text says: *"The regulator board on the
  right supplies 5 V, which powers the motor through the TB6612 and the
  photointerrupter, and nothing else."* — image shows: the regulator sits beside
  the board with `5V`, `GND` and `Vin` unwired (holes under it are drawn
  unconnected), so the sentence describes a path that is not in the picture, and
  unlike `fig-day12-wiring`'s caption this one does not say so. The source
  comment at line 2643 already records this defect — *"Same defect as her slide
  10"* — but the acknowledgment was only written into one of the two captions.
  The slide note compounds it: *"Point at the four blocks and the two supplies."*
  — fix: propagate the same honest sentence into this caption, or the export
  above. This is the figure students will wire Lab 6 from.

- **[MAJOR] sl-day12-lab6-build / fig-day12-lab6-build** — the earlier figure and
  the whole pull-up argument put a 10 kΩ resistor on the sensor's output; **this
  drawing has no resistor at all** and runs `OUT` straight into D7. That is a
  legitimate choice — it is the internal-`PUPDR` option the book offers two
  screens earlier — but neither the caption nor the slide says so, and row 1 of
  `table-day12-diagnostics` is exactly the failure a student gets if they build
  from this picture and skip `PUPDR`.
  — fix: one caption clause — *"the external pull-up is gone here: the pin's own
  internal pull-up does that job"* — and one word on the slide.

- **[MAJOR] deck slide 32, `sl-day12-deadband`** — deck title says: **"The knob,
  the dead band, and the PWM value"** — image shows: knob positions, volts, ADC
  counts and the dead band. **No PWM value anywhere** — not in the figure, not in
  the single bullet, not in the caption. The presenter note is explicit that the
  mapping onto 0–1249 of PWM is deliberately left for the students, so the title
  advertises the one thing the slide withholds. Graded as a slide seen alone,
  a student reads the title and hunts for a number that is not on the wall.
  — fix: retitle in `assets/decks/day12.json` — "The knob and the dead band".

- **[MINOR] fig-three-rates** — text says: *"drawn over one second … reads the
  potentiometer every 10 ms"*, and slide 25's first bullet says *"sample the
  potentiometer 100 times a second"* — image shows **9** tick marks on the
  10 ms row (and ~30 on the "every pass" row) across a span labelled "One second
  of the main loop". The figure is schematic and its job — relative ordering, and
  pulses that line up with nothing — is done well, but "drawn over one second"
  invites the count, and on slide 25 the bullet's "100 times a second" and the
  picture's nine marks are in the same frame.
  — fix: caption clause — *"the marks are schematic; 10 ms would be a hundred of
  them"* — or say "not to scale" in the figure's own title line.

- **[MINOR] fig-three-rates, caption trim** — checked as asked. *"The three rates
  the Lab 6 program has to keep, drawn over one second. The loop looks for an
  edge on every pass, reads the potentiometer every 10 ms, and converts the count
  to rpm once a second. The pulses along the bottom arrive when the shaft brings a
  slot around, which lines up with none of the three."* This **stands on its own**:
  it names all four rows in the drawing's own order and states the one thing the
  picture is for. The dropped clause was an inference, not a description. No
  action.

- **[MINOR] fig-day12-lab6-build, caption trim** — also stands on its own. *"The
  complete Lab 6 system … Working from the left: the seven-segment display on the
  I2C bus, the potentiometer feeding A0, the TB6612 with the motor on its A
  channel, and the photointerrupter at the bottom left with its output going to
  D7."* Every one of those four locations is verifiable in the picture and I
  verified all four: display leftmost, pot next, motor wires in the two columns
  under the `MOTORA` pads, sensor `OUT` in the socket labelled `D7`, wiper in the
  sixth `AIN` socket = `A0`. The dropped sentence was a claim about the reader's
  history, not about the picture. No action.

- **[MINOR] fig-photointerrupter-states, the new sourced paragraph** — checked as
  asked. It does **not** do the picture's job: the picture carries the two states
  and the pull-up argument, and the paragraph carries provenance only. Both its
  facts check out against the PDF — `NPN open collector: 5 to 24 VDC, 100 mA max.`
  and `Supply voltage 5 to 24 VDC ±10%`, page 3, *Ratings and Specifications* —
  and `external/datasheets/ee-sx67.pdf` resolves in the build. The drawn NPN with
  its collector at `OUT` is what "open collector" means, so the quote and the
  drawing agree. One caveat: the caption's *"With no resistor there, nothing
  holds the line up"* sits mid-caption and there is **no third panel** for it; it
  reads as a claim about the circuit rather than about the picture, which is fine,
  but if a reader goes looking for a no-resistor panel they will not find one.
  No action required.

- **[MINOR] fig-photointerrupter-beam** on slide 16 — the label
  `phototransistor` is drawn over the wheel's rim outline and one slot, and its
  first letter nearly touches the sensor body. Readable, but it is a label on top
  of the artwork, and neither `LED` nor `phototransistor` has a leader line while
  `beam` does.
  — fix: nudge the label right to clear the rim, or give both a short leader.
  Worth noting because this figure is **shared**: it is defined in the pre-class
  reading and re-used by `sl-day12-wheel-recall`, so any edit lands in both.

- **[MINOR] fig-day12-lab6-build** — the "fritzing" watermark renders on the
  projected slide, bottom right of the artwork.
  — fix: drop the text node from the SVG, or crop.

- **[note, not a defect] fig-day12-wiring, everything else in the caption is
  true.** I checked it sentence by sentence and traced the wires: "orange is the
  output, black is ground and blue is power" ✓ (the silkscreen reads
  `OUT / GND / VCC` left to right and the three wires are in that order);
  "a 10 kΩ resistor from that row up to 3.3 V (the thin blue arrow)" ✓ — the
  resistor's upper leg and the Nucleo's `3V3` wire land in the **same** rail row,
  and the thin blue arrow is present and lands on the resistor; "Put the
  oscilloscope on that same row, which is not drawn" ✓ nothing drawn; "The signal
  wire stops there, and the orange callout says why" ✓ the orange box says
  *"Don't wire the signal wire into the Nucleo yet. We'll observe its signal with
  the oscilloscope."*; "the regulator board and its barrel jack are at the right"
  ✓; "its 5 V, GND and Vin pads are drawn with nothing on them" ✓ verified at 8×
  on both headers; "The TB6612, the motor and the three signal wires from PA5
  (D13), PA6 (D12) and PA7 (D11) are unchanged" ✓ — three signal wires plus a
  ground wire, at D11/D12/D13/GND, identical to `fig-tb6612-wiring-2`;
  "Wednesday's circuit with the photointerrupter and one resistor added" ✓ —
  exactly one resistor in the drawing, and the only other change from
  Wednesday's is the row-J jumper that brings the sensor's power wire onto the
  `VM` node. The **slide** caption, *"Everything but the sensor and one resistor
  is what you wired on Wednesday,"* is true and adds information the picture
  cannot carry (when it was wired), so it earns its place on an image-dominant
  slide rather than restating the image.

- **[note] fig-day12-cabled-sensor** — all four colours the caption and the five
  bullets name are in the photograph: brown, blue, black and pink. ✓

- **[note] fig-photointerrupter-beam** — the drawn wheel has **20** slots, which
  is the count `inst-day12-pulses-to-rpm` gives for the kit and the number Lab 6's
  expression uses. The figure an activity depends on still carries the feature the
  activity needs. ✓

- **[note] Orphan in the image folder.** `fig-day12-wiring.svg` (868 KB) is no
  longer referenced (the source comment keeps it "for reference"). I rendered it:
  it has **no regulator and no barrel jack at all** — its viewBox
  (`360 40 2240 2020`) crops them off — and its callout **text is gone**, leaving
  a bare orange leader line and a bare blue leader line running off the left edge
  to nothing. It is one `<image source>` typo away from shipping a figure whose
  caption sentence *"The regulator board and its barrel jack are at the right"*
  would be false. Move it out of `assets/images/` or delete it.

---

### Notation mismatches

- **fig-day12-wiring** — figure prints `~10 KΩ pullup` / text writes `10 kΩ` and
  `pull-up` — change: **neither**. The value agrees, it is her own drawing, and
  the caption already gives the canonical form beside it. Recorded so it is not
  re-raised.
- **fig-day12-wiring, fig-day12-lab6-build** — figure silkscreens the sensor's
  pins `OUT / GND / VCC`; the prose and caption say "output", "ground", "power"
  and never name the three marks a student will read off the part — change: the
  **caption**, one parenthesis: *"(the board marks them OUT, GND and VCC)"*. The
  cabled-sensor caption already does this job for the cable variant.
- **rpm-formula** — figure prints `RPM`; the prose and
  `table-day12-build-order` use lowercase `rpm` — change: **neither**; `RPM` is a
  variable in a display equation and `rpm` is a unit in prose. Recorded only.
- **fig-three-rates** — figure says "read the knob"; the slide bullet says
  "sample the potentiometer" — change: neither, they are the same object and both
  forms are used deliberately elsewhere.

---

### Legibility

Measured, not estimated: image height in the player screenshot, glyph heights
measured on the source pixels, expressed as % of the 900-px stage so they compare
directly against the `AUTHORING-visual.md` scale (bullet 3.1 %, body 3.0 %, table
cell 2.7 %, caption 2.1 %) and against her own recorded verdicts (wiring-1 yellow
annotations **1.9 % accepted**; truth-table body **2.2 %, "projects
beautifully"**; wiring-2 pin silkscreen **0.5 %, rejected**).

- **fig-day12-wiring** on `sl-day12-wiring` (figure-focus, `max-height: 72cqh`,
  renders 648 px tall, scale 0.362) — smallest type, by class:
  callout body **58 px → 21 px → 2.3 %**; `~10 KΩ pullup` **46 px → 16.6 px →
  1.85 %**; Nucleo silkscreen ≈ 9 px → ≈ 3 px → **0.35 %**.
  **Verdict: readable, and I am not going to call it a defect.** Her callouts
  land *above* the 1.9 % she has already accepted on the Day 11 wiring figure and
  above the 2.2 % she called "projects beautifully"; the pull-up label sits
  exactly at that accepted 1.9 %. The silkscreen is absent rather than small, but
  nothing on this slide asks for it — the title, the caption and the presenter
  note all stay away from pin names, and the note says so explicitly.
  **If she still wants it bigger, the lever is not a re-export at this framing**
  (the brief is right that the height cap binds on any ~4:3 drawing; the image
  renders 820 px wide in a 1600 px stage, so there is width to spare and none of
  it is reachable). Two levers that do work, in order of cost:
  1. the cap itself. The practical ceiling on this slide is the space between the
     title band and the caption line, ≈ 705 px, i.e. ~78cqh. Raising
     `#ref.figure-focus .ref-media img { max-height: 72cqh }` (assets/class.html
     line 107) to 78cqh buys ~9 %: callouts to 2.5 %, the pull-up label to 2.0 %.
     Dropping the slide's caption line buys a little more. That is a player
     change, not a figure change.
  2. **ask Petra for a second, graded export**: the same drawing cropped to the
     sensor half — sensor, resistor, signal row, both callouts — as its own
     slide, with the full drawing kept for the book. That roughly doubles the
     callout type and is the only route to a comfortable margin. Two slides, not
     one replacement (P-12).
- **fig-three-rates** on `sl-day12-three-rates` (stacked, 3 bullets) — the figure
  is not cropped, but it is squeezed: the row sub-labels "look for an edge",
  "read the knob", "count → rpm → display", "arrive when they arrive" measure
  ≈ 16 px → **1.8 %**, the smallest load-bearing type anywhere in the deck, and
  they are load-bearing — they are what each row *is*.
  — fix: **bigger figure, not smaller text**. Drop bullet 3 ("In Lab 6 you are
  told not to use `delay_ms()`…"), which slide 26 `sl-day12-milliseconds` covers
  in full anyway; the reclaimed height goes straight into the figure.
- **fig-photointerrupter-states** on slide 12 — smallest is `wheel rim` /
  `phototransistor` at ≈ 19 px → **2.1 %**; panel titles and the two coloured
  legends 2.5–3.0 %. Pass. This is the best-projecting figure in the day.
- **fig-deadband** on slide 32 — smallest is the grey `1.65 V` row at ≈ 24 px →
  **2.7 %**. Pass, with room to spare (the figure uses about a third of the
  available height; widening it would only make an already-legible figure larger).
- **fig-photointerrupter-beam** on slide 16 — smallest is "one slot goes by" at
  ≈ 24 px → **2.7 %**. Pass.
- **rpm-formula** on slide 18 at `width="30%"` — glyphs ≈ 44 px → **4.9 %**,
  inside the 4–5 % band `AUTHORING-visual.md` sets for a display equation. Pass.
- **fig-day12-lab6-build** on slide 30 — every piece of type in it is Fritzing
  silkscreen at ≤ 0.5 %. Its job is the block layout and the two supplies, and
  at 650 px the five blocks are individually identifiable, so it passes **for
  that job**; the presenter note already forbids reading pin names off it and
  routes them to the build-order slide as text, which is the right resolution.
- **fig-day12-cabled-sensor** on slide 9 (stacked under 5 bullets) — the photo
  renders ≈ 520×390 and the stripped wire ends are ≈ 4 px wide; brown, pink and
  black are hard to separate at the back. Acceptable, because the five bullets
  carry the whole content and the slide only runs if someone is holding the part.
  If she wants the picture to work on the wall, the ask is a **close-up crop of
  the wire ends**, not a bigger version of this frame.
- **Table `<title>` on slides 11 and 31** — the table's own title line renders
  ≈ 14 px → **≈ 1.5 %**, i.e. *below* caption size (2.1 %), which Petra has twice
  called too small to read on a projector. That matters for
  `sl-day12-diagnostics`, whose presenter note deliberately drops the slide
  caption on the grounds that *"the table's own title carries the caption's
  job"* — at 1.5 % it does not carry it on a wall. Table bodies themselves are
  fine at ≈ 2.3 %, and all rows of both tables render (4 of 4, 7 of 7).
  — fix: on `sl-day12-diagnostics`, either restore a one-line `<caption>` or fold
  the point into the deck title; on `sl-day12-build-order` the table title merely
  duplicates the deck title, so it costs nothing.
- **B-11a** — all seven hand-authored SVGs in `Day12-Motors(3)` carry `width` and
  `height` matching their `viewBox`. `check_rules.py --quiet source/ch-motors.ptx`
  → 0 errors, 0 warnings; `check_deck.py assets/decks/day12.json` → 40 slides,
  30 refs, 0 problems. The linter was run.

---

### Look before shipping (crop candidates — checked, not defects)

I screenshotted all of these in the player rather than leaving them as
candidates, so this is a record of what I saw, not a list of unknowns:

- `sl-day12-cabled-sensor` — 5 bullets + jpg, `stack="yes"` — **fits**, image
  small (see Legibility).
- `sl-day12-three-rates` — 3 bullets + svg, `stack="yes"` — **fits**, figure
  squeezed and its sub-labels are the smallest type in the deck.
- `sl-day12-deadband` — 1 bullet + svg, `stack="yes"` — **fits** with about a
  third of the stage unused.
- `sl-day12-wiring`, `sl-day12-lab6-build` — figure-focus, no bullets —
  **fit**, both height-capped at 72cqh with ~780 px of unused stage width.
- `sl-day12-rpm` — `room="yes"`, inline image + 2 bullets — **fits**.
- `sl-day12-diagnostics` (4 rows), `sl-day12-build-order` (7 rows) — **all rows
  render**.
- Aspect-ratio outliers worth re-checking after any change: the two Fritzing
  figures are ≈ 1.28:1 against a 1.78:1 stage, which is what makes the height cap
  bind; `fig-deadband` is 4.1:1, which is what leaves slide 32 two-thirds empty.

### Shared figures

No image in `assets/images/Day12-Motors(3)/` is referenced from any chapter other
than `ch-motors.ptx`. Inside the chapter, **`fig-photointerrupter-beam` is used
twice** — defined in the Day 12 pre-class reading and re-projected by
`sl-day12-wheel-recall` — and `fig-day12-sensor-parts` (a `<sidebyside>` of
`fig-day12-sensor-body.jpg` and `fig-day12-encoder-wheels.jpg`, the sanctioned
two-view form) is reading-only. A re-crop of the beam figure to fix the
`phototransistor` label would land on the slide too; re-render and re-read it
there if it is touched. `fig-day12-wiring`'s caption depends on
`fig-tb6612-wiring-2` in Day 11x, which is the coupling behind the second MAJOR
above.
