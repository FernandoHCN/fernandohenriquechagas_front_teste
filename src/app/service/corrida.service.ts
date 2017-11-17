import Corrida from '../models/corrida.model';
import Motorista from '../models/motorista.model';
import Passageiro from '../models/passageiro.model';

import { MotoristaService } from './motorista.service';
import { PassageiroService } from './passageiro.service';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
// import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';
@Injectable()
export class CorridaService {

  api_url = 'https://fernando-corrida-teste.herokuapp.com/api/corridas';
  corridaUrl = this.api_url;

  public listaMotorista: Motorista[];
  public motorista: Motorista;
  public passageiro: Passageiro;

  constructor(
          private http: Http,
          private motoristaService: MotoristaService,
          private passageiroService: PassageiroService )
  {

  }

  createCorrida( corrida: Corrida): Observable<Corrida> {


    const headers = new Headers({ 'content-type': 'application/json',
                                  'cache-control': 'no-cache' });
    const options = new RequestOptions({ headers: headers });

    console.log('Motoristas dentro de corrida: ', corrida.motorista);

    // console.log('Passageiro dentro de corrida: ', corrida.passageiro);
   // console.log('JSON:', JSON.stringify(corrida, null, '\t'));

    return this.http.post(this.corridaUrl, JSON.stringify(corrida, null, '\t'), options)
                     .map((res: Response) => console.log(res.json()))
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getCorridas(): Observable<Corrida[]> {

    return this.http.get(this.corridaUrl)
    .map( (resposta: Response) => <Corrida[]>resposta.json().data.docs);
    }

  editarCorrida( corrida: Corrida ) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    const options = new RequestOptions({ headers: headers });

    const editUrl = `${this.corridaUrl}`;

    return this.http.put(editUrl, corrida, options);
  }

  deletarCorrida(id: String): any {

    const deletUrl = `${this.corridaUrl}/${id}`;
    return this.http.delete(deletUrl)
    .map( res => {
      return res;
    });
  }

  private handleError( error: any): Promise<any> {

    console.error('Ocorreu um erro', error);
    return Promise.reject(error.message || error );

  }

}
