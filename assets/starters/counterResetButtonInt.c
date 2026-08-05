/*
 * counterResetButtonInt.c -- reset a counter from a PB4 falling-edge interrupt
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 9 in-class -- counterResetButtonInt
 * Collaborators:
 *
 * I/O pins
 * --------
 *   PB4  (header D5)   digital in   pushbutton, active LOW, internal pull-up
 *   PA2/PA3            USART2       serial output to Coolterm, via the ST-LINK
 *
 * Circuit
 * -------
 *   Unchanged from counterResetButtonPolled.c: the Day 3 button on PB4 with
 *   its debouncing capacitor.  Nothing new is wired today.
 *
 * What this program does
 * ----------------------
 *   The same counter, but the button is no longer read in the loop.  A
 *   falling edge on PB4 -- which is what a press looks like, since the
 *   pull-up holds the pin HIGH until the button connects it to GND --
 *   raises an interrupt.  The handler records the press in a shared flag;
 *   main() acts on it the next time round.
 *
 *   The point of the exercise is what disappears: GPIOB->IDR is not read
 *   anywhere in main(), and a press during the one-second delay is still
 *   noticed.
 *
 * Build note
 * ----------
 *   Two main() functions cannot coexist in one build.  Right-click
 *   counterResetButtonPolled.c -> Resource Configurations -> Exclude from
 *   Build, Select All, OK -- and make sure this file is NOT excluded.
 *
 * Revision history
 * ----------------
 *   <date>   <your initials>   filled in TODOs 1-3
 *
 * -----------------------------------------------------------------------------
 * Three blanks to fill in.  Everything you need was in Parts 4 and 5:
 *
 *   TODO 1   the four EXTI/NVIC switches      port, edge, mask, NVIC
 *   TODO 2   the handler itself               exact name from Table 40
 *   TODO 3   the shared flag                  one keyword matters
 *
 * The pin configuration at the top of pb4_exti_init() is the Day 3 code you
 * already ran; it is given.  So are the __disable_irq() / __enable_irq()
 * brackets around the setup.
 *
 * Names you will want, all from the device header except EXTI_PB, which is
 * in ES28.h:
 *
 *   EXTI_EXTICR2_EXTI4_Msk   EXTI_EXTICR2_EXTI4_Pos   EXTI_PB
 *   EXTI_FTSR1_FT4           EXTI_IMR1_IM4            EXTI4_15_IRQn
 *   EXTI_FPR1_FPIF4
 *
 * One trap worth stating twice: the reference manual numbers the four
 * selection registers EXTI_EXTICR1 through EXTI_EXTICR4, and C numbers array
 * elements from 0.  EXTI_EXTICR2 is EXTI->EXTICR[1].
 * -----------------------------------------------------------------------------
 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"

#define MAXCOUNT  100

void pb4_exti_init(void);

// TODO 3a -- declare the flag the ISR shares with main.
//            Which keyword must the declaration carry, and why?


int main(void) {
    int counter = 0;

    uart2_init();
    printf("Hex \tDecimal\r\n");

    pb4_exti_init();

    // TODO 3b -- initialize the flag ...

    while(1) {
        printf("%x\t%d\r\n", counter, counter);
        delay_ms(1000);

        // TODO 3c -- when the flag is set: reset the counter and clear the flag.
        //            GPIOB->IDR appears NOWHERE in this loop.

        if (counter == MAXCOUNT) {
            counter = 0;
        } else {
            counter++;
        }
    }
    return 1;
}

void pb4_exti_init(void) {
    // Disable global interrupts while the EXTI is half-configured
    __disable_irq();                        // given: no interrupts during setup

    // Enable clock access to GPIOB, then PB4 as an input with a pull-up.
    // This is the Day 3 configuration, unchanged.
    RCC->IOPENR |= RCC_IOPENR_GPIOBEN;      // given: the Day 3 pin configuration
    GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk;
    GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos);
    GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk;
    GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos);

    // TODO 1a -- select port B on line EXTI4.  Two lines: clear the field,
    //            then set it.  Mind the array index.


    // TODO 1b -- falling edge on line EXTI4


    // TODO 1c -- unmask line EXTI4


    // TODO 1d -- enable the line in the NVIC


    // Setup done: allow interrupts again
    __enable_irq();                         // given: setup done, interrupts on
}

// TODO 2 -- write the ISR.  Its name comes from Table 40's acronym for the row
//           covering lines 4 to 15; copy it from the startup file rather than
//           typing it.  No arguments, no return value.  Inside, bracketed by
//           __disable_irq(); ... __enable_irq(); do three things: check that
//           the event was on line 4, clear that pending bit, set your flag.
