# Step 0 — Ground truth for the Day 9 / 9x / 10 week

Covers `source/ch-gpio-interrupts.ptx` (Day 9) and `source/ch-i2c.ptx`
(Days 9x and 10).  Sources: `assets/ClassSlidesOLD/Day09-Interrupts(2).pptx`
(60 slides), `Day09X-I2C.pptx` (32), `Day10-I2C(2).pptx` (56), plus
`Day13-I2C(3).pptx` (32) for the scope decision.  Downstream: **Lab 5**
(`assets/Labs/Lab5_ES28.pdf`, due Tue 10 Feb 2026) and **Lab 6**.

---

## 1. The drivers — recovered as text from the old decks

Every listing below is transcribed from a code slide, not reconstructed.
Slide numbers are given so each can be re-checked.

### Day 9 — `pb4_exti_init()` (deck slide 34, repeated 44/48/53)

```c
void pb4_exti_init(void) {
    __disable_irq();                        // disable global interrupts

    RCC->IOPENR |= RCC_IOPENR_GPIOBEN;      // Enable clock access to GPIOB

    GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk;  // Configure PB4 as input pin
    GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos);

    GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk;  // enable pull-up for PB4
    GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos);

    EXTI->EXTICR[1] &= ~EXTI_EXTICR2_EXTI4_Msk;             // Configure EXTICR2,
    EXTI->EXTICR[1] |= (EXTI_PB << EXTI_EXTICR2_EXTI4_Pos); // accessed as EXTICR[1]

    EXTI->FTSR1 |= EXTI_FTSR1_FT4;          // Falling edge trigger for line EXTI4

    EXTI->IMR1 |= EXTI_IMR1_IM4;            // Unmask line EXTI4

    NVIC_EnableIRQ(EXTI4_15_IRQn);          // Enable EXTI4 line in NVIC

    __enable_irq();                         // Enable global interrupts
}
```

`EXTI_PB` (and `EXTI_PC`, `GPIO_INPUT`, `GPIO_PULLUP`) are **defined in
`ES28.h`** — the deck says so explicitly on slide 26.  Port codes, from
slide 24: `PA 0x0, PB 0x1, PC 0x2, PD 0x3, PF 0x5`.

**The rough chapter's version of this function is invented and wrong.**  It
uses `GPIOB->PUPDR &= ~(3U << 8); GPIOB->PUPDR |= (1U << 8);` and
`EXTI->EXTICR[1] |= (EXTI_EXTICR2_EXTI4_PB);` — neither is the course idiom,
and `EXTI_EXTICR2_EXTI4_PB` is not a CMSIS name.  It also omits the MODER
configuration and the GPIOB clock ordering.  Discard it (B-6).

### Day 9 — the ISR (slides 37, 38, 39)

```c
// Interrupt service routine for the User button
void EXTI4_15_IRQHandler(void){
    __disable_irq();                          // disable global interrupts

    if (EXTI->FPR1 & EXTI_FPR1_FPIF4) {       // Check that EXTI4 interrupted
        EXTI->FPR1 = EXTI_FPR1_FPIF4;         // Clear PR flag by writing 1
        buttonPushed = 1;
    }
    __enable_irq();                           // Enable global interrupts
}
```

Petra's own speaker note on slide 38 corrects the comment: *"Check that EXTI4
interrupted should really be 'check that a falling edge triggered event
happened on EXTI4'."*  Use her corrected wording.

`EXTI_FPR1` is **write-1-to-clear** (`rc_w1`) — the note on slide 19 says
"Clearing it is done by writing a 1 to the corresponding bit."  This is the
*opposite* polarity to Day 8's `TIM14->SR` (`rc_w0`), and Day 8's Part 5 set
that comparison up explicitly.  The clear is still an assignment, not `|=`.

### Day 9 — `counterResetButtonPolled.c` (slide 16, complete)

```c
#include <stdio.h>
#include "ES28.h"
#include "uart.h"
#define WAIT        1000000
#define MAXCOUNT    100
#define BUTTON_PIN  (1U<<4)   // Button on PB4

int main(void) {
    int counter = 0;
    int buttonPushed;
    uart2_init();                                          // initialize UART
    RCC->IOPENR |= RCC_IOPENR_GPIOBEN;                     // enable clock

    GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk;
    GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos);  // input mode

    GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk;
    GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos); // pullup

    while(1) {
        printf("%x\t%d\r\n", counter, counter);
        delay_ms(1000);                                    // kill time
        buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0);   // Poll (1 => pressed)
        if ( (buttonPushed) || (counter == MAXCOUNT) ) {
            counter = 0;                                   // Reset the counter
        } else {
            counter++;
        }
    }
    return 0;
}
```

