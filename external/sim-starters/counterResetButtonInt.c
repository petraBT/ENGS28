/* counterResetButtonInt.c
 * ENGS 28 - Day 9 in-class
 *
 * The same counter as
 * counterResetButtonPolled.c, but the
 * button is no longer read in the loop.
 * A falling edge on PB4 raises an
 * interrupt; the handler records the
 * press in a shared flag, and main()
 * acts on it next time round.
 *
 * Click + Button in the component bay,
 * the parts list to the right of the
 * board, then header pin D5, which is
 * PB4, and hold it down to press it.
 * The internal pull-up holds PB4 HIGH
 * while the button is open, and pressing
 * it connects the pin to GND. A press is
 * therefore a falling edge, which is the
 * edge this program asks for. The
 * debouncing capacitor across the switch
 * is not modeled, so nothing here
 * bounces.
 *
 * The point of the exercise is what
 * disappears: GPIOB->IDR is not read
 * anywhere in main(), and a press during
 * the one-second delay is still noticed.
 *
 * Three blocks to fill in:
 *
 *   TODO 1  the four EXTI/NVIC switches
 *   TODO 2  the handler, exact name
 *   TODO 3  the shared flag
 *
 * All four switches are in the register
 * panel: EXTI->EXTICR[1], EXTI->FTSR1,
 * EXTI->IMR1 and NVIC->ISER, beside
 * EXTI->FPR1. A switch you left out
 * shows up as a register still holding
 * its reset value, and EXTI->IMR1 resets
 * to 0xFFF8 0000, so look at bit 4
 * rather than at the whole word.
 *
 * As given, this file does not compile:
 * the test in TODO 3c is empty. That is
 * the first thing to fill in.
 *
 * Two words of caution. This simulator
 * does not optimize your code, so a flag
 * shared between the ISR (interrupt
 * service routine) and main() runs here
 * whether or not its declaration carries
 * volatile. TODO 3 asks which keyword
 * that declaration must carry, and a
 * working counter in this window is not
 * evidence that you have it right.
 *
 * And an interrupt here is taken between
 * two C statements, never part way
 * through one. The half-finished
 * read-modify-write that Part 7 is about
 * cannot happen in this window, so that
 * one has to be reasoned about rather
 * than tried.
 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"

#define MAXCOUNT  100

void pb4_exti_init(void);

// TODO 3a -- declare the flag the ISR shares with main.


int main(void) {
    int counter = 0;

    uart2_init();
    printf("Hex \tDecimal\r\n");

    pb4_exti_init();

    // TODO 3b -- initialize the flag ...

    while(1) {
        printf("%x\t%d\r\n", counter, counter);
        delay_ms(1000);

        // TODO 3c -- fill in the test: when the flag is set, reset the counter
        //            and clear the flag.  One chain, so a press does not reset
        //            and then immediately increment.
        //            GPIOB->IDR appears NOWHERE in this loop.
        if ( /* TODO 3c */ ) {

        } else if (counter == MAXCOUNT) {
            counter = 0;
        } else {
            counter++;
        }
    }
    return 0;
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
