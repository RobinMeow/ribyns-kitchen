import { TestBed } from '@angular/core/testing';
import { AuthDomainService } from './auth.domain.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService, RegisterChefDto } from 'src/app/openapi-services';
import { RegisterChef } from './register/RegisterChef';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authDomainService: AuthDomainService;
  let authServiceStub = {
    registerAsync() {
      return of(undefined);
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
    'should make an API call with the values trimmed',
    async (name, password, email) => {
      // Arrange
      const registerChef: RegisterChef = {
        name,
        password,
        email,
      };

      const trimmedValues: RegisterChefDto = {
        name: 'TestChef',
        password: 'TestPassword',
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
});
