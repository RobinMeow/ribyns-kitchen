import { ConstraintsFakeBuilder } from './constraints-fake.builder'

/** @__PURE__ */
export function withField(fieldName: string): ConstraintsFakeBuilder {
  return new ConstraintsFakeBuilder(fieldName)
}
