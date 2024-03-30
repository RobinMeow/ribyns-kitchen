import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideApiBaseUrlTesting } from '@api'

describe('AuthService should', () => {
  let authService: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        AuthService
      ]
    })

    authService = TestBed.inject(AuthService)
  })

  it('be created', () => {
    expect(authService).toBeTruthy()
  })
  ;[
    ['', 'iLoveJesus<3!'],
    ['Weinberg des Herrn', '']
  ].forEach(([name, password]) => {
    it('throw with empty credentials', async () => {
      try {
        await authService.signInAsync({
          name,
          password
        })
        fail()
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })
  })

  it('throw on logout when unauthorized', () => {
    try {
      authService.logout()
      fail('expected to throw')
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })

  it('be unauthorized', () => {
    expect(authService.isAuthorized()()).toBe(false)
  })

  it('return no chef', () => {
    expect(authService.currentUser()()).toBe(null)
  })
})
