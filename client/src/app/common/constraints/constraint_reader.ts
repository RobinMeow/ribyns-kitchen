import { assert } from '@common/assertions'
import { Validation } from './validation'
import { ValidationField } from './validation_field'
import { validationName } from './validation_name'
import { LiteralPrimitive } from '@angular/compiler'
import { Constraint } from './constraint'

export class ConstraintReader {
  private readonly constraints: { [validation: number]: Constraint } = {}

  /** transforms the validationField into a indexable object for fast reading of constraint values. */
  constructor(validationField: ValidationField) {
    for (const constraint of validationField.constraints) {
      this.constraints[constraint.validation] = constraint
    }
  }

  read<T = LiteralPrimitive>(validation: Validation): T {
    const constraint = this.constraints[validation]
    assert(
      constraint,
      `Constraint not found by key Validation: '${validationName(validation)}'.`
    )
    return constraint as T
  }
}
