import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { APP_NAME } from 'src/app/core'

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  @Input({ required: true }) hideMenuButton!: boolean
  @Output() openMenu = new EventEmitter<void>()

  protected readonly appName = inject(APP_NAME)

  protected onMenuClick(): void {
    this.openMenu.emit()
  }
}
