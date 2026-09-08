# Week 9 ground truth — Days 17, 17x, 18

Step 0 for the final week of classes.  Day 17 (Tuesday, 110 min, with a
pre-class reading): BLE and the Bluefruit module, then project work time.
Day 17x (Wednesday x-hour, 50 min, no reading): a project work session by
default, with the sleep-modes lesson built as an optional unit the
instructor may choose to run.  Day 18 (Thursday, 110 min): project demos
and the wrap-up; no chapter, deck only.  Petra, in the Week 9 prompt:
"Most of the time is project work time for the student teams.  On Tuesday
we introduce Bluetooth Low Energy, because the teams need it for the final
project, and then they get time to work on the project.  The x-hour had
been planned for sleep modes; last year there was no time for it and the
x-hour was project time, so build the sleep-modes material, but it may not
be used.  Thursday is project demos and the wrap-up."

Sources mined: `assets/ClassSlidesOLD/Day17-BLE.pptx` (26 slides),
`Day17x-Sleep Modes.pptx` (25 slides), `Day19-Topics.pptx` (8 slides —
**verified: it is last year's demo-day wrap-up**, not a topics survey);
`assets/Labs/Lab9B_ES28.pdf` (9 pages, read in full);
`assets/stm32c031_datasheet.pdf` Tables 13–18 (AF mappings, pasted below);
RM0490 §4.3 (PWR operating modes), §20 (IWDG), §24.5.20 (flow control),
all pasted below; `assets/images/Day05-UART/uart.c` and `uart.h` (the
USART2 driver students have and are told to mimic).

---

## 1. Day 17 — her arc, slide by slide

| # | Her slide | Disposition |
| --- | --- | --- |
| 1 | Title, Day 17 | glue |
| 2–3 | Final Project Student Groupings; the table of names ("Please sit at your assigned table.") | hers, this year's names are hers to project; not book content (staffing/admin). Deck: ask whether she wants a groupings placeholder slide |
| 4 | Agenda: Introduction to BLE; Final Project Work | glue |
| 5 | Section: Bluetooth Low Energy (BLE) | section slide |
| 6 | "Bluetooth Classic" vs. "BLE" — two columns: Continuous data streaming / Audio / Higher data rates / Longer connection times / Higher power / "Stay connected and stream a lot." vs Tiny bursts of data / Sensors / Battery-powered / Very low energy / "Wake up → send small data → go back to sleep." | **reading** (concepts, no hardware): her two columns nearly verbatim |
| 7 | BLE Connection Modes: Point-to-Point (Central ↔ Peripheral, two-way, structured data, most common, "What we will use!"); Broadcast (one-way, ex: fitness sensors); Mesh (many↔many, ex: greenhouse monitoring) | **reading**; her three-column image `slide07_9b1c8200.png` |
| 8 | Central vs. Peripheral: Central = your phone, "Client" in BLE speak, initiates and requests; Peripheral = Adafruit Bluefruit BLE, "Server" in BLE speak (stores the data, services, characteristics the client reads, writes, subscribes to) | **reading**, her sentences |
| 9 | How a Connection is Made (GAP): GAP = Generic Access Profile; advertising packet with name, services, UUID; central scans and decides; once connected the peripheral stops advertising and is invisible to others until the connection is broken.  Speech bubbles: "Helllllloooooooo! I have data from my ENGS 28 team's final project…" / "Found your service: Let's talk!…" | **reading**, her four bullets nearly verbatim; the speech-bubble joke is hers — ask if she wants it carried |
| 10 | How Communication Happens — titled "GAAT Protocol", body "GAAT = Generic Attribute Profile" | **reading**.  **Her deck writes "GAAT"; the profile is GATT (Generic ATTribute profile).  The book writes GATT** — flagged in questions.  Her hierarchy example (Team 15 device → service "ENGS 28 Super Cool Final Project" → characteristics Temperature (read, 72 °F) / Motor speed (write, 65 rpm)); Service = category of functionality, Characteristic = one piece of data, Value = the actual data, Properties = read, write, notify |
| 11 | Key Takeaway: peripheral wakes, advertises, announces services & characteristics, each characteristic defines its rules.  Analogy: message board — peripheral pins a note, central occasionally checks, no constant conversation | **reading**, her analogy (her cork-board image) |
| 12 | Adafruit Bluefruit LE UART Friend: connects via USART; two operating modes (Command mode: AT+…; Data/transparent mode: streams raw data); built-in LED useful for debugging connection state.  Callouts: "USART1", "I can offer a USART service!", "Let me subscribe to the UART service!", "USART Passthrough", Outcome: "Nucleo and phone can talk to each other as if they had a direct USART connection.", "Adafruit Bluefruit LE Connect App" | **reading** (the module as a UART bridge) |
| 13 | Using the USART1 and Hardware Flow Control: the Bluefruit requires USART1 and hardware flow control; read the details of USART1 in the reference manual; examine the AF mappings in the product data sheet; **you will decide which physical pins to use for the 4 USART1 signals** | **in-class** — this is Lab 9's prelab in her words.  The pin choice is Deliverable 1: the book must not answer it |
| 14 | Write your USART1 driver: start with USART2_init() and modify; enable hardware flow control; mimic the USART2 driver; you won't know which USART transmits first, so devise a way to check for characters without blocking; do not use the existing read function unless you know a byte is waiting | **in-class**, her words (this is Deliverable 3's brief) |
| 15 | Test your USART1 via Passthrough: CoolTerm → USART2_Rx → program → USART1_Tx → AD2 observes on its Rx DIO (Waveforms "Protocol" tab); AD2 sends → USART1_Rx → USART2_Tx → CoolTerm; send 1 character at a time because the AD2 does not support hardware flow control | **in-class**, her words |
| 16 | `passthrough.c` complete listing + `uart2_RxAvail()` beside it | **the one program** — recovered verbatim below |
| 17 | Connecting the Bluefruit to your Nucleo: Power (VIN: use 3.3V; GND), Other (MOD: mode selection), UART (TXO Bluefruit→MCU; RXI MCU→Bluefruit; CTS into the breakout MCU→Bluefruit; RTS out of the module Bluefruit→MCU).  Speaker note (Adafruit's text): TXO 3.3 V logic; RXI level-shifted 3–5 V; CTS pulled high by default and must be grounded to enable data out; RTS low when fine to send, at 9600 baud not usually needed | **in-class / reading tour**; image `slide17_bca63e06.png` = flat Bluefruit photo, silkscreen pin names legible |
| 18 | Connect your Bluefruit to your Nucleo. + Install the Adafruit Bluefruit LE Connect App on your phone. | **in-class**, one step |
| 19 | Test UART Mode (aka "Data Mode" in Adafruit Speak): switch to "UART"; run passthrough; app filter "Must have UART Service"; connect; UART tab; characters typed appear on CoolTerm and vice versa; if you can't find your device, go where fewer ES28 students are, or name it via Command Mode.  Note: sort by signal strength | **in-class**, her steps |
| 20 | CMD (Command) Mode: slide the switch to CMD; AT commands; keep running passthrough; ATZ (soft reset, restarts the bluetooth stack), AT+FACTORYRESET ("The big hammer."), AT+GAPDEVNAME (name your device; ATZ after so it advertises the change; note: AT+GAPDEVNAME=chosenName); passthrough shows "OK" / "Error" | **in-class**, her steps |
| 21 | Switching Modes via Mode Pin: "You wouldn't want to keep sliding that little switch by hand…"; GPIO → MOD pin; high = CMD, low = UART; initialize the GPIO (as what kind of pin?); BLE startup sequence: CMD → factory reset → assign name → soft reset → UART → idle; consider its own file/function | **in-class** — Deliverable 5's brief; the answer (the code) is the students' work |
| 22 | You are now ready to build your system!  System behaves normally with no device connected; when one connects it receives data and responds to commands; assume the device comes and goes; the main loop must not depend on any state of the Bluetooth system | **in-class**, her words (= Lab 9 §4.5) |
| 23 | A Few Notes on the Final Project: read the description, ask questions, start the paper design, submit by Friday 10pm | hers (deadline is hers to state) — deck close |
| 24 | Paper Design: do not start coding until you have a plan; block diagram / high-level pseudocode / state machine; which timers, which interrupts, which components; a listing of all IO and how you use it; pseudocode high-level and abstract, "Do not write C!"; non-obvious things annotated; evolve gradually.  Callouts: due FRIDAY; optional HiTA activity | **in-class** (= Lab 9 §3 paper design, in her words) |
| 25 | Lab Kits Return on Tuesday: bring EVERYTHING back Tuesday after class | hers — deck close (admin) |
| 26 | Project Work Time! | the work-time sentence |

**Wording worth carrying verbatim:** "Wake up → send small data → go back
to sleep."; "Called 'Client' in BLE speak" / "Called 'Server' in BLE
speak"; "As soon as a connection is established, the peripheral will stop
advertising itself and other devices will no longer be able to see it or
connect to it until the existing connection is broken"; the message-board
analogy; "Nucleo and phone can talk to each other as if they had a direct
USART connection"; "In the final system, you won't know which USART will
transmit first, so you must devise a way to determine if there are any
characters in the receive data register.  Do not use the existing read
function unless you already know there is a byte waiting, otherwise, you
may block indefinitely."; "The big hammer."; "You wouldn't want to keep
sliding that little switch by hand…"; "make sure that your main loop does
not depend on any particular state of the Bluetooth system."

## 1a. Day 17x — her arc, slide by slide

Agenda (slide 2): Sleep modes / Watchdog timer; Other popular
microcontrollers; Project work time.  So her x-hour was three taught
segments and then work time.  This year the default is the work session;
the taught unit is built and marked optional.

| # | Her slide | Disposition |
| --- | --- | --- |
| 3 | Section: Power Management (Sleep Modes) — "Reference Manual, Ch 4" | ✓ RM0490 ch 4 is Power control (PWR) |
| 4 | Where does the power go?  Static (leakage) vs dynamic (charging the capacitance at each switch); dynamic ∝ clock frequency; 5–50 µW/MHz for the Cortex-M0+ core; the right sleep modes + turn off unneeded peripherals; the deeper the sleep the longer the restore | optional unit, her bullets |
| 5 | Saving Power: enable only the peripherals you use, disable when done; lowest clock speed you can; let the processor sleep; look at the datasheets of all components; "For low power consumption, disable anything you don't need." | optional unit |
| 6 | Power Saving Modes on the STM32C0 — ST's arrows figure: RUN at 48 MHz 58 µA/MHz; SLEEP at 16 MHz 20 µA/MHz (10 cycles); STOP 80 µA (5.9 µs); STANDBY 7.45 µA (23 µs); SHUTDOWN 19 nA (385 µs); Typ @ VDD = 3 V @ 25 °C | figure, raw |
| 7 | Clock distribution in the STM32C0: "Lots of different clock domains… Stopping a clock disables the corresponding domain."  Callout "/8" over the figure.  Speaker note: "HSI48 … divided down by 8 by upon reset. 'Our clock'." | figure raw.  **The /8 is wrong: HSIDIV reset is 010 = divide by four → 12 MHz** (RM0490 Table 21 note 5 and §4.3.2 "sets its prescaler division factor to four (HSIDIV[2:0] = 010)"; `uart.c`'s own comment says factor 4).  The book says divide-by-4 |
| 8 | Power Control: Operating Modes — RM Figure 7, the transit diagram (any low-power mode ↔ Run only) | figure (RM screenshot) |
| 9 | Device resources available in each operating mode — RM Table 19 screenshot | figure (RM screenshot); the RM table is pasted in §3 below |
| 10 | Sleep / Stop / Standby / Shutdown, four boxes of bullets | optional unit — her bullets match RM §4.3.2 nearly verbatim (checked; all four hold up) |
| 11 | Entering low-power modes.  WFI = wait for interrupt, WFE = wait for event — RM Table 20 screenshot | figure (RM screenshot) |
| 12 | PWR control register 1 (PWR_CR1): "The selection of the low-power mode to enter is determined by the SLEEPDEEP and LPMS[2:0] bitfields."  Callouts: System Control Register (SCR); Table 4-14 in cortex m0+ generic user guide; Table 20 in reference manual | ✓ Table 20 = Low-power mode entry overview (pasted below) |
| 13 | Programming a sleep mode: set LPMS, set SLEEPDEEP, execute WFI/WFE.  Code: `PWR->CR1 \|= (PWR_CR1_LPMS_0 \| PWR_CR1_LPMS_1); //stop mode` then `SCB->SCR \|= SCB_SCR_SLEEPDEEP_Msk;` then `__WFI();`.  Wake: interrupt occurs, reset LPMS and SLEEPDEEP, get back to work | **ERRATUM: LPMS = 0b011 with SLEEPDEEP = 1 enters STANDBY, not Stop** (RM0490 Table 20: Stop = 000, Standby = 011).  For Stop mode LPMS keeps its reset value 000 and only SLEEPDEEP is set.  Flagged in questions; the book teaches the RM's table |
| 14 | Processing loop with sleep: init, while(1) { check flags, act, `__WFI()`; }, ISRs (at least one that awakens the processor!) | optional unit, the loop pattern |
| 15 | Section: Watchdogs — "Reference Manual: Section 20: Independent watchdog (IWDG), Section 21: System window watchdog (WWDG)" | ✓ both section numbers verified |
| 16 | What does the watchdog do?  IWDG: 32 kHz internal clock independent of the main clock; 12-bit downcounter, 8-bit prescaler; a healthy program resets it often ("pet the dog"); if the program gets stuck it times out and resets the processor.  Window option; the WWDG exists and is more flexible.  Image: her sleeping puppy photo | optional unit; the puppy is hers |
| 17 | A Quick Example: copy TemplateProject → "Watchdog"; download watchdog.c from Canvas; "Hello dog world" repeats every 4 seconds; press the blue user button more/less frequently than every 4 s | optional unit's hands-on |
| 18 | A Quick Example (what actually happens): the message prints at the very start, before the event loop, so seeing it repeat means the device is rebooting; pressing the button pets the watchdog | the reveal, her words |
| 19 | The Independent Watchdog (IWDG): unlock (0x0000 5555 → IWDG_KR), prescaler (IWDG_PR), reload (IWDG_RLR), start (0x0000 CCCC), counts down from reset value, reset at 0x000; pet (0x0000 AAAA reloads); once running it cannot be stopped | optional unit — all verified against RM0490 §20.3/§20.4 (pasted below) |
| 20 | `watchdog.c` complete listing | recovered verbatim below |
| 21 | Super Quick Modification: make the dog need a pet every 1 second; add a printf() after init but before the loop; "How needy can you make it before it resets too fast to even print your message?"  Image: another dog photo | optional unit's stretch |
| 22–25 | Choosing a microcontroller / Beyond the Arduino / Make: magazine's guide / Microcontroller "ecosystems" | **scope question**: run as part of the optional unit, move to Day 18's wrap-up, or drop.  Rich speaker notes exist on 23 and 25 |

## 1b. Day 19 (last year) — the wrap-up arc

1 title · 2 agenda (Project Presentations; Wrapping up the course) ·
3–4 Share Projects! — "One project partner stays at their table, the other
walks around to look at other projects.  Each person gets to vote on:
Most Creative System (1x12), Cleverest Device Name (2x4), Best use of
Adafruit App (1x4), Best Overall Solution (2x2)" · 5 Wrapping up ·
6 Review: Engs 28 learning objectives (the eight objectives; speaker note
"YOU DID ALL THESE THINGS!!!") · 7 Where to go from here? (the course
list with her per-course speaker notes) · 8 Last things to do (return
your kit to Tad after demo; return the Bluefruit device to Tad; complete
the College's course evaluation; "Thank you for a great term!!!").

This year Day 18 is that day.  Day 17's slide 25 says kits return
**Tuesday** while Day 19's slide 8 says return the kit **after demo** —
last year had a Day 19 after the kit return; this year demos are Thursday.
Which return day is right this year is hers to say (question 8).

## 2. The real code

### passthrough.c (Day 17 slide 16, verbatim; the one program Day 17 teaches)

```c
/* passthrough.c */

#include <stdio.h>
#include "uart.h"
#include "uart1.h"
#include "ES28.h"

int uart2_RxAvail(void);

int main(void) {
	uart1_init();
	uart2_init();
	printf("UART1-2 passthrough test.\r\n");
	while (1) {
		if (uart1_RxAvail()) {
			int c = uart1_read();
			uart2_write(c);
		}
		if (uart2_RxAvail()) {
			int c = uart2_read();
			uart1_write(c);
		}
	}
	return 0;
}
```

Beside it on the slide:

```c
int uart2_RxAvail(void) {
	if (USART2->ISR & USART_ISR_RXNE_RXFNE) {
		return 1;
	} else {
		return 0;
	}
}
```

Notes.  `uart1.h` is the student's own USART1 driver (Deliverable 3) —
`uart1_init/read/write/RxAvail` do not exist until they write them, which
is the point of the program.  `uart2_RxAvail()` is given (the lab requires
a non-blocking check for **both** USARTs; this one is the model to mimic).
Her listing ends `return 0;` where the course convention (B-14) is
`return 1;` — question 5.  Neither file is in `assets/starters/`;
the listing above is from her code slide (the licensed source).  Ask for
the real files for `assets/starters/` (question 4).

### watchdog.c (Day 17x slide 20, verbatim; the Canvas download)

```c
#include "ES28.h"
#include "uart.h"
#include <stdio.h>
// A few magic numbers for the watchdog (from the datasheet)
#define KEY_ACCESS 0x00005555
#define KEY_UPDATE 0x0000AAAA
#define KEY_START  0x0000CCCC
int main( void ) {
	uart2_init();
	printf( "Hello dog world\r\n");
	// Use the built-in blue user button as a proxy for petting the dog.
	RCC->IOPENR |= RCC_IOPENR_GPIOCEN;
	GPIOC->MODER = (GPIOC->MODER & ~GPIO_MODER_MODE13_Msk) | (GPIO_INPUT << GPIO_MODER_MODE13_Pos);
	// The watchdog is always accessible, so no need to turn any clocks on for it.
	// First, unlock the watchdog registers by writing a special value to the key register
	IWDG->KR = KEY_ACCESS;
	// Set up the prescaler - the watchdog clock runs at 32KHz.  We'll set up a 1ms tick.
	while( IWDG->SR & IWDG_SR_PVU ); // Can only update when the PVU status bit is clear.
	IWDG->PR = 0b011;
	// Reload register is set to 4000: we need to pet the dog at least once every 4 secs
	while( IWDG->SR & IWDG_SR_RVU ); // Can only update when the RVU status bit is clear
	IWDG->RLR = 4000;
	// Wake the dog...
	IWDG->KR = KEY_START;
	// Now, loop and pet the dog whenever the blue user button is pushed.
	while(1){
		if ( (GPIOC->IDR & GPIO_IDR_ID13) == 0 ){
			// Pet the dog
			IWDG->KR = KEY_UPDATE;
			printf( "Nice Doggy\r\n");
			delay_ms(100);  // be nice to the terminal.
		}
	}
}
```

Verified against RM0490 §20: keys 0x5555 / 0xAAAA / 0xCCCC ✓; PVU/RVU
waits ✓ (§20.4.2/3 notes); PR = 0b011 = divider /32, and LSI ≈ 32 kHz →
≈1 ms tick ✓; RLR = 4000 → ≈4 s ✓; once running it cannot be stopped ✓
(§20.3.2).  PC13 active-low button ✓.  Not in `assets/starters/` — ask
for the file (question 4).  (No `return`, and `main` is `int`: B-14
would add `return 1;` at the end — same question 5.)

### The sleep snippets (Day 17x slides 13–14)

Her slide 13 fragment, with the LPMS erratum noted in §1a:

```c
#include <ES28.h>
PWR->CR1 |= (PWR_CR1_LPMS_0 | PWR_CR1_LPMS_1); // her comment: stop mode — actually Standby per RM Table 20
SCB->SCR |= SCB_SCR_SLEEPDEEP_Msk;
__WFI();
```

For plain Sleep mode nothing is written at all: SLEEPDEEP stays 0 and
`__WFI()` alone enters Sleep (Table 20's first row).  Her slide 14 loop:

```c
int main(void) {
    // Initialize devices, enable interrupts
    while (1) {
        // Check interrupt flags, take action
        __WFI();   // Go to sleep, await the next interrupt
        // When CPU wakes up, execution resumes here
    }
}
// ISRs (including at least one interrupt that awakens the processor!)
```

(Her slide's comment says execution resumes "at the top of the loop";
strictly it resumes at the instruction after WFI — same thing in this
loop.  PWR needs no RCC clock enable to write PWR_CR1?  **Unverified**;
RCC_APBENR1 has a PWREN bit.  If the optional unit carries runnable
stop-mode code, this needs checking on hardware or in the RM — flagged.)

### The USART2 driver (what students mimic; assets/images/Day05-UART/uart.c)

9600 baud; 12 MHz (`SYS_FREQ 12000000U`, comment: HSI48 scaled down by a
factor 4); PA2/PA3 AF1; `BRR = round(PeriphClk/BaudRate)` = 1250;
`USART2->CR1 = USART_CR1_RE | USART_CR1_TE;` then `|= USART_CR1_UE`;
blocking `uart2_write` on TXE_TXFNF, blocking `uart2_read` on RXNE_RXFNE.
The flow-control additions for USART1 land in CR3 (CTSE, RTSE — RM0490
§24.5.20, pasted below) and the AF/pin choices are the students' own.

## 3. Datasheet and RM sections (pasted, not typed)

### STM32C031 datasheet — USART1 signals in the AF tables (Tables 13–17)

- USART1_TX: PA0 (AF4), PA9 (AF1), PB6 (AF0), PC14 (AF0)
- USART1_RX: PA1 (AF4), PA8 (AF14), PA10 (AF1), PB2 (AF0), PB7 (AF0)
- USART1_CTS: PA11 (AF1), PB4 (AF4), PB6 (AF5)
- USART1_RTS_DE_CK: PA12 (AF1), PA14 (AF12), PA15 (AF4), PB3 (AF4), PB6 (AF4)

(Table 12, *Pin assignment and description*, lists the pins; the AF
numbers are in Tables 13–18, *Port x alternate function mapping* — same
split Day 15 recorded.)  Known Nucleo conflicts a team must dodge: PA2/PA3
are USART2 to the ST-LINK VCP; PA5 is the user LED; PC13 the button;
PC14/PC15 the LSE oscillator pads; PB6/PB7 were the Day 9x/10 I2C bus
only if the team's project uses the display on I2C1 (PB8/PB9 is what the
book taught — verify per team).  The choice itself is Lab 9 Deliverable 1
(2 pts) — **protected**; the instructor block may carry the table above,
student-facing text may not resolve it.

### RM0490 §24.5.20 — RS232 Hardware flow control (p. 702)

"RS232 RTS and CTS flow control can be enabled independently by writing
the RTSE and CTSE bits to '1' in the USART_CR3 register."  RTS: "If the
RTS flow control is enabled (RTSE = 1), then RTS is deasserted (tied low)
as long as the USART receiver is ready to receive a new data.  When the
receive register is full, RTS is asserted…"  CTS: "If the CTS flow
control is enabled (CTSE = 1), then the transmitter checks the CTS input
before transmitting the next frame.  If CTS is deasserted (tied low),
then the next data is transmitted… else the transmission does not occur."
Figure 263 shows the crossover: one device's RTS to the other's CTS.

### RM0490 §4.3 — Operating modes (pp. 84–89)

§4.3: "Sleep, Stop, Standby, and Shutdown low-power modes are available…
While the Sleep mode offers the highest agility at cost of the least
power saving, the Shutdown mode provides the lowest power consumption at
cost of slower wakeup and absence of power supply monitoring and
BOR/PDR."  Transit only via Run mode (Figure 7).  Table 19: Device
resources enabled in different operating modes (USART1 has wakeup
capability in Stop; USART2 does not; IWDG runs in Stop and Standby;
SysTick stops outside Run/Sleep).  §4.3.2 mode summaries (her slide 10
matches).  "The selection of the low-power mode to enter is determined by
the SLEEPDEEP and LPMS[2:0] bitfields."  **Table 20, Low-power mode entry
overview: Sleep = SLEEPDEEP 0; Stop = SLEEPDEEP 1, LPMS 000; Standby =
SLEEPDEEP 1, LPMS 011; Shutdown = SLEEPDEEP 1, LPMS 1XX.**  Table 21:
exiting Standby/Shutdown restarts HSI48 with HSIDIV[2:0] = 010 =
divide-by-four (the 12 MHz).  PWR_CR1 reset value 0x0000 0208 (LPMS
reset = 000).

### RM0490 §20 — IWDG (pp. 546–553)

"clocked by its own dedicated low-speed clock (LSI) and thus stays active
even if the main clock fails."  Block diagram: LSI (32 kHz), 8-bit
prescaler, 12-bit downcounter, KR/PR/RLR/SR/WINR.  Start: write
0x0000 CCCC to IWDG_KR; counts down from 0xFFF; reset at 0x000.  Reload:
0x0000 AAAA reloads RLR.  Access: 0x0000 5555 unlocks PR/RLR/WINR.
"Once running, the IWDG cannot be stopped."  §20.4.2 PR[2:0]: 000 = /4 …
011 = /32 … 110/111 = /256; PVU must be clear to change.  §20.4.3 RLR:
RVU must be clear to change.  WWDG is §21.

### Bluefruit (Adafruit guide, linked from Lab 9)

Guide: https://learn.adafruit.com/introducing-the-adafruit-bluefruit-le-uart-friend
(the lab's prelab points there, "the discussion of the pinout on page 2";
data mode and command mode pages linked from Lab 9 §4.2/§4.3).  Pins on
the board's silkscreen (her slide 17 photo): MOD, CTS, TXO, RXI, VIN,
GND, RTS, DFU, and the UART/CMD switch.  Her slide 17: VIN "use 3.3V".
The module is a Nordic nRF51-based board (MDBT40 module visible in the
photo); 9600 baud default.  Her speaker note (Adafruit's text): CTS is
pulled high by default and must be grounded to enable data out of TXO.
No PDF of the guide is hosted in `assets/` — question 3.

## 4. Lab 9 end to end (`assets/Labs/Lab9B_ES28.pdf`, W26)

"Lab 9 — Final Project - Bluetooth", due Tuesday March 10, 2026, 2:15 PM.
Teams of two.  The goal: a system with local control that also exchanges
enough information with a Bluetooth partner that the partner can effect
the same control.  Requirements: at least 2 sensors, at least 2
actuators, a unique device name, a "language" with at least one
phone-to-system command with an observable result and at least one
periodically updated piece of information visible on the phone.

**The protected deliverables list (nothing below is answered in any
student-facing target):**

1. **AF Settings for USART1 (2 pts)** — fill in the lab's Table 1 (pins,
   AF numbers, Bluefruit pin) — so the book never names a USART1 pin
   choice.
2. **Paper Design (5 pts)** — schematic, pin listing, software plan with
   pseudocode.  Due Friday 10 pm per her slides 23–24.
3. **USART1 driver (5 pts)** — mimic the USART2 driver, flow control
   enabled, plus a non-blocking available-check for both USARTs; 4 pts
   for a working polled driver, the 5th for interrupts.
4. **CMD Mode (3 pts)** — CoolTerm screenshot with AT+FACTORYRESET,
   AT+GAPDEVNAME, ATZ and responses.
5. **BLE startup (5 pts)** — the GPIO-driven MOD sequence: CMD mode,
   factory reset, name, soft reset, back to UART mode.  The lab's two
   tricky items: wait a few ms after a command, watch for characters
   until none for 10–20 ms; then wait another 200 ms before the next
   command.
6. **Demo! (5 pts)** — last day of class; the six checkboxes: explain
   what it does; ≥2 actuators; ≥2 sensors; functions with no central
   connected; can be connected to; the BT interface works as expected.
7. **Reflection (3 pts)** — challenges, division of labor, own
   contributions.

Wiring table from §4.2 (the crossover is the lab's, students still pick
the Nucleo pins): Bluefruit RXI ← USART1 TX; TXO → USART1 RX; RTS →
USART1 CTS; CTS ← USART1 RTS; VIN = 3V3; GND = GND.

What Day 17 must have taught by the time teams start: what BLE is at the
GAP/GATT level (reading), the module as a UART bridge (reading), USART1 +
flow control existing in the RM and the AF choice being theirs (pointer),
the passthrough program and the AD2 protocol-tab test (the one taught
program), UART vs CMD mode and the AT commands, the MOD pin idea, and the
paper-design instruction.  Day 18's demo needs the Deliverable 6
checkboxes projected (and whatever schedule she wants).

## 5. Continuity

- The UART chapter (`ch-uart.ptx`, Day 5) taught USART2, the driver
  above, CoolTerm, and printf retargeting; "the second USART" and the AF
  mechanism (MODER alternate mode + AFR) are known ground.  BRR = clock /
  baud is known.
- The AD2's Protocol tab is new (Waveforms was scope + voltmeter + wavegen
  so far — check ch-uart for any protocol-tab mention before claiming
  new).
- `milliseconds()`/SysTick from the motor chapter; EXTI from Day 9;
  TemplateProject copying is routine.
- Day 16's deck close already tells students there is a pre-class reading
  for Tuesday: that reading is `ch-ble`'s Before Class section.
- Nothing downstream consumes ch-ble or ch-power: this is the last week.
  The only consumer is the project itself (Lab 9).

## 6. Figure manifest

Day 17 (`assets/images/Day17-BLE/`; hash-named = pptx_annotate composite,
imgN = raw media):

| Her slide | File | Decision |
| --- | --- | --- |
| 6 (classic vs BLE) | slide06_img1.png (headphones), slide06_img2.png (wearable) | use raw pair in the reading beside her two columns, small, side by side |
| 7 (connection modes) | slide07_9b1c8200.png (= img1) | use: clean three-topology diagram (point-to-point / broadcast / mesh), no annotations lost |
| 8 (central/peripheral) | slide08_31c95fb6.png (composite: the Central-and-devices icon art); slide08_img2.png (Bluefruit product photo); slide08_img3.png (phone icon) | use the central icon art in the reading; the Bluefruit photo appears once (slide 12's row below) |
| 9 (GAP) | slide09_img1.png (Bluefruit photo again), img2 (phone) | the speech-bubble composite was not rebuilt; the bubbles are her joke text — carry in prose or ask; no figure needed |
| 11 (message board) | slide11_6e110f71.png (cork board clip art) | use in the reading beside the analogy if wanted; decorative — default: use, small |
| 12 (module intro) | slide12_8534a837.png (composite = **Nucleo board photo, wrong picture**); slide12_img2 (Bluefruit photo), img3 (phone), img4 (app screenshot?) | do NOT use the composite; use slide08_img2 (Bluefruit photo) in the reading |
| 17 (pinout) | slide17_bca63e06.png (flat Bluefruit photo, silkscreen pin names legible: MOD CTS TXO RXI VIN GND RTS DFU + UART/CMD switch) | **the reading's datasheet-tour figure** — use whole |
| 18 (wiring photo) | slide18_img1.png (75 kB) | look before use: likely her wiring photo of Bluefruit on breadboard — candidate for the in-class connect step |
| 19 | slide19_img1.png = same as slide 17's photo | ref the one figure (Rule 8: never draw twice) |
| 24 (paper design) | slide24_b49fb152.png (composite) | likely a paper-design example sheet; look before use; candidate for the in-class paper-design slide |

Day 17x (`assets/images/Day17x-Sleep Modes/` = composites,
`Day17x-Sleep_Modes/` = raw):

| Her slide | File | Decision |
| --- | --- | --- |
| 6 | slide06_93e11c9e.png — ST's five-arrow mode/current figure (RUN 58 µA/MHz … SHUTDOWN 19 nA, wake-up times) | use whole in the optional unit |
| 7 | slide07_76300c6f.png — clock distribution tree | use; **drop her "/8" callout** (wrong; see §1a) — the raw img has no callout, use raw |
| 8 | slide08_b3bf8fe4.png — RM Figure 7 transit diagram | use |
| 9 | slide09_5eaa08d5.png — RM Table 19 screenshot | use (or re-set as a small PreTeXt table; decide at Step 3) |
| 11 | slide11_04e7f671.png — RM Table 20 screenshot | use: it is the entry-mode table the code reads from |
| 12 | slide12_075c21ef.png + slide12_92ad53d0.png (+2 raw) — PWR_CR1 and SCB_SCR register screenshots | look at all four at Step 3; carry the two register fields the code writes |
| 16 | slide16_64c824a1.png — her sleeping puppy photo | hers, the joke; use on the watchdog slide |
| 21 | slide21_8bf192e3.png — another dog photo | hers; use on the stretch slide if room |

Day 19 (`assets/images/Day19-Topics/`): slide04 imgs 1–4 = the four vote
icons.  Reuse on the Day 18 share-projects slide if she keeps the votes.

## 7. What survives of the placeholders

**`ch-ble.ptx`:** the reading's four-subsection shape (what BLE is / GAP /
GATT / why a module) roughly matches her slides 6–12 and survives as an
outline; the figure choices for slides 7 and 17 coincide.  Nothing else:
the invented `usart1_ble_init()` on PA9/PA10 without flow control both
contradicts the lab (flow control is required; the pin choice is
Deliverable 1) and answers a graded deliverable; the "Lab: Wireless
Sensor Readout" section is an invented lab; the Canvas quiz block, the
"BLE Protocol Overview"/"Bluefruit"/"USART1" sections duplicating the
reading, the rq answer claiming "the Bluefruit module just needs any
UART; the choice of USART1 is a software design decision" (the lab says
the Bluefruit device requires the use of USART1), "advertising … about
ten times per second" (unsourced), "VIN 3.3–16 V" (her slide says use
3.3 V), and the GATT UUID figure caption details are all condemned.

