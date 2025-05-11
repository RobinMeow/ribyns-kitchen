import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Recipe } from '../util/recipe'

@Component({
  imports: [CommonModule],
  templateUrl: './recipe.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeView {
  // TODO RecipeView
  protected readonly recipe = inject(ActivatedRoute).snapshot.data[
    'recipe'
  ] as Recipe
}
