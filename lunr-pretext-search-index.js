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
  "body": " Peripheral Registers: How Software Talks to Hardware  Here is the central insight of embedded systems programming, and the mental model you should take into every class:   On the STM32, controlling a hardware peripheral means reading from and writing to specific memory addresses. Those addresses do not hold ordinary variables — they are wired directly into hardware circuits. Writing a value to the right address changes the state of the hardware.   These special addresses are called peripheral registers . Every peripheral — GPIO, timers, UART, I2C — has a set of registers that control its behavior. For example, the Output Data Register (ODR) controls the voltage driven on each individual output pin: bit 5 controls PA5, bit 3 controls PA3, and so on. For Port A it lives at address 0x5000 0014 . When your code writes a value to that address, the GPIO hardware immediately updates each output pin whose corresponding bit changed.  In C, you never type a raw address like 0x5000 0014 . Instead, the device header file ( stm32c031xx.h ) defines a pointer named GPIOA that points to a structure of registers at that base address. So GPIOA->ODR means the ODR register inside the GPIOA structure, which compiles to exactly the right memory write.  Before you can use any register in a peripheral, you must enable that peripheral's clock . By default, most peripherals are powered down to save energy — their internal clock signal is gated off, so writes to their registers are silently ignored. Enabling the clock takes one register write: setting the appropriate bit in the Reset and Clock Control (RCC) subsystem. It is the first thing every initialization function does, and forgetting it is one of the most common sources of bugs in embedded code.  "
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
  "body": "  What distinguishes a microcontroller from a general-purpose CPU (like the one in a laptop)?    A microcontroller integrates CPU, memory, and peripherals on one chip and is designed to run a single dedicated task with direct hardware access, whereas a general-purpose CPU relies on external chips and an operating system.  Correct. The all-in-one integration is what makes microcontrollers cheap, low-power, and suitable for embedded tasks — but it also means they are not easily repurposed for general computing.    A microcontroller is always faster than a CPU because it has no operating system overhead.  Microcontrollers are almost always slower than modern laptop CPUs in raw compute speed — the STM32C031C6 runs at 12 MHz versus several GHz for a laptop. The advantage is integration and low power, not raw speed.    A microcontroller uses a different programming language than a general-purpose processor.  Both are programmed in standard languages like C. The difference is in the hardware architecture and intended use, not the programming language.    A microcontroller can only control LEDs and buttons, while a CPU handles more complex tasks.  Microcontrollers handle a wide range of tasks — motor control, wireless communication, sensor fusion, and more. The distinction is not about task complexity but about integration and direct hardware access.      A microcontroller has 48 physical pins. Some carry power and ground; others are GPIO. What does general-purpose mean in GPIO?    The pin has no fixed function — software configures it as either a digital input or a digital output, and the same pin can serve different roles in different projects.  Correct. Unlike a dedicated power pin (which is always connected to VDD) or a crystal pin (which is always an oscillator input), a GPIO pin's role is determined entirely by how your code configures it.    The pin can carry analog signals as well as digital ones.  Some GPIO pins do have an analog mode, but that is a specific additional function, not what general-purpose means. The core meaning is software-configurable input or output.    The pin is usable on any microcontroller brand, not just STM32.  GPIO is a common concept, but general-purpose refers to the pin's flexibility within one chip, not cross-brand compatibility.    The pin can source or sink any amount of current the connected device needs.  GPIO pins have strict current limits (typically 8–20 mA). General-purpose refers to input\/output configurability, not unlimited current capability.      You write to GPIOA->MODER to configure PA5 as an output, but the pin never responds. You have not written to RCC->IOPENR . What is the most likely explanation?    The GPIOA peripheral's clock has not been enabled; writes to its registers are silently ignored until the clock is turned on via RCC.  Correct. The STM32 gates peripheral clocks by default. RCC->IOPENR must be set before any GPIO register is accessed.    The MODER register requires two writes to take effect; one write is not enough.  MODER takes effect on the first write — but only if the peripheral clock is already enabled. The missing step is the clock enable, not a second MODER write.    PA5 is reserved for the on-board LED and cannot be configured by user code.  PA5 is the on-board LED pin, but it is fully accessible to user code — that is the whole point of Blinky. No pin is reserved in a way that blocks user access.    The processor must be restarted after writing to MODER before the new mode takes effect.  GPIO configuration takes effect immediately on the write — no restart required. The missing step is the clock enable.     "
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
  "body": " You write to GPIOA->MODER to configure PA5 as an output, but the pin never responds. You have not written to RCC->IOPENR . What is the most likely explanation?    The GPIOA peripheral's clock has not been enabled; writes to its registers are silently ignored until the clock is turned on via RCC.  Correct. The STM32 gates peripheral clocks by default. RCC->IOPENR must be set before any GPIO register is accessed.    The MODER register requires two writes to take effect; one write is not enough.  MODER takes effect on the first write — but only if the peripheral clock is already enabled. The missing step is the clock enable, not a second MODER write.    PA5 is reserved for the on-board LED and cannot be configured by user code.  PA5 is the on-board LED pin, but it is fully accessible to user code — that is the whole point of Blinky. No pin is reserved in a way that blocks user access.    The processor must be restarted after writing to MODER before the new mode takes effect.  GPIO configuration takes effect immediately on the write — no restart required. The missing step is the clock enable.    "
},
{
  "id": "subsec-day1-run-blinky",
  "level": "1",
  "url": "subsec-day1-run-blinky.html",
  "type": "Subsection",
  "number": "1.2.1",
  "title": "Part 1: Get Blinky Running",
  "body": " Part 1: Get Blinky Running   Run Blinky   Follow the Canvas instructions for Day 1 to import the Blinky project, build it, and flash it to your Nucleo board. The green on-board LED should begin blinking.     In the Project Explorer panel on the left, expand your project folder, then expand the Src subfolder. Double-click blinky.c to open it in the editor.  Find the delay loop: for (int i = 0; i < 100000; i++); . Change 100000 to 1000000 . Then click the hammer icon (Build) and, once the build succeeds, the play icon (Run) to flash the board. What changes?      Change the loop bound to 10000 and repeat. How fast can you make the LED blink before it appears to stop flickering?     "
},
{
  "id": "act-day1-run-blinky",
  "level": "2",
  "url": "subsec-day1-run-blinky.html#act-day1-run-blinky",
  "type": "Activity",
  "number": "1.2.1",
  "title": "Run Blinky.",
  "body": " Run Blinky   Follow the Canvas instructions for Day 1 to import the Blinky project, build it, and flash it to your Nucleo board. The green on-board LED should begin blinking.     In the Project Explorer panel on the left, expand your project folder, then expand the Src subfolder. Double-click blinky.c to open it in the editor.  Find the delay loop: for (int i = 0; i < 100000; i++); . Change 100000 to 1000000 . Then click the hammer icon (Build) and, once the build succeeds, the play icon (Run) to flash the board. What changes?      Change the loop bound to 10000 and repeat. How fast can you make the LED blink before it appears to stop flickering?    "
},
{
  "id": "subsec-day1-board-tour",
  "level": "1",
  "url": "subsec-day1-board-tour.html",
  "type": "Subsection",
  "number": "1.2.2",
  "title": "Part 2: The Nucleo Board",
  "body": " Part 2: The Nucleo Board  The STM32 Nucleo-64 board surrounds the STM32C031C6 microcontroller with everything needed to program and power it from a laptop: a USB interface, voltage regulators, Arduino-compatible headers, and a few buttons and LEDs. shows the board and a close-up of the microcontroller.   The STM32 Nucleo-64 board (left) and a close-up of the microcontroller area (right). The orange arrow identifies the STM32C031C6 microcontroller; the pink circles show how its physical pins connect to the Arduino-compatible header pins — the sockets where you plug in jumper wires.     shows the board layout from above. Running along the left and right edges are two rows of Arduino-compatible header pins — these are where you plug in jumper wires to connect LEDs, buttons, and sensors. The small green user LED sits at the very top of the board, just to the left of the right Arduino header; the black reset button is just to the left of it. Flanking the Arduino headers on the outer left and right edges are two additional connectors called Morpho connectors that expose more pins — we will not use those. The USB-B Mini connector on the top edge carries both power and the programming\/debugging link to your laptop.   Annotated top view of the STM32 Nucleo-64 board. Key components are labeled by color: USB interface and reset button (black), power LED and user LED (green), user button (blue), crystal oscillators (purple), power\/ground and analog headers (red), digital I\/O header (red arrow, right), Morpho connectors (pink), and the STM32C031C6 microcontroller (orange).    The STM32C031C6 has 48 physical pins ( ), organized into three GPIO ports named A, B, and C, with up to 16 pins each. A pin is identified by its port letter and bit number: PA5 means Port A, bit 5; PB10 means Port B, bit 10. The on-board LED is wired to PA5 — also labeled D13 on the Arduino header. shows the full pin map with the D13 = PA5 connection highlighted.   Pin diagram of the STM32C031C6 (48-pin LQFP package). The chip has 48 pins organized into three GPIO ports — A, B, and C — each with up to 16 pins. PA5 (bottom row, highlighted in red) is the on-board LED pin.     Color-coded Nucleo-64 pin map. Each header pin is shown with its Arduino label (center columns) and corresponding STM32C031C6 port\/bit name (outer columns), color-coded by function. The red box and arrow highlight D13 = PA5 (Port A, bit 5) — the on-board LED pin.    "
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
  "body": " Part 3: Inside blinky.c  To make an LED blink, the program must do four things in order:   Turn on the clock to GPIO Port A (the peripheral is off by default).  Set PA5 to output mode so we can drive it HIGH or LOW.  Set bit 5 HIGH to turn the LED on.  Clear bit 5 LOW to turn the LED off — then repeat.   Each step is one or two lines of C. Here is the complete blinky.c source.  #include \"stm32C0xx.h\" \/\/ all register definitions live here \/\/ Bit 0 of RCC->IOPENR enables the clock for GPIOA #define GPIOAEN (1U << 0) \/\/ 0b...0001 (unsigned 32-bit) \/\/ Bit 5 of GPIOA is wired to the on-board LED #define LED_PIN (1U << 5) \/\/ 0b...0010 0000 int main(void) { RCC->IOPENR |= GPIOAEN; \/\/ Step 1: enable GPIOA clock GPIOA->MODER |= (1U << 10); \/\/ Step 2a: set bit 10 of MODER GPIOA->MODER &= ~(1U << 11);\/\/ Step 2b: clear bit 11 of MODER \/\/ → PA5 is now an output while (1) { GPIOA->ODR |= LED_PIN; \/\/ Step 3: set bit 5 → LED on for (int i = 0; i < 100000; i++); GPIOA->ODR &= ~LED_PIN; \/\/ Step 4: clear bit 5 → LED off for (int i = 0; i < 100000; i++); } return 0; \/\/ never reached }  Notice that Steps 3 and 4 sit inside while (1) — an infinite loop that never terminates. In most programming courses you are told never to write an infinite loop. Embedded programming is the exception. An MCU is not a general-purpose computer running an operating system; there is no desktop to return to, no shell to hand control back to. From the moment power is applied, the processor must keep executing. The return 0 at the end of main() is unreachable — it is there only because the C standard requires it. Any real embedded program has exactly this shape: one-time setup code before  while (1) , then the work the device does forever inside it.  Before stepping through each line, here are the three C operators used throughout blinky.c.   Left shift: 1U << n . Writing 1U << n shifts the value 1 left by n bit positions, placing a single 1 at position n and zeros everywhere else. The U suffix makes it an unsigned 32-bit integer — required to avoid undefined behavior when shifting near bit 31.  1U = 0b 0000 0000 0000 0000 0000 0000 0000 0001 (bit 0 is 1) 1U << 5 = 0b 0000 0000 0000 0000 0000 0000 0010 0000 (bit 5 is 1) 1U << 10 = 0b 0000 0000 0000 0000 0000 0100 0000 0000 (bit 10 is 1)  This single- 1 pattern is called a bit mask . Giving it a name with #define makes the code self-documenting: LED_PIN instead of an unexplained (1U << 5) .   Setting a bit: OR-assign ( |= ). The bitwise OR truth table shows what happens to each bit pair:    A (register bit)  B (mask bit)  A | B   0 0 0  0 1 1  1 0 1  1 1 1   When the mask bit is 1 , the result is always 1 — the register bit is forced high regardless of its current value. When the mask bit is 0 , the result equals the register bit — it is left unchanged. So register |= mask sets exactly the bits that are 1 in the mask, leaving all other bits untouched. A plain assignment would overwrite every other bit to zero, potentially disabling things that were already configured. Always use |= to set bits in peripheral registers.   Clearing a bit: AND-assign ( &= ) and bitwise NOT ( ~ ).  register &= value is shorthand for register = register & value — it AND-assigns any value you give it, exactly like |= is shorthand for OR-assign. The ~ operator is separate: it flips every bit of its operand. In blinky.c these two operators appear together because clearing a bit requires exactly that combination, but they can each be used on their own.    A (register bit)  B (mask bit)  A & B   0 0 0  0 1 0  1 0 0  1 1 1   When the mask bit is 0 , the result is always 0 — the register bit is forced low regardless of its current value. When the mask bit is 1 , the result equals the register bit — it is left unchanged. To force a single bit to 0 , start with a mask that has a 1 in that position, then apply ~ to invert it — producing 0 at that position and 1 s everywhere else:  LED_PIN = 0b 0000 0000 0000 0000 0000 0000 0010 0000 (bit 5 is 1) ~LED_PIN = 0b 1111 1111 1111 1111 1111 1111 1101 1111 (bit 5 is 0, rest are 1s)  AND-ing ( & ) any bit with 0 forces it to 0 ; AND with 1 leaves it unchanged. So register &= ~mask clears exactly the bits that were 1 in the mask, leaving all others untouched.  With those three operators in hand, each step of blinky.c is straightforward to read.   Step 1: Enable the GPIOA clock. By default, the clock to each GPIO port is gated off to save power. You cannot read from or write to any GPIO register until its clock is enabled. The first line of main() — RCC->IOPENR |= GPIOAEN — enables the clock to Port A; it must appear before any access to GPIOA->MODER or GPIOA->ODR .   Step 2: Configure PA5 as an output. The register that controls this is GPIOA->MODER , the Mode Register for Port A. MODER is a 32-bit register that stores the mode of every pin in Port A. Each pin can be in one of four modes: input, output, alternate function (for peripherals like UART), or analog. Because there are four possibilities, two bits are needed to encode the mode of each pin — a single bit could only represent two states. With 16 pins per port and two bits per pin, MODER is exactly 32 bits wide. The four possible two-bit encodings are:   MODER bit-pair encoding    Bits [2n+1 : 2n] Pin mode   00 Input (reset default)  01 General-purpose output  10 Alternate function  11 Analog    For pin , MODER uses bits (lower) and (upper). For PA5, that is bits 10 and 11. Output mode is encoded as 01 — bit 10 set to 1 , bit 11 cleared to 0 . That is why Step 2 takes two lines: one to set bit 10, one to clear bit 11.   Why two lines?  If you only set bit 10 and bit 11 happened to be 1 already, the two-bit pattern would be 11 (analog mode) rather than 01 (output). Always explicitly clear the upper bit to guarantee the correct mode regardless of the reset state.    Steps 3 and 4: Drive PA5 high and low.  GPIOA->ODR |= LED_PIN sets bit 5 to 1 , pulling PA5 to 3.3 V and turning the LED on. GPIOA->ODR &= ~LED_PIN clears bit 5 to 0 , pulling PA5 to 0 V and turning the LED off. Inside while(1) , these two operations alternate forever — producing the blink.   Bit Manipulation Practice   Apply the three operators from the walkthrough. Work through each task before moving to the next.     Write out the 32-bit binary value of 1U << 10 . Which bit position is the 1 ? What is the value in hexadecimal?      Based on what you just read about |= and ~ : what does GPIOA->MODER &= ~(1U << 11) do to bit 11? Explain in one sentence.      Compute 0b00001111 | 0b10100000 by hand (8-bit example). Write the result in binary. Which bits are 1 in the result, and why?      Starting from 0b11111111 , apply & 0b11110111 . What is the result? Which bit changed, and in which direction?     "
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
  "body": " MODER bit-pair encoding    Bits [2n+1 : 2n] Pin mode   00 Input (reset default)  01 General-purpose output  10 Alternate function  11 Analog   "
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
  "title": "Before Day 1X: Plan on Paper",
  "body": " Before Day 1X: Plan on Paper  In Day 1X we will write blinkySlowToFast.c : the LED starts blinking slowly, gradually speeds up, then resets and repeats. You will not need your Nucleo board for this — just a pencil and paper.   Plan blinkySlowToFast on Paper   Think through the logic before writing any C. You already know that the loop bound in the delay loop controls the blink rate. Sketch your approach on paper.     What variable would you introduce to control the delay? How does it change from one blink to the next?      How will your program know when it has reached fast and should reset back to slow ? Write the condition in plain English or pseudocode.      Sketch the overall structure of main() on paper — just the logic, not C syntax. Bring your sketch to Day 1X.     "
},
{
  "id": "act-day1-plan-slowtofast",
  "level": "2",
  "url": "subsec-day1-before-next-class.html#act-day1-plan-slowtofast",
  "type": "Activity",
  "number": "1.2.4",
  "title": "Plan blinkySlowToFast on Paper.",
  "body": " Plan blinkySlowToFast on Paper   Think through the logic before writing any C. You already know that the loop bound in the delay loop controls the blink rate. Sketch your approach on paper.     What variable would you introduce to control the delay? How does it change from one blink to the next?      How will your program know when it has reached fast and should reset back to slow ? Write the condition in plain English or pseudocode.      Sketch the overall structure of main() on paper — just the logic, not C syntax. Bring your sketch to Day 1X.    "
},
{
  "id": "subsec-day1x-copy-file",
  "level": "1",
  "url": "subsec-day1x-copy-file.html",
  "type": "Subsection",
  "number": "1.3.1",
  "title": "Part 1: Managing Multiple Source Files",
  "body": " Part 1: Managing Multiple Source Files  A C project can have only one active main() function. When you create a second .c file with its own main() , you must exclude the original from the build.  To create blinkySlowToFast.c : right-click blinky.c in the Project Explorer and choose Copy . Right-click the Src folder, choose Paste , and when prompted enter blinkySlowToFast.c as the new filename. Open the new file — this is where you will make your edits.  To exclude blinky.c from the build: right-click it, choose Resource Configurations → Exclude from Build , click Select All , then OK. The file icon changes to show it will be skipped ( ).   Right-click blinky.c in the Project Explorer and choose Resource Configurations → Exclude from Build… (highlighted in red). In the dialog that appears, click Select All so both Debug and Release configurations exclude the file, then click OK.    "
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
  "title": "Part 2: Implement blinkySlowToFast",
  "body": " Part 2: Implement blinkySlowToFast   blinkySlowToFast.c   The goal: the LED blinks slowly at first, the rate steadily increases until it reaches a fast rate, then the cycle repeats.     At the end of Day 1 you sketched this logic on paper as homework. Take out your sketch now. If you did not complete it, spend two minutes writing it down before continuing — you will need it for the next task.      Exchange your sketch with a neighbor and review their design. For their approach, answer the following — then share your feedback with them:   What variable controls the blink rate, and how does it change from one cycle to the next?  What is the reset condition — how does the program know it has reached fast and should return to slow ?  Will the approach produce a smooth ramp, or will there be a jump? Is there an edge case where the reset might not trigger correctly?  Is there anything you would change or question?       Implement your own design in blinkySlowToFast.c . Use descriptive constant names for the starting delay, ending delay, and step size. Build, flash, and verify the behavior on the board.     "
},
{
  "id": "act-blinky-slow-to-fast",
  "level": "2",
  "url": "subsec-day1x-slowtofast.html#act-blinky-slow-to-fast",
  "type": "Activity",
  "number": "1.3.1",
  "title": "blinkySlowToFast.c.",
  "body": " blinkySlowToFast.c   The goal: the LED blinks slowly at first, the rate steadily increases until it reaches a fast rate, then the cycle repeats.     At the end of Day 1 you sketched this logic on paper as homework. Take out your sketch now. If you did not complete it, spend two minutes writing it down before continuing — you will need it for the next task.      Exchange your sketch with a neighbor and review their design. For their approach, answer the following — then share your feedback with them:   What variable controls the blink rate, and how does it change from one cycle to the next?  What is the reset condition — how does the program know it has reached fast and should return to slow ?  Will the approach produce a smooth ramp, or will there be a jump? Is there an edge case where the reset might not trigger correctly?  Is there anything you would change or question?       Implement your own design in blinkySlowToFast.c . Use descriptive constant names for the starting delay, ending delay, and step size. Build, flash, and verify the behavior on the board.    "
},
{
  "id": "subsec-day2-c-to-hardware",
  "level": "1",
  "url": "subsec-day2-c-to-hardware.html",
  "type": "Subsection",
  "number": "1.4.1",
  "title": "Part 1: From C Code to Hardware",
  "body": " Part 1: From C Code to Hardware  When you write GPIOA->ODR |= LED_PIN , how does that one line of C actually light an LED? The path has three stages: compile, flash, execute ( ). C is a compiled language, not an interpreted one — the compiler processes your entire source file at once and produces a single binary (an .elf file) containing all the machine instructions for the whole program. The IDE then flashes that binary to the chip's 32 KB flash memory in one operation. Once the board resets, the Cortex-M0+ CPU fetches and executes those stored instructions one by one. The source lines you wrote no longer exist on the chip — only the machine instructions they were compiled into.   How a C program runs on the STM32. The compiler translates C source into machine instructions stored in flash. At run time the CPU fetches and executes each instruction in sequence. As a concrete example, the line GPIOA->ODR |= LED_PIN compiles to a load-OR-store sequence; when executed, the store to the GPIO Output Data Register drives the output pin HIGH.     Memory-mapped I\/O. The STM32C031C6 has a single 4 GB address space shared by flash, RAM, and every peripheral register ( ). There is no separate I\/O bus and no special I\/O instructions — the CPU reads and writes peripheral registers exactly the same way it reads and writes RAM. GPIOA->ODR is not a variable stored in RAM; it is a name for memory address 0x5000 0014 . When the CPU stores a value to that address, the GPIO hardware detects the write on the bus and responds immediately — within one clock cycle.   Memory map of the STM32C031C6. Flash (program code) lives at 0x0800 0000 ; RAM is at 0x2000 0000 . GPIO peripheral registers are in the IOPORT block at 0x5000 0000 . Writing to a GPIO register is simply a store to a specific address in this map — no special I\/O instruction required.     How the output pin changes voltage. Each GPIO output contains a pair of transistors — a P-MOS on top and an N-MOS on the bottom — connected between the 3.3 V supply and ground ( ). This is called a push-pull output. Writing a 1 to the ODR bit turns the P-MOS on (connecting the pin to 3.3 V) and turns the N-MOS off. Writing a 0 does the reverse: N-MOS on, P-MOS off, pin driven to 0 V. The GPIO hardware makes that transistor switch happen within nanoseconds of the CPU store. Setting MODER to output mode ( 01 ) connects this push-pull driver to the pin; in any other mode the driver is disconnected.   GPIO output configuration (from the STM32C031C6 reference manual, annotated). A write to GPIOA->ODR (bottom-left) passes through output control logic to the P-MOS\/N-MOS transistor pair, driving the I\/O pin toward the LED. ODR = 1 turns on P-MOS → pin goes HIGH (3.3 V); ODR = 0 turns on N-MOS → pin goes LOW (0 V). GPIOA->MODER (bottom-right) selects input vs. output mode.    "
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
  "body": " Part 2: A Better Delay — delay_ms()  delay_ms()  ES28.h  The busy-wait loop produces an imprecise delay whose duration depends on the compiler optimization level and clock speed. Starting today, use the course-provided delay_ms() function. Replace the include line at the top of your source file:  \/\/ Day 1: #include \"stm32C0xx.h\" \/\/ Day 2 onward — use this instead: #include \"ES28.h\" \/\/ includes stm32C0xx.h AND the prototype for delay_ms()  With that change you can write readable, self-documenting delays:  #include \"ES28.h\" #define GPIOAEN (1U << 0) #define LED_PIN (1U << 5) int main(void) { RCC->IOPENR |= GPIOAEN; GPIOA->MODER |= (1U << 10); GPIOA->MODER &= ~(1U << 11); while (1) { GPIOA->ODR |= LED_PIN; \/\/ LED on delay_ms(1000); \/\/ wait 1 second GPIOA->ODR &= ~LED_PIN; \/\/ LED off delay_ms(500); \/\/ wait 0.5 second } return 0; }  "
},
{
  "id": "subsec-day2-breadboard",
  "level": "1",
  "url": "subsec-day2-breadboard.html",
  "type": "Subsection",
  "number": "1.4.3",
  "title": "Part 3: External LEDs on the Breadboard",
  "body": " Part 3: External LEDs on the Breadboard  breadboard  digital multimeter (DMM)  The on-board LED is convenient for software testing, but the whole point of a microcontroller is to control external devices. You will wire an LED on a breadboard, drive it from a GPIO pin, and use a digital multimeter to measure the voltages and currents in the circuit.  Your breadboard has power rails running along each long edge. Some kits come with these rails already wired to the Nucleo; if yours does not, wire them now as shown in . Use the Nucleo's 3.3 V header pin for the positive rails. Also connect all positive rails to each other and all ground rails to each other as shown — this lets you tap 3.3 V or GND from anywhere on the board. Once wired, leave all of these jumpers in place for the entire term.   The Nucleo board connected to a breadboard at the start of Lab 1. Short red and black jumper wires link the Nucleo's 3.3 V and GND header pins to the breadboard's positive and negative power rails. Leave these wires in place for the entire term.    To build the LED circuit, choose a red or green LED and a 220 Ω resistor. Wire the circuit as shown in : the GPIO pin connects to the LED anode (+, longer lead), the LED cathode (−, shorter lead) connects through the resistor to the ground rail.   External LED wired on the breadboard and driven from D13 (PA5). Green arrows show current flow: from the D13 header pin, through the LED (anode to cathode), through the 220 Ω resistor, and into the ground rail. The resistor limits current to roughly 10–15 mA. The red and black wires connect the board's 3.3 V and GND headers to the breadboard rails.    The digital multimeter ( ) is essential for verifying circuits. Set the dial to the 20 V DC range for 3.3 V circuits; turn it off when finished to preserve the battery.   The digital multimeter (DMM) from your lab kit. Turn the dial to the 20 V DC position for 3.3 V circuits. Black probe in COM, red probe in VΩmA. Turn to OFF when done.     Wire and Measure   Update your blinky program to use delay_ms(2000) (2 s on, 2 s off) so the DMM display has time to settle.     Flash your updated program. Confirm that both the on-board LED and the external LED blink.      With the LED lit, measure three voltages. : from the power rail to ground (expect ≈ 3.3 V). : across the LED (anode to cathode). : across the resistor. Verify Kirchhoff's voltage law: . Calculate the current .      Replace the 220 Ω resistor with a 1 kΩ resistor. Repeat the measurements. Calculate the new current. Is the LED brighter or dimmer? Why?      The breadboard circuit after moving the LED's anode wire from D13 to D4. Only one jumper wire is rerouted.     Nucleo-64 pinout reference showing each Arduino header label and its corresponding STM32 port and bit number. Use this to look up which MCU pin any Arduino header connects to.     Move to a New Pin   Move the LED's anode wire from D13 to D4 ( ). To make the LED blink from D4 you need to make three changes to your program: enable the correct GPIO port clock, configure the pin as an output, and drive it. Before writing any code, answer the following on paper.     Using , find which STM32 port and bit number D4 corresponds to.      In the STM32C031C6 Reference Manual , go to Section 5.4 (RCC registers) and find the RCC_IOPENR register description. Which bit enables the clock for the port you identified?      From Day 1: for pin , MODER uses bits and . What are the two MODER bit numbers for the pin you identified? What value encodes output mode?      Update your code with the values you found and verify the external LED blinks. The on-board LED (PA5) will stop blinking — that is expected.     "
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
  "body": " Wire and Measure   Update your blinky program to use delay_ms(2000) (2 s on, 2 s off) so the DMM display has time to settle.     Flash your updated program. Confirm that both the on-board LED and the external LED blink.      With the LED lit, measure three voltages. : from the power rail to ground (expect ≈ 3.3 V). : across the LED (anode to cathode). : across the resistor. Verify Kirchhoff's voltage law: . Calculate the current .      Replace the 220 Ω resistor with a 1 kΩ resistor. Repeat the measurements. Calculate the new current. Is the LED brighter or dimmer? Why?    "
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
  "body": " Move to a New Pin   Move the LED's anode wire from D13 to D4 ( ). To make the LED blink from D4 you need to make three changes to your program: enable the correct GPIO port clock, configure the pin as an output, and drive it. Before writing any code, answer the following on paper.     Using , find which STM32 port and bit number D4 corresponds to.      In the STM32C031C6 Reference Manual , go to Section 5.4 (RCC registers) and find the RCC_IOPENR register description. Which bit enables the clock for the port you identified?      From Day 1: for pin , MODER uses bits and . What are the two MODER bit numbers for the pin you identified? What value encodes output mode?      Update your code with the values you found and verify the external LED blinks. The on-board LED (PA5) will stop blinking — that is expected.    "
},
{
  "id": "sec-lab1",
  "level": "1",
  "url": "sec-lab1.html",
  "type": "Subsection",
  "number": "1.4.4",
  "title": "Part 4: Lab 1 — Three-LED Experiments",
  "body": " Part 4: Lab 1 — Three-LED Experiments  Lab 1  Lab 1 extends the single-LED Blinky to a three-LED circuit ( ). Wire three LEDs through 220 Ω resistors to three separate GPIO output pins. Each sub-task asks you to write a separate C file implementing a different blinking pattern.   Three-LED circuit for Lab 1. Each LED has its own 220 Ω resistor and connects to a separate GPIO output pin. Build incrementally: get the first LED blinking before adding the second, and the second before adding the third.    Start in a new project: copy your TemplateProject and rename the copy Lab1 . Download template.c from Canvas, place it in the project's Src folder, and rename it to your first target filename. The template includes a header comment block — fill in your name, assignment, a table of I\/O pins and what they connect to, and a revision history for every file you submit.  Build and test incrementally: get one LED working before adding the second and third. Use descriptive #define names for every pin and timing constant, and keep track of your changes in comments.    blinkySIM.c — Simultaneous Blink   Write blinkySIM.c : all three LEDs blink on and off simultaneously at the same rate. All three should turn on together, pause, turn off together, pause, and repeat.  Hint: if two LEDs are on the same GPIO port, you can set (or clear) both bits with a single OR (or AND) operation rather than two separate register writes.     blinkySEQ.c — Sequential Blink   Once blinkySIM.c is working, copy it to blinkySEQ.c . Modify the on\/off logic so the three LEDs blink in sequence — only one lit at a time, cycling LED 1 → LED 2 → LED 3 → LED 1 → continuously.     blinkyCNT.c — Binary Counter   Write blinkyCNT.c : the three LEDs display a 3-bit binary count, cycling through 000, 001, 010, 011, 100, 101, 110, 111, 000, with a short pause between each step. Designate which LED represents the least significant bit and which the most.  Hint: a loop variable incrementing from 0 to 7 can be used to drive the three LEDs. Use bit-twiddling expressions to extract each bit of the counter and map it to the appropriate GPIO pin.      AI Policy for ENGS 28  You are welcome to use the course's HiTA tool (integrated in Canvas) for help. Before asking for assistance, engage in genuine problem-solving on your own — productive struggle is where most learning happens. If you use any AI tool, disclose it in your code comments, rigorously test and understand the output, and be prepared to explain every line. All comments in submitted code must be in your own words.   "
},
{
  "id": "fig-three-leds",
  "level": "2",
  "url": "sec-lab1.html#fig-three-leds",
  "type": "Figure",
  "number": "1.4.9",
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
  "body": " Part 1: Code Review — blinkyCNT.c  Share your blinkyCNT.c from Lab 1 within your table group. Read each other's solutions and be ready to explain the approach you used to display a 3-bit binary count on three LEDs.   blinkyCNT Code Review   Read your partners' code. Can you follow the logic? For each solution you read, identify how bits are placed into the correct LED positions in GPIOA->ODR .    Compare the approach in the code below with your own. What does the shift count << LED1_BIT accomplish? Why is it necessary to clear the LED bits first?  \/\/ Clear the three LED bits, then write the new count GPIOA->ODR &= ~LED_ALL; GPIOA->ODR |= (count << LED1_BIT);    "
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
  "body": " Part 2: The Analog Discovery 2 Oscilloscope  The Analog Discovery 2 (AD2) is a compact USB instrument that combines a two-channel oscilloscope, a waveform generator, a logic analyzer, and more in a pocket-sized package. Plug it into your laptop and open the Waveforms application — this is your window into the real voltages on your circuit.   The Analog Discovery 2 (AD2). The USB port connects to a laptop running Waveforms. The multicolored flying lead cables connect to your breadboard and Nucleo board.    The AD2 connects to your circuit through flexible flying leads — color-coded wires that plug directly into breadboard holes. The two oscilloscope channels are labeled 1+ \/ 1− (orange) and 2+ \/ 2− (blue). The minus leads have a white stripe — always connect these to your circuit's GND rail.   AD2 flying-lead connector pinout. Channels 1 and 2 each have a plus (signal) lead and a minus (ground reference) lead with a white stripe. Additional leads support the waveform generator, digital I\/O, and power supply, covered in later labs.    Connect the minus leads to GND, then connect channel 1's plus lead to one LED anode and channel 2's plus lead to a second LED anode, as shown below. Load blinkySEQ.c onto your Nucleo.   Wiring the AD2 to observe two of the three LEDs from Lab 1. The minus (white-stripe) leads connect to ground; the plus leads of channels 1 and 2 connect to two LED anodes.    Open Scope in Waveforms and press Run . Four controls you will use constantly: Time Base — how much time fits across the screen (100 ms\/div for a full blink cycle; 20 µs\/div to reveal switch bounce). Range — the vertical scale in volts per division; adjust until the waveform fills roughly half the screen height. Offset — shifts a channel up or down; use this to separate overlapping traces. Trigger — starts the capture when a signal crosses a threshold, useful for catching a single button press.   Waveforms scope view of a sequentially-blinking LED program. Orange (CH1) and blue (CH2) pulses alternate; each is about 100 ms wide. The settings panel (right) shows Time Base at 100 ms\/div, both channels at 2 V\/div, with an offset on CH2 to keep the traces from overlapping.       To measure a time interval precisely, use the cursor tool: drag two vertical cursor lines to the rising and falling edges of a pulse and the toolbar shows the time difference between them.   Using the Waveforms cursor tool to measure pulse width. Two vertical cursors bracket one LED pulse; the toolbar shows the time difference.     Exploring the Oscilloscope   Load blinkySEQ.c onto your Nucleo. Wire the AD2: minus (white-stripe) leads to GND, channel 1 plus lead to one LED anode, channel 2 plus lead to a second LED anode.    Run the scope and observe both channels. Then experiment with the following settings and answer each question at your table:   What does Time Base control? What value shows one full blink cycle across the screen?  What does Range control? Set it so the waveform fills roughly half the vertical space.  What does Offset do? How do you use it to separate two overlapping channels?  What voltage does the scope measure on a GPIO pin when the LED connected to it is on?     Measure the pulse width of one LED's ON period using the cursor tool. Place two vertical cursors at the rising and falling edges of a single pulse and read the time difference from the toolbar. Does it match the delay_ms value in your code?    Open your blinkySIM project, change the delays to 1 ms ON \/ 10 ms OFF, and flash it to your Nucleo. Observe the LED brightness and the waveform on the scope. Then swap to 10 ms ON \/ 1 ms OFF and flash again. How does brightness change, and why?    You want to observe a switch bounce that lasts about 1 ms. Which time base setting would you choose, and why?    Save a screenshot of your scope view: File → Export → Image tab → Save . You will need this skill for all future lab reports.    "
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
  "id": "subsec-day3-ad2-4",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-4",
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
  "number": "2.2.3",
  "title": "",
  "body": " Wiring the AD2 to observe two of the three LEDs from Lab 1. The minus (white-stripe) leads connect to ground; the plus leads of channels 1 and 2 connect to two LED anodes.   "
},
{
  "id": "subsec-day3-ad2-8",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-8",
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
  "number": "2.2.4",
  "title": "",
  "body": " Waveforms scope view of a sequentially-blinking LED program. Orange (CH1) and blue (CH2) pulses alternate; each is about 100 ms wide. The settings panel (right) shows Time Base at 100 ms\/div, both channels at 2 V\/div, with an offset on CH2 to keep the traces from overlapping.      "
},
{
  "id": "subsec-day3-ad2-10",
  "level": "2",
  "url": "subsec-day3-ad2.html#subsec-day3-ad2-10",
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
  "number": "2.2.5",
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
  "body": " Part 3: Wiring and Reading a Digital Input  Add a pushbutton to your breadboard as shown below. Use D5 (PB4) specifically — the button.c starter code is written for PB4. Wire one side of the button to D5 and the other side to GND.   Breadboard wiring for a pushbutton connected to a GPIO input. The button bridges two rows of the breadboard; one terminal goes to the GPIO pin, the other to GND. The Nucleo's internal pull-up resistor keeps the pin HIGH when the button is open.    Without any extra circuitry, an unconnected GPIO pin floats : its voltage drifts with electrical noise and reading it produces random 0s and 1s. The fix is a pull-up resistor between the pin and 3.3 V. When the button is open, the resistor holds the pin firmly HIGH. Pressing the button connects the pin to GND and pulls it LOW. This active-low convention — pressed = 0, released = 1 — is the standard arrangement for buttons. The STM32 has built-in ~40 kΩ pull-up resistors that you enable in software; no external resistor is needed.   Alternative wiring using an external pull-up resistor between the power rail and the button. The resistor holds the pin HIGH when the button is open; pressing the button pulls it LOW. On the STM32 we use the built-in internal pull-up instead, so no external resistor is needed.     Internal structure of one GPIO bit, showing both directions. For reads (input): the pin voltage passes through an optional pull-up or pull-down and a Schmitt trigger, then lands in the Input Data Register. For writes (output): data flows from the Output Data Register through the output control circuit to the pin. The same pull-up and pull-down are available in both modes.    Three registers control GPIO input behavior on the STM32. GPIOx→MODER (where x is the port letter: A, B, C, D, or F) sets the pin mode — input, output, alternate function, or analog. GPIOx→PUPDR turns the internal pull-up or pull-down on or off. GPIOx→IDR is read-only: each bit reflects the current logic level on the corresponding pin. The specific bit values for each setting are in the reference manual.   Which registers control which parts of a GPIO input. GPIOx→MODER selects input vs. output mode. GPIOx→PUPDR controls the internal pull-up or pull-down. The blue path shows the signal from the button, through the pull-up circuit and Schmitt trigger, into GPIOx→IDR .     Finding Configuration Details in the Reference Manual   You know what MODER, PUPDR, and IDR do — but not yet the specific bit values to write. Open the STM32C031 reference manual , navigate to the General-purpose I\/Os (GPIO) section via the table of contents, then go to Section 6.4 GPIO registers . Looking up register details is a skill you will use constantly — this is practice.    Find GPIOx_MODER (Section 6.4.1). What two-bit value selects input mode? What is the power-on default for all pins?    Find GPIOx_PUPDR . Which two-bit value enables the internal pull-up? Write the C statements that enable the pull-up on PB4 (pin 4 of Port B), using bit masks.     Reading a Button in Code   In STM32CubeIDE, make a copy of your TemplateProject and name the copy Buttons . Then download button.c from Canvas and place it in the Src folder of your new project. Read through the code, then answer the questions below before flashing it.    The code calls delay_ms(50) immediately after enabling the pull-up resistor. Why? What do you think would happen if you removed that line?    The main loop uses (GPIOB->IDR & BUTTON_PIN) == 0 to detect a button press. Why == 0 rather than != 0 ?    Flash the code and verify: pressing the button turns on the LED; releasing turns it off. Then modify blinkySEQ.c so that pressing the button interrupts the sequence and lights all three LEDs; releasing returns to the sequence.     Oscilloscope trace of the pin voltage rising after the internal pull-up is enabled. The pin reaches the HIGH threshold in about 2.5 µs; reading IDR before it settles returns a spurious 0.    "
},
{
  "id": "fig-pushbutton-wiring",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-pushbutton-wiring",
  "type": "Figure",
  "number": "2.2.6",
  "title": "",
  "body": " Breadboard wiring for a pushbutton connected to a GPIO input. The button bridges two rows of the breadboard; one terminal goes to the GPIO pin, the other to GND. The Nucleo's internal pull-up resistor keeps the pin HIGH when the button is open.   "
},
{
  "id": "subsec-day3-inputs-4",
  "level": "2",
  "url": "subsec-day3-inputs.html#subsec-day3-inputs-4",
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
  "number": "2.2.7",
  "title": "",
  "body": " Alternative wiring using an external pull-up resistor between the power rail and the button. The resistor holds the pin HIGH when the button is open; pressing the button pulls it LOW. On the STM32 we use the built-in internal pull-up instead, so no external resistor is needed.   "
},
{
  "id": "fig-io-port-bit",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-io-port-bit",
  "type": "Figure",
  "number": "2.2.8",
  "title": "",
  "body": " Internal structure of one GPIO bit, showing both directions. For reads (input): the pin voltage passes through an optional pull-up or pull-down and a Schmitt trigger, then lands in the Input Data Register. For writes (output): data flows from the Output Data Register through the output control circuit to the pin. The same pull-up and pull-down are available in both modes.   "
},
{
  "id": "fig-input-config-diagram",
  "level": "2",
  "url": "subsec-day3-inputs.html#fig-input-config-diagram",
  "type": "Figure",
  "number": "2.2.9",
  "title": "",
  "body": " Which registers control which parts of a GPIO input. GPIOx→MODER selects input vs. output mode. GPIOx→PUPDR controls the internal pull-up or pull-down. The blue path shows the signal from the button, through the pull-up circuit and Schmitt trigger, into GPIOx→IDR .   "
},
{
  "id": "act-day3-ref-manual",
  "level": "2",
  "url": "subsec-day3-inputs.html#act-day3-ref-manual",
  "type": "Activity",
  "number": "2.2.3",
  "title": "Finding Configuration Details in the Reference Manual.",
  "body": " Finding Configuration Details in the Reference Manual   You know what MODER, PUPDR, and IDR do — but not yet the specific bit values to write. Open the STM32C031 reference manual , navigate to the General-purpose I\/Os (GPIO) section via the table of contents, then go to Section 6.4 GPIO registers . Looking up register details is a skill you will use constantly — this is practice.    Find GPIOx_MODER (Section 6.4.1). What two-bit value selects input mode? What is the power-on default for all pins?    Find GPIOx_PUPDR . Which two-bit value enables the internal pull-up? Write the C statements that enable the pull-up on PB4 (pin 4 of Port B), using bit masks.   "
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
  "number": "2.2.10",
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
  "body": " Part 4: Button Exercises  These exercises are a head start on Lab 2. You may not finish them in class — that is fine.   Button Exercises   Modify blinkyCNT.c so that pressing the button pauses the counter and releasing resumes it.     Homework (due Thursday): Write toggleLED.c so the on-board LED toggles each time the button is pressed and released: first press turns LED on, second press turns it off, and so on. You will likely observe erratic behavior ( glitches ) — bring your observations to Day 3X.    "
},
{
  "id": "act-day3-button-exercises",
  "level": "2",
  "url": "subsec-day3-button-exercises.html#act-day3-button-exercises",
  "type": "Activity",
  "number": "2.2.5",
  "title": "Button Exercises.",
  "body": " Button Exercises   Modify blinkyCNT.c so that pressing the button pauses the counter and releasing resumes it.     Homework (due Thursday): Write toggleLED.c so the on-board LED toggles each time the button is pressed and released: first press turns LED on, second press turns it off, and so on. You will likely observe erratic behavior ( glitches ) — bring your observations to Day 3X.   "
},
{
  "id": "sec-gpio-input-config",
  "level": "1",
  "url": "sec-gpio-input-config.html",
  "type": "Section",
  "number": "2.3",
  "title": "Configuring a Pin as an Input",
  "body": " Configuring a Pin as an Input  Every GPIO pin on the STM32C031 can be configured as a digital input, digital output, analog input, or alternate function. For a pushbutton we use digital input mode. The internal structure of one I\/O port bit is shown in : an optional internal pull-up or pull-down resistor, a read path (IDR), and a write path (ODR).  The register fields involved in input configuration are:   GPIOx→MODER — two bits per pin. Writing 00 selects input mode (the power-on default). For most input pins no MODER write is needed.   GPIOx→PUPDR — two bits per pin. Writing 01 enables the internal pull-up; 10 enables the pull-down; 00 leaves the pin floating.   GPIOx→IDR — read-only. Bit reflects the current logic level on pin .   Why use a pull-up resistor?  A floating input pin picks up electrical noise and reads unpredictably. Connecting a pull-up resistor (from the pin to VCC) makes the idle state HIGH. When the button closes, it connects the pin to GND, pulling it LOW. This is called active-low logic: pressed = 0, released = 1. The STM32's built-in pull-up resistors are typically 40 kΩ, so no external resistor is needed. shows the breadboard wiring using the internal pull-up. shows the alternative: an external pull-up resistor on the breadboard.   Setting up PB4 (D5 on the Nucleo) as an input with pull-up enabled, as in button.c :  #define GPIOBEN (1U << 1) \/\/ bit 1 of IOPENR enables GPIOB clock #define BUTTON_PIN (1U << 4) \/\/ PB4 = D5 \/\/ 1. Enable GPIOB clock RCC->IOPENR |= GPIOBEN; \/\/ 2. MODER bits [9:8] for PB4 are 00 by default (input mode) \/\/ No MODER write needed. \/\/ 3. Enable internal pull-up on PB4 \/\/ PUPDR bits [9:8]: 01 = pull-up GPIOB->PUPDR |= (1U << 8); \/\/ set bit 8 GPIOB->PUPDR &= ~(1U << 9); \/\/ clear bit 9  After a short settling time (the pull-up charges any stray capacitance; see ; a delay_ms(1) is sufficient), the pin reads HIGH when the button is released and LOW when pressed. Test it with:  \/\/ Active-low: IDR bit = 0 means button is pressed if ((GPIOB->IDR & BUTTON_PIN) == 0) { \/\/ button is pressed — take action here }    With the internal pull-up enabled on PB4 and the button wired from D5 to GND, what value does GPIOB->IDR & BUTTON_PIN return when the button is pressed?   0 (zero)  Correct. Pressing the button pulls the pin to GND, so the IDR bit is 0 (active-low).  1  The pin is HIGH (1) when the button is released , not pressed.  It depends on the MODER setting  MODER selects input vs. output mode, but once in input mode the IDR reflects the pin voltage regardless of PUPDR.  Undefined — floating  The pull-up resistor prevents the pin from floating; it is well-defined as HIGH when the switch is open.     "
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
  "body": " Part 1: Observing and Fixing Bounce  Load your toggleLED.c (or button.c if your homework is not finished). Wire the AD2 with CH1 (orange) on D5 (PB4, button) and CH2 (blue) on D13 (PA5, LED), as shown in .   AD2 wiring for observing button bounce. CH1 (orange) connects to D5\/PB4 (button); CH2 (blue) connects to D13\/PA5 (LED). Minus leads (white stripe) connect to GND.     Capturing Switch Bounce   In Waveforms, configure the trigger as shown in : Source: Channel 1, Type: Edge, Condition: Falling, Level: 1 V. Set the time base to 20 µs\/div. (Depending on your Waveforms version, you may need Normal or Auto trigger mode.)   Waveforms trigger settings for capturing switch bounce. Source: Channel 1 (button signal), Condition: Falling edge, Level: 1 V. Time base 20 µs\/div is a good starting point; adjust if your bounce is shorter or longer.    Click Single , press the button once, and examine the captured waveform. What do you see instead of a clean falling edge?    Use cursors to measure the total duration of the bounce on your button. Compare results with other groups — do all switches bounce the same amount?    Look at channel 2 (LED). How many times does the LED change state during a single physical button press? Why?     Switch bounce captured on CH1 (orange): a single button press produces many rapid HIGH\/LOW transitions before the signal settles low. CH2 (blue) shows the LED toggling on each bounce — not just once. Bounce duration varies by switch, typically 50 µs to a few ms.     Hardware Fix: Adding a Capacitor   Hardware debouncing works by adding a small capacitor across the switch. When the switch closes, the capacitor discharges through the low-resistance contacts rather than bouncing; when the switch opens, the internal pull-up recharges it slowly through its ~40 kΩ resistance. The RC time constant smooths out the bounce spikes. See for the circuit details.   Reading metal film capacitor markings. The three fields encode value, tolerance, and maximum voltage. Value is two digits and a decimal point; the decimal point can be an n (nano), a p (pico), or a dot (micro). Example: .1J63 = 0.1 µF, ±5%, 63 V.     Place a 0.1 µF capacitor from D5 (PB4) to GND on the breadboard, in parallel with the button. The red dashed line shows where the capacitor connects. Identify the correct capacitor by reading its marking code (Task 1 below).      Identify the 0.1 µF capacitor in your kit using its marking code.    Place the capacitor across the button (one leg on the GPIO pin side, the other to GND). Capture the button waveform again with the same scope settings. How has it changed?    Look at channel 2 (LED) again. Does the LED now toggle exactly once per press? Save a screenshot showing both channels, with and without the capacitor, for your lab report.    "
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
  "body": " Hardware Fix: Adding a Capacitor   Hardware debouncing works by adding a small capacitor across the switch. When the switch closes, the capacitor discharges through the low-resistance contacts rather than bouncing; when the switch opens, the internal pull-up recharges it slowly through its ~40 kΩ resistance. The RC time constant smooths out the bounce spikes. See for the circuit details.   Reading metal film capacitor markings. The three fields encode value, tolerance, and maximum voltage. Value is two digits and a decimal point; the decimal point can be an n (nano), a p (pico), or a dot (micro). Example: .1J63 = 0.1 µF, ±5%, 63 V.     Place a 0.1 µF capacitor from D5 (PB4) to GND on the breadboard, in parallel with the button. The red dashed line shows where the capacitor connects. Identify the correct capacitor by reading its marking code (Task 1 below).      Identify the 0.1 µF capacitor in your kit using its marking code.    Place the capacitor across the button (one leg on the GPIO pin side, the other to GND). Capture the button waveform again with the same scope settings. How has it changed?    Look at channel 2 (LED) again. Does the LED now toggle exactly once per press? Save a screenshot showing both channels, with and without the capacitor, for your lab report.   "
},
{
  "id": "subsec-day3x-toggle-problem",
  "level": "1",
  "url": "subsec-day3x-toggle-problem.html",
  "type": "Subsection",
  "number": "2.4.2",
  "title": "Part 2: The Toggle Problem",
  "body": " Part 2: The Toggle Problem  Reading a pin on every iteration of the main loop — checking its state and acting on it — is called polling . It is the simplest way to respond to an input, but it has a subtle problem when the desired action is a toggle. Even with a debounced switch, consider this loop:  while (1) { buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); if (buttonPushed) { GPIOA->ODR ^= LED_PIN; \/\/ toggle LED } }   The Toggle Problem   Predict what this code will do if you press and hold the button for half a second. How many times will the LED toggle? Why?    The loop runs at approximately 12 MHz. Roughly how many times does it execute while a human holds the button down for 200 ms? How many toggles does that produce?    The fix is to detect the transition from unpressed to pressed — not just the level. The code below uses a buttonAlreadyPressed flag to do this. Trace through it: when does the LED toggle? When does it not toggle even though the button is down?  unsigned buttonAlreadyPressed = 0; while (1) { buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); if (!buttonAlreadyPressed && buttonPushed) { GPIOA->ODR ^= LED_PIN; \/\/ toggle on leading edge only buttonAlreadyPressed = 1; } else if (!buttonPushed) { buttonAlreadyPressed = 0; \/\/ reset when released } }    Day 4 will show you a cleaner way to write this same logic — the state machine design pattern. Before then, read and be ready to discuss how the state variable corresponds to buttonAlreadyPressed .    "
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
  "body": " The Toggle Problem   Predict what this code will do if you press and hold the button for half a second. How many times will the LED toggle? Why?    The loop runs at approximately 12 MHz. Roughly how many times does it execute while a human holds the button down for 200 ms? How many toggles does that produce?    The fix is to detect the transition from unpressed to pressed — not just the level. The code below uses a buttonAlreadyPressed flag to do this. Trace through it: when does the LED toggle? When does it not toggle even though the button is down?  unsigned buttonAlreadyPressed = 0; while (1) { buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0); if (!buttonAlreadyPressed && buttonPushed) { GPIOA->ODR ^= LED_PIN; \/\/ toggle on leading edge only buttonAlreadyPressed = 1; } else if (!buttonPushed) { buttonAlreadyPressed = 0; \/\/ reset when released } }    Day 4 will show you a cleaner way to write this same logic — the state machine design pattern. Before then, read and be ready to discuss how the state variable corresponds to buttonAlreadyPressed .   "
},
{
  "id": "subsec-hw-debounce",
  "level": "1",
  "url": "subsec-hw-debounce.html",
  "type": "Subsection",
  "number": "2.5.1",
  "title": "Hardware Debouncing: RC Filter",
  "body": " Hardware Debouncing: RC Filter  The classic hardware fix is to add a small capacitor (e.g., 0.1 µF) across the switch terminals. When the switch closes, the capacitor discharges through the low-resistance closed contacts instead of bouncing. When the switch opens, the internal pull-up recharges the capacitor through its 40 kΩ resistance. The resulting RC time constant smooths out the bounce spikes. Breadboard placement is shown in .   RC debounce circuit: the internal pull-up (Rpu ≈ 40 kΩ) and the external capacitor form an RC low-pass filter. When the switch bounces open, the capacitor recharges slowly through Rpu; if C is large enough, the voltage never rises above V IH during the bounce window.     Effect of capacitor size on bounce suppression. Top: C = 0.01 µF — bounce recovers quickly and can reach V IH , causing spurious edges. Bottom: C = 0.1 µF — bounce recovers so slowly that the voltage stays below V IH , eliminating spurious transitions.     Side-by-side oscilloscope view: without capacitor (left) vs. with 0.1 µF (right). Orange (CH1) = button signal; blue (CH2) = LED. Without debouncing, the LED toggles multiple times per press. With the capacitor, each press produces exactly one toggle.    Hardware debouncing is reliable and requires no CPU time, but adds a component to every button on the board and must be sized for the specific switch.  "
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
  "body": " Part 1: Code Review — toggleLED.c  Set up your Nucleo with your toggleLED.c code (with the 0.15 µF debounce capacitor across the switch) and share it with your group.   toggleLED Code Review   Read each partner's code. Can you follow its logic and explain it line by line? There are at least two valid structures using a buttonAlreadyPressed flag — one checks the flag in the outer if , the other checks buttonPushed first. Are both correct? Is one clearer?    Identify the parts of your code that correspond to FSM concepts: where is the state stored? What are the events ? What action happens on which transition? We will formalize this in the mini-lecture that follows.    "
},
{
  "id": "act-day4-code-review",
  "level": "2",
  "url": "subsec-day4-code-review.html#act-day4-code-review",
  "type": "Activity",
  "number": "2.7.1",
  "title": "toggleLED Code Review.",
  "body": " toggleLED Code Review   Read each partner's code. Can you follow its logic and explain it line by line? There are at least two valid structures using a buttonAlreadyPressed flag — one checks the flag in the outer if , the other checks buttonPushed first. Are both correct? Is one clearer?    Identify the parts of your code that correspond to FSM concepts: where is the state stored? What are the events ? What action happens on which transition? We will formalize this in the mini-lecture that follows.   "
},
{
  "id": "subsec-day4-fsm-lecture",
  "level": "1",
  "url": "subsec-day4-fsm-lecture.html",
  "type": "Subsection",
  "number": "2.7.2",
  "title": "Part 2: The State Machine Pattern",
  "body": " Part 2: The State Machine Pattern  Your toggleLED.c code already implements a finite state machine — the buttonAlreadyPressed variable is the state variable. Here is the same logic expressed as a formal state diagram and then as idiomatic C using typedef enum and switch .   State diagram for the button-toggle FSM. The two states (Unpressed\/Pressed) track whether the button is currently down. The LED toggles exactly once — on the Unpressed→Pressed transition — and the code snippet on each arrow is the C expression that triggers it. The legend (right) maps the color-coded terms to the FSM vocabulary.    #include \"ES28.h\" typedef enum { UNPRESSED, PRESSED } state_t; int main(void) { \/\/ --- GPIO setup (GPIOA: LED on PA5; GPIOB: button on PB4) --- RCC->IOPENR |= (1U << 0) | (1U << 1); \/\/ enable GPIOA and GPIOB clocks GPIOA->MODER &= ~(3U << 10); \/\/ PA5 input (clear) GPIOA->MODER |= (1U << 10); \/\/ PA5 output \/\/ PB4: MODER = 00 (input, default); enable pull-up GPIOB->PUPDR |= (1U << 8); \/\/ PB4 pull-up bit [9:8] = 01 GPIOB->PUPDR &= ~(1U << 9); state_t state = UNPRESSED; while (1) { int btn = !(GPIOB->IDR & (1U << 4)); \/\/ 1 if pressed (active-low) switch (state) { case UNPRESSED: if (btn) { GPIOA->ODR ^= (1U << 5); \/\/ toggle LED on press state = PRESSED; } break; case PRESSED: if (!btn) { state = UNPRESSED; \/\/ wait for release } break; } } }  Because there is no blocking while loop, this FSM can be embedded in a larger main loop that also blinks LEDs, reads a UART, or does other work — the state variable preserves context across iterations.  "
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
  "title": "Part 4: Lab 2 Introduction",
  "body": " Part 4: Lab 2 Introduction  Lab 2 has two design challenges. Read the full spec in and start work on whichever challenge you have not already completed above.   Lab 2 Design Challenges    Challenge 1 — Pause\/resume counter: If your FSM from Part 3 already implements this, review the lab spec and make sure your solution meets all requirements (correct state behavior, debouncing, clean oscilloscope traces).     Challenge 2 — Reaction time game: Draw the state diagram before writing code. How many states does the game have? What are the events (button presses, timer expiry)? What actions does each transition trigger?    "
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
  "body": " Lab 2: Switches and State Machines  Lab 2 has two parts: a Technical Study on RC debouncer design (prelab math), and two Design Challenges implemented on the Nucleo. Read the full lab handout for the prelab deliverables.   Lab 2 breadboard setup: three LEDs (two red WIN LEDs and one green starter LED), two pushbutton switches, and debounce capacitors. Each LED has its own 220 Ω current-limiting resistor.      Design Challenge 1 — Pushbutton Counter   Starting from blinkyCNT.c , implement a button-controlled pause\/resume: pressing the button once pauses the LED counter; pressing again resumes it. Use a 0.15 µF debounce capacitor across the switch. Use the FSM pattern to avoid blocking.     Design Challenge 2 — Reaction Time Game   Each player has a debounced button and a red WIN LED. A third green LED is the start signal. The game runs as follows:   Initially, the green starter LED is on (or blinking rapidly).  Either player presses their button to start the game.  The starter LED flashes three times, one second apart, then glows steadily — this is the go signal.  Each player presses their button as soon as they see the steady light. The first player to press wins; their WIN LED lights (or blinks rapidly) for one second.  The system returns to step 1.   Design with a state machine. Start with a paper state diagram before writing any code; include it in your submission along with pseudocode and a debugging diary.   Optional extensions (no extra points): (a) A false start — pressing before the steady light — awards the win to the other player. (b) Make the delay between the last flash and the steady ON slightly random (run a fast counter in the background and sample it when a player starts the game) to prevent timing the flashes.     "
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
  "body": " Design Challenge 1 — Pushbutton Counter   Starting from blinkyCNT.c , implement a button-controlled pause\/resume: pressing the button once pauses the LED counter; pressing again resumes it. Use a 0.15 µF debounce capacitor across the switch. Use the FSM pattern to avoid blocking.   "
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
  "body": "   The three consecutive LOW bits (D3, D4, D5 = 0) in are indistinguishable from a single long LOW pulse if you don't know the baud rate. What is the only way a receiver can correctly count them as three separate zero bits?     By sampling the wire at exactly the agreed baud rate — once per bit period — so that each 104 µs window is counted as one bit regardless of whether consecutive bits have the same value.  Correct. This is precisely what asynchronous means: there is no shared clock, so both sides must independently maintain the same rate. Any drift causes bits to be miscounted from that point on.    By detecting voltage transitions — the line changes level at each new bit.  Consecutive identical bits produce no transition at all. A receiver that relies on transitions cannot count repeated 0s or 1s correctly.    By measuring the total duration of the LOW pulse and dividing by a standard minimum bit width.  There is no standard minimum — bit width depends on baud rate, which varies across devices. Without knowing the agreed rate, the duration alone tells you nothing about the number of bits.       Could you design a working UART protocol that uses a start bit and 8 data bits but no stop bit? What happens when sending two consecutive bytes where D7 of the first byte is 0 (LOW)?     No. Without the stop bit the line stays LOW after D7 = 0, so there is no HIGH-to-LOW falling edge to signal the start bit of the next byte. The receiver never sees the second byte begin.  Correct. The start bit is detected as a falling edge. The stop bit's sole job is to guarantee the line returns HIGH so that falling edge is possible.    Yes. The gap between bytes is enough for the receiver to reset.  There is no guaranteed gap in a continuous UART stream — bytes can follow immediately one after another. The stop bit is the only guaranteed return to HIGH.    No, but only because the hardware requires it — there is no fundamental protocol reason.  There is a fundamental reason: start-bit detection depends on a falling edge, which requires the line to be HIGH first. The stop bit provides that guarantee.      If the STM32's TX pin is labelled transmit, which pin on the laptop's USB-serial adapter should it connect to, and why?    The laptop's RX pin, because TX on one device must connect to RX on the other — data sent by one must be received by the other.  Correct. TX → RX is the fundamental UART wiring rule. Connecting TX → TX puts two drivers on the same wire and neither device receives the other's signal.    The laptop's TX pin, so both ends agree on the same direction.  This is the most common wiring mistake. Both devices would be transmitting on the same wire with no one listening.    Either pin — UART is symmetric.  UART is asymmetric: TX and RX are separate pins carrying traffic in opposite directions.     "
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
  "body": " If the STM32's TX pin is labelled transmit, which pin on the laptop's USB-serial adapter should it connect to, and why?    The laptop's RX pin, because TX on one device must connect to RX on the other — data sent by one must be received by the other.  Correct. TX → RX is the fundamental UART wiring rule. Connecting TX → TX puts two drivers on the same wire and neither device receives the other's signal.    The laptop's TX pin, so both ends agree on the same direction.  This is the most common wiring mistake. Both devices would be transmitting on the same wire with no one listening.    Either pin — UART is symmetric.  UART is asymmetric: TX and RX are separate pins carrying traffic in opposite directions.    "
},
{
  "id": "subsec-uart-part1",
  "level": "1",
  "url": "subsec-uart-part1.html",
  "type": "Subsection",
  "number": "3.2.1",
  "title": "Part 1: Does printf Work?",
  "body": " Part 1: Does printf Work?   In this first activity you will set up a project that prints a live counter to your laptop over UART — the same workflow you will use as a debugging tool throughout the rest of the course. The figure below shows what the finished project should look like in STM32CubeIDE; use it to check your file placement before you build.   Finished Counter project in STM32CubeIDE. uart.c and uart.h live in Library\/mylib\/ ; counter.c lives in Src\/ . All three files are downloaded from Canvas.     Set Up and Run the Counter    Download counter.c , uart.c , and uart.h from Canvas.  In STM32CubeIDE, right-click TemplateProject and copy it. Rename the copy Counter .  Copy uart.c and uart.h into your mylib folder.  Copy and paste counter.c into Counter\/Src\/ .  Build the project and flash it to your Nucleo.  Open CoolTerm and click Options . Configure the settings shown in the figures below, then click OK. Save the configuration using the toolbar Save button and name the file ENGS28.CoolTermSettings — next time you can reload it instantly with Open . If you open the saved settings but have your Nucleo connected to a different USB port of your laptop and see a serial port not available warning, choose Select a different port and pick the USB modem entry.  Click Connect, then press the black reset button on the Nucleo. You should see the counter incrementing.    CoolTerm Options → Serial Port. Click the Port drop-down and select the entry that looks like a USB modem or USB serial device (on Mac: usbmodem… ; on Windows: COM4 (USB Serial Device) ) — not debug-console or Bluetooth. Set Baudrate to 9600 , Data Bits to 8 , Parity to None , Stop Bits to 1 , and leave all Flow Control boxes unchecked.     CoolTerm Options → Data Handling. Check Format TAB separated text and Convert Non-printable Characters ; leave everything else unchecked.     CoolTerm showing counter output. Each line prints once per 500 ms; pressing the Nucleo reset button restarts from zero.    Once it is working, go to Options, change the Baudrate to 4800, click OK, disconnect, reconnect, and reset the board. Observe the output. Then try 115200. In your notebook, write one sentence explaining each garbled result in terms of bit period.     "
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
  "body": " Set Up and Run the Counter    Download counter.c , uart.c , and uart.h from Canvas.  In STM32CubeIDE, right-click TemplateProject and copy it. Rename the copy Counter .  Copy uart.c and uart.h into your mylib folder.  Copy and paste counter.c into Counter\/Src\/ .  Build the project and flash it to your Nucleo.  Open CoolTerm and click Options . Configure the settings shown in the figures below, then click OK. Save the configuration using the toolbar Save button and name the file ENGS28.CoolTermSettings — next time you can reload it instantly with Open . If you open the saved settings but have your Nucleo connected to a different USB port of your laptop and see a serial port not available warning, choose Select a different port and pick the USB modem entry.  Click Connect, then press the black reset button on the Nucleo. You should see the counter incrementing.    CoolTerm Options → Serial Port. Click the Port drop-down and select the entry that looks like a USB modem or USB serial device (on Mac: usbmodem… ; on Windows: COM4 (USB Serial Device) ) — not debug-console or Bluetooth. Set Baudrate to 9600 , Data Bits to 8 , Parity to None , Stop Bits to 1 , and leave all Flow Control boxes unchecked.     CoolTerm Options → Data Handling. Check Format TAB separated text and Convert Non-printable Characters ; leave everything else unchecked.     CoolTerm showing counter output. Each line prints once per 500 ms; pressing the Nucleo reset button restarts from zero.    Once it is working, go to Options, change the Baudrate to 4800, click OK, disconnect, reconnect, and reset the board. Observe the output. Then try 115200. In your notebook, write one sentence explaining each garbled result in terms of bit period.   "
},
{
  "id": "subsec-uart-printf-usage",
  "level": "1",
  "url": "subsec-uart-printf-usage.html",
  "type": "Subsection",
  "number": "3.2.2",
  "title": "Using printf in Your Code",
  "body": " Using printf in Your Code  Now that printf is routing to your terminal, here is a quick reference for the format specifiers you will reach for throughout the course. The pattern is always the same: a format string containing one specifier per value, followed by the values.  #include \"ES28.h\" \/* always needed for register definitions *\/ #include <stdio.h> \/* for printf *\/ #include \"uart.h\" \/* for uart2_init *\/ \/* NOTE: variable declarations and other initialization omitted below — replace count, ch, and adc_val with your actual variables. *\/ int main(void) { uart2_init(); \/* must be called before any printf *\/ \/* Startup banner — print once before the loop *\/ printf(\"Counter with serial output demo\\r\\n\"); printf(\"Decimal\\tHex\\r\\n\"); while (1) { \/* Signed decimal — counts, ADC readings, sensor values *\/ printf(\"count = %d\\r\\n\", count); \/* 32-bit register value — use %lx (long) because MODER is 32 bits. Make sure the GPIOA clock is enabled before reading this register. *\/ printf(\"MODER = 0x%08lx\\r\\n\", GPIOA->MODER); \/* 16-bit value — use %x (unsigned int) *\/ printf(\"adc_val = 0x%04x\\r\\n\", adc_val); \/* Two columns separated by a tab *\/ printf(\"%d\\t%x\\r\\n\", count, count); \/* Single character *\/ printf(\"key = %c\\r\\n\", ch); \/* String *\/ printf(\"state = %s\\r\\n\", \"ON\"); } }  Two rules to remember every time: end each line with \\r\\n (not just \\n ) so the terminal moves the cursor back to the left edge, and call uart2_init() once at the top of main before any printf .  Note that %f is not supported by the printf library used in this course — floating-point formatting requires a much larger library. To print a floating-point value, convert to integer first: compute int mV = (int)(voltage * 1000) and print printf(\"%d mV\", mV) .  "
},
{
  "id": "subsec-uart-part2",
  "level": "1",
  "url": "subsec-uart-part2.html",
  "type": "Subsection",
  "number": "3.2.3",
  "title": "Part 2: How Does the UART Driver Work?",
  "body": " Part 2: How Does the UART Driver Work?   Below is uart.c with all comments stripped. Annotate your assigned section — explain what each line does and why it is necessary. After eight minutes you will teach your section to a classmate; your goal is that they could explain any line without your help.  #include \"stm32c0xx.h\" #include \"uart.h\" #include <stdio.h> #define APB_CLK 12000000U #define BAUD_RATE 9600U void uart2_init(void) { \/\/ ── Group A ────────────────────────────────────────────────── RCC->IOPENR |= RCC_IOPENR_GPIOAEN; GPIOA->MODER &= ~((3U << 4) | (3U << 6)); GPIOA->MODER |= ((2U << 4) | (2U << 6)); GPIOA->AFR[0] &= ~((0xFU << 8) | (0xFU << 12)); GPIOA->AFR[0] |= ((1U << 8) | (1U << 12)); \/\/ ───────────────────────────────────────────────────────────── \/\/ ── Group B ────────────────────────────────────────────────── RCC->APBENR1 |= RCC_APBENR1_USART2EN; USART2->BRR = APB_CLK \/ BAUD_RATE; USART2->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE; \/\/ ───────────────────────────────────────────────────────────── } \/\/ ── Group C ────────────────────────────────────────────────────── void uart2_write(int ch) { while (!(USART2->ISR & USART_ISR_TXE_TXFNF)) {} USART2->TDR = (ch & 0xFF); } \/\/ ───────────────────────────────────────────────────────────────── \/\/ ── Group D ────────────────────────────────────────────────────── int uart2_read(void) { while (!(USART2->ISR & USART_ISR_RXNE_RXFNE)) {} return USART2->RDR & 0xFF; } \/\/ ─────────────────────────────────────────────────────────────────  "
},
{
  "id": "subsec-uart-part3",
  "level": "1",
  "url": "subsec-uart-part3.html",
  "type": "Subsection",
  "number": "3.2.4",
  "title": "Part 3: Start the Keyboard Counter",
  "body": " Part 3: Start the Keyboard Counter   Your counter currently only sends data. Now make it listen too: pressing a key in CoolTerm should change the count. The challenge is doing this without freezing the 500 ms print loop — use the technique below and test it in CoolTerm.   Keyboard-Controlled Counter   Modify counter.c so that:   The counter no longer auto-increments — it only changes when one of the control keys below is pressed. Any other key, or no key at all, leaves the count unchanged and the same value prints every 500 ms.  Pressing u or U increments the counter.  Pressing d or D decrements it.  Pressing r or R resets it to zero.   Use the RXNE flag for a non-blocking receive: if a byte is waiting in the receive register, read it and act on it; if not, skip straight to the print and delay. Do not call uart2_read() — that function blocks until a byte arrives and will freeze the counter.  while (1) { if (USART2->ISR & USART_ISR_RXNE_RXFNE) { char key = \/* read the character from the right register *\/; \/\/ handle key here ... } printf(\"count = %d\\r\\n\", count); delay_ms(500); }  Test it in CoolTerm: type a key and confirm the count changes on the next print line.   Optional challenge: Change the counter so that pressing u or U sets the direction to up and pressing d or D sets the direction to down — and then the counter keeps incrementing or decrementing automatically every 500 ms, even when no further key is pressed. Pressing r or R resets the count to zero and pauses auto-counting until a new direction key is received.    "
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
  "body": " Step 1: GPIO Alternate Function Configuration  The STM32C031 has two USART instances: USART1 (full feature set) and USART2 (basic feature set — more than enough for this course). Both can be routed to several different pins via the alternate function system, but on the Nucleo board only one set of pins per peripheral is connected via solder bridges to the ST-LINK MCU: for USART2 these are TX on PA2 and RX on PA3. Note that PA2 and PA3 do not appear on the Arduino-compatible headers, but that does not matter here — because the connection to the ST-LINK is made internally on the board, no external wiring is needed at all.   The NUCLEO-C031C6 board. The ST-LINK section (top) contains a separate STM32 that acts as programmer and USB-to-serial bridge. PA2 (TX) and PA3 (RX) of the STM32C031 connect internally to the ST-LINK, which appears on your laptop as a USB serial device.    To use PA2 and PA3 for USART2, two register fields must be configured for each pin. First, the GPIOA_MODER register must be set to 10 (Alternate Function mode) for both pins.   GPIO port mode register (GPIOA_MODER). Each pin occupies two bits: 00 = Input, 01 = Output, 10 = Alternate Function, 11 = Analog. PA2 occupies bits [5:4] and PA3 occupies bits [7:6]; both must be set to 10 .    Setting MODER to 10 puts a pin in Alternate Function mode, but the MCU still needs to know which peripheral to route it to. The alternate function register GPIOA->AFR[0] (covering pins 0–7) stores a 4-bit code for each pin: AF0–AF15 each map to a different peripheral. The table below shows that PA2 and PA3 need AF1, which connects them to USART2.   Port A alternate function mapping (Table 13 from the STM32C031 datasheet). PA2 AF1 = USART2_TX; PA3 AF1 = USART2_RX. Writing 0001 into each pin's four-bit field in AFRL selects AF1.     GPIO Alternate Function Low Register (GPIOx_AFRL). Each pin occupies four bits; PA2 is at bits [11:8] and PA3 is at bits [15:12]. Writing 0001 to each field selects AF1 (USART2).     RCC I\/O port clock enable register (RCC_IOPENR). Setting bit 0 (GPIOAEN) ungates the clock to GPIOA; without this, writes to MODER and AFR have no effect. Reset value is 0x0000 0000 — all GPIO clocks off by default.    \/\/ Step 1: Enable GPIOA clock RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/\/ Step 2: Set PA2 and PA3 to Alternate Function mode (MODER = 10) GPIOA->MODER &= ~((3U << 4) | (3U << 6)); \/\/ clear bits for PA2, PA3 GPIOA->MODER |= ((2U << 4) | (2U << 6)); \/\/ set AF mode (10) \/\/ Step 3: Select AF1 (USART2) for PA2 and PA3 in AFRL GPIOA->AFR[0] &= ~((0xFU << 8) | (0xFU << 12)); \/\/ clear PA2, PA3 AF fields GPIOA->AFR[0] |= ((1U << 8) | (1U << 12)); \/\/ AF1 = USART2  If you look at uart.c , you will see the same operations written differently: each pin is configured in its own pair of lines, and the bit positions are given by named CMSIS macros instead of raw numbers. For example:  GPIOA->MODER &= ~GPIO_MODER_MODE2_Msk; GPIOA->MODER |= (GPIO_ALTERNATE << GPIO_MODER_MODE2_Pos); GPIOA->MODER &= ~GPIO_MODER_MODE3_Msk; GPIOA->MODER |= (GPIO_ALTERNATE << GPIO_MODER_MODE3_Pos);  Both forms do exactly the same thing. The driver style is more verbose but easier to read at a glance: the macro names tell you which pin and which field are being touched without having to count bit positions yourself. The compact form above combines both pins into one line to show the pattern concisely.  "
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
  "body": " Step 2: Enable the USART Clock  Just as GPIOA needed its clock ungated before we could write MODER or AFR, USART2 has its own clock gate that must be opened before any of its registers can be configured. USART2's clock is controlled by bit 17 (USART2EN) of RCC_APBENR1 .   RCC APB peripheral clock enable register (APBENR1). The USART2EN bit (bit 17) must be set before any USART2 register can be written.    \/\/ Enable USART2 clock on the APB bus RCC->APBENR1 |= RCC_APBENR1_USART2EN;  "
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
  "body": " Step 3: Set the Baud Rate  Because UART has no shared clock line, the receiver has no way to know exactly when each bit starts. Its solution is to run its internal sampling clock at 16 times the baud rate, watch for the falling edge of the start bit, count 8 ticks to land in the middle of the start bit, then sample every 16 ticks after that — always reading each bit at its center, where the signal is most stable.   The receiver samples the line at 16× the baud rate (dense tick marks below the waveform). After detecting the start bit's falling edge, it counts 8 ticks to the bit center (black arrow), then samples every 16 ticks to capture each subsequent bit at its center (red arrows).    The USART Baud Rate Register ( USART_BRR ) holds a simple clock divisor (USARTDIV): the hardware divides the APB clock by USARTDIV to produce exactly 16 sample ticks per bit period.   Baud rate generation formula from the reference manual (Section 24.5.7). With oversampling by 16 (OVER8 = 0, the default), the baud rate equals the APB kernel clock divided by USARTDIV, which is simply the integer value written to BRR.    At 9600 baud with a 12 MHz APB clock: Note that BRR must be written before setting UE in CR1.   USART Baud Rate Register (BRR). Bits [15:0] hold USARTDIV — the integer divisor. For 9600 baud with a 12 MHz APB clock the value is 1250 (0x04E2).    #define SYS_FREQ 12000000U \/\/ 12 MHz HSI clock #define APB_CLK SYS_FREQ \/\/ APB prescaler = 1 #define UART_BAUD_RATE 9600U USART2->BRR = APB_CLK \/ UART_BAUD_RATE; \/\/ = 1250  If you look at uart.c , you will see the driver write (PeriphClk + BaudRate\/2) \/ BaudRate instead of plain division. Adding half the divisor before dividing is a standard integer rounding trick: it gives rather than , so the result is accurate even when the clock frequency is not evenly divisible by the baud rate. With 12 MHz and 9600 baud the division is exact, so both formulas give 1250.  "
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
  "body": " Step 4: Enable Transmitter, Receiver, and USART   USART_CR1 and USART_CR2 together control the frame format and operating mode. The good news is that the reset value of 0x00000000 already gives us 8 data bits, 1 stop bit, no parity, and oversampling by 16 — exactly what we need for 8N1 operation. The only bits we must set explicitly are TE (bit 3, transmitter enable), RE (bit 2, receiver enable), and UE (bit 0, USART enable). UE must be set last.   USART_CR1 (top) and USART_CR2 (bottom) with the relevant bits annotated. The reset value of 0x0000 0000 already selects oversampling by 16 (OVER8 = 0), 8 data bits (M0 = M1 = 0), no parity (PCE = 0), and 1 stop bit (STOP[1:0] = 00). The only bits to write are TE, RE, and UE — in that order.    \/\/ Enable transmitter (TE) and receiver (RE), then enable USART (UE) last USART2->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE;  "
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
  "body": "   uart2_write spins waiting for the TXE flag before writing to TDR. What does TXE indicate, and what would happen if you removed that check and wrote to TDR immediately on every call?    TXE (Transmit Data Register Empty) means the hardware shift register has consumed the previous byte and TDR can accept a new one. Skipping the check and writing TDR while the previous byte is still being shifted out would overwrite it, silently dropping that character.  Correct. TXE is the ready handshake between your code and the hardware shift register. Ignoring it causes data loss at high data rates or back-to-back writes.    TXE means a transmit error occurred; skipping the check causes the USART to assert a fault interrupt.  TXE stands for Transmit Data Register Empty — it is a readiness flag, not an error flag. Transmit errors use different flags (e.g. framing error, noise error).    Removing the check would make transmission faster with no side effects because the USART hardware buffers bytes automatically.  The STM32C031 USART has only a one-byte TDR — there is no deeper FIFO in basic mode. Consecutive writes without checking TXE overwrite the previous byte before it leaves the chip.      The retarget layer sends each character to uart2_write without modification. If you call printf(\"Alpha\\nBeta\\nGamma\\n\") , what will the output look like in CoolTerm, and what change to the format string would fix it?    CoolTerm treats '\\n' (line feed, ASCII 10) as \"move cursor down\" but not \"return to column 0.\" The three words appear in a staircase, each shifted one column to the right of the one above. Changing the format string to use \"\\r\\n\" instead of \"\\n\" sends a carriage return first, which moves the cursor to column 0 before the line feed advances to the next line.  Correct — '\\r' (ASCII 13) is the carriage return that moves the cursor to column 0. Because the retarget layer does not insert it automatically, your format strings must include it explicitly.    CoolTerm automatically converts bare '\\n' to CR+LF, so the output looks correct with no change needed.  CoolTerm's default mode does not perform LF→CRLF translation. Some terminal applications offer this as an option, but relying on it makes your code non-portable and hides the underlying issue.    The terminal displays a literal backslash-n between the words instead of a newline.  '\\n' in a C string literal is the control character ASCII 10, not the two printable characters \\ and n . The terminal does receive a line feed and does advance the cursor — just not back to column 0.      The driver enables USART2 with RCC->APBENR1 . When you adapt the driver for USART1 in the lab exercise, you will need a different register. How would you find out which APB bus a given peripheral is connected to?    Look at the STM32C031 reference manual's clock tree diagram or the RCC chapter's register descriptions. Each APBENR register lists the peripherals on that bus; searching the register map for \"USART1EN\" reveals which register contains the enable bit and therefore which bus it is on.  Correct. The reference manual is the authoritative source. Note that USART1 is an APB2 peripheral, so its enable bit is in RCC->APBENR2 , not APBENR1 .    All USART peripherals are on the same bus, so you can always use the same RCC register.  USART1 is on APB2 while USART2 is on APB1. Using APBENR1 to try to enable USART1 sets a different bit (or none at all), and the USART1 clock remains gated off.    The peripheral number tells you the bus: odd-numbered USARTs are on APB1, even-numbered on APB2.  This is a convenient rule of thumb for some MCU families but it does not hold for the STM32C031. Always verify with the datasheet or reference manual.     "
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
  "body": " The driver enables USART2 with RCC->APBENR1 . When you adapt the driver for USART1 in the lab exercise, you will need a different register. How would you find out which APB bus a given peripheral is connected to?    Look at the STM32C031 reference manual's clock tree diagram or the RCC chapter's register descriptions. Each APBENR register lists the peripherals on that bus; searching the register map for \"USART1EN\" reveals which register contains the enable bit and therefore which bus it is on.  Correct. The reference manual is the authoritative source. Note that USART1 is an APB2 peripheral, so its enable bit is in RCC->APBENR2 , not APBENR1 .    All USART peripherals are on the same bus, so you can always use the same RCC register.  USART1 is on APB2 while USART2 is on APB1. Using APBENR1 to try to enable USART1 sets a different bit (or none at all), and the USART1 clock remains gated off.    The peripheral number tells you the bus: odd-numbered USARTs are on APB1, even-numbered on APB2.  This is a convenient rule of thumb for some MCU families but it does not hold for the STM32C031. Always verify with the datasheet or reference manual.    "
},
{
  "id": "subsec-datasheets-intro",
  "level": "1",
  "url": "subsec-datasheets-intro.html",
  "type": "Subsection",
  "number": "4.1.1",
  "title": "Embedded Systems Need Peripherals",
  "body": " Embedded Systems Need Peripherals  A microcontroller on its own senses nothing and drives nothing. Every useful embedded system connects the MCU to the physical world through input and output components:   Top-level view of an embedded system. Sensors, switches, and data streams feed into the MCU through interfaces; the MCU sends commands out to displays, actuators, and data streams through interfaces on the other side.    Getting a peripheral to work requires answers to many questions that only the component's datasheet can provide. What supply voltage does it need — and what are the minimum and maximum operating conditions it can tolerate? What signal does it produce or consume, and what does that signal actually represent? Does the chip do its own analog-to-digital conversion and give you numbers over I²C, or does it output a raw voltage that your MCU's ADC must interpret? Is there a built-in analog front end, or do you need external signal conditioning? How should you wire it up, and what does your code need to configure before it will respond? These are a few of the essential questions — but not the only ones.  Datasheets can be intimidating — they are written for engineers who already know the jargon, and they pack enormous amounts of information into dense tables. But they follow a predictable structure. Once you know where to look, you can navigate any datasheet quickly.   Every Datasheet Has the Same Skeleton  The first page always gives the high-level picture: Features (a bullet list of what the part does) and a Description paragraph (always read this — it names the interface and application). The body then contains, roughly in this order:   Pinout \/ Pin descriptions — which pin is which, and what each one does. Absolute Maximum Ratings — never exceed these; doing so destroys the part. Recommended Operating Conditions — the range the part is designed to work in. Electrical Characteristics — voltages, currents, timing, in a table with Min \/ Typ \/ Max columns. Application Information (sometimes called \"Theory of Operation\" or \"Detailed Description\") — the most important section for a designer: example schematics, register maps, and usage notes. Packaging Information — physical dimensions of the available package options (DIP, SOT-23, QFN, etc.). Rarely relevant for breadboard work, but critical if you are designing a PCB.  One notation to watch for: a pin name with a bar over it (or a star next to it in a table) is active low — you pull it to ground to activate it, rather than driving it high.   "
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
  "title": "Every Datasheet Has the Same Skeleton.",
  "body": " Every Datasheet Has the Same Skeleton  The first page always gives the high-level picture: Features (a bullet list of what the part does) and a Description paragraph (always read this — it names the interface and application). The body then contains, roughly in this order:   Pinout \/ Pin descriptions — which pin is which, and what each one does. Absolute Maximum Ratings — never exceed these; doing so destroys the part. Recommended Operating Conditions — the range the part is designed to work in. Electrical Characteristics — voltages, currents, timing, in a table with Min \/ Typ \/ Max columns. Application Information (sometimes called \"Theory of Operation\" or \"Detailed Description\") — the most important section for a designer: example schematics, register maps, and usage notes. Packaging Information — physical dimensions of the available package options (DIP, SOT-23, QFN, etc.). Rarely relevant for breadboard work, but critical if you are designing a PCB.  One notation to watch for: a pin name with a bar over it (or a star next to it in a table) is active low — you pull it to ground to activate it, rather than driving it high.  "
},
{
  "id": "subsec-datasheets-scavenger",
  "level": "1",
  "url": "subsec-datasheets-scavenger.html",
  "type": "Subsection",
  "number": "4.1.2",
  "title": "Datasheet Scavenger Hunt",
  "body": " Datasheet Scavenger Hunt  Your table will be assigned one component. Open its datasheet from Canvas, display it on your table's monitor, and complete the Datasheet Passport below. Be ready to share your answers with the class in the last five minutes.  Possible components (one per table): TMP235 (analog temperature sensor), CdS photocell (light-dependent resistor), LSM303AGR (I²C accelerometer and magnetometer), HT16K33 (I²C LED matrix driver), and others as assigned.   The Datasheet Passport   Work through all four parts. Some questions have two versions depending on whether your component is analog or digital — answer the one that applies. If you finish early, sketch a circuit on the board showing how you would connect your component to the STM32 Nucleo.    Part A — What Is It?  These answers are on the first page.    Read the Description (not the Features list). In one sentence, what does this component do?    Find the Recommended Operating Conditions . What supply voltage range (VDD or VCC) does the part accept? Is 3.3 V within that range? (For passive components with no supply pin, find the maximum rated operating voltage and power dissipation instead.)    Find the Absolute Maximum Ratings table. What is the maximum voltage the part can survive? Are there any other limits listed that a careless user might accidentally exceed?      Part B — How Does It Communicate?  These answers are in the Pinout and Application sections.    What interface does this component use? Check one (or more if it supports multiple): Passive (variable resistance) , Analog voltage output , I²C , SPI , UART\/serial , PWM input , Other .    List every pin needed for a minimal hookup. For each pin, write its name and what it connects to (VDD, GND, a specific STM32 pin, etc.).      Part C — What Does It Output or Require?  These answers are in the Electrical Characteristics table.     If your component is a passive sensor (variable resistance): What is the resistance at the minimum and maximum of its measurement range? Is the relationship between resistance and the measured quantity linear, or does the datasheet give a curve or formula?   If your component has an analog voltage output: What is the output voltage at the minimum and maximum of its measurement range? Is the relationship linear? Write the transfer function — the equation that converts output voltage to a physical value (temperature, light level, etc.).   If your component uses I²C: What address(es) can the part use? Many parts have a fixed base address with one or two address pins (A0, A1) that let you set the last bits, so multiple copies of the same chip can share a bus. List the possible addresses.   If your component uses SPI: What SPI mode does it require (clock polarity CPOL and clock phase CPHA)? What is the maximum clock frequency it supports?    What is the maximum current the part draws from its supply? Does that rule out powering it from a GPIO pin (max 25 mA)? (For passive components with no supply pin, find the maximum power dissipation rating instead.)      Part D — Making It Work  These answers are in the Application Information section.    Find the example schematic or application circuit. Sketch the minimal hookup on the board at your table — just power, ground, and signal lines, labeled with pin names.    Name one thing you would need to configure or calculate in code before you could read data from this component. (Examples: set the I²C address, choose a gain setting, apply a conversion formula to the raw ADC reading.)    What was the most confusing or surprising thing you found in the datasheet?      Part E — Group Slide  Add one slide for your component to the shared class deck (link on Canvas). Include your answers to all of Parts A–D — everything except the board sketch. Keep it concise: use short phrases, not paragraphs. Other groups will use this as a reference during the share-out.    "
},
{
  "id": "act-datasheet-passport",
  "level": "2",
  "url": "subsec-datasheets-scavenger.html#act-datasheet-passport",
  "type": "Activity",
  "number": "4.1.1",
  "title": "The Datasheet Passport.",
  "body": " The Datasheet Passport   Work through all four parts. Some questions have two versions depending on whether your component is analog or digital — answer the one that applies. If you finish early, sketch a circuit on the board showing how you would connect your component to the STM32 Nucleo.    Part A — What Is It?  These answers are on the first page.    Read the Description (not the Features list). In one sentence, what does this component do?    Find the Recommended Operating Conditions . What supply voltage range (VDD or VCC) does the part accept? Is 3.3 V within that range? (For passive components with no supply pin, find the maximum rated operating voltage and power dissipation instead.)    Find the Absolute Maximum Ratings table. What is the maximum voltage the part can survive? Are there any other limits listed that a careless user might accidentally exceed?      Part B — How Does It Communicate?  These answers are in the Pinout and Application sections.    What interface does this component use? Check one (or more if it supports multiple): Passive (variable resistance) , Analog voltage output , I²C , SPI , UART\/serial , PWM input , Other .    List every pin needed for a minimal hookup. For each pin, write its name and what it connects to (VDD, GND, a specific STM32 pin, etc.).      Part C — What Does It Output or Require?  These answers are in the Electrical Characteristics table.     If your component is a passive sensor (variable resistance): What is the resistance at the minimum and maximum of its measurement range? Is the relationship between resistance and the measured quantity linear, or does the datasheet give a curve or formula?   If your component has an analog voltage output: What is the output voltage at the minimum and maximum of its measurement range? Is the relationship linear? Write the transfer function — the equation that converts output voltage to a physical value (temperature, light level, etc.).   If your component uses I²C: What address(es) can the part use? Many parts have a fixed base address with one or two address pins (A0, A1) that let you set the last bits, so multiple copies of the same chip can share a bus. List the possible addresses.   If your component uses SPI: What SPI mode does it require (clock polarity CPOL and clock phase CPHA)? What is the maximum clock frequency it supports?    What is the maximum current the part draws from its supply? Does that rule out powering it from a GPIO pin (max 25 mA)? (For passive components with no supply pin, find the maximum power dissipation rating instead.)      Part D — Making It Work  These answers are in the Application Information section.    Find the example schematic or application circuit. Sketch the minimal hookup on the board at your table — just power, ground, and signal lines, labeled with pin names.    Name one thing you would need to configure or calculate in code before you could read data from this component. (Examples: set the I²C address, choose a gain setting, apply a conversion formula to the raw ADC reading.)    What was the most confusing or surprising thing you found in the datasheet?      Part E — Group Slide  Add one slide for your component to the shared class deck (link on Canvas). Include your answers to all of Parts A–D — everything except the board sketch. Keep it concise: use short phrases, not paragraphs. Other groups will use this as a reference during the share-out.   "
},
{
  "id": "subsec-datasheets-shareout",
  "level": "1",
  "url": "subsec-datasheets-shareout.html",
  "type": "Subsection",
  "number": "4.1.3",
  "title": "Share-Out",
  "body": " Share-Out  Each table presents their slide in 30 seconds or less. Cover at least these three things:   Component name and what it does (one sentence).  Interface type: passive, analog, I²C, SPI, or other.  One thing that surprised you or that others should know.   As you listen, note which components use analog interfaces and which use digital ones. You will use several of these parts later in the course — this is your first look at them.  "
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
  "body": " Discussion: The Receive Buffer   What actually happens during delay_ms ? The USART hardware keeps receiving independently of the CPU — it does not pause during delay_ms . When a byte arrives, the shift register assembles the bits and transfers the byte into RDR, setting the RXNE flag. That byte then sits in RDR until the next time the loop checks RXNE, up to 500 ms later. So one keypress is effectively buffered for free.  A second key pressed while RDR is still full is a different story. The shift register receives it correctly, but when it tries to transfer to RDR — which is occupied — the hardware sets the Overrun Error (ORE) flag and the new byte is silently discarded. The first key survives; any key after it is lost. The program has no way of knowing anything was dropped.  This is not a bug — it is a deliberate trade-off that works fine for a slow manual counter. The general fix is a UART receive interrupt: every incoming byte immediately triggers an ISR that stores it in a software queue, decoupling reception speed from the main loop's pace. That pattern comes up later in the course.  "
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
  "body": " Part 2: STM32 Bit-Manipulation Macros  Every register write you have done so far has used raw numeric constants — bit positions counted by hand, masks written as hex literals. That works, but it is fragile: a wrong shift value is invisible to the compiler and can be very hard to spot in a code review.  The CMSIS headers (included through ES28.h ) define a named macro for every bit field in every register. Each field gets a mask ( _Msk ) and a position ( _Pos ) constant. The pattern is always the same: clear the field first, then OR in the value shifted into place. To make this concrete, we will use the MODER register to show how to configure PA5 as an output pin.   The MODER register. Each pin has a 2-bit field. CMSIS defines GPIO_MODER_MODE5_Msk (the mask for pin 5's field) and GPIO_MODER_MODE5_Pos (the bit position, 10), so you never need to count bits by hand.    \/\/ Raw version — a wrong constant is a silent bug GPIOA->MODER &= ~(1U << 11); \/\/ clear bit 11 of the MODE5 field GPIOA->MODER &= ~(1U << 10); \/\/ clear bit 10 of the MODE5 field GPIOA->MODER |= (1U << 10); \/\/ set bit 10 (output mode = 0b01) \/\/ Macro version — names are checked by the compiler GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk; GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);  The ES28 header defines convenient mode constants: GPIO_INPUT (0), GPIO_OUTPUT (1), GPIO_ALTERNATE (2), and GPIO_ANALOG (3).   CMSIS macro naming conventions for common GPIO configurations. The same pattern extends to every peripheral register in the device.     Rewriting with Macros   The code below configures PB5 as an output — the pin that will drive the transistor base in the lab. It is written with raw constants. Rewrite it using CMSIS macros.  \/\/ Enable GPIOB clock RCC->IOPENR |= (1U << 1); \/\/ Set PB5 to output mode GPIOB->MODER &= ~(1U << 11); \/\/ clear bit 11 of the MODE5 field GPIOB->MODER &= ~(1U << 10); \/\/ clear bit 10 of the MODE5 field GPIOB->MODER |= (1U << 10); \/\/ set bit 10 (output mode = 0b01) \/\/ Drive PB5 high GPIOB->ODR |= (1U << 5);    Rewrite the three MODER lines using GPIO_MODER_MODE5_Msk , GPIO_MODER_MODE5_Pos , and GPIO_OUTPUT .    The RCC->IOPENR line enables the GPIOB clock with a raw bit shift. What CMSIS macro would replace (1U << 1) ? (Hint: look at how GPIOA's clock was enabled in the UART driver.)    Rewrite the ODR line using the CMSIS macro GPIO_ODR_OD5 instead of the raw bit shift (1U << 5) .    "
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
  "body": " Part 3: Designing a Low-Side NPN Driver  From the pre-class reading you know that a transistor can act as a switch — but where exactly does the load connect? The answer depends on transistor type: for an NPN, the load sits above the collector (between the supply and C); for a PNP, the load sits below the collector (between C and ground).   NPN low-side switch (left): load connects between the supply and the collector, emitter to ground. PNP high-side switch (right): emitter connects to the supply, load connects below the collector to ground.    In this course you will use NPN transistors as low-side switches. The circuit below is one example you will analyze in lab. The load sits between the supply and the collector. A small resistor — the base-current limiting resistor — connects the GPIO pin ( ) to the base. The emitter goes to ground.   NPN low-side driver circuit. must be chosen so that base current is large enough to saturate the transistor (fully on) while staying within the GPIO pin's safe output limit.    The key design question is: what value should be? The goal is to supply enough base current to push the transistor into saturation — fully on — while keeping that current within the GPIO pin's safe limit.   Choosing R lim   Given: a load that needs 100 mA from a 5 V supply. The NPN transistor has and . The GPIO outputs .   Step 1 — collector current: the load sets .   Step 2 — minimum base current to saturate:     Step 3 — apply a safety margin. Component tolerances and temperature variation mean the real can be lower than the datasheet minimum. A factor of 2 is standard, so target .   Step 4 — voltage across R lim : KVL around the base-emitter loop gives    Step 5 — resistance:  Choose the nearest standard value at or below this (e.g., 620 Ω or 560 Ω) to ensure the transistor stays in saturation.   For a low-side MOSFET switch, no base-current calculation is needed — the gate is purely capacitive and draws no steady current. Check two numbers in the datasheet: must be below 3.3 V (logic-level compatible), and maximum drain current must exceed your load current. If both hold, drive the gate HIGH to switch on and LOW to switch off. No R lim is needed.  The lab also introduces a high-side PFET driver , where the transistor sits between the supply and the load. A PFET turns on when — pulling the gate LOW with respect to the supply turns the load on. The full analysis is in the lab handout.  "
},
{
  "id": "fig-low-high-side-topology",
  "level": "2",
  "url": "subsec-npn-driver-design.html#fig-low-high-side-topology",
  "type": "Figure",
  "number": "5.2.3",
  "title": "",
  "body": " NPN low-side switch (left): load connects between the supply and the collector, emitter to ground. PNP high-side switch (right): emitter connects to the supply, load connects below the collector to ground.   "
},
{
  "id": "fig-npn-low-side-circuit",
  "level": "2",
  "url": "subsec-npn-driver-design.html#fig-npn-low-side-circuit",
  "type": "Figure",
  "number": "5.2.4",
  "title": "",
  "body": " NPN low-side driver circuit. must be chosen so that base current is large enough to saturate the transistor (fully on) while staying within the GPIO pin's safe output limit.   "
},
{
  "id": "ex-npn-rlim",
  "level": "2",
  "url": "subsec-npn-driver-design.html#ex-npn-rlim",
  "type": "Check Your Understanding",
  "number": "5.2.5",
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
  "body": " Part 4: MOSFETs  A MOSFET has three terminals: Gate (G), Drain (D), and Source (S). Unlike the BJT, it is voltage-controlled — the gate draws essentially no current in steady state because it is insulated from the channel by a thin oxide layer. When the gate-to-source voltage exceeds the threshold , a conductive channel opens between drain and source.   N-channel enhancement MOSFET schematic symbol with Gate (g), Drain (d), and Source (s) labeled. The gap between the gate line and the channel represents the insulating oxide layer.    For an N-channel low-side switch the load connects between the supply and the drain; the source goes to ground. Drive the gate HIGH to turn on, LOW to turn off — no limiting resistor needed. A P-channel MOSFET (PFET) flips the topology: source at the supply, drain below, and the device turns on when the gate is pulled LOW.   N-channel low-side switch. Load sits between the supply and the drain; source to ground.     P-channel high-side switch. Source connects to the supply; load hangs below the drain.    For direct GPIO drive, must be below 3.3 V — these are called logic-level MOSFETs. MOSFETs are also easy to saturate fully, which makes them reliable for fast switching without the careful sizing a BJT requires. One caution: the thin gate oxide that gives MOSFETs their voltage-controlled behavior also makes them vulnerable to damage from electrostatic discharge (ESD) — handle them carefully.    BJT vs. MOSFET: key differences for embedded switching     MOSFET  BJT    Terminals  Gate (G), Drain (D), Source (S)  Base (B), Collector (C), Emitter (E)    Controlling quantity  Voltage on the gate; gate current is essentially zero  Current into the base; must be supplied continuously while device is on    Saturation  Easy to saturate fully; no base-resistor calculation needed  Requires careful sizing to guarantee saturation    Power consumption  Lower — no steady-state gate current  Higher — base current flows whenever the device is on    Switching speed  Excellent for embedded use; gate capacitance limits very high-frequency switching  Can be slightly faster at very high frequencies (no gate capacitance to charge), at the cost of more power    ESD sensitivity  Vulnerable — the thin gate oxide is easily damaged by static discharge  More robust to ESD      "
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
  "number": "5.2.6",
  "title": "",
  "body": " N-channel enhancement MOSFET schematic symbol with Gate (g), Drain (d), and Source (s) labeled. The gap between the gate line and the channel represents the insulating oxide layer.   "
},
{
  "id": "fig-nfet-lowside-inclass",
  "level": "2",
  "url": "subsec-mosfet-intro.html#fig-nfet-lowside-inclass",
  "type": "Figure",
  "number": "5.2.7",
  "title": "",
  "body": " N-channel low-side switch. Load sits between the supply and the drain; source to ground.   "
},
{
  "id": "fig-pfet-highside-inclass",
  "level": "2",
  "url": "subsec-mosfet-intro.html#fig-pfet-highside-inclass",
  "type": "Figure",
  "number": "5.2.8",
  "title": "",
  "body": " P-channel high-side switch. Source connects to the supply; load hangs below the drain.   "
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
  "body": " Part 5: Reading Transistor Datasheets  When you open a transistor datasheet you will often see three columns for a single parameter: Min , Typ , and Max . This is not sloppiness — it reflects real manufacturing variation. No two BJTs or MOSFETs coming off the same production line are identical; a parameter like ( ) can vary by a factor of three or more across a single batch. Manufacturers characterize this spread statistically: Min and Max mark the 3 boundaries of the distribution (only about 0.15% of parts fall outside on either end), and Typ is the mean — the value you are most likely to see in any individual part.  Which column should you use? It depends on what question you are asking.   Will my circuit function at all? Use the worst-case minimum. If you design for , the transistor will saturate even if you happen to pull the weakest part from the box. Designing for instead means your circuit fails for the vast majority of real parts.   Will my circuit break or overheat? Use the worst-case maximum. To check whether you stay inside a power or voltage limit you must assume the highest plausible value — the part that runs hottest, conducts most, or swings highest.  The general rule: ask does a higher or lower value make it harder for my design to succeed? and use that value. Keep in mind that none of these numbers are fixed — , , and all shift with temperature, so for critical designs you would also check the datasheet graphs to see how the Min or Max moves when the circuit gets hot or cold.  Use the datasheets linked on Canvas to fill in the tables below.   BJT Datasheets  Record the type (NPN or PNP), the DC current gain , and the maximum continuous collector current for each device. When a range of values is listed, record the minimum — that is what governs a worst-case design.        Part Number  Type (NPN or PNP)  (minimum)  Max collector current   KSC2073  TIP42  2N3906  2N3904     MOSFET Datasheets  Record the type (NFET or PFET), the threshold voltage , and the maximum continuous drain current. Pay attention to the sign of for PFET devices.        Part Number  Type (NFET or PFET)  Threshold voltage  Max drain current   IRF9Z24  BS250P  IRFZ24  BS107P    "
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
  "id": "subsec-adc-quantization",
  "level": "1",
  "url": "subsec-adc-quantization.html",
  "type": "Subsection",
  "number": "6.1.1",
  "title": "Quantization: Turning Voltage into a Number",
  "body": " Quantization: Turning Voltage into a Number  An ADC divides its input voltage range into a finite number of equal steps and reports which step the input falls into. The number of steps is determined by the ADC's resolution , expressed in bits. A -bit ADC produces possible output values, mapping the input range to integers .   The ADC in one picture: a continuously varying analog signal enters on the left; the converter samples it periodically (at rate ) and outputs a sequence of integers on the right. Each integer represents the signal's voltage at that instant, expressed as a binary number. The reference voltage sets the top of the measurable range.    The STM32C031C6's ADC has bits, giving 4096 steps over a 0–3.3 V range. Each step — called one LSB (least significant bit) — represents: To recover a voltage from a raw count: So a count of 2048 corresponds to approximately — half of the reference voltage.   The ADC transfer curve. The overall relationship between input voltage ( ) and digital output ( ) is a straight line from (0, 0) to (3.3 V, 4095). Zooming in reveals that the line is actually a staircase: every tiny step is one LSB wide, the rounding error that results from mapping a continuous voltage to a discrete integer.    The finite step size means the ADC can never represent a voltage perfectly — it rounds to the nearest step. The worst-case rounding error is half an LSB, about 0.4 mV for the STM32 ADC. Choosing higher resolution (more bits) makes the steps smaller and the rounding error smaller, at the cost of a longer conversion time.  Although the STM32C031's ADC hardware supports 12-bit resolution, it can also be configured to produce 10-bit, 8-bit, or 6-bit results. Lower resolution means fewer successive-approximation steps and therefore a faster conversion — useful when speed matters more than precision.  "
},
{
  "id": "subsec-adc-quantization-2",
  "level": "2",
  "url": "subsec-adc-quantization.html#subsec-adc-quantization-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "resolution "
},
{
  "id": "fig-adc-concept",
  "level": "2",
  "url": "subsec-adc-quantization.html#fig-adc-concept",
  "type": "Figure",
  "number": "6.1.1",
  "title": "",
  "body": " The ADC in one picture: a continuously varying analog signal enters on the left; the converter samples it periodically (at rate ) and outputs a sequence of integers on the right. Each integer represents the signal's voltage at that instant, expressed as a binary number. The reference voltage sets the top of the measurable range.   "
},
{
  "id": "subsec-adc-quantization-4",
  "level": "2",
  "url": "subsec-adc-quantization.html#subsec-adc-quantization-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "LSB "
},
{
  "id": "fig-adc-transfer-curve",
  "level": "2",
  "url": "subsec-adc-quantization.html#fig-adc-transfer-curve",
  "type": "Figure",
  "number": "6.1.2",
  "title": "",
  "body": " The ADC transfer curve. The overall relationship between input voltage ( ) and digital output ( ) is a straight line from (0, 0) to (3.3 V, 4095). Zooming in reveals that the line is actually a staircase: every tiny step is one LSB wide, the rounding error that results from mapping a continuous voltage to a discrete integer.   "
},
{
  "id": "subsec-adc-successive-approx",
  "level": "1",
  "url": "subsec-adc-successive-approx.html",
  "type": "Subsection",
  "number": "6.1.2",
  "title": "Successive Approximation: How the Conversion Happens",
  "body": " Successive Approximation: How the Conversion Happens  The STM32 ADC uses a technique called successive approximation . The idea is similar to a binary search: the converter narrows in on the correct answer one bit at a time, starting from the most significant bit.  Internally, the ADC contains a DAC (digital-to-analog converter) and a comparator. On each step, the DAC generates a test voltage and the comparator checks whether the input is above or below it. If the input is above, that bit is set to 1 and the next test voltage is set higher; if below, the bit is 0 and the next test voltage is set lower. After comparisons the result is complete.   Block diagram of the SAR ADC architecture. The SAR register drives the DAC one bit at a time. The DAC converts the current register value to a test voltage using . The sample-and-hold circuit freezes at the moment conversion begins. The comparator checks whether the held input is above or below the test voltage and feeds the result ( ) back to the SAR register, which sets or clears that bit and moves to the next one.    For a 12-bit ADC this takes 12 comparison cycles plus some overhead. At the STM32C031's ADC clock the full conversion completes in a few microseconds — fast enough to sample most sensors thousands of times per second, but not instantaneous. Your code must wait for the conversion to finish (the hardware sets a done flag in a status register) before reading the result register.  A built-in sample-and-hold circuit captures the input voltage at the moment the conversion starts and holds it steady throughout the successive approximation. This means the voltage on the pin is free to change during the conversion without affecting the result — the ADC is working from the snapshot it took at the beginning, not the live pin voltage.  "
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
  "body": "DAC "
},
{
  "id": "fig-sar-block-concept",
  "level": "2",
  "url": "subsec-adc-successive-approx.html#fig-sar-block-concept",
  "type": "Figure",
  "number": "6.1.3",
  "title": "",
  "body": " Block diagram of the SAR ADC architecture. The SAR register drives the DAC one bit at a time. The DAC converts the current register value to a test voltage using . The sample-and-hold circuit freezes at the moment conversion begins. The comparator checks whether the held input is above or below the test voltage and feeds the result ( ) back to the SAR register, which sets or clears that bit and moves to the next one.   "
},
{
  "id": "subsec-adc-successive-approx-6",
  "level": "2",
  "url": "subsec-adc-successive-approx.html#subsec-adc-successive-approx-6",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "sample-and-hold "
},
{
  "id": "rq-adc-how-it-works",
  "level": "1",
  "url": "rq-adc-how-it-works.html",
  "type": "Check Your Understanding",
  "number": "6.1.3",
  "title": "Check Your Understanding",
  "body": "  A 12-bit ADC has . What voltage does one LSB represent, and what is the maximum representable voltage?    One LSB ≈ 0.81 mV; maximum representable voltage ≈ 3.2992 V (count 4095).  Correct. One LSB = 3.3 V \/ 4096 ≈ 0.806 mV. Count 4095 gives — not quite 3.3 V, because the ADC uses 4096 steps starting from 0.    One LSB = 3.3 V; maximum = 4095 V.  The LSB is a fraction of , not equal to it. The maximum output is an integer count, not a voltage.    One LSB ≈ 0.81 mV; maximum representable voltage = 3.3 V (count 4096).  Close — the LSB value is right, but a 12-bit ADC produces counts 0–4095, not 0–4096. Count 4096 does not exist; the highest count is 4095.    One LSB = 12 mV; maximum representable voltage = 3.3 V.  12 mV would be the LSB of a roughly 8-bit ADC (3.3 V \/ 256 ≈ 12.9 mV). For 12 bits the LSB is much smaller: about 0.81 mV.      You start an ADC conversion by writing to the control register, then immediately read the result register. The value is always 0 regardless of the input voltage. What is the most likely cause?    You are reading the result before the conversion is complete; the result register still holds its reset value of 0.  Correct. A successive-approximation ADC takes several microseconds to complete. The code must poll the end-of-conversion flag in the status register and wait for it to be set before reading the result.    The GPIO pin for PA0 must be set to output mode before an ADC conversion can start.  The opposite is true: the pin must be in analog mode (not output mode) to allow the ADC input circuitry to connect to it. Setting it as an output would actually interfere with the measurement.    The ADC result is a floating-point number; you need to cast it before interpreting it.  The ADC result register holds an unsigned integer (0–4095); no floating-point conversion is involved until the code optionally converts counts to voltage.    The ADC cannot measure 0 V — it only produces non-zero counts.  A 0 V input gives a count of 0, which is a valid and expected result. The issue here is timing, not the input voltage.      A 3-bit successive-approximation ADC is measuring an input voltage. How many comparisons does it make to produce a complete result?    3 — one per bit, starting from the most significant bit.  Correct. Successive approximation is a binary search: each comparison determines one bit, so an -bit ADC needs exactly comparisons. This is much faster than a flash ADC's simultaneous comparators, at the cost of taking clock cycles instead of just one.    7 — one for each possible output value minus one.  That describes a flash ADC, which uses simultaneous comparators. Successive approximation uses only one comparator and takes steps.    8 — one for each possible output value.  8 is the number of possible output values for a 3-bit ADC, not the number of comparisons. Successive approximation only needs 3 comparisons.    1 — the comparator determines the result in a single step.  A single comparison can only resolve one bit (above or below the midpoint). Determining all 3 bits requires 3 comparisons.     "
},
{
  "id": "rq-adc-lsb",
  "level": "2",
  "url": "rq-adc-how-it-works.html#rq-adc-lsb",
  "type": "Reading Question",
  "number": "6.1.3.1",
  "title": "",
  "body": " A 12-bit ADC has . What voltage does one LSB represent, and what is the maximum representable voltage?    One LSB ≈ 0.81 mV; maximum representable voltage ≈ 3.2992 V (count 4095).  Correct. One LSB = 3.3 V \/ 4096 ≈ 0.806 mV. Count 4095 gives — not quite 3.3 V, because the ADC uses 4096 steps starting from 0.    One LSB = 3.3 V; maximum = 4095 V.  The LSB is a fraction of , not equal to it. The maximum output is an integer count, not a voltage.    One LSB ≈ 0.81 mV; maximum representable voltage = 3.3 V (count 4096).  Close — the LSB value is right, but a 12-bit ADC produces counts 0–4095, not 0–4096. Count 4096 does not exist; the highest count is 4095.    One LSB = 12 mV; maximum representable voltage = 3.3 V.  12 mV would be the LSB of a roughly 8-bit ADC (3.3 V \/ 256 ≈ 12.9 mV). For 12 bits the LSB is much smaller: about 0.81 mV.    "
},
{
  "id": "rq-adc-wait",
  "level": "2",
  "url": "rq-adc-how-it-works.html#rq-adc-wait",
  "type": "Reading Question",
  "number": "6.1.3.2",
  "title": "",
  "body": " You start an ADC conversion by writing to the control register, then immediately read the result register. The value is always 0 regardless of the input voltage. What is the most likely cause?    You are reading the result before the conversion is complete; the result register still holds its reset value of 0.  Correct. A successive-approximation ADC takes several microseconds to complete. The code must poll the end-of-conversion flag in the status register and wait for it to be set before reading the result.    The GPIO pin for PA0 must be set to output mode before an ADC conversion can start.  The opposite is true: the pin must be in analog mode (not output mode) to allow the ADC input circuitry to connect to it. Setting it as an output would actually interfere with the measurement.    The ADC result is a floating-point number; you need to cast it before interpreting it.  The ADC result register holds an unsigned integer (0–4095); no floating-point conversion is involved until the code optionally converts counts to voltage.    The ADC cannot measure 0 V — it only produces non-zero counts.  A 0 V input gives a count of 0, which is a valid and expected result. The issue here is timing, not the input voltage.    "
},
{
  "id": "rq-adc-sar-steps",
  "level": "2",
  "url": "rq-adc-how-it-works.html#rq-adc-sar-steps",
  "type": "Reading Question",
  "number": "6.1.3.3",
  "title": "",
  "body": " A 3-bit successive-approximation ADC is measuring an input voltage. How many comparisons does it make to produce a complete result?    3 — one per bit, starting from the most significant bit.  Correct. Successive approximation is a binary search: each comparison determines one bit, so an -bit ADC needs exactly comparisons. This is much faster than a flash ADC's simultaneous comparators, at the cost of taking clock cycles instead of just one.    7 — one for each possible output value minus one.  That describes a flash ADC, which uses simultaneous comparators. Successive approximation uses only one comparator and takes steps.    8 — one for each possible output value.  8 is the number of possible output values for a 3-bit ADC, not the number of comparisons. Successive approximation only needs 3 comparisons.    1 — the comparator determines the result in a single step.  A single comparison can only resolve one bit (above or below the midpoint). Determining all 3 bits requires 3 comparisons.    "
},
{
  "id": "sec-adc-concepts",
  "level": "1",
  "url": "sec-adc-concepts.html",
  "type": "Section",
  "number": "6.2",
  "title": "ADC Concepts",
  "body": " ADC Concepts   Sensor signal chain. A sensor converts a physical quantity to a voltage; an Analog Front End (AFE) conditions the signal (amplification, filtering); the ADC digitizes it to an integer; the MCU processes the result.    The ADC maps the input range to integers where is the bit width. For the STM32C031 with and :   ADC system view. The analog input (0–3.3 V) maps linearly to a 12-bit integer (0–4095). One LSB corresponds to . To recover the voltage from a count: .    The STM32C031C6 has 19 ADC-capable pins; 11 of those are accessible on the Nucleo board's headers. In ENGS 28 we typically use PA0 (ADC channel 0).   Nucleo pinout highlighting the ADC-accessible pins. PA0 through PA7 map to ADC channels 0–7. The pin labeling in datasheet Table 12 confirms which pins support analog input.     Test circuit using a potentiometer as a variable voltage source wired to PA0. The outer terminals of the pot connect to 3.3 V and GND; the wiper (center terminal) connects to PA0. Turning the knob varies the voltage on PA0 from 0 to 3.3 V continuously.      A 12-bit ADC with reads a count of 2048. What is the corresponding input voltage?   Approximately 1.65 V  Correct: — exactly half of VREF.  2.048 V  That would be correct for a 10-bit ADC with VREF = 2.048 V. For 12 bits, divide 3.3 V across 4096 counts.  Approximately 3.3 V  3.3 V corresponds to count 4095 (maximum), not 2048.  Approximately 0.8 mV  0.8 mV is the value of one LSB. 2048 counts is many LSBs above zero.     "
},
{
  "id": "fig-adc-signal-chain",
  "level": "2",
  "url": "sec-adc-concepts.html#fig-adc-signal-chain",
  "type": "Figure",
  "number": "6.2.1",
  "title": "",
  "body": " Sensor signal chain. A sensor converts a physical quantity to a voltage; an Analog Front End (AFE) conditions the signal (amplification, filtering); the ADC digitizes it to an integer; the MCU processes the result.   "
},
{
  "id": "fig-adc-system-view",
  "level": "2",
  "url": "sec-adc-concepts.html#fig-adc-system-view",
  "type": "Figure",
  "number": "6.2.2",
  "title": "",
  "body": " ADC system view. The analog input (0–3.3 V) maps linearly to a 12-bit integer (0–4095). One LSB corresponds to . To recover the voltage from a count: .   "
},
{
  "id": "fig-adc-pins",
  "level": "2",
  "url": "sec-adc-concepts.html#fig-adc-pins",
  "type": "Figure",
  "number": "6.2.3",
  "title": "",
  "body": " Nucleo pinout highlighting the ADC-accessible pins. PA0 through PA7 map to ADC channels 0–7. The pin labeling in datasheet Table 12 confirms which pins support analog input.   "
},
{
  "id": "fig-adc-potentiometer",
  "level": "2",
  "url": "sec-adc-concepts.html#fig-adc-potentiometer",
  "type": "Figure",
  "number": "6.2.4",
  "title": "",
  "body": " Test circuit using a potentiometer as a variable voltage source wired to PA0. The outer terminals of the pot connect to 3.3 V and GND; the wiper (center terminal) connects to PA0. Turning the knob varies the voltage on PA0 from 0 to 3.3 V continuously.   "
},
{
  "id": "rq-adc-resolution",
  "level": "2",
  "url": "rq-adc-concepts.html#rq-adc-resolution",
  "type": "Reading Question",
  "number": "6.2.1",
  "title": "",
  "body": " A 12-bit ADC with reads a count of 2048. What is the corresponding input voltage?   Approximately 1.65 V  Correct: — exactly half of VREF.  2.048 V  That would be correct for a 10-bit ADC with VREF = 2.048 V. For 12 bits, divide 3.3 V across 4096 counts.  Approximately 3.3 V  3.3 V corresponds to count 4095 (maximum), not 2048.  Approximately 0.8 mV  0.8 mV is the value of one LSB. 2048 counts is many LSBs above zero.   "
},
{
  "id": "subsec-adc-clock",
  "level": "1",
  "url": "subsec-adc-clock.html",
  "type": "Subsection",
  "number": "6.3.1",
  "title": "ADC Clock",
  "body": " ADC Clock  The STM32 ADC has its own clock domain, independent of the APB bus. We use the internal RC oscillator divided down to give the ADC a suitable clock rate.   ADC clock source selection registers. The ADC can be clocked from an asynchronous source (independent of the CPU clock), which is convenient for power management. We set CKMODE = 00 to select the asynchronous HSI clock, then enable it with ADCEN in APBENR2.     "
},
{
  "id": "fig-adc-clock",
  "level": "2",
  "url": "subsec-adc-clock.html#fig-adc-clock",
  "type": "Figure",
  "number": "6.3.1",
  "title": "",
  "body": " ADC clock source selection registers. The ADC can be clocked from an asynchronous source (independent of the CPU clock), which is convenient for power management. We set CKMODE = 00 to select the asynchronous HSI clock, then enable it with ADCEN in APBENR2.    "
},
{
  "id": "subsec-adc-chselr",
  "level": "1",
  "url": "subsec-adc-chselr.html",
  "type": "Subsection",
  "number": "6.3.2",
  "title": "Channel Selection",
  "body": " Channel Selection  The ADC_CHSELR register selects which channel(s) to sample. Each bit corresponds to one channel; set bit 0 for channel 0 (PA0).   ADC Channel Selection Register (CHSELR). Bit enables channel . For a single potentiometer on PA0 (channel 0), write ADC1->CHSELR = ADC_CHSELR_CHSEL0 .    "
},
{
  "id": "fig-adc-chselr",
  "level": "2",
  "url": "subsec-adc-chselr.html#fig-adc-chselr",
  "type": "Figure",
  "number": "6.3.2",
  "title": "",
  "body": " ADC Channel Selection Register (CHSELR). Bit enables channel . For a single potentiometer on PA0 (channel 0), write ADC1->CHSELR = ADC_CHSELR_CHSEL0 .   "
},
{
  "id": "subsec-adc-enable",
  "level": "1",
  "url": "subsec-adc-enable.html",
  "type": "Subsection",
  "number": "6.3.3",
  "title": "Enabling the ADC and Atomic Register Access",
  "body": " Enabling the ADC and Atomic Register Access  After configuring the clock and channel, enable the ADC by setting the ADEN bit in ADC_CR . Then wait for the ADRDY (ADC Ready) bit to set in ADC_ISR .   ADC Interrupt and Status Register (ADC_ISR). The ADRDY bit (bit 0) is set by hardware when the ADC finishes its startup calibration and is ready to convert. Software clears this bit by writing a 1 to it — this is called a write-1-to-clear (rc_w1) bit.    Clearing ADRDY uses an assignment, not an OR-equals:  ADC1->ISR = ADC_ISR_ADRDY; \/\/ write 1 to bit 0 clears it (rc_w1 behavior) \/\/ NOT: ADC1->ISR &= ~ADC_ISR_ADRDY; -- this clears ALL other status bits too!   Atomic register access and rc_w1 bits  Most ARM Cortex-M registers require 32-bit aligned accesses. The read-modify-write sequence of &= ~mask is not atomic: an interrupt occurring between the read and the write can lose an event. For status registers with write-1-to-clear bits (labeled rc_w1 in the reference manual), the solution is to write the specific bit(s) you want cleared using a plain assignment. This is a safe, single-write operation that does not affect other bits that are already clear.    ADC Control Register (ADC_CR). Set ADEN (bit 0) to enable the ADC; set ADSTART (bit 2) to begin a conversion; the hardware clears ADSTART automatically when the conversion completes.    "
},
{
  "id": "fig-adc-isr",
  "level": "2",
  "url": "subsec-adc-enable.html#fig-adc-isr",
  "type": "Figure",
  "number": "6.3.3",
  "title": "",
  "body": " ADC Interrupt and Status Register (ADC_ISR). The ADRDY bit (bit 0) is set by hardware when the ADC finishes its startup calibration and is ready to convert. Software clears this bit by writing a 1 to it — this is called a write-1-to-clear (rc_w1) bit.   "
},
{
  "id": "subsec-adc-enable-6",
  "level": "2",
  "url": "subsec-adc-enable.html#subsec-adc-enable-6",
  "type": "Insight",
  "number": "6.3.4",
  "title": "Atomic register access and rc_w1 bits.",
  "body": " Atomic register access and rc_w1 bits  Most ARM Cortex-M registers require 32-bit aligned accesses. The read-modify-write sequence of &= ~mask is not atomic: an interrupt occurring between the read and the write can lose an event. For status registers with write-1-to-clear bits (labeled rc_w1 in the reference manual), the solution is to write the specific bit(s) you want cleared using a plain assignment. This is a safe, single-write operation that does not affect other bits that are already clear.  "
},
{
  "id": "fig-adc-cr",
  "level": "2",
  "url": "subsec-adc-enable.html#fig-adc-cr",
  "type": "Figure",
  "number": "6.3.5",
  "title": "",
  "body": " ADC Control Register (ADC_CR). Set ADEN (bit 0) to enable the ADC; set ADSTART (bit 2) to begin a conversion; the hardware clears ADSTART automatically when the conversion completes.   "
},
{
  "id": "subsec-adc-sample",
  "level": "1",
  "url": "subsec-adc-sample.html",
  "type": "Subsection",
  "number": "6.3.4",
  "title": "Taking a Sample",
  "body": " Taking a Sample  Once initialized, taking a measurement is a three-step sequence: wait for ADC ready, start a conversion, wait for end-of-conversion (EOC), then read the result from ADC_DR .  void pa0_adc_init(void) { \/* Configure PA0 as analog input *\/ RCC->IOPENR |= RCC_IOPENR_GPIOAEN; GPIOA->MODER |= (3U << 0); \/\/ MODER bits [1:0] = 11 (analog) \/* Enable ADC clock *\/ RCC->APBENR2 |= RCC_APBENR2_ADCEN; \/* Select channel 0 *\/ ADC1->CHSELR = ADC_CHSELR_CHSEL0; \/* Clear ADRDY, then enable ADC *\/ ADC1->ISR = ADC_ISR_ADRDY; ADC1->CR |= ADC_CR_ADEN; \/* Wait until ADC is ready *\/ while (!(ADC1->ISR & ADC_ISR_ADRDY)) {} } uint32_t adc_read(void) { \/* Start one conversion *\/ ADC1->CR |= ADC_CR_ADSTART; \/* Wait for end of conversion *\/ while (!(ADC1->ISR & ADC_ISR_EOC)) {} return ADC1->DR; \/\/ reading DR automatically clears EOC }   ADC Data Register (ADC_DR). The 12-bit result is right-aligned in bits [11:0]. Reading the register clears the EOC flag.    "
},
{
  "id": "fig-adc-dr",
  "level": "2",
  "url": "subsec-adc-sample.html#fig-adc-dr",
  "type": "Figure",
  "number": "6.3.6",
  "title": "",
  "body": " ADC Data Register (ADC_DR). The 12-bit result is right-aligned in bits [11:0]. Reading the register clears the EOC flag.   "
},
{
  "id": "sec-adc-sar",
  "level": "1",
  "url": "sec-adc-sar.html",
  "type": "Section",
  "number": "6.4",
  "title": "How the ADC Works: Successive Approximation",
  "body": " How the ADC Works: Successive Approximation  The STM32 ADC uses a successive approximation algorithm. It maintains a Successive Approximation Register (SAR) and tests one bit at a time, from MSB to LSB, by comparing the analog input against a DAC output. A 12-bit conversion takes 14 ADC clock cycles.   Successive approximation ADC block diagram. The comparator tests the analog input against a DAC output generated from the current SAR value. For each bit position, if the input is greater the bit stays set; otherwise it is cleared. After 12 comparisons the SAR holds the digital result.     ADC conversion timing diagram. The ADSTART bit triggers the conversion; the hardware clears it and begins sampling. After 14 ADC clock cycles the EOC flag is set and the result is available in ADC_DR.       The ADC clock runs at 12 MHz and a conversion takes 14 cycles. How long does one 12-bit conversion take?   About 1.2 µs  Correct: .  About 14 ms  At 12 MHz, one clock cycle is 83 ns — 14 cycles is about 1.2 µs, not milliseconds.  About 12 µs  Close, but 14 cycles at 12 MHz is 14\/12,000,000 seconds = 1.17 µs.  It depends on the input voltage.  SAR conversion time is fixed at 14 clock cycles regardless of input voltage.     "
},
{
  "id": "sec-adc-sar-2",
  "level": "2",
  "url": "sec-adc-sar.html#sec-adc-sar-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "successive approximation "
},
{
  "id": "fig-adc-sar-block",
  "level": "2",
  "url": "sec-adc-sar.html#fig-adc-sar-block",
  "type": "Figure",
  "number": "6.4.1",
  "title": "",
  "body": " Successive approximation ADC block diagram. The comparator tests the analog input against a DAC output generated from the current SAR value. For each bit position, if the input is greater the bit stays set; otherwise it is cleared. After 12 comparisons the SAR holds the digital result.   "
},
{
  "id": "fig-adc-timing",
  "level": "2",
  "url": "sec-adc-sar.html#fig-adc-timing",
  "type": "Figure",
  "number": "6.4.2",
  "title": "",
  "body": " ADC conversion timing diagram. The ADSTART bit triggers the conversion; the hardware clears it and begins sampling. After 14 ADC clock cycles the EOC flag is set and the result is available in ADC_DR.    "
},
{
  "id": "rq-adc-time",
  "level": "2",
  "url": "rq-adc-sar.html#rq-adc-time",
  "type": "Reading Question",
  "number": "6.4.1",
  "title": "",
  "body": " The ADC clock runs at 12 MHz and a conversion takes 14 cycles. How long does one 12-bit conversion take?   About 1.2 µs  Correct: .  About 14 ms  At 12 MHz, one clock cycle is 83 ns — 14 cycles is about 1.2 µs, not milliseconds.  About 12 µs  Close, but 14 cycles at 12 MHz is 14\/12,000,000 seconds = 1.17 µs.  It depends on the input voltage.  SAR conversion time is fixed at 14 clock cycles regardless of input voltage.   "
},
{
  "id": "subsec-debug-why-different",
  "level": "1",
  "url": "subsec-debug-why-different.html",
  "type": "Subsection",
  "number": "7.1.1",
  "title": "Why Embedded Debugging Is Different",
  "body": " Why Embedded Debugging Is Different  When a desktop program crashes, the operating system usually catches the error and prints a message — a stack trace, a segmentation fault, an exception — that tells you roughly where things went wrong. An embedded program has none of that safety net. When something goes wrong on the STM32, the program typically does one of three things: it silently produces the wrong output, it hangs in an infinite loop, or it enters a hardware fault handler and sits there with no message at all.  The second complication is that bugs can live in either hardware or software — or both at once. An LED that never turns on might indicate a wrong register value, a backwards LED, a broken wire, or a missing clock enable. You cannot assume the hardware is correct just because the code looks right, and you cannot assume the code is correct just because the hardware looks right.  The third complication is visibility. On a desktop you can print to a console at any time. On a microcontroller, getting a message out requires a working UART, correct baud rate settings, and a terminal program on the PC — all of which can themselves be sources of bugs. When nothing works yet, you may have very few ways to observe what the program is actually doing.  "
},
{
  "id": "subsec-debug-mindset",
  "level": "1",
  "url": "subsec-debug-mindset.html",
  "type": "Subsection",
  "number": "7.1.2",
  "title": "The Scientific Debugging Mindset",
  "body": " The Scientific Debugging Mindset  Effective debugging is not random — it is a scientific process. The key steps are:   Reproduce the problem reliably. A bug you cannot reproduce consistently is almost impossible to fix. Note exactly what inputs, conditions, and sequence of events lead to the wrong behavior.   Form a hypothesis. Before touching anything, think about what could cause the symptom you observe. Write it down. A vague sense that something is wrong with the ADC is not a hypothesis; the ADC clock is not enabled, so the result register always reads zero is.   Design a minimal test. Change one thing — not five — and observe whether the symptom changes. If you change multiple things at once and the bug disappears, you will not know which change fixed it, and the bug may reappear later in a different form.   Use bisection. If you are not sure where in the code the problem lies, divide it in half: confirm that execution reaches the midpoint correctly, then narrow to the half that contains the fault. Each test eliminates half the remaining possibilities.   Keep notes. When a bug takes more than a few minutes to find, write down what you tried and what you observed. This prevents testing the same hypothesis twice and helps you hand the problem off to a classmate or course staff member with a clear description.  "
},
{
  "id": "subsec-debug-toolkit",
  "level": "1",
  "url": "subsec-debug-toolkit.html",
  "type": "Subsection",
  "number": "7.1.3",
  "title": "The Debugging Toolkit",
  "body": " The Debugging Toolkit  In ENGS 28 you have three main tools, each suited to different situations.   Diagnostic printf is the fastest way to trace program execution and print variable values. It works at the level of your C code and requires nothing beyond a working UART connection. Use it to confirm that the program reaches a particular function, to print register values, and to compare expected versus actual results. Its limitation is that it requires UART to be working — you cannot use it to debug the UART initialization itself.   The Analog Discovery 2 lets you see what is actually happening on the hardware — voltages, timing, signal shapes. It is indispensable for hardware bugs (wrong voltage levels, missing signals) and for timing problems (signals that are too fast or too slow to verify with printf ). Beyond the oscilloscope, the AD2's built-in logic analyzer can decode digital protocols: connect it to your I2C, UART, or SPI lines and Waveforms will display the decoded bytes alongside the raw waveform, making it easy to confirm that your peripheral is sending what you expect. The AD2 operates independently of your code, so it works even when the program is completely frozen.   The STM32CubeIDE interactive debugger lets you pause execution, step through code one line at a time, and inspect any register or variable — without adding a single printf . It is the most powerful tool for software bugs: you can watch a variable change value as you step through a loop, or check exactly what bits are set in a peripheral register at the moment a fault occurs. Its limitation is that pausing the processor can affect time-sensitive behavior, so it is less useful for debugging interrupts and hardware-timing problems.  Most debugging sessions use all three tools at different stages. A common workflow: use the oscilloscope to confirm the hardware is behaving as expected, then use printf to narrow down which section of code is at fault, then use the interactive debugger to inspect the exact register or variable state that reveals the bug.  "
},
{
  "id": "subsec-debug-toolkit-3",
  "level": "2",
  "url": "subsec-debug-toolkit.html#subsec-debug-toolkit-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Diagnostic printf "
},
{
  "id": "subsec-debug-toolkit-4",
  "level": "2",
  "url": "subsec-debug-toolkit.html#subsec-debug-toolkit-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The Analog Discovery 2 "
},
{
  "id": "subsec-debug-toolkit-5",
  "level": "2",
  "url": "subsec-debug-toolkit.html#subsec-debug-toolkit-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "The STM32CubeIDE interactive debugger "
},
{
  "id": "rq-debugging-concepts",
  "level": "1",
  "url": "rq-debugging-concepts.html",
  "type": "Check Your Understanding",
  "number": "7.1.4",
  "title": "Check Your Understanding",
  "body": "  Your program is supposed to blink an LED at 1 Hz, but the LED stays on constantly. Before touching any code, what should you do first?    Form a specific hypothesis about what could cause the LED to stay on — for example, that the delay function is not working, or that the GPIO output register is being set but never cleared — and then design a test to check it.  Correct. Jumping straight to changing code without a hypothesis leads to random changes that may mask the bug without fixing it. A clear hypothesis produces a focused, informative test.    Rewrite the entire program from scratch, since something is clearly wrong with the existing code.  Rewriting without understanding the cause usually reproduces the same bug. Systematic diagnosis is faster and more instructive than starting over.    Replace the LED immediately, in case it is defective.  A defective LED would typically not light up at all, not stay on constantly. Hardware substitution is a useful technique, but it should follow a hypothesis — not precede one.    Add printf statements throughout the entire program to see what is happening everywhere at once.  Scattering printf statements everywhere produces too much output to interpret. A focused hypothesis tells you exactly where to put the one or two prints that will answer your question.      You suspect that a GPIO pin is being driven HIGH for too short a time — possibly only a few microseconds — before returning LOW. Which tool is best suited to verify this?    The Analog Discovery 2 oscilloscope, which can capture and display signals at microsecond timescales independently of the running program.  Correct. A printf statement takes far longer than a few microseconds to execute, so it would interfere with the timing you are trying to measure. The oscilloscope is the right tool for fast hardware signals.    A printf inside the relevant code block, printing a message each time the pin goes HIGH.  A printf call takes many microseconds to execute over UART at 115200 baud — far longer than the pulse itself. Adding it would change the timing and make the problem disappear or become different.    The STM32CubeIDE interactive debugger with a breakpoint on the line that sets the pin HIGH.  A breakpoint pauses the processor, which prevents any time-sensitive behavior from occurring normally. For microsecond-level timing, the oscilloscope is the right tool.    Reading the GPIO IDR register in a tight polling loop and printing the result.  Polling the IDR in software is much slower than the few-microsecond pulse and would likely miss it entirely. The oscilloscope captures the actual waveform in hardware.      Your ADC program reads the wrong value. The initialization code spans 30 lines across three functions. What is the most efficient way to find which function contains the bug?    Add a printf after the first function completes to check whether its output is correct, then after the second, narrowing by bisection until the faulty function is identified.  Correct. Bisection cuts the search space in half with each test — three functions require at most two tests to pinpoint. Testing one line at a time from the beginning would take up to 30 steps for the same result.    Add a printf after every line of initialization code and examine all 30 outputs.  This produces correct results eventually, but 30 print statements is far more work than necessary. Bisection finds the same answer with two or three targeted prints.    Comment out the third function first, since bugs are usually in the last code added.  While it is worth starting with recently changed code, assuming the bug is in the last function without evidence is a guess, not a systematic method. If that guess is wrong, you have learned nothing about where to look next.    Rewrite all three functions using the interactive debugger to step through each line.  Stepping through all 30 lines in the debugger works but is slow. Bisection with a few printf calls is usually faster for narrowing the location of the bug before engaging the debugger for fine-grained inspection.     "
},
{
  "id": "rq-debug-symptom",
  "level": "2",
  "url": "rq-debugging-concepts.html#rq-debug-symptom",
  "type": "Reading Question",
  "number": "7.1.4.1",
  "title": "",
  "body": " Your program is supposed to blink an LED at 1 Hz, but the LED stays on constantly. Before touching any code, what should you do first?    Form a specific hypothesis about what could cause the LED to stay on — for example, that the delay function is not working, or that the GPIO output register is being set but never cleared — and then design a test to check it.  Correct. Jumping straight to changing code without a hypothesis leads to random changes that may mask the bug without fixing it. A clear hypothesis produces a focused, informative test.    Rewrite the entire program from scratch, since something is clearly wrong with the existing code.  Rewriting without understanding the cause usually reproduces the same bug. Systematic diagnosis is faster and more instructive than starting over.    Replace the LED immediately, in case it is defective.  A defective LED would typically not light up at all, not stay on constantly. Hardware substitution is a useful technique, but it should follow a hypothesis — not precede one.    Add printf statements throughout the entire program to see what is happening everywhere at once.  Scattering printf statements everywhere produces too much output to interpret. A focused hypothesis tells you exactly where to put the one or two prints that will answer your question.    "
},
{
  "id": "rq-debug-tool-choice",
  "level": "2",
  "url": "rq-debugging-concepts.html#rq-debug-tool-choice",
  "type": "Reading Question",
  "number": "7.1.4.2",
  "title": "",
  "body": " You suspect that a GPIO pin is being driven HIGH for too short a time — possibly only a few microseconds — before returning LOW. Which tool is best suited to verify this?    The Analog Discovery 2 oscilloscope, which can capture and display signals at microsecond timescales independently of the running program.  Correct. A printf statement takes far longer than a few microseconds to execute, so it would interfere with the timing you are trying to measure. The oscilloscope is the right tool for fast hardware signals.    A printf inside the relevant code block, printing a message each time the pin goes HIGH.  A printf call takes many microseconds to execute over UART at 115200 baud — far longer than the pulse itself. Adding it would change the timing and make the problem disappear or become different.    The STM32CubeIDE interactive debugger with a breakpoint on the line that sets the pin HIGH.  A breakpoint pauses the processor, which prevents any time-sensitive behavior from occurring normally. For microsecond-level timing, the oscilloscope is the right tool.    Reading the GPIO IDR register in a tight polling loop and printing the result.  Polling the IDR in software is much slower than the few-microsecond pulse and would likely miss it entirely. The oscilloscope captures the actual waveform in hardware.    "
},
{
  "id": "rq-debug-bisection",
  "level": "2",
  "url": "rq-debugging-concepts.html#rq-debug-bisection",
  "type": "Reading Question",
  "number": "7.1.4.3",
  "title": "",
  "body": " Your ADC program reads the wrong value. The initialization code spans 30 lines across three functions. What is the most efficient way to find which function contains the bug?    Add a printf after the first function completes to check whether its output is correct, then after the second, narrowing by bisection until the faulty function is identified.  Correct. Bisection cuts the search space in half with each test — three functions require at most two tests to pinpoint. Testing one line at a time from the beginning would take up to 30 steps for the same result.    Add a printf after every line of initialization code and examine all 30 outputs.  This produces correct results eventually, but 30 print statements is far more work than necessary. Bisection finds the same answer with two or three targeted prints.    Comment out the third function first, since bugs are usually in the last code added.  While it is worth starting with recently changed code, assuming the bug is in the last function without evidence is a guess, not a systematic method. If that guess is wrong, you have learned nothing about where to look next.    Rewrite all three functions using the interactive debugger to step through each line.  Stepping through all 30 lines in the debugger works but is slow. Bisection with a few printf calls is usually faster for narrowing the location of the bug before engaging the debugger for fine-grained inspection.    "
},
{
  "id": "sec-debug-prevention",
  "level": "1",
  "url": "sec-debug-prevention.html",
  "type": "Section",
  "number": "7.2",
  "title": "Preventing Bugs",
  "body": " Preventing Bugs  The most effective debugging technique is to write correct code from the start. Good practices that reduce bug rate:  Plan on paper before writing code — draw a block diagram, write pseudocode, or sketch a state diagram. Use descriptive variable names. Put a file header in every source file (author, date, description, hardware notes). Write one small change at a time and test it before moving on. Know common mistake patterns: missing semicolons, incorrect register names, mismatched braces, off-by-one errors, and forgetting to enable a peripheral clock.  "
},
{
  "id": "sec-debug-hardware",
  "level": "1",
  "url": "sec-debug-hardware.html",
  "type": "Section",
  "number": "7.3",
  "title": "Debugging Hardware",
  "body": " Debugging Hardware  Before blaming software, verify the hardware. Common hardware bugs:  Check power and ground connections to every device on the breadboard. Verify LED polarity (long lead = anode = positive). Confirm that bypass capacitors are installed near IC power pins. Use the AD2 voltmeter or oscilloscope to measure actual voltages rather than assuming they are correct. Swap suspect components to rule out defective parts.  "
},
{
  "id": "sec-debug-printf",
  "level": "1",
  "url": "sec-debug-printf.html",
  "type": "Section",
  "number": "7.4",
  "title": "Diagnostic printf Statements",
  "body": " Diagnostic printf Statements  Once hardware is ruled out, instrument the code with printf statements that reveal whether each section was reached and what values look like.  \/\/ Did we reach this function? printf(\"pa0_adc_init(): entered\\r\\n\"); \/\/ Is the ADC ready? printf(\"ADC ISR = 0x%08lX\\r\\n\", ADC1->ISR); \/\/ Is the value reasonable? int count = adc_read(); printf(\"ADC count = %d, voltage = %.2f V\\r\\n\", count, count * 3.3f \/ 4096.0f);  Effective print debugging: print what you expect the value to be alongside what you got . Narrow the location of the bug by adding prints at the boundaries of suspected sections and using bisection to home in on it. Remove or comment out debug prints before submitting finished code (they slow execution and clutter output).  "
},
{
  "id": "subsec-debug-launch",
  "level": "1",
  "url": "subsec-debug-launch.html",
  "type": "Subsection",
  "number": "7.5.1",
  "title": "Launching the Debugger",
  "body": " Launching the Debugger  Click the bug icon (or press F11) in STM32CubeIDE to build and start a debug session. The IDE flashes the program, connects over ST-LINK, and halts at the first line of main() . A Registers pane appears on the right showing the current values of all peripheral registers.   STM32CubeIDE debugger showing the peripheral register view. Expand a peripheral (e.g., RCC, GPIOA, ADC1) to see individual register fields and their current values in real time as you step through code.     "
},
{
  "id": "fig-debugger-registers",
  "level": "2",
  "url": "subsec-debug-launch.html#fig-debugger-registers",
  "type": "Figure",
  "number": "7.5.1",
  "title": "",
  "body": " STM32CubeIDE debugger showing the peripheral register view. Expand a peripheral (e.g., RCC, GPIOA, ADC1) to see individual register fields and their current values in real time as you step through code.    "
},
{
  "id": "subsec-debug-step",
  "level": "1",
  "url": "subsec-debug-step.html",
  "type": "Subsection",
  "number": "7.5.2",
  "title": "Stepping and Breakpoints",
  "body": " Stepping and Breakpoints  The main stepping controls are Step Over (F6), Step Into (F5), and Resume (F8). Step Over executes the current line and stops at the next one without entering function calls. Step Into follows into called functions. Resume runs until the next breakpoint.   STM32CubeIDE debug toolbar icons. From left: Resume, Suspend, Terminate, Step Into, Step Over, Step Return. Use Step Over for most debugging; use Step Into when you need to trace into a function.    To set a breakpoint, click in the thin blue margin to the left of a source line. A blue dot appears. When the program reaches that line it halts and the Registers and Variables panes update.  "
},
{
  "id": "fig-debugger-controls",
  "level": "2",
  "url": "subsec-debug-step.html#fig-debugger-controls",
  "type": "Figure",
  "number": "7.5.2",
  "title": "",
  "body": " STM32CubeIDE debug toolbar icons. From left: Resume, Suspend, Terminate, Step Into, Step Over, Step Return. Use Step Over for most debugging; use Step Into when you need to trace into a function.   "
},
{
  "id": "subsec-debug-variables",
  "level": "1",
  "url": "subsec-debug-variables.html",
  "type": "Subsection",
  "number": "7.5.3",
  "title": "Watching Variables",
  "body": " Watching Variables  The Variables pane lists local variables and their current values. Add a global variable to the Expressions pane to monitor it across function calls. This is especially useful for checking that a counter increments as expected or that an ADC value is in the right range.   Debugger Variables pane showing a counter variable and its current value during a step-through of the keyboard-controlled counter program. The pane updates after each step, making it easy to see when a variable changes unexpectedly.    "
},
{
  "id": "fig-debugger-variables",
  "level": "2",
  "url": "subsec-debug-variables.html#fig-debugger-variables",
  "type": "Figure",
  "number": "7.5.3",
  "title": "",
  "body": " Debugger Variables pane showing a counter variable and its current value during a step-through of the keyboard-controlled counter program. The pane updates after each step, making it easy to see when a variable changes unexpectedly.   "
},
{
  "id": "subsec-debug-registers",
  "level": "1",
  "url": "subsec-debug-registers.html",
  "type": "Subsection",
  "number": "7.5.4",
  "title": "Inspecting Peripheral Registers",
  "body": " Inspecting Peripheral Registers  One of the most powerful uses of the debugger in embedded work is inspecting peripheral registers directly. After setting a breakpoint just after an initialization function, check the relevant registers to verify that the right bits were set. For example, after calling pa0_adc_init() , expand ADC1 in the register view and confirm that ADEN is 1 and ADRDY is 1.   Debugger launch configuration in STM32CubeIDE showing the target device and debug probe selection. The ST-LINK on the Nucleo board is the debug probe; select ST-LINK (OpenOCD) or the built-in ST-LINK option depending on your IDE version.    "
},
{
  "id": "fig-debugger-launch",
  "level": "2",
  "url": "subsec-debug-registers.html#fig-debugger-launch",
  "type": "Figure",
  "number": "7.5.4",
  "title": "",
  "body": " Debugger launch configuration in STM32CubeIDE showing the target device and debug probe selection. The ST-LINK on the Nucleo board is the debug probe; select ST-LINK (OpenOCD) or the built-in ST-LINK option depending on your IDE version.   "
},
{
  "id": "rq-debugging",
  "level": "1",
  "url": "rq-debugging.html",
  "type": "Check Your Understanding",
  "number": "7.5.5",
  "title": "Check Your Understanding",
  "body": "  Your ADC program reads a constant value of 0 regardless of the potentiometer position. Which of the following is the most systematic first step?   Use the debugger to check the ADC_ISR register and confirm ADRDY = 1 before calling adc_read().  Correct. Verifying the ADC is ready before sampling rules out the most common initialization error.  Rewrite the entire adc_read() function from scratch.  Rewriting without diagnosis is slow and may not fix the underlying problem.  Swap the potentiometer for a different one.  Hardware swapping comes after you have ruled out a software\/configuration cause. Check the ADC configuration first.  Submit the lab as-is and ask the TA.  Systematic self-debugging is the expected approach. Try the debugger first.    "
},
{
  "id": "rq-debug-method",
  "level": "2",
  "url": "rq-debugging.html#rq-debug-method",
  "type": "Reading Question",
  "number": "7.5.5.1",
  "title": "",
  "body": " Your ADC program reads a constant value of 0 regardless of the potentiometer position. Which of the following is the most systematic first step?   Use the debugger to check the ADC_ISR register and confirm ADRDY = 1 before calling adc_read().  Correct. Verifying the ADC is ready before sampling rules out the most common initialization error.  Rewrite the entire adc_read() function from scratch.  Rewriting without diagnosis is slow and may not fix the underlying problem.  Swap the potentiometer for a different one.  Hardware swapping comes after you have ruled out a software\/configuration cause. Check the ADC configuration first.  Submit the lab as-is and ask the TA.  Systematic self-debugging is the expected approach. Try the debugger first.   "
},
{
  "id": "subsec-spinloop-problem",
  "level": "1",
  "url": "subsec-spinloop-problem.html",
  "type": "Subsection",
  "number": "8.1.1",
  "title": "The Problem with Spin Loops",
  "body": " The Problem with Spin Loops  A spin-loop delay like for (int i = 0; i < N; i++) {} ties up the CPU completely for the duration of the delay. During those millions of iterations, the processor cannot read a sensor, update a display, respond to a button, or do anything else. The program is effectively comatose while waiting for time to pass.  This is both wasteful and fragile. It is wasteful because the processor is consuming power to execute instructions that accomplish nothing. It is fragile because the number of iterations needed for a given delay depends on the clock speed and compiler optimization level — change either one and all your delays change too.  The same problem applies to polling. If you check a button's state in a tight loop, the CPU is constantly reading IDR whether anything is happening or not. If you also need to blink an LED at a precise rate and sample an ADC, you end up with a loop that tries to do everything at once and does none of it well.  "
},
{
  "id": "subsec-hardware-timers",
  "level": "1",
  "url": "subsec-hardware-timers.html",
  "type": "Subsection",
  "number": "8.1.2",
  "title": "Hardware Timers: Counting Completely on Their Own",
  "body": " Hardware Timers: Counting Completely on Their Own  A hardware timer is a dedicated piece of digital circuitry built into the microcontroller chip — separate from the CPU — whose only job is to count clock pulses. It has its own counter register, its own clock input, and its own logic that detects when the count reaches a target value. It does not share the CPU's execution pipeline, and it does not need the CPU's attention to keep running.  Think of it this way: once you configure a hardware timer and start it, it keeps counting on its own whether the CPU is busy computing, waiting in a loop, executing a completely unrelated function, or even temporarily halted. You can think of it as a tiny, dedicated stopwatch chip wired into the same package — it simply counts, independently and continuously, until you tell it to stop.  The STM32C031C6 has five independent hardware timers: TIM1, TIM3, TIM14, TIM16, and TIM17. Each can be configured separately with its own period and its own purpose — one could be generating a 1 Hz heartbeat tick while another is producing a 20 kHz PWM signal for a motor, both running simultaneously with no CPU involvement.  Each timer consists of a few key parts: a prescaler that divides the system clock down to a slower rate, a counter (CNT) that increments on each prescaled tick, and an auto-reload register (ARR) that sets the value at which the counter resets to zero and signals that a period has elapsed. By choosing the prescaler and ARR, you can produce any timing period from microseconds to minutes. For example, with a 12 MHz system clock, a prescaler of 12000 brings the counter clock to 1 kHz (one tick per millisecond); setting ARR to 999 then makes the timer signal an event every 1000 ticks — exactly once per second. Your initialization code sets these registers once at startup, and after that the CPU never needs to touch the timer again during normal operation.  "
},
{
  "id": "subsec-hardware-timers-2",
  "level": "2",
  "url": "subsec-hardware-timers.html#subsec-hardware-timers-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "hardware timer "
},
{
  "id": "subsec-hardware-timers-5",
  "level": "2",
  "url": "subsec-hardware-timers.html#subsec-hardware-timers-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "prescaler counter auto-reload register "
},
{
  "id": "subsec-interrupts-concept",
  "level": "1",
  "url": "subsec-interrupts-concept.html",
  "type": "Subsection",
  "number": "8.1.3",
  "title": "Interrupts: How the CPU Finds Out",
  "body": " Interrupts: How the CPU Finds Out  A timer counting in the background is only useful if the CPU can find out when the timer fires — and ideally without constantly checking a status register in a loop. The mechanism for this is an interrupt .  An interrupt is a hardware signal — a wire, essentially — that runs from a peripheral (like a timer, a GPIO pin, or a UART) directly into the CPU's control logic. When that signal is asserted — when the timer period elapses, for example — the CPU notices it as soon as it finishes the instruction it is currently executing. It then automatically saves a snapshot of its working registers (so it can resume whatever it was doing) and jumps to a special function called an Interrupt Service Routine (ISR). When the ISR returns, the CPU restores the saved registers and picks up the main program exactly where it left off — as if nothing happened.  From the main program's perspective, the ISR runs invisibly between two instructions. The main loop can do useful work — reading sensors, updating a display, sending I2C messages — and is briefly diverted only when the timer fires. No polling, no spin loop, no wasted cycles. The result is software that is both responsive and productive: the hardware handles timing precisely, and the CPU is free to do real work in between.  One important rule: ISRs must be short. While an ISR is running, other interrupts of equal or lower priority are held pending. A slow ISR — one that loops or waits — can cause the system to miss events or delay responses unpredictably. The standard pattern is for an ISR to do the minimum necessary — set a flag, increment a counter, record a value — and let the main loop handle any time-consuming follow-up when it notices the flag.  "
},
{
  "id": "subsec-interrupts-concept-2",
  "level": "2",
  "url": "subsec-interrupts-concept.html#subsec-interrupts-concept-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "interrupt "
},
{
  "id": "subsec-interrupts-concept-3",
  "level": "2",
  "url": "subsec-interrupts-concept.html#subsec-interrupts-concept-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Interrupt Service Routine "
},
{
  "id": "rq-timers-interrupts-concepts",
  "level": "1",
  "url": "rq-timers-interrupts-concepts.html",
  "type": "Check Your Understanding",
  "number": "8.1.4",
  "title": "Check Your Understanding",
  "body": "  You write a delay by looping 120,000 times at a 12 MHz clock to get approximately 10 ms. Later, the clock is changed to 48 MHz. What happens to the delay?    The delay becomes approximately 2.5 ms — four times shorter — because the same number of iterations now executes four times faster.  Correct. Spin-loop delays are tied to clock speed. A hardware timer generates events based on real time elapsed, not iteration count, and remains accurate regardless of clock changes.    The delay stays at 10 ms because the compiler automatically adjusts loop counts for the new clock.  The compiler has no knowledge of the intended delay duration — it just generates instructions to execute the loop. It cannot adjust iteration counts to compensate for a clock change.    The delay becomes approximately 40 ms — four times longer — because the higher clock increases power consumption and slows timing.  A higher clock makes the CPU run faster, not slower. The same number of iterations executes in less time, making the delay shorter.    The delay is unaffected because loops always take the same wall-clock time regardless of clock speed.  Loops execute faster on a faster clock. A spin loop is directly dependent on clock speed.      A timer's input clock runs at 1 MHz after prescaling. The auto-reload register (ARR) is set to 499. How often does the timer generate an update event?    Every 500 µs — the counter increments every 1 µs and resets after 500 ticks (0 through 499).  Correct. The counter counts 0, 1, 2, … 499, then resets — that is 500 ticks at 1 µs each = 500 µs per period.    Every 499 µs — the counter counts from 1 to 499.  The counter counts from 0 to ARR inclusive, giving ARR + 1 = 500 ticks per period, not ARR = 499.    Every 1 ms — the timer always generates events at 1 kHz regardless of ARR.  The event period depends on both the prescaled clock frequency and ARR. ARR = 499 with a 1 MHz clock gives 500 µs, not 1 ms.    Every 1 µs — the timer fires on every clock tick.  The timer only fires when the counter reaches ARR and resets. With ARR = 499 it takes 500 clock ticks — 500 µs — between events.      Why should an Interrupt Service Routine be kept as short as possible?    While the ISR is running, other interrupts of equal or lower priority are blocked; a slow ISR can cause the system to miss events or delay responses.  Correct. The standard pattern is to set a flag or update a shared variable in the ISR and let the main loop handle any time-consuming work triggered by that flag.    ISRs have a fixed maximum execution time enforced by the hardware; any ISR that runs longer is automatically terminated.  The Cortex-M0+ does not impose a hardware time limit on ISRs. An ISR that runs indefinitely will simply block all other processing indefinitely — the system does not terminate it automatically.    Long ISRs corrupt the CPU's register save area, preventing the main program from resuming correctly.  The CPU saves and restores registers automatically on interrupt entry and exit. The problem with long ISRs is not register corruption but blocked responsiveness.    The compiler cannot optimize ISR code, so long ISRs waste more memory than equivalent main-loop code.  The compiler can optimize ISR code (subject to volatile constraints on shared variables). The reason to keep ISRs short is responsiveness, not memory usage.     "
},
{
  "id": "rq-spinloop-fragile",
  "level": "2",
  "url": "rq-timers-interrupts-concepts.html#rq-spinloop-fragile",
  "type": "Reading Question",
  "number": "8.1.4.1",
  "title": "",
  "body": " You write a delay by looping 120,000 times at a 12 MHz clock to get approximately 10 ms. Later, the clock is changed to 48 MHz. What happens to the delay?    The delay becomes approximately 2.5 ms — four times shorter — because the same number of iterations now executes four times faster.  Correct. Spin-loop delays are tied to clock speed. A hardware timer generates events based on real time elapsed, not iteration count, and remains accurate regardless of clock changes.    The delay stays at 10 ms because the compiler automatically adjusts loop counts for the new clock.  The compiler has no knowledge of the intended delay duration — it just generates instructions to execute the loop. It cannot adjust iteration counts to compensate for a clock change.    The delay becomes approximately 40 ms — four times longer — because the higher clock increases power consumption and slows timing.  A higher clock makes the CPU run faster, not slower. The same number of iterations executes in less time, making the delay shorter.    The delay is unaffected because loops always take the same wall-clock time regardless of clock speed.  Loops execute faster on a faster clock. A spin loop is directly dependent on clock speed.    "
},
{
  "id": "rq-timer-period",
  "level": "2",
  "url": "rq-timers-interrupts-concepts.html#rq-timer-period",
  "type": "Reading Question",
  "number": "8.1.4.2",
  "title": "",
  "body": " A timer's input clock runs at 1 MHz after prescaling. The auto-reload register (ARR) is set to 499. How often does the timer generate an update event?    Every 500 µs — the counter increments every 1 µs and resets after 500 ticks (0 through 499).  Correct. The counter counts 0, 1, 2, … 499, then resets — that is 500 ticks at 1 µs each = 500 µs per period.    Every 499 µs — the counter counts from 1 to 499.  The counter counts from 0 to ARR inclusive, giving ARR + 1 = 500 ticks per period, not ARR = 499.    Every 1 ms — the timer always generates events at 1 kHz regardless of ARR.  The event period depends on both the prescaled clock frequency and ARR. ARR = 499 with a 1 MHz clock gives 500 µs, not 1 ms.    Every 1 µs — the timer fires on every clock tick.  The timer only fires when the counter reaches ARR and resets. With ARR = 499 it takes 500 clock ticks — 500 µs — between events.    "
},
{
  "id": "rq-isr-short",
  "level": "2",
  "url": "rq-timers-interrupts-concepts.html#rq-isr-short",
  "type": "Reading Question",
  "number": "8.1.4.3",
  "title": "",
  "body": " Why should an Interrupt Service Routine be kept as short as possible?    While the ISR is running, other interrupts of equal or lower priority are blocked; a slow ISR can cause the system to miss events or delay responses.  Correct. The standard pattern is to set a flag or update a shared variable in the ISR and let the main loop handle any time-consuming work triggered by that flag.    ISRs have a fixed maximum execution time enforced by the hardware; any ISR that runs longer is automatically terminated.  The Cortex-M0+ does not impose a hardware time limit on ISRs. An ISR that runs indefinitely will simply block all other processing indefinitely — the system does not terminate it automatically.    Long ISRs corrupt the CPU's register save area, preventing the main program from resuming correctly.  The CPU saves and restores registers automatically on interrupt entry and exit. The problem with long ISRs is not register corruption but blocked responsiveness.    The compiler cannot optimize ISR code, so long ISRs waste more memory than equivalent main-loop code.  The compiler can optimize ISR code (subject to volatile constraints on shared variables). The reason to keep ISRs short is responsiveness, not memory usage.    "
},
{
  "id": "subsec-timer-block",
  "level": "1",
  "url": "subsec-timer-block.html",
  "type": "Subsection",
  "number": "8.2.1",
  "title": "TIM14 Block Diagram",
  "body": " TIM14 Block Diagram   Basic counter block: a register stores the current count; on each prescaled clock edge the counter increments; a multiplexer selects up or down counting; a comparator detects when the count reaches the auto-reload value and generates an update event.     TIM14 block diagram. The prescaled clock (PSC+1 divider) feeds the 16-bit counter (CNT). When CNT reaches ARR the counter resets to 0 and an update event is generated (UIF in TIM_SR).     TIM14 register map. The key registers for simple timing are: CR1 (enable\/disable the counter), PSC (prescaler value), ARR (auto-reload value), CNT (current count), and SR (status register with the UIF flag).     "
},
{
  "id": "fig-timer-counter-block",
  "level": "2",
  "url": "subsec-timer-block.html#fig-timer-counter-block",
  "type": "Figure",
  "number": "8.2.1",
  "title": "",
  "body": " Basic counter block: a register stores the current count; on each prescaled clock edge the counter increments; a multiplexer selects up or down counting; a comparator detects when the count reaches the auto-reload value and generates an update event.   "
},
{
  "id": "fig-tim14-block",
  "level": "2",
  "url": "subsec-timer-block.html#fig-tim14-block",
  "type": "Figure",
  "number": "8.2.2",
  "title": "",
  "body": " TIM14 block diagram. The prescaled clock (PSC+1 divider) feeds the 16-bit counter (CNT). When CNT reaches ARR the counter resets to 0 and an update event is generated (UIF in TIM_SR).   "
},
{
  "id": "fig-tim14-registers",
  "level": "2",
  "url": "subsec-timer-block.html#fig-tim14-registers",
  "type": "Figure",
  "number": "8.2.3",
  "title": "",
  "body": " TIM14 register map. The key registers for simple timing are: CR1 (enable\/disable the counter), PSC (prescaler value), ARR (auto-reload value), CNT (current count), and SR (status register with the UIF flag).    "
},
{
  "id": "subsec-timer-prescaler",
  "level": "1",
  "url": "subsec-timer-prescaler.html",
  "type": "Subsection",
  "number": "8.2.2",
  "title": "Setting Period and Prescaler",
  "body": " Setting Period and Prescaler  To generate a 500 ms period with a 12 MHz system clock, choose a prescaler and auto-reload value whose product gives 6 000 000 clock cycles:  Choose PSC = 12 000 − 1 (divides 12 MHz to 1 kHz) and ARR = 500 − 1 (counts 500 millisecond ticks). The counter resets every 500 ms. Both PSC and ARR are written as (desired value − 1) because the hardware counts from 0 to ARR inclusive.   Prescaler timing diagram. The system clock (top) is divided by PSC+1 to produce the counter clock. The counter increments on each counter clock edge and resets to 0 when it reaches ARR, generating a UIF event.    "
},
{
  "id": "fig-timer-prescaler",
  "level": "2",
  "url": "subsec-timer-prescaler.html#fig-timer-prescaler",
  "type": "Figure",
  "number": "8.2.4",
  "title": "",
  "body": " Prescaler timing diagram. The system clock (top) is divided by PSC+1 to produce the counter clock. The counter increments on each counter clock edge and resets to 0 when it reaches ARR, generating a UIF event.   "
},
{
  "id": "subsec-timer-polled",
  "level": "1",
  "url": "subsec-timer-polled.html",
  "type": "Subsection",
  "number": "8.2.3",
  "title": "Polled Timer",
  "body": " Polled Timer  The simplest use of TIM14 is to poll the UIF flag in the main loop.  #define PSC_FACTOR 12000 \/\/ 12 MHz \/ 12000 = 1 kHz counter clock #define ARR_FACTOR 500 \/\/ 1000 Hz \/ 500 = 2 Hz -> 500 ms period void tim14_500ms_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; \/\/ enable TIM14 clock TIM14->PSC = PSC_FACTOR - 1; \/\/ prescaler TIM14->ARR = ARR_FACTOR - 1; \/\/ auto-reload TIM14->CR1 |= TIM_CR1_CEN; \/\/ start counter } int main(void) { tim14_500ms_init(); while (1) { if (TIM14->SR & TIM_SR_UIF) { \/\/ check update flag TIM14->SR = ~TIM_SR_UIF; \/\/ clear flag (write-0-to-clear) GPIOA->ODR ^= LED_PIN; \/\/ toggle LED } \/\/ other work can happen here } }   Enabling the TIM14 clock in RCC_APBENR2. The TIM14EN bit is in the APB peripheral enable register 2. Without this, writes to TIM14 registers have no effect.     TIM14 prescaler (PSC) and auto-reload (ARR) registers. Both are written as (desired count − 1). The new values take effect at the next update event (when the counter wraps).     TIM14 Status Register (SR). The UIF (Update Interrupt Flag) bit is set by hardware at each update event. Clear it by writing 0 to bit 0. Note: unlike ADC_ISR (which uses write-1-to-clear), TIM_SR uses write-0-to-clear for UIF.     "
},
{
  "id": "fig-timer-setup-1",
  "level": "2",
  "url": "subsec-timer-polled.html#fig-timer-setup-1",
  "type": "Figure",
  "number": "8.2.5",
  "title": "",
  "body": " Enabling the TIM14 clock in RCC_APBENR2. The TIM14EN bit is in the APB peripheral enable register 2. Without this, writes to TIM14 registers have no effect.   "
},
{
  "id": "fig-timer-setup-2",
  "level": "2",
  "url": "subsec-timer-polled.html#fig-timer-setup-2",
  "type": "Figure",
  "number": "8.2.6",
  "title": "",
  "body": " TIM14 prescaler (PSC) and auto-reload (ARR) registers. Both are written as (desired count − 1). The new values take effect at the next update event (when the counter wraps).   "
},
{
  "id": "fig-timer-sr",
  "level": "2",
  "url": "subsec-timer-polled.html#fig-timer-sr",
  "type": "Figure",
  "number": "8.2.7",
  "title": "",
  "body": " TIM14 Status Register (SR). The UIF (Update Interrupt Flag) bit is set by hardware at each update event. Clear it by writing 0 to bit 0. Note: unlike ADC_ISR (which uses write-1-to-clear), TIM_SR uses write-0-to-clear for UIF.    "
},
{
  "id": "subsec-interrupt-mechanism",
  "level": "1",
  "url": "subsec-interrupt-mechanism.html",
  "type": "Subsection",
  "number": "8.3.1",
  "title": "How Interrupts Work",
  "body": " How Interrupts Work   What happens during a normal function call. The CPU pushes the return address (PC) and key registers onto the stack, loads the function start address into PC, executes the function, then pops the saved state on return.     What happens when an interrupt occurs. Hardware automatically pushes the CPU state (PC, PSR, r0–r3, r12, lr) onto the stack — the same mechanism as a function call. The interrupt controller (NVIC) loads the ISR address from a vector table into the PC. On return from the ISR, the hardware pops the saved state.    "
},
{
  "id": "fig-function-call-stack",
  "level": "2",
  "url": "subsec-interrupt-mechanism.html#fig-function-call-stack",
  "type": "Figure",
  "number": "8.3.1",
  "title": "",
  "body": " What happens during a normal function call. The CPU pushes the return address (PC) and key registers onto the stack, loads the function start address into PC, executes the function, then pops the saved state on return.   "
},
{
  "id": "fig-interrupt-mechanism",
  "level": "2",
  "url": "subsec-interrupt-mechanism.html#fig-interrupt-mechanism",
  "type": "Figure",
  "number": "8.3.2",
  "title": "",
  "body": " What happens when an interrupt occurs. Hardware automatically pushes the CPU state (PC, PSR, r0–r3, r12, lr) onto the stack — the same mechanism as a function call. The interrupt controller (NVIC) loads the ISR address from a vector table into the PC. On return from the ISR, the hardware pops the saved state.   "
},
{
  "id": "subsec-timer-interrupt",
  "level": "1",
  "url": "subsec-timer-interrupt.html",
  "type": "Subsection",
  "number": "8.3.2",
  "title": "Timer Interrupt Setup",
  "body": " Timer Interrupt Setup  Enabling a timer interrupt requires three steps in addition to the basic timer setup: enable the update interrupt in the timer itself (DIER), register the ISR with the NVIC (Nested Vectored Interrupt Controller), and write the ISR function with the correct name.   NVIC enable function for TIM14. The CMSIS function NVIC_EnableIRQ(TIM14_IRQn) sets the enable bit in the NVIC for the TIM14 interrupt line. The IRQ number is defined in the device header.     void tim14_500ms_interrupt_init(void) { __disable_irq(); \/\/ disable global interrupts during setup RCC->APBENR2 |= RCC_APBENR2_TIM14EN; TIM14->PSC = PSC_FACTOR - 1; TIM14->ARR = ARR_FACTOR - 1; TIM14->DIER |= TIM_DIER_UIE; \/\/ enable update interrupt in timer TIM14->CR1 |= TIM_CR1_CEN; \/\/ start counter NVIC_EnableIRQ(TIM14_IRQn); \/\/ enable TIM14 in NVIC __enable_irq(); \/\/ re-enable global interrupts } \/\/ ISR — name MUST match the vector table entry void TIM14_IRQHandler(void) { if (TIM14->SR & TIM_SR_UIF) { TIM14->SR = ~TIM_SR_UIF; \/\/ clear the flag first GPIOA->ODR ^= LED_PIN; \/\/ toggle LED } }   ISR best practices  Keep ISRs short. Long ISRs prevent other interrupts from being serviced. Set a volatile flag in the ISR and do the work in main: volatile uint8_t timerFired = 0; — set it in the ISR, check and clear it in while(1) . Never call blocking functions (like printf or delay_ms ) inside an ISR.   The volatile keyword tells the compiler that a variable can change outside the normal flow of the code (e.g., inside an ISR). Without it, the compiler may cache the variable in a register and never re-read it from memory, causing the main loop to never see the ISR's update.  "
},
{
  "id": "fig-timer-nvic",
  "level": "2",
  "url": "subsec-timer-interrupt.html#fig-timer-nvic",
  "type": "Figure",
  "number": "8.3.3",
  "title": "",
  "body": " NVIC enable function for TIM14. The CMSIS function NVIC_EnableIRQ(TIM14_IRQn) sets the enable bit in the NVIC for the TIM14 interrupt line. The IRQ number is defined in the device header.    "
},
{
  "id": "subsec-timer-interrupt-5",
  "level": "2",
  "url": "subsec-timer-interrupt.html#subsec-timer-interrupt-5",
  "type": "Insight",
  "number": "8.3.4",
  "title": "ISR best practices.",
  "body": " ISR best practices  Keep ISRs short. Long ISRs prevent other interrupts from being serviced. Set a volatile flag in the ISR and do the work in main: volatile uint8_t timerFired = 0; — set it in the ISR, check and clear it in while(1) . Never call blocking functions (like printf or delay_ms ) inside an ISR.  "
},
{
  "id": "subsec-exti-mux",
  "level": "1",
  "url": "subsec-exti-mux.html",
  "type": "Subsection",
  "number": "8.4.1",
  "title": "The EXTI Multiplexer",
  "body": " The EXTI Multiplexer  Each GPIO port has pins numbered 0–15. The EXTI block has 16 lines (EXTI0–15). Pin of any port maps to line EXTIn — but only one port can be connected to each EXTI line at a time. The EXTI_EXTICRx registers select which port drives each line.   EXTI GPIO multiplexer. Each EXTI line (0–15) can be connected to pin of Port A, B, C, D, or F via the EXTICR registers. Only one port per line at a time. EXTI4 would be connected to PB4 by writing the Port B code into EXTI_EXTICR2 bits [7:0].     "
},
{
  "id": "fig-exti-mux",
  "level": "2",
  "url": "subsec-exti-mux.html#fig-exti-mux",
  "type": "Figure",
  "number": "8.4.1",
  "title": "",
  "body": " EXTI GPIO multiplexer. Each EXTI line (0–15) can be connected to pin of Port A, B, C, D, or F via the EXTICR registers. Only one port per line at a time. EXTI4 would be connected to PB4 by writing the Port B code into EXTI_EXTICR2 bits [7:0].    "
},
{
  "id": "subsec-exti-config",
  "level": "1",
  "url": "subsec-exti-config.html",
  "type": "Subsection",
  "number": "8.4.2",
  "title": "Configuring a GPIO Interrupt on PB4",
  "body": " Configuring a GPIO Interrupt on PB4  Setting up an external interrupt for the button on PB4 (falling edge, active-low with pull-up) requires five steps.   Button on PB4 with pull-up and debounce capacitor. The falling edge occurs when the button is pressed (pin goes from HIGH to LOW). We configure EXTI to trigger on the falling edge.     EXTI Falling-Trigger Selection Register (FTSR1). Setting bit 4 enables falling-edge detection on EXTI4. A separate rising-trigger register (RTSR1) handles rising edges; both can be set simultaneously for any-edge detection.     EXTI Interrupt Mask Register (IMR1). Setting bit 4 unmasks EXTI4, allowing it to generate an interrupt request to the NVIC. A masked line is ignored even if an edge occurs.     NVIC enable for EXTI lines 4–15. On the STM32C031, EXTI lines 4–15 share a single NVIC interrupt line, EXTI4_15_IRQn . The ISR must check the EXTI_FPR1 register to determine which line triggered.    void pb4_exti_init(void) { __disable_irq(); \/\/ 1. Configure PB4 as input with pull-up RCC->IOPENR |= RCC_IOPENR_GPIOBEN; GPIOB->PUPDR &= ~(3U << 8); GPIOB->PUPDR |= (1U << 8); \/\/ pull-up \/\/ 2. Connect EXTI4 to Port B EXTI->EXTICR[1] &= ~EXTI_EXTICR2_EXTI4_Msk; EXTI->EXTICR[1] |= (EXTI_EXTICR2_EXTI4_PB); \/\/ 3. Enable falling-edge detection on EXTI4 EXTI->FTSR1 |= EXTI_FTSR1_FT4; \/\/ 4. Unmask EXTI4 EXTI->IMR1 |= EXTI_IMR1_IM4; \/\/ 5. Enable NVIC for EXTI4_15 NVIC_EnableIRQ(EXTI4_15_IRQn); __enable_irq(); } volatile uint8_t buttonPushed = 0; void EXTI4_15_IRQHandler(void) { __disable_irq(); if (EXTI->FPR1 & EXTI_FPR1_FPIF4) { EXTI->FPR1 = EXTI_FPR1_FPIF4; \/\/ clear pending flag (write-1-to-clear) buttonPushed = 1; } __enable_irq(); }   EXTI_EXTICR2 register showing Port B selected for EXTI4. The four-bit field [7:0] holds a port code: 0x01 = Port B. Bits [15:8], [23:16], [31:24] configure EXTI5, EXTI6, EXTI7 respectively.     EXTI ISR checking and clearing the pending flag. The Falling Pending Register (FPR1) has one bit per EXTI line; it is set by hardware on a falling edge and cleared by writing 1 to it. The ISR must clear FPR1 before returning or the interrupt will re-fire immediately.     The complete interrupt flow for a GPIO falling edge. After the EXTI detects the edge it sets the pending bit and signals the NVIC. The NVIC saves CPU state and vectors to the ISR. After the ISR returns, the CPU restores state and resumes the main loop exactly where it left off.    "
},
{
  "id": "fig-exti-button",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-button",
  "type": "Figure",
  "number": "8.4.2",
  "title": "",
  "body": " Button on PB4 with pull-up and debounce capacitor. The falling edge occurs when the button is pressed (pin goes from HIGH to LOW). We configure EXTI to trigger on the falling edge.   "
},
{
  "id": "fig-exti-ftsr",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-ftsr",
  "type": "Figure",
  "number": "8.4.3",
  "title": "",
  "body": " EXTI Falling-Trigger Selection Register (FTSR1). Setting bit 4 enables falling-edge detection on EXTI4. A separate rising-trigger register (RTSR1) handles rising edges; both can be set simultaneously for any-edge detection.   "
},
{
  "id": "fig-exti-imr",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-imr",
  "type": "Figure",
  "number": "8.4.4",
  "title": "",
  "body": " EXTI Interrupt Mask Register (IMR1). Setting bit 4 unmasks EXTI4, allowing it to generate an interrupt request to the NVIC. A masked line is ignored even if an edge occurs.   "
},
{
  "id": "fig-exti-nvic",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-nvic",
  "type": "Figure",
  "number": "8.4.5",
  "title": "",
  "body": " NVIC enable for EXTI lines 4–15. On the STM32C031, EXTI lines 4–15 share a single NVIC interrupt line, EXTI4_15_IRQn . The ISR must check the EXTI_FPR1 register to determine which line triggered.   "
},
{
  "id": "fig-exti-exticr",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-exticr",
  "type": "Figure",
  "number": "8.4.6",
  "title": "",
  "body": " EXTI_EXTICR2 register showing Port B selected for EXTI4. The four-bit field [7:0] holds a port code: 0x01 = Port B. Bits [15:8], [23:16], [31:24] configure EXTI5, EXTI6, EXTI7 respectively.   "
},
{
  "id": "fig-exti-isr",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-isr",
  "type": "Figure",
  "number": "8.4.7",
  "title": "",
  "body": " EXTI ISR checking and clearing the pending flag. The Falling Pending Register (FPR1) has one bit per EXTI line; it is set by hardware on a falling edge and cleared by writing 1 to it. The ISR must clear FPR1 before returning or the interrupt will re-fire immediately.   "
},
{
  "id": "fig-exti-int-flow",
  "level": "2",
  "url": "subsec-exti-config.html#fig-exti-int-flow",
  "type": "Figure",
  "number": "8.4.8",
  "title": "",
  "body": " The complete interrupt flow for a GPIO falling edge. After the EXTI detects the edge it sets the pending bit and signals the NVIC. The NVIC saves CPU state and vectors to the ISR. After the ISR returns, the CPU restores state and resumes the main loop exactly where it left off.   "
},
{
  "id": "subsec-interrupt-pitfalls",
  "level": "1",
  "url": "subsec-interrupt-pitfalls.html",
  "type": "Subsection",
  "number": "8.4.3",
  "title": "Common Interrupt Pitfalls",
  "body": " Common Interrupt Pitfalls  Modifying shared data inside an ISR can cause subtle bugs. If the ISR increments a multi-byte counter while main is reading it, the read may see a partially-updated value. The safest pattern: use the ISR only to set a single-byte volatile flag; let main do all the work when it sees that flag set.  A second pitfall: the compiler may see that timerFired is never written inside while(1) and optimize the check away entirely, replacing the loop body with an infinite busy-spin. Always declare ISR-shared variables volatile to prevent this.  "
},
{
  "id": "rq-interrupts",
  "level": "1",
  "url": "rq-interrupts.html",
  "type": "Check Your Understanding",
  "number": "8.4.4",
  "title": "Check Your Understanding",
  "body": "  A global variable uint8_t count is incremented in an ISR and printed in main. The program prints 0 forever even though the ISR runs every second. What is the most likely cause?   count is not declared volatile , so the compiler caches it in a register.  Correct. Without volatile , the compiler assumes the value in the register is always current and never re-reads from memory.  The ISR name is misspelled.  A misspelled ISR name would cause the ISR to never run, but the problem states the ISR runs every second.  The NVIC was not enabled.  If the NVIC were not enabled, the ISR would not run at all.  The timer prescaler is set incorrectly.  A wrong prescaler would affect the ISR timing, not the value of count .    "
},
{
  "id": "rq-volatile",
  "level": "2",
  "url": "rq-interrupts.html#rq-volatile",
  "type": "Reading Question",
  "number": "8.4.4.1",
  "title": "",
  "body": " A global variable uint8_t count is incremented in an ISR and printed in main. The program prints 0 forever even though the ISR runs every second. What is the most likely cause?   count is not declared volatile , so the compiler caches it in a register.  Correct. Without volatile , the compiler assumes the value in the register is always current and never re-reads from memory.  The ISR name is misspelled.  A misspelled ISR name would cause the ISR to never run, but the problem states the ISR runs every second.  The NVIC was not enabled.  If the NVIC were not enabled, the ISR would not run at all.  The timer prescaler is set incorrectly.  A wrong prescaler would affect the ISR timing, not the value of count .   "
},
{
  "id": "subsec-i2c-physical-reality",
  "level": "1",
  "url": "subsec-i2c-physical-reality.html",
  "type": "Subsection",
  "number": "9.1.1",
  "title": "Two Wires, One Shared Bus",
  "body": " Two Wires, One Shared Bus  I2C uses exactly two wires: SCL (Serial Clock) and SDA (Serial Data). Both wires run across the entire circuit, and every I2C device is physically connected to both — not through a separate pair to the controller, but tapped onto the same two wires as every other device. When the controller puts a bit on SDA, all peripherals see it simultaneously.  This shared physical medium is called a bus . The payoff is efficiency: a display, a temperature sensor, and an accelerometer all connect to the exact same two wires. Adding a fourth device requires no new wires at all.  Both lines idle HIGH, held there by pull-up resistors. Any device can pull a line LOW, but no device can actively force it HIGH — it only releases the line, and the resistor does the rest. This is open-drain signaling. It is what makes the shared bus safe: if two devices simultaneously drive SDA, neither one damages the other — the line simply goes LOW (a logical AND of all drivers), and every device can detect the situation.  "
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
  "number": "9.1.2",
  "title": "Addressing: Who Is Being Called?",
  "body": " Addressing: Who Is Being Called?  Since every device hears every bit, the protocol needs a way to reach one specific device without disturbing the others. Think of an office intercom system: when someone presses Conference Room B, the announcement plays over the same speakers as every other announcement — everyone hears it — but only the people in Conference Room B are expected to respond.  I2C works the same way. Every peripheral has a unique 7-bit address (assigned by its manufacturer and listed somewhere in the datasheet — often near the front, though the exact location varies). At the very start of each transaction, the controller broadcasts that 7-bit address plus a single read\/write bit — eight bits total, clocked out one by one on SDA. Every device on the bus receives those bits and silently compares them to its own address.  The device whose address matches responds by pulling SDA LOW during the ninth clock pulse. This one-bit response is the ACK (acknowledgment). From the controller's perspective: SDA LOW after the address byte means a device recognized the address and the transaction can continue. SDA staying HIGH is a NACK (not acknowledged) — no device claimed that address, which typically means a wrong address, an unpowered device, or a wiring problem.  After the address phase, data bytes follow in the same way, each acknowledged by the receiver (the peripheral for writes, the controller for reads). A NACK on a data byte tells the sender the receiver could not accept it.  "
},
{
  "id": "subsec-i2c-addressing-4",
  "level": "2",
  "url": "subsec-i2c-addressing.html#subsec-i2c-addressing-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "ACK NACK "
},
{
  "id": "subsec-i2c-start-stop",
  "level": "1",
  "url": "subsec-i2c-start-stop.html",
  "type": "Subsection",
  "number": "9.1.3",
  "title": "Framing: START and STOP Conditions",
  "body": " Framing: START and STOP Conditions  Normally, SDA is only allowed to change state while SCL is LOW — that is when the receiver knows not to sample the line. The protocol exploits the one exception to this rule to mark unambiguous transaction boundaries.  A START condition is SDA falling (going HIGH to LOW) while SCL is HIGH . This event can never occur during normal data transfer, so every device on the bus recognizes it immediately: a new transaction is beginning — pay attention.   A STOP condition is SDA rising (going LOW to HIGH) while SCL is HIGH. Again impossible as a data bit, it signals the transaction is complete — the bus is free.   Both are visible in . The SDA transitions at the START and STOP markers happen while SCL is HIGH; every other SDA edge in the diagram occurs while SCL is LOW. That contrast is the entire framing mechanism.   I2C write transaction timing. SCL (top trace) begins clocking as soon as the START condition has occurred. SDA (bottom trace, blue) shows: the START condition (SDA falls while SCL is HIGH); seven address bits plus the write bit (bit pattern 1 1 1 0 0 0 0 0 corresponding to address 0x70 with R\/W = 0); the ACK from the peripheral (SDA pulled LOW); eight data bits of 0xAA (= 10101010, MSB first), showing the alternating HIGH–LOW pattern; a second ACK; and finally the STOP condition (SDA rises while SCL is HIGH). Receivers sample SDA during the SCL HIGH phase; SDA is only permitted to change while SCL is LOW. The START and STOP conditions are the only exceptions to this rule.    "
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
  "id": "fig-i2c-frame-diagram",
  "level": "2",
  "url": "subsec-i2c-start-stop.html#fig-i2c-frame-diagram",
  "type": "Figure",
  "number": "9.1.1",
  "title": "",
  "body": " I2C write transaction timing. SCL (top trace) begins clocking as soon as the START condition has occurred. SDA (bottom trace, blue) shows: the START condition (SDA falls while SCL is HIGH); seven address bits plus the write bit (bit pattern 1 1 1 0 0 0 0 0 corresponding to address 0x70 with R\/W = 0); the ACK from the peripheral (SDA pulled LOW); eight data bits of 0xAA (= 10101010, MSB first), showing the alternating HIGH–LOW pattern; a second ACK; and finally the STOP condition (SDA rises while SCL is HIGH). Receivers sample SDA during the SCL HIGH phase; SDA is only permitted to change while SCL is LOW. The START and STOP conditions are the only exceptions to this rule.   "
},
{
  "id": "subsec-i2c-synchronous",
  "level": "1",
  "url": "subsec-i2c-synchronous.html",
  "type": "Subsection",
  "number": "9.1.4",
  "title": "No Baud Rate: I2C Is Synchronous",
  "body": " No Baud Rate: I2C Is Synchronous  Recall that UART requires both sides to agree on a baud rate in advance. If they disagree, the receiver samples bits at the wrong moments and the frame is corrupted.  I2C eliminates this problem. The controller generates SCL, and every peripheral (and the controller itself, when reading) samples SDA during the SCL HIGH phase, any time SCL is HIGH and SDA is guaranteed stable. The clock speed is set by the controller, but it must be one that every device on the bus can keep up with. The I2C standard defines common speeds: 100 kHz (Standard Mode), 400 kHz (Fast Mode), and 1 MHz (Fast-Mode Plus). In ENGS 28 we use 100 kHz. There is no baud rate for the peripheral to configure and no rate for the controller to negotiate. Adding a new sensor to the bus requires no timing changes on any existing device.  This is what synchronous means: the clock is shared, not reconstructed independently by each receiver. I2C is synchronous; UART is asynchronous. The price of synchronous communication is the extra wire for the clock — but since I2C also shares the data wire among all devices, the total wire count remains two.  "
},
{
  "id": "subsec-i2c-synchronous-4",
  "level": "2",
  "url": "subsec-i2c-synchronous.html#subsec-i2c-synchronous-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "synchronous "
},
{
  "id": "rq-i2c-how-it-works",
  "level": "1",
  "url": "rq-i2c-how-it-works.html",
  "type": "Check Your Understanding",
  "number": "9.1.5",
  "title": "Check Your Understanding",
  "body": "  An I2C bus has four peripherals connected to the same SCL and SDA lines. The controller sends an address byte of 0x70. How many of the four peripherals examine those address bits?    All four examine the address; only the one at address 0x70 responds with ACK.  Correct. Because all devices share SDA, every device sees every bit. Each one silently compares the received address to its own; only the matching device pulls SDA LOW for the ACK.    Only the peripheral at address 0x70 sees the bits; the others are unaware of the transaction.  All devices are physically connected to SDA and SCL — they all receive every bit. There is no mechanism to hide bits from particular devices before the address is matched.    Two peripherals are selected simultaneously; the one with the lower address wins.  Each I2C peripheral has a unique address. Only one device can match a given address byte, so there is no collision to resolve.    The controller pre-selects one device before sending the address byte, so only that device responds.  There is no such pre-selection step in I2C. The address byte itself is the selection — all devices evaluate it in parallel.      What makes a START condition impossible to confuse with a normal data bit?    SDA transitions while SCL is HIGH; data bits are only allowed to change while SCL is LOW.  Correct. The normal rule is that SDA must be stable during the SCL HIGH phase (that is when the receiver samples it). The START and STOP conditions deliberately violate this rule — a SDA edge while SCL is HIGH cannot be mistaken for a bit value.    The controller holds SCL LOW for twice as long before the START condition.  SCL timing does not change at the START. What distinguishes it is SDA changing while SCL is HIGH, not any change in SCL duty cycle.    The controller transmits a reserved 0xFF byte immediately before the START condition.  No such preamble exists in the I2C standard. START is identified entirely by the SDA\/SCL relationship.    SDA is held LOW for at least eight SCL cycles before data transmission begins.  SDA falls for one transition at the START condition — not for eight cycles. The key is when SDA changes (while SCL is HIGH), not how long it stays LOW.      After sending the 7-bit address and R\/W bit, the controller releases SDA and watches it during the ninth SCL pulse. SDA is HIGH during that pulse. What does this tell the controller?    No device recognized the address (NACK) — the controller should issue a STOP and not continue the transaction.  Correct. A matching device would pull SDA LOW (ACK). If SDA stays HIGH, no device claimed the address. The controller must issue a STOP to free the bus.    The transaction completed successfully and the data was received.  A successful address phase shows SDA LOW (ACK), not HIGH. SDA HIGH after the address byte means NACK — no device acknowledged.    The peripheral is busy and will pull SDA LOW on the next SCL pulse when it is ready.  I2C peripherals can use clock stretching (holding SCL LOW) to request more time, but a NACK on the address byte means the device either does not exist at that address or did not respond.    Two devices share the same address and are colliding on SDA, producing an indeterminate voltage.  If two devices shared an address and both tried to ACK, both would pull SDA LOW — the line would still be LOW (wired AND). SDA HIGH means no device responded at all.     "
},
{
  "id": "rq-i2c-bus-listeners",
  "level": "2",
  "url": "rq-i2c-how-it-works.html#rq-i2c-bus-listeners",
  "type": "Reading Question",
  "number": "9.1.5.1",
  "title": "",
  "body": " An I2C bus has four peripherals connected to the same SCL and SDA lines. The controller sends an address byte of 0x70. How many of the four peripherals examine those address bits?    All four examine the address; only the one at address 0x70 responds with ACK.  Correct. Because all devices share SDA, every device sees every bit. Each one silently compares the received address to its own; only the matching device pulls SDA LOW for the ACK.    Only the peripheral at address 0x70 sees the bits; the others are unaware of the transaction.  All devices are physically connected to SDA and SCL — they all receive every bit. There is no mechanism to hide bits from particular devices before the address is matched.    Two peripherals are selected simultaneously; the one with the lower address wins.  Each I2C peripheral has a unique address. Only one device can match a given address byte, so there is no collision to resolve.    The controller pre-selects one device before sending the address byte, so only that device responds.  There is no such pre-selection step in I2C. The address byte itself is the selection — all devices evaluate it in parallel.    "
},
{
  "id": "rq-i2c-start-unique",
  "level": "2",
  "url": "rq-i2c-how-it-works.html#rq-i2c-start-unique",
  "type": "Reading Question",
  "number": "9.1.5.2",
  "title": "",
  "body": " What makes a START condition impossible to confuse with a normal data bit?    SDA transitions while SCL is HIGH; data bits are only allowed to change while SCL is LOW.  Correct. The normal rule is that SDA must be stable during the SCL HIGH phase (that is when the receiver samples it). The START and STOP conditions deliberately violate this rule — a SDA edge while SCL is HIGH cannot be mistaken for a bit value.    The controller holds SCL LOW for twice as long before the START condition.  SCL timing does not change at the START. What distinguishes it is SDA changing while SCL is HIGH, not any change in SCL duty cycle.    The controller transmits a reserved 0xFF byte immediately before the START condition.  No such preamble exists in the I2C standard. START is identified entirely by the SDA\/SCL relationship.    SDA is held LOW for at least eight SCL cycles before data transmission begins.  SDA falls for one transition at the START condition — not for eight cycles. The key is when SDA changes (while SCL is HIGH), not how long it stays LOW.    "
},
{
  "id": "rq-i2c-nack-meaning",
  "level": "2",
  "url": "rq-i2c-how-it-works.html#rq-i2c-nack-meaning",
  "type": "Reading Question",
  "number": "9.1.5.3",
  "title": "",
  "body": " After sending the 7-bit address and R\/W bit, the controller releases SDA and watches it during the ninth SCL pulse. SDA is HIGH during that pulse. What does this tell the controller?    No device recognized the address (NACK) — the controller should issue a STOP and not continue the transaction.  Correct. A matching device would pull SDA LOW (ACK). If SDA stays HIGH, no device claimed the address. The controller must issue a STOP to free the bus.    The transaction completed successfully and the data was received.  A successful address phase shows SDA LOW (ACK), not HIGH. SDA HIGH after the address byte means NACK — no device acknowledged.    The peripheral is busy and will pull SDA LOW on the next SCL pulse when it is ready.  I2C peripherals can use clock stretching (holding SCL LOW) to request more time, but a NACK on the address byte means the device either does not exist at that address or did not respond.    Two devices share the same address and are colliding on SDA, producing an indeterminate voltage.  If two devices shared an address and both tried to ACK, both would pull SDA LOW — the line would still be LOW (wired AND). SDA HIGH means no device responded at all.    "
},
{
  "id": "sec-i2c-motivation",
  "level": "1",
  "url": "sec-i2c-motivation.html",
  "type": "Section",
  "number": "9.2",
  "title": "Motivation: Driving a 7-Segment Display",
  "body": " Motivation: Driving a 7-Segment Display   A four-digit 7-segment LED display. Each digit has 7 segment LEDs plus a decimal point — 8 signals per digit, 32 total. Driving them all directly from GPIO would require more pins than the Nucleo exposes. An I2C controller backpack (HT16K33) reduces this to two wires.    "
},
{
  "id": "fig-7seg-display",
  "level": "2",
  "url": "sec-i2c-motivation.html#fig-7seg-display",
  "type": "Figure",
  "number": "9.2.1",
  "title": "",
  "body": " A four-digit 7-segment LED display. Each digit has 7 segment LEDs plus a decimal point — 8 signals per digit, 32 total. Driving them all directly from GPIO would require more pins than the Nucleo exposes. An I2C controller backpack (HT16K33) reduces this to two wires.   "
},
{
  "id": "sec-i2c-protocol",
  "level": "1",
  "url": "sec-i2c-protocol.html",
  "type": "Section",
  "number": "9.3",
  "title": "The I2C Protocol",
  "body": " The I2C Protocol  I2C is a synchronous, multi-device serial bus. SCL is driven by the controller (the MCU); SDA is bidirectional. Both lines idle HIGH via pull-up resistors.   Comparison of UART and I2C. UART is asynchronous (no clock), uses separate TX and RX wires, and is point-to-point. I2C is synchronous (shared SCL), uses a single bidirectional SDA, and supports many devices on one bus.     I2C bus topology. All devices connect to the same SCL and SDA lines. Pull-up resistors keep both lines HIGH when no device is driving them. The controller generates SCL; any device (controller or target) can pull SDA LOW.    A transaction begins with a START condition (SDA pulled LOW while SCL is HIGH). The controller then clocks out the 7-bit target address followed by a read\/write bit. The addressed device acknowledges (pulls SDA LOW for one clock) — the ACK . Data bytes follow, each acknowledged by the receiver. The transaction ends with a STOP condition (SDA released HIGH while SCL is HIGH).   I2C timing diagram showing START, 7-bit address, R\/W bit, ACK, data byte, and STOP. SDA is only allowed to change while SCL is LOW; the START and STOP conditions are the only exceptions (they change while SCL is HIGH).     Detailed I2C bit-level protocol. The controller drives SCL. For each data bit, SDA must be stable while SCL is HIGH. The target pulls SDA LOW during the ACK clock pulse to confirm receipt; if it does not (NACK), the controller knows something is wrong — typically a wrong address.      You ping address 0x70 but the device is actually at 0x60. What appears on the SDA line after the 8th SCL pulse (the ACK bit)?   SDA stays HIGH (NACK) — no device at 0x70 pulls it low.  Correct. A NACK means no device recognized the address. The controller must issue a STOP and try again.  SDA is pulled LOW (ACK) — the device responds anyway.  Only the device at address 0x70 would ACK; since there is none, the line stays HIGH.  SCL stops toggling until a device responds.  The controller generates SCL continuously; it does not wait for a device to claim the clock.  A bus fault exception is generated on the STM32.  The I2C hardware sets an error flag, but no CPU exception is generated automatically.     "
},
{
  "id": "sec-i2c-protocol-2",
  "level": "2",
  "url": "sec-i2c-protocol.html#sec-i2c-protocol-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "controller "
},
{
  "id": "fig-i2c-vs-uart",
  "level": "2",
  "url": "sec-i2c-protocol.html#fig-i2c-vs-uart",
  "type": "Figure",
  "number": "9.3.1",
  "title": "",
  "body": " Comparison of UART and I2C. UART is asynchronous (no clock), uses separate TX and RX wires, and is point-to-point. I2C is synchronous (shared SCL), uses a single bidirectional SDA, and supports many devices on one bus.   "
},
{
  "id": "fig-i2c-bus",
  "level": "2",
  "url": "sec-i2c-protocol.html#fig-i2c-bus",
  "type": "Figure",
  "number": "9.3.2",
  "title": "",
  "body": " I2C bus topology. All devices connect to the same SCL and SDA lines. Pull-up resistors keep both lines HIGH when no device is driving them. The controller generates SCL; any device (controller or target) can pull SDA LOW.   "
},
{
  "id": "sec-i2c-protocol-5",
  "level": "2",
  "url": "sec-i2c-protocol.html#sec-i2c-protocol-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "START condition ACK STOP condition "
},
{
  "id": "fig-i2c-timing",
  "level": "2",
  "url": "sec-i2c-protocol.html#fig-i2c-timing",
  "type": "Figure",
  "number": "9.3.3",
  "title": "",
  "body": " I2C timing diagram showing START, 7-bit address, R\/W bit, ACK, data byte, and STOP. SDA is only allowed to change while SCL is LOW; the START and STOP conditions are the only exceptions (they change while SCL is HIGH).   "
},
{
  "id": "fig-i2c-protocol-detail",
  "level": "2",
  "url": "sec-i2c-protocol.html#fig-i2c-protocol-detail",
  "type": "Figure",
  "number": "9.3.4",
  "title": "",
  "body": " Detailed I2C bit-level protocol. The controller drives SCL. For each data bit, SDA must be stable while SCL is HIGH. The target pulls SDA LOW during the ACK clock pulse to confirm receipt; if it does not (NACK), the controller knows something is wrong — typically a wrong address.   "
},
{
  "id": "rq-i2c-nack",
  "level": "2",
  "url": "rq-i2c-protocol.html#rq-i2c-nack",
  "type": "Reading Question",
  "number": "9.3.1",
  "title": "",
  "body": " You ping address 0x70 but the device is actually at 0x60. What appears on the SDA line after the 8th SCL pulse (the ACK bit)?   SDA stays HIGH (NACK) — no device at 0x70 pulls it low.  Correct. A NACK means no device recognized the address. The controller must issue a STOP and try again.  SDA is pulled LOW (ACK) — the device responds anyway.  Only the device at address 0x70 would ACK; since there is none, the line stays HIGH.  SCL stops toggling until a device responds.  The controller generates SCL continuously; it does not wait for a device to claim the clock.  A bus fault exception is generated on the STM32.  The I2C hardware sets an error flag, but no CPU exception is generated automatically.   "
},
{
  "id": "subsec-i2c-pins",
  "level": "1",
  "url": "subsec-i2c-pins.html",
  "type": "Subsection",
  "number": "9.4.1",
  "title": "Pin Configuration",
  "body": " Pin Configuration   I2C-capable pins on the Nucleo board. PB8 and PB9 (the standard Arduino I2C header pins, labeled SCL and SDA) connect to I2C1 with AF1. Both pins must be configured as open-drain outputs in alternate function mode, with external pull-up resistors on both lines.    "
},
{
  "id": "fig-i2c-pins",
  "level": "2",
  "url": "subsec-i2c-pins.html#fig-i2c-pins",
  "type": "Figure",
  "number": "9.4.1",
  "title": "",
  "body": " I2C-capable pins on the Nucleo board. PB8 and PB9 (the standard Arduino I2C header pins, labeled SCL and SDA) connect to I2C1 with AF1. Both pins must be configured as open-drain outputs in alternate function mode, with external pull-up resistors on both lines.   "
},
{
  "id": "subsec-i2c-timingr",
  "level": "1",
  "url": "subsec-i2c-timingr.html",
  "type": "Subsection",
  "number": "9.4.2",
  "title": "The Timing Register",
  "body": " The Timing Register  The I2C_TIMINGR register controls the SCL frequency by specifying the durations of the high and low phases, the rise and fall time compensations, and a prescaler. For 100 kHz standard mode with a 12 MHz clock, the reference manual provides recommended values.   I2C_TIMINGR register fields. PRESC divides the clock; SCLDEL and SDADEL compensate for rise\/fall times; SCLH and SCLL set the high and low phase durations. Together they determine the SCL frequency and satisfy the I2C timing spec.      I2C initialization timing summary showing how PRESC, SCLDEL, SDADEL, SCLH, and SCLL combine to produce 100 kHz SCL from a 12 MHz peripheral clock.    void i2c1_init(void) { \/\/ Enable clocks for GPIOB and I2C1 RCC->IOPENR |= RCC_IOPENR_GPIOBEN; RCC->APBENR1 |= RCC_APBENR1_I2C1EN; \/\/ PB8 (SCL) and PB9 (SDA): Alternate Function mode (AF6 = I2C1) GPIOB->MODER &= ~((3U << 16) | (3U << 18)); \/\/ clear MODER for PB8, PB9 GPIOB->MODER |= ((2U << 16) | (2U << 18)); \/\/ AF mode GPIOB->OTYPER |= (1U << 8) | (1U << 9); \/\/ open-drain GPIOB->AFR[1] &= ~((0xFU << 0) | (0xFU << 4)); GPIOB->AFR[1] |= ((6U << 0) | (6U << 4)); \/\/ AF6 = I2C1 \/\/ Configure timing for 100 kHz @ 12 MHz clock I2C1->TIMINGR = 0x00000002 | (0x4U << I2C_TIMINGR_SCLDEL_Pos) | (0x2U << I2C_TIMINGR_SDADEL_Pos) | (0xFU << I2C_TIMINGR_SCLH_Pos) | (0x13U<< I2C_TIMINGR_SCLL_Pos); \/\/ Enable I2C1 I2C1->CR1 |= I2C_CR1_PE; }  "
},
{
  "id": "fig-i2c-timingr",
  "level": "2",
  "url": "subsec-i2c-timingr.html#fig-i2c-timingr",
  "type": "Figure",
  "number": "9.4.2",
  "title": "",
  "body": " I2C_TIMINGR register fields. PRESC divides the clock; SCLDEL and SDADEL compensate for rise\/fall times; SCLH and SCLL set the high and low phase durations. Together they determine the SCL frequency and satisfy the I2C timing spec.    "
},
{
  "id": "fig-i2c-init-summary",
  "level": "2",
  "url": "subsec-i2c-timingr.html#fig-i2c-init-summary",
  "type": "Figure",
  "number": "9.4.3",
  "title": "",
  "body": " I2C initialization timing summary showing how PRESC, SCLDEL, SDADEL, SCLH, and SCLL combine to produce 100 kHz SCL from a 12 MHz peripheral clock.   "
},
{
  "id": "subsec-i2c-send-receive",
  "level": "1",
  "url": "subsec-i2c-send-receive.html",
  "type": "Subsection",
  "number": "9.4.3",
  "title": "Sending and Receiving",
  "body": " Sending and Receiving   I2C Control Register 2 (CR2). To start a transaction, write the target address (SADD), the transfer direction (RD_WRN), the byte count (NBYTES), and set START. The hardware generates the START condition and address phase automatically.      STM32 I2C hardware block showing the shift register, address match logic, and relevant registers: CR1 (enable\/interrupt config), CR2 (transaction control), TIMINGR (SCL timing), ISR (status), and TXDR\/RXDR (data registers).    "
},
{
  "id": "fig-i2c-cr2",
  "level": "2",
  "url": "subsec-i2c-send-receive.html#fig-i2c-cr2",
  "type": "Figure",
  "number": "9.4.4",
  "title": "",
  "body": " I2C Control Register 2 (CR2). To start a transaction, write the target address (SADD), the transfer direction (RD_WRN), the byte count (NBYTES), and set START. The hardware generates the START condition and address phase automatically.    "
},
{
  "id": "fig-i2c-hardware",
  "level": "2",
  "url": "subsec-i2c-send-receive.html#fig-i2c-hardware",
  "type": "Figure",
  "number": "9.4.5",
  "title": "",
  "body": " STM32 I2C hardware block showing the shift register, address match logic, and relevant registers: CR1 (enable\/interrupt config), CR2 (transaction control), TIMINGR (SCL timing), ISR (status), and TXDR\/RXDR (data registers).   "
},
{
  "id": "subsec-7seg-display",
  "level": "1",
  "url": "subsec-7seg-display.html",
  "type": "Subsection",
  "number": "9.5.1",
  "title": "Display Wiring and RAM Map",
  "body": " Display Wiring and RAM Map   AD2 and Nucleo wiring for the HT16K33 display. The SCL (yellow) and SDA (blue) lines from PB8\/PB9 connect to the display's backpack. Pull-up resistors on the breakout board are already installed.     Internal wiring of the four-digit 7-segment display. All four digits share the seven segment anodes (a–g) but have separate cathodes. The HT16K33 drives 9 anode lines and 5 cathode lines using time-division multiplexing, reducing the required I\/O to 14 lines — plus I2C control.     HT16K33 controller block diagram. Internal RAM holds the display data (which segments are on). I2C commands write RAM and control oscillator, brightness, and blink rate.      HT16K33 display RAM structure. Each pair of bytes controls one digit; the first byte holds the seven segment bits (a–g) and the decimal point. To light segment G of digit 0, write 0b01000000 to RAM address 0.    "
},
{
  "id": "fig-7seg-wiring",
  "level": "2",
  "url": "subsec-7seg-display.html#fig-7seg-wiring",
  "type": "Figure",
  "number": "9.5.1",
  "title": "",
  "body": " AD2 and Nucleo wiring for the HT16K33 display. The SCL (yellow) and SDA (blue) lines from PB8\/PB9 connect to the display's backpack. Pull-up resistors on the breakout board are already installed.   "
},
{
  "id": "fig-7seg-digit-wiring",
  "level": "2",
  "url": "subsec-7seg-display.html#fig-7seg-digit-wiring",
  "type": "Figure",
  "number": "9.5.2",
  "title": "",
  "body": " Internal wiring of the four-digit 7-segment display. All four digits share the seven segment anodes (a–g) but have separate cathodes. The HT16K33 drives 9 anode lines and 5 cathode lines using time-division multiplexing, reducing the required I\/O to 14 lines — plus I2C control.   "
},
{
  "id": "fig-ht16k33-block",
  "level": "2",
  "url": "subsec-7seg-display.html#fig-ht16k33-block",
  "type": "Figure",
  "number": "9.5.3",
  "title": "",
  "body": " HT16K33 controller block diagram. Internal RAM holds the display data (which segments are on). I2C commands write RAM and control oscillator, brightness, and blink rate.    "
},
{
  "id": "fig-ht16k33-ram",
  "level": "2",
  "url": "subsec-7seg-display.html#fig-ht16k33-ram",
  "type": "Figure",
  "number": "9.5.4",
  "title": "",
  "body": " HT16K33 display RAM structure. Each pair of bytes controls one digit; the first byte holds the seven segment bits (a–g) and the decimal point. To light segment G of digit 0, write 0b01000000 to RAM address 0.   "
},
{
  "id": "subsec-7seg-driver",
  "level": "1",
  "url": "subsec-7seg-driver.html",
  "type": "Subsection",
  "number": "9.5.2",
  "title": "Firmware Architecture",
  "body": " Firmware Architecture   Firmware design layers for the display. The I2C library ( i2c.c ) handles physical bus timing; the device driver ( SevenSeg.c ) translates display commands into I2C write sequences; application code calls high-level functions like SevenSeg_writeDigit() without knowing about I2C at all.     HT16K33 initialization I2C sequence. Two commands are needed: turn on the internal oscillator (0x21) and then configure the display mode and blink rate (0x81 = display on, no blink). Each command is a one-byte write to the device address.    "
},
{
  "id": "fig-firmware-layers",
  "level": "2",
  "url": "subsec-7seg-driver.html#fig-firmware-layers",
  "type": "Figure",
  "number": "9.5.5",
  "title": "",
  "body": " Firmware design layers for the display. The I2C library ( i2c.c ) handles physical bus timing; the device driver ( SevenSeg.c ) translates display commands into I2C write sequences; application code calls high-level functions like SevenSeg_writeDigit() without knowing about I2C at all.   "
},
{
  "id": "fig-ht16k33-init",
  "level": "2",
  "url": "subsec-7seg-driver.html#fig-ht16k33-init",
  "type": "Figure",
  "number": "9.5.6",
  "title": "",
  "body": " HT16K33 initialization I2C sequence. Two commands are needed: turn on the internal oscillator (0x21) and then configure the display mode and blink rate (0x81 = display on, no blink). Each command is a one-byte write to the device address.   "
},
{
  "id": "subsec-i2c-scope",
  "level": "1",
  "url": "subsec-i2c-scope.html",
  "type": "Subsection",
  "number": "9.5.3",
  "title": "Debugging I2C with the AD2 Logic Analyzer",
  "body": " Debugging I2C with the AD2 Logic Analyzer   AD2 wiring for I2C monitoring. The digital channels (in the larger flying-lead bundle) connect: DIO0 to SDA, DIO1 to SCL, and one ground lead to circuit GND. The Waveforms Logic Analyzer then decodes the I2C protocol automatically.      Waveforms Logic Analyzer capture of an I2C transaction pinging address 0x70. The decoded display shows the START condition, 7-bit address (0x70 shown as 0x38 because the hardware right-shifts by one), the write bit (0), the ACK from the display, and the STOP condition.     Logic analyzer capture when pinging the wrong address (0x60). After the address byte, SDA remains HIGH (NACK) because no device acknowledges. The I2C hardware detects this and sets an error flag in ISR.     Waveforms Logic Analyzer setup for I2C decoding. Add DIO0 (SDA) and DIO1 (SCL) as digital channels, then add an I2C bus decoder selecting those signals. Set the time base to ~20 µs to see individual bits at 100 kHz.    "
},
{
  "id": "fig-i2c-scope-wiring",
  "level": "2",
  "url": "subsec-i2c-scope.html#fig-i2c-scope-wiring",
  "type": "Figure",
  "number": "9.5.7",
  "title": "",
  "body": " AD2 wiring for I2C monitoring. The digital channels (in the larger flying-lead bundle) connect: DIO0 to SDA, DIO1 to SCL, and one ground lead to circuit GND. The Waveforms Logic Analyzer then decodes the I2C protocol automatically.    "
},
{
  "id": "fig-i2c-scope-capture",
  "level": "2",
  "url": "subsec-i2c-scope.html#fig-i2c-scope-capture",
  "type": "Figure",
  "number": "9.5.8",
  "title": "",
  "body": " Waveforms Logic Analyzer capture of an I2C transaction pinging address 0x70. The decoded display shows the START condition, 7-bit address (0x70 shown as 0x38 because the hardware right-shifts by one), the write bit (0), the ACK from the display, and the STOP condition.   "
},
{
  "id": "fig-i2c-scope-nack",
  "level": "2",
  "url": "subsec-i2c-scope.html#fig-i2c-scope-nack",
  "type": "Figure",
  "number": "9.5.9",
  "title": "",
  "body": " Logic analyzer capture when pinging the wrong address (0x60). After the address byte, SDA remains HIGH (NACK) because no device acknowledges. The I2C hardware detects this and sets an error flag in ISR.   "
},
{
  "id": "fig-i2c-waveforms-setup",
  "level": "2",
  "url": "subsec-i2c-scope.html#fig-i2c-waveforms-setup",
  "type": "Figure",
  "number": "9.5.10",
  "title": "",
  "body": " Waveforms Logic Analyzer setup for I2C decoding. Add DIO0 (SDA) and DIO1 (SCL) as digital channels, then add an I2C bus decoder selecting those signals. Set the time base to ~20 µs to see individual bits at 100 kHz.   "
},
{
  "id": "sec-i2c-accel-driver",
  "level": "1",
  "url": "sec-i2c-accel-driver.html",
  "type": "Section",
  "number": "9.6",
  "title": "I2C Device Driver Pattern",
  "body": " I2C Device Driver Pattern  All I2C sensor drivers follow the same pattern: read from a register, write to a register, and initialize. The I2C library functions i2c1_byteWrite() , i2c1_memWrite() , and i2c1_memRead() provide the building blocks; the device driver wraps them with device-specific addresses and data formats.   I2C read and write transfer patterns. A register write sends: START, device address + W, register address (ACK), data byte (ACK), STOP. A register read sends: START, device address + W, register address (ACK), repeated START, device address + R, data byte, NACK, STOP.     Firmware layers for the LSM303AGR accelerometer, mirroring the display driver architecture. The same I2C library is reused; only the device driver layer changes.    "
},
{
  "id": "fig-i2c-transfer-pattern",
  "level": "2",
  "url": "sec-i2c-accel-driver.html#fig-i2c-transfer-pattern",
  "type": "Figure",
  "number": "9.6.1",
  "title": "",
  "body": " I2C read and write transfer patterns. A register write sends: START, device address + W, register address (ACK), data byte (ACK), STOP. A register read sends: START, device address + W, register address (ACK), repeated START, device address + R, data byte, NACK, STOP.   "
},
{
  "id": "fig-firmware-layers-accel",
  "level": "2",
  "url": "sec-i2c-accel-driver.html#fig-firmware-layers-accel",
  "type": "Figure",
  "number": "9.6.2",
  "title": "",
  "body": " Firmware layers for the LSM303AGR accelerometer, mirroring the display driver architecture. The same I2C library is reused; only the device driver layer changes.   "
},
{
  "id": "subsec-dc-motor-physics",
  "level": "1",
  "url": "subsec-dc-motor-physics.html",
  "type": "Subsection",
  "number": "10.1.1",
  "title": "How a DC Motor Works",
  "body": " How a DC Motor Works   How a DC motor works. Watch this short video before reading the explanation below — the animation makes the relationship between current, magnetic field, and rotation much easier to follow.    Inside a DC permanent-magnet motor, electrical current flows through coils wound around a rotating armature. The current creates a magnetic field that interacts with the permanent magnets in the motor's housing, producing a force — and therefore torque — on the armature. The armature rotates, and a mechanical commutator (or electronic equivalent) continuously switches the current direction in the coils to keep the torque acting in the same rotational direction.  Two relationships govern DC motor behavior. First, torque is proportional to current: more current means more force on the armature. Second, at steady state, speed is approximately proportional to the voltage applied across the motor terminals. A higher voltage drives more current through the coil resistance, producing more torque, which accelerates the motor until a back-EMF (a voltage generated by the spinning motor itself, opposing the supply) limits further acceleration. At that equilibrium, speed is roughly proportional to supply voltage.  Direction is controlled by polarity: reverse the voltage across the motor terminals and the current through the armature reverses, the magnetic force reverses, and the motor spins the other way. This means that to control a DC motor from a microcontroller we need two things: a way to switch the polarity of the voltage, and a way to vary the magnitude of the average voltage to set speed.  "
},
{
  "id": "fig-dc-motor-video",
  "level": "2",
  "url": "subsec-dc-motor-physics.html#fig-dc-motor-video",
  "type": "Figure",
  "number": "10.1.1",
  "title": "",
  "body": " How a DC motor works. Watch this short video before reading the explanation below — the animation makes the relationship between current, magnetic field, and rotation much easier to follow.   "
},
{
  "id": "subsec-hbridge-concept",
  "level": "1",
  "url": "subsec-hbridge-concept.html",
  "type": "Subsection",
  "number": "10.1.2",
  "title": "The H-Bridge: Switching Direction",
  "body": " The H-Bridge: Switching Direction   H-bridge circuit. Four MOSFETs are arranged in an H around the motor (M), with the motor forming the crossbar. The two top transistors connect to the motor supply voltage (Motor VCC); the two bottom transistors connect to ground. Closing one diagonal pair (top-left and bottom-right, or top-right and bottom-left) directs current through the motor in one direction or the other.    A GPIO pin can source or sink only a few milliamps, and it can only drive to ground or 3.3 V — it cannot reverse polarity or supply the hundreds of milliamps a motor typically needs. A motor driver IC solves both problems. At its heart is an H-bridge : a circuit of four switches arranged in an H shape around the motor.  Each switch in the H-bridge is a transistor (the same concept as in the transistors chapter). By closing two specific switches and opening the other two, current is directed through the motor in one direction. Swapping which pair is closed reverses the current and therefore reverses the motor direction. A third configuration — connecting both motor terminals to the same voltage rail — brakes the motor by short-circuiting the back-EMF.  In this course we use the TB6612FNG motor driver IC, which integrates an H-bridge capable of supplying up to 1.2 A continuous. The MCU controls it through two logic-level input pins (IN1 and IN2) that determine direction and brake mode, plus a PWM input that controls speed. The motor is powered from a separate supply (up to 15 V), keeping the high-current motor path entirely separate from the 3.3 V MCU circuitry.  "
},
{
  "id": "fig-hbridge-concept",
  "level": "2",
  "url": "subsec-hbridge-concept.html#fig-hbridge-concept",
  "type": "Figure",
  "number": "10.1.2",
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
  "number": "10.1.3",
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
  "number": "10.1.4",
  "title": "Check Your Understanding",
  "body": "  A DC motor is spinning clockwise. What change to the electrical circuit would make it spin counter-clockwise?    Reverse the polarity of the voltage across the motor terminals so current flows through the armature in the opposite direction.  Correct. Reversing current direction reverses the magnetic force on the armature, reversing the torque and therefore the direction of rotation. This is what the H-bridge does when you swap which switch pair is closed.    Increase the supply voltage so the motor overspeeds and the commutator reverses automatically.  Increasing voltage increases speed but does not reverse direction. There is no automatic commutator reversal from overspeed.    Reduce the duty cycle to 0% so the motor decelerates and then spins backwards.  A 0% duty cycle removes power and the motor coasts to a stop, but does not cause it to spin backwards. Reversing direction requires reversing current, not just reducing it.    Connect both motor terminals to the same voltage rail.  Connecting both terminals to the same rail (brake mode) stops the motor by short-circuiting the back-EMF. It does not reverse the direction.      A PWM signal switches between 0 V and 5 V at 10 kHz. The duty cycle is set to 30%. What average voltage does the motor see?    1.5 V — 30% of 5 V.  Correct. Average voltage = duty cycle × supply voltage = 0.30 × 5 V = 1.5 V. The motor's mechanical inertia averages the rapid switching and the shaft speed corresponds to this average voltage.    5 V — the motor always sees the full supply voltage when PWM is used.  PWM delivers the full supply voltage only during the HIGH phase, which is 30% of each cycle. The effective average is 1.5 V.    3.5 V — the motor sees the supply minus the duty cycle percentage.  Average voltage = duty cycle × supply, not supply minus duty cycle. 30% duty at 5 V gives 1.5 V, not 3.5 V.    0 V — at 30% duty cycle the motor receives less than 50% and cannot spin.  There is no 50% threshold. The motor receives an average of 1.5 V at 30% duty cycle and will spin at a reduced speed proportional to that average voltage.      To change motor speed, you update the capture\/compare register (CCR) of TIM14 in the main loop. Does the CPU need to keep doing anything to maintain the new speed once CCR is updated?    No — the timer hardware generates the PWM signal autonomously. The CPU writes the new CCR value once and the timer immediately applies the new duty cycle until told otherwise.  Correct. This is the same autonomy that makes timers useful for delays and interrupts. The PWM waveform is generated entirely in hardware; the CPU is free to do other work.    Yes — the CPU must toggle a GPIO pin at the correct frequency to maintain the PWM signal.  Bit-banging PWM in software (manually toggling a GPIO pin) is possible but wastes CPU time. Hardware PWM via the timer generates the signal without any CPU involvement after setup.    Yes — the CPU must write the CCR value on every timer period to keep the duty cycle stable.  The timer uses the CCR value continuously until it is changed. Writing it once sets the duty cycle indefinitely.    No — but only if the PWM frequency is below 1 kHz; at higher frequencies the CPU must assist the timer.  Hardware PWM operates at any frequency within the timer's capability without CPU assistance. Frequency does not change this.     "
},
{
  "id": "rq-motor-direction",
  "level": "2",
  "url": "rq-motors-concepts.html#rq-motor-direction",
  "type": "Reading Question",
  "number": "10.1.4.1",
  "title": "",
  "body": " A DC motor is spinning clockwise. What change to the electrical circuit would make it spin counter-clockwise?    Reverse the polarity of the voltage across the motor terminals so current flows through the armature in the opposite direction.  Correct. Reversing current direction reverses the magnetic force on the armature, reversing the torque and therefore the direction of rotation. This is what the H-bridge does when you swap which switch pair is closed.    Increase the supply voltage so the motor overspeeds and the commutator reverses automatically.  Increasing voltage increases speed but does not reverse direction. There is no automatic commutator reversal from overspeed.    Reduce the duty cycle to 0% so the motor decelerates and then spins backwards.  A 0% duty cycle removes power and the motor coasts to a stop, but does not cause it to spin backwards. Reversing direction requires reversing current, not just reducing it.    Connect both motor terminals to the same voltage rail.  Connecting both terminals to the same rail (brake mode) stops the motor by short-circuiting the back-EMF. It does not reverse the direction.    "
},
{
  "id": "rq-pwm-duty-cycle",
  "level": "2",
  "url": "rq-motors-concepts.html#rq-pwm-duty-cycle",
  "type": "Reading Question",
  "number": "10.1.4.2",
  "title": "",
  "body": " A PWM signal switches between 0 V and 5 V at 10 kHz. The duty cycle is set to 30%. What average voltage does the motor see?    1.5 V — 30% of 5 V.  Correct. Average voltage = duty cycle × supply voltage = 0.30 × 5 V = 1.5 V. The motor's mechanical inertia averages the rapid switching and the shaft speed corresponds to this average voltage.    5 V — the motor always sees the full supply voltage when PWM is used.  PWM delivers the full supply voltage only during the HIGH phase, which is 30% of each cycle. The effective average is 1.5 V.    3.5 V — the motor sees the supply minus the duty cycle percentage.  Average voltage = duty cycle × supply, not supply minus duty cycle. 30% duty at 5 V gives 1.5 V, not 3.5 V.    0 V — at 30% duty cycle the motor receives less than 50% and cannot spin.  There is no 50% threshold. The motor receives an average of 1.5 V at 30% duty cycle and will spin at a reduced speed proportional to that average voltage.    "
},
{
  "id": "rq-pwm-timer",
  "level": "2",
  "url": "rq-motors-concepts.html#rq-pwm-timer",
  "type": "Reading Question",
  "number": "10.1.4.3",
  "title": "",
  "body": " To change motor speed, you update the capture\/compare register (CCR) of TIM14 in the main loop. Does the CPU need to keep doing anything to maintain the new speed once CCR is updated?    No — the timer hardware generates the PWM signal autonomously. The CPU writes the new CCR value once and the timer immediately applies the new duty cycle until told otherwise.  Correct. This is the same autonomy that makes timers useful for delays and interrupts. The PWM waveform is generated entirely in hardware; the CPU is free to do other work.    Yes — the CPU must toggle a GPIO pin at the correct frequency to maintain the PWM signal.  Bit-banging PWM in software (manually toggling a GPIO pin) is possible but wastes CPU time. Hardware PWM via the timer generates the signal without any CPU involvement after setup.    Yes — the CPU must write the CCR value on every timer period to keep the duty cycle stable.  The timer uses the CCR value continuously until it is changed. Writing it once sets the duty cycle indefinitely.    No — but only if the PWM frequency is below 1 kHz; at higher frequencies the CPU must assist the timer.  Hardware PWM operates at any frequency within the timer's capability without CPU assistance. Frequency does not change this.    "
},
{
  "id": "sec-motor-basics",
  "level": "1",
  "url": "sec-motor-basics.html",
  "type": "Section",
  "number": "10.2",
  "title": "DC Motor Fundamentals",
  "body": " DC Motor Fundamentals   Actuator signal chain. The MCU computes an integer command; a DAC or PWM converts it to an analog voltage; a driver IC amplifies current; the motor produces mechanical motion. Each stage is necessary because the MCU cannot directly supply the power the motor needs.    In a DC permanent-magnet motor, current through the armature coils creates a magnetic field that repels the permanent magnets in the stator, producing torque. Torque is proportional to current; current is determined by the applied voltage and back-EMF. At steady state the motor speed is approximately proportional to the applied voltage. To reverse direction, reverse the polarity of the voltage across the motor terminals.  "
},
{
  "id": "fig-embedded-actuator-chain",
  "level": "2",
  "url": "sec-motor-basics.html#fig-embedded-actuator-chain",
  "type": "Figure",
  "number": "10.2.1",
  "title": "",
  "body": " Actuator signal chain. The MCU computes an integer command; a DAC or PWM converts it to an analog voltage; a driver IC amplifies current; the motor produces mechanical motion. Each stage is necessary because the MCU cannot directly supply the power the motor needs.   "
},
{
  "id": "sec-h-bridge",
  "level": "1",
  "url": "sec-h-bridge.html",
  "type": "Section",
  "number": "10.3",
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
  "number": "10.3.1",
  "title": "",
  "body": " H-bridge in clockwise mode (IN1=HIGH, IN2=LOW, left) and counter-clockwise mode (IN1=LOW, IN2=HIGH, right). Current flows through the motor in opposite directions, reversing the electromagnetic torque and therefore the rotation direction.    "
},
{
  "id": "fig-h-bridge-brake",
  "level": "2",
  "url": "sec-h-bridge.html#fig-h-bridge-brake",
  "type": "Figure",
  "number": "10.3.2",
  "title": "",
  "body": " H-bridge in brake mode (IN1=HIGH, IN2=HIGH). Both motor terminals are connected to the same rail; the motor acts as a generator dumping kinetic energy to ground, producing rapid deceleration.   "
},
{
  "id": "fig-tb6612-truth-table",
  "level": "2",
  "url": "sec-h-bridge.html#fig-tb6612-truth-table",
  "type": "Figure",
  "number": "10.3.3",
  "title": "",
  "body": " TB6612FNG truth table summarizing all operating modes. IN1 and IN2 control direction; PWM controls speed. The STBY pin enables the driver (HIGH = active); it is pulled up through the breakout board.   "
},
{
  "id": "fig-tb6612-internal",
  "level": "2",
  "url": "sec-h-bridge.html#fig-tb6612-internal",
  "type": "Figure",
  "number": "10.3.4",
  "title": "",
  "body": " TB6612FNG internal block diagram. The IC contains two full H-bridge circuits, each controlled by IN1, IN2, and PWM signals. Internal logic prevents shoot-through (both upper and lower switches on simultaneously) by enforcing a dead-time between transitions.   "
},
{
  "id": "fig-tb6612-wiring",
  "level": "2",
  "url": "sec-h-bridge.html#fig-tb6612-wiring",
  "type": "Figure",
  "number": "10.3.5",
  "title": "",
  "body": " TB6612FNG breakout board wiring for the first exercise. VM (motor power) connects to the external power supply (6–12 V); VCC (logic power) connects to the Nucleo's 3.3 V rail. AIN1, AIN2, and PWMA connect to GPIO output pins. The motor connects to AO1 and AO2.   "
},
{
  "id": "sec-h-bridge-8",
  "level": "2",
  "url": "sec-h-bridge.html#sec-h-bridge-8",
  "type": "Insight",
  "number": "10.3.6",
  "title": "Shoot-through and dead-time.",
  "body": " Shoot-through and dead-time  If the upper and lower switches of one H-bridge leg turn on simultaneously, they create a short circuit from the power supply to ground — called shoot-through . The TB6612FNG's internal logic prevents this by inserting a brief dead-time between switching events. This is why you should not drive IN1 and IN2 directly with complementary GPIO signals without the motor driver IC in between.  "
},
{
  "id": "subsec-pwm-waveform",
  "level": "1",
  "url": "subsec-pwm-waveform.html",
  "type": "Subsection",
  "number": "10.4.1",
  "title": "PWM Waveform",
  "body": " PWM Waveform   PWM waveform with 25%, 50%, and 75% duty cycles. The average voltage (dashed line) is proportional to the duty cycle. Increasing the duty cycle increases average voltage and therefore motor speed. The PWM frequency must be high enough that the motor's inductance smooths the current pulses into near-steady current.     Hardware PWM using a counter and compare register. When the counter is below the compare value (CCR1), the PWM output is HIGH; when the counter reaches or exceeds CCR1, the output goes LOW. At the auto-reload value (ARR) the counter resets and the cycle repeats.    "
},
{
  "id": "fig-pwm-waveform",
  "level": "2",
  "url": "subsec-pwm-waveform.html#fig-pwm-waveform",
  "type": "Figure",
  "number": "10.4.1",
  "title": "",
  "body": " PWM waveform with 25%, 50%, and 75% duty cycles. The average voltage (dashed line) is proportional to the duty cycle. Increasing the duty cycle increases average voltage and therefore motor speed. The PWM frequency must be high enough that the motor's inductance smooths the current pulses into near-steady current.   "
},
{
  "id": "fig-pwm-hardware",
  "level": "2",
  "url": "subsec-pwm-waveform.html#fig-pwm-hardware",
  "type": "Figure",
  "number": "10.4.2",
  "title": "",
  "body": " Hardware PWM using a counter and compare register. When the counter is below the compare value (CCR1), the PWM output is HIGH; when the counter reaches or exceeds CCR1, the output goes LOW. At the auto-reload value (ARR) the counter resets and the cycle repeats.   "
},
{
  "id": "subsec-pwm-timer",
  "level": "1",
  "url": "subsec-pwm-timer.html",
  "type": "Subsection",
  "number": "10.4.2",
  "title": "TIM14 PWM Configuration",
  "body": " TIM14 PWM Configuration  TIM14 channel 1 can drive a PWM output on PA4, PA7, or PB1. In addition to the PSC and ARR registers used for timing, PWM requires configuring the Capture\/Compare Mode Register (CCMR1), the Capture\/Compare Enable Register (CCER), and the Capture\/Compare Register 1 (CCR1) that sets the duty cycle.   TIM14 in PWM mode. CCR1 sets the duty cycle: when CNT < CCR1 the output is HIGH; otherwise LOW. ARR sets the period. Setting CCR1 to half of ARR gives 50% duty cycle.     Nucleo pins with TIM14 PWM capability. PA4, PA7, and PB1 can be driven by TIM14 channel 1 (AF4). In Lab 6 we use PA7 as the PWM output to the TB6612FNG PWMA pin.     Breadboard wiring for the motor PWM exercise. The TB6612FNG receives IN1 and IN2 for direction, PWMA for speed, and STBY pulled HIGH. The oscilloscope channel 1 monitors the PWM signal on PWMA.     TIM14 Capture\/Compare Mode Register 1 (CCMR1) in output compare mode. OC1M bits [6:4] = 0b110 select PWM mode 1 (output HIGH while CNT < CCR1).     TIM14 CCR1, ARR, and PSC registers for PWM. CCR1 = duty × ARR sets the on-time. ARR sets the period. PSC divides the clock to set the PWM frequency: .    #define PWM_TIMER_MAX 100 \/\/ ARR value: 100 steps of duty cycle #define PSC_VALUE 11 \/\/ 12 MHz \/ 12 = 1 MHz counter -> 10 kHz PWM void pwm_tim14_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/\/ PA7 = TIM14 CH1, AF4 GPIOA->MODER &= ~(3U << 14); GPIOA->MODER |= (2U << 14); \/\/ AF GPIOA->AFR[0] &= ~(0xFU << 28); GPIOA->AFR[0] |= (4U << 28); \/\/ AF4 TIM14->PSC = PSC_VALUE; TIM14->ARR = PWM_TIMER_MAX - 1; TIM14->CCR1 = 0; \/\/ 0% duty cycle initially TIM14->CCMR1 = (6U << TIM_CCMR1_OC1M_Pos); \/\/ PWM mode 1 TIM14->CCER |= TIM_CCER_CC1E; \/\/ enable CH1 output TIM14->EGR |= TIM_EGR_UG; \/\/ update registers TIM14->CR1 |= TIM_CR1_CEN; \/\/ start counter } void pwm_set_duty(uint8_t duty) { \/\/ duty: 0–100 TIM14->CCR1 = duty; }   Oscilloscope trace of the PWM ramp signal from TTmotor_ramp.c . The duty cycle increases from 0 to 100% over one ramp period, then reverses direction and ramps again. The motor speed increases as the duty cycle rises.    "
},
{
  "id": "fig-pwm-tim14-block",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-tim14-block",
  "type": "Figure",
  "number": "10.4.3",
  "title": "",
  "body": " TIM14 in PWM mode. CCR1 sets the duty cycle: when CNT < CCR1 the output is HIGH; otherwise LOW. ARR sets the period. Setting CCR1 to half of ARR gives 50% duty cycle.   "
},
{
  "id": "fig-pwm-nucleo-pins",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-nucleo-pins",
  "type": "Figure",
  "number": "10.4.4",
  "title": "",
  "body": " Nucleo pins with TIM14 PWM capability. PA4, PA7, and PB1 can be driven by TIM14 channel 1 (AF4). In Lab 6 we use PA7 as the PWM output to the TB6612FNG PWMA pin.   "
},
{
  "id": "fig-pwm-wiring-lab",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-wiring-lab",
  "type": "Figure",
  "number": "10.4.5",
  "title": "",
  "body": " Breadboard wiring for the motor PWM exercise. The TB6612FNG receives IN1 and IN2 for direction, PWMA for speed, and STBY pulled HIGH. The oscilloscope channel 1 monitors the PWM signal on PWMA.   "
},
{
  "id": "fig-tim14-ccmr1",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-tim14-ccmr1",
  "type": "Figure",
  "number": "10.4.6",
  "title": "",
  "body": " TIM14 Capture\/Compare Mode Register 1 (CCMR1) in output compare mode. OC1M bits [6:4] = 0b110 select PWM mode 1 (output HIGH while CNT < CCR1).   "
},
{
  "id": "fig-tim14-pwm-registers",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-tim14-pwm-registers",
  "type": "Figure",
  "number": "10.4.7",
  "title": "",
  "body": " TIM14 CCR1, ARR, and PSC registers for PWM. CCR1 = duty × ARR sets the on-time. ARR sets the period. PSC divides the clock to set the PWM frequency: .   "
},
{
  "id": "fig-pwm-oscilloscope",
  "level": "2",
  "url": "subsec-pwm-timer.html#fig-pwm-oscilloscope",
  "type": "Figure",
  "number": "10.4.8",
  "title": "",
  "body": " Oscilloscope trace of the PWM ramp signal from TTmotor_ramp.c . The duty cycle increases from 0 to 100% over one ramp period, then reverses direction and ramps again. The motor speed increases as the duty cycle rises.   "
},
{
  "id": "sec-motor-speed",
  "level": "1",
  "url": "sec-motor-speed.html",
  "type": "Section",
  "number": "10.5",
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
  "number": "10.5.1",
  "title": "",
  "body": " Optical incremental encoder and photointerrupter assembly. A slotted wheel attached to the motor shaft passes through the gap of the photointerrupter. When a slot aligns with the light beam the output goes HIGH; when the web blocks the beam the output goes LOW. Counting transitions gives shaft position and speed.     "
},
{
  "id": "fig-photointerrupter-scope",
  "level": "2",
  "url": "sec-motor-speed.html#fig-photointerrupter-scope",
  "type": "Figure",
  "number": "10.5.2",
  "title": "",
  "body": " Oscilloscope capture of the photointerrupter output as motor speed increases from 30 RPM to 180 RPM. The pulse period decreases as speed increases. The period can be measured with the AD2 cursor tool to compute RPM.   "
},
{
  "id": "fig-lab6-complete",
  "level": "2",
  "url": "sec-motor-speed.html#fig-lab6-complete",
  "type": "Figure",
  "number": "10.5.3",
  "title": "",
  "body": " Complete Lab 6 breadboard setup: potentiometer on PA0 (ADC), TB6612 motor driver on digital outputs, PWM on PA7, and photointerrupter on a digital input (with GPIO interrupt). The ADC reading sets the target speed; the photointerrupter measures actual speed.   "
},
{
  "id": "subsec-proper-acceleration",
  "level": "1",
  "url": "subsec-proper-acceleration.html",
  "type": "Subsection",
  "number": "11.1.1",
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
  "number": "11.1.2",
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
  "number": "11.1.1",
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
  "number": "11.1.2",
  "title": "",
  "body": " MEMS capacitive accelerometer cross-section. The proof mass is a movable plate suspended between two fixed plates. When the mass displaces, the capacitance to one fixed plate increases and to the other decreases. Measuring the differential capacitance gives displacement and therefore acceleration.   "
},
{
  "id": "subsec-tilt-sensing",
  "level": "1",
  "url": "subsec-tilt-sensing.html",
  "type": "Subsection",
  "number": "11.1.3",
  "title": "Tilt Sensing from Three Axes",
  "body": " Tilt Sensing from Three Axes  A three-axis accelerometer contains three proof masses oriented along the x, y, and z axes of the chip. Each axis independently reports the component of acceleration (including gravity) along that direction. When the device is stationary, the three readings together form a vector that points opposite to the direction of gravity.  If the chip is lying flat (z-axis pointing up), the z reading is and the x and y readings are near zero. Tilt the device 45° around the x-axis and the gravity vector projects equally onto z and y: both read approximately . The tilt angle can be recovered with an arctangent: This is how a phone knows to rotate its display, and how we will use the LSM303AGR in this course.  "
},
{
  "id": "rq-accel-concepts",
  "level": "1",
  "url": "rq-accel-concepts.html",
  "type": "Check Your Understanding",
  "number": "11.1.4",
  "title": "Check Your Understanding",
  "body": "  An accelerometer is sitting motionless on a flat table. Its z-axis points straight up. What does it read on the z-axis, and why?    Approximately , because the table's normal force pushes the device upward and the accelerometer measures that contact force, not the absence of motion.  Correct. Proper acceleration is what you feel — the contact force from the table. A device in free fall feels nothing and reads zero.    Zero, because the device is not moving and acceleration is zero when velocity is constant.  This would be correct for coordinate acceleration (rate of change of velocity), but an accelerometer measures proper acceleration — the contact force from the table's surface. A stationary device on a table reads .    Approximately , because gravity pulls the device downward.  The sign depends on the axis convention of the sensor, but the key point is that the reading is non-zero. Gravity is pulling down, but the table pushes back up — the sensor measures that upward contact force as a positive acceleration on the upward-pointing axis.    Zero on all three axes, because gravity cancels the normal force.  Gravity and the normal force cancel in terms of net force on the device as a whole (which is why it does not move), but the accelerometer measures the internal reaction force on its proof mass — which reflects the upward push from the table, not the net force.      The proof mass in a MEMS accelerometer displaces when the device accelerates. What physical principle causes this displacement?    Inertia — the proof mass resists the change in motion, so it lags behind the accelerating housing and displaces relative to it.  Correct. The displacement is then proportional to acceleration ( ), and measuring it gives the acceleration.    Magnetic force — the proof mass is magnetic and responds to changes in the Earth's magnetic field.  MEMS accelerometers are mechanical, not magnetic. The proof mass responds to inertial forces, not magnetic fields (that would be a magnetometer).    Thermal expansion — the proof mass expands when the device heats up due to motion.  MEMS accelerometers respond to inertia, not heat. Thermal effects are a source of noise in these sensors, not the sensing mechanism.    Piezoelectricity — stress on the silicon generates a voltage proportional to acceleration.  Some accelerometers use piezoelectric sensing, but the capacitive MEMS type (used in the LSM303AGR and most consumer devices) works by measuring proof-mass displacement as a change in capacitance, not a piezoelectric voltage.      A three-axis accelerometer is tilted so that its x-axis points straight down. The device is otherwise stationary. What does it read?    Approximately on the x-axis and near zero on y and z — the full gravity vector projects onto the downward-pointing x-axis.  Correct. When one axis is aligned with gravity, that axis carries the full reading. The sign is negative because the axis points down while the contact force (which the sensor measures) pushes up, opposite to the axis direction.    Zero on all axes — tilting the device redistributes the forces so they cancel.  The gravity vector does not disappear when you tilt the device; it just projects differently onto the three axes. One axis will always carry the full when aligned with gravity.    Approximately on all three axes — tilting amplifies the reading.  The total magnitude of the gravity vector is always regardless of orientation. It cannot be more than on any axis when the device is stationary.    Approximately on the x-axis — tilting has no effect because the sensor measures total acceleration, not direction.  The sign matters: the x-axis is pointing down, and the contact force (what the sensor measures) pushes upward, which is the negative x direction. A three-axis sensor does measure direction, not just magnitude.     "
},
{
  "id": "rq-accel-static",
  "level": "2",
  "url": "rq-accel-concepts.html#rq-accel-static",
  "type": "Reading Question",
  "number": "11.1.4.1",
  "title": "",
  "body": " An accelerometer is sitting motionless on a flat table. Its z-axis points straight up. What does it read on the z-axis, and why?    Approximately , because the table's normal force pushes the device upward and the accelerometer measures that contact force, not the absence of motion.  Correct. Proper acceleration is what you feel — the contact force from the table. A device in free fall feels nothing and reads zero.    Zero, because the device is not moving and acceleration is zero when velocity is constant.  This would be correct for coordinate acceleration (rate of change of velocity), but an accelerometer measures proper acceleration — the contact force from the table's surface. A stationary device on a table reads .    Approximately , because gravity pulls the device downward.  The sign depends on the axis convention of the sensor, but the key point is that the reading is non-zero. Gravity is pulling down, but the table pushes back up — the sensor measures that upward contact force as a positive acceleration on the upward-pointing axis.    Zero on all three axes, because gravity cancels the normal force.  Gravity and the normal force cancel in terms of net force on the device as a whole (which is why it does not move), but the accelerometer measures the internal reaction force on its proof mass — which reflects the upward push from the table, not the net force.    "
},
{
  "id": "rq-accel-proof-mass",
  "level": "2",
  "url": "rq-accel-concepts.html#rq-accel-proof-mass",
  "type": "Reading Question",
  "number": "11.1.4.2",
  "title": "",
  "body": " The proof mass in a MEMS accelerometer displaces when the device accelerates. What physical principle causes this displacement?    Inertia — the proof mass resists the change in motion, so it lags behind the accelerating housing and displaces relative to it.  Correct. The displacement is then proportional to acceleration ( ), and measuring it gives the acceleration.    Magnetic force — the proof mass is magnetic and responds to changes in the Earth's magnetic field.  MEMS accelerometers are mechanical, not magnetic. The proof mass responds to inertial forces, not magnetic fields (that would be a magnetometer).    Thermal expansion — the proof mass expands when the device heats up due to motion.  MEMS accelerometers respond to inertia, not heat. Thermal effects are a source of noise in these sensors, not the sensing mechanism.    Piezoelectricity — stress on the silicon generates a voltage proportional to acceleration.  Some accelerometers use piezoelectric sensing, but the capacitive MEMS type (used in the LSM303AGR and most consumer devices) works by measuring proof-mass displacement as a change in capacitance, not a piezoelectric voltage.    "
},
{
  "id": "rq-accel-tilt",
  "level": "2",
  "url": "rq-accel-concepts.html#rq-accel-tilt",
  "type": "Reading Question",
  "number": "11.1.4.3",
  "title": "",
  "body": " A three-axis accelerometer is tilted so that its x-axis points straight down. The device is otherwise stationary. What does it read?    Approximately on the x-axis and near zero on y and z — the full gravity vector projects onto the downward-pointing x-axis.  Correct. When one axis is aligned with gravity, that axis carries the full reading. The sign is negative because the axis points down while the contact force (which the sensor measures) pushes up, opposite to the axis direction.    Zero on all axes — tilting the device redistributes the forces so they cancel.  The gravity vector does not disappear when you tilt the device; it just projects differently onto the three axes. One axis will always carry the full when aligned with gravity.    Approximately on all three axes — tilting amplifies the reading.  The total magnitude of the gravity vector is always regardless of orientation. It cannot be more than on any axis when the device is stationary.    Approximately on the x-axis — tilting has no effect because the sensor measures total acceleration, not direction.  The sign matters: the x-axis is pointing down, and the contact force (what the sensor measures) pushes upward, which is the negative x direction. A three-axis sensor does measure direction, not just magnitude.    "
},
{
  "id": "sec-lsm303agr",
  "level": "1",
  "url": "sec-lsm303agr.html",
  "type": "Section",
  "number": "11.2",
  "title": "The LSM303AGR Accelerometer",
  "body": " The LSM303AGR Accelerometer   STMicroelectronics LSM303AGR module mounted on an Adafruit breakout board with STEMMA QT connector. The chip combines a 3-axis accelerometer and a 3-axis magnetometer. In ENGS 28 we use only the accelerometer portion.     LSM303AGR accelerometer key specifications: selectable full-scale range (±2g, ±4g, ±8g, ±16g), selectable resolution (8, 10, or 12 bits depending on power mode), and I2C\/SPI interface. In ENGS 28 we use ±2g full-scale and 12-bit low-power mode.      Breakout board schematic (partial). The 6-pin STEMMA QT header provides 3.3 V power, GND, SCL, and SDA. Pull-up resistors for I2C are already on the breakout board, so no external resistors are needed. The chip is hardwired for I2C (SPI disabled by the board).     LSM303AGR breakout wiring to the Nucleo board. Red lead to 3.3 V, black to GND, yellow (SCL) to PB8, blue (SDA) to PB9. The same I2C1 bus used for the 7-segment display also supports the accelerometer.      Full test setup with the Nucleo, breadboard, LSM303AGR, and AD2 logic analyzer connected to SCL and SDA for I2C debugging.    "
},
{
  "id": "fig-lsm303agr-chip",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-chip",
  "type": "Figure",
  "number": "11.2.1",
  "title": "",
  "body": " STMicroelectronics LSM303AGR module mounted on an Adafruit breakout board with STEMMA QT connector. The chip combines a 3-axis accelerometer and a 3-axis magnetometer. In ENGS 28 we use only the accelerometer portion.   "
},
{
  "id": "fig-lsm303agr-specs",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-specs",
  "type": "Figure",
  "number": "11.2.2",
  "title": "",
  "body": " LSM303AGR accelerometer key specifications: selectable full-scale range (±2g, ±4g, ±8g, ±16g), selectable resolution (8, 10, or 12 bits depending on power mode), and I2C\/SPI interface. In ENGS 28 we use ±2g full-scale and 12-bit low-power mode.    "
},
{
  "id": "fig-lsm303agr-breakout",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-breakout",
  "type": "Figure",
  "number": "11.2.3",
  "title": "",
  "body": " Breakout board schematic (partial). The 6-pin STEMMA QT header provides 3.3 V power, GND, SCL, and SDA. Pull-up resistors for I2C are already on the breakout board, so no external resistors are needed. The chip is hardwired for I2C (SPI disabled by the board).   "
},
{
  "id": "fig-lsm303agr-wiring",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-wiring",
  "type": "Figure",
  "number": "11.2.4",
  "title": "",
  "body": " LSM303AGR breakout wiring to the Nucleo board. Red lead to 3.3 V, black to GND, yellow (SCL) to PB8, blue (SDA) to PB9. The same I2C1 bus used for the 7-segment display also supports the accelerometer.    "
},
{
  "id": "fig-lsm303agr-test-wiring",
  "level": "2",
  "url": "sec-lsm303agr.html#fig-lsm303agr-test-wiring",
  "type": "Figure",
  "number": "11.2.5",
  "title": "",
  "body": " Full test setup with the Nucleo, breadboard, LSM303AGR, and AD2 logic analyzer connected to SCL and SDA for I2C debugging.   "
},
{
  "id": "subsec-accel-i2c-pattern",
  "level": "1",
  "url": "subsec-accel-i2c-pattern.html",
  "type": "Subsection",
  "number": "11.3.1",
  "title": "I2C Read\/Write Patterns",
  "body": " I2C Read\/Write Patterns   I2C transfer patterns for the LSM303AGR. A register write: START, address+W, register address, data byte, STOP. A register read: START, address+W, register address, repeated START, address+R, data byte, NACK, STOP. The repeated START lets the controller switch from write to read without releasing the bus.    "
},
{
  "id": "fig-accel-i2c-transfers",
  "level": "2",
  "url": "subsec-accel-i2c-pattern.html#fig-accel-i2c-transfers",
  "type": "Figure",
  "number": "11.3.1",
  "title": "",
  "body": " I2C transfer patterns for the LSM303AGR. A register write: START, address+W, register address, data byte, STOP. A register read: START, address+W, register address, repeated START, address+R, data byte, NACK, STOP. The repeated START lets the controller switch from write to read without releasing the bus.   "
},
{
  "id": "subsec-accel-data-format",
  "level": "1",
  "url": "subsec-accel-data-format.html",
  "type": "Subsection",
  "number": "11.3.2",
  "title": "Data Format and Unit Conversion",
  "body": " Data Format and Unit Conversion  The accelerometer outputs a 16-bit, left-justified two's complement integer per axis. In 12-bit low-power mode, only bits [15:4] are valid; the lower 4 bits are 0. For a ±2g full-scale range:     The raw output of an accelerometer at rest with one axis pointing down is approximately ±1g (depending on orientation). A perfectly calibrated sensor shows exactly 1000 mg on the downward axis and 0 on the other two.  "
},
{
  "id": "sec-tilt-sensing",
  "level": "1",
  "url": "sec-tilt-sensing.html",
  "type": "Section",
  "number": "11.4",
  "title": "Tilt Sensing",
  "body": " Tilt Sensing   Tilt geometry. When the accelerometer is tilted by angle θ from horizontal, the x-axis reads and the z-axis reads . Inverting: . For small tilts, in radians.     Computing tilt requires sinf() or asinf() from math.h and floating-point arithmetic. On the Cortex-M0+, floating-point operations are performed in software (no FPU), so they are significantly slower than integer operations — but for a tilt display updating at 100 Hz, this is easily fast enough.   CoolTerm serial plotter showing real-time X, Y, and Z accelerations as the sensor is tilted. When the board is flat, Z reads approximately +1g (gravity); tilting rotates the gravity vector between axes. The plotter is enabled in CoolTerm under Connection → Serial Plotter.      The accelerometer is lying flat on the table with its Z axis pointing up. What does the Z-axis reading report at rest?   Approximately +1g (the table's normal force on the proof mass)  Correct. A stationary accelerometer measures the reaction to gravity, which equals +g on the upward-pointing axis.  Approximately 0g (the device is not accelerating)  An accelerometer in free fall reads 0g. At rest, gravity is felt as a +1g force on the upward axis.  Approximately –1g  –1g would appear if Z pointed downward. With Z pointing up the reading is +1g.  Undefined — it depends on the sensor orientation setting.  The sign depends on the axis convention but the magnitude is always 1g when stationary.     "
},
{
  "id": "fig-tilt-geometry",
  "level": "2",
  "url": "sec-tilt-sensing.html#fig-tilt-geometry",
  "type": "Figure",
  "number": "11.4.1",
  "title": "",
  "body": " Tilt geometry. When the accelerometer is tilted by angle θ from horizontal, the x-axis reads and the z-axis reads . Inverting: . For small tilts, in radians.    "
},
{
  "id": "fig-accel-plotter",
  "level": "2",
  "url": "sec-tilt-sensing.html#fig-accel-plotter",
  "type": "Figure",
  "number": "11.4.2",
  "title": "",
  "body": " CoolTerm serial plotter showing real-time X, Y, and Z accelerations as the sensor is tilted. When the board is flat, Z reads approximately +1g (gravity); tilting rotates the gravity vector between axes. The plotter is enabled in CoolTerm under Connection → Serial Plotter.   "
},
{
  "id": "rq-accel-gravity",
  "level": "2",
  "url": "rq-accel.html#rq-accel-gravity",
  "type": "Reading Question",
  "number": "11.4.1",
  "title": "",
  "body": " The accelerometer is lying flat on the table with its Z axis pointing up. What does the Z-axis reading report at rest?   Approximately +1g (the table's normal force on the proof mass)  Correct. A stationary accelerometer measures the reaction to gravity, which equals +g on the upward-pointing axis.  Approximately 0g (the device is not accelerating)  An accelerometer in free fall reads 0g. At rest, gravity is felt as a +1g force on the upward axis.  Approximately –1g  –1g would appear if Z pointed downward. With Z pointing up the reading is +1g.  Undefined — it depends on the sensor orientation setting.  The sign depends on the axis convention but the magnitude is always 1g when stationary.   "
},
{
  "id": "subsec-servo-vs-dc-motor",
  "level": "1",
  "url": "subsec-servo-vs-dc-motor.html",
  "type": "Subsection",
  "number": "12.1.1",
  "title": "Position Control vs. Speed Control",
  "body": " Position Control vs. Speed Control  A plain DC motor is an open-loop actuator: apply voltage, it spins; remove voltage, it coasts to a stop. PWM lets you control average voltage and therefore average speed, but nothing stops the motor from drifting if the load changes. If you want the shaft at a particular angle, you have to sense the position yourself and run a control loop in your own code.  A servo handles all of that internally. You send a single PWM signal that says \"go to this angle,\" and the servo moves there and stays — resisting any external force that tries to push it away. There is no motor-speed control, no direction control, and no position sensing to wire up. This simplicity makes servos the default choice wherever you need repeatable positioning: robot joints, camera gimbals, RC steering linkages, and control surface actuators.  "
},
{
  "id": "subsec-closed-loop-concept",
  "level": "1",
  "url": "subsec-closed-loop-concept.html",
  "type": "Subsection",
  "number": "12.1.2",
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
  "number": "12.1.1",
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
  "number": "12.1.2",
  "title": "",
  "body": " Servo closed-loop block diagram. The input PWM pulse width is decoded to a reference voltage . The potentiometer produces proportional to shaft angle. The error amplifier drives the motor with a voltage proportional to , rotating the shaft until the error reaches zero. The result is a position servo that resists external disturbances.   "
},
{
  "id": "subsec-servo-pwm-intro",
  "level": "1",
  "url": "subsec-servo-pwm-intro.html",
  "type": "Subsection",
  "number": "12.1.3",
  "title": "PWM as a Position Command",
  "body": " PWM as a Position Command  You already know PWM from the motors chapter, where duty cycle controlled motor speed by setting the average voltage seen by the motor. Servo PWM works differently: the servo's internal decoder measures the absolute duration of the HIGH pulse each cycle, not the ratio of high to low time.  The hobby servo standard specifies a 50 Hz signal (one pulse every 20 ms). The pulse width encodes the commanded angle:   1 ms pulse full left (approximately −90°)  1.5 ms pulse center (0°)  2 ms pulse full right (approximately +90°)   Any pulse width between 1 ms and 2 ms maps linearly to an intermediate angle. The decoder inside the servo measures how long the signal stays HIGH and uses that time as the position command. Your code simply writes a value to the CCR1 register that sets the pulse duration; the servo does the rest.   For DC motor PWM, what matters is the fraction of time the signal is HIGH (the duty cycle). For servo PWM, what matters is the absolute length of the HIGH pulse in microseconds. The 20 ms period is mostly dead time — the servo only looks at the first 1–2 ms of each cycle.   "
},
{
  "id": "subsec-servo-pwm-intro-6",
  "level": "2",
  "url": "subsec-servo-pwm-intro.html#subsec-servo-pwm-intro-6",
  "type": "Insight",
  "number": "12.1.3",
  "title": "",
  "body": " For DC motor PWM, what matters is the fraction of time the signal is HIGH (the duty cycle). For servo PWM, what matters is the absolute length of the HIGH pulse in microseconds. The 20 ms period is mostly dead time — the servo only looks at the first 1–2 ms of each cycle.  "
},
{
  "id": "rq-servo-concepts",
  "level": "1",
  "url": "rq-servo-concepts.html",
  "type": "Check Your Understanding",
  "number": "12.1.4",
  "title": "Check Your Understanding",
  "body": "   You want to command a servo to its center position (0°). The servo standard specifies 1 ms = −90°, 1.5 ms = 0°, 2 ms = +90°. What pulse width should your PWM signal produce each cycle?     1.5 ms  Correct. The servo decoder measures the HIGH pulse duration; 1.5 ms maps to the center position. The remaining 18.5 ms of the 20 ms period is LOW and carries no position information.    50% duty cycle (10 ms HIGH, 10 ms LOW)  That is how a DC motor would be controlled to half speed, but a servo looks at absolute pulse duration, not duty cycle. A 10 ms HIGH pulse is far outside the 1–2 ms range the servo expects.    0 ms (no pulse)  Without a pulse, the servo receives no command and may twitch or go limp depending on the model. The center command is 1.5 ms, not silence.    3 ms (midpoint of a 0–6 ms range)  The hobby servo standard uses a 1–2 ms range. The center of that range is 1.5 ms. A 3 ms pulse would be interpreted as outside the valid range and the servo behavior would be undefined.       You command a servo to hold at 0° (center), then press the arm toward −90° with your finger. What happens?     The servo resists and pushes back toward center.  Correct. The potentiometer reports an angle other than 0°, creating a nonzero error. The controller drives the motor to eliminate that error, which means pushing back against your finger.    The servo moves with your finger and holds the new position.  This would describe an open-loop motor with no feedback. The servo's closed-loop controller keeps comparing actual position to the commanded position and corrects any deviation.    The servo cuts power to the motor to avoid damage.  Servo controllers do not cut power when disturbed — doing so would mean they could not hold position under load. The motor increases its effort to resist the disturbance.    The servo rotates all the way to +90° to compensate.  The controller minimizes the difference between commanded and actual position — it does not overshoot to the opposite extreme.       Why should the servo's power (red) wire be connected to an external 5 V supply rather than directly to a Nucleo GPIO pin?     The servo can draw up to 700 mA at stall — far more than a GPIO pin can supply.  Correct. A GPIO pin on the STM32 is rated for approximately 8 mA. The servo's DC motor needs tens to hundreds of milliamps to move under load. Only the signal (yellow) wire connects to the GPIO; power must come from a dedicated 5 V rail.    The servo needs 5 V logic levels on the signal wire to decode the PWM correctly.  The signal wire (yellow) carries the PWM pulse from the GPIO pin and a 3.3 V HIGH level is sufficient for most servos. The issue is current on the power wire, not voltage on the signal wire.    GPIO pins can only source current, not sink it, so they cannot power the motor in both directions.  STM32 GPIO pins can both source and sink current, but the fundamental issue is the amount of current — the servo's motor draws far more than any GPIO pin can safely provide.    3.3 V would make the servo spin in the wrong direction.  Voltage polarity determines direction in a DC motor, not the logic-level voltage. The real constraint is current capacity: a GPIO pin cannot supply enough current to drive the motor.     "
},
{
  "id": "rq-servo-position-encoding",
  "level": "2",
  "url": "rq-servo-concepts.html#rq-servo-position-encoding",
  "type": "Reading Question",
  "number": "12.1.4.1",
  "title": "",
  "body": "  You want to command a servo to its center position (0°). The servo standard specifies 1 ms = −90°, 1.5 ms = 0°, 2 ms = +90°. What pulse width should your PWM signal produce each cycle?     1.5 ms  Correct. The servo decoder measures the HIGH pulse duration; 1.5 ms maps to the center position. The remaining 18.5 ms of the 20 ms period is LOW and carries no position information.    50% duty cycle (10 ms HIGH, 10 ms LOW)  That is how a DC motor would be controlled to half speed, but a servo looks at absolute pulse duration, not duty cycle. A 10 ms HIGH pulse is far outside the 1–2 ms range the servo expects.    0 ms (no pulse)  Without a pulse, the servo receives no command and may twitch or go limp depending on the model. The center command is 1.5 ms, not silence.    3 ms (midpoint of a 0–6 ms range)  The hobby servo standard uses a 1–2 ms range. The center of that range is 1.5 ms. A 3 ms pulse would be interpreted as outside the valid range and the servo behavior would be undefined.    "
},
{
  "id": "rq-servo-holds-position",
  "level": "2",
  "url": "rq-servo-concepts.html#rq-servo-holds-position",
  "type": "Reading Question",
  "number": "12.1.4.2",
  "title": "",
  "body": "  You command a servo to hold at 0° (center), then press the arm toward −90° with your finger. What happens?     The servo resists and pushes back toward center.  Correct. The potentiometer reports an angle other than 0°, creating a nonzero error. The controller drives the motor to eliminate that error, which means pushing back against your finger.    The servo moves with your finger and holds the new position.  This would describe an open-loop motor with no feedback. The servo's closed-loop controller keeps comparing actual position to the commanded position and corrects any deviation.    The servo cuts power to the motor to avoid damage.  Servo controllers do not cut power when disturbed — doing so would mean they could not hold position under load. The motor increases its effort to resist the disturbance.    The servo rotates all the way to +90° to compensate.  The controller minimizes the difference between commanded and actual position — it does not overshoot to the opposite extreme.    "
},
{
  "id": "rq-servo-power",
  "level": "2",
  "url": "rq-servo-concepts.html#rq-servo-power",
  "type": "Reading Question",
  "number": "12.1.4.3",
  "title": "",
  "body": "  Why should the servo's power (red) wire be connected to an external 5 V supply rather than directly to a Nucleo GPIO pin?     The servo can draw up to 700 mA at stall — far more than a GPIO pin can supply.  Correct. A GPIO pin on the STM32 is rated for approximately 8 mA. The servo's DC motor needs tens to hundreds of milliamps to move under load. Only the signal (yellow) wire connects to the GPIO; power must come from a dedicated 5 V rail.    The servo needs 5 V logic levels on the signal wire to decode the PWM correctly.  The signal wire (yellow) carries the PWM pulse from the GPIO pin and a 3.3 V HIGH level is sufficient for most servos. The issue is current on the power wire, not voltage on the signal wire.    GPIO pins can only source current, not sink it, so they cannot power the motor in both directions.  STM32 GPIO pins can both source and sink current, but the fundamental issue is the amount of current — the servo's motor draws far more than any GPIO pin can safely provide.    3.3 V would make the servo spin in the wrong direction.  Voltage polarity determines direction in a DC motor, not the logic-level voltage. The real constraint is current capacity: a GPIO pin cannot supply enough current to drive the motor.    "
},
{
  "id": "sec-servo-internals",
  "level": "1",
  "url": "sec-servo-internals.html",
  "type": "Section",
  "number": "12.2",
  "title": "Inside a Servomotor",
  "body": " Inside a Servomotor  A servomotor is a self-contained closed-loop position controller. Three internal components work together: a DC motor turns a multi-stage gear train that amplifies torque and reduces shaft speed; a potentiometer coupled to the output shaft converts angular position to a voltage; and a small analog controller circuit compares the potentiometer voltage to a reference derived from the incoming PWM signal. Whenever the two voltages differ, the controller drives the motor to close the gap.   TowerPro SG92R micro-servo used in ENGS 28 labs. Key specs: supply voltage 4.8–6 V; stall torque 2.5 kgf·cm; no-load speed 0.1 s\/60°. Three wires emerge from the housing: brown (GND), red (power 4–6 V), and yellow (PWM signal).       "
},
{
  "id": "fig-servo-sg92r",
  "level": "2",
  "url": "sec-servo-internals.html#fig-servo-sg92r",
  "type": "Figure",
  "number": "12.2.1",
  "title": "",
  "body": " TowerPro SG92R micro-servo used in ENGS 28 labs. Key specs: supply voltage 4.8–6 V; stall torque 2.5 kgf·cm; no-load speed 0.1 s\/60°. Three wires emerge from the housing: brown (GND), red (power 4–6 V), and yellow (PWM signal).      "
},
{
  "id": "subsec-servo-timer-registers",
  "level": "1",
  "url": "subsec-servo-timer-registers.html",
  "type": "Subsection",
  "number": "12.3.1",
  "title": "TIM14 Register Values",
  "body": " TIM14 Register Values  The servo reuses the TIM14 PWM output on PA7 (CH1, AF4). The key change from motor PWM is the timer period: instead of the audio-inaudible 20 kHz frequency used for motors, the servo needs exactly 50 Hz.   TIM14 block diagram showing PSC, CNT, ARR, and CCR1. The counter increments at the post-prescaler rate. When CNT reaches ARR it resets (end of period); when CNT reaches CCR1 the output goes low (end of pulse).     Nucleo-C031C6 PWM-capable pins. PA7 (TIM14 CH1 AF4) is brought out to the Arduino connector D11 header, making it easy to reach with a jumper wire to the servo yellow wire.     Timer design calculation. With SYSCLK = 12 MHz, setting PSC = 11 gives a 1 MHz counter clock (tick = 1 µs). ARR = 19999 makes the period 20000 µs = 20 ms = 50 Hz. CCR1 sweeps from 1000 to 2000 to produce 1–2 ms pulse widths corresponding to the full servo range.     CCMR1 register configuration for PWM Mode 1 on CH1. Bits OC1M (positions 4–6) are set to 0b110 (value 6); bit OC1PE (position 3) enables output compare preload. CCER bit CC1E enables the channel output.     CCR1, ARR, and PSC in context. PSC = 11 divides 12 MHz to 1 MHz. ARR = 19999 gives the 20 ms period. CCR1 = 1000, 1500, or 2000 maps to 1 ms, 1.5 ms, and 2 ms pulses (left, center, right).    \/* Servo PWM constants for TIM14 CH1 on PA7 at 12 MHz SYSCLK *\/ #define SERVO_PSC 11 \/\/ 12 MHz \/ 12 = 1 MHz (1 tick = 1 µs) #define SERVO_ARR 19999 \/\/ 1 MHz \/ 20000 = 50 Hz period #define SERVO_MIN 1000 \/\/ 1 ms -> full left (~-90°) #define SERVO_CENTER 1500 \/\/ 1.5 ms -> center (0°) #define SERVO_MAX 2000 \/\/ 2 ms -> full right (~+90°) void servo_init(void) { RCC->APBENR2 |= RCC_APBENR2_TIM14EN; RCC->IOPENR |= RCC_IOPENR_GPIOAEN; \/* PA7 -> AF4 (TIM14 CH1) *\/ GPIOA->MODER &= ~(3U << 14); GPIOA->MODER |= (2U << 14); \/\/ Alternate function GPIOA->AFR[0] &= ~(0xFU << 28); GPIOA->AFR[0] |= (4U << 28); \/\/ AF4 TIM14->PSC = SERVO_PSC; TIM14->ARR = SERVO_ARR; TIM14->CCR1 = SERVO_CENTER; TIM14->CCMR1 = (6U << TIM_CCMR1_OC1M_Pos) | TIM_CCMR1_OC1PE; TIM14->CCER |= TIM_CCER_CC1E; TIM14->EGR |= TIM_EGR_UG; TIM14->CR1 |= TIM_CR1_CEN; } \/* Set servo position; pulse_us in range [SERVO_MIN, SERVO_MAX] *\/ void servo_set(uint16_t pulse_us) { TIM14->CCR1 = pulse_us; }  "
},
{
  "id": "fig-servo-tim14-block",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-tim14-block",
  "type": "Figure",
  "number": "12.3.2",
  "title": "",
  "body": " TIM14 block diagram showing PSC, CNT, ARR, and CCR1. The counter increments at the post-prescaler rate. When CNT reaches ARR it resets (end of period); when CNT reaches CCR1 the output goes low (end of pulse).   "
},
{
  "id": "fig-servo-nucleo-pins",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-nucleo-pins",
  "type": "Figure",
  "number": "12.3.3",
  "title": "",
  "body": " Nucleo-C031C6 PWM-capable pins. PA7 (TIM14 CH1 AF4) is brought out to the Arduino connector D11 header, making it easy to reach with a jumper wire to the servo yellow wire.   "
},
{
  "id": "fig-servo-tim14-design",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-tim14-design",
  "type": "Figure",
  "number": "12.3.4",
  "title": "",
  "body": " Timer design calculation. With SYSCLK = 12 MHz, setting PSC = 11 gives a 1 MHz counter clock (tick = 1 µs). ARR = 19999 makes the period 20000 µs = 20 ms = 50 Hz. CCR1 sweeps from 1000 to 2000 to produce 1–2 ms pulse widths corresponding to the full servo range.   "
},
{
  "id": "fig-servo-ccmr1",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-ccmr1",
  "type": "Figure",
  "number": "12.3.5",
  "title": "",
  "body": " CCMR1 register configuration for PWM Mode 1 on CH1. Bits OC1M (positions 4–6) are set to 0b110 (value 6); bit OC1PE (position 3) enables output compare preload. CCER bit CC1E enables the channel output.   "
},
{
  "id": "fig-servo-ccr1-arr",
  "level": "2",
  "url": "subsec-servo-timer-registers.html#fig-servo-ccr1-arr",
  "type": "Figure",
  "number": "12.3.6",
  "title": "",
  "body": " CCR1, ARR, and PSC in context. PSC = 11 divides 12 MHz to 1 MHz. ARR = 19999 gives the 20 ms period. CCR1 = 1000, 1500, or 2000 maps to 1 ms, 1.5 ms, and 2 ms pulses (left, center, right).   "
},
{
  "id": "subsec-servo-verify-scope",
  "level": "1",
  "url": "subsec-servo-verify-scope.html",
  "type": "Subsection",
  "number": "12.3.2",
  "title": "Verifying the Signal with an Oscilloscope",
  "body": " Verifying the Signal with an Oscilloscope   AD2 oscilloscope trace with CCR1 = 1000 (1 ms pulse, servo at full left). The high-time cursor measures 1 ms. The 20 ms period is visible between the rising edges of consecutive pulses.     Trace with CCR1 = 2000 (2 ms pulse, servo at full right). The servo arm has rotated approximately 180° from the previous trace, and the pulse width has doubled to 2 ms.    "
},
{
  "id": "fig-servo-scope-1ms",
  "level": "2",
  "url": "subsec-servo-verify-scope.html#fig-servo-scope-1ms",
  "type": "Figure",
  "number": "12.3.7",
  "title": "",
  "body": " AD2 oscilloscope trace with CCR1 = 1000 (1 ms pulse, servo at full left). The high-time cursor measures 1 ms. The 20 ms period is visible between the rising edges of consecutive pulses.   "
},
{
  "id": "fig-servo-scope-2ms",
  "level": "2",
  "url": "subsec-servo-verify-scope.html#fig-servo-scope-2ms",
  "type": "Figure",
  "number": "12.3.8",
  "title": "",
  "body": " Trace with CCR1 = 2000 (2 ms pulse, servo at full right). The servo arm has rotated approximately 180° from the previous trace, and the pulse width has doubled to 2 ms.   "
},
{
  "id": "rq-servo-pwm",
  "level": "1",
  "url": "rq-servo-pwm.html",
  "type": "Check Your Understanding",
  "number": "12.3.3",
  "title": "Check Your Understanding",
  "body": "  TIM14 runs at 1 MHz (PSC = 11, 12 MHz input clock). What CCR1 value positions the servo at center (0°)?   1500  Correct: at 1 MHz the counter increments once per microsecond, so CCR1 = 1500 gives exactly 1500 µs = 1.5 ms, the center pulse width.  750  750 µs = 0.75 ms is below the servo's minimum pulse width (1 ms); the servo would not respond predictably.  15000  15000 µs = 15 ms is far beyond the 2 ms maximum pulse width. Remember that at 1 MHz, CCR1 counts in microseconds, not milliseconds.  1500000  That is 1.5 seconds — orders of magnitude too large. The counter would wrap around long before reaching that value.     Why does servo control use 50 Hz rather than the ~20 kHz used for motor PWM?   The servo's internal controller decodes the pulse width directly; it needs time between pulses to read the signal. Also, 20 kHz would require CCR1 values of 20–40 ticks, giving very coarse position resolution.  Correct: the servo samples one pulse per cycle. A 50 Hz rate gives 20 ms between updates — more than enough. Higher frequencies shrink the resolution window.  The STM32 cannot generate 20 kHz with a 50-Hz-derived timer base.  The STM32 can generate any frequency the timer supports. The constraint is the servo hardware, not the microcontroller.  50 Hz matches the AC mains frequency, simplifying power supply design.  The servo operates from DC; mains frequency is irrelevant here.    "
},
{
  "id": "rq-servo-ccr1-center",
  "level": "2",
  "url": "rq-servo-pwm.html#rq-servo-ccr1-center",
  "type": "Reading Question",
  "number": "12.3.3.1",
  "title": "",
  "body": " TIM14 runs at 1 MHz (PSC = 11, 12 MHz input clock). What CCR1 value positions the servo at center (0°)?   1500  Correct: at 1 MHz the counter increments once per microsecond, so CCR1 = 1500 gives exactly 1500 µs = 1.5 ms, the center pulse width.  750  750 µs = 0.75 ms is below the servo's minimum pulse width (1 ms); the servo would not respond predictably.  15000  15000 µs = 15 ms is far beyond the 2 ms maximum pulse width. Remember that at 1 MHz, CCR1 counts in microseconds, not milliseconds.  1500000  That is 1.5 seconds — orders of magnitude too large. The counter would wrap around long before reaching that value.   "
},
{
  "id": "rq-servo-freq",
  "level": "2",
  "url": "rq-servo-pwm.html#rq-servo-freq",
  "type": "Reading Question",
  "number": "12.3.3.2",
  "title": "",
  "body": " Why does servo control use 50 Hz rather than the ~20 kHz used for motor PWM?   The servo's internal controller decodes the pulse width directly; it needs time between pulses to read the signal. Also, 20 kHz would require CCR1 values of 20–40 ticks, giving very coarse position resolution.  Correct: the servo samples one pulse per cycle. A 50 Hz rate gives 20 ms between updates — more than enough. Higher frequencies shrink the resolution window.  The STM32 cannot generate 20 kHz with a 50-Hz-derived timer base.  The STM32 can generate any frequency the timer supports. The constraint is the servo hardware, not the microcontroller.  50 Hz matches the AC mains frequency, simplifying power supply design.  The servo operates from DC; mains frequency is irrelevant here.   "
},
{
  "id": "sec-servo-wiring-power",
  "level": "1",
  "url": "sec-servo-wiring-power.html",
  "type": "Section",
  "number": "12.4",
  "title": "Wiring and Power Supply",
  "body": " Wiring and Power Supply  The servo draws substantially more current than the STM32 GPIO pin can supply: up to 700 mA at stall. The servo must be powered from an external rail, with only the signal wire connected to the microcontroller GPIO.   Servo breadboard wiring. Brown wire to GND; red wire to the 5 V power rail (not the Nucleo 3.3 V pin); yellow wire to the TIM14 CH1 PWM pin (PA7). GND of the servo and GND of the Nucleo must share a common reference.     Two external power options for the servo. Left: use the 5 V output available on the Nucleo's USB power header (sufficient for light loads and lab demonstrations). Right: use a regulated 5 V line from a wall-wart through the power board (required for stall conditions or when multiple servos are used).      Power board wiring for reliable servo operation. The wall-wart supplies regulated 5 V to the power board. The servo red wire connects to the 5 V rail; the servo brown and Nucleo GND connect to the same GND rail. The signal jumper (yellow) runs from PA7 to the servo connector.     Complete lab 7 hardware setup. The breadboard holds the power board, Nucleo, and servo connector. The oscilloscope probe on PA7 allows verification of the PWM signal before connecting the servo arm.    "
},
{
  "id": "fig-servo-wiring",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-wiring",
  "type": "Figure",
  "number": "12.4.1",
  "title": "",
  "body": " Servo breadboard wiring. Brown wire to GND; red wire to the 5 V power rail (not the Nucleo 3.3 V pin); yellow wire to the TIM14 CH1 PWM pin (PA7). GND of the servo and GND of the Nucleo must share a common reference.   "
},
{
  "id": "fig-servo-power-options",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-power-options",
  "type": "Figure",
  "number": "12.4.2",
  "title": "",
  "body": " Two external power options for the servo. Left: use the 5 V output available on the Nucleo's USB power header (sufficient for light loads and lab demonstrations). Right: use a regulated 5 V line from a wall-wart through the power board (required for stall conditions or when multiple servos are used).    "
},
{
  "id": "fig-servo-power-board",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-power-board",
  "type": "Figure",
  "number": "12.4.3",
  "title": "",
  "body": " Power board wiring for reliable servo operation. The wall-wart supplies regulated 5 V to the power board. The servo red wire connects to the 5 V rail; the servo brown and Nucleo GND connect to the same GND rail. The signal jumper (yellow) runs from PA7 to the servo connector.   "
},
{
  "id": "fig-servo-complete-setup",
  "level": "2",
  "url": "sec-servo-wiring-power.html#fig-servo-complete-setup",
  "type": "Figure",
  "number": "12.4.4",
  "title": "",
  "body": " Complete lab 7 hardware setup. The breadboard holds the power board, Nucleo, and servo connector. The oscilloscope probe on PA7 allows verification of the PWM signal before connecting the servo arm.   "
},
{
  "id": "sec-servo-lab",
  "level": "1",
  "url": "sec-servo-lab.html",
  "type": "Section",
  "number": "12.5",
  "title": "Lab 7: Servo Sweep",
  "body": " Lab 7: Servo Sweep    Servo Position Sweep   Wire the TowerPro SG92R servo to your breadboard with an appropriate 5 V supply. Then write firmware that:   Calls servo_init() to configure TIM14 CH1 at 50 Hz.  Slowly sweeps the servo from SERVO_MIN to SERVO_MAX and back, updating CCR1 in steps of 10 µs with a 10 ms delay between steps.  Verifies the signal on the AD2 oscilloscope before connecting the servo.  Measures the actual travel angle of your servo arm and compares it to the theoretical ±90°.   Document the minimum and maximum pulse widths that achieve full travel on your specific servo (individual units vary).     "
},
{
  "id": "ex-servo-sweep",
  "level": "2",
  "url": "sec-servo-lab-2.html#ex-servo-sweep",
  "type": "Exercise",
  "number": "12.5.1",
  "title": "Servo Position Sweep.",
  "body": " Servo Position Sweep   Wire the TowerPro SG92R servo to your breadboard with an appropriate 5 V supply. Then write firmware that:   Calls servo_init() to configure TIM14 CH1 at 50 Hz.  Slowly sweeps the servo from SERVO_MIN to SERVO_MAX and back, updating CCR1 in steps of 10 µs with a 10 ms delay between steps.  Verifies the signal on the AD2 oscilloscope before connecting the servo.  Measures the actual travel angle of your servo arm and compares it to the theoretical ±90°.   Document the minimum and maximum pulse widths that achieve full travel on your specific servo (individual units vary).   "
},
{
  "id": "subsec-resistance-sensors",
  "level": "1",
  "url": "subsec-resistance-sensors.html",
  "type": "Subsection",
  "number": "13.1.1",
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
  "number": "13.1.1",
  "title": "",
  "body": " A family of resistance-based sensors. Thermistors, strain gauges, hygristors, and LDRs all convert a physical quantity into a resistance change. All can be read using the same voltage-divider plus ADC circuit.   "
},
{
  "id": "subsec-ldr-basics",
  "level": "1",
  "url": "subsec-ldr-basics.html",
  "type": "Subsection",
  "number": "13.1.2",
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
  "number": "13.1.2",
  "title": "",
  "body": " A CdS photocell. The meandering conductive pattern on the face maximizes the length of the photoconductive channel in a small package. The device has two leads and no polarity — it behaves like a light-controlled resistor.   "
},
{
  "id": "subsec-divider-interface",
  "level": "1",
  "url": "subsec-divider-interface.html",
  "type": "Subsection",
  "number": "13.1.3",
  "title": "The Voltage Divider Interface",
  "body": " The Voltage Divider Interface  An ADC measures voltage, not resistance. To read a photocell, place it in series with a fixed resistor between the supply voltage and GND. The voltage at the midpoint — called — is:   where is the photocell and is the fixed resistor. As light increases, decreases, so increases. Swapping the two positions reverses the direction — useful if you need the voltage to go the other way.   Generic voltage-divider interface for any resistance-based sensor. The sensor ( ) and a fixed measurement resistor ( ) form a series circuit from to GND. The midpoint voltage is read by the ADC. Choosing equal to the mid-range resistance of the sensor maximizes sensitivity.    In this chapter you will build a simplified solar tracker — a device that rotates a servo arm to face a light source. Real industrial solar trackers compute the sun's position from the date, time, and GPS coordinates and drive the panel to that angle mathematically — no light sensor required; in the two-photocell approach here you implement a feedback loop: your code reads both sensors, computes the difference, and commands the servo to rotate in whichever direction reduces it. The principle is simple: two photocell voltage dividers are mounted at opposite ends of the servo arm, and their ADC readings are subtracted. When both see equal light the difference is zero and the servo holds still. When the light source shifts to one side, one photocell brightens and the other dims, and the signed difference tells your code which way to rotate the servo.  "
},
{
  "id": "fig-divider-schematic",
  "level": "2",
  "url": "subsec-divider-interface.html#fig-divider-schematic",
  "type": "Figure",
  "number": "13.1.3",
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
  "number": "13.1.4",
  "title": "Check Your Understanding",
  "body": "   A CdS photocell is sitting in a bright room. Someone suddenly covers it with their hand. What happens to the photocell's resistance?     It increases — possibly to several megaohms.  Correct. With no light, no photons are available to excite electrons into the conduction band. The CdS crystal returns to its high-resistance (low conductivity) state.    It decreases toward zero.  Resistance decreases with more light, not less. Covering the photocell removes the photons that were keeping conductivity high, so resistance rises.    It stays the same — resistance is a fixed property of the material.  The whole point of a light-dependent resistor is that its resistance changes with illumination. It is not a fixed resistor.    It briefly increases then returns to its original value.  The resistance change persists as long as the light level stays low. It does not automatically reset to a previous state.       Why can't you connect a photocell directly between the 3.3 V pin and an ADC input pin to read its resistance?     The ADC measures voltage, not resistance. Without a second resistor to GND there is no voltage division — the input just sits at 3.3 V regardless of the photocell's resistance.  Correct. A single resistor connected to a supply with no return path to GND creates no voltage drop across anything the ADC can sense. The fixed resistor to GND completes the divider.    The photocell would be damaged by 3.3 V applied directly.  CdS photocells handle the voltages used in this circuit without damage. The issue is not voltage rating but circuit function — you need a complete divider to get a meaningful voltage.    The STM32 ADC input impedance is too low to sense resistance changes.  STM32 ADC inputs have high impedance, but that is not the core issue. Even with high impedance, a single-resistor connection to a supply produces no useful voltage variation for the ADC to measure.    The photocell requires AC current to operate correctly.  CdS photocells work on DC. The photoconductive effect is driven by light, not by the type of current flowing through the device.       In the solar tracker, both photocell voltage dividers are pointed at a flashlight held exactly between them. Assume both photocells have identical resistance-versus-light characteristics. What ADC code difference does the microcontroller compute?     Zero — both sensors see equal light, so their output voltages are equal and the difference is zero.  Correct. With matching cells and equal illumination, both dividers produce the same voltage and the difference is zero. The servo holds its current position: no error, no correction.    A large positive value, because both sensors are receiving maximum light.  The tracker computes the difference between the two readings, not the sum. Equal readings subtract to zero.    An unpredictable value, because real photocells never match exactly.  Good instinct — as noted in the reading, CdS photocells do vary from unit to unit, which introduces a small residual offset in practice. That is why the question specifies identical characteristics. In a real build, the mismatch shows up as a pointing bias that proportional control alone cannot fully eliminate.    4095, the maximum ADC code, because both sensors are fully illuminated.  4095 would be the code for a single sensor reading 3.3 V. The tracker computes the signed difference between the two channels, which is zero when they are balanced.     "
},
{
  "id": "rq-ldr-resistance-change",
  "level": "2",
  "url": "rq-photosensors-concepts.html#rq-ldr-resistance-change",
  "type": "Reading Question",
  "number": "13.1.4.1",
  "title": "",
  "body": "  A CdS photocell is sitting in a bright room. Someone suddenly covers it with their hand. What happens to the photocell's resistance?     It increases — possibly to several megaohms.  Correct. With no light, no photons are available to excite electrons into the conduction band. The CdS crystal returns to its high-resistance (low conductivity) state.    It decreases toward zero.  Resistance decreases with more light, not less. Covering the photocell removes the photons that were keeping conductivity high, so resistance rises.    It stays the same — resistance is a fixed property of the material.  The whole point of a light-dependent resistor is that its resistance changes with illumination. It is not a fixed resistor.    It briefly increases then returns to its original value.  The resistance change persists as long as the light level stays low. It does not automatically reset to a previous state.    "
},
{
  "id": "rq-why-voltage-divider",
  "level": "2",
  "url": "rq-photosensors-concepts.html#rq-why-voltage-divider",
  "type": "Reading Question",
  "number": "13.1.4.2",
  "title": "",
  "body": "  Why can't you connect a photocell directly between the 3.3 V pin and an ADC input pin to read its resistance?     The ADC measures voltage, not resistance. Without a second resistor to GND there is no voltage division — the input just sits at 3.3 V regardless of the photocell's resistance.  Correct. A single resistor connected to a supply with no return path to GND creates no voltage drop across anything the ADC can sense. The fixed resistor to GND completes the divider.    The photocell would be damaged by 3.3 V applied directly.  CdS photocells handle the voltages used in this circuit without damage. The issue is not voltage rating but circuit function — you need a complete divider to get a meaningful voltage.    The STM32 ADC input impedance is too low to sense resistance changes.  STM32 ADC inputs have high impedance, but that is not the core issue. Even with high impedance, a single-resistor connection to a supply produces no useful voltage variation for the ADC to measure.    The photocell requires AC current to operate correctly.  CdS photocells work on DC. The photoconductive effect is driven by light, not by the type of current flowing through the device.    "
},
{
  "id": "rq-equal-sensors",
  "level": "2",
  "url": "rq-photosensors-concepts.html#rq-equal-sensors",
  "type": "Reading Question",
  "number": "13.1.4.3",
  "title": "",
  "body": "  In the solar tracker, both photocell voltage dividers are pointed at a flashlight held exactly between them. Assume both photocells have identical resistance-versus-light characteristics. What ADC code difference does the microcontroller compute?     Zero — both sensors see equal light, so their output voltages are equal and the difference is zero.  Correct. With matching cells and equal illumination, both dividers produce the same voltage and the difference is zero. The servo holds its current position: no error, no correction.    A large positive value, because both sensors are receiving maximum light.  The tracker computes the difference between the two readings, not the sum. Equal readings subtract to zero.    An unpredictable value, because real photocells never match exactly.  Good instinct — as noted in the reading, CdS photocells do vary from unit to unit, which introduces a small residual offset in practice. That is why the question specifies identical characteristics. In a real build, the mismatch shows up as a pointing bias that proportional control alone cannot fully eliminate.    4095, the maximum ADC code, because both sensors are fully illuminated.  4095 would be the code for a single sensor reading 3.3 V. The tracker computes the signed difference between the two channels, which is zero when they are balanced.    "
},
{
  "id": "sec-photocell-physics",
  "level": "1",
  "url": "sec-photocell-physics.html",
  "type": "Section",
  "number": "13.2",
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
  "number": "13.2.1",
  "title": "",
  "body": " A CdS photocell. The meandering conductor pattern on top maximizes the effective length of the CdS photoconductive channel in a compact package. The device is polarization-independent and responds to the visible spectrum (peak sensitivity near 560 nm, similar to the human eye).   "
},
{
  "id": "fig-photocell-response",
  "level": "2",
  "url": "sec-photocell-physics.html#fig-photocell-response",
  "type": "Figure",
  "number": "13.2.2",
  "title": "",
  "body": " CdS resistance versus illuminance on a log-log scale. The response spans six decades of resistance over five decades of illuminance. The approximate linear relationship on the log-log plot corresponds to a power-law model , with for this type of cell. For a solar tracker, we only need to compare two sensors, so the nonlinearity cancels out.   "
},
{
  "id": "sec-photocell-circuit",
  "level": "1",
  "url": "sec-photocell-circuit.html",
  "type": "Section",
  "number": "13.3",
  "title": "Voltage Divider Circuit",
  "body": " Voltage Divider Circuit  To convert the photocell's resistance change to a voltage that the ADC can read, place the photocell in series with a fixed resistor between 3.3 V and GND. The midpoint voltage is: Choosing places the midpoint in the middle of the ADC range when illuminance is moderate, maximizing sensitivity.   Photocell voltage divider. The CdS photocell is connected between 3.3 V and the ADC input; the fixed 10 kΩ resistor connects from the ADC input to GND. As light increases, photocell resistance decreases, so increases. If you swap the positions the voltage decreases with light.      With the photocell as the top element (between 3.3 V and the ADC pin) and a 10 kΩ resistor as the bottom element (to GND), what happens to the ADC reading when the room lights are turned off?   The ADC reading decreases toward 0 V.  Correct: in darkness the photocell resistance rises to megaohms, making the voltage divider heavily weighted toward GND. The ADC sees a voltage near 0 V, giving a code near 0.  The ADC reading increases toward 3.3 V.  That would happen if the photocell were the bottom element and the fixed resistor the top element. With the photocell on top, high resistance in darkness pulls the midpoint toward GND.  The ADC reading stays the same because the ratio is fixed.  The photocell resistance changes with light — that is the whole point. The ratio is not fixed.     "
},
{
  "id": "fig-photocell-divider",
  "level": "2",
  "url": "sec-photocell-circuit.html#fig-photocell-divider",
  "type": "Figure",
  "number": "13.3.1",
  "title": "",
  "body": " Photocell voltage divider. The CdS photocell is connected between 3.3 V and the ADC input; the fixed 10 kΩ resistor connects from the ADC input to GND. As light increases, photocell resistance decreases, so increases. If you swap the positions the voltage decreases with light.   "
},
{
  "id": "rq-divider-direction",
  "level": "2",
  "url": "rq-photocell.html#rq-divider-direction",
  "type": "Reading Question",
  "number": "13.3.1",
  "title": "",
  "body": " With the photocell as the top element (between 3.3 V and the ADC pin) and a 10 kΩ resistor as the bottom element (to GND), what happens to the ADC reading when the room lights are turned off?   The ADC reading decreases toward 0 V.  Correct: in darkness the photocell resistance rises to megaohms, making the voltage divider heavily weighted toward GND. The ADC sees a voltage near 0 V, giving a code near 0.  The ADC reading increases toward 3.3 V.  That would happen if the photocell were the bottom element and the fixed resistor the top element. With the photocell on top, high resistance in darkness pulls the midpoint toward GND.  The ADC reading stays the same because the ratio is fixed.  The photocell resistance changes with light — that is the whole point. The ratio is not fixed.   "
},
{
  "id": "sec-solar-tracker",
  "level": "1",
  "url": "sec-solar-tracker.html",
  "type": "Section",
  "number": "13.4",
  "title": "Solar Tracker",
  "body": " Solar Tracker  A solar tracker keeps a panel (or in our case, a servo arm) pointed at the brightest light source by comparing readings from two identical photocell dividers aimed in slightly different directions. When the source is directly between them both sensors see equal intensity; any offset produces a signed difference that drives the servo toward the brighter side.   Solar tracker assembly. Two CdS photocells are mounted in small cardboard shielding cups on the servo arm. The cups prevent each sensor from seeing the other's half of the scene, sharpening the directional sensitivity. The servo arm rotates to balance the two readings.     Solar tracker — breadboard layout. The two photocell dividers feed two ADC channels (PA0 and PA1). The servo signal wire connects to PA7 (TIM14 CH1). All three share a common GND with the power board.     Solar tracker — assembled side view. The servo is fixed to a base plate; the photocell arm extends horizontally so each sensor covers its respective hemisphere. Rotating the flashlight around the front of the assembly causes the arm to follow.     Complete solar tracker wiring. Servo power (5 V) from power board; servo signal from PA7; photocell left to PA0 ADC; photocell right to PA1 ADC; all grounds tied together at the breadboard rail.    \/* Proportional solar tracker: two photocells on PA0 and PA1 -> servo on PA7 *\/ #include <stdint.h> #include \"stm32c0xx.h\" \/* Assumes adc_read_channel(ch) and servo_set(pulse_us) already implemented *\/ #define GAIN 5 \/\/ proportional gain: servo steps per ADC-code difference void solar_tracker_update(void) { int32_t left = adc_read_channel(0); \/\/ PA0 (left photocell) int32_t right = adc_read_channel(1); \/\/ PA1 (right photocell) int32_t error = left - right; \/\/ positive = more light on left \/* Map current CCR1 + proportional correction *\/ int32_t pulse = (int32_t)TIM14->CCR1 + GAIN * error; \/* Clamp to valid servo range *\/ if (pulse < SERVO_MIN) pulse = SERVO_MIN; if (pulse > SERVO_MAX) pulse = SERVO_MAX; servo_set((uint16_t)pulse); }   The gain constant GAIN controls the tracker's responsiveness. Too small and the arm barely moves; too large and it oscillates past the target. Proportional control alone will have a steady-state error whenever friction is significant. Adding an integral term (PI control) eliminates the offset but is not required for this lab.     Lab 8: Solar Tracker   Build and demonstrate a one-axis solar tracker that follows a flashlight moved in an arc in front of the assembly.   Wire two photocell voltage dividers to PA0 and PA1 ADC inputs. Verify both return reasonable codes (1000–3000) under room lighting.  Mount the photocells on the servo arm with cardboard shielding cups so each covers roughly one half of the scene.  Implement solar_tracker_update() and call it in the main loop with a 20 ms delay.  Adjust the gain until the arm follows the flashlight smoothly without excessive oscillation.  Measure and record the steady-state error angle when the flashlight is held 10 cm to the left of center.      "
},
{
  "id": "fig-solar-tracker-mechanical",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-mechanical",
  "type": "Figure",
  "number": "13.4.1",
  "title": "",
  "body": " Solar tracker assembly. Two CdS photocells are mounted in small cardboard shielding cups on the servo arm. The cups prevent each sensor from seeing the other's half of the scene, sharpening the directional sensitivity. The servo arm rotates to balance the two readings.   "
},
{
  "id": "fig-solar-tracker-full1",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-full1",
  "type": "Figure",
  "number": "13.4.2",
  "title": "",
  "body": " Solar tracker — breadboard layout. The two photocell dividers feed two ADC channels (PA0 and PA1). The servo signal wire connects to PA7 (TIM14 CH1). All three share a common GND with the power board.   "
},
{
  "id": "fig-solar-tracker-full2",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-full2",
  "type": "Figure",
  "number": "13.4.3",
  "title": "",
  "body": " Solar tracker — assembled side view. The servo is fixed to a base plate; the photocell arm extends horizontally so each sensor covers its respective hemisphere. Rotating the flashlight around the front of the assembly causes the arm to follow.   "
},
{
  "id": "fig-solar-tracker-complete",
  "level": "2",
  "url": "sec-solar-tracker.html#fig-solar-tracker-complete",
  "type": "Figure",
  "number": "13.4.4",
  "title": "",
  "body": " Complete solar tracker wiring. Servo power (5 V) from power board; servo signal from PA7; photocell left to PA0 ADC; photocell right to PA1 ADC; all grounds tied together at the breadboard rail.   "
},
{
  "id": "sec-solar-tracker-8",
  "level": "2",
  "url": "sec-solar-tracker.html#sec-solar-tracker-8",
  "type": "Insight",
  "number": "13.4.5",
  "title": "",
  "body": " The gain constant GAIN controls the tracker's responsiveness. Too small and the arm barely moves; too large and it oscillates past the target. Proportional control alone will have a steady-state error whenever friction is significant. Adding an integral term (PI control) eliminates the offset but is not required for this lab.  "
},
{
  "id": "ex-tracker-build",
  "level": "2",
  "url": "sec-solar-tracker-9.html#ex-tracker-build",
  "type": "Exercise",
  "number": "13.4.1",
  "title": "Lab 8: Solar Tracker.",
  "body": " Lab 8: Solar Tracker   Build and demonstrate a one-axis solar tracker that follows a flashlight moved in an arc in front of the assembly.   Wire two photocell voltage dividers to PA0 and PA1 ADC inputs. Verify both return reasonable codes (1000–3000) under room lighting.  Mount the photocells on the servo arm with cardboard shielding cups so each covers roughly one half of the scene.  Implement solar_tracker_update() and call it in the main loop with a 20 ms delay.  Adjust the gain until the arm follows the flashlight smoothly without excessive oscillation.  Measure and record the steady-state error angle when the flashlight is held 10 cm to the left of center.    "
},
{
  "id": "subsec-ble-what-it-is",
  "level": "1",
  "url": "subsec-ble-what-it-is.html",
  "type": "Subsection",
  "number": "14.1.1",
  "title": "What BLE Is — and What It Is Not",
  "body": " What BLE Is — and What It Is Not  You have almost certainly used BLE without realizing it. Fitness trackers, smartwatches, wireless keyboards, glucose monitors, AirTag location beacons, and heart-rate chest straps all communicate with your phone using BLE. What these devices have in common is that they run on a coin cell or small battery for months or years, and they send small amounts of data — a step count, a heart rate reading, a button press — at relatively infrequent intervals. BLE is optimized for exactly this pattern.   Two wireless devices, two different protocols. Left: wireless headphones use classic Bluetooth, which provides the continuous high-bandwidth audio stream needed for music. Right: a heart-rate monitor armband uses BLE, sending a brief reading every second or so from a coin-cell battery that lasts months. Same radio band, very different design goals.       BLE is not the same as classic Bluetooth. Classic Bluetooth was designed for continuous high-bandwidth streams — audio to headphones, file transfers. BLE trades bandwidth for dramatically lower power consumption. A BLE device can sleep between transmissions, waking only long enough to send a few bytes, then returning to sleep. The two standards share a name and operate on the same 2.4 GHz radio band, but they are otherwise incompatible protocols serving different purposes.  BLE also has a short range — typically around 10 meters indoors — and is not suited for streaming video or audio. Think of it as a wireless replacement for a short serial cable: occasional, low-volume, low-power.  "
},
{
  "id": "fig-ble-applications",
  "level": "2",
  "url": "subsec-ble-what-it-is.html#fig-ble-applications",
  "type": "Figure",
  "number": "14.1.1",
  "title": "",
  "body": " Two wireless devices, two different protocols. Left: wireless headphones use classic Bluetooth, which provides the continuous high-bandwidth audio stream needed for music. Right: a heart-rate monitor armband uses BLE, sending a brief reading every second or so from a coin-cell battery that lasts months. Same radio band, very different design goals.      "
},
{
  "id": "subsec-ble-discovery",
  "level": "1",
  "url": "subsec-ble-discovery.html",
  "type": "Subsection",
  "number": "14.1.2",
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
  "number": "14.1.2",
  "title": "",
  "body": " A central device (smartphone) surrounded by BLE peripherals — smart lock, bulb, thermometer, fan, wall switch, and door handle. Each peripheral advertises independently; the central scans and manages connections to whichever ones it chooses.   "
},
{
  "id": "subsec-ble-gatt",
  "level": "1",
  "url": "subsec-ble-gatt.html",
  "type": "Subsection",
  "number": "14.1.3",
  "title": "How Connected Devices Exchange Data: GATT",
  "body": " How Connected Devices Exchange Data: GATT  After a connection is established, the Generic Attribute Profile (GATT) defines how the two devices structure and exchange data. GATT organizes data in a simple hierarchy:  A service is a collection of related data. For example, there is a standard \"Heart Rate\" service, a \"Battery\" service, and — relevant to this chapter — a \"UART\" service on the Bluefruit module. Each service is identified by a unique number called a UUID.  Within each service, individual data values are called characteristics . A characteristic is a single, typed, addressable value — like a variable with permissions attached. The central can read a characteristic to get its current value, write to it to send data to the peripheral, or subscribe to notifications so the peripheral automatically sends an update whenever the value changes. For example, the Bluefruit's UART service has two characteristics: one the phone writes to in order to send bytes to the STM32 (RX), and one that notifies the phone whenever the STM32 sends bytes back (TX).   The GATT attribute hierarchy. The outermost box is the peripheral's GATT server — the structured data store it exposes to any connected central. Inside it are services (named groups of related data), and inside each service are characteristics (individual typed values). The left service is the UART bridge used in this chapter: the RX characteristic carries bytes from the phone to the STM32 (Write permission), and the TX characteristic carries bytes the other way (Notify permission). The greyed Battery service on the right illustrates that a peripheral can host multiple services simultaneously.    The net effect is a bidirectional byte stream — just like a serial port, but over the air. You send a string from the STM32 over UART, the Bluefruit forwards it as a GATT notification, and it appears in the phone app. You type a command in the phone app, the Bluefruit writes it to a characteristic, and your STM32 receives it over UART.  "
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
  "number": "14.1.3",
  "title": "",
  "body": " The GATT attribute hierarchy. The outermost box is the peripheral's GATT server — the structured data store it exposes to any connected central. Inside it are services (named groups of related data), and inside each service are characteristics (individual typed values). The left service is the UART bridge used in this chapter: the RX characteristic carries bytes from the phone to the STM32 (Write permission), and the TX characteristic carries bytes the other way (Notify permission). The greyed Battery service on the right illustrates that a peripheral can host multiple services simultaneously.   "
},
{
  "id": "subsec-ble-module",
  "level": "1",
  "url": "subsec-ble-module.html",
  "type": "Subsection",
  "number": "14.1.4",
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
  "number": "14.1.4",
  "title": "",
  "body": " The Adafruit Bluefruit LE UART Friend module. The silver rectangle on the blue PCB is the nRF51822 BLE SoC and its antenna. The row of pins along the right edge provides the UART interface (RXI, TXO), power (VIN, GND), and a MODE pin that selects between data pass-through and AT command configuration mode.   "
},
{
  "id": "rq-ble-concepts",
  "level": "1",
  "url": "rq-ble-concepts.html",
  "type": "Check Your Understanding",
  "number": "14.1.5",
  "title": "Check Your Understanding",
  "body": "   In a BLE connection between your phone and the Bluefruit module, which device advertises its presence and waits to be connected to?     The Bluefruit module — it is the peripheral.  Correct. The peripheral advertises; the central (your phone) scans for advertising packets and initiates the connection. Once connected, the Bluefruit stops advertising.    The phone — it broadcasts its identity so the Bluefruit can find it.  The phone is the central: it scans and initiates. The Bluefruit is the peripheral: it advertises and waits. Advertising always originates from the peripheral.    Both devices advertise simultaneously until one detects the other.  Only the peripheral advertises. The central is silent during the discovery phase — it listens for advertising packets rather than sending any.    Neither — BLE connections are established by a separate pairing server.  There is no third-party server involved. GAP defines the peripheral\/central roles so that two devices can discover and connect to each other directly.       The Bluefruit module's UART service has a TX characteristic. What does \"TX\" represent in this context, and who sends notifications on it?     TX carries bytes from the STM32 to the phone. The Bluefruit (peripheral) sends a notification on the TX characteristic whenever the STM32 writes a byte to the module over UART.  Correct. The naming is from the module's perspective: TX means the module is transmitting to the phone. The STM32 sends bytes to the module's UART input; the module forwards them as GATT notifications on the TX characteristic.    TX carries bytes from the phone to the STM32. The phone writes to TX to send commands.  The characteristic that carries phone-to-module data is the RX characteristic (the module receives it). TX is for module-to-phone data — the module transmits it.    TX is the service UUID that identifies the UART service to nearby scanning devices.  The UUID identifies the service, not the TX characteristic. TX is a specific characteristic within the UART service, carrying data in one direction.    TX is the advertising packet the Bluefruit broadcasts before a connection is made.  Advertising packets are part of GAP, not GATT. The TX characteristic only exists after a connection is established and GATT communication begins.       Why do we use the Adafruit Bluefruit module rather than adding a BLE radio directly to the STM32 and writing our own BLE stack?     A complete BLE stack is extremely complex — multiple protocol layers including the radio, link layer, GATT, GAP, and security — and would take months to implement correctly. The module handles all of it, presenting a simple UART interface.  Correct. This is the standard industry approach: use a certified module for the complex radio protocol and focus application code on what your product actually needs to do. The same pattern applies to Wi-Fi modules, cellular modems, and GPS receivers.    The STM32C031C6 does not have enough flash memory to store BLE firmware.  Memory is one constraint, but the more fundamental issue is the complexity of writing a correct, standards-compliant BLE stack. Even with enough memory, implementing the protocol from scratch is a major engineering project.    BLE requires a 5 V power supply that the STM32 cannot provide.  BLE radios typically operate at 1.8–3.3 V, well within what the STM32 can provide. Power supply voltage is not the reason for using a module.    The module encrypts data automatically, whereas the STM32 has no encryption hardware.  Encryption is one feature the module handles, but it is not the primary reason. The STM32 actually does have hardware cryptographic accelerators. The decisive reason is the overall complexity of the BLE protocol stack.     "
},
{
  "id": "rq-ble-peripheral-role",
  "level": "2",
  "url": "rq-ble-concepts.html#rq-ble-peripheral-role",
  "type": "Reading Question",
  "number": "14.1.5.1",
  "title": "",
  "body": "  In a BLE connection between your phone and the Bluefruit module, which device advertises its presence and waits to be connected to?     The Bluefruit module — it is the peripheral.  Correct. The peripheral advertises; the central (your phone) scans for advertising packets and initiates the connection. Once connected, the Bluefruit stops advertising.    The phone — it broadcasts its identity so the Bluefruit can find it.  The phone is the central: it scans and initiates. The Bluefruit is the peripheral: it advertises and waits. Advertising always originates from the peripheral.    Both devices advertise simultaneously until one detects the other.  Only the peripheral advertises. The central is silent during the discovery phase — it listens for advertising packets rather than sending any.    Neither — BLE connections are established by a separate pairing server.  There is no third-party server involved. GAP defines the peripheral\/central roles so that two devices can discover and connect to each other directly.    "
},
{
  "id": "rq-ble-characteristic",
  "level": "2",
  "url": "rq-ble-concepts.html#rq-ble-characteristic",
  "type": "Reading Question",
  "number": "14.1.5.2",
  "title": "",
  "body": "  The Bluefruit module's UART service has a TX characteristic. What does \"TX\" represent in this context, and who sends notifications on it?     TX carries bytes from the STM32 to the phone. The Bluefruit (peripheral) sends a notification on the TX characteristic whenever the STM32 writes a byte to the module over UART.  Correct. The naming is from the module's perspective: TX means the module is transmitting to the phone. The STM32 sends bytes to the module's UART input; the module forwards them as GATT notifications on the TX characteristic.    TX carries bytes from the phone to the STM32. The phone writes to TX to send commands.  The characteristic that carries phone-to-module data is the RX characteristic (the module receives it). TX is for module-to-phone data — the module transmits it.    TX is the service UUID that identifies the UART service to nearby scanning devices.  The UUID identifies the service, not the TX characteristic. TX is a specific characteristic within the UART service, carrying data in one direction.    TX is the advertising packet the Bluefruit broadcasts before a connection is made.  Advertising packets are part of GAP, not GATT. The TX characteristic only exists after a connection is established and GATT communication begins.    "
},
{
  "id": "rq-ble-why-module",
  "level": "2",
  "url": "rq-ble-concepts.html#rq-ble-why-module",
  "type": "Reading Question",
  "number": "14.1.5.3",
  "title": "",
  "body": "  Why do we use the Adafruit Bluefruit module rather than adding a BLE radio directly to the STM32 and writing our own BLE stack?     A complete BLE stack is extremely complex — multiple protocol layers including the radio, link layer, GATT, GAP, and security — and would take months to implement correctly. The module handles all of it, presenting a simple UART interface.  Correct. This is the standard industry approach: use a certified module for the complex radio protocol and focus application code on what your product actually needs to do. The same pattern applies to Wi-Fi modules, cellular modems, and GPS receivers.    The STM32C031C6 does not have enough flash memory to store BLE firmware.  Memory is one constraint, but the more fundamental issue is the complexity of writing a correct, standards-compliant BLE stack. Even with enough memory, implementing the protocol from scratch is a major engineering project.    BLE requires a 5 V power supply that the STM32 cannot provide.  BLE radios typically operate at 1.8–3.3 V, well within what the STM32 can provide. Power supply voltage is not the reason for using a module.    The module encrypts data automatically, whereas the STM32 has no encryption hardware.  Encryption is one feature the module handles, but it is not the primary reason. The STM32 actually does have hardware cryptographic accelerators. The decisive reason is the overall complexity of the BLE protocol stack.    "
},
{
  "id": "sec-ble-protocol",
  "level": "1",
  "url": "sec-ble-protocol.html",
  "type": "Section",
  "number": "14.2",
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
  "number": "14.2.1",
  "title": "",
  "body": " BLE connection lifecycle. Before connection, the peripheral advertises and the central scans. After the central connects, advertising stops and bidirectional GATT communication begins. The connection can be torn down by either side at any time.   "
},
{
  "id": "fig-ble-central-peripheral",
  "level": "2",
  "url": "sec-ble-protocol.html#fig-ble-central-peripheral",
  "type": "Figure",
  "number": "14.2.2",
  "title": "",
  "body": " Central and peripheral roles. The phone (central) scans for and connects to the Bluefruit module (peripheral). Once connected, the phone reads sensor data (characteristic reads\/notifications) and sends commands (characteristic writes) to the module, which forwards them over UART to the STM32.   "
},
{
  "id": "fig-ble-characteristics",
  "level": "2",
  "url": "sec-ble-protocol.html#fig-ble-characteristics",
  "type": "Figure",
  "number": "14.2.3",
  "title": "",
  "body": " BLE advertising and GATT characteristics. In advertise mode the Bluefruit broadcasts its name. After connection, the GATT server exposes the UART service (UUID 6E400001-...) with an RX characteristic (phone-to-module writes) and a TX characteristic (module-to-phone notifications). Firmware talks to this via plain USART.   "
},
{
  "id": "rq-ble-central",
  "level": "2",
  "url": "rq-ble-roles.html#rq-ble-central",
  "type": "Reading Question",
  "number": "14.2.1",
  "title": "",
  "body": " In a BLE connection between a smartphone and the Bluefruit module, which device is the central and which is the peripheral?   The smartphone is the central (it initiates the connection by scanning); the Bluefruit module is the peripheral (it advertises).  Correct. The central always initiates; the peripheral always advertises and waits.  The Bluefruit module is the central; the smartphone is the peripheral.  It is the opposite. The Bluefruit module advertises its presence and waits to be connected to — that is the peripheral role.  Both devices can be central or peripheral simultaneously in a single connection.  A single BLE connection has exactly one central and one peripheral. Multi-role is possible across different connections, but not within one.   "
},
{
  "id": "sec-bluefruit-module",
  "level": "1",
  "url": "sec-bluefruit-module.html",
  "type": "Section",
  "number": "14.3",
  "title": "Adafruit Bluefruit LE UART Friend",
  "body": " Adafruit Bluefruit LE UART Friend  The Adafruit Bluefruit LE UART Friend module contains a Nordic Semiconductor nRF51822 BLE SoC running Adafruit's firmware. It exposes a full BLE UART bridge: anything written to the module's RXI pin over UART appears as a BLE characteristic write to the connected central; anything the central writes appears on the module's TXO pin. From the STM32's perspective the module looks identical to the CoolTerm serial port used in Chapter 3, except that the wire is replaced by a radio link.   Adafruit Bluefruit LE UART Friend. Key pins: VIN (3.3–16 V, decoupled from 3.3 V), GND, RXI (module receive, connect to STM32 TX), TXO (module transmit, connect to STM32 RX), and MODE (leave LOW for UART data mode; pull HIGH for AT command mode). The module defaults to 9600 baud, matching our USART configuration.     Bluefruit wiring to the Nucleo. VIN to 3.3 V; GND to GND; RXI to PA9 (USART1 TX, AF1); TXO to PA10 (USART1 RX, AF1). Leave the MODE pin LOW (or floating with its internal pull-down) to stay in data pass-through mode.    "
},
{
  "id": "fig-bluefruit-module",
  "level": "2",
  "url": "sec-bluefruit-module.html#fig-bluefruit-module",
  "type": "Figure",
  "number": "14.3.1",
  "title": "",
  "body": " Adafruit Bluefruit LE UART Friend. Key pins: VIN (3.3–16 V, decoupled from 3.3 V), GND, RXI (module receive, connect to STM32 TX), TXO (module transmit, connect to STM32 RX), and MODE (leave LOW for UART data mode; pull HIGH for AT command mode). The module defaults to 9600 baud, matching our USART configuration.   "
},
{
  "id": "fig-bluefruit-wiring",
  "level": "2",
  "url": "sec-bluefruit-module.html#fig-bluefruit-wiring",
  "type": "Figure",
  "number": "14.3.2",
  "title": "",
  "body": " Bluefruit wiring to the Nucleo. VIN to 3.3 V; GND to GND; RXI to PA9 (USART1 TX, AF1); TXO to PA10 (USART1 RX, AF1). Leave the MODE pin LOW (or floating with its internal pull-down) to stay in data pass-through mode.   "
},
{
  "id": "sec-usart1-config",
  "level": "1",
  "url": "sec-usart1-config.html",
  "type": "Section",
  "number": "14.4",
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
  "number": "14.4.1",
  "title": "",
  "body": " Design notes for the BLE lab, showing the software architecture: USART1 driver → Bluefruit module → BLE radio → phone app. The same layered driver pattern from I2C and UART applies here.   "
},
{
  "id": "rq-ble-brr",
  "level": "2",
  "url": "rq-ble-usart.html#rq-ble-brr",
  "type": "Reading Question",
  "number": "14.4.1",
  "title": "",
  "body": " Why is USART1 used for the Bluefruit rather than reusing USART2?   USART2 is already connected to the ST-Link virtual COM port for printf debug output. Using USART1 on separate pins lets both debug printing and BLE run at the same time.  Correct. The STM32C031C6 has two USARTs; assigning each a dedicated purpose avoids multiplexing the single data channel.  USART1 supports higher baud rates than USART2.  Both USARTs support the same baud rates on this device. The reason is functional separation, not hardware capability.  The Bluefruit module requires USART1 specifically.  The Bluefruit module just needs any UART; the choice of USART1 is a software design decision to keep BLE separate from debug output.   "
},
{
  "id": "sec-ble-lab",
  "level": "1",
  "url": "sec-ble-lab.html",
  "type": "Section",
  "number": "14.5",
  "title": "Lab: Wireless Sensor Readout",
  "body": " Lab: Wireless Sensor Readout    BLE Sensor Bridge   Connect the Bluefruit LE UART Friend to USART1 and stream live sensor data to the Bluefruit Connect app on your phone.   Wire the Bluefruit module (VIN, GND, RXI → PA9, TXO → PA10).  Call usart1_ble_init() and servo_init() or adc_read() as appropriate for your sensor.  In the main loop, read the sensor, format a string with sprintf , and call usart1_send_string to transmit it. Send one reading every 200 ms.  Open Bluefruit Connect on your phone, connect to the module, and open the UART console to see the live data stream.  Send a single character from the phone ( '1' to start, '0' to stop) and implement a simple command parser using usart1_recv_char in an interrupt handler.      "
},
{
  "id": "ex-ble-sensor",
  "level": "2",
  "url": "sec-ble-lab-2.html#ex-ble-sensor",
  "type": "Exercise",
  "number": "14.5.1",
  "title": "BLE Sensor Bridge.",
  "body": " BLE Sensor Bridge   Connect the Bluefruit LE UART Friend to USART1 and stream live sensor data to the Bluefruit Connect app on your phone.   Wire the Bluefruit module (VIN, GND, RXI → PA9, TXO → PA10).  Call usart1_ble_init() and servo_init() or adc_read() as appropriate for your sensor.  In the main loop, read the sensor, format a string with sprintf , and call usart1_send_string to transmit it. Send one reading every 200 ms.  Open Bluefruit Connect on your phone, connect to the module, and open the UART console to see the live data stream.  Send a single character from the phone ( '1' to start, '0' to stop) and implement a simple command parser using usart1_recv_char in an interrupt handler.    "
},
{
  "id": "subsec-power-why-it-matters",
  "level": "1",
  "url": "subsec-power-why-it-matters.html",
  "type": "Subsection",
  "number": "15.1.1",
  "title": "The Energy Budget Problem",
  "body": " The Energy Budget Problem  The fundamental insight is that most embedded systems spend the vast majority of their time waiting . A heart-rate monitor that samples once per second is actually computing for a few milliseconds out of every thousand. A door sensor that detects a single opening per hour is idle for over 99.9% of its life. If the chip runs at full speed through all of that waiting, every milliamp of idle current subtracts directly from battery life.  The solution is not a faster processor or a larger battery — it is to consume as little current as possible during idle periods. Power management is the engineering discipline of matching the chip's activity level to the work it actually needs to do at each moment. A well-designed firmware can reduce average current from several milliamps (full-speed operation) to a few microamps (deep sleep), extending battery life by orders of magnitude.  "
},
{
  "id": "subsec-power-sleep-concept",
  "level": "1",
  "url": "subsec-power-sleep-concept.html",
  "type": "Subsection",
  "number": "15.1.2",
  "title": "Saving Power by Stopping Clocks",
  "body": " Saving Power by Stopping Clocks  A digital circuit consumes power whenever its transistors switch state — that is, whenever logic values change. What drives those transitions is the clock: every clock edge causes flip-flops throughout the chip to sample their inputs and update their outputs, burning a small pulse of current. Stop the clock and the transitions stop. Stop the transitions and the current drops to a tiny leakage level, typically thousands of times smaller than the active current.  The STM32 (and most modern microcontrollers) exploit this by letting firmware gate individual clocks under software control. You have already seen a limited version: enabling a peripheral clock with RCC->IOPENR |= ... before using it. The same mechanism works in reverse — disable the clock for a peripheral you are not using, and it stops consuming power. The low-power modes carry this idea further by gating the CPU's own clock.   The STM32C0 low-power mode spectrum. Each row is a mode; the arrows show relative current consumption (shorter arrow = less power). Moving down reduces current dramatically — from 58 µA\/MHz in Run mode to 19 nA in Shutdown — but increases wakeup time and reduces which peripherals remain available. Sleep mode (CPU clock gated, peripherals active) gives a good tradeoff for interrupt-driven designs. Stop mode (most clocks halted) is used when the longest possible idle periods justify the longer wakeup latency.    The key tradeoff is wakeup latency . Gating only the CPU clock (Sleep mode) costs almost nothing to undo — an interrupt arrives, the CPU clock restarts within a few cycles, and the ISR runs. Halting the high-speed oscillator and the PLL (Stop mode) saves more power, but the clocks take several microseconds to stabilize when a wakeup event occurs, and peripherals that were running under those clocks must be reconfigured. Choosing the right mode means matching the depth of sleep to how quickly the system must respond.  For the lab in this chapter you will use Sleep mode via the WFI (Wait For Interrupt) instruction: the CPU halts until an interrupt fires, the ISR runs, and then the CPU immediately sleeps again. This pattern — initialize, enable interrupts, loop on WFI — is the standard structure of interrupt-driven, battery-conscious firmware.  "
},
{
  "id": "fig-power-mode-spectrum",
  "level": "2",
  "url": "subsec-power-sleep-concept.html#fig-power-mode-spectrum",
  "type": "Figure",
  "number": "15.1.1",
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
  "number": "15.1.3",
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
  "number": "15.1.4",
  "title": "Check Your Understanding",
  "body": "   In STM32 Sleep mode, what is clocked off, and what continues to run?     The CPU core clock is gated — the CPU stops executing instructions — but all peripheral clocks (timers, USART, ADC, etc.) continue running normally.  Correct. Sleep mode halts only the CPU clock. Peripherals keep running and can generate interrupts that wake the CPU back up. This is why wakeup from Sleep takes only a handful of cycles.    The entire chip is powered down; only the RTC keeps running to provide a wakeup timestamp.  That describes a deeper mode (Standby or Shutdown). Sleep mode is much shallower — the CPU clock is gated but peripherals stay active.    The main oscillator (HSI) is stopped, but a low-power clock keeps the CPU ticking at reduced speed.  Stopping the main oscillator is characteristic of Stop mode, not Sleep mode. In Sleep mode the HSI keeps running; only the CPU clock gate closes.    All clocks stop, including peripherals, but GPIO pins retain their state so outputs hold their last value.  GPIO retention is correct for deeper modes, but this description is too aggressive for Sleep mode. Peripherals — including timers that might count events while the CPU sleeps — keep their clocks in Sleep mode.       A weather station samples temperature every 60 seconds and must respond to a button press within 50 ms. A designer considers using Stop mode (wakeup latency ≈ 5 µs) between samples. What is the main cost of Stop mode compared with Sleep mode?     Most peripheral clocks are halted in Stop mode, so the USART, timers, and ADC stop running during idle periods. They must be reconfigured or restarted after each wakeup, adding software complexity.  Correct. Stop mode saves more power but freezes most peripherals. For a 60-second sample interval the 5 µs wakeup latency is negligible, but the firmware must handle peripheral restart after each Stop period.    Stop mode is unavailable when a button interrupt is needed, so the button must be polled instead.  External interrupts (EXTI lines) can wake the chip from Stop mode. The button can still be connected to an EXTI line and will generate a wakeup event.    Stop mode resets all registers, so the entire chip must be re-initialized on every wakeup, as if after a hard reset.  Stop mode does not reset registers — RAM and most peripheral configuration are preserved. Only clocks are stopped, not state.    The 5 µs wakeup latency means the button response cannot meet the 50 ms requirement.  5 µs is far below 50 ms. Wakeup latency is not the issue here; peripheral availability is.       A firmware developer suggests kicking the watchdog at the top of every ISR instead of in the main loop, arguing this gives more frequent kicks and less chance of a false reset. What is wrong with this approach?     The watchdog is meant to verify that the main loop is still running. If the main loop hangs but interrupts keep firing, kicking from ISRs would prevent the reset even though the firmware is effectively stuck.  Correct. A hung main loop with active interrupts is a failure state — the watchdog should detect it and reset the chip. Kicking from ISRs would hide exactly the kind of fault the watchdog is supposed to catch.    ISRs execute too infrequently to keep a fast watchdog from expiring.  The opposite is the concern — ISRs may fire more frequently than the main loop, or keep firing even when the main loop is stuck. The problem is that ISR-based kicks hide main-loop failures, not that they kick too rarely.    The IWDG key register is not accessible from interrupt context on the Cortex-M0+.  The IWDG registers are memory-mapped and accessible from any execution context, including ISRs. The restriction is a design principle, not a hardware limit.    Kicking the watchdog too frequently causes the LSI oscillator to drift, making the timeout imprecise.  The LSI oscillator runs continuously regardless of how often the watchdog is kicked. Kick frequency has no effect on oscillator accuracy.     "
},
{
  "id": "rq-power-sleep-mechanism",
  "level": "2",
  "url": "rq-power-concepts.html#rq-power-sleep-mechanism",
  "type": "Reading Question",
  "number": "15.1.4.1",
  "title": "",
  "body": "  In STM32 Sleep mode, what is clocked off, and what continues to run?     The CPU core clock is gated — the CPU stops executing instructions — but all peripheral clocks (timers, USART, ADC, etc.) continue running normally.  Correct. Sleep mode halts only the CPU clock. Peripherals keep running and can generate interrupts that wake the CPU back up. This is why wakeup from Sleep takes only a handful of cycles.    The entire chip is powered down; only the RTC keeps running to provide a wakeup timestamp.  That describes a deeper mode (Standby or Shutdown). Sleep mode is much shallower — the CPU clock is gated but peripherals stay active.    The main oscillator (HSI) is stopped, but a low-power clock keeps the CPU ticking at reduced speed.  Stopping the main oscillator is characteristic of Stop mode, not Sleep mode. In Sleep mode the HSI keeps running; only the CPU clock gate closes.    All clocks stop, including peripherals, but GPIO pins retain their state so outputs hold their last value.  GPIO retention is correct for deeper modes, but this description is too aggressive for Sleep mode. Peripherals — including timers that might count events while the CPU sleeps — keep their clocks in Sleep mode.    "
},
{
  "id": "rq-power-mode-tradeoff",
  "level": "2",
  "url": "rq-power-concepts.html#rq-power-mode-tradeoff",
  "type": "Reading Question",
  "number": "15.1.4.2",
  "title": "",
  "body": "  A weather station samples temperature every 60 seconds and must respond to a button press within 50 ms. A designer considers using Stop mode (wakeup latency ≈ 5 µs) between samples. What is the main cost of Stop mode compared with Sleep mode?     Most peripheral clocks are halted in Stop mode, so the USART, timers, and ADC stop running during idle periods. They must be reconfigured or restarted after each wakeup, adding software complexity.  Correct. Stop mode saves more power but freezes most peripherals. For a 60-second sample interval the 5 µs wakeup latency is negligible, but the firmware must handle peripheral restart after each Stop period.    Stop mode is unavailable when a button interrupt is needed, so the button must be polled instead.  External interrupts (EXTI lines) can wake the chip from Stop mode. The button can still be connected to an EXTI line and will generate a wakeup event.    Stop mode resets all registers, so the entire chip must be re-initialized on every wakeup, as if after a hard reset.  Stop mode does not reset registers — RAM and most peripheral configuration are preserved. Only clocks are stopped, not state.    The 5 µs wakeup latency means the button response cannot meet the 50 ms requirement.  5 µs is far below 50 ms. Wakeup latency is not the issue here; peripheral availability is.    "
},
{
  "id": "rq-power-watchdog-kick",
  "level": "2",
  "url": "rq-power-concepts.html#rq-power-watchdog-kick",
  "type": "Reading Question",
  "number": "15.1.4.3",
  "title": "",
  "body": "  A firmware developer suggests kicking the watchdog at the top of every ISR instead of in the main loop, arguing this gives more frequent kicks and less chance of a false reset. What is wrong with this approach?     The watchdog is meant to verify that the main loop is still running. If the main loop hangs but interrupts keep firing, kicking from ISRs would prevent the reset even though the firmware is effectively stuck.  Correct. A hung main loop with active interrupts is a failure state — the watchdog should detect it and reset the chip. Kicking from ISRs would hide exactly the kind of fault the watchdog is supposed to catch.    ISRs execute too infrequently to keep a fast watchdog from expiring.  The opposite is the concern — ISRs may fire more frequently than the main loop, or keep firing even when the main loop is stuck. The problem is that ISR-based kicks hide main-loop failures, not that they kick too rarely.    The IWDG key register is not accessible from interrupt context on the Cortex-M0+.  The IWDG registers are memory-mapped and accessible from any execution context, including ISRs. The restriction is a design principle, not a hardware limit.    Kicking the watchdog too frequently causes the LSI oscillator to drift, making the timeout imprecise.  The LSI oscillator runs continuously regardless of how often the watchdog is kicked. Kick frequency has no effect on oscillator accuracy.    "
},
{
  "id": "sec-power-modes",
  "level": "1",
  "url": "sec-power-modes.html",
  "type": "Section",
  "number": "15.2",
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
  "number": "15.2.1",
  "title": "",
  "body": " STM32C0 low-power mode hierarchy. Moving down the table reduces current draw at the cost of wakeup latency and available peripheral set. Run mode: ~5 mA. Sleep mode: ~1 mA. Stop mode: ~5 µA. Entering each mode requires specific register configuration.   "
},
{
  "id": "fig-clock-distribution",
  "level": "2",
  "url": "sec-power-modes.html#fig-clock-distribution",
  "type": "Figure",
  "number": "15.2.2",
  "title": "",
  "body": " STM32C031 clock distribution tree. The HSI (16 MHz internal RC) feeds a PLL or passes directly as SYSCLK. SYSCLK drives the AHB bus and is further divided for the APB bus (which clocks peripherals like TIM14, USART, and ADC). Gating individual peripheral clocks via RCC_IOPENR and RCC_APBENR reduces idle power even in Run mode.   "
},
{
  "id": "fig-operating-modes-table",
  "level": "2",
  "url": "sec-power-modes.html#fig-operating-modes-table",
  "type": "Figure",
  "number": "15.2.3",
  "title": "",
  "body": " Detailed comparison of operating modes. Sleep mode gates only the CPU; all peripherals and the systick keep running, so interrupt latency is minimal (a few cycles). Stop mode halts all high-speed clocks; only the LSI\/LSE, RTC, and EXTI\/IWDG wakeup sources remain active. Wakeup from Stop takes several microseconds while the clocks restart.   "
},
{
  "id": "fig-device-resources-table",
  "level": "2",
  "url": "sec-power-modes.html#fig-device-resources-table",
  "type": "Figure",
  "number": "15.2.4",
  "title": "",
  "body": " Device resources available in each mode. Timers, USART, ADC, I2C, and SPI are all gated in Stop mode. GPIO retains its state. The EXTI controller and IWDG remain active and can generate a wakeup event.   "
},
{
  "id": "sec-wfi-wfe",
  "level": "1",
  "url": "sec-wfi-wfe.html",
  "type": "Section",
  "number": "15.3",
  "title": "Sleep Mode: WFI and WFE",
  "body": " Sleep Mode: WFI and WFE  The Cortex-M0+ provides two instructions for entering low-power states: WFI (Wait For Interrupt) suspends execution until any enabled interrupt fires, then resumes at the ISR entry point. WFE (Wait For Event) is similar but also wakes on a hardware event signal (e.g., from the event registers), and can return without executing an ISR. For most applications WFI is the right choice: the CPU sleeps between interrupt events and resumes transparently.   WFI and WFE usage. A typical main-loop pattern: initialize peripherals, enable interrupts, then call __WFI() in an infinite loop. After each interrupt the ISR runs, the CPU returns to the loop, and immediately calls WFI again. Average current drops from run-mode levels to sleep-mode levels for the fraction of time the CPU is idle.    int main(void) { \/* Initialize all peripherals and enable interrupts *\/ led_init(); pb4_exti_init(); \/\/ GPIO EXTI wakeup source tim14_500ms_interrupt_init(); \/* Main loop: sleep until an interrupt wakes the CPU *\/ while (1) { __WFI(); \/\/ CPU halts; resumes after ISR returns } } \/* With WFI, all work happens in ISRs: *\/ void TIM14_IRQHandler(void) { TIM14->SR &= ~TIM_SR_UIF; led_toggle(); }   PWR_CR1 register. The LPMS field (bits 2:0) selects the low-power mode entered when the processor executes WFI\/WFE. LPMS = 0b000 selects Sleep; LPMS = 0b001 selects Stop 0; and so on. The SLEEPDEEP bit in the Cortex-M SCB_SCR register must also be set to enter Stop vs. Sleep.     PWR_CR1 bit field detail. For basic Sleep mode set SLEEPDEEP = 0 in SCB->SCR; PWR_CR1 is not needed. For Stop mode set SLEEPDEEP = 1 and configure LPMS before executing WFI. The FLASHPD bit powers down the flash in Stop mode for additional savings at the cost of longer wakeup time.      A sensor interrupt fires at 10 Hz. A firmware team debates two designs: (A) poll the sensor status register in a tight loop; (B) use WFI and read the sensor in an ISR. Which uses less power, and why?   Design B uses less power. With WFI the CPU is clocked off for the ~90 ms between interrupts; in design A the CPU runs at full speed continuously, burning milliamps regardless of whether new data is available.  Correct. Sleep mode reduces CPU current to near zero between events. Polling keeps the CPU fully active at all times.  Design A uses less power because it avoids the overhead of entering and exiting interrupt service routines.  ISR overhead is a few microseconds. At 10 Hz, ISR entry overhead is negligible compared to the ~100 ms idle window where WFI saves power.  Both use the same power because the MCU is still running in both cases.  WFI gates the CPU clock. The MCU is present in both cases but the CPU core consumes much less current when clocked off.     "
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
  "number": "15.3.1",
  "title": "",
  "body": " WFI and WFE usage. A typical main-loop pattern: initialize peripherals, enable interrupts, then call __WFI() in an infinite loop. After each interrupt the ISR runs, the CPU returns to the loop, and immediately calls WFI again. Average current drops from run-mode levels to sleep-mode levels for the fraction of time the CPU is idle.   "
},
{
  "id": "fig-pwr-cr1-1",
  "level": "2",
  "url": "sec-wfi-wfe.html#fig-pwr-cr1-1",
  "type": "Figure",
  "number": "15.3.2",
  "title": "",
  "body": " PWR_CR1 register. The LPMS field (bits 2:0) selects the low-power mode entered when the processor executes WFI\/WFE. LPMS = 0b000 selects Sleep; LPMS = 0b001 selects Stop 0; and so on. The SLEEPDEEP bit in the Cortex-M SCB_SCR register must also be set to enter Stop vs. Sleep.   "
},
{
  "id": "fig-pwr-cr1-2",
  "level": "2",
  "url": "sec-wfi-wfe.html#fig-pwr-cr1-2",
  "type": "Figure",
  "number": "15.3.3",
  "title": "",
  "body": " PWR_CR1 bit field detail. For basic Sleep mode set SLEEPDEEP = 0 in SCB->SCR; PWR_CR1 is not needed. For Stop mode set SLEEPDEEP = 1 and configure LPMS before executing WFI. The FLASHPD bit powers down the flash in Stop mode for additional savings at the cost of longer wakeup time.   "
},
{
  "id": "rq-wfi-vs-polling",
  "level": "2",
  "url": "rq-wfi.html#rq-wfi-vs-polling",
  "type": "Reading Question",
  "number": "15.3.1",
  "title": "",
  "body": " A sensor interrupt fires at 10 Hz. A firmware team debates two designs: (A) poll the sensor status register in a tight loop; (B) use WFI and read the sensor in an ISR. Which uses less power, and why?   Design B uses less power. With WFI the CPU is clocked off for the ~90 ms between interrupts; in design A the CPU runs at full speed continuously, burning milliamps regardless of whether new data is available.  Correct. Sleep mode reduces CPU current to near zero between events. Polling keeps the CPU fully active at all times.  Design A uses less power because it avoids the overhead of entering and exiting interrupt service routines.  ISR overhead is a few microseconds. At 10 Hz, ISR entry overhead is negligible compared to the ~100 ms idle window where WFI saves power.  Both use the same power because the MCU is still running in both cases.  WFI gates the CPU clock. The MCU is present in both cases but the CPU core consumes much less current when clocked off.   "
},
{
  "id": "sec-watchdog",
  "level": "1",
  "url": "sec-watchdog.html",
  "type": "Section",
  "number": "15.4",
  "title": "Independent Watchdog Timer",
  "body": " Independent Watchdog Timer  No matter how carefully firmware is tested, edge cases exist: a hardware fault, a corrupted stack, or an unexpected interrupt can leave the CPU spinning in an infinite loop or stuck waiting for an event that never arrives. The independent watchdog timer (IWDG) detects this condition and forces a system reset. The firmware must periodically \"kick\" (reload) the watchdog counter to prove it is still running correctly. If the firmware fails to kick the watchdog before the counter expires, the IWDG resets the chip.  The IWDG is clocked by the LSI (low-speed internal oscillator, ~32 kHz), which runs even in Stop mode and is independent of the main clock tree — hence the name. This independence means the watchdog can catch a lockup that disables the HSI or PLL.   IWDG block diagram. The 12-bit down counter is loaded from the RLR (reload register) on each kick. It counts down at the LSI frequency divided by the prescaler (PR register). When the counter reaches zero it generates a reset. The KEY register controls writes: writing 0xAAAA kicks the watchdog; writing 0x5555 unlocks the PR and RLR for configuration; writing 0xCCCC starts the watchdog (which cannot be stopped).    \/* IWDG configuration: ~1 second timeout at LSI ~32 kHz *\/ \/* Prescaler \/32 -> 1 kHz; RLR = 999 -> 1000 ms timeout *\/ void iwdg_init(void) { IWDG->KR = 0x5555; \/\/ unlock PR and RLR IWDG->PR = 3; \/\/ prescaler \/32 (LSI\/32 ~= 1 kHz) IWDG->RLR = 999; \/\/ reload value: 1000 ticks = 1 s IWDG->KR = 0xAAAA; \/\/ reload counter (start it running) IWDG->KR = 0xCCCC; \/\/ enable watchdog (cannot be disabled) } \/* Call this periodically (more often than timeout) to prevent reset *\/ void iwdg_kick(void) { IWDG->KR = 0xAAAA; }   Watchdog integration in a main loop. The watchdog is initialized once. The main loop kicks it at the top of every iteration. If the loop stalls (interrupt lockup, runaway pointer, etc.) the kick never executes, the counter expires, and the chip resets. An IWDG reset can be detected after restart by checking the RCC_CSR reset flags.    int main(void) { \/* Optional: detect if we're recovering from a watchdog reset *\/ if (RCC->CSR & RCC_CSR_IWDGRSTF) { RCC->CSR |= RCC_CSR_RMVF; \/\/ clear reset flags \/* Log or signal a watchdog-reset event *\/ } iwdg_init(); \/\/ start watchdog (timeout ~1 s) led_init(); pb4_exti_init(); while (1) { iwdg_kick(); \/\/ prove the loop is still running __WFI(); \/\/ sleep until next interrupt } }   Choose the watchdog timeout to be longer than the longest normal time between kicks, but short enough to detect a lockup before it causes harm. A timeout of 1–5 seconds is common for interactive embedded systems. Do not kick the watchdog inside an ISR: the watchdog tests the main loop, not the interrupt hardware.     Why is the IWDG clocked from the LSI (32 kHz internal RC) rather than from the main HSI\/PLL?   The LSI runs independently of the main clock tree and remains active in Stop mode. A fault that crashes the HSI or PLL will not disable the watchdog.  Correct. The \"independent\" in IWDG refers to clock independence: the watchdog can catch failures that affect the main clock.  The LSI is more accurate than the HSI, making the watchdog timeout more precise.  The opposite is true: the LSI is a low-accuracy RC oscillator (±30% in some conditions). Watchdog timeouts are therefore approximate. The benefit is independence, not precision.  The IWDG requires a lower clock frequency to reduce power consumption.  Power is a secondary benefit. The primary reason for using the LSI is that it runs when the main clocks are stopped or faulted.     Can the IWDG be disabled after IWDG->KR = 0xCCCC is written?   No. Once enabled, the IWDG runs until the next reset. There is no disable bit. This is intentional: a defective firmware should not be able to disable its own watchdog.  Correct. The IWDG is a safety mechanism; hardware prevents software from turning it off.  Yes. Writing 0x0000 to IWDG_KR disables it.  There is no such key value. Only 0x5555, 0xAAAA, and 0xCCCC are valid IWDG key values.  Yes. Clearing bit 0 of IWDG_CR disables it.  The IWDG does not have a CR register with a disable bit. Once started it cannot be stopped in software.     "
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
  "number": "15.4.1",
  "title": "",
  "body": " IWDG block diagram. The 12-bit down counter is loaded from the RLR (reload register) on each kick. It counts down at the LSI frequency divided by the prescaler (PR register). When the counter reaches zero it generates a reset. The KEY register controls writes: writing 0xAAAA kicks the watchdog; writing 0x5555 unlocks the PR and RLR for configuration; writing 0xCCCC starts the watchdog (which cannot be stopped).   "
},
{
  "id": "fig-iwdg-example",
  "level": "2",
  "url": "sec-watchdog.html#fig-iwdg-example",
  "type": "Figure",
  "number": "15.4.2",
  "title": "",
  "body": " Watchdog integration in a main loop. The watchdog is initialized once. The main loop kicks it at the top of every iteration. If the loop stalls (interrupt lockup, runaway pointer, etc.) the kick never executes, the counter expires, and the chip resets. An IWDG reset can be detected after restart by checking the RCC_CSR reset flags.   "
},
{
  "id": "sec-watchdog-8",
  "level": "2",
  "url": "sec-watchdog.html#sec-watchdog-8",
  "type": "Insight",
  "number": "15.4.3",
  "title": "",
  "body": " Choose the watchdog timeout to be longer than the longest normal time between kicks, but short enough to detect a lockup before it causes harm. A timeout of 1–5 seconds is common for interactive embedded systems. Do not kick the watchdog inside an ISR: the watchdog tests the main loop, not the interrupt hardware.  "
},
{
  "id": "rq-iwdg-clock",
  "level": "2",
  "url": "rq-iwdg.html#rq-iwdg-clock",
  "type": "Reading Question",
  "number": "15.4.1",
  "title": "",
  "body": " Why is the IWDG clocked from the LSI (32 kHz internal RC) rather than from the main HSI\/PLL?   The LSI runs independently of the main clock tree and remains active in Stop mode. A fault that crashes the HSI or PLL will not disable the watchdog.  Correct. The \"independent\" in IWDG refers to clock independence: the watchdog can catch failures that affect the main clock.  The LSI is more accurate than the HSI, making the watchdog timeout more precise.  The opposite is true: the LSI is a low-accuracy RC oscillator (±30% in some conditions). Watchdog timeouts are therefore approximate. The benefit is independence, not precision.  The IWDG requires a lower clock frequency to reduce power consumption.  Power is a secondary benefit. The primary reason for using the LSI is that it runs when the main clocks are stopped or faulted.   "
},
{
  "id": "rq-iwdg-stop",
  "level": "2",
  "url": "rq-iwdg.html#rq-iwdg-stop",
  "type": "Reading Question",
  "number": "15.4.2",
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
