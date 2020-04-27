import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionInfoService} from "../../riot/lol/client/mocks/session-info/session-info.service";
import {SessionInfo} from "../../riot/lol/client/api-model/session-info";
import {FlowStatus} from "../../riot/lol/client/model/flow-status";
import {FlowListenerService} from "../../riot/lol/client/flow-listener/flow-listener.service";
import {UserConfig} from "../../riot/lol/client/model/user-config";
import {QueueAcceptService} from "../../riot/lol/client/mocks/queue-accept/queue-accept.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  sessionInfo: SessionInfo;
  flowStatus: FlowStatus;
  userConfig: UserConfig = new UserConfig(); // TODO: use real user config

  queueAutoAccepterInterval;

  constructor(private sessionInfoService: SessionInfoService,
              private flowListenerService: FlowListenerService,
              private queueAcceptService: QueueAcceptService) {
  }

  ngOnInit(): void {
    this.sessionInfoService.getInfo().subscribe((sessionInfo: SessionInfo) => {
      this.sessionInfo = sessionInfo;
    }, (err) => {
      console.log(err);
    });
    this.flowListenerService.flowListener().subscribe((observer: FlowStatus) => {
      this.flowStatus = observer;
      console.log("phaseOK ", this.flowStatus.phase === 'readycheck');
      console.log("phase ", this.flowStatus.phase);
      console.log("autoaccept OK  ", this.userConfig.autoAcceptQueue);
      if (this.flowStatus.phase.toLowerCase() == 'readycheck' && this.userConfig.autoAcceptQueue) {
        this.runQueueAutoAccepter();
      }
    });
  }

  runQueueAutoAccepter() {
    console.log("Attempting auto accept game...");
    this.queueAcceptService.doPost().subscribe((data) => {
      console.log("MATCHH DATA: ", data);
    }, (data) => {
      console.log("MATCHH DATA: ERROR ", data);
    });
  }

  ngOnDestroy(): void {
  }


}
