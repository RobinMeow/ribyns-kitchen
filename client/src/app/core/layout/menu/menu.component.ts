import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthCorner } from 'src/app/auth';

@Component({
  selector: 'core-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, AuthCorner],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input({ required: true }) drawer!: MatDrawer;
}
