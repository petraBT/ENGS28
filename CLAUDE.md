# ENGS 28 Textbook — Context for Claude

This file captures conventions, decisions, and pending work for the ENGS 28 PreTeXt
textbook. Read this before editing any source files.

---

## Project overview

**Course**: ENGS 28: Embedded Systems, Thayer School of Engineering, Dartmouth College  
**Author**: Petra Bonfert-Taylor  
**Platform**: PreTeXt (XML → HTML/PDF)  
**Hardware**: STM32 Nucleo-C031C6 board (STM32C031C6 MCU), Analog Discovery 2  
**Language**: C, direct register-level programming (no HAL)

Build: `./build.sh` from the repo root (wraps `pretext build web`; fixes a macOS
permission issue with the external assets folder).

Authoring small changes: `./preview-edit.sh` builds and serves the `web-edit`
target, where alt-clicking a paragraph opens it in an editor at the right
file and line, and alt-shift-clicking edits its text in place. Useful for
finding the source of something you can see rendered.

See `AUTHORING.md` for the whole workflow — editing, building, git, deploying —
and `scripts/README-editing.md` for the editing tooling specifically.

---

## Repository structure

```
source/          PreTeXt XML source files
assets/
  slides/        Slide images, one subfolder per day (DayNN-Title/)
                 Each subfolder contains the PDF export and extracted PNGs
  *.pdf          Hosted reference documents (linked via external/)
  board-sim/     BUILT output of the board simulator — do not edit by hand;
                 refresh with scripts/sync-board-sim.sh (see AUTHORING.md)
  sim-starters/  Per-exercise starter .c files loaded by <sim starter="…"/>
output/web/      Built HTML (git-ignored; recreated by build)
scripts/         Authoring tooling for preview-edit.sh (see README-editing.md)
                 plus sync-board-sim.sh, which refreshes assets/board-sim/
build.sh         Build wrapper
preview-edit.sh  Authoring preview: click the rendered page to reach its source
publication.ptx  PreTeXt publication settings
```

**Custom elements** — two elements are this book's own, taught to PreTeXt in
`xsl/engs28-html.xsl` (with print behaviour in `xsl/engs28-latex.xsl`):

- `<slide>` — the condensed in-class form of the surrounding content, rendered
  only in the `web-deck` build. See `AUTHORING-slides.md`.
- `<sim starter="name"/>` — an embedded board simulator (the in-browser
  Nucleo-C031C6, register-level C) seeded with `assets/sim-starters/name.c`.
  See `AUTHORING.md`. The simulator's built output is committed here at
  `assets/board-sim/` and deploys with the book — no separate hosting; its
  source repo is `~/repos/ENGS28-board-sim`.

**Hosted reference PDFs** (in `assets/`, linked as `external/filename.pdf`):
- `stm32c031_rm.pdf` — STM32C0x1 Reference Manual
- `stm32c031_datasheet.pdf` — STM32C031 Datasheet
- `nucleo_user_manual.pdf` — Nucleo-C031C6 User Manual
- `nucleo_schematic.pdf` — Nucleo-C031C6 Schematic
- `nucleo_pinout.pdf` — Nucleo-C031C6 Pinout

---

## Chapter map

| File | Chapter | Days |
|------|---------|------|
| ch-intro-blinky.ptx | 1: GPIO and Blinky | 1, 1X, 2 |
| ch-switches.ptx | 2: Switches and Debouncing | 3, 3X, 4 |
| ch-uart.ptx | 3: UART Serial Communication | 5 |
| ch-io-datasheets.ptx | 4: Reading Component Datasheets | 5X |
| ch-transistors.ptx | 5: BJT and MOSFET Switches | 6 |
| ch-adc.ptx | 6: Analog-to-Digital Conversion | 7 |
| ch-debugging.ptx | 7: Debugging | 7X |
| ch-timers-interrupts.ptx | 8: Timers and Interrupts | 8, 9 |
| ch-i2c.ptx | 9: I2C Communication | 9X, 10, 13 |
| ch-motors.ptx | 10: DC Motor Control | 11, 11X, 12 |
| ch-accelerometers.ptx | 11: Accelerometers | 13X, 14 |
| ch-servos.ptx | 12: Servo Motors | 15, 15X |
| ch-photosensors.ptx | 13: Photosensors | 16 |
| ch-ble.ptx | 14: Bluetooth Low Energy | 17 |
| ch-power.ptx | 15: Power Management | 17X |

