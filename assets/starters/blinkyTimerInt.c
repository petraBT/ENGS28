/*
 * blinkyTimerInt.c -- blink the on-board LED from a TIM14 update interrupt
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 8 in-class -- blinkyTimerInt
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
 *   TIM14 counts on its own and raises an interrupt every 500 ms.  The ISR
 *   clears the timer's update flag and sets a shared flag; main() sees that
 *   flag and toggles the LED.  Note what is NOT here: no delay_ms(), and no
 *   timer register anywhere inside the while(1) loop.
 *
 * Build note
 * ----------
 *   Two main() functions cannot coexist in one build.  Right-click
 *   blinkyTimerPolled.c -> Resource Configurations -> Exclude from Build,
 *   Select All, OK -- and make sure this file is NOT excluded.
 *
 * Revision history
 * ----------------
 *   <date>   <your initials>   filled in TODOs 1-4
 *
 * -----------------------------------------------------------------------------
 * Four blanks to fill in.  Everything you need was in Parts 5 and 6:
 *
 *   TODO 1   raise an interrupt per update      TIM14->DIER
 *   TODO 2   let it through the controller      NVIC_EnableIRQ( ... )
 *   TODO 3   the handler itself                 exact name from the startup file
 *   TODO 4   the shared flag                    one keyword matters
 *
 * The five initialization lines are the ones you already ran in
 * blinkyTimerPolled.c; they are given.  So are the __disable_irq() /
 * __enable_irq() brackets.
 * -----------------------------------------------------------------------------
 */

#include <stdio.h>
#include "ES28.h"
#define LED (1U<<5)        // on-board LED
#define PSC_FACTOR 12000   // 12 MHz / 12000 = 1 kHz
#define ARR_FACTOR 500     // 1 kHz / 500 = 2 Hz

void tim14_500ms_interrupt_init();

// TODO 4a -- declare the flag the ISR will share with main.
//            Which keyword must the declaration carry, and why?


int main(void) {
    RCC->IOPENR |= RCC_IOPENR_GPIOAEN;
    GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk;
    GPIOA->MODER |= (GPIO_OUTPUT << GPIO_MODER_MODE5_Pos);
    GPIOA->ODR &= ~(LED);          // LED starts off

    // TODO 4b -- initialize the flag ...

    tim14_500ms_interrupt_init();

    while (1) {
        // TODO 4c -- when the flag is set: clear it, toggle the LED.
        //            The timer registers appear NOWHERE in this loop.

    }
}

void tim14_500ms_interrupt_init() {
    __disable_irq();               // given: no interrupts during setup
    RCC->APBENR2 |= RCC_APBENR2_TIM14EN;
    TIM14->PSC = PSC_FACTOR - 1;
    TIM14->ARR = ARR_FACTOR - 1;
    TIM14->CNT = 0;

    // TODO 1 -- enable the update interrupt in the timer itself


    // TODO 2 -- enable TIM14's line in the NVIC


    TIM14->CR1 |= TIM_CR1_CEN;
    __enable_irq();                // given: setup done, interrupts on
}

// TODO 3 -- write the ISR.  Its name must be EXACTLY the handler name from
//           the vector table lookup -- copy it from the startup file, don't
//           type it from memory.  No arguments, no return value.  Inside,
//           bracketed by __disable_irq(); ... __enable_irq(); do only two
//           things: clear UIF the Part 5 way (TIM14->SR = ~TIM_SR_UIF;),
//           and set the flag.
