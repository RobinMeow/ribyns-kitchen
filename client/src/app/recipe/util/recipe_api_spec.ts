import { provideHttpClient } from '@angular/common/http'
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { API_BASE_URL, provideApiBaseUrlTesting } from '@api'
import { RecipeApi } from './recipe_api'
import { RecipeDto } from './recipe_dto'
import { Recipe } from './recipe'
import { MockProvider } from 'ng-mocks'
import { TokenStorage } from 'src/app/auth/utils/token_storage'

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
        title: ''
      })
      const dtoMock = {} as RecipeDto

      httpTestingController.expectOne(baseUrl + 'AddAsync').flush(dtoMock)

      await expectAsync(promise).toBeResolvedTo(new Recipe(dtoMock))
    })

    it('reject on http error', async () => {
      const promise = recipeApi.newAsync({
        title: ''
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
      const promise = recipeApi.getAsync(recipeId)

      const dtoMock = {} as RecipeDto

      httpTestingController
        .expectOne(baseUrl + 'GetAsync?recipeId=' + recipeId)
        .flush(dtoMock)

      await expectAsync(promise).toBeResolvedTo(new Recipe(dtoMock))
    })

    it('reject on http error', async () => {
      const recipeId = '123'
      const promise = recipeApi.getAsync(recipeId)

      httpTestingController
        .expectOne(baseUrl + 'GetAsync?recipeId=' + recipeId)
        .error(new ProgressEvent(''))

      await expectAsync(promise).toBeRejected()
    })
  })
})
