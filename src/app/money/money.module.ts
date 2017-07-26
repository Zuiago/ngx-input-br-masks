import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyConfig } from './money.config';
import { MoneyDirective } from './money.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MoneyDirective],
  exports:[MoneyDirective]
})
export class MoneyModule {
  public static forRoot(): ModuleWithProviders {return {ngModule: MoneyModule, providers: [MoneyConfig]}; }
}
