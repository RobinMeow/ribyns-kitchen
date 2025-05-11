import { Injectable } from '@angular/core'
import { BaseApi } from '@api'
import { Validations } from '@common/validations'
import { firstValueFrom, map } from 'rxjs'
import { NewRecipe } from './new-recipe'
import { Recipe } from './recipe'
import { RecipeDto } from './recipe.dto'
import { RecipeValidations } from './recipe.validations'

@Injectable({ providedIn: 'root' })
export class RecipeApi extends BaseApi {
  private readonly URL = this.BASE_URL + '/Recipe/'

  newAsync(recipe: NewRecipe): Promise<RecipeDto> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.URL + 'AddAsync'

    const request$ = this.httpClient
      .post<RecipeDto>(url, recipe, {
        headers: headers
      })
      .pipe(map(toRecipe))

    return firstValueFrom(request$)
  }

  getAsync(id: string): Promise<Recipe> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.URL + 'GetAsync?recipeId=' + id

    const request$ = this.httpClient
      .get<RecipeDto>(url, {
        headers: headers
      })
      .pipe(map(toRecipe))

    return firstValueFrom(request$)
  }

  getValidationsAsync(): Promise<Readonly<RecipeValidations>> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.URL + 'GetValidations'

    const request$ = this.httpClient
      .get<Validations>(url, {
        headers: headers
      })
      .pipe(map((validations) => Object.freeze(new RecipeValidations(validations))))

    return firstValueFrom(request$)
  }
}

function toRecipe(dto: RecipeDto): Recipe {
  return new Recipe(dto)
}
