import { Component, inject } from '@angular/core';
import { ListInmueble } from '../../../shared/components/list-inmueble/list-inmueble';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { URL_MEDIA } from '../../../core/environments/globals';
import { ContenedorBanners } from "../../../shared/components/contenedor-banners/contenedor-banners";

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble, Preloader, ContenedorBanners],
  providers:[ControlCargaService],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria {

     private _route:ActivatedRoute=inject(ActivatedRoute);
     private _inmobiliariaService:InmobiliariaService=inject(InmobiliariaService);
     public _controlCargaService:ControlCargaService=inject(ControlCargaService);

     url:string;
     alt:string;

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos();


   }

  ngOnDestroy(): void {
     this.suscripcion.unsubscribe();
  }

   idInmobiliaria:number;
   inmobiliaria:InmobiliariaImagenDTO;
   suscripcion:Subscription;


   getDatos():void{

    //Este patrón es el más recomendable cuando se trata de extraer parámetros de la URL
    this.suscripcion = this._route.paramMap.pipe( //paramMap emite cuando cambia la ruta

      map( params => this.idInmobiliaria = Number(params.get("id"))) //extrae id de la ruta (es un string)
      ,
      switchMap( id => this._inmobiliariaService.getInmobiliaria(id)) //utilizamos el resultado del map (id). Aquí estamos completamente seguros de que tenemos el id

    ).subscribe({ //nos suscribimos al resultado del pipe (un pipe siempre devuelve un Observable)

        next: (datos:InmobiliariaImagenDTO) => {
          this.inmobiliaria=datos
          this._controlCargaService.faseCarga();
          this.url = `${URL_MEDIA}${this.inmobiliaria.imagenes[0].url}`;
          this.alt = `${this.inmobiliaria.imagenes[0].altImagen}`;
        
        }

      });


  }//end getDatos

}//end class


