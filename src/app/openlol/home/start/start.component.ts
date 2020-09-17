import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionInfo} from "../../../riot/lol/client/api-model/session-info";
import {FlowStatus} from "../../../riot/lol/client/model/flow-status";
import {SessionInfoService} from "../../../riot/lol/client/mocks/session-info/session-info.service";
import {FlowListenerService} from "../../../riot/lol/client/flow-listener/flow-listener.service";
import {PlayerMatchHistoryService} from "../../../riot/lol/client/mocks/player-match-history/player-match-history.service";
import {Subscription} from "rxjs";
import {OpenLolApiService} from "../../../core/openlol/open-lol-api.service";
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  sessionInfo: SessionInfo;
  flowStatus: FlowStatus;
  sessionSubscription: Subscription;
  flowListenerSubscription: Subscription;
  matchHistorySubscription: Subscription;

  queueAutoAccepterInterval;

  constructor(private sessionInfoService: SessionInfoService,
              private flowListenerService: FlowListenerService,
              private playerMatchHistoryService: PlayerMatchHistoryService,
              private openLolApiService: OpenLolApiService) {
  }
  
  ngOnInit(): void {
    this.sessionSubscription = this.sessionInfoService.getInfo().subscribe((sessionInfo: SessionInfo) => {
      this.sessionInfo = sessionInfo;
      this.openLolApiService.listen('/summoners/update');
      const userDecodedJwt = jwt_decode(this.sessionInfo.idToken);
      this.openLolApiService.send('/summoners/update', {
        realId: this.sessionInfo.summonerId,
        realPuuid: this.sessionInfo.puuid,
        realAccountId: this.sessionInfo.accountId,
        currentRegion: userDecodedJwt.acct.tag_line,
        loginName: this.sessionInfo.username,
        displayName: userDecodedJwt.acct.game_name
      });
      console.log(this.sessionInfo);
    }, (err) => {
      console.error(err);
    });
    this.flowListenerSubscription = this.flowListenerService.flowListener().subscribe((observer: FlowStatus) => {
      this.flowStatus = observer;
    });
    this.matchHistorySubscription = this.playerMatchHistoryService.getInfo().subscribe((ee) => {
      console.log("HISTORY", ee);
    });
  }


  ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe();
    this.flowListenerSubscription.unsubscribe();
    this.matchHistorySubscription.unsubscribe();
  }


}
