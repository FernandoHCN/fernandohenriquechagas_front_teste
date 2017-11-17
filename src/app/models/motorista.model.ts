class Motorista {

  _id: string;
  nome: String;
  dataNascimento: String;
  CPF: String;
  carroModelo: String;
  status: String;
  sexo: String;

  constructor() {

    this.nome = '';
    this.dataNascimento = '';
    this.CPF = '';
    this.carroModelo = '';
    this.status = '';
    this.sexo = '' ;
  }

}

export default Motorista;
