import { ValidationDto } from './validation_dto'

export interface ConstraintDto {
  value: unknown
  validation: ValidationDto
}
