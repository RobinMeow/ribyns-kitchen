import { Constraint } from './constraint'

export interface ValidationField {
  name: string
  DataType: string
  Constraints: Array<Constraint>
}
