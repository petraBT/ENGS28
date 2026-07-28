/* blinky.c — known-good copy for the Day 7x debugger walkthrough.
 *
 * ENGS 28, Thayer School of Engineering, Dartmouth College.
 *
 * If your own Blinky project will not build, replace the contents of its
 * main.c with this file (Src/main.c in the project you made on Day 1).
 * It is the same program the book walks through in the Blinky chapter.
 * If the project itself will not build even with this file, put a hand up.
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
