import {Routes} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import {HomeComponent} from "./home/home.component";
import {ClientOpenGuard} from "../riot/lol/client/client-open-guard/client-open.guard";
import {ClientClosedGuard} from "../riot/lol/client/client-closed-guard/client-closed.guard";
import {LoaderComponent} from './loader/loader.component';
import {ConfigComponent} from "./home/config/config.component";
import {AutomatizationsComponent} from "./home/automatizations/automatizations.component";
import {ChampselectComponent} from "./champselect/champselect.component";
import {PlayerNotOnChampSelectGuard} from "../riot/lol/client/player-not-on-champ-select-guard/player-not-on-champ-select.guard";
import {PlayerOnChampSelectGuard} from "../riot/lol/client/player-on-champ-select-guard/player-on-champ-select.guard";
import {StartComponent} from "./home/start/start.component";
import {OpenlolApiErrorComponent} from "./loader/openlol-api-error/openlol-api-error.component";

export const OnLoLRoutes: Routes = [
  {
    path: 'home',
    canActivate: [ClientOpenGuard, PlayerNotOnChampSelectGuard],
    canActivateChild: [ClientOpenGuard, PlayerNotOnChampSelectGuard],
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'start', pathMatch: 'full'},
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'automatizations',
        component: AutomatizationsComponent
      },
      {
        path: 'config',
        component: ConfigComponent
      },
    ]
  },
  {
    path: 'champselect',
    component: ChampselectComponent,
    canActivate: [ClientOpenGuard, PlayerOnChampSelectGuard]
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
  },
  {
    path: 'openlol_api_error',
    component: OpenlolApiErrorComponent,
    //canDeactivate cuando todo este cargado
    //canActiviate cuando no este todo cargado
  }
];
