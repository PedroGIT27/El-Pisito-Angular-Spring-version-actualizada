import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagina } from '../models/entities';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class PaginaService {
  
    private _http:HttpClient = inject(HttpClient);


  getPaginas():Observable<Array<Pagina>>{

      return this._http.get<Array<Pagina>>(`${URL_API}paginas`);

  }


  getPaginasActivas():Observable<Array<Pagina>>{

      return this._http.get<Array<Pagina>>(`${URL_API}paginas-activas`);

  }



  getPagina(id:number):Observable<Pagina>{

      return this._http.get<Pagina>(`${URL_API}pagina/${id}`);

  }


  addPagina(pagina:Pagina):Observable<Pagina>{

    return this._http.post<Pagina>(`${URL_API}pagina`,pagina);
  }


  updatePagina(pagina:Pagina):Observable<Pagina>{

    return this._http.put<Pagina>(`${URL_API}pagina`,pagina);
  }

  getPaginaPorNombre(nombre:string):Observable<Pagina>{

      return this._http.get<Pagina>(`${URL_API}paginaid/${nombre}`);

  }


}
