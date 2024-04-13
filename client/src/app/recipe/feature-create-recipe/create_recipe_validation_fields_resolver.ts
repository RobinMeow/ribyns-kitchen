/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router'
import { FieldValidations } from '@common/constraints'
import { RecipeApi } from '../util/recipe_api'

export const createRecipeValidationFieldsResolver: ResolveFn<
  Promise<readonly FieldValidations[]>
> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const array = await inject(RecipeApi).getCreateRecipeConstraints()
  return Object.freeze(array)
}
