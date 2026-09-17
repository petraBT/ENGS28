# The whole-book style and voice sweep — contract and worklist

Prompt 1 output (measured 2026-09-14). This session edited nothing in
`source/`. It measures the divergence, drafts the contract Petra approves, and
orders the work for Prompts 2 and 3. **Nothing here is applied until she passes
Part B.** The charter is `plans/STYLE-SWEEP-PROMPTS.md`; its three "never" rules
bind every stage.

> **CONTRACT STATUS: APPROVED by Petra 2026-09-14.** Q1–Q5 approved as
> recommended; Q6 = worst-voice-first (Part C.b as written). Part B is now the
> binding ruleset. Prompt 2 (mechanical/links) and Prompt 3 (voice) may run —
> each in a fresh session, per the charter. See "Decisions" at the foot.

Numbers below are whole-corpus counts over `source/ch-*.ptx` (16 chapters,
~32k lines). Where a call is genuinely hers, Part B marks it **[QUESTION]**;
where the corpus already answers it, **[SETTLED]**.

---

## Part A — the divergence catalog

### A.1 How the reference manual is cited

The reference manual is named **173 times** and linked **9 times**. It is the
largest single inconsistency in the book.

| Form | Count | Example |
| --- | --- | --- |
| "reference manual" / "Reference Manual" (prose phrase) | 79 | `ch-power.ptx` (16×), `ch-i2c.ptx` (12×) |
| — of those, capitalized "Reference Manual" | 34 | L-14's intended form |
| — lowercase "reference manual" | 45 | mixed within the same chapters |
| "RM0490" designator | 94 | `ch-gpio-interrupts.ptx` (20×) |
| `<url>` links to `external/stm32c031_rm.pdf` | **9** | see A.3 |

**Section-number notation after RM0490:**

| Form | Count | Note |
| --- | --- | --- |
| literal `§` (U+00A7) | 166 | dominant; the house form |
| `&#167;` entity | 7 | renders identically — a stray variant to normalize |
| "RM0490 §N" | 43 | designator + § |
| "RM0490 section N" (word) | 1 | outlier |
| "section N.N" / "Section N.N" **with no "Reference Manual" or "RM0490"** | ~35 | the L-14 trap — reads as a section of *this book* |

The L-14 trap is live and mixed **within one chapter**. `ch-motors.ptx` writes
bare "find it in section 17.4" and "Section 17.3.8 says…" (RM sections, but
unqualified) alongside the correct "the Reference Manual (Section 17.3.8)" and
"section 12.5.6 of the Reference Manual". A student cannot tell which "section
17.4" means the RM and which means the textbook.

**Chapters with the worst RM link gap** (RM named often, linked never):

| Chapter | "reference manual" | "RM0490" | `<url>` to RM |
| --- | --- | --- | --- |
| ch-gpio-interrupts (Day 9) | 8 | 20 | **0** |
| ch-timers-interrupts (Day 8) | 5 | 19 | **0** |
| ch-i2c (Days 9x, 10) | 12 | 19 | 1 |
| ch-motors (Days 11–12) | 11 | 16 | (RM: 0; 9 urls are datasheet/other) |
| ch-uart (Day 5) | 5 | 0 | **0** |

### A.2 How datasheets are cited

The word "datasheet" appears **339 times**; **120** of those are the generic
"the datasheet" with no document named. Component/MCU datasheets are linked
**~30 times**, unevenly.

The starkest gap is the datasheet-literacy chapter itself: **`ch-io-datasheets`
(Day 5x) mentions "datasheet" 36 times and links none.** `ch-transistors` (Day
6) has 20 datasheet mentions, 0 links. `ch-accelerometers` has 96 mentions, 7
links (many mentions are generic back-references, so the real link surface is
far smaller than 96).

Datasheet **display forms vary** across five shapes:

| Display text | Example targets |
| --- | --- |
| "`<Part>` datasheet" | "TB6612FNG datasheet", "SG90 datasheet", "LSM303AGR datasheet", "PDV-P8001 datasheet", "EE-SX67 series datasheet" |
| bare "datasheet" | lsm303agr.pdf, C17481_SG92R, stm32c031_datasheet |
| document number | "DS13867" (×3), "UM2953", "AN-1057" |
| "`<Part>` series" | "EE-SX67 series" |
| chip-name variants | "STM32C031 datasheet" vs "STM32C031C6 datasheet" (L-5: the part is STM32C031C6) |

### A.3 `<url>` display-text conventions

43 `<url>` links exist. For the MCU documents the display text is inconsistent:

- **RM** (`stm32c031_rm.pdf`, 9 links): "RM0490", "Reference Manual" (×3),
  "STM32C031 reference manual" (×2), "STM32C031C6 Reference Manual" — four
  distinct forms.
