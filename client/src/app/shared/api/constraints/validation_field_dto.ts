import { ConstraintDto } from './constraint_dto'

export interface ValidationFieldDto {
  name: string
  dataType: string
  constraints: ConstraintDto[]
}
