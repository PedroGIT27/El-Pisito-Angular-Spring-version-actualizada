import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:'enabled'})),
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor])),

  ]
};

//provideHttpClient() ES IMPRESCINDIBLE PARA PODER INYECTAR HttpClient en los servicios
//que se encarguen de contactar con la API.

//withInMemoryScrolling({scrollPositionRestoration:'enabled'})
//Su labor es la siguiente: al elegir un item de menú para navegar a otro contenido
//este nuevo contenido se carga (scroll) en la posición inicial
