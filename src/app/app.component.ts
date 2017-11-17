import { Component, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import Motorista from '../app/models/motorista.model';
import { MotoristaService } from '../app/service/motorista.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 //  @ViewChild('formulario') public formulario: NgForm;

  constructor( private motoristaService: MotoristaService ){ }

  public novoMotorista: Motorista = new Motorista();
  public auxMotorista: Motorista = new Motorista();

  public listaMotorista: Motorista[];
  public editMotoristas: Motorista[] = [];

  ngOnInit(): void {

    this.motoristaService.getMotoristas()
    .subscribe( (motoristas: Motorista[]) => {
      this.listaMotorista = motoristas;
      console.log(motoristas);
    });

  }



  create() {
    this.motoristaService.createMotorista(this.novoMotorista)
      .subscribe( (motoristas: Motorista) => {
        // this.listaPassageiro.push(passageiros);
        this.motoristaService.getMotoristas()
        .subscribe( (motoristas1: Motorista[]) => {
          this.listaMotorista = motoristas1;
          console.log(motoristas);
        });
        this.novoMotorista = new Motorista();
      });

  }
  editMotorista(motorista: Motorista) {
    console.log(motorista);

    if (this.listaMotorista.includes(motorista)) {
      if (!this.editMotoristas.includes(motorista)) {
        this.editMotoristas.push(motorista);
      }else{
        this.editMotoristas.splice(this.editMotoristas.indexOf(motorista), 1);
        this.motoristaService.editarMotorista(motorista).subscribe(res => {
          console.log('atualizado com sucesso');
        }, err => {
          this.editMotorista(motorista);
          console.error('Falha na atualização');

        });
      }
    }
  }

  doneMotorista(motorista: Motorista) {
    // motorista.status = 'Done';
    this.motoristaService.editarMotorista(motorista).subscribe(res => {
      this.editMotorista((motorista));
      console.log('Atualizado com Sucesso');
    }, err => {
      this.editMotorista(motorista);
      console.error('Erro ao atualizar');
    });
  }

  submitMotorista(event, motorista: Motorista){
    if (event.keyCode === 13){
      this.editMotorista(motorista);
    }
}
deleteMotorista(motorista: Motorista) {
  this.motoristaService.deletarMotorista(motorista._id).subscribe(res => {
    this.listaMotorista.splice(this.listaMotorista.indexOf(motorista), 1);

  });
}


}
