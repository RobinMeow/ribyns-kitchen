import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, Router } from '@angular/router'
import { RecipeApi } from '../util/recipe_api'
import { NewRecipe } from '../util/new_recipe'
import { Recipe } from '../util/recipe'
import {
  Validation,
  FieldValidations,
  ValidationReader
} from '@common/constraints'
import { assert } from '@common/assertions'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create_recipe.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipe {
  private readonly nnfb = inject(NonNullableFormBuilder)
  private readonly recipeApi = inject(RecipeApi)
  private readonly router = inject(Router)
  private readonly activatedRouteSnapshot = inject(ActivatedRoute).snapshot
  private readonly validationFields: readonly FieldValidations[] =
    this.activatedRouteSnapshot.data['validationFields']
  private readonly _ = assert(
    this.validationFields.length === 1,
    'Expeted 1 FieldValiadtions.'
  )
  private readonly validationReader: ValidationReader = new ValidationReader(
    this.validationFields
  )

  private readonly titleValidations = this.validationReader.read('title')

  protected readonly titleMinLength = this.titleValidations.get<number>(
    Validation.min
  )

  protected readonly titleMaxLength = this.titleValidations.get<number>(
    Validation.max
  )

  protected readonly form = this.nnfb.group({
    title: ['', this.titleValidations.getValiadtors()]
  })

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) return

    const newRecipe: NewRecipe = {
      title: this.form.controls.title.value
    }

    const recipe: Recipe = await this.recipeApi.newAsync(newRecipe)
    void this.router.navigate(['/recipe', recipe.id])
  }
}
