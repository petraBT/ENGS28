# Day 17 — Bluetooth Low Energy, then project work time

**Class length: Tuesday, 110 minutes** (odd day = Tuesday 110, from
CLAUDE.md's standing facts).

**Reading (`ch-ble` Before Class):** what BLE is and what it is for
(classic vs BLE, her slide 6); the three connection modes and which one
we use (slide 7); central and peripheral, client and server (slide 8);
GAP, advertising and connecting (slide 9 — UUID glossed inline at first
use, Gate 1 firstgen 2); GATT, services and characteristics (slide 10,
written GATT); the message-board takeaway (slide 11); the Bluefruit as a
UART bridge with its two modes and its built-in LED, useful for
debugging the connection state (slide 12); the module tour against the
Adafruit guide the lab links (slide 17's photo: MOD, CTS, TXO, RXI, VIN,
GND, RTS, DFU, the UART/CMD switch, VIN at 3.3 V — and her speaker
note's fact that CTS is pulled high on the module by default and must be
brought low for data to come out of TXO).  Reading questions on these
ideas only.  No register content, no pin choices, no code.

**Objectives.**  A student can: describe when BLE is the right radio and
when it is not; explain how a peripheral and a central find each other
(GAP) and exchange data (GATT services, characteristics, properties);
explain why the Bluefruit module makes the BLE stack a UART; trace a
character from CoolTerm through the passthrough program to the phone app
and back; and start Lab 9 with the documents that answer its first
deliverables named.

**The crucial step (P-2), one sentence.**  Every team leaves knowing the
radio bring-up path: USART1 with hardware flow control, the pins chosen
by them from the datasheet's AF tables, a driver that mimics their USART2
driver, and `passthrough.c` as the proof, before the Bluefruit is ever
wired.

**The stretch (P-3).**  Lab 9's own: the interrupt-driven driver (the
fifth point of Deliverable 3) and the richness of the team's command
language.  Nothing invented.

**The datasheet moment (P-11).**  Her slide 13, verbatim in spirit: the
Reference Manual's USART chapter (RM0490 §24.5.20 for hardware flow
control) for how CTS/RTS are enabled, and the datasheet's alternate
function mapping tables (Tables 13–18) for which pins can carry the four
USART1 signals.  The lookup is the students' — it is Deliverable 1 — so
the class names the documents and does not do the lookup.

**Parts** (announcements + settle 7 — this is a reseating to newly
assigned team tables, not a settle-in (Gate 1, logistics); close 1;
beats sum to 110):

