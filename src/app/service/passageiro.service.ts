import Passageiro from '../models/passageiro.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
// import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
@Injectable()
export class PassageiroService {

  api_url = 'https://fernando-corrida-teste.herokuapp.com/api/passageiros';
  passageiroUrl = this.api_url;



  constructor( private http: Http ){

  }

  createPassageiro( passageiro: Passageiro): Observable<Passageiro> {

    // return this.http.post(`${this.PassageiroUrl}`, Passageiro);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.passageiroUrl, passageiro, options)
                     .map((res: Response) => res.json())
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getPassageiros(): Observable<Passageiro[]> {

    return this.http.get(this.passageiroUrl)
    .map( (resposta: Response) => <Passageiro[]>resposta.json().data.docs);
    }

  editarPassageiro( passageiro: Passageiro ) {

    const editUrl = `${this.passageiroUrl}`;

    return this.http.put(editUrl, passageiro);
  }

  deletarPassageiro(id: String): any {

    const deletUrl = `${this.passageiroUrl}/${id}`;
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
