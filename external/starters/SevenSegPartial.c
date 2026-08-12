/*
 * SevenSegPartial.c -- the device driver for the HT16K33 four-digit display
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 10 in-class -- the seven-segment device driver
 * Collaborators:
 *
 * What this file is
 * -----------------
 *   A device driver: the layer between your program and one particular
 *   device.  It knows about the HT16K33's commands and its display RAM, and
 *   it knows nothing about how bytes reach the chip.  The rule that makes it
 *   a device driver rather than just some functions is that it talks to the
 *   hardware ONLY through the i2c library -- i2c1_byteWrite() and
 *   i2c1_memWrite().  No I2C1-> anything appears anywhere below, and none
 *   should be added.
 *
 *   Finish it, rename both files to SevenSeg.c and SevenSeg.h, and put them
 *   in your mylib folder.  Lab 5 expects them there.
 *
 * Where the command bytes come from
 * ---------------------------------
 *   The HT16K33 datasheet, pages 24-25.  Each command is one byte: the top
 *   bits identify the command and the bottom bits are its options.
 *
 *     system setup    0b0010 X X X S      S = 1 turns the oscillator on
 *     display setup   0b1000 X B1 B0 D    D = 1 is display on;
 *                                         B1 B0 = 00 steady, 01 2 Hz,
 *                                         10 1 Hz, 11 0.5 Hz
 *     dimming set     0b1110 P3 P2 P1 P0  duty cycle in sixteenths
 *
 *   SevenSegPartial.h gives each of those pieces a name -- HT16K33_SYSTEM_CMD,
 *   HT16K33_OSC_ON, HT16K33_DISPLAY_CMD, HT16K33_DISPLAY_ON, HT16K33_BLINK_OFF,
 *   HT16K33_BLINK_1HZ, HT16K33_BRIGHT_CMD -- so that a line of code here reads
 *   the way the datasheet row does: the command, ORed with its options.  Use
 *   the names, not the numbers.
 *
 * The display RAM
 * ---------------
 *   Sixteen bytes, two per digit position.  The first byte of each pair is
 *   the segments (bit 0 = a, up to bit 6 = g, bit 7 = the decimal point) and
 *   the second is always 0 for us -- but it still has to be sent, because the
 *   HT16K33's internal address pointer advances one address per byte
 *   received.  Skip the zeros and everything after them lands one address too
 *   early.
 *
 *   So the buffer is 2*HT16K33_NBUF bytes and goes out in ONE transaction,
 *   starting at HT16K33_ADDR_PTR.  One transaction, because a STOP ends the
 *   write and the next one would start over at whatever address its own
 *   command byte named.
 *
 * Masking the arguments
 * ---------------------
 *   blink() and dim() both OR the caller's value into a command byte, so a
 *   caller who passes something out of range would corrupt the command
 *   itself.  Mask each argument down to the bits its command actually has:
 *   0x6 for the two blink bits, 0xf for the four brightness bits.
 *
 * Revision history
 * ----------------
 *   Written for ENGS 28.
 */

#include "ES28.h"
#include "i2c.h"
#include "SevenSegPartial.h"

// Initialize the display: oscillator on, display on and steady, full brightness
void SevenSeg_init() {
    // TODO 1 -- three one-byte writes, in this order: system setup with the
    //           oscillator on, display setup with the display on and not
    //           blinking, and dimming set to full brightness.  Build each
    //           byte out of the names in SevenSegPartial.h.

}

// Change the display flashing
void SevenSeg_blink(uint8_t rate) {
    // TODO 2 -- one byte: the display-setup command, the display-on bit, and
    //           the caller's rate masked to the two blink bits.

}

// Dim the display
void SevenSeg_dim(uint8_t brightness) {
    // TODO 3 -- one byte: the dimming command with the caller's brightness
    //           masked to the four brightness bits.

}

// Write the display RAM
void SevenSeg_write(uint8_t *display_buffer) {
    // display_buffer is size 2*HT16K33_NBUF (high byte, low byte)
    // TODO 4 -- one call.  Every byte in ONE transaction, starting at display
    //           RAM address HT16K33_ADDR_PTR.  Do not touch an I2C register
    //           directly -- go through the i2c library.

}
