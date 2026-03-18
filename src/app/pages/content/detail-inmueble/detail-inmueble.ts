import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { BotonAdmin } from "../../../shared/components/boton-admin/boton-admin";
import { CarouselFicha } from "../../../shared/components/carousel-ficha/carousel-ficha";
import { EurosPipe } from "../../../shared/pipes/euros-pipe";
import { Preloader } from "../../../shared/components/preloader/preloader";
import { ParentesisPipe } from "../../../shared/pipes/parentesis-pipe";
import { MetrosCuadradosPipe } from "../../../shared/pipes/metros-cuadrados-pipe";
import { MinusculasPipe } from "../../../shared/pipes/minusculas-pipe";
import { PlazasPipe } from "../../../shared/pipes/plazas-pipe";
import { SiNoPipe } from "../../../shared/pipes/si-no-pipe";
import { AmuebladoPipe } from "../../../shared/pipes/amueblado-pipe";
import { map, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { CorazonFavoritos } from "../../../shared/components/corazon-favoritos/corazon-favoritos";
import { ContenedorBanners } from "../../../shared/components/contenedor-banners/contenedor-banners";

@Component({
  selector: 'app-detail-inmueble',
  imports: [BotonAdmin, CarouselFicha, EurosPipe, Preloader, ParentesisPipe, MetrosCuadradosPipe, MinusculasPipe, PlazasPipe, SiNoPipe, AmuebladoPipe, CorazonFavoritos, ContenedorBanners],
  templateUrl: './detail-inmueble.html',
  styleUrl: './detail-inmueble.css',
})
export class DetailInmueble implements OnInit, OnDestroy{



  public _authService:AuthService = inject(AuthService);
  public _route:ActivatedRoute = inject(ActivatedRoute);
  public _inmuebleService:InmuebleService=inject(InmuebleService);

  cargaCompletada = signal<boolean>(false);
  datos:InmuebleImagenDTO;
  suscripcion:Subscription;
  idInmueble:number;

    ngOnInit(): void {

      this.getDatos();
    }

    ngOnDestroy(): void {
      this.suscripcion.unsubscribe();
    }


  
   getDatos():void{

    //Este patrón es el más recomendable cuando se trata de extraer parámetros de la URL
    this.suscripcion = this._route.paramMap.pipe( //paramMap emite cuando cambia la ruta

      map( params => this.idInmueble = Number(params.get("id"))) //extrae id de la ruta (es un string)
      ,
      switchMap( id => this._inmuebleService.getInmueble(id)) //utilizamos el resultado del map (id). Aquí estamos completamente seguros de que tenemos el id

    ).subscribe({ //nos suscribimos al resultado del pipe (un pipe siempre devuelve un Observable)

        next: (datos:InmuebleImagenDTO) => {

          this.datos = datos;
          this.cargaCompletada.set(true);
    
        }

      });


  }//end getDatos








}
