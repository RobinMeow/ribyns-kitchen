import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChefFromControlFactory } from '../utils/ChefFormControlFactory';
import { AuthDomainService } from '../utils/auth.domain.service';
import { Credentials } from '../utils/Credentials';
import { Router } from '@angular/router';
import { Chef } from '../utils/Chef';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'auth-delete-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss', '../ui/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountComponent {
  private readonly _authService = inject(AuthDomainService);
  private readonly _router = inject(Router);
  private readonly _nnfb = inject(NonNullableFormBuilder);
  private readonly _chefFormControlFactory = new ChefFromControlFactory(
    this._nnfb,
  );

  protected readonly deleteAccountForm = this._nnfb.group({
    password: this._chefFormControlFactory.Password(),
  });

  private readonly _chefSignal: Signal<Chef | null> =
    this._authService.currentUserSignal();

  protected async onSubmit(): Promise<void> {
    if (this.deleteAccountForm.invalid) return;

    const chef: Chef | null = this._chefSignal();
    if (chef === null) {
      await this._router.navigateByUrl('/');
      return;
    }

    const credentials: Credentials = {
      name: chef.name,
      password: this.deleteAccountForm.controls.password.value,
    };

    await this._authService.removeAsync(credentials);

    await this._router.navigateByUrl('/');
  }
}
