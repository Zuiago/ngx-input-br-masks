import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CnpjDirective } from './cnpj.directive';
import { CnpjConfig } from './cnpj.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CnpjDirective],
  exports: [CnpjDirective]
})
export class CnpjModule {
  public static forRoot(): ModuleWithProviders { return{ngModule: CnpjModule, providers: [CnpjConfig]} }
}
