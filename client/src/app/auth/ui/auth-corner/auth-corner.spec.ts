import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

import { AuthCorner } from './auth-corner'
import { AuthService } from '../../utils/auth.service'
import { provideRouter } from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { Signal, signal } from '@angular/core'
import { byTestAttr } from '@testing'

describe('AuthCorner', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display login button when not authorized', () => {
    expect(byTestAttr(fixture, 'login-button')).toBeTruthy()
    expect(component).toBeTruthy()
  })
})
