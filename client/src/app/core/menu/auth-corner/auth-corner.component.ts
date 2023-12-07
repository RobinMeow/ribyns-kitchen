import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthDomainService } from '../../auth/auth.domain.service';

@Component({
  selector: 'auth-corner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './auth-corner.component.html',
  styleUrl: './auth-corner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCornerComponent {
  private readonly _authService = inject(AuthDomainService);

  protected tokenSignal: Signal<string | null | undefined> =
    this._authService.getTokenSignal();

  protected logout(): void {
    this._authService.logout();
  }
}
