import { ValidatorFn, Validators } from '@angular/forms'
import { FieldConstraints } from './field_constraints'
import { assert } from '@common/assertions'

type CreateValidatorFn = (
  fieldConstraints: Readonly<FieldConstraints>
) => ValidatorFn[]

function string_creator(
  fieldConstraints: Readonly<FieldConstraints>
): ValidatorFn[] {
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

export class ValidatorsFactory {
  private static readonly _creators: ReadonlyMap<string, CreateValidatorFn> =
    new Map<string, CreateValidatorFn>([['string', string_creator]])

  create(
    dataType: 'string',
    fieldConstraints: FieldConstraints
  ): ValidatorFn[] {
    const creator = ValidatorsFactory._creators.get(dataType)
    assert(creator, `No Validators Creator found for dataType: '${dataType}'`)
    return creator(fieldConstraints)
  }
}
