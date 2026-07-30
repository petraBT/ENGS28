# Day 8 pre-class video — recording script

**Deck:** `assets/decks/day8video.json` — open the deck player at
`class.html?deck=day8video&student` and record that window while narrating.
Target length **6–8 minutes**; the per-slide timings below total ≈ 7:00.
One idea per slide; pause a beat after each slide change before speaking.

The video carries the *mechanism* content that the Before-Class reading
deliberately no longer does (the reading motivates and introduces; this video
is where students first see the machinery; the written version lives in the
chapter's Reference section). The pre-class questions cover the reading AND
this video — say so at the end.

---

## Slide 1 — Title (0:00–0:15)

> Hi everyone. Before Thursday's class, seven minutes on two ideas: a piece of
> hardware that counts time so your program doesn't have to — and interrupts,
> which are how the hardware gets your program's attention. You don't need
> your board or the IDE for this — just watch.

## Slide 2 — The problem: waiting (0:15–1:00)

> Every program you've written so far stops dead while it waits. When ADCPot
> sits inside delay_ms of a thousand, the CPU does nothing — for twelve
> thousand clock cycles every millisecond. You saw this in the Lab 2 race
> game: while the code was inside a delay, flashing the countdown, it could
> not watch the buttons.
>
> [beat]
>
> So we want to separate keeping time from doing work. Let hardware count the
> milliseconds. Let the CPU work. And give the hardware a way to say "now."

## Slide 3 — A circuit that counts (1:00–2:00)

> This is the core of Timer 14 — one of five timers on your microcontroller —
> redrawn from the chip's own block diagram.
>
> The blue path is the clock coming in: the same 12 megahertz that runs
> everything. The prescaler divides it down to a counting rate you choose;
> what comes out, in red, is the counter's clock. The green box is the
> counter itself: sixteen bits, counting up, tick by tick.
>
> The orange register is the auto-reload value — the counter's upper limit.
> The counter climbs to it, wraps back to zero, and signals what's called an
> update event. That update event is what everything on Thursday builds on.
>
> Rate, times count, equals period. That's the whole mechanism. In class
> you'll pick those two numbers yourselves.

## Slide 4 — Normal program execution (2:00–2:30)

> Now, interrupts. To understand them, start with what the processor does
> normally. The program counter points at the next instruction in flash.
> That instruction is fetched, decoded, and executed; the program counter
> advances; repeat. Everything your programs have done so far is this loop —
> one instruction after the next, in order.

## Slide 5 — The function call (2:30–3:20)

> A function call is a planned detour from that straight line. The machine
> saves what it's about to disturb onto the stack, jumps to the function,
> runs it, restores what it saved, and picks up at the very next
> instruction — as if nothing happened.
>
> The stack is what makes the round trip safe: everything needed to come
> back was saved before leaving. Keep that mechanism in mind — the next
> slide reuses it.

## Slide 6 — The interrupt (3:20–4:35)

> An interrupt uses that same mechanism, initiated by hardware.
>
> When the timer's update event fires, the CPU finishes the instruction it's
> on, saves the machine state to the stack — the same way a call would — and
> then comes the one new step: it looks up where to jump in the vector table,
> a table in flash with one entry per interrupt source. It lands in a
> function called an Interrupt Service Routine — an ISR. Your function. You
> write it.
>
> When your ISR returns, the saved state is restored and the interrupted code
> continues, completely unaware. And this can happen between any two
> instructions. Even in the middle of delay_ms. Your main program no longer
> watches for anything — the hardware watches, your ISR responds, main works.
>
> One naming caution: you've been using I-S-R for a peripheral's Interrupt
> and Status Register — USART2 arrow ISR. Same acronym, different thing.
> This ISR is a function. In class I'll usually say "handler."

## Slide 7 — The referee (4:35–5:20)

> One more piece: the NVIC — the Nested Vectored Interrupt Controller. It
> sits between every interrupt source on the chip and the CPU.
>
> Two jobs matter to us. First: every source has an enable switch inside the
> NVIC, and they're all off by default. Nothing on this chip can interrupt
> you until you allow it. Second: if two requests arrive together, the NVIC
> serves the higher-priority one first — and in this course we leave every
> priority at its default.
>
> So on Thursday, arming the timer interrupt takes exactly two switches: one
> in the timer, one in the NVIC.

## Slide 8 — Three rules for an ISR (5:20–6:05)

> The function itself has three rules, all consequences of hardware being the
> caller.
>
> One: the name is fixed and must be exact — the vector table is wired up by
> name when your project builds. There's no call anywhere that registers your
> function, no arguments, no return value.
>
> Two: get in and get out. While your ISR runs, main is stopped and other
> interrupts wait. No printf, no delay_ms, ever.
>
> Three: do the minimum. Usually: set a flag, leave, and let main do the slow
> work when it notices. That flag comes with one catch —
>
> [advance]

## Slide 9 — The volatile catch (6:05–6:50)

> — C is a compiled language, and the compiler is allowed to rewrite your
> code into anything that behaves the same for everything it can see. Here's
> the thing: the compiler compiles your ISR too — but nothing in the program
> ever calls it. Hardware calls it. So when the optimizer builds main, where
> nothing ever sets the flag, it has no reason to think the flag can change.
> It may read it once and assume zero forever.
>
> The keyword volatile on the declaration forbids that assumption: fetch this
> variable fresh from memory, every single use.
>
> The rule: every variable an ISR shares with the rest of the program is
> volatile. Always.

## Slide 10 — Bring to class (6:50–7:05)

> That's it. A timer is rate times count. An interrupt is a function call
> initiated by hardware. Your ISR: exact name, quick, volatile on anything
> shared. The pre-class questions cover the reading and this video — and on
> Thursday we build the whole thing: Blinky with no delay_ms anywhere. See
> you there.

---

## Recording notes

- The deck's figures live in the book's Reference section, so the video and
  the written version cannot drift apart — edit the book, rebuild, and the
  deck follows.
- If you'd rather record over your own PowerPoint, this script maps onto
  old-deck slides 4/5 (counter), 30 (normal execution), 31 (function call),
  32 (interrupt), 35 (NVIC), 41 (ISR rules), 45 (volatile).
- After recording: post the video with the reading. The Canvas pre-class
  quiz stays as is — its five questions are answerable from reading + video
  (Q3/Q5 are video content).