---

## Writing style

- **Concise and direct.** Students should not have to parse long sentences.
  Cut words aggressively. Test: can you remove a word and keep the meaning?
- **Specific over vague.** Say "D5 (PB4)" not "a GPIO pin". Say "the Src folder
  of your Buttons project" not "a new project". Say "connect" not "clip".
- **No instructor-facing instructions in student text.** Instructions to Petra
  (e.g., "pull out the shared slide deck on the projector") do not belong in
  the source.
- **Active-low convention**: pressed = 0, released = 1. Always explain this when
  introducing buttons.
- **AD2 oscilloscope**: channels are orange (CH1) and blue (CH2). Minus leads
  have white stripes. Never say "yellow".
- **Units**: µs, ms, kΩ, µF (Unicode, not LaTeX in prose).

---

## PreTeXt conventions and gotchas

### Activity structure
Bare `<p>` directly inside `<activity>` before `<task>` elements is silently
dropped by PreTeXt. Always wrap introductory paragraphs in `<introduction>`:
```xml
<activity xml:id="...">
    <title>...</title>
    <introduction>
        <p>...</p>
    </introduction>
    <task>...</task>
</activity>
```

### Figure placement
Place each `<figure xml:id="...">` at its **first point of use** in the reading
flow. Downstream sections reference it with `<xref ref="fig-..."/>`.
- Do NOT define the same xml:id twice.
- The in-class sections are where most figures are first introduced;
  the reference sections (sec-ad2-oscilloscope, sec-gpio-input-config, etc.)
  reference back to them.

### Image sizing
- `<image width="X%"/>` inside a standalone `<figure>` = X% of text width. ✓
- `<image width="X%"/>` inside a `<sidebyside>` panel is **ignored** — the panel
  width controls the image. Use `widths="X% Y%"` on `<sidebyside>` instead.

### Table width
`<col width>` only sizes columns relative to the table, not to the page.
To constrain a wide table, wrap it in `<sidebyside widths="X%" margins="Y%">`.

### External assets (PDFs, SVGs)
Files in `assets/` are copied to `output/web/external/` at build time.
Reference them in source as `<url href="external/filename.pdf">`.
The `build.sh` script deletes `output/web/external/` before each build to avoid
a macOS permission error (shutil.copy2 preserves read-only source permissions).

### URL links inside activities
Use `<url href="...">` inside `<introduction>` (not bare in `<activity>`).

---

## Chapter structure pattern

Each chapter that has in-class content follows this pattern:

```
sec-TOPIC-concepts        "Before Class" reading + reading-questions (Canvas quiz)
sec-TOPIC-dayN            "Day N In-Class" section
  subsec-dayN-part1         Mini-lecture with theory + figures, then activity
  subsec-dayN-part2         ...
sec-ad2-oscilloscope      Reference section (figures defined in in-class section)
sec-gpio-input-config     Reference section
sec-TOPIC-dayNx           "Day NX In-Class" (55 min, no pre-class reading)
sec-TOPIC-dayM            "Day M In-Class"
sec-TOPIC-lab             Lab assignment (often merged into the last in-class day)
```

**Key principle**: In-class sections contain both theory (mini-lecture paragraphs
+ figures) AND activities. Reference sections are "deep dive" reference material
that cross-reference the figures defined in the in-class sections. Students
should not need to jump to a reference section to understand what to do in class.

---

## How to design each component — lessons from ch-intro-blinky.ptx

This section captures what was learned from intensive revision of Chapter 1 and
should guide the writing of every subsequent chapter from the start.

### Source of truth: the original slides

**Always start from Petra's original slide PDFs** in `assets/slides/DayNN-Title/`.
The extracted PNGs are incomplete (OCR misses annotations, diagrams, and layout).
Use `pdftotext` to read slide text, and read the full PDF when the structure matters.
Do not infer what a slide says from the extracted image filenames alone.

---

### Before-Class reading (sec-TOPIC-concepts)

**Goal**: Give students enough conceptual background that the in-class activity
makes sense. Not a complete treatment — leave discovery for class.

