import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListInmueble } from '../../../shared/components/list-inmueble/list-inmueble';
import { ActivatedRoute } from '@angular/router';
import { FinderData } from '../../../core/models/auxiliars';
import { Subscription } from 'rxjs';
import { NoInmueble } from '../../../shared/components/no-inmueble/no-inmueble';
import { ContenedorBanners } from '../../../shared/components/contenedor-banners/contenedor-banners';

@Component({
  selector: 'app-inmuebles-finder',
  imports: [ListInmueble,ContenedorBanners],
  templateUrl: './inmuebles-finder.html',
  styleUrl: './inmuebles-finder.css',
})
export class InmueblesFinder implements OnInit, OnDestroy {

   private _route:ActivatedRoute=inject(ActivatedRoute);

  ngOnInit(): void {
     
    this.getDatos();

   }

  ngOnDestroy(): void {
     this.suscripcion.unsubscribe();
  }

   datosFinder:FinderData={

    idTipo:0,
    idPoblacion:0,
    idOperacion:0
   }

   suscripcion:Subscription;

   getDatos():void{

    //Observable de tipo Hot
      this.suscripcion = this._route.params.subscribe({

        next: (params) => {

            this.datosFinder.idTipo = params['idTipo'];
            this.datosFinder.idPoblacion = params['idPoblacion'];
            this.datosFinder.idOperacion = params['idOperacion'];
        }
      });

  }

}


