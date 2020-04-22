import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RiotLolModule} from "../riot-lol.module";
import {LcuConnectorService} from "./lcu-connector.service";



@NgModule({
  providers: [
    LcuConnectorService
  ],
  declarations: [
  ],
  imports: [
  ],
})
export class RiotLolClientModule {
  static forRoot(config: LcuConnectorService): ModuleWithProviders {
    return {
      ngModule: RiotLolClientModule,
      providers: [
        {provide: LcuConnectorService, useValue: config }
      ]
    };
  }
}
