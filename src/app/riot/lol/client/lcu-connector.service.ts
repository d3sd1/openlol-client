import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {LolClient} from "./LolClient";
import {Observable} from "rxjs";
import {ElectronService} from "../../../core/services";
import {AppConfig} from "../../../../environments/environment";
import {Platform} from "./Platform";
import {normalize} from 'path';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LcuConnectorService {
  lolClient = new LolClient();
  clientObservable: Observable<LolClient>;

  constructor(private electronService: ElectronService, private http: HttpClient) {
    this.lockfileListener();
  }

  private async lockfileListener() {
    const lolPath = await this.updateClientCredentials();
  }

  getPlatform(): Platform {
    switch (process.platform) {
      case 'darwin':
        return Platform.MACOS;
        break;
      case 'win32':
        return Platform.WINDOWS;
        break;
      default:
        return Platform.UNKNOWN;
    }
  }

  updateClientCredentials(): Promise<boolean> {
    let lockfilePath = "";
    return new Promise((resolve, reject) => {
      if (this.getPlatform() === Platform.WINDOWS) {
        this.electronService.childProcess.exec(`WMIC PROCESS WHERE name='LeagueClient.exe' GET ExecutablePath`, (error, stdout, stderr) => {
          if (error || !stdout || stderr) {
            reject(error || stderr);
            return;
          }

          const normalizedPath = normalize(stdout).split(/\n|\n\r/)[1];
          resolve();
        });
      } else if (this.getPlatform() === Platform.MACOS) {
        const stdout = this.electronService.childProcess.execSync(`ps x -o comm= | grep 'LeagueClient'`).toString();

        let fullPath = normalize(stdout).split(/\n|\n\r/)[0];
        lockfilePath = fullPath.substr(0, fullPath.indexOf('Contents/LoL')) + 'Contents/LoL/lockfile';
        console.log("LOCKFILE " + lockfilePath);
      } else {
        console.error("OpenLol is not ready for your platform mate...");
      }
      console.log("LOCKFILE " + lockfilePath);
      const lockFile = this.electronService.fs.readFileSync(lockfilePath, "utf8");
      const parts = lockFile.split(':');
      console.log();

      this.testMEssageSend('riot', parts[3], parts[2]);
    });
  }

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
    this.http.post('https://riot:' + pass + '@127.0.0.1:' + port + '/lol-chat/v1/conversations/465a1cd3-7ac1-5bc0-afdc-dffc94d86e2a@eu1.pvp.net/messages', body, httpOptions).subscribe((data) => {

      console.log("DATAAAAA: ", data);

    }, (err) => {
      console.log("ERRORACO ", err);
    });


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
