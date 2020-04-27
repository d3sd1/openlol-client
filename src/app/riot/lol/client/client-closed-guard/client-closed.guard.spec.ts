import {TestBed} from '@angular/core/testing';

import {ClientOpenGuard} from '../client-open-guard/client-open.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ClientClosedGuard} from './client-closed.guard';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClientClosedGuard', () => {
  let guard: ClientOpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ClientClosedGuard]
    });
    guard = TestBed.inject(ClientOpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
