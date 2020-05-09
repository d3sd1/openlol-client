import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FlowStatus} from "../model/flow-status";
import {FlowService} from "../mocks/flow/flow.service";
import {QueueAcceptService} from "../mocks/queue-accept/queue-accept.service";
import {UserConfig} from "../model/user-config";
import {LcuConnectorService} from "../lcu-connector/lcu-connector.service";

@Injectable({
  providedIn: 'root'
})
export class FlowListenerService {
  private flowSubscription: Subject<FlowStatus> = null;
  private flowStatus: FlowStatus = new FlowStatus();
  private userConfig: UserConfig = new UserConfig(); // TODO: use real user config
  private flowInterval = null;
  private intervalFlowTime = 5000;

  constructor(private queueService: FlowService,
              private queueAcceptService: QueueAcceptService,
              private lcuConnector: LcuConnectorService) {
    let observer;
    this.flowSubscription = new Subject<FlowStatus>();
    this.reloadFlowListener();
    this.generateInterval();

    const clientStatusSub = this.lcuConnector.clientStatus().subscribe(() => {
      if (this.flowInterval === null) {
        this.generateInterval()
      }
    }, () => {
      clientStatusSub.unsubscribe();
    });
  }

  private generateInterval() {
    this.flowInterval = setInterval(() => {
      if (!this.lcuConnector.isClientOpen()) {
        clearInterval(this.flowInterval);
        this.flowInterval = null;
      }
      this.reloadFlowListener();
    }, this.intervalFlowTime); // This should never be destroyed so...
  }

  public getFlowStatus() {
    return this.flowStatus;
  }

  flowListener(): Observable<FlowStatus> {
    return this.flowSubscription;
  }

  private reloadFlowListener() {
    const apiCall = this.queueService.getInfo().subscribe((flowStatus: FlowStatus) => {
      this.flowStatus = flowStatus;
      this.runHookEvents();
      this.flowSubscription.next(this.flowStatus);
    }, (err) => {
      console.log(err);
      this.flowStatus = new FlowStatus();
      this.flowSubscription.next(this.flowStatus);
    }, () => {
      try {
        apiCall.unsubscribe();
      } catch (e) {

      }
    });
  }
  private runHookEvents() {
    // Queue autoaccept
    if (this.flowStatus.phase.toLowerCase() == 'readycheck' && this.userConfig.autoAcceptQueue) {
      this.hookQueueAutoAccepter();
    }
  }


  private hookQueueAutoAccepter() {
    this.queueAcceptService.doPost().subscribe((data) => {
      console.log("MATCHH DATA: ", data);
    }, (data) => {
      console.log("MATCHH DATA: ERROR ", data);
    });
  }
}