Note `WAIT` is `#define`d and never used — slide 40's interrupt version uses
`for (int i=0; i<WAIT; i++){}` instead of `delay_ms(1000)`.  Worth
normalizing to one or the other in the shipped starters; **flag for Petra.**

### Day 9 — `counterResetButtonInt.c` (slide 40, complete)

`main()` as above but with `pb4_exti_init()`, a `volatile int buttonPushed`,
and the counter reset driven by the flag.  Slide 40 has one **transcription
typo in the deck itself**: `EXTI->EXTICR[1] |= (EXTI_PB <<
EXTI_EXTICR2_EXTI4_Pos;` — a missing close paren.  Slide 34 is correct; use
slide 34.

### Day 9 — the two-button design exercise (slides 43, 44)

`pc13_exti_init()` for the blue user button on PC13: `RCC_IOPENR_GPIOCEN`,
`GPIO_MODER_MODE13_Msk/_Pos`, `EXTI->EXTICR[3]` with
`EXTI_EXTICR4_EXTI13_Msk/_Pos` and `EXTI_PC`, `EXTI_FTSR1_FT13`,
`EXTI_IMR1_IM13`, and — importantly — the **same** `NVIC_EnableIRQ(EXTI4_15_IRQn)`.
The deck's comment says the PC13 pull-up is "not necessary since it is
automatic for the blue button".  The shared ISR uses `if/else if` on
`EXTI_FPR1_FPIF4` / `EXTI_FPR1_FPIF13`.

### Day 9 — modularization (slides 49, 53)

`exti.c`/`exti.h` (with the `#ifndef EXTI_H_` guard) and `tim.c`/`tim.h`
carrying `tim14_ms_interrupt_init(int milliseconds)`:

```c
#define PSC_FACTOR 12000   // 12 MHz/12000 = 1 kHz
void tim14_ms_interrupt_init(int milliseconds) {
  __disable_irq();
  RCC->APBENR2 |= RCC_APBENR2_TIM14EN;
  TIM14->PSC = PSC_FACTOR - 1;
  TIM14->ARR = milliseconds - 1;
  TIM14->CNT = 0;
  TIM14->DIER |= TIM_DIER_UIE;
  NVIC_EnableIRQ(TIM14_IRQn);
  TIM14->CR1 |= TIM_CR1_CEN;
  __enable_irq();
}
```

