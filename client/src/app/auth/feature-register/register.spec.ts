import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

import { Register } from './register'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@testing'

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
        provideApiBaseUrlTesting()
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

  it('have disabled submit button', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'register-submit-button')
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
