# Day 13 — Gate 3′ reports

Session: 2026-08-30, after Petra's pass-1 annotations (all 37 applied, commit 8810ea9)
and the new in-class connecting prose.  Under review: the 45-slide deck
(`assets/decks/day13.json`) and `sec-accel-day13`'s prose, together.
Her annotations are rulings; reviewers were briefed not to re-litigate them.


---

## learner-in-the-room

I walked all 45 entries in projection order in the built player at 1600×900, student-facing only (deck positions 7, 23, 27, 37 are `instructor: true` and were skipped).

### Verdict: MAJOR

### Slide walk

| # | slide | What I have that I didn't before |
| --- | --- | --- |
| 1 | title | The day's subject, and that it's the in-class hour. |
| 2 | recap | Where today sits: Day 10's display driver, the reading, and the three things today will do. |
| 3 | agenda | Eight named parts — and there are eight Parts. Correct. |
| 4 | section P1 | Glue. |
| 5 | sl-day13-back-to-i2c | The claim that carries the whole day: new device, *no* new bus, protocol or library — and that we use only the accelerometer half. |
| 6 | act-day13-keep-display | A question to commit to in writing. Answerable ("no — each device has its own address"). |
| 7 | *(instructor)* | skipped |
| 8 | section P2 | Glue. |
| 9 | sl-day13-wiring | Which breakout pin is which, and which Nucleo pin each colored lead goes to. **But the cable photo labels the red wire `5V` while the caption says 3.3 V** — see finding 2. |
| 10 | sl-day13-bb | Where it goes on *my own breadboard*: both devices on the same two rows. That is genuinely new — but it is the picture that carries it; both bullets restate slide 9's caption word for word, and the drawn red lead is on the Nucleo's 5 V pin. |
| 11 | act-day13-whoami | The three things to do. Concrete and doable. (Third statement in a row of the same four wires.) |
| 12 | section P3 | Glue. |
| 13 | sl-day13-whoami-main | The whole program: its shape, both `#define`s, the once-a-second loop, and the unexplained `(0x32 >> 1)`. Every identifier resolves — see "Undefined" for the one gap (`0x33`). |
| 14 | sl-day13-whoami-read | The five library functions **by name**, and that a register read is one `i2c1_memRead()` call. |
| 15 | sl-day13-whoami-proves | What a 0x33 does and does not prove — proof of communication, not of configuration. |
| 16 | section P4 | Glue. |
| 17 | sl-day13-analyzer-wiring | Which bundle is the digital one, and three leads by color. The pinout sheet beside it is the only thing here I can't see on my own desk — and it is small and unexplained (finding 5). |
| 18 | sl-day13-analyzer-waveforms | The Day 9x setup to reuse, and the one change: 50 µs/div because this read is ≈400 µs. **The title projects "50 MS/DIV"** (finding 1). |
| 19 | sl-day13-predict-code | A prediction to write, with exactly the code it depends on in view. I wrote: "one transaction: h19 W, 0x0F, then 0x33 back." |
| 20 | act-day13-capture | The capture procedure and the three values to hunt for. |
| 21 | sl-day13-capture-c | The trace itself, decoded — and the caption names all ten symbols (h19 WR · A · h0F · A · P, h19 RD · A · h33 · N · P). Legible at 1600×900. |
| 22 | sl-day13-capture-c-closeup | **Nothing.** The same ten symbols, larger; slide 21's caption already listed every one of them (finding 3). |
| 23 | *(instructor)* | skipped |
| 24 | section P5 | Glue. |
| 25 | act-day13-why-19 | The 0x19 question, asked. I wrote: "0x32 is the 8-bit form with the R/W bit; >>1 leaves the 7-bit 0x19." |
| 26 | act-day13-digging-deeper | Two things to find on my *own* trace: the transaction boundary, and every acknowledge bit with its sender. |
| 27 | *(instructor)* | skipped |
| 28 | sl-day13-two-nacks | The distinction the rest of the day rests on: the controller's deliberate NACK vs. nobody's. This is where the student view finally gets the answer to 26(b). |
| 29 | sl-day13-transfer-pattern | The datasheet's own four transfer shapes, its vocabulary (SAD/SUB/SAK/NMAK/SR) glossed in red, which one my trace is, and where mine differs (STOP+START vs SR). Strongest slide in the deck. |
| 30 | sl-day13-memread-write | The code behind the first transaction — one CR2 write describes the whole thing before any of it happens. |
| 31 | sl-day13-memread-read | The second CR2 write, `RD_WRN` as the only new field, and the idea that the NACK is not a line of code. |
| 32 | section P6 | Glue. |
| 33 | act-day13-break-it | The breaking edit, two written predictions, and the arm-then-reset technique with the "blank is expected" reassurance in writing. |
| 34 | sl-day13-capture-a | The wrong-address signature: one transaction, `h18 WR`, N, P. This is a real diagnostic — it distinguishes "nobody answered" from slide 21's "somebody answered". The CoolTerm half of 33(a) is never closed (finding 8). |
| 35 | act-day13-break-stretch | A second, harder break — and a display question I can predict but cannot execute (finding 4). |
| 36 | sl-day13-capture-b | The healthy-bus-wrong-value signature, and `h07`. Third distinct trace shape today; the set is now complete. |
| 37 | *(instructor)* | skipped |
| 38 | section P7 | Glue. |
| 39 | sl-day13-layers | The layer map re-anchored for the second driver, with the rule stated: the driver reaches the device only through `i2c.c`. |
| 40 | sl-day13-recipe | The five-step recipe, and that steps 1–3 are already done for this device. |
| 41 | sl-day13-header | The register map as a header file, with the DEFAULT column — and `(0x32 >> 1) // 0011001x`, which is the first time the 7-bit form appears in binary on the wall. |
| 42 | act-day13-header-tour | Two concrete things: download to `mylib`, check two rows against Table 26. |
| 43 | sl-day13-prototypes | The four-function interface for the rest of the week, and which one is tonight's homework. |
| 44 | section P8 | Glue. |
| 45 | sl-day13-homework | The three homework items and where the week is going. |

**The archetype-1 failure does not recur.** I checked every identifier on slides 30 and 31 against the Day 10 deck: `I2C1->CR2`, `I2C1->ISR`, `I2C1->TXDR`, `I2C_CR2_{NBYTES_Pos,AUTOEND,START,RD_WRN}`, `I2C_ISR_{BUSY,NACKF,TXIS,RXNE}` were all projected on `sl-day10-bytewrite` / `sl-day10-master-tx`. There is no listing here with its `#define` block stripped.

### Does not earn its place

