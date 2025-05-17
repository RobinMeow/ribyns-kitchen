import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'

@Component({
  selector: 'recipe-new-menu-button',
  imports: [MatButtonModule],
  templateUrl: './new-recipe.menu-button.html',
  styleUrl: './new-recipe.menu-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewRecipeMenuButton {
  private readonly router = inject(Router)

  protected onClick() {
    void this.router.navigate(['/new-recipe'])
  }
}
