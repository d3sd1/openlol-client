import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LcuConnectorService} from "../lcu-connector/lcu-connector.service";

@Injectable({
  providedIn: 'root'
})
export class ClientClosedGuard implements CanActivate {
  constructor(private lcuConnector: LcuConnectorService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const guardSubscription = new Observable<boolean | UrlTree>((observer) => {
      const initOpen = this.lcuConnector.isClientOpen();
      if (initOpen) {
        this.router.navigate(['/openlol/home']).then(() => {
          observer.unsubscribe();
          observer.complete();
        });
      }
      const lcuSubscription = this.lcuConnector.clientStatus().subscribe((isOpen) => {
        if (isOpen) {
          this.router.navigate(['/openlol/home']).then(() => {
            observer.unsubscribe();
            observer.complete();
            lcuSubscription.unsubscribe();
          });
        }
        observer.next(true);
      });
    });
    return guardSubscription;
  }

}
