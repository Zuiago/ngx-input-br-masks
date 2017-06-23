import {Directive, ElementRef, HostListener, OnInit, forwardRef} from '@angular/core';

import * as StringMask from 'string-mask';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

export function createCepValidator() {
  return (c: FormControl) => {
    const err = {
      validationPatternError: {
        valid: false,
      }
    };
    return !(c.value.toString().trim().length === 8) ? err : null;
  }
}

@Directive({
  selector: '[BrCepMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CepDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CepDirective),
      multi: true
    }
  ]
})
export class CepDirective implements OnInit, ControlValueAccessor {

  /** Pattern created by StringMask library*/
  private cepPattern = new StringMask('00000-000');

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
    this._elementRef.nativeElement.value = (this.cepPattern.apply(cleanValue) || '').replace(/[^0-9]$/, '');
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

    this._elementRef.nativeElement.value = (this.cepPattern.apply(cleanValue) || '').replace(/[^0-9]$/, '');
    this.onChangeCallback(cleanValue);
  }

  /** It clean the captured value in the input*/
  private _cleanValue(viewValue): string {
    return viewValue.toString().replace(/[^0-9]/g, '').slice(0, 8);
  }

  /** Return the validation result*/
  validate(c: FormControl) {
    if(c.value){
      this.validateFn = createCepValidator();
    }
    return this.validateFn(c);
  }
}
