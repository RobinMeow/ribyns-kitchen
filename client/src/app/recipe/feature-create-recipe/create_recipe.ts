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
import { assert } from '@common/assertions'
import { RecipeValidations } from '../util/recipe_validations'
import { FieldConstraints, ValidatorsFactory } from '@common/validations'

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
  private readonly recipeValidations: Readonly<RecipeValidations> =
    this.activatedRouteSnapshot.data['recipeValidations']
  private readonly validatorsFactory = new ValidatorsFactory()

  private readonly titleValidations: Readonly<FieldConstraints> =
    this.recipeValidations.title()

  protected readonly titleMinLength = ((): number => {
    const val = this.titleValidations.min
    assert(
      typeof val == 'number',
      `title min constraint has to be of type number, but got '${val}'.`
    )
    return val
  })()
  protected readonly titleMaxLength = ((): number => {
    const val = this.titleValidations.max
    assert(
      typeof val == 'number',
      `title max constraint has to be of type number, but got '${val}'.`
    )
    return val
  })()

  protected readonly form = this.nnfb.group({
    title: ['', this.validatorsFactory.create('string', this.titleValidations)]
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
