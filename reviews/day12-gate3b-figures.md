# Gate 3″ — Day 12, figures pass (checker-figures)

Scope: `sec-speed-before-class`, `sec-motors-day12`, `sec-motors-reference` in
`source/ch-motors.ptx`. Every figure below was rasterized and looked at; the SVGs
were rendered twice (PyMuPDF at 3× and headless Chrome at 2×, because PyMuPDF
drops SVG markers and would have made me report two missing arrowheads that are
in fact drawn).

## Verdict: MINOR

No caption, slide caption or slide title sends a student to something that is not
in the image. Every number, pin, label and net that a Day 12 caption names is
present and correct in the picture — I traced the breadboard nets hole by hole at
6× to check them. The four findings below are two clauses to delete and two asset
requests. Nothing here blocks.

**On the cut.** Day 12 captions now run 41–90 words, mean 66. Passed Day 11 runs
9–162, mean 71. Day 12 is at or below the standard beside it. **I am asking for no
words back anywhere**, and two of my findings take words out.

## Figures opened

| id | rendered | what is actually in it |
| --- | --- | --- |
| `fig-day12-sensor-parts` | JPEG ×2 direct | L: a black U-body photointerrupter, `EE-SX672 2530` legible on the flank, slot open toward the camera. R: two black slotted wheels, diamond hub bore, on gray. |
| `fig-photointerrupter-beam` | SVG → Chrome 2× | Slotted wheel (**20 slots**, counted in the path data), a dark U-body straddling the rim, orange arrow labeled `beam`, `LED` / `phototransistor` / `slotted wheel on the motor shaft`; clockwise rotation arc. Right: five square pulses, and a double-headed measure bar spanning **exactly one period** (540→644 = one 104-unit cycle) labeled `one slot goes by`. |
| `fig-rpm-formula` | SVG → Chrome 2× | `RPM = (60 × PPS) / N`, nothing else. |
| `fig-day12-wiring` | PNG direct + 6× crops | Petra's Fritzing drawing: Nucleo, breadboard, TB6612, TT motor, regulator + barrel jack, sensor module (`OUT`/`GND`/`VCC` silkscreened), one axial resistor. Her three annotations: the orange "Don't wire the signal wire into the Nucleo yet" box, the blue `~10 KΩ pullup` arrow, the blue "The photointerrupter needs a 5V voltage supply" box. |
| `fig-photointerrupter-states` | SVG → Chrome 2× | Two panels, `A slot is in front of the beam` / `A spoke blocks the beam`. Each: `3.3 V` rail, `10 kΩ`, node `OUT`, NPN phototransistor to ground, `wheel rim`, `LED`. Left beam solid orange into the base; right beam gray and broken at a filled rim segment. Red / blue conclusions underneath. |
| `fig-three-rates` | SVG → Chrome 2× | `One second of the main loop`. Four lanes: `every pass / look for an edge` (41 ticks), `every 10 ms / read the knob` (9 ticks), `once a second / count → rpm → display` (2 ticks), `the pulses / arrive when they arrive` (13 square pulses). |
| `fig-day12-lab6-build` | SVG (a wrapper around one 2048 px PNG) → Chrome, + 4× crops | Same board plus the HT16K33 seven-segment backpack, a panel pot, and the sensor. No pull-up resistor anywhere. |
| `fig-deadband` | SVG → Chrome 2× | One bar: `counter-clockwise` (blue) / gray `dead band` / `clockwise` (red); ticks `0 V / 0`, `1.65 V / 2048`, `3.3 V / 4095`; sublabel `motor stopped`. |
| `fig-day12-cabled-sensor` | JPEG direct + 6× crop | The same EE-SX672 body on a coil of black cable; four cores fanned out at the right end — blue, tan-brown, pink, black. |

### Nets I actually traced (so the next pass does not have to)

`fig-day12-wiring`: sensor `VCC` (blue) → row I col 61 → light-blue jumper col 61→col 58 → the TB6612's `VM` pad. **The caption's "the same node that feeds the driver's `VM` pin" is true in the drawing.** Sensor `OUT` (orange) → F14; resistor F–J col 14 → the `+` rail; Nucleo `3V3` → same `+` rail. **"a row of its own, with the 10 kΩ pull-up from that row to 3.3 V" is true.** TB6612 `Vcc` col 57 → `+` rail, `GND` col 56 → `−` rail.

