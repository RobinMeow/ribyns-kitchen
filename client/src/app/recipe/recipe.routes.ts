import { Route } from '@angular/router'
import { authorizedGuard } from '@auth'
import { recipeResolver } from './recipe-view/recipe.resolver'

export const recipeRoutes: Route[] = [
  {
    path: 'create-recipe',
    canActivate: [authorizedGuard],
    loadComponent: async () =>
      (await import('./create-recipe-view/create-recipe.view'))
        .CreateRecipeView,
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
