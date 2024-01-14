import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipeConstraints } from './RecipeConstraints';

@Component({
  selector: 'recipe-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeComponent {
  private readonly _nnfb = inject(NonNullableFormBuilder);

  protected readonly form = this._nnfb.group({
    title: ['', Validators.required, Validators.minLength(3)],
  });
  protected readonly constraints = RecipeConstraints;

  protected onSubmit(): void {}
}
