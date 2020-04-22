import { Component, OnInit } from '@angular/core';
import {LcuConnectorService} from "../../riot/lol/client/lcu-connector.service";
import {LolClient} from "../../riot/lol/client/LolClient";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  constructor(private lcuConnectorService: LcuConnectorService, private router:Router) { }

  ngOnInit(): void {
  }

}
