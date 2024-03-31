import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideApiBaseUrlTesting } from '@api'
import { RecipeApi } from './recipe.api'

describe('RecipeApi should', () => {
  let recipeApi: RecipeApi

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeApi,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting()
      ]
    })

    recipeApi = TestBed.inject(RecipeApi)
  })

  it('create', () => {
    expect(recipeApi).toBeTruthy()
  })

  it('create a new recipe successfully', () => {
    fail()
  })

  it('handle errors during creation', () => {
    fail()
  })
})
