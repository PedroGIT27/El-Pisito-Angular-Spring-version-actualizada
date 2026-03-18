import { Routes } from '@angular/router';
import { ErrorGeneral } from './pages/content/error-general/error-general';



export const routes: Routes = [


    {
        path:'',
        loadChildren: () => import('./pages/content/content.routes').then(m => m.CONTENT_ROUTES)
    }
    ,

    {
        path:'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    }

    ,

    {
        path:'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
    }

    ,

    {
        path:'**',
        component:ErrorGeneral


    }
    /* ESTA RUTA SIEMPRE TIENE QUE ESTAR EN LA ÚLTIMA POSICIÓN */

];
