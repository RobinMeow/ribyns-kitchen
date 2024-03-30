import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AuthApi } from './auth.api'
import { provideHttpClient } from '@angular/common/http'
import { provideApiBaseUrlTesting } from '@api'

describe('AuthApi should', () => {
  let authApi: AuthApi
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthApi,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting()
      ]
    })
    authApi = TestBed.inject(AuthApi)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('create', () => {
    expect(authApi).toBeTruthy()
  })

  // everything is protected, since it serves as a abstract class.
})
