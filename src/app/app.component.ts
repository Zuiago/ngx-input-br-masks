import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cpfCnpj: string = null;

  visit() {
    console.log('Visiting rangle');
    location.href = 'https://rangle.io';
  }
}
