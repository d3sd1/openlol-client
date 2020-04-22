import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RiotLolClientModule} from "./lol/client/riot-lol-client.module";
import {RiotLolModule} from "./lol/riot-lol.module";



@NgModule({
  declarations: [],
  imports: [
    RiotLolClientModule,
    RiotLolModule
  ]
})
export class RiotModule { }