- **MCU datasheet** (`stm32c031_datasheet.pdf`, 8 links): "DS13867" (×3),
  "STM32C031 datasheet", "STM32C031C6 datasheet", "datasheet" (×2) — four forms.
- **Nucleo docs**: "Nucleo pinout", "UM2953" — mixed friendly-name vs doc-number.
- External web links (Adafruit, howtomechatronics): 8 links, display the page
  topic — these are fine and out of scope for the RM/datasheet normalization.

### A.4 Links currently sitting in projected surfaces (link-safety)

The charter's hard rule: **no link in anything projected.** Current state,
grepping every `<slide>`, `<activity>`, and `<instructor>` block:

- **`ch-i2c.ptx` — a `<url>` inside a `<slide>` block** (`sl-day10-af6`, line
  2540, links to the MCU datasheet). This is an **outright existing violation**
  of the no-links-in-slides rule and must be fixed regardless of the contract.
- **11 `<url>`s inside `<activity>`/`<instructor>` blocks** across 8 chapters
  (adc ×3, plus accelerometers, ble, blinky, motors, photosensors, servos,
  switches). These are violations **only if a deck refs that block** — Prompt 2
  must build the ref'd-id set from `assets/decks/*.json` (28 decks) and check
  each. The link moves to surrounding reading prose where it does.
- No `<xref>` currently sits inside a `<slide>` block. (The player's `dexref()`
  neutralizes `<xref>` in a projected *activity*, but the charter extends the
  grep to `<url` because nothing neutralizes those.)

### A.5 Other mechanics — measured, not guessed

| Mechanic | Finding | Divergence? |
| --- | --- | --- |
| **Unit spacing** | "5 V" (spaced) 431 vs "5V" (no space) ~29 in prose; heaviest in `ch-servos` (20), `ch-motors` (8). Both forms appear in one caption: *"the Nucleo's 3.3 V or 5V pin"* | **Yes — normalize** |
| **Micro sign** | "µs" 85, "µF" 17; ascii "us" appears once | Minor — 1 fix |
| **`§` vs entity** | literal `§` 166 vs `&#167;` 7 | **Yes — 7 fixes** |
| **`<xref>` display** | 334 bare (auto-numbered) vs 2 with `text=` override | Uniform; 2 outliers to review |
| **Register names in `<c>`** | `GPIOA->` in `<c>` 47 vs bare in prose 4 | Uniform; 4 outliers |
| **List terminal punctuation** | `<li>` ending "." 546 vs no terminal punct 13 | Uniform (L-12 already governs; 13 are likely legit checklists) |
| **Figure captions** | noun-phrase lead, descriptive, self-contained (B-7) — consistent shape; length varies (B-18 already caps it) | Uniform |
| **`<c>` vs `<term>`** | 3050 `<c>`, 793 `<term>` — serve distinct roles (code font vs definitional term); no systematic misuse found in sampling | No rule needed |

**Conclusion:** the mechanical divergence that actually matters is **links**
(RM + datasheet), **the L-14 bare-section trap**, **unit spacing**, and the **7
`&#167;` entities**. Captions, xrefs, `<c>`/`<term>`, and list punctuation are
already uniform and need no new rule.

### A.6 Which chapters Petra passed, and which she never did

From `CHAPTER_PROCESS.md`'s status table. This decides Prompt 3's freedom.
**Critical nuance:** "done/passed" means the chapter cleared her review *by
exception* (she commented, they were fixed) — **not** that she authored every
sentence. Her explicit ask ("the beginning doesn't hit my voice, sweep it")
confirms even passed early chapters are in scope. The voice **floor** is the
narrower set: her review-comment wording, her slide-derived wording, and the
three frozen hand-pass specimens (Day 8, 9x, 10 diffs).

| Chapter | Days | Petra status | Prompt-3 hand |
| --- | --- | --- | --- |
| ch-intro-blinky | 1,1x,2 | **done** (comment-level) | sweepable; floor = her comments |
| ch-switches | 3,3x,4 | **done** (comment-level) | sweepable |
| ch-uart | 5 | **done** (comment-level) | sweepable |
| ch-io-datasheets | 5x | **done** (comment-level) | sweepable |
| ch-transistors | 6 | **done** (comment-level) | sweepable |
| ch-adc | 7 | ~~pilot — never passed~~ → **four closed comment passes** (see N-1) | floor-heavy |
| ch-debugging | 7x | ~~Gate 2, Petra pending~~ → **her typed edits in ~16 places** (see N-1) | floor-heavy |
| ch-timers-interrupts | 8 | reviewed; **Day 8 diff is HER hand-pass** | floor-heavy |
| ch-gpio-interrupts | 9 | **Gate 2, Petra pending** | **freer hand** |
| ch-i2c | 9x,10 | **Day 9x + Day 10 diffs are HER hand-passes** | floor-heavy (Day 10 = her full prose pass) |
| ch-motors | 11,11x,12 | Day 11 **done+passed**; 11x/12 not | mixed |
| ch-accelerometers | 13,13x,14 | heavily commented (pass 1–4 applied) | floor-heavy |
| ch-servos | 15,15x | **done+passed** | mostly her floor |
| ch-photosensors | 16 | **book passed** (3 passes) | mostly her floor |
| ch-ble | 17 | **done+passed** | mostly her floor |
| ch-power | 17x | **done+passed** | mostly her floor |

