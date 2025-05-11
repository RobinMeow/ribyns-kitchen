import { TestBed } from '@angular/core/testing'
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router'
import { unauthorizedGuard } from './unauthorized_guard'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { signal } from '@angular/core'
import { AuthService } from './auth_service'

describe('unauthorized guard should', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => unauthorizedGuard(...guardParameters))

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: {
            isAuthorized() {
              return signal(false)
            }
          }
        }
      ]
    })
  })

  it('be created', () => {
    expect(executeGuard).toBeTruthy()
  })

  it('return true', () => {
    expect(
      executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    ).toBe(true)
  })
})
