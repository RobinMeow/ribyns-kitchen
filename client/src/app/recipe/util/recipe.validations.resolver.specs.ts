import { TestBed } from '@angular/core/testing'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { fakeValidations, withField } from '@common/validations/testing'
import { MockProvider } from 'ng-mocks'
import { RecipeApi } from './recipe.api'
import { RecipeValidations } from './recipe.validations'
import { recipeValidationsResolver } from './recipe.validations.resolver'

describe('chefValidationsResolver should', () => {
  let recipeApi: RecipeApi
  let route: ActivatedRouteSnapshot
  const state = undefined! as RouterStateSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(RecipeApi), MockProvider(ActivatedRoute)]
    })

    recipeApi = TestBed.inject(RecipeApi)
    route = TestBed.inject(ActivatedRoute).snapshot
  })

  it('resolve to ChefValidations', async () => {
    const expectedValidations = new RecipeValidations(
      fakeValidations([withField('meow').required().build()])
    )

    const spy = spyOn(recipeApi, 'getValidationsAsync').and.returnValue(
      Promise.resolve(expectedValidations)
    )

    let actual: RecipeValidations
    await TestBed.runInInjectionContext(async () => {
      actual = (await recipeValidationsResolver(route, state)) as RecipeValidations
    })

    expect(actual!).toEqual(expectedValidations)
    expect(spy).toHaveBeenCalledOnceWith()
  })

  // TODO e2e test which covers feedback on rejected resolver

  it('rejects when api rejects as well', async () => {
    const err = new Error('dummy')
    const apiSpy = spyOn(recipeApi, 'getValidationsAsync').and.returnValue(
      Promise.reject(err)
    )

    await TestBed.runInInjectionContext(async () => {
      const promise = recipeValidationsResolver(route, state)
      await expectAsync(promise as Promise<unknown>).toBeRejectedWith(err)
    })

    expect(apiSpy).toHaveBeenCalledOnceWith()
  })
})
