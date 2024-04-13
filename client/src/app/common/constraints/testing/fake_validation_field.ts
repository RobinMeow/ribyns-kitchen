import { Constraint } from '../constraint'
import { ValidationField } from '../validation_field'

/** @__PURE__ */
export function fakeValidationField(
  name: string,
  dataType: string,
  constraints: Constraint[]
): ValidationField {
  return {
    name: name,
    constraints: constraints,
    dataType: dataType
  } satisfies ValidationField
}
