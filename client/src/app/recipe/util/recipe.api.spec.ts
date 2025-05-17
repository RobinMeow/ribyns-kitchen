import { provideHttpClient } from '@angular/common/http'
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { API_BASE_URL, provideApiBaseUrlTesting } from '@api'
import { MockProvider } from 'ng-mocks'
import { TokenStorage } from 'src/app/auth/utils/token.storage'
import { Recipe } from './recipe'
import { RecipeApi } from './recipe.api'

describe('RecipeApi should', () => {
  let recipeApi: RecipeApi
  let httpTestingController: HttpTestingController
  let baseUrl: string

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeApi,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        MockProvider(TokenStorage, {
          retrieve() {
            return 'token'
          }
        })
      ]
    })

    recipeApi = TestBed.inject(RecipeApi)
    baseUrl = TestBed.inject(API_BASE_URL) + '/Recipe/'
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpTestingController.verify())

  it('create', () => {
    expect(recipeApi).toBeTruthy()
  })

  describe('newAsync', () => {
    it('create a new recipe successfully', async () => {
      const promise = recipeApi.newAsync({
        name: ''
      })
      const dtoMock = {} as Recipe

      httpTestingController.expectOne(baseUrl + 'AddAsync').flush(dtoMock)

      await expectAsync(promise).toBeResolvedTo(dtoMock)
    })

    it('reject on http error', async () => {
      const promise = recipeApi.newAsync({
        name: ''
      })

      httpTestingController
        .expectOne(baseUrl + 'AddAsync')
        .error(new ProgressEvent(''))

      await expectAsync(promise).toBeRejected()
    })
  })

  describe('getAsync should', () => {
    it('resolve to recipe', async () => {
      const recipeId = '123'
      const promise = recipeApi.get(recipeId)

      const dtoMock = {} as Recipe

      httpTestingController
        .expectOne(baseUrl + 'GetAsync?recipeId=' + recipeId)
        .flush(dtoMock)

      await expectAsync(promise).toBeResolvedTo(dtoMock)
    })

    it('reject on http error', async () => {
      const recipeId = '123'
      const promise = recipeApi.get(recipeId)

      httpTestingController
        .expectOne(baseUrl + 'GetAsync?recipeId=' + recipeId)
        .error(new ProgressEvent(''))

      await expectAsync(promise).toBeRejected()
    })
  })
})
