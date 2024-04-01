import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Recipe } from '../util/recipe'

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view_recipe.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewRecipe {
  protected readonly recipe = inject(ActivatedRoute).snapshot.data[
    'recipe'
  ] as Recipe
}
