import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { BannerImagenDTO, ImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit{

  @Input() datosBanner:BannerImagenDTO;

  private _router:Router = inject(Router);


  imagenes = signal<Array<ImagenDTO>>([]);
  urlMedia:string=URL_MEDIA;


  ngOnInit(): void {
    this.imagenes.set(this.datosBanner.imagenes);

  }


  destinoBanner():void{

    this._router.navigate(["/" + this.datosBanner.link]);
  }
}
