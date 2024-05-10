import { Route } from '@angular/router'
import { unauthorizedGuard } from './utils/unauthorized_guard'
import { authorizedGuard } from './utils/authorized_guard'
import { chefValidationsResolver } from './utils/chef_validations_resolver'

export const authRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () => (await import('./feature-login/login')).Login,
    title: 'Einloggen',
    resolve: {
      chefValidations: chefValidationsResolver
    }
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./feature-register/register')).Register,
    title: 'Registrieren',
    resolve: {
      chefValidations: chefValidationsResolver
    }
  },
  {
    path: 'delete-chef',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-delete-chef/delete_chef')).DeleteChef,
    title: 'Account löschen'
  }
]
