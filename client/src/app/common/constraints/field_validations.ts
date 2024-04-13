import { assert } from '@common/assertions'
import { Validation } from './validation'
import { Constraint } from './constraint'
import { ValidatorFn } from '@angular/forms'

export class FieldValidations {
  readonly name: string
  readonly dataType: string
  private readonly constraints: ReadonlyMap<Validation, Constraint>

  constructor(name: string, dataType: string, constraints: Constraint[]) {
    this.name = name
    this.dataType = dataType

    const map = new Map<Validation, Constraint>()
    for (const constraint of constraints) {
      map.set(constraint.validation, constraint)
    }
    this.constraints = map
  }

  get<T>(validation: Validation): T {
    assert(
      this.constraints.has(validation),
      `Constraint with Validation '${validation}' not found.`
    )
    return this.constraints.get(validation) as T
  }

  getValiadtors(): ValidatorFn[] {
    const validators: ValidatorFn[] = []

    for (const constraint of this.constraints.values()) {
      validators.push(constraint.getValidator(this.dataType))
    }

    return validators
  }
}
