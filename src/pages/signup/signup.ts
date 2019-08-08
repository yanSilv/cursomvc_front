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
        nome: ['Yan', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['jaguaryan@hotmail.com', [Validators.required, Validators.email]],
        cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        tipo : ['1', [Validators.required]],
        logradouro: ['Rua Via', [Validators.required]],
        complemento: ['Apt 03', [Validators.required]],
        bairro : ['Copacabana', [Validators.required]],
        numero: ['25', [Validators.required]],
        cep: ['10828333', [Validators.required]],
        telefone1: ['977261827', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    console.log("Enviando Formulario");
  }

}
