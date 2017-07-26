import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CpfCnpjModule } from './cpf-cnpj/cpfcnpj.module';
import { PhoneModule } from './phone/phone.module';
import { CepModule } from './cep/cep.module';
import { CpfModule } from './cpf/cpf.module';
import { CnpjModule } from './cnpj/cnpj.module';
import { MoneyModule } from './money/money.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CpfCnpjModule,
    PhoneModule,
    CepModule,
    CpfModule,
    CnpjModule,
    MoneyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
