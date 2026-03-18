import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Credenciales, CredencialesRespuesta, UsuarioDTO } from '../models/dtos';
import { URL_API, URL_AUTH } from '../environments/globals';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  isLoggedIn = signal<boolean>(false);
  usuario = signal<UsuarioDTO | null>(null);
  //"Todavía no se si el usuario está logueado o no". Todavía no hemos llamado a getMe
  // En esta ocasión la vamos a utilizar en el menú principal para evitar un efecto que se
  //llama "flicker visual" (en el caso de estar logueados vamos a ver durante una décima
  //de segundo el menú como si no estuviéromos logueados)
  loading = signal<boolean>(true); 


  private _http:HttpClient = inject(HttpClient);
  private _router:Router = inject(Router);


  login(datos:Credenciales):void{

    this._http.post<UsuarioDTO>(`${URL_AUTH}login`,datos).subscribe({

      next: (u:UsuarioDTO) => {

          this.usuario.set(u);
          this.isLoggedIn.set(true);
          this.loading.set(false);

      }
      ,
      complete: () => {  this._router.navigate(["/"])}
    });
  }

  //LLAMAR SOLO CUANDO EL USUARIO DESEA HACER LOGOUT VOLUNTARIO
  logout():void{

   this._http.get<CredencialesRespuesta>(`${URL_AUTH}logout`).subscribe({

    next: (cr:CredencialesRespuesta) => {
        //cr.mensaje
        this.resetEstado();
    }
    ,
    complete: () => {  this._router.navigate(["/auth/login"])}
    
   });
  }


  //LO LLAMAMOS DESDE EL INTERCETOR error-interceptor
  //CUANDO SE PRODUCE UN 401
  //TAMBIÉN LO LLAMAMOS DESDE getMe
  resetEstado():void{

      this.usuario.set(null);
      this.isLoggedIn.set(false);
      this.loading.set(false);

  }


  //LO LLAMAMOS, ENTRE OTROS CASOS, CUANDO INICIAMOS LA SESIÓN
  getMe():void{

    this._http.get<UsuarioDTO>(`${URL_API}me`).subscribe({

      next: (u:UsuarioDTO) => {

        if(u.id){
          this.usuario.set(u);
          this.isLoggedIn.set(true);
          this.loading.set(false);
        }else{
          this.resetEstado();
        }

      }

    });

    
  }
  
}
