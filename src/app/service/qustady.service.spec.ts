import { TestBed } from '@angular/core/testing';

import { QustadyService } from './qustady.service';

describe('QustadyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QustadyService = TestBed.get(QustadyService);
    expect(service).toBeTruthy();
  });
});