- Introduce vocabulary and high-level concepts only.
- No register-level details (students haven't touched the hardware yet).
- End with `<reading-questions>` tied to a Canvas quiz.
- Typical length: 3–6 pages when rendered.
- Do NOT include figures that will be defined in the in-class section; if a
  concept needs a figure, define the figure in Day N and xref it from here.

---

### In-class day (sec-TOPIC-dayN)

**Goal**: Students are active. Each 65-minute class = alternating mini-lectures
and activities. No long stretches of passive reading.

**Structure within each subsection (Part N)**:

1. **Mini-lecture prose** — 1–3 paragraphs of theory, enough to understand the
   next activity. Include the relevant figure here (first point of use). This
   is what Petra would say while showing the slide; write it at that level of
   detail.
2. **Activity** — hands-on, tied directly to what was just explained. Students
   should not need to leave this section to do the activity.

**Theory belongs in class, not just in reference sections.** This is a hardware
course. Mini-lectures on memory-mapped I/O, push-pull output circuits, clock
gating, etc. belong IN the in-class section, woven between activities —
not deferred to a reference section students may never read.

**Walkthrough ordering**: When walking through code line by line, introduce
any unfamiliar C operators or concepts BEFORE the steps that use them. Do not
explain operators mid-walkthrough after the reader has already encountered them.
Correct order: code listing → structural concepts (e.g., `while(1)`) →
operators → numbered steps.

**Bold step headers**: In any step-by-step walkthrough, give each step a
`<term>Step N: Short description.</term>` heading at the start of its paragraph
so students can scan directly to the step they need.

**Activities should be discovery-oriented**: Do not pre-answer the question.
Have students look things up in the reference manual, derive register bit patterns
from the formula (2n, 2n+1), or reason from truth tables before being told.
Phrase tasks as: "Find X in Section Y of the reference manual" or "Derive the
MODER bits for pin Z using the formula."

**Lab kickoff in class**: The lab introduction (spec + first activity) belongs
in the last in-class subsection of the day it is assigned, not in a separate
section. This way it appears in the slides Petra builds from the chapter.

**Figures**: Define every figure at its first point of use in the in-class
reading flow. Reference sections use `<xref>` only — never redefine a figure.

---

### Reference sections (sec-TOPIC-*)

**Goal**: Optional deep-dive material for students who want more detail or are
reviewing after class. NOT required to follow along in class or complete the lab.

- Never define figures here — only `<xref>` to figures defined in in-class sections.
- Extend or expand topics from class; do not repeat the same content.
- Include `<reading-questions>` for self-check.
- A reference section that merely repeats what was covered in class should be
  deleted or merged into the in-class section. (Example: sec-nucleo-board and
  sec-blinky-program were redundant with the Day 1 board tour and walkthrough
  and were removed.)
- Acceptable reference content: encoding tables, register field listings, deeper
  circuit explanations, edge cases, extended examples.

**Test**: Ask "Would a student who only reads the in-class sections be able to
do the lab and follow the next class?" If yes, the reference section is truly
optional. If no, move that content into the in-class section.

---

### X-hour (sec-TOPIC-dayNx)

**Goal**: 55-minute session, no pre-class reading, self-contained.

- Students arrive cold — do not assume they prepared anything.
- Works well for: lab troubleshooting, extended activities that didn't fit
  Day N, deeper explorations (e.g., bounce observation, RC debounce), design
  exercises, or peer review of homework.
- Common pattern: brief review of something from Day N → new activity that
  extends it → debrief.
- Homework that was assigned at end of Day N often feeds into Day NX
  (e.g., "take out the sketch you did for homework").

---

### What NOT to do (anti-patterns learned from revision)

- **Don't put operators after the code that uses them.** Explain `|=`, `&= ~`,
  `<<` before the first step that uses them, not after Step 2.
- **Don't give away discovery tasks.** "D4 connects to PB10" removes the point
  of looking it up. Say "Find D4's STM32 pin name in the pinout figure."
- **Don't say "before reading ahead"** when there is no reading ahead to do.
- **Don't define the same figure twice.** Pick the first point of use (always
  in an in-class section) and xref everywhere else.
- **Don't use "firmware"** for student-written code. Say "your program."
- **Don't specify LED color** in lab specs. Students choose.
- **Don't say 5V** when the Nucleo supplies 3.3 V. Connecting 5V could damage
  the chip; the correct supply is the 3.3 V header pin.
