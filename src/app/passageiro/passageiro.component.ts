import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';

import Passageiro from '../models/passageiro.model';
import { PassageiroService } from '../service/passageiro.service';

@Component({
  selector: 'app-passageiro',
  templateUrl: './passageiro.component.html',
  styleUrls: ['./passageiro.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PassageiroComponent implements OnInit {

  constructor( private passageiroService: PassageiroService ){ }

    public novoPassageiro: Passageiro = new Passageiro();

    public listaPassageiro: Passageiro[];
    public editPassageiros: Passageiro[] = [];

    ngOnInit(): void {

      this.passageiroService.getPassageiros()
      .subscribe( (passageiros: Passageiro[]) => {
        this.listaPassageiro = passageiros;
        console.log(passageiros);
      });

    }

    create() {
      this.passageiroService.createPassageiro(this.novoPassageiro)
        .subscribe( (passageiros: Passageiro) => {
          // this.listaPassageiro.push(passageiros);
          this.passageiroService.getPassageiros()
          .subscribe( (passageiros1: Passageiro[]) => {
            this.listaPassageiro = passageiros1;
            console.log(passageiros1);
          });
          this.novoPassageiro = new Passageiro();
        });

    }
    /*editPassageiro(passageiro: Passageiro) {
      console.log(passageiro);

      if (this.listaPassageiro.includes(passageiro)) {
        if (!this.editPassageiros.includes(passageiro)) {
          this.editPassageiros.push(passageiro);
        }else{
          this.editPassageiros.splice(this.editPassageiros.indexOf(passageiro), 1);
          this.passageiroService.editarPassageiro(passageiro).subscribe(res => {
            console.log('atualizado com sucesso');
          }, err => {
            this.editPassageiro(passageiro);
            console.error('Falha na atualização');

          });
        }
      }
    }*/

    editPassageiro(passageiro: Passageiro) {
      console.log(passageiro);

      if (this.listaPassageiro.includes(passageiro)) {
        if (!this.editPassageiros.includes(passageiro)) {
          this.editPassageiros.push(passageiro);
        }else{
          this.editPassageiros.splice(this.editPassageiros.indexOf(passageiro), 1);
          this.passageiroService.editarPassageiro(passageiro).subscribe(res => {
            console.log('atualizado com sucesso');
          }, err => {
            this.editPassageiro(passageiro);
            console.error('Falha na atualização');

          });
        }
      }
    }


    donePassageiro(passageiro: Passageiro) {
      // Passageiro.status = 'Done';
      this.passageiroService.editarPassageiro(passageiro).subscribe(res => {
        this.editPassageiro((passageiro));
        console.log('Atualizado com Sucesso');
      }, err => {
        this.editPassageiro(passageiro);
        console.error('Erro ao atualizar');
      });
    }

    submitPassageiro(event, passageiro: Passageiro){
      if (event.keyCode === 13){
        this.editPassageiro(passageiro);
      }
  }
  deletePassageiro(passageiro: Passageiro) {
    this.passageiroService.deletarPassageiro(passageiro._id).subscribe(res => {
      this.listaPassageiro.splice(this.listaPassageiro.indexOf(passageiro), 1);
    });
  }
}
