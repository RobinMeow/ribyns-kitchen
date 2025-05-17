import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@common/testing'
import { RegisterView } from './register.view'

describe('RegisterView should', () => {
  let component: RegisterView
  let fixture: ComponentFixture<RegisterView>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterView],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        provideApiBaseUrlTesting()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(RegisterView)
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
    expect(component['form'].invalid).toBeTrue()
  })

  it('have disabled submit button', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'register-submit-button')
    expect(component['form'].invalid).toBeTrue()
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
