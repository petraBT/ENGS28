# Day 13 — Gate 2′ reports

Session: Week 7 session 2 (2026-08-27), at commit fff69bf.  Under review: the
Day 13 Before Class reading (`sec-accel-before-class`), the Day 13 in-class
skeleton (`sec-accel-day13`), and the deck (`assets/decks/day13.json`,
42 slides), reviewed together.  Every reviewer was briefed with the B-18
length budget (findings that add words name what they displace), the
skeleton/DELIVERY-2 marker convention, and the Q3 constraint (no
student-facing sentence may assert what the program prints on a
wrong-device-address NACK).

Eleven reviewers: checker-arc-fidelity, checker-technical-accuracy ×2
(scoped Parts 1–4 + reading / Parts 5–8), checker-voice,
checker-figure-claims, expert-cognitive-load, expert-continuity-auditor,
expert-class-logistics, learner-visual, learner-firstgen-novice,
learner-anxious-nonhardware, learner-in-the-room.  The synthesizer's list
follows the reports.

---

## checker-arc-fidelity — Verdict: MAJOR

**Provenance.** `assets/ClassSlidesOLD/Day13-I2C(3).pptx` and the extracted media read from the live working tree; sources clean at fff69bf.  I opened her slide 5, 8, 9, 14 (all four images), 19/21 and the rebuilt `stemma_wiring.svg`, `i2c_bus_two_wires.svg` and `display_wiring_ad2.svg` rather than working from mined text.

No blocker: every gating step of hers reaches the room in words, and every in-class paragraph in the draft has a slide behind it.  One MAJOR: a picture-teaching of hers that the figure-manifest decision took out and nothing replaced.

### Her arc against the book + deck

| Her slide | Title / content | Reaches us at | Judgment |
| --- | --- | --- | --- |
| 1 | Title | deck 1 | glue |
| 2 | Agenda | deck 3 | ✓ |
| 3 | Section: Accelerometer LSM303AGR | deck 4 (Part 1 section) | ✓ |
| 4 | I2C device, SPI option, magnetometer unused; her display question | reading; `act-day13-keep-display`, `ins-`, reveal ¶; magnetometer on `sl-day13-back-to-i2c` | ✓ question verbatim |
| 5 | Bus picture | reading; in class `sl-day13-back-to-i2c` ref `fig-uart-vs-i2c` — whose right panel is her image rebuilt | ✓ content; layout note below |
| 6 | Protocol walk; master→controller note | reading + xref `sec-i2c-reference`; her "if nobody responds the line stays HIGH = NACK" lands in Part 5; inclusive-language note on `sl-day13-transfer-pattern` | ✓ review, correctly not re-taught |
| 7 | The five library functions, with signatures | reading; in class only in `sl-day13-whoami-read`'s presenter note | thin — finding 3 |
| 8 | Breakout + STEMMA colors | `fig-accel-wiring` (faithful rebuild) + `sl-day13-wiring` | ✓ |
| 9 | The activity; WHO_AM_I proves the setup; CoolTerm | `act-day13-whoami` (3 tasks) | ✓ text; picture dropped, recorded |
| 10–11 | `whoami_test.c` in full | Part 3 listing; `sl-day13-whoami-main`, `-read` | ✓ |
| 12 / 17 | `i2c1_memRead()` "Recall:" | `sl-day13-memread-write`/`-read` (Part 5) | ordering ruled at Gate 1; slide 17's reference role: finding 2 |
| 13 | Section: debugging the bus | deck 15 | ✓ |
| 14 / 15 / 25 | AD2 digital-channel wiring (4 images each) | prose, `sl-day13-analyzer-wiring`, `task-day13-analyzer-wiring` — no figure | **finding 1** |
| 16 | Predict the trace (+ "single, then hit reset") | `act-day13-predict-decoder`, `sl-day13-predict-code`; the reset technique moved to `task-day13-break-capture`, where it is actually needed | ✓ (move is an improvement) |
| 18, 22, 23 | empty | dropped | ✓ ruled |
| 19 | Waveforms A | `fig-whoami-capture-nack` + `sl-day13-capture-a`, Part 6 | ✓ her original, cropped; decoder reads h18 WR · N · P as claimed |
| 20 | Waveforms B | `fig-whoami-capture-wrong-register` + `sl-day13-capture-b`, Part 6 stretch | ✓ h07 = CTRL_REG1_A default, as ground truth §1 |
| 21 | Waveforms C | `fig-whoami-capture` + `sl-day13-capture-c`, Part 4 | ✓ verified against the image |
| 24 | Digging Deeper — six questions | 3 as tasks, answers in `ins-`; the other three placed on the diagram by `sl-day13-transfer-pattern`'s note and the DELIVERY 2 marker | ✓ marker-named |
| 26 | Section: device driver | deck 35 | ✓ |
| 27 | Firmware layers | `sl-day13-layers` → `fig-firmware-layers` by xref, no second xml:id | ✓ |
| 28 | Five-step recipe | recipe list + `sl-day13-recipe` + "Step 2 is already done" | ✓ |
| 29 | Transfer patterns; auto-increment §6.1.1 | `sl-day13-transfer-pattern` → `fig-i2c-transfer-pattern` | ✓; auto-increment deliberately deferred to Day 13x |
| 30 | `lsm303agr.h` excerpt; download to mylib | header prose + `sl-day13-header` + `act-day13-header-tour` | ✓ |
| 31 | The four prototypes | prototypes prose + `sl-day13-prototypes`; Adafruit provenance dropped (B-11e); `AccelInit` returns `uint8_t` per the real file | ✓ |
| 32 | Homework for Thursday | Part 8 + `sl-day13-homework` | ✓ all three |

**Reverse direction.**  Every `<slide>` in the draft appears in the deck (19/19), and no deck slide, figure or activity exists without an origin either in her arc or in a Gate-1-ruled addition.  No S-10 layout-absorber slide.

### The figure-manifest changes

**Her slides 14/15/25 — teaching IS lost.**  Two of the four images are genuinely unusable (`slide14_img2.png` is an ADALM2000 pinout — wrong instrument entirely; `slide14_img3.png` is an Arduino UNO + MPU-6050 Fritzing).  But the set also contains `slide14_img4.png` — a clean Digilent AD2 product photo with the 2×15 flying-lead bundle plugged in, which is not stale in any way, and it was the image that answered *which bundle*.  All four went out together.  See finding 1.