`.h` goes in `Inc`, `.c` in `Src` (slide 49's callouts).  Day 8's chapter
already carries a `tim14_ms_interrupt_init()` body in the challenge solution
— check the two agree.

### Day 9x — `i2c1_init()` (slides 24, 25, complete)

```c
void i2c1_init(void){
  // Configure pins PB8 and PB9
  // Enable clock access to GPIOB (for PB8 and PB9)
  RCC->IOPENR |= RCC_IOPENR_GPIOBEN;
  // Set PB8 and PB9 to alternate function mode
  GPIOB->MODER = (GPIOB->MODER & ~GPIO_MODER_MODE8_Msk) | (GPIO_ALTERNATE << GPIO_MODER_MODE8_Pos);
  GPIOB->MODER = (GPIOB->MODER & ~GPIO_MODER_MODE9_Msk) | (GPIO_ALTERNATE << GPIO_MODER_MODE9_Pos);
  // Next, select AF6 for these pins.
  GPIOB->AFR[1] = ((GPIOB->AFR[1]) & ~GPIO_AFRH_AFSEL8_Msk) | (GPIO_AF6 << GPIO_AFRH_AFSEL8_Pos);
  GPIOB->AFR[1] = ((GPIOB->AFR[1]) & ~GPIO_AFRH_AFSEL9_Msk) | (GPIO_AF6 << GPIO_AFRH_AFSEL9_Pos);
  // Set PB8 and PB9 to open drain
  GPIOB->OTYPER |= (GPIO_OTYPER_OT8 | GPIO_OTYPER_OT9);
  // Enable pull-ups for PB8 and PB9 if needed: our devices have their own pull-ups.

  // Configure the i2c module
  // Enable clock access to I2C1
  RCC->APBENR1 |= RCC_APBENR1_I2C1EN;
  // Enter reset mode (disable peripheral)
  I2C1->CR1 &= ~I2C_CR1_PE;
  // Timing settings: Standard mode (100kHz) with 12MHz I2CCLK
  I2C1->TIMINGR &= 0x0; // clear timing register
  I2C1->TIMINGR |= (0x2  << I2C_TIMINGR_PRESC_Pos);
  I2C1->TIMINGR |= (0x4  << I2C_TIMINGR_SCLDEL_Pos) | (0x2 << I2C_TIMINGR_SDADEL_Pos);
  I2C1->TIMINGR |= (0xf << I2C_TIMINGR_SCLH_Pos) | (0x13 << I2C_TIMINGR_SCLL_Pos);
  // Exit reset mode (enable peripheral)
  I2C1->CR1 |= I2C_CR1_PE;
}
```

**The rough chapter's `i2c1_init()` is invented and wrong in five ways.**  It
claims `AF6 = I2C1` but writes `(6U << 0)` into `AFR[1]` bits [3:0] — that is
AFSEL8's field, so PB9 gets bits [7:4], which happens to be right, but the
raw-shift idiom is not the course's; it uses `(2U << 16)` instead of
`GPIO_ALTERNATE << GPIO_MODER_MODE8_Pos`; it never disables PE before writing
TIMINGR; it writes TIMINGR with a bogus `0x00000002` literal OR'd into the
low bits instead of `PRESC`; and it enables the I2C1 clock before the GPIO
work.  Discard it.

Timing constants, with the reason (deck slide 21 + its notes): the aim is a
**4 MHz internal I2C clock** after the prescaler, so `PRESC` divides by
(PRESC+1): 8 MHz→0x1, 16 MHz→0x3, 48 MHz→0xB, and **our 12 MHz→0x2**
(divide by 3).  Then `SCLL = 0x13`, `SCLH = 0xF`, `SDADEL = 0x2`,
`SCLDEL = 0x4`.  Source named on the slide: **RM0490 §23.4.10**.

### Day 9x — `i2c1_byteWrite()` / `i2c1_byteRead()` bodies (slides 29, 30, 31)

```c
    // Ping target address for writing 1 byte, use "=" to ensure all other bits are cleared
    I2C1->CR2  = (deviceAddr<<1)
                 | (1U << I2C_CR2_NBYTES_Pos)  // sending one byte only
                 | I2C_CR2_AUTOEND             // Send Stop condition after transfer
                 | I2C_CR2_START;              // Send Start condition
    while( !(I2C1->ISR & I2C_ISR_BUSY) );      // Wait until Start is received

    // Send the data
    if( !(I2C1->ISR & I2C_ISR_NACKF) ) {       // Make sure ACK received
        while( !(I2C1->ISR & I2C_ISR_TXIS) );  // Wait for TX to be ready
        I2C1->TXDR = data;                     // put data in send register
    }
```

Read is the same with `| I2C_CR2_RD_WRN`, `I2C_ISR_RXNE`, `*data = I2C1->RXDR;`.
The `=` (not `|=`) on CR2 is deliberate and commented as such — a direct
callback to Day 8's "assign a mask, don't compound-assign" moral.

### Day 9x — the library's public interface (slide 17)

```c
void i2c1_init(void);
void i2c1_byteWrite(uint8_t deviceAddr, uint8_t data);
void i2c1_byteRead(uint8_t deviceAddr, uint8_t *data);
void i2c1_memWrite(uint8_t deviceAddr, uint8_t registerAddr,
                   uint8_t nbytes, uint8_t *data);
void i2c1_memRead(uint8_t deviceAddr, uint8_t registerAddr,
                  uint8_t nbytes, uint8_t *data);
```

`i2c1_memRead()`'s full body is on Day 13 slides 12/17 (recovered, available
if needed).  **`i2c1_memWrite()`'s body appears in no deck** — only its
prototype and its use.  Not a blocker: the library is given to students, and
Day 10 only ever *calls* it.

### Day 10 — `pingDisplay.c` (slides 15, 16)

Two versions, and the pair is the teaching point: the raw-register version
and the library version, which is five lines.

