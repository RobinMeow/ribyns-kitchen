import { TestBed } from '@angular/core/testing';

import { LocalPersistorBase } from './local-persistor.base';

describe('LocalPersistorBaseService', () => {
  let service: LocalPersistorBase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPersistorBase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
