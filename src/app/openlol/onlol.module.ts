import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import {HomeComponent} from './home/home.component';
import {LoaderComponent} from './loader/loader.component';
import {SessionInfoService} from "../riot/lol/client/mocks/session-info/session-info.service";
import {AutomatizationsComponent} from './home/automatizations/automatizations.component';
import {ConfigComponent} from './home/config/config.component';
import {ChampselectComponent} from './champselect/champselect.component';
import {StartComponent} from './home/start/start.component';
import {
  AccordionModule,
  AnimatedCardsModule,
  ButtonsModule,
  CardsModule,
  IconsModule,
  WavesModule
} from "ng-uikit-pro-standard";
import {OpenlolApiErrorComponent} from './loader/openlol-api-error/openlol-api-error.component';


@NgModule({
  declarations: [OfflineComponent, HomeComponent, LoaderComponent, AutomatizationsComponent, ConfigComponent, ChampselectComponent, StartComponent, OpenlolApiErrorComponent],
  imports: [
    AccordionModule,
    IconsModule,
    CardsModule,
    AnimatedCardsModule,
    WavesModule,
    ButtonsModule
  ],
  providers: [
    SessionInfoService
  ],
  exports: [RouterModule]
})
export class OnlolModule { }
