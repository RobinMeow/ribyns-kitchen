/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router'
import { RecipeApi } from './recipe_api'
import { RecipeValidations } from './recipe_validations'

export const recipeValidationsResolver: ResolveFn<
  Promise<Readonly<RecipeValidations>>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(RecipeApi).getValidationsAsync()
}
