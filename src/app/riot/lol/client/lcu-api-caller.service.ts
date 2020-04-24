import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LcuApiCallerService {

  constructor(private http: HttpClient) { }

  testMEssageSend() {
    const user = 'riot';
    const pass = 'yEJljaPR1vjH8f1FEtHLnA';
    const port = 59032;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('username', 'riot')
      .set('password', pass);

    const httpOptions = {
      headers: headers
    };

    const body = {
      body: "eres mazo de tonto",
      fromId: "45e8d835-fac2-57a1-9925-76629b11612b@eu1.pvp.net",
      fromPid: "45e8d835-fac2-57a1-9925-76629b11612b@eu1.pvp.net",
      fromSummonerId: 44089097,
      id: "1587666741337:24",
      isHistorical: true,
      timestamp: "2020-04-23T18:32:21.461Z",
      type: "chat",
    };
    //07e2533c-da8f-55a9-a146-d65b10a54edc@eu1.pvp.net

    this.http.get('https://riot:' + pass + '@127.0.0.1:' + port + '/lol-champ-select/v1/session', httpOptions).subscribe((data) => {

      console.log("DATAAAAA: ", data);

    }, (err) => {
      console.log("ERRORACO ", err);
    });


  }
}
