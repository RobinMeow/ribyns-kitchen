import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

import { AuthCorner } from './auth_corner'
import { AuthService } from '../../utils/auth_service'
import { Router, provideRouter } from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { byTestAttr } from '@common/testing'
import { Signal, signal } from '@angular/core'

describe('AuthCorner when unauthorized should', () => {
  let component: AuthCorner
  let fixture: ComponentFixture<AuthCorner>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCorner],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        MockProvider(AuthService, {
          isAuthorized(): Signal<boolean> {
            return signal(false)
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

  it('display login button when not authorized', () => {
    expect(byTestAttr(fixture, 'login-button')).toBeTruthy()
    expect(component).toBeTruthy()
  })

  it('have register button with navigation', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'register-button')
    expect(btn).toBeTruthy()

    const spy = spyOn(TestBed.inject(Router), 'navigateByUrl')

    btn.click()
    expect(spy).toHaveBeenCalledOnceWith(jasmine.anything(), jasmine.anything())
  })

  it('have login button with navigation', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'login-button')
    expect(btn).toBeTruthy()

    const spy = spyOn(TestBed.inject(Router), 'navigateByUrl')

    btn.click()
    expect(spy).toHaveBeenCalledOnceWith(jasmine.anything(), jasmine.anything())
  })
})
