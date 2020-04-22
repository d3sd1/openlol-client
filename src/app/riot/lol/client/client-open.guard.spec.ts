import { TestBed } from '@angular/core/testing';

import { ClientOpenGuard } from './client-open.guard';

describe('ConnectionGuard', () => {
  let guard: ClientOpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientOpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
