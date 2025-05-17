import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router'
import { PasswordInput } from '../ui/password-input/password-input'
import { AuthService } from '../utils/auth.service'

@Component({
  selector: 'auth-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    PasswordInput
  ],
  templateUrl: './login.view.html',
  styleUrls: ['../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginView {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)

  protected readonly form = this.nnfb.group({
    chefname: ['', Validators.required],
    password: ['', Validators.required]
  })

  protected readonly chefnameCtl: FormControl<string> = this.form.controls.chefname
  protected readonly passwordCtl: FormControl<string> = this.form.controls.password

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) return

    await this.authService.signInAsync({
      name: this.chefnameCtl.value,
      password: this.passwordCtl.value
    })
    void this.router.navigateByUrl('/')
  }
}
