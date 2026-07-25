/* blinkySlowToFast.c
 * ENGS 28 - homework before Day 1X
 *
 * Below is blinky.c exactly as you saw it
 * in class: the LED blinks at one fixed
 * rate, set by the bound of the delay
 * loop (100000).
 *
 * Your job: make the LED start slow,
 * speed up blink by blink, then reset to
 * slow and repeat. Design the logic first
 * (what varies, and how does the program
 * know it has reached "fast"?), then edit
 * the code below. Give the starting
 * delay, the ending delay, and the step
 * size descriptive names with #define,
 * the way GPIOAEN and LED_PIN are named.
 *
 * Run blinks the simulated LED; Step
 * walks the program one line at a time so
 * you can watch MODER and ODR change.
 * Save your working code - in Day 1X you
 * will port it to the real Nucleo.
 *
 * Drag the divider to widen this editor.
 */

#include "stm32C0xx.h"          // all register definitions live here
#define GPIOAEN  (1U << 0)      // RCC->IOPENR bit 0: clock for GPIOA
#define LED_PIN  (1U << 5)      // GPIOA bit 5: the on-board LED

int main(void) {
    RCC->IOPENR  |= GPIOAEN;     // Step 1: enable GPIOA clock
    GPIOA->MODER |= (1U << 10);  // Step 2a: set   bit 10
    GPIOA->MODER &= ~(1U << 11); // Step 2b: clear bit 11 -> PA5 output

    while (1) {
        GPIOA->ODR |= LED_PIN;   // Step 3: bit 5 = 1 -> LED on
        for (int i = 0; i < 100000; i++);
        GPIOA->ODR &= ~LED_PIN;  // Step 4: bit 5 = 0 -> LED off
        for (int i = 0; i < 100000; i++);
    }
    return 0;                    // never reached
}
