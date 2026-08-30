/* Accelerometer test: Confirm that the device is online
 *
 * ENGS 28
 *
 * Target device:	Nucleo C031C6, Adafruit LSM303AGR breakout
 * Tool version:
 * Dependencies:	i2c.c, uart.c
 *
 *
 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"
#include "i2c.h"

/* MACROS */
#define LSM303_ADDRESS_ACCEL       (0x32 >> 1)  // 7-bit address 0b0011001
#define LSM303_WHO_AM_I_A		   0x0F	  		// default value: 00110011

/* FUNCTIONS */
uint8_t lsm303_AccelRegisterRead(uint8_t RegisterAddress);

int main(void) {
	uint8_t who_am_i = 0;

	i2c1_init();
	uart2_init();
	printf("LSM303AGR initialization test \n\r");

	while(1) {
		who_am_i = lsm303_AccelRegisterRead(LSM303_WHO_AM_I_A);
		if( who_am_i == 0x33 ) {
			printf("Accelerometer initialized! \n\r");
		}
		else {
			printf("Could not connect to accelerometer \n\r");
		}
		delay_ms(1000);
	}
	return 0;
}

/* Read one byte from an accelerometer register (Datasheet, Table 22) */
uint8_t lsm303_AccelRegisterRead(uint8_t RegisterAddress) {
	uint8_t data;
	i2c1_memRead(LSM303_ADDRESS_ACCEL, RegisterAddress, 1, &data);

 	return data;
}
