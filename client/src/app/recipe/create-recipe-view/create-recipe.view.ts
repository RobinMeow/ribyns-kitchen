import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router'
import { NewRecipe } from '../util/new-recipe'
import { Recipe } from '../util/recipe'
import { RecipeApi } from '../util/recipe.api'

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

  protected readonly name_min_length = 3
  protected readonly name_max_length = 120
  protected readonly form = this.nnfb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(this.name_min_length),
        Validators.maxLength(this.name_max_length)
      ]
    ]
  })

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) return

    const newRecipe: NewRecipe = {
      name: this.form.controls.name.value
    }

    const recipe: Recipe = await this.recipeApi.newAsync(newRecipe) // TODO should only return the id, so we dont have to worry about state management?
    void this.router.navigate(['/recipe', recipe.id])
  }
}
