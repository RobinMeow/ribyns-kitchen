import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipeConstraints } from './RecipeConstraints';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RecipeApi } from '../util/recipe.api';
import { NewRecipe } from '../util/NewRecipe';
import { RecipeModel } from '../util/RecipeModel';

@Component({
  selector: 'recipe-add-recipe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipe {
  private readonly nnfb = inject(NonNullableFormBuilder);
  private readonly recipeApi = inject(RecipeApi);
  private readonly router = inject(Router);

  protected readonly form = this.nnfb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  protected readonly constraints = RecipeConstraints;

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const newRecipe: NewRecipe = {
      title: this.form.controls.title.value,
    };

    const recipe: RecipeModel = await this.recipeApi.newAsync(newRecipe);
    void this.router.navigate(['/recipe', recipe.id]);
  }
}
