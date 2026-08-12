/*
 * writeFirstDigit.c -- put one character on one digit of the display
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 10 in-class -- writeFirstDigit
 * Collaborators:
 *
 * I/O pins
 * --------
 *   PB8  (header D15)  I2C1_SCL      configured by i2c1_init()
 *   PB9  (header D14)  I2C1_SDA      configured by i2c1_init()
 *
 * Circuit
 * -------
 *   The display backpack's four wires, unchanged from Day 9x: + to the
 *   Nucleo's 3.3 V pin, - to GND, D to PB9 (SDA), C to PB8 (SCL).  The
 *   pull-ups are on the backpack.
 *
 * What this program does
 * ----------------------
 *   Initializes the display, then writes one byte into one address of the
 *   HT16K33's display RAM, over and over.  That byte is one digit's worth of
 *   segments, so what you see is a single character on a single digit.
 *
 *   Before this will do anything you have to fill in SevenSeg_init() in
 *   SevenSegPartial.c.  Until the HT16K33's oscillator has been turned on it
 *   accepts everything you send it and drives nothing at all -- which looks
 *   exactly like a display that is not plugged in.
 *
 * The three arguments that matter
 * -------------------------------
 *   i2c1_memWrite(display_addr, display_subaddr, 1, &digit_data) says:
 *
 *     display_addr     WHO   -- which device on the bus (the backpack, 0x70)
 *     display_subaddr  WHERE -- which address inside its display RAM
 *     1                HOW MANY bytes follow
 *     &digit_data      and where to get them
 *
 *   The display RAM holds two bytes per digit and we only use the first of
 *   each pair, so the digits live at even addresses: 0, 2, 4, 6, 8.  Address
 *   4 is the colon, not a digit.
 *
 * The segment byte
 * ----------------
 *   Bit 0 is segment a, bit 1 is b, and so on up to bit 6 for g, with bit 7
 *   the decimal point -- so a byte written as a binary literal reads
 *   .g f e d c b a from the left.  0b01111001 sets bits 0, 3, 4, 5 and 6:
 *   segments a, d, e, f and g, which is an E.
 *
 * Things to try
 * -------------
 *   - Move the character: change display_subaddr to 2, then 6, then 8.
 *   - Change the character: work out the byte for S, for 2, and for 8 from
 *     the segment map rather than guessing.
 *   - Set display_subaddr to 1 and predict what happens before you flash it.
 *
 * Revision history
 * ----------------
 *   Written for ENGS 28.
 */

#include "ES28.h"
#include "i2c.h"
#include "SevenSegPartial.h"
int main(void) {
    uint8_t display_addr = HT16K33_ADDR;
    uint8_t display_subaddr = 0;       // 0, 2, 4, 6, 8 - depending on the digit
    uint8_t digit_data = 0b01111001;   // 'E'
    i2c1_init();
    SevenSeg_init();

    while(1) {
        i2c1_memWrite(display_addr, display_subaddr, 1, &digit_data);
        delay_ms(250);
    }
    return 1;
}
