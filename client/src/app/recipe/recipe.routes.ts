import { Route } from '@angular/router';
import { authorizedGuard } from '@auth';

export const recipeRoutes: Route[] = [
  {
    path: 'add-recipe',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-add-recipe/add-recipe')).AddRecipe,
    title: 'Rezept hinzufügen',
  },
  {
    path: 'recipe/:id',
    canActivate: [authorizedGuard],
    loadComponent: async () => (await import('./feature-recipe/recipe')).Recipe,
    title: 'Rezept',
  },
];
