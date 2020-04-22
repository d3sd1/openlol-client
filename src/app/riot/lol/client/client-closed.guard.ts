import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {LcuConnectorService} from "./lcu-connector.service";
import {LolClient} from "./LolClient";
import {AppConfig} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientClosedGuard implements CanActivate {
  constructor(private lcuConnectorService: LcuConnectorService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>((observer) => {
      observer.next(true);
      const interval = setInterval(() => {
        this.lcuConnectorService.isClientOpen().then((isOpen) => {
          if(isOpen) {
            this.router.navigate(['onlol/home']);
            clearInterval(interval);
            observer.next(false);
            observer.unsubscribe();
          }
        })
      }, AppConfig.lockfileRefresh.guards);
    });
  }

}
