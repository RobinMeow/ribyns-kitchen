import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { authorizedGuard } from './authorized.guard';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('authorized guard should', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authorizedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('return false', () => {
    expect(
      executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ).toBe(false);
  });
});
