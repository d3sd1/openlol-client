import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {LolClient} from "./LolClient";
import {Observable} from "rxjs";
import {ElectronService} from "../../../core/services";
import {AppConfig} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LcuConnectorService {
  lolClient = new LolClient();
  clientObservable: Observable<LolClient>;
  refreshInterval;

  constructor(private electronService: ElectronService) {
    console.log("LCU.... SERVICEEEE");
    this.lockfileListener();
  }

  private lockfileListener() {
    console.log("LOCK FILE LISTENER");
    this.clientObservable = new Observable<LolClient>((observer) => {
      this.refreshInterval = setInterval(() => {
        const lockFile = this.getLockfile();
        console.log("Refresh lockfile...", lockFile);

        if (lockFile !== null) {
          this.lolClient.isOpen = true;
        } else {
          this.lolClient.isOpen = false;
        }

        observer.next(this.lolClient);
      }, AppConfig.lockfileRefresh.file);
    });
  }

  getLockfile(): string {
    let lockfile = null;
    try {
      lockfile = this.electronService.fs.readFileSync("C:\\Riot Games\\2\\League of Legends\\lockfile", "utf8");
    } catch (e) {
      lockfile = null;
    }
    return lockfile;
  }

  on(): Observable<LolClient> {
    return this.clientObservable;
  }

  isClientOpen(): Promise<boolean> {
    return new Promise<boolean>((accept) => {
      this.clientObservable.subscribe((lolClient: LolClient) => {
        accept(lolClient.isOpen);
      });
    });
  }
}