`fig-day12-lab6-build`: sensor `OUT` (green) → **`D7`**, confirmed on the silkscreen at 4×, with **no resistor and no rail connection** — consistent with the caption's internal-pull-up sentence. Pot wiper col 41 → **`A0`** (the unlabeled sixth pin of the `AIN` block, the one nearest `POWER`; ordering is unambiguous). Display `+ − D C` → cols 28/29/30/31 = `+`rail / `−`rail / **`SDA`** / **`SCL`**. Motor → both `MOTORA` pads. `3V3` → `+` rail. Sensor `VCC` → the `VM` node again.

Wire colours in `fig-day12-cabled-sensor` check against `assets/datasheets/ee-sx67.pdf` p. 7, EE-SX672-WR *Terminal Arrangement*: Brown Vcc / Pink L / Blue GND(0 V) / Black OUTPUT. The caption is right on all four.

## Correspondence failures

**F1 — MINOR — `fig-day12-wiring`, `source/ch-motors.ptx:2674`.**
Text says: *"…and the oscilloscope goes on that same row."* Image shows: no scope,
no probe, no lead anywhere in the drawing. The clause is an instruction wearing a
caption's clothes, and the body paragraph two above it and
`task-day12-wire` both already give it.

- DELETE: `, and the oscilloscope goes on that same row`
- DISPLACES: itself.
- NET: −9 words.

