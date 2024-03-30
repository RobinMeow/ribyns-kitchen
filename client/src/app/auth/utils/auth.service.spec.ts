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

  it('create', () => {
    expect(authService).toBeTruthy()
  })

  const emptyStrings = ['', null!, undefined!]

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
