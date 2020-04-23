import { Component, OnInit } from '@angular/core';
import {LcuConnectorService} from "../../riot/lol/client/lcu-connector.service";
import {LcuCredentials} from "../../riot/lol/client/lcu-credentials";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './offline.component.html'
})
export class OfflineComponent implements OnInit {

  constructor(private lcuConnectorService: LcuConnectorService, private router:Router) { }

  ngOnInit(): void {
  }

}
