import { Routes } from '@angular/router'

/** @__PURE__ */
export const coreRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => (await import('./feature-home/home')).Home,
    title: 'Startseite'
  },
  {
    path: '**',
    redirectTo: ''
  }
]
