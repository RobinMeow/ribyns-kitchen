import { Injectable } from '@angular/core'
import { BaseApi, ValidationFieldDto, ConstraintDto, ValidationDto } from '@api'
import { firstValueFrom, map } from 'rxjs'
import { NewRecipe } from './new_recipe'
import { Recipe } from './recipe'
import { RecipeDto } from './recipe_dto'
import { Constraint, Validation, ValidationField } from '@common/constraints'

const toValidation = (dto: ValidationDto): Validation => {
  return <Validation>ValidationDto[dto]
}

const toConstraint = (dto: ConstraintDto) =>
  new Constraint(toValidation(dto.validation), dto.value)

const toValidationField = (dto: ValidationFieldDto): ValidationField =>
  new ValidationField(dto.name, dto.dataType, dto.constraints.map(toConstraint))

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

  getCreateRecipeConstraints(): Promise<ValidationField[]> {
    const headers = this.defaultHeadersWithAuth()
    const url = this.URL + 'GetNewRecipeValidationFields'

    const request$ = this.httpClient
      .get<ValidationFieldDto[]>(url, {
        headers: headers
      })
      .pipe(map((dtos) => dtos.map(toValidationField)))

    return firstValueFrom(request$)
  }

  private toRecipe(dto: RecipeDto): Recipe {
    return new Recipe(dto)
  }
}
