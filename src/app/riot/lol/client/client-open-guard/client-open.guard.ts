import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LcuConnectorService} from "../lcu-connector/lcu-connector.service";

@Injectable({
  providedIn: 'root'
})
export class ClientOpenGuard implements CanActivate {
  constructor(private lcuConnector: LcuConnectorService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>((observer) => {
      const initOpen = this.lcuConnector.isClientOpen();
      if (!initOpen) {
        this.router.navigateByUrl('openlol/offline').then(() => {
          observer.unsubscribe();
        });
      }
      this.lcuConnector.clientStatus().subscribe((isOpen) => {
        if (!isOpen) {
          this.router.navigateByUrl('openlol/offline').then(() => {
            observer.unsubscribe();
          });
        }
        observer.next(true);
      });
    });
  }

}