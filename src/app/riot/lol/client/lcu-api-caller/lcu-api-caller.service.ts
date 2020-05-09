import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LcuConnectorService} from "../lcu-connector/lcu-connector.service";
import {ApiCallType} from "../model/api-call-type";
import {LcuEndpoint} from "../model/lcu-endpoint";
import {EMPTY, Observable} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LcuApiCallerService {

  constructor(private http: HttpClient, private lcuConnectorService: LcuConnectorService) {
  }

  sendCall<T>(lcuEndpoint: LcuEndpoint, bodyCall?: object): Observable<T> {
    const credentials = this.lcuConnectorService.getLcuCredentials();

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('username', credentials.username)
      .set('password', credentials.password);

    const httpOptions = {
      headers: headers
    };

    switch (lcuEndpoint.apiCallType) {
      case ApiCallType.GET:
        return this.http.get<T>('https://' + credentials.username + ':' + credentials.password + '@127.0.0.1:' + credentials.port + lcuEndpoint.endpointUri, httpOptions)
          .pipe(catchError((error: HttpErrorResponse) => {
            return EMPTY;
          }));
      case ApiCallType.POST:
        return this.http.post<T>('https://' + credentials.username + ':' + credentials.password + '@127.0.0.1:' + credentials.port + lcuEndpoint.endpointUri, bodyCall, httpOptions);
      case ApiCallType.PUT:
        return this.http.put<T>('https://' + credentials.username + ':' + credentials.password + '@127.0.0.1:' + credentials.port + lcuEndpoint.endpointUri, bodyCall, httpOptions);
      case ApiCallType.DELETE:
        return this.http.delete<T>('https://' + credentials.username + ':' + credentials.password + '@127.0.0.1:' + credentials.port + lcuEndpoint.endpointUri, httpOptions);
      default:
        console.error("Api call type not found ", ApiCallType);
        return null;
    }
  }
}
