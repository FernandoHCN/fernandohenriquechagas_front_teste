import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import 'rxjs/add/operator/debounceTime';

import { CorridaService } from '../service/corrida.service';
import { MotoristaService } from '../service/motorista.service';
import { PassageiroService } from '../service/passageiro.service';

import Corrida from '../models/corrida.model';
import Motorista from '../models/motorista.model';
import Passageiro from '../models/passageiro.model';

import { Response } from '@angular/http';
@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  styleUrls: ['./corrida.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CorridaComponent implements OnInit {

  constructor( private corridaService: CorridaService,
    private motoristaService: MotoristaService,
    private passageiroService: PassageiroService ){ }

      public novoCorrida: Corrida = new Corrida();


      public listaCorrida: Corrida[];
      public listaMotoristas: Motorista[];
      public listaPassageiros: Passageiro[];
      public editCorridas: Corrida[] = [];

      ngOnInit(): void {

        this.corridaService.getCorridas()
        .subscribe( (Corridas: Corrida[]) => {
          this.listaCorrida = Corridas;
          // console.log(Corridas);
        });

        this.motoristaService.getMotoristas()
        .subscribe( (motoristas: Motorista[]) => {
          this.listaMotoristas = motoristas.filter( motorista => {
            return motorista.status === 'Ativo';
          });
          // this.listaMotoristas = motoristas;
          console.log('Lista Retornada depois do Filter', this.listaMotoristas);
        });

        this.passageiroService.getPassageiros()
        .subscribe( (passageiros: Passageiro[]) => {
          this.listaPassageiros = passageiros;
          console.log(passageiros);
        });

      }

      create() {

        this.motoristaService.getMotoristas()
        .subscribe( (motoristas: Motorista[]) => {
          motoristas.forEach((element, index, array) => {

                  if (element.nome === this.novoCorrida.motorista.nome){
                    this.novoCorrida.motorista.nome = element.nome ? element.nome : null;
                    this.novoCorrida.motorista.dataNascimento = element.dataNascimento ? element.dataNascimento : null;
                    this.novoCorrida.motorista.CPF = element.CPF ? element.CPF : null;
                    this.novoCorrida.motorista.carroModelo = element.carroModelo ? element.carroModelo : null;
                    this.novoCorrida.motorista.status = element.status ? element.status : null;
                    this.novoCorrida.motorista.sexo = element.sexo ? element.sexo : null ;
                  }

                });
        });

        this.passageiroService.getPassageiros()
        .debounceTime(300)
        .subscribe( (passageiros: Passageiro[]) => {
          passageiros.forEach((element, index, array) => {

                          if (element.nome === this.novoCorrida.passageiro.nome){


                            this.novoCorrida.passageiro.nome = element.nome ? element.nome : null;
                            this.novoCorrida.passageiro.dataNascimento = element.dataNascimento ? element.dataNascimento : null;
                            this.novoCorrida.passageiro.CPF = element.CPF ? element.CPF : null;
                            this.novoCorrida.passageiro.sexo = element.sexo ? element.sexo : null ;

                          }

               });

        });

        this.corridaService.createCorrida(this.novoCorrida)
          .subscribe( (corrida: Corrida) => {
            // this.listaCorrida.push(corrida);
            this.corridaService.getCorridas()
            .subscribe( (Corridas: Corrida[]) => {
              this.listaCorrida = Corridas;
              // console.log(Corridas);
            });
            this.novoCorrida = new Corrida();
          });



      }
      editCorrida(corrida: Corrida) {
        console.log(corrida);

        if (this.listaCorrida.includes(corrida)) {
          if (!this.editCorridas.includes(corrida)) {
            this.editCorridas.push(corrida);
          }else{
            this.editCorridas.splice(this.editCorridas.indexOf(corrida), 1);
            this.corridaService.editarCorrida(corrida).subscribe(res => {
              console.log('atualizado com sucesso');
            }, err => {
              this.editCorrida(corrida);
              console.error('Falha na atualização');

            });
          }
        }
      }

      doneCorrida(corrida: Corrida) {
        // Corrida.status = 'Done';
        this.corridaService.editarCorrida(corrida).subscribe(res => {
          this.editCorrida((corrida));
          console.log('Atualizado com Sucesso');
        }, err => {
          this.editCorrida(corrida);
          console.error('Erro ao atualizar');
        });
      }

      submitCorrida(event, corrida: Corrida){
        if (event.keyCode === 13){
          this.editCorrida(corrida);
        }
    }
    deleteCorrida(corrida: Corrida) {
      this.corridaService.deletarCorrida(corrida._id).subscribe(res => {
        this.listaCorrida.splice(this.listaCorrida.indexOf(corrida), 1);
      });
    }

}
