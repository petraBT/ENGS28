/*
 * pingDisplay.c -- call the display's I2C address, over and over, so there is
 *                  something on the bus to put an oscilloscope on
 *
 * ENGS 28: Embedded Systems       Thayer School of Engineering, Dartmouth College
 *
 * Name:
 * Assignment:      Day 9x in-class -- pingDisplay
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
 *     +  ->  the Nucleo's 3.3 V pin      (NOT 5 V -- the STM32C031C6's I/O
 *     -  ->  GND                          is 3.3 V and 5 V is outside what
 *     D  ->  PB9  (SDA)                   the chip is rated for)
 *     C  ->  PB8  (SCL)
 *
 *   The backpack carries its own pull-up resistors on SDA and SCL, so no
 *   external resistors are needed.  Both lines idle HIGH because of them.
 *
 *   The AD2, in oscilloscope mode: channel 1 (orange) on SCL, channel 2
 *   (blue) on SDA, both white-striped minus leads at GND.
 *
 * What this program does
 * ----------------------
 *   Nothing useful, on purpose.  It sends one byte to the display's address
 *   four times a second so that there is a transaction on the wire to look
 *   at.  Take a single sweep on the AD2 and you should see, left to right:
 *
 *     - the START condition: SDA falls while SCL is still HIGH
 *     - eight clock pulses carrying 1 1 1 0 0 0 0 (the 7-bit address 0x70)
 *       followed by a 0 for "write"
 *     - a ninth pulse with SDA LOW -- the display's ACK
 *     - eight more clocks carrying the data byte, and a second ACK
 *     - the STOP condition: SDA rises while SCL is HIGH
 *
 *   Eighteen clock pulses in all, at 100 kHz, so the whole thing takes under
 *   200 microseconds.
 *
 * Why it sends data at all
 * ------------------------
 *   I2C has no way to address a device without also doing something to it,
 *   so a "ping" is a one-byte write.  The value does not matter here; the
 *   display is not initialized yet and will not act on it.
 *
 * Things to try
 * -------------
 *   - Change HT16K33_ADDR to 0x60.  Nothing on the bus has that address, so
 *     the ninth clock pulse finds SDA still HIGH: a NACK.  You will have to
 *     arm the single sweep and then press the Nucleo's black reset button,
 *     because the program stops after one transaction rather than repeating
 *     (i2c1_byteWrite() waits for a flag the hardware does not set after a
 *     NACK).
 *   - Change data to 0b1011110 and read the new bit pattern off the trace.
 *
 * Revision history
 * ----------------
 *   Written for ENGS 28.
 */

#include "ES28.h"
#include "i2c.h"

#define HT16K33_ADDR  0x70   // I2C address of our backpack controller

int main(void) {
    uint8_t data = 0b0;  // The hardware requires us to send some data, not important here.
    i2c1_init();
    // Ping the display's address, repeatedly
    while(1) {
        i2c1_byteWrite(HT16K33_ADDR, data);
        delay_ms(250);
    }
    return 1;
}
