/* macrosRewrite.c
 * ENGS 28 - Day 6 in-class
 *
 * Below is the code from the activity
 * "Rewriting with Macros", unchanged,
 * inside a main() so that it runs. It
 * configures PB5 as an output and
 * drives it high, all with raw
 * constants.
 *
 * Attach an LED first: click + LED in
 * the component bay, then click header
 * pin D6 (PB5). Run the program and
 * write down the values of RCC->IOPENR,
 * GPIOB->MODER and GPIOB->ODR in the
 * register panel.
 *
 * Your job: replace the raw constants
 * with CMSIS macros, as the activity's
 * three tasks ask, then run the program
 * again. If your rewrite is right, the
 * LED lights and all three registers
 * hold the same values as before.
 *
 * Matching values show that the bits
 * are right. Check the names as well:
 * GPIO_PUPDR_PUPD5_Pos is 10, the same
 * as GPIO_MODER_MODE5_Pos, so make sure
 * each name belongs to the register it
 * is written to.
 */

#include "ES28.h"

int main(void) {
    // Enable GPIOB clock
    RCC->IOPENR |= (1U << 1);

    // Set PB5 to output mode
    GPIOB->MODER &= ~(1U << 11);  // clear bit 11 of the MODE5 field
    GPIOB->MODER &= ~(1U << 10);  // clear bit 10 of the MODE5 field
    GPIOB->MODER |=  (1U << 10);  // set bit 10 (output mode = 0b01)

    // Drive PB5 high
    GPIOB->ODR |= (1U << 5);

    while (1) {
    }
    return 1;
}
