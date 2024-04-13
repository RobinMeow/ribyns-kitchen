import { Constraint } from '../constraint'
import { Validation } from '../validation'

/** @__PURE__ */
export function withConstraint(
  validation: Validation,
  value: unknown = undefined
): Constraint {
  return Object.freeze({
    validation,
    value
  } satisfies Constraint)
}
