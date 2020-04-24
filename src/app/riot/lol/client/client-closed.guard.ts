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
import {LcuCredentials} from "./lcu-credentials";
import {AppConfig} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientClosedGuard implements CanActivate {
  constructor(private lcuConnector: LcuConnectorService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>((observer) => {
      const initOpen = this.lcuConnector.isClientOpen();
      if (initOpen) {
        /* TODO this.router.navigate(['/openlol/home']).then(() => {
          observer.unsubscribe();
        });*/
      }
      this.lcuConnector.clientStatus().subscribe((isOpen) => {
        if (isOpen) {
          /* TODO this.router.navigate(['/openlol/home']).then(() => {
            observer.unsubscribe();
          });*/
        }
        observer.next(true);
      });
    });
  }

}
