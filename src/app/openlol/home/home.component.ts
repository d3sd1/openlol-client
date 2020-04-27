import {Component, OnInit} from '@angular/core';
import {SessionInfoService} from "../../riot/lol/client/mocks/session-info.service";
import {SessionInfo} from "../../riot/lol/client/api-model/session-info";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  sessionInfo: SessionInfo;

  constructor(private sessionInfoService: SessionInfoService) {
  }

  ngOnInit(): void {
    this.sessionInfoService.getInfo().subscribe((sessionInfo: SessionInfo) => {
      this.sessionInfo = sessionInfo;
    }, (err) => {
      console.log(err);
    });
  }

}
