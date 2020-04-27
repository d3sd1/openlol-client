import {TestBed} from '@angular/core/testing';

import {QueueAcceptService} from './queue-accept.service';

describe('QueueService', () => {
  let service: QueueAcceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueAcceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
