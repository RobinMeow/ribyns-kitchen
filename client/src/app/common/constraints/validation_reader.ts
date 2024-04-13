import { assert } from '@common/assertions'
import { FieldValidations } from './field_validations'

export class ValidationReader {
  private readonly validationFields: { [name: string]: FieldValidations } = {}

  constructor(validationFields: readonly FieldValidations[]) {
    for (const validationField of validationFields) {
      this.validationFields[validationField.name] = validationField
    }
  }

  read(name: string): FieldValidations {
    const validationField = this.validationFields[name]
    assert(validationField, `ValidationField '${name}' not found.`)
    return validationField
  }
}
