# Day 5x — the prompt

Paste everything below the line into a **fresh** session in `~/repos/ENGS28`.
It is `plans/CHAPTER-GENERATION-PROMPT.md` with its two blanks filled and the
unit's own situation stated; that file stays the authority for the process.

---

You are reworking one unit of the ENGS 28 textbook, PreTeXt book source plus
the classroom deck it projects. Branch `main`. Small commits, pushed as you go.

**The unit:** Day 5x — Reading Component Datasheets (Wednesday x-hour, 50 min)
**The chapter file:** `source/ch-io-datasheets.ptx`

Read, in this order, before touching anything: `CLAUDE.md`,
`plans/CHAPTER-GENERATION-PROMPT.md` (the whole of it; its "Continuing or
reworking an existing unit" section is the case you are in), `CHAPTER_PROCESS.md`,
`AUTHORING-book.md`, `AUTHORING-slides.md`, `AUTHORING-visual.md`, the voice
specimens named there, and your memory directory's rules (no em dashes, whole
sentences, precise scientific language with no anthropomorphized hardware or
code and no baby or spoken phrasing, compact replies to Petra, fix given code
and never annotate it, no classroom staffing anywhere).

## The situation

Day 5x is marked **done** in `CHAPTER_PROCESS.md`, but it was written before the
gated process existed: there is no `plans/day5x.md`, no `plans/day5x-ground-truth.md`,
no `reviews/day5x-gate*.md`, and Petra has never done a pass on it. The chapter
has one in-class section (no pre-class reading: an x-day never has one), a
datasheet worksheet in Parts A to E as `<task>`s, two `<instructor>` blocks
(a worked Part E slide and the answer key for five components), five `<slide>`
blocks and `assets/decks/day5x.json` (15 entries). Her originals are
`assets/ClassSlidesOLD/Day05X-InputOutputDatasheets.pptx` and
`Day05X-StudentReport.pptx`; the five worksheet datasheets are in
`assets/datasheets/` (TMP235, DRV5053, DS3231, LIS3DH, Si7021).

So this is the "reworking an existing unit" path, run as **both deliveries**:

1. **Gate 0 as verification.** Mine her two decks (`scripts/pptx_mine.py`,
   `--arc` first) and confirm the chapter follows her arc and her wording;
   prefer her sentences to the chapter's where they differ. Check every
   datasheet citation against the PDF in the repo (page and table numbers
   pasted, not typed). Write `plans/day5x-ground-truth.md` and send Petra a
   short numbered question list; carry on with everything that does not
   depend on the answers.
2. **Gate 1.** Write `plans/day5x.md`, one page, with the 50-minute budget and
   the crucial step in one sentence, and run the Gate 1 panel on it and on the
   chapter's existing outline.
3. **Gate 1.5 and Gate 2 on the existing prose**, applying every standing rule
   (the language rules above; American spelling; Unicode units; "we" is the
   course; no weekday names in student text; no "Part N" in student text
   except the worksheet's own Part A to E labels, which are its structure).
   The mechanical checks must pass. The chapter's history has Petra's later
   rulings in its commit messages (`git log -- source/ch-io-datasheets.ptx`):
   read them first and treat them as settled.
4. **Deliver the book to Petra** with a compact message: what to look at, and
   the numbered questions. Stop there.
5. After her pass 1: apply it, then condense the deck from the passed text,
   Gate 3, fit-check every student slide at 1600×900, deliver the deck.

Do not restructure the day unless Gate 1 finds a reason; the worksheet and the
share-out are her design and they work. Do not add a pre-class reading. Update
`CHAPTER_PROCESS.md`'s status row and write a `plans/week3-handover.md` (or
append to the Day 5x entry if one exists) at the end of every session.
