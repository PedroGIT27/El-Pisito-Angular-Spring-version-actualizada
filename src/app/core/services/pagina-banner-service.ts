import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BannerIdDTO, BannerImagenDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class PaginaBannerService {
  

   private _http:HttpClient = inject(HttpClient);

    //Este método añade un banner a una página
  addBannerToPagina(paginaId:number,bannerId:number):Observable<BannerImagenDTO>{

    const params = new HttpParams()
          .set('paginaId',paginaId)
          .set('bannerId',bannerId);

    return this._http.post<BannerImagenDTO>(`${URL_API}pagina-banner`,null,{params});

  }


  //Este método elimina un banner de una página
  deleteBannerToPagina(paginaId:number,bannerId:number):Observable<BannerImagenDTO>{

    const params = new HttpParams()
          .set('paginaId',paginaId)
          .set('bannerId',bannerId);

    return this._http.delete<BannerImagenDTO>(`${URL_API}pagina-banner`,{params});

  }


  //Este método devuelve los banners de una página con el id de la página
  getBannersPagina(idPagina:number):Observable<Array<BannerImagenDTO>>{

    return this._http.get<Array<BannerImagenDTO>>(`${URL_API}banners-pagina/${idPagina}`);

  }


  //Este método devuelve los id de los banners de una página con el id de la página
  getBannersIdPagina(idPagina:number):Observable<Array<BannerIdDTO>>{

    return this._http.get<Array<BannerIdDTO>>(`${URL_API}bannersid-pagina/${idPagina}`);

  }



}
