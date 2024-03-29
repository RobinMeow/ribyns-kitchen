import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Login } from './login'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@testing'

describe('Login should', () => {
  let component: Login
  let fixture: ComponentFixture<Login>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        provideApiBaseUrlTesting()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(Login)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('have visible title', () => {
    expect(byTestAttr(fixture, 'title')).toBeTruthy()
  })

  it('have disabled submit button', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'login-submit-button')
    expect(btn).toBeTruthy()
    expect(btn.disabled).toBeTrue()
  })

  it('have enabled submit button with valid form', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'login-submit-button')
    expect(btn.disabled).toBeTrue()

    const chefnameInput = byTestAttr<HTMLInputElement>(
      fixture,
      'login-name-input'
    )
    setValue(chefnameInput, 'Weinberg des Herrn')

    const pwInput = byTestAttr<HTMLInputElement>(fixture, 'password-input')
    setValue(pwInput, 'iLoveJesus<3!')

    fixture.detectChanges()

    expect(btn.disabled).toBeFalse()
  })
})
