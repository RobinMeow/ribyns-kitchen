/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router'
import { AuthService } from './auth_service'
import { ChefValidations } from './chef_validations'

export const chefValidationsResolver: ResolveFn<
  Promise<Readonly<ChefValidations>>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthService).getValidationsAsync()
}
