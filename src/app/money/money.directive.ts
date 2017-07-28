import {Directive, ElementRef, forwardRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as StringMask from 'string-mask';

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
export class MoneyDirective implements OnInit, ControlValueAccessor {

  private decimalDelimiter = ',';
  private thousandsDelimiter = '.';
  private currencySym = 'R$';
  private decimals = 2;
  // private symbolSeparation = ' ';
  private decimalsPattern = this.decimals > 0 ? this.decimalDelimiter + new Array(this.decimals + 1).join('0') : '';
  private maskPattern = this.currencySym + ' #' + this.thousandsDelimiter + '##0' + this.decimalsPattern;

  /** Pattern created by StringMask library*/
  private moneyMask  = new StringMask(this.maskPattern, {reverse: true});

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
    this._elementRef.nativeElement.value = (this.moneyMask.apply(this.decimals) || '').replace(/[^\d]+/g, '');
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

    if (cleanValue) {

      const formattedValue = this.moneyMask.apply(cleanValue);
      this._elementRef.nativeElement.value = formattedValue;
      this.onChangeCallback(formattedValue ? parseInt(formattedValue.replace(/[^\d]+/g, ''), 10) / Math.pow(10, this.decimals) : null);
    }
  }

  /** It clean the captured value in the input*/
  private _cleanValue(viewValue): string {
    let cleanValue = viewValue.toString().replace(/[^\d]+/g, '');
    cleanValue = cleanValue.replace(/^[0]+([1-9])/, '$1');
    return cleanValue;
  }
}
