import {Component, OnInit} from '@angular/core';
import {ChampSelectSessionService} from "../../riot/lol/client/mocks/champ-select/champ-select-session.service";

@Component({
  selector: 'app-champselect',
  templateUrl: './champselect.component.html',
  styleUrls: ['./champselect.component.css']
})
export class ChampselectComponent implements OnInit {

  constructor(private champSelectSessionService: ChampSelectSessionService) {
  }

  ngOnInit(): void {
    this.champSelectSessionService.getInfo().subscribe((data) => {
      console.log(data);
    });
  }

}
