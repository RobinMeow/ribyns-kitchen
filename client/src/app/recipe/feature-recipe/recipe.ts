import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recipe {}
