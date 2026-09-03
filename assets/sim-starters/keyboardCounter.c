/* keyboardCounter.c
 * ENGS 28 - Day 5, Part 3
 *
 * The counter from Part 1, printing over
 * USART2 into the CoolTerm panel below
 * the editor. Press Run to see it, then
 * click the CoolTerm panel and type.
 *
 * Your job: make the count respond to
 * the keyboard.
 *   u or U increments the count
 *   d or D decrements it
 *   r or R resets it to zero
 * Any other key, or no key at all,
 * leaves the count alone, and the same
 * value prints every 500 ms.
 *
 * Do NOT call uart2_read() here. It
 * blocks until a byte arrives, which
 * would freeze the print loop. Poll the
 * RXNE flag instead and read the byte
 * only when the flag says one is
 * waiting. The commented block below is
 * the shape of it.
 *
 * Watch USART2->ISR in the register
 * panel as you type: bit 5 (RXNE) goes
 * to 1 while a byte is waiting, and
 * reading RDR clears it again.
 *
 * Save your working code. This is the
 * program you submit with Lab 3, and it
 * has to run on the real board.
 */

#include "ES28.h"            // register definitions
#include <stdio.h>           // for printf
#include "uart.h"            // for uart2_init

int main(void) {
    int count = 0;

    uart2_init();            // once, before any printf
    printf("Keyboard-controlled counter\r\n");

    while (1) {

        /* if (USART2->ISR & USART_ISR_RXNE_RXFNE) {
         *     char key = ...;   // read it from the right register
         *     // act on the key here
         * }
         */

        printf("count = %d\r\n", count);
        delay_ms(500);
    }
    return 0;                // never reached
}
