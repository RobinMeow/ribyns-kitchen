import { Validation } from './validation'

export function validationName(validation: Validation): string {
  return Validation[validation]
}
