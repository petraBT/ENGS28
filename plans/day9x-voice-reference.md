# Voice specimen: Petra's hand pass over the Day 9x opening

Her corrections to the first few slides of Day 9x, 2026-08-07, after a draft she
rejected with *"You are not speaking in my voice."*  Same status as
`plans/day8-voice-reference.diff`: **the pairs are the specification**, and the
patterns below are only a summary of them.

Read this before writing any ENGS 28 prose or slide text.

---

## The pairs

### Open on what we are doing, not on what is absent

> ~~"Nothing was assigned to read before today, and nothing from Tuesday is a
> prerequisite. No EXTI, no NVIC, no ISR, no `volatile` — this is a new
> peripheral and a new protocol, built from scratch."~~
> → **"Today we'll start communicating with the seven-segment display in your
> kit."**

A list of what students do *not* need is not an opening. Say what the day is.

### "We'll", throughout

> ~~"In the first twelve minutes we wire a display to two of the Nucleo's pins,
> flash a program you are given, and read four characters off it."~~
> → **"We'll start by wiring the display to two of the Nucleo's pins, flash a
> program, and make sure the display lights up."**

Note three separate moves in that one pair: the time budget is gone from
student-facing text, "a program you are given" became "a program", and the
sentence is now something *we* do together.

> ~~"Two habits carry over: go to the reference manual for a number rather than
> guessing it…"~~
> → **"We'll continue going to the reference manual for register information,
> and we'll continue using a whole mask…"**

### Expand what a student would have to look up

She adds the expansion inline, every time:

- `PB9 (SDA)` → **`PB9 (SDA - serial data)`**, `PB8 (SCL)` → **`PB8 (SCL - serial clock)`**
- "the two wires of an I2C bus" → "the two wires of an **I2C (Inter-Integrated Circuit)** bus"
- "the Arduino header" where the draft said just "the header"

### State the mechanism plainly instead of gesturing at it

> ~~"The pull-ups are already on the backpack. The AD2 in the picture is for
> Part 3b."~~
> → **"The I2C protocol requires pull-up resistors on SCL and SDA but the
> backpack has this integrated, so no need for us to wire them externally.
> We'll use the AD2 in a bit."**

Longer, and correct to be longer (S-14). "Part 3b" is internal scaffolding a
student does not have.

### Cut the rhetorical construction

> ~~"The direct approach is not short by a little."~~ → *deleted*
> ~~"Today: the two wires. Thursday: the chip at the end of them."~~
> → **"We'll talk about the I2C protocol today and will examine how to talk to
> the backpack chip tomorrow."**

The draft's habit is a clipped, contrastive, aphoristic register. Hers is a
plain declarative sentence. Slide titles too:
~~"Four wires, and 3.3 V not 5 V"~~ → **"Wire up your display"**.

### Cut the reassurance

> ~~"Been through the four wires twice and still dark? Flag it. There is
> known-good hardware in the room and we will get you onto it. Do not spend the
> rest of the hour on a bad board."~~ → *deleted whole*

Already an explicit B-12 ban ("reassurance theater"); it keeps coming back.

### Do not restate an instruction the previous slide gave

The activity's "Wire the display: + to 3.3 V, − to GND…" was deleted because
the wiring slide immediately before it says exactly that. Cross-check every
activity against the slide in front of it.

### When a count is wrong, the lead goes — not the count

Draft: *"Three things follow from sharing the wires"* over a four-item list.
She deleted the lead sentence rather than changing "three" to "four". If the
sentence is only there to count, it is not carrying anything.

---

## The summary, for grepping

1. Open positively; never with what is absent or not required.
2. "We'll" for the class's work.
3. No time budgets, no "Part N" references, no lesson-design commentary in
   student-facing text — those go in `presenterNote` or `<note>`.
4. Expand every acronym and abbreviation inline, the first time.
5. Plain declarative sentences. No aphorisms, no "not X but Y", no sentence
   fragments for effect, no "which is the whole point".
6. No reassurance, no manufactured stakes.
7. Say a thing once.
