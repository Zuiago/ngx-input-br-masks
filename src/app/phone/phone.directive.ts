import {Directive, ElementRef, HostListener, OnInit, forwardRef} from '@angular/core';

import * as StringMask from 'string-mask';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';


export function createPhoneValidator(valueLength) {
  return (c: FormControl) => {
    const err = {
      validationPhoneError: {
        valid: false,
      }
    };
    // Length 8- 8D without DD
    // Length 9- 9D without DD
    // Length 10- 9D with DD
    // Length 11- 8D with DD and 0800
    return !(valueLength >= 8 && valueLength <= 11) ? err : null;
  }
}

@Directive({
  selector: '[BrPhoneMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneDirective),
      multi: true
    }
  ]
})
export class PhoneDirective implements OnInit, ControlValueAccessor{

  /** Pattern created by StringMask library*/
  private phoneMask8D = {
    areaCode: new StringMask('(00) 0000-0000'),
    simple: new StringMask('0000-0000')
  };
  private phoneMask9D = {
    areaCode: new StringMask('(00) 00000-0000'),
    simple: new StringMask('00000-0000')
  };
  private phoneMask0800 = {
    areaCode: null,
    simple: new StringMask('0000-000-0000')
  };

  /** Placeholders for the callbacks which are later providesd by the Control Value Accessor*/
  private onChangeCallback = (_: any) => {
  };
  private onTouchCallback = () => {
  };
  validateFn: any = () => {
  };

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
    const cleanValue: string = this._cleanValue(this._elementRef.nativeElement.value);
    this._applyValueChanges(cleanValue);
  }

  /** Listener for input target of our directive*/
  @HostListener('input')
  onKeydow(): void {
    const cleanValue: string = this._cleanValue(this._elementRef.nativeElement.value);
    this._applyValueChanges(cleanValue);
  }

  /** From ControlValueAccessor interface*/
  /**
   * Write a new value to the element.
   */
  public writeValue(inputValue: string): void {

    if (!inputValue) {
      return;
    }

    const cleanValue: string = this._cleanValue(inputValue);

    if (cleanValue.indexOf('0800') === 0) {
      this._elementRef.nativeElement.value = this.phoneMask0800.simple.apply(cleanValue);
    } else if (cleanValue.length < 9) {
      this._elementRef.nativeElement.value = this.phoneMask8D.simple.apply(cleanValue) || '';
    } else if (cleanValue.length < 10){
      this._elementRef.nativeElement.value = this.phoneMask9D.simple.apply(cleanValue);
    } else if (cleanValue.length < 11){
      this._elementRef.nativeElement.value = this.phoneMask8D.areaCode.apply(cleanValue);
    } else {
      this._elementRef.nativeElement.value = this.phoneMask9D.areaCode.apply(cleanValue);
    }
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a change event.
   */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
    return;
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a touch event.
   */
  public registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  /** It applies the mask in the input and updates the control's value. */
  private _applyValueChanges(cleanValue): void {

    let formattedValue: string;
    if (cleanValue.indexOf('0800') === 0) {
      formattedValue = this.phoneMask0800.simple.apply(cleanValue);
    } else if (cleanValue.length < 9) {
      formattedValue = this.phoneMask8D.simple.apply(cleanValue) || '';
    } else if (cleanValue.length < 10){
      formattedValue = this.phoneMask9D.simple.apply(cleanValue);
    } else if (cleanValue.length < 11){
      formattedValue = this.phoneMask8D.areaCode.apply(cleanValue);
    } else {
      formattedValue = this.phoneMask9D.areaCode.apply(cleanValue);
    }

    formattedValue = formattedValue.trim().replace(/[^0-9]$/, '');
    this._elementRef.nativeElement.value = formattedValue;
    this.onChangeCallback(cleanValue);
  }

  /** It clean the captured value in the input*/
  private _cleanValue(viewValue): string {
    return viewValue.toString().replace(/[^0-9]/g, '').slice(0, 11);
  }

  /** Return the validation result*/
  validate(c: FormControl) {

    if(c.value){
      var valueLength = c.value && c.value.toString().length;
      this.validateFn = createPhoneValidator(valueLength);
    }
    return this.validateFn(c);
  }

}
