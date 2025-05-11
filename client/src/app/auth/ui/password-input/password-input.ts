import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input
} from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'auth-password-input',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInput {
  readonly passwordControl = input.required<FormControl<string>>()

  readonly showHint = input(false, { transform: booleanAttribute })

  protected hidePassword = true
}