```c
#include "ES28.h"
#include "i2c.h"

#define HT16K33_ADDR  0x70   // I2C address of our backpack controller

int main(void) {
    uint8_t data = 0b0;  // The hardware requires us to send some data, not important here.
    i2c1_init();
    // Ping the display's address, repeatedly
    while(1) {
        i2c1_byteWrite(HT16K33_ADDR, data);
        delay_ms(250);
    }
    return 0;
}
```

### Day 10 — `writeFirstDigit.c` (slide 43)

```c
#include "ES28.h"
#include "i2c.h"
#include "SevenSegPartial.h"
int main(void) {
    uint8_t display_addr = HT16K33_ADDR;
    uint8_t display_subaddr = 0;       // 0, 2, 4, 6, 8 - depending on the digit
    uint8_t digit_data = 0b01111001;   // 'E'
    i2c1_init();
    SevenSeg_init();

    while(1) {
        i2c1_memWrite(display_addr, display_subaddr, 1, &digit_data);
        delay_ms(250);
    }
    return 0;
}
```

### Day 10 — the device driver (slides 50, 51, 52)

Prototypes students are given:

```c
void SevenSeg_init();                           // Initialize the display
void SevenSeg_blink(uint8_t rate);              // Blink the display
void SevenSeg_dim(uint8_t brightness);          // Dim the display
void SevenSeg_write(uint8_t *display_buffer);   // Write the display RAM
void SevenSeg_number(int16_t num, uint8_t *display_buffer);
```

Petra's own solutions (slide 52) — this is the instructor solution for the
Day 10 crucial step:

```c
// Change the display flashing
void SevenSeg_blink(uint8_t rate) {
    i2c1_byteWrite(HT16K33_ADDR, HT16K33_DISPLAY_CMD | HT16K33_DISPLAY_ON | (rate & 0x6));
}

// Dim the display
void SevenSeg_dim(uint8_t brightness) {
    i2c1_byteWrite(HT16K33_ADDR, HT16K33_DISPLAY_CMD | HT16K33_BRIGHT_CMD | (brightness & 0xf));
}

// Write the display RAM
void SevenSeg_write(uint8_t *display_buffer) {
    // display_buffer is size 2*HT16K33_NBUF (high byte, low byte)
    i2c1_memWrite(HT16K33_ADDR, HT16K33_ADDR_PTR, 2*HT16K33_NBUF, display_buffer);
}
```

`SevenSeg_init()`'s body is **not** in any deck, but slide 38/39 gives its
three transactions exactly: `i2c1_byteWrite(HT16K33_ADDR, 0x21)` (oscillator
on), `0x81` (display on, no blink), `0xEF` (full brightness).  The `#define`
names (`HT16K33_SYSTEM_CMD | HT16K33_OSC_ON`, `HT16K33_DISPLAY_CMD`,
`HT16K33_BRIGHT_CMD`, `HT16K33_ADDR_PTR`, `HT16K33_NBUF`,
`HT16K33_BLINK_1HZ`, `HT16K33_BLINK_OFF`, `numbertable[]`) live in
`SevenSegPartial.h`, **which is not in the repo** — see §5.

### Day 10 — Coding Challenge 2 solution (slide 55, complete)

The `ES.28` display program, with `display_buffer[0..9]`, `SevenSeg_dim(15)`,
`SevenSeg_blink(HT16K33_BLINK_1HZ)`, `delay_ms(5000)`,
`SevenSeg_blink(HT16K33_BLINK_OFF)`, `SevenSeg_dim(5)`.  Uses
`numbertable[2]` and `numbertable[8]`, and the literal segment patterns
`0b01111001` ('E') and `0b11101101` ('S.').  Note this `main()` has no
`while(1)` — it runs once and returns (B-14 still satisfied: it ends
`return 0;`, though the course convention elsewhere is `return 1;` —
**flag for Petra**).

---

## 2. Register and reference-manual facts

