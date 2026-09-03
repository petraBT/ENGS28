# Week 7 handover — where things stand after session 9 (updated 2026-09-02)

## Session 9 addendum (2026-09-02 evening): pass-5, five corrections — two of pass-4's fixes had misread her circles

She confirmed pass-4 misplaced a few of her annotations; five comments
this round, three of them corrections to pass-4's own edits, all
locations verified with the caretRangeFromPoint technique before
touching anything.

The round() bullet: pass-4's "casting straight to an int truncates.
You therefore need to cast..." had a dangling "therefore" (it hung off
the truncation sentence, which is circular) and had lost "toward zero"
in the over-wide delete. Restored and re-chained: "...truncates toward
zero. round() returns a double, and you therefore need to cast its
result for printing" — the therefore now hangs off the prototype's
double return, which is what her pass-3 "give the prototype so they
understand why the cast is necessary" wanted all along. Slide and book
both. The book paragraph's closer "That is what you want for an angle
headed to a display." is replaced with her wording: "This is how to
display the calculated angles on your screen." The float-cost sentence:
pass-4 had put "In addition" at the start of the slower-plus-flash
sentence; her circles actually split it — "This is slower than integer
arithmetic, and in addition, the library code takes up flash memory."
(slower is the direct consequence of software emulation; flash is the
additional cost). Slide and book both. And one comment landed on
ch-debugging (Day 7x): she replaced the debug-perspective capture
(slide15_img2.png, the file that had been sitting modified in the
working tree) with one whose halted-line highlight is blue, and circled
the caption's "green" — all five highlight-color mentions in
ch-debugging.ptx are now "blue" (the green Run button mentions are
correct and stay), and her new capture is committed with the text.

Rebuild, all four checks pass, every touched surface verified rendered.

