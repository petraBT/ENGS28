# learner-c-fluent — Day 8 simulator text (scoped gate)

Draft reviewed: `scratchpad/day8-sim-prose-draft.md` (sections A–D), the new
student-facing text that comes with putting the board simulator into Day 8.

(Transcribed from the agent's findings; the agent ran without a Write tool.)

### Verdict: MAJOR

### Findings

**[MAJOR] [B-6, L-6] The hedge is the failure mode, not the fix for it.**
Section A/B, the `volatile` passage, against `ch-timers-interrupts.ptx:1257-1260`
and `:2263`. The chapter states the Nucleo consequence unconditionally:
"Without `volatile` the optimizer may decide the flag never changes... the blink
simply doesn't happen, with no error anywhere" and "Without it: no error, no
warning." The new simulator passage narrows this to "On your Nucleo, *compiled
with optimization on*, the same program *can* stop blinking" — a qualifier that
appears nowhere else in the chapter. To the reader who already knows what
`volatile` does, that is exactly the sentence to seize on: if my classroom Debug
build is not "compiled with optimization on", this does not apply to me. The
closing line ("TODO 4a is still the real question") asserts an urgency the
preceding sentence just undercut, and nothing tells the student what the
TemplateProject's actual Debug optimization flag is, so there is no way to know
whether the caveat excludes them. **Fix:** either state the TemplateProject's
real Debug optimization level and confirm the miss is reachable under it, or
drop "compiled with optimization on" and match the chapter's own unconditional
phrasing, so the two passages do not disagree about how sure to be.

**[MAJOR] [B-6, L-6] Runtime message 4 is more accurate than, and contradicts,
text already in the chapter.** The message ("the entry still holds the startup
file's weak default: `Default_Handler`, an infinite loop... Press Reset") sits
against `ch-timers-interrupts.ptx:1223-1229` ("Your ISR never runs. Depending on
what that default handler does, the board may also stop responding entirely")
and the `rq-volatile` distractor feedback at `:470-473` ("never wired into the
vector table and so never runs at all"). `reviews/day8-gate2.md` already flagged
this exact claim as an unverified, likely-wrong BLOCKER, twice, by two different
reviewers: standard CMSIS `Default_Handler` is `b .`, a hang, not silence.
Shipping the simulator's confident "infinite loop, press Reset" story next to the
book's hedged one means a student who reads both will notice they disagree.
**Fix:** verify against the real `startup_stm32c031c6tx.s` and bring the ladder
and `rq-volatile` text in line with whatever the simulator says.

**No TODO answers are handed over.** Scoped to the four TODOs and Part 5's
`rc_w0` lookup: UIE/`DIER` and `NVIC_EnableIRQ` are never named in any runtime
message. Message 4 diagnoses the misnamed-handler symptom without ever supplying
`TIM14_IRQHandler`. Message 3 restates the "access type decides 0 versus 1"
*principle* but not the answer for UIF, which is already given verbatim in
TODO 3's own comment — reinforcement, not a leak, given the proposed placement
at the end of Part 7.

**[MINOR] [P-6] That clean bill of health depends on reading order.** The
embedded simulator is reachable independently of the book's sequence. Nothing
stops a student loading `blinkyTimerInt.c` before Part 5 has run, clearing UIF
the ADC's way, and meeting message 3's "the access type in the reference manual
decides whether a 0 or a 1 does the clearing" *before* Part 5's commit-then-look-
up reveal (`subsec-day8-rcw0`). That is the P-6 shape this chapter otherwise
protects carefully. Worth a placement guard, or accept as a narrow known risk.

**[MINOR] Message 3 narrates the diagnosis before the student can form one.**
It fires after the third consecutive re-entry, and the livelock runs at hardware
speed, so three re-entries happen effectively instantly. The transferable skill
here is reading a symptom and guessing the cause, and the message removes that
step for exactly the student quick enough to have tried it. Consider a delay, or
a first symptom-only message ("the handler is re-entering itself") before naming
the mechanism.

**[MINOR] [L-6] "TODO 4a" imports a sub-letter the reading does not use.**
It exists in the starter file's comments but not in the activity list, which says
only "Fill TODO 4" (`:1456`). A student working from the book's activity text may
not recognise "4a". Use "TODO 4", or name the thing: the flag's declaration.
