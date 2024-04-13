import { Constraint } from '../constraint'
import { Validation } from '../validation'

/** @__PURE__ */
export function withConstraint(
  validation: Validation,
  value: unknown = undefined
): Constraint {
  return {
    validation,
    value
  } satisfies Constraint
}
