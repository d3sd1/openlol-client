import { TestBed } from '@angular/core/testing';

import { LcuConnectorService } from './lcu-connector.service';

describe('LcuConnectorService', () => {
  let service: LcuConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcuConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
