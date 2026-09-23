# Day 8 simulator prose — scoped technical gate

Source under review: `scratchpad/day8-sim-prose-draft.md` (chapter paragraph,
starter header, four runtime messages, two dropdown labels).

Ground truth checked: RM0490 Rev 3 (`assets/stm32c031_rm.pdf` §1.2, §5.4.14,
§11.3 Table 40, §17.4.1–17.4.13, memory map p.43);
`source/ch-timers-interrupts.ptx`; `assets/starters/blinkyTimerPolled.c` and
`blinkyTimerInt.c`; `ENGS28-board-sim/src/peripherals/{timer,nvic,stm32-defs}.ts`,
`src/engine/{interpreter,parser,runner,index}.ts`, `src/board/register-panel.ts`,
`src/main.ts`, `scripts/check-timer.mjs`.

Behavioural claims were checked by **running the engine headlessly** (esbuild
bundle of `src/machine.ts` + `src/engine/index.ts` driven from node), not by
reading it.

---

## Verdict: BLOCKER

One student-facing sentence states a symptom that is the opposite of what the
Nucleo does. Everything else is either correct or a bounded imprecision.

---

## 1. Registers, bits, addresses, IRQ number — all verified against RM0490

Every value the model and the messages depend on was read out of RM0490, not
assumed:

