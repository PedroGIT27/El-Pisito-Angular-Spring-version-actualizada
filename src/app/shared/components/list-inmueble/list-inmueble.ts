import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { FavoritosService } from '../../../core/services/favoritos-service';
import { AuthService } from '../../../core/services/auth-service';
import { FinderData } from '../../../core/models/auxiliars';

import { Preloader } from '../preloader/preloader';
import { FichaInmueble } from '../ficha-inmueble/ficha-inmueble';
import { NoInmueble } from "../no-inmueble/no-inmueble";

@Component({
  selector: 'app-list-inmueble',
  imports: [Preloader, FichaInmueble, NoInmueble],
  providers:[],
  templateUrl: './list-inmueble.html',
  styleUrl: './list-inmueble.css',
})
export class ListInmueble implements OnInit {


  //El objetivo de ListInmuble es albergar fichasInmueble
  //El ListInmueble puede estar en:
  //"home"   ---> getInmueblesPortada( no recibo nada )
  //"finder"   ---> getInmueblesFinder( recibo 3 datos: id de tipo, id de poblacion, id de operacion )
  //"inmobiliaria"  --> getInmueblesInmobiliaria( recibo el id de inmobiliaria )
  //"favoritos" --> getFavoritosDatos( recibo el id del usuario registerado)

  private _inmuebleService:InmuebleService=inject(InmuebleService);
  private _favoritosService:FavoritosService=inject(FavoritosService);
  private _authService:AuthService=inject(AuthService);

 

  @Input() dondeEstoy:string;
  @Input() finderData:FinderData;
  @Input() idInmobiliaria:number;

  cargaCompletada=signal<boolean>(false);


  usuarioId:number|undefined; //si el UsuarioDTO llega null
  //inmuebles:Array<InmuebleImagenDTO> = [];
  inmuebles = signal<Array<InmuebleImagenDTO>>([]);//Siempre que utilicemos una variable con @for o @if debe ser un signal


  ngOnInit(): void {


    this._authService.getMe();//actualizamos la info del usuario
    this.usuarioId = this._authService.usuario()?.id; //El UsuarioDTO es null si no estoy logueado. Por lo tanto el id sería undefined
    
    if(this.dondeEstoy == "home"){
      
      this.getInmueblesPortada();

    }else if(this.dondeEstoy == "favoritos"){

      this.getInmueblesFavoritos();

    }else if(this.dondeEstoy == "inmobiliaria"){

      this.getInmueblesInmobiliaria();

    }else if(this.dondeEstoy == "finder"){

      this.getInmueblesFinder();

    }

  }

  getInmueblesPortada():void{

    this._inmuebleService.getInmueblesPortada().subscribe({

      next:(datos:Array<InmuebleImagenDTO>) => {

        this.inmuebles.set(datos);  
             this.cargaCompletada.set(true);
      }
    

    });

  }//end getDatosPortada



  getInmueblesFavoritos():void{

    if(this.usuarioId){

      this._favoritosService.getFavoritosDatos(this.usuarioId).subscribe({

      next:(datos:Array<InmuebleImagenDTO>) => {
   
        this.inmuebles.set(datos); 
        this.cargaCompletada.set(true);
      
      
      }
       

      });

    }else{

      this._authService.logout();

    }
    

  }//end getInmueblesFavoritos


  getInmueblesInmobiliaria():void{

    console.log(this.idInmobiliaria);

    this._inmuebleService.getInmueblesInmobiliaria(this.idInmobiliaria).subscribe({

      next:(datos:Array<InmuebleImagenDTO>) => {

        this.inmuebles.set(datos); 
             this.cargaCompletada.set(true);
      }


    });

  }//end getInmueblesInmobiliaria



  getInmueblesFinder():void{

    this._inmuebleService.getInmueblesFinder(this.finderData.idTipo, this.finderData.idPoblacion,this.finderData.idOperacion).subscribe({

      next:(datos:Array<InmuebleImagenDTO>) => {

        this.inmuebles.set(datos); 
             this.cargaCompletada.set(true);
      
      }
      

    });

  }//end getInmueblesFinder






}
