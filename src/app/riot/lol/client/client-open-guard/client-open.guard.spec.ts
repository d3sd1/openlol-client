import {TestBed} from '@angular/core/testing';

import {ClientOpenGuard} from './client-open.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClientOpenGuard', () => {
  let guard: ClientOpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ClientOpenGuard]
    });
    guard = TestBed.inject(ClientOpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