---

## Part B — the proposed contract

One rule per mechanic, written so a linter can check it. Link rules and
mechanics only; voice rules stay Prompt 3's job (Part B ends with the ranking,
not voice rules).

### Link rules

**C-1 — Every RM mention in book prose links to `external/stm32c031_rm.pdf`.**
The link anchor is the **designator token**: "RM0490" when it is present in the
sentence, otherwise the phrase "reference manual". The **`§` number and any
Table/Figure number stay OUTSIDE the link, as plain text**, so the precise
location remains visible and teachable (P-11) and does not turn blue.

- Canonical first mention in a subsection: *"the reference manual, [RM0490]
  §17.4, Table 40"* — link on "RM0490".
- Where prose uses the phrase alone: *"the [reference manual]"* — link on the
  phrase.
- **[APPROVED Q1]** The anchor is the designator only — not the whole "RM0490
  §17.4" string, and never the § / Table number.
- **[APPROVED Q2]** Canonical phrase: **"the reference manual (RM0490)"** at
  first use per subsection, "RM0490 §N" thereafter (kills the four competing
  display forms and the 45/34 lowercase/capitalized split). Capitalize
  "Reference Manual" only when it opens a sentence or when no "RM0490"
  accompanies it, per L-14.

**C-2 — Every datasheet mention in book prose links to its specific PDF.**
Display form on the first specific mention per subsection: **"`<Part>`
datasheet"** (e.g. "TB6612FNG datasheet", "LSM303AGR datasheet",
"STM32C031C6 datasheet" → `external/stm32c031_datasheet.pdf`; component parts →
`external/datasheets/<name>.pdf`). The generic "the datasheet" (120×), used as a
back-reference after the part was named in the same subsection, stays **plain
text**.

