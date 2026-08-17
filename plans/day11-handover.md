# Day 11 — handover: what is left after Petra's pass 3

Written 2026-08-17, at the end of a session that ran out of context. The book and
the deck are both built and clean; everything below is outstanding. Start a fresh
session with `plans/CHAPTER-GENERATION-PROMPT.md`, then this file.

**State:** `source/ch-motors.ptx` Day 11 (reading + Parts 1–6) and
`assets/decks/day11.json` (47 slides). `build-all`, `check_rules`, `check_deck`,
`check_starters` all clean. Gates 0, 1, 1.5, 2 and 3 have run; reviews are in
`reviews/day11-gate{1,2,3}.md`. Petra has hand-passed the prose three times, so
**her wording wins over any reviewer's**, and over anything in this file.

---

## 1. The motor circuit figure — she is supplying it

She has the good one in her slides. **Tell her nothing more; she drops it at:**

```
assets/images/Day11-Motors/motor-circuit.png
```

That path is already referenced by `fig-motor-circuit` in the book and by
`sl-day11-motor-circuit` in the deck, and is currently seeded with a placeholder I
drew, which she has rejected. Overwriting the file is the whole job — **no source
edit needed**. Delete nothing else.

Her figure is the equivalent circuit from Day11 slide 7 (`slide07_img1.png`, 318×136,
too small to use directly): V source, R_a, current i, and the motor as a generator
producing e.

## 2. `act-day11-speed-params` — three faults

- **The formula in the introduction is wrong and is plain text.** It currently reads
  `<m>\omega = V/(K_e + b R_a / K_t)</m>` inline in the introduction prose — check it
  against `fig-equilibrium-speed`, fix it, and render it as the figure rather than
  inline text so it looks like a formula. She has asked twice now for real math.
- **The table is too small on the slide.** It is a `<tabular>` with `<col width>` of
  55/45. Needs to project.
- **Part (b) must be on the same slide.** I split the switch-on-current question out
  into `act-day11-startup-current` purely to fix a 126 px overflow. She wants it back
  on the slide with the table. So: merge `act-day11-startup-current` back into
  `act-day11-speed-params` (and `inst-day11-startup-current` back into
  `inst-day11-speed-params`), remove the two deck entries, and solve the overflow a
  different way — the table itself is the space, so shrink the introduction, not the
  content (S-9: split or compress spacing, never thin the prose).

## 3. The H-bridge drawings — wrong transistors, wrong control-line placement

`/tmp/mk_hbridge.py` is the generator (copy it into `scripts/` if it is to live on).
It writes six files: `hbridge-in1-in2.svg`, `hbridge-cur-out1-out2.svg`,
`hbridge-cur-out2-out1.svg`, `hbridge-brake.svg`, `hbridge-stop.svg`,
`hbridge-shoot-through.svg`.

Two corrections from her:

- **Use the datasheet's transistor symbols**, the ones in her own figures — do not
  substitute a different MOSFET rendering as I did. Reference: `slide11_665f7016.png`,
  `slide12_8fcc0651.png`, `hbridge-in1-in2-ccw.png` (all still in the folder).
- **IN1 goes to the left of the H and IN2 to the right, with the blue line, exactly as
  she annotated it** in `hbridge-in1-in2-ccw.png`. My generator puts the control
  brackets inside the bridge legs.

Keep what is already right: stop mode drawn with the motor present and all four
switches off; one drawing language across all six; the plain bridge carrying no traced
current path, which is what stops it giving away `act-day11-diagonal` (P-15).

## 4. `sl-day11-counter-compare` — bullets above the headline

The slide has five `<li>` and a `ref` to `fig-pwm-counter-compare`, and the bullets
render above the title. Try `room="compressed"`, or move some content to the figure
caption. Check it in the player, not by measurement.

## 5. Done this session, do not redo

- `fig-pwm-scope.png` cropped to remove the "Discovery3 C" status bar (1205×754 → ×724).
- `sl-day11-motor-circuit` added to the deck — it existed in the source but no deck
  entry projected it, which is why the circuit was missing from the slides.

## 6. Still open from Gate 3, not yet raised with her again

- `tb6612-wiring-exercise2.png`: the D11/D12/D13 pin names are ~9 px and rotated, so
  the slide asserts three pin assignments it cannot show. Needs callouts or a header
  inset — her export.
- Both wiring PNGs carry a clipped glyph along the top edge.
- Projected `<xref>`s render as "Figure 11.2.12", a book number that means nothing on
  the wall. The book needs the xref; the slide does not. Unresolved.
- The day is ~25 min over 110. The defer order is in `plans/day11.md` and every task
  ID in it was verified against the source.

## 7. Then

Delivery 2 has not been signed off. After these fixes, re-run the fit check
(`AUTHORING-slides.md`, verbatim, with the crossfade killed and **the preview server
stopped** — a running `http.server` holds `output/` and makes `build-all` fail with
`rm: Directory not empty`), then hand her the deck.

Nothing has been pushed. 15 commits sit on `main`.
