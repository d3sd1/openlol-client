import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {FlowStatus} from "../model/flow-status";
import {FlowService} from "../mocks/flow/flow.service";

@Injectable({
  providedIn: 'root'
})
export class FlowListenerService {
  private flowSubscription: Observable<FlowStatus> = null;
  private flowStatus: FlowStatus;

  constructor(private queueService: FlowService) {
  }

  flowListener(): Observable<FlowStatus> {
    if (this.flowSubscription === null) {
      this.generateFlowListener();
    }
    return this.flowSubscription;
  }

  private reloadFlowListener(observer: Subscriber<FlowStatus>) {
    this.queueService.getInfo().subscribe((flowStatus: FlowStatus) => {
      this.flowStatus = flowStatus;
      console.log(flowStatus);
      observer.next(this.flowStatus);
    }, (err) => {
      console.log(err);
    });
  }

  private generateFlowListener() {
    this.flowSubscription = new Observable<FlowStatus>((observer: Subscriber<FlowStatus>) => {
      this.reloadFlowListener(observer);
      setInterval(() => {
        this.reloadFlowListener(observer);
      }, 5000); // This should never be destroyed so...
    });
  }
}
