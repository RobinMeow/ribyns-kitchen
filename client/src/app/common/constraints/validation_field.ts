import { Constraint } from './constraint'

export interface ValidationField {
  name: string
  dataType: string
  constraints: Constraint[]
}
