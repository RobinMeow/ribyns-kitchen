import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ChefConstraints } from 'src/app/core/auth/ChefConstraints';

/**
 * Factory for instantiating FormControls.
 */
export class ChefFromControlFactory {
  private readonly _nnfb: NonNullableFormBuilder;

  constructor(nnfb: NonNullableFormBuilder) {
    this._nnfb = nnfb;
  }

  Name(): FormControl<string> {
    return this._nnfb.control('', [
      Validators.required,
      Validators.minLength(ChefConstraints.Name.minLength),
      Validators.maxLength(ChefConstraints.Name.maxLength),
    ]);
  }

  Password(): FormControl<string> {
    return this._nnfb.control('', [
      Validators.required,
      Validators.minLength(ChefConstraints.Password.minLength),
      Validators.maxLength(ChefConstraints.Password.maxLength),
    ]);
  }

  Email(): FormControl<string | null> {
    return this._nnfb.control<string | null>('', [
      Validators.minLength(ChefConstraints.Email.minLength),
      Validators.maxLength(ChefConstraints.Email.maxLength),
    ]);
  }
}
