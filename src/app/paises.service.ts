import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Los observables tienen que ver con la programación reactiva. 
//RXJS es la librería que permite implementar la programación
//reactiva.
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  paisesURL = 'http://localhost:8080/paises?';
  constructor(private httpClient: HttpClient) { }

  public paises(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get<any>(this.paisesURL + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
}
