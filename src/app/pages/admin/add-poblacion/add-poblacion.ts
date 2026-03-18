import { Component, inject, signal } from '@angular/core';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { Router } from '@angular/router';
import { Poblacion } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { ProvinciaService } from '../../../core/services/provincia-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-poblacion',
  imports: [Preloader,FormsModule],
  templateUrl: './add-poblacion.html',
  styleUrl: './add-poblacion.css',
})
export class AddPoblacion {

  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router = inject(Router);

 // provincias:Array<Provincia> = [];
 cargaCompletada=signal<boolean>(false);

  poblacion:Poblacion={

    nombre:"",
    cp:"",
    provincia:{

      nombre:""
    }

  }


  ngOnInit(): void {
    this.getDatos();
  }



  getDatos():void{

    this._provinciaService.getProvincias().subscribe({

      next: (datos) => {this.aProvincias = datos }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga() }
    });



  }

  add():void{

    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.addPoblacion(this.poblacion).subscribe({

      next: (datos) => {

        this._provinciaService.set(datos);
        this.cargaCompletada.set(true);

        
      }
      ,
      complete: () => {}
    });
  }




  


}
