/*
 * blinkyTimerPolled.c -- blink the on-board LED from a polled TIM14 flag
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 8 in-class -- blinkyTimerPolled (given, complete)
 * Collaborators:
 *
 * I/O pins
 * --------
 *   PA5  (header D13)  digital out  on-board green LED (LD2)
 *
 * Circuit
 * -------
 *   None.  The LED is already on the Nucleo board; nothing is wired today.
 *
 * What this program does
 * ----------------------
 *   TIM14 is configured once to count off 500 ms periods, then left alone.
 *   The main loop CHECKS the update flag (UIF) once per pass -- note the
 *   `if`, not the blocking `while` you used for the UART and the ADC -- and
 *   toggles the LED whenever a period has elapsed.  The rest of the loop is
 *   free for other work.
 *
 * Nothing to fill in here: run it as given, then confirm the LED blinks
 * about once per second (500 ms on, 500 ms off).
 *
 * Revision history
 * ----------------
 *   <date>   <your initials>   ran as given
 */

#include <stdio.h>
#include "ES28.h"

#define LED (1U<<5)        // blinking the on-board LED

/* Clock runs at 12 MHz */
/* Need to prescale by 12000 to have counting to 500 take 0.5 second */
#define PSC_FACTOR 12000   // 12 MHz / 12000 = 1 kHz
#define ARR_FACTOR 500     // 1 kHz / 500 = 2 Hz -> toggle every 500 ms

void tim14_500ms_init();

int main(void) {
    // Enable clock access to GPIOA
    RCC->IOPENR |= RCC_IOPENR_GPIOAEN;

    // Set PA5 as output pin and initialize the LED
    GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk;
    GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);

    GPIOA->ODR &= ~(LED);              // LED is off

    tim14_500ms_init();                // Initialize 500 ms timer

    // The timer now runs on its own.  Each pass of this loop asks once
    // whether a period has elapsed, and gets on with everything else.
    while (1) {
        if (TIM14->SR & TIM_SR_UIF) {  // did a period elapse?
            // Clear UIF in status register.  UIF is rc_w0: writing a 0
            // clears it, writing a 1 has no effect -- so the mask carries
            // a 0 at UIF and harmless 1s everywhere else.
            TIM14->SR = ~TIM_SR_UIF;
            GPIOA->ODR ^= LED;         // toggle LED
        }
        // Could do other stuff here, like poll a button.
    }
    return 1;
}

void tim14_500ms_init() {
    // enable clock access to timer 14 (on APB bus)
    RCC->APBENR2 |= RCC_APBENR2_TIM14EN;

    // Set prescaler value
    TIM14->PSC = PSC_FACTOR - 1;       // starts counting at 0

    // Set auto-reload value
    TIM14->ARR = ARR_FACTOR - 1;       // counts 0 .. ARR inclusive

    // Clear counter (don't start a period from a leftover value)
    TIM14->CNT = 0;

    // Enable timer -- from here on it counts with no help from the CPU
    TIM14->CR1 |= TIM_CR1_CEN;
}
