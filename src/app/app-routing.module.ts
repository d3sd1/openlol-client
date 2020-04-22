import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {OfflineComponent} from "./onlol/offline/offline.component";
import {OnLoLRoutes} from "./onlol/onlol.routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onlol/home',
    pathMatch: 'full'
  },
  {
    path: 'onlol',
    children: OnLoLRoutes
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
