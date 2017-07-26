import {Directive, forwardRef, Input} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

export function createCpfValidator() {
  return (c: FormControl) => {
    const err = {
      validationPatternError: {
        valid: false,
      }
    };
    return (c.value) ? err : null;
  }
}

@Directive({
  selector: '[MoneyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyDirective),
      multi: true
    }
  ]
})
export class MoneyDirective {

  private decimalDelimiter = ',';
  private thousandsDelimiter = '.';
  private currencySym = 'R$';
  private decimals;

  constructor() { }

}
