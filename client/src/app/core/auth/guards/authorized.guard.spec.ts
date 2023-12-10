import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authorizedGuard } from './authorized.guard';

describe('authorized guard should', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authorizedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
