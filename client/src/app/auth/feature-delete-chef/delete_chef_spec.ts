import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { DeleteChef } from './delete_chef'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@common/testing'
import { AuthService } from '../utils/auth_service'
import { Router } from '@angular/router'
import { MockProvider } from 'ng-mocks'

describe('DeleteChef should', () => {
  let component: DeleteChef
  let fixture: ComponentFixture<DeleteChef>
  let authService: AuthService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteChef],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        provideApiBaseUrlTesting(),
        MockProvider(AuthService)
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(DeleteChef)
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
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

  it('ignore onSubmit click event if from is invalid', async () => {
    const comp = component as unknown as {
      onSubmit(): Promise<void>
      form: { invalid: boolean }
    }

    const removeAsyncSpy = spyOn(authService, 'removeAsync')
    const onSubmitSpy = spyOn(comp, 'onSubmit')
    const navigateSpy = spyOn(router, 'navigateByUrl')

    expect(comp.form.invalid).toBeTrue()

    await comp.onSubmit()

    expect(onSubmitSpy).toHaveBeenCalled()
    expect(removeAsyncSpy).not.toHaveBeenCalled()
    expect(navigateSpy).not.toHaveBeenCalled()
  })
})
