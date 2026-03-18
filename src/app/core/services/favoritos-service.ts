import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  
  private _http:HttpClient = inject(HttpClient);

  //Este método añade un inmueble como favorito de un usuario
  addFavorito(usuarioId:number,inmuebleId:number):Observable<InmuebleImagenDTO>{

    const params = new HttpParams()
          .set('usuarioId',usuarioId)
          .set('inmuebleId',inmuebleId);

    return this._http.post<InmuebleImagenDTO>(`${URL_API}favorito`,null,{params});

  }


  //Este método elimina un inmueble como favorito de un usuario
  deleteFavorito(usuarioId:number,inmuebleId:number):Observable<InmuebleImagenDTO>{

    const params = new HttpParams()
          .set('usuarioId',usuarioId)
          .set('inmuebleId',inmuebleId);

    return this._http.delete<InmuebleImagenDTO>(`${URL_API}favorito`,{params});

  }


  //Este método devuelve los InmuebleImagenDTO favoritos de un usuario
  getFavoritosDatos(id:number):Observable<Array<InmuebleImagenDTO>>{

    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}favoritos-usuario/${id}`);

  }

  //Este método devuelve los id de los inmuebles favoritos de un usuario
  getFavoritosId(id:number):Observable<Array<InmuebleIdDTO>>{

    return this._http.get<Array<InmuebleIdDTO>>(`${URL_API}favoritosid-usuario/${id}`);

  }

  
}
