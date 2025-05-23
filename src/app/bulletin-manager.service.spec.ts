import { TestBed } from '@angular/core/testing';

import { BulletinManagerService } from './bulletin-manager.service';

describe('BulletinManagerService', () => {
  let service: BulletinManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