**Her slide 9 — teaching partly lost, recorded but under-specified.**  The Fritzing is unusable (sensor is an MPU-6050; its red lead runs from the Nucleo's 5 V pin).  Note for the record: the board drawn IS a Nucleo — the "Arduino-era" half of the source note is inaccurate about this one image.  What it carried and `fig-accel-wiring` does not is the **topology**: four wires into breadboard rows, the rows fed from the Nucleo, the second device on the same rows.  Finding 6.

### Findings

**1. [MAJOR] Part 4 asks every student to wire the AD2's digital bundle for the first time, and the book has never shown that hookup as a picture.**  Her three slides taught this with photographs.  The draft carries the mapping in words and points the slide at `fig-waveforms-setup`, which is a Waveforms software screenshot, not hardware.  The only physical AD2 picture in the book shows the scope leads on the analog pins — wrong bundle, wrong pins.  On Day 9x logic mode was explicitly optional, so Day 13 is the first time every student must find the larger bundle.  This is the CRUCIAL step's second half.  **fix**: add `fig-ad2-digital-wiring` in Part 4 immediately before `sl-day13-analyzer-wiring`, and change that slide's ref to it.  Preferred asset: derive from `assets/images/Day10-I2C(2)/display_wiring_ad2.svg` (already draws the AD2 connector with pins 0 and 1 labelled — move the two leads to 0/1, recolor pink/green).  Cheap fallback: `slide14_img4.png` cropped, captioned only as the larger flying-lead bundle.  **DISPLACES**: the caption absorbs "— the larger flying-lead bundle —" from the Part 4 paragraph and the slide's first bullet.

**2. [MINOR] Gate 1's R1 fix is half-carried: whoami_test.c is on screen during the capture, i2c1_memRead()'s prototype is not — and the predict slide's `// 7-bit address 0b0011001` comment pre-answers Part 5's puzzle (P-15).**  **fix**: add one commented prototype line to `sl-day13-predict-code`'s listing; **DISPLACES**: delete the trailing `// 7-bit address 0b0011001` comment from that slide's #define.

**3. [MINOR] Her slide 7 — the five library functions never reach the wall.**  **fix**, a move not an add: promote the five names from the note into `sl-day13-whoami-read`'s existing sentence; the presenter-note clause becomes redundant.

**4. [MINOR] Book order and deck order disagree inside Part 5** (book: NACK ¶ → two-nacks → transfer-pattern; deck: transfer-pattern → two-nacks).  **fix**: swap deck entries 24 and 25 so the deck follows the book.

**5. [MINOR] The Table 13→22 comment correction is invisible to tooling and unrecorded in the source.**  **fix**: one XML comment beside the Part 3 listing recording the deviation and the delivery ask.

**6. [MINOR] The ask-Petra setup photo has no spec.**  **fix**: extend the source comment to name what the photo must show (breakout + STEMMA cable; the SCL/SDA rows; the 3.3 V and GND feeds — never 5 V; the display still wired).

**7. [MINOR] The in-class datasheet moment cannot be opened from the in-class page** — Part 7's citation is bare text where ch-motors links the PDF at each in-class use.  **fix**: wrap the first in-class mention in `<url href="external/datasheets/lsm303agr.pdf">`.

### Layouts she already solved

- `sl-day13-back-to-i2c` — refs `fig-uart-vs-i2c`, half of whose pixels are the UART comparison.  Her slide 5 is the bus picture alone, full width — and Day 9x's `i2c_bus_two_wires.svg` is literally that picture.  → adopt hers: put the image inline on the slide.
- `sl-day13-wiring` — her slide 8's shape exactly.  → keep.
- `sl-day13-transfer-pattern` — her slide 29 as a figure-focus slide.  → keep.

### Checked and correct

Carried: her display question verbatim and its reveal; the STEMMA figure and colors; the whole whoami_test.c walk; the predict-then-capture pairing; all three captures with her decoded values; the 0x19 derivation as her slide-24 note writes it; single-sweep-then-reset moved to where it is needed; the two memRead halves verbatim; the layers figure by xref; the recipe; the header moment; the prototypes; all three homework items and her week preview.  Deliberately dropped or deferred, and correct: slides 18/22/23; 15/25; her slide 6's walk; slide 29's auto-increment (Day 13x); the Adafruit provenance and "hit reset on the Arduino"; three Digging Deeper questions folded onto the diagram.  Q3: no student-facing sentence asserts what the program prints on a wrong-address NACK.

---

## checker-technical-accuracy (A: reading + Parts 1–4) — Verdict: BLOCKER

**1. [BLOCKER] [B-6/hardware] `:540-548`, `:552-553`, `:608-610` — the analyzer setup is NOT "the one from Day 9x, unchanged": at Day 9x's time base the capture cannot contain the trace.**  Petra's own originals show Base: 50 µs/div, Position 200 µs; the two transactions span 0 to ≈405 µs.  Day 9x's taught setting is 20 µs/div (`ch-i2c:752`, `:784`), sized for one ≈190 µs transaction.  A 20 µs/div window is 200 µs wide — it cannot hold both transactions at any position; a student carrying Day 9x's settings forward sees the write half and never sees the h33.  **Correction (net-neutral)**: "The analyzer setup is Day 9x's, with one change: this read is two transactions and takes about 400 µs, so set the time base to 50 µs per division rather than 20, and drag the view so the first START sits at the left."  Mirror in the slide bullet and `task-day13-sweep`.  `plans/day13.md:43-45` carries the same error and should be corrected with it.

**2. [BLOCKER] [B-4] `:113-117` — the HT16K33 is named as the example of register-addressed operation; the book says it is the exception** (`ch-i2c:4310`: "The HT16K33 is unusual in being almost stateless… Most I2C parts are organized as a set of numbered registers instead").  Also mis-primes `task-day13-stretch-display`.  **Correction (same length)**: "Where the HT16K33 took one-byte commands (ch-i2c), the accelerometer is operated entirely through its internal registers…"

**3. [MAJOR] [B-11c] `:368-371`, `:377` — "the breakout's pin row is marked 3.3V–5V" is contradicted by the figure**: the silkscreen reads VIN · 3V · GND · SCL · SDA · INTM; "3.3V-5V" is her callout label for VIN, not board text.  **Correction (shorter)**: "The pin the red wire feeds is VIN; the breakout carries its own regulator, so on our Nucleo it goes to 3.3 V."

**4. [MAJOR] [B-11a] `stemma_wiring.svg` — the four pin callouts no longer line up with their labels** (the rebuild collapsed her spaced label runs to single spaces; the GND arrow's tail hovers over "SCL", SCL's over "SDA", SDA's over blank space).  **Correction**: split into four `<text>` elements anchored at the arrow-tail x's (≈157, 302, 464, 611), or restore the original spacing.

**5. [MAJOR] `:80-83` — "the code for all five functions … is in subsec-i2c-ref-library" is false** (that subsection has two program blocks — byteRead's core and a modified NACK-aware byteWrite; memWrite/memRead in prose; init elsewhere).  **Correction (drops five words)**: "The register-level detail of how they work is in `subsec-i2c-ref-library`."

**6. [MAJOR] `:57-59` — "held HIGH by pull-up resistors whenever no device is transmitting" is false for open-drain and contradicts the chapter's own NACK mechanism** (the acknowledge bit is inside a transaction; the pull-up is what makes it HIGH there).  **Correction (equal length)**: "…both held HIGH by pull-up resistors unless a device is pulling one LOW."

**7. [MAJOR] [B-11c] `day13.json:46` — the Part 4 rescue for a failed WHOAMI will not work as written**: there is no repeating transaction to trigger on (the program hangs after one transaction — already published at `ch-i2c:4218`), so a single sweep armed mid-class catches nothing without Part 6's arm-then-reset technique, which the note does not name.  **Correction (in place)**: "A student whose WHOAMI never succeeded still captures, but only with Part 6's trick — arm the single sweep, then press reset; a failing program stops after one transaction, so there is nothing repeating to trigger on."

**8. [MINOR] `:124-126` — "the special register called WHO_AM_I always contains 0x33"** — true of WHO_AM_I_A; Table 26 also has WHO_AM_I_M = 0x40.  Fix, one word: "the LSM303AGR's WHO_AM_I register…" (accelerometer-scoped).

**9. [MINOR] `:103-106` — "a 4-wire plug that only goes in one way, so it cannot be miswired"** — her citable words are about the connector; the four male ends at the Nucleo can absolutely go into the wrong rows.  Fix, one word: "…so the connector end cannot be miswired."

**10. [MINOR] `:207-211` — byteRead feedback "takes only a device address"** — it takes two parameters.  Fix: "takes only a device address, no register address."

**11. [MINOR] `:468-470` — "The one function this program defines"** — the listing defines two (main and RegisterRead).  Fix: "The only function this program defines besides `main()`…"

**12. [MINOR] `day13.json:34-37` — Part 2's slide budgets total 20 min against a stated 22** (the 2-minute checkpoint float is unnamed; Part 4 names its float explicitly).  Fix: add the same three words to the Part 2 section note.

**13. [MINOR] [P-6, instructor build] `ins-day13-predict-decoder` sits in the source before `act-day13-capture`** — the instructor book reads the answer before the work.  Move the block below `fig-whoami-capture`.

**14. [MINOR] `:152-156` — "Every transaction begins with a 7-bit device address"** — ch-i2c is more careful: seven address bits plus a read/write bit, eight bits.  Fix: "…begins with a device address — seven address bits plus a read/write bit."

**15. [MINOR] `:323-343` — the Part 1 answer exists twice** (ins block and student ¶); worth a comment tying them so they do not drift.

Out of scope, found while checking: `LSM303_REFERENCE_A // r` vs Table 26's R/W (her file's error; prose should not promise the header matches the type column); `day13.json:56` "neighbour's" — British spelling (L-7).

**Verified correct** (abbreviated): the Part 3 listing is byte-identical to the starter apart from the banner and the deliberate Table 22 citation; check_starters 29 lines ✓; the two abridged slide listings drop exactly what their notes claim; all three reading questions' correct answers describe real behavior; §8.4/Table 26 read from the PDF ✓; capture C decodes exactly as captioned, SCL DIO1 green / SDA DIO0 pink ✓; build integrity ✓; Q3 respected (the reading's "reports failure if the expected value does not come back" is generic, hedged, and true of AccelInit — but it is the sentence to revisit if Q3 lands on "unreachable").  Unverified: the breakout's 3.3–5 V tolerance (needs the schematic); "either socket" (rests on the photo).

---

## checker-technical-accuracy (B: Parts 5–8) — Verdict: BLOCKER

**1. [BLOCKER] `:671-676` (`task-day13-who-acks`) — "Three acknowledge bits cross your screen" — there are FOUR** (the task omits the ACK after the second h19, the read-half address ACK), contradicting the chapter's own Part 4 caption and instructor block, both of which list four.  The instructor answer inherits the error ("The ACKs after h19 and h0F are the accelerometer's" reads as two).  **Fix (swap)**: "Four acknowledge bits cross your screen: after each h19, after h0F, and after h33."  Instructor: "The ACKs after both h19s and after h0F are the accelerometer's."  This also strengthens Part 5's central point — the device acknowledges its address twice.

**2. [BLOCKER] `:890-891`, `:898`, `:869` — "every acknowledge is an ACK" is refuted by the figure it captions** (capture B's read ends with the controller's N, exactly like capture C's — the caption contradicts the pixels and undercuts the two-kinds-of-NACK lesson two Parts earlier).  **Fix (swap)**: "every acknowledge the accelerometer owes is an ACK, and the read ends with the controller's own NACK, exactly as the WHO_AM_I read did".  Instructor: "everything the accelerometer is asked to acknowledge, it acknowledges".

**3. [MAJOR] `:659-662` (`task-day13-why-19`) — "The header says the device address is 0x32" — false premise twice over**: at Part 5 the only file with the #define is whoami_test.c (the header arrives in Part 7), and both files write `(0x32 >> 1)`, not 0x32.  **Fix (swap)**: "The program writes the device address as `(0x32 >> 1)`.  Where does the 0x32 come from, and why does the decoder print h19?"

**4. [MAJOR] `:916-918`, `:941` — "the same five steps it followed for the display on Day 10" — ch-i2c never enumerates a recipe** (it teaches the layering discipline; ground truth §5 says the recipe is "the same discipline restated").  The five steps themselves are faithful to her slide 28.  **Fix (swap)**: "Writing a device driver follows five steps — the same discipline you followed for the display on Day 10…"

**5. [MAJOR] the Q3 stance vs the book's own published claim**: ch-i2c Day 10 Part 9 (student-facing) already asserts the hang with the RM0490 §23.4.9 citation, and `subsec-i2c-ref-library` repeats it.  The draft does not contradict it, but the two stances coexist unrecorded, Part 6's "best wrong-guess moment" premise is undercut for any student who read Day 10 Part 9, and if Petra switches the library, ch-i2c changes too.  **Fix (swap in the instructor block)**: replace "(Petra is checking…)" with "Day 10 Part 9 and subsec-i2c-ref-library already give the wire-and-program story (RM0490 §23.4.9); Petra is re-checking it, and any change lands in ch-i2c too."

**6. [MAJOR] [P-11] Part 5's datasheet moment is uncited** — "the datasheet's own drawing" with no document/section/table anywhere in Day 13 (it is §6.1.1, Tables 20–23, p. 38 — verified), and "the datasheet gives the 8-bit form" likewise (Table 24, p. 39 — verified).  The second matters more: the only 7-vs-8-bit test the book ever gave (`ch-i2c:870`: "any address quoted above 0x7F must be the shifted one") cannot classify 0x32, which is below 0x7F.  **Fix (swap)**: cite §6.1.1 Tables 20–23 p. 38 in the transfer-diagram paragraph (displacing "with every field named"); cite Table 24 p. 39 in the instructor answer, noting the 0x7F test cannot clear an address below it.

**7. [MAJOR] [B-11c] `:876-878` — "so the transactions complete" (the display stretch)** — whether `i2c1_memRead(0x70, 0x0F, …)` completes is a device-behavior claim with no source in the repo (no HT16K33 datasheet).  The address-ACK half is solid.  **Fix (swap, shorter)**: "…that ACK is the whole point: it proves you reached *a* device.  Whether the read then completes, and what byte comes back, is discoverable on their own bus; let whoever captures it report it."

**8. [MINOR] `lsm303agr.h` is not registered in check_starters.py** — the four header listings match the file (verified mechanically, code lines only), but two comment divergences are silent edits (the "(Sec 6, 7.1)" citation and "Section 7.1 of" dropped — defensible, but undocumented).  **Fix**: a one-line source comment recording the elision.

**9. [MINOR] `:987-989` — "for each register, the header records the power-on default"** — refuted by the six OUT_* lines above it (no default column).  **Fix (swap)**: "for each control and status register".

**10. [MINOR] `:974`, `:1006` — LSM303_REFERENCE_A `// r` vs Table 26's R/W** — her file's one-word error, which the book now carries; flag to Petra with the stale-comment list rather than editing.

**11. [MINOR] `:949` vs `:1032-1035` — "Steps 1 and 2 are already done" then "Step 3 is also done"**.  **Fix**: "Steps 1–3 are already done" in the note.

**12. [MINOR] `:726-727` — "the write pattern and the read pattern" — the figure carries four transfers**; "with every field named" is generous.  **Fix**: displace in favour of the §6.1.1 citation (finding 6).

**13. [MINOR] [B-8] `:702-707` — the nobody-answers NACK is re-taught, not recalled** (Day 9x Part 4 and Day 10 Part 9 both taught it; Day 9x's version is broader — unpowered device and disconnected SDA look identical).  The pairing of the two NACKs is genuinely new and right to keep.  **Fix (swap)**: "The other kind is the one you met on Day 9x and produced on Day 10: nothing pulls SDA LOW during the acknowledge bit and the wire simply stays HIGH."

**14. [MINOR] the Master/Slave bridge lives only in the presenter note** — on the wall students see Master/Slave row labels with nothing connecting them to controller/target.  **Fix (swap in the slide caption)**: "…its *Master* row is our controller, its *Slave* our target."

**15. [MINOR] `:858-860` — "If you asked it for register 0x0F" vs ch-i2c's "almost stateless"**.  **Fix (swap)**: "If you sent 0x0F to it as a register address, the way this program does to the accelerometer…"

**16. [MINOR] [P-12] homework item 3's two-register specificity pre-empts Day 13x slide 11's teaching** — plan-of-record (`plans/day13.md` authorizes it), flagged only for the synthesizer to confirm.

**Verified clean** (abbreviated): both memRead halves verbatim against i2c.c (=, not |=; 1U<<NBYTES_Pos; RD_WRN only in the second; NACKF guards; TXIS/RXNE waits; the for loop); all four header listings match the starter in order including `uint8_t lsm303_AccelInit()`; every datasheet citation in Parts 5–8 opened and confirmed in the PDF (§7/Table 26 p. 43; WHO_AM_I_A 0F/00110011/R; CTRL_REG1_A 20/00000111/R/W; §8.6 p. 47 Tables 33–35; §6.1.1 p. 38 Tables 20–23, Table 22 draws SR); 0x30>>1=0x18 ✓, 0x07 derived from Table 34 defaults ✓; every activity in scope has a projected instructor block; deck sums Part 5 = 15 ✓ Part 6 = 15 ✓ Part 7 = 12 ✓ Part 8 = 3 ✓; Q3 respected throughout.  Unverified: the display-read completion (above); whether Day 10 performed recipe step 5.

---

## checker-voice — Verdict: MAJOR

[Register: mostly hers — the chapter opening is textbook S-22, the reading plain and causal, the skeleton largely her plain declarative.  What is not hers clusters in closing beats, captions and titles: a compressed contrastive phrase where she would write a sentence, and a deferral tic ("it is worth saying why" ×3).]

- **[MAJOR]** `:1114` (`sl-day13-homework` caption) — "Tomorrow: how the sensor works inside.  Thursday: …" is the Day 9x rejected epigram shape; her own slide 32 carries the sentence: **"Wednesday and Thursday we'll get some acceleration data out of the sensor, and then use it in Lab 7."**  Same length.
- **[MAJOR]** `:706` + `:714` — "Same name, opposite meanings — …" (fragment, and a second telling).  Prose: "The two are opposite: the controller's NACK ends a read on purpose, and the other one means that nobody answered."  Slide: DELETE bullet 3 (its halves are bullets 1–2 verbatim); the freed slot pays for the NMAK/expansion additions elsewhere.
- **[MAJOR]** `:540-548` + `:551-554` — Part 4 lead and slide lack "we" for class work: "We'll put the AD2 on the two wires with the same setup we used on Day 9x…  In Waveforms we'll trigger on DIO0 falling…" (and the slide bullets likewise).
- **[MAJOR]** `:335`, `:698`, `:953` — the deferral tic: "The answer is no — and it is worth saying why." → "No — the display stays, and both devices share the same two wires."; "That last answer is worth a name, because…" → "Two different things on this bus are both called NACK."; "…it is worth seeing where it came from." → "…and here is where it came from."
- **[MAJOR]** `:473` — "proves what the reading said it proves" points instead of saying (S-26); align with the slide's fuller causal middle: "…proves the whole read path: the wiring, the device address, the protocol and the code all had to work for that value to arrive."  Also trim `act-day13-whoami`'s introduction, which Part 3 re-says.
- **[MAJOR]** `:815` (`task-day13-break-restore`) — "before Part 7" is the draft's only student-facing "Part N" (L-18): "…before we move on."
- **[MAJOR]** `:1019` + deck — "The header is the table" is an epigram title (S-18): "Check the header against the datasheet."  The identity claim survives as the slide body's first line.
- **[MINOR]** Part 7 title/agenda/section: her deck names it "Accelerometer device driver"; "A driver begins" gestures.  (Book subsection title is structural — the deck strings can take her wording alone.)
- **[MINOR]** `:304` — "Same protocol, same library: …" fragment + reuse loss of her slide 7; expand the bullet with the five functions and their one-line jobs, paid for by cutting bullet 1's tail.
- **[MINOR]** `:341` — "both devices, one bus" clipped parallel; "…and in Lab 7 you will run both devices on the same bus."
- **[MINOR]** `:893` — "A healthy bus, reading the wrong thing perfectly." DELETE from the caption (the note keeps it).
- **[MINOR]** `:1034`, `:1062` — "the whole interface the rest of the week builds on" — the week acts (S-20): "…we'll build on for the rest of the week."
- **[MINOR]** `:671-676` — the count-frame "Three acknowledge bits…" (and the count is wrong — four); reframe: "Find every acknowledge bit on your trace — there is one after each byte.  For each one: who sent it, and is it an ACK or a NACK?"
- **[MINOR]** `:737` — S-21 armature + unnamed function: "Everything you captured came from one function, `i2c1_memRead()`.  Here is the half of it that produces your trace's *first* transaction:"
- **[MINOR]** `:632` — the capture-C slide caption's A/N/P shorthand unglossed and "all three values" without antecedent: "…where A is an acknowledge, N a NACK and P a STOP.  Find the device address, the register address and the returned value on your own screen."
- **[MINOR]** `:698-703` — NACK never expanded in this chapter: "…are both called a NACK — a not-acknowledge".
- **[MINOR]** `:664` — "On Day 10 we told you" → "On Day 10 we saw".
- **[MINOR]** `:423` — "a shift, not a plain number" contrastive → "a number shifted right by one rather than written out."

Sweeps (abbreviated): unit openings 22 checked, 1 failing (Part 4 lead); slide titles 41 checked, 2 epigrams; S-20 actors 2 real + 1 borderline; S-21 armatures 4; acronyms — NACK and the A/N/P gloss are the real gaps, AD2 licensed bare by her own hand, SCL (PB8)/SDA (PB9) should also carry D15/D14 per CLAUDE.md both-names; design scaffolding in student text: 1 ("before Part 7"); S-29 clean; L-16 clean; B-12/S-25 clean.  L-17 deliberately NOT applied to bus-protocol talk ("tells the target to stop sending", "the target only speaks when spoken to" survived her pass) — recorded so a later pass does not "fix" it.

Reuse: her slide 7 (five functions), her slide 31's "names are borrowed from Adafruit's driver" (one clause, her own Day 13 text — synthesizer should weigh against B-11e), her slide 32's homework framing tied to AccelInit, her slide 16's predict title naming the program, her slide 9's "Test code: whoami_test.c" as the Part 2 activity title.  Genuinely better than hers, keep: the break-it activity, the two-kinds-of-NACK distinction, the single-sweep-then-reset technique.

For Petra: the Day 13 in-class opening is still owed (DELIVERY 2) and is the one sentence that gets a draft rejected whole; the recap items are already in the passed shape and can be lifted into it.  The A/N/P gloss assumes those are the decoder's literal letters (confirmed from the captures).

---

## checker-figure-claims — Verdict: BLOCKER

[Eleven figures rasterized and read; every figure-bearing slide rendered in the player at 1600×900.]

**1. [BLOCKER] `fig-accel-wiring` — the four pin labels are mis-registered against the four arrows; three point at the wrong pin** (measured: VIN↔"3.3V-5V" ✓; GND arrow over "SCL"; SCL arrow over "SDA"; SDA arrow over nothing).  Her original spread the labels with space runs across the picture's width; the rebuild collapsed them into one left-anchored `<text>`.  A student wiring "against the picture" ties yellow to GND and blue to SCL.  **Fix**: four separate `<text text-anchor="middle">` at the arrow-tail x's (viewBox 157.1, 302.2, 463.9, 611.4), or ask Petra for her export.  Re-render and re-read after.

**2. [MAJOR] `fig-accel-wiring` caption — "the breakout's pin row is marked 3.3V–5V" is not what the board says** (silkscreen: VIN · 3V · …; and the separate 3V pad is the regulator's output — two candidates for a student sent to find "3.3 V", and the caption never names VIN).  **Fix**: re-caption naming VIN and warning off 3V; same for the slide caption ("red to 3.3 V" over a picture whose only color list says VIN: red).

**3. [BLOCKER] capture B captions (book + slide) — "every acknowledge is an ACK" contradicted by the visible N.**  (= tech-B finding 2.)

**4. [BLOCKER] `sl-day13-analyzer-wiring` — title "Wire the AD2 to your setup" over a software screenshot with no wiring in it** (Day 9x titles the same image correctly as "Waveforms in logic mode").  **Fix**: retitle to match the image and move the wiring sentence — or supply the real setup photo; probably one figure should become two (wiring photo + software screenshot).

**5. [MAJOR] the same slide's note says "the screenshot has them" about the decoder steps — they are in `fig-waveforms-decode`, not the ref'd `fig-waveforms-setup`.**  **Fix**: split into two slides (setup, then decode, as Day 9x does) or point the note at the right figure.

**6. [MINOR] slide 5's figure is 45% UART with no bullet mentioning UART.**  **Fix**: inline `i2c_bus_two_wires.svg` in the slide body; do NOT crop the shared `fig-uart-vs-i2c`.

**7. [MINOR] "the datasheet's own drawing of what you captured" over four tables with no pointer to which** — name Table 22 in the caption.

**8. [MINOR] captures A and B carry a stray red line at the top** (the Ready box's bottom edge); trim to capture C's top row.

**9. [MINOR, informational] the crops dropped the toolbar and time axis — nothing falsified, but `fig-waveforms-setup` (projected two slides earlier) says "Set timebase to 20us" while all three captures were taken at 50 µs/div; if anyone compares, the projected recipe and result disagree.**  (= tech-A finding 1's slide-16 face.)

**P-15/P-6 ordering — clean, verified in the built pages.**

**Notation mismatches**: 3.3 V vs VIN/3V (fix the text); SAK/MAK/NMAK/Master/Slave unglossed on the wall — add to the slide caption "SAK is the target's ACK; NMAK is the controller's own NACK — the N on your trace"; SCL (PB8)/SDA (PB9) should also give D15/D14 (both-names rule); fig-firmware-layers' I²C vs I2C — cosmetic, no action.

**Legibility (measured at 1600×900)**: the three capture strips project their decode glyphs at 1.22% of slide height (fails; accepted floor 1.9%) — and in the book at 1400 px viewport, `fig-whoami-capture` renders 600×47 px, decode bytes ≈4 px.  Capture A's transaction occupies 18% of the image width — the rest is idle line.  **The lever is the figure, not the text: ask Petra for re-exports zoomed onto the transaction (write-half/read-half views would also match the Part 5 walk), or re-cut tighter from the originals** — capture A alone gains ~2.5× from a tighter crop.  `fig-waveforms-setup` fails on slide 16 because stack+bullets squeeze it to 42% of stage width (Day 9x shows it image-dominant and legible there); one bullet, or a split, is the lever.  Marginal: transfer-pattern glosses 1.67%, firmware-layers 1.33%, uart-vs-i2c 1.33%.  Passes: stemma wiring (2.78–3.11%).

**Crop-risk watchlist**: slide 5 has ~35 px to spare — one more bullet crops the figure; slides 19/30/34's 12.9:1 aspect is what produces the small type.

**Shared figures — do not re-crop for Day 13's sake**: `i2c_transfer_pattern.svg` lives in Day 13's directory but is defined by ch-i2c's Reference figure describing all four transfers; `waveforms_i2c_setup_1.png`, `uart_point_to_point.png`/`i2c_bus_two_wires.svg`, `firmware_layers.svg` are ch-i2c's.  Only `stemma_wiring.svg` and the three capture crops are Day 13's alone.

---

## expert-cognitive-load — Verdict: MAJOR

**Repetition census** (kept vs cut): the stop-then-start mechanism has 4 full student-facing tellings in ~15 min (task premise; prose+transfer-slide pair; both memRead notes) + the spoken reveal — keep the prose/slide pair and the reveal; delete the memRead-write note's restatement, reduce the memRead-read note to a one-clause callback.  The STEMMA "only goes in one way" ×3 — keep reading + figure caption; delete from the slide note.  WHO_AM_I proves-communication ×2 inside the reading — trim the reading-question feedback to a bare confirmation.

**1. [MAJOR] P-7/P-2 — `act-day13-digging-deeper` bundles three separately-hard discoveries flat, with one combined reveal**; the plan's staging (why-19 call-and-response first) lives only in a deck presenter note.  **Fix**: split task-day13-why-19 out (or mark it answered-aloud-immediately) so the source itself encodes "resolve one, then commit to the other two."  Restructure, not new prose.

**2. [MAJOR] B-8 — the stop-then-start fact told four times** (see census).  Net-negative fix.

**3. [MAJOR] P-9/P-2 — the analyzer setup re-narrated at full strength in prose AND slide while claiming to be routine** — nearly verbatim to the Day 9x captions already on screen via the ref; the slide's own note says "do not re-teach the decoder steps," contradicting its bullets.  **Fix**: cut body prose and slide bullets to one line each and let the Day 9x figures carry the detail.  Pure cut.  [Synthesizer note: collides with tech-A finding 1, which needs the 50 µs/div change stated — reconcile.]

**4. [MINOR] the "only goes in one way" clause tripled** (census row 2).

No BLOCKER: the crucial step is scaffolded as designed; the reading stays within B-2; Q3 respected; the fail-open scaffolding is present in the deck notes.  All four findings are cuts or restructures, not additions.

---

## expert-continuity-auditor — Verdict: BLOCKER

**1. [BLOCKER] [P-1] the right-shift operator `>>` is used and hand-derived throughout Day 13 but has never been taught anywhere in the course** (repo-wide grep: zero shift-operator uses outside ch-accelerometers; left shift was taught with worked mechanics in ch-intro-blinky; Day 9x's address derivation deliberately worked in binary without the operator; the signed-shift note is deferred to this chapter's unwritten Reference).  Parts 3, 5, 6, 7 all lean on it.  **Fix**: teach `>>`'s unsigned mechanics at first use (Part 3), a sentence or two mirroring ch-intro-blinky's left-shift box.

**2. [MAJOR] Part 7's "five steps it followed on Day 10" — no such enumerated recipe exists in ch-i2c** (= tech-B finding 4; fix by reframing as the discipline restated, or add the list to ch-i2c).

**3. [MINOR] Part 6 names and uses CTRL_REG1_A before Part 7 introduces the register map** — the class-wide capture-B figure states "CTRL_REG1_A's power-on default" ahead of the header; Part 7 does tie back ("You met one of those defaults already"), so likely deliberate mystery-then-explain — confirm it is intended.

Not flagged (checked and clean): every upstream recall and xref target verified (the I2C recall, ACK handover, address shift, five operations and the stop-then-start fact, the AD2 figures, fig-firmware-layers, fig-i2c-transfer-pattern, subsec-i2c-ref-library); every downstream hand-off in week7.md's table lands; Q3 clean.

---

## expert-class-logistics — Verdict: MAJOR

[Running clock reproduced; predicted reality: the bell rings with Part 7 finishing or Part 8 skipped, and boards left flashed to 0x30.]

**1. [MAJOR] S-8/Day-14 hand-off — Part 6's restore step (task-day13-break-restore: edit back to 0x32, rebuild, reflash, reconfirm) has zero budgeted minutes anywhere** — a full edit-build-flash-verify cycle for the whole room, and Day 14 needs "the sensor wired and verified."  **Fix**: name it — fund from Part 6's compressible debrief/stretch bucket, or better, choreograph it into Part 7's opening layers beat (pure lecture): boards reflash to 0x32 while the layers slide is talked over.

**2. [MINOR] no checkpoint covers Part 6's two build-flash cycles** (Parts 5–8 = 45 min with no stall-catcher).  **Fix**: one presenter cue at the top of Part 7 — "look up: is everyone back to Accelerometer initialized!?" — a de facto checkpoint at no cost.

**3. [MINOR] 10 minutes for copy+download+first-build is credible only because the minute-35 checkpoint absorbs the tail** (Canvas congestion is the classic trigger).  Design compensates properly; stated for the record.

**4. [MINOR] "the display stays wired all week" has no rescue of its own** (three intervening kit-packing days); a one-line presenter fallback ("if your display looks dead, don't stop to fix it now — the point still holds") closes it cheaply.

Confirmed compliant: Q10 (no spares anywhere), S-25 (all rescue language in notes/presenterNotes; no leakage into activity statements), Q3 (the "expected here" line is presenter-note only).

---

## learner-visual — Verdict: MAJOR

[Looked at: stemma_wiring (rendered 1302×674), the three capture crops, i2c_transfer_pattern (1590×915), firmware_layers (1915×1271), the Day 9x components of fig-uart-vs-i2c and fig-waveforms-setup/decode; traced the player CSS to compute projected sizes.]

**1. [MAJOR] B-11a — the three decoded captures project at ≈1.4% of slide height** (12.9:1 strips, width-bound at ~115 px tall on a 900-px stage) — below every accepted example in AUTHORING-visual.md's table, and the projected capture is the designated rescue.  **Fix costs nothing new**: re-export with more vertical room (taller rows / tighter window) so the strip is closer to 1:6.

**2. [MAJOR] P-4 — Part 4 has no picture of the physical analyzer wiring, only a software screenshot** — "DIO0 (pink) to the SDA row" is exactly the sentence-only instruction P-4 flags, now that the breadboard also carries STEMMA leads.  **Fix**: one annotated photo, companion to fig-accel-wiring, of the loaded breadboard with both landings.  (= arc finding 1.)

**3. [MINOR] S-3 — capture-A and capture-B slide captions describe instead of instruct** — append "find the NACK on your own trace" / "check h07 against your own datasheet".

**4. [MINOR] P-15 — the multi-device bus figure is up during the resurface, just before the commit it answers** (Device 1…n on one bus IS the picture-form answer to "do I need to take the display down").  **Fix**: defer the figure to the reveal, or crop the slide's image to a generic two-wire bus (a slide-local image, not the shared file).  [Synthesizer: collides with arc's "adopt her bus picture" and figure-claims 6 — resolve together.]

Confirmed good: fig-accel-wiring carries its annotations; the predict→capture→figure ordering is correct in reading order for all three captures.

---

## learner-firstgen-novice — Verdict: MAJOR

**1. [MAJOR] P-4/P-2 — task-day13-wire's picture shows only the breakout end**; "the same SCL and SDA rows the display is already using" needs the fig-display-wiring memory, unprompted, from two chapters ago; "the SCL row" is not findable by name for a student new to breadboards.  **Fix**: one clause in the caption or task — "(the same breadboard rows shown in fig-display-wiring)" — the cheapest form; displaces nothing.

**2. [MINOR] B-9a — SPI expanded then abandoned** reads as "something else I'm supposed to know."  **Fix**: cut the SPI clause — "We interact with it via I2C."  Net removal.  [Synthesizer: her slide 4 carries the SPI aside — weigh P-12 against this.]

**3. [MINOR] the _A suffix never explained** — the reading says WHO_AM_I_A in a citation, Part 7's header is full of `_A`, and the known magnetometer makes the ambiguity real.  **Fix**: one clause at the header's introduction — "the `_A` marks the accelerometer's half of the register map; the magnetometer has its own registers we don't touch."

**4. [MINOR] L-11 — "Tomorrow we'll look at…" in Part 8's prose** — the rule bans "tomorrow"… [checker note: L-11 actually permits "tomorrow"; the synthesizer should rule].  Proposed: "On Day 13x we'll look at how the sensor works inside" — matching the parallel "on Thursday".

Reachability: everything else follows start to finish; Part 2 is the one place I'd have gone quiet.

---

## learner-anxious-nonhardware — Verdict: BLOCKER

**1. [BLOCKER] P-14/P-2/B-12 — Part 5's opening line, "Answer from the capture on your own screen, not from the book," forecloses the fallback for the student whose capture failed** — and the actual rescue (mark the projected capture) lives only in notes they never see.  This is the moment I stop and wait.  **Fix**: qualify in place — "Answer from your own capture where you have one; if it didn't produce a clean trace, work from the figure — the values are the same by construction" — plus the parallel sentence on Part 6's capture-A caption.  In-place rewrites, B-18-free.

**2. [MAJOR] the "Could not connect" print is in the listing every student runs, and nothing student-visible says that failure is expected, informative, or where it leads** (B-8a: the assertion is already being made by the program itself).  **Fix**: one clause on Part 3's closing sentence: "…If it prints 'Could not connect to accelerometer' instead, that failure is data too — the capture in Part 4 shows exactly what the wire is doing, and Part 6 produces the identical result on purpose."  [Q3-safe: describes the program's own else-branch, not the wrong-address behavior.]

**3. [MAJOR] both single-sweep captures show nothing until reset is pressed, and the only sentence saying the blankness is normal is spoken** — fold into the task statement: "…The trace stays blank until you press reset — that is the sweep waiting, not a fault."

**4. [MINOR] downstream of 1: task-day13-address-twice and task-day13-who-acks say "your trace"/"your screen"** — same softening ("the trace in front of you") once finding 1 lands.

---

## learner-in-the-room — Verdict: MAJOR

[Full 42-slide walk; verdict table in one line each — keeps omitted here except where cited.  No BLOCKER: the crucial-step chain (#9 wires, #10 build, #12 defines, #16/#18 capture) is unresolvable at no point.]

**1. [MAJOR] #22 task (a) — "The header says the device address is 0x32"** — the room has seen no header (first projected #38), and the wall showed `(0x32 >> 1)` twice.  (= tech-B finding 3; same fix.)

**2. [MAJOR] #31 `ins-day13-break-it` gives nothing**: ~80% is #30's caption re-projected; the stage directions are already in #30's note; and it puts the internal "(Petra is checking…)" editorial on the projector.  **Cut the slide**: fold "the second kind of NACK — the one from nobody at all" into #30's caption; buys ~1 min back in the tightest Part.

**3. [MAJOR] #12 — the listing was thinned, not split**: the stripped prototype is the one line that says RegisterRead is in this file, not the library — and #13's deck title "is one library call" compounds it against #40/#42 (students write these functions).  **Fix**: restore the prototype line (displaces a blank line); retitle #13 "lsm303_AccelRegisterRead() is one call into the I2C library."

**4. [MAJOR] #24 asks me to find something #23 told me one slide earlier** (the SR difference), and SAD/SUB/SAK/MAK/NMAK/Master/Slave arrive unglossed.  **Fix**: delete the repeated-START sentence from the reveal ¶2 (it moves to the diagram slide, displacing nothing) and give #24's caption the gloss + "Table 22 is the one you captured."

**5. [MAJOR] #27 — the NACK I was just taught to look for is in no line of the read code and nothing says why.**  **Fix**: one caption line — "The NACK is not a line of code: NBYTES tells the peripheral how many bytes to take, and it NACKs the last one and STOPs for you" — flagged for Petra's confirmation before it ships.  [Synthesizer: verify against RM0490 §23.4 before adopting — this is a hardware claim.]

**6. [MINOR] #33 (stretch reveal) fires before #34 (its evidence)** — every other reveal is trace-then-reveal.  **Fix**: swap the two deck entries.

**7. [MINOR] #18 tasks (a)/(b) are #16's bullets word-for-word** — compress into one setup task so the slide's weight sits on (c).

**8. [MINOR] #14 bullet 1 restates #10's introduction** — lead with the new bullet; demote the old to a subordinate clause.

Below the cap: #20's first lines re-read #19's caption; #36's framing repeated by #37; #32(b) says "no capture needed yet" and "check on your desk" in one task; #30's N/P glyphs near-illegible; #5's UART panel referred to by nothing.

Undefined-on-the-wall list (abbreviated): #12 RegisterRead (prototype stripped), #13 "Table 22" (first reaches the wall at #24), #22 "the header", #24 SAD/SUB/SAK/MAK/NMAK and Master/Slave (spoken-only on Day 9x), #40 lsm303AccelData_s (glossed, deferred — acceptable).

Tasks I could not do: #22(a) (premise not on any wall); #32(b) (writable but knotted — "no capture needed yet" vs "check on your desk").  Everything else writable.

---

*Reports end.  The synthesizer's list follows.*


---

# The synthesizer's change list

# Day 13 — Gate 2′ synthesis: the change list

*Appended to `reviews/day13-gate2.md`. Source under change: `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx`, `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`, `/Users/dz00762/repos/ENGS28/assets/images/Day13-I2C(3)/`, `/Users/dz00762/repos/ENGS28/plans/day13.md`. Line numbers are those of commit fff69bf.*

## Verdict

**Not ready for Petra.** Three correctness defects would each reach a student's hands: a task that counts three acknowledge bits where the figure beside it shows four, a caption that says "every acknowledge is an ACK" over a picture with a visible `N` in it, and a wiring figure whose four arrows point at the wrong four labels — a student wiring against it ties yellow to GND and blue to SCL, on the crucial step's first half. I opened the images and confirmed all three. But the single biggest problem is **Part 4**, the crucial step's second half: it is built on a false premise — the analyzer setup is *not* "Day 9x's, unchanged"; at Day 9x's 20 µs/div the 400 µs read cannot fit in the window, so a student carrying those settings forward sees the write half and never sees the h33 — and it asks every student to wire the AD2's digital bundle for the first time with no picture of that hookup anywhere in the book, over a slide titled "Wire the AD2 to your setup" that projects a software screenshot. Four reviewers found four faces of that one cause. On budget: the in-class section is **13 body paragraphs against Day 11's passed 25**, with the DELIVERY-2 prose still owed on eight markers — so this gate had to come in at net zero, and it does. Every addition below is paid for by a named deletion, and the list is net-negative in student-facing words.

---

## Must fix (blocks sign-off)

**1. [B-4, correctness] `ch-accelerometers.ptx:671-676` + `:690-694` — four acknowledge bits, not three.** Verified against `assets/images/Day13-I2C(3)/waveforms_capture_c.png`: the decoded row reads `h19 WR · A · h0F · A · P · h19 RD · A · h33 · N · P`. `task-day13-who-acks` says three and omits the read-half address ACK — contradicting the chapter's own caption at `:622-627` and its own instructor block. The instructor answer inherits the error.
*Task, replacing the statement:* "Find every acknowledge bit on the trace in front of you — there is one after each byte. For each one: who sent it, and is it an ACK or a NACK?"
*Instructor ¶3:* "The acknowledge bits after both `h19`s and after `h0F` are the accelerometer's — it acknowledges its own address once in each transaction. The bit after `h33` is a NACK, and it is the *controller's*, sent on purpose: one byte was asked for, one byte arrived, and the NACK says 'no more'."
This strengthens Part 5's central point rather than patching it. **DISPLACES:** the count-armature goes; the rewrite is shorter.
*Raised by: checker-technical-accuracy B #1 (BLOCKER), checker-voice (count-frame, S-21/S-28), learner-anxious-nonhardware #4.*

**2. [B-4/B-11c, correctness] `:890-891` + `:898` — "every acknowledge is an ACK" is refuted by the figure it captions.** Verified: capture B decodes `h19 WR · A · h20 · A · P · h19 RD · A · h07 · N · P` — the read ends with the controller's `N`, exactly like capture C. The caption contradicts the pixels and undercuts the two-kinds-of-NACK lesson two Parts earlier.
*Figure caption:* "…Both transactions complete — every acknowledge the accelerometer owes is an ACK, and the read ends with the controller's own NACK, exactly as the WHO_AM_I read did — and the value that comes back is `h07`: CTRL_REG1_A's power-on default, 0b00000111 (Datasheet §8.6)." **Delete** the caption's closing "A healthy bus, reading the wrong thing perfectly." (the note keeps it).
*Slide caption:* "Right device, wrong register: everything the accelerometer is asked to acknowledge, it acknowledges, and the value that comes back is h07 — CTRL_REG1_A's power-on default."
**DISPLACES:** the deleted epigram pays for the added clause; net shorter.
*Raised by: checker-technical-accuracy B #2 (BLOCKER) and checker-figure-claims #3 (BLOCKER), independently; checker-voice `:893`.*

**3. [B-11a, correctness] `assets/images/Day13-I2C(3)/stemma_wiring.svg` — the four pin callouts are mis-registered against their arrows.** The rebuild collapsed her spaced label runs into one left-anchored `<text>`: VIN↔"3.3V-5V" is right, the GND arrow's tail sits over "SCL", SCL's over "SDA", SDA's over blank space.
*Fix:* split into four `<text text-anchor="middle">` elements anchored at the arrow-tail x's — viewBox 157.1, 302.2, 463.9, 611.4 — or restore the original spacing. Re-render and **re-read the rendered SVG** before signing off; then run `python3 scripts/image_ratios.py` and commit `assets/book.css`.
*Raised by: checker-figure-claims #1 (BLOCKER), checker-technical-accuracy A #4.*

**4. [B-6/hardware] `:540-548`, `sl-day13-analyzer-wiring` `:551-554`, `task-day13-sweep` `:607-611`, `plans/day13.md:42-45` — the analyzer setup is NOT Day 9x's unchanged, and at Day 9x's time base the capture cannot contain the trace.** Confirmed from the committed original `WaveformsA.png`: Base 50 µs/div, Position 200 µs. The two transactions span ≈0–405 µs; Day 9x's taught 20 µs/div (`ch-i2c:752`, `:784`) gives a 200 µs window that cannot hold both at any position.
**This is collision (a), resolved without averaging:** the correction is stated in *one line* and the Day 9x re-narration is cut to make room. cognitive-load is right that the setup is re-narrated at full strength while claiming to be routine; tech-A is right that the one thing which is *not* routine must be taught. Cut the routine, keep the change.
*Part 4 prose, replacing `:540-548` whole:* "We'll put the AD2's digital leads on the two wires with the same setup we used on Day 9x (`<xref ref="fig-ad2-digital-wiring"/>`), with one change: this read is two transactions and takes about 400 µs, so in Waveforms set the time base to 50 µs per division rather than 20, and drag the view so the first START sits at the left."
Mirror as the single new-information bullet on the Waveforms slide (item 5) and as one clause in the merged setup task (item 15). Correct `plans/day13.md:42-45` with it.
**DISPLACES:** the decoder-step re-narration in the prose and both slide bullets; the DIO0/DIO1/ground mapping *moves* into the new figure's caption (B-18 prefers move over rewrite). Net shorter.
*Raised by: checker-technical-accuracy A #1 (BLOCKER), expert-cognitive-load #3, checker-figure-claims #9, checker-voice (`:540-548`, the missing "we").*

**5. [P-4/S-18] ONE figure plan for Part 4 — collision (b) resolved.** Three defects, one cause: Part 4 has no picture of the physical AD2 hookup, so the slide titled "Wire the AD2 to your setup" projects a Waveforms screenshot with no wiring in it, and its note says "the screenshot has them" about decoder steps that live in a different figure. Day 9x made logic mode optional; Day 13 is the first day every student must find the larger bundle.
(a) **New figure `fig-ad2-digital-wiring`**, in Part 4 immediately before the wiring slide. Asset, no Petra dependency: derive from `assets/images/Day10-I2C(2)/display_wiring_ad2.svg`, which already draws the AD2 connector with pins 0 and 1 labelled — move the two leads to DIO0/DIO1, recolor pink/green, keep the black ground lead. *Caption:* "The AD2's digital channels — the larger flying-lead bundle — on the bus: DIO0 (pink) to the SDA row, DIO1 (green) to the SCL row, and black to ground. The STEMMA leads and the display stay where they are."
(b) **`sl-day13-analyzer-wiring`**: retitle to "Wire the AD2's digital leads: DIO0 to SDA, DIO1 to SCL", `ref="fig-ad2-digital-wiring"`, drop `stack="yes"` and the deck entry's `refPage`. Body: the pin-mapping bullet only.
(c) **Split off `sl-day13-analyzer-waveforms`**, `ref="fig-waveforms-decode"`, `refPage="subsec-day9x-debrief.html"`, title "Waveforms in logic mode: the decoder, and one change". One bullet: "Trigger on DIO0 falling, single sweep, add the I2C decoder with DIO1 as clock and DIO0 as data — and set the time base to 50 µs/div, because this read is two transactions." Note: "≈ 2 min. Do not re-teach the decoder steps — the room did this on Day 9x and the figure has them. The one thing that is new is the time base." Deck: insert after entry 16; the 5-minute wiring beat splits 3 + 2, **no minutes added**.
**Point at `fig-waveforms-decode`, not `fig-waveforms-setup`** — the setup figure's caption says "set the time base to 20 µs per division" and must not be on the wall on a day that teaches 50.
**DISPLACES:** the new caption absorbs "— the larger flying-lead bundle —" and the whole pin-mapping clause from the Part 4 paragraph and the slide's first bullet; slide (c) is a split of an existing beat.
*Raised by: checker-arc-fidelity #1 (MAJOR), learner-visual #2 (P-4), checker-figure-claims #4 (BLOCKER), #5 and #9. **Convergence, not duplication:** figure-claims asked whether the picture shows what the text claims; learner-visual asked whether it teaches. Both.*

**6. [P-1] `:421-426` — `>>` is used and hand-derived in Parts 3, 5, 6 and 7 and has never been taught anywhere in this course.** Repo-wide the right-shift operator appears nowhere outside this chapter; Day 9x deliberately derived the address in binary without it. Left shift *was* taught with worked mechanics in ch-intro-blinky — that is the hook.
Resolution of the rigor/accessibility shape: **scaffold the operator at first use, keep the payoff in Part 5.** Do not evaluate `(0x32 >> 1)` here or `task-day13-why-19` becomes a lookup (P-15).
*Replacing `:421-426`:* "Here is the whole of `whoami_test.c`. Notice the first `#define`: the device address is written `(0x32 >> 1)` — a number shifted right by one rather than written out. `>>` moves every bit of a value one place toward the least significant end, dropping the bit that falls off the bottom and bringing in a 0 at the top; it is the mirror of the `<<` we have used on register bits since the first GPIO write. What that does to `0x32`, and why the address is written this way at all, is a question for the logic analyzer."
**DISPLACES:** `act-day13-whoami`'s introduction (`:382-388`) drops to one sentence — "Reading the WHO_AM_I register is what `whoami_test.c` does, once a second, forever." — which Part 3 and `sl-day13-whoami-proves` already say twice over. Paragraph count unchanged. The signed/arithmetic-shift subtlety stays where the Reference manifest already puts it (`sec-accel-reference`) — depth added at the top, not removed from the middle (P-3).
*Raised by: expert-continuity-auditor #1 (BLOCKER, P-1); checker-voice `:423` (its rewrite carried verbatim as the first sentence). Subsumes learner-in-the-room #8.*

**7. [B-4] `:113-117` — the HT16K33 is named as the example of register-addressed operation; the book says it is the exception.** `ch-i2c:4310`: "The HT16K33 is unusual in being almost stateless… Most I2C parts are organized as a set of numbered registers instead." The inversion also mis-primes `task-day13-stretch-display`, whose whole point is that the display has no WHO_AM_I.
*Swap, same length:* "Where the HT16K33 took one-byte commands (`<xref ref="ch-i2c"/>`), the accelerometer is operated entirely through its internal registers: each register has an address inside the device, …"
*Raised by: checker-technical-accuracy A #2 (BLOCKER).*

**8. [B-11c] `assets/decks/day13.json:46` — the Part 4 rescue for a failed WHOAMI cannot work as written.** There is nothing repeating to trigger on: the program stops after one transaction on a failed write (already published at `ch-i2c:4218`), so a single sweep armed mid-class catches nothing without the arm-then-reset technique, which the note does not name. This is the fail-open scaffolding for exactly the students who most need it.
*In place:* "…A student whose WHOAMI never succeeded still captures, but only with the trick from later today — arm the single sweep, then press reset; a failing program stops after one transaction, so there is nothing repeating to trigger on."
**DISPLACES:** presenter note; no student-facing words.
*Raised by: checker-technical-accuracy A #7.*

**9. [correctness] Four false statements, four swaps — each shorter than what it replaces.**
- `:57-59` "held HIGH by pull-up resistors whenever no device is transmitting" is false for open-drain and contradicts the chapter's own NACK mechanism (the acknowledge bit is *inside* a transaction). → "…both held HIGH by pull-up resistors unless a device is pulling one LOW."
- `:80-83` "The code for all five functions … is in `subsec-i2c-ref-library`" — that subsection has two program blocks. → "The register-level detail of how they work is in `<xref ref="subsec-i2c-ref-library"/>`." *(−5 words)*
- `:368-371` + `sl-day13-wiring` note `:377` "the breakout's pin row is marked 3.3V–5V" — the silkscreen reads VIN · 3V · GND · SCL · SDA · INTM; "3.3V-5V" is her callout label for VIN, and a student sent to find "3.3 V" has two candidates on the board. → "The pin the red wire feeds is VIN; the breakout carries its own regulator, so on our Nucleo it goes to 3.3 V." Same swap in the slide note.
- `:916-918` + `sl-day13-recipe` `:941` "the same five steps it followed for the display on Day 10" — ch-i2c never enumerates a recipe; it teaches the layering discipline. The five steps themselves are faithful to her slide 28. → "Writing a device driver follows five steps — the same discipline you followed for the display on Day 10…"
*Raised by: checker-technical-accuracy A #6, #5, #3 and B #4; checker-figure-claims #2; expert-continuity-auditor #2.*

---

## Should fix

**10. ONE plan for slide 5 — collision (c) resolved.** `sl-day13-back-to-i2c` `:301`, `ins-day13-keep-display` `:323-332`, deck entries 5 and 7. P-15 wins on *placement*; arc and figure-claims win on the *asset*.
- Drop `ref="fig-uart-vs-i2c"` and `stack="yes"` from the slide, and `"refPage": "subsec-day9x-shared-clock.html"` from deck entry 5. The slide is 45% UART with no bullet mentioning UART, and the multi-device bus picture is the picture-form answer to a commit two slides away.
- Bullet 2, fragment repair (voice `:304`): → "It speaks the same protocol and uses the same library: the five functions we have been calling since the display are all we need to talk to it."
- **Put her bus picture where it is the answer:** a bare `<image source="images/Day09X-I2C/i2c_bus_two_wires.svg" width="80%"/>` inside `ins-day13-keep-display`, after the paragraph. It projects on the reveal — her slide 5's own full-width layout — and is stripped from the student book, so B-18 is untouched. *(If the player drops a bare image inside `<instructor>`, fall back to a one-image `<slide xml:id="sl-day13-one-bus">` placed after the block, with its own deck entry after entry 7.)*
- Do **not** crop the shared `fig-uart-vs-i2c` — it is ch-i2c's.
**DISPLACES:** nothing student-facing added; the bullet is an equal-length rewrite.
*Raised by: checker-arc-fidelity (layouts), checker-figure-claims #6, learner-visual #4.*

**11. The repetition census — one item, four cuts, all net-negative.**
- **Stop-then-start, told four times in ~15 min.** Keep the prose/transfer-slide pair and the spoken reveal. **Delete** the restatement from `sl-day13-memread-write`'s note ("AUTOEND here is where our library chooses a STOP where the datasheet draws a repeated START"); **reduce** `sl-day13-memread-read`'s note to the one-clause callback ("…which is what put the device address on your screen twice.").
- **Delete** the repeated-START sentence from `ins-day13-digging-deeper` ¶2 — it *moves* to `sl-day13-transfer-pattern`'s caption (item 14), where the room is looking at the SR. This is also learner-in-the-room #4's finding: the diagram slide asks students to find what the reveal told them one slide earlier.
- **STEMMA "only goes in one way" ×3:** keep the reading `:104-105` and the figure caption; delete from `sl-day13-wiring`'s note.
- **WHO_AM_I-proves-communication ×2 inside the reading:** trim `rq-accel-whoami-purpose`'s correct-answer feedback to a bare confirmation.
*This item is where several additions elsewhere are paid for.*
*Raised by: expert-cognitive-load (census, #2, #4), learner-in-the-room #4, checker-voice.*

**12. `:659-662` `task-day13-why-19` — the premise is false twice over.** At this point the only file with the `#define` is `whoami_test.c` (the header arrives in Part 7), and both files write `(0x32 >> 1)`, not `0x32`. The room has seen no header and has seen `(0x32 >> 1)` on the wall twice.
*Swap, same length:* "The program writes the device address as `(0x32 >> 1)`. Where does the 0x32 come from, and why does the decoder print `h19`?"
*Raised by: checker-technical-accuracy B #3, learner-in-the-room #1 — the same finding from a checker and a persona.*

**13. [P-7/P-2] `act-day13-digging-deeper` `:653-677` — split the why-19 question out, and delete the prohibition in its introduction.**
- **Restructure:** move `task-day13-why-19` into its own one-task activity `act-day13-why-19` immediately before, answered aloud on the spot, leaving the two committed questions together. The plan's staging currently lives only in a deck presenter note; this puts it in the source. Deck: its own entry ahead of entry 22.
- **Introduction `:655-658`:** delete "Answer from the capture on your own screen, not from the book." → "Answer these from your own decoded trace."
**Collision resolved by removing the prohibition, not by adding a rescue.** The anxious learner's BLOCKER is real — that sentence forecloses the fallback for the student whose capture failed — but S-25 bans rescue language in student-facing text and records a previous Gate 2 synthesis being overruled by Petra on exactly this move. Deleting the *prohibition* fixes the wall at zero words; the fail-open scaffolding stays where the rule wants it (the projected capture on the wall, the Part 5 presenter note).
*Raised by: expert-cognitive-load #1, learner-anxious-nonhardware #1 (BLOCKER).*

**14. [P-11] `:724-734`, `sl-day13-transfer-pattern` `:719-722`, `ins-day13-digging-deeper` ¶1 — cite the two datasheet moments, and gloss the diagram's letters on the wall.** Both citations verified in the PDF: §6.1.1, Tables 20–23, p. 38 (Table 22 is the shape on the trace); Table 24, p. 39 for the 8-bit address form.
- *Prose `:726-727`:* "…is the datasheet's own drawing of what you captured — §6.1.1, Tables 20–23, and Table 22 is the shape your trace has." **DISPLACES** "the write pattern and the read pattern, with every field named" (generous: the figure carries four transfers).
- *Slide caption, replacing the current one:* "The datasheet's own drawing of what you captured — Table 22 is the shape your trace has, and its *Master* row is our controller, its *Slave* our target. SAD is the device address, SUB the register number inside it; SAK is the target's acknowledge and NMAK the controller's own — the N on your trace. Where the datasheet draws SR, a repeated START, your trace shows a STOP and a fresh START." **DISPLACES:** the last sentence *moves in* from the instructor block (item 11), and the Master/Slave bridge moves up from the presenter note.
- *Instructor ¶1, append:* "The datasheet gives the 8-bit form in Table 24, p. 39. The 0x7F test from Day 10 cannot settle this one — 0x32 is below 0x7F either way."
*Raised by: checker-technical-accuracy B #6, #12, #14; checker-figure-claims #7 and its notation list; learner-in-the-room #4.*

**15. `act-day13-capture` `:601-611` — merge the two setup tasks; the weight belongs on reading the trace.** Tasks (a) and (b) are the wiring slide's bullets word for word.
*One task replacing both:* "Wire the AD2's digital leads (DIO0 pink to the SDA row, DIO1 green to the SCL row, black to ground), then in Waveforms' logic mode trigger on DIO0 falling, set the time base to 50 µs per division, take a single sweep, and add the I2C decoder with DIO1 as clock and DIO0 as data."
**DISPLACES:** two tasks become one; this is where item 4's time-base correction lands in the student's hands.
*Raised by: learner-in-the-room #7, checker-technical-accuracy A #1, expert-cognitive-load #3.*

**16. [P-15] The two wall listings: delete the answer, restore the prototype.**
- `sl-day13-predict-code` `:587` **and** `sl-day13-whoami-main` `:481` — **delete** the trailing `// 7-bit address 0b0011001` from the `#define`. It is the answer to Part 5's why-19 puzzle, projected while the room commits. (It stays in the book's verbatim Part 3 listing: that is her file, `check_starters.py` enforces byte-identity, and a comment in a file already open in the student's editor is not the answer drawn on the wall.) Update both slide notes' elision lists.
- `sl-day13-predict-code`, **add** one commented prototype so the signature is on screen during the capture — Gate 1's R1 asked for the code beside the trace and only half of it is there: `// void i2c1_memRead(uint8_t deviceAddr, uint8_t registerAddr, uint8_t nbytes, uint8_t *data);`
- `sl-day13-whoami-main`, **restore** the stripped `uint8_t lsm303_AccelRegisterRead(uint8_t RegisterAddress);` — the one line that says RegisterRead is defined *in this file*, not in the library. Displaces a blank line.
- Deck entry 13 title → "lsm303_AccelRegisterRead() is one call into the I2C library" (the current title compounds the same confusion against entries 40/42, where students write these functions).
*Raised by: checker-arc-fidelity #2, learner-in-the-room #3.*

**17. Collision (d) resolved: her slide 7's five functions reach the wall via Part 3, not Part 1.** `sl-day13-whoami-read` `:506-518`.
Vehicle chosen: the Part 3 slide that already names them in a presenter note, beside the actual `i2c1_memRead()` call. Not the Part 1 resurface bullet — that is a 3-minute recall beat and cannot carry five signatures without displacing the device introduction.
*Slide body sentence:* "`lsm303_AccelRegisterRead()` is a single call into the I2C library we have been using since the display — `i2c1_init()`, `i2c1_byteWrite()`, `i2c1_byteRead()`, `i2c1_memWrite()` and `i2c1_memRead()` are the whole of it, and this is the last of them, asked for one byte from one register:"
*Note becomes:* "≈ 1 min. Five functions, named once on the wall — this is the one that does register reads."
**DISPLACES:** a move, not an add; the presenter-note clause becomes redundant and goes.
*Raised by: checker-arc-fidelity #3, checker-voice (`:304`, reuse of her slide 7).*

**18. checker-voice's rewrites, carried verbatim.** Each is a swap at equal or shorter length; each checked against S-16 — none weakens a technical claim.

| where | draft | replacement |
|---|---|---|
| `:1114` `sl-day13-homework` caption | "Tomorrow: how the sensor works inside.  Thursday: acceleration data out of it, and into Lab 7." | **her own slide 32 sentence:** "Wednesday and Thursday we'll get some acceleration data out of the sensor, and then use it in Lab 7." (the Day 9x rejected epigram shape) |
| `:706` prose | "Same name, opposite meanings — one ends a read on purpose, the other means nobody answered." | "The two are opposite: the controller's NACK ends a read on purpose, and the other one means that nobody answered." |
| `:714` `sl-day13-two-nacks` | bullet 3 | **DELETE** — its halves are bullets 1–2 verbatim. The freed slot pays for the NACK expansion and the A/N/P gloss below. |
| `:335` | "The answer is no — and it is worth saying why." | "No — the display stays, and both devices share the same two wires." |
| `:698` | "That last answer is worth a name, because two different things on this bus are both called NACK." | "Two different things on this bus are both called a NACK — a not-acknowledge." (the acronym is never expanded in this chapter) |
| `:953` | "Step 2 is already done, and it is worth seeing where it came from." | "Step 2 is already done, and here is where it came from." |
| `:473` | "proves what the reading said it proves: the wiring, the address, and the read path all work." | "A successful 0x33 proves the whole read path: the wiring, the device address, the protocol and the code all had to work for that value to arrive." (S-26) |
| `:815` `task-day13-break-restore` | "…before Part 7." | "…before we move on." (L-18 — the draft's only student-facing "Part N") |
| `:1019` + deck entry 39 | "The header is the table" | "Check the header against the datasheet." (S-18; the identity claim survives as `sl-day13-header`'s first line) |
| `:341` | "you will use exactly this: both devices, one bus." | "you will run both devices on the same bus." |
| `:1034` + `:1062` | "the whole interface the rest of the week builds on" | "the interface we'll build on for the rest of the week." (S-20) |
| `:737` `sl-day13-memread-write` | "Everything you captured came from one function, and it makes your trace's first transaction like this:" | "Everything you captured came from one function, `i2c1_memRead()`.  Here is the half of it that produces your trace's *first* transaction:" |
| `:632` `sl-day13-capture-c` caption | "…Find all three values on your own screen." | "…h19 RD · A · h33 · N · P — where A is an acknowledge, N a NACK and P a STOP.  Find the device address, the register address and the returned value on your own screen." (letters confirmed as the decoder's literal glyphs) |
| `:664` `task-day13-address-twice` | "On Day 10 we told you…" / "Confirm it on your trace" | "On Day 10 we saw…" / "Confirm it on the trace in front of you" |
| deck entry 35 + agenda | "A driver begins" | her own "Accelerometer device driver" (deck strings only; the book subsection title is structural and stays) |

*Raised by: checker-voice; `:632` also learner-visual #3, `:815` also expert-cognitive-load.*

**19. The three capture strips — ONE plan, collision (i), ships without waiting for Petra.** Measured: all three project decode glyphs at ≈1.2–1.4% of slide height against a 1.9% floor, and the projected capture is the designated rescue for the crucial step. The originals `WaveformsA/B/C.png` are committed at 2880×2052, so the crops are ours to re-cut.
- **Capture A — re-cut now; it gains the most.** Its one transaction occupies ~18% of the frame. Crop to the transaction plus the row labels (approximately x 0–1290, y 610–880 of the original): ~2.2× larger glyphs, aspect near 5:1 instead of 12.6:1. This also removes the stray red segment at the top (the Ready box's bottom edge).
- **Capture B — crop one row off the top** to remove the same red segment. Its transactions already fill the width; horizontal cropping buys nothing.
- **Capture C — leave it.** Its two transactions already fill the frame, and splitting it into write-half and read-half views would pre-segment the very thing Part 4's crucial step and Part 5's address-twice commit exist to make the room find (P-15).
- B and C therefore go to Petra as a **re-export request** (escalation 1), not as a patch task — the defect is the source aspect ratio, and layout cannot fix it.
- Then `python3 scripts/image_ratios.py` and commit `assets/book.css`.
*Raised by: learner-visual #1 (B-11a) and checker-figure-claims (legibility, #8). Convergence: one asked whether the picture teaches, the other whether it shows what the text claims.*

**20. [S-8] Fund the restore step; give Parts 5–8 a stall-catcher.** `day13.json:79-80` (Part 7 note), `:66-67` (Part 6 note), `sl-day13-wiring` note.
`task-day13-break-restore` is a full edit-build-flash-verify cycle for the whole room with zero budgeted minutes, and Day 14 needs "the sensor wired and verified" — otherwise boards go home flashed to 0x30. Parts 5–8 are 45 minutes with no checkpoint.
*Part 7 note, prepend:* "Boards reflash to 0x32 during this beat: launch the restore as the layers slide goes up and talk over it — layers and recipe are pure lecture and cost the room nothing. Then look up: is everyone back to 'Accelerometer initialized!'? That is the checkpoint for Parts 5–8."
*Add the display fallback (three intervening kit-packing days, no rescue of its own):* "If a display looks dead after three days in a kit, don't stop to fix it now — the point still holds."
**DISPLACES:** presenter notes only; **no minutes added** — the restore is choreographed onto an existing lecture beat rather than funded out of the debrief, and item 26 buys ~1 min back in the tightest Part.
*Raised by: expert-class-logistics #1, #2, #4.*

**21. The precision swaps — nine one-word or one-clause corrections, all shorter or equal.**
- `:124-126` "the special register called WHO_AM_I always contains 0x33" — true of WHO_AM_I_A; Table 26 also has WHO_AM_I_M = 0x40. → scope it to the accelerometer's WHO_AM_I register.
- `:103-106` "a 4-wire plug that only goes in one way, so it cannot be miswired" — her citable words are about the connector; the four male ends at the Nucleo can go into the wrong rows. → "…so the connector end cannot be miswired."
- `:207-211` `i2c1_byteRead()` "takes only a device address" — it takes two parameters. → "takes only a device address, no register address."
- `:468-470` "The one function this program defines" — the listing defines two. → "The only function this program defines besides `main()`…"
- `:152-156` reading-question answer "Every transaction begins with a 7-bit device address" — ch-i2c is more careful. → "…begins with a device address — seven address bits plus a read/write bit."
- `:987-989` "for each register, the header records the power-on default" — refuted by the six `OUT_*` lines directly above. → "for each control and status register".
- `sl-day13-recipe` note `:949` "Steps 1 and 2 are already done" vs `:1032` "Step 3 is also done". → "Steps 1–3 are already done".
- `:702-707` [B-8] the nobody-answers NACK is re-taught, not recalled (Day 9x Part 4 and Day 10 Part 9 both taught it). → "The other kind is the one you met on Day 9x and produced on Day 10: nothing pulls SDA LOW during the acknowledge bit and the wire simply stays HIGH."
- `:858-860` "If you asked *it* for register 0x0F" vs ch-i2c's "almost stateless". → "If you sent 0x0F to it as a register address, the way this program does to the accelerometer…"
*Raised by: checker-technical-accuracy A #8–#11, #14; B #9, #11, #13, #15.*

**22. [B-11c] `:876-884` + `:856-864` — the display-stretch answer asserts device behavior with no source, and its task is knotted.** Whether `i2c1_memRead(0x70, 0x0F, …)` completes is a claim about the HT16K33 with no datasheet in the repo. The address-ACK half is solid. Separately, the task says "no capture needed yet" and "You have everything on your desk to check" in one breath — a reviewer could not do it.
*Instructor ¶2:* "For the display question: the address 0x70 gets an ACK — the display is on the bus and recognizes it — and that ACK is the whole point: it proves you reached *a* device. Whether the read then completes, and what byte comes back, is discoverable on their own bus; let whoever captures it report it. The WHO_AM_I value is what proves you reached the *right* device, and the HT16K33 has no such register."
*Task:* drop "no capture needed yet"; end "Predict first, then check it on your own bus."
*Raised by: checker-technical-accuracy B #7, learner-in-the-room (tasks-I-could-not-do), checker-technical-accuracy B #15.*

**23. [B-8a] `:468-477` — say where the failure leads, without saying what it prints. Q3 ruling.** Every student runs a program whose else-branch prints `Could not connect to accelerometer`, and nothing student-visible says that failure is expected, informative, or where it goes.
**Ruling on the anxious learner's proposed clause: the first half is Q3-safe** — it describes the program's own else-branch, verified in the listing at `:448-453`, and asserts nothing about a wrong-device-address NACK. **The proposed trailing clause is not.** "and Part 6 produces the identical result on purpose" asserts that the wrong-address change produces that same print — precisely the open question — and it breaks L-18. Cut it.
*Append to the paragraph rewritten in item 18:* "If it prints `Could not connect to accelerometer` instead, that is data too — the analyzer we are about to put on the bus shows exactly what the wire is doing."
**DISPLACES:** the paragraph's second sentence ("It is not yet evidence about how the sensor is configured — that work is still ahead of us"), which survives on `sl-day13-whoami-proves` bullet 2, in the reading `:134-142`, and in `rq-accel-whoami-purpose`. Net shorter.
*Raised by: learner-anxious-nonhardware #2.*

**24. `task-day13-break-capture` `:806-811` — say that the blank screen is normal.** Both single-sweep captures show nothing until reset is pressed, and the only sentence saying so is spoken.
*Append:* "The trace stays blank until you press reset — that is the sweep waiting, not a fault."
This is instrument behavior, not classroom management; S-25 does not reach it. **DISPLACES:** `sl-day13-capture-a`'s note drops its duplicate "Single sweep then reset is the reliable way to catch it" (also in `ins-day13-break-it`).
*Raised by: learner-anxious-nonhardware #3.*

**25. Collision (g) resolved: the NACK is in no line of the read code, and the slide never says why.** `sl-day13-memread-read`.
**Ruling: the proposed wording does not enter now.** "NBYTES tells the peripheral how many bytes to take, and it NACKs the last one" is a hardware claim with no source in this repo — the Reference documents NBYTES + AUTOEND → STOP (`ch-i2c:2920-2922`, `:4115-4121`), not the peripheral NACKing the last *received* byte. But the pedagogical hole is real and the beat should not be deferred whole. Ship the half the repo supports, in the book's own published framing (`ch-i2c:3034`: "It describes a transaction and reads flags; a state machine in silicon does the rest").
*Add as the slide's caption:* "The NACK is not a line of code. This function describes the whole transaction to the peripheral in advance — how many bytes (`NBYTES`), and what to do at the end (`AUTOEND`) — and the state machine in silicon puts the acknowledge bits and the STOP on the wire."
**DISPLACES:** the note's RD_WRN restatement and "Match each piece to the trace as you go" compress to one clause (item 11).
The mechanism goes on the verify list: check the Reference Manual §23.4 (L-14 — say *Reference Manual*) for whether the final NACK is NBYTES-driven. If confirmed, a later pass sharpens the caption to name it.
*Raised by: learner-in-the-room #5.*

**26. Deck ordering, drops and strings.** `assets/decks/day13.json`.
- **Swap entries 24 and 25** (`sl-day13-transfer-pattern` ↔ `sl-day13-two-nacks`) so the deck follows the book: NACK ¶ → two-nacks → transfer-pattern. *(arc #4)*
- **Swap entries 33 and 34** (`ins-day13-break-stretch` ↔ `sl-day13-capture-b`) — the stretch reveal fires before its evidence; every other reveal today is trace-then-reveal. *(in-the-room #6)*
- **Drop entry 31** (`ins-day13-break-it`) from the deck. ~80% of it is entry 30's caption re-projected, its stage directions are already in entry 30's note, and it puts the internal "(Petra is checking…)" editorial on the projector. **Keep the `<instructor>` block in the source** — the instructor book needs the answer; only the projection goes. Buys ~1 min in the tightest Part, which item 20 spends. *(in-the-room #2)*
- **Part 2 section note:** add the checkpoint float as Part 4 already names it — the slide budgets total 20 against a stated 22. *(tech-A #12)*
- `:56` "neighbour's" → "neighbor's" (L-7).
- Retitles from items 5, 16 and 18: entries 13, 16, 35, 39; new entry for `sl-day13-analyzer-waveforms` after 16; new entry for `act-day13-why-19` before 22.

**27. Four source comments that stop the next pass undoing a decision.**
- Beside the Part 3 listing: the Table 13 → Table 22 correction (her file says 13; the book prints 22) and the delivery ask — the change is invisible to `check_starters.py` and unrecorded. *(arc #5)*
- Beside the two wall listings: `// 7-bit address 0b0011001` is **deliberately dropped** from the slides (P-15) and **deliberately kept** in the book's verbatim listing (byte-identity) — restore neither. *(arc #2; P-15's own instruction to leave the note)*
- Beside `fig-whoami-capture-wrong-register`: CTRL_REG1_A named in Part 6 ahead of Part 7's register map is **intended** mystery-then-explain; Part 7's "You met one of those defaults already" is the tie-back. *(continuity #3, confirmed)*
- Beside the header listings: the two comment elisions from `lsm303agr.h` ("(Sec 6, 7.1)" and "Section 7.1 of") — the file is not registered in `check_starters.py`, so the divergences are silent. *(tech-B #8)*

**28. `ins-day13-break-it` `:827-829` — record the two coexisting stances on the wrong-address hang.** `ch-i2c` Day 10 Part 9 already asserts the hang student-facing with the RM §23.4.9 citation, and `subsec-i2c-ref-library` repeats it. The draft does not contradict it, but the stances coexist unrecorded, and if Petra switches the library, ch-i2c changes too.
*Replacing "(Petra is checking the library's wrong-address behavior; the affected sentence lands after that.)":* "Day 10 Part 9 and `<xref ref="subsec-i2c-ref-library"/>` already give the wire-and-program story from the Reference Manual §23.4.9; Petra is re-checking it, and any change lands in ch-i2c too."
This lives in an `<instructor>` block, stripped from the student book and (after item 26) no longer projected — so it stays internal, as Q3 requires.
*Raised by: checker-technical-accuracy B #5.*

**29. Three reachability clauses, including collision (e).**
- `task-day13-wire` `:389-395`: "the same SCL and SDA rows the display is already using" asks a student new to breadboards to recall `fig-display-wiring` from two chapters ago, unprompted, and "the SCL row" is not findable by name. → "…The display stays where it is — both devices share the bus, on the same two breadboard rows (`<xref ref="fig-display-wiring"/>`)." And give both pin names once, per CLAUDE.md's both-names rule: "yellow to SCL (D15, PB8), blue to SDA (D14, PB9)" — D15/D14 established at `ch-i2c:188` and `:2528`. **DISPLACES:** the caption's "3.3V–5V" clause, already being shortened by item 9.
- **Collision (e) ruled:** `:89-96` the SPI aside. firstgen is right that an acronym expanded then abandoned reads as one more thing to know; P-12/B-8a are right that the aside is hers (her slide 4). **The defect is the expansion, not the fact.** → "We talk to it over I2C.  (The chip can also use SPI, a different serial bus we don't use in this course; the breakout is wired for I2C.)" *(−4 words; her aside kept, the dangling expansion gone.)*
- `:952-959`: the `_A` suffix is never explained and the known magnetometer makes the ambiguity real. → append: "the `_A` in every name marks the accelerometer's half of the register map; the magnetometer has its own, which we don't touch." **DISPLACES:** paid by the SPI rewrite and item 21's shortening of `:987-989`.
*Raised by: learner-firstgen-novice #1, #2, #3; CLAUDE.md both-names; checker-voice and checker-figure-claims (notation).*

**30. Placement and markup — three mechanical fixes.**
- `:952-959`: wrap the first in-class datasheet mention in `<url href="external/datasheets/lsm303agr.pdf">` — the in-class datasheet moment cannot be opened from the in-class page, where ch-motors links the PDF at each in-class use. *(arc #7)*
- `:571-582`: move `ins-day13-predict-decoder` below `fig-whoami-capture` — in the instructor book it currently reads the answer before the work (P-6). Deck order is already correct and does not change. *(tech-A #13)*
- `:323-343`: one XML comment tying the twin Part 1 answers (instructor block + student paragraph) so they do not drift; apply item 18's `:335` and `:341` rewrites to the **student paragraph only** — the instructor block is hers. *(tech-A #15)*

---

## Consider

- `sl-day13-capture-a` caption: append learner-visual #3's instruct-form ending — "find the N on your own trace" — **only if** the re-cut in item 19 makes the N findable from the back. Otherwise it asks for something the projection cannot deliver.
- `ins-day13-predict-decoder`'s first lines re-read `sl-day13-capture-c`'s caption. Below the repetition cap, but if Part 4 runs long this is the beat to compress.
- `fig-firmware-layers` renders I²C where the book writes I2C — cosmetic; no action this delivery.
- Slide 5's crop budget is ~35 px; one more bullet crops the figure. With the ref removed (item 10) the risk is gone, but the constraint returns if anyone re-adds an image there.

---

## Escalate to Petra

- **Captures B and C project below the legibility floor, and cropping cannot fix it.** Their transactions already fill the frame; the strip is 12.9:1 because the Waveforms window was tall and the signal rows thin, so the decode glyphs land at ~1.3% of slide height against a 1.9% accepted floor — and the projected capture is the designated rescue for the crucial step. **Recommendation:** ask her to re-export `WaveformsB` and `WaveformsC` with the signal rows dragged taller (or the window shortened) so the strip comes out nearer 1:6. Capture A we re-cut ourselves this delivery. Do not patch these crops further — the defect is the export, not the crop.
- **The Part 4 setup photo.** Her slide 9's Fritzing is unusable (the sensor drawn is an MPU-6050 and its red lead runs from a 5 V pin) and her slide 14's clean AD2 photo shows the instrument, not the setup. **Recommendation:** request one photo — breakout with its STEMMA cable, the SCL and SDA breadboard rows with the display still on them, the 3.3 V and GND feeds (never 5 V), and the AD2's DIO0/DIO1/ground leads landed. **Trade-off:** the derived SVG in item 5 covers the day, so this is an upgrade for the next delivery, not a blocker for this one.

---

## Ask-Petra list and handover

- **Q3-dependent sentences to revisit when it lands:** the reading `:139-141` "reports failure if the expected value does not come back" (generic, hedged and true of AccelInit — but the sentence to revisit if Q3 lands on "unreachable"); Part 6's DELIVERY-2 debrief paragraph, still owed and still blocked; `ins-day13-break-it`'s "Do not assert what CoolTerm prints"; item 23's new clause, written to survive either outcome.
- **Stale-comment list for her files** (flag, do not edit): `LSM303_REFERENCE_A // r` in `lsm303agr.h` vs Table 26's R/W — her file's one-word error, which the book now carries in two listings; `whoami_test.c`'s "(Datasheet, Table 13)", printed as Table 22 in the book.
- **Tooling:** register `lsm303agr.h` in `check_starters.py`, or the four header listings drift silently.
- **DELIVERY 2 still owes** the Day 13 in-class section opening — the one sentence that gets a draft rejected whole. The recap items are already in the passed shape and can be lifted into it (checker-voice).
- **Unverified, one line from her each:** the breakout's 3.3–5 V tolerance (needs the schematic) and "the plug goes into either socket" (rests on the photo).
- **Verify before the caption sharpens:** Reference Manual §23.4 on whether the peripheral's NACK of the final received byte is NBYTES-driven (item 25).
- **Confirmed, no change, recorded for Day 13x's session:** homework item 3's two-register specificity pre-empts Day 13x slide 11's naming but not its teaching (the bit fields), and `plans/day13.md` Hand-offs authorizes it. Also recorded: L-17 is deliberately **not** applied to bus-protocol talk in this chapter ("tells the target to stop sending" survived her pass) — a later pass must not "fix" it.

---

## Rejected — every finding not adopted, with its reason

1. **learner-firstgen-novice #4** — "L-11 bans 'tomorrow'." It does not. The rule reads *"'on Day N', never 'in Day N' — or 'tomorrow', since Day Nx follows Day N"*, and `check_rules.py`'s L-11 pattern is `\bin Day \d` only; "tomorrow" is the *permitted alternative*, accurate here because Day 13x is the next calendar day. `:1102` stays as written. (The homework *slide caption* changes for an unrelated reason — item 18.)
2. **checker-voice's reuse of her slide 31's "names are borrowed from Adafruit's driver"** — B-11e. Its one surviving exception is naming, once, *the library a chapter replaces*, "where a student who has met it would otherwise wonder". Students here write the header themselves; no Adafruit library is being replaced and nothing prompts the wonder. B-11e's own history is a draft growing this back after it was cut — recorded here so it is not grown back a third time.
3. **checker-voice's expansion of `sl-day13-back-to-i2c` bullet 2 into the five functions with their jobs** — rejected as a *vehicle* (collision (d)); the same content ships in item 17 beside the call that uses it, at the cost of a presenter note instead of a 3-minute recall beat. The fragment repair from the same finding **is** adopted (item 10).
4. **learner-anxious-nonhardware #1's proposed added clause** ("if it didn't produce a clean trace, work from the figure — the values are the same by construction") — rejected as written. The BLOCKER is adopted in item 13 as a *deletion of the prohibition*; S-25 bans rescue language in student-facing text and records a prior Gate 2 synthesis being overruled by Petra on exactly this move.
5. **learner-anxious-nonhardware #2's trailing clause** ("and Part 6 produces the identical result on purpose") — asserts what the program prints on a wrong device address (Q3) and points at "Part 6" (L-18). The rest of the finding is adopted (item 23).
6. **learner-in-the-room #5's caption as worded** ("NBYTES tells the peripheral how many bytes to take, and it NACKs the last one and STOPs for you") — unsourced hardware claim; the beat ships in item 25 in the form the repo supports, and the mechanism goes on the verify list.
7. **checker-figure-claims' write-half/read-half split of capture C** — it pre-segments the two-transaction count that Part 4's crucial step and Part 5's address-twice commit exist to make the room find (P-15). See dissent.
8. **learner-visual #4's alternative fix** ("crop the slide's image to a generic two-wire bus, a slide-local image") — rejected in favour of deferring the picture to the reveal (item 10); a second cropped copy of a shared ch-i2c asset is a maintenance trap, and checker-figure-claims independently ruled against re-cropping shared figures.
9. **expert-continuity-auditor #2's alternative** ("or add the five-step list to ch-i2c") — rejected; the recipe is her Day 13 slide 28, and ch-i2c teaches the layering discipline rather than an enumerated recipe. The reframe in item 9 is truer and cheaper.
10. **checker-technical-accuracy B #16** — confirmed, no change: `plans/day13.md` Hand-offs authorizes homework item 3, and Day 13x's teaching is the bit fields, not the register names. Recorded above so Day 13x does not treat it as new.
11. **checker-technical-accuracy B #10 / A's out-of-scope note** (`LSM303_REFERENCE_A // r`) — not a book edit; her file's error goes to the ask-Petra stale-comment list rather than being silently corrected.
12. **expert-class-logistics #3** (10 minutes for copy + download + first build is credible only because the minute-35 checkpoint absorbs the tail) — stated for the record; the design compensates properly. No change.
13. **checker-figure-claims' crop-risk watchlist and the I²C/I2C mismatch** — no action; moved to Consider.
14. **checker-voice's L-17 sweep note** — no action by design; recorded in the handover so a later pass does not "fix" bus-protocol phrasing that survived her own pass.
15. **checker-arc-fidelity's "layouts she already solved: keep `sl-day13-wiring`, keep `sl-day13-transfer-pattern`"** — confirmations, not changes.
16. **learner-in-the-room #8** (`#14` bullet 1 restates `#10`'s introduction) — not rejected but **subsumed**: item 6's displacement trims that introduction to one sentence, which resolves it.

---

## Dissent worth recording

- **checker-figure-claims wanted capture C split into write-half and read-half views**, and it would double the glyph size on the wall and match the Part 5 walk exactly. I overruled it on P-15: the two-transaction count is what the room is asked to discover. **If the re-export does not come back before delivery and the room cannot read the decode row from the back — specifically if the address-twice question lands badly because nobody could see the second `h19` — the split is the fallback that ships.**
- **learner-visual wanted a photograph, not a drawing, for the AD2 hookup.** The derived SVG in item 5 is a drawing of a connector, and P-4's whole point is that a sentence-only instruction fails on a loaded breadboard. If the room fumbles the digital bundle despite the figure, the photo stops being an upgrade and becomes a blocker for the next delivery.
- **expert-cognitive-load's position implies Part 4's analyzer prose should be a single line with no time-base sentence at all.** Overruled by the correctness finding — but if the room turns out to carry Day 9x's settings forward anyway, the answer is the projected slide and the presenter's mouth, not more prose.