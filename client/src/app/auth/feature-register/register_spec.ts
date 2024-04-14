import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

import { Register } from './register'
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

describe('Register should', () => {
  let component: Register
  let fixture: ComponentFixture<Register>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
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

    fixture = TestBed.createComponent(Register)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('have title', () => {
    expect(byTestAttr(fixture, 'title')).toBeTruthy()
  })

  it('have invalid register form', () => {
    expect(component['registerForm'].invalid).toBeTrue()
  })

  it('have disabled submit button', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'register-submit-button')
    expect(component['registerForm'].invalid).toBeTrue()
    expect(btn.disabled).toBeTrue()
  })

  it('have enabled submit button with valid form', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'register-submit-button')
    expect(btn.disabled).toBeTrue()

    const nameInput = byTestAttr<HTMLInputElement>(
      fixture,
      'register-name-input'
    )
    setValue(nameInput, 'Weinberg des Herrn')

    fixture.detectChanges()
    expect(btn.disabled).toBeTrue()

    const passwordInput = byTestAttr<HTMLInputElement>(
      fixture,
      'password-input'
    )
    setValue(passwordInput, 'iLoveJesus<3')

    fixture.detectChanges()
    expect(btn.disabled).toBeFalse()
  })
})
