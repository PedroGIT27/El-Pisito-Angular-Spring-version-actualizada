import { AfterViewInit, Component, inject, Input, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FavoritosService } from '../../../core/services/favoritos-service';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { ModalData } from '../../../core/models/auxiliars';
import { ModalService } from '../../../core/services/modal-service';



@Component({
  selector: 'app-corazon-favoritos',
  imports: [RouterLink],
  providers:[ControlCargaService],
  templateUrl: './corazon-favoritos.html',
  styleUrl: './corazon-favoritos.css',
})
export class CorazonFavoritos implements OnInit {



 @Input() elInmueble:InmuebleImagenDTO;


 esFavorito=signal<boolean>(false);
 esFavoritoAux:boolean;

 inmueble:InmuebleImagenDTO;
 inmueblesFavoritos:Array<InmuebleIdDTO>=[];

 
 public _authService:AuthService = inject(AuthService);
 private _favoritoService:FavoritosService = inject(FavoritosService);
 public _controlCargaService:ControlCargaService = inject(ControlCargaService);
 private _router:Router=inject(Router);
 private _modalService:ModalService=inject(ModalService);

 modalData:ModalData = {

    titulo:"",
    mensaje:"",
    imagen:""

 }

  ngOnInit(): void {

   this._controlCargaService.nFases.set(1);

   if(this._authService.isLoggedIn()){

      this.getFavoritos();

   }else{

    this._controlCargaService.faseCarga();

   }
   
 }



 getFavoritos():void{

  this._favoritoService.getFavoritosId(this._authService.usuario()!.id).subscribe({

    next: (inmuebles:Array<InmuebleIdDTO>)=>{ 
      
      this.inmueblesFavoritos = inmuebles

      this.esFavoritoAux = this.inmueblesFavoritos.some( fav => fav.id === this.elInmueble.id);
      this.esFavorito.set(this.esFavoritoAux);
    
    
    },

    complete: () => {this._controlCargaService.faseCarga();}


  });


 }



 addFavorito():void{

  //Puede ocurrir que nos loguemos "aparezcan" los botones de corazón addFavorito o deleteFavorito
  //y que estén en pantalla mientras la fecha de caducidad del token expira. Entonces cuando
  //pulsamos estos botones no estando logueados no daría un error que evita este if
    if(this._authService.isLoggedIn()){

          this._favoritoService.addFavorito( this._authService.usuario()!.id, this.elInmueble.id).subscribe({

            next: (inmueble:InmuebleImagenDTO)=>{ 

              this.inmueble = inmueble;
            
              this.modalData.titulo = "Nuevo favorito";
              this.modalData.mensaje= `El inmueble situado en la ${this.inmueble.via} ${this.inmueble.nombreVia} de ${this.inmueble.poblacion.nombre} (${this.inmueble.poblacion.provincia.nombre}) con un precio de ${this.inmueble.precio}€ se ha añadido a su lista de favoritos`;
              this.modalData.imagen= "ok-modal.png";
            
            
            },

            complete: () => {
              this.esFavorito.set(true); //para cambiar el corazon
              //modalService.open() COMPONENTE--> signal cambia --> Angular ejecuta effect (en app.ts) --> 
              //ANGULAR ACTUALIZA EL DOM --> modal.show()
              this._modalService.open(this.modalData);           
            }


          });
    }else{

      this._router.navigate(["/auth/login"]);

      
    }




 }

 deleteFavorito():void{

    //Puede ocurrir que nos loguemos "aparezcan" los botones de corazón addFavorito o deleteFavorito
    //y que estén en pantalla mientras la fecha de caducidad del token expira. Entonces cuando
    //pulsamos estos botones no estando logueados no daría un error que evita este if
      if(this._authService.isLoggedIn()){


        this._favoritoService.deleteFavorito( this._authService.usuario()!.id, this.elInmueble.id).subscribe({

        next: (inmueble:InmuebleImagenDTO)=>{ 
          this.inmueble = inmueble;
            
          this.modalData.titulo = "Eliminar favorito";
          this.modalData.mensaje= `El inmueble situado en la ${this.inmueble.via} ${this.inmueble.nombreVia} de ${this.inmueble.poblacion.nombre} (${this.inmueble.poblacion.provincia.nombre}) con un precio de ${this.inmueble.precio}€ se ha eliminado de su lista de favoritos`;
          this.modalData.imagen= "ok-modal.png";

          this._modalService.open(this.modalData); 
        
        
        },

        complete: () => {
          this.esFavorito.set(false);
          
        }


      });



      }else{

        this._router.navigate(["/auth/login"]);
        
      }

 }



}
