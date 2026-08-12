var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "front-colophon",
  "level": "1",
  "url": "front-colophon.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": "  "
},
{
  "id": "preface",
  "level": "1",
  "url": "preface.html",
  "type": "Preface",
  "number": "",
  "title": "Welcome to ENGS 28!",
  "body": " Welcome to ENGS 28!  Welcome to ENGS 28: Embedded Systems at Dartmouth's Thayer School of Engineering!  This interactive textbook accompanies the course and covers the design and programming of microcontroller-based embedded systems using the STM32 Nucleo-64 board (STM32C031C6 MCU). Topics include GPIO, UART, ADC, timers, interrupts, I 2 C, motor control, sensors, wireless communication, and power management—all implemented in C with direct register-level programming.  Each chapter corresponds to material covered in class, expanded with additional explanations, code walkthroughs, videos, and Check Your Understanding exercises. Video placeholders are marked throughout—fill in YouTube IDs as recordings become available.  Code listings show complete, runnable examples unless marked [fragment] . All examples target the STM32C031C6 and use the course library header ES28.h .  The and in the back matter serve as quick references throughout the course.  "
},
{
  "id": "preface-3",
  "level": "2",
  "url": "preface.html#preface-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "STM32 Nucleo-64 board "
},
{
  "id": "resources",
  "level": "1",
  "url": "resources.html",
  "type": "Preface",
  "number": "",
  "title": "Course Reference Documents",
  "body": " Course Reference Documents  The following documents are referenced throughout this textbook. All are hosted here for convenience — you can also open them directly from any page that links to them.   STM32C031C6 Reference Manual — the authoritative register-level description of every peripheral on the MCU: GPIO, UART, ADC, timers, I²C, and more. This is the document you open when you need to know exactly which bits to set. Open    STM32C031C6 Datasheet — electrical characteristics, pinout, package information, and absolute maximum ratings for the MCU itself. Open    Nucleo-C031C6 User Manual — board-level documentation: power supply options, on-board ST-LINK programmer, jumper settings, and the Morpho\/Arduino connector layout. Open    Nucleo-C031C6 Schematic — full schematic of the Nucleo board, useful for tracing signal paths and understanding on-board resistors and jumpers. Open    Nucleo-C031C6 Pinout — quick-reference pinout diagram showing which MCU pins are accessible on the Arduino and Morpho connectors. Open   "
},
{
  "id": "subsec-what-is-mcu",
  "level": "1",
  "url": "subsec-what-is-mcu.html",
  "type": "Subsection",
  "number": "1.1.1",
  "title": "What Is a Microcontroller?",
  "body": " What Is a Microcontroller?  A microcontroller is a self-contained computer on a single chip. Unlike the processor in your laptop — which is just a CPU that relies on separate chips for memory, storage, and input\/output — a microcontroller integrates all of those components into one package: a CPU core, flash memory for your program, RAM for variables, and a collection of hardware peripherals (timers, communication interfaces, analog-to-digital converters, and more).  The design philosophy is different too. A laptop processor is optimized for running a general-purpose operating system and many programs at once. A microcontroller is optimized for running one dedicated task with precise timing, low power consumption, and direct control of external hardware. It starts executing your program the instant power is applied and never stops. There is no operating system to boot, no file system to mount, no display driver to load — just your code and the hardware.  The microcontroller we use in ENGS 28 is the STM32C031C6 , made by STMicroelectronics. It contains a 32-bit Arm Cortex-M0+ processor core, 32 KB of flash memory, 12 KB of RAM, and a set of peripherals — all in a package smaller than a postage stamp. It runs at 12 MHz by default, draws a few milliamps, and costs less than a dollar in volume.  "
},
{
  "id": "subsec-what-is-mcu-2",
  "level": "2",
  "url": "subsec-what-is-mcu.html#subsec-what-is-mcu-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "microcontroller "
},
{
  "id": "subsec-what-is-mcu-4",
  "level": "2",
  "url": "subsec-what-is-mcu.html#subsec-what-is-mcu-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "STM32C031C6 "
},
{
  "id": "subsec-what-is-gpio",
  "level": "1",
  "url": "subsec-what-is-gpio.html",
  "type": "Subsection",
  "number": "1.1.2",
  "title": "GPIO: The Software-Hardware Bridge",
  "body": " GPIO: The Software-Hardware Bridge  The physical pins of a microcontroller serve many roles. Some are dedicated — they carry power or ground, connect to a clock crystal, or provide a reset signal. But most pins are GPIO pins: General-Purpose Input\/Output . General-purpose means they have no fixed function. Each pin is configured independently: one pin might be a digital output driving an LED, an adjacent pin might be a digital input reading a button, and a third might be in alternate function mode, where the GPIO hardware is bypassed and the pin is handed off to a peripheral such as UART or I2C. There is also an analog mode that connects the pin directly to the analog-to-digital converter, bypassing the digital input circuitry entirely.  A GPIO output pin is the simplest possible interface between software and the physical world. Set it HIGH and current flows through an LED; set it LOW and the LED goes dark. Drive it HIGH and LOW in a pattern and you are transmitting serial data. Modulate the ratio of HIGH to LOW time and you are controlling motor speed. Everything in this course starts from that one primitive: a pin whose voltage your code controls.  The STM32C031C6 groups its GPIO pins into ports — named A, B, and C — with up to 16 pins per port. A pin is identified by its port letter and bit number within that port: PA5 means Port A, bit 5. The bit number matters because the hardware registers that control each pin use that number to address the right bit.  "
},
{
  "id": "subsec-what-is-gpio-2",
  "level": "2",
  "url": "subsec-what-is-gpio.html#subsec-what-is-gpio-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "GPIO General-Purpose Input\/Output alternate function analog "
},
{
  "id": "subsec-what-is-gpio-4",
  "level": "2",
  "url": "subsec-what-is-gpio.html#subsec-what-is-gpio-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "ports PA5 "
},
{
  "id": "subsec-register-model",
  "level": "1",
  "url": "subsec-register-model.html",
  "type": "Subsection",
  "number": "1.1.3",
  "title": "Peripheral Registers: How Software Talks to Hardware",
  "body": " Peripheral Registers: How Software Talks to Hardware  Here is the central insight of embedded systems programming, and the mental model you should take into every class:   On the STM32, controlling a hardware peripheral means reading from and writing to specific memory addresses. Those addresses do not hold ordinary variables — they are wired directly into hardware circuits. Writing a value to the right address changes the state of the hardware.   These special addresses are called peripheral registers . Every peripheral — GPIO, timers, UART, I2C — has a set of registers that control its behavior. For example, the Output Data Register (ODR) controls the voltage driven on each individual output pin: bit 5 controls PA5, bit 3 controls PA3, and so on. For Port A it lives at address 0x5000 0014 . When your code writes a value to that address, the GPIO hardware immediately updates each output pin whose corresponding bit changed.  In C, you never type a raw address like 0x5000 0014 . Instead, the device header file ( stm32c031xx.h ) defines a pointer named GPIOA that points to a structure of registers at that base address. So GPIOA->ODR means the ODR register inside the GPIOA structure, which compiles to exactly the right memory write.  Before you can use any register in a peripheral, you must enable that peripheral's clock . By default, most peripherals are powered down to save energy — their internal clock is not yet enabled, so writes to their registers are silently ignored. Enabling the clock takes one register write: setting the appropriate bit in the Reset and Clock Control (RCC) subsystem. It is the first thing every initialization function does, and forgetting it is one of the most common sources of bugs in embedded code.  "
},
{
  "id": "subsec-register-model-3",
  "level": "2",
  "url": "subsec-register-model.html#subsec-register-model-3",
  "type": "Insight",
  "number": "1.1.1",
  "title": "",
  "body": " On the STM32, controlling a hardware peripheral means reading from and writing to specific memory addresses. Those addresses do not hold ordinary variables — they are wired directly into hardware circuits. Writing a value to the right address changes the state of the hardware.  "
},
{
  "id": "subsec-register-model-4",
  "level": "2",
  "url": "subsec-register-model.html#subsec-register-model-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "peripheral registers Output Data Register "
},
{
  "id": "subsec-register-model-6",
  "level": "2",
  "url": "subsec-register-model.html#subsec-register-model-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "clock Reset and Clock Control "
},
{
  "id": "rq-mcu-gpio-concepts",
  "level": "1",
  "url": "rq-mcu-gpio-concepts.html",
  "type": "Check Your Understanding",
  "number": "1.1.4",
  "title": "Check Your Understanding",
  "body": "  What distinguishes a microcontroller from a general-purpose CPU (like the one in a laptop)?    A microcontroller integrates CPU, memory, and peripherals on one chip and is designed to run a single dedicated task with direct hardware access, whereas a general-purpose CPU relies on external chips and an operating system.  Correct. The all-in-one integration is what makes microcontrollers cheap, low-power, and suitable for embedded tasks — but it also means they are not easily repurposed for general computing.    A microcontroller is always faster than a CPU because it has no operating system overhead.  Microcontrollers are almost always slower than modern laptop CPUs in raw compute speed — the STM32C031C6 runs at 12 MHz versus several GHz for a laptop. The advantage is integration and low power, not raw speed.    A microcontroller uses a different programming language than a general-purpose processor.  Both are programmed in standard languages like C. The difference is in the hardware architecture and intended use, not the programming language.    A microcontroller can only control LEDs and buttons, while a CPU handles more complex tasks.  Microcontrollers handle a wide range of tasks — motor control, wireless communication, sensor fusion, and more. The distinction is not about task complexity but about integration and direct hardware access.      A microcontroller has 48 physical pins. Some carry power and ground; others are GPIO. What does general-purpose mean in GPIO?    The pin has no fixed function — software configures it as either a digital input or a digital output, and the same pin can serve different roles in different projects.  Correct. Unlike a dedicated power pin (which is always connected to VDD) or a crystal pin (which is always an oscillator input), a GPIO pin's role is determined entirely by how your code configures it.    The pin can carry analog signals as well as digital ones.  Some GPIO pins do have an analog mode, but that is a specific additional function, not what general-purpose means. The core meaning is software-configurable input or output.    The pin is usable on any microcontroller brand, not just STM32.  GPIO is a common concept, but general-purpose refers to the pin's flexibility within one chip, not cross-brand compatibility.    The pin can source or sink any amount of current the connected device needs.  GPIO pins have strict current limits (typically 8–20 mA). General-purpose refers to input\/output configurability, not unlimited current capability.      You write to GPIOA->MODER to configure PA5 as an output, but the pin never responds. You have not written to RCC->IOPENR . What is the most likely explanation?    The GPIOA peripheral's clock has not been enabled; writes to its registers are silently ignored until the clock is turned on via RCC.  Correct. The STM32 leaves peripheral clocks disabled by default. RCC->IOPENR must be set before any GPIO register is accessed.    The MODER register requires two writes to take effect; one write is not enough.  MODER takes effect on the first write — but only if the peripheral clock is already enabled. The missing step is the clock enable, not a second MODER write.    PA5 is reserved for the on-board LED and cannot be configured by user code.  PA5 is the on-board LED pin, but it is fully accessible to user code — that is the whole point of Blinky. No pin is reserved in a way that blocks user access.    The processor must be restarted after writing to MODER before the new mode takes effect.  GPIO configuration takes effect immediately on the write — no restart required. The missing step is the clock enable.     "
},
{
  "id": "rq-mcu-vs-cpu",
  "level": "2",
  "url": "rq-mcu-gpio-concepts.html#rq-mcu-vs-cpu",
  "type": "Reading Question",
  "number": "1.1.4.1",
  "title": "",
  "body": " What distinguishes a microcontroller from a general-purpose CPU (like the one in a laptop)?    A microcontroller integrates CPU, memory, and peripherals on one chip and is designed to run a single dedicated task with direct hardware access, whereas a general-purpose CPU relies on external chips and an operating system.  Correct. The all-in-one integration is what makes microcontrollers cheap, low-power, and suitable for embedded tasks — but it also means they are not easily repurposed for general computing.    A microcontroller is always faster than a CPU because it has no operating system overhead.  Microcontrollers are almost always slower than modern laptop CPUs in raw compute speed — the STM32C031C6 runs at 12 MHz versus several GHz for a laptop. The advantage is integration and low power, not raw speed.    A microcontroller uses a different programming language than a general-purpose processor.  Both are programmed in standard languages like C. The difference is in the hardware architecture and intended use, not the programming language.    A microcontroller can only control LEDs and buttons, while a CPU handles more complex tasks.  Microcontrollers handle a wide range of tasks — motor control, wireless communication, sensor fusion, and more. The distinction is not about task complexity but about integration and direct hardware access.    "
},
{
  "id": "rq-gpio-general-purpose",
  "level": "2",
  "url": "rq-mcu-gpio-concepts.html#rq-gpio-general-purpose",
  "type": "Reading Question",
  "number": "1.1.4.2",
  "title": "",
  "body": " A microcontroller has 48 physical pins. Some carry power and ground; others are GPIO. What does general-purpose mean in GPIO?    The pin has no fixed function — software configures it as either a digital input or a digital output, and the same pin can serve different roles in different projects.  Correct. Unlike a dedicated power pin (which is always connected to VDD) or a crystal pin (which is always an oscillator input), a GPIO pin's role is determined entirely by how your code configures it.    The pin can carry analog signals as well as digital ones.  Some GPIO pins do have an analog mode, but that is a specific additional function, not what general-purpose means. The core meaning is software-configurable input or output.    The pin is usable on any microcontroller brand, not just STM32.  GPIO is a common concept, but general-purpose refers to the pin's flexibility within one chip, not cross-brand compatibility.    The pin can source or sink any amount of current the connected device needs.  GPIO pins have strict current limits (typically 8–20 mA). General-purpose refers to input\/output configurability, not unlimited current capability.    "
},
{
  "id": "rq-why-clock-enable",
  "level": "2",
  "url": "rq-mcu-gpio-concepts.html#rq-why-clock-enable",
  "type": "Reading Question",
  "number": "1.1.4.3",
  "title": "",
  "body": " You write to GPIOA->MODER to configure PA5 as an output, but the pin never responds. You have not written to RCC->IOPENR . What is the most likely explanation?    The GPIOA peripheral's clock has not been enabled; writes to its registers are silently ignored until the clock is turned on via RCC.  Correct. The STM32 leaves peripheral clocks disabled by default. RCC->IOPENR must be set before any GPIO register is accessed.    The MODER register requires two writes to take effect; one write is not enough.  MODER takes effect on the first write — but only if the peripheral clock is already enabled. The missing step is the clock enable, not a second MODER write.    PA5 is reserved for the on-board LED and cannot be configured by user code.  PA5 is the on-board LED pin, but it is fully accessible to user code — that is the whole point of Blinky. No pin is reserved in a way that blocks user access.    The processor must be restarted after writing to MODER before the new mode takes effect.  GPIO configuration takes effect immediately on the write — no restart required. The missing step is the clock enable.    "
},
{
  "id": "subsec-day1-run-blinky",
  "level": "1",
  "url": "subsec-day1-run-blinky.html",
  "type": "Subsection",
  "number": "1.2.1",
  "title": "Part 1: Get Blinky Running",
  "body": " Part 1: Get Blinky Running   Run Blinky   Follow the Canvas instructions for Day 1 to import the Blinky project, build it, and flash it to your Nucleo board. The green on-board LED should begin blinking.     In the Project Explorer panel on the left, expand your project folder, then expand the Src subfolder. Double-click blinky.c to open it in the editor.  Find the delay loop: for (int i = 0; i < 100000; i++); . Change 100000 to 1000000 (one extra zero). Then click the hammer icon (Build) and, once the build succeeds, the play icon (Run) to flash the board. What changes?      Change the loop bound to 10000 and repeat. How fast can you make the LED blink before it appears to stop flickering?     "
},
{
  "id": "act-day1-run-blinky",
  "level": "2",
  "url": "subsec-day1-run-blinky.html#act-day1-run-blinky",
  "type": "Activity",
  "number": "1.2.1",
  "title": "Run Blinky.",
  "body": " Run Blinky   Follow the Canvas instructions for Day 1 to import the Blinky project, build it, and flash it to your Nucleo board. The green on-board LED should begin blinking.     In the Project Explorer panel on the left, expand your project folder, then expand the Src subfolder. Double-click blinky.c to open it in the editor.  Find the delay loop: for (int i = 0; i < 100000; i++); . Change 100000 to 1000000 (one extra zero). Then click the hammer icon (Build) and, once the build succeeds, the play icon (Run) to flash the board. What changes?      Change the loop bound to 10000 and repeat. How fast can you make the LED blink before it appears to stop flickering?    "
},
{
  "id": "subsec-day1-board-tour",
  "level": "1",
  "url": "subsec-day1-board-tour.html",
  "type": "Subsection",
  "number": "1.2.2",
  "title": "Part 2: The Nucleo Board",
  "body": " Part 2: The Nucleo Board  The STM32 Nucleo-64 board surrounds the STM32C031C6 microcontroller with everything needed to program and power it from a laptop: a USB interface, voltage regulators, Arduino-compatible headers, and a few buttons and LEDs. shows the board and a close-up of the microcontroller.   The STM32 Nucleo-64 board (left) and a close-up of the microcontroller area (right). The orange arrow identifies the STM32C031C6 microcontroller; the pink circles show how its physical pins connect to the Arduino-compatible header pins — the sockets where you plug in jumper wires.     shows the board layout from above. Running along the left and right edges, flanked by a double-row of pins each, are two rows of Arduino-compatible header pins — these are where you plug in jumper wires to connect LEDs, buttons, and sensors. The small green user LED sits at the very top of the board, just to the left of the right Arduino header; the black reset button is just to the left of it. Flanking the Arduino headers on the outer left and right edges are two additional connectors called Morpho connectors that expose more pins — we will not use those. The USB-B Mini connector on the top edge carries both power and the programming\/debugging link to your laptop.   Annotated top view of the STM32 Nucleo-64 board. Key components are labeled by color: USB interface and reset button (black), power LED and user LED (green), user button (blue), crystal oscillators (purple), power\/ground and analog headers (red), digital I\/O header (red arrow, right), Morpho connectors (pink), and the STM32C031C6 microcontroller (orange).    The STM32C031C6 has 48 physical pins ( ), organized into three GPIO ports named A, B, and C, with up to 16 pins each. A pin is identified by its port letter and bit number: PA5 means Port A, bit 5; PB10 means Port B, bit 10. The on-board LED is wired to PA5 — also labeled D13 on the Arduino header. shows the full pin map with the D13 = PA5 connection highlighted.   Pin diagram of the STM32C031C6 (48-pin LQFP package). The chip has 48 pins organized into three GPIO ports — A, B, and C — each with up to 16 pins. PA5 (bottom row, highlighted in red) is the on-board LED pin.     Color-coded Nucleo-64 pin map. Each header pin is shown with its Arduino label (center columns) and corresponding STM32C031C6 port\/bit name (outer columns), color-coded by function. The red box and arrow highlight D13 = PA5 (Port A, bit 5) — the on-board LED pin.        "
},
{
  "id": "subsec-day1-board-tour-2",
  "level": "2",
  "url": "subsec-day1-board-tour.html#subsec-day1-board-tour-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "STM32 Nucleo-64 STM32C031C6 "
},
{
  "id": "fig-nucleo-board-photo",
  "level": "2",
  "url": "subsec-day1-board-tour.html#fig-nucleo-board-photo",
  "type": "Figure",
  "number": "1.2.1",
  "title": "",
  "body": " The STM32 Nucleo-64 board (left) and a close-up of the microcontroller area (right). The orange arrow identifies the STM32C031C6 microcontroller; the pink circles show how its physical pins connect to the Arduino-compatible header pins — the sockets where you plug in jumper wires.   "
},
{
  "id": "fig-nucleo-board-labeled",
  "level": "2",
  "url": "subsec-day1-board-tour.html#fig-nucleo-board-labeled",
  "type": "Figure",
  "number": "1.2.2",
  "title": "",
  "body": " Annotated top view of the STM32 Nucleo-64 board. Key components are labeled by color: USB interface and reset button (black), power LED and user LED (green), user button (blue), crystal oscillators (purple), power\/ground and analog headers (red), digital I\/O header (red arrow, right), Morpho connectors (pink), and the STM32C031C6 microcontroller (orange).   "
},
{
  "id": "subsec-day1-board-tour-6",
  "level": "2",
  "url": "subsec-day1-board-tour.html#subsec-day1-board-tour-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "GPIO ports "
},
{
  "id": "fig-stm32-pinout",
  "level": "2",
  "url": "subsec-day1-board-tour.html#fig-stm32-pinout",
  "type": "Figure",
  "number": "1.2.3",
  "title": "",
  "body": " Pin diagram of the STM32C031C6 (48-pin LQFP package). The chip has 48 pins organized into three GPIO ports — A, B, and C — each with up to 16 pins. PA5 (bottom row, highlighted in red) is the on-board LED pin.   "
},
{
  "id": "fig-led-pin-connection",
  "level": "2",
  "url": "subsec-day1-board-tour.html#fig-led-pin-connection",
  "type": "Figure",
  "number": "1.2.4",
  "title": "",
  "body": " Color-coded Nucleo-64 pin map. Each header pin is shown with its Arduino label (center columns) and corresponding STM32C031C6 port\/bit name (outer columns), color-coded by function. The red box and arrow highlight D13 = PA5 (Port A, bit 5) — the on-board LED pin.   "
},
{
  "id": "subsec-day1-blinky-walkthrough",
  "level": "1",
  "url": "subsec-day1-blinky-walkthrough.html",
  "type": "Subsection",
  "number": "1.2.3",
  "title": "Part 3: Inside blinky.c",
  "body": " Part 3: Inside blinky.c  To make an LED blink, the program must do four things in order:   Turn on the clock to GPIO Port A (the peripheral is off by default).  Set PA5 to output mode so we can drive it HIGH or LOW.  Set bit 5 HIGH to turn the LED on.  Clear bit 5 LOW to turn the LED off — then repeat.   Each step is one or two lines of C. Here is the complete blinky.c source.  #include \"stm32c0xx.h\" \/\/ all register definitions live here \/\/ Bit 0 of RCC->IOPENR enables the clock for GPIOA #define GPIOAEN (1U << 0) \/\/ 0b...0001 (unsigned 32-bit) \/\/ Bit 5 of GPIOA is wired to the on-board LED #define LED_PIN (1U << 5) \/\/ 0b...0010 0000 int main(void) { RCC->IOPENR |= GPIOAEN; \/\/ Step 1: enable GPIOA clock GPIOA->MODER |= (1U << 10); \/\/ Step 2a: set bit 10 of MODER GPIOA->MODER &= ~(1U << 11);\/\/ Step 2b: clear bit 11 of MODER \/\/ → PA5 is now an output while (1) { GPIOA->ODR |= LED_PIN; \/\/ Step 3: set bit 5 → LED on for (int i = 0; i < 100000; i++); GPIOA->ODR &= ~LED_PIN; \/\/ Step 4: clear bit 5 → LED off for (int i = 0; i < 100000; i++); } return 0; \/\/ never reached }  Notice that Steps 3 and 4 sit inside while (1) — an infinite loop that never terminates. In most programming courses you are told never to write an infinite loop. Embedded programming is the exception. An MCU is not a general-purpose computer running an operating system; there is no desktop to return to, no shell to hand control back to. From the moment power is applied, the processor must keep executing. The return 0 at the end of main() is unreachable — it is there only because the C standard requires it. Any real embedded program has exactly this shape: one-time setup code before  while (1) , then the work the device does forever inside it.  Before stepping through each line, here are the three C operators used throughout blinky.c.   Left shift: 1U << n . Writing 1U << n shifts the value 1 left by n bit positions, placing a single 1 at position n and zeros everywhere else. The U suffix makes it an unsigned 32-bit integer — required to avoid undefined behavior when shifting near bit 31.  1U = 0b 0000 0000 0000 0000 0000 0000 0000 0001 (bit 0 is 1) 1U << 5 = 0b 0000 0000 0000 0000 0000 0000 0010 0000 (bit 5 is 1) 1U << 10 = 0b 0000 0000 0000 0000 0000 0100 0000 0000 (bit 10 is 1)  This single- 1 pattern is called a bit mask . Giving it a name with #define makes the code self-documenting: LED_PIN instead of an unexplained (1U << 5) .   Setting a bit: OR-assign ( |= ). The bitwise OR truth table shows what happens to each bit pair:    A (register bit)  B (mask bit)  A | B   0 0 0  0 1 1  1 0 1  1 1 1   When the mask bit is 1 , the result is always 1 — the register bit is forced high regardless of its current value. When the mask bit is 0 , the result equals the register bit — it is left unchanged. So register |= mask sets exactly the bits that are 1 in the mask, leaving all other bits untouched. A plain assignment would overwrite every other bit to zero, potentially disabling things that were already configured. Always use |= to set bits in peripheral registers.   Clearing a bit: AND-assign ( &= ) and bitwise NOT ( ~ ).  register &= value is shorthand for register = register & value — it AND-assigns any value you give it, exactly like |= is shorthand for OR-assign. The ~ operator is separate: it flips every bit of its operand. In blinky.c these two operators appear together because clearing a bit requires exactly that combination, but they can each be used on their own.    A (register bit)  B (mask bit)  A & B   0 0 0  0 1 0  1 0 0  1 1 1   When the mask bit is 0 , the result is always 0 — the register bit is forced low regardless of its current value. When the mask bit is 1 , the result equals the register bit — it is left unchanged. To force a single bit to 0 , start with a mask that has a 1 in that position, then apply ~ to invert it — producing 0 at that position and 1 s everywhere else:  LED_PIN = 0b 0000 0000 0000 0000 0000 0000 0010 0000 (bit 5 is 1) ~LED_PIN = 0b 1111 1111 1111 1111 1111 1111 1101 1111 (bit 5 is 0, rest are 1s)  AND-ing ( & ) any bit with 0 forces it to 0 ; AND with 1 leaves it unchanged. So register &= ~mask clears exactly the bits that were 1 in the mask, leaving all others untouched.  With those three operators in hand, each step of blinky.c is straightforward to read.   Step 1: Enable the GPIOA clock. By default, the clock to each GPIO port is disabled to save power. You cannot read from or write to any GPIO register until its clock is enabled. The first line of main() — RCC->IOPENR |= GPIOAEN — enables the clock to Port A; it must appear before any access to GPIOA->MODER or GPIOA->ODR .   Step 2: Configure PA5 as an output. The register that controls this is GPIOA->MODER , the Mode Register for Port A. MODER is a 32-bit register that stores the mode of every pin in Port A. Each pin can be in one of four modes: input, output, alternate function (for peripherals like UART), or analog. Because there are four possibilities, two bits are needed to encode the mode of each pin — a single bit could only represent two states. With 16 pins per port and two bits per pin, MODER is exactly 32 bits wide. The four possible two-bit encodings are:   MODER bit-pair encoding    Bits [2n+1 : 2n] Pin mode   00 Input  01 General-purpose output  10 Alternate function  11 Analog    For pin , MODER uses bits (lower) and (upper). For PA5, that is bits 10 and 11. Output mode is encoded as 01 — bit 10 set to 1 , bit 11 cleared to 0 . That is why Step 2 takes two lines: one to set bit 10, one to clear bit 11.   Why two lines?  If you only set bit 10 and bit 11 happened to be 1 already, the two-bit pattern would be 11 (analog mode) rather than 01 (output). And on this chip bit 11 is  1 at reset — most pins power up in analog mode, not input. Always explicitly clear the upper bit to guarantee the correct mode regardless of the reset state.    Steps 3 and 4: Drive PA5 high and low.  GPIOA->ODR |= LED_PIN sets bit 5 to 1 , pulling PA5 to 3.3 V and turning the LED on. GPIOA->ODR &= ~LED_PIN clears bit 5 to 0 , pulling PA5 to 0 V and turning the LED off. Inside while(1) , these two operations alternate forever — producing the blink.                    Bit Manipulation Practice   Apply the three operators from the walkthrough. Work through each task before moving to the next.     Write out the 32-bit binary value of 1U << 10 . Which bit position is the 1 ? What is the value in hexadecimal?      Based on what you just read about |= and ~ : what does GPIOA->MODER &= ~(1U << 11) do to bit 11? Explain in one sentence.      Compute 0b00001111 | 0b10100000 by hand (8-bit example). Write the result in binary. Which bits are 1 in the result, and why?      Starting from 0b11111111 , apply & 0b11110111 . What is the result? Which bit changed, and in which direction?     "
},
{
  "id": "subsec-day1-blinky-walkthrough-8",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Left shift: 1U << n . "
},
{
  "id": "subsec-day1-blinky-walkthrough-10",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-10",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "bit mask "
},
{
  "id": "subsec-day1-blinky-walkthrough-11",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-11",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Setting a bit: OR-assign ( |= ). "
},
{
  "id": "subsec-day1-blinky-walkthrough-14",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-14",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Clearing a bit: AND-assign ( &= ) and bitwise NOT ( ~ ). "
},
{
  "id": "subsec-day1-blinky-walkthrough-20",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-20",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Step 1: Enable the GPIOA clock. "
},
{
  "id": "subsec-day1-blinky-walkthrough-21",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-21",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Step 2: Configure PA5 as an output. Mode Register "
},
{
  "id": "table-moder-encoding",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#table-moder-encoding",
  "type": "Table",
  "number": "1.2.5",
  "title": "MODER bit-pair encoding",
  "body": " MODER bit-pair encoding    Bits [2n+1 : 2n] Pin mode   00 Input  01 General-purpose output  10 Alternate function  11 Analog   "
},
{
  "id": "subsec-day1-blinky-walkthrough-25",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#subsec-day1-blinky-walkthrough-25",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Steps 3 and 4: Drive PA5 high and low. "
},
{
  "id": "act-day1-bit-ops",
  "level": "2",
  "url": "subsec-day1-blinky-walkthrough.html#act-day1-bit-ops",
  "type": "Activity",
  "number": "1.2.2",
  "title": "Bit Manipulation Practice.",
  "body": " Bit Manipulation Practice   Apply the three operators from the walkthrough. Work through each task before moving to the next.     Write out the 32-bit binary value of 1U << 10 . Which bit position is the 1 ? What is the value in hexadecimal?      Based on what you just read about |= and ~ : what does GPIOA->MODER &= ~(1U << 11) do to bit 11? Explain in one sentence.      Compute 0b00001111 | 0b10100000 by hand (8-bit example). Write the result in binary. Which bits are 1 in the result, and why?      Starting from 0b11111111 , apply & 0b11110111 . What is the result? Which bit changed, and in which direction?    "
},
{
  "id": "subsec-day1-explore",
  "level": "1",
  "url": "subsec-day1-explore.html",
  "type": "Subsection",
  "number": "1.2.4",
  "title": "Part 4: Explore the Registers",
  "body": " Part 4: Explore the Registers  Each of the three setup lines in blinky.c does something specific. Predict what will happen before making each change, then verify on the board. Discuss your predictions with a neighbor.   Register Exploration    Comment out GPIOA->MODER |= (1U << 10); (leave the clock enable and the MODER clear line). Will the LED blink, stay on, or stay off? Build, flash, and confirm.      Restore the MODER line. Comment out RCC->IOPENR |= GPIOAEN; . Predict before testing.      Restore the RCC line. Replace GPIOA->ODR |= LED_PIN; with GPIOA->ODR = LED_PIN; (no |= ). Does this change behavior for a single-LED Blinky? When would it matter?     "
},
{
  "id": "act-day1-explore-registers",
  "level": "2",
  "url": "subsec-day1-explore.html#act-day1-explore-registers",
  "type": "Activity",
  "number": "1.2.3",
  "title": "Register Exploration.",
  "body": " Register Exploration    Comment out GPIOA->MODER |= (1U << 10); (leave the clock enable and the MODER clear line). Will the LED blink, stay on, or stay off? Build, flash, and confirm.      Restore the MODER line. Comment out RCC->IOPENR |= GPIOAEN; . Predict before testing.      Restore the RCC line. Replace GPIOA->ODR |= LED_PIN; with GPIOA->ODR = LED_PIN; (no |= ). Does this change behavior for a single-LED Blinky? When would it matter?    "
},
{
  "id": "subsec-day1-before-next-class",
  "level": "1",
  "url": "subsec-day1-before-next-class.html",
  "type": "Subsection",
  "number": "1.2.5",
  "title": "Before Day 1X: Design and Build in the Simulator",
  "body": " Before Day 1X: Design and Build in the Simulator  On Day 1X you will run blinkySlowToFast.c on your Nucleo: the LED starts blinking slowly, gradually speeds up, then resets and repeats. Before class, get it working in the ENGS 28 board simulator at the bottom of this page — it runs the same register-level C right in your browser and shows a simulated LED, so you can get the logic right without any hardware. In class we will port your working code to the real board.   Design and Build blinkySlowToFast in the Simulator   Design the logic first, then build it in the simulator. You already know that the delay-loop bound controls the blink rate — so the ramp is really a question of how that bound changes over time.      Design first. What variable will control the delay, and how does it change from one blink to the next? How will the program know it has reached fast and should reset to slow ? Jot the logic of main() in plain English or pseudocode before you write any C.       Warm up. Open the simulator and re-create plain Blinky — the same four steps from class. Confirm the simulated LED blinks and that you can read the register panel as your code runs.       Build it. Implement your blinkySlowToFast design in the simulator until the LED ramps slow → fast → reset → repeat. Use descriptive constant names for the starting delay, the ending delay, and the step size.      Save your working simulator code — tomorrow you will port it to the real Nucleo. Jot down one thing you are unsure will behave the same on real hardware.     Here is the simulator, loaded with blinky.c as you saw it in class. Edit it, press Run to watch the simulated LED, or Step to walk the program one line at a time and watch MODER and ODR change in the register panel. Nothing is saved for you — copy your finished code somewhere safe, or use Full screen , which carries your edits into a new tab you can bookmark.     "
},
{
  "id": "subsec-day1-before-next-class-2",
  "level": "2",
  "url": "subsec-day1-before-next-class.html#subsec-day1-before-next-class-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "ENGS 28 board simulator "
},
{
  "id": "act-day1-plan-slowtofast",
  "level": "2",
  "url": "subsec-day1-before-next-class.html#act-day1-plan-slowtofast",
  "type": "Activity",
  "number": "1.2.4",
  "title": "Design and Build blinkySlowToFast in the Simulator.",
  "body": " Design and Build blinkySlowToFast in the Simulator   Design the logic first, then build it in the simulator. You already know that the delay-loop bound controls the blink rate — so the ramp is really a question of how that bound changes over time.      Design first. What variable will control the delay, and how does it change from one blink to the next? How will the program know it has reached fast and should reset to slow ? Jot the logic of main() in plain English or pseudocode before you write any C.       Warm up. Open the simulator and re-create plain Blinky — the same four steps from class. Confirm the simulated LED blinks and that you can read the register panel as your code runs.       Build it. Implement your blinkySlowToFast design in the simulator until the LED ramps slow → fast → reset → repeat. Use descriptive constant names for the starting delay, the ending delay, and the step size.      Save your working simulator code — tomorrow you will port it to the real Nucleo. Jot down one thing you are unsure will behave the same on real hardware.    "
},
{
  "id": "subsec-day1x-copy-file",
  "level": "1",
  "url": "subsec-day1x-copy-file.html",
  "type": "Subsection",
  "number": "1.3.1",
  "title": "Part 1: Managing Multiple Source Files",
  "body": " Part 1: Managing Multiple Source Files  A C project can have only one active main() function. When you create a second .c file with its own main() , you must exclude the original from the build.  To create blinkySlowToFast.c : right-click blinky.c in the Project Explorer and choose Copy . Right-click the Src folder, choose Paste , and when prompted enter blinkySlowToFast.c as the new filename. Open the new file — this is where you will make your edits.  To exclude blinky.c from the build: right-click it, choose Resource Configurations → Exclude from Build , click Select All , then OK. The file icon changes to show it will be skipped ( ).   Right-click blinky.c in the Project Explorer and choose Resource Configurations → Exclude from Build… (highlighted in red). In the dialog that appears, click Select All so both Debug and Release configurations exclude the file, then click OK.      "
},
{
  "id": "fig-exclude-from-build",
  "level": "2",
  "url": "subsec-day1x-copy-file.html#fig-exclude-from-build",
  "type": "Figure",
  "number": "1.3.1",
  "title": "",
  "body": " Right-click blinky.c in the Project Explorer and choose Resource Configurations → Exclude from Build… (highlighted in red). In the dialog that appears, click Select All so both Debug and Release configurations exclude the file, then click OK.   "
},
{
  "id": "subsec-day1x-slowtofast",
  "level": "1",
  "url": "subsec-day1x-slowtofast.html",
  "type": "Subsection",
  "number": "1.3.2",
  "title": "Part 2: Port blinkySlowToFast to the Nucleo",
  "body": " Part 2: Port blinkySlowToFast to the Nucleo    Review, Port, and Verify   Review a partner's design first, then move your own code onto the real board.     Show a neighbor your simulator design and walk through theirs. For their approach, answer the following — then share your feedback:   What variable controls the blink rate, and how does it change from one cycle to the next?  What is the reset condition — how does the program know it has reached fast and should return to slow ?  Will the approach produce a smooth ramp, or will there be a jump? Is there an edge case where the reset might not trigger correctly?  Is there anything you would change or question?       Copy your working simulator code into blinkySlowToFast.c in STM32CubeIDE — the file you set up in Part 1. Build, flash, and confirm the LED ramps on the real board.      Did the board behave exactly like the simulator? Note any difference you see — timing, brightness, anything — and jot down why the real hardware might not match the simulation.     "
},
{
  "id": "act-blinky-slow-to-fast",
  "level": "2",
  "url": "subsec-day1x-slowtofast.html#act-blinky-slow-to-fast",
  "type": "Activity",
  "number": "1.3.1",
  "title": "Review, Port, and Verify.",
  "body": " Review, Port, and Verify   Review a partner's design first, then move your own code onto the real board.     Show a neighbor your simulator design and walk through theirs. For their approach, answer the following — then share your feedback:   What variable controls the blink rate, and how does it change from one cycle to the next?  What is the reset condition — how does the program know it has reached fast and should return to slow ?  Will the approach produce a smooth ramp, or will there be a jump? Is there an edge case where the reset might not trigger correctly?  Is there anything you would change or question?       Copy your working simulator code into blinkySlowToFast.c in STM32CubeIDE — the file you set up in Part 1. Build, flash, and confirm the LED ramps on the real board.      Did the board behave exactly like the simulator? Note any difference you see — timing, brightness, anything — and jot down why the real hardware might not match the simulation.    "
},
{
  "id": "subsec-day1x-stretch",
  "level": "1",
  "url": "subsec-day1x-stretch.html",
  "type": "Subsection",
  "number": "1.3.3",
  "title": "Part 3: Stretch Challenges",
  "body": " Part 3: Stretch Challenges  If your ramp is working on the board and you still have time, make the LED do something of your own design. Each of these uses only the on-board LED and the tools you already have — try them in the simulator or straight on the Nucleo.   Make It Your Own   Pick one to build; if you finish, try another.      Ping-pong ramp. After the LED reaches fast, have it slow smoothly back down to slow, then speed up again — a continuous back-and-forth with no hard reset.  Heartbeat. Two quick blinks close together, then a longer pause, repeating — like a pulse.  Morse code. Blink your initials in Morse — a short blink for a dot, a long one for a dash, with gaps between letters. Define constants for the dot, dash, and gap lengths.       Whatever you pick, keep every delay in a named constant so a reader can see the timing at a glance. We will look at a few of these together at the end of class.     "
},
{
  "id": "act-day1x-stretch",
  "level": "2",
  "url": "subsec-day1x-stretch.html#act-day1x-stretch",
  "type": "Activity",
  "number": "1.3.2",
  "title": "Make It Your Own.",
  "body": " Make It Your Own   Pick one to build; if you finish, try another.      Ping-pong ramp. After the LED reaches fast, have it slow smoothly back down to slow, then speed up again — a continuous back-and-forth with no hard reset.  Heartbeat. Two quick blinks close together, then a longer pause, repeating — like a pulse.  Morse code. Blink your initials in Morse — a short blink for a dot, a long one for a dash, with gaps between letters. Define constants for the dot, dash, and gap lengths.       Whatever you pick, keep every delay in a named constant so a reader can see the timing at a glance. We will look at a few of these together at the end of class.    "
},
{
  "id": "subsec-day2-c-to-hardware",
  "level": "1",
  "url": "subsec-day2-c-to-hardware.html",
  "type": "Subsection",
  "number": "1.4.1",
  "title": "Part 1: From C Code to Hardware",
  "body": " Part 1: From C Code to Hardware  When you write GPIOA->ODR |= LED_PIN , how does that one line of C actually light an LED? The path has three stages: compile, flash, execute ( ). C is a compiled language, not an interpreted one — the compiler processes your entire source file at once and produces a single binary (an .elf file) containing all the machine instructions for the whole program. The IDE then flashes that binary to the chip's 32 KB flash memory in one operation. Once the board resets, the Cortex-M0+ CPU fetches and executes those stored instructions one by one. The source lines you wrote no longer exist on the chip — only the machine instructions they were compiled into.   How a C program runs on the STM32. The compiler translates C source into machine instructions stored in flash. At run time the CPU fetches and executes each instruction in sequence. As a concrete example, the line GPIOA->ODR |= LED_PIN compiles to a load-OR-store sequence; when executed, the store to the GPIO Output Data Register drives the output pin HIGH.     Memory-mapped I\/O. The STM32C031C6 has a single 4 GB address space shared by flash, RAM, and every peripheral register ( ). There is no separate I\/O bus and no special I\/O instructions — the CPU reads and writes peripheral registers exactly the same way it reads and writes RAM. GPIOA->ODR is not a variable stored in RAM; it is a name for memory address 0x5000 0014 . When the CPU stores a value to that address, the GPIO hardware detects the write on the bus and responds immediately — within one clock cycle.   Memory map of the STM32C031C6. Flash (program code) lives at 0x0800 0000 ; RAM is at 0x2000 0000 . GPIO peripheral registers are in the IOPORT block at 0x5000 0000 . Writing to a GPIO register is simply a store to a specific address in this map — no special I\/O instruction required.     How the output pin changes voltage. Each GPIO output contains a pair of transistors — a P-MOS on top and an N-MOS on the bottom — connected between the 3.3 V supply and ground ( ). This is called a push-pull output. Writing a 1 to the ODR bit turns the P-MOS on (connecting the pin to 3.3 V) and turns the N-MOS off. Writing a 0 does the reverse: N-MOS on, P-MOS off, pin driven to 0 V. The GPIO hardware makes that transistor switch happen within nanoseconds of the CPU store. Setting MODER to output mode ( 01 ) connects this push-pull driver to the pin; in any other mode the driver is disconnected.   GPIO output configuration (from the STM32C031C6 reference manual, annotated). A write to GPIOA->ODR (bottom-left) passes through output control logic to the P-MOS\/N-MOS transistor pair, driving the I\/O pin toward the LED. ODR = 1 turns on P-MOS → pin goes HIGH (3.3 V); ODR = 0 turns on N-MOS → pin goes LOW (0 V). GPIOA->MODER (bottom-right) selects input vs. output mode.       "
},
{
  "id": "fig-how-mcu-runs",
  "level": "2",
  "url": "subsec-day2-c-to-hardware.html#fig-how-mcu-runs",
  "type": "Figure",
  "number": "1.4.1",
  "title": "",
  "body": " How a C program runs on the STM32. The compiler translates C source into machine instructions stored in flash. At run time the CPU fetches and executes each instruction in sequence. As a concrete example, the line GPIOA->ODR |= LED_PIN compiles to a load-OR-store sequence; when executed, the store to the GPIO Output Data Register drives the output pin HIGH.   "
},
{
  "id": "subsec-day2-c-to-hardware-4",
  "level": "2",
  "url": "subsec-day2-c-to-hardware.html#subsec-day2-c-to-hardware-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Memory-mapped I\/O. "
},
{
  "id": "fig-memory-map",
  "level": "2",
  "url": "subsec-day2-c-to-hardware.html#fig-memory-map",
  "type": "Figure",
  "number": "1.4.2",
  "title": "",
  "body": " Memory map of the STM32C031C6. Flash (program code) lives at 0x0800 0000 ; RAM is at 0x2000 0000 . GPIO peripheral registers are in the IOPORT block at 0x5000 0000 . Writing to a GPIO register is simply a store to a specific address in this map — no special I\/O instruction required.   "
},
{
  "id": "subsec-day2-c-to-hardware-6",
  "level": "2",
  "url": "subsec-day2-c-to-hardware.html#subsec-day2-c-to-hardware-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "How the output pin changes voltage. push-pull "
},
{
  "id": "fig-gpio-output-circuit",
  "level": "2",
  "url": "subsec-day2-c-to-hardware.html#fig-gpio-output-circuit",
  "type": "Figure",
  "number": "1.4.3",
  "title": "",
  "body": " GPIO output configuration (from the STM32C031C6 reference manual, annotated). A write to GPIOA->ODR (bottom-left) passes through output control logic to the P-MOS\/N-MOS transistor pair, driving the I\/O pin toward the LED. ODR = 1 turns on P-MOS → pin goes HIGH (3.3 V); ODR = 0 turns on N-MOS → pin goes LOW (0 V). GPIOA->MODER (bottom-right) selects input vs. output mode.   "
},
{
  "id": "subsec-day2-delay-ms",
  "level": "1",
  "url": "subsec-day2-delay-ms.html",
  "type": "Subsection",
  "number": "1.4.2",
  "title": "Part 2: A Better Delay — delay_ms()",
  "body": " Part 2: A Better Delay — delay_ms()  delay_ms()  ES28.h  The busy-wait loop produces an imprecise delay whose duration depends on the compiler optimization level and clock speed. Starting today, use the course-provided delay_ms() function. Replace the include line at the top of your source file:  \/\/ Day 1: #include \"stm32c0xx.h\" \/\/ Day 2 onward — use this instead: #include \"ES28.h\" \/\/ includes stm32c0xx.h AND the prototype for delay_ms()  With that change you can write readable, self-documenting delays:  #include \"ES28.h\" #define GPIOAEN (1U << 0) #define LED_PIN (1U << 5) int main(void) { RCC->IOPENR |= GPIOAEN; GPIOA->MODER |= (1U << 10); GPIOA->MODER &= ~(1U << 11); while (1) { GPIOA->ODR |= LED_PIN; \/\/ LED on delay_ms(1000); \/\/ wait 1 second GPIOA->ODR &= ~LED_PIN; \/\/ LED off delay_ms(500); \/\/ wait 0.5 second } return 0; }    "
},
{
  "id": "subsec-day2-breadboard",
  "level": "1",
  "url": "subsec-day2-breadboard.html",
  "type": "Subsection",
  "number": "1.4.3",
  "title": "Part 3: External LEDs on the Breadboard",
  "body": " Part 3: External LEDs on the Breadboard  breadboard  digital multimeter (DMM)  The on-board LED is convenient for software testing, but the whole point of a microcontroller is to control external devices. You will wire an LED on a breadboard, drive it from a GPIO pin, and use a digital multimeter to measure the voltages and currents in the circuit.  Your breadboard has power rails running along each long edge. Some kits come with these rails already wired to the Nucleo; if yours does not, wire them now as shown in . Use the Nucleo's 3.3 V header pin for the positive rails. Also connect all positive rails to each other and all ground rails to each other as shown — this lets you tap 3.3 V or GND from anywhere on the board. Once wired, leave all of these jumpers in place for the entire term.   The Nucleo board connected to a breadboard at the start of Lab 1. Short red and black jumper wires link the Nucleo's 3.3 V and GND header pins to the breadboard's positive and negative power rails. Leave these wires in place for the entire term.    To build the LED circuit, choose a red or green LED and a 220 Ω resistor. Wire the circuit as shown in : the GPIO pin connects to the LED anode (+, longer lead), the LED cathode (−, shorter lead) connects through the resistor to the ground rail.   External LED wired on the breadboard and driven from D13 (PA5). Green arrows show current flow: from the D13 header pin, through the LED (anode to cathode), through the 220 Ω resistor, and into the ground rail. The resistor limits current to roughly 10–15 mA. The red and black wires connect the board's 3.3 V and GND headers to the breadboard rails.    The digital multimeter ( ) is essential for verifying circuits. Set the dial to the 20 V DC range for 3.3 V circuits; turn it off when finished to preserve the battery.   The digital multimeter (DMM) from your lab kit. Turn the dial to the 20 V DC position for 3.3 V circuits. Black probe in COM, red probe in VΩmA. Turn to OFF when done.     Wire and Measure   Update your blinky program to use delay_ms(2000) (2 s on, 2 s off) so the DMM display has time to settle.     Flash your updated program. Confirm that both the on-board LED and the external LED blink.      With the LED lit, measure three voltages:   , from the power rail to ground (expect ≈ 3.3 V)  , across the LED (anode to cathode)  , across the resistor       Check your three measurements against Kirchhoff's voltage law: does ? Then calculate the current through the LED, .      Replace the 220 Ω resistor with a 1 kΩ resistor. Repeat the measurements. Calculate the new current. Is the LED brighter or dimmer? Why?      The breadboard circuit after moving the LED's anode wire from D13 to D4. Only one jumper wire is rerouted.     Nucleo-64 pinout reference showing each Arduino header label and its corresponding STM32 port and bit number. Use this to look up which MCU pin any Arduino header connects to.     Move to a New Pin   Move the LED's anode wire from D13 to D4. To make the LED blink from D4 you need to make three changes to your program: enable the correct GPIO port clock, configure the pin as an output, and drive it. Before writing any code, answer the following on paper.     Using the Nucleo-64 pinout, find which STM32 port and bit number D4 corresponds to.      In the STM32C031C6 Reference Manual , go to Section 5.4 (RCC registers) and find the RCC_IOPENR register description. Which bit enables the clock for the port you identified?      From Day 1: for pin , MODER uses bits and . What are the two MODER bit numbers for the pin you identified? What value encodes output mode?      Update your code with the values you found and verify the external LED blinks. The on-board LED (PA5) will stop blinking — that is expected.           "
},
{
  "id": "fig-nucleo-breadboard",
  "level": "2",
  "url": "subsec-day2-breadboard.html#fig-nucleo-breadboard",
  "type": "Figure",
  "number": "1.4.4",
  "title": "",
  "body": " The Nucleo board connected to a breadboard at the start of Lab 1. Short red and black jumper wires link the Nucleo's 3.3 V and GND header pins to the breadboard's positive and negative power rails. Leave these wires in place for the entire term.   "
},
{
  "id": "fig-external-led-circuit",
  "level": "2",
  "url": "subsec-day2-breadboard.html#fig-external-led-circuit",
  "type": "Figure",
  "number": "1.4.5",
  "title": "",
  "body": " External LED wired on the breadboard and driven from D13 (PA5). Green arrows show current flow: from the D13 header pin, through the LED (anode to cathode), through the 220 Ω resistor, and into the ground rail. The resistor limits current to roughly 10–15 mA. The red and black wires connect the board's 3.3 V and GND headers to the breadboard rails.   "
},
{
  "id": "fig-dmm-photo",
  "level": "2",
  "url": "subsec-day2-breadboard.html#fig-dmm-photo",
  "type": "Figure",
  "number": "1.4.6",
  "title": "",
  "body": " The digital multimeter (DMM) from your lab kit. Turn the dial to the 20 V DC position for 3.3 V circuits. Black probe in COM, red probe in VΩmA. Turn to OFF when done.   "
},
{
  "id": "act-day2-external-led",
  "level": "2",
  "url": "subsec-day2-breadboard.html#act-day2-external-led",
  "type": "Activity",
  "number": "1.4.1",
  "title": "Wire and Measure.",
  "body": " Wire and Measure   Update your blinky program to use delay_ms(2000) (2 s on, 2 s off) so the DMM display has time to settle.     Flash your updated program. Confirm that both the on-board LED and the external LED blink.      With the LED lit, measure three voltages:   , from the power rail to ground (expect ≈ 3.3 V)  , across the LED (anode to cathode)  , across the resistor       Check your three measurements against Kirchhoff's voltage law: does ? Then calculate the current through the LED, .      Replace the 220 Ω resistor with a 1 kΩ resistor. Repeat the measurements. Calculate the new current. Is the LED brighter or dimmer? Why?    "
},
{
  "id": "fig-blinky-d4",
  "level": "2",
  "url": "subsec-day2-breadboard.html#fig-blinky-d4",
  "type": "Figure",
  "number": "1.4.7",
  "title": "",
  "body": " The breadboard circuit after moving the LED's anode wire from D13 to D4. Only one jumper wire is rerouted.   "
},
{
  "id": "fig-nucleo-pinout",
  "level": "2",
  "url": "subsec-day2-breadboard.html#fig-nucleo-pinout",
  "type": "Figure",
  "number": "1.4.8",
  "title": "",
  "body": " Nucleo-64 pinout reference showing each Arduino header label and its corresponding STM32 port and bit number. Use this to look up which MCU pin any Arduino header connects to.   "
},
{
  "id": "act-day2-new-pin",
  "level": "2",
  "url": "subsec-day2-breadboard.html#act-day2-new-pin",
  "type": "Activity",
  "number": "1.4.2",
  "title": "Move to a New Pin.",
  "body": " Move to a New Pin   Move the LED's anode wire from D13 to D4. To make the LED blink from D4 you need to make three changes to your program: enable the correct GPIO port clock, configure the pin as an output, and drive it. Before writing any code, answer the following on paper.     Using the Nucleo-64 pinout, find which STM32 port and bit number D4 corresponds to.      In the STM32C031C6 Reference Manual , go to Section 5.4 (RCC registers) and find the RCC_IOPENR register description. Which bit enables the clock for the port you identified?      From Day 1: for pin , MODER uses bits and . What are the two MODER bit numbers for the pin you identified? What value encodes output mode?      Update your code with the values you found and verify the external LED blinks. The on-board LED (PA5) will stop blinking — that is expected.    "
},
{
  "id": "sec-lab1",
  "level": "1",
  "url": "sec-lab1.html",
  "type": "Subsection",
  "number": "1.4.4",
  "title": "Part 4: Lab 1 — Three-LED Experiments",
  "body": " Part 4: Lab 1 — Three-LED Experiments  Lab 1  Lab 1 extends the single-LED Blinky to a three-LED circuit ( ). Wire three LEDs through 220 Ω resistors to three separate GPIO output pins. Each sub-task asks you to write a separate C file implementing a different blinking pattern.   Three-LED circuit for Lab 1. Each LED has its own 220 Ω resistor and connects to a separate GPIO output pin. Build incrementally: get the first LED blinking before adding the second, and the second before adding the third.    Start in a new project: copy your TemplateProject and rename the copy Lab1 . Download template.c from Canvas, place it in the project's Src folder, and rename it to your first target filename. The template includes a header comment block — fill in your name, assignment, a table of I\/O pins and what they connect to, and a revision history for every file you submit.  Build and test incrementally: get one LED working before adding the second and third. Use descriptive #define names for every pin and timing constant, and keep track of your changes in comments.    blinkySIM.c — Simultaneous Blink   Write blinkySIM.c : all three LEDs blink on and off simultaneously at the same rate. All three should turn on together, pause, turn off together, pause, and repeat.  Hint: if two LEDs are on the same GPIO port, you can set (or clear) both bits with a single OR (or AND) operation rather than two separate register writes.     blinkySEQ.c — Sequential Blink   Once blinkySIM.c is working, copy it to blinkySEQ.c . Modify the on\/off logic so the three LEDs blink in sequence — only one lit at a time, cycling LED 1 → LED 2 → LED 3 → LED 1 → continuously.     blinkyCNT.c — Binary Counter   Write blinkyCNT.c : the three LEDs display a 3-bit binary count, cycling through 000, 001, 010, 011, 100, 101, 110, 111, 000, with a short pause between each step. Designate which LED represents the least significant bit and which the most.  Hint: a loop variable incrementing from 0 to 7 can be used to drive the three LEDs. Use bit-twiddling expressions to extract each bit of the counter and map it to the appropriate GPIO pin.      AI Policy for ENGS 28  You are welcome to use the course's HiTA tool (integrated in Canvas) for help. Before asking for assistance, work on the problem yourself first. If you use any AI tool, disclose it in your code comments, test the output and make sure you understand it, and be able to explain every line you submit. All comments in submitted code must be in your own words.     "
},
{
  "id": "fig-three-leds",
  "level": "2",
  "url": "sec-lab1.html#fig-three-leds",
  "type": "Figure",
  "number": "1.4.10",
  "title": "",
  "body": " Three-LED circuit for Lab 1. Each LED has its own 220 Ω resistor and connects to a separate GPIO output pin. Build incrementally: get the first LED blinking before adding the second, and the second before adding the third.   "
},
{
  "id": "act-blinky-sim",
  "level": "2",
  "url": "sec-lab1.html#act-blinky-sim",
  "type": "Exercise",
  "number": "1.4.4.1",
  "title": "blinkySIM.c — Simultaneous Blink.",
  "body": " blinkySIM.c — Simultaneous Blink   Write blinkySIM.c : all three LEDs blink on and off simultaneously at the same rate. All three should turn on together, pause, turn off together, pause, and repeat.  Hint: if two LEDs are on the same GPIO port, you can set (or clear) both bits with a single OR (or AND) operation rather than two separate register writes.   "
},
{
  "id": "act-blinky-seq",
  "level": "2",
  "url": "sec-lab1.html#act-blinky-seq",
  "type": "Exercise",
  "number": "1.4.4.2",
  "title": "blinkySEQ.c — Sequential Blink.",
  "body": " blinkySEQ.c — Sequential Blink   Once blinkySIM.c is working, copy it to blinkySEQ.c . Modify the on\/off logic so the three LEDs blink in sequence — only one lit at a time, cycling LED 1 → LED 2 → LED 3 → LED 1 → continuously.   "
},
{
  "id": "act-blinky-cnt",
  "level": "2",
  "url": "sec-lab1.html#act-blinky-cnt",
  "type": "Exercise",
  "number": "1.4.4.3",
  "title": "blinkyCNT.c — Binary Counter.",
  "body": " blinkyCNT.c — Binary Counter   Write blinkyCNT.c : the three LEDs display a 3-bit binary count, cycling through 000, 001, 010, 011, 100, 101, 110, 111, 000, with a short pause between each step. Designate which LED represents the least significant bit and which the most.  Hint: a loop variable incrementing from 0 to 7 can be used to drive the three LEDs. Use bit-twiddling expressions to extract each bit of the counter and map it to the appropriate GPIO pin.   "
},
{
  "id": "sec-bit-twiddling",
  "level": "1",
  "url": "sec-bit-twiddling.html",
  "type": "Section",
  "number": "1.5",
  "title": "Reference: Bit Twiddling",
  "body": " Reference: Bit Twiddling  bit twiddling  bitwise operators  The operations used in Blinky — setting and clearing individual bits without disturbing the rest of a register — appear in virtually every line of embedded-systems code. Collectively they are called bit twiddling . They rely on three bitwise operators whose behavior on each pair of bits is captured in these truth tables:     Bitwise OR ( | )    A B A | B   0 0 0  0 1 1  1 0 1  1 1 1     Bitwise AND ( & )    A B A & B   0 0 0  0 1 0  1 0 0  1 1 1     Bitwise XOR ( ^ )    A B A ^ B   0 0 0  0 1 1  1 0 1  1 1 0    The key insight for register programming: OR with 1 forces a bit to 1 ; OR with 0 leaves it unchanged. AND with 0 forces a bit to 0 ; AND with 1 leaves it unchanged. XOR with 1  toggles a bit (flips 0 → 1 or 1 → 0 ); XOR with 0 leaves it unchanged. The three fundamental patterns are:  \/\/ Set bit n in register NUM (force that bit to 1): NUM |= (1U << n); \/\/ Clear bit n in register NUM (force that bit to 0): NUM &= ~(1U << n); \/\/ Toggle bit n in register NUM (flip 0→1 or 1→0): NUM ^= (1U << n);  The expression (1U << n) is called a bit mask : it has exactly one 1 bit (at position ) and zeros everywhere else. The U suffix makes it an unsigned 32-bit integer, which is important when equals 31 (shifting into the sign bit of a signed int would cause undefined behavior in C).  Two additional idioms let you test whether a bit is set without modifying the register:  \/\/ Test if bit n is 0: if ((NUM & (1U << n)) == 0) { \/* bit n is 0 *\/ } \/\/ Test if bit n is 1 (non-zero): if ((NUM & (1U << n)) != 0) { \/* bit n is 1 *\/ }  AND-ing a register with a one-bit mask zeroes every bit except the one we care about. The result is either 0 (bit was 0 ) or a non-zero value (bit was 1 ).   Check Your Understanding    Suppose NUM = 0b00101101 (8-bit example). What is the value of NUM after NUM ^= (1U << 5) ?     0b00001101  Correct. Bit 5 in 0b00101101 is already 1 ; XOR with 1 toggles it to 0 , giving 0b00001101 .    0b00101101 (unchanged)  XOR with 1 always flips the bit; it does not leave it unchanged.    0b00111101  This would result from setting bit 4. Verify: (1U<<5) = 0b00100000 .    0b10101101  Check the mask position: (1U<<5) sets bit 5, which is 0b00100000 , not bit 7.       Write the single C statement that clears bit 3 in a 32-bit register named REG without changing any other bit.      "
},
{
  "id": "sec-bit-twiddling-4",
  "level": "2",
  "url": "sec-bit-twiddling.html#sec-bit-twiddling-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "bit twiddling "
},
{
  "id": "sec-bit-twiddling-8",
  "level": "2",
  "url": "sec-bit-twiddling.html#sec-bit-twiddling-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "bit mask "
},
{
  "id": "rq-toggle-example",
  "level": "2",
  "url": "rq-bit-twiddling.html#rq-toggle-example",
  "type": "Reading Question",
  "number": "1.5.1",
  "title": "",
  "body": "  Suppose NUM = 0b00101101 (8-bit example). What is the value of NUM after NUM ^= (1U << 5) ?     0b00001101  Correct. Bit 5 in 0b00101101 is already 1 ; XOR with 1 toggles it to 0 , giving 0b00001101 .    0b00101101 (unchanged)  XOR with 1 always flips the bit; it does not leave it unchanged.    0b00111101  This would result from setting bit 4. Verify: (1U<<5) = 0b00100000 .    0b10101101  Check the mask position: (1U<<5) sets bit 5, which is 0b00100000 , not bit 7.    "
},
{
  "id": "rq-clear-bit",
  "level": "2",
  "url": "rq-bit-twiddling.html#rq-clear-bit",
  "type": "Reading Question",
  "number": "1.5.2",
  "title": "",
  "body": "  Write the single C statement that clears bit 3 in a 32-bit register named REG without changing any other bit.    "
},
{
  "id": "subsec-processor-arch",
  "level": "1",
  "url": "subsec-processor-arch.html",
  "type": "Subsection",
  "number": "1.6.1",
  "title": "Processor Architecture",
  "body": " Processor Architecture  Cortex-M0+  fetch-decode-execute  The Cortex-M0+ processor contains a set of registers —fast storage locations inside the processor itself ( ). There are 13 general-purpose 32-bit registers (R0–R12) plus three special-purpose registers: SP (stack pointer, R13), LR (link register, R14), and PC (program counter, R15). All computation uses these registers; data must be loaded from memory first, processed, then written back.   The Cortex-M0+ internal register file. The processor has thirteen general-purpose 32-bit registers (R0–R12) that hold operands and results during computation, plus three special-purpose registers: SP (stack pointer, R13), LR (link register for return addresses, R14), and PC (program counter, R15). Every GPIO write ultimately passes through this register file.    When the CPU executes GPIOA->ODR |= LED_PIN , the underlying machine instructions are:   Load the current value of ODR from address 0x5000 0014 into a CPU register.  OR that value with the LED_PIN mask.  Store the result back to 0x5000 0014 .   This pattern— fetch, decode, execute —repeats for every machine instruction ( ). The processor fetches the instruction at the address in the PC, decodes what operation it encodes, executes it, then increments the PC.   The instruction fetch-decode-execute cycle, illustrated for a GPIO write. On each cycle the CPU fetches the next instruction from flash at the address in PC, decodes its opcode, executes the operation (here a store to address 0x5000 0014 ), and advances PC.    "
},
{
  "id": "subsec-processor-arch-4",
  "level": "2",
  "url": "subsec-processor-arch.html#subsec-processor-arch-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "registers "
},
{
  "id": "fig-m0plus-registers",
  "level": "2",
  "url": "subsec-processor-arch.html#fig-m0plus-registers",
  "type": "Figure",
  "number": "1.6.1",
  "title": "",
  "body": " The Cortex-M0+ internal register file. The processor has thirteen general-purpose 32-bit registers (R0–R12) that hold operands and results during computation, plus three special-purpose registers: SP (stack pointer, R13), LR (link register for return addresses, R14), and PC (program counter, R15). Every GPIO write ultimately passes through this register file.   "
},
{
  "id": "subsec-processor-arch-8",
  "level": "2",
  "url": "subsec-processor-arch.html#subsec-processor-arch-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "fetch, decode, execute "
},
{
  "id": "fig-fetch-execute",
  "level": "2",
  "url": "subsec-processor-arch.html#fig-fetch-execute",
  "type": "Figure",
  "number": "1.6.2",
  "title": "",
  "body": " The instruction fetch-decode-execute cycle, illustrated for a GPIO write. On each cycle the CPU fetches the next instruction from flash at the address in PC, decodes its opcode, executes the operation (here a store to address 0x5000 0014 ), and advances PC.   "
},
{
  "id": "subsec-memory-mapped-io",
  "level": "1",
  "url": "subsec-memory-mapped-io.html",
  "type": "Subsection",
  "number": "1.6.2",
  "title": "Memory-Mapped I\/O",
  "body": " Memory-Mapped I\/O  memory-mapped I\/O  The STM32C031C6 uses memory-mapped I\/O : peripheral registers live at specific addresses in the same 4 GB address space as flash and RAM ( ). From the CPU's perspective, writing to a GPIO register looks identical to writing to a RAM variable — but instead of storing a value in a memory cell, it changes the state of a hardware circuit.  The GPIOA base address is 0x5000 0000 . ODR is at offset 0x14 within the GPIO structure, giving absolute address 0x5000 0014 . In the STM32 header file, GPIOA is a C pointer cast to the structure's base address:  \/\/ Inside stm32c031xx.h (simplified): #define GPIOA ((GPIO_TypeDef *) 0x50000000UL) typedef struct { __IO uint32_t MODER; \/* offset 0x00 *\/ __IO uint32_t OTYPER; \/* offset 0x04 *\/ __IO uint32_t OSPEEDR; \/* offset 0x08 *\/ __IO uint32_t PUPDR; \/* offset 0x0C *\/ __IO uint32_t IDR; \/* offset 0x10 *\/ __IO uint32_t ODR; \/* offset 0x14 *\/ \/* ... *\/ } GPIO_TypeDef;  So GPIOA->ODR = value is exactly equivalent to writing to address 0x5000 0014 . The hardware detects that address on the bus and routes the write to the GPIO output latch rather than to RAM.   Locating GPIOA->ODR in the address space. The IOPORT block (left, green) expands to show each GPIO port's 1 KB range; GPIOA sits at 0x5000 0000 – 0x5000 03FF (green box, right table). Within GPIOA, the register offset table shows ODR at offset 0x14 (green box). The blue callout explains the bus write: the processor places data, address, and a write signal on the bus; only the peripheral whose address matches activates and latches the data. The address calculation is shown at the bottom: 0x5000 0000 + 0x14 = 0x5000 0014 .    "
},
{
  "id": "subsec-memory-mapped-io-3",
  "level": "2",
  "url": "subsec-memory-mapped-io.html#subsec-memory-mapped-io-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "memory-mapped I\/O "
},
{
  "id": "fig-odr-address",
  "level": "2",
  "url": "subsec-memory-mapped-io.html#fig-odr-address",
  "type": "Figure",
  "number": "1.6.3",
  "title": "",
  "body": " Locating GPIOA->ODR in the address space. The IOPORT block (left, green) expands to show each GPIO port's 1 KB range; GPIOA sits at 0x5000 0000 – 0x5000 03FF (green box, right table). Within GPIOA, the register offset table shows ODR at offset 0x14 (green box). The blue callout explains the bus write: the processor places data, address, and a write signal on the bus; only the peripheral whose address matches activates and latches the data. The address calculation is shown at the bottom: 0x5000 0000 + 0x14 = 0x5000 0014 .   "
},
{
  "id": "rq-mcu-architecture",
  "level": "1",
  "url": "rq-mcu-architecture.html",
  "type": "Check Your Understanding",
  "number": "1.6.3",
  "title": "Check Your Understanding",
  "body": " Check Your Understanding    What does memory-mapped I\/O mean for the STM32C031C6?     Peripheral registers (like GPIO ODR) are placed at specific addresses in the CPU's address space, so reading and writing them uses the same load\/store instructions as accessing ordinary RAM.  Correct. The CPU does not need special I\/O instructions; a store to 0x5000 0014 changes the GPIO output just as a store to a RAM variable changes that variable.    The microcontroller maps the contents of RAM to GPIO pins at startup.  No. Memory mapping refers to the address layout of the address space, not to copying RAM contents to pins.    GPIO registers are stored in flash memory alongside program code.  No. Flash is at 0x0800 0000 ; GPIO registers are at 0x5000 0000 —separate address regions.    The IDE maps source-code line numbers to machine instruction addresses.  That is debug-symbol mapping, a completely different concept.       List the three steps in the fetch-decode-execute cycle and briefly describe what happens at each step for the instruction GPIOA->ODR |= LED_PIN .     "
},
{
  "id": "rq-memory-mapped",
  "level": "2",
  "url": "rq-mcu-architecture.html#rq-memory-mapped",
  "type": "Reading Question",
  "number": "1.6.3.1",
  "title": "",
  "body": "  What does memory-mapped I\/O mean for the STM32C031C6?     Peripheral registers (like GPIO ODR) are placed at specific addresses in the CPU's address space, so reading and writing them uses the same load\/store instructions as accessing ordinary RAM.  Correct. The CPU does not need special I\/O instructions; a store to 0x5000 0014 changes the GPIO output just as a store to a RAM variable changes that variable.    The microcontroller maps the contents of RAM to GPIO pins at startup.  No. Memory mapping refers to the address layout of the address space, not to copying RAM contents to pins.    GPIO registers are stored in flash memory alongside program code.  No. Flash is at 0x0800 0000 ; GPIO registers are at 0x5000 0000 —separate address regions.    The IDE maps source-code line numbers to machine instruction addresses.  That is debug-symbol mapping, a completely different concept.    "
},
{
  "id": "rq-fetch-execute",
  "level": "2",
  "url": "rq-mcu-architecture.html#rq-fetch-execute",
  "type": "Reading Question",
  "number": "1.6.3.2",
  "title": "",
  "body": "  List the three steps in the fetch-decode-execute cycle and briefly describe what happens at each step for the instruction GPIOA->ODR |= LED_PIN .    "
},
{
  "id": "subsec-reading-a-pin",
  "level": "1",
  "url": "subsec-reading-a-pin.html",
  "type": "Subsection",
  "number": "2.1.1",
  "title": "Reading a Pin: The Input Data Register",
  "body": " Reading a Pin: The Input Data Register  When a GPIO pin is configured as an input, the STM32 continuously samples the voltage present on that pin and reflects it in the Input Data Register (IDR). Like the ODR, the IDR is a 16-bit register — one bit per pin in the port. Bit 13 of GPIOC->IDR , for example, reflects the current voltage on PC13, which is where the Nucleo board's blue user button is connected. If the pin is at 3.3 V, the bit reads 1; if it is at 0 V, the bit reads 0.  The input circuitry does not interpret voltage as a strict binary threshold at a single point. Instead, there are two separate thresholds. Any voltage below (the maximum low input voltage, roughly on a 3.3 V system) is reliably read as logic 0. Any voltage above (the minimum high input voltage, roughly ) is reliably read as logic 1. Voltages in between fall in an indeterminate zone where the result is unpredictable.  In normal digital circuits — where signals are driven cleanly to ground or the supply rail — you stay well outside this zone and never notice it. It becomes important when signals are slow to transition (for example, a slowly rising voltage from a large RC filter), when there is significant noise on a line, or when interfacing devices that operate at different supply voltages.  Reading a button in code is therefore straightforward in practice, as long as the pin voltage is always driven firmly to one rail or the other. The subtleties arise not from the reading itself but from what the hardware is doing — or not doing — when the button is open.  "
},
{
  "id": "subsec-reading-a-pin-2",
  "level": "2",
  "url": "subsec-reading-a-pin.html#subsec-reading-a-pin-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Input Data Register "
},
{
  "id": "subsec-reading-a-pin-3",
  "level": "2",
  "url": "subsec-reading-a-pin.html#subsec-reading-a-pin-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": ""
},
{
  "id": "subsec-floating-pins",
  "level": "1",
  "url": "subsec-floating-pins.html",
  "type": "Subsection",
  "number": "2.1.2",
  "title": "Floating Pins and Pull-up Resistors",
  "body": " Floating Pins and Pull-up Resistors  When a pushbutton is open (not pressed), it disconnects the pin from whatever it was connected to. If nothing else is driving the pin, the pin is said to be floating : its voltage is undefined, drifting with electrical noise, nearby signals, and even the movement of your hand near the board. Reading a floating pin produces unpredictable 0s and 1s that have nothing to do with the button state.  The standard fix is a pull-up resistor : a resistor connected between the pin and the supply voltage (3.3 V). When the button is open, the resistor gently pulls the pin to 3.3 V, giving it a well-defined logic 1. When the button is pressed and connects the pin to ground, the ground wins and the pin reads logic 0. This active-low convention — pressed = 0, released = 1 — is the most common arrangement for buttons.  Alternatively, a pull-down resistor connects the pin to ground, so the unpressed state reads 0 and pressing (which connects to 3.3 V) reads 1. The STM32 has pull-up and pull-down resistors built into the chip, selectable per pin via the Pull-up\/Pull-down Register (PUPDR), so in most cases you do not need an external resistor at all.  "
},
{
  "id": "subsec-floating-pins-2",
  "level": "2",
  "url": "subsec-floating-pins.html#subsec-floating-pins-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "floating "
},
{
  "id": "subsec-floating-pins-3",
  "level": "2",
  "url": "subsec-floating-pins.html#subsec-floating-pins-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "pull-up resistor "
},
{
  "id": "subsec-floating-pins-4",
  "level": "2",
  "url": "subsec-floating-pins.html#subsec-floating-pins-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "pull-down resistor Pull-up\/Pull-down Register "
},
{
  "id": "subsec-contact-bounce",
  "level": "1",
  "url": "subsec-contact-bounce.html",
  "type": "Subsection",
  "number": "2.1.3",
  "title": "Contact Bounce",
  "body": " Contact Bounce  Even with a stable pull-up, mechanical buttons introduce a second problem: contact bounce . The metal contacts inside a switch are tiny springy leaves. When you press or release the button, they do not make clean, instantaneous contact — they collide, rebound, collide again, and chatter back and forth for anywhere from a few hundred microseconds to a few milliseconds before settling. During this chatter, the pin toggles between 0 and 1 dozens of times in rapid succession.  To a human finger, a press and release takes tens of milliseconds — plenty of time to do something once. But to a microcontroller running at 12 MHz, those milliseconds contain millions of instruction cycles. If your code detects a rising or falling edge on the pin, it may see 50 edges in the time your finger takes to press once. Depending on what action each edge triggers — incrementing a counter, toggling an LED, sending a message — this can cause serious errors.  There are two main strategies for eliminating bounce, which this chapter covers in detail:   Hardware debouncing adds an RC filter (a resistor and capacitor) that smooths out the fast chatter. The capacitor cannot charge or discharge instantaneously, so the rapid bounces are averaged away before they reach the pin.   Software debouncing ignores the pin for a short time after detecting the first edge, letting the bounce die out before sampling again. A simple approach waits a fixed delay (say, 20 ms) after the first transition and then reads the pin's stable final state. More robust approaches use a state machine that requires the pin to hold a consistent value for several consecutive samples before accepting it as a real transition.  "
},
{
  "id": "subsec-contact-bounce-2",
  "level": "2",
  "url": "subsec-contact-bounce.html#subsec-contact-bounce-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "contact bounce "
},
{
  "id": "subsec-contact-bounce-5",
  "level": "2",
  "url": "subsec-contact-bounce.html#subsec-contact-bounce-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Hardware debouncing "
},
{
  "id": "subsec-contact-bounce-6",
  "level": "2",
  "url": "subsec-contact-bounce.html#subsec-contact-bounce-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Software debouncing "
},
{
  "id": "rq-switches-concepts",
  "level": "1",
  "url": "rq-switches-concepts.html",
  "type": "Check Your Understanding",
  "number": "2.1.4",
  "title": "Check Your Understanding",
  "body": "  A GPIO pin is configured as an input with no pull-up or pull-down resistor enabled, and nothing is connected to it. What value will GPIOC->IDR show for that pin?    An unpredictable value — the pin is floating and its voltage is undefined.  Correct. A floating pin picks up electrical noise and nearby signals, so its IDR bit cannot be trusted. Always enable a pull-up or pull-down, or supply an external one.    Always 0, because an undriven pin defaults to ground.  An undriven pin does not default to ground — it floats. Only a pull-down resistor would guarantee a 0.    Always 1, because the STM32 has an implicit internal pull-up on every pin.  The STM32's internal pull-ups must be explicitly enabled in PUPDR. They are off by default.    The last value that was written to the ODR for that pin.  The IDR reflects the voltage present on the pin, not what was last written to the ODR. In input mode the ODR value is irrelevant to what IDR reads.      A button connects PC13 to ground when pressed. An internal pull-up is enabled on PC13. You write if (GPIOC->IDR & (1U << 13)) to detect a press. Will this detect the button press correctly?    No — with an active-low button, pressing gives IDR bit 13 = 0, so the condition is false when pressed and true when released.  Correct. The pull-up holds the pin HIGH (1) when open; pressing pulls it LOW (0). To detect a press, the condition should check for 0, not 1 — for example, !(GPIOC->IDR & (1U << 13)) .    Yes — the pull-up drives the pin HIGH when pressed, so bit 13 is 1 and the condition is true.  It is the opposite: pressing connects the pin to ground, overriding the pull-up and driving the pin LOW (0). The pull-up is active when the button is open , not when it is pressed.    Yes — the IDR always returns 1 for pins with pull-ups enabled, regardless of button state.  The pull-up sets the default state to 1 only when nothing else is driving the pin. A pressed button actively drives it to 0, overriding the pull-up.    No — you cannot read a pin that has a pull-up enabled; PUPDR and IDR cannot be used simultaneously.  Pull-ups and IDR work together — that is exactly how buttons are normally wired. The pull-up sets the default level; IDR reads whatever voltage is currently on the pin.      Your code increments a counter each time it detects a falling edge on a button pin. After pressing the button once slowly and deliberately, the counter shows 23. What is the most likely explanation?    Contact bounce — the button contacts chattering during the press generated 23 falling edges instead of one.  Correct. Without debouncing, each press can produce many edges as the contacts bounce. The solution is hardware debouncing (RC filter) or software debouncing (ignore edges for ~20 ms after the first one).    The pull-up resistor value is too large, causing the pin to charge slowly and cross the threshold multiple times.  A large pull-up slows the rise time but does not by itself cause multiple threshold crossings — the signal rises monotonically. Multiple edges are the signature of bounce.    The microcontroller's clock is too fast, so it samples the IDR more times than expected during a single press.  The clock speed is irrelevant here — the issue is not how often IDR is sampled but how many actual edges appear on the pin due to bouncing contacts.    The counter variable overflowed and wrapped around to 23.  A counter starting at 0 would need to overflow past its maximum value to wrap to 23 — unlikely for a single press. The extra counts come from bounce, not overflow.     "
},
{
  "id": "rq-floating-pin",
  "level": "2",
  "url": "rq-switches-concepts.html#rq-floating-pin",
  "type": "Reading Question",
  "number": "2.1.4.1",
  "title": "",
  "body": " A GPIO pin is configured as an input with no pull-up or pull-down resistor enabled, and nothing is connected to it. What value will GPIOC->IDR show for that pin?    An unpredictable value — the pin is floating and its voltage is undefined.  Correct. A floating pin picks up electrical noise and nearby signals, so its IDR bit cannot be trusted. Always enable a pull-up or pull-down, or supply an external one.    Always 0, because an undriven pin defaults to ground.  An undriven pin does not default to ground — it floats. Only a pull-down resistor would guarantee a 0.    Always 1, because the STM32 has an implicit internal pull-up on every pin.  The STM32's internal pull-ups must be explicitly enabled in PUPDR. They are off by default.    The last value that was written to the ODR for that pin.  The IDR reflects the voltage present on the pin, not what was last written to the ODR. In input mode the ODR value is irrelevant to what IDR reads.    "
},
{
  "id": "rq-active-low",
  "level": "2",
  "url": "rq-switches-concepts.html#rq-active-low",
  "type": "Reading Question",
  "number": "2.1.4.2",
  "title": "",
  "body": " A button connects PC13 to ground when pressed. An internal pull-up is enabled on PC13. You write if (GPIOC->IDR & (1U << 13)) to detect a press. Will this detect the button press correctly?    No — with an active-low button, pressing gives IDR bit 13 = 0, so the condition is false when pressed and true when released.  Correct. The pull-up holds the pin HIGH (1) when open; pressing pulls it LOW (0). To detect a press, the condition should check for 0, not 1 — for example, !(GPIOC->IDR & (1U << 13)) .    Yes — the pull-up drives the pin HIGH when pressed, so bit 13 is 1 and the condition is true.  It is the opposite: pressing connects the pin to ground, overriding the pull-up and driving the pin LOW (0). The pull-up is active when the button is open , not when it is pressed.    Yes — the IDR always returns 1 for pins with pull-ups enabled, regardless of button state.  The pull-up sets the default state to 1 only when nothing else is driving the pin. A pressed button actively drives it to 0, overriding the pull-up.    No — you cannot read a pin that has a pull-up enabled; PUPDR and IDR cannot be used simultaneously.  Pull-ups and IDR work together — that is exactly how buttons are normally wired. The pull-up sets the default level; IDR reads whatever voltage is currently on the pin.    "
},
{
  "id": "rq-bounce-consequence",
  "level": "2",
  "url": "rq-switches-concepts.html#rq-bounce-consequence",
  "type": "Reading Question",
  "number": "2.1.4.3",
  "title": "",
  "body": " Your code increments a counter each time it detects a falling edge on a button pin. After pressing the button once slowly and deliberately, the counter shows 23. What is the most likely explanation?    Contact bounce — the button contacts chattering during the press generated 23 falling edges instead of one.  Correct. Without debouncing, each press can produce many edges as the contacts bounce. The solution is hardware debouncing (RC filter) or software debouncing (ignore edges for ~20 ms after the first one).    The pull-up resistor value is too large, causing the pin to charge slowly and cross the threshold multiple times.  A large pull-up slows the rise time but does not by itself cause multiple threshold crossings — the signal rises monotonically. Multiple edges are the signature of bounce.    The microcontroller's clock is too fast, so it samples the IDR more times than expected during a single press.  The clock speed is irrelevant here — the issue is not how often IDR is sampled but how many actual edges appear on the pin due to bouncing contacts.    The counter variable overflowed and wrapped around to 23.  A counter starting at 0 would need to overflow past its maximum value to wrap to 23 — unlikely for a single press. The extra counts come from bounce, not overflow.    "
},
{
  "id": "subsec-day3-code-review",
  "level": "1",
  "url": "subsec-day3-code-review.html",
  "type": "Subsection",
  "number": "2.2.1",
  "title": "Part 1: Code Review — blinkyCNT.c",
  "body": " Part 1: Code Review — blinkyCNT.c  Share your blinkyCNT.c from Lab 1 within your table group. Read each other's solutions, and explain the approach you used to display a 3-bit binary count on three LEDs.   blinkyCNT Code Review   Read your partners' code. Can you follow the logic? For each solution you read, identify how bits are placed into the correct LED positions in GPIOA->ODR .    Compare the approach in the code below with your own. What does the shift count << LED1_BIT accomplish? Why is it necessary to clear the LED bits first?  \/\/ Clear the three LED bits, then write the new count GPIOA->ODR &= ~LED_ALL; GPIOA->ODR |= (count << LED1_BIT);          "
},
{
  "id": "act-day3-code-review",
  "level": "2",
  "url": "subsec-day3-code-review.html#act-day3-code-review",
  "type": "Activity",
  "number": "2.2.1",
  "title": "blinkyCNT Code Review.",
  "body": " blinkyCNT Code Review   Read your partners' code. Can you follow the logic? For each solution you read, identify how bits are placed into the correct LED positions in GPIOA->ODR .    Compare the approach in the code below with your own. What does the shift count << LED1_BIT accomplish? Why is it necessary to clear the LED bits first?  \/\/ Clear the three LED bits, then write the new count GPIOA->ODR &= ~LED_ALL; GPIOA->ODR |= (count << LED1_BIT);   "
},
{
  "id": "subsec-day3-ad2",
  "level": "1",
  "url": "subsec-day3-ad2.html",
  "type": "Subsection",
  "number": "2.2.2",
  "title": "Part 2: The Analog Discovery 2 Oscilloscope",
  "body": " Part 2: The Analog Discovery 2 Oscilloscope  The Analog Discovery 2 (AD2) is a compact USB instrument that combines a two-channel oscilloscope, a waveform generator, a logic analyzer, and more in a pocket-sized package. Plug it into your laptop and open the Waveforms application — it shows you the actual voltages on your circuit as they change.   The Analog Discovery 2 (AD2). The USB port connects to a laptop running Waveforms. The multicolored flying lead cables connect to your breadboard and Nucleo board.     The AD2 connects to your circuit through flexible flying leads — color-coded wires that plug directly into breadboard holes. The two oscilloscope channels are labeled 1+ \/ 1− (orange) and 2+ \/ 2− (blue). The minus leads have a white stripe — always connect these to your circuit's GND rail.   AD2 flying-lead connector pinout. Channels 1 and 2 each have a plus (signal) lead and a minus (ground reference) lead with a white stripe. Additional leads support the waveform generator, digital I\/O, and power supply, covered in later labs.      Connect the minus leads to GND, then connect channel 1's plus lead to one LED anode and channel 2's plus lead to a second LED anode, as shown below. Load blinkySEQ.c onto your Nucleo.   Wiring the AD2 to observe two of the three LEDs from Lab 1. The minus (white-stripe) leads connect to ground; the plus leads of channels 1 and 2 connect to two LED anodes.     Open Scope in Waveforms and press Run . Four controls you will use constantly: Time Base — how much time fits across the screen (100 ms\/div for a full blink cycle; 20 µs\/div to reveal switch bounce). Range — the vertical scale in volts per division; adjust until the waveform fills roughly half the screen height. Offset — shifts a channel up or down; use this to separate overlapping traces. Trigger — starts the capture when a signal crosses a threshold, useful for catching a single button press.   Waveforms scope view of a sequentially-blinking LED program. Orange (CH1) and blue (CH2) pulses alternate; each is about 100 ms wide. The settings panel (right) shows Time Base at 100 ms\/div, both channels at 2 V\/div, with an offset on CH2 to keep the traces from overlapping.        To measure a time interval precisely, use the cursor tool: drag two vertical cursor lines to the rising and falling edges of a pulse and the toolbar shows the time difference between them.   Using the Waveforms cursor tool to measure pulse width. Two vertical cursors bracket one LED pulse; the toolbar shows the time difference.      Exploring the Oscilloscope   Load blinkySEQ.c onto your Nucleo. Wire the AD2: minus (white-stripe) leads to GND, channel 1 plus lead to one LED anode, channel 2 plus lead to a second LED anode.    Run the scope and observe both channels. Then experiment with the following settings and answer each question at your table:   What does Time Base control? What value shows one full blink cycle across the screen?  What does Range control? Set it so the waveform fills roughly half the vertical space.  What does Offset do? How do you use it to separate two overlapping channels?  What voltage does the scope measure on a GPIO pin when the LED connected to it is on?     Measure the pulse width of one LED's ON period using the cursor tool. Place two vertical cursors at the rising and falling edges of a single pulse and read the time difference from the toolbar. Does it match the delay_ms value in your code?    Open your blinkySIM project, change the delays to 1 ms ON \/ 10 ms OFF, and flash it to your Nucleo. Observe the LED brightness and the waveform on the scope. Then swap to 10 ms ON \/ 1 ms OFF and flash again. How does brightness change, and why?    You want to observe a switch bounce that lasts about 1 ms. Which time base setting would you choose, and why?    Save a screenshot of your scope view: File → Export → Image tab → Save . You will need this skill for all future lab reports.    "
},
{
  "id": "subsec-day3-ad2-2",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Analog Discovery 2 "
},
{
  "id": "fig-ad2-photo",
  "level": "2",
  "url": "subsec-day3-ad2.html#fig-ad2-photo",
  "type": "Figure",
  "number": "2.2.1",
  "title": "",
  "body": " The Analog Discovery 2 (AD2). The USB port connects to a laptop running Waveforms. The multicolored flying lead cables connect to your breadboard and Nucleo board.   "
},
{
  "id": "subsec-day3-ad2-5",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "flying leads "
},
{
  "id": "fig-ad2-pinout",
  "level": "2",
  "url": "subsec-day3-ad2.html#fig-ad2-pinout",
  "type": "Figure",
  "number": "2.2.2",
  "title": "",
  "body": " AD2 flying-lead connector pinout. Channels 1 and 2 each have a plus (signal) lead and a minus (ground reference) lead with a white stripe. Additional leads support the waveform generator, digital I\/O, and power supply, covered in later labs.   "
},
{
  "id": "fig-ad2-wiring",
  "level": "2",
  "url": "subsec-day3-ad2.html#fig-ad2-wiring",
  "type": "Figure",
  "number": "2.2.4",
  "title": "",
  "body": " Wiring the AD2 to observe two of the three LEDs from Lab 1. The minus (white-stripe) leads connect to ground; the plus leads of channels 1 and 2 connect to two LED anodes.   "
},
{
  "id": "subsec-day3-ad2-11",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-11",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Time Base Range Offset Trigger "
},
{
  "id": "fig-ad2-waveform",
  "level": "2",
  "url": "subsec-day3-ad2.html#fig-ad2-waveform",
  "type": "Figure",
  "number": "2.2.5",
  "title": "",
  "body": " Waveforms scope view of a sequentially-blinking LED program. Orange (CH1) and blue (CH2) pulses alternate; each is about 100 ms wide. The settings panel (right) shows Time Base at 100 ms\/div, both channels at 2 V\/div, with an offset on CH2 to keep the traces from overlapping.      "
},
{
  "id": "subsec-day3-ad2-14",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-14",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "cursor "
},
{
  "id": "fig-ad2-cursors",
  "level": "2",
  "url": "subsec-day3-ad2.html#fig-ad2-cursors",
  "type": "Figure",
  "number": "2.2.7",
  "title": "",
  "body": " Using the Waveforms cursor tool to measure pulse width. Two vertical cursors bracket one LED pulse; the toolbar shows the time difference.   "
},
{
  "id": "act-day3-ad2-explore",
  "level": "2",
  "url": "subsec-day3-ad2.html#act-day3-ad2-explore",
  "type": "Activity",
  "number": "2.2.2",
  "title": "Exploring the Oscilloscope.",
  "body": " Exploring the Oscilloscope   Load blinkySEQ.c onto your Nucleo. Wire the AD2: minus (white-stripe) leads to GND, channel 1 plus lead to one LED anode, channel 2 plus lead to a second LED anode.    Run the scope and observe both channels. Then experiment with the following settings and answer each question at your table:   What does Time Base control? What value shows one full blink cycle across the screen?  What does Range control? Set it so the waveform fills roughly half the vertical space.  What does Offset do? How do you use it to separate two overlapping channels?  What voltage does the scope measure on a GPIO pin when the LED connected to it is on?     Measure the pulse width of one LED's ON period using the cursor tool. Place two vertical cursors at the rising and falling edges of a single pulse and read the time difference from the toolbar. Does it match the delay_ms value in your code?    Open your blinkySIM project, change the delays to 1 ms ON \/ 10 ms OFF, and flash it to your Nucleo. Observe the LED brightness and the waveform on the scope. Then swap to 10 ms ON \/ 1 ms OFF and flash again. How does brightness change, and why?    You want to observe a switch bounce that lasts about 1 ms. Which time base setting would you choose, and why?    Save a screenshot of your scope view: File → Export → Image tab → Save . You will need this skill for all future lab reports.   "
},
{
  "id": "subsec-day3-inputs",
  "level": "1",
  "url": "subsec-day3-inputs.html",
  "type": "Subsection",
  "number": "2.2.3",
  "title": "Part 3: Wiring and Reading a Digital Input",
  "body": " Part 3: Wiring and Reading a Digital Input  Add a pushbutton to your breadboard as shown below. Use D5 (PB4) specifically — the button.c starter code is written for PB4. Wire one side of the button to D5 and the other side to GND.   Breadboard wiring for a pushbutton connected to a GPIO input. The button bridges two rows of the breadboard; one terminal goes to the GPIO pin, the other to GND. The Nucleo's internal pull-up resistor keeps the pin HIGH when the button is open.     Without any extra circuitry, an unconnected GPIO pin floats : its voltage drifts with electrical noise and reading it produces random 0s and 1s. The fix is a pull-up resistor between the pin and 3.3 V. When the button is open, the resistor holds the pin firmly HIGH. Pressing the button connects the pin to GND and pulls it LOW. This active-low convention — pressed = 0, released = 1 — is the standard arrangement for buttons. The STM32 has built-in ~40 kΩ pull-up resistors that you enable in software; no external resistor is needed.   Alternative wiring using an external pull-up resistor between the power rail and the button. The resistor holds the pin HIGH when the button is open; pressing the button pulls it LOW. On the STM32 we use the built-in internal pull-up instead, so no external resistor is needed.      One GPIO bit: read path (pin → Schmitt trigger → IDR) and write path (ODR → output control → pin).       The same bit wired to a button: the internal pull-up holds the pin HIGH when the switch is open; closing it pulls the pin LOW (blue path into IDR).     Three registers control GPIO input behavior on the STM32. GPIOx→MODER (where x is the port letter: A, B, C, D, or F) sets the pin mode — input, output, alternate function, or analog. GPIOx→PUPDR turns the internal pull-up or pull-down on or off. GPIOx→IDR is read-only: each bit reflects the current logic level on the corresponding pin. The specific bit values for each setting are in the reference manual.   Registers for a GPIO input: MODER (mode), PUPDR (pull-up\/down), IDR (live level). Blue path: button → pull-up → Schmitt trigger → IDR.        Finding Configuration Details in the Reference Manual   You know what MODER, PUPDR, and IDR do — but not yet the specific bit values to write. Open the STM32C031 reference manual , navigate to the General-purpose I\/Os (GPIO) section via the table of contents, then go to Section 6.4 GPIO registers . Looking up register details in the reference manual is something you will keep doing in this course.    Find GPIOx_MODER (Section 6.4.1). What two-bit value selects input mode? What is the power-on default for all pins?    Find GPIOx_PUPDR . Which two-bit value enables the internal pull-up? Write the C statements that enable the pull-up on PB4 (pin 4 of Port B), using bit masks.      Reading a Button in Code   In STM32CubeIDE, make a copy of your TemplateProject and name the copy Buttons . Then download button.c from Canvas and place it in the Src folder of your new project. Read through the code, then answer the questions below before flashing it.    The code calls delay_ms(50) immediately after enabling the pull-up resistor. Why? What do you think would happen if you removed that line?    The main loop uses (GPIOB->IDR & BUTTON_PIN) == 0 to detect a button press. Why == 0 rather than != 0 ?    Flash the code and verify: pressing the button turns on the LED; releasing turns it off. Then modify blinkySEQ.c so that pressing the button interrupts the sequence and lights all three LEDs; releasing returns to the sequence.     Oscilloscope trace of the pin voltage rising after the internal pull-up is enabled. The pin reaches the HIGH threshold in about 2.5 µs; reading IDR before it settles returns a spurious 0.      "
},
{
  "id": "fig-pushbutton-wiring",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-pushbutton-wiring",
  "type": "Figure",
  "number": "2.2.8",
  "title": "",
  "body": " Breadboard wiring for a pushbutton connected to a GPIO input. The button bridges two rows of the breadboard; one terminal goes to the GPIO pin, the other to GND. The Nucleo's internal pull-up resistor keeps the pin HIGH when the button is open.   "
},
{
  "id": "subsec-day3-inputs-5",
  "level": "2",
  "url": "subsec-day3-inputs.html#subsec-day3-inputs-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "floats pull-up resistor active-low "
},
{
  "id": "fig-pushbutton-schematic",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-pushbutton-schematic",
  "type": "Figure",
  "number": "2.2.9",
  "title": "",
  "body": " Alternative wiring using an external pull-up resistor between the power rail and the button. The resistor holds the pin HIGH when the button is open; pressing the button pulls it LOW. On the STM32 we use the built-in internal pull-up instead, so no external resistor is needed.   "
},
{
  "id": "fig-io-port-bit",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-io-port-bit",
  "type": "Figure",
  "number": "2.2.10",
  "title": "",
  "body": " One GPIO bit: read path (pin → Schmitt trigger → IDR) and write path (ODR → output control → pin).   "
},
{
  "id": "fig-switch-port-bit",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-switch-port-bit",
  "type": "Figure",
  "number": "2.2.11",
  "title": "",
  "body": " The same bit wired to a button: the internal pull-up holds the pin HIGH when the switch is open; closing it pulls the pin LOW (blue path into IDR).   "
},
{
  "id": "fig-input-config-diagram",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-input-config-diagram",
  "type": "Figure",
  "number": "2.2.12",
  "title": "",
  "body": " Registers for a GPIO input: MODER (mode), PUPDR (pull-up\/down), IDR (live level). Blue path: button → pull-up → Schmitt trigger → IDR.   "
},
{
  "id": "act-day3-ref-manual",
  "level": "2",
  "url": "subsec-day3-inputs.html#act-day3-ref-manual",
  "type": "Activity",
  "number": "2.2.3",
  "title": "Finding Configuration Details in the Reference Manual.",
  "body": " Finding Configuration Details in the Reference Manual   You know what MODER, PUPDR, and IDR do — but not yet the specific bit values to write. Open the STM32C031 reference manual , navigate to the General-purpose I\/Os (GPIO) section via the table of contents, then go to Section 6.4 GPIO registers . Looking up register details in the reference manual is something you will keep doing in this course.    Find GPIOx_MODER (Section 6.4.1). What two-bit value selects input mode? What is the power-on default for all pins?    Find GPIOx_PUPDR . Which two-bit value enables the internal pull-up? Write the C statements that enable the pull-up on PB4 (pin 4 of Port B), using bit masks.   "
},
{
  "id": "act-day3-button-c",
  "level": "2",
  "url": "subsec-day3-inputs.html#act-day3-button-c",
  "type": "Activity",
  "number": "2.2.4",
  "title": "Reading a Button in Code.",
  "body": " Reading a Button in Code   In STM32CubeIDE, make a copy of your TemplateProject and name the copy Buttons . Then download button.c from Canvas and place it in the Src folder of your new project. Read through the code, then answer the questions below before flashing it.    The code calls delay_ms(50) immediately after enabling the pull-up resistor. Why? What do you think would happen if you removed that line?    The main loop uses (GPIOB->IDR & BUTTON_PIN) == 0 to detect a button press. Why == 0 rather than != 0 ?    Flash the code and verify: pressing the button turns on the LED; releasing turns it off. Then modify blinkySEQ.c so that pressing the button interrupts the sequence and lights all three LEDs; releasing returns to the sequence.   "
},
{
  "id": "fig-pullup-settling",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-pullup-settling",
  "type": "Figure",
  "number": "2.2.15",
  "title": "",
  "body": " Oscilloscope trace of the pin voltage rising after the internal pull-up is enabled. The pin reaches the HIGH threshold in about 2.5 µs; reading IDR before it settles returns a spurious 0.   "
},
{
  "id": "subsec-day3-button-exercises",
  "level": "1",
  "url": "subsec-day3-button-exercises.html",
  "type": "Subsection",
  "number": "2.2.4",
  "title": "Part 4: Button Exercises",
  "body": " Part 4: Button Exercises  These exercises are a head start on Lab 2. You may not finish them in class — that is fine.   Button Exercises   Modify blinkyCNT.c so that pressing the button pauses the counter and releasing resumes it.     Homework (due Thursday): Write toggleLED.c so the on-board LED toggles each time the button is pressed and released: first press turns LED on, second press turns it off, and so on. You will likely observe erratic behavior ( glitches ) — bring your observations to class tomorrow.    "
},
{
  "id": "act-day3-button-exercises",
  "level": "2",
  "url": "subsec-day3-button-exercises.html#act-day3-button-exercises",
  "type": "Activity",
  "number": "2.2.5",
  "title": "Button Exercises.",
  "body": " Button Exercises   Modify blinkyCNT.c so that pressing the button pauses the counter and releasing resumes it.     Homework (due Thursday): Write toggleLED.c so the on-board LED toggles each time the button is pressed and released: first press turns LED on, second press turns it off, and so on. You will likely observe erratic behavior ( glitches ) — bring your observations to class tomorrow.   "
},
{
  "id": "sec-gpio-input-config",
  "level": "1",
  "url": "sec-gpio-input-config.html",
  "type": "Section",
  "number": "2.3",
  "title": "Configuring a Pin as an Input",
  "body": " Configuring a Pin as an Input  Every GPIO pin on the STM32C031 can be configured as a digital input, digital output, analog input, or alternate function. For a pushbutton we use digital input mode. The internal structure of one I\/O port bit is shown in : an optional internal pull-up or pull-down resistor, a read path (IDR), and a write path (ODR).  The register fields involved in input configuration are:   GPIOx→MODER — two bits per pin. Writing 00 selects input mode. Do not assume the bits are already 00 : pins reset to 11 , analog mode (RM0490 §6.4.1 — reset value 0xEBFF FFFF for port A, 0xFFFF FFFF for the other ports), so clear both bits explicitly for every input pin.   GPIOx→PUPDR — two bits per pin. Writing 01 enables the internal pull-up; 10 enables the pull-down; 00 leaves the pin floating.   GPIOx→IDR — read-only. Bit reflects the current logic level on pin .   Why use a pull-up resistor?  A floating input pin picks up electrical noise and reads unpredictably. Connecting a pull-up resistor (from the pin to VCC) makes the idle state HIGH. When the button closes, it connects the pin to GND, pulling it LOW. This is called active-low logic: pressed = 0, released = 1. The STM32's built-in pull-up resistors are typically 40 kΩ, so no external resistor is needed. shows the breadboard wiring using the internal pull-up. shows the alternative: an external pull-up resistor on the breadboard.   Setting up PB4 (D5 on the Nucleo) as an input with pull-up enabled, as in button.c :  #define GPIOBEN (1U << 1) \/\/ bit 1 of IOPENR enables GPIOB clock #define BUTTON_PIN (1U << 4) \/\/ PB4 = D5 \/\/ 1. Enable GPIOB clock RCC->IOPENR |= GPIOBEN; \/\/ 2. Configure PB4 as input: MODER bits [9:8] = 00 \/\/ Pins reset to analog (11), so clear both bits explicitly GPIOB->MODER &= ~(1U << 8) & ~(1U << 9); \/\/ 3. Enable internal pull-up on PB4 \/\/ PUPDR bits [9:8]: 01 = pull-up GPIOB->PUPDR |= (1U << 8); \/\/ set bit 8 GPIOB->PUPDR &= ~(1U << 9); \/\/ clear bit 9  After a short settling time (the pull-up charges any stray capacitance; see ; a delay_ms(1) is sufficient), the pin reads HIGH when the button is released and LOW when pressed. Test it with:  \/\/ Active-low: IDR bit = 0 means button is pressed if ((GPIOB->IDR & BUTTON_PIN) == 0) { \/\/ button is pressed — take action here }    With the internal pull-up enabled on PB4 and the button wired from D5 to GND, what value does GPIOB->IDR & BUTTON_PIN return when the button is pressed?   0 (zero)  Correct. Pressing the button pulls the pin to GND, so the IDR bit is 0 (active-low).  1  The pin is HIGH (1) when the button is released , not pressed.  It depends on the MODER setting  MODER selects input vs. output mode, but once in input mode the IDR reflects the pin voltage regardless of PUPDR.  Undefined — floating  The pull-up resistor prevents the pin from floating; it is well-defined as HIGH when the switch is open.     "
},
{
  "id": "sec-gpio-input-config-7",
  "level": "2",
  "url": "sec-gpio-input-config.html#sec-gpio-input-config-7",
  "type": "Insight",
  "number": "2.3.1",
  "title": "Why use a pull-up resistor?",
  "body": " Why use a pull-up resistor?  A floating input pin picks up electrical noise and reads unpredictably. Connecting a pull-up resistor (from the pin to VCC) makes the idle state HIGH. When the button closes, it connects the pin to GND, pulling it LOW. This is called active-low logic: pressed = 0, released = 1. The STM32's built-in pull-up resistors are typically 40 kΩ, so no external resistor is needed. shows the breadboard wiring using the internal pull-up. shows the alternative: an external pull-up resistor on the breadboard.  "
},
{
  "id": "rq-idr-value",
  "level": "2",
  "url": "rq-gpio-input.html#rq-idr-value",
  "type": "Reading Question",
  "number": "2.3.1",
  "title": "",
  "body": " With the internal pull-up enabled on PB4 and the button wired from D5 to GND, what value does GPIOB->IDR & BUTTON_PIN return when the button is pressed?   0 (zero)  Correct. Pressing the button pulls the pin to GND, so the IDR bit is 0 (active-low).  1  The pin is HIGH (1) when the button is released , not pressed.  It depends on the MODER setting  MODER selects input vs. output mode, but once in input mode the IDR reflects the pin voltage regardless of PUPDR.  Undefined — floating  The pull-up resistor prevents the pin from floating; it is well-defined as HIGH when the switch is open.   "
},
{
  "id": "subsec-day3x-bounce",
  "level": "1",
  "url": "subsec-day3x-bounce.html",
  "type": "Subsection",
  "number": "2.4.1",
  "title": "Part 1: Observing and Fixing Bounce",
  "body": " Part 1: Observing and Fixing Bounce  Load your toggleLED.c (or button.c if your homework is not finished). Wire the AD2 with CH1 (orange) on D5 (PB4, button) and CH2 (blue) on D13 (PA5, LED), as shown in .   AD2 wiring for observing button bounce. CH1 (orange) connects to D5\/PB4 (button); CH2 (blue) connects to D13\/PA5 (LED). Minus leads (white stripe) connect to GND.     Capturing Switch Bounce   In Waveforms, configure the trigger as shown in : Source: Channel 1, Type: Edge, Condition: Falling, Level: 1 V. Set the time base to 20 µs\/div. (Depending on your Waveforms version, you may need Normal or Auto trigger mode.)   Waveforms trigger settings for capturing switch bounce. Source: Channel 1 (button signal), Condition: Falling edge, Level: 1 V. Time base 20 µs\/div is a good starting point; adjust if your bounce is shorter or longer.    Click Single , press the button once, and examine the captured waveform. What do you see instead of a clean falling edge?    Use cursors to measure the total duration of the bounce on your button. Compare results with other groups — do all switches bounce the same amount?    Look at channel 2 (LED). How many times does the LED change state during a single physical button press? Why?     Switch bounce captured on CH1 (orange): a single button press produces many rapid HIGH\/LOW transitions before the signal settles low. CH2 (blue) shows the LED toggling on each bounce — not just once. Bounce duration varies by switch, typically 50 µs to a few ms.     Hardware Fix: Adding a Capacitor   Hardware debouncing works by adding a small capacitor across the switch. When the switch closes, the capacitor discharges through the low-resistance contacts rather than bouncing; when the switch opens, the internal pull-up recharges it slowly through its ~40 kΩ resistance. The RC time constant smooths out the bounce spikes. See for the circuit details.   Reading metal film capacitor markings. The three fields encode value, tolerance, and maximum voltage. Value is two digits and a decimal point; the decimal point can be an n (nano), a p (pico), or a dot (micro). Example: .1J63 = 0.1 µF, ±5%, 63 V.     Place the debounce capacitor — 0.1 µF or 0.15 µF, depending on how your kit was stocked — from D5 (PB4) to GND on the breadboard, in parallel with the button. The red dashed line shows where the capacitor connects. Identify the correct capacitor by reading its marking code (Task 1 below).      Identify the debounce capacitor in your kit using its marking code. Kits are stocked with either a 0.1 µF or a 0.15 µF part — both work here.    Place the capacitor across the button (one leg on the GPIO pin side, the other to GND). Capture the button waveform again with the same scope settings. How has it changed?    Look at channel 2 (LED) again. Does the LED now toggle exactly once per press? Save a screenshot showing both channels, with and without the capacitor, for your lab report.           Button waveform with vs. without the debounce capacitor.      The internal pull-up and the debounce capacitor form an RC low-pass filter.     "
},
{
  "id": "fig-bounce-wiring",
  "level": "2",
  "url": "subsec-day3x-bounce.html#fig-bounce-wiring",
  "type": "Figure",
  "number": "2.4.1",
  "title": "",
  "body": " AD2 wiring for observing button bounce. CH1 (orange) connects to D5\/PB4 (button); CH2 (blue) connects to D13\/PA5 (LED). Minus leads (white stripe) connect to GND.   "
},
{
  "id": "act-day3x-observe-bounce",
  "level": "2",
  "url": "subsec-day3x-bounce.html#act-day3x-observe-bounce",
  "type": "Activity",
  "number": "2.4.1",
  "title": "Capturing Switch Bounce.",
  "body": " Capturing Switch Bounce   In Waveforms, configure the trigger as shown in : Source: Channel 1, Type: Edge, Condition: Falling, Level: 1 V. Set the time base to 20 µs\/div. (Depending on your Waveforms version, you may need Normal or Auto trigger mode.)   Waveforms trigger settings for capturing switch bounce. Source: Channel 1 (button signal), Condition: Falling edge, Level: 1 V. Time base 20 µs\/div is a good starting point; adjust if your bounce is shorter or longer.    Click Single , press the button once, and examine the captured waveform. What do you see instead of a clean falling edge?    Use cursors to measure the total duration of the bounce on your button. Compare results with other groups — do all switches bounce the same amount?    Look at channel 2 (LED). How many times does the LED change state during a single physical button press? Why?   "
},
{
  "id": "fig-bounce-scope",
  "level": "2",
  "url": "subsec-day3x-bounce.html#fig-bounce-scope",
  "type": "Figure",
  "number": "2.4.3",
  "title": "",
  "body": " Switch bounce captured on CH1 (orange): a single button press produces many rapid HIGH\/LOW transitions before the signal settles low. CH2 (blue) shows the LED toggling on each bounce — not just once. Bounce duration varies by switch, typically 50 µs to a few ms.   "
},
{
  "id": "act-day3x-hw-debounce",
  "level": "2",
  "url": "subsec-day3x-bounce.html#act-day3x-hw-debounce",
  "type": "Activity",
  "number": "2.4.2",
  "title": "Hardware Fix: Adding a Capacitor.",
  "body": " Hardware Fix: Adding a Capacitor   Hardware debouncing works by adding a small capacitor across the switch. When the switch closes, the capacitor discharges through the low-resistance contacts rather than bouncing; when the switch opens, the internal pull-up recharges it slowly through its ~40 kΩ resistance. The RC time constant smooths out the bounce spikes. See for the circuit details.   Reading metal film capacitor markings. The three fields encode value, tolerance, and maximum voltage. Value is two digits and a decimal point; the decimal point can be an n (nano), a p (pico), or a dot (micro). Example: .1J63 = 0.1 µF, ±5%, 63 V.     Place the debounce capacitor — 0.1 µF or 0.15 µF, depending on how your kit was stocked — from D5 (PB4) to GND on the breadboard, in parallel with the button. The red dashed line shows where the capacitor connects. Identify the correct capacitor by reading its marking code (Task 1 below).      Identify the debounce capacitor in your kit using its marking code. Kits are stocked with either a 0.1 µF or a 0.15 µF part — both work here.    Place the capacitor across the button (one leg on the GPIO pin side, the other to GND). Capture the button waveform again with the same scope settings. How has it changed?    Look at channel 2 (LED) again. Does the LED now toggle exactly once per press? Save a screenshot showing both channels, with and without the capacitor, for your lab report.   "
},
{
  "id": "fig-day3x-compare",
  "level": "2",
  "url": "subsec-day3x-bounce.html#fig-day3x-compare",
  "type": "Figure",
  "number": "2.4.7",
  "title": "",
  "body": " Button waveform with vs. without the debounce capacitor.   "
},
{
  "id": "fig-day3x-rc",
  "level": "2",
  "url": "subsec-day3x-bounce.html#fig-day3x-rc",
  "type": "Figure",
  "number": "2.4.9",
  "title": "",
  "body": " The internal pull-up and the debounce capacitor form an RC low-pass filter.   "
},
{
  "id": "subsec-day3x-toggle-problem",
  "level": "1",
  "url": "subsec-day3x-toggle-problem.html",
  "type": "Subsection",
  "number": "2.4.2",
  "title": "Part 2: The Toggle Problem",
  "body": " Part 2: The Toggle Problem  Reading a pin on every iteration of the main loop — checking its state and acting on it — is called polling . It is the simplest way to respond to an input, but it has a subtle problem when the desired action is a toggle. Even with a debounced switch, consider this loop:  while (1) { buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); if (buttonPushed) { GPIOA->ODR ^= LED_PIN; \/\/ toggle LED } }   The Toggle Problem   Predict what this code will do if you press and hold the button for half a second. How many times will the LED toggle? Why?    The loop runs at approximately 12 MHz. Roughly how many times does it execute while a human holds the button down for 200 ms? How many toggles does that produce?    The fix is to detect the transition from unpressed to pressed — not just the level. The code below uses a buttonAlreadyPressed flag to do this. Trace through it: when does the LED toggle? When does it not toggle even though the button is down?  unsigned buttonAlreadyPressed = 0; while (1) { buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); if (!buttonAlreadyPressed && buttonPushed) { GPIOA->ODR ^= LED_PIN; \/\/ toggle on leading edge only buttonAlreadyPressed = 1; } else if (!buttonPushed) { buttonAlreadyPressed = 0; \/\/ reset when released } }    Day 4 will show you a cleaner way to write this same logic — the state machine design pattern. Before then, read — we will discuss how the state variable corresponds to buttonAlreadyPressed .        "
},
{
  "id": "subsec-day3x-toggle-problem-2",
  "level": "2",
  "url": "subsec-day3x-toggle-problem.html#subsec-day3x-toggle-problem-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "polling "
},
{
  "id": "act-day3x-toggle-problem",
  "level": "2",
  "url": "subsec-day3x-toggle-problem.html#act-day3x-toggle-problem",
  "type": "Activity",
  "number": "2.4.3",
  "title": "The Toggle Problem.",
  "body": " The Toggle Problem   Predict what this code will do if you press and hold the button for half a second. How many times will the LED toggle? Why?    The loop runs at approximately 12 MHz. Roughly how many times does it execute while a human holds the button down for 200 ms? How many toggles does that produce?    The fix is to detect the transition from unpressed to pressed — not just the level. The code below uses a buttonAlreadyPressed flag to do this. Trace through it: when does the LED toggle? When does it not toggle even though the button is down?  unsigned buttonAlreadyPressed = 0; while (1) { buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); if (!buttonAlreadyPressed && buttonPushed) { GPIOA->ODR ^= LED_PIN; \/\/ toggle on leading edge only buttonAlreadyPressed = 1; } else if (!buttonPushed) { buttonAlreadyPressed = 0; \/\/ reset when released } }    Day 4 will show you a cleaner way to write this same logic — the state machine design pattern. Before then, read — we will discuss how the state variable corresponds to buttonAlreadyPressed .   "
},
{
  "id": "subsec-hw-debounce",
  "level": "1",
  "url": "subsec-hw-debounce.html",
  "type": "Subsection",
  "number": "2.5.1",
  "title": "Hardware Debouncing: RC Filter",
  "body": " Hardware Debouncing: RC Filter  The classic hardware fix is to add a small capacitor (0.1 µF or 0.15 µF) across the switch terminals. When the switch closes, the capacitor discharges through the low-resistance closed contacts instead of bouncing. When the switch opens, the internal pull-up recharges the capacitor through its 40 kΩ resistance. The resulting RC time constant smooths out the bounce spikes. Breadboard placement is shown in .   RC debounce circuit: the internal pull-up (Rpu ≈ 40 kΩ) and the external capacitor form an RC low-pass filter. When the switch bounces open, the capacitor recharges slowly through Rpu; if C is large enough, the voltage never rises above V IH during the bounce window.     Effect of capacitor size on bounce suppression. Top: C = 0.01 µF — bounce recovers quickly and can reach V IH , causing spurious edges. Bottom: C = 0.1 µF — bounce recovers so slowly that the voltage stays below V IH , eliminating spurious transitions.     Side-by-side oscilloscope view: without capacitor (left) vs. with 0.1 µF (right). Orange (CH1) = button signal; blue (CH2) = LED. Without debouncing, the LED toggles multiple times per press. With the capacitor, each press produces exactly one toggle.    Hardware debouncing is reliable and requires no CPU time, but adds a component to every button on the board and must be sized for the specific switch.  "
},
{
  "id": "fig-rc-schematic",
  "level": "2",
  "url": "subsec-hw-debounce.html#fig-rc-schematic",
  "type": "Figure",
  "number": "2.5.1",
  "title": "",
  "body": " RC debounce circuit: the internal pull-up (Rpu ≈ 40 kΩ) and the external capacitor form an RC low-pass filter. When the switch bounces open, the capacitor recharges slowly through Rpu; if C is large enough, the voltage never rises above V IH during the bounce window.   "
},
{
  "id": "fig-rc-results",
  "level": "2",
  "url": "subsec-hw-debounce.html#fig-rc-results",
  "type": "Figure",
  "number": "2.5.2",
  "title": "",
  "body": " Effect of capacitor size on bounce suppression. Top: C = 0.01 µF — bounce recovers quickly and can reach V IH , causing spurious edges. Bottom: C = 0.1 µF — bounce recovers so slowly that the voltage stays below V IH , eliminating spurious transitions.   "
},
{
  "id": "fig-bounce-comparison",
  "level": "2",
  "url": "subsec-hw-debounce.html#fig-bounce-comparison",
  "type": "Figure",
  "number": "2.5.3",
  "title": "",
  "body": " Side-by-side oscilloscope view: without capacitor (left) vs. with 0.1 µF (right). Orange (CH1) = button signal; blue (CH2) = LED. Without debouncing, the LED toggles multiple times per press. With the capacitor, each press produces exactly one toggle.   "
},
{
  "id": "subsec-sw-debounce",
  "level": "1",
  "url": "subsec-sw-debounce.html",
  "type": "Subsection",
  "number": "2.5.2",
  "title": "Software Debouncing",
  "body": " Software Debouncing  The simplest software debounce: after detecting a press, wait longer than the maximum bounce duration before checking again.  if (!(GPIOC->IDR & BTN_PIN)) { \/\/ button pressed (active-low) delay_ms(20); \/\/ wait for bounce to settle (>10 ms typical) if (!(GPIOC->IDR & BTN_PIN)) { \/\/ confirm still pressed GPIOA->ODR ^= LED_PIN; \/\/ take action while (!(GPIOC->IDR & BTN_PIN)); \/\/ wait for release delay_ms(20); \/\/ debounce the release too } }  This works but blocks the CPU for 20 ms twice per button press. A state-machine approach (see ) avoids blocking while still debouncing reliably.   Hardware vs. software debouncing trade-offs  Hardware debouncing (RC filter) consumes no CPU cycles but costs a component on the board and is hard to adjust after fabrication. Software debouncing is free in hardware but ties up the processor during the delay and must be tuned to the slowest switch you ever use. In practice, a small capacitor plus a short software delay gives the best of both worlds.   "
},
{
  "id": "subsec-sw-debounce-5",
  "level": "2",
  "url": "subsec-sw-debounce.html#subsec-sw-debounce-5",
  "type": "Insight",
  "number": "2.5.4",
  "title": "Hardware vs. software debouncing trade-offs.",
  "body": " Hardware vs. software debouncing trade-offs  Hardware debouncing (RC filter) consumes no CPU cycles but costs a component on the board and is hard to adjust after fabrication. Software debouncing is free in hardware but ties up the processor during the delay and must be tuned to the slowest switch you ever use. In practice, a small capacitor plus a short software delay gives the best of both worlds.  "
},
{
  "id": "sec-state-machine",
  "level": "1",
  "url": "sec-state-machine.html",
  "type": "Section",
  "number": "2.6",
  "title": "State Machine Design Pattern",
  "body": " State Machine Design Pattern  Blocking while loops waiting for a button to settle prevent the rest of your program from running. A finite state machine (FSM) solves this by tracking what happened last time in a state variable and only acting on genuine transitions.  For a button toggle, we need two states: UNPRESSED and PRESSED . We toggle the LED exactly once per press, when transitioning from UNPRESSED to PRESSED. Once in the PRESSED state we ignore further LOW readings (which could be bounce or held-down time) until the pin goes HIGH again.  An FSM is often drawn as a state diagram : circles represent states, arrows represent transitions, and each arrow is labeled with the event that triggers it and the action taken. Before coming to class, draw the state diagram for the button-toggle FSM described above on paper. Label each state, each transition arrow with its triggering event, and the action taken.    In a button-toggle FSM with states UNPRESSED and PRESSED, the program is in state PRESSED and the button is still held down (pin LOW). What should happen on the next pass through the main loop?   Nothing — stay in PRESSED and do not toggle the LED.  Correct. The PRESSED state only acts when the button is released, so holding the button causes no additional toggles.  The LED toggles again.  That would happen with a flag-based approach that toggles on every LOW reading. The state machine prevents repeated toggles by staying in PRESSED until the button is released.  The state transitions back to UNPRESSED.  PRESSED → UNPRESSED only when the pin goes HIGH (button released).  The program gets stuck in an infinite loop.  There is no blocking loop inside the state machine; it returns to the top of while(1) each cycle.     "
},
{
  "id": "sec-state-machine-2",
  "level": "2",
  "url": "sec-state-machine.html#sec-state-machine-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "finite state machine "
},
{
  "id": "rq-fsm-states",
  "level": "2",
  "url": "rq-fsm.html#rq-fsm-states",
  "type": "Reading Question",
  "number": "2.6.1",
  "title": "",
  "body": " In a button-toggle FSM with states UNPRESSED and PRESSED, the program is in state PRESSED and the button is still held down (pin LOW). What should happen on the next pass through the main loop?   Nothing — stay in PRESSED and do not toggle the LED.  Correct. The PRESSED state only acts when the button is released, so holding the button causes no additional toggles.  The LED toggles again.  That would happen with a flag-based approach that toggles on every LOW reading. The state machine prevents repeated toggles by staying in PRESSED until the button is released.  The state transitions back to UNPRESSED.  PRESSED → UNPRESSED only when the pin goes HIGH (button released).  The program gets stuck in an infinite loop.  There is no blocking loop inside the state machine; it returns to the top of while(1) each cycle.   "
},
{
  "id": "subsec-day4-code-review",
  "level": "1",
  "url": "subsec-day4-code-review.html",
  "type": "Subsection",
  "number": "2.7.1",
  "title": "Part 1: Code Review — toggleLED.c",
  "body": " Part 1: Code Review — toggleLED.c  Set up your Nucleo with your toggleLED.c code (with the debounce capacitor across the switch) and share it with your group.   toggleLED Code Review   Set up your Nucleo with your toggleLED.c (debounce capacitor across the switch) and share it with your group.    Read each partner's code. Can you follow its logic and explain it line by line? There are at least two valid structures using a buttonAlreadyPressed flag — one checks the flag in the outer if , the other checks buttonPushed first. Are both correct? Is one clearer?    Identify the parts of your code that correspond to FSM concepts: where is the state stored? What are the events ? What action happens on which transition? We will formalize this in the mini-lecture that follows.      "
},
{
  "id": "act-day4-code-review",
  "level": "2",
  "url": "subsec-day4-code-review.html#act-day4-code-review",
  "type": "Activity",
  "number": "2.7.1",
  "title": "toggleLED Code Review.",
  "body": " toggleLED Code Review   Set up your Nucleo with your toggleLED.c (debounce capacitor across the switch) and share it with your group.    Read each partner's code. Can you follow its logic and explain it line by line? There are at least two valid structures using a buttonAlreadyPressed flag — one checks the flag in the outer if , the other checks buttonPushed first. Are both correct? Is one clearer?    Identify the parts of your code that correspond to FSM concepts: where is the state stored? What are the events ? What action happens on which transition? We will formalize this in the mini-lecture that follows.   "
},
{
  "id": "subsec-day4-fsm-lecture",
  "level": "1",
  "url": "subsec-day4-fsm-lecture.html",
  "type": "Subsection",
  "number": "2.7.2",
  "title": "Part 2: The State Machine Pattern",
  "body": " Part 2: The State Machine Pattern  Your toggleLED.c code already implements a finite state machine — the buttonAlreadyPressed variable is the state variable. Here is the same logic expressed as a formal state diagram and then as idiomatic C using typedef enum and switch .   State diagram for the button-toggle FSM. The two states (Unpressed\/Pressed) track whether the button is currently down. The LED toggles exactly once — on the Unpressed→Pressed transition — and the code snippet on each arrow is the C expression that triggers it. The legend (right) maps the color-coded terms to the FSM vocabulary.    #include \"ES28.h\" typedef enum { UNPRESSED, PRESSED } state_t; int main(void) { \/\/ --- GPIO setup (GPIOA: LED on PA5; GPIOB: button on PB4) --- RCC->IOPENR |= (1U << 0) | (1U << 1); \/\/ enable GPIOA and GPIOB clocks GPIOA->MODER &= ~(3U << 10); \/\/ PA5 input (clear) GPIOA->MODER |= (1U << 10); \/\/ PA5 output GPIOB->MODER &= ~(3U << 8); \/\/ PB4 input (pins reset to analog) GPIOB->PUPDR |= (1U << 8); \/\/ PB4 pull-up bit [9:8] = 01 GPIOB->PUPDR &= ~(1U << 9); state_t state = UNPRESSED; while (1) { int btn = !(GPIOB->IDR & (1U << 4)); \/\/ 1 if pressed (active-low) switch (state) { case UNPRESSED: if (btn) { GPIOA->ODR ^= (1U << 5); \/\/ toggle LED on press state = PRESSED; } break; case PRESSED: if (!btn) { state = UNPRESSED; \/\/ wait for release } break; } } return 1; }  Because there is no blocking while loop, this FSM can be embedded in a larger main loop that also blinks LEDs, reads a UART, or does other work — the state variable preserves context across iterations.     "
},
{
  "id": "fig-state-diagram",
  "level": "2",
  "url": "subsec-day4-fsm-lecture.html#fig-state-diagram",
  "type": "Figure",
  "number": "2.7.1",
  "title": "",
  "body": " State diagram for the button-toggle FSM. The two states (Unpressed\/Pressed) track whether the button is currently down. The LED toggles exactly once — on the Unpressed→Pressed transition — and the code snippet on each arrow is the C expression that triggers it. The legend (right) maps the color-coded terms to the FSM vocabulary.   "
},
{
  "id": "subsec-day4-fsm-design",
  "level": "1",
  "url": "subsec-day4-fsm-design.html",
  "type": "Subsection",
  "number": "2.7.3",
  "title": "Part 3: Designing State Machines",
  "body": " Part 3: Designing State Machines  A finite state machine (FSM) captures behavior as a set of states , events that cause transitions between them, and actions taken on each transition. The key advantage over a simple flag variable: the pattern scales cleanly when you add more states or more events.   Drawing a State Diagram   Before writing any code, draw the state diagram on paper or your table's whiteboard. Label each state (box), each transition arrow with its triggering event, and each action taken on the transition.    Draw the state diagram for a 3-state LED cycling FSM: each button press advances to the next LED pattern (pattern A → B → C → A → …). You choose the patterns. How many states do you need? What are the events? What action happens on each transition?    Draw the state diagram for the Lab 2 pause\/resume counter: the counter blinks normally until a button press pauses it; a second press resumes. How is this different from the 3-state cycling FSM?    "
},
{
  "id": "subsec-day4-fsm-design-2",
  "level": "2",
  "url": "subsec-day4-fsm-design.html#subsec-day4-fsm-design-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "finite state machine "
},
{
  "id": "act-day4-fsm-draw",
  "level": "2",
  "url": "subsec-day4-fsm-design.html#act-day4-fsm-draw",
  "type": "Activity",
  "number": "2.7.2",
  "title": "Drawing a State Diagram.",
  "body": " Drawing a State Diagram   Before writing any code, draw the state diagram on paper or your table's whiteboard. Label each state (box), each transition arrow with its triggering event, and each action taken on the transition.    Draw the state diagram for a 3-state LED cycling FSM: each button press advances to the next LED pattern (pattern A → B → C → A → …). You choose the patterns. How many states do you need? What are the events? What action happens on each transition?    Draw the state diagram for the Lab 2 pause\/resume counter: the counter blinks normally until a button press pauses it; a second press resumes. How is this different from the 3-state cycling FSM?   "
},
{
  "id": "subsec-day4-fsm-code",
  "level": "1",
  "url": "subsec-day4-fsm-code.html",
  "type": "Subsection",
  "number": "2.7.4",
  "title": "Part 4: Implementing a State Machine in C",
  "body": " Part 4: Implementing a State Machine in C  Translate one of your diagrams from Part 3 into working code using the typedef enum \/ switch pattern from the mini-lecture above.   Implementing Your FSM   Start from your toggleLED.c or blinkyCNT.c project. Replace any blocking logic or bare flag variables with a proper FSM.    Implement the pause\/resume counter FSM. The counter should blink the LEDs in binary (as in blinkyCNT.c ) and a button press should pause or resume counting. Test it: does a single physical press always produce exactly one state change?    If you finish early, implement the 3-state LED cycling FSM from your diagram. Or: add a second button that resets the counter to zero from either state. How does the state diagram change?    Verify on the oscilloscope that the LED transitions are clean (no multiple toggles per press) both with and without the debounce capacitor.    "
},
{
  "id": "act-day4-fsm-implement",
  "level": "2",
  "url": "subsec-day4-fsm-code.html#act-day4-fsm-implement",
  "type": "Activity",
  "number": "2.7.3",
  "title": "Implementing Your FSM.",
  "body": " Implementing Your FSM   Start from your toggleLED.c or blinkyCNT.c project. Replace any blocking logic or bare flag variables with a proper FSM.    Implement the pause\/resume counter FSM. The counter should blink the LEDs in binary (as in blinkyCNT.c ) and a button press should pause or resume counting. Test it: does a single physical press always produce exactly one state change?    If you finish early, implement the 3-state LED cycling FSM from your diagram. Or: add a second button that resets the counter to zero from either state. How does the state diagram change?    Verify on the oscilloscope that the LED transitions are clean (no multiple toggles per press) both with and without the debounce capacitor.   "
},
{
  "id": "subsec-day4-lab2-intro",
  "level": "1",
  "url": "subsec-day4-lab2-intro.html",
  "type": "Subsection",
  "number": "2.7.5",
  "title": "Part 5: Lab 2 Introduction",
  "body": " Part 5: Lab 2 Introduction  Lab 2 has two design challenges. Read the full spec in and start work on whichever challenge you have not already completed above.   Lab 2 Design Challenges    Challenge 1 — Pause\/resume counter: If your FSM from Part 3 already implements this, review the lab spec and make sure your solution meets all requirements (correct state behavior, debouncing, clean oscilloscope traces).     Challenge 2 — Reaction time game: Draw the state diagram before writing code. How many states does the game have? What are the events (button presses, timer expiry)? What actions does each transition trigger?    "
},
{
  "id": "act-day4-lab2-start",
  "level": "2",
  "url": "subsec-day4-lab2-intro.html#act-day4-lab2-start",
  "type": "Activity",
  "number": "2.7.4",
  "title": "Lab 2 Design Challenges.",
  "body": " Lab 2 Design Challenges    Challenge 1 — Pause\/resume counter: If your FSM from Part 3 already implements this, review the lab spec and make sure your solution meets all requirements (correct state behavior, debouncing, clean oscilloscope traces).     Challenge 2 — Reaction time game: Draw the state diagram before writing code. How many states does the game have? What are the events (button presses, timer expiry)? What actions does each transition trigger?   "
},
{
  "id": "sec-switch-lab",
  "level": "1",
  "url": "sec-switch-lab.html",
  "type": "Section",
  "number": "2.8",
  "title": "Lab 2: Switches and State Machines",
  "body": " Lab 2: Switches and State Machines  Lab 2 has two parts: a Technical Study on RC debouncer design (prelab math), and two Design Challenges implemented on the Nucleo. Read the full lab handout for the prelab deliverables.   Lab 2 breadboard setup: three LEDs (two red WIN LEDs and one green starter LED), two pushbutton switches, and debounce capacitors. Each LED has its own 220 Ω current-limiting resistor.      Design Challenge 1 — Pushbutton Counter   Starting from blinkyCNT.c , implement a button-controlled pause\/resume: pressing the button once pauses the LED counter; pressing again resumes it. Use your debounce capacitor (0.1 µF or 0.15 µF) across the switch. Use the FSM pattern to avoid blocking.     Design Challenge 2 — Reaction Time Game   Each player has a debounced button and a red WIN LED. A third green LED is the start signal. The game runs as follows:   Initially, the green starter LED is on (or blinking rapidly).  Either player presses their button to start the game.  The starter LED flashes three times, one second apart, then glows steadily — this is the go signal.  Each player presses their button as soon as they see the steady light. The first player to press wins; their WIN LED lights (or blinks rapidly) for one second.  The system returns to step 1.   Design with a state machine. Start with a paper state diagram before writing any code; include it in your submission along with pseudocode and a debugging diary.   Optional extensions (no extra points): (a) A false start — pressing before the steady light — awards the win to the other player. (b) Make the delay between the last flash and the steady ON slightly random (run a fast counter in the background and sample it when a player starts the game) to prevent timing the flashes.     "
},
{
  "id": "fig-lab2-setup",
  "level": "2",
  "url": "sec-switch-lab.html#fig-lab2-setup",
  "type": "Figure",
  "number": "2.8.1",
  "title": "",
  "body": " Lab 2 breadboard setup: three LEDs (two red WIN LEDs and one green starter LED), two pushbutton switches, and debounce capacitors. Each LED has its own 220 Ω current-limiting resistor.   "
},
{
  "id": "exer-pause-resume",
  "level": "2",
  "url": "sec-switch-lab-4.html#exer-pause-resume",
  "type": "Exercise",
  "number": "2.8.1",
  "title": "Design Challenge 1 — Pushbutton Counter.",
  "body": " Design Challenge 1 — Pushbutton Counter   Starting from blinkyCNT.c , implement a button-controlled pause\/resume: pressing the button once pauses the LED counter; pressing again resumes it. Use your debounce capacitor (0.1 µF or 0.15 µF) across the switch. Use the FSM pattern to avoid blocking.   "
},
{
  "id": "exer-reaction-game",
  "level": "2",
  "url": "sec-switch-lab-4.html#exer-reaction-game",
  "type": "Exercise",
  "number": "2.8.2",
  "title": "Design Challenge 2 — Reaction Time Game.",
  "body": " Design Challenge 2 — Reaction Time Game   Each player has a debounced button and a red WIN LED. A third green LED is the start signal. The game runs as follows:   Initially, the green starter LED is on (or blinking rapidly).  Either player presses their button to start the game.  The starter LED flashes three times, one second apart, then glows steadily — this is the go signal.  Each player presses their button as soon as they see the steady light. The first player to press wins; their WIN LED lights (or blinks rapidly) for one second.  The system returns to step 1.   Design with a state machine. Start with a paper state diagram before writing any code; include it in your submission along with pseudocode and a debugging diary.   Optional extensions (no extra points): (a) A false start — pressing before the steady light — awards the win to the other player. (b) Make the delay between the last flash and the steady ON slightly random (run a fast counter in the background and sample it when a player starts the game) to prevent timing the flashes.   "
},
{
  "id": "subsec-uart-one-wire",
  "level": "1",
  "url": "subsec-uart-one-wire.html",
  "type": "Subsection",
  "number": "3.1.1",
  "title": "One Wire, Two States",
  "body": " One Wire, Two States  Suppose your laptop wants to receive the letter E from the STM32. The simplest possible connection is one wire: that wire is either HIGH (3.3 V) or LOW (0 V). To send E , the STM32 first looks up its ASCII code — 69 — converts it to binary ( , so 0b01000101 ), and then puts those eight bits on the wire one at a time: HIGH for a 1, LOW for a 0.  This is the job of the serializer inside the USART peripheral: it accepts the parallel byte from your code (all 8 bits at once, over the 32-bit APB bus) and converts it to a sequential bit stream. On the other end, the receiver's deserializer does the reverse, reassembling the incoming bits back into a parallel byte.   A UART transmitter serializes parallel data into a bit stream; the receiver deserializes it back. Both sides share a timing agreement (the baud rate) but no clock wire — the asynchronous in UART.    "
},
{
  "id": "subsec-uart-one-wire-3",
  "level": "2",
  "url": "subsec-uart-one-wire.html#subsec-uart-one-wire-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "serializer deserializer "
},
{
  "id": "fig-uart-serialize",
  "level": "2",
  "url": "subsec-uart-one-wire.html#fig-uart-serialize",
  "type": "Figure",
  "number": "3.1.1",
  "title": "",
  "body": " A UART transmitter serializes parallel data into a bit stream; the receiver deserializes it back. Both sides share a timing agreement (the baud rate) but no clock wire — the asynchronous in UART.   "
},
{
  "id": "subsec-uart-baud",
  "level": "1",
  "url": "subsec-uart-baud.html",
  "type": "Subsection",
  "number": "3.1.2",
  "title": "The Baud Rate Problem",
  "body": " The Baud Rate Problem  Here is the catch: the laptop needs to know when to sample the wire. If it sees the wire sitting LOW, is that one bit? Three? Without a shared clock signal, both sides must agree in advance on how fast bits are sent. This pre-agreed rate is the baud rate , measured in bits per second. At 9600 baud, each bit lasts exactly . As long as both devices use the same baud rate, the laptop knows to take a fresh sample every 104 µs.  "
},
{
  "id": "subsec-uart-baud-2",
  "level": "2",
  "url": "subsec-uart-baud.html#subsec-uart-baud-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "baud rate "
},
{
  "id": "subsec-uart-frame",
  "level": "1",
  "url": "subsec-uart-frame.html",
  "type": "Subsection",
  "number": "3.1.3",
  "title": "The Frame",
  "body": " The Frame  One more problem: the laptop must know exactly when a new byte begins. The wire sits HIGH when nothing is being transmitted. To announce the start of a byte, the STM32 pulls the wire LOW for exactly one bit period. This is the start bit . After the start bit come the 8 data bits, sent least-significant bit first — D0 before D7. A final stop bit , always HIGH, closes the transmission and guarantees the line returns to idle before the next byte arrives.  The complete frame for transmitting E at 9600 baud is shown in . Three things are worth noticing. First, the idle state is HIGH, so the start bit is a falling edge — a sharp, unambiguous signal even after a long silence. Second, the three consecutive LOW bits (D3, D4, D5 are all zero) look identical to a single long pulse from the outside; only a receiver that knows the baud rate can count them correctly — this is exactly why mismatched baud rates produce garbled output rather than silence. Third, to decode the frame yourself: read D7 down to D0, write out 01000101 , and convert: . Look up ASCII 69: E . ✓   UART frame for the character E (ASCII 69 = 0b01000101 ) at 9600 baud. Each bit lasts 104 µs. The start bit is a falling edge from the idle-high line. Data bits are sent LSB first — D0 through D7. The stop bit returns the line HIGH, ready for the next start bit.     General UART frame structure: the line idles HIGH, a start bit pulls it LOW, eight data bits follow (LSB first), an optional parity bit may be included, and one or more stop bits return the line to idle. We use 8N1 — 8 data bits, no parity, 1 stop bit.    "
},
{
  "id": "subsec-uart-frame-2",
  "level": "2",
  "url": "subsec-uart-frame.html#subsec-uart-frame-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "start bit stop bit "
},
{
  "id": "fig-uart-frame-E",
  "level": "2",
  "url": "subsec-uart-frame.html#fig-uart-frame-E",
  "type": "Figure",
  "number": "3.1.2",
  "title": "",
  "body": " UART frame for the character E (ASCII 69 = 0b01000101 ) at 9600 baud. Each bit lasts 104 µs. The start bit is a falling edge from the idle-high line. Data bits are sent LSB first — D0 through D7. The stop bit returns the line HIGH, ready for the next start bit.   "
},
{
  "id": "fig-uart-frame-generic",
  "level": "2",
  "url": "subsec-uart-frame.html#fig-uart-frame-generic",
  "type": "Figure",
  "number": "3.1.3",
  "title": "",
  "body": " General UART frame structure: the line idles HIGH, a start bit pulls it LOW, eight data bits follow (LSB first), an optional parity bit may be included, and one or more stop bits return the line to idle. We use 8N1 — 8 data bits, no parity, 1 stop bit.   "
},
{
  "id": "subsec-uart-fullduplex",
  "level": "1",
  "url": "subsec-uart-fullduplex.html",
  "type": "Subsection",
  "number": "3.1.4",
  "title": "Full Duplex and Pin Names",
  "body": " Full Duplex and Pin Names  So far, data flows only one direction. To reply, the laptop sends on a separate wire simultaneously. This gives two independent one-way channels: the TX pin (transmit — STM32 to laptop) and the RX pin (receive — laptop to STM32). Both operate at the same time, independently. This two-wire arrangement is called full duplex . Because the two wires carry traffic in opposite directions, TX on one device connects to RX on the other — a crossing that confuses many first-time builders. A shared ground connection is also required.   Full-duplex UART wiring between two devices. TX on the left device crosses to RX on the right, and vice versa. Both devices also share a common ground reference. Connecting TX→TX is the most common wiring mistake — neither side receives anything.    "
},
{
  "id": "subsec-uart-fullduplex-2",
  "level": "2",
  "url": "subsec-uart-fullduplex.html#subsec-uart-fullduplex-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "TX RX full duplex "
},
{
  "id": "fig-uart-txrx-cross",
  "level": "2",
  "url": "subsec-uart-fullduplex.html#fig-uart-txrx-cross",
  "type": "Figure",
  "number": "3.1.4",
  "title": "",
  "body": " Full-duplex UART wiring between two devices. TX on the left device crosses to RX on the right, and vice versa. Both devices also share a common ground reference. Connecting TX→TX is the most common wiring mistake — neither side receives anything.   "
},
{
  "id": "subsec-uart-general",
  "level": "1",
  "url": "subsec-uart-general.html",
  "type": "Subsection",
  "number": "3.1.5",
  "title": "UART Is a General-Purpose Protocol",
  "body": " UART Is a General-Purpose Protocol  UART is not specific to any particular pairing of devices. Any two devices with a UART interface can talk to each other: laptops, Bluetooth modules, GPS receivers, motor controllers, other microcontrollers, and countless sensors all use UART as their native interface. In this course you will use it both for printing debug output to your laptop and for communicating with external modules such as the Bluefruit Bluetooth chip. The same frame format and baud-rate agreement applies regardless of what is at each end of the wire.  "
},
{
  "id": "subsec-uart-vs-usart",
  "level": "1",
  "url": "subsec-uart-vs-usart.html",
  "type": "Subsection",
  "number": "3.1.6",
  "title": "UART vs. USART",
  "body": " UART vs. USART  The STM32's serial peripheral is labeled USART — the S stands for Synchronous. The hardware also supports a clocked mode for special cases, but in this course we use it exclusively in asynchronous mode. The USART handles all the timing in hardware: it generates the start bit, clocks out the data bits at the right rate, and appends the stop bit automatically.  The peripheral is also highly configurable: the number of data bits (7, 8, or 9), the number of stop bits (0.5, 1, 1.5, or 2), and an optional parity bit can all be adjusted to match whatever device is on the other end. In practice the vast majority of UART devices use 8 data bits, no parity, and 1 stop bit — a combination so common it has its own shorthand: 8N1 . That is what we use throughout this course, and it is what the frame in illustrates.  "
},
{
  "id": "subsec-uart-vs-usart-2",
  "level": "2",
  "url": "subsec-uart-vs-usart.html#subsec-uart-vs-usart-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "USART "
},
{
  "id": "subsec-uart-vs-usart-3",
  "level": "2",
  "url": "subsec-uart-vs-usart.html#subsec-uart-vs-usart-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "8N1 "
},
{
  "id": "rq-uart-concept",
  "level": "1",
  "url": "rq-uart-concept.html",
  "type": "Check Your Understanding",
  "number": "3.1.7",
  "title": "Check Your Understanding",
  "body": "   The three consecutive LOW bits (D3, D4, D5 = 0) in are indistinguishable from a single long LOW pulse if you don't know the baud rate. What is the only way a receiver can correctly count them as three separate zero bits?     By sampling the wire at exactly the agreed baud rate — once per bit period — so that each 104 µs window is counted as one bit regardless of whether consecutive bits have the same value.  Correct. This is precisely what asynchronous means: there is no shared clock, so both sides must independently maintain the same rate. Any drift causes bits to be miscounted from that point on.    By detecting voltage transitions — the line changes level at each new bit.  Consecutive identical bits produce no transition at all. A receiver that relies on transitions cannot count repeated 0s or 1s correctly.    By measuring the total duration of the LOW pulse and dividing by a standard minimum bit width.  There is no standard minimum — bit width depends on baud rate, which varies across devices. Without knowing the agreed rate, the duration alone tells you nothing about the number of bits.       Could you design a working UART protocol that uses a start bit and 8 data bits but no stop bit? What happens when sending two consecutive bytes where D7 of the first byte is 0 (LOW)?     No. Without the stop bit the line stays LOW after D7 = 0, so there is no HIGH-to-LOW falling edge to signal the start bit of the next byte. The receiver never sees the second byte begin.  Correct. The start bit is detected as a falling edge. The stop bit's sole job is to guarantee the line returns HIGH so that falling edge is possible.    Yes. The gap between bytes is enough for the receiver to reset.  There is no guaranteed gap in a continuous UART stream — bytes can follow immediately one after another. The stop bit is the only guaranteed return to HIGH.    No, but only because the hardware requires it — there is no fundamental protocol reason.  There is a fundamental reason: start-bit detection depends on a falling edge, which requires the line to be HIGH first. The stop bit provides that guarantee.      If the STM32's TX pin is labeled transmit, which pin on the laptop's USB-serial adapter should it connect to, and why?    The laptop's RX pin, because TX on one device must connect to RX on the other — data sent by one must be received by the other.  Correct. TX → RX is the fundamental UART wiring rule. Connecting TX → TX puts two drivers on the same wire and neither device receives the other's signal.    The laptop's TX pin, so both ends agree on the same direction.  This is the most common wiring mistake. Both devices would be transmitting on the same wire with no one listening.    Either pin — UART is symmetric.  UART is asymmetric: TX and RX are separate pins carrying traffic in opposite directions.     "
},
{
  "id": "rq-uart-baud-mismatch",
  "level": "2",
  "url": "rq-uart-concept.html#rq-uart-baud-mismatch",
  "type": "Reading Question",
  "number": "3.1.7.1",
  "title": "",
  "body": "  The three consecutive LOW bits (D3, D4, D5 = 0) in are indistinguishable from a single long LOW pulse if you don't know the baud rate. What is the only way a receiver can correctly count them as three separate zero bits?     By sampling the wire at exactly the agreed baud rate — once per bit period — so that each 104 µs window is counted as one bit regardless of whether consecutive bits have the same value.  Correct. This is precisely what asynchronous means: there is no shared clock, so both sides must independently maintain the same rate. Any drift causes bits to be miscounted from that point on.    By detecting voltage transitions — the line changes level at each new bit.  Consecutive identical bits produce no transition at all. A receiver that relies on transitions cannot count repeated 0s or 1s correctly.    By measuring the total duration of the LOW pulse and dividing by a standard minimum bit width.  There is no standard minimum — bit width depends on baud rate, which varies across devices. Without knowing the agreed rate, the duration alone tells you nothing about the number of bits.    "
},
{
  "id": "rq-uart-stop-purpose",
  "level": "2",
  "url": "rq-uart-concept.html#rq-uart-stop-purpose",
  "type": "Reading Question",
  "number": "3.1.7.2",
  "title": "",
  "body": "  Could you design a working UART protocol that uses a start bit and 8 data bits but no stop bit? What happens when sending two consecutive bytes where D7 of the first byte is 0 (LOW)?     No. Without the stop bit the line stays LOW after D7 = 0, so there is no HIGH-to-LOW falling edge to signal the start bit of the next byte. The receiver never sees the second byte begin.  Correct. The start bit is detected as a falling edge. The stop bit's sole job is to guarantee the line returns HIGH so that falling edge is possible.    Yes. The gap between bytes is enough for the receiver to reset.  There is no guaranteed gap in a continuous UART stream — bytes can follow immediately one after another. The stop bit is the only guaranteed return to HIGH.    No, but only because the hardware requires it — there is no fundamental protocol reason.  There is a fundamental reason: start-bit detection depends on a falling edge, which requires the line to be HIGH first. The stop bit provides that guarantee.    "
},
{
  "id": "rq-uart-txrx",
  "level": "2",
  "url": "rq-uart-concept.html#rq-uart-txrx",
  "type": "Reading Question",
  "number": "3.1.7.3",
  "title": "",
  "body": " If the STM32's TX pin is labeled transmit, which pin on the laptop's USB-serial adapter should it connect to, and why?    The laptop's RX pin, because TX on one device must connect to RX on the other — data sent by one must be received by the other.  Correct. TX → RX is the fundamental UART wiring rule. Connecting TX → TX puts two drivers on the same wire and neither device receives the other's signal.    The laptop's TX pin, so both ends agree on the same direction.  This is the most common wiring mistake. Both devices would be transmitting on the same wire with no one listening.    Either pin — UART is symmetric.  UART is asymmetric: TX and RX are separate pins carrying traffic in opposite directions.    "
},
{
  "id": "subsec-uart-part1",
  "level": "1",
  "url": "subsec-uart-part1.html",
  "type": "Subsection",
  "number": "3.2.1",
  "title": "Part 1: Does printf Work?",
  "body": " Part 1: Does printf Work?   In this first activity you will set up a project that prints a live counter to your laptop over UART — the same workflow you will use as a debugging tool throughout the rest of the course. The figure below shows what the finished project should look like in STM32CubeIDE; use it to check your file placement before you build.   Finished Counter project in STM32CubeIDE. uart.c and uart.h live in Library\/mylib\/ ; counter.c lives in Src\/ . All three files are downloaded from Canvas.     Set Up and Run the Counter    Download counter.c , uart.c , and uart.h from Canvas.  In STM32CubeIDE, right-click TemplateProject and copy it. Rename the copy Counter .  Copy uart.c and uart.h into your mylib folder.  Copy and paste counter.c into Counter\/Src\/ .  Build the project and flash it to your Nucleo.  Open CoolTerm and click Options . Configure it as shown next, then click OK. Save the configuration using the toolbar Save button and name the file ENGS28.CoolTermSettings — next time you can reload it instantly with Open . If you open the saved settings but have your Nucleo connected to a different USB port of your laptop and see a serial port not available warning, choose Select a different port and pick the USB modem entry.  Click Connect, then press the black reset button on the Nucleo. You should see the counter incrementing.    CoolTerm Options → Serial Port. Click the Port drop-down and select the entry that looks like a USB modem or USB serial device (on Mac: usbmodem… ; on Windows: COM4 (USB Serial Device) ) — not debug-console or Bluetooth. Set Baudrate to 9600 , Data Bits to 8 , Parity to None , Stop Bits to 1 , and leave all Flow Control boxes unchecked.     CoolTerm Options → Data Handling. Check Format TAB separated text and Convert Non-printable Characters ; leave everything else unchecked.     CoolTerm showing counter output. Each line prints once per 500 ms; pressing the Nucleo reset button restarts from zero.    Once it is working, go to Options, change the Baudrate to 4800, click OK, disconnect, reconnect, and reset the board. Observe the output. Then try 115200. In your notebook, write one sentence explaining each garbled result in terms of bit period.       CoolTerm Options: Serial Port and Data Handling.         "
},
{
  "id": "fig-counter-project-structure",
  "level": "2",
  "url": "subsec-uart-part1.html#fig-counter-project-structure",
  "type": "Figure",
  "number": "3.2.1",
  "title": "",
  "body": " Finished Counter project in STM32CubeIDE. uart.c and uart.h live in Library\/mylib\/ ; counter.c lives in Src\/ . All three files are downloaded from Canvas.   "
},
{
  "id": "act-uart-setup",
  "level": "2",
  "url": "subsec-uart-part1.html#act-uart-setup",
  "type": "Activity",
  "number": "3.2.1",
  "title": "Set Up and Run the Counter.",
  "body": " Set Up and Run the Counter    Download counter.c , uart.c , and uart.h from Canvas.  In STM32CubeIDE, right-click TemplateProject and copy it. Rename the copy Counter .  Copy uart.c and uart.h into your mylib folder.  Copy and paste counter.c into Counter\/Src\/ .  Build the project and flash it to your Nucleo.  Open CoolTerm and click Options . Configure it as shown next, then click OK. Save the configuration using the toolbar Save button and name the file ENGS28.CoolTermSettings — next time you can reload it instantly with Open . If you open the saved settings but have your Nucleo connected to a different USB port of your laptop and see a serial port not available warning, choose Select a different port and pick the USB modem entry.  Click Connect, then press the black reset button on the Nucleo. You should see the counter incrementing.    CoolTerm Options → Serial Port. Click the Port drop-down and select the entry that looks like a USB modem or USB serial device (on Mac: usbmodem… ; on Windows: COM4 (USB Serial Device) ) — not debug-console or Bluetooth. Set Baudrate to 9600 , Data Bits to 8 , Parity to None , Stop Bits to 1 , and leave all Flow Control boxes unchecked.     CoolTerm Options → Data Handling. Check Format TAB separated text and Convert Non-printable Characters ; leave everything else unchecked.     CoolTerm showing counter output. Each line prints once per 500 ms; pressing the Nucleo reset button restarts from zero.    Once it is working, go to Options, change the Baudrate to 4800, click OK, disconnect, reconnect, and reset the board. Observe the output. Then try 115200. In your notebook, write one sentence explaining each garbled result in terms of bit period.   "
},
{
  "id": "fig-coolterm-settings",
  "level": "2",
  "url": "subsec-uart-part1.html#fig-coolterm-settings",
  "type": "Figure",
  "number": "3.2.6",
  "title": "",
  "body": " CoolTerm Options: Serial Port and Data Handling.      "
},
{
  "id": "subsec-uart-printf-usage",
  "level": "1",
  "url": "subsec-uart-printf-usage.html",
  "type": "Subsection",
  "number": "3.2.2",
  "title": "Using printf in Your Code",
  "body": " Using printf in Your Code  Now that printf is routing to your terminal, here is a quick reference for the format specifiers you will reach for throughout the course. The pattern is always the same: a format string containing one specifier per value, followed by the values.  #include \"ES28.h\" \/* always needed for register definitions *\/ #include <stdio.h> \/* for printf *\/ #include \"uart.h\" \/* for uart2_init *\/ \/* NOTE: variable declarations and other initialization omitted below — replace count, ch, and adc_val with your actual variables. *\/ int main(void) { uart2_init(); \/* must be called before any printf *\/ \/* Startup banner — print once before the loop *\/ printf(\"Counter with serial output demo\\r\\n\"); printf(\"Decimal\\tHex\\r\\n\"); while (1) { \/* Signed decimal — counts, ADC readings, sensor values *\/ printf(\"count = %d\\r\\n\", count); \/* 32-bit register value — use %lx (long) because MODER is 32 bits. Make sure the GPIOA clock is enabled before reading this register. *\/ printf(\"MODER = 0x%08lx\\r\\n\", GPIOA->MODER); \/* 16-bit value — use %x (unsigned int) *\/ printf(\"adc_val = 0x%04x\\r\\n\", adc_val); \/* Two columns separated by a tab *\/ printf(\"%d\\t%x\\r\\n\", count, count); \/* Single character *\/ printf(\"key = %c\\r\\n\", ch); \/* String *\/ printf(\"state = %s\\r\\n\", \"ON\"); } return 1; }  Two rules to remember every time: end each line with \\r\\n (not just \\n ) so the terminal moves the cursor back to the left edge, and call uart2_init() once at the top of main before any printf .   Note that %f is not supported by the printf library used in this course — floating-point formatting requires a much larger library. To print a floating-point value, convert to integer first: compute int mV = (int)(voltage * 1000) and print printf(\"%d mV\", mV) .    "
},
{
  "id": "subsec-uart-part2",
  "level": "1",
  "url": "subsec-uart-part2.html",
  "type": "Subsection",
  "number": "3.2.3",
  "title": "Part 2: How Does the UART Driver Work?",
  "body": " Part 2: How Does the UART Driver Work?   Below is uart.c with all comments stripped. Annotate your assigned section — explain what each line does and why it is necessary. After eight minutes you will teach your section to a classmate; your goal is that they could explain any line without your help.  #include \"stm32c0xx.h\" #include \"uart.h\" #include <stdio.h> #define APB_CLK 12000000U #define BAUD_RATE 9600U void uart2_init(void) { \/\/ ── Group A ────────────────────────────────────────────────── RCC->IOPENR |= RCC_IOPENR_GPIOAEN; GPIOA->MODER &= ~((3U << 4) | (3U << 6)); GPIOA->MODER |= ((2U << 4) | (2U << 6)); GPIOA->AFR[0] &= ~((0xFU << 8) | (0xFU << 12)); GPIOA->AFR[0] |= ((1U << 8) | (1U << 12)); \/\/ ───────────────────────────────────────────────────────────── \/\/ ── Group B ────────────────────────────────────────────────── RCC->APBENR1 |= RCC_APBENR1_USART2EN; USART2->BRR = APB_CLK \/ BAUD_RATE; USART2->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE; \/\/ ───────────────────────────────────────────────────────────── } \/\/ ── Group C ────────────────────────────────────────────────────── void uart2_write(int ch) { while (!(USART2->ISR & USART_ISR_TXE_TXFNF)) {} USART2->TDR = (ch & 0xFF); } \/\/ ───────────────────────────────────────────────────────────────── \/\/ ── Group D ────────────────────────────────────────────────────── int uart2_read(void) { while (!(USART2->ISR & USART_ISR_RXNE_RXFNE)) {} return USART2->RDR & 0xFF; } \/\/ ─────────────────────────────────────────────────────────────────       "
},
{
  "id": "subsec-uart-part3",
  "level": "1",
  "url": "subsec-uart-part3.html",
  "type": "Subsection",
  "number": "3.2.4",
  "title": "Part 3: Start the Keyboard Counter",
  "body": " Part 3: Start the Keyboard Counter   Your counter currently only sends data. Now make it listen too: pressing a key in CoolTerm should change the count. The challenge is doing this without freezing the 500 ms print loop — use the technique below and test it in CoolTerm.   Keyboard-Controlled Counter   Modify counter.c so that:   The counter no longer auto-increments — it only changes when one of the control keys below is pressed. Any other key, or no key at all, leaves the count unchanged and the same value prints every 500 ms.  Pressing u or U increments the counter.  Pressing d or D decrements it.  Pressing r or R resets it to zero.   Use the RXNE flag for a non-blocking receive: if a byte is waiting in the receive register, read it and act on it; if not, skip straight to the print and delay. Do not call uart2_read() — that function blocks until a byte arrives and will freeze the counter.  while (1) { if (USART2->ISR & USART_ISR_RXNE_RXFNE) { char key = \/* read the character from the right register *\/; \/\/ handle key here ... } printf(\"count = %d\\r\\n\", count); delay_ms(500); }  Test it in CoolTerm: type a key and confirm the count changes on the next print line.   Optional challenge: Change the counter so that pressing u or U sets the direction to up and pressing d or D sets the direction to down — and then the counter keeps incrementing or decrementing automatically every 500 ms, even when no further key is pressed. Pressing r or R resets the count to zero and pauses auto-counting until a new direction key is received.      "
},
{
  "id": "act-uart-keyboard-counter",
  "level": "2",
  "url": "subsec-uart-part3.html#act-uart-keyboard-counter",
  "type": "Activity",
  "number": "3.2.2",
  "title": "Keyboard-Controlled Counter.",
  "body": " Keyboard-Controlled Counter   Modify counter.c so that:   The counter no longer auto-increments — it only changes when one of the control keys below is pressed. Any other key, or no key at all, leaves the count unchanged and the same value prints every 500 ms.  Pressing u or U increments the counter.  Pressing d or D decrements it.  Pressing r or R resets it to zero.   Use the RXNE flag for a non-blocking receive: if a byte is waiting in the receive register, read it and act on it; if not, skip straight to the print and delay. Do not call uart2_read() — that function blocks until a byte arrives and will freeze the counter.  while (1) { if (USART2->ISR & USART_ISR_RXNE_RXFNE) { char key = \/* read the character from the right register *\/; \/\/ handle key here ... } printf(\"count = %d\\r\\n\", count); delay_ms(500); }  Test it in CoolTerm: type a key and confirm the count changes on the next print line.   Optional challenge: Change the counter so that pressing u or U sets the direction to up and pressing d or D sets the direction to down — and then the counter keeps incrementing or decrementing automatically every 500 ms, even when no further key is pressed. Pressing r or R resets the count to zero and pauses auto-counting until a new direction key is received.   "
},
{
  "id": "subsec-uart-gpio",
  "level": "1",
  "url": "subsec-uart-gpio.html",
  "type": "Subsection",
  "number": "3.3.1",
  "title": "Step 1: GPIO Alternate Function Configuration",
  "body": " Step 1: GPIO Alternate Function Configuration  The STM32C031 has two USART instances: USART1 (full feature set) and USART2 (basic feature set — more than enough for this course). Both can be routed to several different pins via the alternate function system, but on the Nucleo board only one set of pins per peripheral is connected via solder bridges to the ST-LINK MCU: for USART2 these are TX on PA2 and RX on PA3. Note that PA2 and PA3 do not appear on the Arduino-compatible headers, but that does not matter here — because the connection to the ST-LINK is made internally on the board, no external wiring is needed at all.   The NUCLEO-C031C6 board. The ST-LINK section (top) contains a separate STM32 that acts as programmer and USB-to-serial bridge. PA2 (TX) and PA3 (RX) of the STM32C031 connect internally to the ST-LINK, which appears on your laptop as a USB serial device.    To use PA2 and PA3 for USART2, two register fields must be configured for each pin. First, the GPIOA_MODER register must be set to 10 (Alternate Function mode) for both pins.   GPIO port mode register (GPIOA_MODER). Each pin occupies two bits: 00 = Input, 01 = Output, 10 = Alternate Function, 11 = Analog. PA2 occupies bits [5:4] and PA3 occupies bits [7:6]; both must be set to 10 .    Setting MODER to 10 puts a pin in Alternate Function mode, but the MCU still needs to know which peripheral to route it to. The alternate function register GPIOA->AFR[0] (covering pins 0–7) stores a 4-bit code for each pin: AF0–AF15 each map to a different peripheral. The table below shows that PA2 and PA3 need AF1, which connects them to USART2.   Port A alternate function mapping (Table 13 from the STM32C031 datasheet). PA2 AF1 = USART2_TX; PA3 AF1 = USART2_RX. Writing 0001 into each pin's four-bit field in AFRL selects AF1.     GPIO Alternate Function Low Register (GPIOx_AFRL). Each pin occupies four bits; PA2 is at bits [11:8] and PA3 is at bits [15:12]. Writing 0001 to each field selects AF1 (USART2).     RCC I\/O port clock enable register (RCC_IOPENR). Setting bit 0 (GPIOAEN) ungates the clock to GPIOA; without this, writes to MODER and AFR have no effect. Reset value is 0x0000 0000 — all GPIO clocks off by default.    \/\/ Step 1: Enable GPIOA clock RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/\/ Step 2: Set PA2 and PA3 to Alternate Function mode (MODER = 10) GPIOA->MODER &= ~((3U << 4) | (3U << 6)); \/\/ clear bits for PA2, PA3 GPIOA->MODER |= ((2U << 4) | (2U << 6)); \/\/ set AF mode (10) \/\/ Step 3: Select AF1 (USART2) for PA2 and PA3 in AFRL GPIOA->AFR[0] &= ~((0xFU << 8) | (0xFU << 12)); \/\/ clear PA2, PA3 AF fields GPIOA->AFR[0] |= ((1U << 8) | (1U << 12)); \/\/ AF1 = USART2  If you look at uart.c , you will see the same operations written differently: each pin is configured in its own pair of lines, and the bit positions are given by named CMSIS macros instead of raw numbers. For example:  GPIOA->MODER &= ~GPIO_MODER_MODE2_Msk; GPIOA->MODER |= (GPIO_ALTERNATE << GPIO_MODER_MODE2_Pos); GPIOA->MODER &= ~GPIO_MODER_MODE3_Msk; GPIOA->MODER |= (GPIO_ALTERNATE << GPIO_MODER_MODE3_Pos);  Both forms do exactly the same thing. The driver style is more verbose but easier to read at a glance: the macro names tell you which pin and which field are being touched without having to count bit positions yourself. The compact form above combines both pins into one line to show the pattern concisely.    "
},
{
  "id": "fig-uart-physical-connection",
  "level": "2",
  "url": "subsec-uart-gpio.html#fig-uart-physical-connection",
  "type": "Figure",
  "number": "3.3.2",
  "title": "",
  "body": " The NUCLEO-C031C6 board. The ST-LINK section (top) contains a separate STM32 that acts as programmer and USB-to-serial bridge. PA2 (TX) and PA3 (RX) of the STM32C031 connect internally to the ST-LINK, which appears on your laptop as a USB serial device.   "
},
{
  "id": "fig-uart-moder-register",
  "level": "2",
  "url": "subsec-uart-gpio.html#fig-uart-moder-register",
  "type": "Figure",
  "number": "3.3.3",
  "title": "",
  "body": " GPIO port mode register (GPIOA_MODER). Each pin occupies two bits: 00 = Input, 01 = Output, 10 = Alternate Function, 11 = Analog. PA2 occupies bits [5:4] and PA3 occupies bits [7:6]; both must be set to 10 .   "
},
{
  "id": "fig-uart-af-table",
  "level": "2",
  "url": "subsec-uart-gpio.html#fig-uart-af-table",
  "type": "Figure",
  "number": "3.3.4",
  "title": "",
  "body": " Port A alternate function mapping (Table 13 from the STM32C031 datasheet). PA2 AF1 = USART2_TX; PA3 AF1 = USART2_RX. Writing 0001 into each pin's four-bit field in AFRL selects AF1.   "
},
{
  "id": "fig-uart-afr-register",
  "level": "2",
  "url": "subsec-uart-gpio.html#fig-uart-afr-register",
  "type": "Figure",
  "number": "3.3.5",
  "title": "",
  "body": " GPIO Alternate Function Low Register (GPIOx_AFRL). Each pin occupies four bits; PA2 is at bits [11:8] and PA3 is at bits [15:12]. Writing 0001 to each field selects AF1 (USART2).   "
},
{
  "id": "fig-rcc-iopenr",
  "level": "2",
  "url": "subsec-uart-gpio.html#fig-rcc-iopenr",
  "type": "Figure",
  "number": "3.3.6",
  "title": "",
  "body": " RCC I\/O port clock enable register (RCC_IOPENR). Setting bit 0 (GPIOAEN) ungates the clock to GPIOA; without this, writes to MODER and AFR have no effect. Reset value is 0x0000 0000 — all GPIO clocks off by default.   "
},
{
  "id": "subsec-uart-clock",
  "level": "1",
  "url": "subsec-uart-clock.html",
  "type": "Subsection",
  "number": "3.3.2",
  "title": "Step 2: Enable the USART Clock",
  "body": " Step 2: Enable the USART Clock  Just as GPIOA needed its clock enabled before we could write MODER or AFR, USART2 has its own clock that must be enabled before any of its registers can be configured. USART2's clock is controlled by bit 17 (USART2EN) of RCC_APBENR1 .   RCC APB peripheral clock enable register (APBENR1). The USART2EN bit (bit 17) must be set before any USART2 register can be written.    \/\/ Enable USART2 clock on the APB bus RCC->APBENR1 |= RCC_APBENR1_USART2EN;  "
},
{
  "id": "fig-uart-rcc-register",
  "level": "2",
  "url": "subsec-uart-clock.html#fig-uart-rcc-register",
  "type": "Figure",
  "number": "3.3.7",
  "title": "",
  "body": " RCC APB peripheral clock enable register (APBENR1). The USART2EN bit (bit 17) must be set before any USART2 register can be written.   "
},
{
  "id": "subsec-uart-brr",
  "level": "1",
  "url": "subsec-uart-brr.html",
  "type": "Subsection",
  "number": "3.3.3",
  "title": "Step 3: Set the Baud Rate",
  "body": " Step 3: Set the Baud Rate  Because UART has no shared clock line, the receiver has no way to know exactly when each bit starts. Its solution is to run its internal sampling clock at 16 times the baud rate, watch for the falling edge of the start bit, count 8 ticks to land in the middle of the start bit, then sample every 16 ticks after that — always reading each bit at its center, where the signal is most stable.   The receiver samples the line at 16× the baud rate (dense tick marks below the waveform). After detecting the start bit's falling edge, it counts 8 ticks to the bit center (black arrow), then samples every 16 ticks to capture each subsequent bit at its center (red arrows).    The USART Baud Rate Register ( USART_BRR ) holds a simple clock divisor (USARTDIV): the hardware divides the APB clock by USARTDIV to produce exactly 16 sample ticks per bit period.   Baud rate generation formula from the reference manual (Section 24.5.7). With oversampling by 16 (OVER8 = 0, the default), the baud rate equals the APB kernel clock divided by USARTDIV, which is simply the integer value written to BRR.    At 9600 baud with a 12 MHz APB clock: Note that BRR must be written before setting UE in CR1.   USART Baud Rate Register (BRR). Bits [15:0] hold USARTDIV — the integer divisor. For 9600 baud with a 12 MHz APB clock the value is 1250 (0x04E2).    #define SYS_FREQ 12000000U \/\/ 12 MHz HSI clock #define APB_CLK SYS_FREQ \/\/ APB prescaler = 1 #define UART_BAUD_RATE 9600U USART2->BRR = APB_CLK \/ UART_BAUD_RATE; \/\/ = 1250  If you look at uart.c , you will see the driver write (PeriphClk + BaudRate\/2) \/ BaudRate instead of plain division. Adding half the divisor before dividing is the standard way to round rather than truncate: it gives rather than , so the result is accurate even when the clock frequency is not evenly divisible by the baud rate. With 12 MHz and 9600 baud the division is exact, so both formulas give 1250.    "
},
{
  "id": "fig-uart-oversampling",
  "level": "2",
  "url": "subsec-uart-brr.html#fig-uart-oversampling",
  "type": "Figure",
  "number": "3.3.8",
  "title": "",
  "body": " The receiver samples the line at 16× the baud rate (dense tick marks below the waveform). After detecting the start bit's falling edge, it counts 8 ticks to the bit center (black arrow), then samples every 16 ticks to capture each subsequent bit at its center (red arrows).   "
},
{
  "id": "fig-uart-brr-formula",
  "level": "2",
  "url": "subsec-uart-brr.html#fig-uart-brr-formula",
  "type": "Figure",
  "number": "3.3.9",
  "title": "",
  "body": " Baud rate generation formula from the reference manual (Section 24.5.7). With oversampling by 16 (OVER8 = 0, the default), the baud rate equals the APB kernel clock divided by USARTDIV, which is simply the integer value written to BRR.   "
},
{
  "id": "fig-uart-brr-register",
  "level": "2",
  "url": "subsec-uart-brr.html#fig-uart-brr-register",
  "type": "Figure",
  "number": "3.3.10",
  "title": "",
  "body": " USART Baud Rate Register (BRR). Bits [15:0] hold USARTDIV — the integer divisor. For 9600 baud with a 12 MHz APB clock the value is 1250 (0x04E2).   "
},
{
  "id": "subsec-uart-cr1",
  "level": "1",
  "url": "subsec-uart-cr1.html",
  "type": "Subsection",
  "number": "3.3.4",
  "title": "Step 4: Enable Transmitter, Receiver, and USART",
  "body": " Step 4: Enable Transmitter, Receiver, and USART   USART_CR1 and USART_CR2 together control the frame format and operating mode. The reset value of 0x00000000 already gives us 8 data bits, 1 stop bit, no parity, and oversampling by 16 — exactly what we need for 8N1 operation. The only bits we must set explicitly are TE (bit 3, transmitter enable), RE (bit 2, receiver enable), and UE (bit 0, USART enable). UE must be set last.   USART_CR1 (top) and USART_CR2 (bottom) with the relevant bits annotated. The reset value of 0x0000 0000 already selects oversampling by 16 (OVER8 = 0), 8 data bits (M0 = M1 = 0), no parity (PCE = 0), and 1 stop bit (STOP[1:0] = 00). The only bits to write are TE, RE, and UE — in that order.    \/\/ Enable transmitter (TE) and receiver (RE), then enable USART (UE) last USART2->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE;   "
},
{
  "id": "fig-uart-cr1",
  "level": "2",
  "url": "subsec-uart-cr1.html#fig-uart-cr1",
  "type": "Figure",
  "number": "3.3.11",
  "title": "",
  "body": " USART_CR1 (top) and USART_CR2 (bottom) with the relevant bits annotated. The reset value of 0x0000 0000 already selects oversampling by 16 (OVER8 = 0), 8 data bits (M0 = M1 = 0), no parity (PCE = 0), and 1 stop bit (STOP[1:0] = 00). The only bits to write are TE, RE, and UE — in that order.   "
},
{
  "id": "subsec-uart-send-receive",
  "level": "1",
  "url": "subsec-uart-send-receive.html",
  "type": "Subsection",
  "number": "3.3.5",
  "title": "Sending and Receiving Data",
  "body": " Sending and Receiving Data  After initialization, transmitting a byte requires waiting until the transmit data register is empty (TXE bit in USART_ISR ), then writing the byte to USART_TDR . Receiving a byte requires waiting until a byte has been received (RXNE bit), then reading USART_RDR .   USART Interrupt and Status Register (USART_ISR). The TXE bit (bit 7) is set when the transmit data register is empty and ready for a new byte. The RXNE bit (bit 5) is set when a received byte is waiting to be read.    \/\/ Transmit one byte void uart2_write(int ch) { \/\/ Wait until TX data register is empty while (!(USART2->ISR & USART_ISR_TXE_TXFNF)) {} USART2->TDR = (ch & 0xFF); } \/\/ Receive one byte (blocking) int uart2_read(void) { \/\/ Wait until a byte has been received while (!(USART2->ISR & USART_ISR_RXNE_RXFNE)) {} return USART2->RDR & 0xFF; }  With the retarget layer in uart.c , printf calls uart2_write for each character, and getchar() calls uart2_read . This lets you use the full C standard I\/O library over the serial port.  "
},
{
  "id": "fig-uart-isr",
  "level": "2",
  "url": "subsec-uart-send-receive.html#fig-uart-isr",
  "type": "Figure",
  "number": "3.3.12",
  "title": "",
  "body": " USART Interrupt and Status Register (USART_ISR). The TXE bit (bit 7) is set when the transmit data register is empty and ready for a new byte. The RXNE bit (bit 5) is set when a received byte is waiting to be read.   "
},
{
  "id": "rq-uart-config",
  "level": "1",
  "url": "rq-uart-config.html",
  "type": "Check Your Understanding",
  "number": "3.3.6",
  "title": "Check Your Understanding",
  "body": "  You enable USART2 (set UE in CR1) before setting the BRR. What is likely to happen?   The baud rate may be wrong because BRR defaults to 0, giving an undefined or infinite divisor.  Correct. Always configure BRR before enabling the USART.  Nothing — the USART will wait for BRR to be written before operating.  The hardware does not wait; once UE is set it uses whatever is in BRR at that moment.  A hardware fault exception is triggered.  Writing registers in the wrong order does not cause a fault; it just produces incorrect behavior.  The USART works fine — order does not matter.  Order matters. Enable the USART only after all other registers are configured.    "
},
{
  "id": "rq-uart-order",
  "level": "2",
  "url": "rq-uart-config.html#rq-uart-order",
  "type": "Reading Question",
  "number": "3.3.6.1",
  "title": "",
  "body": " You enable USART2 (set UE in CR1) before setting the BRR. What is likely to happen?   The baud rate may be wrong because BRR defaults to 0, giving an undefined or infinite divisor.  Correct. Always configure BRR before enabling the USART.  Nothing — the USART will wait for BRR to be written before operating.  The hardware does not wait; once UE is set it uses whatever is in BRR at that moment.  A hardware fault exception is triggered.  Writing registers in the wrong order does not cause a fault; it just produces incorrect behavior.  The USART works fine — order does not matter.  Order matters. Enable the USART only after all other registers are configured.   "
},
{
  "id": "subsec-uart-header",
  "level": "1",
  "url": "subsec-uart-header.html",
  "type": "Subsection",
  "number": "3.4.1",
  "title": "The Header File: uart.h",
  "body": " The Header File: uart.h  The header declares the three public functions the driver exposes. Everything else in uart.c is an implementation detail hidden from the rest of the project.  \/\/ uart.h — USART2 driver interface for ENGS 28 #ifndef UART_H #define UART_H void uart2_init(void); \/\/ configure USART2 for 9600 8N1, PA2=TX, PA3=RX void uart2_write(int ch); \/\/ transmit one byte (blocking) int uart2_read(void); \/\/ receive one byte (blocking) #endif \/\/ UART_H  Notice that printf is not listed here — it comes from the C standard library. The driver connects printf to the UART via a retarget layer , described at the end of uart.c below.  "
},
{
  "id": "subsec-uart-header-4",
  "level": "2",
  "url": "subsec-uart-header.html#subsec-uart-header-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "retarget layer "
},
{
  "id": "subsec-uart-full-driver",
  "level": "1",
  "url": "subsec-uart-full-driver.html",
  "type": "Subsection",
  "number": "3.4.2",
  "title": "The Complete Implementation: uart.c",
  "body": " The Complete Implementation: uart.c  The code below is the complete driver, reproduced with annotations that answer the why behind each step. You saw the individual register writes in ; here they appear together as a working whole.  #include \"uart.h\" #include \"ES28.h\" #define SYS_FREQ 12000000U \/\/ 12 MHz HSI (HSI48 divided by 4 by default) #define APB_CLK SYS_FREQ \/\/ APB bus runs at the same frequency (no prescaler) #define UART_BAUD_RATE 9600 \/\/ Prototypes of static helper functions defined at the bottom of the file. \/\/ Declaring them here lets uart2_init() call them even though they are defined later. static void uart_set_baudrate(USART_TypeDef *USARTx, uint32_t PeriphClk, uint32_t BaudRate); static uint16_t compute_uart_bd(uint32_t PeriphClk, uint32_t BaudRate); void uart2_write(int ch); \/\/ ── Retarget layer ────────────────────────────────────────────────────────── \/\/ __io_putchar is a WEAK symbol in the ARM C library — the linker uses the \/\/ library's built-in (no-op) version unless we supply a stronger definition. \/\/ Defining it here routes all printf output to uart2_write, with no other \/\/ changes to application code. int __io_putchar(int ch) { uart2_write(ch); return ch; } \/\/ ── uart2_init ────────────────────────────────────────────────────────────── \/\/ Configure USART2 for 9600 baud 8N1, with TX on PA2 and RX on PA3. \/\/ Must be called once before uart2_write(), uart2_read(), or printf(). void uart2_init(void) { \/\/ Step 1: enable the GPIOA clock. \/\/ Without this, all GPIOA register writes are silently discarded — \/\/ one of the most common \"nothing works\" bugs. RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/\/ Step 2: set PA2 (TX) and PA3 (RX) to Alternate Function mode. \/\/ The CMSIS macros encode the bit field position, so we do not need \/\/ to count bit positions by hand. Each pin is configured separately \/\/ for clarity: clear the field first, then set it. GPIOA->MODER &= ~GPIO_MODER_MODE2_Msk; GPIOA->MODER |= (GPIO_ALTERNATE << GPIO_MODER_MODE2_Pos); \/\/ PA2 GPIOA->MODER &= ~GPIO_MODER_MODE3_Msk; GPIOA->MODER |= (GPIO_ALTERNATE << GPIO_MODER_MODE3_Pos); \/\/ PA3 \/\/ Step 3: select AF1 (USART2) for PA2 and PA3 in the AFRL register. \/\/ AFRL covers pins 0–7; each pin has a 4-bit field. \/\/ GPIO_AF1 = 1, which maps to USART2 for both PA2 and PA3. GPIOA->AFR[0] &= ~GPIO_AFRL_AFSEL2_Msk; GPIOA->AFR[0] |= (GPIO_AF1 << GPIO_AFRL_AFSEL2_Pos); \/\/ PA2 → USART2 TX GPIOA->AFR[0] &= ~GPIO_AFRL_AFSEL3_Msk; GPIOA->AFR[0] |= (GPIO_AF1 << GPIO_AFRL_AFSEL3_Pos); \/\/ PA3 → USART2 RX \/\/ Step 4: enable the USART2 clock on the APB1 bus. \/\/ No USART2 register can be written until its clock is enabled. RCC->APBENR1 |= RCC_APBENR1_USART2EN; \/\/ Step 5: set the baud rate via a helper function. \/\/ uart_set_baudrate calls compute_uart_bd, which divides APB_CLK by \/\/ UART_BAUD_RATE (with rounding) to produce the value for BRR. uart_set_baudrate(USART2, APB_CLK, UART_BAUD_RATE); \/\/ Step 6: enable the transmitter (TE) and receiver (RE) first, \/\/ then enable the USART module (UE) in a separate write. \/\/ UE must come last — enabling it before BRR is loaded would latch \/\/ BRR = 0 (the reset value) and produce the wrong baud rate. USART2->CR1 = USART_CR1_RE | USART_CR1_TE; USART2->CR1 |= USART_CR1_UE; } \/\/ ── uart2_write ───────────────────────────────────────────────────────────── \/\/ Transmit one byte. Polls TXE_TXFNF (Transmit Data Register Empty) until \/\/ the hardware shift register is ready, then writes the byte to TDR. void uart2_write(int ch) { while (!(USART2->ISR & USART_ISR_TXE_TXFNF)) {} USART2->TDR = (ch & 0xFF); \/\/ mask to 8 bits } \/\/ ── uart2_read ────────────────────────────────────────────────────────────── \/\/ Receive one byte. Polls RXNE_RXFNE (Receive Data Register Not Empty) until \/\/ a complete frame arrives, then reads it from RDR. \/\/ Reading RDR automatically clears the RXNE flag. int uart2_read(void) { while (!(USART2->ISR & USART_ISR_RXNE_RXFNE)) {} return (USART2->RDR & 0xFF); } \/\/ ── Helper functions ──────────────────────────────────────────────────────── static void uart_set_baudrate(USART_TypeDef *USARTx, uint32_t PeriphClk, uint32_t BaudRate) { USARTx->BRR = compute_uart_bd(PeriphClk, BaudRate); } \/\/ Compute the BRR divisor using integer rounding: \/\/ round(PeriphClk \/ BaudRate) = (PeriphClk + BaudRate\/2) \/ BaudRate \/\/ This gives the correct result even when the division is not exact. static uint16_t compute_uart_bd(uint32_t PeriphClk, uint32_t BaudRate) { return ((PeriphClk + (BaudRate \/ 2U)) \/ BaudRate); }  "
},
{
  "id": "subsec-uart-retarget",
  "level": "1",
  "url": "subsec-uart-retarget.html",
  "type": "Subsection",
  "number": "3.4.3",
  "title": "The Retarget Layer",
  "body": " The Retarget Layer  The function __io_putchar near the top of uart.c is the subtlest part of the driver. In the ARM C library, __io_putchar is declared as a weak symbol : the linker uses the library's built-in (no-op) version unless you supply your own stronger definition. By defining it in uart.c , we override the weak version, and every character that printf (or putchar ) emits is automatically routed to uart2_write — no changes to application code required.  Notice that __io_putchar passes the character straight through without any modification. This means a bare '\\n' arrives at the terminal as ASCII 10 (line feed) only — and most terminal emulators, including CoolTerm, interpret a lone line feed as \"move cursor down\" but not \"return to column 0.\" The result is the classic staircase effect , where successive lines march diagonally down and to the right. To avoid it, always end your format strings with \"\\r\\n\" rather than just \"\\n\" :  printf(\"Voltage: %d mV\\r\\n\", mV); \/\/ correct: CR+LF printf(\"Voltage: %d mV\\n\", mV); \/\/ wrong: LF only → staircase  "
},
{
  "id": "subsec-uart-retarget-2",
  "level": "2",
  "url": "subsec-uart-retarget.html#subsec-uart-retarget-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "weak symbol "
},
{
  "id": "subsec-uart-retarget-3",
  "level": "2",
  "url": "subsec-uart-retarget.html#subsec-uart-retarget-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "staircase effect "
},
{
  "id": "rq-uart-driver",
  "level": "1",
  "url": "rq-uart-driver.html",
  "type": "Check Your Understanding",
  "number": "3.4.4",
  "title": "Check Your Understanding",
  "body": "   uart2_write spins waiting for the TXE flag before writing to TDR. What does TXE indicate, and what would happen if you removed that check and wrote to TDR immediately on every call?    TXE (Transmit Data Register Empty) means the hardware shift register has consumed the previous byte and TDR can accept a new one. Skipping the check and writing TDR while the previous byte is still being shifted out would overwrite it, silently dropping that character.  Correct. TXE is the ready handshake between your code and the hardware shift register. Ignoring it causes data loss at high data rates or back-to-back writes.    TXE means a transmit error occurred; skipping the check causes the USART to assert a fault interrupt.  TXE stands for Transmit Data Register Empty — it is a readiness flag, not an error flag. Transmit errors use different flags (e.g. framing error, noise error).    Removing the check would make transmission faster with no side effects because the USART hardware buffers bytes automatically.  The STM32C031 USART has only a one-byte TDR — there is no deeper FIFO in basic mode. Consecutive writes without checking TXE overwrite the previous byte before it leaves the chip.      The retarget layer sends each character to uart2_write without modification. If you call printf(\"Alpha\\nBeta\\nGamma\\n\") , what will the output look like in CoolTerm, and what change to the format string would fix it?    CoolTerm treats '\\n' (line feed, ASCII 10) as \"move cursor down\" but not \"return to column 0.\" The three words appear in a staircase, each shifted one column to the right of the one above. Changing the format string to use \"\\r\\n\" instead of \"\\n\" sends a carriage return first, which moves the cursor to column 0 before the line feed advances to the next line.  Correct — '\\r' (ASCII 13) is the carriage return that moves the cursor to column 0. Because the retarget layer does not insert it automatically, your format strings must include it explicitly.    CoolTerm automatically converts bare '\\n' to CR+LF, so the output looks correct with no change needed.  CoolTerm's default mode does not perform LF→CRLF translation. Some terminal applications offer this as an option, but relying on it makes your code non-portable and hides the underlying issue.    The terminal displays a literal backslash-n between the words instead of a newline.  '\\n' in a C string literal is the control character ASCII 10, not the two printable characters \\ and n . The terminal does receive a line feed and does advance the cursor — just not back to column 0.      The driver enables USART2 with RCC->APBENR1 . When you adapt the driver for USART1 in the lab exercise, you will need a different register. How would you find out which APB bus a given peripheral is connected to?    Look at the STM32C031 reference manual's clock tree diagram or the RCC chapter's register descriptions. Each APBENR register lists the peripherals on that bus; searching the register map for \"USART1EN\" reveals which register contains the enable bit and therefore which bus it is on.  Correct. The reference manual is the authoritative source. Note that USART1 is an APB2 peripheral, so its enable bit is in RCC->APBENR2 , not APBENR1 .    All USART peripherals are on the same bus, so you can always use the same RCC register.  USART1 is on APB2 while USART2 is on APB1. Using APBENR1 to try to enable USART1 sets a different bit (or none at all), and the USART1 clock remains disabled.    The peripheral number tells you the bus: odd-numbered USARTs are on APB1, even-numbered on APB2.  This is a convenient rule of thumb for some MCU families but it does not hold for the STM32C031. Always verify with the datasheet or reference manual.     "
},
{
  "id": "rq-uart-txe",
  "level": "2",
  "url": "rq-uart-driver.html#rq-uart-txe",
  "type": "Reading Question",
  "number": "3.4.4.1",
  "title": "",
  "body": "  uart2_write spins waiting for the TXE flag before writing to TDR. What does TXE indicate, and what would happen if you removed that check and wrote to TDR immediately on every call?    TXE (Transmit Data Register Empty) means the hardware shift register has consumed the previous byte and TDR can accept a new one. Skipping the check and writing TDR while the previous byte is still being shifted out would overwrite it, silently dropping that character.  Correct. TXE is the ready handshake between your code and the hardware shift register. Ignoring it causes data loss at high data rates or back-to-back writes.    TXE means a transmit error occurred; skipping the check causes the USART to assert a fault interrupt.  TXE stands for Transmit Data Register Empty — it is a readiness flag, not an error flag. Transmit errors use different flags (e.g. framing error, noise error).    Removing the check would make transmission faster with no side effects because the USART hardware buffers bytes automatically.  The STM32C031 USART has only a one-byte TDR — there is no deeper FIFO in basic mode. Consecutive writes without checking TXE overwrite the previous byte before it leaves the chip.    "
},
{
  "id": "rq-uart-crlf",
  "level": "2",
  "url": "rq-uart-driver.html#rq-uart-crlf",
  "type": "Reading Question",
  "number": "3.4.4.2",
  "title": "",
  "body": " The retarget layer sends each character to uart2_write without modification. If you call printf(\"Alpha\\nBeta\\nGamma\\n\") , what will the output look like in CoolTerm, and what change to the format string would fix it?    CoolTerm treats '\\n' (line feed, ASCII 10) as \"move cursor down\" but not \"return to column 0.\" The three words appear in a staircase, each shifted one column to the right of the one above. Changing the format string to use \"\\r\\n\" instead of \"\\n\" sends a carriage return first, which moves the cursor to column 0 before the line feed advances to the next line.  Correct — '\\r' (ASCII 13) is the carriage return that moves the cursor to column 0. Because the retarget layer does not insert it automatically, your format strings must include it explicitly.    CoolTerm automatically converts bare '\\n' to CR+LF, so the output looks correct with no change needed.  CoolTerm's default mode does not perform LF→CRLF translation. Some terminal applications offer this as an option, but relying on it makes your code non-portable and hides the underlying issue.    The terminal displays a literal backslash-n between the words instead of a newline.  '\\n' in a C string literal is the control character ASCII 10, not the two printable characters \\ and n . The terminal does receive a line feed and does advance the cursor — just not back to column 0.    "
},
{
  "id": "rq-uart-apb",
  "level": "2",
  "url": "rq-uart-driver.html#rq-uart-apb",
  "type": "Reading Question",
  "number": "3.4.4.3",
  "title": "",
  "body": " The driver enables USART2 with RCC->APBENR1 . When you adapt the driver for USART1 in the lab exercise, you will need a different register. How would you find out which APB bus a given peripheral is connected to?    Look at the STM32C031 reference manual's clock tree diagram or the RCC chapter's register descriptions. Each APBENR register lists the peripherals on that bus; searching the register map for \"USART1EN\" reveals which register contains the enable bit and therefore which bus it is on.  Correct. The reference manual is the authoritative source. Note that USART1 is an APB2 peripheral, so its enable bit is in RCC->APBENR2 , not APBENR1 .    All USART peripherals are on the same bus, so you can always use the same RCC register.  USART1 is on APB2 while USART2 is on APB1. Using APBENR1 to try to enable USART1 sets a different bit (or none at all), and the USART1 clock remains disabled.    The peripheral number tells you the bus: odd-numbered USARTs are on APB1, even-numbered on APB2.  This is a convenient rule of thumb for some MCU families but it does not hold for the STM32C031. Always verify with the datasheet or reference manual.    "
},
{
  "id": "subsec-datasheets-intro",
  "level": "1",
  "url": "subsec-datasheets-intro.html",
  "type": "Subsection",
  "number": "4.1.1",
  "title": "Embedded Systems Need Peripherals",
  "body": " Embedded Systems Need Peripherals  A microcontroller on its own senses nothing and drives nothing. Every useful embedded system connects the MCU to the physical world through input and output components:   Top-level view of an embedded system. Sensors, switches, and data streams feed into the MCU through interfaces; the MCU sends commands out to displays, actuators, and data streams through interfaces on the other side.    Getting a peripheral to work requires answers to many questions that only the component's datasheet can provide. What supply voltage does it need — and what are the minimum and maximum operating conditions it can tolerate? What signal does it produce or consume, and what does that signal actually represent? Does the chip do its own analog-to-digital conversion and give you numbers over I²C, or does it output a raw voltage that your MCU's ADC must interpret? Is there a built-in analog front end, or do you need external signal conditioning? How should you wire it up, and what does your code need to configure before it will respond? These are a few of the essential questions — but not the only ones.  Datasheets can be intimidating — they are written for engineers who already know the jargon, and they pack enormous amounts of information into dense tables. But they follow a predictable structure. Once you know where to look, you can navigate any datasheet quickly.   Every Datasheet Has the Same Structure  The first page always gives the high-level picture: Features (a bullet list of what the part does) and a Description paragraph (always read this — it names the interface and application). The body then contains, roughly in this order:   Pinout \/ Pin descriptions — which pin is which, and what each one does. Absolute Maximum Ratings — never exceed these; doing so destroys the part. Recommended Operating Conditions — the range the part is designed to work in. Electrical Characteristics — voltages, currents, timing, in a table with Min \/ Typ \/ Max columns. Application Information (sometimes called \"Theory of Operation\" or \"Detailed Description\") — the most important section for a designer: example schematics, register maps, and usage notes. Packaging Information — physical dimensions of the available package options (DIP, SOT-23, QFN, etc.). Rarely relevant for breadboard work, but critical if you are designing a PCB.  One notation to watch for: a pin name with a bar over it (or a star next to it in a table) is active low — you pull it to ground to activate it, rather than driving it high.      "
},
{
  "id": "fig-mcu-io-block",
  "level": "2",
  "url": "subsec-datasheets-intro.html#fig-mcu-io-block",
  "type": "Figure",
  "number": "4.1.1",
  "title": "",
  "body": " Top-level view of an embedded system. Sensors, switches, and data streams feed into the MCU through interfaces; the MCU sends commands out to displays, actuators, and data streams through interfaces on the other side.   "
},
{
  "id": "subsec-datasheets-intro-4",
  "level": "2",
  "url": "subsec-datasheets-intro.html#subsec-datasheets-intro-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "datasheet "
},
{
  "id": "insight-datasheet-sections",
  "level": "2",
  "url": "subsec-datasheets-intro.html#insight-datasheet-sections",
  "type": "Insight",
  "number": "4.1.2",
  "title": "Every Datasheet Has the Same Structure.",
  "body": " Every Datasheet Has the Same Structure  The first page always gives the high-level picture: Features (a bullet list of what the part does) and a Description paragraph (always read this — it names the interface and application). The body then contains, roughly in this order:   Pinout \/ Pin descriptions — which pin is which, and what each one does. Absolute Maximum Ratings — never exceed these; doing so destroys the part. Recommended Operating Conditions — the range the part is designed to work in. Electrical Characteristics — voltages, currents, timing, in a table with Min \/ Typ \/ Max columns. Application Information (sometimes called \"Theory of Operation\" or \"Detailed Description\") — the most important section for a designer: example schematics, register maps, and usage notes. Packaging Information — physical dimensions of the available package options (DIP, SOT-23, QFN, etc.). Rarely relevant for breadboard work, but critical if you are designing a PCB.  One notation to watch for: a pin name with a bar over it (or a star next to it in a table) is active low — you pull it to ground to activate it, rather than driving it high.  "
},
{
  "id": "subsec-datasheets-scavenger",
  "level": "1",
  "url": "subsec-datasheets-scavenger.html",
  "type": "Subsection",
  "number": "4.1.2",
  "title": "Datasheet Scavenger Hunt",
  "body": " Datasheet Scavenger Hunt  Your table will be assigned one component. Open its datasheet from Canvas, display it on your table's monitor, and complete the Datasheet Worksheet below. Each table will share their answers with the class at the end.  Possible components (one per table): TMP235 (analog temperature sensor), CdS photocell (light-dependent resistor), LSM303AGR (I²C accelerometer and magnetometer), HT16K33 (I²C LED matrix driver), and others as assigned.   The Datasheet Worksheet   Work through Parts A–D, then build your group slide in Part E. Some questions have two versions depending on whether your component is analog or digital — answer the one that applies. If you finish early, sketch a circuit on the board showing how you would connect your component to the STM32 Nucleo.    Part A — What Is It?  These answers are on the first page.    Read the Description (not the Features list). In one sentence, what does this component do?    Find the Recommended Operating Conditions . What supply voltage range (VDD or VCC) does the part accept? Is 3.3 V within that range? (For passive components with no supply pin, find the maximum rated operating voltage and power dissipation instead.)    Find the Absolute Maximum Ratings table. What is the maximum voltage the part can survive? Are there any other limits listed that a careless user might accidentally exceed?      Part B — How Does It Communicate?  These answers are in the Pinout and Application sections.    What interface does this component use? Check one (or more if it supports multiple): Passive (variable resistance) , Analog voltage output , I²C , SPI , UART\/serial , PWM input , Other .    List every pin needed for a minimal hookup. For each pin, write its name and what it connects to (VDD, GND, a specific STM32 pin, etc.).      Part C — What Does It Output or Require?  These answers are in the Electrical Characteristics table.     If your component is a passive sensor (variable resistance): What is the resistance at the minimum and maximum of its measurement range? Is the relationship between resistance and the measured quantity linear, or does the datasheet give a curve or formula?   If your component has an analog voltage output: What is the output voltage at the minimum and maximum of its measurement range? Is the relationship linear? Write the transfer function — the equation that converts output voltage to a physical value (temperature, light level, etc.).   If your component uses I²C: What address(es) can the part use? Many parts have a fixed base address with one or two address pins (A0, A1) that let you set the last bits, so multiple copies of the same chip can share a bus. List the possible addresses.   If your component uses SPI: What SPI mode does it require (clock polarity CPOL and clock phase CPHA)? What is the maximum clock frequency it supports?       Part C, continued — Current and Power  Also in the Electrical Characteristics table.    What is the maximum current the part draws from its supply? Does that rule out powering it from a GPIO pin (max 25 mA)? (For passive components with no supply pin, find the maximum power dissipation rating instead.)      Part D — Making It Work  These answers are in the Application Information section.    Find the example schematic or application circuit. Sketch the minimal hookup on the board at your table — just power, ground, and signal lines, labeled with pin names.    Name one thing you would need to configure or calculate in code before you could read data from this component. (Examples: set the I²C address, choose a gain setting, apply a conversion formula to the raw ADC reading.)    What was the most confusing or surprising thing you found in the datasheet?      Part E — Group Slide  Add one slide for your component to the shared class deck (link on Canvas). Include your answers to all of Parts A–D — everything except the board sketch. Keep it concise: use short phrases, not paragraphs. Other groups will use this as a reference during the share-out.     "
},
{
  "id": "act-datasheet-passport",
  "level": "2",
  "url": "subsec-datasheets-scavenger.html#act-datasheet-passport",
  "type": "Activity",
  "number": "4.1.1",
  "title": "The Datasheet Worksheet.",
  "body": " The Datasheet Worksheet   Work through Parts A–D, then build your group slide in Part E. Some questions have two versions depending on whether your component is analog or digital — answer the one that applies. If you finish early, sketch a circuit on the board showing how you would connect your component to the STM32 Nucleo.    Part A — What Is It?  These answers are on the first page.    Read the Description (not the Features list). In one sentence, what does this component do?    Find the Recommended Operating Conditions . What supply voltage range (VDD or VCC) does the part accept? Is 3.3 V within that range? (For passive components with no supply pin, find the maximum rated operating voltage and power dissipation instead.)    Find the Absolute Maximum Ratings table. What is the maximum voltage the part can survive? Are there any other limits listed that a careless user might accidentally exceed?      Part B — How Does It Communicate?  These answers are in the Pinout and Application sections.    What interface does this component use? Check one (or more if it supports multiple): Passive (variable resistance) , Analog voltage output , I²C , SPI , UART\/serial , PWM input , Other .    List every pin needed for a minimal hookup. For each pin, write its name and what it connects to (VDD, GND, a specific STM32 pin, etc.).      Part C — What Does It Output or Require?  These answers are in the Electrical Characteristics table.     If your component is a passive sensor (variable resistance): What is the resistance at the minimum and maximum of its measurement range? Is the relationship between resistance and the measured quantity linear, or does the datasheet give a curve or formula?   If your component has an analog voltage output: What is the output voltage at the minimum and maximum of its measurement range? Is the relationship linear? Write the transfer function — the equation that converts output voltage to a physical value (temperature, light level, etc.).   If your component uses I²C: What address(es) can the part use? Many parts have a fixed base address with one or two address pins (A0, A1) that let you set the last bits, so multiple copies of the same chip can share a bus. List the possible addresses.   If your component uses SPI: What SPI mode does it require (clock polarity CPOL and clock phase CPHA)? What is the maximum clock frequency it supports?       Part C, continued — Current and Power  Also in the Electrical Characteristics table.    What is the maximum current the part draws from its supply? Does that rule out powering it from a GPIO pin (max 25 mA)? (For passive components with no supply pin, find the maximum power dissipation rating instead.)      Part D — Making It Work  These answers are in the Application Information section.    Find the example schematic or application circuit. Sketch the minimal hookup on the board at your table — just power, ground, and signal lines, labeled with pin names.    Name one thing you would need to configure or calculate in code before you could read data from this component. (Examples: set the I²C address, choose a gain setting, apply a conversion formula to the raw ADC reading.)    What was the most confusing or surprising thing you found in the datasheet?      Part E — Group Slide  Add one slide for your component to the shared class deck (link on Canvas). Include your answers to all of Parts A–D — everything except the board sketch. Keep it concise: use short phrases, not paragraphs. Other groups will use this as a reference during the share-out.   "
},
{
  "id": "subsec-datasheets-shareout",
  "level": "1",
  "url": "subsec-datasheets-shareout.html",
  "type": "Subsection",
  "number": "4.1.3",
  "title": "Share-Out",
  "body": " Share-Out  Each table presents their slide in 30 seconds or less. Cover at least these three things:   Component name and what it does (one sentence).  Interface type: passive, analog, I²C, SPI, or other.  One thing that surprised you or that others should know.   As you listen, note which components use analog interfaces and which use digital ones. You will use several of these parts later in the course — this is your first look at them.   "
},
{
  "id": "subsec-transistor-switch-concept",
  "level": "1",
  "url": "subsec-transistor-switch-concept.html",
  "type": "Subsection",
  "number": "5.1.1",
  "title": "The Transistor as a Switch",
  "body": " The Transistor as a Switch  Think of a transistor as a voltage- or current-controlled switch inserted in series with your load. One terminal — called the control terminal — accepts a small input signal. The other two terminals — the load terminals — form the path through which load current flows. When the control signal is below a threshold, the switch is open and essentially no current flows through the load. When the control signal exceeds the threshold, the switch closes and current flows freely.  This is the fundamental pattern in embedded systems: a GPIO pin sits on the control side and sees only microamp-to-milliamp currents, while the load side carries whatever current the load requires — potentially much more than the MCU could ever supply. The two sides share only a ground reference; their current paths are otherwise independent, and the load can be powered from a separate supply entirely if needed.   Left: a mechanical switch in series with a lamp and battery. A finger supplies the control force; the switch must carry the full load current. Right: replacing the mechanical switch with a transistor. A small control circuit on the left (the GPIO pin in practice) drives the transistor's control terminal, which switches the full load current on the right — with no moving parts and no physical contact between the two circuits.       "
},
{
  "id": "subsec-transistor-switch-concept-2",
  "level": "2",
  "url": "subsec-transistor-switch-concept.html#subsec-transistor-switch-concept-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "control terminal load terminals "
},
{
  "id": "fig-transistor-switch-concept",
  "level": "2",
  "url": "subsec-transistor-switch-concept.html#fig-transistor-switch-concept",
  "type": "Figure",
  "number": "5.1.1",
  "title": "",
  "body": " Left: a mechanical switch in series with a lamp and battery. A finger supplies the control force; the switch must carry the full load current. Right: replacing the mechanical switch with a transistor. A small control circuit on the left (the GPIO pin in practice) drives the transistor's control terminal, which switches the full load current on the right — with no moving parts and no physical contact between the two circuits.      "
},
{
  "id": "subsec-bjt-concepts",
  "level": "1",
  "url": "subsec-bjt-concepts.html",
  "type": "Subsection",
  "number": "5.1.2",
  "title": "BJTs: Current-Controlled Switches",
  "body": " BJTs: Current-Controlled Switches  A Bipolar Junction Transistor (BJT) has three terminals: base (B), collector (C), and emitter (E). In an NPN BJT — the type most commonly used to switch loads to ground — a small current flowing into the base allows a much larger current to flow from collector to emitter. The ratio of collector current to base current is called (or ) and is typically 50–300 depending on the device.   Schematic symbol for an NPN BJT. A small base current flowing into the base allows a much larger collector current to flow from collector to emitter.    To use an NPN BJT as a switch from a GPIO pin, a resistor is placed between the GPIO pin and the base. This limits the base current to a safe value while still providing enough drive to saturate the transistor — push it into full conduction — so that the collector-to-emitter voltage drops to nearly zero and the load sees the full supply voltage. Choosing that base resistor is one of the key design calculations for this class.  "
},
{
  "id": "subsec-bjt-concepts-2",
  "level": "2",
  "url": "subsec-bjt-concepts.html#subsec-bjt-concepts-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Bipolar Junction Transistor base collector emitter "
},
{
  "id": "fig-bjt-npn-symbol",
  "level": "2",
  "url": "subsec-bjt-concepts.html#fig-bjt-npn-symbol",
  "type": "Figure",
  "number": "5.1.2",
  "title": "",
  "body": " Schematic symbol for an NPN BJT. A small base current flowing into the base allows a much larger collector current to flow from collector to emitter.   "
},
{
  "id": "subsec-mosfet-concepts",
  "level": "1",
  "url": "subsec-mosfet-concepts.html",
  "type": "Subsection",
  "number": "5.1.3",
  "title": "MOSFETs: Voltage-Controlled Switches",
  "body": " MOSFETs: Voltage-Controlled Switches  A Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET) has three terminals: gate (G), drain (D), and source (S). Unlike a BJT, a MOSFET is controlled by voltage, not current. The gate is electrically insulated from the rest of the device by a thin oxide layer, so in steady state it draws essentially no current from the GPIO pin. When the gate voltage exceeds a threshold ( ), a channel opens between drain and source and current flows.   Schematic symbol for an N-channel enhancement MOSFET. The gate is separated from the body by an insulating oxide layer (the gap in the symbol), so the gate draws essentially no DC current. The three broken dashes indicate enhancement mode: no channel exists until .    For embedded use the key requirement is that be low enough to be driven reliably by a 3.3 V GPIO pin. Standard MOSFETs may require 5–10 V to turn on fully; logic-level MOSFETs are specified to reach full conduction at or lower, making them directly compatible with modern microcontrollers. Because the gate draws no steady-state current, MOSFETs are often preferred over BJTs when the GPIO drive current budget is tight.  "
},
{
  "id": "subsec-mosfet-concepts-2",
  "level": "2",
  "url": "subsec-mosfet-concepts.html#subsec-mosfet-concepts-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Metal-Oxide-Semiconductor Field-Effect Transistor gate drain source "
},
{
  "id": "fig-mosfet-nchan-symbol",
  "level": "2",
  "url": "subsec-mosfet-concepts.html#fig-mosfet-nchan-symbol",
  "type": "Figure",
  "number": "5.1.3",
  "title": "",
  "body": " Schematic symbol for an N-channel enhancement MOSFET. The gate is separated from the body by an insulating oxide layer (the gap in the symbol), so the gate draws essentially no DC current. The three broken dashes indicate enhancement mode: no channel exists until .   "
},
{
  "id": "subsec-mosfet-concepts-4",
  "level": "2",
  "url": "subsec-mosfet-concepts.html#subsec-mosfet-concepts-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "logic-level MOSFETs "
},
{
  "id": "rq-transistors-concepts",
  "level": "1",
  "url": "rq-transistors-concepts.html",
  "type": "Check Your Understanding",
  "number": "5.1.4",
  "title": "Check Your Understanding",
  "body": "  You want to drive a small DC motor that requires 200 mA. The STM32 GPIO pin can source at most 8 mA. Why can't you connect the motor directly to the GPIO pin?    The motor requires far more current than the GPIO pin can safely supply; drawing 200 mA from a pin rated for 8 mA would damage the microcontroller.  Correct. The solution is to use a transistor: the GPIO pin drives the control terminal with a small current or voltage, and the transistor switches the motor's 200 mA from a separate supply path.    GPIO pins can only source current, not sink it, so they cannot drive any motor.  STM32 GPIO pins can both source and sink current — the limitation is the magnitude (a few milliamps), not the direction.    Motors require AC power, and GPIO pins only produce DC signals.  Small DC motors run on DC — the same kind of signal a GPIO pin produces. The issue is current capacity, not signal type.    The motor's resistance is too low for the GPIO pin's output impedance to match.  Impedance matching is a concern in RF and audio circuits, not in low-frequency switching applications like this. The real issue is that 200 mA exceeds the pin's current rating.      What is the fundamental difference between how a BJT and a MOSFET are controlled?    A BJT is controlled by a current into the base; a MOSFET is controlled by a voltage on the gate and draws essentially no steady-state current.  Correct. This distinction matters for GPIO drive budget: a BJT requires you to supply base current (limited by the resistor you choose), while a MOSFET gate draws nearly zero steady-state current from the GPIO pin.    A BJT is controlled by voltage; a MOSFET is controlled by current.  It is the other way around: BJT = current-controlled (base current), MOSFET = voltage-controlled (gate voltage).    BJTs work with AC signals only; MOSFETs work with DC signals only.  Both BJTs and MOSFETs work with DC switching applications. The distinction between them is about how the control terminal operates, not AC vs DC.    BJTs are faster than MOSFETs and therefore preferred for high-speed switching in embedded systems.  For the switching speeds used in this course, both are fast enough. MOSFETs are often preferred because they require no steady-state gate current.      An NPN BJT has . A GPIO pin drives the base through a 10 kΩ resistor from 3.3 V ( ). What collector current can this transistor support?   About 39 mA  Correct. ; .   About 3.9 mA  , not 0.026 mA — recheck the decimal place.   About 330 mA  You need to subtract from the supply before dividing by the base resistor.   The BJT stays off; 3.3 V is below the threshold.  The turn-on threshold is . A 3.3 V supply through a 10 kΩ resistor easily exceeds that.      You select a MOSFET with minimum to switch a load from a 3.3 V GPIO pin. What problem will occur?    The GPIO pin can only drive the gate to 3.3 V, which is below the 4 V threshold; the MOSFET will not turn on fully (or at all), so the load won't be switched.  Correct. This is why logic-level MOSFETs — specified to turn on fully at 3.3 V or lower — are required when driving directly from a 3.3 V microcontroller pin.    The MOSFET will turn on too quickly, causing a large inrush current that damages the load.  A gate voltage below threshold causes the MOSFET to turn on less , not more aggressively. The problem here is under-drive, not over-drive.    The MOSFET will work correctly because is the maximum gate voltage needed.  is the minimum voltage at which the device begins to conduct — not a maximum. The GPIO must be able to exceed it to turn the MOSFET on.    Nothing — MOSFETs are always compatible with 3.3 V signals regardless of their threshold specification.  Not all MOSFETs are logic-level compatible. Standard (high-threshold) MOSFETs require 5–10 V on the gate; using one with a 3.3 V GPIO will result in the device not turning on properly.     "
},
{
  "id": "rq-why-transistor",
  "level": "2",
  "url": "rq-transistors-concepts.html#rq-why-transistor",
  "type": "Reading Question",
  "number": "5.1.4.1",
  "title": "",
  "body": " You want to drive a small DC motor that requires 200 mA. The STM32 GPIO pin can source at most 8 mA. Why can't you connect the motor directly to the GPIO pin?    The motor requires far more current than the GPIO pin can safely supply; drawing 200 mA from a pin rated for 8 mA would damage the microcontroller.  Correct. The solution is to use a transistor: the GPIO pin drives the control terminal with a small current or voltage, and the transistor switches the motor's 200 mA from a separate supply path.    GPIO pins can only source current, not sink it, so they cannot drive any motor.  STM32 GPIO pins can both source and sink current — the limitation is the magnitude (a few milliamps), not the direction.    Motors require AC power, and GPIO pins only produce DC signals.  Small DC motors run on DC — the same kind of signal a GPIO pin produces. The issue is current capacity, not signal type.    The motor's resistance is too low for the GPIO pin's output impedance to match.  Impedance matching is a concern in RF and audio circuits, not in low-frequency switching applications like this. The real issue is that 200 mA exceeds the pin's current rating.    "
},
{
  "id": "rq-bjt-vs-mosfet-control",
  "level": "2",
  "url": "rq-transistors-concepts.html#rq-bjt-vs-mosfet-control",
  "type": "Reading Question",
  "number": "5.1.4.2",
  "title": "",
  "body": " What is the fundamental difference between how a BJT and a MOSFET are controlled?    A BJT is controlled by a current into the base; a MOSFET is controlled by a voltage on the gate and draws essentially no steady-state current.  Correct. This distinction matters for GPIO drive budget: a BJT requires you to supply base current (limited by the resistor you choose), while a MOSFET gate draws nearly zero steady-state current from the GPIO pin.    A BJT is controlled by voltage; a MOSFET is controlled by current.  It is the other way around: BJT = current-controlled (base current), MOSFET = voltage-controlled (gate voltage).    BJTs work with AC signals only; MOSFETs work with DC signals only.  Both BJTs and MOSFETs work with DC switching applications. The distinction between them is about how the control terminal operates, not AC vs DC.    BJTs are faster than MOSFETs and therefore preferred for high-speed switching in embedded systems.  For the switching speeds used in this course, both are fast enough. MOSFETs are often preferred because they require no steady-state gate current.    "
},
{
  "id": "rq-bjt-gain",
  "level": "2",
  "url": "rq-transistors-concepts.html#rq-bjt-gain",
  "type": "Reading Question",
  "number": "5.1.4.3",
  "title": "",
  "body": " An NPN BJT has . A GPIO pin drives the base through a 10 kΩ resistor from 3.3 V ( ). What collector current can this transistor support?   About 39 mA  Correct. ; .   About 3.9 mA  , not 0.026 mA — recheck the decimal place.   About 330 mA  You need to subtract from the supply before dividing by the base resistor.   The BJT stays off; 3.3 V is below the threshold.  The turn-on threshold is . A 3.3 V supply through a 10 kΩ resistor easily exceeds that.    "
},
{
  "id": "rq-logic-level-mosfet",
  "level": "2",
  "url": "rq-transistors-concepts.html#rq-logic-level-mosfet",
  "type": "Reading Question",
  "number": "5.1.4.4",
  "title": "",
  "body": " You select a MOSFET with minimum to switch a load from a 3.3 V GPIO pin. What problem will occur?    The GPIO pin can only drive the gate to 3.3 V, which is below the 4 V threshold; the MOSFET will not turn on fully (or at all), so the load won't be switched.  Correct. This is why logic-level MOSFETs — specified to turn on fully at 3.3 V or lower — are required when driving directly from a 3.3 V microcontroller pin.    The MOSFET will turn on too quickly, causing a large inrush current that damages the load.  A gate voltage below threshold causes the MOSFET to turn on less , not more aggressively. The problem here is under-drive, not over-drive.    The MOSFET will work correctly because is the maximum gate voltage needed.  is the minimum voltage at which the device begins to conduct — not a maximum. The GPIO must be able to exceed it to turn the MOSFET on.    Nothing — MOSFETs are always compatible with 3.3 V signals regardless of their threshold specification.  Not all MOSFETs are logic-level compatible. Standard (high-threshold) MOSFETs require 5–10 V on the gate; using one with a 3.3 V GPIO will result in the device not turning on properly.    "
},
{
  "id": "subsec-code-interview",
  "level": "1",
  "url": "subsec-code-interview.html",
  "type": "Subsection",
  "number": "5.2.1",
  "title": "Part 1: Code Interview",
  "body": " Part 1: Code Interview  Reading someone else's code is a skill as important as writing your own. In industry, code reviews are routine: a colleague reads your changes and asks questions before they are merged. This activity gives you practice in both roles.   Reviewing the Keyboard Counter   Exchange your keyboard counter code with a neighbor and read their code silently for two minutes. Then take turns asking the questions below — answer each one about your partner's code, not your own. The goal is not to find bugs; it is to understand the code well enough that you could modify or maintain it.    Trace  Looking at your partner's code, trace what happens when the user presses u , then d , then r — each pressed once just before the RXNE check in a given loop iteration. What count value does the terminal display after each of those three loop cycles?    State  In your partner's code, where is the counter value stored? What data type is it? What is the largest value it can hold before it wraps around? Is that likely to matter in practice?    Extension  Without modifying any existing lines in your partner's code, where and how would you add support for pressing z or Z to increment the counter by 10? How many new lines of code would it take?    Timing  The RXNE flag is checked once per loop, just before the printf and delay_ms(500) . If two different keys are pressed within the same 500 ms window, what happens? Could your partner's code miss a keypress, and if so, is that a fundamental limitation of the design or a bug?    "
},
{
  "id": "act-code-interview",
  "level": "2",
  "url": "subsec-code-interview.html#act-code-interview",
  "type": "Activity",
  "number": "5.2.1",
  "title": "Reviewing the Keyboard Counter.",
  "body": " Reviewing the Keyboard Counter   Exchange your keyboard counter code with a neighbor and read their code silently for two minutes. Then take turns asking the questions below — answer each one about your partner's code, not your own. The goal is not to find bugs; it is to understand the code well enough that you could modify or maintain it.    Trace  Looking at your partner's code, trace what happens when the user presses u , then d , then r — each pressed once just before the RXNE check in a given loop iteration. What count value does the terminal display after each of those three loop cycles?    State  In your partner's code, where is the counter value stored? What data type is it? What is the largest value it can hold before it wraps around? Is that likely to matter in practice?    Extension  Without modifying any existing lines in your partner's code, where and how would you add support for pressing z or Z to increment the counter by 10? How many new lines of code would it take?    Timing  The RXNE flag is checked once per loop, just before the printf and delay_ms(500) . If two different keys are pressed within the same 500 ms window, what happens? Could your partner's code miss a keypress, and if so, is that a fundamental limitation of the design or a bug?   "
},
{
  "id": "subsec-code-interview-discussion",
  "level": "1",
  "url": "subsec-code-interview-discussion.html",
  "type": "Subsection",
  "number": "5.2.2",
  "title": "Discussion: The Receive Buffer",
  "body": " Discussion: The Receive Buffer   What actually happens during delay_ms ? The USART hardware keeps receiving independently of the CPU — it does not pause during delay_ms . When a byte arrives, the shift register assembles the bits and transfers the byte into RDR, setting the RXNE flag. That byte then sits in RDR until the next time the loop checks RXNE, up to 500 ms later. So one keypress is effectively buffered for free.  A second key pressed while RDR is still full is a different story. The shift register receives it correctly, but when it tries to transfer to RDR — which is occupied — the hardware sets the Overrun Error (ORE) flag and the new byte is silently discarded. The first key survives; any key after it is lost. The program has no way of knowing anything was dropped.  This is not a bug — it is a deliberate trade-off that works fine for a slow manual counter. The general fix is a UART receive interrupt: every incoming byte immediately triggers an ISR that stores it in a software queue, decoupling reception speed from the main loop's pace. That pattern comes up later in the course.   "
},
{
  "id": "subsec-code-interview-discussion-3",
  "level": "2",
  "url": "subsec-code-interview-discussion.html#subsec-code-interview-discussion-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Overrun Error "
},
{
  "id": "subsec-stm32-macros",
  "level": "1",
  "url": "subsec-stm32-macros.html",
  "type": "Subsection",
  "number": "5.2.3",
  "title": "Part 2: STM32 Bit-Manipulation Macros",
  "body": " Part 2: STM32 Bit-Manipulation Macros  Every register write you have done so far has used raw numeric constants — bit positions counted by hand, masks written as hex literals. That works, but it is fragile: a wrong shift value is invisible to the compiler and can be very hard to spot in a code review.  The CMSIS headers (included through ES28.h ) define a named macro for every bit field in every register. Each field gets a mask ( _Msk ) and a position ( _Pos ) constant. The pattern is always the same: clear the field first, then OR in the value shifted into place. To make this concrete, we will use the MODER register to show how to configure PA5 as an output pin.   The MODER register. Each pin has a 2-bit field. CMSIS defines GPIO_MODER_MODE5_Msk (the mask for pin 5's field) and GPIO_MODER_MODE5_Pos (the bit position, 10), so you never need to count bits by hand.    \/\/ Raw version — a wrong constant is a silent bug GPIOA->MODER &= ~(1U << 11); \/\/ clear bit 11 of the MODE5 field GPIOA->MODER &= ~(1U << 10); \/\/ clear bit 10 of the MODE5 field GPIOA->MODER |= (1U << 10); \/\/ set bit 10 (output mode = 0b01) \/\/ Macro version — names are checked by the compiler GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk; GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);  The ES28 header defines convenient mode constants: GPIO_INPUT (0), GPIO_OUTPUT (1), GPIO_ALTERNATE (2), and GPIO_ANALOG (3).   CMSIS macro naming conventions for common GPIO configurations. The same pattern extends to every peripheral register in the device.     Rewriting with Macros   The code below configures PB5 as an output — the pin that will drive the transistor base in the lab. It is written with raw constants. Rewrite it using CMSIS macros.  \/\/ Enable GPIOB clock RCC->IOPENR |= (1U << 1); \/\/ Set PB5 to output mode GPIOB->MODER &= ~(1U << 11); \/\/ clear bit 11 of the MODE5 field GPIOB->MODER &= ~(1U << 10); \/\/ clear bit 10 of the MODE5 field GPIOB->MODER |= (1U << 10); \/\/ set bit 10 (output mode = 0b01) \/\/ Drive PB5 high GPIOB->ODR |= (1U << 5);    Rewrite the three MODER lines using GPIO_MODER_MODE5_Msk , GPIO_MODER_MODE5_Pos , and GPIO_OUTPUT .    The RCC->IOPENR line enables the GPIOB clock with a raw bit shift. What CMSIS macro would replace (1U << 1) ? (Hint: look at how GPIOA's clock was enabled in the UART driver.)    Rewrite the ODR line using the CMSIS macro GPIO_ODR_OD5 instead of the raw bit shift (1U << 5) .        "
},
{
  "id": "fig-moder-bitfield",
  "level": "2",
  "url": "subsec-stm32-macros.html#fig-moder-bitfield",
  "type": "Figure",
  "number": "5.2.1",
  "title": "",
  "body": " The MODER register. Each pin has a 2-bit field. CMSIS defines GPIO_MODER_MODE5_Msk (the mask for pin 5's field) and GPIO_MODER_MODE5_Pos (the bit position, 10), so you never need to count bits by hand.   "
},
{
  "id": "fig-moder-macros-ref",
  "level": "2",
  "url": "subsec-stm32-macros.html#fig-moder-macros-ref",
  "type": "Figure",
  "number": "5.2.2",
  "title": "",
  "body": " CMSIS macro naming conventions for common GPIO configurations. The same pattern extends to every peripheral register in the device.   "
},
{
  "id": "act-macros-rewrite",
  "level": "2",
  "url": "subsec-stm32-macros.html#act-macros-rewrite",
  "type": "Activity",
  "number": "5.2.2",
  "title": "Rewriting with Macros.",
  "body": " Rewriting with Macros   The code below configures PB5 as an output — the pin that will drive the transistor base in the lab. It is written with raw constants. Rewrite it using CMSIS macros.  \/\/ Enable GPIOB clock RCC->IOPENR |= (1U << 1); \/\/ Set PB5 to output mode GPIOB->MODER &= ~(1U << 11); \/\/ clear bit 11 of the MODE5 field GPIOB->MODER &= ~(1U << 10); \/\/ clear bit 10 of the MODE5 field GPIOB->MODER |= (1U << 10); \/\/ set bit 10 (output mode = 0b01) \/\/ Drive PB5 high GPIOB->ODR |= (1U << 5);    Rewrite the three MODER lines using GPIO_MODER_MODE5_Msk , GPIO_MODER_MODE5_Pos , and GPIO_OUTPUT .    The RCC->IOPENR line enables the GPIOB clock with a raw bit shift. What CMSIS macro would replace (1U << 1) ? (Hint: look at how GPIOA's clock was enabled in the UART driver.)    Rewrite the ODR line using the CMSIS macro GPIO_ODR_OD5 instead of the raw bit shift (1U << 5) .   "
},
{
  "id": "subsec-npn-driver-design",
  "level": "1",
  "url": "subsec-npn-driver-design.html",
  "type": "Subsection",
  "number": "5.2.4",
  "title": "Part 3: Designing a Low-Side NPN Driver",
  "body": " Part 3: Designing a Low-Side NPN Driver  From the pre-class reading you know that a transistor can act as a switch — but where exactly does the load connect? The answer depends on transistor type: for an NPN, the load sits above the collector (between the supply and C); for a PNP, the load sits below the collector (between C and ground).   NPN low-side switch (left): load connects between the supply and the collector, emitter to ground. PNP high-side switch (right): emitter connects to the supply, load connects below the collector to ground.    In this course you will use NPN transistors as low-side switches. The circuit below is one example you will analyze in lab. The load sits between the supply and the collector. A small resistor — the base-current limiting resistor — connects the GPIO pin ( ) to the base. The emitter goes to ground.   NPN low-side driver circuit. must be chosen so that base current is large enough to saturate the transistor (fully on) while staying within the GPIO pin's safe output limit.    The key design question is: what value should be? The goal is to supply enough base current to push the transistor into saturation — fully on — while keeping that current within the GPIO pin's safe limit.   Choosing R lim   Given: a load that needs 100 mA from a 5 V supply. The NPN transistor has and . The GPIO outputs .   Step 1 — collector current: the load sets .   Step 2 — minimum base current to saturate:     Step 3 — apply a safety margin. Component tolerances and temperature variation mean the real can be lower than the datasheet minimum. A factor of 2 is standard, so target .   Step 4 — voltage across R lim : KVL around the base-emitter loop gives    Step 5 — resistance:  Choose the nearest standard value at or below this (e.g., 620 Ω or 560 Ω) to ensure the transistor stays in saturation.   For a low-side MOSFET switch, no base-current calculation is needed — the gate is purely capacitive and draws no steady current. Check two numbers in the datasheet: must be below 3.3 V (logic-level compatible), and maximum drain current must exceed your load current. If both hold, drive the gate HIGH to switch on and LOW to switch off. No R lim is needed.  The lab also introduces a high-side PFET driver , where the transistor sits between the supply and the load. A PFET turns on when — pulling the gate LOW with respect to the supply turns the load on. The full analysis is in the lab handout.        "
},
{
  "id": "fig-low-high-side-topology",
  "level": "2",
  "url": "subsec-npn-driver-design.html#fig-low-high-side-topology",
  "type": "Figure",
  "number": "5.2.4",
  "title": "",
  "body": " NPN low-side switch (left): load connects between the supply and the collector, emitter to ground. PNP high-side switch (right): emitter connects to the supply, load connects below the collector to ground.   "
},
{
  "id": "fig-npn-low-side-circuit",
  "level": "2",
  "url": "subsec-npn-driver-design.html#fig-npn-low-side-circuit",
  "type": "Figure",
  "number": "5.2.5",
  "title": "",
  "body": " NPN low-side driver circuit. must be chosen so that base current is large enough to saturate the transistor (fully on) while staying within the GPIO pin's safe output limit.   "
},
{
  "id": "ex-npn-rlim",
  "level": "2",
  "url": "subsec-npn-driver-design.html#ex-npn-rlim",
  "type": "Check Your Understanding",
  "number": "5.2.6",
  "title": "Choosing Rlim.",
  "body": " Choosing R lim   Given: a load that needs 100 mA from a 5 V supply. The NPN transistor has and . The GPIO outputs .   Step 1 — collector current: the load sets .   Step 2 — minimum base current to saturate:     Step 3 — apply a safety margin. Component tolerances and temperature variation mean the real can be lower than the datasheet minimum. A factor of 2 is standard, so target .   Step 4 — voltage across R lim : KVL around the base-emitter loop gives    Step 5 — resistance:  Choose the nearest standard value at or below this (e.g., 620 Ω or 560 Ω) to ensure the transistor stays in saturation.  "
},
{
  "id": "subsec-mosfet-intro",
  "level": "1",
  "url": "subsec-mosfet-intro.html",
  "type": "Subsection",
  "number": "5.2.5",
  "title": "Part 4: MOSFETs",
  "body": " Part 4: MOSFETs  A MOSFET has three terminals: Gate (G), Drain (D), and Source (S). Unlike the BJT, it is voltage-controlled — the gate draws essentially no current in steady state because it is insulated from the channel by a thin oxide layer. When the gate-to-source voltage exceeds the threshold , a conductive channel opens between drain and source.   N-channel enhancement MOSFET schematic symbol with Gate (g), Drain (d), and Source (s) labeled. The gap between the gate line and the channel represents the insulating oxide layer.    For an N-channel low-side switch the load connects between the supply and the drain; the source goes to ground. Drive the gate HIGH to turn on, LOW to turn off — no limiting resistor needed. A P-channel MOSFET (PFET) flips the topology: source at the supply, drain below, and the device turns on when the gate is pulled LOW.   N-channel low-side switch (left): load sits between the supply and the drain, source to ground — drive the gate HIGH to turn on. P-channel high-side switch (right): source connects to the supply, load hangs below the drain — turns on when the gate is pulled LOW.       For direct GPIO drive, must be below 3.3 V — these are called logic-level MOSFETs. MOSFETs are also easy to saturate fully, which makes them reliable for fast switching without the careful sizing a BJT requires. One caution: the thin gate oxide that gives MOSFETs their voltage-controlled behavior also makes them vulnerable to damage from electrostatic discharge (ESD) — handle them carefully.    BJT vs. MOSFET: key differences for embedded switching     MOSFET  BJT    Terminals  Gate (G), Drain (D), Source (S)  Base (B), Collector (C), Emitter (E)    Controlling quantity  Voltage on the gate; gate current is essentially zero  Current into the base; must be supplied continuously while device is on    Saturation  Easy to saturate fully; no base-resistor calculation needed  Requires careful sizing to guarantee saturation    Power consumption  Lower — no steady-state gate current  Higher — base current flows whenever the device is on    Switching speed  Excellent for embedded use; gate capacitance limits very high-frequency switching  Can be slightly faster at very high frequencies (no gate capacitance to charge), at the cost of more power    ESD sensitivity  Vulnerable — the thin gate oxide is easily damaged by static discharge  More robust to ESD         "
},
{
  "id": "subsec-mosfet-intro-2",
  "level": "2",
  "url": "subsec-mosfet-intro.html#subsec-mosfet-intro-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Gate Drain Source "
},
{
  "id": "fig-nfet-symbol-inclass",
  "level": "2",
  "url": "subsec-mosfet-intro.html#fig-nfet-symbol-inclass",
  "type": "Figure",
  "number": "5.2.7",
  "title": "",
  "body": " N-channel enhancement MOSFET schematic symbol with Gate (g), Drain (d), and Source (s) labeled. The gap between the gate line and the channel represents the insulating oxide layer.   "
},
{
  "id": "fig-nfet-pfet-topologies",
  "level": "2",
  "url": "subsec-mosfet-intro.html#fig-nfet-pfet-topologies",
  "type": "Figure",
  "number": "5.2.8",
  "title": "",
  "body": " N-channel low-side switch (left): load sits between the supply and the drain, source to ground — drive the gate HIGH to turn on. P-channel high-side switch (right): source connects to the supply, load hangs below the drain — turns on when the gate is pulled LOW.      "
},
{
  "id": "table-bjt-vs-mosfet",
  "level": "2",
  "url": "subsec-mosfet-intro.html#table-bjt-vs-mosfet",
  "type": "Table",
  "number": "5.2.9",
  "title": "BJT vs. MOSFET: key differences for embedded switching",
  "body": " BJT vs. MOSFET: key differences for embedded switching     MOSFET  BJT    Terminals  Gate (G), Drain (D), Source (S)  Base (B), Collector (C), Emitter (E)    Controlling quantity  Voltage on the gate; gate current is essentially zero  Current into the base; must be supplied continuously while device is on    Saturation  Easy to saturate fully; no base-resistor calculation needed  Requires careful sizing to guarantee saturation    Power consumption  Lower — no steady-state gate current  Higher — base current flows whenever the device is on    Switching speed  Excellent for embedded use; gate capacitance limits very high-frequency switching  Can be slightly faster at very high frequencies (no gate capacitance to charge), at the cost of more power    ESD sensitivity  Vulnerable — the thin gate oxide is easily damaged by static discharge  More robust to ESD    "
},
{
  "id": "subsec-transistor-datasheets",
  "level": "1",
  "url": "subsec-transistor-datasheets.html",
  "type": "Subsection",
  "number": "5.2.6",
  "title": "Part 5: Reading Transistor Datasheets",
  "body": " Part 5: Reading Transistor Datasheets  When you open a transistor datasheet you will often see three columns for a single parameter: Min , Typ , and Max . This is not sloppiness — it reflects real manufacturing variation. No two BJTs or MOSFETs coming off the same production line are identical; a parameter like ( ) can vary by a factor of three or more across a single batch. Manufacturers characterize this spread statistically: Min and Max mark the 3 boundaries of the distribution (only about 0.15% of parts fall outside on either end), and Typ is the mean — the value you are most likely to see in any individual part.  Which column should you use? It depends on what question you are asking.   Will my circuit function at all? Use the worst-case minimum. If you design for , the transistor will saturate even if you happen to pull the weakest part from the box. Designing for instead means your circuit fails for the vast majority of real parts.   Will my circuit break or overheat? Use the worst-case maximum. To check whether you stay inside a power or voltage limit you must assume the highest plausible value — the part that runs hottest, conducts most, or swings highest.  The general rule: ask does a higher or lower value make it harder for my design to succeed? and use that value. Keep in mind that none of these numbers are fixed — , , and all shift with temperature, so for critical designs you would also check the datasheet graphs to see how the Min or Max moves when the circuit gets hot or cold.  Use the datasheets linked on Canvas to fill in the tables below.    BJT Datasheets  Record the type (NPN or PNP), the DC current gain , and the maximum continuous collector current for each device. When a range of values is listed, record the minimum — that is what governs a worst-case design.        Part Number  Type (NPN or PNP)  (minimum)  Max collector current   KSC2073  TIP42  2N3906  2N3904     MOSFET Datasheets  Record the type (NFET or PFET), the threshold voltage , and the maximum continuous drain current. Pay attention to the sign of for PFET devices.        Part Number  Type (NFET or PFET)  Threshold voltage  Max drain current   IRF9Z24  BS250P  IRFZ24  BS107P    "
},
{
  "id": "act-bjt-datasheets",
  "level": "2",
  "url": "subsec-transistor-datasheets.html#act-bjt-datasheets",
  "type": "Activity",
  "number": "5.2.3",
  "title": "BJT Datasheets.",
  "body": " BJT Datasheets  Record the type (NPN or PNP), the DC current gain , and the maximum continuous collector current for each device. When a range of values is listed, record the minimum — that is what governs a worst-case design.        Part Number  Type (NPN or PNP)  (minimum)  Max collector current   KSC2073  TIP42  2N3906  2N3904   "
},
{
  "id": "act-mosfet-datasheets",
  "level": "2",
  "url": "subsec-transistor-datasheets.html#act-mosfet-datasheets",
  "type": "Activity",
  "number": "5.2.4",
  "title": "MOSFET Datasheets.",
  "body": " MOSFET Datasheets  Record the type (NFET or PFET), the threshold voltage , and the maximum continuous drain current. Pay attention to the sign of for PFET devices.        Part Number  Type (NFET or PFET)  Threshold voltage  Max drain current   IRF9Z24  BS250P  IRFZ24  BS107P   "
},
{
  "id": "subsec-adc-signal-chain",
  "level": "1",
  "url": "subsec-adc-signal-chain.html",
  "type": "Subsection",
  "number": "6.1.1",
  "title": "The Sensor Signal Chain",
  "body": " The Sensor Signal Chain  A physical quantity becomes a number your program can use by passing through a chain of stages. A sensor converts the physical quantity — temperature, light, force — into a voltage. That voltage is usually small and noisy, so an analog front end may amplify and filter it. The ADC then measures the conditioned voltage and reports an integer, and the MCU computes with that integer.  How much of this chain lives inside the sensor varies, and it changes what your code has to do. Some sensors are just the bare transducer: they hand you a small, raw voltage, and everything after it is yours to build. Others include the analog front end, so what reaches your pin is already amplified and filtered. And some include the converter as well — they run the whole chain internally and hand you a digital result, which the MCU collects over a communication protocol rather than by converting anything itself. We will meet that third kind, and the protocols they speak, later in the course. This chapter is about the case where the converting is yours to do.   The sensor signal chain. A sensor converts a physical quantity into a voltage; an analog front end conditions that voltage by amplifying and filtering it; the ADC digitizes the result into an integer; the MCU processes the integer. Every measurement you make in this course travels this path, and each stage can limit the quality of the final number.    The ADC sits at the boundary between the continuous world and the discrete one. Everything to its left varies smoothly; everything to its right is an integer. Understanding exactly what is lost at that boundary is the subject of the next section.  "
},
{
  "id": "subsec-adc-signal-chain-2",
  "level": "2",
  "url": "subsec-adc-signal-chain.html#subsec-adc-signal-chain-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "sensor analog front end "
},
{
  "id": "fig-adc-signal-chain",
  "level": "2",
  "url": "subsec-adc-signal-chain.html#fig-adc-signal-chain",
  "type": "Figure",
  "number": "6.1.1",
  "title": "",
  "body": " The sensor signal chain. A sensor converts a physical quantity into a voltage; an analog front end conditions that voltage by amplifying and filtering it; the ADC digitizes the result into an integer; the MCU processes the integer. Every measurement you make in this course travels this path, and each stage can limit the quality of the final number.   "
},
{
  "id": "subsec-adc-quantization",
  "level": "1",
  "url": "subsec-adc-quantization.html",
  "type": "Subsection",
  "number": "6.1.2",
  "title": "Quantization: What the Number Means",
  "body": " Quantization: What the Number Means  The top of an ADC's input range is set by a reference voltage , written . On the Nucleo board is wired to the 3.3 V supply, so an input of 0 V reads as count 0 and an input at reads at the top of the scale. Everything in this section is scaled and dependent on that one number.  An ADC divides its input range into a finite number of equal steps and reports which step the input falls into. How many steps it has is set by its resolution , expressed in bits. A -bit ADC produces distinct output values, mapping the input range onto the integers .   The ADC as a system. An analog voltage between 0 and goes in on the left; a bundle of wires carries the digital result out on the right, as an integer between 0 and . On the STM32C031C6, is 3.3 V and can be 6, 8, 10, or 12 — we start with 12, and you will change it later. The relationship written across the figure, , is the whole conversion in one line — and it holds everywhere except at the very top of the range, where the result is limited to the largest count the converter has, 4095.     When we choose in our ADC this gives us 4096 steps across the 0–3.3 V range. One step — also called LSB , for least significant bit — is therefore worth and to convert a count back into a voltage you multiply:   Here is an example: A count of 2048 corresponds to — exactly half of , which is what you would hope for the middle count. Going the other way, an input of 1.0 V should produce counts.  Notice the floor. The ADC cannot represent a voltage exactly; it reports the step the input fell into, so the result is always rounded down to a multiple of one LSB. The largest count, 4095, corresponds to , not 3.3 V — there are 4096 steps, but the highest one is numbered 4095. Dividing by 4095 instead of 4096, or expecting the top count to read exactly , is an easy slip to make.  More bits means smaller steps and less rounding error, at the cost of a slightly longer conversion — about two ADC clock cycles, some 167 ns, for every two bits you keep.  "
},
{
  "id": "subsec-adc-quantization-2",
  "level": "2",
  "url": "subsec-adc-quantization.html#subsec-adc-quantization-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "reference voltage "
},
{
  "id": "subsec-adc-quantization-3",
  "level": "2",
  "url": "subsec-adc-quantization.html#subsec-adc-quantization-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "resolution "
},
{
  "id": "fig-adc-system-view",
  "level": "2",
  "url": "subsec-adc-quantization.html#fig-adc-system-view",
  "type": "Figure",
  "number": "6.1.2",
  "title": "",
  "body": " The ADC as a system. An analog voltage between 0 and goes in on the left; a bundle of wires carries the digital result out on the right, as an integer between 0 and . On the STM32C031C6, is 3.3 V and can be 6, 8, 10, or 12 — we start with 12, and you will change it later. The relationship written across the figure, , is the whole conversion in one line — and it holds everywhere except at the very top of the range, where the result is limited to the largest count the converter has, 4095.   "
},
{
  "id": "subsec-adc-quantization-6",
  "level": "2",
  "url": "subsec-adc-quantization.html#subsec-adc-quantization-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "LSB "
},
{
  "id": "subsec-adc-potentiometer",
  "level": "1",
  "url": "subsec-adc-potentiometer.html",
  "type": "Subsection",
  "number": "6.1.3",
  "title": "The Potentiometer: A Voltage You Can Turn",
  "body": " The Potentiometer: A Voltage You Can Turn  To explore an ADC you need an input voltage you can vary at will. The simplest source is a potentiometer — a resistor with a sliding contact.  A potentiometer has three terminals. The two outer ones connect to the ends of a fixed resistive track; the middle one, the wiper , connects to a contact that slides along that track as you turn the knob. Connecting the outer terminals across a supply makes the device an adjustable voltage divider . The wiper splits the track into two resistances: call the resistance between the wiper and the terminal you have grounded, and the resistance between the wiper and the terminal at the supply. The wiper then sits at    A potentiometer wired as an adjustable voltage divider. The fixed resistive track runs between 3.3 V and GND; the wiper taps it somewhere in between, splitting it into above and below. Turning the knob slides the wiper, moving resistance from one side to the other while their sum stays fixed — so the wiper voltage sweeps continuously between the two rails. At the halfway point and the wiper sits at half the supply.    Turning the knob shifts resistance from one side of the wiper to the other while their sum stays fixed, so the wiper voltage sweeps continuously from one supply rail to the other. With the outer terminals on 3.3 V and GND, the wiper delivers anything from 0 V to 3.3 V. At the midpoint and the wiper sits at half the supply, 1.65 V.  Here is an example with real numbers. On a 10 kΩ potentiometer with the wiper a quarter of the way up from the grounded end, and , so — a quarter of the supply, as the geometry suggests. We use 10 kΩ mainly because it draws only a third of a milliamp across the rails. A sensor's own resistance can also limit how quickly the ADC is able to measure it — see once you have taken a reading and the idea has something to attach to.  The wiper is a source of voltage, not a control signal: you wire it to the pin you want to measure, and the ADC reads whatever voltage the knob is currently producing.  "
},
{
  "id": "subsec-adc-potentiometer-2",
  "level": "2",
  "url": "subsec-adc-potentiometer.html#subsec-adc-potentiometer-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "potentiometer "
},
{
  "id": "subsec-adc-potentiometer-3",
  "level": "2",
  "url": "subsec-adc-potentiometer.html#subsec-adc-potentiometer-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "wiper voltage divider "
},
{
  "id": "fig-adc-divider",
  "level": "2",
  "url": "subsec-adc-potentiometer.html#fig-adc-divider",
  "type": "Figure",
  "number": "6.1.3",
  "title": "",
  "body": " A potentiometer wired as an adjustable voltage divider. The fixed resistive track runs between 3.3 V and GND; the wiper taps it somewhere in between, splitting it into above and below. Turning the knob slides the wiper, moving resistance from one side to the other while their sum stays fixed — so the wiper voltage sweeps continuously between the two rails. At the halfway point and the wiper sits at half the supply.   "
},
{
  "id": "subsec-adc-successive-approx",
  "level": "1",
  "url": "subsec-adc-successive-approx.html",
  "type": "Subsection",
  "number": "6.1.4",
  "title": "Successive Approximation: How the Answer Is Found",
  "body": " Successive Approximation: How the Answer Is Found  Our ADC finds its answer by successive approximation , which is a binary search carried out in hardware. Rather than comparing the input against all 4096 possible levels, it determines the result one bit at a time, starting from the most significant bit.  Inside the ADC converter are a DAC (digital-to-analog converter) and a comparator. The converter keeps a register — the successive approximation register , or SAR — holding its answer so far. At each step it sets the next bit of the SAR, the DAC turns the SAR's current value into a test voltage, and the comparator reports whether the input is above or below it. If the input is above, the bit stays set; if below, it is cleared. After comparisons the SAR holds the result.  One more part is needed: a sample-and-hold circuit at the input captures the voltage at the instant the conversion begins and holds it steady for the converter to work against, even if the input voltage changes in the meantime.   Inside a successive-approximation ADC. The SAR holds the answer under construction and drives the DAC, which converts that value into a test voltage using . The diagram is drawn for our 12-bit converter: the SAR holds bits down to , so the search takes 12 comparisons. The comparator compares the held input against the test voltage and feeds its verdict, , back to the SAR, which keeps or clears the bit it is currently testing and moves on to the next. The sample-and-hold circuit on the input freezes at the instant the conversion starts.     That is why the voltage on the pin may change freely during a conversion without corrupting the result: the converter is working from its snapshot, not from the live input.  Because each bit costs one comparison, a conversion takes many clock cycles rather than happening instantly. Your code must therefore wait for the converter to finish before reading the result — the exact mechanism is one of the things we'll explore in class.  "
},
{
  "id": "subsec-adc-successive-approx-2",
  "level": "2",
  "url": "subsec-adc-successive-approx.html#subsec-adc-successive-approx-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "successive approximation "
},
{
  "id": "subsec-adc-successive-approx-3",
  "level": "2",
  "url": "subsec-adc-successive-approx.html#subsec-adc-successive-approx-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "DAC successive approximation register "
},
{
  "id": "subsec-adc-successive-approx-4",
  "level": "2",
  "url": "subsec-adc-successive-approx.html#subsec-adc-successive-approx-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "sample-and-hold "
},
{
  "id": "fig-adc-sar-block",
  "level": "2",
  "url": "subsec-adc-successive-approx.html#fig-adc-sar-block",
  "type": "Figure",
  "number": "6.1.4",
  "title": "",
  "body": " Inside a successive-approximation ADC. The SAR holds the answer under construction and drives the DAC, which converts that value into a test voltage using . The diagram is drawn for our 12-bit converter: the SAR holds bits down to , so the search takes 12 comparisons. The comparator compares the held input against the test voltage and feeds its verdict, , back to the SAR, which keeps or clears the bit it is currently testing and moves on to the next. The sample-and-hold circuit on the input freezes at the instant the conversion starts.   "
},
{
  "id": "rq-adc-before-class",
  "level": "1",
  "url": "rq-adc-before-class.html",
  "type": "Check Your Understanding",
  "number": "6.1.5",
  "title": "Check Your Understanding",
  "body": "  A 12-bit ADC has . What voltage does one LSB represent, and what is the maximum representable voltage?    One LSB ≈ 0.81 mV; maximum representable voltage ≈ 3.299 V (count 4095).  Correct. One LSB = 3.3 V \/ 4096 ≈ 0.806 mV. Count 4095 gives — not quite 3.3 V, because there are 4096 steps but the highest is numbered 4095.    One LSB ≈ 0.81 mV; maximum representable voltage = 3.3 V (count 4096).  The LSB value is right, but a 12-bit ADC produces counts 0–4095. Count 4096 does not exist — it would need a 13th bit.    One LSB = 3.3 V; maximum = 4095 V.  The LSB is a small fraction of , not equal to it, and the maximum output is a count rather than a voltage.    One LSB = 12 mV; maximum representable voltage = 3.3 V.  About 12 mV would be the LSB of an 8-bit ADC (3.3 V \/ 256 ≈ 12.9 mV). With 12 bits the step is much smaller.      Your ADC reports a count of 1241 with and 12-bit resolution. What voltage is on the pin, to the nearest 0.01 V?    About 1.00 V  Correct: . This is the conversion you will do constantly — count times , divided by 4096.    About 1.24 V  This reads the count as millivolts directly. The count is a number of steps; each step is worth about 0.806 mV, not 1 mV.    About 0.30 V  This divides instead of multiplying. A count well below half of 4095 must give a voltage well below half of 3.3 V, but not that far below — check the direction of the ratio.    About 3.30 V  3.3 V corresponds to the top of the range, count 4095. A count of 1241 is roughly 30% of full scale.      A 10 kΩ potentiometer has its outer terminals wired to 3.3 V and GND. You turn the knob until the wiper is one quarter of the way up from the GND end. What voltage does the ADC see, and roughly what count?    About 0.83 V, giving a count near 1024.  Correct. A quarter of the way up the track puts the wiper at a quarter of the supply, , which is a quarter of full scale: counts. Fractions of the track map directly onto fractions of full scale.    About 2.48 V, giving a count near 3072.  That is three quarters of the supply — the reading you would get a quarter of the way down from the 3.3 V end. Check which terminal the wiper is near.    About 0.83 V, giving a count near 830.  The voltage is right, but the count is not millivolts. Divide by the LSB size: .    2.5 kΩ, which the ADC reads directly as resistance.  The ADC measures voltage only. The potentiometer's resistance matters because it forms a divider — but what reaches the pin, and what is converted, is a voltage.      You start a conversion by writing to the control register, then immediately read the result register. The value is wrong or stale regardless of the input voltage. Why?    The conversion is not finished yet; the result register does not hold this conversion's answer until the converter signals that it is done.  Correct. Successive approximation needs one comparison per bit, so the answer takes many clock cycles to appear. Code must wait for the end-of-conversion signal before reading — you will write exactly that wait in class.    The pin must be configured as an output before a conversion can start.  The opposite: the pin must be in analog mode so the converter can reach the voltage on it. Driving it as an output would fight whatever is connected.    The result is a floating-point value that must be cast before it can be interpreted.  The result register holds an unsigned integer count between 0 and 4095. No floating point is involved unless you choose to convert counts to volts.    The ADC cannot measure voltages near 0 V.  0 V is a perfectly valid input and produces a count of 0. The problem here is timing, not the input level.      A 3-bit successive-approximation ADC is measuring an input. How many comparisons does it make to produce a complete result?    3 — one per bit, starting from the most significant.  Correct. Successive approximation is a binary search: each comparison resolves exactly one bit, so an -bit result needs comparisons.    7 — one for each possible output value minus one.  That describes a flash ADC, which uses comparators simultaneously and gets its answer in one step. It is much faster and much larger; successive approximation trades time for silicon.    8 — one for each possible output value.  8 is the number of possible outputs of a 3-bit converter, not the number of comparisons needed to choose between them. A binary search over 8 values takes 3 steps.    1 — the comparator resolves the result in a single step.  One comparison tells you only whether the input is above or below one test voltage — that is a single bit. Three bits need three comparisons.     "
},
{
  "id": "rq-adc-lsb",
  "level": "2",
  "url": "rq-adc-before-class.html#rq-adc-lsb",
  "type": "Reading Question",
  "number": "6.1.5.1",
  "title": "",
  "body": " A 12-bit ADC has . What voltage does one LSB represent, and what is the maximum representable voltage?    One LSB ≈ 0.81 mV; maximum representable voltage ≈ 3.299 V (count 4095).  Correct. One LSB = 3.3 V \/ 4096 ≈ 0.806 mV. Count 4095 gives — not quite 3.3 V, because there are 4096 steps but the highest is numbered 4095.    One LSB ≈ 0.81 mV; maximum representable voltage = 3.3 V (count 4096).  The LSB value is right, but a 12-bit ADC produces counts 0–4095. Count 4096 does not exist — it would need a 13th bit.    One LSB = 3.3 V; maximum = 4095 V.  The LSB is a small fraction of , not equal to it, and the maximum output is a count rather than a voltage.    One LSB = 12 mV; maximum representable voltage = 3.3 V.  About 12 mV would be the LSB of an 8-bit ADC (3.3 V \/ 256 ≈ 12.9 mV). With 12 bits the step is much smaller.    "
},
{
  "id": "rq-adc-count-to-volts",
  "level": "2",
  "url": "rq-adc-before-class.html#rq-adc-count-to-volts",
  "type": "Reading Question",
  "number": "6.1.5.2",
  "title": "",
  "body": " Your ADC reports a count of 1241 with and 12-bit resolution. What voltage is on the pin, to the nearest 0.01 V?    About 1.00 V  Correct: . This is the conversion you will do constantly — count times , divided by 4096.    About 1.24 V  This reads the count as millivolts directly. The count is a number of steps; each step is worth about 0.806 mV, not 1 mV.    About 0.30 V  This divides instead of multiplying. A count well below half of 4095 must give a voltage well below half of 3.3 V, but not that far below — check the direction of the ratio.    About 3.30 V  3.3 V corresponds to the top of the range, count 4095. A count of 1241 is roughly 30% of full scale.    "
},
{
  "id": "rq-adc-pot-wiper",
  "level": "2",
  "url": "rq-adc-before-class.html#rq-adc-pot-wiper",
  "type": "Reading Question",
  "number": "6.1.5.3",
  "title": "",
  "body": " A 10 kΩ potentiometer has its outer terminals wired to 3.3 V and GND. You turn the knob until the wiper is one quarter of the way up from the GND end. What voltage does the ADC see, and roughly what count?    About 0.83 V, giving a count near 1024.  Correct. A quarter of the way up the track puts the wiper at a quarter of the supply, , which is a quarter of full scale: counts. Fractions of the track map directly onto fractions of full scale.    About 2.48 V, giving a count near 3072.  That is three quarters of the supply — the reading you would get a quarter of the way down from the 3.3 V end. Check which terminal the wiper is near.    About 0.83 V, giving a count near 830.  The voltage is right, but the count is not millivolts. Divide by the LSB size: .    2.5 kΩ, which the ADC reads directly as resistance.  The ADC measures voltage only. The potentiometer's resistance matters because it forms a divider — but what reaches the pin, and what is converted, is a voltage.    "
},
{
  "id": "rq-adc-wait",
  "level": "2",
  "url": "rq-adc-before-class.html#rq-adc-wait",
  "type": "Reading Question",
  "number": "6.1.5.4",
  "title": "",
  "body": " You start a conversion by writing to the control register, then immediately read the result register. The value is wrong or stale regardless of the input voltage. Why?    The conversion is not finished yet; the result register does not hold this conversion's answer until the converter signals that it is done.  Correct. Successive approximation needs one comparison per bit, so the answer takes many clock cycles to appear. Code must wait for the end-of-conversion signal before reading — you will write exactly that wait in class.    The pin must be configured as an output before a conversion can start.  The opposite: the pin must be in analog mode so the converter can reach the voltage on it. Driving it as an output would fight whatever is connected.    The result is a floating-point value that must be cast before it can be interpreted.  The result register holds an unsigned integer count between 0 and 4095. No floating point is involved unless you choose to convert counts to volts.    The ADC cannot measure voltages near 0 V.  0 V is a perfectly valid input and produces a count of 0. The problem here is timing, not the input level.    "
},
{
  "id": "rq-adc-sar-steps",
  "level": "2",
  "url": "rq-adc-before-class.html#rq-adc-sar-steps",
  "type": "Reading Question",
  "number": "6.1.5.5",
  "title": "",
  "body": " A 3-bit successive-approximation ADC is measuring an input. How many comparisons does it make to produce a complete result?    3 — one per bit, starting from the most significant.  Correct. Successive approximation is a binary search: each comparison resolves exactly one bit, so an -bit result needs comparisons.    7 — one for each possible output value minus one.  That describes a flash ADC, which uses comparators simultaneously and gets its answer in one step. It is much faster and much larger; successive approximation trades time for silicon.    8 — one for each possible output value.  8 is the number of possible outputs of a 3-bit converter, not the number of comparisons needed to choose between them. A binary search over 8 values takes 3 steps.    1 — the comparator resolves the result in a single step.  One comparison tells you only whether the input is above or below one test voltage — that is a single bit. Three bits need three comparisons.    "
},
{
  "id": "subsec-adc-day7-meaning",
  "level": "1",
  "url": "subsec-adc-day7-meaning.html",
  "type": "Subsection",
  "number": "6.2.1",
  "title": "Part 1: What the Number Means",
  "body": " Part 1: What the Number Means  An ADC turns a continuously varying input voltage into an integer — a count . Today's first question is what that count actually means: how to get from a voltage to a count, and back again. works that relationship out in full; this is a warm-up to make sure it is available when you need it. Commit to an answer in writing before we discuss it.  If it does not come back to you straight away, look back at — and if you would rather sort it out properly after class, that is fine too: Part 2 starts from the datasheet and does not depend on this.   Predict the Count    The ADC is 12-bit with . A voltage of exactly 1.65 V is applied to the pin. What count do you expect? Write the number down.      Now the other direction: the ADC reports 3072. What voltage is on the pin? Give your answer in volts to two decimal places, and state what one count is worth in millivolts.      "
},
{
  "id": "subsec-adc-day7-meaning-2",
  "level": "2",
  "url": "subsec-adc-day7-meaning.html#subsec-adc-day7-meaning-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "count "
},
{
  "id": "act-adc-predict-count",
  "level": "2",
  "url": "subsec-adc-day7-meaning.html#act-adc-predict-count",
  "type": "Activity",
  "number": "6.2.1",
  "title": "Predict the Count.",
  "body": " Predict the Count    The ADC is 12-bit with . A voltage of exactly 1.65 V is applied to the pin. What count do you expect? Write the number down.      Now the other direction: the ADC reports 3072. What voltage is on the pin? Give your answer in volts to two decimal places, and state what one count is worth in millivolts.    "
},
{
  "id": "subsec-adc-day7-datasheet",
  "level": "1",
  "url": "subsec-adc-day7-datasheet.html",
  "type": "Subsection",
  "number": "6.2.2",
  "title": "Part 2: Which Pins Can Do Analog?",
  "body": " Part 2: Which Pins Can Do Analog?  Not every pin can be an analog input. The STM32C031C6 has one ADC, and a multiplexer in front of it that can connect the converter to one of up to 23 channels — some of them external pins, some of them internal signals. Before you can measure anything you have to know which pin is wired to which channel, and the only authority on that is the datasheet.  On Day 2 you looked up D4 in the Nucleo pinout, and on Day 5 you used Table 13, Port A alternate function mapping , to find which pins USART2 could use. Today's question lives one table earlier in the same document.   How to read Table 12, Pin assignment and description , in the STM32C031C6 datasheet. The header row names the columns: the six on the left give the pin number in each package variant (ours is the 48-pin LQFP), then the highlighted Pin name column, and on the far right the highlighted Additional functions column — the one that answers today's question. Read that column three ways. Where it names ADC_INn , as it does for PA1 , PA2 and PA3 , the pin can be an analog input on channel . Where it shows a dash, as for PF3 and VREF+ , the pin has no additional functions at all. And where it names something that is not an ADC_IN — PC14 's OSCX_IN , or PF2-NRST 's NRST — the pin does have an additional function, just not an analog one. Rows are skipped where marked, and the row you actually need is not among those shown.     Find Your Channel   Open the STM32C031C6 datasheet and find Table 12, Pin assignment and description .     Find the row for PA0 . Read across to the Additional functions column. What does it say? Does PA0 support analog input, and if so, on which channel?      Find the row for PA9 . Can PA9 be used as an analog input? How do you know?      The pin you will use today is labeled A0 on the Nucleo's header silkscreen. Write down all three names for it: the Arduino label, the port pin, and the ADC channel number. Keep this — you will need the same three-way translation for a different pin later.     The three numbers happen to agree for A0: it is PA0, and it is channel 0. Do not read anything into that. The header label, the port pin, and the ADC channel are three independent naming schemes that coincide here and generally do not — so look each one up rather than assuming it follows from the others.  Which channel the converter actually samples is selected by the channel selection register , ADC_CHSELR . Each bit enables one channel: set bit to sample channel . (That plain reading holds because CHSELRMOD is 0, its reset value; the register can also be put into a different sequencing mode, which we do not use.)   The ADC's input multiplexer, from RM0490 Figure 33. The green labels mark the six port pins that the Nucleo brings out to the Arduino analog header — most of the other numbered channels do reach package pins too, and Table 12 is what tells you which. Four channels reach no pin at all: VSENSE , VREFINT , VDDA and VSSA are internal signals — among them the on-chip temperature sensor and the internal reference — that this same ADC can measure with no external wiring whatsoever. Bit of ADC_CHSELR selects channel (RM0490 §14.12.9).       "
},
{
  "id": "subsec-adc-day7-datasheet-2",
  "level": "2",
  "url": "subsec-adc-day7-datasheet.html#subsec-adc-day7-datasheet-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "channels "
},
{
  "id": "fig-adc-datasheet-table12",
  "level": "2",
  "url": "subsec-adc-day7-datasheet.html#fig-adc-datasheet-table12",
  "type": "Figure",
  "number": "6.2.1",
  "title": "",
  "body": " How to read Table 12, Pin assignment and description , in the STM32C031C6 datasheet. The header row names the columns: the six on the left give the pin number in each package variant (ours is the 48-pin LQFP), then the highlighted Pin name column, and on the far right the highlighted Additional functions column — the one that answers today's question. Read that column three ways. Where it names ADC_INn , as it does for PA1 , PA2 and PA3 , the pin can be an analog input on channel . Where it shows a dash, as for PF3 and VREF+ , the pin has no additional functions at all. And where it names something that is not an ADC_IN — PC14 's OSCX_IN , or PF2-NRST 's NRST — the pin does have an additional function, just not an analog one. Rows are skipped where marked, and the row you actually need is not among those shown.   "
},
{
  "id": "act-adc-datasheet-lookup",
  "level": "2",
  "url": "subsec-adc-day7-datasheet.html#act-adc-datasheet-lookup",
  "type": "Activity",
  "number": "6.2.2",
  "title": "Find Your Channel.",
  "body": " Find Your Channel   Open the STM32C031C6 datasheet and find Table 12, Pin assignment and description .     Find the row for PA0 . Read across to the Additional functions column. What does it say? Does PA0 support analog input, and if so, on which channel?      Find the row for PA9 . Can PA9 be used as an analog input? How do you know?      The pin you will use today is labeled A0 on the Nucleo's header silkscreen. Write down all three names for it: the Arduino label, the port pin, and the ADC channel number. Keep this — you will need the same three-way translation for a different pin later.    "
},
{
  "id": "subsec-adc-day7-datasheet-7",
  "level": "2",
  "url": "subsec-adc-day7-datasheet.html#subsec-adc-day7-datasheet-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "channel selection register "
},
{
  "id": "fig-adc-chselr",
  "level": "2",
  "url": "subsec-adc-day7-datasheet.html#fig-adc-chselr",
  "type": "Figure",
  "number": "6.2.2",
  "title": "",
  "body": " The ADC's input multiplexer, from RM0490 Figure 33. The green labels mark the six port pins that the Nucleo brings out to the Arduino analog header — most of the other numbered channels do reach package pins too, and Table 12 is what tells you which. Four channels reach no pin at all: VSENSE , VREFINT , VDDA and VSSA are internal signals — among them the on-chip temperature sensor and the internal reference — that this same ADC can measure with no external wiring whatsoever. Bit of ADC_CHSELR selects channel (RM0490 §14.12.9).   "
},
{
  "id": "subsec-adc-day7-circuit",
  "level": "1",
  "url": "subsec-adc-day7-circuit.html",
  "type": "Subsection",
  "number": "6.2.3",
  "title": "Part 3: The Test Circuit",
  "body": " Part 3: The Test Circuit  You are about to build the test circuit you will measure for the rest of the day: a potentiometer wired across the supply, with its wiper feeding the pin you just looked up. Turning the knob will sweep that pin's voltage, which is what gives the ADC something interesting to convert.  You may be able to push the potentiometer's pins (hard) straight into the breadboard. Otherwise, use three of the pin-to-clip jumpers. Either way the connections are the same: the two outer terminals go to 3.3 V and GND, and the wiper — the middle terminal — goes to the pin labeled A0 .   The potentiometer itself, with the three terminals identified beneath it: GND and 3.3 V go to the outer two, and the wiper — the middle terminal — goes to A0.     The test circuit. The potentiometer's fixed track runs between 3.3 V and GND, and the wiper taps off a voltage somewhere between them, set by the knob. That wiper voltage is the analog input to PA0. This is the same circuit you will use for the first part of Lab 4.     Predict, Then Measure   Wire the three jumpers. Before you connect anything to the board's A0 pin, put your DMM on the wiper and answer these in order — predictions first, in writing, then measure.     Predict the wiper voltage with the knob turned fully counter-clockwise, at its center, fully clockwise, and about a quarter of the way up from the counter-clockwise end. Write down all four numbers before measuring anything — the quarter-turn one is the only one you cannot get by staring at the rails.      Now measure all four with the DMM. Where do your predictions and measurements disagree, and by how much?      Convert each of your four measured voltages into the count you expect the ADC to report. Keep these numbers — in a few minutes you will be able to check them against the real thing.      "
},
{
  "id": "fig-adc-pot-photo",
  "level": "2",
  "url": "subsec-adc-day7-circuit.html#fig-adc-pot-photo",
  "type": "Figure",
  "number": "6.2.3",
  "title": "",
  "body": " The potentiometer itself, with the three terminals identified beneath it: GND and 3.3 V go to the outer two, and the wiper — the middle terminal — goes to A0.   "
},
{
  "id": "fig-adc-test-circuit",
  "level": "2",
  "url": "subsec-adc-day7-circuit.html#fig-adc-test-circuit",
  "type": "Figure",
  "number": "6.2.4",
  "title": "",
  "body": " The test circuit. The potentiometer's fixed track runs between 3.3 V and GND, and the wiper taps off a voltage somewhere between them, set by the knob. That wiper voltage is the analog input to PA0. This is the same circuit you will use for the first part of Lab 4.   "
},
{
  "id": "act-adc-wire-measure",
  "level": "2",
  "url": "subsec-adc-day7-circuit.html#act-adc-wire-measure",
  "type": "Activity",
  "number": "6.2.3",
  "title": "Predict, Then Measure.",
  "body": " Predict, Then Measure   Wire the three jumpers. Before you connect anything to the board's A0 pin, put your DMM on the wiper and answer these in order — predictions first, in writing, then measure.     Predict the wiper voltage with the knob turned fully counter-clockwise, at its center, fully clockwise, and about a quarter of the way up from the counter-clockwise end. Write down all four numbers before measuring anything — the quarter-turn one is the only one you cannot get by staring at the rails.      Now measure all four with the DMM. Where do your predictions and measurements disagree, and by how much?      Convert each of your four measured voltages into the count you expect the ADC to report. Keep these numbers — in a few minutes you will be able to check them against the real thing.    "
},
{
  "id": "subsec-adc-day7-registers",
  "level": "1",
  "url": "subsec-adc-day7-registers.html",
  "type": "Subsection",
  "number": "6.2.4",
  "title": "Part 4a: The Registers, One at a Time",
  "body": " Part 4a: The Registers, One at a Time  If you have used an Arduino, analogRead(A0) did five things for you invisibly: it set the pin's mode, enabled the ADC's clock, selected the channel, started a conversion, and waited for it to finish. Today you do each one of these steps yourself — which is precisely what lets you change any of them later, and what lets you see where a measurement went wrong when it does. We will look at each step on its own before you write any of them.   The pin. An analog input is a fourth GPIO mode, alongside input, output, and alternate function. Its MODER encoding is 0b11 . Like every peripheral, a GPIO port needs its own clock enabled before its registers respond — and note that this is the port's clock, in RCC_IOPENR , which is a different register from the ADC's own clock enable that follows. Then, as always with a multi-bit field, clear it before setting it: writing only the set would leave whatever was there before ORed in. The example below uses PA4 , not the PA0 you actually need, so that you have to work out which parts change rather than copying it across:  RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/\/ clock to port A GPIOA->MODER &= ~GPIO_MODER_MODE4_Msk; \/\/ clear both mode bits GPIOA->MODER |= (GPIO_ANALOG << GPIO_MODER_MODE4_Pos); \/\/ then set them to 0b11   GPIO_ANALOG is the constant 3 that ES28.h defines for this mode — the same list of mode constants you met on Day 6 ( GPIO_INPUT 0, GPIO_OUTPUT 1, GPIO_ALTERNATE 2, GPIO_ANALOG 3) — and 3 is 0b11 in binary, which is what the two MODER bits must hold. GPIO_MODER_MODE4_Pos is the CMSIS name for where that two-bit field starts; using the named constants rather than counting bit positions by hand is what keeps this readable.   The ADC clock. Like every peripheral, the ADC does nothing until its clock is enabled. The ADC sits on the APB bus, and its enable bit lives in RCC_APBENR2 :  RCC->APBENR2 |= RCC_APBENR2_ADCEN; \/\/ enable the clock to the ADC  The converter also has its own conversion clock, asynchronous to the APB bus clock that this line enables. We leave it at its default source and prescaler, so there is nothing further to configure today — but remember that this line is where the ADC becomes reachable at all.   The channel. Set the bit for the channel you want in ADC_CHSELR . To sample channel 4, which is where PA4 appears:  ADC1->CHSELR |= ADC_CHSELR_CHSEL4; \/\/ select channel 4  The peripheral is called ADC1 even though this chip has only one converter — other members of the STM32 family have several, and the name is kept consistent so code ports between them.   The converter. Two registers govern the ADC itself: ADC_CR and ADC_ISR . Of these two, ADC_CR is the control register. In this register, ADEN enables the ADC and ADSTART begins a conversion.   The ADC control register, ADC_CR . Bit 0 ( ADEN ) enables the converter; bit 2 ( ADSTART ) starts a conversion and is cleared by hardware when that conversion completes. You set these bits; the hardware manages the rest.    Enabling the ADC does not make it usable immediately — the analog circuitry needs time to stabilize. The three steps to help accomplish this are: clear ADRDY , set ADEN , and then wait for ADRDY to come back. That flag is how the hardware tells you the converter is ready to accept work. Note that the first two happen once, in our initilization routine pa0_adc_init() , while the wait lives in start_conversion() — a procedure run to initialte a sample.   ADC_ISR is the interrupt and status register, where the hardware reports what it has done. Two of its bits matter today: ADRDY , set when the converter has finished starting up and is ready to begin a conversion, and EOC , set when a conversion has finished and the result is available.   The ADC interrupt and status register, ADC_ISR . ADRDY (bit 0) means the converter is ready to be used; EOC (bit 2) means a conversion has completed and its result is waiting in the data register. Both are set by hardware — your code's job is to wait for them.    Waiting for a status bit is a pattern you have used before. On Day 5 you waited for the UART to be ready to accept a character:  while (!(USART2->ISR & USART_ISR_TXE_TXFNF)) {} \/\/ Day 5: wait for the UART  The ADC wait has the same shape: same while , same !(register & bit) , a different register and a different bit. Written out for the end-of-conversion flag, it is:  while (!(ADC1->ISR & ADC_ISR_EOC)) {} \/\/ wait until the conversion is done  This is the first time in this book you have had to write that idiom rather than read one, so it is worth saying its parts out loud: keep looping for as long as it is not true that the flag bit is set.  Finally, when a conversion completes, the 12-bit result appears in the data register ADC_DR , right-aligned in bits 11:0. Reading ADC_DR also clears EOC , so each result is collected exactly once.   ADC_DR is a 32-bit register, but the result inside it is only 12 bits wide and sits at the bottom, so it fits comfortably in a uint16_t — which is why adc_read() returns one rather than a full uint32_t . The cast (uint16_t) discards the upper 16 bits of the register, and that is safe here precisely because those bits are reserved and always read as zero. Narrowing a value you have not checked is a good way to lose data silently; this one you have checked.         "
},
{
  "id": "subsec-adc-day7-registers-3",
  "level": "2",
  "url": "subsec-adc-day7-registers.html#subsec-adc-day7-registers-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The pin. "
},
{
  "id": "subsec-adc-day7-registers-6",
  "level": "2",
  "url": "subsec-adc-day7-registers.html#subsec-adc-day7-registers-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The ADC clock. "
},
{
  "id": "subsec-adc-day7-registers-9",
  "level": "2",
  "url": "subsec-adc-day7-registers.html#subsec-adc-day7-registers-9",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The channel. "
},
{
  "id": "subsec-adc-day7-registers-12",
  "level": "2",
  "url": "subsec-adc-day7-registers.html#subsec-adc-day7-registers-12",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The converter. "
},
{
  "id": "fig-adc-cr",
  "level": "2",
  "url": "subsec-adc-day7-registers.html#fig-adc-cr",
  "type": "Figure",
  "number": "6.2.5",
  "title": "",
  "body": " The ADC control register, ADC_CR . Bit 0 ( ADEN ) enables the converter; bit 2 ( ADSTART ) starts a conversion and is cleared by hardware when that conversion completes. You set these bits; the hardware manages the rest.   "
},
{
  "id": "fig-adc-isr",
  "level": "2",
  "url": "subsec-adc-day7-registers.html#fig-adc-isr",
  "type": "Figure",
  "number": "6.2.6",
  "title": "",
  "body": " The ADC interrupt and status register, ADC_ISR . ADRDY (bit 0) means the converter is ready to be used; EOC (bit 2) means a conversion has completed and its result is waiting in the data register. Both are set by hardware — your code's job is to wait for them.   "
},
{
  "id": "subsec-adc-day7-code",
  "level": "1",
  "url": "subsec-adc-day7-code.html",
  "type": "Subsection",
  "number": "6.2.5",
  "title": "Part 4b: Writing ADCPot.c",
  "body": " Part 4b: Writing ADCPot.c  Now put the four registers together. The program has three parts: a one-time initialization, a function that starts a conversion, and a function that waits for and returns the result.  Here is the skeleton. Each \/\/ TODO is one of the clusters you have just seen — but for channel 0 on PA0 , not the channel 4 examples above.  \/* ADCPot.c -- read a potentiometer on PA0 with the ADC * ENGS 28 *\/ #include <stdio.h> #include \"ES28.h\" #include \"uart.h\" void pa0_adc_init(void); void start_conversion(void); uint16_t adc_read(void); int main(void) { uint16_t sensor_value; uart2_init(); printf(\"\\n\\rHello from STM32C0!\\r\\n\"); printf(\"Single conversion ADC test\\r\\n\"); pa0_adc_init(); while (1) { start_conversion(); sensor_value = adc_read(); printf(\"Sensor value: %d\\r\\n\", sensor_value); delay_ms(1000); } return 1; } void pa0_adc_init(void) { \/\/ TODO 1 -- configure PA0 as an analog input \/\/ (enable the GPIOA clock, then clear and set the mode bits) \/\/ TODO 2 -- enable the clock to the ADC \/\/ TODO 3 -- select the channel PA0 is connected to \/\/ Enable the ADC module ADC1->ISR = ADC_ISR_ADRDY; \/\/ clear the ready bit (we'll come back to this) ADC1->CR |= ADC_CR_ADEN; \/\/ set the ADC enable bit } void start_conversion(void) { \/\/ TODO 4 -- wait until the ADC reports that it is ready (ADRDY) ADC1->CR |= ADC_CR_ADSTART; \/\/ start a single conversion } uint16_t adc_read(void) { \/\/ TODO 5 -- wait until the conversion has finished (EOC) return (uint16_t) ADC1->DR; \/\/ reading DR also clears EOC }   Make the Knob Move the Number    Fill in the five \/\/ TODO blanks. Build, flash, and open your serial terminal. Turn the knob.      Compare what you see against the three counts you predicted in Part 3. Do they match? If a reading is off by more than a few counts, is the disagreement in your prediction, your DMM measurement, or the ADC?      Nothing printed? Work down this list before asking for help — each symptom has a distinct cause.    The debugger will not connect, with a libusb error. Check that your power rail is on 3V3 and not NRST — they are adjacent on the header, and this is the single most common wiring error on this board.   No output at all, but the board flashes and runs. Confirm you are building the project you think you are. A stray copy of blinky.c left in the project will build and run without error while printing nothing.   Output appears but never changes. The wiper is probably not connected to A0. Failing that, check that TODO 1 set the mode bits to 0b11 and not to something else. Note that the reset value for MODER for most GPIO pins is 3 (analog mode) so if you forgot this step entirely it's not the cause for this error.   The value is always 0. The pin really is sitting at 0 V. Check that the wiper jumper shares a breadboard row with the pot's middle leg, and that the two outer legs go to 3.3 V and GND — not both to GND.   The program hangs with no output after the greeting. One of the while loops is waiting for a bit that will never be set. All three likely causes look identical from outside: the ADC clock (TODO 2), the channel (TODO 3), or the ready wait (TODO 4). Check them in that order.   Finished early? Turn the knob to each mechanical end stop. Do you read exactly 0 and exactly 4095? If not, why not — and is the explanation in the potentiometer or in the converter?       "
},
{
  "id": "act-adc-write-code",
  "level": "2",
  "url": "subsec-adc-day7-code.html#act-adc-write-code",
  "type": "Activity",
  "number": "6.2.4",
  "title": "Make the Knob Move the Number.",
  "body": " Make the Knob Move the Number    Fill in the five \/\/ TODO blanks. Build, flash, and open your serial terminal. Turn the knob.      Compare what you see against the three counts you predicted in Part 3. Do they match? If a reading is off by more than a few counts, is the disagreement in your prediction, your DMM measurement, or the ADC?    "
},
{
  "id": "subsec-adc-day7-code-6",
  "level": "2",
  "url": "subsec-adc-day7-code.html#subsec-adc-day7-code-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Nothing printed? "
},
{
  "id": "subsec-adc-day7-atomic",
  "level": "1",
  "url": "subsec-adc-day7-atomic.html",
  "type": "Subsection",
  "number": "6.2.6",
  "title": "Part 5: Wait — How Did That Clear the Bit?",
  "body": " Part 5: Wait — How Did That Clear the Bit?  There is a line in the code you just wrote that should not work.  ADC1->ISR = ADC_ISR_ADRDY; \/\/ \"clear the ready bit\"  Think back to Blinky. When you wanted to clear a bit in a register, you did this:  #define LED_PIN (1U << 5) GPIOA->ODR |= LED_PIN; \/\/ set bit 5 -- LED on GPIOA->ODR &= ~LED_PIN; \/\/ clear bit 5 -- LED off  Clearing meant ANDing with the complement of the mask. But ADC1->ISR = ADC_ISR_ADRDY; is a plain assignment, and ADC_ISR_ADRDY is a mask with bit 0 set . Read literally, that line writes a 1 into bit 0 and a 0 into every other bit of the status register — the opposite of clearing bit 0, and apparently destroying everything else.  And yet it is correct, and the &= ~ version would be a bug. Why?  The answer is that this register's bits do not behave like ordinary memory. ADRDY is a write-1-to-clear bit — rc_w1 in the reference manual's notation. For such a bit:   writing a 1 clears it;  writing a 0 does nothing at all.   So the assignment does exactly what is wanted: bit 0 receives a 1 and is cleared, while every other bit receives a 0 and is left untouched. The register is not being overwritten; it is being sent one instruction per bit.  Now consider what ADC1->ISR &= ~ADC_ISR_ADRDY; would do. The compiler has to read the whole register, clear one bit in the copy, and write all 32 bits back. That write puts a 1 into every status bit that happened to be set when the read occurred — and on this register, writing a 1 means clear . So every other flag that was already raised at the moment of the read would be wiped out, including one you had not looked at yet and were about to handle. You would lose events you never knew had happened.  And it would not even do the job you asked for. The point of the operation was to clear ADRDY , so the read-modify-write puts a 0 into that bit position — and writing a 0 to an rc_w1 bit does nothing at all. ADRDY would still be set. The line manages to destroy the flags you cared about while leaving the one flag you meant to clear exactly as it was.  This is why status registers are built this way. A flag register is written by two parties — the hardware sets bits, your code clears them — and a read-modify-write cannot safely share a register with a writer it cannot see. Write-1-to-clear removes the conflict: your code names the single bit it means to clear and says nothing about the others.   Why the read-modify-write is wrong twice over. Start with three flags set. A plain assignment writes a 1 into ADRDY and a 0 into everything else, so ADRDY clears and the others are untouched. The &= ~ version reads all 32 bits, clears ADRDY in its copy, and writes the lot back — which sends a 1 to every flag that was already set, clearing OVR and EOC, while sending a 0 to ADRDY, which does nothing. The flags you needed are gone and the one you meant to clear is still set.     Reading the access type  The reference manual labels every register field with how it may be accessed: rw for ordinary read-write bits, r for read-only, rs for bits you can set but not clear (writing 0 does nothing — ADEN and ADSTART are both rs ), rc_w1 for read, cleared by writing 1, and rc_w0 for the opposite convention, cleared by writing 0. The digit in the name tells you which value does the clearing, so it is worth reading rather than assuming. That label is a contract, and it tells you which idiom to use. When you meet a new status register, check the access type before you decide how to clear a flag.      "
},
{
  "id": "subsec-adc-day7-atomic-8",
  "level": "2",
  "url": "subsec-adc-day7-atomic.html#subsec-adc-day7-atomic-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "write-1-to-clear "
},
{
  "id": "fig-adc-rmw-damage",
  "level": "2",
  "url": "subsec-adc-day7-atomic.html#fig-adc-rmw-damage",
  "type": "Figure",
  "number": "6.2.9",
  "title": "",
  "body": " Why the read-modify-write is wrong twice over. Start with three flags set. A plain assignment writes a 1 into ADRDY and a 0 into everything else, so ADRDY clears and the others are untouched. The &= ~ version reads all 32 bits, clears ADRDY in its copy, and writes the lot back — which sends a 1 to every flag that was already set, clearing OVR and EOC, while sending a 0 to ADRDY, which does nothing. The flags you needed are gone and the one you meant to clear is still set.   "
},
{
  "id": "insight-adc-rc-w1",
  "level": "2",
  "url": "subsec-adc-day7-atomic.html#insight-adc-rc-w1",
  "type": "Insight",
  "number": "6.2.10",
  "title": "Reading the access type.",
  "body": " Reading the access type  The reference manual labels every register field with how it may be accessed: rw for ordinary read-write bits, r for read-only, rs for bits you can set but not clear (writing 0 does nothing — ADEN and ADSTART are both rs ), rc_w1 for read, cleared by writing 1, and rc_w0 for the opposite convention, cleared by writing 0. The digit in the name tells you which value does the clearing, so it is worth reading rather than assuming. That label is a contract, and it tells you which idiom to use. When you meet a new status register, check the access type before you decide how to clear a flag.  "
},
{
  "id": "subsec-adc-day7-sar",
  "level": "1",
  "url": "subsec-adc-day7-sar.html",
  "type": "Subsection",
  "number": "6.2.7",
  "title": "Part 6: Successive Approximation, Live",
  "body": " Part 6: Successive Approximation, Live  The reading explained that the converter finds its answer by binary search. Let us actually run one.   Be the Converter   Think of a whole number between 0 and 15 — four bits' worth — and keep it to yourself. We will find it by successive approximation, exactly as the hardware does, one bit at a time from the most significant down.     Answer only yes or no to each question. Starting with SAR = 0b1000 (8), so testing the highest bit, namely bit 3: is your number greater than or equal to 8? If yes, the bit stays; if no, it is cleared. Then test bit 2, then bit 1, then bit 0 the same way.      How many questions did it take, and how many would it take for a number between 0 and 4095? What does that tell you about how long a 12-bit conversion must take?     Four bits took four questions; twelve bits take twelve comparisons, plus a little overhead for sampling — about 14 ADC clock cycles in total ( ). That is why a conversion is not instantaneous, and why your code has to wait for EOC rather than reading ADC_DR straight away. One comparison per bit is the whole story.   "
},
{
  "id": "act-adc-guessing-game",
  "level": "2",
  "url": "subsec-adc-day7-sar.html#act-adc-guessing-game",
  "type": "Activity",
  "number": "6.2.5",
  "title": "Be the Converter.",
  "body": " Be the Converter   Think of a whole number between 0 and 15 — four bits' worth — and keep it to yourself. We will find it by successive approximation, exactly as the hardware does, one bit at a time from the most significant down.     Answer only yes or no to each question. Starting with SAR = 0b1000 (8), so testing the highest bit, namely bit 3: is your number greater than or equal to 8? If yes, the bit stays; if no, it is cleared. Then test bit 2, then bit 1, then bit 0 the same way.      How many questions did it take, and how many would it take for a number between 0 and 4095? What does that tell you about how long a 12-bit conversion must take?    "
},
{
  "id": "subsec-adc-day7-homework",
  "level": "1",
  "url": "subsec-adc-day7-homework.html",
  "type": "Subsection",
  "number": "6.2.8",
  "title": "Part 7: Before Next Class",
  "body": " Part 7: Before Next Class  These continue directly into Lab 4 — keep records of what you find. Make one change at a time, and change it back before making the next.   Homework     Move the pot to A3. Rewire the wiper to the header pin labeled A3 and make the program work again. You will need to find out which port pin A3 is — the Nucleo pinout has that — and then which ADC channel that port pin reaches, which is datasheet Table 12 again. Do not assume any of the three numbers match — work each translation out from the pinout and the datasheet, and write down the chain you followed.  Everything that mentions the old pin has to change with it. Check each line of pa0_adc_init() in turn and ask whether it still names the right thing.       Change the resolution. Set your pot so the DMM reads as close to 1.000 V as you can manage, and record the count the ADC returns. Then find the RES field in ADC_CFGR1 in the reference manual and switch the converter to 10-bit. Read the field's access rules while you are there: RM0490 §14.12.4 allows software to program ADC_CFGR1 only while ADEN is cleared, so where you put this line matters as much as what it says. Predict the new count before you run it, then check. Explain the factor you see.       Check the arithmetic both ways. Pick any three knob positions. For each, measure the wiper with the DMM, record the count your program reports, and compute the voltage from the count. How closely do the measured and computed voltages agree, and is the difference within the one-LSB rounding you would expect?      "
},
{
  "id": "act-adc-homework",
  "level": "2",
  "url": "subsec-adc-day7-homework.html#act-adc-homework",
  "type": "Activity",
  "number": "6.2.6",
  "title": "Homework.",
  "body": " Homework     Move the pot to A3. Rewire the wiper to the header pin labeled A3 and make the program work again. You will need to find out which port pin A3 is — the Nucleo pinout has that — and then which ADC channel that port pin reaches, which is datasheet Table 12 again. Do not assume any of the three numbers match — work each translation out from the pinout and the datasheet, and write down the chain you followed.  Everything that mentions the old pin has to change with it. Check each line of pa0_adc_init() in turn and ask whether it still names the right thing.       Change the resolution. Set your pot so the DMM reads as close to 1.000 V as you can manage, and record the count the ADC returns. Then find the RES field in ADC_CFGR1 in the reference manual and switch the converter to 10-bit. Read the field's access rules while you are there: RM0490 §14.12.4 allows software to program ADC_CFGR1 only while ADEN is cleared, so where you put this line matters as much as what it says. Predict the new count before you run it, then check. Explain the factor you see.       Check the arithmetic both ways. Pick any three knob positions. For each, measure the wiper with the DMM, record the count your program reports, and compute the voltage from the count. How closely do the measured and computed voltages agree, and is the difference within the one-LSB rounding you would expect?    "
},
{
  "id": "subsec-adc-ref-hardware",
  "level": "1",
  "url": "subsec-adc-ref-hardware.html",
  "type": "Subsection",
  "number": "6.3.1",
  "title": "Inside the Converter",
  "body": " Inside the Converter   Conversion timing (RM0490, Analog to digital conversion time ). Setting ADSTART starts sampling; sampling takes 1.5 ADC clock cycles and the successive approximation itself 12.5 (the 1.5 is the reset value of SMP1[2:0] in ADC_SMPR , which this chapter leaves alone), so a 12-bit conversion is 14 cycles in all — about 1.17 µs at the default 12 MHz ADC clock. EOC is then set and the result is in ADC_DR . ADSTART stays set for the whole conversion and is cleared by hardware at the end — while it reads 1, the converter is busy.    "
},
{
  "id": "fig-adc-timing",
  "level": "2",
  "url": "subsec-adc-ref-hardware.html#fig-adc-timing",
  "type": "Figure",
  "number": "6.3.1",
  "title": "",
  "body": " Conversion timing (RM0490, Analog to digital conversion time ). Setting ADSTART starts sampling; sampling takes 1.5 ADC clock cycles and the successive approximation itself 12.5 (the 1.5 is the reset value of SMP1[2:0] in ADC_SMPR , which this chapter leaves alone), so a 12-bit conversion is 14 cycles in all — about 1.17 µs at the default 12 MHz ADC clock. EOC is then set and the result is in ADC_DR . ADSTART stays set for the whole conversion and is cleared by hardware at the end — while it reads 1, the converter is busy.   "
},
{
  "id": "subsec-adc-ref-impedance",
  "level": "1",
  "url": "subsec-adc-ref-impedance.html",
  "type": "Subsection",
  "number": "6.3.2",
  "title": "Source Resistance and Sampling Time",
  "body": " Source Resistance and Sampling Time  The ADC does not measure a voltage without drawing anything from it. Inside the converter is a small capacitor that must be charged up to the input voltage before the successive approximation can begin, and it charges through whatever source you have connected — through the potentiometer's track, or through a sensor's own output resistance.  That charging happens inside a fixed window: the sampling time, set by SMP1[2:0] in ADC_SMPR and left at its shortest setting throughout this chapter. Note what this does not depend on — how often you take a reading. Sampling once a second rather than a thousand times a second gives the capacitor no extra time on any individual conversion, because each conversion gets the same window. If the source cannot charge the capacitor within that window, every reading comes back low by an amount that does not average away.  The datasheet's Maximum ADC RAIN table is the lookup: it gives the largest source resistance the converter tolerates for a given sampling time and resolution. Read it carefully — the table is indexed at a 35 MHz ADC clock, so a given number of sampling cycles buys you nearly three times as long at the 12 MHz clock this course runs. A 10 kΩ potentiometer presents its worst case at mid-travel, where the two halves of the track sit in parallel: about 2.5 kΩ. That is enough to cost a few counts, which is invisible on a knob you are turning by hand and very visible on a sensor you are trying to trust. The fix is to lengthen the sampling time, not to sample less often.  "
},
{
  "id": "subsec-adc-ref-registers",
  "level": "1",
  "url": "subsec-adc-ref-registers.html",
  "type": "Subsection",
  "number": "6.3.3",
  "title": "Register Summary",
  "body": " Register Summary   The ADC registers used in this chapter    Register Field Purpose    RCC_APBENR2 ADCEN  Enable the clock to the ADC    GPIOx_MODER MODEn  Set the pin to analog mode ( 11 )    ADC_CHSELR CHSELn  Select channel for conversion    ADC_CR ADEN  Enable the converter    ADC_CR ADSTART  Start a conversion    ADC_ISR ADRDY  Converter is ready (write 1 to clear)    ADC_ISR EOC  Conversion complete (cleared by reading ADC_DR , or by writing 1)    ADC_DR —  The 12-bit result, right-aligned in bits 11:0    ADC_CFGR1 RES  Resolution: 12, 10, 8, or 6 bits     "
},
{
  "id": "table-adc-registers",
  "level": "2",
  "url": "subsec-adc-ref-registers.html#table-adc-registers",
  "type": "Table",
  "number": "6.3.2",
  "title": "The ADC registers used in this chapter",
  "body": " The ADC registers used in this chapter    Register Field Purpose    RCC_APBENR2 ADCEN  Enable the clock to the ADC    GPIOx_MODER MODEn  Set the pin to analog mode ( 11 )    ADC_CHSELR CHSELn  Select channel for conversion    ADC_CR ADEN  Enable the converter    ADC_CR ADSTART  Start a conversion    ADC_ISR ADRDY  Converter is ready (write 1 to clear)    ADC_ISR EOC  Conversion complete (cleared by reading ADC_DR , or by writing 1)    ADC_DR —  The 12-bit result, right-aligned in bits 11:0    ADC_CFGR1 RES  Resolution: 12, 10, 8, or 6 bits    "
},
{
  "id": "subsec-debug-part1",
  "level": "1",
  "url": "subsec-debug-part1.html",
  "type": "Subsection",
  "number": "7.1.1",
  "title": "Part 1: Where Do Bugs Come From?",
  "body": " Part 1: Where Do Bugs Come From?   Bugs in C programs are not exotic. The same short list of slips accounts for a very large share of the time this class will spend debugging:   Missing or extra semicolon, ) , or }  Incorrect register name  Missing #include files  Incorrect constant ( #define ) values  Undeclared or uninitialized variables  Misspelled names  Type mismatches  No return statement in a function  = or == ? & or && ? | or || ? ~ or ! ?  Alas, many others   Some of these the compiler will catch for you. The ones it cannot catch do something worse than fail: they compile cleanly and then run incorrectly.  A handful of habits prevents a remarkable fraction of that list before it happens: plan the design on paper before typing; write in small chunks and test each one before moving on; give every function one clear job; use named constants instead of magic numbers; and keep the code readable enough that a bug has nowhere to hide. The full checklist, with the reasoning behind each item, is in .   Whose Bugs Are These?   Count how many entries on the list above you have personally produced. Raise your hand as we go through them — the instructor's hand will be up for essentially every item.    Pick one bug you just counted. Write down which habit from the paragraph above would have caught it before it cost you time.      "
},
{
  "id": "act-debug-bugs",
  "level": "2",
  "url": "subsec-debug-part1.html#act-debug-bugs",
  "type": "Activity",
  "number": "7.1.1",
  "title": "Whose Bugs Are These?",
  "body": " Whose Bugs Are These?   Count how many entries on the list above you have personally produced. Raise your hand as we go through them — the instructor's hand will be up for essentially every item.    Pick one bug you just counted. Write down which habit from the paragraph above would have caught it before it cost you time.   "
},
{
  "id": "subsec-debug-part2a",
  "level": "1",
  "url": "subsec-debug-part2a.html",
  "type": "Subsection",
  "number": "7.1.2",
  "title": "Part 2a: What the Compiler Is Trying to Tell You",
  "body": " Part 2a: What the Compiler Is Trying to Tell You   Compiler error messages are the cheapest debugging tool you have — the compiler has already found the bug; it is just bad at telling you where. Here is a classmate's main.c that will not build. It is Blinky, and exactly one thing is wrong with it:  #include \"stm32c0xx.h\" \/\/ all register definitions live here #define GPIOAEN (1U << 0) \/\/ RCC->IOPENR bit 0: clock for GPIOA #define LED_PIN (1U << 5) \/\/ GPIOA bit 5: the on-board LED int main(void) { RCC->IOPENR |= GPIOAEN \/\/ Step 1: enable GPIOA clock GPIOA->MODER |= (1U << 10); \/\/ Step 2a: set bit 10 GPIOA->MODER &= ~(1U << 11); \/\/ Step 2b: clear bit 11 -> PA5 output while (1) { GPIOA->ODR |= LED_PIN; \/\/ Step 3: bit 5 = 1 -> LED on for (int i = 0; i < 100000; i++); GPIOA->ODR &= ~LED_PIN; \/\/ Step 4: bit 5 = 0 -> LED off for (int i = 0; i < 100000; i++); } return 0; \/\/ never reached }  The compiler reports the following. A quick anatomy note for a first read of GCC output: each block starts with file:line:column: , then error: (what stopped the compiler) or note: (context it is adding, pointing at a second, related location), then the offending source line with a caret marking the exact column.  main.c: In function 'main': main.c:2:18: error: called object is not a function or function pointer 2 | #define GPIOAEN (1U << 0) \/\/ RCC->IOPENR bit 0: clock for GPIOA | ^ main.c:6:21: note: in expansion of macro 'GPIOAEN' 6 | RCC->IOPENR |= GPIOAEN \/\/ Step 1: enable GPIOA clock | ^~~~~~~   Find the Real Bug   The first message points at line 2. Read line 2 of the listing. Is anything wrong with it?    Write down the line number where the actual bug is, and what the fix would be. Commit to an answer before the reveal.     Line 2 is perfectly healthy — and that is the lesson. The real bug is the missing semicolon at the end of line 6. Both GPIOAEN and GPIOA are macros that expand to parenthesized expressions. With the semicolon gone, the compiler sees the value (1U << 0) followed immediately by a parenthesized expression — GPIOA 's own expansion — and in C, a value followed by a parenthesized list is a function call . So it objects to the thing being called : the value of GPIOAEN , defined on line 2. (Had GPIOA been an ordinary variable, the same missing semicolon would have produced a plain expected ';' — the message is baffling only because the peripheral name is itself a parenthesized macro.) The line where an error is reported is often just where the compiler finally gave up making sense of the code.  Which direction should you look? Usually the mistake sits at or above the reported line — but this example is exactly the case where that fails, and it is worth seeing why. Line 2 is a #define , and a #define is not code that runs where it is written; it is text pasted in wherever the macro is used . The compiler reported the error at the definition, then told you where the paste happened: note: in expansion of macro 'GPIOAEN' , line 6. Line 6 is the line it was really reading, and the missing semicolon is at the end of it — below line 2, not above.  So the rule is not read up from the error but read up from the line the compiler was reading . For ordinary code those are the same line. For a macro they are not, and the note: is what tells you which line to start from. Three rules recover almost every case:   Start at the top. One root error can spawn many messages; the first one is closest to the cause, and fixing it often clears several below it.  Read up — from the right line. If the reported line looks healthy, the bug is usually on an earlier line — a missing semicolon, ) , or } above. But when the message names a macro, the reported line is the #define ; read up from the line in the note: in expansion of macro instead, which is wherever the macro was used.  Isolate when stuck. For a really pesky error, comment out a block of code and rebuild — if the error moves it tells you a bug was inside the commented out code.   Worth doing once in your own project after today: delete that semicolon, build, read the message, put it back. The transcript from your own compiler is evidence no one can hand you.      "
},
{
  "id": "act-debug-root-error",
  "level": "2",
  "url": "subsec-debug-part2a.html#act-debug-root-error",
  "type": "Activity",
  "number": "7.1.2",
  "title": "Find the Real Bug.",
  "body": " Find the Real Bug   The first message points at line 2. Read line 2 of the listing. Is anything wrong with it?    Write down the line number where the actual bug is, and what the fix would be. Commit to an answer before the reveal.   "
},
{
  "id": "subsec-debug-part2b",
  "level": "1",
  "url": "subsec-debug-part2b.html",
  "type": "Subsection",
  "number": "7.1.3",
  "title": "Part 2b: One printf, Placed Well",
  "body": " Part 2b: One printf, Placed Well   When a program builds and runs but misbehaves, the fastest question-answering tool is a printf — you have used it since Day 5. The skill being practiced today is not writing a printf ; it is placing one. Consider a symptom you may have met this very week: your ADCPot.c builds, flashes, and runs — prints its two greeting lines, and then nothing more, ever.   Place One printf   The symptom: your ADCPot.c builds, flashes, and runs — prints its two greeting lines, and then nothing more, ever.    You get to add exactly one  printf to ADCPot.c . Write down: on which line does it go, and what does it print? There is more than one good answer — but there are many less ideal ones, so commit to yours before the reveal.     A well-placed diagnostic printf answers one of three questions:   Did execution reach this point?  printf(\"pa0_adc_init: entered\\r\\n\"); The greeting printed, so the program runs and printing works — the hang is somewhere after it. The highest-value placement is the first line of pa0_adc_init() : it splits my init hangs from my sample loop hangs , and one more print halves it again — bisection. (Had nothing printed, not even the greeting, Day 7's diagnostic ladder already names the usual cause: a stray blinky.c or another unrelated program is what is actually building.)  Is this value reasonable?  printf(\"sensor_value = %d\\r\\n\", sensor_value); An ADC count of 0 or 4095 that never changes says configuration ; one that jitters near a plausible value says the ADC is fine and the bug is downstream.  Does the actual match the expected?  printf(\"sensor_value = %d (expect 0..4095)\\r\\n\", sensor_value); Print what you expect beside what you got. A number with no expectation next to it is easy to wave through.   Two housekeeping rules from Day 5 still apply: end every printf() string with \\r\\n , and remember that a 32-bit register needs %08lx ( collects the patterns). And when the bug is found: take the diagnostic prints out. They slow the loop and clutter the output of the finished program.    "
},
{
  "id": "act-debug-printf-where",
  "level": "2",
  "url": "subsec-debug-part2b.html#act-debug-printf-where",
  "type": "Activity",
  "number": "7.1.3",
  "title": "Place One printf.",
  "body": " Place One printf   The symptom: your ADCPot.c builds, flashes, and runs — prints its two greeting lines, and then nothing more, ever.    You get to add exactly one  printf to ADCPot.c . Write down: on which line does it go, and what does it print? There is more than one good answer — but there are many less ideal ones, so commit to yours before the reveal.   "
},
{
  "id": "subsec-debug-part3a",
  "level": "1",
  "url": "subsec-debug-part3a.html",
  "type": "Subsection",
  "number": "7.1.4",
  "title": "Part 3a: Launching the Debugger",
  "body": " Part 3a: Launching the Debugger   A printf can only report from code you thought to implement. The interactive debugger built into the STM32CubeIDE needs no such thought before compiletime at all: it halts the processor wherever you ask, and then lets you look at any variable and any peripheral register on the chip, and step the program forward one line at a time. It talks to the STM32C031C6 over the same USB cable you already program with (the Nucleo's ST-LINK circuitry is the go-between), and it works even before the UART does. The one prerequisite: the project must build cleanly first — the debugger finds runtime bugs, not compile errors.  Before you launch: glance at your breadboard's power wire. It must run from the 3V3 pin — not the NRST pin directly above it ( ), a common wiring error in this class. Power on NRST does not damage anything, but it drives the chip's reset pin, and the debugger will refuse to connect until the wire moves.   The Nucleo power header. NRST sits directly above 3.3V — an easy mis-plug. Breadboard power comes from the 3.3V pin.    The launch itself is one click: the bug icon in the toolbar, immediately left of the green Run button ( ).   The bug icon (boxed) sits beside the green Run button in the toolbar. Clicking it builds, flashes, and launches the program under the debugger.     Launch a Debug Session   Your Blinky project should be open and built from the start of class. Run it normally once to confirm the on-board LED still blinks.    Click the bug icon in the toolbar (next to the green Run button — the boxed icon in the figure above) to build, flash, and launch under the debugger. When the Confirm perspective switch window appears, accept it.    Check your screen against the debug-perspective screenshot. The layout has changed — this is the debug perspective — and execution is halted at the first statement of main() , highlighted in green. The program is loaded but has not run a single line of your code yet.     The debug perspective, immediately after launch. The editor holds Blinky's main.c with the first statement of main() highlighted in green — loaded, but not yet executed. The tabbed pane on the right is where today happens: SFRs now, Variables in Part 4 (the tab labels truncate on screen to Varia and Break ). One erratum to ignore in this capture: the on-screen comment on the LED_PIN line writes the 1U<<5 mask as 0b…0001 0000 ; it is 0b…0010 0000 .     If the Debugger Will Not Launch  Four failure modes cover nearly every stuck launch. Find your symptom and apply the fix — a launch that does not come up on the first try is a normal part of this, not a sign you broke something.   The project will not build. You are likely trying to debug some other code than the known and already working Blinky. Download the known-good blinky.c (also on Canvas, first day), replace the contents of your project's Src\/main.c with it, and build again. If the project still will not build, raise your hand and watch with a neighbor: nothing later in Part 3 requires your own launch, and you can redo this walkthrough from this chapter, step by step, before the next class.  Board not found, or a connection error at launch. Reseat the USB cable, then check the breadboard power wire: 3V3, not the NRST pin above it ( ).  Clicked the wrong button on the perspective popup. Window Perspective Open Perspective Debug brings the debug layout up by hand.  The session behaves strangely, or a second launch fails. A previous debug session is probably still running. Terminate it with the red square first — one debug session at a time .       "
},
{
  "id": "subsec-debug-part3a-2",
  "level": "2",
  "url": "subsec-debug-part3a.html#subsec-debug-part3a-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "interactive debugger "
},
{
  "id": "fig-nucleo-power-header",
  "level": "2",
  "url": "subsec-debug-part3a.html#fig-nucleo-power-header",
  "type": "Figure",
  "number": "7.1.4",
  "title": "",
  "body": " The Nucleo power header. NRST sits directly above 3.3V — an easy mis-plug. Breadboard power comes from the 3.3V pin.   "
},
{
  "id": "fig-debug-bug-icon",
  "level": "2",
  "url": "subsec-debug-part3a.html#fig-debug-bug-icon",
  "type": "Figure",
  "number": "7.1.5",
  "title": "",
  "body": " The bug icon (boxed) sits beside the green Run button in the toolbar. Clicking it builds, flashes, and launches the program under the debugger.   "
},
{
  "id": "act-debug-launch",
  "level": "2",
  "url": "subsec-debug-part3a.html#act-debug-launch",
  "type": "Activity",
  "number": "7.1.4",
  "title": "Launch a Debug Session.",
  "body": " Launch a Debug Session   Your Blinky project should be open and built from the start of class. Run it normally once to confirm the on-board LED still blinks.    Click the bug icon in the toolbar (next to the green Run button — the boxed icon in the figure above) to build, flash, and launch under the debugger. When the Confirm perspective switch window appears, accept it.    Check your screen against the debug-perspective screenshot. The layout has changed — this is the debug perspective — and execution is halted at the first statement of main() , highlighted in green. The program is loaded but has not run a single line of your code yet.   "
},
{
  "id": "fig-debug-perspective",
  "level": "2",
  "url": "subsec-debug-part3a.html#fig-debug-perspective",
  "type": "Figure",
  "number": "7.1.6",
  "title": "",
  "body": " The debug perspective, immediately after launch. The editor holds Blinky's main.c with the first statement of main() highlighted in green — loaded, but not yet executed. The tabbed pane on the right is where today happens: SFRs now, Variables in Part 4 (the tab labels truncate on screen to Varia and Break ). One erratum to ignore in this capture: the on-screen comment on the LED_PIN line writes the 1U<<5 mask as 0b…0001 0000 ; it is 0b…0010 0000 .   "
},
{
  "id": "insight-debug-ladder",
  "level": "2",
  "url": "subsec-debug-part3a.html#insight-debug-ladder",
  "type": "Insight",
  "number": "7.1.7",
  "title": "If the Debugger Will Not Launch.",
  "body": " If the Debugger Will Not Launch  Four failure modes cover nearly every stuck launch. Find your symptom and apply the fix — a launch that does not come up on the first try is a normal part of this, not a sign you broke something.   The project will not build. You are likely trying to debug some other code than the known and already working Blinky. Download the known-good blinky.c (also on Canvas, first day), replace the contents of your project's Src\/main.c with it, and build again. If the project still will not build, raise your hand and watch with a neighbor: nothing later in Part 3 requires your own launch, and you can redo this walkthrough from this chapter, step by step, before the next class.  Board not found, or a connection error at launch. Reseat the USB cable, then check the breadboard power wire: 3V3, not the NRST pin above it ( ).  Clicked the wrong button on the perspective popup. Window Perspective Open Perspective Debug brings the debug layout up by hand.  The session behaves strangely, or a second launch fails. A previous debug session is probably still running. Terminate it with the red square first — one debug session at a time .   "
},
{
  "id": "subsec-debug-part3b",
  "level": "1",
  "url": "subsec-debug-part3b.html",
  "type": "Subsection",
  "number": "7.1.5",
  "title": "Part 3b: Watching a Register Change",
  "body": " Part 3b: Watching a Register Change   Your debug session from is halted at the first line of main() — and while it is halted, the debugger can show you every peripheral register on the chip, live. In the pane on the right, select the SFRs tab ( Special Function Registers ). It lists the processor's internals under Cortex_M0PLUS and every peripheral you have met under STM32C031 : ADC, GPIOA, RCC, USART2, and the rest, each expandable down to individual registers and bit fields ( ). These are the same registers, with the same names, as in RM0490 — the SFRs view is the reference manual's register map, animated.   The SFRs tab: the processor's internals under Cortex_M0PLUS, and every peripheral from the reference manual under STM32C031. The x16 \/ x10 \/ x2 buttons switch the value display's radix between base-16 (hexadecimal), base-10 (decimal) and base-2 (binary).    The first statement of main() — highlighted in green, loaded, not yet executed — is one you can recite from Day 1:  RCC->IOPENR |= GPIOAEN; \/\/ Step 1: enable GPIOA clock   Predict, Then Step   In the SFRs tab, expand RCC , then RCC_IOPENR . Write down the current value of the register, and of its bit 0 (the field named GPIOAEN ).    The green-highlighted line is about to run. Write down what you predict RCC_IOPENR will read after it executes — the whole register, not just the bit.    Execute exactly that one line: click Step Over in the toolbar. Check RCC_IOPENR against your prediction.     RCC_IOPENR before and after single-stepping the first line of main() . Left: at launch the register reads 0x0 — GPIOA's clock is off. Right: after one Step Over it reads 0x1, and the GPIOAEN field holds 1. The yellow highlight means this value changed since the debugger last looked. Right after launch the debugger is reading every register for the first time, so many rows glow yellow — ignore that first flush. After a step the highlight becomes useful: only RCC_IOPENR is yellow, the one register the step changed.       That is the whole mechanism, and it is worth pausing on: you wrote RCC->IOPENR |= GPIOAEN; in week one and trusted that it did something. You have now watched it happen , one line, one bit, cause and effect. Every register write in every program this term can be checked the same way.    "
},
{
  "id": "subsec-debug-part3b-2",
  "level": "2",
  "url": "subsec-debug-part3b.html#subsec-debug-part3b-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "SFRs "
},
{
  "id": "fig-debug-sfr-tree",
  "level": "2",
  "url": "subsec-debug-part3b.html#fig-debug-sfr-tree",
  "type": "Figure",
  "number": "7.1.8",
  "title": "",
  "body": " The SFRs tab: the processor's internals under Cortex_M0PLUS, and every peripheral from the reference manual under STM32C031. The x16 \/ x10 \/ x2 buttons switch the value display's radix between base-16 (hexadecimal), base-10 (decimal) and base-2 (binary).   "
},
{
  "id": "act-debug-iopenr",
  "level": "2",
  "url": "subsec-debug-part3b.html#act-debug-iopenr",
  "type": "Activity",
  "number": "7.1.5",
  "title": "Predict, Then Step.",
  "body": " Predict, Then Step   In the SFRs tab, expand RCC , then RCC_IOPENR . Write down the current value of the register, and of its bit 0 (the field named GPIOAEN ).    The green-highlighted line is about to run. Write down what you predict RCC_IOPENR will read after it executes — the whole register, not just the bit.    Execute exactly that one line: click Step Over in the toolbar. Check RCC_IOPENR against your prediction.   "
},
{
  "id": "fig-debug-iopenr",
  "level": "2",
  "url": "subsec-debug-part3b.html#fig-debug-iopenr",
  "type": "Figure",
  "number": "7.1.9",
  "title": "",
  "body": " RCC_IOPENR before and after single-stepping the first line of main() . Left: at launch the register reads 0x0 — GPIOA's clock is off. Right: after one Step Over it reads 0x1, and the GPIOAEN field holds 1. The yellow highlight means this value changed since the debugger last looked. Right after launch the debugger is reading every register for the first time, so many rows glow yellow — ignore that first flush. After a step the highlight becomes useful: only RCC_IOPENR is yellow, the one register the step changed.      "
},
{
  "id": "subsec-debug-part3c",
  "level": "1",
  "url": "subsec-debug-part3c.html",
  "type": "Subsection",
  "number": "7.1.6",
  "title": "Part 3c: The Register That Was Not Zero",
  "body": " Part 3c: The Register That Was Not Zero   Blinky's next two lines — the ones you have not stepped yet ( ) — configure PA5 as an output. Before stepping them, expand GPIOA and look at GPIOA_MODER — and look closely, because the value is a small surprise: 0xEBFFFFFF . Not zero. Nearly every MODE field, including MODE5 for our LED pin, holds 0x3 ( ).   GPIOA_MODER before the two MODER lines run: the register reads 0xEBFFFFFF, and MODE5 — like almost every MODE field — holds 0x3. Why is a register the program has never touched not zero?    Why? This is a question for the reference manual, and it is one you have looked up before: Day 3's activity sent you to RM0490 §6.4.1 for MODER's power-on default. The answer ( ): the reset value is 0xEBFF FFFF for port A and 0xFFFF FFFF for every other port — pins wake up in analog mode ( 11 ), the high-impedance do-nothing state you met when configuring the ADC on Day 7. Today you are watching that sentence of the manual be true on live hardware.  And the EB at the top of port A's value? Two pins do not reset to analog: PA13 and PA14 wake up in alternate-function mode. They are SWDIO and SWCLK — the serial wire debug port. The debugger you are using at this very moment is connected through those two pins, and if they reset to analog like the rest, a fresh chip could never be debugged.   RM0490 §6.4.1, GPIO port mode register (GPIOx_MODER) : reset value 0xEBFF FFFF for port A, 0xFFFF FFFF for the other ports.    Now step through the two MODER lines and watch MODE5 go from 0x3 (analog) to 0x1 (output, ) — and notice it takes both lines to get there: |= (1U<<10) alone would leave 11 as 11 , which is exactly why Blinky clears bit 11 explicitly. Notice also what you just did: you audited a register write — every bit the code claims to set, read back set. This works on any register, in any program.   GPIOA_MODER after stepping both MODER lines: the register reads 0xEBFFF7FF and MODE5 holds 0x1 — PA5 is now an output.       "
},
{
  "id": "fig-debug-moder-before",
  "level": "2",
  "url": "subsec-debug-part3c.html#fig-debug-moder-before",
  "type": "Figure",
  "number": "7.1.10",
  "title": "",
  "body": " GPIOA_MODER before the two MODER lines run: the register reads 0xEBFFFFFF, and MODE5 — like almost every MODE field — holds 0x3. Why is a register the program has never touched not zero?   "
},
{
  "id": "fig-rm-moder-reset",
  "level": "2",
  "url": "subsec-debug-part3c.html#fig-rm-moder-reset",
  "type": "Figure",
  "number": "7.1.11",
  "title": "",
  "body": " RM0490 §6.4.1, GPIO port mode register (GPIOx_MODER) : reset value 0xEBFF FFFF for port A, 0xFFFF FFFF for the other ports.   "
},
{
  "id": "fig-debug-moder-after",
  "level": "2",
  "url": "subsec-debug-part3c.html#fig-debug-moder-after",
  "type": "Figure",
  "number": "7.1.12",
  "title": "",
  "body": " GPIOA_MODER after stepping both MODER lines: the register reads 0xEBFFF7FF and MODE5 holds 0x1 — PA5 is now an output.   "
},
{
  "id": "subsec-debug-part3d",
  "level": "1",
  "url": "subsec-debug-part3d.html",
  "type": "Subsection",
  "number": "7.1.7",
  "title": "Part 3d: Breakpoints",
  "body": " Part 3d: Breakpoints   Single-stepping is precise but slow — you would not step your way through a whole program, and you must not step your way into Blinky's delay loop. A breakpoint turns the relationship around: instead of walking the program line by line, you mark a line of interest and let the program run at full speed until it gets there. Setting two of them ( ) and watching GPIOA_ODR at each stop ( ) is the exercise below.   Run Between Two Breakpoints   Find the thin margin strip at the left edge of the code window. Right-click it beside the line that turns the LED on ( GPIOA->ODR |= LED_PIN; ) and choose Add Breakpoint . Do the same beside the line that turns the LED off. A small marker appears beside each.    Click Resume . The delay loop executes at full speed and the program suspends at the next breakpoint. Click Resume a few more times, watching two things at each stop: the on-board LED, and OD5 inside GPIOA_ODR in the SFRs view.    At each stop, check: does the LED's state agree with OD5 ? You are hopping the program between its two visible states, with the register view and the hardware in lockstep.     Two breakpoints set in the left margin, on the LED-on and LED-off lines of Blinky's loop. Each Resume runs the delay loop at full speed and suspends at the next marked line.     GPIOA_ODR at the two breakpoints. Left: 0x0 with OD5 = 0 — the LED is off. Right: 0x20 with OD5 = 1 — the LED is on. The register view and the physical LED change together.       If you do find yourself trapped mid-delay-loop — it happens — do not click your way out. Use Terminate and Relaunch to start the session fresh, or Reset the chip and restart execution ; both are on the toolbar ( has the full icon reference).    "
},
{
  "id": "subsec-debug-part3d-2",
  "level": "2",
  "url": "subsec-debug-part3d.html#subsec-debug-part3d-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "breakpoint "
},
{
  "id": "act-debug-breakpoints",
  "level": "2",
  "url": "subsec-debug-part3d.html#act-debug-breakpoints",
  "type": "Activity",
  "number": "7.1.6",
  "title": "Run Between Two Breakpoints.",
  "body": " Run Between Two Breakpoints   Find the thin margin strip at the left edge of the code window. Right-click it beside the line that turns the LED on ( GPIOA->ODR |= LED_PIN; ) and choose Add Breakpoint . Do the same beside the line that turns the LED off. A small marker appears beside each.    Click Resume . The delay loop executes at full speed and the program suspends at the next breakpoint. Click Resume a few more times, watching two things at each stop: the on-board LED, and OD5 inside GPIOA_ODR in the SFRs view.    At each stop, check: does the LED's state agree with OD5 ? You are hopping the program between its two visible states, with the register view and the hardware in lockstep.   "
},
{
  "id": "fig-debug-breakpoints",
  "level": "2",
  "url": "subsec-debug-part3d.html#fig-debug-breakpoints",
  "type": "Figure",
  "number": "7.1.13",
  "title": "",
  "body": " Two breakpoints set in the left margin, on the LED-on and LED-off lines of Blinky's loop. Each Resume runs the delay loop at full speed and suspends at the next marked line.   "
},
{
  "id": "fig-debug-odr",
  "level": "2",
  "url": "subsec-debug-part3d.html#fig-debug-odr",
  "type": "Figure",
  "number": "7.1.14",
  "title": "",
  "body": " GPIOA_ODR at the two breakpoints. Left: 0x0 with OD5 = 0 — the LED is off. Right: 0x20 with OD5 = 1 — the LED is on. The register view and the physical LED change together.      "
},
{
  "id": "subsec-debug-part4",
  "level": "1",
  "url": "subsec-debug-part4.html",
  "type": "Subsection",
  "number": "7.1.8",
  "title": "Part 4: Watching a Variable Change",
  "body": " Part 4: Watching a Variable Change   Registers are half the story; the debugger watches your C variables just as easily, in the Variables tab of the same right-hand pane. The program is Day 5's keyboard-controlled counter, whose receive path polls the RXNE flag and reads the character register only when a byte has arrived:  while (1) { if (USART2->ISR & USART_ISR_RXNE_RXFNE) { char key = USART2->RDR & 0xFF; \/\/ <-- breakpoint goes here if (key == 'u' || key == 'U') count++; else if (key == 'd' || key == 'D') count--; else if (key == 'r' || key == 'R') count = 0; } printf(\"count = %d\\r\\n\", count); delay_ms(500); }  A breakpoint on the marked line is a small piece of cleverness: that line is only reached when the RXNE test succeeds. So the program runs free — printing count twice a second — until the moment a key is pressed in CoolTerm, and then it halts with the fresh byte one step away. A breakpoint placed inside an if means break when this happens .   Predict the Value, Then Press the Key   Terminate the Blinky session (red square), open your keyboard-counter project from Day 5, and launch it under the debugger. Open CoolTerm as usual, set a breakpoint on the marked line, and click Resume — the counter prints away, and the breakpoint waits.    Before pressing anything: write down the decimal value you expect the variable key to hold after the marked line executes when you press u . Anchor: 'a' is 97, and the lowercase letters run in order.    Now press u in CoolTerm. The program halts at the breakpoint; click Step Over once to execute the read, and check key in the Variables tab against your prediction. Then find USART_RDR in the SFRs view.    What you'll see on screen: after the keypress lands and one Step Over executes the read, the Variables tab shows key holding 117 — and the SFRs view shows USART_RDR holding 0x75 ( ). Same byte, three names: the character 'u' , the decimal 117, the hex 0x75. The Variables tab and the SFRs tab are two windows onto the one machine.   The same keypress in two views. Left: the Variables tab after stepping the read — key holds 117 (this capture is from a counter variant whose key is an int and whose count is an int8_t named counter ; the values, not the names or types, are the point). Both rows glow yellow here — the debugger has just refreshed them — so read the values, not the colors: key is the one that changed. Right: USART2's receive data register USART_RDR in the SFRs view holds 0x75. 117 and 0x75 are the same number — the ASCII code for 'u' .          "
},
{
  "id": "subsec-debug-part4-2",
  "level": "2",
  "url": "subsec-debug-part4.html#subsec-debug-part4-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Variables "
},
{
  "id": "act-debug-ascii-predict",
  "level": "2",
  "url": "subsec-debug-part4.html#act-debug-ascii-predict",
  "type": "Activity",
  "number": "7.1.7",
  "title": "Predict the Value, Then Press the Key.",
  "body": " Predict the Value, Then Press the Key   Terminate the Blinky session (red square), open your keyboard-counter project from Day 5, and launch it under the debugger. Open CoolTerm as usual, set a breakpoint on the marked line, and click Resume — the counter prints away, and the breakpoint waits.    Before pressing anything: write down the decimal value you expect the variable key to hold after the marked line executes when you press u . Anchor: 'a' is 97, and the lowercase letters run in order.    Now press u in CoolTerm. The program halts at the breakpoint; click Step Over once to execute the read, and check key in the Variables tab against your prediction. Then find USART_RDR in the SFRs view.   "
},
{
  "id": "fig-debug-variables",
  "level": "2",
  "url": "subsec-debug-part4.html#fig-debug-variables",
  "type": "Figure",
  "number": "7.1.15",
  "title": "",
  "body": " The same keypress in two views. Left: the Variables tab after stepping the read — key holds 117 (this capture is from a counter variant whose key is an int and whose count is an int8_t named counter ; the values, not the names or types, are the point). Both rows glow yellow here — the debugger has just refreshed them — so read the values, not the colors: key is the one that changed. Right: USART2's receive data register USART_RDR in the SFRs view holds 0x75. 117 and 0x75 are the same number — the ASCII code for 'u' .      "
},
{
  "id": "subsec-debug-part5",
  "level": "1",
  "url": "subsec-debug-part5.html",
  "type": "Subsection",
  "number": "7.1.9",
  "title": "Part 5: Choosing the Right Tool",
  "body": " Part 5: Choosing the Right Tool   You now carry a toolbox rather than a tool. The day's map, by symptom:   Which tool, when    Symptom  Reach for    Will not build  Compiler messages: top down, read up    Runs, but a value is wrong or missing  printf placed to answer one question    Need to see a register or step a line  Debugger: SFRs, stepping, breakpoints    Suspect the circuit, not the code  DMM and AD2 — checklist in the Reference section     One honest limitation to file away: a breakpoint stops the processor , so anything that depends on real-time behavior stops with it — a paused chip cannot blink, sample, or keep time. For timing questions, the oscilloscope watches without pausing. There is more to say about that when interrupts arrive.  And one more thing these four moves are for: checking code you did not write — including code an AI tool drafted for you. The course policy ( ) asks you to be able to explain every line you submit; the compiler's report, a well-placed printf , and a register audit in the debugger are the tooling that lets you find out whether you can.  You can now apply all of this in Lab 4. And if the launch never worked for you today: every step and screenshot of the walkthrough is in this chapter. Redo it on your own before the next class, and ask for help if it still will not connect.   Stretch: Debug Your Actual Lab   Finished the walkthrough with time to spare? Point the same four moves at the program you actually care about.    Launch your ADCPot.c under the debugger. Set a breakpoint on the line after the EOC wait, and watch ADC_DR in the SFRs view while you turn the potentiometer between stops.    Then audit your own initialization: halt after pa0_adc_init() and check ADC_CHSELR and ADC_CR against what your code claims to have written. Does every bit you set actually read back set?     "
},
{
  "id": "table-debug-tool-map",
  "level": "2",
  "url": "subsec-debug-part5.html#table-debug-tool-map",
  "type": "Table",
  "number": "7.1.16",
  "title": "Which tool, when",
  "body": " Which tool, when    Symptom  Reach for    Will not build  Compiler messages: top down, read up    Runs, but a value is wrong or missing  printf placed to answer one question    Need to see a register or step a line  Debugger: SFRs, stepping, breakpoints    Suspect the circuit, not the code  DMM and AD2 — checklist in the Reference section    "
},
{
  "id": "act-debug-stretch",
  "level": "2",
  "url": "subsec-debug-part5.html#act-debug-stretch",
  "type": "Activity",
  "number": "7.1.8",
  "title": "Stretch: Debug Your Actual Lab.",
  "body": " Stretch: Debug Your Actual Lab   Finished the walkthrough with time to spare? Point the same four moves at the program you actually care about.    Launch your ADCPot.c under the debugger. Set a breakpoint on the line after the EOC wait, and watch ADC_DR in the SFRs view while you turn the potentiometer between stops.    Then audit your own initialization: halt after pa0_adc_init() and check ADC_CHSELR and ADC_CR against what your code claims to have written. Does every bit you set actually read back set?   "
},
{
  "id": "subsec-debug-method",
  "level": "1",
  "url": "subsec-debug-method.html",
  "type": "Subsection",
  "number": "7.2.1",
  "title": "The Scientific Debugging Method",
  "body": " The Scientific Debugging Method  Effective debugging is a scientific process, not a random walk. Five moves, in order:   Reproduce the problem reliably. A bug you cannot reproduce is almost impossible to fix. Note the exact inputs, conditions, and sequence that trigger it.  Form a specific hypothesis.  Something is wrong with the ADC is not a hypothesis; the ADC clock is never enabled, so the data register always reads zero is — it names a cause you can test.  Change one thing at a time. If you change five things and the bug disappears, you do not know which change mattered — the root cause is still unknown, and the bug is free to return.  Bisect. Confirm the program is healthy at its midpoint (a printf , a breakpoint), then narrow to the half that contains the fault. Each test halves the search.  Keep notes. Past a few minutes of stuck, write down what you tried and what you observed. It prevents re-testing the same idea, and it is exactly what a TA or instructor will ask you for.   "
},
{
  "id": "subsec-debug-prevention",
  "level": "1",
  "url": "subsec-debug-prevention.html",
  "type": "Subsection",
  "number": "7.2.2",
  "title": "Preventing Bugs",
  "body": " Preventing Bugs  The cheapest bug is the one that never happens. Practices that measurably lower the rate:   Plan the design on paper — block diagrams, pseudocode, state diagrams — before writing code.  Use the file header to record what the file is, the hardware it expects, and its history.  Write in small chunks and test as you go.  Strive for readable code, with descriptive names.  Use functions — a good function has one clear objective: set up the UART , get a value from the ADC .  Comment as you go, to narrate your process and leave notes for the next person.  Use named constants ( const or #define ) rather than literal magic numbers .  Delete commented-out code from the final version.   One loop-shaped habit belongs on this list. Use for when the number of iterations is known in advance — for (i = 0; i < N; i++) — and while (or do ... while ) when it is not. C does allow break to exit a for loop early, but reaching for it is often a sign the loop wants to be a while instead.  "
},
{
  "id": "subsec-debug-hardware",
  "level": "1",
  "url": "subsec-debug-hardware.html",
  "type": "Subsection",
  "number": "7.2.3",
  "title": "The Hardware Checklist",
  "body": " The Hardware Checklist  When the circuit is suspect, check the wiring before applying power:   Power and ground connected to the correct pins on every device? (On the Nucleo: 3V3, not the NRST pin beside it.)  Bypass capacitors installed?  LED polarity correct?  Wires pushed into the breadboard all the way?  Does each wire begin and end where the circuit diagram says it should?   If — and only if — the wiring checks out, apply power. Remove power again before making changes. Then measure rather than assume, with the DMM and the AD2 oscilloscope from Day 3:   Is each chip getting power? Measure at the chip's own pins, not at the rail.  Do the UART signals look right on the scope?  Are sensor outputs in the range the datasheet promises?   The AD2 has one more debugging capability that returns in later chapters: its logic analyzer can decode digital protocols, displaying the actual bytes on a UART or I2C line alongside the waveform.  "
},
{
  "id": "subsec-debug-printf-patterns",
  "level": "1",
  "url": "subsec-debug-printf-patterns.html",
  "type": "Subsection",
  "number": "7.2.4",
  "title": "Diagnostic printf Patterns",
  "body": " Diagnostic printf Patterns  The three diagnostic questions from class, as copy-ready patterns (format specifiers are Day 5 material; the full table lives in ):  \/* Did execution reach this point? *\/ printf(\"pa0_adc_init: entered\\r\\n\"); printf(\"made it past the config loop\\r\\n\"); \/* Is this value reasonable? (decimal and hex of the same value) *\/ printf(\"ADC value: %u\\t0x%x\\r\\n\", value, value); \/* Does actual match expected? Print them side by side. *\/ printf(\"count = %d (expect 0..4095)\\r\\n\", count); \/* What does that I\/O register actually hold? 32-bit needs %08lx. *\/ printf(\"GPIOA->ODR = 0x%08lx\\r\\n\", GPIOA->ODR);   Remember from Day 5: every line ends in \\r\\n ; a 16-bit value prints with %x , a 32-bit register with %08lx . Floating-point printf is off by default in the course library; Lab 4 Appendix A shows the one project setting that enables it. Even then, prefer scaling to an integer and printing %d : the STM32C031C6 has no floating point hardware, so every float operation is emulated in software. Remove diagnostic prints once the bug is fixed.  "
},
{
  "id": "subsec-debug-controls",
  "level": "1",
  "url": "subsec-debug-controls.html",
  "type": "Subsection",
  "number": "7.2.5",
  "title": "Debugger Controls",
  "body": " Debugger Controls  The debug toolbar's icons, in one place ( ). The three used constantly: Resume (run to the next breakpoint), Step Over (execute one line, without descending into function calls), and Terminate (end the session). Step Into descends into a called function; Terminate and Relaunch and Reset the chip and restart execution are the two escape hatches when a session goes sideways.   The main debugger control icons in STM32CubeIDE: resume, halt, the three step variants (into \/ over \/ out), C-versus-instruction stepping, reset-and-restart, terminate, and terminate-and-relaunch.    Two habits keep sessions healthy. Run one debug session at a time — most of the debugger's mysterious misbehavior traces to a previous session left running; terminate before you relaunch. And never single-step into a long software delay loop; if you land in one, Terminate and Relaunch is faster than clicking your way out.  "
},
{
  "id": "fig-debug-controls",
  "level": "2",
  "url": "subsec-debug-controls.html#fig-debug-controls",
  "type": "Figure",
  "number": "7.2.1",
  "title": "",
  "body": " The main debugger control icons in STM32CubeIDE: resume, halt, the three step variants (into \/ over \/ out), C-versus-instruction stepping, reset-and-restart, terminate, and terminate-and-relaunch.   "
},
{
  "id": "subsec-debug-tools",
  "level": "1",
  "url": "subsec-debug-tools.html",
  "type": "Subsection",
  "number": "7.2.6",
  "title": "The Three Tools, Side by Side",
  "body": " The Three Tools, Side by Side  Each of the course's three debugging tools sees something the others cannot:   Diagnostic printf — works at the level of your C code, needs only the UART, and leaves a written trail. Its blind spot: it cannot debug the path that makes printf itself work, and each call costs tens of milliseconds at the course's 9600 baud — a 20-character line is about 21 ms.  The interactive debugger — sees every register and variable, needs no working UART, and steps cause to effect one line at a time. Its blind spot: a halted chip is not running in real time, so time-dependent behavior changes the moment you pause it.  The DMM and AD2 — see the actual volts, which no amount of software can misreport, and they keep watching while the program runs at full speed. Their blind spot: they cannot see why — the code's intent lives in the other two tools.   A common full workflow: the scope confirms the hardware is doing what it should; printf narrows which section of code is at fault; the debugger pins the exact register or variable where expectation and reality part ways.  "
},
{
  "id": "subsec-cost-of-waiting",
  "level": "1",
  "url": "subsec-cost-of-waiting.html",
  "type": "Subsection",
  "number": "8.1.1",
  "title": "The Cost of Waiting",
  "body": " The Cost of Waiting  Waiting has been built into every program in this course so far. On Day 1 the delay was a busy-wait loop — a for loop that burned processor cycles doing nothing — and on Day 2 you replaced it with the course's delay_ms() , which fixed the busy-wait's imprecision ( ). What delay_ms() did not fix is that the CPU can do nothing else while it runs: the processor is committed to the delay for its whole duration. A program that calls delay_ms(1000) is unresponsive for one full second.  You have felt this cost. In the Lab 2 button-race game, the countdown flashes were produced by delays — and while the code sat inside a delay, it could not watch the buttons, so a press during the countdown could slip past unregistered. The polling loops of Days 3 and 4 have the mirror-image problem: the CPU is fully awake, but it spends its time asking anything yet? over and over, and every additional job added to the loop makes every other job's response slower.  What we actually want is to separate keeping time from doing work . Let a dedicated piece of hardware count the milliseconds; let the CPU compute, print, and respond; and give the hardware a way to tell the CPU when the time has come. The first half of that bargain is the hardware timer.  "
},
{
  "id": "subsec-cost-of-waiting-2",
  "level": "2",
  "url": "subsec-cost-of-waiting.html#subsec-cost-of-waiting-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "busy-wait loop "
},
{
  "id": "subsec-timer-hardware",
  "level": "1",
  "url": "subsec-timer-hardware.html",
  "type": "Subsection",
  "number": "8.1.2",
  "title": "A Circuit Whose Whole Job Is Counting",
  "body": " A Circuit Whose Whole Job Is Counting  A hardware timer is a small digital circuit inside the STM32C031C6, separate from the CPU, built around one job: counting clock pulses. At its core ( ) it is a register that stores the current count and an adder that increments it; on each tick of its input clock, the stored count is replaced by the count plus one. Once started, it counts whether the CPU is computing, sitting in a delay, or doing nothing at all. The timer (also called counter) needs no attention to keep running: it runs entirely in hardware.   The core of a counter: a register holds the current count ; multiplexers select the next value — one more than the current count, or 0 to restart. (The general circuit can also count down; our timers count up.) The register updates on the rising edge of its clock. The slash marks indicate multi-wire (bus) connections.    The STM32C031C6 has five of these timers — TIM1, TIM3, TIM14, TIM16, and TIM17 — all built around 16-bit counters, each independently configurable. They range from simple to elaborate: TIM14 is the simplest, and it is the one this chapter uses. All five — TIM14 included — can also measure the width of input pulses and generate output waveforms such as PWM with no CPU involvement; those abilities return in the motor chapters.  Two registers turn a bare counter into a programmable timer. The prescaler (PSC) divides the timer's input clock down to a chosen counting rate. The auto-reload register (ARR) holds the count at which the timer wraps: the counter (CNT) runs 0, 1, 2, up to the auto-reload value, then resets to 0 and signals that a period has elapsed. That signal is called the update event . Rate, range, wrap — that is the whole machine. (The chip's full block diagram, with much more bolted around this core, is in when you want it.)  The update event leaves a footprint your code can see: the hardware sets the update interrupt flag (UIF), a bit in the timer's status register TIM14_SR. The division of labor mirrors what you saw with the ADC on Day 7: the hardware sets the flag; noticing it — and then clearing it so the next period can be seen — is your code's job.  If you have used Arduino's millis() , one adjustment before going on: millis() reads a free-running counter fed by a timer you never configured. This chapter hands you exactly what millis() hides — choosing the count rate, noticing the wrap, and clearing the flag yourself.  "
},
{
  "id": "subsec-timer-hardware-2",
  "level": "2",
  "url": "subsec-timer-hardware.html#subsec-timer-hardware-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "hardware timer "
},
{
  "id": "fig-counter-block",
  "level": "2",
  "url": "subsec-timer-hardware.html#fig-counter-block",
  "type": "Figure",
  "number": "8.1.1",
  "title": "",
  "body": " The core of a counter: a register holds the current count ; multiplexers select the next value — one more than the current count, or 0 to restart. (The general circuit can also count down; our timers count up.) The register updates on the rising edge of its clock. The slash marks indicate multi-wire (bus) connections.   "
},
{
  "id": "subsec-timer-hardware-5",
  "level": "2",
  "url": "subsec-timer-hardware.html#subsec-timer-hardware-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "prescaler auto-reload register update event "
},
{
  "id": "subsec-timer-hardware-6",
  "level": "2",
  "url": "subsec-timer-hardware.html#subsec-timer-hardware-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "update interrupt flag "
},
{
  "id": "subsec-timer-arithmetic",
  "level": "1",
  "url": "subsec-timer-arithmetic.html",
  "type": "Subsection",
  "number": "8.1.3",
  "title": "How Fast and How Far to Count",
  "body": " How Fast and How Far to Count  Configuring a timer means answering two questions: how fast should it count, and how far? You do not program the timer with an amount of time — you program it with a counting rate (via the prescaler) and how far to count (via the auto-reload value), and the time period follows from the arithmetic.  Start from the clock. The STM32C031C6 runs at MHz, so a desired waiting period converts to a number of clock cycles you need to count through to get that wait as . A one-second period is cycles — and there is the problem: the counter and the auto-reload register are 16 bits wide, so each holds distinct values, numbered 0 through 65,535. Twelve million does not fit into a 16-bit register.  The prescaler is the fix. It sits between the clock and the counter and divides the clock rate by any integer from 1 to 65,536, so the counter can count slower instead of farther . For example, with the prescaler dividing by 12,000, the counter ticks at ticks per second — one tick per millisecond — and one second is a count of just 1000, which fits easily. The waiting period comes from the product: .  One convention will trip you if you are not warned: both registers are written as the desired value minus one since both start counting from zero (the prescaler works by counting also). The prescaler divides by , and the counter counts from 0 to ARR inclusive — 0 through 499 is 500 ticks. So a divide-by-12,000 prescale is written as PSC=11999 , and a count of 1000 is written as ARR=999 . The worked example, in full:   One update event per second, from a 12 MHz clock: write , so the counter ticks at 1 kHz; write , so the counter wraps every 1000 ticks. Check: cycles — exactly one second. Exactly, that is, in counts : the 12 MHz clock derives from the chip's HSI48 RC oscillator, which the datasheet (Table 41) specifies at 47.92 to 48.40 MHz over temperature, so the arithmetic is exact and the second itself is good to about one percent.  One more thing to bring: the prescaler gives you freedom. Many (prescale, count) pairs produce the same period, as long as the product is right and both values fit in 16 bits. In class you will choose among such pairs for a different period — and walk the hardware's own timing diagram step by step — so bring the arithmetic, not just the answer.  "
},
{
  "id": "subsec-interrupt-idea",
  "level": "1",
  "url": "subsec-interrupt-idea.html",
  "type": "Subsection",
  "number": "8.1.4",
  "title": "The Idea of an Interrupt",
  "body": " The Idea of an Interrupt  A timer counting on its own solves half the problem. The other half is delivery: how does the CPU learn that the period has elapsed, without sitting in a loop asking? Consider two ways of handling a question you have sent your instructor by email. You could stare at your inbox until the reply arrives — that is a blocking wait. You could check your inbox after every paragraph of work — that is polling, and both of these cost you attention. Or you could simply keep working until your mail program pings you. The ping is the interrupt, and the whole point is what it lets you do the rest of the time.  Here is the idea. An interrupt is a signal from a piece of hardware — a timer, a button's pin, the UART — that makes the CPU pause what it is doing, run a function you wrote, and then resume exactly where it left off, as if nothing had happened. The function has a name of its own: an Interrupt Service Routine , or ISR. The interruption can land between any two instructions — even in the middle of delay_ms() — and that is precisely what makes it powerful: your main program no longer has to watch for anything. The hardware watches; your ISR responds; main() works.  One caution about the acronym. Since Day 5 you have used ISR for a peripheral's interrupt and status register — USART2->ISR , ADC1->ISR . The Interrupt Service Routine is a different thing using the same acronym: not a register but a function you write. In class you will also hear handler for the function, which is unambiguous.  Two habits follow from the idea, and class makes them concrete. Because an ISR borrows the CPU from your main program, it must be quick — do the minimum and get out. And because the hardware, not your code, is the caller, hooking an ISR up means telling the hardware about it — which is most of what Day 8's class hour builds. How the machinery works — what the CPU saves, how it finds your function, and why shared variables need a keyword called volatile — is the pre-class video ; the written version lives in and for revisiting.  "
},
{
  "id": "subsec-interrupt-idea-3",
  "level": "2",
  "url": "subsec-interrupt-idea.html#subsec-interrupt-idea-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "interrupt Interrupt Service Routine "
},
{
  "id": "subsec-interrupt-idea-5",
  "level": "2",
  "url": "subsec-interrupt-idea.html#subsec-interrupt-idea-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "pre-class video "
},
{
  "id": "rq-timers-interrupts",
  "level": "1",
  "url": "rq-timers-interrupts.html",
  "type": "Check Your Understanding",
  "number": "8.1.5",
  "title": "Check Your Understanding",
  "body": "  On Day 1 you produced a delay with a busy-wait loop, tuned so that it takes approximately 10 ms with the 12 MHz clock. The clock is later changed to 48 MHz. What happens to the delay?    It shrinks to approximately 2.5 ms — four times shorter — because the same number of iterations now executes four times faster.  Correct. A busy-wait delay is tied to the clock speed. A hardware timer's period comes from a programmed prescaler and count, so it is set deliberately rather than inherited from however fast the loop happens to run.    It stays at 10 ms because the compiler adjusts the loop count for the new clock.  The compiler has no idea the loop is meant to be a delay — it just generates instructions. Nothing adjusts the iteration count when the clock changes.    It grows to approximately 40 ms because a faster clock consumes more power and slows execution.  A faster clock makes the CPU run faster, not slower — the same iterations complete in less time, so the delay gets shorter.    It is unchanged because loops take the same wall-clock time regardless of clock speed.  Loop iterations are made of instructions, and instructions execute at the clock rate. Quadruple the clock and the same loop finishes in a quarter of the time.      A timer's input clock runs at 1 MHz after prescaling. The auto-reload register (ARR) is set to 499. How often does the timer generate an update event?    Every 500 µs — the counter increments every 1 µs and wraps after 500 ticks (0 through 499).  Correct. The counter counts 0, 1, 2, 499, then wraps — 500 ticks at 1 µs each, so 500 µs per period. The written value is always the desired count minus one.    Every 499 µs — the counter counts from 1 to 499.  The counter starts at 0 and counts to ARR inclusive : that is ARR + 1 = 500 ticks per period, not 499.    Every 1 ms — the timer always generates events at 1 kHz regardless of ARR.  The event rate depends on both the prescaled clock and ARR. Here 500 ticks at 1 MHz give 500 µs.    Every 1 µs — the timer fires on every clock tick.  The update event fires only when the counter wraps at ARR. With ARR = 499 that is once per 500 ticks — 500 µs.      A program must keep a display updating smoothly and also react to a sensor event that occurs at unpredictable times. Compared with polling the sensor's status flag in the main loop, what does using an interrupt change?    The hardware notifies the CPU when the event occurs, so the main loop spends no time checking for it; the ISR runs briefly, then the main program resumes where it left off.  Correct. The responsibility to notify moves from the software (asking repeatedly) to the hardware (announcing once). The saved cycles can go to real work — or the CPU can sleep, which is how battery-powered devices live for months.    The ISR runs at the same time as the main loop, on separate hardware, so the program does two things at once.  The STM32C031C6 has one Cortex-M0+ core. An ISR does not run beside the main program — it suspends it, runs, and returns. The gain is that the suspension happens only when the event actually occurs.    The sensor event itself is detected by the hardware sooner, so the event happens earlier.  An interrupt changes how the CPU finds out about the event, not when the event occurs. What improves is the response — the CPU no longer waits until its next trip around the polling loop.    The event flag no longer needs to be cleared, because the interrupt consumes it automatically.  The flag still must be cleared — in the ISR itself — or the interrupt fires again the moment the ISR returns. Interrupts change who notices the flag, not whose job it is to lower it.      Why should an Interrupt Service Routine be kept as short as possible?    While the ISR runs, the main program is suspended and other interrupts can be kept waiting; a slow ISR delays everything else the system must do.  Correct. The standard pattern is to set a volatile flag in the ISR and let the main loop do the time-consuming work when it sees the flag.    ISRs have a hardware-enforced maximum execution time and are terminated if they exceed it.  The Cortex-M0+ imposes no time limit on an ISR. An ISR that never returns simply hangs the rest of the program — nothing terminates it.    Long ISRs overflow the CPU's register save area and corrupt the main program's state.  The state saved at interrupt entry is restored at exit regardless of how long the ISR ran. The cost of a long ISR is blocked responsiveness, not corruption.    The compiler cannot optimize code inside an ISR, so long ISRs waste memory.  The compiler optimizes ISR code like any other (subject to volatile on shared variables). The reason to keep ISRs short is responsiveness.      A global variable uint8_t count is incremented in an ISR and printed in main() . The program prints 0 forever even though the ISR really does run every second. What is the most likely cause?    count is not declared volatile , so the compiler assumes it never changes inside main() 's loop and does not re-read it from memory.  Correct. The ISR's write happens outside the compiler's view of the loop. volatile tells the compiler to fetch the value fresh at every use.    The ISR's name is misspelled.  A misspelled handler name would mean your function is never wired into the vector table and so never runs at all — but the problem states the ISR runs every second.    The interrupt was never enabled in the NVIC.  With the NVIC line disabled the ISR would never run — but the problem states it runs.    The timer's prescaler is set incorrectly.  A wrong prescaler changes how often the ISR runs, not whether main() can see the variable it updates.     "
},
{
  "id": "rq-busywait-clock",
  "level": "2",
  "url": "rq-timers-interrupts.html#rq-busywait-clock",
  "type": "Reading Question",
  "number": "8.1.5.1",
  "title": "",
  "body": " On Day 1 you produced a delay with a busy-wait loop, tuned so that it takes approximately 10 ms with the 12 MHz clock. The clock is later changed to 48 MHz. What happens to the delay?    It shrinks to approximately 2.5 ms — four times shorter — because the same number of iterations now executes four times faster.  Correct. A busy-wait delay is tied to the clock speed. A hardware timer's period comes from a programmed prescaler and count, so it is set deliberately rather than inherited from however fast the loop happens to run.    It stays at 10 ms because the compiler adjusts the loop count for the new clock.  The compiler has no idea the loop is meant to be a delay — it just generates instructions. Nothing adjusts the iteration count when the clock changes.    It grows to approximately 40 ms because a faster clock consumes more power and slows execution.  A faster clock makes the CPU run faster, not slower — the same iterations complete in less time, so the delay gets shorter.    It is unchanged because loops take the same wall-clock time regardless of clock speed.  Loop iterations are made of instructions, and instructions execute at the clock rate. Quadruple the clock and the same loop finishes in a quarter of the time.    "
},
{
  "id": "rq-timer-period",
  "level": "2",
  "url": "rq-timers-interrupts.html#rq-timer-period",
  "type": "Reading Question",
  "number": "8.1.5.2",
  "title": "",
  "body": " A timer's input clock runs at 1 MHz after prescaling. The auto-reload register (ARR) is set to 499. How often does the timer generate an update event?    Every 500 µs — the counter increments every 1 µs and wraps after 500 ticks (0 through 499).  Correct. The counter counts 0, 1, 2, 499, then wraps — 500 ticks at 1 µs each, so 500 µs per period. The written value is always the desired count minus one.    Every 499 µs — the counter counts from 1 to 499.  The counter starts at 0 and counts to ARR inclusive : that is ARR + 1 = 500 ticks per period, not 499.    Every 1 ms — the timer always generates events at 1 kHz regardless of ARR.  The event rate depends on both the prescaled clock and ARR. Here 500 ticks at 1 MHz give 500 µs.    Every 1 µs — the timer fires on every clock tick.  The update event fires only when the counter wraps at ARR. With ARR = 499 that is once per 500 ticks — 500 µs.    "
},
{
  "id": "rq-interrupt-vs-polling",
  "level": "2",
  "url": "rq-timers-interrupts.html#rq-interrupt-vs-polling",
  "type": "Reading Question",
  "number": "8.1.5.3",
  "title": "",
  "body": " A program must keep a display updating smoothly and also react to a sensor event that occurs at unpredictable times. Compared with polling the sensor's status flag in the main loop, what does using an interrupt change?    The hardware notifies the CPU when the event occurs, so the main loop spends no time checking for it; the ISR runs briefly, then the main program resumes where it left off.  Correct. The responsibility to notify moves from the software (asking repeatedly) to the hardware (announcing once). The saved cycles can go to real work — or the CPU can sleep, which is how battery-powered devices live for months.    The ISR runs at the same time as the main loop, on separate hardware, so the program does two things at once.  The STM32C031C6 has one Cortex-M0+ core. An ISR does not run beside the main program — it suspends it, runs, and returns. The gain is that the suspension happens only when the event actually occurs.    The sensor event itself is detected by the hardware sooner, so the event happens earlier.  An interrupt changes how the CPU finds out about the event, not when the event occurs. What improves is the response — the CPU no longer waits until its next trip around the polling loop.    The event flag no longer needs to be cleared, because the interrupt consumes it automatically.  The flag still must be cleared — in the ISR itself — or the interrupt fires again the moment the ISR returns. Interrupts change who notices the flag, not whose job it is to lower it.    "
},
{
  "id": "rq-isr-short",
  "level": "2",
  "url": "rq-timers-interrupts.html#rq-isr-short",
  "type": "Reading Question",
  "number": "8.1.5.4",
  "title": "",
  "body": " Why should an Interrupt Service Routine be kept as short as possible?    While the ISR runs, the main program is suspended and other interrupts can be kept waiting; a slow ISR delays everything else the system must do.  Correct. The standard pattern is to set a volatile flag in the ISR and let the main loop do the time-consuming work when it sees the flag.    ISRs have a hardware-enforced maximum execution time and are terminated if they exceed it.  The Cortex-M0+ imposes no time limit on an ISR. An ISR that never returns simply hangs the rest of the program — nothing terminates it.    Long ISRs overflow the CPU's register save area and corrupt the main program's state.  The state saved at interrupt entry is restored at exit regardless of how long the ISR ran. The cost of a long ISR is blocked responsiveness, not corruption.    The compiler cannot optimize code inside an ISR, so long ISRs waste memory.  The compiler optimizes ISR code like any other (subject to volatile on shared variables). The reason to keep ISRs short is responsiveness.    "
},
{
  "id": "rq-volatile",
  "level": "2",
  "url": "rq-timers-interrupts.html#rq-volatile",
  "type": "Reading Question",
  "number": "8.1.5.5",
  "title": "",
  "body": " A global variable uint8_t count is incremented in an ISR and printed in main() . The program prints 0 forever even though the ISR really does run every second. What is the most likely cause?    count is not declared volatile , so the compiler assumes it never changes inside main() 's loop and does not re-read it from memory.  Correct. The ISR's write happens outside the compiler's view of the loop. volatile tells the compiler to fetch the value fresh at every use.    The ISR's name is misspelled.  A misspelled handler name would mean your function is never wired into the vector table and so never runs at all — but the problem states the ISR runs every second.    The interrupt was never enabled in the NVIC.  With the NVIC line disabled the ISR would never run — but the problem states it runs.    The timer's prescaler is set incorrectly.  A wrong prescaler changes how often the ISR runs, not whether main() can see the variable it updates.    "
},
{
  "id": "subsec-day8-why",
  "level": "1",
  "url": "subsec-day8-why.html",
  "type": "Subsection",
  "number": "8.2.1",
  "title": "Part 1: Why a Background Timer",
  "body": " Part 1: Why a Background Timer  While ADCPot.c sits in its delay_ms(1000) , the CPU idles through 12,000 clock cycles every millisecond. You noticed the same thing in the Lab 2 race game: button presses during the countdown delays could slip past unwatched. A timer that counts in hardware turns the relationship around: timekeeping costs the CPU nothing, and the CPU's whole attention is available for work — sampling a sensor at fixed intervals, timestamping events, running a control loop at a steady rate. We'll come back to these timers in two weeks: they'll hold output pins high for precisely controlled durations — that is how motors get their speed commands — and measure how long input pulses last.   "
},
{
  "id": "subsec-day8-design",
  "level": "1",
  "url": "subsec-day8-design.html",
  "type": "Subsection",
  "number": "8.2.2",
  "title": "Part 2: Designing the 500 ms Timer",
  "body": " Part 2: Designing the 500 ms Timer  The reading worked the arithmetic for a one-second period: cycles needed , split into a prescale factor and a count whose product hits the target. Remember that counters start counting at 0, so when writing these values to their registers we subtract one from them ( ). Today's timer toggles the LED every 500 ms, which at 12 MHz is cycles. Before any code, decide what to put in the two registers.   Before choosing values, watch the machine run. The reference manual's own timing diagram for the prescaler tells the whole story, one stage at a time: the clock arrives and the counter starts; the counter reaches the auto-reload value, wraps to 0, and the update event fires; a new prescaler value written mid-period waits in a buffer; and at the next update event it takes effect and the counter clock slows.   The prescaler's timing diagram (RM0490 Figure 167), first stage: the input clock CK_PSC runs; when CEN (counter enable) is set, the counter clock CK_CNT starts.     Second stage: the counter register climbs (F7, F8, FC here), reaches the auto-reload value, wraps to 00 — and at that instant the update event (UEV) pulse fires.     Third stage: software writes a new value into TIMx_PSC mid-period. The prescaler control register shows the write immediately, but the working copy — the prescaler buffer — holds the old value until the next update event.     The complete diagram. At the update event the buffered prescaler value takes effect: the prescaler counter begins cycling 0 3 and CK_CNT visibly slows — the division has changed from 1 to 4. A new prescaler value never changes the counting rate mid-period; it waits for the boundary to take effect.         Pick the Pair   Here are four candidate (prescale factor, count) pairs for the 500 ms period. For each one, decide whether TIM14 can actually be configured that way, and why or why not. Commit an answer for all four before we discuss.    Prescale by 10,000, count to 600.    Prescale by 6000, count to 1000.    Prescale by 60, count to 100,000.    Prescale by 65,536, count to 91.55    The first two work — and are both exactly 6,000,000, and every value fits. The third fails because 100,000 does not fit in a 16-bit counter; the fourth fails because a counter cannot count to a fraction. The code we'll work with later uses a third good pair: prescale by 12,000 and count to 500. It earns its place by making the counter tick at exactly 1 kHz — one tick per millisecond — so the count is the period in milliseconds, and changing the blink rate later means changing one self-explanatory number.   "
},
{
  "id": "fig-prescaler-r1",
  "level": "2",
  "url": "subsec-day8-design.html#fig-prescaler-r1",
  "type": "Figure",
  "number": "8.2.1",
  "title": "",
  "body": " The prescaler's timing diagram (RM0490 Figure 167), first stage: the input clock CK_PSC runs; when CEN (counter enable) is set, the counter clock CK_CNT starts.   "
},
{
  "id": "fig-prescaler-r2",
  "level": "2",
  "url": "subsec-day8-design.html#fig-prescaler-r2",
  "type": "Figure",
  "number": "8.2.2",
  "title": "",
  "body": " Second stage: the counter register climbs (F7, F8, FC here), reaches the auto-reload value, wraps to 00 — and at that instant the update event (UEV) pulse fires.   "
},
{
  "id": "fig-prescaler-r3",
  "level": "2",
  "url": "subsec-day8-design.html#fig-prescaler-r3",
  "type": "Figure",
  "number": "8.2.3",
  "title": "",
  "body": " Third stage: software writes a new value into TIMx_PSC mid-period. The prescaler control register shows the write immediately, but the working copy — the prescaler buffer — holds the old value until the next update event.   "
},
{
  "id": "fig-prescaler-timing",
  "level": "2",
  "url": "subsec-day8-design.html#fig-prescaler-timing",
  "type": "Figure",
  "number": "8.2.4",
  "title": "",
  "body": " The complete diagram. At the update event the buffered prescaler value takes effect: the prescaler counter begins cycling 0 3 and CK_CNT visibly slows — the division has changed from 1 to 4. A new prescaler value never changes the counting rate mid-period; it waits for the boundary to take effect.   "
},
{
  "id": "act-timer-design",
  "level": "2",
  "url": "subsec-day8-design.html#act-timer-design",
  "type": "Activity",
  "number": "8.2.1",
  "title": "Pick the Pair.",
  "body": " Pick the Pair   Here are four candidate (prescale factor, count) pairs for the 500 ms period. For each one, decide whether TIM14 can actually be configured that way, and why or why not. Commit an answer for all four before we discuss.    Prescale by 10,000, count to 600.    Prescale by 6000, count to 1000.    Prescale by 60, count to 100,000.    Prescale by 65,536, count to 91.55   "
},
{
  "id": "subsec-day8-init",
  "level": "1",
  "url": "subsec-day8-init.html",
  "type": "Subsection",
  "number": "8.2.3",
  "title": "Part 3: Five Lines of Initialization",
  "body": " Part 3: Five Lines of Initialization  Turning the (prescale, count) pair chosen in into a running timer takes five register writes, and every one of them is a pattern you have used before. Here they are, one at a time.   The clock. Like every peripheral, TIM14 is unreachable until its clock is enabled. All five timers live on the APB bus. TIM1, TIM14, TIM16, and TIM17 are enabled in RCC_APBENR2 — the same register where you enabled the ADC's clock on Day 7; TIM3's enable bit is one register over, in RCC_APBENR1 .  RCC->APBENR2 |= RCC_APBENR2_TIM14EN; \/\/ enable clock access to TIM14   The RCC peripheral-clock-enable registers, with TIM14EN boxed in RCC_APBENR2 (offset 0x40). Familiar neighbors are visible: RCC_IOPENR , where the GPIO port clocks are enabled, sits at 0x34, and ADCEN — Day 7's clock enable — lives in the same APBENR2 row. Until TIM14EN is set, TIM14's registers do not respond.     The rate and the range. The prescaler and auto-reload values you chose go into PSC and ARR , each written to the register as value minus one:  #define PSC_FACTOR 12000 \/\/ 12 MHz \/ 12000 = 1 kHz: one tick per ms #define ARR_FACTOR 500 \/\/ 500 ticks = 500 ms per update event TIM14->PSC = PSC_FACTOR - 1; \/\/ counting starts at 0, so minus one TIM14->ARR = ARR_FACTOR - 1;   Three TIM14 registers from the register map: the counter itself (CNT, offset 0x24), the prescaler (PSC, 0x28), and the auto-reload value (ARR, 0x2C), each 16 bits. The hardware divides by PSC + 1 and counts from 0 through ARR, so both PSC and ARR are written as the desired factor minus one.     A clean start. The counter register CNT holds whatever it held before — starting a 500-count period from a leftover 437 would make the first blink arrive early. Zero it:  TIM14->CNT = 0; \/\/ don't start counting from a leftover value   Go. The CEN bit (counter enable) in the control register TIM14_CR1 starts the counting. From this line on, the timer runs by itself:  TIM14->CR1 |= TIM_CR1_CEN; \/\/ start the counter   An excerpt of the TIM14 register map (RM0490 Table 73) with today's two key bits marked: CEN in TIM14_CR1 starts the counter, and UIF (update interrupt flag) in TIM14_SR is set by hardware each time the counter wraps to 0 after reaching the auto-reload value — and is your responsibility to clear.    Assembled in order — clock, rate, range, clean start, go — the five lines make the day's first new function:  void tim14_500ms_init() { \/\/ enable clock access to timer 14 (on APB bus) RCC->APBENR2 |= RCC_APBENR2_TIM14EN; \/\/ Set prescaler value TIM14->PSC = PSC_FACTOR - 1; \/\/ starts counting at 0 \/\/ Set auto-reload value TIM14->ARR = ARR_FACTOR - 1; \/\/ Clear counter TIM14->CNT = 0; \/\/ Enable timer TIM14->CR1 |= TIM_CR1_CEN; }      "
},
{
  "id": "subsec-day8-init-3",
  "level": "2",
  "url": "subsec-day8-init.html#subsec-day8-init-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The clock. "
},
{
  "id": "fig-apbenr2-tim14",
  "level": "2",
  "url": "subsec-day8-init.html#fig-apbenr2-tim14",
  "type": "Figure",
  "number": "8.2.7",
  "title": "",
  "body": " The RCC peripheral-clock-enable registers, with TIM14EN boxed in RCC_APBENR2 (offset 0x40). Familiar neighbors are visible: RCC_IOPENR , where the GPIO port clocks are enabled, sits at 0x34, and ADCEN — Day 7's clock enable — lives in the same APBENR2 row. Until TIM14EN is set, TIM14's registers do not respond.   "
},
{
  "id": "subsec-day8-init-6",
  "level": "2",
  "url": "subsec-day8-init.html#subsec-day8-init-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The rate and the range. "
},
{
  "id": "fig-tim14-psc-arr",
  "level": "2",
  "url": "subsec-day8-init.html#fig-tim14-psc-arr",
  "type": "Figure",
  "number": "8.2.8",
  "title": "",
  "body": " Three TIM14 registers from the register map: the counter itself (CNT, offset 0x24), the prescaler (PSC, 0x28), and the auto-reload value (ARR, 0x2C), each 16 bits. The hardware divides by PSC + 1 and counts from 0 through ARR, so both PSC and ARR are written as the desired factor minus one.   "
},
{
  "id": "subsec-day8-init-9",
  "level": "2",
  "url": "subsec-day8-init.html#subsec-day8-init-9",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "A clean start. "
},
{
  "id": "subsec-day8-init-11",
  "level": "2",
  "url": "subsec-day8-init.html#subsec-day8-init-11",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Go. "
},
{
  "id": "fig-tim14-regmap-polled",
  "level": "2",
  "url": "subsec-day8-init.html#fig-tim14-regmap-polled",
  "type": "Figure",
  "number": "8.2.9",
  "title": "",
  "body": " An excerpt of the TIM14 register map (RM0490 Table 73) with today's two key bits marked: CEN in TIM14_CR1 starts the counter, and UIF (update interrupt flag) in TIM14_SR is set by hardware each time the counter wraps to 0 after reaching the auto-reload value — and is your responsibility to clear.   "
},
{
  "id": "subsec-day8-polled",
  "level": "1",
  "url": "subsec-day8-polled.html",
  "type": "Subsection",
  "number": "8.2.4",
  "title": "Part 4: Running blinkyTimerPolled.c",
  "body": " Part 4: Running blinkyTimerPolled.c  The timer is now counting — the remaining question is how the program notices each elapsed period. The first answer reuses what you know: check a status flag. When the counter wraps, hardware sets UIF in TIM14_SR ; the main loop checks for it, and on finding it set, clears it and toggles the LED.  Look closely at the shape of that check, because it is deliberately not what we did when we waited for the UART or the ADC to finish:  On Day 7, waiting for the ADC looked like this:  while (!(ADC1->ISR & ADC_ISR_EOC)) {} \/\/ Day 7: BLOCKING -- stand here until done  Today's check looks like this instead:  if (TIM14->SR & TIM_SR_UIF) { ... } \/\/ today: check once, keep moving  The while wait plants the program at the flag until it rises. Today's if glances at the flag once per trip around the outer main loop and moves on either way. The rest of the main loop is then free for other work. The complete program is on Canvas — we'll run it next.   #include <stdio.h> #include \"ES28.h\" #define LED (1U<<5) \/\/ on-board LED #define PSC_FACTOR 12000 \/\/ 12 MHz \/ 12000 = 1 kHz #define ARR_FACTOR 500 \/\/ 1 kHz \/ 500 = 2 Hz -> toggle every 500 ms void tim14_500ms_init(); int main(void) { RCC->IOPENR |= RCC_IOPENR_GPIOAEN; GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk; GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos); GPIOA->ODR &= ~(LED); \/\/ LED starts off tim14_500ms_init(); while (1) { if (TIM14->SR & TIM_SR_UIF) { \/\/ did a period elapse? \/\/ Clear UIF in status register TIM14->SR = ~TIM_SR_UIF; GPIOA->ODR ^= LED; \/\/ toggle LED } \/\/ Could do other stuff here, like poll a button. } return 1; } void tim14_500ms_init() { \/\/ enable clock access to timer 14 (on APB bus) RCC->APBENR2 |= RCC_APBENR2_TIM14EN; \/\/ Set prescaler value TIM14->PSC = PSC_FACTOR - 1; \/\/ starts counting at 0 \/\/ Set auto-reload value TIM14->ARR = ARR_FACTOR - 1; \/\/ Clear counter TIM14->CNT = 0; \/\/ Enable timer TIM14->CR1 |= TIM_CR1_CEN; }   Run the Polled Timer   Everything that follows today builds on this program.    Make a copy of your TemplateProject and call the new project BlinkyTimerPolled .    Download blinkyTimerPolled.c from Canvas and put it in the new project's Src folder.    Build and run. The on-board LED should blink steadily, once per second (500 ms on, 500 ms off).     Not blinking? Two checks catch nearly everything: is blinkyTimerPolled.c actually in Src and part of the build, and is there exactly one  main() in the project — a leftover main.c from the template is the classic conflict. Still stuck? We're here to help!   "
},
{
  "id": "act-timer-polled-run",
  "level": "2",
  "url": "subsec-day8-polled.html#act-timer-polled-run",
  "type": "Activity",
  "number": "8.2.2",
  "title": "Run the Polled Timer.",
  "body": " Run the Polled Timer   Everything that follows today builds on this program.    Make a copy of your TemplateProject and call the new project BlinkyTimerPolled .    Download blinkyTimerPolled.c from Canvas and put it in the new project's Src folder.    Build and run. The on-board LED should blink steadily, once per second (500 ms on, 500 ms off).   "
},
{
  "id": "subsec-day8-rcw0",
  "level": "1",
  "url": "subsec-day8-rcw0.html",
  "type": "Subsection",
  "number": "8.2.5",
  "title": "Part 5: Clearing Status Registers",
  "body": " Part 5: Clearing Status Registers  The polled program clears the update flag with a line that deserves a second look:  TIM14->SR = ~TIM_SR_UIF; \/\/ clear UIF ... with an INVERTED mask?  On Day 7 you cleared a status flag with a plain assignment too — but the mask was the opposite ( ):  ADC1->ISR = ADC_ISR_ADRDY; \/\/ Day 7: a 1 at the flag, 0s everywhere else TIM14->SR = ~TIM_SR_UIF; \/\/ today: a 0 at the flag, 1s everywhere else  Both lines are correct. Commit to an explanation before reading on: what must be different about these two registers for opposite masks to both be right?   Find the Access Type   The answer is in the Reference Manual (RM0490):    Open RM0490 §17.4.3, TIM14 status register (TIM14_SR) . Under the UIF bit, read the small access-type label printed beneath the bit name.    Now open RM0490 §1.2, List of abbreviations for registers , and find that label's definition. Compare it with the definition of rc_w1 , the ADC flags' type from Day 7.     The TIM14 status register (RM0490 §17.4.3), with the answer boxed. UIF is bit 0, and the access type printed under it is rc_w0 : read, and clear by writing 0 — writing 1 has no effect. Its neighbors CC1IF and CC1OF are rc_w0 too. The ADC's flags were the mirror image, rc_w1 .    UIF is rc_w0 : cleared by writing 0; writing 1 has no effect. The ADC's flags were rc_w1 — cleared by writing 1; writing 0 has no effect. Same mechanism, opposite polarity — and now both masks make sense. A clearing mask carries the clearing value at your flag and the no-effect value at every other bit. TIM14->SR = ~TIM_SR_UIF; writes a 0 exactly at UIF and harmless 1s everywhere else; ADC1->ISR = ADC_ISR_ADRDY; writes a 1 exactly at ADRDY and harmless 0s everywhere else. The status registers of the STM32C031C6's peripherals split between the two conventions — the peripheral designs come from different origins, and the clearing method came with them — so the access type in the reference manual, not habit, is the authority.  One postscript. Could you have cleared UIF with the read-modify-write Day 7 forbade, TIM14->SR &= ~TIM_SR_UIF; ? Here, mostly yes: the write-back sends a 1 to every flag that read as 1 — no effect on rc_w0 bits — and a 0 to every flag that read as 0, which was already clear. The damage Day 7 warned about does not occur. It is still the weaker habit, twice over. On an rc_w1 register it is destructive — that was Day 7. And even here, if the hardware raises another flag in this register between the read and the write-back, the 0 written over it clears it and the event is silently lost — on Day 9, when your own interrupts start landing in the middle of your own main loop, that stops being hypothetical. Clear status flags by assigning a mask. The interrupt version of today's program, coming next, does exactly that.     "
},
{
  "id": "act-timer-rcw0-lookup",
  "level": "2",
  "url": "subsec-day8-rcw0.html#act-timer-rcw0-lookup",
  "type": "Activity",
  "number": "8.2.3",
  "title": "Find the Access Type.",
  "body": " Find the Access Type   The answer is in the Reference Manual (RM0490):    Open RM0490 §17.4.3, TIM14 status register (TIM14_SR) . Under the UIF bit, read the small access-type label printed beneath the bit name.    Now open RM0490 §1.2, List of abbreviations for registers , and find that label's definition. Compare it with the definition of rc_w1 , the ADC flags' type from Day 7.   "
},
{
  "id": "fig-tim14-sr",
  "level": "2",
  "url": "subsec-day8-rcw0.html#fig-tim14-sr",
  "type": "Figure",
  "number": "8.2.11",
  "title": "",
  "body": " The TIM14 status register (RM0490 §17.4.3), with the answer boxed. UIF is bit 0, and the access type printed under it is rc_w0 : read, and clear by writing 0 — writing 1 has no effect. Its neighbors CC1IF and CC1OF are rc_w0 too. The ADC's flags were the mirror image, rc_w1 .   "
},
{
  "id": "subsec-day8-interrupt-prog",
  "level": "1",
  "url": "subsec-day8-interrupt-prog.html",
  "type": "Subsection",
  "number": "8.2.6",
  "title": "Part 6: Programming an Interrupt",
  "body": " Part 6: Programming an Interrupt  Polling the flag freed the loop from blocking, but the loop still spends every iteration asking. The pre-class video's answer is the interrupt: let the update event call a function — push the machine state, vector to your handler, pop, resume ( ). Two reminders from the video before the mechanics, because both collide with habits. First, the ISR we are about to write is an Interrupt Service Routine — a function — not an interrupt and status register like ADC1->ISR ; same letters, different thing. Second, if you have used Arduino: there is no attachInterrupt() here. Arduino let you hand any function to a registry at run time; on this bare machine, you are about to do yourself the three things that call used to hide — turn on the source, allow it through the controller, and supply the handler under the name the hardware's table expects.   Enable the interrupt in the timer. The timer must be told to raise an interrupt at each update event, not just set the flag. This new behavior is enabled via the UIE bit (update interrupt enable) in TIM14_DIER :  TIM14->DIER |= TIM_DIER_UIE; \/\/ update event now raises an interrupt request  UIE (in DIER) enables the request, meaning the hardware will now request to interrupt the processor when an update event happens; UIF (in SR) reports that the event happened.   The register map again, with today's addition: UIE in TIM14_DIER (interrupt enable register) makes each update event raise an interrupt request. CEN and UIF, from the polled version, are dimmed — they keep their jobs.     Enable the interrupt in the NVIC. When an update event happens the timer hardware now issues a request to interrupt the processor. This request first goes to the NVIC — which, remember, ignores every source until told otherwise. CMSIS (Common Microcontroller Software Interface Standard) provides the function, and the device header provides a named constant for each interrupt line:  NVIC_EnableIRQ(TIM14_IRQn); \/\/ allow TIM14's requests through the NVIC   Where the Names Come From   Both TIM14_IRQn (the name we needed to register with the NVIC) and the handler name you are about to need to write the ISR come from different places.    Before looking: the vector table lists every interrupt source on the chip, numbered from 0. Write down a guess — roughly where in the list does TIM14 sit?    Now open the reference manual, RM0490 §11.3, Table 40, Vector table , and find the TIM14 row. Note its position number, its acronym and its default priority.     An excerpt of RM0490's Table 40, the vector table: positions 14 through 23, with the header row and the TIM14 row boxed. TIM14's interrupt is position 19, its priority is 24 and its vector — the address the CPU fetches the handler's location from — is 0x0000_008C. TIM3, TIM16, TIM17, and I2C1 occupy nearby positions.    TIM14 is the name of the hardware. To interact with it in code we need to add on to this name according to somewhat regular patterns.  To register with the NVIC we use TIM14_IRQn — we simply add on _IRQn . This is defined in the device header and it is what NVIC_EnableIRQ() takes.   The IRQn_Type enumeration in the device header stm32c031xx.h , with the TIM14 row boxed. Every populated row of RM0490's Table 40 gets one constant here, and its value is the position number from that table: TIM14_IRQn = 19 . The gaps in the numbering — 1, 8, 15, 17, 18 are absent — are the reserved positions, which have no interrupt on this part.    The third name is what you need to call your ISR. The handler function is TIM14_IRQHandler , and that name is not yours to invent — it is listed in the project's startup file , startup_stm32c031c6tx.s : an assembly file, generated with your project, that runs before main() and wires each official handler name into its vector-table slot. It sits in your project tree alongside Src . You will read that file, never edit it: find the table with the IRQ (interrupt request) handler names, select the one you need, copy it. A name that is even one character off still compiles and still links — the linker simply never places your function in the table, and the slot keeps the default handler the startup file installed there. Your ISR never runs. Depending on what that default handler does, the board may also stop responding entirely — no LED, no serial output — so a dead board and a dark LED are the same diagnosis, and the handler's spelling is the first thing to check for either one.   The vector table inside the startup file startup_stm32c031c6tx.s , with the TIM14 row boxed. Each .word is one slot, in position order: counting from WWDG_IRQHandler as position 0, TIM14_IRQHandler lands on 19 — the same 19 as Table 40 and as TIM14_IRQn . The .word 0 entries are the reserved positions. Note that a handler name is not its _IRQn constant with the ending swapped: the header declares ADC1_IRQn , I2C1_IRQn and SPI1_IRQn , while the handlers here are ADC_IRQHandler , I2C_IRQHandler and SPI_IRQHandler . This is why the handler name is copied from this file rather than constructed.     Give the ISR a way to talk to main. The video's flag pattern (written version: ) is exactly what today's ISR needs, so bring it back to mind: a global flag, declared volatile because the compiler cannot see the ISR ever being called from your code. The ISR sets this variable as a signal to your main code; the loop checks it, clears it, and does the work. Without volatile the optimizer (part of the compiler) may decide the flag never changes from its initial value and optimize it away — as a result the blink simply doesn't happen, with no error anywhere.  One last piece of housekeeping, visible in the code you are about to complete: the initialization is bracketed by __disable_irq() and __enable_irq() , which turn all interrupts off globally during setup so nothing fires while the timer is half-configured. The ISR does the same around its body, to make sure no interrupt is serviced while another is being serviced. The processor itself is capable of nested interrupts — an interrupt interrupting an interrupt — but imagine keeping track of that. We will not use that capability in this course: every ISR we write disables interrupts globally on entry and re-enables them on exit.          "
},
{
  "id": "subsec-day8-interrupt-prog-3",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#subsec-day8-interrupt-prog-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Enable the interrupt in the timer. "
},
{
  "id": "fig-tim14-regmap-interrupt",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#fig-tim14-regmap-interrupt",
  "type": "Figure",
  "number": "8.2.12",
  "title": "",
  "body": " The register map again, with today's addition: UIE in TIM14_DIER (interrupt enable register) makes each update event raise an interrupt request. CEN and UIF, from the polled version, are dimmed — they keep their jobs.   "
},
{
  "id": "subsec-day8-interrupt-prog-7",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#subsec-day8-interrupt-prog-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Enable the interrupt in the NVIC. "
},
{
  "id": "act-timer-vector-lookup",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#act-timer-vector-lookup",
  "type": "Activity",
  "number": "8.2.4",
  "title": "Where the Names Come From.",
  "body": " Where the Names Come From   Both TIM14_IRQn (the name we needed to register with the NVIC) and the handler name you are about to need to write the ISR come from different places.    Before looking: the vector table lists every interrupt source on the chip, numbered from 0. Write down a guess — roughly where in the list does TIM14 sit?    Now open the reference manual, RM0490 §11.3, Table 40, Vector table , and find the TIM14 row. Note its position number, its acronym and its default priority.   "
},
{
  "id": "fig-vector-table",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#fig-vector-table",
  "type": "Figure",
  "number": "8.2.13",
  "title": "",
  "body": " An excerpt of RM0490's Table 40, the vector table: positions 14 through 23, with the header row and the TIM14 row boxed. TIM14's interrupt is position 19, its priority is 24 and its vector — the address the CPU fetches the handler's location from — is 0x0000_008C. TIM3, TIM16, TIM17, and I2C1 occupy nearby positions.   "
},
{
  "id": "fig-irqn-type",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#fig-irqn-type",
  "type": "Figure",
  "number": "8.2.14",
  "title": "",
  "body": " The IRQn_Type enumeration in the device header stm32c031xx.h , with the TIM14 row boxed. Every populated row of RM0490's Table 40 gets one constant here, and its value is the position number from that table: TIM14_IRQn = 19 . The gaps in the numbering — 1, 8, 15, 17, 18 are absent — are the reserved positions, which have no interrupt on this part.   "
},
{
  "id": "subsec-day8-interrupt-prog-14",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#subsec-day8-interrupt-prog-14",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "startup file "
},
{
  "id": "fig-startup-file",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#fig-startup-file",
  "type": "Figure",
  "number": "8.2.15",
  "title": "",
  "body": " The vector table inside the startup file startup_stm32c031c6tx.s , with the TIM14 row boxed. Each .word is one slot, in position order: counting from WWDG_IRQHandler as position 0, TIM14_IRQHandler lands on 19 — the same 19 as Table 40 and as TIM14_IRQn . The .word 0 entries are the reserved positions. Note that a handler name is not its _IRQn constant with the ending swapped: the header declares ADC1_IRQn , I2C1_IRQn and SPI1_IRQn , while the handlers here are ADC_IRQHandler , I2C_IRQHandler and SPI_IRQHandler . This is why the handler name is copied from this file rather than constructed.   "
},
{
  "id": "subsec-day8-interrupt-prog-16",
  "level": "2",
  "url": "subsec-day8-interrupt-prog.html#subsec-day8-interrupt-prog-16",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Give the ISR a way to talk to main. "
},
{
  "id": "subsec-day8-code",
  "level": "1",
  "url": "subsec-day8-code.html",
  "type": "Subsection",
  "number": "8.2.7",
  "title": "Part 7: Writing blinkyTimerInt.c",
  "body": " Part 7: Writing blinkyTimerInt.c  Now assemble blinkyTimerInt.c . The skeleton below is the polled program from with its core moved: the five init lines you already ran are given, and the four \/\/ TODO clusters are the interrupt machinery from Part 6. Note what is gone : the main loop no longer touches the timer at all.  \/* * blinkyTimerInt.c -- blink the on-board LED from a TIM14 update interrupt * * Four blanks to fill in. Everything you need was in Parts 5 and 6: * * TODO 1 raise an interrupt per update TIM14->DIER * TODO 2 let it through the controller NVIC_EnableIRQ( ... ) * TODO 3 the handler itself exact name from the startup file * TODO 4 the shared flag one keyword matters *\/ #include <stdio.h> #include \"ES28.h\" #define LED (1U<<5) \/\/ on-board LED #define PSC_FACTOR 12000 \/\/ 12 MHz \/ 12000 = 1 kHz #define ARR_FACTOR 500 \/\/ 1 kHz \/ 500 = 2 Hz void tim14_500ms_interrupt_init(); \/\/ TODO 4a -- declare the flag the ISR will share with main. \/\/ Which keyword must the declaration carry, and why? int main(void) { RCC->IOPENR |= RCC_IOPENR_GPIOAEN; GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk; GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos); GPIOA->ODR &= ~(LED); \/\/ LED starts off \/\/ TODO 4b -- initialize the flag ... tim14_500ms_interrupt_init(); while (1) { \/\/ TODO 4c -- when the flag is set: clear it, toggle the LED. \/\/ The timer registers appear NOWHERE in this loop. } return 1; } void tim14_500ms_interrupt_init() { __disable_irq(); \/\/ given: no interrupts during setup RCC->APBENR2 |= RCC_APBENR2_TIM14EN; TIM14->PSC = PSC_FACTOR - 1; TIM14->ARR = ARR_FACTOR - 1; TIM14->CNT = 0; \/\/ TODO 1 -- enable the update interrupt in the timer itself \/\/ TODO 2 -- enable TIM14's line in the NVIC TIM14->CR1 |= TIM_CR1_CEN; __enable_irq(); \/\/ given: setup done, interrupts on } \/\/ TODO 3 -- write the ISR. Its name must be EXACTLY the handler name from \/\/ the vector table lookup -- copy it from the startup file, don't \/\/ type it from memory. No arguments, no return value. Inside, \/\/ bracketed by __disable_irq(); ... __enable_irq(); do only two \/\/ things: clear UIF the Part 5 way (TIM14->SR = ~TIM_SR_UIF;), \/\/ and set the flag.   Make the Timer Do the Calling   The skeleton is on Canvas as blinkyTimerInt.c .    Add blinkyTimerInt.c to your project's Src folder.    Swap the build: right-click blinkyTimerPolled.c and choose Resource Configurations → Exclude from Build , click Select All , then OK — and make sure blinkyTimerInt.c is not excluded ( ). Two main() s cannot coexist in one build.    Fill TODO 1: the update-interrupt enable in the timer.    Fill TODO 2: the NVIC enable.    Fill TODO 3: write the ISR, name copied from the startup file.    Fill TODO 4: the volatile flag — declared, initialized, and consumed in the loop.    Build, run, and watch the LED blink at the same steady rate as before — now with the main loop only checking your volatile flag. Done early? Make it toggle every 250 ms without touching PSC; then go back to 500 ms and make it toggle every 250 ms without touching ARR. Now imagine your clock was running at 48 MHz (which our chip can do): how could you make the 250 ms or 500 ms blink rate work?     LED not blinking? First, one triage check: is the board completely dead — no LED, no serial output at all? Jump straight to step 3. Otherwise walk through the steps in order — this will help you isolate the fault:   Does the project build cleanly, with blinkyTimerInt.c included and blinkyTimerPolled.c excluded via Resource Configurations → Exclude from Build ?  Swap back for a moment: does the polled version still blink? If yes, your timer configuration is fine — the problem is in the interrupt path, which narrows it to the next two steps.  Is the ISR's name exactly  TIM14_IRQHandler — copied from the startup file, not typed? A near-miss name builds and links without a single warning; your function is never in the table, so it never runs — and the board may look completely dead rather than merely dark.  Did you enable both halves — UIE in TIM14_DIER  and the NVIC line? Either one alone produces silence.   The complete file is at the end of this part. If you did not finish the four blanks in class, copy it, compare it against your own version to find what was different, and note how you would fix yours.        "
},
{
  "id": "act-timer-interrupt",
  "level": "2",
  "url": "subsec-day8-code.html#act-timer-interrupt",
  "type": "Activity",
  "number": "8.2.5",
  "title": "Make the Timer Do the Calling.",
  "body": " Make the Timer Do the Calling   The skeleton is on Canvas as blinkyTimerInt.c .    Add blinkyTimerInt.c to your project's Src folder.    Swap the build: right-click blinkyTimerPolled.c and choose Resource Configurations → Exclude from Build , click Select All , then OK — and make sure blinkyTimerInt.c is not excluded ( ). Two main() s cannot coexist in one build.    Fill TODO 1: the update-interrupt enable in the timer.    Fill TODO 2: the NVIC enable.    Fill TODO 3: write the ISR, name copied from the startup file.    Fill TODO 4: the volatile flag — declared, initialized, and consumed in the loop.    Build, run, and watch the LED blink at the same steady rate as before — now with the main loop only checking your volatile flag. Done early? Make it toggle every 250 ms without touching PSC; then go back to 500 ms and make it toggle every 250 ms without touching ARR. Now imagine your clock was running at 48 MHz (which our chip can do): how could you make the 250 ms or 500 ms blink rate work?   "
},
{
  "id": "subsec-day8-homework",
  "level": "1",
  "url": "subsec-day8-homework.html",
  "type": "Subsection",
  "number": "8.2.8",
  "title": "Part 8: Before Next Class",
  "body": " Part 8: Before Next Class  Today's pattern — configure a timer, let its interrupt do the timekeeping, keep the main loop for real work — is great preparation for Lab 5, where a timer interrupt paces the ADC in a temperature controller.   Homework: ADCPot with a Timer-Interrupt Blink   Due at the start of Tuesday's class, submitted per the Canvas assignment.    Modify your ADCPot.c from Day 7 so that, in addition to performing the ADC readings, the on-board LED blinks at a steady rate of one-third of a second on, one-third of a second off , using a timer interrupt. Hint: you may wish to toggle the LED directly in the ISR — consider what the main loop is busy doing, and for how long at a stretch.    Choose your prescaler and auto-reload values so the period is exact , and show the arithmetic in a comment. One-third of a second does not divide as conveniently as 500 ms did — more than one pair works, but not every pair you might like.     The homework's structure, from the class deck: the main loop cycles through start-conversion, read, print, and its delay, while the timer interrupt arrives on its own schedule; each arrival runs the ISR — clear the flag, toggle the LED — and returns exactly where main was suspended. The main loop and the ISR run independently.    And a challenge, for fun — nothing to submit: make the blink asymmetric , 200 ms on and 800 ms off. One timer, two different intervals: the code must reprogram ARR on the fly and remember which phase it is in. A state machine with two states does it in a dozen lines.     "
},
{
  "id": "act-timer-homework",
  "level": "2",
  "url": "subsec-day8-homework.html#act-timer-homework",
  "type": "Activity",
  "number": "8.2.6",
  "title": "Homework: ADCPot with a Timer-Interrupt Blink.",
  "body": " Homework: ADCPot with a Timer-Interrupt Blink   Due at the start of Tuesday's class, submitted per the Canvas assignment.    Modify your ADCPot.c from Day 7 so that, in addition to performing the ADC readings, the on-board LED blinks at a steady rate of one-third of a second on, one-third of a second off , using a timer interrupt. Hint: you may wish to toggle the LED directly in the ISR — consider what the main loop is busy doing, and for how long at a stretch.    Choose your prescaler and auto-reload values so the period is exact , and show the arithmetic in a comment. One-third of a second does not divide as conveniently as 500 ms did — more than one pair works, but not every pair you might like.   "
},
{
  "id": "fig-adc-blinky-flow",
  "level": "2",
  "url": "subsec-day8-homework.html#fig-adc-blinky-flow",
  "type": "Figure",
  "number": "8.2.17",
  "title": "",
  "body": " The homework's structure, from the class deck: the main loop cycles through start-conversion, read, print, and its delay, while the timer interrupt arrives on its own schedule; each arrival runs the ISR — clear the flag, toggle the LED — and returns exactly where main was suspended. The main loop and the ISR run independently.   "
},
{
  "id": "subsec-timers-ref-registers",
  "level": "1",
  "url": "subsec-timers-ref-registers.html",
  "type": "Subsection",
  "number": "8.3.1",
  "title": "Register Summary",
  "body": " Register Summary   The TIM14 registers used in this chapter         Register  Offset  Bit(s) used  Purpose  RM0490    TIM14_CR1  0x00  CEN (bit 0)  Counter enable — set to start counting  §17.4.1    TIM14_DIER  0x0C  UIE (bit 0)  Update interrupt enable — update events raise an interrupt request  §17.4.2    TIM14_SR  0x10  UIF (bit 0)  Update interrupt flag — set by hardware at each update event; rc_w0 , cleared by software  §17.4.3    TIM14_CNT  0x24  CNT[15:0]  The running count — zero it before starting  §17.4.8    TIM14_PSC  0x28  PSC[15:0]  Prescaler — counter clock is input clock ÷ (PSC + 1)  §17.4.9    TIM14_ARR  0x2C  ARR[15:0]  Auto-reload — counter wraps to 0 after reaching this value  §17.4.10     The period formula, in one place: with input clock (12 MHz in this course), where PSC and ARR are the values as written to the registers. Both are 16 bits; neither written value can exceed 65,535.  "
},
{
  "id": "table-tim14-registers",
  "level": "2",
  "url": "subsec-timers-ref-registers.html#table-tim14-registers",
  "type": "Table",
  "number": "8.3.1",
  "title": "The TIM14 registers used in this chapter",
  "body": " The TIM14 registers used in this chapter         Register  Offset  Bit(s) used  Purpose  RM0490    TIM14_CR1  0x00  CEN (bit 0)  Counter enable — set to start counting  §17.4.1    TIM14_DIER  0x0C  UIE (bit 0)  Update interrupt enable — update events raise an interrupt request  §17.4.2    TIM14_SR  0x10  UIF (bit 0)  Update interrupt flag — set by hardware at each update event; rc_w0 , cleared by software  §17.4.3    TIM14_CNT  0x24  CNT[15:0]  The running count — zero it before starting  §17.4.8    TIM14_PSC  0x28  PSC[15:0]  Prescaler — counter clock is input clock ÷ (PSC + 1)  §17.4.9    TIM14_ARR  0x2C  ARR[15:0]  Auto-reload — counter wraps to 0 after reaching this value  §17.4.10    "
},
{
  "id": "subsec-timers-ref-access-types",
  "level": "1",
  "url": "subsec-timers-ref-access-types.html",
  "type": "Subsection",
  "number": "8.3.2",
  "title": "Status-Register Access Types",
  "body": " Status-Register Access Types  RM0490 §1.2, List of abbreviations for registers , defines the access-type labels printed under every bit of every register description. The ones this course meets:   Register access types (RM0490 §1.2)       Label  Meaning  How software clears it    rw  Read\/write  Write any value    r  Read-only  Software cannot — hardware manages it    rc_w0  Read; clear by writing 0 (writing 1 has no effect)  Assign a mask with 0 at the flag: REG = ~FLAG;    rc_w1  Read; clear by writing 1 (writing 0 has no effect)  Assign a mask with 1 at the flag: REG = FLAG;    rs  Read; software can set by writing 1; writing 0 has no effect  Not by writing; §1.2 defines only the write-0-has-no-effect behavior (ADEN, ADSTART)     The habit worth keeping: clear status flags by assigning the mask, never by read-modify-write. The assignment is correct for both polarities. &= ~ is destructive on rc_w1 bits, and on rc_w0 bits it is safe only as long as no other flag in the register is raised between the read and the write-back — and the label in the reference manual is the only way to know which polarity you have.  One honest footnote on REG = ~FLAG : the mask also writes 1s into the register's reserved bits, which RM0490 §1.2 says to keep at their reset value. It is safe on this family's timer status registers — it is what ST's own low-level driver does — but reserved-bit behavior is worth checking per register rather than assumed.  "
},
{
  "id": "table-access-types",
  "level": "2",
  "url": "subsec-timers-ref-access-types.html#table-access-types",
  "type": "Table",
  "number": "8.3.2",
  "title": "Register access types (RM0490 §1.2)",
  "body": " Register access types (RM0490 §1.2)       Label  Meaning  How software clears it    rw  Read\/write  Write any value    r  Read-only  Software cannot — hardware manages it    rc_w0  Read; clear by writing 0 (writing 1 has no effect)  Assign a mask with 0 at the flag: REG = ~FLAG;    rc_w1  Read; clear by writing 1 (writing 0 has no effect)  Assign a mask with 1 at the flag: REG = FLAG;    rs  Read; software can set by writing 1; writing 0 has no effect  Not by writing; §1.2 defines only the write-0-has-no-effect behavior (ADEN, ADSTART)    "
},
{
  "id": "subsec-timers-ref-block",
  "level": "1",
  "url": "subsec-timers-ref-block.html",
  "type": "Subsection",
  "number": "8.3.3",
  "title": "The Full TIM14 Block Diagram",
  "body": " The Full TIM14 Block Diagram  The reading reduces TIM14 to rate, range, wrap ( ). The diagram below is that core, redrawn for legibility from the chip's own block diagram (RM0490 Figure 165). The full original adds input filtering, capture\/compare, and output control around this path; all of it returns in the motor chapters.   TIM14's timing core, redrawn from RM0490 Figure 165. The system clock (blue) enters the prescaler, which divides it by PSC + 1; the divided counter clock CK_CNT (red) drives the 16-bit counter CNT (green); a comparison against the auto-reload value ARR (orange) triggers the update event — the counter wraps to 0 and UIF is set.     "
},
{
  "id": "fig-tim14-block",
  "level": "2",
  "url": "subsec-timers-ref-block.html#fig-tim14-block",
  "type": "Figure",
  "number": "8.3.3",
  "title": "",
  "body": " TIM14's timing core, redrawn from RM0490 Figure 165. The system clock (blue) enters the prescaler, which divides it by PSC + 1; the divided counter clock CK_CNT (red) drives the 16-bit counter CNT (green); a comparison against the auto-reload value ARR (orange) triggers the update event — the counter wraps to 0 and UIF is set.   "
},
{
  "id": "subsec-timers-ref-mechanism",
  "level": "1",
  "url": "subsec-timers-ref-mechanism.html",
  "type": "Subsection",
  "number": "8.3.4",
  "title": "The Interrupt Mechanism, in Full",
  "body": " The Interrupt Mechanism, in Full  The pre-class video walks this machinery in motion; this is the written version. Start with what the CPU does normally ( ): the program counter (PC) points at the next instruction in flash; the instruction is fetched, decoded, and executed; the PC advances; repeat. You met this machinery — the register file, SP, LR, and PC — in .   Normal program execution. The program counter steps through instructions in flash memory; each is fetched into the instruction register, decoded, and executed by the datapath.     A function call interrupts that straight line deliberately ( ). Compiler-generated code at the top of the function saves whichever registers that function will disturb, the PC is loaded with the function's start address, and the function runs. On return, the saved registers are restored and execution continues at the instruction after the call. What gets saved is the compiler's decision, made when the code was built — and the stack is what makes the round trip safe: everything needed to pick up where the program left off was saved before leaving.   What a function call does. Call: compiler-generated code at the function's entry saves the registers this function will disturb onto the stack, and the function's address goes into the PC. Return: the saved registers are restored and execution resumes at the next instruction.     An interrupt is a function call that hardware makes ( ). When a peripheral raises its interrupt signal, the CPU finishes the instruction it is on, pushes the machine state onto the stack exactly as a regular function call would, and then — this is the only new part — looks up where to jump in a vector table : a table in flash, at a fixed location, holding the starting address of one handler function per interrupt source. The CPU loads that address into the PC and runs the function, called an Interrupt Service Routine . When it returns, the saved state is popped and the interrupted program resumes, unaware anything happened. An interrupt can arrive at any instruction — even in the middle of delay_ms() — and the stack machinery makes the detour invisible to the interrupted code.    What an interrupt does. Hardware pushes the machine state onto the stack; the interrupt controller loads the ISR's address from the vector table into the PC; the ISR runs; on return the state is popped and the next instruction of the interrupted program executes.      Rule 1: the name is fixed, and it must be exact. You never call an ISR — hardware does, through the vector table — so the toolchain must know which of your functions to wire into which table slot. It does this by name : each interrupt source has one official handler name, and defining a function with exactly that name places it in the table. Get one character wrong and nothing complains — your function is simply never wired in. In class you will look up where these names come from rather than taking them on faith. Notice what is absent here: there is no register_handler(my_function) call anywhere, and nothing to pass a function to at run time — the linkage happens once, at build time, when the linker matches your function's name to the table slot. For the same reason, an ISR takes no arguments and returns nothing: hardware, not your code, is the caller, and it has nothing to pass and nowhere to put a result.  Between the peripherals and the CPU sits a referee: the Nested Vectored Interrupt Controller (NVIC), shown in . Every interrupt request (IRQ) — from timers, UARTs, GPIO pins, the ADC — arrives at the NVIC, which decides whether and when the CPU sees it. Two of its jobs matter to us now. First, enabling: each interrupt source has an enable switch in the NVIC, off by default, so no peripheral can interrupt until you allow it. Second, ordering: if two interrupts arrive together, the NVIC services the higher priority one first. The Cortex-M0+ allows you to change an IRQ's priority level; in this course we will leave every source at its reset default priority.   The NVIC sits between interrupt sources and the processor core. Peripheral interrupt requests (IRQs), GPIO lines routed through the EXTI controller, and the core's own exceptions all arrive at the NVIC, which forwards them to the CPU in priority order.     "
},
{
  "id": "fig-normal-execution",
  "level": "2",
  "url": "subsec-timers-ref-mechanism.html#fig-normal-execution",
  "type": "Figure",
  "number": "8.3.4",
  "title": "",
  "body": " Normal program execution. The program counter steps through instructions in flash memory; each is fetched into the instruction register, decoded, and executed by the datapath.   "
},
{
  "id": "fig-function-call",
  "level": "2",
  "url": "subsec-timers-ref-mechanism.html#fig-function-call",
  "type": "Figure",
  "number": "8.3.5",
  "title": "",
  "body": " What a function call does. Call: compiler-generated code at the function's entry saves the registers this function will disturb onto the stack, and the function's address goes into the PC. Return: the saved registers are restored and execution resumes at the next instruction.   "
},
{
  "id": "subsec-timers-ref-mechanism-8",
  "level": "2",
  "url": "subsec-timers-ref-mechanism.html#subsec-timers-ref-mechanism-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "interrupt vector table Interrupt Service Routine "
},
{
  "id": "fig-interrupt-execution",
  "level": "2",
  "url": "subsec-timers-ref-mechanism.html#fig-interrupt-execution",
  "type": "Figure",
  "number": "8.3.6",
  "title": "",
  "body": " What an interrupt does. Hardware pushes the machine state onto the stack; the interrupt controller loads the ISR's address from the vector table into the PC; the ISR runs; on return the state is popped and the next instruction of the interrupted program executes.   "
},
{
  "id": "subsec-timers-ref-mechanism-13",
  "level": "2",
  "url": "subsec-timers-ref-mechanism.html#subsec-timers-ref-mechanism-13",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Nested Vectored Interrupt Controller "
},
{
  "id": "fig-nvic-block",
  "level": "2",
  "url": "subsec-timers-ref-mechanism.html#fig-nvic-block",
  "type": "Figure",
  "number": "8.3.7",
  "title": "",
  "body": " The NVIC sits between interrupt sources and the processor core. Peripheral interrupt requests (IRQs), GPIO lines routed through the EXTI controller, and the core's own exceptions all arrive at the NVIC, which forwards them to the CPU in priority order.   "
},
{
  "id": "subsec-timers-ref-stacked",
  "level": "1",
  "url": "subsec-timers-ref-stacked.html",
  "type": "Subsection",
  "number": "8.3.5",
  "title": "What Gets Stacked",
  "body": " What Gets Stacked  The pre-class video describes interrupt entry as hardware saving the machine state. The exact contents, for readers who want them: on the Cortex-M0+, exception entry pushes a fixed eight-word frame — R0 R3, R12, LR, PC, and xPSR, 32 bytes — onto the stack, automatically and unconditionally, with no compiler involvement ( Arm Cortex-M0+ Devices Generic User Guide , Exception entry and return ). That fixed, hardware-mandated frame is what distinguishes an interrupt from an ordinary function call, where the compiler decides which registers the function's own entry code must save. Any other registers an ISR uses are saved by the ISR's own compiler-generated code, exactly as in any function.  "
},
{
  "id": "subsec-timers-ref-isr",
  "level": "1",
  "url": "subsec-timers-ref-isr.html",
  "type": "Subsection",
  "number": "8.3.6",
  "title": "Writing an ISR: The Rules, and <code class=\"code-inline tex2jax_ignore\">volatile<\/code>",
  "body": " Writing an ISR: The Rules, and volatile  An Interrupt Service Routine looks like an ordinary C function, but three rules set it apart, each a consequence of the mechanism in . Rule 1 — the fixed, exact name, and no arguments or return value — is covered there. The other two:    Rule 2: get in and out fast, and never block. While your ISR runs, the interrupted program is stopped, and other interrupts may be kept waiting. An ISR that loops, waits on a flag, or calls something slow — printf() , delay_ms() — holds up everything below it. The standard pattern: do the minimum the event requires (clear the flag, record a value, set a marker) and let main() do the real work at its leisure.   Rule 3: shared variables must be volatile . The minimal-work pattern of Rule 2 usually means the ISR sets a global flag variable that main() checks:  volatile int timerElapsed; \/\/ shared between the ISR and main int main(void) { timerElapsed = 0; while (1) { if (timerElapsed) { timerElapsed = 0; \/\/ consume the flag ... \/\/ ... then do the work the event calls for } else { \/\/ free to do something else } } return 1; }  The keyword volatile is what makes this work — and to see why it is needed, you need one fact about how C is built, a fact no interpreted language prepares you for. C is not executed line by line as written: the compiler is free to rewrite your code into anything that behaves identically for everything it can see , including deleting a read, or a whole branch, that it can prove makes no difference. Now apply that to the loop above ( ). The compiler compiles the ISR too — but no call to the ISR appears anywhere in the program, because hardware is the caller. So when the optimizer builds main() , where nothing ever sets timerElapsed , it is entitled to conclude the flag is always 0, read it once (or never), and quietly turn if (timerElapsed) into if (0) . Declaring the variable volatile tells the compiler: this value can change at any time, by means you cannot see — fetch it fresh from memory at every use. Every variable an ISR shares with the rest of the program gets volatile , always.   Why the flag must be volatile . The compiler compiles the ISR too — but no call to the ISR appears anywhere in the program, so when the optimizer builds main() (dashed boundary) it has no reason to think the flag can change mid-loop. The ISR's write happens at a moment the hardware chooses. volatile forbids the assumption and forces a fresh read at every use.      "
},
{
  "id": "fig-compiler-view",
  "level": "2",
  "url": "subsec-timers-ref-isr.html#fig-compiler-view",
  "type": "Figure",
  "number": "8.3.8",
  "title": "",
  "body": " Why the flag must be volatile . The compiler compiles the ISR too — but no call to the ISR appears anywhere in the program, so when the optimizer builds main() (dashed boundary) it has no reason to think the flag can change mid-loop. The ISR's write happens at a moment the hardware chooses. volatile forbids the assumption and forces a fresh read at every use.   "
},
{
  "id": "subsec-timers-ref-family",
  "level": "1",
  "url": "subsec-timers-ref-family.html",
  "type": "Subsection",
  "number": "8.3.7",
  "title": "The Rest of the Timer Family",
  "body": " The Rest of the Timer Family  The STM32C031C6's five timers — TIM1, TIM3, TIM14, TIM16, TIM17 — share the counter\/prescaler\/auto-reload core this chapter taught, and differ in their additional capabilities. All five have capture\/compare channels, and with them all five — TIM14 included — can perform the two abilities that return later in the course: output compare can drive a pin high and low at programmed counts with no CPU involvement — that is PWM, which drives the motor chapters — and input capture can record the counter's value at the instant an input pin changes, which is how the tachometer will measure speed. The differences are in channel count and extras: TIM14 has one channel and is the simplest; TIM16 and TIM17 have one channel each plus complementary outputs; TIM3 has four independent channels; TIM1 adds advanced control features such as complementary outputs with dead-time insertion. In the vector table (RM0490 §11.3, Table 40), TIM14 is position 19, TIM16 is 21, and TIM17 is 22; TIM1 has two vectors (13 and 14), and TIM3 has one (16).  "
},
{
  "id": "subsec-timers-ref-family-2",
  "level": "2",
  "url": "subsec-timers-ref-family.html#subsec-timers-ref-family-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "output compare input capture "
},
{
  "id": "subsec-gpio-missed-press",
  "level": "1",
  "url": "subsec-gpio-missed-press.html",
  "type": "Subsection",
  "number": "9.1.1",
  "title": "The Press That Nobody Saw",
  "body": " The Press That Nobody Saw  In the Lab 2 button-race game, two players each had a button, and the game had to detect the first press after a countdown. The countdown was made of delays, and while the program was stuck in such a delay, it was not looking at the buttons. A player who pressed and released during a delay pressed a button that, as far as the program was concerned, was never pressed at all.  This is not a bug in the game and it cannot be fixed using the tools we had at that point. A polling loop reads the pin's current level , so it can only see a press that is still happening at the moment it looks. One work-around was to make the delay shorter, thereby narrowing the window, but the problem never vanishes entirely — and you pay for the narrowing with a loop that does nothing but ask. We made the same argument about timekeeping and answered it by moving the counting into hardware. The answer here is the same in shape: let the hardware watch the pin, and have it tell the CPU when something happened.  What we want is a program that notices the press whenever it occurs — including in the middle of a delay, in the middle of a printf() , or in the middle of a single line of C. That is exactly what an interrupt is for.  "
},
{
  "id": "subsec-gpio-other-sources",
  "level": "1",
  "url": "subsec-gpio-other-sources.html",
  "type": "Subsection",
  "number": "9.1.2",
  "title": "Timers Are Not the Only Source",
  "body": " Timers Are Not the Only Source  A timer reaching its auto-reload value is one thing that can request an interrupt on the STM32C031C6, and we used it last week. The chip can also interrupt on reset; on the watchdog timer, a circuit whose job is to notice that software has stopped responding and restart it; on the serial peripherals — USART, SPI, I2C — when a byte has arrived or a transmission has finished; on the ADC when a conversion completes; on the DMA controller, which moves blocks of data without the processor's involvement, when a transfer is done; and on the flash memory.  And finally, the chip can interrupt on a pin changing state — and that is this chapter's subject. GPIO interrupts need extra hardware, for a reason worth understanding before class.  "
},
{
  "id": "subsec-gpio-why-front-end",
  "level": "1",
  "url": "subsec-gpio-why-front-end.html",
  "type": "Subsection",
  "number": "9.1.3",
  "title": "Why a Pin’s Interrupt Needs a Front End",
  "body": " Why a Pin's Interrupt Needs a Front End  Every source in the list above is a single peripheral, and each one gets its own line into the NVIC — the Nested Vectored Interrupt Controller that we introduced last week as the intermediary between every interrupt source and the CPU. One peripheral, one line, one entry in the vector table. This concept does not carry over to interrupts from GPIO pins, because there are so many of them: the STM32C031C6 has 48. Giving every pin its own NVIC line would mean dozens of extra lines and dozens of extra vector-table entries for a chip on which almost all of them would sit unused.  So the pins do not have a direct line each to the NVIC. Instead, they go first to a separate block called the EXTI — the Extended Interrupt and Event Controller — which is best thought of as a switchboard. It accepts far more inputs than it has outputs, it can be told which inputs to listen to, it can be told what to listen for (a rising edge, a falling edge, or both), and it condenses everything it hears onto a small number of lines into the NVIC. Configuring a pin interrupt is therefore not one switch but several, because you have to tell the switchboard which pin, which edge, and whether to pass the result on at all.  In class we'll take this idea and explore the registers that we need to program in order to define the behavior we wish to see for our pin change interrupt. We'll also look at the consequences of condensing many pins onto few lines.  "
},
{
  "id": "subsec-gpio-why-front-end-2",
  "level": "2",
  "url": "subsec-gpio-why-front-end.html#subsec-gpio-why-front-end-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "NVIC "
},
{
  "id": "subsec-gpio-why-front-end-3",
  "level": "2",
  "url": "subsec-gpio-why-front-end.html#subsec-gpio-why-front-end-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "EXTI "
},
{
  "id": "rq-gpio-interrupts",
  "level": "1",
  "url": "rq-gpio-interrupts.html",
  "type": "Check Your Understanding",
  "number": "9.1.4",
  "title": "Check Your Understanding",
  "body": "  A program prints a counter, then calls delay_ms(1000) , then reads a button pin and resets the counter if the button is down — and repeats. A user presses and releases the button quickly, entirely within one of the delays. What does the program do?    Nothing — the counter keeps counting. By the time the program reads the pin, the button is back up, so the press is never seen.  Correct. Polling reads the pin's level at one instant per trip around the loop. A press that starts and ends between two of those instants leaves no trace for the program to find. This is the problem an interrupt solves: the hardware detects the change when it happens, not when the program next asks.    The counter resets on the next trip through the loop — the pin remembers that it was pulled LOW.  The input data register (IDR) reports what the pin's voltage is right now ; it has no memory of what the level used to be. Once the button is released and the pull-up has brought the pin back HIGH, reading IDR gives HIGH. A pending flag that remembers an edge is exactly what the EXTI adds, and that is this chapter's subject.    The counter resets, because delay_ms() checks for pin changes while it waits.  delay_ms() only counts time; it knows nothing about any pin. Nothing in the program is watching the button while the delay runs.    The program cannot compile — reading a pin after a delay is a race condition the compiler rejects.  The compiler has no idea what the pin means or how fast a person presses a button; this compiles and runs perfectly. The behavior is correct C and a disappointing user experience, which is a combination worth recognizing.      Why do GPIO pins connect to the EXTI rather than each having its own line into the NVIC, the way a timer or the ADC does?    There are far too many pins. Giving each one its own NVIC line and vector-table entry would cost dozens of both, nearly all unused in any given program.  Correct. One peripheral gets one line because there are only a handful of peripherals. Five ports of up to sixteen pins is a different scale entirely, so the pins are condensed onto a few shared lines first. The price of that condensing shows up in class, in the handler you write.    GPIO pins are slower than peripherals, so their interrupts must be buffered before the NVIC can accept them.  Speed is not the issue — an edge on a pin is if anything faster than a peripheral's status flag. The issue is how many pins there are relative to how many interrupt lines the NVIC has.    The NVIC cannot detect edges, only levels, so the EXTI converts a level into an interrupt.  The EXTI does detect edges, and that is genuinely one of its jobs — but it is not the reason pins are routed through it rather than being wired individually. Even if the NVIC could detect edges itself, there would still not be room for one line per pin.    Pins configured as outputs would otherwise interrupt the CPU every time software wrote to them.  Nothing about writing an output pin requests an interrupt. The routing question is about the number of inputs the interrupt controller would have to accommodate.      Compared with the TIM14_IRQHandler you wrote last week, what changes about the rules for an ISR when the interrupt comes from a pin instead of a timer?    Nothing. The name is different and it clears a different flag, but it still takes no arguments, returns nothing, must be named exactly, gets in and out fast, and shares state with main() only through a volatile variable.  Correct, and it is the reason this chapter is short. The mechanism does not know or care what raised the request — the CPU saves state, jumps to the address in the vector table, runs your function, and restores. Only the source changes.    A pin ISR may take the pin number as an argument, so that one handler can serve several pins.  Hardware is the caller, and hardware has no way to pass arguments — that constraint is unchanged. One handler does serve several pins on this chip, which is a real complication, but it learns which pin fired by reading a register, not by receiving a parameter.    A pin ISR does not need to clear anything, because releasing the button clears the request automatically.  Every interrupt source in this course latches a flag that software must clear, and a pin is no exception — the flag records that an edge happened , so the pin's present level cannot clear it. An ISR that returns without clearing is re-entered immediately.    Shared variables no longer need volatile , because a pin interrupt is asynchronous rather than periodic.  It is the other way around, if anything. volatile is needed because no call to the ISR appears anywhere in the program, so the compiler has no reason to believe the variable can change ( ). That is true of every ISR, whatever wakes it.     "
},
{
  "id": "rq-gpio-missed-press",
  "level": "2",
  "url": "rq-gpio-interrupts.html#rq-gpio-missed-press",
  "type": "Reading Question",
  "number": "9.1.4.1",
  "title": "",
  "body": " A program prints a counter, then calls delay_ms(1000) , then reads a button pin and resets the counter if the button is down — and repeats. A user presses and releases the button quickly, entirely within one of the delays. What does the program do?    Nothing — the counter keeps counting. By the time the program reads the pin, the button is back up, so the press is never seen.  Correct. Polling reads the pin's level at one instant per trip around the loop. A press that starts and ends between two of those instants leaves no trace for the program to find. This is the problem an interrupt solves: the hardware detects the change when it happens, not when the program next asks.    The counter resets on the next trip through the loop — the pin remembers that it was pulled LOW.  The input data register (IDR) reports what the pin's voltage is right now ; it has no memory of what the level used to be. Once the button is released and the pull-up has brought the pin back HIGH, reading IDR gives HIGH. A pending flag that remembers an edge is exactly what the EXTI adds, and that is this chapter's subject.    The counter resets, because delay_ms() checks for pin changes while it waits.  delay_ms() only counts time; it knows nothing about any pin. Nothing in the program is watching the button while the delay runs.    The program cannot compile — reading a pin after a delay is a race condition the compiler rejects.  The compiler has no idea what the pin means or how fast a person presses a button; this compiles and runs perfectly. The behavior is correct C and a disappointing user experience, which is a combination worth recognizing.    "
},
{
  "id": "rq-gpio-why-exti",
  "level": "2",
  "url": "rq-gpio-interrupts.html#rq-gpio-why-exti",
  "type": "Reading Question",
  "number": "9.1.4.2",
  "title": "",
  "body": " Why do GPIO pins connect to the EXTI rather than each having its own line into the NVIC, the way a timer or the ADC does?    There are far too many pins. Giving each one its own NVIC line and vector-table entry would cost dozens of both, nearly all unused in any given program.  Correct. One peripheral gets one line because there are only a handful of peripherals. Five ports of up to sixteen pins is a different scale entirely, so the pins are condensed onto a few shared lines first. The price of that condensing shows up in class, in the handler you write.    GPIO pins are slower than peripherals, so their interrupts must be buffered before the NVIC can accept them.  Speed is not the issue — an edge on a pin is if anything faster than a peripheral's status flag. The issue is how many pins there are relative to how many interrupt lines the NVIC has.    The NVIC cannot detect edges, only levels, so the EXTI converts a level into an interrupt.  The EXTI does detect edges, and that is genuinely one of its jobs — but it is not the reason pins are routed through it rather than being wired individually. Even if the NVIC could detect edges itself, there would still not be room for one line per pin.    Pins configured as outputs would otherwise interrupt the CPU every time software wrote to them.  Nothing about writing an output pin requests an interrupt. The routing question is about the number of inputs the interrupt controller would have to accommodate.    "
},
{
  "id": "rq-gpio-isr-rules",
  "level": "2",
  "url": "rq-gpio-interrupts.html#rq-gpio-isr-rules",
  "type": "Reading Question",
  "number": "9.1.4.3",
  "title": "",
  "body": " Compared with the TIM14_IRQHandler you wrote last week, what changes about the rules for an ISR when the interrupt comes from a pin instead of a timer?    Nothing. The name is different and it clears a different flag, but it still takes no arguments, returns nothing, must be named exactly, gets in and out fast, and shares state with main() only through a volatile variable.  Correct, and it is the reason this chapter is short. The mechanism does not know or care what raised the request — the CPU saves state, jumps to the address in the vector table, runs your function, and restores. Only the source changes.    A pin ISR may take the pin number as an argument, so that one handler can serve several pins.  Hardware is the caller, and hardware has no way to pass arguments — that constraint is unchanged. One handler does serve several pins on this chip, which is a real complication, but it learns which pin fired by reading a register, not by receiving a parameter.    A pin ISR does not need to clear anything, because releasing the button clears the request automatically.  Every interrupt source in this course latches a flag that software must clear, and a pin is no exception — the flag records that an edge happened , so the pin's present level cannot clear it. An ISR that returns without clearing is re-entered immediately.    Shared variables no longer need volatile , because a pin interrupt is asynchronous rather than periodic.  It is the other way around, if anything. volatile is needed because no call to the ISR appears anywhere in the program, so the compiler has no reason to believe the variable can change ( ). That is true of every ISR, whatever wakes it.    "
},
{
  "id": "subsec-day9-homework",
  "level": "1",
  "url": "subsec-day9-homework.html",
  "type": "Subsection",
  "number": "9.2.1",
  "title": "Part 1: Homework Review",
  "body": " Part 1: Homework Review  Last night's program gave ADCPot.c a heartbeat: the ADC keeps printing while a TIM14 interrupt blinks the on-board LED one-third of a second on, one-third of a second off. Compare your version with your neighbors' before we look at one on the projector.  One detail to notice and then leave alone. The hint was to toggle the LED directly in the ISR, so most solutions contain a line like GPIOA->ODR ^= LED; inside TIM14_IRQHandler — an ISR reaching into a peripheral register and changing it. Keep that line in mind. We come back to it at the end of class.   "
},
{
  "id": "subsec-day9-polled",
  "level": "1",
  "url": "subsec-day9-polled.html",
  "type": "Subsection",
  "number": "9.2.2",
  "title": "Part 2: The Press the Polled Counter Misses",
  "body": " Part 2: The Press the Polled Counter Misses  Before any code, confirm the hardware. You wired the button on PB4 with its internal pull-up earlier in the course and added the debouncing capacitor shortly after ( ), and a breadboard has been through several chapters since. The verification is the first task below, and it takes a minute: run a program that is known to work. If it does not, the fault is a wire and not your code — re-seat the button and the capacitor against the photo, and run it again. Still stuck? We're here to help!   counterResetButtonPolled.c prints a counter once a second and resets it when the button is down. The button read is the same one we used before — the pin is HIGH when the button is open and LOW when it is pressed, so pressed is (GPIOB->IDR & BUTTON_PIN) == 0 :  #include <stdio.h> #include \"ES28.h\" #include \"uart.h\" #define WAIT 1000000 #define MAXCOUNT 100 #define BUTTON_PIN (1U<<4) \/\/ Button on PB4 int main(void) { int counter = 0; int buttonPushed; uart2_init(); \/\/ initialize UART RCC->IOPENR |= RCC_IOPENR_GPIOBEN; \/\/ enable clock GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk; GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos); \/\/ input mode GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk; GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos); \/\/ pullup while(1) { printf(\"%x\\t%d\\r\\n\", counter, counter); delay_ms(1000); \/\/ kill time buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); \/\/ Poll (1 => pressed) if ( (buttonPushed) || (counter == MAXCOUNT) ) { counter = 0; \/\/ Reset the counter } else { counter++; } } return 1; }      Watch the Counter Miss a Press    counterResetButtonPolled.c is on Canvas. You will need Coolterm open to see the output.    Hardware first: check that PB4 still has its button and capacitor, placed as in .    Copy your TemplateProject to a new project named CounterResetButton , download counterResetButtonPolled.c , and put it in the project's Src folder. Build and flash it.    Also download counterResetButtonInt.c and put it in Src , then exclude it from the build for now (right-click → Resource Configurations → Exclude from Build ). We will work on it later.    Watch the counter change every second in Coolterm. Give the button a short tap. Then press and hold it for two seconds. Do both reset the counter?    Compare your observations with your table group: what did the program miss, and where in the program was it when it missed it?    A tap-and-hold works every time; a short tap works only if you are lucky enough to still be holding the button at the instant the loop reaches its one read of GPIOB->IDR . The program spends 1 second inside delay_ms() followed by one moment looking at the pin. Everything that happens during the 1 second delay is invisible to it.  "
},
{
  "id": "act-gpio-polled-run",
  "level": "2",
  "url": "subsec-day9-polled.html#act-gpio-polled-run",
  "type": "Activity",
  "number": "9.2.1",
  "title": "Watch the Counter Miss a Press.",
  "body": " Watch the Counter Miss a Press    counterResetButtonPolled.c is on Canvas. You will need Coolterm open to see the output.    Hardware first: check that PB4 still has its button and capacitor, placed as in .    Copy your TemplateProject to a new project named CounterResetButton , download counterResetButtonPolled.c , and put it in the project's Src folder. Build and flash it.    Also download counterResetButtonInt.c and put it in Src , then exclude it from the build for now (right-click → Resource Configurations → Exclude from Build ). We will work on it later.    Watch the counter change every second in Coolterm. Give the button a short tap. Then press and hold it for two seconds. Do both reset the counter?    Compare your observations with your table group: what did the program miss, and where in the program was it when it missed it?   "
},
{
  "id": "subsec-day9-exti-why",
  "level": "1",
  "url": "subsec-day9-exti-why.html",
  "type": "Subsection",
  "number": "9.2.3",
  "title": "Part 3: Why the EXTI Sits Between the Pin and the NVIC",
  "body": " Part 3: Why the EXTI Sits Between the Pin and the NVIC  The reading gave the reason: too many pins, not enough NVIC lines. is what that looks like in the hardware. Pin 0 of every port feeds one multiplexer whose output is called EXTI0; pin 1 of every port feeds another, EXTI1; and so on to EXTI15. Sixteen lines, one per pin number , and each of them can carry the signal from any one port — which means PA4, PB4, PC4 and PD4 all compete for EXTI4, and only one of them can have it at a time.   The EXTI's GPIO multiplexer (RM0490 §12.3.3). Pin of every port is an input to the multiplexer whose output is line EXTI , so there are sixteen lines rather than one per pin. Because each multiplexer has one output, only one port can be selected on a given line at a time: PB4 and PC4 cannot both interrupt through EXTI4.     Sixteen lines is a large reduction from forty-eight pins, and it is still more room than the NVIC has to give. Its vector table is shared with every other peripheral on the chip — the timers, the ADC, the USARTs, I2C — so the EXTI is allocated three positions in that table rather than sixteen, and the condensing therefore happens twice. The sixteen lines are grouped onto three interrupt requests: EXTI0 and EXTI1 raise IRQ5, EXTI2 and EXTI3 raise IRQ6, and EXTI4 through EXTI15 — twelve lines — all raise IRQ7.  Those three requests are the three vector-table entries. Look them up the same way we looked up TIM14 for the timer — RM0490 §11.3, Table 40 ( ) — and you find EXTI0_1 at position 5 with priority 12, EXTI2_3 at position 6 with priority 13, and EXTI4_15 at position 7 with priority 14. (The lower the priority number, the higher the priority.) Our button is on PB4, so it arrives on EXTI4, so it arrives at EXTI4_15_IRQHandler — the same function that would run for a pin on EXTI11. Part 5 deals with the consequence: the handler has to find out which line actually fired.    The three EXTI rows of RM0490's Table 40, the vector table. EXTI0_1 is position 5, EXTI2_3 is position 6, and EXTI4_15 — the one PB4 uses — is position 7, with priority 14 and vector address 0x0000_005C. Sixteen EXTI lines are served by these three entries. The naming rule is the one the timer used: take the acronym from this table and append _IRQn for the NVIC constant, or _IRQHandler for the function name.      Inside the EXTI block itself, the path from a pin to an interrupt request runs through four register-controlled stages ( ). The multiplexer picks the port. An edge-detection circuit decides whether this is an edge worth reacting to. A mask decides whether a detected edge is allowed to become an interrupt request at all. And a pending register records that it happened, so the request survives until software acknowledges it. Each stage is one register. The next two parts configure the first three; the fourth, the pending register, is the one your handler reads and clears, and it gets Part 5.   The EXTI's configurable-event trigger logic (RM0490 §12.3.1, Figure 24), annotated: the parts this course does not use are grayed out, and the path a button press takes is drawn in blue. The press enters the multiplexer, which EXTI_EXTICRx has pointed at port B; the asynchronous edge-detection circuit reacts to it according to EXTI_FTSR1 ; the AND gate passes it only if EXTI_IMR1 has unmasked the line; it is recorded in the pending request register EXTI_FPR1 ; and it leaves the EXTI as an IRQ , which is what reaches the NVIC inside the Cortex-M0+ at the bottom. Note the second, identical-looking AND gate and mask register above the blue path — the event path, EXTI_EMR1 , which this course does not use. The rest of the grayed-out machinery handles rising edges, software-triggered events, and waking the chip from a low-power state.      "
},
{
  "id": "fig-exti-mux",
  "level": "2",
  "url": "subsec-day9-exti-why.html#fig-exti-mux",
  "type": "Figure",
  "number": "9.2.2",
  "title": "",
  "body": " The EXTI's GPIO multiplexer (RM0490 §12.3.3). Pin of every port is an input to the multiplexer whose output is line EXTI , so there are sixteen lines rather than one per pin. Because each multiplexer has one output, only one port can be selected on a given line at a time: PB4 and PC4 cannot both interrupt through EXTI4.   "
},
{
  "id": "fig-vector-table-exti",
  "level": "2",
  "url": "subsec-day9-exti-why.html#fig-vector-table-exti",
  "type": "Figure",
  "number": "9.2.3",
  "title": "",
  "body": " The three EXTI rows of RM0490's Table 40, the vector table. EXTI0_1 is position 5, EXTI2_3 is position 6, and EXTI4_15 — the one PB4 uses — is position 7, with priority 14 and vector address 0x0000_005C. Sixteen EXTI lines are served by these three entries. The naming rule is the one the timer used: take the acronym from this table and append _IRQn for the NVIC constant, or _IRQHandler for the function name.   "
},
{
  "id": "fig-exti-signal-path",
  "level": "2",
  "url": "subsec-day9-exti-why.html#fig-exti-signal-path",
  "type": "Figure",
  "number": "9.2.5",
  "title": "",
  "body": " The EXTI's configurable-event trigger logic (RM0490 §12.3.1, Figure 24), annotated: the parts this course does not use are grayed out, and the path a button press takes is drawn in blue. The press enters the multiplexer, which EXTI_EXTICRx has pointed at port B; the asynchronous edge-detection circuit reacts to it according to EXTI_FTSR1 ; the AND gate passes it only if EXTI_IMR1 has unmasked the line; it is recorded in the pending request register EXTI_FPR1 ; and it leaves the EXTI as an IRQ , which is what reaches the NVIC inside the Cortex-M0+ at the bottom. Note the second, identical-looking AND gate and mask register above the blue path — the event path, EXTI_EMR1 , which this course does not use. The rest of the grayed-out machinery handles rising edges, software-triggered events, and waking the chip from a low-power state.   "
},
{
  "id": "subsec-day9-exticr",
  "level": "1",
  "url": "subsec-day9-exticr.html",
  "type": "Subsection",
  "number": "9.2.4",
  "title": "Part 4a: Choosing the Port — EXTI_EXTICR2",
  "body": " Part 4a: Choosing the Port — EXTI_EXTICR2  PB4 has to win the competition for line EXTI4, and the register that decides it is EXTI_EXTICR2 . There are four of these registers between them covering all sixteen lines, four lines to a register; the one that holds EXTI4 is the second, and how the four are laid out and addressed is in for when you need it. What you need now is on one page of the reference manual: which byte of EXTI_EXTICR2 belongs to line EXTI4, and what code selects a port.     Which Register, Which Byte, Which Code   Open the reference manual, RM0490 §12.5.6, EXTI external interrupt selection register . Everything below is on that page.    The same page lists the code for each port. What value selects port B? What would select port C, and what does the value 0x04 select?    The device header declares the four registers as a C array, EXTI->EXTICR[ ] . If the reference manual calls yours EXTI_EXTICR2 , what index do you write in C?    Working it through: the four fields of EXTI_EXTICR2 are EXTI4, EXTI5, EXTI6 and EXTI7, lowest byte first, so line EXTI4 is bits [7:0]. The port codes on that page are 0x00 for PA, 0x01 for PB, 0x02 for PC, 0x03 for PD and 0x05 for PF; 0x04 is reserved, because this package has no port E. And the array index is one , not two: the reference manual numbers its registers from 1 and C numbers array elements from 0, so EXTI_EXTICR1 through EXTI_EXTICR4 are EXTI->EXTICR[0] through EXTI->EXTICR[3] . This is a genuinely easy slip to make and it produces a program that builds cleanly and never interrupts.   EXTI_EXTICR2 with the four lines it controls named — EXTI4 in bits [7:0], then EXTI5, EXTI6 and EXTI7 — and port B's code, 0x01, written into the EXTI4 field. The eight bits shown as 0 0 0 0 0 0 0 1 are that byte, read from bit 7 down to bit 0: bit 0 set, the rest clear.    In code it is the clear-then-set pair you have written many times, using the mask and position macros from the device header and the port constant from ES28.h :  EXTI->EXTICR[1] &= ~EXTI_EXTICR2_EXTI4_Msk; \/\/ clear the EXTI4 field EXTI->EXTICR[1] |= (EXTI_PB << EXTI_EXTICR2_EXTI4_Pos); \/\/ select port B    "
},
{
  "id": "act-gpio-exticr-lookup",
  "level": "2",
  "url": "subsec-day9-exticr.html#act-gpio-exticr-lookup",
  "type": "Activity",
  "number": "9.2.2",
  "title": "Which Register, Which Byte, Which Code.",
  "body": " Which Register, Which Byte, Which Code   Open the reference manual, RM0490 §12.5.6, EXTI external interrupt selection register . Everything below is on that page.    The same page lists the code for each port. What value selects port B? What would select port C, and what does the value 0x04 select?    The device header declares the four registers as a C array, EXTI->EXTICR[ ] . If the reference manual calls yours EXTI_EXTICR2 , what index do you write in C?   "
},
{
  "id": "fig-exticr2-portb",
  "level": "2",
  "url": "subsec-day9-exticr.html#fig-exticr2-portb",
  "type": "Figure",
  "number": "9.2.8",
  "title": "",
  "body": " EXTI_EXTICR2 with the four lines it controls named — EXTI4 in bits [7:0], then EXTI5, EXTI6 and EXTI7 — and port B's code, 0x01, written into the EXTI4 field. The eight bits shown as 0 0 0 0 0 0 0 1 are that byte, read from bit 7 down to bit 0: bit 0 set, the rest clear.   "
},
{
  "id": "subsec-day9-ftsr-imr-nvic",
  "level": "1",
  "url": "subsec-day9-ftsr-imr-nvic.html",
  "type": "Subsection",
  "number": "9.2.5",
  "title": "Part 4b: The Edge, the Mask, and the NVIC",
  "body": " Part 4b: The Edge, the Mask, and the NVIC  Three steps remain, and after Part 4a they are a relief: each is a single bit, and the bit number is the line number.   Which edge. The button pin idles HIGH and goes LOW when pressed, so the press is a falling edge and the release is a rising one. We want the press, so we set bit 4 of the falling-trigger register ( ). There is a matching EXTI_RTSR1 for rising edges; setting the same bit in both would interrupt on press and release, which some designs want and this one does not.   EXTI_FTSR1 , the falling trigger selection register (RM0490 §12.5.2, offset 0x004). One bit per line, FT0 through FT15 , each read-write: 1 enables falling-edge detection on that line, 0 disables it. Setting FT4 is what makes a press on PB4 an event at all.     Whether it may interrupt. Detecting an edge and requesting an interrupt are deliberately separate in this hardware, and the interrupt mask register is the second switch ( ). A line whose mask bit is 0 is seen by the edge-detection circuit and goes no further: RM0490 §12.4 sets the pending bit only for an unmasked line, so a masked line leaves nothing behind in EXTI_FPR1 either. The separation buys three things. The same detected edge can be routed to the EXTI's event output instead of its interrupt output, through EXTI_EMR1 . A source can be switched off and back on with one bit without disturbing its trigger configuration. And a low-power design can choose which pins are allowed to wake the chip. We want the interrupt, so we set bit 4.   EXTI_IMR1 , the CPU wakeup with interrupt mask register (RM0490 §12.5.7, offset 0x080). One bit per line: 1 lets a detected event on that line request an interrupt, 0 masks it. Every GPIO line — IM0 through IM15 — is masked at reset, so an unset bit here is the quietest possible bug: the edge is detected, nothing is recorded in EXTI_FPR1 , and nothing ever happens. (The reset value is 0xFFF8 0000: the direct peripheral lines 19, 23, 25 and 31 are unmasked at reset, which is why the top of the register is not all zeros.)       Whether the NVIC will listen. This is the timer's second enable, unchanged. The CMSIS function takes the constant built from Table 40's acronym, and for us that is the row covering lines 4 through 15:  EXTI->FTSR1 |= EXTI_FTSR1_FT4; \/\/ falling edge on line EXTI4 EXTI->IMR1 |= EXTI_IMR1_IM4; \/\/ unmask line EXTI4 NVIC_EnableIRQ(EXTI4_15_IRQn); \/\/ let the request reach the CPU  That is the whole configuration. Four things have to be true before a press on PB4 reaches your handler: port B is selected on line EXTI4 ( EXTI_EXTICR2 ), a falling edge counts as an event ( EXTI_FTSR1 ), the line is unmasked so the event may become a request ( EXTI_IMR1 ), and the NVIC is willing to deliver it ( NVIC_EnableIRQ() ). Forget any one of them and there is no error, no warning, and no interrupt.  Assembled, with the pin configuration you already have in front of it, this is the whole initialization:  void pb4_exti_init(void) { __disable_irq(); \/\/ disable global interrupts RCC->IOPENR |= RCC_IOPENR_GPIOBEN; \/\/ Enable clock access to GPIOB GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk; \/\/ Configure PB4 as input pin GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos); GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk; \/\/ enable pull-up for PB4 GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos); EXTI->EXTICR[1] &= ~EXTI_EXTICR2_EXTI4_Msk; \/\/ Configure EXTICR2, EXTI->EXTICR[1] |= (EXTI_PB << EXTI_EXTICR2_EXTI4_Pos); \/\/ accessed as EXTICR[1] EXTI->FTSR1 |= EXTI_FTSR1_FT4; \/\/ Falling edge trigger for line EXTI4 EXTI->IMR1 |= EXTI_IMR1_IM4; \/\/ Unmask line EXTI4 NVIC_EnableIRQ(EXTI4_15_IRQn); \/\/ Enable EXTI4 line in NVIC __enable_irq(); \/\/ Enable global interrupts }    "
},
{
  "id": "subsec-day9-ftsr-imr-nvic-3",
  "level": "2",
  "url": "subsec-day9-ftsr-imr-nvic.html#subsec-day9-ftsr-imr-nvic-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "falling edge "
},
{
  "id": "fig-exti-ftsr1",
  "level": "2",
  "url": "subsec-day9-ftsr-imr-nvic.html#fig-exti-ftsr1",
  "type": "Figure",
  "number": "9.2.10",
  "title": "",
  "body": " EXTI_FTSR1 , the falling trigger selection register (RM0490 §12.5.2, offset 0x004). One bit per line, FT0 through FT15 , each read-write: 1 enables falling-edge detection on that line, 0 disables it. Setting FT4 is what makes a press on PB4 an event at all.   "
},
{
  "id": "fig-exti-imr1",
  "level": "2",
  "url": "subsec-day9-ftsr-imr-nvic.html#fig-exti-imr1",
  "type": "Figure",
  "number": "9.2.11",
  "title": "",
  "body": " EXTI_IMR1 , the CPU wakeup with interrupt mask register (RM0490 §12.5.7, offset 0x080). One bit per line: 1 lets a detected event on that line request an interrupt, 0 masks it. Every GPIO line — IM0 through IM15 — is masked at reset, so an unset bit here is the quietest possible bug: the edge is detected, nothing is recorded in EXTI_FPR1 , and nothing ever happens. (The reset value is 0xFFF8 0000: the direct peripheral lines 19, 23, 25 and 31 are unmasked at reset, which is why the top of the register is not all zeros.)   "
},
{
  "id": "subsec-day9-isr",
  "level": "1",
  "url": "subsec-day9-isr.html",
  "type": "Subsection",
  "number": "9.2.6",
  "title": "Part 5: The Handler — Which Line Fired, and How to Clear It",
  "body": " Part 5: The Handler — Which Line Fired, and How to Clear It  Twelve lines share EXTI4_15_IRQHandler , so the handler's first job is to find out what it was called for. The EXTI records each detected falling edge in the falling edge pending register, EXTI_FPR1 , one bit per line ( ). Testing bit 4 answers the question.  Its second job is to clear that bit, and how to do that is a question you can now answer before looking. TIM14's flag was cleared by writing a 0 ; the ADC's flags were cleared by writing a 1 ; and the thing that decided which was the access type printed under the bit in the reference manual ( ).   Predict the Clear   Commit an answer before we look anything up.    To clear FPIF4 in EXTI->FPR1 , do you write a 1 to that bit or a 0? Write down your answer.    More useful than the answer: what would you look up to find out? Name the document, the section, and the thing on the page you would read.    Now check. RM0490 §12.5.5, EXTI falling edge pending register 1 .    The access type under every FPIF bit is rc_w1 , and the text says it in words: Each bit is cleared by writing 1 into it. So this flag behaves like the ADC's flags and unlike the timer's, and the clearing mask carries a 1 at our bit and 0s everywhere else. Written as an assignment, not a compound assignment, for the reason we established with the timer. On a write-1-to-clear register the read returns a 1 at every flag that is already set, and writing those 1s back clears every one of them — including lines your handler was not called for. Assign the single-bit mask instead.   EXTI_FPR1 , the falling edge pending register (RM0490 §12.5.5, offset 0x010). One bit per line, FPIF0 through FPIF15 : hardware sets the bit when a falling edge is detected on that line, and the access type rc_w1 under every bit means software clears it by writing a 1. Writing a 0 has no effect. This is the same convention as the ADC's flags and the opposite of TIM14_SR .      That gives the handler. It checks which line, clears the flag, sets a flag of its own, and leaves — the timer handler's shape exactly, with a test in front of it:  \/\/ Interrupt service routine for the User button void EXTI4_15_IRQHandler(void){ __disable_irq(); \/\/ disable global interrupts if (EXTI->FPR1 & EXTI_FPR1_FPIF4) { \/\/ a falling-edge event happened on EXTI4 EXTI->FPR1 = EXTI_FPR1_FPIF4; \/\/ Clear the pending flag by writing 1 buttonPushed = 1; } __enable_irq(); \/\/ Enable global interrupts }  An ISR that returned without clearing FPR1 would be re-entered the moment it returned, forever: the pending bit is still set, so the request is still outstanding. The symptom is a program that appears to hang, and it is worth recognizing because the cause is one missing line.  The variable it sets is shared between the handler and main() , so it carries the keyword whose reason we saw with the timer — no call to this function appears anywhere in the program, so the compiler has no evidence the variable ever changes and is entitled to assume it does not ( ):  volatile int buttonPushed; \/\/ written by the ISR, read by main()   "
},
{
  "id": "act-gpio-fpr-predict",
  "level": "2",
  "url": "subsec-day9-isr.html#act-gpio-fpr-predict",
  "type": "Activity",
  "number": "9.2.3",
  "title": "Predict the Clear.",
  "body": " Predict the Clear   Commit an answer before we look anything up.    To clear FPIF4 in EXTI->FPR1 , do you write a 1 to that bit or a 0? Write down your answer.    More useful than the answer: what would you look up to find out? Name the document, the section, and the thing on the page you would read.    Now check. RM0490 §12.5.5, EXTI falling edge pending register 1 .   "
},
{
  "id": "fig-exti-fpr1",
  "level": "2",
  "url": "subsec-day9-isr.html#fig-exti-fpr1",
  "type": "Figure",
  "number": "9.2.12",
  "title": "",
  "body": " EXTI_FPR1 , the falling edge pending register (RM0490 §12.5.5, offset 0x010). One bit per line, FPIF0 through FPIF15 : hardware sets the bit when a falling edge is detected on that line, and the access type rc_w1 under every bit means software clears it by writing a 1. Writing a 0 has no effect. This is the same convention as the ADC's flags and the opposite of TIM14_SR .   "
},
{
  "id": "subsec-day9-code",
  "level": "1",
  "url": "subsec-day9-code.html",
  "type": "Subsection",
  "number": "9.2.7",
  "title": "Part 6: Writing counterResetButtonInt.c",
  "body": " Part 6: Writing counterResetButtonInt.c  Now assemble it. The skeleton is the polled program with its button handling moved out of the loop: the delay stays, the printing stays, and the pin is never read in main() again.  \/* * counterResetButtonInt.c -- reset a counter from a PB4 falling-edge interrupt * * Three blanks to fill in. Everything you need was in Parts 4 and 5: * * TODO 1 the four EXTI\/NVIC steps port, edge, mask, NVIC * TODO 2 the handler itself exact name from Table 40 * TODO 3 the shared flag one keyword matters *\/ #include <stdio.h> #include \"ES28.h\" #include \"uart.h\" #define MAXCOUNT 100 void pb4_exti_init(void); \/\/ TODO 3a -- declare the flag the ISR shares with main. \/\/ Which keyword must the declaration carry, and why? int main(void) { int counter = 0; uart2_init(); printf(\"Hex \\tDecimal\\r\\n\"); pb4_exti_init(); \/\/ TODO 3b -- initialize the flag ... while(1) { printf(\"%x\\t%d\\r\\n\", counter, counter); delay_ms(1000); \/\/ TODO 3c -- fill in the test: when the flag is set, reset the counter \/\/ and clear the flag. One chain, so a press does not reset \/\/ and then immediately increment. \/\/ GPIOB->IDR appears NOWHERE in this loop. if ( \/* TODO 3c *\/ ) { } else if (counter == MAXCOUNT) { counter = 0; } else { counter++; } } return 1; } void pb4_exti_init(void) { __disable_irq(); \/\/ given: no interrupts during setup RCC->IOPENR |= RCC_IOPENR_GPIOBEN; \/\/ given: the pin configuration you already have GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk; GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos); GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk; GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos); \/\/ TODO 1a -- select port B on line EXTI4. Two lines: clear the field, \/\/ then set it. Mind the array index. \/\/ TODO 1b -- falling edge on line EXTI4 \/\/ TODO 1c -- unmask line EXTI4 \/\/ TODO 1d -- enable the line in the NVIC __enable_irq(); \/\/ given: setup done, interrupts on } \/\/ TODO 2 -- write the ISR. Its name comes from Table 40's acronym for the row \/\/ covering lines 4 to 15; copy it from the startup file rather than \/\/ typing it. No arguments, no return value. Inside, bracketed by \/\/ __disable_irq(); ... __enable_irq(); do three things: check that \/\/ the event was on line 4, clear that pending bit, set your flag.    Give the Counter a Button It Cannot Miss   The skeleton is on Canvas as counterResetButtonInt.c , and it is already in your Src folder from Part 2.    Swap the build: exclude counterResetButtonPolled.c ( Resource Configurations → Exclude from Build , Select All , OK) and make sure counterResetButtonInt.c is not excluded. Two main() s cannot coexist in one build.    Before you build: of the four steps, which single one could you leave out and still get a program that compiles and links with no warnings and never interrupts? Write down which, and what you would see on the terminal. More than one answer is defensible — say why yours is.    Fill TODO 1: the four steps, in order — port, edge, mask, NVIC.    Fill TODO 2: the handler, with its name copied from the startup file.    Fill TODO 3: the flag — declared, initialized, and consumed in the loop.    Build, flash, and give the button the same short tap that the polled version missed. Try tapping it several times during a single one-second interval.    Done early? Add the Nucleo's blue user button, on PC13, so that pressing it reverses the counting direction. PC13 is also on lines 4 to 15, so it shares your handler — which means the handler now has to tell the two apart. You will need a second initialization function, and a second field in a different EXTICR register.     Counter not resetting? Walk these in order; each rules out a layer.   Does the polled version still work? Swap the build back for a moment. If it does, the wiring is fine and the fault is somewhere in the interrupt path. If it does not — or if you were handed a working file at the checkpoint and never saw it count on your own board — the fault is the button or the capacitor. Re-seat both against , run the polled version again, and flag it if it still does not count. No amount of reading your EXTI code will find a loose wire.  Is the port selection in EXTI->EXTICR[1] — index one — and is the value EXTI_PB shifted into the EXTI4 field? A port code left at 0 selects port A, which is a pin you are not pressing.  Is the handler named exactly  EXTI4_15_IRQHandler , copied from startup_stm32c031c6tx.s ? A near-miss name builds and links without a single warning, and your function simply never runs.  Are all four steps present — EXTICR, FTSR1, IMR1, and NVIC_EnableIRQ() ? Missing any one is silence, and missing the mask is the quietest of them.   One thing you may see now that polling hid. A mechanical switch does not make one clean transition; its contacts bounce, which you captured on the oscilloscope earlier ( ). Polling was immune to that, because it read a level that had long since settled. An edge-triggered interrupt is not reading a level — it fires on every falling edge it sees, and a bouncing contact can deliver several. The debouncing capacitor is what keeps that from happening here. If your counter ever jumps by more than one press's worth, look at the capacitor before you look at the code.        "
},
{
  "id": "act-gpio-interrupt",
  "level": "2",
  "url": "subsec-day9-code.html#act-gpio-interrupt",
  "type": "Activity",
  "number": "9.2.4",
  "title": "Give the Counter a Button It Cannot Miss.",
  "body": " Give the Counter a Button It Cannot Miss   The skeleton is on Canvas as counterResetButtonInt.c , and it is already in your Src folder from Part 2.    Swap the build: exclude counterResetButtonPolled.c ( Resource Configurations → Exclude from Build , Select All , OK) and make sure counterResetButtonInt.c is not excluded. Two main() s cannot coexist in one build.    Before you build: of the four steps, which single one could you leave out and still get a program that compiles and links with no warnings and never interrupts? Write down which, and what you would see on the terminal. More than one answer is defensible — say why yours is.    Fill TODO 1: the four steps, in order — port, edge, mask, NVIC.    Fill TODO 2: the handler, with its name copied from the startup file.    Fill TODO 3: the flag — declared, initialized, and consumed in the loop.    Build, flash, and give the button the same short tap that the polled version missed. Try tapping it several times during a single one-second interval.    Done early? Add the Nucleo's blue user button, on PC13, so that pressing it reverses the counting direction. PC13 is also on lines 4 to 15, so it shares your handler — which means the handler now has to tell the two apart. You will need a second initialization function, and a second field in a different EXTICR register.   "
},
{
  "id": "subsec-day9-race",
  "level": "1",
  "url": "subsec-day9-race.html",
  "type": "Subsection",
  "number": "9.2.8",
  "title": "Part 7: Changing Data in an ISR, and GPIOx_BSRR",
  "body": " Part 7: Changing Data in an ISR, and GPIOx_BSRR  Here are two programs that solve the same problem — reset a counter when the button is pressed — and both of them work. The one on the left is six lines shorter, because it does the reset in the ISR instead of setting a flag for main() to act on.   volatile int counter; int main(void) { uart2_init(); pb4_exti_init(); counter = 0; while(1) { counter++; } return 1; } void EXTI4_15_IRQHandler(void){ if (EXTI->FPR1 & EXTI_FPR1_FPIF4) { EXTI->FPR1 = EXTI_FPR1_FPIF4; counter = 0; } }  volatile int buttonPushed; int main(void) { int counter = 0; uart2_init(); pb4_exti_init(); buttonPushed = 0; while(1) { if (buttonPushed) { counter = 0; buttonPushed = 0; } else { counter++; } } return 1; } void EXTI4_15_IRQHandler(void){ if (EXTI->FPR1 & EXTI_FPR1_FPIF4) { EXTI->FPR1 = EXTI_FPR1_FPIF4; buttonPushed = 1; } }     Which One Would You Ship?   There is no right answer yet — you are about to find out why the obvious one fails. Commit to one before we look.    Which of the two would you put in a product, and why? Write down one sentence of reasoning.    Whichever you chose: what, specifically, would have to go wrong for the other one to be the better choice?    The difference is not style. counter++ is one line of C and five instructions of machine code, and the machine code is where the problem lives:  0800013e: ldr r3, [pc, #12] ; load the ADDRESS of counter into r3 08000140: ldr r3, [r3, #0] ; load the VALUE of counter into r3 08000142: adds r2, r3, #1 ; r2 = r3 + 1 <-- interrupted HERE? 08000144: ldr r3, [pc, #4] ; load the address of counter again 08000146: str r2, [r3, #0] ; store r2 back into counter  The value of counter is fetched into a register, one is added to the copy, and the copy is written back. An interrupt can land between any two of those instructions. Suppose the button is pressed after the value has been fetched: the CPU stacks its state — including that register — runs the ISR, which sets counter to 0, and returns. The stacked state is restored, and execution resumes at the adds . The register still holds the old count. One is added to it. It is stored. The reset is gone , the counter continues from where it was, and nothing anywhere reports a problem.  The right-hand version cannot fail this way. Its ISR writes buttonPushed , a variable main() only ever stores to — buttonPushed = 0; is a single store, not a read-modify-write, so there is no stale copy sitting in a register waiting to be written back over the ISR's update. If the interrupt lands during the counter++ in the else branch, no harm is done: the flag is still set when the loop comes round again, and the reset happens one iteration late instead of never.  One window does remain: a second press arriving between if (buttonPushed) and buttonPushed = 0; sets the flag and then has it cleared by the line that was clearing the first press — so that press is coalesced with the one before it. Here that costs nothing: the counter was reset a moment earlier and would only have been reset again. But notice the difference in kind. The left-hand version corrupts a count ; this one merges two events into one , and the second failure is both milder and much easier to live with. It is also the shape to look for whenever a consumer clears a flag it did not test and clear in one indivisible step. says what closes it, and what that costs.  The moral is a distinction worth carrying out of this course. An ISR setting a control signal — a flag saying this happened — cannot corrupt it, because nothing else is mid-way through changing it; the worst it can do is merge two events, as above. An ISR changing data that the main program also changes is a different thing entirely, and it fails silently and rarely, which is the worst combination a bug can have. Be very careful about modifying shared data in an ISR; often the right answer is not to.    Now look back at Part 1. Last night's ISR contained GPIOA->ODR ^= LED; , and it worked. But ^= is a read-modify-write, exactly like counter++ : read ODR , flip one bit in the copy, write the whole register back. The reason it worked is that nothing else in that program touched ODR , so there was never anything to lose.  That assumption does not survive the next thing you build. In Lab 5, one of the additional features has a green LED lit while the temperature is below the set point, and a red LED flashing at 1 Hz once it is above — the flashing timed by a timer, the green driven from the main loop, and all three of the lab's LEDs on PA5, PA6 and PA7. One port, one ODR , two pieces of code writing it. Here is the shape of it, and it is worth reading slowly:  \/\/ in main(): \/\/ in the timer ISR: GPIOA->ODR |= GREEN; GPIOA->ODR ^= RED;  Both are read-modify-write on the same register. If the timer interrupt lands after main() has read ODR but before it writes back, the ISR's change to the red LED is present in the register and absent from the copy main() is holding — and main() 's write-back overwrites it. The red LED misses a toggle. Not every time; just sometimes, unrepeatably, which is why this is worth knowing before you spend an evening on it.  The fix is on a page you have been reading all term and have probably never read to the end of.    Find the Fix, Then Write It   Open RM0490 §6.4.6, GPIO port output data register — the ODR page.    Read the Note at the bottom of the ODR description. What does it tell you to use, and for what?    Follow it to §6.4.7. The register has two halves. What does writing a 1 to bit 5 do? What does writing a 1 to bit 21 do? What does writing a 0 to either do?    Read the access row under the bits. What can you learn by reading this register?    The CMSIS names for those two bits are GPIO_BSRR_BS5 and GPIO_BSRR_BR5 . Write the single line of C that turns PA5 on, and the single line that turns it off.    The note says: For atomic bit set\/reset, the OD bits can be individually set and\/or reset by writing to the GPIOx_BSRR register. The bit set\/reset register is thirty-two bits covering sixteen pins twice over: writing 1 to BSy in bits [15:0] sets pin 's output bit, and writing 1 to BRy in bits [31:16] clears it. Writing 0 anywhere does nothing at all. And both halves are write-only — a read always returns zero.  GPIOA->BSRR = GPIO_BSRR_BS5; \/\/ PA5 high -- one write, no read GPIOA->BSRR = GPIO_BSRR_BR5; \/\/ PA5 low -- one write, no read  That is what the manual's word atomic means here: the write happens whole or not at all, and nothing can land in the middle of it. That is the whole fix, and the reason it works is that there is nothing to lose. ODR |= GREEN has to read the register to preserve the other fifteen pins; BSRR = BS_green does not, because the bits it does not mention are bits it does not touch. There is no window between a read and a write-back, because there is no read. Two lines of code can now set some pins and clear others in one write and disturb no third pin.  One thing it does not do, said plainly so you are not surprised later. BSRR has no toggle : there is a set half and a clear half and nothing that inverts. An ISR that wants to flip a pin still has to know the pin's current state from somewhere, so BSRR does not rescue ODR ^= LED — it rescues the set and the clear.  What makes a toggle safe is keeping the pin's state in a variable that one side owns , and driving the pin with BSRR. This is the Lab 5 red LED, written the way that survives a green LED being driven from main() on the same port:  volatile int redOn = 0; \/\/ the ISR owns this; main() never writes it void TIM14_IRQHandler(void) { __disable_irq(); TIM14->SR = ~TIM_SR_UIF; redOn = !redOn; \/\/ flip our own copy of the state ... if (redOn) { GPIOA->BSRR = GPIO_BSRR_BS6; } \/\/ ... then one write: else { GPIOA->BSRR = GPIO_BSRR_BR6; } \/\/ set it, or clear it __enable_irq(); }  Nothing here reads ODR , so nothing here can lose main() 's green LED — and nothing in main() writes redOn , so nothing there can lose the red one. That is the moral from the start of this part arriving a second time, in hardware: control signals, not shared data. The remaining small print — what happens if you write a 1 to both BSy and BRy , and the GPIOx_BRR register that duplicates BSRR's upper half — is in .    "
},
{
  "id": "act-gpio-two-solutions",
  "level": "2",
  "url": "subsec-day9-race.html#act-gpio-two-solutions",
  "type": "Activity",
  "number": "9.2.5",
  "title": "Which One Would You Ship?",
  "body": " Which One Would You Ship?   There is no right answer yet — you are about to find out why the obvious one fails. Commit to one before we look.    Which of the two would you put in a product, and why? Write down one sentence of reasoning.    Whichever you chose: what, specifically, would have to go wrong for the other one to be the better choice?   "
},
{
  "id": "subsec-day9-race-8",
  "level": "2",
  "url": "subsec-day9-race.html#subsec-day9-race-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The reset is gone "
},
{
  "id": "subsec-day9-race-10",
  "level": "2",
  "url": "subsec-day9-race.html#subsec-day9-race-10",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "coalesced "
},
{
  "id": "subsec-day9-race-11",
  "level": "2",
  "url": "subsec-day9-race.html#subsec-day9-race-11",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "control signal data "
},
{
  "id": "act-gpio-bsrr",
  "level": "2",
  "url": "subsec-day9-race.html#act-gpio-bsrr",
  "type": "Activity",
  "number": "9.2.6",
  "title": "Find the Fix, Then Write It.",
  "body": " Find the Fix, Then Write It   Open RM0490 §6.4.6, GPIO port output data register — the ODR page.    Read the Note at the bottom of the ODR description. What does it tell you to use, and for what?    Follow it to §6.4.7. The register has two halves. What does writing a 1 to bit 5 do? What does writing a 1 to bit 21 do? What does writing a 0 to either do?    Read the access row under the bits. What can you learn by reading this register?    The CMSIS names for those two bits are GPIO_BSRR_BS5 and GPIO_BSRR_BR5 . Write the single line of C that turns PA5 on, and the single line that turns it off.   "
},
{
  "id": "subsec-day9-race-21",
  "level": "2",
  "url": "subsec-day9-race.html#subsec-day9-race-21",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "bit set\/reset register "
},
{
  "id": "subsec-day9-race-23",
  "level": "2",
  "url": "subsec-day9-race.html#subsec-day9-race-23",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "atomic "
},
{
  "id": "subsec-day9-next",
  "level": "1",
  "url": "subsec-day9-next.html",
  "type": "Subsection",
  "number": "9.2.9",
  "title": "Part 8: Before Next Class",
  "body": " Part 8: Before Next Class  Two interrupt sources in one program, and no blocking wait anywhere.   Homework: counterResetButtonIntTimer.c   Due on Thursday, uploaded to Canvas.    Modify counterResetButtonInt.c so that the one-second update comes from a TIM14 interrupt instead of delay_ms() . The program then has two interrupt sources — a timer and a pin — and a main loop that blocks on neither.    Also required: add an LED that you turn on at the top of the loop and off at the bottom, driven with GPIOA->BSRR rather than GPIOA->ODR . In one sentence: what does that buy you here, given what else is running?    Optional housekeeping, nothing to submit: move pb4_exti_init() — and pc13_exti_init() if you wrote it — into exti.c and exti.h , with an include guard, the header in Inc and the source in Src . Watch main.c shrink to the part that is actually about counting.    Also optional, and a head start on Lab 5: rewrite ADCPot.c to take a measurement every second from a timer interrupt rather than a delay. You will still poll the ADC to find out when the conversion is done; what goes away is the delay_ms() .     Next we'll change subject: I2C, a two-wire bus that lets one microcontroller talk to many devices. We start it in Wednesday's x-hour, and nothing from today is a prerequisite for it.  "
},
{
  "id": "act-gpio-homework",
  "level": "2",
  "url": "subsec-day9-next.html#act-gpio-homework",
  "type": "Activity",
  "number": "9.2.7",
  "title": "Homework: counterResetButtonIntTimer.c.",
  "body": " Homework: counterResetButtonIntTimer.c   Due on Thursday, uploaded to Canvas.    Modify counterResetButtonInt.c so that the one-second update comes from a TIM14 interrupt instead of delay_ms() . The program then has two interrupt sources — a timer and a pin — and a main loop that blocks on neither.    Also required: add an LED that you turn on at the top of the loop and off at the bottom, driven with GPIOA->BSRR rather than GPIOA->ODR . In one sentence: what does that buy you here, given what else is running?    Optional housekeeping, nothing to submit: move pb4_exti_init() — and pc13_exti_init() if you wrote it — into exti.c and exti.h , with an include guard, the header in Inc and the source in Src . Watch main.c shrink to the part that is actually about counting.    Also optional, and a head start on Lab 5: rewrite ADCPot.c to take a measurement every second from a timer interrupt rather than a delay. You will still poll the ADC to find out when the conversion is done; what goes away is the delay_ms() .   "
},
{
  "id": "subsec-gpio-ref-exticr",
  "level": "1",
  "url": "subsec-gpio-ref-exticr.html",
  "type": "Subsection",
  "number": "9.3.1",
  "title": "The Four EXTICR Registers, in General",
  "body": " The Four EXTICR Registers, in General  In class we used EXTI_EXTICR2 and read its four fields off the reference manual page. The general form, for a line other than EXTI4:   The EXTI_EXTICRx register as RM0490 §12.5.6 prints it. There is not one such register but four, at address offset for to , and each holds four eight-bit fields: EXTIm in bits [7:0], EXTIm+1 in [15:8], EXTIm+2 in [23:16] and EXTIm+3 in [31:24], where . Each field holds a code saying which port drives that line.    To find the register and byte for any line : the register number is , and the field within it is EXTIn at bits where . Checking it against the case we used, gives and — EXTI_EXTICR2 , bits [7:0], which is what we found by reading the page. In C the register is EXTI->EXTICR[x-1] .  The port codes are 0x00 for PA, 0x01 for PB, 0x02 for PC, 0x03 for PD and 0x05 for PF. 0x04 is reserved: no STM32C0 has a port E.  "
},
{
  "id": "fig-exticr-generic",
  "level": "2",
  "url": "subsec-gpio-ref-exticr.html#fig-exticr-generic",
  "type": "Figure",
  "number": "9.3.1",
  "title": "",
  "body": " The EXTI_EXTICRx register as RM0490 §12.5.6 prints it. There is not one such register but four, at address offset for to , and each holds four eight-bit fields: EXTIm in bits [7:0], EXTIm+1 in [15:8], EXTIm+2 in [23:16] and EXTIm+3 in [31:24], where . Each field holds a code saying which port drives that line.   "
},
{
  "id": "subsec-gpio-ref-registers",
  "level": "1",
  "url": "subsec-gpio-ref-registers.html",
  "type": "Subsection",
  "number": "9.3.2",
  "title": "Register Summary",
  "body": " Register Summary   The EXTI and GPIO registers used in this chapter         Register  Offset  Bit(s) used  Purpose  RM0490    EXTI_FTSR1  0x004  FT4  Falling trigger selection — 1 enables falling-edge detection on that line  §12.5.2    EXTI_RTSR1  0x000  RT  Rising trigger selection — the mirror of FTSR1; set both for any-edge detection  §12.5.1    EXTI_FPR1  0x010  FPIF4  Falling edge pending — set by hardware on a detected edge; rc_w1 , cleared by writing 1  §12.5.5    EXTI_EXTICRx  0x060 + 4( −1)  EXTI4[7:0]  Port selection — which port drives each line; four 8-bit fields per register  §12.5.6    EXTI_IMR1  0x080  IM4  Interrupt mask — 1 lets a detected event request an interrupt; masked at reset  §12.5.7    GPIOx_ODR  0x14  OD  Output data — read-write, so |= and ^= on it are read-modify-write  §6.4.6    GPIOx_BSRR  0x18  BS , BR  Bit set\/reset — write-only; 1 in [15:0] sets a pin, 1 in [31:16] clears it, 0 does nothing  §6.4.7    GPIOx_BRR  0x28  BR  Bit reset — write-only, and does exactly what BSRR's upper half does  §6.4.11     The three EXTI vectors, from RM0490 §11.3, Table 40: lines 0 and 1 are position 5, EXTI0_1 ; lines 2 and 3 are position 6, EXTI2_3 ; lines 4 through 15 are position 7, EXTI4_15 , at vector address 0x0000_005C. The CMSIS constant appends _IRQn to the acronym and the handler name appends _IRQHandler .  "
},
{
  "id": "table-exti-registers",
  "level": "2",
  "url": "subsec-gpio-ref-registers.html#table-exti-registers",
  "type": "Table",
  "number": "9.3.2",
  "title": "The EXTI and GPIO registers used in this chapter",
  "body": " The EXTI and GPIO registers used in this chapter         Register  Offset  Bit(s) used  Purpose  RM0490    EXTI_FTSR1  0x004  FT4  Falling trigger selection — 1 enables falling-edge detection on that line  §12.5.2    EXTI_RTSR1  0x000  RT  Rising trigger selection — the mirror of FTSR1; set both for any-edge detection  §12.5.1    EXTI_FPR1  0x010  FPIF4  Falling edge pending — set by hardware on a detected edge; rc_w1 , cleared by writing 1  §12.5.5    EXTI_EXTICRx  0x060 + 4( −1)  EXTI4[7:0]  Port selection — which port drives each line; four 8-bit fields per register  §12.5.6    EXTI_IMR1  0x080  IM4  Interrupt mask — 1 lets a detected event request an interrupt; masked at reset  §12.5.7    GPIOx_ODR  0x14  OD  Output data — read-write, so |= and ^= on it are read-modify-write  §6.4.6    GPIOx_BSRR  0x18  BS , BR  Bit set\/reset — write-only; 1 in [15:0] sets a pin, 1 in [31:16] clears it, 0 does nothing  §6.4.7    GPIOx_BRR  0x28  BR  Bit reset — write-only, and does exactly what BSRR's upper half does  §6.4.11    "
},
{
  "id": "subsec-gpio-ref-mask",
  "level": "1",
  "url": "subsec-gpio-ref-mask.html",
  "type": "Subsection",
  "number": "9.3.3",
  "title": "Why the Mask Is Separate From the Trigger",
  "body": " Why the Mask Is Separate From the Trigger  It would be simpler to have one bit per line meaning interrupt me on a falling edge , and the EXTI deliberately does not provide one. Detection is configured in EXTI_FTSR1 and EXTI_RTSR1 ; whether a detected event reaches the CPU is configured separately in EXTI_IMR1 . Three things follow from the split, and one thing does not.  The same edge can drive an event instead of an interrupt. The EXTI has two outputs, and shows both: the interrupt path this chapter uses, gated by EXTI_IMR1 , and a parallel event path gated by EXTI_EMR1 that signals the CPU's event input rather than requesting an interrupt. Masking the interrupt while unmasking the event is how a design gets a wake-up without a handler.  What the split does not give you is a way to poll the pending register on a masked line. RM0490 §12.3.1 is explicit — the pending register is only set for an unmasked interrupt — so if IM4 is 0, no falling edge on line 4 will ever set FPIF4 . A program that forgets the unmask does not quietly accumulate flags it could read later; it sees nothing at all, which is worth knowing when you are looking for the bug.  A program can change its mind cheaply . Masking a line is one bit and leaves the trigger configuration intact, so turning a source off temporarily does not mean rebuilding it.  And a low-power design can choose which pins are worth waking up for . That is why the register's full name in the reference manual is the CPU wakeup with interrupt mask register : in the STM32's stop modes the EXTI is what notices the outside world, and the mask decides which pins are allowed to bring the chip back.  "
},
{
  "id": "subsec-gpio-ref-odr-bsrr",
  "level": "1",
  "url": "subsec-gpio-ref-odr-bsrr.html",
  "type": "Subsection",
  "number": "9.3.4",
  "title": "ODR, BSRR, and the Pin’s Own Circuit",
  "body": " ODR, BSRR, and the Pin's Own Circuit   is the chip's own diagram of a single I\/O pin, and it puts this chapter's two topics in one picture. On the right are the pull-up and pull-down resistors that we configured through PUPDR and that hold PB4 HIGH when the button is open. Along the top, the input path leaves for on-chip peripherals, power control and EXTI — that branch is how a pin's level reaches the multiplexer in . And on the left, feeding the output data register, is a block labeled bit set\/reset registers : BSRR is not a shortcut layered on top of ODR in software, it is a second write port into the same output latches, built into the pin's circuit.   One GPIO pin, from RM0490 Figure 15. The output data register can be written directly or through the bit set\/reset registers (left); the input path is sampled into the input data register and also leaves for the EXTI (top left); and the pull-up and pull-down resistors, selected in PUPDR, are on the pin side (right). The Schmitt trigger in the input driver is what turns a slowly changing voltage — such as a debounced button's — into a clean logic level.    The rule of thumb: use ODR when the code writing it is the only code writing that port, and use BSRR when it is not — which, once you have interrupts, is more often than it used to be. BSRR costs nothing extra; a set or a clear is one store either way, and the read that |= and &= ~ need is the part that goes away.  "
},
{
  "id": "fig-gpio-input-driver",
  "level": "2",
  "url": "subsec-gpio-ref-odr-bsrr.html#fig-gpio-input-driver",
  "type": "Figure",
  "number": "9.3.3",
  "title": "",
  "body": " One GPIO pin, from RM0490 Figure 15. The output data register can be written directly or through the bit set\/reset registers (left); the input path is sampled into the input data register and also leaves for the EXTI (top left); and the pull-up and pull-down resistors, selected in PUPDR, are on the pin side (right). The Schmitt trigger in the input driver is what turns a slowly changing voltage — such as a debounced button's — into a clean logic level.   "
},
{
  "id": "subsec-gpio-ref-limits",
  "level": "1",
  "url": "subsec-gpio-ref-limits.html",
  "type": "Subsection",
  "number": "9.3.5",
  "title": "What These Rules Do and Do Not Cover",
  "body": " What These Rules Do and Do Not Cover  Part 7's argument is correct for the programs in this chapter, and three of its edges are worth drawing before you carry it somewhere else.   Word size. The claim that main() cannot be caught half-way through reading buttonPushed holds because buttonPushed is a plain int — a naturally aligned 32-bit value, which this compiler loads with a single LDR and stores with a single STR on this core, and the processor takes an interrupt only between instructions. Widen the variable and the argument stops holding: a uint64_t counter, or a struct holding a timestamp and a value, is loaded in pieces, and an ISR that writes it between those pieces leaves the reader with half of one update and half of another. The rule is not reads are safe ; it is a read the machine performs in one instruction is safe .   The consumer's window. The flag pattern removes the lost-update failure on the producing side and leaves a smaller one on the consuming side: a press arriving between if (buttonPushed) and buttonPushed = 0; is merged with the press being handled. If you need every event rather than the knowledge that at least one happened — counting presses instead of reacting to them — the test and the clear have to happen with no window between them, which on this chip means bracketing them with __disable_irq() and __enable_irq() .   What __disable_irq() buys, and what it costs. Every ISR in this chapter brackets its body with it, following the course's drivers, and it is worth being clear that this does not close the race Part 7 opens with. By the time the ISR's __disable_irq() executes, main() has already been interrupted mid-instruction-sequence; the damage is done by the return, not during the handler. What the bracket does is prevent another interrupt from being serviced while this one runs — and the price is that every other source waits. With one interrupt source that price is invisible. Tonight's homework puts two in one program, and from there on, the time spent inside a handler is time the other source is not being served. That is the trade production code makes deliberately, usually by masking only the specific interrupt that must not intervene rather than all of them.  "
},
{
  "id": "subsec-gpio-ref-bounce",
  "level": "1",
  "url": "subsec-gpio-ref-bounce.html",
  "type": "Subsection",
  "number": "9.3.6",
  "title": "Bounce, Now That Edges Matter",
  "body": " Bounce, Now That Edges Matter  Contact bounce was a nuisance for polling and is a correctness problem for edge-triggered interrupts. A polling loop reads a level, and by the time it looks again the contacts have long since settled, so bounce is invisible to it unless the loop is very fast. The EXTI's edge detector has no such luck: it fires on every falling edge, and an undebounced switch can deliver several within a few milliseconds. The result is one press that sets the pending flag repeatedly and one ISR that runs several times.  The hardware fix is the one already on your breadboard — the debouncing capacitor ( ), which slows the recovery enough that the voltage never climbs back above the input threshold during the bounce window. is what a debounced press looks like at the pin: one transition, 20 µs per division, no excursions. The software fix, when hardware debouncing is not an option, is for the ISR to record the time of the edge and ignore any further edge within a few tens of milliseconds — the same idea as the software debouncing we saw earlier, moved into the handler.   A debounced button press captured at the pin, 20 µs per division: a single clean fall from 3.3 V to 0 V with no excursions back above threshold. This is the edge the EXTI's detector sees, and it produces exactly one interrupt. Without the capacitor the same press can produce a burst of falling edges — and a burst of ISR calls. A second channel is shown offset below.    "
},
{
  "id": "fig-pb4-clean-edge",
  "level": "2",
  "url": "subsec-gpio-ref-bounce.html#fig-pb4-clean-edge",
  "type": "Figure",
  "number": "9.3.4",
  "title": "",
  "body": " A debounced button press captured at the pin, 20 µs per division: a single clean fall from 3.3 V to 0 V with no excursions back above threshold. This is the edge the EXTI's detector sees, and it produces exactly one interrupt. Without the capacitor the same press can produce a burst of falling edges — and a burst of ISR calls. A second channel is shown offset below.   "
},
{
  "id": "subsec-day9x-motivation",
  "level": "1",
  "url": "subsec-day9x-motivation.html",
  "type": "Subsection",
  "number": "10.1.1",
  "title": "Part 1: How Many Pins Would You Need?",
  "body": " Part 1: How Many Pins Would You Need?   is the display we are going to drive: four digits, each with seven segments and a decimal point, plus a colon between the middle two. Before reading on, write down two numbers. How many LEDs are in this display? And if each one had its own pin on the STM32C031C6, how many pins would that take?   The four-digit seven-segment display used in this course, mounted on an Adafruit HT16K33 backpack and shown with every segment lit. Four digits of seven segments each, four decimal points and a two-dot colon come to 34 LEDs. (The colon's two dots share a pin pair inside the display, so they always light together — 34 LEDs, 33 things you can switch.) The four header pins along the top edge — labeled +, −, D and C on the board — are the only connections it needs.    The count is 4 × 7 segments = 28, plus one decimal point per digit = 32, plus the colon's two dots = 34 LEDs . One pin each, except the two dots in the colon which share a pin, comes to 33 pins. The Nucleo's Arduino headers carry 22 pins — more are available via the morpho connectors, but using up 33 pins is clearly not a viable solution.  We'll wire the display with just four wires : power, ground, and the two wires of an I2C (Inter-Integrated Circuit) bus. A separate chip on the small board underneath the display — a backpack — takes commands from the STM32C0 over those two I2C wires via a special protocol and drives all 34 LEDs itself. We'll talk about the I2C protocol today and will examine how to talk to the backpack chip tomorrow.    "
},
{
  "id": "fig-display-photo",
  "level": "2",
  "url": "subsec-day9x-motivation.html#fig-display-photo",
  "type": "Figure",
  "number": "10.1.1",
  "title": "",
  "body": " The four-digit seven-segment display used in this course, mounted on an Adafruit HT16K33 backpack and shown with every segment lit. Four digits of seven segments each, four decimal points and a two-dot colon come to 34 LEDs. (The colon's two dots share a pin pair inside the display, so they always light together — 34 LEDs, 33 things you can switch.) The four header pins along the top edge — labeled +, −, D and C on the board — are the only connections it needs.   "
},
{
  "id": "subsec-day9x-motivation-4",
  "level": "2",
  "url": "subsec-day9x-motivation.html#subsec-day9x-motivation-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "34 LEDs 22 "
},
{
  "id": "subsec-day9x-motivation-5",
  "level": "2",
  "url": "subsec-day9x-motivation.html#subsec-day9x-motivation-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "four wires backpack "
},
{
  "id": "subsec-day9x-capture",
  "level": "1",
  "url": "subsec-day9x-capture.html",
  "type": "Subsection",
  "number": "10.1.2",
  "title": "Part 2: Wire It, and Light It",
  "body": " Part 2: Wire It, and Light It  We'll wire the display with four wires, flash one program, and get characters onto it. We'll bring the oscilloscope in afterwards, in , once there is something on the wires worth looking at.   Power first. The display's four connections are labeled on the board itself — + , − , D and C ( ). The backpack's pin header plugs into the breadboard, so each of the four wires goes into the breadboard column that pin lands in. + goes to your breadboard's power rail (which is fed by the Nucleo's 3.3 V pin), - to ground.  I2C needs pull-up resistors on SCL and SDA. The backpack has them built in, so we wire none ourselves.  Check the four wires against before you plug the Nucleo into USB. We have not tested what happens when + and − are swapped, so check the four wires rather than finding out.   The display and its backpack, unpowered, with the four connections labeled on the board itself: + (supply), − (ground), D (SDA, the data line) and C (SCL, the clock line). This is a bare board, photographed before its header was fitted; yours has a pin header soldered into those four holes and sits in the breadboard, so the wires go into the breadboard column each pin lands in rather than onto the board itself — and both show it that way round. The pull-up resistors that hold both lines HIGH are already on this board, so no external resistors are needed.    The two signal wires go to PB9 (SDA — serial data) and PB8 (SCL — serial clock) , which are D14 and D15 on the Arduino header. We'll see tomorrow why those two pins and not others. also shows the AD2 tapping the same two wires; we'll use the AD2 later in .   The full setup: Nucleo, display backpack and AD2 on one breadboard. Four wires run from the backpack — + to the Nucleo's 3.3 V pin, − to GND, D to PB9 (SDA) and C to PB8 (SCL). The AD2's channel 1 (orange) and channel 2 (blue) scope leads tap the SCL and SDA rows on the breadboard, with the white-striped minus leads at ground. Both signal lines are already pulled up on the backpack, so nothing else is needed to make the bus work.    The program is helloDisplay.c , and it is short because it uses the i2c.c library that we'll provide. Read it before you flash it to see its shape — we'll go through every line on Thursday. It sends the display three commands to wake it up, then ten bytes of data, and then a loop keeps one short transaction going.  Every I2C device has an address , and ours is 0x70 . The controller sends it first, so that the right device answers. The rest of the names below are the display chip's own commands, taken from the HT16K33's datasheet — we'll work out where the numbers come from tomorrow.  #include \"ES28.h\" #include \"i2c.h\" #define HT16K33_ADDR 0x70 \/\/ I2C address of our backpack controller #define HT16K33_SYSTEM_CMD 0x20 \/\/ system setup #define HT16K33_OSC_ON 0x01 #define HT16K33_DISPLAY_CMD 0x80 \/\/ display setup #define HT16K33_DISPLAY_ON 0x01 #define HT16K33_BLINK_OFF 0x00 #define HT16K33_BRIGHT_CMD 0xE0 \/\/ brightness, ORed with 0 to 15 #define HT16K33_ADDR_PTR 0x00 \/\/ display RAM address pointer int main(void) { uint8_t data = 0b0; \/\/ The hardware requires us to send some data, not important here. uint8_t display_buffer[10] = { 0b01110110, 0x00, \/\/ H 0b00111111, 0x00, \/\/ O 0x00, 0x00, \/\/ the colon, both dots off 0b00111000, 0x00, \/\/ L 0b01110111, 0x00 \/\/ A }; i2c1_init(); \/\/ Wake the display up, then fill its display RAM i2c1_byteWrite(HT16K33_ADDR, HT16K33_SYSTEM_CMD | HT16K33_OSC_ON); i2c1_byteWrite(HT16K33_ADDR, HT16K33_DISPLAY_CMD | HT16K33_DISPLAY_ON | HT16K33_BLINK_OFF); i2c1_byteWrite(HT16K33_ADDR, HT16K33_BRIGHT_CMD | 0x7); i2c1_memWrite(HT16K33_ADDR, HT16K33_ADDR_PTR, 10, display_buffer); \/\/ Keep one short transaction on the wire for the oscilloscope while(1) { i2c1_byteWrite(HT16K33_ADDR, data); delay_ms(250); } return 1; }  The three one-byte writes before the loop are commands to the HT16K33 (we'll understand them in more detail tomorrow). What is worth knowing now is the order. The first of the three turns the chip's oscillator on, and until it is running the HT16K33 accepts everything you send it and drives nothing at all — a display that has been sent the other two commands but not that one looks exactly like a display that is not plugged in.  The fourth call, i2c1_memWrite() , sends the ten bytes of display_buffer in one go. Ten bytes for four digits, because there are two per position and the colon has a position of its own; the odd-numbered bytes are 0 for a seven-segment digit, and we'll see on Thursday why they still have to be sent.  Then the loop, whose job is not to change anything. The display is already showing what it is going to show; the loop just keeps something on the bus for us to look at with the oscilloscope. I2C has no way to address a device without also sending it something, so the shortest thing you can put on the wire is a one-byte write, and the value does not matter here. The delay_ms(250) makes that happen once every 250 ms — four transactions a second, slow enough that a single sweep catches exactly one, which is what needs.   Wire the Display and Light It    i2c.c , i2c.h and helloDisplay.c are on Canvas.    Put i2c.c and i2c.h in your mylib folder, beside uart.c .    Copy your TemplateProject to a new project named SevenSegI2CFirstSteps , put helloDisplay.c in its Src folder, and build and flash. If the build fails, double-check that you have i2c.c and i2c.h in your mylib folder.    Read what the display says. Then, without changing anything yet: which lines of the program put it there, and which line is running now?     Display still dark? Work down this list in order. The second entry is why the wires are worth checking carefully before you look at the code.   The four wires. Re-seat all of them against : + on the 3.3 V pin, − on GND, D on PB9 and C on PB8. D and C swapped is the one that is hardest to see and easiest to do.  A display that never answers also stops the program. i2c1_byteWrite() waits for a flag the hardware does not set when nobody acknowledges, so the very first call never returns and none of the rest of the program runs. This will look the same as a display that was never sent anything — which is why correct wiring is the first thing to check. has the detail, and on Thursday we'll observe what actually happens when you try to talk to a device that's not answering.  Still stuck? We're here to help!        "
},
{
  "id": "subsec-day9x-capture-3",
  "level": "2",
  "url": "subsec-day9x-capture.html#subsec-day9x-capture-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Power first. "
},
{
  "id": "fig-backpack-pins",
  "level": "2",
  "url": "subsec-day9x-capture.html#fig-backpack-pins",
  "type": "Figure",
  "number": "10.1.3",
  "title": "",
  "body": " The display and its backpack, unpowered, with the four connections labeled on the board itself: + (supply), − (ground), D (SDA, the data line) and C (SCL, the clock line). This is a bare board, photographed before its header was fitted; yours has a pin header soldered into those four holes and sits in the breadboard, so the wires go into the breadboard column each pin lands in rather than onto the board itself — and both show it that way round. The pull-up resistors that hold both lines HIGH are already on this board, so no external resistors are needed.   "
},
{
  "id": "subsec-day9x-capture-7",
  "level": "2",
  "url": "subsec-day9x-capture.html#subsec-day9x-capture-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "PB9 (SDA — serial data) PB8 (SCL — serial clock) "
},
{
  "id": "fig-display-wiring",
  "level": "2",
  "url": "subsec-day9x-capture.html#fig-display-wiring",
  "type": "Figure",
  "number": "10.1.4",
  "title": "",
  "body": " The full setup: Nucleo, display backpack and AD2 on one breadboard. Four wires run from the backpack — + to the Nucleo's 3.3 V pin, − to GND, D to PB9 (SDA) and C to PB8 (SCL). The AD2's channel 1 (orange) and channel 2 (blue) scope leads tap the SCL and SDA rows on the breadboard, with the white-striped minus leads at ground. Both signal lines are already pulled up on the backpack, so nothing else is needed to make the bus work.   "
},
{
  "id": "subsec-day9x-capture-10",
  "level": "2",
  "url": "subsec-day9x-capture.html#subsec-day9x-capture-10",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "address "
},
{
  "id": "act-i2c-hello",
  "level": "2",
  "url": "subsec-day9x-capture.html#act-i2c-hello",
  "type": "Activity",
  "number": "10.1.1",
  "title": "Wire the Display and Light It.",
  "body": " Wire the Display and Light It    i2c.c , i2c.h and helloDisplay.c are on Canvas.    Put i2c.c and i2c.h in your mylib folder, beside uart.c .    Copy your TemplateProject to a new project named SevenSegI2CFirstSteps , put helloDisplay.c in its Src folder, and build and flash. If the build fails, double-check that you have i2c.c and i2c.h in your mylib folder.    Read what the display says. Then, without changing anything yet: which lines of the program put it there, and which line is running now?   "
},
{
  "id": "subsec-day9x-shared-clock",
  "level": "1",
  "url": "subsec-day9x-shared-clock.html",
  "type": "Subsection",
  "number": "10.1.3",
  "title": "Part 3a: How Did Two Wires Do That?",
  "body": " Part 3a: How Did Two Wires Do That?  Four characters are on your display, and two wires put them there. Next we'll work out what those two wires carried, and has the written version to read afterwards.  Recall the UART, which is another communication protocol that uses 2 wires only. The UART sends a byte down a wire, and the receiver recovers the bits by starting a timer at the start bit and sampling on a schedule both ends were configured for in advance — the baud rate. Nothing on the wire says where a bit ends, so get that rate wrong at either end and the frame comes out as garbage.  I2C uses up one of the two wires to make that agreement go away ( ). The controller drives a clock line, SCL , alongside the data line, SDA , and every device on the bus reads SDA while SCL is HIGH. No device has to know in advance how fast the bits will arrive, because the clock wire tells it. That is what synchronous means here: the clock is shared, not reconstructed independently at each receiver.   UART and I2C compared. On the left, UART: a separate transmit and receive line between exactly two devices, no clock, and a baud rate both ends must be configured for in advance — but each direction has its own wire, so both can be in use at once. On the right, I2C: one clock line (SCL) driven by the controller and one bidirectional data line (SDA), both held HIGH by pull-up resistors, with every device on the bus tapped onto the same two wires. Adding a device to the UART arrangement costs another pair of pins; adding one to the I2C bus costs none.       The other half of the difference is that the two wires are shared . Every I2C device is tapped onto the same SDA and the same SCL, which is what a bus is, and what it buys is that the wire count does not grow: a display, a temperature sensor and an accelerometer all connect to the same two wires. Both lines idle HIGH, held there by pull-up resistors — the ones already on your backpack — and a device can only ever pull a line LOW. To send a 1 it releases the line and lets the resistor bring it up.  Only one device may talk at a time, so I2C is half duplex where UART is full duplex. The whole bus runs at one speed, which has to be a speed every device on it can follow. And because every device hears every bit, each one needs an address — which is what the controller sends first, every single time. One device is in charge of all of this: the controller , our STM32C031C6, which generates the clock and starts every transaction. Everything else is a target , and a target only speaks when spoken to.  Our target is the display's backpack chip, and its address is HT16K33_ADDR (0x70), and it is the first thing you will find on the wire.  We use 100 kHz , which is Standard mode : essentially every I2C device supports it, which is why it is the safe default. Our chip can go a lot faster — 400 kHz (Fast mode) and 1 MHz (Fast-mode Plus) — and the devices that need those are the ones moving a lot of data, an EEPROM (a small non-volatile memory chip) being the usual example. A four-digit display sending ten bytes when the number changes is not one of them.    "
},
{
  "id": "subsec-day9x-shared-clock-4",
  "level": "2",
  "url": "subsec-day9x-shared-clock.html#subsec-day9x-shared-clock-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "clock SCL SDA synchronous "
},
{
  "id": "fig-uart-vs-i2c",
  "level": "2",
  "url": "subsec-day9x-shared-clock.html#fig-uart-vs-i2c",
  "type": "Figure",
  "number": "10.1.7",
  "title": "",
  "body": " UART and I2C compared. On the left, UART: a separate transmit and receive line between exactly two devices, no clock, and a baud rate both ends must be configured for in advance — but each direction has its own wire, so both can be in use at once. On the right, I2C: one clock line (SCL) driven by the controller and one bidirectional data line (SDA), both held HIGH by pull-up resistors, with every device on the bus tapped onto the same two wires. Adding a device to the UART arrangement costs another pair of pins; adding one to the I2C bus costs none.      "
},
{
  "id": "subsec-day9x-shared-clock-6",
  "level": "2",
  "url": "subsec-day9x-shared-clock.html#subsec-day9x-shared-clock-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "shared bus "
},
{
  "id": "subsec-day9x-shared-clock-7",
  "level": "2",
  "url": "subsec-day9x-shared-clock.html#subsec-day9x-shared-clock-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "half duplex address controller target "
},
{
  "id": "subsec-day9x-shared-clock-9",
  "level": "2",
  "url": "subsec-day9x-shared-clock.html#subsec-day9x-shared-clock-9",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "100 kHz Standard mode 400 kHz 1 MHz "
},
{
  "id": "subsec-day9x-protocol",
  "level": "1",
  "url": "subsec-day9x-protocol.html",
  "type": "Subsection",
  "number": "10.1.4",
  "title": "Part 3b: One Transaction, Measured",
  "body": " Part 3b: One Transaction, Measured  Here is what those two wires carried, field by field ( ).   One I2C message, field by field. It opens with a START condition and closes with a STOP, and between them the controller sends an address frame — seven address bits and the read\/write bit — followed by as many data frames of eight bits as it needs. Every frame is followed by a single ACK\/NACK bit from whichever device is receiving.     SCL and SDA idle high , because of the pull-ups. The controller asserts control by pulling SDA low while SCL is high — the START — and SCL starts running. It then transmits the device address, seven bits, followed by a 0 to command a write or a 1 to command a read. It lets go of the data line, and the peripheral that recognizes its address acknowledges by sending a 0 back: the ACK . Other devices on the bus do not respond, and if nobody responds at all the data line simply stays high, which is called a NACK . Then data bytes, each one acknowledged the same way, and finally the STOP : the controller returns SDA to high while SCL is high, and both lines go back to idle.   One question is left: if SDA is the line carrying the bits, how does a device tell a START from an ordinary 0 going by?  There is one rule: With the exception of START and STOP conditions, SDA is allowed to change only while SCL is LOW . So while SCL is HIGH, SDA holds still and is read by devices sampling the line. The protocol then takes the one thing that rule forbids and uses it to mark the edges of a transaction. A START condition is SDA going from HIGH to LOW while SCL is HIGH ; a STOP condition is SDA going from LOW to HIGH while SCL is HIGH. Neither can occur during normal data transfer, so neither can be mistaken for a bit, and every device on the bus recognizes them immediately.  One more piece. After the seven address bits and the R\/W bit the controller lets go of SDA and keeps clocking, and the device whose address matched pulls SDA LOW for that ninth pulse. That one-bit reply is the ACK . SDA staying HIGH is a NACK — nobody claimed that address — and every data byte after the address is acknowledged the same way, by whichever side is receiving.   The two exceptions, on the wire. SCL is above and SDA below, and the shaded bands mark the SCL LOW phases — the only times SDA is allowed to move. At the left SDA falls while SCL is still HIGH, which is the START condition; at the right it rises while SCL is HIGH, which is the STOP. Neither can happen during an ordinary data bit, which is what makes them unmistakable.     is the whole of it in one picture: START, seven address bits, the R\/W bit, ACK, a data byte, ACK, STOP.   One I2C write transaction. SCL (top) begins clocking once the START condition has occurred. SDA (bottom) shows the START — SDA falling while SCL is HIGH — then seven address bits and the R\/W bit, which for address 0x70 and a write are 1 1 1 0 0 0 0 followed by 0; then the ACK, with the addressed device pulling SDA LOW; then eight data bits, 0xAA = 10101010, most significant bit first; then a second ACK; and finally the STOP, SDA rising while SCL is HIGH. Receivers sample SDA during the SCL HIGH phase, and SDA may change only while SCL is LOW — the START and STOP conditions being the two deliberate exceptions.    The loop in helloDisplay.c is putting one of those on the wire four times a second, so all six parts of that diagram are visible when using an oscilloscope, which is what we'll do now.   The AD2 in oscilloscope mode, set up for this capture. The trigger is the part that matters: source Channel 2 , the one on SDA; type Edge ; condition Falling ; level 1 V. SDA idles HIGH and the first thing that happens in a transaction is SDA falling, so that setting catches the START. The time base is 25 µs per division with the position at 100 µs, which fits the whole transaction on screen, and the two channels are given different offsets — −4 V on channel 1, 500 mV on channel 2 — so the traces sit one above the other instead of on top of each other.     Capture a Transaction and Mark It Up   We'll now use the AD2 to look at the oscilloscope trace of the I2C transaction that is happening on SDA and SCL.    Double-check that your AD2 is wired as in picture , in oscilloscope mode: channel 1 (orange) on SCL, channel 2 (blue) on SDA, and both minus leads — the ones with the white stripe — to ground.    With your helloDisplay.c running, take a single sweep . Because of the 250 ms delay in the loop you are catching one transaction out of four per second, so the trigger is what matters: source Channel 2 (SDA), type Edge, condition Falling , level 1 V. SDA idles HIGH and falls at the START, so that setting catches it.    On your own trace, mark all six: the START, the seven address bits, the R\/W bit, the ACK, the data byte, and the STOP. Write down the eight bit values of that first byte — the seven address bits and the R\/W bit after them — in the order they go out.    How many clock pulses are in your capture, and why that many? Count them on the screen and verify with the protocol.    Two bytes went out in that transaction: the address byte and the data byte, which for this loop is 0x00 . Which eight clock pulses would change if you altered the data, and which if you altered the address?     Both channels sitting HIGH and nothing ever happening? The bus is idle and correctly pulled up; the scope has not triggered. In Waveforms' trigger panel, set the source to the channel on SDA and the condition to a falling edge, then arm a single sweep again. Nothing there is a wiring problem, and the display staying lit is the proof.     "
},
{
  "id": "fig-i2c-message-frame",
  "level": "2",
  "url": "subsec-day9x-protocol.html#fig-i2c-message-frame",
  "type": "Figure",
  "number": "10.1.9",
  "title": "",
  "body": " One I2C message, field by field. It opens with a START condition and closes with a STOP, and between them the controller sends an address frame — seven address bits and the read\/write bit — followed by as many data frames of eight bits as it needs. Every frame is followed by a single ACK\/NACK bit from whichever device is receiving.   "
},
{
  "id": "subsec-day9x-protocol-4",
  "level": "2",
  "url": "subsec-day9x-protocol.html#subsec-day9x-protocol-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "SCL and SDA idle high START ACK NACK STOP "
},
{
  "id": "subsec-day9x-protocol-7",
  "level": "2",
  "url": "subsec-day9x-protocol.html#subsec-day9x-protocol-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "SDA is allowed to change only while SCL is LOW START condition STOP condition "
},
{
  "id": "subsec-day9x-protocol-8",
  "level": "2",
  "url": "subsec-day9x-protocol.html#subsec-day9x-protocol-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "ACK NACK "
},
{
  "id": "fig-i2c-start-stop",
  "level": "2",
  "url": "subsec-day9x-protocol.html#fig-i2c-start-stop",
  "type": "Figure",
  "number": "10.1.10",
  "title": "",
  "body": " The two exceptions, on the wire. SCL is above and SDA below, and the shaded bands mark the SCL LOW phases — the only times SDA is allowed to move. At the left SDA falls while SCL is still HIGH, which is the START condition; at the right it rises while SCL is HIGH, which is the STOP. Neither can happen during an ordinary data bit, which is what makes them unmistakable.   "
},
{
  "id": "fig-i2c-frame-diagram",
  "level": "2",
  "url": "subsec-day9x-protocol.html#fig-i2c-frame-diagram",
  "type": "Figure",
  "number": "10.1.11",
  "title": "",
  "body": " One I2C write transaction. SCL (top) begins clocking once the START condition has occurred. SDA (bottom) shows the START — SDA falling while SCL is HIGH — then seven address bits and the R\/W bit, which for address 0x70 and a write are 1 1 1 0 0 0 0 followed by 0; then the ACK, with the addressed device pulling SDA LOW; then eight data bits, 0xAA = 10101010, most significant bit first; then a second ACK; and finally the STOP, SDA rising while SCL is HIGH. Receivers sample SDA during the SCL HIGH phase, and SDA may change only while SCL is LOW — the START and STOP conditions being the two deliberate exceptions.   "
},
{
  "id": "fig-scope-setup",
  "level": "2",
  "url": "subsec-day9x-protocol.html#fig-scope-setup",
  "type": "Figure",
  "number": "10.1.12",
  "title": "",
  "body": " The AD2 in oscilloscope mode, set up for this capture. The trigger is the part that matters: source Channel 2 , the one on SDA; type Edge ; condition Falling ; level 1 V. SDA idles HIGH and the first thing that happens in a transaction is SDA falling, so that setting catches the START. The time base is 25 µs per division with the position at 100 µs, which fits the whole transaction on screen, and the two channels are given different offsets — −4 V on channel 1, 500 mV on channel 2 — so the traces sit one above the other instead of on top of each other.   "
},
{
  "id": "act-i2c-capture",
  "level": "2",
  "url": "subsec-day9x-protocol.html#act-i2c-capture",
  "type": "Activity",
  "number": "10.1.2",
  "title": "Capture a Transaction and Mark It Up.",
  "body": " Capture a Transaction and Mark It Up   We'll now use the AD2 to look at the oscilloscope trace of the I2C transaction that is happening on SDA and SCL.    Double-check that your AD2 is wired as in picture , in oscilloscope mode: channel 1 (orange) on SCL, channel 2 (blue) on SDA, and both minus leads — the ones with the white stripe — to ground.    With your helloDisplay.c running, take a single sweep . Because of the 250 ms delay in the loop you are catching one transaction out of four per second, so the trigger is what matters: source Channel 2 (SDA), type Edge, condition Falling , level 1 V. SDA idles HIGH and falls at the START, so that setting catches it.    On your own trace, mark all six: the START, the seven address bits, the R\/W bit, the ACK, the data byte, and the STOP. Write down the eight bit values of that first byte — the seven address bits and the R\/W bit after them — in the order they go out.    How many clock pulses are in your capture, and why that many? Count them on the screen and verify with the protocol.    Two bytes went out in that transaction: the address byte and the data byte, which for this loop is 0x00 . Which eight clock pulses would change if you altered the data, and which if you altered the address?   "
},
{
  "id": "subsec-day9x-debrief",
  "level": "1",
  "url": "subsec-day9x-debrief.html",
  "type": "Subsection",
  "number": "10.1.5",
  "title": "Part 3c: Reading Your Own Trace",
  "body": " Part 3c: Reading Your Own Trace   is a capture of the transaction your loop is producing, and it should look like yours. Eighteen clock pulses: nine for the address byte and its ACK, nine for the data byte and its ACK, with the START before them and the STOP after. Keep the eight values you read off the address phase — you'll need them in .   One write to address 0x70, captured on the AD2 in oscilloscope mode: SDA in blue on channel 2 above, SCL in orange on channel 1 below, offset vertically so the two do not overlap. The whole transaction is eighteen clock pulses and takes under 200 microseconds. Reading left to right: both lines idle HIGH, SDA falls while SCL is still HIGH, SCL begins clocking, and the first blue pulse near 90 microseconds is the moment the display lets go of SDA after acknowledging. This is what your own single sweep should look like.    The ACK is the part worth slowing down on, because it is the only moment in the transaction where the wire changes hands. After the eighth bit (in the address case this is the R\/W bit) the controller keeps clocking and lets go of SDA. The display, having recognized its address, then pulls SDA LOW sometime during the clock's LOW phase, so that when SCL rises, SDA is stable and LOW. On the next LOW phase the display lets go again and the controller takes over. That second handover is the short HIGH spike visible just after each ACK in — and there is no matching one before the ACK, because the handover was so fast. Either way it is harmless: nothing is read while SCL is LOW.  There is a second route into the same trace, worth taking even if your own capture was perfectly readable: the AD2 also has a logic-analyzer mode that decodes I2C for you. It shows the address, the R\/W bit, the ACK and the data as values rather than edges, which is a much faster way to answer is this device answering at all? when you are debugging. is the setup.   Getting the two signals on screen in Waveforms' logic mode. The AD2's digital channels — the larger flying-lead bundle — go DIO0 (pink) to SDA, DIO1 (green) to SCL and black to ground. Six steps: add DIO0 and DIO1 as signals, set the time base to 20 µs per division, click to make DIO0 falling the trigger, take a single sweep, use the cursors to measure the clock period, and drag the view so the start bit is at the left.     Then the decoder itself, three more steps: add an I2C bus with DIO1 as clock and DIO0 as data, set DIO0 falling as the trigger again, and take another sweep if the old trace disappears. The decoded row reads the transaction out directly — h70 WR , its ACK , the data byte, and its ACK . (The data byte in this screenshot is hBE , because it was captured with a different value in the program; yours will differ.)        "
},
{
  "id": "fig-i2c-scope-ack",
  "level": "2",
  "url": "subsec-day9x-debrief.html#fig-i2c-scope-ack",
  "type": "Figure",
  "number": "10.1.15",
  "title": "",
  "body": " One write to address 0x70, captured on the AD2 in oscilloscope mode: SDA in blue on channel 2 above, SCL in orange on channel 1 below, offset vertically so the two do not overlap. The whole transaction is eighteen clock pulses and takes under 200 microseconds. Reading left to right: both lines idle HIGH, SDA falls while SCL is still HIGH, SCL begins clocking, and the first blue pulse near 90 microseconds is the moment the display lets go of SDA after acknowledging. This is what your own single sweep should look like.   "
},
{
  "id": "fig-waveforms-setup",
  "level": "2",
  "url": "subsec-day9x-debrief.html#fig-waveforms-setup",
  "type": "Figure",
  "number": "10.1.16",
  "title": "",
  "body": " Getting the two signals on screen in Waveforms' logic mode. The AD2's digital channels — the larger flying-lead bundle — go DIO0 (pink) to SDA, DIO1 (green) to SCL and black to ground. Six steps: add DIO0 and DIO1 as signals, set the time base to 20 µs per division, click to make DIO0 falling the trigger, take a single sweep, use the cursors to measure the clock period, and drag the view so the start bit is at the left.   "
},
{
  "id": "fig-waveforms-decode",
  "level": "2",
  "url": "subsec-day9x-debrief.html#fig-waveforms-decode",
  "type": "Figure",
  "number": "10.1.17",
  "title": "",
  "body": " Then the decoder itself, three more steps: add an I2C bus with DIO1 as clock and DIO0 as data, set DIO0 falling as the trigger again, and take another sweep if the old trace disappears. The decoded row reads the transaction out directly — h70 WR , its ACK , the data byte, and its ACK . (The data byte in this screenshot is hBE , because it was captured with a different value in the program; yours will differ.)   "
},
{
  "id": "subsec-day9x-addressing",
  "level": "1",
  "url": "subsec-day9x-addressing.html",
  "type": "Subsection",
  "number": "10.1.6",
  "title": "Part 4: The Number on the Wire",
  "body": " Part 4: The Number on the Wire  Go back to the eight bits you wrote down for the address bits off your own trace. Convert that 8-bit number to hexadecimal. Your program says 0x70 for the I2C address of the chip. Is that what you got?   Which Number Is on the Wire?   Convert 0x70 to a binary eight-bit number and compare to the 8 bits you read off your trace. They are not the same - but can you tell in which way they differ from each other?    The program passed 0x70 and the wire carries something else, so something between the two moved the bits. Where could that have happened, given that the only thing between your #define and the wire is i2c1_byteWrite() ?    Eight bits were sent out by the I2C hardware of our STM32C0, but 0x70 is actually a 7-bit address. What is the 8th bit that was sent out? Why?     The same capture with the address phase read off it. The Start condition is where SDA falls while SCL is still HIGH. The eight bits that follow are 1 1 1 0 0 0 0 and then 0: seven address bits, which are 0x70, and then the bit circled in red — the R\/W bit, 0 for a write. The device's Ack comes on the pulse after that. If you read all eight as a single byte you get 0xE0, which is the number on the wire rather than the number in the program.    The byte on the wire is 0xE0 . 0x70 is the seven-bit address of the backpack chip, 0b1110000, and what goes onto SDA is those seven bits followed by one more: the R\/W bit, 0 to write to the device and 1 to read from it. If you read all eight as a byte you get 0xE0. Nothing is wrong — the address is in the top seven bits and the bottom bit is the direction — and i2c1_byteWrite() did the shift on your behalf, which is a line of it we will look at on Thursday.   is the HT16K33 datasheet's own drawing of a command transaction, and the address field in it is written 1 1 1 0 A2 A1 A0 : four fixed bits and three that are set by solder pads on the board, so that up to eight of these displays can share one bus. Ours has all three at 0, which makes the 7-bit address 0b1110000 — 0x70 . The next box along is the write bit, and after it the ACK.   The HT16K33 datasheet's diagram of a command write. The first field, the device address, is 1 1 1 0 A2 A1 A0 — the top four bits are fixed by the chip and A2, A1 and A0 are selectable on the board, so eight of these can share a bus. With all three at 0 the 7-bit address is 0b1110000, which is 0x70. The next bit is the direction, 0 for write; then the device's ACK; then the command byte, D15 down to D8; then a second ACK and the STOP. Note that the address occupies seven bit positions and the direction bit is separate — the datasheet is being explicit about something many are not. The red box is the seven address bits that make up 0x70 , and the blue labels mark the START and the STOP.    One word of caution: Datasheets are not consistent about which of the two numbers they print: some give the 7-bit address and some give it already shifted left by one. A 7-bit address is at most 0x7F , so any address quoted above that — 0xE0 , say — cannot be the 7-bit form and must be the shifted one. Shift it back before you #define it. If you mix up the 7-bit and the 8-bit address, the device never answers, which looks exactly like a wiring fault.   i2c1_byteWrite() and its relatives take the 7-bit address and do the shift themselves, so whatever a datasheet gives you, what you #define is the 7-bit form.  A few notes about a failed transaction: If you use an incorrect address, the NACK you receive is not an error message from the device — it is the absence of an answer, and it looks exactly the same whether the address is wrong, the device has no power, or the SDA wire is not connected. Also note that the controller will keep clocking anyway until it has sent all nine pulses since it doesn't know until the ninth pulse whether anyone responded. On Thursday we'll look at this on the oscilloscope to deepen our understanding.    "
},
{
  "id": "act-i2c-on-the-wire",
  "level": "2",
  "url": "subsec-day9x-addressing.html#act-i2c-on-the-wire",
  "type": "Activity",
  "number": "10.1.3",
  "title": "Which Number Is on the Wire?",
  "body": " Which Number Is on the Wire?   Convert 0x70 to a binary eight-bit number and compare to the 8 bits you read off your trace. They are not the same - but can you tell in which way they differ from each other?    The program passed 0x70 and the wire carries something else, so something between the two moved the bits. Where could that have happened, given that the only thing between your #define and the wire is i2c1_byteWrite() ?    Eight bits were sent out by the I2C hardware of our STM32C0, but 0x70 is actually a 7-bit address. What is the 8th bit that was sent out? Why?   "
},
{
  "id": "fig-i2c-scope-decoded",
  "level": "2",
  "url": "subsec-day9x-addressing.html#fig-i2c-scope-decoded",
  "type": "Figure",
  "number": "10.1.21",
  "title": "",
  "body": " The same capture with the address phase read off it. The Start condition is where SDA falls while SCL is still HIGH. The eight bits that follow are 1 1 1 0 0 0 0 and then 0: seven address bits, which are 0x70, and then the bit circled in red — the R\/W bit, 0 for a write. The device's Ack comes on the pulse after that. If you read all eight as a single byte you get 0xE0, which is the number on the wire rather than the number in the program.   "
},
{
  "id": "fig-ht16k33-addr-frame",
  "level": "2",
  "url": "subsec-day9x-addressing.html#fig-ht16k33-addr-frame",
  "type": "Figure",
  "number": "10.1.22",
  "title": "",
  "body": " The HT16K33 datasheet's diagram of a command write. The first field, the device address, is 1 1 1 0 A2 A1 A0 — the top four bits are fixed by the chip and A2, A1 and A0 are selectable on the board, so eight of these can share a bus. With all three at 0 the 7-bit address is 0b1110000, which is 0x70. The next bit is the direction, 0 for write; then the device's ACK; then the command byte, D15 down to D8; then a second ACK and the STOP. Note that the address occupies seven bit positions and the direction bit is separate — the datasheet is being explicit about something many are not. The red box is the seven address bits that make up 0x70 , and the blue labels mark the START and the STOP.   "
},
{
  "id": "subsec-day9x-addressing-9",
  "level": "2",
  "url": "subsec-day9x-addressing.html#subsec-day9x-addressing-9",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "7-bit "
},
{
  "id": "subsec-day9x-one-digit",
  "level": "1",
  "url": "subsec-day9x-one-digit.html",
  "type": "Subsection",
  "number": "10.1.7",
  "title": "Part 5: Write One Digit Yourself",
  "body": " Part 5: Write One Digit Yourself  Your display is currently showing four characters that we chose when writing the helloDisplay.c program. Next we'll put your own character there. The only thing you need first is what a byte of display_buffer means.  Each digit consists of seven bar-shaped LEDs and a round one, and they have names: a at the top, then b and c down the right, d along the bottom, e and f up the left, g across the middle, and DP for the decimal point ( ). Those are the names the datasheet uses, and they are the order the bits are in: bit 0 is a , bit 1 is b , on up to bit 6 for g , and bit 7 is the decimal point. Written as a binary literal a digit's byte therefore reads 0b DP g f e d c b a , most significant bit first — which is why the H in the helloDisplay.c program is 0b01110110 : bits 1, 2, 4, 5 and 6, so b c e f g .   The four digits with every segment drawn, and the segment names on the first one: a across the top, b and c down the right side, d across the bottom, e and f up the left side, g across the middle, and DP for the decimal point. The colon between digits 2 and 3 is two more LEDs, called D5 and D6 here.    Ten bytes, two per position. display_buffer[0] is the first digit, [2] the second, [4] the colon, [6] the third and [8] the fourth; the odd-numbered entries are the ones that stay 0, and we'll find out on Thursday why they cannot simply be left out. Everything you change today is one entry of this array.   Put Your Own Character on a Digit   In helloDisplay.c , edit display_buffer and nothing else. Derive each byte from rather than guessing it, and write it down in binary before you build.    Work out the byte for an E : which segments are lit, which bits are those, and what is the binary literal? Put it in display_buffer[0] , build, flash, and check the first digit against what you predicted.    Move the E around: Change one line so the E appears on the second digit instead, then the third, then the fourth.    Add a decimal point after that digit, by changing one bit of one byte. Work out which bit before you set it.    Predict, then try: put your E byte into display_buffer[1] — an odd entry — instead of [0] . What do you expect to see, and what do you actually get?    Done early? Spell a four-character word. Not every letter is possible with seven segments; part of the exercise is finding out which ones are.    An E is a , d , e , f and g — bits 0, 3, 4, 5 and 6 — so the byte is 0b01111001 . A decimal point after the second digit means setting bit 7 of display_buffer[2] . And the odd entry: the display RAM does have an address there and the byte does land in it, but on a seven-segment digit nothing is wired to the LEDs it would drive, so the character disappears rather than appearing somewhere unexpected. We'll see why when we look at the display RAM map on Thursday.     "
},
{
  "id": "fig-segment-map",
  "level": "2",
  "url": "subsec-day9x-one-digit.html#fig-segment-map",
  "type": "Figure",
  "number": "10.1.24",
  "title": "",
  "body": " The four digits with every segment drawn, and the segment names on the first one: a across the top, b and c down the right side, d across the bottom, e and f up the left side, g across the middle, and DP for the decimal point. The colon between digits 2 and 3 is two more LEDs, called D5 and D6 here.   "
},
{
  "id": "act-i2c-your-digit",
  "level": "2",
  "url": "subsec-day9x-one-digit.html#act-i2c-your-digit",
  "type": "Activity",
  "number": "10.1.4",
  "title": "Put Your Own Character on a Digit.",
  "body": " Put Your Own Character on a Digit   In helloDisplay.c , edit display_buffer and nothing else. Derive each byte from rather than guessing it, and write it down in binary before you build.    Work out the byte for an E : which segments are lit, which bits are those, and what is the binary literal? Put it in display_buffer[0] , build, flash, and check the first digit against what you predicted.    Move the E around: Change one line so the E appears on the second digit instead, then the third, then the fourth.    Add a decimal point after that digit, by changing one bit of one byte. Work out which bit before you set it.    Predict, then try: put your E byte into display_buffer[1] — an odd entry — instead of [0] . What do you expect to see, and what do you actually get?    Done early? Spell a four-character word. Not every letter is possible with seven segments; part of the exercise is finding out which ones are.   "
},
{
  "id": "subsec-day9x-next",
  "level": "1",
  "url": "subsec-day9x-next.html",
  "type": "Subsection",
  "number": "10.1.8",
  "title": "Part 6: Before Next Class",
  "body": " Part 6: Before Next Class  The only thing due tonight is Tuesday's timer program, and we'll open tomorrow by reviewing it.   Leave the display wired. On Thursday we'll look at the chip on the backpack more carefully and learn about the commands it can be given via the I2C protocol. We'll derive these from the chip's command table and its display RAM which are described in the chip's datasheet. We'll also look at the I2C peripheral on our STM32C0, its two pins and its configuration. Then you will write the device driver for the backpack chip yourself.  Today you were given the I2C library without much explanation of the code therein. We used i2c1_byteWrite() and i2c1_memWrite() without knowing what either does, and we'll rectify that tomorrow. We also sent three command bytes to the backpack chip that were handed to you rather than derived; we'll look at those in the datasheet tomorrow as well.  "
},
{
  "id": "subsec-day9x-next-3",
  "level": "2",
  "url": "subsec-day9x-next.html#subsec-day9x-next-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Leave the display wired. "
},
{
  "id": "subsec-display-sharing",
  "level": "1",
  "url": "subsec-display-sharing.html",
  "type": "Subsection",
  "number": "10.2.1",
  "title": "34 LEDs, and Not 34 Wires",
  "body": " 34 LEDs, and Not 34 Wires  An LED lights when current flows through it in one direction, so controlling one LED means controlling one path from a positive supply, through the LED, to ground. Thirty-four LEDs with thirty-four separate paths is thirty-four wires plus a common return, and the display in your kit does not have that many pins. It has fourteen.  The way that works is a trick you will see again in every display you ever meet, and it has two halves. The first half is sharing : the LEDs are wired in a grid rather than individually, so that a single wire reaches many of them at once and the LED that lights is the one where an energized row crosses an energized column. A grid of rows and columns reaches LEDs with wires, and that gap is the whole saving.  The second half is time . A grid can only light one row at a time without lighting things you did not ask for, so the display shows one row, then the next, then the next, cycling through all of them fast enough that your eye cannot follow. Persistence of vision does the rest: what you see is a steady image, even though at every instant most of the display is dark. This is time-division multiplexing , and it is why a display like this is never really set and forget — the image only exists because something is rewriting it, thousands of times a second, forever.  "
},
{
  "id": "subsec-display-sharing-3",
  "level": "2",
  "url": "subsec-display-sharing.html#subsec-display-sharing-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "sharing "
},
{
  "id": "subsec-display-sharing-4",
  "level": "2",
  "url": "subsec-display-sharing.html#subsec-display-sharing-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "time time-division multiplexing "
},
{
  "id": "subsec-display-backpack",
  "level": "1",
  "url": "subsec-display-backpack.html",
  "type": "Subsection",
  "number": "10.2.2",
  "title": "What the Backpack Is For",
  "body": " What the Backpack Is For  That something could be your program. The STM32C031C6 is more than fast enough to drive fourteen pins in the right pattern, and people do exactly this. The cost is that it never stops: the moment your program does something else for a few milliseconds, the display visibly flickers or goes dark. Every other thing you might want the processor to do has to be fitted around a refresh loop.  The alternative is to give the job to a chip that does nothing else. The small board the display is soldered to — the backpack — carries an HT16K33, a controller whose entire purpose is to drive an LED matrix. It has a RAM inside it holding which LEDs should be on, its own oscillator, and the logic to sweep the grid continuously from that RAM. It also has an I2C interface, and that is the only part of it your program talks to.  So the division of labor is: your program says which LEDs should be on, once, whenever it changes its mind; the HT16K33 keeps them on until told otherwise. Two wires carry the first half, and nothing carries the second half because it never leaves the backpack. In class we will read the HT16K33's datasheet to find out what says which LEDs should be on means in bytes, and write the code that says it.  "
},
{
  "id": "subsec-display-backpack-3",
  "level": "2",
  "url": "subsec-display-backpack.html#subsec-display-backpack-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "backpack "
},
{
  "id": "rq-i2c-how-it-works",
  "level": "1",
  "url": "rq-i2c-how-it-works.html",
  "type": "Check Your Understanding",
  "number": "10.2.3",
  "title": "Check Your Understanding",
  "body": "  An I2C bus has four devices connected to the same SCL and SDA lines. The controller addresses the device at 0x70. How many of the four examine those address bits?    All four examine the address; only the one at address 0x70 responds with ACK.  Correct. Because all devices share SDA, every device sees every bit. Each one compares the address it hears against its own; only the matching device pulls SDA LOW for the ACK.    Only the device at address 0x70 sees the bits; the others are unaware of the transaction.  All devices are physically connected to SDA and SCL — they all receive every bit. There is no mechanism to hide bits from particular devices, and none is needed: a device that does not recognize the address simply stays quiet.    Two devices are selected at once; the one with the lower address wins.  On a correctly configured bus each device has a distinct address, so only one can match a given address byte. Parts that ship with the same default address usually have pins or solder pads for changing a few of its bits — which is exactly what you would use to avoid this.    The controller pre-selects one device before sending the address byte, so only that device responds.  There is no such pre-selection step. The address byte itself is the selection, and every device evaluates it in parallel.      What makes a START condition impossible to confuse with a normal data bit?    SDA changes while SCL is HIGH; data bits may change only while SCL is LOW.  Correct. The normal rule is that SDA holds still during the SCL HIGH phase, because that is when the receiver reads it. START and STOP deliberately break that rule, so an SDA edge while SCL is HIGH cannot be a bit value.    The controller holds SCL LOW for twice as long before the START condition.  SCL timing does not change at the START. What distinguishes it is SDA changing while SCL is HIGH, not anything about SCL itself.    The controller transmits a reserved 0xFF byte immediately before the START condition.  No such preamble exists. START is identified entirely by the relationship between SDA and SCL.    SDA is held LOW for at least eight SCL cycles before data transmission begins.  SDA falls once, for one transition, at the START. The key is when SDA changes — while SCL is HIGH — not how long it stays LOW.      After sending the 7-bit address and the R\/W bit, the controller releases SDA and watches it during the ninth SCL pulse. SDA is HIGH during that pulse. What does this tell the controller?    No device recognized the address (NACK) — the controller should issue a STOP rather than continue.  Correct. A matching device would pull SDA LOW. If SDA stays HIGH, nobody claimed the address, and the controller ends the transaction with a STOP to free the bus.    The transaction completed successfully and the data was received.  A successful address phase shows SDA LOW — the device pulling it down. SDA HIGH after the address byte means the opposite: no device answered.    The device is busy and will pull SDA LOW on the next SCL pulse, once it is ready.  A device that needs more time holds SCL LOW, not SDA — that is called clock stretching, and the ACK still has to arrive in its own clock pulse. SDA HIGH during the ninth pulse is a NACK.    Two devices share the same address and are colliding on SDA, producing an indeterminate voltage.  If two devices shared an address and both acknowledged, both would pull SDA LOW and the line would read LOW. Open-drain signaling has no indeterminate state. SDA HIGH means nobody responded at all.     "
},
{
  "id": "rq-i2c-bus-listeners",
  "level": "2",
  "url": "rq-i2c-how-it-works.html#rq-i2c-bus-listeners",
  "type": "Reading Question",
  "number": "10.2.3.1",
  "title": "",
  "body": " An I2C bus has four devices connected to the same SCL and SDA lines. The controller addresses the device at 0x70. How many of the four examine those address bits?    All four examine the address; only the one at address 0x70 responds with ACK.  Correct. Because all devices share SDA, every device sees every bit. Each one compares the address it hears against its own; only the matching device pulls SDA LOW for the ACK.    Only the device at address 0x70 sees the bits; the others are unaware of the transaction.  All devices are physically connected to SDA and SCL — they all receive every bit. There is no mechanism to hide bits from particular devices, and none is needed: a device that does not recognize the address simply stays quiet.    Two devices are selected at once; the one with the lower address wins.  On a correctly configured bus each device has a distinct address, so only one can match a given address byte. Parts that ship with the same default address usually have pins or solder pads for changing a few of its bits — which is exactly what you would use to avoid this.    The controller pre-selects one device before sending the address byte, so only that device responds.  There is no such pre-selection step. The address byte itself is the selection, and every device evaluates it in parallel.    "
},
{
  "id": "rq-i2c-start-unique",
  "level": "2",
  "url": "rq-i2c-how-it-works.html#rq-i2c-start-unique",
  "type": "Reading Question",
  "number": "10.2.3.2",
  "title": "",
  "body": " What makes a START condition impossible to confuse with a normal data bit?    SDA changes while SCL is HIGH; data bits may change only while SCL is LOW.  Correct. The normal rule is that SDA holds still during the SCL HIGH phase, because that is when the receiver reads it. START and STOP deliberately break that rule, so an SDA edge while SCL is HIGH cannot be a bit value.    The controller holds SCL LOW for twice as long before the START condition.  SCL timing does not change at the START. What distinguishes it is SDA changing while SCL is HIGH, not anything about SCL itself.    The controller transmits a reserved 0xFF byte immediately before the START condition.  No such preamble exists. START is identified entirely by the relationship between SDA and SCL.    SDA is held LOW for at least eight SCL cycles before data transmission begins.  SDA falls once, for one transition, at the START. The key is when SDA changes — while SCL is HIGH — not how long it stays LOW.    "
},
{
  "id": "rq-i2c-nack-meaning",
  "level": "2",
  "url": "rq-i2c-how-it-works.html#rq-i2c-nack-meaning",
  "type": "Reading Question",
  "number": "10.2.3.3",
  "title": "",
  "body": " After sending the 7-bit address and the R\/W bit, the controller releases SDA and watches it during the ninth SCL pulse. SDA is HIGH during that pulse. What does this tell the controller?    No device recognized the address (NACK) — the controller should issue a STOP rather than continue.  Correct. A matching device would pull SDA LOW. If SDA stays HIGH, nobody claimed the address, and the controller ends the transaction with a STOP to free the bus.    The transaction completed successfully and the data was received.  A successful address phase shows SDA LOW — the device pulling it down. SDA HIGH after the address byte means the opposite: no device answered.    The device is busy and will pull SDA LOW on the next SCL pulse, once it is ready.  A device that needs more time holds SCL LOW, not SDA — that is called clock stretching, and the ACK still has to arrive in its own clock pulse. SDA HIGH during the ninth pulse is a NACK.    Two devices share the same address and are colliding on SDA, producing an indeterminate voltage.  If two devices shared an address and both acknowledged, both would pull SDA LOW and the line would read LOW. Open-drain signaling has no indeterminate state. SDA HIGH means nobody responded at all.    "
},
{
  "id": "rq-display-hardware",
  "level": "1",
  "url": "rq-display-hardware.html",
  "type": "Check Your Understanding",
  "number": "10.2.4",
  "title": "Check Your Understanding",
  "body": "  A four-digit display has 34 LEDs and 14 pins. At any single instant, roughly how many of those LEDs can be lit?    Only the ones in one row of the grid — a fraction of the display. The rest are dark until their turn comes round.  Correct, and it is the price of the wire saving. A grid can energize one row at a time without lighting LEDs in other rows, so the display is swept row by row. What makes it look continuous is that the sweep is much faster than the eye.    All 34, because each LED has its own controllable path through the grid.  If each LED had its own path there would be no saving and no need for a grid — that arrangement is exactly the 34 wires the grid exists to avoid. In a grid the wires are shared, so lighting an arbitrary set of LEDs at one instant is not possible.    Exactly one, because only one wire can be energized at a time.  Closer, but too pessimistic. One row's worth can be lit together — every LED where the energized row meets an energized column — which is why a whole digit can be shown at once.    All 34, but at a lower brightness, because the current is shared between them.  Brightness does drop as the number of rows goes up, because each row is only lit for its share of the time. But that is a consequence of the sweeping, not an alternative to it: at any one instant the LEDs outside the current row are fully off.      What would your program have to do differently if the display had no HT16K33 on it — if the fourteen wires came straight to the STM32C031C6?    It would have to keep sweeping the grid continuously, forever, fast enough that the display does not flicker — on top of whatever else it was doing.  Correct. The image exists only while something is refreshing it. That is the job the backpack takes off your program, and it is why the backpack is worth two wires and a datasheet.    It would have to send the display data fourteen times instead of once.  The number of wires is not the number of sends. What changes is not how much data you send but that you can never stop sending it — the refresh has to keep running.    Nothing would change in the program; only the wiring would.  The wiring is the smaller half. Without a controller, generating the multiplexed sweep becomes the program's job, and it is a job with a hard real-time deadline that never ends.    It would need a faster clock, because I2C at 100 kHz is too slow to refresh a display.  The bus speed is not the constraint: with a backpack the display data is sent once, when it changes. Without one, there is no bus at all — the fourteen wires are driven directly, and the constraint is that the driving never stops.      A grid needs one wire per row and one per column. Which arrangement reaches 34 LEDs with the fewest wires?    Something close to square — around 6 by 6 — because for a fixed number of LEDs the sum of rows and columns is smallest when the two are similar.  Correct in principle. 1 by 34 needs 35 wires; 2 by 17 needs 19; 6 by 6 needs 12. The real display is not free to choose, because the grid has to match how the digits are physically wired — which is what we look at in class.    One row of 34, because a single row needs only one row wire.  One row wire, but 34 column wires — 35 in total, which is worse than no grid at all. The saving comes from balancing the two, not from minimizing one of them.    34 rows of one, so that each LED can be addressed on its own.  That is the individually wired arrangement again, with the same 35 wires. It does give you arbitrary control at any instant, which is exactly what you trade away for the wire saving.    It makes no difference; any grid holding 34 LEDs needs the same number of wires.  Compare 1 by 34 (35 wires) with 6 by 6 (12). The number of LEDs is the product; the number of wires is the sum, and the two behave very differently.     "
},
{
  "id": "rq-display-why-multiplex",
  "level": "2",
  "url": "rq-display-hardware.html#rq-display-why-multiplex",
  "type": "Reading Question",
  "number": "10.2.4.1",
  "title": "",
  "body": " A four-digit display has 34 LEDs and 14 pins. At any single instant, roughly how many of those LEDs can be lit?    Only the ones in one row of the grid — a fraction of the display. The rest are dark until their turn comes round.  Correct, and it is the price of the wire saving. A grid can energize one row at a time without lighting LEDs in other rows, so the display is swept row by row. What makes it look continuous is that the sweep is much faster than the eye.    All 34, because each LED has its own controllable path through the grid.  If each LED had its own path there would be no saving and no need for a grid — that arrangement is exactly the 34 wires the grid exists to avoid. In a grid the wires are shared, so lighting an arbitrary set of LEDs at one instant is not possible.    Exactly one, because only one wire can be energized at a time.  Closer, but too pessimistic. One row's worth can be lit together — every LED where the energized row meets an energized column — which is why a whole digit can be shown at once.    All 34, but at a lower brightness, because the current is shared between them.  Brightness does drop as the number of rows goes up, because each row is only lit for its share of the time. But that is a consequence of the sweeping, not an alternative to it: at any one instant the LEDs outside the current row are fully off.    "
},
{
  "id": "rq-display-backpack-job",
  "level": "2",
  "url": "rq-display-hardware.html#rq-display-backpack-job",
  "type": "Reading Question",
  "number": "10.2.4.2",
  "title": "",
  "body": " What would your program have to do differently if the display had no HT16K33 on it — if the fourteen wires came straight to the STM32C031C6?    It would have to keep sweeping the grid continuously, forever, fast enough that the display does not flicker — on top of whatever else it was doing.  Correct. The image exists only while something is refreshing it. That is the job the backpack takes off your program, and it is why the backpack is worth two wires and a datasheet.    It would have to send the display data fourteen times instead of once.  The number of wires is not the number of sends. What changes is not how much data you send but that you can never stop sending it — the refresh has to keep running.    Nothing would change in the program; only the wiring would.  The wiring is the smaller half. Without a controller, generating the multiplexed sweep becomes the program's job, and it is a job with a hard real-time deadline that never ends.    It would need a faster clock, because I2C at 100 kHz is too slow to refresh a display.  The bus speed is not the constraint: with a backpack the display data is sent once, when it changes. Without one, there is no bus at all — the fourteen wires are driven directly, and the constraint is that the driving never stops.    "
},
{
  "id": "rq-display-grid-count",
  "level": "2",
  "url": "rq-display-hardware.html#rq-display-grid-count",
  "type": "Reading Question",
  "number": "10.2.4.3",
  "title": "",
  "body": " A grid needs one wire per row and one per column. Which arrangement reaches 34 LEDs with the fewest wires?    Something close to square — around 6 by 6 — because for a fixed number of LEDs the sum of rows and columns is smallest when the two are similar.  Correct in principle. 1 by 34 needs 35 wires; 2 by 17 needs 19; 6 by 6 needs 12. The real display is not free to choose, because the grid has to match how the digits are physically wired — which is what we look at in class.    One row of 34, because a single row needs only one row wire.  One row wire, but 34 column wires — 35 in total, which is worse than no grid at all. The saving comes from balancing the two, not from minimizing one of them.    34 rows of one, so that each LED can be addressed on its own.  That is the individually wired arrangement again, with the same 35 wires. It does give you arbitrary control at any instant, which is exactly what you trade away for the wire saving.    It makes no difference; any grid holding 34 LEDs needs the same number of wires.  Compare 1 by 34 (35 wires) with 6 by 6 (12). The number of LEDs is the product; the number of wires is the sum, and the two behave very differently.    "
},
{
  "id": "subsec-day10-homework",
  "level": "1",
  "url": "subsec-day10-homework.html",
  "type": "Subsection",
  "number": "10.3.1",
  "title": "Part 1: Homework Review, and Two AI Solutions",
  "body": " Part 1: Homework Review, and Two AI Solutions  Tuesday's homework was counterResetButtonIntTimer.c : the button-reset counter with delay_ms() replaced by a one-second timer interrupt, so that the program has two interrupt sources and blocks on neither.  Both of the programs below are answers to that assignment, produced by asking an AI assistant to do it. Neither is nonsense and both would compile, and we'll read one of them closely.  \/* counterResetButtonIntTimer.c -- ChatGPT *\/ #include <stdio.h> #include \"ES28.h\" #include \"uart.h\" #define MAXCOUNT 100 void pb4_exti_init(void); void tim14_init(void); volatile int buttonPushed; volatile int timerElapsed; int main(void) { int counter = 0; uart2_init(); printf(\"Counter demo\\r\\n\"); printf(\"Hex \\tDecimal\\r\\n\"); pb4_exti_init(); tim14_init(); buttonPushed = 0; timerElapsed = 0; while (1) { if (timerElapsed) { timerElapsed = 0; printf(\"%x\\t%d\\r\\n\", counter, counter); if (buttonPushed) { counter = 0; buttonPushed = 0; } else if (counter == MAXCOUNT - 1) { counter = 0; } else { counter++; } } } return 1; } void TIM14_IRQHandler(void) { if (TIM14->SR & TIM_SR_UIF) { TIM14->SR &= ~TIM_SR_UIF; \/\/ Clear PR flag timerElapsed = 1; } } void tim14_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; TIM14->PSC = 48000 - 1; TIM14->ARR = 1000 - 1; TIM14->SR &= ~TIM_SR_UIF; TIM14->DIER |= TIM_DIER_UIE; NVIC_EnableIRQ(TIM14_IRQn); TIM14->CR1 |= TIM_CR1_CEN; } void EXTI4_15_IRQHandler(void){ \/\/ unchanged from our code } void pb4_exti_init(void) { \/\/ unchanged from our code }  \/* counterResetButtonIntTimer.c -- Gemini *\/ #include <stdio.h> #include \"ES28.h\" #include \"uart.h\" #define MAXCOUNT 100 void pb4_exti_init(void); void tim14_init(void); volatile int buttonPushed; int main(void) { int counter = 0; \/\/ Initialize peripherals uart2_init(); pb4_exti_init(); tim14_init(); buttonPushed = 0; printf(\"Counter ...\\r\\n\"); printf(\"Hex \\tDecimal\\r\\n\"); while(1) { if (TIM14->SR & TIM_SR_UIF) { TIM14->SR &= ~TIM_SR_UIF; \/\/ Clear PR flag printf(\"%x\\t%d\\r\\n\", counter, counter); \/\/ Logic for counting and button reset if (buttonPushed) { counter = 0; buttonPushed = 0; } else if (counter >= MAXCOUNT - 1) { counter = 0; } else { counter++; } } } return 1; } void tim14_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; TIM14->PSC = 16000 - 1; TIM14->ARR = 1000 - 1; TIM14->EGR |= TIM_EGR_UG; TIM14->CR1 |= TIM_CR1_CEN; } void EXTI4_15_IRQHandler(void){ \/\/ unchanged from our code } void pb4_exti_init(void) { \/\/ unchanged from our code }   Would You Revise Your Solution?   With your group, pick one of the two and study it. Answer the following questions — first individually, then compare:    First, complete a measurement. Your own program prints once a second: Use a stopwatch to measure how long it takes to make ten prints. Then write down the PSC and ARR your program uses, and from those three numbers work out what clock speed your board is running at.    What does the AI solution do better than yours?    Find at least two things you would change, and why. For at least one of them, predict what would happen if you ran the code on your board.    Having read the AI solution: would you revise your own solution?    Now compare with the others at your table, and put together the list of everything the group found.    What is there to find. The clock speed is wrong in both.  PSC = 48000 - 1 assumes a 48 MHz clock and PSC = 16000 - 1 assumes 16 MHz; ours runs at 12 MHz, so the first counts one tick every 4 ms and the second every 1.33 ms. The ARR = 1000 - 1 that was meant to make one second makes four seconds and one and a third. Nothing warns you; the program simply runs slow, and you have to know the clock to know that it is wrong.   Both check the button only when the timer fires. The button test sits inside the once-a-second branch — ChatGPT's if (timerElapsed) , Gemini's if (TIM14->SR & TIM_SR_UIF) — so a press is acted on at the next tick rather than when it happens, and the count on the screen stays stale until it comes round. That is the thing the interrupt was for. Compare with two independent if s: a press and a tick are unrelated events and each should be handled when it arrives.   Both clear the timer flag with a compound assignment.  TIM14->SR &= ~TIM_SR_UIF; reads the register, clears one bit in the copy, and writes the whole thing back — the pattern the timers chapter spent a section on ( ). Here it happens to be harmless, because TIM14_SR is rc_w0 and a 1 written to a flag has no effect; the reason to write TIM14->SR = ~TIM_SR_UIF; anyway is that the habit is what protects you on the registers where it is not harmless.   Gemini does one thing neither ChatGPT nor our own code does.  TIM14->EGR |= TIM_EGR_UG; forces an update event before the timer starts, and that is what loads PSC into the prescaler's working copy — the buffered register the timers chapter drew ( ). Without an update event the prescaler is still at its reset value of 1 when CEN is set, so the very first interval is 1000 counts of a 12 MHz clock: 83 µs, not a second. One short interval, once, at startup — and our own tim14_ms_interrupt_init() has it too.   Gemini's program does not use the timer interrupt at all. Look at its tim14_init() : no TIM_DIER_UIE , no NVIC_EnableIRQ() , and no timer ISR — the only handler in the file is the button's EXTI4_15_IRQHandler . The main loop polls TIM14->SR instead, which is the polled version we started from. It works, it is not what was asked for, and reading the code is the only way to notice: on the screen only the printing rate gives it away.      "
},
{
  "id": "act-i2c-ai-review",
  "level": "2",
  "url": "subsec-day10-homework.html#act-i2c-ai-review",
  "type": "Activity",
  "number": "10.3.1",
  "title": "Would You Revise Your Solution?",
  "body": " Would You Revise Your Solution?   With your group, pick one of the two and study it. Answer the following questions — first individually, then compare:    First, complete a measurement. Your own program prints once a second: Use a stopwatch to measure how long it takes to make ten prints. Then write down the PSC and ARR your program uses, and from those three numbers work out what clock speed your board is running at.    What does the AI solution do better than yours?    Find at least two things you would change, and why. For at least one of them, predict what would happen if you ran the code on your board.    Having read the AI solution: would you revise your own solution?    Now compare with the others at your table, and put together the list of everything the group found.   "
},
{
  "id": "subsec-day10-homework-7",
  "level": "2",
  "url": "subsec-day10-homework.html#subsec-day10-homework-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The clock speed is wrong in both. "
},
{
  "id": "subsec-day10-homework-8",
  "level": "2",
  "url": "subsec-day10-homework.html#subsec-day10-homework-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Both check the button only when the timer fires. "
},
{
  "id": "subsec-day10-homework-9",
  "level": "2",
  "url": "subsec-day10-homework.html#subsec-day10-homework-9",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Both clear the timer flag with a compound assignment. "
},
{
  "id": "subsec-day10-homework-10",
  "level": "2",
  "url": "subsec-day10-homework.html#subsec-day10-homework-10",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Gemini does one thing neither ChatGPT nor our own code does. "
},
{
  "id": "subsec-day10-homework-11",
  "level": "2",
  "url": "subsec-day10-homework.html#subsec-day10-homework-11",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Gemini's program does not use the timer interrupt at all. "
},
{
  "id": "subsec-day10-verify",
  "level": "1",
  "url": "subsec-day10-verify.html",
  "type": "Subsection",
  "number": "10.3.2",
  "title": "Part 2: Does the Bus Still Work?",
  "body": " Part 2: Does the Bus Still Work?  Make sure your display is still connected properly via its four wires. Re-flash helloDisplay.c if you have other code running at this time and confirm the display still lights.  Whatever your buffer ended on yesterday should still be there, and it is a strong test whatever it says, because the program that puts it up uses the whole path: the two pins, the bus, the three setup commands and a ten-byte write. A blank display likely means something went wrong with your wiring whereas wrong or missing digits are just where you left it yesterday in your code.  So if your display is blank, re-seat all four wires against : + on 3.3 V and not the 5 V pin beside it, − on GND, D on PB9 and C on PB8.   "
},
{
  "id": "subsec-day10-verify-3",
  "level": "2",
  "url": "subsec-day10-verify.html#subsec-day10-verify-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "blank display "
},
{
  "id": "subsec-day10-display-hardware",
  "level": "1",
  "url": "subsec-day10-display-hardware.html",
  "type": "Subsection",
  "number": "10.3.3",
  "title": "Part 3: How the Display Is Actually Built",
  "body": " Part 3: How the Display Is Actually Built  You already know the segment names and the bit order they map to ( ), because you wrote a digit's byte with them yesterday. Now we'll look at the wiring behind them: how the 34 LEDs of the display are reached with the 14 backpack pins, and why the display needs a chip of its own. We'll get to communicating with the chip via the 2 I2C wires later today.  The 34 LEDs are wired up in a grid which you can see in (from the display's datasheet). It is a common cathode arrangement: within one digit, all eight LEDs have their cathodes tied together and brought out on a single pin — the ones marked (COM) , for common — while across digits, all four a anodes are tied together, all four b anodes are tied together, and so on.   The internal wiring of the four-digit display, from its datasheet. Every segment of the display is an LED. Reading down: the eight LEDs of each digit share one cathode, brought out on the pin marked (COM) above that digit — pins 14, 11, 10 and 6, with pin 7 serving the colon's two LEDs. Reading across: all four a anodes are connected together and brought out on one pin, and likewise for b through g and DP — the eight pins along the bottom, 13, 9, 4, 2, 1, 12, 5 and 3 — with pin 8 for the colon. Five cathode pins and nine anode pins is 14 wires for 34 LEDs. The datasheet prints the segments as capitals; we write them lowercase, as does.    We'll work out what that wiring makes possible and what it rules out. To light the a segment of digit 2, drive the shared a anode high and pull digit 2's common cathode low: current has a path through exactly one LED, because that is the only place where an energized anode meets an energized cathode. To light a of digit 2 and  b of digit 3 at the same time, you would have to energize both anodes and both cathodes — which also lights b of digit 2 and a of digit 3. A grid cannot light an arbitrary set of segments at one instant; it can light one digit at a time. To show four digits, the display shows them in sequence, sweeping through them fast enough that the eye does not notice.  Everything the backpack does — sweeping the four digits, holding each one on for its share of the time, keeping the display lit while your program does something else — is that grid, driven continuously.  We can watch that happen. The display in front of you looks steady, but at every instant most of it is dark, and there are two ways to see it. Wave it. Pick the breadboard up and move the lit display briskly from side to side, and watch what the trail does — a light that is genuinely on all the time smears into a continuous band, and one that is being switched leaves separate images with gaps between them. Or film it. Put your phone's camera into its slow-motion mode and point it at the display, then play the clip back and step through it. A camera exposing for a short enough slice of time catches the display part-way through a sweep rather than averaged over one.   Either way, what you are seeing is the sweep — and, as the reading put it, that job never stops. Which is why the display is wired to a backpack: the HT16K33 chip on the backpack does the multiplexing and the decoding, and it continuously sweeps through the four digits to make them all appear lit up at the same time. The chip also talks to the processor over I2C.   shows the HT16K33's block diagram (from the chip's datasheet). The I2C interface is on the left; the display RAM in the middle holds which LEDs are on; the row and common drivers on the right are eight COM outputs (of which the display is only wired to five) and sixteen ROW outputs (of which the display uses nine); and the internal RC (resistor-capacitor) oscillator with the timing generator is what runs the sweep. That oscillator is off when the chip powers up, and so the first thing our driver has to do is turn it on.   The HT16K33's block diagram, from its datasheet. SDA and SCL enter the I2C controller on the left, which is the only way your program reaches it. The display RAM is where the individual bit patterns are stored for the segments you are currently lighting up. Each digit is stored as a 16-bit number (2 8-bit numbers); in the case of the 7-segment display we only use the first of these two bytes for each segment. We still need to send both bytes though (so we send a '0' after each 'real' piece of data). The controller can also control dot-matrix displays, keypads and more. That's why it has more capabilities than we need and in particular more storage in the display memory than we need. The common-scan and row-driver outputs on the right are the pins that go to the display's grid. The internal RC (resistor-capacitor) oscillator and timing generator sweep that grid from the RAM, continuously and without any further instruction. The key-scan and key-data blocks belong to the chip's other features, reading a keypad matrix, which we do not use. The annotations name four groups. In blue on the left, the two I2C pins. In magenta, the display RAM — the data registers, two bytes of eight bits for each COM line. In orange, the control registers, which are what the command table configures: display or keypad, digits or LED matrix, brightness and blinking. And in dark red on the right, the pins our display actually uses — five COM outputs, four for the digits and one for the colon, and eight ROW outputs, seven digit segments and the decimal point.        "
},
{
  "id": "subsec-day10-display-hardware-3",
  "level": "2",
  "url": "subsec-day10-display-hardware.html#subsec-day10-display-hardware-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "common cathode "
},
{
  "id": "fig-four-digit-wiring",
  "level": "2",
  "url": "subsec-day10-display-hardware.html#fig-four-digit-wiring",
  "type": "Figure",
  "number": "10.3.5",
  "title": "",
  "body": " The internal wiring of the four-digit display, from its datasheet. Every segment of the display is an LED. Reading down: the eight LEDs of each digit share one cathode, brought out on the pin marked (COM) above that digit — pins 14, 11, 10 and 6, with pin 7 serving the colon's two LEDs. Reading across: all four a anodes are connected together and brought out on one pin, and likewise for b through g and DP — the eight pins along the bottom, 13, 9, 4, 2, 1, 12, 5 and 3 — with pin 8 for the colon. Five cathode pins and nine anode pins is 14 wires for 34 LEDs. The datasheet prints the segments as capitals; we write them lowercase, as does.   "
},
{
  "id": "subsec-day10-display-hardware-7",
  "level": "2",
  "url": "subsec-day10-display-hardware.html#subsec-day10-display-hardware-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Wave it. Or film it. "
},
{
  "id": "fig-ht16k33-block",
  "level": "2",
  "url": "subsec-day10-display-hardware.html#fig-ht16k33-block",
  "type": "Figure",
  "number": "10.3.6",
  "title": "",
  "body": " The HT16K33's block diagram, from its datasheet. SDA and SCL enter the I2C controller on the left, which is the only way your program reaches it. The display RAM is where the individual bit patterns are stored for the segments you are currently lighting up. Each digit is stored as a 16-bit number (2 8-bit numbers); in the case of the 7-segment display we only use the first of these two bytes for each segment. We still need to send both bytes though (so we send a '0' after each 'real' piece of data). The controller can also control dot-matrix displays, keypads and more. That's why it has more capabilities than we need and in particular more storage in the display memory than we need. The common-scan and row-driver outputs on the right are the pins that go to the display's grid. The internal RC (resistor-capacitor) oscillator and timing generator sweep that grid from the RAM, continuously and without any further instruction. The key-scan and key-data blocks belong to the chip's other features, reading a keypad matrix, which we do not use. The annotations name four groups. In blue on the left, the two I2C pins. In magenta, the display RAM — the data registers, two bytes of eight bits for each COM line. In orange, the control registers, which are what the command table configures: display or keypad, digits or LED matrix, brightness and blinking. And in dark red on the right, the pins our display actually uses — five COM outputs, four for the digits and one for the colon, and eight ROW outputs, seven digit segments and the decimal point.   "
},
{
  "id": "subsec-day10-commands",
  "level": "1",
  "url": "subsec-day10-commands.html",
  "type": "Subsection",
  "number": "10.3.4",
  "title": "Part 4: Reading the Command Table",
  "body": " Part 4: Reading the Command Table  Now we'll read the HT16K33's own command table and build the three command bytes we have been sending to the chip at the start of our program helloDisplay.c . Most I2C devices have registers inside them that control their behavior, and you program them through commands the datasheet defines and which you send via I2C. The HT16K33's commands are one byte each, sent as the data of an ordinary write — exactly what the three given lines at the top of helloDisplay.c were doing, except that this time the byte will mean something.  The command table is on pages 24–25 of the HT16K33 datasheet. Its layout takes a moment to read: the eight columns D15 down to D8 are the bits of the command byte, most significant first. A column with a fixed 0 or 1 is part of the command's identity; a column with a name in it — S , D , B1 , P3 — is an option you fill in; and a column marked X is a don't-care, which we write as 0. For now we mostly care about the rows named System setup , Display setup and Dimming set ( ).   The rows of the HT16K33 command table we need, from pages 24–25 of its datasheet. The eight middle columns are the bits of the command byte, D15 down to D8, and the magenta line divides them: to its left the fixed bits that are the command itself, to its right the options you fill in. A name there — S , D , B1 , P3 — is an option you supply, and an X is a don't-care that we write as 0. System setup is 0 0 1 0 X X X S, where S is the internal oscillator: 0 leaves it off, 1 turns it on. Display setup is 1 0 0 0 X B1 B0 D, where D turns the display on and B1 B0 choose the blink rate — 00 for steady, then 2 Hz, 1 Hz and 0.5 Hz. Dimming set is 1 1 1 0 P3 P2 P1 P0, the duty cycle — the fraction of each digit's turn in the sweep for which its segments are actually driven, which the datasheet calls the pulse width of ROW — in sixteenths, where 0000 is 1\/16 and 1111 is 16\/16. The Def. column on the right is each command with its options at their default. Below, separated because we do not need it until , is the display data address pointer , which says where a block of display data starts. The chip has more commands than these, but they belong to its other job, scanning a keypad, and we will not be sending any of them.     Build the Three Startup Bytes   Work these out as binary and then write them as hex. All three are in .    System setup is 0b0010 X X X S . What byte turns the oscillator on?    Display setup is 0b1000 X B1 B0 D . What byte turns the display on and not blinking? What byte would turn it on and blinking at 1 Hz?    Dimming set is 0b1110 P3 P2 P1 P0 . What byte gives full brightness? Half?    All three are one-byte writes to the device. Which I2C library function sends one, and what are its two arguments?    The answers are 0x21 , 0x81 and 0xEF : 0b00100001 is system setup with the oscillator bit set, 0b10000001 is display setup with D set and both blink bits clear, and 0b11101111 is dimming set with all four duty bits set. Blinking at 1 Hz is 0b10000101 , 0x85 , because 1 Hz is B1 B0 = 1 0. Half brightness needs the encoding read carefully, because it counts from one rather than zero — 0000 is 1\/16 and 1111 is 16\/16 — so eight sixteenths is P3–P0 = 0111 and the byte is 0xE7 . Note that 0xE7 is the byte we have been sending in helloDisplay.c and so the display you have been watching has been running at half brightness the whole time. Each command is sent to the backpack chip via i2c1_byteWrite(HT16K33_ADDR, ...) — one function call per command, one transaction on the wire per call ( ).  Rather than writing those three numbers into your code, the header file you are given for the seven segment driver names their pieces: HT16K33_SYSTEM_CMD and HT16K33_OSC_ON for the first, HT16K33_DISPLAY_CMD , HT16K33_DISPLAY_ON , HT16K33_BLINK_OFF and HT16K33_BLINK_1HZ for the second, HT16K33_BRIGHT_CMD for the third. Each name is one field of the table, so a line of driver code reads the way the datasheet row does: the command, OR'ed with its options. That is the structure to copy the next time you write one of these — the datasheet's own layout becomes the header file's layout.  Sending the three command bytes is the first function of your seven segment driver. It has to run before the display will show anything at all, and it is three calls long. You write it in .      "
},
{
  "id": "fig-ht16k33-cmd-table",
  "level": "2",
  "url": "subsec-day10-commands.html#fig-ht16k33-cmd-table",
  "type": "Figure",
  "number": "10.3.9",
  "title": "",
  "body": " The rows of the HT16K33 command table we need, from pages 24–25 of its datasheet. The eight middle columns are the bits of the command byte, D15 down to D8, and the magenta line divides them: to its left the fixed bits that are the command itself, to its right the options you fill in. A name there — S , D , B1 , P3 — is an option you supply, and an X is a don't-care that we write as 0. System setup is 0 0 1 0 X X X S, where S is the internal oscillator: 0 leaves it off, 1 turns it on. Display setup is 1 0 0 0 X B1 B0 D, where D turns the display on and B1 B0 choose the blink rate — 00 for steady, then 2 Hz, 1 Hz and 0.5 Hz. Dimming set is 1 1 1 0 P3 P2 P1 P0, the duty cycle — the fraction of each digit's turn in the sweep for which its segments are actually driven, which the datasheet calls the pulse width of ROW — in sixteenths, where 0000 is 1\/16 and 1111 is 16\/16. The Def. column on the right is each command with its options at their default. Below, separated because we do not need it until , is the display data address pointer , which says where a block of display data starts. The chip has more commands than these, but they belong to its other job, scanning a keypad, and we will not be sending any of them.   "
},
{
  "id": "act-i2c-ht16k33-commands",
  "level": "2",
  "url": "subsec-day10-commands.html#act-i2c-ht16k33-commands",
  "type": "Activity",
  "number": "10.3.2",
  "title": "Build the Three Startup Bytes.",
  "body": " Build the Three Startup Bytes   Work these out as binary and then write them as hex. All three are in .    System setup is 0b0010 X X X S . What byte turns the oscillator on?    Display setup is 0b1000 X B1 B0 D . What byte turns the display on and not blinking? What byte would turn it on and blinking at 1 Hz?    Dimming set is 0b1110 P3 P2 P1 P0 . What byte gives full brightness? Half?    All three are one-byte writes to the device. Which I2C library function sends one, and what are its two arguments?   "
},
{
  "id": "subsec-day10-ram",
  "level": "1",
  "url": "subsec-day10-ram.html",
  "type": "Subsection",
  "number": "10.3.5",
  "title": "Part 5: The Display RAM, and the Byte That Is Always Zero",
  "body": " Part 5: The Display RAM, and the Byte That Is Always Zero  Commands configure the chip. Getting a pattern onto the display means writing its display RAM , and we'll read that RAM's layout off the datasheet slowly, because everything in the rest of the session is built on it ( ). Before that, is the piece that connects the display we took apart in the last part to the bytes we are about to send: which of the chip's outputs each digit and each segment is wired to.  One warning about the names first, because it is genuinely confusing. The datasheet calls the chip's outputs COM0 – COM7 and ROW0 – ROW15 , and it uses those names because the HT16K33 is built to drive a rectangular LED matrix, where the ROW lines really are the rows of a grid. On a seven-segment display they are nothing of the kind: ROW0 through ROW7 are the segments a through g and the decimal point, arranged around a figure eight and not in a row of anything. The name describes the chip, not our display. It will keep coming back — in the RAM map below, and in the dimming command, which sets what the datasheet calls the pulse width of ROW — so whenever you read ROW on this chip, read segment .   How the display's fourteen pins reach the HT16K33, and what that means for the buffer you fill in. Every LED sits where one COM line crosses one ROW line: the COM line is which digit, and the ROW line is which segment. Our display uses COM0 through COM4 — digit 1, digit 2, the colon, digit 3, digit 4 — and ROW0 through ROW7, which are a through g and the decimal point. So bit of the byte at display RAM address is the LED where COM crosses ROW . The colon is the one row that is not a full digit: its two dots share a single anode, which the breakout board ties to ROW1, the same line the b segments use.     The HT16K33's display RAM, from its datasheet: sixteen bytes, two per common line. The left column names the common line — the chip drives eight of them, COM0 to COM7, of which our display uses the first five: COM0 for the first digit, COM1 for the second digit, COM2 for the colon, COM3 for the third and COM4 for the fourth digit. The two hexadecimal addresses beside each COM entry hold that line's sixteen possible LEDs, ROW0 to ROW7 in the first byte and ROW8 to ROW15 in the second. The lower table gives the bit order within a byte: the upper row is the even address, D7 down to D0 mapping to ROW7 down to ROW0, and the lower one is the odd address, mapping to ROW15 down to ROW8. The arrows mark which COM line is which position on the display, and the box around COM0's pair is digit 1's two bytes. A seven-segment digit uses only the first eight rows, so for us the second byte of every pair is always 0 — and so only the even addresses 0x00, 0x02, 0x04, 0x06 and 0x08 are the five that carry anything. The segment map on the left is the same one you used yesterday, with g highlighted to match the boxed 6 in the bit-order table: bit 6 of a digit's byte is segment g .    Two bytes per digit, then, and the second one is always zero for us — the HT16K33 can drive sixteen LEDs per common line and our digits use eight. The first byte is the segments, in the same order you used yesterday — 0b DP g f e d c b a , most significant bit first. For example, to light a 0 you'd put 0b00111111 in the D7-D0 byte.  Five pairs, at addresses 0, 2, 4, 6 and 8: digit 1, digit 2, the colon, digit 3, digit 4. The colon sits in the middle because that is where it sits on the display.   Make a Pattern   Start on paper, not by writing code. The buffer is ten bytes, display_buffer[0] through display_buffer[9] .    Fill in all ten bytes to light every segment and every decimal point of all four digits, as drawn in . Write each byte in binary.    Now fill in all ten to display 0 1 2 3 .    Which byte would you change to add a decimal point after the second digit, and what would you change it to?    Every segment of every digit is 0b11111111 in bytes 0, 2, 6 and 8; every other byte, including the colon's pair at 4 and 5, is 0. To produce 0 1 2 3 on the display you put 0b00111111 , 0b00000110 , 0b01011011 , 0b01001111 in the same four places — worth deriving once by hand, after which you will use the numbertable[] array in the header, which holds the sixteen patterns for 0 through F. A decimal point after the second digit means setting bit 7 of display_buffer[2] .  That leaves two questions. The first is what lights the colon? We know it is the pair at address 4, because that is COM2, but which bit within that byte is not on the datasheet pages we have. It is worth two minutes of experiment, and tonight's clock needs the answer.   Find the Colon Bit   Work on a copy of your own helloDisplay.c . Its display_buffer already has the colon's pair in it, the two entries at index 4 and 5, both currently 0.    Before you flash anything: the colon has two dots and they always light together, so the display brings them out on one anode pin. That pin has to be tied to one of the eight the backpack drives. Which of a through DP would you bet on, and why?    Now find it. Set display_buffer[4] to 0b00000001 , flash, and look; then 0b00000010 , then 0b00000100 , and so on up. Which bit lights the colon? Is there a more efficient way to go about this experiment (remember bisection?)    Write down the number you would put in display_buffer[4] to show the colon, and save it — you'll need it when displaying a clock MM:SS .     The second question is why send the zeros at all, if the second byte of every pair does nothing?  The answer to the second question lies in the structure of the display RAM of the HT16K33 and how it is addressed. To write to the display RAM you use a pointer that holds the address of the RAM to which you'd like to write. When we write the entire display, we set the pointer to the start of the display RAM, and each write operation that is part of the same I2C transaction automatically advances the pointer to the next byte . This is what the datasheet means by the display data address pointer, and it is why writing ten bytes from address 0 fills addresses 0 through 9. The zeros are not decoration; they are what moves the pointer past the odd addresses so that the next real byte lands on the next digit. Leave them out and the second digit's pattern goes to address 1, which is the top (unused) half of digit 1.  All ten bytes go in one transaction ( ), and they have to: a STOP ends the transaction, and after a STOP the next write starts over with a new address. The library call for address the device, say where inside it, and send this many bytes is i2c1_memWrite() — the multi-byte function you have already called without knowing what it did, and this is what it was for.   Writing the whole display in one transaction — the HT16K33 datasheet calls this a page write, on page 22. After the START and the address comes one command byte, and because the display data address pointer command is 0 0 0 0 A3 A2 A1 A0, a command byte of 0x00 means start at display RAM address 0 . Every data byte after it is stored where the pointer is and moves the pointer on by one, so ten data bytes fill addresses 0 through 9. Each byte is acknowledged, and one STOP ends the whole transaction. It is the same transaction as the single command in , annotated the same way, with the data bytes added after the command byte.          "
},
{
  "id": "subsec-day10-ram-2",
  "level": "2",
  "url": "subsec-day10-ram.html#subsec-day10-ram-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "display RAM "
},
{
  "id": "fig-backpack-com-row",
  "level": "2",
  "url": "subsec-day10-ram.html#fig-backpack-com-row",
  "type": "Figure",
  "number": "10.3.12",
  "title": "",
  "body": " How the display's fourteen pins reach the HT16K33, and what that means for the buffer you fill in. Every LED sits where one COM line crosses one ROW line: the COM line is which digit, and the ROW line is which segment. Our display uses COM0 through COM4 — digit 1, digit 2, the colon, digit 3, digit 4 — and ROW0 through ROW7, which are a through g and the decimal point. So bit of the byte at display RAM address is the LED where COM crosses ROW . The colon is the one row that is not a full digit: its two dots share a single anode, which the breakout board ties to ROW1, the same line the b segments use.   "
},
{
  "id": "fig-display-ram-map",
  "level": "2",
  "url": "subsec-day10-ram.html#fig-display-ram-map",
  "type": "Figure",
  "number": "10.3.13",
  "title": "",
  "body": " The HT16K33's display RAM, from its datasheet: sixteen bytes, two per common line. The left column names the common line — the chip drives eight of them, COM0 to COM7, of which our display uses the first five: COM0 for the first digit, COM1 for the second digit, COM2 for the colon, COM3 for the third and COM4 for the fourth digit. The two hexadecimal addresses beside each COM entry hold that line's sixteen possible LEDs, ROW0 to ROW7 in the first byte and ROW8 to ROW15 in the second. The lower table gives the bit order within a byte: the upper row is the even address, D7 down to D0 mapping to ROW7 down to ROW0, and the lower one is the odd address, mapping to ROW15 down to ROW8. The arrows mark which COM line is which position on the display, and the box around COM0's pair is digit 1's two bytes. A seven-segment digit uses only the first eight rows, so for us the second byte of every pair is always 0 — and so only the even addresses 0x00, 0x02, 0x04, 0x06 and 0x08 are the five that carry anything. The segment map on the left is the same one you used yesterday, with g highlighted to match the boxed 6 in the bit-order table: bit 6 of a digit's byte is segment g .   "
},
{
  "id": "act-i2c-make-pattern",
  "level": "2",
  "url": "subsec-day10-ram.html#act-i2c-make-pattern",
  "type": "Activity",
  "number": "10.3.3",
  "title": "Make a Pattern.",
  "body": " Make a Pattern   Start on paper, not by writing code. The buffer is ten bytes, display_buffer[0] through display_buffer[9] .    Fill in all ten bytes to light every segment and every decimal point of all four digits, as drawn in . Write each byte in binary.    Now fill in all ten to display 0 1 2 3 .    Which byte would you change to add a decimal point after the second digit, and what would you change it to?   "
},
{
  "id": "act-i2c-find-colon",
  "level": "2",
  "url": "subsec-day10-ram.html#act-i2c-find-colon",
  "type": "Activity",
  "number": "10.3.4",
  "title": "Find the Colon Bit.",
  "body": " Find the Colon Bit   Work on a copy of your own helloDisplay.c . Its display_buffer already has the colon's pair in it, the two entries at index 4 and 5, both currently 0.    Before you flash anything: the colon has two dots and they always light together, so the display brings them out on one anode pin. That pin has to be tied to one of the eight the backpack drives. Which of a through DP would you bet on, and why?    Now find it. Set display_buffer[4] to 0b00000001 , flash, and look; then 0b00000010 , then 0b00000100 , and so on up. Which bit lights the colon? Is there a more efficient way to go about this experiment (remember bisection?)    Write down the number you would put in display_buffer[4] to show the colon, and save it — you'll need it when displaying a clock MM:SS .   "
},
{
  "id": "subsec-day10-ram-14",
  "level": "2",
  "url": "subsec-day10-ram.html#subsec-day10-ram-14",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "automatically advances the pointer to the next byte "
},
{
  "id": "fig-ht16k33-page-write",
  "level": "2",
  "url": "subsec-day10-ram.html#fig-ht16k33-page-write",
  "type": "Figure",
  "number": "10.3.14",
  "title": "",
  "body": " Writing the whole display in one transaction — the HT16K33 datasheet calls this a page write, on page 22. After the START and the address comes one command byte, and because the display data address pointer command is 0 0 0 0 A3 A2 A1 A0, a command byte of 0x00 means start at display RAM address 0 . Every data byte after it is stored where the pointer is and moves the pointer on by one, so ten data bytes fill addresses 0 through 9. Each byte is acknowledged, and one STOP ends the whole transaction. It is the same transaction as the single command in , annotated the same way, with the data bytes added after the command byte.   "
},
{
  "id": "subsec-day10-pins",
  "level": "1",
  "url": "subsec-day10-pins.html",
  "type": "Subsection",
  "number": "10.3.6",
  "title": "Part 6: The Pins, and Why They Must Be Open-Drain",
  "body": " Part 6: The Pins, and Why They Must Be Open-Drain  Now we'll look at the STM32C0 peripheral which sits at the other end of the two wires. A peripheral inside the chip has to reach the outside world through pins, and which pins it can use is not up to us ( ). Even though we only have one I2C peripheral on our STM32C0 chip, it's referred to as I2C1 for reasons of software compatibility with more capable chips. I2C1's SCL and SDA signals are available on several pin pairs, and the pair we use is PB8 for SCL and PB9 for SDA , because those two are the Nucleo's Arduino-standard I2C pins — D15 and D14 on the header — and every Arduino-shaped board puts I2C there.   The Nucleo-C031C6's pinout with every I2C-capable pin marked in orange. I2C1's SCL and SDA appear on several pairs; the one this course uses is D15 (PB8, SCL) and D14 (PB9, SDA), marked standard Arduino choice , because that is where every Arduino-shaped board puts its I2C bus. The green labels are the STM32C031C6 port pin behind each header pin.    Getting a peripheral's signal onto a pin is the alternate-function mechanism you first used for the UART: put the pin in alternate function mode with MODER , then choose which alternate function with AFR . The number to choose is in the datasheet, not the reference manual — DS13867 Table 15, Port B alternate function mapping , where the PB8 row and the PB9 row both name I2C1 under AF6 ( ).   Table 15 of the STM32C031 datasheet, DS13867 , Port B alternate function mapping . The lookup is two rows and one column: find PB8 and PB9 down the left, run across to the AF6 column, and I2C1_SCL and I2C1_SDA are what is written where they meet. That is where the 6 in GPIO_AF6 comes from. PB6 and PB7 carry I2C1 on AF6 too, which is the several pin pairs of seen from the table's side. The reference manual does not carry this table; only the datasheet does.    One thing that is new is that rather than being in push-pull mode, both pins have to be configured open-drain . This is accomplished via the GPIO output type register GPIOx_OTYPER (RM0490 §6.4.2), where a 1 in bit means pin is open-drain and 0 — the reset value — means push-pull. A push-pull output has two transistors, one pulling the pin up to 3.3 V and one pulling it down, and it always drives the pin to one rail or the other. We made use of this type of behavior when driving LED's, for example. An open-drain output has only the pull-down: writing a 0 pulls the pin LOW, and writing a 1 turns the transistor off and leaves the pin floating, so the external pull-up sets the level.  This behavior is necessary on the I2C bus: SDA changes hands every ninth bit — on a write the controller drives eight bits then lets go of the data line and the device drives the acknowledge, on a read it is the other way round. Letting go of the data line means to let the line float, not to force it to ground or 3.3 V. is what that moment looks like. If both ends were push-pull, one driving HIGH and one driving LOW would put a transistor from 3.3 V and a transistor to ground both switched on across the same wire — a short circuit, limited only by what the two output stages can survive. With open-drain outputs there is no such path: the strongest thing any device can do is pull the line LOW, the only route from 3.3 V is through the pull-up resistor, and the worst case of two devices disagreeing is that the line reads LOW.   A disagreement between controller and device, wired two ways. On the left, two push-pull outputs on one wire: each has a transistor to 3.3 V and one to ground, and when one drives HIGH while the other drives LOW both are switched on across the same wire and current runs straight from the supply to ground. Nothing decides what the wire's voltage is. On the right, the same two devices as open-drain outputs: the transistor to 3.3 V is gone and a single pull-up resistor takes its place, so one device pulling LOW while the other releases has no path except through that resistor. The wire reads LOW, no damage is possible, and — because releasing is the only way to send a 1 — a device that releases and then reads LOW knows somebody else is pulling.    This is also why the pull-up matters. The ACK works because of the pull-up and the open-drain configuration, and so do two other features: several controllers can share one bus (we will see this soon), and a device can hold SCL LOW to ask for more time (we will not be using this feature). You can read more about this in .  The pull-ups themselves are typically 5 kΩ to 10 kΩ, and for the devices we use in this class we do not need to install any since both come on breakout boards that carry their own. That is worth checking on the datasheet of anything you add. If there were no pull-up anywhere then the line could never be released HIGH — nothing on an open-drain bus drives HIGH, as the paragraph above explains, so the level is simply undefined. The reason that the value for the pull-up resistor is a range rather than a number is that it is squeezed from both ends: too small and the device pulling LOW has to sink more current than it can while still holding the line below the receiver's threshold; too large and the resistor charges the bus's own capacitance too slowly for the line to get back up before the next clock edge. If you are interested in reading about finding a good value for your setup, go on to .  The pin configurations happen in i2c1_init() , which we used yesterday already. In that function, we configure the pins first, then the peripheral, with one ordering detail in the middle: the timing register may only be written while the peripheral is disabled, so PE , which enables the peripheral, is cleared before TIMINGR is touched and set again afterwards.  void i2c1_init(void){ \/\/ Configure pins PB8 and PB9 \/\/ Enable clock access to GPIOB (for PB8 and PB9) RCC->IOPENR |= RCC_IOPENR_GPIOBEN; \/\/ Set PB8 and PB9 to alternate function mode GPIOB->MODER = (GPIOB->MODER & ~GPIO_MODER_MODE8_Msk) | (GPIO_ALTERNATE << GPIO_MODER_MODE8_Pos); GPIOB->MODER = (GPIOB->MODER & ~GPIO_MODER_MODE9_Msk) | (GPIO_ALTERNATE << GPIO_MODER_MODE9_Pos); \/\/ Next, select AF6 for these pins. GPIOB->AFR[1] = ((GPIOB->AFR[1]) & ~GPIO_AFRH_AFSEL8_Msk) | (GPIO_AF6 << GPIO_AFRH_AFSEL8_Pos); GPIOB->AFR[1] = ((GPIOB->AFR[1]) & ~GPIO_AFRH_AFSEL9_Msk) | (GPIO_AF6 << GPIO_AFRH_AFSEL9_Pos); \/\/ Set PB8 and PB9 to open drain GPIOB->OTYPER |= (GPIO_OTYPER_OT8 | GPIO_OTYPER_OT9); \/\/ Enable pull-ups for PB8 and PB9 if needed: our devices have their own pull-ups. \/\/ Configure the i2c module \/\/ Enable clock access to I2C1 RCC->APBENR1 |= RCC_APBENR1_I2C1EN; \/\/ Enter reset mode (disable peripheral) I2C1->CR1 &= ~I2C_CR1_PE; \/\/ Timing settings: Standard mode (100kHz) with 12MHz I2CCLK I2C1->TIMINGR &= 0x0; \/\/ clear timing register I2C1->TIMINGR |= (0x2 << I2C_TIMINGR_PRESC_Pos); I2C1->TIMINGR |= (0x4 << I2C_TIMINGR_SCLDEL_Pos) | (0x2 << I2C_TIMINGR_SDADEL_Pos); I2C1->TIMINGR |= (0xf << I2C_TIMINGR_SCLH_Pos) | (0x13 << I2C_TIMINGR_SCLL_Pos); \/\/ Exit reset mode (enable peripheral) I2C1->CR1 |= I2C_CR1_PE; }  The alternate function selection consists of two 32-bit registers ( AFR[0] and AFR[1] ), the first one for pins 0–7 and the second one for pins 8–15. So PB8 and PB9 are configured in AFR[1] . The reference manual calls this register for the higher-numbered pins GPIOx_AFRH , which is why the field names read GPIO_AFRH_AFSEL8 .  The four TIMINGR lines we will leave alone. They set how long SCL spends HIGH, how long it spends LOW, and how long the peripheral waits around the edges before it changes or samples SDA, and the values are the ones this board needs at 100 kHz. works out where PRESC comes from and checks SCLL and SCLH against the bus speed, which is worth reading the day you move this code to a board whose clock runs at a different speed.         "
},
{
  "id": "subsec-day10-pins-2",
  "level": "2",
  "url": "subsec-day10-pins.html#subsec-day10-pins-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "PB8 for SCL and PB9 for SDA "
},
{
  "id": "fig-i2c-pins",
  "level": "2",
  "url": "subsec-day10-pins.html#fig-i2c-pins",
  "type": "Figure",
  "number": "10.3.18",
  "title": "",
  "body": " The Nucleo-C031C6's pinout with every I2C-capable pin marked in orange. I2C1's SCL and SDA appear on several pairs; the one this course uses is D15 (PB8, SCL) and D14 (PB9, SDA), marked standard Arduino choice , because that is where every Arduino-shaped board puts its I2C bus. The green labels are the STM32C031C6 port pin behind each header pin.   "
},
{
  "id": "subsec-day10-pins-4",
  "level": "2",
  "url": "subsec-day10-pins.html#subsec-day10-pins-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "AF6 "
},
{
  "id": "fig-stm32-af-pb8-pb9",
  "level": "2",
  "url": "subsec-day10-pins.html#fig-stm32-af-pb8-pb9",
  "type": "Figure",
  "number": "10.3.19",
  "title": "",
  "body": " Table 15 of the STM32C031 datasheet, DS13867 , Port B alternate function mapping . The lookup is two rows and one column: find PB8 and PB9 down the left, run across to the AF6 column, and I2C1_SCL and I2C1_SDA are what is written where they meet. That is where the 6 in GPIO_AF6 comes from. PB6 and PB7 carry I2C1 on AF6 too, which is the several pin pairs of seen from the table's side. The reference manual does not carry this table; only the datasheet does.   "
},
{
  "id": "subsec-day10-pins-6",
  "level": "2",
  "url": "subsec-day10-pins.html#subsec-day10-pins-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "open-drain "
},
{
  "id": "fig-open-drain",
  "level": "2",
  "url": "subsec-day10-pins.html#fig-open-drain",
  "type": "Figure",
  "number": "10.3.20",
  "title": "",
  "body": " A disagreement between controller and device, wired two ways. On the left, two push-pull outputs on one wire: each has a transistor to 3.3 V and one to ground, and when one drives HIGH while the other drives LOW both are switched on across the same wire and current runs straight from the supply to ground. Nothing decides what the wire's voltage is. On the right, the same two devices as open-drain outputs: the transistor to 3.3 V is gone and a single pull-up resistor takes its place, so one device pulling LOW while the other releases has no path except through that resistor. The wire reads LOW, no damage is possible, and — because releasing is the only way to send a 1 — a device that releases and then reads LOW knows somebody else is pulling.   "
},
{
  "id": "subsec-day10-library",
  "level": "1",
  "url": "subsec-day10-library.html",
  "type": "Subsection",
  "number": "10.3.7",
  "title": "Part 7a: What an I2C Library Has to Provide",
  "body": " Part 7a: What an I2C Library Has to Provide  We observed the I2C protocol on the AD2 oscilloscope yesterday. Before we open the I2C library, try to work out what functions need to be in it. A program talking to a device on the I2C bus needs a small number of operations, and you can derive the list from what you know at this point.   What Five Things Does the Library Have to Do?   Work individually first, then compare your list with your table group. Think about what a transaction consists of and what a program has to be able to do with a device.    Open your own helloDisplay.c . Three of the operations needed of an I2C library can be seen in this program. Name them from the calls you can see, and for each one write down what the program had to pass to the function in order to call it.    Recall your own capture on the AD2 yesterday. Which of those three calls produced the START, the address, the ACK, the data byte and the STOP you captured? Looking only at the trace, could you tell a one-byte write from a multi-byte one?    Two operations needed of an I2C library are still missing. Your capture from yesterday shows one acknowledge per byte and never a byte coming back to you. What I2C operations cannot be built out of the three calls we have seen in helloDisplay.c ?    One of the five things needed of an I2C library has nothing to do with any particular device. What is it and what does it have to set up?    The five, in the order this course's library gives them. There is initialization , which happens once and belongs to the bus rather than to any device: claim the pins, set the clock rate, switch the peripheral on. Then write one byte to a device and read one byte from it, which is all the loop at the end of helloDisplay.c ever does. Then write several bytes and read several bytes in a single transaction — and those two carry one extra argument, because a device with more than one thing inside it needs to be told where the bytes are going. In C:  \/* Configure I2C pins, initialize bus speed *\/ void i2c1_init(void); \/* Write one byte to target *\/ void i2c1_byteWrite(uint8_t deviceAddr, uint8_t data); \/* Read one byte from a target *\/ void i2c1_byteRead(uint8_t deviceAddr, uint8_t *data); \/* Write one or more bytes to a memory location within target *\/ void i2c1_memWrite(uint8_t deviceAddr, uint8_t registerAddr, uint8_t nbytes, uint8_t *data); \/* Read one or more bytes from a memory location within target *\/ void i2c1_memRead(uint8_t deviceAddr, uint8_t registerAddr, uint8_t nbytes, uint8_t *data);  Why several bytes in one transaction is a separate function and not a loop over the single-byte one: between two calls to i2c1_byteWrite() the bus goes back to idle, with a STOP after the first and a fresh START before the second. Some devices treat that as two unrelated instructions rather than one longer one, and the seven-segment display is one of them: the display takes its ten bytes in a single transaction, see .  Reading a byte from a target can be accomplished in one I2C transaction, and this is what happens in i2c1_byteRead() . Reading one or more registers from a device takes two steps: first a write transaction to the device that tells it from which of its registers to read, then the read transaction. The I2C protocol's answer is to join the two with a repeated START instead of a STOP, so that nothing else can get onto the bus in between, see also . Our i2c1_memRead() does not go that far — it sends the register address, lets the transaction end, and starts a second one — which works on a bus with one controller on it, and is worth knowing before you meet a bus with two. Either way, that is why it exists alongside i2c1_byteRead() : the register address goes first.    "
},
{
  "id": "act-i2c-five-operations",
  "level": "2",
  "url": "subsec-day10-library.html#act-i2c-five-operations",
  "type": "Activity",
  "number": "10.3.5",
  "title": "What Five Things Does the Library Have to Do?",
  "body": " What Five Things Does the Library Have to Do?   Work individually first, then compare your list with your table group. Think about what a transaction consists of and what a program has to be able to do with a device.    Open your own helloDisplay.c . Three of the operations needed of an I2C library can be seen in this program. Name them from the calls you can see, and for each one write down what the program had to pass to the function in order to call it.    Recall your own capture on the AD2 yesterday. Which of those three calls produced the START, the address, the ACK, the data byte and the STOP you captured? Looking only at the trace, could you tell a one-byte write from a multi-byte one?    Two operations needed of an I2C library are still missing. Your capture from yesterday shows one acknowledge per byte and never a byte coming back to you. What I2C operations cannot be built out of the three calls we have seen in helloDisplay.c ?    One of the five things needed of an I2C library has nothing to do with any particular device. What is it and what does it have to set up?   "
},
{
  "id": "subsec-day10-library-4",
  "level": "2",
  "url": "subsec-day10-library.html#subsec-day10-library-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "initialization write one byte read one byte write several bytes read several bytes "
},
{
  "id": "subsec-day10-bytewrite",
  "level": "1",
  "url": "subsec-day10-bytewrite.html",
  "type": "Subsection",
  "number": "10.3.8",
  "title": "Part 7b: Opening i2c1_byteWrite()",
  "body": " Part 7b: Opening i2c1_byteWrite()  Those five functions are the interface with the I2C hardware; we'll now investigate one of them in more detail. i2c1_byteWrite() is the one that produced the trace you captured yesterday, and it is short enough to read in full. Here is its sending half:  \/\/ Ping target address for writing 1 byte, use \"=\" to ensure all other bits are cleared I2C1->CR2 = (deviceAddr<<1) | (1U << I2C_CR2_NBYTES_Pos) \/\/ sending one byte only | I2C_CR2_AUTOEND \/\/ Send Stop condition after transfer | I2C_CR2_START; \/\/ Send Start condition while( !(I2C1->ISR & I2C_ISR_BUSY) ); \/\/ Wait until Start is received \/\/ Send the data if( !(I2C1->ISR & I2C_ISR_NACKF) ) { \/\/ Make sure ACK received while( !(I2C1->ISR & I2C_ISR_TXIS) ); \/\/ Wait for TX to be ready I2C1->TXDR = data; \/\/ put data in send register }  Five fields go into I2C_CR2 in that one assignment, and between them they describe the entire transaction before any of it happens: who (the address, shifted left by one into the SADD field), which direction ( RD_WRN , left at 0 here, which means write), how many bytes ( NBYTES ), what to do at the end ( AUTOEND , which makes the hardware send the STOP on its own), and go ( START ). Writing that last bit is what puts the START condition on the wire; everything you watched on the oscilloscope followed from this one line. shows where those five fields sit in the register.   I2C control register 2, from RM0490 §23.7.2, with the five fields the course's library writes boxed. In the lower row, SADD[9:0] holds the address; RD_WRN is the transfer direction, 0 for a write and 1 for a read; and START is the bit whose being written is what puts a START condition on the wire. In the upper row, NBYTES[7:0] is how many data bytes this transaction will carry, and AUTOEND makes the hardware issue the STOP by itself once they have gone. The remaining fields — NACK , HEAD10R , ADD10 , RELOAD and PECBYTE — belong to target mode, 10-bit addressing, transfers longer than 255 bytes, and SMBus, none of which this course uses. STOP is the exception: it is a controller bit, and it is how software ends a transfer itself when AUTOEND is clear.    Notice the = , and the comment on it. The habit from the timer chapter — assign a whole mask rather than compound-assigning one bit ( ) — applies here for a different reason than it did there. On a status register the danger was what the read-back would clear. I2C_CR2 is a control register and reads back fine; the danger is what is left over . The address, the direction and the byte count from the previous transaction are all still sitting in it, and |= cannot clear a bit — so an |= here would leave the old address ORed with the new one. Assigning the whole mask overwrites every bit and therefore fills in the desired transaction completely.  The two waits (blocking while loops) are there to ensure the peripheral is ready for the next step. The I2C_ISR_BUSY flag comes up when the START has actually appeared on the bus, and I2C_ISR_TXIS flag — transmit interrupt status — comes up when the transmit register is empty and the hardware is ready for the byte, which happens after the address has been sent and acknowledged. is the reference manual's own picture of that sequence, albeit for sending two bytes rather than one. Reading a byte has a similar shape with three changes: I2C_CR2_RD_WRN needs to be set, we need to wait on I2C_ISR_RXNE instead of TXIS , and we take the data out of the receive data register via *data = I2C1->RXDR; instead of the write.   RM0490's transfer diagram for a controller writing two bytes with automatic end mode, with the parts named. The setup step programs the address, the byte count and AUTOEND and sets START; the hardware then puts the START condition, the address and the R\/W bit on the wire and collects the ACK. TXIS rises once per byte, each time the transmit data register is free — that is the flag i2c1_byteWrite() waits on before writing I2C1->TXDR . NBYTES holds the programmed count — 2 for the whole of this transfer — and once that many bytes have gone out, AUTOEND puts the STOP on the wire without any further help from the program.    Everything below I2C1->CR2 is done by the I2C hardware. Nothing in this library counts clock edges or times a pulse; it sets up a transaction, and the peripheral shifts the bits out, generates the START and the STOP, releases SDA for the ACK slot and reports what came back. What is left for software is describing the transaction and reading the flags — has the peripheral's own block diagram, if you want to see what the peripheral's state machine is made of.      "
},
{
  "id": "fig-i2c-cr2",
  "level": "2",
  "url": "subsec-day10-bytewrite.html#fig-i2c-cr2",
  "type": "Figure",
  "number": "10.3.24",
  "title": "",
  "body": " I2C control register 2, from RM0490 §23.7.2, with the five fields the course's library writes boxed. In the lower row, SADD[9:0] holds the address; RD_WRN is the transfer direction, 0 for a write and 1 for a read; and START is the bit whose being written is what puts a START condition on the wire. In the upper row, NBYTES[7:0] is how many data bytes this transaction will carry, and AUTOEND makes the hardware issue the STOP by itself once they have gone. The remaining fields — NACK , HEAD10R , ADD10 , RELOAD and PECBYTE — belong to target mode, 10-bit addressing, transfers longer than 255 bytes, and SMBus, none of which this course uses. STOP is the exception: it is a controller bit, and it is how software ends a transfer itself when AUTOEND is clear.   "
},
{
  "id": "fig-i2c-master-tx",
  "level": "2",
  "url": "subsec-day10-bytewrite.html#fig-i2c-master-tx",
  "type": "Figure",
  "number": "10.3.25",
  "title": "",
  "body": " RM0490's transfer diagram for a controller writing two bytes with automatic end mode, with the parts named. The setup step programs the address, the byte count and AUTOEND and sets START; the hardware then puts the START condition, the address and the R\/W bit on the wire and collects the ACK. TXIS rises once per byte, each time the transmit data register is free — that is the flag i2c1_byteWrite() waits on before writing I2C1->TXDR . NBYTES holds the programmed count — 2 for the whole of this transfer — and once that many bytes have gone out, AUTOEND puts the STOP on the wire without any further help from the program.   "
},
{
  "id": "subsec-day10-layers",
  "level": "1",
  "url": "subsec-day10-layers.html",
  "type": "Subsection",
  "number": "10.3.9",
  "title": "Part 8a: Layers, and What You Are Replacing",
  "body": " Part 8a: Layers, and What You Are Replacing  Let's step back from the code for a moment ( ). Imagine you'd like to write a program that takes some measurements via the ADC and then puts those onto the seven-segment display. To communicate with the display (or with the ADC for that matter) you wouldn't really want to have to program the machine registers — I2C1->CR2 , GPIOB->MODER — which belong to the STM32C031C6, from your main program. Rather, we have interface drivers : uart.c , adc.c , i2c.c . From here on those are the only files that should touch a machine register, and each one turns one peripheral into a handful of functions.  But there is another layer yet: When programming the seven-segment display, it would be much more convenient to use commands such as SevenSeg_blink() and SevenSeg_dim() rather than having to think about all necessary I2C commands to accomplish these. That's where another layer comes in, the so-called device drivers .  A device driver knows about one device: its commands, its addresses, its quirks. It does not know how the bytes get there. SevenSegPartial.c , which is the file you are about to open, may call i2c1_byteWrite() as often as it likes and may not touch I2C1->CR2 even once. The point is not tidiness — it is that the same display driver runs unchanged on any board whose I2C library offers those five functions, and that the day you move to a different microcontroller you rewrite i2c.c and nothing else.  On top is main() , which calls SevenSeg_write() and has no idea there is a bus involved at all.   The four layers of a firmware design. At the bottom, the microcontroller's own registers. Above them the interface drivers, the only code that reaches a machine register: i2c.c , uart.c and adc.c here. Above those the device drivers, which reach a device's registers only through an interface driver and never touch a machine register. For example, stdio.c is a device driver that uses the interface driver uart.c . Without stdio.c we wouldn't have a printf() function. At the very top we have main() , which calls devices through their drivers and knows about neither kind of register. The box labeled device.c in this image is what you will be working on for the seven-segment display. You'll communicate with the display via its backpack chip over I2C, but only through the i2c.c interface driver.    You are given parts of the device driver in a file called SevenSegPartial.c - as the name suggests, this file is unfinished. When it is done you will rename it SevenSeg.c and move it into mylib beside i2c.c , so that it is ready for Lab 5.    "
},
{
  "id": "subsec-day10-layers-2",
  "level": "2",
  "url": "subsec-day10-layers.html#subsec-day10-layers-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "interface drivers "
},
{
  "id": "subsec-day10-layers-3",
  "level": "2",
  "url": "subsec-day10-layers.html#subsec-day10-layers-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "device drivers "
},
{
  "id": "subsec-day10-layers-4",
  "level": "2",
  "url": "subsec-day10-layers.html#subsec-day10-layers-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "device driver "
},
{
  "id": "fig-firmware-layers",
  "level": "2",
  "url": "subsec-day10-layers.html#fig-firmware-layers",
  "type": "Figure",
  "number": "10.3.28",
  "title": "",
  "body": " The four layers of a firmware design. At the bottom, the microcontroller's own registers. Above them the interface drivers, the only code that reaches a machine register: i2c.c , uart.c and adc.c here. Above those the device drivers, which reach a device's registers only through an interface driver and never touch a machine register. For example, stdio.c is a device driver that uses the interface driver uart.c . Without stdio.c we wouldn't have a printf() function. At the very top we have main() , which calls devices through their drivers and knows about neither kind of register. The box labeled device.c in this image is what you will be working on for the seven-segment display. You'll communicate with the display via its backpack chip over I2C, but only through the i2c.c interface driver.   "
},
{
  "id": "subsec-day10-first-digit",
  "level": "1",
  "url": "subsec-day10-first-digit.html",
  "type": "Subsection",
  "number": "10.3.10",
  "title": "Part 8b: SevenSeg_init(), and One Digit",
  "body": " Part 8b: SevenSeg_init(), and One Digit  You put a character on a digit yesterday, using a program that had the three setup commands written into it for you. Now you will package versions of these three commands into an initialization function, which is the first function of the device driver you need to write.  Three files are on Canvas: SevenSegPartial.c , SevenSegPartial.h and writeFirstDigit.c . The first two are the driver, and as the name says they are not finished. SevenSegPartial.c is the file your driver goes in, and it arrives as four empty functions with their signatures already written. Fill in the first one now; the other three are .  #include \"ES28.h\" #include \"i2c.h\" #include \"SevenSegPartial.h\" \/\/ Initialize the display: oscillator on, display on and steady, full brightness void SevenSeg_init() { \/\/ TODO 1 -- three one-byte writes, in this order: system setup with the \/\/ oscillator on, display setup with the display on and not \/\/ blinking, and dimming set to full brightness. Build each \/\/ byte out of the names in SevenSegPartial.h. } \/\/ Change the display flashing void SevenSeg_blink(uint8_t rate) { \/\/ TODO 2 -- one byte: the display-setup command, the display-on bit, and \/\/ the caller's rate masked to the two blink bits. } \/\/ Dim the display void SevenSeg_dim(uint8_t brightness) { \/\/ TODO 3 -- one byte: the dimming command with the caller's brightness \/\/ masked to the four brightness bits. } \/\/ Write the display RAM void SevenSeg_write(uint8_t *display_buffer) { \/\/ display_buffer is size 2*HT16K33_NBUF (low byte, high byte) \/\/ TODO 4 -- one call. Every byte in ONE transaction, starting at display \/\/ RAM address HT16K33_ADDR_PTR. Do not touch an I2C register \/\/ directly -- go through the i2c library. }  To test what you write, you are given the third file, writeFirstDigit.c . It puts one character on one digit, and it will do nothing at all until SevenSeg_init() exists.  #include \"ES28.h\" #include \"i2c.h\" #include \"SevenSegPartial.h\" int main(void) { uint8_t display_addr = HT16K33_ADDR; uint8_t display_subaddr = 0; \/\/ 0, 2, 4, 6, 8 - depending on the digit uint8_t digit_data = 0b01111001; \/\/ 'E' i2c1_init(); SevenSeg_init(); while(1) { i2c1_memWrite(display_addr, display_subaddr, 1, &digit_data); delay_ms(250); } return 1; }  Three arguments of that i2c1_memWrite() call are worth naming, because they are the same three every time. display_addr is who — the device on the bus. display_subaddr is where inside it — the display RAM address the pointer starts at (so where in the display RAM we start writing). The 1 (in this case) is how many bytes follow, with &digit_data being where those bytes are stored. Because we are only writing one digit here, we use the number 1 . The 0b01111001 is an E : bits 0, 3, 4, 5 and 6 are on, so that lights up LED segments a d e f g .   Write One Digit, Then Another   Three files are on Canvas: SevenSegPartial.c , SevenSegPartial.h and writeFirstDigit.c . Download all three, then set the project up in two steps.    Copy TemplateProject to a new project named SevenSegI2CSecondSteps .    Put SevenSegPartial.c and writeFirstDigit.c in that project's Src folder, and SevenSegPartial.h in its Inc folder — the .c files in Src , the .h file in Inc . Build it before you change anything: it should compile and do nothing.    Fill in TODO 1, SevenSeg_init() , with the three commands you derived from the command table — written using the header's names, not as 0x21, 0x81 and 0xEF. Build, flash, and confirm the first digit shows an E .    Move it: change one line so the E appears on the second digit, then the third, then the fourth. The digits are at display_subaddr 0, 2, 6 and 8 — 4 is the colon, which you found the bit for earlier.    Change what it says: make the digit show an S , then a 2 , then an 8 . Derive each pattern from .     Three transactions, not one: each is a separate command, and the HT16K33 wants each one addressed to it in its own right. The oscillator command is the one that has to come first: until the oscillator is running the chip drives nothing at all. Part 9 asks you what happens if this command goes last instead.   Nothing lights up? If helloDisplay.c worked at the start of class, the fault is in your code, not your wiring: check that SevenSeg_init() is actually called, and that the oscillator command is in it — see above.     "
},
{
  "id": "act-i2c-first-digit",
  "level": "2",
  "url": "subsec-day10-first-digit.html#act-i2c-first-digit",
  "type": "Activity",
  "number": "10.3.6",
  "title": "Write One Digit, Then Another.",
  "body": " Write One Digit, Then Another   Three files are on Canvas: SevenSegPartial.c , SevenSegPartial.h and writeFirstDigit.c . Download all three, then set the project up in two steps.    Copy TemplateProject to a new project named SevenSegI2CSecondSteps .    Put SevenSegPartial.c and writeFirstDigit.c in that project's Src folder, and SevenSegPartial.h in its Inc folder — the .c files in Src , the .h file in Inc . Build it before you change anything: it should compile and do nothing.    Fill in TODO 1, SevenSeg_init() , with the three commands you derived from the command table — written using the header's names, not as 0x21, 0x81 and 0xEF. Build, flash, and confirm the first digit shows an E .    Move it: change one line so the E appears on the second digit, then the third, then the fourth. The digits are at display_subaddr 0, 2, 6 and 8 — 4 is the colon, which you found the bit for earlier.    Change what it says: make the digit show an S , then a 2 , then an 8 . Derive each pattern from .   "
},
{
  "id": "subsec-day10-driver",
  "level": "1",
  "url": "subsec-day10-driver.html",
  "type": "Subsection",
  "number": "10.3.11",
  "title": "Part 8c: The Rest of the Driver",
  "body": " Part 8c: The Rest of the Driver   SevenSegPartial.c has three functions left in it, and their prototypes are already in the header. Two use the one-byte write style you used in SevenSeg_init() in order to send commands to the display. SevenSeg_write() puts all ten display bytes into the display RAM in one transaction.  void SevenSeg_init(); \/\/ Initialize the display void SevenSeg_blink(uint8_t rate); \/\/ Blink the display void SevenSeg_dim(uint8_t brightness); \/\/ Dim the display void SevenSeg_write(uint8_t *display_buffer); \/\/ Write the display RAM void SevenSeg_number(uint16_t num, uint8_t *display_buffer); \/\/ Convert a number to segments   SevenSeg_blink() and SevenSeg_dim() are each one call to i2c1_byteWrite() , sending the display-setup and dimming commands you derived earlier, with the caller's option bits ORed in. Mask the argument to the bits the command actually has — 0x6 for the two blink bits, 0xf for the four brightness bits — so that a caller passing something out of range cannot corrupt the command itself.   SevenSeg_write() is where the entire display RAM is written. The function receives a pointer to a ten-byte buffer which holds the desired LED pattern, and it has to get all ten bytes into the display RAM starting at address 0, in one transaction. Everything needed for that is in i2c1_memWrite() 's four arguments; the function is one line.   Finish the Driver and Show ES.28   You'll work in SevenSegPartial.c . Its header file defines everything you need. HT16K33_ADDR is the display's I2C address, and the command names are the ones you derived from the command table. HT16K33_ADDR_PTR is the address of the first byte of the display RAM, which is where a full write starts. HT16K33_NBUF is the number of digit-and-colon positions on the display, which is five; since each position takes two bytes, the buffer you send is 2*HT16K33_NBUF bytes long.    Write SevenSeg_blink() and SevenSeg_dim() . One line each: one call to i2c1_byteWrite() , sending the display-setup and dimming commands you derived earlier with the caller's option bits ORed in. Mask the argument to the bits the command actually has — 0x6 for the two blink bits, 0xf for the four brightness bits — so an out-of-range argument cannot corrupt the command itself.    Write SevenSeg_write() . Before you write the line, write down what each of i2c1_memWrite() 's four arguments has to be, and why each one is that and not something else.    In a new main() , declare uint8_t display_buffer[2*HT16K33_NBUF]; , fill it so the display reads ES.28 , and call SevenSeg_write() . For the 2 and the 8 use numbertable[] .       Three things about that listing. The odd-numbered bytes are the zeros from the RAM map. They carry nothing; they are sent because the pointer advances on every byte that arrives, so skipping them would land digit 2's pattern at address 1. 0b11101101 is an S with bit 7 set, which is the decimal point — one buffer entry produces both. And this main() has no while(1) : it runs once, sets the display, and stops. The display keeps showing ES.28 afterwards, because the HT16K33 is still sweeping its RAM whether or not the STM32C031C6 is doing anything at all. That is the whole argument for the backpack, visible on your desk.   Nothing, or the wrong thing, on the display? Work down the layers rather than around them. Does writeFirstDigit.c still put an E up? If yes, the bus, the init and the RAM addressing are all fine and the fault is in SevenSeg_write() or in how the buffer was filled. A display showing four garbled characters usually means the buffer is right but shifted — check that you sent 2*HT16K33_NBUF bytes and started at HT16K33_ADDR_PTR , not that you got the segment patterns wrong.     "
},
{
  "id": "act-i2c-sevenseg",
  "level": "2",
  "url": "subsec-day10-driver.html#act-i2c-sevenseg",
  "type": "Activity",
  "number": "10.3.7",
  "title": "Finish the Driver and Show ES.28.",
  "body": " Finish the Driver and Show ES.28   You'll work in SevenSegPartial.c . Its header file defines everything you need. HT16K33_ADDR is the display's I2C address, and the command names are the ones you derived from the command table. HT16K33_ADDR_PTR is the address of the first byte of the display RAM, which is where a full write starts. HT16K33_NBUF is the number of digit-and-colon positions on the display, which is five; since each position takes two bytes, the buffer you send is 2*HT16K33_NBUF bytes long.    Write SevenSeg_blink() and SevenSeg_dim() . One line each: one call to i2c1_byteWrite() , sending the display-setup and dimming commands you derived earlier with the caller's option bits ORed in. Mask the argument to the bits the command actually has — 0x6 for the two blink bits, 0xf for the four brightness bits — so an out-of-range argument cannot corrupt the command itself.    Write SevenSeg_write() . Before you write the line, write down what each of i2c1_memWrite() 's four arguments has to be, and why each one is that and not something else.    In a new main() , declare uint8_t display_buffer[2*HT16K33_NBUF]; , fill it so the display reads ES.28 , and call SevenSeg_write() . For the 2 and the 8 use numbertable[] .   "
},
{
  "id": "subsec-day10-breakit",
  "level": "1",
  "url": "subsec-day10-breakit.html",
  "type": "Subsection",
  "number": "10.3.12",
  "title": "Part 9: Break It on Purpose",
  "body": " Part 9: Break It on Purpose  We'll make two one-line changes to a program that works, and capture each resulting I2C transaction with the AD2. Both yield a blank display, but they look nothing like each other on the oscilloscope.   One I2C transaction that got no answer, with SDA in blue above and SCL in orange below. The decoded bits are marked on the capture: eight clock pulses carry 1 1 0 0 0 0 0 followed by 0 — the 7-bit address 0x60 and a write — and on the ninth pulse SDA stays HIGH, which is the NoAck . No device on this bus has address 0x60. Nine clock pulses in all against the eighteen of , and then the bus is idle.     Two Ways to Get a Blank Display   Put the AD2 on SDA and SCL in logic analyzer mode with the I2C decoder on, as you set it up yesterday ( ) — the decoded bytes are what makes the difference between the two cases visible. Work on a copy of helloDisplay.c so that your driver project stays intact. Before each of the two captures, unplug the USB cable and plug it back in — the display holds its RAM and keeps sweeping while it has power, so without that you are looking at the last thing that reached it rather than at what you just flashed.    Change HT16K33_ADDR to 0x60 , rebuild, flash, and capture a single sweep. You will have to arm the sweep first and then press the Nucleo's black reset button — we'll come back to why at the end of this part. Find the NACK and the STOP: nine clock pulses, SDA HIGH on the ninth, then a STOP ( ).    Put the address back to 0x70 . Now comment out the first of the three command writes — the system-setup one that turns the oscillator on — and predict, what you will see on the display and what you will see on the trace. Then flash it and capture.    Compare the two captures and the two displays. Which of the two faults could you have diagnosed from the display alone, and which needed the scope? Which could you have diagnosed from the scope alone?    Done early? Leave the oscillator command commented out and add it back at the end of the three, after the display-on and brightness commands. Does the display come back? Say what that tells you about whether the HT16K33 stores a command it cannot act on yet.     The wrong address. With 0x60 the program stops after one transaction rather than repeating four times a second, so there is nothing for the scope to catch unless you arm it and then restart the board. The reason is in the library: i2c1_byteWrite() checks for a NACK once, immediately after setting START — long before the ninth clock pulse, so the check always passes — and then waits for the peripheral to say it is ready for data. RM0490 §23.4.9 is explicit that on a NACK the TXIS flag is not set , so that wait never ends. The hardware still does the right thing on the wire — the same paragraph goes on to say that after a NACK a STOP condition is automatically sent , which is why the capture looks tidy. It is the program that is stuck. shows the flow the reference manual gives for doing it without that hole.   The missing oscillator command. The display is blank — the same blank as a wrong address, the same blank as a wire that fell out. The trace is perfect : every transaction is there, every address byte is 0xE0, every ninth pulse comes back LOW because the HT16K33 is powered, listening, and acknowledging every single byte you send it. It simply is not driving anything — the oscillator, as in Part 8b.  So the bus can be flawless and the device can still do nothing, and no amount of staring at SDA and SCL will tell you that. A scope answers did my bytes arrive? and answers it completely. It cannot answer were they the right bytes? — that question is a datasheet question, and the instrument for it is the command table. Choosing between those two, rather than reaching for whichever tool is nearest, is what the debugging chapter was about.    "
},
{
  "id": "fig-i2c-scope-noack",
  "level": "2",
  "url": "subsec-day10-breakit.html#fig-i2c-scope-noack",
  "type": "Figure",
  "number": "10.3.33",
  "title": "",
  "body": " One I2C transaction that got no answer, with SDA in blue above and SCL in orange below. The decoded bits are marked on the capture: eight clock pulses carry 1 1 0 0 0 0 0 followed by 0 — the 7-bit address 0x60 and a write — and on the ninth pulse SDA stays HIGH, which is the NoAck . No device on this bus has address 0x60. Nine clock pulses in all against the eighteen of , and then the bus is idle.   "
},
{
  "id": "act-i2c-wrong-address",
  "level": "2",
  "url": "subsec-day10-breakit.html#act-i2c-wrong-address",
  "type": "Activity",
  "number": "10.3.8",
  "title": "Two Ways to Get a Blank Display.",
  "body": " Two Ways to Get a Blank Display   Put the AD2 on SDA and SCL in logic analyzer mode with the I2C decoder on, as you set it up yesterday ( ) — the decoded bytes are what makes the difference between the two cases visible. Work on a copy of helloDisplay.c so that your driver project stays intact. Before each of the two captures, unplug the USB cable and plug it back in — the display holds its RAM and keeps sweeping while it has power, so without that you are looking at the last thing that reached it rather than at what you just flashed.    Change HT16K33_ADDR to 0x60 , rebuild, flash, and capture a single sweep. You will have to arm the sweep first and then press the Nucleo's black reset button — we'll come back to why at the end of this part. Find the NACK and the STOP: nine clock pulses, SDA HIGH on the ninth, then a STOP ( ).    Put the address back to 0x70 . Now comment out the first of the three command writes — the system-setup one that turns the oscillator on — and predict, what you will see on the display and what you will see on the trace. Then flash it and capture.    Compare the two captures and the two displays. Which of the two faults could you have diagnosed from the display alone, and which needed the scope? Which could you have diagnosed from the scope alone?    Done early? Leave the oscillator command commented out and add it back at the end of the three, after the display-on and brightness commands. Does the display come back? Say what that tells you about whether the HT16K33 stores a command it cannot act on yet.   "
},
{
  "id": "subsec-day10-breakit-6",
  "level": "2",
  "url": "subsec-day10-breakit.html#subsec-day10-breakit-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "perfect "
},
{
  "id": "subsec-day10-next",
  "level": "1",
  "url": "subsec-day10-next.html",
  "type": "Subsection",
  "number": "10.3.13",
  "title": "Part 10: Before Next Class",
  "body": " Part 10: Before Next Class  Tonight you'll write counters that show on the display, and the last of them has the same shape as Lab 5.   Homework: Counters on the Display   Due at the start of next class - work through these before attempting the lab as they help you get ready for the lab. First: rename the library you just finished from SevenSegPartial.c and SevenSegPartial.h to SevenSeg.c and SevenSeg.h , change the #include to match, and move both into your mylib folder alongside i2c.c and i2c.h , so that they are ready to use in Lab 5.    Show a 16-bit unsigned counter, incrementing once a second on the display. Write SevenSeg_number() to do the conversion: it takes a number and fills a buffer with the segment patterns for its digits. Four digits hold 0 to 9999, so decide what it should do with a number that does not fit and say so in a comment.    Show an 8-bit signed counter, −128 to 127. You will need a minus sign, which is one segment; if you want an absolute value, #include <stdlib.h> gives you abs() .    Show a clock, MM:SS , counting up from zero. Here you need the colon, so you need to have found which bit in display_buffer[4] lights it.    Optional, and worth doing before Lab 5: drive the update from a timer interrupt rather than delay_ms() , so the counter keeps time while the main loop does something else.     Lab 5 is due Tuesday. It asks for a modular ADC driver, an ADC reading taken on a timer interrupt rather than a delay, and a seven-segment display driver — and it says to use the code you developed in class today as the basis for the last of those. The counters above are the same shape as what it wants on the display.  "
},
{
  "id": "act-i2c-homework",
  "level": "2",
  "url": "subsec-day10-next.html#act-i2c-homework",
  "type": "Activity",
  "number": "10.3.9",
  "title": "Homework: Counters on the Display.",
  "body": " Homework: Counters on the Display   Due at the start of next class - work through these before attempting the lab as they help you get ready for the lab. First: rename the library you just finished from SevenSegPartial.c and SevenSegPartial.h to SevenSeg.c and SevenSeg.h , change the #include to match, and move both into your mylib folder alongside i2c.c and i2c.h , so that they are ready to use in Lab 5.    Show a 16-bit unsigned counter, incrementing once a second on the display. Write SevenSeg_number() to do the conversion: it takes a number and fills a buffer with the segment patterns for its digits. Four digits hold 0 to 9999, so decide what it should do with a number that does not fit and say so in a comment.    Show an 8-bit signed counter, −128 to 127. You will need a minus sign, which is one segment; if you want an absolute value, #include <stdlib.h> gives you abs() .    Show a clock, MM:SS , counting up from zero. Here you need the colon, so you need to have found which bit in display_buffer[4] lights it.    Optional, and worth doing before Lab 5: drive the update from a timer interrupt rather than delay_ms() , so the counter keeps time while the main loop does something else.   "
},
{
  "id": "subsec-i2c-physical-reality",
  "level": "1",
  "url": "subsec-i2c-physical-reality.html",
  "type": "Subsection",
  "number": "10.4.1",
  "title": "The Protocol: Two Wires, One Shared Bus",
  "body": " The Protocol: Two Wires, One Shared Bus  I2C uses exactly two wires: SCL , the serial clock, and SDA , the serial data line. Both run the length of the circuit, and every I2C device is connected to both — not by its own pair back to the microcontroller, but tapped onto the same two wires as everything else. When one device puts a bit on SDA, every device sees it.  A shared medium like that is called a bus , and what it buys is that the wire count does not grow. A display, a temperature sensor and an accelerometer all connect to the same two wires; adding a fourth device adds no wires at all.  Both lines idle HIGH, held there by pull-up resistors. A device can pull a line LOW, and that is the only thing it can actively do: to send a 1 it releases the line and lets the resistor bring it up. This is called open-drain signaling, and it is what makes a shared wire safe. If two devices drive SDA at the same time, one pulling LOW and one releasing, nothing is damaged and nothing is ambiguous — the line goes LOW, because a pull-down always wins over a pull-up. A device that released the line and then reads it LOW can tell that somebody else is holding it down, which turns out to be useful.  "
},
{
  "id": "subsec-i2c-physical-reality-2",
  "level": "2",
  "url": "subsec-i2c-physical-reality.html#subsec-i2c-physical-reality-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "SCL SDA "
},
{
  "id": "subsec-i2c-physical-reality-3",
  "level": "2",
  "url": "subsec-i2c-physical-reality.html#subsec-i2c-physical-reality-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "bus "
},
{
  "id": "subsec-i2c-physical-reality-4",
  "level": "2",
  "url": "subsec-i2c-physical-reality.html#subsec-i2c-physical-reality-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "open-drain "
},
{
  "id": "subsec-i2c-addressing",
  "level": "1",
  "url": "subsec-i2c-addressing.html",
  "type": "Subsection",
  "number": "10.4.2",
  "title": "The Protocol: Addressing, and the ACK",
  "body": " The Protocol: Addressing, and the ACK  Because every device hears every bit, the protocol needs a way to reach one device without disturbing the rest. Every I2C device has a 7-bit address , fixed by its manufacturer and printed in its datasheet — sometimes with two or three of its low bits selectable on the board, which is how eight identical parts can share one bus. At the start of every transaction the controller broadcasts that address plus a single read\/write bit — eight bits, clocked out one at a time on SDA — and every device on the bus compares the address it hears against its own.  The device whose address matches answers by pulling SDA LOW during the ninth clock pulse. That one-bit reply is the ACK , for acknowledge. From the controller's side: SDA LOW after the address byte means a device recognized the address and the transaction can go on. SDA staying HIGH is a NACK — nobody claimed that address, which usually means the address is wrong, the device is unpowered, or a wire is off.  Data bytes follow the same way, each one acknowledged by whichever side is receiving: the device for a write, the controller for a read. A NACK on a data byte tells the sender the receiver could not take it.  One device is in charge of all of this. The controller — our STM32C031C6 — generates the clock, starts every transaction and decides who is being addressed. Everything else on the bus is a target , and a target only ever speaks when spoken to. (Older documents, including the reference manual's own I2C chapter, use master and slave for these two roles. The hardware is the same; the words have changed.)  "
},
{
  "id": "subsec-i2c-addressing-2",
  "level": "2",
  "url": "subsec-i2c-addressing.html#subsec-i2c-addressing-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "address "
},
{
  "id": "subsec-i2c-addressing-3",
  "level": "2",
  "url": "subsec-i2c-addressing.html#subsec-i2c-addressing-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "ACK NACK "
},
{
  "id": "subsec-i2c-addressing-5",
  "level": "2",
  "url": "subsec-i2c-addressing.html#subsec-i2c-addressing-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "controller target "
},
{
  "id": "subsec-i2c-start-stop",
  "level": "1",
  "url": "subsec-i2c-start-stop.html",
  "type": "Subsection",
  "number": "10.4.3",
  "title": "The Protocol: START and STOP Conditions",
  "body": " The Protocol: START and STOP Conditions  With the exception of the START and STOP conditions, SDA is allowed to change only while SCL is LOW. That is when the receiver is not sampling it; while SCL is HIGH, SDA holds still and is read. The protocol then takes the one thing that rule forbids and uses it to mark the edges of a transaction, which is why a START can never be mistaken for data.  A START condition is SDA going from HIGH to LOW while SCL is HIGH . It cannot occur during normal data transfer, so every device on the bus recognizes it immediately: a new transaction is beginning.  A STOP condition is SDA going from LOW to HIGH while SCL is HIGH. Also impossible as a data bit, it means the transaction is over and the bus is free.  Both are in . The SDA transitions at the START and STOP markers happen while SCL is HIGH; every other SDA edge in the diagram happens while SCL is LOW. That contrast is what lets a device tell the two apart.  "
},
{
  "id": "subsec-i2c-start-stop-3",
  "level": "2",
  "url": "subsec-i2c-start-stop.html#subsec-i2c-start-stop-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "START condition "
},
{
  "id": "subsec-i2c-start-stop-4",
  "level": "2",
  "url": "subsec-i2c-start-stop.html#subsec-i2c-start-stop-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "STOP condition "
},
{
  "id": "subsec-i2c-synchronous",
  "level": "1",
  "url": "subsec-i2c-synchronous.html",
  "type": "Subsection",
  "number": "10.4.4",
  "title": "The Protocol: Why There Is No Baud Rate",
  "body": " The Protocol: Why There Is No Baud Rate  UART requires both ends to agree on a baud rate in advance ( ). Nothing on the wire says when a bit begins; the receiver starts a timer at the start bit and samples on its own schedule. Get the rate wrong at either end and the frame comes out as garbage.  I2C removes that agreement by sending the clock. The controller drives SCL, and everything on the bus reads SDA while SCL is HIGH. No device has to know in advance how fast the bits will arrive, because the wire tells it. That is what synchronous means here: the clock is shared, not reconstructed independently at each receiver. I2C is synchronous; UART is asynchronous.  The controller still picks a clock speed, and it has to pick one every device on the bus can follow. The standard defines 100 kHz (Standard mode), 400 kHz (Fast mode) and 1 MHz (Fast-mode Plus); the parts in this course run comfortably at 100 kHz and that is what we use. Adding a new device does not change the timing of any existing one.  What synchronous costs is the extra wire for the clock, and the fact that the two wires are shared: only one device may talk at a time, so unlike UART — which has a separate line each way and can send and receive at once — I2C is half duplex.  "
},
{
  "id": "subsec-i2c-synchronous-3",
  "level": "2",
  "url": "subsec-i2c-synchronous.html#subsec-i2c-synchronous-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "synchronous "
},
{
  "id": "subsec-i2c-ref-registers",
  "level": "1",
  "url": "subsec-i2c-ref-registers.html",
  "type": "Subsection",
  "number": "10.4.5",
  "title": "Register Summary",
  "body": " Register Summary   The registers this chapter uses        Register  Field(s) used  Purpose  Source    I2C_CR1  PE  Peripheral enable — clear it before writing TIMINGR, set it when done  RM §23.7.1    I2C_CR2  SADD, RD_WRN, NBYTES, AUTOEND, START  Describes one whole transaction: who, which direction, how many bytes, what to do at the end, and go  RM §23.7.2    I2C_TIMINGR  PRESC, SCLL, SCLH, SDADEL, SCLDEL  SCL timing — PRESC divides I2CCLK by PRESC+1; the other four are counted in units of the prescaled clock  RM §23.7.5    I2C_ISR  BUSY, TXIS, RXNE, NACKF  Status — a START is on the bus; ready for a byte to send; a byte has arrived; a NACK was received  RM §23.7.7    I2C_TXDR \/ I2C_RXDR  whole register  The byte going out, and the byte that came in  RM §23.7.10–11    GPIOx_MODER  MODE8, MODE9  Alternate function mode on PB8 and PB9  RM §6.4.1    GPIOx_OTYPER  OT8, OT9  Output type — 1 is open-drain, 0 (reset) is push-pull  RM §6.4.2    GPIOx_AFRH  AFSEL8, AFSEL9  Which alternate function — AF6 is I2C1 on both pins; written in C as AFR[1]  DS Table 15    RCC_APBENR1  I2C1EN  Enable the I2C1 peripheral clock  RM §5.4.13      RM is RM0490, the STM32C0x1 reference manual; DS is the STM32C031 datasheet. The I2C chapter is §23 and the GPIO chapter is §6. Note that the reference manual's I2C chapter still uses master and slave where this course says controller and target, so SADD is documented as the slave address field.  "
},
{
  "id": "table-i2c-registers",
  "level": "2",
  "url": "subsec-i2c-ref-registers.html#table-i2c-registers",
  "type": "Table",
  "number": "10.4.1",
  "title": "The registers this chapter uses",
  "body": " The registers this chapter uses        Register  Field(s) used  Purpose  Source    I2C_CR1  PE  Peripheral enable — clear it before writing TIMINGR, set it when done  RM §23.7.1    I2C_CR2  SADD, RD_WRN, NBYTES, AUTOEND, START  Describes one whole transaction: who, which direction, how many bytes, what to do at the end, and go  RM §23.7.2    I2C_TIMINGR  PRESC, SCLL, SCLH, SDADEL, SCLDEL  SCL timing — PRESC divides I2CCLK by PRESC+1; the other four are counted in units of the prescaled clock  RM §23.7.5    I2C_ISR  BUSY, TXIS, RXNE, NACKF  Status — a START is on the bus; ready for a byte to send; a byte has arrived; a NACK was received  RM §23.7.7    I2C_TXDR \/ I2C_RXDR  whole register  The byte going out, and the byte that came in  RM §23.7.10–11    GPIOx_MODER  MODE8, MODE9  Alternate function mode on PB8 and PB9  RM §6.4.1    GPIOx_OTYPER  OT8, OT9  Output type — 1 is open-drain, 0 (reset) is push-pull  RM §6.4.2    GPIOx_AFRH  AFSEL8, AFSEL9  Which alternate function — AF6 is I2C1 on both pins; written in C as AFR[1]  DS Table 15    RCC_APBENR1  I2C1EN  Enable the I2C1 peripheral clock  RM §5.4.13    "
},
{
  "id": "subsec-i2c-ref-timingr",
  "level": "1",
  "url": "subsec-i2c-ref-timingr.html",
  "type": "Subsection",
  "number": "10.4.6",
  "title": "Where the TIMINGR Numbers Come From",
  "body": " Where the TIMINGR Numbers Come From   i2c1_init() writes four values into I2C_TIMINGR , and in class we take them as given. This is where they come from, for anyone moving the code to a board whose clock runs at a different speed.  The register holds five fields — PRESC , SCLL , SCLH , SDADEL and SCLDEL — and between them they set how long SCL spends HIGH, how long it spends LOW, and how long the peripheral waits around the edges before changing or sampling SDA. You are not expected to compute them from the I2C specification's timing requirements: the reference manual has already done it, for a set of common peripheral clock frequencies, in RM0490 §23.4.10, I2C_TIMINGR register configuration examples ( ). Ours is 12 MHz — after reset the STM32C031C6 runs from HSI48 with HSIDIV at its reset value of divide-by-four (RM0490 §5.4.3), and RCC_CCIPR resets with I2C1SEL selecting PCLK — and there is no table for 12 MHz.   The three worked examples in RM0490 §23.4.10: Table 94 for a peripheral clock of 8 MHz, Table 95 for 16 MHz and Table 96 for 48 MHz. Read down the Standard-mode 100 kHz column of each. SCLL is 0x13, SCLH is 0xF, SDADEL is 0x2 and SCLDEL is 0x4 in all three; the only field that changes with the clock is PRESC, which is 0x1, 0x3 and 0xB. There is no table for 12 MHz.      The prescaler divides the peripheral clock by PRESC + 1, so 8 MHz divided by (0x1 + 1) is 4 MHz; 16 MHz divided by (0x3 + 1) is 4 MHz; and 48 MHz divided by (0xB + 1) — that is 12 — is 4 MHz. Every table divides its clock down to the same 4 MHz, and 250 ns is that clock's period. Everything after the prescaler is counted in units of 250 ns, which is why the other four fields do not change from table to table: 20 of them LOW and 16 of them HIGH is 5.0 µs and 4.0 µs whatever clock the chip started from.  Those two do not quite add to the 10 µs a 100 kHz clock needs, and the manual says why — the t_SCL row of each table reads ~10 µs , and RM0490 §23.4.10 footnotes it t_SCL is greater than t_SCLL + t_SCLH due to SCL internal detection delay . (The crops here stop above the footnote block.) The missing microsecond is the peripheral synchronizing to its own clock line, and 10 µs is what the AD2 measures between two adjacent SCL rising edges.  So PRESC is not a constant belonging to a board. It is , which for a 12 MHz clock is 2 — and that is the one number to change if this code moves.  The other four are copied from any of the three tables, and this section does not derive them. SCLL and SCLH are checked above against the bus speed they have to produce. SDADEL and SCLDEL are not: they set how long the peripheral waits after an SCL edge before changing SDA, and how long it waits before sampling it, and both come out of the I2C specification's setup and hold requirements rather than out of the bus frequency. One warning if you extend the pattern by analogy — RM0490's formula for SDADEL does not carry the +1 that the other four fields do.  "
},
{
  "id": "fig-i2c-timing-tables",
  "level": "2",
  "url": "subsec-i2c-ref-timingr.html#fig-i2c-timing-tables",
  "type": "Figure",
  "number": "10.4.2",
  "title": "",
  "body": " The three worked examples in RM0490 §23.4.10: Table 94 for a peripheral clock of 8 MHz, Table 95 for 16 MHz and Table 96 for 48 MHz. Read down the Standard-mode 100 kHz column of each. SCLL is 0x13, SCLH is 0xF, SDADEL is 0x2 and SCLDEL is 0x4 in all three; the only field that changes with the clock is PRESC, which is 0x1, 0x3 and 0xB. There is no table for 12 MHz.     "
},
{
  "id": "subsec-i2c-ref-hardware",
  "level": "1",
  "url": "subsec-i2c-ref-hardware.html",
  "type": "Subsection",
  "number": "10.4.7",
  "title": "What Is Under I2C1-&gt;CR2",
  "body": " What Is Under I2C1->CR2  The library describes a transaction and reads flags. Everything between that and the two wires is the peripheral, and is the chip's own drawing of it.   The I2C peripheral, from RM0490 Figure 211. The registers along the bottom are what software touches; everything above them runs on its own. Data control holds the shift register that turns a byte into eight bits on SDA and back; clock control generates SCL from the I2CCLK input and the timing register, and also contains the slave-clock-stretching logic; the analog and digital noise filters sit between the pins and the rest. The block on the left is wake-up on address match — the feature that lets a device asleep in a low-power mode be woken by its own address arriving on the bus. We are always the controller and never asleep, so we never use it, and address recognition proper would be I2C_OAR1 and the ADDR flag rather than this block. The SMBus blocks belong to a related protocol this course does not use either.    The noise filters are why a short spike on SDA does not become a bit: an analog filter is on by default and suppresses pulses up to 50 ns, which is what the I2C specification requires. And the shift register is the reason I2C_TXDR is one byte wide rather than a buffer: the peripheral holds exactly one byte in hand while it clocks the previous one out, which is what TXIS is telling you. Neither is anything we configure.  "
},
{
  "id": "fig-i2c-hardware",
  "level": "2",
  "url": "subsec-i2c-ref-hardware.html#fig-i2c-hardware",
  "type": "Figure",
  "number": "10.4.3",
  "title": "",
  "body": " The I2C peripheral, from RM0490 Figure 211. The registers along the bottom are what software touches; everything above them runs on its own. Data control holds the shift register that turns a byte into eight bits on SDA and back; clock control generates SCL from the I2CCLK input and the timing register, and also contains the slave-clock-stretching logic; the analog and digital noise filters sit between the pins and the rest. The block on the left is wake-up on address match — the feature that lets a device asleep in a low-power mode be woken by its own address arriving on the bus. We are always the controller and never asleep, so we never use it, and address recognition proper would be I2C_OAR1 and the ADDR flag rather than this block. The SMBus blocks belong to a related protocol this course does not use either.   "
},
{
  "id": "subsec-i2c-ref-hardware-4",
  "level": "2",
  "url": "subsec-i2c-ref-hardware.html#subsec-i2c-ref-hardware-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "noise filters "
},
{
  "id": "subsec-i2c-ref-cr2",
  "level": "1",
  "url": "subsec-i2c-ref-cr2.html",
  "type": "Subsection",
  "number": "10.4.8",
  "title": "I2C_CR2, Field by Field",
  "body": " I2C_CR2, Field by Field  One assignment to I2C_CR2 describes an entire transaction, which is why it is the register the library writes most. The register is drawn in , beside the code that writes it; what follows here is the detail that would not fit there.   SADD is the field with the trap in it. The manual is exact: in 7-bit addressing mode, SADD[7:1] must be written with the 7-bit slave address to be sent. The bits SADD[9], SADD[8] and SADD[0] are don't care. The address goes in bits 7 down to 1, which is what the <<1 in the library is doing, and bit 0 — where the R\/W bit will appear on the wire — is ignored here, because the direction comes from RD_WRN instead.   AUTOEND is worth knowing about because of what the other setting is for. With AUTOEND set, the hardware sends a STOP after NBYTES bytes and the bus goes idle. With it clear, the peripheral instead holds SCL LOW and sets a transfer complete flag, which lets software start a second transfer without releasing the bus in between — a repeated START . That is how a read from a device register works: write the register address, repeated START, then read, with no STOP in the middle where another controller could take the bus.  "
},
{
  "id": "subsec-i2c-ref-cr2-4",
  "level": "2",
  "url": "subsec-i2c-ref-cr2.html#subsec-i2c-ref-cr2-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "repeated START "
},
{
  "id": "subsec-i2c-ref-library",
  "level": "1",
  "url": "subsec-i2c-ref-library.html",
  "type": "Subsection",
  "number": "10.4.9",
  "title": "The Library, and Where It Cuts Corners",
  "body": " The Library, and Where It Cuts Corners  Reading one byte is the same shape as writing one, with RD_WRN set, a wait on RXNE instead of TXIS , and the data coming out of I2C_RXDR instead of going into I2C_TXDR :  \/\/ Ping target address for reading one byte I2C1->CR2 = (deviceAddr<<1) \/\/ target address | (1 << I2C_CR2_NBYTES_Pos) \/\/ will read one byte | I2C_CR2_RD_WRN \/\/ ping for reading | I2C_CR2_AUTOEND \/\/ Send Stop condition after transfer | I2C_CR2_START; \/\/ initiate start condition while( !(I2C1->ISR & I2C_ISR_BUSY) ); \/\/ Wait until Start is received \/\/ Read the data if( !(I2C1->ISR & I2C_ISR_NACKF) ) { \/\/ Make sure ACK received while( !(I2C1->ISR & I2C_ISR_RXNE) ); \/\/ Wait for Rx to be ready *data = I2C1->RXDR; \/\/ Read the data }  Both functions have the same hole in them, and the break-it exercise in class is where you meet it. The NACKF test runs a microsecond or so after START is set, which is roughly ninety microseconds before the device would have had a chance to not answer — so the test always passes. Execution then reaches while( !(I2C1->ISR & I2C_ISR_TXIS) ); , and RM0490 §23.4.9 says plainly that on a NACK the TXIS flag is not set . The wait never ends.  What the hardware does is unaffected — RM0490 §23.4.9 continues a STOP condition is automatically sent after the NACK reception , which is the peripheral's own NACK handling rather than AUTOEND completing a transfer — so the bus is released and the capture on the oscilloscope looks exactly as it should. It is the program that stops, which is why pinging a wrong address gives you one transaction and then silence rather than four a second.  RM0490's Figure 228 gives the flow that does not have the hole: a loop that tests TXIS and NACKF on every pass and leaves on whichever comes first. Writing it that way costs a few lines and gives the caller a way to find out that nobody answered, which matters as soon as a program has to do something about a device that is not there. In this library's own terms the change is small:  I2C1->ICR = I2C_ICR_NACKCF; \/\/ clear a NACK left by an \/\/ earlier failed transaction I2C1->CR2 = (deviceAddr<<1) | (1U << I2C_CR2_NBYTES_Pos) | I2C_CR2_AUTOEND | I2C_CR2_START; \/\/ Leave on whichever the hardware raises first, rather than on TXIS alone while( !(I2C1->ISR & (I2C_ISR_TXIS | I2C_ISR_NACKF)) ); if( I2C1->ISR & I2C_ISR_NACKF ) { \/\/ nobody answered; the hardware I2C1->ICR = I2C_ICR_NACKCF; \/\/ has already sent the STOP return; } I2C1->TXDR = data;  Two details make it work. The wait leaves on either flag, so the NACK that used to arrive too late to be seen is now the thing that ends the wait. And NACKF is cleared before the transaction rather than after: it is a sticky flag, so a NACK left over from an earlier failure would otherwise make the next call return without sending anything. What the function still cannot do is tell its caller what happened, since it returns void — giving it a return value means changing every call site, which is a decision about the whole library rather than about this function.  The narrower lesson is worth stating in general, because the NACK is not the only way to hit it: none of the waits in this library has a timeout. Every while( !(I2C1->ISR & ...) ); in it assumes the hardware will eventually do what it was asked. The very first one — waiting for BUSY after setting START — assumes SDA and SCL can rise at all, which they cannot if the bus has no pull-up anywhere on it ( ). A bus stuck LOW hangs the program on its first I2C call, before any of the NACK story applies. Production code puts a bound on every one of these waits and reports the timeout to its caller; this library is a teaching library and does not.   i2c1_memWrite() and i2c1_memRead() follow the same pattern with the register address sent first — which is why i2c1_memWrite() programs NBYTES as nbytes + 1 , counting the register address as one of the bytes it is about to send. Worth knowing what i2c1_memRead() does not do: both of its I2C_CR2 writes set AUTOEND , so the register address is followed by a STOP and the read begins with a fresh START, rather than with the repeated START the protocol provides for ( ). On a bus with one controller nothing can get in between the two, so it works; on a bus with two it is a race, and that is what the repeated START exists to prevent. You are given both and only ever call them.  "
},
{
  "id": "subsec-i2c-ref-library-9",
  "level": "2",
  "url": "subsec-i2c-ref-library.html#subsec-i2c-ref-library-9",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "none of the waits in this library has a timeout. "
},
{
  "id": "subsec-i2c-ref-opendrain",
  "level": "1",
  "url": "subsec-i2c-ref-opendrain.html",
  "type": "Subsection",
  "number": "10.4.10",
  "title": "What Else Open-Drain Buys",
  "body": " What Else Open-Drain Buys  Part 6 gave one reason the I2C pins must be open-drain: SDA changes hands every ninth bit, and two push-pull outputs disagreeing about a wire is a short circuit. Two more features of the protocol rest on the same property, and both are worth recognizing even though this course never sets either up.   Sizing the pull-up. Part 6 said the value is squeezed from both ends. Here is the arithmetic, and it is worth seeing that the two ends are not equally tight.   The low end is the sink current. The device pulling the line LOW has to hold it below the receiver's threshold while the pull-up feeds current into it, and that current is 3.3 V divided by the resistor: 3.3 V through 1 kΩ is 3.3 mA, which most parts manage, and through 200 Ω is 16 mA, which many do not. So the sink current sets a hard floor at somewhere around 1 kΩ — not at 5 kΩ.   The high end is the RC (resistor-capacitor) time constant. Nothing drives the line HIGH; the pull-up charges the bus's own capacitance, a few hundred picofarads on a short bus, and the line has to get past the receiver's HIGH threshold — about 0.7 × 3.3 V = 2.3 V, which takes roughly 1.2 time constants. With 300 pF: 5 kΩ gives RC = 1.5 µs and reaches threshold in about 1.8 µs; 10 kΩ gives 3 µs and about 3.6 µs; 20 kΩ gives 6 µs and about 7.2 µs. A 100 kHz clock spends 5 µs LOW, so 5 kΩ is comfortable, 10 kΩ uses most of the window, and 20 kΩ does not make it. That is the ceiling.  So the arithmetic gives a window from about 1 kΩ to about 10 kΩ, and 5 kΩ to 10 kΩ is where designers sit inside it — high enough to keep the current down, and stopping where the RC starts to bite. The convention is a choice within the window rather than the window itself.   Arbitration. I2C allows more than one controller on a bus. If two of them start a transaction at the same moment, each one watches SDA while it transmits. A controller that releases the line — sending a 1 — and then reads it LOW knows that somebody else is pulling it down, which means somebody else is sending a 0 at a bit position where it sent a 1. It has lost, and it stops transmitting immediately. The other controller never notices anything happened. This works only because the combined line reads LOW if any device pulls it LOW, which is the wired-AND behavior open-drain gives you for free.   Clock stretching. SCL is open-drain too, and a target that needs more time can hold it LOW after the controller has released it. The controller's clock generator waits for the line to actually rise before starting to time the HIGH phase, so the whole bus slows down for as long as the target needs. It is flow control with no protocol overhead at all — one device holding a wire down. RM0490 lists it in the I2C peripheral's features, and the NOSTRETCH bit in I2C_CR1 is how a target would turn it off.  "
},
{
  "id": "subsec-i2c-ref-opendrain-3",
  "level": "2",
  "url": "subsec-i2c-ref-opendrain.html#subsec-i2c-ref-opendrain-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Sizing the pull-up. "
},
{
  "id": "subsec-i2c-ref-opendrain-4",
  "level": "2",
  "url": "subsec-i2c-ref-opendrain.html#subsec-i2c-ref-opendrain-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The low end is the sink current. "
},
{
  "id": "subsec-i2c-ref-opendrain-5",
  "level": "2",
  "url": "subsec-i2c-ref-opendrain.html#subsec-i2c-ref-opendrain-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The high end is the RC (resistor-capacitor) time constant. "
},
{
  "id": "subsec-i2c-ref-opendrain-7",
  "level": "2",
  "url": "subsec-i2c-ref-opendrain.html#subsec-i2c-ref-opendrain-7",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Arbitration. "
},
{
  "id": "subsec-i2c-ref-opendrain-8",
  "level": "2",
  "url": "subsec-i2c-ref-opendrain.html#subsec-i2c-ref-opendrain-8",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Clock stretching. "
},
{
  "id": "subsec-i2c-ref-transfer-pattern",
  "level": "1",
  "url": "subsec-i2c-ref-transfer-pattern.html",
  "type": "Subsection",
  "number": "10.4.11",
  "title": "The Register Read\/Write Pattern",
  "body": " The Register Read\/Write Pattern  The HT16K33 is unusual in being almost stateless: you send it a command or a block of display data and it acts. Most I2C parts are organized as a set of numbered registers instead, and their datasheets describe access to those registers in the four shapes of . It is worth reading now, because it is the pattern behind i2c1_memWrite() and i2c1_memRead() , and because every I2C sensor you meet later is documented this way.   The four register-access transfers, as an I2C sensor's datasheet draws them, with the sequence written out underneath the two single-byte cases. ST is the START and SP the STOP; SAD is the device address; SUB is the sub-address, meaning the register number inside the device; SAK is the target's acknowledge; SR is a repeated START; and MAK and NMAK are the controller's own acknowledge and final not-acknowledge when it is the one receiving. A write is device address, register number, then data bytes — and the register number advances by itself for each further byte, which is exactly what the HT16K33's display data pointer does. A read needs both directions in one transaction: address and register number going out, then a repeated START to turn the bus around without releasing it, then the device address again with the read bit, and the data coming back.    The repeated START in the read case is the reason AUTOEND exists as a choice rather than always being on. A STOP between the two halves would free the bus, and on a bus with a second controller on it the register pointer you just set could be changed by somebody else before you read from it.  "
},
{
  "id": "fig-i2c-transfer-pattern",
  "level": "2",
  "url": "subsec-i2c-ref-transfer-pattern.html#fig-i2c-transfer-pattern",
  "type": "Figure",
  "number": "10.4.4",
  "title": "",
  "body": " The four register-access transfers, as an I2C sensor's datasheet draws them, with the sequence written out underneath the two single-byte cases. ST is the START and SP the STOP; SAD is the device address; SUB is the sub-address, meaning the register number inside the device; SAK is the target's acknowledge; SR is a repeated START; and MAK and NMAK are the controller's own acknowledge and final not-acknowledge when it is the one receiving. A write is device address, register number, then data bytes — and the register number advances by itself for each further byte, which is exactly what the HT16K33's display data pointer does. A read needs both directions in one transaction: address and register number going out, then a repeated START to turn the bus around without releasing it, then the device address again with the read bit, and the data coming back.   "
},
{
  "id": "subsec-i2c-ref-ht16k33",
  "level": "1",
  "url": "subsec-i2c-ref-ht16k33.html",
  "type": "Subsection",
  "number": "10.4.12",
  "title": "HT16K33 Quick Reference",
  "body": " HT16K33 Quick Reference  Everything the driver needs, in one place. Page numbers are the HT16K33 datasheet's.   HT16K33 commands (datasheet pp. 24–25)       Command  Byte  Options    Display data address pointer  0b0000 A3 A2 A1 A0  Where the following data bytes start; 0x00 for the whole display    System setup  0b0010 X X X S  S = 1 turns the internal oscillator on; 0x21 in full    Display setup  0b1000 X B1 B0 D  D = 1 is display on; B1 B0 is 00 steady, 01 at 2 Hz, 10 at 1 Hz, 11 at 0.5 Hz. 0x81 is on and steady    Dimming set  0b1110 P3 P2 P1 P0  Duty cycle in sixteenths, 0000 for 1\/16 up to 1111 for 16\/16. 0xEF is full     The display RAM is sixteen bytes, two per common line, of which we use the five even addresses 0x00, 0x02, 0x04, 0x06 and 0x08 — digit 1, digit 2, the colon, digit 3, digit 4. The odd addresses take a 0. Within a digit's byte the bits are 0b DP g f e d c b a : bit 0 is segment a and bit 7 is the decimal point.  Writing the display is one page write from address 0x00 (datasheet p. 22): the pointer advances one address per byte received, so ten bytes in one transaction fill the whole thing. Two separate transactions do not work, because the pointer is set by the command byte at the start of a transaction and a STOP ends it.  One oddity in the given solutions, so it does not look like a mistake: SevenSeg_dim() sends HT16K33_DISPLAY_CMD | HT16K33_BRIGHT_CMD | (brightness & 0xf) , and the dimming command already contains every bit the display command has — 0b1110 covers 0b1000 — so the first term changes nothing. The value that goes out is 0xE0 ORed with the brightness either way.  "
},
{
  "id": "table-ht16k33-commands",
  "level": "2",
  "url": "subsec-i2c-ref-ht16k33.html#table-ht16k33-commands",
  "type": "Table",
  "number": "10.4.5",
  "title": "HT16K33 commands (datasheet pp. 24–25)",
  "body": " HT16K33 commands (datasheet pp. 24–25)       Command  Byte  Options    Display data address pointer  0b0000 A3 A2 A1 A0  Where the following data bytes start; 0x00 for the whole display    System setup  0b0010 X X X S  S = 1 turns the internal oscillator on; 0x21 in full    Display setup  0b1000 X B1 B0 D  D = 1 is display on; B1 B0 is 00 steady, 01 at 2 Hz, 10 at 1 Hz, 11 at 0.5 Hz. 0x81 is on and steady    Dimming set  0b1110 P3 P2 P1 P0  Duty cycle in sixteenths, 0000 for 1\/16 up to 1111 for 16\/16. 0xEF is full    "
},
{
  "id": "subsec-dc-motor-physics",
  "level": "1",
  "url": "subsec-dc-motor-physics.html",
  "type": "Subsection",
  "number": "11.1.1",
  "title": "How a DC Motor Works",
  "body": " How a DC Motor Works   How a DC motor works. Watch this short video before reading the explanation below — the animation makes the relationship between current, magnetic field, and rotation much easier to follow.    Inside a DC permanent-magnet motor, electrical current flows through coils wound around a rotating armature. The current creates a magnetic field that interacts with the permanent magnets in the motor's housing, producing a force — and therefore torque — on the armature. The armature rotates, and a mechanical commutator (or electronic equivalent) continuously switches the current direction in the coils to keep the torque acting in the same rotational direction.  Two relationships govern DC motor behavior. First, torque is proportional to current: more current means more force on the armature. Second, at steady state, speed is approximately proportional to the voltage applied across the motor terminals. A higher voltage drives more current through the coil resistance, producing more torque, which accelerates the motor until a back-EMF (a voltage generated by the spinning motor itself, opposing the supply) limits further acceleration. At that equilibrium, speed is roughly proportional to supply voltage.  Direction is controlled by polarity: reverse the voltage across the motor terminals and the current through the armature reverses, the magnetic force reverses, and the motor spins the other way. This means that to control a DC motor from a microcontroller we need two things: a way to switch the polarity of the voltage, and a way to vary the magnitude of the average voltage to set speed.  "
},
{
  "id": "fig-dc-motor-video",
  "level": "2",
  "url": "subsec-dc-motor-physics.html#fig-dc-motor-video",
  "type": "Figure",
  "number": "11.1.1",
  "title": "",
  "body": " How a DC motor works. Watch this short video before reading the explanation below — the animation makes the relationship between current, magnetic field, and rotation much easier to follow.   "
},
{
  "id": "subsec-hbridge-concept",
  "level": "1",
  "url": "subsec-hbridge-concept.html",
  "type": "Subsection",
  "number": "11.1.2",
  "title": "The H-Bridge: Switching Direction",
  "body": " The H-Bridge: Switching Direction   H-bridge circuit. Four MOSFETs are arranged in an H around the motor (M), with the motor forming the crossbar. The two top transistors connect to the motor supply voltage (Motor VCC); the two bottom transistors connect to ground. Closing one diagonal pair (top-left and bottom-right, or top-right and bottom-left) directs current through the motor in one direction or the other.    A GPIO pin can source or sink only a few milliamps, and it can only drive to ground or 3.3 V — it cannot reverse polarity or supply the hundreds of milliamps a motor typically needs. A motor driver IC solves both problems. At its heart is an H-bridge : a circuit of four switches arranged in an H shape around the motor.  Each switch in the H-bridge is a transistor (the same concept as in the transistors chapter). By closing two specific switches and opening the other two, current is directed through the motor in one direction. Swapping which pair is closed reverses the current and therefore reverses the motor direction. A third configuration — connecting both motor terminals to the same voltage rail — brakes the motor by short-circuiting the back-EMF.  In this course we use the TB6612FNG motor driver IC, which integrates an H-bridge capable of supplying up to 1.2 A continuous. The MCU controls it through two logic-level input pins (IN1 and IN2) that determine direction and brake mode, plus a PWM input that controls speed. The motor is powered from a separate supply (up to 15 V), keeping the high-current motor path entirely separate from the 3.3 V MCU circuitry.  "
},
{
  "id": "fig-hbridge-concept",
  "level": "2",
  "url": "subsec-hbridge-concept.html#fig-hbridge-concept",
  "type": "Figure",
  "number": "11.1.2",
  "title": "",
  "body": " H-bridge circuit. Four MOSFETs are arranged in an H around the motor (M), with the motor forming the crossbar. The two top transistors connect to the motor supply voltage (Motor VCC); the two bottom transistors connect to ground. Closing one diagonal pair (top-left and bottom-right, or top-right and bottom-left) directs current through the motor in one direction or the other.   "
},
{
  "id": "subsec-hbridge-concept-3",
  "level": "2",
  "url": "subsec-hbridge-concept.html#subsec-hbridge-concept-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "motor driver IC H-bridge "
},
{
  "id": "subsec-hbridge-concept-5",
  "level": "2",
  "url": "subsec-hbridge-concept.html#subsec-hbridge-concept-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "TB6612FNG "
},
{
  "id": "subsec-pwm-concept",
  "level": "1",
  "url": "subsec-pwm-concept.html",
  "type": "Subsection",
  "number": "11.1.3",
  "title": "PWM: Controlling Speed with Switching",
  "body": " PWM: Controlling Speed with Switching  Setting motor speed requires varying the average voltage delivered to the motor — but a digital output can only be fully HIGH or fully LOW. The solution is Pulse-Width Modulation (PWM): the output switches rapidly between HIGH and LOW at a fixed frequency, and the fraction of each period spent HIGH — the duty cycle — determines the average voltage.  A 100% duty cycle delivers the full supply voltage continuously. A 50% duty cycle switches between HIGH and LOW for equal intervals, so the average voltage is half the supply. A 0% duty cycle keeps the output LOW and delivers zero average voltage. As long as the switching frequency is high enough (typically several kilohertz), the motor's mechanical inertia averages out the switching and the motor behaves as if it were driven by a steady voltage equal to the average.  PWM is generated by the same hardware timers we used in the previous chapter — no CPU involvement needed during normal operation. The timer is configured to compare its counter against a capture\/compare register (CCR): when the counter is below the CCR value, the output is HIGH; when it reaches the CCR, the output goes LOW until the counter resets. Changing the CCR value at any time changes the duty cycle, and therefore the motor speed, instantly.  "
},
{
  "id": "subsec-pwm-concept-2",
  "level": "2",
  "url": "subsec-pwm-concept.html#subsec-pwm-concept-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Pulse-Width Modulation duty cycle "
},
{
  "id": "subsec-pwm-concept-4",
  "level": "2",
  "url": "subsec-pwm-concept.html#subsec-pwm-concept-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "capture\/compare register "
},
{
  "id": "rq-motors-concepts",
  "level": "1",
  "url": "rq-motors-concepts.html",
  "type": "Check Your Understanding",
  "number": "11.1.4",
  "title": "Check Your Understanding",
  "body": "  A DC motor is spinning clockwise. What change to the electrical circuit would make it spin counter-clockwise?    Reverse the polarity of the voltage across the motor terminals so current flows through the armature in the opposite direction.  Correct. Reversing current direction reverses the magnetic force on the armature, reversing the torque and therefore the direction of rotation. This is what the H-bridge does when you swap which switch pair is closed.    Increase the supply voltage so the motor overspeeds and the commutator reverses automatically.  Increasing voltage increases speed but does not reverse direction. There is no automatic commutator reversal from overspeed.    Reduce the duty cycle to 0% so the motor decelerates and then spins backwards.  A 0% duty cycle removes power and the motor coasts to a stop, but does not cause it to spin backwards. Reversing direction requires reversing current, not just reducing it.    Connect both motor terminals to the same voltage rail.  Connecting both terminals to the same rail (brake mode) stops the motor by short-circuiting the back-EMF. It does not reverse the direction.      A PWM signal switches between 0 V and 5 V at 10 kHz. The duty cycle is set to 30%. What average voltage does the motor see?    1.5 V — 30% of 5 V.  Correct. Average voltage = duty cycle × supply voltage = 0.30 × 5 V = 1.5 V. The motor's mechanical inertia averages the rapid switching and the shaft speed corresponds to this average voltage.    5 V — the motor always sees the full supply voltage when PWM is used.  PWM delivers the full supply voltage only during the HIGH phase, which is 30% of each cycle. The effective average is 1.5 V.    3.5 V — the motor sees the supply minus the duty cycle percentage.  Average voltage = duty cycle × supply, not supply minus duty cycle. 30% duty at 5 V gives 1.5 V, not 3.5 V.    0 V — at 30% duty cycle the motor receives less than 50% and cannot spin.  There is no 50% threshold. The motor receives an average of 1.5 V at 30% duty cycle and will spin at a reduced speed proportional to that average voltage.      To change motor speed, you update the capture\/compare register (CCR) of TIM14 in the main loop. Does the CPU need to keep doing anything to maintain the new speed once CCR is updated?    No — the timer hardware generates the PWM signal autonomously. The CPU writes the new CCR value once and the timer immediately applies the new duty cycle until told otherwise.  Correct. This is the same autonomy that makes timers useful for delays and interrupts. The PWM waveform is generated entirely in hardware; the CPU is free to do other work.    Yes — the CPU must toggle a GPIO pin at the correct frequency to maintain the PWM signal.  Bit-banging PWM in software (manually toggling a GPIO pin) is possible but wastes CPU time. Hardware PWM via the timer generates the signal without any CPU involvement after setup.    Yes — the CPU must write the CCR value on every timer period to keep the duty cycle stable.  The timer uses the CCR value continuously until it is changed. Writing it once sets the duty cycle indefinitely.    No — but only if the PWM frequency is below 1 kHz; at higher frequencies the CPU must assist the timer.  Hardware PWM operates at any frequency within the timer's capability without CPU assistance. Frequency does not change this.     "
},
{
  "id": "rq-motor-direction",
  "level": "2",
  "url": "rq-motors-concepts.html#rq-motor-direction",
  "type": "Reading Question",
  "number": "11.1.4.1",
  "title": "",
  "body": " A DC motor is spinning clockwise. What change to the electrical circuit would make it spin counter-clockwise?    Reverse the polarity of the voltage across the motor terminals so current flows through the armature in the opposite direction.  Correct. Reversing current direction reverses the magnetic force on the armature, reversing the torque and therefore the direction of rotation. This is what the H-bridge does when you swap which switch pair is closed.    Increase the supply voltage so the motor overspeeds and the commutator reverses automatically.  Increasing voltage increases speed but does not reverse direction. There is no automatic commutator reversal from overspeed.    Reduce the duty cycle to 0% so the motor decelerates and then spins backwards.  A 0% duty cycle removes power and the motor coasts to a stop, but does not cause it to spin backwards. Reversing direction requires reversing current, not just reducing it.    Connect both motor terminals to the same voltage rail.  Connecting both terminals to the same rail (brake mode) stops the motor by short-circuiting the back-EMF. It does not reverse the direction.    "
},
{
  "id": "rq-pwm-duty-cycle",
  "level": "2",
  "url": "rq-motors-concepts.html#rq-pwm-duty-cycle",
  "type": "Reading Question",
  "number": "11.1.4.2",
  "title": "",
  "body": " A PWM signal switches between 0 V and 5 V at 10 kHz. The duty cycle is set to 30%. What average voltage does the motor see?    1.5 V — 30% of 5 V.  Correct. Average voltage = duty cycle × supply voltage = 0.30 × 5 V = 1.5 V. The motor's mechanical inertia averages the rapid switching and the shaft speed corresponds to this average voltage.    5 V — the motor always sees the full supply voltage when PWM is used.  PWM delivers the full supply voltage only during the HIGH phase, which is 30% of each cycle. The effective average is 1.5 V.    3.5 V — the motor sees the supply minus the duty cycle percentage.  Average voltage = duty cycle × supply, not supply minus duty cycle. 30% duty at 5 V gives 1.5 V, not 3.5 V.    0 V — at 30% duty cycle the motor receives less than 50% and cannot spin.  There is no 50% threshold. The motor receives an average of 1.5 V at 30% duty cycle and will spin at a reduced speed proportional to that average voltage.    "
},
{
  "id": "rq-pwm-timer",
  "level": "2",
  "url": "rq-motors-concepts.html#rq-pwm-timer",
  "type": "Reading Question",
  "number": "11.1.4.3",
  "title": "",
  "body": " To change motor speed, you update the capture\/compare register (CCR) of TIM14 in the main loop. Does the CPU need to keep doing anything to maintain the new speed once CCR is updated?    No — the timer hardware generates the PWM signal autonomously. The CPU writes the new CCR value once and the timer immediately applies the new duty cycle until told otherwise.  Correct. This is the same autonomy that makes timers useful for delays and interrupts. The PWM waveform is generated entirely in hardware; the CPU is free to do other work.    Yes — the CPU must toggle a GPIO pin at the correct frequency to maintain the PWM signal.  Bit-banging PWM in software (manually toggling a GPIO pin) is possible but wastes CPU time. Hardware PWM via the timer generates the signal without any CPU involvement after setup.    Yes — the CPU must write the CCR value on every timer period to keep the duty cycle stable.  The timer uses the CCR value continuously until it is changed. Writing it once sets the duty cycle indefinitely.    No — but only if the PWM frequency is below 1 kHz; at higher frequencies the CPU must assist the timer.  Hardware PWM operates at any frequency within the timer's capability without CPU assistance. Frequency does not change this.    "
},
{
  "id": "sec-motor-basics",
  "level": "1",
  "url": "sec-motor-basics.html",
  "type": "Section",
  "number": "11.2",
  "title": "DC Motor Fundamentals",
  "body": " DC Motor Fundamentals   Actuator signal chain. The MCU computes an integer command; a DAC or PWM converts it to an analog voltage; a driver IC amplifies current; the motor produces mechanical motion. Each stage is necessary because the MCU cannot directly supply the power the motor needs.    In a DC permanent-magnet motor, current through the armature coils creates a magnetic field that repels the permanent magnets in the stator, producing torque. Torque is proportional to current; current is determined by the applied voltage and back-EMF. At steady state the motor speed is approximately proportional to the applied voltage. To reverse direction, reverse the polarity of the voltage across the motor terminals.  "
},
{
  "id": "fig-embedded-actuator-chain",
  "level": "2",
  "url": "sec-motor-basics.html#fig-embedded-actuator-chain",
  "type": "Figure",
  "number": "11.2.1",
  "title": "",
  "body": " Actuator signal chain. The MCU computes an integer command; a DAC or PWM converts it to an analog voltage; a driver IC amplifies current; the motor produces mechanical motion. Each stage is necessary because the MCU cannot directly supply the power the motor needs.   "
},
{
  "id": "sec-h-bridge",
  "level": "1",
  "url": "sec-h-bridge.html",
  "type": "Section",
  "number": "11.3",
  "title": "H-Bridge Direction Control",
  "body": " H-Bridge Direction Control  An H-bridge is a circuit of four switches arranged in an H shape around the motor. By opening and closing different pairs of switches, the controller can apply voltage in either polarity (forward or reverse) or connect both motor terminals to the same rail (brake).   H-bridge in clockwise mode (IN1=HIGH, IN2=LOW, left) and counter-clockwise mode (IN1=LOW, IN2=HIGH, right). Current flows through the motor in opposite directions, reversing the electromagnetic torque and therefore the rotation direction.      H-bridge in brake mode (IN1=HIGH, IN2=HIGH). Both motor terminals are connected to the same rail; the motor acts as a generator dumping kinetic energy to ground, producing rapid deceleration.     TB6612FNG truth table summarizing all operating modes. IN1 and IN2 control direction; PWM controls speed. The STBY pin enables the driver (HIGH = active); it is pulled up through the breakout board.     TB6612FNG internal block diagram. The IC contains two full H-bridge circuits, each controlled by IN1, IN2, and PWM signals. Internal logic prevents shoot-through (both upper and lower switches on simultaneously) by enforcing a dead-time between transitions.     TB6612FNG breakout board wiring for the first exercise. VM (motor power) connects to the external power supply (6–12 V); VCC (logic power) connects to the Nucleo's 3.3 V rail. AIN1, AIN2, and PWMA connect to GPIO output pins. The motor connects to AO1 and AO2.     Shoot-through and dead-time  If the upper and lower switches of one H-bridge leg turn on simultaneously, they create a short circuit from the power supply to ground — called shoot-through . The TB6612FNG's internal logic prevents this by inserting a brief dead-time between switching events. This is why you should not drive IN1 and IN2 directly with complementary GPIO signals without the motor driver IC in between.   "
},
{
  "id": "sec-h-bridge-2",
  "level": "2",
  "url": "sec-h-bridge.html#sec-h-bridge-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "H-bridge "
},
{
  "id": "fig-h-bridge-cw-ccw",
  "level": "2",
  "url": "sec-h-bridge.html#fig-h-bridge-cw-ccw",
  "type": "Figure",
  "number": "11.3.1",
  "title": "",
  "body": " H-bridge in clockwise mode (IN1=HIGH, IN2=LOW, left) and counter-clockwise mode (IN1=LOW, IN2=HIGH, right). Current flows through the motor in opposite directions, reversing the electromagnetic torque and therefore the rotation direction.    "
},
{
  "id": "fig-h-bridge-brake",
  "level": "2",
  "url": "sec-h-bridge.html#fig-h-bridge-brake",
  "type": "Figure",
  "number": "11.3.2",
  "title": "",
  "body": " H-bridge in brake mode (IN1=HIGH, IN2=HIGH). Both motor terminals are connected to the same rail; the motor acts as a generator dumping kinetic energy to ground, producing rapid deceleration.   "
},
{
  "id": "fig-tb6612-truth-table",
  "level": "2",
  "url": "sec-h-bridge.html#fig-tb6612-truth-table",
  "type": "Figure",
  "number": "11.3.3",
  "title": "",
  "body": " TB6612FNG truth table summarizing all operating modes. IN1 and IN2 control direction; PWM controls speed. The STBY pin enables the driver (HIGH = active); it is pulled up through the breakout board.   "
},
{
  "id": "fig-tb6612-internal",
  "level": "2",
  "url": "sec-h-bridge.html#fig-tb6612-internal",
  "type": "Figure",
  "number": "11.3.4",
  "title": "",
  "body": " TB6612FNG internal block diagram. The IC contains two full H-bridge circuits, each controlled by IN1, IN2, and PWM signals. Internal logic prevents shoot-through (both upper and lower switches on simultaneously) by enforcing a dead-time between transitions.   "
},
{
  "id": "fig-tb6612-wiring",
  "level": "2",
  "url": "sec-h-bridge.html#fig-tb6612-wiring",
  "type": "Figure",
  "number": "11.3.5",
  "title": "",
  "body": " TB6612FNG breakout board wiring for the first exercise. VM (motor power) connects to the external power supply (6–12 V); VCC (logic power) connects to the Nucleo's 3.3 V rail. AIN1, AIN2, and PWMA connect to GPIO output pins. The motor connects to AO1 and AO2.   "
},
{
  "id": "sec-h-bridge-8",
  "level": "2",
  "url": "sec-h-bridge.html#sec-h-bridge-8",
  "type": "Insight",
  "number": "11.3.6",
  "title": "Shoot-through and dead-time.",
  "body": " Shoot-through and dead-time  If the upper and lower switches of one H-bridge leg turn on simultaneously, they create a short circuit from the power supply to ground — called shoot-through . The TB6612FNG's internal logic prevents this by inserting a brief dead-time between switching events. This is why you should not drive IN1 and IN2 directly with complementary GPIO signals without the motor driver IC in between.  "
},
{
  "id": "subsec-pwm-waveform",
  "level": "1",
  "url": "subsec-pwm-waveform.html",
  "type": "Subsection",
  "number": "11.4.1",
  "title": "PWM Waveform",
  "body": " PWM Waveform   PWM waveform with 25%, 50%, and 75% duty cycles. The average voltage (dashed line) is proportional to the duty cycle. Increasing the duty cycle increases average voltage and therefore motor speed. The PWM frequency must be high enough that the motor's inductance smooths the current pulses into near-steady current.     Hardware PWM using a counter and compare register. When the counter is below the compare value (CCR1), the PWM output is HIGH; when the counter reaches or exceeds CCR1, the output goes LOW. At the auto-reload value (ARR) the counter resets and the cycle repeats.    "
},
{
  "id": "fig-pwm-waveform",
  "level": "2",
  "url": "subsec-pwm-waveform.html#fig-pwm-waveform",
  "type": "Figure",
  "number": "11.4.1",
  "title": "",
  "body": " PWM waveform with 25%, 50%, and 75% duty cycles. The average voltage (dashed line) is proportional to the duty cycle. Increasing the duty cycle increases average voltage and therefore motor speed. The PWM frequency must be high enough that the motor's inductance smooths the current pulses into near-steady current.   "
},
{
  "id": "fig-pwm-hardware",
  "level": "2",
  "url": "subsec-pwm-waveform.html#fig-pwm-hardware",
  "type": "Figure",
  "number": "11.4.2",
  "title": "",
  "body": " Hardware PWM using a counter and compare register. When the counter is below the compare value (CCR1), the PWM output is HIGH; when the counter reaches or exceeds CCR1, the output goes LOW. At the auto-reload value (ARR) the counter resets and the cycle repeats.   "
},
{
  "id": "subsec-pwm-timer",
  "level": "1",
  "url": "subsec-pwm-timer.html",
  "type": "Subsection",
  "number": "11.4.2",
  "title": "TIM14 PWM Configuration",
  "body": " TIM14 PWM Configuration  TIM14 channel 1 can drive a PWM output on PA4, PA7, or PB1. In addition to the PSC and ARR registers used for timing, PWM requires configuring the Capture\/Compare Mode Register (CCMR1), the Capture\/Compare Enable Register (CCER), and the Capture\/Compare Register 1 (CCR1) that sets the duty cycle.   TIM14 in PWM mode. CCR1 sets the duty cycle: when CNT < CCR1 the output is HIGH; otherwise LOW. ARR sets the period. Setting CCR1 to half of ARR gives 50% duty cycle.     Nucleo pins with TIM14 PWM capability. PA4, PA7, and PB1 can be driven by TIM14 channel 1 (AF4). In Lab 6 we use PA7 as the PWM output to the TB6612FNG PWMA pin.     Breadboard wiring for the motor PWM exercise. The TB6612FNG receives IN1 and IN2 for direction, PWMA for speed, and STBY pulled HIGH. The oscilloscope channel 1 monitors the PWM signal on PWMA.     TIM14 Capture\/Compare Mode Register 1 (CCMR1) in output compare mode. OC1M bits [6:4] = 0b110 select PWM mode 1 (output HIGH while CNT < CCR1).     TIM14 CCR1, ARR, and PSC registers for PWM. CCR1 = duty × ARR sets the on-time. ARR sets the period. PSC divides the clock to set the PWM frequency: .    #define PWM_TIMER_MAX 100 \/\/ ARR value: 100 steps of duty cycle #define PSC_VALUE 11 \/\/ 12 MHz \/ 12 = 1 MHz counter -> 10 kHz PWM void pwm_tim14_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/\/ PA7 = TIM14 CH1, AF4 GPIOA->MODER &= ~(3U << 14); GPIOA->MODER |= (2U << 14); \/\/ AF GPIOA->AFR[0] &= ~(0xFU << 28); GPIOA->AFR[0] |= (4U << 28); \/\/ AF4 TIM14->PSC = PSC_VALUE; TIM14->ARR = PWM_TIMER_MAX - 1; TIM14->CCR1 = 0; \/\/ 0% duty cycle initially TIM14->CCMR1 = (6U << TIM_CCMR1_OC1M_Pos); \/\/ PWM mode 1 TIM14->CCER |= TIM_CCER_CC1E; \/\/ enable CH1 output TIM14->EGR |= TIM_EGR_UG; \/\/ update registers TIM14->CR1 |= TIM_CR1_CEN; \/\/ start counter } void pwm_set_duty(uint8_t duty) { \/\/ duty: 0–100 TIM14->CCR1 = duty; }   Oscilloscope trace of the PWM ramp signal from TTmotor_ramp.c . The duty cycle increases from 0 to 100% over one ramp period, then reverses direction and ramps again. The motor speed increases as the duty cycle rises.    "
},
{
  "id": "fig-pwm-tim14-block",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-tim14-block",
  "type": "Figure",
  "number": "11.4.3",
  "title": "",
  "body": " TIM14 in PWM mode. CCR1 sets the duty cycle: when CNT < CCR1 the output is HIGH; otherwise LOW. ARR sets the period. Setting CCR1 to half of ARR gives 50% duty cycle.   "
},
{
  "id": "fig-pwm-nucleo-pins",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-nucleo-pins",
  "type": "Figure",
  "number": "11.4.4",
  "title": "",
  "body": " Nucleo pins with TIM14 PWM capability. PA4, PA7, and PB1 can be driven by TIM14 channel 1 (AF4). In Lab 6 we use PA7 as the PWM output to the TB6612FNG PWMA pin.   "
},
{
  "id": "fig-pwm-wiring-lab",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-wiring-lab",
  "type": "Figure",
  "number": "11.4.5",
  "title": "",
  "body": " Breadboard wiring for the motor PWM exercise. The TB6612FNG receives IN1 and IN2 for direction, PWMA for speed, and STBY pulled HIGH. The oscilloscope channel 1 monitors the PWM signal on PWMA.   "
},
{
  "id": "fig-tim14-ccmr1",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-tim14-ccmr1",
  "type": "Figure",
  "number": "11.4.6",
  "title": "",
  "body": " TIM14 Capture\/Compare Mode Register 1 (CCMR1) in output compare mode. OC1M bits [6:4] = 0b110 select PWM mode 1 (output HIGH while CNT < CCR1).   "
},
{
  "id": "fig-tim14-pwm-registers",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-tim14-pwm-registers",
  "type": "Figure",
  "number": "11.4.7",
  "title": "",
  "body": " TIM14 CCR1, ARR, and PSC registers for PWM. CCR1 = duty × ARR sets the on-time. ARR sets the period. PSC divides the clock to set the PWM frequency: .   "
},
{
  "id": "fig-pwm-oscilloscope",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-oscilloscope",
  "type": "Figure",
  "number": "11.4.8",
  "title": "",
  "body": " Oscilloscope trace of the PWM ramp signal from TTmotor_ramp.c . The duty cycle increases from 0 to 100% over one ramp period, then reverses direction and ramps again. The motor speed increases as the duty cycle rises.   "
},
{
  "id": "sec-motor-speed",
  "level": "1",
  "url": "sec-motor-speed.html",
  "type": "Section",
  "number": "11.5",
  "title": "Motor Speed Sensing",
  "body": " Motor Speed Sensing  To close a feedback loop (control actual speed, not just PWM duty cycle), we need to measure how fast the motor shaft is turning. An optical photointerrupter mounted on the motor shaft produces one pulse per slot as the encoder wheel rotates. By counting pulses per unit time or measuring the time between pulses, we compute RPM.   Optical incremental encoder and photointerrupter assembly. A slotted wheel attached to the motor shaft passes through the gap of the photointerrupter. When a slot aligns with the light beam the output goes HIGH; when the web blocks the beam the output goes LOW. Counting transitions gives shaft position and speed.       Oscilloscope capture of the photointerrupter output as motor speed increases from 30 RPM to 180 RPM. The pulse period decreases as speed increases. The period can be measured with the AD2 cursor tool to compute RPM.     Complete Lab 6 breadboard setup: potentiometer on PA0 (ADC), TB6612 motor driver on digital outputs, PWM on PA7, and photointerrupter on a digital input (with GPIO interrupt). The ADC reading sets the target speed; the photointerrupter measures actual speed.    "
},
{
  "id": "sec-motor-speed-2",
  "level": "2",
  "url": "sec-motor-speed.html#sec-motor-speed-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "photointerrupter "
},
{
  "id": "fig-photointerrupter",
  "level": "2",
  "url": "sec-motor-speed.html#fig-photointerrupter",
  "type": "Figure",
  "number": "11.5.1",
  "title": "",
  "body": " Optical incremental encoder and photointerrupter assembly. A slotted wheel attached to the motor shaft passes through the gap of the photointerrupter. When a slot aligns with the light beam the output goes HIGH; when the web blocks the beam the output goes LOW. Counting transitions gives shaft position and speed.     "
},
{
  "id": "fig-photointerrupter-scope",
  "level": "2",
  "url": "sec-motor-speed.html#fig-photointerrupter-scope",
  "type": "Figure",
  "number": "11.5.2",
  "title": "",
  "body": " Oscilloscope capture of the photointerrupter output as motor speed increases from 30 RPM to 180 RPM. The pulse period decreases as speed increases. The period can be measured with the AD2 cursor tool to compute RPM.   "
},
{
  "id": "fig-lab6-complete",
  "level": "2",
  "url": "sec-motor-speed.html#fig-lab6-complete",
  "type": "Figure",
  "number": "11.5.3",
  "title": "",
  "body": " Complete Lab 6 breadboard setup: potentiometer on PA0 (ADC), TB6612 motor driver on digital outputs, PWM on PA7, and photointerrupter on a digital input (with GPIO interrupt). The ADC reading sets the target speed; the photointerrupter measures actual speed.   "
},
{
  "id": "subsec-proper-acceleration",
  "level": "1",
  "url": "subsec-proper-acceleration.html",
  "type": "Subsection",
  "number": "12.1.1",
  "title": "What an Accelerometer Actually Measures",
  "body": " What an Accelerometer Actually Measures  An accelerometer does not directly measure coordinate acceleration — the rate of change of velocity you compute in a physics class. It measures proper acceleration : the force per unit mass acting on a test mass inside the device, relative to free fall.  This leads to a result that surprises most students at first: an accelerometer sitting perfectly still on a table, not moving at all, reads approximately on its vertical axis. The reason is that the table is pushing up on the device with a normal force equal to gravity. From the sensor's perspective, it is being accelerated upward at — exactly as if it were in a rocket with no gravity. An accelerometer in true free fall (like a dropped phone, for a brief moment) reads zero on all axes.  For embedded applications, this is actually useful. Because gravity always pulls downward at , a stationary accelerometer always sees a vector pointing straight up relative to the device. If the device tilts, that gravity vector tilts with it — and by reading all three axes you can compute the tilt angle precisely.  "
},
{
  "id": "subsec-proper-acceleration-2",
  "level": "2",
  "url": "subsec-proper-acceleration.html#subsec-proper-acceleration-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "proper acceleration "
},
{
  "id": "subsec-proof-mass",
  "level": "1",
  "url": "subsec-proof-mass.html",
  "type": "Subsection",
  "number": "12.1.2",
  "title": "The Proof Mass: Turning Acceleration into a Signal",
  "body": " The Proof Mass: Turning Acceleration into a Signal  Inside every accelerometer is a small proof mass — a tiny mass suspended by springs from the sensor's housing. When the housing accelerates, the proof mass tends to stay behind (inertia), so it displaces relative to the housing. The spring pulls it back, and at equilibrium the spring force equals the inertial force: where is the spring constant and is the displacement. Measuring the displacement of the proof mass gives you the acceleration.   Proof mass and spring model. The proof mass (suspended by a spring attached to the package) stays behind when the case accelerates. Its displacement relative to the case is proportional to acceleration: . In a MEMS device, the mass and spring are etched from silicon.    The proof-mass principle is common to most accelerometer types, but the way displacement is converted to an electrical signal varies. Piezoelectric accelerometers (common in industrial vibration sensing) squeeze a crystal as the proof mass displaces, generating a charge. Piezoresistive types measure how displacement changes the resistance of strain gauges. The type most common in consumer electronics — smartphones, fitness trackers, and the sensor we use in this course — is the capacitive MEMS accelerometer.  In a capacitive MEMS (Micro-Electro-Mechanical Systems) accelerometer, the proof mass and springs are etched from a thin silicon wafer using the same photolithographic processes used to make microchips. The whole mechanical structure is just a few hundred micrometers across — smaller than a grain of sand — and it is integrated onto the same die as the readout electronics. The proof mass forms one plate of a capacitor, and fixed plates on either side form the other plates. As the mass displaces, the capacitance to one fixed plate increases and to the other decreases. Measuring this differential capacitance gives a voltage proportional to displacement, and therefore to acceleration.   MEMS capacitive accelerometer cross-section. The proof mass is a movable plate suspended between two fixed plates. When the mass displaces, the capacitance to one fixed plate increases and to the other decreases. Measuring the differential capacitance gives displacement and therefore acceleration.    "
},
{
  "id": "subsec-proof-mass-2",
  "level": "2",
  "url": "subsec-proof-mass.html#subsec-proof-mass-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "proof mass "
},
{
  "id": "fig-accel-proof-mass",
  "level": "2",
  "url": "subsec-proof-mass.html#fig-accel-proof-mass",
  "type": "Figure",
  "number": "12.1.1",
  "title": "",
  "body": " Proof mass and spring model. The proof mass (suspended by a spring attached to the package) stays behind when the case accelerates. Its displacement relative to the case is proportional to acceleration: . In a MEMS device, the mass and spring are etched from silicon.   "
},
{
  "id": "subsec-proof-mass-4",
  "level": "2",
  "url": "subsec-proof-mass.html#subsec-proof-mass-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "capacitive MEMS "
},
{
  "id": "subsec-proof-mass-5",
  "level": "2",
  "url": "subsec-proof-mass.html#subsec-proof-mass-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "MEMS "
},
{
  "id": "fig-accel-mems",
  "level": "2",
  "url": "subsec-proof-mass.html#fig-accel-mems",
  "type": "Figure",
  "number": "12.1.2",
  "title": "",
  "body": " MEMS capacitive accelerometer cross-section. The proof mass is a movable plate suspended between two fixed plates. When the mass displaces, the capacitance to one fixed plate increases and to the other decreases. Measuring the differential capacitance gives displacement and therefore acceleration.   "
},
{
  "id": "subsec-tilt-sensing",
  "level": "1",
  "url": "subsec-tilt-sensing.html",
  "type": "Subsection",
  "number": "12.1.3",
  "title": "Tilt Sensing from Three Axes",
  "body": " Tilt Sensing from Three Axes  A three-axis accelerometer contains three proof masses oriented along the x, y, and z axes of the chip. Each axis independently reports the component of acceleration (including gravity) along that direction. When the device is stationary, the three readings together form a vector that points opposite to the direction of gravity.  If the chip is lying flat (z-axis pointing up), the z reading is and the x and y readings are near zero. Tilt the device 45° around the x-axis and the gravity vector projects equally onto z and y: both read approximately . The tilt angle can be recovered with an arctangent: This is how a phone knows to rotate its display, and how we will use the LSM303AGR in this course.  "
},
{
  "id": "rq-accel-concepts",
  "level": "1",
  "url": "rq-accel-concepts.html",
  "type": "Check Your Understanding",
  "number": "12.1.4",
  "title": "Check Your Understanding",
  "body": "  An accelerometer is sitting motionless on a flat table. Its z-axis points straight up. What does it read on the z-axis, and why?    Approximately , because the table's normal force pushes the device upward and the accelerometer measures that contact force, not the absence of motion.  Correct. Proper acceleration is what you feel — the contact force from the table. A device in free fall feels nothing and reads zero.    Zero, because the device is not moving and acceleration is zero when velocity is constant.  This would be correct for coordinate acceleration (rate of change of velocity), but an accelerometer measures proper acceleration — the contact force from the table's surface. A stationary device on a table reads .    Approximately , because gravity pulls the device downward.  The sign depends on the axis convention of the sensor, but the key point is that the reading is non-zero. Gravity is pulling down, but the table pushes back up — the sensor measures that upward contact force as a positive acceleration on the upward-pointing axis.    Zero on all three axes, because gravity cancels the normal force.  Gravity and the normal force cancel in terms of net force on the device as a whole (which is why it does not move), but the accelerometer measures the internal reaction force on its proof mass — which reflects the upward push from the table, not the net force.      The proof mass in a MEMS accelerometer displaces when the device accelerates. What physical principle causes this displacement?    Inertia — the proof mass resists the change in motion, so it lags behind the accelerating housing and displaces relative to it.  Correct. The displacement is then proportional to acceleration ( ), and measuring it gives the acceleration.    Magnetic force — the proof mass is magnetic and responds to changes in the Earth's magnetic field.  MEMS accelerometers are mechanical, not magnetic. The proof mass responds to inertial forces, not magnetic fields (that would be a magnetometer).    Thermal expansion — the proof mass expands when the device heats up due to motion.  MEMS accelerometers respond to inertia, not heat. Thermal effects are a source of noise in these sensors, not the sensing mechanism.    Piezoelectricity — stress on the silicon generates a voltage proportional to acceleration.  Some accelerometers use piezoelectric sensing, but the capacitive MEMS type (used in the LSM303AGR and most consumer devices) works by measuring proof-mass displacement as a change in capacitance, not a piezoelectric voltage.      A three-axis accelerometer is tilted so that its x-axis points straight down. The device is otherwise stationary. What does it read?    Approximately on the x-axis and near zero on y and z — the full gravity vector projects onto the downward-pointing x-axis.  Correct. When one axis is aligned with gravity, that axis carries the full reading. The sign is negative because the axis points down while the contact force (which the sensor measures) pushes up, opposite to the axis direction.    Zero on all axes — tilting the device redistributes the forces so they cancel.  The gravity vector does not disappear when you tilt the device; it just projects differently onto the three axes. One axis will always carry the full when aligned with gravity.    Approximately on all three axes — tilting amplifies the reading.  The total magnitude of the gravity vector is always regardless of orientation. It cannot be more than on any axis when the device is stationary.    Approximately on the x-axis — tilting has no effect because the sensor measures total acceleration, not direction.  The sign matters: the x-axis is pointing down, and the contact force (what the sensor measures) pushes upward, which is the negative x direction. A three-axis sensor does measure direction, not just magnitude.     "
},
{
  "id": "rq-accel-static",
  "level": "2",
  "url": "rq-accel-concepts.html#rq-accel-static",
  "type": "Reading Question",
  "number": "12.1.4.1",
  "title": "",
  "body": " An accelerometer is sitting motionless on a flat table. Its z-axis points straight up. What does it read on the z-axis, and why?    Approximately , because the table's normal force pushes the device upward and the accelerometer measures that contact force, not the absence of motion.  Correct. Proper acceleration is what you feel — the contact force from the table. A device in free fall feels nothing and reads zero.    Zero, because the device is not moving and acceleration is zero when velocity is constant.  This would be correct for coordinate acceleration (rate of change of velocity), but an accelerometer measures proper acceleration — the contact force from the table's surface. A stationary device on a table reads .    Approximately , because gravity pulls the device downward.  The sign depends on the axis convention of the sensor, but the key point is that the reading is non-zero. Gravity is pulling down, but the table pushes back up — the sensor measures that upward contact force as a positive acceleration on the upward-pointing axis.    Zero on all three axes, because gravity cancels the normal force.  Gravity and the normal force cancel in terms of net force on the device as a whole (which is why it does not move), but the accelerometer measures the internal reaction force on its proof mass — which reflects the upward push from the table, not the net force.    "
},
{
  "id": "rq-accel-proof-mass",
  "level": "2",
  "url": "rq-accel-concepts.html#rq-accel-proof-mass",
  "type": "Reading Question",
  "number": "12.1.4.2",
  "title": "",
  "body": " The proof mass in a MEMS accelerometer displaces when the device accelerates. What physical principle causes this displacement?    Inertia — the proof mass resists the change in motion, so it lags behind the accelerating housing and displaces relative to it.  Correct. The displacement is then proportional to acceleration ( ), and measuring it gives the acceleration.    Magnetic force — the proof mass is magnetic and responds to changes in the Earth's magnetic field.  MEMS accelerometers are mechanical, not magnetic. The proof mass responds to inertial forces, not magnetic fields (that would be a magnetometer).    Thermal expansion — the proof mass expands when the device heats up due to motion.  MEMS accelerometers respond to inertia, not heat. Thermal effects are a source of noise in these sensors, not the sensing mechanism.    Piezoelectricity — stress on the silicon generates a voltage proportional to acceleration.  Some accelerometers use piezoelectric sensing, but the capacitive MEMS type (used in the LSM303AGR and most consumer devices) works by measuring proof-mass displacement as a change in capacitance, not a piezoelectric voltage.    "
},
{
  "id": "rq-accel-tilt",
  "level": "2",
  "url": "rq-accel-concepts.html#rq-accel-tilt",
  "type": "Reading Question",
  "number": "12.1.4.3",
  "title": "",
  "body": " A three-axis accelerometer is tilted so that its x-axis points straight down. The device is otherwise stationary. What does it read?    Approximately on the x-axis and near zero on y and z — the full gravity vector projects onto the downward-pointing x-axis.  Correct. When one axis is aligned with gravity, that axis carries the full reading. The sign is negative because the axis points down while the contact force (which the sensor measures) pushes up, opposite to the axis direction.    Zero on all axes — tilting the device redistributes the forces so they cancel.  The gravity vector does not disappear when you tilt the device; it just projects differently onto the three axes. One axis will always carry the full when aligned with gravity.    Approximately on all three axes — tilting amplifies the reading.  The total magnitude of the gravity vector is always regardless of orientation. It cannot be more than on any axis when the device is stationary.    Approximately on the x-axis — tilting has no effect because the sensor measures total acceleration, not direction.  The sign matters: the x-axis is pointing down, and the contact force (what the sensor measures) pushes upward, which is the negative x direction. A three-axis sensor does measure direction, not just magnitude.    "
},
{
  "id": "sec-lsm303agr",
  "level": "1",
  "url": "sec-lsm303agr.html",
  "type": "Section",
  "number": "12.2",
  "title": "The LSM303AGR Accelerometer",
  "body": " The LSM303AGR Accelerometer   STMicroelectronics LSM303AGR module mounted on an Adafruit breakout board with STEMMA QT connector. The chip combines a 3-axis accelerometer and a 3-axis magnetometer. In ENGS 28 we use only the accelerometer portion.     LSM303AGR accelerometer key specifications: selectable full-scale range (±2g, ±4g, ±8g, ±16g), selectable resolution (8, 10, or 12 bits depending on power mode), and I2C\/SPI interface. In ENGS 28 we use ±2g full-scale and 12-bit low-power mode.      Breakout board schematic (partial). The 6-pin STEMMA QT header provides 3.3 V power, GND, SCL, and SDA. Pull-up resistors for I2C are already on the breakout board, so no external resistors are needed. The chip is hardwired for I2C (SPI disabled by the board).     LSM303AGR breakout wiring to the Nucleo board. Red lead to 3.3 V, black to GND, yellow (SCL) to PB8, blue (SDA) to PB9. The same I2C1 bus used for the 7-segment display also supports the accelerometer.      Full test setup with the Nucleo, breadboard, LSM303AGR, and AD2 logic analyzer connected to SCL and SDA for I2C debugging.    "
},
{
  "id": "fig-lsm303agr-chip",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-chip",
  "type": "Figure",
  "number": "12.2.1",
  "title": "",
  "body": " STMicroelectronics LSM303AGR module mounted on an Adafruit breakout board with STEMMA QT connector. The chip combines a 3-axis accelerometer and a 3-axis magnetometer. In ENGS 28 we use only the accelerometer portion.   "
},
{
  "id": "fig-lsm303agr-specs",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-specs",
  "type": "Figure",
  "number": "12.2.2",
  "title": "",
  "body": " LSM303AGR accelerometer key specifications: selectable full-scale range (±2g, ±4g, ±8g, ±16g), selectable resolution (8, 10, or 12 bits depending on power mode), and I2C\/SPI interface. In ENGS 28 we use ±2g full-scale and 12-bit low-power mode.    "
},
{
  "id": "fig-lsm303agr-breakout",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-breakout",
  "type": "Figure",
  "number": "12.2.3",
  "title": "",
  "body": " Breakout board schematic (partial). The 6-pin STEMMA QT header provides 3.3 V power, GND, SCL, and SDA. Pull-up resistors for I2C are already on the breakout board, so no external resistors are needed. The chip is hardwired for I2C (SPI disabled by the board).   "
},
{
  "id": "fig-lsm303agr-wiring",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-wiring",
  "type": "Figure",
  "number": "12.2.4",
  "title": "",
  "body": " LSM303AGR breakout wiring to the Nucleo board. Red lead to 3.3 V, black to GND, yellow (SCL) to PB8, blue (SDA) to PB9. The same I2C1 bus used for the 7-segment display also supports the accelerometer.    "
},
{
  "id": "fig-lsm303agr-test-wiring",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-test-wiring",
  "type": "Figure",
  "number": "12.2.5",
  "title": "",
  "body": " Full test setup with the Nucleo, breadboard, LSM303AGR, and AD2 logic analyzer connected to SCL and SDA for I2C debugging.   "
},
{
  "id": "subsec-accel-i2c-pattern",
  "level": "1",
  "url": "subsec-accel-i2c-pattern.html",
  "type": "Subsection",
  "number": "12.3.1",
  "title": "I2C Read\/Write Patterns",
  "body": " I2C Read\/Write Patterns   I2C transfer patterns for the LSM303AGR. A register write: START, address+W, register address, data byte, STOP. A register read: START, address+W, register address, repeated START, address+R, data byte, NACK, STOP. The repeated START lets the controller switch from write to read without releasing the bus.    "
},
{
  "id": "fig-accel-i2c-transfers",
  "level": "2",
  "url": "subsec-accel-i2c-pattern.html#fig-accel-i2c-transfers",
  "type": "Figure",
  "number": "12.3.1",
  "title": "",
  "body": " I2C transfer patterns for the LSM303AGR. A register write: START, address+W, register address, data byte, STOP. A register read: START, address+W, register address, repeated START, address+R, data byte, NACK, STOP. The repeated START lets the controller switch from write to read without releasing the bus.   "
},
{
  "id": "subsec-accel-data-format",
  "level": "1",
  "url": "subsec-accel-data-format.html",
  "type": "Subsection",
  "number": "12.3.2",
  "title": "Data Format and Unit Conversion",
  "body": " Data Format and Unit Conversion  The accelerometer outputs a 16-bit, left-justified two's complement integer per axis. In 12-bit low-power mode, only bits [15:4] are valid; the lower 4 bits are 0. For a ±2g full-scale range:     The raw output of an accelerometer at rest with one axis pointing down is approximately ±1g (depending on orientation). A perfectly calibrated sensor shows exactly 1000 mg on the downward axis and 0 on the other two.  "
},
{
  "id": "sec-tilt-sensing",
  "level": "1",
  "url": "sec-tilt-sensing.html",
  "type": "Section",
  "number": "12.4",
  "title": "Tilt Sensing",
  "body": " Tilt Sensing   Tilt geometry. When the accelerometer is tilted by angle θ from horizontal, the x-axis reads and the z-axis reads . Inverting: . For small tilts, in radians.     Computing tilt requires sinf() or asinf() from math.h and floating-point arithmetic. On the Cortex-M0+, floating-point operations are performed in software (no FPU), so they are significantly slower than integer operations — but for a tilt display updating at 100 Hz, this is easily fast enough.   CoolTerm serial plotter showing real-time X, Y, and Z accelerations as the sensor is tilted. When the board is flat, Z reads approximately +1g (gravity); tilting rotates the gravity vector between axes. The plotter is enabled in CoolTerm under Connection → Serial Plotter.      The accelerometer is lying flat on the table with its Z axis pointing up. What does the Z-axis reading report at rest?   Approximately +1g (the table's normal force on the proof mass)  Correct. A stationary accelerometer measures the reaction to gravity, which equals +g on the upward-pointing axis.  Approximately 0g (the device is not accelerating)  An accelerometer in free fall reads 0g. At rest, gravity is felt as a +1g force on the upward axis.  Approximately –1g  –1g would appear if Z pointed downward. With Z pointing up the reading is +1g.  Undefined — it depends on the sensor orientation setting.  The sign depends on the axis convention but the magnitude is always 1g when stationary.     "
},
{
  "id": "fig-tilt-geometry",
  "level": "2",
  "url": "sec-tilt-sensing.html#fig-tilt-geometry",
  "type": "Figure",
  "number": "12.4.1",
  "title": "",
  "body": " Tilt geometry. When the accelerometer is tilted by angle θ from horizontal, the x-axis reads and the z-axis reads . Inverting: . For small tilts, in radians.    "
},
{
  "id": "fig-accel-plotter",
  "level": "2",
  "url": "sec-tilt-sensing.html#fig-accel-plotter",
  "type": "Figure",
  "number": "12.4.2",
  "title": "",
  "body": " CoolTerm serial plotter showing real-time X, Y, and Z accelerations as the sensor is tilted. When the board is flat, Z reads approximately +1g (gravity); tilting rotates the gravity vector between axes. The plotter is enabled in CoolTerm under Connection → Serial Plotter.   "
},
{
  "id": "rq-accel-gravity",
  "level": "2",
  "url": "rq-accel.html#rq-accel-gravity",
  "type": "Reading Question",
  "number": "12.4.1",
  "title": "",
  "body": " The accelerometer is lying flat on the table with its Z axis pointing up. What does the Z-axis reading report at rest?   Approximately +1g (the table's normal force on the proof mass)  Correct. A stationary accelerometer measures the reaction to gravity, which equals +g on the upward-pointing axis.  Approximately 0g (the device is not accelerating)  An accelerometer in free fall reads 0g. At rest, gravity is felt as a +1g force on the upward axis.  Approximately –1g  –1g would appear if Z pointed downward. With Z pointing up the reading is +1g.  Undefined — it depends on the sensor orientation setting.  The sign depends on the axis convention but the magnitude is always 1g when stationary.   "
},
{
  "id": "subsec-servo-vs-dc-motor",
  "level": "1",
  "url": "subsec-servo-vs-dc-motor.html",
  "type": "Subsection",
  "number": "13.1.1",
  "title": "Position Control vs. Speed Control",
  "body": " Position Control vs. Speed Control  A plain DC motor is an open-loop actuator: apply voltage, it spins; remove voltage, it coasts to a stop. PWM lets you control average voltage and therefore average speed, but nothing stops the motor from drifting if the load changes. If you want the shaft at a particular angle, you have to sense the position yourself and run a control loop in your own code.  A servo handles all of that internally. You send a single PWM signal that says \"go to this angle,\" and the servo moves there and stays — resisting any external force that tries to push it away. There is no motor-speed control, no direction control, and no position sensing to wire up. This simplicity makes servos the default choice wherever you need repeatable positioning: robot joints, camera gimbals, RC steering linkages, and control surface actuators.  "
},
{
  "id": "subsec-closed-loop-concept",
  "level": "1",
  "url": "subsec-closed-loop-concept.html",
  "type": "Subsection",
  "number": "13.1.2",
  "title": "How the Internal Feedback Loop Works",
  "body": " How the Internal Feedback Loop Works  Inside every servomotor are three subsystems working together. A small DC motor drives a multi-stage gear train that converts the motor's high speed and low torque into low speed and high torque at the output shaft. A potentiometer — a variable resistor whose resistance changes with rotation — is connected directly to the output shaft and converts the current angle into a voltage.   Internal components of a servomotor. The DC motor drives a plastic gear train (typically four to six stages). The final gear meshes directly with the output shaft and also turns the feedback potentiometer. A small PCB provides the error amplifier, PWM decoder, and H-bridge motor driver.    A control circuit on a tiny PCB inside the servo compares two voltages: the angle the shaft is at (from the potentiometer) and the angle you commanded (decoded from the PWM signal). The difference between them is the error . As long as there is a nonzero error, the controller drives the motor in the direction that reduces it. When the shaft reaches the commanded angle, the error reaches zero and the motor drive reduces to zero — but the feedback loop remains active and will restart the motor the instant a disturbance pushes the shaft away. This continuous comparison is what makes the system closed-loop : the output (shaft position) is constantly fed back to the input and compared against the command.  The key practical consequence: if something pushes on the servo arm while it is holding a commanded position, the controller detects the resulting position error and fights back. A servo actively resists disturbances; a plain DC motor with no feedback would simply move wherever the external force pushed it.   Servo closed-loop block diagram. The input PWM pulse width is decoded to a reference voltage . The potentiometer produces proportional to shaft angle. The error amplifier drives the motor with a voltage proportional to , rotating the shaft until the error reaches zero. The result is a position servo that resists external disturbances.    "
},
{
  "id": "subsec-closed-loop-concept-2",
  "level": "2",
  "url": "subsec-closed-loop-concept.html#subsec-closed-loop-concept-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "potentiometer "
},
{
  "id": "fig-servo-internals",
  "level": "2",
  "url": "subsec-closed-loop-concept.html#fig-servo-internals",
  "type": "Figure",
  "number": "13.1.1",
  "title": "",
  "body": " Internal components of a servomotor. The DC motor drives a plastic gear train (typically four to six stages). The final gear meshes directly with the output shaft and also turns the feedback potentiometer. A small PCB provides the error amplifier, PWM decoder, and H-bridge motor driver.   "
},
{
  "id": "subsec-closed-loop-concept-4",
  "level": "2",
  "url": "subsec-closed-loop-concept.html#subsec-closed-loop-concept-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "error closed-loop "
},
{
  "id": "fig-servo-feedback-block",
  "level": "2",
  "url": "subsec-closed-loop-concept.html#fig-servo-feedback-block",
  "type": "Figure",
  "number": "13.1.2",
  "title": "",
  "body": " Servo closed-loop block diagram. The input PWM pulse width is decoded to a reference voltage . The potentiometer produces proportional to shaft angle. The error amplifier drives the motor with a voltage proportional to , rotating the shaft until the error reaches zero. The result is a position servo that resists external disturbances.   "
},
{
  "id": "subsec-servo-pwm-intro",
  "level": "1",
  "url": "subsec-servo-pwm-intro.html",
  "type": "Subsection",
  "number": "13.1.3",
  "title": "PWM as a Position Command",
  "body": " PWM as a Position Command  You already know PWM from the motors chapter, where duty cycle controlled motor speed by setting the average voltage seen by the motor. Servo PWM works differently: the servo's internal decoder measures the absolute duration of the HIGH pulse each cycle, not the ratio of high to low time.  The hobby servo standard specifies a 50 Hz signal (one pulse every 20 ms). The pulse width encodes the commanded angle:   1 ms pulse full left (approximately −90°)  1.5 ms pulse center (0°)  2 ms pulse full right (approximately +90°)   Any pulse width between 1 ms and 2 ms maps linearly to an intermediate angle. The decoder inside the servo measures how long the signal stays HIGH and uses that time as the position command. Your code simply writes a value to the CCR1 register that sets the pulse duration; the servo does the rest.   For DC motor PWM, what matters is the fraction of time the signal is HIGH (the duty cycle). For servo PWM, what matters is the absolute length of the HIGH pulse in microseconds. The 20 ms period is mostly dead time — the servo only looks at the first 1–2 ms of each cycle.   "
},
{
  "id": "subsec-servo-pwm-intro-6",
  "level": "2",
  "url": "subsec-servo-pwm-intro.html#subsec-servo-pwm-intro-6",
  "type": "Insight",
  "number": "13.1.3",
  "title": "",
  "body": " For DC motor PWM, what matters is the fraction of time the signal is HIGH (the duty cycle). For servo PWM, what matters is the absolute length of the HIGH pulse in microseconds. The 20 ms period is mostly dead time — the servo only looks at the first 1–2 ms of each cycle.  "
},
{
  "id": "rq-servo-concepts",
  "level": "1",
  "url": "rq-servo-concepts.html",
  "type": "Check Your Understanding",
  "number": "13.1.4",
  "title": "Check Your Understanding",
  "body": "   You want to command a servo to its center position (0°). The servo standard specifies 1 ms = −90°, 1.5 ms = 0°, 2 ms = +90°. What pulse width should your PWM signal produce each cycle?     1.5 ms  Correct. The servo decoder measures the HIGH pulse duration; 1.5 ms maps to the center position. The remaining 18.5 ms of the 20 ms period is LOW and carries no position information.    50% duty cycle (10 ms HIGH, 10 ms LOW)  That is how a DC motor would be controlled to half speed, but a servo looks at absolute pulse duration, not duty cycle. A 10 ms HIGH pulse is far outside the 1–2 ms range the servo expects.    0 ms (no pulse)  Without a pulse, the servo receives no command and may twitch or go limp depending on the model. The center command is 1.5 ms, not silence.    3 ms (midpoint of a 0–6 ms range)  The hobby servo standard uses a 1–2 ms range. The center of that range is 1.5 ms. A 3 ms pulse would be interpreted as outside the valid range and the servo behavior would be undefined.       You command a servo to hold at 0° (center), then press the arm toward −90° with your finger. What happens?     The servo resists and pushes back toward center.  Correct. The potentiometer reports an angle other than 0°, creating a nonzero error. The controller drives the motor to eliminate that error, which means pushing back against your finger.    The servo moves with your finger and holds the new position.  This would describe an open-loop motor with no feedback. The servo's closed-loop controller keeps comparing actual position to the commanded position and corrects any deviation.    The servo cuts power to the motor to avoid damage.  Servo controllers do not cut power when disturbed — doing so would mean they could not hold position under load. The motor increases its effort to resist the disturbance.    The servo rotates all the way to +90° to compensate.  The controller minimizes the difference between commanded and actual position — it does not overshoot to the opposite extreme.       Why should the servo's power (red) wire be connected to an external 5 V supply rather than directly to a Nucleo GPIO pin?     The servo can draw up to 700 mA at stall — far more than a GPIO pin can supply.  Correct. A GPIO pin on the STM32 is rated for approximately 8 mA. The servo's DC motor needs tens to hundreds of milliamps to move under load. Only the signal (yellow) wire connects to the GPIO; power must come from a dedicated 5 V rail.    The servo needs 5 V logic levels on the signal wire to decode the PWM correctly.  The signal wire (yellow) carries the PWM pulse from the GPIO pin and a 3.3 V HIGH level is sufficient for most servos. The issue is current on the power wire, not voltage on the signal wire.    GPIO pins can only source current, not sink it, so they cannot power the motor in both directions.  STM32 GPIO pins can both source and sink current, but the fundamental issue is the amount of current — the servo's motor draws far more than any GPIO pin can safely provide.    3.3 V would make the servo spin in the wrong direction.  Voltage polarity determines direction in a DC motor, not the logic-level voltage. The real constraint is current capacity: a GPIO pin cannot supply enough current to drive the motor.     "
},
{
  "id": "rq-servo-position-encoding",
  "level": "2",
  "url": "rq-servo-concepts.html#rq-servo-position-encoding",
  "type": "Reading Question",
  "number": "13.1.4.1",
  "title": "",
  "body": "  You want to command a servo to its center position (0°). The servo standard specifies 1 ms = −90°, 1.5 ms = 0°, 2 ms = +90°. What pulse width should your PWM signal produce each cycle?     1.5 ms  Correct. The servo decoder measures the HIGH pulse duration; 1.5 ms maps to the center position. The remaining 18.5 ms of the 20 ms period is LOW and carries no position information.    50% duty cycle (10 ms HIGH, 10 ms LOW)  That is how a DC motor would be controlled to half speed, but a servo looks at absolute pulse duration, not duty cycle. A 10 ms HIGH pulse is far outside the 1–2 ms range the servo expects.    0 ms (no pulse)  Without a pulse, the servo receives no command and may twitch or go limp depending on the model. The center command is 1.5 ms, not silence.    3 ms (midpoint of a 0–6 ms range)  The hobby servo standard uses a 1–2 ms range. The center of that range is 1.5 ms. A 3 ms pulse would be interpreted as outside the valid range and the servo behavior would be undefined.    "
},
{
  "id": "rq-servo-holds-position",
  "level": "2",
  "url": "rq-servo-concepts.html#rq-servo-holds-position",
  "type": "Reading Question",
  "number": "13.1.4.2",
  "title": "",
  "body": "  You command a servo to hold at 0° (center), then press the arm toward −90° with your finger. What happens?     The servo resists and pushes back toward center.  Correct. The potentiometer reports an angle other than 0°, creating a nonzero error. The controller drives the motor to eliminate that error, which means pushing back against your finger.    The servo moves with your finger and holds the new position.  This would describe an open-loop motor with no feedback. The servo's closed-loop controller keeps comparing actual position to the commanded position and corrects any deviation.    The servo cuts power to the motor to avoid damage.  Servo controllers do not cut power when disturbed — doing so would mean they could not hold position under load. The motor increases its effort to resist the disturbance.    The servo rotates all the way to +90° to compensate.  The controller minimizes the difference between commanded and actual position — it does not overshoot to the opposite extreme.    "
},
{
  "id": "rq-servo-power",
  "level": "2",
  "url": "rq-servo-concepts.html#rq-servo-power",
  "type": "Reading Question",
  "number": "13.1.4.3",
  "title": "",
  "body": "  Why should the servo's power (red) wire be connected to an external 5 V supply rather than directly to a Nucleo GPIO pin?     The servo can draw up to 700 mA at stall — far more than a GPIO pin can supply.  Correct. A GPIO pin on the STM32 is rated for approximately 8 mA. The servo's DC motor needs tens to hundreds of milliamps to move under load. Only the signal (yellow) wire connects to the GPIO; power must come from a dedicated 5 V rail.    The servo needs 5 V logic levels on the signal wire to decode the PWM correctly.  The signal wire (yellow) carries the PWM pulse from the GPIO pin and a 3.3 V HIGH level is sufficient for most servos. The issue is current on the power wire, not voltage on the signal wire.    GPIO pins can only source current, not sink it, so they cannot power the motor in both directions.  STM32 GPIO pins can both source and sink current, but the fundamental issue is the amount of current — the servo's motor draws far more than any GPIO pin can safely provide.    3.3 V would make the servo spin in the wrong direction.  Voltage polarity determines direction in a DC motor, not the logic-level voltage. The real constraint is current capacity: a GPIO pin cannot supply enough current to drive the motor.    "
},
{
  "id": "sec-servo-internals",
  "level": "1",
  "url": "sec-servo-internals.html",
  "type": "Section",
  "number": "13.2",
  "title": "Inside a Servomotor",
  "body": " Inside a Servomotor  A servomotor is a self-contained closed-loop position controller. Three internal components work together: a DC motor turns a multi-stage gear train that amplifies torque and reduces shaft speed; a potentiometer coupled to the output shaft converts angular position to a voltage; and a small analog controller circuit compares the potentiometer voltage to a reference derived from the incoming PWM signal. Whenever the two voltages differ, the controller drives the motor to close the gap.   TowerPro SG92R micro-servo used in ENGS 28 labs. Key specs: supply voltage 4.8–6 V; stall torque 2.5 kgf·cm; no-load speed 0.1 s\/60°. Three wires emerge from the housing: brown (GND), red (power 4–6 V), and yellow (PWM signal).       "
},
{
  "id": "fig-servo-sg92r",
  "level": "2",
  "url": "sec-servo-internals.html#fig-servo-sg92r",
  "type": "Figure",
  "number": "13.2.1",
  "title": "",
  "body": " TowerPro SG92R micro-servo used in ENGS 28 labs. Key specs: supply voltage 4.8–6 V; stall torque 2.5 kgf·cm; no-load speed 0.1 s\/60°. Three wires emerge from the housing: brown (GND), red (power 4–6 V), and yellow (PWM signal).      "
},
{
  "id": "subsec-servo-timer-registers",
  "level": "1",
  "url": "subsec-servo-timer-registers.html",
  "type": "Subsection",
  "number": "13.3.1",
  "title": "TIM14 Register Values",
  "body": " TIM14 Register Values  The servo reuses the TIM14 PWM output on PA7 (CH1, AF4). The key change from motor PWM is the timer period: instead of the audio-inaudible 20 kHz frequency used for motors, the servo needs exactly 50 Hz.   TIM14 block diagram showing PSC, CNT, ARR, and CCR1. The counter increments at the post-prescaler rate. When CNT reaches ARR it resets (end of period); when CNT reaches CCR1 the output goes low (end of pulse).     Nucleo-C031C6 PWM-capable pins. PA7 (TIM14 CH1 AF4) is brought out to the Arduino connector D11 header, making it easy to reach with a jumper wire to the servo yellow wire.     Timer design calculation. With SYSCLK = 12 MHz, setting PSC = 11 gives a 1 MHz counter clock (tick = 1 µs). ARR = 19999 makes the period 20000 µs = 20 ms = 50 Hz. CCR1 sweeps from 1000 to 2000 to produce 1–2 ms pulse widths corresponding to the full servo range.     CCMR1 register configuration for PWM Mode 1 on CH1. Bits OC1M (positions 4–6) are set to 0b110 (value 6); bit OC1PE (position 3) enables output compare preload. CCER bit CC1E enables the channel output.     CCR1, ARR, and PSC in context. PSC = 11 divides 12 MHz to 1 MHz. ARR = 19999 gives the 20 ms period. CCR1 = 1000, 1500, or 2000 maps to 1 ms, 1.5 ms, and 2 ms pulses (left, center, right).    \/* Servo PWM constants for TIM14 CH1 on PA7 at 12 MHz SYSCLK *\/ #define SERVO_PSC 11 \/\/ 12 MHz \/ 12 = 1 MHz (1 tick = 1 µs) #define SERVO_ARR 19999 \/\/ 1 MHz \/ 20000 = 50 Hz period #define SERVO_MIN 1000 \/\/ 1 ms -> full left (~-90°) #define SERVO_CENTER 1500 \/\/ 1.5 ms -> center (0°) #define SERVO_MAX 2000 \/\/ 2 ms -> full right (~+90°) void servo_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/* PA7 -> AF4 (TIM14 CH1) *\/ GPIOA->MODER &= ~(3U << 14); GPIOA->MODER |= (2U << 14); \/\/ Alternate function GPIOA->AFR[0] &= ~(0xFU << 28); GPIOA->AFR[0] |= (4U << 28); \/\/ AF4 TIM14->PSC = SERVO_PSC; TIM14->ARR = SERVO_ARR; TIM14->CCR1 = SERVO_CENTER; TIM14->CCMR1 = (6U << TIM_CCMR1_OC1M_Pos) | TIM_CCMR1_OC1PE; TIM14->CCER |= TIM_CCER_CC1E; TIM14->EGR |= TIM_EGR_UG; TIM14->CR1 |= TIM_CR1_CEN; } \/* Set servo position; pulse_us in range [SERVO_MIN, SERVO_MAX] *\/ void servo_set(uint16_t pulse_us) { TIM14->CCR1 = pulse_us; }  "
},
{
  "id": "fig-servo-tim14-block",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-tim14-block",
  "type": "Figure",
  "number": "13.3.2",
  "title": "",
  "body": " TIM14 block diagram showing PSC, CNT, ARR, and CCR1. The counter increments at the post-prescaler rate. When CNT reaches ARR it resets (end of period); when CNT reaches CCR1 the output goes low (end of pulse).   "
},
{
  "id": "fig-servo-nucleo-pins",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-nucleo-pins",
  "type": "Figure",
  "number": "13.3.3",
  "title": "",
  "body": " Nucleo-C031C6 PWM-capable pins. PA7 (TIM14 CH1 AF4) is brought out to the Arduino connector D11 header, making it easy to reach with a jumper wire to the servo yellow wire.   "
},
{
  "id": "fig-servo-tim14-design",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-tim14-design",
  "type": "Figure",
  "number": "13.3.4",
  "title": "",
  "body": " Timer design calculation. With SYSCLK = 12 MHz, setting PSC = 11 gives a 1 MHz counter clock (tick = 1 µs). ARR = 19999 makes the period 20000 µs = 20 ms = 50 Hz. CCR1 sweeps from 1000 to 2000 to produce 1–2 ms pulse widths corresponding to the full servo range.   "
},
{
  "id": "fig-servo-ccmr1",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-ccmr1",
  "type": "Figure",
  "number": "13.3.5",
  "title": "",
  "body": " CCMR1 register configuration for PWM Mode 1 on CH1. Bits OC1M (positions 4–6) are set to 0b110 (value 6); bit OC1PE (position 3) enables output compare preload. CCER bit CC1E enables the channel output.   "
},
{
  "id": "fig-servo-ccr1-arr",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-ccr1-arr",
  "type": "Figure",
  "number": "13.3.6",
  "title": "",
  "body": " CCR1, ARR, and PSC in context. PSC = 11 divides 12 MHz to 1 MHz. ARR = 19999 gives the 20 ms period. CCR1 = 1000, 1500, or 2000 maps to 1 ms, 1.5 ms, and 2 ms pulses (left, center, right).   "
},
{
  "id": "subsec-servo-verify-scope",
  "level": "1",
  "url": "subsec-servo-verify-scope.html",
  "type": "Subsection",
  "number": "13.3.2",
  "title": "Verifying the Signal with an Oscilloscope",
  "body": " Verifying the Signal with an Oscilloscope   AD2 oscilloscope trace with CCR1 = 1000 (1 ms pulse, servo at full left). The high-time cursor measures 1 ms. The 20 ms period is visible between the rising edges of consecutive pulses.     Trace with CCR1 = 2000 (2 ms pulse, servo at full right). The servo arm has rotated approximately 180° from the previous trace, and the pulse width has doubled to 2 ms.    "
},
{
  "id": "fig-servo-scope-1ms",
  "level": "2",
  "url": "subsec-servo-verify-scope.html#fig-servo-scope-1ms",
  "type": "Figure",
  "number": "13.3.7",
  "title": "",
  "body": " AD2 oscilloscope trace with CCR1 = 1000 (1 ms pulse, servo at full left). The high-time cursor measures 1 ms. The 20 ms period is visible between the rising edges of consecutive pulses.   "
},
{
  "id": "fig-servo-scope-2ms",
  "level": "2",
  "url": "subsec-servo-verify-scope.html#fig-servo-scope-2ms",
  "type": "Figure",
  "number": "13.3.8",
  "title": "",
  "body": " Trace with CCR1 = 2000 (2 ms pulse, servo at full right). The servo arm has rotated approximately 180° from the previous trace, and the pulse width has doubled to 2 ms.   "
},
{
  "id": "rq-servo-pwm",
  "level": "1",
  "url": "rq-servo-pwm.html",
  "type": "Check Your Understanding",
  "number": "13.3.3",
  "title": "Check Your Understanding",
  "body": "  TIM14 runs at 1 MHz (PSC = 11, 12 MHz input clock). What CCR1 value positions the servo at center (0°)?   1500  Correct: at 1 MHz the counter increments once per microsecond, so CCR1 = 1500 gives exactly 1500 µs = 1.5 ms, the center pulse width.  750  750 µs = 0.75 ms is below the servo's minimum pulse width (1 ms); the servo would not respond predictably.  15000  15000 µs = 15 ms is far beyond the 2 ms maximum pulse width. Remember that at 1 MHz, CCR1 counts in microseconds, not milliseconds.  1500000  That is 1.5 seconds — orders of magnitude too large. The counter would wrap around long before reaching that value.     Why does servo control use 50 Hz rather than the ~20 kHz used for motor PWM?   The servo's internal controller decodes the pulse width directly; it needs time between pulses to read the signal. Also, 20 kHz would require CCR1 values of 20–40 ticks, giving very coarse position resolution.  Correct: the servo samples one pulse per cycle. A 50 Hz rate gives 20 ms between updates — more than enough. Higher frequencies shrink the resolution window.  The STM32 cannot generate 20 kHz with a 50-Hz-derived timer base.  The STM32 can generate any frequency the timer supports. The constraint is the servo hardware, not the microcontroller.  50 Hz matches the AC mains frequency, simplifying power supply design.  The servo operates from DC; mains frequency is irrelevant here.    "
},
{
  "id": "rq-servo-ccr1-center",
  "level": "2",
  "url": "rq-servo-pwm.html#rq-servo-ccr1-center",
  "type": "Reading Question",
  "number": "13.3.3.1",
  "title": "",
  "body": " TIM14 runs at 1 MHz (PSC = 11, 12 MHz input clock). What CCR1 value positions the servo at center (0°)?   1500  Correct: at 1 MHz the counter increments once per microsecond, so CCR1 = 1500 gives exactly 1500 µs = 1.5 ms, the center pulse width.  750  750 µs = 0.75 ms is below the servo's minimum pulse width (1 ms); the servo would not respond predictably.  15000  15000 µs = 15 ms is far beyond the 2 ms maximum pulse width. Remember that at 1 MHz, CCR1 counts in microseconds, not milliseconds.  1500000  That is 1.5 seconds — orders of magnitude too large. The counter would wrap around long before reaching that value.   "
},
{
  "id": "rq-servo-freq",
  "level": "2",
  "url": "rq-servo-pwm.html#rq-servo-freq",
  "type": "Reading Question",
  "number": "13.3.3.2",
  "title": "",
  "body": " Why does servo control use 50 Hz rather than the ~20 kHz used for motor PWM?   The servo's internal controller decodes the pulse width directly; it needs time between pulses to read the signal. Also, 20 kHz would require CCR1 values of 20–40 ticks, giving very coarse position resolution.  Correct: the servo samples one pulse per cycle. A 50 Hz rate gives 20 ms between updates — more than enough. Higher frequencies shrink the resolution window.  The STM32 cannot generate 20 kHz with a 50-Hz-derived timer base.  The STM32 can generate any frequency the timer supports. The constraint is the servo hardware, not the microcontroller.  50 Hz matches the AC mains frequency, simplifying power supply design.  The servo operates from DC; mains frequency is irrelevant here.   "
},
{
  "id": "sec-servo-wiring-power",
  "level": "1",
  "url": "sec-servo-wiring-power.html",
  "type": "Section",
  "number": "13.4",
  "title": "Wiring and Power Supply",
  "body": " Wiring and Power Supply  The servo draws substantially more current than the STM32 GPIO pin can supply: up to 700 mA at stall. The servo must be powered from an external rail, with only the signal wire connected to the microcontroller GPIO.   Servo breadboard wiring. Brown wire to GND; red wire to the 5 V power rail (not the Nucleo 3.3 V pin); yellow wire to the TIM14 CH1 PWM pin (PA7). GND of the servo and GND of the Nucleo must share a common reference.     Two external power options for the servo. Left: use the 5 V output available on the Nucleo's USB power header (sufficient for light loads and lab demonstrations). Right: use a regulated 5 V line from a wall-wart through the power board (required for stall conditions or when multiple servos are used).      Power board wiring for reliable servo operation. The wall-wart supplies regulated 5 V to the power board. The servo red wire connects to the 5 V rail; the servo brown and Nucleo GND connect to the same GND rail. The signal jumper (yellow) runs from PA7 to the servo connector.     Complete lab 7 hardware setup. The breadboard holds the power board, Nucleo, and servo connector. The oscilloscope probe on PA7 allows verification of the PWM signal before connecting the servo arm.    "
},
{
  "id": "fig-servo-wiring",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-wiring",
  "type": "Figure",
  "number": "13.4.1",
  "title": "",
  "body": " Servo breadboard wiring. Brown wire to GND; red wire to the 5 V power rail (not the Nucleo 3.3 V pin); yellow wire to the TIM14 CH1 PWM pin (PA7). GND of the servo and GND of the Nucleo must share a common reference.   "
},
{
  "id": "fig-servo-power-options",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-power-options",
  "type": "Figure",
  "number": "13.4.2",
  "title": "",
  "body": " Two external power options for the servo. Left: use the 5 V output available on the Nucleo's USB power header (sufficient for light loads and lab demonstrations). Right: use a regulated 5 V line from a wall-wart through the power board (required for stall conditions or when multiple servos are used).    "
},
{
  "id": "fig-servo-power-board",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-power-board",
  "type": "Figure",
  "number": "13.4.3",
  "title": "",
  "body": " Power board wiring for reliable servo operation. The wall-wart supplies regulated 5 V to the power board. The servo red wire connects to the 5 V rail; the servo brown and Nucleo GND connect to the same GND rail. The signal jumper (yellow) runs from PA7 to the servo connector.   "
},
{
  "id": "fig-servo-complete-setup",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-complete-setup",
  "type": "Figure",
  "number": "13.4.4",
  "title": "",
  "body": " Complete lab 7 hardware setup. The breadboard holds the power board, Nucleo, and servo connector. The oscilloscope probe on PA7 allows verification of the PWM signal before connecting the servo arm.   "
},
{
  "id": "sec-servo-lab",
  "level": "1",
  "url": "sec-servo-lab.html",
  "type": "Section",
  "number": "13.5",
  "title": "Lab 7: Servo Sweep",
  "body": " Lab 7: Servo Sweep    Servo Position Sweep   Wire the TowerPro SG92R servo to your breadboard with an appropriate 5 V supply. Then write firmware that:   Calls servo_init() to configure TIM14 CH1 at 50 Hz.  Slowly sweeps the servo from SERVO_MIN to SERVO_MAX and back, updating CCR1 in steps of 10 µs with a 10 ms delay between steps.  Verifies the signal on the AD2 oscilloscope before connecting the servo.  Measures the actual travel angle of your servo arm and compares it to the theoretical ±90°.   Document the minimum and maximum pulse widths that achieve full travel on your specific servo (individual units vary).     "
},
{
  "id": "ex-servo-sweep",
  "level": "2",
  "url": "sec-servo-lab-2.html#ex-servo-sweep",
  "type": "Exercise",
  "number": "13.5.1",
  "title": "Servo Position Sweep.",
  "body": " Servo Position Sweep   Wire the TowerPro SG92R servo to your breadboard with an appropriate 5 V supply. Then write firmware that:   Calls servo_init() to configure TIM14 CH1 at 50 Hz.  Slowly sweeps the servo from SERVO_MIN to SERVO_MAX and back, updating CCR1 in steps of 10 µs with a 10 ms delay between steps.  Verifies the signal on the AD2 oscilloscope before connecting the servo.  Measures the actual travel angle of your servo arm and compares it to the theoretical ±90°.   Document the minimum and maximum pulse widths that achieve full travel on your specific servo (individual units vary).   "
},
{
  "id": "subsec-resistance-sensors",
  "level": "1",
  "url": "subsec-resistance-sensors.html",
  "type": "Subsection",
  "number": "14.1.1",
  "title": "Physical Quantities as Resistance",
  "body": " Physical Quantities as Resistance  Many sensor types work by varying resistance. A thermistor changes resistance with temperature; a strain gauge changes resistance when bent or compressed; a hygristor changes resistance with humidity; and a light-dependent resistor (LDR) changes resistance with illumination. The underlying physics differs, but the electrical interface is identical for all of them: pair the sensor with a fixed resistor in a voltage divider and connect the midpoint to an ADC input. You only need to learn the circuit once.   A family of resistance-based sensors. Thermistors, strain gauges, hygristors, and LDRs all convert a physical quantity into a resistance change. All can be read using the same voltage-divider plus ADC circuit.    "
},
{
  "id": "subsec-resistance-sensors-2",
  "level": "2",
  "url": "subsec-resistance-sensors.html#subsec-resistance-sensors-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "thermistor strain gauge hygristor light-dependent resistor "
},
{
  "id": "fig-resistance-based-sensors",
  "level": "2",
  "url": "subsec-resistance-sensors.html#fig-resistance-based-sensors",
  "type": "Figure",
  "number": "14.1.1",
  "title": "",
  "body": " A family of resistance-based sensors. Thermistors, strain gauges, hygristors, and LDRs all convert a physical quantity into a resistance change. All can be read using the same voltage-divider plus ADC circuit.   "
},
{
  "id": "subsec-ldr-basics",
  "level": "1",
  "url": "subsec-ldr-basics.html",
  "type": "Subsection",
  "number": "14.1.2",
  "title": "Light-Dependent Resistors",
  "body": " Light-Dependent Resistors  The sensor used in this chapter is a cadmium sulfide (CdS) photocell . Its resistance depends on light intensity through the photoconductive effect : photons with enough energy knock electrons into the conduction band of the CdS crystal, increasing conductivity and lowering resistance. Remove the light and the electrons settle back, resistance rises again.  The resistance range is dramatic: several megaohms in complete darkness, falling to a few kilohms under bright light. The response is also nonlinear — resistance drops roughly as a power of illuminance rather than linearly. For the solar tracker in this chapter, that nonlinearity does not matter because we only look at the difference between two photocells; any systematic distortion cancels out.  CdS photocells also vary considerably from unit to unit — two cells of the same part number can differ by a factor of two or more in resistance under identical lighting conditions. This makes them unsuitable for any quantitative light measurement. They are best treated as purely qualitative sensors: good for detecting more light versus less light in one direction compared to another, not for measuring how many lumens are actually present.   A CdS photocell. The meandering conductive pattern on the face maximizes the length of the photoconductive channel in a small package. The device has two leads and no polarity — it behaves like a light-controlled resistor.    "
},
{
  "id": "subsec-ldr-basics-2",
  "level": "2",
  "url": "subsec-ldr-basics.html#subsec-ldr-basics-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "cadmium sulfide (CdS) photocell photoconductive effect "
},
{
  "id": "fig-cds-photo",
  "level": "2",
  "url": "subsec-ldr-basics.html#fig-cds-photo",
  "type": "Figure",
  "number": "14.1.2",
  "title": "",
  "body": " A CdS photocell. The meandering conductive pattern on the face maximizes the length of the photoconductive channel in a small package. The device has two leads and no polarity — it behaves like a light-controlled resistor.   "
},
{
  "id": "subsec-divider-interface",
  "level": "1",
  "url": "subsec-divider-interface.html",
  "type": "Subsection",
  "number": "14.1.3",
  "title": "The Voltage Divider Interface",
  "body": " The Voltage Divider Interface  An ADC measures voltage, not resistance. To read a photocell, place it in series with a fixed resistor between the supply voltage and GND. The voltage at the midpoint — called — is:   where is the photocell and is the fixed resistor. As light increases, decreases, so increases. Swapping the two positions reverses the direction — useful if you need the voltage to go the other way.   Generic voltage-divider interface for any resistance-based sensor. The sensor ( ) and a fixed measurement resistor ( ) form a series circuit from to GND. The midpoint voltage is read by the ADC. Choosing equal to the mid-range resistance of the sensor maximizes sensitivity.    In this chapter you will build a simplified solar tracker — a device that rotates a servo arm to face a light source. Real industrial solar trackers compute the sun's position from the date, time, and GPS coordinates and drive the panel to that angle mathematically — no light sensor required; in the two-photocell approach here you implement a feedback loop: your code reads both sensors, computes the difference, and commands the servo to rotate in whichever direction reduces it. The principle is simple: two photocell voltage dividers are mounted at opposite ends of the servo arm, and their ADC readings are subtracted. When both see equal light the difference is zero and the servo holds still. When the light source shifts to one side, one photocell brightens and the other dims, and the signed difference tells your code which way to rotate the servo.  "
},
{
  "id": "fig-divider-schematic",
  "level": "2",
  "url": "subsec-divider-interface.html#fig-divider-schematic",
  "type": "Figure",
  "number": "14.1.3",
  "title": "",
  "body": " Generic voltage-divider interface for any resistance-based sensor. The sensor ( ) and a fixed measurement resistor ( ) form a series circuit from to GND. The midpoint voltage is read by the ADC. Choosing equal to the mid-range resistance of the sensor maximizes sensitivity.   "
},
{
  "id": "subsec-divider-interface-6",
  "level": "2",
  "url": "subsec-divider-interface.html#subsec-divider-interface-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "solar tracker "
},
{
  "id": "rq-photosensors-concepts",
  "level": "1",
  "url": "rq-photosensors-concepts.html",
  "type": "Check Your Understanding",
  "number": "14.1.4",
  "title": "Check Your Understanding",
  "body": "   A CdS photocell is sitting in a bright room. Someone suddenly covers it with their hand. What happens to the photocell's resistance?     It increases — possibly to several megaohms.  Correct. With no light, no photons are available to excite electrons into the conduction band. The CdS crystal returns to its high-resistance (low conductivity) state.    It decreases toward zero.  Resistance decreases with more light, not less. Covering the photocell removes the photons that were keeping conductivity high, so resistance rises.    It stays the same — resistance is a fixed property of the material.  The whole point of a light-dependent resistor is that its resistance changes with illumination. It is not a fixed resistor.    It briefly increases then returns to its original value.  The resistance change persists as long as the light level stays low. It does not automatically reset to a previous state.       Why can't you connect a photocell directly between the 3.3 V pin and an ADC input pin to read its resistance?     The ADC measures voltage, not resistance. Without a second resistor to GND there is no voltage division — the input just sits at 3.3 V regardless of the photocell's resistance.  Correct. A single resistor connected to a supply with no return path to GND creates no voltage drop across anything the ADC can sense. The fixed resistor to GND completes the divider.    The photocell would be damaged by 3.3 V applied directly.  CdS photocells handle the voltages used in this circuit without damage. The issue is not voltage rating but circuit function — you need a complete divider to get a meaningful voltage.    The STM32 ADC input impedance is too low to sense resistance changes.  STM32 ADC inputs have high impedance, but that is not the core issue. Even with high impedance, a single-resistor connection to a supply produces no useful voltage variation for the ADC to measure.    The photocell requires AC current to operate correctly.  CdS photocells work on DC. The photoconductive effect is driven by light, not by the type of current flowing through the device.       In the solar tracker, both photocell voltage dividers are pointed at a flashlight held exactly between them. Assume both photocells have identical resistance-versus-light characteristics. What ADC code difference does the microcontroller compute?     Zero — both sensors see equal light, so their output voltages are equal and the difference is zero.  Correct. With matching cells and equal illumination, both dividers produce the same voltage and the difference is zero. The servo holds its current position: no error, no correction.    A large positive value, because both sensors are receiving maximum light.  The tracker computes the difference between the two readings, not the sum. Equal readings subtract to zero.    An unpredictable value, because real photocells never match exactly.  Good instinct — as noted in the reading, CdS photocells do vary from unit to unit, which introduces a small residual offset in practice. That is why the question specifies identical characteristics. In a real build, the mismatch shows up as a pointing bias that proportional control alone cannot fully eliminate.    4095, the maximum ADC code, because both sensors are fully illuminated.  4095 would be the code for a single sensor reading 3.3 V. The tracker computes the signed difference between the two channels, which is zero when they are balanced.     "
},
{
  "id": "rq-ldr-resistance-change",
  "level": "2",
  "url": "rq-photosensors-concepts.html#rq-ldr-resistance-change",
  "type": "Reading Question",
  "number": "14.1.4.1",
  "title": "",
  "body": "  A CdS photocell is sitting in a bright room. Someone suddenly covers it with their hand. What happens to the photocell's resistance?     It increases — possibly to several megaohms.  Correct. With no light, no photons are available to excite electrons into the conduction band. The CdS crystal returns to its high-resistance (low conductivity) state.    It decreases toward zero.  Resistance decreases with more light, not less. Covering the photocell removes the photons that were keeping conductivity high, so resistance rises.    It stays the same — resistance is a fixed property of the material.  The whole point of a light-dependent resistor is that its resistance changes with illumination. It is not a fixed resistor.    It briefly increases then returns to its original value.  The resistance change persists as long as the light level stays low. It does not automatically reset to a previous state.    "
},
{
  "id": "rq-why-voltage-divider",
  "level": "2",
  "url": "rq-photosensors-concepts.html#rq-why-voltage-divider",
  "type": "Reading Question",
  "number": "14.1.4.2",
  "title": "",
  "body": "  Why can't you connect a photocell directly between the 3.3 V pin and an ADC input pin to read its resistance?     The ADC measures voltage, not resistance. Without a second resistor to GND there is no voltage division — the input just sits at 3.3 V regardless of the photocell's resistance.  Correct. A single resistor connected to a supply with no return path to GND creates no voltage drop across anything the ADC can sense. The fixed resistor to GND completes the divider.    The photocell would be damaged by 3.3 V applied directly.  CdS photocells handle the voltages used in this circuit without damage. The issue is not voltage rating but circuit function — you need a complete divider to get a meaningful voltage.    The STM32 ADC input impedance is too low to sense resistance changes.  STM32 ADC inputs have high impedance, but that is not the core issue. Even with high impedance, a single-resistor connection to a supply produces no useful voltage variation for the ADC to measure.    The photocell requires AC current to operate correctly.  CdS photocells work on DC. The photoconductive effect is driven by light, not by the type of current flowing through the device.    "
},
{
  "id": "rq-equal-sensors",
  "level": "2",
  "url": "rq-photosensors-concepts.html#rq-equal-sensors",
  "type": "Reading Question",
  "number": "14.1.4.3",
  "title": "",
  "body": "  In the solar tracker, both photocell voltage dividers are pointed at a flashlight held exactly between them. Assume both photocells have identical resistance-versus-light characteristics. What ADC code difference does the microcontroller compute?     Zero — both sensors see equal light, so their output voltages are equal and the difference is zero.  Correct. With matching cells and equal illumination, both dividers produce the same voltage and the difference is zero. The servo holds its current position: no error, no correction.    A large positive value, because both sensors are receiving maximum light.  The tracker computes the difference between the two readings, not the sum. Equal readings subtract to zero.    An unpredictable value, because real photocells never match exactly.  Good instinct — as noted in the reading, CdS photocells do vary from unit to unit, which introduces a small residual offset in practice. That is why the question specifies identical characteristics. In a real build, the mismatch shows up as a pointing bias that proportional control alone cannot fully eliminate.    4095, the maximum ADC code, because both sensors are fully illuminated.  4095 would be the code for a single sensor reading 3.3 V. The tracker computes the signed difference between the two channels, which is zero when they are balanced.    "
},
{
  "id": "sec-photocell-physics",
  "level": "1",
  "url": "sec-photocell-physics.html",
  "type": "Section",
  "number": "14.2",
  "title": "CdS Photocells",
  "body": " CdS Photocells  A cadmium sulfide photocell (also called a light-dependent resistor or LDR) exploits the photoconductive effect: photons with sufficient energy excite electrons from the valence band to the conduction band in the CdS crystal, increasing conductivity. The result is a two-terminal device whose resistance decreases with increasing illumination — from several megaohms in complete darkness to a few kilohms in bright light.   A CdS photocell. The meandering conductor pattern on top maximizes the effective length of the CdS photoconductive channel in a compact package. The device is polarization-independent and responds to the visible spectrum (peak sensitivity near 560 nm, similar to the human eye).     CdS resistance versus illuminance on a log-log scale. The response spans six decades of resistance over five decades of illuminance. The approximate linear relationship on the log-log plot corresponds to a power-law model , with for this type of cell. For a solar tracker, we only need to compare two sensors, so the nonlinearity cancels out.    "
},
{
  "id": "sec-photocell-physics-2",
  "level": "2",
  "url": "sec-photocell-physics.html#sec-photocell-physics-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "cadmium sulfide photocell "
},
{
  "id": "fig-cds-photocell",
  "level": "2",
  "url": "sec-photocell-physics.html#fig-cds-photocell",
  "type": "Figure",
  "number": "14.2.1",
  "title": "",
  "body": " A CdS photocell. The meandering conductor pattern on top maximizes the effective length of the CdS photoconductive channel in a compact package. The device is polarization-independent and responds to the visible spectrum (peak sensitivity near 560 nm, similar to the human eye).   "
},
{
  "id": "fig-photocell-response",
  "level": "2",
  "url": "sec-photocell-physics.html#fig-photocell-response",
  "type": "Figure",
  "number": "14.2.2",
  "title": "",
  "body": " CdS resistance versus illuminance on a log-log scale. The response spans six decades of resistance over five decades of illuminance. The approximate linear relationship on the log-log plot corresponds to a power-law model , with for this type of cell. For a solar tracker, we only need to compare two sensors, so the nonlinearity cancels out.   "
},
{
  "id": "sec-photocell-circuit",
  "level": "1",
  "url": "sec-photocell-circuit.html",
  "type": "Section",
  "number": "14.3",
  "title": "Voltage Divider Circuit",
  "body": " Voltage Divider Circuit  To convert the photocell's resistance change to a voltage that the ADC can read, place the photocell in series with a fixed resistor between 3.3 V and GND. The midpoint voltage is: Choosing places the midpoint in the middle of the ADC range when illuminance is moderate, maximizing sensitivity.   Photocell voltage divider. The CdS photocell is connected between 3.3 V and the ADC input; the fixed 10 kΩ resistor connects from the ADC input to GND. As light increases, photocell resistance decreases, so increases. If you swap the positions the voltage decreases with light.      With the photocell as the top element (between 3.3 V and the ADC pin) and a 10 kΩ resistor as the bottom element (to GND), what happens to the ADC reading when the room lights are turned off?   The ADC reading decreases toward 0 V.  Correct: in darkness the photocell resistance rises to megaohms, making the voltage divider heavily weighted toward GND. The ADC sees a voltage near 0 V, giving a code near 0.  The ADC reading increases toward 3.3 V.  That would happen if the photocell were the bottom element and the fixed resistor the top element. With the photocell on top, high resistance in darkness pulls the midpoint toward GND.  The ADC reading stays the same because the ratio is fixed.  The photocell resistance changes with light — that is the whole point. The ratio is not fixed.     "
},
{
  "id": "fig-photocell-divider",
  "level": "2",
  "url": "sec-photocell-circuit.html#fig-photocell-divider",
  "type": "Figure",
  "number": "14.3.1",
  "title": "",
  "body": " Photocell voltage divider. The CdS photocell is connected between 3.3 V and the ADC input; the fixed 10 kΩ resistor connects from the ADC input to GND. As light increases, photocell resistance decreases, so increases. If you swap the positions the voltage decreases with light.   "
},
{
  "id": "rq-divider-direction",
  "level": "2",
  "url": "rq-photocell.html#rq-divider-direction",
  "type": "Reading Question",
  "number": "14.3.1",
  "title": "",
  "body": " With the photocell as the top element (between 3.3 V and the ADC pin) and a 10 kΩ resistor as the bottom element (to GND), what happens to the ADC reading when the room lights are turned off?   The ADC reading decreases toward 0 V.  Correct: in darkness the photocell resistance rises to megaohms, making the voltage divider heavily weighted toward GND. The ADC sees a voltage near 0 V, giving a code near 0.  The ADC reading increases toward 3.3 V.  That would happen if the photocell were the bottom element and the fixed resistor the top element. With the photocell on top, high resistance in darkness pulls the midpoint toward GND.  The ADC reading stays the same because the ratio is fixed.  The photocell resistance changes with light — that is the whole point. The ratio is not fixed.   "
},
{
  "id": "sec-solar-tracker",
  "level": "1",
  "url": "sec-solar-tracker.html",
  "type": "Section",
  "number": "14.4",
  "title": "Solar Tracker",
  "body": " Solar Tracker  A solar tracker keeps a panel (or in our case, a servo arm) pointed at the brightest light source by comparing readings from two identical photocell dividers aimed in slightly different directions. When the source is directly between them both sensors see equal intensity; any offset produces a signed difference that drives the servo toward the brighter side.   Solar tracker assembly. Two CdS photocells are mounted in small cardboard shielding cups on the servo arm. The cups prevent each sensor from seeing the other's half of the scene, sharpening the directional sensitivity. The servo arm rotates to balance the two readings.     Solar tracker — breadboard layout. The two photocell dividers feed two ADC channels (PA0 and PA1). The servo signal wire connects to PA7 (TIM14 CH1). All three share a common GND with the power board.     Solar tracker — assembled side view. The servo is fixed to a base plate; the photocell arm extends horizontally so each sensor covers its respective hemisphere. Rotating the flashlight around the front of the assembly causes the arm to follow.     Complete solar tracker wiring. Servo power (5 V) from power board; servo signal from PA7; photocell left to PA0 ADC; photocell right to PA1 ADC; all grounds tied together at the breadboard rail.    \/* Proportional solar tracker: two photocells on PA0 and PA1 -> servo on PA7 *\/ #include <stdint.h> #include \"stm32c0xx.h\" \/* Assumes adc_read_channel(ch) and servo_set(pulse_us) already implemented *\/ #define GAIN 5 \/\/ proportional gain: servo steps per ADC-code difference void solar_tracker_update(void) { int32_t left = adc_read_channel(0); \/\/ PA0 (left photocell) int32_t right = adc_read_channel(1); \/\/ PA1 (right photocell) int32_t error = left - right; \/\/ positive = more light on left \/* Map current CCR1 + proportional correction *\/ int32_t pulse = (int32_t)TIM14->CCR1 + GAIN * error; \/* Clamp to valid servo range *\/ if (pulse < SERVO_MIN) pulse = SERVO_MIN; if (pulse > SERVO_MAX) pulse = SERVO_MAX; servo_set((uint16_t)pulse); }   The gain constant GAIN controls the tracker's responsiveness. Too small and the arm barely moves; too large and it oscillates past the target. Proportional control alone will have a steady-state error whenever friction is significant. Adding an integral term (PI control) eliminates the offset but is not required for this lab.     Lab 8: Solar Tracker   Build and demonstrate a one-axis solar tracker that follows a flashlight moved in an arc in front of the assembly.   Wire two photocell voltage dividers to PA0 and PA1 ADC inputs. Verify both return reasonable codes (1000–3000) under room lighting.  Mount the photocells on the servo arm with cardboard shielding cups so each covers roughly one half of the scene.  Implement solar_tracker_update() and call it in the main loop with a 20 ms delay.  Adjust the gain until the arm follows the flashlight smoothly without excessive oscillation.  Measure and record the steady-state error angle when the flashlight is held 10 cm to the left of center.      "
},
{
  "id": "fig-solar-tracker-mechanical",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-mechanical",
  "type": "Figure",
  "number": "14.4.1",
  "title": "",
  "body": " Solar tracker assembly. Two CdS photocells are mounted in small cardboard shielding cups on the servo arm. The cups prevent each sensor from seeing the other's half of the scene, sharpening the directional sensitivity. The servo arm rotates to balance the two readings.   "
},
{
  "id": "fig-solar-tracker-full1",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-full1",
  "type": "Figure",
  "number": "14.4.2",
  "title": "",
  "body": " Solar tracker — breadboard layout. The two photocell dividers feed two ADC channels (PA0 and PA1). The servo signal wire connects to PA7 (TIM14 CH1). All three share a common GND with the power board.   "
},
{
  "id": "fig-solar-tracker-full2",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-full2",
  "type": "Figure",
  "number": "14.4.3",
  "title": "",
  "body": " Solar tracker — assembled side view. The servo is fixed to a base plate; the photocell arm extends horizontally so each sensor covers its respective hemisphere. Rotating the flashlight around the front of the assembly causes the arm to follow.   "
},
{
  "id": "fig-solar-tracker-complete",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-complete",
  "type": "Figure",
  "number": "14.4.4",
  "title": "",
  "body": " Complete solar tracker wiring. Servo power (5 V) from power board; servo signal from PA7; photocell left to PA0 ADC; photocell right to PA1 ADC; all grounds tied together at the breadboard rail.   "
},
{
  "id": "sec-solar-tracker-8",
  "level": "2",
  "url": "sec-solar-tracker.html#sec-solar-tracker-8",
  "type": "Insight",
  "number": "14.4.5",
  "title": "",
  "body": " The gain constant GAIN controls the tracker's responsiveness. Too small and the arm barely moves; too large and it oscillates past the target. Proportional control alone will have a steady-state error whenever friction is significant. Adding an integral term (PI control) eliminates the offset but is not required for this lab.  "
},
{
  "id": "ex-tracker-build",
  "level": "2",
  "url": "sec-solar-tracker-9.html#ex-tracker-build",
  "type": "Exercise",
  "number": "14.4.1",
  "title": "Lab 8: Solar Tracker.",
  "body": " Lab 8: Solar Tracker   Build and demonstrate a one-axis solar tracker that follows a flashlight moved in an arc in front of the assembly.   Wire two photocell voltage dividers to PA0 and PA1 ADC inputs. Verify both return reasonable codes (1000–3000) under room lighting.  Mount the photocells on the servo arm with cardboard shielding cups so each covers roughly one half of the scene.  Implement solar_tracker_update() and call it in the main loop with a 20 ms delay.  Adjust the gain until the arm follows the flashlight smoothly without excessive oscillation.  Measure and record the steady-state error angle when the flashlight is held 10 cm to the left of center.    "
},
{
  "id": "subsec-ble-what-it-is",
  "level": "1",
  "url": "subsec-ble-what-it-is.html",
  "type": "Subsection",
  "number": "15.1.1",
  "title": "What BLE Is — and What It Is Not",
  "body": " What BLE Is — and What It Is Not  You have almost certainly used BLE without realizing it. Fitness trackers, smartwatches, wireless keyboards, glucose monitors, AirTag location beacons, and heart-rate chest straps all communicate with your phone using BLE. What these devices have in common is that they run on a coin cell or small battery for months or years, and they send small amounts of data — a step count, a heart rate reading, a button press — at relatively infrequent intervals. BLE is optimized for exactly this pattern.   Two wireless devices, two different protocols. Left: wireless headphones use classic Bluetooth, which provides the continuous high-bandwidth audio stream needed for music. Right: a heart-rate monitor armband uses BLE, sending a brief reading every second or so from a coin-cell battery that lasts months. Same radio band, very different design goals.       BLE is not the same as classic Bluetooth. Classic Bluetooth was designed for continuous high-bandwidth streams — audio to headphones, file transfers. BLE trades bandwidth for dramatically lower power consumption. A BLE device can sleep between transmissions, waking only long enough to send a few bytes, then returning to sleep. The two standards share a name and operate on the same 2.4 GHz radio band, but they are otherwise incompatible protocols serving different purposes.  BLE also has a short range — typically around 10 meters indoors — and is not suited for streaming video or audio. Think of it as a wireless replacement for a short serial cable: occasional, low-volume, low-power.  "
},
{
  "id": "fig-ble-applications",
  "level": "2",
  "url": "subsec-ble-what-it-is.html#fig-ble-applications",
  "type": "Figure",
  "number": "15.1.1",
  "title": "",
  "body": " Two wireless devices, two different protocols. Left: wireless headphones use classic Bluetooth, which provides the continuous high-bandwidth audio stream needed for music. Right: a heart-rate monitor armband uses BLE, sending a brief reading every second or so from a coin-cell battery that lasts months. Same radio band, very different design goals.      "
},
{
  "id": "subsec-ble-discovery",
  "level": "1",
  "url": "subsec-ble-discovery.html",
  "type": "Subsection",
  "number": "15.1.2",
  "title": "How BLE Devices Find Each Other: GAP",
  "body": " How BLE Devices Find Each Other: GAP  Before two BLE devices can exchange data, they must find each other. The Generic Access Profile (GAP) defines the rules for this discovery phase. It assigns every device one of two roles:  A peripheral is a device that wants to be found. It repeatedly broadcasts short radio packets called advertising packets that announce its presence — essentially shouting \"I'm here, my name is Bluefruit!\" into the surrounding airspace about ten times per second. The peripheral is typically the small, battery-powered device: the fitness tracker, the sensor node, or in our lab, the Bluefruit module attached to the STM32.  A central is a device that initiates connections. It listens for advertising packets, picks one, and sends a connection request. The central is typically a phone or laptop — a device with more processing power and a larger battery. In our lab the central is your phone running the Bluefruit Connect app.   A central device (smartphone) surrounded by BLE peripherals — smart lock, bulb, thermometer, fan, wall switch, and door handle. Each peripheral advertises independently; the central scans and manages connections to whichever ones it chooses.    Once the central connects, the peripheral stops advertising — it no longer needs to announce itself because it already has a connection. At this point GAP's job is done, and a different protocol layer takes over to handle the actual data exchange.  "
},
{
  "id": "subsec-ble-discovery-2",
  "level": "2",
  "url": "subsec-ble-discovery.html#subsec-ble-discovery-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Generic Access Profile "
},
{
  "id": "subsec-ble-discovery-3",
  "level": "2",
  "url": "subsec-ble-discovery.html#subsec-ble-discovery-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "peripheral advertising packets "
},
{
  "id": "subsec-ble-discovery-4",
  "level": "2",
  "url": "subsec-ble-discovery.html#subsec-ble-discovery-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "central "
},
{
  "id": "fig-ble-central-role",
  "level": "2",
  "url": "subsec-ble-discovery.html#fig-ble-central-role",
  "type": "Figure",
  "number": "15.1.2",
  "title": "",
  "body": " A central device (smartphone) surrounded by BLE peripherals — smart lock, bulb, thermometer, fan, wall switch, and door handle. Each peripheral advertises independently; the central scans and manages connections to whichever ones it chooses.   "
},
{
  "id": "subsec-ble-gatt",
  "level": "1",
  "url": "subsec-ble-gatt.html",
  "type": "Subsection",
  "number": "15.1.3",
  "title": "How Connected Devices Exchange Data: GATT",
  "body": " How Connected Devices Exchange Data: GATT  After a connection is established, the Generic Attribute Profile (GATT) defines how the two devices structure and exchange data. GATT organizes data in a simple hierarchy:  A service is a collection of related data. For example, there is a standard \"Heart Rate\" service, a \"Battery\" service, and — relevant to this chapter — a \"UART\" service on the Bluefruit module. Each service is identified by a unique number called a UUID.  Within each service, individual data values are called characteristics . A characteristic is a single, typed, addressable value — like a variable with permissions attached. The central can read a characteristic to get its current value, write to it to send data to the peripheral, or subscribe to notifications so the peripheral automatically sends an update whenever the value changes. For example, the Bluefruit's UART service has two characteristics: one the phone writes to in order to send bytes to the STM32 (RX), and one that notifies the phone whenever the STM32 sends bytes back (TX).   The GATT attribute hierarchy. The outermost box is the peripheral's GATT server — the structured data store it exposes to any connected central. Inside it are services (named groups of related data), and inside each service are characteristics (individual typed values). The left service is the UART bridge used in this chapter: the RX characteristic carries bytes from the phone to the STM32 (Write permission), and the TX characteristic carries bytes the other way (Notify permission). The grayed Battery service on the right illustrates that a peripheral can host multiple services simultaneously.    The net effect is a bidirectional byte stream — just like a serial port, but over the air. You send a string from the STM32 over UART, the Bluefruit forwards it as a GATT notification, and it appears in the phone app. You type a command in the phone app, the Bluefruit writes it to a characteristic, and your STM32 receives it over UART.  "
},
{
  "id": "subsec-ble-gatt-2",
  "level": "2",
  "url": "subsec-ble-gatt.html#subsec-ble-gatt-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Generic Attribute Profile "
},
{
  "id": "subsec-ble-gatt-3",
  "level": "2",
  "url": "subsec-ble-gatt.html#subsec-ble-gatt-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "service "
},
{
  "id": "subsec-ble-gatt-4",
  "level": "2",
  "url": "subsec-ble-gatt.html#subsec-ble-gatt-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "characteristics "
},
{
  "id": "fig-ble-gatt-overview",
  "level": "2",
  "url": "subsec-ble-gatt.html#fig-ble-gatt-overview",
  "type": "Figure",
  "number": "15.1.3",
  "title": "",
  "body": " The GATT attribute hierarchy. The outermost box is the peripheral's GATT server — the structured data store it exposes to any connected central. Inside it are services (named groups of related data), and inside each service are characteristics (individual typed values). The left service is the UART bridge used in this chapter: the RX characteristic carries bytes from the phone to the STM32 (Write permission), and the TX characteristic carries bytes the other way (Notify permission). The grayed Battery service on the right illustrates that a peripheral can host multiple services simultaneously.   "
},
{
  "id": "subsec-ble-module",
  "level": "1",
  "url": "subsec-ble-module.html",
  "type": "Subsection",
  "number": "15.1.4",
  "title": "Why We Use a Module: The Bluefruit as a UART Bridge",
  "body": " Why We Use a Module: The Bluefruit as a UART Bridge  A complete BLE implementation involves multiple protocol layers — the physical radio, the link layer, logical link control, the attribute protocol, GATT, GAP, and a security manager — running as a real-time firmware stack on a radio-equipped processor. Writing this from scratch takes months and requires specialist expertise. Even using a library it is a substantial undertaking.  The Adafruit Bluefruit LE UART Friend solves this by putting the entire BLE stack on a separate chip. The module contains a Nordic Semiconductor nRF51822 — a dedicated BLE processor — running Adafruit's firmware. It handles advertising, connecting, GAP, GATT, encryption, and retransmission completely on its own. The interface it presents to the STM32 is simply a UART connection at 9600 baud: bytes in, bytes out. From the STM32's perspective the Bluefruit looks identical to the CoolTerm serial connection from Chapter 3 — the only difference is that the wire has been replaced by a radio link.   The Adafruit Bluefruit LE UART Friend module. The silver rectangle on the blue PCB is the nRF51822 BLE SoC and its antenna. The row of pins along the right edge provides the UART interface (RXI, TXO), power (VIN, GND), and a MODE pin that selects between data pass-through and AT command configuration mode.    This pattern — a dedicated module that hides a complex protocol behind a simple serial interface — appears frequently in embedded systems. Wi-Fi modules, cellular modems, and GPS receivers all work the same way. Learning to use the Bluefruit module teaches you how to work with the whole family.  "
},
{
  "id": "subsec-ble-module-3",
  "level": "2",
  "url": "subsec-ble-module.html#subsec-ble-module-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Adafruit Bluefruit LE UART Friend "
},
{
  "id": "fig-bluefruit-photo",
  "level": "2",
  "url": "subsec-ble-module.html#fig-bluefruit-photo",
  "type": "Figure",
  "number": "15.1.4",
  "title": "",
  "body": " The Adafruit Bluefruit LE UART Friend module. The silver rectangle on the blue PCB is the nRF51822 BLE SoC and its antenna. The row of pins along the right edge provides the UART interface (RXI, TXO), power (VIN, GND), and a MODE pin that selects between data pass-through and AT command configuration mode.   "
},
{
  "id": "rq-ble-concepts",
  "level": "1",
  "url": "rq-ble-concepts.html",
  "type": "Check Your Understanding",
  "number": "15.1.5",
  "title": "Check Your Understanding",
  "body": "   In a BLE connection between your phone and the Bluefruit module, which device advertises its presence and waits to be connected to?     The Bluefruit module — it is the peripheral.  Correct. The peripheral advertises; the central (your phone) scans for advertising packets and initiates the connection. Once connected, the Bluefruit stops advertising.    The phone — it broadcasts its identity so the Bluefruit can find it.  The phone is the central: it scans and initiates. The Bluefruit is the peripheral: it advertises and waits. Advertising always originates from the peripheral.    Both devices advertise simultaneously until one detects the other.  Only the peripheral advertises. The central is silent during the discovery phase — it listens for advertising packets rather than sending any.    Neither — BLE connections are established by a separate pairing server.  There is no third-party server involved. GAP defines the peripheral\/central roles so that two devices can discover and connect to each other directly.       The Bluefruit module's UART service has a TX characteristic. What does \"TX\" represent in this context, and who sends notifications on it?     TX carries bytes from the STM32 to the phone. The Bluefruit (peripheral) sends a notification on the TX characteristic whenever the STM32 writes a byte to the module over UART.  Correct. The naming is from the module's perspective: TX means the module is transmitting to the phone. The STM32 sends bytes to the module's UART input; the module forwards them as GATT notifications on the TX characteristic.    TX carries bytes from the phone to the STM32. The phone writes to TX to send commands.  The characteristic that carries phone-to-module data is the RX characteristic (the module receives it). TX is for module-to-phone data — the module transmits it.    TX is the service UUID that identifies the UART service to nearby scanning devices.  The UUID identifies the service, not the TX characteristic. TX is a specific characteristic within the UART service, carrying data in one direction.    TX is the advertising packet the Bluefruit broadcasts before a connection is made.  Advertising packets are part of GAP, not GATT. The TX characteristic only exists after a connection is established and GATT communication begins.       Why do we use the Adafruit Bluefruit module rather than adding a BLE radio directly to the STM32 and writing our own BLE stack?     A complete BLE stack is extremely complex — multiple protocol layers including the radio, link layer, GATT, GAP, and security — and would take months to implement correctly. The module handles all of it, presenting a simple UART interface.  Correct. This is the standard industry approach: use a certified module for the complex radio protocol and focus application code on what your product actually needs to do. The same pattern applies to Wi-Fi modules, cellular modems, and GPS receivers.    The STM32C031C6 does not have enough flash memory to store BLE firmware.  Memory is one constraint, but the more fundamental issue is the complexity of writing a correct, standards-compliant BLE stack. Even with enough memory, implementing the protocol from scratch is a major engineering project.    BLE requires a 5 V power supply that the STM32 cannot provide.  BLE radios typically operate at 1.8–3.3 V, well within what the STM32 can provide. Power supply voltage is not the reason for using a module.    The module encrypts data automatically, whereas the STM32 has no encryption hardware.  Encryption is one feature the module handles, but it is not the primary reason. The STM32 actually does have hardware cryptographic accelerators. The decisive reason is the overall complexity of the BLE protocol stack.     "
},
{
  "id": "rq-ble-peripheral-role",
  "level": "2",
  "url": "rq-ble-concepts.html#rq-ble-peripheral-role",
  "type": "Reading Question",
  "number": "15.1.5.1",
  "title": "",
  "body": "  In a BLE connection between your phone and the Bluefruit module, which device advertises its presence and waits to be connected to?     The Bluefruit module — it is the peripheral.  Correct. The peripheral advertises; the central (your phone) scans for advertising packets and initiates the connection. Once connected, the Bluefruit stops advertising.    The phone — it broadcasts its identity so the Bluefruit can find it.  The phone is the central: it scans and initiates. The Bluefruit is the peripheral: it advertises and waits. Advertising always originates from the peripheral.    Both devices advertise simultaneously until one detects the other.  Only the peripheral advertises. The central is silent during the discovery phase — it listens for advertising packets rather than sending any.    Neither — BLE connections are established by a separate pairing server.  There is no third-party server involved. GAP defines the peripheral\/central roles so that two devices can discover and connect to each other directly.    "
},
{
  "id": "rq-ble-characteristic",
  "level": "2",
  "url": "rq-ble-concepts.html#rq-ble-characteristic",
  "type": "Reading Question",
  "number": "15.1.5.2",
  "title": "",
  "body": "  The Bluefruit module's UART service has a TX characteristic. What does \"TX\" represent in this context, and who sends notifications on it?     TX carries bytes from the STM32 to the phone. The Bluefruit (peripheral) sends a notification on the TX characteristic whenever the STM32 writes a byte to the module over UART.  Correct. The naming is from the module's perspective: TX means the module is transmitting to the phone. The STM32 sends bytes to the module's UART input; the module forwards them as GATT notifications on the TX characteristic.    TX carries bytes from the phone to the STM32. The phone writes to TX to send commands.  The characteristic that carries phone-to-module data is the RX characteristic (the module receives it). TX is for module-to-phone data — the module transmits it.    TX is the service UUID that identifies the UART service to nearby scanning devices.  The UUID identifies the service, not the TX characteristic. TX is a specific characteristic within the UART service, carrying data in one direction.    TX is the advertising packet the Bluefruit broadcasts before a connection is made.  Advertising packets are part of GAP, not GATT. The TX characteristic only exists after a connection is established and GATT communication begins.    "
},
{
  "id": "rq-ble-why-module",
  "level": "2",
  "url": "rq-ble-concepts.html#rq-ble-why-module",
  "type": "Reading Question",
  "number": "15.1.5.3",
  "title": "",
  "body": "  Why do we use the Adafruit Bluefruit module rather than adding a BLE radio directly to the STM32 and writing our own BLE stack?     A complete BLE stack is extremely complex — multiple protocol layers including the radio, link layer, GATT, GAP, and security — and would take months to implement correctly. The module handles all of it, presenting a simple UART interface.  Correct. This is the standard industry approach: use a certified module for the complex radio protocol and focus application code on what your product actually needs to do. The same pattern applies to Wi-Fi modules, cellular modems, and GPS receivers.    The STM32C031C6 does not have enough flash memory to store BLE firmware.  Memory is one constraint, but the more fundamental issue is the complexity of writing a correct, standards-compliant BLE stack. Even with enough memory, implementing the protocol from scratch is a major engineering project.    BLE requires a 5 V power supply that the STM32 cannot provide.  BLE radios typically operate at 1.8–3.3 V, well within what the STM32 can provide. Power supply voltage is not the reason for using a module.    The module encrypts data automatically, whereas the STM32 has no encryption hardware.  Encryption is one feature the module handles, but it is not the primary reason. The STM32 actually does have hardware cryptographic accelerators. The decisive reason is the overall complexity of the BLE protocol stack.    "
},
{
  "id": "sec-ble-protocol",
  "level": "1",
  "url": "sec-ble-protocol.html",
  "type": "Section",
  "number": "15.2",
  "title": "BLE Protocol Overview",
  "body": " BLE Protocol Overview  BLE operates in the 2.4 GHz ISM band with a maximum range of roughly 10 m in typical indoor environments. The protocol defines two high-level layers that firmware authors encounter: the Generic Access Profile (GAP) and the Generic Attribute Profile (GATT).   GAP governs how devices discover each other. A peripheral broadcasts advertising packets announcing its presence; a central (typically a phone or laptop) scans for those packets and initiates a connection. Once connected, GAP advertising stops and GATT takes over.   GATT defines how connected devices exchange structured data. The peripheral hosts a GATT server containing one or more services , each comprising one or more characteristics . A characteristic is a typed, addressable data value — the central reads or writes it, or subscribes to notifications when it changes. For example, the Bluefruit module exposes a \"UART\" service with TX and RX characteristics that bridge BLE to a serial byte stream.   BLE connection lifecycle. Before connection, the peripheral advertises and the central scans. After the central connects, advertising stops and bidirectional GATT communication begins. The connection can be torn down by either side at any time.     Central and peripheral roles. The phone (central) scans for and connects to the Bluefruit module (peripheral). Once connected, the phone reads sensor data (characteristic reads\/notifications) and sends commands (characteristic writes) to the module, which forwards them over UART to the STM32.     BLE advertising and GATT characteristics. In advertise mode the Bluefruit broadcasts its name. After connection, the GATT server exposes the UART service (UUID 6E400001-...) with an RX characteristic (phone-to-module writes) and a TX characteristic (module-to-phone notifications). Firmware talks to this via plain USART.      In a BLE connection between a smartphone and the Bluefruit module, which device is the central and which is the peripheral?   The smartphone is the central (it initiates the connection by scanning); the Bluefruit module is the peripheral (it advertises).  Correct. The central always initiates; the peripheral always advertises and waits.  The Bluefruit module is the central; the smartphone is the peripheral.  It is the opposite. The Bluefruit module advertises its presence and waits to be connected to — that is the peripheral role.  Both devices can be central or peripheral simultaneously in a single connection.  A single BLE connection has exactly one central and one peripheral. Multi-role is possible across different connections, but not within one.     "
},
{
  "id": "sec-ble-protocol-3",
  "level": "2",
  "url": "sec-ble-protocol.html#sec-ble-protocol-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "GAP peripheral central "
},
{
  "id": "sec-ble-protocol-4",
  "level": "2",
  "url": "sec-ble-protocol.html#sec-ble-protocol-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "GATT GATT server services characteristics "
},
{
  "id": "fig-ble-modes",
  "level": "2",
  "url": "sec-ble-protocol.html#fig-ble-modes",
  "type": "Figure",
  "number": "15.2.1",
  "title": "",
  "body": " BLE connection lifecycle. Before connection, the peripheral advertises and the central scans. After the central connects, advertising stops and bidirectional GATT communication begins. The connection can be torn down by either side at any time.   "
},
{
  "id": "fig-ble-central-peripheral",
  "level": "2",
  "url": "sec-ble-protocol.html#fig-ble-central-peripheral",
  "type": "Figure",
  "number": "15.2.2",
  "title": "",
  "body": " Central and peripheral roles. The phone (central) scans for and connects to the Bluefruit module (peripheral). Once connected, the phone reads sensor data (characteristic reads\/notifications) and sends commands (characteristic writes) to the module, which forwards them over UART to the STM32.   "
},
{
  "id": "fig-ble-characteristics",
  "level": "2",
  "url": "sec-ble-protocol.html#fig-ble-characteristics",
  "type": "Figure",
  "number": "15.2.3",
  "title": "",
  "body": " BLE advertising and GATT characteristics. In advertise mode the Bluefruit broadcasts its name. After connection, the GATT server exposes the UART service (UUID 6E400001-...) with an RX characteristic (phone-to-module writes) and a TX characteristic (module-to-phone notifications). Firmware talks to this via plain USART.   "
},
{
  "id": "rq-ble-central",
  "level": "2",
  "url": "rq-ble-roles.html#rq-ble-central",
  "type": "Reading Question",
  "number": "15.2.1",
  "title": "",
  "body": " In a BLE connection between a smartphone and the Bluefruit module, which device is the central and which is the peripheral?   The smartphone is the central (it initiates the connection by scanning); the Bluefruit module is the peripheral (it advertises).  Correct. The central always initiates; the peripheral always advertises and waits.  The Bluefruit module is the central; the smartphone is the peripheral.  It is the opposite. The Bluefruit module advertises its presence and waits to be connected to — that is the peripheral role.  Both devices can be central or peripheral simultaneously in a single connection.  A single BLE connection has exactly one central and one peripheral. Multi-role is possible across different connections, but not within one.   "
},
{
  "id": "sec-bluefruit-module",
  "level": "1",
  "url": "sec-bluefruit-module.html",
  "type": "Section",
  "number": "15.3",
  "title": "Adafruit Bluefruit LE UART Friend",
  "body": " Adafruit Bluefruit LE UART Friend  The Adafruit Bluefruit LE UART Friend module contains a Nordic Semiconductor nRF51822 BLE SoC running Adafruit's firmware. It exposes a full BLE UART bridge: anything written to the module's RXI pin over UART appears as a BLE characteristic write to the connected central; anything the central writes appears on the module's TXO pin. From the STM32's perspective the module looks identical to the CoolTerm serial port used in Chapter 3, except that the wire is replaced by a radio link.   Adafruit Bluefruit LE UART Friend. Key pins: VIN (3.3–16 V, decoupled from 3.3 V), GND, RXI (module receive, connect to STM32 TX), TXO (module transmit, connect to STM32 RX), and MODE (leave LOW for UART data mode; pull HIGH for AT command mode). The module defaults to 9600 baud, matching our USART configuration.     Bluefruit wiring to the Nucleo. VIN to 3.3 V; GND to GND; RXI to PA9 (USART1 TX, AF1); TXO to PA10 (USART1 RX, AF1). Leave the MODE pin LOW (or floating with its internal pull-down) to stay in data pass-through mode.    "
},
{
  "id": "fig-bluefruit-module",
  "level": "2",
  "url": "sec-bluefruit-module.html#fig-bluefruit-module",
  "type": "Figure",
  "number": "15.3.1",
  "title": "",
  "body": " Adafruit Bluefruit LE UART Friend. Key pins: VIN (3.3–16 V, decoupled from 3.3 V), GND, RXI (module receive, connect to STM32 TX), TXO (module transmit, connect to STM32 RX), and MODE (leave LOW for UART data mode; pull HIGH for AT command mode). The module defaults to 9600 baud, matching our USART configuration.   "
},
{
  "id": "fig-bluefruit-wiring",
  "level": "2",
  "url": "sec-bluefruit-module.html#fig-bluefruit-wiring",
  "type": "Figure",
  "number": "15.3.2",
  "title": "",
  "body": " Bluefruit wiring to the Nucleo. VIN to 3.3 V; GND to GND; RXI to PA9 (USART1 TX, AF1); TXO to PA10 (USART1 RX, AF1). Leave the MODE pin LOW (or floating with its internal pull-down) to stay in data pass-through mode.   "
},
{
  "id": "sec-usart1-config",
  "level": "1",
  "url": "sec-usart1-config.html",
  "type": "Section",
  "number": "15.4",
  "title": "Configuring USART1 for the Bluefruit",
  "body": " Configuring USART1 for the Bluefruit  The STM32C031C6 has two USARTs. USART2 was used in Chapter 3 for printf via the ST-Link virtual COM port. For BLE we use USART1 on a separate set of pins (PA9\/PA10, AF1) so that debug printing and BLE communication can operate simultaneously. The baud rate is 9600 to match the Bluefruit's factory default.  \/* USART1 on PA9 (TX, AF1) and PA10 (RX, AF1) at 9600 baud, 12 MHz SYSCLK *\/ #define APB_CLK 12000000U #define BLE_BAUD 9600U void usart1_ble_init(void) { RCC->IOPENR |= RCC_IOPENR_GPIOAEN; RCC->APBENR2 |= RCC_APBENR2_USART1EN; \/* PA9 = TX (AF1) *\/ GPIOA->MODER &= ~(3U << 18); GPIOA->MODER |= (2U << 18); GPIOA->AFR[1] &= ~(0xFU << 4); GPIOA->AFR[1] |= (1U << 4); \/* PA10 = RX (AF1) *\/ GPIOA->MODER &= ~(3U << 20); GPIOA->MODER |= (2U << 20); GPIOA->AFR[1] &= ~(0xFU << 8); GPIOA->AFR[1] |= (1U << 8); USART1->BRR = APB_CLK \/ BLE_BAUD; \/\/ 1250 for 9600 baud USART1->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE; } void usart1_send_char(char c) { while (!(USART1->ISR & USART_ISR_TXE)); USART1->TDR = (uint8_t)c; } void usart1_send_string(const char *s) { while (*s) usart1_send_char(*s++); } char usart1_recv_char(void) { while (!(USART1->ISR & USART_ISR_RXNE)); return (char)USART1->RDR; }  The Bluefruit module has two operational modes selectable by the MODE pin and by sending the string +++ . In data mode (MODE LOW) every byte written to USART1 is forwarded over BLE to the connected central. In AT command mode the module interprets bytes as configuration commands (e.g., AT+BLEUARTTX=hello\\r\\n ). For most lab purposes, data mode is sufficient: the Bluefruit Connect app (iOS\/Android) presents a UART console that displays everything the module receives and allows the user to send strings back.   Design notes for the BLE lab, showing the software architecture: USART1 driver → Bluefruit module → BLE radio → phone app. The same layered driver pattern from I2C and UART applies here.      Why is USART1 used for the Bluefruit rather than reusing USART2?   USART2 is already connected to the ST-Link virtual COM port for printf debug output. Using USART1 on separate pins lets both debug printing and BLE run at the same time.  Correct. The STM32C031C6 has two USARTs; assigning each a dedicated purpose avoids multiplexing the single data channel.  USART1 supports higher baud rates than USART2.  Both USARTs support the same baud rates on this device. The reason is functional separation, not hardware capability.  The Bluefruit module requires USART1 specifically.  The Bluefruit module just needs any UART; the choice of USART1 is a software design decision to keep BLE separate from debug output.     "
},
{
  "id": "sec-usart1-config-4",
  "level": "2",
  "url": "sec-usart1-config.html#sec-usart1-config-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "data mode AT command mode "
},
{
  "id": "fig-ble-design-notes",
  "level": "2",
  "url": "sec-usart1-config.html#fig-ble-design-notes",
  "type": "Figure",
  "number": "15.4.1",
  "title": "",
  "body": " Design notes for the BLE lab, showing the software architecture: USART1 driver → Bluefruit module → BLE radio → phone app. The same layered driver pattern from I2C and UART applies here.   "
},
{
  "id": "rq-ble-brr",
  "level": "2",
  "url": "rq-ble-usart.html#rq-ble-brr",
  "type": "Reading Question",
  "number": "15.4.1",
  "title": "",
  "body": " Why is USART1 used for the Bluefruit rather than reusing USART2?   USART2 is already connected to the ST-Link virtual COM port for printf debug output. Using USART1 on separate pins lets both debug printing and BLE run at the same time.  Correct. The STM32C031C6 has two USARTs; assigning each a dedicated purpose avoids multiplexing the single data channel.  USART1 supports higher baud rates than USART2.  Both USARTs support the same baud rates on this device. The reason is functional separation, not hardware capability.  The Bluefruit module requires USART1 specifically.  The Bluefruit module just needs any UART; the choice of USART1 is a software design decision to keep BLE separate from debug output.   "
},
{
  "id": "sec-ble-lab",
  "level": "1",
  "url": "sec-ble-lab.html",
  "type": "Section",
  "number": "15.5",
  "title": "Lab: Wireless Sensor Readout",
  "body": " Lab: Wireless Sensor Readout    BLE Sensor Bridge   Connect the Bluefruit LE UART Friend to USART1 and stream live sensor data to the Bluefruit Connect app on your phone.   Wire the Bluefruit module (VIN, GND, RXI → PA9, TXO → PA10).  Call usart1_ble_init() and servo_init() or adc_read() as appropriate for your sensor.  In the main loop, read the sensor, format a string with sprintf , and call usart1_send_string to transmit it. Send one reading every 200 ms.  Open Bluefruit Connect on your phone, connect to the module, and open the UART console to see the live data stream.  Send a single character from the phone ( '1' to start, '0' to stop) and implement a simple command parser using usart1_recv_char in an interrupt handler.      "
},
{
  "id": "ex-ble-sensor",
  "level": "2",
  "url": "sec-ble-lab-2.html#ex-ble-sensor",
  "type": "Exercise",
  "number": "15.5.1",
  "title": "BLE Sensor Bridge.",
  "body": " BLE Sensor Bridge   Connect the Bluefruit LE UART Friend to USART1 and stream live sensor data to the Bluefruit Connect app on your phone.   Wire the Bluefruit module (VIN, GND, RXI → PA9, TXO → PA10).  Call usart1_ble_init() and servo_init() or adc_read() as appropriate for your sensor.  In the main loop, read the sensor, format a string with sprintf , and call usart1_send_string to transmit it. Send one reading every 200 ms.  Open Bluefruit Connect on your phone, connect to the module, and open the UART console to see the live data stream.  Send a single character from the phone ( '1' to start, '0' to stop) and implement a simple command parser using usart1_recv_char in an interrupt handler.    "
},
{
  "id": "subsec-power-why-it-matters",
  "level": "1",
  "url": "subsec-power-why-it-matters.html",
  "type": "Subsection",
  "number": "16.1.1",
  "title": "The Energy Budget Problem",
  "body": " The Energy Budget Problem  The fundamental insight is that most embedded systems spend the vast majority of their time waiting . A heart-rate monitor that samples once per second is actually computing for a few milliseconds out of every thousand. A door sensor that detects a single opening per hour is idle for over 99.9% of its life. If the chip runs at full speed through all of that waiting, every milliamp of idle current subtracts directly from battery life.  The solution is not a faster processor or a larger battery — it is to consume as little current as possible during idle periods. Power management is the engineering discipline of matching the chip's activity level to the work it actually needs to do at each moment. A well-designed firmware can reduce average current from several milliamps (full-speed operation) to a few microamps (deep sleep), extending battery life by orders of magnitude.  "
},
{
  "id": "subsec-power-sleep-concept",
  "level": "1",
  "url": "subsec-power-sleep-concept.html",
  "type": "Subsection",
  "number": "16.1.2",
  "title": "Saving Power by Stopping Clocks",
  "body": " Saving Power by Stopping Clocks  A digital circuit consumes power whenever its transistors switch state — that is, whenever logic values change. What drives those transitions is the clock: every clock edge causes flip-flops throughout the chip to sample their inputs and update their outputs, burning a small pulse of current. Stop the clock and the transitions stop. Stop the transitions and the current drops to a tiny leakage level, typically thousands of times smaller than the active current.  The STM32 (and most modern microcontrollers) exploit this by letting firmware gate individual clocks under software control. You have already seen a limited version: enabling a peripheral clock with RCC->IOPENR |= ... before using it. The same mechanism works in reverse — disable the clock for a peripheral you are not using, and it stops consuming power. The low-power modes carry this idea further by gating the CPU's own clock.   The STM32C0 low-power mode spectrum. Each row is a mode; the arrows show relative current consumption (shorter arrow = less power). Moving down reduces current dramatically — from 58 µA\/MHz in Run mode to 19 nA in Shutdown — but increases wakeup time and reduces which peripherals remain available. Sleep mode (CPU clock gated, peripherals active) gives a good tradeoff for interrupt-driven designs. Stop mode (most clocks halted) is used when the longest possible idle periods justify the longer wakeup latency.    The key tradeoff is wakeup latency . Gating only the CPU clock (Sleep mode) costs almost nothing to undo — an interrupt arrives, the CPU clock restarts within a few cycles, and the ISR runs. Halting the high-speed oscillator and the PLL (Stop mode) saves more power, but the clocks take several microseconds to stabilize when a wakeup event occurs, and peripherals that were running under those clocks must be reconfigured. Choosing the right mode means matching the depth of sleep to how quickly the system must respond.  For the lab in this chapter you will use Sleep mode via the WFI (Wait For Interrupt) instruction: the CPU halts until an interrupt fires, the ISR runs, and then the CPU immediately sleeps again. This pattern — initialize, enable interrupts, loop on WFI — is the standard structure of interrupt-driven, battery-conscious firmware.  "
},
{
  "id": "fig-power-mode-spectrum",
  "level": "2",
  "url": "subsec-power-sleep-concept.html#fig-power-mode-spectrum",
  "type": "Figure",
  "number": "16.1.1",
  "title": "",
  "body": " The STM32C0 low-power mode spectrum. Each row is a mode; the arrows show relative current consumption (shorter arrow = less power). Moving down reduces current dramatically — from 58 µA\/MHz in Run mode to 19 nA in Shutdown — but increases wakeup time and reduces which peripherals remain available. Sleep mode (CPU clock gated, peripherals active) gives a good tradeoff for interrupt-driven designs. Stop mode (most clocks halted) is used when the longest possible idle periods justify the longer wakeup latency.   "
},
{
  "id": "subsec-power-sleep-concept-6",
  "level": "2",
  "url": "subsec-power-sleep-concept.html#subsec-power-sleep-concept-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Sleep mode "
},
{
  "id": "subsec-power-watchdog-concept",
  "level": "1",
  "url": "subsec-power-watchdog-concept.html",
  "type": "Subsection",
  "number": "16.1.3",
  "title": "The Watchdog Timer: A Hardware Safety Net",
  "body": " The Watchdog Timer: A Hardware Safety Net  A different class of problem arises once firmware is deployed in the field: what happens if it gets stuck? A buggy pointer can corrupt the stack. A hardware glitch can leave a peripheral waiting for an event that never arrives. A race condition can cause the main loop to spin forever. These situations are not detected by the CPU — from its perspective it is still executing instructions, just the wrong ones. The device simply stops responding, and because it is battery-powered and headless there is nobody to press the reset button.  The independent watchdog timer (IWDG) solves this with a simple mechanism: it is a counter that counts down continuously, and if it ever reaches zero, it resets the chip. Firmware's only job is to reload the counter — \"kick\" the watchdog — before it expires. Healthy firmware running through its main loop will kick the watchdog on every iteration, and the counter will never reach zero. Stuck firmware will miss one or more kicks, the counter will expire, and the chip will reset and restart cleanly.  Two design decisions are important. First, the watchdog must be clocked independently of the main clock tree — otherwise a firmware fault that crashes the main oscillator would also freeze the watchdog counter. The IWDG runs off the LSI, a separate low-speed internal oscillator that operates even in Stop mode. Second, once started, the watchdog cannot be disabled by software. A buggy firmware should not be able to accidentally (or intentionally) disable its own safety net.  "
},
{
  "id": "subsec-power-watchdog-concept-3",
  "level": "2",
  "url": "subsec-power-watchdog-concept.html#subsec-power-watchdog-concept-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "independent watchdog timer "
},
{
  "id": "rq-power-concepts",
  "level": "1",
  "url": "rq-power-concepts.html",
  "type": "Check Your Understanding",
  "number": "16.1.4",
  "title": "Check Your Understanding",
  "body": "   In STM32 Sleep mode, what is clocked off, and what continues to run?     The CPU core clock is gated — the CPU stops executing instructions — but all peripheral clocks (timers, USART, ADC, etc.) continue running normally.  Correct. Sleep mode halts only the CPU clock. Peripherals keep running and can generate interrupts that wake the CPU back up. This is why wakeup from Sleep takes only a handful of cycles.    The entire chip is powered down; only the RTC keeps running to provide a wakeup timestamp.  That describes a deeper mode (Standby or Shutdown). Sleep mode is much shallower — the CPU clock is gated but peripherals stay active.    The main oscillator (HSI) is stopped, but a low-power clock keeps the CPU ticking at reduced speed.  Stopping the main oscillator is characteristic of Stop mode, not Sleep mode. In Sleep mode the HSI keeps running; only the clock to the CPU is disabled.    All clocks stop, including peripherals, but GPIO pins retain their state so outputs hold their last value.  GPIO retention is correct for deeper modes, but this description is too aggressive for Sleep mode. Peripherals — including timers that might count events while the CPU sleeps — keep their clocks in Sleep mode.       A weather station samples temperature every 60 seconds and must respond to a button press within 50 ms. A designer considers using Stop mode (wakeup latency ≈ 5 µs) between samples. What is the main cost of Stop mode compared with Sleep mode?     Most peripheral clocks are halted in Stop mode, so the USART, timers, and ADC stop running during idle periods. They must be reconfigured or restarted after each wakeup, adding software complexity.  Correct. Stop mode saves more power but freezes most peripherals. For a 60-second sample interval the 5 µs wakeup latency is negligible, but the firmware must handle peripheral restart after each Stop period.    Stop mode is unavailable when a button interrupt is needed, so the button must be polled instead.  External interrupts (EXTI lines) can wake the chip from Stop mode. The button can still be connected to an EXTI line and will generate a wakeup event.    Stop mode resets all registers, so the entire chip must be re-initialized on every wakeup, as if after a hard reset.  Stop mode does not reset registers — RAM and most peripheral configuration are preserved. Only clocks are stopped, not state.    The 5 µs wakeup latency means the button response cannot meet the 50 ms requirement.  5 µs is far below 50 ms. Wakeup latency is not the issue here; peripheral availability is.       A firmware developer suggests kicking the watchdog at the top of every ISR instead of in the main loop, arguing this gives more frequent kicks and less chance of a false reset. What is wrong with this approach?     The watchdog is meant to verify that the main loop is still running. If the main loop hangs but interrupts keep firing, kicking from ISRs would prevent the reset even though the firmware is effectively stuck.  Correct. A hung main loop with active interrupts is a failure state — the watchdog should detect it and reset the chip. Kicking from ISRs would hide exactly the kind of fault the watchdog is supposed to catch.    ISRs execute too infrequently to keep a fast watchdog from expiring.  The opposite is the concern — ISRs may fire more frequently than the main loop, or keep firing even when the main loop is stuck. The problem is that ISR-based kicks hide main-loop failures, not that they kick too rarely.    The IWDG key register is not accessible from interrupt context on the Cortex-M0+.  The IWDG registers are memory-mapped and accessible from any execution context, including ISRs. The restriction is a design principle, not a hardware limit.    Kicking the watchdog too frequently causes the LSI oscillator to drift, making the timeout imprecise.  The LSI oscillator runs continuously regardless of how often the watchdog is kicked. Kick frequency has no effect on oscillator accuracy.     "
},
{
  "id": "rq-power-sleep-mechanism",
  "level": "2",
  "url": "rq-power-concepts.html#rq-power-sleep-mechanism",
  "type": "Reading Question",
  "number": "16.1.4.1",
  "title": "",
  "body": "  In STM32 Sleep mode, what is clocked off, and what continues to run?     The CPU core clock is gated — the CPU stops executing instructions — but all peripheral clocks (timers, USART, ADC, etc.) continue running normally.  Correct. Sleep mode halts only the CPU clock. Peripherals keep running and can generate interrupts that wake the CPU back up. This is why wakeup from Sleep takes only a handful of cycles.    The entire chip is powered down; only the RTC keeps running to provide a wakeup timestamp.  That describes a deeper mode (Standby or Shutdown). Sleep mode is much shallower — the CPU clock is gated but peripherals stay active.    The main oscillator (HSI) is stopped, but a low-power clock keeps the CPU ticking at reduced speed.  Stopping the main oscillator is characteristic of Stop mode, not Sleep mode. In Sleep mode the HSI keeps running; only the clock to the CPU is disabled.    All clocks stop, including peripherals, but GPIO pins retain their state so outputs hold their last value.  GPIO retention is correct for deeper modes, but this description is too aggressive for Sleep mode. Peripherals — including timers that might count events while the CPU sleeps — keep their clocks in Sleep mode.    "
},
{
  "id": "rq-power-mode-tradeoff",
  "level": "2",
  "url": "rq-power-concepts.html#rq-power-mode-tradeoff",
  "type": "Reading Question",
  "number": "16.1.4.2",
  "title": "",
  "body": "  A weather station samples temperature every 60 seconds and must respond to a button press within 50 ms. A designer considers using Stop mode (wakeup latency ≈ 5 µs) between samples. What is the main cost of Stop mode compared with Sleep mode?     Most peripheral clocks are halted in Stop mode, so the USART, timers, and ADC stop running during idle periods. They must be reconfigured or restarted after each wakeup, adding software complexity.  Correct. Stop mode saves more power but freezes most peripherals. For a 60-second sample interval the 5 µs wakeup latency is negligible, but the firmware must handle peripheral restart after each Stop period.    Stop mode is unavailable when a button interrupt is needed, so the button must be polled instead.  External interrupts (EXTI lines) can wake the chip from Stop mode. The button can still be connected to an EXTI line and will generate a wakeup event.    Stop mode resets all registers, so the entire chip must be re-initialized on every wakeup, as if after a hard reset.  Stop mode does not reset registers — RAM and most peripheral configuration are preserved. Only clocks are stopped, not state.    The 5 µs wakeup latency means the button response cannot meet the 50 ms requirement.  5 µs is far below 50 ms. Wakeup latency is not the issue here; peripheral availability is.    "
},
{
  "id": "rq-power-watchdog-kick",
  "level": "2",
  "url": "rq-power-concepts.html#rq-power-watchdog-kick",
  "type": "Reading Question",
  "number": "16.1.4.3",
  "title": "",
  "body": "  A firmware developer suggests kicking the watchdog at the top of every ISR instead of in the main loop, arguing this gives more frequent kicks and less chance of a false reset. What is wrong with this approach?     The watchdog is meant to verify that the main loop is still running. If the main loop hangs but interrupts keep firing, kicking from ISRs would prevent the reset even though the firmware is effectively stuck.  Correct. A hung main loop with active interrupts is a failure state — the watchdog should detect it and reset the chip. Kicking from ISRs would hide exactly the kind of fault the watchdog is supposed to catch.    ISRs execute too infrequently to keep a fast watchdog from expiring.  The opposite is the concern — ISRs may fire more frequently than the main loop, or keep firing even when the main loop is stuck. The problem is that ISR-based kicks hide main-loop failures, not that they kick too rarely.    The IWDG key register is not accessible from interrupt context on the Cortex-M0+.  The IWDG registers are memory-mapped and accessible from any execution context, including ISRs. The restriction is a design principle, not a hardware limit.    Kicking the watchdog too frequently causes the LSI oscillator to drift, making the timeout imprecise.  The LSI oscillator runs continuously regardless of how often the watchdog is kicked. Kick frequency has no effect on oscillator accuracy.    "
},
{
  "id": "sec-power-modes",
  "level": "1",
  "url": "sec-power-modes.html",
  "type": "Section",
  "number": "16.2",
  "title": "STM32C0 Operating Modes",
  "body": " STM32C0 Operating Modes  The STM32C031's power consumption depends primarily on which clocks are running and which peripherals are enabled. The reference manual defines three main modes: Run mode (CPU and peripherals all active), Sleep mode (CPU clock gated, all peripherals remain active), and Stop mode (most clocks halted, only a small subset of peripherals available). Additional sub-modes within Stop provide further tradeoffs.   STM32C0 low-power mode hierarchy. Moving down the table reduces current draw at the cost of wakeup latency and available peripheral set. Run mode: ~5 mA. Sleep mode: ~1 mA. Stop mode: ~5 µA. Entering each mode requires specific register configuration.     STM32C031 clock distribution tree. The HSI (16 MHz internal RC) feeds a PLL or passes directly as SYSCLK. SYSCLK drives the AHB bus and is further divided for the APB bus (which clocks peripherals like TIM14, USART, and ADC). Gating individual peripheral clocks via RCC_IOPENR and RCC_APBENR reduces idle power even in Run mode.     Detailed comparison of operating modes. Sleep mode gates only the CPU; all peripherals and the systick keep running, so interrupt latency is minimal (a few cycles). Stop mode halts all high-speed clocks; only the LSI\/LSE, RTC, and EXTI\/IWDG wakeup sources remain active. Wakeup from Stop takes several microseconds while the clocks restart.     Device resources available in each mode. Timers, USART, ADC, I2C, and SPI are all gated in Stop mode. GPIO retains its state. The EXTI controller and IWDG remain active and can generate a wakeup event.    "
},
{
  "id": "sec-power-modes-2",
  "level": "2",
  "url": "sec-power-modes.html#sec-power-modes-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Run Sleep Stop "
},
{
  "id": "fig-power-saving-modes",
  "level": "2",
  "url": "sec-power-modes.html#fig-power-saving-modes",
  "type": "Figure",
  "number": "16.2.1",
  "title": "",
  "body": " STM32C0 low-power mode hierarchy. Moving down the table reduces current draw at the cost of wakeup latency and available peripheral set. Run mode: ~5 mA. Sleep mode: ~1 mA. Stop mode: ~5 µA. Entering each mode requires specific register configuration.   "
},
{
  "id": "fig-clock-distribution",
  "level": "2",
  "url": "sec-power-modes.html#fig-clock-distribution",
  "type": "Figure",
  "number": "16.2.2",
  "title": "",
  "body": " STM32C031 clock distribution tree. The HSI (16 MHz internal RC) feeds a PLL or passes directly as SYSCLK. SYSCLK drives the AHB bus and is further divided for the APB bus (which clocks peripherals like TIM14, USART, and ADC). Gating individual peripheral clocks via RCC_IOPENR and RCC_APBENR reduces idle power even in Run mode.   "
},
{
  "id": "fig-operating-modes-table",
  "level": "2",
  "url": "sec-power-modes.html#fig-operating-modes-table",
  "type": "Figure",
  "number": "16.2.3",
  "title": "",
  "body": " Detailed comparison of operating modes. Sleep mode gates only the CPU; all peripherals and the systick keep running, so interrupt latency is minimal (a few cycles). Stop mode halts all high-speed clocks; only the LSI\/LSE, RTC, and EXTI\/IWDG wakeup sources remain active. Wakeup from Stop takes several microseconds while the clocks restart.   "
},
{
  "id": "fig-device-resources-table",
  "level": "2",
  "url": "sec-power-modes.html#fig-device-resources-table",
  "type": "Figure",
  "number": "16.2.4",
  "title": "",
  "body": " Device resources available in each mode. Timers, USART, ADC, I2C, and SPI are all gated in Stop mode. GPIO retains its state. The EXTI controller and IWDG remain active and can generate a wakeup event.   "
},
{
  "id": "sec-wfi-wfe",
  "level": "1",
  "url": "sec-wfi-wfe.html",
  "type": "Section",
  "number": "16.3",
  "title": "Sleep Mode: WFI and WFE",
  "body": " Sleep Mode: WFI and WFE  The Cortex-M0+ provides two instructions for entering low-power states: WFI (Wait For Interrupt) suspends execution until any enabled interrupt fires, then resumes at the ISR entry point. WFE (Wait For Event) is similar but also wakes on a hardware event signal (e.g., from the event registers), and can return without executing an ISR. For most applications WFI is the right choice: the CPU sleeps between interrupt events and resumes transparently.   WFI and WFE usage. A typical main-loop pattern: initialize peripherals, enable interrupts, then call __WFI() in an infinite loop. After each interrupt the ISR runs, the CPU returns to the loop, and immediately calls WFI again. Average current drops from run-mode levels to sleep-mode levels for the fraction of time the CPU is idle.    int main(void) { \/* Initialize all peripherals and enable interrupts *\/ led_init(); pb4_exti_init(); \/\/ GPIO EXTI wakeup source tim14_500ms_interrupt_init(); \/* Main loop: sleep until an interrupt wakes the CPU *\/ while (1) { __WFI(); \/\/ CPU halts; resumes after ISR returns } return 1; } \/* With WFI, all work happens in ISRs: *\/ void TIM14_IRQHandler(void) { TIM14->SR &= ~TIM_SR_UIF; led_toggle(); }   PWR_CR1 register. The LPMS field (bits 2:0) selects the low-power mode entered when the processor executes WFI\/WFE. LPMS = 0b000 selects Sleep; LPMS = 0b001 selects Stop 0; and so on. The SLEEPDEEP bit in the Cortex-M SCB_SCR register must also be set to enter Stop vs. Sleep.     PWR_CR1 bit field detail. For basic Sleep mode set SLEEPDEEP = 0 in SCB->SCR; PWR_CR1 is not needed. For Stop mode set SLEEPDEEP = 1 and configure LPMS before executing WFI. The FLASHPD bit powers down the flash in Stop mode for additional savings at the cost of longer wakeup time.      A sensor interrupt fires at 10 Hz. A firmware team debates two designs: (A) poll the sensor status register in a tight loop; (B) use WFI and read the sensor in an ISR. Which uses less power, and why?   Design B uses less power. With WFI the CPU is clocked off for the ~90 ms between interrupts; in design A the CPU runs at full speed continuously, burning milliamps regardless of whether new data is available.  Correct. Sleep mode reduces CPU current to near zero between events. Polling keeps the CPU fully active at all times.  Design A uses less power because it avoids the overhead of entering and exiting interrupt service routines.  ISR overhead is a few microseconds. At 10 Hz, ISR entry overhead is negligible compared to the ~100 ms idle window where WFI saves power.  Both use the same power because the MCU is still running in both cases.  WFI gates the CPU clock. The MCU is present in both cases but the CPU core consumes much less current when clocked off.     "
},
{
  "id": "sec-wfi-wfe-2",
  "level": "2",
  "url": "sec-wfi-wfe.html#sec-wfi-wfe-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "WFI WFE "
},
{
  "id": "fig-wfi-wfe",
  "level": "2",
  "url": "sec-wfi-wfe.html#fig-wfi-wfe",
  "type": "Figure",
  "number": "16.3.1",
  "title": "",
  "body": " WFI and WFE usage. A typical main-loop pattern: initialize peripherals, enable interrupts, then call __WFI() in an infinite loop. After each interrupt the ISR runs, the CPU returns to the loop, and immediately calls WFI again. Average current drops from run-mode levels to sleep-mode levels for the fraction of time the CPU is idle.   "
},
{
  "id": "fig-pwr-cr1-1",
  "level": "2",
  "url": "sec-wfi-wfe.html#fig-pwr-cr1-1",
  "type": "Figure",
  "number": "16.3.2",
  "title": "",
  "body": " PWR_CR1 register. The LPMS field (bits 2:0) selects the low-power mode entered when the processor executes WFI\/WFE. LPMS = 0b000 selects Sleep; LPMS = 0b001 selects Stop 0; and so on. The SLEEPDEEP bit in the Cortex-M SCB_SCR register must also be set to enter Stop vs. Sleep.   "
},
{
  "id": "fig-pwr-cr1-2",
  "level": "2",
  "url": "sec-wfi-wfe.html#fig-pwr-cr1-2",
  "type": "Figure",
  "number": "16.3.3",
  "title": "",
  "body": " PWR_CR1 bit field detail. For basic Sleep mode set SLEEPDEEP = 0 in SCB->SCR; PWR_CR1 is not needed. For Stop mode set SLEEPDEEP = 1 and configure LPMS before executing WFI. The FLASHPD bit powers down the flash in Stop mode for additional savings at the cost of longer wakeup time.   "
},
{
  "id": "rq-wfi-vs-polling",
  "level": "2",
  "url": "rq-wfi.html#rq-wfi-vs-polling",
  "type": "Reading Question",
  "number": "16.3.1",
  "title": "",
  "body": " A sensor interrupt fires at 10 Hz. A firmware team debates two designs: (A) poll the sensor status register in a tight loop; (B) use WFI and read the sensor in an ISR. Which uses less power, and why?   Design B uses less power. With WFI the CPU is clocked off for the ~90 ms between interrupts; in design A the CPU runs at full speed continuously, burning milliamps regardless of whether new data is available.  Correct. Sleep mode reduces CPU current to near zero between events. Polling keeps the CPU fully active at all times.  Design A uses less power because it avoids the overhead of entering and exiting interrupt service routines.  ISR overhead is a few microseconds. At 10 Hz, ISR entry overhead is negligible compared to the ~100 ms idle window where WFI saves power.  Both use the same power because the MCU is still running in both cases.  WFI gates the CPU clock. The MCU is present in both cases but the CPU core consumes much less current when clocked off.   "
},
{
  "id": "sec-watchdog",
  "level": "1",
  "url": "sec-watchdog.html",
  "type": "Section",
  "number": "16.4",
  "title": "Independent Watchdog Timer",
  "body": " Independent Watchdog Timer  No matter how carefully firmware is tested, edge cases exist: a hardware fault, a corrupted stack, or an unexpected interrupt can leave the CPU spinning in an infinite loop or stuck waiting for an event that never arrives. The independent watchdog timer (IWDG) detects this condition and forces a system reset. The firmware must periodically \"kick\" (reload) the watchdog counter to prove it is still running correctly. If the firmware fails to kick the watchdog before the counter expires, the IWDG resets the chip.  The IWDG is clocked by the LSI (low-speed internal oscillator, ~32 kHz), which runs even in Stop mode and is independent of the main clock tree — hence the name. This independence means the watchdog can catch a lockup that disables the HSI or PLL.   IWDG block diagram. The 12-bit down counter is loaded from the RLR (reload register) on each kick. It counts down at the LSI frequency divided by the prescaler (PR register). When the counter reaches zero it generates a reset. The KEY register controls writes: writing 0xAAAA kicks the watchdog; writing 0x5555 unlocks the PR and RLR for configuration; writing 0xCCCC starts the watchdog (which cannot be stopped).    \/* IWDG configuration: ~1 second timeout at LSI ~32 kHz *\/ \/* Prescaler \/32 -> 1 kHz; RLR = 999 -> 1000 ms timeout *\/ void iwdg_init(void) { IWDG->KR = 0x5555; \/\/ unlock PR and RLR IWDG->PR = 3; \/\/ prescaler \/32 (LSI\/32 ~= 1 kHz) IWDG->RLR = 999; \/\/ reload value: 1000 ticks = 1 s IWDG->KR = 0xAAAA; \/\/ reload counter (start it running) IWDG->KR = 0xCCCC; \/\/ enable watchdog (cannot be disabled) } \/* Call this periodically (more often than timeout) to prevent reset *\/ void iwdg_kick(void) { IWDG->KR = 0xAAAA; }   Watchdog integration in a main loop. The watchdog is initialized once. The main loop kicks it at the top of every iteration. If the loop stalls (interrupt lockup, runaway pointer, etc.) the kick never executes, the counter expires, and the chip resets. An IWDG reset can be detected after restart by checking the RCC_CSR reset flags.    int main(void) { \/* Optional: detect if we're recovering from a watchdog reset *\/ if (RCC->CSR & RCC_CSR_IWDGRSTF) { RCC->CSR |= RCC_CSR_RMVF; \/\/ clear reset flags \/* Log or signal a watchdog-reset event *\/ } iwdg_init(); \/\/ start watchdog (timeout ~1 s) led_init(); pb4_exti_init(); while (1) { iwdg_kick(); \/\/ prove the loop is still running __WFI(); \/\/ sleep until next interrupt } return 1; }   Choose the watchdog timeout to be longer than the longest normal time between kicks, but short enough to detect a lockup before it causes harm. A timeout of 1–5 seconds is common for interactive embedded systems. Do not kick the watchdog inside an ISR: the watchdog tests the main loop, not the interrupt hardware.     Why is the IWDG clocked from the LSI (32 kHz internal RC) rather than from the main HSI\/PLL?   The LSI runs independently of the main clock tree and remains active in Stop mode. A fault that crashes the HSI or PLL will not disable the watchdog.  Correct. The \"independent\" in IWDG refers to clock independence: the watchdog can catch failures that affect the main clock.  The LSI is more accurate than the HSI, making the watchdog timeout more precise.  The opposite is true: the LSI is a low-accuracy RC oscillator (±30% in some conditions). Watchdog timeouts are therefore approximate. The benefit is independence, not precision.  The IWDG requires a lower clock frequency to reduce power consumption.  Power is a secondary benefit. The primary reason for using the LSI is that it runs when the main clocks are stopped or faulted.     Can the IWDG be disabled after IWDG->KR = 0xCCCC is written?   No. Once enabled, the IWDG runs until the next reset. There is no disable bit. This is intentional: a defective firmware should not be able to disable its own watchdog.  Correct. The IWDG is a safety mechanism; hardware prevents software from turning it off.  Yes. Writing 0x0000 to IWDG_KR disables it.  There is no such key value. Only 0x5555, 0xAAAA, and 0xCCCC are valid IWDG key values.  Yes. Clearing bit 0 of IWDG_CR disables it.  The IWDG does not have a CR register with a disable bit. Once started it cannot be stopped in software.     "
},
{
  "id": "sec-watchdog-2",
  "level": "2",
  "url": "sec-watchdog.html#sec-watchdog-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "independent watchdog timer "
},
{
  "id": "fig-iwdg-diagram",
  "level": "2",
  "url": "sec-watchdog.html#fig-iwdg-diagram",
  "type": "Figure",
  "number": "16.4.1",
  "title": "",
  "body": " IWDG block diagram. The 12-bit down counter is loaded from the RLR (reload register) on each kick. It counts down at the LSI frequency divided by the prescaler (PR register). When the counter reaches zero it generates a reset. The KEY register controls writes: writing 0xAAAA kicks the watchdog; writing 0x5555 unlocks the PR and RLR for configuration; writing 0xCCCC starts the watchdog (which cannot be stopped).   "
},
{
  "id": "fig-iwdg-example",
  "level": "2",
  "url": "sec-watchdog.html#fig-iwdg-example",
  "type": "Figure",
  "number": "16.4.2",
  "title": "",
  "body": " Watchdog integration in a main loop. The watchdog is initialized once. The main loop kicks it at the top of every iteration. If the loop stalls (interrupt lockup, runaway pointer, etc.) the kick never executes, the counter expires, and the chip resets. An IWDG reset can be detected after restart by checking the RCC_CSR reset flags.   "
},
{
  "id": "sec-watchdog-8",
  "level": "2",
  "url": "sec-watchdog.html#sec-watchdog-8",
  "type": "Insight",
  "number": "16.4.3",
  "title": "",
  "body": " Choose the watchdog timeout to be longer than the longest normal time between kicks, but short enough to detect a lockup before it causes harm. A timeout of 1–5 seconds is common for interactive embedded systems. Do not kick the watchdog inside an ISR: the watchdog tests the main loop, not the interrupt hardware.  "
},
{
  "id": "rq-iwdg-clock",
  "level": "2",
  "url": "rq-iwdg.html#rq-iwdg-clock",
  "type": "Reading Question",
  "number": "16.4.1",
  "title": "",
  "body": " Why is the IWDG clocked from the LSI (32 kHz internal RC) rather than from the main HSI\/PLL?   The LSI runs independently of the main clock tree and remains active in Stop mode. A fault that crashes the HSI or PLL will not disable the watchdog.  Correct. The \"independent\" in IWDG refers to clock independence: the watchdog can catch failures that affect the main clock.  The LSI is more accurate than the HSI, making the watchdog timeout more precise.  The opposite is true: the LSI is a low-accuracy RC oscillator (±30% in some conditions). Watchdog timeouts are therefore approximate. The benefit is independence, not precision.  The IWDG requires a lower clock frequency to reduce power consumption.  Power is a secondary benefit. The primary reason for using the LSI is that it runs when the main clocks are stopped or faulted.   "
},
{
  "id": "rq-iwdg-stop",
  "level": "2",
  "url": "rq-iwdg.html#rq-iwdg-stop",
  "type": "Reading Question",
  "number": "16.4.2",
  "title": "",
  "body": " Can the IWDG be disabled after IWDG->KR = 0xCCCC is written?   No. Once enabled, the IWDG runs until the next reset. There is no disable bit. This is intentional: a defective firmware should not be able to disable its own watchdog.  Correct. The IWDG is a safety mechanism; hardware prevents software from turning it off.  Yes. Writing 0x0000 to IWDG_KR disables it.  There is no such key value. Only 0x5555, 0xAAAA, and 0xCCCC are valid IWDG key values.  Yes. Clearing bit 0 of IWDG_CR disables it.  The IWDG does not have a CR register with a disable bit. Once started it cannot be stopped in software.   "
},
{
  "id": "appendix-registers",
  "level": "1",
  "url": "appendix-registers.html",
  "type": "Appendix",
  "number": "A",
  "title": "Key STM32C031C6 Registers Reference",
  "body": " Key STM32C031C6 Registers Reference  This appendix summarises the registers used most frequently in this course. Full details are in the STM32C031C6 Reference Manual and the STM32C031C6 Datasheet .   Register Address offset Purpose  RCC->IOPENR 0x34 Enable\/disable GPIO port clocks  GPIOx->MODER 0x00 Pin mode: input \/ output \/ AF \/ analog  GPIOx->ODR 0x14 Output data register  GPIOx->IDR 0x10 Input data register  GPIOx->PUPDR 0x0C Pull-up \/ pull-down configuration  TIMx->PSC 0x28 Prescaler  TIMx->ARR 0x2C Auto-reload register (period)  TIMx->CCR1 0x34 Capture\/compare register 1 (PWM duty)  ADC->DR 0x40 ADC data register  USART2->TDR 0x28 UART transmit data register  I2C1->CR1 0x00 I2C control register 1   "
},
{
  "id": "appendix-bit-ops",
  "level": "1",
  "url": "appendix-bit-ops.html",
  "type": "Appendix",
  "number": "B",
  "title": "Bit-Manipulation Quick Reference",
  "body": " Bit-Manipulation Quick Reference  In embedded C, we frequently need to set, clear, or test individual bits in registers.   Operation C idiom  Set bit REG |= (1U << n);  Clear bit REG &= ~(1U << n);  Toggle bit REG ^= (1U << n);  Test if bit is set if (REG & (1U << n))  Test if bit is clear if (!(REG & (1U << n)))   "
},
{
  "id": "backmatter-3",
  "level": "1",
  "url": "backmatter-3.html",
  "type": "Index",
  "number": "",
  "title": "Index",
  "body": "  "
}
]

var ptx_lunr_idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']

  ptx_lunr_docs.forEach(function (doc) {
    this.add(doc)
  }, this)
})
