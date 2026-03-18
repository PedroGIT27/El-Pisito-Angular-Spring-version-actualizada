import { Component, inject, OnInit, signal } from '@angular/core';
import { TipoService } from '../../../core/services/tipo-service';
import { TematicaDTO, Tipo } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tipo',
  imports: [Preloader,NgClass,RouterLink],
  templateUrl: './list-tipo.html',
  styleUrl: './list-tipo.css',
})
export class ListTipo implements OnInit{
  /////////////////////////////////////////////////
  nFases:number = 1;
 
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _tipoService:TipoService = inject(TipoService);


datos=signal<Array<TematicaDTO>>

  aDatos:Array<Tipo>= [];
  cargaCompletada=signal<boolean>(false)

  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._tipoService.getTipos().subscribe({

      next: (datos) => {this.datos.set(true),
        this.cargaCompletada.set(true);
      }
 
    });



  }

    ///////////////////////////////////////////////////////
    faseCarga():void{

      this.fasesCargadas++;

      if(this.fasesCargadas == this.nFases){

        this.cargaCompletada = true;
      }
    }
    //////////////////////////////////////////////////////




}
