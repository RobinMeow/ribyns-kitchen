import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../utils/auth_service'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { PasswordInput } from '../ui/password/password_input'
import { ValidatorsFactory } from '@common/validations'
import { ChefValidations } from '../utils/chef_validations'
import { NotUndefinedPipe } from '@common/assertions'

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    PasswordInput,
    NotUndefinedPipe
  ],
  templateUrl: './login.html',
  styleUrls: ['../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)
  private readonly activatedRouteSnapshot = inject(ActivatedRoute).snapshot

  private readonly chefValidations: Readonly<ChefValidations> =
    this.activatedRouteSnapshot.data['chefValidations']

  protected readonly nameValidations = this.chefValidations.name()
  private readonly passwordValidations = this.chefValidations.password()

  private readonly validatorsFactory = new ValidatorsFactory()

  protected readonly loginForm = this.nnfb.group({
    chefname: [
      '',
      this.validatorsFactory.create('string', this.nameValidations)
    ],
    password: [
      '',
      this.validatorsFactory.create('string', this.passwordValidations)
    ]
  })

  protected readonly chefnameControl: FormControl<string> =
    this.loginForm.controls.chefname

  protected readonly passwordControl: FormControl<string> =
    this.loginForm.controls.password

  protected async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return

    await this.authService.signInAsync({
      name: this.chefnameControl.value,
      password: this.passwordControl.value
    })
    await this.router.navigateByUrl('/')
  }
}
