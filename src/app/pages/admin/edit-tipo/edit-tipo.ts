import { Component, inject, OnInit, signal } from '@angular/core';
import { TipoService } from '../../../core/services/tipo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tipo',
  imports: [Preloader,FormsModule],
  templateUrl: './edit-tipo.html',
  styleUrl: './edit-tipo.css',
})
export class EditTipo implements OnInit{

  private _tipoService:TipoService=inject(TipoService);
  private _route:ActivatedRoute = inject(ActivatedRoute);
   private _router:Router=inject(Router);

  tipo:Tipo;
  id:number;
  suscripcion:Subscription;
  cargaCompletada=signal<boolean>(false);

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

     //Este patrón es el más recomendable cuando se trata de extraer parámetros de la URL
    this.suscripcion = this._route.paramMap.pipe( //paramMap emite cuando cambia la ruta

      map( params => this.id = Number(params.get("id"))) //extrae id de la ruta (es un string)
      ,
      switchMap( id => this._inmobiliariaService.getInmobiliaria(id)) //utilizamos el resultado del map (id). Aquí estamos completamente seguros de que tenemos el id

    ).subscribe({ //nos suscribimos al resultado del pipe (un pipe siempre devuelve un Observable)

        next: (datos:Tipo) => {
          this.inmobiliaria=datos
          this._controlCargaService.faseCarga();
          this.url = `${URL_MEDIA}${this.inmobiliaria.imagenes[0].url}`;
          this.alt = `${this.inmobiliaria.imagenes[0].altImagen}`;
        
        }

      });



    //end getDatos

  }


  edit():void{

    this.tipo.activo = Number(this.tipo.activo);
    this.tipo.nombre = this.tipo.nombre.toUpperCase();

    this._tipoService.updateTipo(this.tipo).subscribe({

      next: (datos) => {this._router.navigate(["/admin/list-tipos"])}
    

    });




  }





}
