import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/entities';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class TipoService {

  private _http:HttpClient = inject(HttpClient);


  getTipos():Observable<Array<Tipo>>{

      return this._http.get<Array<Tipo>>(`${URL_API}tipos`);

  }


  getTiposActivos():Observable<Array<Tipo>>{

      return this._http.get<Array<Tipo>>(`${URL_API}tipos-activos`);

  }



  getTipo(id:number):Observable<Tipo>{

      return this._http.get<Tipo>(`${URL_API}tipo/${id}`);

  }


  addTipo(tipo:Tipo):Observable<Tipo>{

    return this._http.post<Tipo>(`${URL_API}tipo`,tipo);
  }


  updateTipo(tipo:Tipo):Observable<Tipo>{

    return this._http.put<Tipo>(`${URL_API}tipo`,tipo);
  }
  
}
