import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'recipe-create-button',
  standalone: true,
  imports: [],
  templateUrl: './create-recipe.button.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipeButton {}
