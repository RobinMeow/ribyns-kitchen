import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

import { CreateRecipe } from './create-recipe'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { RecipeApi } from '../util/recipe.api'
import { provideApiBaseUrlTesting } from '@api'
import { queryByTestAttr } from '@testing'

describe('CreateRecipe should', () => {
  let component: CreateRecipe
  let recipeApi: RecipeApi
  let fixture: ComponentFixture<CreateRecipe>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipe],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        RecipeApi
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CreateRecipe)
    component = fixture.componentInstance
    fixture.detectChanges()
    recipeApi = TestBed.inject(RecipeApi)
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render title', () => {
    expect(queryByTestAttr(fixture, 'title')).toBeTruthy()
  })

  it('render form', () => {
    expect(queryByTestAttr(fixture, 'create-recipe-form')).toBeTruthy()
  })

  it('render recipe-title-input', () => {
    expect(queryByTestAttr(fixture, 'recipe-title-input')).toBeTruthy()
  })

  it('render submit button', () => {
    expect(queryByTestAttr(fixture, 'create-recipe-submit-button')).toBeTruthy()
  })

  it('have disabled submit button by default', () => {
    const btn = queryByTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-submit-button'
    )
    expect(btn.disabled).toBeTrue()
  })

  it('enable submit button after valid inputs', () => {
    const btn = queryByTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-submit-button'
    )
    expect(btn).toBeTruthy()
    expect(btn.disabled).toBeTrue()

    const input = queryByTestAttr<HTMLInputElement>(
      fixture,
      'recipe-title-input'
    )
    input.value = 'valid title'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(btn.disabled).toBeFalse()
  })

  it('not send http reuqest when form is submitted invalid', async () => {
    const form = queryByTestAttr<HTMLFormElement>(fixture, 'create-recipe-form')
    expect(form.querySelector('[invalid]')).toBeDefined()

    const addAsyncSpy = spyOn(recipeApi, 'newAsync')

    const submitButton = queryByTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-submit-button'
    )

    expect(submitButton.disabled).toBe(true)

    submitButton.click()
    expect(addAsyncSpy).not.toHaveBeenCalled()
  })
})
