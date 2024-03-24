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
import { RecipeApi } from '../api/recipe.api';
import { RecipeLocalPersistor } from '../local-persistor/recipe.local-persistor';
import { RecipeId } from '../local-persistor/RecipeId';
import { NewRecipe } from '../util/NewRecipe';

@Component({
  selector: 'recipe-create-recipe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRecipe {
  private readonly nnfb = inject(NonNullableFormBuilder);
  private readonly recipeLP = inject(RecipeLocalPersistor);
  private readonly api = inject(RecipeApi);
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

    const id: RecipeId = await this.recipeLP.createAsync(newRecipe);

    void this.router.navigate(['/recipe', id]);
  }
}
