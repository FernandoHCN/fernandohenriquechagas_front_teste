import Passageiro from '../models/passageiro.model';
import Motorista from '../models/motorista.model';

class Corrida {
  _id: string;
  motorista: Motorista;
  passageiro: Passageiro;
  valorCorrida: Number;

  constructor() {

    this.motorista = new Motorista();
    this.passageiro = new Passageiro();
    this.valorCorrida = 0;

  }

}



export default  Corrida;
