import { TestBed } from '@angular/core/testing';

import { ClientOpenGuard } from './client-open.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LcuConnectorService} from './lcu-connector.service';
import {ClientClosedGuard} from './client-closed.guard';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClientClosedGuard', () => {
  let guard: ClientOpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ClientClosedGuard]
    });
    guard = TestBed.inject(ClientOpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
