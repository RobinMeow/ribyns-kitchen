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
  Promise<Array<ValidationField>>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(RecipeApi).getNewRecipeConstraints()
}
