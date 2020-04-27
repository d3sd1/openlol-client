import {Injectable} from '@angular/core';
import {LcuApiCallerService} from "../../lcu-api-caller/lcu-api-caller.service";
import {Observable} from "rxjs";
import {PlayerMatchHistoryEndpoint} from "../../lcu-endpoints/player-match-history.endpoint";

@Injectable({
  providedIn: 'root'
})
export class PlayerMatchHistoryService {

  constructor(private lcuApiCallerService: LcuApiCallerService) {
  }

  getInfo(): Observable<object> {
    return this.lcuApiCallerService.sendCall<object>(new PlayerMatchHistoryEndpoint());
  }
}
