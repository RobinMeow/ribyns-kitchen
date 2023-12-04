import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { loggedOutGuard } from './auth/logged-out.guard';

export const CORE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('src/app/core/home/home.component').then((c) => c.HomeComponent),
    title: 'Startseite',
  },
  {
    path: 'login',
    canActivate: [loggedOutGuard],
    loadComponent: () =>
      import('src/app/core/auth/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    title: 'Einloggen',
  },
  {
    path: 'register',
    canActivate: [loggedOutGuard],
    loadComponent: () =>
      import('src/app/core/auth/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
    title: 'Registrieren',
  },
  {
    path: 'delete-account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('src/app/core/auth/delete-account/delete-account.component').then(
        (c) => c.DeleteAccountComponent,
      ),
    title: 'Account löschen',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

// lazy load children: https://youtu.be/c5f8Y2fzZM0?t=777
// https://angular.io/guide/lazy-loading-ngmodules#config-routes
