import { Routes } from '@angular/router';

export const CORE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () =>
      (await import('src/app/core/home/home.component')).HomeComponent,
    title: 'Startseite',
  },
  {
    path: '',
    loadChildren: async () => (await import('@auth')).AUTH_ROUTES,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

// lazy load children: https://youtu.be/c5f8Y2fzZM0?t=777
// https://angular.io/guide/lazy-loading-ngmodules#config-routes