21 comments this round: 9 on deck slides, 12 directly on book pages. Same
instruction as session 8: apply slide fixes to the matching book
paragraph too. Several of her annotations this round were single words
or short phrases circled at a precise point, not full replacement text
— resolved by querying the rendered DOM directly (`caretRangeFromPoint`
at the comment's stroke coordinates) rather than guessing from the
bounding box alone, after an initial pixel-offset estimate from a
screenshot proved unreliable. Worth remembering for next time: the
review tool's pin elements (`.review-pin`) sit exactly on the circled
point, so temporarily setting `pointer-events: none` on them and then
walking the underlying text node's offset is far more precise than
reading coordinates off a screenshot.

By location: `sl-day14-tilt-single`'s Sensitivity bullet is reworded
again — she flagged that my session-8 rewrite ("So the slope is... This
implies:") had dropped "The slope of sin θ is cos θ" and asked for it
back, and separately asked (a second time) that the 17 mg/90° and
noise-swing bullets be indented under it. PreTeXt's `<li>` schema does
not support a nested `<ul>` (confirmed against the RNG: `<li>` is
either inline text or all-`BlockStatement` content, and lists are
neither), so both requests are resolved together by folding those two
bullets into the Sensitivity bullet's own flowing text — no longer
separate list items, so nothing needs indenting. `sl-day14-tilt-two`
and its book mirror: "sensitivity is constant at every angle" softens
to "sensitivity is good at every angle" (an honest claim given the
xz-/yz-plane assumption is only approximate), and the AN-1057 bullet
gains "just" ("just explains") to keep reinforcing that it presents
existing math rather than inventing it. The book's version of that
paragraph also drops a sentence about `ax`/`ay` being already-scaled
milli-g values ("I have no idea what you are trying to say in this
sentence. Delete.") — confirmed via DOM inspection that this, not the
xz-/yz-plane sentence, was her actual target. The single-axis AN-1057
sentence loses its trailing "the field uses" clause. `sl-day14-round`
and its book mirror: bullet 1 gains "back to an integer" and "use"
(now "convert back to an integer, then use %d"); bullet 3 drops the
redundant "toward zero, as Day 5's cast did" and rewords "You then
cast" to "You therefore need to cast". `sl-day14-cost` and its book
mirror gain an "In addition" transition into the software-cost bullet.
Part 3's activity order is fixed: the exclude-from-build how-to
paragraph had ended up sequenced *before* the activity whose first
task (re-run `whoami_test.c` unchanged) requires the file not yet
excluded — a regression from session 8's shortening pass, caught by
"This activity is listed after they have excluded whoami_test.c... so
that won't work anymore." Fixed by moving the activity first and
merging the how-to detail into its own exclude task, with the figure
and troubleshooting note following after. Part 5's diagnostic-checklist
lead sentence is rewritten plainly: "If the program runs but the output
is not what you expect, follow these steps to narrow down where the
error might be:". Part 9's book lead paragraph is rewritten to actually
match `sl-day14-float`'s wording from session 8, which I had failed to
mirror at the time ("You didn't apply my slide fixes here.") — logged
as the thing to double-check going forward: a comment that only touches
one surface (there, the book, removing a UART digression) does not
mean the OTHER surface's most recent wording change was already
carried over; check both, every time. `subsec-accel-ref-float`'s
closing sentence drops the odd "and the trigonometry needs fractions"
for "so a float's 24 lose nothing: floats it is."
`subsec-accel-ref-mems` switches from plain "C1"/"C2" to subscript
`<m>C_1</m>`/`<m>C_2</m>` throughout its prose, caption, and the
`capacitive_pickoff_differential.svg` figure itself (converted to
tspan-based subscripts matching the house style already used in
`tilt_single_axis.svg`); `V_exc` and `Q = CV` picked up the same `<m>`
treatment along the way, being the same class of issue in the same
section.

Full rebuild, all four mechanical checks pass, no new PreTeXt warnings.
Verified every touched slide and book page against the rebuilt output
(with a browser cache-buster on the book pages after an earlier check
was silently reading a stale cached page).

### Ask-Petra list, unchanged from session 8

Still open: the plain-view CoolTerm screenshot (reminder standing, no
accelerometer set up currently) and the control-register blur once it
arrives; the negative-raw-print question and the padding-bits check
(both wait on hardware); Q3 (the wrong-address print, at her pace); and
Part 7's real chart-view minutes in class.

## Session 8 (2026-09-02): her pass-3 comments applied — 14 deck, 14 book, mirrored both ways

28 comments this round: 14 on deck slides, 14 directly on book pages. Her
instruction going in: "be sure to apply the slide ones in the book also
as I have not double marked them" — every slide fix below was checked
for a matching book paragraph and fixed there too, not just where she
happened to circle it.

Two of her comments caught regressions from session 7's own work, not
refinements: the `task-day14-run-tests` statement linked to
`subsec-day14-stationary` for "last night's homework" — a forbidden
in-class xref, since `act-day14-run` is ref'd directly with no `<slide>`
wrapper, so the link was live on the projected slide ("no linking to
book sections from the slides... would kick me out of the slides in
class"). Fixed: plain text, no link. And `task-day14-exclude` claimed
the project would "still compile" right after excluding
`whoami_test.c`, before either driver function is finished — false,
since `lsm303agr_partial.c` has a blank stub and an incomplete
declaration at that point ("the partial driver will throw compiler
errors... don't invent stuff like that"). Fixed: the task now says the
`multiple definition of 'main'` error is gone but other errors remain.

A third comment reversed a session-7 decision: the paragraph landing
0x77/0x00 in student-visible book prose (added last session on the
reasoning that a book-only reader needs the values) is exactly what she
does not want — "You are giving away their work. Don't do that," and
"this is their lab work - we are not going to give this to them" on the
lead-in paragraph's "we'll settle both now" framing. Both are reworded;
the settled byte values now live only in `ins-day14-settings`,
instructor-only, never in student-facing running text, even after the
in-class reveal. This appears to be a standing rule (homework answers
stay out of student text permanently), not a pre-reveal-only
restriction — noted in `no-em-dashes-whole-sentences`-style memory for
next time.

Everything else, by Part: Part 3's exclude-instructions paragraph is
cut down ("too wordy... they are not babies"). Part 4's
`act-day14-registerwrite` drops its lettered `<task>` wrapper for a
plain `<statement>` (no sibling task, so no reason for an orphan "(a)"),
matching `act-day14-tilt-commit` and `act-day14-accelinit`. Part 5's
diagnostic-ladder paragraph becomes a four-item checklist, matching
`sl-day14-ladder`'s structure ("Too much prose. Make this a checklist
like on the slides"). Part 8: the AN-1057 sentence no longer reads as
though Analog Devices invented the trigonometry ("They are just
presenting the math"); the two-axis assumption is restated in her exact
wording (tilt in the xz-/yz-plane limited, so gravity projects mostly
into the xy-plane) on both the slide and the book paragraph, which also
gains an "In addition" sentence on the three-axis AN-1057 extension,
mirroring the slide's new optional bullet; the single-axis slide bullets
gain the "so the slope is / this implies" connective phrasing and an
explicit "this slope determines the reading's sensitivity" sentence,
plus the near-0°-vs-near-90° contrast — note a true nested `<ul>` inside
`<li>` is not valid PreTeXt (confirmed against the RNG: `<li>` is either
inline text or all-block content, and `<ul>` isn't a `BlockStatement`),
so "indent these two" is approximated with plain top-level bullets
instead. Part 9: `sl-day14-float`'s two bullets take her fuller
phrasing; the book paragraph drops a UART/BRR digression she flagged as
"weird" here; `sl-day14-round` and its book mirror now name
`round()`'s prototype (`double round(double x);`) and contrast it with
a truncating int cast; `sl-day14-cost` and its book mirror reword the
FPU bullet to "computing with a float... is fast" on a processor that
has one, contrasted with the STM32C031C6 having none. The Reference
section's differential-capacitor subsection gets a new figure,
`capacitive_pickoff_differential.svg`, extending the existing
single-plate `capacitive_pickoff.svg` (same visual language: vertical
plates, `#444444` fill, the `arr2`-style arrow marker) to the real
two-fixed-plate structure, showing C1 and C2 and the ΔC = C1 − C2
relationship.

Full rebuild, all four mechanical checks pass, no PreTeXt warnings
introduced. Fit-checked slides 25, 39, 40, 43, 46, 47 and read every
touched book page's rendered text against the source.

### Ask-Petra list, updated

Still open: the plain-view CoolTerm screenshot (reminder standing, no
accelerometer set up currently) — **and now, when it arrives, the two
control-register readouts need blurring before it goes in the book**
(her 2026-09-02 comment, same reason as the Part 2 reveal); the
negative-raw-print question and the padding-bits check (both wait on
hardware); Q3 (the wrong-address print, at her pace); and Part 7's real
chart-view minutes in class.

## Session 7 (2026-09-01): her pass-2 comments applied, connecting prose complete

Her 11 pass-2 comments (all on the deck) are applied and archived.
Substance: task (a) of the settings comparison gains "datasheet's" for
consistency with task (b); the exclude-from-build dialog is circled on
Select All, in both the book figure and the slide, matching the
CoolTerm precedent; the register-write attempt drops a dangling
"first" with no stated follow-up; the reveal names why the write uses
`i2c1_memWrite()` and not `i2c1_byteWrite()`; the single-axis tilt
bullet says what the derivation is for and adds the near-0°
sensitivity contrast; the two-axis claim was checked against
`Lab7_ES28.pdf` (it does not say "hold it like a phone" or state exact
rest values, only that gravity must lie in the plane of the axes used
and that students must check their own board), so the text now says
exactly that instead of overclaiming; the cast explanation generalizes
to the rule she supplied (any operand cast before the division works;
only casting the finished integer result fails), replacing a narrower
one-true-placement framing, and "trap" is cut for a fuller statement of
the integer-division mechanism; and "A float spends its 32 bits" is cut
everywhere in favor of "The 32 bits of a float consist of," including
one occurrence in Part 9's own running prose that the fix had missed on
the first pass.

Then the book version of the in-class Parts: the last real gaps behind
the DELIVERY-2 markers are filled (Part 2's closing paragraph landing
0x77/0x00 in student-visible text, not just the stripped instructor
block; Part 7's motivating sentence for plotting at all; Part 8's lead
paragraph posing the day's last question; Part 9's lead paragraph
recalling yesterday's formula by name and xref). Every other marker was
already resolved by earlier passes, so all ten are now removed rather
than left as stale commentary. Read the whole section end to end as the
student book renders it (instructor blocks and slides stripped): every
Part stands on its own and the ten Parts read as one continuous
narrative. Full fit sweep and all four mechanical checks pass.

### Ask-Petra list, unchanged from session 6

Still open: the plain-view CoolTerm screenshot (reminder standing,
placeholder figure in the book), the negative-raw-print question and
the padding-bits check (both wait on hardware being set up again), Q3
(the wrong-address print, at her pace), and Part 7's real chart-view
minutes in class.

## Session 6 (2026-09-01): her Day 14 pass 1 applied — awaiting her next look

All 37 of her pass-1 comments (3 book, 34 deck) are applied and archived,
plus her five chat rulings.  The substance: the reading is retitled to
her scavenger-hunt intent and gains "The Rest of the Hunt" (four more
datasheet stops: Table 3's zero-g offset, Table 26's output registers,
§8.4's WHO_AM_I, §6.1.1's transfer tables) with two new lookup reading
questions; the Part 2 commit became a table comparison of the homework
values (no written commit, no "reveal" language) and her slide 6
(`accelRegisterSettingsInstructor.png`) is a second instructor slide;
Part 3 is one slide (her ruling) carrying the steps beside her fresh
`CubeIDEExcludeFromBuild.png` dialog, whose unchecked boxes make "click
Select All" the right instruction again (the book got a new
`fig-exclude-dialog`); Part 4's silent attempt lost its "or fresh" out;
the write-transfer beat was rewritten to her read-vs-write framing with
a new `i2c_transfer_read_vs_write.svg` (Table 22 above Table 20; Table
21 off the wall; the Day 13 SVGs untouched); the unverified tiny-printf
%x sign-extension claims came OUT (the hand check now uses the flat
positive reading); the ladder took her three wordings; Part 6's intro
is her sentence plus the header's whereabouts; the chart-view beat uses
her words ("In the View menu, select View Chart") over a circled
composite; the tilt sensitivity beat is bulleted and labeled; the cast
activity gained her part (b) casting review; three single-task
activities lost their orphan (a); "jobs" is "goals"; and
`lsm303agr_partial.c`'s Table-13 comment is corrected to Table 22 with
her approval.  Her whole-sentences rule is now applied CORPUS-WIDE
(her authorization, captions and checklists exempt): 30 fragments
fixed across eight chapters, including her own passed Reference
openers; L-15 gains meet/met ("we are not 'meeting' registers").
Deck is 50 slides, full fit sweep 50/50 after two layout fixes.

### Ask-Petra list from session 6

1. **REMINDER — the plain-view CoolTerm screenshot is still needed**
   (she asked to be reminded, 2026-09-01: no accelerometer set up right
   now).  The book carries a marked placeholder figure
   (`fig-coolterm-plainview`); drop the real capture at
   `assets/images/Day14-Accelerometer(2)/coolterm_plainview.png` — the
   banner line, `Accelerometer initialized!`, the two readbacks, and a
   few raw/mg line pairs — and only the `<image source>` line changes.
2. **How a negative raw reading prints** is deliberately unstated
   everywhere (her challenge on the %x claim was right: the course's
   printf is not in the repo and the claim was unverified).  When the
   hardware is next out: does a negative `accel_raw.x` print as four
   hex digits or eight?  One glance at the flipped-board output settles
   it, and the hand-check task can then gain its negative case back.
3. **Q3 unchanged, at her pace** (the wrong-address print).
4. **The padding-bits check** (do the unused low bits read as zero?)
   rides the same next-hardware session as item 2.
5. **Part 7's chart-view minutes**: watch the real time in class; if
   5 minutes still runs over, the 2 from Part 6 are the source.

### Recorded so later passes do not undo them (session 6)

- The Part 2 activity is a TABLE COMPARISON of homework values, not a
  written commit, and there is no "reveal" framing — her ruling
  ("This was their homework... How about comparing values at their
  tables instead?" / "are we going to reveal? I don't think so?").
  The two instructor slides confirm; they do not reveal.
- Part 4's attempt line reads "from your paper draft", full stop — no
  "if you have it, or fresh" ("Don't give them an out!").
- `i2c_transfer_read_vs_write.svg` shows Tables 22 and 20 only; Table
  21 is deliberately off the wall ("The writing multiple bytes is not
  something we use").
- No student-facing text asserts how a negative raw reading prints
  (unverified tiny-printf behavior; see ask item 2).
- The whole-sentences rule now overrides previously passed fragments
  corpus-wide, captions/titles/checklists/answer-options exempt; the
  corpus-wide EM-DASH sweep of pre-rule chapters remains unscheduled.

## Session 5 (2026-08-31): Day 14 is built, through Gate 2′ — awaiting her pass 1

Everything in `plans/day14-prompt.md`'s ordering ran: the Before Class
reading (the guided datasheet walk through CTRL_REG1_A §8.6 Tables 33–35
and CTRL_REG4_A §8.9 Tables 41–42 plus Table 14 §4.2.1 p. 27, all pasted
from the hosted PDF; the stationary-reading subsection in her decks'
framing; four lookup reading questions; the answers 0x77/0x00 nowhere in
it; Gate 1.5 voice probe applied), the in-class skeleton Parts 2–10 per
the plan (110 min, checkpoint minute 58; activities with instructor
reveals; DELIVERY-2 markers naming the owed connecting prose by id), the
chapter's full Reference section (all seven manifest items — C1/C2,
the header beside Table 26, the data format in all three modes, the
signed shift, zero-g calibration via AN-1057 Eq. 17, the three-angle
orientation from AN-1057 p. 7, IEEE 754 precision-versus-range), and
the 51-slide `assets/decks/day14.json`, fit-swept whole at 1600×900
(51/51) with every figure slide looked at.  Gate 2′
(`reviews/day14-gate2.md`: twelve reports, the synthesizer's 22-item
list applied and verified item by item) caught six correctness blockers
that had reached the draft: the reading's projection rule gave the wrong
sign for its own +1000 mg example; the 30° reveal's "axis the board
tilted toward rises" misread; the two-axis arctangent shipped without
the hold-it-upright-like-a-phone precondition (three reviewers
independently; the atan2(ax, ay) pair itself stands, Gate 1 F7); the
signed-shift example used a raw value normal mode cannot produce; the
"bug we met on Day 5" framing that ch-uart refutes (uart.c rounds, and
its division was exact); and round() printed as an int without the
(int) cast Lab 7's graded line needs.  Q7 closed in passing: the
current CoolTerm build carries "View Chart", matching her screenshot
(the View button on the toolbar).  **Stopped for Petra's pass 1 on
Day 14.  In-class connecting prose is a later session, from the slides
she passes** (the DELIVERY 2 markers name what each Part owes).

### Ask-Petra list from session 5

1. **`assets/starters/lsm303agr_partial.c` line 19** still cites
   "Table 13" (a magnetometer ODR table in the hosted PDF; the
   single-byte read is Table 22, and `whoami_test.c`'s copy is already
   corrected with your 2026-08-30 approval).  One word, your file, your
   call; the book prints the corrected citation meanwhile.
2. **A plain-view CoolTerm screenshot** of a successful run (banner,
   `Accelerometer initialized!`, the two readbacks, two or three
   raw/mg line pairs) — the thing the diagnostic ladder asks students
   to judge against is described only in words, while the chart view
   has two screenshots.  Drop path:
   `assets/images/Day14-Accelerometer(2)/coolterm_plainview.png`; only
   an `<image source>` line changes.
3. **The original Eclipse exclude-from-build screenshots, as two
   images** (menu, dialog).  On the wall the current portrait composite
   renders its menu text at 0.6–0.8 % of slide height.  Day 14 may only
   need the dialog panel.  Related: the screenshot's Select All button
   is greyed out (Debug/Release pre-checked), so the Day 1x and Day 8
   captions that said "click Select All" now say "confirm both are
   checked" — a pre-check capture would let them revert.
4. **Reference openers**: your new whole-sentences rule is applied to
   this chapter's Reference opener ("This section is lookup
   material…").  Your passed ch-i2c opener has the terse form — does
   the rule override it corpus-wide?
5. **One 30-second hardware check, whenever convenient**: do the unused
   low bits of the left-justified output actually read as zero?  The
   datasheet says "left-justified" and never states the padding value;
   nothing shipped depends on it, but the "zeros below" phrasing does.
6. **Part 7's chart-view beat**: logistics measured the first-time
   CoolTerm chart setup at 5–6 real minutes against 3 budgeted.  The
   beats are re-split inside Part 7 (2 modify + 5 chart + 4 experiments
   + 1 reveal) without touching the Part rows; if it still runs over in
   class, the 2 minutes from Part 6 are the right source and only you
   can move them.
7. **The reading's section title** is "Before Class: Configuring the
   Accelerometer" rather than your spoken "scavenger hunt" phrase
   (S-11; your passed reading titles are all descriptive).  Day 5x does
   use "Datasheet Scavenger Hunt" as an in-class activity title, so
   either is defensible — say the word and it flips.
8. **Q3 unchanged, at your pace** — nothing student-facing asserts what
   the program prints on a wrong-device-address NACK; the ladder's
   first rung was rewritten at Gate 2′ to stay inside that constraint.

### Recorded so later passes do not undo them (session 5)

- The two-axis tilt pair is **atan2(ax, ay)** with the held-upright
  frame stated beside it — a reviewer proposed atan2(ax, az) to match
  the flat-frame 30° reveal, and the fix is the frame sentence, not the
  axis pair (Gate 1 F7; Lab 7 is explicit).
- The reveal figure `ctrl_bytes_filled.svg` is instructor-only and
  deliberately after the commit; the four reading table figures carry
  no Setting callouts (P-15) — do not add them.
- `sl-day14-write-transfer` deliberately says "one byte longer than the
  write we captured on Tuesday": Tuesday's write was the read's first
  phase (no data byte).  Do not "simplify" back to "the same pattern".
- The ladder's first rung deliberately states no causal verdict for the
  `Could not connect` print (Q3, Day 13 gate item 23).
- Dissent recorded at the gate: the ladder slide names the four lead
  colors in words instead of carrying `fig-accel-bb` — if rung-1
  failures do not resolve in the room, the picture is the next thing
  to try.
- The signed-shift Reference example is −64 (0xFFC0), one normal-mode
  step; −16 is impossible there (raw readings are multiples of 64).

## Session 4 (2026-08-31): her pass 3 applied — Day 13x awaiting her next look

Her 22 pass-3 comments (7 slide, 15 book) are applied and archived, and the
slide-side changes are carried into the book where she asked.  The
substance: the worked 0xC000 example and the 0xE000 activity reveal now
both name low-power mode at ±2 g up front and run the top-byte route first
(the 16-bit route is the reveal's parenthetical check); the "Tomorrow we'll
check this on real boards" beat is deleted from slide and book; the
collapse gains her two cautions (the 4 g constant changes with the
full-scale range; a signed C type such as int16_t makes the two's
complement interpretation automatic) and the mg paragraph says `a` is a
signed integer, not an unsigned; "the accelerations along the three axes
arrive", "So if we want to read", "the different configurations in its
datasheet", "a quick review", "the table in <xref/> confirms", the
regardless-of-two's-complement clause on 0b0010, and the In-a-MEMS
rewrite are all in, slide and book both where both exist; the two
single-task activities (mass commit, sensitivity) are restructured as
plain statements so no orphan "(a)" renders, and the mass commit now
opens on `mass_spring_rest.svg` (her "initial picture").  The grey digits
in `one_byte_example.svg` and `data_format_rows.svg` are black.

**Her two new general rules are recorded and applied: no em dashes, and
whole sentences.**  Every em dash in Day 13x's student-facing text — book
prose, captions, slide bodies and table cells — is rewritten (commas,
colons, parentheses, or a sentence split); presenter notes keep theirs
(instructor-facing, never projected).  Earlier days were left as passed;
sweeping them is a separate, mechanical pass to schedule with her.

Her three deliveries this round are integrated: `lsm303agrBlockDiagram.png`
is the new base of `lsm303agr_block.svg` (whole diagram kept, per her
ruling — a clean accelerometer-only crop is impossible because the shared
I2C/SPI block spans both halves), `lsm303agrBreakoutSchematic.png` is the
new base of `breakout_schematic.svg` (five callouts re-laid, all landing
on their targets; STEMMA block back in frame), and her go-ahead fixed
`lsm303agr_partial.c` to "6 control registers (Datasheet, Sections
8.6-8.11)" (check_starters still passes).  The MEMS accelerating panel is
rebuilt per her condition for flipping the arrows: the old "← Acceleration"
arrow is erased and the panel now carries a right-pointing arrow labeled
"the case and its fixed plates accelerate" plus "the mass gets left
behind" — caption and presenter note tell the same story.  Her two video
links are in the book as figures: the smartphone up-from-down video
(KZVgKu6v808) closes the physics subsection, and the MEMS gyroscope video
(XsjvaYAFN1M) follows the applications paragraph.  Deck re-fit-swept at
full stage size: all 35 slides fit.

## Session 3 (2026-08-30): Day 13x is built, through Gate 2′ — awaiting her pass 1

Everything in `plans/day13x-prompt.md`'s ordering ran: the in-class skeleton
for `sec-accel-day13x` (Parts 1–5 + close per the plan's 2+1+11+3+9+19+3+2 =
50; three committed activities — the mass commit with the level-app hook,
the sensitivity derivation against the MASKED table, the 0xE000 conversion
with the zero-g-offset stretch — each with a projected instructor reveal;
the §6.1.1 auto-increment quote and the byte-assembly paragraph written in
the book per B-8a; DELIVERY-2 markers naming what each subsection owes, by
id), the figures (her block diagram, breakout schematic and annotated
sensitivity table rebuilt with `pptx_annotate.py`; a masked-column commit
variant derived from her table; hand-authored SVGs for the mass-spring
derivation and its at-rest commit variant, the capacitive pickoff, the
three-mode bit rows with her per-row equations, and the 4-bit/16-bit
sign-weights figure; the auto-increment slide reuses Day 13's
`i2c_transfer_reads.svg` — same base, never re-crop it in place), and the
32-slide `assets/decks/day13x.json`, fit-swept whole at 1600×900 with every
figure slide looked at.  Gate 2′ (`reviews/day13x-gate2.md`: eleven
reports, the synthesizer's 24-item list applied and verified item by item)
caught six correctness blockers that had reached the draft — six sense
capacitors captioned as three and a per-axis chain where the chip shares
one amplifier and one ADC through a MUX; ±40 mg quoted as the offset bound
where the row reads −80/±40/+80; CTRL_REG2_A called an analog filter
(§8.7 is high-pass); a presenter note calling WHO_AM_I a control register;
a caption sending students to a STEMMA connector the schematic crop had
deleted; and `/ 65536` on the formula slide where her `accel_test.c` uses
the shift.  It also moved the sign teaching onto a picture and re-routed
the worked 0xC000 example through the top-byte machinery (192 − 256 = −64;
−64 × 15.625 mg = −1000 mg) so no slide uses the a = 4g·raw/2¹⁶ formula
before the collapse derives it.  **Stopped for Petra's pass 1.  In-class
connecting prose is a later session, from the slides she passes** (the
DELIVERY 2 markers name what each Part owes).

### Ask-Petra list from session 3

1. ~~The breakout schematic composite~~ **RESOLVED — she delivered
   `lsm303agrBreakoutSchematic.png` (2026-08-31); the composite is rebuilt
   on it with all five callouts landing on their targets and the STEMMA
   block in frame.**
2. ~~`mems_mechanism.png`'s right panel~~ **RESOLVED by her pass 1
   (2026-08-31, comment 13: "You cropped out the second picture that
   shows the situation when the mass has moved") — both panels restored;
   her C1/C2 differential speaker-note content is now the slide's
   instructor note.**
3. **The §6.1.1 blockquote keeps the datasheet's "slave"** while the book
   says controller/target; a one-clause gloss now leads into it ("where
   its 'slave' is our target").  Confirm the gloss, or the quote can stand
   bare.
4. **The homework close is restored to your slide 19's three items** (the
   draft had folded the CTRL_REG1/4 item into the reading bullet).  If you
   want it at two, say so.
5. **Q3 unchanged, at your pace** — nothing in Day 13x touches the
   wrong-address print.
6. ~~(Gate 3′, A) the MEMS accelerating panel's arrow~~ **RESOLVED —
   her condition ("then we'll need to make it clear that the fixed plate
   is accelerating, and the moving plate mass gets left behind",
   2026-08-31) is implemented: the old arrow is erased and the panel now
   labels the case/fixed-plate acceleration and the left-behind mass.**
7. ~~(Gate 3′, B) `lsm303agr_block.svg` resolution~~ **RESOLVED — she
   delivered `lsm303agrBlockDiagram.png` (2026-08-31) and ruled the whole
   diagram stays (accelerometer and magnetometer are presented together in
   the datasheet); a clean accelerometer-only crop is impossible anyway,
   since the shared I2C/SPI block spans both halves.  The composite is
   rebuilt on her export.**
8. ~~The stale `lsm303agr_partial.c` comment~~ **RESOLVED — her
   go-ahead ("happy to go with 6", 2026-08-31); the file now reads "6
   control registers (Datasheet, Sections 8.6-8.11)".  Her note for the
   record: the count depends on how you count (there is also a temperature
   configuration register and the reference/data-capture one).**

### Recorded so later passes do not undo them (sessions 3–4)

- **Her general rules (2026-08-31, now standing): no em dashes, whole
  sentences.**  Applied throughout Day 13x's student-facing text; earlier
  days not yet swept.  Presenter notes are exempt (instructor-facing).
- The MEMS accelerating panel's labels ("the case and its fixed plates
  accelerate" / "the mass gets left behind") are her required condition
  for the arrow flip — do not simplify them away.
- The block diagram ships whole (both halves) by her explicit ruling; do
  not crop to the accelerometer half.

- ~~The MEMS figure shows only the at-rest panel~~ superseded by her
  pass 1: both panels are back (comment 13).  If anyone asks about the
  right panel's arrow direction, that conversation is hers to have — do
  not re-crop.
- The worked 0xC000 slide deliberately does NOT use a = 4g·raw/2¹⁶ — the
  collapse slide derives it one beat later (P-1); its note closes the loop.
- `sl-day13x-block` deliberately names no INT pin identifiers (cut at
  Gate 2′ over the voice reviewer's gloss option — three names used
  nowhere else).
- The Close section divider stays: `check_deck.py` attributes each beat
  to the preceding section entry, so cutting it folds the close's minutes
  into Part 5 and breaks the S-8 reconciliation.
- Dissent recorded at the gate: if the room stalls on the conversion
  commit anyway, learner-in-the-room's deck reorder (collapse and formula
  before the worked example) is the next thing to try — watch the
  completion spread on the day.
- Pre-existing, not this session's: `day11x.json` Part 5 reports a 1-min
  S-8 overshoot (row 5, beats 6) — it predates this session; flagged, not
  touched.


## Session 2+ (2026-08-30): her pass 1 is applied, the prose is written, Gate 3′ ran — awaiting her pass 2

All 37 of her pass-1 annotations were rendered, applied and archived
(`reviews/slide-comments-archive.jsonl`); her three new images are integrated
(`stemma.png` → the wiring figure's right panel, `Accel_bb.png` →
`fig-accel-bb`, `accelerometerSlide.png` → the hi-res AD2 pinout crop); the
two stale starter comments she approved are corrected (whoami_test.c Table 22;
lsm303agr.h REFERENCE_A r/w); the in-class connecting prose is written
(17 body paragraphs, under Day 11's yardstick); and Gate 3′
(`reviews/day13-gate3.md`, 7 reports + synthesis) ran with all 19 items
applied.  One recorded fallback was exercised: the transfer-patterns slide
measured below the legibility floor at every width, so it ships **split into
write/read halves** (`i2c_transfer_writes/reads.svg`, glosses enlarged in the
derived copies only; the shared book SVG untouched except the sanctioned
gloss-row nudge), with Part 5's diagram beat re-cut 4 → 2 + (1+1).  The deck
is 46 slides, fit-swept at 1600×900, every named slide looked at.

### Ask-Petra list (refreshed 2026-08-30, pass 2 applied)

1. ~~D0/D1 vs DIO0/DIO1~~ **RESOLVED by her pass 2 ("let's go with DIO0
   after all"): DIO0/DIO1 swept everywhere in Day 13 — bullets, captions,
   titles, notes, the break-it task.**
2. ~~`Accel_bb.png` display-free re-export~~ **RESOLVED — she delivered
   `accelerometer_noDisplay.png` (2026-08-30), now the `fig-accel-bb`
   image; captions reworked so nothing claims the display is in the
   drawing.  Red lead confirmed on +3V3 in the new export too.**
3. **Wednesday vs Thursday.** Your slide 32's printed line — kept verbatim as
   the homework slide's caption — says "Wednesday and Thursday"; its speaker
   note (and the book prose, and what Day 13x actually does) says
   tomorrow = theory, Thursday = data.  Which ships on the wall?
4. **DIO and VIN are never expanded anywhere in the book** (both appear bare
   in text you passed).  Expand on first use, or is bare the house style for
   instrument-panel and silkscreen labels?
5. **The AD2 pinout sheet is the ADALM2000's** (the AD2's silkscreen reads
   T1/T2, the sheet TI/TO).  Your slide 25 shows you have taught from it for
   years, so it ships — cropped from your hi-res export to the digital half.
   An AD2-native sheet at full resolution would be for next year, not this
   delivery.
6. **Q3 unchanged, at your pace** — nothing student-facing asserts what the
   program prints on a wrong-device-address NACK; Part 6's debrief paragraph
   stays owed on it (it lands in ch-i2c too when answered).

Resolved since 2026-08-27: the setup-photo ask (your three images cover it),
the two stale starter comments (your go-ahead, applied), the either-socket
confirmation (now in `fig-accel-wiring`'s caption), and the 3.3/5 V question
(your ruling — the board takes either logic level, the course sticks with
3.3 V — is now `fig-accel-wiring`'s caption wording).

## Session 2 (build Day 13) is DONE — the delivery is with Petra

Everything in `plans/day13-prompt.md`'s ordering ran: the chapter skeleton
for the whole week (rough content parked or deleted per ground truth §7;
Day 13x/14/Reference sections are placeholders whose TODO comments name
their sessions), the Day 13 Before Class reading (Gate 1.5 voice probe
applied), the in-class Parts 1–8 skeleton with activities and instructor
answers, the 43-slide deck (`assets/decks/day13.json`, fit-measured at
1600×900, every figure slide looked at), and Gate 2′
(`reviews/day13-gate2.md`: eleven reports, the synthesizer's 30-item list
applied and verified item by item — including two correctness BLOCKERs
that had reached the draft: a four-vs-three ACK count and an
"every acknowledge is an ACK" caption over a visible N).  **Stopped for
Petra's pass 1.  In-class connecting prose is a later session, from the
slides she passes** (the DELIVERY 2 markers in the source name what each
Part still owes).

### Ask-Petra list from session 2

1. ~~Re-export Waveforms B and C~~ **RESOLVED 2026-08-27 — Petra exports
   one way, so the gate's named fallback shipped instead**: B and C are
   split into write-half/read-half close-ups
   (`waveforms_capture_{b,c}_{write,read}.png`), projected on a close-up
   slide after the whole-strip view (C) and as the stretch reveal (B).
   The whole strips stay as the discovery and the rescue's marking
   target — do not merge the views back.  Capture A was re-cut tight to
   its single transaction and reads well.
2. **One setup photo** for Part 4: the breakout with its STEMMA cable, the
   SCL/SDA breadboard rows with the display still on them, the 3.3 V and
   GND feeds (never 5 V), and the AD2's DIO0/DIO1/ground leads landed.
   Her slide 9's Fritzing turned out to be a stale MPU-6050 drawing and
   was not used; the AD2-with-bundle product photo covers the day
   meanwhile.
3. **Stale comments in her files** (one-word fixes, book already prints
   the corrected values): `whoami_test.c` cites "Table 13" where the
   hosted PDF's single-byte read is Table 22; `lsm303agr.h` marks
   `LSM303_REFERENCE_A` as `r` where Table 26 says R/W, and cites
   "Sec 6, 7.1" where the hosted map is §7 Table 26.
4. **Two one-line confirmations**: the breakout's 3.3–5 V input tolerance
   (needs the schematic; the book currently avoids the claim), and "the
   STEMMA plug goes into either socket" (rests on the product photo).
5. **Q3 unchanged** — at her pace; the affected sentences are listed at
   the end of `reviews/day13-gate2.md` ("Ask-Petra list and handover").

### Verify-later list

- Reference Manual §23.4: whether the controller's final NACK on a read
  is NBYTES-driven — if confirmed, `sl-day13-memread-read`'s caption
  sharpens to name it (Gate 2′ item 25).
- Recorded so later passes do not undo them: L-17 is deliberately not
  applied to bus-protocol talk; the wall listings deliberately omit the
  `// 7-bit address` comment (P-15); capture C deliberately stays whole
  (the two-transaction count is the discovery) — if her re-export does
  not arrive and the room cannot read it, the write/read-half split is
  the named fallback.


Session 1 of four (per `plans/week7-prompt.md`) is **done**: ground truth,
the week arc, the three lesson plans, one Gate 1 over the whole week with
its 18-item list applied and verified item by item, and the three build
prompts. **No book prose and no slides were written** — that was the deal.

**Update 2026-08-27 — Petra answered the question list**, and her assets are
in the repo: `assets/datasheets/lsm303agr.pdf` (citations verified, ground
truth §3), the four real driver/test files in `assets/starters/` (what they
settle, §2), and her three full-resolution Waveforms captures in
`assets/images/Day13-I2C(3)/` (decoded contents, §1). All plans and prompts
are updated to match. **Session 2 (`plans/day13-prompt.md`) is ready to
run.**

## What exists now

| Artifact | State |
| --- | --- |
| `plans/week7-ground-truth.md` | Step 0 for all three days: decks mined, Lab 7 read in full, code recovery status (§2), the NACK-hang analysis (§2a), continuity verified against ch-i2c/ch-uart/ch-adc (§5, **with Gate 1's corrections marked**), figure manifest (§6), rough-chapter defect list (§7), questions §9 (now ten) |
| `plans/week7.md` | The arc: crucial steps, hand-offs, the reading split, the driver-writing split, the L-2 decision (now with the Reference manifest), risks, cut order |
| `plans/day13.md`, `day13x.md`, `day14.md` | One page each, beat-level budgets summing to exactly 110/50/110, coverage tables against her decks, **post-Gate-1** |
| `reviews/week7-gate1.md` | Nine reviewer reports + the synthesizer's change list (applied) |
| `plans/day13-prompt.md`, `day13x-prompt.md`, `day14-prompt.md` | The session prompts for sessions 2–4, in `day12-prompt.md`'s shape |
| `CHAPTER_PROCESS.md` | Status row updated |

`source/ch-accelerometers.ptx` is **untouched and still rough** — nothing in
it is trusted (ground truth §7 is its conviction list).

## Gate 1, in one paragraph

Nine reviewers (arc-fidelity first, then the panel + rigor-hawk and
python-intro as rotators), every one briefed with the Week 6 length-budget
rule. The arc survived — arc-fidelity called it the most complete Gate 1
coverage yet and ruled both deliberate re-orderings faithful. What failed:
**Day 14 was budgeted at 120 minutes against 110** (four reviewers
independently; my own summing error), and **the ground truth wrongly called
two's complement "recall"** — nothing before Week 7 decodes a signed bit
pattern, so Day 13x's central beat was scoped as review of a thing never
taught. Both fixed: Day 14 re-based HiTA-free at a true 110 (restore path
stated), Day 13x re-based with the sign as first teaching (`0xC000` →
−1000 mg worked to the board) and byte assembly as its own beat. The full
list, including everything explicitly rejected, is at the end of
`reviews/week7-gate1.md`.

## The question list — answered 2026-08-27 (full record: ground truth §9)

- **Q1 datasheet** — in the repo, citations verified. **Q2 files** — in the
  repo; `AccelInit` returns `uint8_t`, its skeleton leaves exactly the two
  register values blank, `accel_x/y/z` are `int16_t`.
- **Q3 wrong-address behavior** — the one still-open item, at her pace: she
  will check later, and may switch `i2c.c` to the NACK-reporting variant.
  **Do not press it**; sessions check `i2c.c`'s git log before quoting it.
- **Q4 HiTA** — dropped; the Day 14 table is final.
- **Q5 AN-1057** — approved for hosting, but analog.com refuses downloads
  from this network: **Petra drops `an-1057.pdf` into `assets/datasheets/`**
  like the datasheet. The only file still missing.
- **Q6 breakout** — Adafruit LSM303AGR STEMMA, product 4413; capture
  originals delivered. **Q7 CoolTerm** — newest version; her screenshot is
  the menu-path authority, session 4 confirms wording.
- **Q8 framing** — her decks' framing only; the rough chapter's
  proper-acceleration hook is out.
- **Q9 connector** — "you can't miswire the STEMMA connector, it only goes
  in one way" (her words; now citable in the reading and safety line).
- **Q10 spares** — spares exist, **never mentioned on slides or in the
  book**; she handles the classroom. The ladders keep "priority triage"
  with no hardware mention — final.

## What runs next

- **Session 2 — build Day 13** (`plans/day13-prompt.md`): chapter skeleton
  for the whole week, the Day 13 reading, in-class skeleton, deck, Gate 2′,
  stop for Petra. This is the next session to run.
- **Session 3 — build Day 13x** (`plans/day13x-prompt.md`): no reading;
  skeleton + deck, Gate 2′, stop. Carries Day 13's prose if her pass is back.
- **Session 4 — build Day 14** (`plans/day14-prompt.md`): reading + skeleton
  + deck + the chapter's Reference section (manifest is in the prompt),
  Gate 2′, stop. Re-times Part 4 against the real `lsm303agr_partial.c`.
- Prose for each day follows that day's pass, from the passed slides,
  against Day 11's ~24-paragraph budget, Gate 3′ with the length briefing.

## Traps carried forward (beyond the standing ones in each prompt)

- **Day 14's arithmetic has failed once already** — re-add the table by hand
  after any change; `check_deck.py` cannot catch it until a deck exists.
- **The −500 mg figure in python-intro's Gate 1 report is wrong** (0xC000 is
  −1000 mg). It is quoted verbatim inside `reviews/week7-gate1.md`; the
  synthesizer's correction note sits beside it. Do not import the number.
- **Day 13x has no unspent slack.** Gate 1 consumed every named cut funding
  Parts 1 and 4. Any reviewer addition needs a new named displacement.
- The LIS3DH datasheet in `assets/datasheets/` is Day 5X material — never
  cite it this week. The sensor is the LSM303AGR.
- Her Day 13 slide-16 speaker note says "Arduino" (stale) and doubts its own
  "press single then reset" advice — the Week 5 hang finding says the old
  advice is right; treat the doubt, not the advice, as the error until Q3
  answers.