| Fact | Source |
|---|---|
| EXTI0–15: pin *n* of any port maps to line EXTI*n*; only one port per line | Day 9 slides 20, 23 |
| The 16 lines share **three** NVIC vectors: EXTI0/1 → IRQ5 (priority 12), EXTI2/3 → IRQ6 (13), EXTI4…15 → IRQ7 (14) | Day 9 slide 20 |
| "The lower the priority number, the higher the priority" | Day 9 slide 20 |
| Port select field: `EXTI_EXTICR{x}` for `x = 1..4`, accessed in C as `EXTI->EXTICR[0..3]`; line 4 → `4 = 4(2−1)+0`, so EXTICR2 bits [7:0] | Day 9 slides 25, 27 |
| Port codes PA 0x0, PB 0x1, PC 0x2, PD 0x3, PF 0x5 | Day 9 slide 24 |
| `EXTI_FTSR1` = Falling Trigger Selection Register; set bit 4 for EXTI4 | Day 9 slide 29 |
| `EXTI_IMR1` = Interrupt Mask Register; set bit 4 to unmask | Day 9 slide 31 |
| `EXTI_FPR1` = falling-edge pending register; **cleared by writing 1** | Day 9 slides 19 (notes), 38 |
| Why IMR1 exists separately from FTSR1: event detection and interrupt generation are deliberately separate — you can detect without interrupting, and poll `FPR1` instead; also power management | Day 9 slide 19 speaker notes |
| I2C SCL/SDA pins used: **PB8/PB9, AF6**, the standard Arduino header choice | Day 9x slides 12, 24 |
| Open-drain: writing 0 pulls low; writing 1 leaves the pin floating for the pull-up | Day 9x slide 19 |
| Pull-ups 5 kΩ–10 kΩ; both our devices carry their own | Day 9x slide 13 + notes; Day 10 slide 36 says **10 K** |
| Speeds: 100 kHz standard, 400 kHz fast, up to 1 MHz; **we use 100 kHz** | Day 9x slide 20 |
| Timing constants for 12 MHz: PRESC 0x2, SCLL 0x13, SCLH 0xF, SDADEL 0x2, SCLDEL 0x4 | Day 9x slide 21 |
| HT16K33 address `0x70` = `0b0111 0000`, 7-bit; the hardware shifts left and appends R/W | Day 9x slides 26, 27 |
| Datasheets are sometimes ambiguous about 7- vs 8-bit addresses — a real and remembered course incident | Day 9x slide 27 + notes |
| Display is **common cathode**; 4 digits × (7 segments + DP) + colon = 34 LEDs on 14 wires (5 cathode + 9 anode) | Day 10 slides 32, 33 |
| Display RAM: two bytes per digit; **first** byte is segments a–g + DP, second is always 0 for us; digit addresses 0, 2, 4, 6, 8 (colon at 4) | Day 10 slides 35, 40 |
| Writing the whole display = one 10-byte page write from address 0x00 in **one** transaction | Day 10 slide 40 |
| Init commands: `0x21` oscillator on, `0x81` display on/no blink, `0xEF` full brightness | Day 10 slides 38, 39 |
| AD2 logic analyzer: DIO0 (pink) → SDA, DIO1 (green) → SCL, black → GND; timebase 20 µs; DIO0-falling trigger | Day 10 slides 26, 27, 28 |

### RM0490 section numbers — verified against `assets/stm32c031_rm.pdf` (Rev 3)

The decks show the register diagrams but never cite section numbers.  These
were read out of the manual itself, so the chapters can name them (P-11, L-6).

| Register / topic | RM0490 |
|---|---|
| Extended interrupt and event controller (EXTI) | **§12**, p. 217 |
| EXTI multiplexer | §12.3.3, p. 221 |
| `EXTI_FTSR1` — *EXTI falling trigger selection register 1* | §12.5.2, p. 224 |
| `EXTI_FPR1` — *EXTI falling edge pending register 1* | §12.5.5, p. 225 |
| `EXTI_EXTICRx` — *EXTI external interrupt selection register* | §12.5.6, p. 226 |
| `EXTI_IMR1` — *EXTI CPU wakeup with interrupt mask register* | §12.5.7, p. 227 |
| `GPIOx_ODR` — *GPIO port output data register* | §6.4.6, p. 156 |
| `GPIOx_BSRR` — *GPIO port bit set/reset register* | §6.4.7, p. 156–157 |
| `GPIOx_BRR` — *GPIO port bit reset register* | §6.4.11, p. 159 |
| Vector table | §11.3, Table 40 (as Day 8) |
| I2C interface | **§23**, p. 592 |
| `I2C_TIMINGR` configuration examples | §23.4.10, p. 623 |
| I2C master mode (the transfer sequences) | §23.4.9, p. 612 |
| `I2C_CR2` | §23.7.2 |

Facts read off those pages, exact:

- **`EXTI_FPR1`'s bits are `FPIF15..FPIF0`, access type `rc_w1`** — "Each bit
  is cleared by writing 1 into it."  Same polarity as Day 7's ADC flags,
  opposite to Day 8's TIM14 `UIF`.  Day 8 taught exactly how to decide this.
