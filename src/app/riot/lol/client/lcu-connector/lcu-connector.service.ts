import {Injectable} from '@angular/core';
import {LcuCredentials} from "../model/lcu-credentials";
import {Observable} from "rxjs";
import {ElectronService} from "../../../../core/services";
import {AppConfig} from "../../../../../environments/environment";
import {Platform} from "../model/platform";
import {normalize} from 'path';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LcuConnectorService {
  private lcuCredentials: LcuCredentials;
  private clientObservable: Observable<boolean>;
  private clientStatusOpen: boolean;

  constructor(private electronService: ElectronService, private http: HttpClient) {
    this.clientStatusOpen = false;
    this.clientObservable = this.initClientManager();
  }

  private getPlatform(): Platform {
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

  getLcuCredentials(): LcuCredentials {
    return this.lcuCredentials;
  }

  private getWindowsLockfile(): string {
    try {
      const stdout = this.electronService.childProcess.execSync(`WMIC PROCESS WHERE name='LeagueClient.exe' GET ExecutablePath`).toString();
      if(!stdout.includes('LeagueClient.exe')) { // Means not open.
        return null;
      }
      const fullPath = normalize(stdout).split(/\n|\n\r/)[1].replace('LeagueClient.exe','');
      return fullPath + '\\lockfile';
    } catch (e) {
      return null;
    }
  }

  private getMacOsLockfile(): string {
    try {
      const stdout = this.electronService.childProcess.execSync(`ps x -o comm= | grep 'LeagueClient'`).toString();
      const fullPath = normalize(stdout).split(/\n|\n\r/)[0];
      return fullPath.substr(0, fullPath.indexOf('Contents/LoL')) + 'Contents/LoL/lockfile';
    } catch (e) {
      return null;
    }
  }

  private getLockfile() {
    let lockfilePath = "";
    const platform = this.getPlatform();
    if (platform === Platform.WINDOWS) {
      lockfilePath = this.getWindowsLockfile();
    } else if (platform === Platform.MACOS) {
      lockfilePath = this.getMacOsLockfile();
    } else {
      console.error("OpenLol is not ready for your platform mate...");
    }
    return lockfilePath;
  }

  private translateLockfileToCredentials(lockfile) {
    const parts = lockfile.split(':');
    const newLcuCredentials = new LcuCredentials();
    newLcuCredentials.port = parts[2];
    newLcuCredentials.username = 'riot';
    newLcuCredentials.password = parts[3];
    this.lcuCredentials = newLcuCredentials;
  }

  private runClientSetup() {
    if (!this.isClientOpen()) {
      return;
    }
    let lockFile;
    if (this.clientStatusOpen) {
      try {
        lockFile = this.electronService.fs.readFileSync(this.getLockfile(), "utf8");
        this.translateLockfileToCredentials(lockFile);
      } catch (e) {

      }
    }

  }

  private clientStatusObserver(subscriber) {
    const lockFilePath = this.getLockfile();
    this.clientStatusOpen = lockFilePath !== null;
    subscriber.next(this.isClientOpen());
  }

  private runClientManager(observer) {
    if (!this.isClientOpen()) {
      this.lcuCredentials = null;
    }
    if (this.isClientOpen() && this.getLcuCredentials() == null) {
      this.runClientSetup();
    }
    this.clientStatusObserver(observer);
  }

  private initClientManager() {
    return new Observable<boolean>((observer) => {
      this.runClientManager(observer);
      setInterval(() => {
        this.runClientManager(observer);
      }, AppConfig.lockfileRefresh.file);
    });
  }

  clientStatus(): Observable<boolean> {
    return this.clientObservable;
  }/*
  playingStatus(): Observable<LcuCredentials> {
    return this.clientObservable;
  }
  lobbyStatus(): Observable<LcuCredentials> {
    return this.clientObservable;
  }*/

  isClientOpen(): boolean {
    return this.clientStatusOpen;
  }
}
