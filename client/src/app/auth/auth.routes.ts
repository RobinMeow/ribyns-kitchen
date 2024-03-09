import { Route } from '@angular/router';
import { unauthorizedGuard } from './utils/unauthorized.guard';
import { authorizedGuard } from './utils/authorized.guard';

export const authRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./feature-login/login.component')).LoginComponent,
    title: 'Einloggen',
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./feature-register/register.component')).RegisterComponent,
    title: 'Registrieren',
  },
  {
    path: 'delete-account',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-delete-account/delete-account')).DeleteAccount,
    title: 'Account löschen',
  },
];
