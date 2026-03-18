import { Component, inject } from '@angular/core';
import { ErrorStoreService } from '../../../core/services/error-store-service';

@Component({
  selector: 'app-error-general',
  imports: [],
  templateUrl: './error-general.html',
  styleUrl: './error-general.css',
})
export class ErrorGeneral {

  /* NO REACTIVO */
  /* error1:number; 
  error2:string; */

  public _errorStoreService:ErrorStoreService = inject(ErrorStoreService);

  /* NO REACTIVO */
  /* ngOnInit(){

    this.error1 = this._errorStoreService.errorStatus();
    this.error2 = this._errorStoreService.errorMensaje();
  } */


}
