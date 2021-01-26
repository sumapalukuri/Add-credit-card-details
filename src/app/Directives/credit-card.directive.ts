import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCreditCard]',
})
export class CreditCardDirective {
  @HostListener('input', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('keypress', ['$event'])
  @HostListener('blur', ['$event'])
  /**
   * Function to add space after 4 characters
   */
  transForm(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let trimmedInput = input.value.replace(/\s+/g, '');
    if (trimmedInput.length > 16) {
      trimmedInput = trimmedInput.substr(0, 16);
    }
    const numbers = [];
    for (let i = 0; i < trimmedInput.length; i += 4) {
      numbers.push(trimmedInput.substr(i, 4));
    }
    input.value = numbers.join(' ');
  }
}
