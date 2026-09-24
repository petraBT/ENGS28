/* toggleLEDfsm.c
 * ENGS 28 - Day 4 in-class
 *
 * Below is the button toggle written as
 * a state machine, with typedef enum and
 * switch, exactly as printed earlier in
 * this chapter.
 *
 * Attach the button first: click
 * + Button in the component bay, then
 * click header pin D5 (PB4). Each press
 * toggles the on-board LED on PA5.
 *
 * For the counter, attach three LEDs the
 * way you wired them in Lab 1: click
 * + LED and then header pin D13 (PA5),
 * and do the same for D12 (PA6) and D11
 * (PA7). The on-board LED is also on
 * PA5, so it lights together with the
 * first.
 *
 * Your job: use the button to pause and
 * resume a counter. Begin with the
 * counting code from your own
 * blinkyCNT.c, and adapt the toggle
 * state machine below, following the
 * state diagram you drew. Test it with a
 * quick tap as well as a press held
 * down.
 *
 * The debouncing capacitor across the
 * switch is not modeled, so nothing here
 * bounces, and there is no oscilloscope.
 * Checking that the LED transitions are
 * clean with and without the capacitor
 * needs your Nucleo and the AD2.
 */

#include "ES28.h"

typedef enum { UNPRESSED, PRESSED } state_t;

int main(void) {
    // --- GPIO setup (GPIOA: LED on PA5; GPIOB: button on PB4) ---
    RCC->IOPENR |= (1U << 0) | (1U << 1);  // enable GPIOA and GPIOB clocks
    GPIOA->MODER &= ~(3U << 10);            // PA5 input (clear)
    GPIOA->MODER |=  (1U << 10);            // PA5 output
    GPIOB->MODER &= ~(3U << 8);             // PB4 input (pins reset to analog)
    GPIOB->PUPDR |=  (1U << 8);             // PB4 pull-up bit [9:8] = 01
    GPIOB->PUPDR &= ~(1U << 9);

    state_t state = UNPRESSED;

    while (1) {
        int btn = !(GPIOB->IDR & (1U << 4)); // 1 if pressed (active-low)

        switch (state) {
            case UNPRESSED:
                if (btn) {
                    GPIOA->ODR ^= (1U << 5); // toggle LED on press
                    state = PRESSED;
                }
                break;
            case PRESSED:
                if (!btn) {
                    state = UNPRESSED;        // wait for release
                }
                break;
        }
    }
    return 0;
}