- **The vector table row is position 7, `EXTI4_15`, "EXTI line 4 to 15
  interrupt", priority 14, vector `0x0000_005C`.**  (EXTI0_1 is position 5 /
  priority 12; EXTI2_3 is 6 / 13.)  This confirms Day 9 slide 20 exactly.
- **`EXTI_EXTICRx` is at offset `0x060 + 0x4*(x−1)`, x = 1..4**, four 8-bit
  fields per register, `EXTIm[7:0]` with `m = 4*(x−1)`.  Port codes from the
  manual: `0x00` PA, `0x01` PB, `0x02` PC, `0x03` PD, `0x04` **reserved**,
  `0x05` PF.  (The deck omits that 0x04 is reserved rather than PE — the
  chip has no port E.)
- **`GPIOx_BSRR`, §6.4.7:** bits [15:0] are `BSy` (write 1 → sets the
  corresponding ODR bit), bits [31:16] are `BRy` (write 1 → resets it).  Both
  halves are **write-only — "A read operation always returns 0x0000"** — which
  is precisely why there is nothing to lose to an interrupt.  Writing 0 to any
  bit has no effect, so one write can set some pins and clear others and touch
  nothing else.  The manual's own note: *"If both BSx and BRx are set, BSx has
  priority."*
- **`GPIOx_ODR`, §6.4.6, carries the pointer in its own text:** *"For atomic
  bit set/reset, the OD bits can be individually set and/or reset by writing to
  the GPIOx_BSRR register."*  Students have been reading this page since Day 1
  and have never used that note — which makes it the natural Day 9 lookup.
- **`GPIOx_BRR` (§6.4.11) exists too** — a reset-only register, redundant with
  BSRR's upper half.  Worth one honest sentence (S-19), not a section.

### The named lookups for P-11

1. **Day 9 — RM0490 §6.4.6 → §6.4.7.**  Go back to the ODR page, read the
   note at the bottom, follow it to BSRR.  The answer to the race comes off a
   page they already know.
2. **Day 9 — RM0490 §12.5.6.**  Derive *which* EXTICR register and *which*
   byte hold EXTI4's port select from the address formula, then read the port
   code for B.  This is the deck's own `4 = 4(2−1)+0` derivation (slide 27).
3. **Day 9x — RM0490 §23.4.10.**  Find the 12 MHz row of the timing-example
   table and read off PRESC/SCLL/SCLH/SDADEL/SCLDEL — and see *why* PRESC
   differs per clock (every row divides down to 4 MHz).
4. **Day 10 — HT16K33 datasheet pp. 24–25** for the command table, and
   **p. 22** for the page-write operation (Day 10 slides 38, 40, 49).

---

## 3. BSRR — the deferred topic, and what the deck actually contains

**BSRR appears nowhere in any old deck.**  Confirmed by grep across all 28
`.pptx` files.  It is material Petra has reserved for this chapter, not
material to be recovered.

What the old deck *does* contain is the structurally identical race, on a
software variable — slides 54–58, "A cautionary tale about interrupts":

- Two working solutions to the same problem (counter reset on button press):
  one zeroes `counter` **in the ISR**, the other sets a flag and lets `main()`
  zero it.  Slide 55's punchline: *"Shorter is better, right? (Not so fast!)"*
- Slide 56 shows `counter++` disassembled into five Thumb instructions
  (`ldr`/`ldr`/`adds`/`ldr`/`str`) and asks **"What if you get interrupted
  here?"**  Her speaker note walks the failure: the ISR's `counter = 0` is
  overwritten by the write-back of the pre-interrupt value + 1, so the reset
  is silently lost.
- Slide 57 disassembles the flag version and shows why it cannot fail.
- Slide 58, the moral: *"Distinguish between data signals and control signals
  (flags).  Be very careful about changing global data in an ISR (maybe don't
  do it at all!)"*

**This is the staging BSRR needs.**  The `ODR` read-modify-write race is the
same argument one level down in the hardware: `GPIOA->ODR ^= LED` in an ISR
while `main()` also touches `ODR` is `counter++` with a peripheral register
instead of a variable, and unlike `counter++` there *is* a hardware fix —
`GPIO_BSRR_BS5` / `GPIO_BSRR_BR5`, a single atomic write with no read.  The
chapter should run the deck's own cautionary tale first (students have
already **hit** it — Day 8's homework had them toggle the LED directly in
the ISR, and Day 9 slide 10's speaker note is Petra flagging exactly this:
*"Careful in general — don't change any data in the ISR (will discuss this
later).  Toggling an LED is okay though."*), then generalize to the register.

