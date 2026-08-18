# Day 11 — handover: what is left

Updated 2026-08-17, after the pass that cleared the previous handover list. The
book and the deck are both built and clean. Start a fresh session with
`plans/CHAPTER-GENERATION-PROMPT.md`, then this file.

**State:** `source/ch-motors.ptx` Day 11 (reading + Parts 1–6) and
`assets/decks/day11.json` (46 slides). `build-all`, `check_rules`, `check_deck`,
`check_starters` all clean, and every one of the 46 slides measures 0 px over.
Gates 0, 1, 1.5, 2 and 3 have run; reviews are in `reviews/day11-gate{1,2,3}.md`.
Petra has hand-passed the prose three times, so **her wording wins over any
reviewer's**, and over anything in this file.

---

## 1. Done this pass — do not redo

- **The motor circuit figure is hers.** She dropped
  `assets/images/Day11-Motors/motor-circuit.png` and it is committed. It projects
  full-slide on `sl-day11-motor-circuit`.
- **`act-day11-speed-params`**: `act-day11-startup-current` and
  `inst-day11-startup-current` are merged back in, their deck entries removed, and
  part (b) is on the slide with the table again. The introduction's working
  instructions moved down into task (a) verbatim to pay for it. The equation is
  now the typeset figure rather than inline `<m>` — the player loads no MathJax,
  which is why it projected as slash-and-paren text. **The formula itself is
  correct**: eliminating *i* and *e* from the four relationships gives exactly
  ω = V/(K_e + b R_a / K_t), and it agrees with `fig-equilibrium-speed`, so no
  symbol was changed. If she meant something else by "wrong", that is still open.
- **The six H-bridge SVGs** are redrawn with her transistor symbol (gate bar
  outside, channel bar inboard, substrate arrow in for N and out for P, right
  column mirrored) and with IN1/IN2 bracketing from **outside** the H. The
  generator now lives at `scripts/mk_hbridge.py`; regenerate rather than redraw.
  Their bottom notes used to run off the canvas and the projector cut them
  mid-sentence; they wrap now.
- **`sl-day11-counter-compare`** fits. Its last bullet condensed the paragraph
  *after* the figure, so it is now `sl-day11-tim14-pin`, its own slide before
  `act-day11-pwm`.
- **Four player bugs**, all in `assets/class.html`, all affecting every deck:
  slide tables were fixed at 16 px; a `<tabular>` inside a projected activity
  could not carry declared column widths; `top/bottom="major"` rules drew nothing
  (PreTeXt numbers major 3, and only 1 and 2 were styled); and `demath()` deleted
  every LaTeX command it did not know, so `\omega` and `\tau` vanished on the
  wall. Also: a bare `<image>` ignored its declared width, and an over-full
  two-column body grew past the slide instead of clipping — which is why the fit
  check called a 196 px overflow "fits".

## 2. Open — needs her

- `tb6612-wiring-exercise2.png`: the D11/D12/D13 pin names are ~9 px and rotated,
  so the slide asserts three pin assignments it cannot show. The bullets now name
  PA7/PA5/PA6 in text, but the figure still needs callouts or a header inset —
  her export.
- Both wiring PNGs carry a clipped glyph along the top edge.
- Projected `<xref>`s render as "Figure 11.2.12", a book number that means nothing
  on the wall. The book needs the xref; the slide does not. Unresolved.
- The day is ~25 min over 110. The defer order is in `plans/day11.md` and every
  task ID in it was verified against the source.
- `sl-day11-tim14-pin` is a deliberately sparse two-bullet slide. It teaches (it
  is the set-up for the first task of the activity that follows), but she may want
  it folded elsewhere.

## 3. Then

Delivery 2 has not been signed off. Hand her the deck.

Note for whoever builds next: **stop the preview servers first** — a running
`http.server` holds `output/` and makes `build-all` fail with
`rm: Directory not empty`.

Nothing has been pushed. 20 commits sit on `main`.
