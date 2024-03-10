import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../utils/auth.service';
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
import { PasswordInput } from '../ui/password/password-input';
import { RegisterChef } from '../utils/RegisterChef';

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
    PasswordInput,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss', '../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly nnfb = inject(NonNullableFormBuilder);

  private readonly chefFormControlFactory = new ChefFromControlFactory(
    this.nnfb,
  );

  protected readonly chefConstraints = ChefConstraints;

  protected readonly registerForm = this.nnfb.group({
    chefname: this.chefFormControlFactory.Name(),
    password: this.chefFormControlFactory.Password(),
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
    await this.authService.signUpAsync(chef);
    await this.router.navigateByUrl('/');
  }
}
