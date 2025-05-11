import { FieldConstraints } from '../field.constraints'
import { Validations } from '../validations'
import { FieldConstaintsFake } from './constraints-fake.builder'

export function fakeValidations(
  fieldConstaints: FieldConstaintsFake[]
): Readonly<Validations> {
  const validations: Record<string, FieldConstraints> = {}

  for (const fieldConstaint of fieldConstaints) {
    validations[fieldConstaint.fieldName] = Object.freeze({
      required: fieldConstaint.required,
      min: fieldConstaint.min,
      max: fieldConstaint.max
    } satisfies FieldConstraints)
  }

  return Object.freeze((validations as Validations))
}
