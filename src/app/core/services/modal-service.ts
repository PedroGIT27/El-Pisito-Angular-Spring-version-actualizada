import { Injectable, signal } from '@angular/core';
import { ModalData } from '../models/auxiliars';
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  

      //El servicio controla estado del modal, datos del modal, abrir y cerrar...

      modalData = signal<ModalData | null>(null);
      isOpen = signal(false);

      open(data:ModalData):void{
        
        this.modalData.set(data);
        this.isOpen.set(true); //cambia estado y ejecuta effect
      }

      close():void{

        this.isOpen.set(false); //cambia estado y ejecuta effect
        this.modalData.set(null); //Reseteamos los datos para que no de error

      }

}
