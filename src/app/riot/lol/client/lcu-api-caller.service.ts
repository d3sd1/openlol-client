import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LcuApiCallerService {

  constructor(private http:HttpClient) { }

  testMEssageSend(user, pass, port) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('username', 'riot')
      .set('password', pass);

    let httpOptions = {
      headers: headers
    };

    let body = {
      body: "SI TE LLEGA ESTE MENSAJE GRITA SALTAAAAAAAAAAAAAAAAAAAAAA",
      fromId: "45e8d835-fac2-57a1-9925-76629b11612b@eu1.pvp.net",
      fromPid: "45e8d835-fac2-57a1-9925-76629b11612b@eu1.pvp.net",
      fromSummonerId: 44089097,
      id: "1587652051150:4",
      isHistorical: true,
      timestamp: "2020-04-23T14:27:31.150Z",
      type: "chat"
    };
    this.http.get('https://riot:' + pass + '@127.0.0.1:' + port + '/lol-champ-select/v1/session', httpOptions).subscribe((data) => {

      console.log("DATAAAAA: ", data);

    }, (err) => {
      console.log("ERRORACO ", err);
    });


  }
}
