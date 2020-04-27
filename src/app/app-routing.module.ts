import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';
import {OnLoLRoutes} from "./openlol/onlol.routes";

const routes: Routes = [
    {
      path: '',
      redirectTo: 'openlol/loader',
      pathMatch: 'full'
    },
    {
      path: 'openlol',
      children: OnLoLRoutes,
    },
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
