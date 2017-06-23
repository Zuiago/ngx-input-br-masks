import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app';
  form: FormGroup;
  public cpfCnpjModel: string;
  public phoneModel: number;
  public cepModel: number;
  public cpfModel: string;
  public cnpjModel: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      cpfCnpjModel: this.cpfCnpjModel,
      phoneModel: this.phoneModel,
      cepModel: this.cepModel,
      cpfModel: this.cpfModel,
      cnpjModel: this.cnpjModel
    });
  }
}
