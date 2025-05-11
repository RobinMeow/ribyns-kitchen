import { Route } from '@angular/router'
import { unauthorizedGuard } from './utils/unauthorized.guard'
import { authorizedGuard } from './utils/authorized.guard'
import { chefValidationsResolver } from './utils/chef.validations.resolver'

export const authRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./login-view/login.view')).LoginView,
    title: 'Einloggen',
    resolve: {
      chefValidations: chefValidationsResolver
    }
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./register-view/register.view')).RegisterView,
    title: 'Registrieren',
    resolve: {
      chefValidations: chefValidationsResolver
    }
  },
  {
    path: 'delete-chef',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./delete-chef-view/delete-chef.view')).DeleteChefView,
    title: 'Account löschen'
  }
]
