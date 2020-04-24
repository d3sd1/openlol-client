import { TestBed } from '@angular/core/testing';

import { LcuApiCallerService } from './lcu-api-caller.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LcuConnectorService} from './lcu-connector.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientClosedGuard} from './client-closed.guard';
import {Router} from '@angular/router';

describe('LcuApiCallerService', () => {
  let service: LcuApiCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [LcuApiCallerService]
    });
    service = TestBed.inject(LcuApiCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
