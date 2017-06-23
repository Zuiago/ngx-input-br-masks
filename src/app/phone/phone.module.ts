import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { PhoneDirective } from './phone.directive';
import { PhoneConfig } from './phone.config';

@NgModule({
  imports: [CommonModule],
  declarations: [PhoneDirective],
  exports: [PhoneDirective]
})
export class PhoneModule {
  public static forRoot(): ModuleWithProviders {return {ngModule: PhoneModule, providers: [PhoneConfig]}; }
}
