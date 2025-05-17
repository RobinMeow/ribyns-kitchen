import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from '@api'
import { byTestAttr, setValue } from '@common/testing'
import { MockProvider } from 'ng-mocks'
import { RecipeApi } from '../util/recipe.api'
import { NewRecipeView } from './new-recipe.view'

describe('CreateRecipe should', () => {
  let component: NewRecipeView
  let recipeApi: RecipeApi
  let fixture: ComponentFixture<NewRecipeView>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipeView],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        MockProvider(RecipeApi)
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(NewRecipeView)
    component = fixture.componentInstance
    fixture.detectChanges()
    recipeApi = TestBed.inject(RecipeApi)
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render title', () => {
    expect(byTestAttr(fixture, 'title')).toBeTruthy()
  })

  it('render form', () => {
    expect(byTestAttr(fixture, 'new-recipe-form')).toBeTruthy()
  })

  it('render recipe-name-input', () => {
    expect(byTestAttr(fixture, 'recipe-name-input')).toBeTruthy()
  })

  it('render submit button', () => {
    expect(byTestAttr(fixture, 'new-recipe-submit-button')).toBeTruthy()
  })

  it('have disabled submit button by default', () => {
    const btn = byTestAttr<HTMLButtonElement>(
      fixture,
      'new-recipe-submit-button'
    )
    expect(btn.disabled).toBeTrue()
  })

  it('enable submit button after valid inputs', () => {
    const btn = byTestAttr<HTMLButtonElement>(
      fixture,
      'new-recipe-submit-button'
    )
    expect(btn).toBeTruthy()
    expect(btn.disabled).toBeTrue()

    const input = byTestAttr<HTMLInputElement>(fixture, 'recipe-name-input')
    setValue(input, 'ABC')
    fixture.detectChanges()

    expect(btn.disabled).toBeFalse()
  })

  it('not send http request when form is submitted invalid', () => {
    const form = byTestAttr<HTMLFormElement>(fixture, 'new-recipe-form')
    expect(form.querySelector('[invalid]')).toBeDefined()
    expect(component['form'].invalid).toBeTrue()

    const addAsyncSpy = spyOn(recipeApi, 'newAsync')

    const submitButton = byTestAttr<HTMLButtonElement>(
      fixture,
      'new-recipe-submit-button'
    )

    expect(submitButton.disabled).toBe(true)

    submitButton.click()
    expect(addAsyncSpy).not.toHaveBeenCalled()
  })
})
