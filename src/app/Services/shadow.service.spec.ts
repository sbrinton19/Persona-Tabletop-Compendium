import { TestBed } from '@angular/core/testing';

import { ShadowService } from './shadow.service';

describe('ShadowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShadowService = TestBed.get(ShadowService);
    expect(service).toBeTruthy();
  });
});
