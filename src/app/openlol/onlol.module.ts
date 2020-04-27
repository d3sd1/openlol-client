import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import {HomeComponent} from './home/home.component';
import {LoaderComponent} from './loader/loader.component';
import {SessionInfoService} from "../riot/lol/client/mocks/session-info.service";


@NgModule({
  declarations: [OfflineComponent, HomeComponent, LoaderComponent],
  imports: [],
  providers: [
    SessionInfoService
  ],
  exports: [RouterModule]
})
export class OnlolModule { }
