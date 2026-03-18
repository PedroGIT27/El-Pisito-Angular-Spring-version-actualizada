import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoService } from '../../../core/services/tipo-service';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { OperacionService } from '../../../core/services/operacion-service';
import { Router } from '@angular/router';
import { Operacion, Poblacion, Tipo } from '../../../core/models/entities';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { Preloader } from "../preloader/preloader";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-finder',
  imports: [FormsModule, Preloader],
  
  templateUrl: './finder.html',
  styleUrl: './finder.css',
})
export class Finder implements OnInit {


  
  tipos = signal<Array<Tipo>>([]);
  poblaciones = signal<Array<Poblacion>>([]); 
  operaciones = signal<Array<Operacion>>([]);

  tipoElegido:number;
  poblacionElegida:number;
  operacionElegida:number;
  cargaCompletada=signal<boolean>(false);

  private _tipoService:TipoService=inject(TipoService);
  private _poblacionService:PoblacionService=inject(PoblacionService);
  private _operacionService: OperacionService=inject(OperacionService);
  private _router:Router=inject(Router);


  ngOnInit(): void {
 
    this.getDatos();
  }


   getDatos():void{
//forkjoin sincroniza las llamadas y no las suscribe hasta que todas hayan sido resueltas.
forkJoin({

poblaciones:this._poblacionService.getPoblacionesActivas(),
tipos: this._tipoService.getTiposActivos(),
operaciones:this._operacionService.getOperacionesActivas()

}).subscribe({

  next:(result)=>{

    this.poblaciones.set(result.poblaciones);
    this.tipos.set(result.tipos);
    this.operaciones.set(result.operaciones);
    this.cargaCompletada.set(true);
  }

});  

  // //   this._poblacionService.getPoblacionesActivas().subscribe({

  // //     next: (datos:Array<Poblacion>) => { this.poblaciones.set(datos);}
  // //     ,
  // //     complete: () => {this._controlCargaService.faseCarga();}

  // //   });

  // //   this._tipoService.getTiposActivos().subscribe({

  // //     next: (datos:Array<Tipo>) => { this.tipos.set(datos);}
  // //     ,
  // //     complete: () => {this._controlCargaService.faseCarga();}

  // //   });

  // //   this._operacionService.getOperacionesActivas().subscribe({

  // //     next: (datos:Array<Operacion>) => { this.operaciones.set(datos);}
  // //     ,
  // //     complete: () => {this._controlCargaService.faseCarga();}

  // //   });


   }



  find():void{
   
   this._router.navigate(["/finder",this.tipoElegido,this.poblacionElegida,this.operacionElegida]);
    
  }

}