Note her "toggling an LED is okay though" is true *only* because Day 8's
homework has nothing else writing `ODR`.  Day 9's two-button exercise and
the Lab 5 additional feature (a red LED flashed from a timer ISR while main
drives a green LED) break that assumption — which is the honest motivation.
**This is the load-bearing design decision for Day 9; it is placed
explicitly in the lesson plan, not left to Step 3.**

---

## 4. Continuity

### What Day 8 already establishes (`ch-timers-interrupts.ptx`)

Day 9 inherits all of this and must **not** re-teach it (B-8):

- The interrupt mechanism end to end: save state → vector table → ISR →
  restore (`subsec-timers-ref-mechanism`, `fig-interrupt-execution`).
- The NVIC as the intermediary; every source off at reset;
  `NVIC_EnableIRQ()` is a CMSIS function (`sl-day8v-nvic`).
- The three ISR rules — exact fixed name, get in and out, do the minimum —
  and the `volatile` shared flag with the absent-call-site explanation
  (`subsec-timers-ref-isr`, `fig-compiler-view`).
- Where handler names come from: RM0490 §11.3 Table 40 and
  `startup_stm32c031c6tx.s` (`subsec-day8-interrupt-prog`).
- **Status-flag access types**, `rc_w0` vs `rc_w1`, and "clear by assigning a
  mask, not by compound assignment" (`subsec-day8-rcw0`,
  `subsec-timers-ref-access-types`).  Day 9's `EXTI->FPR1 = EXTI_FPR1_FPIF4`
  is a direct application: this is `rc_w1`, like the ADC's flags and unlike
  TIM14's.
- The two-enable pattern (peripheral side + NVIC side).  Day 9 has *four*
  EXTI-side steps before the NVIC, which is the genuinely new part.

So **Day 9's new material is only: the EXTI block, its four registers, the
shared vector, and the race**.  Everything else is transfer.

### What Days 3/3x/4 establish (`ch-switches.ptx`)

PB4 as *the* button pin (D5 on the header), internal pull-up via PUPDR,
active-low reading through IDR, the debounce capacitor, and contact bounce
itself.  Day 9 needs no new wiring theory — but **bounce now produces
multiple interrupts**, which the old deck never addresses and the chapter
should.

### What Day 5 establishes (`ch-uart.ptx`)

Asynchronous serial, the baud-rate agreement, start/stop bits.  This is the
hook Day 9x's slides 5–8 use ("What other serial communication protocol do
we already know?") and the reason the I2C reading can be short.

### What Lab 5 needs (P-13 — a constraint, not the goal)

Lab 5 (due Tue 10 Feb) requires: a modular ADC driver; **"Enable the ADC with
a timer interrupt rather than `delay_ms()`"** (Day 8 homework covers the
technique, Day 9's Coding Challenge 2 is literally this); and a
seven-segment display driver, for which the lab says *"use the code you
developed in class on Day 10 as a basis."*  Lab 5 therefore depends on Day
10's crucial step being reached.

Lab 5's Additional Feature 1 — a red LED flashed at 1 Hz **by a timer**
while a green LED is driven from the main loop — is the first place students
hit the shared-`ODR` race for real.  That is the concrete downstream reason
BSRR belongs on Day 9.

**Lab 5 does not require GPIO interrupts at all.**  Day 9's material is
in-class and homework learning in its own right (P-13); its downstream
consumers are the two-button exercise, Lab 6's tachometer, and general
fluency.

### Conflict to resolve: `SevenSeg_write()`'s signature

- Day 10 deck (slides 50–52, 55): `void SevenSeg_write(uint8_t *display_buffer)`,
  buffer is `uint8_t[2*HT16K33_NBUF]` = 10 bytes.
- Lab 5 handout, §3.3: `void SevenSeg_write(uint16_t *display_buffer)`,
  "`display_buffer` is expected to be of size `HT16K33_NBUF`", with
  `#define HT16K33_NBUF 5`.

