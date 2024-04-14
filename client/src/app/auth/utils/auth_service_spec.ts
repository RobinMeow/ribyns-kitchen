import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth_service'
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { API_BASE_URL, provideApiBaseUrlTesting } from '@api'
import { WritableSignal, isSignal } from '@angular/core'
import { MockProvider } from 'ng-mocks'
import { TokenStorage } from './token_storage'
import { Chef } from '@auth'
import { RegisterChef } from './register_chef'
import { Validations } from '@common/validations'

describe('AuthService', () => {
  let authService: AuthService
  let httpCtrl: HttpTestingController
  let url: string
  // exmaple token created with https://jwt.io/
  // {
  //   "sub": "1234567890",
  //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "Weinberg des Herrn",
  //   "iat": 1516239022
  // }
  const validJwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IldlaW5iZXJnIGRlcyBIZXJybiIsImlhdCI6MTUxNjIzOTAyMn0.mBS6ztUWBTRhP2F6DuWCCUa7jabzZoGE9gpiVLbqvuA'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // TODO provideApiTesting()
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        AuthService,
        MockProvider(TokenStorage)
      ]
    })

    authService = TestBed.inject(AuthService)
    httpCtrl = TestBed.inject(HttpTestingController)
    url = TestBed.inject(API_BASE_URL) + '/Auth/'
  })

  it('should create', () => {
    expect(authService).toBeTruthy()
  })

  const emptyStrings = ['', null!, undefined!]

  describe('signInAsync should', () => {
    emptyStrings.forEach((name: string) =>
      it('throw for empty name', async () => {
        await expectAsync(
          authService.signInAsync({
            name: name,
            password: 'iLoveJesus<3!'
          })
        ).toBeRejected()
      })
    )

    emptyStrings.forEach((password: string) =>
      it(`throw for empty password '${password}'`, async () => {
        await expectAsync(
          authService.signInAsync({
            name: 'Weinberg des Herrn',
            password: password
          })
        ).toBeRejected()
      })
    )

    it('work with valid credentials and return a Chef instance', async () => {
      const promise = authService.signInAsync({
        name: 'Weinberg des Herrn',
        password: 'iLoveJesus<3!'
      })

      const req = httpCtrl.expectOne(url + 'LoginAsync')
      req.flush(validJwtToken)

      const chef: Chef = await promise
      await expectAsync(promise).toBeResolvedTo(chef)
      expect(chef).toBeTruthy()
      expect(chef.name).toBe('Weinberg des Herrn')

      httpCtrl.verify()
    })
  })

  describe('signUpAsync should', () => {
    describe('trim', () => {
      let promise: Promise<unknown>

      it('the email', async () => {
        promise = authService.signUpAsync({
          name: 'Chefname',
          email: ' TrimMe ',
          password: 'valid'
        })
        const registerRequest = httpCtrl.expectOne(
          url + 'RegisterAsync',
          `expected '${url + 'RegisterAsync'}'`
        )
        registerRequest.flush(null)

        expect((<RegisterChef>registerRequest.request.body).email).toBe(
          'TrimMe'
        )
      })

      it('the name', async () => {
        promise = authService.signUpAsync({
          name: ' TrimMe ',
          password: 'valid'
        })
        const registerRequest = httpCtrl.expectOne(
          url + 'RegisterAsync',
          `expected '${url + 'RegisterAsync'}'`
        )
        registerRequest.flush(null)

        expect((<RegisterChef>registerRequest.request.body).name).toBe('TrimMe')
      })

      afterEach(async () => {
        await Promise.resolve()
        const loginRequest = httpCtrl.expectOne(
          url + 'LoginAsync',
          `expected '${url + 'LoginAsync'}'`
        )
        loginRequest.flush(validJwtToken)

        await expectAsync(promise!).toBeResolved()

        httpCtrl.verify()
      })
    })

    it('throw if password contains leading or trailing spaces', async () => {
      const promise = authService.signUpAsync({
        name: 'Valid',
        password: ' untrimmed and invalid '
      })
      await expectAsync(promise).toBeRejectedWithError()
    })

    it('work for valid credentials and return chef', async () => {
      const testChef = {
        name: 'Weinberg des Herrn',
        password: 'iLoveJesus<3!'
      }

      // enqueue microtask for reigsterRequest
      const promise = authService.signUpAsync(testChef satisfies RegisterChef)

      const registerRequest = httpCtrl.expectOne(
        url + 'RegisterAsync',
        `expected '${url + 'RegisterAsync'}'`
      )
      registerRequest.flush(null)

      // microtaks are executed after currently executing script
      // and we need the registerAsync to be resolved,
      // before being able to mock signInAsync
      await Promise.resolve() // pushing another microtask and resolve it immediatly
      // since registerAsync now also has resolved
      // signIsAsync is called and enqueued a new microtaks

      const loginRequest = httpCtrl.expectOne(
        url + 'LoginAsync',
        `expected '${url + 'LoginAsync'}'`
      )
      loginRequest.flush(validJwtToken)

      // let other microtask finish as well
      const chef = await promise

      await expectAsync(promise).toBeResolvedTo(chef)
      expect(chef).toBeTruthy()
      expect(chef.name).toBe('Weinberg des Herrn')

      httpCtrl.verify()
    })
  })

  describe('removeAsync should', () => {
    it('make an http call and call logout', async () => {
      const logoutSpy = spyOn(authService, 'logout').and.returnValue()

      const promise = authService.removeAsync({
        name: 'Weinberg des Herrn',
        password: 'iLoveJesus<3!'
      })

      const req = httpCtrl.expectOne(url + 'DeleteAsync')
      req.flush(null)
      await expectAsync(promise).toBeResolved()
      expect(logoutSpy).toHaveBeenCalledOnceWith()
    })

    emptyStrings.forEach((name: string) =>
      it('throw for empty name', async () => {
        await expectAsync(
          authService.removeAsync({
            name: name,
            password: 'iLoveJesus<3!'
          })
        ).toBeRejected()
      })
    )

    emptyStrings.forEach((password: string) =>
      it(`throw for empty password '${password}'`, async () => {
        await expectAsync(
          authService.removeAsync({
            name: 'Weinberg des Herrn',
            password: password
          })
        ).toBeRejected()
      })
    )
  })

  describe('currentUser should', () => {
    it('return readonly signal', async () => {
      const signal = authService.currentUser()
      expect(signal).toBeTruthy()
      expect(isSignal(signal)).toBeTrue()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (<WritableSignal<any>>signal).set(null)).toThrowError()
    })

    it('return null', () => {
      expect(authService.currentUser()()).toBeNull()
    })

    emptyStrings.forEach((name: string) =>
      it('throw for empty name', async () => {
        await expectAsync(
          authService.removeAsync({
            name: name,
            password: 'iLoveJesus<3!'
          })
        ).toBeRejected()
      })
    )

    emptyStrings.forEach((password: string) =>
      it(`throw for empty password '${password}'`, async () => {
        await expectAsync(
          authService.removeAsync({
            name: 'Weinberg des Herrn',
            password: password
          })
        ).toBeRejected()
      })
    )
  })

  describe('isAuthorized should', () => {
    it('return a readonly signal', () => {
      const signal = authService.isAuthorized()
      expect(signal).toBeTruthy()
      expect(isSignal(signal)).toBeTrue()
    })

    it('return false', () => {
      expect(authService.isAuthorized()()).toBeFalse()
    })
  })

  describe('logout should', () => {
    it('throw for unauthorized', () => {
      expect(() => authService.logout()).toThrowError()
    })
  })

  describe('getValidationsAsync should', () => {
    it('reject invalid validations from http get', async () => {
      const promise = authService.getValidationsAsync()
      const validValidations: Validations = {}

      const req = httpCtrl.expectOne(url + 'GetValidationsAsync')
      req.flush(validValidations)
      await expectAsync(promise).toBeRejectedWithError()
    })

    it('resolve validations from http get', async () => {
      const promise = authService.getValidationsAsync()
      const validValidations: Validations = {
        // requires at least one field
        meow: {
          // satisfy constraints compiler
          required: false
        }
      }

      const req = httpCtrl.expectOne(url + 'GetValidationsAsync')
      req.flush(validValidations)
      await expectAsync(promise).toBeResolved()
    })
  })
})
