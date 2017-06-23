import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CpfCnpjDirective } from './cpfcnpj.directive';
import { CpfCnpjConfig } from './cpfcnpj.config';

@NgModule({
  imports: [CommonModule],
  declarations: [CpfCnpjDirective],
  exports: [CpfCnpjDirective]
})
export class CpfCnpjModule {
  public static forRoot(): ModuleWithProviders { return {ngModule: CpfCnpjModule, providers: [CpfCnpjConfig]}; }
}
