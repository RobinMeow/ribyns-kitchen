import { FieldConstraints } from './field.constraints'

export interface Validations {
  readonly [fieldName: string]: FieldConstraints
}
