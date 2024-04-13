import { assert } from '@common/assertions'
import { Validation } from './validation'
import { ValidationField } from './validation_field'
import { validationName } from './validation_name'
import { LiteralPrimitive } from '@angular/compiler'

export class ConstraintReader {
  private readonly validationField: ValidationField

  constructor(validationField: ValidationField) {
    this.validationField = validationField
  }

  read<T = LiteralPrimitive>(validation: Validation): T {
    const constraint = this.validationField.constraints.find(
      (x) => x.validation === validation
    )
    assert(constraint, `Validation '${validationName(validation)}' not found.`)
    return constraint.value as T
  }
}
