import { Route } from '@angular/router'
import { authorizedGuard } from './utils/authorized.guard'
import { unauthorizedGuard } from './utils/unauthorized.guard'

export const authRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./login-view/login.view')).LoginView,
    title: 'Einloggen'
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./register-view/register.view')).RegisterView,
    title: 'Registrieren'
  },
  {
    path: 'delete-chef',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./delete-chef-view/delete-chef.view')).DeleteChefView,
    title: 'Account löschen'
  }
]
