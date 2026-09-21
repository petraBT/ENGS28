/* ADCPot.c
 * ENGS 28 - Day 7 in-class
 *
 * Attach the pot first: click + Pot in
 * the component bay, then click header
 * pin A0. Drag the knob to move the
 * wiper; the voltage on it is shown
 * under the knob, which is what your
 * DMM would read on the bench.
 *
 * A0 is PA0, and PA0 is ADC channel 0.
 * All three happen to agree here. They
 * do not agree for most pins, so look
 * each one up rather than assuming.
 *
 * Five blanks to fill in:
 *
 *   TODO 1  the pin      GPIOA->MODER
 *                        (and the PORT's
 *                        clock, in
 *                        RCC->IOPENR)
 *   TODO 2  the clock    RCC->APBENR2
 *   TODO 3  the channel  ADC1->CHSELR
 *   TODO 4  ready?       ADC1->ISR, ADRDY
 *   TODO 5  done?        ADC1->ISR, EOC
 *
 * Analog mode is 0b11, and a multi-bit
 * field is CLEARED before it is SET. The
 * waiting idiom is the one you used for
 * the UART on Day 5.
 *
 * Watch ADC1->CHSELR, ADC1->ISR and
 * ADC1->DR in the register panel as it
 * runs. The panel shows them once the
 * ADC's own clock is on.
 */

#include <stdio.h>
#include "ES28.h"
#include "uart.h"

void     pa0_adc_init(void);
void     start_conversion(void);
uint16_t adc_read(void);

int main(void) {
    uint16_t sensor_value;
    uart2_init();

    printf("\n\rHello from STM32C0!\r\n");
    printf("Single conversion ADC test\r\n");

    pa0_adc_init();

    while (1) {
        start_conversion();
        sensor_value = adc_read();
        printf("Sensor value: %d\r\n", sensor_value);
        delay_ms(1000);
    }
    return 0;
}

/* Run once, before any sampling. */
void pa0_adc_init(void) {
    // TODO 1 -- configure PA0 as an analog input
    //           (enable the GPIOA clock, then clear and set the mode bits)


    // TODO 2 -- enable the clock to the ADC


    // TODO 3 -- select the channel PA0 is connected to


    // Enable the ADC module
    ADC1->ISR = ADC_ISR_ADRDY;   // clear the ready bit  (we'll come back to this)
    ADC1->CR |= ADC_CR_ADEN;     // set the ADC enable bit
}

/* Run each time you want a new sample. */
void start_conversion(void) {
    // TODO 4 -- wait until the ADC reports that it is ready (ADRDY)


    ADC1->CR |= ADC_CR_ADSTART;  // start a single conversion
}

/* Blocks until the conversion finishes, then hands back the 12-bit count. */
uint16_t adc_read(void) {
    // TODO 5 -- wait until the conversion has finished (EOC)


    return (uint16_t) ADC1->DR;  // reading DR also clears EOC
}
