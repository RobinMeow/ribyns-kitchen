import { Route } from '@angular/router'
import { authorizedGuard } from '@auth'
import { recipeResolver } from './feature-view-recipe/recipe_resolver'

export const recipeRoutes: Route[] = [
  {
    path: 'create-recipe',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-create-recipe/create_recipe')).CreateRecipe,
    title: 'Rezept hinzufügen'
  },
  {
    path: 'recipe/:recipeId',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-view-recipe/view_recipe')).ViewRecipe,
    title: 'Rezept',
    resolve: {
      recipe: recipeResolver
    }
  }
]
