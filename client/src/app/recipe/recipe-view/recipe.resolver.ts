import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router'
import { inject } from '@angular/core'
import { RecipeApi } from '../util/recipe.api'
import { assert } from '@common/assertions'
import { Recipe } from '../util/recipe'

export const recipeResolver: ResolveFn<Promise<Recipe>> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const recipeApi = inject(RecipeApi)

  const id: string | null = route.paramMap.get('recipeId')

  assert(
    typeof id === 'string',
    'recipeResolver requires recipeId in paramMap.'
  )

  return recipeApi.get(id)
}