- **[APPROVED Q3]** Document-number display: friendly form for the MCU datasheet
  (DS13867 → "STM32C031C6 datasheet") and the Nucleo manual (UM2953 → "Nucleo
  user manual"); keep "AN-1057" as-is, since an application note is genuinely
  known by its number — display "AN-1057, Using an Accelerometer for Inclination
  Sensing".

**C-3 — Link scope is once per subsection, on first specific mention.** Not
every mention (that would make Day 5x and the accelerometer chapter a sea of
blue), not once per chapter (a reader landing on a subsection page from search
must still get the link — B-11b). Lintable: within each subsection, the RM and
each datasheet named there must be linked at least once. **[SETTLED]** — follows
from B-11b (each subsection stands alone).

**C-4 — No `#page=N` page anchors.** Evidence (tested this session against the
real hosted PDF): the RM ships a **1192-entry bookmark outline** — full
click-navigation is already built into the file. The `§` number is **not** the
PDF page number: §1 begins on **PDF page 35**, and the offset is not constant
(the RM restarts its own page numbering), so every anchor would need a manual
per-citation page lookup across ~90 mentions, and would **silently break** if ST
reissues the PDF. Embedded/in-app PDF viewers (including this environment's) also
**force-download** the PDF and skip the fragment entirely. Linking plain, with
the visible "§20.3.1, Table 40" as the navigation aid, is more robust and is the
P-11 teaching point anyway.
- **[APPROVED Q4]** No page anchors.

**C-5 — No link in any projected surface.** No `<url>` and no `<xref>` inside a
`<slide>` block, or inside any `<activity>`/`<task>`/`<instructor>`/`<table>`/
`<figure>` block that a deck refs. Build the ref'd-id set from
`assets/decks/*.json` before and after. Where the reading needs the link, it
lives in the surrounding prose (per AUTHORING-slides.md). **[SETTLED]** — this is
the existing standing rule; the sweep enforces it and fixes the one live
violation (`sl-day10-af6`, A.4).

### Mechanical rules

**C-6 — RM sections always carry the designator.** A section/figure/table number
that refers to the reference manual is written "reference manual §N" or
"RM0490 §N", never bare "section 17.4" (which reads as a section of this book —
L-14). The book's own sections use `<xref>`, never a typed "section N". Lintable:
a typed "section N.N" in prose must be preceded by "reference manual"/"RM0490"
(or datasheet) within the sentence. **[SETTLED]** — this is L-14, currently
unenforced; ~35 bare RM-section mentions violate it.

**C-7 — Section marker is the literal `§`.** Replace the 7 `&#167;` entities.
One space (or nbsp) between a number and its unit: "5 V", never "5V" (~29 prose
fixes, mostly ch-servos); micro sign "µ", never ascii "u". **[SETTLED]** —
corpus is 166:7 and 431:29 in favor of the majority form; CLAUDE.md already
fixes the unit *character*, this adds *spacing*.

**C-8 — `<xref>` stays bare (auto-numbered).** The 2 `text=` overrides are
reviewed and removed unless there is a reason. Low priority. **[SETTLED]**.

### Lintable rules to add in Prompt 2 (new L-rules, next free number is L-19)

- **L-19** — an RM or datasheet mention in book prose (outside a projected
  block) with no link to it anywhere in its subsection. (C-1, C-2, C-3.)
- **L-20** — a malformed link display form: RM link whose anchor is not
  "RM0490"/"reference manual", or a datasheet link not of the "`<Part>`
  datasheet" shape; a `§` written as `&#167;`; a number-unit pair with no space;
  a bare "section N" meaning the RM. (C-1, C-2, C-6, C-7.)
- **L-21** — a `<url>` or `<xref>` inside a `<slide>` block or inside any block
  a deck refs. (C-5.)

Document all three in `AUTHORING-book.md` and wire them into
`scripts/check_rules.py` so the uniformity survives future edits.

### Part B, voice half — the distance ranking (evidence, not chronology)

`checker-voice` ran in survey mode over the 3 oldest and 3 newest chapters. The
gap Petra named is real, systemic, and consistent in *kind*:

| Chapter | Age | Voice distance | Dominant divergence |
| --- | --- | --- | --- |
| ch-uart (Day 5) | old | **5/10** | "we'll" absent (0 vs 9 "you will"); opens on absence; rhetorical connectives ("Here is the catch:") |
| ch-transistors (Day 6) | old | **4/10** | "we" absent (systemic); CMSIS/KVL unexpanded; no goal-opening |
| ch-intro-blinky (Days 1–2) | oldest | **3/10** | opens on absence (×3); weekday-as-actor (S-20); few "we" |
| ch-servos (Days 15–15x) | new | **1/10** | none material — target register |
| ch-photosensors (Day 16) | new | **1/10** | none — the calibration target |
| ch-power (Day 17x) | newest | **1/10** | none — the floor the others move toward |

The **through-line** across every old chapter: (1) **"we/we'll" absent** —
shared class work narrated impersonally or as "you will" (S-13); (2) **openings
on what is absent/limited** rather than the goal (S-22); (3) scattered
aphoristic tells and slogan endings; (4) **unexpanded acronyms** at first use.
The newest chapters get all four right. This is a repeatable pass, not a
per-chapter reinvention — which is why Prompt 3 can be ordered by distance and
run a few chapters at a time.

---

## Part C — the worklist

### C.a Prompt 2 (links + mechanical) — book order, one commit per chapter

Mechanical normalization is low-risk and uniform, so **book order** (the
`main.ptx` sequence) gives clean per-chapter commits Petra can review in reading
order. Heaviest link surface flagged with ●.

| # | Chapter | Days | Passed | RM mentions | datasheet mentions | no-space units | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ch-intro-blinky | 1,1x,2 | done | 2 | 0 | 0 | light |
| 2 | ch-switches | 3,3x,4 | done | 4 | 0 | 0 | light |
| 3 | ch-uart | 5 | done | 5 | 2 | 0 | ● 5 RM, 0 links |
| 4 | ch-io-datasheets | 5x | done | 0 | 36 | 0 | ● datasheet chapter, 0 links; check projected activities |
| 5 | ch-transistors | 6 | done | 0 | 20 | 0 | ● 20 datasheet, 0 links |
| 6 | ch-adc | 7 | pilot | 7 | 18 | 0 | ● 3 urls in activities — check deck refs |
| 7 | ch-debugging | 7x | pending | 9 | 1 | 2 | RM 9, 1 link |
| 8 | ch-timers-interrupts | 8 | her pass | 24 | 1 | 0 | ● 24 RM, 0 links |
| 9 | ch-gpio-interrupts | 9 | pending | 28 | 0 | 0 | ●● biggest RM gap, 0 links |
| 10 | ch-i2c | 9x,10 | her pass | 31 | 64 | 0 | ●● + **fix `sl-day10-af6` url-in-slide** |
| 11 | ch-motors | 11,11x,12 | mixed | 27 | 39 | 8 | ● + bare-"section 17.4" L-14 cluster (27) |
| 12 | ch-accelerometers | 13,13x,14 | commented | 1 | 96 | 1 | ● datasheet-heavy (many generic) |
| 13 | ch-servos | 15,15x | done | 3 | 29 | 20 | ● heaviest unit-spacing fixes |
| 14 | ch-photosensors | 16 | passed | 4 | 24 | 3 | web links out of scope |
| 15 | ch-ble | 17 | done | 10 | 5 | 0 | web links out of scope |
| 16 | ch-power | 17x | done | 18 | 4 | 0 | ● 18 RM, 1 link |

Before each commit: all five targets rebuilt; `check_rules`, `check_deck`,
`check_starters`, `check_instructor_only`, `image_ratios --check` green.

### C.b Prompt 3 (voice) — voice-distance order, worst first, 2–3 per session

Front-load the chapters that least sound like her and the never-passed pilots.
Group by session. **Measured** distances are from the survey; **est.** are
extrapolated from age + whether a hand-pass specimen exists (to be confirmed as
each chapter's survey runs at the head of its session).

| Session | Chapters | Voice dist. | Comment surface | Hand |
| --- | --- | --- | --- | --- |
| 1 | ch-uart (5), ch-transistors (6) | 5, 4 (measured) | medium, ~10 | **DONE** 2026-09-07 (`d695cd3`, `bee8159`) |
| 2 | ch-switches (3–4), ch-io-datasheets (5x) | 0.19 and 0.00 measured | heavy: 62 comments over three rounds | **DONE** 2026-09-15/17 (`e338219`, `4f528a5`, `dd990e5`, `2a4c596`, `47c7fcf`, `72b285f`) |
| 3 | ch-adc (7), ch-debugging (7x) | 4 and 5, measured | medium | **DONE** 2026-09-14/15 (`24da861`, `49f332b`, `faf99b1`) — floor-heavy, not free |
| 4 | ch-intro-blinky (1,1x,2), ch-gpio-interrupts (9) | **0.12 and 0.54, measured 2026-09-17** | blinky: high; gpio: low | blinky sweepable and the worst ratio in the book; gpio is **NOT a freer hand** — see N-5 |
| 5 | ch-timers-interrupts (8) | ~2–3 est. | est. low | **floor-heavy** (Day 8 is her diff) |
| 6 | ch-motors (11–12), ch-i2c (9x–10) | ~2 est. | est. low–medium | floor-heavy (Day 10 is her full pass) |
| 7 | ch-accelerometers (13–14), ch-ble (17) | ~2 est. | est. low | floor-heavy / mostly hers |
| — | ch-servos (15), ch-photosensors (16), ch-power (17x) | 1 (measured) | ~0 | **skip — these are the target** |

The three 1/10 chapters are the calibration reference, not rework candidates.

Every touched `<slide>` block triggers a full deck fit-sweep at 1600×900 (per
the charter and AUTHORING-slides.md), and no link the sweep moves lands in a
projected surface.

---

## Carry-forward notes for the remaining Prompt 3 sessions

Added 2026-09-15, after session 3 (ch-adc, ch-debugging). Both notes cost that
session real time; read them before starting a chapter.

### N-1 — The passed/unpassed columns understate the floor. Verify per chapter.

Part A.6's "Petra status" and Part C.b's "Hand" column were both built from
`CHAPTER_PROCESS.md`'s status table, and for session 3's two chapters the table
was wrong in the direction that matters — it promised a freer hand than the
history supports:

| Chapter | Worklist said | What the history shows |
| --- | --- | --- |
| ch-adc | "pilot — never passed" | **four** of her review passes, all closed, 31 items in `reviews/day7-petra.md` ("Day 7 has no open items"), plus an earlier S-11…S-19 deck voice pass in `8ed0875` |
| ch-debugging | "Gate 2, Petra pending" | **her own typed edits in ~16 places**, committed as `9c3863c` with the message "Petra's direct book edits … are kept as written", plus a pass-5 round in `0ece562` |

A chapter marked "done (comment-level)" is no more reliable in the other
direction. **Before editing any chapter, run all three of these:**

1. `ls reviews/ | grep -i <day>` — a `dayNN-petra.md` or gate file lists what she
   asked for, item by item. Her *asks* are floor even where the wording is ours.
2. `git log --oneline -- source/<chapter>.ptx` and read the messages. A commit
   saying "fold in Petra's review edits" or "apply her pass-N comments" means
   sentences in that file are hers verbatim.
3. `git log -L <start>,<end>:source/<chapter>.ptx` on any sentence a finding
   lands on, *before* rewriting it. Unwrapped long lines in an otherwise wrapped
   paragraph, and typos, are both tells that a sentence was pasted from one of her
   comments — session 3 found her wording that way twice, including the sentence a
   finding wanted to replace at the head of ch-adc.

Where a finding lands on her wording, the Day 10 specimen shows the move that is
always available: she *added* a goal sentence at the head of the chapter and left
the draft's sentence standing. Add before, don't replace.

### N-2 — Sweep back her rulings that postdate the chapter, but check which form is banned.

The four divergences Part B names (absent "we", openings on absence, unexpanded
acronyms, aphoristic tells) are not the whole gap. The early chapters also
predate standing rulings she made in September, and those were applied going
forward and never swept back. Measured 2026-09-15:

| Ruling | Banned form | Remaining, by chapter |
| --- | --- | --- |
| "Never say write" (2026-09-06) | `write down`, `in writing`, `write a sentence` | ch-i2c 6, ch-motors 4, ch-accelerometers 3, ch-gpio-interrupts 3 — **ch-switches 0, ch-io-datasheets 0** |
| L-15 location verbs / meet-met | a **register, pin or value** that `sits`, `lives` or is `met` | ch-switches 2, ch-io-datasheets 1 (calibration chapters run 0–1) |

**The trap, and it is the important half of this note:** asking a student to
*write code or an equation* is legitimate and is not what she banned.
`ch-servos.ptx:983` — "Write the expression that maps `pot_value` onto
`pwm_value`" — survived her pass in a 1/10 chapter. So did
`ch-io-datasheets.ptx:246`, "Write the transfer function", and
`ch-switches.ptx:809`, "Write the C statements that…". Only prose-production
phrasing is banned: "write down", "in writing", "write a sentence". Grep for
those three, not for `write`.

Same caution on L-15: session 3 fixed "the ADC **sits** on the APB" and "the two
halves of the track **sit** in parallel", and deliberately kept "the wiper
**sits at** half the supply" (×3), which is standard voltage idiom rather than the
location personification she struck. `CHAPTER_PROCESS.md` records a sweep that
flattened `plants` to `holds` on a slide where she had deliberately left the
metaphor; an over-broad rule is how that happens.

### N-3 — What the two committee members actually catch, so ask them the right thing.

Session 3's gates earned their keep in a specific way worth reusing:

- **checker-voice, run a second time as a confirmation pass**, caught five
  problems the *edits themselves* created — a new opener that copied the chapter
  intro almost verbatim, a count that disagreed with its own four-row table, an
  orphaned pronoun, a hedge that weakened a claim S-16 says to keep at full
  strength, and two slides still projecting metaphors the prose had just lost.
  None of these existed before the sweep. Run it again after applying, and tell it
  which deviations from its own report you made and why.
- **learner-in-the-room overruled a rule application.** It ruled that removing a
  reassurance line from the debugger's failure slide was wrong, because the
  presenter note says it once at the start of the part while the slide is the
  surface up for the whole eight-minute failure window. It was restored. Give it
  the specific change you are least sure of and ask it to judge that one hard.
- One checker-voice finding was **rejected after direct verification**: it
  reported two `<url>`s reaching the projector through figure captions, but a
  `<slide ref="fig-…">` that supplies its own `<caption>` replaces the book
  caption, so the links never render. Verify a projected-link claim in the player
  (`[...document.querySelectorAll('#ref a')]`) before editing a figure caption.


### N-4 — Her deck review will find figure and layout faults, not just voice.

Session 3 delivered two swept chapters and then took **31 review comments
across four rounds** on the two decks. Almost none were about register. What
they were about:

- **Captions used for content.** Three separate comments. A `<slide>`
  `<caption>` renders small, grey and centered; anything a student must read
  belongs in a `<p>` or `<li>`. An image-dominant (`figure-focus`) slide hides
  the body and blows the image up — adding body text plus `stack="yes"` is the
  fix for both "this is ginormous" and "why is this so small".
- **ASCII pseudo-math in a `<program>` block.** "V_ref / 2^B",
  "floor(volts x 4096 / 3.3)" — she asked for real typeset math twice in one
  session. Anything mathematical goes in `<m>`, never a code block.
- **Rasters that upscale.** `adc-sar-block.svg` was a 500x287 PNG drawn at
  683x392 and then scaled to slide width, so its baked-in labels projected
  fuzzy; it also carried a third-party watermark. Grep projected figures for
  `<image ... base64` and compare the PNG's real pixel size against its drawn
  size before a deck ships.
- **Figures read as diagrams.** After redrawing that figure I checked it for
  label collisions and passed it; she then found four faults I had not looked
  for — connector lines running *through* labels, an arrow landing lower on a
  comparator than the symbol's convention puts it, a label with no clear
  referent, and a waveform too shallow to read. Trace every wire, check each
  label against the thing it names, check symbol conventions.
- **Rules the sweep should have applied and did not.** B-11e bans Arduino
  comparisons outright, and `sl-adc-registers-intro` still opened "If you have
  used an Arduino, `analogRead(A0)` did five things for you invisibly" until she
  cut it. Before delivering a chapter, grep it against the **whole** B and L
  list, not only the four divergences Part B names.
- **Two PreTeXt traps, each costing a render.** Bare text in an `<li>` that also
  holds a nested `<ul>` is silently dropped, exactly as in `<activity>` before
  `<task>` — wrap it in `<p>`. And a ref'd `<table>` keeps its `<title>` on the
  wall by design, so if that duplicates the slide title the slide must carry its
  own `<tabular>` (PreTeXt requires a title on `<table>`).

None of this is lintable. The only thing that caught any of it was opening the
slide and reading it, which is why the charter says *look*, not *measure*.

---

## Decisions (approved by Petra 2026-09-14)

**Settled by the corpus:** literal `§` over `&#167;`; one space in "5 V"; bare
auto-numbered `<xref>`; link once per subsection; RM sections always carry the
designator (L-14); no link in any projected surface (and the `sl-day10-af6`
violation gets fixed).

**Her calls — all approved as recommended:**

1. **Q1 — yes.** Link only the designator ("RM0490"/"reference manual"); leave
   "§17.4, Table 40" as plain visible text.
2. **Q2 — yes.** Canonical RM phrase "the reference manual (RM0490)" at first use
   per subsection, "RM0490 §N" after.
3. **Q3 — yes.** Datasheet display "`<Part>` datasheet"; friendly names for
   DS13867 and UM2953, keep "AN-1057".
4. **Q4 — yes.** No `#page=N` page anchors.
5. **Q5 — yes.** Voice-sweep the "done/passed" early chapters too; floor = her
   comment/slide wording + the three frozen specimens, not every sentence.
6. **Q6 — worst-voice-first.** Prompt 3 runs in the Part C.b order as written.

Part B is the binding contract. Next: Prompt 2 in a fresh session (the exact
prompt is in `plans/STYLE-SWEEP-PROMPTS.md`).


---

## Carry-forward notes from session 2 (ch-switches, ch-io-datasheets)

Added 2026-09-17.  Session 2 ran to **62 of her comments across three rounds**
after delivery, which is more than sessions 1 and 3 combined.  Most of that was
avoidable, and these notes are why.

### N-5 — The worklist's "Hand" column is wrong again, and this time in the direction that bites.

N-1 said to verify per chapter.  Do it for session 4 too, because the table is
wrong about **ch-gpio-interrupts**, which it calls a *freer hand*:

- `0b0bba9` is **"Petra's hand pass over the Day 9 reading and opening slides"**,
  and its commit message is itself a voice specimen: she systematically removed
  **personified hardware** ("carrying the news to `main()`" → "communicating
  with", "none of it cares" → "none of it changes", "gets around to looking" →
  "checking"), **every course-internal day reference in student-facing text**
  ("On Day 8" → "Last week", "the Day 3 idiom" → "the same one we used
  before"), and **the dramatized framing** around the wiring check.
- `88d11e3` is "Apply Petra's Day 9 slide review", fourteen items.
- `reviews/day9-gate2.md` exists and is a full panel review.

So Day 9 is **floor-heavy**, and `0b0bba9` should be read as a fourth specimen
before touching it.  ch-intro-blinky is the opposite: no `reviews/day1*` or
`day2*` file, no comment-archive entries, and its only her-material commit is
`c847272` ("Give Day 1X the sample solution Petra already wrote").  That one is
genuinely sweepable, and at **0.12** it is the worst we/you ratio in the book.

### N-6 — Measure the ratio with comments and `<instructor>` blocks stripped, or the number is wrong.

Session 2 reported ch-io-datasheets at 1.84 and was corrected by its own
confirmation pass: the real student-facing figure was 0.69.  The raw grep had
counted XML comments and instructor blocks, where "we" is the presenter talking
to herself.  Strip `<!-- -->` and `<instructor>…</instructor>` first.  The
calibration band, measured that way: **ch-photosensors 0.41, ch-power 0.73,
ch-servos 0.83**.  Anything in 0.4–0.85 is done; do not chase a higher number.

### N-7 — The Browser pane cannot measure fit, and fails silently in the direction that says "fits".

When the pane is hidden the browser suspends layout, so **every `clientHeight`
reads 0** and the snippet in `AUTHORING-slides.md` answers "fits" for a slide
that is 200 px over.  Screenshots also refuse, with "the page is not
compositing frames".  Session 2 lost a round to this.  Drive **headless Chrome
over raw CDP** instead — Node 22 has a built-in WebSocket client, so no
puppeteer install is needed:

```
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless=new --remote-debugging-port=9333 --user-data-dir=<tmp> \
  --window-size=1600,900 --hide-scrollbars --force-device-scale-factor=1 \
  --disable-background-timer-throttling --disable-renderer-backgrounding
```

then `Page.navigate` / `Runtime.evaluate` / `Page.captureScreenshot` (which
takes a `clip` rect, so it crops her bboxes directly).  Two further points the
session learned:

- **Report the last item's clearance, not just the body overflow.**  A
  `room="yes"` slide reports 17 px "over" with the final bullet clear by 6 px —
  that is the writing space below the last item and nothing is lost.  Only
  `last.getBoundingClientRect().bottom > body.bottom` is a real clip.  Session 2
  trimmed her wording for one of these before measuring properly.
- The deck servers in `.claude/launch.json` are 8351/8354/8355; her own
  `preview-slides.sh` is on 8352 and may be the only one up.  Check with `lsof`
  rather than assuming.

### N-8 — To read a terse comment, intersect her bbox with each word's rect. Do not crop screenshots.

Two thirds of her comments are one or two words against circled text
("capacitor", "in", "then", "will", "sample").  The cheap, exact method: walk
the text nodes, `Range` each word, and keep the words whose rect overlaps the
stage-scaled bbox; report the enclosing `<li>`/`<p>` too, so the replacement
lands in the right sentence.  Walk `document.body` and skip `#bar`, not `#ref`,
or the glue slides (`type: "notice"`, `"agenda"`) come back empty.  Three
comments on one slide title composed into a single new title that way —
"Delete the" + "sample" + "will" over *The questions a datasheet has to
answer* → **"Sample questions a datasheet will answer"**.

### N-9 — Mirror every fix into both surfaces in the same edit, and audit with a real parser.

The single thing she was most annoyed about: *"you haven't carried the slide
corrections to the book"*, and then *"you need to carry the fixes from the
slides into the book sections"*.  Five corrections had been applied to the
projected half only, including a sentence she had already called wrong on the
slide two rounds earlier.  Fix the pair in the same edit, always.

When auditing, **do not count `<slide>` tags by hand**.  A hand-rolled counter
missed one closing tag, treated the whole rest of the file as slide content, and
returned an almost-clean audit that was false.  Use `xml.parsers.expat` with
`CurrentLineNumber` to get each slide's exact line span, blank those lines, and
grep what is left.

### N-10 — Her old decks are not permanently safe, and she may edit the source herself.

- **A live comment overrides her own old deck.**  Session 2 restored
  *"Debouncing consists of delaying the input to the pin until the bouncing
  stops"* from her `Day03x` slide 12 as P-12 reuse; she then marked it *"Ummm
  WHAT?  Not really correct."*  P-12 makes her old wording the preferred
  starting point, not a shield.
- **Check `git status` before starting.**  She rewrote a whole section directly
  in the working tree and said so in a comment — *"I ended up rewriting this
  whole section myself, so ignore comments 1 and 2.  But please improve on my
  exposition, fix typos, make it more understandable"* — which both moots
  earlier comments and, unusually, licenses editing her prose.  Read the queue
  in `ts` order for exactly this reason.
- **A corpus-wide ruling means corpus-wide.**  "Spell out capacitor everywhere,
  never write cap", "get rid of the word idiomatic everywhere", and "can you
  generally (as in everywhere) increase the font size of these captions" each
  needed a grep over all sixteen chapters and all 28 decks, not the chapter in
  hand.  The caption change touched every deck, so all 28 were re-swept.

### N-11 — One open ruling, for her, before session 4 touches it.

Her Day 9 pass removed **every course-internal day reference from
student-facing text** ("On Day 8" → "Last week").  That ruling lives only in
`0b0bba9`'s commit message; it is not in `AUTHORING-book.md`, and **L-11 still
says the opposite** ("on Day N", never "in Day N").  Measured 2026-09-17, with
slides, instructor blocks, notes and comments excluded: **49 student-facing "on
Day N" remain in seven chapters** — ch-motors 19, ch-accelerometers 8,
ch-timers-interrupts 8, **ch-servos 7**, ch-adc 4, ch-debugging 2,
ch-io-datasheets 1.  ch-intro-blinky and ch-gpio-interrupts have none.

That ch-servos, a passed 1/10 calibration chapter, still has seven is the
reason **to ask rather than sweep**: either the ruling is narrower than the
commit message reads, or it was simply never carried.  Put it to her as a
numbered question; do not decide it.
