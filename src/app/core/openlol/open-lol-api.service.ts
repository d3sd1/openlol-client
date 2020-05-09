import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {machineIdSync} from 'node-machine-id';
import {Router} from "@angular/router";
import {AppConfig} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OpenLolApiService {
  webSocketEndPoint: string = 'http://localhost:8080/login';
  stompClient: any;
  private requestKey = null;
  private readonly pc_uuid;

  constructor(private http: HttpClient, private router: Router) {
    this.pc_uuid = machineIdSync();
    this.stompClient = null;
  }

  subscribe(topic) {
    return this.stompClient.subscribe(topic, (sdkEvent) => {
      console.log("ERROR DE CANAL: ", sdkEvent);
    });
  }

  send(topic, message) {
    this.stompClient.send(topic, {}, JSON.stringify(message));
  }

  connect(redirectHome = false): Promise<boolean> {
    if (this.stompClient !== null) {
      console.log("Stompclient already init!", this.stompClient);
      return;
    }
    return new Promise<boolean>((resolve, reject) => {
      this.stompClient = Stomp.over(new SockJS(this.webSocketEndPoint));

      this.stompClient.reconnect_delay = AppConfig.websockets.refresh;
      if (!AppConfig.websockets.debug) {
        this.stompClient.debug = null;
      }
      this.stompClient.connect({'pc_uuid': this.pc_uuid}, (frame) => {
        resolve(true);
        this.router.navigateByUrl('/openlol/home').then(() => {

        });
      }, (err) => {
        console.error('Websockets connection error: ', err);
        this.disconnect();
        resolve(false);
        setTimeout(() => {
          this.connect(true);
        }, AppConfig.websockets.refresh);
      });
    });
  };

  disconnect() {
    try {
      this.router.navigateByUrl('openlol/openlol_api_error').then(r => {

      });
      this.stompClient.disconnect();
    } catch (e) {

    } finally {
      this.stompClient = null;
    }
  }
}
