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
  ConstraintReader,
  Validation,
  ValidationField,
  ValidationReader,
  ValidatorsFactory
} from '@common/constraints'

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
  private readonly validationFields: readonly ValidationField[] =
    this.activatedRouteSnapshot.data['validationFields']
  private readonly validationReader: ValidationReader = new ValidationReader(
    this.validationFields
  )

  private readonly titleValidations = this.validationReader.get('title')

  private readonly titleConstraintReader = new ConstraintReader(
    this.titleValidations
  )

  protected readonly titleMinLength = this.titleConstraintReader.read<number>(
    Validation.Min
  )
  protected readonly titleMaxLength = this.titleConstraintReader.read<number>(
    Validation.Max
  )

  protected readonly form = this.nnfb.group({
    title: ['', ValidatorsFactory.create(this.titleValidations)]
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
