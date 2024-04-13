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
  ValidationFields,
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
  private readonly validationFields: ValidationFields = new ValidationFields(
    this.activatedRouteSnapshot.data['validationFields']
  )

  private readonly titleConstraintReader = new ConstraintReader(
    this.validationFields.get('title')
  )

  protected readonly titleMinLength = this.titleConstraintReader.readValue(
    Validation.Min
  )
  protected readonly titleMaxLength = this.titleConstraintReader.readValue(
    Validation.Max
  )

  protected readonly form = this.nnfb.group({
    title: [
      '',
      ValidatorsFactory.create('title', this.validationFields.toArray())
    ]
  })

  protected async onSubmit(): Promise<void> {
    console.log(this.form)
    if (this.form.invalid) return

    const newRecipe: NewRecipe = {
      title: this.form.controls.title.value
    }

    const recipe: Recipe = await this.recipeApi.newAsync(newRecipe)
    void this.router.navigate(['/recipe', recipe.id])
  }
}
