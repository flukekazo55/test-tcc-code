import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[productCodeFormat]'
})
export class ProductCodeFormatDirective {
  private regex: RegExp = /^[A-Za-z0-9]*$/;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = this.el.nativeElement.value;
    const cleanedInput = input.replace(/[^A-Za-z0-9]/g, '');
    const formatted = cleanedInput.match(/.{1,4}/g)?.join('-') || '';
    this.el.nativeElement.value = formatted;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (!this.regex.test(key) && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  }
}
