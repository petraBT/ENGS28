# Prompt: bring every ENGS 28 deck into Petra's voice

Paste everything below the line into a fresh session in `~/repos/ENGS28`.

The voice is not described from taste — it is **derived from Petra's own
rewrite of Day 8 and the Day 8 pre-class video**, which she did by hand. That
rewrite is the specimen. Every rule below is followed by her actual before →
after, so the session can check its instincts against evidence instead of
inventing a house style.

---

## Task

I hand-edited two decks — **Day 8** (`assets/decks/day8.json`) and **Day 8
pre-class video** (`assets/decks/day8video.json`), plus the `<slide>` blocks
they reference in `source/ch-timers-interrupts.ptx` — so they sound like me
rather than like a textbook. I want that voice in **all the other decks**, and
I want it written down so decks generated from now on start out in it.

Two deliverables:

1. **A voice pass over the remaining 11 decks.**
2. **Rules added to the authoring files**, so future chapters inherit this.

### Read these first

- `AUTHORING-slides.md` — how decks and `<slide>` blocks work
- `AUTHORING-book.md` — the rule catalogue (**B-**, **S-**, **L-**, **P-**);
  the S block ends at **S-10**, the L block at **L-7**
- `CHAPTER_PROCESS.md` — the per-chapter workflow; **Step 4** is where slides
  are written
- **`plans/day8-voice-reference.diff`** — the Day 8 rewrite, frozen at the
  moment I finished it, so it stays readable whether or not it has been
  committed since. **Read all of it before changing anything** — it is the
  specification, and the rules below are only its summary.

### Scope

| | |
|---|---|
| Decks to change | 11 — `day1, day1x, day2, day3, day3x, day4, day5, day5x, day6, day7, day7x` |
| Slides in them | 279 (89 glue entries + 190 `ref`s) |
| `<slide>` blocks behind those refs | 190, in `source/ch-*.ptx` |
| Already done — **do not re-edit** | `day8`, `day8video` |

**Slide content only.** A deck's glue text lives in `assets/decks/<id>.json`;
a `ref` slide's content lives in a `<slide>` block in `source/*.ptx`. Edit
both. **Do not touch the book's reading prose** — the paragraphs outside
`<slide>` blocks — even though my Day 8 pass did touch some. Whether the
reading gets the same treatment is a separate decision I have not made; if you
notice reading prose that badly contradicts the voice, list it at the end
instead of changing it.

⚠️ Some deck `ref`s point straight at an `<activity>` or `<task>` by its own
`xml:id` rather than at a `<slide>` block — that content **is** the reading.
Leave it alone and list it, for the same reason.

---

## The voice, with evidence

### S-11 — Name the thing plainly; no metaphor as a label
A metaphor *inside* an explanation is fine — "the `while` **plants** the
program at the flag, the `if` **glances** once" survived my pass untouched.
What I removed is metaphor used as the *name* of a thing, which the reader
then has to decode.

- `LED not blinking? The ladder` → `LED not blinking? Steps to help you diagnose the fault`
- `Four rungs, in order` → `Four steps, in order`
- `Between every interrupt source and the CPU sits a referee` → `Interrupt sources (like the timer) don't get to talk to the CPU directly: the NVIC … is an intermediary that routes requests according to priority`
- `The mechanism, resurfaced` → `Review: The interrupt mechanism`

### S-12 — Name what you point at, and where it lives
No in-group shorthand. A student who missed that day must still follow.

- `This is deliberately not the Day 5 / Day 7 idiom` → `…not what we did when waiting for the UART / ADC to finish`
- `But on rc_w1 it is destructive — that was the Day 7 case` → `…as we saw for ADC_ISR`
- `Now open RM0490 §11.3, Table 40` → `Now open the reference manual, RM0490 §11.3, Table 40`
- `The answer is printed in RM0490` → `The answer is in the Reference Manual (RM0490)`
- `Both registers are 16 bits` → `Both the prescale and the count register are 16 bits`
- `presses during the countdown delays` → `button presses during the countdown delays`

### S-13 — "We" for what the class does, "you" for what the student does
- `In class you build all of it` → `In class we will build all of it`
- `measure pulse widths (the tachometer)` → `…(we'll build a tachometer)`
- `this course leaves every source at the same default` → `we will leave every source at their default priority`
- `You felt this in the Lab 2 race game` → `You noticed this…` (still "you" — the student did it)

### S-14 — Give the reason with the rule
Where the terse version asserted, say why. This *lengthens* slides, and that
is correct — it is **S-9** (slides stand alone), not a conflict with it.

- `Both are written minus one: divide-by-12,000 is written 11999` → `Both the prescaler and counter start counting at 0, we therefore subtract one from the value we have in mind: divide-by-12,000 is written 11999`
- `save what you'll disturb onto the stack, jump, run, restore, resume` → `save (push) what you'll disturb onto the stack, jump to the function code, run that code, restore (pop) the previous state, resume`
- `wrap to 0` → `restart at 0`

### S-15 — No manufactured stakes, urgency, or time pressure
- `ENGS 28 · Day 8 — Before Class (≈ 7 minutes)` → `ENGS 28 · Day 8 — Before Class`
- `The answer is printed in RM0490, and you can find it in under a minute.` → `The answer is in the Reference Manual (RM0490):`
- `Lab 5 asks exactly this at full scale — and next week, timers drive motors.` → `This is a great preparation for Lab 5.`
- `…the event is lost. Starting Day 9, that stops being hypothetical.` → `…the event is lost.` (second sentence cut)
- `Today's target is 500 ms — 6,000,000 cycles. Your turn.` → `Today's goal: a 500 ms timer — 6,000,000 cycles.`