**`ch-power.ptx`:** condemned whole as structure — it has a Before Class
reading and an x-day has none.  The topic sequence (why power / modes /
WFI / IWDG) matches her deck and survives as an outline for the optional
unit.  Its `iwdg_init()` differs from her watchdog.c (no PVU/RVU waits,
reload before start, "~1 s" numbers) — her file is the code.  Its
"58 µA/MHz in Run" figure caption matches her ST figure; its invented
current claims ("Run ~5 mA, Sleep ~1 mA, Stop ~5 µA"), "HSI 16 MHz
internal RC" (the C0 has HSI48), "LPMS = 0b001 selects Stop 0" (Table 20
says Stop = 000), and the FLASHPD/mode-spectrum caption inventions are
condemned.  The reading questions and their answer keys are unverified
invention throughout both files: none survive.

## 8. Reuse traps

- Day 17 slide 10 writes "GAAT" twice; the book writes GATT (question 2).
- Day 17x slide 13's LPMS code enters Standby, not Stop (question 6).
- Her slide 7 "/8" callout and note vs the RM's divide-by-four (§1a):
  drop the callout.
- The groupings slide (17/3) is this year's roster: hers, not ours.
- Day 17 slide 22's speaker note is "3*4 = 12" (private arithmetic);
  ignore.