**F2 — MINOR — `fig-day12-lab6-build`, `source/ch-motors.ptx:3362–3364`.**
Text says: *"The sensor is drawn here with the pin's own internal pull-up enabled
rather than the external resistor."* This is the caption saying what is **absent**
from the drawing — the form she struck out — and `subsec-motors-ref-speed`
already says it (*"`fig-day12-lab6-build` draws the finished build with the
internal one instead, once that probe is gone"*). The information is worth
keeping in one clause, because the reader has just seen the resistor in
`fig-day12-wiring`; say it positively instead.

- ADD: `Here the pull-up is the pin's own internal one (<xref ref="subsec-motors-ref-speed"/>).`
- DISPLACES: `The sensor is drawn here with the pin's own internal pull-up enabled rather than the external resistor.`
- NET: −11 words.

## Notation mismatches

- `fig-day12-wiring` — text: `10 kΩ` / figure: `~10 KΩ pullup` (capital K, and a
  tilde). Petra drew it. **Change nothing** in either place; recorded so it is not
  raised again.
- No other mismatch. `OUT`, `VM`, `Vcc`, `GND`, `SDA`, `SCL`, `D7`, `A0`,
  `3.3 V`, `10 kΩ`, `2048`, `4095`, `spoke`, `wheel rim`, `dead band` all agree
  between the prose and the drawings.

## Legibility

**L1 — MINOR — `fig-day12-lab6-build`.** Smallest type is the Nucleo silkscreen
(`D7`, `SDA`, `A0`, `3V3`): about 14 px in a 2084 px-wide figure, i.e. 0.67 % of
figure width. In the book at `width="94%"` of a 6.5 in text block that is roughly
**2.6 pt**. On a 16:9 stage the figure's 1.06 aspect makes it height-limited to
about 1030 px wide, so the labels land at about **7 px** — unreadable from the
back of a room. The caption names `D7` and `A0`; both are true but neither is
checkable off the picture. **Nothing is lost**: `table-day12-build-order` carries
"The photointerrupter on D7 (PA15)" and "The potentiometer on A0 (PA0)" as text,
and `sl-day12-lab6-build`'s note already forbids reading pins off it. If she wants
them readable the fix is **a bigger figure or a zoomed inset of the two headers —
an asset request, not smaller text and not a caption change**. No words either way.

**L2 — MINOR — `fig-day12-cabled-sensor`. Ask Petra for a crop, or crop the JPEG.**
The four coloured cores occupy roughly **5 % of the frame** (about x 690–970,
y 290–420 of 970×728); the other 95 % is a coil of black cable that carries no
information. The book caption and *all five bullets* of `sl-day12-cabled-sensor`
turn on telling brown from pink from blue from black, and on a `stack="yes"` slide
with five bullets the photo gets whatever height is left. At 6× the four colours
are unmistakable; at slide size they will not be. A crop of the fanned ends —
same photo, no retouching — fixes it in one step and makes the figure smaller, not
the type. The whole-cable view does no job the caption asks for.

**L3 — MINOR, cosmetic, only if the figure is re-exported — `fig-three-rates`.**
Lane baselines are 130 / 240 / 350 / 430: the last gap is 80 where the others are
110, and the pulse train rises 46 above its baseline, so `the pulses` reads as a
sub-lane of `once a second` rather than as the fourth peer. Nothing collides and
nothing is unreadable. If it is touched: baseline 460, `viewBox`/`height` 510.

Everything else is comfortably legible. Smallest type in the hand-authored SVGs is
22 px in an ~1100-wide viewBox (≈ 2 %), which is ~9 pt in print and ~29 px on the
wall. **B-11a: every Day 12 SVG carries both `width` and `height` matching its
`viewBox`; `check_rules.py --quiet source/ch-motors.ptx` returns 0 errors,
0 warnings.**

## Look before shipping (crop candidates, not defects)

Per `AUTHORING-slides.md`, these need the player, not a measurement:

- `sl-day12-cabled-sensor` — **5 bullets + `fig-day12-cabled-sensor`, `stack="yes"`.**
  The worst of the five: most bullets on the deck, and the payload of the photo is
  5 % of its own frame. See L2.
- `sl-day12-predict-trace` — 3 bullets + `fig-day12-wiring`, `room="yes"`. The
  densest picture in the day against the most bullets any figure slide carries.
- `sl-day12-rpm` — 2 bullets + an inline `rpm-formula.svg` at `width="30%"`;
  `room="yes"`. The image is inside the slide rather than referenced, so the
  fitter treats it differently.
- `sl-day12-three-rates` — 2 bullets + `fig-three-rates`, `stack="yes"`.
- `sl-day12-deadband` — 1 bullet + `fig-deadband`, `stack="yes"`. Lowest risk of
  the five; `fig-deadband` is 4.1:1 and will be width-limited.
- `sl-day12-lab6-build` — 0 bullets, but the figure is 1.06:1 against a 1.78:1
  stage. It will be height-limited whatever else happens. See L1.

## Checked and clean

- **Slide titles against images.** All nine figure-bearing deck entries
  (`assets/decks/day12.json` 6, 7, 8, 11, 15, 17, 24, 29, 31) name what is in the
  picture, each judged on its own without the neighbouring slides.
- **Slide captions against images.** `sl-day12-three-rates`'s *"The pulses along
  the bottom line up with none of the three rates"* is a measurable claim and it
  holds: pulse period 63.3 units against lane spacings of 20.5, 102.5 and 820 —
  no common factor, and the first pulse edge (259) misses the first 10 ms tick
  (250). `sl-day12-states`, `sl-day12-wiring`, `sl-day12-lab6-build`,
  `sl-day12-deadband` likewise.
- **`fig-day12-sensor-parts` carries two images in one `<figure>`.** This is the
  allowed case: they are in a `<sidebyside widths="46% 46%">`, both ~4:3, and the
  figure is pre-class, book-only, with no slide. Not the stacked-screenshots
  defect.
- **Nothing was re-cropped by `pptx_annotate.py` this round.**
  `fig-day12-wiring-annotated.png` is Petra's own second export and carries all
  three of her annotations, drawn inside the crop, with no arrow through a label
  and no text outside a box. `fig-day12-lab6-build.svg` is a bare SVG wrapper
  around one unretouched Fritzing PNG.
- **Figure sharing across days.** No Day 12 figure resolves into another day's
  image directory and no other chapter references one.
  `Day11x-Motors(2)/fig-encoder-wheel.jpg` (`994f5ea5…`) and
  `Day12-Motors(3)/fig-day12-encoder-wheels.jpg` (`9ce67128…`) are different
  files; a re-crop of either cannot disturb the other.
- **`N = 20`.** The wheel in `fig-photointerrupter-beam` is drawn with exactly 20
  slots, which is the number `subsec-speed-rpm` uses and the number the in-class
  count is meant to confirm.
- Items 1–7 of the brief's do-not-report list were left alone. Item 5 in
  particular: the regulator's `5V`/`GND`/`Vin` pads are unwired in **both**
  `fig-day12-wiring` and `fig-day12-lab6-build`, so "the regulator's 5 V" in both
  captions is not traceable off either picture. That is the open asset request,
  not a new finding, and it is **not** something a caption should be made to
  confess.
