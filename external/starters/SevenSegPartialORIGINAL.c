#include <SevenSegPartial.h>
#include "i2c.h"

// Basic configuration of the display
void SevenSeg_init(void) {
	i2c1_byteWrite(HT16K33_ADDR, HT16K33_SYSTEM_CMD | HT16K33_OSC_ON);
	i2c1_byteWrite(HT16K33_ADDR, HT16K33_DISPLAY_CMD | HT16K33_DISPLAY_ON | HT16K33_BLINK_OFF);
	i2c1_byteWrite(HT16K33_ADDR, HT16K33_BRIGHT_CMD | 0x7U);
}

// Write the display RAM
void SevenSeg_write(uint8_t *display_buffer) {
	// display_buffer is size 2*HT16K33_NBUF (high byte, low byte)
	// You can either write one digit at a time or (more efficient!) write the entire
	// display all at once. Do not directly modify i2c register addresses. Use the i2c
	// library instead.

	/***********************************************/
	/********* complete this function **************/
	/***********************************************/
}

// Change the display flashing
void SevenSeg_blink(uint8_t rate) {
	/***********************************************/
	/********* complete this function **************/
	/***********************************************/
}

// Dim the display
void SevenSeg_dim(uint8_t brightness) {
	/***********************************************/
	/********* complete this function **************/
	/***********************************************/
}

// Convert decimal value (0-9999) to segments for SevenSeg_write()
// This is a little higher than a purely device driver function.
// display_buffer is assumed to be of size 2*HT16K33_NBUF
void SevenSeg_number(uint16_t num, uint8_t *display_buffer) {
	if (num>9999) {
		// Display error message "EEEE"
		for (uint8_t i = 0; i<HT16K33_NBUF; i++) {
			if (i==2) {
				display_buffer[2*i] = 0x00;				// skip the colon
				display_buffer[2*i+1] = 0x00;
			} else {
				display_buffer[2*i] = numbertable[0xE];	// E for error
				display_buffer[2*i+1] = 0x00;
			}
		}
	} else {
		// Convert number to segments and fill the display buffer
		display_buffer[0] = numbertable[num/1000];		// 1000s place
		display_buffer[1] = 0x00;

		num %= 1000;
		display_buffer[2] = numbertable[num/100];		// 100s place
		display_buffer[3] = 0x00;

		display_buffer[4] = 0x00;						// skip the colon
		display_buffer[5] = 0x00;

		num %= 100;
		display_buffer[6] = numbertable[num/10] ;		// 10s place
		display_buffer[7] = 0x00;

		num %= 10;
		display_buffer[8] = numbertable[num];			// 1s place
		display_buffer[9] = 0x00;
	}
 }


