# Day 7 — Petra's review, pass 1

Her direct in-book edits plus a written list. Each item triaged as **one-off**
(fix and move on), **rule** (generalizes — added to `AUTHORING-book.md`), or
**committee** (a reviewer should have caught it — persona tuned).

| # | Item | Triage | Action |
|---|---|---|---|
| 1 | Fig 6.1.1 type too small — "carries to pretty much all figures" | **rule + committee** | New **B-11a**; `learner-visual` now checks projected legibility against the *rendered* figure |
| 2 | Sensors vary: bare / with AFE / fully digital | one-off | Paragraph added to 6.1.1, forward-pointing to the protocols chapters |
| 3 | Fig 6.1.2: `Dout` needs a subscript; no "pointy end" any more; "we use 12" | one-off ×3 | Real `<tspan>` subscripts on Dout and Vin; caption says left/right; "we start with 12, and you will change it later" |
| 4 | "most common arithmetic mistake with ADCs" — is that true? | **rule + committee** | Unsupported. New **B-11d**; rewritten to say why the slip is easy instead |
| 5 | Don't use "Work one through" | one-off | Fixed — including a second instance at line 194 she hadn't caught |
| 6 | Fig 6.1.4: Sample/Hold overflows; caption says "any width" (it's 12-bit); V_c repeated | one-off ×3 | Split onto two lines; caption corrected to 12-bit; duplicate clause dropped |
| 7 | 6.2.1 opening assumes context a reader arriving cold won't have | **rule + committee** | New **B-11b** (every subsection stands alone — PreTeXt chunks each to its own page); opener rewritten; "look back at…" plus after-class reassurance |
| 8 | Fig 6.2.1: white box + misaligned red boxes; no header row; no dash example | one-off | **Re-cropped from the datasheet PDF itself** (PyMuPDF) instead of the pptx raster — header with package variants, PF3/VREF+ dashes, PF2-NRST non-ADC wording; stops above PA0 so the activity isn't self-answering |
| 9 | "pot already seated across the centre channel" is invented | **rule + committee** | New **B-11c** (never invent physical/classroom facts); restored her original wording; `checker-technical-accuracy` now verifies physical claims and must mark them UNVERIFIED without a source. **Knock-on:** plan + deck had budgeted Part 3 on the false premise — corrected |
| 10 | Activity 6.2.3: (a) says four, (b)/(c) say three | one-off | Fixed (my own edit introduced the mismatch) |
| 11 | Part 4a: why PA4? | one-off | Deliberate — transfer not transcription. Rationale was in the plan but not the book; now stated in the text |
| 12 | Fig 6.2.5: caption names ADEN *and* ADSTART, only ADEN boxed | **committee** | Second box added at bit 2 (verified by rendering). `learner-visual` now checks caption-vs-image |
| 13 | American spelling | **rule + tooling** | New **L-7**, added to `check_rules.py`; 5 instances fixed book-wide |
| 14 | Fig 6.2.6: box missing around EOC | **committee** | Same as 12 — box added at bit 2 |
| 15 | `&= ~ADC_ISR_ADRDY`: writing 0 back wouldn't clear the flag either | one-off | Paragraph added — the line destroys other flags *and* fails at its own job |
| 16 | Insight 6.2.11: mention `rc_w0` | one-off | Added, with the point that the digit tells you which value clears |
| 17 | Activity 6.2.6(a): link the pinout and datasheet? | one-off | Yes — both linked |

## Committee changes made

- **`learner-visual`** — new emphasis: projected legibility (B-11a), and captions
  checked against the *rendered* image. Two rubric rows added.
- **`checker-technical-accuracy`** — two new verification duties: render figures
  before asserting what they contain (it had twice been wrong — reading `4096` as
  `4095`, and calling a 12-bit diagram generic), and treat physical/classroom
  claims as inventable (B-11c).

## Not covered by any reviewer

Items 2, 5, 15, 16, 17 are content and voice judgements no persona is positioned
to make — they need the instructor. That is the expected residue; the committee's
job is to make it small, not zero.

---

## Pass 2

| # | Item | Triage | Action |
|---|---|---|---|
| 18 | Fig 6.1.3 (divider) type too small | one-off under **B-11a** | Redrawn at 780×560 (was 560×420), body type 13→18 px, and page width raised 65%→82% |
| 19 | Fig 6.2.1 shows only non-ADC rows; red rectangles off | one-off | Rebuilt as a **4-band composite** with "rows skipped" marks: header, dash rows, non-ADC wording, and real `ADC_IN1/2/3` rows. PA0 still withheld |
| 20 | 6.2.3 opens on *how* before saying *what* | one-off | Lead paragraph added: they are building the test circuit they will measure all day |
| 21 | Figs 6.2.5 / 6.2.6 "still missing" the ADSTART / EOC box | **not a defect — stale browser cache** | Boxes verified present and correctly placed; stroke thickened 3.0→4.5 and all three build targets refreshed |

### Why the red rectangles were off (and how it was fixed for good)

I had been estimating column edges from the *text* extents of the header labels.
Extracting the table's own vector rules from the PDF
(`page.get_drawings()`) gives them exactly: **Pin name = x 174–223**,
**Additional functions = x 434–529**. My earlier guess of 449–551 for the second
column was ~15 pt off and too wide, which is what showed. Band boundaries are now
snapped to the table's horizontal rules too, so no row is cut in half.

### Note on verifying figures

MuPDF (`fitz`) renders SVG unfaithfully — it dropped `<line>` elements and filled
stroked paths on the divider figure. **Verify SVGs with `qlmanage`** (WebKit),
which is what a browser will show. MuPDF is fine for rasterizing PDF pages.

### Note on caching

Browsers do not re-fetch an image on an ordinary page reload, so a changed `.svg`
keeps showing the old version. After any figure change, hard-reload
(<kbd>⌘⇧R</kbd>). This has now cost two review cycles.

---

## Pass 3 — book fix + first slide review

| # | Item | Triage | Action |
|---|---|---|---|
| 22 | Fig 6.2.1 boxes skip the first row | one-off | Boxes now drawn **per band**, and the first band's pair starts at the thick header rule so PC14 is enclosed (8 segments total) |
| 23 | `(a)`/`(b)` labels clash with the item text | one-off (player CSS) | Task gutter 1.9em → 2.9em with a 0.4em gap and a fixed label width, in `assets/class.html` |
| 24 | **Slides are far too thin; they must stand alone** | **rule — reverses prior guidance** | New **S-9**. `AUTHORING-slides.md`'s "a slide poses, the instructor explains" is explicitly overturned; `expert-active-learning` now flags thin slides |
| 25 | Slide 6 caption still said "pointy end" after the book was fixed | **process** | New **Step 5b**: every book fix is cross-checked against the `<slide>` blocks that repeat it. The build cannot catch this — they are separate text |
| 26 | DEBRIEF slides are redundant / infantilizing | **rule + committee** | New **S-10**: no debrief slides. All 5 removed from Day 7; `expert-active-learning` had demanded them and is now corrected — takeaways go in `presenterNote` |
| 27 | "Wiring the pot" must show the circuit and say to build it | one-off | Slide now refs `fig-adc-test-circuit`, opens with **"Build this now"**, and gives the three connections |
| 28 | Register section arrives out of nowhere | one-off | New slide `sl-adc-registers-intro` — the five things `analogRead()` did invisibly, mapped to the five registers |
| 29 | Slide 20: why PA4? where does 11 come from? | one-off | Rewritten: all four MODER encodings, `GPIO_ANALOG` = 3 = `0b11`, clear-then-set, port-clock-vs-ADC-clock, and a note on why the example uses a different pin |
| 30 | Slide 36 says "shown in red" but shows nothing | one-off | New figure `fig-adc-rmw-damage` (three bit-cells, before/after for both idioms) + the missed-clear point, now in the book too |
| 31 | Slide 40: explain how 12 became 14 | one-off | 1.5 sampling clocks + 12.5 conversion clocks = 14, and 1.17 µs at 12 MHz |

### The big one

**S-9 reverses a founding assumption.** The original slide guidance said the slide
poses and the instructor explains. Petra's verdict on the result was "way too thin".
The corrected principle: a slide is what a *student* looks at while trying to
follow, so it must carry the reasoning without the book open — worked arithmetic,
not just the formula; why a register and where its constant came from, not just the
line of code. Where it will not fit, split the slide; never thin it.

All reworked slides were checked for overflow in the player
(`scrollHeight - clientHeight ≈ 0`): slides 7, 14, 17, 18, 25, 31, 33, 36 all fit.

### Committee correction

`expert-active-learning` asked for a debrief on every part; those became slides;
Petra rejected them as condescending. The reviewer is now explicitly told that a
landing is not a slide. **This is the first time a committee recommendation was
wrong and had to be reversed** — worth remembering when weighing its output.

## Pass 4 — second slide review

Slides 18, 20, 21, 22, 25, 36. All **one-offs** (clarity and terminology), no new
rules. Recurring theme worth noting for future chapters: *name the thing before
using a pronoun* — "this is the port's clock", "where you turn it on", "it is called
ADC1" all had unclear referents. Also: **say when an example is an example**, twice
over, because students will otherwise copy it verbatim.

Terminology now explicit on the slides: `ADC_CR` is *the control register*
(software → peripheral), `ADC_ISR` is *the interrupt and status register*
(peripheral → software), and `rs` means read-and-set-but-not-clear.

Slide 25 now carries the setup students actually have to do first: copy
TemplateProject → name it `ADCPot` → download the `ADCPot.c` skeleton from Canvas →
fill in the blanks. **Confirm the Canvas skeleton exists**; I asserted it because it
matches the Lab-1 pattern, and under B-11c that is exactly the kind of classroom
fact I should not invent.

**Unresolved:** the half cycle in "12.5 clocks". RM0490 gives t_CONV = t_SMPL + 12.5
for 12-bit but does not say what the half cycle is for. The slide now attributes it
to latching the result into `ADC_DR` — **plausible but unsourced**. Either confirm
it or let me soften it to "12.5 cycles, as specified".

---

## Resolutions (2026-07-27)

- **ADVREGEN / calibration — RESOLVED, not an issue.** Petra ran `pa0_adc_init()`
  exactly as written — no `ADVREGEN`, no `ADCAL` — and it works. `ADRDY` is
  reachable without enabling the regulator explicitly. The chapter's three-step
  enable sequence is correct as it stands, and Lab 4 keeps calibration as its own
  exercise. This was `checker-technical-accuracy`'s and `expert-rigor-hawk`'s
  headline MAJOR; it was a reasonable flag from the reference manual, but the
  silicon disagrees. **Do not re-raise at a later gate.**
- **The half cycle in "12.5 clocks" — ACCEPTED as written.** Petra is content with
  attributing it to the converter latching the result into `ADC_DR`. It remains
  unsourced in RM0490; recorded so it is not re-flagged.
- **`ADC_CHSELR_CHSEL18` — still open.** See below.
- **`ADC_CHSELR_CHSEL18` — RESOLVED 2026-07-27.** Petra confirms the CMSIS header
  `#define`s it, and that `ADC_IN18` is indeed PB1. The homework instructor
  solution ("Solution — A3 chain and 10-bit prediction") compiles as written; no
  `(1UL << 18)` fallback needed. This closes both of
  `checker-technical-accuracy`'s UNVERIFIED items on the A3 chain.
- **Remaining open:** only the Canvas `ADCPot.c` skeleton referenced by the
  "Before you write anything" slide.
- **Canvas `ADCPot.c` skeleton — RESOLVED 2026-07-27.** Petra will create it and
  post it to Canvas. The "Before you write anything" slide is accurate as written.

**Day 7 has no open items.** All four review passes are closed.
