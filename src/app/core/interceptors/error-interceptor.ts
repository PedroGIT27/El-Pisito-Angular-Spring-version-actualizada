import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorStoreService } from '../services/error-store-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
 
  let _errorStoreService = inject(ErrorStoreService);
  let _authService:AuthService = inject(AuthService);
  let _router = inject(Router);

  return next(req).pipe(


    catchError((err:HttpErrorResponse)  => {

      console.log(err);

      if(err.error.status == 401){

        _authService.resetEstado();

      }
      //Aquí podemos checkear si el objeto err tiene un atributo "mensaje"
      if(err.error.mensaje){ //es un mensajeDTO

        _errorStoreService.setErrorStatus(err.error.status);
        _errorStoreService.setErrorMensaje(err.error.mensaje);


      }else{// es un error de Spring Security
        _errorStoreService.setErrorStatus(err.error.status);
        _errorStoreService.setErrorMensaje(err.error.message);

      }
    

      _router.navigate(["/error"]);

      return throwError( ()=> err);

    } )


  );


};

/* EJEMPLO DE CÓMO PUEDE LLEGAR UN ERR */
/*let err={

  error:{ 
  status:406,
  message:"se ha producido un error"},

}*/

/*
ESTE ES EL OBJETO QUE RECIBO CUANTO EL ERROR PROVIENE DE SPRING SECURITY
error: {
  timestamp: '2026-03-04T09:16:11.191Z', 
  status: 401, 
  error: 'Unauthorized',
  trace: 'org.springframework.security.authentication.BadCre…sAuthenticationProvider.java:143)\r\n\t... 96 more\r\n',
  message: 'Petición no autorizada. El usuario necesita autenticación', …}
headers: _HttpHeaders {headers: undefined, normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure response for http://localhost:8080/api/auth/login: 401 OK"
name: "HttpErrorResponse"
ok: false
redirected: undefined
responseType: undefined
status: 401
statusText: "OK"
type: undefined
url: "http://localhost:8080/api/auth/login"
*/