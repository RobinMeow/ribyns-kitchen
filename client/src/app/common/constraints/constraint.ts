import { Validation } from './validation'

export interface Constraint {
  value: unknown
  validation: Validation
}
