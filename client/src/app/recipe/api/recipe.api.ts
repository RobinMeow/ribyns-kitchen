import { Injectable } from '@angular/core';
import { BaseApi } from '@api';
import { firstValueFrom, map } from 'rxjs';
import { NewRecipe } from '../util/NewRecipe';
import { Recipe } from '../util/Recipe';
import { RecipeApiDto } from './Recipe.api-dto';

// TODO spec tests

@Injectable({ providedIn: 'root' })
export class RecipeApi extends BaseApi {
  private readonly URL = this.BASE_URL + '/Recipe/';

  newAsync(recipe: NewRecipe): Promise<Recipe> {
    const headers = this.defaultHeadersWithAuth();
    const url = this.URL + 'AddAsync';

    const request$ = this.httpClient
      .post<RecipeApiDto>(url, recipe, {
        headers: headers,
      })
      .pipe(map((dto) => new Recipe(dto)));

    return firstValueFrom(request$);
  }
}
