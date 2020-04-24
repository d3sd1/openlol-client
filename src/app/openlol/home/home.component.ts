import { Component, OnInit } from '@angular/core';
import {LcuApiCallerService} from '../../riot/lol/client/lcu-api-caller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private lcuApi:LcuApiCallerService) { }

  ngOnInit(): void {
    this.lcuApi.testMEssageSend();
  }

}
