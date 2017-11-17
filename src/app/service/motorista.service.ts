import Motorista from '../models/motorista.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
// import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
@Injectable()
export class MotoristaService {

  api_url = 'https://fernando-corrida-teste.herokuapp.com/api/motoristas';
  motoristaUrl = this.api_url;



  constructor( private http: Http ){

  }

  createMotorista( motorista: Motorista): Observable<Motorista> {

    // return this.http.post(`${this.motoristaUrl}`, motorista);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('Service:', motorista);
    return this.http.post(this.motoristaUrl, motorista, options)
                     .map((res: Response) => res.json())
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getMotoristas(): Observable<Motorista[]> {

    return this.http.get(this.motoristaUrl)
    .map( (resposta: Response) => <Motorista[]>resposta.json().data.docs);
    }

  editarMotorista( motorista: Motorista ) {

    const editUrl = `${this.motoristaUrl}`;

    return this.http.put(editUrl, motorista);
  }

  deletarMotorista(id: String): any {

    const deletUrl = `${this.motoristaUrl}/${id}`;
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