| Claim | RM0490 | Verdict |
| --- | --- | --- |
| TIM14 base `0x4000_2000`, 1 KB | memory map, p.43 | ok |
| CR1 0x00, DIER 0x0C, SR 0x10, EGR 0x14 | §17.4.1–4 | ok |
| CCMR1 0x18, CCER 0x20, CNT 0x24, PSC 0x28, ARR 0x2C, CCR1 0x34, TISEL 0x68 | §17.4.5–12 | ok (the sparse map is right: 0x04–0x08 and 0x1C reserved, CCR1 not after CCER) |
| CEN bit 0, UDIS 1, URS 2, OPM 3, ARPE 7 | §17.4.1 | ok |
| UIE bit 0, CC1IE bit 1, 15:2 reserved | §17.4.2 | ok |
| UIF 0, CC1IF 1, CC1OF 9, **all three `rc_w0`** | §17.4.3 | ok |
| `rc_w0` = "read as well as clear this bit by writing 0. Writing 1 has no effect" | §1.2 | ok |
| TIM14EN is RCC_APBENR2 **bit 15**, APBENR2 at offset 0x40 | §5.4.14 | ok |
| TIM14 is vector-table **position 19**, vector `0x0000_008C` | §11.3, Table 40 | ok |
| `TIM14_IRQHandler` is the slot's name | startup file convention; matches chapter | ok |
| CR1 write mask `0x0FFF` | bits 15:12 reserved | ok |
| ARPE = 0 at reset, so ARR is unbuffered (timer.ts's justification for applying ARR immediately) | §17.4.1, CR1 reset 0x0000 | ok |

`node scripts/check-timer.mjs` passes 46/46.

---

## Findings

### BLOCKER

**B-1. Message 3 states the opposite of the hardware symptom.**
`scratchpad/day8-sim-prose-draft.md:88-92`, implemented at
`ENGS28-board-sim/src/engine/interpreter.ts:331-339`.

> "main() gets one statement in between one return and the next, so whatever it
> does happens far too fast rather than **not at all**."

The first clause is an accurate description of the simulator — I measured it.
With an ISR that leaves UIF set, the yielded line sequence is
`19 20 21 | 15 | 19 20 21 | 14 | 19 20 21 | 15 …`: handler, exactly one main
statement, handler. So "one statement in between" is exact.

The second clause is a claim about what the student will see, and on the
Nucleo it is wrong. On a Cortex-M0+, an exception return taken while a
same-or-higher-priority exception is still pending does not return to Thread
mode at all: the core **tail-chains** straight into the handler again. Thread
mode gets **zero** instructions. The level is held here because UIF is still
set and UIE is still set, so the request never drops. The symptom on the board
is exactly "not at all": the LED freezes and the board looks dead — which is
what `subsec-day8-code`'s own triage ladder (line 1470) teaches as the dead-board
signature.

So the message teaches a rule about the simulator ("too fast, not dead") that
inverts the board's behaviour, in the same chapter whose troubleshooting
section turns on recognising the dead-board case. This is the defect the
draft's own gate question 2 was written to prevent, appearing in message 3
instead of in the volatile paragraph.

UNVERIFIED against a document in this repo: tail-chaining is specified in
PM0223 (Cortex-M0+ programming manual) and the ARMv6-M ARM, neither of which is
in `assets/`. To close it from a source, PM0223 §2.3.x (exception entry and
return / tail-chaining) is what is needed. RM0490 §11 defers to PM0223 by name.

Correction: scope the sentence to this window and stop it claiming the board's
symptom. Something like: "In this window main() still gets one statement
between one return and the next, so the blink goes far too fast instead of
stopping; on the board the processor goes straight back into the handler
without returning, and nothing in main() runs at all."

---

### MAJOR

**M-1. `TIM14->ARR` resets to 0 in the model; RM0490 §17.4.10 says 0xFFFF.**
`ENGS28-board-sim/src/peripherals/timer.ts:73` (`private arr = 0`) and `:319`
(`this.psc = this.arr = this.cnt = 0`).

RM0490 §17.4.10: TIM14_ARR, address offset 0x2C, **reset value 0xFFFF**. Every
other reset value in the model is right (CR1, DIER, SR, CNT, PSC all 0x0000).
Exposure: the register panel prints `TIM14->ARR` as soon as the program touches
the timer, so a student who enables the clock and looks before writing ARR reads
0 where the board reads 65535; and a program that sets CEN without ever writing
ARR gets a one-tick period here against a 65536-tick period there. Fix is one
initializer plus the same value in `reset()`.

**M-2. PSC is applied immediately; the chapter makes a four-figure set-piece of
the fact that it is buffered.**
`ENGS28-board-sim/src/peripherals/timer.ts:222-225` and its header comment at
`:35-38`; against `source/ch-timers-interrupts.ptx:620-657`
(`fig-prescaler-r3`, `fig-prescaler-timing`) and slides `sl-day8-psc-r3`,
`sl-day8-psc-full`.

The chapter: "software writes a new value into TIMx_PSC mid-period. The
prescaler control register shows the write immediately, but the working copy,
the prescaler buffer, holds the old value until the next update event… A new
prescaler value never changes the counting rate mid-period." The model does the
opposite: the write takes effect at once (and calls `rebase()`).

timer.ts is honest about this in its own comment, and no code in the course
rewrites PSC while running — but Part 2 spends four figures and four slides
teaching the buffered behaviour and then hands the student a window in which
testing it gives the opposite answer. Either model the buffer (apply PSC at the
next update event) or say so in the prose. It is currently a simplification
presented as fact, which is gate question 6.

**M-3. `source/ch-timers-interrupts.ptx:1191` — "its priority is 24".**
Pre-existing chapter defect, inside the material the draft plugs into.
RM0490 Table 40 gives TIM14 position 19, **priority 26**. I rendered the
figure the caption describes
(`assets/images/Day08-Interrupts/vector_table_tim14.png`): the boxed row reads
`19 | 26 | settable | TIM14 | TIM14 global interrupt | 0x0000_008C`. The
caption contradicts its own artwork and the manual. `act-timer-vector-t2`
(line 1180) explicitly asks students to "note its position number, its acronym
and **its default priority**", so every student in the room reads 26 off the
figure and 24 off the caption. Correct to 26.

**M-4. `source/ch-timers-interrupts.ptx:1495` — "The complete file is at the end
of this part", and it is not in the student's book.**
Pre-existing, and load-bearing for the draft's proposed placement ("at the end
of Part 7"). The complete file exists only as
`<slide xml:id="sl-day8-solution" instructor="yes">`, and `<slide>` renders in
deck builds only. I checked the built page: `output/web/subsec-day8-code.html`
contains `TIM14_IRQHandler` exactly once, in triage step 3 — the solution is
nowhere in the student book, nor in `output/web-instructor/`. So the sentence
tells a student to "copy it, compare it against your own version" from
something that does not exist on the page. Either reword to point at Canvas or
give the file a home the reading book renders.

---

### MINOR

**m-1. The panel shows six TIM14 rows, not three.**
Draft §A ("The register panel shows `TIM14->CNT`, `TIM14->SR` and
`TIM14->DIER`") and the same list in the starter header.
`src/board/register-panel.ts:262-267` pushes **CR1, DIER, SR, CNT, PSC, ARR**.
Nothing stated is false, but the list reads as exhaustive and omits the two
registers Part 2's whole arithmetic produces (PSC and ARR) and the bit that
says whether any of it is running (CEN in CR1) — and the very next sentence of
the draft is about a prescaler value. Suggest naming all six, or "the six TIM14
registers this chapter uses, including PSC, ARR and CNT".

**m-2. "a prescaler that does not fit 16 bits" — the chapter's own
over-16-bit instance is the count, not the prescaler.**
Draft §A:24-25 against `act-timer-design`
(`source/ch-timers-interrupts.ptx:689-710`): the pair the chapter calls
impossible is "prescale by 60, count to **100,000**", and the one with 65,536
in the prescaler slot the chapter explicitly says is fine on width grounds
(it fails on the fractional count; 65,536-1 = 65,535 fits). So the draft points
the student at a case the chapter never raises.

Both truncate in the model and I confirmed both empirically: PSC written as
119,999 truncates to 54,463 and the period becomes 2.27 s instead of 500 ms
(no LED edge inside 1.5 s); ARR written as 99,999 truncates to 34,463 and the
period becomes 172 ms (edges at 172 345 517 689 …). Recommend "a prescale or
count value that does not fit 16 bits". Also note "the wrong one" takes
"prescaler" as its nearest antecedent when it means "period".

**m-3. "One thing this window cannot show you" undercounts, and message 2 says
so eight lines later.**
Draft §A:27 and §B:57 against draft §C item 2, which tells the student the
window also cannot show the capture/compare output stage. Add M-2 above (the
prescaler buffer), M-1 (the ARR reset value) and the absence of interrupt
nesting/priorities (`src/peripherals/nvic.ts:11-15`) and the count is at least
five. Compare the Day 7 wording the last paragraph is lifted from
(`source/ch-adc.ptx:1256-1259`), which opens "One warning:" and then lists two
things in one sentence. Suggest "One thing this window cannot show you about
your own program." or simply "One limitation worth knowing."

**m-4. "Each is emitted once per reason per run" (draft §C:69) is true of
messages 1 and 2, not of message 3.**
The timer dedupes on exact text (`timer.ts:310-314`, `notesSeen`); message 4
appears once because `defaultHandler()` never returns. Message 3 is gated on
`++this.reEntries === 3` (`interpreter.ts:330`) and `reEntries` is reset to 0
whenever the line stops asserting (`:307`, `:342`), so a program that
intermittently fails to clear can emit it again. Reviewer-facing sentence only;
no student text is affected.

**m-5. The proposed placement contradicts its own parenthetical.**
Draft §A:12-15 says "at the end of Part 7 … after the activity
`act-timer-interrupt` and its skeleton slides, mirroring where the ADC `<sim>`
sits (before the set-up slide, after the prose that explains the exercise)". In
`ch-adc.ptx` the `<sim>` is at line 1267, i.e. **after** `act-adc-write-code`
(1177) and **before** `sl-adc-setup` (1273) — before the slides, not after
them. Mirroring it here puts the `<sim>` after the activity and the "LED not
blinking?" ladder and before `sl-day8-skeleton`, not at the end of the part
after `sl-day8-solution`.

**m-6. A vacuous assertion in `scripts/check-timer.mjs`.**
`check('nothing enabled: nothing is ever due', nvic.msToNext(), Infinity)` — the
helper compares `JSON.stringify` output, and `JSON.stringify(Infinity)` is the
string `"null"`. The check would pass for `null`, `NaN` or `-Infinity` too
(the console line even prints "got null"). The returned value is in fact
`Infinity`; the assertion just cannot tell. Compare with `Number.POSITIVE_INFINITY`
directly.

---

## Answers to the six questions asked

**1. Registers, bits, addresses, IRQ numbers.** All verified against RM0490;
table above. No divergence found in `stm32-defs.ts`, the messages, or the
draft. The only reset-value divergence is ARR (M-1).

**2. "The counter runs on real time here, so a 500 ms period really is 500 ms
and a prescaler that does not fit 16 bits really does give you the wrong one."**
TRUE, and measured, not inferred.

`GpTimer.sync()` (`timer.ts:108-131`) advances CNT from `performance.now()`
differences, catching up at every access; `Machine` constructs it with
`APB_CLK_HZ` = 12 MHz and the default `now` (`machine.ts:73-79`); `Runner`
never scales time (`timeScale = 1`, `runner.ts:40`, set nowhere else). Running
`assets/starters/blinkyTimerPolled.c` in the engine, PA5 edges land at
**501, 1001, 1501, 2001, 2501 ms**. Running `assets/sim-starters/blinkyTimerInt.c`
with the four TODOs filled: identical, 501/1001/1501/2001/2501. Sampling the
seeded (unfilled) starter: CNT = 99/199/299/399/499 at 100 ms intervals, then
CNT = 99 with SR = 0x1 at 600 ms — the wrap is exact and UIF is visible, so the
draft's "watch the counter run from 0 to 499 and wrap, and UIF come up when it
does" is delivered on first Run. (Worth knowing, though it needs no edit: once
the program clears UIF, the flag stands for ~1/1600 of a frame, so UIF=1 is
seen in the seeded state and in Step mode, not in the finished program.)

Truncation: see m-2 for the two measurements. The claim holds; only the noun is
mis-chosen.

**3. The volatile claim.** All three checkable parts are TRUE.
- *Parser accepts and ignores it*: `src/engine/parser.ts:30` lists `volatile`
  as a type keyword and `:140` drops it with the other qualifiers ("qualifiers /
  width — ignored").
- *No optimizer*: the whole pipeline is `preprocess → parse → new Interpreter`
  (`src/engine/index.ts:27-29`). It is a tree-walking interpreter over the AST;
  there is no pass between parse and execution, no constant folding, no dead-store
  elimination. `grep -r optimi src/` returns nothing.
- *A shared flag works without the keyword*: measured. The same program with
  `volatile int timerElapsed;` and with `int timerElapsed;` produced identical
  LED edges (501/1001 vs 500/1000 ms).
- *The real board can fail at optimization*: consistent with
  `ch-timers-interrupts.ptx:1253-1259` and `subsec-timers-ref-isr`
  (`:2219-2237`), and the draft's conditioning ("compiled with optimization on")
  is more careful than the chapter's unconditioned version. One caveat I could
  not source: if the students' STM32CubeIDE Debug configuration is `-O0`, the
  miss will not reproduce on their board either, which makes "a blink here is not
  evidence that the declaration is right" true but one-sided — a blink *there*
  is not evidence either. UNVERIFIED: needs the optimization level in
  `TemplateProject`'s Debug configuration. If it is `-O0`, consider "even on your
  Nucleo a Debug build may blink without it; that is still not evidence."

**4. Message 3's "one statement in between".** Accurate about the simulator —
measured, see B-1. The dispatch point is the per-statement `yield`
(`interpreter.ts:364-366`), the handler is called by generator recursion
(`:317`), and the level is re-tested on return (`:329`). The failure is the
inference drawn from it about the board (B-1).

Gate question 1 (does it hand over work?): no. "the access type in the
reference manual decides whether a 0 or a 1 does the clearing" is a restatement
of what Part 5 already teaches in prose — "the access type in the reference
manual, not habit, is the authority" (`:1067-1071`) — and the clearing line
itself is printed in the starter's TODO 3 comment. It diagnoses; it does not
answer a TODO.

**5. Message 4 vs `sl-day8-handler-misspelled` and the code.** Matches both.
The slide (`:1335-1345`): "The slot keeps what the startup file put there.
Standard handler names are declared as weak symbols pointing at a generic
`Default_Handler`, an infinite loop." The message says the same in the same
order. `interpreter.ts:311-320` looks the name up in `IRQ_HANDLER_NAME` and
falls through to `defaultHandler()`, which emits the note and then
`while (true) yield` — nothing else runs, matching "Nothing else runs from
here"; `#btn-reset` exists and is labelled "⟲ Reset" (`index.html:15`),
matching "Press Reset". I reproduced it: a program with
`void TIM14_IRQhandler(void)` emits exactly the drafted text. The message
correctly does **not** name `TIM14_IRQHandler`, so TODO 3 stays unanswered.

All four messages were reproduced and match the draft **character for
character**.

**6. Simplifications presented as fact.** Three: B-1 (tail-chaining), M-2 (the
prescaler buffer), M-1 (the ARR reset value). A fourth is disclosed only in the
code and not to the student: there is no interrupt nesting and no priority model
(`nvic.ts:11-15`, `interpreter.ts:291-295`). That one is defensible — the
chapter says every ISR in this course brackets its body with
`__disable_irq()`/`__enable_irq()` (`:1281-1290`) — but it belongs in the
same sentence as the other limits if m-3 is taken.

---

## Verified with no finding

- Draft §B body is byte-identical to `assets/starters/blinkyTimerInt.c` from
  `#include` onward (`diff` exit 0); only the header differs, as claimed.
- "The five initialization lines" — APBENR2, PSC, ARR, CNT, CR1 is five, and
  Part 3 is titled "Five Lines of Initialization".
- "a forgotten clock line shows up as an empty `RCC->APBENR2` beside a block of
  zeros" — reproduced. The bus records the address as touched even though the
  timer discards the write (`memory-bus.ts:69,76`), so `touchedTim14()` is true
  and the APBENR2 row is pushed (`register-panel.ts:144`) reading 0, with all
  six TIM14 rows reading 0.
- The clock-off note fires on the first discarded write and once only.
- §D dropdown labels and hints match `src/examples.ts:146-148` and
  `src/examples-instructor.ts:191-193` exactly.
- The instructor example is reachable only when `$book.solutions = 'render'`
  (`xsl/engs28-html.xsl:344-347`); `check_instructor_only.py` clean. P-10 holds.
- The notes really do appear "in the panel under the editor": they go to
  `TerminalPanel.note()` (`terminal-panel.ts:129`), whose `#coolterm` div sits
  directly below `#editor`, and `onOutput` auto-reveals it because
  `autoRevealTerm` defaults true (`main.ts:49,55-57`) — no `coolterm="yes"`
  needed on the `<sim>`.
- The last paragraph of §A is verbatim from `ch-adc.ptx:1260-1264`, as claimed.
- The register panel repaints every frame while running (`onLine` sets `dirty`,
  `main.ts:186`), so CNT animates.
- `rc_w0` modelled exactly: `TIM14->SR = TIM_SR_UIF` leaves UIF standing,
  `TIM14->SR = ~TIM_SR_UIF` clears it (`timer.ts:204`), which is Part 5.
- Two enables on two sides: `irqActive()` needs SR & DIER, the NVIC enable is
  separate (`timer.ts:259-263`, `nvic.ts:38-41`), matching `sl-day8-nvic`.
- UIF is a level, not a count: several elapsed periods set it once
  (`timer.ts:124-129`), matching hardware.
- The `<sim>` starter parses and runs with its TODOs unfilled: no compile error,
  no note, no LED edge.
- `python3 scripts/check_rules.py source/ch-timers-interrupts.ptx` — 0 errors,
  0 warnings. `check_starters.py`, `check_instructor_only.py` — clean.
- `node scripts/check-timer.mjs` — all pass (but see m-6).

## Part B passes

- **B1 (rule vs. the chapter's own example).** One hit: m-2. The draft's
  16-bit-overflow example is a prescaler; the chapter's is a count, and the
  chapter's one large *prescaler* candidate (65,536) it calls legal on width.
- **B2 (arithmetic).** 12,000 × 500 = 6,000,000 cycles ÷ 12 MHz = 500 ms ✓.
  ARR_FACTOR 500 → written 499 → "0 to 499" ✓ and CNT was 499 at t = 500 ms.
  Truncations recomputed independently: 119,999 & 0xFFFF = 54,463 → 2.27 s;
  99,999 & 0xFFFF = 34,463 → 172.3 ms; both matched the running model. No
  arithmetic error found in the draft.
- **B3 (self-contradiction).** One hit: m-3, "One thing this window cannot show
  you" against message 2 naming a second thing. One hit inside the draft's own
  placement note: m-5.
- **B4 (against the rest of the book).** Two hits: B-1 against the dead-board
  triage at `:1470-1486` and `sl-day8-ladder`; M-2 against `fig-prescaler-r3` /
  `fig-prescaler-timing`. The draft's inherited claims that check out: the
  `rc_w0` idiom (Part 5), the vector-table position (Part 6), the volatile
  argument (`subsec-timers-ref-isr`), the Day 7 `<sim>` closing paragraph
  (`ch-adc.ptx`), PA5/LD2 and the 12 MHz clock (CLAUDE.md).

## Unverified

- Cortex-M0+ tail-chaining on exception return with a still-asserted level
  (B-1) — needs PM0223 or the ARMv6-M ARM; neither is in `assets/`.
- The optimization level of `TemplateProject`'s Debug configuration
  (question 3) — needs the project's `.cproject` or the CubeIDE build settings.
- Whether `Default_Handler` in `startup_stm32c031c6tx.s` is literally a `b .`
  loop — asserted by the chapter and by the message, and true of every ST
  startup file, but the file itself is not in this repo (only a PNG excerpt of
  its vector table).
