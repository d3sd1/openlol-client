import {Routes} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import {HomeComponent} from "./home/home.component";
import {ClientOpenGuard} from "../riot/lol/client/client-open-guard/client-open.guard";
import {ClientClosedGuard} from "../riot/lol/client/client-closed-guard/client-closed.guard";
import {LoaderComponent} from './loader/loader.component';
import {ConfigComponent} from "./home/config/config.component";
import {AutomatizationsComponent} from "./home/automatizations/automatizations.component";

export const OnLoLRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ClientOpenGuard],
    canActivateChild: [ClientOpenGuard],
    children: [
      {
        path: 'automatizations',
        component: AutomatizationsComponent
      },
      {
        path: 'config',
        component: ConfigComponent
      }
    ]
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
