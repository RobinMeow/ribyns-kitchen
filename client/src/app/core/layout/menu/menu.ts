import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDrawer } from '@angular/material/sidenav'
import { AuthCorner } from 'src/app/auth'
import { CreateRecipeMenuButton } from './create-recipe-menu-button/create-recipe.menu-button'

@Component({
  selector: 'core-menu',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AuthCorner,
    CreateRecipeMenuButton
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Menu {
  readonly drawer = input.required<MatDrawer>()

  protected async onArrowBackClick(): Promise<void> {
    await this.drawer().toggle()
  }
}
