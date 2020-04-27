import {Injectable} from '@angular/core';
import {LcuApiCallerService} from "../../lcu-api-caller/lcu-api-caller.service";
import {Observable} from "rxjs";
import {QueueAcceptEndpoint} from "../../lcu-endpoints/queue-accept.endpoint";

@Injectable({
  providedIn: 'root'
})
export class QueueAcceptService {

  constructor(private lcuApiCallerService: LcuApiCallerService) {
  }

  doPost(): Observable<boolean> {
    return this.lcuApiCallerService.sendCall<boolean>(new QueueAcceptEndpoint());
  }
}
