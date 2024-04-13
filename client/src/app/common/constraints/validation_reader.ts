import { assert } from '@common/assertions'
import { ValidationField } from './validation_field'

export class ValidationReader {
  private readonly validationFields: { [name: string]: ValidationField } = {}

  constructor(validationFields: readonly ValidationField[]) {
    for (const validationField of validationFields) {
      this.validationFields[validationField.name] = validationField
    }
  }

  get(name: string): ValidationField {
    const validationField = this.validationFields[name]
    assert(validationField, `ValidationField '${name}' not found.`)
    return validationField
  }
}
