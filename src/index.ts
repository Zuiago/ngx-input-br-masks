/* tslint:disable: max-classes-per-file */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CpfCnpjModule } from './app/cpf-cnpj/cpfcnpj.module';


export {
  CpfCnpjDirective, CpfCnpjConfig, CpfCnpjModule
} from './app/cpf-cnpj';

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
