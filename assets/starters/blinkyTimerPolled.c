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
#define LED (1U<<5)        // on-board LED
#define PSC_FACTOR 12000   // 12 MHz / 12000 = 1 kHz
#define ARR_FACTOR 500     // 1 kHz / 500 = 2 Hz -> toggle every 500 ms

void tim14_500ms_init();

int main(void) {
    RCC->IOPENR |= RCC_IOPENR_GPIOAEN;
    GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk;
    GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);
    GPIOA->ODR &= ~(LED);              // LED starts off

    tim14_500ms_init();
    while (1) {
        if (TIM14->SR & TIM_SR_UIF) {  // did a period elapse?
            // Clear UIF in status register
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
    TIM14->ARR = ARR_FACTOR - 1;
    // Clear counter
    TIM14->CNT = 0;
    // Enable timer
    TIM14->CR1 |= TIM_CR1_CEN;
}