- `pptx_mine.py` drops tables, but no Day 17/17x/19 slide depends on a
  dropped table (checked the thin-looking ones against slide XML sizes;
  the only tables in play are RM screenshots, which are images).
- The composite for Day 17 slide 12 picked the wrong picture (Nucleo, not
  Bluefruit) — known one-picture-per-slide trap; use the raw photo.

## 9. Questions for Petra (2026-09-08)

1. **Day 17x scope.**  The optional sleep-modes unit: sleep modes only, or
   also the watchdog demo (your slides 15–21, watchdog.c), or also
   "choosing a microcontroller" (your slides 22–25)?  Where should the
   microcontroller/ecosystems slides live this year, if anywhere — 17x or
   the Day 18 wrap-up?
2. **GATT.**  Your Day 17 slide 10 writes "GAAT Protocol"; the standard
   name is GATT (Generic Attribute Profile).  The book will write GATT
   unless you say otherwise.
3. **Bluefruit guide.**  The reading's datasheet tour is the Adafruit
   guide the lab links.  Link the web guide only, or also host its PDF in
   `assets/` like the other datasheets?
4. **The files.**  passthrough.c and watchdog.c are recovered from your
   code slides; may I have the real files for `assets/starters/` (and is
   watchdog.c still a Canvas download this year)?
