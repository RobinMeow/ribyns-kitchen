import { FieldConstraints } from '../field_constraints'
import { Validations } from '../validations'
import { FieldConstaintsFake } from './constraints_fake_builder'

/** @__PURE__ */
export function fakeValidations(
  fieldConstaints: FieldConstaintsFake[]
): Readonly<Validations> {
  const validations: { [fieldName: string]: FieldConstraints } = {}

  for (const fieldConstaint of fieldConstaints) {
    validations[fieldConstaint.fieldName] = Object.freeze({
      required: fieldConstaint.required,
      min: fieldConstaint.min,
      max: fieldConstaint.max
    } satisfies FieldConstraints)
  }

  return Object.freeze(<Validations>validations)
}
