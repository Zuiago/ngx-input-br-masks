import {Component, ElementRef, Directive, Input, HostListener} from '@angular/core';

import { CpfCnpjConfig } from './cpfcnpj.config';
import * as BrV from 'br-validations';
import * as StringMask from 'string-mask';

/**  */
@Directive({
  selector: '[appBrCpfCnpjMask]'
})
export class CpfCnpjDirective {

  public cnpjPattern = new StringMask('00.000.000\/0000-00');
  public cpfPattern = new StringMask('000.000.000-00');

  constructor(private el: ElementRef) { }

  @HostListener('window:keydown', ['$event'])
  confirmFirst() {

  }
}
