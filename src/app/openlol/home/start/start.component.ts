import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionInfo} from "../../../riot/lol/client/api-model/session-info";
import {FlowStatus} from "../../../riot/lol/client/model/flow-status";
import {SessionInfoService} from "../../../riot/lol/client/mocks/session-info/session-info.service";
import {FlowListenerService} from "../../../riot/lol/client/flow-listener/flow-listener.service";
import {PlayerMatchHistoryService} from "../../../riot/lol/client/mocks/player-match-history/player-match-history.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  sessionInfo: SessionInfo;
  flowStatus: FlowStatus;

  queueAutoAccepterInterval;

  constructor(private sessionInfoService: SessionInfoService,
              private flowListenerService: FlowListenerService,
              private playerMatchHistoryService: PlayerMatchHistoryService) {
  }

  ngOnInit(): void {
    this.sessionInfoService.getInfo().subscribe((sessionInfo: SessionInfo) => {
      this.sessionInfo = sessionInfo;
    }, (err) => {
      console.error(err);
    });
    this.flowListenerService.flowListener().subscribe((observer: FlowStatus) => {
      this.flowStatus = observer;
    });
    this.playerMatchHistoryService.getInfo().subscribe((ee) => {
      console.log("HISTORY", ee);
    });
  }


  ngOnDestroy(): void {
  }


}
