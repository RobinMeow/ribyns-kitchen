import { ValidatorFn, Validators } from '@angular/forms'
import { FieldConstraints } from './field_constraints'
import { assert } from '@common/assertions'

type CreateValidatorFn = (
  fieldConstraints: Readonly<FieldConstraints>
) => ValidatorFn[]

export class ValidatorsFactory {
  private readonly _creators: ReadonlyMap<string, CreateValidatorFn> = new Map<
    string,
    CreateValidatorFn
  >([
    [
      'string',
      (fieldConstraints: Readonly<FieldConstraints>) => {
        const validators: ValidatorFn[] = []

        const required = fieldConstraints.required
        if (required) {
          validators.push(Validators.required)
        }

        const min = fieldConstraints.min
        if (min) {
          validators.push(Validators.minLength(min))
        }

        const max = fieldConstraints.max
        if (max) {
          validators.push(Validators.maxLength(max))
        }

        return validators
      }
    ]
  ])

  create(
    dataType: 'string',
    fieldConstraints: FieldConstraints
  ): ValidatorFn[] {
    const creator = this._creators.get(dataType)
    assert(creator, `No Validators Creator found for dataType: '${dataType}'`)
    return creator(fieldConstraints)
  }
}
