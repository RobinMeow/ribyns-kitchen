import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Recipe } from '../util/recipe'

@Component({
  imports: [],
  templateUrl: './recipe.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeView {
  private readonly route = inject(ActivatedRoute)
  protected readonly recipe = this.route.snapshot.data['recipe'] as Recipe
}
