import { Component, inject, ViewChild } from '@angular/core';
import { TipoService } from '../../../core/services/tipo-service';
import { ModalData } from '../../../core/models/auxiliars';
import { Tipo } from '../../../core/models/entities';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tipo',
  imports: [FormsModule],
  templateUrl: './add-tipo.html',
  styleUrl: './add-tipo.css',
})
export class AddTipo {
    
    private _tipoService:TipoService = inject(TipoService);
     private _router:Router = inject(Router);


    // datosModal:ModalData={

    //   titulo:"",
    //   status:"",
    //   mensaje:"",
    //   origen:""

    // };

    tipo:Tipo={

      nombre:""

    }


    add():void{

      this.tipo.nombre = this.tipo.nombre.toUpperCase();

      this._tipoService.addTipo(this.tipo).subscribe({

        next: (datos:Tipo) => {

        


        } //Devuelve el objeto creado
       
    
      });


    }


}
