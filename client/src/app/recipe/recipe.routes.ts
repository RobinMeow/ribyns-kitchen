import { Route } from '@angular/router'
import { authorizedGuard } from '@auth'
import { recipeResolver } from './recipe-view/recipe.resolver'

export const recipeRoutes: Route[] = [
  {
    path: 'new-recipe',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./new-recipe-view/new-recipe.view')).NewRecipeView,
    title: 'Rezept hinzufügen'
  },
  {
    path: 'recipe/:recipeId',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./recipe-view/recipe.view')).RecipeView,
    title: 'Rezept',
    resolve: {
      recipe: recipeResolver
    }
  }
]
