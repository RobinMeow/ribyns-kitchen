import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'

@Component({
  selector: 'recipe-create-menu-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './create_recipe_menu_button.html',
  styleUrl: './create_recipe_menu_button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipeMenuButton {
  private readonly router = inject(Router)

  protected onClick() {
    this.router.navigate(['/create-recipe'])
  }
}
