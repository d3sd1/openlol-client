import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LcuConnectorService} from "../lcu-connector/lcu-connector.service";
import {ApiCallType} from "../model/api-call-type";
import {LcuEndpoint} from "../model/lcu-endpoint";
import {from, Observable, of} from 'rxjs';
import {catchError, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LcuApiCallerService {

  constructor(private http: HttpClient, private lcuConnectorService: LcuConnectorService) {
  }

  sendCall<T>(lcuEndpoint: LcuEndpoint, bodyCall?: object): Observable<T> {
    return from(this.lcuConnectorService.getLcuCredentials()).pipe<T>(mergeMap(credentials => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('username', credentials.username)
        .set('password', credentials.password);

      const httpOptions = {
        headers: headers
      };

      try {
        return this.http.get<T>('https://' + credentials.username + ':' + credentials.password + '@127.0.0.1:' + credentials.port + lcuEndpoint.endpointUri, httpOptions)
          .pipe<T>(
            catchError(error => {
              return of(null);
            }));
      } catch (e) {
        console.log("err", e);
      }
      switch (lcuEndpoint.apiCallType) {
        case ApiCallType.GET:
          return;
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
    }));
  }
}
