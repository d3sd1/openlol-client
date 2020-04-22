import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnLoLRoutes} from "./onlol.routes";
import {RouterModule} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [OfflineComponent, HomeComponent],
  imports: [
  ],
  exports: [RouterModule]
})
export class OnlolModule { }
