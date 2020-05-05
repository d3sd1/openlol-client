import {TestBed} from '@angular/core/testing';

import {OpenLolApiService} from './open-lol-api.service';

describe('OpenLoLApiService', () => {
  let service: OpenLolApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenLolApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
