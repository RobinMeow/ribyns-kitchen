import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../utils/auth_service'
import { ActivatedRoute, Router } from '@angular/router'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { PasswordInput } from '../ui/password/password_input'
import { RegisterChef } from '../utils/register_chef'
import { ValidatorsFactory } from '@common/validations'
import { ChefValidations } from '../utils/chef_validations'

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
    PasswordInput
  ],
  templateUrl: './register.html',
  styleUrls: ['../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)
  private readonly activatedRouteSnapshot = inject(ActivatedRoute).snapshot

  private readonly chefValidations: Readonly<ChefValidations> =
    this.activatedRouteSnapshot.data['chefValidations']

  protected readonly nameValidations = this.chefValidations.name()
  protected readonly passwordValidations = this.chefValidations.password()
  protected readonly emailValidations = this.chefValidations.email()

  private readonly validatorsFactory = new ValidatorsFactory()

  protected readonly registerForm = this.nnfb.group({
    chefname: [
      '',
      this.validatorsFactory.create('string', this.nameValidations)
    ],
    password: [
      '',
      this.validatorsFactory.create('string', this.passwordValidations)
    ],
    email: [
      '',
      [
        ...this.validatorsFactory.create('string', this.emailValidations),
        Validators.email
      ]
    ]
  })

  protected hidePassword = true

  protected getInvalidEmailMessage() {
    return this.registerForm.controls.email.hasError('email')
      ? 'Ungültige E-Mail'
      : ''
  }

  protected async onSubmit(): Promise<void> {
    await this.registerAndLogin()
  }

  protected async registerAndLogin(): Promise<void> {
    const chef: RegisterChef = {
      name: this.registerForm.controls.chefname.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value
    }
    await this.authService.signUpAsync(chef)
    await this.router.navigateByUrl('/')
  }
}
