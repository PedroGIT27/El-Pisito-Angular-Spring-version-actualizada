import { Component, inject, OnInit, signal } from '@angular/core';
import { TematicaService } from '../../../core/services/tematica-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tematica } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tematica',
  imports: [Preloader,FormsModule],
  templateUrl: './edit-tematica.html',
  styleUrl: './edit-tematica.css',
})
export class EditTematica implements OnInit{


  private _tematicaService:TematicaService=inject(TematicaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  tematica:Tematica;
  id:number;
  suscripcion:Subscription;
  cargaCompletada = signal<boolean>(false);


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
      switchMap( id => this._tematicaService.getTematica(id)) //utilizamos el resultado del map (id). Aquí estamos completamente seguros de que tenemos el id

    ).subscribe({ //nos suscribimos al resultado del pipe (un pipe siempre devuelve un Observable)

        next: (datos:Tematica) => {
 
          this.tematica = datos;
          this.cargaCompletada.set(true);
        }

      });


  }//end getDatos






  edit():void{

    this.tematica.activo = Number(this.tematica.activo);
    this.tematica.nombre = this.tematica.nombre.toUpperCase();

    this._tematicaService.updateTematica(this.tematica).subscribe({

        next: (datos:Tematica) => {this._router.navigate(["/admin/list-tematica"])}     

    });

  }


}
