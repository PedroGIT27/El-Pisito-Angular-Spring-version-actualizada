import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipal } from './shared/components/menu-principal/menu-principal';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { AuthService } from './core/services/auth-service';
import { ModalService } from './core/services/modal-service';


declare var bootstrap:any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,MenuPrincipal,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {

constructor(){

  
    effect(() =>{ //CONTROLAMOS ABRIR Y CERRAR

      const abierto:boolean = this._modalService.isOpen();

      if (!this.ventanaModal) return;
      
      if(abierto){
        this.ventanaModal.show();
      }else{
        this.ventanaModal.hide();
      }

    } );
}

  //app inicia --> _authService.getMe() --> GET /me (cookie HttpOnly a API) 
  // --> API valida token  --> signal isLoggedIn = true o false y signal loading se pone false--> 
  // --> menú se actualiza reactivamente

  private _authService:AuthService=inject(AuthService);
  public _modalService:ModalService = inject(ModalService);

  ventanaModal:any;


    @ViewChild('generalModal') ventanaModalGeneral:ElementRef;

    ngOnInit(): void {

     this._authService.getMe();
     
    }

  ngAfterViewInit(): void {
    //Creamos una instancia de Bootstrap 5 Modal
    this.ventanaModal = new bootstrap.Modal(this.ventanaModalGeneral.nativeElement);

    //setTimeout( () => this.ventanaModalGeneral.nativeElement.addEventListener('hidden.bs.modal',() => {console.log("entro en listener"); this._modalService.close();}) );

    this.ventanaModalGeneral.nativeElement.addEventListener('hidden.bs.modal',() => {this._modalService.close();});
    


  }




  
}
