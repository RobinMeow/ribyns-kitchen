import { Injectable } from '@angular/core'
import { BaseApi } from '@api'
import { firstValueFrom } from 'rxjs'
import { NewRecipe } from './new-recipe'
import { Recipe } from './recipe'

@Injectable({ providedIn: 'root' })
export class RecipeApi extends BaseApi {
  private readonly baseUrl = this.BASE_URL + '/Recipe/'

  newAsync(recipe: NewRecipe): Promise<Recipe> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.baseUrl + 'AddAsync'

    return firstValueFrom(
      this.httpClient.post<Recipe>(url, recipe, {
        headers: headers
      })
    )
  }

  get(id: string): Promise<Recipe> {
    const headers = this.defaultHeadersWithAuth() // TODO why am I not relying on my interceptor?

    return firstValueFrom(
      this.httpClient.get<Recipe>(`${this.baseUrl}GetAsync?recipeId=${id}`, {
        headers: headers
      })
    )
  }
}
