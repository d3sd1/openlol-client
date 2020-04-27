import {TestBed} from '@angular/core/testing';

import {LcuApiCallerService} from './lcu-api-caller.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

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
