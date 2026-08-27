/* Shell program to test LSM303AGR driver code
 *
 * ENGS 28
 * Description:	 	Simple calls to the driver functions for my LSM303AGR accelerometer,
 * 					to test basic functionality.
 *
 * Target device:	Nucleo C031C6, Adafruit LSM303AGR breakout
 * Dependencies:	lsm303agr, i2c.c, uart.c
 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"
#include "lsm303agr.h"
#include "i2c.h"

#define ACC_FS 4
#define ACC_REGISTERWIDTH 16
#define MILLI 1000

/* CODE */
int main(void) {
  	// Setup code (run once) goes here:
	int16_t accel_x, accel_y, accel_z;
	lsm303AccelData_s accel_raw;

	i2c1_init();
	uart2_init();
	printf("LSM303AGR test program \n\r");

	if( lsm303_AccelInit() ) {
		printf("Accelerometer initialized! \n\r");
	}
	else {
		printf("Could not connect to accelerometer \n\r");
	}

  	printf("Control Register 1 = %x \n\r", lsm303_AccelRegisterRead(LSM303_CTRL_REG1_A));
  	printf("Control Register 4 = %x \n\r", lsm303_AccelRegisterRead(LSM303_CTRL_REG4_A));

	while(1) {
		lsm303_AccelReadRaw(&accel_raw);
		accel_x = (ACC_FS * accel_raw.x * MILLI) >> ACC_REGISTERWIDTH;
		accel_y = (ACC_FS * accel_raw.y * MILLI) >> ACC_REGISTERWIDTH;
		accel_z = (ACC_FS * accel_raw.z * MILLI) >> ACC_REGISTERWIDTH;

		printf("accel_raw_x=%x, accel_raw_y=%x, accel_raw_z=%x \n\r", accel_raw.x, accel_raw.y, accel_raw.z);
		printf("accel_x=%d mg, accel_y=%d mg, accel_z=%d mg \n\n\r", accel_x, accel_y, accel_z);

		delay_ms(2000);
	}

	return 0;		/* never reached */
}
