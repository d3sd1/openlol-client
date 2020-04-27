import {ModuleWithProviders, NgModule} from '@angular/core';
import {LcuConnectorService} from "./lcu-connector/lcu-connector.service";


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
