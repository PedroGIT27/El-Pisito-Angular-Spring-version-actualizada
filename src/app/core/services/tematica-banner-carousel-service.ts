import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BannerCarouselIdDTO, BannerCarouselImagenDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class TematicaBannerCarouselService {

    

   private _http:HttpClient = inject(HttpClient);

    //Este método añade un banner carousel a una temática
  addBannerCarouselToTematica(tematicaId:number,bannerCarouselId:number):Observable<BannerCarouselImagenDTO>{

    const params = new HttpParams()
          .set('tematicaId',tematicaId)
          .set('bannerCarouselId',bannerCarouselId);

    return this._http.post<BannerCarouselImagenDTO>(`${URL_API}tematica-bannercarousel`,null,{params});

  }


  //Este método elimina un banner Carousel de una temática
  deleteBannerCarouselToTematica(tematicaId:number,bannerCarouselId:number):Observable<BannerCarouselImagenDTO>{

    const params = new HttpParams()
          .set('tematicaId',tematicaId)
          .set('bannerCarouselId',bannerCarouselId);

    return this._http.delete<BannerCarouselImagenDTO>(`${URL_API}tematica-bannercarousel`,{params});

  }


  //Este método devuelve los banners Carousel de una temática con el id de la temática
  getBannersCarouselTematica(idTematica:number):Observable<Array<BannerCarouselImagenDTO>>{

    return this._http.get<Array<BannerCarouselImagenDTO>>(`${URL_API}bannerscarousel-tematica/${idTematica}`);

  }


  //Este método devuelve los id de los banners Carousel de una temática con el id de la temática
  getBannersCarouselIdTematica(idTematica:number):Observable<Array<BannerCarouselIdDTO>>{

    return this._http.get<Array<BannerCarouselIdDTO>>(`${URL_API}bannerscarouselid-tematica/${idTematica}`);

  }
  
}
