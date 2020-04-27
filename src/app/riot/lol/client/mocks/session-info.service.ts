import {Injectable} from '@angular/core';
import {LcuApiCallerService} from "../lcu-api-caller/lcu-api-caller.service";
import {SessionInfoEndpoint} from "../lcu-endpoints/session-info.endpoint";
import {SessionInfo} from "../api-model/session-info";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionInfoService {

  constructor(private lcuApiCallerService: LcuApiCallerService) {
  }

  getInfo(): Observable<SessionInfo> {
    return this.lcuApiCallerService.sendCall<SessionInfo>(new SessionInfoEndpoint());
  }
}
