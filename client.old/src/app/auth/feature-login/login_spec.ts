import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Login } from './login'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import {
  byTestAttr,
  fakeSnapshot,
  setValue,
  withResolvedData
} from '@common/testing'
import { MockProvider } from 'ng-mocks'
import { ActivatedRoute } from '@angular/router'
import { ChefValidations } from '../utils/chef_validations'
import { fakeValidations, withField } from '@common/validations/testing'

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
        provideApiBaseUrlTesting(),
        MockProvider(ActivatedRoute, {
          snapshot: fakeSnapshot(
            withResolvedData(
              'chefValidations',
              new ChefValidations(
                fakeValidations([
                  withField('name').required().min(1).max(100).build(),
                  withField('password').required().min(1).max(100).build(),
                  withField('email').min(1).max(100).build()
                ])
              )
            )
          )
        })
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
