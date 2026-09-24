/* toggleLEDfsm.c
 * ENGS 28 - Day 4 in-class
 *
 * Below is the button toggle written as
 * a state machine, with typedef enum and
 * switch, as earlier in this chapter,
 * using the names from toggleLED.c.
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

#include "ES28.h"            // All the port definitions are here

#define GPIOAEN        (1U<<0)    // Clock access to GPIOA (LED)
#define GPIOBEN        (1U<<1)    // Clock access to GPIOB (button)

#define LED_PIN        (1U<<5)    // LED on PA5     (D13)
#define BUTTON_PIN     (1U<<4)    // Button on PB4 (D5)

typedef enum {UNPRESSED, PRESSED} state_t;

int main(void) {
    state_t state = UNPRESSED;
    unsigned buttonPushed;
    RCC->IOPENR |= (GPIOAEN | GPIOBEN); // Enable clock access

    GPIOA->MODER |= (1U<<10);    // Configure PA5 as output pin
    GPIOA->MODER &= ~(1U<<11);

    GPIOB->MODER &= ~(1U<<8);    // Configure PB4 as input pin
    GPIOB->MODER &= ~(1U<<9);    // (not necessary since this is default reset value)

    GPIOB->PUPDR |= (1U<<8);     // enable pull-up for PB4
    GPIOB->PUPDR &= ~(1U<<9);

    while(1) {
        buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0);
        switch(state) {
            case UNPRESSED:
                if (buttonPushed) {
                    GPIOA->ODR ^= LED_PIN;
                    state = PRESSED;
                }
                break;
            case PRESSED:
                if (!buttonPushed) {
                    state = UNPRESSED;
                }
                break;
        }
    }
    return 0;                    // never reached
}
