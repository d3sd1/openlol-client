import { TestBed } from '@angular/core/testing';

import { LcuApiCallerService } from './lcu-api-caller.service';

describe('LcuApiCallerService', () => {
  let service: LcuApiCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcuApiCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
