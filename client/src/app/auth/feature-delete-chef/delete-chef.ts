import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ChefFromControlFactory } from '../utils/ChefFormControlFactory'
import { AuthService } from '../utils/auth.service'
import { Credentials } from '../utils/Credentials'
import { Router } from '@angular/router'
import { Chef } from '../utils/Chef'
import { MatInputModule } from '@angular/material/input'
import { PasswordInput } from '../ui/password/password.input'

@Component({
  selector: 'auth-delete-chef',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    PasswordInput
  ],
  templateUrl: './delete-chef.html',
  styleUrls: ['../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteChef {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)
  private readonly chefFormControlFactory = new ChefFromControlFactory(
    this.nnfb
  )

  protected readonly form = this.nnfb.group({
    password: this.chefFormControlFactory.Password()
  })

  private readonly chefSignal: Signal<Chef | null> =
    this.authService.currentUser()

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) return

    const chef: Chef | null = this.chefSignal()
    if (chef === null) {
      await this.router.navigateByUrl('/')
      return
    }

    const credentials: Credentials = {
      name: chef.name,
      password: this.form.controls.password.value
    }

    await this.authService.removeAsync(credentials)

    await this.router.navigateByUrl('/')
  }
}
