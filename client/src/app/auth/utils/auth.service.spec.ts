import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideApiBaseUrlTesting } from '@api';
import { DomainAssertionError } from 'src/app/shared/assertions/DomainAssertionError';
import { TokenStorage } from './token.storage';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        {
          provide: TokenStorage,
          useValue: {
            retrieve() {
              return null;
            },
          },
        },
        AuthService,
      ],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  [
    ['', 'iLoveJesus<3!'],
    ['Weinberg des Herrn', ''],
  ].forEach(([name, password]) => {
    it('throws with empty credentials', async () => {
      try {
        await authService.signInAsync({
          name,
          password,
        });
        fail();
      } catch (error) {
        expect(error instanceof DomainAssertionError).toBeTrue();
      }
    });
  });

  it('throw on logout when unauthorized', () => {
    try {
      authService.logout();
      fail('expected to throw');
    } catch (error) {
      expect(error instanceof DomainAssertionError).toBeTrue();
    }
  });

  it('should be unauthorized', () => {
    expect(authService.isAuthorized()()).toBe(false);
  });

  it('should return no chef', () => {
    expect(authService.currentUser()()).toBe(null);
  });
});
