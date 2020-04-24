import { TestBed } from '@angular/core/testing';

import { LcuConnectorService } from './lcu-connector.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientClosedGuard} from './client-closed.guard';
import {Router} from '@angular/router';

describe('LcuConnectorService', () => {
  let service: LcuConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [LcuConnectorService]
    });
    service = TestBed.inject(LcuConnectorService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
