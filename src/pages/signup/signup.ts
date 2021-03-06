import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
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
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService
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
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, 
    error => {

    });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    })
  }

  signupUser() {
    console.log("Enviando Formulario");
  }

}
