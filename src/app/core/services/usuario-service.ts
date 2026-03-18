import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/entities';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';
import { UsuarioDTO } from '../models/dtos';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private _http:HttpClient= inject(HttpClient);


  addUsuario(usuario:Usuario):Observable<UsuarioDTO>{


    return this._http.post<UsuarioDTO>(`${URL_API}usuario`,usuario)
    
  }
  
}