1. **[MAJOR] `sl-day13-analyzer-waveforms` (#18) — the title projects the wrong time base.** The deck title contains U+00B5 MICRO SIGN; slide titles are `text-transform: uppercase` (`assets/class.html:50`), and CSS uppercases µ to Greek capital Mu. From the room the largest type on the slide reads **"50 MS/DIV"** — a factor of 1000 off, on the setup slide immediately before the capture activity. Not a BLOCKER only because the bullet underneath is correct. **improve**: retitle the deck entry to carry no µ — e.g. *"Waveforms in logic mode: the decoder, and a wider time base"* — and leave the exact "50 µs/div" in the bullet, where it renders correctly. (Displaces nothing; the value stays on the slide.) `assets/decks/day13.json`, slide 18's `title`. This is a player-wide trap: day13 #18 is the only title in `assets/decks/*.json` currently carrying µ.

2. **[MAJOR] `sl-day13-wiring` (#9) and `sl-day13-bb` (#10) — the wall says 5 V and 3.3 V about the same wire, twice, while the room is wiring.** Her annotated cable photo labels the red lead `5V` in orange; the Fritzing's red lead leaves the Nucleo's 5 V pin (one pin from 3V3, and the header labels are visible on the projection); both captions say 3.3 V. The book figure caption that reconciles this ("the photo labels that wire 5 V… in this course we use 3.3 V") is **dropped on slides by design** — the player strips a ref'd figure's `figcaption` (`assets/class.html:1070`). So the reconciliation exists only in the presenter note. Against `CLAUDE.md`'s standing rule ("Never say 5 V"), the wall now says it in two places. **improve**: put the clause on the slide's own caption, displacing the pin numbers the arrows in the image already give — `"Black to GND, red to 3.3 V (the photo's 5V label is the cable's own; this board takes either — we use 3.3 V), yellow to SCL, blue to SDA."` For #10, add the same half-clause, or ask her for a re-export with the lead on 3V3.

3. **[MAJOR] `sl-day13-capture-c-closeup` (#22) — nothing new after #21.** Slide 21's caption already spells out all ten decoded symbols in text, and the strip is legible at stage size. The close-up is the sanctioned fallback for an export ask that closed — a fit fix, not a beat. **improve** (don't cut — Part 5 pages back to it): give it the job the whole strip cannot do, which is the one Part 5 asks for two slides later. Replace the caption with something like *"Between the halves: a STOP, then a fresh START — the same h19 goes out again, this time RD."* Then #22 answers a question #21 raised, and `task-day13-address-twice` has a projected target.

4. **[MAJOR] `task-day13-stretch-display` (#35b) — I can predict it but I cannot do it.** See "Tasks I could not do". **improve**: name the edit and remove the demand to verify an outcome the instructor block itself calls undiscovered — *"Predict, then say how you would check it: which one line of `whoami_test.c` would you change, and to what?"* — or keep the prediction and drop *"then check it on your own bus"* (four words displaced), letting the instructor collect whoever tried it, which is what `ins-day13-break-stretch` already says.

5. **[MINOR] `sl-day13-analyzer-wiring` (#17) — the one thing on the slide I can't already see on my desk is the one thing I can't read.** The AD2 product photo tells me which bundle; fine. The pinout sheet is the only source for *which lead is 0*, and at ~300 px it is at the edge of legibility, with its book caption (the ⏚ ground symbol, leads numbered 0–15, and *"Waveforms calls the two data leads DIO 0 and DIO 1"*) stripped. One slide later the vocabulary switches to DIO0/DIO1 with no bridge on the wall. **improve**: add a slide `<caption>` carrying those two sentences (the top third of the slide is empty, so nothing is displaced), and crop the pinout to the Digital I/O [0:7] half so 0, 1 and ⏚ are readable from the back.

6. **[MINOR] `sl-day13-bb` (#10) — the text is slide 9's caption again; only the picture is new, and the picture is the smaller half.** "Black to GND, red to 3.3 V, yellow to SCL, blue to SDA" is now on three consecutive slides (9 caption, 10 bullet, 11 task a) — and 11 is the one that has to carry it, because it stays up while the room works. **improve**: make #10 image-dominant (`stack="yes"`, or drop the bullets to a caption) and let bullet 2 say what only this picture shows — *"one SDA row and one SCL row for the whole bus: the display's leads and the accelerometer's land in the same two rows."*

7. **[MINOR] `sl-day13-whoami-main` (#13) — 0x33 never appears on the wall as WHO_AM_I's value.** The listing carries `// default value: 00110011`; the code then tests `== 0x33`, and slides 15, 21, 22, 35 all lean on 0x33. Converting binary to hex from the back of the room is not the point of the slide. **improve**: on the wall listing only (the verbatim copy in the book stays byte-identical), make the comment `// default value: 0x33 (00110011)`. One comment, in place.

8. **[MINOR] `act-day13-break-it` (#33) / `sl-day13-capture-a` (#34) — a written prediction that the deck never closes.** 33(a) asks for two predictions; #34 resolves the analyzer one beautifully and is silent on CoolTerm — correctly, under Q3. But from the room I have written something down and nothing came back to it, and the student deck keeps the open loop. **improve** without asserting anything: add to #34's caption (the lower half of that slide is empty) *"CoolTerm: compare what your board printed with what your neighbours' did."* That closes the loop and stays inside Q3.

### Undefined on the wall

- `sl-day13-whoami-main` (#13) — **0x33 as WHO_AM_I's value** — last seen: nowhere in hex; the wall gives `00110011` only.
- `sl-day13-analyzer-waveforms` (#18) — **DIO0 / DIO1** as the leads #17 calls D0 / D1 — last seen: nowhere in this deck (Day 9x). The sentence that bridges them is in the book caption, which slides strip.
- `sl-day13-prototypes` (#43) — **`lsm303AccelData_s`** — last seen: nowhere. Partly covered by its comment; acceptable, but it is the only type on the wall with no referent.
- `sl-day13-transfer-pattern` (#29) — **MAK** — last seen: nowhere. The red glosses cover Tables 20 and 22; MAK appears only in Table 23's multiple-byte read, which we don't do today. Low priority.
- `sl-day13-memread-read` (#31) — **`I2C1->RXDR`** — last seen: nowhere (Day 10 projected `TXDR`, not `RXDR`). Resolvable from `// Read the data` on the same line; not a finding.
- `sl-day13-capture-b` (#36) — **CTRL_REG1_A** — last seen: slide 35, as a datasheet pointer; explained on 41. Documented as intended mystery-then-explain; it works, because 41's DEFAULT column shows `00000111` beside 0x20.

Also noted, not a finding: in the **student** view the answer to #6 ("do I have to take the display down?") arrives as a verdict only — "the display stays" on #9 and #10 — because the mechanism lives in the instructor reveal. In the room that is fine. In the posted student deck, the sentence Lab 7 depends on ("each device has its own address, so the display ignores transactions addressed to the accelerometer") is not anywhere.

### Tasks I could not do

- **`task-day13-stretch-display` (#35b)** — *"One more prediction: the display on your bus answers to address 0x70. If you sent 0x0F to it as a register address, the way this program does to the accelerometer, what would happen at the acknowledge bit after the address byte — and can the value that comes back be 0x33's kind of proof? Predict first, then check it on your own bus."* — What I wrote: **"ACK — the display is on the bus and recognizes 0x70. No: whatever byte comes back is not an identity value, so it can't prove *which* device answered."** Then I stopped. "Check it on your own bus" names no edit; the only address in the program is `LSM303_ADDRESS_ACCEL`, and every address today has been written as an 8-bit value shifted right by one — so mimicking the pattern with `(0x70 >> 1)` puts 0x38 on the wire and reaches nobody, which is exactly the confusion Part 5 spent fifteen minutes clearing up. The instructor block says the outcome is "discoverable on their own bus; let whoever captures it report it" — so the task asks me to verify something the deck does not itself know.
- Every other `<task>` and prompt on the deck I could answer concretely. For the record: #6 → "no, each device has its own address"; #19 → "one transaction, h19 W, 0x0F, 0x33 back"; #25 → "0x32 is the 8-bit address with the R/W bit; >>1 gives 0x19"; #26(b) → "four acknowledge bits: three from the sensor, the last from the controller, and that one is a NACK"; #33(a) → "CoolTerm: 'Could not connect'; analyzer: address then nothing pulling SDA down"; #35(a) → "both transactions complete; 0x07 comes back"; #42(b) → "0x0F/00110011 and 0x20/00000111, matched."

Files: deck `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`; slide bodies `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (lines 285–1263); the caption-stripping behavior that findings 2 and 5 turn on is `/Users/dz00762/repos/ENGS28/assets/class.html:1068-1074`, and the uppercasing in finding 1 is `/Users/dz00762/repos/ENGS28/assets/class.html:50`. Renders of all 45 slides are in `/private/tmp/claude-503/-Users-dz00762-repos-ENGS28/53bbacdb-4460-48d3-aedc-a3d2cfffe6cd/scratchpad/walk/`.

---

## checker-arc-fidelity

## Verdict: MAJOR

Both trees are live (`assets/ClassSlidesOLD/Day13-I2C(3).pptx`, `source/ch-accelerometers.ptx`, `assets/decks/day13.json` — all from the working tree at `/Users/dz00762/repos/ENGS28`). Her deck mined clean, 32 slides. One old deck maps to this day.

---

### Her arc against the room

| her slide | title | reaches us at | judgment |
| --- | --- | --- | --- |
| 1 | Engs 28 / Day 13 | deck 1 | ✓ |
| 2 | Agenda | deck 3 | ✓ her three headings become eight Part titles |
| 3 | Accelerometer LSM303AGR (section) | deck 4 | ✓ |
| 4 | the device; I2C by default; SPI aside; magnetometer; *"do I need to take the display down?"* | deck 5 (device + magnetometer), deck 6 (her question, committed), deck 7 (reveal). SPI aside → reading only, `:95` | ✓ aside deliberately reading-only |
| 5 | Serial DAta / the two-wire bus picture | deck 5 bullet 1 + the bus image on deck 7's reveal | ✓ Gate 1 ruling (reading + Part 1 resurface) |
| 6 | I2C protocol: START / addr+RW / ACK / DATA / STOP; *master→controller* | reading (ch-i2c). On Day 13 the terminology point recurs where it must — deck 29's caption reads the datasheet's own *Master*/*Slave* rows as controller/target | ✓ |
| 7 | I2C library, five prototypes | deck 14 names all five; memRead's signature on deck 19, its body on 30–31 | ✓ |
| 8 | breakout + STEMMA + wire colours | deck 9 — her breakout photo with her pin strip, beside her own annotated cable photo (`stemma_wiring.svg`) | ✓ |
| 9 | whoami activity + circuit picture | deck 11 (+ deck 10, her Fritzing **upgraded** to the whole-bus version with the display) | ✓ |
| 10 | whoami_test.c main() | deck 13 | ✓ |
| 11 | lsm303_AccelRegisterRead() | deck 14 | ✓ |
| 12 | i2c1_memRead() "Recall" | decks 30–31, split in two, moved after the capture | ✓ Gate 1 ordering ruling, not re-litigated |
| 13 | Debugging the I2C bus (section) | deck 16 | ✓ |
| 14 | Wire the AD2: D0→SDA, D1→SCL, GND | deck 17 | ✓ present; **layout looser than hers** (finding 3) |
| 15 | same, duplicate | deliberately dropped (rescue duplicate) | dropped |
| 16 | *What do you expect to see on the logic analyzer?* | deck 19 | ✓ |
| 17 | i2c1_memRead reminder, during the prediction | not at Part 4 — Gate 1 moved the walk to Part 5; deck 19 keeps `whoami_test.c` on screen instead | moved (Gate 1) |
| 18 | empty | dropped | dropped |
| 19 | Waveforms A | deck 34 | ✓ |
| 20 | Waveforms B | deck 36 | ✓ |
| 21 | Waveforms C | decks 21 + 22 | ✓ |
| 22, 23 | empty | dropped | dropped |
| 24 | Digging Deeper — six questions | a/c/d as committed questions (decks 25, 26, 27); b/e/f on the diagram (deck 29 caption + note) | ✓ all six land |
| 25 | *Are you seeing the correct Waveforms image?* | folded into deck 21's rescue note | ✓ |
| 26 | Accelerometer device driver (section) | deck 38 | ✓ |
| 27 | Firmware design layers | deck 39, `refPage` → Day 10's own figure | ✓ |
| 28 | Writing a device driver, five steps | deck 40 | ✓ |
| 29 | I2C transfers, Controller ⟷ Peripheral | deck 29, `refPage` → ch-i2c Reference. Her two auto-increment callouts are **not** on Day 13's wall — their home is Day 13x (parked at `:1266-1271`) | ✓ deferred, home recorded |
| 30 | lsm303agr.h | decks 41 + 42 | ✓ |
| 31 | prototypes | deck 43 | ✓ |
| 32 | Homework for Thursday | deck 45 | ✓ |

**Her arc is complete.** Nothing of hers reaches the room nowhere. That is the first Gate 3 in this repo where I can write that line.

---

### The chapter's in-class prose against the deck

| source | what it teaches | condensed by | judgment |
| --- | --- | --- | --- |
| `:290` intro | Day 10 → today's three moves | deck 2 (recap) | ✓ |
| `:307` Part 1 lead | same bus, same protocol, same library; magnetometer | deck 5 | ✓ 1:1 |
| `act-day13-keep-display` `:326` | her committed question | deck 6 | ✓ |
| `ins-day13-keep-display` `:339` | the reveal + bus picture | deck 7 | ✓ |
| `:356` Part 1 reveal (student twin) | one bus, one address each; Lab 7 | deck 7 | ✓ P-10 pair, moves together |
| `:375` Part 2 lead | four leads, one program, the standing workflow | deck 11's three tasks **are** the workflow | ✓ signpost absorbed |
| `fig-accel-wiring` `:382` | STEMMA pinout + colours | deck 9 | ✓ |
| `fig-accel-bb` `:408` | the whole bus, display still on it | deck 10 | ✓ |
| `act-day13-whoami` `:427` | wire / copy / build / CoolTerm | deck 11 | ✓ |
| `:459` Part 3 lead | `>>` semantics, mirror of `<<` | **deliberately book-only** — reason recorded twice (deck 12's note, `sl-day13-whoami-main`'s note). The room met the shift on Day 9x (`sl-day9x-address-shift`) and gets the arithmetic on deck 27 | ✓ reason recorded |
| `program :477` | whoami_test.c verbatim | deck 13 (abridged for the wall, abridgement recorded) | ✓ |
| `:517` Part 3 program-shape | (a) shape, (b) one call into the library, (c) what 0x33 proves, (d) a failure is data too | (a) deck 13, (b) deck 14, (c) deck 15. (d) → deck 16's presenter note (the rescue) | ✓ one paragraph, three slides — the right direction |
| `:597` Part 4 lead | CoolTerm vs. the transactions themselves | deck 16 divider | ✓ transition |
| `:603` Part 4 lead 2 | Day 9x's setup, **one change: 50 µs/div** | decks 17 + 18 | ✗ **see finding 1** |
| `fig-ad2-digital-wiring` `:625` | bundle + pinout sheet | deck 17 | ✓ |
| `act-day13-predict-decoder` `:654` | the commit | deck 19 (a `room="yes"` slide, not a bare ref — correct, it adds the listing) | ✓ |
| `act-day13-capture` `:684` | sweep + read three values | deck 20 | ✓ |
| `fig-whoami-capture` `:701` / `-closeup` `:722` | the trace, whole and close | decks 21, 22 | ✓ split recorded |
| `ins-day13-predict-decoder` `:737` | the answer | deck 23 | ✓ |
| `:756` Part 5 lead | the trace holds the questions | deck 24 divider | ✓ |
| `act-day13-why-19` `:764` | the 0x19 puzzle | deck 25 | ✓ |
| `act-day13-digging-deeper` `:773` | address twice; who ACKs | deck 26 | ✓ |
| `ins-day13-digging-deeper` `:793` | all three answers | deck 27 | ✓ |
| `:813` two kinds of NACK | controller's vs nobody's | deck 28 | ✓ 1:1 |
| `:839` transfer diagram | SAD/SUB/SAK/NMAK; SR vs STOP+START; **and why it matters with two controllers** | deck 29 caption — **except the last clause** | ✗ **finding 2** |
| `subsec-i2c-ref-library` walk | two CR2 writes | decks 30, 31 | ✓ |
| Part 6 — *no lead paragraph* | — | deck 32 divider + `act-day13-break-it`'s own `<introduction>`, which is projected and does the lead's work | ✓ absence recorded at `:903-911` (Q3 open) |
| `act-day13-break-it` `:913` | the commit, the capture, the restore | deck 33 | ✓ the "blank until reset" line is in the projected task text |
| `fig-whoami-capture-nack` `:948` | the wrong-address trace | deck 34 (inline copy) | ✓ |
| `act-day13-break-stretch` `:962` | wrong register; the 0x70 question | deck 35 | ✓ |
| `ins-day13-break-stretch` `:984` | 0x07; the display ACK | deck 37 | ✓ |
| `fig-…-wrong-register` `:1007` | whole strip | **book-only** — recorded in deck 36's note | ✓ reason recorded |
| `fig-…-wrong-register-closeup` `:1018` | the two halves | deck 36 | ✓ |
| `:1042` + `ol :1049` Part 7 recipe | layers map + five steps | decks 39 + 40 | ✓ |
| `:1079` step 2 | §7 Table 26 beside the header | deck 41 `<p>` | ✓ |
| `program :1100` | the register block | deck 41 | ✓ |
| `:1123` | keeps going to 0x3D; **`_A` marks the accelerometer's half**; the DEFAULT column | deck 41's note carries the first and third; **the `_A` clause reaches nothing** | ✗ **finding 6** |
| `act-day13-header-tour` `:1160` | download + check two rows | deck 42 | ✓ |
| `:1174` step 3 | four prototypes | deck 43 `<p>` | ✓ |
| `program :1180` | the prototypes | deck 43 | ✓ |
| `:1198` | one running, one homework | deck 43 caption | ✓ but see finding 5 |
| `:1233` + `ul :1237` Part 8 | three things, on paper | deck 45 | ✓ |
| `:1246` | tomorrow / Thursday | deck 45 caption | ✓ |
| — | *"The NACK is not a line of code…"* | deck 31 caption **only** | ✗ **finding 4**, reverse direction |

---

### Findings

**1. [MAJOR] Deck 18 teaches "50 µs/div" over a projected screenshot of 20 µs/div.** — source `:647-652`, deck entry 18, image `assets/images/Day09X-I2C/waveforms_i2c_setup_2.png`

Gate 2′ item (c) at `reviews/day13-gate2.md:395` swapped this slide's ref from `fig-waveforms-setup` to `fig-waveforms-decode` on the grounds that the setup figure's **caption** says 20 µs/div "and must not be on the wall on a day that teaches 50." Correct reasoning, incomplete fix: the player drops a ref'd figure's book caption entirely (`assets/class.html:1069-1071`), so no caption was ever the risk — and `waveforms_i2c_setup_2.png` carries a **20 µs/div time axis baked in as pixels** (the axis reads −20 µs to 180 µs across ten divisions) and a decoded row of `h70 WR … hBE`, which is Day 9x's *display*, not the accelerometer. The one new thing this slide exists to teach is contradicted by the picture beside it, and its own presenter note asserts "the figure has them," which for the time base is the opposite of true. Gate 2′ saw the pixel residue and logged it as informational (`:221`); it survived.

**fix**: drop `ref` and `refPage` from `sl-day13-analyzer-waveforms` and make it text-only, two bullets — (i) *"The setup is Day 9x's, unchanged: DIO1 as clock, DIO0 as data, DIO0 falling as the trigger, single sweep."* (ii) *"One change: 50 µs/div. This read is two transactions and spans ≈400 µs; a 20 µs/div window is 200 µs wide and cannot hold it."* **This displaces the Day 9x screenshot from the wall**, which is the point — the plan asked the slide to *name* the setup, not re-show it (`plans/day13.md`, Part 4 scaffolding: "The slide names the rest as the setup from Day 9x rather than teaching it fresh"). Book side unchanged: `:603-611` keeps its xref. Position in the order unchanged (entry 18).

**2. [MINOR] The two-controllers consequence reaches no slide and no note.** — source `:846-852`, deck entries 29–31

Part 5's transfer paragraph ends: *"…the register-level walk of `i2c1_memRead()` in `subsec-i2c-ref-library` shows exactly where our library makes that choice, **and why it matters on a bus with two controllers**."* Deck 29's caption states the discrepancy (*"Where the datasheet draws SR, a repeated START, your trace shows a STOP and a fresh START"*) and stops there; decks 30 and 31's notes cover the two CR2 writes and RD_WRN but not the consequence. The room will ask "so is ours wrong?" and the wall has no answer. Downgraded from MAJOR only because Day 10 already projected it (`ch-i2c:2872`, `sl-day10-five-why` bullet 3: *"works on a bus with one controller on it, and is worth knowing before you meet a bus with two"*) — so the idea has reached the room, a week ago, and this is a recall.

**fix**: one sentence appended to `sl-day13-transfer-pattern`'s presenter note — *"If anyone asks whether ours is wrong: Day 10's answer. A STOP frees the bus, and with a second controller on it the register pointer you just set could be changed before you read. One controller here, so it is safe."* **Displaces nothing on the wall** (note text only); it is the plan's own Part 5 beat, currently unfunded.

**3. [MINOR] Deck 17 rebuilds a lead-assignment layout she had already solved.** — her slides 14 and 25, deck entry 17, source `:640-645`

Her slide is rendered whole at `assets/images/Day13-I2C(3)/accelerometerSlide.png` (see finding 7). She puts the three leads on **three lines, one per lead, each term in a box whose colour is the wire's colour** — `GND (black) to ground` / `D0 (pink) to SDA` / `D1 (green) to SCL` — so the mapping is readable before it is read. Ours is a single run-on bullet: *"…go D0 (pink) to the SDA row, D1 (green) to the SCL row, and a ground lead (black) to ground."* This is the Day 11 four-relationships case exactly: her shape was one claim per line, and the rebuild condensed it back into a sentence.

**fix**: **adopt hers** — split the one `<li>` into three, one per lead, in her order (GND, D0/SDA, D1/SCL), keeping the "larger flying-lead bundle" identification as the lead-in `<p>`. The colour boxes are optional; the one-line-per-lead is the load-bearing part. Same slide, same position, no minutes moved.

**4. [MINOR, reverse direction] Deck 31 carries a teaching claim with no Day 13 prose behind it.** — deck entry 31 caption, source `:894`

*"The NACK is not a line of code. This function describes the whole transaction to the peripheral in advance — how many bytes (NBYTES), and what to do at the end (AUTOEND) — and the state machine in silicon puts the acknowledge bits and the STOP on the wire."* This is the right claim at the right moment — the room was told on deck 28 that the controller sends a deliberate NACK, and is now looking at code containing no NACK — and it restates a Day 10 note (`ch-i2c:3034`). But no paragraph of `sec-accel-day13` makes it, so a student rereading Part 5 in the book hits the same question and gets silence. Not a slide invented for layout; a slide ahead of its own prose.

**fix**: two sentences into Part 5's `:839` paragraph, after the `subsec-i2c-ref-library` xref — the NACK you found on your trace is in neither half of this listing, because the library describes the transaction (NBYTES, AUTOEND) and the peripheral's state machine puts the acknowledge bits and the STOP on the wire. **Displaces nothing**; it is book-side addition only, and the slide is already correct.

**5. [MINOR] Two slides carry two body paragraphs each — hand these two to the fit sweep by name.** — deck entries 43 and 45

`sl-day13-prototypes` = `:1174` (as `<p>`) + a 16-line comment-heavy listing + `:1198` (as `<caption>`). `sl-day13-homework` = `:1233` (`<p>`) + `:1237` (`<ul>`) + `:1246` (`<caption>`). Both are the `sl-day11-counter-compare` shape — a slide whose last element condenses the paragraph *after* the one the slide is for. Neither is wrong pedagogically; both are the profile that overflows without explanation. I could not measure (no puppeteer in this environment).

**fix**: none pre-emptively. If entry 43 overflows, the cut is its caption to the presenter note — deck 45's first homework bullet already says "write `lsm303_AccelRegisterWrite()`", so the caption's second half is a duplicate on the wall and **the note displaces it at zero cost**.

**6. [MINOR] The `_A` naming convention reaches no slide and no note.** — source `:1126-1129`, deck entry 41

*"The `_A` in every name marks the accelerometer's half of the register map; the magnetometer has its own, which we don't touch."* Every line of deck 41's listing ends in `_A` and nothing on the wall says why. Deck 5 tells the room the chip has a magnetometer, thirty minutes earlier; the connection is left to be made.

**fix**: seven words into `sl-day13-header`'s note — *"`_A` is the accelerometer half; the magnetometer has its own."* Note text only, displaces nothing.

**7. [housekeeping] An asset she dropped on 2026-08-30 is untracked and unused.** — `assets/images/Day13-I2C(3)/accelerometerSlide.png`

It arrived in the same batch as `Accel_bb.png` (14:52) and `stemma.png` (14:53), both of which shipped. It is a full render of her slide 25 and appears in no `source/`, `plans/`, `reviews/` or deck file. Given findings 1 and 3 both turn on that slide's layout, it is more likely a layout reference than a byproduct. **fix**: either use it (finding 3) and commit it, or record in `plans/day13.md`'s coverage table why it is not needed — an unrecorded untracked asset from her is the same failure mode as an unrecorded dropped slide.

---

### Layouts she already solved

- `sl-day13-analyzer-wiring` (deck 17) — her slides 14/25 do this as three colour-boxed lines, one per lead — **adopt hers** (finding 3).
- `sl-day13-wiring` (deck 9) — her slide 8 does this as a pin-labelled breakout photo plus a four-line colour legend. Ours is that photo *plus her own annotated cable*, where each wire is labelled against its actual colour, and the caption adds the Nucleo destinations her slide lacked. **Keep** — the picture carries the per-wire mapping, so the one-line caption is not condensing a list.
- `sl-day13-header` / `sl-day13-prototypes` (decks 41, 43) — her slides 30/31 are full-width listings with the DEFAULT/TYPE columns aligned. Ours match, with her tab whitespace normalized at her instruction. **Keep**.

### Checked and correct

Carried: all 26 of her non-empty slides, including the six Digging Deeper questions (three as committed activities, three answered on the transfer diagram), the controller/target terminology point re-landed on the datasheet's own *Master*/*Slave* rows, her Fritzing upgraded to show the display still on the bus, her captures A/B/C all three, and the five-step recipe with `lsm303agr.h` as step 2 made visible. Deliberately dropped and verified as such: her slides 15, 18, 22, 23, 25 (three empty, two rescue duplicates); the SPI aside (reading-only, `:95`); her slide 29's auto-increment callouts (Day 13x, parked at `:1266-1271`); her slide 12's position before the capture (Gate 1 ordering ruling); her Williams-era habits — none present. `check_deck.py` and `check_rules.py` both clean; all three cross-chapter refs carry correct `refPage` values and resolve on the pages the deck names.

---

## checker-voice

## Verdict: MAJOR

## Register — is this her?

Mostly. The activities, the capture captions, the code walks, Part 7 and Part 8 are hers or close to it, and several of her own rulings landed verbatim ("Recall that the I2C library contains five functions", "Whereas", "for the device you want to talk to", "properly configured", "Four wires with a STEMMA QT Connector"). What is not hers is concentrated in exactly the material this review was called for: **the newly written connecting prose that opens each Part**. Three of the five new Part leads are in the clipped, contrastive register she rewrote out of Day 9x — "CoolTerm's printed line is one kind of evidence… The logic analyzer shows the transactions themselves" is the same shape as ~~"Today: the two wires. Thursday: the chip at the end of them."~~ → **"We'll talk about the I2C protocol today and will examine how to talk to the backpack chip tomorrow."** Two further problems are worse than register: her 2026-08-30 **verify-not-prove** ruling is contradicted in four student-facing places including a projected slide title, and **"a state machine in silicon"** — a phrase she personally struck on Day 10 — is back on a wall caption.

Not a BLOCKER: the day's opening paragraph is substantially hers, "we" is present throughout, every acronym that needed expanding has one, there is no reassurance theater, no time budget outside `presenterNote`, no weekday acting, and no `Part N` pointed at a student. The failure is five sentences and one ruling, not the draft.

## Rewrites

**1 — [MAJOR] `source/ch-accelerometers.ptx:756-759` — Part 5 lead [failure 2, S-20 generalization, day9x specimen]**

    draft:   "The decoded trace on your screen holds the day's best
              questions, and every one of them is answerable from it."
    hers:    "You now have a decoded trace on your screen.  We'll work through
              the questions it raises, and we can answer every one of them from
              the trace itself."
    because: her passed Day 12 Part 3 lead is this exact move —
             "You now have a pulse train on the screen and a number for how many
             pulses arrive in a second.  To convert this to a speed we need to
             know…"  (source/ch-motors.ptx).  And the specimen:
             ~~"The direct approach is not short by a little."~~ → *she deleted it*.
             "the day's best questions" is a period of the course owning things
             and an evaluative flourish; "every one of them is answerable from
             it" is the epigrammatic tail.

**2 — [MAJOR] `source/ch-accelerometers.ptx:597-601` — Part 4 lead [failure 2, failure 3]**

    draft:   "CoolTerm's printed line is one kind of evidence that the link
              works.  The logic analyzer shows the transactions themselves,
              and the rest of class is built on that trace."
    hers:    "The line CoolTerm prints tells us that the read worked, but it
              does not show us what happened on the two wires.  To see the
              transactions themselves — the address going out, the register
              number, and the byte coming back — we'll put the AD2's logic
              analyzer on the bus, and we'll work from that trace for the rest
              of class."
    because: ~~"Today: the two wires.  Thursday: the chip at the end of them."~~
             → "We'll talk about the I2C protocol today and will examine how to
             talk to the backpack chip tomorrow."  Two contrastive fragments of a
             sentence each, no first person, become one plain explanatory
             sentence with "we'll".  Longer, and correct to be longer (the Day 10
             calibration).

**3 — [MAJOR] `source/ch-accelerometers.ptx:375-380` — Part 2 lead [failure 2, failure 3, failure 7, S-12]**

    draft:   "Wiring the sensor is four leads, and verifying the link is one
              short program, run through the standing workflow: copy
              TemplateProject, drop the test program into Src, build, and watch
              in CoolTerm."
    hers:    "We'll wire the sensor to the bus with four leads, and then run a
              short test program to check that the STM32C031C6 can talk to it."
    because: her passed Day 12 Part 2 lead, the nearest pair in the corpus:
             "We'll wire the photointerrupter from the reading and put its
             signal wire on the oscilloscope before reading it with a pin."
             Three separate faults here.  (a) "Wiring X is four leads, and
             verifying Y is one short program" is the parallel-equation
             epigram — cf. ~~"In the first twelve minutes we wire a display…"~~
             → "**We'll start by wiring** the display…".  (b) "the standing
             workflow" is in-group shorthand that appears nowhere else in the
             book (S-12/S-26; grep: two hits, both in this draft).  (c) the
             four-step enumeration is a verbatim second telling of
             `act-day13-whoami`'s own tasks eight lines below, which are her
             slide 9 wording — she deleted "Wire the display: + to 3.3 V, − to
             GND…" for exactly this.

**4 — [MAJOR] `source/ch-accelerometers.ptx:290-298` — the day's opening [her ruling "You read about…"; S-22; L-13]**

    draft:   "On Day 10 we wrote a device driver for the seven-segment display,
              on the I2C bus, and in the reading you met the LSM303AGR
              accelerometer and its WHO_AM_I register.  Today we'll wire the
              accelerometer onto the bus, verify that we can talk to it, and
              watch the transactions themselves on the logic analyzer — and by
              the end of class its device driver will have begun."
    hers:    "On Day 10 we wrote a device driver for the seven-segment display,
              on the I2C bus.  You read about the LSM303AGR accelerometer, its
              breakout board, and its WHO_AM_I register.  Today we'll wire the
              accelerometer onto the bus, verify that we can talk to it, and
              watch the transactions themselves on the logic analyzer.  We'll
              also make a start on its device driver."
    because: her own recap, three lines away in `assets/decks/day13.json:8-10`,
             already says "**You read about** the LSM303AGR accelerometer, **its
             breakout board**, and its WHO_AM_I register."  The prose paraphrased
             her ruling into "in the reading you met", and dropped the breakout
             board — the deck was swept and the prose was not, which is the
             Step 5b failure exactly.  The tail "its device driver will have
             begun" makes the driver the actor ("Don't make things do other
             things," L-13) in a future perfect that appears nowhere else in her
             corpus; cf. her Day 10 "**By the end of the today your own display
             will show `ES.28`**".

**5 — [MAJOR] four places — "proves" [her ruling 2026-08-30: verify, not prove]**

    draft:   ch-accelerometers.ptx:526  "A successful 0x33 proves the whole read
                                         path: the wiring, the device address,
                                         the protocol and the code all had to
                                         work for that value to arrive."
             ch-accelerometers.ptx:581  same sentence, slide sl-day13-whoami-proves
             assets/decks/day13.json:44 title: "What a successful 0x33 proves"
             ch-accelerometers.ptx:979  "can the value that comes back be 0x33's
                                         kind of proof?"
    hers:    :526/:581  "Reading 0x33 back verifies the whole read path: the
                         wiring, the device address, the protocol and the code
                         all had to work for that value to arrive."
             json:44    "What a successful 0x33 verifies"
             :979       "…and can the value that comes back verify the link the
                         way 0x33 does?"
    because: her ruling, and the reading she already passed observes it —
             subsec-accel-whoami:131 says "**you can be confident in** your I2C
             setup" and the reading-question feedback says "what the successful
             read **demonstrates**".  The in-class text re-introduced the word
             the reading was corrected out of.  Leave the `xml:id`
             `sl-day13-whoami-proves` alone (not student-facing); change only
             the visible text and the deck title.  The presenter note at :584
             may keep its wording — it is instructor-only.

**6 — [MAJOR] `source/ch-accelerometers.ptx:894` — slide `sl-day13-memread-read` caption [Day 10 specimen, verbatim]**

    draft:   "The NACK is not a line of code.  This function describes the whole
              transaction to the peripheral in advance — how many bytes
              (NBYTES), and what to do at the end (AUTOEND) — and the state
              machine in silicon puts the acknowledge bits and the STOP on the
              wire."
    hers:    "The acknowledge bits and the STOP are not written by this
              function.  It describes the whole transaction to the peripheral in
              advance — how many bytes (NBYTES), and what to do at the end
              (AUTOEND) — and the I2C hardware puts them on the wire."
    because: she struck this exact phrase on Day 10:
             ~~"Everything below `I2C1->CR2` is done by **a state machine in
             silicon**."~~ → "Everything below `I2C1->CR2` is done by **the I2C
             hardware**."  (day10-voice-reference.diff, hunk at
             subsec-day10-bytewrite).  The caption also opens on what a thing is
             *not*, which is failure 1's cousin — the rewrite states the fact
             positively and keeps the technical claim identical.

**7 — [MAJOR] `source/ch-accelerometers.ptx:313-315` — Part 1's closing sentence [S-21 / S-28]**

    draft:   "Before anything gets wired, there is a question to settle."
    hers:    DELETE.
    because: ~~"One question is left, and it is the one that makes the rest
             work."~~ — the armature announces that a question exists and defers
             it.  Here the colon fix is unavailable, because the question is
             asked in full in `act-day13-keep-display` on the very next line
             ("Do you need to take the display down first?"), so delivering it
             here would be the second telling.  What is lost: a transition
             beat — and her Day 12 model shows the transition can be carried by
             the activity itself ("Before we wire anything, make a prediction."
             is her *task* sentence, not a lead).  If a bridge is wanted, use
             hers: "Before we wire anything, one question."  — but deletion is
             cleaner.

**8 — [MAJOR] `source/ch-accelerometers.ptx:839-852` — the remaining-questions sentence [S-21; and it says the wrong thing]**

    draft:   "The remaining questions the trace raises — who sends the address,
              where the register address goes out, and where the data comes
              back — can be read straight off its rows."
    hers:    "Three more questions can be answered from its rows: who sends the
              address, where we tell the accelerometer which register to read
              from, and where the accelerometer puts the register's contents on
              the data line."
    because: as written, the *questions* are what can be read off the rows,
             which is not what is meant — S-21's defer-the-subject armature
             producing a literal slip.  And her own Day 13 slide 24 already
             asks these three, in her words and with "we" in them: "Who is
             sending that address?", "**Where are we telling the accelerometer
             which register to read from?**", "Where does the accelerometer put
             the register contents on the data line?"  Use hers rather than the
             impersonal compression.

**9 — [MAJOR] `source/ch-accelerometers.ptx:408-417` — `fig-accel-bb` caption [S-26; slide/prose divergence; 3.3 V]**

    draft:   "The whole bus after today's wiring: the display stays where it has
              been since <xref ref="ch-i2c"/>, and the accelerometer's four
              wires join it — yellow to the SCL row, blue to the SDA row, black
              to GND, and red to power (on our Nucleo, use 3.3 V).  The breakout
              drawn here stands in for yours; the pin order is the one on your
              own board's silkscreen."
    hers:    "The whole bus after today's wiring: the display stays where we
              wired it on Day 10, and the accelerometer's four wires join it —
              yellow to the SCL row, blue to the SDA row, black to GND, and red
              to 3.3 V.  The drawing shows the red lead on the Nucleo's 5 V pin;
              on our boards it goes to 3.3 V.  The breakout drawn here is a
              stand-in for yours, so go by the labels printed on your own
              board."
    because: "since <xref ch-i2c/>" renders as "since Chapter 10" — a chapter
             used as a point in time (S-26, and L-11 gives the form: "on Day N").
             The hedge "red to power (on our Nucleo, use 3.3 V)" also diverges
             from its own slide, `sl-day13-bb`, which says flatly "red to
             3.3 V" — the two texts must not sound like two writers, and the
             flat one is right.  Naming the discrepancy with the drawing outright
             is the S-27/S-19 move she made in the `fig-ht16k33-block` caption,
             which *gained* four explanatory sentences under her pen.

**10 — [MAJOR] `source/ch-accelerometers.ptx:994-996` — projected `<instructor>` block [L-9 / S-16]**

    draft:   "the address 0x70 gets an ACK — the display is on the bus and
              recognizes it — and that ACK is the whole point: it proves you
              reached a device."
    hers:    "the address 0x70 gets an ACK — the display is on the bus and
              recognizes it — and that ACK tells you that you reached a device."
    because: ~~"That free remainder of the loop is **the entire point** of a
             background timer."~~ → "That free remainder of the loop is **the
             point**…" (Day 8 pass), and L-9 bans the construction outright.
             `<instructor>` blocks are projected in this deck
             (`day13.json:79`), so this is on the wall.  "proves" also falls
             under item 5 above.

**11 — [MINOR] `source/ch-accelerometers.ptx:1233-1236` — Part 8's opening [L-16 / L-12]**

    draft:   "Three things, all on paper — nothing to submit.  This will help
              you prepare for Lab 7."
    hers:    "Here are three things to do for Thursday, all on paper — there is
              nothing to submit.  This will help you prepare for Lab 7."
    because: L-16, a paragraph does not open on a fragment; "Three things, all
             on paper — nothing to submit." has no verb, and the linter cannot
             see it because it is a `<p>`, not a list item.  Petra, Day 11x:
             *"not a complete sentence — use only complete sentences."*  Her
             ruling sentence "This will help you prepare for Lab 7." is
             untouched.  Same fix on `sl-day13-homework`'s lead (`:1253`).

**12 — [MINOR] `source/ch-accelerometers.ptx:517-520` — Part 3, "the standing one" [S-12/S-26]**

    draft:   "The program's shape is the standing one: initialize the two
              peripherals, print a banner, and then a loop that does one thing
              once a second — read WHO_AM_I, compare what came back to 0x33, and
              print one of two lines."
    hers:    "The program has the same shape as the programs we have been
              writing all term: initialize the two peripherals, print a startup
              message, and then a loop that does one thing once a second — read
              WHO_AM_I, compare what came back to 0x33, and print one of two
              lines."
    because: same in-group shorthand as "the standing workflow" (item 3); and
             ~~"Start with the one you have met before."~~ → "**Recall the
             UART, which is another communication protocol that uses 2 wires
             only.**"  "Banner" is a code comment in `ch-uart.ptx`, never prose.

**13 — [MINOR] `source/ch-accelerometers.ptx:467-469` — Part 3's forward reference**

    draft:   "What that does to 0x32, and why the address is written this way at
              all, is a question for the logic analyzer."
    hers:    "We'll come back to what that does to 0x32, and to why the address
              is written this way, once we have the logic analyzer on the bus."
    because: S-20's shape — the answer belongs to *us*, and the instrument is
             only *when*; cf. ~~"not to understand every line, which is
             Thursday"~~ → "**we'll go through every line on Thursday**."

**14 — [MINOR] `source/ch-accelerometers.ptx:609` — L-15**

    draft:   "…and drag the view so the first START sits at the left."
    hers:    "…and drag the view so that the first START is at the left edge."
    because: Petra, Day 11x: *"let's not have registers 'sit'.  How about
             'located'?…  apply everywhere."*  The rest of this paragraph is
             hers as written — long, plain, two "we'll"s, the reason given with
             the number.  Change only the verb.

**15 — [MINOR] `source/ch-accelerometers.ptx:382-392` — `fig-accel-wiring`, last sentence**

    draft:   "The pin the red wire feeds is VIN; the photo labels that wire 5 V,
              and the board accepts either 3.3 or 5 V logic — in this course we
              use 3.3 V."
    hers:    "The red wire goes to the breakout's VIN pin, and the photo labels
              that wire 5 V.  The board accepts either 3.3 or 5 V logic, and in
              this course we use 3.3 V."
    because: the inversion "The pin the red wire feeds is VIN" is a construction
             she does not use; the technical claim is carried through word for
             word (S-16 — no qualifier lost).

**16 — [MINOR] `source/ch-accelerometers.ptx:429-432` — `act-day13-whoami` introduction**

    draft:   "Reading the WHO_AM_I register is what whoami_test.c does, once a
              second, forever."
    hers:    "The program we'll run, whoami_test.c, reads the WHO_AM_I register
              once a second and prints whether it got the value it expected."
    because: the cleft ("Reading X is what Y does") plus the "forever" flourish
             is the register she flattened in ~~"The display is showing four
             characters that somebody else chose."~~ → "**Your display is
             currently showing four characters that we chose when writing the
             `helloDisplay.c` program.**"

**17 — [MINOR] `source/ch-accelerometers.ptx:1034` and `assets/decks/day13.json:82` — Part 7's name [S-18, and a deck/book mismatch]**

    draft:   book subsection title "Part 7: A Driver Begins"
             deck section + agenda   "Accelerometer device driver"
    hers:    "Part 7: The Accelerometer's Device Driver"
    because: this is the one agenda item of eight whose wording does not match
             its subsection title, and the book's version is the literary one — a
             driver that "begins" is a thing doing a thing (L-13), and a title
             says what the section *is* (S-18): ~~"Four wires, and 3.3 V not
             5 V"~~ → "Wire up your display".  Her own deck slide 26 is titled
             "Accelerometer device driver".

**18 — [MINOR] `source/ch-accelerometers.ptx:1042-1048` — the recipe lead's punctuation**

    draft:   "Writing a device driver follows five steps — the same steps you
              followed for the display on Day 10 (<xref ref="fig-firmware-layers"/>
              is the map — the driver talks to the device only through the I2C
              library, and the application talks only to the driver):"
    hers:    "Writing a device driver follows five steps — the same steps you
              followed for the display on Day 10.  <xref ref="fig-firmware-layers"/>
              is the map: the driver reaches the device only through the I2C
              library, and the application reaches the device only through the
              driver."
    because: an em dash inside a parenthesis inside a sentence that ends on a
             colon is three levels of subordination; her sentences are long but
             flat.  "steps" is her ruling and stays.

**19 — [MINOR] `source/ch-accelerometers.ptx:821-823` — the two-NACKs paragraph's last sentence**

    draft:   "The two are opposite: the controller's NACK ends a read on
              purpose, and the other one means that nobody answered."
    hers:    DELETE the sentence.
    because: the two preceding sentences have already said both of these things;
             this is the summarizing flourish, and what is lost is the word
             "opposite", which the reader has by then.  (The paragraph as a whole
             is *better* than anything in her old deck — her slide 6 has only
             "If nobody responds, the data line remains high (called NACK)" and
             her slide 29 note has only "until you send noAck".  Keep the
             distinction; it is a genuine improvement.)

**20 — [MINOR] `source/ch-accelerometers.ptx:626-633, 649, 706` — `DIO 0` vs `DIO0`**

    draft:   "Waveforms calls the two data leads DIO 0 and DIO 1."
    hers:    "Waveforms calls the two data leads DIO0 and DIO1."
    because: `ch-i2c.ptx:750-789`, her passed Day 9x text, writes DIO0/DIO1
             closed up throughout, and this chapter's own later lines (`:649`,
             `:706`) do too.  Only this caption spaces them.

**21 — [MINOR] `source/ch-accelerometers.ptx:339-349` vs `356-365` — the two tellings of one answer**

    draft:   instructor: "…so the display simply does not respond to transactions
                         addressed to the accelerometer… Letting several devices
                         share two wires is the reason **the** bus exists…
                         so leave the display wired."
             prose:      "…so the display **ignores** transactions addressed to the
                         accelerometer… Letting several devices share two wires is
                         the reason **a** bus exists…"
    hers:    make the shared clauses identical, and carry "so leave the display
             wired" into the prose paragraph as its closing clause.
    because: the source comment above them says "change them together"; the
             wording has already drifted in three places, and the instruction the
             student needs — leave it wired — survives only in the instructor
             copy.

## Sweeps

- **Unit openings checked: 14** (chapter intro; `sec-accel-before-class` intro; its three subsections; `sec-accel-day13` intro; Parts 1–8) — **failing: 5** — the Day 13 section introduction (item 4), Part 2 (item 3), Part 4 (item 2), Part 5 (item 1), Part 8 (item 11). Passing and hers: the chapter intro ("The goal of this chapter is to measure acceleration with the LSM303AGR…" — S-22 exactly), the pre-class intro ("On Tuesday we'll add a new device to our I2C bus: an accelerometer."), all three pre-class subsections (including her "Whereas" ruling at :114), Part 1's first sentence, Part 3 ("Here is the whole of `whoami_test.c`." — cf. her passed "Here is its sending half:"), Part 7. **Part 6 has no lead prose at all** and opens on `act-day13-break-it`'s introduction, which is in her register ("properly configured" is her ruling) — see the reuse section for the sentence she has already written for this Part.
- **Slide titles: 44 — epigrams rather than names: 1** — `day13.json:44` "What a successful 0x33 proves" (item 5, a ruling not a register problem). Two watch-items, neither worth a change on its own: "The whole bus: the display stays" (`:36`) and the instructor-only "What the decoder shows — and what predictions miss" (`:55`). Everything else names its slide, and "Four wires with a STEMMA QT Connector" is her ruling — do not touch it.
- **Weekday or course-period as grammatical actor: 0** (S-20). Ten weekday/period mentions swept; all are adverbials, section titles, or "tonight's homework". Deliberately *not* flagged: "the rest of class is built on that trace" (:600) — her own passed Day 12 Part 6 has "The rest of the class is yours to build in," so a course period as the subject of a stative verb is hers. That sentence is item 2 for a different reason.
- **"N, and it is the one that…" armature: 2** (S-21) — `:314` "Before anything gets wired, there is a question to settle" (item 7); `:843` "The remaining questions the trace raises… can be read straight off its rows" (item 8).
- **"we" in class-work sentences: 9 of 16** in the new connecting prose. The seven without are `:314`, `:376`, `:469`, `:598`, `:600`, `:757`, `:843` — which is the same list as the register findings above, i.e. the missing "we" and the aphorism are the same defect each time.
- **Acronyms first-used without expansion: none that is a regression.** Complete list of what the day uses and where its expansion is: I2C → chapter intro `:10`; SDA/SCL → `:57`; MEMS → `:23`; AD2 → `ch-switches.ptx:451` ("The **Analog Discovery 2** (AD2)"), plus this chapter's objective `:22`; NACK → `:814` "a NACK — a not-acknowledge"; STEMMA QT → defined at `:105`; WHO_AM_I → `:126`; NBYTES/AUTOEND/RD_WRN → glossed in the slide caption `:894` and note `:895`; SAD/SUB/SAK/NMAK → in the slide caption `:835` and in `ch-i2c.ptx:4322-4325`. Two the book has *never* expanded anywhere — **DIO** and **VIN** — are noted under "For Petra" rather than as findings, because `ch-i2c.ptx` and `ch-ble.ptx` leave them bare in prose she has passed.
- **Design scaffolding in student-facing text: none.** `Part [0-9]` appears only in subsection titles (structural, B-1) and in `<note>`/`<instructor>`/XML comments, which are hers (L-18). Every `≈ N min` is inside a `presenterNote` or `<note>`. No "the reading" as a scheduling reference, no "a program you are given", no rescue text, no known-good hardware, no "raise your hand" — the Part 2 and Part 4 rescues are correctly in presenter notes only. `check_rules.py` and `check_deck.py` are both clean, so nothing here is a re-report of L-8…L-11.

## Already written — reuse instead of invent

- **Part 6 has no opening sentence — she wrote one for the identical beat on Day 10.** Her passed text (`ch-i2c.ptx`, Part 9, after her pass): *"We'll make two one-line changes to a program that works, and capture each resulting I2C transaction with the AD2.  Both yield a blank display, but they look nothing like each other on the oscilloscope."*  Day 13's Part 6 is the same move on a new device. Suggested lead, in her shape: **"We'll make two one-line changes to a program that works, and capture what each one does on the wire.  Both give the same message in CoolTerm, but they look nothing like each other on the analyzer."** — subject to Q3, since it asserts a symmetry about what CoolTerm shows; if Q3 is still open, keep only the first clause.
- **The three "remaining questions" (`:843`) are hers, in better words.** Old deck, slide 24 ("Digging Deeper"): *"Who is sending that address?"*, *"Where are we telling the accelerometer which register to read from?"*, *"Where does the accelerometer put the register contents on the data line?"*  The draft flattened these into an impersonal noun phrase; hers keep the "we". See item 8.
- **Already correctly reused, do not re-invent:** the five-function recall (her slide 7, "Recall I2C Library Functions") at `:76` and `sl-day13-whoami-read`; the five driver steps verbatim from her slide 28 (with her ruling "for the device you want to talk to" added); the header excerpt and "put it into your `mylib` folder" from her slide 30; the four prototypes and their comments from her slide 31; the homework list and the "Wednesday and Thursday…" line from her slide 32; the lead colors and "D0 (pink) to SDA, D1 (green) to SCL" from her slides 14/25 (her D0/D1 ruling); Captures A/B/C with her own speaker-note readings.
- **Correctly dropped, and it should stay dropped:** her slide 31's *"Names are borrowed from Adafruit's driver for the Arduino."*  She cut the equivalent Adafruit aside from Day 10 herself (~~"Somebody else has written both of those layers for this exact chip already…"~~ → deleted).
- **Where the draft is better than the deck, keep the draft:** the two-kinds-of-NACK paragraph (`:813`) — her old deck has only "If nobody responds, the data line remains high (called NACK)" (slide 6) and "until you send noAck" (slide 29 note); the draft's distinction is new, correct, and needed, because the students' own successful trace contains a NACK.

## For Petra, not for me

- **Wednesday vs Thursday.** Two of your own texts disagree. Slide 32's printed line — kept verbatim as `sl-day13-homework`'s caption — says *"Wednesday and Thursday: We'll get some acceleration data out of the sensor."*  Its speaker note says *"Tomorrow: theory of how this thing works.  Thursday: get some data,"* which is what the book prose at `:1247` follows, and what `sec-accel-day13x` ("What a MEMS Accelerometer Is") actually does. Which should ship on the wall?
- **`fig-accel-wiring`, `:389`: "the board accepts either 3.3 or 5 V logic."** Supply on VIN, or logic-level tolerance on SDA/SCL? I have kept the claim word for word in my rewrite rather than adjust it, since S-16 forbids me softening engineering to fix register — but the two readings are different claims and one of them is about a 5 V number.
- **`Accel_bb.png`.** The drawing's red lead is on the Nucleo's 5 V pin, and the caption currently corrects it parenthetically. My rewrite names the discrepancy out loud instead. Re-export, or ship with the sentence?
- **DIO and VIN.** Neither is expanded anywhere in the book — `ch-i2c.ptx` uses DIO0/DIO1 bare in text you passed, and `ch-ble.ptx` uses VIN bare. Expand on first use in this chapter ("DIO0 — digital input/output channel 0", "VIN — voltage in"), or is bare the house style for instrument-panel and silkscreen labels?
- **Part 6's opening.** The owed debrief paragraph is blocked on Q3. Should Part 6 also get a one-sentence lead (see the reuse section), or is opening straight into the activity intentional here?

Files: `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx`, `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`, specimens at `/Users/dz00762/repos/ENGS28/plans/day10-voice-reference.diff`, `/Users/dz00762/repos/ENGS28/plans/day9x-voice-reference.md`, `/Users/dz00762/repos/ENGS28/plans/day8-voice-reference.diff`, calibration prose at `/Users/dz00762/repos/ENGS28/source/ch-motors.ptx`, old deck at `/Users/dz00762/repos/ENGS28/assets/ClassSlidesOLD/Day13-I2C(3).pptx`.

---

## checker-figure-claims

I rendered every figure in the changed set and measured the load-bearing claims against pixels. One slide caption contradicts its own image on a voltage, and the brief's premise about the Fritzing is itself wrong.

---

### Verdict: BLOCKER

### Figures opened

| id / file | rendered how | what is actually in it |
|---|---|---|
| `fig-accel-wiring` / `stemma_wiring.svg` | headless Chrome @1302×674, ×2 DSF (PyMuPDF disagrees — it ignores `clip-path` and drops `marker-end fill="context-stroke"`, so its render is **not** what ships) | Left: Adafruit board, silkscreen `LSM303AGR`, pad row `VIN 3V GND SCL SDA INTM`, two STEMMA sockets. Four magenta arrows point **up** from a white label strip (`3.3V-5V GND SCL SDA`) onto VIN, GND, SCL, SDA. Right: STEMMA QT cable on black felt with a quarter; yellow arrows label blue=`SDA`, yellow=`SCL`, black=`GND`, red=`5V`. A fifth magenta arrow runs from the board's right socket **to** the cable plug. |
| `fig-accel-bb` / `Accel_bb.png` | `Read` @1004×1766 + five pixel-level crops | Nucleo + breadboard + HT16K33 backpack + a breakout silkscreened `MPU-6050 6-DoF`. Black from a Nucleo `GND` to the − rail; **red from the pin between `5V` and `RESET`** to the + rail. Blue leaves the Nucleo pin marked `SDA`, yellow the one marked `SCL`. Display pins `+ − D C` sit in four columns; red→`+`, black→`−`, blue→`D`, yellow→`C`. The breakout's four QT-socket wires land in those same SDA/SCL columns and on the bottom rails. |
| `fig-ad2-digital-wiring` left / `ad2_digital_bundle.png` | `Read` @700×700 + silkscreen crop | AD2 product photo, one flying-lead harness plugged in. Its own silkscreen reads `1+ 2+ ⏚ V+ W1 ⏚ **T1** 0 1 2…` / `1− 2− ⏚ V− W2 ⏚ **T2** 8 9…`. |
| `fig-ad2-digital-wiring` right / `ad2_connector_labels.png` | `Read` @400×402 + three crops | Pinout sheet. Top bar `1+ 2+ ⏚ V+ W1 ⏚ **TI** 0…7`, bottom `1− 2− ⏚ V− W2 ⏚ **TO** 8…15`. Chips: 0 pink, 1 green, 2 purple, 3 brown, repeating; grounds black; 1+ orange, 2+ blue; bottom row white-striped. Top-left diagonal labels truncated to "…nput 1, Positive". |
| `i2c_transfer_pattern.svg` | headless Chrome @1590×915 ×2, plus programmatic gridline/token extraction | Tables 20–23 with red glosses under 20 and 22 and two red autoincrement notes. |
| `waveforms_capture_a.png` | `Read` @1300×212 + edge extraction | `SCL`=green `DIO 1`, `SDA`=pink `DIO 0`. Exactly 9 clock pulses; SDA bits `0011000` + `0` = **0x18 write**; SDA HIGH throughout clock 9; STOP. Decoder prints `h18 WR │ N │ P`. |
| `accelerometerSlide.png` | `Read` @2468×1854 | **Petra's original slide 25** — untracked and referenced by nothing. Contains the same pinout sheet at 765×573 (vs 400×402), the AD2 photo, an earlier display-less Fritzing, and her own colour-coded mapping boxes `GND (black) to ground` / `D0 (pink) to SDA` / `D1 (green) to SCL`. |
| deck slides 9, 10, 17, 29, 34 | headless Chrome, player @1600×900 | see below |

---

### Correspondence failures

**1. [BLOCKER] `sl-day13-wiring` (slide 9, title "Four wires with a STEMMA QT Connector")** — projected caption: *"…red to 3.3 V…"* — image shows: the only voltage annotation on the red wire is the yellow **`5V`** in the right panel. Nowhere does the picture say 3.3 V. The book caption reconciles this in one clause (*"the photo labels that wire 5 V… in this course we use 3.3 V"*); the slide caption dropped it, and the presenter note carries it instead — which is an admission the slide alone is wrong. Given `CLAUDE.md`'s standing rule ("Never say 5 V — it could damage the chip"), this is the one slide in the set where a student who trusts the picture over the caption does damage. — **fix**: re-caption, restoring the clause: *"…red to 3.3 V (the photo labels that wire 5 V; the board takes either, and our Nucleo gives 3.3 V), yellow to SCL (D15, PB8), blue to SDA (D14, PB9) — and the display stays wired."*

**2. [MAJOR — the brief's premise is wrong] `fig-accel-bb`** — the task says *"the drawn red lead actually lands on the Nucleo's 5 V pin."* It does not. I measured the POWER header: 8 sockets at 27 px pitch, x = 358, 384, 412, 438, 466, 492, 518, 546. Labels sit at 357 `VIN`, 384 `GND`, 412 `GND`, 438 `5V`, 495 `RESET`, 518 `IOREF`. The `5V` socket at 438 is drawn **empty**; the red wire's green connection ring is at **466** — the pin between `5V` and `RESET`, inside the blue `POWER` bracket, i.e. **`+3V3`** on Nucleo-64 CN6. Its label is hidden only because the red wire is drawn over it. So the drawing is correct and already shows 3.3 V. What is wrong is the text *about* it:
- `source/ch-accelerometers.ptx:424`, the `sl-day13-bb` note: *"the drawing's red lead is on the 5 V pin; say out loud that we use 3.3 V"* — this instructs the presenter to assert something false about her own figure, in front of the room.
- `source/ch-accelerometers.ptx:404-407`, the editor comment: *"the red lead leaves the Nucleo's 5 V pin"* — will mislead the next editor.
— **fix**: delete both claims; withdraw this item from the ask-Petra list before she "fixes" a correct drawing. The book caption's *"red to power (on our Nucleo, use 3.3 V)"* is fine as written but no longer needs to read defensively.

**3. [MAJOR] `fig-ad2-digital-wiring`** — caption: *"the pinout sheet (right) says which lead is which"* — the two panels are of different instruments and say so in pixels: the AD2's own silkscreen (left) reads `T1`/`T2`; the sheet (right) reads `TI`/`TO`. The source comment at `ch-accelerometers.ptx:622-627` already knows the sheet is the ADALM2000's with its title cropped; the visible T1/T2 vs TI/TO mismatch is the evidence a student can see. — **fix**: ask Petra for the AD2's own pinout sheet. Her slide 25 (`accelerometerSlide.png`) shows she has been teaching from the ADALM2000 sheet for years, so this may be a "leave it and say so" — in which case the caption should own it: *"(the sheet is drawn for the AD2's sibling instrument; the digital numbering, colours and grounds are identical, only the trigger pins are named differently)."*

**4. [MAJOR] `fig-i2c-transfer-pattern` in `ch-i2c` — shared-figure damage.** The figure **lives in `ch-i2c.ptx:4319`** and Day 13 only `<xref>`s it, so the re-anchor made for Day 13 silently changed Day 9x/10's figure. The two new red notes read *"…see Sec 6.1.1"*. In Day 13 that resolves (`ch-accelerometers.ptx:841` names §6.1.1, and I confirmed `assets/datasheets/lsm303agr.pdf` p.38 §6.1.1 "I2C operation" is exactly where Tables 20–23 and the auto-increment sentence live). In `ch-i2c` the caption says only *"as an I2C sensor's datasheet draws them"* — indefinite — and the LSM303AGR does not exist yet in the course. A red pointer to §6.1.1 of nothing. — **fix**: caption edit only, no change to the shared figure: add to `ch-i2c`'s caption *"…as the LSM303AGR's datasheet draws them (§6.1.1), the accelerometer you meet in Chapter 12."*

**5. [MINOR] `sl-day13-capture-a` (slide 34)** — caption: *"…and a STOP ends it"* — image shows the decoder's marker **`P`**, not the word STOP. I verified the condition is a genuine STOP (SDA rises at x=1233 while SCL is high from 1213). Everything else in this caption is exact: one transaction ✓, `h18 WR` ✓ (I decoded the nine clocks: `0011000` + W = 0x18), SDA stays HIGH right through clock 9 ✓, decoder prints `N` ✓. — **fix**: *"…and the decoder's P — a STOP — ends it."*

**6. [MINOR] `fig-accel-bb`** — caption: *"The breakout drawn here stands in for yours; the pin order is the one on your own board's silkscreen."* The second clause reads as a claim *about the drawing*, which would be false-ish (the drawn part is an MPU-6050). It is in fact true by coincidence — MPU-6050 `VIN 3Vo GND SCL SDA INT` vs LSM303AGR `VIN 3V GND SCL SDA INTM` — but the sentence is doing the opposite of what it means. Also: the four wires in the drawing go to the **QT socket**, not the header, so pin order is not what the reader is being pointed at. — **fix**: *"The breakout drawn here is a stand-in part; go by the silkscreen on your own board."*

**7. [MINOR] `fig-ad2-digital-wiring`** — caption: *"D0 (pink)… D1 (green)"* — the sheet shows the colour cycle **repeating every four**: 0 and 4 are both pink, 1 and 5 both green. The colour alone does not name the lead. — **fix**: *"D0 — the first pink lead — to the SDA row, D1 — the first green — to the SCL row."*

**8. [MINOR] `fig-ad2-digital-wiring`** — caption: *"the larger flying-lead bundle (left, plugged into the AD2)"* — the photo shows exactly one bundle, so the comparative has no referent in the image. It is established vocabulary from `ch-i2c.ptx:749`, so a student who did Day 9x is fine; a student seeing this slide alone is not. — **fix**: optional; *"(left — the fat one, plugged into the AD2)"* or leave.

**9. [MINOR] `fig-accel-wiring`** — caption: *"the board accepts either 3.3 or 5 V logic"* — the image's own annotation is `3.3V-5V` on the **VIN** pin, which is supply, not logic. Not wrong about the board, but the caption never mentions the label the reader is looking at. — **fix**: *"the photo labels that pin 3.3V–5V, and the breakout's regulator takes either — in this course we use 3.3 V."*

**10. [MINOR] `fig-accel-wiring`** — the magenta connector arrow runs **from** the breakout's socket **to** the cable's plug, while the caption says *"The cable's plug goes into either socket on the breakout."* Reversed relative to the sentence. — **fix**: cosmetic; flip `marker-end` to `marker-start` on the last `<line>` in the SVG, or ignore.

**11. [MINOR] `i2c_transfer_pattern.svg` — vertical anchoring of the Table 20 gloss row.** All the horizontal anchoring is correct (below), but the Table 20 glosses sit **45 px below Table 20 and 47 px above Table 21's title** — essentially equidistant. The other three annotations are unambiguous (writes note: 31 px below T21, 45 px above T22's title; T22 glosses: 36 / 52; reads note: 53 px below T23, nothing after). — **fix**: move the `y="219.4"` text row up ~8 SVG units to `y≈211`.

**12. [MINOR] `ad2_connector_labels.png`** — the crop that removed the printed `ADALM2000` title also clipped the tops of two diagonal labels, which now read "…nput 1, Positive" / "…nput 2, Positive". Not load-bearing (this figure's job is the digital leads), but visible. Rolls into the ask in finding 3.

---

### Correspondence checks that passed (the evidence I looked)

- **Every red token in `i2c_transfer_pattern.svg` is under its correct column.** Measured against detected gridlines in a 3180 px render. Table 20 gloss centres `[573, 934, 1313, 1613, 1913, 2247, 2587, 2857]` vs cell centres `[579(ST), 937(SAD+W), 1318(SAK), 1615(SUB), 1913(SAK), 2250(DATA), 2586(SAK), 2860(SP)]` — max error 6 px (0.2 %). Table 22 gloss centres `[454, 708, 983, 1198, 1413, 1614, 1874, 2143, 2387, 2655, 2877]` vs `[448(ST), 707(SAD+W), 982(SAK), 1198(SUB), 1413(SAK), 1611(SR), 1870(SAD+R), 2145(SAK), 2389(DATA), 2661(NMAK), 2887(SP)]` — max error 10 px (0.3 %). All eight and all eleven land as specified, including start↔SR and NACK↔NMAK.
- **Both autoincrement notes sit under the right tables**: "writes" between Table 21's bottom rule (y 783) and Table 22's title (y 917); "reads" below Table 23's bottom rule (y 1697). ✓
- **`ch-i2c`'s own caption is still true of the new image**: ST, SP, SAD+W/SAD+R, SUB, SAK, SR, MAK, NMAK all present as described; "the sequence written out underneath the two single-byte cases" is exactly where the glosses are (Tables 20 and 22). ✓
- **`fig-accel-wiring`'s four leader arrows** land on VIN, GND, SCL and SDA respectively (arrow-tip x = 216.5, 334.3, 399.7, 477.1 against pad row centres); the cable photo does label blue `SDA`, yellow `SCL`, black `GND`, red `5V`. ✓
- **`fig-accel-bb`'s bus is drawn correctly**: blue leaves the Nucleo pin marked `SDA`, yellow the one marked `SCL`; the display's `D` and `C` pins sit in those same two breadboard columns, as do the breakout's blue and yellow. So the book caption's *"yellow to the SCL row, blue to the SDA row, black to GND, and red to power"* and the slide's *"both devices share the same SDA and SCL rows"* are true of the pixels. ✓
- **`ad2_connector_labels.png`**: digital leads numbered 0–15 across two rows ✓; both ground pins carry `⏚` and are black ✓; the chip under `0` is pink and under `1` is green ✓.
- **`waveforms_capture_a.png`**: 9 clock pulses; address bits `0011000`, R/W = 0 → the decoder's `h18 WR` is right; SDA HIGH for the whole of clock 9. `sl-day13-capture-a` at width 74 % renders 1090 px from a 1300 px source — **downscaled 0.84×, so yes, it projects sharp.**
- **B-11a**: both SVGs carry `width`/`height` matching their viewBox; `check_rules.py` returns 0 errors; `image_ratios.py --check` says `book.css` is current, with correct entries for all four changed images; `check_deck.py` reports 0 problems.

---

### Notation mismatches

- **`D0`/`D1` vs `DIO0`/`DIO1` vs bare `0`/`1`** — `ch-accelerometers` (caption, slide 17 title, bullet) writes `D0`/`D1`; `ch-i2c.ptx:749` writes `DIO0`/`DIO1`; both figures and Waveforms itself print bare `0`/`1` and `DIO 0`/`DIO 1` (visible in `waveforms_capture_a.png`'s channel chips). Worse, **this chapter also uses `D14`/`D15` for Nucleo pins**, and the course's real `D0`/`D1` are PA10/PA9. — **change**: the text, to `DIO0`/`DIO1` throughout Day 13, matching `ch-i2c` and Waveforms. (Note that `D0`/`D1` is Petra's own wording on her slide 25, so this is a "her two chapters disagree" call, not an invention to undo silently.)
- **`T1`/`T2` (AD2 silkscreen) vs `TI`/`TO` (pinout sheet)** — inside one `<sidebyside>`; see finding 3. Neither is text we control; the caption must name it or the sheet must be replaced.
- **`SDA`/`SCL` (figure) vs `D14, PB9` / `D15, PB8` (text)** — `Accel_bb.png` labels the Nucleo pins only `SDA`/`SCL`, and `fig-accel-bb`'s caption correctly says "the SCL row"/"the SDA row" without the D-numbers. Agreement is fine here; noting it so nobody "helpfully" adds D14/D15 to that caption.

---

### Legibility (measured as % of a 900 px slide height; `AUTHORING-visual.md` aims ≥ 2 %, calls < 1 % "absent")

| slide | smallest load-bearing type | measured | verdict | fix |
|---|---|---|---|---|
| 17 `sl-day13-analyzer-wiring` | pinout sheet's digits `0`–`15` | **≈6.5 px = 0.72 %** | **fail** — below the 0.5 % "wiring-2 Nucleo silkscreen — rejected" precedent's band. The presenter note says *"The pinout sheet on the right is how to find lead 0, lead 1"*; at this size that numbering is absent, which by `AUTHORING-visual`'s own words makes it a figure-claims defect | **bigger figure, not smaller text** — but 400×402 px cannot carry it. Two different jobs on one slide: the product photo answers "which bundle", the sheet answers "which lead". **Split them, and ask Petra for the sheet at full resolution** — `accelerometerSlide.png` in the same directory already has it at 765×573 plus her colour-coded `GND (black) → ground` / `D0 (pink) → SDA` / `D1 (green) → SCL` boxes, which are the annotation this slide is missing. That is the P-12 move: her original, not a patch |
| 10 `sl-day13-bb` | Nucleo pin labels `SDA`/`SCL` in the Fritzing | **9 px = 1.00 %** | **fail** — the figure renders ~370 px wide because a 1004×1766 portrait is height-limited beside two bullets. The bullets assert "yellow to the SCL row, blue to the SDA row"; the picture cannot show which pin at this size | **bigger figure** — drop the bullets to a one-line caption and let it run full height, and **ask Petra for a landscape re-export** (she has the Fritzing; `accelerometerSlide.png` proves she exports variants) or two graded crops: header detail + breadboard/breakout detail |
| 9 `sl-day13-wiring` | right-panel yellow `SDA/SCL/GND/5V` | **13 px = 1.44 %** | marginal — below the 1.9 % "wiring-1 yellow annotations — accepted" precedent. Left-panel black labels are fine at 2.89 % | the right panel gets 42 % of the SVG canvas for the photo carrying the smallest baked-in type. Rebalance the two panels in the SVG (grow the right, shrink the left — the left has headroom at 2.89 %) |
| 29 `sl-day13-transfer-pattern` | table body / red glosses | **1.56 % / 1.22 %** | marginal, and free to fix — the figure renders 1034 px of 1600 with ~280 px of white either side | widen to ~1400 px: table body → ≈2.1 %, glosses → ≈1.65 % |
| 34 `sl-day13-capture-a` | decoder `h18 WR` | **1.78 %** | acceptable and sharp, but the bottom half of the slide is empty | content width is 1473 px; **`width="88%"`** puts the 1300 px source at pixel-exact 1:1 — 19 % larger type, still sharp, no dead space. Above 88 % it starts upscaling |
| book, `fig-accel-bb` | Nucleo pin labels | ≈3.4 px at `width="52%"` in a ~592 px text column | **fail in the book too** | raising to 100 % only reaches ~6.5 px; this one needs the re-export, not a width change |

Two images in one `<figure>`: `fig-ad2-digital-wiring` uses `<sidebyside>`, which is the correct form for two views — except these two are doing **different jobs**, not being compared, so per check 4 they want two figures. On the page they render fine; only the slide fails.

---

### Look before shipping (crop candidates, not defects)

- `sl-day13-bb` — **2 bullets** + `fig-accel-bb`, aspect 0.57 against a 1.78 slide. Highest risk in the deck; I confirmed in the player that it *scales* rather than crops, but confirm on the room's projector.
- `sl-day13-analyzer-wiring` — **1 bullet** + a `<sidebyside>` figure (two ~1:1 images side by side, so effective aspect ≈2.2).
- `sl-day13-analyzer-waveforms` — 1 bullet + `fig-waveforms-decode` (not in the changed set; flagging for the same reason).
- No `stack="yes"` slides in Day 13.

---

### One loose asset

`assets/images/Day13-I2C(3)/accelerometerSlide.png` (2468×1854) and `stemma.png` (362 KB) are **untracked and referenced by nothing**. `stemma.png` is now inlined as base64 inside `stemma_wiring.svg`, so it is a source file worth committing for reproducibility. `accelerometerSlide.png` is Petra's original slide 25 and is the best available source for fixing finding 4's legibility — do not let it get cleaned up.

---

## learner-visual

## What I looked at

I rendered the changed slides live from the deck player (`http://localhost:8352/external/class.html?deck=day13#N`, 1600×900, `device_scale_factor=2`) with Playwright, then measured glyph pixel heights directly against the full 1800px screenshot height (calibrated against the known-good body-text example on slide 9's black "SDA" label, which measured 54px = 3.0% — an exact match to the AUTHORING-visual.md reference, confirming the methodology). I cross-checked each figure against its source file (`assets/images/Day13-I2C(3)/*`) and its `.ptx` markup to tell whether a fix is a layout/crop lever we control or a re-export only Petra can make.

**Slides 21–22 and 34 check out** and are not findings: the close-up (22) measures "h19 WR" at ~4.7% of slide height, comfortably carrying the reading load the small full capture (21) can't; capture A on slide 34 (`waveforms_capture_a.png`, native 1300×212) is displayed at 74% width with no meaningful upscaling and its "h18 WR" label measures ~3.7% — genuinely sharp now.

### Verdict: BLOCKER

### Findings

1. **[BLOCKER] [B-11a / Rule 2]** Slide 17, `sl-day13-analyzer-wiring` (`ad2_connector_labels.png`, native 400×402) — the pinout's digit labels measure **~0.58% of slide height** (10.5 of 1800px), essentially the same magnitude as the Day 11 "wiring-2 Nucleo pin silkscreen" case AUTHORING-visual.md records as *"rejected — still open."* The slide's own note tells the instructor "the pinout sheet on the right is how to find lead 0, lead 1 and a ground lead" — but at projector size none of the digits, `TI`/`TO` ground labels, or the ⏚ symbols are legible; the slide cannot deliver on the task it sets. Lever: the pinout panel currently gets far less than half the slide's width — widen it substantially; but since the source is only 400px wide, upscaling further will blur, not clarify, so this should also go on the ask-Petra list for a higher-resolution export, same as the open Day 11 case.

2. **[MAJOR] [B-11a / Rule 2]** Slide 9, `sl-day13-wiring` (Petra's annotated `stemma.png`, 626×473, composited into `stemma_wiring.svg`) — the orange "SDA / SCL / GND / 5V" wire labels burned into her cable photo measure **~1.56%** (28 of 1800px), below both the 2% target and the 1.9% accepted floor. Unlike the big black callouts on the same slide (confirmed live SVG `<text>` at 37.5px = 3.0% on stage), these orange labels are raster pixels from her photo, so resizing the SVG container won't help. Lever: crop the photo tighter first — roughly a third of the 626×473 frame is dead gray background and the reference quarter, which pushed off before compositing would gain meaningful size for free; if that's still short of 2%, this needs a Petra re-export at a larger label size.

3. **[MAJOR] [B-11a / Rule 2]** Slide 10, `sl-day13-bb` (`Accel_bb.png`, native 1004×1766) — the breadboard's row numbers ("1, 5, 10, …30") measure **~0.6–1.4%**, unreadable, yet the bullets explicitly assert "both devices share the same SDA and SCL rows" — a claim a student can't verify against the picture. This isn't a resolution problem (native width is 1004px, plenty in reserve) — it's that the image is portrait and height-bound, so the top ~42% (the Nucleo's own pinout header, irrelevant to "which row") is eating slide real estate the breadboard needs. Lever: crop out the Nucleo header before compositing; at the same available slide height this roughly doubles the effective width (aspect goes from 0.57 to ~0.99), which should clear the floor.

4. **[MINOR] [P-4]** Same slide (10) — even once row numbers are legible, the "shared row" idea itself has no visual proof: nothing on the picture highlights that the display's wires and the accelerometer's wires land in the same physical columns — it's asserted only in the bullet prose. Suggest a colored outline or arrow tying the two wire-groups to the same rows, in the same style already used for slide 9's breakout-board callouts.

5. **[MINOR] [B-11a / Rule 2]** Slide 29, `sl-day13-transfer-pattern` (`i2c_transfer_pattern.svg`, viewBox 1590×915). The re-anchored red tokens are now correctly positioned — I measured each word's center against its table-column center and found them within 0.5–8px, effectively pixel-perfect, so alignment is fixed. But the tokens themselves measure only **~1.2–1.3%** of slide height, under the 1.9% accepted floor, because packing all four datasheet tables onto one slide forces the figure to scale down from its own native ratio (22.6/915 = 2.47% if shown at full source scale). Lever: split the slide into two (write-transfers / read-transfers, two tables each) — the same "split" fix already used for the WHO_AM_I capture on slides 21–22 — so the remaining figure can render nearer its native token size.

**Files referenced**: `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`, `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (lines ~382–425, 620–644, 834), `/Users/dz00762/repos/ENGS28/source/ch-i2c.ptx` (line ~4319), `/Users/dz00762/repos/ENGS28/assets/images/Day13-I2C(3)/{stemma.png, stemma_wiring.svg, Accel_bb.png, ad2_connector_labels.png, i2c_transfer_pattern.svg, waveforms_capture_a.png}`.

---

## expert-cognitive-load

## Verdict: MAJOR

The crucial-step scaffolding and the fail-open/checkpoint design are sound and out of scope here, per the brief. The problem is concentrated almost entirely in Parts 1–2's first ~20 minutes, where three ideas that were each told once cleanly through Gate 2′ have picked up 2–3 additional tellings from the new whole-bus slide, the new connecting prose, and (correctly) Petra's own annotation. None of these needs restructuring — every fix below is a deletion or a one-clause trim — but the volume in that opening stretch is exactly the failure shape the census exists to catch, and it is worse than at Gate 2′, not better.

### Repetition census

| Idea | Times | Where | Keep | Cut or reduce to |
| --- | --- | --- | --- | --- |
| The four-wire color-to-pin mapping (black→GND, red→3.3 V, yellow→SCL/D15/PB8, blue→SDA/D14/PB9) | **4 in ~20 min** | `fig-accel-wiring`/`sl-day13-wiring` caption (l.386, l.395); `sl-day13-bb` bullet (l.422); `act-day13-whoami`/`task-day13-wire` statement (l.435–439) | `sl-day13-wiring`'s caption — first, adjacent to the photo it labels | `sl-day13-bb`'s second `<li>` → drop the color list, keep only "joins it on the same rows." `task-day13-wire` → drop the color list, keep the `xref` to the wiring figure only |
| "The display stays" (both devices coexist on the bus) | **5** (4 in class) | Part 1 reveal `ins-day13-keep-display` (l.339–349, full mechanism); Part 1 book paragraph (l.356–365, mirrors it); `sl-day13-wiring` caption tag (l.395); `sl-day13-bb` bullet (l.421); `task-day13-wire` (l.437–439) | Part 1 reveal (Lab 7 load-bearing) + Part 1 book paragraph (the only version students actually read, per the file's own P-10 note) + `sl-day13-wiring`'s one-clause tag | `sl-day13-bb`'s first `<li>` and `task-day13-wire`'s sentence are the same claim two slides apart — cut the restatement from the task; fold `sl-day13-bb`'s into the single combined bullet above |
| The I2C library's five functions, named in full | **2 in full + 1 bare** | Reading `subsec-accel-i2c-recall` (l.75–79, full names); Part 1 prose+slide `sl-day13-back-to-i2c` (l.311, l.320 — bare, one beat); Part 3 `sl-day13-whoami-read` (l.566, full names — **Petra's annotation**) | Petra's Part 3 telling (hers, and correctly placed beside the function that actually uses it) + Part 1's bare resurface | Reading's full enumeration — cut the names, keep only the recall gesture and the `xref` to `subsec-i2c-ref-library` |
| 3.3 V, not the 5 V the parts are labeled | **4 in ~5 min** | `fig-accel-wiring` caption (l.386–390, full reasoning); `sl-day13-wiring` `<note>` (l.396, presenter-only, re-derives it); `fig-accel-bb` caption (l.412–414, brief tag); `sl-day13-bb` `<note>` (l.424, presenter-only, re-derives it for the second image) | `fig-accel-wiring`'s caption (first, full, where the confusing "5 V" label actually is) + `fig-accel-bb`'s caption (already minimal) | Both `<note>`s → trim to a one-clause callback ("3.3 V again — see the wiring caption") instead of re-deriving the reasoning each time |

Nothing else in the chapter is stated more than twice or twice in full — the WHO_AM_I "proves the whole read path" claim (reading vs. Part 3) and the two-kinds-of-NACK pair (Part 5 book paragraph vs. its slide) are each exactly the sanctioned reading→class resurface or the standard book→deck condensation (one telling, two media), not independent tellings.

### Findings

1. **[MAJOR] B-8, P-7 — Part 2 (`sl-day13-bb`, `task-day13-wire`), lines 419–440** — The four wire colors are re-enumerated on the whole-bus slide and again in the activity task, two and three slides after `sl-day13-wiring` already gave them. This is extraneous load riding on a figure (`fig-accel-bb`) that is otherwise legitimately new (topology, not color-to-pin). Cut: `sl-day13-bb`'s second bullet loses the color list ("The accelerometer's four wires join it on the same SDA and SCL rows."); `task-day13-wire` loses its color clause, keeping only `<xref ref="fig-accel-wiring"/>` and the display-stays pointer.

2. **[MAJOR] B-8 — Part 1→2, lines 339–439** — "The display stays" is answered once, properly, at the Part 1 reveal, then restated in near-identical wording on `sl-day13-bb`'s bullet and again in `task-day13-wire`'s statement — the latter two say the same thing ("both devices share the same SDA/SCL rows" / "…the bus, on the same two breadboard rows") back to back. Cut: drop the sentence from `task-day13-wire`; the immediately preceding slide and its own figure already show it. Keep the Part 1 reveal and the wiring-slide's one-clause tag.

3. **[MAJOR] B-8 — reading `subsec-accel-i2c-recall` (l.75–79) vs. Petra's `sl-day13-whoami-read` (l.566)** — Both open with "Recall that the I2C library contains five functions" and list all five names verbatim — a second full explanation, which is a duplicate however far apart. Per the ruling, keep Petra's (it sits correctly beside the one function actually called, fixing the split-attention problem the reading version can't). Cut the reading's enumeration: replace "*Recall that the I2C library contains five functions — i2c1_init(), i2c1_byteWrite(), i2c1_byteRead(), i2c1_memWrite(), and i2c1_memRead() — and they are all we need for the accelerometer, too.*" with an unenumerated pointer ("*…the same library the display driver is built on, and all we need for the accelerometer too. If you'd like a refresher, see `subsec-i2c-ref-library`.*"). This also corrects a reading/class-weight problem: the exact function roster is technical enumeration that belongs at its point of use in class, not carried by the pre-class reading.

4. **[MINOR] B-8 — Part 2, `fig-accel-wiring`/`fig-accel-bb` captions and notes (l.386–396, l.412–424)** — "Use 3.3 V, not the 5 V the part is labeled" is fully re-derived twice more via presenter `<note>`s (never projected, so lower stakes, but still spoken content). Trim both notes to a one-clause callback rather than re-deriving the VIN/regulator or stand-in-part reasoning a second time; leave both captions as they are (one full, one already minimal).

5. **[MINOR] B-16 — Part 2 opening prose, lines 375–380** — "*Wiring the sensor is four leads, and verifying the link is one short program, run through the standing workflow: copy `TemplateProject`, drop the test program into `Src`, build, and watch in CoolTerm*" previews `task-day13-project` and `task-day13-coolterm`'s steps almost 1:1 before the activity states them. Defensible as a callback to a known routine rather than new instruction, but trim the itemized verbs down to the gesture ("*…run through the usual project-copy-and-build routine*") so the activity's own tasks are the first place the specifics appear.

### Census questions, directly

1. **Yes.** Two ideas are now told a fourth time where a third was already one too many: the wire-color mapping (finding 1) and the display-stays fact (finding 2). The 3.3 V point is at four tellings too, but two of them are presenter-only notes, which softens it to MINOR (finding 4).
2. **The figures are fine; the text riding with them is not.** `fig-accel-wiring` (parts, close-up) and `fig-accel-bb` (whole bus, topology) are genuinely different scopes — a legitimate P-4/P-7 progression from component to system. The redundancy is entirely in `sl-day13-bb`'s bullet and `task-day13-wire`'s statement re-reading the first slide's colors instead of sticking to what their own figure adds (findings 1–2).
3. **Mostly yes.** Parts 1, 3, 5, and 8's new opening paragraphs are connective and do not pre-empt what follows. Part 2's opening paragraph (finding 5) is the one borderline case — it previews the activity's own steps rather than only motivating them.

**Files referenced:** `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (lines 72–85, 307–450, 565–577), `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`, `/Users/dz00762/repos/ENGS28/AUTHORING-book.md` (B-8, B-16, B-18), `/Users/dz00762/repos/ENGS28/AUTHORING-slides.md` (l.118–129, `<caption>` vs `<note>` projection semantics).

---

## expert-class-logistics

# Day 13 Gate 3′ — Classroom-Logistics Review

I read `assets/decks/day13.json`, `plans/day13.md`, and the current `source/ch-accelerometers.ptx` for Parts 2, 4, 5, and 6 (the sections named in the brief), plus `AUTHORING-slides.md`'s activity-rendering rule and `AUTHORING-visual.md`'s figure-legibility rules, since two of the questions posed are really about what the deck mechanically *does* on screen, not just what the presenterNote says.

**Arithmetic first, since that's the cheap check.** Every Part's fine-grained beats (deck.json `presenterNote` + the ptx `<slide><note>` for entries deck.json leaves un-annotated — the two are complementary, not duplicated) sum to its row: Part 2 = 3+2+15+2 = 22, Part 4 = 3+2+4+10+2+1+1+1 = 24, Part 5 = 5+4+6 = 15, Part 6 = 8+3+2+1+1 = 15 (I initially miscounted this one — `sl-day13-capture-b`'s own `≈1 min` note closes what looked like a gap; it isn't one). Top line: 3+2+8+22+6+24+15+15+12+3 = 110, and the two stated checkpoints (min 35 = end of Part 2, min 65 = end of Part 4) land exactly where the running sums put them. **Q10 (no spares) and S-25 (no classroom-management in student-facing text) both still hold** — no "spare" anywhere in the chapter or deck, and the one place classroom-management-flavored language could have leaked (the wrong-address "if nothing happens, that's expected" line) is correctly kept spoken-only in the presenter note, while the printed task text carries its own self-contained, technically-worded version ("The trace stays blank until you press reset — that is the sweep waiting, not a fault").

The problems are not in the totals. They're in what a *single presenter driving one screen* can actually show a room of 30 at three specific moments.

### Verdict: MAJOR

### Running clock
```
0:00–0:03  Settling + "kits stay wired" warning
0:03–0:05  Announcements
0:05–0:13  Part 1 — recall, commit, reveal (8)
0:13–0:35  Part 2 — STEMMA slide(3)+whole-bus slide(2)+build/CoolTerm(15)+float(2)
           CHECKPOINT. First-time-hardware spread (P-3) is real here, but the
           hardware/software-split rescue is built for exactly this.
0:35–0:41  Part 3 — walk whoami_test.c (6)
0:41–1:05  Part 4 — leads(3)+decoder setup(2)+predict(4)+CAPTURE(10)+reveal(4)
           CHECKPOINT. Capture is the CRUCIAL step's second half — see Finding 1.
1:05–1:20  Part 5 — questions(5)+two-NACKs/diagram(4)+CODE WALK(6), "never cut"
           See Finding 2 — the code walk's own rescue reference is 6+ slides back.
1:20–1:35  Part 6 — predict(4)+capture(4)+capture-A reveal(3)+stretch(3)+reveal(1)
           See Finding 3 — the rescue image itself is the risk here, not the timing.
1:35–1:47  Part 7 — layers(2, restore rebuilds under cover of this)+recipe(3)+
           header(4)+prototypes(3)
1:47–1:50  Part 8 — homework (3)
= 110, on paper, with the plan's stated cut order (stretch tier → capture B to
demo → Part 1 reveal to one sentence → Part 7 recipe compressed) as the only
margin beyond the two checkpoints' 2+1 min of float.
```
My prediction: the class **reaches 110 on the clock**, because both checkpoints and the cut order are real and well-placed — this is a well-budgeted hour by the numbers. Where it actually loses ground is inside Parts 4 and 5, in seconds the budget doesn't count: a presenter who has to choose, mid-capture, between showing the room's task list and showing the code (Finding 1), and one who has to jump the deck backward across a Part boundary mid-lecture during the single Part marked "never cut" (Finding 2). Neither shows up as a missing minute in `presenterNote`; both show up as presenter fumbling exactly when 30 students are at their most staggered.

### Findings

1. **[MAJOR] P-14 / instructor bandwidth — Part 4, `act-day13-capture`.** Per `AUTHORING-slides.md`'s own rule for activity slides ("no `<slide>` block — deck refs the activity's own `xml:id` — full-width; any figures **or code listings it embeds are dropped**"), projecting the 10-minute capture activity necessarily *replaces* `sl-day13-predict-code`'s abridged listing (the two `#define`s students are told to check their trace against) with the bare task text. Yet that same activity's presenterNote instructs: "Keep `whoami_test.c`'s listing reachable (page back to the predict slide) while the room captures." One screen cannot show both at once — the note asks for something the deck mechanics make exclusive, during the day's CRUCIAL step, with 30 students at a 3× completion spread. *Fix:* put the two values directly in the task statement text (`LSM303_ADDRESS_ACCEL` and `LSM303_WHO_AM_I_A` are already on every student's own open IDE from Part 2 — say so in the task, don't route through the wall screen), or give the activity its own `<slide>` that keeps a compact code strip on screen alongside the task list.

2. **[MAJOR] Instructor bandwidth — Part 5, the code walk (`sl-day13-memread-write`/`-read`).** These two slides show code only, no trace. Their needed companion, `sl-day13-capture-c-closeup`, carries the instruction "Page back to this pair during Part 5's code walk" — but that closeup was last projected back in **Part 4**, six deck entries earlier (past the reveal, both Part 5 commits, the two-NACKs slide, and the transfer-pattern slide). During the one Part explicitly marked "never cut" and with zero float, the presenter has to make a non-trivial backward jump and then return, with no minute budgeted for the jump itself. *Fix:* put a small crop of the relevant capture half directly into a `sidebyside` on `sl-day13-memread-write`/`-read` (code left, trace-half right) instead of relying on live navigation.

3. **[MAJOR-leaning] AUTHORING-visual.md Rules 1–2 — Part 6, `sl-day13-capture-a`.** This is the Part's sole rescue *and* reveal image ("the projected rescue for this capture too, and the reveal"). It's rendered via a bare `<image width="74%">` rather than the `ref`-fills-the-slide treatment Part 4's analogous captures get, and — unlike `sl-day13-capture-c`, which got a dedicated close-up slide specifically because a full-strip capture reads too small from the back — capture A has **no close-up companion**, despite a comparably elongated source image (1300×212 px, `assets/book.css` line 309). Back-of-envelope from Rule 2's formula puts its on-stage text near the ≥2%-of-slide-height floor, not comfortably above it. Compounding: the mechanism explanation ("nothing pulls SDA LOW… the second kind of NACK") sits in the 2.1%, grey, centered `<caption>` — the exact caption-as-content pattern Petra corrected twice on Day 11 ("the caption is way too small to actually convey much information"). *Fix:* render it in the player at stage size before shipping (the checklist item exists for this reason); if under 2%, enlarge the image (Rule 2's lever, never shrink text), and move the NACK-mechanism sentence into a body bullet.

4. **[MINOR] Sequencing — Part 2's three-visuals run.** The clean, caveat-free, fully-labeled wiring photo (`sl-day13-wiring`) is up for only the first 3 of the 5 minutes students spend physically wiring, then swaps to the whole-bus Fritzing (`sl-day13-bb`) for the remaining 2 — a schematic whose own comment block flags it needs **two live spoken corrections** (stand-in breakout part; drawn red lead on the 5 V pin where the course uses 3.3 V). Showing a diagram that needs real-time correction during the room's highest first-attempt-error window, instead of using it as a post-wiring recap, risks a slower wirer copying the picture literally just as the presenter is also absorbed correcting a re-seat at the checkpoint. *Fix:* leave the labeled photo up for the full 5 minutes; move the whole-bus picture to right after wiring closes, as confirmation rather than live reference.

Files consulted: `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`, `/Users/dz00762/repos/ENGS28/plans/day13.md`, `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx` (Parts 2, 4, 5, 6), `/Users/dz00762/repos/ENGS28/AUTHORING-slides.md`, `/Users/dz00762/repos/ENGS28/AUTHORING-visual.md`, `/Users/dz00762/repos/ENGS28/assets/book.css` (image aspect-ratio block, lines 309–315).

---

# Day 13 Gate 3′ — Editor's change list

Sources: `/Users/dz00762/repos/ENGS28/reviews/day13-gate3.md` (seven reports) against `/Users/dz00762/repos/ENGS28/source/ch-accelerometers.ptx`, `/Users/dz00762/repos/ENGS28/assets/decks/day13.json`, `/Users/dz00762/repos/ENGS28/assets/images/Day13-I2C(3)/`.
Line numbers are **pre-edit**; apply top-down within each file, or by anchor text.

## Verdict

Not ready — but it is four hours of work, not a redraft. Her arc is complete (the first Gate 3 in this repo where `checker-arc-fidelity` could write that), the clock reconciles at the beat level, and the crucial step is scaffolded. The single biggest problem is that **three slides say something the picture beside them does not**: slide 9's caption says 3.3 V over a photo whose only voltage label is `5V`; slide 18 teaches "50 µs/div" over a screenshot with 20 µs/div baked into its pixels *and* projects its own title as "50 MS/DIV"; slide 17's presenter note sends the room to a pinout sheet whose digits measure 0.58 % of slide height. Two of those three are hazards under the standing "never say 5 V" rule and a factor-of-1000 error respectively. Underneath that, the newly written connecting prose is in the clipped contrastive register she rewrote out of Day 9x, and her 2026-08-30 **verify-not-prove** ruling is contradicted in five student-facing places including a projected slide title — a ruling losing to a draft is the failure mode that gets a chapter rejected whole.

The rigor/accessibility collision here resolved cleanly and needs no escalation: `expert-cognitive-load` wants Parts 1–2 quieter, `learner-in-the-room` wants three bridges added (DIO0/DIO1, 0x33 in hex, the CoolTerm loop closed). Both are satisfied at once — the four repetitions of the wire-color mapping come down to two, and the bridges go in as captions and comments at the point of need. **This change list adds zero body paragraphs** (B-18); net prose in the in-class section goes down.

---

## Must fix (blocks sign-off)

**1. [CLAUDE.md standing 5 V rule / B-7 / S-3] `ch-accelerometers.ptx:395` — slide 9 says 3.3 V over a photo labelled `5V`, while the room is wiring.**
The book caption reconciles it; the player strips a ref'd figure's book caption (`assets/class.html:1069-1071`), so on the wall the reconciliation exists only in the presenter note. Replace the slide `<caption>` with:

> `Black to GND, red to 3.3 V (the photo labels that wire 5 V; the breakout takes either, and our Nucleo gives 3.3 V), yellow to SCL (D15, PB8), blue to SDA (D14, PB9) — and the display stays wired.`

DISPLACES: nothing — the D-numbers stay (they are the Nucleo destinations her own slide 8 lacked, per `checker-arc-fidelity`), and this caption is the *sanctioned single telling* of the color mapping under item 11. Then trim `:396`'s note, which now re-derives it: drop "The pin the red wire feeds is VIN; the breakout carries its own regulator, so on our Nucleo the red wire goes to 3.3 V" → "3.3 V again — the caption has the reason."
Raised by: `checker-figure-claims` #1 (BLOCKER, measured), `learner-in-the-room` #2 (MAJOR), `expert-cognitive-load` #4.

**2. [B-11c] `ch-accelerometers.ptx:404-407` and `:424` — two source claims about `fig-accel-bb` are false, and one of them instructs the presenter to say so out loud.**
`checker-figure-claims` measured the POWER header (8 sockets, 27 px pitch; `5V` socket at x=438 drawn **empty**; the red wire's connection ring at x=466 = `+3V3` on Nucleo-64 CN6). **The drawing is correct and already shows 3.3 V.**
- `:424` presenter note — delete `and the drawing's red lead is on the 5 V pin; say out loud that we use 3.3 V`.
- `:404-407` editor comment — replace `and the red lead leaves the Nucleo's 5 V pin — the course wires 3.3 V (her words, 2026-08-30: the board takes either; we stick with 3.3 V). Flagged to her; the caption instructs 3.3 V.` with: `and the red lead is on +3V3 (measured at Gate 3', 2026-08-30: the 5V socket is drawn empty; the +3V3 label is hidden under the wire). Do NOT "correct" this drawing or ask her to re-export it.`
- The `fig-accel-bb` re-export ask is **withdrawn** from the ask-Petra list (see below) before she fixes a correct drawing.
- No caption anywhere may say the drawing shows 5 V — which overrides half of one voice rewrite (see item 10) and half of one in-the-room fix (see REJECTED).
Raised by: `checker-figure-claims` #2 (reverses the brief's own premise), consequential for `learner-in-the-room` #2 and `expert-class-logistics` #4.

**3. [S-30 / B-11c / S-18] deck entry 18 + `ch-accelerometers.ptx:647-652` — the setup slide states the wrong time base twice, once in its largest type.**
Two independent defects on one slide, both adopted:
- **The image.** `fig-waveforms-decode` is `waveforms_i2c_setup_2.png` — a 20 µs/div axis baked in as pixels (−20 µs to 180 µs across ten divisions) decoding `h70 WR … hBE`, i.e. Day 9x's **display**. The Gate 2′ swap from `fig-waveforms-setup` fixed a caption risk that does not exist (the player strips it). **Drop `ref="fig-waveforms-decode"` from the slide and `refPage` from deck entry 18**; make it text-only, two bullets:
  (i) `The setup is Day 9x's, unchanged: DIO1 as clock, DIO0 as data, DIO0 falling as the trigger, single sweep.`
  (ii) `One change: 50 µs/div. This read is two transactions and spans about 400 µs; a 20 µs/div window is 200 µs wide and cannot hold it.`
  Rewrite the note's false clause `the figure has them` → `the room did this on Day 9x; do not re-teach the decoder steps.` Book side `:603-611` keeps its xref, unchanged. Position and 2-min beat unchanged.
- **The title.** `assets/decks/day13.json:49` contains U+00B5; titles are `text-transform: uppercase` (`assets/class.html:50`), so it projects **"50 MS/DIV"**. Retitle → `"Waveforms in logic mode: the decoder, and a wider time base"`. The exact `50 µs/div` stays in bullet (ii), where it renders correctly. This is the only deck title in `assets/decks/*.json` carrying µ — worth a one-line guard in `check_deck.py` later.
Raised by: `checker-arc-fidelity` #1 (MAJOR), `learner-in-the-room` #1 (MAJOR).

**4. [Petra's ruling 2026-08-30 / L-9] Six places still say "proves" — complete the verify-not-prove sweep.**
Her ruling, and the reading she already passed observes it (`:131` "you can be confident in").

| where | draft → hers |
| --- | --- |
| `ch-accelerometers.ptx:526` | `A successful 0x33 proves the whole read path:` → `Reading 0x33 back verifies the whole read path:` |
| `:581` (slide bullet) | same sentence, same replacement |
| `assets/decks/day13.json:44` | title `"What a successful 0x33 proves"` → `"What a successful 0x33 verifies"` |
| `:979` | `…and can the value that comes back be 0x33's kind of proof?` → `…and can the value that comes back verify the link the way 0x33 does?` |
| `:994-996` (projected `<instructor>`) | `…and that ACK is the whole point: it proves you reached a device.` → `…and that ACK tells you that you reached a device.` (also L-9, "the whole point") |
| `:999-1000` (same block — **missed by every reviewer**) | `The WHO_AM_I value is what proves you reached the right device` → `The WHO_AM_I value is what verifies that you reached the right device` |

Leave the `xml:id`s (`sl-day13-whoami-proves`) and the instructor-only note at `:584` alone.
Raised by: `checker-voice` #5 and #10; sixth instance found in synthesis.

**5. [B-11a / AUTHORING-visual Rule 2 & 3 / P-12] Slide 17 — the one thing the room cannot see on its own desk is the one thing it cannot read. ONE plan, five findings.**
Digits on `ad2_connector_labels.png` measure **0.58–0.72 %** of slide height (the 0.5 % "wiring-2" band `AUTHORING-visual.md` records as *rejected*), while the slide's own note says the sheet "is how to find lead 0, lead 1". Four changes, in order:
- **(a) Use her original, at nearly 2× the resolution.** `assets/images/Day13-I2C(3)/accelerometerSlide.png` (her slide 25, 2468×1854, now committed under item 7) carries the same sheet at **765×573** vs the current 400×402. Crop the pinout region out of it to `assets/images/Day13-I2C(3)/ad2_connector_labels_hires.png`, cropped further to the **Digital I/O [0:7] half** so `0`, `1` and `⏚` dominate. Point `:636`'s `<image source>` at it. This is the P-12 move — her original, not a patch on the crop.
- **(b) Rebalance the panels.** `:634` `<sidebyside widths="50% 40%">` → `widths="34% 62%"`. The left panel's silkscreen measures 2.89 % and only has to answer "which bundle"; the right panel carries the smallest load-bearing type. **Measure in the player before shipping** (verify-later item 1) — target ≥ 2 %.
- **(c) Adopt her three-line layout.** Split `:642`'s single run-on `<li>` into three, her order, one claim per line — and fix the colour-cycle error (the sheet repeats colours every four, so "pink" alone does not name a lead):
  `A ground lead (black) to ground.` / `D0 — the first pink lead — to the SDA row.` / `D1 — the first green — to the SCL row.`
  Keep "the AD2's digital channels — the larger flying-lead bundle" as the lead-in `<p>`.
- **(d) Bridge D0/D1 → DIO0/DIO1 on the wall.** The book caption carries it and slides strip it; one slide later the vocabulary switches with no bridge. Add a slide `<caption>` (the slide's top third is empty, so nothing is displaced): `The digital leads are numbered 0–15, and the ground leads carry the ⏚ symbol. Waveforms calls the two data leads DIO0 and DIO1.`
DISPLACES: nothing; same slide, same position, same 3-min beat. If (a)+(b) still measure short, the fallback is a split into two slides with the 3 min re-cut as 2+1 so Part 4 still sums to 24 (S-8) — do not ship a split without re-cutting the beat.
Raised by: `learner-visual` #1 (BLOCKER), `checker-figure-claims` legibility table + #7 + #12, `learner-in-the-room` #5, `checker-arc-fidelity` #3 and #7.

**6. [P-11 / B-9] `source/ch-i2c.ptx:4320-4333` — the Day 13 re-anchor damaged a passed chapter's shared figure.**
`fig-i2c-transfer-pattern` lives in ch-i2c; Day 13 only xrefs it. The two new red notes read "…see Sec 6.1.1", which resolves on Day 13 (`:841`) and points at nothing in Day 9x/10, where the caption says only "as an I2C sensor's datasheet draws them" and the LSM303AGR does not exist yet. Caption edit only, no change to the shared image:

> `The four register-access transfers, as the LSM303AGR's datasheet draws them (§6.1.1) — the accelerometer you meet in <xref ref="ch-accelerometers"/> — with the sequence written out underneath the two single-byte cases. …`

DISPLACES: rewrite in place at equal length (B-18 order of preference).
Raised by: `checker-figure-claims` #4.

**7. [B-11 / build] Three of her assets are untracked, and one of them is referenced by the book.**
`git status` shows `Accel_bb.png`, `accelerometerSlide.png`, `stemma.png` untracked. `Accel_bb.png` is `fig-accel-bb`'s image — the build breaks for anyone else. Commit all three: `Accel_bb.png` (referenced), `stemma.png` (the base64 source inlined in `stemma_wiring.svg`, needed for reproducibility), `accelerometerSlide.png` (her slide 25 — the source of item 5(a), and the layout authority behind 5(c)). Record all three in `plans/day13-ground-truth.md` §6's figure manifest with the decision for each (P-12: an unrecorded untracked asset from her is the same failure mode as an unrecorded dropped slide). Then, because items 5 and 10 change image dimensions: `python3 scripts/image_ratios.py` and **commit `assets/book.css`** (`--check` must pass).
Raised by: `checker-arc-fidelity` #7, `checker-figure-claims` (loose asset); the `Accel_bb.png` build risk found in synthesis.

---

## Should fix

**8. [S-20 / S-21 / S-22 / S-12 / L-13] The five unit openings — `checker-voice`'s rewrites, carried verbatim. One text per lead.**
This settles collision (a): `expert-cognitive-load` #5 asked for Part 2's lead to be trimmed to a gesture; voice's #3 rewrite already does that and does it in her register. **Adopt voice's text; discard cognitive-load's wording.**

- `:290-298` **the day's opening** →
  > `On Day 10 we wrote a device driver for the seven-segment display, on the I2C bus.  You read about the LSM303AGR accelerometer, its breakout board, and its WHO_AM_I register.  Today we'll wire the accelerometer onto the bus, verify that we can talk to it, and watch the transactions themselves on the logic analyzer.  We'll also make a start on its device driver.`
  (Her own recap at `day13.json:8-10` already says "You read about… its breakout board"; the prose paraphrased her ruling and dropped the breakout board.)
- `:313-315` **Part 1's closing sentence** — `Before anything gets wired, there is a question to settle.` → **DELETE.** The question is asked in full on the very next line in `act-day13-keep-display`, so the colon fix is unavailable and delivering it here would be the second telling.
- `:375-380` **Part 2's lead** →
  > `We'll wire the sensor to the bus with four leads, and then run a short test program to check that the STM32C031C6 can talk to it.`
  (Kills "the standing workflow" — in-group shorthand with two hits in the corpus, both in this draft — and the four-step enumeration that repeats `act-day13-whoami`'s own tasks eight lines below.)
- `:597-601` **Part 4's lead** →
  > `The line CoolTerm prints tells us that the read worked, but it does not show us what happened on the two wires.  To see the transactions themselves — the address going out, the register number, and the byte coming back — we'll put the AD2's logic analyzer on the bus, and we'll work from that trace for the rest of class.`
- `:756-759` **Part 5's lead** →
  > `You now have a decoded trace on your screen.  We'll work through the questions it raises, and we can answer every one of them from the trace itself.`

DISPLACES: net **−9 lines** of prose across the section; this is the displacement budget items 17 and 19 draw on.
Raised by: `checker-voice` #1–#4, #7; `expert-cognitive-load` #5 (merged, superseded).

**9. [S-11…S-28 / L-15 / L-16 / L-18] The sentence-level voice rewrites — pass-through, verbatim, ten of them.**

| line | draft → hers |
| --- | --- |
| `:467-469` | `What that does to 0x32, and why the address is written this way at all, is a question for the logic analyzer.` → `We'll come back to what that does to 0x32, and to why the address is written this way, once we have the logic analyzer on the bus.` |
| `:517-520` | `The program's shape is the standing one: initialize the two peripherals, print a banner, and then…` → `The program has the same shape as the programs we have been writing all term: initialize the two peripherals, print a startup message, and then…` |
| `:429-431` | `Reading the WHO_AM_I register is what whoami_test.c does, once a second, forever.` → `The program we'll run, whoami_test.c, reads the WHO_AM_I register once a second and prints whether it got the value it expected.` |
| `:609` | `…and drag the view so the first START sits at the left.` → `…and drag the view so that the first START is at the left edge.` (L-15, "apply everywhere") |
| `:632` | `Waveforms calls the two data leads DIO 0 and DIO 1.` → `…DIO0 and DIO1.` (closed up, matching her passed `ch-i2c:750`; **does not** touch D0/D1 — see the ask list) |
| `:894` slide caption | `The NACK is not a line of code.  This function describes the whole transaction to the peripheral in advance — how many bytes (NBYTES), and what to do at the end (AUTOEND) — and the state machine in silicon puts the acknowledge bits and the STOP on the wire.` → `The acknowledge bits and the STOP are not written by this function.  It describes the whole transaction to the peripheral in advance — how many bytes (NBYTES), and what to do at the end (AUTOEND) — and the I2C hardware puts them on the wire.` (she struck "a state machine in silicon" by hand on Day 10; technical claim identical) |
| `:1034` | subsection title `Part 7: A Driver Begins` → `Part 7: The Accelerometer's Device Driver` (L-13; and it is the one agenda item of eight that did not match its subsection title — the deck's "Accelerometer device driver" is hers and stays) |
| `:1042-1048` | `…for the display on Day 10 (<xref ref="fig-firmware-layers"/> is the map — the driver talks to the device only through the I2C library, and the application talks only to the driver):` → `…for the display on Day 10.  <xref ref="fig-firmware-layers"/> is the map: the driver reaches the device only through the I2C library, and the application reaches the device only through the driver.` ("steps" is her ruling and stays) |
| `:1233-1236` **and** `:1253` | `Three things, all on paper — nothing to submit.` → `Here are three things to do for Thursday, all on paper — there is nothing to submit.` **Her sentence "This will help you prepare for Lab 7." is untouched** — this is collision (h), resolved by fixing only the fragment (L-16). |
| `:339-349` vs `:356-365` | Make the shared clauses word-identical (the source comment says "change them together" and they have drifted in three places), and carry `so leave the display wired` into the **student** paragraph as its closing clause — right now the only instruction the student needs survives in the instructor copy alone. |

Raised by: `checker-voice` #6, #11–#14, #16–#18, #20, #21.

**10. [B-11a / B-7 / S-4 / B-8] Slide 10 and `fig-accel-bb` — ONE plan (collision c).**
Four reviewers, one cause: a portrait image is height-bound beside two bullets that restate slide 9.
- **Deck order.** Move `day13.json:36` (`sl-day13-bb`) to **after** entry 37 (`act-day13-whoami`), so the clean, caveat-free photo stays up for the whole wiring window and the whole-bus picture lands as confirmation. Update the Part 2 section note at `:34`: `3 the STEMMA slide, 15 the activity, 2 the whole-bus picture, plus 2 of checkpoint float`. Part 2 still sums to 22; no beat changes value. Book-side figure placement is unchanged (first point of use).
- **Image.** Crop the top ~42 % (the Nucleo's own pinout header) from `Accel_bb.png` before compositing → aspect 0.57 → ~0.99, roughly doubling effective width at the same slide height. The cropped-away region is exactly what the slide no longer claims. Use the cropped asset in the book too and raise `:416` `width="52%"` → `width="85%"` (it fails in the book at 3.4 px as well).
- **Slide.** Image-dominant: delete both `<li>`s at `:420-423`, replace with one `<caption>` that says what only this picture shows, plus the mechanism sentence the student deck has nowhere:
  > `One SDA row and one SCL row for the whole bus: the display's leads and the accelerometer's land in the same two rows.  Each device has its own address, so neither answers transactions addressed to the other.`
  (That second clause is not a sixth telling of "the display stays" — it is the *first* student-deck telling of **why**, and in its new post-reveal position it cannot leak the answer to `act-day13-keep-display`.)
- **Book caption** `:409-415` — hers, minus the sentence item 2 proved false, plus `checker-figure-claims` #6's correction:
  > `The whole bus after today's wiring: the display stays where we wired it on Day 10, and the accelerometer's four wires join it — yellow to the SCL row, blue to the SDA row, black to GND, and red to 3.3 V.  The breakout drawn here is a stand-in part; go by the silkscreen on your own board.`
  (Fixes `since <xref ref="ch-i2c"/>` → "on Day 10", which rendered as "since Chapter 10" — a chapter used as a point in time, S-26/L-11. The clause voice supplied about the drawing showing 5 V is **dropped**, per item 2; the "pin order is the one on your own board's silkscreen" clause goes because the drawn wires run to the QT socket, not the header.)
Raised by: `learner-visual` #3 (MAJOR, measured), `learner-in-the-room` #6, `expert-class-logistics` #4, `expert-cognitive-load` #1/#2, `checker-voice` #9, `checker-figure-claims` #2/#6. **When `checker-figure-claims` and `learner-visual` flag the same figure that is convergence** — one asked whether the picture shows what the text claims, the other whether it teaches; both said no, for different reasons.

**11. [B-8 / P-7] The Part 1–2 repetition census — one item, four cuts.**
`expert-cognitive-load` found two ideas at four tellings each inside the first 20 minutes. Keep the first, cut the restatements:
- **Wire colours (4 → 2):** keep `sl-day13-wiring`'s caption (item 1) and `task-day13-wire`'s… no — keep the caption only. `sl-day13-bb`'s bullet is gone under item 10. In `task-day13-wire` (`:434-439`), drop the colour list and the display sentence: → `Plug the STEMMA QT cable into the breakout and wire its four leads against <xref ref="fig-accel-wiring"/>.`
- **"The display stays" (5 → 3):** the Part 1 reveal, the Part 1 student paragraph and slide 9's one-clause tag stay (Lab 7 depends on the first two); the task's restatement goes with the sentence above.
- **The five library functions (2 full → 1 full):** her ruling is the *slide* text at `:566` ("Recall that the I2C library contains five functions") and it is untouchable. The **reading** at `:75-84` was not her ruling's location, so cut its enumeration: → `The STM32C031C6's I2C peripheral produces the bit-level traffic in hardware, and the I2C library we handed you is what initializes the hardware and interfaces with it.  It is the same library the seven-segment display driver you wrote is built on, and it is all we need for the accelerometer too.  If you'd like a refresher see <xref ref="subsec-i2c-ref-library"/>.  We'll build a similar device driver for the accelerometer.` (Note: this is a *reading*-section cut and does **not** buy displacement credit for the in-class section's B-18 budget.)
- **3.3 V (4 → 2):** both captions stay; both presenter notes stop re-deriving it (`:396` under item 1, `:424` under item 2).
Raised by: `expert-cognitive-load` #1–#4 (census, consolidated as one change per its own framing).

**12. [S-9 / P-18] Slide 22 gets a job, and the code walk gets an adjacent companion (collision e).**
Adopt `learner-in-the-room` #3; reject `expert-class-logistics` #2's embed. Part 5 has **zero float** (5+4+6=15) and is marked "never cut"; compositing trace halves into two already code-heavy slides is new asset work with an overflow risk, and the code walk already has an adjacent companion in slide 29's Table 22.
- `:733` caption → `Between the halves: a STOP, then a fresh START — the same h19 goes out again, this time RD.` Slide 22 then answers a question slide 21 raised, and `task-day13-address-twice` gets a projected target.
- `:734` note → drop `Page back to this pair during Part 5's code walk`; replace with `The code walk's companion is the transfer diagram one slide back, not this one — no backward jump needed.`
Raised by: `learner-in-the-room` #3 (MAJOR — "Nothing." was its entry for this slide), `expert-class-logistics` #2 (concern honored, fix replaced).

**13. [AUTHORING-visual Rule 1 & 2 / P-6] Capture A — 88 %, a bullet, and the loop closed (collision f).**
Petra asked for smaller because it was fuzzy; her intent is **sharp**, and 88 % honors it — content width is 1473 px, so `width="88%"` puts the 1300 px source at pixel-exact 1:1 (still a downscale, never an upscale; above 88 % it starts upscaling), 19 % larger type, 1.78 % → ~2.1 %, and the bottom half of the slide is empty anyway. Rewrite `:956-959` as:
```
<ul>
  <li>This is the second kind of NACK — the one from nobody at all: no device recognized the address, so nothing pulled SDA LOW at the acknowledge bit.</li>
  <li>CoolTerm: compare what your board printed with what your neighbors' did.</li>
</ul>
<image source="images/Day13-I2C(3)/waveforms_capture_a.png" width="88%"/>
<caption>One transaction: h18 WR goes out, nothing pulls SDA LOW at the acknowledge bit, and the decoder's P — a STOP — ends it.</caption>
```
The mechanism sentence moves out of the grey centered caption into a body bullet (the caption-as-content pattern Petra corrected twice on Day 11). The second bullet closes the written prediction from `task-day13-break-predict` **without asserting anything** — it is Q3-safe by construction. American spelling (L-7).
DISPLACES: the caption's second sentence becomes bullet 1; nothing is added net.
Raised by: `checker-figure-claims` #5 + legibility table, `expert-class-logistics` #3, `learner-in-the-room` #8.

**14. [P-3 / P-2 / L-9] `:973-981` — the stretch asks the student to verify something the deck does not know.**
`learner-in-the-room` could predict it and then stopped: "check it on your own bus" names no edit, and mimicking the day's pattern with `(0x70 >> 1)` puts 0x38 on the wire and reaches nobody — the exact confusion Part 5 spent fifteen minutes clearing up. Two edits to `task-day13-stretch-display`:
- Delete `, then check it on your own bus` (four words). The instructor block already says "let whoever captures it report it", which is the right instruction for the instructor and the wrong one for the task.
- Add the P-2 lifeline: after `answers to address 0x70`, insert `(already the 7-bit address — no shift)`. Confirmed against `ch-i2c.ptx:817`.
- The same sentence takes the verify-not-prove fix from item 4.
DISPLACES: eight words in, four out; net +4 words in a Part with 15 min and a stated cut order.
Raised by: `learner-in-the-room` #4 (MAJOR, "Tasks I could not do"); shift-trap and lifeline added in synthesis.

**15. [P-14 / instructor bandwidth] `:692-697` + `day13.json:52` — the capture activity's note asks for two things on one screen.**
Projecting an activity drops its embedded listings (`AUTHORING-slides.md`), so the note's "page back to the predict slide while the room captures" is mechanically exclusive with showing the task list — during the crucial step, with a 3× completion spread. Route the students to their own IDE instead of the wall, which is also P-15-safe (it names no values):
- `task-day13-read-decode` → `…Compare them with the two <c>#define</c>s at the top of <c>whoami_test.c</c>, open in your own IDE, and with your prediction.`
- `day13.json:52` note → replace `Keep whoami_test.c's listing reachable (page back to the predict slide) while the room captures.` with `The two #defines are open in every student's own IDE — the task says so; the wall stays on the task list.`
Raised by: `expert-class-logistics` #1.

**16. [B-11a / Rule 2] Slide 29 — widen the figure rather than split the slide.**
The figure renders 1034 px of 1600 with ~280 px of white either side; widening to ~1400 px takes the table body from 1.56 % → ~2.1 % and the red glosses from 1.22 % → ~1.65 %. Also nudge the Table 20 gloss row in `i2c_transfer_pattern.svg` from `y="219.4"` to `y≈211` — at present it is 45 px below Table 20 and 47 px above Table 21's title, i.e. equidistant and ambiguous (the other three annotations are unambiguous). Note the SVG is **shared with ch-i2c**; the nudge improves both, the width change is Day 13's slide only.
REJECTS `learner-visual` #5's split — see Dissent.
Raised by: `checker-figure-claims` legibility table + #11, `learner-visual` #5 (measurement adopted, fix replaced).

**17. [B-8a / S-9] Three claims that reach a slide but no prose, or prose but no slide — merged into two edits.**
- **Note-only, displaces nothing:** append to `sl-day13-transfer-pattern`'s note (`:836`): `If anyone asks whether ours is wrong: Day 10's answer. A STOP frees the bus, and with a second controller on it the register pointer you just set could be changed before you read. One controller here, so it is safe.` And seven words into `sl-day13-header`'s note (`:1157`): `_A is the accelerometer half; the magnetometer has its own.`
- **The `:839` paragraph** — voice #8's rewrite and arc #4's owed sentences are the same paragraph; here is the single final text, with the "state machine in silicon" phrase already corrected per item 9:
  > `The transfer diagram in <xref ref="fig-i2c-transfer-pattern"/> is the datasheet's own drawing of what you captured — §6.1.1, Tables 20–23, and Table 22 is the shape your trace has.  Three more questions can be answered from its rows: who sends the address, where we tell the accelerometer which register to read from, and where the accelerometer puts the register's contents on the data line.  Where our trace shows a STOP and a fresh START between the two halves of the read, the datasheet draws a repeated START; the register-level walk of <c>i2c1_memRead()</c> in <xref ref="subsec-i2c-ref-library"/> shows exactly where our library makes that choice, and why it matters on a bus with two controllers.  The NACK you found on your own trace is in neither half of that listing: the library describes the whole transaction in advance — how many bytes (NBYTES), and what to do at the end (AUTOEND) — and the I2C hardware puts the acknowledge bits and the STOP on the wire.`
  (The three questions are hers, from old-deck slide 24, with the "we" in them; the draft's impersonal compression also said the wrong thing — as written it is the *questions* that can be read off the rows.)
DISPLACES: +2 sentences into an existing paragraph, funded by item 18's deletion in the paragraph 15 lines above and item 8's net −9 lines. No new paragraph.
Raised by: `checker-arc-fidelity` #2 and #4, `checker-voice` #8.

**18. [S-10 / S-28] `:821-823` — delete the two-NACKs closing sentence (collision g).**
`The two are opposite: the controller's NACK ends a read on purpose, and the other one means that nobody answered.` → **DELETE.** Gate 2′ added it as a her-register replacement for a fragment; deleting it does not restore the fragment — the paragraph then ends on the complete sentence "…and the wire simply stays HIGH." So the L-16 concern that motivated the addition is satisfied without the summarizing flourish, and S-10/S-28 carry. The distinction itself (which is genuinely better than anything in her old deck) stays in the two preceding sentences and on both bullets of `sl-day13-two-nacks`.
Raised by: `checker-voice` #19 (ruled in its favour).

**19. [S-9] `:541` — put 0x33 on the wall in hex (collision j).**
`0x33` never appears on the wall as WHO_AM_I's value; the listing gives `00110011` and slides 15, 21, 22, 34 all lean on 0x33. Converting binary to hex from the back of the room is not the point of the slide. On the **wall** listing only: `// default value: 00110011` → `// default value: 0x33 (00110011)`. Ruling: permitted — `check_starters.py` compares **code**, not comments (B-13), and this listing is already documented as an abridged wall copy at `:534-537`. The verbatim Part 3 listing at `:484` and the header's DEFAULT column at `:1106` stay byte-identical.
**Not** applied to `sl-day13-predict-code` (`:671`) — see REJECTED.
Raised by: `learner-in-the-room` #7.

---

## Consider

- **[B-11a] Slide 9's orange labels measure 1.56 %**, below the 1.9 % accepted floor, and they are raster pixels inside her photo, so the SVG container cannot fix them. One edit to `stemma_wiring.svg`: crop the dead gray margin from the right panel's raster (keep the quarter — it is the scale cue) and rebalance the panels, growing the right at the expense of the left (which has headroom at 2.89 %). Re-measure; only if it is still short does this become an asset ask. — `learner-visual` #2, `checker-figure-claims` legibility table.
- **[P-4] Slide 10 has no visual proof of the shared-rows claim.** If the crop in item 10 measures short on the breadboard row numbers, add two thin colored row rules in a compositing SVG *wrapper* — do not repaint her PNG. — `learner-visual` #4.
- **[B-7] `fig-accel-wiring`'s connector arrow runs from the socket to the plug** while the caption says the plug goes into the socket. Cheapest fix is the caption, not the SVG marker: `Either socket on the breakout takes the cable's plug — it only fits one way.` — `checker-figure-claims` #10.
- **`subsec-day13-wire-and-prove` is a student-visible page name** (`subsec-day13-wire-and-prove.html`, in the deck JSON five times) that still says "prove" after item 4's sweep. Its rendered title is already "Wire It and Verify the Link". Low value, five deck edits; leave unless she notices.

---

## Escalate to Petra

- **The AD2 pinout sheet (slide 17 / `fig-ad2-digital-wiring`).** The sheet is the ADALM2000's — the AD2's own silkscreen reads `T1`/`T2` and the sheet reads `TI`/`TO`, visibly, inside one `<sidebyside>` — its printed title was cropped off, that crop clipped two diagonal labels to "…nput 1, Positive", and at 400×402 no crop or layout change makes the digits legible from the back. Her own slide 25 proves she has taught from this sheet for years, so this is probably "leave it and say so" rather than a defect. **Recommendation:** ship item 5 now (her 765×573 copy, cropped to the digital half, panels rebalanced) and add one owning clause to the book caption — *"(the sheet is drawn for the AD2's sibling instrument; the digital numbering, colours and grounds are identical, only the trigger pins are named differently)"* — and ask her for the AD2's own sheet at full resolution for next year, not for this delivery.
- **Q3, and what Part 6 still owes.** Nothing student-facing may assert what the program prints on a wrong-address NACK, so Part 6's debrief paragraph stays owed and `sl-day13-capture-a`'s note keeps collecting rather than asserting; item 13's CoolTerm bullet closes the written-prediction loop without touching Q3. **Recommendation:** ship Day 13 with Q3 open — the trace side (one transaction, NACK after the address) is verified and carries the beat on its own — and resolve Q3 before Day 14, since any answer lands in `ch-i2c` too.

## Ask Petra (questions, not change-list items)

1. **`D0`/`D1` vs `DIO0`/`DIO1` — your two texts disagree.** Your slide 25 and your Day 13 ruling say **D0/D1** for the physical leads; your passed `ch-i2c:750` writes **DIO0/DIO1** throughout for the Waveforms channels. `checker-figure-claims` asked for DIO0/DIO1 everywhere; **your ruling stands and nothing has been changed.** My reading is that both are right about different things — D0/D1 is the flying lead you pick up, DIO0/DIO1 is what Waveforms calls the channel — and that the caption should say so, which it nearly does already. Confirm, and I will make the distinction explicit rather than pick one.
2. **`Accel_bb.png` — the re-export ask is WITHDRAWN.** The earlier report that the red lead is on the Nucleo's 5 V pin was wrong: it is measurably on **+3V3** (the `5V` socket is drawn empty; the `+3V3` label is hidden under the wire). Your drawing is correct as it stands. No re-export needed; the source comment and the presenter note that repeated the error are being corrected (item 2).
3. **Wednesday vs Thursday.** Your slide 32's printed line — kept verbatim as `sl-day13-homework`'s caption — says *"Wednesday and Thursday: We'll get some acceleration data out of the sensor."* Its speaker note says *"Tomorrow: theory of how this thing works. Thursday: get some data,"* which is what the book prose at `:1247` follows and what `sec-accel-day13x` actually does. Which ships on the wall?
4. **DIO and VIN are never expanded anywhere in the book** — `ch-i2c` uses DIO0/DIO1 bare and `ch-ble` uses VIN bare, both in text you passed. Expand on first use in this chapter, or is bare the house style for instrument-panel and silkscreen labels?
5. **`fig-accel-wiring`'s 5 V claim has been narrowed, not softened.** The draft said "the board accepts either 3.3 or 5 V logic"; the photo's annotation is `3.3V-5V` on **VIN**, which is supply, not logic, and the reading already establishes the breakout's regulator. The caption now claims only what the figure and the reading support (item 9's neighbour, `:388-390`): *"The red wire goes to the breakout's VIN pin, and the photo labels that wire 5 V. The breakout carries its own regulator and accepts 3.3 V or 5 V there, and in this course we use 3.3 V."* If you did mean 5 V logic tolerance on SDA/SCL, say so and I will put it back with its own sentence.

## Dissent worth recording

- **`learner-visual` #5 wanted slide 29 split into write-transfers and read-transfers**, so the red glosses could render nearer native size. I overruled it — Part 5 has zero float, is the one Part marked "never cut", and `learner-in-the-room` called the all-four-shapes view the strongest slide in the deck, precisely because the room can see which one their trace is. If the widened figure still reads small from the back of the room, the split is the next move and Part 5's 4-minute diagram beat becomes 2+2.
- **`expert-class-logistics` #4 and `learner-in-the-room` #6 disagree about the whole-bus picture.** I moved it after the wiring activity as confirmation (logistics), but in-the-room valued it *during* wiring as the only thing showing where the parts go on a student's own breadboard. Logistics' strongest argument — that the drawing needs two live spoken corrections — is now half retracted (item 2 killed the 5 V correction). If the room struggles to place the breakout during the first five minutes, move it back before the activity; the beat arithmetic is identical either way.
- **`expert-class-logistics` #2 wanted trace halves composited into the two `memRead` code slides.** I chose the cheaper recaption instead. If the presenter actually fumbles the code walk, the composite is the right fix and should be built before Day 13 runs again.

## REJECTED (with reasons)

- `learner-in-the-room` #2, second half (add the "photo labels it 5 V" half-clause to slide 10 too) — the Fritzing's red lead is measurably on +3V3; the clause would be false there.
- `learner-in-the-room` #4, first option ("say how you would check it: which one line would you change") — invites the `(0x70 >> 1)` → 0x38 trap the same report identifies. Adopted its second option instead.
- `learner-in-the-room` #7 applied to `sl-day13-predict-code` (`:671`) — not requested, and the predict listing deliberately withholds (P-15). Applied to `sl-day13-whoami-main` only, where `== 0x33` is already on the wall.
- `learner-in-the-room`'s `lsm303AccelData_s`, `MAK`, `RXDR`, `CTRL_REG1_A` undefined-on-the-wall entries — self-rated acceptable, resolvable in context, or documented as intended mystery-then-explain (Part 7's DEFAULT column ties `CTRL_REG1_A` back). No action.
- `checker-arc-fidelity` #5 (pre-emptive fit fix for deck entries 43 and 45) — the reviewer itself says none pre-emptively; moved to verify-later, with the cut order recorded.
- `checker-voice` #9's sentence *"The drawing shows the red lead on the Nucleo's 5 V pin; on our boards it goes to 3.3 V."* — a voice rewrite that would have introduced a false technical claim. S-16: resolved in favour of the engineering; the rest of her rewrite is adopted.
- `checker-voice` #15's word-for-word carry of "the board accepts either 3.3 or 5 V logic" — the figure's annotation is on VIN (supply). Her sentence *shape* is adopted; the claim is narrowed to what the evidence supports (S-19), and the question goes to her (ask #5).
- `checker-voice`'s suggested **Part 6 lead** — rejected whole, not half. `act-day13-break-it`'s `<introduction>` is projected, is in her register ("properly configured" is her ruling), and does the lead's work; B-16 says a subsection may drop straight into its activity, and B-18 prefers not adding a paragraph. The Q3-unsafe CoolTerm-symmetry clause is moot as a result.
- `checker-figure-claims`' "DIO0/DIO1 throughout Day 13" — Petra's D0/D1 ruling stands; the question goes to her (ask #1). Only the caption's *spacing* (`DIO 0` → `DIO0`) changes.
- `checker-figure-claims` #8 ("the larger flying-lead bundle" has no comparative referent in the photo) — established vocabulary from `ch-i2c:749`, and the reviewer marked the fix optional.
- `checker-figure-claims` #12 (clipped diagonal labels) — rolls into the escalation; not a patch task.
- `expert-cognitive-load` #5's own replacement wording ("the usual project-copy-and-build routine") — superseded by `checker-voice` #3, which deletes rather than paraphrases. One text per lead.
- `expert-class-logistics` #2's `sidebyside` composites — see Dissent.
- `learner-visual`'s ask for a landscape re-export of `Accel_bb.png` — the crop in item 10 is a lever we control and the source has resolution in reserve (1004 px wide). Conditional only; see verify-later.

## Verify later (measure, don't assume)

1. **Re-measure slides 17, 10, 9 and 29 in the player at 1600×900 after the crops and width changes.** Targets: ≥ 2 % of slide height for load-bearing type, 1.9 % as the accepted floor. If slide 17 still fails after item 5, split it and re-cut the 3-min beat as 2+1. If slide 9's orange labels still fail after the Consider crop, that becomes an asset ask.
2. **Fit-check deck entries 43 (`sl-day13-prototypes`) and 45 (`sl-day13-homework`)** — both carry two body paragraphs plus a listing or list, the `sl-day11-counter-compare` shape that overflows without warning. If 43 overflows, the cut is its caption to the presenter note at zero cost: entry 45's first homework bullet already says "write `lsm303_AccelRegisterWrite()`".
3. **After all edits:** `./scripts/build-all.sh`, `python3 scripts/check_rules.py --quiet source/*.ptx`, `python3 scripts/check_deck.py assets/decks/*.json`, `python3 scripts/check_starters.py`, `python3 scripts/image_ratios.py --check`, and `python3 scripts/filter_student_decks.py --check output/web-deck`. Item 7's asset commits and item 10's crop both invalidate `assets/book.css`.
4. **Re-run the B-18 count** after applying: the section should still be ~18 body paragraphs, with word count down. If any item has grown it, the item is wrong, not the budget.