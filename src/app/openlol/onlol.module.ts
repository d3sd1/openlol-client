import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnLoLRoutes} from "./onlol.routes";
import {RouterModule} from "@angular/router";
import {OfflineComponent} from "./offline/offline.component";
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [OfflineComponent, HomeComponent, LoaderComponent],
  imports: [
  ],
  exports: [RouterModule]
})
export class OnlolModule { }
