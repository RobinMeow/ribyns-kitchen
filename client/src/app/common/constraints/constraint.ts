import { ValidatorFn, Validators } from '@angular/forms'
import { Validation } from './validation'
import { assert } from '@common/assertions'

export class Constraint {
  readonly validation: Validation
  readonly value: unknown

  constructor(validation: Validation, value: unknown = undefined) {
    this.validation = validation
    this.value = value
  }

  getValidator(dataType: string): ValidatorFn {
    switch (dataType) {
      case 'string':
        switch (this.validation) {
          case Validation.min:
            assert(
              typeof this.value === 'number',
              `Value '${this.value}' is not a number.`
            )
            return Validators.minLength(this.value)

          case Validation.max:
            assert(
              typeof this.value === 'number',
              `Value '${this.value}' is not a number.`
            )
            return Validators.maxLength(this.value)

          case Validation.required:
            return Validators.required

          default:
            throw new Error(`Validation not supported '${this.validation}'.`)
        }

      case 'number':
        switch (this.validation) {
          case Validation.min:
            assert(
              typeof this.value === 'number',
              `Value '${this.value}' is not a number.`
            )
            return Validators.min(this.value)

          case Validation.max:
            assert(
              typeof this.value === 'number',
              `Value '${this.value}' is not a number.`
            )
            return Validators.max(this.value)

          case Validation.required:
            return Validators.required

          default:
            throw new Error(`Validation not supported '${this.validation}'.`)
        }

      default:
        throw new Error(`DataType not supported '${dataType}'.`)
    }
  }
}
