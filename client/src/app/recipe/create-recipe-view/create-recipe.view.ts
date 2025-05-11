import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ActivatedRoute, Router } from '@angular/router'
import { FieldConstraints, ValidatorsFactory } from '@common/validations'
import { NewRecipe } from '../util/new-recipe'
import { Recipe } from '../util/recipe'
import { RecipeApi } from '../util/recipe.api'
import { RecipeValidations } from '../util/recipe.validations'

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-recipe.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipeView {
  private readonly nnfb = inject(NonNullableFormBuilder)
  private readonly recipeApi = inject(RecipeApi)
  private readonly router = inject(Router)
  private readonly activatedRouteSnapshot = inject(ActivatedRoute).snapshot
  private readonly recipeValidations = this.activatedRouteSnapshot.data[
    'recipeValidations'
  ] as Readonly<RecipeValidations>
  private readonly validatorsFactory = new ValidatorsFactory()

  protected readonly titleValidations: Readonly<FieldConstraints> =
    this.recipeValidations.title()

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
