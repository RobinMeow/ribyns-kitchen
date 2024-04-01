import { Routes } from '@angular/router'

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
