import {TestBed} from '@angular/core/testing';

import {LcuApiInterceptorService} from './lcu-api-interceptor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('LcuApiCallerService', () => {
  let service: LcuApiInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [LcuApiInterceptorService]
    });
    service = TestBed.inject(LcuApiInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
