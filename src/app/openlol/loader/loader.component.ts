import {Component, OnInit} from '@angular/core';
import {LcuConnectorService} from '../../riot/lol/client/lcu-connector.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loaderPercentage = 0;
  loadingMessage = "Iniciando...";

  constructor(private lcuConnector: LcuConnectorService, private router: Router) {
  }

  ngOnInit(): void {
    this.lcuConnector.clientStatus().subscribe((statusUpdate) => {if (statusUpdate) {
        /* TODO this.router.navigateByUrl('/openlol/home'); */
      } else {
        /* TODO this.router.navigateByUrl('openlol/offline'); */
      }
    });
  }

}
