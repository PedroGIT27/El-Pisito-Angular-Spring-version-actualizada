import { Component, inject } from '@angular/core';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { Router } from '@angular/router';
import { Provincia } from '../../../core/models/entities';

@Component({
  selector: 'app-add-provincia',
  imports: [],
  templateUrl: './add-provincia.html',
  styleUrl: './add-provincia.css',
})
export class AddProvincia {




  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router=inject(Router);




  provincia:Provincia={

    nombre:""

  }


  add():void{

    this.provincia.nombre = this.provincia.nombre.toUpperCase();

    this._provinciaService.addProvincia(this.provincia).subscribe({

      next: (datos) => {

        // this.datosModal.titulo = "+Provincia";
        // this.datosModal.status = "201";
        // this.datosModal.mensaje = "Provincia añadida con éxito";
        // this.datosModal.origen = "provincia";
        // this.modalAdmin.showModal();


      } //Devuelve el objeto creado
     
    });


  }


}
