import { Validation } from './validation'

export class Constraint {
  readonly validation: Validation
  readonly value: unknown

  constructor(validation: Validation, value: unknown = undefined) {
    this.validation = validation
    this.value = value
  }
}
