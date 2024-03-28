import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PasswordInput } from './password-input'
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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