### S-16 — Requirements, not slogans
Keep the technical claim **exactly as strong**; change only the register. Do
not weaken a fact — I softened the *rhetoric*, not the engineering.

- `Every variable an ISR shares with the rest of the program is volatile. Always.` → `Every variable an ISR shares with the rest of the program therefore needs to be declared volatile.`
- `Anything an ISR shares with main is volatile, and ISRs stay short.` → `…needs to be volatile, and ISRs need to stay short.`
- `The access type in the RM, not habit, is the authority.` → `To know which to use you need to consult the reference manual.`
- `That free remainder of the loop is the entire point of a background timer.` → `…is the point of a background timer.`
- `Two checks catch nearly everything:` → `Check these:`

### S-17 — Support, don't challenge
Questions open a discussion; they do not dare the student.

- `Still stuck? Flag it, grab the known-good copy, and keep moving — nothing before Part 7 needs your own board.` → `Still stuck? We're here to help!`
- `Check both against a 48 MHz clock: neither survives — why not?` → `Now imagine your clock was running at 48 MHz (which our chip can do): how could you make the 250 ms or 500 ms blink rate work?`
- `…and be ready to say why. Commit an answer for all four` → `…and why or why not. Commit an answer for all four`
- **Added** a bullet: `Discuss at your table: what could possibly be going on here?`

### S-18 — A title says what the slide is
- `Bring to class` → `Summary: What You'll Need In Class`
- `Two status registers, opposite clears` → `Clearing status registers`
- `Run it: Blinky that never waits` → `Run it: Blinky with a (polled) timer and without delay_ms()`
- `Blinky where the timer does the calling` → `Blinky where the timer does the calling (no polling)`
- `No wiring today — the whole class is code` → `No wiring today — everything is done in code and on the chip's hardware`

### S-19 — Allow honest incompleteness
Say when a rule has exceptions rather than implying it is the whole story.

- **Added**: `(Other behaviors are possible here as well.)` after describing auto-reload
- `Both TIM14_IRQn and the handler name … come from one table in the reference manual.` → `…come from different places.` (because they do)

---

## Hard constraints

**Never change:**

- `xml:id`, `ref`, `stack`, `room`, `"instructor"`, `"page"`, `"slide"`, `"type"`
- Register, bit, and peripheral names, and their case (**L-6**) — `TIM14->SR`,
  `ADC_ISR_ADRDY`, `stm32c0xx.h`
- Any number: prescaler values, cycle counts, timings, table/figure numbers,
  RM section numbers
- Code inside `<program>`/`<code>` — **except** a comment, where the voice
  rules apply (I changed `// When the flag is set` → `// When your flag is set`)
- `<clr c="…">` spans, `<sim>`, `<xref>`, and character entities like `&#8212;`

**Also:**

- Do not propagate my typos. My Day 8 pass introduced `generates and update
  event` (for "an") and `two requests arrive ar the same time`. Fix those two
  in `day8video.json` and `ch-timers-interrupts.ptx` as part of this work.
- Keep every slide's meaning. If a rewrite would change what is being taught,
  stop and list it instead.
- Watch length: **S-9** says a slide carries its own reasoning, but a slide
  must still fit. After editing a deck, check the fit — `AUTHORING-slides.md`
  has the console snippet. If it no longer fits, split it, don't thin it.

---

## How to work

1. **Show me one deck first.** Do `day1` only, then stop and show me the diff
   with a short note on which rule drove each change. Do not touch the other
   ten until I say go.
2. Then work **one deck at a time**, committing per deck, so a bad pass is one
   `git revert` and not a rescue operation.
3. After each deck:
   ```bash
   python3 scripts/check_rules.py --quiet source/*.ptx
   python3 scripts/check_deck.py assets/decks/*.json
   ```
   Both must be clean.
4. `git status` before committing. **I edit these repos while you work** —
   commit only files you changed, never `git checkout` a directory to tidy up,
   and never revert a change you did not make.

---

## Deliverable 2 — write the rules down

So that decks generated from now on start in this voice:

1. **`AUTHORING-book.md`** — add **S-11 … S-19** to the `S — Slides` block,
   in the same one-line-rule-plus-explanation style as S-1…S-10. Keep them
   short; put one before → after with each, taken from the Day 8 pass, because
   the examples are what make them usable.
2. **`AUTHORING-slides.md`** — add a short "Voice" section under the existing
   conventions, pointing at S-11…S-19 rather than restating them.
3. **`CHAPTER_PROCESS.md`** — **Step 4** (condense into slides) should say
   that slides are written in this voice, and name the rule range.
4. **`scripts/check_rules.py`** — add lintable rules **only where a regex is
   genuinely safe**. Candidates: time-pressure phrasing ("in under a minute",
   "≈ N minutes" in a student-facing subtitle), and slogan endings
   ("`. Always.`", "the entire point"). **Before adding any of them, run the
   pattern across all of `source/` and show me the hit count and a sample** —
   if it fires on legitimate prose, propose it as a judgment rule instead.
   Do not lint anything requiring taste.
5. Check the reviewer agents in `.claude/agents/` for guidance that now
   contradicts these rules, and list what you find. **Propose, don't edit** —
   `expert-rigor-hawk` in particular may read S-16 as permission to weaken
   claims, which it is not.

Finally: tell me anything in the Day 8 rewrite you could **not** turn into a
rule — places where I clearly changed something but you cannot say what the
principle was. Those are the interesting ones, and I would rather see the list
than have you invent a rule to cover them.
