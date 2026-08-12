/*
 * counterResetButtonPolled.c -- a counter whose reset button is polled
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 9 in-class -- counterResetButtonPolled
 * Collaborators:
 *
 * I/O pins
 * --------
 *   PB4  (header D5)   digital in   pushbutton, active LOW, internal pull-up
 *   PA2/PA3            USART2       serial output to Coolterm, via the ST-LINK
 *
 * Circuit
 * -------
 *   The button from Day 3: one side of the pushbutton to PB4, the other to
 *   GND, with the debouncing capacitor added on Day 3x across the switch.  No
 *   external pull-up resistor -- PUPDR turns on the one inside the chip.
 *
 * What this program does
 * ----------------------
 *   Prints a counter once a second, and resets it when it finds the button
 *   held down.  It also rolls over at MAXCOUNT.
 *
 *   Run it and try two things: a short tap, and a press-and-hold.  The hold
 *   works every time.  The tap works only if you happen to still be holding
 *   the button at the one instant per second when the loop reads the pin --
 *   the program spends the other 999-and-a-bit milliseconds inside
 *   delay_ms(), not looking.  That is what we fix today.
 *
 * Reading the button
 * ------------------
 *   The internal pull-up holds PB4 HIGH while the button is open, and
 *   pressing it connects the pin to GND.  So "pressed" is the pin reading
 *   LOW, which is why the test below compares IDR's bit 4 against 0 rather
 *   than against 1.  This is the Day 3 idiom, unchanged.
 *
 * Revision history
 * ----------------
 *   <date>   <your initials>   ran as given
 *
 * -----------------------------------------------------------------------------
 * Nothing to fill in.  This program is complete, and it is here so that you
 * can watch it fail before you fix it.
 * -----------------------------------------------------------------------------
 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"

#define WAIT        1000000
#define MAXCOUNT    100
#define BUTTON_PIN  (1U<<4)   // Button on PB4

int main(void) {
    int counter = 0;
    int buttonPushed;

    uart2_init();                                          // initialize UART

    // Enable clock access to GPIOB, then configure PB4 as an input with
    // the internal pull-up enabled -- exactly as on Day 3.
    RCC->IOPENR |= RCC_IOPENR_GPIOBEN;                     // enable clock

    GPIOB->MODER &= ~GPIO_MODER_MODE4_Msk;
    GPIOB->MODER |= (GPIO_INPUT << GPIO_MODER_MODE4_Pos);  // input mode

    GPIOB->PUPDR &= ~GPIO_PUPDR_PUPD4_Msk;
    GPIOB->PUPDR |= (GPIO_PULLUP << GPIO_PUPDR_PUPD4_Pos); // pullup

    while(1) {
        printf("%x\t%d\r\n", counter, counter);
        delay_ms(1000);                                    // kill time
        buttonPushed = ((GPIOB->IDR & BUTTON_PIN) == 0);   // Poll (1 => pressed)
        if ( (buttonPushed) || (counter == MAXCOUNT) ) {
            counter = 0;                                   // Reset the counter
        } else {
            counter++;
        }
    }
    return 1;
}
