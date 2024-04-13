import { Constraint } from '../constraint'
import { ValidationField } from '../validation_field'

/** @__PURE__ */
export function fakeValidationField(
  name: string,
  dataType: string,
  constraints: Constraint[]
): ValidationField {
  return Object.freeze({
    name: name,
    constraints: constraints,
    dataType: dataType
  } satisfies ValidationField)
}
