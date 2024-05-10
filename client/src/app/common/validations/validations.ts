import { FieldConstraints } from './field_constraints'

export interface Validations {
  readonly [fieldName: string]: FieldConstraints
}
