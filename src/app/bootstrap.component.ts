import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {Router} from "@angular/router";
import {OpenLolApiService} from "./core/openlol/open-lol-api.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class BootstrapComponent implements OnInit, OnDestroy {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private openLolApiService: OpenLolApiService
  ) {

  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.endSession();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.endSession();
  }

  ngOnDestroy(): void {
    this.endSession();
  }

  ngOnInit(): void {

    this.translate.setDefaultLang('en');
    this.router.navigateByUrl('/openlol/loader').then(() => {

    });
  }


  private endSession() {
    this.openLolApiService.disconnect();
  }
}
