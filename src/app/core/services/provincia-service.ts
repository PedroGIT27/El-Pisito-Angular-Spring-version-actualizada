import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/entities';
import { URL_API } from '../environments/globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
 
 
  private _http:HttpClient = inject(HttpClient);


  getProvincias():Observable<Array<Provincia>>{

      return this._http.get<Array<Provincia>>(`${URL_API}poblaciones`);

  }


  getPoblacionesActivas():Observable<Array<Provincia>>{

      return this._http.get<Array<Provincia>>(`${URL_API}poblaciones-activas`);

  }



  getPoblacion(id:number):Observable<Provincia>{

      return this._http.get<Provincia>(`${URL_API}poblacion/${id}`);

  }


  addProvincia(poblacion:Provincia):Observable<Provincia>{

    return this._http.post<Provincia>(`${URL_API}poblacion`,poblacion);
  }


  updatePoblacion(poblacion:Provincia):Observable<Provincia>{

    return this._http.put<Provincia>(`${URL_API}poblacion`,poblacion);
  }
  
  
}
