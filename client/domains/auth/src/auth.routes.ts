import { Route } from '@angular/router';
import { authorizedGuard } from './lib/utils/authorized.guard';
import { unauthorizedGuard } from './lib/utils/unauthorized.guard';

// TODO: maybe, use auth as prefix for the paths.
export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./lib/feature-login/login.component')).LoginComponent,
    title: 'Einloggen',
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('./lib/feature-register/register.component'))
        .RegisterComponent,
    title: 'Registrieren',
  },
  {
    path: 'delete-account',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./lib/feature-delete-account/delete-account.component'))
        .DeleteAccountComponent,
    title: 'Account löschen',
  },
];
