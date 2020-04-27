import {Injectable} from '@angular/core';
import {LcuApiCallerService} from "../../lcu-api-caller/lcu-api-caller.service";
import {Observable} from "rxjs";
import {FlowStatus} from "../../model/flow-status";
import {FlowStatusEndpoint} from "../../lcu-endpoints/flow-status.endpoint";

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private lcuApiCallerService: LcuApiCallerService) {
  }

  getInfo(): Observable<FlowStatus> {
    return this.lcuApiCallerService.sendCall<FlowStatus>(new FlowStatusEndpoint());
  }
}
