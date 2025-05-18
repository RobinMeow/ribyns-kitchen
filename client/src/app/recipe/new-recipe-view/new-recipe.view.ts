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
import { MatIconModule } from '@angular/material/icon'

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './new-recipe.view.html',
  styleUrl: './new-recipe.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewRecipeView {
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
    ],
    variation: [
      '',
      [
        Validators.required,
        Validators.minLength(this.name_min_length),
        Validators.maxLength(20)
      ]
    ],
    portions: [2, [Validators.required, Validators.min(1)]],
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