Both encode the same 10 bytes; the types differ.  **DECIDED (Petra, before
Step 2): the chapter follows the deck — `uint8_t *`, buffer
`uint8_t[2*HT16K33_NBUF]`.**  That matches her own instructor solution and the
byte-per-RAM-address model the HT16K33 datasheet uses.  The chapter says
nothing about the lab's signature; **the Lab 5 handout §3.3 needs updating**
and is flagged below.

---

## 5. What is missing, and whether it blocks

| Artifact | Status | Blocks? |
|---|---|---|
| `pb4_exti_init`, EXTI ISR, both counter programs | **recovered complete** | no |
| `i2c1_init`, `byteWrite`/`byteRead` bodies, `memRead` body | **recovered complete** | no |
| `i2c1_memWrite()` body | absent from every deck | no — students are given the library and only call it |
| `pingDisplay.c`, `writeFirstDigit.c`, SevenSeg solutions, ES.28 demo | **recovered complete** | no |
| `SevenSegPartial.h` — the `HT16K33_*` `#define`s and `numbertable[]` | absent; names known from slides 49–52, values not | **yes, partially** — Day 10 cannot show the `#define` block without inventing values (B-6).  Teachable around: send students to HT16K33 datasheet pp. 24–25 to *derive* them, which is the better activity anyway. |
| `SevenSeg_init()` body | absent; its three transactions are known exactly | no — it is the students' own first driver function |
| `ES28.h` (`EXTI_PB`, `GPIO_INPUT`, `GPIO_PULLUP`, `GPIO_ALTERNATE`, `GPIO_AF6`, `delay_ms`) | not in repo; carried over from Day 8's flag 2 | no — names are used, values never quoted |
| RM0490 section number for EXTI | not named in any deck | no — look it up before Step 3 |
| Annotated figures | to be rebuilt with `pptx_annotate.py` in Step 1 | no |

---

## 6. Scope: what to do about Day 13

`ch-i2c.ptx` currently ends with `sec-i2c-accel-driver`, built from
`Day13-I2C(3).pptx`.  What is actually there is thin: two figures, one of
which (`fig-firmware-layers-accel`) duplicates `fig-firmware-layers` from
Day 10, and one (`fig-i2c-transfer-pattern`, Day 13 slide 29) which is a
genuinely generic I2C register-read/register-write diagram.

Day 13 itself is **the accelerometer day**: LSM303AGR, `whoami_test.c`,
`lsm303agr.h`, the accelerometer device driver, and AD2 debugging of that
bus.  Its I2C content is explicitly review (slides 5–7 replay Day 9x's
slides).  `ch-accelerometers.ptx` currently covers Day 13x and Day 14 —
Day 13 is the first day of that arc, not the last day of this one.

**DECIDED (Petra, before Step 2): Day 13 moves.**  `ch-i2c.ptx` keeps the
generic transfer-pattern figure in its Reference section; the duplicated
layers figure is dropped; Day 13 is authored later as the first day of
`ch-accelerometers.ptx`, alongside Day 13x and Day 14.  The chapter status
table in `CHAPTER_PROCESS.md` is updated to match.  **`ch-i2c.ptx` is a
two-day chapter: Days 9x and 10.**

---

## 7. Flags for Petra (raised now, not at Gate 2)

1. ~~**[SCOPE]** Day 13 → `ch-accelerometers.ptx`?~~ — **DECIDED: yes.** (§6)
2. ~~**[CONFLICT]** `SevenSeg_write()` signature?~~ — **DECIDED: the deck's
   `uint8_t *`.**  Consequence: **Lab 5 §3.3's prototype block is now stale**
   and should be changed to `void SevenSeg_write(uint8_t *display_buffer);`
   with the comment "`display_buffer` is expected to be of size
   `2*HT16K33_NBUF`".  The lab is a PDF outside this repo — **this one needs
   Petra's hands.**  (§4)
3. **[FILES]** `SevenSegPartial.h` would close the last unverifiable Day 10
   item.  Also still open from Day 8: `ES28.h`.
4. **[BSRR]** The whole BSRR beat is new material with no deck precedent.
   The plan's design for it is in `plans/week5.md`; it wants a look before
   Step 3.
5. **[MINOR]** `counterResetButtonPolled.c` `#define`s `WAIT` and never uses
   it; the interrupt version uses `for(...WAIT...)` where the polled one uses
   `delay_ms(1000)`.  Normalize which?
6. **[MINOR]** Day 10 slide 55's `main()` ends `return 0;` where the course
   convention (B-14) is `return 1;`.
