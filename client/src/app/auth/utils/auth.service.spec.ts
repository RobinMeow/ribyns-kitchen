import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RegisterChef } from './RegisterChef';

describe('AuthService', () => {
  let authService: AuthService;
  const authServiceStub = {
    registerAsync() {
      return of(undefined);
    },
    loginAsync() {
      return of('tokenStub');
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceStub },
      ],
    });

    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  // password, should never be trimmed
  const whiteSpaceValues = [
    ['TestChef ', 'TestPassword ', 'test@example.com '], // trailing space
    [' TestChef', ' TestPassword', ' test@example.com'], // leading space
    [' TestChef ', ' TestPassword ', ' test@example.com '], // trailing and leading space
    ['   TestChef   ', '   TestPassword   ', '   test@example.com   '], // traling and leading spaces
    ['   TestChef   ', '   TestPassword   ', '   test@example.com   '], // traling and leading non breakable spaces
    ['   TestChef   ', '   TestPassword   ', '   test@example.com   '], //  traling and leading tabs
    ['\tTestChef\t', '\tTestPassword\t\t', '\ttest@example.com\t'], // trailing and leading escaped tab stops
    ['\nTestChef\n', '\nTestPassword\n', '\ntest@example.com\n'], // trailing and leading line breaks
    ['\n\tTestChef\n \t', ' \tTestPassword \t', ' \t \ntest@example.com \t \n'], // some mixed combinations
  ];
  it.each(whiteSpaceValues)(
    'should make an API call with the values trimmed (exept password)',
    async (name: string, password: string, email: string) => {
      // Arrange
      const registerChef: RegisterChef = {
        name,
        password,
        email,
      };

      const trimmedValues: RegisterChef = {
        name: 'TestChef',
        password: password,
        email: 'test@example.com',
      };

      const spy = jest.spyOn(authServiceStub, 'registerAsync');

      // Act
      await authService.signUpAsync(registerChef);

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(trimmedValues);
    },
  );

  it.each([
    ['', 'iLoveJesus<3!'],
    ['Weinberg des Herrn', ''],
  ])(
    'throws with empty credentials',
    async (name: string, password: string) => {
      await expect(
        authService.signInAsync({
          name,
          password,
        }),
      ).rejects.toThrow(Error);
    },
  );

  it.each([
    ['name', 'password'],
    ['name', ' untrimmed password '],
  ])(
    'calls authService.loginAsync with unmodifed credentials',
    async (name: string, password: string) => {
      const spy = jest.spyOn(authServiceStub, 'loginAsync');

      // Act
      await authService.signInAsync({
        name,
        password,
      });

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        name,
        password,
      });
    },
  );

  it('throw on logout when unauthorized', () => {
    expect(authService.logout).toThrow(Error);
  });

  it('should be unauthorized', () => {
    expect(authService.isAuthorized()()).toBe(false);
  });

  it('should return no chef', () => {
    expect(authService.currentUser()()).toBe(null);
  });
});
