import {HostListener, Injectable} from '@angular/core';
/**
 * Created by iago.almeida on 21/06/2017.
 */
@Injectable()
export class MaskDefinition {
  @HostListener('window:keydown', ['$event'])
  onKeydow(value) {
    console.log('keydown');
  }
}
