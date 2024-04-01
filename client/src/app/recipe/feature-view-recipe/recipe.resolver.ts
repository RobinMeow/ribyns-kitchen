/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { Recipe } from '../util/Recipe'
import { inject } from '@angular/core'
import { RecipeApi } from '../util/recipe.api'
import { assert } from '@common/assertions'

/** @__PURE__ */
export const recipeResolver: ResolveFn<Promise<Recipe>> = (
  route: ActivatedRouteSnapshot,
  _: unknown
) => {
  const api = inject(RecipeApi)

  const id: string | null = route.paramMap.get('recipeId')

  assert(
    typeof id === 'string',
    'recipeResolver requires recipeId in paramMap.'
  )

  return api.getAsync(id)
}
