import { ValidatorFn, Validators } from '@angular/forms'
import { ValidationField } from './validation_field'
import { Validation } from './validation'

export class ValidatorsFactory {
  static create(validationField: ValidationField): ValidatorFn[] {
    const validators: ValidatorFn[] = []

    for (const constraint of validationField.getAllConstraints()) {
      switch (constraint.validation) {
        case Validation.Required: {
          // value is ignored by design for required.
          validators.push(Validators.required)
          break
        }
        case Validation.Min: {
          if (validationField.dataType === 'string') {
            const min = Number(constraint.value)
            validators.push(Validators.minLength(min))
          } else {
            throw new Error(
              `Validation.Min for DataType '${validationField.dataType}' is not supported.`
            )
          }
          break
        }
        case Validation.Max: {
          if (validationField.dataType === 'string') {
            const max = Number(constraint.value)
            validators.push(Validators.maxLength(max))
          } else {
            throw new Error(
              `Validation.Max for DataType '${validationField.dataType}' is not supported.`
            )
          }
          break
        }

        default:
          throw new Error(
            `Validation '${constraint.validation}' not supported.`
          )
      }
    }

    return validators
  }
}
