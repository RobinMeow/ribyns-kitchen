import { ConstraintsFakeBuilder } from './constraints-fake.builder'

export function withField(fieldName: string): ConstraintsFakeBuilder {
  return new ConstraintsFakeBuilder(fieldName)
}
