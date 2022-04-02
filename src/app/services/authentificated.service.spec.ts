import { TestBed } from '@angular/core/testing';

import { AuthentificatedService } from './authentificated.service';

describe('AuthentificatedService', () => {
  let service: AuthentificatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
