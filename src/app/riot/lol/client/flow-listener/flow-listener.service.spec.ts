import {TestBed} from '@angular/core/testing';

import {FlowListenerService} from './flow-listener.service';

describe('QueueListenerService', () => {
  let service: FlowListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
