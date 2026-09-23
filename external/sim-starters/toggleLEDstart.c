/* toggleLEDstart.c
 * ENGS 28 - homework after Day 3
 *
 * Attach the button first: click
 * + Button in the component bay, then
 * click header pin D5. The simulated
 * button is active-low and uses the
 * internal pull-up you enable below,
 * exactly like the one on your
 * breadboard.
 *
 * Below is button.c as you ran it in
 * class. The LED follows the button: ON
 * while the button is held, OFF when you
 * let go.
 *
 * Your job: make the LED TOGGLE. The
 * first press turns it on, the second
 * press turns it off, and so on, with
 * the LED staying put between presses.
 *
 * Try the obvious change first, flipping
 * the LED whenever the pin reads 0, and
 * watch what happens. The loop reads the
 * pin thousands of times per press, so
 * the LED flips on every pass while your
 * finger is down. Deciding what "one
 * press" means is the whole exercise.
 * Watch IDR in the register panel while
 * you hold the button.
 *
 * Bring your observations to Day 4. The
 * real board adds one effect the
 * simulator does not have: contact
 * bounce.
 */

#include "ES28.h"

#define GPIOAEN     (1U << 0)   // RCC->IOPENR bit 0: clock for GPIOA
#define GPIOBEN     (1U << 1)   // RCC->IOPENR bit 1: clock for GPIOB
#define LED_PIN     (1U << 5)   // PA5 = D13, the on-board LED
#define BUTTON_PIN  (1U << 4)   // PB4 = D5, the button

int main(void) {
    RCC->IOPENR |= (GPIOAEN | GPIOBEN);

    GPIOA->MODER |= (1U << 10);           // PA5 output
    GPIOA->MODER &= ~(1U << 11);

    GPIOB->MODER &= ~(3U << 8);           // PB4 input
    GPIOB->PUPDR |= (1U << 8);            // PB4 pull-up: reads 1 released,
    GPIOB->PUPDR &= ~(1U << 9);           //   0 pressed (active-low)
    delay_ms(50);                         // let the pull-up pull the pin HIGH

    while (1) {
        if ((GPIOB->IDR & BUTTON_PIN) == 0)  // 0 = pressed
            GPIOA->ODR |= LED_PIN;           // LED on
        else
            GPIOA->ODR &= ~LED_PIN;          // LED off
    }
    return 0;                             // never reached
}
