import { Route } from '@angular/router'
import { unauthorizedGuard } from './utils/unauthorized_guard'
import { authorizedGuard } from './utils/authorized_guard'

export const authRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () => (await import('./feature-login/login')).Login,
    title: 'Einloggen'
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./feature-register/register')).Register,
    title: 'Registrieren'
  },
  {
    path: 'delete-chef',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-delete-chef/delete_chef')).DeleteChef,
    title: 'Account löschen'
  }
]
