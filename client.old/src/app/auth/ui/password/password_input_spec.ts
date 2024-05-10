import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PasswordInput } from './password_input'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { FormControl } from '@angular/forms'
import { byTestAttr } from '@common/testing'

describe('PasswordInput should', () => {
  let component: PasswordInput
  let fixture: ComponentFixture<PasswordInput>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInput],
      providers: [provideNoopAnimations()]
    }).compileComponents()
    fixture = TestBed.createComponent(PasswordInput)
    fixture.componentRef.setInput(
      'passwordControl',
      new FormControl<string>('')
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render', () => {
    expect(byTestAttr(fixture, 'password-input')).toBeTruthy()
    expect(byTestAttr(fixture, 'password-eye-toggle')).toBeTruthy()
  })

  it('hide hint by default', () => {
    expect(fixture.componentInstance.showHint()).toBeFalse()
    expect(byTestAttr(fixture, 'password-hint')).toBeFalsy()
  })

  it('display hint on showHint changed', () => {
    fixture.componentRef.setInput('showHint', true)
    fixture.detectChanges()
    expect(fixture.componentInstance.showHint()).toBeTrue()
    expect(byTestAttr(fixture, 'password-hint')).toBeTruthy()
  })

  it('have password input with type password', () => {
    const input = byTestAttr<HTMLInputElement>(fixture, 'password-input')
    expect(input.type).toBe('password')
  })

  it('have visible text after password-eye-toggle', () => {
    byTestAttr<HTMLButtonElement>(fixture, 'password-eye-toggle').click()
    fixture.detectChanges()
    const input = byTestAttr<HTMLInputElement>(fixture, 'password-input')
    expect(input.type).toBe('text')
  })
})
