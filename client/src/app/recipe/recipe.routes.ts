import { Route } from '@angular/router';
import { authorizedGuard } from '@auth';

export const recipeRoutes: Route[] = [
  {
    path: 'create-recipe',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-create-recipe/create-recipe')).CreateRecipe,
    title: 'Rezept hinzufügen',
  },
  {
    path: 'recipe/:id',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-view-recipe/view-recipe')).ViewRecipe,
    title: 'Rezept',
  },
];
