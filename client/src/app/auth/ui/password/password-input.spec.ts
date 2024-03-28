import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PasswordInput } from './password-input'
import { FormControl } from '@angular/forms'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

describe('PasswordInput', () => {
  let component: PasswordInput
  let fixture: ComponentFixture<PasswordInput>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInput],
      providers: [provideNoopAnimations()]
    }).compileComponents()

    fixture = TestBed.createComponent(PasswordInput)
    component = fixture.componentInstance
    component.passwordControl = new FormControl<string>('', {
      nonNullable: true
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
