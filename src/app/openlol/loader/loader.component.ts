import {Component, OnDestroy, OnInit} from '@angular/core';
import {LcuConnectorService} from '../../riot/lol/client/lcu-connector/lcu-connector.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loaderPercentage = 0;
  loadingMessage = "Iniciando...";
  private lcuSubscription: Subscription;

  constructor(private lcuConnector: LcuConnectorService, private router: Router) {
  }

  ngOnInit(): void {
    this.lcuSubscription = this.lcuConnector.clientStatus().subscribe((statusUpdate) => {
      if (statusUpdate) {
        this.router.navigateByUrl('/openlol/home');
        if (this.lcuSubscription !== null) {
          this.lcuSubscription.unsubscribe();
          this.lcuSubscription = null;
        }
      } else {
        this.router.navigateByUrl('openlol/offline');
        if (this.lcuSubscription !== null) {
          this.lcuSubscription.unsubscribe();
          this.lcuSubscription = null;
        }
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