- **Don't write reference sections that duplicate in-class content.** Delete
  them instead.
- **Don't have the OR-assign code example show IOPENR** if you haven't
  explained IOPENR yet. Use a context the student already understands, or
  explain in order.
- **Don't say "clip"** for connecting wires. Say "connect."

---

## What has been completed

- **ch-intro-blinky.ptx**: Complete with concepts, in-class sections (Days 1, 1X, 2),
  annotated slide images
- **ch-switches.ptx**: Complete with:
  - Before-class reading (sec-switches-concepts) with Canvas quiz
  - Day 3 in-class: code review, AD2 mini-lecture with all figures, digital
    inputs mini-lecture with all figures (pull-up, MODER/PUPDR/IDR), activities
  - Day 3X in-class: scope revisited, bounce observation, RC debounce, toggle problem
  - Day 4 in-class: FSM code review, design, implementation, Lab 2 intro
  - Reference sections: sec-ad2-oscilloscope, sec-gpio-input-config, sec-bounce,
    sec-state-machine (figures defined in in-class sections; reference sections use xrefs)
  - Lab 2 spec
- **ch-uart.ptx**: Complete with in-class section, driver walkthrough, lab
- **ch-io-datasheets.ptx**: Complete (Day 5X standalone, 55 min)
  - Datasheet Passport activity (Parts A–E) covering 4 components
  - Share-out section
- **ch-transistors.ptx**: Concepts section complete; figures 4.2.7/4.2.8 fixed
  (standalone figures at width="20%"); table 4.2.9 wrapped in sidebyside at 92%
- **ch-adc.ptx**: Concepts/theory section complete
- **ch-debugging.ptx**: Concepts section complete
- **ch-timers-interrupts.ptx**: Concepts section complete
- **ch-motors.ptx**: Concepts section complete
- **ch-accelerometers.ptx**: Concepts section complete
- **frontmatter.ptx**: "Course Reference Documents" preface with links to all 5 PDFs
- **backmatter.ptx**: Register and bit-ops quick-reference appendices; links to hosted PDFs

---

## Pending work

- **In-class sections for chapters 3–15**: Only ch-switches, ch-uart, and
  ch-io-datasheets have full in-class content. The remaining chapters need the
  same treatment: mini-lectures integrated with activities, figures placed at
  first use.
- **ch-transistors.ptx Part 5 (datasheet activity)**: Explicitly deferred by Petra.
- **BSRR register**: To be introduced in ch-timers-interrupts.ptx (deferred).
- **Decide permanent placement** of sec-ad2-oscilloscope, sec-gpio-input-config,
  sec-bounce in ch-switches.ptx — currently reference sections after the in-class
  sections; may want to restructure once all in-class content is written.
- **Pre-class reading label for sec-state-machine**: Currently the state machine
  section is tagged as pre-class reading for Day 4 in comments but not formally
  restructured.
- **ch-adc.ptx line ~448**: One mention of "in the reference manual" still lacks
  a hyperlink to the hosted PDF.

---

## Slide assets

Slides are in `assets/slides/DayNN-Title/`. Each folder contains:
- `DayNN-Title.pdf` — full slide export
- `slideNN_HASH.png` — extracted slides with content (used in figures)
- `slideNN_img1.png`, `slideNN_img2.png` — embedded images extracted from slides

To extract text from a slide PDF: `pdftotext assets/slides/.../File.pdf -`

When the user says "it's in the slides", check the relevant Day folder.
Image filenames with a hash (e.g., `slide23_cdfa0eb4.png`) are the full slide
renders; filenames with `_img1` etc. are embedded images cropped out.

---

## STM32 / hardware notes

- MCU: STM32C031C6 on Nucleo-C031C6 board
- GPIO pins referenced by both Arduino name (D5) and MCU name (PB4) — always
  give both when telling students which pin to use
- Blue user button: PC13, active-low
- On-board LED: PA5
- Pull-up resistors: ~40 kΩ internal
- Clock: 12 MHz (default, used in button.c and all in-class code); 48 MHz requires explicit PLL configuration
- button.c starter code is written for PB4; students must wire to D5/PB4
- TemplateProject is the starting point for all new student projects;
  students copy it and rename (e.g., "Buttons"), then add the starter .c file
  to the Src folder
- AD2 channels: orange = CH1, blue = CH2; minus leads have white stripes
