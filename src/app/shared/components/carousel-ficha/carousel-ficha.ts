import { Component, Input, OnInit, signal } from '@angular/core';
import { ImagenDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { NgClass } from '@angular/common';
import { GadgetNumeroImagenes } from '../gadget-numero-imagenes/gadget-numero-imagenes';
import { GadgetLogoInmobiliaria } from '../gadget-logo-inmobiliaria/gadget-logo-inmobiliaria';
import { GadgetOportunidad } from '../gadget-oportunidad/gadget-oportunidad';

@Component({
  selector: 'app-carousel-ficha',
  imports: [NgClass,GadgetNumeroImagenes,GadgetLogoInmobiliaria,GadgetOportunidad],
  templateUrl: './carousel-ficha.html',
  styleUrl: './carousel-ficha.css',
})
export class CarouselFicha implements OnInit {


  @Input() datos:InmuebleImagenDTO;
  @Input() dondeEstoy:string;

  imagenes = signal<Array<ImagenDTO>>([]);
  urlMedia:string=URL_MEDIA;
   //La propiedad url de las imágenes llega así: '/api/imagenes/inmueble/2/d9442207-aa02-48d3-a3c6-9ccd5c9a7a82.jpg'

    ngOnInit(): void {
    this.imagenes.set(this.datos.imagenes);

  }

  

}
