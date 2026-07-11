# ENGS 28 Textbook — Chapter Editing Process

Lessons learned from ch-uart.ptx, distilled into a repeatable workflow.

---

## Deferred topics (do not forget)

- **BSRR register** — introduce in `ch-timers-interrupts.ptx`, not before. The motivation is that ISRs sharing GPIO state with the main loop create a race condition on ODR read-modify-write; BSRR's atomic set/clear is the fix. Students need to have hit the problem (or seen it explained) before BSRR makes sense. Hook: "you're now writing ISRs that share GPIO pins with the main loop — here's why that matters and here's the one-line fix." CMSIS macros: `GPIO_BSRR_BS5` to set, `GPIO_BSRR_BR5` to clear.

---

## Standing rules (apply to every chapter)

- **Never say**: "working in pairs," "work individually," "before you leave." Grouping is given verbally.
- **No `%f` in printf examples.** The course printf library doesn't support floating-point. Use integer scaling instead (`int mV = (int)(v * 1000)`, print with `%d`).
- **Avoid "gate" language** for clocks. Say "enable the clock" / "until its clock is enabled," not "open the gate."
- **"Prototypes"**, not "forward declarations."
- **Be specific with hardware names.** "STM32C031" not "target MCU." Match peripheral names to the datasheet exactly.

---

## What we learned matters most

### 1. Read the actual driver files before writing anything

The biggest source of errors was writing from memory or generic examples instead of the real `.c` file. The actual driver determines:
- Which headers are included
- What `#define`s set the clock/baud constants
- Whether helpers are separate functions or inline
- Whether CR1 is written in one step or two (two: `RE|TE` first, then `|= UE`)
- What the retarget does (uart.c `__io_putchar` does **not** insert `\r` — students must write `\r\n` themselves)
- Which CMSIS macros are used (vs. raw bit shifts)

**Rule: read the `.c` and `.h` files in the slide folder before writing a single line of explanation.**

### 2. Verify slides exist and are non-empty before referencing them

Some slides are empty files; some listed in conversations don't actually exist. Always `ls -la` the relevant slide folder and check sizes before writing `<image source="..."/>`.

### 3. Crop slides when only part is relevant

Don't drop a full slide into a section when you only need one diagram or waveform. Crop to the meaningful region (e.g., the oversampling waveform from the bottom half of slide42). Full slides in the middle of a section feel like PowerPoint pasted into a textbook.

### 4. Step counts in section intros must match reality

If the intro says "four steps," count the actual subsections. This drifts easily when steps are added or merged.

### 5. Reading questions must be grounded in actual code

Before finalizing any reading question, check that the correct answer reflects what the real driver does — not a plausible but invented behavior. The `rq-uart-crlf` question was wrong because it assumed the retarget inserted `\r` when it doesn't.

### 6. Explanation placement should follow logical flow

Put concepts where they are needed, not where they first appear. Oversampling belongs in the BRR section (it explains why BRR = f/baud), not in the CR1 section where it's first mentioned in passing.

### 7. Figure captions and cross-references must be precise

Captions should describe what is actually shown, with correct hardware names, register names, and bit labels. When a slide image shows the wrong register, replace it (screenshot if the PDF can't be extracted).

---

## Efficient chapter workflow

### Phase 0 — Inventory (5 min)

```bash
ls assets/slides/<DayXX-ChapterName>/
find assets/slides/<DayXX-ChapterName>/ -name "*.c" -o -name "*.h"
```

Note: which slides exist, which `.c`/`.h` files are present, approximate slide count.

### Phase 1 — Ground truth: read the driver

Driver and header files are not in the slide folders by default — ask Petra to drop them in, or ask directly in chat: *"Can you add the `.c` and `.h` files for this chapter?"* Don't reconstruct or invent driver code.

Read every `.c` and `.h` file provided. Note:
- Includes and defines
- Init function structure and step order
- Any course-specific constraints (no `%f`, `\r\n` handling, etc.)
- CMSIS macro names used for registers
- Any multi-step writes to a single register

### Phase 2 — Read the existing `.ptx` top to bottom

The `.ptx` files have all the content — they are the source of truth. The slides folders are supplementary (images only) and are incomplete due to an extraction failure.

Skim the full chapter file. Flag:
- Sections that reference slides (verify they exist on disk)
- Step counts in section intros
- Code blocks (are they from the actual driver or invented?)
- Reading questions (do correct answers match actual behavior?)
- Standing rule violations

### Phase 3 — Edit section by section

For each section:
1. Verify any `<image source="..."/>` path exists on disk. If a slide is missing:
   - Try re-extracting from the PDF first
   - If that fails, ask Petra: *"Slide N from Day XX is missing — can you take a screenshot and drop it in the folder?"*
2. If a full slide is used — does only part of it matter? If so, crop it
3. Check code blocks against actual driver files
4. Verify explanation placement is logical (don't explain X in section Y if X motivates section Z)
5. Check standing rules in every paragraph

### Phase 4 — Reading question audit

For each `<exercise>`:
- Read the correct answer: does it describe what the actual hardware/driver does?
- Read each distractor: is the feedback accurate?
- Check that the question isn't based on a behavior the real driver doesn't have

### Phase 5 — Final grep scan

```bash
grep -n "before you leave\|working in pairs\|work individually" ch-XXX.ptx
grep -n "gate" ch-XXX.ptx          # clock gate language
grep -n "%f" ch-XXX.ptx            # unsupported printf format
grep -n "forward declar" ch-XXX.ptx
```

Verify all `<image source="..."/>` paths:
```bash
grep -o 'source="[^"]*"' ch-XXX.ptx | sed 's/source="//;s/"//' | \
  while read f; do [ -f "assets/$f" ] || echo "MISSING: $f"; done
```

---

## Remaining chapters

| File | Slide folder(s) | Driver files? | Status |
|------|----------------|---------------|--------|
| ch-intro-blinky.ptx | Day01, Day01x, Day02 | — | done |
| ch-switches.ptx | Day03, Day03x, Day04 | — | in progress |
| ch-transistors.ptx | Day06 | — | in progress |
| ch-adc.ptx | Day07 | — | in progress |
| ch-debugging.ptx | Day07x | — | in progress |
| ch-timers-interrupts.ptx | Day08, Day09 | — | in progress |
| ch-i2c.ptx | Day09x, Day10, Day13 | — | in progress |
| ch-motors.ptx | Day11, Day11x, Day12 | — | in progress |
| ch-accelerometers.ptx | Day13x, Day14 | — | in progress |
| ch-servos.ptx | Day15, Day15x | — | in progress |
| ch-photosensors.ptx | Day16 | — | in progress |
| ch-ble.ptx | Day17 | — | in progress |
| ch-power.ptx | Day17x | — | in progress |
| ch-uart.ptx | Day05, Day05x | uart.c, uart.h | **done** |

---

## Quick-reference: things that bit us in ch-uart

| Mistake | Fix |
|---------|-----|
| Invented driver code instead of real uart.c | Read `.c` file first |
| Referenced slide41 (empty file) | Always `ls -la` before using |
| Dropped full slide42 into BRR section | Cropped to waveform only |
| Said "five steps" in intro | Recount after any structural change |
| `rq-uart-crlf` assumed `\r` insertion | RQ must match actual driver |
| Oversampling explanation in CR1 section | Moved to BRR where it belongs |
| "retarget layer in uart.h" | It's in uart.c |
| %f example in printf section | Removed; added explicit "not supported" note |
| "forward declarations" | "Prototypes" |
| "until this gate is opened" | "until its clock is enabled" |
