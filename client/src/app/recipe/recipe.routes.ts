import { Route } from '@angular/router'
import { authorizedGuard } from '@auth'
import { recipeResolver } from './feature-view-recipe/recipe.resolver'

/** @__PURE__ */
export const recipeRoutes: Route[] = [
  {
    path: 'create-recipe',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-create-recipe/create-recipe')).CreateRecipe,
    title: 'Rezept hinzufügen'
  },
  {
    path: 'recipe/:recipeId',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./feature-view-recipe/view-recipe')).ViewRecipe,
    title: 'Rezept',
    resolve: {
      recipe: recipeResolver
    }
  }
]
