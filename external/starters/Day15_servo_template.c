/* servo.c -- Control a servo motor with a potentiometer
 * ENGS 28
 *
 * Description:		Potentiometer --> ADC --> PWM --> servomotor
 *
 * Target device:	Nucleo C031C6 / SG92R servomotor
 * Dependencies:	adc.c, uart.c, tim.c
 *
 * Potentiometer:  	Analog channel PA0
 * Servo PWM input:	PA7
 *
 */

/* INCLUDE FILES */
#include <stdio.h>
#include "ES28.h"
#include "uart.h"
#include "adc.h"
#include "tim.h"

/* Clock runs at 12MHz */
#define PWM_PSC_FACTOR              // prescaler
#define PWM_TIMER_MAX               // 20 ms
#define SERVO_MIN                   // 1 ms
#define SERVO_MID                   // 1.5 ms
#define SERVO_MAX                   // 2 ms

#define MAXADC          4096        // 12-bit converter

volatile uint8_t timerFlag = 0;     // Don't forget the "volatile"!

void updateServo(uint16_t value);

// Main program
int main(void) {
    uint16_t pot_value = 0;
    uint16_t pwm_value = SERVO_MIN;

    uart2_init();
    tim14_pa7_pwm_init(PWM_PSC_FACTOR, PWM_TIMER_MAX);
    pa0_adc_init();

    printf("Potentiometer-controlled servo\n\r");

    timerFlag = 0;
    tim16_ms_interrupt_init(500);

    while(1) {
        if(timerFlag==1) {
            start_conversion();
            pot_value = adc_read();         // Pot value (0 to MAXADC-1)

/*******************/
            pwm_value =                     // Map pot_value to pwm_value
/*******************/

            updateServo(pwm_value);         // Update the PWM
            printf("pot_value=%d, \tpwm_value=%d\n\r", pot_value, pwm_value);
            timerFlag=0;                    // Put the flag down
        }
        // Processor could sleep here
    }
    return 0;                               // never reached
}
void updateServo(uint16_t value) {
    if (value>SERVO_MAX)
        value = SERVO_MAX;
    else if (value < SERVO_MIN)
        value = SERVO_MIN;
    tim14_pwm_set(value);
}

void TIM16_IRQHandler(void) {
    __disable_irq();
    /* Clear UIF in status register */
    TIM16->SR = ~TIM_SR_UIF;
    timerFlag = 1;
    __enable_irq();
}
