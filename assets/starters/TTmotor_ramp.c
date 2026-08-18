/* TTmotor_ramp.c -- Demonstrate PWM control of a TT motor
 * ENGS 28
 * Description:		Counter --> PWM --> TTmotor.
 *					Mimicking PWM from the Adafruit motor shield, use a PWM frequency
 *					≈ 1.6kHz (625µs period).
 *
 * Target device:	Nucleo C031C6 / TT motor / TB6612FNG driver
 * Dependencies:	uart.c
 *
 * TB6612:			AIN1 --> PA5
 *					AIN2 --> PA6
 *					PWMA --> PA7
 */

// trying 50 Hz

/* INCLUDE FILES */
#include <stdio.h>
#include "ES28.h"
#include "uart.h"
#include "stdlib.h"

/* Clock runs at 12MHz */
/* Need to prescale by 6 to have counting to 1250 be 1.6 KHz */
#define PSC_FACTOR	6		    // 12 MHz / 6 = 2 MHz
#define PWM_TIMER_MAX	  1250		// 2 MHz / 1250 = 1.6 kHz with prescale 6

//#define PSC_FACTOR	12		    // 12 MHz / 120 = 100 KHz
//#define PWM_TIMER_MAX	  2000		// 100 KHz / 2000 = 50 Hz with prescale 120

#define SPEED_UPDATE	  2000		// 2 seconds

void tim14_pa7_pwm_init(void);
void tim14_pwm_set(uint16_t pulse);


// Main program
int main(void) {
  int16_t TB6612_PWMA = 0;
  uint8_t TB6612_AIN1 = 0;
  uint8_t TB6612_AIN2 = 0;			// STOP mode

  int16_t counter_new = 0;
  int16_t counter_old = 0;
  int16_t counter_step = 200;
  int16_t counter_max = PWM_TIMER_MAX;

  typedef enum{UP, DOWN} direction_t;
  direction_t direction = UP;

  RCC->IOPENR |=  RCC_IOPENR_GPIOAEN;

  // Set PA5 and PA6 as output pins
  GPIOA->MODER &= ~GPIO_MODER_MODE5_Msk;
  GPIOA->MODER |= GPIO_OUTPUT << GPIO_MODER_MODE5_Pos;
  GPIOA->MODER &= ~GPIO_MODER_MODE6_Msk;
  GPIOA->MODER |= GPIO_OUTPUT << GPIO_MODER_MODE6_Pos;

  uart2_init();
  tim14_pa7_pwm_init();

  printf("PWM / TT motor demo\n\r");

  while(1) {
	  delay_ms(SPEED_UPDATE);
 	  counter_old = counter_new;

		// Speed update.  Ramp up to +limit, back down to -limit, repeat.
		switch(direction) {
			case UP:
				counter_new = counter_old + counter_step;	// Update the speed
				if (counter_new > counter_max) {
					counter_new = counter_max;
					direction = DOWN;
				}
				break;

			case DOWN:
				counter_new = counter_old - counter_step;
				if (counter_new < -counter_max) {
					counter_new = -counter_max;
					direction = UP;
				}
				break;
		}

		// First figure out the direction
		if(counter_new > 0) {
			if (counter_old < 0) {			// changing direction
				TB6612_AIN1 = 1;
				TB6612_AIN2 = 1;			// short brake
			} else {
				TB6612_AIN1 = 1;
				TB6612_AIN2 = 0;			// CW
			}
		} else {
			if (counter_old > 0) {			// changing direction
				TB6612_AIN1 = 1;
				TB6612_AIN2 = 1;			// short brake
			} else {
				TB6612_AIN1 = 0;
				TB6612_AIN2 = 1;			// CCW
			}
		}

		// Now figure out the magnitude
		TB6612_PWMA = abs(counter_new);		// magnitude (speed)

		// Set the direction
		GPIOA->ODR = (GPIOA->ODR & ~GPIO_ODR_OD5_Msk) | (TB6612_AIN1 << GPIO_ODR_OD5_Pos);
		GPIOA->ODR = (GPIOA->ODR & ~GPIO_ODR_OD6_Msk) | (TB6612_AIN2 << GPIO_ODR_OD6_Pos);

		// Set the magnitude
		tim14_pwm_set(TB6612_PWMA);		// Update the PWM

		printf("counter=%d, \t(IN1,IN2)=(%u,%u), PWM=%d\n\r",
					counter_new, TB6612_AIN1, TB6612_AIN2, TB6612_PWMA);

  }
  return 0;                            /* This line is never reached */
}

void tim14_pwm_set(uint16_t value) {
// Safety first: Allow no pulse values outside the (0, PWM_TIMER_MAX-1 range!
	if (value>PWM_TIMER_MAX-1)
		value = PWM_TIMER_MAX-1;
	else if (value < 0)
		value = 0;
	TIM14->CCR1 = value;
}


void tim14_pa7_pwm_init(void) {
	// Enable clock access to GPIOA
	RCC->IOPENR |=  RCC_IOPENR_GPIOAEN;

	// Set PA7 in alternate function mode (10)
	GPIOA->MODER &= ~GPIO_MODER_MODE7_Msk;
	GPIOA->MODER |= GPIO_ALTERNATE << GPIO_MODER_MODE7_Pos;

	// Set PA7 alternate function type (AF4, 0100)
	GPIOA->AFR[0] &= ~GPIO_AFRL_AFSEL7_Msk;
	GPIOA->AFR[0] |= GPIO_AF4 << GPIO_AFRL_AFSEL7_Pos;

	// Enable clock access to Timer 14
	RCC->APBENR2 |= RCC_APBENR2_TIM14EN;

	// Set prescaler
	TIM14->PSC = PSC_FACTOR-1;

	// Set autoreload value
	TIM14->ARR = PWM_TIMER_MAX-1;

	// Set the compare register value - start with a speed of 0
	TIM14->CCR1 = 0;

	// Set pwm mode 1 (0110): pin is high up to capture value, then goes low
	TIM14->CCMR1 &= ~TIM_CCMR1_OC1M_Msk;
	TIM14->CCMR1 |= TIM_OC1_PWM1 << TIM_CCMR1_OC1M_Pos;
	
	// Make sure timer is in output mode; this is default value
	TIM14->CCMR1 &= ~TIM_CCMR1_CC1S_Msk;
	TIM14->CCMR1 |= TIM_CC1_OUTPUT << TIM_CCMR1_CC1S_Pos;

	// Enable TIM14_CH1 in output mode
	TIM14->CCER |= TIM_CCER_CC1E;

	// Generate an update event - this clears counter, prescaler counter, updates registers
	TIM14->EGR |= TIM_EGR_UG;

	// Enable timer
	TIM14->CR1 |= TIM_CR1_CEN;
}
