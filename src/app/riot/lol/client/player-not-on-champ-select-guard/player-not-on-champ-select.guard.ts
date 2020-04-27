import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {FlowListenerService} from "../flow-listener/flow-listener.service";
import {FlowStatus} from "../model/flow-status";

@Injectable({
  providedIn: 'root'
})
export class PlayerNotOnChampSelectGuard implements CanActivate, CanActivateChild {
  constructor(private flowListenerService: FlowListenerService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const guardSubscription = new Observable<boolean | UrlTree>((observer) => {
      const initFlow = this.flowListenerService.getFlowStatus();
      if (initFlow.phase === 'ChampSelect') {
        this.router.navigate(['/openlol/champselect']).then(() => {
          observer.next(false);
          observer.unsubscribe();
          observer.complete();
        });
      } else {
        observer.next(true);
      }
      const lcuSubscription = this.flowListenerService.flowListener().subscribe((flowStatus: FlowStatus) => {
        if (flowStatus.phase === 'ChampSelect') {
          this.router.navigate(['/openlol/champselect']).then(() => {
            observer.next(false);
            observer.unsubscribe();
            observer.complete();
            lcuSubscription.unsubscribe();
          });
        }
        observer.next(true);
      }, () => {
        observer.next(false);
        observer.unsubscribe();
        observer.complete();
      });
    });
    return guardSubscription;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }


}
