import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router'
import { PasswordInput } from '../ui/password-input/password-input'
import { AuthService } from '../utils/auth.service'
import { RegisterChef } from '../utils/register-chef'

@Component({
  selector: 'auth-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    PasswordInput
  ],
  templateUrl: './register.view.html',
  styleUrls: ['../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterView {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)

  protected readonly chefname_min_length = 3
  protected readonly chefname_max_length = 20

  protected readonly password_min_length = 4
  protected readonly password_max_length = 50

  protected readonly form = this.nnfb.group({
    chefname: [
      '',
      [
        Validators.required,
        Validators.minLength(this.chefname_min_length),
        Validators.maxLength(this.chefname_max_length)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.password_min_length),
        Validators.maxLength(this.password_max_length)
      ]
    ],
    email: ['', [Validators.email]]
  })

  protected hidePassword = true

  protected getInvalidEmailMessage() {
    return this.form.controls.email.hasError('email') ? 'Ungültige E-Mail' : ''
  }

  protected async onSubmit(): Promise<void> {
    await this.registerAndLogin()
  }

  protected async registerAndLogin(): Promise<void> {
    const chef: RegisterChef = {
      name: this.form.controls.chefname.value,
      password: this.form.controls.password.value,
      email: this.form.controls.email.value
    }
    await this.authService.signUpAsync(chef)
    void this.router.navigateByUrl('/')
  }
}
