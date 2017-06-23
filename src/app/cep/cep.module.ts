import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CepConfig } from './cep.config';
import { CepDirective } from './cep.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CepDirective],
  exports:[CepDirective]
})
export class CepModule {
  public static forRoot(): ModuleWithProviders {return {ngModule: CepModule, providers: [CepConfig]}; }
}
