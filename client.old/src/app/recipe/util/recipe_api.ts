import { Injectable } from '@angular/core'
import { BaseApi } from '@api'
import { firstValueFrom, map } from 'rxjs'
import { NewRecipe } from './new_recipe'
import { Recipe } from './recipe'
import { RecipeDto } from './recipe_dto'
import { RecipeValidations } from './recipe_validations'
import { Validations } from '@common/validations'

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
      .pipe(map(this.toRecipe))

    return firstValueFrom(request$)
  }

  getAsync(id: string): Promise<Recipe> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.URL + 'GetAsync?recipeId=' + id

    const request$ = this.httpClient
      .get<RecipeDto>(url, {
        headers: headers
      })
      .pipe(map(this.toRecipe))

    return firstValueFrom(request$)
  }

  getValidationsAsync(): Promise<Readonly<RecipeValidations>> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.URL + 'GetValidations'

    const request$ = this.httpClient
      .get<Validations>(url, {
        headers: headers
      })
      .pipe(
        map((validations) => Object.freeze(new RecipeValidations(validations)))
      )

    return firstValueFrom(request$)
  }

  private toRecipe(dto: RecipeDto): Recipe {
    return new Recipe(dto)
  }
}
