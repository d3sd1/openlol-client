import {Routes} from "@angular/router";
import {PageNotFoundComponent} from "../shared/components";
import {OfflineComponent} from "./offline/offline.component";
import {HomeComponent} from "./home/home.component";
import {ClientOpenGuard} from "../riot/lol/client/client-open.guard";
import {ClientClosedGuard} from "../riot/lol/client/client-closed.guard";
import {LoaderComponent} from './loader/loader.component';

export const OnLoLRoutes: Routes = [
  {
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
];
