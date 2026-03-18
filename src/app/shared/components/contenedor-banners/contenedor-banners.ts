import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { PaginaBannerService } from '../../../core/services/pagina-banner-service';
import { PaginaService } from '../../../core/services/pagina-service';
import { Pagina } from '../../../core/models/entities';
import { BannerImagenDTO } from '../../../core/models/dtos';
import { switchMap } from 'rxjs';
import { Banner } from "../banner/banner";
import { Preloader } from "../preloader/preloader";

@Component({
  selector: 'app-contenedor-banners',
  imports: [Banner, Preloader],
  providers:[ControlCargaService],
  templateUrl: './contenedor-banners.html',
  styleUrl: './contenedor-banners.css',
})
export class ContenedorBanners implements OnInit {

  //dondeEstoy tiene que coincidir con uno de los nombres de la entidad Pagina de la API:
  //home
  //consultor-hipotecas
  //nuestros-servicios
  //inmuebles-finder
  //contacto
  //inmobiliaria
  //mapa-web
  //publica-anuncio
  //sobre-nosotros
  //favoritos-usuario
  //detail-inmueble


  @Input() dondeEstoy:string;

  idPagina:number;
  banners = signal<Array<BannerImagenDTO>>([]);

  public _controlCargaService:ControlCargaService=inject(ControlCargaService);
  private _paginaBannerService:PaginaBannerService= inject(PaginaBannerService);
  private _paginaService:PaginaService=inject(PaginaService);

  ngOnInit(): void {

    this._controlCargaService.nFases.set(1);
    this.getDatos();
  }



   getDatos():void{

     this._paginaService.getPaginaPorNombre(this.dondeEstoy).pipe(

          switchMap( (datos:Pagina) => {

            this.idPagina = datos.id!;
            //Antes de hacer la llamada, swithMap nos garantiza que el idPagina ha llegado
            return this._paginaBannerService.getBannersPagina(this.idPagina);//devolvemos un Observable


    })).subscribe({ //nos suscribimos a él

          next: (datos:Array<BannerImagenDTO>) => {
            this.banners.set(datos);
            this._controlCargaService.faseCarga();
          
          }
            
    });
     
  

  }//end getDatos

}



