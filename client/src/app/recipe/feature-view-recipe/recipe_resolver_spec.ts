import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Recipe } from '../util/recipe'
import { recipeResolver } from './recipe_resolver'
import { RecipeApi } from '../util/recipe_api'
import { MockProvider } from 'ng-mocks'

describe('recipeResolver shoul', () => {
  let recipeApi: RecipeApi
  const route = {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get(_: string): string | null {
        return null
      }
    }
  } as ActivatedRouteSnapshot
  const state = undefined! as RouterStateSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(RecipeApi),
        { provide: ActivatedRouteSnapshot, useValue: route }
      ]
    })

    recipeApi = TestBed.inject(RecipeApi)
  })

  it('resolve to a Recipe when a valid recipeId is provided', async () => {
    spyOn(route.paramMap, 'get').and.returnValue('123')
    const expectedRecipe: Recipe = {} as Recipe

    const spy = spyOn(recipeApi, 'getAsync').and.returnValue(
      Promise.resolve(expectedRecipe)
    )

    let actualRecipe: Recipe
    await TestBed.runInInjectionContext(async () => {
      actualRecipe = (await recipeResolver(route, state)) as Recipe
    })

    expect(spy).toHaveBeenCalledWith('123')
    expect(actualRecipe!).toEqual(expectedRecipe)
  })

  // TODO e2e test which covers feedback on unresolved recipe

  // recipe remotely deleted by other user + cached view on current user
  it('handle when server doesnt send a recipe', async () => {
    const paramMapSpy = spyOn(route.paramMap, 'get').and.returnValue('123')
    const apiSpy = spyOn(recipeApi, 'getAsync').and.returnValue(
      Promise.reject(null)
    )

    await TestBed.runInInjectionContext(async () => {
      const promise = recipeResolver(route, state)
      await expectAsync(<Promise<Recipe>>promise).toBeRejectedWith(null)
    })

    expect(paramMapSpy).toHaveBeenCalledOnceWith('recipeId')
    expect(apiSpy).toHaveBeenCalledOnceWith('123')
  })

  it('throw an error when recipeId is missing in route', async () => {
    TestBed.runInInjectionContext(() =>
      expect(() => recipeResolver(route, state)).toThrowError(
        'recipeResolver requires recipeId in paramMap.'
      )
    )
  })
})
