import { Component, inject, OnInit, signal } from '@angular/core';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { TematicaService } from '../../../core/services/tematica-service';
import { Tematica } from '../../../core/models/entities';
import { BannerCarouselImagenDTO, ImagenDTO } from '../../../core/models/dtos';
import { switchMap } from 'rxjs';
import { Preloader } from "../preloader/preloader";
import { NgClass } from '@angular/common';
import { URL_MEDIA } from '../../../core/environments/globals';

@Component({
  selector: 'app-carousel-home',
  imports: [Preloader, NgClass],
  templateUrl: './carousel-home.html',
  styleUrl: './carousel-home.css',
})
export class CarouselHome implements OnInit{

  private _tematicaBannerCarouselService:TematicaBannerCarouselService = inject (TematicaBannerCarouselService);
  private _tematicaService:TematicaService =  inject(TematicaService);

  idTematica:number;
  bannersCarousel= signal<Array<BannerCarouselImagenDTO>>([]);
  cargaCompletada = signal<boolean>(false);
 
  urlMedia:string=URL_MEDIA;

  ngOnInit(): void {
    
    this.getDatos();
  }


     getDatos():void{
  
       this._tematicaService.getTematicaActual().pipe(
  
            switchMap( (datos:Tematica) => {
  
              this.idTematica = datos.id!;
              //Antes de hacer la llamada, swithMap nos garantiza que el idTematica ha llegado
              return this._tematicaBannerCarouselService.getBannersCarouselTematica(this.idTematica);//devolvemos un Observable
  
  
      })).subscribe({ //nos suscribimos a él
  
            next: (datos:Array<BannerCarouselImagenDTO>) => {
              this.bannersCarousel.set(datos);
              this.cargaCompletada.set(true);
        
            }
              
      });
       
    
  
    }//end getDatos


}

/*
 imagenes = signal<Array<ImagenDTO>>([]);
  urlMedia:string=URL_MEDIA;


  ngOnInit(): void {
    this.imagenes.set(this.datosBanner.imagenes);

  }


*/