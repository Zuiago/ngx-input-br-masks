import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CpfCnpjModule } from './cpf-cnpj/cpfcnpj.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CpfCnpjModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
