import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {FlowStatus} from "../model/flow-status";
import {FlowService} from "../mocks/flow/flow.service";
import {QueueAcceptService} from "../mocks/queue-accept/queue-accept.service";
import {UserConfig} from "../model/user-config";

@Injectable({
  providedIn: 'root'
})
export class FlowListenerService {
  private flowSubscription: Observable<FlowStatus> = null;
  private flowStatus: FlowStatus = new FlowStatus();
  private userConfig: UserConfig = new UserConfig(); // TODO: use real user config
  private flowInterval;

  constructor(private queueService: FlowService,
              private queueAcceptService: QueueAcceptService) {
  }

  public getFlowStatus() {
    return this.flowStatus;
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
      this.runHookEvents();
      observer.next(this.flowStatus);
    }, (err) => {
      console.log(err);
      this.flowStatus = new FlowStatus();
      observer.next(this.flowStatus);
    });
  }

  private generateFlowListener() {
    this.flowSubscription = new Observable<FlowStatus>((observer: Subscriber<FlowStatus>) => {
      this.reloadFlowListener(observer);
      this.flowInterval = setInterval(() => {
        this.reloadFlowListener(observer);
      }, 5000); // This should never be destroyed so...
    });
  }

  private runHookEvents() {
    // Queue autoaccept
    if (this.flowStatus.phase.toLowerCase() == 'readycheck' && this.userConfig.autoAcceptQueue) {
      this.hookQueueAutoAccepter();
    }
  }


  private hookQueueAutoAccepter() {
    console.log("Attempting auto accept game...");
    this.queueAcceptService.doPost().subscribe((data) => {
      console.log("MATCHH DATA: ", data);
    }, (data) => {
      console.log("MATCHH DATA: ERROR ", data);
    });
  }
}
