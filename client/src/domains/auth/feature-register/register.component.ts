import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../utils/auth.service';
import { RegisterChef } from './RegisterChef';
import { Router } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChefFromControlFactory } from '../utils/ChefFormControlFactory';
import { ChefConstraints } from '../utils/ChefConstraints';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _nnfb = inject(NonNullableFormBuilder);

  private readonly _chefFormControlFactory = new ChefFromControlFactory(
    this._nnfb,
  );

  protected readonly chefConstraints = ChefConstraints;

  protected readonly registerForm = this._nnfb.group({
    chefname: this._chefFormControlFactory.Name(),
    password: this._chefFormControlFactory.Password(),
    email: ['', [Validators.email]],
  });

  protected hidePassword = true;

  protected getInvalidEmailMessage() {
    return this.registerForm.controls.email.hasError('email')
      ? 'Ungültige E-Mail'
      : '';
  }

  protected async onSubmit(): Promise<void> {
    await this.registerAndLogin();
  }

  protected async registerAndLogin(): Promise<void> {
    const chef: RegisterChef = {
      name: this.registerForm.controls.chefname.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value,
    };
    await this._authService.registerAsync(chef);
    await this._authService.loginAsync(chef);
    await this._router.navigateByUrl('/');
  }
}
