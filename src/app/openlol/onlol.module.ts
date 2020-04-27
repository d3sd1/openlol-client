import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import {HomeComponent} from './home/home.component';
import {LoaderComponent} from './loader/loader.component';
import {SessionInfoService} from "../riot/lol/client/mocks/session-info/session-info.service";
import {AutomatizationsComponent} from './home/automatizations/automatizations.component';
import {ConfigComponent} from './home/config/config.component';


@NgModule({
  declarations: [OfflineComponent, HomeComponent, LoaderComponent, AutomatizationsComponent, ConfigComponent],
  imports: [],
  providers: [
    SessionInfoService
  ],
  exports: [RouterModule]
})
export class OnlolModule { }
