import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpfDirective } from './cpf.directive';
import { CpfConfig } from './cpf.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CpfDirective],
  exports: [CpfDirective]
})
export class CpfModule {
  public static forRoot(): ModuleWithProviders { return{ngModule: CpfModule, providers: [CpfConfig]} }
}
