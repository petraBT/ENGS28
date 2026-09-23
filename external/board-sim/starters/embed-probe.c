/* embed-probe.c -- a fixture for scripts/check-ui.mjs, not course material.
 *
 * Its file name deliberately matches no entry in the examples dropdown, so
 * loading it with ?src= exercises the path where the dropdown has to name the
 * loaded FILE rather than an example. blinky.c cannot test that: it matches
 * the Day 1 entry, so naming "Day 1 — Blinky" is correct for it and
 * indistinguishable from the bug.
 */
#include "ES28.h"
int main(void) {
    RCC->IOPENR |= RCC_IOPENR_GPIOAEN;
    GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk;
    GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);
    while (1) { GPIOA->ODR ^= (1U<<5); delay_ms(500); }
    return 0;
}
