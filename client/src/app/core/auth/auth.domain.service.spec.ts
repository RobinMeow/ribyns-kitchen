import { TestBed } from '@angular/core/testing';
import { AuthDomainService } from './auth.domain.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService, RegisterChefDto } from 'src/app/openapi-services';
import { RegisterChef } from './register/RegisterChef';
import { of } from 'rxjs';
import { Credentials } from './Credentials';

describe('AuthService', () => {
  let authDomainService: AuthDomainService;
  let authServiceStub = {
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

    authDomainService = TestBed.inject(AuthDomainService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(authDomainService).toBeTruthy();
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
    async (name, password, email) => {
      // Arrange
      const registerChef: RegisterChef = {
        name,
        password,
        email,
      };

      const trimmedValues: RegisterChefDto = {
        name: 'TestChef',
        password: password,
        email: 'test@example.com',
      };

      const spy = jest.spyOn(authServiceStub, 'registerAsync');

      // Act
      await authDomainService.registerAsync(registerChef);

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(trimmedValues);
    },
  );

  it('throw with empty name in credentials', async () => {
    const creds: Credentials = {
      name: '',
      password: 'iLoveJesus<3!',
    };
    await expect(authDomainService.loginAsync(creds)).rejects.toThrow(/name/);
  });

  it('throw with empty password in credentials', async () => {
    const creds: Credentials = {
      name: 'Weinberg des Herrn',
      password: '',
    };
    await expect(authDomainService.loginAsync(creds)).rejects.toThrow(
      /password/,
    );
  });

  it.each([
    ['name', 'password'],
    ['name', ' untrimmed password '],
  ])(
    'authService.loginAsync is called with credentials',
    async (name, password) => {
      // Arrange
      const creds: Credentials = {
        name,
        password,
      };

      const expctedCreds = JSON.parse(JSON.stringify(creds));

      const spy = jest.spyOn(authServiceStub, 'loginAsync');

      // Act
      await authDomainService.loginAsync(creds);

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expctedCreds);
    },
  );
});
