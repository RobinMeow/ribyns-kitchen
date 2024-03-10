import { Injectable } from '@angular/core';
import { BaseApi } from '@api';
import { firstValueFrom, map } from 'rxjs';
import { NewRecipe } from './NewRecipe';
import { RecipeModel } from './RecipeModel';
import { RecipeDto } from './RecipeDto';

@Injectable({ providedIn: 'root' })
export class RecipeApi extends BaseApi {
  private readonly URL = this.BASE_URL + '/Recipe/';

  newAsync(recipe: NewRecipe): Promise<RecipeDto> {
    const headers = this.defaultHeadersWithAuth();
    const url = this.URL + 'AddAsync';

    const request$ = this.httpClient
      .post<RecipeDto>(url, recipe, {
        headers: headers,
      })
      .pipe(map((dto) => new RecipeModel(dto)));

    return firstValueFrom(request$);
  }
}
