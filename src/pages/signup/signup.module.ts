import { CidadeService } from './../../services/domain/cidade.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    EstadoService,
    CidadeService
  ]
})
export class SignupPageModule {}
