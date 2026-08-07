/*
 * helloDisplay.c -- put four characters on the display, over two wires
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 9x in-class -- helloDisplay
 * Collaborators:
 *
 * I/O pins
 * --------
 *   PB8  (header D15)  I2C1_SCL, alternate function 6, open-drain
 *   PB9  (header D14)  I2C1_SDA, alternate function 6, open-drain
 *
 *   Both are configured by i2c1_init(); this program never touches a GPIO
 *   register itself.
 *
 * Circuit
 * -------
 *   The four-digit display's backpack, four wires:
 *
 *     +  ->  the Nucleo's 3.3 V pin      (NOT 5 V -- the backpack's pull-up
 *     -  ->  GND                          resistors tie SDA and SCL to
 *     D  ->  PB9  (SDA)                   whatever you feed the + pin, and
 *     C  ->  PB8  (SCL)                   this bus sits at 3.3 V throughout)
 *
 *   The backpack carries its own pull-up resistors on SDA and SCL, so no
 *   external resistors are needed.  Both lines idle HIGH because of them.
 *
 * What this program does
 * ----------------------
 *   Three one-byte commands wake the display up, one ten-byte write fills its
 *   display RAM, and then the loop keeps a short transaction going on the bus
 *   so that there is something for an oscilloscope to trigger on.
 *
 *   The three commands come from the HT16K33's datasheet, pages 24-25.  Each
 *   is one byte: the top bits identify the command and the bottom bits are
 *   its options.  In class on Thursday you work them out from the table; here
 *   they are given, so that the display lights up before you have read a
 *   single datasheet page.
 *
 *     system setup    0b0010 X X X S      S = 1 turns the oscillator on
 *     display setup   0b1000 X B1 B0 D    D = 1 is display on;
 *                                         B1 B0 = 00 steady
 *     dimming set     0b1110 P3 P2 P1 P0  duty cycle in sixteenths
 *
 *   Until the oscillator is running the HT16K33 accepts everything you send
 *   it and drives nothing at all, which looks exactly like a display that is
 *   not plugged in.  That is why the system-setup command goes first.
 *
 * The display buffer
 * ------------------
 *   Ten bytes: two for each of the four digits and two for the colon between
 *   the middle pair.  The first byte of each pair is the segments -- bit 0 is
 *   segment a, bit 1 is b, on up to bit 6 for g, and bit 7 is the decimal
 *   point -- so a byte written as a binary literal reads .g f e d c b a from
 *   the left.  The second byte of each pair is 0 for a seven-segment digit,
 *   and Thursday explains why it still has to be sent.
 *
 * The loop
 * --------
 *   The display is already showing what it is going to show; the loop just
 *   keeps something on the bus to look at.  I2C has no way to address a
 *   device without also sending it something, so the shortest thing you can
 *   put on the wire is a one-byte write, and the value does not matter here.
 *   Once every 250 ms, so four transactions a second -- slow enough that a
 *   single sweep on the oscilloscope catches exactly one.
 *
 * Things to try
 * -------------
 *   - Change a segment byte and work out, from the bit numbering above, what
 *     character you will get before you flash it.
 *   - Move a character to a different digit: the digits are buffer entries
 *     0, 2, 6 and 8, and entry 4 is the colon.
 *   - Set bit 7 of a digit's byte and see where the decimal point lands.
 *
 * Revision history
 * ----------------
 *   Written for ENGS 28.
 */

#include "ES28.h"
#include "i2c.h"

#define HT16K33_ADDR         0x70   // I2C address of our backpack controller
#define HT16K33_SYSTEM_CMD   0x20   // system setup
#define HT16K33_OSC_ON       0x01
#define HT16K33_DISPLAY_CMD  0x80   // display setup
#define HT16K33_DISPLAY_ON   0x01
#define HT16K33_BLINK_OFF    0x00
#define HT16K33_BRIGHT_CMD   0xE0   // brightness, ORed with 0 to 15
#define HT16K33_ADDR_PTR     0x00   // display RAM address pointer

int main(void) {
    uint8_t data = 0b0;   // The hardware requires us to send some data, not important here.
    uint8_t display_buffer[10] = {
        0b01110110, 0x00,       // H
        0b00111111, 0x00,       // O
        0x00,       0x00,       // the colon, both dots off
        0b00111000, 0x00,       // L
        0b01110111, 0x00        // A
    };
    i2c1_init();
    // Wake the display up, then fill its display RAM
    i2c1_byteWrite(HT16K33_ADDR, HT16K33_SYSTEM_CMD | HT16K33_OSC_ON);
    i2c1_byteWrite(HT16K33_ADDR, HT16K33_DISPLAY_CMD | HT16K33_DISPLAY_ON | HT16K33_BLINK_OFF);
    i2c1_byteWrite(HT16K33_ADDR, HT16K33_BRIGHT_CMD | 0x7);
    i2c1_memWrite(HT16K33_ADDR, HT16K33_ADDR_PTR, 10, display_buffer);

    // Keep one short transaction on the wire for the oscilloscope
    while(1) {
        i2c1_byteWrite(HT16K33_ADDR, data);
        delay_ms(250);
    }
    return 1;
}
