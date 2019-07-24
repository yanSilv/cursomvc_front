import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder
    ) {
      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', []],
        cpfOuCnpj: ['', []],
        senha: ['', []],
        tipo : ['1', [Validators.required]],
        logradouro: ['', []],
        complemento: ['', []],
        bairro : ['', []],
        numero: ['', []],
        cep: ['', []],
        telefone1: ['', []],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: ['', []],
        cidadeId: ['', []]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    console.log("Enviando Formulario");
  }

}
