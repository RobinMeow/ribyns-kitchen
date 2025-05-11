import { Routes } from '@angular/router'

export const coreRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => (await import('./home-view/home.view')).HomeView,
    title: 'Startseite'
  },
  {
    path: '**',
    redirectTo: ''
  }
]
