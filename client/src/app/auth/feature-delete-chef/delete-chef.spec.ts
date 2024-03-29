import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { DeleteChef } from './delete-chef'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@testing'

describe('DeleteChef should', () => {
  let component: DeleteChef
  let fixture: ComponentFixture<DeleteChef>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteChef],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        provideApiBaseUrlTesting()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(DeleteChef)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render title', () => {
    expect(byTestAttr(fixture, 'title')).toBeTruthy()
  })

  it('render submit-btn', () => {
    expect(byTestAttr(fixture, 'submit-btn')).toBeTruthy()
  })

  it('have disabled submit-btn', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'submit-btn')
    expect(btn.disabled).toBeTrue()
  })

  it('have enabled submit-btn after valid input', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'submit-btn')
    expect(btn.disabled).toBeTrue()

    const input = byTestAttr<HTMLInputElement>(fixture, 'password-input')
    setValue(input, 'meow')

    fixture.detectChanges()

    expect(btn.disabled).toBeFalse()
  })
})