| Part | min | Mode | What happens |
| --- | --- | --- | --- |
| — | 7 | — | title, groupings (hers — students move to assigned tables), where we are, agenda |
| 1. The Bluefruit needs USART1 | 8 | explain | her slides 12–13: the module bridges BLE to a USART; it requires USART1 and hardware flow control — glossed in plain words first (CTS and RTS are two extra wires the two sides use to say wait / go ahead, so neither sends faster than the other can take in), then RM0490 §24.5.20's fact stated plainly: with CTSE enabled, the transmitter checks CTS before every frame, and a CTS left unwired (the module pulls its side high) means transmit silently does not occur.  The RM and the AF tables answer the how, and the pin choice is Deliverable 1.  Datasheet moment.  (2 + 4 + 2) |
| 2. Your USART1 driver, and the passthrough test | 14 | explain | her slides 14–16: mimic the USART2 driver (the design idea in her words: you won't know which USART transmits first, so a non-blocking available-check for both — the pattern ch-uart's keyboard-counter already taught); `passthrough.c` projected whole with `uart2_RxAvail()`, framed as the proof of the driver before the Bluefruit is ever wired (Gate 1, anxious 2); the AD2 Protocol tab — new today, introduced by name and tied to Day 9x's decoder, in her slide-15 words (which DIO is Tx and which Rx; one character at a time because the AD2 has no hardware flow control).  (4 + 6 + 4) |
| 3. Connecting the Bluefruit, and its two modes | 16 | explain | her slides 17–22: the pin-to-signal table (the lab's crossover), 3.3 V, the app; UART mode test ("aka 'Data Mode' in Adafruit Speak" — her own bridge clause, carried); CMD mode compressed to the idea plus a pointer at Lab 9 §4.3 for the AT commands (AT+GAPDEVNAME gets its GAP parenthetical, the P-2 lifeline); the MOD pin and the startup sequence, Deliverable 5's brief, at full weight; "you are now ready to build your system."  (4 + 3 + 2 + 5 + 2) |
| 4. The final project and your paper design | 7 | explain | her slides 23–24: read the handout; Lab 9's own staging sentence at this junction ("approach the Design as a series of small incremental steps.  The following deliverables should lead you to a functioning system fairly quickly"); the paper design in her words, "evolve gradually" carried as its own sentence, due Friday 10 pm; her optional HiTA paper-design activity (Q11); kit-return line (pending Q8).  (5 + 2) |
| 5. Project work time | 57 | do | "We'll now give you some time to work on your project." — one sentence; the room works on Lab 9.  Leave the paper-design slide up. |
| — | 1 | — | close: what is due (paper design Friday; demos Thursday) |

**Coverage table against her deck** (26 slides):

| Her slide | Where |
| --- | --- |
| 1 title | deck glue |
| 2–3 groupings | deck: placeholder groupings slide, hers to fill (Q9) |
| 4 agenda | deck glue |
| 5 section BLE | deck section slide |
| 6 classic vs BLE | reading (her two columns nearly verbatim) |
| 7 connection modes | reading (her figure) |
| 8 central vs peripheral | reading (her sentences) |
| 9 GAP | reading (her four bullets; bubbles pending Q10) |
| 10 GATT ("GAAT") | reading, written GATT (Q2) |
| 11 key takeaway / message board | reading (her analogy) |
| 12 the module | Part 1 (and the reading introduces the module; the class states, once, that it requires USART1) |
| 13 USART1 + flow control | Part 1 (the datasheet moment) |
| 14 write your driver | Part 2 |
| 15 passthrough test | Part 2 |
| 16 passthrough.c | Part 2 (the one program, projected whole) |
| 17 connecting | Part 3 (the wiring table; her photo by refPage from the reading) |
| 18 connect + app | Part 3 |
| 19 UART mode | Part 3 |
| 20 CMD mode | Part 3 |
| 21 mode pin | Part 3 |
| 22 ready to build | Part 3 (her words close the briefing) |
| 23 project notes | Part 4 |
| 24 paper design | Part 4 (her words; due Friday; HiTA pointer pending Q11) |
| 25 kit return | Part 4 / close (pending Q8) |
| 26 work time | Part 5, one sentence |

**Additions beyond her slides:** none in class.  The reading itself is
the one addition the chapter makes (last year slides 5–11 were lectured;
this year they are read before class, per the course's standing split),
and its reading questions.

**Hand-offs.**  In: Day 16's close named this reading; ch-uart already
plants the APB2 hand-off (its reading question at :1479–1502 tells
students USART1's clock is on RCC->APBENR2).  Out: Lab 9 §3's paper
design due Friday 10 pm (hers); demos Thursday.  The Reference section
collects the flow-control mechanism (RM0490 §24.5.20, CTSE/RTSE in
USART_CR3), the AD2 Protocol tab in her slide-15 words (students use it
unsupervised for the rest of the project), the AT-command startup timing
rules from Lab 9's "Important!" boxes, and the AF option lists — without
resolving Deliverable 1's choice.  The projected passthrough.c follows
B-14's `return 1;` pending Q5.

**Writing room / checkpoints.**  None invented: the class is a briefing
and then work time.  The instructor blocks carry (a) the AF option table
from the datasheet (for her use answering teams), (b) the known Nucleo
pin conflicts, (c) the CCRDY-style trap of this week: a driver that
enables CTSE with the CTS pin left unwired blocks on transmit (CTS is
pulled high on the module side — grounded means clear to send).

**Cut order.**  Part 3's CMD-mode beat compresses to a pointer at Lab 9
§4.3; then the mode-pin beat the same way; Part 5 is never cut.
