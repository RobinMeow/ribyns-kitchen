import { assert } from '@common/assertions'
import { Validation } from './validation'
import { Constraint } from './constraint'

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
    const value = this.constraints.get(validation)
    assert(
      this.constraints.has(validation),
      `Constraint with Validation '${validation}' not found.`
    )
    return value as T
  }

  getAllConstraints(): IterableIterator<Constraint> {
    return this.constraints.values()
  }
}
