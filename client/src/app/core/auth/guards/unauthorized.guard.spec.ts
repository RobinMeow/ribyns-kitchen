import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { unauthorizedGuard } from './unauthorized.guard';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('unauthorized guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => unauthorizedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('return true', () => {
    expect(
      executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ).toBe(true);
  });
});
