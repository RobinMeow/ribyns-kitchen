import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AuthApi } from './auth.api'
import { provideHttpClient } from '@angular/common/http'
import { API_BASE_URL, provideApiBaseUrlTesting } from '@api'
import { Credentials } from '@auth'
import { JwtToken } from '../JwtToken'
import { ChefDto } from './ChefDto'
import { RegisterChef } from './RegisterChef'

/** to expose protected members */
class AuthApiWrapper extends AuthApi {
  constructor() {
    super()
  }
  override deleteAsync(credentials: Credentials): Promise<void> {
    return super.deleteAsync(credentials)
  }
  override loginAsync(credentials: Credentials): Promise<JwtToken> {
    return super.loginAsync(credentials)
  }
  override registerAsync(newChef: RegisterChef): Promise<ChefDto> {
    return super.registerAsync(newChef)
  }
}

describe('AuthApi', () => {
  let authApi: AuthApiWrapper
  let httpCtrl: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthApiWrapper, useValue: new AuthApiWrapper() },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        HttpTestingController
      ]
    })
    authApi = TestBed.inject(AuthApiWrapper)
    httpCtrl = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpCtrl.verify()
  })

  describe('deleteAsync should', () => {
    it('make an http call', async () => {
      console.log(authApi)
      await expectAsync(
        authApi.deleteAsync({
          name: '',
          password: ''
        })
      ).not.toBeResolved()

      httpCtrl.expectOne((req) =>
        req.url.includes(TestBed.inject(API_BASE_URL))
      )
    })
  })

  it('create', () => {
    expect(authApi).toBeTruthy()
  })

  // everything is protected, since it serves as a abstract class.
})
