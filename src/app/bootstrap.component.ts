import {Component} from '@angular/core';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class BootstrapComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    console.log("force loader");
    router.navigateByUrl('/openlol/loader').then(() => {
      console.log("loader redir!");
    });
  }
}
