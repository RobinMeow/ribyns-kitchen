/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router'
import { ValidationField } from '@common/constraints'
import { RecipeApi } from '../util/recipe_api'

export const createRecipeValidationFieldsResolver: ResolveFn<
  Promise<readonly ValidationField[]>
> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const array = inject(RecipeApi).getCreateRecipeConstraints()
  return Object.freeze(array)
}
