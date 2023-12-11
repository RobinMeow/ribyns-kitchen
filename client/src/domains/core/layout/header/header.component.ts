import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { applicationName } from 'src/globals';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) hideMenuButton!: boolean;
  @Output() openMenu = new EventEmitter<void>();

  protected readonly applicationName: string = applicationName;

  protected onMenuClick(): void {
    this.openMenu.emit();
  }
}
