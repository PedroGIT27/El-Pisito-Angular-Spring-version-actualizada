import { Component, inject, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { ActivatedRoute, Router } from '@angular/router';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { Poblacion, Provincia } from '../../../core/models/entities';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { URL_MEDIA } from '../../../core/environments/globals';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-poblacion',
  imports: [Preloader,FormsModule,NgClass],
  templateUrl: './edit-poblacion.html',
  styleUrl: './edit-poblacion.css',
})
export class EditPoblacion {

  private _poblacionService:PoblacionService=inject(PoblacionService);
  private _provinciaService:ProvinciaService=inject(ProvinciaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  poblacion:Poblacion;
  id:number;
  suscripcion:Subscription;
  provincias=signal<Array<Provincia>>([]);
  cargaCompletada=signal<boolean>(false);

 



  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  // getDatos():void{

  //   //conseguimos el id de la ruta (Observable hot)
  //   this.suscripcion = this._route.params.subscribe({

  //     next:(params)=> {this.id = params['id'] }
  //   });

  //   this._poblacionService.getPoblacion(this.id).subscribe({

  //     next: (datos) => {this.poblacion = datos}
  //     ,
  //     error: (error) => {this._router.navigate(["/error"])}
  //     ,
  //     complete: () => { this.faseCarga() }

  //   });
getDatos(): void {

  this.suscripcion = this._route.paramMap.pipe(

    map(params => this.id = Number(params.get("id"))),

    switchMap(id =>
      forkJoin({
        poblacion: this._poblacionService.getPoblacion(id),
        provincias: this._provinciaService.getProvincias()
      })
    )

  ).subscribe({

    next: (datos) => {
      this.poblacion = datos.poblacion;
      this.provincias.set(datos.provincias);
      this.cargaCompletada.set(true);
    },

    error: () => this._router.navigate(["/error"])

  });

}


    // this._provinciaService.getProvincias().subscribe({

    //   next: (datos) => {this.aProvincias = datos}
    //   ,
    //   error: (error) => {this._router.navigate(["/error"])}
    //   ,
    //   complete: () => { this.faseCarga() }

    // });




  


  edit():void{

    this.poblacion.activo = Number(this.poblacion.activo);
    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.updatePoblacion(this.poblacion).subscribe({

      next: (datos) => {



      }
     
     

    });




  }


  ///////////////////////////////////////////////////////
  // faseCarga():void{

  //   this.fasesCargadas++;

  //   if(this.fasesCargadas == this.nFases){

  //     this.cargaCompletada = true;
  //   }
  // }
  //////////////////////////////////////////////////////


}

