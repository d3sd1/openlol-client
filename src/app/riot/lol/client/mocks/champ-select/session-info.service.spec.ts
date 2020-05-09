import {TestBed} from '@angular/core/testing';

import {SessionInfoService} from './champ-select-session.service';

describe('SessionInfoService', () => {
  let service: SessionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
