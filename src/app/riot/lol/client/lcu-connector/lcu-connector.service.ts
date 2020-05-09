import {Injectable} from '@angular/core';
import {LcuCredentials} from "../model/lcu-credentials";
import {Observable, Subject} from "rxjs";
import {ElectronService} from "../../../../core/services";
import {Platform} from "../model/platform";
import {normalize} from 'path';
import {HttpClient} from '@angular/common/http';
import {FSWatcher} from "fs";

@Injectable({
  providedIn: 'root'
})
export class LcuConnectorService {
  private loadingConnector = true;
  private lcuCredentials: LcuCredentials;
  private clientObservable: Subject<boolean>;
  private lockfilePath = null;
  private lockfileListener: FSWatcher = null;

  constructor(private electronService: ElectronService, private http: HttpClient) {
    this.lockfilePath = null;
    this.clientObservable = new Subject<boolean>();
    this.setupLcu();
    this.loadingConnector = false;
  }

  // EXTERNALS
  clientStatus(): Observable<boolean> {
    return this.clientObservable;
  }

  isClientOpen(): boolean {
    return this.lcuCredentials !== null;
  }

  async getLcuCredentials(): Promise<LcuCredentials> {
    return new Promise<LcuCredentials>((accept, reject) => {
      if (this.loadingConnector) {
        setTimeout(() => {
          accept(this.getLcuCredentials());
        }, 1000);
      } else {
        accept(this.lcuCredentials);
      }
    });
  }

  private setupLcu() {
    if (this.lockfilePath === null) {
      this.lockfilePath = this.getLockfilePath();
      this.readLockfileCredentials();
      this.setupLockfileListener();
      this.clientObservable.next(this.isClientOpen());
    }
    // This means app could not load (client still closed). Setup reload interval.
    if (this.lockfilePath === null) {
      setTimeout(() => {
        this.setupLcu();
      }, 3000);
    }
  }

  private getPlatform(): Platform {
    switch (process.platform) {
      case 'darwin':
        return Platform.MACOS;
      case 'win32':
        return Platform.WINDOWS;
      default:
        return Platform.UNKNOWN;
    }
  }

  private getWindowsLockfile(): string {
    try {
      const stdout = this.electronService.childProcess.execSync(`WMIC PROCESS WHERE name='LeagueClient.exe' GET ExecutablePath`).toString();
      if (!stdout.includes('LeagueClient.exe')) { // Means not open.
        return null;
      }
      const fullPath = normalize(stdout).split(/\n|\n\r/)[1].replace('LeagueClient.exe', '');
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


  /*
    playingStatus(): Observable<LcuCredentials> {
      return this.clientObservable;
    }
    lobbyStatus(): Observable<LcuCredentials> {
      return this.clientObservable;
    }*/

  private readLockfileCredentials() {
    try {
      const lockFile = this.electronService.fs.readFileSync(this.lockfilePath, "utf8");
      const parts = lockFile.split(':');
      const newLcuCredentials = new LcuCredentials();
      newLcuCredentials.port = parts[2];
      newLcuCredentials.username = 'riot';
      newLcuCredentials.password = parts[3];
      this.lcuCredentials = newLcuCredentials;
    } catch (e) {
      this.lcuCredentials = null;
      this.lockfilePath = null;
    }
  }

  private setupLockfileListener() {
    try {
      if (this.lockfileListener !== null) {
        this.lockfileListener.close();
      }

      this.lockfileListener = this.electronService.fs.watch(this.lockfilePath, (event, filename) => {
        if (filename) {
          this.readLockfileCredentials();
          this.clientObservable.next(this.isClientOpen());
          this.setupLcu();
        }
      });
    } catch (e) {
      this.lcuCredentials = null;
      this.lockfilePath = null;
    }
  }

  private getLockfilePath(): string {
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
}
