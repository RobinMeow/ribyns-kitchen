import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'

@Component({
  selector: 'recipe-create-nav-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './create-recipe.nav-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipeNavButton {
  private readonly router = inject(Router)

  protected onClick() {
    this.router.navigate(['/create-recipe'])
  }
}
