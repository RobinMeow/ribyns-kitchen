import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeViewComponent {}
