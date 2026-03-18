import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorStoreService {

    errorStatus = signal<number>(404);
    errorMensaje = signal<string>("El contenido que estás buscando no existe");

    setErrorStatus(status:number):void{

      this.errorStatus.set(status);
    }

    setErrorMensaje(mensaje:string):void{

      this.errorMensaje.set(mensaje);
    }

  
}
