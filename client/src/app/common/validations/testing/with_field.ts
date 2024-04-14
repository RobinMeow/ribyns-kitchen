import { ConstraintsFakeBuilder } from './constraints_fake_builder'

/** @__PURE__ */
export function withField(fieldName: string): ConstraintsFakeBuilder {
  return new ConstraintsFakeBuilder(fieldName)
}
