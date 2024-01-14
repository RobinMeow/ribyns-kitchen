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
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeComponent {
  private readonly _nnfb = inject(NonNullableFormBuilder);

  protected readonly form = this._nnfb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });
  protected readonly constraints = RecipeConstraints;

  protected onSubmit(): void {}
}
