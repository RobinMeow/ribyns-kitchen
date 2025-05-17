import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@common/testing'
import { LoginView } from './login.view'

describe('LoginView should', () => {
  let component: LoginView
  let fixture: ComponentFixture<LoginView>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginView],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        provideApiBaseUrlTesting()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginView)
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

    const chefnameInput = byTestAttr<HTMLInputElement>(fixture, 'login-name-input')
    setValue(chefnameInput, 'Weinberg des Herrn')

    const pwInput = byTestAttr<HTMLInputElement>(fixture, 'password-input')
    setValue(pwInput, 'iLoveJesus<3!')

    fixture.detectChanges()

    expect(btn.disabled).toBeFalse()
  })
})
