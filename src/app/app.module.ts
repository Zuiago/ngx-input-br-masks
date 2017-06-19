import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CpfCnpjModule } from '../cpf-cnpj/cpfcnpj.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CpfCnpjModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
