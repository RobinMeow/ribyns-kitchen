import { assert } from '@common/assertions'
import { ValidationField } from './validation_field'

export class ValidationFields {
  private readonly validationFields: readonly ValidationField[]

  constructor(validationFields: readonly ValidationField[]) {
    this.validationFields = validationFields
  }

  get(name: string): ValidationField {
    const validationField = this.validationFields.find((x) => x.name === name)
    assert(validationField, `ValidationField '${name}' not found.`)
    return validationField
  }
}