5. **return 0.**  passthrough.c ends `return 0;`; the course's listings
   end `return 1;` (B-14), and watchdog.c has no return.  Normalize both
   to `return 1;`, or keep yours as they are?
6. **Stop-mode code.**  Your slide 13 writes LPMS to 0b011 and comments
   "stop mode", but RM0490 Table 20 says 011 + SLEEPDEEP enters Standby;
   Stop is LPMS = 000.  The book will teach the RM's table (Sleep needs
   no register write at all; Stop is SLEEPDEEP only).  OK?
7. **Day 18 wall.**  What do you want projected while teams demo: the
   share-projects format with your four vote categories (your Day 19
   slide 4), Lab 9's Deliverable 6 checklist, a schedule, anything else?
   And do the learning-objectives / where-to-go-from-here / last-things
   slides carry over as they are?
8. **Kit return.**  Your Day 17 slide says kits return Tuesday; your Day
   19 slide says return the kit after the demo.  With demos on Thursday
   this year, which is it (and does the Bluefruit go back separately)?
9. **Groupings slide.**  Day 17 opens on the team groupings table (your
   slides 2–3).  Keep a placeholder groupings slide in the deck for you
   to fill, or leave it out?
10. **GAP speech bubbles.**  Your slide 9's advertising joke
    ("Helllllloooooooo! I have data from my ENGS 28 team's final
    project…") — carry it into the reading's GAP figure, or keep the
    reading plain?
