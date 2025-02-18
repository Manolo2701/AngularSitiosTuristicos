import { TestBed } from '@angular/core/testing';

import { SitiosService } from './sitios.service';

describe('SitiosService', () => {
  let service: SitiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
