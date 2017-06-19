/* tslint:disable: max-classes-per-file */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CpfCnpjModule } from './cpf-cnpj/cpfcnpj.module';


export {
  CpfCnpjDirective, CpfCnpjConfig, CpfCnpjModule
} from './cpf-cnpj';

const MODULES = [
  CpfCnpjModule
];

@NgModule({
  imports: [
    CpfCnpjModule.forRoot()
  ],
  exports: MODULES
})
export class BrInputMasksRootModule {



}
