import { NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute
} from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'auth-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInput {
  @Input({ required: true }) passwordControl!: FormControl<string>
  @Input({ transform: booleanAttribute }) showHint = false

  protected hidePassword = true
}
