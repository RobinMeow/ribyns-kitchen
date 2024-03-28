import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'
import { AuthService } from '../utils/auth.service'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ChefFromControlFactory } from '../utils/ChefFormControlFactory'
import { ChefConstraints } from '../utils/ChefConstraints'
import { PasswordInput } from '../ui/password/password-input'

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
    PasswordInput
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss', '../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)

  protected readonly chefConstraints = ChefConstraints

  private readonly chefFormControlFactory = new ChefFromControlFactory(
    this.nnfb
  )

  protected readonly loginForm = this.nnfb.group({
    chefname: this.chefFormControlFactory.Name(),
    password: this.chefFormControlFactory.Password()
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
