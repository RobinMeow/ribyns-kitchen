import { Routes } from '@angular/router';
import { authorizedGuard } from './auth/guards/authorized.guard';
import { unauthorizedGuard } from './auth/guards/unauthorized.guard';

export const CORE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () =>
      (await import('src/app/core/home/home.component')).HomeComponent,
    title: 'Startseite',
  },
  {
    path: 'login',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('src/app/core/auth/login/login.component')).LoginComponent,
    title: 'Einloggen',
  },
  {
    path: 'register',
    canActivate: [unauthorizedGuard],
    loadComponent: async () =>
      (await import('src/app/core/auth/register/register.component'))
        .RegisterComponent,
    title: 'Registrieren',
  },
  {
    path: 'delete-account',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (
        await import(
          'src/app/core/auth/delete-account/delete-account.component'
        )
      ).DeleteAccountComponent,
    title: 'Account löschen',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

// lazy load children: https://youtu.be/c5f8Y2fzZM0?t=777
// https://angular.io/guide/lazy-loading-ngmodules#config-routes
