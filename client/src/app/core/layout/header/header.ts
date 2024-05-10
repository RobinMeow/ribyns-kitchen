import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink } from '@angular/router'
import { APP_NAME } from 'src/app/core'

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  private readonly router = inject(Router)

  readonly hideMenuButton = input.required<boolean>()
  readonly openMenu = output()

  protected readonly appName = inject(APP_NAME)

  protected onMenuClick(): void {
    this.openMenu.emit()
  }

  protected onTitleClick() {
    this.router.navigate([''])
  }
}
