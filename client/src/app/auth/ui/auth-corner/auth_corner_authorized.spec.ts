import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

import { AuthCorner } from './auth_corner'
import { AuthService } from '../../utils/auth_service'
import { provideRouter } from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { byTestAttr } from '@common/testing'
import { Signal, signal } from '@angular/core'

describe('AuthCorner when authorized should', () => {
  let component: AuthCorner
  let fixture: ComponentFixture<AuthCorner>

  beforeEach(async () => {
    const isAuthorized = signal(true)
    await TestBed.configureTestingModule({
      imports: [AuthCorner],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        MockProvider(AuthService, {
          isAuthorized(): Signal<boolean> {
            return isAuthorized
          },
          logout() {
            isAuthorized.set(false)
          }
        })
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AuthCorner)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('have logout button with navigation', () => {
    const loginBtn = byTestAttr<HTMLButtonElement>(fixture, 'login-button')
    expect(loginBtn).toBeFalsy()
    const registerBtn = byTestAttr<HTMLButtonElement>(
      fixture,
      'register-button'
    )
    expect(registerBtn).toBeFalsy()

    const logoutBtn = byTestAttr<HTMLButtonElement>(fixture, 'logout-button')
    expect(logoutBtn).toBeTruthy()
  })

  it('display login and register buttons on logout click', () => {
    const logoutBtn = byTestAttr<HTMLButtonElement>(fixture, 'logout-button')
    logoutBtn.click()
    fixture.detectChanges()

    const loginBtn = byTestAttr<HTMLButtonElement>(fixture, 'login-button')
    expect(loginBtn).toBeTruthy()
    const registerBtn = byTestAttr<HTMLButtonElement>(
      fixture,
      'register-button'
    )
    expect(registerBtn).toBeTruthy()
  })

  it('call logout on authService on logout click', () => {
    const logoutBtn = byTestAttr<HTMLButtonElement>(fixture, 'logout-button')
    const spy = spyOn(TestBed.inject(AuthService), 'logout')
    logoutBtn.click()
    expect(spy).toHaveBeenCalledOnceWith()
  })
})
