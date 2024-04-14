import { ConstraintsFakeBuilder } from './constraints_fake_builder'

export function withField(fieldName: string): ConstraintsFakeBuilder {
  return new ConstraintsFakeBuilder(fieldName)
}
