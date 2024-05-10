import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { AuthService } from '../utils/auth_service'
import { Credentials } from '../utils/credentials'
import { Router } from '@angular/router'
import { Chef } from '../utils/chef'
import { MatInputModule } from '@angular/material/input'
import { PasswordInput } from '../ui/password/password_input'
import { assert } from '@common/assertions'

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
  templateUrl: './delete_chef.html',
  styleUrls: ['../utils/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteChef {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly nnfb = inject(NonNullableFormBuilder)

  protected readonly form = this.nnfb.group({
    password: ['', [Validators.required]]
  })

  private readonly chefSignal: Signal<Chef | null> =
    this.authService.currentUser()

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) return

    const chef: Chef | null = this.chefSignal()
    assert(chef, 'Chef may not be null.')

    const credentials: Credentials = {
      name: chef.name,
      password: this.form.controls.password.value
    }

    await this.authService.removeAsync(credentials)

    await this.router.navigateByUrl('/')
  }
}
