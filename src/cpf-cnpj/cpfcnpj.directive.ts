import {ElementRef, Directive, HostListener, OnInit, forwardRef} from '@angular/core';

import * as BrV from 'br-validations';
import * as StringMask from 'string-mask';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';


@Directive({
  selector: '[appBrCpfCnpjMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CpfCnpjDirective),
      multi: true
    }
  ]
})
export class CpfCnpjDirective implements OnInit {

  /** Pattern create for StringMask library*/
   private cnpjPattern = new StringMask('00.000.000\/0000-00');
  private cpfPattern = new StringMask('000.000.000-00');

  /** Placeholders for the callbacks which are later providesd by the Control Value Accessor*/
  private onChangeCallback = (_: any) => { };
  private onTouchCallback = () => { };

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  /** Listener for input target of our directive*/
  @HostListener('input')
  onKeydow(): void {
    const cleanValue: string = this._cleanValue(this._elementRef.nativeElement.value);
    this._applyValueChanges(cleanValue);
  }

  /** From ControlValueAccessor interface*/
  /** It writes the value in the input */
  public writeValue(inputValue: string): void {
    if (!inputValue) {
      return;
    }
    if (inputValue.length > 11) {
      this._elementRef.nativeElement.value = this.cnpjPattern.apply(inputValue);
    } else {
      this._elementRef.nativeElement.value = this.cpfPattern.apply(inputValue);
    }
  }

  /** From ControlValueAccessor interface*/
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
    return;
  }

  /** From ControlValueAccessor interface*/
  public registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  /** It applies the mask in the input and updates the control's value. */
  private _applyValueChanges(cleanValue): void {

    let formatedValue: string;
    if (cleanValue.length > 11) {
      formatedValue = this.cnpjPattern.apply(cleanValue);
    } else {
      formatedValue = this.cpfPattern.apply(cleanValue) || '';
    }

    formatedValue = formatedValue.trim().replace(/[^0-9]$/, '');
    this._elementRef.nativeElement.value = formatedValue;
    this.onChangeCallback(formatedValue);
  }

  /** It clean the captured value in the input*/
  private _cleanValue(viewValue): string {
    return viewValue.replace(/[^\d]/g, '').slice(0, 14);
  }
}
