import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';
import {OfflineComponent} from "./openlol/offline/offline.component";
import {HomeComponent} from './openlol/home/home.component';
import {ClientOpenGuard} from './riot/lol/client/client-open-guard/client-open.guard';
import {ClientClosedGuard} from './riot/lol/client/client-closed-guard/client-closed.guard';
import {LoaderComponent} from './openlol/loader/loader.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'openlol/loader',
    pathMatch: 'full'
  },
  {
    path: 'openlol',
      children: [{
        path: 'home',
        component: HomeComponent,
        canActivate: [ClientOpenGuard]
      },
        {
          path: 'offline',
          component: OfflineComponent,
          canActivate: [ClientClosedGuard]
        },
        {
          path: 'loader',
          component: LoaderComponent,
          //canDeactivate cuando todo este cargado
          //canActiviate cuando no este todo cargado
        }
      ],
    }, //TODO: que esto se cargue en cada submodulo y no pete en los test
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
