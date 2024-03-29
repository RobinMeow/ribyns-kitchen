import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PasswordInput } from './password.input'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { FormControl } from '@angular/forms'
import { byTestAttr } from '@testing'

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

  it('hide hint by default', () => {
    expect(fixture.componentInstance.showHint()).toBeFalse()
    expect(byTestAttr<unknown>(fixture, 'password-hint')).toBeFalsy()
  })

  it('display hint on showHint changed', () => {
    fixture.componentRef.setInput('showHint', true)
    fixture.detectChanges()
    expect(fixture.componentInstance.showHint()).toBeTrue()
    expect(byTestAttr<unknown>(fixture, 'password-hint')).toBeTruthy()
  })
})
