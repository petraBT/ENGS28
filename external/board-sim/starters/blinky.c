#include "stm32C0xx.h"

#define GPIOAEN   (1U << 0)
#define LED_PIN   (1U << 5)     // PA5, on-board LED

int main(void) {
    RCC->IOPENR  |= GPIOAEN;
    GPIOA->MODER |= (1U << 10);
    GPIOA->MODER &= ~(1U << 11);   // PA5 output

    while (1) {
        GPIOA->ODR |= LED_PIN;
        for (int i = 0; i < 100000; i++);
        GPIOA->ODR &= ~LED_PIN;
        for (int i = 0; i < 100000; i++);
    }
    return 0;
}
