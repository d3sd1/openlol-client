import {Component, OnDestroy, OnInit} from '@angular/core';
import {LcuConnectorService} from '../../riot/lol/client/lcu-connector/lcu-connector.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {OpenLolApiService} from "../../core/openlol/open-lol-api.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loaderPercentage = 0;
  loadingMessage = "Iniciando...";
  private lcuSubscription: Subscription = null;

  constructor(private lcuConnector: LcuConnectorService, private router: Router, private openLolApi: OpenLolApiService) {
  }

  async ngOnInit() {
    await this.initApp();
  }

  private advanceStep(msg, perc) {
    this.loadingMessage = msg;
    this.loaderPercentage += perc;
  }

  private async initApp(): Promise<void> {
    this.advanceStep('Cargando módulos api...', 10);
    await this.openLolApi.connect().then((connected) => {
      if (connected) {
        this.advanceStep('Conectando con LCU...', 30);
        this.initLolClientListener();
      } else {
        this.router.navigateByUrl('openlol/openlol_api_error').then(r => {
          if (this.lcuSubscription !== null) {
            this.lcuSubscription.unsubscribe();
            this.lcuSubscription = null;
          }
        });
      }
    }, (err) => {
      console.log('ERRROR: ', err);
    });
  }


  private initLolClientListener() {
    console.log("init lol client listener");
    this.lcuSubscription = this.lcuConnector.clientStatus().subscribe((statusUpdate) => {
      if (statusUpdate) {
        this.router.navigateByUrl('/openlol/home').then(() => {
          if (this.lcuSubscription !== null) {
            this.lcuSubscription.unsubscribe();
            this.lcuSubscription = null;
          }
        });
      } else {
        this.router.navigateByUrl('openlol/offline').then(r => {
          if (this.lcuSubscription !== null) {
            this.lcuSubscription.unsubscribe();
            this.lcuSubscription = null;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.lcuSubscription !== null) {
      this.lcuSubscription.unsubscribe();
      this.lcuSubscription = null;
    }
  }


}
