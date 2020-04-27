import {TestBed} from '@angular/core/testing';

import {LcuConnectorService} from './lcu-connector.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

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
