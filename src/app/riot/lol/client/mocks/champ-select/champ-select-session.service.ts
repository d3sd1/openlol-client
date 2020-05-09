import {Injectable} from '@angular/core';
import {LcuApiCallerService} from "../../lcu-api-caller/lcu-api-caller.service";
import {Observable} from "rxjs";
import {ChampSelectSessionEndpoint} from "../../lcu-endpoints/champ-select-session.endpoint";

@Injectable({
  providedIn: 'root'
})
export class ChampSelectSessionService {

  constructor(private lcuApiCallerService: LcuApiCallerService) {
  }

  getInfo(): Observable<object> {
    return this.lcuApiCallerService.sendCall<object>(new ChampSelectSessionEndpoint());
  }
}
